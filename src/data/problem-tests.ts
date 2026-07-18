/**
 * Runnable test specs for problems in the arena.
 *
 * The runner harness invokes a single entry function per submission and
 * compares its return value against `expected` using the specified compare
 * mode. Every problem that appears here becomes "runnable" in the UI; the
 * others render a friendly hint that a test harness has not been authored
 * for them yet.
 */

import type { ProblemTestSpec } from '@/lib/runner/types';

export const PROBLEM_TESTS: Record<string, ProblemTestSpec> = {
  'lc-1': {
    problemId: 'lc-1',
    entry: {
      python: { methodName: 'two_sum' },
      javascript: { fnName: 'twoSum' },
    },
    cases: [
      { id: 't1', label: 'Example 1', input: [[2, 7, 11, 15], 9], expected: [0, 1], compare: 'set-sorted' },
      { id: 't2', label: 'Example 2', input: [[3, 2, 4], 6], expected: [1, 2], compare: 'set-sorted' },
      { id: 't3', label: 'Duplicates', input: [[3, 3], 6], expected: [0, 1], compare: 'set-sorted' },
      { id: 't4', label: 'Negatives', input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4], compare: 'set-sorted' },
    ],
    starter: {
      python: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []
`,
      javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
`,
    },
  },

  'cf-4A': {
    problemId: 'cf-4A',
    entry: {
      python: { methodName: 'watermelon' },
      javascript: { fnName: 'watermelon' },
    },
    cases: [
      { id: 't1', label: 'w = 8', input: [8], expected: 'YES', compare: 'trim' },
      { id: 't2', label: 'w = 2', input: [2], expected: 'NO', compare: 'trim' },
      { id: 't3', label: 'w = 3', input: [3], expected: 'NO', compare: 'trim' },
      { id: 't4', label: 'w = 100', input: [100], expected: 'YES', compare: 'trim' },
    ],
    starter: {
      python: `def watermelon(w):
    return "YES" if w > 2 and w % 2 == 0 else "NO"
`,
      javascript: `function watermelon(w) {
  return (w > 2 && w % 2 === 0) ? "YES" : "NO";
}
`,
    },
  },

  'cf-71A': {
    problemId: 'cf-71A',
    entry: {
      python: { methodName: 'abbreviate' },
      javascript: { fnName: 'abbreviate' },
    },
    cases: [
      { id: 't1', label: 'short', input: ['word'], expected: 'word', compare: 'trim' },
      { id: 't2', label: 'localization', input: ['localization'], expected: 'l10n', compare: 'trim' },
      { id: 't3', label: 'internationalization', input: ['internationalization'], expected: 'i18n', compare: 'trim' },
      { id: 't4', label: 'boundary=10', input: ['abcdefghij'], expected: 'abcdefghij', compare: 'trim' },
      { id: 't5', label: 'boundary=11', input: ['abcdefghijk'], expected: 'a9k', compare: 'trim' },
    ],
    starter: {
      python: `def abbreviate(word):
    return word if len(word) <= 10 else f"{word[0]}{len(word) - 2}{word[-1]}"
`,
      javascript: `function abbreviate(word) {
  return word.length <= 10 ? word : \`\${word[0]}\${word.length - 2}\${word[word.length - 1]}\`;
}
`,
    },
  },

  'lc-20': {
    problemId: 'lc-20',
    entry: {
      python: { methodName: 'is_valid' },
      javascript: { fnName: 'isValid' },
    },
    cases: [
      { id: 't1', label: '()', input: ['()'], expected: true },
      { id: 't2', label: '()[]{}', input: ['()[]{}'], expected: true },
      { id: 't3', label: '(]', input: ['(]'], expected: false },
      { id: 't4', label: '([)]', input: ['([)]'], expected: false },
      { id: 't5', label: 'empty', input: [''], expected: true },
    ],
    starter: {
      python: `def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        else:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack
`,
      javascript: `function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of s) {
    if ('([{'.includes(ch)) stack.push(ch);
    else if (stack.pop() !== pairs[ch]) return false;
  }
  return stack.length === 0;
}
`,
    },
  },
};

export function getProblemTestSpec(problemId: string): ProblemTestSpec | undefined {
  return PROBLEM_TESTS[problemId];
}
