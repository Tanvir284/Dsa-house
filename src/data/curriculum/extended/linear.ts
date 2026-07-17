import { CurriculumModule } from '@/types';
import { CATEGORY_IDS } from '../linear';

export const linearExtModules: CurriculumModule[] = [
  // ============================================================
  // 1. DOUBLY LINKED LIST
  // ============================================================
  {
    topic: {
      id: 'ext-doubly-linked-list',
      slug: 'doubly-linked-list',
      category_id: CATEGORY_IDS.linear,
      title: 'Doubly Linked List',
      definition: 'A linked list in which each node holds two pointers — one to the next node and one to the previous node — enabling traversal in both directions.',
      importance: 'Doubly linked lists power LRU caches, browser history, text editors (undo/redo), and any structure that needs O(1) deletion given a node reference.',
      prerequisites: ['linked-list'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) Access at head/tail',
      time_complexity_average: 'O(N) Search',
      time_complexity_worst: 'O(N) Search',
      space_complexity: 'O(N)',
      display_order: 200,
    },
    sections: [
      {
        id: 'sec-doubly-linked-list-1',
        topic_id: 'ext-doubly-linked-list',
        title: 'Visual & Intuitive Explanation',
        content: `
Picture a line of train carriages where **each carriage is coupled to both the one in front and the one behind**. From any carriage you can walk forward *or* backward.

A singly linked list only lets you walk forward. A doubly linked list adds a \`prev\` pointer to every node:

$$\\text{Node} = \\{\\; \\texttt{prev} \\;|\\; \\texttt{data} \\;|\\; \\texttt{next} \\;\\}$$

> [!NOTE]
> The extra \`prev\` pointer is what makes it possible to delete a node in $O(1)$ time when you already hold a reference to it — you don't need to walk from the head to find its predecessor.
    `,
        display_order: 1,
      },
      {
        id: 'sec-doubly-linked-list-2',
        topic_id: 'ext-doubly-linked-list',
        title: 'Core Mechanics',
        content: `
**Insertion after a node \`p\`:**
1. \`newNode.prev = p\`
2. \`newNode.next = p.next\`
3. \`if (p.next) p.next.prev = newNode\`
4. \`p.next = newNode\`

**Deletion of node \`x\`:**
1. \`if (x.prev) x.prev.next = x.next\`
2. \`if (x.next) x.next.prev = x.prev\`

Many implementations use **sentinel (dummy) head and tail nodes** so that no branch needs to test for \`null\`, eliminating most edge cases.
    `,
        display_order: 2,
      },
      {
        id: 'sec-doubly-linked-list-3',
        topic_id: 'ext-doubly-linked-list',
        title: 'Complexity & Properties',
        content: `
| Operation | Complexity |
|-----------|-----------|
| Access by index | $O(N)$ |
| Insert/Delete at head or tail | $O(1)$ |
| Delete a known node | $O(1)$ |
| Search | $O(N)$ |

Space overhead is higher than a singly linked list because every node stores an **extra pointer** ($O(N)$ additional pointers total). The trade-off buys bidirectional traversal and constant-time node removal.
    `,
        display_order: 3,
      },
      {
        id: 'sec-doubly-linked-list-4',
        topic_id: 'ext-doubly-linked-list',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> The most common bug is updating only **one** of the two pointers during insertion or deletion, leaving the list internally inconsistent. Always update both \`prev\` and \`next\` links.

- **Forgetting sentinels**: without dummy nodes you must special-case operations at the head and tail.
- **Memory**: in reference-counted or manual-memory languages, cyclic \`prev\`/\`next\` references can leak if not broken carefully.

**Use cases:** LRU cache (paired with a hash map), the DOM node tree, music/video playlists, and undo–redo stacks.
    `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-doubly-linked-list-py',
        topic_id: 'ext-doubly-linked-list',
        language: 'python',
        code: `class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def push_front(self, data):
        node = Node(data)
        node.next = self.head
        if self.head:
            self.head.prev = node
        else:
            self.tail = node
        self.head = node

    def remove(self, node):
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next
        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev

    def to_list(self):
        out, cur = [], self.head
        while cur:
            out.append(cur.data)
            cur = cur.next
        return out`,
        explanation: 'Doubly linked list with O(1) front insertion and O(1) removal of a known node.',
        is_optimized: true,
      },
      {
        id: 'snip-doubly-linked-list-js',
        topic_id: 'ext-doubly-linked-list',
        language: 'javascript',
        code: `class DNode {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  pushBack(data) {
    const node = new DNode(data);
    node.prev = this.tail;
    if (this.tail) this.tail.next = node;
    else this.head = node;
    this.tail = node;
  }

  remove(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
  }
}`,
        explanation: 'Tail-anchored doubly linked list supporting O(1) append and node removal.',
        is_optimized: true,
      },
      {
        id: 'snip-doubly-linked-list-cpp',
        topic_id: 'ext-doubly-linked-list',
        language: 'cpp',
        code: `#include <iostream>

struct Node {
    int data;
    Node* prev = nullptr;
    Node* next = nullptr;
    Node(int d) : data(d) {}
};

class DoublyLinkedList {
    Node* head = nullptr;
    Node* tail = nullptr;
public:
    void pushBack(int data) {
        Node* node = new Node(data);
        node->prev = tail;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    void remove(Node* node) {
        if (node->prev) node->prev->next = node->next; else head = node->next;
        if (node->next) node->next->prev = node->prev; else tail = node->prev;
        delete node;
    }
    void print() {
        for (Node* c = head; c; c = c->next) std::cout << c->data << ' ';
        std::cout << '\\n';
    }
};`,
        explanation: 'C++ doubly linked list with manual memory management and O(1) node removal.',
        is_optimized: true,
      },
      {
        id: 'snip-doubly-linked-list-java',
        topic_id: 'ext-doubly-linked-list',
        language: 'java',
        code: `class DoublyLinkedList {
    static class Node {
        int data;
        Node prev, next;
        Node(int d) { data = d; }
    }

    Node head, tail;

    void pushBack(int data) {
        Node node = new Node(data);
        node.prev = tail;
        if (tail != null) tail.next = node; else head = node;
        tail = node;
    }

    void remove(Node node) {
        if (node.prev != null) node.prev.next = node.next; else head = node.next;
        if (node.next != null) node.next.prev = node.prev; else tail = node.prev;
    }
}`,
        explanation: 'Java doubly linked list with head/tail references and O(1) removal of a known node.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-doubly-linked-list',
    quizTitle: 'Doubly Linked List Quiz',
    quizDescription: 'Test your understanding of bidirectional linked lists and their operations.',
    questions: [
      {
        id: 'q-doubly-linked-list-1',
        quiz_id: 'quiz-ext-doubly-linked-list',
        question_text: 'What advantage does a doubly linked list have over a singly linked list when deleting a node you already hold a reference to?',
        question_type: 'MCQ',
        options: [
          'It can delete the node in O(1) without traversing from the head',
          'It uses less memory per node',
          'It allows O(1) random access by index',
          'It never needs pointer updates',
        ],
        correct_option_index: 0,
        explanation: 'Because each node stores a prev pointer, you can splice it out directly in O(1); a singly linked list would need O(N) to find the predecessor.',
      },
      {
        id: 'q-doubly-linked-list-2',
        quiz_id: 'quiz-ext-doubly-linked-list',
        question_text: 'A doubly linked list allows random access to the k-th element in O(1) time.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Access by index is still O(N) because you must traverse node by node; only array-like structures give O(1) indexed access.',
      },
      {
        id: 'q-doubly-linked-list-3',
        quiz_id: 'quiz-ext-doubly-linked-list',
        question_text: 'Why do many doubly linked list implementations use sentinel (dummy) head and tail nodes?',
        question_type: 'MCQ',
        options: [
          'To store the list length',
          'To eliminate null checks and special-casing at the boundaries',
          'To make search O(1)',
          'To reduce per-node memory',
        ],
        correct_option_index: 1,
        explanation: 'Sentinels guarantee every real node always has a non-null neighbor, so insertion and deletion logic needs no boundary special cases.',
      },
    ],
  },

  // ============================================================
  // 2. CIRCULAR LINKED LIST
  // ============================================================
  {
    topic: {
      id: 'ext-circular-linked-list',
      slug: 'circular-linked-list',
      category_id: CATEGORY_IDS.linear,
      title: 'Circular Linked List',
      definition: 'A linked list in which the last node points back to the first node (rather than to null), forming a continuous cycle.',
      importance: 'Circular lists model naturally cyclic problems: round-robin CPU scheduling, turn-based games, buffering, and the Josephus problem.',
      prerequisites: ['linked-list'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) Insert at head/tail (with tail pointer)',
      time_complexity_average: 'O(N) Search',
      time_complexity_worst: 'O(N) Search',
      space_complexity: 'O(N)',
      display_order: 201,
    },
    sections: [
      {
        id: 'sec-circular-linked-list-1',
        topic_id: 'ext-circular-linked-list',
        title: 'Visual & Intuitive Explanation',
        content: `
Imagine children sitting in a **circle passing a ball**. After the last child, the ball goes back to the first — there is no "end".

A circular linked list wires the last node's \`next\` back to the head instead of \`null\`:

$$\\texttt{tail.next} \\rightarrow \\texttt{head}$$

> [!NOTE]
> Keeping a single pointer to the **tail** gives O(1) access to *both* the tail (\`tail\`) and the head (\`tail.next\`), which is why round-robin schedulers love this structure.
    `,
        display_order: 1,
      },
      {
        id: 'sec-circular-linked-list-2',
        topic_id: 'ext-circular-linked-list',
        title: 'Core Mechanics',
        content: `
**Insert into an empty list:** create the node and point it to itself (\`node.next = node\`), then set \`tail = node\`.

**Insert at front:** \`node.next = tail.next; tail.next = node;\` (tail unchanged).

**Insert at back:** do the front-insert steps, then \`tail = node\`.

**Traversal:** start at \`head = tail.next\` and stop when you return to \`head\` — never test for \`null\`.
    `,
        display_order: 2,
      },
      {
        id: 'sec-circular-linked-list-3',
        topic_id: 'ext-circular-linked-list',
        title: 'Complexity & Properties',
        content: `
| Operation | Complexity |
|-----------|-----------|
| Insert at head/tail (tail ptr) | $O(1)$ |
| Search / delete by value | $O(N)$ |
| Full rotation | $O(N)$ |

The structure has **no natural terminator**, so every traversal algorithm must track a stopping condition (typically the starting node). It can be singly or doubly linked; a *circular doubly linked list* supports O(1) deletion in both directions and underlies many standard library deque implementations.
    `,
        display_order: 3,
      },
      {
        id: 'sec-circular-linked-list-4',
        topic_id: 'ext-circular-linked-list',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> Traversing with a \`while (cur != null)\` loop causes an **infinite loop** — there is no null. Always stop when you loop back to the start node.

- **Single-node cycle**: forgetting \`node.next = node\` on the first insert breaks the invariant.
- **Deleting the last remaining node**: must reset \`tail = null\`.

**Use cases:** round-robin scheduling, the Josephus elimination problem, circular buffers, and multiplayer turn rotation.
    `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-circular-linked-list-py',
        topic_id: 'ext-circular-linked-list',
        language: 'python',
        code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class CircularLinkedList:
    def __init__(self):
        self.tail = None  # tail.next is the head

    def push_back(self, data):
        node = Node(data)
        if self.tail is None:
            node.next = node
        else:
            node.next = self.tail.next
            self.tail.next = node
        self.tail = node

    def traverse(self):
        if self.tail is None:
            return []
        out, cur = [], self.tail.next
        while True:
            out.append(cur.data)
            cur = cur.next
            if cur is self.tail.next:
                break
        return out`,
        explanation: 'Circular singly linked list keeping a tail pointer for O(1) head/tail insertion.',
        is_optimized: true,
      },
      {
        id: 'snip-circular-linked-list-js',
        topic_id: 'ext-circular-linked-list',
        language: 'javascript',
        code: `class CNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.tail = null;
  }

  pushBack(data) {
    const node = new CNode(data);
    if (!this.tail) {
      node.next = node;
    } else {
      node.next = this.tail.next;
      this.tail.next = node;
    }
    this.tail = node;
  }

  toArray() {
    if (!this.tail) return [];
    const out = [];
    let cur = this.tail.next;
    do {
      out.push(cur.data);
      cur = cur.next;
    } while (cur !== this.tail.next);
    return out;
  }
}`,
        explanation: 'JavaScript circular list; traversal uses a do-while that stops on returning to the head.',
        is_optimized: true,
      },
      {
        id: 'snip-circular-linked-list-cpp',
        topic_id: 'ext-circular-linked-list',
        language: 'cpp',
        code: `#include <iostream>

struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

class CircularLinkedList {
    Node* tail = nullptr;  // tail->next is head
public:
    void pushBack(int data) {
        Node* node = new Node(data);
        if (!tail) {
            node->next = node;
        } else {
            node->next = tail->next;
            tail->next = node;
        }
        tail = node;
    }
    void print() {
        if (!tail) return;
        Node* cur = tail->next;
        do {
            std::cout << cur->data << ' ';
            cur = cur->next;
        } while (cur != tail->next);
        std::cout << '\\n';
    }
};`,
        explanation: 'C++ circular linked list with tail pointer and cycle-terminated traversal.',
        is_optimized: true,
      },
      {
        id: 'snip-circular-linked-list-java',
        topic_id: 'ext-circular-linked-list',
        language: 'java',
        code: `class CircularLinkedList {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; }
    }

    Node tail;  // tail.next is head

    void pushBack(int data) {
        Node node = new Node(data);
        if (tail == null) {
            node.next = node;
        } else {
            node.next = tail.next;
            tail.next = node;
        }
        tail = node;
    }

    void print() {
        if (tail == null) return;
        Node cur = tail.next;
        do {
            System.out.print(cur.data + " ");
            cur = cur.next;
        } while (cur != tail.next);
        System.out.println();
    }
}`,
        explanation: 'Java circular list; the do-while loop halts when it wraps back to the head node.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-circular-linked-list',
    quizTitle: 'Circular Linked List Quiz',
    quizDescription: 'Check your grasp of cyclic linked lists and safe traversal.',
    questions: [
      {
        id: 'q-circular-linked-list-1',
        quiz_id: 'quiz-ext-circular-linked-list',
        question_text: 'In a circular linked list, what does the last node point to?',
        question_type: 'MCQ',
        options: ['null', 'The first (head) node', 'Itself always', 'The middle node'],
        correct_option_index: 1,
        explanation: 'The defining property is that the tail links back to the head, forming a cycle with no null terminator.',
      },
      {
        id: 'q-circular-linked-list-2',
        quiz_id: 'quiz-ext-circular-linked-list',
        question_text: 'Using a while (cur != null) loop is a safe way to traverse a circular linked list.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'There is no null in a circular list, so that condition never becomes false — it loops forever. You must stop upon returning to the start node.',
      },
      {
        id: 'q-circular-linked-list-3',
        quiz_id: 'quiz-ext-circular-linked-list',
        question_text: 'Why is keeping only a tail pointer (instead of a head pointer) convenient in a circular linked list?',
        question_type: 'MCQ',
        options: [
          'It makes search O(1)',
          'The tail gives O(1) access to both the tail and the head via tail.next',
          'It removes the need for node data',
          'It converts the list to an array',
        ],
        correct_option_index: 1,
        explanation: 'Since tail.next is the head, a single tail pointer yields O(1) insertion at both ends — ideal for round-robin scheduling.',
      },
    ],
  },

  // ============================================================
  // 3. STACK (LIST-BASED)
  // ============================================================
  {
    topic: {
      id: 'ext-stack-list-based',
      slug: 'stack-list-based',
      category_id: CATEGORY_IDS.linear,
      title: 'Stack (Linked-List Based)',
      definition: 'A LIFO (Last-In-First-Out) stack implemented on top of a singly linked list, where push and pop both act on the head node.',
      importance: 'A linked-list stack never needs resizing and gives worst-case O(1) push/pop, useful when a stack must grow unboundedly without amortized copy costs.',
      prerequisites: ['stack', 'linked-list'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1) Push / Pop',
      time_complexity_average: 'O(1) Push / Pop',
      time_complexity_worst: 'O(1) Push / Pop',
      space_complexity: 'O(N)',
      display_order: 202,
    },
    sections: [
      {
        id: 'sec-stack-list-based-1',
        topic_id: 'ext-stack-list-based',
        title: 'Visual & Intuitive Explanation',
        content: `
Think of a **stack of plates**: you always add and remove from the top. In a linked-list stack the "top" is the **head** of the list.

$$\\texttt{top} \\rightarrow n_k \\rightarrow n_{k-1} \\rightarrow \\dots \\rightarrow n_1 \\rightarrow \\texttt{null}$$

> [!NOTE]
> Unlike an array-backed stack, there is no capacity to outgrow: pushing simply allocates one node and rewires the head, so every push is worst-case $O(1)$ — no amortized doubling copies.
    `,
        display_order: 1,
      },
      {
        id: 'sec-stack-list-based-2',
        topic_id: 'ext-stack-list-based',
        title: 'Core Mechanics',
        content: `
**push(x):**
1. \`node.next = top\`
2. \`top = node\`

**pop():**
1. \`if (top == null) error\`
2. \`value = top.data\`
3. \`top = top.next\`
4. return \`value\`

**peek():** return \`top.data\` without unlinking. All three operations touch only the head node.
    `,
        display_order: 2,
      },
      {
        id: 'sec-stack-list-based-3',
        topic_id: 'ext-stack-list-based',
        title: 'Complexity & Properties',
        content: `
| Operation | Complexity |
|-----------|-----------|
| Push | $O(1)$ worst case |
| Pop | $O(1)$ worst case |
| Peek | $O(1)$ |
| Search | $O(N)$ |

**Array vs. linked stack:** an array stack has better cache locality and lower per-element overhead, but occasional $O(N)$ resize copies. A linked stack has one pointer of overhead per element and worse locality, but guaranteed $O(1)$ push with no resizing.
    `,
        display_order: 3,
      },
      {
        id: 'sec-stack-list-based-4',
        topic_id: 'ext-stack-list-based',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> Always check for an empty stack before \`pop\`/\`peek\`. Dereferencing a null \`top\` is the classic crash.

- **Memory overhead**: each element costs an extra pointer plus allocator bookkeeping.
- **Cache misses**: nodes may be scattered in memory, unlike a contiguous array.

**Use cases:** recursion/expression evaluation, undo systems, and depth-first search where the maximum depth is unknown in advance.
    `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-stack-list-based-py',
        topic_id: 'ext-stack-list-based',
        language: 'python',
        code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedStack:
    def __init__(self):
        self.top = None
        self._size = 0

    def push(self, data):
        node = Node(data)
        node.next = self.top
        self.top = node
        self._size += 1

    def pop(self):
        if self.top is None:
            raise IndexError("pop from empty stack")
        data = self.top.data
        self.top = self.top.next
        self._size -= 1
        return data

    def peek(self):
        if self.top is None:
            raise IndexError("peek from empty stack")
        return self.top.data

    def __len__(self):
        return self._size`,
        explanation: 'LIFO stack over a singly linked list with O(1) push/pop at the head.',
        is_optimized: true,
      },
      {
        id: 'snip-stack-list-based-js',
        topic_id: 'ext-stack-list-based',
        language: 'javascript',
        code: `class LinkedStack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(data) {
    this.top = { data, next: this.top };
    this.size++;
  }

  pop() {
    if (!this.top) throw new Error('pop from empty stack');
    const { data } = this.top;
    this.top = this.top.next;
    this.size--;
    return data;
  }

  peek() {
    if (!this.top) throw new Error('peek from empty stack');
    return this.top.data;
  }

  isEmpty() {
    return this.top === null;
  }
}`,
        explanation: 'JavaScript linked stack using inline node objects for constant-time push and pop.',
        is_optimized: true,
      },
      {
        id: 'snip-stack-list-based-cpp',
        topic_id: 'ext-stack-list-based',
        language: 'cpp',
        code: `#include <stdexcept>

template <typename T>
class LinkedStack {
    struct Node {
        T data;
        Node* next;
        Node(const T& d, Node* n) : data(d), next(n) {}
    };
    Node* topNode = nullptr;
    int count = 0;
public:
    ~LinkedStack() { while (topNode) pop(); }

    void push(const T& data) {
        topNode = new Node(data, topNode);
        ++count;
    }
    T pop() {
        if (!topNode) throw std::underflow_error("empty stack");
        Node* n = topNode;
        T data = n->data;
        topNode = n->next;
        delete n;
        --count;
        return data;
    }
    const T& peek() const {
        if (!topNode) throw std::underflow_error("empty stack");
        return topNode->data;
    }
    bool empty() const { return topNode == nullptr; }
};`,
        explanation: 'Generic C++ linked stack with RAII cleanup and O(1) push/pop.',
        is_optimized: true,
      },
      {
        id: 'snip-stack-list-based-java',
        topic_id: 'ext-stack-list-based',
        language: 'java',
        code: `import java.util.NoSuchElementException;

class LinkedStack<T> {
    private static class Node<T> {
        T data;
        Node<T> next;
        Node(T data, Node<T> next) { this.data = data; this.next = next; }
    }

    private Node<T> top;
    private int size;

    public void push(T data) {
        top = new Node<>(data, top);
        size++;
    }

    public T pop() {
        if (top == null) throw new NoSuchElementException("empty stack");
        T data = top.data;
        top = top.next;
        size--;
        return data;
    }

    public T peek() {
        if (top == null) throw new NoSuchElementException("empty stack");
        return top.data;
    }

    public boolean isEmpty() { return top == null; }
    public int size() { return size; }
}`,
        explanation: 'Generic Java linked stack; all mutations operate on the head node in O(1).',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-stack-list-based',
    quizTitle: 'Linked-List Stack Quiz',
    quizDescription: 'Evaluate your understanding of LIFO stacks built on linked lists.',
    questions: [
      {
        id: 'q-stack-list-based-1',
        quiz_id: 'quiz-ext-stack-list-based',
        question_text: 'In a linked-list stack, which node do push and pop operate on?',
        question_type: 'MCQ',
        options: ['The tail node', 'The head (top) node', 'The middle node', 'A random node'],
        correct_option_index: 1,
        explanation: 'Both push and pop rewire the head so that each is O(1); operating at the tail would require O(N) traversal in a singly linked list.',
      },
      {
        id: 'q-stack-list-based-2',
        quiz_id: 'quiz-ext-stack-list-based',
        question_text: 'A linked-list stack requires periodic O(N) resizing like a dynamic-array stack.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'It never resizes; each push allocates a single node, so push is worst-case O(1) with no amortized copy cost.',
      },
      {
        id: 'q-stack-list-based-3',
        quiz_id: 'quiz-ext-stack-list-based',
        question_text: 'What is the worst-case time complexity of push and pop in a linked-list stack?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correct_option_index: 0,
        explanation: 'Because only the head pointer is touched, both operations are strictly O(1) in the worst case.',
      },
    ],
  },

  // ============================================================
  // 4. QUEUE (LIST-BASED)
  // ============================================================
  {
    topic: {
      id: 'ext-queue-list-based',
      slug: 'queue-list-based',
      category_id: CATEGORY_IDS.linear,
      title: 'Queue (Linked-List Based)',
      definition: 'A FIFO (First-In-First-Out) queue implemented on a singly linked list with both head and tail pointers, so enqueue and dequeue are O(1).',
      importance: 'Linked-list queues underpin BFS, task scheduling, and producer–consumer buffers where unbounded growth without resizing is desirable.',
      prerequisites: ['queue', 'linked-list'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1) Enqueue / Dequeue',
      time_complexity_average: 'O(1) Enqueue / Dequeue',
      time_complexity_worst: 'O(1) Enqueue / Dequeue',
      space_complexity: 'O(N)',
      display_order: 203,
    },
    sections: [
      {
        id: 'sec-queue-list-based-1',
        topic_id: 'ext-queue-list-based',
        title: 'Visual & Intuitive Explanation',
        content: `
Think of a **line at a ticket counter**: people join at the back and are served from the front. A linked-list queue keeps two pointers:

$$\\texttt{front} \\rightarrow n_1 \\rightarrow n_2 \\rightarrow \\dots \\rightarrow n_k \\leftarrow \\texttt{rear}$$

> [!NOTE]
> The **rear (tail) pointer** is the key to O(1) enqueue. Without it you would have to walk the whole list to find the last node before appending, making enqueue O(N).
    `,
        display_order: 1,
      },
      {
        id: 'sec-queue-list-based-2',
        topic_id: 'ext-queue-list-based',
        title: 'Core Mechanics',
        content: `
**enqueue(x)** (add at rear):
1. create \`node\`
2. \`if (rear) rear.next = node; else front = node;\`
3. \`rear = node\`

**dequeue()** (remove at front):
1. \`if (front == null) error\`
2. \`value = front.data; front = front.next;\`
3. \`if (front == null) rear = null;\`
4. return \`value\`
    `,
        display_order: 2,
      },
      {
        id: 'sec-queue-list-based-3',
        topic_id: 'ext-queue-list-based',
        title: 'Complexity & Properties',
        content: `
| Operation | Complexity |
|-----------|-----------|
| Enqueue (rear) | $O(1)$ |
| Dequeue (front) | $O(1)$ |
| Peek front | $O(1)$ |
| Search | $O(N)$ |

Compared with a **circular-array queue**, the linked version never reaches "full" (until memory runs out) and needs no modular index arithmetic, but pays one pointer per element and suffers more cache misses.
    `,
        display_order: 3,
      },
      {
        id: 'sec-queue-list-based-4',
        topic_id: 'ext-queue-list-based',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> The single most common bug: after dequeuing the **last** element you must reset \`rear = null\`. Otherwise \`rear\` dangles to a freed/detached node and the next enqueue corrupts the queue.

- **Enqueueing without a tail pointer** silently degrades enqueue to O(N).
- **Empty checks** are required before dequeue/peek.

**Use cases:** breadth-first search, CPU/print job scheduling, and message/event queues.
    `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-queue-list-based-py',
        topic_id: 'ext-queue-list-based',
        language: 'python',
        code: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedQueue:
    def __init__(self):
        self.front = None
        self.rear = None
        self._size = 0

    def enqueue(self, data):
        node = Node(data)
        if self.rear is None:
            self.front = self.rear = node
        else:
            self.rear.next = node
            self.rear = node
        self._size += 1

    def dequeue(self):
        if self.front is None:
            raise IndexError("dequeue from empty queue")
        data = self.front.data
        self.front = self.front.next
        if self.front is None:
            self.rear = None
        self._size -= 1
        return data

    def __len__(self):
        return self._size`,
        explanation: 'FIFO queue with front/rear pointers giving O(1) enqueue and dequeue.',
        is_optimized: true,
      },
      {
        id: 'snip-queue-list-based-js',
        topic_id: 'ext-queue-list-based',
        language: 'javascript',
        code: `class LinkedQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(data) {
    const node = { data, next: null };
    if (!this.rear) this.front = this.rear = node;
    else {
      this.rear.next = node;
      this.rear = node;
    }
    this.size++;
  }

  dequeue() {
    if (!this.front) throw new Error('dequeue from empty queue');
    const { data } = this.front;
    this.front = this.front.next;
    if (!this.front) this.rear = null;
    this.size--;
    return data;
  }

  peek() {
    if (!this.front) throw new Error('peek from empty queue');
    return this.front.data;
  }
}`,
        explanation: 'JavaScript FIFO queue; resets rear to null when the last element is removed.',
        is_optimized: true,
      },
      {
        id: 'snip-queue-list-based-cpp',
        topic_id: 'ext-queue-list-based',
        language: 'cpp',
        code: `#include <stdexcept>

