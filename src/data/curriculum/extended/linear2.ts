import { CurriculumModule } from '@/types';
import { CATEGORY_IDS } from '../linear';

export const linear2Modules: CurriculumModule[] = [
  // ============================================================
  // 1. SPARSE MATRIX
  // ============================================================
  {
    topic: {
      id: 'ext-sparse-matrix',
      slug: 'sparse-matrix',
      category_id: CATEGORY_IDS.linear,
      title: 'Sparse Matrix',
      definition: 'A matrix in which most elements are zero, stored efficiently using only non-zero entries to save memory and computation.',
      importance: 'Sparse matrices are essential in scientific computing, machine learning (embeddings, recommendation systems), and graph algorithms where dense storage would waste gigabytes on zeros.',
      prerequisites: ['array', 'linked-list'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) Access in coordinate format with hash map',
      time_complexity_average: 'O(k) Operations, k = non-zero count',
      time_complexity_worst: 'O(m×n) Conversion to dense',
      space_complexity: 'O(k) for k non-zero elements',
      display_order: 208,
    },
    sections: [
      {
        id: 'sec-sparse-matrix-1',
        topic_id: 'ext-sparse-matrix',
        title: 'Visual & Intuitive Explanation',
        content: `
Imagine a giant spreadsheet with a million rows and columns, but only a few hundred cells contain actual data — everything else is zero. Storing all million-squared cells would consume terabytes.

A **sparse matrix** only records the *positions and values* of non-zero entries:

$$\\text{Dense: } \\begin{bmatrix} 0 & 0 & 3 \\\\ 0 & 5 & 0 \\\\ 7 & 0 & 0 \\end{bmatrix} \\quad\\longrightarrow\\quad \\text{Sparse: } [(0,2,3), (1,1,5), (2,0,7)]$$

> [!NOTE]
> Common representations: **COO** (coordinate list), **CSR** (compressed sparse row), **CSC** (compressed sparse column), and **DOK** (dictionary of keys). Each trades off access speed versus modification ease.
        `,
        display_order: 1,
      },
      {
        id: 'sec-sparse-matrix-2',
        topic_id: 'ext-sparse-matrix',
        title: 'Core Mechanics',
        content: `
**Coordinate (COO) format:**
- Store three parallel arrays: \`rows[]\`, \`cols[]\`, \`values[]\`.
- Simple and flexible for construction; inefficient for repeated row access.

**Compressed Sparse Row (CSR):**
- \`values[]\` and \`col_indices[]\` hold all non-zeros in row-major order.
- \`row_ptr[i]\` points to where row \`i\` starts in \`values[]\`.
- Fast row slicing; matrix-vector multiplication is cache-friendly.

**Dictionary of Keys (DOK):**
- Hash map keyed by \`(row, col)\` tuples.
- Constant-time updates; slower iteration than CSR.

Each format shines in different scenarios: COO for construction, CSR for computation, DOK for random updates.
        `,
        display_order: 2,
      },
      {
        id: 'sec-sparse-matrix-3',
        topic_id: 'ext-sparse-matrix',
        title: 'Complexity & Properties',
        content: `
| Operation | COO | CSR | DOK |
|-----------|-----|-----|-----|
| Insert/Update | $O(1)$ append | $O(k)$ rebuild | $O(1)$ hash |
| Access (i,j) | $O(k)$ scan | $O(\\text{row}_i \\text{ width})$ | $O(1)$ hash |
| Matrix-vector multiply | $O(k)$ | $O(k)$ fast | $O(k)$ |

Space complexity is $O(k)$ where $k$ is the number of non-zero elements. The overhead includes index storage (typically $2k$ integers for COO, $k + m + 1$ for CSR with $m$ rows).

**Sparsity ratio** $= \\frac{k}{m \\times n}$ determines whether sparse representation saves memory; typically beneficial when $< 10\\%$ entries are non-zero.
        `,
        display_order: 3,
      },
      {
        id: 'sec-sparse-matrix-4',
        topic_id: 'ext-sparse-matrix',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> Converting a sparse matrix to dense format can explode memory. Always operate in sparse space when possible.

Common pitfalls:
- **Wrong format choice**: using COO for repeated row access kills performance; use CSR instead.
- **Naive multiplication**: multiplying two sparse matrices can produce a dense result if their sparsity patterns don't align.
- **Index bugs**: off-by-one errors in row pointers corrupt the entire structure.

**Use cases:**
- **Graph adjacency matrices** (most node pairs have no edge).
- **TF-IDF and word embeddings** in NLP (vocabularies are huge, documents mention few words).
- **Finite element analysis** in engineering simulations.
- **Recommendation systems** (user-item matrices are >99% empty).
        `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-sparse-matrix-py',
        topic_id: 'ext-sparse-matrix',
        language: 'python',
        code: `class SparseMatrixDOK:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.data = {}

    def set(self, i, j, value):
        if value != 0:
            self.data[(i, j)] = value
        elif (i, j) in self.data:
            del self.data[(i, j)]

    def get(self, i, j):
        return self.data.get((i, j), 0)

    def matrix_vector_mult(self, vec):
        result = [0] * self.rows
        for (i, j), val in self.data.items():
            result[i] += val * vec[j]
        return result`,
        explanation: 'Dictionary-of-keys sparse matrix with O(1) access and update.',
        is_optimized: true,
      },
      {
        id: 'snip-sparse-matrix-js',
        topic_id: 'ext-sparse-matrix',
        language: 'javascript',
        code: `class SparseMatrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Map();
  }

  set(i, j, value) {
    const key = i + ',' + j;
    if (value !== 0) this.data.set(key, value);
    else this.data.delete(key);
  }

  get(i, j) {
    return this.data.get(i + ',' + j) || 0;
  }

  matVecMult(vec) {
    const result = Array(this.rows).fill(0);
    for (const [key, val] of this.data) {
      const [i, j] = key.split(',').map(Number);
      result[i] += val * vec[j];
    }
    return result;
  }
}`,
        explanation: 'Map-based sparse matrix supporting efficient random access and matrix-vector product.',
        is_optimized: true,
      },
      {
        id: 'snip-sparse-matrix-cpp',
        topic_id: 'ext-sparse-matrix',
        language: 'cpp',
        code: `#include <unordered_map>
#include <vector>
#include <string>

class SparseMatrix {
    int rows, cols;
    std::unordered_map<std::string, double> data;

    std::string key(int i, int j) {
        return std::to_string(i) + "," + std::to_string(j);
    }

public:
    SparseMatrix(int r, int c) : rows(r), cols(c) {}

    void set(int i, int j, double value) {
        if (value != 0.0) data[key(i, j)] = value;
        else data.erase(key(i, j));
    }

    double get(int i, int j) {
        auto it = data.find(key(i, j));
        return it != data.end() ? it->second : 0.0;
    }

    std::vector<double> matVecMult(const std::vector<double>& vec) {
        std::vector<double> result(rows, 0.0);
        for (const auto& [k, val] : data) {
            size_t comma = k.find(',');
            int i = std::stoi(k.substr(0, comma));
            int j = std::stoi(k.substr(comma + 1));
            result[i] += val * vec[j];
        }
        return result;
    }
};`,
        explanation: 'Hash-map-based sparse matrix with key-encoded coordinates.',
        is_optimized: true,
      },
      {
        id: 'snip-sparse-matrix-java',
        topic_id: 'ext-sparse-matrix',
        language: 'java',
        code: `import java.util.*;

class SparseMatrix {
    private int rows, cols;
    private Map<String, Double> data = new HashMap<>();

    public SparseMatrix(int rows, int cols) {
        this.rows = rows;
        this.cols = cols;
    }

    public void set(int i, int j, double value) {
        String key = i + "," + j;
        if (value != 0.0) data.put(key, value);
        else data.remove(key);
    }

    public double get(int i, int j) {
        return data.getOrDefault(i + "," + j, 0.0);
    }

    public double[] matVecMult(double[] vec) {
        double[] result = new double[rows];
        for (Map.Entry<String, Double> entry : data.entrySet()) {
            String[] parts = entry.getKey().split(",");
            int i = Integer.parseInt(parts[0]);
            int j = Integer.parseInt(parts[1]);
            result[i] += entry.getValue() * vec[j];
        }
        return result;
    }
}`,
        explanation: 'HashMap-backed sparse matrix with string-keyed coordinate pairs.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-sparse-matrix',
    quizTitle: 'Sparse Matrix Quiz',
    quizDescription: 'Test your understanding of sparse matrix representations and operations.',
    questions: [
      {
        id: 'q-sparse-matrix-1',
        quiz_id: 'quiz-ext-sparse-matrix',
        question_text: 'A 1000×1000 matrix has 50 non-zero entries. Using COO format (storing row, col, value as 32-bit integers and doubles), approximately how much memory is saved versus dense storage?',
        question_type: 'MCQ',
        options: [
          '~7.9 MB saved (dense 8MB, sparse 0.1MB)',
          '~4 MB saved',
          '~1 MB saved',
          'No savings; sparse uses more memory'
        ],
        correct_option_index: 0,
        explanation: 'Dense: 1000×1000×8 bytes = 8MB. COO sparse: 50×(4+4+8) = 800 bytes ≈ 0.0008 MB. Savings ≈ 7.9 MB.',
      },
      {
        id: 'q-sparse-matrix-2',
        quiz_id: 'quiz-ext-sparse-matrix',
        question_text: 'CSR (Compressed Sparse Row) format is faster than DOK (Dictionary of Keys) for iterating all non-zeros in row-major order.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'True. CSR stores non-zeros contiguously by row, enabling cache-friendly iteration. DOK requires hash table traversal with unpredictable memory access patterns.',
      },
      {
        id: 'q-sparse-matrix-3',
        quiz_id: 'quiz-ext-sparse-matrix',
        question_text: 'What is the time complexity of accessing element (i, j) in a DOK sparse matrix with k non-zero elements?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log k)', 'O(k)', 'O(m + n)'],
        correct_option_index: 0,
        explanation: 'DOK uses a hash map keyed by (row, col) tuples, providing O(1) average-case access time.',
      },
    ],
  },
  // ============================================================
  // 2. PRIORITY QUEUE
  // ============================================================
  {
    topic: {
      id: 'ext-priority-queue',
      slug: 'priority-queue',
      category_id: CATEGORY_IDS.linear,
      title: 'Priority Queue',
      definition: 'An abstract data type where each element has a priority, and elements are served in order of priority rather than insertion order.',
      importance: 'Priority queues underpin Dijkstra shortest-path, Prim MST, Huffman coding, event-driven simulations, and OS task scheduling.',
      prerequisites: ['queue', 'array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) Peek highest priority',
      time_complexity_average: 'O(log N) Insert and extract',
      time_complexity_worst: 'O(log N) Insert and extract (binary heap)',
      space_complexity: 'O(N)',
      display_order: 209,
    },
    sections: [
      {
        id: 'sec-priority-queue-1',
        topic_id: 'ext-priority-queue',
        title: 'Visual & Intuitive Explanation',
        content: `
Think of a hospital emergency room. Patients aren't seen in arrival order — the most critical cases jump the line. That's a **priority queue**: every element carries a priority, and the highest-priority element always comes out first.

$$\\text{enqueue}(A, 3),\\ \\text{enqueue}(B, 1),\\ \\text{enqueue}(C, 2) \\Rightarrow \\text{dequeue} \\to A\\ (\\text{highest})$$

> [!NOTE]
> A priority queue is an **abstract data type**, not a specific implementation. The most common backing structure is a **binary heap**, but balanced BSTs, Fibonacci heaps, and even sorted arrays can implement it.
        `,
        display_order: 1,
      },
      {
        id: 'sec-priority-queue-2',
        topic_id: 'ext-priority-queue',
        title: 'Core Mechanics',
        content: `
A **binary heap** is the classic implementation — a complete binary tree stored in an array where the parent of index \`i\` is at \`(i-1)/2\` and children at \`2i+1\`, \`2i+2\`.

**Insert (sift-up):**
1. Append the element at the end.
2. Compare with parent; swap if it violates the heap property.
3. Repeat until the root or heap order is restored.

**Extract-max/min (sift-down):**
1. Save the root (the answer).
2. Move the last element to the root.
3. Compare with children; swap with the higher/lower priority child.
4. Repeat until heap order restored.

Both operations touch at most $\\log N$ levels, giving $O(\\log N)$ time.
        `,
        display_order: 2,
      },
      {
        id: 'sec-priority-queue-3',
        topic_id: 'ext-priority-queue',
        title: 'Complexity & Properties',
        content: `
| Operation | Binary Heap | Sorted Array | Unsorted Array |
|-----------|-------------|--------------|----------------|
| Insert | $O(\\log N)$ | $O(N)$ | $O(1)$ |
| Extract max | $O(\\log N)$ | $O(1)$ | $O(N)$ |
| Peek | $O(1)$ | $O(1)$ | $O(N)$ |
| Build from N items | $O(N)$ | $O(N \\log N)$ | $O(N)$ |

The **heapify** operation building a heap from an array runs in $O(N)$ — surprisingly better than $N$ individual inserts ($O(N \\log N)$) — because most nodes are near the leaves and sift down only a few levels.

Heaps are **not stable** and do **not** support efficient search for arbitrary elements ($O(N)$).
        `,
        display_order: 3,
      },
      {
        id: 'sec-priority-queue-4',
        topic_id: 'ext-priority-queue',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> Most standard libraries provide a **min-heap** by default. To build a max-heap, negate priorities or supply a reverse comparator — a frequent source of bugs.

Common pitfalls:
- **Modifying priority in place**: changing an element's priority without re-heapifying corrupts the order. Use a decrease-key operation or re-insert.
- **Assuming sorted iteration**: iterating a heap does NOT yield sorted order; only repeated extraction does.

**Use cases:**
- **Dijkstra's and Prim's** algorithms.
- **Huffman coding** for compression.
- **Task schedulers** and event simulations.
- **Top-K queries** using a bounded heap.
        `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-priority-queue-py',
        topic_id: 'ext-priority-queue',
        language: 'python',
        code: `import heapq

class PriorityQueue:
    def __init__(self):
        self._heap = []
        self._count = 0

    def push(self, item, priority):
        # heapq is a min-heap; count breaks ties by insertion order
        heapq.heappush(self._heap, (priority, self._count, item))
        self._count += 1

    def pop(self):
        priority, _, item = heapq.heappop(self._heap)
        return item

    def peek(self):
        return self._heap[0][2]

    def __len__(self):
        return len(self._heap)`,
        explanation: 'Min priority queue built on heapq with a tie-breaking counter for stable ordering.',
        is_optimized: true,
      },
      {
        id: 'snip-priority-queue-js',
        topic_id: 'ext-priority-queue',
        language: 'javascript',
        code: `class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  siftDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.heap[l] < this.heap[smallest]) smallest = l;
      if (r < n && this.heap[r] < this.heap[smallest]) smallest = r;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}`,
        explanation: 'Array-backed binary min-heap with sift-up on push and sift-down on pop.',
        is_optimized: true,
      },
      {
        id: 'snip-priority-queue-cpp',
        topic_id: 'ext-priority-queue',
        language: 'cpp',
        code: `#include <queue>
