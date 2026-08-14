/**
 * Cheap catalogue sizes for pages that display a number but never render the
 * underlying rows.
 *
 * These are literals on purpose. Deriving them (`problems.length`) would mean
 * importing 1.3 MB of problem JSON into the home page just to print "600".
 *
 * They are deliberately *not* trusted to stay correct by convention:
 * `tests/data-integrity.test.ts` loads the real data and fails the build if any
 * of these drifts, so the cheap constant and the expensive source can never
 * silently disagree.
 */
export const PROBLEM_COUNT = 600;
export const TOPIC_COUNT = 150;
export const CATEGORY_COUNT = 6;
