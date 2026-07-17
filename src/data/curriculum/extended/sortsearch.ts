import { CurriculumModule } from '@/types';
import { CATEGORY_IDS } from '../linear';

export const sortSearchModules: CurriculumModule[] = [
  // 1. LINEAR SEARCH
  {
    topic: {
      id: 'ext-linear-search',
      slug: 'linear-search',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Linear Search',
      definition: 'Linear search scans a collection sequentially from the first element to the last, comparing each element against the target until a match is found or the collection is exhausted.',
      importance: 'It is the simplest search algorithm and the only viable option for unsorted data or data structures that lack random access, such as linked lists.',
      prerequisites: ['array'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(N)',
      time_complexity_worst: 'O(N)',
      space_complexity: 'O(1)',
      display_order: 500,
    },
    sections: [
      {
        id: 'sec-linear-search-1',
        topic_id: 'ext-linear-search',
        title: 'Concept & Intuition',
        content: `Imagine flipping through a deck of cards one at a time, looking for the ace of spades. You have no shortcut: you check the first card, then the next, and so on until you find it or run out of cards. That is **linear search**.

Because it makes no assumptions about the ordering of the data, linear search works on *any* sequence. The trade-off is speed: in the worst case you inspect every element.

> [!NOTE]
> Linear search is the fallback whenever data is unsorted or you cannot jump to arbitrary positions.`,
        display_order: 1,
      },
      {
        id: 'sec-linear-search-2',
        topic_id: 'ext-linear-search',
        title: 'How It Works',
        content: `The mechanics are a single loop:
1. Start at index $0$.
2. Compare the current element with the target.
3. If they match, return the index.
4. Otherwise advance to the next element.
5. If the loop ends without a match, report failure (often $-1$).

Each comparison is independent, so the algorithm needs no preprocessing and no extra memory beyond a loop counter.`,
        display_order: 2,
      },
      {
        id: 'sec-linear-search-3',
        topic_id: 'ext-linear-search',
        title: 'Complexity Analysis',
        content: `Let $n$ be the number of elements.

- **Best case:** the target is first — $O(1)$.
- **Average case:** on a uniform hit, roughly $n/2$ comparisons — $O(n)$.
- **Worst case:** the target is last or absent — $O(n)$.
- **Space:** only a counter — $O(1)$.

The expected number of comparisons for a successful search is $\\frac{n+1}{2}$, confirming the linear growth.`,
        display_order: 3,
      },
      {
        id: 'sec-linear-search-4',
        topic_id: 'ext-linear-search',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Do not use linear search on large sorted arrays — binary search gives $O(\\log n)$ instead.

Good fits:
- Small collections where setup cost of sorting is not worth it.
- Unsorted data with a one-off lookup.
- Linked lists and streams that lack random access.

Common mistake: forgetting to return a sentinel value (like $-1$) when the element is absent, leading to false positives.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-linear-search-py',
        topic_id: 'ext-linear-search',
        language: 'python',
        is_optimized: true,
        code: `def linear_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1`,
        explanation: 'Scans each element once, returning the first matching index or -1 if absent.',
      },
      {
        id: 'snip-linear-search-js',
        topic_id: 'ext-linear-search',
        language: 'javascript',
        is_optimized: true,
        code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
        explanation: 'Uses strict equality and returns the index on the first match.',
      },
      {
        id: 'snip-linear-search-cpp',
        topic_id: 'ext-linear-search',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>

int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < (int)arr.size(); ++i) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
        explanation: 'A single pass over the vector; returns -1 when the target is not present.',
      },
      {
        id: 'snip-linear-search-java',
        topic_id: 'ext-linear-search',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }
}`,
        explanation: 'Iterates the array once and returns the matching index or -1.',
      },
    ],
    quizId: 'quiz-ext-linear-search',
    quizTitle: 'Linear Search Quiz',
    quizDescription: 'Check your understanding of sequential search and its complexity.',
    questions: [
      {
        id: 'q-linear-search-1',
        quiz_id: 'quiz-ext-linear-search',
        question_text: 'What is the worst-case time complexity of linear search on an array of n elements?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correct_option_index: 2,
        explanation: 'In the worst case the target is last or missing, requiring n comparisons.',
      },
      {
        id: 'q-linear-search-2',
        quiz_id: 'quiz-ext-linear-search',
        question_text: 'Linear search requires the input data to be sorted.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Linear search works on unsorted data; it makes no ordering assumptions.',
      },
      {
        id: 'q-linear-search-3',
        quiz_id: 'quiz-ext-linear-search',
        question_text: 'Which scenario is the best fit for linear search over binary search?',
        question_type: 'MCQ',
        options: ['A large sorted array', 'An unsorted linked list', 'A sorted array of a million items', 'A balanced binary search tree'],
        correct_option_index: 1,
        explanation: 'Linked lists lack random access and are often unsorted, making linear search the natural choice.',
      },
    ],
  },
  // 2. SELECTION SORT
  {
    topic: {
      id: 'ext-selection-sort',
      slug: 'selection-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Selection Sort',
      definition: 'Selection sort repeatedly finds the minimum element from the unsorted portion of the array and swaps it into its correct position at the boundary of the sorted portion.',
      importance: 'It is easy to understand and performs the minimum possible number of swaps (at most n-1), making it useful when writes are expensive.',
      prerequisites: ['array'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(N^2)',
      time_complexity_average: 'O(N^2)',
      time_complexity_worst: 'O(N^2)',
      space_complexity: 'O(1)',
      display_order: 501,
    },
    sections: [
      {
        id: 'sec-selection-sort-1',
        topic_id: 'ext-selection-sort',
        title: 'Concept & Intuition',
        content: `Picture sorting a hand of cards by repeatedly picking the smallest remaining card and placing it at the front of the sorted pile. Selection sort formalizes this: the array is split into a growing **sorted** prefix and a shrinking **unsorted** suffix.

On every pass it selects the smallest value in the unsorted suffix and swaps it to the front of that suffix.

> [!NOTE]
> Selection sort minimizes the number of swaps — it never performs more than $n-1$ of them.`,
        display_order: 1,
      },
      {
        id: 'sec-selection-sort-2',
        topic_id: 'ext-selection-sort',
        title: 'How It Works',
        content: `For an array of length $n$:
1. Set the boundary $i$ from $0$ to $n-2$.
2. Scan the suffix $[i, n)$ to find the index of the minimum element.
3. Swap that minimum into position $i$.
4. The prefix $[0, i]$ is now sorted; advance $i$.

Each outer step locks one more element permanently into place.`,
        display_order: 2,
      },
      {
        id: 'sec-selection-sort-3',
        topic_id: 'ext-selection-sort',
        title: 'Complexity Analysis',
        content: `The inner scan performs $n-1, n-2, \\ldots, 1$ comparisons, summing to $\\frac{n(n-1)}{2}$ — always $O(n^2)$ regardless of input order.

- **Time:** $O(n^2)$ best, average, and worst — the comparison count is input-independent.
- **Swaps:** at most $n-1$, i.e. $O(n)$.
- **Space:** $O(1)$ auxiliary (in-place).

Because the comparison count never drops, selection sort has no fast path for already-sorted data.`,
        display_order: 3,
      },
      {
        id: 'sec-selection-sort-4',
        topic_id: 'ext-selection-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The standard implementation is **not stable** — equal elements can be reordered by the long-distance swap.

Good fits:
- Small arrays where simplicity matters.
- Situations where writing to memory is far costlier than reading, since swaps are minimized.

Avoid it for large datasets; $O(n^2)$ comparisons dominate. For most real workloads, use $O(n \\log n)$ sorts instead.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-selection-sort-py',
        topic_id: 'ext-selection-sort',
        language: 'python',
        is_optimized: true,
        code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
        explanation: 'Finds the minimum of each suffix and swaps it to the boundary, sorting in place.',
      },
      {
        id: 'snip-selection-sort-js',
        topic_id: 'ext-selection-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
        explanation: 'Uses destructuring to swap the minimum of each unsorted suffix into place.',
      },
      {
        id: 'snip-selection-sort-cpp',
        topic_id: 'ext-selection-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <utility>

void selectionSort(std::vector<int>& arr) {
    int n = (int)arr.size();
    for (int i = 0; i < n - 1; ++i) {
        int minIdx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        std::swap(arr[i], arr[minIdx]);
    }
}`,
        explanation: 'Selects the minimum in each pass and swaps it forward using std::swap.',
      },
      {
        id: 'snip-selection-sort-java',
        topic_id: 'ext-selection-sort',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int tmp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = tmp;
        }
    }
}`,
        explanation: 'Classic in-place selection sort using a temporary variable for the swap.',
      },
    ],
    quizId: 'quiz-ext-selection-sort',
    quizTitle: 'Selection Sort Quiz',
    quizDescription: 'Test your grasp of selection sort mechanics, stability, and complexity.',
    questions: [
      {
        id: 'q-selection-sort-1',
        quiz_id: 'quiz-ext-selection-sort',
        question_text: 'What is the time complexity of selection sort in the best case?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correct_option_index: 2,
        explanation: 'The comparison count is input-independent, so even sorted input costs O(n^2).',
      },
      {
        id: 'q-selection-sort-2',
        quiz_id: 'quiz-ext-selection-sort',
        question_text: 'The standard selection sort is a stable sorting algorithm.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Long-distance swaps can reorder equal elements, so it is not stable by default.',
      },
      {
        id: 'q-selection-sort-3',
        quiz_id: 'quiz-ext-selection-sort',
        question_text: 'What is the maximum number of swaps selection sort performs on an array of n elements?',
        question_type: 'MCQ',
        options: ['n^2', 'n log n', 'n - 1', 'n / 2'],
        correct_option_index: 2,
        explanation: 'Each outer iteration performs at most one swap, giving at most n-1 swaps total.',
      },
    ],
  },
  // 3. INSERTION SORT
  {
    topic: {
      id: 'ext-insertion-sort',
      slug: 'insertion-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Insertion Sort',
      definition: 'Insertion sort builds the sorted array one element at a time by taking each new element and inserting it into its correct position among the already-sorted elements.',
      importance: 'It is efficient for small or nearly-sorted inputs, is stable and in-place, and is the algorithm many libraries switch to for tiny subarrays.',
      prerequisites: ['array'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(N)',
      time_complexity_average: 'O(N^2)',
      time_complexity_worst: 'O(N^2)',
      space_complexity: 'O(1)',
      display_order: 502,
    },
    sections: [
      {
        id: 'sec-insertion-sort-1',
        topic_id: 'ext-insertion-sort',
        title: 'Concept & Intuition',
        content: `This is exactly how most people sort a hand of playing cards. You keep a sorted group on the left and pick up cards one at a time from the right, sliding each new card leftward until it sits in the right spot.

The array is split into a sorted prefix and an unsorted suffix. Each step extends the sorted prefix by one element.

> [!NOTE]
> On nearly-sorted data, elements barely move, so insertion sort approaches $O(n)$.`,
        display_order: 1,
      },
      {
        id: 'sec-insertion-sort-2',
        topic_id: 'ext-insertion-sort',
        title: 'How It Works',
        content: `For $i$ from $1$ to $n-1$:
