/**
 * Runner client
 *
 * Main-thread wrapper around the execution Web Worker. Responsibilities:
 *  - Spawn a fresh worker per run (isolated sandbox, no shared state)
 *  - Stream real-time stdout / per-case results to a subscriber
 *  - Enforce a hard wall-clock timeout by terminating the worker
 *  - Aggregate per-case results into a `RunResult` and translate fatal errors
 *    into user-friendly messages
 */

import type {
  CaseResult,
  EntrySignature,
  FatalKind,
  RunnerLang,
  RunResult,
  TestCase,
} from './types';
import { RUNNER_TIMEOUT_MS } from './types';

export interface RunEvents {
  onStdout?: (chunk: string, caseId?: string) => void;
  onStderr?: (chunk: string, caseId?: string) => void;
  onCase?: (result: CaseResult) => void;
  onStatus?: (status: string) => void;
}

export interface RunOptions {
  lang: RunnerLang;
  source: string;
  entry: EntrySignature;
  cases: TestCase[];
  events?: RunEvents;
  /** Override the default hard timeout (ms). */
  timeoutMs?: number;
  /** AbortSignal to cancel the run early (user Stop button). */
  signal?: AbortSignal;
}

function friendlyFatal(kind: FatalKind, raw: string): string {
  switch (kind) {
    case 'timeout':
      return `Execution exceeded ${RUNNER_TIMEOUT_MS / 1000}s and was terminated. Look for infinite loops or O(2^n) work on large inputs.`;
    case 'oom':
      return 'Out of memory. Try reducing allocations or using an in-place approach.';
    case 'syntax':
      return `Syntax error while loading your code:\n${raw}`;
    case 'runtime':
      return `Runtime error:\n${raw}`;
    default:
      return raw || 'The runner crashed unexpectedly.';
  }
}

/**
 * Execute a run and resolve when it completes, times out, or crashes.
 * Streaming callbacks fire before the promise resolves.
 */
export function runCode(opts: RunOptions): Promise<RunResult> {
  return new Promise((resolve) => {
    const timeoutMs = opts.timeoutMs ?? RUNNER_TIMEOUT_MS;
    const wallStart = performance.now();
    const cases: CaseResult[] = [];

    // Spawn a fresh worker per run so state is guaranteed to be pristine.
    const worker = new Worker(
      new URL('./executor.worker.ts', import.meta.url),
      { type: 'module' },
    );

    let settled = false;
    const finish = (result: RunResult) => {
      if (settled) return;
      settled = true;
      try { worker.terminate(); } catch (err) {
        console.warn('Failed to terminate worker:', err);
      }
      clearTimeout(timeoutId);
      opts.signal?.removeEventListener('abort', onAbort);
      resolve(result);
    };

    const timeoutId = setTimeout(() => {
      finish({
        ok: false,
        totalMs: performance.now() - wallStart,
        cases,
        fatalError: friendlyFatal('timeout', ''),
        errorKind: 'timeout',
      });
    }, timeoutMs);

    const onAbort = () => {
      finish({
        ok: false,
        totalMs: performance.now() - wallStart,
        cases,
        fatalError: 'Execution cancelled.',
        errorKind: 'unknown',
      });
    };
    opts.signal?.addEventListener('abort', onAbort);

    worker.addEventListener('message', (ev: MessageEvent) => {
      const msg = ev.data as
        | { type: 'stdout'; caseId?: string; chunk: string }
        | { type: 'stderr'; caseId?: string; chunk: string }
        | { type: 'case'; result: CaseResult }
        | { type: 'done'; totalMs: number }
        | { type: 'fatal'; kind: FatalKind; message: string };

      switch (msg.type) {
        case 'stdout':
          opts.events?.onStdout?.(msg.chunk, msg.caseId);
          break;
        case 'stderr':
          opts.events?.onStderr?.(msg.chunk, msg.caseId);
          break;
        case 'case':
          cases.push(msg.result);
          opts.events?.onCase?.(msg.result);
          break;
        case 'done':
          finish({
            ok: cases.every((c) => c.passed),
            totalMs: msg.totalMs,
            cases,
          });
          break;
        case 'fatal':
          finish({
            ok: false,
            totalMs: performance.now() - wallStart,
            cases,
            fatalError: friendlyFatal(msg.kind, msg.message),
            errorKind: msg.kind,
          });
          break;
      }
    });

    worker.addEventListener('error', (ev) => {
      finish({
        ok: false,
        totalMs: performance.now() - wallStart,
        cases,
        fatalError: friendlyFatal('runtime', ev.message || 'Worker error'),
        errorKind: 'runtime',
      });
    });

    opts.events?.onStatus?.(
      opts.lang === 'python' ? 'Loading Pyodide runtime…' : 'Booting QuickJS…',
    );

    worker.postMessage({
      type: 'run',
      lang: opts.lang,
      source: opts.source,
      entry: opts.entry,
      cases: opts.cases,
    });
  });
}