template <typename T>
class LinkedQueue {
    struct Node {
        T data;
        Node* next = nullptr;
        Node(const T& d) : data(d) {}
    };
    Node* front = nullptr;
    Node* rear = nullptr;
public:
    ~LinkedQueue() { while (front) dequeue(); }

    void enqueue(const T& data) {
        Node* node = new Node(data);
        if (!rear) front = rear = node;
        else { rear->next = node; rear = node; }
    }
    T dequeue() {
        if (!front) throw std::underflow_error("empty queue");
        Node* n = front;
        T data = n->data;
        front = front->next;
        if (!front) rear = nullptr;
        delete n;
        return data;
    }
    bool empty() const { return front == nullptr; }
};`,
        explanation: 'Generic C++ linked queue with head/tail pointers and RAII cleanup.',
        is_optimized: true,
      },
      {
        id: 'snip-queue-list-based-java',
        topic_id: 'ext-queue-list-based',
        language: 'java',
        code: `import java.util.NoSuchElementException;

class LinkedQueue<T> {
    private static class Node<T> {
        T data;
        Node<T> next;
        Node(T data) { this.data = data; }
    }

    private Node<T> front, rear;
    private int size;

    public void enqueue(T data) {
        Node<T> node = new Node<>(data);
        if (rear == null) front = rear = node;
        else { rear.next = node; rear = node; }
        size++;
    }

