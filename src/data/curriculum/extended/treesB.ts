import { CurriculumModule } from '@/types';
import { CATEGORY_IDS } from '../linear';

export const treesBModules: CurriculumModule[] = [
  // 1. QUAD TREE
  {
    topic: {
      id: 'ext-quad-tree',
      slug: 'quad-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Quad Tree',
      definition: 'A quad tree is a tree data structure in which each internal node has exactly four children, used to recursively partition a two-dimensional space into four quadrants.',
      importance: 'Quad trees power spatial indexing in image compression, collision detection, geographic information systems, and mesh generation by making 2D range and neighbor queries efficient.',
      prerequisites: ['binary-tree', 'recursion'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(\\log n)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(n)',
      display_order: 311,
    },
    sections: [
      {
        id: 'sec-quad-tree-1',
        topic_id: 'ext-quad-tree',
        title: 'Concept & Intuition',
        content: `A **quad tree** answers a spatial question: *given a 2D region full of points or pixels, how do we organize them so nearby things are easy to find?* The trick is **recursive subdivision**. Start with one square covering everything. Whenever a square holds too much detail, split it into four equal quadrants — usually labelled **NW, NE, SW, SE**.

Think of zooming into a map. The whole world is one tile. Zoom in and it becomes four tiles; zoom again and each of those becomes four more. Empty ocean stays as one big tile, while a dense city subdivides deeply. That adaptive resolution is the quad tree's superpower.

> [!NOTE]
> A quad tree is the 2D cousin of the 1D binary search tree and the 3D **octree** (eight children). The dimensionality just changes the branching factor: $2^d$ children for $d$ dimensions.`,
        display_order: 1,
      },
      {
        id: 'sec-quad-tree-2',
        topic_id: 'ext-quad-tree',
        title: 'How It Works',
        content: `Each node stores a **bounding box** and up to a fixed **capacity** of items. Insertion works like this:

1. If the point is outside the node's box, reject it.
2. If the node has room and no children, store the point.
3. Otherwise **subdivide** into four children and push existing points down, then insert into the matching quadrant.

A range query prunes aggressively: if the query rectangle does not intersect a node's box, that entire subtree is skipped. This is why searches cost about $O(\\log n)$ for well-distributed data — each level discards roughly three-quarters of the space.

The depth of a balanced quad tree over $n$ points is about $\\log_4 n$, giving logarithmic query paths.`,
        display_order: 2,
      },
      {
        id: 'sec-quad-tree-3',
        topic_id: 'ext-quad-tree',
        title: 'Complexity Analysis',
        content: `For uniformly distributed points:

- **Insert / search:** $O(\\log n)$ average, since the tree depth is $\\approx \\log_4 n$.
- **Range query:** $O(\\log n + k)$ where $k$ is the number of reported items.
- **Space:** $O(n)$ nodes for $n$ points.

The **worst case is $O(n)$** per operation. If many points share nearly identical coordinates, the tree degenerates into a long chain of subdivisions that never separate the clustered points, exploding the depth.`,
        display_order: 3,
      },
      {
        id: 'sec-quad-tree-4',
        topic_id: 'ext-quad-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Duplicate or tightly clustered points can force infinite subdivision. Always cap the maximum depth or allow a node to store multiple coincident points once a depth limit is hit.

Common mistakes:
- Forgetting to redistribute existing points into children when subdividing.
- Using floating-point boundaries without an epsilon, causing points to fall between quadrants.
- Rebuilding on every insert instead of subdividing lazily.

**Where quad trees shine:** image compression (uniform color regions collapse to one node), collision detection in games, spatial databases, and level-of-detail terrain rendering.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-quad-tree-py',
        topic_id: 'ext-quad-tree',
        language: 'python',
        is_optimized: true,
        code: `class QuadTree:
    def __init__(self, x, y, w, h, capacity=4):
        self.x, self.y, self.w, self.h = x, y, w, h
        self.capacity = capacity
        self.points = []
        self.divided = False

    def _contains(self, px, py):
        return (self.x <= px < self.x + self.w and
                self.y <= py < self.y + self.h)

    def subdivide(self):
        hw, hh = self.w / 2, self.h / 2
        self.nw = QuadTree(self.x, self.y, hw, hh, self.capacity)
        self.ne = QuadTree(self.x + hw, self.y, hw, hh, self.capacity)
        self.sw = QuadTree(self.x, self.y + hh, hw, hh, self.capacity)
        self.se = QuadTree(self.x + hw, self.y + hh, hw, hh, self.capacity)
        self.divided = True

    def insert(self, px, py):
        if not self._contains(px, py):
            return False
        if len(self.points) < self.capacity and not self.divided:
            self.points.append((px, py))
            return True
        if not self.divided:
            self.subdivide()
        return (self.nw.insert(px, py) or self.ne.insert(px, py) or
                self.sw.insert(px, py) or self.se.insert(px, py))`,
        explanation: 'A capacity-bounded quad tree that lazily subdivides into four quadrants when a node overflows.',
      },
      {
        id: 'snip-quad-tree-js',
        topic_id: 'ext-quad-tree',
        language: 'javascript',
        is_optimized: true,
        code: `class QuadTree {
  constructor(x, y, w, h, capacity = 4) {
    Object.assign(this, { x, y, w, h, capacity });
    this.points = [];
    this.divided = false;
  }

  contains(px, py) {
    return px >= this.x && px < this.x + this.w &&
           py >= this.y && py < this.y + this.h;
  }

  subdivide() {
    const hw = this.w / 2, hh = this.h / 2;
    this.nw = new QuadTree(this.x, this.y, hw, hh, this.capacity);
    this.ne = new QuadTree(this.x + hw, this.y, hw, hh, this.capacity);
    this.sw = new QuadTree(this.x, this.y + hh, hw, hh, this.capacity);
    this.se = new QuadTree(this.x + hw, this.y + hh, hw, hh, this.capacity);
    this.divided = true;
  }

  insert(px, py) {
    if (!this.contains(px, py)) return false;
    if (this.points.length < this.capacity && !this.divided) {
      this.points.push([px, py]);
      return true;
    }
    if (!this.divided) this.subdivide();
    return this.nw.insert(px, py) || this.ne.insert(px, py) ||
           this.sw.insert(px, py) || this.se.insert(px, py);
  }
}`,
        explanation: 'The four quadrant references are created only on demand, keeping empty regions cheap.',
      },
      {
        id: 'snip-quad-tree-cpp',
        topic_id: 'ext-quad-tree',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <memory>

struct QuadTree {
    double x, y, w, h;
    int capacity;
    std::vector<std::pair<double,double>> points;
    bool divided = false;
    std::unique_ptr<QuadTree> nw, ne, sw, se;

    QuadTree(double x, double y, double w, double h, int cap = 4)
        : x(x), y(y), w(w), h(h), capacity(cap) {}

    bool contains(double px, double py) const {
        return px >= x && px < x + w && py >= y && py < y + h;
    }

    void subdivide() {
        double hw = w / 2, hh = h / 2;
        nw = std::make_unique<QuadTree>(x, y, hw, hh, capacity);
        ne = std::make_unique<QuadTree>(x + hw, y, hw, hh, capacity);
        sw = std::make_unique<QuadTree>(x, y + hh, hw, hh, capacity);
        se = std::make_unique<QuadTree>(x + hw, y + hh, hw, hh, capacity);
        divided = true;
    }

    bool insert(double px, double py) {
        if (!contains(px, py)) return false;
        if ((int)points.size() < capacity && !divided) {
            points.push_back({px, py});
            return true;
        }
        if (!divided) subdivide();
        return nw->insert(px, py) || ne->insert(px, py) ||
               sw->insert(px, py) || se->insert(px, py);
    }
};`,
        explanation: 'Uses unique_ptr so child quadrants are automatically freed with the tree.',
      },
      {
        id: 'snip-quad-tree-java',
        topic_id: 'ext-quad-tree',
        language: 'java',
        is_optimized: true,
        code: `import java.util.ArrayList;
import java.util.List;

class QuadTree {
    double x, y, w, h;
    int capacity;
    List<double[]> points = new ArrayList<>();
    boolean divided = false;
    QuadTree nw, ne, sw, se;

    QuadTree(double x, double y, double w, double h, int capacity) {
        this.x = x; this.y = y; this.w = w; this.h = h;
        this.capacity = capacity;
    }

    boolean contains(double px, double py) {
        return px >= x && px < x + w && py >= y && py < y + h;
    }

    void subdivide() {
        double hw = w / 2, hh = h / 2;
        nw = new QuadTree(x, y, hw, hh, capacity);
        ne = new QuadTree(x + hw, y, hw, hh, capacity);
        sw = new QuadTree(x, y + hh, hw, hh, capacity);
        se = new QuadTree(x + hw, y + hh, hw, hh, capacity);
        divided = true;
    }

    boolean insert(double px, double py) {
        if (!contains(px, py)) return false;
        if (points.size() < capacity && !divided) {
            points.add(new double[]{px, py});
            return true;
        }
        if (!divided) subdivide();
        return nw.insert(px, py) || ne.insert(px, py) ||
               sw.insert(px, py) || se.insert(px, py);
    }
}`,
        explanation: 'Idiomatic Java quad tree with lazy subdivision and a configurable node capacity.',
      },
    ],
    quizId: 'quiz-ext-quad-tree',
    quizTitle: 'Quad Tree Quiz',
    quizDescription: 'Test your understanding of 2D spatial partitioning with quad trees.',
    questions: [
      {
        id: 'q-quad-tree-1',
        quiz_id: 'quiz-ext-quad-tree',
        question_text: 'How many children does each internal node of a quad tree have?',
        question_type: 'MCQ',
        options: ['2', '3', '4', '8'],
        correct_option_index: 2,
        explanation: 'A quad tree subdivides 2D space into four quadrants (NW, NE, SW, SE), so each internal node has four children.',
      },
      {
        id: 'q-quad-tree-2',
        quiz_id: 'quiz-ext-quad-tree',
        question_text: 'What is the average-case time complexity of searching a well-distributed quad tree with n points?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(\\log n)', 'O(n)', 'O(n^2)'],
        correct_option_index: 1,
        explanation: 'For uniformly distributed data the tree depth is about log4 n, so search is O(log n) on average.',
      },
      {
        id: 'q-quad-tree-3',
        quiz_id: 'quiz-ext-quad-tree',
        question_text: 'Clustering many points at nearly identical coordinates can degrade a quad tree, potentially forcing excessive subdivision.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Coincident points never separate across quadrants, so the tree can subdivide indefinitely unless a max depth is enforced.',
      },
    ],
  },
  // 2. INTERVAL TREE
  {
    topic: {
      id: 'ext-interval-tree',
      slug: 'interval-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Interval Tree',
      definition: 'An interval tree is an augmented balanced binary search tree that stores intervals and supports efficient queries for all intervals overlapping a given point or interval.',
      importance: 'Interval trees solve overlap-detection problems that appear in scheduling, computational geometry, genomics, and windowing systems, turning naive O(n) scans into logarithmic queries.',
      prerequisites: ['binary-search-tree', 'self-balancing-bst'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(\\log n)',
      time_complexity_average: 'O(\\log n)',
      time_complexity_worst: 'O(\\log n)',
      space_complexity: 'O(n)',
      display_order: 312,
    },
    sections: [
      {
        id: 'sec-interval-tree-1',
        topic_id: 'ext-interval-tree',
        title: 'Concept & Intuition',
        content: `An **interval tree** answers questions like *"which meetings overlap 2 p.m.?"* without scanning every meeting. Each node stores an interval $[low, high]$, and the tree is keyed on the **low endpoint** like an ordinary BST.

The clever part is **augmentation**: every node also records the **maximum high endpoint** anywhere in its subtree. That single extra value lets a search decide, at each node, whether an overlapping interval could possibly live in the left subtree — pruning half the work.

> [!NOTE]
> The tree is ordered by low endpoints, but the augmented \`max\` value is what makes overlap queries fast. Without it, you would have to inspect every node.`,
        display_order: 1,
      },
      {
        id: 'sec-interval-tree-2',
        topic_id: 'ext-interval-tree',
        title: 'How It Works',
        content: `To find any interval overlapping a query $[qlow, qhigh]$, start at the root and repeat:

1. If the current node's interval overlaps the query, return it.
2. If the **left child exists and its subtree \`max\` $\\ge qlow$**, an overlap may lie left — go left.
3. Otherwise go right.

Two intervals $[a, b]$ and $[c, d]$ overlap exactly when $a \\le d$ **and** $c \\le b$. The \`max\` field guarantees we never descend into a subtree that cannot contain an overlap, so a single-overlap query costs $O(\\log n)$ on a balanced tree.

Insertions update the \`max\` field on the way down and rebalance (often via a red-black tree) on the way up.`,
        display_order: 2,
      },
      {
        id: 'sec-interval-tree-3',
        topic_id: 'ext-interval-tree',
        title: 'Complexity Analysis',
        content: `Backing the structure with a balanced BST (red-black or AVL) gives:

- **Insert / delete:** $O(\\log n)$, including \`max\` maintenance.
- **Single overlap query:** $O(\\log n)$.
- **Report all $k$ overlaps:** $O(k \\log n)$.
- **Space:** $O(n)$.

Because the tree is height-balanced, these bounds hold in the worst case, not just on average — a key advantage over an unbalanced interval BST, which can degrade to $O(n)$.`,
        display_order: 3,
      },
      {
        id: 'sec-interval-tree-4',
        topic_id: 'ext-interval-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The \`max\` field must be recomputed after every rotation and deletion. A stale \`max\` silently breaks queries by pruning subtrees that actually contain overlaps.

Common mistakes:
- Using strict inequalities and missing intervals that merely touch at an endpoint.
- Forgetting to update \`max\` along the entire insertion path.
- Confusing "overlap" with "containment" — they are different queries.

**Where interval trees shine:** calendar and meeting-room scheduling, detecting overlapping genomic features, windowing in graphics, and network packet classification.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-interval-tree-py',
        topic_id: 'ext-interval-tree',
        language: 'python',
        is_optimized: true,
        code: `class Node:
    def __init__(self, low, high):
        self.low, self.high = low, high
        self.max = high
        self.left = self.right = None

class IntervalTree:
    def __init__(self):
        self.root = None

    def insert(self, low, high):
        self.root = self._insert(self.root, low, high)

    def _insert(self, node, low, high):
        if node is None:
            return Node(low, high)
        if low < node.low:
            node.left = self._insert(node.left, low, high)
        else:
            node.right = self._insert(node.right, low, high)
        node.max = max(node.max, high)
        return node

    def search_overlap(self, qlow, qhigh):
        node = self.root
        while node is not None:
            if node.low <= qhigh and qlow <= node.high:
                return (node.low, node.high)
            if node.left is not None and node.left.max >= qlow:
                node = node.left
            else:
                node = node.right
        return None`,
        explanation: 'Each node caches the subtree maximum high endpoint so overlap search prunes to O(log n) on a balanced tree.',
      },
      {
        id: 'snip-interval-tree-js',
        topic_id: 'ext-interval-tree',
        language: 'javascript',
        is_optimized: true,
        code: `class Node {
  constructor(low, high) {
    this.low = low;
    this.high = high;
    this.max = high;
    this.left = this.right = null;
  }
}

class IntervalTree {
  constructor() { this.root = null; }

  insert(low, high) {
    this.root = this._insert(this.root, low, high);
  }

  _insert(node, low, high) {
    if (node === null) return new Node(low, high);
    if (low < node.low) node.left = this._insert(node.left, low, high);
    else node.right = this._insert(node.right, low, high);
    node.max = Math.max(node.max, high);
    return node;
  }

  searchOverlap(qlow, qhigh) {
    let node = this.root;
    while (node !== null) {
      if (node.low <= qhigh && qlow <= node.high) return [node.low, node.high];
      if (node.left !== null && node.left.max >= qlow) node = node.left;
      else node = node.right;
    }
    return null;
  }
}`,
        explanation: 'The left.max check decides in O(1) whether an overlap could exist to the left, keeping queries logarithmic.',
      },
      {
        id: 'snip-interval-tree-cpp',
        topic_id: 'ext-interval-tree',
        language: 'cpp',
        is_optimized: true,
        code: `#include <algorithm>

struct Node {
    int low, high, max;
    Node *left = nullptr, *right = nullptr;
    Node(int l, int h) : low(l), high(h), max(h) {}
};

struct IntervalTree {
    Node* root = nullptr;

    Node* insert(Node* node, int low, int high) {
        if (!node) return new Node(low, high);
        if (low < node->low) node->left = insert(node->left, low, high);
        else node->right = insert(node->right, low, high);
        node->max = std::max(node->max, high);
        return node;
    }

    void insert(int low, int high) { root = insert(root, low, high); }

    Node* searchOverlap(int qlow, int qhigh) {
        Node* node = root;
        while (node) {
            if (node->low <= qhigh && qlow <= node->high) return node;
            if (node->left && node->left->max >= qlow) node = node->left;
            else node = node->right;
        }
        return nullptr;
    }
};`,
        explanation: 'A recursive insert maintains the augmented max field while the iterative search prunes subtrees.',
      },
      {
        id: 'snip-interval-tree-java',
        topic_id: 'ext-interval-tree',
        language: 'java',
        is_optimized: true,
        code: `class IntervalTree {
    static class Node {
        int low, high, max;
        Node left, right;
        Node(int low, int high) { this.low = low; this.high = high; this.max = high; }
    }

    Node root;

    void insert(int low, int high) { root = insert(root, low, high); }

    private Node insert(Node node, int low, int high) {
        if (node == null) return new Node(low, high);
        if (low < node.low) node.left = insert(node.left, low, high);
        else node.right = insert(node.right, low, high);
        node.max = Math.max(node.max, high);
        return node;
    }

    int[] searchOverlap(int qlow, int qhigh) {
        Node node = root;
        while (node != null) {
            if (node.low <= qhigh && qlow <= node.high)
                return new int[]{node.low, node.high};
            if (node.left != null && node.left.max >= qlow) node = node.left;
            else node = node.right;
        }
        return null;
    }
}`,
        explanation: 'Standard augmented-BST interval tree returning the first interval overlapping the query range.',
      },
    ],
    quizId: 'quiz-ext-interval-tree',
    quizTitle: 'Interval Tree Quiz',
    quizDescription: 'Test your understanding of augmented BSTs for overlap queries.',
    questions: [
      {
        id: 'q-interval-tree-1',
        quiz_id: 'quiz-ext-interval-tree',
        question_text: 'What extra value does each interval tree node store to accelerate overlap queries?',
        question_type: 'MCQ',
        options: ['The count of nodes in its subtree', 'The maximum high endpoint in its subtree', 'The minimum low endpoint in its subtree', 'The subtree height'],
        correct_option_index: 1,
        explanation: 'The augmented max (highest high endpoint in the subtree) lets a search prune subtrees that cannot contain an overlap.',
      },
      {
        id: 'q-interval-tree-2',
        quiz_id: 'quiz-ext-interval-tree',
        question_text: 'Two intervals [a, b] and [c, d] overlap if and only if a <= d and c <= b.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'This is the standard overlap condition: each interval must start no later than the other ends.',
      },
      {
        id: 'q-interval-tree-3',
        quiz_id: 'quiz-ext-interval-tree',
        question_text: 'On a balanced interval tree, what is the time to find a single interval overlapping a query point?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(\\log n)', 'O(n)', 'O(n \\log n)'],
        correct_option_index: 1,
        explanation: 'The max field guarantees we descend only one branch per level, giving O(log n) on a balanced tree.',
      },
    ],
  },
  // 3. TERNARY SEARCH TREE
  {
    topic: {
      id: 'ext-ternary-search-tree',
      slug: 'ternary-search-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Ternary Search Tree',
      definition: 'A ternary search tree (TST) is a trie-like structure where each node has three children — less, equal, and greater — storing one character per node and following the equal link to advance through a key.',
      importance: 'A TST combines the space efficiency of a BST with the prefix-search power of a trie, making it ideal for autocomplete, spell-checking, and dictionaries with large alphabets.',
      prerequisites: ['binary-search-tree', 'trie'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(\\log n)',
      time_complexity_average: 'O(\\log n + L)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(n)',
      display_order: 313,
    },
    sections: [
      {
        id: 'sec-ternary-search-tree-1',
        topic_id: 'ext-ternary-search-tree',
        title: 'Concept & Intuition',
        content: `A **ternary search tree** blends two ideas. Like a **trie**, it stores strings character by character; like a **binary search tree**, each node branches by comparison. Every node holds a single character and three pointers: **left** (smaller character), **right** (larger character), and **middle** (the *next* character of the key).

The insight is that a plain trie wastes memory with one child slot per alphabet letter. A TST replaces that wide array with a small BST of characters at each position, so only the characters actually used consume space.

> [!NOTE]
> Follow a **middle** link and you advance one character deeper into the key. Follow **left** or **right** and you stay at the same key position, just comparing a different character.`,
        display_order: 1,
      },
      {
        id: 'sec-ternary-search-tree-2',
        topic_id: 'ext-ternary-search-tree',
        title: 'How It Works',
        content: `To search for a key, compare the current character $c$ with the node's character:

1. $c <$ node char → go **left**.
2. $c >$ node char → go **right**.
3. $c =$ node char → advance to the next character and go **middle**.

When the last character matches and the node is flagged as end-of-word, the key exists. Insertion follows the same path, creating nodes as needed and flagging the final one.

Prefix queries are a TST strength: walk to the end of the prefix via middle links, then traverse that subtree to collect every completion — the basis of autocomplete.`,
        display_order: 2,
      },
      {
        id: 'sec-ternary-search-tree-3',
        topic_id: 'ext-ternary-search-tree',
        title: 'Complexity Analysis',
        content: `Let $n$ be the number of keys and $L$ the length of the search string:

- **Search / insert:** $O(\\log n + L)$ average — roughly $L$ middle steps plus $\\log n$ character comparisons.
- **Worst case:** $O(n)$ if the character BSTs degenerate into chains (sorted insertion order).
- **Space:** $O(n)$ total characters, far less than a trie's $O(n \\cdot |\\Sigma|)$.

Balancing the tree (by inserting keys in randomized or median-first order) keeps the per-node comparisons near $\\log |\\Sigma|$.`,
        display_order: 3,
      },
      {
        id: 'sec-ternary-search-tree-4',
        topic_id: 'ext-ternary-search-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Inserting keys in sorted order makes each node's character BST a linked list, degrading performance to $O(L \\cdot |\\Sigma|)$. Insert in randomized order or balance the character comparisons.

Common mistakes:
- Forgetting the end-of-word flag, so prefixes are mistaken for complete keys.
- Advancing the character index on left/right moves (only middle advances it).
- Storing empty strings without a special case.

**Where TSTs shine:** autocomplete and typeahead, spell checkers, near-neighbor and wildcard matching, and memory-conscious dictionaries over large or Unicode alphabets.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-ternary-search-tree-py',
        topic_id: 'ext-ternary-search-tree',
        language: 'python',
        is_optimized: true,
        code: `class Node:
    def __init__(self, ch):
        self.ch = ch
        self.is_end = False
        self.left = self.eq = self.right = None

class TST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        self.root = self._insert(self.root, key, 0)

    def _insert(self, node, key, i):
        c = key[i]
        if node is None:
            node = Node(c)
        if c < node.ch:
            node.left = self._insert(node.left, key, i)
        elif c > node.ch:
            node.right = self._insert(node.right, key, i)
        elif i + 1 < len(key):
            node.eq = self._insert(node.eq, key, i + 1)
        else:
            node.is_end = True
        return node

    def search(self, key):
        node, i = self.root, 0
        while node is not None:
            c = key[i]
            if c < node.ch:
                node = node.left
            elif c > node.ch:
                node = node.right
            elif i + 1 == len(key):
                return node.is_end
            else:
                node, i = node.eq, i + 1
        return False`,
        explanation: 'Only the middle (eq) link advances the character index, matching the trie-within-a-BST structure of a TST.',
      },
      {
        id: 'snip-ternary-search-tree-js',
        topic_id: 'ext-ternary-search-tree',
        language: 'javascript',
        is_optimized: true,
        code: `class Node {
  constructor(ch) {
    this.ch = ch;
    this.isEnd = false;
    this.left = this.eq = this.right = null;
  }
}

class TST {
  constructor() { this.root = null; }

  insert(key) { this.root = this._insert(this.root, key, 0); }

  _insert(node, key, i) {
    const c = key[i];
    if (node === null) node = new Node(c);
    if (c < node.ch) node.left = this._insert(node.left, key, i);
    else if (c > node.ch) node.right = this._insert(node.right, key, i);
    else if (i + 1 < key.length) node.eq = this._insert(node.eq, key, i + 1);
    else node.isEnd = true;
    return node;
  }

  search(key) {
    let node = this.root, i = 0;
    while (node !== null) {
      const c = key[i];
      if (c < node.ch) node = node.left;
      else if (c > node.ch) node = node.right;
      else if (i + 1 === key.length) return node.isEnd;
      else { node = node.eq; i++; }
    }
    return false;
  }
}`,
        explanation: 'A compact TST supporting insert and exact-match search with character-level BST branching.',
      },
      {
        id: 'snip-ternary-search-tree-cpp',
        topic_id: 'ext-ternary-search-tree',
        language: 'cpp',
        is_optimized: true,
        code: `#include <string>

struct Node {
    char ch;
    bool isEnd = false;
    Node *left = nullptr, *eq = nullptr, *right = nullptr;
    Node(char c) : ch(c) {}
};

struct TST {
    Node* root = nullptr;

    Node* insert(Node* node, const std::string& key, int i) {
        char c = key[i];
        if (!node) node = new Node(c);
        if (c < node->ch) node->left = insert(node->left, key, i);
        else if (c > node->ch) node->right = insert(node->right, key, i);
        else if (i + 1 < (int)key.size()) node->eq = insert(node->eq, key, i + 1);
        else node->isEnd = true;
        return node;
    }

    void insert(const std::string& key) { root = insert(root, key, 0); }

    bool search(const std::string& key) {
        Node* node = root;
        int i = 0;
        while (node) {
            char c = key[i];
            if (c < node->ch) node = node->left;
            else if (c > node->ch) node = node->right;
            else if (i + 1 == (int)key.size()) return node->isEnd;
            else { node = node->eq; i++; }
        }
        return false;
    }
};`,
        explanation: 'Recursive insert plus iterative search implementing a memory-efficient ternary search tree.',
      },
      {
        id: 'snip-ternary-search-tree-java',
        topic_id: 'ext-ternary-search-tree',
        language: 'java',
        is_optimized: true,
        code: `class TST {
    static class Node {
        char ch;
        boolean isEnd;
        Node left, eq, right;
        Node(char ch) { this.ch = ch; }
    }

    Node root;

    void insert(String key) { root = insert(root, key, 0); }

    private Node insert(Node node, String key, int i) {
        char c = key.charAt(i);
        if (node == null) node = new Node(c);
        if (c < node.ch) node.left = insert(node.left, key, i);
        else if (c > node.ch) node.right = insert(node.right, key, i);
        else if (i + 1 < key.length()) node.eq = insert(node.eq, key, i + 1);
        else node.isEnd = true;
        return node;
    }

    boolean search(String key) {
        Node node = root;
        int i = 0;
        while (node != null) {
            char c = key.charAt(i);
            if (c < node.ch) node = node.left;
            else if (c > node.ch) node = node.right;
            else if (i + 1 == key.length()) return node.isEnd;
            else { node = node.eq; i++; }
        }
        return false;
    }
}`,
        explanation: 'Idiomatic Java TST where only the equal child advances through the key characters.',
      },
    ],
    quizId: 'quiz-ext-ternary-search-tree',
    quizTitle: 'Ternary Search Tree Quiz',
    quizDescription: 'Test your understanding of TSTs as a hybrid of tries and BSTs.',
    questions: [
      {
        id: 'q-ternary-search-tree-1',
        quiz_id: 'quiz-ext-ternary-search-tree',
        question_text: 'Which child link in a ternary search tree advances to the next character of the key?',
        question_type: 'MCQ',
        options: ['The left child', 'The right child', 'The middle (equal) child', 'Any child'],
        correct_option_index: 2,
        explanation: 'Only the middle/equal link moves to the next character; left and right compare a different character at the same position.',
      },
      {
        id: 'q-ternary-search-tree-2',
        quiz_id: 'quiz-ext-ternary-search-tree',
        question_text: 'A TST typically uses less memory than a standard trie over a large alphabet.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'A trie allocates one child slot per alphabet symbol; a TST stores only the characters actually used, saving space.',
      },
      {
        id: 'q-ternary-search-tree-3',
        quiz_id: 'quiz-ext-ternary-search-tree',
        question_text: 'Inserting keys in strictly sorted order into a TST can degrade it toward what worst-case behavior?',
        question_type: 'MCQ',
        options: ['Constant-time search', 'Linked-list-like character chains raising cost toward O(n)', 'Perfectly balanced structure', 'Automatic rebalancing'],
        correct_option_index: 1,
        explanation: 'Sorted insertion makes each character BST degenerate into a chain, pushing search toward linear time.',
      },
    ],
  },
  // 4. BINOMIAL HEAP
  {
    topic: {
      id: 'ext-binomial-heap',
      slug: 'binomial-heap',
      category_id: CATEGORY_IDS.trees,
      title: 'Binomial Heap',
      definition: 'A binomial heap is a collection of binomial trees satisfying the min-heap property, organized so that there is at most one tree of each order, enabling fast merging of two heaps.',
      importance: 'Its defining feature is an efficient union operation, making it a natural choice for mergeable priority queues used in graph algorithms and event simulation.',
      prerequisites: ['heap', 'binary-tree'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(\\log n)',
      time_complexity_worst: 'O(\\log n)',
      space_complexity: 'O(n)',
      display_order: 314,
    },
    sections: [
      {
        id: 'sec-binomial-heap-1',
        topic_id: 'ext-binomial-heap',
        title: 'Concept & Intuition',
        content: `A **binomial heap** is built from **binomial trees**. A binomial tree $B_k$ of order $k$ has exactly $2^k$ nodes and is formed by linking two $B_{k-1}$ trees — making one the leftmost child of the other. So $B_0$ is a single node, $B_1$ has two, $B_2$ has four, and so on.

A binomial heap is just a **forest** of these trees with at most one tree of each order, each obeying the **min-heap** property. Notice the parallel to binary numbers: a heap of $n$ nodes has a tree $B_k$ exactly when bit $k$ of $n$ is set.

> [!NOTE]
> Because $13 = 1101_2$, a binomial heap with 13 elements contains trees $B_0$, $B_2$, and $B_3$ — mirroring the set bits.`,
        display_order: 1,
      },
      {
        id: 'sec-binomial-heap-2',
        topic_id: 'ext-binomial-heap',
        title: 'How It Works',
        content: `Every operation reduces to **union**, which merges two root lists like adding two binary numbers. When two trees of the same order $k$ meet, they **link** into one tree of order $k+1$ (the larger root becomes a child), just as $1 + 1$ carries in binary.

- **Insert:** make a one-node heap and union it in.
- **Extract-min:** scan the $O(\\log n)$ roots for the minimum, remove it, reverse its children into a new heap, and union.
- **Decrease-key:** bubble the value up through its ancestors like a standard heap.

Since a heap of $n$ nodes has at most $\\lfloor \\log_2 n \\rfloor + 1$ trees, union touches only $O(\\log n)$ roots.`,
        display_order: 2,
      },
      {
        id: 'sec-binomial-heap-3',
        topic_id: 'ext-binomial-heap',
        title: 'Complexity Analysis',
        content: `With $n$ elements:

- **Union / merge:** $O(\\log n)$ — the headline feature.
- **Insert:** $O(\\log n)$ worst case, $O(1)$ amortized.
- **Find-min:** $O(\\log n)$ (or $O(1)$ if a min pointer is cached).
- **Extract-min / decrease-key:** $O(\\log n)$.
- **Space:** $O(n)$.

The logarithmic union is what sets binomial heaps apart from a binary heap, whose merge costs $O(n)$. A Fibonacci heap improves several of these bounds further to amortized $O(1)$.`,
        display_order: 3,
      },
      {
        id: 'sec-binomial-heap-4',
        topic_id: 'ext-binomial-heap',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> When linking two trees of equal order during union, the tree with the **larger** root must become the child, or the min-heap property breaks.

Common mistakes:
- Forgetting to reverse the child list of the extracted min before unioning it back.
- Losing track of the global minimum after a union if you cache a min pointer.
- Mishandling the "carry" when three trees of the same order appear during a merge.

**Where binomial heaps shine:** mergeable priority queues, Dijkstra and Prim variants that combine sub-results, and discrete-event simulations that frequently merge queues.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-binomial-heap-py',
        topic_id: 'ext-binomial-heap',
        language: 'python',
        is_optimized: true,
        code: `class BinomialTree:
    def __init__(self, key):
        self.key = key
        self.order = 0
        self.children = []

    def link(self, other):
        # attach the larger-root tree as a child (min-heap)
        if self.key > other.key:
            self, other = other, self
        self.children.append(other)
        self.order += 1
        return self

def merge(a, b):
    # a, b: lists of trees sorted by order; returns unioned forest
    import heapq
    trees = sorted(a + b, key=lambda t: t.order)
    result = []
    i = 0
    while i < len(trees):
        if i + 1 < len(trees) and trees[i].order == trees[i + 1].order:
            linked = trees[i].link(trees[i + 1])
            trees[i + 2:i + 2] = [linked]
            i += 2
        else:
            result.append(trees[i])
            i += 1
    return result

def find_min(forest):
    return min((t.key for t in forest), default=None)`,
        explanation: 'Linking two equal-order trees mimics binary carry; the smaller root always stays on top.',
      },
      {
        id: 'snip-binomial-heap-js',
        topic_id: 'ext-binomial-heap',
        language: 'javascript',
        is_optimized: true,
        code: `class BinomialTree {
  constructor(key) {
    this.key = key;
    this.order = 0;
    this.children = [];
  }

  link(other) {
    let a = this, b = other;
    if (a.key > b.key) [a, b] = [b, a];
    a.children.push(b);
    a.order += 1;
    return a;
  }
}

function merge(a, b) {
  const trees = [...a, ...b].sort((x, y) => x.order - y.order);
  const result = [];
  let i = 0;
  while (i < trees.length) {
    if (i + 1 < trees.length && trees[i].order === trees[i + 1].order) {
      const linked = trees[i].link(trees[i + 1]);
      trees.splice(i + 2, 0, linked);
      i += 2;
    } else {
      result.push(trees[i]);
      i += 1;
    }
  }
  return result;
}

function findMin(forest) {
  return forest.reduce((m, t) => (t.key < m ? t.key : m), Infinity);
}`,
        explanation: 'Union sorts roots by order and links equal orders, carrying like binary addition.',
      },
      {
        id: 'snip-binomial-heap-cpp',
        topic_id: 'ext-binomial-heap',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>
#include <climits>

struct BinomialTree {
    int key;
    int order = 0;
    std::vector<BinomialTree*> children;
    BinomialTree(int k) : key(k) {}

    BinomialTree* link(BinomialTree* other) {
        BinomialTree *a = this, *b = other;
        if (a->key > b->key) std::swap(a, b);
        a->children.push_back(b);
        a->order += 1;
        return a;
    }
};

std::vector<BinomialTree*> merge(std::vector<BinomialTree*> a,
                                 std::vector<BinomialTree*> b) {
    std::vector<BinomialTree*> trees = a;
    trees.insert(trees.end(), b.begin(), b.end());
    std::sort(trees.begin(), trees.end(),
              [](auto* x, auto* y) { return x->order < y->order; });
    std::vector<BinomialTree*> result;
    size_t i = 0;
    while (i < trees.size()) {
        if (i + 1 < trees.size() && trees[i]->order == trees[i + 1]->order) {
            BinomialTree* linked = trees[i]->link(trees[i + 1]);
            trees.insert(trees.begin() + i + 2, linked);
            i += 2;
        } else {
            result.push_back(trees[i]);
            i += 1;
        }
    }
    return result;
}`,
        explanation: 'Merges two forests by linking equal-order binomial trees, preserving the min-heap order.',
      },
      {
        id: 'snip-binomial-heap-java',
        topic_id: 'ext-binomial-heap',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class BinomialTree {
    int key, order = 0;
    List<BinomialTree> children = new ArrayList<>();
    BinomialTree(int key) { this.key = key; }

    BinomialTree link(BinomialTree other) {
        BinomialTree a = this, b = other;
        if (a.key > b.key) { BinomialTree t = a; a = b; b = t; }
        a.children.add(b);
        a.order++;
        return a;
    }
}

class BinomialHeap {
    static List<BinomialTree> merge(List<BinomialTree> x, List<BinomialTree> y) {
        List<BinomialTree> trees = new ArrayList<>(x);
        trees.addAll(y);
        trees.sort(Comparator.comparingInt(t -> t.order));
        List<BinomialTree> result = new ArrayList<>();
        int i = 0;
        while (i < trees.size()) {
            if (i + 1 < trees.size() && trees.get(i).order == trees.get(i + 1).order) {
                BinomialTree linked = trees.get(i).link(trees.get(i + 1));
                trees.add(i + 2, linked);
                i += 2;
            } else {
                result.add(trees.get(i));
                i += 1;
            }
        }
        return result;
    }
}`,
        explanation: 'Java union of two binomial forests with binary-carry linking of equal-order trees.',
      },
    ],
    quizId: 'quiz-ext-binomial-heap',
    quizTitle: 'Binomial Heap Quiz',
    quizDescription: 'Test your understanding of binomial trees and mergeable heaps.',
    questions: [
      {
        id: 'q-binomial-heap-1',
        quiz_id: 'quiz-ext-binomial-heap',
        question_text: 'How many nodes does a binomial tree of order k contain?',
        question_type: 'MCQ',
        options: ['k', '2k', '2^k', 'k^2'],
        correct_option_index: 2,
        explanation: 'A binomial tree B_k is formed by linking two B_(k-1) trees, so it holds exactly 2^k nodes.',
      },
      {
        id: 'q-binomial-heap-2',
        quiz_id: 'quiz-ext-binomial-heap',
        question_text: 'The union of two binomial heaps with n total elements runs in O(log n) time.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'A heap of n nodes has O(log n) trees, and union merges root lists like binary addition in O(log n).',
      },
      {
        id: 'q-binomial-heap-3',
        quiz_id: 'quiz-ext-binomial-heap',
        question_text: 'A binomial heap with 13 elements contains which binomial trees?',
        question_type: 'MCQ',
        options: ['B_0 and B_1 only', 'B_0, B_2, and B_3', 'B_1, B_2, and B_3', 'B_3 only'],
        correct_option_index: 1,
        explanation: '13 in binary is 1101, whose set bits are positions 0, 2, and 3, so the heap holds B_0, B_2, and B_3.',
      },
    ],
  },
  // 5. FIBONACCI HEAP
  {
    topic: {
      id: 'ext-fibonacci-heap',
      slug: 'fibonacci-heap',
      category_id: CATEGORY_IDS.trees,
      title: 'Fibonacci Heap',
      definition: 'A Fibonacci heap is a collection of min-heap-ordered trees with a lazy structure that defers consolidation, achieving amortized O(1) insert, merge, and decrease-key operations.',
      importance: 'Its amortized O(1) decrease-key gives the best known theoretical running times for Dijkstra and Prim on dense graphs, making it a cornerstone of advanced algorithm analysis.',
      prerequisites: ['heap', 'binomial-heap'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(1)',
      time_complexity_worst: 'O(\\log n)',
      space_complexity: 'O(n)',
      display_order: 315,
    },
    sections: [
      {
        id: 'sec-fibonacci-heap-1',
        topic_id: 'ext-fibonacci-heap',
        title: 'Concept & Intuition',
        content: `A **Fibonacci heap** is the lazy sibling of the binomial heap. Instead of tidying up after every operation, it does the **minimum work possible now** and postpones the cleanup until an \`extract-min\` forces it. This laziness is the source of its excellent amortized bounds.

Structurally it is a **circular doubly linked list of min-heap-ordered trees**, with a pointer to the overall minimum root. Inserting just splices a new node into the root list — no reordering. Merging two heaps just concatenates their root lists.

> [!NOTE]
> The name comes from the analysis: the minimum size of a tree of degree $k$ is the Fibonacci number $F_{k+2}$, which bounds the maximum degree at $O(\\log n)$.`,
        display_order: 1,
      },
      {
        id: 'sec-fibonacci-heap-2',
        topic_id: 'ext-fibonacci-heap',
        title: 'How It Works',
        content: `The magic lives in two operations:

- **extract-min:** remove the min root, promote its children to the root list, then **consolidate** — repeatedly linking trees of equal degree until every degree is unique. This is where deferred work is paid off.
- **decrease-key:** lower a node's key; if it now violates heap order, **cut** it from its parent and move it to the root list. To keep trees bushy, a parent that loses a *second* child is also cut (cascading cut), tracked by a **mark** bit.

The cascading-cut rule guarantees trees stay dense enough that degrees remain $O(\\log n)$.`,
        display_order: 2,
      },
      {
        id: 'sec-fibonacci-heap-3',
        topic_id: 'ext-fibonacci-heap',
        title: 'Complexity Analysis',
        content: `Amortized costs, using a potential function over trees and marked nodes:

- **Insert:** $O(1)$.
- **Find-min:** $O(1)$.
- **Merge / union:** $O(1)$.
- **Decrease-key:** $O(1)$ amortized.
- **Extract-min / delete:** $O(\\log n)$ amortized.

The worst-case *single* \`extract-min\` can be $O(n)$, but averaged over a sequence it is $O(\\log n)$. This decrease-key advantage lowers Dijkstra to $O(E + V \\log V)$.`,
        display_order: 3,
      },
      {
        id: 'sec-fibonacci-heap-4',
        topic_id: 'ext-fibonacci-heap',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The amortized bounds are theoretical. Large constant factors and poor cache behavior mean Fibonacci heaps are often *slower in practice* than binary or pairing heaps.

Common mistakes:
- Skipping the cascading cut, which lets trees grow tall and breaks the degree bound.
- Forgetting to clear the mark bit when a node is moved to the root list.
- Assuming a single extract-min is cheap — only the amortized cost is small.

**Where Fibonacci heaps shine:** theoretical optimality for Dijkstra and Prim, and any analysis where decrease-key dominates. For production, simpler heaps usually win.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-fibonacci-heap-py',
        topic_id: 'ext-fibonacci-heap',
        language: 'python',
        is_optimized: true,
        code: `class Node:
    def __init__(self, key):
        self.key = key
        self.degree = 0
        self.mark = False
        self.parent = None
        self.child = None
        self.left = self.right = self  # circular list

class FibHeap:
    def __init__(self):
        self.min = None
        self.n = 0

    def insert(self, key):
        node = Node(key)
        self._add_to_root(node)
        if self.min is None or key < self.min.key:
            self.min = node
        self.n += 1
        return node

    def _add_to_root(self, node):
        if self.min is None:
            node.left = node.right = node
        else:
            node.right = self.min.right
            node.left = self.min
            self.min.right.left = node
            self.min.right = node

    def find_min(self):
        return self.min.key if self.min else None`,
        explanation: 'Insert is O(1): splice into the circular root list and update the min pointer, deferring consolidation.',
      },
      {
        id: 'snip-fibonacci-heap-js',
        topic_id: 'ext-fibonacci-heap',
        language: 'javascript',
        is_optimized: true,
        code: `class Node {
  constructor(key) {
    this.key = key;
    this.degree = 0;
    this.mark = false;
    this.parent = this.child = null;
    this.left = this.right = this;
  }
}

class FibHeap {
  constructor() { this.min = null; this.n = 0; }

  insert(key) {
    const node = new Node(key);
    if (this.min === null) {
      this.min = node;
    } else {
      node.right = this.min.right;
      node.left = this.min;
      this.min.right.left = node;
      this.min.right = node;
      if (key < this.min.key) this.min = node;
    }
    this.n++;
    return node;
  }

  findMin() { return this.min ? this.min.key : null; }
}`,
        explanation: 'Lazy insert keeps a circular root list and only updates the min pointer in O(1).',
      },
      {
        id: 'snip-fibonacci-heap-cpp',
        topic_id: 'ext-fibonacci-heap',
        language: 'cpp',
        is_optimized: true,
        code: `struct Node {
    int key;
    int degree = 0;
    bool mark = false;
    Node *parent = nullptr, *child = nullptr;
    Node *left, *right;
    Node(int k) : key(k) { left = right = this; }
};

struct FibHeap {
    Node* min = nullptr;
    int n = 0;

    Node* insert(int key) {
        Node* node = new Node(key);
        if (!min) {
            min = node;
        } else {
            node->right = min->right;
            node->left = min;
            min->right->left = node;
            min->right = node;
            if (key < min->key) min = node;
        }
        n++;
        return node;
    }

    int findMin() const { return min ? min->key : -1; }
};`,
        explanation: 'A circular doubly linked root list makes insert and merge O(1) by pointer splicing.',
      },
      {
        id: 'snip-fibonacci-heap-java',
        topic_id: 'ext-fibonacci-heap',
        language: 'java',
        is_optimized: true,
        code: `class FibHeap {
    static class Node {
        int key, degree = 0;
        boolean mark = false;
        Node parent, child, left, right;
        Node(int key) { this.key = key; left = right = this; }
    }

    Node min;
    int n;

    Node insert(int key) {
        Node node = new Node(key);
        if (min == null) {
            min = node;
        } else {
            node.right = min.right;
            node.left = min;
            min.right.left = node;
            min.right = node;
            if (key < min.key) min = node;
        }
        n++;
        return node;
    }

    Integer findMin() { return min == null ? null : min.key; }
}`,
        explanation: 'Java Fibonacci heap insert maintains the circular root list and min pointer in constant time.',
      },
    ],
    quizId: 'quiz-ext-fibonacci-heap',
    quizTitle: 'Fibonacci Heap Quiz',
    quizDescription: 'Test your understanding of lazy heaps and amortized analysis.',
    questions: [
      {
        id: 'q-fibonacci-heap-1',
        quiz_id: 'quiz-ext-fibonacci-heap',
        question_text: 'What is the amortized time complexity of decrease-key in a Fibonacci heap?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(\\log n)', 'O(n)', 'O(n \\log n)'],
        correct_option_index: 0,
        explanation: 'Cascading cuts give decrease-key an amortized O(1) cost, the defining advantage of the Fibonacci heap.',
      },
      {
        id: 'q-fibonacci-heap-2',
        quiz_id: 'quiz-ext-fibonacci-heap',
        question_text: 'The consolidation step that links trees of equal degree happens during extract-min.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Fibonacci heaps defer cleanup; consolidation runs lazily when extract-min is called.',
      },
      {
        id: 'q-fibonacci-heap-3',
        quiz_id: 'quiz-ext-fibonacci-heap',
        question_text: 'Why are Fibonacci heaps often slower than binary heaps in practice despite better amortized bounds?',
        question_type: 'MCQ',
        options: ['They use more comparisons per key', 'Large constant factors and poor cache locality', 'They cannot store duplicate keys', 'They require sorted input'],
        correct_option_index: 1,
        explanation: 'The pointer-heavy structure has big constants and weak cache behavior, so simpler heaps usually win in practice.',
      },
    ],
  },
  // 6. CARTESIAN TREE
  {
    topic: {
      id: 'ext-cartesian-tree',
      slug: 'cartesian-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Cartesian Tree',
      definition: 'A Cartesian tree is a binary tree derived from a sequence that is simultaneously a binary search tree on array indices and a heap on the values, giving a unique structure for distinct elements.',
      importance: 'It links sequences to trees, powering constant-time range-minimum queries (via Euler tour + LCA), treaps, and the analysis of quicksort and suffix structures.',
      prerequisites: ['binary-tree', 'heap'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(n)',
      time_complexity_average: 'O(n)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(n)',
      display_order: 316,
    },
    sections: [
      {
        id: 'sec-cartesian-tree-1',
        topic_id: 'ext-cartesian-tree',
        title: 'Concept & Intuition',
        content: `A **Cartesian tree** turns an array into a tree with two simultaneous rules. Read by an **in-order traversal**, the nodes reproduce the original array order (a BST on *positions*). At the same time, the values obey the **heap property** — in a min-Cartesian tree, every parent's value is smaller than its children's.

Intuitively, the **minimum element** of the array becomes the root, splitting the array into a left part and a right part, each recursively forming a subtree. This is exactly the recursion at the heart of range-minimum queries.

> [!NOTE]
> For an array of *distinct* values the Cartesian tree is **unique**. Duplicates require a tie-breaking rule (for example, prefer the earlier index).`,
        display_order: 1,
      },
      {
        id: 'sec-cartesian-tree-2',
        topic_id: 'ext-cartesian-tree',
        title: 'How It Works',
        content: `The elegant build is a **left-to-right scan with a stack** holding the right spine of the tree built so far:

1. For each new element, pop stack nodes whose value is greater than (min-heap) the new value.
2. The last popped node becomes the new node's **left child**.
3. Attach the new node as the **right child** of the current stack top.
4. Push the new node.

Each element is pushed and popped at most once, so the whole construction is $O(n)$ — far better than repeatedly finding the minimum, which would be $O(n^2)$.`,
        display_order: 2,
      },
      {
        id: 'sec-cartesian-tree-3',
        topic_id: 'ext-cartesian-tree',
        title: 'Complexity Analysis',
        content: `- **Construction:** $O(n)$ using the stack method; each index is pushed and popped once.
- **Space:** $O(n)$ for the $n$ nodes and the auxiliary stack.
- **Naive construction** (recursively locating the min): $O(n^2)$ worst case, or $O(n \\log n)$ with a sparse table.

Once built, pairing a Cartesian tree with an **LCA** structure answers **range-minimum queries in $O(1)$** after $O(n)$ preprocessing, because the RMQ of a range equals the LCA of the two endpoints in the tree.`,
        display_order: 3,
      },
      {
        id: 'sec-cartesian-tree-4',
        topic_id: 'ext-cartesian-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> A Cartesian tree can be badly unbalanced. A sorted input produces a degenerate chain of height $n$, so do not rely on it for balanced-BST guarantees unless priorities are randomized (a treap).

Common mistakes:
- Mixing up min-heap and max-heap conventions midway through the build.
- Using the wrong comparison direction when popping, corrupting the in-order property.
- Ignoring duplicate handling, which breaks uniqueness.

**Where Cartesian trees shine:** range-minimum queries, treaps (Cartesian tree + random priorities), suffix-tree relationships, and modeling divide-and-conquer recursion.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-cartesian-tree-py',
        topic_id: 'ext-cartesian-tree',
        language: 'python',
        is_optimized: true,
        code: `class Node:
    def __init__(self, val):
        self.val = val
        self.left = self.right = None

def build_cartesian_tree(arr):
    # min-heap Cartesian tree in O(n) using a stack (right spine)
    stack = []
    for val in arr:
        node = Node(val)
        last = None
        while stack and stack[-1].val > val:
            last = stack.pop()
        node.left = last
        if stack:
            stack[-1].right = node
        stack.append(node)
    return stack[0] if stack else None`,
        explanation: 'The stack holds the current right spine; each element is pushed and popped once for O(n) total work.',
      },
      {
        id: 'snip-cartesian-tree-js',
        topic_id: 'ext-cartesian-tree',
        language: 'javascript',
        is_optimized: true,
        code: `class Node {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function buildCartesianTree(arr) {
  const stack = [];
  for (const val of arr) {
    const node = new Node(val);
    let last = null;
    while (stack.length && stack[stack.length - 1].val > val) {
      last = stack.pop();
    }
    node.left = last;
    if (stack.length) stack[stack.length - 1].right = node;
    stack.push(node);
  }
  return stack.length ? stack[0] : null;
}`,
        explanation: 'A min-heap Cartesian tree built in linear time; stack[0] is always the overall minimum (the root).',
      },
      {
        id: 'snip-cartesian-tree-cpp',
        topic_id: 'ext-cartesian-tree',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>

struct Node {
    int val;
    Node *left = nullptr, *right = nullptr;
    Node(int v) : val(v) {}
};

Node* buildCartesianTree(const std::vector<int>& arr) {
    std::vector<Node*> stack;
    for (int val : arr) {
        Node* node = new Node(val);
        Node* last = nullptr;
        while (!stack.empty() && stack.back()->val > val) {
            last = stack.back();
            stack.pop_back();
        }
        node->left = last;
        if (!stack.empty()) stack.back()->right = node;
        stack.push_back(node);
    }
    return stack.empty() ? nullptr : stack.front();
}`,
        explanation: 'Uses a vector as a spine stack, achieving O(n) construction of a min-heap Cartesian tree.',
      },
      {
        id: 'snip-cartesian-tree-java',
        topic_id: 'ext-cartesian-tree',
        language: 'java',
        is_optimized: true,
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class CartesianTree {
    static class Node {
        int val;
        Node left, right;
        Node(int val) { this.val = val; }
    }

    static Node build(int[] arr) {
        Deque<Node> stack = new ArrayDeque<>();
        for (int val : arr) {
            Node node = new Node(val);
            Node last = null;
            while (!stack.isEmpty() && stack.peek().val > val) {
                last = stack.pop();
            }
            node.left = last;
            if (!stack.isEmpty()) stack.peek().right = node;
            stack.push(node);
        }
        return stack.isEmpty() ? null : stack.peekLast();
    }
}`,
        explanation: 'An ArrayDeque acts as the right-spine stack; peekLast returns the root (global minimum).',
      },
    ],
    quizId: 'quiz-ext-cartesian-tree',
    quizTitle: 'Cartesian Tree Quiz',
    quizDescription: 'Test your understanding of the sequence-to-tree duality and RMQ links.',
    questions: [
      {
        id: 'q-cartesian-tree-1',
        quiz_id: 'quiz-ext-cartesian-tree',
        question_text: 'An in-order traversal of a Cartesian tree reproduces which sequence?',
        question_type: 'MCQ',
        options: ['The sorted values', 'The original array order', 'The reversed array', 'A random permutation'],
        correct_option_index: 1,
        explanation: 'A Cartesian tree is a BST on indices, so its in-order traversal yields the original array order.',
      },
      {
        id: 'q-cartesian-tree-2',
        quiz_id: 'quiz-ext-cartesian-tree',
        question_text: 'A Cartesian tree can be constructed from an array in O(n) time using a stack.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'The right-spine stack method pushes and pops each element once, giving linear construction.',
      },
      {
        id: 'q-cartesian-tree-3',
        quiz_id: 'quiz-ext-cartesian-tree',
        question_text: 'Which query does a Cartesian tree answer in O(1) after O(n) preprocessing with an LCA structure?',
        question_type: 'MCQ',
        options: ['Range sum', 'Range minimum', 'Prefix product', 'Median'],
        correct_option_index: 1,
        explanation: 'The range-minimum of an interval equals the LCA of its endpoints in the Cartesian tree, giving O(1) RMQ.',
      },
    ],
  },
  // 7. EXPRESSION TREE
  {
    topic: {
      id: 'ext-expression-tree',
      slug: 'expression-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Expression Tree',
      definition: 'An expression tree is a binary tree that represents an arithmetic or logical expression, with operators at internal nodes and operands (constants or variables) at the leaves.',
      importance: 'Expression trees are the intermediate representation compilers and calculators use to parse, evaluate, and optimize expressions, and they cleanly convert between infix, prefix, and postfix notations.',
      prerequisites: ['binary-tree', 'stack'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(n)',
      time_complexity_average: 'O(n)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(n)',
      display_order: 317,
    },
    sections: [
      {
        id: 'sec-expression-tree-1',
        topic_id: 'ext-expression-tree',
        title: 'Concept & Intuition',
        content: `An **expression tree** captures the structure of a formula like $(3 + 4) \\times 5$ as a tree. **Operators** ($+$, $\\times$) sit at internal nodes; **operands** ($3$, $4$, $5$) are the leaves. The tree encodes precedence implicitly — deeper nodes are evaluated first.

Reading the tree in different traversal orders recovers the classic notations:
- **In-order** → infix ($3 + 4$)
- **Pre-order** → prefix ($+\\ 3\\ 4$)
- **Post-order** → postfix ($3\\ 4\\ +$)

> [!NOTE]
> The tree makes precedence structural rather than syntactic: once built, no parentheses are needed to know the evaluation order.`,
        display_order: 1,
      },
      {
        id: 'sec-expression-tree-2',
        topic_id: 'ext-expression-tree',
        title: 'How It Works',
        content: `The simplest build is from a **postfix** expression using a stack:

1. Scan tokens left to right.
2. For an **operand**, push a leaf node.
3. For an **operator**, pop two subtrees, make them the operator node's right and left children, and push the new node.

The final node on the stack is the root. **Evaluation** is a post-order traversal: recursively evaluate the left and right subtrees, then apply the operator. Because each node is visited once, both building and evaluating are $O(n)$.`,
        display_order: 2,
      },
      {
        id: 'sec-expression-tree-3',
        topic_id: 'ext-expression-tree',
        title: 'Complexity Analysis',
        content: `For an expression with $n$ tokens:

- **Construction from postfix:** $O(n)$ — one stack operation per token.
- **Evaluation:** $O(n)$ — a single post-order traversal.
- **Traversal to any notation:** $O(n)$.
- **Space:** $O(n)$ for the tree, plus $O(h)$ recursion where $h$ is the height.

Converting infix directly requires precedence handling (shunting-yard), which is still $O(n)$ but with extra operator-stack bookkeeping.`,
        display_order: 3,
      },
      {
        id: 'sec-expression-tree-4',
        topic_id: 'ext-expression-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Operand order matters for non-commutative operators. When popping two subtrees for \`-\` or \`/\`, the **first** popped operand is the **right** child, not the left. Reversing them silently computes the wrong result.

Common mistakes:
- Forgetting to handle unary operators (like negation) separately.
- Assuming in-order traversal always needs no parentheses — it does for correct precedence display.
- Integer versus floating-point division bugs during evaluation.

**Where expression trees shine:** compilers and interpreters, spreadsheet formula engines, symbolic differentiation, and calculators.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-expression-tree-py',
        topic_id: 'ext-expression-tree',
        language: 'python',
        is_optimized: true,
        code: `class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

OPS = {'+', '-', '*', '/'}

def build_from_postfix(tokens):
    stack = []
    for tok in tokens:
        if tok in OPS:
            right = stack.pop()
            left = stack.pop()
            stack.append(Node(tok, left, right))
        else:
            stack.append(Node(tok))
    return stack.pop()

def evaluate(node):
    if node.left is None and node.right is None:
        return float(node.value)
    a = evaluate(node.left)
    b = evaluate(node.right)
    if node.value == '+': return a + b
    if node.value == '-': return a - b
    if node.value == '*': return a * b
    return a / b`,
        explanation: 'The first popped subtree becomes the right child, preserving order for non-commutative operators.',
      },
      {
        id: 'snip-expression-tree-js',
        topic_id: 'ext-expression-tree',
        language: 'javascript',
        is_optimized: true,
        code: `class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const OPS = new Set(['+', '-', '*', '/']);

function buildFromPostfix(tokens) {
  const stack = [];
  for (const tok of tokens) {
    if (OPS.has(tok)) {
      const right = stack.pop();
      const left = stack.pop();
      stack.push(new Node(tok, left, right));
    } else {
      stack.push(new Node(tok));
    }
  }
  return stack.pop();
}

function evaluate(node) {
  if (!node.left && !node.right) return parseFloat(node.value);
  const a = evaluate(node.left);
  const b = evaluate(node.right);
  switch (node.value) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    default: return a / b;
  }
}`,
        explanation: 'Builds the tree from postfix tokens and evaluates it with a post-order traversal.',
      },
      {
        id: 'snip-expression-tree-cpp',
        topic_id: 'ext-expression-tree',
        language: 'cpp',
        is_optimized: true,
        code: `#include <string>
#include <vector>
#include <stack>

struct Node {
    std::string value;
    Node *left = nullptr, *right = nullptr;
    Node(std::string v) : value(std::move(v)) {}
};

bool isOp(const std::string& s) {
    return s == "+" || s == "-" || s == "*" || s == "/";
}

Node* buildFromPostfix(const std::vector<std::string>& tokens) {
    std::stack<Node*> st;
    for (const auto& tok : tokens) {
        if (isOp(tok)) {
            Node* right = st.top(); st.pop();
            Node* left = st.top(); st.pop();
            Node* n = new Node(tok);
            n->left = left; n->right = right;
            st.push(n);
        } else {
            st.push(new Node(tok));
        }
    }
    return st.top();
}

double evaluate(Node* node) {
    if (!node->left && !node->right) return std::stod(node->value);
    double a = evaluate(node->left), b = evaluate(node->right);
    if (node->value == "+") return a + b;
    if (node->value == "-") return a - b;
    if (node->value == "*") return a * b;
    return a / b;
}`,
        explanation: 'A std::stack of subtree pointers builds the tree; recursion evaluates it bottom-up.',
      },
      {
        id: 'snip-expression-tree-java',
        topic_id: 'ext-expression-tree',
        language: 'java',
        is_optimized: true,
        code: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Set;

class ExpressionTree {
    static class Node {
        String value;
        Node left, right;
        Node(String value) { this.value = value; }
    }

    static final Set<String> OPS = Set.of("+", "-", "*", "/");

    static Node buildFromPostfix(String[] tokens) {
        Deque<Node> stack = new ArrayDeque<>();
        for (String tok : tokens) {
            if (OPS.contains(tok)) {
                Node right = stack.pop();
                Node left = stack.pop();
                Node n = new Node(tok);
                n.left = left; n.right = right;
                stack.push(n);
            } else {
                stack.push(new Node(tok));
            }
        }
        return stack.pop();
    }

    static double evaluate(Node node) {
        if (node.left == null && node.right == null)
            return Double.parseDouble(node.value);
        double a = evaluate(node.left), b = evaluate(node.right);
        switch (node.value) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            default: return a / b;
        }
    }
}`,
        explanation: 'Idiomatic Java expression tree construction from postfix and recursive evaluation.',
      },
    ],
    quizId: 'quiz-ext-expression-tree',
    quizTitle: 'Expression Tree Quiz',
    quizDescription: 'Test your understanding of representing and evaluating expressions as trees.',
    questions: [
      {
        id: 'q-expression-tree-1',
        quiz_id: 'quiz-ext-expression-tree',
        question_text: 'Which traversal of an expression tree yields the postfix (Reverse Polish) form?',
        question_type: 'MCQ',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correct_option_index: 2,
        explanation: 'Post-order visits both operands before the operator, which is exactly postfix notation.',
      },
      {
        id: 'q-expression-tree-2',
        quiz_id: 'quiz-ext-expression-tree',
        question_text: 'When building from postfix, the first operand popped for a "-" operator should become the right child.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'The stack yields operands in reverse, so the first pop is the right operand; swapping it breaks subtraction and division.',
      },
      {
        id: 'q-expression-tree-3',
        quiz_id: 'quiz-ext-expression-tree',
        question_text: 'What is the time complexity of evaluating an expression tree with n nodes?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(\\log n)', 'O(n)', 'O(n^2)'],
        correct_option_index: 2,
        explanation: 'Evaluation is a single post-order traversal visiting each node once, so it is O(n).',
      },
    ],
  },
  // 8. THREADED BINARY TREE
  {
    topic: {
      id: 'ext-threaded-binary-tree',
      slug: 'threaded-binary-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Threaded Binary Tree',
      definition: 'A threaded binary tree is a binary tree in which otherwise-null child pointers are replaced by "threads" pointing to the in-order predecessor or successor, enabling traversal without recursion or a stack.',
      importance: 'Threading turns wasted null pointers into shortcuts, allowing O(1) auxiliary-space in-order traversal — valuable in memory-constrained and embedded environments.',
      prerequisites: ['binary-tree', 'binary-search-tree'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(1)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(n)',
      display_order: 318,
    },
    sections: [
      {
        id: 'sec-threaded-binary-tree-1',
        topic_id: 'ext-threaded-binary-tree',
        title: 'Concept & Intuition',
        content: `In an ordinary binary tree with $n$ nodes there are $n + 1$ **null pointers** — pure wasted space. A **threaded binary tree** repurposes them. Instead of leaving a leaf's right pointer null, it points to that node's **in-order successor**; a null left pointer can point to the **in-order predecessor**.

These special pointers are called **threads**, and a boolean flag on each node distinguishes a real child link from a thread. The payoff is that you can walk the tree in sorted order following threads, with **no stack and no recursion**.

> [!NOTE]
> A tree threaded on the right only is **single-threaded**; one threaded on both sides is **double-threaded**.`,
        display_order: 1,
      },
      {
        id: 'sec-threaded-binary-tree-2',
        topic_id: 'ext-threaded-binary-tree',
        title: 'How It Works',
        content: `Each node carries a \`rightThread\` (and optionally \`leftThread\`) flag. In-order traversal of a right-threaded tree works like this:

1. Go to the **leftmost** node — that is the start.
2. Visit the current node.
3. If \`rightThread\` is true, **follow the thread** directly to the successor.
4. Otherwise move to the right child and descend to its leftmost node.

Because every step is a single pointer hop, traversal uses only $O(1)$ extra memory. Insertion must carefully rewire threads so the in-order chain stays intact.`,
        display_order: 2,
      },
      {
        id: 'sec-threaded-binary-tree-3',
        topic_id: 'ext-threaded-binary-tree',
        title: 'Complexity Analysis',
        content: `- **In-order traversal:** $O(n)$ time but only $O(1)$ auxiliary space — the headline benefit versus the $O(h)$ stack of a normal traversal.
- **Finding successor / predecessor:** $O(1)$ amortized, $O(h)$ worst case when climbing a subtree.
- **Insertion / deletion:** $O(h)$, plus constant thread-rewiring work.
- **Space:** $O(n)$ nodes, with one extra boolean flag (or two) per node.

The $O(1)$-space traversal is the reason threaded trees existed before recursion was cheap.`,
        display_order: 3,
      },
      {
        id: 'sec-threaded-binary-tree-4',
        topic_id: 'ext-threaded-binary-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Insertion and deletion are error-prone: you must update the threads of neighboring nodes, not just the parent. A single missed thread rewire corrupts the entire in-order chain.

Common mistakes:
- Confusing a thread pointer with a real child during traversal (always check the flag).
- Forgetting to set the new node's own threads when inserting.
- Mishandling the last node, whose right thread should be null (end of traversal).

**Where threaded trees shine:** memory-limited or embedded systems, iterators that must avoid recursion, and teaching the elegant reuse of null pointers.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-threaded-binary-tree-py',
        topic_id: 'ext-threaded-binary-tree',
        language: 'python',
        is_optimized: true,
        code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.right_thread = False  # True if right points to successor

def leftmost(node):
    while node and node.left:
        node = node.left
    return node

def inorder(root):
    # O(1) auxiliary space traversal of a right-threaded tree
    node = leftmost(root)
    result = []
    while node:
        result.append(node.key)
        if node.right_thread:
            node = node.right
        else:
            node = leftmost(node.right)
    return result`,
        explanation: 'Following the right thread reaches the successor directly, so traversal needs no stack.',
      },
      {
        id: 'snip-threaded-binary-tree-js',
        topic_id: 'ext-threaded-binary-tree',
        language: 'javascript',
        is_optimized: true,
        code: `class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.rightThread = false;
  }
}

function leftmost(node) {
  while (node && node.left) node = node.left;
  return node;
}

function inorder(root) {
  let node = leftmost(root);
  const result = [];
  while (node) {
    result.push(node.key);
    if (node.rightThread) {
      node = node.right;
    } else {
      node = leftmost(node.right);
    }
  }
  return result;
}`,
        explanation: 'A right-threaded in-order walk that uses only a single pointer, no recursion or explicit stack.',
      },
      {
        id: 'snip-threaded-binary-tree-cpp',
        topic_id: 'ext-threaded-binary-tree',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>

struct Node {
    int key;
    Node *left = nullptr, *right = nullptr;
    bool rightThread = false;
    Node(int k) : key(k) {}
};

Node* leftmost(Node* node) {
    while (node && node->left) node = node->left;
    return node;
}

std::vector<int> inorder(Node* root) {
    std::vector<int> result;
    Node* node = leftmost(root);
    while (node) {
        result.push_back(node->key);
        if (node->rightThread) node = node->right;
        else node = leftmost(node->right);
    }
    return result;
}`,
        explanation: 'Constant-space in-order traversal driven by the rightThread flag on each node.',
      },
      {
        id: 'snip-threaded-binary-tree-java',
        topic_id: 'ext-threaded-binary-tree',
        language: 'java',
        is_optimized: true,
        code: `import java.util.ArrayList;
import java.util.List;

class ThreadedTree {
    static class Node {
        int key;
        Node left, right;
        boolean rightThread = false;
        Node(int key) { this.key = key; }
    }

    static Node leftmost(Node node) {
        while (node != null && node.left != null) node = node.left;
        return node;
    }

    static List<Integer> inorder(Node root) {
        List<Integer> result = new ArrayList<>();
        Node node = leftmost(root);
        while (node != null) {
            result.add(node.key);
            if (node.rightThread) node = node.right;
            else node = leftmost(node.right);
        }
        return result;
    }
}`,
        explanation: 'Java right-threaded traversal returning in-order keys with O(1) auxiliary space.',
      },
    ],
    quizId: 'quiz-ext-threaded-binary-tree',
    quizTitle: 'Threaded Binary Tree Quiz',
    quizDescription: 'Test your understanding of threads and stack-free traversal.',
    questions: [
      {
        id: 'q-threaded-binary-tree-1',
        quiz_id: 'quiz-ext-threaded-binary-tree',
        question_text: 'What do the "threads" in a threaded binary tree point to?',
        question_type: 'MCQ',
        options: ['The parent node', 'The in-order predecessor or successor', 'The root of the tree', 'A random node'],
        correct_option_index: 1,
        explanation: 'Threads reuse null child pointers to reference the in-order predecessor (left) or successor (right).',
      },
      {
        id: 'q-threaded-binary-tree-2',
        quiz_id: 'quiz-ext-threaded-binary-tree',
        question_text: 'In-order traversal of a threaded binary tree can be done using only O(1) auxiliary space.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Threads let you reach each successor with a single pointer hop, so no stack or recursion is needed.',
      },
      {
        id: 'q-threaded-binary-tree-3',
        quiz_id: 'quiz-ext-threaded-binary-tree',
        question_text: 'How does a node distinguish a real child link from a thread?',
        question_type: 'MCQ',
        options: ['By comparing addresses', 'By a boolean flag stored on the node', 'By the node key value', 'It cannot distinguish them'],
        correct_option_index: 1,
        explanation: 'A boolean flag (e.g., rightThread) marks whether a pointer is a genuine child or an in-order thread.',
      },
    ],
  },
  // 9. RADIX TREE
  {
    topic: {
      id: 'ext-radix-tree',
      slug: 'radix-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Radix Tree',
      definition: 'A radix tree (also called a radix trie or Patricia trie) is a space-optimized trie in which every node that is the only child is merged with its parent, so each edge can hold a string of characters rather than a single one.',
      importance: 'By collapsing single-child chains, radix trees drastically reduce the node count of a trie, making them ideal for IP routing tables, dictionaries, and prefix-based key-value stores.',
      prerequisites: ['trie', 'string'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(k)',
      time_complexity_average: 'O(k)',
      time_complexity_worst: 'O(k)',
      space_complexity: 'O(n)',
      display_order: 319,
    },
    sections: [
      {
        id: 'sec-radix-tree-1',
        topic_id: 'ext-radix-tree',
        title: 'Concept & Intuition',
        content: `A plain **trie** stores one character per edge, so the word "romane" needs six nodes even if no other key shares its letters. A **radix tree** fixes this waste by **compressing chains**: any node with a single child is merged upward so an edge can carry a whole substring like "roman".

The result keeps a trie's prefix-search power while using far fewer nodes. Common prefixes are shared, and branching only happens where keys actually diverge.

> [!NOTE]
> "Patricia trie" (Practical Algorithm To Retrieve Information Coded In Alphanumeric) is a radix tree with radix $2$, operating on individual bits — the classic form used in IP routing.`,
        display_order: 1,
      },
      {
        id: 'sec-radix-tree-2',
        topic_id: 'ext-radix-tree',
        title: 'How It Works',
        content: `To **search** for a key, walk down matching edge labels, consuming characters of the key against each edge's string. A hit occurs when the whole key is consumed at a node flagged as a word end.

**Insertion** is where the structure adapts:
1. Follow matching edges as far as possible.
2. If a key diverges *in the middle* of an edge label, **split** that edge into a shared prefix and two branches.
3. Add the new key's remaining suffix as a fresh edge.

Because work is proportional to the **key length $k$**, not the number of stored keys, lookups are $O(k)$ regardless of dictionary size.`,
        display_order: 2,
      },
      {
        id: 'sec-radix-tree-3',
        topic_id: 'ext-radix-tree',
        title: 'Complexity Analysis',
        content: `Let $k$ be the length of the query key and $n$ the number of keys:

- **Search / insert / delete:** $O(k)$ — independent of $n$.
- **Space:** $O(n)$ in the number of stored keys, far below a plain trie because single-child chains collapse.
- **Prefix enumeration:** $O(k + m)$ where $m$ is the size of the reported results.

Compared with a hash table, a radix tree adds ordered iteration and prefix queries at the cost of pointer-chasing per character.`,
        display_order: 3,
      },
      {
        id: 'sec-radix-tree-4',
        topic_id: 'ext-radix-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The trickiest operation is the **edge split** on insert. When a new key partially matches an existing edge label, you must create an intermediate node, re-parent the old suffix, and attach the new suffix — getting any of these wrong corrupts the tree.

Common mistakes:
- Forgetting the end-of-word flag, so a prefix is mistaken for a stored key.
- Not merging a node back with its child after a deletion leaves a single-child chain.
- Off-by-one errors when computing the common prefix length of two labels.

**Where radix trees shine:** IP routing (longest-prefix match), autocomplete, in-memory key-value stores, and inverted indexes.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-radix-tree-py',
        topic_id: 'ext-radix-tree',
        language: 'python',
        is_optimized: true,
        code: `class Node:
    def __init__(self):
        self.children = {}   # first-char -> (label, child)
        self.is_end = False

class RadixTree:
    def __init__(self):
        self.root = Node()

    def insert(self, key):
        node = self.root
        i = 0
        while i < len(key):
            c = key[i]
            if c not in node.children:
                child = Node()
                child.is_end = True
                node.children[c] = (key[i:], child)
                return
            label, child = node.children[c]
            j = 0
            while j < len(label) and i + j < len(key) and label[j] == key[i + j]:
                j += 1
            if j == len(label):
                node, i = child, i + j
            else:
                # split the edge at position j
                mid = Node()
                node.children[c] = (label[:j], mid)
                mid.children[label[j]] = (label[j:], child)
                if i + j == len(key):
                    mid.is_end = True
                else:
                    leaf = Node()
                    leaf.is_end = True
                    mid.children[key[i + j]] = (key[i + j:], leaf)
                return
        node.is_end = True

    def search(self, key):
        node = self.root
        i = 0
        while i < len(key):
            c = key[i]
            if c not in node.children:
                return False
            label, child = node.children[c]
            if key[i:i + len(label)] != label:
                return False
            i += len(label)
            node = child
        return node.is_end`,
        explanation: 'Edges store whole substrings; a mismatch mid-label triggers a split into a shared prefix and two branches.',
      },
      {
        id: 'snip-radix-tree-js',
        topic_id: 'ext-radix-tree',
        language: 'javascript',
        is_optimized: true,
        code: `class Node {
  constructor() {
    this.children = new Map(); // firstChar -> { label, child }
    this.isEnd = false;
  }
}

class RadixTree {
  constructor() { this.root = new Node(); }

  insert(key) {
    let node = this.root, i = 0;
    while (i < key.length) {
      const c = key[i];
      if (!node.children.has(c)) {
        const child = new Node();
        child.isEnd = true;
        node.children.set(c, { label: key.slice(i), child });
        return;
      }
      const entry = node.children.get(c);
      const label = entry.label;
      let j = 0;
      while (j < label.length && i + j < key.length && label[j] === key[i + j]) j++;
      if (j === label.length) {
        node = entry.child;
        i += j;
      } else {
        const mid = new Node();
        node.children.set(c, { label: label.slice(0, j), child: mid });
        mid.children.set(label[j], { label: label.slice(j), child: entry.child });
        if (i + j === key.length) {
          mid.isEnd = true;
        } else {
          const leaf = new Node();
          leaf.isEnd = true;
          mid.children.set(key[i + j], { label: key.slice(i + j), child: leaf });
        }
        return;
      }
    }
    node.isEnd = true;
  }

  search(key) {
    let node = this.root, i = 0;
    while (i < key.length) {
      const c = key[i];
      if (!node.children.has(c)) return false;
      const { label, child } = node.children.get(c);
      if (key.slice(i, i + label.length) !== label) return false;
      i += label.length;
      node = child;
    }
    return node.isEnd;
  }
}`,
        explanation: 'A Map keyed by first character stores compressed edge labels, splitting them on divergent inserts.',
      },
      {
        id: 'snip-radix-tree-cpp',
        topic_id: 'ext-radix-tree',
        language: 'cpp',
        is_optimized: true,
        code: `#include <string>
#include <unordered_map>

struct Node {
    bool isEnd = false;
    std::unordered_map<char, std::pair<std::string, Node*>> children;
};

struct RadixTree {
    Node* root = new Node();

    void insert(const std::string& key) {
        Node* node = root;
        size_t i = 0;
        while (i < key.size()) {
            char c = key[i];
            auto it = node->children.find(c);
            if (it == node->children.end()) {
                Node* child = new Node();
                child->isEnd = true;
                node->children[c] = {key.substr(i), child};
                return;
            }
            std::string& label = it->second.first;
            Node* child = it->second.second;
            size_t j = 0;
            while (j < label.size() && i + j < key.size() && label[j] == key[i + j]) j++;
            if (j == label.size()) {
                node = child;
                i += j;
            } else {
                Node* mid = new Node();
                std::string prefix = label.substr(0, j);
                mid->children[label[j]] = {label.substr(j), child};
                node->children[c] = {prefix, mid};
                if (i + j == key.size()) {
                    mid->isEnd = true;
                } else {
                    Node* leaf = new Node();
                    leaf->isEnd = true;
                    mid->children[key[i + j]] = {key.substr(i + j), leaf};
                }
                return;
            }
        }
        node->isEnd = true;
    }

    bool search(const std::string& key) {
        Node* node = root;
        size_t i = 0;
        while (i < key.size()) {
            auto it = node->children.find(key[i]);
            if (it == node->children.end()) return false;
            const std::string& label = it->second.first;
            if (key.compare(i, label.size(), label) != 0) return false;
            i += label.size();
            node = it->second.second;
        }
        return node->isEnd;
    }
};`,
        explanation: 'A hash map of compressed edges implements insert with edge splitting and O(k) search.',
      },
      {
        id: 'snip-radix-tree-java',
        topic_id: 'ext-radix-tree',
        language: 'java',
        is_optimized: true,
        code: `import java.util.HashMap;
import java.util.Map;

class RadixTree {
    static class Node {
        boolean isEnd = false;
        Map<Character, Object[]> children = new HashMap<>(); // {label, child}
    }

    Node root = new Node();

    void insert(String key) {
        Node node = root;
        int i = 0;
        while (i < key.length()) {
            char c = key.charAt(i);
            if (!node.children.containsKey(c)) {
                Node child = new Node();
                child.isEnd = true;
                node.children.put(c, new Object[]{key.substring(i), child});
                return;
            }
            Object[] entry = node.children.get(c);
            String label = (String) entry[0];
            Node child = (Node) entry[1];
            int j = 0;
            while (j < label.length() && i + j < key.length()
                   && label.charAt(j) == key.charAt(i + j)) j++;
            if (j == label.length()) {
                node = child;
                i += j;
            } else {
                Node mid = new Node();
                mid.children.put(label.charAt(j), new Object[]{label.substring(j), child});
                node.children.put(c, new Object[]{label.substring(0, j), mid});
                if (i + j == key.length()) {
                    mid.isEnd = true;
                } else {
                    Node leaf = new Node();
                    leaf.isEnd = true;
                    mid.children.put(key.charAt(i + j), new Object[]{key.substring(i + j), leaf});
                }
                return;
            }
        }
        node.isEnd = true;
    }

    boolean search(String key) {
        Node node = root;
        int i = 0;
        while (i < key.length()) {
            Object[] entry = node.children.get(key.charAt(i));
            if (entry == null) return false;
            String label = (String) entry[0];
            if (i + label.length() > key.length()
                || !key.regionMatches(i, label, 0, label.length())) return false;
            i += label.length();
            node = (Node) entry[1];
        }
        return node.isEnd;
    }
}`,
        explanation: 'Java radix tree storing {label, child} edges in a map, with edge splitting on insert.',
      },
    ],
    quizId: 'quiz-ext-radix-tree',
    quizTitle: 'Radix Tree Quiz',
    quizDescription: 'Test your understanding of compressed tries and prefix matching.',
    questions: [
      {
        id: 'q-radix-tree-1',
        quiz_id: 'quiz-ext-radix-tree',
        question_text: 'How does a radix tree differ from a standard trie?',
        question_type: 'MCQ',
        options: ['It stores values only at leaves', 'It merges single-child chains so edges hold substrings', 'It uses a hash function', 'It is always balanced'],
        correct_option_index: 1,
        explanation: 'A radix tree compresses any node with a single child into its parent, letting each edge carry a whole substring.',
      },
      {
        id: 'q-radix-tree-2',
        quiz_id: 'quiz-ext-radix-tree',
        question_text: 'Search time in a radix tree depends on the number of stored keys, not the key length.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Search is O(k) in the key length k and independent of how many keys are stored.',
      },
      {
        id: 'q-radix-tree-3',
        quiz_id: 'quiz-ext-radix-tree',
        question_text: 'Which operation is required when a new key diverges in the middle of an existing edge label?',
        question_type: 'MCQ',
        options: ['Rotation', 'Edge split', 'Rehashing', 'Rebalancing'],
        correct_option_index: 1,
        explanation: 'The edge must be split into a shared prefix and two branches to accommodate the divergent key.',
      },
    ],
  },
  // 10. HUFFMAN CODING TREE
  {
    topic: {
      id: 'ext-huffman-coding-tree',
      slug: 'huffman-coding-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Huffman Coding Tree',
      definition: 'A Huffman coding tree is a full binary tree built by a greedy algorithm that assigns variable-length, prefix-free binary codes to symbols so that more frequent symbols receive shorter codes.',
      importance: 'Huffman coding produces provably optimal prefix codes and underpins classic compression schemes such as DEFLATE, JPEG, and MP3.',
      prerequisites: ['heap', 'binary-tree', 'greedy-algorithms'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(n \\log n)',
      time_complexity_average: 'O(n \\log n)',
      time_complexity_worst: 'O(n \\log n)',
      space_complexity: 'O(n)',
      display_order: 320,
    },
    sections: [
      {
        id: 'sec-huffman-coding-tree-1',
        topic_id: 'ext-huffman-coding-tree',
        title: 'Concept & Intuition',
        content: `**Huffman coding** compresses data by giving common symbols short codes and rare symbols long ones. Fixed-length encoding wastes bits — if 'e' appears far more often than 'z', why give them the same 8 bits?

The codes must be **prefix-free**: no code is a prefix of another, so a bitstream decodes unambiguously without delimiters. A binary tree captures this naturally — symbols live only at **leaves**, and the path from the root (left = 0, right = 1) spells each symbol's code.

> [!NOTE]
> Because symbols are only at leaves, no code can be a prefix of another. This prefix property is what makes decoding a simple root-to-leaf walk.`,
        display_order: 1,
      },
      {
        id: 'sec-huffman-coding-tree-2',
        topic_id: 'ext-huffman-coding-tree',
        title: 'How It Works',
        content: `The build is a beautiful **greedy** algorithm driven by a **min-priority queue** keyed on frequency:

1. Create a leaf node for every symbol and push it into the queue.
2. Pop the **two lowest-frequency** nodes.
3. Make them children of a new internal node whose frequency is their sum; push it back.
4. Repeat until one node remains — the root.

Assign 0 to every left edge and 1 to every right edge; the codes are the root-to-leaf bit strings. Merging the least frequent symbols last-but-deepest is exactly what pushes their codes to the greatest length.`,
        display_order: 2,
      },
      {
        id: 'sec-huffman-coding-tree-3',
        topic_id: 'ext-huffman-coding-tree',
        title: 'Complexity Analysis',
        content: `For an alphabet of $n$ distinct symbols:

- **Tree construction:** $O(n \\log n)$ — $n$ merges, each with two $O(\\log n)$ priority-queue operations.
- **If frequencies are pre-sorted:** $O(n)$ using two queues instead of a heap.
- **Encoding:** $O(m)$ for a message of $m$ symbols after codes are computed.
- **Space:** $O(n)$ for the tree and the code table.

The resulting code is **optimal** among all prefix codes: no other prefix code yields a smaller expected code length for the given frequencies.`,
        display_order: 3,
      },
      {
        id: 'sec-huffman-coding-tree-4',
        topic_id: 'ext-huffman-coding-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The decoder needs the same tree the encoder used. You must transmit the tree (or the frequency table) alongside the compressed data, or agree on it in advance — otherwise the bitstream is undecodable.

Common mistakes:
- Breaking ties inconsistently between encoder and decoder, producing different trees.
- Forgetting the single-symbol edge case, where the tree has just one leaf and a code of length 1 must be forced.
- Assuming Huffman beats every scheme — arithmetic coding can do better for skewed distributions.

**Where Huffman coding shines:** DEFLATE (ZIP, gzip, PNG), JPEG and MP3 entropy stages, and as the final entropy step in many codecs.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-huffman-coding-tree-py',
        topic_id: 'ext-huffman-coding-tree',
        language: 'python',
        is_optimized: true,
        code: `import heapq

class Node:
    def __init__(self, freq, char=None, left=None, right=None):
        self.freq = freq
        self.char = char
        self.left = left
        self.right = right
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman(freqs):
    heap = [Node(f, c) for c, f in freqs.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        a = heapq.heappop(heap)
        b = heapq.heappop(heap)
        heapq.heappush(heap, Node(a.freq + b.freq, None, a, b))
    return heap[0] if heap else None

def build_codes(node, prefix='', table=None):
    if table is None:
        table = {}
    if node is None:
        return table
    if node.char is not None:
        table[node.char] = prefix or '0'
    build_codes(node.left, prefix + '0', table)
    build_codes(node.right, prefix + '1', table)
    return table`,
        explanation: 'A min-heap repeatedly merges the two least frequent nodes; codes come from root-to-leaf paths.',
      },
      {
        id: 'snip-huffman-coding-tree-js',
        topic_id: 'ext-huffman-coding-tree',
        language: 'javascript',
        is_optimized: true,
        code: `class Node {
  constructor(freq, char = null, left = null, right = null) {
    this.freq = freq;
    this.char = char;
    this.left = left;
    this.right = right;
  }
}

function buildHuffman(freqs) {
  // freqs: Map(char -> frequency)
  let nodes = [...freqs].map(([c, f]) => new Node(f, c));
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const a = nodes.shift();
    const b = nodes.shift();
    nodes.push(new Node(a.freq + b.freq, null, a, b));
  }
  return nodes[0] || null;
}

function buildCodes(node, prefix = '', table = {}) {
  if (!node) return table;
  if (node.char !== null) {
    table[node.char] = prefix || '0';
  }
  buildCodes(node.left, prefix + '0', table);
  buildCodes(node.right, prefix + '1', table);
  return table;
}`,
        explanation: 'Greedy merges of the two lowest-frequency nodes produce an optimal prefix-code tree.',
      },
      {
        id: 'snip-huffman-coding-tree-cpp',
        topic_id: 'ext-huffman-coding-tree',
        language: 'cpp',
        is_optimized: true,
        code: `#include <queue>
#include <vector>
#include <unordered_map>
#include <string>

struct Node {
    int freq;
    char ch;
    Node *left = nullptr, *right = nullptr;
    Node(int f, char c) : freq(f), ch(c) {}
    Node(int f, Node* l, Node* r) : freq(f), ch(0), left(l), right(r) {}
};

struct Cmp {
    bool operator()(Node* a, Node* b) const { return a->freq > b->freq; }
};

Node* buildHuffman(const std::unordered_map<char,int>& freqs) {
    std::priority_queue<Node*, std::vector<Node*>, Cmp> pq;
    for (auto& [c, f] : freqs) pq.push(new Node(f, c));
    while (pq.size() > 1) {
        Node* a = pq.top(); pq.pop();
        Node* b = pq.top(); pq.pop();
        pq.push(new Node(a->freq + b->freq, a, b));
    }
    return pq.empty() ? nullptr : pq.top();
}

void buildCodes(Node* node, const std::string& prefix,
                std::unordered_map<char,std::string>& table) {
    if (!node) return;
    if (!node->left && !node->right) {
        table[node->ch] = prefix.empty() ? "0" : prefix;
    }
    buildCodes(node->left, prefix + "0", table);
    buildCodes(node->right, prefix + "1", table);
}`,
        explanation: 'A std::priority_queue min-heap builds the tree; recursion fills the per-symbol code table.',
      },
      {
        id: 'snip-huffman-coding-tree-java',
        topic_id: 'ext-huffman-coding-tree',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class Huffman {
    static class Node {
        int freq;
        char ch;
        Node left, right;
        Node(int freq, char ch) { this.freq = freq; this.ch = ch; }
        Node(int freq, Node left, Node right) {
            this.freq = freq; this.left = left; this.right = right;
        }
    }

    static Node build(Map<Character,Integer> freqs) {
        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(n -> n.freq));
        for (var e : freqs.entrySet()) pq.add(new Node(e.getValue(), e.getKey()));
        while (pq.size() > 1) {
            Node a = pq.poll();
            Node b = pq.poll();
            pq.add(new Node(a.freq + b.freq, a, b));
        }
        return pq.poll();
    }

    static void buildCodes(Node node, String prefix, Map<Character,String> table) {
        if (node == null) return;
        if (node.left == null && node.right == null) {
            table.put(node.ch, prefix.isEmpty() ? "0" : prefix);
        }
        buildCodes(node.left, prefix + "0", table);
        buildCodes(node.right, prefix + "1", table);
    }
}`,
        explanation: 'A PriorityQueue ordered by frequency drives the greedy merges of an optimal Huffman tree.',
      },
    ],
    quizId: 'quiz-ext-huffman-coding-tree',
    quizTitle: 'Huffman Coding Tree Quiz',
    quizDescription: 'Test your understanding of optimal prefix codes and greedy tree building.',
    questions: [
      {
        id: 'q-huffman-coding-tree-1',
        quiz_id: 'quiz-ext-huffman-coding-tree',
        question_text: 'In a Huffman tree, where are the actual symbols stored?',
        question_type: 'MCQ',
        options: ['At internal nodes', 'At the leaves only', 'At the root only', 'At every node'],
        correct_option_index: 1,
        explanation: 'Symbols occupy only the leaves, which guarantees the prefix-free property of the codes.',
      },
      {
        id: 'q-huffman-coding-tree-2',
        quiz_id: 'quiz-ext-huffman-coding-tree',
        question_text: 'Huffman coding produces an optimal prefix code for a given set of symbol frequencies.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'The greedy merge of least-frequent nodes provably minimizes expected code length among prefix codes.',
      },
      {
        id: 'q-huffman-coding-tree-3',
        quiz_id: 'quiz-ext-huffman-coding-tree',
        question_text: 'What is the time complexity of building a Huffman tree for n symbols using a binary heap?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n \\log n)', 'O(n^2)', 'O(2^n)'],
        correct_option_index: 1,
        explanation: 'There are n-1 merges, each doing O(log n) heap operations, giving O(n log n) overall.',
      },
    ],
  },
  // 11. AA TREE
  {
    topic: {
      id: 'ext-aa-tree',
      slug: 'aa-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'AA Tree',
      definition: 'An AA tree is a self-balancing binary search tree, a simplified variant of the red-black tree that stores a "level" on each node and permits red links only as right children, maintained by two operations called skew and split.',
      importance: 'By allowing only right-leaning red links, AA trees reduce the many red-black rebalancing cases to just two simple functions, making a balanced BST far easier to implement correctly.',
      prerequisites: ['binary-search-tree', 'red-black-tree', 'self-balancing-bst'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(\\log n)',
      time_complexity_average: 'O(\\log n)',
      time_complexity_worst: 'O(\\log n)',
      space_complexity: 'O(n)',
      display_order: 321,
    },
    sections: [
      {
        id: 'sec-aa-tree-1',
        topic_id: 'ext-aa-tree',
        title: 'Concept & Intuition',
        content: `An **AA tree** (named after its inventor Arne Andersson) is a balanced BST designed to be *simple to code*. It is essentially a red-black tree with one extra restriction: **red links may only lean right**. Left-leaning red links are forbidden.

Instead of colors, each node stores a **level**. A leaf has level $1$; a horizontal (red) link is one where a child shares its parent's level. Forbidding left-horizontal links eliminates most of the awkward cases that make red-black trees error-prone.

> [!NOTE]
> AA trees are equivalent to $2$-$3$ trees. Every red-black tree case collapses into just two rebalancing primitives here: **skew** and **split**.`,
        display_order: 1,
      },
      {
        id: 'sec-aa-tree-2',
        topic_id: 'ext-aa-tree',
        title: 'How It Works',
        content: `Two tiny operations enforce all invariants:

- **skew** removes a *left* horizontal link with a single right rotation, converting it to a right link.
- **split** removes two consecutive *right* horizontal links with a left rotation, incrementing the middle node's level.

After a recursive insert or delete, you call \`skew\` then \`split\` on the way back up. The rule of thumb: **skew before split**. That fixed sequence restores balance without the tangle of red-black conditionals.

The level field enforces the invariants: a left child's level must be exactly one less than its parent, and a right child's level is at most equal.`,
        display_order: 2,
      },
      {
        id: 'sec-aa-tree-3',
        topic_id: 'ext-aa-tree',
        title: 'Complexity Analysis',
        content: `With $n$ nodes:

- **Search / insert / delete:** $O(\\log n)$ worst case — the tree height is bounded by $2 \\log n$.
- **Rebalancing per update:** amortized $O(1)$ rotations via \`skew\` and \`split\`.
- **Space:** $O(n)$, needing only a small integer level per node (no color bit tricks).

Performance matches a red-black tree, but the code is dramatically shorter because deletion — usually the hardest balanced-BST operation — reduces to the same two helpers.`,
        display_order: 3,
      },
      {
        id: 'sec-aa-tree-4',
        topic_id: 'ext-aa-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Deletion must **decrease levels** first: if a node's level is more than one above either child, lower it (and lower a right child sharing the old level) before running the skew/split sequence. Skipping this step silently breaks the balance invariant.

Common mistakes:
- Applying \`split\` before \`skew\` — the order is fixed and matters.
- Forgetting to run the full skew/split chain along the *entire* path back to the root.
- Using a sentinel \`nil\` node with level $0$ incorrectly, causing off-by-one level bugs.

**Where AA trees shine:** whenever you need a balanced BST that is easy to implement and verify — ordered maps, sets, and teaching balanced trees without red-black complexity.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-aa-tree-py',
        topic_id: 'ext-aa-tree',
        language: 'python',
        is_optimized: true,
        code: `class Node:
    def __init__(self, key, level=1):
        self.key = key
        self.level = level
        self.left = self.right = None

def skew(t):
    if t and t.left and t.left.level == t.level:
        l = t.left
        t.left = l.right
        l.right = t
        return l
    return t

def split(t):
    if (t and t.right and t.right.right
            and t.right.right.level == t.level):
        r = t.right
        t.right = r.left
        r.left = t
        r.level += 1
        return r
    return t

def insert(t, key):
    if t is None:
        return Node(key)
    if key < t.key:
        t.left = insert(t.left, key)
    else:
        t.right = insert(t.right, key)
    t = skew(t)
    t = split(t)
    return t`,
        explanation: 'Insertion recurses down then applies skew (fix left links) and split (fix double right links) on the way up.',
      },
      {
        id: 'snip-aa-tree-js',
        topic_id: 'ext-aa-tree',
        language: 'javascript',
        is_optimized: true,
        code: `class Node {
  constructor(key, level = 1) {
    this.key = key;
    this.level = level;
    this.left = this.right = null;
  }
}

function skew(t) {
  if (t && t.left && t.left.level === t.level) {
    const l = t.left;
    t.left = l.right;
    l.right = t;
    return l;
  }
  return t;
}

function split(t) {
  if (t && t.right && t.right.right &&
      t.right.right.level === t.level) {
    const r = t.right;
    t.right = r.left;
    r.left = t;
    r.level += 1;
    return r;
  }
  return t;
}

function insert(t, key) {
  if (t === null) return new Node(key);
  if (key < t.key) t.left = insert(t.left, key);
  else t.right = insert(t.right, key);
  t = skew(t);
  t = split(t);
  return t;
}`,
        explanation: 'The skew-then-split sequence replaces all of the rebalancing cases of a red-black tree.',
      },
      {
        id: 'snip-aa-tree-cpp',
        topic_id: 'ext-aa-tree',
        language: 'cpp',
        is_optimized: true,
        code: `struct Node {
    int key;
    int level = 1;
    Node *left = nullptr, *right = nullptr;
    Node(int k) : key(k) {}
};

Node* skew(Node* t) {
    if (t && t->left && t->left->level == t->level) {
        Node* l = t->left;
        t->left = l->right;
        l->right = t;
        return l;
    }
    return t;
}

Node* split(Node* t) {
    if (t && t->right && t->right->right &&
        t->right->right->level == t->level) {
        Node* r = t->right;
        t->right = r->left;
        r->left = t;
        r->level += 1;
        return r;
    }
    return t;
}

Node* insert(Node* t, int key) {
    if (!t) return new Node(key);
    if (key < t->key) t->left = insert(t->left, key);
    else t->right = insert(t->right, key);
    t = skew(t);
    t = split(t);
    return t;
}`,
        explanation: 'A compact AA-tree insert in C++ using level comparisons instead of red-black color bits.',
      },
      {
        id: 'snip-aa-tree-java',
        topic_id: 'ext-aa-tree',
        language: 'java',
        is_optimized: true,
        code: `class AATree {
    static class Node {
        int key, level = 1;
        Node left, right;
        Node(int key) { this.key = key; }
    }

    private Node skew(Node t) {
        if (t != null && t.left != null && t.left.level == t.level) {
            Node l = t.left;
            t.left = l.right;
            l.right = t;
            return l;
        }
        return t;
    }

    private Node split(Node t) {
        if (t != null && t.right != null && t.right.right != null
                && t.right.right.level == t.level) {
            Node r = t.right;
            t.right = r.left;
            r.left = t;
            r.level++;
            return r;
        }
        return t;
    }

    Node insert(Node t, int key) {
        if (t == null) return new Node(key);
        if (key < t.key) t.left = insert(t.left, key);
        else t.right = insert(t.right, key);
        t = skew(t);
        t = split(t);
        return t;
    }
}`,
        explanation: 'Java AA-tree insertion; skew and split keep the tree balanced with minimal code.',
      },
    ],
    quizId: 'quiz-ext-aa-tree',
    quizTitle: 'AA Tree Quiz',
    quizDescription: 'Test your understanding of the skew/split balanced BST.',
    questions: [
      {
        id: 'q-aa-tree-1',
        quiz_id: 'quiz-ext-aa-tree',
        question_text: 'What restriction does an AA tree place on red (horizontal) links?',
        question_type: 'MCQ',
        options: ['They may only lean left', 'They may only lean right', 'They are not allowed at all', 'They may appear anywhere'],
        correct_option_index: 1,
        explanation: 'AA trees permit horizontal links only as right children, which simplifies rebalancing to two operations.',
      },
      {
        id: 'q-aa-tree-2',
        quiz_id: 'quiz-ext-aa-tree',
        question_text: 'In an AA tree, split should be applied before skew during rebalancing.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'The correct fixed order is skew first, then split; reversing them fails to restore the invariants.',
      },
      {
        id: 'q-aa-tree-3',
        quiz_id: 'quiz-ext-aa-tree',
        question_text: 'What is the worst-case time complexity of search in an AA tree with n nodes?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(\\log n)', 'O(n)', 'O(n \\log n)'],
        correct_option_index: 1,
        explanation: 'AA trees keep height within about 2 log n, so search, insert, and delete are all O(log n) worst case.',
      },
    ],
  },
];
