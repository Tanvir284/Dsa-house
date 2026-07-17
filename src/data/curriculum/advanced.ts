import { Topic, LessonSection, CodeSnippet, QuizQuestion } from '@/types';
import { CATEGORY_IDS } from './linear';

const mkQuiz = (id: string, topicId: string, title: string, desc: string) => ({
  id,
  topic_id: topicId,
  title,
  description: desc,
});

// ─── HASH TABLE ───
export const hashTableTopic: Topic = {
  id: 'b1hash01-0000-4000-8000-000000000001',
  slug: 'hash-table',
  category_id: CATEGORY_IDS.patterns,
  title: 'Hash Table',
  definition: 'A key-value structure that maps keys to buckets using a hash function, enabling average O(1) lookup, insert, and delete.',
  importance: 'Hash tables power dictionaries, caches, frequency counting, and two-sum style interview problems.',
  prerequisites: ['array'],
  difficulty: 'Intermediate',
  time_complexity_best: 'O(1) average',
  time_complexity_average: 'O(1) average',
  time_complexity_worst: 'O(N) with collisions',
  space_complexity: 'O(N)',
  display_order: 13,
};

export const hashTableSections: LessonSection[] = [
  {
    id: 'sec-ht-1',
    topic_id: hashTableTopic.id,
    title: 'Hash Functions & Buckets',
    content: `A hash function converts a key into an array index: \`index = hash(key) % capacity\`. Good hashes spread keys uniformly. Collisions occur when two keys map to the same bucket — resolve with **chaining** (linked lists per bucket) or **open addressing** (probe for next empty slot).`,
    display_order: 1,
  },
  {
    id: 'sec-ht-2',
    topic_id: hashTableTopic.id,
    title: 'Load Factor & Resizing',
    content: `Load factor = \`n / capacity\`. When it exceeds ~0.7, resize to a larger array and **rehash** all keys — amortized O(1) insert. Without resizing, chains grow and performance degrades toward O(N).`,
    display_order: 2,
  },
  {
    id: 'sec-ht-3',
    topic_id: hashTableTopic.id,
    title: 'Interview Patterns',
    content: `Use hash maps for: frequency counts, complement lookup (Two Sum), grouping anagrams, detecting duplicates in O(N), and caching subproblem results (memoization bridge to DP).`,
    display_order: 3,
  },
];

export const hashTableSnippets: CodeSnippet[] = [
  {
    id: 'snip-ht-py',
    topic_id: hashTableTopic.id,
    language: 'python',
    is_optimized: false,
    code: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        need = target - n
        if need in seen:
            return [seen[need], i]
        seen[n] = i
    return []`,
    explanation: 'Classic O(N) Two Sum using a hash map.',
  },
];

export const hashTableQuestions: QuizQuestion[] = [
  {
    id: 'q-ht-1',
    quiz_id: 'quiz-ht',
    question_text: 'Average-case time complexity for hash table lookup (well-sized)?',
    question_type: 'MCQ',
    options: ['O(log N)', 'O(1)', 'O(N)', 'O(N log N)'],
    correct_option_index: 1,
    explanation: 'With a good hash and low load factor, lookups are constant on average.',
  },
  {
    id: 'q-ht-2',
    quiz_id: 'quiz-ht',
    question_text: 'What happens when many keys collide into the same bucket?',
    question_type: 'MCQ',
    options: ['Lookup becomes O(1)', 'Performance degrades toward O(N)', 'The table auto-sorts', 'Keys are discarded'],
    correct_option_index: 1,
    explanation: 'Long chains or many probes make operations linear in the worst case.',
  },
];

// ─── HEAP / PRIORITY QUEUE ───
export const heapTopic: Topic = {
  id: 'b1heap01-0000-4000-8000-000000000002',
  slug: 'heap',
  category_id: CATEGORY_IDS.patterns,
  title: 'Heap (Priority Queue)',
  definition: 'A complete binary tree stored in an array where each parent is ≤ (min-heap) or ≥ (max-heap) its children, supporting O(log N) insert/extract.',
  importance: 'Heaps enable efficient top-K problems, Dijkstra’s algorithm, Huffman coding, and scheduling.',
  prerequisites: ['array', 'queue'],
  difficulty: 'Intermediate',
  time_complexity_best: 'O(1) peek',
  time_complexity_average: 'O(log N) push/pop',
  time_complexity_worst: 'O(log N) push/pop',
  space_complexity: 'O(N)',
  display_order: 14,
};

export const heapSections: LessonSection[] = [
  {
    id: 'sec-hp-1',
    topic_id: heapTopic.id,
    title: 'Array Representation',
    content: `For index \`i\`: parent = \`(i-1)//2\`, left = \`2i+1\`, right = \`2i+2\`. No pointers needed — the tree is implicit in the array.`,
    display_order: 1,
  },
  {
    id: 'sec-hp-2',
    topic_id: heapTopic.id,
    title: 'Heapify Operations',
    content: `**Sift-up** after insert: swap with parent while heap property violated. **Sift-down** after extract-min: move last element to root, sift down. Build-heap from array is O(N) using bottom-up heapify.`,
    display_order: 2,
  },
  {
    id: 'sec-hp-3',
    topic_id: heapTopic.id,
    title: 'When to Use a Heap',
    content: `K largest/smallest elements, merge K sorted lists, running median (two heaps), and priority-driven graph algorithms.`,
    display_order: 3,
  },
];

