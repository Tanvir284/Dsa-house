/**
 * Core types for the instrumented execution tracer.
 *
 * The central idea: an algorithm is written **once**, as ordinary readable
 * code, against the `Tracer` API. Every observable operation it performs —
 * a read, a write, a comparison, a swap — is recorded as it happens. The
 * visualization is therefore a *byproduct of actually executing the
 * algorithm*, never a parallel artifact that can drift out of sync with it.
 *
 * This replaces the previous approach of hand-authoring `steps.push({...})`
 * calls alongside each algorithm, where the narration and the logic were two
 * separate things that had to be kept in agreement by hand.
 */

/** Visual state of a single cell at a point in time. */
export type CellState =
  | 'default'
  | 'compare'
  | 'swap'
  | 'sorted'
  | 'pivot'
  | 'active'
  | 'range'
  | 'found'
  | 'discarded';

/** The kind of operation that produced a frame. */
export type TraceOpKind =
  | 'init'
  | 'read'
  | 'write'
  | 'compare'
  | 'swap'
  | 'seal'
  | 'mark'
  | 'range'
  | 'enter'
  | 'exit'
  | 'note'
  | 'found'
  | 'done';

/**
 * Counters accumulated over a run. Because these are incremented by the
 * instrumentation rather than by the algorithm author, they are trustworthy
 * enough to use as empirical complexity data in the Complexity Lab.
 */
export interface TraceMetrics {
  reads: number;
  writes: number;
  comparisons: number;
  swaps: number;
  /** Peak depth of the logical call stack. */
  maxDepth: number;
  /** Total frames emitted. */
  frames: number;
}

/** A single entry on the logical call stack, for recursive algorithms. */
export interface StackFrame {
  label: string;
  /** Inclusive array range this invocation is responsible for, if any. */
  range?: [number, number];
}

/**
 * One observable moment in the algorithm's execution.
 *
 * Frames are immutable snapshots — the tracer deep-copies mutable state on
 * emit, so consumers can index into the trace freely (scrub backwards, jump
 * to an arbitrary step) without the algorithm's later mutations leaking
 * backwards into earlier frames.
 */
export interface TraceFrame {
  /** Monotonic index within the trace. */
  index: number;
  kind: TraceOpKind;
  /** Values at this moment. */
  values: number[];
  /** Per-index visual state, parallel to `values`. */
  states: CellState[];
  /** Indices directly involved in this operation. */
  touched: number[];
  /** Named cursors, e.g. `{ low: 0, high: 7, mid: 3 }`. */
  markers: Record<string, number>;
  /** Inclusive sub-range under consideration, if any. */
  range: [number, number] | null;
  /** Logical call stack at this moment, outermost first. */
  stack: StackFrame[];
  /** Human-readable narration, generated from the operation itself. */
  explanation: string;
  /** Index into the algorithm's `pseudocode` array. */
  codeLine: number | null;
  /** Running counters as of this frame. */
  metrics: TraceMetrics;
}

/** A completed recording. */
export interface Trace {
  slug: string;
  title: string;
  input: number[];
  frames: TraceFrame[];
  metrics: TraceMetrics;
  /** Whatever the algorithm returned (e.g. a found index). */
  result: unknown;
  /** True if recording stopped early because the frame budget was hit. */
  truncated: boolean;
}

export interface Complexity {
  best: string;
  average: string;
  worst: string;
  space: string;
}

/** Options accepted by every algorithm's `run`. */
export interface AlgorithmArgs {
  /** Search target, pivot seed, or similar scalar parameter. */
  target?: number;
}

export interface AlgorithmDefinition {
  slug: string;
  title: string;
  /** One line per step, indexed by `Tracer.at()`. */
  pseudocode: string[];
  complexity: Complexity;
  /**
   * True when the algorithm exploits existing order — an adaptive sort does
   * no exchanges on already-sorted input, which is a property worth testing
   * and worth teaching. Heap sort is the classic non-adaptive counterexample:
   * building the heap reorders ascending data regardless.
   */
  adaptive?: boolean;
  /** Sorting algorithms get their input shuffled; searches get it sorted. */
  requiresSortedInput?: boolean;
  /** Whether the algorithm takes a `target` argument. */
  usesTarget?: boolean;
  defaultInput: number[];
  defaultTarget?: number;
  run: (t: TracerApi, input: number[], args: AlgorithmArgs) => unknown;
}

/**
 * The surface an algorithm author writes against.
 *
 * Deliberately narrow: if an operation is not on this interface, it cannot be
 * recorded, which keeps traces complete by construction.
 */
export interface TracerApi {
  /** Wrap an input array for instrumented access. */
  array(input: number[]): TracedArrayApi;
  /** Set the pseudocode line subsequent operations should attribute to. */
  at(line: number): void;
  /** Set or move a named cursor. Pass `null` to remove it. */
  mark(name: string, index: number | null): void;
  /** Constrain the highlighted sub-range. Pass `null` to clear. */
  scope(lo: number | null, hi?: number): void;
  /** Push a logical call-stack frame. */
  enter(label: string, range?: [number, number]): void;
  /** Pop a logical call-stack frame. */
  exit(): void;
  /** Emit a narration-only frame. */
  note(explanation: string): void;
  /** Emit a terminal "found it" frame at `index`. */
  found(index: number, explanation?: string): void;
}

export interface TracedArrayApi {
  readonly length: number;
  /** Instrumented read. */
  get(i: number): number;
  /** Instrumented write. */
  set(i: number, value: number): void;
  /** Instrumented `a[i] > a[j]`. */
  gt(i: number, j: number): boolean;
  /** Instrumented `a[i] < a[j]`. */
  lt(i: number, j: number): boolean;
  /** Instrumented comparison of `a[i]` against a loose value. */
  cmp(i: number, value: number): number;
  /** Instrumented exchange of two cells. */
  swap(i: number, j: number): void;
  /** Mark an index as finalised (it will render as sorted from now on). */
  seal(i: number): void;
  /** Mark an inclusive range as finalised. */
  sealRange(lo: number, hi: number): void;
  /** Mark an index as the current pivot. Pass `null` to clear. */
  pivot(i: number | null): void;
  /** Uninstrumented peek — for assertions and bookkeeping, records nothing. */
  peek(i: number): number;
  /** Uninstrumented snapshot of current values. */
  snapshot(): number[];
}
