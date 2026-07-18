import { Topic, LessonSection, CodeSnippet, QuizQuestion } from '@/types';

// Let's create UUID constants for reference consistency
export const CATEGORY_IDS = {
  foundations: 'c0c62d00-4bfa-4c41-867b-1d743a60c04f',
  linear: '12d1b54a-bd54-4f05-99fe-005085e3cb76',
  trees: 'ba3c9e6d-66e8-46cb-8d0b-60a6cb774bd0',
  graphs: '5f9227eb-5f33-40a1-8d26-6f8101a070eb',
  algorithms: 'a87e35b7-7ab6-4c9b-b5b6-7f4144e5904d',
  patterns: 'f8a2c910-4e5b-4d6a-9c1f-2b8e7d3a4f50',
};

// 1. ARRAY
export const arrayTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bb1',
  slug: 'array',
  category_id: CATEGORY_IDS.linear,
  title: 'Array',
  definition: 'A collection of items stored at contiguous memory locations, allowing constant-time random access by index.',
  importance: 'Arrays are the foundation for almost all other data structures, including strings, stacks, hash tables, and matrices.',
  prerequisites: [],
  difficulty: 'Beginner',
  time_complexity_best: 'O(1) Access / Update',
  time_complexity_average: 'O(N) Search / Insertion / Deletion',
  time_complexity_worst: 'O(N) Search / Insertion / Deletion',
  space_complexity: 'O(N)',
  display_order: 1,
};

