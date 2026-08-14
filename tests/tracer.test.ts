import { describe, expect, it } from 'vitest';
import {
  algorithms,
  parseInput,
  runAlgorithm,
  toVisualizerSteps,
  DEFAULT_FRAME_BUDGET,
} from '@/lib/trace';
import { sortingAlgorithms } from '@/lib/trace/algorithms/sorting';
import { searchingAlgorithms, binarySearch } from '@/lib/trace/algorithms/searching';
import type { Trace } from '@/lib/trace/types';

/**
 * Deterministic PRNG (mulberry32).
 *
 * Property tests that use `Math.random()` produce failures nobody can
 * reproduce. Seeding means a red build can be replayed exactly, and the seed
 * is printed in the assertion message when a case fails.
 */
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = Math.imul(s ^ (s >>> 15), 1 | s);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function randomArray(next: () => number, length: number, max = 100): number[] {
  return Array.from({ length }, () => Math.floor(next() * max));
}

/** Multiset equality — order-insensitive, duplicate-sensitive. */
function isPermutationOf(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((v, i) => v === sortedB[i]);
}

function isAscending(a: number[]): boolean {
  return a.every((v, i) => i === 0 || a[i - 1] <= v);
}

/**
 * The invariants every trace must satisfy, regardless of which algorithm
 * produced it. Asserting these centrally means a new algorithm gets the full
 * battery of checks by being added to the registry — there is no per-algorithm
 * test to forget to write.
 */
function assertTraceInvariants(trace: Trace, seed: number): void {
  const context = `${trace.slug} seed=${seed} input=[${trace.input.join(',')}]`;
  const pseudocodeLength = algorithms[trace.slug].pseudocode.length;
  const inputValues = new Set(trace.input);

  expect(trace.frames.length, `${context}: produced no frames`).toBeGreaterThan(0);

  // Values seen when each index was first declared final.
  const sealedAt = new Map<number, number>();
  let previous: number[] | null = null;

  for (const frame of trace.frames) {
    expect(frame.states.length, `${context}: states/values length mismatch`).toBe(
      frame.values.length,
    );

    // Intermediate frames are NOT required to be permutations of the input:
    // insertion sort holds the key in a register while it shifts, so the array
    // legitimately contains a duplicate mid-shift, and merge sort writes out
    // of a buffer. What must never happen is a value appearing that was never
    // in the input — that would mean the algorithm invented data.
    for (const value of frame.values) {
      expect(
        inputValues.has(value),
        `${context}: frame ${frame.index} contains ${value}, which was not in the input`,
      ).toBe(true);
    }

    if (frame.codeLine !== null) {
      expect(frame.codeLine, `${context}: frame ${frame.index} codeLine out of range`)
        .toBeGreaterThanOrEqual(0);
      expect(frame.codeLine).toBeLessThan(pseudocodeLength);
    }

    // A swap must move exactly two cells, and must be a true transposition.
    if (frame.kind === 'swap' && previous) {
      const moved = frame.values.reduce<number[]>(
        (acc, v, i) => (v === previous![i] ? acc : [...acc, i]),
        [],
      );
      expect(moved.length, `${context}: frame ${frame.index} swap moved ${moved.length} cells`)
        .toBeLessThanOrEqual(2);
      if (moved.length === 2) {
        const [i, j] = moved;
        expect(frame.values[i], `${context}: frame ${frame.index} is not a transposition`)
          .toBe(previous[j]);
        expect(frame.values[j]).toBe(previous[i]);
      }
    }

    // "Final position" must actually be final. This is the invariant that
    // catches an algorithm sealing a cell optimistically.
    for (const [index, value] of sealedAt) {
      expect(
        frame.values[index],
        `${context}: index ${index} was sealed as ${value} but changed to ${frame.values[index]} at frame ${frame.index}`,
      ).toBe(value);
    }
    frame.states.forEach((state, i) => {
      if (state === 'sorted' && !sealedAt.has(i)) sealedAt.set(i, frame.values[i]);
    });

    previous = frame.values;
  }

  // The array is whole again by the time the run ends.
  const last = trace.frames[trace.frames.length - 1];
  expect(
    isPermutationOf(last.values, trace.input),
    `${context}: final frame is not a permutation of the input`,
  ).toBe(true);

  // Frames are independent snapshots, not aliases of one mutating array.
  if (trace.frames.length > 1) {
    expect(trace.frames[0].values).not.toBe(trace.frames[1].values);
  }

  // Counters only ever go up.
  for (let i = 1; i < trace.frames.length; i++) {
    const prev = trace.frames[i - 1].metrics;
    const curr = trace.frames[i].metrics;
    expect(curr.comparisons).toBeGreaterThanOrEqual(prev.comparisons);
    expect(curr.swaps).toBeGreaterThanOrEqual(prev.swaps);
    expect(curr.writes).toBeGreaterThanOrEqual(prev.writes);
  }
}