1. Store the current element as \`key\`.
2. Compare \`key\` with elements to its left.
3. Shift every element greater than \`key\` one slot to the right.
4. Drop \`key\` into the gap that opens up.

The shifting, rather than swapping, is what keeps it efficient and stable.`,
        display_order: 2,
      },
      {
        id: 'sec-insertion-sort-3',
        topic_id: 'ext-insertion-sort',
        title: 'Complexity Analysis',
        content: `- **Best case:** already sorted — each key stops immediately — $O(n)$.
- **Average case:** each key moves halfway back — $O(n^2)$.
- **Worst case:** reverse sorted — every key shifts to the front — $O(n^2)$.
- **Space:** $O(1)$ auxiliary.

The number of shifts equals the number of **inversions** in the array, so fewer inversions means faster sorting.`,
        display_order: 3,
      },
      {
        id: 'sec-insertion-sort-4',
        topic_id: 'ext-insertion-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!TIP]
> Insertion sort is **stable** and **adaptive**, which is why hybrid sorts like Timsort use it for small runs.

Good fits:
- Small arrays (typically fewer than ~16 elements).
- Nearly-sorted or streaming data.

Pitfall: using strict greater-than versus greater-than-or-equal affects stability — use \`>\` (shift only strictly greater elements) to preserve the original order of equal keys.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-insertion-sort-py',
        topic_id: 'ext-insertion-sort',
        language: 'python',
        is_optimized: true,
        code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
        explanation: 'Shifts larger elements right and inserts each key into its sorted position.',
      },
      {
        id: 'snip-insertion-sort-js',
        topic_id: 'ext-insertion-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
        explanation: 'Classic stable insertion sort that shifts elements rather than swapping.',
      },
      {
        id: 'snip-insertion-sort-cpp',
        topic_id: 'ext-insertion-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>

void insertionSort(std::vector<int>& arr) {
    for (int i = 1; i < (int)arr.size(); ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}`,
        explanation: 'In-place insertion sort over a vector using the shift-and-insert pattern.',
      },
      {
        id: 'snip-insertion-sort-java',
        topic_id: 'ext-insertion-sort',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`,
        explanation: 'Stable, adaptive insertion sort shifting greater elements to the right.',
      },
    ],
    quizId: 'quiz-ext-insertion-sort',
    quizTitle: 'Insertion Sort Quiz',
    quizDescription: 'Assess your understanding of insertion sort behavior and adaptivity.',
    questions: [
      {
        id: 'q-insertion-sort-1',
        quiz_id: 'quiz-ext-insertion-sort',
        question_text: 'What is the best-case time complexity of insertion sort?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'],
        correct_option_index: 0,
        explanation: 'On already-sorted input each key stops immediately, giving a linear pass.',
      },
      {
        id: 'q-insertion-sort-2',
        quiz_id: 'quiz-ext-insertion-sort',
        question_text: 'Insertion sort is a stable sorting algorithm.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'By shifting only strictly greater elements, equal keys keep their relative order.',
      },
      {
        id: 'q-insertion-sort-3',
        quiz_id: 'quiz-ext-insertion-sort',
        question_text: 'The total number of shifts insertion sort performs equals which quantity?',
        question_type: 'MCQ',
        options: ['The number of distinct values', 'The number of inversions in the array', 'The array length squared', 'The number of swaps in bubble sort divided by two'],
        correct_option_index: 1,
        explanation: 'Each shift resolves one inversion, so total shifts equal the inversion count.',
      },
    ],
  },
  // 4. QUICK SORT (HOARE PARTITION)
  {
    topic: {
      id: 'ext-quick-sort-hoare',
      slug: 'quick-sort-hoare',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Quick Sort (Hoare Partition)',
      definition: 'Quick sort is a divide-and-conquer algorithm that partitions the array around a pivot so smaller elements go left and larger go right, then recursively sorts each side; the Hoare scheme partitions with two pointers converging from both ends.',
      importance: 'Quick sort is one of the fastest general-purpose in-memory sorts in practice, and the Hoare partition performs fewer swaps than the Lomuto scheme.',
      prerequisites: ['array', 'recursion'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(N log N)',
      time_complexity_average: 'O(N log N)',
      time_complexity_worst: 'O(N^2)',
      space_complexity: 'O(log N)',
      display_order: 503,
    },
    sections: [
      {
        id: 'sec-quick-sort-hoare-1',
        topic_id: 'ext-quick-sort-hoare',
        title: 'Concept & Intuition',
        content: `Quick sort picks a **pivot** and rearranges the array so everything smaller sits on one side and everything larger on the other. Then it recursively applies the same idea to each side.

The **Hoare partition scheme** uses two pointers that start at opposite ends and move toward each other, swapping out-of-place pairs until they cross.

> [!NOTE]
> Hoare's original scheme does three times fewer swaps on average than the more commonly taught Lomuto scheme.`,
        display_order: 1,
      },
      {
        id: 'sec-quick-sort-hoare-2',
        topic_id: 'ext-quick-sort-hoare',
        title: 'How It Works',
        content: `Hoare partition on subarray $[lo, hi]$ with pivot $=$ arr$[lo]$:
1. Set $i = lo - 1$ and $j = hi + 1$.
2. Increment $i$ until arr$[i] \\ge$ pivot.
3. Decrement $j$ until arr$[j] \\le$ pivot.
4. If $i \\ge j$, return $j$ as the split point.
5. Otherwise swap arr$[i]$ and arr$[j]$ and repeat.

Recurse on $[lo, j]$ and $[j+1, hi]$. Note the split includes $j$ on the left side, which differs from Lomuto.`,
        display_order: 2,
      },
      {
        id: 'sec-quick-sort-hoare-3',
        topic_id: 'ext-quick-sort-hoare',
        title: 'Complexity Analysis',
        content: `- **Best/Average case:** balanced partitions give the recurrence $T(n) = 2T(n/2) + O(n) = O(n \\log n)$.
- **Worst case:** already-sorted input with a poor pivot yields $O(n^2)$.
- **Space:** $O(\\log n)$ average for the recursion stack, $O(n)$ in the degenerate case.

Randomizing or using median-of-three pivots makes the worst case astronomically unlikely.`,
        display_order: 3,
      },
      {
        id: 'sec-quick-sort-hoare-4',
        topic_id: 'ext-quick-sort-hoare',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> With the Hoare scheme, the pivot is **not** guaranteed to land in its final position, so recurse on $[lo, j]$ and $[j+1, hi]$ — using $[lo, j-1]$ is a classic off-by-one bug.

Good fits:
- General-purpose in-memory sorting where average speed matters.

Watch out for stack overflow on adversarial input; recurse into the smaller side first and loop on the larger to bound stack depth. Quick sort is **not stable**.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-quick-sort-hoare-py',
        topic_id: 'ext-quick-sort-hoare',
        language: 'python',
        is_optimized: true,
        code: `def quick_sort(arr, lo=0, hi=None):
    if hi is None:
        hi = len(arr) - 1
    if lo < hi:
        p = _hoare_partition(arr, lo, hi)
        quick_sort(arr, lo, p)
        quick_sort(arr, p + 1, hi)
    return arr

def _hoare_partition(arr, lo, hi):
    pivot = arr[lo]
    i, j = lo - 1, hi + 1
    while True:
        i += 1
        while arr[i] < pivot:
            i += 1
        j -= 1
        while arr[j] > pivot:
            j -= 1
        if i >= j:
            return j
        arr[i], arr[j] = arr[j], arr[i]`,
        explanation: 'Hoare partition with converging pointers; recurses on [lo, p] and [p+1, hi].',
      },
      {
        id: 'snip-quick-sort-hoare-js',
        topic_id: 'ext-quick-sort-hoare',
        language: 'javascript',
        is_optimized: true,
        code: `function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const p = hoarePartition(arr, lo, hi);
    quickSort(arr, lo, p);
    quickSort(arr, p + 1, hi);
  }
  return arr;
}

function hoarePartition(arr, lo, hi) {
  const pivot = arr[lo];
  let i = lo - 1, j = hi + 1;
  while (true) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);
    if (i >= j) return j;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}`,
        explanation: 'Uses do-while loops to advance pointers and returns the Hoare split index j.',
      },
      {
        id: 'snip-quick-sort-hoare-cpp',
        topic_id: 'ext-quick-sort-hoare',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <utility>

int hoarePartition(std::vector<int>& arr, int lo, int hi) {
    int pivot = arr[lo];
    int i = lo - 1, j = hi + 1;
    while (true) {
        do { ++i; } while (arr[i] < pivot);
        do { --j; } while (arr[j] > pivot);
        if (i >= j) return j;
        std::swap(arr[i], arr[j]);
    }
}

void quickSort(std::vector<int>& arr, int lo, int hi) {
    if (lo < hi) {
        int p = hoarePartition(arr, lo, hi);
        quickSort(arr, lo, p);
        quickSort(arr, p + 1, hi);
    }
}`,
        explanation: 'C++ Hoare partition and recursive quick sort using std::swap.',
      },
      {
        id: 'snip-quick-sort-hoare-java',
        topic_id: 'ext-quick-sort-hoare',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    void quickSort(int[] arr, int lo, int hi) {
        if (lo < hi) {
            int p = hoarePartition(arr, lo, hi);
            quickSort(arr, lo, p);
            quickSort(arr, p + 1, hi);
        }
    }

    int hoarePartition(int[] arr, int lo, int hi) {
        int pivot = arr[lo];
        int i = lo - 1, j = hi + 1;
        while (true) {
            do { i++; } while (arr[i] < pivot);
            do { j--; } while (arr[j] > pivot);
            if (i >= j) return j;
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
}`,
        explanation: 'Java implementation of Hoare-partition quick sort with an explicit swap.',
      },
    ],
    quizId: 'quiz-ext-quick-sort-hoare',
    quizTitle: 'Quick Sort (Hoare) Quiz',
    quizDescription: 'Test your knowledge of quick sort and the Hoare partition scheme.',
    questions: [
      {
        id: 'q-quick-sort-hoare-1',
        quiz_id: 'quiz-ext-quick-sort-hoare',
        question_text: 'What is the worst-case time complexity of quick sort?',
        question_type: 'COMPLEXITY',
        options: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(log n)'],
        correct_option_index: 2,
        explanation: 'Consistently unbalanced partitions (e.g. sorted input, bad pivot) degrade to O(n^2).',
      },
      {
        id: 'q-quick-sort-hoare-2',
        quiz_id: 'quiz-ext-quick-sort-hoare',
        question_text: 'In the Hoare partition scheme, the pivot always ends up in its final sorted position after partitioning.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Unlike Lomuto, Hoare returns a split index and the pivot may not be in its final spot.',
      },
      {
        id: 'q-quick-sort-hoare-3',
        quiz_id: 'quiz-ext-quick-sort-hoare',
        question_text: 'Which technique most effectively avoids the worst-case behavior of quick sort?',
        question_type: 'MCQ',
        options: ['Always choosing the first element as pivot', 'Randomized or median-of-three pivot selection', 'Switching to bubble sort', 'Doubling the array size'],
        correct_option_index: 1,
        explanation: 'Randomized or median-of-three pivots make consistently bad partitions extremely unlikely.',
      },
    ],
  },
  // 5. HEAP SORT
  {
    topic: {
      id: 'ext-heap-sort',
      slug: 'heap-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Heap Sort',
      definition: 'Heap sort builds a binary max-heap from the array, then repeatedly swaps the root (maximum) to the end and restores the heap property on the shrinking remainder.',
      importance: 'It guarantees O(n log n) worst-case time with O(1) extra space, making it valuable when predictable performance and low memory are required.',
      prerequisites: ['array', 'binary-heap'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(N log N)',
      time_complexity_average: 'O(N log N)',
      time_complexity_worst: 'O(N log N)',
      space_complexity: 'O(1)',
      display_order: 504,
    },
    sections: [
      {
        id: 'sec-heap-sort-1',
        topic_id: 'ext-heap-sort',
        title: 'Concept & Intuition',
        content: `Heap sort turns the array into a **binary max-heap**, a complete binary tree where every parent is at least as large as its children. The largest value therefore sits at the root.

Repeatedly moving the root to the back and re-heapifying is like plucking the biggest item off a self-organizing pile until nothing remains.

> [!NOTE]
> The heap lives inside the same array — no auxiliary tree structure is needed.`,
        display_order: 1,
      },
      {
        id: 'sec-heap-sort-2',
        topic_id: 'ext-heap-sort',
        title: 'How It Works',
        content: `Using $0$-based indexing, node $i$ has children at $2i+1$ and $2i+2$.

1. **Build heap:** call \`sift-down\` on every internal node from $\\lfloor n/2 \\rfloor - 1$ down to $0$.
2. **Sort:** swap arr$[0]$ with arr$[end]$, shrink the heap by one, and \`sift-down\` the new root.
3. Repeat until the heap size is $1$.

\`sift-down\` pushes a too-small parent downward past its larger child until the heap property holds.`,
        display_order: 2,
      },
      {
        id: 'sec-heap-sort-3',
        topic_id: 'ext-heap-sort',
        title: 'Complexity Analysis',
        content: `- **Build heap:** $O(n)$ via the bottom-up construction (a tighter bound than the naive $O(n \\log n)$).
- **Extraction phase:** $n$ sift-downs each costing $O(\\log n)$, giving $O(n \\log n)$.
- **Overall:** $O(n \\log n)$ in best, average, and worst cases.
- **Space:** $O(1)$ auxiliary — it sorts in place.

The consistent $O(n \\log n)$ bound is heap sort's headline feature.`,
        display_order: 3,
      },
      {
        id: 'sec-heap-sort-4',
        topic_id: 'ext-heap-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Heap sort is **not stable** and has poor cache locality due to its jumping access pattern, so it is often slower in practice than quick sort despite equal asymptotics.

Good fits:
- Memory-constrained systems needing guaranteed $O(n \\log n)$.
- Building priority queues (the heap itself is the payoff).

Common bug: computing child indices with $1$-based formulas while using a $0$-based array.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-heap-sort-py',
        topic_id: 'ext-heap-sort',
        language: 'python',
        is_optimized: true,
        code: `def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        _sift_down(arr, i, n)
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        _sift_down(arr, 0, end)
    return arr

def _sift_down(arr, i, size):
    while True:
        largest = i
        l, r = 2 * i + 1, 2 * i + 2
        if l < size and arr[l] > arr[largest]:
            largest = l
        if r < size and arr[r] > arr[largest]:
            largest = r
        if largest == i:
            return
        arr[i], arr[largest] = arr[largest], arr[i]
        i = largest`,
        explanation: 'Builds a max-heap bottom-up, then repeatedly extracts the max to the end.',
      },
      {
        id: 'snip-heap-sort-js',
        topic_id: 'ext-heap-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) siftDown(arr, i, n);
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    siftDown(arr, 0, end);
  }
  return arr;
}

function siftDown(arr, i, size) {
  while (true) {
    let largest = i;
    const l = 2 * i + 1, r = 2 * i + 2;
    if (l < size && arr[l] > arr[largest]) largest = l;
    if (r < size && arr[r] > arr[largest]) largest = r;
    if (largest === i) return;
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    i = largest;
  }
}`,
        explanation: 'In-place heap sort using a sift-down helper over the array-backed heap.',
      },
      {
        id: 'snip-heap-sort-cpp',
        topic_id: 'ext-heap-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <utility>

void siftDown(std::vector<int>& arr, int i, int size) {
    while (true) {
        int largest = i;
        int l = 2 * i + 1, r = 2 * i + 2;
        if (l < size && arr[l] > arr[largest]) largest = l;
        if (r < size && arr[r] > arr[largest]) largest = r;
        if (largest == i) return;
        std::swap(arr[i], arr[largest]);
        i = largest;
    }
}

void heapSort(std::vector<int>& arr) {
    int n = (int)arr.size();
    for (int i = n / 2 - 1; i >= 0; --i) siftDown(arr, i, n);
    for (int end = n - 1; end > 0; --end) {
        std::swap(arr[0], arr[end]);
        siftDown(arr, 0, end);
    }
}`,
        explanation: 'Classic in-place heap sort; build phase then repeated max extraction.',
      },
      {
        id: 'snip-heap-sort-java',
        topic_id: 'ext-heap-sort',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    void heapSort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) siftDown(arr, i, n);
        for (int end = n - 1; end > 0; end--) {
            int tmp = arr[0];
            arr[0] = arr[end];
            arr[end] = tmp;
            siftDown(arr, 0, end);
        }
    }

    void siftDown(int[] arr, int i, int size) {
        while (true) {
            int largest = i;
            int l = 2 * i + 1, r = 2 * i + 2;
            if (l < size && arr[l] > arr[largest]) largest = l;
            if (r < size && arr[r] > arr[largest]) largest = r;
            if (largest == i) return;
            int tmp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = tmp;
            i = largest;
        }
    }
}`,
        explanation: 'Java heap sort with an iterative sift-down to avoid recursion overhead.',
      },
    ],
    quizId: 'quiz-ext-heap-sort',
    quizTitle: 'Heap Sort Quiz',
    quizDescription: 'Evaluate your understanding of heapify, extraction, and heap sort complexity.',
    questions: [
      {
        id: 'q-heap-sort-1',
        quiz_id: 'quiz-ext-heap-sort',
        question_text: 'What is the worst-case time complexity of heap sort?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correct_option_index: 1,
        explanation: 'Every phase is bounded by O(n log n), and unlike quick sort there is no O(n^2) worst case.',
      },
      {
        id: 'q-heap-sort-2',
        quiz_id: 'quiz-ext-heap-sort',
        question_text: 'Building a binary heap from an unsorted array using bottom-up heapify takes O(n) time.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'A careful analysis shows the build-heap phase is O(n), not O(n log n).',
      },
      {
        id: 'q-heap-sort-3',
        quiz_id: 'quiz-ext-heap-sort',
        question_text: 'For a 0-indexed array-backed heap, the children of node i are at which indices?',
        question_type: 'MCQ',
        options: ['i-1 and i+1', '2i and 2i+1', '2i+1 and 2i+2', 'i/2 and i/2+1'],
        correct_option_index: 2,
        explanation: 'With 0-based indexing, node i has children at 2i+1 (left) and 2i+2 (right).',
      },
    ],
  },
  // 6. COUNTING SORT
  {
    topic: {
      id: 'ext-counting-sort',
      slug: 'counting-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Counting Sort',
      definition: 'Counting sort is a non-comparison integer sorting algorithm that counts the occurrences of each distinct key, then uses those counts to place elements directly into their sorted positions.',
      importance: 'It sorts integers in linear time when the range of keys is small, breaking the O(n log n) barrier that binds comparison sorts, and serves as the stable subroutine inside radix sort.',
      prerequisites: ['array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(N + K)',
      time_complexity_average: 'O(N + K)',
      time_complexity_worst: 'O(N + K)',
      space_complexity: 'O(N + K)',
      display_order: 505,
    },
    sections: [
      {
        id: 'sec-counting-sort-1',
        topic_id: 'ext-counting-sort',
        title: 'Concept & Intuition',
        content: `Instead of comparing elements, counting sort **tallies** them. Imagine sorting exam scores from $0$ to $100$: you make 101 bins, drop each score into its bin, then read the bins in order.

