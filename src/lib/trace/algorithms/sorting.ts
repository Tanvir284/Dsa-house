import type { AlgorithmDefinition } from '../types';

/**
 * Sorting algorithms, written as ordinary code against the tracer.
 *
 * Note what is *absent* here: there are no `steps.push({...})` calls, no
 * duplicated narration, and no second copy of the logic maintained for the
 * animation. Each function below is the algorithm — the visualization falls
 * out of running it.
 */

export const bubbleSort: AlgorithmDefinition = {
  slug: 'bubble-sort',
  adaptive: true,
  title: 'Bubble Sort',
  complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  defaultInput: [45, 12, 89, 7, 23, 56, 33, 9],
  pseudocode: [
    'bubbleSort(a):',
    '  for i = 0 to n-1:',
    '    swapped = false',
    '    for j = 0 to n-i-2:',
    '      if a[j] > a[j+1]:',
    '        swap(a[j], a[j+1])',
    '        swapped = true',
    '    if not swapped: break',
  ],
  run(t, input) {
    const a = t.array(input);
    const n = a.length;

    for (let i = 0; i < n - 1; i++) {
      t.at(1);
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        t.mark('i', i);
        t.mark('j', j);
        t.at(4);
        if (a.gt(j, j + 1)) {
          t.at(5);
          a.swap(j, j + 1);
          swapped = true;
        }
      }

      a.seal(n - i - 1);

      t.at(7);
      if (!swapped) {
        // Every remaining prefix is already ordered, so finalise it wholesale.
        a.sealRange(0, n - i - 2);
        t.note('A full pass made no swaps, so the array is already sorted.');
        break;
      }
    }

    t.mark('i', null);
    t.mark('j', null);
    a.seal(0);
    return a.snapshot();
  },
};

export const selectionSort: AlgorithmDefinition = {
  slug: 'selection-sort',
  title: 'Selection Sort',
  complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  defaultInput: [64, 25, 12, 22, 11, 90, 33, 7],
  pseudocode: [
    'selectionSort(a):',
    '  for i = 0 to n-2:',
    '    min = i',
    '    for j = i+1 to n-1:',
    '      if a[j] < a[min]:',
    '        min = j',
    '    swap(a[i], a[min])',
  ],
  run(t, input) {
    const a = t.array(input);
    const n = a.length;

    for (let i = 0; i < n - 1; i++) {
      t.at(2);
      let min = i;
      t.mark('i', i);
      t.mark('min', min);

      for (let j = i + 1; j < n; j++) {
        t.mark('j', j);
        t.at(4);
        if (a.lt(j, min)) {
          t.at(5);
          min = j;
          t.mark('min', min);
        }
      }

      t.at(6);
      if (min !== i) a.swap(i, min);
      a.seal(i);
    }

    a.seal(n - 1);
    t.mark('i', null);
    t.mark('j', null);
    t.mark('min', null);
    return a.snapshot();
  },
};

export const insertionSort: AlgorithmDefinition = {
  slug: 'insertion-sort',
  adaptive: true,
  title: 'Insertion Sort',
  complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  defaultInput: [31, 41, 59, 26, 41, 58, 9, 12],
  pseudocode: [
    'insertionSort(a):',
    '  for i = 1 to n-1:',
    '    key = a[i]',
    '    j = i - 1',
    '    while j >= 0 and a[j] > key:',
    '      a[j+1] = a[j]',
    '      j = j - 1',
    '    a[j+1] = key',
  ],
  run(t, input) {
    const a = t.array(input);
    const n = a.length;

    for (let i = 1; i < n; i++) {
      t.mark('i', i);
      t.at(2);
      const key = a.get(i);
      let j = i - 1;

      t.at(4);
      // `cmp` both records the comparison and reads a[j], so no separate read.
      while (j >= 0 && a.cmp(j, key) > 0) {
        t.at(5);
        a.set(j + 1, a.peek(j));
        t.at(6);
        j -= 1;
        t.mark('j', j);
        t.at(4);
      }

      t.at(7);
      a.set(j + 1, key);

      // The prefix is *ordered*, but not final — a later key can still shift
      // any of it rightwards. `scope` conveys "under consideration"; `seal`
      // would be a stronger claim than insertion sort actually earns, and the
      // trace invariants hold it to that claim.
      t.scope(0, i);
    }

    t.scope(null);
    a.sealRange(0, n - 1);
    t.mark('i', null);
    t.mark('j', null);
    return a.snapshot();
  },
};

