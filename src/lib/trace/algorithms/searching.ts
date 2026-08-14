import type { AlgorithmDefinition } from '../types';

/**
 * Search algorithms. Each declares `requiresSortedInput` where correctness
 * depends on ordering, so the runner sorts the input before handing it over
 * rather than leaving that trap to the caller.
 */

export const linearSearch: AlgorithmDefinition = {
  slug: 'linear-search',
  title: 'Linear Search',
  complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
  defaultInput: [45, 12, 89, 7, 23, 56, 33, 9],
  defaultTarget: 23,
  usesTarget: true,
  pseudocode: [
    'linearSearch(a, target):',
    '  for i = 0 to n-1:',
    '    if a[i] == target:',
    '      return i',
    '  return -1',
  ],
  run(t, input, args) {
    const a = t.array(input);
    const target = args.target ?? 0;

    for (let i = 0; i < a.length; i++) {
      t.mark('i', i);
      t.at(2);
      if (a.cmp(i, target) === 0) {
        t.at(3);
        t.found(i);
        return i;
      }
    }

    t.at(4);
    t.note(`${target} is not present in the array.`);
    return -1;
  },
};

export const binarySearch: AlgorithmDefinition = {
  slug: 'binary-search',
  title: 'Binary Search',
  complexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
  defaultInput: [8, 15, 23, 38, 42, 57, 69, 88],
  defaultTarget: 57,
  usesTarget: true,
  requiresSortedInput: true,
  pseudocode: [
    'binarySearch(a, target):',
    '  low = 0, high = n-1',
    '  while low <= high:',
    '    mid = low + (high - low) / 2',
    '    if a[mid] == target: return mid',
    '    else if a[mid] < target: low = mid + 1',
    '    else: high = mid - 1',
    '  return -1',
  ],
  run(t, input, args) {
    const a = t.array(input);
    const target = args.target ?? 0;

    t.at(1);
    let low = 0;
    let high = a.length - 1;

    while (low <= high) {
      t.at(2);
      t.scope(low, high);
      t.mark('low', low);
      t.mark('high', high);

      t.at(3);
      // `low + (high - low) / 2` rather than `(low + high) / 2` — the classic
      // overflow-safe form, kept here because the pseudocode teaches it.
      const mid = low + Math.floor((high - low) / 2);
      t.mark('mid', mid);

      t.at(4);
      const comparison = a.cmp(mid, target);

      if (comparison === 0) {
        t.found(mid);
        return mid;
      }

      if (comparison < 0) {
        t.at(5);
        low = mid + 1;
        t.note(`a[${mid}] is too small, so discard everything at or below index ${mid}.`);
      } else {
        t.at(6);
        high = mid - 1;
        t.note(`a[${mid}] is too large, so discard everything at or above index ${mid}.`);
      }

    }

    t.at(7);
    t.scope(null);
    t.note(`${target} is not present in the array.`);
    return -1;
  },
};

export const jumpSearch: AlgorithmDefinition = {
  slug: 'jump-search',
  title: 'Jump Search',
  complexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)', space: 'O(1)' },
  defaultInput: [3, 9, 14, 19, 25, 31, 42, 47, 55, 63, 70, 81, 88, 92, 97, 99],
  defaultTarget: 55,
  usesTarget: true,
  requiresSortedInput: true,
  pseudocode: [
    'jumpSearch(a, target):',
    '  step = floor(sqrt(n)); prev = 0',
    '  while a[min(step, n) - 1] < target:',
    '    prev = step; step += floor(sqrt(n))',
    '    if prev >= n: return -1',
    '  while a[prev] < target:',
    '    prev++',
    '    if prev == min(step, n): return -1',
    '  if a[prev] == target: return prev',
    '  return -1',
  ],
  run(t, input, args) {
    const a = t.array(input);
    const target = args.target ?? 0;
    const n = a.length;
    if (n === 0) return -1;

    const jump = Math.max(1, Math.floor(Math.sqrt(n)));
    let step = jump;
    let prev = 0;

    t.at(1);
    t.note(`Block size is ⌊√${n}⌋ = ${jump}, so jump ${jump} indices at a time.`);

    t.at(2);
    while (a.cmp(Math.min(step, n) - 1, target) < 0) {
      t.at(3);
      prev = step;
      step += jump;
      t.mark('prev', prev);
      t.mark('step', Math.min(step, n) - 1);

      t.at(4);
      if (prev >= n) {
        t.note(`Jumped past the end without reaching ${target}.`);
        return -1;
      }
      t.at(2);
    }

    t.scope(prev, Math.min(step, n) - 1);
    t.note(`${target} must lie in the block starting at index ${prev}. Scan it linearly.`);

    t.at(5);
    while (a.cmp(prev, target) < 0) {
      t.at(6);
      prev += 1;
      t.mark('prev', prev);

      t.at(7);
      if (prev === Math.min(step, n)) {
        t.note(`Ran off the end of the block without finding ${target}.`);
        return -1;
      }
      t.at(5);
    }

    t.at(8);
    if (a.cmp(prev, target) === 0) {
      t.found(prev);
      return prev;
    }

    t.at(9);
    t.scope(null);
    t.note(`${target} is not present in the array.`);
    return -1;
  },
};

export const searchingAlgorithms = [linearSearch, binarySearch, jumpSearch];
