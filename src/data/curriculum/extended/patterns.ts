import { CurriculumModule } from '@/types';
import { CATEGORY_IDS } from '../linear';

export const patternsModules: CurriculumModule[] = [
  // 1. FAST AND SLOW POINTERS
  {
    topic: {
      id: 'ext-fast-and-slow-pointers',
      slug: 'fast-and-slow-pointers',
      category_id: CATEGORY_IDS.patterns,
      title: 'Fast and Slow Pointers',
      definition: 'Fast and slow pointers (also known as Floyd\'s Tortoise and Hare) is a two-pointer technique where one pointer advances twice as fast as the other, used to detect cycles and find middle elements in linked structures.',
      importance: 'This pattern solves cycle detection and linked list problems in O(1) space where naive approaches would require O(n) space with hash sets, making it essential for memory-constrained environments.',
      prerequisites: ['linked-list'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(n)',
      time_complexity_average: 'O(n)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(1)',
      display_order: 600,
    },
    sections: [
      {
        id: 'sec-fast-and-slow-pointers-1',
        topic_id: 'ext-fast-and-slow-pointers',
        title: 'Concept & Intuition',
        content: `Imagine two runners on a circular track: one runs at speed $v$, the other at $2v$. If the track is a loop, the faster runner will eventually lap the slower one. If the track is a straight line, they'll never meet again after starting.

This is the core insight behind Floyd's cycle detection: if a linked list contains a cycle, a fast pointer (moving 2 steps) and a slow pointer (moving 1 step) will eventually meet inside the cycle. If there's no cycle, the fast pointer reaches the end first.

> [!NOTE]
> The pattern extends beyond cycle detection: finding the middle element, detecting palindromes in linked lists, and identifying loop entry points all leverage the speed differential between two pointers.`,
        display_order: 1,
      },
      {
        id: 'sec-fast-and-slow-pointers-2',
        topic_id: 'ext-fast-and-slow-pointers',
        title: 'How It Works',
        content: `Initialize two pointers at the list head. In each iteration:
1. Move **slow** one step forward.
2. Move **fast** two steps forward.
3. If they meet, a cycle exists.
4. If fast reaches null, no cycle exists.

**Why does meeting guarantee a cycle?** Once both pointers enter the cycle, the relative speed is 1 step per iteration. The fast pointer closes the gap by 1 each time, so they must eventually collide.

**Finding the cycle start:** After detecting a cycle, reset one pointer to the head and move both at the same speed (1 step). They meet at the cycle's entry node. This works because the distance from head to cycle start equals the distance from meeting point to cycle start (modulo cycle length).`,
        display_order: 2,
      },
      {
        id: 'sec-fast-and-slow-pointers-3',
        topic_id: 'ext-fast-and-slow-pointers',
        title: 'Complexity Analysis',
        content: `**Time:** $O(n)$ — In the worst case, slow traverses the entire list once. Fast moves at most $2n$ steps before either meeting slow or reaching the end.

**Space:** $O(1)$ — Only two pointers are used, regardless of list size.

This constant space is the key advantage over hash set approaches, which require $O(n)$ space to store visited nodes.

> [!TIP]
> For finding the middle element, when fast reaches the end, slow is at the middle. This works because fast moves twice as fast, so when fast travels $n$ steps, slow travels $n/2$ steps.`,
        display_order: 3,
      },
      {
        id: 'sec-fast-and-slow-pointers-4',
        topic_id: 'ext-fast-and-slow-pointers',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Always check if fast and fast.next are not null before advancing fast by two steps. Forgetting this causes null pointer exceptions.

Common mistakes:
- Moving fast before checking if fast.next exists.
- Confusing the cycle detection phase with the cycle start detection phase.
- Using this pattern on arrays (where indexing is more efficient).

**When to use:**
- Cycle detection in linked lists (LeetCode 141, 142).
- Finding the middle of a linked list without counting length first.
- Checking if a linked list is a palindrome (find middle, reverse second half, compare).
- Happy number problem (detecting cycles in number sequences).

**When not to use:**
- On data structures with random access (arrays) — direct indexing is simpler.
- When you need to track all visited nodes (use a hash set instead).`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-fast-and-slow-pointers-py',
        topic_id: 'ext-fast-and-slow-pointers',
        language: 'python',
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False

def detect_cycle_start(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            ptr = head
            while ptr is not slow:
                ptr = ptr.next
                slow = slow.next
            return ptr
    return None`,
        explanation: 'has_cycle detects a loop; detect_cycle_start returns the node where the cycle begins by resetting a pointer to the head after collision.',
        is_optimized: true,
      },
      {
        id: 'snip-fast-and-slow-pointers-js',
        topic_id: 'ext-fast-and-slow-pointers',
        language: 'javascript',
        code: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

function detectCycleStart(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }
  return null;
}`,
        explanation: 'Standard Floyd implementation returning a boolean for detection and the entry node for cycle-start location.',
        is_optimized: true,
      },
      {
        id: 'snip-fast-and-slow-pointers-cpp',
        topic_id: 'ext-fast-and-slow-pointers',
        language: 'cpp',
        code: `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

ListNode* detectCycleStart(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            ListNode* ptr = head;
            while (ptr != slow) {
                ptr = ptr->next;
                slow = slow->next;
            }
            return ptr;
        }
    }
    return nullptr;
}`,
        explanation: 'Pointer comparison in C++ uses raw pointer equality; the two-phase approach detects and locates the cycle in O(1) space.',
        is_optimized: true,
      },
      {
        id: 'snip-fast-and-slow-pointers-java',
        topic_id: 'ext-fast-and-slow-pointers',
        language: 'java',
        code: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}

public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }

    public ListNode detectCycleStart(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                ListNode ptr = head;
                while (ptr != slow) {
                    ptr = ptr.next;
                    slow = slow.next;
                }
                return ptr;
            }
        }
        return null;
    }
}`,
        explanation: 'Java reference equality (==) compares node identity, matching the tortoise-and-hare collision logic.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-fast-and-slow-pointers',
    quizTitle: 'Fast and Slow Pointers Quiz',
    quizDescription: 'Test your understanding of the two-pointer cycle detection technique.',
    questions: [
      {
        id: 'q-fast-and-slow-pointers-1',
        quiz_id: 'quiz-ext-fast-and-slow-pointers',
        question_text: 'What is the space complexity of Floyd\'s cycle detection algorithm?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
        correct_option_index: 1,
        explanation: 'Only two pointers are used regardless of input size, giving O(1) space. This is the key advantage over hash-set approaches.',
      },
      {
        id: 'q-fast-and-slow-pointers-2',
        quiz_id: 'quiz-ext-fast-and-slow-pointers',
        question_text: 'If a linked list has no cycle, the fast and slow pointers will eventually meet.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Without a cycle, the fast pointer reaches the end (null) before ever meeting the slow pointer.',
      },
      {
        id: 'q-fast-and-slow-pointers-3',
        quiz_id: 'quiz-ext-fast-and-slow-pointers',
        question_text: 'To find the start of a cycle after detection, what do you do?',
        question_type: 'MCQ',
        options: ['Continue moving both pointers at double speed', 'Reset one pointer to head and move both one step at a time', 'Reverse the list', 'Count the cycle length and skip ahead'],
        correct_option_index: 1,
        explanation: 'Resetting one pointer to the head and advancing both by one step makes them meet exactly at the cycle entry node.',
      },
    ],
  },
  // 2. BACKTRACKING
  {
    topic: {
      id: 'ext-backtracking',
      slug: 'backtracking',
      category_id: CATEGORY_IDS.patterns,
      title: 'Backtracking',
      definition: 'Backtracking is a systematic algorithmic technique for solving constraint satisfaction problems by incrementally building candidate solutions and abandoning ("pruning") a candidate as soon as it is determined that it cannot lead to a valid solution.',
      importance: 'It is the foundational strategy for combinatorial search problems such as permutations, subsets, N-Queens, Sudoku, and constraint solving, turning exponential brute force into a tractable, prunable tree traversal.',
      prerequisites: ['recursion'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) with early pruning',
      time_complexity_average: 'Exponential (problem dependent)',
      time_complexity_worst: 'O(b^d) where b is branching, d is depth',
      space_complexity: 'O(d) recursion depth',
      display_order: 601,
    },
    sections: [
      {
        id: 'sec-backtracking-1',
        topic_id: 'ext-backtracking',
        title: 'Concept & Intuition',
        content: `Backtracking is like exploring a maze while keeping a ball of string. You walk down a path, and when you hit a dead end, you follow the string back to the last junction and try a different path.

Formally, we build a solution one decision at a time. At each step we ask: "Does this partial choice still have a chance of succeeding?" If yes, we recurse deeper. If no, we undo the choice (backtrack) and try the next option.

> [!NOTE]
> The power of backtracking comes from **pruning**: by abandoning doomed branches early, we avoid exploring the full exponential space of all possible combinations.`,
        display_order: 1,
      },
      {
        id: 'sec-backtracking-2',
        topic_id: 'ext-backtracking',
        title: 'How It Works',
        content: `Every backtracking algorithm follows the same skeleton:
1. **Choose:** Make a decision (add an element to the current path).
2. **Explore:** Recurse to make the next decision.
3. **Unchoose:** Undo the decision (remove the element) to restore state before trying alternatives.

$$\\text{solve}(state) = \\begin{cases} \\text{record solution} & \\text{if complete} \\\\ \\text{try each valid choice, recurse, undo} & \\text{otherwise} \\end{cases}$$

The recursion tree represents all decision sequences. A **base case** detects a complete solution, and a **pruning condition** cuts branches that violate constraints.`,
        display_order: 2,
      },
      {
        id: 'sec-backtracking-3',
        topic_id: 'ext-backtracking',
        title: 'Complexity Analysis',
        content: `Backtracking's cost depends on the shape of the search tree. With branching factor $b$ and depth $d$, the worst case is $O(b^d)$.

- **Permutations of $n$ items:** $O(n!)$ leaf nodes, $O(n \\cdot n!)$ total work.
- **Subsets of $n$ items:** $O(2^n)$ nodes.
- **N-Queens:** far less than $O(n^n)$ due to constraint pruning.

**Space:** $O(d)$ for the recursion stack plus the current partial solution.

> [!TIP]
> Effective pruning can reduce the practical running time by orders of magnitude even though the theoretical worst case remains exponential.`,
        display_order: 3,
      },
      {
        id: 'sec-backtracking-4',
        topic_id: 'ext-backtracking',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Forgetting to undo a choice after recursion corrupts shared state and produces wrong results. The "unchoose" step is not optional.

Common mistakes:
- Not restoring state (missing the backtrack step).
- Weak or missing pruning, causing timeouts.
- Passing mutable structures without copying when recording solutions.

**When to use:**
- Generating all permutations, combinations, or subsets.
- Constraint problems: N-Queens, Sudoku, graph coloring.
- Word search and path-finding in grids.

**When not to use:**
- When a greedy or dynamic programming approach yields polynomial time.
- When only a count is needed and a closed-form formula exists.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-backtracking-py',
        topic_id: 'ext-backtracking',
        language: 'python',
        code: `def permutations(nums):
    result = []

    def backtrack(path, used):
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True
            path.append(nums[i])
            backtrack(path, used)
            path.pop()
            used[i] = False

    backtrack([], [False] * len(nums))
    return result`,
        explanation: 'Generates all permutations using the choose/explore/unchoose pattern with a used[] marker to avoid repeats.',
        is_optimized: true,
      },
      {
        id: 'snip-backtracking-js',
        topic_id: 'ext-backtracking',
        language: 'javascript',
        code: `function permutations(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack(path);
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}`,
        explanation: 'Spread operator copies the path when recording a complete permutation; state is restored after each recursive call.',
        is_optimized: true,
      },
      {
        id: 'snip-backtracking-cpp',
        topic_id: 'ext-backtracking',
        language: 'cpp',
        code: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> path;
        vector<bool> used(nums.size(), false);
        backtrack(nums, path, used, result);
        return result;
    }

private:
    void backtrack(vector<int>& nums, vector<int>& path,
                   vector<bool>& used, vector<vector<int>>& result) {
        if (path.size() == nums.size()) {
            result.push_back(path);
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push_back(nums[i]);
            backtrack(nums, path, used, result);
            path.pop_back();
            used[i] = false;
        }
    }
};`,
        explanation: 'Passes vectors by reference to avoid copies; push_back/pop_back implement the choose and unchoose steps.',
        is_optimized: true,
      },
      {
        id: 'snip-backtracking-java',
        topic_id: 'ext-backtracking',
        language: 'java',
        code: `import java.util.*;

public class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, new ArrayList<>(), used, result);
        return result;
    }

    private void backtrack(int[] nums, List<Integer> path,
                           boolean[] used, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.add(nums[i]);
            backtrack(nums, path, used, result);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}`,
        explanation: 'A fresh ArrayList copy is added on completion so later mutations do not corrupt recorded solutions.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-backtracking',
    quizTitle: 'Backtracking Quiz',
    quizDescription: 'Test your understanding of the choose-explore-unchoose search strategy.',
    questions: [
      {
        id: 'q-backtracking-1',
        quiz_id: 'quiz-ext-backtracking',
        question_text: 'Which step is essential to restore state before trying alternative choices?',
        question_type: 'MCQ',
        options: ['Choose', 'Explore', 'Unchoose (backtrack)', 'Record'],
        correct_option_index: 2,
        explanation: 'The unchoose step undoes the current decision so sibling branches start from a clean state.',
      },
      {
        id: 'q-backtracking-2',
        quiz_id: 'quiz-ext-backtracking',
        question_text: 'The number of permutations of n distinct items generated by backtracking is:',
        question_type: 'COMPLEXITY',
        options: ['O(2^n)', 'O(n!)', 'O(n^2)', 'O(n log n)'],
        correct_option_index: 1,
        explanation: 'There are n! distinct orderings, so the recursion tree has n! leaf nodes.',
      },
      {
        id: 'q-backtracking-3',
        quiz_id: 'quiz-ext-backtracking',
        question_text: 'Pruning in backtracking can reduce the actual running time even though the worst-case complexity stays exponential.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Pruning cuts off doomed branches early, often reducing practical work by orders of magnitude without changing the theoretical bound.',
      },
    ],
  },
  // 3. DIVIDE AND CONQUER
  {
    topic: {
      id: 'ext-divide-and-conquer',
      slug: 'divide-and-conquer',
      category_id: CATEGORY_IDS.patterns,
      title: 'Divide and Conquer',
      definition: 'Divide and conquer is an algorithmic paradigm that recursively breaks a problem into two or more subproblems of the same type, solves them independently, and combines their results to solve the original problem.',
      importance: 'It underpins many of the most efficient algorithms known, including merge sort, quicksort, binary search, and fast multiplication, and the Master Theorem gives a clean framework for analyzing their running times.',
      prerequisites: ['recursion'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(n log n) typical',
      time_complexity_average: 'O(n log n) typical',
      time_complexity_worst: 'Problem dependent',
      space_complexity: 'O(log n) to O(n)',
      display_order: 602,
    },
    sections: [
      {
        id: 'sec-divide-and-conquer-1',
        topic_id: 'ext-divide-and-conquer',
        title: 'Concept & Intuition',
        content: `Divide and conquer mirrors how you'd organize a massive stack of exam papers: split the stack among helpers, let each sort their pile, then merge the sorted piles together.

