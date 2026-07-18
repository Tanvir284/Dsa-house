import { Topic, LessonSection, CodeSnippet, QuizQuestion } from '@/types';
import { CATEGORY_IDS } from './linear';

// 1. BUBBLE SORT
export const bubbleSortTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bb6',
  slug: 'bubble-sort',
  category_id: CATEGORY_IDS.algorithms,
  title: 'Bubble Sort',
  definition: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
  importance: 'While inefficient for large arrays, Bubble Sort is highly educational for illustrating the concept of comparison sorting, sorting loops, and swap mechanics.',
  prerequisites: ['array'],
  difficulty: 'Beginner',
  time_complexity_best: 'O(N) (Optimized with early exit flag)',
  time_complexity_average: 'O(N^2)',
  time_complexity_worst: 'O(N^2)',
  space_complexity: 'O(1)',
  display_order: 6,
};

export const bubbleSortSections: LessonSection[] = [
  {
    id: 'sec-bbs-1',
    topic_id: bubbleSortTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Imagine a group of bubbles in a glass of water. The largest bubbles are the lightest/most buoyant and float up to the surface first.
In Bubble Sort, we compare adjacent elements. If the left element is larger than the right element, we swap them.
By doing this pass after pass, the largest remaining unsorted element "bubbles up" to its correct position at the end of the array.
    `,
    display_order: 1,
  },
  {
    id: 'sec-bbs-2',
    topic_id: bubbleSortTopic.id,
    title: 'Optimizations (Early Exit)',
    content: `
A naive Bubble Sort will run $O(N^2)$ loops even if the array is already sorted.
To optimize, we can introduce a boolean flag \`swapped\`.
If a full pass finishes without performing a single swap, it means the array is already fully sorted, and we can immediately break out of the loop.
This optimizes the best-case time complexity to $O(N)$.
    `,
    display_order: 2,
  },
  {
    id: 'sec-bbs-3',
    topic_id: bubbleSortTopic.id,
    title: 'Real-World Analogy',
    content: `
Picture a queue of people at a photo booth who need to line up from shortest to tallest. Nobody has a bird's-eye view, so they use a simple rule: each person only talks to the neighbor directly in front of them. If the person in front is taller, they politely swap places. If not, they stay put.

The queue does one full front-to-back sweep. After the sweep, the tallest person in the whole line has definitely reached the very back — because every taller-than-neighbor comparison pushed them one step further. Nobody knew the tallest person's identity in advance; the process just "floated" them to the end.

Now the back position is locked in, and the queue repeats the same rule on the shorter prefix. Round after round, one more tall person settles into their final spot at the back. That is exactly what Bubble Sort does: each outer pass "bubbles" the next-largest unsorted value to its final resting place.
    `,
    display_order: 3,
  },
  {
    id: 'sec-bbs-4',
    topic_id: bubbleSortTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's sort the array \`[5, 2, 9, 1, 5]\` using optimized Bubble Sort. We compare each adjacent pair (\`arr[j]\` vs \`arr[j+1]\`) and swap if the left is larger.

**Pass 1** — compare positions (0,1), (1,2), (2,3), (3,4):
\`\`\`
Start:    [5, 2, 9, 1, 5]
j=0: 5>2  [2, 5, 9, 1, 5]   swap
j=1: 5<9  [2, 5, 9, 1, 5]   no swap
j=2: 9>1  [2, 5, 1, 9, 5]   swap
j=3: 9>5  [2, 5, 1, 5, 9]   swap  <- 9 has bubbled to the end
End P1:   [2, 5, 1, 5, 9]   swapped=true
\`\`\`

**Pass 2** — the last slot is locked; compare (0,1), (1,2), (2,3):
\`\`\`
Start:    [2, 5, 1, 5, 9]
j=0: 2<5  [2, 5, 1, 5, 9]   no swap
j=1: 5>1  [2, 1, 5, 5, 9]   swap
j=2: 5=5  [2, 1, 5, 5, 9]   no swap (not strictly greater)
End P2:   [2, 1, 5, 5, 9]   swapped=true
\`\`\`

**Pass 3** — last two slots locked; compare (0,1), (1,2):
\`\`\`
Start:    [2, 1, 5, 5, 9]
j=0: 2>1  [1, 2, 5, 5, 9]   swap
j=1: 2<5  [1, 2, 5, 5, 9]   no swap
End P3:   [1, 2, 5, 5, 9]   swapped=true
\`\`\`

**Pass 4** — compare (0,1):
\`\`\`
Start:    [1, 2, 5, 5, 9]
j=0: 1<2  [1, 2, 5, 5, 9]   no swap
End P4:   [1, 2, 5, 5, 9]   swapped=false  -> EARLY EXIT
\`\`\`

Because no swap happened in Pass 4, the array is confirmed sorted and we break out of the outer loop.
    `,
    display_order: 4,
  },
  {
    id: 'sec-bbs-5',
    topic_id: bubbleSortTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
- **Forgetting the early-exit \`swapped\` flag.** Without it, the algorithm always runs $O(N^2)$ passes, even on an already-sorted input. *Fix:* reset \`swapped = false\` at the top of every outer pass and \`break\` when it stays false.
- **Off-by-one in the inner loop bound.** Writing \`for j in range(n)\` instead of \`range(n - i - 1)\` causes an out-of-bounds access at \`arr[j+1]\`. *Fix:* the inner loop must stop at \`n - i - 1\` because the last \`i\` slots are already sorted.
- **Using \`>=\` instead of \`>\` in the comparison.** \`arr[j] >= arr[j+1]\` swaps equal elements, which is wasted work and destroys stability. *Fix:* always use strict \`>\`.
- **Sorting in the wrong direction by accident.** Swapping when \`arr[j] < arr[j+1]\` produces a descending sort. *Fix:* double-check the comparison sign matches the intended order.
- **Swapping with a broken temp variable.** In languages without tuple assignment, writing \`arr[j] = arr[j+1]; arr[j+1] = arr[j];\` loses the original value. *Fix:* use a proper \`temp\` variable or a language-level swap primitive.
- **Assuming Bubble Sort scales.** Running it on an array of a million integers will freeze your program. *Fix:* for anything beyond teaching examples or tiny near-sorted inputs, reach for Merge Sort, Quick Sort, or the standard library sort.
    `,
    display_order: 5,
  },
  {
    id: 'sec-bbs-6',
    topic_id: bubbleSortTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **Teaching sorting fundamentals.** Its adjacent-swap model is the easiest way to introduce loops, invariants, and worst-case analysis in a first algorithms course.
- **Tiny arrays (roughly $N < 20$).** For very small inputs the constant factor of a simple loop can beat the overhead of a recursive divide-and-conquer sort.
- **Nearly-sorted data with occasional out-of-place items.** With the early-exit flag, Bubble Sort finishes in nearly $O(N)$ time when only a handful of neighbors are out of order — e.g. a live leaderboard that just received one new score.
- **Detecting whether an array is already sorted.** A single pass of Bubble Sort that never swaps is a cheap "is this list sorted?" check.
- **Constrained embedded environments.** When code size matters more than speed (tiny microcontrollers, bootloaders), Bubble Sort's few lines of logic and $O(1)$ extra memory make it attractive.
- **Visualizations and animations.** Its predictable, step-by-step swaps make it a favorite for sorting animations and interactive teaching demos.
    `,
    display_order: 6,
  },
];

export const bubbleSortSnippets: CodeSnippet[] = [
  {
    id: 'snip-bbs-py',
    topic_id: bubbleSortTopic.id,
    language: 'python',
    is_optimized: false,
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    explanation: 'Python Bubble Sort featuring optimized early exit.',
  },
  {
    id: 'snip-bbs-js',
    topic_id: bubbleSortTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}`,
    explanation: 'JavaScript optimized bubble sort using local index temp swaps.',
  },
  {
    id: 'snip-bbs-c',
    topic_id: bubbleSortTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>
#include <stdbool.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    explanation: 'C implementation using <stdbool.h> to represent optimized swapped flag states.',
  },
  {
    id: 'snip-bbs-cpp',
    topic_id: bubbleSortTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <vector>
#include <algorithm>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    explanation: 'C++ implementation calling std::swap standard utility.',
  },
  {
    id: 'snip-bbs-java',
    topic_id: bubbleSortTopic.id,
    language: 'java',
    is_optimized: false,
    code: `public class BubbleSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`,
    explanation: 'Java Bubble Sort class implementation.',
  },
  {
    id: 'snip-bbs-cs',
    topic_id: bubbleSortTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `public class BubbleSort {
    public static void Sort(int[] arr) {
        int n = arr.Length;
        for (int i = 0; i < n; i++) {
            bool swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`,
    explanation: 'C# class implementing optimized Bubble Sort.',
  }
];

