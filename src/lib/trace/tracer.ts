import type {
  AlgorithmArgs,
  AlgorithmDefinition,
  CellState,
  StackFrame,
  Trace,
  TraceFrame,
  TraceMetrics,
  TraceOpKind,
  TracedArrayApi,
  TracerApi,
} from './types';

/**
 * Hard ceiling on recorded frames.
 *
 * An O(n²) sort over a 60-element array emits a few thousand frames, so this
 * is generous for any input a human would actually scrub through. The cap
 * exists because `run` executes user-supplied input sizes: without it, pasting
 * a 5,000-element array into the sandbox would allocate frames until the tab
 * died. On hitting the cap the tracer stops recording but lets the algorithm
 * run to completion, so `result` and the final metrics stay correct.
 */
export const DEFAULT_FRAME_BUDGET = 20_000;

/** Largest input the sandbox will accept, to bound per-frame snapshot cost. */
export const MAX_INPUT_LENGTH = 200;

function emptyMetrics(): TraceMetrics {
  return { reads: 0, writes: 0, comparisons: 0, swaps: 0, maxDepth: 0 };
}

class Tracer implements TracerApi {
  readonly frames: TraceFrame[] = [];
  readonly metrics: TraceMetrics = emptyMetrics();

  private values: number[] = [];
  private sealed = new Set<number>();
  private discarded = new Set<number>();
  private pivotIndex: number | null = null;
  private markers: Record<string, number> = {};
  private rangeBounds: [number, number] | null = null;
  private stack: StackFrame[] = [];
  private line: number | null = null;
  private budget: number;

  truncated = false;

  constructor(budget: number = DEFAULT_FRAME_BUDGET) {
    this.budget = budget;
  }

  get exhausted(): boolean {
    return this.frames.length >= this.budget;
  }

  array(input: number[]): TracedArrayApi {
    this.values = [...input];
    this.emit('init', [], `Starting with ${this.values.length} elements.`);
    return new TracedArray(this);
  }

  at(line: number): void {
    this.line = line;
  }

  mark(name: string, index: number | null): void {
    if (index === null) {
      delete this.markers[name];
    } else {
      this.markers[name] = index;
    }
  }

  scope(lo: number | null, hi?: number): void {
    this.rangeBounds = lo === null ? null : [lo, hi ?? lo];
  }

  enter(label: string, range?: [number, number]): void {
    this.stack.push({ label, range });
    this.metrics.maxDepth = Math.max(this.metrics.maxDepth, this.stack.length);
    this.emit('enter', [], `Call ${label}`);
  }

  exit(): void {
    const frame = this.stack.pop();
    this.emit('exit', [], frame ? `Return from ${frame.label}` : 'Return');
  }

  note(explanation: string): void {
    this.emit('note', [], explanation);
  }

  found(index: number, explanation?: string): void {
    this.emit('found', [index], explanation ?? `Found the target at index ${index}.`);
  }

  discard(lo: number, hi: number): void {
    for (let i = lo; i <= hi; i++) {
      if (i >= 0 && i < this.values.length) this.discarded.add(i);
    }
    this.emit('mark', [], `Indices ${lo}–${hi} can no longer contain the target — ruled out.`);
  }

  /* ---- internals used by TracedArray ---------------------------------- */

  /** @internal */
  _values(): number[] {
    return this.values;
  }

  /** @internal */
  _seal(i: number): void {
    this.sealed.add(i);
  }

  /** @internal */
  _pivot(i: number | null): void {
    this.pivotIndex = i;
  }

  /** @internal */
  _count(key: keyof Omit<TraceMetrics, 'maxDepth'>): void {
    this.metrics[key] += 1;
  }

  /**
   * Record one moment. Every mutable structure is copied here, which is what
   * makes frames safe to index into after the run has finished.
   * @internal
   */
  _emit(kind: TraceOpKind, touched: number[], explanation: string): void {
    this.emit(kind, touched, explanation);
  }

  private emit(kind: TraceOpKind, touched: number[], explanation: string): void {
    if (this.frames.length >= this.budget) {
      this.truncated = true;
      return;
    }

    const states: CellState[] = this.values.map((_, i) => {
      if (touched.includes(i)) {
        if (kind === 'compare') return 'compare';
        if (kind === 'swap') return 'swap';
        if (kind === 'found') return 'found';
        if (kind === 'write' || kind === 'read') return 'active';
      }
      if (this.pivotIndex === i) return 'pivot';
      if (this.sealed.has(i)) return 'sorted';
      if (this.discarded.has(i)) return 'discarded';
      if (this.rangeBounds && i >= this.rangeBounds[0] && i <= this.rangeBounds[1]) return 'range';
      return 'default';
    });

    this.frames.push({
      index: this.frames.length,
      kind,
      values: [...this.values],
      states,
      touched: [...touched],
      markers: { ...this.markers },
      range: this.rangeBounds ? [...this.rangeBounds] : null,
      stack: this.stack.map((f) => ({ ...f })),
      explanation,
      codeLine: this.line,
      metrics: { ...this.metrics },
    });
  }
}

