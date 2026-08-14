import type { Problem, ProblemDifficulty } from '@/types';

/**
 * Mock interview session engine.
 *
 * A timed, multi-problem practice loop distinct from the Daily Challenge
 * (one problem, no clock) and from opening a problem directly from the
 * catalogue (no time pressure, no session report). The value here is the
 * loop itself — pick a duration and a difficulty mix, work under a visible
 * countdown, and get a rubric afterward — which is closer to what an actual
 * interview round feels like than either existing surface.
 *
 * Kept as a plain module (selection, scoring, persistence) separate from the
 * page component and from the global Zustand store, mirroring how
 * `daily-challenges.ts` holds its own data independent of `store.ts` — the
 * store is still the place XP and problem-completion get recorded, but the
 * session's own shape doesn't need to live inside it.
 */

export const SESSION_DURATIONS_MIN = [15, 30, 45, 60] as const;
export type SessionDurationMin = (typeof SESSION_DURATIONS_MIN)[number];

export type DifficultyMix = 'easy' | 'balanced' | 'challenge';

const MIX_WEIGHTS: Record<DifficultyMix, Record<ProblemDifficulty, number>> = {
  // Weighted rather than a hard filter, so a session still occasionally
  // surfaces a stretch problem even on the gentlest setting — closer to how
  // a real interview loop is rarely single-difficulty.
  easy: { Easy: 0.7, Medium: 0.28, Hard: 0.02 },
  balanced: { Easy: 0.4, Medium: 0.45, Hard: 0.15 },
  challenge: { Easy: 0.15, Medium: 0.45, Hard: 0.4 },
};

export const DIFFICULTY_MIX_LABELS: Record<DifficultyMix, string> = {
  easy: 'Warm-up (mostly Easy)',
  balanced: 'Balanced (typical onsite mix)',
  challenge: 'Challenge (Medium/Hard heavy)',
};

/**
 * XP awarded per solved problem, by difficulty — mirrors the weight given to
 * harder problems elsewhere (quizzes, daily challenge). Exported so the page
 * can award this difficulty-weighted amount directly for problems that
 * bypass `toggleProblemCompletion` (a re-solved problem that was already
 * marked complete before the session started), without recomputing the
 * table or double-crediting the flat PROBLEM_COMPLETION_XP that toggle
 * already grants for a genuinely new completion.
 */
export const XP_BY_DIFFICULTY: Record<ProblemDifficulty, number> = {
  Easy: 40,
  Medium: 70,
  Hard: 120,
};

export interface SessionConfig {
  durationMin: SessionDurationMin;
  mix: DifficultyMix;
  problemCount: number;
  /** Restrict the pool to one category slug (e.g. 'graphs'), or null for all. */
  category: string | null;
}

export type ProblemOutcome = 'unattempted' | 'solved' | 'skipped';

export interface SessionProblemResult {
  problemId: string;
  outcome: ProblemOutcome;
  /** ms spent on this problem before moving on, however it was resolved. */
  timeSpentMs: number;
}

export interface CompletedSession {
  id: string;
  config: SessionConfig;
  startedAt: string;
  endedAt: string;
  results: SessionProblemResult[];
  xpAwarded: number;
  /** True if the session ended because time ran out rather than the user
   * finishing early or working through the whole queue. */
  endedByTimeout: boolean;
}

/** Deterministic shuffle (Fisher–Yates over a seeded PRNG) so a session can
 * be reproduced from its seed for debugging, without needing true randomness
 * to matter for the feature itself. */
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = Math.imul(s ^ (s >>> 15), 1 | s);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function weightedPick(next: () => number, weights: Record<ProblemDifficulty, number>): ProblemDifficulty {
  const roll = next();
  let cumulative = 0;
  for (const difficulty of ['Easy', 'Medium', 'Hard'] as ProblemDifficulty[]) {
    cumulative += weights[difficulty];
    if (roll < cumulative) return difficulty;
  }
  return 'Hard';
}

/**
 * Build a problem queue for a session.
 *
 * Draws by weighted-random difficulty rather than "first N of each bucket",
 * so two sessions with the same config don't always open with the same
 * problem — and so a session that asks for more problems of a difficulty
 * than exist in the pool degrades gracefully (falls through to whatever's
 * left) instead of returning a short queue.
 */