export const mergeSort: AlgorithmDefinition = {
  slug: 'merge-sort',
  title: 'Merge Sort',
  complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  defaultInput: [23, 77, 45, 12, 89, 5, 99, 10],
  pseudocode: [
    'mergeSort(a, lo, hi):',
    '  if lo >= hi: return',
    '  mid = (lo + hi) / 2',
    '  mergeSort(a, lo, mid)',
    '  mergeSort(a, mid+1, hi)',
    '  merge(a, lo, mid, hi)',
    'merge(a, lo, mid, hi):',
    '  L = a[lo..mid]; R = a[mid+1..hi]',
    '  while L and R non-empty:',
    '    a[k++] = min(L.front, R.front)',
    '  copy any remainder back',
  ],
  run(t, input) {
    const a = t.array(input);

    function merge(lo: number, mid: number, hi: number): void {
      t.at(6);
      t.scope(lo, hi);

      // Buffer both halves. `peek` is uninstrumented on purpose: this copy is
      // an implementation detail of the merge, not a comparison the learner
      // needs to watch, and counting it would inflate the read metric.
      const left: number[] = [];
      const right: number[] = [];
      for (let i = lo; i <= mid; i++) left.push(a.peek(i));
      for (let i = mid + 1; i <= hi; i++) right.push(a.peek(i));

      t.at(7);
      t.note(`Merging [${left.join(', ')}] with [${right.join(', ')}].`);

      let i = 0;
      let j = 0;
      let k = lo;

      t.at(8);
      while (i < left.length && j < right.length) {
        t.mark('k', k);
        t.at(9);
        // Compare the two fronts directly; both are already in hand.
        if (left[i] <= right[j]) {
          a.set(k, left[i]);
          i += 1;
        } else {
          a.set(k, right[j]);
          j += 1;
        }
        k += 1;
      }

      t.at(10);
      while (i < left.length) {
        a.set(k, left[i]);
        i += 1;
        k += 1;
      }
      while (j < right.length) {
        a.set(k, right[j]);
        j += 1;
        k += 1;
      }

      t.mark('k', null);
    }

    function sort(lo: number, hi: number): void {
      t.at(1);
      if (lo >= hi) return;

      t.enter(`mergeSort(${lo}, ${hi})`, [lo, hi]);
      t.scope(lo, hi);

      t.at(2);
      const mid = Math.floor((lo + hi) / 2);
      t.mark('mid', mid);

      t.at(3);
      sort(lo, mid);
      t.at(4);
      sort(mid + 1, hi);

      merge(lo, mid, hi);
      t.exit();
    }

    sort(0, a.length - 1);

    t.scope(null);
    t.mark('mid', null);
    a.sealRange(0, a.length - 1);
    return a.snapshot();
  },
};

export const quickSort: AlgorithmDefinition = {
  slug: 'quick-sort',
  title: 'Quick Sort',
  complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
  defaultInput: [42, 17, 89, 5, 23, 56, 77, 10],
  pseudocode: [
    'quickSort(a, lo, hi):',
    '  if lo >= hi: return',
    '  p = partition(a, lo, hi)',
    '  quickSort(a, lo, p-1)',
    '  quickSort(a, p+1, hi)',
    'partition(a, lo, hi):',
    '  pivot = a[hi]',
    '  i = lo - 1',
    '  for j = lo to hi-1:',
    '    if a[j] <= pivot:',
    '      i++; swap(a[i], a[j])',
    '  swap(a[i+1], a[hi])',
    '  return i+1',
  ],
  run(t, input) {
    const a = t.array(input);

    /** Lomuto partition: pivot is the last element of the window. */
    function partition(lo: number, hi: number): number {
      t.at(5);
      t.scope(lo, hi);
      a.pivot(hi);

      t.at(6);
      const pivotValue = a.peek(hi);
      let i = lo - 1;
      t.at(7);

      for (let j = lo; j < hi; j++) {
        t.mark('j', j);
        t.at(9);
        if (a.cmp(j, pivotValue) <= 0) {
          i += 1;
          t.mark('i', i);
          t.at(10);
          if (i !== j) a.swap(i, j);
        }
      }

      t.at(11);
      a.pivot(null);
      if (i + 1 !== hi) a.swap(i + 1, hi);
      a.seal(i + 1);

      t.at(12);
      return i + 1;
    }

    function sort(lo: number, hi: number): void {
      t.at(1);
      if (lo >= hi) {
        if (lo === hi) a.seal(lo);
        return;
      }

      t.enter(`quickSort(${lo}, ${hi})`, [lo, hi]);

      t.at(2);
      const p = partition(lo, hi);

      t.at(3);
      sort(lo, p - 1);
      t.at(4);
      sort(p + 1, hi);

      t.exit();
    }

    sort(0, a.length - 1);

    t.scope(null);
    t.mark('i', null);
    t.mark('j', null);
    a.sealRange(0, a.length - 1);
    return a.snapshot();
  },
};

