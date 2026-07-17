import { VisualizerStep } from '@/types';

// Helper to clone element array
const cloneElements = (arr: number[], highlights: number[] = [], sorted: number[] = [], swapped: number[] = []) => {
  return arr.map((val, idx) => {
    let state: 'default' | 'compare' | 'swap' | 'sorted' = 'default';
    if (sorted.includes(idx)) state = 'sorted';
    else if (swapped.includes(idx)) state = 'swap';
    else if (highlights.includes(idx)) state = 'compare';
    return { val, state };
  });
};

// 1. BUBBLE SORT STEP GENERATOR
export const generateBubbleSortSteps = (inputArray: number[]): VisualizerStep[] => {
  const arr = [...inputArray];
  const n = arr.length;
  const steps: VisualizerStep[] = [];
  const sortedIndices: number[] = [];

  // Initial step
  steps.push({
    elements: cloneElements(arr),
    highlights: [],
    markers: {},
    explanation: "Starting Bubble Sort on the array.",
    codeLine: 0,
    status: 'idle',
  });

  for (let i = 0; i < n; i++) {
    let swappedAny = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Comparison Step
      steps.push({
        elements: cloneElements(arr, [j, j + 1], sortedIndices),
        highlights: [j, j + 1],
        markers: {},
        explanation: `Comparing adjacent values arr[${j}] (${arr[j]}) and arr[${j+1}] (${arr[j+1]}).`,
        codeLine: 4,
        status: 'compare',
      });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swappedAny = true;

        // Swap Step
        steps.push({
          elements: cloneElements(arr, [], sortedIndices, [j, j + 1]),
          highlights: [j, j + 1],
          markers: {},
          explanation: `Since ${temp} > ${arr[j]}, we swap them.`,
          codeLine: 5,
          status: 'swap',
        });
      }
    }

    // Mark the last element of this pass as sorted
    sortedIndices.push(n - i - 1);
    steps.push({
      elements: cloneElements(arr, [], sortedIndices),
      highlights: [],
      markers: {},
      explanation: `Element at index ${n - i - 1} (${arr[n - i - 1]}) is now in its correct sorted position.`,
      codeLine: 3,
      status: 'traversing',
    });

    if (!swappedAny) {
      // Early exit optimization triggered
      for (let k = 0; k < n; k++) {
        if (!sortedIndices.includes(k)) sortedIndices.push(k);
      }
      steps.push({
        elements: cloneElements(arr, [], sortedIndices),
        highlights: [],
        markers: {},
        explanation: "No swaps occurred in this pass! The array is fully sorted. Exiting early.",
        codeLine: 7,
        status: 'done',
      });
      return steps;
    }
  }

  steps.push({
    elements: cloneElements(arr, [], sortedIndices),
    highlights: [],
    markers: {},
    explanation: "Bubble Sort completed! All elements are sorted.",
    codeLine: 7,
    status: 'done',
  });

  return steps;
};