Because it never compares two elements, counting sort sidesteps the $O(n \\log n)$ lower bound that governs comparison-based sorting.

> [!NOTE]
> $K$ denotes the size of the key range. Counting sort shines only when $K$ is not much larger than $n$.`,
        display_order: 1,
      },
      {
        id: 'sec-counting-sort-2',
        topic_id: 'ext-counting-sort',
        title: 'How It Works',
        content: `For non-negative integers in $[0, K)$:
1. Create a count array of size $K$ and tally each input value.
2. Convert counts into **prefix sums** so each entry holds the number of elements $\\le$ that key.
3. Iterate the input **right to left**, placing each element at index count$[value] - 1$ in the output and decrementing that count.

Walking right to left while using prefix sums is what makes counting sort **stable**.`,
        display_order: 2,
      },
      {
        id: 'sec-counting-sort-3',
        topic_id: 'ext-counting-sort',
        title: 'Complexity Analysis',
        content: `- **Time:** $O(n + K)$ — one pass to count, one over the range, one to place.
- **Space:** $O(n + K)$ for the count and output arrays.

When $K = O(n)$, the total is $O(n)$ — genuinely linear. But if $K \\gg n$ (say sorting a handful of 32-bit integers), the $O(K)$ term dominates and the algorithm becomes wasteful.`,
        display_order: 3,
      },
      {
        id: 'sec-counting-sort-4',
        topic_id: 'ext-counting-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Counting sort only works on integers (or values mappable to a bounded integer range). It cannot sort arbitrary floats or strings directly.

Good fits:
- Sorting integers with a known small range (ages, grades, byte values).
- As the stable digit-sorting step within radix sort.

Pitfall: iterating left-to-right during placement destroys stability; always place from the right when using the prefix-sum form.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-counting-sort-py',
        topic_id: 'ext-counting-sort',
        language: 'python',
        is_optimized: true,
        code: `def counting_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for v in arr:
        count[v] += 1
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for v in reversed(arr):
        count[v] -= 1
        output[count[v]] = v
    return output`,
        explanation: 'Stable counting sort using prefix sums and right-to-left placement.',
      },
      {
        id: 'snip-counting-sort-js',
        topic_id: 'ext-counting-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function countingSort(arr) {
  if (arr.length === 0) return arr;
  const maxVal = Math.max(...arr);
  const count = new Array(maxVal + 1).fill(0);
  for (const v of arr) count[v]++;
  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];
  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    output[--count[arr[i]]] = arr[i];
  }
  return output;
}`,
        explanation: 'Builds prefix-sum counts, then places elements right-to-left for stability.',
      },
      {
        id: 'snip-counting-sort-cpp',
        topic_id: 'ext-counting-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>

std::vector<int> countingSort(const std::vector<int>& arr) {
    if (arr.empty()) return arr;
    int maxVal = *std::max_element(arr.begin(), arr.end());
    std::vector<int> count(maxVal + 1, 0);
    for (int v : arr) count[v]++;
    for (int i = 1; i <= maxVal; ++i) count[i] += count[i - 1];
    std::vector<int> output(arr.size());
    for (int i = (int)arr.size() - 1; i >= 0; --i) {
        output[--count[arr[i]]] = arr[i];
    }
    return output;
}`,
        explanation: 'Stable counting sort returning a new sorted vector via prefix sums.',
      },
      {
        id: 'snip-counting-sort-java',
        topic_id: 'ext-counting-sort',
        language: 'java',
        is_optimized: true,
        code: `import java.util.Arrays;

class Solution {
    int[] countingSort(int[] arr) {
        if (arr.length == 0) return arr;
        int maxVal = Arrays.stream(arr).max().getAsInt();
        int[] count = new int[maxVal + 1];
        for (int v : arr) count[v]++;
        for (int i = 1; i <= maxVal; i++) count[i] += count[i - 1];
        int[] output = new int[arr.length];
        for (int i = arr.length - 1; i >= 0; i--) {
            output[--count[arr[i]]] = arr[i];
        }
        return output;
    }
}`,
        explanation: 'Java counting sort with prefix sums; stable and linear in n + K.',
      },
    ],
    quizId: 'quiz-ext-counting-sort',
    quizTitle: 'Counting Sort Quiz',
    quizDescription: 'Test your understanding of non-comparison counting sort and its constraints.',
    questions: [
      {
        id: 'q-counting-sort-1',
        quiz_id: 'quiz-ext-counting-sort',
        question_text: 'What is the time complexity of counting sort for n elements with key range K?',
        question_type: 'COMPLEXITY',
        options: ['O(n log n)', 'O(n + K)', 'O(n^2)', 'O(K log n)'],
        correct_option_index: 1,
        explanation: 'Counting and placement are linear in n, and scanning the range is linear in K.',
      },
      {
        id: 'q-counting-sort-2',
        quiz_id: 'quiz-ext-counting-sort',
        question_text: 'Counting sort is a comparison-based sorting algorithm.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'It tallies key frequencies rather than comparing elements, so it is non-comparison based.',
      },
      {
        id: 'q-counting-sort-3',
        quiz_id: 'quiz-ext-counting-sort',
        question_text: 'When does counting sort become inefficient?',
        question_type: 'MCQ',
        options: ['When n is small', 'When the key range K is much larger than n', 'When the data is already sorted', 'When all keys are equal'],
        correct_option_index: 1,
        explanation: 'If K greatly exceeds n, the O(K) term dominates and wastes time and space.',
      },
    ],
  },
  // 7. RADIX SORT
  {
    topic: {
      id: 'ext-radix-sort',
      slug: 'radix-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Radix Sort',
      definition: 'Radix sort is a non-comparison sort that orders integers by processing their digits one position at a time, using a stable sort (typically counting sort) as the per-digit subroutine.',
      importance: 'It sorts large sets of fixed-width integers or strings in near-linear time, outperforming comparison sorts when keys have a bounded number of digits.',
      prerequisites: ['counting-sort'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(D * (N + B))',
      time_complexity_average: 'O(D * (N + B))',
      time_complexity_worst: 'O(D * (N + B))',
      space_complexity: 'O(N + B)',
      display_order: 506,
    },
    sections: [
      {
        id: 'sec-radix-sort-1',
        topic_id: 'ext-radix-sort',
        title: 'Concept & Intuition',
        content: `Radix sort sorts numbers the way you might sort a stack of ID cards: first group by the last digit, then by the next digit, and so on. After processing the most significant digit, the whole stack is sorted.

This is **LSD (least significant digit)** radix sort. Each pass is stable, so earlier orderings survive into later passes.

> [!NOTE]
> $D$ is the number of digits and $B$ is the base (radix), commonly $10$ or $256$.`,
        display_order: 1,
      },
      {
        id: 'sec-radix-sort-2',
        topic_id: 'ext-radix-sort',
        title: 'How It Works',
        content: `LSD radix sort on base-$B$ integers:
1. Find the maximum value to know how many digit positions $D$ exist.
2. For each digit position from least to most significant:
   - Run a **stable** counting sort keyed on that digit (extracted via $\\lfloor v / B^k \\rfloor \\bmod B$).
3. After the final digit, the array is fully sorted.

Stability at each digit is essential — it preserves the relative order established by less significant digits.`,
        display_order: 2,
      },
      {
        id: 'sec-radix-sort-3',
        topic_id: 'ext-radix-sort',
        title: 'Complexity Analysis',
        content: `- **Time:** $O(D \\cdot (n + B))$ — one stable counting sort per digit.
- **Space:** $O(n + B)$ for the counting-sort buffers.

When $D$ and $B$ are constants (fixed-width integers), this reduces to $O(n)$. The catch: for very large key ranges $D$ grows, and choosing a larger base $B$ trades space for fewer passes.`,
        display_order: 3,
      },
      {
        id: 'sec-radix-sort-4',
        topic_id: 'ext-radix-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The per-digit sort **must** be stable, or the algorithm produces incorrect results. Plain (non-stable) counting inside the loop is a common bug.

Good fits:
- Sorting large arrays of fixed-width integers or fixed-length strings.
- Systems where counting sort's key range would otherwise be too large.

Negative numbers need special handling — offset the values or process the sign separately.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-radix-sort-py',
        topic_id: 'ext-radix-sort',
        language: 'python',
        is_optimized: true,
        code: `def radix_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        arr = _counting_by_digit(arr, exp)
        exp *= 10
    return arr

def _counting_by_digit(arr, exp):
    count = [0] * 10
    for v in arr:
        count[(v // exp) % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for v in reversed(arr):
        d = (v // exp) % 10
        count[d] -= 1
        output[count[d]] = v
    return output`,
        explanation: 'LSD radix sort in base 10 using a stable counting sort per digit.',
      },
      {
        id: 'snip-radix-sort-js',
        topic_id: 'ext-radix-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function radixSort(arr) {
  if (arr.length === 0) return arr;
  const maxVal = Math.max(...arr);
  let exp = 1;
  while (Math.floor(maxVal / exp) > 0) {
    arr = countingByDigit(arr, exp);
    exp *= 10;
  }
  return arr;
}

function countingByDigit(arr, exp) {
  const count = new Array(10).fill(0);
  for (const v of arr) count[Math.floor(v / exp) % 10]++;
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const d = Math.floor(arr[i] / exp) % 10;
    output[--count[d]] = arr[i];
  }
  return output;
}`,
        explanation: 'Base-10 LSD radix sort; each digit pass is a stable counting sort.',
      },
      {
        id: 'snip-radix-sort-cpp',
        topic_id: 'ext-radix-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>

void countingByDigit(std::vector<int>& arr, int exp) {
    std::vector<int> count(10, 0);
    for (int v : arr) count[(v / exp) % 10]++;
    for (int i = 1; i < 10; ++i) count[i] += count[i - 1];
    std::vector<int> output(arr.size());
    for (int i = (int)arr.size() - 1; i >= 0; --i) {
        int d = (arr[i] / exp) % 10;
        output[--count[d]] = arr[i];
    }
    arr = output;
}

void radixSort(std::vector<int>& arr) {
    if (arr.empty()) return;
    int maxVal = *std::max_element(arr.begin(), arr.end());
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingByDigit(arr, exp);
    }
}`,
        explanation: 'In-place LSD radix sort over a vector using stable per-digit counting.',
      },
      {
        id: 'snip-radix-sort-java',
        topic_id: 'ext-radix-sort',
        language: 'java',
        is_optimized: true,
        code: `import java.util.Arrays;

class Solution {
    void radixSort(int[] arr) {
        if (arr.length == 0) return;
        int maxVal = Arrays.stream(arr).max().getAsInt();
        for (int exp = 1; maxVal / exp > 0; exp *= 10) {
            countingByDigit(arr, exp);
        }
    }

    void countingByDigit(int[] arr, int exp) {
        int[] count = new int[10];
        for (int v : arr) count[(v / exp) % 10]++;
        for (int i = 1; i < 10; i++) count[i] += count[i - 1];
        int[] output = new int[arr.length];
        for (int i = arr.length - 1; i >= 0; i--) {
            int d = (arr[i] / exp) % 10;
            output[--count[d]] = arr[i];
        }
        System.arraycopy(output, 0, arr, 0, arr.length);
    }
}`,
        explanation: 'Java LSD radix sort; copies each stable digit pass back into the array.',
      },
    ],
    quizId: 'quiz-ext-radix-sort',
    quizTitle: 'Radix Sort Quiz',
    quizDescription: 'Assess your understanding of digit-by-digit sorting and its requirements.',
    questions: [
      {
        id: 'q-radix-sort-1',
        quiz_id: 'quiz-ext-radix-sort',
        question_text: 'What is the time complexity of radix sort for n numbers with d digits in base b?',
        question_type: 'COMPLEXITY',
        options: ['O(n log n)', 'O(d * (n + b))', 'O(n^2)', 'O(n * b)'],
        correct_option_index: 1,
        explanation: 'Each of the d digit passes runs a counting sort costing O(n + b).',
      },
      {
        id: 'q-radix-sort-2',
        quiz_id: 'quiz-ext-radix-sort',
        question_text: 'The per-digit sorting subroutine used by radix sort must be stable.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Stability preserves the ordering from less significant digits, which is essential for correctness.',
      },
      {
        id: 'q-radix-sort-3',
        quiz_id: 'quiz-ext-radix-sort',
        question_text: 'In LSD radix sort, in what order are digit positions processed?',
        question_type: 'MCQ',
        options: ['Most significant to least significant', 'Least significant to most significant', 'Random order', 'Only the middle digit'],
        correct_option_index: 1,
        explanation: 'LSD stands for least significant digit, processed first, moving toward the most significant.',
      },
    ],
  },
  // 8. BUCKET SORT
  {
    topic: {
      id: 'ext-bucket-sort',
      slug: 'bucket-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Bucket Sort',
      definition: 'Bucket sort distributes elements into a number of buckets based on their value, sorts each bucket individually (often with insertion sort), and concatenates the buckets in order.',
      importance: 'When input is drawn uniformly over a range, bucket sort achieves linear average time, making it excellent for sorting uniformly distributed floating-point data.',
      prerequisites: ['insertion-sort'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(N + K)',
      time_complexity_average: 'O(N + K)',
      time_complexity_worst: 'O(N^2)',
      space_complexity: 'O(N + K)',
      display_order: 507,
    },
    sections: [
      {
        id: 'sec-bucket-sort-1',
        topic_id: 'ext-bucket-sort',
        title: 'Concept & Intuition',
        content: `Bucket sort is like sorting mail into labeled pigeonholes by zip-code prefix, then alphabetizing each pile separately. You scatter items into **buckets** by value range, sort each bucket, then gather them back in order.

It works best when the data spreads evenly, so each bucket receives roughly the same number of elements.

> [!NOTE]
> Bucket sort's speed hinges on the assumption of a **uniform distribution** across the input range.`,
        display_order: 1,
      },
      {
        id: 'sec-bucket-sort-2',
        topic_id: 'ext-bucket-sort',
        title: 'How It Works',
        content: `For $n$ values in $[0, 1)$ using $n$ buckets:
1. Create $n$ empty buckets.
2. Place each value $v$ into bucket index $\\lfloor n \\cdot v \\rfloor$.
3. Sort every bucket (insertion sort is common since buckets are small).
4. Concatenate the buckets in index order.

For a general range, scale values by $(v - \\min) / (\\max - \\min)$ before choosing the bucket.`,
        display_order: 2,
      },
      {
        id: 'sec-bucket-sort-3',
        topic_id: 'ext-bucket-sort',
        title: 'Complexity Analysis',
        content: `- **Average case:** with uniform input and $n$ buckets, each bucket holds $O(1)$ elements, giving $O(n + K)$ overall.
- **Worst case:** every element lands in one bucket, degrading to the inner sort's cost — $O(n^2)$ with insertion sort.
- **Space:** $O(n + K)$ for the buckets.

The uniformity assumption is what separates the linear average from the quadratic worst case.`,
        display_order: 3,
      },
      {
        id: 'sec-bucket-sort-4',
        topic_id: 'ext-bucket-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> On skewed (non-uniform) data, most elements pile into a few buckets and performance collapses toward $O(n^2)$.

Good fits:
- Uniformly distributed floating-point numbers in a known range.
- Parallel sorting, since buckets can be sorted independently.

Pitfall: choosing too few buckets defeats the purpose; a common heuristic is one bucket per element.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-bucket-sort-py',
        topic_id: 'ext-bucket-sort',
        language: 'python',
        is_optimized: true,
        code: `def bucket_sort(arr):
    if not arr:
        return arr
    n = len(arr)
    lo, hi = min(arr), max(arr)
    if lo == hi:
        return arr
    buckets = [[] for _ in range(n)]
    for v in arr:
        idx = int((v - lo) / (hi - lo) * (n - 1))
        buckets[idx].append(v)
    result = []
    for b in buckets:
        b.sort()
        result.extend(b)
    return result`,
        explanation: 'Scatters values into n buckets by normalized value, sorts each, then concatenates.',
      },
      {
        id: 'snip-bucket-sort-js',
        topic_id: 'ext-bucket-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function bucketSort(arr) {
  if (arr.length === 0) return arr;
  const n = arr.length;
  const lo = Math.min(...arr), hi = Math.max(...arr);
  if (lo === hi) return arr;
  const buckets = Array.from({ length: n }, () => []);
  for (const v of arr) {
    const idx = Math.floor(((v - lo) / (hi - lo)) * (n - 1));
    buckets[idx].push(v);
  }
  const result = [];
  for (const b of buckets) {
    b.sort((a, c) => a - c);
    result.push(...b);
  }
  return result;
}`,
        explanation: 'Distributes into n buckets, sorts each numerically, and flattens in order.',
      },
      {
        id: 'snip-bucket-sort-cpp',
        topic_id: 'ext-bucket-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>

std::vector<double> bucketSort(std::vector<double> arr) {
    if (arr.empty()) return arr;
    int n = (int)arr.size();
    double lo = *std::min_element(arr.begin(), arr.end());
    double hi = *std::max_element(arr.begin(), arr.end());
    if (lo == hi) return arr;
    std::vector<std::vector<double>> buckets(n);
    for (double v : arr) {
        int idx = (int)((v - lo) / (hi - lo) * (n - 1));
        buckets[idx].push_back(v);
    }
    std::vector<double> result;
    for (auto& b : buckets) {
        std::sort(b.begin(), b.end());
        for (double v : b) result.push_back(v);
    }
    return result;
}`,
        explanation: 'Normalizes each value to a bucket index, sorts buckets, and concatenates.',
      },
      {
        id: 'snip-bucket-sort-java',
        topic_id: 'ext-bucket-sort',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class Solution {
    double[] bucketSort(double[] arr) {
        if (arr.length == 0) return arr;
        int n = arr.length;
        double lo = Arrays.stream(arr).min().getAsDouble();
        double hi = Arrays.stream(arr).max().getAsDouble();
        if (lo == hi) return arr;
        List<List<Double>> buckets = new ArrayList<>();
        for (int i = 0; i < n; i++) buckets.add(new ArrayList<>());
        for (double v : arr) {
            int idx = (int) ((v - lo) / (hi - lo) * (n - 1));
            buckets.get(idx).add(v);
        }
        int k = 0;
        for (List<Double> b : buckets) {
            Collections.sort(b);
            for (double v : b) arr[k++] = v;
        }
        return arr;
    }
}`,
        explanation: 'Java bucket sort using ArrayList buckets sorted with Collections.sort.',
      },
    ],
    quizId: 'quiz-ext-bucket-sort',
    quizTitle: 'Bucket Sort Quiz',
    quizDescription: 'Test your understanding of distribution-based bucket sorting.',
    questions: [
      {
        id: 'q-bucket-sort-1',
        quiz_id: 'quiz-ext-bucket-sort',
        question_text: 'What is the worst-case time complexity of bucket sort?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n + K)', 'O(n^2)', 'O(n log n)'],
        correct_option_index: 2,
        explanation: 'If all elements fall into one bucket, the inner sort dominates at O(n^2).',
      },
      {
        id: 'q-bucket-sort-2',
        quiz_id: 'quiz-ext-bucket-sort',
        question_text: 'Bucket sort achieves linear average time when the input is uniformly distributed.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Uniform data spreads elements evenly so each bucket holds O(1) items on average.',
      },
      {
        id: 'q-bucket-sort-3',
        quiz_id: 'quiz-ext-bucket-sort',
        question_text: 'Which situation causes bucket sort to perform poorly?',
        question_type: 'MCQ',
        options: ['Uniformly distributed data', 'Highly skewed data concentrated in few buckets', 'Data already in range [0,1)', 'Using one bucket per element'],
        correct_option_index: 1,
        explanation: 'Skewed data overloads a few buckets, pushing performance toward quadratic.',
      },
    ],
  },
  // 9. SHELL SORT
  {
    topic: {
      id: 'ext-shell-sort',
      slug: 'shell-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Shell Sort',
      definition: 'Shell sort is a generalization of insertion sort that first sorts elements far apart using a decreasing sequence of gaps, then finishes with an ordinary gap-1 insertion sort.',
      importance: 'By moving elements long distances early, it removes many inversions quickly and dramatically outperforms plain insertion sort, all while remaining in-place and simple to implement.',
      prerequisites: ['insertion-sort'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(N log N)',
      time_complexity_average: 'O(N^1.25)',
      time_complexity_worst: 'O(N^2)',
      space_complexity: 'O(1)',
      display_order: 508,
    },
    sections: [
      {
        id: 'sec-shell-sort-1',
        topic_id: 'ext-shell-sort',
        title: 'Concept & Intuition',
        content: `Plain insertion sort is slow because elements move only one position per swap. Shell sort fixes this by first comparing elements a large **gap** apart, letting values leap toward their final region in big steps.

As the gap shrinks toward $1$, the array becomes progressively more ordered, so the final gap-$1$ pass (ordinary insertion sort) has very little work left.

> [!NOTE]
> The choice of **gap sequence** dramatically affects performance.`,
        display_order: 1,
      },
      {
        id: 'sec-shell-sort-2',
        topic_id: 'ext-shell-sort',
        title: 'How It Works',
        content: `1. Pick a gap sequence, e.g. $n/2, n/4, \\ldots, 1$ (Shell's original).
2. For each gap $g$, perform a **gapped insertion sort**: each element is compared and shifted among elements $g$ positions apart.
3. Reduce the gap and repeat until $g = 1$.

The gap-$1$ pass is a standard insertion sort, but by then the array is nearly sorted so it runs fast.`,
        display_order: 2,
      },
      {
        id: 'sec-shell-sort-3',
        topic_id: 'ext-shell-sort',
        title: 'Complexity Analysis',
        content: `Shell sort's complexity depends entirely on the gap sequence.

- **Shell's original ($n/2$):** $O(n^2)$ worst case.
- **Hibbard ($2^k - 1$):** $O(n^{3/2})$ worst case.
- **Sedgewick sequences:** around $O(n^{4/3})$.
- **Average:** roughly $O(n^{1.25})$ for common sequences.
- **Space:** $O(1)$.

No single tight bound exists for the general case; it is an active area of analysis.`,
        display_order: 3,
      },
      {
        id: 'sec-shell-sort-4',
        topic_id: 'ext-shell-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Shell sort is **not stable** — gapped moves can reorder equal elements.

Good fits:
- Medium-sized arrays where a simple, in-place, dependency-free sort is desired.
- Embedded systems that avoid recursion and extra memory.

Pitfall: a poor gap sequence (like always halving) can leave the worst case at $O(n^2)$; prefer Hibbard or Sedgewick gaps for better guarantees.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-shell-sort-py',
        topic_id: 'ext-shell-sort',
        language: 'python',
        is_optimized: true,
        code: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,
        explanation: 'Gapped insertion sort with a halving gap sequence, sorting in place.',
      },
      {
        id: 'snip-shell-sort-js',
        topic_id: 'ext-shell-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function shellSort(arr) {
  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}`,
        explanation: 'Halving-gap shell sort; each gap pass is a gapped insertion sort.',
      },
      {
        id: 'snip-shell-sort-cpp',
        topic_id: 'ext-shell-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>

void shellSort(std::vector<int>& arr) {
    int n = (int)arr.size();
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; ++i) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
        explanation: 'In-place shell sort over a vector using the classic halving gaps.',
      },
      {
        id: 'snip-shell-sort-java',
        topic_id: 'ext-shell-sort',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    void shellSort(int[] arr) {
        int n = arr.length;
        for (int gap = n / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j = i;
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                arr[j] = temp;
            }
        }
    }
}`,
        explanation: 'Java shell sort with halving gaps and gapped insertion passes.',
      },
    ],
    quizId: 'quiz-ext-shell-sort',
    quizTitle: 'Shell Sort Quiz',
    quizDescription: 'Test your understanding of gap sequences and shell sort behavior.',
    questions: [
      {
        id: 'q-shell-sort-1',
        quiz_id: 'quiz-ext-shell-sort',
        question_text: 'Shell sort is a generalization of which simpler sorting algorithm?',
        question_type: 'MCQ',
        options: ['Selection sort', 'Insertion sort', 'Merge sort', 'Heap sort'],
        correct_option_index: 1,
        explanation: 'Shell sort performs gapped insertion sorts, reducing to plain insertion sort at gap 1.',
      },
      {
        id: 'q-shell-sort-2',
        quiz_id: 'quiz-ext-shell-sort',
        question_text: 'The worst-case complexity of shell sort depends on the chosen gap sequence.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Different gap sequences yield different bounds, from O(n^2) down to about O(n^(4/3)).',
      },
      {
        id: 'q-shell-sort-3',
        quiz_id: 'quiz-ext-shell-sort',
        question_text: 'Using the original halving gap sequence, what is the worst-case time complexity of shell sort?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correct_option_index: 2,
        explanation: 'The naive halving sequence has an O(n^2) worst case; better sequences improve this.',
      },
    ],
  },
  // 10. COMB SORT
  {
    topic: {
      id: 'ext-comb-sort',
      slug: 'comb-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Comb Sort',
      definition: 'Comb sort improves bubble sort by comparing and swapping elements separated by a shrinking gap that starts large and is divided by a shrink factor (about 1.3) each pass until it reaches 1.',
      importance: 'By eliminating small values stranded near the end of the array (called turtles), comb sort achieves far better practical performance than bubble sort while staying simple and in-place.',
      prerequisites: ['array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(N log N)',
      time_complexity_average: 'O(N^2 / 2^p)',
      time_complexity_worst: 'O(N^2)',
      space_complexity: 'O(1)',
      display_order: 509,
    },
    sections: [
      {
        id: 'sec-comb-sort-1',
        topic_id: 'ext-comb-sort',
        title: 'Concept & Intuition',
        content: `Bubble sort is crippled by **turtles**: small values near the end of the array that crawl forward one step at a time. Comb sort attacks them by comparing elements a large **gap** apart, so a stranded small value can jump most of the way home in a single swap.

The gap starts at the array length and shrinks by a factor of roughly $1.3$ each pass until it becomes $1$, at which point comb sort behaves like bubble sort on a nearly-sorted array.

> [!NOTE]
> The shrink factor $1.3$ was found empirically to give the best performance.`,
        display_order: 1,
      },
      {
        id: 'sec-comb-sort-2',
        topic_id: 'ext-comb-sort',
        title: 'How It Works',
        content: `1. Initialize gap $= n$ and a \`swapped\` flag.
2. Each pass: shrink the gap via gap $= \\lfloor \\text{gap} / 1.3 \\rfloor$ (never below $1$).
3. Compare each pair arr$[i]$ and arr$[i + \\text{gap}]$, swapping if out of order.
4. Repeat until the gap is $1$ **and** no swaps occurred in a pass.

The shrinking gap does the heavy lifting; the final gap-$1$ passes clean up remaining adjacent inversions.`,
        display_order: 2,
      },
      {
        id: 'sec-comb-sort-3',
        topic_id: 'ext-comb-sort',
        title: 'Complexity Analysis',
        content: `- **Worst case:** $O(n^2)$, though it is reached far less often than with bubble sort.
- **Average case:** empirically around $\\Theta(n^2 / 2^p)$ where $p$ is the number of increments, making it much faster in practice.
- **Best case:** $O(n \\log n)$ on favorable inputs.
- **Space:** $O(1)$.

The shrink factor is the key tuning knob balancing pass count against thoroughness.`,
        display_order: 3,
      },
      {
        id: 'sec-comb-sort-4',
        topic_id: 'ext-comb-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Comb sort is **not stable** — long-distance swaps can reorder equal elements.

Good fits:
- A simple, in-place drop-in replacement for bubble sort with much better real-world speed.

Pitfall: forgetting to floor the gap to a minimum of $1$, or terminating before a full gap-$1$ pass with no swaps, can leave the array unsorted.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-comb-sort-py',
        topic_id: 'ext-comb-sort',
        language: 'python',
        is_optimized: true,
        code: `def comb_sort(arr):
    n = len(arr)
    gap = n
    swapped = True
    while gap > 1 or swapped:
        gap = max(1, int(gap / 1.3))
        swapped = False
        for i in range(n - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                swapped = True
    return arr`,
        explanation: 'Shrinks the gap by 1.3 each pass and swaps gapped pairs until sorted.',
      },
      {
        id: 'snip-comb-sort-js',
        topic_id: 'ext-comb-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function combSort(arr) {
  const n = arr.length;
  let gap = n;
  let swapped = true;
  while (gap > 1 || swapped) {
    gap = Math.max(1, Math.floor(gap / 1.3));
    swapped = false;
    for (let i = 0; i + gap < n; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        swapped = true;
      }
    }
  }
  return arr;
}`,
        explanation: 'Comb sort with a 1.3 shrink factor; loops until gap is 1 and no swaps occur.',
      },
      {
        id: 'snip-comb-sort-cpp',
        topic_id: 'ext-comb-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <utility>

void combSort(std::vector<int>& arr) {
    int n = (int)arr.size();
    int gap = n;
    bool swapped = true;
    while (gap > 1 || swapped) {
        gap = (int)(gap / 1.3);
        if (gap < 1) gap = 1;
        swapped = false;
        for (int i = 0; i + gap < n; ++i) {
            if (arr[i] > arr[i + gap]) {
                std::swap(arr[i], arr[i + gap]);
                swapped = true;
            }
        }
    }
}`,
        explanation: 'In-place comb sort over a vector using a 1.3 gap shrink factor.',
      },
      {
        id: 'snip-comb-sort-java',
        topic_id: 'ext-comb-sort',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    void combSort(int[] arr) {
        int n = arr.length;
        int gap = n;
        boolean swapped = true;
        while (gap > 1 || swapped) {
            gap = (int) (gap / 1.3);
            if (gap < 1) gap = 1;
            swapped = false;
            for (int i = 0; i + gap < n; i++) {
                if (arr[i] > arr[i + gap]) {
                    int tmp = arr[i];
                    arr[i] = arr[i + gap];
                    arr[i + gap] = tmp;
                    swapped = true;
                }
            }
        }
    }
}`,
        explanation: 'Java comb sort shrinking the gap by 1.3 and swapping gapped pairs.',
      },
    ],
    quizId: 'quiz-ext-comb-sort',
    quizTitle: 'Comb Sort Quiz',
    quizDescription: 'Check your understanding of comb sort and how it improves on bubble sort.',
    questions: [
      {
        id: 'q-comb-sort-1',
        quiz_id: 'quiz-ext-comb-sort',
        question_text: 'Comb sort is primarily an improvement over which algorithm?',
        question_type: 'MCQ',
        options: ['Bubble sort', 'Merge sort', 'Quick sort', 'Counting sort'],
        correct_option_index: 0,
        explanation: 'Comb sort uses a shrinking gap to eliminate turtles that slow down bubble sort.',
      },
      {
        id: 'q-comb-sort-2',
        quiz_id: 'quiz-ext-comb-sort',
        question_text: 'What is the commonly used shrink factor in comb sort?',
        question_type: 'MCQ',
        options: ['1.3', '2.0', '0.5', '3.14'],
        correct_option_index: 0,
        explanation: 'An empirically determined shrink factor of about 1.3 gives the best performance.',
      },
      {
        id: 'q-comb-sort-3',
        quiz_id: 'quiz-ext-comb-sort',
        question_text: 'What is the worst-case time complexity of comb sort?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correct_option_index: 2,
        explanation: 'Although rare in practice, comb sort can still degrade to O(n^2) in the worst case.',
      },
    ],
  },
  // 11. PIGEONHOLE SORT
  {
    topic: {
      id: 'ext-pigeonhole-sort',
      slug: 'pigeonhole-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Pigeonhole Sort',
      definition: 'Pigeonhole sort creates one hole for every value in the input range, drops each element into the hole matching its key, then walks the holes in order to produce the sorted output.',
      importance: 'When the number of elements and the size of the key range are similar, it sorts in linear time and is conceptually the simplest distribution sort.',
      prerequisites: ['array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(N + K)',
      time_complexity_average: 'O(N + K)',
      time_complexity_worst: 'O(N + K)',
      space_complexity: 'O(N + K)',
      display_order: 510,
    },
    sections: [
      {
        id: 'sec-pigeonhole-sort-1',
        topic_id: 'ext-pigeonhole-sort',
        title: 'Concept & Intuition',
        content: `Pigeonhole sort takes its name literally: if you have one pigeonhole per possible value, you can drop each element into its matching hole and then read the holes left to right to get sorted output.

