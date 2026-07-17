import { Category, Topic, LessonSection, CodeSnippet, QuizQuestion, Quiz, Problem } from '@/types';
import expandedTopics from './curriculum_expanded.json';
import problemsArena from './problems_arena.json';
import { CATEGORY_IDS, arrayTopic, arraySections, arraySnippets, arrayQuestions,
         linkedListTopic, linkedListSections, linkedListSnippets, linkedListQuestions,
         stackTopic, stackSections, stackSnippets, stackQuestions,
         queueTopic, queueSections, queueSnippets, queueQuestions } from './curriculum/linear';
import { binarySearchTopic, binarySearchSections, binarySearchSnippets, binarySearchQuestions } from './curriculum/searching';
import { bubbleSortTopic, bubbleSortSections, bubbleSortSnippets, bubbleSortQuestions,
         mergeSortTopic, mergeSortSections, mergeSortSnippets, mergeSortQuestions,
         quickSortTopic, quickSortSections, quickSortSnippets, quickSortQuestions } from './curriculum/sorting';
import { binaryTreeTopic, binaryTreeSections, binaryTreeSnippets, binaryTreeQuestions,
         bstTopic, bstSections, bstSnippets, bstQuestions,
         avlTopic, avlSections, avlSnippets, avlQuestions } from './curriculum/trees';
import { bfsTopic, bfsSections, bfsSnippets, bfsQuestions,
         dfsTopic, dfsSections, dfsSnippets, dfsQuestions } from './curriculum/graphs';
import {
  hashTableTopic, hashTableSections, hashTableSnippets, hashTableQuestions,
  heapTopic, heapSections, heapSnippets, heapQuestions,
  trieTopic, trieSections, trieSnippets, trieQuestions,
  dpTopic, dpSections, dpSnippets, dpQuestions,
  greedyTopic, greedySections, greedySnippets, greedyQuestions,
  slidingWindowTopic, slidingWindowSections, slidingWindowSnippets, slidingWindowQuestions,
  twoPointersTopic, twoPointersSections, twoPointersSnippets, twoPointersQuestions,
  recursionTopic, recursionSections, recursionSnippets, recursionQuestions,
  advancedQuizzes,
} from './curriculum/advanced';
import { foundationsModules } from './curriculum/extended/foundations';
import { linearExtModules } from './curriculum/extended/linear';
import { linear2Modules } from './curriculum/extended/linear2';
import { treesAModules } from './curriculum/extended/treesA';
import { treesBModules } from './curriculum/extended/treesB';
import { graphsAModules } from './curriculum/extended/graphsA';
import { graphsBModules } from './curriculum/extended/graphsB';
import { sortSearchModules } from './curriculum/extended/sortsearch';
import { patternsModules } from './curriculum/extended/patterns';
import { stringsModules } from './curriculum/extended/strings';
import type { CurriculumModule } from '@/types';

// All bulk-authored extended curriculum modules, aggregated for registration.
const extendedModules: CurriculumModule[] = [
  ...foundationsModules,
  ...linearExtModules,
  ...linear2Modules,
  ...treesAModules,
  ...treesBModules,
  ...graphsAModules,
  ...graphsBModules,
  ...sortSearchModules,
  ...patternsModules,
  ...stringsModules,
];

export const categories: Category[] = [
  {
    id: CATEGORY_IDS.linear,
    slug: 'linear',
    title: 'Linear Data Structures',
    description: 'Arrays, linked lists, stacks, and queues — the building blocks of memory-efficient sequential storage.',
    display_order: 1,
  },
  {
    id: CATEGORY_IDS.trees,
    slug: 'trees',
    title: 'Trees',
    description: 'Hierarchical structures: binary trees, BSTs, and heap-based priority systems.',
    display_order: 2,
  },
  {
    id: CATEGORY_IDS.graphs,
    slug: 'graphs',
    title: 'Graphs',
    description: 'Networks of nodes and edges with BFS, DFS, and real-world routing applications.',
    display_order: 3,
  },
  {
    id: CATEGORY_IDS.algorithms,
    slug: 'algorithms',
    title: 'Algorithms',
    description: 'Classic search and sort algorithms with rigorous complexity analysis.',
    display_order: 4,
  },
  {
    id: CATEGORY_IDS.patterns,
    slug: 'patterns',
    title: 'Advanced Patterns',
    description: 'Hash maps, heaps, tries, DP, greedy, sliding window, two pointers, and backtracking.',
    display_order: 5,
  },
];