// 2. BINARY SEARCH STEP GENERATOR
export const generateBinarySearchSteps = (inputArray: number[], target: number): VisualizerStep[] => {
  const arr = [...inputArray].sort((a, b) => a - b);
  const steps: VisualizerStep[] = [];
  let low = 0;
  let high = arr.length - 1;

  steps.push({
    elements: arr.map(val => ({ val, state: 'default' })),
    highlights: [],
    markers: { low, high },
    explanation: `Starting Binary Search for target ${target}. Range: index ${low} to ${high}.`,
    codeLine: 0,
    status: 'idle',
  });

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    
    // Compare Step
    steps.push({
      elements: arr.map((val, idx) => {
        let state: 'default' | 'compare' | 'swap' | 'sorted' = 'default';
        if (idx === mid) state = 'compare';
        else if (idx < low || idx > high) state = 'sorted'; // Dim out discarded regions
        return { val, state };
      }),
      highlights: [mid],
      markers: { low, high, mid },
      explanation: `Calculate midpoint mid = low + (high - low) / 2 = ${mid}. Checking arr[${mid}] (${arr[mid]}).`,
      codeLine: 3,
      status: 'compare',
    });

    if (arr[mid] === target) {
      steps.push({
        elements: arr.map((val, idx) => {
          let state: 'default' | 'compare' | 'swap' | 'sorted' = 'default';
          if (idx === mid) state = 'sorted';
          return { val, state };
        }),
        highlights: [mid],
        markers: { low, high, mid },
        explanation: `Target ${target} found at index ${mid}!`,
        codeLine: 4,
        status: 'found',
      });
      return steps;
    } else if (arr[mid] < target) {
      low = mid + 1;
      steps.push({
        elements: arr.map((val, idx) => {
          let state: 'default' | 'compare' | 'swap' | 'sorted' = 'default';
          if (idx <= mid) state = 'sorted'; // Discard left half
          return { val, state };
        }),
        highlights: [],
        markers: { low, high },
        explanation: `Since arr[mid] (${arr[mid]}) < target (${target}), search right half: low = mid + 1 = ${low}.`,
        codeLine: 5,
        status: 'traversing',
      });
    } else {
      high = mid - 1;
      steps.push({
        elements: arr.map((val, idx) => {
          let state: 'default' | 'compare' | 'swap' | 'sorted' = 'default';
          if (idx >= mid) state = 'sorted'; // Discard right half
          return { val, state };
        }),
        highlights: [],
        markers: { low, high },
        explanation: `Since arr[mid] (${arr[mid]}) > target (${target}), search left half: high = mid - 1 = ${high}.`,
        codeLine: 6,
        status: 'traversing',
      });
    }
  }

  steps.push({
    elements: arr.map(val => ({ val, state: 'sorted' })),
    highlights: [],
    markers: {},
    explanation: `Target ${target} was not found in the array (low > high).`,
    codeLine: 7,
    status: 'done',
  });

  return steps;
};

// 3. MERGE SORT STEP GENERATOR
export const generateMergeSortSteps = (inputArray: number[]): VisualizerStep[] => {
  const steps: VisualizerStep[] = [];
  const arr = [...inputArray];
  const n = arr.length;

  steps.push({
    elements: arr.map(val => ({ val, state: 'default' })),
    highlights: [],
    markers: {},
    explanation: "Starting Merge Sort. We will recursively split and merge the array.",
    codeLine: 0,
    status: 'idle',
  });

  const runMergeSort = (l: number, r: number) => {
    if (l >= r) return;
    const m = Math.floor(l + (r - l) / 2);
    
    steps.push({
      elements: arr.map((val, idx) => ({ val, state: idx >= l && idx <= r ? 'compare' : 'default' })),
      highlights: [l, r],
      markers: { left: l, mid: m, right: r },
      explanation: `Dividing sub-array from index ${l} to ${r} at midpoint ${m}.`,
      codeLine: 2,
      status: 'traversing',
    });

    runMergeSort(l, m);
    runMergeSort(m + 1, r);
    merge(l, m, r);
  };

  const merge = (l: number, m: number, r: number) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = arr.slice(l, m + 1);
    const R = arr.slice(m + 1, r + 1);

    steps.push({
      elements: arr.map((val, idx) => ({ val, state: idx >= l && idx <= r ? 'compare' : 'default' })),
      highlights: [],
      markers: { left: l, mid: m, right: r },
      explanation: `Merging sorted sub-arrays: [${L.join(', ')}] and [${R.join(', ')}]`,
      codeLine: 5,
      status: 'compare',
    });

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      steps.push({
        elements: arr.map((val, idx) => ({ val, state: idx === l + i || idx === m + 1 + j ? 'compare' : 'default' })),
        highlights: [l + i, m + 1 + j],
        markers: { left: l, mid: m, right: r },
        explanation: `Comparing left element ${L[i]} and right element ${R[j]}`,
        codeLine: 5,
        status: 'compare',
      });

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        steps.push({
          elements: arr.map((val, idx) => ({ val, state: idx === k ? 'swap' : 'default' })),
          highlights: [k],
          markers: { left: l, mid: m, right: r },
          explanation: `Placing smaller element ${L[i]} at index ${k}`,
          codeLine: 5,
          status: 'swap',
        });
        i++;
      } else {
        arr[k] = R[j];
        steps.push({
          elements: arr.map((val, idx) => ({ val, state: idx === k ? 'swap' : 'default' })),
          highlights: [k],
          markers: { left: l, mid: m, right: r },
          explanation: `Placing smaller element ${R[j]} at index ${k}`,
          codeLine: 5,
          status: 'swap',
        });
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      steps.push({
        elements: arr.map((val, idx) => ({ val, state: idx === k ? 'swap' : 'default' })),
        highlights: [k],
        markers: { left: l, mid: m, right: r },
        explanation: `Copying remaining left element ${L[i]} to index ${k}`,
        codeLine: 5,
        status: 'swap',
      });
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      steps.push({
        elements: arr.map((val, idx) => ({ val, state: idx === k ? 'swap' : 'default' })),
        highlights: [k],
        markers: { left: l, mid: m, right: r },
        explanation: `Copying remaining right element ${R[j]} to index ${k}`,
        codeLine: 5,
        status: 'swap',
      });
      j++;
      k++;
    }
  };

  runMergeSort(0, n - 1);

  steps.push({
    elements: arr.map(val => ({ val, state: 'sorted' })),
    highlights: [],
    markers: {},
    explanation: "Merge Sort completed! All sub-arrays merged successfully.",
    codeLine: 5,
    status: 'done',
  });

  return steps;
};

