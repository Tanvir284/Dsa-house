/* eslint-disable @typescript-eslint/no-require-imports */
// Native Node.js test runner (introduced in v18/v20)
// To run: node tests/dsa-logic.test.js
const test = require('node:test');
const assert = require('node:assert');

// Ported JS functions of step generators to test logic directly
function generateBubbleSortSteps(inputArray) {
  const arr = [...inputArray];
  const n = arr.length;
  const steps = [];
  const sortedIndices = [];

  steps.push({ elements: [...arr], highlights: [], status: 'idle' });

  for (let i = 0; i < n; i++) {
    let swappedAny = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ elements: [...arr], highlights: [j, j + 1], status: 'compare' });

      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swappedAny = true;
        steps.push({ elements: [...arr], highlights: [j, j + 1], status: 'swap' });
      }
    }
    sortedIndices.push(n - i - 1);
    if (!swappedAny) {
      steps.push({ elements: [...arr], highlights: [], status: 'done' });
      return steps;
    }
  }
  steps.push({ elements: [...arr], highlights: [], status: 'done' });
  return steps;
}

function generateBinarySearchSteps(arr, target) {
  const steps = [];
  let low = 0;
  let high = arr.length - 1;

  steps.push({ highlights: [], low, high, status: 'idle' });

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    steps.push({ highlights: [mid], low, high, status: 'compare' });

    if (arr[mid] === target) {
      steps.push({ highlights: [mid], low, high, status: 'found' });
      return steps;
    } else if (arr[mid] < target) {
      low = mid + 1;
      steps.push({ highlights: [], low, high, status: 'traversing' });
    } else {
      high = mid - 1;
      steps.push({ highlights: [], low, high, status: 'traversing' });
    }
  }

  steps.push({ highlights: [], status: 'done' });
  return steps;
}

test('Bubble Sort Step Generator Logic', () => {
  const unsorted = [5, 1, 4, 2];
  const steps = generateBubbleSortSteps(unsorted);

  // Assert steps array was created
  assert.ok(steps.length > 0, 'Steps should not be empty');
  
  // Verify final step is fully sorted
  const finalStep = steps[steps.length - 1];
  assert.strictEqual(finalStep.status, 'done', 'Final step status should be done');
  assert.deepStrictEqual(finalStep.elements, [1, 2, 4, 5], 'Array should be sorted ascending');
});

test('Binary Search Step Generator Logic', () => {
  const sorted = [10, 20, 30, 40, 50];
  
  // Target present
  const stepsFound = generateBinarySearchSteps(sorted, 40);
  assert.strictEqual(stepsFound[stepsFound.length - 1].status, 'found', 'Should find target 40');
  
  // Target absent
  const stepsNotFound = generateBinarySearchSteps(sorted, 99);
  assert.strictEqual(stepsNotFound[stepsNotFound.length - 1].status, 'done', 'Should complete with status done');
});

function generateMergeSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;

  steps.push({ elements: [...arr], status: 'idle' });

  const runMergeSort = (l, r) => {
    if (l >= r) return;
    const m = Math.floor(l + (r - l) / 2);
    runMergeSort(l, m);
    runMergeSort(m + 1, r);
    merge(l, m, r);
  };

  const merge = (l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = arr.slice(l, m + 1);
    const R = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        steps.push({ elements: [...arr], status: 'swap' });
        i++;
      } else {
        arr[k] = R[j];
        steps.push({ elements: [...arr], status: 'swap' });
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      steps.push({ elements: [...arr], status: 'swap' });
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      steps.push({ elements: [...arr], status: 'swap' });
      j++;
      k++;
    }
  };

  runMergeSort(0, n - 1);
  steps.push({ elements: [...arr], status: 'done' });
  return steps;
}

function generateQuickSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;

  steps.push({ elements: [...arr], status: 'idle' });

  const runQuickSort = (low, high) => {
    if (low < high) {
      const pIndex = partition(low, high);
      runQuickSort(low, pIndex - 1);
      runQuickSort(pIndex + 1, high);
    }
  };

  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        steps.push({ elements: [...arr], status: 'swap' });
      }
    }
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    steps.push({ elements: [...arr], status: 'swap' });
    return i + 1;
  };

  runQuickSort(0, n - 1);
  steps.push({ elements: [...arr], status: 'done' });
  return steps;
}

test('Merge Sort Step Generator Logic', () => {
  const unsorted = [5, 1, 4, 2, 8, 3];
  const steps = generateMergeSortSteps(unsorted);
  const finalStep = steps[steps.length - 1];
  assert.strictEqual(finalStep.status, 'done', 'Final step status should be done');
  assert.deepStrictEqual(finalStep.elements, [1, 2, 3, 4, 5, 8], 'Array should be sorted ascending');
});

test('Quick Sort Step Generator Logic', () => {
  const unsorted = [9, -3, 5, 2, 6, 8, -6, 1, 3];
  const steps = generateQuickSortSteps(unsorted);
  const finalStep = steps[steps.length - 1];
  assert.strictEqual(finalStep.status, 'done', 'Final step status should be done');
  assert.deepStrictEqual(finalStep.elements, [-6, -3, 1, 2, 3, 5, 6, 8, 9], 'Array should be sorted ascending');
});
