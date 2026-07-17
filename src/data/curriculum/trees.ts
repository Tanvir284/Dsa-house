import { Topic, LessonSection, CodeSnippet, QuizQuestion } from '@/types';
import { CATEGORY_IDS } from './linear';

// 1. BINARY TREE
export const binaryTreeTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bb9',
  slug: 'binary-tree',
  category_id: CATEGORY_IDS.trees,
  title: 'Binary Tree',
  definition: 'A hierarchical data structure in which each node has at most two children, referred to as the left child and the right child.',
  importance: 'Binary trees are the base for more specialized structures like BSTs, Heaps, AVL trees, and Segment Trees.',
  prerequisites: ['linked-list'],
  difficulty: 'Intermediate',
  time_complexity_best: 'O(1) Access / Update (Direct root access)',
  time_complexity_average: 'O(N) Search / Traversal',
  time_complexity_worst: 'O(N) Search / Traversal',
  space_complexity: 'O(N)',
  display_order: 9,
};

export const binaryTreeSections: LessonSection[] = [
  {
    id: 'sec-bt-1',
    topic_id: binaryTreeTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Unlike arrays and linked lists which are linear, a Tree is hierarchical.
Think of a family tree or folder directories in your computer.
A **Binary Tree** starts at a single node called the **Root**. Every node contains a value and points to up to two child nodes:
- **Left Child**
- **Right Child**
Nodes with no children are called **Leaf Nodes**.
    `,
    display_order: 1,
  },
  {
    id: 'sec-bt-2',
    topic_id: binaryTreeTopic.id,
    title: 'Traversals',
    content: `
To visit all nodes in a binary tree, we use three standard Depth First Search (DFS) orderings:
1. **Pre-Order (Root, Left, Right)**: Visit root first, then left subtree, then right subtree.
2. **In-Order (Left, Root, Right)**: Visit left subtree, then root, then right subtree. (On a BST, this visits elements in sorted ascending order!)
3. **Post-Order (Left, Right, Root)**: Visit left, then right, then root. Useful for deleting nodes (deleting children before parent).
    `,
    display_order: 2,
  },
];

export const binaryTreeSnippets: CodeSnippet[] = [
  {
    id: 'snip-bt-py',
    topic_id: binaryTreeTopic.id,
    language: 'python',
    is_optimized: false,
    code: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# DFS Traversals
def inorder_traversal(root):
    res = []
    def traverse(node):
        if not node:
            return
        traverse(node.left)
        res.append(node.val)
        traverse(node.right)
    traverse(root)
    return res`,
    explanation: 'Python TreeNode definition along with recursive In-Order traversal.',
  },
  {
    id: 'snip-bt-js',
    topic_id: binaryTreeTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function preorderTraversal(root) {
    if (!root) return [];
    const leftSub = preorderTraversal(root.left);
    const rightSub = preorderTraversal(root.right);
    return [root.val, ...leftSub, ...rightSub];
}`,
    explanation: 'JavaScript Binary Tree preorder traversal using ES6 spreads.',
  },
  {
    id: 'snip-bt-c',
    topic_id: binaryTreeTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

struct TreeNode* create_node(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

void print_inorder(struct TreeNode* root) {
    if (root == NULL) return;
    print_inorder(root->left);
    printf("%d ", root->val);
    print_inorder(root->right);
}`,
    explanation: 'C implementation of node creation and recursive in-order traversal.',
  },
  {
    id: 'snip-bt-cpp',
    topic_id: binaryTreeTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <iostream>
#include <vector>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

class BinaryTree {
public:
    TreeNode* root;
    BinaryTree() : root(nullptr) {}
    
    void printPostOrder(TreeNode* node) {
        if (!node) return;
        printPostOrder(node->left);
        printPostOrder(node->right);
        std::cout << node->val << " ";
    }
};`,
    explanation: 'C++ tree structure featuring dynamic tree traversal helper.',
  },
  {
    id: 'snip-bt-java',
    topic_id: binaryTreeTopic.id,
    language: 'java',
    is_optimized: false,
    code: `import java.util.ArrayList;
import java.util.List;

public class BinaryTree {
    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { this.val = v; }
    }

    public List<Integer> inorder(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        traverse(root, res);
        return res;
    }

    private void traverse(TreeNode node, List<Integer> res) {
        if (node == null) return;
        traverse(node.left, res);
        res.add(node.val);
        traverse(node.right, res);
    }
}`,
    explanation: 'Java In-Order traversal accumulator helper.',
  },
  {
    id: 'snip-bt-cs',
    topic_id: binaryTreeTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `using System;
using System.Collections.Generic;

public class BinaryTree {
    public class TreeNode {
        public int Val { get; set; }
        public TreeNode Left { get; set; }
        public TreeNode Right { get; set; }
        public TreeNode(int v) { Val = v; Left = null; Right = null; }
    }
}`,
    explanation: 'C# class representing Binary Tree nodes.',
  }
];

export const binaryTreeQuestions: QuizQuestion[] = [
  {
    id: 'q-bt-1',
    quiz_id: 'quiz-binary-tree',
    question_text: 'Which tree traversal visits the root node first, followed by left and right subtrees?',
    question_type: 'MCQ',
    options: ['In-Order', 'Pre-Order', 'Post-Order', 'Level-Order'],
    correct_option_index: 1,
    explanation: 'Pre-Order traversal visits the root first, then recursively traverses left, and then right.',
  },
];


// 2. BINARY SEARCH TREE (BST)
export const bstTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bba',
  slug: 'binary-search-tree',
  category_id: CATEGORY_IDS.trees,
  title: 'Binary Search Tree',
  definition: 'A binary tree in which for every node, the values in its left subtree are less than the node\'s value, and the values in its right subtree are greater.',
  importance: 'BSTs allow fast search, insertion, and deletion operations in O(log N) time when balanced.',
  prerequisites: ['binary-tree'],
  difficulty: 'Intermediate',
  time_complexity_best: 'O(log N)',
  time_complexity_average: 'O(log N)',
  time_complexity_worst: 'O(N) (Skewed tree acting like a linked list)',
  space_complexity: 'O(N)',
  display_order: 10,
};

export const bstSections: LessonSection[] = [
  {
    id: 'sec-bst-1',
    topic_id: bstTopic.id,
    title: 'The BST Ordering Property',
    content: `
A BST imposes a strict ordering condition:
$$\\forall \\text{ left node } L, \\text{ value}(L) < \\text{ value}(\\text{Parent})$$
$$\\forall \\text{ right node } R, \\text{ value}(R) > \\text{ value}(\\text{Parent})$$
This allows binary-search logic to be applied to tree nodes. If you search for a value $X$:
- If $X < \\text{root}$, move left.
- If $X > \\text{root}$, move right.
With each step down the tree, you discard half the remaining search space, giving an average time complexity of $O(\\log N)$.
    `,
    display_order: 1,
  },
  {
    id: 'sec-bst-2',
    topic_id: bstTopic.id,
    title: 'Insertion and Deletion Mechanics',
    content: `
- **Insertion**: Simple traversal until you hit a null pointer, and attach the new node there.
- **Deletion**: Requires three distinct cases:
  1. **Leaf Node**: Simply remove it.
  2. **One Child**: Connect the child directly to the parent of the deleted node.
  3. **Two Children**: Find the **in-order successor** (the smallest value in the right subtree), copy its value to the node, and then recursively delete that successor.
    `,
    display_order: 2,
  },
  {
    id: 'sec-bst-3',
    topic_id: bstTopic.id,
    title: 'Skewed Tree Trap',
    content: `
> [!WARNING]
> If you insert sorted elements (e.g. 1, 2, 3, 4, 5) into a naive BST, the tree will degrade into a chain (linked list). This makes operations $O(N)$ instead of $O(\\log N)$. Self-balancing trees (AVL trees, Red-Black trees) resolve this problem.
    `,
    display_order: 3,
  },
];

export const bstSnippets: CodeSnippet[] = [
  {
    id: 'snip-bst-py',
    topic_id: bstTopic.id,
    language: 'python',
    is_optimized: false,
    code: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

def search(root, target):
    if not root or root.val == target:
        return root
    if target < root.val:
        return search(root.left, target)
    return search(root.right, target)`,
    explanation: 'Standard recursive insertion and searching in a Python BST.',
  },
  {
    id: 'snip-bst-js',
    topic_id: bstTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `class Node {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(val) {
        const helper = (node, v) => {
            if (!node) return new Node(v);
            if (v < node.val) node.left = helper(node.left, v);
            else node.right = helper(node.right, v);
            return node;
        };
        this.root = helper(this.root, val);
    }
}`,
    explanation: 'JavaScript BST class using inner recursive functions for insertion.',
  },
  {
    id: 'snip-bst-c',
    topic_id: bstTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node *left, *right;
};

