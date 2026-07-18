import { Topic, LessonSection, CodeSnippet, QuizQuestion } from '@/types';
import { CATEGORY_IDS } from './linear';

// 1. BINARY SEARCH
export const binarySearchTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bb5',
  slug: 'binary-search',
  category_id: CATEGORY_IDS.algorithms,
  title: 'Binary Search',
  definition: 'An efficient search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
  importance: 'Binary search reduces search complexity from linear time O(N) to logarithmic time O(log N), which is extremely important for large scale queries.',
  prerequisites: ['array'],
  difficulty: 'Beginner',
  time_complexity_best: 'O(1)',
  time_complexity_average: 'O(log N)',
  time_complexity_worst: 'O(log N)',
  space_complexity: 'O(1) Iterative / O(log N) Recursive',
  display_order: 5,
};

export const binarySearchSections: LessonSection[] = [
  {
    id: 'sec-bs-1',
    topic_id: binarySearchTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Imagine searching for a name in a physical phone book. You do not start from page 1 and flip through page by page (Linear Search).
Instead, you open the book to the exact middle:
- If the name is alphabetically before the page you opened, you discard the right half of the book.
- If it is after, you discard the left half.
- You repeat this process in the remaining half until you find the name.
This is **Binary Search**. With each step, you cut your remaining work in half!
    `,
    display_order: 1,
  },
  {
    id: 'sec-bs-2',
    topic_id: binarySearchTopic.id,
    title: 'Core Algorithm Mechanics',
    content: `
1. Maintain two pointers: \`low = 0\` and \`high = N - 1\`.
2. Find the midpoint: \`mid = low + (high - low) / 2\` (we use this formula instead of \`(low + high) / 2\` to avoid integer overflow in languages like C/C++/Java).
3. Compare \`arr[mid]\` with the \`target\`:
   - If \`arr[mid] == target\`, return \`mid\`.
   - If \`arr[mid] < target\`, set \`low = mid + 1\` (search right half).
   - If \`arr[mid] > target\`, set \`high = mid - 1\` (search left half).
4. If \`low > high\`, the target is not in the array. Return \`-1\`.
    `,
    display_order: 2,
  },
  {
    id: 'sec-bs-3',
    topic_id: binarySearchTopic.id,
    title: 'Strict Prerequisites & Pitfalls',
    content: `
> [!IMPORTANT]
> **Sorted Requirement**: Binary Search ONLY works on sorted lists. If the list is unsorted, you must sort it first ($O(N \\log N)$) or use Linear Search ($O(N)$).
    `,
    display_order: 3,
  },
  {
    id: 'sec-bs-4',
    topic_id: binarySearchTopic.id,
    title: 'Real-World Analogy',
    content: `
Picture yourself looking up the word "octopus" in a physical dictionary. You would not start at page 1 and read every entry until you hit "octopus" — that would take forever. Instead, you flip the book open somewhere near the middle.

Say you land on a page starting with "M." You know "octopus" comes after "M" alphabetically, so you completely ignore the entire first half of the dictionary. You then flip to the middle of the *remaining* right-hand half. Maybe you land on "R." "Octopus" comes before "R," so now you throw away the right side of that chunk. Every single flip cuts the remaining search space in half — you home in on the word in only a handful of jumps, even in a 2000-page dictionary.

Binary Search is that dictionary trick, formalized. The "book" is a sorted array, the "flip to the middle" is computing \`mid\`, and "throw away half the book" is moving \`low\` or \`high\` inward. That's why it works in $O(\\log N)$ time: doubling the array size only adds one more flip.
    `,
    display_order: 4,
  },
  {
    id: 'sec-bs-5',
    topic_id: binarySearchTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Let's search for the target \`23\` inside the sorted array \`[3, 8, 12, 19, 23, 34, 41, 55]\` (indices 0–7). We use \`low\`, \`high\`, and \`mid = low + (high - low) / 2\`.

**Step 1** — initial window covers the whole array:
\`\`\`
Indices:  0   1   2   3   4   5   6   7
Array:  [ 3,  8, 12, 19, 23, 34, 41, 55]
low=0                                high=7
mid = 0 + (7 - 0)/2 = 3   -> arr[3] = 19
Compare 19 vs 23:  19 < 23  =>  discard left half.
low = mid + 1 = 4
\`\`\`

**Step 2** — window shrinks to indices 4..7:
\`\`\`
Indices:                  4   5   6   7
Window:                 [23, 34, 41, 55]
                        low=4        high=7
mid = 4 + (7 - 4)/2 = 5   -> arr[5] = 34
Compare 34 vs 23:  34 > 23  =>  discard right half.
high = mid - 1 = 4
\`\`\`

**Step 3** — window is a single element at index 4:
\`\`\`
Indices:                  4
Window:                 [23]
                        low=4  high=4
mid = 4 + (4 - 4)/2 = 4   -> arr[4] = 23
Compare 23 vs 23:  MATCH! Return index 4.
\`\`\`

We found the target in just **3 comparisons** on an 8-element array — because $\\log_2 8 = 3$. Notice how each step halved the search window: 8 → 4 → 1.
    `,
    display_order: 5,
  },
  {
    id: 'sec-bs-6',
    topic_id: binarySearchTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
- **Running Binary Search on an unsorted array.** The algorithm silently returns wrong answers because "throw away half" is meaningless without order. *Fix:* sort first, or use Linear Search.
- **Integer overflow in \`(low + high) / 2\`.** In C, C++, or Java with large indices this can overflow \`int\`. *Fix:* use \`mid = low + (high - low) / 2\`.
- **Off-by-one in the loop condition.** Writing \`while (low < high)\` instead of \`while (low <= high)\` misses the case where \`low == high\` and skips the last candidate. *Fix:* use \`<=\` for the closed-interval template.
- **Not moving \`low\` or \`high\` past \`mid\`.** Writing \`low = mid\` or \`high = mid\` (instead of \`mid + 1\` / \`mid - 1\`) can cause an infinite loop when the window shrinks to two elements. *Fix:* always exclude \`mid\` after a mismatch.
- **Assuming Binary Search on floats behaves like on ints.** Floating-point equality is fragile; \`arr[mid] == target\` may never be true. *Fix:* loop while \`high - low > epsilon\`, or search on integer indices.
- **Confusing "lower bound" with "exact match."** Some libraries return the *insertion point* of a missing element, not \`-1\`. *Fix:* read the docs and check the return-value contract before comparing.
    `,
    display_order: 6,
  },
  {
    id: 'sec-bs-7',
    topic_id: binarySearchTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **Number-guessing games ("higher or lower?").** Guessing 50, then 25 or 75, etc., is Binary Search in disguise and finds any number in $[1, 100]$ within 7 guesses.
- **Database indexes and B-Trees.** Under the hood, sorted database indexes use binary-search-like descent to answer \`WHERE id = ?\` queries in $O(\\log N)$ time.
- **\`git bisect\` for finding the commit that introduced a bug.** Git treats "good" and "bad" commits as a sorted range and halves the commit history each step until it pinpoints the offender.
- **Finding the insertion point in a sorted collection.** Functions like Python's \`bisect_left\`, C++'s \`std::lower_bound\`, and Java's \`Collections.binarySearch\` are the workhorse behind sorted inserts, range queries, and set operations.
- **Answering "smallest \`x\` such that predicate(x) is true"** (a.k.a. binary search on the answer). Used in problems like allocating minimum ship capacity, finding the smallest feasible speed, or the classic "aggressive cows" problem.
- **Autocomplete and dictionary lookups.** Sorted word lists let editors and search UIs jump to the matching prefix in logarithmic time instead of scanning every entry.
    `,
    display_order: 7,
  },
];