export const heapSnippets: CodeSnippet[] = [
  {
    id: 'snip-hp-py',
    topic_id: heapTopic.id,
    language: 'python',
    is_optimized: false,
    code: `import heapq

# Min-heap in Python (negate keys for max-heap)
nums = [3, 1, 4, 1, 5]
heapq.heapify(nums)
print(heapq.heappop(nums))  # 1`,
    explanation: 'Python heapq module implements a binary min-heap.',
  },
];

export const heapQuestions: QuizQuestion[] = [
  {
    id: 'q-hp-1',
    quiz_id: 'quiz-hp',
    question_text: 'Time to extract the minimum from a min-heap of size N?',
    question_type: 'MCQ',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correct_option_index: 1,
    explanation: 'Extract removes root and sift-down along tree height log N.',
  },
];

// ─── TRIE ───
export const trieTopic: Topic = {
  id: 'b1trie01-0000-4000-8000-000000000003',
  slug: 'trie',
  category_id: CATEGORY_IDS.patterns,
  title: 'Trie (Prefix Tree)',
  definition: 'A tree where each edge represents a character; paths from root spell stored strings, enabling efficient prefix search and autocomplete.',
  importance: 'Tries power autocomplete, spell checkers, IP routing tables, and word-search grids.',
  prerequisites: ['binary-tree'],
  difficulty: 'Advanced',
  time_complexity_best: 'O(L) search',
  time_complexity_average: 'O(L) search',
  time_complexity_worst: 'O(L) search',
  space_complexity: 'O(ALPHABET * N * L)',
  display_order: 15,
};

export const trieSections: LessonSection[] = [
  {
    id: 'sec-tr-1',
    topic_id: trieTopic.id,
    title: 'Node Structure',
    content: `Each node holds children map/array (26 letters or full Unicode map) and an \`isEnd\` flag marking a complete word. Insert "cat": c→a→t, mark end at t.`,
    display_order: 1,
  },
  {
    id: 'sec-tr-2',
    topic_id: trieTopic.id,
    title: 'Prefix Queries',
    content: `Search walks characters; if any step missing, word absent. **startsWith(prefix)** stops at prefix end without requiring \`isEnd\`.`,
    display_order: 2,
  },
  {
    id: 'sec-tr-3',
    topic_id: trieTopic.id,
    title: 'Trade-offs',
    content: `Fast prefix lookup but high memory for sparse alphabets. Compressed tries (radix trees) merge single-child chains.`,
    display_order: 3,
  },
];