export const bubbleSortQuestions: QuizQuestion[] = [
  {
    id: 'q-bbs-1',
    quiz_id: 'quiz-bubble-sort',
    question_text: 'What is the worst-case time complexity of Bubble Sort?',
    question_type: 'MCQ',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
    correct_option_index: 2,
    explanation: 'In the worst case (e.g. reverse sorted array), Bubble Sort must perform two nested loops of size N, resulting in O(N^2) comparison operations.',
  },
  {
    id: 'q-bbs-2',
    quiz_id: 'quiz-bubble-sort',
    question_text: 'How does the optimized version of Bubble Sort achieve O(N) time complexity for already sorted arrays?',
    question_type: 'MCQ',
    options: ['By using binary divisions', 'By skipping index checks', 'By exiting early if no swaps occurred in a full pass', 'By sorting from both ends simultaneously'],
    correct_option_index: 2,
    explanation: 'If a pass occurs without any swaps, the list is proved to be sorted. Exiting early yields a single O(N) pass.',
  },
];


// 2. MERGE SORT
export const mergeSortTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bb7',
  slug: 'merge-sort',
  category_id: CATEGORY_IDS.algorithms,
  title: 'Merge Sort',
  definition: 'An out-of-place, stable, divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
  importance: 'Merge Sort guarantees a worst-case performance of O(N log N) and is a prime example of Divide and Conquer algorithm design.',
  prerequisites: ['array'],
  difficulty: 'Intermediate',
  time_complexity_best: 'O(N log N)',
  time_complexity_average: 'O(N log N)',
  time_complexity_worst: 'O(N log N)',
  space_complexity: 'O(N)',
  display_order: 7,
};