export const heapSort: AlgorithmDefinition = {
  slug: 'heap-sort',
  title: 'Heap Sort',
  complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
  defaultInput: [19, 4, 72, 38, 51, 8, 63, 27],
  pseudocode: [
    'heapSort(a):',
    '  buildMaxHeap(a)',
    '  for end = n-1 down to 1:',
    '    swap(a[0], a[end])',
    '    siftDown(a, 0, end)',
    'siftDown(a, root, end):',
    '  while 2*root+1 < end:',
    '    child = larger child of root',
    '    if a[root] >= a[child]: break',
    '    swap(a[root], a[child]); root = child',
  ],
  run(t, input) {
    const a = t.array(input);
    const n = a.length;

    function siftDown(root: number, end: number): void {
      t.at(5);
      while (2 * root + 1 < end) {
        t.at(6);
        let child = 2 * root + 1;
        t.mark('root', root);
        t.mark('child', child);

        t.at(7);
        if (child + 1 < end && a.lt(child, child + 1)) {
          child += 1;
          t.mark('child', child);
        }

        t.at(8);
        if (!a.lt(root, child)) break;

        t.at(9);
        a.swap(root, child);
        root = child;

      }
    }

    t.at(1);
    t.note('Build a max-heap so the largest value sits at the root.');
    for (let root = Math.floor(n / 2) - 1; root >= 0; root--) {
      siftDown(root, n);
    }

    for (let end = n - 1; end > 0; end--) {
      t.at(3);
      t.mark('end', end);
      a.swap(0, end);
      a.seal(end);
      t.at(4);
      siftDown(0, end);
    }

    a.seal(0);
    t.mark('root', null);
    t.mark('child', null);
    t.mark('end', null);
    return a.snapshot();
  },
};

export const shellSort: AlgorithmDefinition = {
  slug: 'shell-sort',
  adaptive: true,
  title: 'Shell Sort',
  complexity: { best: 'O(n log n)', average: 'O(n^1.25)', worst: 'O(n²)', space: 'O(1)' },
  defaultInput: [62, 83, 18, 53, 7, 17, 95, 86, 47, 69],
  pseudocode: [
    'shellSort(a):',
    '  for gap = n/2 down to 1, halving:',
    '    for i = gap to n-1:',
    '      key = a[i]; j = i',
    '      while j >= gap and a[j-gap] > key:',
    '        a[j] = a[j-gap]; j -= gap',
    '      a[j] = key',
  ],
  run(t, input) {
    const a = t.array(input);
    const n = a.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      t.at(1);
      t.mark('gap', gap);
      t.note(`Gap ${gap}: sort every subsequence whose indices differ by ${gap}.`);

      for (let i = gap; i < n; i++) {
        t.at(3);
        t.mark('i', i);
        const key = a.get(i);
        let j = i;

        t.at(4);
        while (j >= gap && a.cmp(j - gap, key) > 0) {
          t.at(5);
          a.set(j, a.peek(j - gap));
          j -= gap;
          t.at(4);
        }

        t.at(6);
        a.set(j, key);
      }
    }

    a.sealRange(0, n - 1);
    t.mark('gap', null);
    t.mark('i', null);
    return a.snapshot();
  },
};

export const sortingAlgorithms = [
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  shellSort,
];