export const topics: Topic[] = (expandedTopics as Topic[]).sort((a, b) => a.display_order - b.display_order);

export const problems: Problem[] = problemsArena as Problem[];


export const lessonSections: Record<string, LessonSection[]> = {
  [arrayTopic.id]: arraySections,
  [linkedListTopic.id]: linkedListSections,
  [stackTopic.id]: stackSections,
  [queueTopic.id]: queueSections,
  [recursionTopic.id]: recursionSections,
  [binaryTreeTopic.id]: binaryTreeSections,
  [bstTopic.id]: bstSections,
  [avlTopic.id]: avlSections,
  [bfsTopic.id]: bfsSections,
  [dfsTopic.id]: dfsSections,
  [binarySearchTopic.id]: binarySearchSections,
  [bubbleSortTopic.id]: bubbleSortSections,
  [mergeSortTopic.id]: mergeSortSections,
  [quickSortTopic.id]: quickSortSections,
  [hashTableTopic.id]: hashTableSections,
  [heapTopic.id]: heapSections,
  [trieTopic.id]: trieSections,
  [twoPointersTopic.id]: twoPointersSections,
  [slidingWindowTopic.id]: slidingWindowSections,
  [greedyTopic.id]: greedySections,
  [dpTopic.id]: dpSections,
};

export const codeSnippets: Record<string, CodeSnippet[]> = {
  [arrayTopic.id]: arraySnippets,
  [linkedListTopic.id]: linkedListSnippets,
  [stackTopic.id]: stackSnippets,
  [queueTopic.id]: queueSnippets,
  [recursionTopic.id]: recursionSnippets,
  [binaryTreeTopic.id]: binaryTreeSnippets,
  [bstTopic.id]: bstSnippets,
  [avlTopic.id]: avlSnippets,
  [bfsTopic.id]: bfsSnippets,
  [dfsTopic.id]: dfsSnippets,
  [binarySearchTopic.id]: binarySearchSnippets,
  [bubbleSortTopic.id]: bubbleSortSnippets,
  [mergeSortTopic.id]: mergeSortSnippets,
  [quickSortTopic.id]: quickSortSnippets,
  [hashTableTopic.id]: hashTableSnippets,
  [heapTopic.id]: heapSnippets,
  [trieTopic.id]: trieSnippets,
  [twoPointersTopic.id]: twoPointersSnippets,
  [slidingWindowTopic.id]: slidingWindowSnippets,
  [greedyTopic.id]: greedySnippets,
  [dpTopic.id]: dpSnippets,
};

