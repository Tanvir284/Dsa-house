/**
 * DSA House — In-Browser Code Runner
 *
 * Public types shared across the runner surface. Kept intentionally small so
 * new backends (WASI, containerized, worker-pool) can slot in without churn.
 */

export type RunnerLang = 'python' | 'javascript';

export type CompareMode =
  | 'deep' /** Strict deep-equal (default) */
  | 'set-sorted' /** Order-insensitive: sort both arrays before comparing */
  | 'trim'; /** String compare after trimming whitespace on both sides */

/** A single canonical test case for a problem. */
export interface TestCase {
  id: string;
  /** Positional arguments forwarded to the entry function. */
  input: unknown[];
  /** Canonical expected value. */
  expected: unknown;
  /** How `actual` and `expected` should be compared. Defaults to 'deep'. */
  compare?: CompareMode;
  /** Optional human-readable label displayed in the UI. */
  label?: string;
}

/** Function/method the runner should invoke for each language. */
export interface EntrySignature {
  python: {
    /** If set, the runner instantiates `className()` and invokes the method. */
    className?: string;
    methodName: string;
  };
  javascript: {
    fnName: string;
  };
}

/** Full test specification associated with a problem. */
export interface ProblemTestSpec {
  problemId: string;
  entry: EntrySignature;
  cases: TestCase[];
  /** Optional starter code shown in the editor per language. */
  starter?: Partial<Record<RunnerLang, string>>;
  isCustomInputOnly?: boolean;
}

export interface CaseResult {
  id: string;
  label?: string;
  passed: boolean;
  input: unknown[];
  expected: unknown;
  actual: unknown;
  durationMs: number;
  /** Runtime error message (per-case), if any. */
  error?: string;
  /** Any stdout captured during the case. */
  stdout?: string;
}

export type FatalKind = 'syntax' | 'runtime' | 'timeout' | 'oom' | 'unknown';

export interface RunResult {
  ok: boolean;
  totalMs: number;
  cases: CaseResult[];
  /**
   * Set only when the whole run failed before per-case results could be
   * collected (compile/syntax error, timeout, OOM, worker crash, etc.).
   */
  fatalError?: string;
  errorKind?: FatalKind;
}

/** Hard wall-clock timeout enforced by the runner. */
export const RUNNER_TIMEOUT_MS = 10_000;

/** QuickJS memory budget for a single JS execution. */
export const RUNNER_JS_MEMORY_LIMIT = 64 * 1024 * 1024;