    public T dequeue() {
        if (front == null) throw new NoSuchElementException("empty queue");
        T data = front.data;
        front = front.next;
        if (front == null) rear = null;
        size--;
        return data;
    }

    public boolean isEmpty() { return front == null; }
    public int size() { return size; }
}`,
        explanation: 'Generic Java linked queue; O(1) enqueue at rear and dequeue at front.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-queue-list-based',
    quizTitle: 'Linked-List Queue Quiz',
    quizDescription: 'Assess your understanding of FIFO queues implemented with linked lists.',
    questions: [
      {
        id: 'q-queue-list-based-1',
        quiz_id: 'quiz-ext-queue-list-based',
        question_text: 'Why does a linked-list queue keep a rear (tail) pointer in addition to a front pointer?',
        question_type: 'MCQ',
        options: [
          'To make dequeue O(1)',
          'To make enqueue O(1) without traversing to the last node',
          'To enable random access',
          'To sort elements automatically',
        ],
        correct_option_index: 1,
        explanation: 'The rear pointer lets enqueue append to the last node directly in O(1); without it, finding the tail would take O(N).',
      },
      {
        id: 'q-queue-list-based-2',
        quiz_id: 'quiz-ext-queue-list-based',
        question_text: 'After dequeuing the last element of a linked-list queue, you must set the rear pointer to null.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'When front becomes null the queue is empty, so rear must also be nulled; otherwise it dangles and the next enqueue corrupts the queue.',
      },
      {
        id: 'q-queue-list-based-3',
        quiz_id: 'quiz-ext-queue-list-based',
        question_text: 'A queue follows which ordering discipline?',
        question_type: 'MCQ',
        options: ['LIFO (Last-In-First-Out)', 'FIFO (First-In-First-Out)', 'Random access', 'Sorted order'],
        correct_option_index: 1,
        explanation: 'A queue is FIFO: the first element enqueued is the first one dequeued, like a line at a counter.',
      },
    ],
  },

  // ============================================================
  // 5. DEQUE (DOUBLE-ENDED QUEUE)
  // ============================================================
  {
    topic: {
      id: 'ext-deque-double-ended-queue',
      slug: 'deque-double-ended-queue',
      category_id: CATEGORY_IDS.linear,
      title: 'Deque (Double-Ended Queue)',
      definition: 'A linear structure that supports insertion and removal at both the front and the back in O(1), generalizing both stacks and queues.',
      importance: 'Deques back the sliding-window maximum algorithm, work-stealing schedulers, and any workload that pushes/pops at either end.',
      prerequisites: ['queue', 'doubly-linked-list'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) Push/Pop both ends',
      time_complexity_average: 'O(1) Push/Pop both ends',
      time_complexity_worst: 'O(1) Push/Pop both ends',
      space_complexity: 'O(N)',
      display_order: 204,
    },
    sections: [
      {
        id: 'sec-deque-double-ended-queue-1',
        topic_id: 'ext-deque-double-ended-queue',
        title: 'Visual & Intuitive Explanation',
        content: `