export const arraySections: LessonSection[] = [
  {
    id: 'sec-arr-1',
    topic_id: arrayTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Imagine a row of numbered lockers in a corridor. Each locker is labeled with an index starting from **0** up to **N-1**.
Because the lockers are directly adjacent to each other in memory, if you know the location of locker 0 and the size of one locker, you can calculate the exact location of locker **i** in constant time:
$$\\text{Address}(i) = \\text{Base Address} + i \\times \\text{Size of Element}$$
This makes accessing the value at any index incredibly fast: $O(1)$.
    `,
    display_order: 1,
  },
  {
    id: 'sec-arr-2',
    topic_id: arrayTopic.id,
    title: 'Core Operations & Insertion Trade-Offs',
    content: `
1. **Accessing/Updating ($O(1)$)**: Accessing \`arr[i]\` takes constant time because it is a direct offset lookup.
2. **Searching ($O(N)$)**: You must traverse the array one by one (Linear Search) unless the array is sorted (Binary Search: $O(\\log N)$).
3. **Insertion / Deletion ($O(N)$)**: If you insert/delete at the end of a dynamic array, it is $O(1)$ amortized. However, inserting or deleting at index 0 requires shifting all subsequent elements by one position, which takes $O(N)$ time.
    `,
    display_order: 2,
  },
  {
    id: 'sec-arr-3',
    topic_id: arrayTopic.id,
    title: 'Common Mistakes & Edge Cases',
    content: `
- **Off-by-One Errors**: Accessing \`arr[N]\` in an array of size \`N\` which causes \`IndexOutOfBounds\` exception (valid indices are \`0\` to \`N-1\`).
- **Memory Overhead**: Fixed-size arrays (static arrays) cannot grow. Dynamic arrays resolve this by doubling their capacity when full, which involves allocating new memory and copying elements ($O(N)$ copy cost, but $O(1)$ amortized insertion).
    `,
    display_order: 3,
  },
  {
    id: 'sec-arr-4',
    topic_id: arrayTopic.id,
    title: 'Real-World Analogy',
    content: `
Picture a long shelf in a pharmacy where each slot is numbered from 0 upward. Every slot is the same width, and each holds exactly one pill bottle.

Because the shelf is one straight line of identical slots, the pharmacist never has to search. If a customer asks for the bottle in slot 27, she walks straight to it — she can *calculate* where slot 27 is from slot 0's position and the width of one slot.

But if a new medicine has to be inserted at slot 0, every bottle after it must be nudged one slot to the right so nothing is overwritten. That nudging is exactly what happens in memory when you insert at the front of an array.

If the shelf runs out of slots, the pharmacist has to move to a bigger shelf and carry every bottle over one by one — the same "grow and copy" step a dynamic array performs when it hits capacity.
    `,
    display_order: 4,
  },
  {
    id: 'sec-arr-5',
    topic_id: arrayTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's insert the value **9** at index **2** of the array \`[3, 7, 2, 8, 5]\` (size 5, capacity 6).

1. **Check bounds.** Index 2 is between 0 and size (5), so it is valid.
2. **Make room at the end.** We plan to shift elements right, so we need one free slot after index 4. Capacity 6 gives us that slot.
3. **Shift right, starting from the tail.** Copy \`arr[4]\` into \`arr[5]\`, then \`arr[3]\` into \`arr[4]\`, then \`arr[2]\` into \`arr[3]\`. Always shift from the back so you don't overwrite values you still need.
4. **Write the new value.** Place 9 into slot 2.
5. **Update size.** Increase size from 5 to 6.

\`\`\`
Start (size=5):
 index:   0   1   2   3   4   5
        [ 3 | 7 | 2 | 8 | 5 | _ ]

Step 3a  copy arr[4] -> arr[5]:
        [ 3 | 7 | 2 | 8 | 5 | 5 ]

Step 3b  copy arr[3] -> arr[4]:
        [ 3 | 7 | 2 | 8 | 8 | 5 ]

Step 3c  copy arr[2] -> arr[3]:
        [ 3 | 7 | 2 | 2 | 8 | 5 ]

Step 4   write 9 into arr[2]:
        [ 3 | 7 | 9 | 2 | 8 | 5 ]

End (size=6)
\`\`\`

Notice that three elements had to move. In general, inserting at index \`i\` in a size-\`N\` array shifts \`N - i\` elements — the reason middle inserts cost $O(N)$.
    `,
    display_order: 5,
  },
  {
    id: 'sec-arr-6',
    topic_id: arrayTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
- **Reading past the end** (\`arr[N]\` when size is \`N\`): valid indices are only \`0\` through \`N - 1\`. Fix: always compare with \`size\`, not \`capacity\`.
- **Shifting in the wrong direction** during insert: copying left-to-right overwrites values before you read them. Fix: when inserting, shift *right-to-left*; when deleting, shift *left-to-right*.
- **Forgetting to update \`size\`** after an insert or delete: later reads then miss the new element or read stale garbage. Fix: change \`size\` in the same function that changes the data.
- **Confusing capacity with size**: capacity is how much room is allocated; size is how many slots are actually used. Fix: only iterate up to \`size\`.
- **Using \`==\` on floats stored in the array**: floating-point rounding makes equality unreliable. Fix: compare with a small tolerance (e.g., \`abs(a - b) < 1e-9\`).
- **Holding a pointer into the array across a resize** (C/C++): resizing may move the whole block to a new address, leaving old pointers dangling. Fix: re-fetch the pointer after any operation that can grow the array.
    `,
    display_order: 6,
  },
  {
    id: 'sec-arr-7',
    topic_id: arrayTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **Contact list on your phone**: you often jump straight to "the 15th contact" or scroll by index — random access in $O(1)$ is exactly what arrays give you.
- **Pixel buffer for an image**: a photo is just a rectangle of colored pixels stored row by row; array indexing maps naturally to \`(row, column)\` coordinates.
- **Leaderboard / high-score table** of fixed length (top 10): size is known in advance and you access by rank, so an array beats fancier structures.
- **Sensor readings collected every second**: appending to the end and later scanning them in order is the fastest, most cache-friendly workflow.
- **Lookup tables for constants** (days-per-month, sine values, ASCII codes): the table never changes size and every query is by index.
- **Backing storage for other structures**: stacks, hash tables, heaps, and dynamic arrays themselves are usually built on top of a raw array because contiguous memory is fast to scan.
    `,
    display_order: 7,
  },
];

export const arraySnippets: CodeSnippet[] = [
  {
    id: 'snip-arr-py',
    topic_id: arrayTopic.id,
    language: 'python',
    is_optimized: false,
    code: `class DynamicArray:
    def __init__(self):
        self.capacity = 2
        self.size = 0
        self.array = [None] * self.capacity

    def get(self, index):
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        return self.array[index]

    def append(self, val):
        if self.size == self.capacity:
            self._resize()
        self.array[self.size] = val
        self.size += 1

    def insert_at(self, index, val):
        if index < 0 or index > self.size:
            raise IndexError("Index out of bounds")
        if self.size == self.capacity:
            self._resize()
        for i in range(self.size, index, -1):
            self.array[i] = self.array[i - 1]
        self.array[index] = val
        self.size += 1

    def remove_at(self, index):
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        for i in range(index, self.size - 1):
            self.array[i] = self.array[i + 1]
        self.array[self.size - 1] = None
        self.size -= 1

    def _resize(self):
        self.capacity *= 2
        new_arr = [None] * self.capacity
        for i in range(self.size):
            new_arr[i] = self.array[i]
        self.array = new_arr`,
    explanation: 'Simple dynamic array resize and element shifting operations in Python.',
  },
  {
    id: 'snip-arr-js',
    topic_id: arrayTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `// JS Arrays are dynamic by default. Here is an implementation of shifting logic.
function insertAt(arr, index, val) {
    if (index < 0 || index > arr.length) throw new Error("Index out of bounds");
    // Shift elements right
    for (let i = arr.length; i > index; i--) {
        arr[i] = arr[i - 1];
    }
    arr[index] = val;
    return arr;
}

function removeAt(arr, index) {
    if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
    // Shift elements left
    for (let i = index; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1];
    }
    arr.length = arr.length - 1;
    return arr;
}`,
    explanation: 'Demonstrating the manual insertion/deletion shifting mechanics in JavaScript arrays.',
  },
  {
    id: 'snip-arr-c',
    topic_id: arrayTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* data;
    int size;
    int capacity;
} DynamicArray;

DynamicArray* create_array() {
    DynamicArray* arr = (DynamicArray*)malloc(sizeof(DynamicArray));
    arr->capacity = 2;
    arr->size = 0;
    arr->data = (int*)malloc(arr->capacity * sizeof(int));
    return arr;
}

void append(DynamicArray* arr, int val) {
    if (arr->size == arr->capacity) {
        arr->capacity *= 2;
        arr->data = (int*)realloc(arr->data, arr->capacity * sizeof(int));
    }
    arr->data[arr->size++] = val;
}

void insert_at(DynamicArray* arr, int index, int val) {
    if (index < 0 || index > arr->size) return;
    if (arr->size == arr->capacity) {
        arr->capacity *= 2;
        arr->data = (int*)realloc(arr->data, arr->capacity * sizeof(int));
    }
    for (int i = arr->size; i > index; i--) {
        arr->data[i] = arr->data[i - 1];
    }
    arr->data[index] = val;
    arr->size++;
}`,
    explanation: 'C implementation using realloc for manual capacity scaling and pointer offsets.',
  },
  {
    id: 'snip-arr-cpp',
    topic_id: arrayTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <iostream>
#include <stdexcept>

template <typename T>
class Vector {
private:
    T* arr;
    int capacity;
    int currentSize;

public:
    Vector() {
        capacity = 2;
        currentSize = 0;
        arr = new T[capacity];
    }

    ~Vector() { delete[] arr; }

    void push_back(T val) {
        if (currentSize == capacity) {
            T* temp = new T[2 * capacity];
            for (int i = 0; i < capacity; i++) {
                temp[i] = arr[i];
            }
            delete[] arr;
            capacity *= 2;
            arr = temp;
        }
        arr[currentSize++] = val;
    }

    T get(int index) const {
        if (index < 0 || index >= currentSize) {
            throw std::out_of_range("Index out of bounds");
        }
        return arr[index];
    }
};`,
    explanation: 'C++ custom vector class template managing dynamic heap allocation.',
  },
  {
    id: 'snip-arr-java',
    topic_id: arrayTopic.id,
    language: 'java',
    is_optimized: false,
    code: `public class CustomArrayList<T> {
    private Object[] data;
    private int size = 0;

    public CustomArrayList() {
        data = new Object[10];
    }

    public void add(T val) {
        if (size == data.length) {
            resize();
        }
        data[size++] = val;
    }

    @SuppressWarnings("unchecked")
    public T get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }
        return (T) data[index];
    }

    private void resize() {
        Object[] temp = new Object[data.length * 2];
        System.arraycopy(data, 0, temp, 0, data.length);
        data = temp;
    }
}`,
    explanation: 'Java dynamic resizing array implementation resembling ArrayList.',
  },
  {
    id: 'snip-arr-cs',
    topic_id: arrayTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `using System;

public class CustomList<T> {
    private T[] _items;
    private int _size;

    public CustomList() {
        _items = new T[4];
        _size = 0;
    }

    public void Add(T item) {
        if (_size == _items.Length) {
            T[] newItems = new T[_items.Length * 2];
            Array.Copy(_items, 0, newItems, 0, _size);
            _items = newItems;
        }
        _items[_size++] = item;
    }

    public T Get(int index) {
        if (index < 0 || index >= _size) throw new ArgumentOutOfRangeException();
        return _items[index];
    }
}`,
    explanation: 'C# generic dynamic array with automatic capacity doubling.',
  }
];

