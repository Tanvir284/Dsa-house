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
  time_complexity_best: 'O(1) Root access',
  time_complexity_average: 'O(N) Search / Traversal',
  time_complexity_worst: 'O(N) Search / Traversal (Unbalanced / skewed)',
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
  {
    id: 'sec-bt-3',
    topic_id: binaryTreeTopic.id,
    title: 'Real-World Analogy',
    content: `
A **binary tree** looks a lot like a family tree drawn on paper. Start with a single person at the top (the *root*). That person can have up to two children below them, and each of those children can have up to two children of their own. Anyone with no children is a **leaf** — the end of that branch of the family.

Another everyday picture is the folders inside a folder on your computer. A parent folder can contain sub-folders, which contain more sub-folders. If we cap the fan-out at two, we get exactly a binary tree.

The important thing to notice is the *hierarchy*: every node (except the root) has exactly one parent, and information flows top-down from the root toward the leaves. That single rule — "at most two children per node" — is the whole definition of a binary tree; everything else (BSTs, heaps, AVLs) is a binary tree with extra rules layered on top.
    `,
    display_order: 3,
  },
  {
    id: 'sec-bt-4',
    topic_id: binaryTreeTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's build a small binary tree by inserting the values \`[50, 30, 70, 20, 40, 60, 80]\` in **level order** (fill left-to-right, top-to-bottom).

**Step 1** — Insert 50 as the root:
\`\`\`
        50
\`\`\`

**Step 2** — Insert 30 as the left child of 50:
\`\`\`
        50
       /
      30
\`\`\`

**Step 3** — Insert 70 as the right child of 50:
\`\`\`
        50
       /  \\
      30   70
\`\`\`

**Step 4** — Insert 20 as the left child of 30:
\`\`\`
        50
       /  \\
      30   70
     /
    20
\`\`\`

**Step 5** — Insert 40 as the right child of 30:
\`\`\`
        50
       /  \\
      30   70
     / \\
    20  40
\`\`\`

**Step 6** — Insert 60 as the left child of 70:
\`\`\`
        50
       /  \\
      30   70
     / \\   /
    20 40 60
\`\`\`

**Step 7** — Insert 80 as the right child of 70:
\`\`\`
        50
       /  \\
      30   70
     / \\   / \\
    20 40 60  80
\`\`\`

Now trace the three DFS traversals on the finished tree:
- **Pre-Order** (Root, Left, Right) → \`50, 30, 20, 40, 70, 60, 80\`
- **In-Order** (Left, Root, Right) → \`20, 30, 40, 50, 60, 70, 80\`
- **Post-Order** (Left, Right, Root) → \`20, 40, 30, 60, 80, 70, 50\`

Notice how In-Order produced a sorted list — that only happened because this particular tree also satisfies the BST property.
    `,
    display_order: 4,
  },
  {
    id: 'sec-bt-5',
    topic_id: binaryTreeTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
1. **Confusing the three traversal orders.** Pre/In/Post refers to *when the root is visited* relative to its two subtrees, not to the order children are visited.
2. **Assuming a binary tree is sorted.** Ordering is only guaranteed for a Binary Search Tree; a plain binary tree can hold values in any arrangement.
3. **Forgetting the null check** in recursive traversals — a missing \`if (node == null) return;\` will crash the moment recursion walks off a leaf.
4. **Mixing up height and depth.** *Depth* counts edges from the root down to the node; *height* counts edges from the node down to its deepest leaf.
5. **Expecting every parent to have two children.** Many nodes have one or zero — accessing \`.left.val\` without checking for null is a classic crash.
6. **Treating "unbalanced" as a bug.** A plain binary tree has no balance requirement; only self-balancing variants (AVL, Red-Black) do.
    `,
    display_order: 5,
  },
  {
    id: 'sec-bt-6',
    topic_id: binaryTreeTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **File-system directories and organization charts** — natural parent/child hierarchies.
- **Expression trees in compilers and calculators** — operators sit at internal nodes, operands at leaves; evaluating in post-order computes the result.
- **Decision trees** in classic machine-learning classifiers — each internal node is a yes/no question.
- **Huffman coding** for lossless data compression — the optimal prefix code is stored as a binary tree.
- **Foundation for specialized structures.** Binary Search Trees, heaps, tries, and segment trees are all binary trees with extra invariants layered on top, so mastering the plain binary tree pays for all of them.
    `,
    display_order: 6,
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
  {
    id: 'sec-bst-4',
    topic_id: bstTopic.id,
    title: 'Real-World Analogy',
    content: `
Picture an old paper phonebook. It's already sorted by last name. When you want to find "Miller", you don't scan every page — you open the book roughly in the middle. If the page you land on says "Nelson", you know Miller sits in the left half, so you throw away the right half entirely. You repeat: pick the middle of what's left, discard the wrong half, and keep halving until you land on the right page.

A **Binary Search Tree** is exactly that phonebook, but built in memory. The root is the "middle page" you'd open first. Its left subtree holds every name that came before it, and its right subtree holds every name that came after. Every node you visit lets you throw away one whole half of the remaining data.

That's why a *balanced* BST is so fast: every comparison discards half the tree, so a million entries take only about 20 steps to search. But if the tree is skinny and unbalanced (the "phonebook" is just one long page), you're back to flipping through it one name at a time.
    `,
    display_order: 4,
  },
  {
    id: 'sec-bst-5',
    topic_id: bstTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's insert \`[50, 30, 70, 20, 40, 60, 80]\` one by one into an empty BST, then search for 40.

**Step 1** — Insert 50 (tree is empty, becomes root):
\`\`\`
        50
\`\`\`

**Step 2** — Insert 30: 30 < 50, go left. Left is empty → place it there.
\`\`\`
        50
       /
      30
\`\`\`

**Step 3** — Insert 70: 70 > 50, go right. Right is empty → place it.
\`\`\`
        50
       /  \\
      30   70
\`\`\`

**Step 4** — Insert 20: 20 < 50 → left. 20 < 30 → left. Empty → place.
\`\`\`
        50
       /  \\
      30   70
     /
    20
\`\`\`

**Step 5** — Insert 40: 40 < 50 → left. 40 > 30 → right. Empty → place.
\`\`\`
        50
       /  \\
      30   70
     / \\
    20  40
\`\`\`

**Step 6** — Insert 60: 60 > 50 → right. 60 < 70 → left. Empty → place.
\`\`\`
        50
       /  \\
      30   70
     / \\   /
    20 40 60
\`\`\`

**Step 7** — Insert 80: 80 > 50 → right. 80 > 70 → right. Empty → place.
\`\`\`
        50
       /  \\
      30   70
     / \\   / \\
    20 40 60  80
\`\`\`

**Search for 40:**
1. Start at root 50. Is 40 == 50? No. 40 < 50 → go **left**.
2. At 30. Is 40 == 30? No. 40 > 30 → go **right**.
3. At 40. Match! Return the node.

We found 40 in 3 comparisons on a tree of 7 nodes — roughly $\\log_2(7) \\approx 3$, exactly what the average case predicts.
    `,
    display_order: 5,
  },
  {
    id: 'sec-bst-6',
    topic_id: bstTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
1. **Assuming a BST is always balanced.** Inserting sorted or nearly-sorted data produces a chain, degrading operations to $O(N)$. Reach for AVL or Red-Black when this matters.
2. **Confusing "smaller goes left" with "smaller goes first".** The rule is about the *node value*, not the insertion order.
3. **Wrong deletion for the two-children case.** Beginners often just remove the node and reattach children arbitrarily. You must replace the node with its **in-order successor** (or predecessor) to preserve the BST property.
4. **Checking only the immediate children when validating a BST.** A node must be greater than *every* value in its left subtree, not just its left child. Always track \`(min, max)\` bounds while recursing.
5. **Allowing duplicates without a policy.** Decide up front whether duplicates go left, right, or are rejected — inconsistency corrupts search.
6. **Reusing a stale root reference after recursive insertion.** The root can change if you rebalance later; always reassign \`root = insert(root, val)\`.
    `,
    display_order: 6,
  },
  {
    id: 'sec-bst-7',
    topic_id: bstTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **Ordered maps and sets** where you need keys in sorted order plus fast lookup — e.g. C++ \`std::map\`, Java \`TreeMap\` (both use Red-Black trees, a self-balancing BST variant).
- **Autocomplete and range queries** — "give me every word between 'app' and 'apz'" is a natural in-order walk between two BST bounds.
- **Priority scheduling in in-memory databases** where you need the min or max in $O(\\log N)$ and want to insert/remove arbitrary keys — heaps only give you one end cheaply, a BST gives both.
- **Symbol tables in interpreters and compilers** to store variable names sorted so lookups and enumerations are both fast.
- **Building block for advanced structures** — segment trees, order-statistics trees, and interval trees all extend the BST idea.
    `,
    display_order: 7,
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
  {
    id: 'sec-avl-5',
    topic_id: avlTopic.id,
    title: 'Real-World Analogy',
    content: `
Imagine a bookshelf that quietly rearranges itself. Every time you slide a new book in, the shelf checks whether one side has become noticeably taller than the other. If it has, the shelf slides a couple of books sideways to level things out again. From your point of view, you never see the shelf lean over — it always looks tidy.

That's an **AVL tree**. Every insert or delete is followed by a quick self-check: is any node's left subtree more than one step taller than its right (or vice versa)? If yes, the tree performs a small local reshuffle — a *rotation* — to restore balance. You didn't ask for it, but the tree does it for you.

The payoff is a guarantee: no matter what order data arrives in, the tree can never become skinny. So the "worst case" of a plain BST — inserting sorted data and getting a linked list — simply cannot happen here. Every lookup, insert, and delete stays $O(\\log N)$.
    `,
    display_order: 5,
  },
  {
    id: 'sec-avl-6',
    topic_id: avlTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's insert \`[50, 30, 70, 20, 40, 60, 80]\` into an AVL tree, then insert one more value that forces a rotation. **BalanceFactor** = height(left) − height(right).

**Step 1** — Insert 50:
\`\`\`
        50   (bf=0)
\`\`\`

**Step 2** — Insert 30 (30 < 50 → left):
\`\`\`
        50   (bf=+1)
       /
      30
\`\`\`

**Step 3** — Insert 70:
\`\`\`
        50   (bf=0)
       /  \\
      30   70
\`\`\`

**Step 4** — Insert 20 (20<50→left, 20<30→left):
\`\`\`
        50   (bf=+1)
       /  \\
      30   70
     /
    20
\`\`\`

**Step 5** — Insert 40:
\`\`\`
        50   (bf=+1)
       /  \\
      30   70
     / \\
    20  40
\`\`\`

**Step 6** — Insert 60:
\`\`\`
        50   (bf=0)
       /  \\
      30   70
     / \\   /
    20 40 60
\`\`\`

**Step 7** — Insert 80. All balance factors are within {-1, 0, +1}, so no rotation needed:
\`\`\`
        50   (bf=0)
       /  \\
      30   70
     / \\   / \\
    20 40 60  80
\`\`\`

**Step 8 — Trigger a rotation.** Now insert 10, then 5.

Inserting 10 (10<50→left, 10<30→left, 10<20→left) attaches 10 as the left child of 20. Recomputing balance factors on the way up: bf(20)=+1, bf(30)=+1, bf(50)=+1. All within limits — no rotation needed:
\`\`\`
          50   (bf=+1)
         /  \\
        30   70
       / \\   / \\
      20 40 60  80
     /
    10
\`\`\`

Now insert 5 (5<50→left, 5<30→left, 5<20→left, 5<10→left) attaches 5 as the left child of 10. Walk back up:
- bf(10) = 1 − 0 = +1, OK.
- bf(20) = 2 − 0 = **+2** — imbalance detected at node 20!

Before rebalancing (imbalance highlighted at 20):
\`\`\`
          50
         /  \\
        30   70
       / \\   / \\
      20 40 60  80   ← 20 has bf=+2
     /
    10
   /
  5
\`\`\`

The new value went into the **left** subtree of 20's **left** child (10) → this is the **Left-Left (LL)** case at node 20 → perform a **single right rotation** at 20. 10 becomes the new root of this small subtree:

After rotation:
\`\`\`
          50   (bf=+1)
         /  \\
        30   70
       / \\   / \\
      10 40 60  80
     /  \\
    5    20
\`\`\`

Every balance factor is now in {−1, 0, +1}, and the rotation was $O(1)$ pointer work.

**Search for 40 in the rebalanced tree:**
1. Root is 50. 40 < 50 → left.
2. At 30. 40 > 30 → right.
3. At 40. Match — found in 3 comparisons.
    `,
    display_order: 6,
  },
  {
    id: 'sec-avl-7',
    topic_id: avlTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
1. **Rotating the wrong direction.** LL case → *right* rotation (not left). The rotation direction is opposite to the "heavy" side.
2. **Missing the double-rotation cases.** LR and RL each need **two** rotations. Applying a single rotation to an LR imbalance leaves the tree still unbalanced.
3. **Forgetting to update heights** after a rotation. If \`node.height\` isn't recomputed for the two nodes involved, every subsequent balance-factor check reads stale data.
4. **Updating heights in the wrong order** during a rotation — always update the *lower* node first, then the new subtree root, because the upper node's height depends on the lower one.
5. **Rebalancing at the wrong level.** After a recursive insert or delete, you must check the balance factor at *every* ancestor on the way back up, not just the root.
6. **Assuming one rotation is enough for delete.** Insertion needs at most one (single or double) rotation; deletion can require rotations at several levels up the path.
    `,
    display_order: 7,
  },
  {
    id: 'sec-avl-8',
    topic_id: avlTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **Database indexes that need worst-case $O(\\log N)$** — AVL's strict balance gives predictable query times where Red-Black's looser bound might spike.
- **In-memory ordered dictionaries in read-heavy systems** — analytical caches, symbol tables in long-running interpreters — where lookups vastly outnumber writes.
- **Interval and range trees** built on top of AVL to answer geometric "which intervals overlap X?" queries with tight worst-case guarantees.
- **Real-time applications** (game servers, high-frequency trading engines) where a spike from a temporarily-unbalanced tree is unacceptable.
- **Teaching and interviews** — AVL is the canonical example of self-balancing rotations, so mastering it makes Red-Black, Splay, and Treap trees much easier to pick up.
    `,
    display_order: 8,
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