export const trieSnippets: CodeSnippet[] = [
  {
    id: 'snip-tr-py',
    topic_id: trieTopic.id,
    language: 'python',
    is_optimized: false,
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:
    def insert(self, word):
        node = self.root = getattr(self, 'root', TrieNode())
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.end = True`,
    explanation: 'Minimal trie insert using a children dictionary.',
  },
];

export const trieQuestions: QuizQuestion[] = [
  {
    id: 'q-tr-1',
    quiz_id: 'quiz-tr',
    question_text: 'What does a trie optimize compared to a balanced BST of words?',
    question_type: 'MCQ',
    options: ['Sorted order traversal', 'Prefix / autocomplete queries', 'Integer range queries', 'O(1) random access by index'],
    correct_option_index: 1,
    explanation: 'Tries excel when queries share prefixes.',
  },
];

// ─── DYNAMIC PROGRAMMING ───
export const dpTopic: Topic = {
  id: 'b1dp001-0000-4000-8000-000000000004',
  slug: 'dynamic-programming',
  category_id: CATEGORY_IDS.patterns,
  title: 'Dynamic Programming',
  definition: 'A technique that solves problems by breaking them into overlapping subproblems, storing results to avoid recomputation.',
  importance: 'DP is essential for optimization, sequences, grids, and many hard interview questions.',
  prerequisites: ['array', 'recursion-backtracking'],
  difficulty: 'Advanced',
  time_complexity_best: 'Problem-specific',
  time_complexity_average: 'Often O(N) or O(N²)',
  time_complexity_worst: 'Often O(N²) or O(N³)',
  space_complexity: 'O(N) to O(N²) typical',
  display_order: 16,
};

export const dpSections: LessonSection[] = [
  {
    id: 'sec-dp-1',
    topic_id: dpTopic.id,
    title: 'Overlapping Subproblems',
    content: `If the same subproblem is solved repeatedly (e.g. Fibonacci), memoize or tabulate. **Top-down** = recursion + cache; **bottom-up** = iterative table filling.`,
    display_order: 1,
  },
  {
    id: 'sec-dp-2',
    topic_id: dpTopic.id,
    title: 'State Transition',
    content: `Define \`dp[i]\` meaning clearly. Example: \`dp[i] = max(dp[i-1], nums[i] + dp[i-2])\` for house robber. Write recurrence before coding.`,
    display_order: 2,
  },
  {
    id: 'sec-dp-3',
    topic_id: dpTopic.id,
    title: 'Classic Families',
    content: `1D: climbing stairs, robber. 2D grid: unique paths, min path sum. Subsequence: LCS, LIS. Knapsack: 0/1 and unbounded variants.`,
    display_order: 3,
  },
];

export const dpSnippets: CodeSnippet[] = [
  {
    id: 'snip-dp-py',
    topic_id: dpTopic.id,
    language: 'python',
    is_optimized: false,
    code: `def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
    explanation: 'Bottom-up DP for climbing stairs — O(n) time, O(1) space.',
  },
];

export const dpQuestions: QuizQuestion[] = [
  {
    id: 'q-dp-1',
    quiz_id: 'quiz-dp',
    question_text: 'What defines a problem suitable for DP?',
    question_type: 'MCQ',
    options: ['No recursion allowed', 'Optimal substructure + overlapping subproblems', 'Must use a graph', 'Only works on sorted data'],
    correct_option_index: 1,
    explanation: 'DP needs optimal substructure and repeated subproblems to cache.',
  },
];

// ─── GREEDY ───
export const greedyTopic: Topic = {
  id: 'b1grd01-0000-4000-8000-000000000005',
  slug: 'greedy-algorithms',
  category_id: CATEGORY_IDS.patterns,
  title: 'Greedy Algorithms',
  definition: 'Build a solution by making the locally optimal choice at each step, hoping it leads to a global optimum.',
  importance: 'Greedy solves interval scheduling, Huffman coding, minimum coins (with caveats), and activity selection fast.',
  prerequisites: ['array', 'heap'],
  difficulty: 'Intermediate',
  time_complexity_best: 'Often O(N log N)',
  time_complexity_average: 'Often O(N log N)',
  time_complexity_worst: 'Often O(N log N)',
  space_complexity: 'O(1) to O(N)',
  display_order: 17,
};

export const greedySections: LessonSection[] = [
  {
    id: 'sec-gr-1',
    topic_id: greedyTopic.id,
    title: 'Greedy Choice Property',
    content: `Prove (or argue) that picking the best local option never blocks a better global solution. Exchange argument: swap greedy pick into any optimal solution.`,
    display_order: 1,
  },
  {
    id: 'sec-gr-2',
    topic_id: greedyTopic.id,
    title: 'Classic Examples',
    content: `Activity selection (sort by end time), fractional knapsack (sort by value/weight), interval covering, and minimum platforms at a railway.`,
    display_order: 2,
  },
  {
    id: 'sec-gr-3',
    topic_id: greedyTopic.id,
    title: 'When Greedy Fails',
    content: `0/1 knapsack and coin change with arbitrary denominations need DP — greedy can be suboptimal.`,
    display_order: 3,
  },
];

export const greedySnippets: CodeSnippet[] = [
  {
    id: 'snip-gr-py',
    topic_id: greedyTopic.id,
    language: 'python',
    is_optimized: false,
    code: `def max_non_overlapping(intervals):
    intervals.sort(key=lambda x: x[1])
    count, end = 0, float('-inf')
    for s, e in intervals:
        if s >= end:
            count += 1
            end = e
    return count`,
    explanation: 'Activity selection — sort by finish time, greedily pick compatible intervals.',
  },
];

export const greedyQuestions: QuizQuestion[] = [
  {
    id: 'q-gr-1',
    quiz_id: 'quiz-gr',
    question_text: 'Why does greedy fail for the 0/1 knapsack problem?',
    question_type: 'MCQ',
    options: ['Items are too large', 'Taking highest value/weight ratio may block better combinations', 'Knapsack must be sorted', 'Greedy only works on trees'],
    correct_option_index: 1,
    explanation: 'You cannot take fractions of items — local ratio choice is not always globally optimal.',
  },
];

// ─── SLIDING WINDOW ───
export const slidingWindowTopic: Topic = {
  id: 'b1sw001-0000-4000-8000-000000000006',
  slug: 'sliding-window',
  category_id: CATEGORY_IDS.patterns,
  title: 'Sliding Window',
  definition: 'Maintain a window [left, right] over an array or string, expanding and shrinking to satisfy constraints in O(N).',
  importance: 'One of the most common interview patterns for subarrays and substrings.',
  prerequisites: ['array', 'queue'],
  difficulty: 'Intermediate',
  time_complexity_best: 'O(N)',
  time_complexity_average: 'O(N)',
  time_complexity_worst: 'O(N)',
  space_complexity: 'O(1) to O(k)',
  display_order: 18,
};

export const slidingWindowSections: LessonSection[] = [
  {
    id: 'sec-sw-1',
    topic_id: slidingWindowTopic.id,
    title: 'Fixed vs Variable Window',
    content: `**Fixed size k**: slide right, add new element, remove left. **Variable**: expand right until invalid, then shrink left until valid again.`,
    display_order: 1,
  },
  {
    id: 'sec-sw-2',
    topic_id: slidingWindowTopic.id,
    title: 'Template',
    content: `\`\`\`
left = 0
for right in range(n):
    add nums[right] to window state
    while window invalid:
        remove nums[left], left++
    update answer with window
\`\`\``,
    display_order: 2,
  },
  {
    id: 'sec-sw-3',
    topic_id: slidingWindowTopic.id,
    title: 'Famous Problems',
    content: `Longest substring without repeating chars, minimum window substring, max sum subarray of size k, and fruit into baskets.`,
    display_order: 3,
  },
];