describe('tracer invariants', () => {
  const seeds = [1, 7, 42, 1337, 90210];

  for (const algorithm of sortingAlgorithms) {
    describe(algorithm.slug, () => {
      it('sorts correctly and preserves the multiset', () => {
        for (const seed of seeds) {
          const next = rng(seed);
          for (const length of [0, 1, 2, 3, 8, 17, 40]) {
            const input = randomArray(next, length);
            const trace = runAlgorithm(algorithm, input);
            const output = trace.result as number[];

            expect(
              isAscending(output),
              `${algorithm.slug} seed=${seed}: output not sorted — [${output.join(',')}]`,
            ).toBe(true);
            expect(
              isPermutationOf(output, input),
              `${algorithm.slug} seed=${seed}: output is not a permutation of the input`,
            ).toBe(true);
          }
        }
      });

      it('holds every trace invariant', () => {
        for (const seed of seeds) {
          const next = rng(seed);
          const input = randomArray(next, 12);
          assertTraceInvariants(runAlgorithm(algorithm, input), seed);
        }
      });

      it('handles adversarial inputs', () => {
        const cases: Record<string, number[]> = {
          empty: [],
          single: [5],
          allEqual: [7, 7, 7, 7, 7, 7],
          alreadySorted: [1, 2, 3, 4, 5, 6, 7, 8],
          reversed: [8, 7, 6, 5, 4, 3, 2, 1],
          negatives: [-5, 3, -12, 0, 8, -1],
          duplicatesHeavy: [3, 1, 3, 1, 3, 1, 2, 2],
        };

        for (const [name, input] of Object.entries(cases)) {
          const trace = runAlgorithm(algorithm, input);
          const output = trace.result as number[];
          expect(isAscending(output), `${algorithm.slug}/${name}: not sorted`).toBe(true);
          expect(isPermutationOf(output, input), `${algorithm.slug}/${name}: lost elements`).toBe(
            true,
          );
        }
      });

      it('leaves already-sorted input untouched', () => {
        const sorted = [1, 2, 3, 4, 5, 6, 7, 8];
        const trace = runAlgorithm(algorithm, sorted);
        expect(trace.result, `${algorithm.slug} disturbed sorted input`).toEqual(sorted);
      });

      if (algorithm.adaptive) {
        it('is adaptive: does measurably less work on ordered input', () => {
          // The defining property of an adaptive sort. Asserting it here is
          // what stops `adaptive: true` from being a decorative label — heap
          // sort would fail this, which is exactly why it is not marked.
          const n = 16;
          const ordered = Array.from({ length: n }, (_, i) => i + 1);
          const reversed = [...ordered].reverse();

          const onOrdered = runAlgorithm(algorithm, ordered).metrics.comparisons;
          const onReversed = runAlgorithm(algorithm, reversed).metrics.comparisons;

          expect(
            onOrdered,
            `${algorithm.slug}: ${onOrdered} comparisons on ordered vs ${onReversed} on reversed`,
          ).toBeLessThan(onReversed);
        });
      }
    });
  }

  it('respects the frame budget instead of allocating without bound', () => {
    const input = Array.from({ length: 200 }, (_, i) => 200 - i);
    const trace = runAlgorithm(algorithms['bubble-sort'], input, { budget: 500 });

    expect(trace.frames.length).toBeLessThanOrEqual(500);
    expect(trace.truncated).toBe(true);
    // Truncating the recording must not corrupt the computation.
    expect(isAscending(trace.result as number[])).toBe(true);
  });

  it('caps oversized inputs rather than trusting the caller', () => {
    const input = Array.from({ length: 5000 }, (_, i) => i);
    const trace = runAlgorithm(algorithms['selection-sort'], input, {
      budget: DEFAULT_FRAME_BUDGET,
    });
    expect(trace.input.length).toBeLessThanOrEqual(200);
  });
});