struct Node* insert(struct Node* node, int val) {
    if (node == NULL) {
        struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
        temp->val = val;
        temp->left = temp->right = NULL;
        return temp;
    }
    if (val < node->val) node->left = insert(node->left, val);
    else node->right = insert(node->right, val);
    return node;
}`,
    explanation: 'C implementation allocating heap node pointers.',
  },
  {
    id: 'snip-bst-cpp',
    topic_id: bstTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* search(TreeNode* root, int val) {
    if (root == nullptr || root->val == val) return root;
    if (val < root->val) return search(root->left, val);
    return search(root->right, val);
}`,
    explanation: 'C++ BST search implementation with pointer dereferencing.',
  },
  {
    id: 'snip-bst-java',
    topic_id: bstTopic.id,
    language: 'java',
    is_optimized: false,
    code: `public class BST {
    private static class Node {
        int val;
        Node left, right;
        Node(int v) { val = v; }
    }

    private Node root = null;

    public void insert(int val) {
        root = insertRec(root, val);
    }

    private Node insertRec(Node node, int val) {
        if (node == null) return new Node(val);
        if (val < node.val) node.left = insertRec(node.left, val);
        else node.right = insertRec(node.right, val);
        return node;
    }
}`,
    explanation: 'Java BST wrapping recursive traversal parameters.',
  },
  {
    id: 'snip-bst-cs',
    topic_id: bstTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `public class BST {
    public class Node {
        public int Val { get; set; }
        public Node Left { get; set; }
        public Node Right { get; set; }
        public Node(int v) { Val = v; }
    }
}`,
    explanation: 'C# node models mapping standard BST structures.',
  }
];