#include <vector>
#include <iostream>

int main() {
    // Min-heap: smallest element on top
    std::priority_queue<int, std::vector<int>, std::greater<int>> pq;

    pq.push(5);
    pq.push(1);
    pq.push(3);

    while (!pq.empty()) {
        std::cout << pq.top() << " "; // prints 1 3 5
        pq.pop();
    }
    return 0;
}`,
        explanation: 'Standard-library min priority queue using std::greater to reverse the default max-heap.',
        is_optimized: true,
      },
      {
        id: 'snip-priority-queue-java',
        topic_id: 'ext-priority-queue',
        language: 'java',
        code: `import java.util.PriorityQueue;
import java.util.Comparator;

public class PQDemo {
    public static void main(String[] args) {
        // Max-heap via reverse comparator
        PriorityQueue<Integer> pq =
            new PriorityQueue<>(Comparator.reverseOrder());

        pq.offer(5);
        pq.offer(1);
        pq.offer(3);

        while (!pq.isEmpty()) {
            System.out.print(pq.poll() + " "); // prints 5 3 1
        }
    }
}`,
        explanation: 'Java PriorityQueue configured as a max-heap with a reverse-order comparator.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-priority-queue',
    quizTitle: 'Priority Queue Quiz',
    quizDescription: 'Test your understanding of priority queues and heap-based implementations.',
    questions: [
      {
        id: 'q-priority-queue-1',
        quiz_id: 'quiz-ext-priority-queue',
        question_text: 'Which implementation gives the best overall performance for a general-purpose priority queue supporting frequent inserts and extractions?',
        question_type: 'MCQ',
        options: [
          'Binary heap — O(log N) insert and extract',
          'Sorted array — O(1) extract but O(N) insert',
          'Unsorted array — O(1) insert but O(N) extract',
          'Linked list — O(N) for both'
        ],
        correct_option_index: 0,
        explanation: 'A binary heap balances both operations at O(log N), unlike sorted/unsorted arrays which make one operation O(N).',
      },
      {
        id: 'q-priority-queue-2',
        quiz_id: 'quiz-ext-priority-queue',
        question_text: 'Iterating over the internal array of a binary heap yields elements in fully sorted order.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'False. A heap only guarantees the root is the min/max. The internal array is partially ordered; sorted order requires repeated extraction.',
      },
      {
        id: 'q-priority-queue-3',
        quiz_id: 'quiz-ext-priority-queue',
        question_text: 'What is the time complexity of building a heap from an unsorted array of N elements using bottom-up heapify?',
        question_type: 'COMPLEXITY',
        options: ['O(N)', 'O(N log N)', 'O(log N)', 'O(N^2)'],
        correct_option_index: 0,
        explanation: 'Bottom-up heapify runs in O(N) because most nodes are near the leaves and sift down only a few levels, unlike N individual O(log N) inserts.',
      },
    ],
  },
  // ============================================================
  // 3. SKIP LIST
  // ============================================================
  {
    topic: {
      id: 'ext-skip-list',
      slug: 'skip-list',
      category_id: CATEGORY_IDS.linear,
      title: 'Skip List',
      definition: 'A probabilistic data structure that layers multiple sorted linked lists to allow O(log N) search, insertion, and deletion by "skipping" over nodes.',
      importance: 'Skip lists offer a simpler alternative to balanced trees and power Redis sorted sets, LevelDB memtables, and concurrent ordered maps in the JVM.',
      prerequisites: ['linked-list'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(log N) Search',
      time_complexity_average: 'O(log N) Search, insert, delete',
      time_complexity_worst: 'O(N) Search (pathological levels)',
      space_complexity: 'O(N) expected',
      display_order: 210,
    },
    sections: [
      {
        id: 'sec-skip-list-1',
        topic_id: 'ext-skip-list',
        title: 'Visual & Intuitive Explanation',
        content: `
Imagine an express subway line running above the local line. The express train stops only at major stations, letting you cover distance quickly before dropping down to the local line for the final stretch.

A **skip list** stacks several sorted linked lists. The bottom layer contains every element; each higher layer is a sparse "express lane" holding a random subset:

