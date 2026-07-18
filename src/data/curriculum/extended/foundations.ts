import { CurriculumModule } from '@/types';
import { CATEGORY_IDS } from '../linear';

export const foundationsModules: CurriculumModule[] = [
  // 1. BIG-O NOTATION
  {
    topic: {
      id: 'ext-big-o-notation',
      slug: 'big-o-notation',
      category_id: CATEGORY_IDS.foundations,
      title: 'Big-O Notation',
      definition: 'Big-O notation is an asymptotic upper bound that describes how the running time or space of an algorithm grows relative to the size of its input as the input tends to infinity.',
      importance: 'It provides a machine-independent way to compare algorithms, letting engineers predict scalability and choose the right approach before writing a single line of production code.',
      prerequisites: [],
      difficulty: 'Beginner',
      time_complexity_best: 'N/A (analytical tool)',
      time_complexity_average: 'N/A (analytical tool)',
      time_complexity_worst: 'N/A (analytical tool)',
      space_complexity: 'N/A (analytical tool)',
      display_order: 100,
    },
    sections: [
      {
        id: 'sec-big-o-notation-1',
        topic_id: 'ext-big-o-notation',
        title: 'Concept & Intuition',
        content: `Big-O answers a single question: **as the input grows, how fast does the work grow?** We deliberately ignore constant factors and lower-order terms because, for large inputs, the dominant term dictates behavior.

For example, $3n^2 + 5n + 100$ is simply $O(n^2)$. The $5n$ and the $100$ become irrelevant once $n$ is large enough.

> [!NOTE]
> Big-O describes the **upper bound** (worst-case growth). Related notations $\\Omega$ (lower bound) and $\\Theta$ (tight bound) complete the picture.`,
        display_order: 1,
      },
      {
        id: 'sec-big-o-notation-2',
        topic_id: 'ext-big-o-notation',
        title: 'How It Works',
        content: `Formally, $f(n) = O(g(n))$ if there exist positive constants $c$ and $n_0$ such that $0 \\le f(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$.

To find the Big-O of code:
1. Count the operations as a function of $n$.
2. Drop constant multipliers ($2n \\to n$).
3. Keep only the fastest-growing term.

Nested loops multiply ($O(n) \\times O(n) = O(n^2)$); sequential blocks add ($O(n) + O(n) = O(n)$).`,
        display_order: 2,
      },
      {
        id: 'sec-big-o-notation-3',
        topic_id: 'ext-big-o-notation',
        title: 'Common Growth Classes',
        content: `Ordered from slowest to fastest growth:

- $O(1)$ — constant (hash lookup)
- $O(\\log n)$ — logarithmic (binary search)
- $O(n)$ — linear (single scan)
- $O(n \\log n)$ — linearithmic (merge sort)
- $O(n^2)$ — quadratic (nested loops)
- $O(2^n)$ — exponential (naive subset enumeration)
- $O(n!)$ — factorial (brute-force permutations)

Doubling $n$ multiplies an $O(n^2)$ algorithm's work by $4$, but only adds one step to an $O(\\log n)$ one.`,
        display_order: 3,
      },
      {
        id: 'sec-big-o-notation-4',
        topic_id: 'ext-big-o-notation',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Big-O hides constants. A $O(n)$ algorithm with a huge constant can be slower than an $O(n^2)$ one for small $n$. Always consider the real input range.

Common mistakes:
- Assuming worst-case always occurs (average-case may differ dramatically, e.g. quicksort).
- Forgetting that hidden operations (string concatenation, list copies) can add complexity.
- Ignoring space complexity when memory is the bottleneck.

Use Big-O for **scalability decisions**, but profile real code for **micro-optimizations**.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-big-o-notation-py',
        topic_id: 'ext-big-o-notation',
        language: 'python',
        is_optimized: true,
        code: `def has_duplicate(nums):
    # O(n) time, O(n) space using a set
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False`,
        explanation: 'Linear-time duplicate check trading O(n) space for speed versus an O(n^2) nested loop.',
      },
      {
        id: 'snip-big-o-notation-js',
        topic_id: 'ext-big-o-notation',
        language: 'javascript',
        is_optimized: true,
        code: `function hasDuplicate(nums) {
  // O(n) time, O(n) space
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}`,
        explanation: 'A Set gives O(1) average membership tests, making the overall scan O(n).',
      },
      {
        id: 'snip-big-o-notation-cpp',
        topic_id: 'ext-big-o-notation',
        language: 'cpp',
        is_optimized: true,
        code: `#include <unordered_set>
#include <vector>

bool hasDuplicate(const std::vector<int>& nums) {
    // O(n) time, O(n) space
    std::unordered_set<int> seen;
    for (int x : nums) {
        if (seen.count(x)) return true;
        seen.insert(x);
    }
    return false;
}`,
        explanation: 'unordered_set offers amortized O(1) insert/lookup, keeping the loop linear.',
      },
      {
        id: 'snip-big-o-notation-java',
        topic_id: 'ext-big-o-notation',
        language: 'java',
        is_optimized: true,
        code: `import java.util.HashSet;
import java.util.Set;

class Solution {
    // O(n) time, O(n) space
    boolean hasDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int x : nums) {
            if (!seen.add(x)) return true;
        }
        return false;
    }
}`,
        explanation: 'HashSet.add returns false when the element already exists, detecting duplicates in one pass.',
      },
    ],
    quizId: 'quiz-ext-big-o-notation',
    quizTitle: 'Big-O Notation Quiz',
    quizDescription: 'Test your understanding of asymptotic analysis and growth rates.',
    questions: [
      {
        id: 'q-big-o-notation-1',
        quiz_id: 'quiz-ext-big-o-notation',
        question_text: 'What is the simplified Big-O of the function 3n^2 + 5n + 100?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n^2)', 'O(n^3)', 'O(1)'],
        correct_option_index: 1,
        explanation: 'We keep only the fastest-growing term and drop constants, leaving O(n^2).',
      },
      {
        id: 'q-big-o-notation-2',
        quiz_id: 'quiz-ext-big-o-notation',
        question_text: 'Big-O notation describes an upper bound on growth as input size approaches infinity.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Big-O is an asymptotic upper bound; Omega and Theta describe lower and tight bounds.',
      },
      {
        id: 'q-big-o-notation-3',
        quiz_id: 'quiz-ext-big-o-notation',
        question_text: 'Two independent loops that each run n times, placed one after another, have what combined complexity?',
        question_type: 'MCQ',
        options: ['O(n^2)', 'O(2^n)', 'O(n)', 'O(log n)'],
        correct_option_index: 2,
        explanation: 'Sequential blocks add: O(n) + O(n) = O(2n) = O(n). Only nesting multiplies.',
      },
    ],
  },
  // 2. SPACE COMPLEXITY
  {
    topic: {
      id: 'ext-space-complexity',
      slug: 'space-complexity',
      category_id: CATEGORY_IDS.foundations,
      title: 'Space Complexity',
      definition: 'Space complexity measures the total amount of memory an algorithm needs as a function of input size, including the input storage, auxiliary data structures, and the recursion call stack.',
      importance: 'Memory is finite; understanding space complexity prevents out-of-memory failures and guides trade-offs where extra memory can dramatically reduce running time.',
      prerequisites: ['big-o-notation'],
      difficulty: 'Beginner',
      time_complexity_best: 'N/A (analytical tool)',
      time_complexity_average: 'N/A (analytical tool)',
      time_complexity_worst: 'N/A (analytical tool)',
      space_complexity: 'N/A (analytical tool)',
      display_order: 101,
    },
    sections: [
      {
        id: 'sec-space-complexity-1',
        topic_id: 'ext-space-complexity',
        title: 'Concept & Intuition',
        content: `**Space complexity** counts how memory usage scales with input size $n$. We usually focus on **auxiliary space** — the extra memory an algorithm allocates beyond the input itself.

An in-place sort that swaps elements uses $O(1)$ auxiliary space, while merge sort needs $O(n)$ extra space for its temporary buffers.`,
        display_order: 1,
      },
      {
        id: 'sec-space-complexity-2',
        topic_id: 'ext-space-complexity',
        title: 'How It Works',
        content: `Total space $= $ input space $+$ auxiliary space. We express it with the same Big-O rules used for time.

Sources of space:
- **Variables and fixed data** — usually $O(1)$.
- **Dynamic structures** — an array or hash map holding $n$ items is $O(n)$.
- **Recursion stack** — each active call consumes a frame. A recursion depth of $d$ costs $O(d)$ stack space.`,
        display_order: 2,
      },
      {
        id: 'sec-space-complexity-3',
        topic_id: 'ext-space-complexity',
        title: 'The Recursion Stack',
        content: `A subtle but critical point: recursion is **not** free in space.

> [!IMPORTANT]
> A recursive function with depth $n$ uses $O(n)$ stack space even if it allocates no explicit data structures.

For balanced binary tree traversal the stack depth is $O(\\log n)$; for a degenerate (skewed) tree it can reach $O(n)$, risking a stack overflow.`,
        display_order: 3,
      },
      {
        id: 'sec-space-complexity-4',
        topic_id: 'ext-space-complexity',
        title: 'Time-Space Trade-offs',
        content: `Many optimizations spend memory to save time — for example, memoization caches results in $O(n)$ space to avoid recomputation.

> [!WARNING]
> Do not forget the output when it is large. Building an $O(n)$ result array is $O(n)$ space even if the algorithm is otherwise in-place.

Common goal: reduce auxiliary space to $O(1)$ (constant) when memory is constrained, e.g. embedded systems.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-space-complexity-py',
        topic_id: 'ext-space-complexity',
        language: 'python',
        is_optimized: true,
        code: `def reverse_in_place(arr):
    # O(1) auxiliary space: swap ends toward the middle
    i, j = 0, len(arr) - 1
    while i < j:
        arr[i], arr[j] = arr[j], arr[i]
        i += 1
        j -= 1
    return arr`,
        explanation: 'Reversing by swapping in place uses only two index variables: O(1) auxiliary space.',
      },
      {
        id: 'snip-space-complexity-js',
        topic_id: 'ext-space-complexity',
        language: 'javascript',
        is_optimized: true,
        code: `function reverseInPlace(arr) {
  // O(1) auxiliary space
  let i = 0, j = arr.length - 1;
  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }
  return arr;
}`,
        explanation: 'Two-pointer swap mutates the array directly, avoiding an O(n) copy.',
      },
      {
        id: 'snip-space-complexity-cpp',
        topic_id: 'ext-space-complexity',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <utility>

void reverseInPlace(std::vector<int>& arr) {
    // O(1) auxiliary space
    int i = 0, j = (int)arr.size() - 1;
    while (i < j) {
        std::swap(arr[i++], arr[j--]);
    }
}`,
        explanation: 'std::swap exchanges elements without extra allocation, giving constant auxiliary space.',
      },
      {
        id: 'snip-space-complexity-java',
        topic_id: 'ext-space-complexity',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    // O(1) auxiliary space
    void reverseInPlace(int[] arr) {
        int i = 0, j = arr.length - 1;
        while (i < j) {
            int tmp = arr[i];
            arr[i++] = arr[j];
            arr[j--] = tmp;
        }
    }
}`,
        explanation: 'A single temp variable enables the swap, keeping auxiliary memory constant.',
      },
    ],
    quizId: 'quiz-ext-space-complexity',
    quizTitle: 'Space Complexity Quiz',
    quizDescription: 'Assess your grasp of memory usage and time-space trade-offs.',
    questions: [
      {
        id: 'q-space-complexity-1',
        quiz_id: 'quiz-ext-space-complexity',
        question_text: 'What is the auxiliary space complexity of reversing an array in place with two pointers?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correct_option_index: 0,
        explanation: 'Only a constant number of index/temp variables are used regardless of array size.',
      },
      {
        id: 'q-space-complexity-2',
        quiz_id: 'quiz-ext-space-complexity',
        question_text: 'A recursive function with recursion depth n uses O(n) stack space even without explicit data structures.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Each active call keeps a stack frame, so depth n implies O(n) stack space.',
      },
      {
        id: 'q-space-complexity-3',
        quiz_id: 'quiz-ext-space-complexity',
        question_text: 'Why does memoization often increase space complexity?',
        question_type: 'MCQ',
        options: ['It duplicates the input array', 'It caches computed results to avoid recomputation', 'It uses more CPU registers', 'It disables garbage collection'],
        correct_option_index: 1,
        explanation: 'Memoization stores previously computed answers, trading extra memory for reduced time.',
      },
    ],
  },
  // 3. TIME COMPLEXITY
  {
    topic: {
      id: 'ext-time-complexity',
      slug: 'time-complexity',
      category_id: CATEGORY_IDS.foundations,
      title: 'Time Complexity',
      definition: 'Time complexity quantifies the number of primitive operations an algorithm performs as a function of input size, abstracting away hardware to describe how running time scales.',
      importance: 'It is the primary tool for predicting whether an algorithm will finish within time limits and for comparing candidate solutions before implementation.',
      prerequisites: ['big-o-notation'],
      difficulty: 'Beginner',
      time_complexity_best: 'N/A (analytical tool)',
      time_complexity_average: 'N/A (analytical tool)',
      time_complexity_worst: 'N/A (analytical tool)',
      space_complexity: 'N/A (analytical tool)',
      display_order: 102,
    },
    sections: [
      {
        id: 'sec-time-complexity-1',
        topic_id: 'ext-time-complexity',
        title: 'Concept & Intuition',
        content: `**Time complexity** counts the number of basic steps (comparisons, arithmetic, assignments) an algorithm executes relative to input size $n$. Rather than measure seconds — which depend on hardware — we measure *growth*.

If doubling the input roughly doubles the steps, the algorithm is linear, $O(n)$. If it quadruples, it is quadratic, $O(n^2)$.`,
        display_order: 1,
      },
      {
        id: 'sec-time-complexity-2',
        topic_id: 'ext-time-complexity',
        title: 'Best, Average, and Worst Case',
        content: `Time complexity has three flavors:
- **Best case** ($\\Omega$): the fewest steps, e.g. linear search finding the target first.
- **Worst case** ($O$): the most steps, e.g. the target absent or last.
- **Average case** ($\\Theta$): expected steps over all inputs.

Quicksort is $O(n \\log n)$ on average but $O(n^2)$ in the worst case, which is why worst-case analysis matters for guarantees.`,
        display_order: 2,
      },
      {
        id: 'sec-time-complexity-3',
        topic_id: 'ext-time-complexity',
        title: 'Analyzing Loops',
        content: `To derive time complexity, examine loop structure:

> [!NOTE]
> A loop from $1$ to $n$ is $O(n)$. Two nested such loops are $O(n^2)$. A loop that halves the range each step (\`i *= 2\`) is $O(\\log n)$.

Recursive algorithms are analyzed via **recurrence relations**, e.g. $T(n) = 2T(n/2) + O(n)$ solves to $O(n \\log n)$.`,
        display_order: 3,
      },
      {
        id: 'sec-time-complexity-4',
        topic_id: 'ext-time-complexity',
        title: 'Practical Estimation',
        content: `A useful rule of thumb: modern CPUs handle roughly $10^8$ simple operations per second in a contest setting.

> [!IMPORTANT]
> If $n \\le 10^5$, an $O(n^2)$ solution ($10^{10}$ ops) is likely too slow, but $O(n \\log n)$ is comfortable.

Pitfall: hidden costs. Repeated string concatenation or list slicing inside a loop can silently add a factor of $n$.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-time-complexity-py',
        topic_id: 'ext-time-complexity',
        language: 'python',
        is_optimized: true,
        code: `def count_pairs_with_sum(nums, target):
    # O(n) time using a hash map instead of O(n^2) nested loops
    seen = {}
    count = 0
    for x in nums:
        count += seen.get(target - x, 0)
        seen[x] = seen.get(x, 0) + 1
    return count`,
        explanation: 'Counting pairs summing to target in one linear pass instead of a quadratic double loop.',
      },
      {
        id: 'snip-time-complexity-js',
        topic_id: 'ext-time-complexity',
        language: 'javascript',
        is_optimized: true,
        code: `function countPairsWithSum(nums, target) {
  // O(n) time
  const seen = new Map();
  let count = 0;
  for (const x of nums) {
    count += seen.get(target - x) || 0;
    seen.set(x, (seen.get(x) || 0) + 1);
  }
  return count;
}`,
        explanation: 'A Map records counts so each complement lookup is O(1), yielding linear time.',
      },
      {
        id: 'snip-time-complexity-cpp',
        topic_id: 'ext-time-complexity',
        language: 'cpp',
        is_optimized: true,
        code: `#include <unordered_map>
#include <vector>

long long countPairsWithSum(const std::vector<int>& nums, int target) {
    // O(n) time
    std::unordered_map<int, int> seen;
    long long count = 0;
    for (int x : nums) {
        auto it = seen.find(target - x);
        if (it != seen.end()) count += it->second;
        seen[x]++;
    }
    return count;
}`,
        explanation: 'Hash-map complement lookups keep the pair count linear rather than quadratic.',
      },
      {
        id: 'snip-time-complexity-java',
        topic_id: 'ext-time-complexity',
        language: 'java',
        is_optimized: true,
        code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    // O(n) time
    long countPairsWithSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        long count = 0;
        for (int x : nums) {
            count += seen.getOrDefault(target - x, 0);
            seen.merge(x, 1, Integer::sum);
        }
        return count;
    }
}`,
        explanation: 'getOrDefault plus merge give O(1) updates, making the pair-counting loop O(n).',
      },
    ],
    quizId: 'quiz-ext-time-complexity',
    quizTitle: 'Time Complexity Quiz',
    quizDescription: 'Check your ability to analyze loops, recurrences, and cases.',
    questions: [
      {
        id: 'q-time-complexity-1',
        quiz_id: 'quiz-ext-time-complexity',
        question_text: 'A loop that multiplies its counter by 2 each iteration (i *= 2) until reaching n has what time complexity?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correct_option_index: 1,
        explanation: 'The counter takes values 1, 2, 4, ..., so it runs about log2(n) times.',
      },
      {
        id: 'q-time-complexity-2',
        quiz_id: 'quiz-ext-time-complexity',
        question_text: 'Quicksort has an average time complexity of O(n log n) but a worst case of O(n^2).',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Poor pivot choices can degrade quicksort to O(n^2), though average behavior is O(n log n).',
      },
      {
        id: 'q-time-complexity-3',
        quiz_id: 'quiz-ext-time-complexity',
        question_text: 'The recurrence T(n) = 2T(n/2) + O(n) solves to which complexity?',
        question_type: 'MCQ',
        options: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(log n)'],
        correct_option_index: 2,
        explanation: 'This is the classic merge-sort recurrence, which resolves to O(n log n).',
      },
    ],
  },
  // 4. MASTER THEOREM
  {
    topic: {
      id: 'ext-master-theorem',
      slug: 'master-theorem',
      category_id: CATEGORY_IDS.foundations,
      title: 'Master Theorem',
      definition: 'The Master Theorem is a formula that provides the asymptotic solution to divide-and-conquer recurrences of the form T(n) = a·T(n/b) + f(n) by comparing f(n) against n^(log_b a).',
      importance: 'It lets you instantly determine the complexity of most divide-and-conquer algorithms (merge sort, binary search, Karatsuba) without expanding the recurrence tree by hand.',
      prerequisites: ['time-complexity', 'logarithms-in-computer-science'],
      difficulty: 'Intermediate',
      time_complexity_best: 'N/A (analytical tool)',
      time_complexity_average: 'N/A (analytical tool)',
      time_complexity_worst: 'N/A (analytical tool)',
      space_complexity: 'N/A (analytical tool)',
      display_order: 103,
    },
    sections: [
      {
        id: 'sec-master-theorem-1',
        topic_id: 'ext-master-theorem',
        title: 'Concept & Intuition',
        content: `Divide-and-conquer algorithms split a problem of size $n$ into $a$ subproblems of size $n/b$, then combine the results with work $f(n)$. This gives the recurrence

$$T(n) = a\\,T(n/b) + f(n).$$

The **Master Theorem** compares the cost of the recursive calls, captured by $n^{\\log_b a}$, against the combine cost $f(n)$ to find which dominates.`,
        display_order: 1,
      },
      {
        id: 'sec-master-theorem-2',
        topic_id: 'ext-master-theorem',
        title: 'The Three Cases',
        content: `Let $c = \\log_b a$. Compare $f(n)$ to $n^c$:

1. **Case 1** — $f(n) = O(n^{c-\\epsilon})$ (leaves dominate): $T(n) = \\Theta(n^c)$.
2. **Case 2** — $f(n) = \\Theta(n^c)$ (balanced): $T(n) = \\Theta(n^c \\log n)$.
3. **Case 3** — $f(n) = \\Omega(n^{c+\\epsilon})$ and regularity holds (root dominates): $T(n) = \\Theta(f(n))$.`,
        display_order: 2,
      },
      {
        id: 'sec-master-theorem-3',
        topic_id: 'ext-master-theorem',
        title: 'Worked Examples',
        content: `- **Merge sort**: $T(n) = 2T(n/2) + O(n)$. Here $c = \\log_2 2 = 1$ and $f(n) = \\Theta(n^1)$ → Case 2 → $\\Theta(n \\log n)$.
- **Binary search**: $T(n) = T(n/2) + O(1)$. Here $c = \\log_2 1 = 0$ and $f(n) = \\Theta(n^0)$ → Case 2 → $\\Theta(\\log n)$.
- **Karatsuba**: $T(n) = 3T(n/2) + O(n)$. Here $c = \\log_2 3 \\approx 1.585 > 1$ → Case 1 → $\\Theta(n^{1.585})$.`,
        display_order: 3,
      },
      {
        id: 'sec-master-theorem-4',
        topic_id: 'ext-master-theorem',
        title: 'Limitations & Pitfalls',
        content: `> [!WARNING]
> The Master Theorem does **not** apply when subproblem sizes are unequal (e.g. $T(n) = T(n/3) + T(2n/3) + n$), when $a$ or $b$ are not constants, or when $f(n)$ falls in the "gap" between cases (e.g. $f(n) = n^c \\log n$).

For such recurrences use the **recursion-tree method** or the **Akra–Bazzi** generalization instead.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-master-theorem-py',
        topic_id: 'ext-master-theorem',
        language: 'python',
        is_optimized: true,
        code: `import math

def master_theorem(a, b, f_exp):
    # Recurrence T(n) = a*T(n/b) + Theta(n^f_exp); returns the case & result
    c = math.log(a, b)
    if f_exp < c:
        return f"Case 1: Theta(n^{c:.3f})"
    elif abs(f_exp - c) < 1e-9:
        return f"Case 2: Theta(n^{c:.3f} log n)"
    else:
        return f"Case 3: Theta(n^{f_exp})"

print(master_theorem(2, 2, 1))  # merge sort -> Case 2`,
        explanation: 'Classifies a divide-and-conquer recurrence by comparing the combine exponent to log_b(a).',
      },
      {
        id: 'snip-master-theorem-js',
        topic_id: 'ext-master-theorem',
        language: 'javascript',
        is_optimized: true,
        code: `function masterTheorem(a, b, fExp) {
  // T(n) = a*T(n/b) + Theta(n^fExp)
  const c = Math.log(a) / Math.log(b);
  if (fExp < c - 1e-9) return \`Case 1: Theta(n^\${c.toFixed(3)})\`;
  if (Math.abs(fExp - c) < 1e-9) return \`Case 2: Theta(n^\${c.toFixed(3)} log n)\`;
  return \`Case 3: Theta(n^\${fExp})\`;
}

console.log(masterTheorem(2, 2, 1)); // merge sort -> Case 2`,
        explanation: 'Computes c = log_b(a) and reports which Master Theorem case applies.',
      },
      {
        id: 'snip-master-theorem-cpp',
        topic_id: 'ext-master-theorem',
        language: 'cpp',
        is_optimized: true,
        code: `#include <cmath>
#include <string>

std::string masterTheorem(double a, double b, double fExp) {
    // T(n) = a*T(n/b) + Theta(n^fExp)
    double c = std::log(a) / std::log(b);
    if (fExp < c - 1e-9) return "Case 1: Theta(n^" + std::to_string(c) + ")";
    if (std::abs(fExp - c) < 1e-9) return "Case 2: Theta(n^c log n)";
    return "Case 3: Theta(n^" + std::to_string(fExp) + ")";
}`,
        explanation: 'Determines the Master Theorem case via the critical exponent c = log_b(a).',
      },
      {
        id: 'snip-master-theorem-java',
        topic_id: 'ext-master-theorem',
        language: 'java',
        is_optimized: true,
        code: `class MasterTheorem {
    // T(n) = a*T(n/b) + Theta(n^fExp)
    static String classify(double a, double b, double fExp) {
        double c = Math.log(a) / Math.log(b);
        if (fExp < c - 1e-9) return "Case 1: Theta(n^" + c + ")";
        if (Math.abs(fExp - c) < 1e-9) return "Case 2: Theta(n^c log n)";
        return "Case 3: Theta(n^" + fExp + ")";
    }
}`,
        explanation: 'Compares the combine exponent against log_b(a) to select the correct case.',
      },
    ],
    quizId: 'quiz-ext-master-theorem',
    quizTitle: 'Master Theorem Quiz',
    quizDescription: 'Evaluate your ability to solve divide-and-conquer recurrences.',
    questions: [
      {
        id: 'q-master-theorem-1',
        quiz_id: 'quiz-ext-master-theorem',
        question_text: 'Applying the Master Theorem to T(n) = 2T(n/2) + O(n) gives which result?',
        question_type: 'COMPLEXITY',
        options: ['Theta(n)', 'Theta(n log n)', 'Theta(n^2)', 'Theta(log n)'],
        correct_option_index: 1,
        explanation: 'log_2(2)=1 and f(n)=Theta(n^1), so Case 2 applies, giving Theta(n log n).',
      },
      {
        id: 'q-master-theorem-2',
        quiz_id: 'quiz-ext-master-theorem',
        question_text: 'The Master Theorem can solve any recurrence, including those with unequal subproblem sizes.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'It requires equal-sized subproblems (n/b); unequal splits need Akra–Bazzi or recursion trees.',
      },
      {
        id: 'q-master-theorem-3',
        quiz_id: 'quiz-ext-master-theorem',
        question_text: 'For T(n) = 3T(n/2) + O(n), which case of the Master Theorem applies?',
        question_type: 'MCQ',
        options: ['Case 1 (leaves dominate)', 'Case 2 (balanced)', 'Case 3 (root dominates)', 'Not applicable'],
        correct_option_index: 0,
        explanation: 'log_2(3) ~ 1.585 > 1 = exponent of f(n), so the leaf work dominates (Case 1).',
      },
    ],
  },
  // 5. BIT MANIPULATION BASICS
  {
    topic: {
      id: 'ext-bit-manipulation-basics',
      slug: 'bit-manipulation-basics',
      category_id: CATEGORY_IDS.foundations,
      title: 'Bit Manipulation Basics',
      definition: 'Bit manipulation is the practice of directly operating on the individual binary digits of an integer using bitwise operators to achieve fast, memory-efficient computation.',
      importance: 'Bitwise tricks power low-level systems, compression, cryptography, and competitive programming, often replacing loops or arithmetic with single constant-time instructions.',
      prerequisites: ['bitwise-operations-and-or-xor'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1) per operation',
      time_complexity_average: 'O(1) per operation',
      time_complexity_worst: 'O(1) per operation',
      space_complexity: 'O(1)',
      display_order: 104,
    },
    sections: [
      {
        id: 'sec-bit-manipulation-basics-1',
        topic_id: 'ext-bit-manipulation-basics',
        title: 'Concept & Intuition',
        content: `Every integer is stored as a sequence of **bits**. Bit manipulation treats a number as an array of on/off switches, letting us read, set, or clear any position in $O(1)$.

Because the CPU executes bitwise operations as single instructions, these tricks are extremely fast and are used everywhere from flags and permissions to graphics and hashing.`,
        display_order: 1,
      },
      {
        id: 'sec-bit-manipulation-basics-2',
        topic_id: 'ext-bit-manipulation-basics',
        title: 'Core Single-Bit Operations',
        content: `Given a number \`x\` and a bit position \`i\` (0-indexed from the right):

- **Get bit**: \`(x >> i) & 1\`
- **Set bit**: \`x | (1 << i)\`
- **Clear bit**: \`x & ~(1 << i)\`
- **Toggle bit**: \`x ^ (1 << i)\`

The expression \`1 << i\` builds a **mask** with a single 1 at position $i$ (i.e. $2^i$).`,
        display_order: 2,
      },
      {
        id: 'sec-bit-manipulation-basics-3',
        topic_id: 'ext-bit-manipulation-basics',
        title: 'Useful Identities',
        content: `Several classic tricks appear constantly:

> [!NOTE]
> \`x & (x - 1)\` clears the **lowest set bit**. Repeatedly applying it counts set bits (Brian Kernighan's algorithm).

- \`x & (-x)\` isolates the lowest set bit.
- \`x & (x - 1) == 0\` tests whether $x$ is a power of two (for $x > 0$).
- Multiplying/dividing by $2^k$ equals shifting left/right by $k$.`,
        display_order: 3,
      },
      {
        id: 'sec-bit-manipulation-basics-4',
        topic_id: 'ext-bit-manipulation-basics',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Shifting by an amount $\\ge$ the type width is **undefined behavior** in C/C++ and produces surprising results in Java. In JavaScript, bitwise operators coerce operands to **32-bit signed** integers, so \`1 << 31\` becomes negative.

Also beware sign extension: a right shift of a negative number is **arithmetic** (fills with the sign bit) in many languages, unlike the logical \`>>>\` shift.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-bit-manipulation-basics-py',
        topic_id: 'ext-bit-manipulation-basics',
        language: 'python',
        is_optimized: true,
        code: `def get_bit(x, i):   return (x >> i) & 1
def set_bit(x, i):   return x | (1 << i)
def clear_bit(x, i): return x & ~(1 << i)
def toggle_bit(x, i): return x ^ (1 << i)

# Count set bits via Brian Kernighan's trick
def count_bits(x):
    count = 0
    while x:
        x &= x - 1   # clear lowest set bit
        count += 1
    return count`,
        explanation: 'Single-bit get/set/clear/toggle plus popcount by repeatedly clearing the lowest set bit.',
      },
      {
        id: 'snip-bit-manipulation-basics-js',
        topic_id: 'ext-bit-manipulation-basics',
        language: 'javascript',
        is_optimized: true,
        code: `const getBit = (x, i) => (x >> i) & 1;
const setBit = (x, i) => x | (1 << i);
const clearBit = (x, i) => x & ~(1 << i);
const toggleBit = (x, i) => x ^ (1 << i);

function countBits(x) {
  let count = 0;
  while (x) { x &= x - 1; count++; }
  return count;
}`,
        explanation: 'Bit primitives plus Brian Kernighan popcount; note JS treats operands as 32-bit ints.',
      },
      {
        id: 'snip-bit-manipulation-basics-cpp',
        topic_id: 'ext-bit-manipulation-basics',
        language: 'cpp',
        is_optimized: true,
        code: `int getBit(int x, int i)   { return (x >> i) & 1; }
int setBit(int x, int i)   { return x | (1 << i); }
int clearBit(int x, int i) { return x & ~(1 << i); }
int toggleBit(int x, int i){ return x ^ (1 << i); }

int countBits(unsigned x) {
    int count = 0;
    while (x) { x &= x - 1; ++count; }  // clear lowest set bit
    return count;
}`,
        explanation: 'Constant-time bit operations and a Kernighan popcount using unsigned to avoid sign issues.',
      },
      {
        id: 'snip-bit-manipulation-basics-java',
        topic_id: 'ext-bit-manipulation-basics',
        language: 'java',
        is_optimized: true,
        code: `class Bits {
    static int getBit(int x, int i)    { return (x >> i) & 1; }
    static int setBit(int x, int i)    { return x | (1 << i); }
    static int clearBit(int x, int i)  { return x & ~(1 << i); }
    static int toggleBit(int x, int i) { return x ^ (1 << i); }

    static int countBits(int x) {
        int count = 0;
        while (x != 0) { x &= x - 1; count++; }
        return count;
    }
}`,
        explanation: 'Java bit helpers and Kernighan popcount; loop count equals number of set bits.',
      },
    ],
    quizId: 'quiz-ext-bit-manipulation-basics',
    quizTitle: 'Bit Manipulation Basics Quiz',
    quizDescription: 'Test your knowledge of single-bit operations and classic tricks.',
    questions: [
      {
        id: 'q-bit-manipulation-basics-1',
        quiz_id: 'quiz-ext-bit-manipulation-basics',
        question_text: 'Which expression sets the i-th bit of x to 1?',
        question_type: 'MCQ',
        options: ['x & (1 << i)', 'x | (1 << i)', 'x ^ (1 << i)', 'x & ~(1 << i)'],
        correct_option_index: 1,
        explanation: 'OR-ing with a mask having a 1 at position i forces that bit on without altering others.',
      },
      {
        id: 'q-bit-manipulation-basics-2',
        quiz_id: 'quiz-ext-bit-manipulation-basics',
        question_text: 'The expression x & (x - 1) clears the lowest set bit of x.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Subtracting 1 flips the lowest set bit and the zeros below it; AND-ing clears that bit.',
      },
      {
        id: 'q-bit-manipulation-basics-3',
        quiz_id: 'quiz-ext-bit-manipulation-basics',
        question_text: 'What is the time complexity of counting set bits with the Brian Kernighan algorithm, where k is the number of set bits?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(k)', 'O(n^2)', 'O(2^n)'],
        correct_option_index: 1,
        explanation: 'Each iteration clears exactly one set bit, so it loops k times, one per set bit.',
      },
    ],
  },
  // 6. BIT MASKING
  {
    topic: {
      id: 'ext-bit-masking',
      slug: 'bit-masking',
      category_id: CATEGORY_IDS.foundations,
      title: 'Bit Masking',
      definition: 'Bit masking uses an integer whose bits represent a set of elements, enabling subset representation, membership tests, and set operations through single bitwise instructions.',
      importance: 'It is the backbone of bitmask dynamic programming, subset enumeration, and compact flag storage, turning exponential state into cheap integer arithmetic.',
      prerequisites: ['bit-manipulation-basics'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) per set operation',
      time_complexity_average: 'O(2^n) to enumerate all subsets',
      time_complexity_worst: 'O(2^n) to enumerate all subsets',
      space_complexity: 'O(1) per mask',
      display_order: 105,
    },
    sections: [
      {
        id: 'sec-bit-masking-1',
        topic_id: 'ext-bit-masking',
        title: 'Concept & Intuition',
        content: `A **bitmask** encodes a subset of up to $n$ elements in a single integer: if bit $i$ is 1, element $i$ is in the set. With $n$ elements there are exactly $2^n$ possible masks, matching the number of subsets.

This representation lets set operations become bitwise operations, which are far faster than manipulating hash sets or boolean arrays.`,
        display_order: 1,
      },
      {
        id: 'sec-bit-masking-2',
        topic_id: 'ext-bit-masking',
        title: 'Set Operations as Bit Operations',
        content: `Let masks $A$ and $B$ represent two sets:

- **Union**: \`A | B\`
- **Intersection**: \`A & B\`
- **Difference** ($A \\setminus B$): \`A & ~B\`
- **Symmetric difference**: \`A ^ B\`
- **Membership of element i**: \`(A >> i) & 1\`
- **Add element i**: \`A | (1 << i)\`
- **Size** (cardinality): population count of $A$.`,
        display_order: 2,
      },
      {
        id: 'sec-bit-masking-3',
        topic_id: 'ext-bit-masking',
        title: 'Enumerating Subsets',
        content: `To iterate every subset of an $n$-element universe, loop \`mask\` from $0$ to $2^n - 1$.

> [!IMPORTANT]
> To enumerate all **submasks** of a specific mask $m$ efficiently, use the idiom \`for (int s = m; s; s = (s - 1) & m)\`. This visits every subset of $m$ in $O(\\text{number of submasks})$ time.

Summed over all masks, submask enumeration costs $O(3^n)$ total.`,
        display_order: 3,
      },
      {
        id: 'sec-bit-masking-4',
        topic_id: 'ext-bit-masking',
        title: 'Use Cases & Pitfalls',
        content: `Bitmask DP solves problems like the Traveling Salesman ($O(2^n \\cdot n^2)$) and assignment problems by using the mask as a DP state.

> [!WARNING]
> A 32-bit int only holds masks for $n \\le 31$ elements safely; use 64-bit (\`long\`/\`long long\`) for up to 63. Beyond that, exponential blowup makes bitmasking impractical.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-bit-masking-py',
        topic_id: 'ext-bit-masking',
        language: 'python',
        is_optimized: true,
        code: `def subsets(elements):
    n = len(elements)
    result = []
    for mask in range(1 << n):          # 2^n masks
        subset = [elements[i] for i in range(n) if (mask >> i) & 1]
        result.append(subset)
    return result

# Enumerate submasks of a given mask m
def submasks(m):
    s = m
    while s > 0:
        yield s
        s = (s - 1) & m
    yield 0`,
        explanation: 'Generates the power set via all 2^n masks and enumerates submasks with the (s-1)&m idiom.',
      },
      {
        id: 'snip-bit-masking-js',
        topic_id: 'ext-bit-masking',
        language: 'javascript',
        is_optimized: true,
        code: `function subsets(elements) {
  const n = elements.length;
  const result = [];
  for (let mask = 0; mask < (1 << n); mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) subset.push(elements[i]);
    }
    result.push(subset);
  }
  return result;
}`,
        explanation: 'Builds every subset by testing each bit of masks from 0 to 2^n - 1.',
      },
      {
        id: 'snip-bit-masking-cpp',
        topic_id: 'ext-bit-masking',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

vector<vector<int>> subsets(const vector<int>& e) {
    int n = e.size();
    vector<vector<int>> res;
    for (int mask = 0; mask < (1 << n); ++mask) {
        vector<int> sub;
        for (int i = 0; i < n; ++i)
            if (mask & (1 << i)) sub.push_back(e[i]);
        res.push_back(sub);
    }
    return res;
}`,
        explanation: 'Enumerates all 2^n subsets; bit i of mask decides membership of element i.',
      },
      {
        id: 'snip-bit-masking-java',
        topic_id: 'ext-bit-masking',
        language: 'java',
        is_optimized: true,
        code: `import java.util.ArrayList;
import java.util.List;

class Subsets {
    static List<List<Integer>> subsets(int[] e) {
        int n = e.length;
        List<List<Integer>> res = new ArrayList<>();
        for (int mask = 0; mask < (1 << n); mask++) {
            List<Integer> sub = new ArrayList<>();
            for (int i = 0; i < n; i++)
                if ((mask & (1 << i)) != 0) sub.add(e[i]);
            res.add(sub);
        }
        return res;
    }
}`,
        explanation: 'Iterates every mask and collects elements whose corresponding bit is set.',
      },
    ],
    quizId: 'quiz-ext-bit-masking',
    quizTitle: 'Bit Masking Quiz',
    quizDescription: 'Assess your understanding of subset encoding and set operations via bitmasks.',
    questions: [
      {
        id: 'q-bit-masking-1',
        quiz_id: 'quiz-ext-bit-masking',
        question_text: 'How many distinct bitmasks exist for a universe of n elements?',
        question_type: 'MCQ',
        options: ['n', 'n^2', '2^n', 'n!'],
        correct_option_index: 2,
        explanation: 'Each of the n bits is independently 0 or 1, giving 2^n masks (one per subset).',
      },
      {
        id: 'q-bit-masking-2',
        quiz_id: 'quiz-ext-bit-masking',
        question_text: 'The bitwise AND of two masks (A & B) represents the intersection of the two sets.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'A bit is 1 in A & B only if it is present in both sets, exactly the intersection.',
      },
      {
        id: 'q-bit-masking-3',
        quiz_id: 'quiz-ext-bit-masking',
        question_text: 'What is the total time complexity of enumerating all submasks of every mask over an n-element universe?',
        question_type: 'COMPLEXITY',
        options: ['O(2^n)', 'O(3^n)', 'O(n^2)', 'O(n!)'],
        correct_option_index: 1,
        explanation: 'Summing submask counts across all masks yields the classic O(3^n) bound.',
      },
    ],
  },
  // 7. BITWISE OPERATIONS: AND, OR, XOR
  {
    topic: {
      id: 'ext-bitwise-operations-and-or-xor',
      slug: 'bitwise-operations-and-or-xor',
      category_id: CATEGORY_IDS.foundations,
      title: 'Bitwise Operations: AND, OR, XOR',
      definition: 'The fundamental bitwise operators AND (&), OR (|), XOR (^), and NOT (~) combine integers bit-by-bit according to boolean logic, forming the primitives for all bit manipulation.',
      importance: 'Every higher-level bit trick, mask, and hardware operation is built from these operators, so mastering their truth tables is essential to low-level and algorithmic programming.',
      prerequisites: [],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(1)',
      time_complexity_worst: 'O(1)',
      space_complexity: 'O(1)',
      display_order: 106,
    },
    sections: [
      {
        id: 'sec-bitwise-operations-and-or-xor-1',
        topic_id: 'ext-bitwise-operations-and-or-xor',
        title: 'The Four Operators',
        content: `Bitwise operators apply boolean logic to each pair of bits:

- **AND** (\`&\`): 1 only if **both** bits are 1.
- **OR** (\`|\`): 1 if **at least one** bit is 1.
- **XOR** (\`^\`): 1 if the bits **differ**.
- **NOT** (\`~\`): flips every bit (unary).

They execute in a single CPU cycle regardless of the value.`,
        display_order: 1,
      },
      {
        id: 'sec-bitwise-operations-and-or-xor-2',
        topic_id: 'ext-bitwise-operations-and-or-xor',
        title: 'Truth Tables',
        content: `For single bits $a$ and $b$:

| a | b | a&b | a\\|b | a^b |
|---|---|-----|------|-----|
| 0 | 0 | 0   | 0    | 0   |
| 0 | 1 | 0   | 1    | 1   |
| 1 | 0 | 0   | 1    | 1   |
| 1 | 1 | 1   | 1    | 0   |

Note that XOR is addition modulo 2, which underlies parity and error-detection schemes.`,
        display_order: 2,
      },
      {
        id: 'sec-bitwise-operations-and-or-xor-3',
        topic_id: 'ext-bitwise-operations-and-or-xor',
        title: 'Key Properties of XOR',
        content: `XOR has algebraic properties that power many algorithms:

- **Self-inverse**: $x \\oplus x = 0$.
- **Identity**: $x \\oplus 0 = x$.
- **Commutative & associative**: order does not matter.

> [!NOTE]
> These properties let you find the single non-repeating element in an array where every other element appears twice: XOR everything together and the pairs cancel.`,
        display_order: 3,
      },
      {
        id: 'sec-bitwise-operations-and-or-xor-4',
        topic_id: 'ext-bitwise-operations-and-or-xor',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Do not confuse bitwise \`&\`/\`|\` with logical \`&&\`/\`||\`. Logical operators short-circuit and return booleans; bitwise operators evaluate every bit and both operands.

Also, \`~x\` in two's complement equals \`-(x + 1)\`, which surprises beginners expecting a plain "flip to positive" result.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-bitwise-operations-and-or-xor-py',
        topic_id: 'ext-bitwise-operations-and-or-xor',
        language: 'python',
        is_optimized: true,
        code: `def single_number(nums):
    # Every element appears twice except one; XOR cancels the pairs
    result = 0
    for x in nums:
        result ^= x
    return result

print(single_number([4, 1, 2, 1, 2]))  # 4`,
        explanation: 'Finds the unique element in O(n) time and O(1) space using XOR self-cancellation.',
      },
      {
        id: 'snip-bitwise-operations-and-or-xor-js',
        topic_id: 'ext-bitwise-operations-and-or-xor',
        language: 'javascript',
        is_optimized: true,
        code: `function singleNumber(nums) {
  let result = 0;
  for (const x of nums) result ^= x;
  return result;
}

console.log(singleNumber([4, 1, 2, 1, 2])); // 4`,
        explanation: 'XOR-ing all numbers cancels duplicate pairs, leaving the lone element.',
      },
      {
        id: 'snip-bitwise-operations-and-or-xor-cpp',
        topic_id: 'ext-bitwise-operations-and-or-xor',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

int singleNumber(const vector<int>& nums) {
    int result = 0;
    for (int x : nums) result ^= x;  // pairs cancel to 0
    return result;
}`,
        explanation: 'Accumulates XOR across the vector; identical values annihilate, exposing the unique one.',
      },
      {
        id: 'snip-bitwise-operations-and-or-xor-java',
        topic_id: 'ext-bitwise-operations-and-or-xor',
        language: 'java',
        is_optimized: true,
        code: `class Solution {
    int singleNumber(int[] nums) {
        int result = 0;
        for (int x : nums) result ^= x;
        return result;
    }
}`,
        explanation: 'A single XOR fold identifies the element that lacks a duplicate.',
      },
    ],
    quizId: 'quiz-ext-bitwise-operations-and-or-xor',
    quizTitle: 'Bitwise AND, OR, XOR Quiz',
    quizDescription: 'Check your grasp of the fundamental bitwise operators and their properties.',
    questions: [
      {
        id: 'q-bitwise-operations-and-or-xor-1',
        quiz_id: 'quiz-ext-bitwise-operations-and-or-xor',
        question_text: 'What is the result of 6 ^ 6 (XOR)?',
        question_type: 'MCQ',
        options: ['6', '12', '0', '1'],
        correct_option_index: 2,
        explanation: 'XOR is self-inverse: any value XOR-ed with itself yields 0.',
      },
      {
        id: 'q-bitwise-operations-and-or-xor-2',
        quiz_id: 'quiz-ext-bitwise-operations-and-or-xor',
        question_text: 'XOR is both commutative and associative.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'These properties allow XOR-ing elements in any order, which enables the single-number trick.',
      },
      {
        id: 'q-bitwise-operations-and-or-xor-3',
        quiz_id: 'quiz-ext-bitwise-operations-and-or-xor',
        question_text: 'Which operator yields 1 for a bit position only when both operands have a 1 there?',
        question_type: 'MCQ',
        options: ['OR (|)', 'XOR (^)', 'AND (&)', 'NOT (~)'],
        correct_option_index: 2,
        explanation: 'AND outputs 1 only when both input bits are 1.',
      },
    ],
  },
  // 8. EUCLIDEAN ALGORITHM (GCD)
  {
    topic: {
      id: 'ext-euclidean-algorithm-gcd',
      slug: 'euclidean-algorithm-gcd',
      category_id: CATEGORY_IDS.foundations,
      title: 'Euclidean Algorithm (GCD)',
      definition: 'The Euclidean algorithm computes the greatest common divisor of two integers by repeatedly replacing the larger number with the remainder of dividing it by the smaller until the remainder is zero.',
      importance: 'GCD is foundational to fraction reduction, modular arithmetic, cryptography (RSA), and many number-theory problems, and the Euclidean method computes it in logarithmic time.',
      prerequisites: ['modular-arithmetic'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(log(min(a, b)))',
      time_complexity_worst: 'O(log(min(a, b)))',
      space_complexity: 'O(1) iterative, O(log n) recursive',
      display_order: 107,
    },
    sections: [
      {
        id: 'sec-euclidean-algorithm-gcd-1',
        topic_id: 'ext-euclidean-algorithm-gcd',
        title: 'Concept & Intuition',
        content: `The **greatest common divisor** $\\gcd(a, b)$ is the largest integer dividing both $a$ and $b$. The Euclidean algorithm rests on a simple insight:

$$\\gcd(a, b) = \\gcd(b, a \\bmod b).$$

Any common divisor of $a$ and $b$ also divides their remainder, so we can shrink the problem repeatedly until one argument becomes 0.`,
        display_order: 1,
      },
      {
        id: 'sec-euclidean-algorithm-gcd-2',
        topic_id: 'ext-euclidean-algorithm-gcd',
        title: 'How It Works',
        content: `Starting from $(a, b)$ we iterate:

$$(a, b) \\to (b, a \\bmod b) \\to \\dots \\to (g, 0).$$

When the second value reaches 0, the first value is $\\gcd(a, b)$.

Example: $\\gcd(48, 18) \\to \\gcd(18, 12) \\to \\gcd(12, 6) \\to \\gcd(6, 0) = 6$.`,
        display_order: 2,
      },
      {
        id: 'sec-euclidean-algorithm-gcd-3',
        topic_id: 'ext-euclidean-algorithm-gcd',
        title: 'Complexity & LCM',
        content: `The number of steps is $O(\\log \\min(a, b))$; the worst case occurs with **consecutive Fibonacci numbers**, linking the algorithm to the golden ratio.

> [!NOTE]
> Once you have the GCD, compute the least common multiple as $\\text{lcm}(a, b) = \\dfrac{a \\cdot b}{\\gcd(a, b)}$. Divide before multiplying to avoid overflow: \`a / gcd * b\`.`,
        display_order: 3,
      },
      {
        id: 'sec-euclidean-algorithm-gcd-4',
        topic_id: 'ext-euclidean-algorithm-gcd',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Define $\\gcd(0, 0)$ carefully — many libraries return 0. Also handle negatives by taking absolute values, since the mathematical GCD is non-negative.

The recursive form is elegant but uses $O(\\log n)$ stack space; prefer the iterative loop in performance-critical or deeply nested code.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-euclidean-algorithm-gcd-py',
        topic_id: 'ext-euclidean-algorithm-gcd',
        language: 'python',
        is_optimized: true,
        code: `def gcd(a, b):
    a, b = abs(a), abs(b)
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    if a == 0 or b == 0:
        return 0
    return a // gcd(a, b) * b   # divide first to avoid overflow`,
        explanation: 'Iterative Euclidean GCD plus overflow-safe LCM using the gcd relationship.',
      },
      {
        id: 'snip-euclidean-algorithm-gcd-js',
        topic_id: 'ext-euclidean-algorithm-gcd',
        language: 'javascript',
        is_optimized: true,
        code: `function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return (a / gcd(a, b)) * b;
}`,
        explanation: 'Loops using the mod recurrence; LCM divides by the GCD first to limit overflow.',
      },
      {
        id: 'snip-euclidean-algorithm-gcd-cpp',
        topic_id: 'ext-euclidean-algorithm-gcd',
        language: 'cpp',
        is_optimized: true,
        code: `long long gcd(long long a, long long b) {
    a = llabs(a); b = llabs(b);
    while (b) { long long t = a % b; a = b; b = t; }
    return a;
}

long long lcm(long long a, long long b) {
    if (!a || !b) return 0;
    return a / gcd(a, b) * b;  // divide before multiply
}`,
        explanation: 'Iterative GCD on 64-bit integers with an overflow-conscious LCM.',
      },
      {
        id: 'snip-euclidean-algorithm-gcd-java',
        topic_id: 'ext-euclidean-algorithm-gcd',
        language: 'java',
        is_optimized: true,
        code: `class NumberTheory {
    static long gcd(long a, long b) {
        a = Math.abs(a); b = Math.abs(b);
        while (b != 0) { long t = a % b; a = b; b = t; }
        return a;
    }
    static long lcm(long a, long b) {
        if (a == 0 || b == 0) return 0;
        return a / gcd(a, b) * b;
    }
}`,
        explanation: 'Java iterative Euclidean GCD and a safe LCM derived from it.',
      },
    ],
    quizId: 'quiz-ext-euclidean-algorithm-gcd',
    quizTitle: 'Euclidean Algorithm Quiz',
    quizDescription: 'Test your understanding of GCD computation and its complexity.',
    questions: [
      {
        id: 'q-euclidean-algorithm-gcd-1',
        quiz_id: 'quiz-ext-euclidean-algorithm-gcd',
        question_text: 'What is gcd(48, 18) using the Euclidean algorithm?',
        question_type: 'MCQ',
        options: ['2', '3', '6', '9'],
        correct_option_index: 2,
        explanation: '48 mod 18 = 12, 18 mod 12 = 6, 12 mod 6 = 0, so the GCD is 6.',
      },
      {
        id: 'q-euclidean-algorithm-gcd-2',
        quiz_id: 'quiz-ext-euclidean-algorithm-gcd',
        question_text: 'The Euclidean algorithm relies on the identity gcd(a, b) = gcd(b, a mod b).',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Any common divisor of a and b also divides a mod b, justifying this reduction.',
      },
      {
        id: 'q-euclidean-algorithm-gcd-3',
        quiz_id: 'quiz-ext-euclidean-algorithm-gcd',
        question_text: 'What is the time complexity of the Euclidean algorithm for inputs a and b?',
        question_type: 'COMPLEXITY',
        options: ['O(min(a, b))', 'O(log(min(a, b)))', 'O(a * b)', 'O(sqrt(a))'],
        correct_option_index: 1,
        explanation: 'Each step at least halves the smaller value on average, giving logarithmic time.',
      },
    ],
  },
  // 9. SIEVE OF ERATOSTHENES
  {
    topic: {
      id: 'ext-sieve-of-eratosthenes',
      slug: 'sieve-of-eratosthenes',
      category_id: CATEGORY_IDS.foundations,
      title: 'Sieve of Eratosthenes',
      definition: 'The Sieve of Eratosthenes is an algorithm that finds all prime numbers up to a limit n by iteratively marking the multiples of each prime as composite.',
      importance: 'It is the standard way to precompute primes for number-theory problems, factorization, and combinatorics, running far faster than testing each number individually.',
      prerequisites: ['big-o-notation'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(n log log n)',
      time_complexity_average: 'O(n log log n)',
      time_complexity_worst: 'O(n log log n)',
      space_complexity: 'O(n)',
      display_order: 108,
    },
    sections: [
      {
        id: 'sec-sieve-of-eratosthenes-1',
        topic_id: 'ext-sieve-of-eratosthenes',
        title: 'Concept & Intuition',
        content: `A **prime** has exactly two divisors: 1 and itself. Instead of testing each number, the sieve works in reverse: it assumes all numbers are prime, then crosses out every multiple of each prime it discovers.

Whatever survives the crossing-out is prime. It is like repeatedly striking out every 2nd, 3rd, 5th... number on a list.`,
        display_order: 1,
      },
      {
        id: 'sec-sieve-of-eratosthenes-2',
        topic_id: 'ext-sieve-of-eratosthenes',
        title: 'How It Works',
        content: `1. Create a boolean array \`is_prime[0..n]\`, all \`true\`; set indices 0 and 1 to \`false\`.
2. For each $p$ from 2 while $p^2 \\le n$: if \`is_prime[p]\`, mark \`is_prime[p*p], p*p+p, ...\` as \`false\`.
3. Remaining \`true\` indices are prime.

> [!NOTE]
> Start marking at $p^2$, not $2p$: smaller multiples of $p$ were already marked by earlier primes.`,
        display_order: 2,
      },
      {
        id: 'sec-sieve-of-eratosthenes-3',
        topic_id: 'ext-sieve-of-eratosthenes',
        title: 'Complexity',
        content: `The total work is proportional to $\\sum_{p \\le n} \\frac{n}{p}$ over primes $p$, which sums to $O(n \\log \\log n)$ — nearly linear.

Memory is $O(n)$ for the boolean array. For very large $n$, a **segmented sieve** processes ranges in blocks to fit in cache and reduce memory.`,
        display_order: 3,
      },
      {
        id: 'sec-sieve-of-eratosthenes-4',
        topic_id: 'ext-sieve-of-eratosthenes',
        title: 'Pitfalls & Variants',
        content: `> [!WARNING]
> Iterate the outer loop only while $p \\cdot p \\le n$; going to $n$ wastes time. Also use \`long\`/64-bit indices when \`p*p\` could overflow 32-bit.

The **linear sieve** achieves $O(n)$ by marking each composite exactly once and also yields the smallest prime factor of every number, useful for fast factorization.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-sieve-of-eratosthenes-py',
        topic_id: 'ext-sieve-of-eratosthenes',
        language: 'python',
        is_optimized: true,
        code: `def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    p = 2
    while p * p <= n:
        if is_prime[p]:
            for m in range(p * p, n + 1, p):
                is_prime[m] = False
        p += 1
    return [i for i, prime in enumerate(is_prime) if prime]`,
        explanation: 'Marks composites starting at p*p and returns all primes up to n in O(n log log n).',
      },
      {
        id: 'snip-sieve-of-eratosthenes-js',
        topic_id: 'ext-sieve-of-eratosthenes',
        language: 'javascript',
        is_optimized: true,
        code: `function sieve(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      for (let m = p * p; m <= n; m += p) isPrime[m] = false;
    }
  }
  return isPrime.flatMap((prime, i) => (prime ? [i] : []));
}`,
        explanation: 'Boolean array sieve; inner loop crosses out multiples from p*p upward.',
      },
      {
        id: 'snip-sieve-of-eratosthenes-cpp',
        topic_id: 'ext-sieve-of-eratosthenes',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

vector<int> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (long long p = 2; p * p <= n; ++p)
        if (isPrime[p])
            for (long long m = p * p; m <= n; m += p)
                isPrime[m] = false;
    vector<int> primes;
    for (int i = 2; i <= n; ++i) if (isPrime[i]) primes.push_back(i);
    return primes;
}`,
        explanation: 'Uses 64-bit loop variables so p*p cannot overflow while sieving up to n.',
      },
      {
        id: 'snip-sieve-of-eratosthenes-java',
        topic_id: 'ext-sieve-of-eratosthenes',
        language: 'java',
        is_optimized: true,
        code: `import java.util.ArrayList;
import java.util.List;

class Sieve {
    static List<Integer> primes(int n) {
        boolean[] isPrime = new boolean[n + 1];
        java.util.Arrays.fill(isPrime, true);
        if (n >= 0) isPrime[0] = false;
        if (n >= 1) isPrime[1] = false;
        for (long p = 2; p * p <= n; p++)
            if (isPrime[(int) p])
                for (long m = p * p; m <= n; m += p)
                    isPrime[(int) m] = false;
        List<Integer> res = new ArrayList<>();
        for (int i = 2; i <= n; i++) if (isPrime[i]) res.add(i);
        return res;
    }
}`,
        explanation: 'Java sieve with long loop counters to prevent p*p overflow for large n.',
      },
    ],
    quizId: 'quiz-ext-sieve-of-eratosthenes',
    quizTitle: 'Sieve of Eratosthenes Quiz',
    quizDescription: 'Assess your understanding of prime sieving and its efficiency.',
    questions: [
      {
        id: 'q-sieve-of-eratosthenes-1',
        quiz_id: 'quiz-ext-sieve-of-eratosthenes',
        question_text: 'What is the time complexity of the classic Sieve of Eratosthenes up to n?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log log n)', 'O(n^2)', 'O(n sqrt(n))'],
        correct_option_index: 1,
        explanation: 'Summing n/p over primes p gives the well-known O(n log log n) bound.',
      },
      {
        id: 'q-sieve-of-eratosthenes-2',
        quiz_id: 'quiz-ext-sieve-of-eratosthenes',
        question_text: 'When sieving, we can start marking multiples of a prime p from p*p instead of 2*p.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'All smaller multiples of p were already marked by smaller primes, so p*p is the first new one.',
      },
      {
        id: 'q-sieve-of-eratosthenes-3',
        quiz_id: 'quiz-ext-sieve-of-eratosthenes',
        question_text: 'Up to what bound should the outer loop of the sieve run?',
        question_type: 'MCQ',
        options: ['Until p <= n', 'Until p <= n/2', 'Until p*p <= n', 'Until p <= log n'],
        correct_option_index: 2,
        explanation: 'Any composite <= n has a prime factor <= sqrt(n), so marking beyond that is redundant.',
      },
    ],
  },
  // 10. FAST EXPONENTIATION
  {
    topic: {
      id: 'ext-fast-exponentiation',
      slug: 'fast-exponentiation',
      category_id: CATEGORY_IDS.foundations,
      title: 'Fast Exponentiation',
      definition: 'Fast exponentiation (binary exponentiation) computes a raised to the power n in O(log n) multiplications by squaring the base and using the binary representation of the exponent.',
      importance: 'It makes large power and modular-power computations feasible, underpinning RSA, hashing, matrix exponentiation, and many competitive-programming techniques.',
      prerequisites: ['modular-arithmetic', 'bit-manipulation-basics'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(log n)',
      time_complexity_average: 'O(log n)',
      time_complexity_worst: 'O(log n)',
      space_complexity: 'O(1) iterative',
      display_order: 109,
    },
    sections: [
      {
        id: 'sec-fast-exponentiation-1',
        topic_id: 'ext-fast-exponentiation',
        title: 'Concept & Intuition',
        content: `Computing $a^n$ by multiplying $a$ by itself $n$ times costs $O(n)$. Fast exponentiation exploits the identity

$$a^n = \\begin{cases} (a^{n/2})^2 & n \\text{ even} \\\\ a \\cdot (a^{(n-1)/2})^2 & n \\text{ odd} \\end{cases}$$

Each step halves the exponent, so only $O(\\log n)$ multiplications are needed.`,
        display_order: 1,
      },
      {
        id: 'sec-fast-exponentiation-2',
        topic_id: 'ext-fast-exponentiation',
        title: 'The Binary View',
        content: `Write $n$ in binary. Scanning its bits from least significant, we keep a running \`base\` that we square each step. Whenever the current bit is 1, we multiply it into the result.

For example $a^{13}$ with $13 = 1101_2$ uses $a^8 \\cdot a^4 \\cdot a^1$ — exactly the bits set in 13.`,
        display_order: 2,
      },
      {
        id: 'sec-fast-exponentiation-3',
        topic_id: 'ext-fast-exponentiation',
        title: 'Modular Exponentiation',
        content: `The most common use is **modular** power: $a^n \\bmod m$. Take the modulus after every multiplication to keep numbers small.

> [!IMPORTANT]
> Use 64-bit arithmetic for the intermediate product \`result * base\`, because two numbers near $m \\approx 10^9$ multiply to about $10^{18}$, which overflows 32-bit but fits in a signed 64-bit integer.`,
        display_order: 3,
      },
      {
        id: 'sec-fast-exponentiation-4',
        topic_id: 'ext-fast-exponentiation',
        title: 'Pitfalls & Applications',
        content: `> [!WARNING]
> Define $0^0$ per your problem (commonly 1). For negative exponents in modular arithmetic, first compute the modular inverse.

Beyond integers, the same fast-doubling idea extends to **matrix exponentiation** (e.g. computing Fibonacci in $O(\\log n)$) and to any associative operation.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-fast-exponentiation-py',
        topic_id: 'ext-fast-exponentiation',
        language: 'python',
        is_optimized: true,
        code: `def power_mod(a, n, m):
    result = 1 % m
    a %= m
    while n > 0:
        if n & 1:
            result = result * a % m
        a = a * a % m
        n >>= 1
    return result

print(power_mod(2, 13, 1000))  # 192`,
        explanation: 'Iterative binary exponentiation modulo m in O(log n) multiplications.',
      },
      {
        id: 'snip-fast-exponentiation-js',
        topic_id: 'ext-fast-exponentiation',
        language: 'javascript',
        is_optimized: true,
        code: `function powerMod(a, n, m) {
  // Use BigInt to avoid precision loss on large products
  a = BigInt(a) % BigInt(m);
  let result = 1n % BigInt(m);
  n = BigInt(n);
  const mod = BigInt(m);
  while (n > 0n) {
    if (n & 1n) result = (result * a) % mod;
    a = (a * a) % mod;
    n >>= 1n;
  }
  return result;
}`,
        explanation: 'BigInt binary exponentiation keeps intermediate products exact for large moduli.',
      },
      {
        id: 'snip-fast-exponentiation-cpp',
        topic_id: 'ext-fast-exponentiation',
        language: 'cpp',
        is_optimized: true,
        code: `long long powerMod(long long a, long long n, long long m) {
    long long result = 1 % m;
    a %= m;
    while (n > 0) {
        if (n & 1) result = result * a % m;  // fits in 64-bit
        a = a * a % m;
        n >>= 1;
    }
    return result;
}`,
        explanation: '64-bit modular binary exponentiation; products stay within long long range.',
      },
      {
        id: 'snip-fast-exponentiation-java',
        topic_id: 'ext-fast-exponentiation',
        language: 'java',
        is_optimized: true,
        code: `class FastPow {
    static long powerMod(long a, long n, long m) {
        long result = 1 % m;
        a %= m;
        while (n > 0) {
            if ((n & 1) == 1) result = result * a % m;
            a = a * a % m;
            n >>= 1;
        }
        return result;
    }
}`,
        explanation: 'Java modular exponentiation using long to hold the products safely.',
      },
    ],
    quizId: 'quiz-ext-fast-exponentiation',
    quizTitle: 'Fast Exponentiation Quiz',
    quizDescription: 'Test your understanding of binary and modular exponentiation.',
    questions: [
      {
        id: 'q-fast-exponentiation-1',
        quiz_id: 'quiz-ext-fast-exponentiation',
        question_text: 'How many multiplications does binary exponentiation use to compute a^n?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(log n)', 'O(sqrt(n))', 'O(1)'],
        correct_option_index: 1,
        explanation: 'Each step halves the exponent, giving about log2(n) squarings and multiplications.',
      },
      {
        id: 'q-fast-exponentiation-2',
        quiz_id: 'quiz-ext-fast-exponentiation',
        question_text: 'In modular exponentiation, taking the modulus after each multiplication keeps intermediate values small.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Reducing modulo m each step bounds every value below m, preventing overflow.',
      },
      {
        id: 'q-fast-exponentiation-3',
        quiz_id: 'quiz-ext-fast-exponentiation',
        question_text: 'Which powers of a are multiplied together to compute a^13 via binary exponentiation?',
        question_type: 'MCQ',
        options: ['a^13 directly', 'a^8 * a^4 * a^1', 'a^6 * a^7', 'a^10 * a^3'],
        correct_option_index: 1,
        explanation: '13 = 1101 in binary, so the set bits correspond to a^8, a^4, and a^1.',
      },
    ],
  },
  // 11. EXTENDED EUCLIDEAN ALGORITHM
  {
    topic: {
      id: 'ext-extended-euclidean-algorithm',
      slug: 'extended-euclidean-algorithm',
      category_id: CATEGORY_IDS.foundations,
      title: 'Extended Euclidean Algorithm',
      definition: 'The Extended Euclidean Algorithm computes the gcd of a and b along with integer coefficients x and y satisfying Bezout identity a·x + b·y = gcd(a, b).',
      importance: 'The Bezout coefficients it produces are the direct route to modular inverses, solving linear Diophantine equations, and the Chinese Remainder Theorem.',
      prerequisites: ['euclidean-algorithm-gcd'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(log(min(a, b)))',
      time_complexity_worst: 'O(log(min(a, b)))',
      space_complexity: 'O(log n) recursive, O(1) iterative',
      display_order: 110,
    },
    sections: [
      {
        id: 'sec-extended-euclidean-algorithm-1',
        topic_id: 'ext-extended-euclidean-algorithm',
        title: 'Concept & Intuition',
        content: `**Bezout's identity** states that for integers $a$ and $b$ there exist integers $x, y$ with

$$a x + b y = \\gcd(a, b).$$

The extended algorithm finds not just $\\gcd(a, b)$ but also these coefficients $x$ and $y$, which the plain Euclidean algorithm discards.`,
        display_order: 1,
      },
      {
        id: 'sec-extended-euclidean-algorithm-2',
        topic_id: 'ext-extended-euclidean-algorithm',
        title: 'How It Works',
        content: `It mirrors the recursive GCD. Suppose the recursive call on $(b, a \\bmod b)$ returns $(g, x_1, y_1)$ with $b x_1 + (a \\bmod b) y_1 = g$. Using $a \\bmod b = a - \\lfloor a/b \\rfloor b$, we back-substitute to get

$$x = y_1, \\quad y = x_1 - \\lfloor a/b \\rfloor \\, y_1.$$

The base case is $\\gcd(a, 0) = a$ with $x = 1, y = 0$.`,
        display_order: 2,
      },
      {
        id: 'sec-extended-euclidean-algorithm-3',
        topic_id: 'ext-extended-euclidean-algorithm',
        title: 'Modular Inverse',
        content: `The killer application is the **modular inverse**. If $\\gcd(a, m) = 1$, then $a x + m y = 1$, so $a x \\equiv 1 \\pmod{m}$ and $x \\bmod m$ is the inverse of $a$.

> [!IMPORTANT]
> An inverse exists **only** when $\\gcd(a, m) = 1$. Otherwise the equation $ax \\equiv 1$ has no solution.`,
        display_order: 3,
      },
      {
        id: 'sec-extended-euclidean-algorithm-4',
        topic_id: 'ext-extended-euclidean-algorithm',
        title: 'Pitfalls',
        content: `> [!WARNING]
> The returned $x$ can be negative. Normalize with \`((x % m) + m) % m\` to get a value in $[0, m)$.

For linear Diophantine equations $ax + by = c$, a solution exists **iff** $\\gcd(a, b)$ divides $c$; scale the Bezout coefficients by $c / \\gcd$.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-extended-euclidean-algorithm-py',
        topic_id: 'ext-extended-euclidean-algorithm',
        language: 'python',
        is_optimized: true,
        code: `def ext_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = ext_gcd(b, a % b)
    return g, y1, x1 - (a // b) * y1

def mod_inverse(a, m):
    g, x, _ = ext_gcd(a % m, m)
    if g != 1:
        raise ValueError("inverse does not exist")
    return x % m`,
        explanation: 'Recursive extended GCD returning (gcd, x, y); modular inverse normalizes x mod m.',
      },
      {
        id: 'snip-extended-euclidean-algorithm-js',
        topic_id: 'ext-extended-euclidean-algorithm',
        language: 'javascript',
        is_optimized: true,
        code: `function extGcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x1, y1] = extGcd(b, a % b);
  return [g, y1, x1 - (a / b) * y1];
}

function modInverse(a, m) {
  const [g, x] = extGcd(((a % m) + m) % m, m);
  if (g !== 1n) throw new Error("no inverse");
  return ((x % m) + m) % m;
}`,
        explanation: 'BigInt extended Euclid computing Bezout coefficients and a normalized modular inverse.',
      },
      {
        id: 'snip-extended-euclidean-algorithm-cpp',
        topic_id: 'ext-extended-euclidean-algorithm',
        language: 'cpp',
        is_optimized: true,
        code: `long long extGcd(long long a, long long b, long long& x, long long& y) {
    if (b == 0) { x = 1; y = 0; return a; }
    long long x1, y1;
    long long g = extGcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

long long modInverse(long long a, long long m) {
    long long x, y;
    long long g = extGcd((a % m + m) % m, m, x, y);
    return g == 1 ? (x % m + m) % m : -1;  // -1 if no inverse
}`,
        explanation: 'Extended GCD by reference parameters; modular inverse returns -1 when gcd != 1.',
      },
      {
        id: 'snip-extended-euclidean-algorithm-java',
        topic_id: 'ext-extended-euclidean-algorithm',
        language: 'java',
        is_optimized: true,
        code: `class ExtEuclid {
    // returns {gcd, x, y}
    static long[] extGcd(long a, long b) {
        if (b == 0) return new long[]{a, 1, 0};
        long[] r = extGcd(b, a % b);
        return new long[]{r[0], r[2], r[1] - (a / b) * r[2]};
    }
    static long modInverse(long a, long m) {
        long[] r = extGcd(((a % m) + m) % m, m);
        if (r[0] != 1) throw new ArithmeticException("no inverse");
        return ((r[1] % m) + m) % m;
    }
}`,
        explanation: 'Returns gcd with Bezout coefficients in an array and derives a normalized inverse.',
      },
    ],
    quizId: 'quiz-ext-extended-euclidean-algorithm',
    quizTitle: 'Extended Euclidean Algorithm Quiz',
    quizDescription: 'Test your grasp of Bezout coefficients and modular inverses.',
    questions: [
      {
        id: 'q-extended-euclidean-algorithm-1',
        quiz_id: 'quiz-ext-extended-euclidean-algorithm',
        question_text: 'The extended Euclidean algorithm finds integers x and y satisfying which identity?',
        question_type: 'MCQ',
        options: ['a*x + b*y = gcd(a, b)', 'a*x - b*y = 0', 'x + y = gcd(a, b)', 'a^x = b^y'],
        correct_option_index: 0,
        explanation: 'This is Bezout identity; the algorithm computes such coefficients alongside the gcd.',
      },
      {
        id: 'q-extended-euclidean-algorithm-2',
        quiz_id: 'quiz-ext-extended-euclidean-algorithm',
        question_text: 'A modular inverse of a mod m exists if and only if gcd(a, m) = 1.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Only when a and m are coprime can a*x + m*y = 1 have integer solutions.',
      },
      {
        id: 'q-extended-euclidean-algorithm-3',
        quiz_id: 'quiz-ext-extended-euclidean-algorithm',
        question_text: 'A linear Diophantine equation a*x + b*y = c has integer solutions precisely when what holds?',
        question_type: 'MCQ',
        options: ['c is prime', 'gcd(a, b) divides c', 'a divides b', 'c is even'],
        correct_option_index: 1,
        explanation: 'Solutions exist iff gcd(a, b) | c; scale the Bezout coefficients by c / gcd.',
      },
    ],
  },
  // 12. MATRIX EXPONENTIATION
  {
    topic: {
      id: 'ext-matrix-exponentiation',
      slug: 'matrix-exponentiation',
      category_id: CATEGORY_IDS.foundations,
      title: 'Matrix Exponentiation',
      definition: 'Matrix exponentiation applies binary exponentiation to square matrices, computing M^n in O(k^3 log n) time to solve linear recurrences and transition problems quickly.',
      importance: 'It reduces linear recurrences (like Fibonacci) and path-counting problems from linear or exponential time to logarithmic time, a staple of competitive programming.',
      prerequisites: ['fast-exponentiation'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(k^3 log n)',
      time_complexity_average: 'O(k^3 log n)',
      time_complexity_worst: 'O(k^3 log n)',
      space_complexity: 'O(k^2)',
      display_order: 111,
    },
    sections: [
      {
        id: 'sec-matrix-exponentiation-1',
        topic_id: 'ext-matrix-exponentiation',
        title: 'Concept & Intuition',
        content: `Many linear recurrences can be written as a matrix-vector product. If a state vector evolves by $v_{i+1} = M v_i$, then $v_n = M^n v_0$.

Because matrix multiplication is associative, we can compute $M^n$ with the same **binary exponentiation** trick used for numbers, achieving $O(\\log n)$ matrix multiplications.`,
        display_order: 1,
      },
      {
        id: 'sec-matrix-exponentiation-2',
        topic_id: 'ext-matrix-exponentiation',
        title: 'The Fibonacci Example',
        content: `Fibonacci satisfies $F_{n+1} = F_n + F_{n-1}$. Encode it as

$$\\begin{pmatrix} F_{n+1} \\\\ F_n \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} F_n \\\\ F_{n-1} \\end{pmatrix}.$$

Raising the $2 \\times 2$ matrix to the $n$-th power gives $F_n$ in $O(\\log n)$ time instead of $O(n)$.`,
        display_order: 2,
      },
      {
        id: 'sec-matrix-exponentiation-3',
        topic_id: 'ext-matrix-exponentiation',
        title: 'Complexity',
        content: `Multiplying two $k \\times k$ matrices with the schoolbook method costs $O(k^3)$. Binary exponentiation performs $O(\\log n)$ such multiplications, giving $O(k^3 \\log n)$ overall.

> [!NOTE]
> For small fixed $k$ (like Fibonacci's $2 \\times 2$), the $k^3$ factor is a tiny constant, so the method is effectively $O(\\log n)$.`,
        display_order: 3,
      },
      {
        id: 'sec-matrix-exponentiation-4',
        topic_id: 'ext-matrix-exponentiation',
        title: 'Pitfalls & Applications',
        content: `> [!WARNING]
> Initialize the accumulator to the **identity matrix**, not zeros. Under modular arithmetic, reduce every entry after each multiplication to avoid overflow.

Applications include counting walks of length $n$ in a graph (adjacency matrix powers) and any constant-coefficient linear recurrence.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-matrix-exponentiation-py',
        topic_id: 'ext-matrix-exponentiation',
        language: 'python',
        is_optimized: true,
        code: `def mat_mult(A, B, mod):
    n, m, p = len(A), len(B), len(B[0])
    C = [[0] * p for _ in range(n)]
    for i in range(n):
        for k in range(m):
            if A[i][k]:
                for j in range(p):
                    C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod
    return C

def mat_pow(M, n, mod):
    size = len(M)
    R = [[int(i == j) for j in range(size)] for i in range(size)]  # identity
    while n:
        if n & 1:
            R = mat_mult(R, M, mod)
        M = mat_mult(M, M, mod)
        n >>= 1
    return R

def fib(n, mod=10**9 + 7):
    if n == 0:
        return 0
    return mat_pow([[1, 1], [1, 0]], n, mod)[0][1]`,
        explanation: 'Generic modular matrix power via binary exponentiation, used to compute Fibonacci in O(log n).',
      },
      {
        id: 'snip-matrix-exponentiation-js',
        topic_id: 'ext-matrix-exponentiation',
        language: 'javascript',
        is_optimized: true,
        code: `const MOD = 1000000007n;

function matMult(A, B) {
  const n = A.length, m = B.length, p = B[0].length;
  const C = Array.from({ length: n }, () => new Array(p).fill(0n));
  for (let i = 0; i < n; i++)
    for (let k = 0; k < m; k++)
      for (let j = 0; j < p; j++)
        C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
  return C;
}

function matPow(M, n) {
  let R = M.map((_, i) => M.map((__, j) => (i === j ? 1n : 0n)));
  while (n > 0n) {
    if (n & 1n) R = matMult(R, M);
    M = matMult(M, M);
    n >>= 1n;
  }
  return R;
}

function fib(n) {
  if (n === 0n) return 0n;
  return matPow([[1n, 1n], [1n, 0n]], n)[0][1];
}`,
        explanation: 'BigInt matrix exponentiation with an identity accumulator computing Fibonacci mod 1e9+7.',
      },
      {
        id: 'snip-matrix-exponentiation-cpp',
        topic_id: 'ext-matrix-exponentiation',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;
using Matrix = vector<vector<long long>>;
const long long MOD = 1000000007LL;

Matrix mul(const Matrix& A, const Matrix& B) {
    int n = A.size(), m = B.size(), p = B[0].size();
    Matrix C(n, vector<long long>(p, 0));
    for (int i = 0; i < n; ++i)
        for (int k = 0; k < m; ++k)
            for (int j = 0; j < p; ++j)
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
    return C;
}

Matrix matpow(Matrix M, long long n) {
    int s = M.size();
    Matrix R(s, vector<long long>(s, 0));
    for (int i = 0; i < s; ++i) R[i][i] = 1;  // identity
    while (n) {
        if (n & 1) R = mul(R, M);
        M = mul(M, M);
        n >>= 1;
    }
    return R;
}`,
        explanation: 'Modular k*k matrix exponentiation; identity seed makes it a proper power operator.',
      },
      {
        id: 'snip-matrix-exponentiation-java',
        topic_id: 'ext-matrix-exponentiation',
        language: 'java',
        is_optimized: true,
        code: `class MatrixPow {
    static final long MOD = 1000000007L;

    static long[][] mul(long[][] A, long[][] B) {
        int n = A.length, m = B.length, p = B[0].length;
        long[][] C = new long[n][p];
        for (int i = 0; i < n; i++)
            for (int k = 0; k < m; k++)
                for (int j = 0; j < p; j++)
                    C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
        return C;
    }

    static long[][] pow(long[][] M, long n) {
        int s = M.length;
        long[][] R = new long[s][s];
        for (int i = 0; i < s; i++) R[i][i] = 1;  // identity
        while (n > 0) {
            if ((n & 1) == 1) R = mul(R, M);
            M = mul(M, M);
            n >>= 1;
        }
        return R;
    }
}`,
        explanation: 'Java modular matrix power with identity accumulator and binary exponentiation.',
      },
    ],
    quizId: 'quiz-ext-matrix-exponentiation',
    quizTitle: 'Matrix Exponentiation Quiz',
    quizDescription: 'Evaluate your understanding of solving recurrences with matrix powers.',
    questions: [
      {
        id: 'q-matrix-exponentiation-1',
        quiz_id: 'quiz-ext-matrix-exponentiation',
        question_text: 'What is the time complexity of computing M^n for a k*k matrix using binary exponentiation?',
        question_type: 'COMPLEXITY',
        options: ['O(k^2 n)', 'O(k^3 log n)', 'O(k log n)', 'O(n^3)'],
        correct_option_index: 1,
        explanation: 'There are O(log n) matrix multiplications, each costing O(k^3) with schoolbook multiply.',
      },
      {
        id: 'q-matrix-exponentiation-2',
        quiz_id: 'quiz-ext-matrix-exponentiation',
        question_text: 'The accumulator in matrix exponentiation should be initialized to the identity matrix.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'The identity is the multiplicative unit for matrices, analogous to 1 for numbers.',
      },
      {
        id: 'q-matrix-exponentiation-3',
        quiz_id: 'quiz-ext-matrix-exponentiation',
        question_text: 'Which matrix raised to the n-th power yields the n-th Fibonacci number?',
        question_type: 'MCQ',
        options: ['[[1,1],[1,0]]', '[[0,1],[1,0]]', '[[1,0],[0,1]]', '[[2,1],[1,1]]'],
        correct_option_index: 0,
        explanation: 'The matrix [[1,1],[1,0]] raised to n encodes the Fibonacci recurrence.',
      },
    ],
  },
  // 13. MODULAR ARITHMETIC
  {
    topic: {
      id: 'ext-modular-arithmetic',
      slug: 'modular-arithmetic',
      category_id: CATEGORY_IDS.foundations,
      title: 'Modular Arithmetic',
      definition: 'Modular arithmetic is a system of arithmetic for integers where numbers wrap around after reaching a fixed modulus m, so only remainders in the range [0, m) are considered.',
      importance: 'It keeps huge intermediate values bounded, enables hashing and cryptography, and is required whenever problems ask for answers "modulo 1e9+7".',
      prerequisites: [],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1) per operation',
      time_complexity_average: 'O(1) per operation',
      time_complexity_worst: 'O(1) per operation',
      space_complexity: 'O(1)',
      display_order: 112,
    },
    sections: [
      {
        id: 'sec-modular-arithmetic-1',
        topic_id: 'ext-modular-arithmetic',
        title: 'Concept & Intuition',
        content: `Modular arithmetic is "clock arithmetic": on a 12-hour clock, $10 + 5 = 15$ becomes $3$. We say $15 \\equiv 3 \\pmod{12}$.

Two numbers are **congruent** modulo $m$ if they have the same remainder when divided by $m$. This partitions the integers into $m$ residue classes.`,
        display_order: 1,
      },
      {
        id: 'sec-modular-arithmetic-2',
        topic_id: 'ext-modular-arithmetic',
        title: 'Distributive Rules',
        content: `Addition, subtraction, and multiplication distribute over the modulus:

$$(a + b) \\bmod m = ((a \\bmod m) + (b \\bmod m)) \\bmod m$$
$$(a \\cdot b) \\bmod m = ((a \\bmod m) \\cdot (b \\bmod m)) \\bmod m$$

This lets us reduce at every step and never store gigantic numbers.`,
        display_order: 2,
      },
      {
        id: 'sec-modular-arithmetic-3',
        topic_id: 'ext-modular-arithmetic',
        title: 'Division Is Special',
        content: `> [!IMPORTANT]
> Division does **not** distribute directly. To compute $a / b \\bmod m$, multiply by the **modular inverse** of $b$: $a \\cdot b^{-1} \\bmod m$.

When $m$ is prime, Fermat's little theorem gives $b^{-1} \\equiv b^{m-2} \\pmod{m}$, computable via fast exponentiation.`,
        display_order: 3,
      },
      {
        id: 'sec-modular-arithmetic-4',
        topic_id: 'ext-modular-arithmetic',
        title: 'Pitfalls',
        content: `> [!WARNING]
> In C, C++, and Java, the \`%\` operator can return a **negative** remainder for negative operands. Normalize with \`((x % m) + m) % m\`. Python's \`%\` already returns a non-negative result.

Also watch for overflow: multiplying two values near $m \\approx 10^9$ needs 64-bit arithmetic before taking the modulus.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-modular-arithmetic-py',
        topic_id: 'ext-modular-arithmetic',
        language: 'python',
        is_optimized: true,
        code: `MOD = 10**9 + 7

def add(a, b): return (a + b) % MOD
def sub(a, b): return (a - b) % MOD          # Python keeps result non-negative
def mul(a, b): return (a * b) % MOD
def div(a, b): return a * pow(b, MOD - 2, MOD) % MOD  # Fermat inverse (MOD prime)`,
        explanation: 'Modular add/sub/mul and Fermat-based division under a prime modulus.',
      },
      {
        id: 'snip-modular-arithmetic-js',
        topic_id: 'ext-modular-arithmetic',
        language: 'javascript',
        is_optimized: true,
        code: `const MOD = 1000000007n;

const add = (a, b) => (a + b) % MOD;
const sub = (a, b) => ((a - b) % MOD + MOD) % MOD;   // normalize sign
const mul = (a, b) => (a * b) % MOD;

function power(a, n) {
  let r = 1n; a %= MOD;
  while (n > 0n) { if (n & 1n) r = r * a % MOD; a = a * a % MOD; n >>= 1n; }
  return r;
}
const div = (a, b) => mul(a, power(b, MOD - 2n));    // Fermat inverse`,
        explanation: 'BigInt modular operations with sign-safe subtraction and Fermat modular division.',
      },
      {
        id: 'snip-modular-arithmetic-cpp',
        topic_id: 'ext-modular-arithmetic',
        language: 'cpp',
        is_optimized: true,
        code: `const long long MOD = 1000000007LL;

long long add(long long a, long long b) { return (a + b) % MOD; }
long long sub(long long a, long long b) { return ((a - b) % MOD + MOD) % MOD; }
long long mul(long long a, long long b) { return a % MOD * (b % MOD) % MOD; }

long long power(long long a, long long n) {
    long long r = 1; a %= MOD;
    while (n) { if (n & 1) r = r * a % MOD; a = a * a % MOD; n >>= 1; }
    return r;
}
long long divide(long long a, long long b) { return mul(a, power(b, MOD - 2)); }`,
        explanation: 'Sign-safe modular arithmetic on 64-bit ints with Fermat inverse for division.',
      },
      {
        id: 'snip-modular-arithmetic-java',
        topic_id: 'ext-modular-arithmetic',
        language: 'java',
        is_optimized: true,
        code: `class Mod {
    static final long MOD = 1000000007L;

    static long add(long a, long b) { return (a + b) % MOD; }
    static long sub(long a, long b) { return ((a - b) % MOD + MOD) % MOD; }
    static long mul(long a, long b) { return a % MOD * (b % MOD) % MOD; }

    static long power(long a, long n) {
        long r = 1; a %= MOD;
        while (n > 0) { if ((n & 1) == 1) r = r * a % MOD; a = a * a % MOD; n >>= 1; }
        return r;
    }
    static long div(long a, long b) { return mul(a, power(b, MOD - 2)); }
}`,
        explanation: 'Java modular helpers with normalized subtraction and Fermat-based division.',
      },
    ],
    quizId: 'quiz-ext-modular-arithmetic',
    quizTitle: 'Modular Arithmetic Quiz',
    quizDescription: 'Check your understanding of congruences and modular operations.',
    questions: [
      {
        id: 'q-modular-arithmetic-1',
        quiz_id: 'quiz-ext-modular-arithmetic',
        question_text: 'What is (17 + 25) mod 12?',
        question_type: 'MCQ',
        options: ['4', '6', '8', '10'],
        correct_option_index: 1,
        explanation: '17 + 25 = 42, and 42 mod 12 = 6.',
      },
      {
        id: 'q-modular-arithmetic-2',
        quiz_id: 'quiz-ext-modular-arithmetic',
        question_text: 'Modular division a / b mod m can always be done by simply computing (a mod m) / (b mod m).',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Division requires multiplying by the modular inverse of b, not ordinary integer division.',
      },
      {
        id: 'q-modular-arithmetic-3',
        quiz_id: 'quiz-ext-modular-arithmetic',
        question_text: 'For a prime modulus m, the modular inverse of b is given by which expression (Fermat little theorem)?',
        question_type: 'MCQ',
        options: ['b^(m-1) mod m', 'b^(m-2) mod m', 'b^m mod m', 'b^2 mod m'],
        correct_option_index: 1,
        explanation: 'Since b^(m-1) = 1 mod m, dividing by b gives b^(m-2) as the inverse.',
      },
    ],
  },
  // 14. PERMUTATIONS AND COMBINATIONS
  {
    topic: {
      id: 'ext-permutations-combinations',
      slug: 'permutations-combinations',
      category_id: CATEGORY_IDS.foundations,
      title: 'Permutations & Combinations',
      definition: 'Permutations count ordered arrangements of items while combinations count unordered selections; together they form the core counting tools of combinatorics.',
      importance: 'They quantify how many ways events can occur, underpinning probability, dynamic programming counts, and complexity of brute-force search spaces.',
      prerequisites: ['modular-arithmetic'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1) with precomputed factorials',
      time_complexity_average: 'O(k) per query',
      time_complexity_worst: 'O(n) to build factorial tables',
      space_complexity: 'O(n) for factorial tables',
      display_order: 113,
    },
    sections: [
      {
        id: 'sec-permutations-combinations-1',
        topic_id: 'ext-permutations-combinations',
        title: 'Concept & Intuition',
        content: `**Permutations** ask "in how many orders?" — order matters. **Combinations** ask "how many groups?" — order does not.

Choosing 2 letters from {A, B, C}: permutations give AB, BA, AC, CA, BC, CB (6), but combinations give {A,B}, {A,C}, {B,C} (3), since AB and BA are the same group.`,
        display_order: 1,
      },
      {
        id: 'sec-permutations-combinations-2',
        topic_id: 'ext-permutations-combinations',
        title: 'The Formulas',
        content: `For choosing $k$ from $n$ distinct items:

$$P(n, k) = \\frac{n!}{(n-k)!}, \\qquad C(n, k) = \\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}.$$

Note $C(n, k) = P(n, k) / k!$: dividing out the $k!$ orderings converts arrangements into selections.`,
        display_order: 2,
      },
      {
        id: 'sec-permutations-combinations-3',
        topic_id: 'ext-permutations-combinations',
        title: 'Key Identities',
        content: `Useful properties of binomial coefficients:

- **Symmetry**: $\\binom{n}{k} = \\binom{n}{n-k}$.
- **Pascal's rule**: $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$.
- **Row sum**: $\\sum_{k=0}^{n} \\binom{n}{k} = 2^n$.

> [!NOTE]
> For repeated modular queries, precompute factorials and their modular inverses so each $\\binom{n}{k}$ is $O(1)$.`,
        display_order: 3,
      },
      {
        id: 'sec-permutations-combinations-4',
        topic_id: 'ext-permutations-combinations',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Factorials explode: $21!$ already overflows 64-bit. Under a prime modulus, use modular inverses rather than dividing integers directly.

Also distinguish selection **with vs without repetition**. With repetition, combinations become $\\binom{n+k-1}{k}$ (stars and bars).`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-permutations-combinations-py',
        topic_id: 'ext-permutations-combinations',
        language: 'python',
        is_optimized: true,
        code: `MOD = 10**9 + 7
N = 100001
fact = [1] * N
for i in range(1, N):
    fact[i] = fact[i - 1] * i % MOD
inv_fact = [1] * N
inv_fact[N - 1] = pow(fact[N - 1], MOD - 2, MOD)
for i in range(N - 2, -1, -1):
    inv_fact[i] = inv_fact[i + 1] * (i + 1) % MOD

def nCr(n, r):
    if r < 0 or r > n:
        return 0
    return fact[n] * inv_fact[r] % MOD * inv_fact[n - r] % MOD`,
        explanation: 'Precomputes factorials and inverse factorials for O(1) modular binomial coefficients.',
      },
      {
        id: 'snip-permutations-combinations-js',
        topic_id: 'ext-permutations-combinations',
        language: 'javascript',
        is_optimized: true,
        code: `const MOD = 1000000007n;
const N = 100001;
const fact = new Array(N).fill(1n);
for (let i = 1; i < N; i++) fact[i] = fact[i - 1] * BigInt(i) % MOD;

function power(a, e) {
  let r = 1n; a %= MOD;
  while (e > 0n) { if (e & 1n) r = r * a % MOD; a = a * a % MOD; e >>= 1n; }
  return r;
}
const invFact = new Array(N);
invFact[N - 1] = power(fact[N - 1], MOD - 2n);
for (let i = N - 2; i >= 0; i--) invFact[i] = invFact[i + 1] * BigInt(i + 1) % MOD;

function nCr(n, r) {
  if (r < 0 || r > n) return 0n;
  return fact[n] * invFact[r] % MOD * invFact[n - r] % MOD;
}`,
        explanation: 'BigInt factorial and inverse-factorial tables enabling O(1) combination queries.',
      },
      {
        id: 'snip-permutations-combinations-cpp',
        topic_id: 'ext-permutations-combinations',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;
const long long MOD = 1000000007LL;
const int N = 100001;
vector<long long> fact(N), invFact(N);

long long power(long long a, long long e) {
    long long r = 1; a %= MOD;
    while (e) { if (e & 1) r = r * a % MOD; a = a * a % MOD; e >>= 1; }
    return r;
}
void init() {
    fact[0] = 1;
    for (int i = 1; i < N; ++i) fact[i] = fact[i - 1] * i % MOD;
    invFact[N - 1] = power(fact[N - 1], MOD - 2);
    for (int i = N - 2; i >= 0; --i) invFact[i] = invFact[i + 1] * (i + 1) % MOD;
}
long long nCr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] * invFact[r] % MOD * invFact[n - r] % MOD;
}`,
        explanation: 'Builds modular factorial tables once, then answers each C(n, r) in constant time.',
      },
      {
        id: 'snip-permutations-combinations-java',
        topic_id: 'ext-permutations-combinations',
        language: 'java',
        is_optimized: true,
        code: `class Combinatorics {
    static final long MOD = 1000000007L;
    static final int N = 100001;
    static long[] fact = new long[N], invFact = new long[N];

    static long power(long a, long e) {
        long r = 1; a %= MOD;
        while (e > 0) { if ((e & 1) == 1) r = r * a % MOD; a = a * a % MOD; e >>= 1; }
        return r;
    }
    static void init() {
        fact[0] = 1;
        for (int i = 1; i < N; i++) fact[i] = fact[i - 1] * i % MOD;
        invFact[N - 1] = power(fact[N - 1], MOD - 2);
        for (int i = N - 2; i >= 0; i--) invFact[i] = invFact[i + 1] * (i + 1) % MOD;
    }
    static long nCr(int n, int r) {
        if (r < 0 || r > n) return 0;
        return fact[n] * invFact[r] % MOD * invFact[n - r] % MOD;
    }
}`,
        explanation: 'Java precomputed factorial/inverse-factorial arrays giving O(1) binomial coefficients.',
      },
    ],
    quizId: 'quiz-ext-permutations-combinations',
    quizTitle: 'Permutations & Combinations Quiz',
    quizDescription: 'Test your counting skills with arrangements and selections.',
    questions: [
      {
        id: 'q-permutations-combinations-1',
        quiz_id: 'quiz-ext-permutations-combinations',
        question_text: 'How many ways can you choose 2 items from 4 distinct items (order does not matter)?',
        question_type: 'MCQ',
        options: ['4', '6', '12', '24'],
        correct_option_index: 1,
        explanation: 'C(4, 2) = 4! / (2! * 2!) = 6.',
      },
      {
        id: 'q-permutations-combinations-2',
        quiz_id: 'quiz-ext-permutations-combinations',
        question_text: 'The identity C(n, k) = C(n, n-k) reflects the symmetry of choosing which items to include versus exclude.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Choosing k items to include is equivalent to choosing n-k items to leave out.',
      },
      {
        id: 'q-permutations-combinations-3',
        quiz_id: 'quiz-ext-permutations-combinations',
        question_text: 'What is the sum of all binomial coefficients in row n, i.e. the sum of C(n, 0) through C(n, n)?',
        question_type: 'MCQ',
        options: ['n', 'n^2', '2^n', 'n!'],
        correct_option_index: 2,
        explanation: 'The row sums to 2^n, matching the number of subsets of an n-element set.',
      },
    ],
  },
  // 15. PASCAL'S TRIANGLE
  {
    topic: {
      id: 'ext-pascals-triangle',
      slug: 'pascals-triangle',
      category_id: CATEGORY_IDS.foundations,
      title: "Pascal's Triangle",
      definition: "Pascal's Triangle is a triangular array where each entry is the sum of the two entries above it, and row n column k equals the binomial coefficient C(n, k).",
      importance: 'It provides an overflow-free, division-free way to compute binomial coefficients and reveals patterns central to combinatorics, probability, and the binomial theorem.',
      prerequisites: ['permutations-combinations'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1) lookup after build',
      time_complexity_average: 'O(n^2) to build n rows',
      time_complexity_worst: 'O(n^2) to build n rows',
      space_complexity: 'O(n^2) full, O(n) single row',
      display_order: 114,
    },
    sections: [
      {
        id: 'sec-pascals-triangle-1',
        topic_id: 'ext-pascals-triangle',
        title: 'Concept & Intuition',
        content: `Start with a 1 at the apex. Each row begins and ends with 1, and every interior number is the **sum of the two numbers diagonally above it**.

Row 0: 1
Row 1: 1 1
Row 2: 1 2 1
Row 3: 1 3 3 1
Row 4: 1 4 6 4 1`,
        display_order: 1,
      },
      {
        id: 'sec-pascals-triangle-2',
        topic_id: 'ext-pascals-triangle',
        title: 'Connection to Binomials',
        content: `The entry in row $n$, position $k$ is exactly $\\binom{n}{k}$. The construction rule is **Pascal's rule**:

$$\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}.$$

This mirrors the binomial theorem, where row $n$ lists the coefficients of $(x + y)^n$.`,
        display_order: 2,
      },
      {
        id: 'sec-pascals-triangle-3',
        topic_id: 'ext-pascals-triangle',
        title: 'Hidden Patterns',
        content: `Pascal's Triangle hides many sequences:

> [!NOTE]
> The sum of row $n$ is $2^n$. The shallow diagonals sum to the **Fibonacci numbers**, and the third diagonal lists the **triangular numbers**.

Coloring odd entries reveals the **Sierpinski triangle** fractal.`,
        display_order: 3,
      },
      {
        id: 'sec-pascals-triangle-4',
        topic_id: 'ext-pascals-triangle',
        title: 'Complexity & Pitfalls',
        content: `Building $n$ rows costs $O(n^2)$ time and $O(n^2)$ space (or $O(n)$ if you only keep the current row).

> [!WARNING]
> Entries grow quickly — the center of row 34 already exceeds 32-bit signed range, and the center of row 67 exceeds 64-bit signed range. Use big integers or a modulus for large $n$.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-pascals-triangle-py',
        topic_id: 'ext-pascals-triangle',
        language: 'python',
        is_optimized: true,
        code: `def pascal(num_rows):
    triangle = [[1]]
    for i in range(1, num_rows):
        prev = triangle[-1]
        row = [1]
        for k in range(1, i):
            row.append(prev[k - 1] + prev[k])
        row.append(1)
        triangle.append(row)
    return triangle

for row in pascal(5):
    print(row)`,
        explanation: "Builds Pascal's Triangle row by row using the sum-of-two-above rule.",
      },
      {
        id: 'snip-pascals-triangle-js',
        topic_id: 'ext-pascals-triangle',
        language: 'javascript',
        is_optimized: true,
        code: `function pascal(numRows) {
  const triangle = [[1]];
  for (let i = 1; i < numRows; i++) {
    const prev = triangle[i - 1];
    const row = [1];
    for (let k = 1; k < i; k++) row.push(prev[k - 1] + prev[k]);
    row.push(1);
    triangle.push(row);
  }
  return triangle;
}`,
        explanation: 'Generates the triangle where each interior entry sums the two entries above it.',
      },
      {
        id: 'snip-pascals-triangle-cpp',
        topic_id: 'ext-pascals-triangle',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

vector<vector<long long>> pascal(int numRows) {
    vector<vector<long long>> t(numRows);
    for (int i = 0; i < numRows; ++i) {
        t[i].assign(i + 1, 1);
        for (int k = 1; k < i; ++k)
            t[i][k] = t[i - 1][k - 1] + t[i - 1][k];
    }
    return t;
}`,
        explanation: "Constructs Pascal's Triangle in O(n^2) using the additive recurrence.",
      },
      {
        id: 'snip-pascals-triangle-java',
        topic_id: 'ext-pascals-triangle',
        language: 'java',
        is_optimized: true,
        code: `import java.util.ArrayList;
import java.util.List;

class Pascal {
    static List<List<Long>> generate(int numRows) {
        List<List<Long>> t = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Long> row = new ArrayList<>();
            for (int k = 0; k <= i; k++) {
                if (k == 0 || k == i) row.add(1L);
                else row.add(t.get(i - 1).get(k - 1) + t.get(i - 1).get(k));
            }
            t.add(row);
        }
        return t;
    }
}`,
        explanation: "Java Pascal's Triangle builder applying Pascal's rule to interior cells.",
      },
    ],
    quizId: 'quiz-ext-pascals-triangle',
    quizTitle: "Pascal's Triangle Quiz",
    quizDescription: 'Assess your understanding of the triangle and its combinatorial meaning.',
    questions: [
      {
        id: 'q-pascals-triangle-1',
        quiz_id: 'quiz-ext-pascals-triangle',
        question_text: 'What is the value at row 4, position 2 (0-indexed) of Pascal\u2019s Triangle?',
        question_type: 'MCQ',
        options: ['4', '6', '10', '3'],
        correct_option_index: 1,
        explanation: 'Row 4 is 1 4 6 4 1, so position 2 is 6, equal to C(4, 2).',
      },
      {
        id: 'q-pascals-triangle-2',
        quiz_id: 'quiz-ext-pascals-triangle',
        question_text: 'Each interior entry equals the sum of the two entries directly above it (Pascal\u2019s rule).',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'This is the defining recurrence C(n, k) = C(n-1, k-1) + C(n-1, k).',
      },
      {
        id: 'q-pascals-triangle-3',
        quiz_id: 'quiz-ext-pascals-triangle',
        question_text: 'What is the time complexity of building the first n rows of Pascal\u2019s Triangle?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'],
        correct_option_index: 2,
        explanation: 'Row i has i+1 entries, so total work is 1 + 2 + ... + n = O(n^2).',
      },
    ],
  },
  // 16. PROBABILITY BASICS
  {
    topic: {
      id: 'ext-probability-basics',
      slug: 'probability-basics',
      category_id: CATEGORY_IDS.foundations,
      title: 'Probability Basics',
      definition: 'Probability quantifies the likelihood of events on a scale from 0 to 1, computed for equally likely outcomes as the ratio of favorable outcomes to total outcomes.',
      importance: 'It underlies expected-value analysis of randomized algorithms, average-case complexity, hashing, and probabilistic data structures like Bloom filters.',
      prerequisites: ['permutations-combinations'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1) per computation',
      time_complexity_average: 'O(1) per computation',
      time_complexity_worst: 'O(1) per computation',
      space_complexity: 'O(1)',
      display_order: 115,
    },
    sections: [
      {
        id: 'sec-probability-basics-1',
        topic_id: 'ext-probability-basics',
        title: 'Concept & Intuition',
        content: `A **sample space** is the set of all possible outcomes; an **event** is a subset of it. For equally likely outcomes,

$$P(E) = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}}.$$

Probabilities lie in $[0, 1]$: 0 means impossible, 1 means certain. Rolling an even number on a fair die is $3/6 = 1/2$.`,
        display_order: 1,
      },
      {
        id: 'sec-probability-basics-2',
        topic_id: 'ext-probability-basics',
        title: 'Combining Events',
        content: `- **Complement**: $P(\\lnot E) = 1 - P(E)$.
- **Union** (inclusion-exclusion): $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.
- **Independent events**: $P(A \\cap B) = P(A) \\cdot P(B)$.
- **Conditional**: $P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}$.

Mutually exclusive events cannot co-occur, so $P(A \\cap B) = 0$.`,
        display_order: 2,
      },
      {
        id: 'sec-probability-basics-3',
        topic_id: 'ext-probability-basics',
        title: 'Expected Value',
        content: `The **expected value** of a random variable $X$ is the long-run average:

$$E[X] = \\sum_i x_i \\, P(x_i).$$

> [!IMPORTANT]
> **Linearity of expectation**: $E[X + Y] = E[X] + E[Y]$ holds **even when $X$ and $Y$ are dependent**. This is the workhorse for analyzing randomized algorithms.`,
        display_order: 3,
      },
      {
        id: 'sec-probability-basics-4',
        topic_id: 'ext-probability-basics',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Do not multiply probabilities of events that are **not** independent — use conditional probability instead. The "gambler's fallacy" (past results affecting independent future trials) is a classic error.

Also beware confusing $P(A \\mid B)$ with $P(B \\mid A)$; Bayes' theorem relates them but they are generally different.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-probability-basics-py',
        topic_id: 'ext-probability-basics',
        language: 'python',
        is_optimized: true,
        code: `def expected_value(values, probs):
    # E[X] = sum of value * probability
    assert abs(sum(probs) - 1.0) < 1e-9, "probabilities must sum to 1"
    return sum(v * p for v, p in zip(values, probs))

# Expected value of a fair six-sided die
die = list(range(1, 7))
print(expected_value(die, [1/6] * 6))  # 3.5`,
        explanation: 'Computes expected value as the probability-weighted sum of outcomes.',
      },
      {
        id: 'snip-probability-basics-js',
        topic_id: 'ext-probability-basics',
        language: 'javascript',
        is_optimized: true,
        code: `function expectedValue(values, probs) {
  const total = probs.reduce((a, b) => a + b, 0);
  if (Math.abs(total - 1) > 1e-9) throw new Error("probs must sum to 1");
  return values.reduce((acc, v, i) => acc + v * probs[i], 0);
}

const die = [1, 2, 3, 4, 5, 6];
console.log(expectedValue(die, die.map(() => 1 / 6))); // 3.5`,
        explanation: 'Weighted sum of values by their probabilities yields the expected value.',
      },
      {
        id: 'snip-probability-basics-cpp',
        topic_id: 'ext-probability-basics',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

double expectedValue(const vector<double>& values, const vector<double>& probs) {
    double e = 0.0;
    for (size_t i = 0; i < values.size(); ++i)
        e += values[i] * probs[i];   // E[X] = sum v_i * p_i
    return e;
}`,
        explanation: 'Accumulates the probability-weighted sum to produce E[X].',
      },
      {
        id: 'snip-probability-basics-java',
        topic_id: 'ext-probability-basics',
        language: 'java',
        is_optimized: true,
        code: `class Probability {
    static double expectedValue(double[] values, double[] probs) {
        double e = 0.0;
        for (int i = 0; i < values.length; i++)
            e += values[i] * probs[i];   // E[X]
        return e;
    }
}`,
        explanation: 'Java expected-value computation as the sum of value times probability.',
      },
    ],
    quizId: 'quiz-ext-probability-basics',
    quizTitle: 'Probability Basics Quiz',
    quizDescription: 'Check your understanding of events, independence, and expectation.',
    questions: [
      {
        id: 'q-probability-basics-1',
        quiz_id: 'quiz-ext-probability-basics',
        question_text: 'What is the probability of rolling a number greater than 4 on a fair six-sided die?',
        question_type: 'MCQ',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correct_option_index: 1,
        explanation: 'Outcomes 5 and 6 are favorable: 2/6 = 1/3.',
      },
      {
        id: 'q-probability-basics-2',
        quiz_id: 'quiz-ext-probability-basics',
        question_text: 'Linearity of expectation, E[X + Y] = E[X] + E[Y], holds even when X and Y are dependent.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Linearity of expectation requires no independence assumption, making it broadly applicable.',
      },
      {
        id: 'q-probability-basics-3',
        quiz_id: 'quiz-ext-probability-basics',
        question_text: 'For two independent events A and B, P(A and B) equals which of the following?',
        question_type: 'MCQ',
        options: ['P(A) + P(B)', 'P(A) * P(B)', 'P(A) - P(B)', 'max(P(A), P(B))'],
        correct_option_index: 1,
        explanation: 'Independence means the joint probability is the product of the individual probabilities.',
      },
    ],
  },
  // 17. CATALAN NUMBERS
  {
    topic: {
      id: 'ext-catalan-numbers',
      slug: 'catalan-numbers',
      category_id: CATEGORY_IDS.foundations,
      title: 'Catalan Numbers',
      definition: 'The Catalan numbers are a sequence C_0, C_1, C_2, ... that count many recursive combinatorial structures such as balanced parentheses, binary trees, and non-crossing partitions.',
      importance: 'They appear whenever a problem decomposes into two independent balanced parts, giving instant closed-form counts for trees, triangulations, and path problems.',
      prerequisites: ['permutations-combinations'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) with closed form',
      time_complexity_average: 'O(n) via DP',
      time_complexity_worst: 'O(n^2) via naive recurrence',
      space_complexity: 'O(n)',
      display_order: 116,
    },
    sections: [
      {
        id: 'sec-catalan-numbers-1',
        topic_id: 'ext-catalan-numbers',
        title: 'Concept & Intuition',
        content: `The Catalan sequence begins $1, 1, 2, 5, 14, 42, 132, \\dots$

It counts, for example, the number of ways to correctly match $n$ pairs of parentheses, or the number of distinct binary search tree shapes on $n$ nodes. The magic is that all these problems share the same recursive structure.`,
        display_order: 1,
      },
      {
        id: 'sec-catalan-numbers-2',
        topic_id: 'ext-catalan-numbers',
        title: 'Formulas',
        content: `Closed form and recurrence:

$$C_n = \\frac{1}{n+1}\\binom{2n}{n} = \\binom{2n}{n} - \\binom{2n}{n+1}.$$

$$C_{n+1} = \\sum_{i=0}^{n} C_i \\, C_{n-i}, \\quad C_0 = 1.$$

The convolution recurrence reflects splitting a structure into a left part of size $i$ and a right part of size $n-i$.`,
        display_order: 2,
      },
      {
        id: 'sec-catalan-numbers-3',
        topic_id: 'ext-catalan-numbers',
        title: 'What They Count',
        content: `$C_n$ counts:

- Balanced parenthesizations of $n$ pairs.
- Binary trees / BST shapes with $n$ nodes.
- Triangulations of a convex $(n+2)$-gon.
- Monotonic lattice paths that stay below the diagonal (Dyck paths).

> [!NOTE]
> A handy incremental relation is $C_{n+1} = C_n \\cdot \\dfrac{2(2n+1)}{n+2}$, giving each term in $O(1)$.`,
        display_order: 3,
      },
      {
        id: 'sec-catalan-numbers-4',
        topic_id: 'ext-catalan-numbers',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Catalan numbers grow roughly like $4^n / (n^{1.5}\\sqrt{\\pi})$, overflowing 64-bit around $n = 33$. Use big integers or a modulus with modular inverses for large $n$.

When using the closed form modulo a prime, compute $\\binom{2n}{n}$ with modular inverse of $(n+1)$, not integer division.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-catalan-numbers-py',
        topic_id: 'ext-catalan-numbers',
        language: 'python',
        is_optimized: true,
        code: `def catalan(n):
    # O(n) using the incremental relation C_{k+1} = C_k * 2(2k+1)/(k+2)
    c = 1
    for k in range(n):
        c = c * 2 * (2 * k + 1) // (k + 2)
    return c

print([catalan(i) for i in range(6)])  # [1, 1, 2, 5, 14, 42]`,
        explanation: 'Generates Catalan numbers in O(n) using the exact integer incremental formula.',
      },
      {
        id: 'snip-catalan-numbers-js',
        topic_id: 'ext-catalan-numbers',
        language: 'javascript',
        is_optimized: true,
        code: `function catalan(n) {
  let c = 1n;
  for (let k = 0n; k < BigInt(n); k++) {
    c = (c * 2n * (2n * k + 1n)) / (k + 2n);
  }
  return c;
}

console.log([0, 1, 2, 3, 4, 5].map(catalan).map(String)); // 1,1,2,5,14,42`,
        explanation: 'BigInt incremental Catalan computation avoiding overflow for larger n.',
      },
      {
        id: 'snip-catalan-numbers-cpp',
        topic_id: 'ext-catalan-numbers',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

vector<long long> catalanDP(int n) {
    // C[0]=1; C[i+1] = sum C[j]*C[i-j]
    vector<long long> C(n + 1, 0);
    C[0] = 1;
    for (int i = 0; i < n; ++i)
        for (int j = 0; j <= i; ++j)
            C[i + 1] += C[j] * C[i - j];
    return C;
}`,
        explanation: 'Builds Catalan numbers via the convolution recurrence in O(n^2).',
      },
      {
        id: 'snip-catalan-numbers-java',
        topic_id: 'ext-catalan-numbers',
        language: 'java',
        is_optimized: true,
        code: `class Catalan {
    static long[] catalanDP(int n) {
        long[] C = new long[n + 1];
        C[0] = 1;
        for (int i = 0; i < n; i++)
            for (int j = 0; j <= i; j++)
                C[i + 1] += C[j] * C[i - j];   // convolution
        return C;
    }
}`,
        explanation: 'Java Catalan sequence using the split-into-left-and-right convolution recurrence.',
      },
    ],
    quizId: 'quiz-ext-catalan-numbers',
    quizTitle: 'Catalan Numbers Quiz',
    quizDescription: 'Test your knowledge of Catalan numbers and what they count.',
    questions: [
      {
        id: 'q-catalan-numbers-1',
        quiz_id: 'quiz-ext-catalan-numbers',
        question_text: 'What is the 4th Catalan number C_4 (with C_0 = 1)?',
        question_type: 'MCQ',
        options: ['5', '14', '42', '9'],
        correct_option_index: 1,
        explanation: 'The sequence is 1, 1, 2, 5, 14, ..., so C_4 = 14.',
      },
      {
        id: 'q-catalan-numbers-2',
        quiz_id: 'quiz-ext-catalan-numbers',
        question_text: 'The number of distinct binary tree shapes with n nodes equals the n-th Catalan number.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Choosing the left subtree size i partitions the count into C_i * C_{n-1-i}, the Catalan recurrence.',
      },
      {
        id: 'q-catalan-numbers-3',
        quiz_id: 'quiz-ext-catalan-numbers',
        question_text: 'Which closed-form expression gives the n-th Catalan number?',
        question_type: 'MCQ',
        options: ['C(2n, n) / (n + 1)', 'C(2n, n) * (n + 1)', '2^n / n', 'n! / 2'],
        correct_option_index: 0,
        explanation: 'C_n = (1/(n+1)) * C(2n, n) is the standard closed form.',
      },
    ],
  },
  // 18. PIGEONHOLE PRINCIPLE
  {
    topic: {
      id: 'ext-pigeonhole-principle',
      slug: 'pigeonhole-principle',
      category_id: CATEGORY_IDS.foundations,
      title: 'Pigeonhole Principle',
      definition: 'The Pigeonhole Principle states that if n items are placed into m containers and n > m, then at least one container must hold more than one item.',
      importance: 'This deceptively simple counting argument proves the existence of collisions, cycles, and duplicates, and underlies hashing analysis and many existence proofs.',
      prerequisites: [],
      difficulty: 'Beginner',
      time_complexity_best: 'N/A (proof principle)',
      time_complexity_average: 'N/A (proof principle)',
      time_complexity_worst: 'N/A (proof principle)',
      space_complexity: 'N/A (proof principle)',
      display_order: 117,
    },
    sections: [
      {
        id: 'sec-pigeonhole-principle-1',
        topic_id: 'ext-pigeonhole-principle',
        title: 'Concept & Intuition',
        content: `If you have 13 pigeons and only 12 holes, some hole must contain at least two pigeons. More generally, distributing $n$ items into $m < n$ boxes forces at least one box to hold $\\ge 2$ items.

It sounds obvious, yet it powers surprisingly strong existence proofs across mathematics and CS.`,
        display_order: 1,
      },
      {
        id: 'sec-pigeonhole-principle-2',
        topic_id: 'ext-pigeonhole-principle',
        title: 'Generalized Form',
        content: `The **generalized** principle sharpens the bound: distributing $n$ items into $m$ boxes forces some box to contain at least

$$\\left\\lceil \\frac{n}{m} \\right\\rceil$$

items. For example, 100 items in 9 boxes guarantee at least $\\lceil 100/9 \\rceil = 12$ in some box.`,
        display_order: 2,
      },
      {
        id: 'sec-pigeonhole-principle-3',
        topic_id: 'ext-pigeonhole-principle',
        title: 'Algorithmic Uses',
        content: `> [!NOTE]
> Among any $n+1$ integers chosen from $\\{1, \\dots, 2n\\}$, two must be consecutive, and two must have one dividing the other — both classic pigeonhole results.

In CS it explains **hash collisions** (more keys than buckets), **cycle detection** (a finite state space must repeat), and why lossless compression cannot shrink every input.`,
        display_order: 3,
      },
      {
        id: 'sec-pigeonhole-principle-4',
        topic_id: 'ext-pigeonhole-principle',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Pigeonhole proves **existence**, not location — it guarantees a collision exists but does not tell you which box or how to find it efficiently.

Choosing the right "pigeons" and "holes" is the creative step; a poor mapping yields a useless bound.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-pigeonhole-principle-py',
        topic_id: 'ext-pigeonhole-principle',
        language: 'python',
        is_optimized: true,
        code: `def find_duplicate(nums):
    # nums has n+1 values in [1, n]; pigeonhole guarantees a duplicate exists
    seen = set()
    for x in nums:
        if x in seen:
            return x
        seen.add(x)
    return -1  # unreachable given the pigeonhole guarantee`,
        explanation: 'Pigeonhole guarantees a repeat when there are more items than possible distinct values.',
      },
      {
        id: 'snip-pigeonhole-principle-js',
        topic_id: 'ext-pigeonhole-principle',
        language: 'javascript',
        is_optimized: true,
        code: `function findDuplicate(nums) {
  // n+1 values from [1, n] -> a duplicate must exist
  const seen = new Set();
  for (const x of nums) {
    if (seen.has(x)) return x;
    seen.add(x);
  }
  return -1;
}`,
        explanation: 'Detects the guaranteed duplicate that the pigeonhole principle promises.',
      },
      {
        id: 'snip-pigeonhole-principle-cpp',
        topic_id: 'ext-pigeonhole-principle',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <unordered_set>
using namespace std;

int findDuplicate(const vector<int>& nums) {
    // more items than distinct slots => a repeat is inevitable
    unordered_set<int> seen;
    for (int x : nums) {
        if (seen.count(x)) return x;
        seen.insert(x);
    }
    return -1;
}`,
        explanation: 'Confirms the pigeonhole-guaranteed collision by scanning for the first repeat.',
      },
      {
        id: 'snip-pigeonhole-principle-java',
        topic_id: 'ext-pigeonhole-principle',
        language: 'java',
        is_optimized: true,
        code: `import java.util.HashSet;
import java.util.Set;

class Pigeonhole {
    static int findDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int x : nums) {
            if (!seen.add(x)) return x;  // add returns false on repeat
        }
        return -1;
    }
}`,
        explanation: 'Returns the duplicate that must exist when items outnumber possible values.',
      },
    ],
    quizId: 'quiz-ext-pigeonhole-principle',
    quizTitle: 'Pigeonhole Principle Quiz',
    quizDescription: 'Test your understanding of this fundamental counting argument.',
    questions: [
      {
        id: 'q-pigeonhole-principle-1',
        quiz_id: 'quiz-ext-pigeonhole-principle',
        question_text: 'If 10 items are placed into 3 boxes, at least one box must contain at least how many items?',
        question_type: 'MCQ',
        options: ['2', '3', '4', '5'],
        correct_option_index: 2,
        explanation: 'By the generalized principle, some box holds at least ceil(10/3) = 4 items.',
      },
      {
        id: 'q-pigeonhole-principle-2',
        quiz_id: 'quiz-ext-pigeonhole-principle',
        question_text: 'The pigeonhole principle tells you exactly which container holds the extra item.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'It only proves existence of a collision, not its location.',
      },
      {
        id: 'q-pigeonhole-principle-3',
        quiz_id: 'quiz-ext-pigeonhole-principle',
        question_text: 'Which common computer-science phenomenon is a direct consequence of the pigeonhole principle?',
        question_type: 'MCQ',
        options: ['Hash collisions', 'Tail recursion', 'Lazy evaluation', 'Garbage collection'],
        correct_option_index: 0,
        explanation: 'With more possible keys than buckets, two keys must map to the same bucket.',
      },
    ],
  },
  // 19. FLOATING-POINT REPRESENTATION
  {
    topic: {
      id: 'ext-floating-point-representation',
      slug: 'floating-point-representation',
      category_id: CATEGORY_IDS.foundations,
      title: 'Floating-Point Representation',
      definition: 'Floating-point representation stores real numbers in the IEEE 754 format as a sign bit, a biased exponent, and a fractional mantissa, approximating values in scientific-notation form.',
      importance: 'Understanding its finite precision and rounding behavior prevents subtle bugs in numeric comparisons, accumulation, and money calculations.',
      prerequisites: ['bitwise-operations-and-or-xor'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) per operation',
      time_complexity_average: 'O(1) per operation',
      time_complexity_worst: 'O(1) per operation',
      space_complexity: 'O(1)',
      display_order: 118,
    },
    sections: [
      {
        id: 'sec-floating-point-representation-1',
        topic_id: 'ext-floating-point-representation',
        title: 'Concept & Intuition',
        content: `A floating-point number is stored like scientific notation in binary:

$$(-1)^{s} \\times 1.m \\times 2^{e - \\text{bias}}.$$

A 64-bit \`double\` uses **1 sign bit**, **11 exponent bits** (bias 1023), and **52 mantissa bits**. This trades exact representation for an enormous dynamic range.`,
        display_order: 1,
      },
      {
        id: 'sec-floating-point-representation-2',
        topic_id: 'ext-floating-point-representation',
        title: 'Why 0.1 + 0.2 != 0.3',
        content: `Just as $1/3$ has no finite decimal, $0.1$ has no finite **binary** expansion. It is stored as the nearest representable value, so tiny errors accumulate.

> [!IMPORTANT]
> \`0.1 + 0.2\` evaluates to \`0.30000000000000004\`. Never compare floats with \`==\`; instead check \`abs(a - b) < epsilon\` for a small tolerance.`,
        display_order: 2,
      },
      {
        id: 'sec-floating-point-representation-3',
        topic_id: 'ext-floating-point-representation',
        title: 'Precision & Special Values',
        content: `A \`double\` gives about **15-17 significant decimal digits**. IEEE 754 also defines special encodings:

- **Infinity** (from overflow or division by a nonzero value).
- **NaN** (Not a Number), e.g. $0/0$; note $\\text{NaN} \\ne \\text{NaN}$.
- **Signed zero** ($+0$ and $-0$).
- **Subnormals** for values very close to zero.`,
        display_order: 3,
      },
      {
        id: 'sec-floating-point-representation-4',
        topic_id: 'ext-floating-point-representation',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Summing many floats loses precision as magnitudes diverge; use **Kahan summation** or sort by magnitude to reduce error. For exact money math, use integers (cents) or a decimal type.

Large integers beyond $2^{53}$ cannot be represented exactly by a \`double\`, which affects JavaScript's \`Number\` type.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-floating-point-representation-py',
        topic_id: 'ext-floating-point-representation',
        language: 'python',
        is_optimized: true,
        code: `import math

def almost_equal(a, b, rel=1e-9, abs_tol=1e-12):
    # Robust float comparison instead of ==
    return math.isclose(a, b, rel_tol=rel, abs_tol=abs_tol)

print(0.1 + 0.2 == 0.3)                 # False
print(almost_equal(0.1 + 0.2, 0.3))     # True`,
        explanation: 'Uses math.isclose for tolerant float comparison, avoiding exact-equality bugs.',
      },
      {
        id: 'snip-floating-point-representation-js',
        topic_id: 'ext-floating-point-representation',
        language: 'javascript',
        is_optimized: true,
        code: `function almostEqual(a, b, eps = 1e-9) {
  // Combine absolute and relative tolerance
  return Math.abs(a - b) <= eps * Math.max(1, Math.abs(a), Math.abs(b));
}

console.log(0.1 + 0.2 === 0.3);          // false
console.log(almostEqual(0.1 + 0.2, 0.3)); // true`,
        explanation: 'Epsilon comparison scaled by magnitude replaces unreliable === on floats.',
      },
      {
        id: 'snip-floating-point-representation-cpp',
        topic_id: 'ext-floating-point-representation',
        language: 'cpp',
        is_optimized: true,
        code: `#include <cmath>
#include <algorithm>

bool almostEqual(double a, double b, double eps = 1e-9) {
    return std::fabs(a - b) <= eps * std::max({1.0, std::fabs(a), std::fabs(b)});
}`,
        explanation: 'Relative-plus-absolute tolerance comparison for safe double equality checks.',
      },
      {
        id: 'snip-floating-point-representation-java',
        topic_id: 'ext-floating-point-representation',
        language: 'java',
        is_optimized: true,
        code: `class FloatCompare {
    static boolean almostEqual(double a, double b, double eps) {
        return Math.abs(a - b) <= eps * Math.max(1.0, Math.max(Math.abs(a), Math.abs(b)));
    }
    static boolean almostEqual(double a, double b) {
        return almostEqual(a, b, 1e-9);
    }
}`,
        explanation: 'Java tolerant float comparison scaling epsilon by the operand magnitudes.',
      },
    ],
    quizId: 'quiz-ext-floating-point-representation',
    quizTitle: 'Floating-Point Representation Quiz',
    quizDescription: 'Test your understanding of IEEE 754 and precision issues.',
    questions: [
      {
        id: 'q-floating-point-representation-1',
        quiz_id: 'quiz-ext-floating-point-representation',
        question_text: 'Why does 0.1 + 0.2 not exactly equal 0.3 in IEEE 754 arithmetic?',
        question_type: 'MCQ',
        options: ['A CPU bug', '0.1 and 0.2 have no exact finite binary representation', 'Integer overflow', 'The compiler rounds down'],
        correct_option_index: 1,
        explanation: '0.1 and 0.2 are non-terminating in binary, so they are stored approximately.',
      },
      {
        id: 'q-floating-point-representation-2',
        quiz_id: 'quiz-ext-floating-point-representation',
        question_text: 'In IEEE 754, the value NaN is not equal to itself (NaN == NaN is false).',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'By the standard, any comparison involving NaN (including equality) returns false.',
      },
      {
        id: 'q-floating-point-representation-3',
        quiz_id: 'quiz-ext-floating-point-representation',
        question_text: 'How many bits form the mantissa (fraction) of a 64-bit IEEE 754 double?',
        question_type: 'MCQ',
        options: ['23', '52', '11', '64'],
        correct_option_index: 1,
        explanation: 'A double has 1 sign bit, 11 exponent bits, and 52 mantissa bits.',
      },
    ],
  },
  // 20. MEMORY CONTIGUITY
  {
    topic: {
      id: 'ext-memory-contiguity',
      slug: 'memory-contiguity',
      category_id: CATEGORY_IDS.foundations,
      title: 'Memory Contiguity',
      definition: 'Memory contiguity refers to storing data elements in adjacent memory addresses, as arrays do, enabling constant-time indexing and cache-friendly sequential access.',
      importance: 'Contiguous layout is why arrays outperform linked lists in practice; it maximizes CPU cache hits and enables vectorized, predictable access patterns.',
      prerequisites: ['pointers-references'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) indexed access',
      time_complexity_average: 'O(1) indexed access',
      time_complexity_worst: 'O(n) resize/insert-middle',
      space_complexity: 'O(n)',
      display_order: 119,
    },
    sections: [
      {
        id: 'sec-memory-contiguity-1',
        topic_id: 'ext-memory-contiguity',
        title: 'Concept & Intuition',
        content: `A **contiguous** structure stores its elements back-to-back in memory. Because element $i$ lives at address $\\text{base} + i \\times \\text{size}$, you can jump to any index with a single multiply-and-add — $O(1)$ random access.

Linked structures, by contrast, scatter nodes across memory and require pointer chasing.`,
        display_order: 1,
      },
      {
        id: 'sec-memory-contiguity-2',
        topic_id: 'ext-memory-contiguity',
        title: 'Cache Locality',
        content: `Modern CPUs fetch memory in **cache lines** (typically 64 bytes), not single bytes. When you read one array element, its neighbors come along for free.

> [!IMPORTANT]
> This **spatial locality** makes sequential array traversal dramatically faster than jumping through a linked list, even when both are $O(n)$ in theory.`,
        display_order: 2,
      },
      {
        id: 'sec-memory-contiguity-3',
        topic_id: 'ext-memory-contiguity',
        title: 'Row-Major vs Column-Major',
        content: `2D arrays are flattened into 1D memory. In **row-major** order (C, C++, Java), a whole row is contiguous; in **column-major** (Fortran, MATLAB), a column is.

Iterating in the same order as storage keeps accesses contiguous. Iterating a row-major matrix column-by-column causes cache misses and can be many times slower.`,
        display_order: 3,
      },
      {
        id: 'sec-memory-contiguity-4',
        topic_id: 'ext-memory-contiguity',
        title: 'Trade-offs & Pitfalls',
        content: `> [!WARNING]
> Insertions/deletions in the middle of a contiguous array are $O(n)$ because elements must shift. Dynamic arrays also occasionally reallocate and copy everything when they grow.

Choose contiguous storage for fast iteration and indexing; choose linked structures when frequent middle insertions dominate.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-memory-contiguity-py',
        topic_id: 'ext-memory-contiguity',
        language: 'python',
        is_optimized: true,
        code: `import time

def sum_row_major(matrix):
    # Traverse in storage order (row by row) for cache-friendly access
    total = 0
    for row in matrix:
        for val in row:
            total += val
    return total

grid = [[i * 1000 + j for j in range(1000)] for i in range(1000)]
print(sum_row_major(grid))`,
        explanation: 'Iterates a matrix in row-major storage order to maximize contiguous, cache-friendly reads.',
      },
      {
        id: 'snip-memory-contiguity-js',
        topic_id: 'ext-memory-contiguity',
        language: 'javascript',
        is_optimized: true,
        code: `function sumContiguous(flat, rows, cols) {
  // A flat typed array is truly contiguous; index = r * cols + c
  let total = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      total += flat[r * cols + c];
  return total;
}

const rows = 1000, cols = 1000;
const flat = new Int32Array(rows * cols).fill(1);
console.log(sumContiguous(flat, rows, cols)); // 1000000`,
        explanation: 'A flat Int32Array stores elements contiguously; row-major indexing keeps access sequential.',
      },
      {
        id: 'snip-memory-contiguity-cpp',
        topic_id: 'ext-memory-contiguity',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

long long sumRowMajor(const vector<int>& flat, int rows, int cols) {
    long long total = 0;
    for (int r = 0; r < rows; ++r)
        for (int c = 0; c < cols; ++c)
            total += flat[r * cols + c];   // contiguous stride of 1
    return total;
}`,
        explanation: 'Reads a flattened matrix in row-major order so consecutive accesses hit the same cache line.',
      },
      {
        id: 'snip-memory-contiguity-java',
        topic_id: 'ext-memory-contiguity',
        language: 'java',
        is_optimized: true,
        code: `class Contiguity {
    // A 1D array guarantees contiguity; 2D array-of-arrays does not
    static long sumRowMajor(int[] flat, int rows, int cols) {
        long total = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                total += flat[r * cols + c];
        return total;
    }
}`,
        explanation: 'Flattened storage plus row-major traversal preserves contiguous, cache-friendly access.',
      },
    ],
    quizId: 'quiz-ext-memory-contiguity',
    quizTitle: 'Memory Contiguity Quiz',
    quizDescription: 'Test your understanding of contiguous storage and cache behavior.',
    questions: [
      {
        id: 'q-memory-contiguity-1',
        quiz_id: 'quiz-ext-memory-contiguity',
        question_text: 'What property lets an array access element i in O(1) time?',
        question_type: 'MCQ',
        options: ['Elements are sorted', 'Elements are at base + i * element_size (contiguous)', 'Each element stores a pointer', 'The array is immutable'],
        correct_option_index: 1,
        explanation: 'Contiguous layout allows computing any address directly via a single arithmetic formula.',
      },
      {
        id: 'q-memory-contiguity-2',
        quiz_id: 'quiz-ext-memory-contiguity',
        question_text: 'Traversing a row-major 2D array column-by-column is typically slower than row-by-row due to cache misses.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Column-wise access jumps across rows, breaking spatial locality and causing cache misses.',
      },
      {
        id: 'q-memory-contiguity-3',
        quiz_id: 'quiz-ext-memory-contiguity',
        question_text: 'What is the time complexity of inserting an element in the middle of a contiguous array?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correct_option_index: 2,
        explanation: 'All elements after the insertion point must shift, costing O(n).',
      },
    ],
  },
  // 21. POINTERS & REFERENCES
  {
    topic: {
      id: 'ext-pointers-references',
      slug: 'pointers-references',
      category_id: CATEGORY_IDS.foundations,
      title: 'Pointers & References',
      definition: 'A pointer is a variable that stores the memory address of another value, while a reference is an alias to an existing variable; both provide indirect access to data.',
      importance: 'They enable dynamic data structures (linked lists, trees, graphs), efficient parameter passing without copying, and are fundamental to understanding memory in systems languages.',
      prerequisites: [],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) dereference',
      time_complexity_average: 'O(1) dereference',
      time_complexity_worst: 'O(1) dereference',
      space_complexity: 'O(1) per pointer',
      display_order: 120,
    },
    sections: [
      {
        id: 'sec-pointers-references-1',
        topic_id: 'ext-pointers-references',
        title: 'Concept & Intuition',
        content: `Every variable lives at some **memory address**. A **pointer** holds that address; dereferencing it (\`*p\`) reads or writes the value it points to. Think of a pointer as a slip of paper with a house's street address written on it.

A **reference** is a permanent alias: another name for the same storage, without the explicit address arithmetic.`,
        display_order: 1,
      },
      {
        id: 'sec-pointers-references-2',
        topic_id: 'ext-pointers-references',
        title: 'Pointers vs References',
        content: `In C++:
- A **pointer** can be reassigned, can be null, and supports arithmetic.
- A **reference** must be bound at initialization, cannot be rebound, and cannot be null.

> [!NOTE]
> Java and Python have no raw pointers; object variables are **references** (handles) to heap objects. Assigning one variable to another copies the reference, not the object.`,
        display_order: 2,
      },
      {
        id: 'sec-pointers-references-3',
        topic_id: 'ext-pointers-references',
        title: 'Pass by Value vs Reference',
        content: `Passing by **value** copies the argument, so callee changes do not affect the caller. Passing by **reference** (or a pointer) shares the same object, so mutations are visible outside.

This is why appending to a list passed into a Python function changes the caller's list — the reference points to the same underlying object.`,
        display_order: 3,
      },
      {
        id: 'sec-pointers-references-4',
        topic_id: 'ext-pointers-references',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Classic pointer bugs include **null dereferences**, **dangling pointers** (pointing to freed memory), **memory leaks** (lost allocations), and **double frees**. Prefer smart pointers (\`unique_ptr\`, \`shared_ptr\`) in modern C++.

In managed languages, watch for **aliasing** surprises: two variables referencing one mutable object.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-pointers-references-py',
        topic_id: 'ext-pointers-references',
        language: 'python',
        is_optimized: true,
        code: `def append_ref(lst):
    lst.append(99)          # mutates the caller's list (shared reference)

def rebind(lst):
    lst = [0]               # rebinds local name only; caller unaffected

data = [1, 2, 3]
append_ref(data)
print(data)                 # [1, 2, 3, 99]
rebind(data)
print(data)                 # [1, 2, 3, 99] unchanged`,
        explanation: 'Shows Python passes object references: mutation is shared but rebinding is local.',
      },
      {
        id: 'snip-pointers-references-js',
        topic_id: 'ext-pointers-references',
        language: 'javascript',
        is_optimized: true,
        code: `function mutate(arr) {
  arr.push(99);   // shared reference: visible to caller
}
function rebind(arr) {
  arr = [0];      // local rebinding only
}

const data = [1, 2, 3];
mutate(data);
console.log(data); // [1, 2, 3, 99]
rebind(data);
console.log(data); // [1, 2, 3, 99]`,
        explanation: 'Objects are passed by reference value: mutations propagate, reassignments do not.',
      },
      {
        id: 'snip-pointers-references-cpp',
        topic_id: 'ext-pointers-references',
        language: 'cpp',
        is_optimized: true,
        code: `#include <iostream>

void byPointer(int* p) { if (p) *p += 10; }  // may be null; deref to modify
void byReference(int& r) { r += 10; }        // alias, never null

int main() {
    int x = 5;
    byPointer(&x);    // x becomes 15
    byReference(x);   // x becomes 25
    std::cout << x << "\\n";  // 25
}`,
        explanation: 'Contrasts a nullable pointer parameter with a non-null reference; both modify the caller.',
      },
      {
        id: 'snip-pointers-references-java',
        topic_id: 'ext-pointers-references',
        language: 'java',
        is_optimized: true,
        code: `import java.util.ArrayList;
import java.util.List;

class Refs {
    static void mutate(List<Integer> list) { list.add(99); }  // shared reference
    static void rebind(List<Integer> list) { list = new ArrayList<>(); }

    public static void main(String[] args) {
        List<Integer> data = new ArrayList<>(List.of(1, 2, 3));
        mutate(data);   // [1, 2, 3, 99]
        rebind(data);   // still [1, 2, 3, 99]
        System.out.println(data);
    }
}`,
        explanation: 'Java passes references by value: object mutation is shared, reassignment is not.',
      },
    ],
    quizId: 'quiz-ext-pointers-references',
    quizTitle: 'Pointers & References Quiz',
    quizDescription: 'Test your understanding of indirection and parameter passing.',
    questions: [
      {
        id: 'q-pointers-references-1',
        quiz_id: 'quiz-ext-pointers-references',
        question_text: 'What does dereferencing a pointer do?',
        question_type: 'MCQ',
        options: ['Frees its memory', 'Accesses the value stored at the address it holds', 'Sets it to null', 'Doubles the address'],
        correct_option_index: 1,
        explanation: 'Dereferencing follows the stored address to read or write the pointed-to value.',
      },
      {
        id: 'q-pointers-references-2',
        quiz_id: 'quiz-ext-pointers-references',
        question_text: 'In Java and Python, reassigning a parameter variable inside a function changes the caller\u2019s original variable.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'References are passed by value, so rebinding the local name does not affect the caller.',
      },
      {
        id: 'q-pointers-references-3',
        quiz_id: 'quiz-ext-pointers-references',
        question_text: 'Which of these is a classic pointer-related bug?',
        question_type: 'MCQ',
        options: ['Dangling pointer to freed memory', 'Tail-call optimization', 'Cache prefetching', 'Loop unrolling'],
        correct_option_index: 0,
        explanation: 'A dangling pointer references memory that has already been freed, causing undefined behavior.',
      },
    ],
  },
  // 22. STRUCTS & CLASSES
  {
    topic: {
      id: 'ext-structs-classes',
      slug: 'structs-classes',
      category_id: CATEGORY_IDS.foundations,
      title: 'Structs & Classes',
      definition: 'Structs and classes are user-defined composite types that bundle related fields (and, for classes, behavior) into a single named unit, forming the building blocks of custom data structures.',
      importance: 'They let you model real-world entities and design nodes for linked lists, trees, and graphs, providing the abstraction and encapsulation that scalable code depends on.',
      prerequisites: ['pointers-references'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1) field access',
      time_complexity_average: 'O(1) field access',
      time_complexity_worst: 'O(1) field access',
      space_complexity: 'O(sum of field sizes)',
      display_order: 121,
    },
    sections: [
      {
        id: 'sec-structs-classes-1',
        topic_id: 'ext-structs-classes',
        title: 'Concept & Intuition',
        content: `A **struct** or **class** groups several values under one type. Instead of juggling separate \`x\` and \`y\` variables, you define a \`Point\` with both fields, treating a point as one cohesive object.

Classes additionally attach **methods** (behavior) and **access control**, enabling encapsulation.`,
        display_order: 1,
      },
      {
        id: 'sec-structs-classes-2',
        topic_id: 'ext-structs-classes',
        title: 'Struct vs Class',
        content: `The distinction varies by language:

- **C**: \`struct\` holds only data; no methods.
- **C++**: \`struct\` and \`class\` are nearly identical; the only default difference is access — \`struct\` members are \`public\`, \`class\` members are \`private\`.
- **Java/Python**: no plain structs; everything is a class (Java records and Python dataclasses offer lightweight data-only variants).`,
        display_order: 2,
      },
      {
        id: 'sec-structs-classes-3',
        topic_id: 'ext-structs-classes',
        title: 'Building Data Structures',
        content: `Custom types shine when defining **nodes**. A linked-list node holds a value plus a pointer/reference to the next node; a tree node adds \`left\` and \`right\` children.

> [!NOTE]
> Field access is $O(1)$ — computed as a fixed offset from the object's base address, just like array indexing.`,
        display_order: 3,
      },
      {
        id: 'sec-structs-classes-4',
        topic_id: 'ext-structs-classes',
        title: 'Memory Layout & Pitfalls',
        content: `> [!WARNING]
> Compilers insert **padding** between fields to satisfy alignment, so a struct's size may exceed the sum of its fields. Reordering fields from largest to smallest can reduce wasted space.

Also beware shallow vs deep copies: copying an object with reference fields duplicates the references, not the referenced data, unless you deep-copy explicitly.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-structs-classes-py',
        topic_id: 'ext-structs-classes',
        language: 'python',
        is_optimized: true,
        code: `from dataclasses import dataclass
from typing import Optional

@dataclass
class ListNode:
    val: int
    next: Optional["ListNode"] = None

# Build 1 -> 2 -> 3
head = ListNode(1, ListNode(2, ListNode(3)))
node = head
while node:
    print(node.val)
    node = node.next`,
        explanation: 'A dataclass models a linked-list node concisely, bundling value and next reference.',
      },
      {
        id: 'snip-structs-classes-js',
        topic_id: 'ext-structs-classes',
        language: 'javascript',
        is_optimized: true,
        code: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const head = new ListNode(1, new ListNode(2, new ListNode(3)));
for (let node = head; node; node = node.next) {
  console.log(node.val);
}`,
        explanation: 'A class encapsulates the node fields and constructs a small linked list.',
      },
      {
        id: 'snip-structs-classes-cpp',
        topic_id: 'ext-structs-classes',
        language: 'cpp',
        is_optimized: true,
        code: `#include <iostream>

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int v, ListNode* n = nullptr) : val(v), next(n) {}
};

int main() {
    ListNode* head = new ListNode(1, new ListNode(2, new ListNode(3)));
    for (ListNode* node = head; node; node = node->next)
        std::cout << node->val << "\\n";
}`,
        explanation: 'A struct with a constructor forms linked-list nodes accessed via pointers.',
      },
      {
        id: 'snip-structs-classes-java',
        topic_id: 'ext-structs-classes',
        language: 'java',
        is_optimized: true,
        code: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Demo {
    public static void main(String[] args) {
        ListNode head = new ListNode(1, new ListNode(2, new ListNode(3, null)));
        for (ListNode node = head; node != null; node = node.next)
            System.out.println(node.val);
    }
}`,
        explanation: 'A Java class defines the node type and builds a traversable linked list.',
      },
    ],
    quizId: 'quiz-ext-structs-classes',
    quizTitle: 'Structs & Classes Quiz',
    quizDescription: 'Test your understanding of composite types and their layout.',
    questions: [
      {
        id: 'q-structs-classes-1',
        quiz_id: 'quiz-ext-structs-classes',
        question_text: 'In C++, what is the default access level difference between struct and class?',
        question_type: 'MCQ',
        options: ['struct is private, class is public', 'struct is public, class is private', 'Both are private', 'Both are protected'],
        correct_option_index: 1,
        explanation: 'struct members default to public; class members default to private.',
      },
      {
        id: 'q-structs-classes-2',
        quiz_id: 'quiz-ext-structs-classes',
        question_text: 'A struct\u2019s total size in memory can be larger than the sum of its field sizes due to alignment padding.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Compilers add padding so fields meet alignment requirements, increasing overall size.',
      },
      {
        id: 'q-structs-classes-3',
        quiz_id: 'quiz-ext-structs-classes',
        question_text: 'What is the time complexity of accessing a field of a struct or class instance?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correct_option_index: 0,
        explanation: 'A field lives at a fixed offset from the base address, so access is constant time.',
      },
    ],
  },
  // 23. AMORTIZED ANALYSIS
  {
    topic: {
      id: 'ext-amortized-analysis',
      slug: 'amortized-analysis',
      category_id: CATEGORY_IDS.foundations,
      title: 'Amortized Analysis',
      definition: 'Amortized analysis computes the average cost per operation over a worst-case sequence of operations, giving a realistic bound when occasional expensive operations are offset by many cheap ones.',
      importance: 'It explains why dynamic arrays, hash tables, and union-find are efficient in practice even though individual operations can occasionally be costly.',
      prerequisites: ['big-o-notation'],
      difficulty: 'Intermediate',
      time_complexity_best: 'N/A (analysis technique)',
      time_complexity_average: 'N/A (analysis technique)',
      time_complexity_worst: 'N/A (analysis technique)',
      space_complexity: 'N/A (analysis technique)',
      display_order: 122,
    },
    sections: [
      {
        id: 'sec-amortized-analysis-1',
        topic_id: 'ext-amortized-analysis',
        title: 'Concept & Intuition',
        content: `Some operations are usually cheap but occasionally expensive. **Amortized analysis** spreads the rare expensive cost across the many cheap ones to find the true average.

It differs from average-case analysis: amortized bounds are **worst-case over a sequence**, requiring no probability assumptions about inputs.`,
        display_order: 1,
      },
      {
        id: 'sec-amortized-analysis-2',
        topic_id: 'ext-amortized-analysis',
        title: 'The Dynamic Array Example',
        content: `A dynamic array doubles its capacity when full. A single \`push\` is usually $O(1)$, but a resize copies all $n$ elements — $O(n)$.

Yet across $n$ pushes, the total copying work is $n + n/2 + n/4 + \\dots < 2n$, so the **amortized cost per push is $O(1)$**. Doubling (not adding a constant) is what makes this work.`,
        display_order: 2,
      },
      {
        id: 'sec-amortized-analysis-3',
        topic_id: 'ext-amortized-analysis',
        title: 'Three Methods',
        content: `1. **Aggregate**: total cost of $n$ operations divided by $n$.
2. **Accounting (banker's)**: charge cheap operations extra "credit" saved to pay for future expensive ones.
3. **Potential**: define a potential function $\\Phi$ on the data structure; amortized cost = actual cost + $\\Delta\\Phi$.

> [!NOTE]
> All three give the same bound; choose whichever is easiest to reason about for a given structure.`,
        display_order: 3,
      },
      {
        id: 'sec-amortized-analysis-4',
        topic_id: 'ext-amortized-analysis',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Amortized $O(1)$ does **not** mean every operation is $O(1)$ — a single call may still spike to $O(n)$. This matters for **real-time systems** where per-operation latency has hard limits.

Also, if a structure grows by a **fixed increment** instead of doubling, pushes become amortized $O(n)$, not $O(1)$.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-amortized-analysis-py',
        topic_id: 'ext-amortized-analysis',
        language: 'python',
        is_optimized: true,
        code: `class DynamicArray:
    def __init__(self):
        self._data = [None]
        self._size = 0

    def push(self, x):
        if self._size == len(self._data):     # full -> double (amortized O(1))
            self._data += [None] * len(self._data)
        self._data[self._size] = x
        self._size += 1

    def __getitem__(self, i):
        return self._data[i]`,
        explanation: 'Capacity doubling makes push amortized O(1) despite occasional O(n) resizes.',
      },
      {
        id: 'snip-amortized-analysis-js',
        topic_id: 'ext-amortized-analysis',
        language: 'javascript',
        is_optimized: true,
        code: `class DynamicArray {
  constructor() { this.data = new Array(1); this.size = 0; }
  push(x) {
    if (this.size === this.data.length) {       // double capacity
      const bigger = new Array(this.data.length * 2);
      for (let i = 0; i < this.size; i++) bigger[i] = this.data[i];
      this.data = bigger;
    }
    this.data[this.size++] = x;
  }
  get(i) { return this.data[i]; }
}`,
        explanation: 'Manual doubling demonstrates the amortized O(1) push behind array growth.',
      },
      {
        id: 'snip-amortized-analysis-cpp',
        topic_id: 'ext-amortized-analysis',
        language: 'cpp',
        is_optimized: true,
        code: `#include <cstring>

struct DynamicArray {
    int* data; int size, cap;
    DynamicArray() : data(new int[1]), size(0), cap(1) {}
    void push(int x) {
        if (size == cap) {                 // double and copy: amortized O(1)
            int* bigger = new int[cap * 2];
            std::memcpy(bigger, data, size * sizeof(int));
            delete[] data; data = bigger; cap *= 2;
        }
        data[size++] = x;
    }
    ~DynamicArray() { delete[] data; }
};`,
        explanation: 'Doubling capacity on overflow keeps the amortized cost of push constant.',
      },
      {
        id: 'snip-amortized-analysis-java',
        topic_id: 'ext-amortized-analysis',
        language: 'java',
        is_optimized: true,
        code: `import java.util.Arrays;

class DynamicArray {
    private int[] data = new int[1];
    private int size = 0;

    void push(int x) {
        if (size == data.length)                 // grow by doubling
            data = Arrays.copyOf(data, data.length * 2);
        data[size++] = x;
    }
    int get(int i) { return data[i]; }
}`,
        explanation: 'Arrays.copyOf doubling yields amortized O(1) push, matching ArrayList behavior.',
      },
    ],
    quizId: 'quiz-ext-amortized-analysis',
    quizTitle: 'Amortized Analysis Quiz',
    quizDescription: 'Test your grasp of amortized costs and analysis techniques.',
    questions: [
      {
        id: 'q-amortized-analysis-1',
        quiz_id: 'quiz-ext-amortized-analysis',
        question_text: 'What is the amortized time complexity of pushing to a dynamic array that doubles capacity when full?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correct_option_index: 0,
        explanation: 'Total copy work over n pushes is under 2n, so the amortized cost per push is O(1).',
      },
      {
        id: 'q-amortized-analysis-2',
        quiz_id: 'quiz-ext-amortized-analysis',
        question_text: 'Amortized O(1) guarantees that every single operation runs in O(1) time.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Individual operations (like a resize) may be O(n); only the average over a sequence is O(1).',
      },
      {
        id: 'q-amortized-analysis-3',
        quiz_id: 'quiz-ext-amortized-analysis',
        question_text: 'Which is NOT one of the three standard methods of amortized analysis?',
        question_type: 'MCQ',
        options: ['Aggregate method', 'Accounting (banker\u2019s) method', 'Potential method', 'Divide-and-conquer method'],
        correct_option_index: 3,
        explanation: 'The three techniques are aggregate, accounting, and potential; divide-and-conquer is unrelated.',
      },
    ],
  },
  // 24. TAIL RECURSION
  {
    topic: {
      id: 'ext-tail-recursion',
      slug: 'tail-recursion',
      category_id: CATEGORY_IDS.foundations,
      title: 'Tail Recursion',
      definition: 'Tail recursion is a form of recursion where the recursive call is the last operation in the function, allowing compilers to reuse the current stack frame and run it in constant space.',
      importance: 'It lets recursive code achieve iteration-level efficiency, avoiding stack overflow on deep recursion when the language performs tail-call optimization.',
      prerequisites: ['space-complexity'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(n)',
      time_complexity_average: 'O(n)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(1) with TCO, O(n) without',
      display_order: 123,
    },
    sections: [
      {
        id: 'sec-tail-recursion-1',
        topic_id: 'ext-tail-recursion',
        title: 'Concept & Intuition',
        content: `A recursive call is in **tail position** if nothing happens after it returns — its result is returned directly. Compare:

- Non-tail: \`return n * factorial(n - 1)\` (a multiply happens *after* the call).
- Tail: \`return factorial(n - 1, acc * n)\` (the call is the very last action).

In the tail form, the caller's frame has no more work, so it can be discarded.`,
        display_order: 1,
      },
      {
        id: 'sec-tail-recursion-2',
        topic_id: 'ext-tail-recursion',
        title: 'Tail-Call Optimization',
        content: `**Tail-call optimization (TCO)** reuses the current stack frame for the recursive call instead of pushing a new one, turning recursion into a loop under the hood and reducing space from $O(n)$ to $O(1)$.

> [!IMPORTANT]
> Accumulator parameters are the standard technique to convert ordinary recursion into tail-recursive form.`,
        display_order: 2,
      },
      {
        id: 'sec-tail-recursion-3',
        topic_id: 'ext-tail-recursion',
        title: 'Language Support',
        content: `TCO is **not universal**:

- **Scheme, Scala, Kotlin** (with \`tailrec\`), and many functional languages guarantee it.
- **C/C++** compilers often apply it at optimization levels.
- **Python, Java, and most JS engines do NOT** perform TCO — deep tail recursion still overflows the stack there.`,
        display_order: 3,
      },
      {
        id: 'sec-tail-recursion-4',
        topic_id: 'ext-tail-recursion',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Writing tail-recursive code does not help if your language lacks TCO — you will still hit a **stack overflow** for large inputs. In such languages, convert to an explicit loop.

Also, a call is only a tail call if it is truly the last operation; wrapping it in \`try/finally\` or arithmetic breaks the property.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-tail-recursion-py',
        topic_id: 'ext-tail-recursion',
        language: 'python',
        is_optimized: true,
        code: `def factorial(n, acc=1):
    # Tail-recursive form (note: CPython lacks TCO, so this still uses O(n) stack)
    if n <= 1:
        return acc
    return factorial(n - 1, acc * n)   # recursive call is the last action

print(factorial(5))  # 120`,
        explanation: 'Uses an accumulator so the recursive call sits in tail position (the last action).',
      },
      {
        id: 'snip-tail-recursion-js',
        topic_id: 'ext-tail-recursion',
        language: 'javascript',
        is_optimized: true,
        code: `function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, acc * n);   // tail call
}

console.log(factorial(5)); // 120`,
        explanation: 'Accumulator-based tail recursion; whether it is optimized depends on the JS engine.',
      },
      {
        id: 'snip-tail-recursion-cpp',
        topic_id: 'ext-tail-recursion',
        language: 'cpp',
        is_optimized: true,
        code: `long long factorial(int n, long long acc = 1) {
    if (n <= 1) return acc;
    return factorial(n - 1, acc * n);  // tail call; GCC/Clang can optimize to a loop
}`,
        explanation: 'Tail-recursive factorial that optimizing C++ compilers can turn into iteration.',
      },
      {
        id: 'snip-tail-recursion-java',
        topic_id: 'ext-tail-recursion',
        language: 'java',
        is_optimized: true,
        code: `class TailRec {
    // Written in tail form, but the JVM lacks TCO, so an explicit loop is safer:
    static long factorial(int n) {
        long acc = 1;
        for (int i = 2; i <= n; i++) acc *= i;
        return acc;
    }
}`,
        explanation: 'Since the JVM lacks TCO, the tail-recursive idea is realized as an equivalent loop.',
      },
    ],
    quizId: 'quiz-ext-tail-recursion',
    quizTitle: 'Tail Recursion Quiz',
    quizDescription: 'Test your understanding of tail calls and their optimization.',
    questions: [
      {
        id: 'q-tail-recursion-1',
        quiz_id: 'quiz-ext-tail-recursion',
        question_text: 'A recursive call is in tail position when it is the last operation before returning.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'If nothing follows the recursive call, the frame can be reused (a tail call).',
      },
      {
        id: 'q-tail-recursion-2',
        quiz_id: 'quiz-ext-tail-recursion',
        question_text: 'With tail-call optimization, what is the space complexity of tail-recursive factorial?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correct_option_index: 0,
        explanation: 'TCO reuses one stack frame, reducing the recursion space from O(n) to O(1).',
      },
      {
        id: 'q-tail-recursion-3',
        quiz_id: 'quiz-ext-tail-recursion',
        question_text: 'Which technique converts ordinary recursion into tail-recursive form?',
        question_type: 'MCQ',
        options: ['Adding an accumulator parameter', 'Using global variables', 'Increasing recursion depth', 'Wrapping calls in try/finally'],
        correct_option_index: 0,
        explanation: 'Carrying the partial result in an accumulator moves the recursive call to tail position.',
      },
    ],
  },
  // 25. BITWISE LEFT & RIGHT SHIFTS
  {
    topic: {
      id: 'ext-bitwise-left-right-shifts',
      slug: 'bitwise-left-right-shifts',
      category_id: CATEGORY_IDS.foundations,
      title: 'Bitwise Left & Right Shifts',
      definition: 'Shift operators move the bits of an integer left or right by a given number of positions, effectively multiplying or dividing by powers of two.',
      importance: 'Shifts provide the fastest way to scale by powers of two, build bit masks, and pack or unpack fields, and appear in hashing, graphics, and low-level optimization.',
      prerequisites: ['bit-manipulation-basics'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(1)',
      time_complexity_worst: 'O(1)',
      space_complexity: 'O(1)',
      display_order: 124,
    },
    sections: [
      {
        id: 'sec-bitwise-left-right-shifts-1',
        topic_id: 'ext-bitwise-left-right-shifts',
        title: 'Concept & Intuition',
        content: `A **left shift** \`x << k\` moves every bit $k$ positions toward the most-significant end, filling the vacated low bits with zeros. This multiplies by $2^k$:

$$x \\ll k = x \\times 2^k.$$

A **right shift** \`x >> k\` moves bits toward the least-significant end, effectively dividing by $2^k$ (flooring).`,
        display_order: 1,
      },
      {
        id: 'sec-bitwise-left-right-shifts-2',
        topic_id: 'ext-bitwise-left-right-shifts',
        title: 'Logical vs Arithmetic Right Shift',
        content: `Right shifts come in two kinds:

- **Logical shift** fills the top with zeros (for unsigned values).
- **Arithmetic shift** fills the top with the **sign bit**, preserving the sign of negative numbers.

> [!IMPORTANT]
> In Java, \`>>\` is arithmetic and \`>>>\` is logical. In C/C++, right-shifting a signed negative is implementation-defined (usually arithmetic).`,
        display_order: 2,
      },
      {
        id: 'sec-bitwise-left-right-shifts-3',
        topic_id: 'ext-bitwise-left-right-shifts',
        title: 'Common Uses',
        content: `- \`1 << k\` builds a mask with a single set bit at position $k$ (the value $2^k$).
- \`(x >> k) & 1\` extracts the $k$-th bit.
- \`x >> 1\` halves; \`x << 1\` doubles — often faster and clearer than \`* 2\` or \`/ 2\`.
- Packing two 16-bit values into 32 bits: \`(a << 16) | b\`.`,
        display_order: 3,
      },
      {
        id: 'sec-bitwise-left-right-shifts-4',
        topic_id: 'ext-bitwise-left-right-shifts',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Shifting by an amount $\\ge$ the bit-width is **undefined behavior** in C/C++. In Java the shift count is taken modulo the type width (so \`1 << 32\` equals \`1 << 0 = 1\`, not 0). In JavaScript, operands are treated as 32-bit signed integers.

Left-shifting into the sign bit of a signed type can also cause overflow surprises.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-bitwise-left-right-shifts-py',
        topic_id: 'ext-bitwise-left-right-shifts',
        language: 'python',
        is_optimized: true,
        code: `def mul_pow2(x, k):  return x << k     # x * 2^k
def div_pow2(x, k):  return x >> k     # floor(x / 2^k) for x >= 0
def kth_bit(x, k):   return (x >> k) & 1

print(mul_pow2(3, 4))   # 48
print(div_pow2(100, 3)) # 12
print(kth_bit(0b1010, 1))  # 1`,
        explanation: 'Shifts implement fast multiply/divide by powers of two and single-bit extraction.',
      },
      {
        id: 'snip-bitwise-left-right-shifts-js',
        topic_id: 'ext-bitwise-left-right-shifts',
        language: 'javascript',
        is_optimized: true,
        code: `const mulPow2 = (x, k) => x << k;   // operands treated as 32-bit ints
const divPow2 = (x, k) => x >> k;   // arithmetic (sign-preserving) shift
const divPow2Logical = (x, k) => x >>> k; // logical (zero-fill) shift

console.log(mulPow2(3, 4));  // 48
console.log(divPow2(-16, 2)); // -4
console.log(divPow2Logical(-16, 2)); // large positive (zero-filled)`,
        explanation: 'Demonstrates JS arithmetic (>>) versus logical (>>>) right shifts on 32-bit ints.',
      },
      {
        id: 'snip-bitwise-left-right-shifts-cpp',
        topic_id: 'ext-bitwise-left-right-shifts',
        language: 'cpp',
        is_optimized: true,
        code: `unsigned mulPow2(unsigned x, int k) { return x << k; }
unsigned divPow2(unsigned x, int k) { return x >> k; }  // logical for unsigned
int      kthBit(unsigned x, int k)  { return (x >> k) & 1; }

// Pack two 16-bit halves into one 32-bit value
unsigned pack(unsigned hi, unsigned lo) { return (hi << 16) | (lo & 0xFFFF); }`,
        explanation: 'Uses unsigned shifts for well-defined behavior and packs two halves with shift+OR.',
      },
      {
        id: 'snip-bitwise-left-right-shifts-java',
        topic_id: 'ext-bitwise-left-right-shifts',
        language: 'java',
        is_optimized: true,
        code: `class Shifts {
    static int mulPow2(int x, int k) { return x << k; }
    static int divPow2(int x, int k) { return x >> k; }    // arithmetic
    static int divPow2Logical(int x, int k) { return x >>> k; } // logical
    static int kthBit(int x, int k) { return (x >> k) & 1; }
}`,
        explanation: 'Shows Java arithmetic (>>) and logical (>>>) shifts plus bit extraction.',
      },
    ],
    quizId: 'quiz-ext-bitwise-left-right-shifts',
    quizTitle: 'Bitwise Shifts Quiz',
    quizDescription: 'Test your understanding of left/right shifts and their semantics.',
    questions: [
      {
        id: 'q-bitwise-left-right-shifts-1',
        quiz_id: 'quiz-ext-bitwise-left-right-shifts',
        question_text: 'What is the value of 3 << 4?',
        question_type: 'MCQ',
        options: ['12', '24', '48', '7'],
        correct_option_index: 2,
        explanation: 'Left-shifting by 4 multiplies by 2^4 = 16, so 3 * 16 = 48.',
      },
      {
        id: 'q-bitwise-left-right-shifts-2',
        quiz_id: 'quiz-ext-bitwise-left-right-shifts',
        question_text: 'In Java, the >>> operator performs a logical (zero-fill) right shift, while >> is arithmetic.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: '>>> fills with zeros regardless of sign; >> preserves the sign bit (arithmetic).',
      },
      {
        id: 'q-bitwise-left-right-shifts-3',
        quiz_id: 'quiz-ext-bitwise-left-right-shifts',
        question_text: 'Right-shifting a non-negative integer x by k is equivalent to which operation?',
        question_type: 'MCQ',
        options: ['x * 2^k', 'floor(x / 2^k)', 'x mod 2^k', 'x + 2^k'],
        correct_option_index: 1,
        explanation: 'A right shift by k divides by 2^k and floors the result for non-negative x.',
      },
    ],
  },
  // 26. TWO'S COMPLEMENT REPRESENTATION
  {
    topic: {
      id: 'ext-twos-complement-representation',
      slug: 'twos-complement-representation',
      category_id: CATEGORY_IDS.foundations,
      title: "Two's Complement Representation",
      definition: "Two's complement is the standard binary encoding for signed integers, in which the most significant bit carries a negative weight, so negation is done by inverting all bits and adding one.",
      importance: 'It is how virtually all modern hardware stores signed integers, allowing one adder circuit to handle both addition and subtraction and giving a single representation of zero.',
      prerequisites: ['bitwise-operations-and-or-xor'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1)',
      time_complexity_average: 'O(1)',
      time_complexity_worst: 'O(1)',
      space_complexity: 'O(1)',
      display_order: 125,
    },
    sections: [
      {
        id: 'sec-twos-complement-representation-1',
        topic_id: 'ext-twos-complement-representation',
        title: 'Concept & Intuition',
        content: `In an $n$-bit **two's complement** number, the top bit has weight $-2^{n-1}$ while the rest have their usual positive weights. For 8 bits:

$$\\text{value} = -b_7 \\cdot 2^7 + \\sum_{i=0}^{6} b_i \\cdot 2^i.$$

So \`1111 1111\` is $-1$, and \`1000 0000\` is $-128$. Positive numbers look exactly like unsigned.`,
        display_order: 1,
      },
      {
        id: 'sec-twos-complement-representation-2',
        topic_id: 'ext-twos-complement-representation',
        title: 'Negation Rule',
        content: `To negate a value: **invert all bits and add 1**.

Example (8-bit): $5 =$ \`0000 0101\`. Invert → \`1111 1010\`, add 1 → \`1111 1011\` $= -5$.

> [!NOTE]
> Equivalently, $-x = \\lnot x + 1$. Applying the rule twice returns the original value.`,
        display_order: 2,
      },
      {
        id: 'sec-twos-complement-representation-3',
        topic_id: 'ext-twos-complement-representation',
        title: 'Why It Wins',
        content: `Two's complement has decisive advantages over sign-magnitude and one's complement:

- **Single zero**: no separate $+0$ and $-0$.
- **Uniform arithmetic**: the same binary adder computes $a - b$ as $a + (-b)$; subtraction needs no special circuit.
- The representable range is asymmetric: $[-2^{n-1},\\; 2^{n-1} - 1]$.`,
        display_order: 3,
      },
      {
        id: 'sec-twos-complement-representation-4',
        topic_id: 'ext-twos-complement-representation',
        title: 'Pitfalls',
        content: `> [!WARNING]
> The most negative value has **no positive counterpart**: negating \`INT_MIN\` overflows and (in most implementations) returns \`INT_MIN\` itself. Signed integer overflow is undefined behavior in C/C++.

Also, \`abs(INT_MIN)\` cannot be represented, a common source of subtle bugs.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-twos-complement-representation-py',
        topic_id: 'ext-twos-complement-representation',
        language: 'python',
        is_optimized: true,
        code: `def to_twos_complement(x, bits):
    # Return the unsigned bit pattern of x in 'bits'-bit two's complement
    return x & ((1 << bits) - 1)

def from_twos_complement(u, bits):
    # Interpret an unsigned pattern as a signed two's complement value
    if u & (1 << (bits - 1)):
        u -= 1 << bits
    return u

print(bin(to_twos_complement(-5, 8)))     # 0b11111011
print(from_twos_complement(0b11111011, 8)) # -5`,
        explanation: "Converts between signed integers and their two's complement bit patterns.",
      },
      {
        id: 'snip-twos-complement-representation-js',
        topic_id: 'ext-twos-complement-representation',
        language: 'javascript',
        is_optimized: true,
        code: `function toTwosComplement(x, bits) {
  return (x & ((1 << bits) - 1)) >>> 0; // unsigned bit pattern
}
function fromTwosComplement(u, bits) {
  return (u & (1 << (bits - 1))) ? u - (1 << bits) : u;
}

console.log(toTwosComplement(-5, 8).toString(2)); // 11111011
console.log(fromTwosComplement(0b11111011, 8));   // -5`,
        explanation: "Encodes and decodes signed values using two's complement on 32-bit ints.",
      },
      {
        id: 'snip-twos-complement-representation-cpp',
        topic_id: 'ext-twos-complement-representation',
        language: 'cpp',
        is_optimized: true,
        code: `#include <cstdint>

// Negation via invert-and-add-one, matching hardware two's complement
int32_t negate(int32_t x) { return ~x + 1; }

// Sign-extend a 'bits'-wide value stored in a wider integer
int32_t signExtend(uint32_t u, int bits) {
    uint32_t m = 1u << (bits - 1);
    return (int32_t)((u ^ m) - m);
}`,
        explanation: "Implements two's complement negation and sign extension with pure bit operations.",
      },
      {
        id: 'snip-twos-complement-representation-java',
        topic_id: 'ext-twos-complement-representation',
        language: 'java',
        is_optimized: true,
        code: `class TwosComplement {
    static int negate(int x) { return ~x + 1; }   // invert and add one

    static int signExtend(int u, int bits) {
        int m = 1 << (bits - 1);
        return (u ^ m) - m;
    }
}`,
        explanation: "Java two's complement negation and sign extension using bitwise arithmetic.",
      },
    ],
    quizId: 'quiz-ext-twos-complement-representation',
    quizTitle: "Two's Complement Quiz",
    quizDescription: 'Test your understanding of signed integer representation.',
    questions: [
      {
        id: 'q-twos-complement-representation-1',
        quiz_id: 'quiz-ext-twos-complement-representation',
        question_text: 'In two\u2019s complement, how do you negate a number?',
        question_type: 'MCQ',
        options: ['Flip only the sign bit', 'Invert all bits', 'Invert all bits and add one', 'Subtract from zero bit by bit'],
        correct_option_index: 2,
        explanation: "Two's complement negation inverts every bit and then adds one.",
      },
      {
        id: 'q-twos-complement-representation-2',
        quiz_id: 'quiz-ext-twos-complement-representation',
        question_text: "Two's complement has a single representation for zero, unlike sign-magnitude.",
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'There is no separate -0; this is a key advantage of two\u2019s complement.',
      },
      {
        id: 'q-twos-complement-representation-3',
        quiz_id: 'quiz-ext-twos-complement-representation',
        question_text: 'What decimal value does the 8-bit two\u2019s complement pattern 1111 1111 represent?',
        question_type: 'MCQ',
        options: ['255', '-1', '-128', '127'],
        correct_option_index: 1,
        explanation: 'All ones in two\u2019s complement is -1, since inverting and adding one gives 1.',
      },
    ],
  },
  // 27. RECURSION TREES
  {
    topic: {
      id: 'ext-recursion-trees',
      slug: 'recursion-trees',
      category_id: CATEGORY_IDS.foundations,
      title: 'Recursion Trees',
      definition: 'A recursion tree is a visual model of a recursive algorithm where each node represents a subproblem and its cost, used to sum work level by level and derive the total time complexity.',
      importance: 'It provides an intuitive way to solve recurrences the Master Theorem cannot handle, and to build correct guesses for the substitution method.',
      prerequisites: ['time-complexity'],
      difficulty: 'Intermediate',
      time_complexity_best: 'N/A (analysis technique)',
      time_complexity_average: 'N/A (analysis technique)',
      time_complexity_worst: 'N/A (analysis technique)',
      space_complexity: 'N/A (analysis technique)',
      display_order: 126,
    },
    sections: [
      {
        id: 'sec-recursion-trees-1',
        topic_id: 'ext-recursion-trees',
        title: 'Concept & Intuition',
        content: `A **recursion tree** unrolls a recurrence into a tree: the root is the original problem, and each node branches into the subproblems it spawns. Each node is labeled with the **non-recursive work** it performs.

Summing all node costs — often conveniently level by level — gives the total running time.`,
        display_order: 1,
      },
      {
        id: 'sec-recursion-trees-2',
        topic_id: 'ext-recursion-trees',
        title: 'Building the Tree',
        content: `For $T(n) = 2T(n/2) + cn$ (merge sort):

- **Level 0**: one node costing $cn$.
- **Level 1**: two nodes each costing $cn/2$, total $cn$.
- **Level $i$**: $2^i$ nodes each costing $cn/2^i$, total $cn$.

Every level sums to $cn$, and there are $\\log_2 n + 1$ levels, giving $O(n \\log n)$.`,
        display_order: 2,
      },
      {
        id: 'sec-recursion-trees-3',
        topic_id: 'ext-recursion-trees',
        title: 'Unbalanced Trees',
        content: `Recursion trees shine when subproblems are **unequal**, where the Master Theorem fails.

> [!NOTE]
> For $T(n) = T(n/3) + T(2n/3) + n$, each level still sums to about $n$, but the longest root-to-leaf path has depth $\\log_{3/2} n$, giving $O(n \\log n)$.

The tree's **height** is set by the slowest-shrinking branch.`,
        display_order: 3,
      },
      {
        id: 'sec-recursion-trees-4',
        topic_id: 'ext-recursion-trees',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Recursion trees usually give a **good guess**, not a rigorous proof. Confirm the bound with the **substitution method** (prove it by induction).

Watch for uneven branch depths — do not assume all leaves are at the same level, and remember the number of leaves can dominate when the branching factor is high.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-recursion-trees-py',
        topic_id: 'ext-recursion-trees',
        language: 'python',
        is_optimized: true,
        code: `def tree_cost(n, a, b, f):
    # Sum the recursion-tree cost for T(n) = a*T(n/b) + f(n)
    total = 0
    level_nodes = 1
    size = n
    while size >= 1:
        total += level_nodes * f(size)
        level_nodes *= a
        size //= b
    return total

# Merge sort: a=2, b=2, f(n)=n  ->  ~ n log n
print(tree_cost(8, 2, 2, lambda x: x))  # 32 (= 8 * 4 levels)`,
        explanation: 'Sums the per-level costs of a recursion tree to estimate a recurrence total.',
      },
      {
        id: 'snip-recursion-trees-js',
        topic_id: 'ext-recursion-trees',
        language: 'javascript',
        is_optimized: true,
        code: `function treeCost(n, a, b, f) {
  let total = 0, levelNodes = 1, size = n;
  while (size >= 1) {
    total += levelNodes * f(size);
    levelNodes *= a;
    size = Math.floor(size / b);
  }
  return total;
}

console.log(treeCost(8, 2, 2, x => x)); // 32`,
        explanation: 'Accumulates cost level by level for T(n) = a*T(n/b) + f(n).',
      },
      {
        id: 'snip-recursion-trees-cpp',
        topic_id: 'ext-recursion-trees',
        language: 'cpp',
        is_optimized: true,
        code: `#include <functional>

long long treeCost(long long n, long long a, long long b,
                   const std::function<long long(long long)>& f) {
    long long total = 0, levelNodes = 1, size = n;
    while (size >= 1) {
        total += levelNodes * f(size);
        levelNodes *= a;
        size /= b;
    }
    return total;
}`,
        explanation: 'Computes the total recursion-tree cost by iterating over the levels.',
      },
      {
        id: 'snip-recursion-trees-java',
        topic_id: 'ext-recursion-trees',
        language: 'java',
        is_optimized: true,
        code: `import java.util.function.LongUnaryOperator;

class RecursionTree {
    static long treeCost(long n, long a, long b, LongUnaryOperator f) {
        long total = 0, levelNodes = 1, size = n;
        while (size >= 1) {
            total += levelNodes * f.applyAsLong(size);
            levelNodes *= a;
            size /= b;
        }
        return total;
    }
}`,
        explanation: 'Sums recursion-tree level costs using a functional cost operator.',
      },
    ],
    quizId: 'quiz-ext-recursion-trees',
    quizTitle: 'Recursion Trees Quiz',
    quizDescription: 'Test your ability to analyze recurrences with recursion trees.',
    questions: [
      {
        id: 'q-recursion-trees-1',
        quiz_id: 'quiz-ext-recursion-trees',
        question_text: 'In the recursion tree for T(n) = 2T(n/2) + cn, what is the total cost of each level?',
        question_type: 'MCQ',
        options: ['cn', 'cn/2', 'c', 'cn^2'],
        correct_option_index: 0,
        explanation: 'At level i there are 2^i nodes each costing cn/2^i, summing to cn per level.',
      },
      {
        id: 'q-recursion-trees-2',
        quiz_id: 'quiz-ext-recursion-trees',
        question_text: 'Recursion trees are especially useful when the Master Theorem does not apply, such as with unequal subproblem sizes.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'They handle unbalanced splits by summing per-level costs directly.',
      },
      {
        id: 'q-recursion-trees-3',
        quiz_id: 'quiz-ext-recursion-trees',
        question_text: 'What is the resulting complexity of T(n) = 2T(n/2) + cn analyzed via its recursion tree?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correct_option_index: 1,
        explanation: 'Each of the log n levels costs cn, so the total is O(n log n).',
      },
    ],
  },
  // 28. LOGARITHMS IN COMPUTER SCIENCE
  {
    topic: {
      id: 'ext-logarithms-in-computer-science',
      slug: 'logarithms-in-computer-science',
      category_id: CATEGORY_IDS.foundations,
      title: 'Logarithms in Computer Science',
      definition: 'A logarithm answers "to what power must the base be raised to get x", and in computer science base-2 logarithms measure how many times a quantity can be halved, quantifying divide-and-conquer efficiency.',
      importance: 'Logarithmic growth is the hallmark of efficient algorithms like binary search and balanced trees, where the work scales with the number of digits rather than the value itself.',
      prerequisites: [],
      difficulty: 'Beginner',
      time_complexity_best: 'N/A (mathematical concept)',
      time_complexity_average: 'N/A (mathematical concept)',
      time_complexity_worst: 'N/A (mathematical concept)',
      space_complexity: 'N/A (mathematical concept)',
      display_order: 127,
    },
    sections: [
      {
        id: 'sec-logarithms-in-computer-science-1',
        topic_id: 'ext-logarithms-in-computer-science',
        title: 'Concept & Intuition',
        content: `The logarithm is the inverse of exponentiation: $\\log_b x = y$ means $b^y = x$. Intuitively, $\\log_2 x$ counts **how many times you can halve $x$** before reaching 1.

Since $\\log_2 1{,}000{,}000 \\approx 20$, a binary search over a million items needs only about 20 comparisons — this is why logarithmic algorithms scale so gracefully.`,
        display_order: 1,
      },
      {
        id: 'sec-logarithms-in-computer-science-2',
        topic_id: 'ext-logarithms-in-computer-science',
        title: 'Key Laws',
        content: `Logarithm rules used constantly in analysis:

$$\\log(xy) = \\log x + \\log y, \\quad \\log\\frac{x}{y} = \\log x - \\log y, \\quad \\log x^k = k \\log x.$$

**Change of base**: $\\log_b x = \\dfrac{\\log_c x}{\\log_c b}$.

> [!NOTE]
> Because changing base only multiplies by a constant, Big-O treats $\\log_2 n$, $\\ln n$, and $\\log_{10} n$ as identical — we simply write $O(\\log n)$.`,
        display_order: 2,
      },
      {
        id: 'sec-logarithms-in-computer-science-3',
        topic_id: 'ext-logarithms-in-computer-science',
        title: 'Where Logs Appear',
        content: `- **Binary search** and balanced BSTs: $O(\\log n)$ per operation.
- **Heaps**: insert/extract in $O(\\log n)$.
- **Number of digits** of $n$ in base $b$ is $\\lfloor \\log_b n \\rfloor + 1$.
- **Divide-and-conquer depth**: halving repeatedly yields $\\log_2 n$ levels.
- **Log-linear** $O(n \\log n)$ sorts (merge sort, heapsort).`,
        display_order: 3,
      },
      {
        id: 'sec-logarithms-in-computer-science-4',
        topic_id: 'ext-logarithms-in-computer-science',
        title: 'Pitfalls',
        content: `> [!WARNING]
> $\\log 0$ is undefined and $\\log x \\to -\\infty$ as $x \\to 0^+$; guard against zero or negative arguments.

Do not confuse $\\log^2 n$ (i.e. $(\\log n)^2$) with $\\log \\log n$ — the latter grows almost imperceptibly (for $n = 2^{32}$, $\\log \\log n = 5$).`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-logarithms-in-computer-science-py',
        topic_id: 'ext-logarithms-in-computer-science',
        language: 'python',
        is_optimized: true,
        code: `import math

def int_log2(n):
    # Number of times n can be halved: floor(log2(n))
    if n <= 0:
        raise ValueError("log undefined for n <= 0")
    return n.bit_length() - 1

def num_digits(n, base=10):
    return math.floor(math.log(n, base)) + 1 if n > 0 else 1

print(int_log2(1000))    # 9
print(num_digits(12345)) # 5`,
        explanation: 'Uses bit_length for exact integer log2 and a log for digit counts.',
      },
      {
        id: 'snip-logarithms-in-computer-science-js',
        topic_id: 'ext-logarithms-in-computer-science',
        language: 'javascript',
        is_optimized: true,
        code: `function intLog2(n) {
  if (n <= 0) throw new Error("log undefined for n <= 0");
  return 31 - Math.clz32(n);   // floor(log2(n)) for 32-bit n
}

function logBase(x, b) {
  return Math.log(x) / Math.log(b); // change of base
}

console.log(intLog2(1000));      // 9
console.log(logBase(1000, 10));  // 3`,
        explanation: 'Math.clz32 gives an exact integer log2; change-of-base handles arbitrary bases.',
      },
      {
        id: 'snip-logarithms-in-computer-science-cpp',
        topic_id: 'ext-logarithms-in-computer-science',
        language: 'cpp',
        is_optimized: true,
        code: `#include <cmath>

int intLog2(unsigned n) {
    // floor(log2(n)) via count-leading-zeros
    return n == 0 ? -1 : 31 - __builtin_clz(n);
}

double logBase(double x, double b) {
    return std::log(x) / std::log(b);  // change of base
}`,
        explanation: 'Uses __builtin_clz for a fast exact log2 and change-of-base for others.',
      },
      {
        id: 'snip-logarithms-in-computer-science-java',
        topic_id: 'ext-logarithms-in-computer-science',
        language: 'java',
        is_optimized: true,
        code: `class Logs {
    static int intLog2(int n) {
        if (n <= 0) throw new IllegalArgumentException("n must be positive");
        return 31 - Integer.numberOfLeadingZeros(n);  // floor(log2 n)
    }
    static double logBase(double x, double b) {
        return Math.log(x) / Math.log(b);             // change of base
    }
}`,
        explanation: 'Integer.numberOfLeadingZeros yields exact integer log2; change-of-base covers any base.',
      },
    ],
    quizId: 'quiz-ext-logarithms-in-computer-science',
    quizTitle: 'Logarithms in CS Quiz',
    quizDescription: 'Test your understanding of logarithms and their role in complexity.',
    questions: [
      {
        id: 'q-logarithms-in-computer-science-1',
        quiz_id: 'quiz-ext-logarithms-in-computer-science',
        question_text: 'Approximately how many comparisons does binary search need for 1,000,000 sorted elements?',
        question_type: 'MCQ',
        options: ['About 20', 'About 1000', 'About 500000', 'About 1000000'],
        correct_option_index: 0,
        explanation: 'log2(1,000,000) is about 20, so roughly 20 comparisons suffice.',
      },
      {
        id: 'q-logarithms-in-computer-science-2',
        quiz_id: 'quiz-ext-logarithms-in-computer-science',
        question_text: 'In Big-O notation, the base of the logarithm matters and O(log2 n) differs from O(log10 n).',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Changing base only multiplies by a constant, so all log bases are equivalent in Big-O.',
      },
      {
        id: 'q-logarithms-in-computer-science-3',
        quiz_id: 'quiz-ext-logarithms-in-computer-science',
        question_text: 'Which expression equals log(x^k) by the power law of logarithms?',
        question_type: 'MCQ',
        options: ['k + log x', 'k * log x', '(log x)^k', 'log x / k'],
        correct_option_index: 1,
        explanation: 'The power law states log(x^k) = k * log x.',
      },
    ],
  },
  // 29. ITERATIVE VS RECURSIVE TRADEOFFS
  {
    topic: {
      id: 'ext-iterative-vs-recursive-tradeoffs',
      slug: 'iterative-vs-recursive-tradeoffs',
      category_id: CATEGORY_IDS.foundations,
      title: 'Iterative vs Recursive Tradeoffs',
      definition: 'Iterative and recursive approaches both express repetition, but they differ in memory use, readability, and performance; choosing between them balances clarity against stack cost and overhead.',
      importance: 'Knowing when to prefer loops over recursion (and vice versa) prevents stack overflows, improves performance, and keeps code readable for the problem at hand.',
      prerequisites: ['space-complexity', 'tail-recursion'],
      difficulty: 'Beginner',
      time_complexity_best: 'Equal in time for equivalent algorithms',
      time_complexity_average: 'Equal in time for equivalent algorithms',
      time_complexity_worst: 'Equal in time for equivalent algorithms',
      space_complexity: 'Iterative O(1), recursive O(depth)',
      display_order: 128,
    },
    sections: [
      {
        id: 'sec-iterative-vs-recursive-tradeoffs-1',
        topic_id: 'ext-iterative-vs-recursive-tradeoffs',
        title: 'Concept & Intuition',
        content: `**Iteration** repeats with explicit loops and mutable state; **recursion** repeats by calling itself on smaller inputs. Any recursion can be rewritten iteratively and vice versa.

Recursion often mirrors the problem's structure (trees, divide-and-conquer) for elegant code, while iteration typically wins on raw efficiency.`,
        display_order: 1,
      },
      {
        id: 'sec-iterative-vs-recursive-tradeoffs-2',
        topic_id: 'ext-iterative-vs-recursive-tradeoffs',
        title: 'Memory & Performance',
        content: `The decisive difference is **space**:

- **Iterative** solutions usually use $O(1)$ auxiliary space.
- **Recursive** solutions use $O(\\text{depth})$ stack space and incur function-call overhead.

> [!IMPORTANT]
> Deep recursion (depth $\\sim 10^5$ or more) risks a **stack overflow**. Converting to iteration — or to an explicit stack — sidesteps this.`,
        display_order: 2,
      },
      {
        id: 'sec-iterative-vs-recursive-tradeoffs-3',
        topic_id: 'ext-iterative-vs-recursive-tradeoffs',
        title: 'When to Choose Which',
        content: `**Prefer recursion** for naturally recursive structures (tree/graph traversal, backtracking, divide-and-conquer) where it is far clearer.

**Prefer iteration** for simple linear repetition, hot loops, or when recursion depth could be large.

An **explicit stack** gives the best of both: recursive logic with iterative control over memory.`,
        display_order: 3,
      },
      {
        id: 'sec-iterative-vs-recursive-tradeoffs-4',
        topic_id: 'ext-iterative-vs-recursive-tradeoffs',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Naive recursion can be exponentially slow when it recomputes overlapping subproblems (e.g. naive Fibonacci is $O(2^n)$). Add **memoization** or convert to bottom-up iteration.

Conversely, an over-engineered iterative solution with a manual stack can be harder to read and debug than clean recursion — optimize only when needed.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-iterative-vs-recursive-tradeoffs-py',
        topic_id: 'ext-iterative-vs-recursive-tradeoffs',
        language: 'python',
        is_optimized: true,
        code: `def fib_recursive_memo(n, memo={}):
    if n < 2:
        return n
    if n not in memo:
        memo[n] = fib_recursive_memo(n - 1, memo) + fib_recursive_memo(n - 2, memo)
    return memo[n]

def fib_iterative(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a   # O(1) space, no recursion depth

print(fib_iterative(50), fib_recursive_memo(50))`,
        explanation: 'Contrasts O(1)-space iteration with memoized recursion, both O(n) time.',
      },
      {
        id: 'snip-iterative-vs-recursive-tradeoffs-js',
        topic_id: 'ext-iterative-vs-recursive-tradeoffs',
        language: 'javascript',
        is_optimized: true,
        code: `function fibIterative(n) {
  let a = 0n, b = 1n;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a; // constant space, no stack growth
}

function fibMemo(n, memo = new Map()) {
  if (n < 2) return BigInt(n);
  if (!memo.has(n)) memo.set(n, fibMemo(n - 1, memo) + fibMemo(n - 2, memo));
  return memo.get(n);
}`,
        explanation: 'Iterative version avoids stack depth; memoized recursion caches subproblems.',
      },
      {
        id: 'snip-iterative-vs-recursive-tradeoffs-cpp',
        topic_id: 'ext-iterative-vs-recursive-tradeoffs',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

// Iterative in-order traversal with an explicit stack avoids recursion depth limits
void inorder(struct Node* root);
struct Node { int val; Node* left; Node* right; };

vector<int> inorderIterative(Node* root) {
    vector<int> out; vector<Node*> stack; Node* cur = root;
    while (cur || !stack.empty()) {
        while (cur) { stack.push_back(cur); cur = cur->left; }
        cur = stack.back(); stack.pop_back();
        out.push_back(cur->val);
        cur = cur->right;
    }
    return out;
}`,
        explanation: 'Replaces recursive tree traversal with an explicit stack for controlled memory use.',
      },
      {
        id: 'snip-iterative-vs-recursive-tradeoffs-java',
        topic_id: 'ext-iterative-vs-recursive-tradeoffs',
        language: 'java',
        is_optimized: true,
        code: `class Fib {
    // Iterative: O(1) space, no recursion depth
    static long iterative(int n) {
        long a = 0, b = 1;
        for (int i = 0; i < n; i++) { long t = a + b; a = b; b = t; }
        return a;
    }
    // Recursive with memo: O(n) time but O(n) stack + O(n) cache
    static long memo(int n, long[] cache) {
        if (n < 2) return n;
        if (cache[n] != 0) return cache[n];
        return cache[n] = memo(n - 1, cache) + memo(n - 2, cache);
    }
}`,
        explanation: 'Shows the space trade-off: iteration is O(1) space, memoized recursion is O(n).',
      },
    ],
    quizId: 'quiz-ext-iterative-vs-recursive-tradeoffs',
    quizTitle: 'Iterative vs Recursive Quiz',
    quizDescription: 'Test your judgment on choosing iteration or recursion.',
    questions: [
      {
        id: 'q-iterative-vs-recursive-tradeoffs-1',
        quiz_id: 'quiz-ext-iterative-vs-recursive-tradeoffs',
        question_text: 'What is the main space advantage of an iterative solution over an equivalent recursive one?',
        question_type: 'MCQ',
        options: ['It uses less time', 'It avoids O(depth) call-stack usage', 'It is always shorter code', 'It never needs variables'],
        correct_option_index: 1,
        explanation: 'Iteration typically uses O(1) auxiliary space, avoiding the recursion stack.',
      },
      {
        id: 'q-iterative-vs-recursive-tradeoffs-2',
        quiz_id: 'quiz-ext-iterative-vs-recursive-tradeoffs',
        question_text: 'Any recursive algorithm can be rewritten iteratively, often using an explicit stack.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Recursion and iteration are equivalent in power; a manual stack can simulate calls.',
      },
      {
        id: 'q-iterative-vs-recursive-tradeoffs-3',
        quiz_id: 'quiz-ext-iterative-vs-recursive-tradeoffs',
        question_text: 'Why is naive recursive Fibonacci exponentially slow?',
        question_type: 'MCQ',
        options: ['It uses too much stack', 'It recomputes overlapping subproblems repeatedly', 'It cannot use integers', 'The base case is wrong'],
        correct_option_index: 1,
        explanation: 'Without memoization it recalculates the same subproblems, yielding O(2^n) calls.',
      },
    ],
  },
  // 30. FAST FOURIER TRANSFORM (FFT)
  {
    topic: {
      id: 'ext-fast-fourier-transform-fft',
      slug: 'fast-fourier-transform-fft',
      category_id: CATEGORY_IDS.foundations,
      title: 'Fast Fourier Transform (FFT)',
      definition: 'The Fast Fourier Transform is a divide-and-conquer algorithm that computes the Discrete Fourier Transform of n samples in O(n log n) time instead of the naive O(n^2).',
      importance: 'FFT enables fast polynomial and big-integer multiplication, signal processing, and convolution, turning otherwise quadratic operations into log-linear ones.',
      prerequisites: ['master-theorem', 'recursion-trees'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(n log n)',
      time_complexity_average: 'O(n log n)',
      time_complexity_worst: 'O(n log n)',
      space_complexity: 'O(n)',
      display_order: 129,
    },
    sections: [
      {
        id: 'sec-fast-fourier-transform-fft-1',
        topic_id: 'ext-fast-fourier-transform-fft',
        title: 'Concept & Intuition',
        content: `The **Discrete Fourier Transform (DFT)** converts a sequence between its coefficient (time) representation and its value (frequency) representation using the $n$-th roots of unity $\\omega = e^{2\\pi i / n}$.

Computed directly, the DFT is $O(n^2)$. The **FFT** exploits symmetry to do it in $O(n \\log n)$ — one of the most important algorithms ever devised.`,
        display_order: 1,
      },
      {
        id: 'sec-fast-fourier-transform-fft-2',
        topic_id: 'ext-fast-fourier-transform-fft',
        title: 'Divide and Conquer',
        content: `The Cooley–Tukey FFT splits a polynomial into its **even-indexed** and **odd-indexed** coefficients, recursively transforms each half of size $n/2$, then combines them using roots of unity:

$$A(\\omega^k) = E(\\omega^{2k}) + \\omega^k O(\\omega^{2k}).$$

This yields the recurrence $T(n) = 2T(n/2) + O(n) = O(n \\log n)$.`,
        display_order: 2,
      },
      {
        id: 'sec-fast-fourier-transform-fft-3',
        topic_id: 'ext-fast-fourier-transform-fft',
        title: 'Fast Convolution',
        content: `FFT's killer application is **fast multiplication**. To multiply two polynomials (or big integers):

1. Evaluate both at the roots of unity via FFT.
2. Multiply the values pointwise ($O(n)$).
3. Interpolate back with the inverse FFT.

> [!IMPORTANT]
> This computes a convolution in $O(n \\log n)$ instead of the schoolbook $O(n^2)$.`,
        display_order: 3,
      },
      {
        id: 'sec-fast-fourier-transform-fft-4',
        topic_id: 'ext-fast-fourier-transform-fft',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Complex-number FFT suffers **floating-point rounding**; round results to the nearest integer for exact integer convolutions, and watch precision for large values.

The input length must be padded to a **power of two**. For exact modular results, use the **Number-Theoretic Transform (NTT)**, an FFT variant over a modular field that avoids floating point entirely.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-fast-fourier-transform-fft-py',
        topic_id: 'ext-fast-fourier-transform-fft',
        language: 'python',
        is_optimized: true,
        code: `import cmath

def fft(a, invert=False):
    n = len(a)
    if n == 1:
        return a[:]
    even = fft(a[0::2], invert)
    odd = fft(a[1::2], invert)
    ang = (2 if invert else -2) * cmath.pi / n
    w, wn = 1 + 0j, cmath.exp(1j * ang)
    y = [0j] * n
    for k in range(n // 2):
        y[k] = even[k] + w * odd[k]
        y[k + n // 2] = even[k] - w * odd[k]
        if invert:
            y[k] /= 2; y[k + n // 2] /= 2
        w *= wn
    return y`,
        explanation: 'Recursive Cooley–Tukey FFT (and inverse) running in O(n log n) on a power-of-two input.',
      },
      {
        id: 'snip-fast-fourier-transform-fft-js',
        topic_id: 'ext-fast-fourier-transform-fft',
        language: 'javascript',
        is_optimized: true,
        code: `function fft(re, im, invert) {
  const n = re.length;
  if (n === 1) return;
  const er = [], ei = [], or_ = [], oi = [];
  for (let i = 0; i < n; i += 2) { er.push(re[i]); ei.push(im[i]); or_.push(re[i + 1]); oi.push(im[i + 1]); }
  fft(er, ei, invert); fft(or_, oi, invert);
  const ang = (invert ? 2 : -2) * Math.PI / n;
  let wr = 1, wi = 0;
  for (let k = 0; k < n / 2; k++) {
    const tr = wr * or_[k] - wi * oi[k], ti = wr * oi[k] + wi * or_[k];
    re[k] = er[k] + tr; im[k] = ei[k] + ti;
    re[k + n / 2] = er[k] - tr; im[k + n / 2] = ei[k] - ti;
    if (invert) { re[k] /= 2; im[k] /= 2; re[k + n / 2] /= 2; im[k + n / 2] /= 2; }
    const nwr = wr * Math.cos(ang) - wi * Math.sin(ang);
    wi = wr * Math.sin(ang) + wi * Math.cos(ang); wr = nwr;
  }
}`,
        explanation: 'In-place-by-halves recursive FFT on separate real/imaginary arrays, O(n log n).',
      },
      {
        id: 'snip-fast-fourier-transform-fft-cpp',
        topic_id: 'ext-fast-fourier-transform-fft',
        language: 'cpp',
        is_optimized: true,
        code: `#include <complex>
#include <vector>
using namespace std;
using cd = complex<double>;
const double PI = acos(-1.0);

void fft(vector<cd>& a, bool invert) {
    int n = a.size();
    if (n == 1) return;
    vector<cd> even(n / 2), odd(n / 2);
    for (int i = 0; i < n / 2; ++i) { even[i] = a[2 * i]; odd[i] = a[2 * i + 1]; }
    fft(even, invert); fft(odd, invert);
    double ang = 2 * PI / n * (invert ? 1 : -1);
    cd w(1), wn(cos(ang), sin(ang));
    for (int k = 0; k < n / 2; ++k) {
        a[k] = even[k] + w * odd[k];
        a[k + n / 2] = even[k] - w * odd[k];
        if (invert) { a[k] /= 2; a[k + n / 2] /= 2; }
        w *= wn;
    }
}`,
        explanation: 'Classic recursive complex FFT with an invert flag for the inverse transform.',
      },
      {
        id: 'snip-fast-fourier-transform-fft-java',
        topic_id: 'ext-fast-fourier-transform-fft',
        language: 'java',
        is_optimized: true,
        code: `class FFT {
    // In-place iterative FFT on interleaved-free real/imag arrays
    static void transform(double[] re, double[] im, boolean invert) {
        int n = re.length;
        if (n == 1) return;
        double[] er = new double[n / 2], ei = new double[n / 2];
        double[] or_ = new double[n / 2], oi = new double[n / 2];
        for (int i = 0; i < n / 2; i++) {
            er[i] = re[2 * i]; ei[i] = im[2 * i];
            or_[i] = re[2 * i + 1]; oi[i] = im[2 * i + 1];
        }
        transform(er, ei, invert); transform(or_, oi, invert);
        double ang = 2 * Math.PI / n * (invert ? 1 : -1);
        double wr = 1, wi = 0;
        for (int k = 0; k < n / 2; k++) {
            double tr = wr * or_[k] - wi * oi[k], ti = wr * oi[k] + wi * or_[k];
            re[k] = er[k] + tr; im[k] = ei[k] + ti;
            re[k + n / 2] = er[k] - tr; im[k + n / 2] = ei[k] - ti;
            if (invert) { re[k] /= 2; im[k] /= 2; re[k + n / 2] /= 2; im[k + n / 2] /= 2; }
            double nwr = wr * Math.cos(ang) - wi * Math.sin(ang);
            wi = wr * Math.sin(ang) + wi * Math.cos(ang); wr = nwr;
        }
    }
}`,
        explanation: 'Recursive divide-by-even/odd FFT in Java achieving O(n log n).',
      },
    ],
    quizId: 'quiz-ext-fast-fourier-transform-fft',
    quizTitle: 'Fast Fourier Transform Quiz',
    quizDescription: 'Test your understanding of the FFT and its applications.',
    questions: [
      {
        id: 'q-fast-fourier-transform-fft-1',
        quiz_id: 'quiz-ext-fast-fourier-transform-fft',
        question_text: 'What is the time complexity of the FFT compared to the naive DFT?',
        question_type: 'COMPLEXITY',
        options: ['O(n) vs O(log n)', 'O(n log n) vs O(n^2)', 'O(n^2) vs O(n^3)', 'O(log n) vs O(n)'],
        correct_option_index: 1,
        explanation: 'FFT runs in O(n log n), a major improvement over the naive O(n^2) DFT.',
      },
      {
        id: 'q-fast-fourier-transform-fft-2',
        quiz_id: 'quiz-ext-fast-fourier-transform-fft',
        question_text: 'The FFT can be used to multiply two polynomials in O(n log n) time via convolution.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Pointwise-multiplying transformed values then inverse-transforming performs convolution.',
      },
      {
        id: 'q-fast-fourier-transform-fft-3',
        quiz_id: 'quiz-ext-fast-fourier-transform-fft',
        question_text: 'Which FFT variant avoids floating-point error by operating over a modular field?',
        question_type: 'MCQ',
        options: ['Number-Theoretic Transform (NTT)', 'Discrete Cosine Transform', 'Laplace Transform', 'Z-Transform'],
        correct_option_index: 0,
        explanation: 'NTT replaces complex roots of unity with modular ones, giving exact integer results.',
      },
    ],
  },
  // 31. MODULAR MULTIPLICATIVE INVERSE
  {
    topic: {
      id: 'ext-modular-multiplicative-inverse',
      slug: 'modular-multiplicative-inverse',
      category_id: CATEGORY_IDS.foundations,
      title: 'Modular Multiplicative Inverse',
      definition: 'The modular multiplicative inverse of a modulo m is an integer x such that a·x is congruent to 1 modulo m; it exists exactly when a and m are coprime.',
      importance: 'It enables division under a modulus, which is essential for computing modular binomial coefficients, solving congruences, and cryptographic operations like RSA.',
      prerequisites: ['extended-euclidean-algorithm', 'fast-exponentiation'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(log m)',
      time_complexity_average: 'O(log m)',
      time_complexity_worst: 'O(log m)',
      space_complexity: 'O(1)',
      display_order: 130,
    },
    sections: [
      {
        id: 'sec-modular-multiplicative-inverse-1',
        topic_id: 'ext-modular-multiplicative-inverse',
        title: 'Concept & Intuition',
        content: `In ordinary arithmetic, the inverse of $a$ is $1/a$. Modulo $m$ there are no fractions, so we seek an integer $x$ with

$$a \\cdot x \\equiv 1 \\pmod{m}.$$

That $x$ is the **modular inverse**, written $a^{-1}$. It lets us "divide" by $a$: computing $b / a \\bmod m$ becomes $b \\cdot a^{-1} \\bmod m$.`,
        display_order: 1,
      },
      {
        id: 'sec-modular-multiplicative-inverse-2',
        topic_id: 'ext-modular-multiplicative-inverse',
        title: 'Existence Condition',
        content: `> [!IMPORTANT]
> An inverse of $a$ modulo $m$ exists **if and only if** $\\gcd(a, m) = 1$ (they are coprime).

If they share a common factor, then $a \\cdot x$ can never be $\\equiv 1$, because every multiple of $a$ modulo $m$ is also a multiple of that shared factor. For example, $2$ has no inverse modulo $4$.`,
        display_order: 2,
      },
      {
        id: 'sec-modular-multiplicative-inverse-3',
        topic_id: 'ext-modular-multiplicative-inverse',
        title: 'Two Methods',
        content: `**Extended Euclidean** (works for any coprime $m$): solve $a x + m y = 1$; then $x \\bmod m$ is the inverse. Cost $O(\\log m)$.

**Fermat's Little Theorem** (requires $m$ **prime**): since $a^{m-1} \\equiv 1 \\pmod m$, the inverse is

$$a^{-1} \\equiv a^{m-2} \\pmod{m},$$

computed with fast exponentiation in $O(\\log m)$.`,
        display_order: 3,
      },
      {
        id: 'sec-modular-multiplicative-inverse-4',
        topic_id: 'ext-modular-multiplicative-inverse',
        title: 'Pitfalls',
        content: `> [!WARNING]
> The Fermat method is valid **only** when $m$ is prime. For composite $m$, use the extended Euclidean algorithm or Euler's theorem with the totient.

Normalize the result with \`((x % m) + m) % m\` so it lands in $[0, m)$, and never use plain integer division to emulate a modular inverse.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-modular-multiplicative-inverse-py',
        topic_id: 'ext-modular-multiplicative-inverse',
        language: 'python',
        is_optimized: true,
        code: `def inverse_fermat(a, p):
    # Requires p prime: a^(p-2) mod p
    return pow(a % p, p - 2, p)

def inverse_extgcd(a, m):
    # Works for any m coprime to a
    g, x = m, 0
    a, x0 = a % m, 1
    while a:
        q = g // a
        g, a = a, g - q * a
        x, x0 = x0, x - q * x0
    if g != 1:
        raise ValueError("inverse does not exist")
    return x % m`,
        explanation: 'Provides both the Fermat (prime modulus) and extended-Euclid (general) inverse methods.',
      },
      {
        id: 'snip-modular-multiplicative-inverse-js',
        topic_id: 'ext-modular-multiplicative-inverse',
        language: 'javascript',
        is_optimized: true,
        code: `function inverseExtGcd(a, m) {
  let [old_r, r] = [((a % m) + m) % m, m];
  let [old_s, s] = [1n, 0n];
  while (r !== 0n) {
    const q = old_r / r;
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
  }
  if (old_r !== 1n) throw new Error("no inverse");
  return ((old_s % m) + m) % m;
}`,
        explanation: 'Iterative extended Euclid returning the normalized modular inverse (BigInt).',
      },
      {
        id: 'snip-modular-multiplicative-inverse-cpp',
        topic_id: 'ext-modular-multiplicative-inverse',
        language: 'cpp',
        is_optimized: true,
        code: `long long power(long long a, long long e, long long m) {
    long long r = 1 % m; a %= m;
    while (e) { if (e & 1) r = r * a % m; a = a * a % m; e >>= 1; }
    return r;
}
// Fermat: valid only when p is prime
long long inverseFermat(long long a, long long p) {
    return power(a, p - 2, p);
}`,
        explanation: 'Computes the modular inverse via Fermat little theorem using fast exponentiation.',
      },
      {
        id: 'snip-modular-multiplicative-inverse-java',
        topic_id: 'ext-modular-multiplicative-inverse',
        language: 'java',
        is_optimized: true,
        code: `class ModInverse {
    static long power(long a, long e, long m) {
        long r = 1 % m; a %= m;
        while (e > 0) { if ((e & 1) == 1) r = r * a % m; a = a * a % m; e >>= 1; }
        return r;
    }
    // Requires m prime
    static long inverseFermat(long a, long m) {
        return power(a, m - 2, m);
    }
}`,
        explanation: 'Java Fermat-based modular inverse for a prime modulus, in O(log m).',
      },
    ],
    quizId: 'quiz-ext-modular-multiplicative-inverse',
    quizTitle: 'Modular Multiplicative Inverse Quiz',
    quizDescription: 'Test your understanding of modular inverses and their existence.',
    questions: [
      {
        id: 'q-modular-multiplicative-inverse-1',
        quiz_id: 'quiz-ext-modular-multiplicative-inverse',
        question_text: 'The modular inverse of a modulo m exists if and only if which condition holds?',
        question_type: 'MCQ',
        options: ['a is prime', 'm is even', 'gcd(a, m) = 1', 'a < m'],
        correct_option_index: 2,
        explanation: 'An inverse exists exactly when a and m are coprime (gcd equals 1).',
      },
      {
        id: 'q-modular-multiplicative-inverse-2',
        quiz_id: 'quiz-ext-modular-multiplicative-inverse',
        question_text: 'Fermat little theorem can compute the modular inverse for any modulus m.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'The Fermat method (a^(m-2)) requires m to be prime; otherwise use extended Euclid.',
      },
      {
        id: 'q-modular-multiplicative-inverse-3',
        quiz_id: 'quiz-ext-modular-multiplicative-inverse',
        question_text: 'For a prime modulus p, the inverse of a is given by which expression?',
        question_type: 'MCQ',
        options: ['a^(p-1) mod p', 'a^(p-2) mod p', 'a^2 mod p', 'p - a'],
        correct_option_index: 1,
        explanation: 'Since a^(p-1) = 1 mod p, dividing by a gives a^(p-2) as the inverse.',
      },
    ],
  },
  // 32. GRAY CODE MECHANICS
  {
    topic: {
      id: 'ext-gray-code-mechanics',
      slug: 'gray-code-mechanics',
      category_id: CATEGORY_IDS.foundations,
      title: 'Gray Code Mechanics',
      definition: 'Gray code is an ordering of binary numbers in which consecutive values differ in exactly one bit, generated from an integer i by the formula i XOR (i >> 1).',
      importance: 'Its single-bit-change property prevents transient errors in hardware encoders and simplifies problems like the Tower of Hanoi and enumerating subsets by minimal change.',
      prerequisites: ['bitwise-operations-and-or-xor', 'bitwise-left-right-shifts'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(1) per conversion',
      time_complexity_average: 'O(1) per conversion',
      time_complexity_worst: 'O(1) per conversion',
      space_complexity: 'O(1)',
      display_order: 131,
    },
    sections: [
      {
        id: 'sec-gray-code-mechanics-1',
        topic_id: 'ext-gray-code-mechanics',
        title: 'Concept & Intuition',
        content: `Ordinary binary counting can flip many bits at once (e.g. $0111 \\to 1000$ changes four bits). **Gray code** reorders values so that each step flips exactly **one** bit.

The 2-bit Gray sequence is $00, 01, 11, 10$. Notice each neighbor differs in a single position — and it wraps around, since $10 \\to 00$ also differs by one bit.`,
        display_order: 1,
      },
      {
        id: 'sec-gray-code-mechanics-2',
        topic_id: 'ext-gray-code-mechanics',
        title: 'Binary-to-Gray Conversion',
        content: `Converting the integer $i$ to its Gray code is a one-liner:

$$g = i \\oplus (i \\gg 1).$$

XOR-ing each bit with its higher neighbor guarantees that incrementing $i$ by one changes exactly one Gray bit.`,
        display_order: 2,
      },
      {
        id: 'sec-gray-code-mechanics-3',
        topic_id: 'ext-gray-code-mechanics',
        title: 'Gray-to-Binary Conversion',
        content: `The inverse is a running XOR (prefix XOR) of the Gray bits from the most-significant end:

\`\`\`
b = g
while (g >>= 1):
    b ^= g
\`\`\`

> [!NOTE]
> Gray code is used in **rotary encoders** and Karnaugh maps, and it lists all $2^n$ subsets so that consecutive subsets differ by adding or removing a single element.`,
        display_order: 3,
      },
      {
        id: 'sec-gray-code-mechanics-4',
        topic_id: 'ext-gray-code-mechanics',
        title: 'Pitfalls',
        content: `> [!WARNING]
> Do not confuse the direction of conversion: binary→Gray is a single XOR with the shifted value, but Gray→binary needs a cumulative XOR over all higher bits.

Also, the Gray sequence is **not unique** — reflected (standard) Gray code is the common choice, but other single-bit-change orderings exist.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-gray-code-mechanics-py',
        topic_id: 'ext-gray-code-mechanics',
        language: 'python',
        is_optimized: true,
        code: `def binary_to_gray(n):
    return n ^ (n >> 1)

def gray_to_binary(g):
    b = g
    while g:
        g >>= 1
        b ^= g
    return b

seq = [binary_to_gray(i) for i in range(8)]
print([format(x, '03b') for x in seq])  # 000 001 011 010 110 111 101 100`,
        explanation: 'Converts to Gray with one XOR and back with a cumulative XOR of higher bits.',
      },
      {
        id: 'snip-gray-code-mechanics-js',
        topic_id: 'ext-gray-code-mechanics',
        language: 'javascript',
        is_optimized: true,
        code: `const binaryToGray = (n) => n ^ (n >> 1);

function grayToBinary(g) {
  let b = g;
  while (g > 0) { g >>= 1; b ^= g; }
  return b;
}

console.log([...Array(8).keys()].map(i => binaryToGray(i).toString(2)));`,
        explanation: 'One-line binary-to-Gray plus a loop performing the inverse cumulative XOR.',
      },
      {
        id: 'snip-gray-code-mechanics-cpp',
        topic_id: 'ext-gray-code-mechanics',
        language: 'cpp',
        is_optimized: true,
        code: `unsigned binaryToGray(unsigned n) {
    return n ^ (n >> 1);
}

unsigned grayToBinary(unsigned g) {
    unsigned b = g;
    while (g >>= 1) b ^= g;   // prefix XOR of higher bits
    return b;
}`,
        explanation: 'Constant-time Gray encoding and decoding using XOR and shifts.',
      },
      {
        id: 'snip-gray-code-mechanics-java',
        topic_id: 'ext-gray-code-mechanics',
        language: 'java',
        is_optimized: true,
        code: `class GrayCode {
    static int binaryToGray(int n) { return n ^ (n >> 1); }

    static int grayToBinary(int g) {
        int b = g;
        while ((g >>= 1) != 0) b ^= g;
        return b;
    }
}`,
        explanation: 'Java Gray-code conversions: single XOR encode, cumulative XOR decode.',
      },
    ],
    quizId: 'quiz-ext-gray-code-mechanics',
    quizTitle: 'Gray Code Mechanics Quiz',
    quizDescription: 'Test your understanding of Gray code and its conversions.',
    questions: [
      {
        id: 'q-gray-code-mechanics-1',
        quiz_id: 'quiz-ext-gray-code-mechanics',
        question_text: 'What is the defining property of Gray code?',
        question_type: 'MCQ',
        options: ['Consecutive values differ in exactly one bit', 'All values are prime', 'Values are sorted ascending', 'Each value is a power of two'],
        correct_option_index: 0,
        explanation: 'Successive Gray-code values change only a single bit, which is its key feature.',
      },
      {
        id: 'q-gray-code-mechanics-2',
        quiz_id: 'quiz-ext-gray-code-mechanics',
        question_text: 'The formula n ^ (n >> 1) converts an integer n into its Gray code.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'XOR-ing n with itself shifted right by one produces the standard reflected Gray code.',
      },
      {
        id: 'q-gray-code-mechanics-3',
        quiz_id: 'quiz-ext-gray-code-mechanics',
        question_text: 'What is the Gray code of the integer 4 (binary 100)?',
        question_type: 'MCQ',
        options: ['100', '110', '010', '111'],
        correct_option_index: 1,
        explanation: '4 ^ (4 >> 1) = 100 ^ 010 = 110.',
      },
    ],
  },
  // 33. CHINESE REMAINDER THEOREM
  {
    topic: {
      id: 'ext-chinese-remainder-theorem',
      slug: 'chinese-remainder-theorem',
      category_id: CATEGORY_IDS.foundations,
      title: 'Chinese Remainder Theorem',
      definition: 'The Chinese Remainder Theorem states that a system of congruences with pairwise coprime moduli has a unique solution modulo the product of those moduli, and provides a constructive way to find it.',
      importance: 'It lets large modular computations be split across smaller coprime moduli and recombined, powering RSA optimizations, big-integer arithmetic, and many competitive-programming solutions.',
      prerequisites: ['modular-multiplicative-inverse'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(k log M)',
      time_complexity_average: 'O(k log M)',
      time_complexity_worst: 'O(k log M)',
      space_complexity: 'O(1)',
      display_order: 132,
    },
    sections: [
      {
        id: 'sec-chinese-remainder-theorem-1',
        topic_id: 'ext-chinese-remainder-theorem',
        title: 'Concept & Intuition',
        content: `Suppose you know a number's remainders under several **pairwise coprime** moduli:

$$x \\equiv a_1 \\pmod{m_1}, \\quad x \\equiv a_2 \\pmod{m_2}, \\dots$$

The **Chinese Remainder Theorem (CRT)** guarantees a unique $x$ modulo $M = m_1 m_2 \\cdots m_k$ satisfying all of them at once — the remainders uniquely pin down the value.`,
        display_order: 1,
      },
      {
        id: 'sec-chinese-remainder-theorem-2',
        topic_id: 'ext-chinese-remainder-theorem',
        title: 'Construction',
        content: `Let $M = \\prod m_i$ and $M_i = M / m_i$. Compute $y_i = M_i^{-1} \\bmod m_i$ (a modular inverse). Then

$$x \\equiv \\sum_{i} a_i \\, M_i \\, y_i \\pmod{M}.$$

Each term contributes the correct residue modulo $m_i$ while vanishing modulo the other moduli.`,
        display_order: 2,
      },
      {
        id: 'sec-chinese-remainder-theorem-3',
        topic_id: 'ext-chinese-remainder-theorem',
        title: 'Why It Matters',
        content: `CRT effectively lets you do arithmetic in a large ring by working in several small ones **independently and in parallel**, then reconstructing the answer.

> [!IMPORTANT]
> RSA decryption uses CRT to compute modulo $p$ and $q$ separately, roughly quadrupling speed. It also underlies multi-modular big-integer multiplication.`,
        display_order: 3,
      },
      {
        id: 'sec-chinese-remainder-theorem-4',
        topic_id: 'ext-chinese-remainder-theorem',
        title: 'Pitfalls',
        content: `> [!WARNING]
> The uniqueness guarantee requires the moduli to be **pairwise coprime**. If two moduli share a factor, a solution may not exist, or the combined modulus is $\\text{lcm}$, not the product — handle such cases with a generalized CRT that checks consistency.

Watch for overflow: intermediate products like $a_i M_i y_i$ can be huge; use 128-bit or big-integer arithmetic.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-chinese-remainder-theorem-py',
        topic_id: 'ext-chinese-remainder-theorem',
        language: 'python',
        is_optimized: true,
        code: `from math import prod

def crt(remainders, moduli):
    M = prod(moduli)
    x = 0
    for a_i, m_i in zip(remainders, moduli):
        Mi = M // m_i
        yi = pow(Mi, -1, m_i)      # modular inverse (Python 3.8+)
        x += a_i * Mi * yi
    return x % M

print(crt([2, 3, 2], [3, 5, 7]))   # 23`,
        explanation: 'Constructs the unique CRT solution for pairwise-coprime moduli using modular inverses.',
      },
      {
        id: 'snip-chinese-remainder-theorem-js',
        topic_id: 'ext-chinese-remainder-theorem',
        language: 'javascript',
        is_optimized: true,
        code: `function extGcd(a, b) {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x1, y1] = extGcd(b, a % b);
  return [g, y1, x1 - (a / b) * y1];
}
function modInverse(a, m) {
  const [g, x] = extGcd(((a % m) + m) % m, m);
  if (g !== 1n) throw new Error("no inverse");
  return ((x % m) + m) % m;
}

function crt(rem, mod) {
  const M = mod.reduce((a, b) => a * b, 1n);
  let x = 0n;
  for (let i = 0; i < rem.length; i++) {
    const Mi = M / mod[i];
    x += rem[i] * Mi * modInverse(Mi, mod[i]);
  }
  return ((x % M) + M) % M;
}`,
        explanation: 'BigInt CRT reconstruction; combines residues via M/m_i and its modular inverse.',
      },
      {
        id: 'snip-chinese-remainder-theorem-cpp',
        topic_id: 'ext-chinese-remainder-theorem',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;
using ll = long long;

ll extGcd(ll a, ll b, ll& x, ll& y) {
    if (!b) { x = 1; y = 0; return a; }
    ll x1, y1; ll g = extGcd(b, a % b, x1, y1);
    x = y1; y = x1 - (a / b) * y1; return g;
}
ll modInv(ll a, ll m) { ll x, y; extGcd((a % m + m) % m, m, x, y); return (x % m + m) % m; }

ll crt(const vector<ll>& r, const vector<ll>& m) {
    ll M = 1; for (ll mi : m) M *= mi;
    __int128 x = 0;
    for (size_t i = 0; i < r.size(); ++i) {
        ll Mi = M / m[i];
        x += (__int128)r[i] * Mi % M * modInv(Mi, m[i]);
    }
    return (ll)((x % M + M) % M);
}`,
        explanation: 'Uses __int128 to avoid overflow while reconstructing the CRT solution.',
      },
      {
        id: 'snip-chinese-remainder-theorem-java',
        topic_id: 'ext-chinese-remainder-theorem',
        language: 'java',
        is_optimized: true,
        code: `import java.math.BigInteger;

class CRT {
    static BigInteger crt(BigInteger[] rem, BigInteger[] mod) {
        BigInteger M = BigInteger.ONE;
        for (BigInteger m : mod) M = M.multiply(m);
        BigInteger x = BigInteger.ZERO;
        for (int i = 0; i < rem.length; i++) {
            BigInteger Mi = M.divide(mod[i]);
            BigInteger yi = Mi.modInverse(mod[i]);
            x = x.add(rem[i].multiply(Mi).multiply(yi));
        }
        return x.mod(M);
    }
}`,
        explanation: 'BigInteger CRT using built-in modInverse, safe from overflow for large moduli.',
      },
    ],
    quizId: 'quiz-ext-chinese-remainder-theorem',
    quizTitle: 'Chinese Remainder Theorem Quiz',
    quizDescription: 'Test your understanding of solving simultaneous congruences.',
    questions: [
      {
        id: 'q-chinese-remainder-theorem-1',
        quiz_id: 'quiz-ext-chinese-remainder-theorem',
        question_text: 'The Chinese Remainder Theorem guarantees a unique solution modulo the product of the moduli only when the moduli are what?',
        question_type: 'MCQ',
        options: ['All prime', 'Pairwise coprime', 'All even', 'Consecutive integers'],
        correct_option_index: 1,
        explanation: 'Pairwise coprimality is required for the unique-solution guarantee modulo the product.',
      },
      {
        id: 'q-chinese-remainder-theorem-2',
        quiz_id: 'quiz-ext-chinese-remainder-theorem',
        question_text: 'What is the smallest non-negative x satisfying x = 2 (mod 3), x = 3 (mod 5), and x = 2 (mod 7)?',
        question_type: 'MCQ',
        options: ['23', '52', '11', '128'],
        correct_option_index: 0,
        explanation: 'x = 23 satisfies all three: 23 mod 3 = 2, 23 mod 5 = 3, 23 mod 7 = 2.',
      },
      {
        id: 'q-chinese-remainder-theorem-3',
        quiz_id: 'quiz-ext-chinese-remainder-theorem',
        question_text: 'RSA decryption can use CRT to speed up computation by working modulo the prime factors separately.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Computing modulo p and q separately and recombining via CRT is a standard RSA optimization.',
      },
    ],
  },
  // 34. EULER'S TOTIENT FUNCTION
  {
    topic: {
      id: 'ext-eulers-totient-function',
      slug: 'eulers-totient-function',
      category_id: CATEGORY_IDS.foundations,
      title: "Euler's Totient Function",
      definition: "Euler's totient function phi(n) counts the positive integers up to n that are coprime to n, and it generalizes Fermat's little theorem via Euler's theorem.",
      importance: 'It is central to RSA key generation, computing modular inverses for composite moduli, and reasoning about the multiplicative structure of integers modulo n.',
      prerequisites: ['euclidean-algorithm-gcd', 'sieve-of-eratosthenes'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(sqrt(n)) single value',
      time_complexity_average: 'O(sqrt(n)) single value',
      time_complexity_worst: 'O(n log log n) sieve for all values up to n',
      space_complexity: 'O(n) for the sieve variant',
      display_order: 133,
    },
    sections: [
      {
        id: 'sec-eulers-totient-function-1',
        topic_id: 'ext-eulers-totient-function',
        title: 'Concept & Intuition',
        content: `**Euler's totient** $\\phi(n)$ counts how many integers in $\\{1, 2, \\dots, n\\}$ are **coprime** to $n$ (share no factor besides 1).

For example, $\\phi(9) = 6$ because $1, 2, 4, 5, 7, 8$ are coprime to 9. For a prime $p$, every smaller positive integer is coprime, so $\\phi(p) = p - 1$.`,
        display_order: 1,
      },
      {
        id: 'sec-eulers-totient-function-2',
        topic_id: 'ext-eulers-totient-function',
        title: 'The Product Formula',
        content: `If $n = p_1^{a_1} p_2^{a_2} \\cdots p_k^{a_k}$ is the prime factorization, then

$$\\phi(n) = n \\prod_{i=1}^{k} \\left(1 - \\frac{1}{p_i}\\right).$$

So computing $\\phi(n)$ reduces to finding $n$'s **distinct prime factors** — obtainable by trial division up to $\\sqrt{n}$.`,
        display_order: 2,
      },
      {
        id: 'sec-eulers-totient-function-3',
        topic_id: 'ext-eulers-totient-function',
        title: "Euler's Theorem",
        content: `The function's power comes from **Euler's theorem**:

$$a^{\\phi(n)} \\equiv 1 \\pmod{n} \\quad \\text{whenever } \\gcd(a, n) = 1.$$

> [!IMPORTANT]
> This generalizes Fermat's little theorem (the case $n = p$) and lets you compute modular inverses for composite $n$: $a^{-1} \\equiv a^{\\phi(n) - 1} \\pmod{n}$.`,
        display_order: 3,
      },
      {
        id: 'sec-eulers-totient-function-4',
        topic_id: 'ext-eulers-totient-function',
        title: 'Properties & Pitfalls',
        content: `$\\phi$ is **multiplicative** for coprime arguments: $\\phi(mn) = \\phi(m)\\phi(n)$ when $\\gcd(m, n) = 1$. A sieve can compute $\\phi$ for all values up to $n$ in $O(n \\log \\log n)$.

> [!WARNING]
> Do not treat $\\phi$ as multiplicative for **non-coprime** arguments — $\\phi(4 \\cdot 6) \\ne \\phi(4)\\phi(6)$. Also, for exponent reduction $a^e \\bmod n$, reduce the exponent modulo $\\phi(n)$ **only** when $\\gcd(a, n) = 1$.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-eulers-totient-function-py',
        topic_id: 'ext-eulers-totient-function',
        language: 'python',
        is_optimized: true,
        code: `def phi(n):
    result = n
    p = 2
    while p * p <= n:
        if n % p == 0:
            while n % p == 0:
                n //= p
            result -= result // p     # apply (1 - 1/p)
        p += 1
    if n > 1:
        result -= result // n
    return result

print(phi(9))   # 6
print(phi(36))  # 12`,
        explanation: "Computes phi(n) in O(sqrt(n)) by factoring n and applying the product formula.",
      },
      {
        id: 'snip-eulers-totient-function-js',
        topic_id: 'ext-eulers-totient-function',
        language: 'javascript',
        is_optimized: true,
        code: `function phi(n) {
  let result = n;
  for (let p = 2; p * p <= n; p++) {
    if (n % p === 0) {
      while (n % p === 0) n = Math.floor(n / p);
      result -= Math.floor(result / p);
    }
  }
  if (n > 1) result -= Math.floor(result / n);
  return result;
}

console.log(phi(9), phi(36)); // 6 12`,
        explanation: "Trial-division totient applying (1 - 1/p) for each distinct prime factor.",
      },
      {
        id: 'snip-eulers-totient-function-cpp',
        topic_id: 'ext-eulers-totient-function',
        language: 'cpp',
        is_optimized: true,
        code: `long long phi(long long n) {
    long long result = n;
    for (long long p = 2; p * p <= n; ++p) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;   // (1 - 1/p) factor
        }
    }
    if (n > 1) result -= result / n;
    return result;
}`,
        explanation: "Single-value Euler totient via O(sqrt(n)) factorization and the product formula.",
      },
      {
        id: 'snip-eulers-totient-function-java',
        topic_id: 'ext-eulers-totient-function',
        language: 'java',
        is_optimized: true,
        code: `class Totient {
    static long phi(long n) {
        long result = n;
        for (long p = 2; p * p <= n; p++) {
            if (n % p == 0) {
                while (n % p == 0) n /= p;
                result -= result / p;
            }
        }
        if (n > 1) result -= result / n;
        return result;
    }
}`,
        explanation: "Java Euler totient computed by extracting distinct prime factors of n.",
      },
    ],
    quizId: 'quiz-ext-eulers-totient-function',
    quizTitle: "Euler's Totient Function Quiz",
    quizDescription: 'Test your understanding of the totient function and Euler theorem.',
    questions: [
      {
        id: 'q-eulers-totient-function-1',
        quiz_id: 'quiz-ext-eulers-totient-function',
        question_text: 'What is phi(p) for a prime number p?',
        question_type: 'MCQ',
        options: ['p', 'p - 1', 'p / 2', '1'],
        correct_option_index: 1,
        explanation: 'Every integer from 1 to p-1 is coprime to a prime p, so phi(p) = p - 1.',
      },
      {
        id: 'q-eulers-totient-function-2',
        quiz_id: 'quiz-ext-eulers-totient-function',
        question_text: "Euler's theorem states that a^phi(n) is congruent to 1 mod n whenever gcd(a, n) = 1.",
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: "This is Euler's theorem, generalizing Fermat's little theorem to composite moduli.",
      },
      {
        id: 'q-eulers-totient-function-3',
        quiz_id: 'quiz-ext-eulers-totient-function',
        question_text: 'What is the time complexity of computing phi(n) for a single n by trial-division factorization?',
        question_type: 'COMPLEXITY',
        options: ['O(1)', 'O(log n)', 'O(sqrt(n))', 'O(n)'],
        correct_option_index: 2,
        explanation: 'Trial division up to sqrt(n) finds all prime factors, giving O(sqrt(n)).',
      },
    ],
  },
];