export const bstQuestions: QuizQuestion[] = [
  {
    id: 'q-bst-1',
    quiz_id: 'quiz-bst',
    question_text: 'In a BST, traversing the nodes in which order outputs values in sorted ascending order?',
    question_type: 'MCQ',
    options: ['Pre-Order', 'In-Order', 'Post-Order', 'Level-Order'],
    correct_option_index: 1,
    explanation: 'An In-Order traversal (Left, Root, Right) always visits BST elements in ascending order due to the left < root < right property.',
  },
];


// 3. AVL TREE (Self-Balancing BST)
export const avlTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bbb',
  slug: 'avl-tree',
  category_id: CATEGORY_IDS.trees,
  title: 'AVL Tree',
  definition: 'A self-balancing binary search tree in which the heights of the left and right subtrees of every node differ by at most one, restored via rotations after each insert or delete.',
  importance: 'AVL trees guarantee O(log N) search, insertion, and deletion even in the worst case, eliminating the skewed-tree degradation that plagues plain BSTs.',
  prerequisites: ['binary-search-tree'],
  difficulty: 'Advanced',
  time_complexity_best: 'O(log N)',
  time_complexity_average: 'O(log N)',
  time_complexity_worst: 'O(log N)',
  space_complexity: 'O(N)',
  display_order: 11,
};

export const avlSections: LessonSection[] = [
  {
    id: 'sec-avl-1',
    topic_id: avlTopic.id,
    title: 'Why Balance Matters',
    content: `
A plain Binary Search Tree gives $O(\\log N)$ operations only when it stays bushy. Insert sorted data (1, 2, 3, 4, 5) and it collapses into a chain — effectively a linked list with $O(N)$ operations.

An **AVL tree** (named after inventors Adelson-Velsky and Landis, 1962) fixes this by enforcing an invariant on every node:

$$\\text{BalanceFactor}(node) = \\text{height}(left) - \\text{height}(right) \\in \\{-1, 0, +1\\}$$

The moment an insertion or deletion pushes a balance factor to $-2$ or $+2$, the tree performs **rotations** to restore balance. Because the height is kept at $O(\\log N)$, every search, insert, and delete is guaranteed $O(\\log N)$ — even in the worst case.
    `,
    display_order: 1,
  },
  {
    id: 'sec-avl-2',
    topic_id: avlTopic.id,
    title: 'The Four Rotation Cases',
    content: `
When a node becomes unbalanced, exactly one of four scenarios applies. Identify it by the path from the unbalanced node toward the newly inserted node:

1. **Left-Left (LL)**: heavy on the left, inserted into the left subtree → single **right rotation**.
2. **Right-Right (RR)**: heavy on the right, inserted into the right subtree → single **left rotation**.
3. **Left-Right (LR)**: heavy on the left, inserted into that child's right subtree → **left rotation** on the child, then **right rotation** on the node.
4. **Right-Left (RL)**: heavy on the right, inserted into that child's left subtree → **right rotation** on the child, then **left rotation** on the node.

A single rotation relinks three subtree pointers in $O(1)$ time and updates the two affected heights. The double cases (LR, RL) are simply two single rotations applied in sequence.
    `,
    display_order: 2,
  },
  {
    id: 'sec-avl-3',
    topic_id: avlTopic.id,
    title: 'Insertion & Deletion Flow',
    content: `
- **Insert**: perform a normal BST insertion, then walk back up the recursion stack. At each ancestor, recompute its height and balance factor; if it is unbalanced, apply the matching rotation. For insertion, **at most one rotation** (single or double) is ever needed.
- **Delete**: perform a normal BST deletion (leaf / one child / two children via in-order successor), then rebalance up the path. Unlike insertion, deletion may require **rotations at multiple levels** as you climb toward the root.

> [!IMPORTANT]
> Always update a node's cached height *before* reading its balance factor. Storing height on each node makes balance-factor lookups $O(1)$ instead of recomputing subtree heights every time.
    `,
    display_order: 3,
  },
  {
    id: 'sec-avl-4',
    topic_id: avlTopic.id,
    title: 'AVL vs. Red-Black Trees',
    content: `
> [!NOTE]
> AVL trees are more *strictly* balanced than Red-Black trees, so lookups are slightly faster — a good fit for read-heavy workloads. Red-Black trees allow looser balance, so they perform fewer rotations on writes, making them the default in many standard libraries (e.g. C++ \`std::map\`, Java \`TreeMap\`). Choose AVL when reads dominate; choose Red-Black when inserts and deletes are frequent.
    `,
    display_order: 4,
  },
];

