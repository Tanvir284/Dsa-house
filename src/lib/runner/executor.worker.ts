/**
 * Runner Web Worker
 *
 * Executes untrusted user code in an isolated context and posts progress
 * events back to the main thread. Two backends are supported:
 *   - Python:     Pyodide (loaded lazily from jsDelivr, cached by the browser)
 *   - JavaScript: quickjs-emscripten (WASM QuickJS VM, memory-capped)
 *
 * The worker is intentionally single-shot per run: the main thread terminates
 * it after `RUNNER_TIMEOUT_MS` to enforce wall-clock time. It's also the
 * safest way to guarantee "no cross-session interference".
 */

/// <reference lib="webworker" />

import { compareValues } from './compare';
import type {
  CaseResult,
  EntrySignature,
  FatalKind,
  RunnerLang,
  TestCase,
} from './types';
import { RUNNER_JS_MEMORY_LIMIT } from './types';

declare const self: DedicatedWorkerGlobalScope;

// ---------- Wire protocol ------------------------------------------------

type InboundMessage = {
  type: 'run';
  lang: RunnerLang;
  source: string;
  entry: EntrySignature;
  cases: TestCase[];
};

type OutboundMessage =
  | { type: 'stdout'; caseId?: string; chunk: string }
  | { type: 'stderr'; caseId?: string; chunk: string }
  | { type: 'case'; result: CaseResult }
  | { type: 'done'; totalMs: number }
  | { type: 'fatal'; kind: FatalKind; message: string };

function post(msg: OutboundMessage) {
  self.postMessage(msg);
}

// ---------- Pyodide backend ----------------------------------------------

// Loaded lazily and cached across cases in the same run.
type PyodideInterface = {
  loadPackage: (names: string[]) => Promise<void>;
  runPython: (code: string) => unknown;
  globals: { get(name: string): unknown; set(name: string, value: unknown): void };
  toPy: (value: unknown) => unknown;
  setStdout: (opts: { batched?: (s: string) => void }) => void;
  setStderr: (opts: { batched?: (s: string) => void }) => void;
};

let cachedPyodide: PyodideInterface | null = null;

