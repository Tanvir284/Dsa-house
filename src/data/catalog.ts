import { Category, Topic } from '@/types';
import { CATEGORY_IDS } from './category-ids';
import expandedTopics from './curriculum_expanded.json';

/**
 * The light catalogue: what every topic *is*, without any of its content.
 *
 * Most routes — home, dashboard, roadmap, bookmarks, patterns, search — need
 * to list and link topics but never render a lesson. Importing them from
 * `@/data` used to pull the entire authored curriculum (~1.5 MB of lesson
 * prose, snippets, and quiz banks) into those routes, because the barrel
 * builds its content maps at module scope.
 *
 * Import from here for listings; import from `@/data` only where a lesson,
 * snippet, or quiz is actually rendered.
 */

export const categories: Category[] = [
  {
    // Registered late: `CATEGORY_IDS.foundations` was referenced by 35 topics
    // in the expanded curriculum but never listed here, so every foundations
    // topic — Big-O, recursion trees, logarithms, two's complement — was
    // orphaned and rendered nowhere. `tests/data-integrity.test.ts` now fails
    // if any topic points at a category that does not exist.
    id: CATEGORY_IDS.foundations,
    slug: 'foundations',
    title: 'Foundations',
    description: 'Complexity analysis, recursion, logarithms, and the bit-level mechanics everything else is built on.',
    display_order: 1,
  },
  {
    id: CATEGORY_IDS.linear,
    slug: 'linear',
    title: 'Linear Data Structures',
    description: 'Arrays, linked lists, stacks, and queues — the building blocks of memory-efficient sequential storage.',
    display_order: 2,
  },
  {
    id: CATEGORY_IDS.trees,
    slug: 'trees',
    title: 'Trees',
    description: 'Hierarchical structures: binary trees, BSTs, and heap-based priority systems.',
    display_order: 3,
  },
  {
    id: CATEGORY_IDS.graphs,
    slug: 'graphs',
    title: 'Graphs',
    description: 'Networks of nodes and edges with BFS, DFS, and real-world routing applications.',
    display_order: 4,
  },
  {
    id: CATEGORY_IDS.algorithms,
    slug: 'algorithms',
    title: 'Algorithms',
    description: 'Classic search and sort algorithms with rigorous complexity analysis.',
    display_order: 5,
  },
  {
    id: CATEGORY_IDS.patterns,
    slug: 'patterns',
    title: 'Advanced Patterns',
    description: 'Hash maps, heaps, tries, DP, greedy, sliding window, two pointers, and backtracking.',
    display_order: 6,
  },
];

export const topics: Topic[] = (expandedTopics as Topic[]).sort(
  (a, b) => a.display_order - b.display_order,
);

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function topicsInCategory(categoryId: string): Topic[] {
  return topics.filter((t) => t.category_id === categoryId);
}