export const arrayQuestions: QuizQuestion[] = [
  {
    id: 'q-arr-1',
    quiz_id: 'quiz-arr',
    question_text: 'What is the time complexity to retrieve an element from a specific index in a dynamic array?',
    question_type: 'MCQ',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correct_option_index: 0,
    explanation: 'Arrays store elements in contiguous memory. Since the memory offset is directly calculable, accessing any index takes O(1) constant time.',
  },
  {
    id: 'q-arr-2',
    quiz_id: 'quiz-arr',
    question_text: 'Inserting an element at index 0 of an array of size N requires shifting how many elements?',
    question_type: 'MCQ',
    options: ['0', '1', 'N - 1', 'N'],
    correct_option_index: 3,
    explanation: 'To insert at the beginning (index 0), all N existing elements must be shifted right by one index, taking O(N) operations.',
  },
];


// 2. LINKED LIST
export const linkedListTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bb2',
  slug: 'linked-list',
  category_id: CATEGORY_IDS.linear,
  title: 'Linked List',
  definition: 'A linear data structure where elements are stored in nodes, and each node contains a value and a pointer (or reference) to the next node.',
  importance: 'Linked lists allow dynamic memory allocation and constant-time insertions/deletions at the head without memory reorganization.',
  prerequisites: ['array'],
  difficulty: 'Beginner',
  time_complexity_best: 'O(1) Insert at Head',
  time_complexity_average: 'O(N) Search / Random Access',
  time_complexity_worst: 'O(N) Search / Random Access',
  space_complexity: 'O(N)',
  display_order: 2,
};

