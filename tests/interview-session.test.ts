import { describe, expect, it } from 'vitest';
import {
  buildSessionQueue,
  scoreSession,
  summarizeSession,
  type CompletedSession,
  type SessionConfig,
  type SessionProblemResult,
} from '@/lib/interview-session';
import type { Problem } from '@/types';

function makeProblem(id: string, difficulty: Problem['difficulty'], category = 'linear'): Problem {
  return {
    id,
    slug: id,
    title: id,
    difficulty,
    source: 'LeetCode',
    category,
    topic: 'Array',
    description: '',
    constraints: [],
    solutions: { python: '', cpp: '', java: '', explanation: '' },
    diagram: '',
  };
}

const POOL: Problem[] = [
  ...Array.from({ length: 20 }, (_, i) => makeProblem(`easy-${i}`, 'Easy')),
  ...Array.from({ length: 15 }, (_, i) => makeProblem(`medium-${i}`, 'Medium')),
  ...Array.from({ length: 5 }, (_, i) => makeProblem(`hard-${i}`, 'Hard')),
];

const baseConfig: SessionConfig = {
  durationMin: 30,
  mix: 'balanced',
  problemCount: 10,
  category: null,
};

describe('buildSessionQueue', () => {
  it('returns exactly the requested count when the pool is large enough', () => {
    const queue = buildSessionQueue(POOL, baseConfig, 1);
    expect(queue).toHaveLength(10);
  });

  it('never repeats a problem within one session', () => {
    const queue = buildSessionQueue(POOL, { ...baseConfig, problemCount: 30 }, 7);
    expect(new Set(queue.map((p) => p.id)).size).toBe(queue.length);
  });

  it('degrades gracefully instead of returning nothing when asked for more than the pool holds', () => {
    const queue = buildSessionQueue(POOL, { ...baseConfig, problemCount: 500 }, 3);
    expect(queue.length).toBe(POOL.length);
  });

  it('is deterministic for a fixed seed', () => {
    const a = buildSessionQueue(POOL, baseConfig, 42);
    const b = buildSessionQueue(POOL, baseConfig, 42);
    expect(a.map((p) => p.id)).toEqual(b.map((p) => p.id));
  });

  it('two different seeds do not always produce the same queue', () => {
    // Not a hard guarantee for every possible seed pair, but true often
    // enough over a spread of seeds that a collision on all of them would
    // indicate the PRNG isn't actually varying the draw.
    const seeds = [1, 2, 3, 4, 5];
    const queues = seeds.map((s) => buildSessionQueue(POOL, baseConfig, s).map((p) => p.id).join(','));
    expect(new Set(queues).size).toBeGreaterThan(1);
  });

  it('returns an empty queue for an empty pool without throwing', () => {
    expect(buildSessionQueue([], baseConfig, 1)).toEqual([]);
  });

  it('respects a category filter', () => {
    const mixed = [...POOL, makeProblem('graph-1', 'Easy', 'graphs')];
    const queue = buildSessionQueue(mixed, { ...baseConfig, category: 'graphs', problemCount: 5 }, 1);
    expect(queue.every((p) => p.category === 'graphs')).toBe(true);
    expect(queue).toHaveLength(1);
  });

  it('the "challenge" mix skews harder than the "easy" mix over many draws', () => {
    // Statistical property of the weight tables, not a single-seed fluke —
    // run over enough seeds that the difference can't be noise.
    const hardShareFor = (mix: SessionConfig['mix']) => {
      let hardCount = 0;
      let total = 0;
      for (let seed = 0; seed < 40; seed++) {
        const queue = buildSessionQueue(POOL, { ...baseConfig, mix, problemCount: 8 }, seed);
        hardCount += queue.filter((p) => p.difficulty === 'Hard').length;
        total += queue.length;
      }
      return hardCount / total;
    };

    expect(hardShareFor('challenge')).toBeGreaterThan(hardShareFor('easy'));
  });
});

function result(problemId: string, outcome: SessionProblemResult['outcome'], ms = 60_000): SessionProblemResult {
  return { problemId, outcome, timeSpentMs: ms };
}

describe('scoreSession', () => {
  const byId = new Map(POOL.map((p) => [p.id, p]));

  it('awards nothing for a session with no solves', () => {
    const results = [result('easy-0', 'skipped'), result('easy-1', 'unattempted')];
    expect(scoreSession(results, byId)).toBe(0);
  });

  it('weights harder solves more than easier ones', () => {
    const easyScore = scoreSession([result('easy-0', 'solved')], byId);
    const hardScore = scoreSession([result('hard-0', 'solved')], byId);
    expect(hardScore).toBeGreaterThan(easyScore);
  });

  it('sums across multiple solves', () => {
    const one = scoreSession([result('easy-0', 'solved')], byId);
    const two = scoreSession([result('easy-0', 'solved'), result('easy-1', 'solved')], byId);
    expect(two).toBe(one * 2);
  });

  it('ignores a result whose problem id is not in the lookup', () => {
    expect(scoreSession([result('does-not-exist', 'solved')], byId)).toBe(0);
  });
});

describe('summarizeSession', () => {
  function session(results: SessionProblemResult[]): CompletedSession {
    return {
      id: 's1',
      config: baseConfig,
      startedAt: new Date(0).toISOString(),
      endedAt: new Date(1000).toISOString(),
      results,
      xpAwarded: 0,
      endedByTimeout: false,
    };
  }

  it('computes accuracy from solved vs. attempted, excluding unattempted', () => {
    const summary = summarizeSession(
      session([
        result('a', 'solved'),
        result('b', 'solved'),
        result('c', 'skipped'),
        result('d', 'unattempted'),
      ]),
    );
    expect(summary.solved).toBe(2);
    expect(summary.skipped).toBe(1);
    expect(summary.unattempted).toBe(1);
    expect(summary.accuracy).toBeCloseTo(2 / 3);
  });

  it('accuracy is 0 (not NaN) when nothing was attempted', () => {
    const summary = summarizeSession(session([result('a', 'unattempted', 0)]));
    expect(summary.accuracy).toBe(0);
    expect(Number.isNaN(summary.accuracy)).toBe(false);
  });

  it('average time only counts attempted problems', () => {
    const summary = summarizeSession(
      session([
        result('a', 'solved', 100_000),
        result('b', 'skipped', 50_000),
        result('c', 'unattempted', 0),
      ]),
    );
    expect(summary.avgTimePerAttemptedMs).toBe(75_000);
  });
});