export const quizzes: Record<string, Quiz> = {
  [arrayTopic.id]: { id: 'quiz-arr', topic_id: arrayTopic.id, title: 'Array Quiz', description: 'Test your understanding of array operations and complexities.' },
  [linkedListTopic.id]: { id: 'quiz-ll', topic_id: linkedListTopic.id, title: 'Linked List Quiz', description: 'Verify your knowledge of node pointers and listing operations.' },
  [stackTopic.id]: { id: 'quiz-st', topic_id: stackTopic.id, title: 'Stack Quiz', description: 'Test your comprehension of LIFO structures.' },
  [queueTopic.id]: { id: 'quiz-qu', topic_id: queueTopic.id, title: 'Queue Quiz', description: 'Test your comprehension of FIFO queues.' },
  [binaryTreeTopic.id]: { id: 'quiz-bt', topic_id: binaryTreeTopic.id, title: 'Binary Tree Quiz', description: 'Test traversals and tree properties.' },
  [bstTopic.id]: { id: 'quiz-bst', topic_id: bstTopic.id, title: 'BST Quiz', description: 'Test BST ordering and operations.' },
  [avlTopic.id]: { id: 'quiz-avl', topic_id: avlTopic.id, title: 'AVL Tree Quiz', description: 'Balance factors, rotations, and self-balancing guarantees.' },
  [bfsTopic.id]: { id: 'quiz-bfs', topic_id: bfsTopic.id, title: 'BFS Quiz', description: 'Breadth-first graph traversal.' },
  [dfsTopic.id]: { id: 'quiz-dfs', topic_id: dfsTopic.id, title: 'DFS Quiz', description: 'Depth-first graph traversal.' },
  [binarySearchTopic.id]: { id: 'quiz-bs', topic_id: binarySearchTopic.id, title: 'Binary Search Quiz', description: 'O(log N) search on sorted data.' },
  [bubbleSortTopic.id]: { id: 'quiz-bbs', topic_id: bubbleSortTopic.id, title: 'Bubble Sort Quiz', description: 'Adjacent swaps and early exit.' },
  [mergeSortTopic.id]: { id: 'quiz-mgs', topic_id: mergeSortTopic.id, title: 'Merge Sort Quiz', description: 'Divide-and-conquer merging.' },
  [quickSortTopic.id]: { id: 'quiz-qks', topic_id: quickSortTopic.id, title: 'Quick Sort Quiz', description: 'Pivot partitioning.' },
  ...advancedQuizzes,
};

export const quizQuestions: Record<string, QuizQuestion[]> = {
  'quiz-arr': arrayQuestions,
  'quiz-ll': linkedListQuestions,
  'quiz-st': stackQuestions,
  'quiz-qu': queueQuestions,
  'quiz-bt': binaryTreeQuestions,
  'quiz-bst': bstQuestions,
  'quiz-avl': avlQuestions,
  'quiz-bfs': bfsQuestions,
  'quiz-dfs': dfsQuestions,
  'quiz-bs': binarySearchQuestions,
  'quiz-bbs': bubbleSortQuestions,
  'quiz-mgs': mergeSortQuestions,
  'quiz-qks': quickSortQuestions,
  'quiz-ht': hashTableQuestions,
  'quiz-hp': heapQuestions,
  'quiz-tr': trieQuestions,
  'quiz-dp': dpQuestions,
  'quiz-gr': greedyQuestions,
  'quiz-sw': slidingWindowQuestions,
  'quiz-tp': twoPointersQuestions,
  'quiz-rc': recursionQuestions,
};

// Ensure every expanded topic has lesson sections, code snippets, and a quiz.
// For topics that match canonical curriculum slugs, copy their detailed data.
// For topics without canonical data, generate lightweight placeholders using
// the expanded topic's definition so pages are never empty.
const curriculumTopics = [
  arrayTopic, linkedListTopic, stackTopic, queueTopic, recursionTopic,
  binaryTreeTopic, bstTopic, avlTopic, bfsTopic, dfsTopic, binarySearchTopic,
  bubbleSortTopic, mergeSortTopic, quickSortTopic,
  hashTableTopic, heapTopic, trieTopic, twoPointersTopic, slidingWindowTopic,
  greedyTopic, dpTopic
];

const curriculumBySlug = new Map<string, {
  id: string;
  sections?: LessonSection[];
  snippets?: CodeSnippet[];
  quiz?: Quiz;
  questions?: QuizQuestion[];
}>();

for (const t of curriculumTopics) {
  if (!t || !t.slug) continue;
  curriculumBySlug.set(t.slug, {
    id: t.id,
    sections: lessonSections[t.id],
    snippets: codeSnippets[t.id],
    quiz: quizzes[t.id],
    questions: quizQuestions[quizzes[t.id]?.id ?? ''] || undefined,
  });
}

// Register bulk-authored extended modules. Each module is self-contained and
// keyed by its topic slug so the copy-loop below applies it to the matching
// expanded-JSON topic.
for (const m of extendedModules) {
  if (!m?.topic?.slug) continue;
  curriculumBySlug.set(m.topic.slug, {
    id: m.topic.id,
    sections: m.sections,
    snippets: m.snippets,
    quiz: { id: m.quizId, topic_id: m.topic.id, title: m.quizTitle, description: m.quizDescription },
    questions: m.questions,
  });
}