It is closely related to counting sort but stores the **actual elements** (not just counts) in each hole, which makes it natural for sorting records keyed by a small integer.

> [!NOTE]
> It is only sensible when the key range $K$ is close to the element count $n$.`,
        display_order: 1,
      },
      {
        id: 'sec-pigeonhole-sort-2',
        topic_id: 'ext-pigeonhole-sort',
        title: 'How It Works',
        content: `1. Find the minimum and maximum keys; the range size is $K = \\max - \\min + 1$.
2. Create $K$ empty pigeonholes.
3. For each element, place it in hole index $(\\text{key} - \\min)$.
4. Walk the holes from first to last, appending their contents back to the array.

Because holes are visited in order and elements within a hole keep insertion order, the sort is **stable**.`,
        display_order: 2,
      },
      {
        id: 'sec-pigeonhole-sort-3',
        topic_id: 'ext-pigeonhole-sort',
        title: 'Complexity Analysis',
        content: `- **Time:** $O(n + K)$ — one pass to scatter, one over the $K$ holes to gather.
- **Space:** $O(n + K)$ for the holes.

This is linear only while $K = O(n)$. If the range is enormous relative to the count (e.g. a few values spanning millions), the $O(K)$ term makes it impractical.`,
        display_order: 3,
      },
      {
        id: 'sec-pigeonhole-sort-4',
        topic_id: 'ext-pigeonhole-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> A large key range explodes memory usage. Pigeonhole sort is a poor choice when $K \\gg n$.

Good fits:
- Sorting integers or keyed records where the value range is small and dense.

Pitfall: confusing it with counting sort — pigeonhole stores whole elements per hole, while counting sort stores frequencies and uses prefix sums.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-pigeonhole-sort-py',
        topic_id: 'ext-pigeonhole-sort',
        language: 'python',
        is_optimized: true,
        code: `def pigeonhole_sort(arr):
    if not arr:
        return arr
    lo, hi = min(arr), max(arr)
    size = hi - lo + 1
    holes = [[] for _ in range(size)]
    for v in arr:
        holes[v - lo].append(v)
    result = []
    for hole in holes:
        result.extend(hole)
    return result`,
        explanation: 'Places each value into a hole indexed by key - min, then gathers holes in order.',
      },
      {
        id: 'snip-pigeonhole-sort-js',
        topic_id: 'ext-pigeonhole-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function pigeonholeSort(arr) {
  if (arr.length === 0) return arr;
  const lo = Math.min(...arr), hi = Math.max(...arr);
  const size = hi - lo + 1;
  const holes = Array.from({ length: size }, () => []);
  for (const v of arr) holes[v - lo].push(v);
  const result = [];
  for (const hole of holes) result.push(...hole);
  return result;
}`,
        explanation: 'Scatters values into holes by offset from min and concatenates them in order.',
      },
      {
        id: 'snip-pigeonhole-sort-cpp',
        topic_id: 'ext-pigeonhole-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>

std::vector<int> pigeonholeSort(const std::vector<int>& arr) {
    if (arr.empty()) return arr;
    int lo = *std::min_element(arr.begin(), arr.end());
    int hi = *std::max_element(arr.begin(), arr.end());
    int size = hi - lo + 1;
    std::vector<std::vector<int>> holes(size);
    for (int v : arr) holes[v - lo].push_back(v);
    std::vector<int> result;
    for (auto& hole : holes)
        for (int v : hole) result.push_back(v);
    return result;
}`,
        explanation: 'Uses one hole per key value, then reads holes left to right for sorted output.',
      },
      {
        id: 'snip-pigeonhole-sort-java',
        topic_id: 'ext-pigeonhole-sort',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class Solution {
    int[] pigeonholeSort(int[] arr) {
        if (arr.length == 0) return arr;
        int lo = Arrays.stream(arr).min().getAsInt();
        int hi = Arrays.stream(arr).max().getAsInt();
        int size = hi - lo + 1;
        List<List<Integer>> holes = new ArrayList<>();
        for (int i = 0; i < size; i++) holes.add(new ArrayList<>());
        for (int v : arr) holes.get(v - lo).add(v);
        int k = 0;
        for (List<Integer> hole : holes)
            for (int v : hole) arr[k++] = v;
        return arr;
    }
}`,
        explanation: 'Java pigeonhole sort using per-value buckets gathered in key order.',
      },
    ],
    quizId: 'quiz-ext-pigeonhole-sort',
    quizTitle: 'Pigeonhole Sort Quiz',
    quizDescription: 'Test your understanding of pigeonhole distribution sorting.',
    questions: [
      {
        id: 'q-pigeonhole-sort-1',
        quiz_id: 'quiz-ext-pigeonhole-sort',
        question_text: 'What is the time complexity of pigeonhole sort for n elements over a key range of size K?',
        question_type: 'COMPLEXITY',
        options: ['O(n log n)', 'O(n + K)', 'O(n^2)', 'O(K^2)'],
        correct_option_index: 1,
        explanation: 'Scattering is O(n) and gathering over the holes is O(K), giving O(n + K).',
      },
      {
        id: 'q-pigeonhole-sort-2',
        quiz_id: 'quiz-ext-pigeonhole-sort',
        question_text: 'Pigeonhole sort is efficient even when the key range is far larger than the number of elements.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'A huge range inflates the O(K) term and memory usage, making it impractical.',
      },
      {
        id: 'q-pigeonhole-sort-3',
        quiz_id: 'quiz-ext-pigeonhole-sort',
        question_text: 'How does pigeonhole sort differ from counting sort?',
        question_type: 'MCQ',
        options: ['It only works on strings', 'It stores actual elements in each hole rather than frequency counts', 'It is comparison-based', 'It requires the data to be pre-sorted'],
        correct_option_index: 1,
        explanation: 'Pigeonhole sort places whole elements into holes, whereas counting sort tallies frequencies.',
      },
    ],
  },
  // 12. CYCLE SORT
  {
    topic: {
      id: 'ext-cycle-sort',
      slug: 'cycle-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Cycle Sort',
      definition: 'Cycle sort is an in-place, comparison-based algorithm that sorts by determining the correct final position of each element (its rank) and rotating elements along permutation cycles until every value is placed.',
      importance: 'It performs the theoretically minimum number of memory writes of any sorting algorithm, which is critical when writes are extremely expensive, such as with flash memory or EEPROM.',
      prerequisites: ['array'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(N^2)',
      time_complexity_average: 'O(N^2)',
      time_complexity_worst: 'O(N^2)',
      space_complexity: 'O(1)',
      display_order: 511,
    },
    sections: [
      {
        id: 'sec-cycle-sort-1',
        topic_id: 'ext-cycle-sort',
        title: 'Concept & Intuition',
        content: `Cycle sort views the array as a set of **permutation cycles**. Each element belongs to a cycle that, when rotated, drops every member into its correct slot in one sweep.

The payoff is minimal writes: each element is written to memory **exactly once** when placed in its final position (plus untouched already-correct elements). This is optimal — no sort can do fewer writes.

> [!NOTE]
> Cycle sort is the go-to when write operations dominate the cost, such as writing to worn-limited flash storage.`,
        display_order: 1,
      },
      {
        id: 'sec-cycle-sort-2',
        topic_id: 'ext-cycle-sort',
        title: 'How It Works',
        content: `For each start position (cycle start):
1. Count how many elements are smaller than the current item to find its correct index (its **rank**).
2. If it is already there, move on.
3. Otherwise place it there, evicting whatever sat in that slot, and repeat with the evicted item.
4. Skip over duplicates by advancing the target position past equal elements.
5. Continue until the cycle closes back at the start.

Each placement is a single write, which is the whole point.`,
        display_order: 2,
      },
      {
        id: 'sec-cycle-sort-3',
        topic_id: 'ext-cycle-sort',
        title: 'Complexity Analysis',
        content: `- **Time:** $O(n^2)$ in all cases — finding each element's rank requires scanning the remaining array.
- **Writes:** $O(n)$ total, and provably the **minimum** possible number of writes.
- **Space:** $O(1)$ auxiliary.

So cycle sort trades comparisons (of which it does many) for writes (of which it does the fewest possible).`,
        display_order: 3,
      },
      {
        id: 'sec-cycle-sort-4',
        topic_id: 'ext-cycle-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Cycle sort is **not stable** and its $O(n^2)$ comparison cost makes it slow for large arrays despite the minimal writes.

Good fits:
- Media with limited write endurance (flash, EEPROM) where each write is costly.

Pitfall: mishandling duplicates. You must advance the target position past equal elements, or the algorithm loops forever on repeated values.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-cycle-sort-py',
        topic_id: 'ext-cycle-sort',
        language: 'python',
        is_optimized: true,
        code: `def cycle_sort(arr):
    n = len(arr)
    for cycle_start in range(n - 1):
        item = arr[cycle_start]
        pos = cycle_start
        for i in range(cycle_start + 1, n):
            if arr[i] < item:
                pos += 1
        if pos == cycle_start:
            continue
        while item == arr[pos]:
            pos += 1
        arr[pos], item = item, arr[pos]
        while pos != cycle_start:
            pos = cycle_start
            for i in range(cycle_start + 1, n):
                if arr[i] < item:
                    pos += 1
            while item == arr[pos]:
                pos += 1
            arr[pos], item = item, arr[pos]
    return arr`,
        explanation: 'Places each item at its rank with a single write, rotating along permutation cycles.',
      },
      {
        id: 'snip-cycle-sort-js',
        topic_id: 'ext-cycle-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function cycleSort(arr) {
  const n = arr.length;
  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = arr[cycleStart];
    let pos = cycleStart;
    for (let i = cycleStart + 1; i < n; i++) if (arr[i] < item) pos++;
    if (pos === cycleStart) continue;
    while (item === arr[pos]) pos++;
    [arr[pos], item] = [item, arr[pos]];
    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) if (arr[i] < item) pos++;
      while (item === arr[pos]) pos++;
      [arr[pos], item] = [item, arr[pos]];
    }
  }
  return arr;
}`,
        explanation: 'Computes each item rank and rotates cycles, minimizing total writes.',
      },
      {
        id: 'snip-cycle-sort-cpp',
        topic_id: 'ext-cycle-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>

void cycleSort(std::vector<int>& arr) {
    int n = (int)arr.size();
    for (int cycleStart = 0; cycleStart < n - 1; ++cycleStart) {
        int item = arr[cycleStart];
        int pos = cycleStart;
        for (int i = cycleStart + 1; i < n; ++i) if (arr[i] < item) pos++;
        if (pos == cycleStart) continue;
        while (item == arr[pos]) pos++;
        std::swap(arr[pos], item);
        while (pos != cycleStart) {
            pos = cycleStart;
            for (int i = cycleStart + 1; i < n; ++i) if (arr[i] < item) pos++;
            while (item == arr[pos]) pos++;
            std::swap(arr[pos], item);
        }
    }
}`,
        explanation: 'In-place cycle sort over a vector performing the minimum number of writes.',
      },
      {
        id: 'snip-cycle-sort-java',
        topic_id: 'ext-cycle-sort',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    void cycleSort(int[] arr) {
        int n = arr.length;
        for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {
            int item = arr[cycleStart];
            int pos = cycleStart;
            for (int i = cycleStart + 1; i < n; i++) if (arr[i] < item) pos++;
            if (pos == cycleStart) continue;
            while (item == arr[pos]) pos++;
            int tmp = arr[pos]; arr[pos] = item; item = tmp;
            while (pos != cycleStart) {
                pos = cycleStart;
                for (int i = cycleStart + 1; i < n; i++) if (arr[i] < item) pos++;
                while (item == arr[pos]) pos++;
                tmp = arr[pos]; arr[pos] = item; item = tmp;
            }
        }
    }
}`,
        explanation: 'Java cycle sort rotating permutation cycles with minimal writes.',
      },
    ],
    quizId: 'quiz-ext-cycle-sort',
    quizTitle: 'Cycle Sort Quiz',
    quizDescription: 'Assess your understanding of cycle sort and its write-optimality.',
    questions: [
      {
        id: 'q-cycle-sort-1',
        quiz_id: 'quiz-ext-cycle-sort',
        question_text: 'What is the key property that makes cycle sort unique among sorting algorithms?',
        question_type: 'MCQ',
        options: ['It is the fastest sort', 'It performs the theoretically minimum number of writes', 'It is always stable', 'It uses O(n) extra space'],
        correct_option_index: 1,
        explanation: 'Cycle sort writes each element at most once, the provable minimum, ideal for write-limited media.',
      },
      {
        id: 'q-cycle-sort-2',
        quiz_id: 'quiz-ext-cycle-sort',
        question_text: 'What is the time complexity of cycle sort?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correct_option_index: 2,
        explanation: 'Finding each element rank requires an O(n) scan, giving O(n^2) overall.',
      },
      {
        id: 'q-cycle-sort-3',
        quiz_id: 'quiz-ext-cycle-sort',
        question_text: 'Cycle sort is a stable sorting algorithm.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'The cycle rotations can reorder equal elements, so cycle sort is not stable.',
      },
    ],
  },
  // 13. ODD-EVEN SORT
  {
    topic: {
      id: 'ext-odd-even-sort',
      slug: 'odd-even-sort',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Odd-Even Sort',
      definition: 'Odd-even sort (brick sort) is a variation of bubble sort that alternates between comparing all odd-indexed adjacent pairs and all even-indexed adjacent pairs, repeating until no swaps occur.',
      importance: 'Its two independent compare-swap phases map naturally onto parallel hardware, making it a classic teaching example of a parallel sorting network.',
      prerequisites: ['array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(N)',
      time_complexity_average: 'O(N^2)',
      time_complexity_worst: 'O(N^2)',
      space_complexity: 'O(1)',
      display_order: 512,
    },
    sections: [
      {
        id: 'sec-odd-even-sort-1',
        topic_id: 'ext-odd-even-sort',
        title: 'Concept & Intuition',
        content: `Odd-even sort splits each round into two phases. In the **odd phase** it compares pairs $(1,2), (3,4), \\ldots$; in the **even phase** it compares pairs $(0,1), (2,3), \\ldots$. Alternating these phases lets values migrate steadily toward their sorted positions.