describe('empirical complexity', () => {
  it('bubble sort comparison count stays within its O(n²) bound', () => {
    for (const n of [10, 20, 40]) {
      const input = Array.from({ length: n }, (_, i) => n - i);
      const trace = runAlgorithm(algorithms['bubble-sort'], input, { budget: 1_000_000 });
      expect(trace.metrics.comparisons).toBeLessThanOrEqual((n * (n - 1)) / 2);
    }
  });

  it('binary search comparison count stays within its O(log n) bound', () => {
    for (const n of [8, 64, 128]) {
      const input = Array.from({ length: n }, (_, i) => i * 2);
      const trace = runAlgorithm(binarySearch, input, { target: -1 });
      expect(trace.metrics.comparisons).toBeLessThanOrEqual(Math.ceil(Math.log2(n)) + 2);
    }
  });

  it('merge sort beats bubble sort on comparisons at n=40', () => {
    // The Complexity Lab presents these counters as evidence, so the ordering
    // they imply had better be real.
    const input = Array.from({ length: 40 }, (_, i) => (i * 37) % 40);
    const merge = runAlgorithm(algorithms['merge-sort'], input, { budget: 1_000_000 });
    const bubble = runAlgorithm(algorithms['bubble-sort'], input, { budget: 1_000_000 });
    expect(merge.metrics.comparisons).toBeLessThan(bubble.metrics.comparisons);
  });
});

describe('search algorithms', () => {
  for (const algorithm of searchingAlgorithms) {
    describe(algorithm.slug, () => {
      it('finds a target that is present', () => {
        const next = rng(2024);
        for (let round = 0; round < 25; round++) {
          const input = randomArray(next, 16, 60);
          const prepared = algorithm.requiresSortedInput
            ? [...input].sort((a, b) => a - b)
            : input;
          const target = prepared[Math.floor(next() * prepared.length)];

          const trace = runAlgorithm(algorithm, input, { target });
          const index = trace.result as number;

          expect(index, `${algorithm.slug}: failed to find ${target}`).toBeGreaterThanOrEqual(0);
          expect(trace.input[index], `${algorithm.slug}: returned the wrong index`).toBe(target);
        }
      });

      it('returns -1 for a target that is absent', () => {
        const input = [2, 4, 6, 8, 10, 12, 14, 16];
        for (const target of [-3, 1, 7, 17, 999]) {
          const trace = runAlgorithm(algorithm, input, { target });
          expect(trace.result, `${algorithm.slug}: false positive for ${target}`).toBe(-1);
        }
      });

      it('handles an empty array', () => {
        expect(runAlgorithm(algorithm, [], { target: 5 }).result).toBe(-1);
      });

      it('holds every trace invariant', () => {
        const trace = runAlgorithm(algorithm, [5, 12, 19, 26, 33, 40, 47], { target: 33 });
        assertTraceInvariants(trace, 0);
      });
    });
  }
});

describe('visualizer step adapter', () => {
  it('produces one step per frame with parallel element state', () => {
    const trace = runAlgorithm(algorithms['bubble-sort'], [3, 1, 2]);
    const steps = toVisualizerSteps(trace);

    expect(steps).toHaveLength(trace.frames.length);
    steps.forEach((step, i) => {
      expect(step.elements.map((e) => e.val)).toEqual(trace.frames[i].values);
      expect(step.explanation.length).toBeGreaterThan(0);
    });
  });

  it('maps operation kinds onto the legacy status vocabulary', () => {
    const steps = toVisualizerSteps(runAlgorithm(algorithms['bubble-sort'], [2, 1]));
    const statuses = new Set(steps.map((s) => s.status));
    expect(statuses.has('compare')).toBe(true);
    expect(statuses.has('swap')).toBe(true);
    expect(statuses.has('done')).toBe(true);
  });
});

describe('parseInput', () => {
  it('accepts commas, spaces, and mixed separators', () => {
    expect(parseInput('1, 2,3   4')).toEqual([1, 2, 3, 4]);
  });

  it('accepts negative and decimal values', () => {
    expect(parseInput('-5, 2.5, 0')).toEqual([-5, 2.5, 0]);
  });

  it('returns null when nothing usable is present', () => {
    expect(parseInput('')).toBeNull();
    expect(parseInput('   ')).toBeNull();
    expect(parseInput('abc, def')).toBeNull();
  });

  it('drops non-numeric tokens but keeps the numbers around them', () => {
    expect(parseInput('4, oops, 9')).toEqual([4, 9]);
  });

  it('caps absurdly long input', () => {
    const raw = Array.from({ length: 5000 }, (_, i) => i).join(',');
    expect(parseInput(raw)!.length).toBeLessThanOrEqual(200);
  });
});
