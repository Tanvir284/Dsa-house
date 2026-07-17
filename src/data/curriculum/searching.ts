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
    int low = 0;
    int high = arr.size() - 1;
    
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