export const mergeSortSections: LessonSection[] = [
  {
    id: 'sec-mgs-1',
    topic_id: mergeSortTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Imagine you are sorting a massive pile of exams.
Instead of sorting them all yourself:
1. You split the pile in half and give each half to an assistant.
2. The assistants repeat this: split the pile and pass it down until they have piles of size 1 (which are sorted by definition).
3. Then you combine (Merge) the sorted piles. Since both assistants return sorted subsets, you can quickly merge them by comparing the top exams of both piles.
This is **Merge Sort**!
    `,
    display_order: 1,
  },
  {
    id: 'sec-mgs-2',
    topic_id: mergeSortTopic.id,
    title: 'The Merge Step',
    content: `
Merging two sorted arrays of size $P$ and $Q$ requires building a temporary array. We place pointers at the start of both arrays and repeatedly select the smaller value, pushing it into our temporary target.
This operation takes $O(P + Q)$ linear time.
Because the recursion tree has a depth of $\\log N$, and each level of the tree takes $O(N)$ merge time, the overall time complexity is:
$$\\text{Total Time} = O(N \\log N)$$
    `,
    display_order: 2,
  },
  {
    id: 'sec-mgs-3',
    topic_id: mergeSortTopic.id,
    title: 'Real-World Analogy',
    content: `
Imagine you and a friend are each holding a stack of playing cards that is already sorted from low to high. Your job is to combine both stacks into one final sorted deck. You do not shuffle everything together and re-sort — that would waste all the work you already did.

Instead, you both hold up your top card. Whichever card is smaller gets placed face-down on the shared output pile, and the winner draws their next card. You repeat this until one player runs out; then the other player just drops their remaining cards straight onto the pile. This "compare-the-tops" step is exactly the *merge* routine, and it runs in linear time.

Now zoom out. Where did those two pre-sorted stacks come from? They came from the same trick applied to smaller stacks: two people each merging two even smaller sorted stacks, and so on, all the way down to stacks of size one (which are sorted by default). Merge Sort is that recursive dance: **split until trivial, then merge back up**.
    `,
    display_order: 3,
  },
  {
    id: 'sec-mgs-4',
    topic_id: mergeSortTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's sort \`[5, 2, 9, 1, 5]\` with Merge Sort. First we recursively split the array in half until each piece has one element (the "divide" phase), then we merge sorted pieces back up (the "conquer" phase).

**Divide phase (recursion tree, splitting):**
\`\`\`
                 [5, 2, 9, 1, 5]
                /              \\
         [5, 2]                [9, 1, 5]
         /    \\                /       \\
       [5]   [2]            [9]       [1, 5]
                                       /   \\
                                     [1]   [5]
\`\`\`

**Conquer phase (merging back up), numbered:**

**Step 1** — merge \`[5]\` and \`[2]\` → compare 5 vs 2, pick 2 then 5:
\`\`\`
[5] + [2]  ->  [2, 5]
\`\`\`

**Step 2** — merge \`[1]\` and \`[5]\` → compare 1 vs 5, pick 1 then 5:
\`\`\`
[1] + [5]  ->  [1, 5]
\`\`\`

**Step 3** — merge \`[9]\` and \`[1, 5]\` → compare 9 vs 1 (pick 1), 9 vs 5 (pick 5), drain 9:
\`\`\`
[9] + [1, 5]  ->  [1, 5, 9]
\`\`\`

**Step 4** — merge \`[2, 5]\` and \`[1, 5, 9]\`:
\`\`\`
left=[2,5]  right=[1,5,9]
  i=0,j=0: 2 vs 1 -> take 1, j=1     output: [1]
  i=0,j=1: 2 vs 5 -> take 2, i=1     output: [1, 2]
  i=1,j=1: 5 vs 5 -> take 5 (left, stable), i=2  output: [1, 2, 5]
  i=2 exhausted, drain right: 5, 9              output: [1, 2, 5, 5, 9]
\`\`\`

Final sorted result: \`[1, 2, 5, 5, 9]\`. Notice that at each level of the tree we do at most $O(N)$ work, and the tree has $\\log_2 N$ levels, giving $O(N \\log N)$.
    `,
    display_order: 4,
  },
  {
    id: 'sec-mgs-5',
    topic_id: mergeSortTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
- **Forgetting the base case.** If the recursion doesn't stop at length 0 or 1, it recurses forever and blows the call stack. *Fix:* return early when \`length <= 1\`.
- **Wrong midpoint formula.** Writing \`mid = (low + high) / 2\` can overflow when \`low\` and \`high\` are near \`INT_MAX\` in C/C++/Java. *Fix:* use \`mid = low + (high - low) / 2\`.
- **Off-by-one in the recursive halves.** Passing \`(l, m)\` and \`(m, r)\` instead of \`(l, m)\` and \`(m + 1, r)\` will either duplicate the middle element or infinite-loop. *Fix:* one half ends at \`m\`, the other starts at \`m + 1\`.
- **Losing stability by using \`<\` instead of \`<=\`.** In the merge step, \`if (L[i] < R[j])\` puts equal right-side elements first, breaking Merge Sort's stability guarantee. *Fix:* use \`if (L[i] <= R[j])\`.
- **Forgetting to drain the remaining half.** After the main while-loop exits, one of \`L\` or \`R\` still has leftovers; skipping the drain leaves garbage in the output. *Fix:* always run both trailing while-loops (or a \`concat\`/\`arraycopy\` of the remainder).
- **Ignoring the $O(N)$ auxiliary memory.** On huge arrays or embedded systems, allocating a full copy every merge is fatal. *Fix:* use a single reusable buffer or switch to an in-place algorithm.
    `,
    display_order: 5,
  },
  {
    id: 'sec-mgs-6',
    topic_id: mergeSortTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **External sorting of huge files.** When data is too big to fit in RAM, Merge Sort's ability to merge already-sorted runs from disk (or tape) is the classic solution — this is how databases sort terabyte-sized tables.
- **Sorting linked lists.** Merge Sort works naturally on linked lists in $O(N \\log N)$ time and $O(\\log N)$ stack space, without the random-access pain that hurts Quick Sort here.
- **Stable sort requirements.** Whenever equal keys must keep their original relative order (e.g. sorting a table by "date" while preserving the previous "name" order), Merge Sort is a safe default.
- **Parallel and distributed sorting.** Independent sub-arrays can be sorted on different cores or machines and merged, making Merge Sort a great fit for map-reduce-style pipelines.
- **Predictable worst-case performance.** Real-time or safety-critical systems that cannot tolerate Quick Sort's $O(N^2)$ worst case pick Merge Sort for its guaranteed $O(N \\log N)$.
- **Counting inversions or related divide-and-conquer problems.** Many competitive-programming problems (inversion count, closest pair, skyline) are solved by piggy-backing on Merge Sort's merge step.
    `,
    display_order: 6,
  },
];

export const mergeSortSnippets: CodeSnippet[] = [
  {
    id: 'snip-mgs-py',
    topic_id: mergeSortTopic.id,
    language: 'python',
    is_optimized: false,
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
    explanation: 'Standard divide-and-conquer implementation of Merge Sort in Python.',
  },
  {
    id: 'snip-mgs-js',
    topic_id: mergeSortTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    explanation: 'JavaScript recursive merge sort implementation.',
  },
  {
    id: 'snip-mgs-c',
    topic_id: mergeSortTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;
    
    int* L = (int*)malloc(n1 * sizeof(int));
    int* R = (int*)malloc(n2 * sizeof(int));
    if (L == NULL || R == NULL) { free(L); free(R); return; }
    
    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    
    i = 0; j = 0; k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    
    free(L);
    free(R);
}

void merge_sort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        merge_sort(arr, l, m);
        merge_sort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
    explanation: 'C implementation managing heap buffer allocations for divided arrays.',
  },
  {
    id: 'snip-mgs-cpp',
    topic_id: mergeSortTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <vector>

void merge(std::vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    std::vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
    explanation: 'C++ implementations mapping sub-vectors.',
  },
  {
    id: 'snip-mgs-java',
    topic_id: mergeSortTopic.id,
    language: 'java',
    is_optimized: false,
    code: `public class MergeSort {
    public static void sort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    private static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];
        
        System.arraycopy(arr, l, L, 0, n1);
        for (int j = 0; j < n2; ++j) {
            R[j] = arr[m + 1 + j];
        }
        
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}`,
    explanation: 'Java implementation leveraging System.arraycopy for array allocation copy speeds.',
  },
  {
    id: 'snip-mgs-cs',
    topic_id: mergeSortTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `using System;

public class MergeSort {
    public static void Sort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            Sort(arr, l, m);
            Sort(arr, m + 1, r);
            Merge(arr, l, m, r);
        }
    }

    private static void Merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];
        Array.Copy(arr, l, L, 0, n1);
        Array.Copy(arr, m + 1, R, 0, n2);
        
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}`,
    explanation: 'C# implementation of Merge Sort using Array.Copy.',
  }
];

export const mergeSortQuestions: QuizQuestion[] = [
  {
    id: 'q-mgs-1',
    quiz_id: 'quiz-merge-sort',
    question_text: 'What is the auxiliary space complexity of Merge Sort?',
    question_type: 'MCQ',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correct_option_index: 2,
    explanation: 'Merging two halves requires allocating a temporary array to store the merged items, resulting in O(N) auxiliary space.',
  },
  {
    id: 'q-mgs-2',
    quiz_id: 'quiz-merge-sort',
    question_text: 'Which is a true statement about Merge Sort?',
    question_type: 'MCQ',
    options: ['It is an in-place sort', 'It is unstable', 'It runs in O(N log N) worst-case time', 'It is adaptive'],
    correct_option_index: 2,
    explanation: 'Merge Sort is a stable, out-of-place sort that guarantees O(N log N) time complexity for any input permutation (best, average, and worst case).',
  },
];


// 3. QUICK SORT
export const quickSortTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bb8',
  slug: 'quick-sort',
  category_id: CATEGORY_IDS.algorithms,
  title: 'Quick Sort',
  definition: 'An in-place, divide-and-conquer sorting algorithm that selects a "pivot" element, partitions the array around it (smaller to the left, larger to the right), and recursively sorts the sub-arrays.',
  importance: 'Quick Sort is highly efficient in practice due to small constant factors and good cache locality. It is the default sorting algorithm under the hood in many programming language libraries.',
  prerequisites: ['array'],
  difficulty: 'Intermediate',
  time_complexity_best: 'O(N log N)',
  time_complexity_average: 'O(N log N)',
  time_complexity_worst: 'O(N^2) (When pivot selection is poor on sorted data)',
  space_complexity: 'O(log N) average / O(N) worst (Recursion call stack)',
  display_order: 8,
};

export const quickSortSections: LessonSection[] = [
  {
    id: 'sec-qks-1',
    topic_id: quickSortTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Imagine arranging a line of students by height:
1. Pick one student as a reference (the **Pivot**).
2. Move all students shorter than the pivot to their left, and all students taller to their right.
3. The pivot is now in its exact final sorted position.
4. Recursively repeat this process for the groups on the left and the right.
This is **Quick Sort**!
    `,
    display_order: 1,
  },
  {
    id: 'sec-qks-2',
    topic_id: quickSortTopic.id,
    title: 'Partition Schemes & Pivot Selection',
    content: `
The core of Quick Sort is the partition step. The two most common schemes are:
- **Lomuto Partitioning**: The pivot is usually selected as the last element. We scan with a pointer and swap smaller elements to the front.
- **Hoare Partitioning**: Uses two pointers starting at both ends that move towards each other until they find elements that are out of order, and then swaps them. It is generally faster than Lomuto's in practice because it performs fewer swaps on average.

To avoid the worst-case $O(N^2)$ (which occurs when the array is already sorted and we naive-select the last element as the pivot), we can select the pivot randomly or choose the **median of three** elements (first, middle, last).
    `,
    display_order: 2,
  },
  {
    id: 'sec-qks-3',
    topic_id: quickSortTopic.id,
    title: 'Real-World Analogy',
    content: `
Imagine a teacher organizing a room full of students by exam score. She grabs one student at random and calls them the "pivot." Then she gives a single instruction: "Everyone with a score lower than the pivot, please move to the left side of the room. Everyone higher, move to the right." After a bit of shuffling, the pivot student is standing in the exact position they would occupy in a fully sorted line — even though the two crowds around them are still messy.

Now the teacher forgets about the pivot (they're locked in) and repeats the same trick on each side of the room independently: pick a new pivot in the left crowd, partition it; pick a new pivot in the right crowd, partition it. Each round shrinks the disorderly groups and locks in one more student's final position.

The magic is that no giant merged pile is ever needed — every rearrangement happens in place, right where the students are standing. That's why Quick Sort is so fast in practice: partitioning is a simple scan-and-swap, and picking a good pivot means each round chops the remaining work roughly in half.
    `,
    display_order: 3,
  },
  {
    id: 'sec-qks-4',
    topic_id: quickSortTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's sort \`[5, 2, 9, 1, 5]\` using Lomuto partitioning with the **last element as pivot**. We track \`i\` = "boundary of the ≤ pivot region" and scan \`j\` from \`low\` to \`high - 1\`.

**Call 1** — quickSort(arr, low=0, high=4), pivot = arr[4] = 5. Start with i = -1.
\`\`\`
Array: [5, 2, 9, 1, 5]   pivot=5
j=0: arr[0]=5, 5<=5 -> i=0, swap arr[0]&arr[0]  [5, 2, 9, 1, 5]
j=1: arr[1]=2, 2<=5 -> i=1, swap arr[1]&arr[1]  [5, 2, 9, 1, 5]
j=2: arr[2]=9, 9>5  -> skip                     [5, 2, 9, 1, 5]
j=3: arr[3]=1, 1<=5 -> i=2, swap arr[2]&arr[3]  [5, 2, 1, 9, 5]
Place pivot: swap arr[i+1=3] & arr[4]           [5, 2, 1, 5, 9]
Pivot index returned: 3  (the 5 at index 3 is now locked)
\`\`\`

Recursion tree so far:
\`\`\`
                 qs(0,4) pivot=5 -> partition idx 3
                 /                    \\
           qs(0,2)                 qs(4,4)  base case (empty)
\`\`\`

**Call 2** — quickSort(arr, low=0, high=2) on \`[5, 2, 1, _, _]\`, pivot = arr[2] = 1. Start i = -1.
\`\`\`
Array: [5, 2, 1, 5, 9]   pivot=1  (scanning indices 0..1)
j=0: arr[0]=5, 5>1  -> skip                     [5, 2, 1, 5, 9]
j=1: arr[1]=2, 2>1  -> skip                     [5, 2, 1, 5, 9]
Place pivot: swap arr[i+1=0] & arr[2]           [1, 2, 5, 5, 9]
Pivot index returned: 0  (the 1 is locked)
\`\`\`

**Call 3** — quickSort(arr, low=-1, high=-1): base case (low >= high), return.

**Call 4** — quickSort(arr, low=1, high=2) on \`[_, 2, 5, _, _]\`, pivot = arr[2] = 5. i = 0.
\`\`\`
Array: [1, 2, 5, 5, 9]   pivot=5  (scanning index 1)
j=1: arr[1]=2, 2<=5 -> i=1, swap arr[1]&arr[1]  [1, 2, 5, 5, 9]
Place pivot: swap arr[i+1=2] & arr[2]           [1, 2, 5, 5, 9]
Pivot index returned: 2
\`\`\`

Remaining sub-calls (\`qs(1,1)\` and \`qs(3,2)\`) are all base cases.

Final sorted array: \`[1, 2, 5, 5, 9]\`.

Full recursion tree:
\`\`\`
                     qs(0,4) pivot=5 @ idx3
                    /                    \\
              qs(0,2) pivot=1 @ idx0     qs(4,4) base
             /                \\
        qs(-1,-1) base    qs(1,2) pivot=5 @ idx2
                          /             \\
                    qs(1,1) base    qs(3,2) base
\`\`\`
    `,
    display_order: 4,
  },
  {
    id: 'sec-qks-5',
    topic_id: quickSortTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
- **Always picking the first or last element as the pivot.** On sorted or reverse-sorted input this creates one empty partition and one of size $N-1$, degrading to $O(N^2)$. *Fix:* pick a random pivot, or use median-of-three.
- **Missing the base case.** Forgetting \`if (low < high)\` sends the recursion into negative indices and stack overflow. *Fix:* always guard the recursive call.
- **Recursing on the pivot itself.** Calling \`sort(arr, low, pi)\` and \`sort(arr, pi, high)\` (instead of \`pi - 1\` / \`pi + 1\`) infinite-loops because the pivot is already in its final place. *Fix:* exclude the pivot from both halves.
- **Not handling duplicates.** With Lomuto and many equal keys, one partition stays huge and degrades to $O(N^2)$. *Fix:* switch to three-way (Dutch national flag) partitioning when duplicates are common.
- **Deep recursion on the larger side first.** Recursing on the bigger partition can push the call stack past $O(\\log N)$. *Fix:* recurse on the smaller partition and loop on the larger one (tail-call trick).
- **Assuming Quick Sort is stable.** The partitioning step swaps elements over long distances and can reorder equal keys. *Fix:* if stability matters (e.g. multi-key sort), use Merge Sort instead.
    `,
    display_order: 5,
  },
  {
    id: 'sec-qks-6',
    topic_id: quickSortTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **General-purpose in-memory sorting.** With randomized pivots, Quick Sort is the go-to sort for arrays that fit in RAM, thanks to its low constant factor and excellent CPU cache behavior.
- **Standard library implementations.** Real-world library sorts (like C's \`qsort\`, C++'s \`std::sort\` via introsort, or Java's primitive sort) are built on Quick Sort with fallbacks — a strong endorsement of its practical speed.
- **Memory-constrained environments.** Because Quick Sort sorts in place with only $O(\\log N)$ average stack space, it fits on devices that cannot afford Merge Sort's $O(N)$ buffer.
- **Selection / quickselect problems.** Partitioning is the heart of Quickselect, which finds the k-th smallest element in expected $O(N)$ time — used in medians, percentiles, and top-K queries.
- **Randomized algorithms and streaming approximations.** The random-pivot idea makes Quick Sort a natural teaching example — and building block — for probabilistic algorithms.
- **Anywhere worst-case guarantees are NOT required.** When average-case throughput matters more than worst-case latency (batch jobs, offline analytics), Quick Sort typically wins races against Merge Sort and Heap Sort.
    `,
    display_order: 6,
  },
];