export const avlSnippets: CodeSnippet[] = [
  {
    id: 'snip-avl-py',
    topic_id: avlTopic.id,
    language: 'python',
    is_optimized: true,
    code: `class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.height = 1

def height(node):
    return node.height if node else 0

def balance_factor(node):
    return height(node.left) - height(node.right) if node else 0

def update_height(node):
    node.height = 1 + max(height(node.left), height(node.right))

def rotate_right(y):
    x = y.left
    y.left = x.right
    x.right = y
    update_height(y)
    update_height(x)
    return x  # new subtree root

def rotate_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    update_height(x)
    update_height(y)
    return y

def insert(root, val):
    if not root:
        return Node(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)

    update_height(root)
    bf = balance_factor(root)

    # Left-Left
    if bf > 1 and val < root.left.val:
        return rotate_right(root)
    # Right-Right
    if bf < -1 and val > root.right.val:
        return rotate_left(root)
    # Left-Right
    if bf > 1 and val > root.left.val:
        root.left = rotate_left(root.left)
        return rotate_right(root)
    # Right-Left
    if bf < -1 and val < root.right.val:
        root.right = rotate_right(root.right)
        return rotate_left(root)
    return root`,
    explanation: 'Full AVL insertion in Python with cached heights and all four rotation cases.',
  },
  {
    id: 'snip-avl-js',
    topic_id: avlTopic.id,
    language: 'javascript',
    is_optimized: true,
    code: `class Node {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
        this.height = 1;
    }
}

const h = (n) => (n ? n.height : 0);
const bf = (n) => (n ? h(n.left) - h(n.right) : 0);
const update = (n) => { n.height = 1 + Math.max(h(n.left), h(n.right)); };

function rotateRight(y) {
    const x = y.left;
    y.left = x.right;
    x.right = y;
    update(y); update(x);
    return x;
}

function rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    y.left = x;
    update(x); update(y);
    return y;
}

function insert(root, val) {
    if (!root) return new Node(val);
    if (val < root.val) root.left = insert(root.left, val);
    else root.right = insert(root.right, val);

    update(root);
    const balance = bf(root);

    if (balance > 1 && val < root.left.val) return rotateRight(root);      // LL
    if (balance < -1 && val > root.right.val) return rotateLeft(root);     // RR
    if (balance > 1 && val > root.left.val) {                             // LR
        root.left = rotateLeft(root.left);
        return rotateRight(root);
    }
    if (balance < -1 && val < root.right.val) {                          // RL
        root.right = rotateRight(root.right);
        return rotateLeft(root);
    }
    return root;
}`,
    explanation: 'JavaScript AVL insertion using arrow helpers for height and balance factor.',
  },
  {
    id: 'snip-avl-cpp',
    topic_id: avlTopic.id,
    language: 'cpp',
    is_optimized: true,
    code: `struct Node {
    int val, height;
    Node *left, *right;
    Node(int v) : val(v), height(1), left(nullptr), right(nullptr) {}
};

int h(Node* n) { return n ? n->height : 0; }
int bf(Node* n) { return n ? h(n->left) - h(n->right) : 0; }
void update(Node* n) { n->height = 1 + std::max(h(n->left), h(n->right)); }

Node* rotateRight(Node* y) {
    Node* x = y->left;
    y->left = x->right;
    x->right = y;
    update(y); update(x);
    return x;
}

Node* rotateLeft(Node* x) {
    Node* y = x->right;
    x->right = y->left;
    y->left = x;
    update(x); update(y);
    return y;
}

Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->val) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);

    update(root);
    int balance = bf(root);

    if (balance > 1 && val < root->left->val) return rotateRight(root);
    if (balance < -1 && val > root->right->val) return rotateLeft(root);
    if (balance > 1 && val > root->left->val) {
        root->left = rotateLeft(root->left);
        return rotateRight(root);
    }
    if (balance < -1 && val < root->right->val) {
        root->right = rotateRight(root->right);
        return rotateLeft(root);
    }
    return root;
}`,
    explanation: 'C++ AVL insertion with pointer-based rotations and cached node heights.',
  },
  {
    id: 'snip-avl-java',
    topic_id: avlTopic.id,
    language: 'java',
    is_optimized: true,
    code: `public class AVLTree {
    static class Node {
        int val, height = 1;
        Node left, right;
        Node(int v) { val = v; }
    }

    private int h(Node n) { return n == null ? 0 : n.height; }
    private int bf(Node n) { return n == null ? 0 : h(n.left) - h(n.right); }
    private void update(Node n) { n.height = 1 + Math.max(h(n.left), h(n.right)); }

    private Node rotateRight(Node y) {
        Node x = y.left;
        y.left = x.right;
        x.right = y;
        update(y); update(x);
        return x;
    }

    private Node rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        y.left = x;
        update(x); update(y);
        return y;
    }

    Node insert(Node root, int val) {
        if (root == null) return new Node(val);
        if (val < root.val) root.left = insert(root.left, val);
        else root.right = insert(root.right, val);

        update(root);
        int balance = bf(root);

        if (balance > 1 && val < root.left.val) return rotateRight(root);
        if (balance < -1 && val > root.right.val) return rotateLeft(root);
        if (balance > 1 && val > root.left.val) {
            root.left = rotateLeft(root.left);
            return rotateRight(root);
        }
        if (balance < -1 && val < root.right.val) {
            root.right = rotateRight(root.right);
            return rotateLeft(root);
        }
        return root;
    }
}`,
    explanation: 'Java AVL insertion encapsulated in a class with height-aware rebalancing.',
  },
];

