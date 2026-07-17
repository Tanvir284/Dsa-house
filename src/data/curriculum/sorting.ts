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
  space_complexity: 'O(log N) (Recursion call stack)',
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
        if (arr[j] < pivot) {
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
