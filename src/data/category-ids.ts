/**
 * Stable category identifiers.
 *
 * These live in their own module — rather than alongside the array/list
 * curriculum where they started — so that anything needing only an id does not
 * transitively import 50 KB of lesson prose. `src/data/catalog.ts` depends on
 * this and nothing else heavy, which is what keeps the topic index cheap.
 */
export const CATEGORY_IDS = {
  foundations: 'c0c62d00-4bfa-4c41-867b-1d743a60c04f',
  linear: '12d1b54a-bd54-4f05-99fe-005085e3cb76',
  trees: 'ba3c9e6d-66e8-46cb-8d0b-60a6cb774bd0',
  graphs: '5f9227eb-5f33-40a1-8d26-6f8101a070eb',
  algorithms: 'a87e35b7-7ab6-4c9b-b5b6-7f4144e5904d',
  patterns: 'f8a2c910-4e5b-4d6a-9c1f-2b8e7d3a4f50',
} as const;