The magic is that within a single phase, every comparison is **independent**, so all of them can run at the same time on parallel hardware.

> [!NOTE]
> It is also called **brick sort** because the alternating pairs resemble a bricklaying pattern.`,
        display_order: 1,
      },
      {
        id: 'sec-odd-even-sort-2',
        topic_id: 'ext-odd-even-sort',
        title: 'How It Works',
        content: `Repeat until a full round makes no swaps:
1. **Odd phase:** for every odd $i$, compare arr$[i]$ and arr$[i+1]$, swapping if out of order.
2. **Even phase:** for every even $i$, compare arr$[i]$ and arr$[i+1]$, swapping if out of order.
3. Track whether any swap happened; stop when a round is swap-free.

On a serial machine this is just bubble sort with a phase split; on parallel hardware each phase is one time step.`,
        display_order: 2,
      },
      {
        id: 'sec-odd-even-sort-3',
        topic_id: 'ext-odd-even-sort',
        title: 'Complexity Analysis',
        content: `- **Serial time:** $O(n^2)$ average and worst, $O(n)$ best (already sorted, one clean round).
- **Parallel time:** $O(n)$ phases on $n/2$ processors, since the array sorts within $n$ phases.
- **Space:** $O(1)$.

The parallel bound is the interesting result: with enough processors, the sort completes in linear time steps.`,
        display_order: 3,
      },
      {
        id: 'sec-odd-even-sort-4',
        topic_id: 'ext-odd-even-sort',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> On a single-threaded CPU, odd-even sort offers no advantage over bubble sort and remains $O(n^2)$.

Good fits:
- SIMD, GPU, or multiprocessor settings where each phase's comparisons run concurrently.
- Teaching sorting networks and parallel algorithm design.

Pitfall: ending after a fixed number of rounds instead of looping until no swaps occur can leave the array unsorted.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-odd-even-sort-py',
        topic_id: 'ext-odd-even-sort',
        language: 'python',
        is_optimized: true,
        code: `def odd_even_sort(arr):
    n = len(arr)
    sorted_flag = False
    while not sorted_flag:
        sorted_flag = True
        for i in range(1, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                sorted_flag = False
        for i in range(0, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                sorted_flag = False
    return arr`,
        explanation: 'Alternates odd and even compare-swap phases until a round makes no swaps.',
      },
      {
        id: 'snip-odd-even-sort-js',
        topic_id: 'ext-odd-even-sort',
        language: 'javascript',
        is_optimized: true,
        code: `function oddEvenSort(arr) {
  const n = arr.length;
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 1; i < n - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
    for (let i = 0; i < n - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }
  }
  return arr;
}`,
        explanation: 'Odd-even (brick) sort looping until an entire round is swap-free.',
      },
      {
        id: 'snip-odd-even-sort-cpp',
        topic_id: 'ext-odd-even-sort',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <utility>

void oddEvenSort(std::vector<int>& arr) {
    int n = (int)arr.size();
    bool sorted = false;
    while (!sorted) {
        sorted = true;
        for (int i = 1; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                std::swap(arr[i], arr[i + 1]);
                sorted = false;
            }
        }
        for (int i = 0; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                std::swap(arr[i], arr[i + 1]);
                sorted = false;
            }
        }
    }
}`,
        explanation: 'In-place odd-even sort using std::swap across two alternating phases.',
      },
      {
        id: 'snip-odd-even-sort-java',
        topic_id: 'ext-odd-even-sort',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    void oddEvenSort(int[] arr) {
        int n = arr.length;
        boolean sorted = false;
        while (!sorted) {
            sorted = true;
            for (int i = 1; i < n - 1; i += 2) {
                if (arr[i] > arr[i + 1]) {
                    int t = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = t;
                    sorted = false;
                }
            }
            for (int i = 0; i < n - 1; i += 2) {
                if (arr[i] > arr[i + 1]) {
                    int t = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = t;
                    sorted = false;
                }
            }
        }
    }
}`,
        explanation: 'Java odd-even sort alternating phases until no swaps remain.',
      },
    ],
    quizId: 'quiz-ext-odd-even-sort',
    quizTitle: 'Odd-Even Sort Quiz',
    quizDescription: 'Test your understanding of odd-even (brick) sort and its parallel nature.',
    questions: [
      {
        id: 'q-odd-even-sort-1',
        quiz_id: 'quiz-ext-odd-even-sort',
        question_text: 'Odd-even sort is a variation of which sorting algorithm?',
        question_type: 'MCQ',
        options: ['Bubble sort', 'Quick sort', 'Radix sort', 'Heap sort'],
        correct_option_index: 0,
        explanation: 'It is a parallel-friendly variant of bubble sort using alternating odd and even phases.',
      },
      {
        id: 'q-odd-even-sort-2',
        quiz_id: 'quiz-ext-odd-even-sort',
        question_text: 'On parallel hardware with enough processors, what is the time-step complexity of odd-even sort?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correct_option_index: 2,
        explanation: 'The array sorts within n phases, so with n/2 processors it takes O(n) parallel time steps.',
      },
      {
        id: 'q-odd-even-sort-3',
        quiz_id: 'quiz-ext-odd-even-sort',
        question_text: 'On a single-threaded CPU, odd-even sort is asymptotically faster than bubble sort.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Serially it is still O(n^2); its advantage only appears with parallel execution.',
      },
    ],
  },
  // 14. TERNARY SEARCH
  {
    topic: {
      id: 'ext-ternary-search',
      slug: 'ternary-search',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Ternary Search',
      definition: 'Ternary search divides a sorted array into three parts using two midpoints, discarding two-thirds of the search space per step; a related variant finds the extremum of a unimodal function.',
      importance: 'It illustrates divide-and-conquer beyond the two-way split of binary search and is the standard technique for optimizing unimodal functions.',
      prerequisites: ['binary-search'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(log_3 N)',
      time_complexity_worst: 'O(log_3 N)',
      space_complexity: 'O(1)',
      display_order: 513,
    },
    sections: [
      {
        id: 'sec-ternary-search-1',
        topic_id: 'ext-ternary-search',
        title: 'Concept & Intuition',
        content: `Where binary search splits the range in two, ternary search splits it in **three** using two probe points, $m_1$ and $m_2$. Comparing the target against both lets you throw away two of the three segments each step.