The paradigm has three phases:
1. **Divide** the problem into smaller subproblems.
2. **Conquer** each subproblem by solving it recursively.
3. **Combine** the sub-solutions into the final answer.

> [!NOTE]
> The key difference from plain recursion is that subproblems are **independent** and their results are explicitly **combined**, rather than simply accumulated in a single pass.`,
        display_order: 1,
      },
      {
        id: 'sec-divide-and-conquer-2',
        topic_id: 'ext-divide-and-conquer',
        title: 'How It Works',
        content: `Consider merge sort. We split the array in half, sort each half recursively, then merge two sorted halves in linear time.

The recurrence relation captures the cost:
$$T(n) = a \\cdot T\\left(\\frac{n}{b}\\right) + f(n)$$

where $a$ is the number of subproblems, $b$ is the factor by which input shrinks, and $f(n)$ is the divide-and-combine cost. For merge sort, $a = 2$, $b = 2$, $f(n) = O(n)$, giving $T(n) = O(n \\log n)$.

The **Master Theorem** provides closed-form solutions for such recurrences based on comparing $f(n)$ against $n^{\\log_b a}$.`,
        display_order: 2,
      },
      {
        id: 'sec-divide-and-conquer-3',
        topic_id: 'ext-divide-and-conquer',
        title: 'Complexity Analysis',
        content: `The Master Theorem's three cases for $T(n) = a T(n/b) + f(n)$:

- **Case 1:** if $f(n) = O(n^{\\log_b a - \\epsilon})$, then $T(n) = \\Theta(n^{\\log_b a})$.
- **Case 2:** if $f(n) = \\Theta(n^{\\log_b a})$, then $T(n) = \\Theta(n^{\\log_b a} \\log n)$.
- **Case 3:** if $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ and regularity holds, then $T(n) = \\Theta(f(n))$.

Merge sort falls in Case 2: $\\Theta(n \\log n)$. Binary search ($a=1, b=2, f(n)=O(1)$) gives $\\Theta(\\log n)$.

