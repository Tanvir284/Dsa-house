import { CurriculumModule } from '@/types';
import { CATEGORY_IDS } from '../linear';

export const treesAModules: CurriculumModule[] = [
  // 1. RED-BLACK TREE
  {
    topic: {
      id: 'ext-red-black-tree',
      slug: 'red-black-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Red-Black Tree',
      definition: 'A red-black tree is a self-balancing binary search tree where each node carries a color bit (red or black) and a set of coloring rules guarantee that the longest root-to-leaf path is at most twice the shortest, keeping the tree approximately balanced.',
      importance: 'Red-black trees power ordered maps and sets in many standard libraries (C++ std::map, Java TreeMap, the Linux kernel scheduler) because they offer guaranteed O(log n) operations with cheaper rebalancing than AVL trees.',
      prerequisites: ['binary-search-tree'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(log n)',
      time_complexity_average: 'O(log n)',
      time_complexity_worst: 'O(log n)',
      space_complexity: 'O(n)',
      display_order: 300,
    },
    sections: [
      {
        id: 'sec-red-black-tree-1',
        topic_id: 'ext-red-black-tree',
        title: 'Concept & Intuition',
        content: `A plain binary search tree can degenerate into a linked list when keys arrive in sorted order, turning $O(\\log n)$ lookups into $O(n)$. A red-black tree prevents this by painting every node **red** or **black** and enforcing rules that keep the tree roughly balanced without the strict height limits of an AVL tree.

The key intuition: because no red node may have a red child, red nodes are always "sandwiched" between black ones. The number of black nodes on any path from the root to a leaf (the *black-height*) is identical for all paths. Together these facts force the longest path to be at most twice the shortest.

> [!NOTE]
> Think of black nodes as the load-bearing skeleton and red nodes as flexible padding that lets us absorb insertions with cheap, local fixes.`,
        display_order: 1,
      },
      {
        id: 'sec-red-black-tree-2',
        topic_id: 'ext-red-black-tree',
        title: 'The Five Invariants & Rotations',
        content: `Every red-black tree obeys five rules:
1. Every node is either red or black.
2. The root is black.
3. Every leaf (the null sentinel) is black.
4. A red node's children are both black (no two reds in a row).
5. Every path from a node to its descendant leaves contains the same number of black nodes.

Insertion first performs an ordinary BST insert and colors the new node **red** (adding red never breaks rule 5). If the parent is also red, rule 4 is violated and we repair it by examining the **uncle**:
- **Red uncle** → recolor parent and uncle black, grandparent red, then continue upward.
- **Black uncle** → perform a rotation (left, right, or a double rotation) and recolor.

A *left rotation* pivots a node down to the left while its right child rises up, preserving BST order. Rotations are $O(1)$ pointer swaps.`,
        display_order: 2,
      },
      {
        id: 'sec-red-black-tree-3',
        topic_id: 'ext-red-black-tree',
        title: 'Height Guarantee & Complexity',
        content: `Let $bh$ be the black-height of the root. Rule 5 means every path has $bh$ black nodes, and rule 4 means red nodes cannot exceed black nodes on any path, so the total height $h \\le 2 \\cdot bh$.

A subtree with black-height $bh$ contains at least $2^{bh} - 1$ internal nodes, giving $n \\ge 2^{h/2} - 1$, which rearranges to:
$$h \\le 2 \\log_2 (n + 1)$$

Therefore search, insert, and delete all run in $O(\\log n)$. Rebalancing touches only $O(\\log n)$ nodes, but the number of *rotations* is bounded by a small constant per operation (at most 2 for insert, 3 for delete), which is why red-black trees are favored for write-heavy workloads over AVL trees.`,
        display_order: 3,
      },
      {
        id: 'sec-red-black-tree-4',
        topic_id: 'ext-red-black-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The most common bug is forgetting the null sentinel is black, or letting the root stay red after fix-up. Always force the root black as the final step of insertion.

Common mistakes:
- Confusing red-black balancing with AVL: red-black trees allow a more skewed shape (up to 2x), so they are *less* strictly balanced but rebalance faster.
- Mishandling the delete case, which has more sub-cases than insert because removing a black node can violate the black-height rule.

**Use cases:** ordered associative containers (\`std::map\`, \`TreeMap\`), the Completely Fair Scheduler in Linux, and any scenario needing sorted iteration with guaranteed logarithmic updates.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-red-black-tree-py',
        topic_id: 'ext-red-black-tree',
        language: 'python',
        is_optimized: true,
        explanation: 'Insertion with sentinel NIL node and iterative fix-up restoring the red-black invariants.',
        code: `RED, BLACK = 0, 1

class Node:
    def __init__(self, key, color=RED):
        self.key = key
        self.color = color
        self.left = self.right = self.parent = None

class RedBlackTree:
    def __init__(self):
        self.NIL = Node(None, BLACK)
        self.root = self.NIL

    def _rotate_left(self, x):
        y = x.right
        x.right = y.left
        if y.left != self.NIL:
            y.left.parent = x
        y.parent = x.parent
        if x.parent is None:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
        y.left = x
        x.parent = y

    def _rotate_right(self, x):
        y = x.left
        x.left = y.right
        if y.right != self.NIL:
            y.right.parent = x
        y.parent = x.parent
        if x.parent is None:
            self.root = y
        elif x == x.parent.right:
            x.parent.right = y
        else:
            x.parent.left = y
        y.right = x
        x.parent = y

    def insert(self, key):
        node = Node(key)
        node.left = node.right = self.NIL
        parent, cur = None, self.root
        while cur != self.NIL:
            parent = cur
            cur = cur.left if key < cur.key else cur.right
        node.parent = parent
        if parent is None:
            self.root = node
        elif key < parent.key:
            parent.left = node
        else:
            parent.right = node
        self._fix_insert(node)

    def _fix_insert(self, z):
        while z.parent and z.parent.color == RED:
            gp = z.parent.parent
            if z.parent == gp.left:
                uncle = gp.right
                if uncle.color == RED:
                    z.parent.color = uncle.color = BLACK
                    gp.color = RED
                    z = gp
                else:
                    if z == z.parent.right:
                        z = z.parent
                        self._rotate_left(z)
                    z.parent.color = BLACK
                    gp.color = RED
                    self._rotate_right(gp)
            else:
                uncle = gp.left
                if uncle.color == RED:
                    z.parent.color = uncle.color = BLACK
                    gp.color = RED
                    z = gp
                else:
                    if z == z.parent.left:
                        z = z.parent
                        self._rotate_right(z)
                    z.parent.color = BLACK
                    gp.color = RED
                    self._rotate_left(gp)
        self.root.color = BLACK`,
      },
      {
        id: 'snip-red-black-tree-js',
        topic_id: 'ext-red-black-tree',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript red-black tree insertion using a shared black NIL sentinel and rotation-based fix-up.',
        code: `const RED = 0, BLACK = 1;

class RBNode {
  constructor(key, color = RED) {
    this.key = key;
    this.color = color;
    this.left = this.right = this.parent = null;
  }
}

class RedBlackTree {
  constructor() {
    this.NIL = new RBNode(null, BLACK);
    this.root = this.NIL;
  }

  rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    if (y.left !== this.NIL) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  rotateRight(x) {
    const y = x.left;
    x.left = y.right;
    if (y.right !== this.NIL) y.right.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
    y.right = x;
    x.parent = y;
  }

  insert(key) {
    const node = new RBNode(key);
    node.left = node.right = this.NIL;
    let parent = null, cur = this.root;
    while (cur !== this.NIL) {
      parent = cur;
      cur = key < cur.key ? cur.left : cur.right;
    }
    node.parent = parent;
    if (!parent) this.root = node;
    else if (key < parent.key) parent.left = node;
    else parent.right = node;
    this.fixInsert(node);
  }

  fixInsert(z) {
    while (z.parent && z.parent.color === RED) {
      const gp = z.parent.parent;
      if (z.parent === gp.left) {
        const uncle = gp.right;
        if (uncle.color === RED) {
          z.parent.color = uncle.color = BLACK;
          gp.color = RED;
          z = gp;
        } else {
          if (z === z.parent.right) { z = z.parent; this.rotateLeft(z); }
          z.parent.color = BLACK;
          gp.color = RED;
          this.rotateRight(gp);
        }
      } else {
        const uncle = gp.left;
        if (uncle.color === RED) {
          z.parent.color = uncle.color = BLACK;
          gp.color = RED;
          z = gp;
        } else {
          if (z === z.parent.left) { z = z.parent; this.rotateRight(z); }
          z.parent.color = BLACK;
          gp.color = RED;
          this.rotateLeft(gp);
        }
      }
    }
    this.root.color = BLACK;
  }
}`,
      },
      {
        id: 'snip-red-black-tree-cpp',
        topic_id: 'ext-red-black-tree',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ red-black tree with a sentinel NIL node and iterative insert fix-up.',
        code: `#include <iostream>
enum Color { RED, BLACK };

struct Node {
    int key;
    Color color;
    Node *left, *right, *parent;
    Node(int k, Color c) : key(k), color(c), left(nullptr), right(nullptr), parent(nullptr) {}
};

class RedBlackTree {
    Node* NIL;
    Node* root;

    void rotateLeft(Node* x) {
        Node* y = x->right;
        x->right = y->left;
        if (y->left != NIL) y->left->parent = x;
        y->parent = x->parent;
        if (!x->parent) root = y;
        else if (x == x->parent->left) x->parent->left = y;
        else x->parent->right = y;
        y->left = x;
        x->parent = y;
    }

    void rotateRight(Node* x) {
        Node* y = x->left;
        x->left = y->right;
        if (y->right != NIL) y->right->parent = x;
        y->parent = x->parent;
        if (!x->parent) root = y;
        else if (x == x->parent->right) x->parent->right = y;
        else x->parent->left = y;
        y->right = x;
        x->parent = y;
    }

    void fixInsert(Node* z) {
        while (z->parent && z->parent->color == RED) {
            Node* gp = z->parent->parent;
            if (z->parent == gp->left) {
                Node* uncle = gp->right;
                if (uncle->color == RED) {
                    z->parent->color = uncle->color = BLACK;
                    gp->color = RED;
                    z = gp;
                } else {
                    if (z == z->parent->right) { z = z->parent; rotateLeft(z); }
                    z->parent->color = BLACK;
                    gp->color = RED;
                    rotateRight(gp);
                }
            } else {
                Node* uncle = gp->left;
                if (uncle->color == RED) {
                    z->parent->color = uncle->color = BLACK;
                    gp->color = RED;
                    z = gp;
                } else {
                    if (z == z->parent->left) { z = z->parent; rotateRight(z); }
                    z->parent->color = BLACK;
                    gp->color = RED;
                    rotateLeft(gp);
                }
            }
        }
        root->color = BLACK;
    }

public:
    RedBlackTree() {
        NIL = new Node(0, BLACK);
        root = NIL;
    }

    void insert(int key) {
        Node* node = new Node(key, RED);
        node->left = node->right = NIL;
        Node *parent = nullptr, *cur = root;
        while (cur != NIL) {
            parent = cur;
            cur = key < cur->key ? cur->left : cur->right;
        }
        node->parent = parent;
        if (!parent) root = node;
        else if (key < parent->key) parent->left = node;
        else parent->right = node;
        fixInsert(node);
    }
};`,
      },
      {
        id: 'snip-red-black-tree-java',
        topic_id: 'ext-red-black-tree',
        language: 'java',
        is_optimized: true,
        explanation: 'Java red-black tree insertion with a black NIL sentinel and standard rotation fix-up.',
        code: `public class RedBlackTree {
    static final boolean RED = true, BLACK = false;

    static class Node {
        int key;
        boolean color;
        Node left, right, parent;
        Node(int key, boolean color) { this.key = key; this.color = color; }
    }

    private final Node NIL = new Node(0, BLACK);
    private Node root = NIL;

    private void rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        if (y.left != NIL) y.left.parent = x;
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.left) x.parent.left = y;
        else x.parent.right = y;
        y.left = x;
        x.parent = y;
    }

    private void rotateRight(Node x) {
        Node y = x.left;
        x.left = y.right;
        if (y.right != NIL) y.right.parent = x;
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.right) x.parent.right = y;
        else x.parent.left = y;
        y.right = x;
        x.parent = y;
    }

    public void insert(int key) {
        Node node = new Node(key, RED);
        node.left = node.right = NIL;
        Node parent = null, cur = root;
        while (cur != NIL) {
            parent = cur;
            cur = key < cur.key ? cur.left : cur.right;
        }
        node.parent = parent;
        if (parent == null) root = node;
        else if (key < parent.key) parent.left = node;
        else parent.right = node;
        fixInsert(node);
    }

    private void fixInsert(Node z) {
        while (z.parent != null && z.parent.color == RED) {
            Node gp = z.parent.parent;
            if (z.parent == gp.left) {
                Node uncle = gp.right;
                if (uncle.color == RED) {
                    z.parent.color = uncle.color = BLACK;
                    gp.color = RED;
                    z = gp;
                } else {
                    if (z == z.parent.right) { z = z.parent; rotateLeft(z); }
                    z.parent.color = BLACK;
                    gp.color = RED;
                    rotateRight(gp);
                }
            } else {
                Node uncle = gp.left;
                if (uncle.color == RED) {
                    z.parent.color = uncle.color = BLACK;
                    gp.color = RED;
                    z = gp;
                } else {
                    if (z == z.parent.left) { z = z.parent; rotateRight(z); }
                    z.parent.color = BLACK;
                    gp.color = RED;
                    rotateLeft(gp);
                }
            }
        }
        root.color = BLACK;
    }
}`,
      },
    ],
    quizId: 'quiz-ext-red-black-tree',
    quizTitle: 'Red-Black Tree Quiz',
    quizDescription: 'Test your understanding of red-black tree invariants, rotations, and balancing guarantees.',
    questions: [
      {
        id: 'q-red-black-tree-1',
        quiz_id: 'quiz-ext-red-black-tree',
        question_text: 'Which color is always assigned to a newly inserted node before the fix-up runs?',
        question_type: 'MCQ',
        options: ['Black', 'Red', 'Whichever color the parent is', 'It alternates each insert'],
        correct_option_index: 1,
        explanation: 'New nodes are colored red because that never violates the equal black-height rule; only a possible red-red conflict must be repaired.',
      },
      {
        id: 'q-red-black-tree-2',
        quiz_id: 'quiz-ext-red-black-tree',
        question_text: 'In a red-black tree, the longest root-to-leaf path can be at most twice the length of the shortest such path.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Because black-heights are equal and no two reds are adjacent, the longest path (alternating red/black) is at most twice the shortest (all black).',
      },
      {
        id: 'q-red-black-tree-3',
        quiz_id: 'quiz-ext-red-black-tree',
        question_text: 'What is the worst-case time complexity of searching in a red-black tree with n nodes?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correct_option_index: 1,
        explanation: 'The height is bounded by 2*log2(n+1), so search, insert, and delete are all O(log n) in the worst case.',
      },
    ],
  },
  // 2. B-TREE
  {
    topic: {
      id: 'ext-b-tree',
      slug: 'b-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'B-Tree',
      definition: 'A B-tree is a self-balancing multiway search tree in which every node can hold multiple keys and children, all leaves sit at the same depth, and each node (except the root) stays between half-full and full, making it ideal for block-oriented storage.',
      importance: 'B-trees minimize disk and cache I/O by packing many keys per node, which is why they underpin relational database indexes and filesystems such as NTFS, ext4, and Btrfs.',
      prerequisites: ['binary-search-tree'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(log n)',
      time_complexity_average: 'O(log n)',
      time_complexity_worst: 'O(log n)',
      space_complexity: 'O(n)',
      display_order: 301,
    },
    sections: [
      {
        id: 'sec-b-tree-1',
        topic_id: 'ext-b-tree',
        title: 'Concept & Intuition',
        content: `When data lives on disk, the dominant cost is not comparisons but **fetching a block** from storage. A binary tree with a million keys is about 20 levels deep, meaning up to 20 slow disk reads per lookup. A B-tree fixes this by letting each node hold hundreds of keys, so the tree becomes short and wide.

The trick: pick a node size that matches a disk page (e.g. 4 KB). One read pulls in one node containing many keys, and a tree of a million keys might be only 3 levels tall.

> [!NOTE]
> B-trees trade a little in-node scanning (fast, in RAM) for far fewer node fetches (slow, from disk). This is the classic memory-hierarchy optimization.`,
        display_order: 1,
      },
      {
        id: 'sec-b-tree-2',
        topic_id: 'ext-b-tree',
        title: 'Order, Splitting & Merging',
        content: `A B-tree of **minimum degree** $t$ satisfies:
- Every node holds between $t-1$ and $2t-1$ keys (the root may hold as few as 1).
- An internal node with $k$ keys has exactly $k+1$ children.
- Keys within a node are sorted, and all leaves are at the same depth.

**Insertion** descends to the correct leaf. If it encounters a full node ($2t-1$ keys) on the way down, it *splits* it: the median key moves up into the parent, and the node divides into two halves. This proactive splitting guarantees the parent always has room.

**Deletion** may leave a node with too few keys ($< t-1$); it then *borrows* a key from a sibling or *merges* with one, pulling a separator key down from the parent.`,
        display_order: 2,
      },
      {
        id: 'sec-b-tree-3',
        topic_id: 'ext-b-tree',
        title: 'Height & Complexity',
        content: `Because each node has at least $t$ children (except the root), a B-tree with $n$ keys has height:
$$h \\le \\log_t \\frac{n+1}{2}$$

Search, insert, and delete each visit $O(h) = O(\\log_t n)$ nodes, and within each node a scan or binary search over its keys is $O(t)$ work. In big-O terms every operation is $O(\\log n)$.

The real win is **I/O complexity**: the number of disk reads equals the height, $O(\\log_t n)$. Increasing $t$ (larger nodes) flattens the tree, so databases choose $t$ so that a node fills a page, minimizing the number of page fetches.`,
        display_order: 3,
      },
      {
        id: 'sec-b-tree-4',
        topic_id: 'ext-b-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> A common mistake is splitting a full node *only when it overflows*. The standard top-down algorithm splits any full node it passes through on the way down, so the parent is guaranteed to have space and no cascading is needed.

Considerations:
- Choosing $t$ too small wastes the disk-page advantage; too large wastes memory bandwidth scanning nodes.
- B-trees store data (values) in every node, unlike B+ trees which keep all values in the leaves.

**Use cases:** database indexes (before B+ trees became standard), key-value stores, and filesystem metadata where minimizing disk seeks is critical.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-b-tree-py',
        topic_id: 'ext-b-tree',
        language: 'python',
        is_optimized: true,
        explanation: 'B-tree with top-down insertion that splits full children before descending.',
        code: `class BTreeNode:
    def __init__(self, leaf=True):
        self.keys = []
        self.children = []
        self.leaf = leaf

class BTree:
    def __init__(self, t):
        self.t = t
        self.root = BTreeNode(leaf=True)

    def search(self, key, node=None):
        node = node or self.root
        i = 0
        while i < len(node.keys) and key > node.keys[i]:
            i += 1
        if i < len(node.keys) and node.keys[i] == key:
            return (node, i)
        if node.leaf:
            return None
        return self.search(key, node.children[i])

    def _split_child(self, parent, i):
        t = self.t
        child = parent.children[i]
        new = BTreeNode(leaf=child.leaf)
        parent.keys.insert(i, child.keys[t - 1])
        parent.children.insert(i + 1, new)
        new.keys = child.keys[t:]
        child.keys = child.keys[:t - 1]
        if not child.leaf:
            new.children = child.children[t:]
            child.children = child.children[:t]

    def insert(self, key):
        root = self.root
        if len(root.keys) == 2 * self.t - 1:
            new_root = BTreeNode(leaf=False)
            new_root.children.append(root)
            self.root = new_root
            self._split_child(new_root, 0)
            self._insert_nonfull(new_root, key)
        else:
            self._insert_nonfull(root, key)

    def _insert_nonfull(self, node, key):
        i = len(node.keys) - 1
        if node.leaf:
            node.keys.append(None)
            while i >= 0 and key < node.keys[i]:
                node.keys[i + 1] = node.keys[i]
                i -= 1
            node.keys[i + 1] = key
        else:
            while i >= 0 and key < node.keys[i]:
                i -= 1
            i += 1
            if len(node.children[i].keys) == 2 * self.t - 1:
                self._split_child(node, i)
                if key > node.keys[i]:
                    i += 1
            self._insert_nonfull(node.children[i], key)`,
      },
      {
        id: 'snip-b-tree-js',
        topic_id: 'ext-b-tree',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript B-tree using proactive child splitting during a top-down insert.',
        code: `class BTreeNode {
  constructor(leaf = true) {
    this.keys = [];
    this.children = [];
    this.leaf = leaf;
  }
}

class BTree {
  constructor(t) {
    this.t = t;
    this.root = new BTreeNode(true);
  }

  search(key, node = this.root) {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) i++;
    if (i < node.keys.length && node.keys[i] === key) return { node, i };
    if (node.leaf) return null;
    return this.search(key, node.children[i]);
  }

  splitChild(parent, i) {
    const t = this.t;
    const child = parent.children[i];
    const created = new BTreeNode(child.leaf);
    parent.keys.splice(i, 0, child.keys[t - 1]);
    parent.children.splice(i + 1, 0, created);
    created.keys = child.keys.splice(t);
    child.keys.length = t - 1;
    if (!child.leaf) created.children = child.children.splice(t);
  }

  insert(key) {
    const root = this.root;
    if (root.keys.length === 2 * this.t - 1) {
      const newRoot = new BTreeNode(false);
      newRoot.children.push(root);
      this.root = newRoot;
      this.splitChild(newRoot, 0);
      this.insertNonFull(newRoot, key);
    } else {
      this.insertNonFull(root, key);
    }
  }

  insertNonFull(node, key) {
    let i = node.keys.length - 1;
    if (node.leaf) {
      while (i >= 0 && key < node.keys[i]) i--;
      node.keys.splice(i + 1, 0, key);
    } else {
      while (i >= 0 && key < node.keys[i]) i--;
      i++;
      if (node.children[i].keys.length === 2 * this.t - 1) {
        this.splitChild(node, i);
        if (key > node.keys[i]) i++;
      }
      this.insertNonFull(node.children[i], key);
    }
  }
}`,
      },
      {
        id: 'snip-b-tree-cpp',
        topic_id: 'ext-b-tree',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ B-tree of minimum degree t with recursive top-down insert and split.',
        code: `#include <vector>
using namespace std;

struct BTreeNode {
    vector<int> keys;
    vector<BTreeNode*> children;
    bool leaf;
    BTreeNode(bool l) : leaf(l) {}
};

class BTree {
    BTreeNode* root;
    int t;

    void splitChild(BTreeNode* parent, int i) {
        BTreeNode* child = parent->children[i];
        BTreeNode* created = new BTreeNode(child->leaf);
        parent->keys.insert(parent->keys.begin() + i, child->keys[t - 1]);
        parent->children.insert(parent->children.begin() + i + 1, created);
        created->keys.assign(child->keys.begin() + t, child->keys.end());
        child->keys.resize(t - 1);
        if (!child->leaf) {
            created->children.assign(child->children.begin() + t, child->children.end());
            child->children.resize(t);
        }
    }

    void insertNonFull(BTreeNode* node, int key) {
        int i = node->keys.size() - 1;
        if (node->leaf) {
            node->keys.push_back(0);
            while (i >= 0 && key < node->keys[i]) {
                node->keys[i + 1] = node->keys[i];
                i--;
            }
            node->keys[i + 1] = key;
        } else {
            while (i >= 0 && key < node->keys[i]) i--;
            i++;
            if ((int)node->children[i]->keys.size() == 2 * t - 1) {
                splitChild(node, i);
                if (key > node->keys[i]) i++;
            }
            insertNonFull(node->children[i], key);
        }
    }

public:
    BTree(int deg) : t(deg) { root = new BTreeNode(true); }

    void insert(int key) {
        if ((int)root->keys.size() == 2 * t - 1) {
            BTreeNode* newRoot = new BTreeNode(false);
            newRoot->children.push_back(root);
            root = newRoot;
            splitChild(newRoot, 0);
        }
        insertNonFull(root, key);
    }
};`,
      },
      {
        id: 'snip-b-tree-java',
        topic_id: 'ext-b-tree',
        language: 'java',
        is_optimized: true,
        explanation: 'Java B-tree with minimum degree t performing proactive splits on the way down.',
        code: `import java.util.ArrayList;
import java.util.List;

public class BTree {
    static class Node {
        List<Integer> keys = new ArrayList<>();
        List<Node> children = new ArrayList<>();
        boolean leaf;
        Node(boolean leaf) { this.leaf = leaf; }
    }

    private Node root;
    private final int t;

    public BTree(int t) {
        this.t = t;
        this.root = new Node(true);
    }

    private void splitChild(Node parent, int i) {
        Node child = parent.children.get(i);
        Node created = new Node(child.leaf);
        parent.keys.add(i, child.keys.get(t - 1));
        parent.children.add(i + 1, created);
        for (int j = t; j < child.keys.size(); j++) created.keys.add(child.keys.get(j));
        if (!child.leaf)
            for (int j = t; j < child.children.size(); j++) created.children.add(child.children.get(j));
        while (child.keys.size() > t - 1) child.keys.remove(child.keys.size() - 1);
        if (!child.leaf)
            while (child.children.size() > t) child.children.remove(child.children.size() - 1);
    }

    private void insertNonFull(Node node, int key) {
        int i = node.keys.size() - 1;
        if (node.leaf) {
            while (i >= 0 && key < node.keys.get(i)) i--;
            node.keys.add(i + 1, key);
        } else {
            while (i >= 0 && key < node.keys.get(i)) i--;
            i++;
            if (node.children.get(i).keys.size() == 2 * t - 1) {
                splitChild(node, i);
                if (key > node.keys.get(i)) i++;
            }
            insertNonFull(node.children.get(i), key);
        }
    }

    public void insert(int key) {
        if (root.keys.size() == 2 * t - 1) {
            Node newRoot = new Node(false);
            newRoot.children.add(root);
            root = newRoot;
            splitChild(newRoot, 0);
        }
        insertNonFull(root, key);
    }
}`,
      },
    ],
    quizId: 'quiz-ext-b-tree',
    quizTitle: 'B-Tree Quiz',
    quizDescription: 'Test your understanding of B-tree order, node splitting, and its role in disk-based storage.',
    questions: [
      {
        id: 'q-b-tree-1',
        quiz_id: 'quiz-ext-b-tree',
        question_text: 'In a B-tree of minimum degree t, what is the maximum number of keys a single node may hold?',
        question_type: 'MCQ',
        options: ['t', 't - 1', '2t - 1', '2t'],
        correct_option_index: 2,
        explanation: 'Each node holds between t-1 and 2t-1 keys; reaching 2t-1 makes it full and eligible for a split.',
      },
      {
        id: 'q-b-tree-2',
        quiz_id: 'quiz-ext-b-tree',
        question_text: 'All leaves in a B-tree are always at the same depth.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Because growth happens by splitting the root, every leaf stays at the same level, keeping the tree perfectly height-balanced.',
      },
      {
        id: 'q-b-tree-3',
        quiz_id: 'quiz-ext-b-tree',
        question_text: 'What is the number of disk reads required for a search in a B-tree with n keys and minimum degree t?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log_t n)', 'O(t)', 'O(n)'],
        correct_option_index: 1,
        explanation: 'One node is read per level, and the height is O(log_t n), so search cost is dominated by that many disk reads.',
      },
    ],
  },
  // 3. B+ TREE
  {
    topic: {
      id: 'ext-b-plus-tree',
      slug: 'b-plus-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'B+ Tree',
      definition: 'A B+ tree is a variant of the B-tree in which all data records are stored only in the leaf nodes, internal nodes hold only routing keys, and the leaves are linked together in a sorted chain to support fast range scans.',
      importance: 'B+ trees are the default index structure in virtually every relational database and many filesystems because their linked leaves make range queries and sequential scans extremely efficient while keeping point lookups logarithmic.',
      prerequisites: ['b-tree'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(log n)',
      time_complexity_average: 'O(log n)',
      time_complexity_worst: 'O(log n)',
      space_complexity: 'O(n)',
      display_order: 302,
    },
    sections: [
      {
        id: 'sec-b-plus-tree-1',
        topic_id: 'ext-b-plus-tree',
        title: 'Concept & Intuition',
        content: `A B+ tree keeps the short, wide shape of a B-tree but reorganizes *where* data lives. Internal nodes become a pure **index**: they store only separator keys that guide the search downward. Every actual record sits in a **leaf**, and all leaves are chained together in sorted order like a linked list.

This separation has two big payoffs. First, because internal nodes carry no data payload, they fit more keys per page, so the tree is even shallower. Second, once a search reaches the correct starting leaf, a range query simply walks the leaf chain sideways instead of climbing back up and down the tree.

> [!NOTE]
> "SELECT * WHERE age BETWEEN 20 AND 30" becomes: find the first matching leaf in $O(\\log n)$, then follow \`next\` pointers until you pass 30.`,
        display_order: 1,
      },
      {
        id: 'sec-b-plus-tree-2',
        topic_id: 'ext-b-plus-tree',
        title: 'Structure & Key Duplication',
        content: `Two rules distinguish a B+ tree from a B-tree:
1. **All values live in leaves.** Internal nodes hold only copies of keys used as routing separators.
2. **Leaves form a linked list.** Each leaf points to its right neighbor (sometimes doubly linked).

Because separators are copies, a key can appear both in an internal node and in a leaf; this is expected, not a bug. When a leaf overflows during insertion, it splits and the *smallest key of the new right leaf is copied up* into the parent as a separator (the key itself remains in the leaf).

Contrast this with a B-tree split, where the median key *moves* up and no longer exists in a child. In a B+ tree the promoted separator is a copy, preserving the invariant that all real data stays in the leaves.`,
        display_order: 2,
      },
      {
        id: 'sec-b-plus-tree-3',
        topic_id: 'ext-b-plus-tree',
        title: 'Complexity & Range Queries',
        content: `Point operations mirror a B-tree: search, insert, and delete are all $O(\\log n)$, and the number of disk reads equals the height $O(\\log_t n)$.

The standout is **range queries**. To return all $k$ keys in $[a, b]$:
$$O(\\log n + k)$$
You pay $O(\\log n)$ to locate the first leaf $\\ge a$, then $O(k)$ to walk the linked leaves collecting results until you exceed $b$. No repeated root-to-leaf descents are needed.

Because internal nodes hold no records, the fan-out (children per node) is higher than an equivalent B-tree, giving a slightly shorter tree and better cache/disk utilization for the same page size.`,
        display_order: 3,
      },
      {
        id: 'sec-b-plus-tree-4',
        topic_id: 'ext-b-plus-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Do not confuse the copied separator keys with duplicated data. Updating a record only touches the leaf; the separator copy in an internal node is just a routing signpost and never stores a value.

Considerations:
- Deletion must maintain the leaf linked list; when a leaf merges, remember to re-splice neighbor pointers.
- Sequential inserts (monotonically increasing keys) can cause right-edge hot spots; some engines use fill-factor tuning to mitigate this.

**Use cases:** primary and secondary indexes in MySQL InnoDB, PostgreSQL, SQLite, Oracle, and filesystems like NTFS and Btrfs, where both point lookups and range scans matter.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-b-plus-tree-py',
        topic_id: 'ext-b-plus-tree',
        language: 'python',
        is_optimized: true,
        explanation: 'B+ tree with linked leaves supporting point insert and O(log n + k) range scans.',
        code: `class Node:
    def __init__(self, leaf=True):
        self.leaf = leaf
        self.keys = []
        self.children = []   # child nodes (internal) or values (leaf)
        self.next = None     # leaf-chain pointer

class BPlusTree:
    def __init__(self, order=4):
        self.order = order
        self.root = Node(leaf=True)

    def _find_leaf(self, key):
        node = self.root
        while not node.leaf:
            i = 0
            while i < len(node.keys) and key >= node.keys[i]:
                i += 1
            node = node.children[i]
        return node

    def insert(self, key, value):
        leaf = self._find_leaf(key)
        i = 0
        while i < len(leaf.keys) and leaf.keys[i] < key:
            i += 1
        leaf.keys.insert(i, key)
        leaf.children.insert(i, value)
        if len(leaf.keys) >= self.order:
            self._split_leaf(leaf)

    def _split_leaf(self, leaf):
        mid = len(leaf.keys) // 2
        new = Node(leaf=True)
        new.keys = leaf.keys[mid:]
        new.children = leaf.children[mid:]
        leaf.keys = leaf.keys[:mid]
        leaf.children = leaf.children[:mid]
        new.next = leaf.next
        leaf.next = new
        self._insert_in_parent(leaf, new.keys[0], new)

    def _insert_in_parent(self, left, key, right):
        if left is self.root:
            root = Node(leaf=False)
            root.keys = [key]
            root.children = [left, right]
            self.root = root
            return
        parent = self._find_parent(self.root, left)
        i = parent.children.index(left)
        parent.keys.insert(i, key)
        parent.children.insert(i + 1, right)
        if len(parent.keys) >= self.order:
            self._split_internal(parent)

    def _split_internal(self, node):
        mid = len(node.keys) // 2
        up = node.keys[mid]
        new = Node(leaf=False)
        new.keys = node.keys[mid + 1:]
        new.children = node.children[mid + 1:]
        node.keys = node.keys[:mid]
        node.children = node.children[:mid + 1]
        self._insert_in_parent(node, up, new)

    def _find_parent(self, node, child):
        if node.leaf or node.children[0].leaf:
            return node if child in node.children else None
        for c in node.children:
            found = self._find_parent(c, child)
            if found:
                return found
        return None

    def range_query(self, low, high):
        leaf = self._find_leaf(low)
        result = []
        while leaf:
            for k, v in zip(leaf.keys, leaf.children):
                if low <= k <= high:
                    result.append((k, v))
                elif k > high:
                    return result
            leaf = leaf.next
        return result`,
      },
      {
        id: 'snip-b-plus-tree-js',
        topic_id: 'ext-b-plus-tree',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript B+ tree keeping records in linked leaves for efficient range scans.',
        code: `class Node {
  constructor(leaf = true) {
    this.leaf = leaf;
    this.keys = [];
    this.children = [];
    this.next = null;
  }
}

class BPlusTree {
  constructor(order = 4) {
    this.order = order;
    this.root = new Node(true);
  }

  findLeaf(key) {
    let node = this.root;
    while (!node.leaf) {
      let i = 0;
      while (i < node.keys.length && key >= node.keys[i]) i++;
      node = node.children[i];
    }
    return node;
  }

  insert(key, value) {
    const leaf = this.findLeaf(key);
    let i = 0;
    while (i < leaf.keys.length && leaf.keys[i] < key) i++;
    leaf.keys.splice(i, 0, key);
    leaf.children.splice(i, 0, value);
    if (leaf.keys.length >= this.order) this.splitLeaf(leaf);
  }

  splitLeaf(leaf) {
    const mid = Math.floor(leaf.keys.length / 2);
    const created = new Node(true);
    created.keys = leaf.keys.splice(mid);
    created.children = leaf.children.splice(mid);
    created.next = leaf.next;
    leaf.next = created;
    this.insertInParent(leaf, created.keys[0], created);
  }

  insertInParent(left, key, right) {
    if (left === this.root) {
      const root = new Node(false);
      root.keys = [key];
      root.children = [left, right];
      this.root = root;
      return;
    }
    const parent = this.findParent(this.root, left);
    const i = parent.children.indexOf(left);
    parent.keys.splice(i, 0, key);
    parent.children.splice(i + 1, 0, right);
    if (parent.keys.length >= this.order) this.splitInternal(parent);
  }

  splitInternal(node) {
    const mid = Math.floor(node.keys.length / 2);
    const up = node.keys[mid];
    const created = new Node(false);
    created.keys = node.keys.slice(mid + 1);
    created.children = node.children.slice(mid + 1);
    node.keys = node.keys.slice(0, mid);
    node.children = node.children.slice(0, mid + 1);
    this.insertInParent(node, up, created);
  }

  findParent(node, child) {
    if (node.leaf || node.children[0].leaf) {
      return node.children.includes(child) ? node : null;
    }
    for (const c of node.children) {
      const found = this.findParent(c, child);
      if (found) return found;
    }
    return null;
  }

  rangeQuery(low, high) {
    let leaf = this.findLeaf(low);
    const result = [];
    while (leaf) {
      for (let i = 0; i < leaf.keys.length; i++) {
        const k = leaf.keys[i];
        if (k >= low && k <= high) result.push([k, leaf.children[i]]);
        else if (k > high) return result;
      }
      leaf = leaf.next;
    }
    return result;
  }
}`,
      },
      {
        id: 'snip-b-plus-tree-cpp',
        topic_id: 'ext-b-plus-tree',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ B+ tree with leaf chaining and O(log n + k) range queries.',
        code: `#include <vector>
#include <algorithm>
using namespace std;

struct Node {
    bool leaf;
    vector<int> keys;
    vector<Node*> children;   // internal children
    vector<int> values;       // leaf values
    Node* next = nullptr;
    Node(bool l) : leaf(l) {}
};

class BPlusTree {
    Node* root;
    int order;

    Node* findLeaf(int key) {
        Node* node = root;
        while (!node->leaf) {
            int i = 0;
            while (i < (int)node->keys.size() && key >= node->keys[i]) i++;
            node = node->children[i];
        }
        return node;
    }

    Node* findParent(Node* node, Node* child) {
        if (node->leaf || node->children[0]->leaf) {
            for (Node* c : node->children) if (c == child) return node;
            return nullptr;
        }
        for (Node* c : node->children) {
            Node* f = findParent(c, child);
            if (f) return f;
        }
        return nullptr;
    }

    void insertInParent(Node* left, int key, Node* right) {
        if (left == root) {
            Node* r = new Node(false);
            r->keys = {key};
            r->children = {left, right};
            root = r;
            return;
        }
        Node* parent = findParent(root, left);
        int i = find(parent->children.begin(), parent->children.end(), left) - parent->children.begin();
        parent->keys.insert(parent->keys.begin() + i, key);
        parent->children.insert(parent->children.begin() + i + 1, right);
        if ((int)parent->keys.size() >= order) splitInternal(parent);
    }

    void splitInternal(Node* node) {
        int mid = node->keys.size() / 2;
        int up = node->keys[mid];
        Node* created = new Node(false);
        created->keys.assign(node->keys.begin() + mid + 1, node->keys.end());
        created->children.assign(node->children.begin() + mid + 1, node->children.end());
        node->keys.resize(mid);
        node->children.resize(mid + 1);
        insertInParent(node, up, created);
    }

    void splitLeaf(Node* leaf) {
        int mid = leaf->keys.size() / 2;
        Node* created = new Node(true);
        created->keys.assign(leaf->keys.begin() + mid, leaf->keys.end());
        created->values.assign(leaf->values.begin() + mid, leaf->values.end());
        leaf->keys.resize(mid);
        leaf->values.resize(mid);
        created->next = leaf->next;
        leaf->next = created;
        insertInParent(leaf, created->keys[0], created);
    }

public:
    BPlusTree(int o = 4) : order(o) { root = new Node(true); }

    void insert(int key, int value) {
        Node* leaf = findLeaf(key);
        int i = 0;
        while (i < (int)leaf->keys.size() && leaf->keys[i] < key) i++;
        leaf->keys.insert(leaf->keys.begin() + i, key);
        leaf->values.insert(leaf->values.begin() + i, value);
        if ((int)leaf->keys.size() >= order) splitLeaf(leaf);
    }

    vector<pair<int,int>> rangeQuery(int low, int high) {
        Node* leaf = findLeaf(low);
        vector<pair<int,int>> result;
        while (leaf) {
            for (int i = 0; i < (int)leaf->keys.size(); i++) {
                int k = leaf->keys[i];
                if (k >= low && k <= high) result.push_back({k, leaf->values[i]});
                else if (k > high) return result;
            }
            leaf = leaf->next;
        }
        return result;
    }
};`,
      },
      {
        id: 'snip-b-plus-tree-java',
        topic_id: 'ext-b-plus-tree',
        language: 'java',
        is_optimized: true,
        explanation: 'Java B+ tree storing records in linked leaves with logarithmic inserts and range scans.',
        code: `import java.util.ArrayList;
import java.util.List;

public class BPlusTree {
    static class Node {
        boolean leaf;
        List<Integer> keys = new ArrayList<>();
        List<Node> children = new ArrayList<>();
        List<Integer> values = new ArrayList<>();
        Node next;
        Node(boolean leaf) { this.leaf = leaf; }
    }

    private Node root;
    private final int order;

    public BPlusTree(int order) {
        this.order = order;
        this.root = new Node(true);
    }

    private Node findLeaf(int key) {
        Node node = root;
        while (!node.leaf) {
            int i = 0;
            while (i < node.keys.size() && key >= node.keys.get(i)) i++;
            node = node.children.get(i);
        }
        return node;
    }

    private Node findParent(Node node, Node child) {
        if (node.leaf || node.children.get(0).leaf) {
            return node.children.contains(child) ? node : null;
        }
        for (Node c : node.children) {
            Node f = findParent(c, child);
            if (f != null) return f;
        }
        return null;
    }

    private void insertInParent(Node left, int key, Node right) {
        if (left == root) {
            Node r = new Node(false);
            r.keys.add(key);
            r.children.add(left);
            r.children.add(right);
            root = r;
            return;
        }
        Node parent = findParent(root, left);
        int i = parent.children.indexOf(left);
        parent.keys.add(i, key);
        parent.children.add(i + 1, right);
        if (parent.keys.size() >= order) splitInternal(parent);
    }

    private void splitInternal(Node node) {
        int mid = node.keys.size() / 2;
        int up = node.keys.get(mid);
        Node created = new Node(false);
        created.keys.addAll(node.keys.subList(mid + 1, node.keys.size()));
        created.children.addAll(node.children.subList(mid + 1, node.children.size()));
        node.keys.subList(mid, node.keys.size()).clear();
        node.children.subList(mid + 1, node.children.size()).clear();
        insertInParent(node, up, created);
    }

    private void splitLeaf(Node leaf) {
        int mid = leaf.keys.size() / 2;
        Node created = new Node(true);
        created.keys.addAll(leaf.keys.subList(mid, leaf.keys.size()));
        created.values.addAll(leaf.values.subList(mid, leaf.values.size()));
        leaf.keys.subList(mid, leaf.keys.size()).clear();
        leaf.values.subList(mid, leaf.values.size()).clear();
        created.next = leaf.next;
        leaf.next = created;
        insertInParent(leaf, created.keys.get(0), created);
    }

    public void insert(int key, int value) {
        Node leaf = findLeaf(key);
        int i = 0;
        while (i < leaf.keys.size() && leaf.keys.get(i) < key) i++;
        leaf.keys.add(i, key);
        leaf.values.add(i, value);
        if (leaf.keys.size() >= order) splitLeaf(leaf);
    }
}`,
      },
    ],
    quizId: 'quiz-ext-b-plus-tree',
    quizTitle: 'B+ Tree Quiz',
    quizDescription: 'Test your understanding of B+ tree structure, leaf linking, and range-query efficiency.',
    questions: [
      {
        id: 'q-b-plus-tree-1',
        quiz_id: 'quiz-ext-b-plus-tree',
        question_text: 'Where are the actual data records stored in a B+ tree?',
        question_type: 'MCQ',
        options: ['Only in the root', 'In every node', 'Only in the leaf nodes', 'In the internal nodes only'],
        correct_option_index: 2,
        explanation: 'B+ trees keep all records in the leaves; internal nodes hold only routing separator keys.',
      },
      {
        id: 'q-b-plus-tree-2',
        quiz_id: 'quiz-ext-b-plus-tree',
        question_text: 'The linked leaf nodes of a B+ tree make range queries more efficient than in a standard B-tree.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'After locating the first leaf, a range scan simply follows the leaf chain sideways instead of repeatedly descending from the root.',
      },
      {
        id: 'q-b-plus-tree-3',
        quiz_id: 'quiz-ext-b-plus-tree',
        question_text: 'What is the time complexity of returning all k keys within a range [a, b] from a B+ tree of n keys?',
        question_type: 'COMPLEXITY',
        options: ['O(k)', 'O(log n)', 'O(log n + k)', 'O(n)'],
        correct_option_index: 2,
        explanation: 'Finding the first matching leaf costs O(log n), then walking the linked leaves to collect k results costs O(k).',
      },
    ],
  },
  // 4. TRIE (PREFIX TREE)
  {
    topic: {
      id: 'ext-trie-prefix-tree',
      slug: 'trie-prefix-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Trie (Prefix Tree)',
      definition: 'A trie is a tree where each edge represents a character and each path from the root spells out a string prefix, so words sharing a common prefix share the same initial path and lookups depend on key length rather than the number of stored keys.',
      importance: 'Tries provide prefix-based search, autocomplete, spell-checking, and IP routing with time proportional to the length of the query rather than the size of the dataset, and they naturally group words by shared prefixes.',
      prerequisites: ['tree'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(L)',
      time_complexity_average: 'O(L)',
      time_complexity_worst: 'O(L)',
      space_complexity: 'O(N * L)',
      display_order: 303,
    },
    sections: [
      {
        id: 'sec-trie-prefix-tree-1',
        topic_id: 'ext-trie-prefix-tree',
        title: 'Concept & Intuition',
        content: `Imagine storing a dictionary. A hash set can tell you if "cat" exists, but it cannot cheaply answer "how many words start with *ca*?" A **trie** solves this by storing strings *character by character* along tree paths.

The root represents the empty string. Each edge is labeled with a character, so walking from the root down to some node spells a prefix. Words that share a prefix share the same path until they diverge. A boolean flag on a node marks whether the prefix spelled so far is a complete word.

> [!NOTE]
> "trie" comes from re**trie**val. Because the shape depends only on the stored strings, unrelated keys never collide the way they might in a hash table.`,
        display_order: 1,
      },
      {
        id: 'sec-trie-prefix-tree-2',
        topic_id: 'ext-trie-prefix-tree',
        title: 'Insert, Search & Prefix Matching',
        content: `Each node holds a map (or fixed array) from a character to a child node, plus an \`isEnd\` flag.

**Insert(word):** start at the root; for each character, follow the existing child or create a new one. After the last character, set \`isEnd = true\`.

**Search(word):** walk the same path; if any character is missing, the word is absent. Return true only if the final node has \`isEnd = true\`.

**startsWith(prefix):** identical to search but return true as soon as the prefix path exists, regardless of \`isEnd\`.

This is exactly why tries power autocomplete: reach the prefix node in $O(L)$, then enumerate the subtree to list all completions.`,
        display_order: 2,
      },
      {
        id: 'sec-trie-prefix-tree-3',
        topic_id: 'ext-trie-prefix-tree',
        title: 'Complexity & Trade-offs',
        content: `Let $L$ be the length of the key and $\\Sigma$ the alphabet size.

- **Time:** insert, search, and prefix check are all $O(L)$, completely independent of how many words $N$ are stored. Compare this to a balanced BST of strings at $O(L \\log N)$.
- **Space:** the worst case is $O(N \\cdot L \\cdot \\Sigma)$ if every node uses a fixed array of size $\\Sigma$; using hash maps per node reduces this to $O(\\text{total characters})$.

The time win is significant for large dictionaries, but the memory cost can be high. Compressed variants (radix trees / Patricia tries) merge chains of single-child nodes to save space.`,
        display_order: 3,
      },
      {
        id: 'sec-trie-prefix-tree-4',
        topic_id: 'ext-trie-prefix-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Deleting a word is not just clearing the \`isEnd\` flag. To reclaim memory you must remove nodes bottom-up, but only those that have no other children and are not the end of another word. Removing a shared prefix node would delete unrelated words.

Considerations:
- Fixed-array nodes waste space for sparse alphabets (e.g. Unicode); prefer hash maps there.
- Tries do not maintain sorted order automatically unless you traverse children in sorted key order.

**Use cases:** autocomplete and search suggestions, spell checkers, IP routing tables (longest-prefix match), and dictionary/word-game solvers.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-trie-prefix-tree-py',
        topic_id: 'ext-trie-prefix-tree',
        language: 'python',
        is_optimized: true,
        explanation: 'Dictionary-backed trie supporting insert, exact search, and prefix matching in O(L).',
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._walk(prefix) is not None

    def _walk(self, s):
        node = self.root
        for ch in s:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node`,
      },
      {
        id: 'snip-trie-prefix-tree-js',
        topic_id: 'ext-trie-prefix-tree',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript trie using Map-based children for insert, search, and prefix queries.',
        code: `class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  search(word) {
    const node = this.walk(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix) {
    return this.walk(prefix) !== null;
  }

  walk(s) {
    let node = this.root;
    for (const ch of s) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch);
    }
    return node;
  }
}`,
      },
      {
        id: 'snip-trie-prefix-tree-cpp',
        topic_id: 'ext-trie-prefix-tree',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ trie with unordered_map children supporting insert, search, and startsWith.',
        code: `#include <string>
#include <unordered_map>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};

class Trie {
    TrieNode* root;

    TrieNode* walk(const string& s) {
        TrieNode* node = root;
        for (char ch : s) {
            auto it = node->children.find(ch);
            if (it == node->children.end()) return nullptr;
            node = it->second;
        }
        return node;
    }

public:
    Trie() { root = new TrieNode(); }

    void insert(const string& word) {
        TrieNode* node = root;
        for (char ch : word) {
            if (!node->children.count(ch))
                node->children[ch] = new TrieNode();
            node = node->children[ch];
        }
        node->isEnd = true;
    }

    bool search(const string& word) {
        TrieNode* node = walk(word);
        return node != nullptr && node->isEnd;
    }

    bool startsWith(const string& prefix) {
        return walk(prefix) != nullptr;
    }
};`,
      },
      {
        id: 'snip-trie-prefix-tree-java',
        topic_id: 'ext-trie-prefix-tree',
        language: 'java',
        is_optimized: true,
        explanation: 'Java trie using a HashMap of children for O(L) insert, search, and prefix checks.',
        code: `import java.util.HashMap;
import java.util.Map;

public class Trie {
    static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isEnd = false;
    }

    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        for (char ch : word.toCharArray()) {
            node = node.children.computeIfAbsent(ch, c -> new TrieNode());
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode node = walk(word);
        return node != null && node.isEnd;
    }

    public boolean startsWith(String prefix) {
        return walk(prefix) != null;
    }

    private TrieNode walk(String s) {
        TrieNode node = root;
        for (char ch : s.toCharArray()) {
            node = node.children.get(ch);
            if (node == null) return null;
        }
        return node;
    }
}`,
      },
    ],
    quizId: 'quiz-ext-trie-prefix-tree',
    quizTitle: 'Trie (Prefix Tree) Quiz',
    quizDescription: 'Test your understanding of trie structure, prefix search, and length-based complexity.',
    questions: [
      {
        id: 'q-trie-prefix-tree-1',
        quiz_id: 'quiz-ext-trie-prefix-tree',
        question_text: 'What does the time complexity of searching for a word of length L in a trie depend on?',
        question_type: 'MCQ',
        options: ['The number of words stored (N)', 'The length of the word (L)', 'The alphabet size only', 'N times L'],
        correct_option_index: 1,
        explanation: 'A trie search walks one node per character, so it is O(L) and independent of how many words are stored.',
      },
      {
        id: 'q-trie-prefix-tree-2',
        quiz_id: 'quiz-ext-trie-prefix-tree',
        question_text: 'A node in a trie needs an "is end of word" flag because a stored word may be a prefix of another stored word.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Without the flag you could not distinguish "car" being a stored word from it merely being a prefix of "card".',
      },
      {
        id: 'q-trie-prefix-tree-3',
        quiz_id: 'quiz-ext-trie-prefix-tree',
        question_text: 'What is the time complexity of the startsWith(prefix) operation for a prefix of length L?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(L)', 'O(N)', 'O(N log N)'],
        correct_option_index: 1,
        explanation: 'It walks one node per prefix character and returns as soon as the path exists, giving O(L).',
      },
    ],
  },
  // 5. SEGMENT TREE
  {
    topic: {
      id: 'ext-segment-tree',
      slug: 'segment-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Segment Tree',
      definition: 'A segment tree is a binary tree built over an array where each node stores an aggregate (such as sum, min, or max) of a contiguous range, enabling both range queries and point/range updates in logarithmic time.',
      importance: 'Segment trees are a cornerstone of competitive programming and any application needing fast, repeated range aggregate queries with updates, offering O(log n) operations where a naive array scan would be O(n).',
      prerequisites: ['array', 'tree'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(log n)',
      time_complexity_average: 'O(log n)',
      time_complexity_worst: 'O(log n)',
      space_complexity: 'O(n)',
      display_order: 304,
    },
    sections: [
      {
        id: 'sec-segment-tree-1',
        topic_id: 'ext-segment-tree',
        title: 'Concept & Intuition',
        content: `Suppose you repeatedly need the **sum of elements between indices $l$ and $r$** of an array, and the array keeps changing. Recomputing each query costs $O(n)$. A prefix-sum array answers queries in $O(1)$ but breaks on updates (each update is $O(n)$). A segment tree gives the best of both: $O(\\log n)$ for *both* query and update.

The idea is divide-and-conquer frozen into a tree. The root covers the whole array $[0, n-1]$. Each node splits its range in half, storing the aggregate of its segment. Leaves correspond to single elements.

> [!NOTE]
> Any query range can be assembled from at most $O(\\log n)$ precomputed node segments, which is why queries are logarithmic.`,
        display_order: 1,
      },
      {
        id: 'sec-segment-tree-2',
        topic_id: 'ext-segment-tree',
        title: 'Build, Query & Update',
        content: `The tree is usually stored in a flat array of size $2n$ to $4n$. For a node at index \`i\` covering $[lo, hi]$, its children are \`2i\` and \`2i+1\` splitting at $mid = (lo+hi)/2$.

**Build** recursively: a leaf stores the array element; an internal node stores \`combine(left, right)\` (e.g. sum or min). This is $O(n)$.

**Query(l, r):** recurse from the root. If a node's range is fully inside $[l, r]$, return its stored value. If disjoint, return the identity (0 for sum, $+\\infty$ for min). Otherwise recurse into both children and combine. This touches $O(\\log n)$ nodes.

**Update(i, v):** go to the leaf for index $i$, change it, then walk back up recombining ancestors, again $O(\\log n)$.`,
        display_order: 2,
      },
      {
        id: 'sec-segment-tree-3',
        topic_id: 'ext-segment-tree',
        title: 'Complexity & Lazy Propagation',
        content: `- **Build:** $O(n)$ time, $O(n)$ space (a $4n$ array safely covers any $n$).
- **Point update / range query:** $O(\\log n)$ each.

For **range updates** (e.g. "add 5 to every element in $[l, r]$"), naive point updates would be $O(n \\log n)$. **Lazy propagation** fixes this: instead of updating every affected leaf immediately, a node records a pending update in a \`lazy\` array and pushes it down to children only when they are next visited.

$$\\text{Range update} = \\text{Range query} = O(\\log n)$$

Lazy propagation keeps both range updates and range queries logarithmic, making segment trees far more powerful than Fenwick trees for non-invertible operations like range-min.`,
        display_order: 3,
      },
      {
        id: 'sec-segment-tree-4',
        topic_id: 'ext-segment-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Allocate the underlying array as size $4n$, not $2n$. A tree that is not a perfect power of two can push node indices beyond $2n$, causing out-of-bounds errors.

Considerations:
- The combine function must be *associative* (sum, min, max, gcd). Non-associative operations do not decompose cleanly.
- Forgetting to push down lazy values before recursing into children yields stale query results.
- A Fenwick tree is simpler and smaller if you only need prefix sums with point updates.

**Use cases:** range sum/min/max queries with updates, competitive programming, computational geometry (sweep-line), and interval scheduling analytics.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-segment-tree-py',
        topic_id: 'ext-segment-tree',
        language: 'python',
        is_optimized: true,
        explanation: 'Recursive sum segment tree with O(n) build, O(log n) point update and range query.',
        code: `class SegmentTree:
    def __init__(self, data):
        self.n = len(data)
        self.tree = [0] * (4 * self.n)
        if self.n:
            self._build(data, 1, 0, self.n - 1)

    def _build(self, data, node, lo, hi):
        if lo == hi:
            self.tree[node] = data[lo]
            return
        mid = (lo + hi) // 2
        self._build(data, 2 * node, lo, mid)
        self._build(data, 2 * node + 1, mid + 1, hi)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def update(self, idx, value):
        self._update(1, 0, self.n - 1, idx, value)

    def _update(self, node, lo, hi, idx, value):
        if lo == hi:
            self.tree[node] = value
            return
        mid = (lo + hi) // 2
        if idx <= mid:
            self._update(2 * node, lo, mid, idx, value)
        else:
            self._update(2 * node + 1, mid + 1, hi, idx, value)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, l, r):
        return self._query(1, 0, self.n - 1, l, r)

    def _query(self, node, lo, hi, l, r):
        if r < lo or hi < l:
            return 0
        if l <= lo and hi <= r:
            return self.tree[node]
        mid = (lo + hi) // 2
        return self._query(2 * node, lo, mid, l, r) + \\
               self._query(2 * node + 1, mid + 1, hi, l, r)`,
      },
      {
        id: 'snip-segment-tree-js',
        topic_id: 'ext-segment-tree',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript sum segment tree supporting point updates and range-sum queries in O(log n).',
        code: `class SegmentTree {
  constructor(data) {
    this.n = data.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n) this.build(data, 1, 0, this.n - 1);
  }

  build(data, node, lo, hi) {
    if (lo === hi) {
      this.tree[node] = data[lo];
      return;
    }
    const mid = (lo + hi) >> 1;
    this.build(data, 2 * node, lo, mid);
    this.build(data, 2 * node + 1, mid + 1, hi);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  update(idx, value, node = 1, lo = 0, hi = this.n - 1) {
    if (lo === hi) {
      this.tree[node] = value;
      return;
    }
    const mid = (lo + hi) >> 1;
    if (idx <= mid) this.update(idx, value, 2 * node, lo, mid);
    else this.update(idx, value, 2 * node + 1, mid + 1, hi);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  query(l, r, node = 1, lo = 0, hi = this.n - 1) {
    if (r < lo || hi < l) return 0;
    if (l <= lo && hi <= r) return this.tree[node];
    const mid = (lo + hi) >> 1;
    return this.query(l, r, 2 * node, lo, mid) +
           this.query(l, r, 2 * node + 1, mid + 1, hi);
  }
}`,
      },
      {
        id: 'snip-segment-tree-cpp',
        topic_id: 'ext-segment-tree',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ sum segment tree with recursive build, point update, and range query in O(log n).',
        code: `#include <vector>
using namespace std;

class SegmentTree {
    vector<long long> tree;
    int n;

    void build(const vector<int>& data, int node, int lo, int hi) {
        if (lo == hi) { tree[node] = data[lo]; return; }
        int mid = (lo + hi) / 2;
        build(data, 2 * node, lo, mid);
        build(data, 2 * node + 1, mid + 1, hi);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    void update(int node, int lo, int hi, int idx, int value) {
        if (lo == hi) { tree[node] = value; return; }
        int mid = (lo + hi) / 2;
        if (idx <= mid) update(2 * node, lo, mid, idx, value);
        else update(2 * node + 1, mid + 1, hi, idx, value);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    long long query(int node, int lo, int hi, int l, int r) {
        if (r < lo || hi < l) return 0;
        if (l <= lo && hi <= r) return tree[node];
        int mid = (lo + hi) / 2;
        return query(2 * node, lo, mid, l, r) +
               query(2 * node + 1, mid + 1, hi, l, r);
    }

public:
    SegmentTree(const vector<int>& data) {
        n = data.size();
        tree.assign(4 * n, 0);
        if (n) build(data, 1, 0, n - 1);
    }

    void update(int idx, int value) { update(1, 0, n - 1, idx, value); }
    long long query(int l, int r) { return query(1, 0, n - 1, l, r); }
};`,
      },
      {
        id: 'snip-segment-tree-java',
        topic_id: 'ext-segment-tree',
        language: 'java',
        is_optimized: true,
        explanation: 'Java sum segment tree with O(n) build and O(log n) point update and range query.',
        code: `public class SegmentTree {
    private final long[] tree;
    private final int n;

    public SegmentTree(int[] data) {
        n = data.length;
        tree = new long[4 * n];
        if (n > 0) build(data, 1, 0, n - 1);
    }

    private void build(int[] data, int node, int lo, int hi) {
        if (lo == hi) { tree[node] = data[lo]; return; }
        int mid = (lo + hi) / 2;
        build(data, 2 * node, lo, mid);
        build(data, 2 * node + 1, mid + 1, hi);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public void update(int idx, int value) { update(1, 0, n - 1, idx, value); }

    private void update(int node, int lo, int hi, int idx, int value) {
        if (lo == hi) { tree[node] = value; return; }
        int mid = (lo + hi) / 2;
        if (idx <= mid) update(2 * node, lo, mid, idx, value);
        else update(2 * node + 1, mid + 1, hi, idx, value);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public long query(int l, int r) { return query(1, 0, n - 1, l, r); }

    private long query(int node, int lo, int hi, int l, int r) {
        if (r < lo || hi < l) return 0;
        if (l <= lo && hi <= r) return tree[node];
        int mid = (lo + hi) / 2;
        return query(2 * node, lo, mid, l, r)
             + query(2 * node + 1, mid + 1, hi, l, r);
    }
}`,
      },
    ],
    quizId: 'quiz-ext-segment-tree',
    quizTitle: 'Segment Tree Quiz',
    quizDescription: 'Test your understanding of segment tree construction, range queries, and updates.',
    questions: [
      {
        id: 'q-segment-tree-1',
        quiz_id: 'quiz-ext-segment-tree',
        question_text: 'What technique lets a segment tree perform range updates in O(log n) instead of O(n log n)?',
        question_type: 'MCQ',
        options: ['Path compression', 'Lazy propagation', 'Rebalancing rotations', 'Memoization'],
        correct_option_index: 1,
        explanation: 'Lazy propagation defers pending range updates in a lazy array and pushes them down only when children are visited.',
      },
      {
        id: 'q-segment-tree-2',
        quiz_id: 'quiz-ext-segment-tree',
        question_text: 'The combine (merge) function used in a segment tree must be associative.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Because a query range is split across multiple node segments and recombined, the operation must be associative (e.g. sum, min, max, gcd).',
      },
      {
        id: 'q-segment-tree-3',
        quiz_id: 'quiz-ext-segment-tree',
        question_text: 'What is the time complexity of a range query on a segment tree over n elements?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correct_option_index: 1,
        explanation: 'A query range decomposes into at most O(log n) node segments, so it visits only that many nodes.',
      },
    ],
  },
  // 6. FENWICK TREE (BINARY INDEXED TREE)
  {
    topic: {
      id: 'ext-fenwick-tree-binary-indexed-tree',
      slug: 'fenwick-tree-binary-indexed-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Fenwick Tree (Binary Indexed Tree)',
      definition: 'A Fenwick tree, or binary indexed tree, is a compact array-based structure that maintains cumulative frequencies so that prefix-sum queries and point updates each run in logarithmic time by exploiting the binary representation of indices.',
      importance: 'It offers the same O(log n) prefix-sum and update performance as a segment tree but with far less code and memory, making it the go-to choice for cumulative frequency and inversion-counting problems.',
      prerequisites: ['array'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(log n)',
      time_complexity_average: 'O(log n)',
      time_complexity_worst: 'O(log n)',
      space_complexity: 'O(n)',
      display_order: 305,
    },
    sections: [
      {
        id: 'sec-fenwick-tree-binary-indexed-tree-1',
        topic_id: 'ext-fenwick-tree-binary-indexed-tree',
        title: 'Concept & Intuition',
        content: `A Fenwick tree answers the same "prefix sum with updates" question as a segment tree, but with a startlingly simple array of size $n+1$. The key insight lives in the **binary representation of indices**.

Each index $i$ is made responsible for a range of elements whose length equals $2^{r}$, where $2^{r}$ is the value of the *lowest set bit* of $i$. For example, index $12 = 1100_2$ has a lowest set bit of $4$, so it covers 4 elements ending at position 12.

> [!NOTE]
> A prefix sum up to $i$ is assembled by repeatedly stripping the lowest set bit off $i$ and summing the responsible buckets — at most $O(\\log n)$ of them.`,
        display_order: 1,
      },
      {
        id: 'sec-fenwick-tree-binary-indexed-tree-2',
        topic_id: 'ext-fenwick-tree-binary-indexed-tree',
        title: 'The Lowbit Trick',
        content: `Everything hinges on isolating the lowest set bit: $\\text{lowbit}(i) = i \\,\\&\\, (-i)$. Two's-complement negation flips all bits and adds one, so ANDing $i$ with $-i$ leaves only the lowest 1-bit.

**Prefix query(i):** sum \`tree[i]\`, then move to \`i -= lowbit(i)\` and repeat until $i = 0$. Each step clears one bit, so it runs in $O(\\log n)$.

**Point update(i, delta):** add \`delta\` to \`tree[i]\`, then move to \`i += lowbit(i)\` and repeat while $i \\le n$. This walks the buckets whose ranges contain position $i$.

A range sum $[l, r]$ is simply $\\text{query}(r) - \\text{query}(l-1)$, exploiting the invertibility of addition (this is why Fenwick trees suit sums but not min/max).`,
        display_order: 2,
      },
      {
        id: 'sec-fenwick-tree-binary-indexed-tree-3',
        topic_id: 'ext-fenwick-tree-binary-indexed-tree',
        title: 'Complexity & Comparison',
        content: `- **Space:** exactly $O(n)$ — a single array of $n+1$ longs, roughly 4x smaller than a typical segment tree.
- **Update / prefix query:** $O(\\log n)$, since each strips or adds one bit at a time.
- **Build:** $O(n)$ with the in-place technique (propagate each element to its immediate parent), or $O(n \\log n)$ by inserting one at a time.

Compared to a segment tree, a Fenwick tree is shorter to code, uses less memory, and has a smaller constant factor. The trade-off: it naturally supports only **invertible, associative** operations (sum, xor). For range-min or range-max you need a segment tree because you cannot "subtract" a minimum.`,
        display_order: 3,
      },
      {
        id: 'sec-fenwick-tree-binary-indexed-tree-4',
        topic_id: 'ext-fenwick-tree-binary-indexed-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Fenwick trees are almost always **1-indexed**. Using index 0 breaks the loop because \`lowbit(0) = 0\`, causing an infinite loop on query or a no-op on update. Shift all external indices by +1.

Considerations:
- Only invertible operations work directly; range-min queries need a segment tree instead.
- Range updates with range queries require two Fenwick trees (a well-known extension).

**Use cases:** counting inversions during merge-like analysis, cumulative frequency tables, order-statistics ("how many elements so far are $\\le x$"), and any competitive-programming task needing prefix sums with updates.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-fenwick-tree-binary-indexed-tree-py',
        topic_id: 'ext-fenwick-tree-binary-indexed-tree',
        language: 'python',
        is_optimized: true,
        explanation: '1-indexed Fenwick tree using the lowbit trick for O(log n) update and prefix sum.',
        code: `class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

    def range_query(self, l, r):
        return self.query(r) - self.query(l - 1)

    @classmethod
    def from_array(cls, arr):
        ft = cls(len(arr))
        for idx, val in enumerate(arr, start=1):
            ft.tree[idx] += val
            parent = idx + (idx & (-idx))
            if parent <= ft.n:
                ft.tree[parent] += ft.tree[idx]
        return ft`,
      },
      {
        id: 'snip-fenwick-tree-binary-indexed-tree-js',
        topic_id: 'ext-fenwick-tree-binary-indexed-tree',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript 1-indexed binary indexed tree with point update and prefix-sum query.',
        code: `class FenwickTree {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0);
  }

  update(i, delta) {
    for (; i <= this.n; i += i & -i) {
      this.tree[i] += delta;
    }
  }

  query(i) {
    let s = 0;
    for (; i > 0; i -= i & -i) {
      s += this.tree[i];
    }
    return s;
  }

  rangeQuery(l, r) {
    return this.query(r) - this.query(l - 1);
  }
}`,
      },
      {
        id: 'snip-fenwick-tree-binary-indexed-tree-cpp',
        topic_id: 'ext-fenwick-tree-binary-indexed-tree',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ Fenwick tree (BIT) using i & -i for logarithmic update and prefix sum.',
        code: `#include <vector>
using namespace std;

class FenwickTree {
    vector<long long> tree;
    int n;

public:
    FenwickTree(int size) : n(size) {
        tree.assign(n + 1, 0);
    }

    void update(int i, long long delta) {
        for (; i <= n; i += i & (-i))
            tree[i] += delta;
    }

    long long query(int i) {
        long long s = 0;
        for (; i > 0; i -= i & (-i))
            s += tree[i];
        return s;
    }

    long long rangeQuery(int l, int r) {
        return query(r) - query(l - 1);
    }
};`,
      },
      {
        id: 'snip-fenwick-tree-binary-indexed-tree-java',
        topic_id: 'ext-fenwick-tree-binary-indexed-tree',
        language: 'java',
        is_optimized: true,
        explanation: 'Java 1-indexed Fenwick tree with O(log n) update and prefix-sum query via lowbit.',
        code: `public class FenwickTree {
    private final long[] tree;
    private final int n;

    public FenwickTree(int n) {
        this.n = n;
        this.tree = new long[n + 1];
    }

    public void update(int i, long delta) {
        for (; i <= n; i += i & (-i))
            tree[i] += delta;
    }

    public long query(int i) {
        long s = 0;
        for (; i > 0; i -= i & (-i))
            s += tree[i];
        return s;
    }

    public long rangeQuery(int l, int r) {
        return query(r) - query(l - 1);
    }
}`,
      },
    ],
    quizId: 'quiz-ext-fenwick-tree-binary-indexed-tree',
    quizTitle: 'Fenwick Tree Quiz',
    quizDescription: 'Test your understanding of binary indexed trees, the lowbit trick, and prefix-sum queries.',
    questions: [
      {
        id: 'q-fenwick-tree-binary-indexed-tree-1',
        quiz_id: 'quiz-ext-fenwick-tree-binary-indexed-tree',
        question_text: 'Which expression isolates the lowest set bit of an index i in a Fenwick tree?',
        question_type: 'MCQ',
        options: ['i | (i - 1)', 'i & (-i)', 'i ^ (i - 1)', 'i >> 1'],
        correct_option_index: 1,
        explanation: 'i & (-i) uses two-complement negation to keep only the lowest set bit, driving both update and query loops.',
      },
      {
        id: 'q-fenwick-tree-binary-indexed-tree-2',
        quiz_id: 'quiz-ext-fenwick-tree-binary-indexed-tree',
        question_text: 'A Fenwick tree can directly support range-minimum queries the same way it supports range-sum queries.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Range queries via query(r) - query(l-1) rely on invertibility; minimum is not invertible, so range-min needs a segment tree.',
      },
      {
        id: 'q-fenwick-tree-binary-indexed-tree-3',
        quiz_id: 'quiz-ext-fenwick-tree-binary-indexed-tree',
        question_text: 'What is the time complexity of a prefix-sum query in a Fenwick tree of n elements?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correct_option_index: 1,
        explanation: 'Each step strips one bit off the index, so the loop runs at most log2(n) times, giving O(log n).',
      },
    ],
  },
  // 7. HEAP / PRIORITY QUEUE
  {
    topic: {
      id: 'ext-heap-priority-queue',
      slug: 'heap',
      category_id: CATEGORY_IDS.trees,
      title: 'Heap / Priority Queue',
      definition: 'A binary heap is a complete binary tree, usually stored in an array, that satisfies the heap property so the highest-priority element is always at the root; it is the standard implementation of a priority queue supporting logarithmic insertion and extraction.',
      importance: 'Priority queues drive Dijkstra shortest paths, Prim minimum spanning trees, event-driven simulations, task schedulers, and heap sort, wherever the next item to process is the current minimum or maximum.',
      prerequisites: ['array', 'tree'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) peek',
      time_complexity_average: 'O(log n) push/pop',
      time_complexity_worst: 'O(log n) push/pop',
      space_complexity: 'O(n)',
      display_order: 306,
    },
    sections: [
      {
        id: 'sec-heap-priority-queue-1',
        topic_id: 'ext-heap-priority-queue',
        title: 'Concept & Intuition',
        content: `A **priority queue** is an abstract structure where you always remove the element with the highest priority next, not the one that arrived first. Think of a hospital emergency room: the most critical patient is seen before others regardless of arrival order.

The **binary heap** is the classic efficient implementation. It is a *complete* binary tree (every level full except possibly the last, which fills left to right) obeying the **heap property**: in a min-heap every parent is $\\le$ its children, so the minimum sits at the root.

> [!NOTE]
> Because the tree is complete, it maps perfectly onto a flat array with no gaps and no pointers — the structure is implicit in the indices.`,
        display_order: 1,
      },
      {
        id: 'sec-heap-priority-queue-2',
        topic_id: 'ext-heap-priority-queue',
        title: 'Array Layout & Sift Operations',
        content: `Store the heap in a 0-indexed array. For the node at index $i$:
$$\\text{parent}(i) = \\lfloor (i-1)/2 \\rfloor, \\quad \\text{left}(i) = 2i+1, \\quad \\text{right}(i) = 2i+2$$

**Push (sift-up):** append the new element at the end, then repeatedly swap it with its parent while it violates the heap property. At most $O(\\log n)$ swaps.

**Pop (sift-down):** the root is the answer; move the last element to the root, shrink the array, then repeatedly swap it with its smaller child until the property holds again. Also $O(\\log n)$.

**Peek** returns the root in $O(1)$.`,
        display_order: 2,
      },
      {
        id: 'sec-heap-priority-queue-3',
        topic_id: 'ext-heap-priority-queue',
        title: 'Complexity & Heapify',
        content: `- **peek:** $O(1)$
- **push / pop:** $O(\\log n)$ (one root-to-leaf path of swaps)
- **build-heap (heapify an existing array):** $O(n)$, not $O(n \\log n)$

The linear build-heap result is surprising but real: sift-down each node from the last internal node up to the root. Nodes near the bottom (most numerous) need almost no work, and the summed cost telescopes to $O(n)$.

$$\\sum_{h=0}^{\\log n} \\frac{n}{2^{h+1}} \\cdot O(h) = O(n)$$

This is why **heap sort** runs in $O(n \\log n)$: build in $O(n)$, then pop $n$ times at $O(\\log n)$ each.`,
        display_order: 3,
      },
      {
        id: 'sec-heap-priority-queue-4',
        topic_id: 'ext-heap-priority-queue',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> A heap is only *partially* ordered. Do not assume the array is sorted or that the second-smallest element is at index 1 — it is merely one of the root's children. Iterating the array does not yield sorted order.

Considerations:
- Searching for an arbitrary value is $O(n)$; heaps optimize min/max access, not lookup.
- To support "decrease-key" (needed by Dijkstra) efficiently, keep a position map or use a lazy-deletion trick.

**Use cases:** Dijkstra and Prim algorithms, heap sort, task/event schedulers, top-K selection, and median maintenance (two heaps).`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-heap-priority-queue-py',
        topic_id: 'ext-heap-priority-queue',
        language: 'python',
        is_optimized: true,
        explanation: 'Array-based binary min-heap with O(log n) push/pop and O(1) peek.',
        code: `class MinHeap:
    def __init__(self):
        self.data = []

    def peek(self):
        return self.data[0] if self.data else None

    def push(self, value):
        self.data.append(value)
        self._sift_up(len(self.data) - 1)

    def pop(self):
        if not self.data:
            return None
        top = self.data[0]
        last = self.data.pop()
        if self.data:
            self.data[0] = last
            self._sift_down(0)
        return top

    def _sift_up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.data[i] < self.data[parent]:
                self.data[i], self.data[parent] = self.data[parent], self.data[i]
                i = parent
            else:
                break

    def _sift_down(self, i):
        n = len(self.data)
        while True:
            smallest = i
            left, right = 2 * i + 1, 2 * i + 2
            if left < n and self.data[left] < self.data[smallest]:
                smallest = left
            if right < n and self.data[right] < self.data[smallest]:
                smallest = right
            if smallest == i:
                break
            self.data[i], self.data[smallest] = self.data[smallest], self.data[i]
            i = smallest`,
      },
      {
        id: 'snip-heap-priority-queue-js',
        topic_id: 'ext-heap-priority-queue',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript binary min-heap priority queue using array index arithmetic.',
        code: `class MinHeap {
  constructor() {
    this.data = [];
  }

  peek() {
    return this.data.length ? this.data[0] : null;
  }

  push(value) {
    this.data.push(value);
    this.siftUp(this.data.length - 1);
  }

  pop() {
    if (!this.data.length) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  siftUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.data[i] < this.data[parent]) {
        [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
        i = parent;
      } else break;
    }
  }

  siftDown(i) {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1, right = 2 * i + 2;
      if (left < n && this.data[left] < this.data[smallest]) smallest = left;
      if (right < n && this.data[right] < this.data[smallest]) smallest = right;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}`,
      },
      {
        id: 'snip-heap-priority-queue-cpp',
        topic_id: 'ext-heap-priority-queue',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ binary min-heap with manual sift-up and sift-down over a vector.',
        code: `#include <vector>
#include <stdexcept>
using namespace std;

class MinHeap {
    vector<int> data;

    void siftUp(int i) {
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (data[i] < data[parent]) {
                swap(data[i], data[parent]);
                i = parent;
            } else break;
        }
    }

    void siftDown(int i) {
        int n = data.size();
        while (true) {
            int smallest = i, left = 2 * i + 1, right = 2 * i + 2;
            if (left < n && data[left] < data[smallest]) smallest = left;
            if (right < n && data[right] < data[smallest]) smallest = right;
            if (smallest == i) break;
            swap(data[i], data[smallest]);
            i = smallest;
        }
    }

public:
    int peek() const {
        if (data.empty()) throw runtime_error("empty heap");
        return data[0];
    }

    void push(int value) {
        data.push_back(value);
        siftUp(data.size() - 1);
    }

    int pop() {
        if (data.empty()) throw runtime_error("empty heap");
        int top = data[0];
        data[0] = data.back();
        data.pop_back();
        if (!data.empty()) siftDown(0);
        return top;
    }
};`,
      },
      {
        id: 'snip-heap-priority-queue-java',
        topic_id: 'ext-heap-priority-queue',
        language: 'java',
        is_optimized: true,
        explanation: 'Java array-backed binary min-heap priority queue with logarithmic push and pop.',
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

public class MinHeap {
    private final List<Integer> data = new ArrayList<>();

    public int peek() {
        if (data.isEmpty()) throw new NoSuchElementException();
        return data.get(0);
    }

    public void push(int value) {
        data.add(value);
        siftUp(data.size() - 1);
    }

    public int pop() {
        if (data.isEmpty()) throw new NoSuchElementException();
        int top = data.get(0);
        int last = data.remove(data.size() - 1);
        if (!data.isEmpty()) {
            data.set(0, last);
            siftDown(0);
        }
        return top;
    }

    private void siftUp(int i) {
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (data.get(i) < data.get(parent)) {
                swap(i, parent);
                i = parent;
            } else break;
        }
    }

    private void siftDown(int i) {
        int n = data.size();
        while (true) {
            int smallest = i, left = 2 * i + 1, right = 2 * i + 2;
            if (left < n && data.get(left) < data.get(smallest)) smallest = left;
            if (right < n && data.get(right) < data.get(smallest)) smallest = right;
            if (smallest == i) break;
            swap(i, smallest);
            i = smallest;
        }
    }

    private void swap(int a, int b) {
        int tmp = data.get(a);
        data.set(a, data.get(b));
        data.set(b, tmp);
    }
}`,
      },
    ],
    quizId: 'quiz-ext-heap-priority-queue',
    quizTitle: 'Heap / Priority Queue Quiz',
    quizDescription: 'Test your understanding of the heap property, array indexing, and priority-queue operations.',
    questions: [
      {
        id: 'q-heap-priority-queue-1',
        quiz_id: 'quiz-ext-heap-priority-queue',
        question_text: 'In a 0-indexed array-based binary heap, what is the index of the left child of node i?',
        question_type: 'MCQ',
        options: ['2i', '2i + 1', '2i + 2', 'i / 2'],
        correct_option_index: 1,
        explanation: 'With 0-based indexing the children of i are 2i+1 (left) and 2i+2 (right); the parent is floor((i-1)/2).',
      },
      {
        id: 'q-heap-priority-queue-2',
        quiz_id: 'quiz-ext-heap-priority-queue',
        question_text: 'Building a heap from an unsorted array of n elements takes O(n) time, not O(n log n).',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Bottom-up sift-down gives a telescoping sum bounded by O(n); most nodes are near the bottom and need little work.',
      },
      {
        id: 'q-heap-priority-queue-3',
        quiz_id: 'quiz-ext-heap-priority-queue',
        question_text: 'What is the time complexity of extracting the minimum (pop) from a binary heap of n elements?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correct_option_index: 1,
        explanation: 'After moving the last element to the root, sift-down follows one root-to-leaf path of length O(log n).',
      },
    ],
  },
  // 8. MAX-HEAP
  {
    topic: {
      id: 'ext-max-heap',
      slug: 'max-heap',
      category_id: CATEGORY_IDS.trees,
      title: 'Max-Heap',
      definition: 'A max-heap is a complete binary tree stored in an array where every parent node is greater than or equal to its children, so the maximum element always resides at the root and can be read in constant time.',
      importance: 'Max-heaps underpin heap sort, top-K maximum queries, and any scheduler or selection problem that repeatedly needs the largest remaining element in logarithmic time.',
      prerequisites: ['heap'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) peek',
      time_complexity_average: 'O(log n) push/pop',
      time_complexity_worst: 'O(log n) push/pop',
      space_complexity: 'O(n)',
      display_order: 307,
    },
    sections: [
      {
        id: 'sec-max-heap-1',
        topic_id: 'ext-max-heap',
        title: 'Concept & Intuition',
        content: `A **max-heap** is the mirror image of a min-heap. It is still a *complete* binary tree stored compactly in an array, but the ordering rule flips: **every parent is $\\ge$ both of its children**. As a consequence the *largest* element bubbles to the root and can be read in $O(1)$.

Use a max-heap whenever "the biggest thing next" is the natural question: the largest pending job, the highest score, the top bid. Only the comparison direction changes from a min-heap; the array layout and sift logic are otherwise identical.

> [!NOTE]
> Many libraries provide only a min-heap. A common trick is to store negated values (or reversed comparators) to simulate a max-heap without writing new code.`,
        display_order: 1,
      },
      {
        id: 'sec-max-heap-2',
        topic_id: 'ext-max-heap',
        title: 'Sift Operations & Heapify',
        content: `The index math is unchanged from any binary heap: for node $i$, children are $2i+1$ and $2i+2$, parent is $\\lfloor (i-1)/2 \\rfloor$.

**Push (sift-up):** append at the end, then swap upward while the new value is *greater* than its parent.

**Pop-max (sift-down):** the root holds the max; move the last element to the root and sift down, swapping with the *larger* child until the parent dominates both children.

**Heapify (build-max-heap):** call sift-down on every internal node from index $\\lfloor n/2 \\rfloor - 1$ down to $0$. This converts an arbitrary array into a valid max-heap in $O(n)$.`,
        display_order: 2,
      },
      {
        id: 'sec-max-heap-3',
        topic_id: 'ext-max-heap',
        title: 'Complexity & Heap Sort',
        content: `- **peek-max:** $O(1)$
- **push / pop-max:** $O(\\log n)$
- **build-max-heap:** $O(n)$

The max-heap is the engine of **heap sort**. Build a max-heap in $O(n)$, then repeatedly swap the root (current maximum) with the last element, shrink the heap by one, and sift down the new root. Each of the $n$ extractions costs $O(\\log n)$:
$$O(n) + n \\cdot O(\\log n) = O(n \\log n)$$

Heap sort sorts **in place** with $O(1)$ extra space and a guaranteed $O(n \\log n)$ worst case, unlike quicksort which can degrade to $O(n^2)$.`,
        display_order: 3,
      },
      {
        id: 'sec-max-heap-4',
        topic_id: 'ext-max-heap',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> When you swap the root with the last element during heap sort, you must exclude that final slot from subsequent sift-downs. Forgetting to shrink the logical heap size re-mixes already-sorted elements back in.

Considerations:
- Heap sort is not *stable*: equal keys may be reordered.
- For "top K largest" it is often cheaper to keep a size-K *min*-heap than to build a full max-heap of all elements.

**Use cases:** heap sort, selecting the K largest elements, priority scheduling by highest priority, and streaming maximum tracking.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-max-heap-py',
        topic_id: 'ext-max-heap',
        language: 'python',
        is_optimized: true,
        explanation: 'Max-heap with O(n) build-heap plus in-place heap sort returning ascending order.',
        code: `class MaxHeap:
    def __init__(self, data=None):
        self.data = list(data) if data else []
        for i in range(len(self.data) // 2 - 1, -1, -1):
            self._sift_down(i, len(self.data))

    def push(self, value):
        self.data.append(value)
        self._sift_up(len(self.data) - 1)

    def pop(self):
        if not self.data:
            return None
        top = self.data[0]
        last = self.data.pop()
        if self.data:
            self.data[0] = last
            self._sift_down(0, len(self.data))
        return top

    def _sift_up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.data[i] > self.data[parent]:
                self.data[i], self.data[parent] = self.data[parent], self.data[i]
                i = parent
            else:
                break

    def _sift_down(self, i, size):
        while True:
            largest = i
            left, right = 2 * i + 1, 2 * i + 2
            if left < size and self.data[left] > self.data[largest]:
                largest = left
            if right < size and self.data[right] > self.data[largest]:
                largest = right
            if largest == i:
                break
            self.data[i], self.data[largest] = self.data[largest], self.data[i]
            i = largest

def heap_sort(arr):
    h = MaxHeap(arr)
    for end in range(len(h.data) - 1, 0, -1):
        h.data[0], h.data[end] = h.data[end], h.data[0]
        h._sift_down(0, end)
    return h.data`,
      },
      {
        id: 'snip-max-heap-js',
        topic_id: 'ext-max-heap',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript max-heap with build-heap and an in-place heap sort helper.',
        code: `class MaxHeap {
  constructor(data = []) {
    this.data = [...data];
    for (let i = (this.data.length >> 1) - 1; i >= 0; i--) {
      this.siftDown(i, this.data.length);
    }
  }

  push(value) {
    this.data.push(value);
    this.siftUp(this.data.length - 1);
  }

  pop() {
    if (!this.data.length) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length) {
      this.data[0] = last;
      this.siftDown(0, this.data.length);
    }
    return top;
  }

  siftUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.data[i] > this.data[parent]) {
        [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
        i = parent;
      } else break;
    }
  }

  siftDown(i, size) {
    while (true) {
      let largest = i;
      const left = 2 * i + 1, right = 2 * i + 2;
      if (left < size && this.data[left] > this.data[largest]) largest = left;
      if (right < size && this.data[right] > this.data[largest]) largest = right;
      if (largest === i) break;
      [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
      i = largest;
    }
  }
}

function heapSort(arr) {
  const h = new MaxHeap(arr);
  for (let end = h.data.length - 1; end > 0; end--) {
    [h.data[0], h.data[end]] = [h.data[end], h.data[0]];
    h.siftDown(0, end);
  }
  return h.data;
}`,
      },
      {
        id: 'snip-max-heap-cpp',
        topic_id: 'ext-max-heap',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ max-heap over a vector with build-heap constructor and in-place heap sort.',
        code: `#include <vector>
using namespace std;

class MaxHeap {
    vector<int> data;

    void siftUp(int i) {
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (data[i] > data[parent]) { swap(data[i], data[parent]); i = parent; }
            else break;
        }
    }

    void siftDown(int i, int size) {
        while (true) {
            int largest = i, left = 2 * i + 1, right = 2 * i + 2;
            if (left < size && data[left] > data[largest]) largest = left;
            if (right < size && data[right] > data[largest]) largest = right;
            if (largest == i) break;
            swap(data[i], data[largest]);
            i = largest;
        }
    }

public:
    MaxHeap(vector<int> init = {}) : data(init) {
        for (int i = (int)data.size() / 2 - 1; i >= 0; i--)
            siftDown(i, data.size());
    }

    void push(int value) { data.push_back(value); siftUp(data.size() - 1); }

    int pop() {
        int top = data[0];
        data[0] = data.back();
        data.pop_back();
        if (!data.empty()) siftDown(0, data.size());
        return top;
    }

    vector<int> sorted() {
        for (int end = (int)data.size() - 1; end > 0; end--) {
            swap(data[0], data[end]);
            siftDown(0, end);
        }
        return data;
    }
};`,
      },
      {
        id: 'snip-max-heap-java',
        topic_id: 'ext-max-heap',
        language: 'java',
        is_optimized: true,
        explanation: 'Java in-place max-heap sort using array-based build-heap and sift-down.',
        code: `public class MaxHeapSort {
    public static void heapSort(int[] a) {
        int n = a.length;
        for (int i = n / 2 - 1; i >= 0; i--) siftDown(a, i, n);
        for (int end = n - 1; end > 0; end--) {
            int tmp = a[0]; a[0] = a[end]; a[end] = tmp;
            siftDown(a, 0, end);
        }
    }

    private static void siftDown(int[] a, int i, int size) {
        while (true) {
            int largest = i, left = 2 * i + 1, right = 2 * i + 2;
            if (left < size && a[left] > a[largest]) largest = left;
            if (right < size && a[right] > a[largest]) largest = right;
            if (largest == i) break;
            int tmp = a[i]; a[i] = a[largest]; a[largest] = tmp;
            i = largest;
        }
    }
}`,
      },
    ],
    quizId: 'quiz-ext-max-heap',
    quizTitle: 'Max-Heap Quiz',
    quizDescription: 'Test your understanding of the max-heap property, heapify, and heap sort.',
    questions: [
      {
        id: 'q-max-heap-1',
        quiz_id: 'quiz-ext-max-heap',
        question_text: 'Which element is guaranteed to be at the root of a max-heap?',
        question_type: 'MCQ',
        options: ['The smallest element', 'The largest element', 'The median element', 'The most recently inserted element'],
        correct_option_index: 1,
        explanation: 'The max-heap property forces every parent to be at least as large as its children, so the maximum sits at the root.',
      },
      {
        id: 'q-max-heap-2',
        quiz_id: 'quiz-ext-max-heap',
        question_text: 'Heap sort using a max-heap sorts in place with O(1) extra space and a guaranteed O(n log n) worst case.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Heap sort operates within the input array and never degrades below O(n log n), though it is not stable.',
      },
      {
        id: 'q-max-heap-3',
        quiz_id: 'quiz-ext-max-heap',
        question_text: 'What is the overall time complexity of heap sort on n elements?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correct_option_index: 1,
        explanation: 'Building the heap is O(n) and each of the n extractions costs O(log n), giving O(n log n) overall.',
      },
    ],
  },
  // 9. TREAP
  {
    topic: {
      id: 'ext-treap',
      slug: 'treap',
      category_id: CATEGORY_IDS.trees,
      title: 'Treap',
      definition: 'A treap is a randomized binary search tree where each node carries both a key (obeying the BST order) and a random priority (obeying the heap order), so the shape mimics a tree built from a random insertion sequence and stays balanced with high probability.',
      importance: 'Treaps deliver expected O(log n) operations with strikingly simple code, and their split/merge primitives make them a favorite for implicit-key sequences, order statistics, and interval problems.',
      prerequisites: ['binary-search-tree', 'heap'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(log n)',
      time_complexity_average: 'O(log n)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(n)',
      display_order: 308,
     },
     sections: [
      {
        id: 'sec-treap-1',
        topic_id: 'ext-treap',
        title: 'Concept & Intuition',
        content: `A plain BST is fast *if* keys arrive in random order, but adversarial (sorted) input degrades it to a linked list. A **treap** guarantees good behavior by injecting randomness itself: every node stores its key **and** a randomly chosen **priority**.

The tree simultaneously satisfies two rules:
- **BST order on keys:** left subtree keys < node key < right subtree keys.
- **Heap order on priorities:** every node's priority is higher than its children's.

Because priorities are random, the resulting shape is statistically identical to a BST built by inserting keys in random order — which is balanced with high probability.

> [!NOTE]
> "Treap" = **tree** + h**eap**. The name captures the dual invariant exactly.`,
        display_order: 1,
      },
      {
        id: 'sec-treap-2',
        topic_id: 'ext-treap',
        title: 'Rotations vs Split/Merge',
        content: `There are two equivalent ways to implement a treap.

**Rotation style:** insert like a normal BST by key, assign a random priority, then rotate the node upward while its priority exceeds its parent's — restoring heap order. Deletion rotates the target down to a leaf and removes it.

**Split/merge style** (often cleaner):
- \`split(root, k)\` divides a treap into two treaps: keys $< k$ and keys $\\ge k$.
- \`merge(a, b)\` combines two treaps where all keys in \`a\` are less than all keys in \`b\`, choosing the higher-priority root at each step.

With these primitives, **insert** = split then merge in the new node, and **delete** = split out the key and merge the remainder. Both primitives are $O(\\log n)$ expected.`,
        display_order: 2,
      },
      {
        id: 'sec-treap-3',
        topic_id: 'ext-treap',
        title: 'Complexity & Why Randomness Works',
        content: `The expected height of a treap is $O(\\log n)$ because random priorities make it equivalent to a randomly built BST. Therefore search, insert, delete, split, and merge all run in **expected** $O(\\log n)$.

$$E[\\text{height}] \\approx 2.99 \\log_2 n$$

The worst case is still $O(n)$, but it requires a pathological run of random priorities and is astronomically unlikely — independent of the input key order, which is the crucial guarantee.

Unlike red-black or AVL trees, a treap stores no balance metadata beyond a single priority and needs no case analysis; the randomness does the balancing for free. This simplicity is why treaps are popular in competitive programming.`,
        display_order: 3,
      },
      {
        id: 'sec-treap-4',
        topic_id: 'ext-treap',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Priorities must be effectively unique and truly random. Repeated or predictable priorities can reintroduce imbalance; use a wide random range (e.g. a 32- or 64-bit generator) to make collisions negligible.

Considerations:
- Performance guarantees are *expected*, not worst-case; safety-critical systems needing hard bounds may prefer red-black trees.
- Seeding the RNG deterministically makes debugging reproducible.

**Use cases:** ordered sets/maps with simple code, **implicit treaps** for array-like sequences supporting $O(\\log n)$ insert/erase/reverse at any position, order-statistics queries, and interval manipulation in contests.`,
        display_order: 4,
      },
    ],
     snippets: [
      {
        id: 'snip-treap-py',
        topic_id: 'ext-treap',
        language: 'python',
        is_optimized: true,
        explanation: 'Split/merge treap with random priorities giving expected O(log n) insert and erase.',
        code: `import random

class Node:
    def __init__(self, key):
        self.key = key
        self.priority = random.random()
        self.left = None
        self.right = None

def split(root, key):
    if root is None:
        return (None, None)
    if root.key < key:
        left, right = split(root.right, key)
        root.right = left
        return (root, right)
    else:
        left, right = split(root.left, key)
        root.left = right
        return (left, root)

def merge(a, b):
    if a is None:
        return b
    if b is None:
        return a
    if a.priority > b.priority:
        a.right = merge(a.right, b)
        return a
    else:
        b.left = merge(a, b.left)
        return b

def insert(root, key):
    node = Node(key)
    left, right = split(root, key)
    return merge(merge(left, node), right)

def erase(root, key):
    if root is None:
        return None
    if root.key == key:
        return merge(root.left, root.right)
    if key < root.key:
        root.left = erase(root.left, key)
    else:
        root.right = erase(root.right, key)
    return root`,
      },
      {
        id: 'snip-treap-js',
        topic_id: 'ext-treap',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript split/merge treap using random priorities for expected logarithmic balance.',
        code: `class TreapNode {
  constructor(key) {
    this.key = key;
    this.priority = Math.random();
    this.left = null;
    this.right = null;
  }
}

function split(root, key) {
  if (root === null) return [null, null];
  if (root.key < key) {
    const [left, right] = split(root.right, key);
    root.right = left;
    return [root, right];
  } else {
    const [left, right] = split(root.left, key);
    root.left = right;
    return [left, root];
  }
}

function merge(a, b) {
  if (a === null) return b;
  if (b === null) return a;
  if (a.priority > b.priority) {
    a.right = merge(a.right, b);
    return a;
  } else {
    b.left = merge(a, b.left);
    return b;
  }
}

function insert(root, key) {
  const node = new TreapNode(key);
  const [left, right] = split(root, key);
  return merge(merge(left, node), right);
}

function erase(root, key) {
  if (root === null) return null;
  if (root.key === key) return merge(root.left, root.right);
  if (key < root.key) root.left = erase(root.left, key);
  else root.right = erase(root.right, key);
  return root;
}`,
      },
      {
        id: 'snip-treap-cpp',
        topic_id: 'ext-treap',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ treap using split and merge with a random priority per node.',
        code: `#include <random>
using namespace std;

mt19937 rng(random_device{}());

struct Node {
    int key, priority;
    Node *left = nullptr, *right = nullptr;
    Node(int k) : key(k), priority(rng()) {}
};

void split(Node* root, int key, Node*& a, Node*& b) {
    if (!root) { a = b = nullptr; return; }
    if (root->key < key) {
        split(root->right, key, root->right, b);
        a = root;
    } else {
        split(root->left, key, a, root->left);
        b = root;
    }
}

Node* merge(Node* a, Node* b) {
    if (!a) return b;
    if (!b) return a;
    if (a->priority > b->priority) {
        a->right = merge(a->right, b);
        return a;
    } else {
        b->left = merge(a, b->left);
        return b;
    }
}

Node* insert(Node* root, int key) {
    Node *l, *r;
    split(root, key, l, r);
    return merge(merge(l, new Node(key)), r);
}

Node* erase(Node* root, int key) {
    if (!root) return nullptr;
    if (root->key == key) return merge(root->left, root->right);
    if (key < root->key) root->left = erase(root->left, key);
    else root->right = erase(root->right, key);
    return root;
}`,
      },
      {
        id: 'snip-treap-java',
        topic_id: 'ext-treap',
        language: 'java',
        is_optimized: true,
        explanation: 'Java treap with split/merge primitives driven by random node priorities.',
        code: `import java.util.Random;

public class Treap {
    private static final Random RNG = new Random();

    static class Node {
        int key;
        int priority;
        Node left, right;
        Node(int key) { this.key = key; this.priority = RNG.nextInt(); }
    }

    // returns {left, right} where left has keys < key
    private Node[] split(Node root, int key) {
        if (root == null) return new Node[]{null, null};
        if (root.key < key) {
            Node[] parts = split(root.right, key);
            root.right = parts[0];
            return new Node[]{root, parts[1]};
        } else {
            Node[] parts = split(root.left, key);
            root.left = parts[1];
            return new Node[]{parts[0], root};
        }
    }

    private Node merge(Node a, Node b) {
        if (a == null) return b;
        if (b == null) return a;
        if (a.priority > b.priority) {
            a.right = merge(a.right, b);
            return a;
        } else {
            b.left = merge(a, b.left);
            return b;
        }
    }

    public Node insert(Node root, int key) {
        Node[] parts = split(root, key);
        return merge(merge(parts[0], new Node(key)), parts[1]);
    }

    public Node erase(Node root, int key) {
        if (root == null) return null;
        if (root.key == key) return merge(root.left, root.right);
        if (key < root.key) root.left = erase(root.left, key);
        else root.right = erase(root.right, key);
        return root;
    }
}`,
      },
    ],
      quizId: 'quiz-ext-treap',
    quizTitle: 'Treap Quiz',
    quizDescription: 'Test your understanding of treaps, randomized priorities, and split/merge balancing.',
    questions: [
      {
        id: 'q-treap-1',
        quiz_id: 'quiz-ext-treap',
        question_text: 'A treap simultaneously maintains which two ordering properties?',
        question_type: 'MCQ',
        options: ['BST order on keys and heap order on priorities', 'Heap order on keys and BST order on priorities', 'BST order on both keys and priorities', 'Heap order on both keys and priorities'],
        correct_option_index: 0,
        explanation: 'Keys follow binary-search-tree order while randomly assigned priorities follow heap order, giving the treap its balance.',
      },
      {
        id: 'q-treap-2',
        quiz_id: 'quiz-ext-treap',
        question_text: 'The random priorities in a treap make its expected performance independent of the order in which keys are inserted.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Because balance comes from random priorities rather than key order, even sorted input yields an expected O(log n) tree.',
      },
      {
        id: 'q-treap-3',
        quiz_id: 'quiz-ext-treap',
        question_text: 'What is the expected time complexity of insertion in a treap of n nodes?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n) expected', 'O(n) always', 'O(n log n)'],
        correct_option_index: 1,
        explanation: 'Split and merge each run in expected O(log n) because random priorities keep the expected height logarithmic.',
      },
    ],
  },
  // 10. SPLAY TREE
  {
    topic: {
      id: 'ext-splay-tree',
      slug: 'splay-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'Splay Tree',
      definition: 'A splay tree is a self-adjusting binary search tree that moves every accessed node to the root through a sequence of rotations called splaying, so recently or frequently used items stay near the top and are cheap to reach again.',
      importance: 'Splay trees give amortized O(log n) operations with no stored balance information, and their self-adjusting behavior yields excellent performance on skewed access patterns, powering caches and rope data structures.',
      prerequisites: ['binary-search-tree'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(log n) amortized',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(n)',
      display_order: 309,
    },
    sections: [
      {
        id: 'sec-splay-tree-1',
        topic_id: 'ext-splay-tree',
        title: 'Concept & Intuition',
        content: `Real workloads are rarely uniform: a small set of items gets touched again and again (think of the most-visited URLs or the hottest cache keys). A **splay tree** exploits this by *self-adjusting*. Every time you search, insert, or delete a node, you **splay** it — rotate it all the way up to the root.

The effect is a structural version of "keep frequently used things within reach." After access, the item is at the root, so a repeat access is $O(1)$. Rarely used items drift toward the bottom.

> [!NOTE]
> A splay tree stores **no** balance or color bits. All its guarantees come from the splay operation and are *amortized*, not per-operation.`,
        display_order: 1,
      },
      {
        id: 'sec-splay-tree-2',
        topic_id: 'ext-splay-tree',
        title: 'The Splay Operation',
        content: `Splaying moves node $x$ to the root using three rotation cases, applied repeatedly based on $x$, its parent $p$, and grandparent $g$:

- **Zig:** $p$ is the root. Do a single rotation between $x$ and $p$. (Terminating case.)
- **Zig-zig:** $x$ and $p$ are both left children (or both right). Rotate $p$ with $g$ first, then $x$ with $p$.
- **Zig-zag:** $x$ is a left child and $p$ a right child (or vice versa). Rotate $x$ with $p$, then $x$ with $g$.

The zig-zig case (rotating the *grandparent* first) is what distinguishes splaying from naive "rotate to root" and is essential for the amortized bound. Search, insert, and delete all finish by splaying the accessed (or nearest) node.`,
        display_order: 2,
      },
      {
        id: 'sec-splay-tree-3',
        topic_id: 'ext-splay-tree',
        title: 'Amortized Analysis',
        content: `Individual operations can cost $O(n)$ (a single access on a degenerate tree), but a *sequence* of $m$ operations on a tree of $n$ nodes costs $O((m + n) \\log n)$, so the **amortized** cost per operation is $O(\\log n)$.

The proof uses the *potential method* with a rank function $\\text{rank}(x) = \\log_2(\\text{size of subtree at } x)$. The **Access Lemma** bounds the amortized cost of splaying $x$ by:
$$3(\\text{rank}(root) - \\text{rank}(x)) + 1 = O(\\log n)$$

Splay trees also enjoy stronger properties: the **static optimality** theorem says their cost is within a constant factor of the best possible static BST for any access sequence, and the **working-set** property makes recently accessed items cheap.`,
        display_order: 3,
      },
      {
        id: 'sec-splay-tree-4',
        topic_id: 'ext-splay-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Splay trees mutate on *reads*. A "lookup" rotates the tree, so they are not safe for concurrent readers without locking, and read-heavy multi-threaded use can suffer contention.

Considerations:
- The worst case for a single operation is $O(n)$; avoid them where hard real-time bounds are required.
- Because every access restructures the tree, they can have worse cache behavior and higher constant factors than red-black trees for uniform access.

**Use cases:** caches and memory allocators exploiting locality, rope/text-editor buffers, and network routers, where the working-set and static-optimality properties shine.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-splay-tree-py',
        topic_id: 'ext-splay-tree',
        language: 'python',
        is_optimized: true,
        explanation: 'Splay tree with bottom-up zig/zig-zig/zig-zag splaying, insert, and search.',
        code: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = self.right = self.parent = None

class SplayTree:
    def __init__(self):
        self.root = None

    def _rotate(self, x):
        p = x.parent
        g = p.parent
        if x is p.left:
            p.left = x.right
            if x.right: x.right.parent = p
            x.right = p
        else:
            p.right = x.left
            if x.left: x.left.parent = p
            x.left = p
        p.parent = x
        x.parent = g
        if g:
            if g.left is p: g.left = x
            else: g.right = x

    def _splay(self, x):
        while x.parent:
            p = x.parent
            g = p.parent
            if g is None:
                self._rotate(x)                      # zig
            elif (g.left is p) == (p.left is x):
                self._rotate(p); self._rotate(x)     # zig-zig
            else:
                self._rotate(x); self._rotate(x)     # zig-zag
        self.root = x

    def insert(self, key):
        if self.root is None:
            self.root = Node(key)
            return
        cur, parent = self.root, None
        while cur:
            parent = cur
            if key < cur.key: cur = cur.left
            elif key > cur.key: cur = cur.right
            else:
                self._splay(cur); return
        node = Node(key)
        node.parent = parent
        if key < parent.key: parent.left = node
        else: parent.right = node
        self._splay(node)

    def search(self, key):
        cur = self.root
        while cur:
            if key == cur.key:
                self._splay(cur)
                return True
            cur = cur.left if key < cur.key else cur.right
        return False`,
      },
      {
        id: 'snip-splay-tree-js',
        topic_id: 'ext-splay-tree',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript splay tree that rotates each accessed node to the root.',
        code: `class SplayNode {
  constructor(key) {
    this.key = key;
    this.left = this.right = this.parent = null;
  }
}

class SplayTree {
  constructor() {
    this.root = null;
  }

  rotate(x) {
    const p = x.parent, g = p.parent;
    if (x === p.left) {
      p.left = x.right;
      if (x.right) x.right.parent = p;
      x.right = p;
    } else {
      p.right = x.left;
      if (x.left) x.left.parent = p;
      x.left = p;
    }
    p.parent = x;
    x.parent = g;
    if (g) {
      if (g.left === p) g.left = x;
      else g.right = x;
    }
  }

  splay(x) {
    while (x.parent) {
      const p = x.parent, g = p.parent;
      if (!g) this.rotate(x);
      else if ((g.left === p) === (p.left === x)) { this.rotate(p); this.rotate(x); }
      else { this.rotate(x); this.rotate(x); }
    }
    this.root = x;
  }

  insert(key) {
    if (!this.root) { this.root = new SplayNode(key); return; }
    let cur = this.root, parent = null;
    while (cur) {
      parent = cur;
      if (key < cur.key) cur = cur.left;
      else if (key > cur.key) cur = cur.right;
      else { this.splay(cur); return; }
    }
    const node = new SplayNode(key);
    node.parent = parent;
    if (key < parent.key) parent.left = node;
    else parent.right = node;
    this.splay(node);
  }

  search(key) {
    let cur = this.root;
    while (cur) {
      if (key === cur.key) { this.splay(cur); return true; }
      cur = key < cur.key ? cur.left : cur.right;
    }
    return false;
  }
}`,
      },
      {
        id: 'snip-splay-tree-cpp',
        topic_id: 'ext-splay-tree',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ splay tree with parent pointers and zig/zig-zig/zig-zag splaying.',
        code: `struct Node {
    int key;
    Node *left = nullptr, *right = nullptr, *parent = nullptr;
    Node(int k) : key(k) {}
};

class SplayTree {
    Node* root = nullptr;

    void rotate(Node* x) {
        Node* p = x->parent;
        Node* g = p->parent;
        if (x == p->left) {
            p->left = x->right;
            if (x->right) x->right->parent = p;
            x->right = p;
        } else {
            p->right = x->left;
            if (x->left) x->left->parent = p;
            x->left = p;
        }
        p->parent = x;
        x->parent = g;
        if (g) { if (g->left == p) g->left = x; else g->right = x; }
    }

    void splay(Node* x) {
        while (x->parent) {
            Node* p = x->parent;
            Node* g = p->parent;
            if (!g) rotate(x);
            else if ((g->left == p) == (p->left == x)) { rotate(p); rotate(x); }
            else { rotate(x); rotate(x); }
        }
        root = x;
    }

public:
    void insert(int key) {
        if (!root) { root = new Node(key); return; }
        Node *cur = root, *parent = nullptr;
        while (cur) {
            parent = cur;
            if (key < cur->key) cur = cur->left;
            else if (key > cur->key) cur = cur->right;
            else { splay(cur); return; }
        }
        Node* node = new Node(key);
        node->parent = parent;
        if (key < parent->key) parent->left = node;
        else parent->right = node;
        splay(node);
    }

    bool search(int key) {
        Node* cur = root;
        while (cur) {
            if (key == cur->key) { splay(cur); return true; }
            cur = key < cur->key ? cur->left : cur->right;
        }
        return false;
    }
};`,
      },
      {
        id: 'snip-splay-tree-java',
        topic_id: 'ext-splay-tree',
        language: 'java',
        is_optimized: true,
        explanation: 'Java splay tree using parent links to splay each accessed node to the root.',
        code: `public class SplayTree {
    static class Node {
        int key;
        Node left, right, parent;
        Node(int key) { this.key = key; }
    }

    private Node root;

    private void rotate(Node x) {
        Node p = x.parent, g = p.parent;
        if (x == p.left) {
            p.left = x.right;
            if (x.right != null) x.right.parent = p;
            x.right = p;
        } else {
            p.right = x.left;
            if (x.left != null) x.left.parent = p;
            x.left = p;
        }
        p.parent = x;
        x.parent = g;
        if (g != null) { if (g.left == p) g.left = x; else g.right = x; }
    }

    private void splay(Node x) {
        while (x.parent != null) {
            Node p = x.parent, g = p.parent;
            if (g == null) rotate(x);
            else if ((g.left == p) == (p.left == x)) { rotate(p); rotate(x); }
            else { rotate(x); rotate(x); }
        }
        root = x;
    }

    public void insert(int key) {
        if (root == null) { root = new Node(key); return; }
        Node cur = root, parent = null;
        while (cur != null) {
            parent = cur;
            if (key < cur.key) cur = cur.left;
            else if (key > cur.key) cur = cur.right;
            else { splay(cur); return; }
        }
        Node node = new Node(key);
        node.parent = parent;
        if (key < parent.key) parent.left = node;
        else parent.right = node;
        splay(node);
    }

    public boolean search(int key) {
        Node cur = root;
        while (cur != null) {
            if (key == cur.key) { splay(cur); return true; }
            cur = key < cur.key ? cur.left : cur.right;
        }
        return false;
    }
}`,
      },
    ],
    quizId: 'quiz-ext-splay-tree',
    quizTitle: 'Splay Tree Quiz',
    quizDescription: 'Test your understanding of splaying, amortized analysis, and self-adjusting behavior.',
    questions: [
      {
        id: 'q-splay-tree-1',
        quiz_id: 'quiz-ext-splay-tree',
        question_text: 'What does a splay tree do to a node after it is accessed?',
        question_type: 'MCQ',
        options: ['Recolors it black', 'Moves it to the root via rotations', 'Deletes it', 'Balances the whole tree by height'],
        correct_option_index: 1,
        explanation: 'Splaying rotates the accessed node all the way to the root using zig, zig-zig, and zig-zag steps.',
      },
      {
        id: 'q-splay-tree-2',
        quiz_id: 'quiz-ext-splay-tree',
        question_text: 'A single splay tree operation is guaranteed to run in O(log n) worst-case time.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'A single operation can be O(n); the O(log n) bound is amortized over a sequence of operations, not per operation.',
      },
      {
        id: 'q-splay-tree-3',
        quiz_id: 'quiz-ext-splay-tree',
        question_text: 'What is the amortized time complexity of search, insert, and delete in a splay tree?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n) amortized', 'O(n) amortized', 'O(n log n)'],
        correct_option_index: 1,
        explanation: 'The Access Lemma bounds the amortized cost of each splay operation at O(log n).',
      },
    ],
  },
  // 11. K-D TREE
  {
    topic: {
      id: 'ext-k-d-tree',
      slug: 'k-d-tree',
      category_id: CATEGORY_IDS.trees,
      title: 'k-d Tree',
      definition: 'A k-d tree is a binary tree that organizes points in k-dimensional space by splitting on one coordinate axis per level, cycling through the axes, so that nearest-neighbor and range searches can prune large portions of space.',
      importance: 'k-d trees accelerate spatial queries such as nearest-neighbor search, range search, and k-nearest-neighbors classification, which are foundational in machine learning, graphics, robotics, and geographic databases.',
      prerequisites: ['binary-search-tree'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(log n)',
      time_complexity_average: 'O(log n)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(n)',
      display_order: 310,
    },
    sections: [
      {
        id: 'sec-k-d-tree-1',
        topic_id: 'ext-k-d-tree',
        title: 'Concept & Intuition',
        content: `Suppose you have a million 2-D points and keep asking "which stored point is closest to *this* location?" Checking all points is $O(n)$ per query. A **k-d tree** organizes the points so most of them can be skipped.

It is a binary search tree generalized to $k$ dimensions. Instead of comparing whole keys, each level compares on **one axis**, cycling through them: level 0 splits on $x$, level 1 on $y$, level 2 on $z$ (then back to $x$), and so on. Every node therefore represents an axis-aligned splitting plane that divides space into two half-spaces.

> [!NOTE]
> Think of it as recursively slicing a region: first a vertical cut, then horizontal cuts inside each half, alternating forever.`,
        display_order: 1,
      },
      {
        id: 'sec-k-d-tree-2',
        topic_id: 'ext-k-d-tree',
        title: 'Construction & Nearest-Neighbor Search',
        content: `**Build:** to keep the tree balanced, at each level pick the splitting axis (depth mod $k$), find the **median** point along that axis, make it the node, and recurse on the two halves. Using a median-of-medians or a sort gives $O(n \\log n)$ build time.

**Nearest-neighbor search** is the star operation:
1. Descend to the leaf region containing the query point, tracking the best distance found so far.
2. Unwind back up. At each node, check whether the *other* side of the splitting plane could contain a closer point: compare the query-to-plane distance against the current best.
3. Only recurse into the far branch if it *might* hold something closer; otherwise **prune** it entirely.

This pruning is what makes queries sublinear on average.`,
        display_order: 2,
      },
      {
        id: 'sec-k-d-tree-3',
        topic_id: 'ext-k-d-tree',
        title: 'Complexity & the Curse of Dimensionality',
        content: `- **Build:** $O(n \\log n)$.
- **Search / insert (balanced, low dimension):** $O(\\log n)$ average.
- **Nearest-neighbor:** $O(\\log n)$ expected in low dimensions, but $O(n)$ worst case.

The catch is the **curse of dimensionality**. Pruning works only when the splitting plane frequently lets us discard the far branch. As $k$ grows, the query's bounding hypersphere overlaps more cells, so fewer branches are pruned. A common rule of thumb: k-d trees stay effective only when $n \\gg 2^k$; beyond roughly 20 dimensions they degrade toward the $O(n)$ brute-force scan.

For high-dimensional data, approximate methods (locality-sensitive hashing, ball trees) are usually preferred.`,
        display_order: 3,
      },
      {
        id: 'sec-k-d-tree-4',
        topic_id: 'ext-k-d-tree',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> During nearest-neighbor search, do not forget to consider the far subtree. If the hypersphere of radius "best distance so far" crosses the splitting plane, the closest point may lie on the other side; skipping it silently returns wrong answers.

Considerations:
- k-d trees do not rebalance on insertion; many inserts skew the tree, so periodic rebuilds are common for dynamic data.
- Always split on the **median** (not the mean or first element) to keep the tree balanced.

**Use cases:** k-nearest-neighbors classification, ray tracing and collision detection, geographic "points near me" queries, and clustering.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-k-d-tree-py',
        topic_id: 'ext-k-d-tree',
        language: 'python',
        is_optimized: true,
        explanation: 'Balanced k-d tree built on medians with pruning nearest-neighbor search.',
        code: `class KDNode:
    def __init__(self, point, left=None, right=None):
        self.point = point
        self.left = left
        self.right = right

def build_kdtree(points, depth=0):
    if not points:
        return None
    k = len(points[0])
    axis = depth % k
    points.sort(key=lambda p: p[axis])
    mid = len(points) // 2
    return KDNode(
        points[mid],
        build_kdtree(points[:mid], depth + 1),
        build_kdtree(points[mid + 1:], depth + 1),
    )

def _dist2(a, b):
    return sum((x - y) ** 2 for x, y in zip(a, b))

def nearest(node, target, depth=0, best=None):
    if node is None:
        return best
    k = len(target)
    axis = depth % k
    if best is None or _dist2(target, node.point) < _dist2(target, best):
        best = node.point
    diff = target[axis] - node.point[axis]
    near, far = (node.left, node.right) if diff < 0 else (node.right, node.left)
    best = nearest(near, target, depth + 1, best)
    if diff ** 2 < _dist2(target, best):
        best = nearest(far, target, depth + 1, best)
    return best`,
      },
      {
        id: 'snip-k-d-tree-js',
        topic_id: 'ext-k-d-tree',
        language: 'javascript',
        is_optimized: true,
        explanation: 'JavaScript median-split k-d tree with pruning nearest-neighbor query.',
        code: `class KDNode {
  constructor(point, left = null, right = null) {
    this.point = point;
    this.left = left;
    this.right = right;
  }
}

function buildKDTree(points, depth = 0) {
  if (points.length === 0) return null;
  const k = points[0].length;
  const axis = depth % k;
  points.sort((a, b) => a[axis] - b[axis]);
  const mid = points.length >> 1;
  return new KDNode(
    points[mid],
    buildKDTree(points.slice(0, mid), depth + 1),
    buildKDTree(points.slice(mid + 1), depth + 1)
  );
}

function dist2(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
  return s;
}

function nearest(node, target, depth = 0, best = null) {
  if (node === null) return best;
  const axis = depth % target.length;
  if (best === null || dist2(target, node.point) < dist2(target, best)) {
    best = node.point;
  }
  const diff = target[axis] - node.point[axis];
  const near = diff < 0 ? node.left : node.right;
  const far = diff < 0 ? node.right : node.left;
  best = nearest(near, target, depth + 1, best);
  if (diff * diff < dist2(target, best)) {
    best = nearest(far, target, depth + 1, best);
  }
  return best;
}`,
      },
      {
        id: 'snip-k-d-tree-cpp',
        topic_id: 'ext-k-d-tree',
        language: 'cpp',
        is_optimized: true,
        explanation: 'C++ k-d tree over fixed-dimension points with nth_element build and pruning search.',
        code: `#include <vector>
#include <algorithm>
#include <limits>
using namespace std;

struct KDNode {
    vector<double> point;
    KDNode *left = nullptr, *right = nullptr;
    KDNode(vector<double> p) : point(move(p)) {}
};

KDNode* build(vector<vector<double>>& pts, int lo, int hi, int depth) {
    if (lo >= hi) return nullptr;
    int k = pts[lo].size();
    int axis = depth % k;
    int mid = (lo + hi) / 2;
    nth_element(pts.begin() + lo, pts.begin() + mid, pts.begin() + hi,
                [axis](const vector<double>& a, const vector<double>& b) {
                    return a[axis] < b[axis];
                });
    KDNode* node = new KDNode(pts[mid]);
    node->left = build(pts, lo, mid, depth + 1);
    node->right = build(pts, mid + 1, hi, depth + 1);
    return node;
}

double dist2(const vector<double>& a, const vector<double>& b) {
    double s = 0;
    for (size_t i = 0; i < a.size(); i++) s += (a[i] - b[i]) * (a[i] - b[i]);
    return s;
}

void nearest(KDNode* node, const vector<double>& target, int depth,
             const vector<double>*& best, double& bestDist) {
    if (!node) return;
    double d = dist2(node->point, target);
    if (d < bestDist) { bestDist = d; best = &node->point; }
    int axis = depth % target.size();
    double diff = target[axis] - node->point[axis];
    KDNode* near = diff < 0 ? node->left : node->right;
    KDNode* far = diff < 0 ? node->right : node->left;
    nearest(near, target, depth + 1, best, bestDist);
    if (diff * diff < bestDist)
        nearest(far, target, depth + 1, best, bestDist);
}`,
      },
      {
        id: 'snip-k-d-tree-java',
        topic_id: 'ext-k-d-tree',
        language: 'java',
        is_optimized: true,
        explanation: 'Java k-d tree with median-based build and recursive pruning nearest-neighbor search.',
        code: `import java.util.Arrays;
import java.util.Comparator;

public class KDTree {
    static class Node {
        double[] point;
        Node left, right;
        Node(double[] p) { point = p; }
    }

    private Node root;

    public KDTree(double[][] points) {
        root = build(points, 0, points.length, 0);
    }

    private Node build(double[][] pts, int lo, int hi, int depth) {
        if (lo >= hi) return null;
        int axis = depth % pts[lo].length;
        Arrays.sort(pts, lo, hi, Comparator.comparingDouble(p -> p[axis]));
        int mid = (lo + hi) / 2;
        Node node = new Node(pts[mid]);
        node.left = build(pts, lo, mid, depth + 1);
        node.right = build(pts, mid + 1, hi, depth + 1);
        return node;
    }

    private double dist2(double[] a, double[] b) {
        double s = 0;
        for (int i = 0; i < a.length; i++) s += (a[i] - b[i]) * (a[i] - b[i]);
        return s;
    }

    private double[] best;
    private double bestDist;

    public double[] nearest(double[] target) {
        best = null;
        bestDist = Double.POSITIVE_INFINITY;
        search(root, target, 0);
        return best;
    }

    private void search(Node node, double[] target, int depth) {
        if (node == null) return;
        double d = dist2(node.point, target);
        if (d < bestDist) { bestDist = d; best = node.point; }
        int axis = depth % target.length;
        double diff = target[axis] - node.point[axis];
        Node near = diff < 0 ? node.left : node.right;
        Node far = diff < 0 ? node.right : node.left;
        search(near, target, depth + 1);
        if (diff * diff < bestDist) search(far, target, depth + 1);
    }
}`,
      },
    ],
    quizId: 'quiz-ext-k-d-tree',
    quizTitle: 'k-d Tree Quiz',
    quizDescription: 'Test your understanding of axis-cycling splits, nearest-neighbor search, and pruning.',
    questions: [
      {
        id: 'q-k-d-tree-1',
        quiz_id: 'quiz-ext-k-d-tree',
        question_text: 'How does a k-d tree decide which coordinate axis to split on at a given node?',
        question_type: 'MCQ',
        options: ['Always the x axis', 'The axis with the largest range', 'The axis given by depth mod k', 'A randomly chosen axis'],
        correct_option_index: 2,
        explanation: 'The classic k-d tree cycles through axes by level, using axis = depth mod k so each dimension is split in turn.',
      },
      {
        id: 'q-k-d-tree-2',
        quiz_id: 'quiz-ext-k-d-tree',
        question_text: 'The efficiency of k-d tree nearest-neighbor search degrades as the number of dimensions grows large.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'The curse of dimensionality reduces pruning effectiveness, so in high dimensions search approaches the O(n) brute-force cost.',
      },
      {
        id: 'q-k-d-tree-3',
        quiz_id: 'quiz-ext-k-d-tree',
        question_text: 'What is the time complexity of building a balanced k-d tree from n points using median splits?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correct_option_index: 1,
        explanation: 'Selecting the median at each of O(log n) levels over n points gives an O(n log n) construction.',
      },
    ],
  },
];