Its more famous use is finding the peak (or valley) of a **unimodal** function — one that strictly rises then strictly falls.

> [!NOTE]
> Despite discarding more per step, ternary search is **not** faster than binary search for sorted-array lookups, because it does more comparisons per step.`,
        display_order: 1,
      },
      {
        id: 'sec-ternary-search-2',
        topic_id: 'ext-ternary-search',
        title: 'How It Works',
        content: `On a sorted array over $[lo, hi]$:
1. Compute $m_1 = lo + (hi - lo)/3$ and $m_2 = hi - (hi - lo)/3$.
2. If arr$[m_1]$ equals the target, return $m_1$; if arr$[m_2]$ equals it, return $m_2$.
3. If target $<$ arr$[m_1]$, recurse on $[lo, m_1 - 1]$.
4. If target $>$ arr$[m_2]$, recurse on $[m_2 + 1, hi]$.
5. Otherwise recurse on the middle third $[m_1 + 1, m_2 - 1]$.

For unimodal optimization, compare arr$[m_1]$ and arr$[m_2]$ and discard the segment that cannot contain the peak.`,
        display_order: 2,
      },
      {
        id: 'sec-ternary-search-3',
        topic_id: 'ext-ternary-search',
        title: 'Complexity Analysis',
        content: `- **Time:** each step removes two-thirds of the range, so it takes $O(\\log_3 n)$ steps.