export const slidingWindowSnippets: CodeSnippet[] = [
  {
    id: 'snip-sw-py',
    topic_id: slidingWindowTopic.id,
    language: 'python',
    is_optimized: false,
    code: `def max_sum_subarray_k(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best`,
    explanation: 'Fixed-size sliding window for maximum sum subarray of size k.',
  },
];

export const slidingWindowQuestions: QuizQuestion[] = [
  {
    id: 'q-sw-1',
    quiz_id: 'quiz-sw',
    question_text: 'Typical time complexity of a variable sliding window on an array of size N?',
    question_type: 'MCQ',
    options: ['O(N²)', 'O(N)', 'O(log N)', 'O(N log N)'],
    correct_option_index: 1,
    explanation: 'Each element enters and leaves the window at most once.',
  },
];

// ─── TWO POINTERS ───
export const twoPointersTopic: Topic = {
  id: 'b1tp001-0000-4000-8000-000000000007',
  slug: 'two-pointers',
  category_id: CATEGORY_IDS.patterns,
  title: 'Two Pointers',
  definition: 'Use two indices moving toward each other or in the same direction to scan sorted arrays or linked structures in O(N).',
  importance: 'Core pattern for palindromes, pair sums, removing duplicates, and merging sorted lists.',
  prerequisites: ['array', 'linked-list'],
  difficulty: 'Beginner',
  time_complexity_best: 'O(N)',
  time_complexity_average: 'O(N)',
  time_complexity_worst: 'O(N)',
  space_complexity: 'O(1)',
  display_order: 19,
};

export const twoPointersSections: LessonSection[] = [
  {
    id: 'sec-tp-1',
    topic_id: twoPointersTopic.id,
    title: 'Opposite Ends',
    content: `On sorted array: \`left=0\`, \`right=n-1\`. If sum too small, left++; too big, right--. Used in Two Sum II and container with most water.`,
    display_order: 1,
  },
  {
    id: 'sec-tp-2',
    topic_id: twoPointersTopic.id,
    title: 'Same Direction (Fast/Slow)',
    content: `Remove duplicates in-place, partition arrays (Dutch flag), or detect cycles (Floyd) on linked lists.`,
    display_order: 2,
  },
  {
    id: 'sec-tp-3',
    topic_id: twoPointersTopic.id,
    title: 'Merge Pattern',
    content: `Merge two sorted arrays/lists with one pointer per list — foundation for merge sort’s merge step.`,
    display_order: 3,
  },
];