export const linkedListSections: LessonSection[] = [
  {
    id: 'sec-ll-1',
    topic_id: linkedListTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Think of a scavenger hunt: you start at the **Head** node. The head has a clue (the data) and a note pointing to the next location.
You follow the links from one node to the next until you reach a node with no note (it points to **Null**), which marks the end of the list (**Tail**).
Unlike arrays, nodes in a linked list can be scattered anywhere in memory. They do not need to be contiguous!
    `,
    display_order: 1,
  },
  {
    id: 'sec-ll-2',
    topic_id: linkedListTopic.id,
    title: 'Core Operations & Pointers',
    content: `
1. **Traverse ($O(N)$)**: Walk node-by-node starting from \`head\` until \`node == null\`.
2. **Insert/Delete at Head ($O(1)$)**: Point the new node's next pointer to the current head, and make the new node the new head. No element shifting is required!
3. **Random Insert/Delete ($O(N)$)**: Requires traversal to find the target position, followed by a constant time pointer updates.
    `,
    display_order: 2,
  },
  {
    id: 'sec-ll-3',
    topic_id: linkedListTopic.id,
    title: 'Common Mistakes & Edge Cases',
    content: `
- **Losing the Rest of the List**: When inserting or deleting nodes, make sure you update pointers in the correct order. If you break the chain before saving the next node, the remaining nodes are lost in memory (causing memory leaks in C/C++).
- **Null Pointer Dereferencing**: Always check if \`head\` is Null before accessing \`head.next\`.
    `,
    display_order: 3,
  },
  {
    id: 'sec-ll-4',
    topic_id: linkedListTopic.id,
    title: 'Real-World Analogy',
    content: `
Think of a treasure hunt where each clue is on a small card. The first card is in your hand — that is the **head**. Every card contains one piece of the treasure story plus a written address telling you where to find the next card.

You cannot skip ahead. To read card number five, you must follow cards one, two, three, and four in turn. That is why finding an element in a linked list is slow: you always start at the head and walk.

But adding a new card at the very front is easy. Write a fresh card, put "go to the old first card" as its address, and hand it over. No other cards need to be rewritten.

If someone tears up the address on one card without first noting where it pointed, every card that came after it is now lost forever — nobody can reach them. That is exactly what a memory leak looks like in a linked list.
    `,
    display_order: 4,
  },
  {
    id: 'sec-ll-5',
    topic_id: linkedListTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's delete the node whose value is **2** from the list \`3 -> 7 -> 2 -> 8 -> 5 -> null\`. A **pointer** is just a variable that holds the address of a node.

1. **Check the head.** Head holds 3, not 2, so we won't touch the head reference.
2. **Set two pointers.** \`prev\` points to the head (3). \`curr\` points to the node after prev (7).
3. **Walk until \`curr.val == 2\`.** After one step, \`prev\` is at 7 and \`curr\` is at 2. Stop.
4. **Bypass the target.** Set \`prev.next = curr.next\`. Now the node holding 7 points directly to the node holding 8, skipping over 2.
5. **Free the removed node.** In C/C++ call \`free\` / \`delete\` on \`curr\`; in Python, JS, Java, C# the garbage collector reclaims it once nothing references it.

\`\`\`
Start:
  head
   |
   v
  [3|*] -> [7|*] -> [2|*] -> [8|*] -> [5|/]

Step 2 (prev at 3, curr at 7):
  prev     curr
   |        |
   v        v
  [3|*] -> [7|*] -> [2|*] -> [8|*] -> [5|/]

Step 3 (walked once, prev at 7, curr at 2):
           prev     curr
            |        |
            v        v
  [3|*] -> [7|*] -> [2|*] -> [8|*] -> [5|/]

Step 4 (rewire prev.next to curr.next):
           prev              curr (about to be freed)
            |                 |
            v                 v
  [3|*] -> [7|*] ----------> [8|*] -> [5|/]
                    \\-- [2|*]  (orphaned)

End:
  head
   |
   v
  [3|*] -> [7|*] -> [8|*] -> [5|/]
\`\`\`

Only two pointer writes were needed once we reached the target — the traversal to find it is what makes deletion by value $O(N)$ overall.
    `,
    display_order: 5,
  },
  {
    id: 'sec-ll-6',
    topic_id: linkedListTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
- **Forgetting to update the head** when you delete the first node: the list still starts at the old (removed) node. Fix: if \`curr == head\`, do \`head = head.next\` before anything else.
- **Overwriting \`next\` before saving it**: once \`node.next\` is reassigned, the old link is gone and later nodes are unreachable. Fix: store \`const nextNode = node.next\` first, then rewire.
- **Dereferencing null**: reading \`curr.next.val\` when \`curr.next\` is null crashes. Fix: guard every step with \`while (curr && curr.next)\`.
- **Assuming random access is fast**: writing \`list[5]\` won't work, and hand-rolling it is $O(N)$. Fix: if you need indexed access frequently, use an array instead.
- **Leaking memory in C/C++**: forgetting to \`free\` a removed node keeps its bytes allocated forever. Fix: capture the node in a temporary variable, unlink it, then free.
- **Creating a cycle by accident**: pointing a tail's \`next\` back into an earlier node makes traversal loop forever. Fix: when appending, make sure the new node's \`next\` is set to \`null\` first.
    `,
    display_order: 6,
  },
  {
    id: 'sec-ll-7',
    topic_id: linkedListTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **Music playlist with "next" and "previous" controls**: a doubly linked list lets you insert, remove, or reorder tracks in $O(1)$ once you have the node, without shifting the whole list.
- **Browser tab list where users close and open tabs constantly**: tabs are inserted and removed anywhere in the sequence, and you rarely jump to "tab number 12" by index.
- **Undo history that only remembers a few recent actions**: each action links back to the previous one; no random access is needed, only "the one before".
- **Adjacency lists in a graph**: each vertex owns a linked list of neighbors that grows and shrinks as edges are added or removed.
- **Memory allocator's free-block list**: the operating system chains together unused chunks of memory; inserting and removing chunks must be cheap and does not require indexing.
- **Streaming data where you don't know the total size**: a linked list can grow one node at a time without ever asking for a bigger contiguous block.
    `,
    display_order: 7,
  },
];

export const linkedListSnippets: CodeSnippet[] = [
  {
    id: 'snip-ll-py',
    topic_id: linkedListTopic.id,
    language: 'python',
    is_optimized: false,
    code: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_at_head(self, val):
        new_node = Node(val)
        new_node.next = self.head
        self.head = new_node

    def delete_node(self, val):
        if not self.head:
            return
        if self.head.val == val:
            self.head = self.head.next
            return
        
        curr = self.head
        while curr.next and curr.next.val != val:
            curr = curr.next
        
        if curr.next:
            curr.next = curr.next.next`,
    explanation: 'Python linked list containing Node definition and insertion/deletion traversal methods.',
  },
  {
    id: 'snip-ll-js',
    topic_id: linkedListTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertAtHead(val) {
        const newNode = new Node(val);
        newNode.next = this.head;
        this.head = newNode;
    }

    traverse() {
        let curr = this.head;
        const result = [];
        while (curr) {
            result.push(curr.val);
            curr = curr.next;
        }
        return result;
    }
}`,
    explanation: 'ES6 class notation implementation of linked lists in JavaScript.',
  },
  {
    id: 'snip-ll-c',
    topic_id: linkedListTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node* next;
};

struct Node* insert_at_head(struct Node* head, int val) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->val = val;
    new_node->next = head;
    return new_node;
}

void print_list(struct Node* head) {
    struct Node* curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->val);
        curr = curr->next;
    }
    printf("NULL\\n");
}`,
    explanation: 'C linked list implementation allocating heap nodes dynamically using malloc.',
  },
  {
    id: 'snip-ll-cpp',
    topic_id: linkedListTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <iostream>

struct Node {
    int val;
    Node* next;
    Node(int v) : val(v), next(nullptr) {}
};

class LinkedList {
public:
    Node* head;
    LinkedList() : head(nullptr) {}

    void insertAtHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    ~LinkedList() {
        Node* curr = head;
        while (curr) {
            Node* temp = curr;
            curr = curr->next;
            delete temp;
        }
    }
};`,
    explanation: 'C++ implementation with dynamic memory deallocation in destructor.',
  },
  {
    id: 'snip-ll-java',
    topic_id: linkedListTopic.id,
    language: 'java',
    is_optimized: false,
    code: `public class LinkedList {
    private static class Node {
        int val;
        Node next;
        Node(int v) { this.val = v; }
    }

    private Node head = null;

    public void insertAtHead(int val) {
        Node newNode = new Node(val);
        newNode.next = head;
        head = newNode;
    }

    public boolean search(int val) {
        Node curr = head;
        while (curr != null) {
            if (curr.val == val) return true;
            curr = curr.next;
        }
        return false;
    }
}`,
    explanation: 'Java single linked list with nested private Node helper class.',
  },
  {
    id: 'snip-ll-cs',
    topic_id: linkedListTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `using System;

public class LinkedList {
    public class Node {
        public int Val { get; set; }
        public Node Next { get; set; }
        public Node(int val) { Val = val; Next = null; }
    }

    private Node head;

    public void InsertAtHead(int val) {
        Node newNode = new Node(val);
        newNode.Next = head;
        head = newNode;
    }
}`,
    explanation: 'C# implementation of custom singly linked list.',
  }
];

export const linkedListQuestions: QuizQuestion[] = [
  {
    id: 'q-ll-1',
    quiz_id: 'quiz-linked-list',
    question_text: 'Which of the following is an advantage of a Linked List over an Array?',
    question_type: 'MCQ',
    options: ['Constant time random access', 'Dynamic size without reallocation', 'Less memory usage per element', 'Cache locality'],
    correct_option_index: 1,
    explanation: 'Linked lists allocate nodes dynamically, meaning they can grow and shrink without copying elements or allocating pre-defined chunk blocks.',
  },
  {
    id: 'q-ll-2',
    quiz_id: 'quiz-linked-list',
    question_text: 'What happens if you delete a node in a singly linked list without keeping a reference to the next node?',
    question_type: 'MCQ',
    options: ['The next node is automatically deleted', 'The head pointer resets to null', 'You lose reference to the rest of the list', 'The program throws compilation error'],
    correct_option_index: 2,
    explanation: 'Singly linked lists only link forward. If you lose track of the next pointer reference, the remaining nodes become unreachable, causing memory leaks.',
  },
];


// 3. STACK
export const stackTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bb3',
  slug: 'stack',
  category_id: CATEGORY_IDS.linear,
  title: 'Stack',
  definition: 'A linear data structure that follows the Last In First Out (LIFO) principle, where insertions and deletions happen only at the top.',
  importance: 'Stacks are vital for function call stacks, undo mechanisms, back button history in web browsers, and parsing expressions.',
  prerequisites: ['linked-list', 'array'],
  difficulty: 'Beginner',
  time_complexity_best: 'O(1) Push / Pop / Peek',
  time_complexity_average: 'O(1) Push / Pop / Peek',
  time_complexity_worst: 'O(1) Push / Pop / Peek',
  space_complexity: 'O(N)',
  display_order: 3,
};

export const stackSections: LessonSection[] = [
  {
    id: 'sec-st-1',
    topic_id: stackTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Visualize a stack of cafeteria plates. You can only place a new plate on the **Top** (Push).
When you need a plate, you must take the one from the **Top** (Pop). The plate added most recently is the first one to be removed.
This order is called **LIFO** (Last In, First Out).
    `,
    display_order: 1,
  },
  {
    id: 'sec-st-2',
    topic_id: stackTopic.id,
    title: 'Core Operations',
    content: `
- **Push ($O(1)$)**: Insert an element on top of the stack.
- **Pop ($O(1)$)**: Remove the top element from the stack.
- **Peek ($O(1)$)**: Look at the value of the top element without removing it.
- **IsEmpty ($O(1)$)**: Verify if the stack has no elements.
    `,
    display_order: 2,
  },
  {
    id: 'sec-st-3',
    topic_id: stackTopic.id,
    title: 'Real-World Analogy',
    content: `
Think of a spring-loaded plate dispenser in a cafeteria — the metal tube that holds a column of clean plates. Every clean plate is dropped on top and pushes the older ones down. When you grab a plate, you always take the one on top.

You physically cannot pull a plate out of the middle without lifting off everything above it. The dispenser only exposes one plate at a time: the most recent one placed.

That is exactly how a stack behaves. The last plate in is the first plate out, and any operation — push, pop, or peek — happens at the top and takes constant time because nothing else has to move.

If you keep dropping plates and never take any, the dispenser will overflow onto the floor. That is a **stack overflow** — the same word your language uses when recursion piles up too many function calls.
    `,
    display_order: 3,
  },
  {
    id: 'sec-st-4',
    topic_id: stackTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's trace a stack across a short sequence of operations. Start with an empty stack. We will run: **push 3, push 7, push 2, pop, push 8, push 5, peek**.

1. **push 3.** Top rises to hold 3.
2. **push 7.** 7 sits on top of 3.
3. **push 2.** 2 sits on top of 7.
4. **pop.** The top element (2) is removed and returned; 7 is now on top again.
5. **push 8.** 8 sits on top of 7.
6. **push 5.** 5 sits on top of 8.
7. **peek.** Returns 5 without removing it. The stack is unchanged.

\`\`\`
Legend: top is on the RIGHT.

Start:            [ ]                        (empty)

Step 1 push 3:    [ 3 ]                      top -> 3
Step 2 push 7:    [ 3 | 7 ]                  top -> 7
Step 3 push 2:    [ 3 | 7 | 2 ]              top -> 2
Step 4 pop  ->2:  [ 3 | 7 ]                  top -> 7
Step 5 push 8:    [ 3 | 7 | 8 ]              top -> 8
Step 6 push 5:    [ 3 | 7 | 8 | 5 ]          top -> 5
Step 7 peek ->5:  [ 3 | 7 | 8 | 5 ]          top -> 5 (unchanged)
\`\`\`

Every step touches only the top slot, so each operation is $O(1)$ — no matter how tall the stack grows.
    `,
    display_order: 4,
  },
  {
    id: 'sec-st-5',
    topic_id: stackTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
- **Popping from an empty stack**: this either returns garbage or throws. Fix: always call \`isEmpty()\` (or check size) before \`pop\` / \`peek\`.
- **Confusing peek with pop**: peek only reads the top, pop also removes it. Fix: reach for \`peek\` when you just need to inspect, so you don't accidentally shrink the stack.
- **Trying to access the middle** with something like \`stack[3]\`: this breaks the LIFO contract and defeats the point of using a stack. Fix: if you need indexed access, use an array or deque instead.
- **Deep recursion causing stack overflow**: each recursive call adds a frame to the language's call stack; too many frames and the program crashes. Fix: rewrite as iteration using your own explicit stack, or add a base case that terminates sooner.
- **Sharing one stack between threads without locking**: two pushes at once can corrupt the top pointer. Fix: use a thread-safe stack (e.g., \`ConcurrentLinkedDeque\` in Java) or protect it with a mutex.
- **Fixed-size stacks silently dropping data**: pushing when the array is full is easy to miss. Fix: either throw an "overflow" error or grow the backing array so users notice.
    `,
    display_order: 5,
  },
  {
    id: 'sec-st-6',
    topic_id: stackTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **Browser back button**: each page you visit is pushed; pressing "back" pops the most recent one — a textbook LIFO flow.
- **Undo history in a text editor**: the last change made should be the first one undone, which is exactly what a stack of edit operations gives you.
- **Function call stack**: whenever a function calls another, the return address is pushed; when it returns, the address is popped. This is why runtime errors show a "stack trace".
- **Matching brackets in a compiler or linter**: push each opening bracket, and when you see a closing one, pop and compare. It works because the most recently opened bracket must close first.
- **Depth-First Search (DFS) on a graph or tree**: an explicit stack tracks which node to visit next when you want to go deep before wide.
- **Expression evaluation and conversion** (infix to postfix, evaluating postfix): operators and operands are pushed and popped in an order that naturally matches operator precedence.
    `,
    display_order: 6,
  },
];

export const stackSnippets: CodeSnippet[] = [
  {
    id: 'snip-st-py',
    topic_id: stackTopic.id,
    language: 'python',
    is_optimized: false,
    code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0`,
    explanation: 'Python Stack implementation utilizing lists as the underlying dynamic array.',
  },
  {
    id: 'snip-st-js',
    topic_id: stackTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `class Stack {
    constructor() {
        this.items = [];
    }

    push(val) {
        this.items.push(val);
    }

    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}`,
    explanation: 'Simple JavaScript Stack object using array push/pop actions.',
  },
  {
    id: 'snip-st-c',
    topic_id: stackTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>
#define MAX 100

typedef struct {
    int data[MAX];
    int top;
} Stack;

void init(Stack* s) { s->top = -1; }
int is_empty(Stack* s) { return s->top == -1; }
int is_full(Stack* s) { return s->top == MAX - 1; }

void push(Stack* s, int val) {
    if (is_full(s)) return;
    s->data[++(s->top)] = val;
}

int pop(Stack* s) {
    if (is_empty(s)) return -1;
    return s->data[(s->top)--];
}`,
    explanation: 'Fixed-size array implementation of Stack in C.',
  },
  {
    id: 'snip-st-cpp',
    topic_id: stackTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <iostream>
#include <vector>

class Stack {
private:
    std::vector<int> data;

public:
    void push(int val) { data.push_back(val); }
    
    void pop() {
        if (!isEmpty()) data.pop_back();
    }

    int peek() const {
        if (isEmpty()) throw std::underflow_error("Stack is empty");
        return data.back();
    }

    bool isEmpty() const { return data.empty(); }
};`,
    explanation: 'C++ Stack wrapping the standard library vector.',
  },
  {
    id: 'snip-st-java',
    topic_id: stackTopic.id,
    language: 'java',
    is_optimized: false,
    code: `import java.util.EmptyStackException;

public class LinkedStack {
    private class Node {
        int val;
        Node next;
        Node(int v) { this.val = v; }
    }

    private Node top = null;

    public void push(int val) {
        Node newNode = new Node(val);
        newNode.next = top;
        top = newNode;
    }

    public int pop() {
        if (isEmpty()) throw new EmptyStackException();
        int val = top.val;
        top = top.next;
        return val;
    }

    public int peek() {
        if (isEmpty()) throw new EmptyStackException();
        return top.val;
    }

    public boolean isEmpty() { return top == null; }
}`,
    explanation: 'Java Stack implementation using a Singly Linked List, ensuring true O(1) without resizing overhead.',
  },
  {
    id: 'snip-st-cs',
    topic_id: stackTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `using System;
using System.Collections.Generic;

public class CustomStack<T> {
    private List<T> _list = new List<T>();

    public void Push(T item) => _list.Add(item);

    public T Pop() {
        if (IsEmpty()) throw new InvalidOperationException("Stack is empty");
        T val = _list[_list.Count - 1];
        _list.RemoveAt(_list.Count - 1);
        return val;
    }

    public bool IsEmpty() => _list.Count == 0;
}`,
    explanation: 'C# generic implementation of a Stack wrapping List<T>.',
  }
];

