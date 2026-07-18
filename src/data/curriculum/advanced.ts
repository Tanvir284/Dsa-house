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
  time_complexity_best: 'O(1)',
  time_complexity_average: 'O(1) amortized',
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
  {
    id: 'sec-ht-4',
    topic_id: hashTableTopic.id,
    title: 'Real-World Analogy',
    content: `Picture a giant labeled locker room at a train station. You never scan every locker — instead, a formula on your ticket (the **hash function**) tells you exactly which locker number to walk to. Drop your bag in, walk away, and next time you come back the same formula points you straight to it.

Sometimes two travelers get the same locker number — a **collision**. The station handles it by either hanging a small chain of bags on that locker's hook (**chaining**) or by having you check the next locker down the row until you find a free one (**open addressing**). Either way, most trips still take a single glance rather than a full search.

If the locker room fills up, staff open a bigger room and re-file every bag — that is **rehashing**. The one-time move keeps future trips fast on average.`,
    display_order: 4,
  },
  {
    id: 'sec-ht-5',
    topic_id: hashTableTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `Insert keys \`"apple"\`, \`"banana"\`, \`"cherry"\`, \`"grape"\` into a table of capacity 5 using a toy hash (sum of ASCII letters mod 5).

1. \`hash("apple") = 530 % 5 = 0\` → bucket 0 gets \`apple\`.
2. \`hash("banana") = 611 % 5 = 1\` → bucket 1 gets \`banana\`.
3. \`hash("cherry") = 655 % 5 = 0\` → **collision with apple**. Chain it.
4. \`hash("grape") = 522 % 5 = 2\` → bucket 2 gets \`grape\`.

Final layout (chaining):

\`\`\`
index 0 : [apple] -> [cherry]
index 1 : [banana]
index 2 : [grape]
index 3 : (empty)
index 4 : (empty)
\`\`\`

Lookup for \`"cherry"\`: hash to 0, walk the chain past \`apple\`, find \`cherry\`. Two comparisons instead of scanning all four keys.`,
    display_order: 5,
  },
  {
    id: 'sec-ht-6',
    topic_id: hashTableTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `- **Bad hash function** causing every key to land in one bucket → fix: use a well-mixed hash (Python's built-in, or FNV/xxHash for strings).
- **Using mutable objects (lists, dicts) as keys** → fix: only hash immutable types like tuples, strings, numbers.
- **Ignoring load factor** so the table never resizes → fix: rehash to a larger capacity when \`n / capacity > 0.7\`.
- **Relying on iteration order** in languages that don't guarantee it → fix: sort keys explicitly when order matters.
- **Comparing floats as hash keys** → fix: avoid floating-point keys; round or use fixed-precision decimals.
- **Forgetting equality contract**: two equal keys must produce the same hash → fix: override \`__hash__\` and \`__eq__\` together.`,
    display_order: 6,
  },
  {
    id: 'sec-ht-7',
    topic_id: hashTableTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `- **Dictionaries and sets**: language built-ins (\`dict\`, \`HashMap\`, \`unordered_map\`) for arbitrary key-value storage.
- **Deduplication**: throw items into a set; membership check is O(1) average.
- **Frequency counting**: word counts, character histograms, anagram grouping.
- **LRU cache**: hash map for O(1) lookup + doubly linked list for recency order.
- **Database indexing**: hash indexes on equality-lookup columns.
- **Symbol tables in compilers**: map identifiers to their declarations for fast resolution.`,
    display_order: 7,
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
  {
    id: 'sec-hp-4',
    topic_id: heapTopic.id,
    title: 'Real-World Analogy',
    content: `Think of an emergency room. Patients arrive with different severities, but the doctor always sees the most critical patient next — a heart attack jumps ahead of a sprained ankle even if the ankle came first. That "always serve the highest priority first" behavior is exactly a **priority queue**, and a heap is how we implement it fast.

New patients enter and get slotted into the right position (sift-up) so the ordering by urgency is preserved. When a doctor becomes free, the top-priority patient is removed and the queue reshuffles (sift-down). We never sort the whole waiting room — we only bubble the one patient that moved.

Unlike a normal queue (first-in-first-out), the heap doesn't care about arrival time; it cares about the ranking key.`,
    display_order: 4,
  },
  {
    id: 'sec-hp-5',
    topic_id: heapTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `Build a **min-heap** by inserting \`[7, 3, 9, 1, 6]\` one at a time and sifting up.

1. Insert 7 → heap \`[7]\`.
2. Insert 3 → \`[7,3]\`; 3 < parent 7 → swap → \`[3,7]\`.
3. Insert 9 → \`[3,7,9]\`; 9 > parent 3 → stays.
4. Insert 1 → \`[3,7,9,1]\`; 1 < parent 7 → swap → \`[3,1,9,7]\`; 1 < parent 3 → swap → \`[1,3,9,7]\`.
5. Insert 6 → \`[1,3,9,7,6]\`; 6 > parent 3 → stays.

Final tree view (index 0 is root):

\`\`\`
        1
       / \\
      3   9
     / \\
    7   6

array: [1, 3, 9, 7, 6]
\`\`\`

Extracting the min pops \`1\`, moves \`6\` to the root, then sift-down produces \`[3, 6, 9, 7]\`.`,
    display_order: 5,
  },
  {
    id: 'sec-hp-6',
    topic_id: heapTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `- **Forgetting to sift-up after insert** → fix: always bubble the new element toward the root until the heap property holds.
- **Confusing a heap with a sorted array** → fix: a heap only guarantees parent-child order, not global order across siblings.
- **Using Python's \`heapq\` as a max-heap directly** → fix: push \`-value\` (negate) and negate again on pop.
- **Modifying a heap element in place** without re-heapifying → fix: remove then re-insert, or use a decrease-key operation.
- **Comparing tuples with equal priorities and non-comparable payloads** → fix: add a tiebreaker (insertion counter) so \`(priority, counter, item)\` never fails on \`item\` comparison.
- **Building the heap by N inserts** when you already have the array → fix: use bottom-up \`heapify\` for O(N) instead of O(N log N).`,
    display_order: 6,
  },
  {
    id: 'sec-hp-7',
    topic_id: heapTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `- **Priority queue** in task schedulers and OS process schedulers.
- **Top-K problems**: keep a size-K min-heap to track the K largest streaming values.
- **Dijkstra's shortest path** and **Prim's MST** — repeatedly extract the closest frontier node.
- **Huffman coding**: repeatedly merge the two lowest-frequency symbols.
- **Median of a data stream**: two heaps (max-heap of lower half, min-heap of upper half).
- **Event-driven simulation**: pop the next event by timestamp.`,
    display_order: 7,
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
  time_complexity_best: 'O(L) insert / search / delete',
  time_complexity_average: 'O(L) insert / search / delete',
  time_complexity_worst: 'O(L) insert / search / delete',
  space_complexity: 'O(ALPHABET * total characters stored)',
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
  {
    id: 'sec-tr-4',
    topic_id: trieTopic.id,
    title: 'Real-World Analogy',
    content: `A trie behaves like a library's old card catalog organized by letter, then by next letter, then by next. To find every book whose title starts with \`"algo"\` you walk down the "a" drawer, then the "l" divider, then the "g", then the "o" — and everything below that tab shares the prefix.

The magic is that shared prefixes are **stored once**. \`"cat"\`, \`"car"\`, and \`"card"\` all reuse the \`c → a\` path; only the tail differs. Adding a new word is cheap because you only add nodes for the letters that don't already exist.

That's why phone autocomplete and search suggestions feel instant: they don't scan the dictionary, they just descend a trie by the letters you've typed so far.`,
    display_order: 4,
  },
  {
    id: 'sec-tr-5',
    topic_id: trieTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `Insert \`["cat", "car", "dog"]\` into an empty trie. Each edge is a letter; \`*\` marks an \`isEnd\` node.

1. Insert \`cat\`: root → c → a → t*.
2. Insert \`car\`: reuse root → c → a, add branch r*.
3. Insert \`dog\`: fresh chain root → d → o → g*.

Final tree:

\`\`\`
        root
        /  \\
       c    d
       |    |
       a    o
      / \\   |
     t*  r* g*
\`\`\`

Query \`startsWith("ca")\` walks root → c → a and returns true without needing an \`isEnd\` flag. Query \`search("ca")\` walks the same path but returns false because node \`a\` isn't marked end.`,
    display_order: 5,
  },
  {
    id: 'sec-tr-6',
    topic_id: trieTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `- **Forgetting to mark word endings** (\`isEnd = true\`) → fix: without it, \`search("car")\` can't distinguish a stored word from a stored prefix.
- **Mixing up \`search\` and \`startsWith\`** → fix: search requires \`isEnd\`; startsWith only requires the path to exist.
- **Using a fixed 26-slot array** for Unicode text → fix: use a hash map for children when the alphabet is large or unknown.
- **Never deleting** and letting the trie grow forever → fix: implement a recursive delete that prunes empty subtrees.
- **Case sensitivity mistakes** — \`"Cat"\` and \`"cat"\` become different words → fix: normalize case at insert and query time.
- **Passing the whole word into recursion instead of an index** → fix: recurse on \`index\` to avoid O(L²) string slicing.`,
    display_order: 6,
  },
  {
    id: 'sec-tr-7',
    topic_id: trieTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `- **Autocomplete / typeahead** in search boxes and code editors.
- **Spell-check** and dictionary word validation.
- **IP routing tables**: longest-prefix match on binary tries (radix / Patricia tries).
- **Word-search grids** and Boggle-style puzzles — prune impossible branches quickly.
- **Prefix aggregation**: count how many stored strings start with a given prefix.
- **T9 / predictive text** on old phone keypads and modern soft keyboards.`,
    display_order: 7,
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
  {
    id: 'sec-dp-4',
    topic_id: dpTopic.id,
    title: 'Real-World Analogy',
    content: `Dynamic programming is like doing your homework once and writing the answer in a notebook so you never redo the same problem. If your history teacher assigns "list the causes of WWII" three times across the year, you don't research it from scratch — you flip to the page where you wrote it down last time.

Naive recursion is the opposite: it re-answers the same subquestion every time it appears. DP just adds the notebook — either **top-down** (jot answers as they come up during recursion, called **memoization**) or **bottom-up** (fill the notebook page by page, starting from the tiniest facts).

The trade-off is memory: the notebook takes space, but it turns a semester of repeated work into a single pass.`,
    display_order: 4,
  },
  {
    id: 'sec-dp-5',
    topic_id: dpTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `Compute \`fib(5)\` with **memoization**. Base cases: \`fib(0)=0\`, \`fib(1)=1\`.

1. Call \`fib(5)\`. Not in memo. Needs \`fib(4)\` and \`fib(3)\`.
2. \`fib(4)\` needs \`fib(3)\` and \`fib(2)\`.
3. \`fib(3)\` needs \`fib(2)\` and \`fib(1)=1\`.
4. \`fib(2)\` needs \`fib(1)=1\` and \`fib(0)=0\`. Store \`fib(2)=1\`.
5. Back up: \`fib(3) = fib(2)+fib(1) = 1+1 = 2\`. Store.
6. Back up: \`fib(4) = fib(3)+fib(2) = 2+1 = 3\`. Store.
7. Back up: \`fib(5) = fib(4)+fib(3) = 3+2 = 5\`. Store.

Memo table after the run:

\`\`\`
n     : 0  1  2  3  4  5
fib(n): 0  1  1  2  3  5
\`\`\`

Without memoization \`fib(5)\` makes ~15 calls; with memoization each \`fib(n)\` is computed exactly once — O(N) work.`,
    display_order: 5,
  },
  {
    id: 'sec-dp-6',
    topic_id: dpTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `- **Wrong base case** returning 0 when the problem wants 1 (or vice versa) → fix: hand-check \`dp[0]\` and \`dp[1]\` before writing the loop.
- **Overwriting subproblems** in-place when the recurrence still needs the old value (e.g. 0/1 knapsack) → fix: iterate the capacity dimension in reverse.
- **Off-by-one on array size** → fix: allocate \`dp[n+1]\` when you index by "number of items" instead of "index".
- **Unclear state definition** → fix: write \`dp[i]\` in words ("min cost to reach step i") before coding.
- **Mixing top-down and bottom-up indices** → fix: pick one style and stick to it per problem.
- **Not memoizing tuple states** (only memoizing on \`i\`) when the state truly depends on \`(i, remaining)\` → fix: key the cache on the full state tuple.`,
    display_order: 6,
  },
  {
    id: 'sec-dp-7',
    topic_id: dpTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `- **Edit distance** (Levenshtein) — spell-check, DNA sequence alignment, diff tools.
- **Knapsack** and budget allocation — resource picking under a capacity constraint.
- **Sequence alignment** in bioinformatics (Needleman-Wunsch, Smith-Waterman).
- **Longest Common Subsequence / Longest Increasing Subsequence** — version-control diffs, plagiarism detection.
- **Matrix chain multiplication** — optimize compiler expression evaluation.
- **Text justification and word wrap** — minimize total badness across lines.`,
    display_order: 7,
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
  {
    id: 'sec-gr-4',
    topic_id: greedyTopic.id,
    title: 'Real-World Analogy',
    content: `Imagine paying at a market and always reaching for the **biggest coin that still fits** into what you owe. Owe 41¢? Grab a 25, then a 10, then a 5, then a 1 — done in four coins without any planning.

That "always grab the biggest useful thing right now" instinct is a greedy algorithm. It's fast because you never look ahead or backtrack; you just take the best local move and move on.

The catch: with unusual coin denominations (say only 1, 3, and 4), grabbing biggest first can leave you paying more coins than necessary. Greedy only works when the local best is provably also globally best — otherwise you need DP.`,
    display_order: 4,
  },
  {
    id: 'sec-gr-5',
    topic_id: greedyTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `Make 41¢ change using US coin denominations \`[1, 5, 10, 25]\` (greedy is optimal here).

1. Amount = 41. Largest coin ≤ 41 is 25. Take one → coins=\`[25]\`, remaining=16.
2. Amount = 16. Largest coin ≤ 16 is 10. Take one → coins=\`[25,10]\`, remaining=6.
3. Amount = 6. Largest coin ≤ 6 is 5. Take one → coins=\`[25,10,5]\`, remaining=1.
4. Amount = 1. Largest coin ≤ 1 is 1. Take one → coins=\`[25,10,5,1]\`, remaining=0.

Result: **4 coins** = 25 + 10 + 5 + 1.

Counter-example warning: with denominations \`[1, 3, 4]\` and target 6, greedy picks \`4 + 1 + 1\` (3 coins) but optimal is \`3 + 3\` (2 coins). Same algorithm, wrong answer — because the greedy-choice property doesn't hold there.`,
    display_order: 5,
  },
  {
    id: 'sec-gr-6',
    topic_id: greedyTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `- **Applying greedy without proof** on problems like 0/1 knapsack → fix: verify with a small counter-example or exchange argument before trusting it.
- **Sorting by the wrong key** (e.g. start time instead of end time for activity selection) → fix: pick the key that makes the greedy-choice property provable.
- **Missing tie-breakers** when two elements look equally good → fix: define a secondary rule (index, length, weight) so behavior is deterministic.
- **Assuming greedy = shortest code, so it must be right** → fix: always cross-check against brute force on small inputs.
- **Confusing fractional and 0/1 knapsack** → fix: greedy solves fractional; 0/1 needs DP.
- **Forgetting numeric edge cases** (empty input, single element, all-equal weights) → fix: unit-test them explicitly.`,
    display_order: 6,
  },
  {
    id: 'sec-gr-7',
    topic_id: greedyTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `- **Activity / interval scheduling**: maximize non-overlapping meetings by sorting on end time.
- **Huffman coding**: build optimal prefix codes for compression.
- **Prim's and Kruskal's MST**: repeatedly take the cheapest safe edge.
- **Dijkstra's shortest path** on non-negative weights.
- **Fractional knapsack**: pick items by value/weight ratio.
- **Job sequencing with deadlines** and **minimum number of platforms** at a train station.`,
    display_order: 7,
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
  {
    id: 'sec-sw-4',
    topic_id: slidingWindowTopic.id,
    title: 'Real-World Analogy',
    content: `Think of a spotlight sweeping across a stage. At any moment it lights up a contiguous stretch of performers — say three at a time — and you can only report on the group the light currently covers. As the spotlight slides one step to the right, the leftmost performer walks out of the beam and a new one on the right walks in.

You don't re-count the whole cast every time the light moves; you just subtract the person leaving and add the person entering. That constant-time update per slide is the whole point of the sliding-window pattern.

Variable-size windows are the same idea but the spotlight stretches or shrinks based on a rule (e.g. "shrink until every performer in view is unique"). It still slides only forward, so each performer enters and exits at most once.`,
    display_order: 4,
  },
  {
    id: 'sec-sw-5',
    topic_id: slidingWindowTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `Find the **max sum subarray of size 3** in \`[2, 1, 5, 1, 3, 2]\`.

1. Initial window covers indices 0..2 → \`[2,1,5]\`, sum = 8. best = 8.
2. Slide right: add nums[3]=1, drop nums[0]=2. Window \`[1,5,1]\`, sum = 8+1-2 = 7. best stays 8.
3. Slide right: add nums[4]=3, drop nums[1]=1. Window \`[5,1,3]\`, sum = 7+3-1 = 9. best = 9.
4. Slide right: add nums[5]=2, drop nums[2]=5. Window \`[1,3,2]\`, sum = 9+2-5 = 6. best stays 9.

Trace diagram (window brackets shown):

\`\`\`
index : 0  1  2  3  4  5
value : 2  1  5  1  3  2
step 1:[2  1  5]           sum=8
step 2:   [1  5  1]        sum=7
step 3:      [5  1  3]     sum=9  ← best
step 4:         [1  3  2]  sum=6
\`\`\`

Answer: **9**. Each slide is O(1) because we only update by the entering and leaving element.`,
    display_order: 5,
  },
  {
    id: 'sec-sw-6',
    topic_id: slidingWindowTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `- **Mixing up fixed-size and variable-size templates** → fix: decide first — is the window's size given, or does a constraint decide it?
- **Recomputing the window from scratch every step** → fix: incrementally add the entering element and subtract the leaving one.
- **Forgetting to shrink** in variable-size problems → fix: use a \`while\` (not \`if\`) to shrink until the window is valid again.
- **Updating the answer at the wrong moment** → fix: for "smallest valid" update inside the shrink loop; for "largest valid" update after shrinking.
- **Off-by-one on window boundaries** → fix: standardize on inclusive \`[left, right]\`.
- **Applying sliding window to non-contiguous problems** (subsequences) → fix: sliding window only works on contiguous subarrays/substrings.`,
    display_order: 6,
  },
  {
    id: 'sec-sw-7',
    topic_id: slidingWindowTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `- **Max/min/sum/average over a fixed window** in time-series or sensor data.
- **Longest substring without repeating characters** and other "longest valid substring" problems.
- **Minimum window substring**: smallest window containing all target characters.
- **Rate limiting**: count requests in the last N seconds.
- **Anomaly detection**: rolling averages and rolling standard deviations.
- **Fruit-into-baskets / longest subarray with at most K distinct** values.`,
    display_order: 7,
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
  {
    id: 'sec-tp-4',
    topic_id: twoPointersTopic.id,
    title: 'Real-World Analogy',
    content: `Picture a long hallway with a person at each end, walking toward each other. They shout their position: if their combined distance is too large, the person on the right takes a step left; if too small, the person on the left takes a step right. Eventually they meet somewhere useful — a target found, or a definitive "no such pair" once they cross.

That's the **opposite-ends** two-pointer flavor, and it needs the data to be sorted (or otherwise monotonic) so that stepping one pointer reliably raises or lowers the value.

The **same-direction** flavor is more like a slow reader with a highlighter: one pointer scouts ahead while the other only advances when the scout finds something worth keeping. That's how in-place duplicate removal and fast/slow cycle detection work.`,
    display_order: 4,
  },
  {
    id: 'sec-tp-5',
    topic_id: twoPointersTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `Find a pair that sums to **12** in the sorted array \`[1, 3, 5, 7, 9]\`.

1. \`left=0\` (value 1), \`right=4\` (value 9). Sum = 10 < 12 → move left right (need bigger).
2. \`left=1\` (value 3), \`right=4\` (value 9). Sum = 12 ✓ → return indices \`(1, 4)\`.

Trace diagram:

\`\`\`
step 1: [1  3  5  7  9]   L=0 R=4  sum=10  too small → L++
         L           R
step 2: [1  3  5  7  9]   L=1 R=4  sum=12  match!
             L        R
\`\`\`

Why it works: the array is sorted, so incrementing \`left\` can only increase the sum and decrementing \`right\` can only decrease it. Each step eliminates one candidate pair, giving O(N) total.`,
    display_order: 5,
  },
  {
    id: 'sec-tp-6',
    topic_id: twoPointersTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `- **Applying opposite-ends on unsorted data** → fix: sort first, or switch to a hash-map approach if you must preserve original order.
- **Forgetting the loop condition \`while left < right\`** → fix: this guarantees pointers don't cross and prevents duplicate pairs.
- **Advancing the wrong pointer** when the sum matches but you want all pairs → fix: after recording, move BOTH pointers and skip duplicates.
- **Fast/slow pointer moving both at the same speed** for cycle detection → fix: slow moves 1, fast moves 2 per step.
- **Off-by-one on \`right = n\` vs \`n-1\`** → fix: use \`n-1\` for opposite ends on arrays.
- **Assuming two pointers always beats brute force** → fix: it only helps when the problem has a monotonic / sorted structure to exploit.`,
    display_order: 6,
  },
  {
    id: 'sec-tp-7',
    topic_id: twoPointersTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `- **Pair sum / triplet sum** on sorted arrays (Two Sum II, 3Sum).
- **Remove duplicates in place** from a sorted array or linked list.
- **Container with most water** and **trapping rain water** (shrink from the smaller side).
- **Palindrome check** on strings.
- **Merge step** of merge sort and merging two sorted linked lists.
- **Floyd's cycle detection** ("tortoise and hare") in linked lists and functional iteration.`,
    display_order: 7,
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
  time_complexity_best: 'Problem-specific (often polynomial with pruning)',
  time_complexity_average: 'Exponential for full search',
  time_complexity_worst: 'Exponential (e.g. O(2^N), O(N!))',
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
  {
    id: 'sec-rc-4',
    topic_id: recursionTopic.id,
    title: 'Real-World Analogy',
    content: `Stand between two mirrors and you'll see yourself reflected inside yourself, again and again — an image within an image within an image. Artists call this **mise-en-abyme**. Each reflection is the same scene at a smaller scale, and eventually the mirrors are too far apart to reflect anything new — that's the base case.

Recursion is the code version of that idea: a function calls a smaller instance of itself, trusts it to solve the smaller problem, and combines the answer. Backtracking adds one twist: after "trying" a mirror position, you undo the setup and try another one, exploring every possible configuration.

If you forget the base case, the mirrors face each other forever — infinite reflections, and in code, a stack overflow.`,
    display_order: 4,
  },
  {
    id: 'sec-rc-5',
    topic_id: recursionTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `Generate all subsets of \`[1, 2, 3]\` using **choose / explore / unchoose**. At each index \`i\` you decide: include \`nums[i]\` or skip it.

Recursion tree (\`[]\` = current path, \`i\` = next index to consider):

\`\`\`
                      [], i=0
                    /         \\
             skip 1/           \\include 1
                 [], i=1        [1], i=1
                /    \\          /       \\
          [], i=2  [2], i=2  [1], i=2  [1,2], i=2
           / \\      / \\       / \\        / \\
         []  [3] [2] [2,3] [1] [1,3] [1,2] [1,2,3]
\`\`\`

Each leaf (i=3) records one subset. Reading leaves left-to-right yields:
\`[], [3], [2], [2,3], [1], [1,3], [1,2], [1,2,3]\` — all **2³ = 8** subsets.

Base case: \`i == len(nums)\` → append a copy of the current path. Recursive step: try both "skip" and "include", undoing the include with a \`pop()\` before returning.`,
    display_order: 5,
  },
  {
    id: 'sec-rc-6',
    topic_id: recursionTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `- **Missing base case** → infinite recursion and stack overflow → fix: write the base case first, before the recursive call.
- **Base case never reached** because progress isn't made → fix: ensure each call moves toward the base case (smaller \`n\`, higher index, shorter remaining string).
- **Forgetting to undo state** in backtracking → fix: whatever you \`append\` before the call, \`pop\` after.
- **Appending the mutable path directly** instead of a copy → fix: use \`path[:]\` or \`list(path)\` when recording an answer.
- **Deep recursion in languages without tail-call optimization** (e.g. Python) → fix: convert to iteration or raise \`sys.setrecursionlimit\` cautiously.
- **Redundant work across branches** → fix: add memoization when subproblems overlap (that's the bridge to DP).`,
    display_order: 6,
  },
  {
    id: 'sec-rc-7',
    topic_id: recursionTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `- **Tree and graph traversal** (DFS on file systems, DOM trees, syntax trees).
- **Combinatorial generation**: subsets, permutations, combinations, Gray codes.
- **Constraint puzzles**: N-Queens, Sudoku, crossword solvers.
- **Divide and conquer**: merge sort, quicksort, closest pair of points, FFT.
- **Parsing and expression evaluation** in compilers and interpreters.
- **Path finding in grids** (maze solving, word search, Boggle).`,
    display_order: 7,
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