- **Comparisons:** up to two per step, versus one for binary search.
- **Space:** $O(1)$ iterative, $O(\\log_3 n)$ recursive.

Since $\\log_3 n = \\log_2 n / \\log_2 3$ and each step costs about twice the comparisons, ternary search performs **more** total comparisons than binary search — roughly $2\\log_3 n > \\log_2 n$.`,
        display_order: 3,
      },
      {
        id: 'sec-ternary-search-4',
        topic_id: 'ext-ternary-search',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Do not reach for ternary search expecting it to beat binary search on sorted arrays — it does not.

Good fits:
- Maximizing or minimizing a **unimodal** function (its signature use).

Pitfalls:
- Applying it to a function that is not truly unimodal gives wrong answers.
- Off-by-one errors in the two midpoints and three sub-range boundaries are common.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-ternary-search-py',
        topic_id: 'ext-ternary-search',
        language: 'python',
        is_optimized: true,
        code: `def ternary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        third = (hi - lo) // 3
        m1 = lo + third
        m2 = hi - third
        if arr[m1] == target:
            return m1
        if arr[m2] == target:
            return m2
        if target < arr[m1]:
            hi = m1 - 1
        elif target > arr[m2]:
            lo = m2 + 1
        else:
            lo, hi = m1 + 1, m2 - 1
    return -1`,
        explanation: 'Iterative ternary search on a sorted array using two probe points.',
      },
      {
        id: 'snip-ternary-search-js',
        topic_id: 'ext-ternary-search',
        language: 'javascript',
        is_optimized: true,
        code: `function ternarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const third = Math.floor((hi - lo) / 3);
    const m1 = lo + third;
    const m2 = hi - third;
    if (arr[m1] === target) return m1;
    if (arr[m2] === target) return m2;
    if (target < arr[m1]) hi = m1 - 1;
    else if (target > arr[m2]) lo = m2 + 1;
    else { lo = m1 + 1; hi = m2 - 1; }
  }
  return -1;
}`,
        explanation: 'Splits the sorted range into thirds, discarding two-thirds each iteration.',
      },
      {
        id: 'snip-ternary-search-cpp',
        topic_id: 'ext-ternary-search',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>

int ternarySearch(const std::vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1;
    while (lo <= hi) {
        int third = (hi - lo) / 3;
        int m1 = lo + third;
        int m2 = hi - third;
        if (arr[m1] == target) return m1;
        if (arr[m2] == target) return m2;
        if (target < arr[m1]) hi = m1 - 1;
        else if (target > arr[m2]) lo = m2 + 1;
        else { lo = m1 + 1; hi = m2 - 1; }
    }
    return -1;
}`,
        explanation: 'Iterative ternary search over a sorted vector with two midpoints.',
      },
      {
        id: 'snip-ternary-search-java',
        topic_id: 'ext-ternary-search',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    int ternarySearch(int[] arr, int target) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            int third = (hi - lo) / 3;
            int m1 = lo + third;
            int m2 = hi - third;
            if (arr[m1] == target) return m1;
            if (arr[m2] == target) return m2;
            if (target < arr[m1]) hi = m1 - 1;
            else if (target > arr[m2]) lo = m2 + 1;
            else { lo = m1 + 1; hi = m2 - 1; }
        }
        return -1;
    }
}`,
        explanation: 'Java ternary search returning the index of the target or -1.',
      },
    ],
    quizId: 'quiz-ext-ternary-search',
    quizTitle: 'Ternary Search Quiz',
    quizDescription: 'Test your understanding of ternary search and its comparison with binary search.',
    questions: [
      {
        id: 'q-ternary-search-1',
        quiz_id: 'quiz-ext-ternary-search',
        question_text: 'What is the time complexity of ternary search?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(log_3 n)', 'O(n log n)', 'O(1)'],
        correct_option_index: 1,
        explanation: 'Each step discards two-thirds of the range, yielding a base-3 logarithmic step count.',
      },
      {
        id: 'q-ternary-search-2',
        quiz_id: 'quiz-ext-ternary-search',
        question_text: 'Ternary search performs fewer total comparisons than binary search on a sorted array.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'It does about 2*log_3 n comparisons, which exceeds the log_2 n of binary search.',
      },
      {
        id: 'q-ternary-search-3',
        quiz_id: 'quiz-ext-ternary-search',
        question_text: 'What is the most appropriate use of ternary search?',
        question_type: 'MCQ',
        options: ['Sorting an array', 'Finding the extremum of a unimodal function', 'Searching an unsorted list', 'Hashing keys'],
        correct_option_index: 1,
        explanation: 'Ternary search excels at locating the peak or valley of a unimodal function.',
      },
    ],
  },
  // 15. EXPONENTIAL SEARCH
  {
    topic: {
      id: 'ext-exponential-search',
      slug: 'exponential-search',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Exponential Search',
      definition: 'Exponential search finds a range containing the target by repeatedly doubling an index bound until the value at that bound exceeds the target, then performs a binary search within that bounded range.',
      importance: 'It excels on unbounded or very large sorted collections and when the target lies near the beginning, running in time proportional to the log of the target position rather than the whole array.',
      prerequisites: ['binary-search'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(log I)',
      time_complexity_worst: 'O(log I)',
      space_complexity: 'O(1)',
      display_order: 514,
    },
    sections: [
      {
        id: 'sec-exponential-search-1',
        topic_id: 'ext-exponential-search',
        title: 'Concept & Intuition',
        content: `Imagine searching a sorted list so long you do not even know where it ends. Exponential search first finds a **bracket** for the target by jumping to indices $1, 2, 4, 8, 16, \\ldots$, doubling each time until it overshoots.