export const stackQuestions: QuizQuestion[] = [
  {
    id: 'q-st-1',
    quiz_id: 'quiz-stack',
    question_text: 'Which sequence describes the access order in a Stack?',
    question_type: 'MCQ',
    options: ['First In First Out (FIFO)', 'Last In First Out (LIFO)', 'Random Access', 'Sorted order'],
    correct_option_index: 1,
    explanation: 'Stacks follow Last In First Out (LIFO), where the element pushed last is the first to be popped.',
  },
];


// 4. QUEUE
export const queueTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bb4',
  slug: 'queue',
  category_id: CATEGORY_IDS.linear,
  title: 'Queue',
  definition: 'A linear data structure that follows the First In First Out (FIFO) principle, where insertions happen at the rear and deletions happen at the front.',
  importance: 'Queues are used in task scheduling, printer queues, message buffers, and graph BFS algorithms.',
  prerequisites: ['linked-list', 'array'],
  difficulty: 'Beginner',
  time_complexity_best: 'O(1) Enqueue / Dequeue',
  time_complexity_average: 'O(1) Enqueue / Dequeue',
  time_complexity_worst: 'O(1) Enqueue / Dequeue',
  space_complexity: 'O(N)',
  display_order: 4,
};

export const queueSections: LessonSection[] = [
  {
    id: 'sec-qu-1',
    topic_id: queueTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Think of a queue of people waiting to buy tickets.
The person who arrives first gets served first (**FIFO**: First In, First Out).
New arrivals join the back of the queue (**Rear**), and the person who gets their ticket leaves from the front (**Front**).
    `,
    display_order: 1,
  },
  {
    id: 'sec-qu-2',
    topic_id: queueTopic.id,
    title: 'Core Operations & Circular Buffers',
    content: `
- **Enqueue ($O(1)$)**: Add an element to the rear of the queue.
- **Dequeue ($O(1)$)**: Remove the front element from the queue.
- **Front ($O(1)$)**: Retrieve the value of the front element without removing it.
- **Circular Queue (Optimized)**: Using a flat array for a queue can lead to unused space at the front as elements are dequeued. A Circular Queue wraps the index pointer using modulo arithmetic:
$$\\text{next} = (\\text{index} + 1) \\% \\text{capacity}$$
which allows reuse of empty slots at the beginning of the array.
    `,
    display_order: 2,
  },
  {
    id: 'sec-qu-3',
    topic_id: queueTopic.id,
    title: 'Real-World Analogy',
    content: `
Imagine the queue at a coffee shop counter. A new customer walks in and joins the back of the line. The barista serves whoever is at the front, and that person leaves.

Nobody cuts. The order of arrival is the order of service — first in, first out. If you are third in line, you know two people will be served before you and everybody after you has to wait for you.

A **circular queue** is like a small revolving diner counter with only six stools. When a stool at the front empties and a new customer arrives at the back, they simply take the next open stool, even if that means the "back" of the queue wraps around to a stool the front once used. No stools ever move — only the labels "front" and "rear" do.

That wrap-around is why circular queues are efficient in fixed-size buffers: you never waste the empty slots left behind by earlier dequeues.
    `,
    display_order: 3,
  },
  {
    id: 'sec-qu-4',
    topic_id: queueTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's run a **circular queue** of capacity 5 through: **enqueue 3, enqueue 7, enqueue 2, dequeue, enqueue 8, enqueue 5, enqueue 4**. Indices wrap using \`(i + 1) % 5\`.

1. **enqueue 3.** front and rear were -1 (empty). Set both to 0 and write 3 at index 0.
2. **enqueue 7.** rear advances to 1; write 7.
3. **enqueue 2.** rear advances to 2; write 2.
4. **dequeue.** Return the value at front (3). Advance front to 1. Index 0 is now free but not shifted.
5. **enqueue 8.** rear advances to 3; write 8.
6. **enqueue 5.** rear advances to 4; write 5.
7. **enqueue 4.** rear was 4, so \`(4 + 1) % 5 = 0\`. Write 4 into index 0 — the slot freed by step 4. This is the wrap-around.

\`\`\`
Legend: F = front index, R = rear index, . = empty slot.

Start:                index: 0   1   2   3   4
                            [ . | . | . | . | . ]   F=-1, R=-1

Step 1 enqueue 3:           [ 3 | . | . | . | . ]   F=0,  R=0
Step 2 enqueue 7:           [ 3 | 7 | . | . | . ]   F=0,  R=1
Step 3 enqueue 2:           [ 3 | 7 | 2 | . | . ]   F=0,  R=2
Step 4 dequeue -> 3:        [ . | 7 | 2 | . | . ]   F=1,  R=2
Step 5 enqueue 8:           [ . | 7 | 2 | 8 | . ]   F=1,  R=3
Step 6 enqueue 5:           [ . | 7 | 2 | 8 | 5 ]   F=1,  R=4
Step 7 enqueue 4 (wrap):    [ 4 | 7 | 2 | 8 | 5 ]   F=1,  R=0
\`\`\`

Front is now index 1 and rear is index 0. Reading the queue in FIFO order means walking from front and wrapping: 7, 2, 8, 5, 4. Every operation touched only one slot, so each is $O(1)$.
    `,
    display_order: 4,
  },
  {
    id: 'sec-qu-5',
    topic_id: queueTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
- **Using \`array.shift()\` in JavaScript for dequeue**: it re-indexes every element and is $O(N)$. Fix: use a linked-node queue or a two-index circular buffer.
- **Confusing "full" and "empty" in a circular queue**: both can look like \`front == rear\`. Fix: track size separately, or leave one slot always empty as a sentinel.
- **Forgetting to reset front/rear after the last dequeue**: leaving stale indices around causes the next enqueue to write to the wrong place. Fix: when the queue becomes empty, reset \`front = rear = -1\` (or equivalent).
- **Dequeuing from an empty queue**: returns garbage or throws. Fix: check \`isEmpty()\` first and return an explicit "no item" signal.
- **Enqueue into a full fixed-size queue that silently drops data**: users don't notice their events are being lost. Fix: raise an overflow error or grow the buffer.
- **Iterating with \`for i in 0..capacity\`**: reads empty slots and stale values. Fix: iterate from \`front\` and step \`(i + 1) % capacity\` exactly \`size\` times.
    `,
    display_order: 5,
  },
  {
    id: 'sec-qu-6',
    topic_id: queueTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **Printer job queue**: documents are printed in the order they were sent — the fairest, simplest FIFO policy.
- **Customer support ticket system**: the ticket that came in earliest should be answered first, so tickets sit in a queue until an agent is free.
- **Message buffer between producer and consumer** (e.g., a chat app or event stream): messages are queued as they arrive and drained in order.
- **Breadth-First Search (BFS) on a graph or tree**: a queue tracks which nodes to visit next so the search explores level by level.
- **CPU task / thread scheduler using round-robin**: each ready thread waits in a queue for its next time slice, keeping fairness across tasks.
- **Streaming audio or video buffer**: incoming packets are enqueued and played out in arrival order to keep the stream smooth even when the network jitters.
    `,
    display_order: 6,
  },
];

export const queueSnippets: CodeSnippet[] = [
  {
    id: 'snip-qu-py',
    topic_id: queueTopic.id,
    language: 'python',
    is_optimized: false,
    code: `from collections import deque

class Queue:
    def __init__(self):
        # Python deque is optimized for O(1) double-ended append/pop
        self.items = deque()

    def enqueue(self, val):
        self.items.append(val)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Dequeue from empty queue")
        return self.items.popleft()

    def is_empty(self):
        return len(self.items) == 0`,
    explanation: 'Python Queue using collections.deque which is implemented as a doubly-linked list for O(1) insertions/deletions at both ends.',
  },
  {
    id: 'snip-qu-js',
    topic_id: queueTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `// JS implementation using linked nodes to avoid O(N) array shift cost on dequeue
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    enqueue(val) {
        const newNode = new Node(val);
        if (!this.rear) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.size++;
    }

    dequeue() {
        if (!this.front) return null;
        const val = this.front.val;
        this.front = this.front.next;
        if (!this.front) this.rear = null;
        this.size--;
        return val;
    }
}`,
    explanation: 'Node-based JavaScript queue that avoids O(N) Array.shift() penalties.',
  },
  {
    id: 'snip-qu-c',
    topic_id: queueTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>
#define SIZE 5

typedef struct {
    int items[SIZE];
    int front;
    int rear;
} CircularQueue;

void init(CircularQueue* q) {
    q->front = -1;
    q->rear = -1;
}

int is_full(CircularQueue* q) {
    return ((q->rear + 1) % SIZE) == q->front;
}

int is_empty(CircularQueue* q) {
    return q->front == -1;
}

void enqueue(CircularQueue* q, int val) {
    if (is_full(q)) return;
    if (q->front == -1) q->front = 0;
    q->rear = (q->rear + 1) % SIZE;
    q->items[q->rear] = val;
}

int dequeue(CircularQueue* q) {
    if (is_empty(q)) return -1;
    int val = q->items[q->front];
    if (q->front == q->rear) {
        q->front = -1;
        q->rear = -1;
    } else {
        q->front = (q->front + 1) % SIZE;
    }
    return val;
}`,
    explanation: 'C implementation of a Circular Queue using modulo pointer wrap-around.',
  },
  {
    id: 'snip-qu-cpp',
    topic_id: queueTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <iostream>
#include <queue>

class CustomQueue {
private:
    std::queue<int> q;

public:
    void enqueue(int val) { q.push(val); }
    
    void dequeue() {
        if (!q.empty()) q.pop();
    }

    int front() const {
        if (q.empty()) throw std::underflow_error("Queue is empty");
        return q.front();
    }

    bool isEmpty() const { return q.empty(); }
};`,
    explanation: 'C++ wrapper of standard template library queue container.',
  },
  {
    id: 'snip-qu-java',
    topic_id: queueTopic.id,
    language: 'java',
    is_optimized: false,
    code: `public class CustomQueue {
    private static class Node {
        int val;
        Node next;
        Node(int v) { this.val = v; }
    }

    private Node front = null;
    private Node rear = null;

    public void enqueue(int val) {
        Node newNode = new Node(val);
        if (rear == null) {
            front = rear = newNode;
            return;
        }
        rear.next = newNode;
        rear = newNode;
    }

    public int dequeue() {
        if (front == null) throw new IllegalStateException("Queue is empty");
        int val = front.val;
        front = front.next;
        if (front == null) rear = null;
        return val;
    }
}`,
    explanation: 'Java Queue utilizing linked nodes for O(1) FIFO operations.',
  },
  {
    id: 'snip-qu-cs',
    topic_id: queueTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `using System;
using System.Collections.Generic;

public class CustomQueue<T> {
    private Queue<T> _q = new Queue<T>();

    public void Enqueue(T item) => _q.Enqueue(item);
    
    public T Dequeue() {
        if (_q.Count == 0) throw new InvalidOperationException();
        return _q.Dequeue();
    }
}`,
    explanation: 'C# wrapper using System.Collections.Generic.Queue.',
  }
];

export const queueQuestions: QuizQuestion[] = [
  {
    id: 'q-qu-1',
    quiz_id: 'quiz-queue',
    question_text: 'Which behavior represents standard Queue operations?',
    question_type: 'MCQ',
    options: ['First In First Out (FIFO)', 'Last In First Out (LIFO)', 'Random Access', 'Sorted order'],
    correct_option_index: 0,
    explanation: 'Queues follow First In First Out (FIFO) - elements that enter first are processed and removed first.',
  },
];