A deque is a **hallway open at both ends**: you can add or remove people at the left *or* the right.

$$\\texttt{front} \\leftrightarrow n_1 \\leftrightarrow n_2 \\leftrightarrow \\dots \\leftrightarrow n_k \\leftrightarrow \\texttt{back}$$

> [!NOTE]
> A deque is a strict **generalization**: restrict it to one end and it behaves like a stack; push at one end and pop at the other and it behaves like a queue.
    `,
        display_order: 1,
      },
      {
        id: 'sec-deque-double-ended-queue-2',
        topic_id: 'ext-deque-double-ended-queue',
        title: 'Core Mechanics',
        content: `
Two standard implementations:

1. **Doubly linked list** — front/back pointers; each of \`pushFront\`, \`pushBack\`, \`popFront\`, \`popBack\` is $O(1)$ and there is no capacity limit.
2. **Circular dynamic array** — front and back indices wrap with modular arithmetic \`(i + 1) % capacity\`; amortized $O(1)$ but needs resizing. This gives $O(1)$ random access, which the linked version lacks.
    `,
        display_order: 2,
      },
      {
        id: 'sec-deque-double-ended-queue-3',
        topic_id: 'ext-deque-double-ended-queue',
        title: 'Complexity & Properties',
        content: `
| Operation | Linked | Circular Array |
|-----------|--------|----------------|
| pushFront/pushBack | $O(1)$ | amortized $O(1)$ |
| popFront/popBack | $O(1)$ | $O(1)$ |
| Random access by index | $O(N)$ | $O(1)$ |

Python's \`collections.deque\` uses a doubly linked list of fixed-size blocks; C++'s \`std::deque\` uses a map of chunks giving $O(1)$ indexed access.
    `,
        display_order: 3,
      },
      {
        id: 'sec-deque-double-ended-queue-4',
        topic_id: 'ext-deque-double-ended-queue',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> In a circular-array deque, confusing \`(front - 1 + capacity) % capacity\` when pushing to the front is a frequent off-by-one bug. Always add capacity before taking the modulus to avoid negative indices.

- Removing from an empty deque must be guarded on **both** ends.

**Use cases:** sliding-window maximum/minimum (monotonic deque), palindrome checking, and task-stealing thread pools.
    `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-deque-double-ended-queue-py',
        topic_id: 'ext-deque-double-ended-queue',
        language: 'python',
        code: `class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


class Deque:
    def __init__(self):
        self.front = None
        self.back = None

    def push_front(self, data):
        node = Node(data)
        node.next = self.front
        if self.front:
            self.front.prev = node
        else:
            self.back = node
        self.front = node

    def push_back(self, data):
        node = Node(data)
        node.prev = self.back
        if self.back:
            self.back.next = node
        else:
            self.front = node
        self.back = node

    def pop_front(self):
        if self.front is None:
            raise IndexError("empty deque")
        data = self.front.data
        self.front = self.front.next
        if self.front:
            self.front.prev = None
        else:
            self.back = None
        return data`,
        explanation: 'Doubly-linked deque with O(1) insertion and removal at both ends.',
        is_optimized: true,
      },
      {
        id: 'snip-deque-double-ended-queue-js',
        topic_id: 'ext-deque-double-ended-queue',
        language: 'javascript',
        code: `class Deque {
  constructor() {
    this.front = null;
    this.back = null;
  }

  pushFront(data) {
    const node = { data, prev: null, next: this.front };
    if (this.front) this.front.prev = node;
    else this.back = node;
    this.front = node;
  }

  pushBack(data) {
    const node = { data, prev: this.back, next: null };
    if (this.back) this.back.next = node;
    else this.front = node;
    this.back = node;
  }

  popFront() {
    if (!this.front) throw new Error('empty deque');
    const { data } = this.front;
    this.front = this.front.next;
    if (this.front) this.front.prev = null;
    else this.back = null;
    return data;
  }

  popBack() {
    if (!this.back) throw new Error('empty deque');
    const { data } = this.back;
    this.back = this.back.prev;
    if (this.back) this.back.next = null;
    else this.front = null;
    return data;
  }
}`,
        explanation: 'JavaScript deque backed by a doubly linked list; all four end operations are O(1).',
        is_optimized: true,
      },
      {
        id: 'snip-deque-double-ended-queue-cpp',
        topic_id: 'ext-deque-double-ended-queue',
        language: 'cpp',
        code: `#include <stdexcept>

template <typename T>
class Deque {
    struct Node {
        T data;
        Node* prev = nullptr;
        Node* next = nullptr;
        Node(const T& d) : data(d) {}
    };
    Node* front = nullptr;
    Node* back = nullptr;
public:
    void pushFront(const T& d) {
        Node* n = new Node(d);
        n->next = front;
        if (front) front->prev = n; else back = n;
        front = n;
    }
    void pushBack(const T& d) {
        Node* n = new Node(d);
        n->prev = back;
        if (back) back->next = n; else front = n;
        back = n;
    }
    T popFront() {
        if (!front) throw std::underflow_error("empty");
        Node* n = front; T d = n->data;
        front = front->next;
        if (front) front->prev = nullptr; else back = nullptr;
        delete n; return d;
    }
    T popBack() {
        if (!back) throw std::underflow_error("empty");
        Node* n = back; T d = n->data;
        back = back->prev;
        if (back) back->next = nullptr; else front = nullptr;
        delete n; return d;
    }
};`,
        explanation: 'C++ doubly-linked deque supporting O(1) push/pop at both ends.',
        is_optimized: true,
      },
      {
        id: 'snip-deque-double-ended-queue-java',
        topic_id: 'ext-deque-double-ended-queue',
        language: 'java',
        code: `import java.util.NoSuchElementException;

class Deque<T> {
    private static class Node<T> {
        T data;
        Node<T> prev, next;
        Node(T data) { this.data = data; }
    }

    private Node<T> front, back;

    public void pushFront(T data) {
        Node<T> n = new Node<>(data);
        n.next = front;
        if (front != null) front.prev = n; else back = n;
        front = n;
    }

    public void pushBack(T data) {
        Node<T> n = new Node<>(data);
        n.prev = back;
        if (back != null) back.next = n; else front = n;
        back = n;
    }

    public T popFront() {
        if (front == null) throw new NoSuchElementException();
        T data = front.data;
        front = front.next;
        if (front != null) front.prev = null; else back = null;
        return data;
    }

    public T popBack() {
        if (back == null) throw new NoSuchElementException();
        T data = back.data;
        back = back.prev;
        if (back != null) back.next = null; else front = null;
        return data;
    }
}`,
        explanation: 'Generic Java deque on a doubly linked list; symmetric O(1) front/back operations.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-deque-double-ended-queue',
    quizTitle: 'Deque Quiz',
    quizDescription: 'Test your knowledge of double-ended queues and their two common implementations.',
    questions: [
      {
        id: 'q-deque-double-ended-queue-1',
        quiz_id: 'quiz-ext-deque-double-ended-queue',
        question_text: 'Which operations does a deque support in O(1)?',
        question_type: 'MCQ',
        options: [
          'Insertion/removal only at the front',
          'Insertion/removal at both the front and the back',
          'Random access by index only',
          'Sorted insertion',
        ],
        correct_option_index: 1,
        explanation: 'A deque is double-ended: push and pop at both front and back run in O(1), which generalizes stacks and queues.',
      },
      {
        id: 'q-deque-double-ended-queue-2',
        quiz_id: 'quiz-ext-deque-double-ended-queue',
        question_text: 'A deque implemented with a doubly linked list supports O(1) random access by index.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'The linked implementation needs O(N) to reach an arbitrary index; only a circular-array deque gives O(1) indexed access.',
      },
      {
        id: 'q-deque-double-ended-queue-3',
        quiz_id: 'quiz-ext-deque-double-ended-queue',
        question_text: 'In a circular-array deque, why is pushing to the front written as (front - 1 + capacity) % capacity?',
        question_type: 'MCQ',
        options: [
          'To double the capacity',
          'To avoid a negative index when front is 0',
          'To sort the elements',
          'To free memory',
        ],
        correct_option_index: 1,
        explanation: 'Adding capacity before the modulus keeps the index non-negative when front is 0, correctly wrapping to the last slot.',
      },
    ],
  },

  // ============================================================
  // 6. CIRCULAR QUEUE
  // ============================================================
  {
    topic: {
      id: 'ext-circular-queue',
      slug: 'circular-queue',
      category_id: CATEGORY_IDS.linear,
      title: 'Circular Queue',
      definition: 'A fixed-capacity FIFO queue stored in an array whose front and rear indices wrap around using modular arithmetic, reusing freed slots.',
      importance: 'Circular queues are the standard bounded buffer for streaming data, hardware I/O, and fixed-memory embedded systems where allocation is forbidden.',
      prerequisites: ['queue', 'array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) Enqueue / Dequeue',
      time_complexity_average: 'O(1) Enqueue / Dequeue',
      time_complexity_worst: 'O(1) Enqueue / Dequeue',
      space_complexity: 'O(N)',
      display_order: 205,
    },
    sections: [
      {
        id: 'sec-circular-queue-1',
        topic_id: 'ext-circular-queue',
        title: 'Visual & Intuitive Explanation',
        content: `
A naive array queue "walks off the end": after many dequeues the front index drifts right and the leading slots are wasted. A **circular queue** treats the array as a ring, wrapping indices back to 0:

$$\\texttt{next}(i) = (i + 1) \\bmod \\texttt{capacity}$$

> [!NOTE]
> Wrapping lets a dequeued slot be reused for a later enqueue, so a fixed array of size $N$ can serve an unbounded stream as long as at most $N$ items are live at once.
    `,
        display_order: 1,
      },
      {
        id: 'sec-circular-queue-2',
        topic_id: 'ext-circular-queue',
        title: 'Core Mechanics',
        content: `
Track \`front\`, \`rear\`, and a \`count\` (or leave one slot empty) to distinguish full from empty.

**enqueue(x):** \`if (count == capacity) full; rear = (rear + 1) % capacity; buf[rear] = x; count++;\`

**dequeue():** \`if (count == 0) empty; x = buf[front]; front = (front + 1) % capacity; count--; return x;\`

> [!IMPORTANT]
> Using \`front == rear\` alone can't tell full from empty. Either keep a \`count\`, or sacrifice one slot so that full is \`(rear + 1) % capacity == front\`.
    `,
        display_order: 2,
      },
      {
        id: 'sec-circular-queue-3',
        topic_id: 'ext-circular-queue',
        title: 'Complexity & Properties',
        content: `
| Operation | Complexity |
|-----------|-----------|
| Enqueue | $O(1)$ |
| Dequeue | $O(1)$ |
| isFull / isEmpty | $O(1)$ |

Space is $O(N)$ with **no per-element pointer overhead** and excellent cache locality (contiguous memory). The trade-off is a **fixed capacity** — it cannot grow without reallocating.
    `,
        display_order: 3,
      },
      {
        id: 'sec-circular-queue-4',
        topic_id: 'ext-circular-queue',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> The classic bug is the **full-vs-empty ambiguity**: without a count or a reserved empty slot, a full ring and an empty ring both satisfy \`front == rear\`.

- Forgetting the modulus on either index breaks the wrap.
- Overwriting live data when \`isFull\` isn't checked.

**Use cases:** UART/keyboard buffers, audio/video streaming buffers, and traffic shaping in networking.
    `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-circular-queue-py',
        topic_id: 'ext-circular-queue',
        language: 'python',
        code: `class CircularQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.buf = [None] * capacity
        self.front = 0
        self.rear = -1
        self.count = 0

    def is_full(self):
        return self.count == self.capacity

    def is_empty(self):
        return self.count == 0

    def enqueue(self, x):
        if self.is_full():
            raise OverflowError("queue is full")
        self.rear = (self.rear + 1) % self.capacity
        self.buf[self.rear] = x
        self.count += 1

    def dequeue(self):
        if self.is_empty():
            raise IndexError("queue is empty")
        x = self.buf[self.front]
        self.buf[self.front] = None
        self.front = (self.front + 1) % self.capacity
        self.count -= 1
        return x`,
        explanation: 'Fixed-capacity circular queue using a count to disambiguate full from empty.',
        is_optimized: true,
      },
      {
        id: 'snip-circular-queue-js',
        topic_id: 'ext-circular-queue',
        language: 'javascript',
        code: `class CircularQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.buf = new Array(capacity);
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }

  isFull() { return this.count === this.capacity; }
  isEmpty() { return this.count === 0; }

  enqueue(x) {
    if (this.isFull()) throw new Error('queue is full');
    this.rear = (this.rear + 1) % this.capacity;
    this.buf[this.rear] = x;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) throw new Error('queue is empty');
    const x = this.buf[this.front];
    this.buf[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.count--;
    return x;
  }
}`,
        explanation: 'JavaScript ring queue with modular front/rear indices and a live count.',
        is_optimized: true,
      },
      {
        id: 'snip-circular-queue-cpp',
        topic_id: 'ext-circular-queue',
        language: 'cpp',
        code: `#include <vector>
#include <stdexcept>

template <typename T>
class CircularQueue {
    std::vector<T> buf;
    int capacity, front = 0, rear = -1, count = 0;
public:
    explicit CircularQueue(int cap) : buf(cap), capacity(cap) {}

    bool isFull() const { return count == capacity; }
    bool isEmpty() const { return count == 0; }

    void enqueue(const T& x) {
        if (isFull()) throw std::overflow_error("full");
        rear = (rear + 1) % capacity;
        buf[rear] = x;
        ++count;
    }
    T dequeue() {
        if (isEmpty()) throw std::underflow_error("empty");
        T x = buf[front];
        front = (front + 1) % capacity;
        --count;
        return x;
    }
};`,
        explanation: 'C++ circular queue over a std::vector with O(1) modular index wrapping.',
        is_optimized: true,
      },
      {
        id: 'snip-circular-queue-java',
        topic_id: 'ext-circular-queue',
        language: 'java',
        code: `class CircularQueue {
    private final int[] buf;
    private final int capacity;
    private int front = 0, rear = -1, count = 0;

    public CircularQueue(int capacity) {
        this.capacity = capacity;
        this.buf = new int[capacity];
    }

    public boolean isFull() { return count == capacity; }
    public boolean isEmpty() { return count == 0; }

    public void enqueue(int x) {
        if (isFull()) throw new IllegalStateException("full");
        rear = (rear + 1) % capacity;
        buf[rear] = x;
        count++;
    }

    public int dequeue() {
        if (isEmpty()) throw new IllegalStateException("empty");
        int x = buf[front];
        front = (front + 1) % capacity;
        count--;
        return x;
    }
}`,
        explanation: 'Java fixed-capacity circular queue with a count field for full/empty detection.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-circular-queue',
    quizTitle: 'Circular Queue Quiz',
    quizDescription: 'Check your understanding of ring buffers implemented as bounded FIFO queues.',
    questions: [
      {
        id: 'q-circular-queue-1',
        quiz_id: 'quiz-ext-circular-queue',
        question_text: 'How does a circular queue advance the rear index?',
        question_type: 'MCQ',
        options: ['rear = rear + 1', 'rear = (rear + 1) % capacity', 'rear = rear * 2', 'rear = 0 always'],
        correct_option_index: 1,
        explanation: 'Modular increment wraps the index back to 0 at the end of the array, enabling reuse of freed slots.',
      },
      {
        id: 'q-circular-queue-2',
        quiz_id: 'quiz-ext-circular-queue',
        question_text: 'Using only front == rear is sufficient to distinguish a full circular queue from an empty one.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Both full and empty states satisfy front == rear; you need a separate count or must leave one slot unused to disambiguate.',
      },
      {
        id: 'q-circular-queue-3',
        quiz_id: 'quiz-ext-circular-queue',
        question_text: 'What is the enqueue time complexity of a circular queue?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correct_option_index: 0,
        explanation: 'Enqueue only computes a modular index and writes one slot, so it is O(1).',
      },
    ],
  },

  // ============================================================
  // 7. MONOTONIC STACK
  // ============================================================
  {
    topic: {
      id: 'ext-monotonic-stack',
      slug: 'monotonic-stack',
      category_id: CATEGORY_IDS.linear,
      title: 'Monotonic Stack',
      definition: 'A stack that maintains its elements in strictly increasing or decreasing order by popping violators before each push, used to find nearest greater/smaller elements.',
      importance: 'The monotonic stack solves "next greater element", stock span, largest rectangle in a histogram, and daily temperatures in overall O(N) time.',
      prerequisites: ['stack'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(N) total',
      time_complexity_average: 'O(N) total',
      time_complexity_worst: 'O(N) total',
      space_complexity: 'O(N)',
      display_order: 206,
    },
    sections: [
      {
        id: 'sec-monotonic-stack-1',
        topic_id: 'ext-monotonic-stack',
        title: 'Visual & Intuitive Explanation',
        content: `
Imagine scanning heights left to right and keeping a stack that is always **decreasing from bottom to top**. When a taller bar arrives, every shorter bar on top has just found its "next greater element", so we pop them.

$$\\text{stack (bottom} \\to \\text{top)}: \\; v_1 > v_2 > \\dots > v_k$$

> [!NOTE]
> The magic is amortization: each element is **pushed once and popped at most once**, so even though a single step may pop many items, the total work across the scan is $O(N)$.
    `,
        display_order: 1,
      },
      {
        id: 'sec-monotonic-stack-2',
        topic_id: 'ext-monotonic-stack',
        title: 'Core Mechanics',
        content: `
To find the **next greater element** for each index, keep a stack of *indices* whose values are decreasing:

1. For each \`i\`, while the stack is non-empty and \`arr[stack.top] < arr[i]\`, pop \`j\` and record \`answer[j] = arr[i]\`.
2. Push \`i\`.
3. Any indices left on the stack at the end have no greater element to the right.

Swap the comparison (\`>\`) to get *next smaller*, or scan right-to-left for *previous* relationships.
    `,
        display_order: 2,
      },
      {
        id: 'sec-monotonic-stack-3',
        topic_id: 'ext-monotonic-stack',
        title: 'Complexity & Properties',
        content: `
| Aspect | Value |
|--------|-------|
| Total time | $O(N)$ (amortized $O(1)$ per element) |
| Space | $O(N)$ for the stack |

Brute force would compare every pair for $O(N^2)$. The monotonic stack collapses this to linear because the invariant guarantees each element enters and leaves the stack exactly once.
    `,
        display_order: 3,
      },
      {
        id: 'sec-monotonic-stack-4',
        topic_id: 'ext-monotonic-stack',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> Decide up front whether the stack is **strictly** vs. **non-strictly** monotonic (\`<\` vs. \`<=\`). The wrong choice mishandles duplicate values — e.g., "largest rectangle in histogram" needs care so equal heights aren't double-counted.

- Storing values instead of **indices** loses the position info needed for span/distance answers.

**Use cases:** next/previous greater/smaller element, daily temperatures, stock span, largest rectangle in a histogram, and trapping rain water.
    `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-monotonic-stack-py',
        topic_id: 'ext-monotonic-stack',
        language: 'python',
        code: `def next_greater_elements(arr):
    n = len(arr)
    answer = [-1] * n
    stack = []  # holds indices, values decreasing bottom->top
    for i in range(n):
        while stack and arr[stack[-1]] < arr[i]:
            j = stack.pop()
            answer[j] = arr[i]
        stack.append(i)
    return answer


# next_greater_elements([2, 1, 2, 4, 3]) -> [4, 2, 4, -1, -1]`,
        explanation: 'Next greater element in O(N) using a decreasing monotonic stack of indices.',
        is_optimized: true,
      },
      {
        id: 'snip-monotonic-stack-js',
        topic_id: 'ext-monotonic-stack',
        language: 'javascript',
        code: `function nextGreaterElements(arr) {
  const n = arr.length;
  const answer = new Array(n).fill(-1);
  const stack = []; // indices, values decreasing bottom->top
  for (let i = 0; i < n; i++) {
    while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
      const j = stack.pop();
      answer[j] = arr[i];
    }
    stack.push(i);
  }
  return answer;
}

// nextGreaterElements([2, 1, 2, 4, 3]) -> [4, 2, 4, -1, -1]`,
        explanation: 'JavaScript next-greater-element scan with an index stack, O(N) total.',
        is_optimized: true,
      },
      {
        id: 'snip-monotonic-stack-cpp',
        topic_id: 'ext-monotonic-stack',
        language: 'cpp',
        code: `#include <vector>
#include <stack>

std::vector<int> nextGreaterElements(const std::vector<int>& arr) {
    int n = arr.size();
    std::vector<int> answer(n, -1);
    std::stack<int> st; // indices, decreasing values
    for (int i = 0; i < n; ++i) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            answer[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return answer;
}`,
        explanation: 'C++ monotonic stack computing the next greater element in linear time.',
        is_optimized: true,
      },
      {
        id: 'snip-monotonic-stack-java',
        topic_id: 'ext-monotonic-stack',
        language: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class MonotonicStack {
    public static int[] nextGreaterElements(int[] arr) {
        int n = arr.length;
        int[] answer = new int[n];
        java.util.Arrays.fill(answer, -1);
        Deque<Integer> stack = new ArrayDeque<>(); // indices, decreasing
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
                answer[stack.pop()] = arr[i];
            }
            stack.push(i);
        }
        return answer;
    }
}`,
        explanation: 'Java next-greater-element using an ArrayDeque as a monotonic stack of indices.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-monotonic-stack',
    quizTitle: 'Monotonic Stack Quiz',
    quizDescription: 'Test your grasp of the monotonic stack pattern and its amortized analysis.',
    questions: [
      {
        id: 'q-monotonic-stack-1',
        quiz_id: 'quiz-ext-monotonic-stack',
        question_text: 'What is the total time complexity of computing the next greater element with a monotonic stack over N elements?',
        question_type: 'COMPLEXITY',
        options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(log N)'],
        correct_option_index: 0,
        explanation: 'Each element is pushed once and popped at most once, so total work is amortized O(N).',
      },
      {
        id: 'q-monotonic-stack-2',
        quiz_id: 'quiz-ext-monotonic-stack',
        question_text: 'To answer index/distance-based queries (like stock span), a monotonic stack should store indices rather than raw values.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Storing indices preserves positions so you can compute spans and distances; raw values alone lose that information.',
      },
      {
        id: 'q-monotonic-stack-3',
        quiz_id: 'quiz-ext-monotonic-stack',
        question_text: 'For a "next greater element" scan going left to right, the stack should be maintained so that values are:',
        question_type: 'MCQ',
        options: [
          'Increasing from bottom to top',
          'Decreasing from bottom to top',
          'In random order',
          'Sorted alphabetically',
        ],
        correct_option_index: 1,
        explanation: 'A decreasing stack pops elements as soon as a larger value arrives, which is exactly the next greater element for each popped index.',
      },
    ],
  },

  // ============================================================
  // 8. MONOTONIC QUEUE
  // ============================================================
  {
    topic: {
      id: 'ext-monotonic-queue',
      slug: 'monotonic-queue',
      category_id: CATEGORY_IDS.linear,
      title: 'Monotonic Queue',
      definition: 'A deque that maintains monotonic order of its elements, letting you query the min or max of a sliding window in amortized O(1) per step.',
      importance: 'The monotonic queue is the canonical O(N) solution to sliding-window maximum/minimum and appears in DP optimizations like the sliding-window-max transition.',
      prerequisites: ['deque-double-ended-queue', 'monotonic-stack'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(N) total',
      time_complexity_average: 'O(N) total',
      time_complexity_worst: 'O(N) total',
      space_complexity: 'O(K)',
      display_order: 207,
    },
    sections: [
      {
        id: 'sec-monotonic-queue-1',
        topic_id: 'ext-monotonic-queue',
        title: 'Visual & Intuitive Explanation',
        content: `
For a sliding-window **maximum**, keep a deque of candidate indices whose values are **decreasing from front to back**. The front is always the current window's maximum.

$$\\texttt{front} \\; \\ge \\; \\dots \\; \\ge \\; \\texttt{back}$$

> [!NOTE]
> Any element smaller than a newly arriving one can never be a future maximum while the new element is in the window, so we discard it from the back immediately — that pruning is what keeps the work linear.
    `,
        display_order: 1,
      },
      {
        id: 'sec-monotonic-queue-2',
        topic_id: 'ext-monotonic-queue',
        title: 'Core Mechanics',
        content: `
Sliding-window maximum of window size \`k\`:

1. **Pop back** while \`arr[deque.back] <= arr[i]\` (they can never beat \`arr[i]\`).
2. **Push** \`i\` at the back.
3. **Pop front** if it fell out of the window: \`if (deque.front <= i - k) deque.popFront()\`.
4. Once \`i >= k - 1\`, \`arr[deque.front]\` is the window maximum.

For a window minimum, flip the comparison in step 1 to \`>=\`.
    `,
        display_order: 2,
      },
      {
        id: 'sec-monotonic-queue-3',
        topic_id: 'ext-monotonic-queue',
        title: 'Complexity & Properties',
        content: `
| Aspect | Value |
|--------|-------|
| Total time | $O(N)$ (amortized $O(1)$ per element) |
| Space | $O(K)$ — at most one window's worth of indices |

This beats a heap-based solution ($O(N \\log K)$) because the deque never re-sorts: each index is added once and removed once. It also beats the naive $O(N K)$ rescan of every window.
    `,
        display_order: 3,
      },
      {
        id: 'sec-monotonic-queue-4',
        topic_id: 'ext-monotonic-queue',
        title: 'Pitfalls & Use Cases',
        content: `
> [!WARNING]
> Store **indices**, not values — you need the index to evict elements that slide out of the window (\`front <= i - k\`). Storing values alone makes window-expiry impossible.

- Reading the answer before the first full window (\`i < k - 1\`) yields a partial window result.
- Using \`<\` vs \`<=\` inconsistently can leave stale equal-valued indices.

**Use cases:** sliding-window maximum/minimum, "shortest subarray with sum ≥ K", and monotonic-queue DP optimization.
    `,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-monotonic-queue-py',
        topic_id: 'ext-monotonic-queue',
        language: 'python',
        code: `from collections import deque

def max_sliding_window(arr, k):
    dq = deque()  # indices, values decreasing front->back
    result = []
    for i, x in enumerate(arr):
        while dq and arr[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            result.append(arr[dq[0]])
    return result


# max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)
# -> [3, 3, 5, 5, 6, 7]`,
        explanation: 'Sliding-window maximum in O(N) using a decreasing monotonic deque of indices.',
        is_optimized: true,
      },
      {
        id: 'snip-monotonic-queue-js',
        topic_id: 'ext-monotonic-queue',
        language: 'javascript',
        code: `function maxSlidingWindow(arr, k) {
  const dq = []; // indices, values decreasing front->back
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    while (dq.length && arr[dq[dq.length - 1]] <= arr[i]) dq.pop();
    dq.push(i);
    if (dq[0] <= i - k) dq.shift();
    if (i >= k - 1) result.push(arr[dq[0]]);
  }
  return result;
}

// maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)
// -> [3, 3, 5, 5, 6, 7]`,
        explanation: 'JavaScript sliding-window maximum with a monotonic index deque, O(N) total.',
        is_optimized: true,
      },
      {
        id: 'snip-monotonic-queue-cpp',
        topic_id: 'ext-monotonic-queue',
        language: 'cpp',
        code: `#include <vector>
#include <deque>

std::vector<int> maxSlidingWindow(const std::vector<int>& arr, int k) {
    std::deque<int> dq; // indices, decreasing values
    std::vector<int> result;
    for (int i = 0; i < (int)arr.size(); ++i) {
        while (!dq.empty() && arr[dq.back()] <= arr[i]) dq.pop_back();
        dq.push_back(i);
        if (dq.front() <= i - k) dq.pop_front();
        if (i >= k - 1) result.push_back(arr[dq.front()]);
    }
    return result;
}`,
        explanation: 'C++ sliding-window maximum via std::deque, achieving amortized O(1) per element.',
        is_optimized: true,
      },
      {
        id: 'snip-monotonic-queue-java',
        topic_id: 'ext-monotonic-queue',
        language: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class MonotonicQueue {
    public static int[] maxSlidingWindow(int[] arr, int k) {
        Deque<Integer> dq = new ArrayDeque<>(); // indices, decreasing
        int n = arr.length;
        int[] result = new int[n - k + 1];
        for (int i = 0; i < n; i++) {
            while (!dq.isEmpty() && arr[dq.peekLast()] <= arr[i]) dq.pollLast();
            dq.offerLast(i);
            if (dq.peekFirst() <= i - k) dq.pollFirst();
            if (i >= k - 1) result[i - k + 1] = arr[dq.peekFirst()];
        }
        return result;
    }
}`,
        explanation: 'Java sliding-window maximum using an ArrayDeque as a monotonic queue of indices.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-monotonic-queue',
    quizTitle: 'Monotonic Queue Quiz',
    quizDescription: 'Assess your understanding of the monotonic queue and sliding-window extrema.',
    questions: [
      {
        id: 'q-monotonic-queue-1',
        quiz_id: 'quiz-ext-monotonic-queue',
        question_text: 'For sliding-window maximum, where does the current window maximum sit in the monotonic deque?',
        question_type: 'MCQ',
        options: ['At the back', 'At the front', 'In the middle', 'It is not tracked'],
        correct_option_index: 1,
        explanation: 'The deque is kept decreasing front-to-back, so the front index always holds the window maximum.',
      },
      {
        id: 'q-monotonic-queue-2',
        quiz_id: 'quiz-ext-monotonic-queue',
        question_text: 'The monotonic queue solves sliding-window maximum in O(N), faster than the O(N log K) heap approach.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Each index is added and removed at most once with no re-sorting, giving amortized O(1) per step versus O(log K) per heap operation.',
      },
      {
        id: 'q-monotonic-queue-3',
        quiz_id: 'quiz-ext-monotonic-queue',
        question_text: 'Why must a monotonic queue store indices rather than values for sliding-window problems?',
        question_type: 'MCQ',
        options: [
          'To save memory',
          'To detect and evict elements that have slid out of the window',
          'To keep the values sorted',
          'To avoid using a deque',
        ],
        correct_option_index: 1,
        explanation: 'Indices let you test front <= i - k and drop elements that left the window; values alone cannot express window expiry.',
      },
    ],
  },
];
