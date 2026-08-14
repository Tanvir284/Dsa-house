export interface VisualizerCatalogEntry {
  slug: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

/** Single source of truth for all interactive visualizer sandboxes. */
export const visualizerCatalog: VisualizerCatalogEntry[] = [
  {
    slug: 'bubble-sort',
    title: 'Bubble Sort',
    description: 'Watch adjacent comparisons and swap sequences as values bubble into place.',
    difficulty: 'Beginner',
    category: 'Sorting',
  },
  {
    slug: 'binary-search',
    title: 'Binary Search',
    description: 'See midpoint calculations and watch the search window shrink by half each step.',
    difficulty: 'Beginner',
    category: 'Searching',
  },
  {
    slug: 'merge-sort',
    title: 'Merge Sort',
    description: 'Observe divide-and-conquer: lists split apart, then merge back sorted.',
    difficulty: 'Intermediate',
    category: 'Sorting',
  },
  {
    slug: 'quick-sort',
    title: 'Quick Sort',
    description: 'Visualize pivot selection, Lomuto partitioning, and recursive sub-ranges.',
    difficulty: 'Intermediate',
    category: 'Sorting',
  },
  {
    slug: 'selection-sort',
    title: 'Selection Sort',
    description: 'Scan for the smallest remaining value, then place it in one exchange per pass.',
    difficulty: 'Beginner',
    category: 'Sorting',
  },
  {
    slug: 'insertion-sort',
    title: 'Insertion Sort',
    description: 'Shift each key leftwards into an ordered prefix — the sort card players use.',
    difficulty: 'Beginner',
    category: 'Sorting',
  },
  {
    slug: 'heap-sort',
    title: 'Heap Sort',
    description: 'Build a max-heap, then repeatedly swap the root to the end and sift down.',
    difficulty: 'Advanced',
    category: 'Sorting',
  },
  {
    slug: 'shell-sort',
    title: 'Shell Sort',
    description: 'Insertion sort over shrinking gaps, so distant elements move early.',
    difficulty: 'Advanced',
    category: 'Sorting',
  },
  {
    slug: 'linear-search',
    title: 'Linear Search',
    description: 'The baseline every other search is measured against — check each cell in turn.',
    difficulty: 'Beginner',
    category: 'Searching',
  },
  {
    slug: 'jump-search',
    title: 'Jump Search',
    description: 'Skip ahead in √n blocks, then scan the one block the target must be in.',
    difficulty: 'Intermediate',
    category: 'Searching',
  },
  {
    slug: 'linked-list',
    title: 'Linked List',
    description: 'Insert and delete nodes, watch pointer traversal animations step by step.',
    difficulty: 'Beginner',
    category: 'Data Structures',
  },
  {
    slug: 'stack',
    title: 'Stack',
    description: 'Push and pop elements with LIFO stack behavior and overflow protection.',
    difficulty: 'Beginner',
    category: 'Data Structures',
  },
  {
    slug: 'queue',
    title: 'Queue',
    description: 'Enqueue and dequeue elements with FIFO queue behavior on a conveyor belt.',
    difficulty: 'Beginner',
    category: 'Data Structures',
  },
  {
    slug: 'binary-search-tree',
    title: 'Binary Search Tree',
    description: 'Insert elements and watch the tree grow. Search highlights the traversal path.',
    difficulty: 'Intermediate',
    category: 'Trees',
  },
  {
    slug: 'bfs',
    title: 'BFS Traversal',
    description: 'Explore graphs level-by-level using a queue-based breadth-first search.',
    difficulty: 'Intermediate',
    category: 'Graphs',
  },
  {
    slug: 'dfs',
    title: 'DFS Traversal',
    description: 'Explore graphs depth-first using a stack-based depth-first search.',
    difficulty: 'Intermediate',
    category: 'Graphs',
  },
];

export const VISUALIZER_SLUGS = visualizerCatalog.map((entry) => entry.slug);

export const VISUALIZER_COUNT = visualizerCatalog.length;

export function isVisualizerSlug(slug: string): slug is (typeof VISUALIZER_SLUGS)[number] {
  return (VISUALIZER_SLUGS as string[]).includes(slug);
}