export const twoPointersSnippets: CodeSnippet[] = [
  {
    id: 'snip-tp-py',
    topic_id: twoPointersTopic.id,
    language: 'python',
    is_optimized: false,
    code: `def is_palindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        if s[l] != s[r]: return False
        l += 1; r -= 1
    return True`,
    explanation: 'Opposite-end two pointers for palindrome check.',
  },
];

export const twoPointersQuestions: QuizQuestion[] = [
  {
    id: 'q-tp-1',
    quiz_id: 'quiz-tp',
    question_text: 'Two Sum II (sorted array) uses which technique?',
    question_type: 'MCQ',
    options: ['Binary search only', 'Two pointers from both ends', 'Hash table only', 'BFS'],
    correct_option_index: 1,
    explanation: 'Sorted order allows shrinking search space from both ends in O(N).',
  },
];

// ─── RECURSION & BACKTRACKING ───
export const recursionTopic: Topic = {
  id: 'b1rec01-0000-4000-8000-000000000008',
  slug: 'recursion-backtracking',
  category_id: CATEGORY_IDS.patterns,
  title: 'Recursion & Backtracking',
  definition: 'Solve problems by defining a base case and recursive calls; backtracking explores decision trees with undo steps.',
  importance: 'Foundation for DFS, permutations, subsets, N-Queens, and dynamic programming top-down.',
  prerequisites: ['array', 'stack'],
  difficulty: 'Intermediate',
  time_complexity_best: 'O(2^N) typical for subsets',
  time_complexity_average: 'Exponential for full search',
  time_complexity_worst: 'Exponential',
  space_complexity: 'O(N) call stack',
  display_order: 12,
};

export const recursionSections: LessonSection[] = [
  {
    id: 'sec-rc-1',
    topic_id: recursionTopic.id,
    title: 'Recursion Anatomy',
    content: `Every recursive function needs: **base case** (stop), **progress** toward base, and **trust** the recursive call. Stack depth = O(depth).`,
    display_order: 1,
  },
  {
    id: 'sec-rc-2',
    topic_id: recursionTopic.id,
    title: 'Backtracking Template',
    content: `Choose → explore → unchoose. Used for permutations, combinations, Sudoku, and path finding in grids.`,
    display_order: 2,
  },
  {
    id: 'sec-rc-3',
    topic_id: recursionTopic.id,
    title: 'Pruning',
    content: `Stop exploring branches early when constraints fail — critical to keep exponential problems tractable.`,
    display_order: 3,
  },
];

export const recursionSnippets: CodeSnippet[] = [
  {
    id: 'snip-rc-py',
    topic_id: recursionTopic.id,
    language: 'python',
    is_optimized: false,
    code: `def subsets(nums):
    res = []
    def dfs(i, path):
        res.append(path[:])
        for j in range(i, len(nums)):
            path.append(nums[j])
            dfs(j + 1, path)
            path.pop()
    dfs(0, [])
    return res`,
    explanation: 'Backtracking template generating all subsets.',
  },
];

export const recursionQuestions: QuizQuestion[] = [
  {
    id: 'q-rc-1',
    quiz_id: 'quiz-rc',
    question_text: 'What is the purpose of the "undo" step in backtracking?',
    question_type: 'MCQ',
    options: ['Improve cache locality', 'Restore state to explore other branches', 'Sort the input', 'Convert to iterative DP'],
    correct_option_index: 1,
    explanation: 'After exploring a choice, undo it so sibling branches start from a clean state.',
  },
];

export const advancedQuizzes = {
  [hashTableTopic.id]: mkQuiz('quiz-ht', hashTableTopic.id, 'Hash Table Quiz', 'Collisions, load factor, and map patterns.'),
  [heapTopic.id]: mkQuiz('quiz-hp', heapTopic.id, 'Heap Quiz', 'Priority queues and heap operations.'),
  [trieTopic.id]: mkQuiz('quiz-tr', trieTopic.id, 'Trie Quiz', 'Prefix trees and autocomplete.'),
  [dpTopic.id]: mkQuiz('quiz-dp', dpTopic.id, 'DP Quiz', 'Memoization and tabulation.'),
  [greedyTopic.id]: mkQuiz('quiz-gr', greedyTopic.id, 'Greedy Quiz', 'Local choices and proofs.'),
  [slidingWindowTopic.id]: mkQuiz('quiz-sw', slidingWindowTopic.id, 'Sliding Window Quiz', 'Subarray window techniques.'),
  [twoPointersTopic.id]: mkQuiz('quiz-tp', twoPointersTopic.id, 'Two Pointers Quiz', 'Pair scanning patterns.'),
  [recursionTopic.id]: mkQuiz('quiz-rc', recursionTopic.id, 'Recursion Quiz', 'Base cases and backtracking.'),
};