export function buildSessionQueue(
  allProblems: Problem[],
  config: SessionConfig,
  seed: number = Date.now(),
): Problem[] {
  const pool = config.category
    ? allProblems.filter((p) => p.category === config.category)
    : allProblems;

  if (pool.length === 0) return [];

  const byDifficulty: Record<ProblemDifficulty, Problem[]> = { Easy: [], Medium: [], Hard: [] };
  for (const p of pool) byDifficulty[p.difficulty].push(p);

  const next = mulberry32(seed);
  const weights = MIX_WEIGHTS[config.mix];
  const used = new Set<string>();
  const queue: Problem[] = [];

  // Shuffle each bucket once up front so repeated picks from a bucket walk
  // through it in a fixed random order rather than re-rolling a full-bucket
  // scan (O(1) amortised per pick instead of O(bucket size)).
  const cursors: Record<ProblemDifficulty, number> = { Easy: 0, Medium: 0, Hard: 0 };
  const shuffled: Record<ProblemDifficulty, Problem[]> = {
    Easy: shuffle(byDifficulty.Easy, next),
    Medium: shuffle(byDifficulty.Medium, next),
    Hard: shuffle(byDifficulty.Hard, next),
  };

  let attempts = 0;
  const maxAttempts = config.problemCount * 20;

  while (queue.length < config.problemCount && attempts < maxAttempts) {
    attempts += 1;
    const difficulty = weightedPick(next, weights);
    let picked: Problem | undefined;

    // Walk the preferred bucket first; if it's exhausted, fall through the
    // other buckets in a fixed order rather than giving up on this slot.
    for (const d of [difficulty, 'Medium', 'Easy', 'Hard'] as ProblemDifficulty[]) {
      const list = shuffled[d];
      while (cursors[d] < list.length) {
        const candidate = list[cursors[d]];
        cursors[d] += 1;
        if (!used.has(candidate.id)) {
          picked = candidate;
          break;
        }
      }
      if (picked) break;
    }

    if (!picked) break; // pool fully exhausted
    used.add(picked.id);
    queue.push(picked);
  }

  return queue;
}

function shuffle<T>(arr: T[], next: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Fill in an 'unattempted' result for every queued problem the session
 * didn't reach yet — used whenever a session ends before the whole queue is
 * resolved, whether the clock ran out or the user ended it early, so the
 * summary always accounts for the full queue rather than just what was
 * explicitly solved or skipped.
 */
export function padUnattempted(
  results: SessionProblemResult[],
  queue: Problem[],
  currentIndex: number,
  currentStepStartedAt: number,
  now: number,
): SessionProblemResult[] {
  const padded = [...results];
  for (let i = currentIndex; i < queue.length; i++) {
    if (!padded.some((r) => r.problemId === queue[i].id)) {
      padded.push({
        problemId: queue[i].id,
        outcome: 'unattempted',
        timeSpentMs: i === currentIndex ? now - currentStepStartedAt : 0,
      });
    }
  }
  return padded;
}

/** Total XP a finished session earns, by summing solved-problem XP. */
export function scoreSession(
  results: SessionProblemResult[],
  problemsById: Map<string, Problem>,
): number {
  let total = 0;
  for (const r of results) {
    if (r.outcome !== 'solved') continue;
    const problem = problemsById.get(r.problemId);
    if (problem) total += XP_BY_DIFFICULTY[problem.difficulty];
  }
  return total;
}

export interface SessionSummary {
  solved: number;
  skipped: number;
  unattempted: number;
  totalProblems: number;
  /** Solved / (solved + skipped), excluding problems never reached — an
   * unattempted problem reflects the clock running out, not a wrong answer. */
  accuracy: number;
  avgTimePerAttemptedMs: number;
}

export function summarizeSession(session: CompletedSession): SessionSummary {
  const solved = session.results.filter((r) => r.outcome === 'solved').length;
  const skipped = session.results.filter((r) => r.outcome === 'skipped').length;
  const unattempted = session.results.filter((r) => r.outcome === 'unattempted').length;
  const attempted = solved + skipped;
  const attemptedTimeMs = session.results
    .filter((r) => r.outcome !== 'unattempted')
    .reduce((sum, r) => sum + r.timeSpentMs, 0);

  return {
    solved,
    skipped,
    unattempted,
    totalProblems: session.results.length,
    accuracy: attempted > 0 ? solved / attempted : 0,
    avgTimePerAttemptedMs: attempted > 0 ? attemptedTimeMs / attempted : 0,
  };
}

const HISTORY_KEY = 'dsa_interview_sessions';
/** Bound history growth — a rubric only needs recent context, not every
 * session a long-time user has ever run. */
const MAX_HISTORY = 25;

export function loadSessionHistory(): CompletedSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as CompletedSession[]) : [];
  } catch {
    return [];
  }
}

export function saveSessionToHistory(session: CompletedSession): CompletedSession[] {
  const history = [session, ...loadSessionHistory()].slice(0, MAX_HISTORY);
  if (typeof window !== 'undefined') {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
  return history;
}