// 4. QUICK SORT STEP GENERATOR
export const generateQuickSortSteps = (inputArray: number[]): VisualizerStep[] => {
  const steps: VisualizerStep[] = [];
  const arr = [...inputArray];
  const n = arr.length;

  steps.push({
    elements: arr.map(val => ({ val, state: 'default' })),
    highlights: [],
    markers: {},
    explanation: "Starting Quick Sort using Lomuto partitioning scheme.",
    codeLine: 0,
    status: 'idle',
  });

  const runQuickSort = (low: number, high: number) => {
    if (low < high) {
      const pIndex = partition(low, high);
      runQuickSort(low, pIndex - 1);
      runQuickSort(pIndex + 1, high);
    }
  };

  const partition = (low: number, high: number): number => {
    const pivot = arr[high];
    steps.push({
      elements: arr.map((val, idx) => {
        let state: 'default' | 'compare' | 'swap' | 'sorted' = 'default';
        if (idx === high) state = 'compare'; // Highlight pivot
        return { val, state };
      }),
      highlights: [high],
      markers: { low, high, pivotIndex: high },
      explanation: `Selected pivot value ${pivot} at index ${high}. Partitioning range [${low}, ${high}].`,
      codeLine: 2,
      status: 'traversing',
    });

    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        elements: arr.map((val, idx) => {
          let state: 'default' | 'compare' | 'swap' | 'sorted' = 'default';
          if (idx === high) state = 'compare'; // Pivot
          else if (idx === j) state = 'compare'; // Current scanning element
          return { val, state };
        }),
        highlights: [j, high],
        markers: { low, high, scan: j, boundary: i },
        explanation: `Comparing scanning value arr[${j}] (${arr[j]}) with pivot (${pivot}).`,
        codeLine: 3,
        status: 'compare',
      });

      if (arr[j] <= pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        steps.push({
          elements: arr.map((val, idx) => {
            let state: 'default' | 'compare' | 'swap' | 'sorted' = 'default';
            if (idx === i || idx === j) state = 'swap';
            return { val, state };
          }),
          highlights: [i, j],
          markers: { low, high, scan: j, boundary: i },
          explanation: `Since ${arr[i]} <= ${pivot}, increment boundary index to ${i} and swap arr[${i}] (${arr[i]}) with arr[${j}] (${arr[j]}).`,
          codeLine: 4,
          status: 'swap',
        });
      }
    }

    // Place pivot in correct position
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    steps.push({
      elements: arr.map((val, idx) => {
        let state: 'default' | 'compare' | 'swap' | 'sorted' = 'default';
        if (idx === i + 1) state = 'sorted'; // Pivot in final position
        return { val, state };
      }),
      highlights: [i + 1, high],
      markers: { low, high, finalPivotIdx: i + 1 },
      explanation: `Placing pivot ${pivot} into its correct sorted position by swapping arr[${i + 1}] (${arr[i + 1]}) with pivot arr[${high}] (${arr[high]}).`,
      codeLine: 2,
      status: 'swap',
    });

    return i + 1;
  };

  runQuickSort(0, n - 1);

  steps.push({
    elements: arr.map(val => ({ val, state: 'sorted' })),
    highlights: [],
    markers: {},
    explanation: "Quick Sort completed! All partition recursions resolved.",
    codeLine: 0,
    status: 'done',
  });

  return steps;
};