$$L_2:\\ 1 \\longrightarrow \\quad\\quad\\quad 9$$
$$L_1:\\ 1 \\longrightarrow 5 \\longrightarrow 9$$
$$L_0:\\ 1 \\to 3 \\to 5 \\to 7 \\to 9$$

> [!NOTE]
> Each node's height is chosen **randomly** (typically by coin flips). This randomness gives expected $O(\\log N)$ performance without any complex rebalancing rotations.
        `,
        display_order: 1,
      },
      {
        id: 'sec-skip-list-2',
        topic_id: 'ext-skip-list',
        title: 'Core Mechanics',
        content: `
**Search:** Start at the top-left. Move right while the next node's key is $<$ target. When you'd overshoot (the next key is $\\ge$ target), drop down one level. Repeat until level 0, then check whether the node just past \`cur\` has the target key.

**Insert:**
1. Search, recording the rightmost node visited at each level (the *update* array).
2. Flip a coin to determine the new node's height: keep promoting while heads come up.
3. Splice the node into every level up to its height, fixing forward pointers using the update array.

**Delete:** Search to build the update array, then unlink the node from each level it appears in.

The coin-flip promotion keeps roughly $\\frac{1}{2}$ the nodes at each successive level, mirroring a balanced tree's structure probabilistically.
        `,
        display_order: 2,
      },
      {
        id: 'sec-skip-list-3',
        topic_id: 'ext-skip-list',
        title: 'Complexity & Properties',
        content: `
| Operation | Expected | Worst Case |
|-----------|----------|-----------|
| Search | $O(\\log N)$ | $O(N)$ |
| Insert | $O(\\log N)$ | $O(N)$ |
| Delete | $O(\\log N)$ | $O(N)$ |
| Space | $O(N)$ | $O(N \\log N)$ |

With promotion probability $p = \\frac{1}{2}$, the expected number of levels is $\\log_2 N$ and expected space is $2N$ pointers.

Unlike red-black or AVL trees, skip lists need **no rotations** and are far easier to make **lock-free** for concurrent access — a key reason they appear in high-performance databases.
        `,
        display_order: 3,
      },
      {
        id: 'sec-skip-list-4',
        topic_id: 'ext-skip-list',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> Worst-case performance is $O(N)$ if the random levels degenerate (all nodes at height 1). This is astronomically unlikely but means skip lists are unsuitable for hard real-time guarantees.

Common pitfalls:
- **Poor RNG**: a biased random source skews level distribution and degrades performance.
- **Forgetting the update array**: insertion and deletion must fix pointers at *every* level the node touches.
- **Unbounded height**: cap the maximum level (e.g. $\\log N$) to avoid wasted space.

**Use cases:**
- **Redis** sorted sets (ZSET).
- **Apache Lucene** and **LevelDB/RocksDB** memtables.
- **Concurrent ordered maps** where lock-free updates matter.
        `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-skip-list-py',
        topic_id: 'ext-skip-list',
        language: 'python',
        code: `import random

class Node:
    def __init__(self, key, level):
        self.key = key
        self.forward = [None] * (level + 1)

class SkipList:
    def __init__(self, max_level=16, p=0.5):
        self.max_level = max_level
        self.p = p
        self.level = 0
        self.header = Node(None, max_level)

    def _random_level(self):
        lvl = 0
        while random.random() < self.p and lvl < self.max_level:
            lvl += 1
        return lvl

    def insert(self, key):
        update = [None] * (self.max_level + 1)
        cur = self.header
        for i in range(self.level, -1, -1):
            while cur.forward[i] and cur.forward[i].key < key:
                cur = cur.forward[i]
            update[i] = cur
        lvl = self._random_level()
        if lvl > self.level:
            for i in range(self.level + 1, lvl + 1):
                update[i] = self.header
            self.level = lvl
        node = Node(key, lvl)
        for i in range(lvl + 1):
            node.forward[i] = update[i].forward[i]
            update[i].forward[i] = node

    def search(self, key):
        cur = self.header
        for i in range(self.level, -1, -1):
            while cur.forward[i] and cur.forward[i].key < key:
                cur = cur.forward[i]
        cur = cur.forward[0]
        return cur is not None and cur.key == key`,
        explanation: 'Probabilistic skip list with randomized level promotion and O(log N) expected search/insert.',
        is_optimized: true,
      },
      {
        id: 'snip-skip-list-js',
        topic_id: 'ext-skip-list',
        language: 'javascript',
        code: `class SkipNode {
  constructor(key, level) {
    this.key = key;
    this.forward = new Array(level + 1).fill(null);
  }
}

class SkipList {
  constructor(maxLevel = 16, p = 0.5) {
    this.maxLevel = maxLevel;
    this.p = p;
    this.level = 0;
    this.header = new SkipNode(-Infinity, maxLevel);
  }

  randomLevel() {
    let lvl = 0;
    while (Math.random() < this.p && lvl < this.maxLevel) lvl++;
    return lvl;
  }

  insert(key) {
    const update = new Array(this.maxLevel + 1);
    let cur = this.header;
    for (let i = this.level; i >= 0; i--) {
      while (cur.forward[i] && cur.forward[i].key < key) cur = cur.forward[i];
      update[i] = cur;
    }
    const lvl = this.randomLevel();
    if (lvl > this.level) {
      for (let i = this.level + 1; i <= lvl; i++) update[i] = this.header;
      this.level = lvl;
    }
    const node = new SkipNode(key, lvl);
    for (let i = 0; i <= lvl; i++) {
      node.forward[i] = update[i].forward[i];
      update[i].forward[i] = node;
    }
  }

  search(key) {
    let cur = this.header;
    for (let i = this.level; i >= 0; i--) {
      while (cur.forward[i] && cur.forward[i].key < key) cur = cur.forward[i];
    }
    cur = cur.forward[0];
    return cur !== null && cur.key === key;
  }
}`,
        explanation: 'Skip list with coin-flip level promotion and multi-level forward pointers.',
        is_optimized: true,
      },
      {
        id: 'snip-skip-list-cpp',
        topic_id: 'ext-skip-list',
        language: 'cpp',
        code: `#include <vector>
#include <cstdlib>

struct Node {
    int key;
    std::vector<Node*> forward;
    Node(int k, int level) : key(k), forward(level + 1, nullptr) {}
};

class SkipList {
    int maxLevel;
    float p;
    int level;
    Node* header;

    int randomLevel() {
        int lvl = 0;
        while (((float)rand() / RAND_MAX) < p && lvl < maxLevel) lvl++;
        return lvl;
    }
public:
    SkipList(int maxLvl = 16, float prob = 0.5f)
        : maxLevel(maxLvl), p(prob), level(0) {
        header = new Node(-1, maxLevel);
    }

    void insert(int key) {
        std::vector<Node*> update(maxLevel + 1, nullptr);
        Node* cur = header;
        for (int i = level; i >= 0; i--) {
            while (cur->forward[i] && cur->forward[i]->key < key)
                cur = cur->forward[i];
            update[i] = cur;
        }
        int lvl = randomLevel();
        if (lvl > level) {
            for (int i = level + 1; i <= lvl; i++) update[i] = header;
            level = lvl;
        }
        Node* node = new Node(key, lvl);
        for (int i = 0; i <= lvl; i++) {
            node->forward[i] = update[i]->forward[i];
            update[i]->forward[i] = node;
        }
    }

    bool search(int key) {
        Node* cur = header;
        for (int i = level; i >= 0; i--)
            while (cur->forward[i] && cur->forward[i]->key < key)
                cur = cur->forward[i];
        cur = cur->forward[0];
        return cur != nullptr && cur->key == key;
    }
};`,
        explanation: 'C++ skip list using vectors of forward pointers per level for O(log N) expected search.',
        is_optimized: true,
      },
      {
        id: 'snip-skip-list-java',
        topic_id: 'ext-skip-list',
        language: 'java',
        code: `import java.util.Random;

public class SkipList {
    static class Node {
        int key;
        Node[] forward;
        Node(int key, int level) {
            this.key = key;
            this.forward = new Node[level + 1];
        }
    }

    private final int maxLevel;
    private final double p;
    private int level = 0;
    private final Node header;
    private final Random rand = new Random();

    public SkipList(int maxLevel, double p) {
        this.maxLevel = maxLevel;
        this.p = p;
        this.header = new Node(Integer.MIN_VALUE, maxLevel);
    }

    private int randomLevel() {
        int lvl = 0;
        while (rand.nextDouble() < p && lvl < maxLevel) lvl++;
        return lvl;
    }

    public void insert(int key) {
        Node[] update = new Node[maxLevel + 1];
        Node cur = header;
        for (int i = level; i >= 0; i--) {
            while (cur.forward[i] != null && cur.forward[i].key < key)
                cur = cur.forward[i];
            update[i] = cur;
        }
        int lvl = randomLevel();
        if (lvl > level) {
            for (int i = level + 1; i <= lvl; i++) update[i] = header;
            level = lvl;
        }
        Node node = new Node(key, lvl);
        for (int i = 0; i <= lvl; i++) {
            node.forward[i] = update[i].forward[i];
            update[i].forward[i] = node;
        }
    }

    public boolean search(int key) {
        Node cur = header;
        for (int i = level; i >= 0; i--)
            while (cur.forward[i] != null && cur.forward[i].key < key)
                cur = cur.forward[i];
        cur = cur.forward[0];
        return cur != null && cur.key == key;
    }
}`,
        explanation: 'Java skip list with randomized levels and an update array for splicing new nodes.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-skip-list',
    quizTitle: 'Skip List Quiz',
    quizDescription: 'Test your understanding of probabilistic skip lists and their performance characteristics.',
    questions: [
      {
        id: 'q-skip-list-1',
        quiz_id: 'quiz-ext-skip-list',
        question_text: 'What mechanism determines the height (number of levels) of a node in a skip list?',
        question_type: 'MCQ',
        options: [
          'A random process (e.g., repeated coin flips)',
          'The insertion order of the node',
          'The magnitude of the key value',
          'Tree rotations after each insert'
        ],
        correct_option_index: 0,
        explanation: 'Node height is chosen randomly, typically by flipping a coin and promoting while heads appear. This randomness yields expected O(log N) performance without rotations.',
      },
      {
        id: 'q-skip-list-2',
        quiz_id: 'quiz-ext-skip-list',
        question_text: 'Skip lists require complex rebalancing rotations like AVL or red-black trees.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'False. Skip lists use probabilistic balancing via random level assignment, avoiding rotations entirely. This makes them simpler to implement and easier to parallelize.',
      },
      {
        id: 'q-skip-list-3',
        quiz_id: 'quiz-ext-skip-list',
        question_text: 'What is the expected time complexity of search in a skip list with N elements?',
        question_type: 'COMPLEXITY',
        options: ['O(log N)', 'O(N)', 'O(1)', 'O(N log N)'],
        correct_option_index: 0,
        explanation: 'With promotion probability p = 1/2, the expected number of levels is log N, giving O(log N) expected search time. Worst case is O(N) but astronomically unlikely.',
      },
    ],
  },
  // ============================================================
  // 4. UNROLLED LINKED LIST
  // ============================================================
  {
    topic: {
      id: 'ext-unrolled-linked-list',
      slug: 'unrolled-linked-list',
      category_id: CATEGORY_IDS.linear,
      title: 'Unrolled Linked List',
      definition: 'A linked list variant where each node stores a small fixed-size array of elements instead of a single element, improving cache performance and reducing pointer overhead.',
      importance: 'Unrolled linked lists bridge arrays and linked lists, improving cache locality and memory efficiency; they underpin rope data structures and some database row stores.',
      prerequisites: ['linked-list', 'array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) Access within a cached node',
      time_complexity_average: 'O(N/m) Search, m = elements per node',
      time_complexity_worst: 'O(N) Search',
      space_complexity: 'O(N)',
      display_order: 211,
    },
    sections: [
      {
        id: 'sec-unrolled-linked-list-1',
        topic_id: 'ext-unrolled-linked-list',
        title: 'Visual & Intuitive Explanation',
        content: `
A regular linked list stores one item per node, wasting memory on pointers and scattering data across the heap — terrible for CPU caches. An **unrolled linked list** packs a small **array of items** into each node.

$$[\\,a, b, c\\,] \\longrightarrow [\\,d, e, f\\,] \\longrightarrow [\\,g, h\\,]$$

Instead of one pointer-hop per element, you hop once per *block* and then scan a cache-friendly array.

> [!NOTE]
> Each node typically holds up to a fixed capacity $m$ (often sized so a node fills a cache line). This amortizes pointer overhead across many elements and dramatically improves traversal speed.
        `,
        display_order: 1,
      },
      {
        id: 'sec-unrolled-linked-list-2',
        topic_id: 'ext-unrolled-linked-list',
        title: 'Core Mechanics',
        content: `
Each node keeps a count of used slots and an array of capacity $m$.

**Insert:**
1. Walk to the node covering the target index.
2. If the node has room, shift local elements and insert.
3. If the node is **full**, split it: move roughly half its elements into a new node linked after it, then insert.

**Delete:**
1. Locate the node and remove the element, shifting locals left.
2. If a node drops below a threshold (e.g. $m/2$), **merge** it with a neighbor or redistribute elements to avoid sparse nodes.

Keeping nodes roughly half-to-fully packed maintains the $O(N/m)$ traversal advantage.
        `,
        display_order: 2,
      },
      {
        id: 'sec-unrolled-linked-list-3',
        topic_id: 'ext-unrolled-linked-list',
        title: 'Complexity & Properties',
        content: `
| Operation | Unrolled | Plain Linked List |
|-----------|----------|-------------------|
| Search | $O(N/m + m) = O(N)$ | $O(N)$ |
| Insert (located) | $O(m)$ shift | $O(1)$ |
| Traversal cache misses | $\\sim N/m$ | $\\sim N$ |
| Pointer overhead | $1$ per $m$ items | $1$ per item |

Although asymptotic search remains $O(N)$, the constant factor shrinks by $\\approx m$ because each pointer dereference now yields $m$ contiguous elements. With $N$ elements and block size $m$, there are only $N/m$ nodes.

The sweet spot for $m$ balances **fewer cache misses** (larger $m$) against **cheaper local shifts** (smaller $m$); $\\sqrt{N}$ is a common theoretical choice.
        `,
        display_order: 3,
      },
      {
        id: 'sec-unrolled-linked-list-4',
        topic_id: 'ext-unrolled-linked-list',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> Choosing $m$ too small forfeits the cache benefit and behaves like a plain linked list; choosing it too large makes local insert/delete shifts expensive.

Common pitfalls:
- **Skipping the merge step** on deletion leaves many half-empty nodes, degrading density.
- **Off-by-one in split logic** corrupts element counts.
- **Ignoring cache line size** when tuning $m$ misses the main performance goal.

**Use cases:**
- **Text editors and ropes** for large document buffers.
- **In-memory column/row stores** in databases.
- Situations needing linked-list-style splicing with array-style scan speed.
        `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-unrolled-linked-list-py',
        topic_id: 'ext-unrolled-linked-list',
        language: 'python',
        code: `class UNode:
    def __init__(self, capacity):
        self.capacity = capacity
        self.items = []
        self.next = None

class UnrolledLinkedList:
    def __init__(self, capacity=4):
        self.capacity = capacity
        self.head = UNode(capacity)

    def append(self, value):
        node = self.head
        while node.next is not None:
            node = node.next
        if len(node.items) < self.capacity:
            node.items.append(value)
        else:
            new_node = UNode(self.capacity)
            # move half the elements to the new node
            half = len(node.items) // 2
            new_node.items = node.items[half:]
            node.items = node.items[:half]
            new_node.next = node.next
            node.next = new_node
            new_node.items.append(value)

    def to_list(self):
        out, node = [], self.head
        while node is not None:
            out.extend(node.items)
            node = node.next
        return out`,
        explanation: 'Unrolled linked list that splits a full node in half before appending.',
        is_optimized: true,
      },
      {
        id: 'snip-unrolled-linked-list-js',
        topic_id: 'ext-unrolled-linked-list',
        language: 'javascript',
        code: `class UNode {
  constructor(capacity) {
    this.capacity = capacity;
    this.items = [];
    this.next = null;
  }
}

class UnrolledLinkedList {
  constructor(capacity = 4) {
    this.capacity = capacity;
    this.head = new UNode(capacity);
  }

  append(value) {
    let node = this.head;
    while (node.next !== null) node = node.next;
    if (node.items.length < this.capacity) {
      node.items.push(value);
    } else {
      const newNode = new UNode(this.capacity);
      const half = Math.floor(node.items.length / 2);
      newNode.items = node.items.splice(half);
      newNode.next = node.next;
      node.next = newNode;
      newNode.items.push(value);
    }
  }

  toArray() {
    const out = [];
    let node = this.head;
    while (node !== null) {
      out.push(...node.items);
      node = node.next;
    }
    return out;
  }
}`,
        explanation: 'JavaScript unrolled linked list appending with half-node splitting on overflow.',
        is_optimized: true,
      },
      {
        id: 'snip-unrolled-linked-list-cpp',
        topic_id: 'ext-unrolled-linked-list',
        language: 'cpp',
        code: `#include <vector>
#include <cstddef>

template <typename T>
struct UNode {
    std::vector<T> items;
    UNode* next = nullptr;
    size_t capacity;
    explicit UNode(size_t cap) : capacity(cap) { items.reserve(cap); }
};

template <typename T>
class UnrolledLinkedList {
    UNode<T>* head;
    size_t capacity;
public:
    explicit UnrolledLinkedList(size_t cap = 4) : capacity(cap) {
        head = new UNode<T>(cap);
    }

    void append(const T& value) {
        UNode<T>* node = head;
        while (node->next != nullptr) node = node->next;
        if (node->items.size() < capacity) {
            node->items.push_back(value);
        } else {
            UNode<T>* fresh = new UNode<T>(capacity);
            size_t half = node->items.size() / 2;
            fresh->items.assign(node->items.begin() + half, node->items.end());
            node->items.resize(half);
            fresh->next = node->next;
            node->next = fresh;
            fresh->items.push_back(value);
        }
    }
};`,
        explanation: 'Templated C++ unrolled linked list with vector-backed nodes and split-on-full.',
        is_optimized: true,
      },
      {
        id: 'snip-unrolled-linked-list-java',
        topic_id: 'ext-unrolled-linked-list',
        language: 'java',
        code: `import java.util.ArrayList;
import java.util.List;

public class UnrolledLinkedList<T> {
    static class UNode<T> {
        List<T> items = new ArrayList<>();
        UNode<T> next;
    }

    private final int capacity;
    private final UNode<T> head = new UNode<>();

    public UnrolledLinkedList(int capacity) {
        this.capacity = capacity;
    }

    public void append(T value) {
        UNode<T> node = head;
        while (node.next != null) node = node.next;
        if (node.items.size() < capacity) {
            node.items.add(value);
        } else {
            UNode<T> fresh = new UNode<>();
            int half = node.items.size() / 2;
            fresh.items.addAll(node.items.subList(half, node.items.size()));
            node.items.subList(half, node.items.size()).clear();
            fresh.next = node.next;
            node.next = fresh;
            fresh.items.add(value);
        }
    }

    public List<T> toList() {
        List<T> out = new ArrayList<>();
        for (UNode<T> n = head; n != null; n = n.next) out.addAll(n.items);
        return out;
    }
}`,
        explanation: 'Java generic unrolled linked list splitting a full node before appending.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-unrolled-linked-list',
    quizTitle: 'Unrolled Linked List Quiz',
    quizDescription: 'Test your understanding of unrolled linked lists and their cache-efficiency trade-offs.',
    questions: [
      {
        id: 'q-unrolled-linked-list-1',
        quiz_id: 'quiz-ext-unrolled-linked-list',
        question_text: 'What is the primary advantage of an unrolled linked list over a plain linked list?',
        question_type: 'MCQ',
        options: [
          'Better cache locality and reduced pointer overhead by storing arrays in each node',
          'It guarantees O(1) random access by index',
          'It eliminates the need for pointers entirely',
          'It keeps elements sorted automatically'
        ],
        correct_option_index: 0,
        explanation: 'Packing multiple elements into an array per node improves cache locality and amortizes pointer overhead across m elements, though asymptotic search stays O(N).',
      },
      {
        id: 'q-unrolled-linked-list-2',
        quiz_id: 'quiz-ext-unrolled-linked-list',
        question_text: 'Choosing a very small block size m makes an unrolled linked list behave much like a plain linked list.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'True. As m approaches 1, each node holds one element, forfeiting the cache benefit and reverting to plain-linked-list behavior.',
      },
      {
        id: 'q-unrolled-linked-list-3',
        quiz_id: 'quiz-ext-unrolled-linked-list',
        question_text: 'With N elements and block size m, how many nodes does an unrolled linked list contain?',
        question_type: 'COMPLEXITY',
        options: ['O(N/m)', 'O(N)', 'O(log N)', 'O(m)'],
        correct_option_index: 0,
        explanation: 'Each node holds up to m elements, so N elements require approximately N/m nodes, reducing pointer hops during traversal.',
      },
    ],
  },
  // ============================================================
  // 5. SELF-ORGANIZING LIST
  // ============================================================
  {
    topic: {
      id: 'ext-self-organizing-list',
      slug: 'self-organizing-list',
      category_id: CATEGORY_IDS.linear,
      title: 'Self-Organizing List',
      definition: 'A list that reorders its elements based on access patterns, moving frequently accessed items toward the front to reduce average search time.',
      importance: 'Self-organizing lists exploit locality of reference to speed up repeated lookups, powering caches, LRU-like structures, and adaptive symbol tables without maintaining explicit frequency counts.',
      prerequisites: ['linked-list'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) Access recently used front element',
      time_complexity_average: 'O(N) Search (better with locality)',
      time_complexity_worst: 'O(N) Search',
      space_complexity: 'O(N)',
      display_order: 212,
    },
    sections: [
      {
        id: 'sec-self-organizing-list-1',
        topic_id: 'ext-self-organizing-list',
        title: 'Visual & Intuitive Explanation',
        content: `
Think of a messy stack of papers on your desk. The document you use most often naturally ends up on top because you keep pulling it out and placing it back on the pile. A **self-organizing list** does exactly this: it rearranges itself so that popular items drift to the front.

$$\\text{access}(D):\\ [A, B, C, D] \\longrightarrow [D, A, B, C]$$

> [!NOTE]
> The key insight is **locality of reference** — real-world access patterns are rarely uniform. By keeping hot items near the head, average search cost drops even though the worst case stays $O(N)$.
        `,
        display_order: 1,
      },
      {
        id: 'sec-self-organizing-list-2',
        topic_id: 'ext-self-organizing-list',
        title: 'Core Mechanics',
        content: `
Three classic reordering strategies:

**Move-to-Front (MTF):** On every access, move the found element to the head. Simple and highly adaptive; the standard choice.

**Transpose:** On access, swap the found element with its immediate predecessor. Changes are gradual, resisting one-off accesses that would disrupt MTF.

**Count (frequency):** Keep an access counter per element and keep the list sorted by count. Optimal for stable frequency distributions but requires extra storage and reordering work.

MTF is **competitive**: its total cost is within a constant factor ($\\le 2\\times$) of the optimal offline reordering — a celebrated result in competitive analysis.
        `,
        display_order: 2,
      },
      {
        id: 'sec-self-organizing-list-3',
        topic_id: 'ext-self-organizing-list',
        title: 'Complexity & Properties',
        content: `
| Strategy | Access reorder cost | Extra space | Adapts fast? |
|----------|--------------------|-------------|--------------|
| Move-to-Front | $O(1)$ (linked list) | none | Yes |
| Transpose | $O(1)$ | none | Slowly |
| Count | $O(N)$ resort | $O(N)$ counters | Yes |

Worst-case search remains $O(N)$, but with skewed (Zipfian) access distributions the **expected** cost approaches $O(1)$ for the hottest items.

> [!IMPORTANT]
> Move-to-Front is $2$-competitive: for any access sequence, its cost is at most twice that of the best possible static ordering chosen with hindsight.
        `,
        display_order: 3,
      },
      {
        id: 'sec-self-organizing-list-4',
        topic_id: 'ext-self-organizing-list',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> Move-to-Front can be counterproductive under **uniform random** access, where the constant reordering adds overhead without improving hit rates.

Common pitfalls:
- **Using MTF on array-backed lists**: moving to front costs $O(N)$ shifting; use a linked list for $O(1)$ splicing.
- **Transpose starvation**: a frequently accessed element two positions from the front may never reach it with transpose alone.

**Use cases:**
- **MTF transform** in data compression (bzip2 pipeline).
- **Adaptive caches** and symbol tables.
- **Streaming lookups** where recent items are likely to recur.
        `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-self-organizing-list-py',
        topic_id: 'ext-self-organizing-list',
        language: 'python',
        code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class MoveToFrontList:
    def __init__(self):
        self.head = None

    def search(self, key):
        prev, cur = None, self.head
        while cur is not None:
            if cur.data == key:
                if prev is not None:
                    # unlink and move to front
                    prev.next = cur.next
                    cur.next = self.head
                    self.head = cur
                return True
            prev, cur = cur, cur.next
        return False

    def insert(self, data):
        node = Node(data)
        node.next = self.head
        self.head = node`,
        explanation: 'Move-to-front self-organizing list promoting an accessed node to the head in O(1).',
        is_optimized: true,
      },
      {
        id: 'snip-self-organizing-list-js',
        topic_id: 'ext-self-organizing-list',
        language: 'javascript',
        code: `class SNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class MoveToFrontList {
  constructor() {
    this.head = null;
  }

  search(key) {
    let prev = null, cur = this.head;
    while (cur !== null) {
      if (cur.data === key) {
        if (prev !== null) {
          prev.next = cur.next;
          cur.next = this.head;
          this.head = cur;
        }
        return true;
      }
      prev = cur;
      cur = cur.next;
    }
    return false;
  }

  insert(data) {
    const node = new SNode(data);
    node.next = this.head;
    this.head = node;
  }
}`,
        explanation: 'Move-to-front linked list that splices an accessed node to the front on a hit.',
        is_optimized: true,
      },
      {
        id: 'snip-self-organizing-list-cpp',
        topic_id: 'ext-self-organizing-list',
        language: 'cpp',
        code: `#include <iostream>

struct Node {
    int data;
    Node* next = nullptr;
    Node(int d) : data(d) {}
};

class MoveToFrontList {
    Node* head = nullptr;
public:
    bool search(int key) {
        Node* prev = nullptr;
        Node* cur = head;
        while (cur) {
            if (cur->data == key) {
                if (prev) {
                    prev->next = cur->next;
                    cur->next = head;
                    head = cur;
                }
                return true;
            }
            prev = cur;
            cur = cur->next;
        }
        return false;
    }
    void insert(int data) {
        Node* node = new Node(data);
        node->next = head;
        head = node;
    }
};`,
        explanation: 'C++ move-to-front list relinking an accessed node to the head on access.',
        is_optimized: true,
      },
      {
        id: 'snip-self-organizing-list-java',
        topic_id: 'ext-self-organizing-list',
        language: 'java',
        code: `public class MoveToFrontList {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; }
    }

    private Node head;

    public boolean search(int key) {
        Node prev = null, cur = head;
        while (cur != null) {
            if (cur.data == key) {
                if (prev != null) {
                    prev.next = cur.next;
                    cur.next = head;
                    head = cur;
                }
                return true;
            }
            prev = cur;
            cur = cur.next;
        }
        return false;
    }

    public void insert(int data) {
        Node node = new Node(data);
        node.next = head;
        head = node;
    }
}`,
        explanation: 'Java move-to-front list promoting an accessed node to the head on a successful search.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-self-organizing-list',
    quizTitle: 'Self-Organizing List Quiz',
    quizDescription: 'Test your understanding of self-organizing lists and their reordering heuristics.',
    questions: [
      {
        id: 'q-self-organizing-list-1',
        quiz_id: 'quiz-ext-self-organizing-list',
        question_text: 'Under the Move-to-Front heuristic, what happens to an element when it is accessed?',
        question_type: 'MCQ',
        options: [
          'It is moved to the front (head) of the list',
          'It is swapped with the tail element',
          'Its access counter is incremented but position is unchanged',
          'It is removed from the list'
        ],
        correct_option_index: 0,
        explanation: 'Move-to-Front relocates an accessed element to the head, exploiting locality so recently used items are found quickly on subsequent searches.',
      },
      {
        id: 'q-self-organizing-list-2',
        quiz_id: 'quiz-ext-self-organizing-list',
        question_text: 'The Move-to-Front heuristic is 2-competitive, meaning its cost is within twice the optimal static ordering.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'True. A classic competitive-analysis result shows MTF total access cost is at most twice that of the best offline static arrangement.',
      },
      {
        id: 'q-self-organizing-list-3',
        quiz_id: 'quiz-ext-self-organizing-list',
        question_text: 'What is the worst-case time complexity of a search in a self-organizing list of N elements?',
        question_type: 'COMPLEXITY',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'],
        correct_option_index: 0,
        explanation: 'Searching still requires a linear scan in the worst case (the target may be at the tail or absent), so worst-case remains O(N) despite improved average cost under locality.',
      },
    ],
  },
  // ============================================================
  // 6. XOR LINKED LIST
  // ============================================================
  {
    topic: {
      id: 'ext-xor-linked-list',
      slug: 'xor-linked-list',
      category_id: CATEGORY_IDS.linear,
      title: 'XOR Linked List',
      definition: 'A memory-efficient doubly linked list that stores the bitwise XOR of the previous and next node addresses in a single pointer field per node.',
      importance: 'XOR linked lists demonstrate a clever space optimization for doubly linked lists, halving pointer storage — a useful trick in memory-constrained embedded systems and a classic interview topic.',
      prerequisites: ['doubly-linked-list', 'linked-list'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(1) Insert at ends',
      time_complexity_average: 'O(N) Traversal',
      time_complexity_worst: 'O(N) Traversal',
      space_complexity: 'O(N) with one pointer per node',
      display_order: 213,
    },
    sections: [
      {
        id: 'sec-xor-linked-list-1',
        topic_id: 'ext-xor-linked-list',
        title: 'Visual & Intuitive Explanation',
        content: `
A doubly linked list needs **two** pointers per node (\`prev\` and \`next\`). An **XOR linked list** stores just **one** value — the bitwise XOR of both neighbor addresses:

$$\\texttt{node.link} = \\texttt{addr(prev)} \\oplus \\texttt{addr(next)}$$

The magic comes from XOR's self-inverse property: $a \\oplus b \\oplus a = b$. If you arrive at a node knowing the previous address, you recover the next one:

$$\\texttt{next} = \\texttt{node.link} \\oplus \\texttt{prev}$$

> [!NOTE]
> This halves pointer memory while still allowing bidirectional traversal — but only if you always remember where you *came from*.
        `,
        display_order: 1,
      },
      {
        id: 'sec-xor-linked-list-2',
        topic_id: 'ext-xor-linked-list',
        title: 'Core Mechanics',
        content: `
Each node stores \`link = prev_addr XOR next_addr\`. The head's \`link\` is \`0 XOR next\` (since prev is null/0); the tail's is \`prev XOR 0\`.

**Forward traversal:**
1. Start with \`prev = 0\`, \`cur = head\`.
2. Compute \`next = cur.link XOR prev\`.
3. Advance: \`prev = cur\`, \`cur = next\`.

**Insertion at front:**
1. New node's \`link = 0 XOR addr(old_head)\`.
2. Update old head's link: \`old_head.link = addr(new_node) XOR (old_head.link XOR 0)\`.

Because you must always carry the previous address, you **cannot jump** to an arbitrary node and continue traversing without knowing its neighbor.
        `,
        display_order: 2,
      },
      {
        id: 'sec-xor-linked-list-3',
        topic_id: 'ext-xor-linked-list',
        title: 'Complexity & Properties',
        content: `
| Property | XOR List | Regular Doubly List |
|----------|----------|---------------------|
| Pointers per node | $1$ | $2$ |
| Forward/backward traversal | $O(N)$ | $O(N)$ |
| Random node access mid-list | not possible standalone | $O(1)$ from reference |
| Debugger friendliness | poor | good |

Space savings are exactly **one pointer per node** — a $50\\%$ reduction in link overhead.

> [!IMPORTANT]
> XOR linked lists rely on treating pointers as integers, which is **undefined behavior** in strict C/C++ and impossible in memory-safe/garbage-collected languages where object addresses aren't stable or exposed.
        `,
        display_order: 3,
      },
      {
        id: 'sec-xor-linked-list-4',
        topic_id: 'ext-xor-linked-list',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> A **garbage collector that moves objects** will invalidate stored addresses, silently corrupting the list. XOR lists only work with stable, manually managed memory.

Common pitfalls:
- **Losing the previous pointer** mid-traversal makes the rest of the list unreachable.
- **Portability**: relies on \`uintptr_t\` conversions and stable addressing.
- **Debugging difficulty**: a single \`link\` field reveals neither neighbor directly.

**Use cases:**
- **Embedded/memory-constrained systems** where every byte counts.
- **Teaching tool** for XOR properties and pointer manipulation.
- Rarely used in production due to safety and maintainability costs.
        `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-xor-linked-list-py',
        topic_id: 'ext-xor-linked-list',
        language: 'python',
        code: `class XorLinkedList:
    # Simulated with a dict mapping ids to nodes, since Python
    # hides real addresses. Each node stores link = prev_id XOR next_id.
    def __init__(self):
        self.nodes = {}
        self.head = 0
        self.tail = 0
        self._next_id = 1

    def append(self, value):
        nid = self._next_id
        self._next_id += 1
        self.nodes[nid] = {'value': value, 'link': 0}
        if self.head == 0:
            self.head = self.tail = nid
        else:
            # new node link = old_tail XOR 0
            self.nodes[nid]['link'] = self.tail
            # update old tail: replace its 0 (next) with nid
            self.nodes[self.tail]['link'] ^= nid
            self.tail = nid

    def traverse(self):
        out = []
        prev, cur = 0, self.head
        while cur != 0:
            out.append(self.nodes[cur]['value'])
            nxt = self.nodes[cur]['link'] ^ prev
            prev, cur = cur, nxt
        return out`,
        explanation: 'XOR linked list simulated with integer ids, storing prev XOR next per node.',
        is_optimized: true,
      },
      {
        id: 'snip-xor-linked-list-js',
        topic_id: 'ext-xor-linked-list',
        language: 'javascript',
        code: `class XorLinkedList {
  // JS hides addresses, so we simulate with integer ids.
  constructor() {
    this.nodes = new Map();
    this.head = 0;
    this.tail = 0;
    this.nextId = 1;
  }

  append(value) {
    const id = this.nextId++;
    this.nodes.set(id, { value, link: 0 });
    if (this.head === 0) {
      this.head = this.tail = id;
    } else {
      this.nodes.get(id).link = this.tail;
      this.nodes.get(this.tail).link ^= id;
      this.tail = id;
    }
  }

  traverse() {
    const out = [];
    let prev = 0, cur = this.head;
    while (cur !== 0) {
      const node = this.nodes.get(cur);
      out.push(node.value);
      const next = node.link ^ prev;
      prev = cur;
      cur = next;
    }
    return out;
  }
}`,
        explanation: 'Id-simulated XOR linked list demonstrating single-field bidirectional links in JavaScript.',
        is_optimized: true,
      },
      {
        id: 'snip-xor-linked-list-cpp',
        topic_id: 'ext-xor-linked-list',
        language: 'cpp',
        code: `#include <cstdint>
#include <iostream>

struct Node {
    int value;
    Node* link;  // prev XOR next
    Node(int v) : value(v), link(nullptr) {}
};

inline Node* XOR(Node* a, Node* b) {
    return reinterpret_cast<Node*>(
        reinterpret_cast<uintptr_t>(a) ^ reinterpret_cast<uintptr_t>(b));
}

class XorList {
    Node* head = nullptr;
    Node* tail = nullptr;
public:
    void append(int value) {
        Node* node = new Node(value);
        if (!head) {
            head = tail = node;
        } else {
            node->link = tail;              // prev XOR 0
            tail->link = XOR(tail->link, node);
            tail = node;
        }
    }
    void traverse() {
        Node* prev = nullptr;
        Node* cur = head;
        while (cur) {
            std::cout << cur->value << ' ';
            Node* next = XOR(prev, cur->link);
            prev = cur;
            cur = next;
        }
        std::cout << '\\n';
    }
};`,
        explanation: 'Genuine XOR linked list in C++ using uintptr_t casts to fold prev and next into one pointer.',
        is_optimized: true,
      },
      {
        id: 'snip-xor-linked-list-java',
        topic_id: 'ext-xor-linked-list',
        language: 'java',
        code: `import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

// Java has no raw addresses, so ids simulate pointers.
public class XorLinkedList {
    private final Map<Integer, int[]> nodes = new HashMap<>(); // id -> {value, link}
    private int head = 0, tail = 0, nextId = 1;

    public void append(int value) {
        int id = nextId++;
        nodes.put(id, new int[]{value, 0});
        if (head == 0) {
            head = tail = id;
        } else {
            nodes.get(id)[1] = tail;
            nodes.get(tail)[1] ^= id;
            tail = id;
        }
    }

    public List<Integer> traverse() {
        List<Integer> out = new ArrayList<>();
        int prev = 0, cur = head;
        while (cur != 0) {
            int[] node = nodes.get(cur);
            out.add(node[0]);
            int next = node[1] ^ prev;
            prev = cur;
            cur = next;
        }
        return out;
    }
}`,
        explanation: 'Id-based XOR linked list in Java, folding prev XOR next into a single integer field.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-xor-linked-list',
    quizTitle: 'XOR Linked List Quiz',
    quizDescription: 'Test your understanding of XOR linked lists and their pointer-folding trick.',
    questions: [
      {
        id: 'q-xor-linked-list-1',
        quiz_id: 'quiz-ext-xor-linked-list',
        question_text: 'What does each node store in an XOR linked list?',
        question_type: 'MCQ',
        options: [
          'The bitwise XOR of the previous and next node addresses',
          'Two separate pointers to prev and next',
          'The sum of prev and next addresses',
          'Only the next pointer'
        ],
        correct_option_index: 0,
        explanation: 'Each node stores prev_addr XOR next_addr in a single field, halving pointer storage while still allowing bidirectional traversal.',
      },
      {
        id: 'q-xor-linked-list-2',
        quiz_id: 'quiz-ext-xor-linked-list',
        question_text: 'An XOR linked list works reliably in a language with a moving (compacting) garbage collector.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'False. A moving GC relocates objects, invalidating the stored integer addresses and corrupting the XOR links. It requires stable, manually managed memory.',
      },
      {
        id: 'q-xor-linked-list-3',
        quiz_id: 'quiz-ext-xor-linked-list',
        question_text: 'During forward traversal, how do you compute the address of the next node?',
        question_type: 'MCQ',
        options: [
          'next = current.link XOR prev',
          'next = current.link + prev',
          'next = current.link AND prev',
          'next = current.link (directly)'
        ],
        correct_option_index: 0,
        explanation: 'Using XOR self-inverse property, next = link XOR prev recovers the next address because link = prev XOR next.',
      },
    ],
  },
  // ============================================================
  // 7. DYNAMIC ARRAY ALLOCATION
  // ============================================================
  {
    topic: {
      id: 'ext-dynamic-array-allocation',
      slug: 'dynamic-array-allocation',
      category_id: CATEGORY_IDS.linear,
      title: 'Dynamic Array Allocation',
      definition: 'A resizable array that grows (and sometimes shrinks) its underlying fixed-size buffer automatically, typically by doubling capacity, to provide amortized O(1) appends.',
      importance: 'Dynamic arrays back Python lists, C++ std::vector, Java ArrayList, and Go slices — the default sequential container in nearly every language, making their growth strategy fundamental.',
      prerequisites: ['array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) Append (no resize)',
      time_complexity_average: 'O(1) Amortized append',
      time_complexity_worst: 'O(N) Append triggering a resize',
      space_complexity: 'O(N)',
      display_order: 214,
    },
    sections: [
      {
        id: 'sec-dynamic-array-allocation-1',
        topic_id: 'ext-dynamic-array-allocation',
        title: 'Visual & Intuitive Explanation',
        content: `
A raw array has a **fixed size** chosen at creation. But we rarely know how many elements we'll need. A **dynamic array** wraps a fixed buffer and transparently swaps in a larger one when it fills up.

$$\\text{capacity: } 4 \\to 8 \\to 16 \\to 32 \\ (\\text{doubling on overflow})$$

When appending to a full buffer, the array allocates a bigger block (usually $2\\times$), **copies** existing elements over, and frees the old block.

> [!NOTE]
> Copying seems expensive, but because it happens **rarely** (only at power-of-two boundaries), the cost spread across all appends is constant — this is **amortized analysis** in action.
        `,
        display_order: 1,
      },
      {
        id: 'sec-dynamic-array-allocation-2',
        topic_id: 'ext-dynamic-array-allocation',
        title: 'Core Mechanics',
        content: `
The structure tracks two numbers: **size** (elements in use) and **capacity** (allocated slots).

**Append:**
1. If \`size < capacity\`, write at \`data[size]\` and increment \`size\`.
2. If \`size == capacity\`, allocate a new buffer of \`capacity * growth_factor\`, copy all elements, free the old buffer, then write.

**Shrinking (optional):** When \`size\` falls below \`capacity / 4\`, halve the capacity. Using $1/4$ rather than $1/2$ as the threshold prevents **thrashing** — repeated grow/shrink cycles at the boundary.

The **growth factor** is typically $2$ (Java, Python-ish) or $1.5$ (C++ MSVC), trading memory slack against copy frequency.
        `,
        display_order: 2,
      },
      {
        id: 'sec-dynamic-array-allocation-3',
        topic_id: 'ext-dynamic-array-allocation',
        title: 'Complexity & Properties',
        content: `
| Operation | Complexity |
|-----------|-----------|
| Index access | $O(1)$ |
| Append (amortized) | $O(1)$ |
| Append (single worst case) | $O(N)$ |
| Insert/delete at middle | $O(N)$ |

**Amortized proof (doubling):** growing from $1$ to $N$ costs $1 + 2 + 4 + \\dots + N < 2N$ copies total across $N$ appends, so each append averages $O(1)$.

> [!IMPORTANT]
> A growth factor of exactly $2$ prevents reusing previously freed blocks (the new size always exceeds the sum of all prior blocks). Factors like $1.5$ or the golden ratio can be more memory-friendly for some allocators.
        `,
        display_order: 3,
      },
      {
        id: 'sec-dynamic-array-allocation-4',
        topic_id: 'ext-dynamic-array-allocation',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> Appending in a tight loop without reserving capacity in advance still triggers $O(\\log N)$ reallocations. If the final size is known, **pre-reserve** to avoid repeated copies.

Common pitfalls:
- **Dangling references/iterators**: a resize moves the buffer, invalidating any pointer into the old block (a classic C++ \`vector\` bug).
- **Shrink thrashing**: halving at $capacity/2$ instead of $capacity/4$ causes oscillation.
- **Assuming O(1) worst case**: a single append can still cost $O(N)$ when it triggers a resize.

**Use cases:**
- Backing store for **list/vector/ArrayList/slice** types.
- **Buffers** for I/O and string building.
- Any sequence with unknown final length.
        `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-dynamic-array-allocation-py',
        topic_id: 'ext-dynamic-array-allocation',
        language: 'python',
        code: `class DynamicArray:
    def __init__(self):
        self._capacity = 1
        self._size = 0
        self._data = [None] * self._capacity

    def _resize(self, new_cap):
        new_data = [None] * new_cap
        for i in range(self._size):
            new_data[i] = self._data[i]
        self._data = new_data
        self._capacity = new_cap

    def append(self, value):
        if self._size == self._capacity:
            self._resize(2 * self._capacity)
        self._data[self._size] = value
        self._size += 1

    def get(self, i):
        if not 0 <= i < self._size:
            raise IndexError('out of range')
        return self._data[i]

    def __len__(self):
        return self._size`,
        explanation: 'Dynamic array doubling its buffer on overflow for amortized O(1) appends.',
        is_optimized: true,
      },
      {
        id: 'snip-dynamic-array-allocation-js',
        topic_id: 'ext-dynamic-array-allocation',
        language: 'javascript',
        code: `class DynamicArray {
  constructor() {
    this.capacity = 1;
    this.size = 0;
    this.data = new Array(this.capacity);
  }

  resize(newCap) {
    const newData = new Array(newCap);
    for (let i = 0; i < this.size; i++) newData[i] = this.data[i];
    this.data = newData;
    this.capacity = newCap;
  }

  push(value) {
    if (this.size === this.capacity) this.resize(2 * this.capacity);
    this.data[this.size++] = value;
  }

  get(i) {
    if (i < 0 || i >= this.size) throw new RangeError('out of range');
    return this.data[i];
  }
}`,
        explanation: 'JavaScript dynamic array with explicit capacity doubling and bounds checking.',
        is_optimized: true,
      },
      {
        id: 'snip-dynamic-array-allocation-cpp',
        topic_id: 'ext-dynamic-array-allocation',
        language: 'cpp',
        code: `#include <cstddef>

template <typename T>
class DynamicArray {
    T* data;
    size_t sz;
    size_t cap;

    void resize(size_t newCap) {
        T* newData = new T[newCap];
        for (size_t i = 0; i < sz; i++) newData[i] = data[i];
        delete[] data;
        data = newData;
        cap = newCap;
    }
public:
    DynamicArray() : data(new T[1]), sz(0), cap(1) {}
    ~DynamicArray() { delete[] data; }

    void push_back(const T& value) {
        if (sz == cap) resize(2 * cap);
        data[sz++] = value;
    }

    T& operator[](size_t i) { return data[i]; }
    size_t size() const { return sz; }
};`,
        explanation: 'Templated C++ dynamic array mirroring std::vector growth with manual memory management.',
        is_optimized: true,
      },
      {
        id: 'snip-dynamic-array-allocation-java',
        topic_id: 'ext-dynamic-array-allocation',
        language: 'java',
        code: `import java.util.Arrays;

public class DynamicArray {
    private Object[] data;
    private int size;
    private int capacity;

    public DynamicArray() {
        capacity = 1;
        size = 0;
        data = new Object[capacity];
    }

    private void resize(int newCap) {
        data = Arrays.copyOf(data, newCap);
        capacity = newCap;
    }

    public void add(Object value) {
        if (size == capacity) resize(2 * capacity);
        data[size++] = value;
    }

    public Object get(int i) {
        if (i < 0 || i >= size) throw new IndexOutOfBoundsException();
        return data[i];
    }

    public int size() { return size; }
}`,
        explanation: 'Java dynamic array replicating ArrayList doubling strategy with Arrays.copyOf.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-dynamic-array-allocation',
    quizTitle: 'Dynamic Array Allocation Quiz',
    quizDescription: 'Test your understanding of dynamic array resizing, amortized cost, and growth strategies.',
    questions: [
      {
        id: 'q-dynamic-array-allocation-1',
        quiz_id: 'quiz-ext-dynamic-array-allocation',
        question_text: 'Why is the amortized cost of appending to a doubling dynamic array O(1) despite occasional O(N) resizes?',
        question_type: 'MCQ',
        options: [
          'Total copy work across N appends is bounded by ~2N, averaging O(1) per append',
          'Resizes never actually copy elements',
          'The array pre-allocates infinite space',
          'Each append copies exactly one element'
        ],
        correct_option_index: 0,
        explanation: 'Doubling means total copies are 1+2+4+...+N < 2N across N appends, so the average (amortized) cost per append is O(1).',
      },
      {
        id: 'q-dynamic-array-allocation-2',
        quiz_id: 'quiz-ext-dynamic-array-allocation',
        question_text: 'Shrinking a dynamic array when size drops below capacity/4 (rather than capacity/2) helps avoid grow/shrink thrashing.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'True. A capacity/4 shrink threshold leaves hysteresis between the grow and shrink boundaries, preventing repeated oscillation at a single size.',
      },
      {
        id: 'q-dynamic-array-allocation-3',
        quiz_id: 'quiz-ext-dynamic-array-allocation',
        question_text: 'What is the worst-case time complexity of a single append operation on a dynamic array?',
        question_type: 'COMPLEXITY',
        options: ['O(N)', 'O(1)', 'O(log N)', 'O(N log N)'],
        correct_option_index: 0,
        explanation: 'A single append that triggers a resize must copy all N existing elements to the new buffer, costing O(N), even though the amortized cost is O(1).',
      },
    ],
  },
  // ============================================================
  // 8. RING BUFFER
  // ============================================================
  {
    topic: {
      id: 'ext-ring-buffer',
      slug: 'ring-buffer',
      category_id: CATEGORY_IDS.linear,
      title: 'Ring Buffer',
      definition: 'A fixed-size circular queue that reuses a single contiguous buffer by wrapping head and tail indices around the ends using modular arithmetic.',
      importance: 'Ring buffers deliver lock-free, allocation-free FIFO queues for audio/video streaming, network packet handling, embedded systems, and producer-consumer pipelines.',
      prerequisites: ['queue', 'array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) Enqueue and dequeue',
      time_complexity_average: 'O(1) Enqueue and dequeue',
      time_complexity_worst: 'O(1) Enqueue and dequeue',
      space_complexity: 'O(N) fixed capacity',
      display_order: 215,
    },
    sections: [
      {
        id: 'sec-ring-buffer-1',
        topic_id: 'ext-ring-buffer',
        title: 'Visual & Intuitive Explanation',
        content: `
Picture a circular clock face with slots instead of hours. A **write** hand and a **read** hand chase each other around the ring. When either hand passes slot 11, it wraps back to slot 0 — no shifting, no reallocation.

$$\\text{index}_{\\text{next}} = (\\text{index} + 1) \\bmod \\text{capacity}$$

A ring buffer is a queue laid over a **fixed array**, using two indices (\`head\` for reads, \`tail\` for writes) that wrap around.

> [!NOTE]
> Because it never allocates after construction, a ring buffer offers predictable, constant-time operations — ideal for real-time and embedded contexts where allocation is forbidden.
        `,
        display_order: 1,
      },
      {
        id: 'sec-ring-buffer-2',
        topic_id: 'ext-ring-buffer',
        title: 'Core Mechanics',
        content: `
Keep \`head\`, \`tail\`, and a \`count\` (or a sacrificed slot) to distinguish full from empty.

**Enqueue:**
1. If full, either reject or overwrite the oldest element.
2. Write at \`buffer[tail]\`, then \`tail = (tail + 1) % capacity\`.

**Dequeue:**
1. If empty, return nothing.
2. Read \`buffer[head]\`, then \`head = (head + 1) % capacity\`.

**Full vs empty ambiguity:** when \`head == tail\` the buffer could be full *or* empty. Two fixes: (a) keep an explicit \`count\`, or (b) leave one slot always unused so \`full\` means \`(tail + 1) % capacity == head\`.

If capacity is a power of two, replace \`% capacity\` with a fast bitmask \`& (capacity - 1)\`.
        `,
        display_order: 2,
      },
      {
        id: 'sec-ring-buffer-3',
        topic_id: 'ext-ring-buffer',
        title: 'Complexity & Properties',
        content: `
| Operation | Complexity |
|-----------|-----------|
| Enqueue | $O(1)$ |
| Dequeue | $O(1)$ |
| Peek | $O(1)$ |
| Space | $O(\\text{capacity})$ fixed |

Every operation is **strictly** $O(1)$ — no amortization, no resizing. This gives ring buffers deterministic latency, which is why real-time systems favor them.

> [!IMPORTANT]
> A **single-producer, single-consumer** ring buffer can be made **lock-free**: the producer only writes \`tail\` and the consumer only writes \`head\`, so with proper memory barriers no mutex is needed.
        `,
        display_order: 3,
      },
      {
        id: 'sec-ring-buffer-4',
        topic_id: 'ext-ring-buffer',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> The most common bug is mishandling the **full-versus-empty** case when \`head == tail\`. Always track a count or reserve a sentinel slot.

Common pitfalls:
- **Overwrite policy confusion**: decide up front whether a full buffer rejects writes or overwrites the oldest data.
- **Non-power-of-two with bitmask**: the \`& (capacity - 1)\` trick only works when capacity is a power of two.
- **Concurrency without barriers**: lock-free correctness requires proper memory ordering.

**Use cases:**
- **Audio/video streaming** and DSP pipelines.
- **Network packet** and **serial I/O** buffers.
- **Logging** with bounded history (keep the last N entries).
- **Producer-consumer** queues in embedded firmware.
        `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-ring-buffer-py',
        topic_id: 'ext-ring-buffer',
        language: 'python',
        code: `class RingBuffer:
    def __init__(self, capacity):
        self.capacity = capacity
        self.buffer = [None] * capacity
        self.head = 0
        self.tail = 0
        self.count = 0

    def is_full(self):
        return self.count == self.capacity

    def is_empty(self):
        return self.count == 0

    def enqueue(self, value):
        if self.is_full():
            raise OverflowError('ring buffer is full')
        self.buffer[self.tail] = value
        self.tail = (self.tail + 1) % self.capacity
        self.count += 1

    def dequeue(self):
        if self.is_empty():
            raise IndexError('ring buffer is empty')
        value = self.buffer[self.head]
        self.head = (self.head + 1) % self.capacity
        self.count -= 1
        return value`,
        explanation: 'Fixed-capacity ring buffer with O(1) enqueue and dequeue using modular indices.',
        is_optimized: true,
      },
      {
        id: 'snip-ring-buffer-js',
        topic_id: 'ext-ring-buffer',
        language: 'javascript',
        code: `class RingBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  isFull() {
    return this.count === this.capacity;
  }

  isEmpty() {
    return this.count === 0;
  }

  enqueue(value) {
    if (this.isFull()) throw new Error('ring buffer is full');
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) throw new Error('ring buffer is empty');
    const value = this.buffer[this.head];
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return value;
  }
}`,
        explanation: 'JavaScript ring buffer tracking an explicit count to disambiguate full and empty states.',
        is_optimized: true,
      },
      {
        id: 'snip-ring-buffer-cpp',
        topic_id: 'ext-ring-buffer',
        language: 'cpp',
        code: `#include <vector>
#include <stdexcept>

template <typename T>
class RingBuffer {
    std::vector<T> buffer;
    size_t head = 0, tail = 0, count = 0, capacity;
public:
    explicit RingBuffer(size_t cap) : buffer(cap), capacity(cap) {}

    bool isFull() const { return count == capacity; }
    bool isEmpty() const { return count == 0; }

    void enqueue(const T& value) {
        if (isFull()) throw std::overflow_error("ring buffer is full");
        buffer[tail] = value;
        tail = (tail + 1) % capacity;
        ++count;
    }

    T dequeue() {
        if (isEmpty()) throw std::underflow_error("ring buffer is empty");
        T value = buffer[head];
        head = (head + 1) % capacity;
        --count;
        return value;
    }
};`,
        explanation: 'Templated C++ ring buffer over std::vector with modular wraparound indices.',
        is_optimized: true,
      },
      {
        id: 'snip-ring-buffer-java',
        topic_id: 'ext-ring-buffer',
        language: 'java',
        code: `public class RingBuffer<T> {
    private final Object[] buffer;
    private final int capacity;
    private int head = 0, tail = 0, count = 0;

    public RingBuffer(int capacity) {
        this.capacity = capacity;
        this.buffer = new Object[capacity];
    }

    public boolean isFull() { return count == capacity; }
    public boolean isEmpty() { return count == 0; }

    public void enqueue(T value) {
        if (isFull()) throw new IllegalStateException("ring buffer is full");
        buffer[tail] = value;
        tail = (tail + 1) % capacity;
        count++;
    }

    @SuppressWarnings("unchecked")
    public T dequeue() {
        if (isEmpty()) throw new IllegalStateException("ring buffer is empty");
        T value = (T) buffer[head];
        head = (head + 1) % capacity;
        count--;
        return value;
    }
}`,
        explanation: 'Generic Java ring buffer using an Object array and modular head/tail indices.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-ring-buffer',
    quizTitle: 'Ring Buffer Quiz',
    quizDescription: 'Test your understanding of circular buffers, index wraparound, and their real-time use cases.',
    questions: [
      {
        id: 'q-ring-buffer-1',
        quiz_id: 'quiz-ext-ring-buffer',
        question_text: 'How does a ring buffer advance its tail index after an enqueue when capacity is C?',
        question_type: 'MCQ',
        options: [
          'tail = (tail + 1) % C',
          'tail = tail + 1 (unbounded)',
          'tail = tail * 2',
          'tail = C - tail'
        ],
        correct_option_index: 0,
        explanation: 'Modular arithmetic (tail + 1) % C wraps the index back to 0 after the last slot, reusing the fixed buffer without shifting elements.',
      },
      {
        id: 'q-ring-buffer-2',
        quiz_id: 'quiz-ext-ring-buffer',
        question_text: 'A single-producer, single-consumer ring buffer can be implemented lock-free with proper memory barriers.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'True. The producer writes only the tail index and the consumer writes only the head index, so with correct memory ordering no mutex is required.',
      },
      {
        id: 'q-ring-buffer-3',
        quiz_id: 'quiz-ext-ring-buffer',
        question_text: 'What is the time complexity of enqueue and dequeue operations in a ring buffer?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N) amortized'],
        correct_option_index: 0,
        explanation: 'Both operations update one index and one slot with no shifting or resizing, giving strict (non-amortized) O(1) time.',
      },
    ],
  },
];