**Space** ranges from $O(\\log n)$ for the recursion stack (binary search) to $O(n)$ for merge sort's auxiliary buffer.`,
        display_order: 3,
      },
      {
        id: 'sec-divide-and-conquer-4',
        topic_id: 'ext-divide-and-conquer',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Ensure subproblems are strictly smaller than the original; otherwise the recursion never terminates. Off-by-one errors in the split point are a frequent cause of infinite recursion.

Common mistakes:
- Incorrect base case leading to stack overflow.
- Overlapping subproblems solved redundantly (that's a signal to use dynamic programming instead).
- Expensive combine steps that dominate and negate the benefit of dividing.

**When to use:**
- Sorting (merge sort, quicksort).
- Searching (binary search).
- Fast arithmetic (Karatsuba multiplication, Strassen's matrix multiplication).
- Closest pair of points, maximum subarray.

**When not to use:**
- When subproblems overlap heavily — prefer dynamic programming with memoization.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-divide-and-conquer-py',
        topic_id: 'ext-divide-and-conquer',
        language: 'python',
        code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
        explanation: 'Classic merge sort: divide the array at the midpoint, sort each half recursively, then merge in linear time.',
        is_optimized: true,
      },
      {
        id: 'snip-divide-and-conquer-js',
        topic_id: 'ext-divide-and-conquer',
        language: 'javascript',
        code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}`,
        explanation: 'Recursively splits and merges; the merge step interleaves two sorted arrays into one.',
        is_optimized: true,
      },
      {
        id: 'snip-divide-and-conquer-cpp',
        topic_id: 'ext-divide-and-conquer',
        language: 'cpp',
        code: `#include <vector>
using namespace std;

void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> temp;
    int i = l, j = m + 1;
    while (i <= m && j <= r) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else temp.push_back(arr[j++]);
    }
    while (i <= m) temp.push_back(arr[i++]);
    while (j <= r) temp.push_back(arr[j++]);
    for (int k = 0; k < (int)temp.size(); k++)
        arr[l + k] = temp[k];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
        explanation: 'In-place index-based merge sort; the midpoint uses l + (r - l) / 2 to avoid integer overflow.',
        is_optimized: true,
      },
      {
        id: 'snip-divide-and-conquer-java',
        topic_id: 'ext-divide-and-conquer',
        language: 'java',
        code: `public class MergeSort {
    public void sort(int[] arr, int l, int r) {
        if (l >= r) return;
        int m = l + (r - l) / 2;
        sort(arr, l, m);
        sort(arr, m + 1, r);
        merge(arr, l, m, r);
    }

    private void merge(int[] arr, int l, int m, int r) {
        int[] temp = new int[r - l + 1];
        int i = l, j = m + 1, k = 0;
        while (i <= m && j <= r) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= m) temp[k++] = arr[i++];
        while (j <= r) temp[k++] = arr[j++];
        for (int x = 0; x < temp.length; x++)
            arr[l + x] = temp[x];
    }
}`,
        explanation: 'Uses a temporary buffer sized to the current segment; recursion depth is O(log n).',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-divide-and-conquer',
    quizTitle: 'Divide and Conquer Quiz',
    quizDescription: 'Test your understanding of recursive problem decomposition and the Master Theorem.',
    questions: [
      {
        id: 'q-divide-and-conquer-1',
        quiz_id: 'quiz-ext-divide-and-conquer',
        question_text: 'What is the time complexity of merge sort?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correct_option_index: 1,
        explanation: 'Merge sort recurrence T(n) = 2T(n/2) + O(n) resolves to O(n log n) by the Master Theorem Case 2.',
      },
      {
        id: 'q-divide-and-conquer-2',
        quiz_id: 'quiz-ext-divide-and-conquer',
        question_text: 'Divide and conquer is the best choice when subproblems overlap heavily.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Overlapping subproblems cause redundant work; dynamic programming with memoization is the better fit.',
      },
      {
        id: 'q-divide-and-conquer-3',
        quiz_id: 'quiz-ext-divide-and-conquer',
        question_text: 'Which of the following is NOT one of the three phases of divide and conquer?',
        question_type: 'MCQ',
        options: ['Divide', 'Conquer', 'Combine', 'Memoize'],
        correct_option_index: 3,
        explanation: 'The three phases are divide, conquer, and combine. Memoization belongs to dynamic programming.',
      },
    ],
  },
  // 4. BITMASK DP
  {
    topic: {
      id: 'ext-bitmask-dp',
      slug: 'bitmask-dp',
      category_id: CATEGORY_IDS.patterns,
      title: 'Bitmask Dynamic Programming',
      definition: 'Bitmask DP is a dynamic programming technique that encodes a subset of a small set of elements as the bits of an integer, allowing states over all subsets to be enumerated and transitioned efficiently.',
      importance: 'It solves otherwise intractable subset problems such as the Traveling Salesman Problem, assignment problems, and set-cover variants for small n (typically n <= 20) by compressing exponential state into integer bitmasks.',
      prerequisites: ['dynamic-programming', 'bit-manipulation'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(2^n * n)',
      time_complexity_average: 'O(2^n * n)',
      time_complexity_worst: 'O(2^n * n^2) for TSP',
      space_complexity: 'O(2^n)',
      display_order: 603,
    },
    sections: [
      {
        id: 'sec-bitmask-dp-1',
        topic_id: 'ext-bitmask-dp',
        title: 'Concept & Intuition',
        content: `Think of a light switch panel with $n$ switches. Each configuration of on/off switches maps to exactly one integer whose binary representation records which switches are on. With $n$ switches there are $2^n$ configurations, and each is a distinct integer from $0$ to $2^n - 1$.

Bitmask DP exploits this: a subset $S$ of items becomes an integer mask, and $dp[\\text{mask}]$ stores the best answer for the subset described by that mask.

> [!NOTE]
> This only works when $n$ is small (usually $n \\le 20$), because the number of states grows as $2^n$.`,
        display_order: 1,
      },
      {
        id: 'sec-bitmask-dp-2',
        topic_id: 'ext-bitmask-dp',
        title: 'How It Works',
        content: `Common bit operations drive the transitions:
- Check if item $i$ is in the mask: \`mask & (1 << i)\`.
- Add item $i$: \`mask | (1 << i)\`.
- Remove item $i$: \`mask & ~(1 << i)\`.
- Count set bits: population count.

For the **Traveling Salesman Problem**, $dp[\\text{mask}][i]$ is the minimum cost to visit exactly the cities in mask, ending at city $i$. The transition tries every next unvisited city $j$:
$$dp[\\text{mask} \\,|\\, (1 \\ll j)][j] = \\min\\big(dp[\\text{mask}][i] + \\text{dist}(i, j)\\big)$$

We iterate masks in increasing order so subsets are always processed before their supersets.`,
        display_order: 2,
      },
      {
        id: 'sec-bitmask-dp-3',
        topic_id: 'ext-bitmask-dp',
        title: 'Complexity Analysis',
        content: `For TSP-style problems, there are $2^n$ masks and $n$ possible ending positions, giving $2^n \\cdot n$ states. Each state examines up to $n$ transitions, so the total time is:
$$O(2^n \\cdot n^2)$$

**Space** is $O(2^n \\cdot n)$ for the full DP table, or $O(2^n)$ for simpler subset problems that don't track an endpoint.

For $n = 20$: $2^{20} \\approx 10^6$ masks, which is comfortably tractable. At $n = 25$ the $2^n$ factor reaches $\\approx 3.3 \\times 10^7$, near the practical limit.

> [!TIP]
> Iterate submasks of a mask with the idiom \`for (sub = mask; sub; sub = (sub - 1) & mask)\` to enumerate all subsets of a set in $O(3^n)$ total.`,
        display_order: 3,
      },
      {
        id: 'sec-bitmask-dp-4',
        topic_id: 'ext-bitmask-dp',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Operator precedence bites here: \`mask & (1 << i)\` needs parentheses because \`<<\` binds looser than \`&\` in some languages. Always parenthesize shift expressions.

Common mistakes:
- Using this for large $n$ (memory explodes past $n \\approx 22$).
- Off-by-one in bit indexing.
- Forgetting to process masks in an order that respects subset dependencies.

**When to use:**
- Traveling Salesman Problem for small $n$.
- Assignment problems (match $n$ workers to $n$ tasks optimally).
- Counting Hamiltonian paths, set partitioning.

**When not to use:**
- When $n$ exceeds ~22, or when a greedy / polynomial DP exists.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-bitmask-dp-py',
        topic_id: 'ext-bitmask-dp',
        language: 'python',
        code: `import math

def tsp(dist):
    n = len(dist)
    FULL = (1 << n) - 1
    dp = [[math.inf] * n for _ in range(1 << n)]
    dp[1][0] = 0  # start at city 0

    for mask in range(1 << n):
        for i in range(n):
            if dp[mask][i] == math.inf:
                continue
            for j in range(n):
                if mask & (1 << j):
                    continue
                nmask = mask | (1 << j)
                cost = dp[mask][i] + dist[i][j]
                if cost < dp[nmask][j]:
                    dp[nmask][j] = cost

    return min(dp[FULL][i] + dist[i][0] for i in range(n))`,
        explanation: 'Held-Karp TSP: dp[mask][i] is the min cost to visit the cities in mask ending at i; the answer closes the tour back to city 0.',
        is_optimized: true,
      },
      {
        id: 'snip-bitmask-dp-js',
        topic_id: 'ext-bitmask-dp',
        language: 'javascript',
        code: `function tsp(dist) {
  const n = dist.length;
  const FULL = (1 << n) - 1;
  const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(Infinity));
  dp[1][0] = 0;

  for (let mask = 0; mask < (1 << n); mask++) {
    for (let i = 0; i < n; i++) {
      if (dp[mask][i] === Infinity) continue;
      for (let j = 0; j < n; j++) {
        if (mask & (1 << j)) continue;
        const nmask = mask | (1 << j);
        const cost = dp[mask][i] + dist[i][j];
        if (cost < dp[nmask][j]) dp[nmask][j] = cost;
      }
    }
  }

  let best = Infinity;
  for (let i = 0; i < n; i++) best = Math.min(best, dp[FULL][i] + dist[i][0]);
  return best;
}`,
        explanation: 'JavaScript Held-Karp using nested arrays; bit tests use parenthesized shifts to respect precedence.',
        is_optimized: true,
      },
      {
        id: 'snip-bitmask-dp-cpp',
        topic_id: 'ext-bitmask-dp',
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

int tsp(vector<vector<int>>& dist) {
    int n = dist.size();
    int FULL = (1 << n) - 1;
    vector<vector<long long>> dp(1 << n, vector<long long>(n, LLONG_MAX));
    dp[1][0] = 0;

    for (int mask = 0; mask < (1 << n); mask++) {
        for (int i = 0; i < n; i++) {
            if (dp[mask][i] == LLONG_MAX) continue;
            for (int j = 0; j < n; j++) {
                if (mask & (1 << j)) continue;
                int nmask = mask | (1 << j);
                long long cost = dp[mask][i] + dist[i][j];
                dp[nmask][j] = min(dp[nmask][j], cost);
            }
        }
    }

    long long best = LLONG_MAX;
    for (int i = 0; i < n; i++)
        best = min(best, dp[FULL][i] + dist[i][0]);
    return (int)best;
}`,
        explanation: 'Uses long long to avoid overflow when summing edge weights; LLONG_MAX marks unreachable states.',
        is_optimized: true,
      },
      {
        id: 'snip-bitmask-dp-java',
        topic_id: 'ext-bitmask-dp',
        language: 'java',
        code: `public class TSP {
    public int solve(int[][] dist) {
        int n = dist.length;
        int FULL = (1 << n) - 1;
        long[][] dp = new long[1 << n][n];
        for (long[] row : dp) java.util.Arrays.fill(row, Long.MAX_VALUE);
        dp[1][0] = 0;

        for (int mask = 0; mask < (1 << n); mask++) {
            for (int i = 0; i < n; i++) {
                if (dp[mask][i] == Long.MAX_VALUE) continue;
                for (int j = 0; j < n; j++) {
                    if ((mask & (1 << j)) != 0) continue;
                    int nmask = mask | (1 << j);
                    long cost = dp[mask][i] + dist[i][j];
                    dp[nmask][j] = Math.min(dp[nmask][j], cost);
                }
            }
        }

        long best = Long.MAX_VALUE;
        for (int i = 0; i < n; i++)
            best = Math.min(best, dp[FULL][i] + dist[i][0]);
        return (int) best;
    }
}`,
        explanation: 'Java bit test compares against 0 explicitly since the bitwise result is an int, not a boolean.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-bitmask-dp',
    quizTitle: 'Bitmask DP Quiz',
    quizDescription: 'Test your understanding of subset encoding and state transitions with bitmasks.',
    questions: [
      {
        id: 'q-bitmask-dp-1',
        quiz_id: 'quiz-ext-bitmask-dp',
        question_text: 'What is the time complexity of the Held-Karp bitmask solution to TSP?',
        question_type: 'COMPLEXITY',
        options: ['O(n!)', 'O(2^n * n^2)', 'O(n^2)', 'O(2^n)'],
        correct_option_index: 1,
        explanation: 'There are 2^n * n states and each considers up to n transitions, giving O(2^n * n^2).',
      },
      {
        id: 'q-bitmask-dp-2',
        quiz_id: 'quiz-ext-bitmask-dp',
        question_text: 'Which expression checks whether item i is present in a bitmask?',
        question_type: 'MCQ',
        options: ['mask + (1 << i)', 'mask & (1 << i)', 'mask ^ i', 'mask << i'],
        correct_option_index: 1,
        explanation: 'A bitwise AND with the i-th bit set is nonzero exactly when item i is in the mask.',
      },
      {
        id: 'q-bitmask-dp-3',
        quiz_id: 'quiz-ext-bitmask-dp',
        question_text: 'Bitmask DP is practical for n up to around 40 elements.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'The 2^n state count makes it practical only up to roughly n = 20-22; n = 40 would need 2^40 states.',
      },
    ],
  },
  // 5. DIGIT DP
  {
    topic: {
      id: 'ext-digit-dp',
      slug: 'digit-dp',
      category_id: CATEGORY_IDS.patterns,
      title: 'Digit Dynamic Programming',
      definition: 'Digit DP is a dynamic programming technique that counts numbers in a range satisfying some property by building the number digit by digit, tracking a "tight" bound flag and any problem-specific state.',
      importance: 'It answers counting queries over huge ranges (up to 10^18) that would be impossible to enumerate directly, such as counting numbers with a given digit sum, no repeated digits, or divisibility constraints.',
      prerequisites: ['dynamic-programming'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(D * states * 10)',
      time_complexity_average: 'O(D * states * 10)',
      time_complexity_worst: 'O(D * states * 10)',
      space_complexity: 'O(D * states)',
      display_order: 604,
    },
    sections: [
      {
        id: 'sec-digit-dp-1',
        topic_id: 'ext-digit-dp',
        title: 'Concept & Intuition',
        content: `Suppose you must count how many integers in $[0, N]$ have a digit sum divisible by 3. When $N = 10^{18}$, iterating one by one is hopeless.

Digit DP builds numbers **position by position**, from the most significant digit down. At each position we choose a digit, but if we've matched $N$'s prefix exactly so far, we're **tight**: the current digit cannot exceed $N$'s digit at this position. Once we place something strictly smaller, we become **free** to use any digit $0$–$9$ afterward.

> [!NOTE]
> The tight flag is the heart of digit DP: it separates the constrained prefix from the freely chosen suffix, letting us reuse memoized results across many numbers.`,
        display_order: 1,
      },
      {
        id: 'sec-digit-dp-2',
        topic_id: 'ext-digit-dp',
        title: 'How It Works',
        content: `The recursive state is typically \`(position, tight, ...extra)\`:
- **position:** current digit index being filled.
- **tight:** whether the prefix still equals $N$'s prefix.
- **extra:** problem-specific accumulator (digit sum mod $k$, last digit, count of a value, etc.).

At each position, iterate the candidate digit $d$ from $0$ to (tight ? $N[\\text{pos}]$ : $9$). Recurse to the next position with an updated tight flag: it stays tight only if the previous was tight **and** $d$ equals $N[\\text{pos}]$.

$$\\text{count}(N) - \\text{count}(L-1)$$ gives the answer for a range $[L, N]$.

Memoize only the states where \`tight\` is false, since tight states depend on the specific bound and are visited once each.`,
        display_order: 2,
      },
      {
        id: 'sec-digit-dp-3',
        topic_id: 'ext-digit-dp',
        title: 'Complexity Analysis',
        content: `Let $D$ be the number of digits (about $19$ for $10^{18}$), and let $S$ be the number of distinct values of the extra state.

The number of memoized (non-tight) states is $D \\times S$, and each transition tries $10$ digits, so:
$$O(D \\times S \\times 10)$$

For a digit-sum-mod-$k$ problem, $S = k$, giving a tiny table. The tight states form a single path of length $D$, adding negligible cost.

**Space:** $O(D \\times S)$ for the memo table.

> [!TIP]
> Only cache the non-tight states. Caching tight states is unsafe because their results depend on the specific upper bound.`,
        display_order: 3,
      },
      {
        id: 'sec-digit-dp-4',
        topic_id: 'ext-digit-dp',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Never memoize results computed while tight is true. Those results are valid only for the particular bound N and will produce wrong counts if reused.

Common mistakes:
- Caching tight states.
- Mishandling leading zeros when the property depends on the true digit length.
- Off-by-one at the range boundaries (remember to subtract count(L-1)).

**When to use:**
- Counting numbers in $[L, R]$ with digit-based properties.
- Digit sum, divisibility, forbidden digits, non-decreasing digits.

**When not to use:**
- When the property is not digit-local and cannot be summarized by a small state.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-digit-dp-py',
        topic_id: 'ext-digit-dp',
        language: 'python',
        code: `from functools import lru_cache

def count_digit_sum_divisible(N, k):
    digits = list(map(int, str(N)))
    L = len(digits)

    @lru_cache(maxsize=None)
    def dp(pos, rem, tight):
        if pos == L:
            return 1 if rem == 0 else 0
        limit = digits[pos] if tight else 9
        total = 0
        for d in range(limit + 1):
            total += dp(pos + 1, (rem + d) % k, tight and d == limit)
        return total

    return dp(0, 0, True)`,
        explanation: 'Counts integers in [0, N] whose digit sum is divisible by k. The lru_cache memoizes states; tight states rarely repeat.',
        is_optimized: true,
      },
      {
        id: 'snip-digit-dp-js',
        topic_id: 'ext-digit-dp',
        language: 'javascript',
        code: `function countDigitSumDivisible(N, k) {
  const digits = String(N).split('').map(Number);
  const L = digits.length;
  const memo = new Map();

  function dp(pos, rem, tight) {
    if (pos === L) return rem === 0 ? 1 : 0;
    const key = tight ? -1 : pos * k + rem;
    if (!tight && memo.has(key)) return memo.get(key);
    const limit = tight ? digits[pos] : 9;
    let total = 0;
    for (let d = 0; d <= limit; d++) {
      total += dp(pos + 1, (rem + d) % k, tight && d === limit);
    }
    if (!tight) memo.set(key, total);
    return total;
  }

  return dp(0, 0, true);
}`,
        explanation: 'Only non-tight states are memoized via a Map keyed by (pos, rem); tight states are computed fresh each time.',
        is_optimized: true,
      },
      {
        id: 'snip-digit-dp-cpp',
        topic_id: 'ext-digit-dp',
        language: 'cpp',
        code: `#include <string>
#include <cstring>
using namespace std;

int digits[20], K, L;
long long memo[20][100];
bool seen[20][100];

long long dp(int pos, int rem, bool tight) {
    if (pos == L) return rem == 0 ? 1 : 0;
    if (!tight && seen[pos][rem]) return memo[pos][rem];
    int limit = tight ? digits[pos] : 9;
    long long total = 0;
    for (int d = 0; d <= limit; d++)
        total += dp(pos + 1, (rem + d) % K, tight && d == limit);
    if (!tight) { seen[pos][rem] = true; memo[pos][rem] = total; }
    return total;
}

long long countDigitSumDivisible(const string& N, int k) {
    K = k; L = N.size();
    memset(seen, 0, sizeof(seen));
    for (int i = 0; i < L; i++) digits[i] = N[i] - '0';
    return dp(0, 0, true);
}`,
        explanation: 'Uses a seen[] guard so only non-tight states are cached; digits are parsed from the string bound.',
        is_optimized: true,
      },
      {
        id: 'snip-digit-dp-java',
        topic_id: 'ext-digit-dp',
        language: 'java',
        code: `public class DigitDP {
    private int[] digits;
    private int K, L;
    private long[][] memo;
    private boolean[][] seen;

    public long countDigitSumDivisible(String N, int k) {
        K = k;
        L = N.length();
        digits = new int[L];
        for (int i = 0; i < L; i++) digits[i] = N.charAt(i) - '0';
        memo = new long[L][K];
        seen = new boolean[L][K];
        return dp(0, 0, true);
    }

    private long dp(int pos, int rem, boolean tight) {
        if (pos == L) return rem == 0 ? 1 : 0;
        if (!tight && seen[pos][rem]) return memo[pos][rem];
        int limit = tight ? digits[pos] : 9;
        long total = 0;
        for (int d = 0; d <= limit; d++)
            total += dp(pos + 1, (rem + d) % K, tight && d == limit);
        if (!tight) { seen[pos][rem] = true; memo[pos][rem] = total; }
        return total;
    }
}`,
        explanation: 'Instance fields hold the parsed digits and memo table; only non-tight states are cached in memo[pos][rem].',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-digit-dp',
    quizTitle: 'Digit DP Quiz',
    quizDescription: 'Test your understanding of digit-by-digit counting with the tight-bound technique.',
    questions: [
      {
        id: 'q-digit-dp-1',
        quiz_id: 'quiz-ext-digit-dp',
        question_text: 'What does the "tight" flag represent in digit DP?',
        question_type: 'MCQ',
        options: ['Whether the number is even', 'Whether the prefix built so far equals the bound N\'s prefix', 'Whether memoization is enabled', 'Whether leading zeros are allowed'],
        correct_option_index: 1,
        explanation: 'Tight means the current prefix matches N exactly, so the next digit is capped by N\'s digit at that position.',
      },
      {
        id: 'q-digit-dp-2',
        quiz_id: 'quiz-ext-digit-dp',
        question_text: 'It is safe to memoize states where tight is true.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Tight states depend on the specific bound N and must not be cached, or reused counts will be wrong.',
      },
      {
        id: 'q-digit-dp-3',
        quiz_id: 'quiz-ext-digit-dp',
        question_text: 'How do you compute the count of valid numbers in a range [L, R]?',
        question_type: 'MCQ',
        options: ['count(R) + count(L)', 'count(R) - count(L - 1)', 'count(R) * count(L)', 'count(R - L)'],
        correct_option_index: 1,
        explanation: 'Compute count over [0, R] and subtract count over [0, L-1] to isolate the range [L, R].',
      },
    ],
  },
  // 6. INTERVAL DP
  {
    topic: {
      id: 'ext-interval-dp',
      slug: 'interval-dp',
      category_id: CATEGORY_IDS.patterns,
      title: 'Interval Dynamic Programming',
      definition: 'Interval DP is a dynamic programming pattern where the state is defined over a contiguous subinterval [i, j] of a sequence, and solutions are built by combining answers of smaller subintervals, usually by choosing a split or a boundary element to process last.',
      importance: 'It solves a broad class of optimization problems on sequences such as matrix-chain multiplication, optimal binary search trees, burst balloons, and polygon triangulation, where the order of operations matters.',
      prerequisites: ['dynamic-programming'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(n^2)',
      time_complexity_average: 'O(n^3)',
      time_complexity_worst: 'O(n^3)',
      space_complexity: 'O(n^2)',
      display_order: 605,
    },
    sections: [
      {
        id: 'sec-interval-dp-1',
        topic_id: 'ext-interval-dp',
        title: 'Concept & Intuition',
        content: `Interval DP asks: what is the best way to fully process a contiguous segment $[i, j]$? The trick is to pick one element or split point to handle **last**, which breaks the segment into two independent subintervals whose answers we already know.

Consider bursting balloons for points: if balloon $k$ is the last one you burst in $[i, j]$, then the left part $[i, k-1]$ and right part $[k+1, j]$ were already emptied, so their boundaries are fixed. This "process last" framing removes the circular dependency.

> [!NOTE]
> The defining feature is that the state ranges over an interval, and transitions combine two adjacent or nested subintervals.`,
        display_order: 1,
      },
      {
        id: 'sec-interval-dp-2',
        topic_id: 'ext-interval-dp',
        title: 'How It Works',
        content: `The general recurrence over interval $[i, j]$ with split point $k$:
$$dp[i][j] = \\min_{i \\le k < j}\\big(dp[i][k] + dp[k+1][j] + \\text{cost}(i, k, j)\\big)$$

We fill the table by **increasing interval length**, because a length-$\\ell$ interval depends only on shorter intervals. The iteration order is:
1. Loop interval length $\\ell$ from $2$ to $n$.
2. Loop left endpoint $i$; set $j = i + \\ell - 1$.
3. Loop split $k$ from $i$ to $j-1$ and take the optimum.

Base cases (single elements or empty intervals) are initialized before the main loops.`,
        display_order: 2,
      },
      {
        id: 'sec-interval-dp-3',
        topic_id: 'ext-interval-dp',
        title: 'Complexity Analysis',
        content: `There are $O(n^2)$ intervals (choices of $i$ and $j$), and each transition scans up to $O(n)$ split points, so the total time is:
$$O(n^3)$$

**Space** is $O(n^2)$ for the DP table indexed by both endpoints.

Some interval problems admit the **Knuth optimization**, which exploits the quadrangle inequality to reduce the running time to $O(n^2)$ by narrowing the range of useful split points.

> [!TIP]
> When $n$ is up to a few hundred, $O(n^3)$ is fine. Beyond ~$500$, look for Knuth or divide-and-conquer optimizations.`,
        display_order: 3,
      },
      {
        id: 'sec-interval-dp-4',
        topic_id: 'ext-interval-dp',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Iterating in the wrong order (e.g., by left endpoint instead of by length) reads DP cells that have not been computed yet, silently producing wrong answers.

Common mistakes:
- Filling the table by index instead of by interval length.
- Incorrect base cases for length-1 intervals.
- Adding padding boundaries incorrectly in burst-balloons style problems.

**When to use:**
- Matrix-chain multiplication ordering.
- Optimal binary search trees.
- Burst balloons, stone-merging games.
- Polygon triangulation, palindrome partitioning.

**When not to use:**
- When the problem has no "process last" or split structure over contiguous ranges.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-interval-dp-py',
        topic_id: 'ext-interval-dp',
        language: 'python',
        code: `def matrix_chain_order(dims):
    # dims has length n+1; matrix i has size dims[i-1] x dims[i]
    n = len(dims) - 1
    dp = [[0] * (n + 1) for _ in range(n + 1)]
    for length in range(2, n + 1):
        for i in range(1, n - length + 2):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j]
                if cost < dp[i][j]:
                    dp[i][j] = cost
    return dp[1][n]`,
        explanation: 'Matrix-chain multiplication: dp[i][j] is the min scalar multiplications for matrices i..j, filled by increasing chain length.',
        is_optimized: true,
      },
      {
        id: 'snip-interval-dp-js',
        topic_id: 'ext-interval-dp',
        language: 'javascript',
        code: `function matrixChainOrder(dims) {
  const n = dims.length - 1;
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  for (let length = 2; length <= n; length++) {
    for (let i = 1; i <= n - length + 1; i++) {
      const j = i + length - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
        if (cost < dp[i][j]) dp[i][j] = cost;
      }
    }
  }
  return dp[1][n];
}`,
        explanation: 'Fills the interval table by chain length; each interval tries every split point k for the last multiplication.',
        is_optimized: true,
      },
      {
        id: 'snip-interval-dp-cpp',
        topic_id: 'ext-interval-dp',
        language: 'cpp',
        code: `#include <vector>
#include <climits>
using namespace std;

long long matrixChainOrder(const vector<int>& dims) {
    int n = dims.size() - 1;
    vector<vector<long long>> dp(n + 1, vector<long long>(n + 1, 0));
    for (int length = 2; length <= n; length++) {
        for (int i = 1; i <= n - length + 1; i++) {
            int j = i + length - 1;
            dp[i][j] = LLONG_MAX;
            for (int k = i; k < j; k++) {
                long long cost = dp[i][k] + dp[k + 1][j] +
                                 (long long)dims[i - 1] * dims[k] * dims[j];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[1][n];
}`,
        explanation: 'The cast to long long prevents overflow when multiplying three dimensions; intervals grow by length.',
        is_optimized: true,
      },
      {
        id: 'snip-interval-dp-java',
        topic_id: 'ext-interval-dp',
        language: 'java',
        code: `public class MatrixChain {
    public long matrixChainOrder(int[] dims) {
        int n = dims.length - 1;
        long[][] dp = new long[n + 1][n + 1];
        for (int length = 2; length <= n; length++) {
            for (int i = 1; i <= n - length + 1; i++) {
                int j = i + length - 1;
                dp[i][j] = Long.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    long cost = dp[i][k] + dp[k + 1][j]
                              + (long) dims[i - 1] * dims[k] * dims[j];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        return dp[1][n];
    }
}`,
        explanation: 'Java version mirrors the recurrence; length-based iteration guarantees subintervals are ready before use.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-interval-dp',
    quizTitle: 'Interval DP Quiz',
    quizDescription: 'Test your understanding of DP over contiguous subintervals.',
    questions: [
      {
        id: 'q-interval-dp-1',
        quiz_id: 'quiz-ext-interval-dp',
        question_text: 'What is the typical time complexity of interval DP with a split point?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n^2)', 'O(n^3)', 'O(2^n)'],
        correct_option_index: 2,
        explanation: 'There are O(n^2) intervals and each tries up to O(n) split points, giving O(n^3).',
      },
      {
        id: 'q-interval-dp-2',
        quiz_id: 'quiz-ext-interval-dp',
        question_text: 'Interval DP states must be filled in order of increasing interval length.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Larger intervals depend on smaller ones, so shorter intervals must be computed first.',
      },
      {
        id: 'q-interval-dp-3',
        quiz_id: 'quiz-ext-interval-dp',
        question_text: 'In matrix-chain multiplication, what does dp[i][j] represent?',
        question_type: 'MCQ',
        options: ['The product of matrices i through j', 'The minimum scalar multiplications to multiply matrices i through j', 'The number of matrices between i and j', 'The dimension of the result matrix'],
        correct_option_index: 1,
        explanation: 'dp[i][j] stores the minimum number of scalar multiplications needed to compute the product of matrices i..j.',
      },
    ],
  },
  // 7. LCS & EDIT DISTANCE PATTERNS
  {
    topic: {
      id: 'ext-lcs-edit-distance-patterns',
      slug: 'lcs-edit-distance-patterns',
      category_id: CATEGORY_IDS.patterns,
      title: 'LCS & Edit Distance Patterns',
      definition: 'This family of dynamic programming patterns compares two sequences using a 2D table where dp[i][j] summarizes the relationship between the first i characters of one string and the first j of another, solving problems like longest common subsequence and minimum edit distance.',
      importance: 'These patterns power diff tools, spell checkers, DNA sequence alignment, and version control merges, and they form the mental template for a huge class of two-sequence DP problems.',
      prerequisites: ['dynamic-programming'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(m * n)',
      time_complexity_average: 'O(m * n)',
      time_complexity_worst: 'O(m * n)',
      space_complexity: 'O(m * n) or O(min(m, n))',
      display_order: 606,
    },
    sections: [
      {
        id: 'sec-lcs-edit-distance-patterns-1',
        topic_id: 'ext-lcs-edit-distance-patterns',
        title: 'Concept & Intuition',
        content: `Imagine aligning two strings on a grid, one along the top and one down the side. Every cell $(i, j)$ answers a question about the prefixes "first $i$ characters of A" and "first $j$ characters of B".

For **Longest Common Subsequence (LCS)**, the cell holds the length of the longest subsequence shared by those prefixes. For **Edit Distance**, it holds the minimum number of insertions, deletions, and substitutions to turn one prefix into the other.

> [!NOTE]
> The magic is that each cell depends only on its top, left, and top-left neighbors, which is exactly why a simple nested loop fills the whole table.`,
        display_order: 1,
      },
      {
        id: 'sec-lcs-edit-distance-patterns-2',
        topic_id: 'ext-lcs-edit-distance-patterns',
        title: 'How It Works',
        content: `**LCS recurrence:**
$$dp[i][j] = \\begin{cases} dp[i-1][j-1] + 1 & \\text{if } A[i] = B[j] \\\\ \\max(dp[i-1][j], dp[i][j-1]) & \\text{otherwise} \\end{cases}$$

**Edit distance recurrence:** when characters match, carry the diagonal; otherwise take $1 +$ the minimum of the three neighbors:
$$dp[i][j] = 1 + \\min(dp[i-1][j],\\; dp[i][j-1],\\; dp[i-1][j-1])$$

The three neighbors correspond to **delete**, **insert**, and **substitute** respectively. Base cases: transforming an empty string of length $i$ costs $i$ operations.`,
        display_order: 2,
      },
      {
        id: 'sec-lcs-edit-distance-patterns-3',
        topic_id: 'ext-lcs-edit-distance-patterns',
        title: 'Complexity Analysis',
        content: `Both LCS and edit distance fill an $(m+1) \\times (n+1)$ table with $O(1)$ work per cell:
$$O(m \\times n)$$

**Space** is naively $O(m \\times n)$, but since each row depends only on the previous row, you can reduce it to $O(\\min(m, n))$ by keeping just two rows (or one row with a saved diagonal).

> [!TIP]
> If you only need the length or distance (not the actual alignment), use the rolling-array optimization to save memory. Reconstructing the sequence itself requires the full table or a traceback.`,
        display_order: 3,
      },
      {
        id: 'sec-lcs-edit-distance-patterns-4',
        topic_id: 'ext-lcs-edit-distance-patterns',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Confusing subsequence with substring is a classic error. LCS allows gaps (non-contiguous), while the longest common substring must be contiguous and uses a different recurrence (reset to 0 on mismatch).

Common mistakes:
- Off-by-one indexing between 1-based DP tables and 0-based strings.
- Wrong base-case initialization for the first row and column.
- Applying the rolling-array trick but still needing traceback.

**When to use:**
- Diff tools and version control merges.
- Spell checking and fuzzy string matching.
- DNA and protein sequence alignment.

**When not to use:**
- When approximate matching with weighted or transposition costs is needed — use Damerau-Levenshtein or specialized variants.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-lcs-edit-distance-patterns-py',
        topic_id: 'ext-lcs-edit-distance-patterns',
        language: 'python',
        code: `def lcs(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]

def edit_distance(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[m][n]`,
        explanation: 'lcs returns the longest common subsequence length; edit_distance returns the Levenshtein distance with unit costs.',
        is_optimized: true,
      },
      {
        id: 'snip-lcs-edit-distance-patterns-js',
        topic_id: 'ext-lcs-edit-distance-patterns',
        language: 'javascript',
        code: `function lcs(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

function editDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}`,
        explanation: 'Both functions build a full 2D table; the edit-distance base cases fill the first row and column with prefix lengths.',
        is_optimized: true,
      },
      {
        id: 'snip-lcs-edit-distance-patterns-cpp',
        topic_id: 'ext-lcs-edit-distance-patterns',
        language: 'cpp',
        code: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int lcs(const string& a, const string& b) {
    int m = a.size(), n = b.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = (a[i-1] == b[j-1]) ? dp[i-1][j-1] + 1
                                          : max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}

int editDistance(const string& a, const string& b) {
    int m = a.size(), n = b.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = (a[i-1] == b[j-1]) ? dp[i-1][j-1]
                     : 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
    return dp[m][n];
}`,
        explanation: 'Uses std::min with an initializer list for the three-way minimum in edit distance.',
        is_optimized: true,
      },
      {
        id: 'snip-lcs-edit-distance-patterns-java',
        topic_id: 'ext-lcs-edit-distance-patterns',
        language: 'java',
        code: `public class SequenceDP {
    public int lcs(String a, String b) {
        int m = a.length(), n = b.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = (a.charAt(i-1) == b.charAt(j-1))
                         ? dp[i-1][j-1] + 1
                         : Math.max(dp[i-1][j], dp[i][j-1]);
        return dp[m][n];
    }

    public int editDistance(String a, String b) {
        int m = a.length(), n = b.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = (a.charAt(i-1) == b.charAt(j-1))
                         ? dp[i-1][j-1]
                         : 1 + Math.min(dp[i-1][j], Math.min(dp[i][j-1], dp[i-1][j-1]));
        return dp[m][n];
    }
}`,
        explanation: 'Nested Math.min calls compute the three-way minimum since Java lacks a variadic min.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-lcs-edit-distance-patterns',
    quizTitle: 'LCS & Edit Distance Quiz',
    quizDescription: 'Test your understanding of two-sequence dynamic programming.',
    questions: [
      {
        id: 'q-lcs-edit-distance-patterns-1',
        quiz_id: 'quiz-ext-lcs-edit-distance-patterns',
        question_text: 'What is the time complexity of the standard LCS dynamic programming solution for strings of length m and n?',
        question_type: 'COMPLEXITY',
        options: ['O(m + n)', 'O(m * n)', 'O(m^2 * n^2)', 'O(2^n)'],
        correct_option_index: 1,
        explanation: 'The algorithm fills an (m+1) x (n+1) table with O(1) work per cell, giving O(m * n).',
      },
      {
        id: 'q-lcs-edit-distance-patterns-2',
        quiz_id: 'quiz-ext-lcs-edit-distance-patterns',
        question_text: 'A longest common subsequence must consist of contiguous characters.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'A subsequence may skip characters (allows gaps); only a substring must be contiguous.',
      },
      {
        id: 'q-lcs-edit-distance-patterns-3',
        quiz_id: 'quiz-ext-lcs-edit-distance-patterns',
        question_text: 'In the edit distance recurrence on a mismatch, the three neighbors correspond to which operations?',
        question_type: 'MCQ',
        options: ['Add, multiply, subtract', 'Delete, insert, substitute', 'Copy, paste, cut', 'Push, pop, peek'],
        correct_option_index: 1,
        explanation: 'dp[i-1][j] is a deletion, dp[i][j-1] is an insertion, and dp[i-1][j-1] is a substitution.',
      },
    ],
  },
  // 8. 0/1 & UNBOUNDED KNAPSACK
  {
    topic: {
      id: 'ext-knapsack-01-unbounded',
      slug: 'knapsack-01-unbounded',
      category_id: CATEGORY_IDS.patterns,
      title: '0/1 and Unbounded Knapsack',
      definition: 'The knapsack patterns are dynamic programming templates for selecting items with weights and values to maximize total value under a capacity constraint; the 0/1 variant allows each item at most once, while the unbounded variant allows unlimited copies.',
      importance: 'Knapsack is the canonical model for resource-allocation and subset-selection problems, appearing in budgeting, cutting-stock, coin change, and countless competitive-programming tasks.',
      prerequisites: ['dynamic-programming'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(n * W)',
      time_complexity_average: 'O(n * W)',
      time_complexity_worst: 'O(n * W)',
      space_complexity: 'O(W)',
      display_order: 607,
    },
    sections: [
      {
        id: 'sec-knapsack-01-unbounded-1',
        topic_id: 'ext-knapsack-01-unbounded',
        title: 'Concept & Intuition',
        content: `You're a hiker with a backpack that holds at most $W$ kilograms. Each item has a weight and a value, and you want the most valuable load that still fits.

In the **0/1 knapsack** you either take an item or leave it — no fractions, no duplicates. In the **unbounded knapsack** you can take as many copies of each item as you like (think unlimited coins of each denomination).

> [!NOTE]
> The two variants differ by a single detail: the direction in which you iterate the capacity dimension. That subtle change controls whether an item can be reused.`,
        display_order: 1,
      },
      {
        id: 'sec-knapsack-01-unbounded-2',
        topic_id: 'ext-knapsack-01-unbounded',
        title: 'How It Works',
        content: `Let $dp[w]$ be the best value achievable with capacity $w$. For each item with weight $wt$ and value $val$:

**0/1 knapsack** — iterate capacity **descending** so each item is used at most once:
$$dp[w] = \\max(dp[w],\\; dp[w - wt] + val), \\quad w = W \\ldots wt$$

**Unbounded knapsack** — iterate capacity **ascending** so an item can be reused within the same pass:
$$dp[w] = \\max(dp[w],\\; dp[w - wt] + val), \\quad w = wt \\ldots W$$

The descending order in 0/1 ensures $dp[w - wt]$ still refers to a state without the current item; ascending order in unbounded deliberately lets it include the current item.`,
        display_order: 2,
      },
      {
        id: 'sec-knapsack-01-unbounded-3',
        topic_id: 'ext-knapsack-01-unbounded',
        title: 'Complexity Analysis',
        content: `Both variants process $n$ items across $W$ capacities with $O(1)$ work each:
$$O(n \\times W)$$

**Space** collapses from the naive $O(n \\times W)$ table to $O(W)$ using the 1D rolling array shown above.

> [!WARNING]
> This is **pseudo-polynomial**: $W$ is a numeric value, not the input size in bits. If $W$ is astronomically large, the algorithm is impractical even for few items. Knapsack is NP-hard in general.`,
        display_order: 3,
      },
      {
        id: 'sec-knapsack-01-unbounded-4',
        topic_id: 'ext-knapsack-01-unbounded',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Reversing the loop direction silently converts one variant into the other. Ascending capacity in a 0/1 problem lets items be reused, producing wrong answers.

Common mistakes:
- Wrong iteration direction for the capacity loop.
- Forgetting to guard $w \\ge wt$ before accessing $dp[w - wt]$.
- Confusing "maximize value" with "count ways" (coin change) — the recurrence combine step differs.

**When to use:**
- Budget-constrained selection (0/1).
- Coin change with unlimited coins, rod cutting (unbounded).
- Subset-sum and partition problems (0/1 with boolean DP).

**When not to use:**
- When $W$ is enormous and item count is tiny — use meet-in-the-middle instead.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-knapsack-01-unbounded-py',
        topic_id: 'ext-knapsack-01-unbounded',
        language: 'python',
        code: `def knapsack_01(weights, values, W):
    dp = [0] * (W + 1)
    for i in range(len(weights)):
        for w in range(W, weights[i] - 1, -1):  # descending
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[W]

def knapsack_unbounded(weights, values, W):
    dp = [0] * (W + 1)
    for i in range(len(weights)):
        for w in range(weights[i], W + 1):  # ascending
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[W]`,
        explanation: 'The only difference is the capacity loop direction: descending forbids reuse (0/1), ascending permits it (unbounded).',
        is_optimized: true,
      },
      {
        id: 'snip-knapsack-01-unbounded-js',
        topic_id: 'ext-knapsack-01-unbounded',
        language: 'javascript',
        code: `function knapsack01(weights, values, W) {
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let w = W; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[W];
}

function knapsackUnbounded(weights, values, W) {
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let w = weights[i]; w <= W; w++) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[W];
}`,
        explanation: 'Both use a 1D rolling array of size W+1; the loop bounds encode the reuse policy.',
        is_optimized: true,
      },
      {
        id: 'snip-knapsack-01-unbounded-cpp',
        topic_id: 'ext-knapsack-01-unbounded',
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>
using namespace std;

int knapsack01(const vector<int>& wt, const vector<int>& val, int W) {
    vector<int> dp(W + 1, 0);
    for (size_t i = 0; i < wt.size(); i++)
        for (int w = W; w >= wt[i]; w--)
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
    return dp[W];
}

int knapsackUnbounded(const vector<int>& wt, const vector<int>& val, int W) {
    vector<int> dp(W + 1, 0);
    for (size_t i = 0; i < wt.size(); i++)
        for (int w = wt[i]; w <= W; w++)
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
    return dp[W];
}`,
        explanation: 'Identical recurrence; the descending vs ascending inner loop distinguishes the two knapsack types.',
        is_optimized: true,
      },
      {
        id: 'snip-knapsack-01-unbounded-java',
        topic_id: 'ext-knapsack-01-unbounded',
        language: 'java',
        code: `public class Knapsack {
    public int knapsack01(int[] wt, int[] val, int W) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < wt.length; i++)
            for (int w = W; w >= wt[i]; w--)
                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
        return dp[W];
    }

    public int knapsackUnbounded(int[] wt, int[] val, int W) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < wt.length; i++)
            for (int w = wt[i]; w <= W; w++)
                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
        return dp[W];
    }
}`,
        explanation: 'Java arrays default to zero, so no explicit initialization of dp is needed.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-knapsack-01-unbounded',
    quizTitle: '0/1 and Unbounded Knapsack Quiz',
    quizDescription: 'Test your understanding of capacity-constrained selection DP.',
    questions: [
      {
        id: 'q-knapsack-01-unbounded-1',
        quiz_id: 'quiz-ext-knapsack-01-unbounded',
        question_text: 'In the 1D array optimization, which capacity loop direction is used for the 0/1 knapsack?',
        question_type: 'MCQ',
        options: ['Ascending (low to high)', 'Descending (high to low)', 'Either works identically', 'Random order'],
        correct_option_index: 1,
        explanation: 'Descending order ensures dp[w - wt] refers to a state that has not yet included the current item, preventing reuse.',
      },
      {
        id: 'q-knapsack-01-unbounded-2',
        quiz_id: 'quiz-ext-knapsack-01-unbounded',
        question_text: 'The knapsack DP runs in polynomial time with respect to the number of bits in the input.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'It is pseudo-polynomial: O(n*W) depends on the numeric value W, not its bit length. Knapsack is NP-hard.',
      },
      {
        id: 'q-knapsack-01-unbounded-3',
        quiz_id: 'quiz-ext-knapsack-01-unbounded',
        question_text: 'What is the time complexity of the standard knapsack DP with n items and capacity W?',
        question_type: 'COMPLEXITY',
        options: ['O(n + W)', 'O(n * W)', 'O(2^n)', 'O(n log W)'],
        correct_option_index: 1,
        explanation: 'Each of the n items is processed across up to W capacities, giving O(n * W).',
      },
    ],
  },
  // 9. GAME THEORY & MINIMAX
  {
    topic: {
      id: 'ext-game-theory-minimax',
      slug: 'game-theory-minimax',
      category_id: CATEGORY_IDS.patterns,
      title: 'Game Theory & Minimax',
      definition: 'Minimax is a decision rule for two-player zero-sum games in which one player maximizes the outcome while the other minimizes it; combined with recursion and optional alpha-beta pruning, it computes optimal play from any game state.',
      importance: 'It is the foundation of adversarial search in games like tic-tac-toe, chess, and Nim, and the same maximize/minimize recursion models many competitive-programming "optimal play" problems.',
      prerequisites: ['recursion', 'dynamic-programming'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(b^(d/2)) with alpha-beta',
      time_complexity_average: 'O(b^d)',
      time_complexity_worst: 'O(b^d)',
      space_complexity: 'O(d)',
      display_order: 608,
    },
    sections: [
      {
        id: 'sec-game-theory-minimax-1',
        topic_id: 'ext-game-theory-minimax',
        title: 'Concept & Intuition',
        content: `Picture two rivals taking turns. One wants the score as **high** as possible, the other wants it as **low** as possible. Each assumes the opponent will always play their best. That mutual assumption is the essence of minimax.

At a state where it's the maximizer's turn, we pick the child with the largest value. At a minimizer's turn, we pick the smallest. Leaves are terminal positions with a known score (win, lose, draw).

> [!NOTE]
> In a zero-sum game one player's gain is exactly the other's loss, so a single value per node fully captures the outcome under optimal play.`,
        display_order: 1,
      },
      {
        id: 'sec-game-theory-minimax-2',
        topic_id: 'ext-game-theory-minimax',
        title: 'How It Works',
        content: `The recursion alternates roles at each depth:
$$\\text{value}(s) = \\begin{cases} \\text{payoff}(s) & \\text{terminal} \\\\ \\max_{c} \\text{value}(c) & \\text{maximizer's turn} \\\\ \\min_{c} \\text{value}(c) & \\text{minimizer's turn} \\end{cases}$$

**Alpha-beta pruning** speeds this up by tracking $\\alpha$ (best guaranteed for the maximizer) and $\\beta$ (best guaranteed for the minimizer). When $\\alpha \\ge \\beta$, further children cannot influence the result and are pruned.

For games with a **Grundy/Nim** structure, we instead compute the XOR of pile sizes: a position is losing for the player to move exactly when the XOR is zero.`,
        display_order: 2,
      },
      {
        id: 'sec-game-theory-minimax-3',
        topic_id: 'ext-game-theory-minimax',
        title: 'Complexity Analysis',
        content: `Plain minimax explores the full game tree with branching factor $b$ and depth $d$:
$$O(b^d)$$

**Alpha-beta pruning** with an optimal move ordering reduces this to $O(b^{d/2})$, effectively doubling the searchable depth for the same cost.

**Space** is $O(d)$ for the recursion stack. Memoizing states (transposition tables) trades memory for speed when positions repeat.

> [!TIP]
> Move ordering matters enormously for alpha-beta. Searching likely-best moves first triggers more cutoffs and approaches the best-case bound.`,
        display_order: 3,
      },
      {
        id: 'sec-game-theory-minimax-4',
        topic_id: 'ext-game-theory-minimax',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Mixing up which player maximizes at the current depth flips the entire result. Track the turn explicitly and be consistent about the sign of the payoff.

Common mistakes:
- Incorrect alpha-beta bounds propagation.
- Forgetting that a draw is a distinct terminal value.
- Applying minimax to non-zero-sum games where a single value is insufficient.

**When to use:**
- Perfect-information two-player zero-sum games.
- "Optimal play" DP problems (stone games, coin-picking).
- Nim-like games via Grundy numbers.

**When not to use:**
- Games with hidden information or chance nodes (use expectimax instead).`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-game-theory-minimax-py',
        topic_id: 'ext-game-theory-minimax',
        language: 'python',
        code: `import math

def minimax(state, depth, alpha, beta, maximizing, get_moves, apply_move, evaluate, is_terminal):
    if depth == 0 or is_terminal(state):
        return evaluate(state)
    if maximizing:
        value = -math.inf
        for move in get_moves(state):
            value = max(value, minimax(apply_move(state, move), depth - 1,
                                       alpha, beta, False, get_moves, apply_move,
                                       evaluate, is_terminal))
            alpha = max(alpha, value)
            if alpha >= beta:
                break  # beta cutoff
        return value
    else:
        value = math.inf
        for move in get_moves(state):
            value = min(value, minimax(apply_move(state, move), depth - 1,
                                       alpha, beta, True, get_moves, apply_move,
                                       evaluate, is_terminal))
            beta = min(beta, value)
            if alpha >= beta:
                break  # alpha cutoff
        return value`,
        explanation: 'Generic minimax with alpha-beta pruning; callbacks abstract the game rules, and cutoffs prune branches once alpha >= beta.',
        is_optimized: true,
      },
      {
        id: 'snip-game-theory-minimax-js',
        topic_id: 'ext-game-theory-minimax',
        language: 'javascript',
        code: `function minimax(state, depth, alpha, beta, maximizing, game) {
  if (depth === 0 || game.isTerminal(state)) return game.evaluate(state);
  if (maximizing) {
    let value = -Infinity;
    for (const move of game.getMoves(state)) {
      value = Math.max(value, minimax(game.apply(state, move), depth - 1, alpha, beta, false, game));
      alpha = Math.max(alpha, value);
      if (alpha >= beta) break; // beta cutoff
    }
    return value;
  } else {
    let value = Infinity;
    for (const move of game.getMoves(state)) {
      value = Math.min(value, minimax(game.apply(state, move), depth - 1, alpha, beta, true, game));
      beta = Math.min(beta, value);
      if (alpha >= beta) break; // alpha cutoff
    }
    return value;
  }
}`,
        explanation: 'The game object bundles rule callbacks; alpha and beta narrow as the search descends, pruning dominated branches.',
        is_optimized: true,
      },
      {
        id: 'snip-game-theory-minimax-cpp',
        topic_id: 'ext-game-theory-minimax',
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>
#include <limits>
using namespace std;

// Example: optimal score difference in a coin-row game (both play optimally).
int solve(const vector<int>& coins, int i, int j, vector<vector<int>>& memo) {
    if (i > j) return 0;
    if (memo[i][j] != INT_MIN) return memo[i][j];
    int takeLeft = coins[i] - solve(coins, i + 1, j, memo);
    int takeRight = coins[j] - solve(coins, i, j - 1, memo);
    return memo[i][j] = max(takeLeft, takeRight);
}

int coinGame(const vector<int>& coins) {
    int n = coins.size();
    vector<vector<int>> memo(n, vector<int>(n, INT_MIN));
    return solve(coins, 0, n - 1, memo);
}`,
        explanation: 'Memoized minimax: each subtraction flips perspective so the value is the current player\'s optimal score advantage.',
        is_optimized: true,
      },
      {
        id: 'snip-game-theory-minimax-java',
        topic_id: 'ext-game-theory-minimax',
        language: 'java',
        code: `public class CoinGame {
    private int[] coins;
    private Integer[][] memo;

    public int coinGame(int[] coins) {
        this.coins = coins;
        int n = coins.length;
        memo = new Integer[n][n];
        return solve(0, n - 1);
    }

    private int solve(int i, int j) {
        if (i > j) return 0;
        if (memo[i][j] != null) return memo[i][j];
        int takeLeft = coins[i] - solve(i + 1, j);
        int takeRight = coins[j] - solve(i, j - 1);
        return memo[i][j] = Math.max(takeLeft, takeRight);
    }
}`,
        explanation: 'The recursion returns the optimal score difference; subtracting the opponent\'s result implements the minimax alternation.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-game-theory-minimax',
    quizTitle: 'Game Theory & Minimax Quiz',
    quizDescription: 'Test your understanding of adversarial search and optimal play.',
    questions: [
      {
        id: 'q-game-theory-minimax-1',
        quiz_id: 'quiz-ext-game-theory-minimax',
        question_text: 'With optimal move ordering, alpha-beta pruning reduces minimax time complexity from O(b^d) to what?',
        question_type: 'COMPLEXITY',
        options: ['O(b^d)', 'O(b^(d/2))', 'O(d^b)', 'O(b*d)'],
        correct_option_index: 1,
        explanation: 'Optimal ordering lets alpha-beta prune roughly half the depth\'s worth of branches, giving O(b^(d/2)).',
      },
      {
        id: 'q-game-theory-minimax-2',
        quiz_id: 'quiz-ext-game-theory-minimax',
        question_text: 'In a Nim game, a position is losing for the player to move exactly when the XOR of pile sizes is zero.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'A zero XOR (Grundy value) means every move leads to a nonzero XOR, so the current player has no winning move.',
      },
      {
        id: 'q-game-theory-minimax-3',
        quiz_id: 'quiz-ext-game-theory-minimax',
        question_text: 'When does alpha-beta pruning cut off the remaining children of a node?',
        question_type: 'MCQ',
        options: ['When alpha < beta', 'When alpha >= beta', 'When depth reaches zero', 'When the node is a leaf'],
        correct_option_index: 1,
        explanation: 'Once alpha >= beta, the remaining children cannot change the outcome, so they are pruned.',
      },
    ],
  },
  // 10. SEGMENT TREE WITH LAZY PROPAGATION
  {
    topic: {
      id: 'ext-segment-tree-with-lazy-propagation',
      slug: 'segment-tree-with-lazy-propagation',
      category_id: CATEGORY_IDS.patterns,
      title: 'Segment Tree with Lazy Propagation',
      definition: 'A segment tree with lazy propagation is an augmented binary tree over an array that supports both range queries and range updates in logarithmic time by deferring pending updates in "lazy" tags and pushing them down only when a node is visited.',
      importance: 'It is the standard tool for problems requiring many interleaved range updates and range queries (range add, range assign, range min/max/sum), which naive arrays cannot handle efficiently.',
      prerequisites: ['segment-tree', 'trees'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(log n) per operation',
      time_complexity_average: 'O(log n) per operation',
      time_complexity_worst: 'O(log n) per operation',
      space_complexity: 'O(n)',
      display_order: 609,
    },
    sections: [
      {
        id: 'sec-segment-tree-with-lazy-propagation-1',
        topic_id: 'ext-segment-tree-with-lazy-propagation',
        title: 'Concept & Intuition',
        content: `A plain segment tree answers range queries fast, but a range update that touches many leaves would cost $O(n)$ if applied to each one. Lazy propagation fixes this with a simple idea: **be lazy**.

When an update fully covers a node's range, we record the change on that node with a "lazy" tag and stop, rather than descending to every leaf. The pending change is pushed down to children only later, when a query or update actually needs to enter them.

> [!NOTE]
> The lazy tag is a promise: "everything below me still owes this update." We honor the promise just-in-time, keeping every operation at $O(\\log n)$.`,
        display_order: 1,
      },
      {
        id: 'sec-segment-tree-with-lazy-propagation-2',
        topic_id: 'ext-segment-tree-with-lazy-propagation',
        title: 'How It Works',
        content: `Each node stores an aggregate (e.g. sum) and a lazy value holding a deferred update. Two helpers manage the deferral:

1. **apply(node, value):** update the node's aggregate to reflect the pending change and accumulate it into the node's lazy tag.
2. **push_down(node):** propagate this node's lazy tag to its two children, then clear it.

A range update recurses down; when a node's segment lies fully inside the update range, it applies the change and returns without visiting children. A range query calls push_down before recursing so it always reads up-to-date aggregates.

The tree has height $\\lceil \\log_2 n \\rceil$, and each operation touches $O(\\log n)$ nodes.`,
        display_order: 2,
      },
      {
        id: 'sec-segment-tree-with-lazy-propagation-3',
        topic_id: 'ext-segment-tree-with-lazy-propagation',
        title: 'Complexity Analysis',
        content: `Both range update and range query visit $O(\\log n)$ nodes because the recursion branches into at most two "partial" segments per level:
$$O(\\log n) \\text{ per operation}$$

Building the tree is $O(n)$, and the total storage is $O(n)$ — typically $4n$ array slots to hold all internal nodes safely, plus an equal-sized lazy array.

> [!TIP]
> Allocate $4n$ elements for both the tree and lazy arrays. Using exactly $2n$ can overflow for non-power-of-two sizes.`,
        display_order: 3,
      },
      {
        id: 'sec-segment-tree-with-lazy-propagation-4',
        topic_id: 'ext-segment-tree-with-lazy-propagation',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Forgetting to call push_down before recursing into children is the number-one bug. It causes queries to read stale aggregates that ignore pending updates.

Common mistakes:
- Missing push_down at the start of update/query recursion.
- Incorrectly combining lazy tags for non-commutative updates (e.g. mixing range-add with range-assign).
- Under-allocating the tree array (use $4n$).

**When to use:**
- Range add / range assign combined with range sum / min / max queries.
- Problems with $10^5$+ interleaved updates and queries.

**When not to use:**
- Point-update-only workloads (a Fenwick/BIT tree is simpler and faster).`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-segment-tree-with-lazy-propagation-py',
        topic_id: 'ext-segment-tree-with-lazy-propagation',
        language: 'python',
        code: `class LazySegTree:
    def __init__(self, data):
        self.n = len(data)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        self._build(data, 1, 0, self.n - 1)

    def _build(self, data, node, lo, hi):
        if lo == hi:
            self.tree[node] = data[lo]
            return
        mid = (lo + hi) // 2
        self._build(data, 2 * node, lo, mid)
        self._build(data, 2 * node + 1, mid + 1, hi)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def _apply(self, node, lo, hi, val):
        self.tree[node] += (hi - lo + 1) * val
        self.lazy[node] += val

    def _push_down(self, node, lo, hi):
        if self.lazy[node]:
            mid = (lo + hi) // 2
            self._apply(2 * node, lo, mid, self.lazy[node])
            self._apply(2 * node + 1, mid + 1, hi, self.lazy[node])
            self.lazy[node] = 0

    def update(self, l, r, val, node=1, lo=0, hi=None):
        if hi is None:
            hi = self.n - 1
        if r < lo or hi < l:
            return
        if l <= lo and hi <= r:
            self._apply(node, lo, hi, val)
            return
        self._push_down(node, lo, hi)
        mid = (lo + hi) // 2
        self.update(l, r, val, 2 * node, lo, mid)
        self.update(l, r, val, 2 * node + 1, mid + 1, hi)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, l, r, node=1, lo=0, hi=None):
        if hi is None:
            hi = self.n - 1
        if r < lo or hi < l:
            return 0
        if l <= lo and hi <= r:
            return self.tree[node]
        self._push_down(node, lo, hi)
        mid = (lo + hi) // 2
        return self.query(l, r, 2 * node, lo, mid) + self.query(l, r, 2 * node + 1, mid + 1, hi)`,
        explanation: 'Range-add / range-sum segment tree. _push_down flushes the pending lazy value into children before recursing.',
        is_optimized: true,
      },
      {
        id: 'snip-segment-tree-with-lazy-propagation-js',
        topic_id: 'ext-segment-tree-with-lazy-propagation',
        language: 'javascript',
        code: `class LazySegTree {
  constructor(data) {
    this.n = data.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.lazy = new Array(4 * this.n).fill(0);
    this.build(data, 1, 0, this.n - 1);
  }

  build(data, node, lo, hi) {
    if (lo === hi) { this.tree[node] = data[lo]; return; }
    const mid = (lo + hi) >> 1;
    this.build(data, 2 * node, lo, mid);
    this.build(data, 2 * node + 1, mid + 1, hi);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  apply(node, lo, hi, val) {
    this.tree[node] += (hi - lo + 1) * val;
    this.lazy[node] += val;
  }

  pushDown(node, lo, hi) {
    if (this.lazy[node] !== 0) {
      const mid = (lo + hi) >> 1;
      this.apply(2 * node, lo, mid, this.lazy[node]);
      this.apply(2 * node + 1, mid + 1, hi, this.lazy[node]);
      this.lazy[node] = 0;
    }
  }

  update(l, r, val, node = 1, lo = 0, hi = this.n - 1) {
    if (r < lo || hi < l) return;
    if (l <= lo && hi <= r) { this.apply(node, lo, hi, val); return; }
    this.pushDown(node, lo, hi);
    const mid = (lo + hi) >> 1;
    this.update(l, r, val, 2 * node, lo, mid);
    this.update(l, r, val, 2 * node + 1, mid + 1, hi);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  query(l, r, node = 1, lo = 0, hi = this.n - 1) {
    if (r < lo || hi < l) return 0;
    if (l <= lo && hi <= r) return this.tree[node];
    this.pushDown(node, lo, hi);
    const mid = (lo + hi) >> 1;
    return this.query(l, r, 2 * node, lo, mid) + this.query(l, r, 2 * node + 1, mid + 1, hi);
  }
}`,
        explanation: 'Class-based range-add / range-sum tree; default parameters seed the root call, and pushDown maintains correctness.',
        is_optimized: true,
      },
      {
        id: 'snip-segment-tree-with-lazy-propagation-cpp',
        topic_id: 'ext-segment-tree-with-lazy-propagation',
        language: 'cpp',
        code: `#include <vector>
using namespace std;

struct LazySegTree {
    int n;
    vector<long long> tree, lazy;

    LazySegTree(const vector<long long>& data) {
        n = data.size();
        tree.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
        build(data, 1, 0, n - 1);
    }

    void build(const vector<long long>& data, int node, int lo, int hi) {
        if (lo == hi) { tree[node] = data[lo]; return; }
        int mid = (lo + hi) / 2;
        build(data, 2 * node, lo, mid);
        build(data, 2 * node + 1, mid + 1, hi);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    void applyNode(int node, int lo, int hi, long long val) {
        tree[node] += (long long)(hi - lo + 1) * val;
        lazy[node] += val;
    }

    void pushDown(int node, int lo, int hi) {
        if (lazy[node]) {
            int mid = (lo + hi) / 2;
            applyNode(2 * node, lo, mid, lazy[node]);
            applyNode(2 * node + 1, mid + 1, hi, lazy[node]);
            lazy[node] = 0;
        }
    }

    void update(int l, int r, long long val, int node, int lo, int hi) {
        if (r < lo || hi < l) return;
        if (l <= lo && hi <= r) { applyNode(node, lo, hi, val); return; }
        pushDown(node, lo, hi);
        int mid = (lo + hi) / 2;
        update(l, r, val, 2 * node, lo, mid);
        update(l, r, val, 2 * node + 1, mid + 1, hi);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    long long query(int l, int r, int node, int lo, int hi) {
        if (r < lo || hi < l) return 0;
        if (l <= lo && hi <= r) return tree[node];
        pushDown(node, lo, hi);
        int mid = (lo + hi) / 2;
        return query(l, r, 2 * node, lo, mid) + query(l, r, 2 * node + 1, mid + 1, hi);
    }
};`,
        explanation: 'long long guards against sum overflow; applyNode both updates the aggregate and accumulates the lazy tag.',
        is_optimized: true,
      },
      {
        id: 'snip-segment-tree-with-lazy-propagation-java',
        topic_id: 'ext-segment-tree-with-lazy-propagation',
        language: 'java',
        code: `public class LazySegTree {
    private final int n;
    private final long[] tree, lazy;

    public LazySegTree(long[] data) {
        n = data.length;
        tree = new long[4 * n];
        lazy = new long[4 * n];
        build(data, 1, 0, n - 1);
    }

    private void build(long[] data, int node, int lo, int hi) {
        if (lo == hi) { tree[node] = data[lo]; return; }
        int mid = (lo + hi) / 2;
        build(data, 2 * node, lo, mid);
        build(data, 2 * node + 1, mid + 1, hi);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    private void applyNode(int node, int lo, int hi, long val) {
        tree[node] += (long) (hi - lo + 1) * val;
        lazy[node] += val;
    }

    private void pushDown(int node, int lo, int hi) {
        if (lazy[node] != 0) {
            int mid = (lo + hi) / 2;
            applyNode(2 * node, lo, mid, lazy[node]);
            applyNode(2 * node + 1, mid + 1, hi, lazy[node]);
            lazy[node] = 0;
        }
    }

    public void update(int l, int r, long val, int node, int lo, int hi) {
        if (r < lo || hi < l) return;
        if (l <= lo && hi <= r) { applyNode(node, lo, hi, val); return; }
        pushDown(node, lo, hi);
        int mid = (lo + hi) / 2;
        update(l, r, val, 2 * node, lo, mid);
        update(l, r, val, 2 * node + 1, mid + 1, hi);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    public long query(int l, int r, int node, int lo, int hi) {
        if (r < lo || hi < l) return 0;
        if (l <= lo && hi <= r) return tree[node];
        pushDown(node, lo, hi);
        int mid = (lo + hi) / 2;
        return query(l, r, 2 * node, lo, mid) + query(l, r, 2 * node + 1, mid + 1, hi);
    }
}`,
        explanation: 'Uses long[] arrays sized to 4n; the recursion mirrors the C++ version with explicit node/range parameters.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-segment-tree-with-lazy-propagation',
    quizTitle: 'Segment Tree with Lazy Propagation Quiz',
    quizDescription: 'Test your understanding of deferred range updates on segment trees.',
    questions: [
      {
        id: 'q-segment-tree-with-lazy-propagation-1',
        quiz_id: 'quiz-ext-segment-tree-with-lazy-propagation',
        question_text: 'What is the time complexity of a range update on a segment tree with lazy propagation?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correct_option_index: 1,
        explanation: 'Lazy propagation lets a range update stop at fully-covered nodes, touching only O(log n) nodes.',
      },
      {
        id: 'q-segment-tree-with-lazy-propagation-2',
        quiz_id: 'quiz-ext-segment-tree-with-lazy-propagation',
        question_text: 'What does the lazy tag on a node represent?',
        question_type: 'MCQ',
        options: ['The node\'s current aggregate value', 'A pending update that still needs to be propagated to children', 'The number of children', 'The depth of the node'],
        correct_option_index: 1,
        explanation: 'The lazy tag stores a deferred update that will be pushed down to children when they are next visited.',
      },
      {
        id: 'q-segment-tree-with-lazy-propagation-3',
        quiz_id: 'quiz-ext-segment-tree-with-lazy-propagation',
        question_text: 'You must push down pending lazy values before recursing into a node\'s children.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Skipping push_down lets children return stale aggregates that ignore the pending update, causing wrong answers.',
      },
    ],
  },
  // 11. MEET IN THE MIDDLE
  {
    topic: {
      id: 'ext-meet-in-the-middle',
      slug: 'meet-in-the-middle',
      category_id: CATEGORY_IDS.patterns,
      title: 'Meet in the Middle',
      definition: 'Meet in the middle is a technique that splits the search space into two halves, enumerates all possibilities of each half independently, and then combines the two result sets, reducing an exponential search from O(2^n) toward O(2^(n/2)).',
      importance: 'It makes otherwise infeasible exponential problems (subset-sum, closest-sum, counting solutions) tractable for medium n around 40 by trading a square-root reduction in exponent for extra memory.',
      prerequisites: ['sorting', 'binary-search'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(2^(n/2))',
      time_complexity_average: 'O(2^(n/2) * n)',
      time_complexity_worst: 'O(2^(n/2) * n)',
      space_complexity: 'O(2^(n/2))',
      display_order: 610,
    },
    sections: [
      {
        id: 'sec-meet-in-the-middle-1',
        topic_id: 'ext-meet-in-the-middle',
        title: 'Concept & Intuition',
        content: `Enumerating all $2^n$ subsets of 40 items is hopeless — that's over a trillion. But $2^{20}$ is only about a million, which is trivial.

Meet in the middle exploits this gap: split the $n$ items into two halves of size $n/2$, enumerate all $2^{n/2}$ subset-sums of each half separately, then cleverly **combine** the two lists to answer the original question.

> [!NOTE]
> The name captures the idea: two searches start from opposite ends of the problem and "meet" when their partial results are matched together.`,
        display_order: 1,
      },
      {
        id: 'sec-meet-in-the-middle-2',
        topic_id: 'ext-meet-in-the-middle',
        title: 'How It Works',
        content: `For a subset-sum target problem:
1. Split items into halves $A$ and $B$.
2. Generate every subset sum of $A$ (there are $2^{|A|}$) and of $B$.
3. Sort $B$'s sums.
4. For each sum $s$ in $A$, binary-search $B$'s sorted list for the complement $\\text{target} - s$.

The combine step is the crux. Depending on the question, it can be an exact match (hash set), a "closest" search (binary search / two pointers), or a count of pairs below a threshold.

$$\\underbrace{2^{n/2}}_{\\text{enumerate}} + \\underbrace{2^{n/2} \\log(2^{n/2})}_{\\text{sort + search}} = O(2^{n/2} \\cdot n)$$`,
        display_order: 2,
      },
      {
        id: 'sec-meet-in-the-middle-3',
        topic_id: 'ext-meet-in-the-middle',
        title: 'Complexity Analysis',
        content: `Enumerating each half is $O(2^{n/2})$. Sorting one half's sums costs $O(2^{n/2} \\log 2^{n/2}) = O(2^{n/2} \\cdot n)$, and the combine phase does $2^{n/2}$ binary searches at the same cost.

$$O(2^{n/2} \\cdot n)$$

This is the square-root improvement over the naive $O(2^n)$: it roughly doubles the feasible $n$ (from ~$20$ to ~$40$).

**Space** is $O(2^{n/2})$ to store the enumerated half-sums.

> [!TIP]
> When $n \\le 40$ but too large for full enumeration, meet in the middle is often the intended solution.`,
        display_order: 3,
      },
      {
        id: 'sec-meet-in-the-middle-4',
        topic_id: 'ext-meet-in-the-middle',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The memory cost is real: $2^{n/2}$ can be tens of millions of entries. Watch for out-of-memory issues and prefer arrays over heavy objects.

Common mistakes:
- Forgetting to include the empty subset (sum $0$) in each half.
- An inefficient combine step that reintroduces an $O(2^{n/2} \\cdot 2^{n/2})$ blowup.
- Integer overflow when summing large values.

**When to use:**
- Subset-sum / partition when $n \\approx 40$.
- Counting subsets meeting a threshold, closest-sum-to-target.
- Discrete-log style problems (baby-step giant-step).

**When not to use:**
- Small $n$ (direct DP or enumeration is simpler) or when halves can't be combined cheaply.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-meet-in-the-middle-py',
        topic_id: 'ext-meet-in-the-middle',
        language: 'python',
        code: `from bisect import bisect_right

def subset_sums(items):
    sums = [0]
    for x in items:
        sums += [s + x for s in sums]
    return sums

def count_subsets_at_most(nums, target):
    n = len(nums)
    left = subset_sums(nums[:n // 2])
    right = sorted(subset_sums(nums[n // 2:]))
    count = 0
    for s in left:
        if s <= target:
            count += bisect_right(right, target - s)
    return count`,
        explanation: 'Enumerates subset sums of each half, sorts the right half, and binary-searches the complement to count subsets summing to at most target.',
        is_optimized: true,
      },
      {
        id: 'snip-meet-in-the-middle-js',
        topic_id: 'ext-meet-in-the-middle',
        language: 'javascript',
        code: `function subsetSums(items) {
  let sums = [0];
  for (const x of items) {
    sums = sums.concat(sums.map((s) => s + x));
  }
  return sums;
}

function upperBound(arr, target) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function countSubsetsAtMost(nums, target) {
  const n = nums.length;
  const left = subsetSums(nums.slice(0, n >> 1));
  const right = subsetSums(nums.slice(n >> 1)).sort((a, b) => a - b);
  let count = 0;
  for (const s of left) {
    if (s <= target) count += upperBound(right, target - s);
  }
  return count;
}`,
        explanation: 'upperBound is a hand-written binary search; the combine step counts right-half sums not exceeding the remaining budget.',
        is_optimized: true,
      },
      {
        id: 'snip-meet-in-the-middle-cpp',
        topic_id: 'ext-meet-in-the-middle',
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>
using namespace std;

vector<long long> subsetSums(const vector<int>& items) {
    vector<long long> sums = {0};
    for (int x : items) {
        int sz = sums.size();
        for (int i = 0; i < sz; i++)
            sums.push_back(sums[i] + x);
    }
    return sums;
}

long long countSubsetsAtMost(const vector<int>& nums, long long target) {
    int n = nums.size();
    vector<int> a(nums.begin(), nums.begin() + n / 2);
    vector<int> b(nums.begin() + n / 2, nums.end());
    vector<long long> left = subsetSums(a);
    vector<long long> right = subsetSums(b);
    sort(right.begin(), right.end());
    long long count = 0;
    for (long long s : left) {
        if (s <= target)
            count += upper_bound(right.begin(), right.end(), target - s) - right.begin();
    }
    return count;
}`,
        explanation: 'Uses std::upper_bound on the sorted right half; long long avoids overflow when accumulating sums.',
        is_optimized: true,
      },
      {
        id: 'snip-meet-in-the-middle-java',
        topic_id: 'ext-meet-in-the-middle',
        language: 'java',
        code: `import java.util.*;

public class MeetInMiddle {
    private long[] subsetSums(int[] items) {
        long[] sums = new long[1 << items.length];
        int size = 1;
        sums[0] = 0;
        for (int x : items) {
            for (int i = 0; i < size; i++)
                sums[size + i] = sums[i] + x;
            size <<= 1;
        }
        return sums;
    }

    public long countSubsetsAtMost(int[] nums, long target) {
        int n = nums.length;
        int[] a = Arrays.copyOfRange(nums, 0, n / 2);
        int[] b = Arrays.copyOfRange(nums, n / 2, n);
        long[] left = subsetSums(a);
        long[] right = subsetSums(b);
        Arrays.sort(right);
        long count = 0;
        for (long s : left) {
            if (s <= target) count += upperBound(right, target - s);
        }
        return count;
    }

    private int upperBound(long[] arr, long target) {
        int lo = 0, hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`,
        explanation: 'Preallocates the sums array to 2^k and doubles the filled size per item; upperBound counts valid complements.',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-meet-in-the-middle',
    quizTitle: 'Meet in the Middle Quiz',
    quizDescription: 'Test your understanding of splitting exponential search into two halves.',
    questions: [
      {
        id: 'q-meet-in-the-middle-1',
        quiz_id: 'quiz-ext-meet-in-the-middle',
        question_text: 'Meet in the middle reduces a naive O(2^n) subset search to roughly what complexity?',
        question_type: 'COMPLEXITY',
        options: ['O(n^2)', 'O(2^(n/2) * n)', 'O(n log n)', 'O(2^n / n)'],
        correct_option_index: 1,
        explanation: 'Each half has 2^(n/2) subset sums; sorting and searching add an n factor, giving O(2^(n/2) * n).',
      },
      {
        id: 'q-meet-in-the-middle-2',
        quiz_id: 'quiz-ext-meet-in-the-middle',
        question_text: 'Meet in the middle trades reduced time for increased memory usage.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'It must store O(2^(n/2)) half-sums, which is the memory cost of the speedup.',
      },
      {
        id: 'q-meet-in-the-middle-3',
        quiz_id: 'quiz-ext-meet-in-the-middle',
        question_text: 'For which range of n is meet in the middle typically the intended approach?',
        question_type: 'MCQ',
        options: ['n around 10', 'n around 40', 'n around 1000', 'n around 10^6'],
        correct_option_index: 1,
        explanation: 'Around n = 40, full 2^n enumeration is infeasible but 2^(n/2) = 2^20 per half is easily manageable.',
      },
    ],
  },
  // 12. SQUARE ROOT DECOMPOSITION
  {
    topic: {
      id: 'ext-square-root-decomposition',
      slug: 'square-root-decomposition',
      category_id: CATEGORY_IDS.patterns,
      title: 'Square Root Decomposition',
      definition: 'Square root decomposition partitions an array into blocks of size about sqrt(n) and precomputes an aggregate per block, so range queries and updates touch only O(sqrt(n)) elements or blocks instead of the whole array.',
      importance: 'It offers a simple, flexible alternative to segment trees for range queries, and its block-based thinking generalizes to Mos algorithm and many offline query techniques.',
      prerequisites: ['array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(sqrt(n)) per query',
      time_complexity_average: 'O(sqrt(n)) per query',
      time_complexity_worst: 'O(sqrt(n)) per query',
      space_complexity: 'O(n)',
      display_order: 611,
    },
    sections: [
      {
        id: 'sec-square-root-decomposition-1',
        topic_id: 'ext-square-root-decomposition',
        title: 'Concept & Intuition',
        content: `Imagine a long bookshelf divided into equal sections. To count books in a range of positions, you don't count one by one — you use the precomputed total for each **full section** the range covers, then hand-count only the partial sections at the two ends.

Square root decomposition applies this to an array: partition it into $\\sqrt{n}$ blocks, each holding $\\sqrt{n}$ elements, and store an aggregate (sum, min, etc.) per block.

> [!NOTE]
> The block size $\\sqrt{n}$ is chosen to balance two costs: the number of blocks and the size of each block are both $\\sqrt{n}$, minimizing their sum.`,
        display_order: 1,
      },
      {
        id: 'sec-square-root-decomposition-2',
        topic_id: 'ext-square-root-decomposition',
        title: 'How It Works',
        content: `Let block size $b = \\lceil \\sqrt{n} \\rceil$. Element $i$ belongs to block $\\lfloor i / b \\rfloor$.

**Range query $[l, r]$:**
- For the partial block at the left end, iterate elements individually.
- For every block fully inside $[l, r]$, use its precomputed aggregate.
- For the partial block at the right end, iterate individually.

**Point update at index $i$:** update the element and refresh its block's aggregate in $O(1)$.

Both the partial-end scans (at most $2b$ elements) and the full-block sweep (at most $n/b$ blocks) are $O(\\sqrt{n})$.`,
        display_order: 2,
      },
      {
        id: 'sec-square-root-decomposition-3',
        topic_id: 'ext-square-root-decomposition',
        title: 'Complexity Analysis',
        content: `With $b = \\sqrt{n}$:
- Partial ends contribute at most $2b = O(\\sqrt{n})$.
- Full blocks contribute at most $n/b = O(\\sqrt{n})$.

$$O(\\sqrt{n}) \\text{ per query or update}$$

Preprocessing (computing every block aggregate) is $O(n)$, and total extra space is $O(\\sqrt{n})$ for the block array, or $O(n)$ overall.

> [!TIP]
> Segment trees give $O(\\log n)$ per query versus $O(\\sqrt{n})$ here, but square root decomposition is far simpler to code and easy to adapt to unusual query types.`,
        display_order: 3,
      },
      {
        id: 'sec-square-root-decomposition-4',
        topic_id: 'ext-square-root-decomposition',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Handle the case where $l$ and $r$ fall in the same block separately — the general full-block loop assumes at least one complete block between the two partial ends.

Common mistakes:
- Off-by-one errors at block boundaries.
- Forgetting to update the block aggregate after a point update.
- Choosing a block size that is not close to $\\sqrt{n}$, degrading performance.

**When to use:**
- Range sum/min/max with point updates when simplicity matters.
- Queries that are awkward to express on a segment tree.
- As a stepping stone to Mos algorithm.

**When not to use:**
- When $O(\\log n)$ per query is required at large scale — prefer a segment tree or Fenwick tree.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-square-root-decomposition-py',
        topic_id: 'ext-square-root-decomposition',
        language: 'python',
        code: `import math

class SqrtDecomposition:
    def __init__(self, data):
        self.a = list(data)
        self.n = len(data)
        self.b = int(math.isqrt(self.n)) + 1
        self.blocks = [0] * (self.n // self.b + 1)
        for i in range(self.n):
            self.blocks[i // self.b] += self.a[i]

    def update(self, i, val):
        self.blocks[i // self.b] += val - self.a[i]
        self.a[i] = val

    def query(self, l, r):
        total = 0
        while l <= r and l % self.b != 0:
            total += self.a[l]
            l += 1
        while l + self.b - 1 <= r:
            total += self.blocks[l // self.b]
            l += self.b
        while l <= r:
            total += self.a[l]
            l += 1
        return total`,
        explanation: 'Range-sum with point updates: partial ends are summed element-wise, full blocks use precomputed block sums.',
        is_optimized: true,
      },
      {
        id: 'snip-square-root-decomposition-js',
        topic_id: 'ext-square-root-decomposition',
        language: 'javascript',
        code: `class SqrtDecomposition {
  constructor(data) {
    this.a = data.slice();
    this.n = data.length;
    this.b = Math.floor(Math.sqrt(this.n)) + 1;
    this.blocks = new Array(Math.floor(this.n / this.b) + 1).fill(0);
    for (let i = 0; i < this.n; i++) {
      this.blocks[Math.floor(i / this.b)] += this.a[i];
    }
  }

  update(i, val) {
    this.blocks[Math.floor(i / this.b)] += val - this.a[i];
    this.a[i] = val;
  }

  query(l, r) {
    let total = 0;
    while (l <= r && l % this.b !== 0) total += this.a[l++];
    while (l + this.b - 1 <= r) {
      total += this.blocks[Math.floor(l / this.b)];
      l += this.b;
    }
    while (l <= r) total += this.a[l++];
    return total;
  }
}`,
        explanation: 'Mirrors the three-phase query: left partial block, full blocks, right partial block.',
        is_optimized: true,
      },
      {
        id: 'snip-square-root-decomposition-cpp',
        topic_id: 'ext-square-root-decomposition',
        language: 'cpp',
        code: `#include <vector>
#include <cmath>
using namespace std;

struct SqrtDecomposition {
    vector<long long> a, blocks;
    int n, b;

    SqrtDecomposition(const vector<long long>& data) {
        a = data;
        n = data.size();
        b = (int)sqrt((double)n) + 1;
        blocks.assign(n / b + 1, 0);
        for (int i = 0; i < n; i++)
            blocks[i / b] += a[i];
    }

    void update(int i, long long val) {
        blocks[i / b] += val - a[i];
        a[i] = val;
    }

    long long query(int l, int r) {
        long long total = 0;
        while (l <= r && l % b != 0) total += a[l++];
        while (l + b - 1 <= r) { total += blocks[l / b]; l += b; }
        while (l <= r) total += a[l++];
        return total;
    }
};`,
        explanation: 'long long block sums prevent overflow; the block index of element i is simply i / b.',
        is_optimized: true,
      },
      {
        id: 'snip-square-root-decomposition-java',
        topic_id: 'ext-square-root-decomposition',
        language: 'java',
        code: `public class SqrtDecomposition {
    private final long[] a, blocks;
    private final int n, b;

    public SqrtDecomposition(long[] data) {
        a = data.clone();
        n = data.length;
        b = (int) Math.sqrt(n) + 1;
        blocks = new long[n / b + 1];
        for (int i = 0; i < n; i++)
            blocks[i / b] += a[i];
    }

    public void update(int i, long val) {
        blocks[i / b] += val - a[i];
        a[i] = val;
    }

    public long query(int l, int r) {
        long total = 0;
        while (l <= r && l % b != 0) total += a[l++];
        while (l + b - 1 <= r) { total += blocks[l / b]; l += b; }
        while (l <= r) total += a[l++];
        return total;
    }
}`,
        explanation: 'Clones the input to own its data; the update refreshes only the affected block aggregate in O(1).',
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-square-root-decomposition',
    quizTitle: 'Square Root Decomposition Quiz',
    quizDescription: 'Test your understanding of block-based range queries.',
    questions: [
      {
        id: 'q-square-root-decomposition-1',
        quiz_id: 'quiz-ext-square-root-decomposition',
        question_text: 'What is the per-query time complexity of square root decomposition?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(sqrt(n))', 'O(n)'],
        correct_option_index: 2,
        explanation: 'At most 2*sqrt(n) partial elements plus n/sqrt(n) = sqrt(n) full blocks are visited, giving O(sqrt(n)).',
      },
      {
        id: 'q-square-root-decomposition-2',
        quiz_id: 'quiz-ext-square-root-decomposition',
        question_text: 'Why is the block size chosen to be about sqrt(n)?',
        question_type: 'MCQ',
        options: ['It is the only size that fits in memory', 'It balances the number of blocks against the block size, both sqrt(n)', 'It guarantees O(1) queries', 'It avoids recursion'],
        correct_option_index: 1,
        explanation: 'With block size sqrt(n), both the count of blocks and the elements per block are sqrt(n), minimizing their sum.',
      },
      {
        id: 'q-square-root-decomposition-3',
        quiz_id: 'quiz-ext-square-root-decomposition',
        question_text: 'A segment tree answers range queries faster asymptotically than square root decomposition.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'A segment tree gives O(log n) per query versus O(sqrt(n)); sqrt decomposition trades speed for simplicity.',
      },
    ],
  },
  // MO'S ALGORITHM
  {
    topic: {
      id: 'ext-mos-algorithm',
      slug: 'mos-algorithm',
      category_id: CATEGORY_IDS.patterns,
      title: "Mo's Algorithm",
      definition: "Mo's algorithm answers many offline range queries efficiently by reordering them and moving two pointers to incrementally add or remove elements between consecutive queries.",
      importance: 'It reduces the cost of answering Q range queries on a static array from naive re-computation to roughly $O((N + Q)\\sqrt{N})$, which is decisive in competitive programming.',
      prerequisites: ['square-root-decomposition', 'sorting'],
      difficulty: 'Advanced',
      time_complexity_best: 'O((N + Q) sqrt(N))',
      time_complexity_average: 'O((N + Q) sqrt(N))',
      time_complexity_worst: 'O((N + Q) sqrt(N))',
      space_complexity: 'O(N + Q)',
      display_order: 613,
    },
    sections: [
      {
        id: 'sec-mos-algorithm-1',
        topic_id: 'ext-mos-algorithm',
        title: 'Concept & Intuition',
        content: `Suppose you are given a static array and $Q$ queries, each asking something about a subrange $[L, R]$ — for example, the number of distinct values. Answering each query from scratch is $O(N)$ each, or $O(N \\cdot Q)$ total, which is too slow.

**Mo's algorithm** is an *offline* technique: it reads all queries first, then answers them in a cleverly chosen order so that moving from one query's range to the next requires only a few element additions/removals rather than a full recomputation.

> [!NOTE]
> "Offline" means all queries are known in advance. Mo's algorithm cannot be used if a query depends on the answer to a previous one, or if the array is updated between queries.`,
        display_order: 1,
      },
      {
        id: 'sec-mos-algorithm-2',
        topic_id: 'ext-mos-algorithm',
        title: 'How It Works',
        content: `Maintain a current window $[curL, curR]$ and two operations, \`add(i)\` and \`remove(i)\`, that update a running answer when an index enters or leaves the window.

Queries are sorted by a special key: group by the block of $L$ (block size $\\approx \\sqrt{N}$), and within a block sort by $R$. Then process queries in that order, sliding \`curL\` and \`curR\` toward each query's $[L, R]$.

$$\\text{sort key} = \\left(\\left\\lfloor \\frac{L}{\\sqrt{N}} \\right\\rfloor,\\; R\\right)$$

Because $R$ is monotonic within each block, the right pointer sweeps forward efficiently across all queries in that block.`,
        display_order: 2,
      },
      {
        id: 'sec-mos-algorithm-3',
        topic_id: 'ext-mos-algorithm',
        title: 'Complexity Analysis',
        content: `With block size $\\sqrt{N}$:

- The **left pointer** moves at most $O(\\sqrt{N})$ per query, since within a block $L$ stays in a window of width $\\sqrt{N}$: total $O(Q\\sqrt{N})$.
- The **right pointer** moves monotonically within each block, at most $O(N)$ per block over $\\sqrt{N}$ blocks: total $O(N\\sqrt{N})$.

Combined, the total is $O((N + Q)\\sqrt{N})$, assuming \`add\`/\`remove\` are $O(1)$. If those operations cost $O(f)$, multiply accordingly.`,
        display_order: 3,
      },
      {
        id: 'sec-mos-algorithm-4',
        topic_id: 'ext-mos-algorithm',
        title: 'Pitfalls & Use Cases',
        content: `Mo's algorithm shines for range-distinct-count, range-mode, and range frequency problems where no simple prefix-sum trick exists.

> [!WARNING]
> The order of pointer updates matters. Always **expand before you shrink** (add new elements before removing old ones) to avoid the window momentarily having $curR < curL$, which can corrupt the running answer.

A common optimization is the *Hilbert curve* ordering, which reduces pointer movement further and improves constant factors on large inputs.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-mos-algorithm-py',
        topic_id: 'ext-mos-algorithm',
        language: 'python',
        code: `import math

def mos_distinct(arr, queries):
    n = len(arr)
    block = max(1, int(math.sqrt(n)))
    order = sorted(range(len(queries)),
                   key=lambda i: (queries[i][0] // block, queries[i][1]))
    freq = {}
    cur_l, cur_r, distinct = 0, -1, 0
    ans = [0] * len(queries)

    def add(x):
        nonlocal distinct
        freq[x] = freq.get(x, 0) + 1
        if freq[x] == 1:
            distinct += 1

    def remove(x):
        nonlocal distinct
        freq[x] -= 1
        if freq[x] == 0:
            distinct -= 1

    for idx in order:
        l, r = queries[idx]
        while cur_r < r:
            cur_r += 1; add(arr[cur_r])
        while cur_l > l:
            cur_l -= 1; add(arr[cur_l])
        while cur_r > r:
            remove(arr[cur_r]); cur_r -= 1
        while cur_l < l:
            remove(arr[cur_l]); cur_l += 1
        ans[idx] = distinct
    return ans`,
        explanation: "Answers offline range-distinct-count queries by sorting queries into sqrt(n) blocks and sliding two pointers.",
        is_optimized: true,
      },
      {
        id: 'snip-mos-algorithm-js',
        topic_id: 'ext-mos-algorithm',
        language: 'javascript',
        code: `function mosDistinct(arr, queries) {
  const n = arr.length;
  const block = Math.max(1, Math.floor(Math.sqrt(n)));
  const order = queries.map((_, i) => i).sort((a, b) => {
    const ba = Math.floor(queries[a][0] / block);
    const bb = Math.floor(queries[b][0] / block);
    return ba !== bb ? ba - bb : queries[a][1] - queries[b][1];
  });
  const freq = new Map();
  let curL = 0, curR = -1, distinct = 0;
  const ans = new Array(queries.length).fill(0);
  const add = (x) => {
    const f = (freq.get(x) || 0) + 1;
    freq.set(x, f);
    if (f === 1) distinct++;
  };
  const remove = (x) => {
    const f = freq.get(x) - 1;
    freq.set(x, f);
    if (f === 0) distinct--;
  };
  for (const idx of order) {
    const [l, r] = queries[idx];
    while (curR < r) add(arr[++curR]);
    while (curL > l) add(arr[--curL]);
    while (curR > r) remove(arr[curR--]);
    while (curL < l) remove(arr[curL++]);
    ans[idx] = distinct;
  }
  return ans;
}`,
        explanation: "Same offline distinct-count strategy in JavaScript, expanding the window before shrinking it.",
        is_optimized: true,
      },
      {
        id: 'snip-mos-algorithm-cpp',
        topic_id: 'ext-mos-algorithm',
        language: 'cpp',
        code: `#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

struct Query { int l, r, idx; };

vector<int> mosDistinct(const vector<int>& arr, vector<Query> q, int maxVal) {
    int n = arr.size();
    int block = max(1, (int)sqrt((double)n));
    sort(q.begin(), q.end(), [&](const Query& a, const Query& b) {
        if (a.l / block != b.l / block) return a.l / block < b.l / block;
        return a.r < b.r;
    });
    vector<int> freq(maxVal + 1, 0), ans(q.size());
    int curL = 0, curR = -1, distinct = 0;
    auto add = [&](int x){ if (++freq[x] == 1) distinct++; };
    auto remove = [&](int x){ if (--freq[x] == 0) distinct--; };
    for (auto& query : q) {
        while (curR < query.r) add(arr[++curR]);
        while (curL > query.l) add(arr[--curL]);
        while (curR > query.r) remove(arr[curR--]);
        while (curL < query.l) remove(arr[curL++]);
        ans[query.idx] = distinct;
    }
    return ans;
}`,
        explanation: "C++ Mo's algorithm using a frequency array; add/remove run in O(1).",
        is_optimized: true,
      },
      {
        id: 'snip-mos-algorithm-java',
        topic_id: 'ext-mos-algorithm',
        language: 'java',
        code: `import java.util.*;

public class Mo {
    public static int[] distinct(int[] arr, int[][] queries, int maxVal) {
        int n = arr.length;
        int block = Math.max(1, (int) Math.sqrt(n));
        Integer[] order = new Integer[queries.length];
        for (int i = 0; i < order.length; i++) order[i] = i;
        Arrays.sort(order, (a, b) -> {
            int ba = queries[a][0] / block, bb = queries[b][0] / block;
            return ba != bb ? ba - bb : queries[a][1] - queries[b][1];
        });
        int[] freq = new int[maxVal + 1];
        int[] ans = new int[queries.length];
        int curL = 0, curR = -1, distinct = 0;
        for (int idx : order) {
            int l = queries[idx][0], r = queries[idx][1];
            while (curR < r) { if (++freq[arr[++curR]] == 1) distinct++; }
            while (curL > l) { if (++freq[arr[--curL]] == 1) distinct++; }
            while (curR > r) { if (--freq[arr[curR--]] == 0) distinct--; }
            while (curL < l) { if (--freq[arr[curL++]] == 0) distinct--; }
            ans[idx] = distinct;
        }
        return ans;
    }
}`,
        explanation: "Java Mo's algorithm answering range-distinct queries with an integer frequency table.",
        is_optimized: true,
      },
    ],
    quizId: 'quiz-ext-mos-algorithm',
    quizTitle: "Mo's Algorithm Quiz",
    quizDescription: "Test your understanding of offline query reordering with Mo's algorithm.",
    questions: [
      {
        id: 'q-mos-algorithm-1',
        quiz_id: 'quiz-ext-mos-algorithm',
        question_text: "What is the overall time complexity of Mo's algorithm for Q queries on an array of size N with O(1) add/remove?",
        question_type: 'COMPLEXITY',
        options: ['O(N + Q)', 'O((N + Q) sqrt(N))', 'O(N log N + Q log Q)', 'O(N * Q)'],
        correct_option_index: 1,
        explanation: 'The left pointer contributes O(Q sqrt(N)) and the right pointer O(N sqrt(N)), giving O((N + Q) sqrt(N)) overall.',
      },
      {
        id: 'q-mos-algorithm-2',
        quiz_id: 'quiz-ext-mos-algorithm',
        question_text: "Mo's algorithm can be used when queries must be answered online (each before the next arrives).",
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: "Mo's algorithm is inherently offline: it must know and reorder all queries in advance, so it cannot serve online queries.",
      },
      {
        id: 'q-mos-algorithm-3',
        quiz_id: 'quiz-ext-mos-algorithm',
        question_text: 'Queries are sorted primarily by which key in the standard version?',
        question_type: 'MCQ',
        options: ['The value at index L', 'The block index of L (L / sqrt(N))', 'The length R - L', 'The query index'],
        correct_option_index: 1,
        explanation: 'Queries are grouped by the block of their left endpoint, then sorted by R within each block, bounding pointer movement.',
      },
    ],
  },
];
