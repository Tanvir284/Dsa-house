import type { AlgorithmDefinition, Trace, TraceFrame } from './types';
import type { VisualizerStep, VisualizerStatus } from '@/types';
import { sortingAlgorithms } from './algorithms/sorting';
import { searchingAlgorithms } from './algorithms/searching';
import { runAlgorithm, MAX_INPUT_LENGTH } from './tracer';

export * from './types';
export { runAlgorithm, DEFAULT_FRAME_BUDGET, MAX_INPUT_LENGTH } from './tracer';

/** Every traceable algorithm, keyed by slug. */
export const algorithms: Record<string, AlgorithmDefinition> = Object.fromEntries(
  [...sortingAlgorithms, ...searchingAlgorithms].map((a) => [a.slug, a]),
);

export const algorithmSlugs = Object.keys(algorithms);

export function getAlgorithm(slug: string): AlgorithmDefinition | undefined {
  return algorithms[slug];
}

export function isTraceableSlug(slug: string): boolean {
  return slug in algorithms;
}

/**
 * Parse a comma/space separated list of integers from sandbox input.
 *
 * Returns `null` rather than an empty array when nothing usable is found, so
 * callers can distinguish "user cleared the field" from "user typed garbage".
 */
export function parseInput(raw: string): number[] | null {
  const values = raw
    .split(/[,\s]+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isFinite(n));

  if (values.length === 0) return null;
  return values.slice(0, MAX_INPUT_LENGTH);
}

/** Map a frame's operation kind onto the legacy visualizer status vocabulary. */
function statusFor(frame: TraceFrame): VisualizerStatus {
  switch (frame.kind) {
    case 'compare':
      return 'compare';
    case 'swap':
      return 'swap';
    case 'found':
      return 'found';
    case 'write':
      return 'insert';
    case 'enter':
    case 'exit':
      return 'traversing';
    case 'done':
      return 'done';
    default:
      return 'idle';
  }
}

/**
 * Adapt a trace to the `VisualizerStep[]` shape the existing renderers consume.
 *
 * This is the seam that let the tracer land without rewriting every visualizer
 * component in the same change. New surfaces should read `TraceFrame` directly
 * — it carries the call stack, metrics, and range data that this shape drops.
 */
export function toVisualizerSteps(trace: Trace): VisualizerStep[] {
  return trace.frames.map((frame) => ({
    elements: frame.values.map((val, i) => ({ val, state: frame.states[i] })),
    highlights: frame.touched,
    markers: frame.markers,
    explanation: frame.explanation,
    codeLine: frame.codeLine ?? undefined,
    status: statusFor(frame),
  }));
}

/** Convenience: run `slug` and return legacy steps in one call. */
export function traceToSteps(
  slug: string,
  input: number[],
  target?: number,
): VisualizerStep[] {
  const algorithm = getAlgorithm(slug);
  if (!algorithm) return [];
  return toVisualizerSteps(runAlgorithm(algorithm, input, { target }));
}