Once the target is known to lie between two consecutive powers of two, an ordinary binary search finishes the job within that small window.

> [!NOTE]
> It is also called **doubling search** or **galloping search**, and it powers efficient merges in libraries like Timsort.`,
        display_order: 1,
      },
      {
        id: 'sec-exponential-search-2',
        topic_id: 'ext-exponential-search',
        title: 'How It Works',
        content: `1. If arr$[0]$ is the target, return $0$.
2. Set bound $= 1$; while bound $< n$ and arr$[\\text{bound}] \\le$ target, double the bound.
3. The target, if present, lies in $[\\text{bound}/2, \\min(\\text{bound}, n-1)]$.
4. Run binary search on that sub-range.

The doubling phase locates the region in $O(\\log i)$ probes, where $i$ is the target's index.`,
        display_order: 2,
      },
      {
        id: 'sec-exponential-search-3',
        topic_id: 'ext-exponential-search',
        title: 'Complexity Analysis',
        content: `Let $i$ be the position of the target.

- **Doubling phase:** $O(\\log i)$ steps to bracket the target.
- **Binary search phase:** the bracket has size $\\le i$, so it also costs $O(\\log i)$.
- **Total:** $O(\\log i)$ — potentially far less than $O(\\log n)$ when $i \\ll n$.
- **Space:** $O(1)$.

For targets near the front of a huge array, this is dramatically faster than a full binary search.`,
        display_order: 3,
      },
      {
        id: 'sec-exponential-search-4',
        topic_id: 'ext-exponential-search',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Exponential search requires **sorted** data, just like binary search.

Good fits:
- Unbounded or streamed sorted sequences with unknown length.
- Very large arrays where the target is expected near the start.

Pitfall: when doubling, clamp the upper bound to $n - 1$ before indexing, or you will read out of bounds.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-exponential-search-py',
        topic_id: 'ext-exponential-search',
        language: 'python',
        is_optimized: true,
        code: `def exponential_search(arr, target):
    n = len(arr)
    if n == 0:
        return -1
    if arr[0] == target:
        return 0
    bound = 1
    while bound < n and arr[bound] <= target:
        bound *= 2
    lo, hi = bound // 2, min(bound, n - 1)
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
        explanation: 'Doubles the bound to bracket the target, then binary searches the window.',
      },
      {
        id: 'snip-exponential-search-js',
        topic_id: 'ext-exponential-search',
        language: 'javascript',
        is_optimized: true,
        code: `function exponentialSearch(arr, target) {
  const n = arr.length;
  if (n === 0) return -1;
  if (arr[0] === target) return 0;
  let bound = 1;
  while (bound < n && arr[bound] <= target) bound *= 2;
  let lo = Math.floor(bound / 2);
  let hi = Math.min(bound, n - 1);
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
        explanation: 'Galloping bound-finding followed by a bounded binary search.',
      },
      {
        id: 'snip-exponential-search-cpp',
        topic_id: 'ext-exponential-search',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>

int exponentialSearch(const std::vector<int>& arr, int target) {
    int n = (int)arr.size();
    if (n == 0) return -1;
    if (arr[0] == target) return 0;
    int bound = 1;
    while (bound < n && arr[bound] <= target) bound *= 2;
    int lo = bound / 2, hi = std::min(bound, n - 1);
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
        explanation: 'Brackets the target by doubling, then binary searches the bounded range.',
      },
      {
        id: 'snip-exponential-search-java',
        topic_id: 'ext-exponential-search',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    int exponentialSearch(int[] arr, int target) {
        int n = arr.length;
        if (n == 0) return -1;
        if (arr[0] == target) return 0;
        int bound = 1;
        while (bound < n && arr[bound] <= target) bound *= 2;
        int lo = bound / 2, hi = Math.min(bound, n - 1);
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}`,
        explanation: 'Java exponential search combining a doubling phase with binary search.',
      },
    ],
    quizId: 'quiz-ext-exponential-search',
    quizTitle: 'Exponential Search Quiz',
    quizDescription: 'Check your understanding of doubling-based search over sorted data.',
    questions: [
      {
        id: 'q-exponential-search-1',
        quiz_id: 'quiz-ext-exponential-search',
        question_text: 'What is the time complexity of exponential search when the target is at index i?',
        question_type: 'COMPLEXITY',
        options: ['O(i)', 'O(log i)', 'O(n)', 'O(log n) only'],
        correct_option_index: 1,
        explanation: 'Both the doubling and the bounded binary search phases cost O(log i).',
      },
      {
        id: 'q-exponential-search-2',
        quiz_id: 'quiz-ext-exponential-search',
        question_text: 'Exponential search can be applied to unsorted arrays.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'It relies on ordering for both the doubling comparison and the binary search phase.',
      },
      {
        id: 'q-exponential-search-3',
        quiz_id: 'quiz-ext-exponential-search',
        question_text: 'After the doubling phase overshoots at index bound, which range does binary search examine?',
        question_type: 'MCQ',
        options: ['[0, n-1]', '[bound/2, min(bound, n-1)]', '[bound, n-1]', '[0, bound/2]'],
        correct_option_index: 1,
        explanation: 'The target must lie between the previous bound (bound/2) and the current clamped bound.',
      },
    ],
  },
  // 16. INTERPOLATION SEARCH
  {
    topic: {
      id: 'ext-interpolation-search',
      slug: 'interpolation-search',
      category_id: CATEGORY_IDS.algorithms,
      title: 'Interpolation Search',
      definition: 'Interpolation search improves on binary search for uniformly distributed sorted data by estimating the probable position of the target using linear interpolation between the boundary values rather than always probing the midpoint.',
      importance: 'On uniformly distributed keys it achieves O(log log n) average time, substantially faster than binary search, mimicking how people look up names in a phone book.',
      prerequisites: ['binary-search'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(log log N)',
      time_complexity_worst: 'O(N)',
      space_complexity: 'O(1)',
      display_order: 515,
    },
    sections: [
      {
        id: 'sec-interpolation-search-1',
        topic_id: 'ext-interpolation-search',
        title: 'Concept & Intuition',
        content: `When you look up "Zimmerman" in a phone book, you do not open to the middle — you flip near the end. Interpolation search encodes that intuition: it estimates where the target likely sits based on its value relative to the range's endpoints.

For **uniformly distributed** data, this guess lands very close to the true position, so the search converges far faster than binary search.

> [!NOTE]
> Interpolation search only pays off when keys are roughly evenly spaced.`,
        display_order: 1,
      },
      {
        id: 'sec-interpolation-search-2',
        topic_id: 'ext-interpolation-search',
        title: 'How It Works',
        content: `On a sorted array over $[lo, hi]$, instead of the midpoint use the interpolated probe:
$$\\text{pos} = lo + \\frac{(\\text{target} - \\text{arr}[lo]) \\cdot (hi - lo)}{\\text{arr}[hi] - \\text{arr}[lo]}$$

1. If arr$[\\text{pos}]$ equals the target, return it.
2. If it is smaller, search $[\\text{pos} + 1, hi]$.
3. If it is larger, search $[lo, \\text{pos} - 1]$.

Guard against division by zero when arr$[lo] =$ arr$[hi]$, and confirm the target lies within $[\\text{arr}[lo], \\text{arr}[hi]]$ before probing.`,
        display_order: 2,
      },
      {
        id: 'sec-interpolation-search-3',
        topic_id: 'ext-interpolation-search',
        title: 'Complexity Analysis',
        content: `- **Average case (uniform data):** $O(\\log \\log n)$ — each probe shrinks the range super-linearly.
- **Best case:** $O(1)$ when the first interpolation hits.
- **Worst case:** $O(n)$ when data is highly skewed (e.g. exponentially growing values), because probes barely advance.
- **Space:** $O(1)$.

The dramatic average speedup relies entirely on the uniform-distribution assumption.`,
        display_order: 3,
      },
      {
        id: 'sec-interpolation-search-4',
        topic_id: 'ext-interpolation-search',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> On non-uniform data, interpolation search can degrade to $O(n)$ — worse than binary search's guaranteed $O(\\log n)$.

Good fits:
- Large, sorted, uniformly distributed numeric keys (timestamps, sequential IDs).

Pitfalls:
- Division by zero when arr$[lo] =$ arr$[hi]$.
- Integer overflow in the interpolation product for large values; use wider arithmetic if needed.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-interpolation-search-py',
        topic_id: 'ext-interpolation-search',
        language: 'python',
        is_optimized: true,
        code: `def interpolation_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi and arr[lo] <= target <= arr[hi]:
        if arr[lo] == arr[hi]:
            return lo if arr[lo] == target else -1
        pos = lo + (target - arr[lo]) * (hi - lo) // (arr[hi] - arr[lo])
        if arr[pos] == target:
            return pos
        if arr[pos] < target:
            lo = pos + 1
        else:
            hi = pos - 1
    return -1`,
        explanation: 'Estimates the probe position by interpolation; guards against equal endpoints.',
      },
      {
        id: 'snip-interpolation-search-js',
        topic_id: 'ext-interpolation-search',
        language: 'javascript',
        is_optimized: true,
        code: `function interpolationSearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
    if (arr[lo] === arr[hi]) {
      return arr[lo] === target ? lo : -1;
    }
    const pos = lo + Math.floor(((target - arr[lo]) * (hi - lo)) / (arr[hi] - arr[lo]));
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) lo = pos + 1;
    else hi = pos - 1;
  }
  return -1;
}`,
        explanation: 'Interpolated position search with endpoint and range guards.',
      },
      {
        id: 'snip-interpolation-search-cpp',
        topic_id: 'ext-interpolation-search',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>

int interpolationSearch(const std::vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1;
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (arr[lo] == arr[hi]) {
            return arr[lo] == target ? lo : -1;
        }
        long long pos = lo + (long long)(target - arr[lo]) * (hi - lo) / (arr[hi] - arr[lo]);
        if (arr[pos] == target) return (int)pos;
        if (arr[pos] < target) lo = (int)pos + 1;
        else hi = (int)pos - 1;
    }
    return -1;
}`,
        explanation: 'Uses 64-bit arithmetic for the interpolation to avoid overflow.',
      },
      {
        id: 'snip-interpolation-search-java',
        topic_id: 'ext-interpolation-search',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    int interpolationSearch(int[] arr, int target) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
            if (arr[lo] == arr[hi]) {
                return arr[lo] == target ? lo : -1;
            }
            long pos = lo + (long)(target - arr[lo]) * (hi - lo) / (arr[hi] - arr[lo]);
            if (arr[(int)pos] == target) return (int)pos;
            if (arr[(int)pos] < target) lo = (int)pos + 1;
            else hi = (int)pos - 1;
        }
        return -1;
    }
}`,
        explanation: 'Java interpolation search using long arithmetic to prevent overflow.',
      },
    ],
    quizId: 'quiz-ext-interpolation-search',
    quizTitle: 'Interpolation Search Quiz',
    quizDescription: 'Test your understanding of interpolation search and its distribution assumptions.',
    questions: [
      {
        id: 'q-interpolation-search-1',
        quiz_id: 'quiz-ext-interpolation-search',
        question_text: 'What is the average-case time complexity of interpolation search on uniformly distributed data?',
        question_type: 'COMPLEXITY',
        options: ['O(log n)', 'O(log log n)', 'O(n)', 'O(1)'],
        correct_option_index: 1,
        explanation: 'On uniform data each probe shrinks the range super-linearly, giving O(log log n).',
      },
      {
        id: 'q-interpolation-search-2',
        quiz_id: 'quiz-ext-interpolation-search',
        question_text: 'Interpolation search can degrade to O(n) on highly skewed data.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'When values are non-uniform, probes barely advance, leading to linear worst-case time.',
      },
      {
        id: 'q-interpolation-search-3',
        quiz_id: 'quiz-ext-interpolation-search',
        question_text: 'Which condition must be handled to avoid a division-by-zero error in interpolation search?',
        question_type: 'MCQ',
        options: ['When the array is empty', 'When arr[lo] equals arr[hi]', 'When the target is negative', 'When lo equals hi'],
        correct_option_index: 1,
        explanation: 'The interpolation formula divides by (arr[hi] - arr[lo]), which is zero when they are equal.',
      },
    ],
  },
];
