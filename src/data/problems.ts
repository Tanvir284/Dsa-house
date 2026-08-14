import { Problem } from '@/types';
import problemsArena from './problems_arena.json';

/**
 * The full problem set, including every description and multi-language
 * solution — roughly 1.3 MB of JSON.
 *
 * It lives in its own module rather than in `@/data` because only the two
 * `/problems` routes actually render it. When this was re-exported from the
 * barrel, importing `topics` from anywhere pulled the entire problem set into
 * that route's bundle; the home page was shipping 1.3 MB in order to display
 * `problems.length`. Use `PROBLEM_COUNT` from `@/data/counts` for counts.
 */
export const problems: Problem[] = problemsArena as Problem[];

export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}
