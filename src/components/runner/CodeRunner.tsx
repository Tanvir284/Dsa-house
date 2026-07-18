'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Play, Square, RotateCcw, Loader2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import type { CaseResult, RunnerLang, RunResult } from '@/lib/runner/types';
import { runCode } from '@/lib/runner/client';
import { RUNNER_TIMEOUT_MS } from '@/lib/runner/types';
import type { ProblemTestSpec } from '@/lib/runner/types';

interface CodeRunnerProps {
  spec: ProblemTestSpec;
}

const LANG_LABEL: Record<RunnerLang, string> = {
  python: 'Python',
  javascript: 'JavaScript',
};

function fmt(v: unknown): string {
  if (typeof v === 'string') return JSON.stringify(v);
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

export function CodeRunner({ spec }: CodeRunnerProps) {
  const [lang, setLang] = useState<RunnerLang>('python');
  const [source, setSource] = useState<string>(spec.starter?.python ?? '');
  const [status, setStatus] = useState<string>('Idle');
  const [busy, setBusy] = useState(false);
  const [stdout, setStdout] = useState('');
  const [cases, setCases] = useState<CaseResult[]>([]);
  const [summary, setSummary] = useState<RunResult | null>(null);
  const [customInput, setCustomInput] = useState<string>('5');
  const abortRef = useRef<AbortController | null>(null);

  const onSwitchLang = useCallback(
    (next: RunnerLang) => {
      setLang(next);
      setSource(spec.starter?.[next] ?? '');
      setStdout('');
      setCases([]);
      setSummary(null);
      setStatus('Idle');
    },
    [spec.starter],
  );

  const onReset = useCallback(() => {
    setSource(spec.starter?.[lang] ?? '');
    setStdout('');
    setCases([]);
    setSummary(null);
    setStatus('Idle');
  }, [lang, spec.starter]);

  const onStop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const onRun = useCallback(async () => {
    setBusy(true);
    setStdout('');
    setCases([]);
    setSummary(null);
    setStatus('Preparing sandbox…');

    const controller = new AbortController();
    abortRef.current = controller;

    let runCases = spec.cases;
    if (spec.isCustomInputOnly) {
      let parsedArgs: any[] = [];
      try {
        parsedArgs = JSON.parse('[' + customInput + ']');
      } catch (err) {
        setStatus('Invalid custom input (must be valid JSON, e.g. [1, 2], 3)');
        setBusy(false);
        return;
      }
      runCases = [
        {
          id: 'custom',
          label: 'Custom Sandbox Run',
          input: parsedArgs,
          expected: null,
          compare: 'deep',
        },
      ];
    }

    const result = await runCode({
      lang,
      source,
      entry: spec.entry,
      cases: runCases,
      signal: controller.signal,
      events: {
        onStatus: (s) => setStatus(s),
        onStdout: (chunk) => setStdout((prev) => prev + chunk),
        onStderr: (chunk) => setStdout((prev) => prev + chunk),
        onCase: (c) => setCases((prev) => [...prev, c]),
      },
    });

    setSummary(result);
    setStatus(
      spec.isCustomInputOnly
        ? (result.fatalError ? 'Fatal error' : 'Execution complete')
        : (result.ok ? 'All tests passed' : result.fatalError ? 'Fatal error' : 'Some tests failed')
    );
    setBusy(false);
    abortRef.current = null;
  }, [lang, source, spec.entry, spec.cases, spec.isCustomInputOnly, customInput]);

  const passed = useMemo(() => cases.filter((c) => c.passed).length, [cases]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md text-left">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1">
          {(['python', 'javascript'] as RunnerLang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => onSwitchLang(l)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                lang === l ? 'bg-emerald-500/90 text-black' : 'text-white/70 hover:text-white'
              }`}
            >
              {LANG_LABEL[l]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="rounded-full border border-white/10 bg-black/30 px-2 py-1">
            Wall-clock limit: {RUNNER_TIMEOUT_MS / 1000}s
          </span>
          <span className="rounded-full border border-white/10 bg-black/30 px-2 py-1">
            {spec.isCustomInputOnly ? 'Custom Sandbox' : `${spec.cases.length} test${spec.cases.length === 1 ? '' : 's'}`}
          </span>
        </div>
      </header>

      <textarea
        value={source}
        onChange={(e) => setSource(e.target.value)}
        spellCheck={false}
        rows={14}
        className="w-full resize-y rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none"
      />

      {spec.isCustomInputOnly && (
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider block">Custom Arguments (JSON list, comma separated)</label>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g. [1, 2, 3], 10"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 font-mono text-xs text-white focus:border-emerald-400 focus:outline-none"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onRun}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50 cursor-pointer"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {busy ? 'Running…' : spec.isCustomInputOnly ? 'Run Code' : 'Run tests'}
        </button>
        <button
          type="button"
          onClick={onStop}
          disabled={!busy}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 disabled:opacity-40 cursor-pointer"
        >
          <Square className="h-4 w-4" /> Stop
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 disabled:opacity-40 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" /> Reset code
        </button>
        <span className="ml-auto text-xs text-white/60">{status}</span>
      </div>

      {stdout && (
        <div>
          <div className="mb-1 text-xs uppercase tracking-wider text-white/50">stdout</div>
          <pre className="max-h-40 overflow-auto rounded-xl border border-white/10 bg-black/60 p-3 text-xs text-white/80 font-mono">
            {stdout}
          </pre>
        </div>
      )}

      {cases.length > 0 && spec.isCustomInputOnly && (
        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left font-sans">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-white/50 font-bold">Execution Output</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
              {cases[0].error ? 'CRASHED' : 'SUCCESS'}
            </span>
          </div>
          
          <div className="flex flex-col gap-2 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                <span className="text-[10px] text-white/40 block mb-1 font-sans font-bold">INPUT ARGUMENTS</span>
                <span className="text-white font-semibold">{fmt(cases[0].input)}</span>
              </div>
              <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                <span className="text-[10px] text-white/40 block mb-1 font-sans font-bold">RETURNED VALUE</span>
                {cases[0].error ? (
                  <span className="text-red-400 font-bold whitespace-pre-wrap">{cases[0].error}</span>
                ) : (
                  <span className="text-emerald-400 font-bold">{fmt(cases[0].actual)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {cases.length > 0 && !spec.isCustomInputOnly && (
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-white/50">
            <span>Test results</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/70">
              {passed}/{cases.length} passed
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {cases.map((c) => (
              <li
                key={c.id}
                className={`rounded-xl border p-3 text-sm ${
                  c.passed
                    ? 'border-emerald-500/40 bg-emerald-500/10'
                    : 'border-red-500/40 bg-red-500/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-medium text-white">
                    {c.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-300" />
                    )}
                    {c.label ?? c.id}
                  </div>
                  <span className="text-xs text-white/60">{c.durationMs.toFixed(1)} ms</span>
                </div>
                <dl className="mt-2 grid grid-cols-1 gap-1 text-xs text-white/70 md:grid-cols-3">
                  <div>
                    <dt className="text-white/50">input</dt>
                    <dd className="truncate font-mono text-white/90">{fmt(c.input)}</dd>
                  </div>
                  <div>
                    <dt className="text-white/50">expected</dt>
                    <dd className="truncate font-mono text-white/90">{fmt(c.expected)}</dd>
                  </div>
                  <div>
                    <dt className="text-white/50">actual</dt>
                    <dd className="truncate font-mono text-white/90">
                      {c.error ? <span className="text-red-300">{c.error}</span> : fmt(c.actual)}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary?.fatalError && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-400/40 bg-amber-500/10 p-3 text-sm text-amber-100">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <div className="font-semibold">
              {summary.errorKind === 'timeout'
                ? 'Timeout'
                : summary.errorKind === 'oom'
                ? 'Out of memory'
                : summary.errorKind === 'syntax'
                ? 'Syntax error'
                : 'Runtime error'}
            </div>
            <pre className="mt-1 whitespace-pre-wrap font-mono text-xs text-amber-100/90">
              {summary.fatalError}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