export const avlQuestions: QuizQuestion[] = [
  {
    id: 'q-avl-1',
    quiz_id: 'quiz-avl',
    question_text: 'What is the maximum allowed balance factor magnitude for any node in a valid AVL tree?',
    question_type: 'MCQ',
    options: ['0', '1', '2', 'Unbounded'],
    correct_option_index: 1,
    explanation: 'Every node in an AVL tree must have a balance factor of -1, 0, or +1. A magnitude of 2 triggers a rebalancing rotation.',
  },
  {
    id: 'q-avl-2',
    quiz_id: 'quiz-avl',
    question_text: 'A node is left-heavy and the new value was inserted into the RIGHT subtree of its left child. Which rotation fixes this?',
    question_type: 'MCQ',
    options: ['Single right rotation', 'Single left rotation', 'Left rotation on the child, then right rotation on the node (LR)', 'Right rotation on the child, then left rotation on the node (RL)'],
    correct_option_index: 2,
    explanation: 'This is the Left-Right (LR) case: rotate the left child left to convert it into a Left-Left case, then rotate the unbalanced node right.',
  },
  {
    id: 'q-avl-3',
    quiz_id: 'quiz-avl',
    question_text: 'What is the worst-case time complexity of search in an AVL tree?',
    question_type: 'COMPLEXITY',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correct_option_index: 1,
    explanation: 'Because the tree height is kept at O(log N) by the balancing invariant, search is O(log N) even in the worst case — unlike a plain BST which can degrade to O(N).',
  },
  {
    id: 'q-avl-4',
    quiz_id: 'quiz-avl',
    question_text: 'Compared to insertion, deletion in an AVL tree may require:',
    question_type: 'MCQ',
    options: ['No rotations at all', 'At most one rotation', 'Rotations at multiple levels up to the root', 'A full tree rebuild'],
    correct_option_index: 2,
    explanation: 'Insertion needs at most one (single or double) rotation, but deletion may propagate imbalance upward, requiring rotations at several levels along the path to the root.',
  },
];