async function loadPyodide(): Promise<PyodideInterface> {
  if (cachedPyodide) return cachedPyodide;

  const PYODIDE_VERSION = '0.28.4';
  
  const sources = [
    {
      base: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
      url: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.mjs`
    },
    {
      base: `https://unpkg.com/pyodide@${PYODIDE_VERSION}/`,
      url: `https://unpkg.com/pyodide@${PYODIDE_VERSION}/pyodide.mjs`
    },
    {
      base: `https://cdnjs.cloudflare.com/ajax/libs/pyodide/${PYODIDE_VERSION}/`,
      url: `https://cdnjs.cloudflare.com/ajax/libs/pyodide/${PYODIDE_VERSION}/pyodide.mjs`
    }
  ];

  let lastError: any = null;
  for (const src of sources) {
    try {
      const mod = await import(
        /* webpackIgnore: true */ /* @vite-ignore */ src.url
      );
      const factory = mod.loadPyodide as (opts: unknown) => Promise<PyodideInterface>;
      cachedPyodide = await factory({ indexURL: src.base });
      return cachedPyodide!;
    } catch (err) {
      console.warn(`Failed to load Pyodide from ${src.url}, trying fallback...`, err);
      lastError = err;
    }
  }

  throw new Error(`Failed to fetch dynamically imported module. All CDNs exhausted. Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

async function runPython(
  source: string,
  entry: EntrySignature['python'],
  cases: TestCase[],
) {
  const py = await loadPyodide();

  // Bootstrapping harness: define the user's code, then create an entry adapter
  // named `__dsa_entry__(args_json)` that takes a JSON-encoded arg list and
  // returns a JSON-encoded value. This keeps the marshaling contract obvious.
  const invocation = entry.className
    ? `${entry.className}().${entry.methodName}(*_args)`
    : `${entry.methodName}(*_args)`;

  const bootstrap = `
import json, sys, io, traceback

__user_source = ${JSON.stringify(source)}

# Execute the user source in a fresh namespace, then hoist symbols to globals
# so the entry helper can reference them naturally.
_user_ns = {}
exec(compile(__user_source, "<user>", "exec"), _user_ns)
globals().update(_user_ns)

def __dsa_entry__(args_json):
    _args = json.loads(args_json)
    _stdout_buffer = io.StringIO()
    _stderr_buffer = io.StringIO()
    _saved_out, _saved_err = sys.stdout, sys.stderr
    sys.stdout, sys.stderr = _stdout_buffer, _stderr_buffer
    try:
        _result = ${invocation}
    except Exception:
        sys.stdout, sys.stderr = _saved_out, _saved_err
        return json.dumps({
            "ok": False,
            "error": traceback.format_exc(limit=6),
            "stdout": _stdout_buffer.getvalue(),
            "stderr": _stderr_buffer.getvalue(),
        })
    finally:
        sys.stdout, sys.stderr = _saved_out, _saved_err

    try:
        _encoded = json.dumps(_result, default=str)
    except Exception:
        _encoded = json.dumps(str(_result))

    return json.dumps({
        "ok": True,
        "value": _encoded,
        "stdout": _stdout_buffer.getvalue(),
        "stderr": _stderr_buffer.getvalue(),
    })
`;

  try {
    py.runPython(bootstrap);
  } catch (err) {
    post({
      type: 'fatal',
      kind: 'syntax',
      message: err instanceof Error ? err.message : String(err),
    });
    return;
  }

  const entryFn = py.globals.get('__dsa_entry__') as (arg: string) => string;

  for (const c of cases) {
    const started = performance.now();
    let raw: string;
    try {
      raw = entryFn(JSON.stringify(c.input));
    } catch (err) {
      post({
        type: 'case',
        result: {
          id: c.id,
          label: c.label,
          passed: false,
          input: c.input,
          expected: c.expected,
          actual: undefined,
          durationMs: performance.now() - started,
          error: err instanceof Error ? err.message : String(err),
        },
      });
      continue;
    }

    const durationMs = performance.now() - started;
    const parsed = JSON.parse(raw) as
      | { ok: true; value: string; stdout: string; stderr: string }
      | { ok: false; error: string; stdout: string; stderr: string };

    if (parsed.stdout) post({ type: 'stdout', caseId: c.id, chunk: parsed.stdout });
    if (parsed.stderr) post({ type: 'stderr', caseId: c.id, chunk: parsed.stderr });

    if (!parsed.ok) {
      post({
        type: 'case',
        result: {
          id: c.id,
          label: c.label,
          passed: false,
          input: c.input,
          expected: c.expected,
          actual: undefined,
          durationMs,
          error: parsed.error,
          stdout: parsed.stdout,
        },
      });
      continue;
    }

    const actual: unknown = JSON.parse(parsed.value);
    const passed = compareValues(actual, c.expected, c.compare);

    post({
      type: 'case',
      result: {
        id: c.id,
        label: c.label,
        passed,
        input: c.input,
        expected: c.expected,
        actual,
        durationMs,
        stdout: parsed.stdout,
      },
    });
  }
}

// ---------- JavaScript backend (QuickJS) ---------------------------------

async function runJavaScript(
  source: string,
  entry: EntrySignature['javascript'],
  cases: TestCase[],
) {
  // Dynamic import so JS-only runs don't pull the QuickJS wasm blob into the
  // Python path unnecessarily.
  const { getQuickJS } = await import('quickjs-emscripten');
  const QuickJS = await getQuickJS();
  const runtime = QuickJS.newRuntime();
  runtime.setMemoryLimit(RUNNER_JS_MEMORY_LIMIT);

  // Cooperative interrupt budget so tight infinite loops can be broken by the
  // main-thread timeout (which will terminate the worker anyway).
  let interruptCounter = 0;
  runtime.setInterruptHandler(() => {
    interruptCounter += 1;
    return interruptCounter > 5_000_000; // ~5M ticks -> interrupt
  });

  const ctx = runtime.newContext();

  // Capture stdout via a JS-side `console.log`.
  const consoleHandle = ctx.newObject();
  const logFn = ctx.newFunction('log', (...args) => {
    const chunk = args
      .map((h) => {
        try {
          return ctx.dump(h);
        } finally {
          h.dispose();
        }
      })
      .map((v) => (typeof v === 'string' ? v : JSON.stringify(v)))
      .join(' ');
    post({ type: 'stdout', chunk: chunk + '\n' });
  });
  ctx.setProp(consoleHandle, 'log', logFn);
  ctx.setProp(consoleHandle, 'error', logFn);
  ctx.setProp(consoleHandle, 'info', logFn);
  ctx.setProp(consoleHandle, 'warn', logFn);
  ctx.setProp(ctx.global, 'console', consoleHandle);
  logFn.dispose();
  consoleHandle.dispose();

  // Load user source
  const compileResult = ctx.evalCode(
    source + `\n;globalThis.__dsa_entry__ = ${entry.fnName};`,
    'user.js',
  );
  if (compileResult.error) {
    const err = ctx.dump(compileResult.error);
    compileResult.error.dispose();
    ctx.dispose();
    runtime.dispose();
    post({
      type: 'fatal',
      kind: 'syntax',
      message: typeof err === 'object' && err && 'message' in err ? String((err as { message: unknown }).message) : String(err),
    });
    return;
  } else {
    compileResult.value.dispose();
  }

  for (const c of cases) {
    const started = performance.now();
    const call = ctx.evalCode(
      `JSON.stringify(__dsa_entry__(...${JSON.stringify(c.input)}))`,
    );

    if (call.error) {
      const err = ctx.dump(call.error);
      call.error.dispose();
      post({
        type: 'case',
        result: {
          id: c.id,
          label: c.label,
          passed: false,
          input: c.input,
          expected: c.expected,
          actual: undefined,
          durationMs: performance.now() - started,
          error:
            typeof err === 'object' && err && 'message' in err
              ? String((err as { message: unknown }).message)
              : String(err),
        },
      });
      continue;
    }

    const raw = ctx.dump(call.value) as string;
    call.value.dispose();
    const durationMs = performance.now() - started;

    let actual: unknown;
    try {
      actual = raw === undefined ? undefined : JSON.parse(raw);
    } catch {
      actual = raw;
    }
    const passed = compareValues(actual, c.expected, c.compare);

    post({
      type: 'case',
      result: {
        id: c.id,
        label: c.label,
        passed,
        input: c.input,
        expected: c.expected,
        actual,
        durationMs,
      },
    });
  }

  ctx.dispose();
  runtime.dispose();
}

// ---------- Message pump -------------------------------------------------

self.addEventListener('message', async (ev: MessageEvent<InboundMessage>) => {
  const msg = ev.data;
  if (!msg || msg.type !== 'run') return;

  const wallStart = performance.now();
  try {
    if (msg.lang === 'python') {
      await runPython(msg.source, msg.entry.python, msg.cases);
    } else {
      await runJavaScript(msg.source, msg.entry.javascript, msg.cases);
    }
    post({ type: 'done', totalMs: performance.now() - wallStart });
  } catch (err) {
    const rawMessage = err instanceof Error ? err.message : String(err);
    let kind: FatalKind = 'runtime';
    if (/out of memory|allocation failed/i.test(rawMessage)) kind = 'oom';
    else if (/SyntaxError/i.test(rawMessage)) kind = 'syntax';
    post({ type: 'fatal', kind, message: rawMessage });
  }
});

export {}; // ensure module scope