export const quickSortSnippets: CodeSnippet[] = [
  {
    id: 'snip-qks-py',
    topic_id: quickSortTopic.id,
    language: 'python',
    is_optimized: false,
    code: `def quick_sort(arr, low, high):
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    # Lomuto partition scheme
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    explanation: 'Python Quick Sort using the Lomuto partitioning scheme.',
  },
  {
    id: 'snip-qks-js',
    topic_id: quickSortTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pIndex = partition(arr, low, high);
        quickSort(arr, low, pIndex - 1);
        quickSort(arr, pIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
    explanation: 'JavaScript implementation of in-place Lomuto Quick Sort.',
  },
  {
    id: 'snip-qks-c',
    topic_id: quickSortTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quick_sort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}`,
    explanation: 'C implementation using pointers to perform swaps in-place.',
  },
  {
    id: 'snip-qks-cpp',
    topic_id: quickSortTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <vector>
#include <algorithm>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; ++j) {
        if (arr[j] <= pivot) {
            std::swap(arr[++i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    explanation: 'C++ standard implementation utilizing reference vector swaps.',
  },
  {
    id: 'snip-qks-java',
    topic_id: quickSortTopic.id,
    language: 'java',
    is_optimized: false,
    code: `public class QuickSort {
    public static void sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}`,
    explanation: 'Java Quick Sort utility class implementation.',
  },
  {
    id: 'snip-qks-cs',
    topic_id: quickSortTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `public class QuickSort {
    public static void Sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = Partition(arr, low, high);
            Sort(arr, low, pi - 1);
            Sort(arr, pi + 1, high);
        }
    }

    private static int Partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp2 = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp2;
        return i + 1;
    }
}`,
    explanation: 'C# class mapping static in-place Quick Sort execution.',
  }
];

export const quickSortQuestions: QuizQuestion[] = [
  {
    id: 'q-qks-1',
    quiz_id: 'quiz-quick-sort',
    question_text: 'Which pivot selection strategy is best suited to prevent O(N^2) worst case on already sorted arrays?',
    question_type: 'MCQ',
    options: ['Always select the first element', 'Always select the last element', 'Select a random element or use median of three', 'Pivot selection does not affect complexity'],
    correct_option_index: 2,
    explanation: 'Choosing the first or last element as the pivot on sorted data creates unbalanced partitions of size 0 and N-1, leading to O(N^2) worst case. Randomized pivot selection ensures balanced splits with high probability.',
  },
];