class TracedArray implements TracedArrayApi {
  constructor(private t: Tracer) {}

  get length(): number {
    return this.t._values().length;
  }

  get(i: number): number {
    const v = this.t._values()[i];
    this.t._count('reads');
    this.t._emit('read', [i], `Read a[${i}] = ${v}.`);
    return v;
  }

  set(i: number, value: number): void {
    const arr = this.t._values();
    const previous = arr[i];
    arr[i] = value;
    this.t._count('writes');
    this.t._emit(
      'write',
      [i],
      previous === undefined
        ? `Write ${value} into a[${i}].`
        : `Write ${value} into a[${i}] (was ${previous}).`,
    );
  }

  gt(i: number, j: number): boolean {
    const arr = this.t._values();
    const result = arr[i] > arr[j];
    this.t._count('comparisons');
    this.t._emit(
      'compare',
      [i, j],
      `Compare a[${i}] (${arr[i]}) with a[${j}] (${arr[j]}) — ${arr[i]} ${result ? '>' : '≤'} ${arr[j]}.`,
    );
    return result;
  }

  lt(i: number, j: number): boolean {
    const arr = this.t._values();
    const result = arr[i] < arr[j];
    this.t._count('comparisons');
    this.t._emit(
      'compare',
      [i, j],
      `Compare a[${i}] (${arr[i]}) with a[${j}] (${arr[j]}) — ${arr[i]} ${result ? '<' : '≥'} ${arr[j]}.`,
    );
    return result;
  }

  cmp(i: number, value: number): number {
    const arr = this.t._values();
    const result = arr[i] === value ? 0 : arr[i] < value ? -1 : 1;
    const symbol = result === 0 ? '=' : result < 0 ? '<' : '>';
    this.t._count('comparisons');
    this.t._emit('compare', [i], `Compare a[${i}] (${arr[i]}) with ${value} — ${arr[i]} ${symbol} ${value}.`);
    return result;
  }

  swap(i: number, j: number): void {
    const arr = this.t._values();
    const a = arr[i];
    const b = arr[j];
    arr[i] = b;
    arr[j] = a;
    this.t._count('swaps');
    this.t._count('writes');
    this.t._count('writes');
    this.t._emit('swap', [i, j], `Swap a[${i}] (${a}) with a[${j}] (${b}).`);
  }

  seal(i: number): void {
    if (i < 0 || i >= this.length) return;
    this.t._seal(i);
    this.t._emit('seal', [i], `a[${i}] = ${this.t._values()[i]} is now in its final position.`);
  }

  sealRange(lo: number, hi: number): void {
    for (let i = lo; i <= hi; i++) {
      if (i >= 0 && i < this.length) this.t._seal(i);
    }
    this.t._emit('seal', [], `Indices ${lo}–${hi} are now in their final positions.`);
  }

  pivot(i: number | null): void {
    this.t._pivot(i);
    if (i !== null) {
      this.t._emit('mark', [i], `Pivot is a[${i}] = ${this.t._values()[i]}.`);
    }
  }

  peek(i: number): number {
    return this.t._values()[i];
  }

  snapshot(): number[] {
    return [...this.t._values()];
  }
}

export interface RunOptions extends AlgorithmArgs {
  budget?: number;
}

/**
 * Execute an algorithm and return its recording.
 *
 * The algorithm runs for real — the returned `result` is whatever it computed.
 * The trace is the side effect.
 */
export function runAlgorithm(
  algorithm: AlgorithmDefinition,
  input: number[],
  options: RunOptions = {},
): Trace {
  const bounded = input.slice(0, MAX_INPUT_LENGTH);
  const prepared = algorithm.requiresSortedInput ? [...bounded].sort((a, b) => a - b) : bounded;

  const tracer = new Tracer(options.budget ?? DEFAULT_FRAME_BUDGET);
  const result = algorithm.run(tracer, prepared, { target: options.target });

  tracer._emit('done', [], 'Done.');

  return {
    slug: algorithm.slug,
    title: algorithm.title,
    input: prepared,
    frames: tracer.frames,
    metrics: tracer.metrics,
    result,
    truncated: tracer.truncated,
  };
}