export const binarySearchSnippets: CodeSnippet[] = [
  {
    id: 'snip-bs-py',
    topic_id: binarySearchTopic.id,
    language: 'python',
    is_optimized: false,
    code: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1

# Recursive Implementation
def binary_search_recursive(arr, low, high, target):
    if low > high:
        return -1
        
    mid = low + (high - low) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, mid + 1, high, target)
    else:
        return binary_search_recursive(arr, low, mid - 1, target)`,
    explanation: 'Iterative and Recursive Binary Search implementations in Python.',
  },
  {
    id: 'snip-bs-js',
    topic_id: binarySearchTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    explanation: 'Standard JavaScript binary search using Math.floor to ensure integer indexes.',
  },
  {
    id: 'snip-bs-c',
    topic_id: binarySearchTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>

int binary_search(int arr[], int size, int target) {
    int low = 0;
    int high = size - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    explanation: 'C implementation with standard array sizing parameters.',
  },
  {
    id: 'snip-bs-cpp',
    topic_id: binarySearchTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <vector>
#include <iostream>

int binarySearch(const std::vector<int>& arr, int target) {
    if (arr.empty()) return -1;
    int low = 0;
    int high = static_cast<int>(arr.size()) - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    explanation: 'C++ implementation utilizing const std::vector references.',
  },
  {
    id: 'snip-bs-java',
    topic_id: binarySearchTopic.id,
    language: 'java',
    is_optimized: false,
    code: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }
}`,
    explanation: 'Java implementation protecting mid computing from integer overflow.',
  },
  {
    id: 'snip-bs-cs',
    topic_id: binarySearchTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `public class BinarySearch {
    public static int Search(int[] arr, int target) {
        int low = 0;
        int high = arr.Length - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
    explanation: 'C# class matching standard static search signature.',
  }
];

export const binarySearchQuestions: QuizQuestion[] = [
  {
    id: 'q-bs-1',
    quiz_id: 'quiz-binary-search',
    question_text: 'What is a critical requirement for using Binary Search?',
    question_type: 'MCQ',
    options: ['The list must contain only integers', 'The list must be sorted', 'The list size must be a power of 2', 'The list must be a linked list'],
    correct_option_index: 1,
    explanation: 'Binary Search depends on comparing the mid value and throwing away half the list. This logic is only sound if the elements are sorted.',
  },
  {
    id: 'q-bs-2',
    quiz_id: 'quiz-binary-search',
    question_text: 'What is the time complexity of Binary Search in the worst case?',
    question_type: 'MCQ',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correct_option_index: 1,
    explanation: 'With each loop, the remaining search window size is halved. This yields O(log N) logarithmic time complexity.',
  },
];
