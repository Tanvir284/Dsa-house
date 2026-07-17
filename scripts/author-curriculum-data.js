/* eslint-disable @typescript-eslint/no-require-imports */
/*
 * Authoring script for curriculum_expanded.json
 *
 * Replaces the previous machine-generated placeholder content (identical
 * definitions, identical fake complexities, and "previous-topic" prerequisites)
 * with hand-authored, accurate data:
 *   - a real one-sentence definition per topic
 *   - a real "importance" note per topic
 *   - correct best/average/worst time complexity and space complexity
 *   - meaningful prerequisite slugs (topics that should be learned first)
 *
 * The script preserves each topic's existing id, category_id and display_order
 * by reading the current JSON, then overwrites the authored fields. Topics not
 * present in the curated map fall back to a category-aware template (still far
 * more accurate than the old identical placeholder).
 *
 * Run:  node scripts/author-curriculum-data.js
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../src/data/curriculum_expanded.json');

// Fix the B-Tree / B+ Tree slug collision: both slugified to "b-tree".
const SLUG_OVERRIDES = {
  'B+ Tree': 'b-plus-tree',
};

// Curated content keyed by exact topic title.
// c = { def, imp, best, avg, worst, space, prereq: [slugs] }
const C = {
  // ─── FOUNDATIONS & MATH ─────────────────────────────────────────────
  'Big-O Notation': { def: 'Big-O notation describes the upper bound on how an algorithm\'s running time or space grows as the input size increases, ignoring constants and lower-order terms.', imp: 'It is the shared language for comparing algorithm efficiency and is asked in virtually every technical interview.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: [] },
  'Space Complexity': { def: 'Space complexity measures the total amount of memory an algorithm needs relative to its input size, including auxiliary space and recursion stack.', imp: 'Understanding space trade-offs lets you choose algorithms that fit memory-constrained environments.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['big-o-notation'] },
  'Time Complexity': { def: 'Time complexity expresses how the number of basic operations an algorithm performs scales with the size of its input.', imp: 'It is the primary tool for predicting whether an algorithm will run fast enough at scale.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['big-o-notation'] },
  'Recursion & Backtracking': { def: 'Recursion solves a problem by having a function call itself on smaller inputs; backtracking extends this by undoing choices that fail to reach a valid solution.', imp: 'They underpin tree/graph traversal, combinatorial search, and many divide-and-conquer algorithms.', best: 'O(1)', avg: 'O(2^N)', worst: 'O(N!)', space: 'O(N)', prereq: ['time-complexity'] },
  'Master Theorem': { def: 'The Master Theorem provides a formula to solve recurrence relations of the form T(n) = aT(n/b) + f(n) that arise from divide-and-conquer algorithms.', imp: 'It gives a quick, systematic way to derive the complexity of recursive algorithms like merge sort.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['recursion-backtracking', 'time-complexity'] },
  'Bit Manipulation Basics': { def: 'Bit manipulation uses bitwise operators to read, set, and toggle individual bits of integers for compact, fast computation.', imp: 'It enables constant-time set operations, flags, and many low-level optimizations.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: [] },
  'Bit Masking': { def: 'Bit masking represents a subset of items as the bits of an integer, allowing subsets to be enumerated and combined with bitwise operations.', imp: 'It is the backbone of subset-based dynamic programming and state compression.', best: 'O(1)', avg: 'O(2^N)', worst: 'O(2^N)', space: 'O(1)', prereq: ['bit-manipulation-basics'] },
  'Bitwise Operations (AND, OR, XOR)': { def: 'AND, OR, XOR, and NOT operate on the individual bits of integers, forming the primitive building blocks of bit manipulation.', imp: 'These operations power masks, parity checks, and fast arithmetic tricks.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['bit-manipulation-basics'] },
  'Euclidean Algorithm (GCD)': { def: 'The Euclidean algorithm computes the greatest common divisor of two integers by repeatedly replacing the larger number with its remainder modulo the smaller.', imp: 'GCD is fundamental to number theory, fractions, and modular arithmetic problems.', best: 'O(1)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(1)', prereq: [] },
  'Sieve of Eratosthenes': { def: 'The Sieve of Eratosthenes finds all prime numbers up to N by iteratively marking the multiples of each prime as composite.', imp: 'It precomputes primes efficiently for number-theory and competitive-programming problems.', best: 'O(N log log N)', avg: 'O(N log log N)', worst: 'O(N log log N)', space: 'O(N)', prereq: [] },
  'Fast Exponentiation': { def: 'Fast (binary) exponentiation computes a^b by squaring the base and halving the exponent, reducing the number of multiplications to logarithmic.', imp: 'It is essential for modular exponentiation in cryptography and combinatorics.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(1)', prereq: ['bit-manipulation-basics'] },
  'Extended Euclidean Algorithm': { def: 'The Extended Euclidean algorithm computes the GCD of two integers along with coefficients x, y satisfying ax + by = gcd(a, b).', imp: 'It is used to find modular multiplicative inverses and solve linear Diophantine equations.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(1)', prereq: ['euclidean-algorithm-gcd'] },
  'Matrix Exponentiation': { def: 'Matrix exponentiation raises a transition matrix to a power using fast exponentiation to compute linear recurrences in logarithmic time.', imp: 'It computes terms of sequences like Fibonacci for astronomically large indices quickly.', best: 'O(K^3 log N)', avg: 'O(K^3 log N)', worst: 'O(K^3 log N)', space: 'O(K^2)', prereq: ['fast-exponentiation'] },
  'Modular Arithmetic': { def: 'Modular arithmetic performs integer operations under a modulus, wrapping results into a fixed range to keep numbers bounded.', imp: 'It prevents overflow in large computations and underlies hashing and cryptography.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: [] },
  'Permutations & Combinations': { def: 'Permutations count ordered arrangements and combinations count unordered selections of items from a set.', imp: 'They are core to counting problems, probability, and combinatorial DP.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(1)', prereq: [] },
  "Pascal's Triangle": { def: "Pascal's Triangle is a triangular array where each entry is the sum of the two above it, giving the binomial coefficients.", imp: 'It provides an O(N^2) way to precompute combinations without division.', best: 'O(N^2)', avg: 'O(N^2)', worst: 'O(N^2)', space: 'O(N^2)', prereq: ['permutations-combinations'] },
  'Probability Basics': { def: 'Probability basics quantify the likelihood of events on a scale from 0 to 1 using counting and expected-value reasoning.', imp: 'Probability underlies randomized algorithms and expected-time analysis.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: [] },
  'Catalan Numbers': { def: 'Catalan numbers form a sequence counting many recursive structures such as balanced parentheses, binary trees, and triangulations.', imp: 'They appear frequently in combinatorial counting problems.', best: 'O(N)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['permutations-combinations'] },
  'Pigeonhole Principle': { def: 'The pigeonhole principle states that if more items than containers are distributed, at least one container holds more than one item.', imp: 'It gives simple existence proofs used in many algorithmic arguments.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: [] },
  'Floating Point Representation': { def: 'Floating-point representation encodes real numbers using a sign, mantissa, and exponent following the IEEE-754 standard.', imp: 'Knowing its limits helps avoid precision bugs in numeric code.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: [] },
  'Memory Contiguity': { def: 'Memory contiguity refers to storing data in adjacent memory locations, which enables O(1) indexing and cache-friendly access.', imp: 'It explains why arrays are fast and why cache locality matters for performance.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: [] },
  'Pointers & References': { def: 'Pointers and references store the memory address of a value, allowing indirect access and sharing of data between parts of a program.', imp: 'They are essential for building linked structures and understanding how data is passed.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['memory-contiguity'] },
  'Structs & Classes': { def: 'Structs and classes bundle related fields (and, for classes, behavior) into a single user-defined type.', imp: 'They are the foundation for modeling nodes, records, and objects in data structures.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['pointers-references'] },
  'Amortized Analysis': { def: 'Amortized analysis averages the cost of a sequence of operations to show that occasional expensive operations are cheap on average.', imp: 'It justifies the efficiency of dynamic arrays and other structures with rare costly steps.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['time-complexity'] },
  'Tail Recursion': { def: 'Tail recursion is a form of recursion where the recursive call is the last operation, allowing compilers to reuse the current stack frame.', imp: 'It lets some recursive algorithms run in constant stack space.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(1)', prereq: ['recursion-backtracking'] },
  'Bitwise Left & Right Shifts': { def: 'Left and right shift operators move the bits of an integer, effectively multiplying or dividing by powers of two.', imp: 'Shifts provide fast arithmetic and are building blocks of bit tricks.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['bitwise-operations-and-or-xor'] },
  "Two's Complement Representation": { def: "Two's complement is the standard way computers represent signed integers, where negatives are formed by inverting bits and adding one.", imp: 'It explains integer overflow behavior and how negative numbers work in hardware.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['bit-manipulation-basics'] },
  'Recursion Trees': { def: 'A recursion tree visualizes the recursive calls of an algorithm as nodes, summing work per level to estimate total complexity.', imp: 'It is an intuitive way to derive the running time of recursive algorithms.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['recursion-backtracking'] },
  'Logarithms in Computer Science': { def: 'Logarithms measure how many times a quantity can be divided by a base, and appear whenever a problem is repeatedly halved.', imp: 'They explain the efficiency of binary search, balanced trees, and divide-and-conquer.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(1)', prereq: ['big-o-notation'] },
  'Iterative vs Recursive Tradeoffs': { def: 'This topic compares iterative and recursive implementations in terms of readability, stack usage, and performance.', imp: 'Choosing the right style avoids stack overflows and clarifies code.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(1)', prereq: ['recursion-backtracking'] },
  'Fast Fourier Transform (FFT)': { def: 'The Fast Fourier Transform computes the discrete Fourier transform in O(N log N), enabling fast polynomial and big-integer multiplication.', imp: 'It is a cornerstone of signal processing and high-performance multiplication.', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', space: 'O(N)', prereq: ['modular-arithmetic'] },
  'Modular Multiplicative Inverse': { def: 'The modular multiplicative inverse of a number a modulo m is a value x such that a·x ≡ 1 (mod m).', imp: 'It allows division under a modulus, which is needed in modular combinatorics.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(1)', prereq: ['extended-euclidean-algorithm'] },
  'Gray Code Mechanics': { def: 'Gray code is an ordering of binary numbers in which two successive values differ in exactly one bit.', imp: 'It minimizes transition errors in hardware and appears in combinatorial enumeration.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(1)', prereq: ['bitwise-operations-and-or-xor'] },
  'Chinese Remainder Theorem': { def: 'The Chinese Remainder Theorem reconstructs a number from its remainders modulo several pairwise-coprime moduli.', imp: 'It solves systems of congruences common in number-theory problems.', best: 'O(K log M)', avg: 'O(K log M)', worst: 'O(K log M)', space: 'O(K)', prereq: ['modular-multiplicative-inverse'] },
  "Euler's Totient Function": { def: "Euler's totient function counts the integers up to N that are coprime with N.", imp: "It powers Euler's theorem and modular-inverse computations in cryptography.", best: 'O(sqrt N)', avg: 'O(sqrt N)', worst: 'O(sqrt N)', space: 'O(1)', prereq: ['sieve-of-eratosthenes', 'modular-arithmetic'] },

  // ─── LINEAR STRUCTURES ──────────────────────────────────────────────
  'Array': { def: 'An array is a contiguous block of memory that stores elements of the same type, giving constant-time access by index.', imp: 'Arrays are the most fundamental data structure and underpin almost every other one.', best: 'O(1)', avg: 'O(1)', worst: 'O(N)', space: 'O(N)', prereq: ['memory-contiguity'] },
  'Linked List': { def: 'A linked list stores elements in nodes where each node points to the next, allowing O(1) insertion and deletion at known positions.', imp: 'It teaches pointer manipulation and enables dynamic sequences without contiguous memory.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['pointers-references'] },
  'Doubly Linked List': { def: 'A doubly linked list is a linked list where each node has pointers to both its previous and next nodes, enabling bidirectional traversal.', imp: 'It allows O(1) deletion given a node and backs structures like LRU caches.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['linked-list'] },
  'Circular Linked List': { def: 'A circular linked list links its last node back to the first, forming a loop with no natural end.', imp: 'It models round-robin scheduling and cyclic buffers.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['linked-list'] },
  'Stack': { def: 'A stack is a last-in-first-out (LIFO) structure where elements are pushed and popped only from the top.', imp: 'Stacks power function calls, expression evaluation, and backtracking.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(N)', prereq: ['array'] },
  'Stack (List-based)': { def: 'A list-based stack implements LIFO behavior using a linked list so that pushes and pops happen at the head node.', imp: 'It shows how the same abstract stack can be built without a fixed-size array.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(N)', prereq: ['stack', 'linked-list'] },
  'Queue': { def: 'A queue is a first-in-first-out (FIFO) structure where elements are enqueued at the rear and dequeued from the front.', imp: 'Queues drive scheduling, buffering, and breadth-first search.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(N)', prereq: ['array'] },
  'Queue (List-based)': { def: 'A list-based queue implements FIFO behavior using a linked list with pointers to both head and tail.', imp: 'It provides O(1) enqueue/dequeue without resizing an array.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(N)', prereq: ['queue', 'linked-list'] },
  'Deque (Double Ended Queue)': { def: 'A deque is a double-ended queue that supports insertion and removal at both the front and the back in O(1).', imp: 'It underpins sliding-window algorithms and monotonic-queue techniques.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(N)', prereq: ['queue'] },
  'Circular Queue': { def: 'A circular queue is a fixed-size queue that reuses freed slots by wrapping the rear and front pointers around the array.', imp: 'It implements bounded buffers with no wasted space.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(N)', prereq: ['queue'] },
  'Monotonic Stack': { def: 'A monotonic stack keeps its elements in sorted (increasing or decreasing) order by popping violators as new elements arrive.', imp: 'It solves next-greater-element and histogram problems in linear time.', best: 'O(N)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['stack'] },
  'Monotonic Queue': { def: 'A monotonic queue maintains elements in sorted order within a deque to report the min or max of a sliding window in O(1).', imp: 'It is the key to O(N) sliding-window maximum problems.', best: 'O(N)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['deque-double-ended-queue'] },
  'Sparse Matrix': { def: 'A sparse matrix stores only its non-zero entries to save memory when most cells are zero.', imp: 'It makes large, mostly-empty grids and graphs practical to store.', best: 'O(1)', avg: 'O(K)', worst: 'O(K)', space: 'O(K)', prereq: ['array'] },
  'Priority Queue': { def: 'A priority queue serves elements by priority rather than insertion order, typically backed by a heap.', imp: 'It is central to Dijkstra, scheduling, and greedy algorithms.', best: 'O(1)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['queue'] },
  'Skip List': { def: 'A skip list is a layered linked list with express lanes that allow O(log N) search, insertion, and deletion on average.', imp: 'It offers a simpler, randomized alternative to balanced trees.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(N)', space: 'O(N)', prereq: ['linked-list', 'probability-basics'] },
  'Unrolled Linked List': { def: 'An unrolled linked list stores a small array of elements in each node, improving cache performance over a plain linked list.', imp: 'It blends array locality with linked-list flexibility.', best: 'O(1)', avg: 'O(sqrt N)', worst: 'O(N)', space: 'O(N)', prereq: ['linked-list', 'array'] },
  'Self-Organizing List': { def: 'A self-organizing list rearranges its elements based on access frequency so that frequently used items are found faster.', imp: 'It is a simple adaptive caching heuristic.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['linked-list'] },
  'XOR Linked List': { def: 'An XOR linked list saves memory by storing the XOR of the previous and next node addresses in a single pointer field.', imp: 'It demonstrates a clever bit trick for memory-efficient doubly linked lists.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['doubly-linked-list', 'bitwise-operations-and-or-xor'] },
  'Dynamic Array Allocation': { def: 'A dynamic array grows automatically by allocating a larger buffer and copying elements when it runs out of capacity.', imp: 'It gives amortized O(1) append and backs list types in most languages.', best: 'O(1)', avg: 'O(1)', worst: 'O(N)', space: 'O(N)', prereq: ['array', 'amortized-analysis'] },
  'Ring Buffer': { def: 'A ring buffer is a fixed-size circular array used as a FIFO buffer that overwrites or blocks when full.', imp: 'It is widely used for streaming data and producer-consumer pipelines.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(N)', prereq: ['circular-queue'] },

  // ─── TREES ──────────────────────────────────────────────────────────
  'Binary Tree': { def: 'A binary tree is a hierarchical structure where each node has at most two children, called left and right.', imp: 'It is the basis for search trees, heaps, and many recursive algorithms.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['recursion-backtracking'] },
  'Binary Search Tree': { def: 'A binary search tree keeps smaller keys in the left subtree and larger keys in the right, enabling ordered O(log N) operations when balanced.', imp: 'It provides sorted storage with efficient search, insert, and delete.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(N)', space: 'O(N)', prereq: ['binary-tree'] },
  'AVL Tree': { def: 'An AVL tree is a self-balancing binary search tree that keeps subtree heights within one via rotations after each update.', imp: 'It guarantees O(log N) operations even in the worst case.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['binary-search-tree'] },
  'Red-Black Tree': { def: 'A red-black tree is a self-balancing BST that uses node colors and rotation rules to keep the tree approximately balanced.', imp: 'It backs many standard-library ordered maps and sets.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['binary-search-tree'] },
  'B-Tree': { def: 'A B-tree is a balanced multi-way search tree where each node holds many keys, minimizing disk reads for large datasets.', imp: 'It is the core structure behind databases and file systems.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['binary-search-tree'] },
  'B+ Tree': { def: 'A B+ tree is a B-tree variant that stores all values in the leaves and links leaves together for fast range scans.', imp: 'It is the dominant index structure in relational databases.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['b-tree'] },
  'Trie (Prefix Tree)': { def: 'A trie stores strings by sharing common prefixes along tree edges, giving search time proportional to the key length.', imp: 'It powers autocomplete, spell-checking, and prefix queries.', best: 'O(L)', avg: 'O(L)', worst: 'O(L)', space: 'O(N·L)', prereq: ['binary-tree'] },
  'Segment Tree': { def: 'A segment tree stores aggregate information over array ranges in a binary tree, allowing range queries and updates in O(log N).', imp: 'It answers range-sum/min/max queries with fast updates.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['binary-tree'] },
  'Fenwick Tree (Binary Indexed Tree)': { def: 'A Fenwick tree uses the binary representation of indices to compute prefix sums and point updates in O(log N) with little memory.', imp: 'It is a compact alternative to segment trees for prefix aggregates.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['bit-manipulation-basics', 'array'] },
  'Heap (Priority Queue)': { def: 'A binary heap is a complete tree stored in an array where each parent dominates its children, giving O(log N) insert and extract.', imp: 'It is the standard implementation of a priority queue.', best: 'O(1)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['binary-tree', 'array'] },
  'Max Heap': { def: 'A max heap is a binary heap in which every parent is greater than or equal to its children, so the maximum sits at the root.', imp: 'It provides constant-time access to the largest element for scheduling and heap sort.', best: 'O(1)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['heap'] },
  'Treap': { def: 'A treap combines a BST on keys with a heap on random priorities to stay balanced with high probability.', imp: 'It offers simple randomized balancing and supports split/merge.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(N)', space: 'O(N)', prereq: ['binary-search-tree', 'heap', 'probability-basics'] },
  'Splay Tree': { def: 'A splay tree is a self-adjusting BST that moves each accessed node to the root, giving good amortized performance for skewed access.', imp: 'It provides cache-like behavior without extra bookkeeping.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(N)', space: 'O(N)', prereq: ['binary-search-tree', 'amortized-analysis'] },
  'K-D Tree': { def: 'A k-d tree partitions k-dimensional space by cycling through axes at each level to support nearest-neighbor and range queries.', imp: 'It accelerates spatial searches in graphics and machine learning.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(N)', space: 'O(N)', prereq: ['binary-search-tree'] },
  'Quad Tree': { def: 'A quad tree recursively subdivides a 2D region into four quadrants to index spatial data.', imp: 'It is used in image compression, collision detection, and maps.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(N)', space: 'O(N)', prereq: ['binary-tree'] },
  'Interval Tree': { def: 'An interval tree stores intervals so that all intervals overlapping a query point or range can be found efficiently.', imp: 'It answers overlap queries used in scheduling and computational geometry.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(N)', space: 'O(N)', prereq: ['binary-search-tree'] },
  'Ternary Search Tree': { def: 'A ternary search tree stores strings with three children per node (less, equal, greater), balancing trie speed with lower memory.', imp: 'It is a space-efficient structure for prefix and near-neighbor string search.', best: 'O(L)', avg: 'O(L log N)', worst: 'O(N)', space: 'O(N)', prereq: ['trie', 'binary-search-tree'] },
  'Binomial Heap': { def: 'A binomial heap is a collection of binomial trees that supports efficient merging of two heaps in O(log N).', imp: 'It is useful when frequent heap unions are required.', best: 'O(1)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['heap'] },
  'Fibonacci Heap': { def: 'A Fibonacci heap supports decrease-key and merge in O(1) amortized time, improving the asymptotics of some graph algorithms.', imp: 'It gives the best theoretical bounds for Dijkstra and Prim.', best: 'O(1)', avg: 'O(1)', worst: 'O(log N)', space: 'O(N)', prereq: ['binomial-heap', 'amortized-analysis'] },
  'Cartesian Tree': { def: 'A Cartesian tree is a binary tree derived from a sequence that is heap-ordered by value and in-order equal to the sequence.', imp: 'It links range-minimum queries with lowest-common-ancestor problems.', best: 'O(N)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['binary-tree', 'heap'] },
  'Expression Tree': { def: 'An expression tree represents an arithmetic expression with operators at internal nodes and operands at leaves.', imp: 'It is used by compilers and calculators to evaluate expressions.', best: 'O(N)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['binary-tree', 'stack'] },
  'Threaded Binary Tree': { def: 'A threaded binary tree stores otherwise-null child pointers as links to in-order predecessors and successors for pointer-free traversal.', imp: 'It enables O(1)-space in-order traversal.', best: 'O(N)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['binary-tree'] },
  'Radix Tree': { def: 'A radix tree (compressed trie) merges chains of single-child nodes to store strings compactly.', imp: 'It is used for IP routing tables and memory-efficient dictionaries.', best: 'O(L)', avg: 'O(L)', worst: 'O(L)', space: 'O(N)', prereq: ['trie'] },
  'Huffman Coding Tree': { def: 'A Huffman coding tree builds an optimal prefix code by repeatedly merging the two least frequent symbols.', imp: 'It is a classic greedy algorithm for lossless data compression.', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', space: 'O(N)', prereq: ['heap', 'greedy-algorithms'] },
  'AA Tree': { def: 'An AA tree is a simplified red-black tree variant that uses levels and only right-leaning links to ease implementation.', imp: 'It offers balanced-BST guarantees with simpler code.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['red-black-tree'] },

  // ─── GRAPHS ─────────────────────────────────────────────────────────
  'Adjacency Matrix': { def: 'An adjacency matrix represents a graph as a 2D grid where cell (i, j) marks whether an edge exists between vertices i and j.', imp: 'It gives O(1) edge lookups and suits dense graphs.', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(V^2)', prereq: ['array'] },
  'Adjacency List': { def: 'An adjacency list stores, for each vertex, a list of its neighboring vertices, using space proportional to the number of edges.', imp: 'It is the memory-efficient representation for sparse graphs.', best: 'O(1)', avg: 'O(degree)', worst: 'O(V)', space: 'O(V+E)', prereq: ['linked-list', 'array'] },
  'BFS': { def: 'Breadth-first search explores a graph level by level using a queue, visiting all neighbors before moving deeper.', imp: 'It finds shortest paths in unweighted graphs and explores connectivity.', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', prereq: ['queue', 'adjacency-list'] },
  'DFS': { def: 'Depth-first search explores a graph by going as deep as possible along each branch before backtracking, using recursion or a stack.', imp: 'It underlies cycle detection, topological sort, and connectivity checks.', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', prereq: ['stack', 'adjacency-list'] },
  "Dijkstra's Algorithm": { def: "Dijkstra's algorithm finds shortest paths from a source in a graph with non-negative weights using a priority queue.", imp: 'It is the standard single-source shortest-path algorithm for routing.', best: 'O(E log V)', avg: 'O(E log V)', worst: 'O(E log V)', space: 'O(V)', prereq: ['bfs', 'priority-queue'] },
  'Bellman-Ford Algorithm': { def: 'The Bellman-Ford algorithm computes shortest paths from a source and detects negative-weight cycles by relaxing all edges V-1 times.', imp: 'It handles negative edge weights that Dijkstra cannot.', best: 'O(E)', avg: 'O(V·E)', worst: 'O(V·E)', space: 'O(V)', prereq: ['dijkstras-algorithm'] },
  'Floyd-Warshall Algorithm': { def: 'The Floyd-Warshall algorithm computes shortest paths between all pairs of vertices via dynamic programming over intermediate nodes.', imp: 'It is a concise all-pairs shortest-path solution for small graphs.', best: 'O(V^3)', avg: 'O(V^3)', worst: 'O(V^3)', space: 'O(V^2)', prereq: ['dynamic-programming', 'adjacency-matrix'] },
  "Prim's MST": { def: "Prim's algorithm grows a minimum spanning tree from a start vertex by repeatedly adding the cheapest edge that expands the tree.", imp: 'It builds least-cost networks and is a classic greedy algorithm.', best: 'O(E log V)', avg: 'O(E log V)', worst: 'O(E log V)', space: 'O(V)', prereq: ['priority-queue', 'greedy-algorithms'] },
  "Kruskal's MST": { def: "Kruskal's algorithm builds a minimum spanning tree by adding edges in increasing weight order while avoiding cycles using a disjoint set.", imp: 'It efficiently constructs least-cost spanning trees on sparse graphs.', best: 'O(E log E)', avg: 'O(E log E)', worst: 'O(E log E)', space: 'O(V)', prereq: ['disjoint-set-union-dsu', 'greedy-algorithms'] },
  "Topological Sort (Kahn's)": { def: "Kahn's algorithm orders a directed acyclic graph by repeatedly removing vertices with no remaining incoming edges.", imp: 'It schedules tasks with dependencies and detects cycles.', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', prereq: ['bfs'] },
  'Topological Sort (DFS-based)': { def: 'DFS-based topological sort orders a DAG by finishing depth-first traversal and pushing vertices onto a stack in reverse finish order.', imp: 'It provides an alternate, recursion-driven ordering of dependencies.', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', prereq: ['dfs'] },
  'Disjoint Set Union (DSU)': { def: 'Disjoint Set Union tracks a partition of elements into groups, supporting near-constant-time union and find with path compression.', imp: 'It powers Kruskal, connectivity queries, and cycle detection.', best: 'O(1)', avg: 'O(α(N))', worst: 'O(log N)', space: 'O(N)', prereq: ['array'] },
  "Kosaraju's SCC": { def: "Kosaraju's algorithm finds strongly connected components using two depth-first passes over the graph and its transpose.", imp: 'It reveals cyclic clusters in directed graphs.', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', prereq: ['dfs'] },
  "Tarjan's SCC": { def: "Tarjan's algorithm finds strongly connected components in a single DFS pass using discovery times and a stack.", imp: 'It computes SCCs more efficiently than two-pass approaches.', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', prereq: ['dfs'] },
  'Eulerian Path/Circuit': { def: 'An Eulerian path visits every edge exactly once; an Eulerian circuit does so and returns to the start, existing under specific degree conditions.', imp: 'It solves route-planning problems like the Chinese postman.', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(E)', prereq: ['dfs'] },
  'Hamiltonian Path/Cycle': { def: 'A Hamiltonian path visits every vertex exactly once; finding one is an NP-complete problem usually solved by backtracking or bitmask DP.', imp: 'It models tour and sequencing problems with no known efficient solution.', best: 'O(2^N·N)', avg: 'O(2^N·N)', worst: 'O(N!)', space: 'O(2^N)', prereq: ['recursion-backtracking', 'bit-masking'] },
  'Ford-Fulkerson (Max Flow)': { def: 'The Ford-Fulkerson method computes maximum flow by repeatedly pushing flow along augmenting paths until none remain.', imp: 'It solves network-flow and bipartite-matching problems.', best: 'O(E·f)', avg: 'O(E·f)', worst: 'O(E·f)', space: 'O(V+E)', prereq: ['dfs'] },
  'Edmonds-Karp (Max Flow)': { def: 'Edmonds-Karp implements Ford-Fulkerson using BFS to find shortest augmenting paths, giving a polynomial time bound.', imp: 'It is a reliable, easy-to-implement max-flow algorithm.', best: 'O(V·E^2)', avg: 'O(V·E^2)', worst: 'O(V·E^2)', space: 'O(V+E)', prereq: ['ford-fulkerson-max-flow', 'bfs'] },
  "Dinic's Algorithm": { def: "Dinic's algorithm computes maximum flow faster by building level graphs with BFS and sending blocking flows with DFS.", imp: 'It handles large flow networks efficiently.', best: 'O(V^2·E)', avg: 'O(V^2·E)', worst: 'O(V^2·E)', space: 'O(V+E)', prereq: ['edmonds-karp-max-flow'] },
  'Hopcroft-Karp (Bipartite Matching)': { def: 'Hopcroft-Karp finds a maximum matching in a bipartite graph by augmenting along multiple shortest paths per phase.', imp: 'It is the fastest common algorithm for bipartite matching.', best: 'O(E·sqrt V)', avg: 'O(E·sqrt V)', worst: 'O(E·sqrt V)', space: 'O(V+E)', prereq: ['bfs', 'ford-fulkerson-max-flow'] },
  "Johnson's Algorithm": { def: "Johnson's algorithm finds all-pairs shortest paths on sparse graphs by reweighting edges with Bellman-Ford then running Dijkstra from each vertex.", imp: 'It beats Floyd-Warshall on sparse graphs with negative edges.', best: 'O(V·E log V)', avg: 'O(V·E log V)', worst: 'O(V·E log V)', space: 'O(V^2)', prereq: ['bellman-ford-algorithm', 'dijkstras-algorithm'] },
  'Bridges and Cut Vertices': { def: 'Bridges and cut vertices are edges and nodes whose removal disconnects a graph, found using DFS discovery and low-link values.', imp: 'They identify critical points in networks for reliability analysis.', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', prereq: ['dfs'] },
  '2-SAT Problem': { def: 'The 2-SAT problem decides satisfiability of boolean formulas with two literals per clause by finding SCCs of an implication graph.', imp: 'It solves constraint problems that reduce to boolean 2-clauses in linear time.', best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V+E)', prereq: ['tarjans-scc'] },
  'Heavy-Light Decomposition': { def: 'Heavy-light decomposition splits a tree into chains so that path queries can be answered with a segment tree in O(log^2 N).', imp: 'It enables efficient path updates and queries on trees.', best: 'O(log^2 N)', avg: 'O(log^2 N)', worst: 'O(log^2 N)', space: 'O(N)', prereq: ['segment-tree', 'dfs'] },
  'Centroid Decomposition': { def: 'Centroid decomposition recursively splits a tree at its centroid to answer path and distance queries efficiently.', imp: 'It solves many tree path-counting problems in O(N log N).', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', space: 'O(N log N)', prereq: ['dfs'] },

  // ─── ALGORITHMS / SORT & SEARCH ─────────────────────────────────────
  'Linear Search': { def: 'Linear search scans a collection element by element until it finds the target or exhausts the list.', imp: 'It is the simplest search and works on unsorted data.', best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(1)', prereq: ['array'] },
  'Binary Search': { def: 'Binary search repeatedly halves a sorted range, discarding the half that cannot contain the target.', imp: 'It is the canonical O(log N) search and a template for many divide-and-conquer problems.', best: 'O(1)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(1)', prereq: ['array', 'logarithms-in-computer-science'] },
  'Bubble Sort': { def: 'Bubble sort repeatedly steps through the list, swapping adjacent out-of-order elements until no swaps are needed.', imp: 'It is a teaching sort that illustrates comparisons, swaps, and early termination.', best: 'O(N)', avg: 'O(N^2)', worst: 'O(N^2)', space: 'O(1)', prereq: ['array'] },
  'Selection Sort': { def: 'Selection sort repeatedly selects the smallest remaining element and moves it to the sorted portion.', imp: 'It minimizes swaps and demonstrates in-place selection.', best: 'O(N^2)', avg: 'O(N^2)', worst: 'O(N^2)', space: 'O(1)', prereq: ['array'] },
  'Insertion Sort': { def: 'Insertion sort builds a sorted prefix by inserting each new element into its correct position among the already-sorted items.', imp: 'It is efficient for small or nearly-sorted arrays and is stable.', best: 'O(N)', avg: 'O(N^2)', worst: 'O(N^2)', space: 'O(1)', prereq: ['array'] },
  'Merge Sort': { def: 'Merge sort recursively divides the array in half, sorts each half, and merges the two sorted halves.', imp: 'It guarantees O(N log N) time and is a classic stable divide-and-conquer sort.', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', space: 'O(N)', prereq: ['recursion-backtracking', 'divide-and-conquer'] },
  'Quick Sort': { def: 'Quick sort partitions the array around a pivot so smaller elements precede it and larger follow, then recurses on each side.', imp: 'It is the fastest general-purpose in-place sort in practice.', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N^2)', space: 'O(log N)', prereq: ['recursion-backtracking', 'divide-and-conquer'] },
  'Quick Sort (Hoare)': { def: "Quick sort with Hoare's partition scheme uses two pointers moving inward from both ends, performing fewer swaps than Lomuto's scheme.", imp: 'It is a more efficient partition variant of quick sort.', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N^2)', space: 'O(log N)', prereq: ['quick-sort'] },
  'Heap Sort': { def: 'Heap sort builds a max heap from the array and repeatedly extracts the maximum to produce a sorted order in place.', imp: 'It offers guaranteed O(N log N) time without extra memory.', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', space: 'O(1)', prereq: ['heap'] },
  'Counting Sort': { def: 'Counting sort orders integers within a small range by counting occurrences and computing prefix positions, without comparisons.', imp: 'It sorts bounded-range integers in linear time.', best: 'O(N+K)', avg: 'O(N+K)', worst: 'O(N+K)', space: 'O(N+K)', prereq: ['array'] },
  'Radix Sort': { def: 'Radix sort sorts numbers digit by digit using a stable sort like counting sort for each digit position.', imp: 'It sorts fixed-width integers or strings in linear time.', best: 'O(N·K)', avg: 'O(N·K)', worst: 'O(N·K)', space: 'O(N+K)', prereq: ['counting-sort'] },
  'Bucket Sort': { def: 'Bucket sort distributes elements into buckets, sorts each bucket, then concatenates them.', imp: 'It is fast when input is uniformly distributed.', best: 'O(N+K)', avg: 'O(N+K)', worst: 'O(N^2)', space: 'O(N+K)', prereq: ['insertion-sort'] },
  'Shell Sort': { def: 'Shell sort generalizes insertion sort by comparing elements separated by a gap that shrinks each pass.', imp: 'It improves on insertion sort for medium-sized arrays.', best: 'O(N log N)', avg: 'O(N^1.25)', worst: 'O(N^2)', space: 'O(1)', prereq: ['insertion-sort'] },
  'Comb Sort': { def: 'Comb sort improves bubble sort by comparing elements a shrinking gap apart to eliminate small values near the end quickly.', imp: 'It removes "turtles" that slow bubble sort.', best: 'O(N log N)', avg: 'O(N^2/2^p)', worst: 'O(N^2)', space: 'O(1)', prereq: ['bubble-sort'] },
  'Pigeonhole Sort': { def: 'Pigeonhole sort places each element into a hole indexed by its key, then reads the holes in order.', imp: 'It sorts data whose key range is close to the element count.', best: 'O(N+K)', avg: 'O(N+K)', worst: 'O(N+K)', space: 'O(N+K)', prereq: ['counting-sort'] },
  'Cycle Sort': { def: 'Cycle sort minimizes the number of writes by rotating each element directly into its final position along a cycle.', imp: 'It is optimal when write operations are costly.', best: 'O(N^2)', avg: 'O(N^2)', worst: 'O(N^2)', space: 'O(1)', prereq: ['selection-sort'] },
  'Odd-Even Sort': { def: 'Odd-even (brick) sort repeatedly compares and swaps odd- and even-indexed adjacent pairs, suiting parallel hardware.', imp: 'It is a simple parallelizable variant of bubble sort.', best: 'O(N)', avg: 'O(N^2)', worst: 'O(N^2)', space: 'O(1)', prereq: ['bubble-sort'] },
  'Ternary Search': { def: 'Ternary search splits a range into three parts to locate the extremum of a unimodal function.', imp: 'It optimizes unimodal functions where binary search does not apply.', best: 'O(1)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(1)', prereq: ['binary-search'] },
  'Exponential Search': { def: 'Exponential search finds a range by doubling an index until it passes the target, then binary searches within that range.', imp: 'It is ideal for unbounded or infinite sorted sequences.', best: 'O(1)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(1)', prereq: ['binary-search'] },
  'Interpolation Search': { def: 'Interpolation search estimates the target position using linear interpolation on uniformly distributed sorted data.', imp: 'It can beat binary search on evenly spread keys.', best: 'O(1)', avg: 'O(log log N)', worst: 'O(N)', space: 'O(1)', prereq: ['binary-search'] },

  // ─── ADVANCED PATTERNS ──────────────────────────────────────────────
  'Two Pointers': { def: 'The two-pointer technique uses two indices moving through a sequence to solve pair, window, or partition problems in linear time.', imp: 'It turns many O(N^2) array problems into O(N) solutions.', best: 'O(N)', avg: 'O(N)', worst: 'O(N)', space: 'O(1)', prereq: ['array'] },
  'Sliding Window': { def: 'The sliding-window technique maintains a moving contiguous range and updates an aggregate incrementally as the window shifts.', imp: 'It solves subarray and substring problems in linear time.', best: 'O(N)', avg: 'O(N)', worst: 'O(N)', space: 'O(1)', prereq: ['two-pointers'] },
  'Fast and Slow Pointers': { def: 'The fast-and-slow-pointer technique advances two pointers at different speeds to detect cycles or find midpoints.', imp: "It detects linked-list cycles and midpoints in O(1) space (Floyd's algorithm).", best: 'O(N)', avg: 'O(N)', worst: 'O(N)', space: 'O(1)', prereq: ['linked-list', 'two-pointers'] },
  'Backtracking': { def: 'Backtracking incrementally builds candidate solutions and abandons a branch as soon as it cannot lead to a valid result.', imp: 'It systematically explores combinatorial search spaces like permutations and Sudoku.', best: 'O(1)', avg: 'O(2^N)', worst: 'O(N!)', space: 'O(N)', prereq: ['recursion-backtracking'] },
  'Divide and Conquer': { def: 'Divide and conquer breaks a problem into independent subproblems, solves them recursively, and combines their results.', imp: 'It is the paradigm behind merge sort, quick sort, and many fast algorithms.', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', space: 'O(log N)', prereq: ['recursion-backtracking', 'master-theorem'] },
  'Greedy Algorithms': { def: 'A greedy algorithm makes the locally optimal choice at each step in the hope of reaching a global optimum.', imp: 'It solves scheduling, MST, and coin problems when the greedy-choice property holds.', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', space: 'O(1)', prereq: ['array'] },
  'Dynamic Programming': { def: 'Dynamic programming solves problems by combining solutions to overlapping subproblems, caching results to avoid recomputation.', imp: 'It is one of the most important and heavily tested algorithmic techniques.', best: 'O(N)', avg: 'O(N·M)', worst: 'O(N·M)', space: 'O(N·M)', prereq: ['recursion-backtracking'] },
  'Hash Table': { def: 'A hash table maps keys to buckets via a hash function, giving average O(1) insertion, deletion, and lookup.', imp: 'It is the go-to structure for fast key-value storage and deduplication.', best: 'O(1)', avg: 'O(1)', worst: 'O(N)', space: 'O(N)', prereq: ['array'] },
  'Bitmask DP': { def: 'Bitmask DP encodes a set of chosen items as the bits of an integer to iterate over subsets as DP states.', imp: 'It solves problems over small sets like the traveling salesman.', best: 'O(2^N·N)', avg: 'O(2^N·N)', worst: 'O(2^N·N)', space: 'O(2^N)', prereq: ['dynamic-programming', 'bit-masking'] },
  'Digit DP': { def: 'Digit DP counts numbers in a range that satisfy digit-based constraints by processing digits with tight/loose state.', imp: 'It answers counting queries over numeric ranges efficiently.', best: 'O(D·S)', avg: 'O(D·S)', worst: 'O(D·S)', space: 'O(D·S)', prereq: ['dynamic-programming'] },
  'Interval DP': { def: 'Interval DP builds answers for larger sub-intervals from smaller ones, often splitting at an internal point.', imp: 'It solves matrix-chain and optimal-BST style problems.', best: 'O(N^2)', avg: 'O(N^3)', worst: 'O(N^3)', space: 'O(N^2)', prereq: ['dynamic-programming'] },
  'LCS & Edit Distance Patterns': { def: 'These DP patterns compare two sequences to compute the longest common subsequence or minimum edit distance between them.', imp: 'They power diff tools, spell-checkers, and DNA alignment.', best: 'O(N·M)', avg: 'O(N·M)', worst: 'O(N·M)', space: 'O(N·M)', prereq: ['dynamic-programming'] },
  'Knapsack 0/1 & Unbounded': { def: 'Knapsack DP selects items with weights and values to maximize value under a capacity, either using each item once (0/1) or unlimited (unbounded).', imp: 'It is the archetypal resource-allocation DP.', best: 'O(N·W)', avg: 'O(N·W)', worst: 'O(N·W)', space: 'O(W)', prereq: ['dynamic-programming'] },
  'Game Theory (Minimax)': { def: 'Minimax evaluates two-player zero-sum games by assuming each player plays optimally, minimizing the maximum possible loss.', imp: 'It underlies AI for board games and adversarial search.', best: 'O(B^D)', avg: 'O(B^D)', worst: 'O(B^D)', space: 'O(D)', prereq: ['recursion-backtracking'] },
  'Segment Tree with Lazy Propagation': { def: 'Lazy propagation defers range updates in a segment tree until needed, allowing O(log N) range updates and queries.', imp: 'It supports efficient range-update range-query workloads.', best: 'O(log N)', avg: 'O(log N)', worst: 'O(log N)', space: 'O(N)', prereq: ['segment-tree'] },
  'Meet in the Middle': { def: 'Meet in the middle splits the input in half, enumerates each half, and combines the halves to halve the exponent of brute force.', imp: 'It makes some exponential problems tractable.', best: 'O(2^(N/2))', avg: 'O(2^(N/2))', worst: 'O(2^(N/2))', space: 'O(2^(N/2))', prereq: ['divide-and-conquer'] },
  'Square Root Decomposition': { def: 'Square-root decomposition splits an array into blocks of size √N to answer range queries and updates in O(√N).', imp: 'It is a simple alternative to segment trees for range queries.', best: 'O(sqrt N)', avg: 'O(sqrt N)', worst: 'O(sqrt N)', space: 'O(N)', prereq: ['array'] },
  "Mo's Algorithm": { def: "Mo's algorithm answers offline range queries efficiently by reordering them and moving two pointers to add/remove elements.", imp: 'It handles many range queries without heavy data structures.', best: 'O((N+Q)·sqrt N)', avg: 'O((N+Q)·sqrt N)', worst: 'O((N+Q)·sqrt N)', space: 'O(N)', prereq: ['square-root-decomposition', 'two-pointers'] },
  'KMP String Matching': { def: 'The Knuth-Morris-Pratt algorithm searches for a pattern in text in linear time using a precomputed prefix-function table.', imp: 'It matches strings without re-examining characters.', best: 'O(N+M)', avg: 'O(N+M)', worst: 'O(N+M)', space: 'O(M)', prereq: ['array'] },
  'Rabin-Karp String Matching': { def: 'Rabin-Karp uses rolling hashes to compare a pattern against substrings of the text quickly.', imp: 'It efficiently finds multiple patterns and substrings via hashing.', best: 'O(N+M)', avg: 'O(N+M)', worst: 'O(N·M)', space: 'O(1)', prereq: ['modular-arithmetic', 'hash-table'] },
  'Z-Algorithm': { def: 'The Z-algorithm computes, for each position, the length of the longest substring matching the prefix, enabling linear pattern search.', imp: 'It is a concise linear-time string-matching tool.', best: 'O(N+M)', avg: 'O(N+M)', worst: 'O(N+M)', space: 'O(N)', prereq: ['kmp-string-matching'] },
  'Aho-Corasick Automaton': { def: 'Aho-Corasick builds a trie with failure links to match many patterns against a text simultaneously in linear time.', imp: 'It powers multi-keyword search and intrusion detection.', best: 'O(N+M+Z)', avg: 'O(N+M+Z)', worst: 'O(N+M+Z)', space: 'O(M)', prereq: ['trie', 'kmp-string-matching'] },
  "Manacher's Algorithm": { def: "Manacher's algorithm finds the longest palindromic substring in linear time by reusing previously computed palindrome radii.", imp: 'It solves palindrome problems faster than the O(N^2) approach.', best: 'O(N)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)', prereq: ['array'] },
  'Sweep Line Algorithm': { def: 'A sweep-line algorithm processes geometric events in sorted order as an imaginary line moves across the plane.', imp: 'It solves interval-overlap and segment-intersection problems.', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', space: 'O(N)', prereq: ['priority-queue'] },
  'Convex Hull (Graham Scan)': { def: 'Graham scan computes the convex hull of a point set by sorting points by angle and maintaining a stack of hull vertices.', imp: 'It is a foundational computational-geometry algorithm.', best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N log N)', space: 'O(N)', prereq: ['stack'] },
};

// Category-aware fallback for any title not present in the curated map above.
const CATEGORY_FALLBACK = {
  'c0c62d00-4bfa-4c41-867b-1d743a60c04f': { best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(1)' },
  '12d1b54a-bd54-4f05-99fe-005085e3cb76': { best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)' },
  'ba3c9e6d-66e8-46cb-8d0b-60a6cb774bd0': { best: 'O(log N)', avg: 'O(log N)', worst: 'O(N)', space: 'O(N)' },
  '5f9227eb-5f33-40a1-8d26-6f8101a070eb': { best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)' },
  'a87e35b7-7ab6-4c9b-b5b6-7f4144e5904d': { best: 'O(N log N)', avg: 'O(N log N)', worst: 'O(N^2)', space: 'O(1)' },
  'f8a2c910-4e5b-4d6a-9c1f-2b8e7d3a4f50': { best: 'O(N)', avg: 'O(N)', worst: 'O(N^2)', space: 'O(N)' },
};

function slugify(title) {
  if (SLUG_OVERRIDES[title]) return SLUG_OVERRIDES[title];
  return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

// Convenience aliases: short prerequisite names -> the topic's actual slug.
const PREREQ_ALIAS = {
  heap: 'heap-priority-queue',
  trie: 'trie-prefix-tree',
};

function resolvePrereq(slug) {
  return PREREQ_ALIAS[slug] || slug;
}

const topics = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

let authored = 0;
let fallback = 0;
const seenSlugs = new Set();

const updated = topics.map((t) => {
  const c = C[t.title];
  const slug = slugify(t.title);

  if (seenSlugs.has(slug)) {
    throw new Error(`Duplicate slug after override: ${slug} (title: ${t.title})`);
  }
  seenSlugs.add(slug);

  if (c) {
    authored++;
    return {
      ...t,
      slug,
      definition: c.def,
      importance: c.imp,
      prerequisites: c.prereq.map(resolvePrereq),
      time_complexity_best: c.best,
      time_complexity_average: c.avg,
      time_complexity_worst: c.worst,
      space_complexity: c.space,
    };
  }

  // Fallback: still better than identical placeholder — uses the real title
  // and category-appropriate complexity, and clears the bogus prerequisite.
  fallback++;
  const f = CATEGORY_FALLBACK[t.category_id] || { best: 'O(1)', avg: 'O(N)', worst: 'O(N)', space: 'O(N)' };
  return {
    ...t,
    slug,
    definition: `${t.title} is a ${t.difficulty.toLowerCase()}-level topic in this category. It is an important building block for solving related algorithmic problems efficiently.`,
    importance: `Mastering ${t.title} strengthens your problem-solving toolkit and is commonly encountered in technical interviews and competitive programming.`,
    prerequisites: [],
    time_complexity_best: f.best,
    time_complexity_average: f.avg,
    time_complexity_worst: f.worst,
    space_complexity: f.space,
  };
});

// Validate that every referenced prerequisite slug actually exists.
const allSlugs = new Set(updated.map((t) => t.slug));
const missing = new Set();
for (const t of updated) {
  for (const p of t.prerequisites) {
    if (!allSlugs.has(p)) missing.add(`${t.slug} -> ${p}`);
  }
}
if (missing.size > 0) {
  throw new Error('Unknown prerequisite slugs:\n' + [...missing].join('\n'));
}

fs.writeFileSync(DATA_PATH, JSON.stringify(updated, null, 2));
console.log(`Authored ${authored} topics, ${fallback} fallback, ${updated.length} total.`);
console.log('curriculum_expanded.json rewritten with accurate content.');