for (const extTopic of topics) {
  // If canonical curriculum has matching slug, copy authoritative content
  const match = curriculumBySlug.get(extTopic.slug);
  if (match) {
    if (match.sections && (!lessonSections[extTopic.id] || lessonSections[extTopic.id].length === 0)) {
      lessonSections[extTopic.id] = match.sections;
    }
    if (match.snippets && (!codeSnippets[extTopic.id] || codeSnippets[extTopic.id].length === 0)) {
      codeSnippets[extTopic.id] = match.snippets;
    }
    if (match.quiz && !quizzes[extTopic.id]) {
      quizzes[extTopic.id] = { ...match.quiz, topic_id: extTopic.id } as Quiz;
      const qid = quizzes[extTopic.id].id;
      if (match.questions && match.questions.length > 0) {
        quizQuestions[qid] = match.questions;
      }
    }
    continue;
  }

  // No canonical match: generate placeholders where data is missing
  if (!lessonSections[extTopic.id] || lessonSections[extTopic.id].length === 0) {
    // Create richer placeholder lesson sections
    const overview = extTopic.definition || `Overview of ${extTopic.title}`;
    const complexity = `Time: ${extTopic.time_complexity_average || 'Varies'}; Space: ${extTopic.space_complexity || 'Varies'}`;
    lessonSections[extTopic.id] = [
      {
        id: `sec-${extTopic.slug}-overview`,
        topic_id: extTopic.id,
        title: 'Overview',
        content: overview,
        display_order: 1,
      },
      {
        id: `sec-${extTopic.slug}-complexity`,
        topic_id: extTopic.id,
        title: 'Complexity & Trade-offs',
        content: complexity,
        display_order: 2,
      },
      {
        id: `sec-${extTopic.slug}-examples`,
        topic_id: extTopic.id,
        title: 'Examples & When to Use',
        content: `Practical uses and example scenarios for ${extTopic.title}. Replace with curated examples for accuracy.`,
        display_order: 3,
      },
      {
        id: `sec-${extTopic.slug}-pitfalls`,
        topic_id: extTopic.id,
        title: 'Common Pitfalls',
        content: `Common mistakes when working with ${extTopic.title} and how to avoid them.`,
        display_order: 4,
      },
    ];
  }

  if (!codeSnippets[extTopic.id] || codeSnippets[extTopic.id].length === 0) {
    // Provide a slightly more useful placeholder snippet depending on slug
    const sampleCode = `// Example placeholder for ${extTopic.title}\n// Replace with a real, idiomatic snippet.\nfunction example() {\n  console.log('Example for ${extTopic.slug}');\n}\n`;
    codeSnippets[extTopic.id] = [
      {
        id: `snip-${extTopic.slug}-js`,
        topic_id: extTopic.id,
        language: 'javascript',
        is_optimized: false,
        code: sampleCode,
        explanation: `Placeholder snippet for ${extTopic.title}. Please author a real example.`,
      },
    ];
  }

  if (!quizzes[extTopic.id]) {
    const qid = `quiz-${extTopic.slug}`;
    quizzes[extTopic.id] = { id: qid, topic_id: extTopic.id, title: `${extTopic.title} Quiz`, description: `Quick check for ${extTopic.title}` } as Quiz;

    // Auto-generate one simple MCQ about complexity if available
    const avgComplexity = extTopic.time_complexity_average || 'O(N)';
    quizQuestions[qid] = [
      {
        id: `q-${extTopic.slug}-1`,
        quiz_id: qid,
        question_text: `What is the typical time complexity for ${extTopic.title}?`,
        question_type: 'MCQ',
        options: [avgComplexity, 'O(1)', 'O(N^2)', 'Depends on implementation'],
        correct_option_index: 0,
        explanation: `Typical complexity: ${avgComplexity}. This may vary by algorithm and implementation.`,
      },
    ];
  }
}
// NOTE: previously we copied curriculum data into the expanded-topic ids to
// maintain compatibility when the JSON used different ids. The expanded JSON
// has been re-keyed to use canonical curriculum UUIDs; that compatibility
// mapping is removed to avoid duplicate sources of truth.
