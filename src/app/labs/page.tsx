'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3, Info, Check, Minus, Play, RefreshCw, Zap, Binary, Network,
  Plus, Trash2, HelpCircle, ArrowRight, Layers, Flame, Award, GitFork
} from 'lucide-react';

// ==========================================
// 1. DATA DEFINITIONS & TYPES
// ==========================================

interface AlgoRow {
  name: string;
  best: string;
  avg: string;
  worst: string;
  space: string;
  stable: boolean;
  notes: string;
}

const SORTING_ALGOS: AlgoRow[] = [
  { name: 'Bubble Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true, notes: 'Educational; early exit when sorted.' },
  { name: 'Merge Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: true, notes: 'Predictable; great for linked lists.' },
  { name: 'Quick Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: false, notes: 'Fast in practice; pivot choice matters.' },
  { name: 'Heap Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: false, notes: 'In-place; not cache-friendly.' },
];

const SEARCH_STRUCTURES: AlgoRow[] = [
  { name: 'Linear Search', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', space: 'O(1)', stable: true, notes: 'Works on unsorted data.' },
  { name: 'Binary Search', best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', space: 'O(1)', stable: true, notes: 'Requires sorted array.' },
  { name: 'Hash Table Lookup', best: 'O(1)', avg: 'O(1)', worst: 'O(n)', space: 'O(n)', stable: false, notes: 'Collisions degrade performance.' },
  { name: 'BST Search', best: 'O(log n)', avg: 'O(log n)', worst: 'O(n)', space: 'O(n)', stable: false, notes: 'Skewed tree → linear.' },
];

interface RaceResult {
  name: string;
  timeMs: number;
  comparisons: number;
  swaps: number;
  status: 'idle' | 'running' | 'finished';
}

interface StackFrame {
  id: string;
  name: string;
  val: number;
  depth: number;
  retVal?: number;
  parent?: string;
  calls: string[];
}

interface RecursionStep {
  type: 'push' | 'pop';
  frameId: string;
  frameName: string;
  depth: number;
  retVal?: number;
}

interface GraphNode {
  id: string;
  label: string;
}

interface GraphEdge {
  from: string;
  to: string;
}

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

// Sorting race runners
const runBubbleSort = (arr: number[]) => {
  let comparisons = 0;
  let swaps = 0;
  const a = [...arr];
  const n = a.length;
  const start = performance.now();
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      if (a[j] > a[j + 1]) {
        swaps++;
        const temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  const timeMs = performance.now() - start;
  return { timeMs, comparisons, swaps };
};

const runMergeSort = (arr: number[]) => {
  let comparisons = 0;
  let swaps = 0;
  const start = performance.now();

  const merge = (left: number[], right: number[]): number[] => {
    const result: number[] = [];
    let l = 0, r = 0;
    while (l < left.length && r < right.length) {
      comparisons++;
      if (left[l] <= right[r]) {
        result.push(left[l]);
        l++;
      } else {
        result.push(right[r]);
        r++;
      }
      swaps++;
    }
    return [...result, ...left.slice(l), ...right.slice(r)];
  };

  const sort = (a: number[]): number[] => {
    if (a.length <= 1) return a;
    const mid = Math.floor(a.length / 2);
    return merge(sort(a.slice(0, mid)), sort(a.slice(mid)));
  };

  sort([...arr]);
  const timeMs = performance.now() - start;
  return { timeMs, comparisons, swaps };
};

const runQuickSort = (arr: number[]) => {
  let comparisons = 0;
  let swaps = 0;
  const start = performance.now();

  const sort = (a: number[]): number[] => {
    if (a.length <= 1) return a;
    const pivot = a[Math.floor(a.length / 2)];
    const left: number[] = [];
    const middle: number[] = [];
    const right: number[] = [];
    for (let i = 0; i < a.length; i++) {
      comparisons++;
      if (a[i] < pivot) {
        left.push(a[i]);
      } else if (a[i] === pivot) {
        middle.push(a[i]);
      } else {
        right.push(a[i]);
      }
      swaps++;
    }
    return [...sort(left), ...middle, ...sort(right)];
  };

  sort([...arr]);
  const timeMs = performance.now() - start;
  return { timeMs, comparisons, swaps };
};

const runInsertionSort = (arr: number[]) => {
  let comparisons = 0;
  let swaps = 0;
  const a = [...arr];
  const n = a.length;
  const start = performance.now();
  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0) {
      comparisons++;
      if (a[j] > key) {
        a[j + 1] = a[j];
        swaps++;
        j--;
      } else {
        break;
      }
    }
    a[j + 1] = key;
    swaps++;
  }
  const timeMs = performance.now() - start;
  return { timeMs, comparisons, swaps };
};

// ==========================================
// 3. MAIN COMPONENT WITH TABS
// ==========================================

export default function LabsPage() {
  const [activeTab, setActiveTab] = useState<'estimator' | 'sorter' | 'recursion' | 'graph' | 'traversal' | 'bitwise'>('estimator');

  return (
    <div className="flex flex-col gap-6 py-2 w-full animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-foreground flex items-center gap-2">
          <Zap className="h-8 w-8 text-primary animate-pulse-slow" /> DSA Sandbox Labs
        </h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          An interactive laboratory playground to test, measure, and visualize algorithms, complexities, and data structures.
        </p>
      </div>

      {/* Modern Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-border/80 pb-3">
        <button
          onClick={() => setActiveTab('estimator')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'estimator'
              ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-surface/50 border border-transparent'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Complexity Estimator</span>
        </button>
        <button
          onClick={() => setActiveTab('sorter')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'sorter'
              ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-surface/50 border border-transparent'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>Sorting Performance Race</span>
        </button>
        <button
          onClick={() => setActiveTab('recursion')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'recursion'
              ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-surface/50 border border-transparent'
          }`}
        >
          <Binary className="h-4 w-4" />
          <span>Recursion Stack Trace</span>
        </button>
        <button
          onClick={() => setActiveTab('graph')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'graph'
              ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-surface/50 border border-transparent'
          }`}
        >
          <Network className="h-4 w-4" />
          <span>Graph Builder & Matrix Lab</span>
        </button>
        <button
          onClick={() => setActiveTab('traversal')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'traversal'
              ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-surface/50 border border-transparent'
          }`}
        >
          <GitFork className="h-4 w-4" />
          <span>Tree Traversals (BFS/DFS)</span>
        </button>
        <button
          onClick={() => setActiveTab('bitwise')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === 'bitwise'
              ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-surface/50 border border-transparent'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Bitwise Sandbox</span>
        </button>
      </div>

      {/* Render active lab content */}
      <div className="w-full">
        {activeTab === 'estimator' && <ComplexityEstimatorTab />}
        {activeTab === 'sorter' && <SortingRaceTab />}
        {activeTab === 'recursion' && <RecursionStackTab />}
        {activeTab === 'graph' && <GraphMatrixTab />}
        {activeTab === 'traversal' && <TreeTraversalTab />}
        {activeTab === 'bitwise' && <BitwiseLabTab />}
      </div>
    </div>
  );
}

// ==========================================
// 4. COMPLEXITY ESTIMATOR TAB
// ==========================================

function ComplexityEstimatorTab() {
  const [n, setN] = useState(1000);

  const formatEst = (ops: number) => {
    if (ops === Infinity || isNaN(ops)) return 'N/A';
    if (ops < 1) return '< 1';
    return ops.toLocaleString();
  };

  const getEstTime = (ops: number) => {
    const clockSpeed = 1000000000; // 1 Billion operations per second
    const sec = ops / clockSpeed;
    if (sec < 0.000001) return '< 1 μs';
    if (sec < 0.001) return `${(sec * 1000000).toFixed(1)} μs`;
    if (sec < 1) return `${(sec * 1000).toFixed(1)} ms`;
    if (sec < 60) return `${sec.toFixed(2)} seconds`;
    const min = sec / 60;
    if (min < 60) return `${min.toFixed(1)} minutes`;
    const hr = min / 60;
    if (hr < 24) return `${hr.toFixed(1)} hours`;
    const days = hr / 24;
    return `${days.toFixed(1)} days`;
  };

  const logN = Math.round(Math.log2(n));
  const nLogN = Math.round(n * Math.log2(n));
  const nSquare = n * n;
  const twoPowerN = n <= 50 ? Math.pow(2, n) : Infinity;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="modern-card p-6 flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Input Size (n)</label>
          <input
            type="range"
            min={10}
            max={100000}
            step={10}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full mt-3 accent-primary cursor-pointer"
          />
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-foreground font-mono">{n.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">elements</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto shrink-0">
          <div className="surface p-4 rounded-2xl border border-border/80">
            <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">O(log n)</span>
            <span className="text-xl font-black text-complete font-mono">{formatEst(logN)}</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">{getEstTime(logN)}</span>
          </div>
          <div className="surface p-4 rounded-2xl border border-border/80">
            <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">O(n)</span>
            <span className="text-xl font-black text-foreground font-mono">{formatEst(n)}</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">{getEstTime(n)}</span>
          </div>
          <div className="surface p-4 rounded-2xl border border-border/80">
            <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">O(n log n)</span>
            <span className="text-xl font-black text-primary font-mono">{formatEst(nLogN)}</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">{getEstTime(nLogN)}</span>
          </div>
          <div className="surface p-4 rounded-2xl border border-border/80">
            <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">O(n²)</span>
            <span className="text-xl font-black text-hard font-mono">{formatEst(nSquare)}</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">{getEstTime(nSquare)}</span>
          </div>
          <div className="surface p-4 rounded-2xl border border-border/80 col-span-1 sm:col-span-2">
            <span className="text-muted-foreground block text-[10px] font-bold uppercase tracking-wider">O(2ⁿ) (Exponential)</span>
            <span className="text-xl font-black text-red-500 font-mono truncate max-w-[150px] block">
              {twoPowerN === Infinity ? 'Infinity' : formatEst(twoPowerN)}
            </span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">
              {twoPowerN === Infinity ? '10³⁰+ years' : getEstTime(twoPowerN)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex gap-3 text-xs text-muted-foreground">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p>
          <strong>Estimated time</strong> assumes a CPU doing 1 billion basic operations per second. Real-world execution speeds vary heavily depending on browser JavaScript compilers, recursion stack overflows, and spatial cache locality.
        </p>
      </div>

      <ComplexityTable rows={SORTING_ALGOS} title="Sorting Algorithms Complexity Reference" />
      <ComplexityTable rows={SEARCH_STRUCTURES} title="Search & Data Structures Complexity Reference" />
    </div>
  );
}

function ComplexityTable({ rows, title }: { rows: AlgoRow[]; title: string }) {
  return (
    <div className="modern-card overflow-hidden border border-border/80">
      <div className="px-5 py-4 border-b border-border bg-muted/20">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" /> {title}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-muted-foreground border-b border-border bg-surface/30">
              <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Algorithm</th>
              <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Best</th>
              <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Average</th>
              <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Worst</th>
              <th className="p-4 font-bold uppercase tracking-wider text-[10px]">Space</th>
              <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-center">Stable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((row) => (
              <tr key={row.name} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <span className="font-bold text-foreground text-sm block">{row.name}</span>
                  <span className="text-[10.5px] text-muted-foreground mt-0.5 block">{row.notes}</span>
                </td>
                <td className="p-4 font-mono text-complete font-bold">{row.best}</td>
                <td className="p-4 font-mono text-primary font-bold">{row.avg}</td>
                <td className="p-4 font-mono text-hard font-bold">{row.worst}</td>
                <td className="p-4 font-mono font-medium text-foreground/80">{row.space}</td>
                <td className="p-4 align-middle">
                  <div className="flex justify-center">
                    {row.stable ? (
                      <Check className="h-4 w-4 text-complete fill-complete/10" aria-label="Stable" />
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground/60" aria-label="Not stable" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 5. SORTING PERFORMANCE RACE TAB
// ==========================================

function SortingRaceTab() {
  const [arraySize, setArraySize] = useState<100 | 500 | 1000 | 2500>(500);
  const [arrayType, setArrayType] = useState<'random' | 'sorted' | 'reversed'>('random');
  const [racing, setRacing] = useState(false);
  const [results, setResults] = useState<RaceResult[]>([
    { name: 'Bubble Sort', timeMs: 0, comparisons: 0, swaps: 0, status: 'idle' },
    { name: 'Insertion Sort', timeMs: 0, comparisons: 0, swaps: 0, status: 'idle' },
    { name: 'Merge Sort', timeMs: 0, comparisons: 0, swaps: 0, status: 'idle' },
    { name: 'Quick Sort', timeMs: 0, comparisons: 0, swaps: 0, status: 'idle' },
  ]);

  const generateArray = () => {
    const arr = Array.from({ length: arraySize }, (_, idx) => idx + 1);
    if (arrayType === 'random') {
      // Shuffle array
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    } else if (arrayType === 'reversed') {
      arr.reverse();
    }
    return arr;
  };

  const handleStartRace = () => {
    setRacing(true);
    const testArray = generateArray();

    // Reset status to running
    setResults(prev => prev.map(r => ({ ...r, status: 'running' })));

    // Use setTimeout so the UI thread doesn't completely block and registers the loading animation
    setTimeout(() => {
      // 1. Bubble
      const bRes = runBubbleSort(testArray);
      // 2. Insertion
      const iRes = runInsertionSort(testArray);
      // 3. Merge
      const mRes = runMergeSort(testArray);
      // 4. Quick
      const qRes = runQuickSort(testArray);

      setResults([
        { name: 'Bubble Sort', timeMs: bRes.timeMs, comparisons: bRes.comparisons, swaps: bRes.swaps, status: 'finished' },
        { name: 'Insertion Sort', timeMs: iRes.timeMs, comparisons: iRes.comparisons, swaps: iRes.swaps, status: 'finished' },
        { name: 'Merge Sort', timeMs: mRes.timeMs, comparisons: mRes.comparisons, swaps: mRes.swaps, status: 'finished' },
        { name: 'Quick Sort', timeMs: qRes.timeMs, comparisons: qRes.comparisons, swaps: qRes.swaps, status: 'finished' },
      ]);
      setRacing(false);
    }, 100);
  };

  const maxTime = Math.max(...results.map(r => r.timeMs), 0.001);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="modern-card p-5 border border-border/80 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Array Size</label>
            <select
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value) as any)}
              disabled={racing}
              className="mt-1 bg-surface border border-border text-xs rounded-lg p-2 font-semibold text-foreground focus:outline-none cursor-pointer"
            >
              <option value={100}>100 Elements</option>
              <option value={500}>500 Elements</option>
              <option value={1000}>1,000 Elements</option>
              <option value={2500}>2,500 Elements</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Array Distribution</label>
            <select
              value={arrayType}
              onChange={(e) => setArrayType(e.target.value as any)}
              disabled={racing}
              className="mt-1 bg-surface border border-border text-xs rounded-lg p-2 font-semibold text-foreground focus:outline-none cursor-pointer"
            >
              <option value="random">Randomly Shuffled</option>
              <option value="sorted">Already Sorted</option>
              <option value="reversed">Reverse Sorted</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleStartRace}
          disabled={racing}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl text-white shadow-lg btn-primary hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shrink-0 disabled:opacity-60"
        >
          {racing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Racing Algorithms...</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-white" />
              <span>Start Performance Race</span>
            </>
          )}
        </button>
      </div>

      <div className="modern-card p-6 border border-border/80 flex flex-col gap-6">
        <h3 className="text-sm font-bold text-foreground">Race Track Progress & Results</h3>

        <div className="flex flex-col gap-5">
          {results.map((item) => {
            const ratio = item.status === 'finished' ? (item.timeMs / maxTime) * 100 : 0;
            const isWinner = item.status === 'finished' && item.timeMs === Math.min(...results.filter(r => r.status === 'finished').map(r => r.timeMs));

            return (
              <div key={item.name} className="flex flex-col gap-1.5 p-3 rounded-xl bg-surface/30 border border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{item.name}</span>
                    {isWinner && (
                      <span className="text-[9px] font-black tracking-widest text-complete bg-complete/15 px-1.5 py-0.5 rounded-md flex items-center gap-1 uppercase">
                        <Award className="h-3 w-3" /> Winner
                      </span>
                    )}
                  </div>
                  {item.status === 'running' ? (
                    <span className="text-[10px] text-primary animate-pulse font-semibold">Executing...</span>
                  ) : item.status === 'finished' ? (
                    <span className="font-mono font-bold text-foreground">{item.timeMs.toFixed(2)} ms</span>
                  ) : (
                    <span className="text-muted-foreground text-[10px]">Ready</span>
                  )}
                </div>

                {/* Progress bar representing speed */}
                <div className="w-full h-3 bg-surface rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      isWinner ? 'bg-gradient-to-r from-complete to-emerald-400' : 'bg-gradient-to-r from-primary to-accent'
                    }`}
                    style={{ width: item.status === 'finished' ? `${Math.max(ratio, 4)}%` : '0%' }}
                  />
                </div>

                {item.status === 'finished' && (
                  <div className="flex gap-4 text-[10.5px] text-muted-foreground font-mono mt-1">
                    <span>Comparisons: <strong className="text-foreground">{item.comparisons.toLocaleString()}</strong></span>
                    <span>Swaps/Writes: <strong className="text-foreground">{item.swaps.toLocaleString()}</strong></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. RECURSION STACK TRACE TAB
// ==========================================

function RecursionStackTab() {
  const [recValue, setRecValue] = useState<number>(6);
  const [recType, setRecType] = useState<'fib' | 'fact'>('fib');
  const [running, setRunning] = useState(false);
  const [frames, setFrames] = useState<StackFrame[]>([]);
  const [steps, setSteps] = useState<RecursionStep[]>([]);
  const [peakDepth, setPeakDepth] = useState(0);
  const [totalCalls, setTotalCalls] = useState(0);
  const [stepIdx, setStepIdx] = useState<number>(-1);

  const calculateTrace = () => {
    setRunning(true);
    setStepIdx(-1);

    setTimeout(() => {
      const traceFrames: StackFrame[] = [];
      const traceSteps: RecursionStep[] = [];
      let idCounter = 0;
      let depthCounter = 0;
      let callsCounter = 0;

      if (recType === 'fib') {
        const fib = (val: number, depth: number, parentId?: string): number => {
          callsCounter++;
          depthCounter = Math.max(depthCounter, depth);
          const myId = `fib-${idCounter++}`;
          const frame: StackFrame = {
            id: myId,
            name: `fib(${val})`,
            val,
            depth,
            calls: [],
            parent: parentId,
          };
          traceFrames.push(frame);
          traceSteps.push({ type: 'push', frameId: myId, frameName: `fib(${val})`, depth });

          if (parentId) {
            const parent = traceFrames.find(f => f.id === parentId);
            if (parent) parent.calls.push(myId);
          }

          if (val <= 1) {
            frame.retVal = val;
            traceSteps.push({ type: 'pop', frameId: myId, frameName: `fib(${val})`, depth, retVal: val });
            return val;
          }

          const left = fib(val - 1, depth + 1, myId);
          const right = fib(val - 2, depth + 1, myId);
          const res = left + right;
          frame.retVal = res;
          traceSteps.push({ type: 'pop', frameId: myId, frameName: `fib(${val})`, depth, retVal: res });
          return res;
        };

        fib(recValue, 0);
      } else {
        const fact = (val: number, depth: number, parentId?: string): number => {
          callsCounter++;
          depthCounter = Math.max(depthCounter, depth);
          const myId = `fact-${idCounter++}`;
          const frame: StackFrame = {
            id: myId,
            name: `fact(${val})`,
            val,
            depth,
            calls: [],
            parent: parentId,
          };
          traceFrames.push(frame);
          traceSteps.push({ type: 'push', frameId: myId, frameName: `fact(${val})`, depth });

          if (parentId) {
            const parent = traceFrames.find(f => f.id === parentId);
            if (parent) parent.calls.push(myId);
          }

          if (val <= 1) {
            frame.retVal = 1;
            traceSteps.push({ type: 'pop', frameId: myId, frameName: `fact(${val})`, depth, retVal: 1 });
            return 1;
          }

          const sub = fact(val - 1, depth + 1, myId);
          const res = val * sub;
          frame.retVal = res;
          traceSteps.push({ type: 'pop', frameId: myId, frameName: `fact(${val})`, depth, retVal: res });
          return res;
        };

        fact(recValue, 0);
      }

      setFrames(traceFrames);
      setSteps(traceSteps);
      setPeakDepth(depthCounter);
      setTotalCalls(callsCounter);
      setStepIdx(traceSteps.length - 1); // Start at fully evaluated tree
      setRunning(false);
    }, 50);
  };

  useEffect(() => {
    calculateTrace();
  }, [recValue, recType]);

  // Determine active stack frame IDs at the current step index
  const getActiveFrames = () => {
    if (stepIdx < 0) return new Set<string>();
    const active = new Set<string>();
    for (let i = 0; i <= stepIdx; i++) {
      const step = steps[i];
      if (step.type === 'push') {
        active.add(step.frameId);
      } else {
        // Keeps frame visible but marks as evaluated if popped
      }
    }
    return active;
  };

  // Stack of active frames currently on the recursion call stack
  const getLiveCallStack = () => {
    const stack: string[] = [];
    for (let i = 0; i <= stepIdx; i++) {
      const step = steps[i];
      if (step.type === 'push') {
        stack.push(step.frameName);
      } else {
        stack.pop();
      }
    }
    return stack;
  };

  const activeFrames = getActiveFrames();
  const liveStack = getLiveCallStack();

  // Recursive renderer for the tree hierarchy
  const renderTreeNode = (nodeId: string) => {
    const frame = frames.find(f => f.id === nodeId);
    if (!frame) return null;

    const isVisible = activeFrames.has(nodeId);
    const isPopped = steps.slice(0, stepIdx + 1).some(s => s.type === 'pop' && s.frameId === nodeId);

    if (!isVisible) return null;

    return (
      <div key={nodeId} className="flex flex-col items-center select-none animate-scale-in">
        <div
          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold font-mono flex flex-col items-center gap-0.5 transition-all duration-300 ${
            isPopped
              ? 'bg-complete/15 border-complete/30 text-complete'
              : 'bg-primary/10 border-primary/30 text-primary animate-pulse'
          }`}
        >
          <span>{frame.name}</span>
          {isPopped && <span className="text-[10px] text-muted-foreground/80">→ {frame.retVal}</span>}
        </div>

        {frame.calls.length > 0 && (
          <div className="flex gap-4 mt-4 relative">
            {/* Draw connectors if nodes exist */}
            <div className="absolute top-0 left-1/2 -translate-y-4 w-[85%] h-4 border-t border-border -translate-x-1/2" />
            {frame.calls.map(cId => renderTreeNode(cId))}
          </div>
        )}
      </div>
    );
  };

  const rootFrame = frames.find(f => f.depth === 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Control panel & Stack panel */}
      <div className="flex flex-col gap-6 lg:col-span-1">
        <div className="modern-card p-5 border border-border/80 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <Binary className="h-4 w-4 text-primary" /> Recursion Settings
          </h3>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Function Type</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => { setRecType('fib'); setRecValue(6); }}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    recType === 'fib' ? 'bg-primary/15 border-primary/30 text-primary' : 'border-border text-muted-foreground hover:bg-surface'
                  }`}
                >
                  Fibonacci F(n)
                </button>
                <button
                  onClick={() => { setRecType('fact'); setRecValue(8); }}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    recType === 'fact' ? 'bg-primary/15 border-primary/30 text-primary' : 'border-border text-muted-foreground hover:bg-surface'
                  }`}
                >
                  Factorial N!
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Value (n)</label>
              <input
                type="number"
                min={0}
                max={recType === 'fib' ? 12 : 12}
                value={recValue}
                onChange={(e) => setRecValue(Math.max(0, Math.min(12, Number(e.target.value))))}
                className="w-full mt-1.5 bg-surface border border-border rounded-lg p-2 text-xs font-semibold font-mono text-foreground focus:outline-none focus:border-primary"
              />
              <span className="text-[10px] text-muted-foreground mt-1 block">Maximum n: 12 (Safe range to prevent UI lag)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-xs border-t border-border pt-4">
            <div className="surface p-2.5 rounded-lg">
              <span className="text-muted-foreground block text-[9px] uppercase tracking-wider">Total Calls</span>
              <span className="font-bold text-foreground text-sm">{totalCalls}</span>
            </div>
            <div className="surface p-2.5 rounded-lg">
              <span className="text-muted-foreground block text-[9px] uppercase tracking-wider">Peak Stack</span>
              <span className="font-bold text-foreground text-sm">{peakDepth + 1}</span>
            </div>
          </div>
        </div>

        {/* Live Call Stack Trace */}
        <div className="modern-card p-5 border border-border/80 flex flex-col gap-3 flex-1 min-h-[250px]">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground">Active Call Stack Trace</h3>
          <div className="flex flex-col-reverse gap-1.5 flex-1 overflow-y-auto mt-2 font-mono max-h-[300px]">
            {liveStack.length === 0 ? (
              <span className="text-xs text-muted-foreground/60 italic text-center py-6 block">Call stack is empty</span>
            ) : (
              liveStack.map((name, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs font-bold text-primary flex items-center justify-between"
                >
                  <span>{name}</span>
                  <span className="text-[9px] uppercase bg-primary/20 text-primary-foreground/90 px-1.5 py-0.5 rounded">Frame {idx}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Tree Visualization Container */}
      <div className="modern-card p-6 border border-border/80 lg:col-span-2 flex flex-col min-h-[450px]">
        <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">Interactive Call Hierarchy</h3>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStepIdx(prev => Math.max(-1, prev - 1))}
              disabled={stepIdx < 0}
              className="px-2 py-1 text-[11px] font-bold bg-surface border border-border rounded hover:bg-surface-hover transition disabled:opacity-50 cursor-pointer"
            >
              Prev Step
            </button>
            <button
              onClick={() => setStepIdx(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={stepIdx >= steps.length - 1}
              className="px-2 py-1 text-[11px] font-bold bg-surface border border-border rounded hover:bg-surface-hover transition disabled:opacity-50 cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Outer scrolling playground */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-surface/10 rounded-2xl border border-border/40">
          <div className="min-w-max flex flex-col items-center">
            {rootFrame && renderTreeNode(rootFrame.id)}
          </div>
        </div>

        <div className="text-[10px] text-muted-foreground mt-3 flex justify-between">
          <span>Step {stepIdx + 1} of {steps.length}</span>
          <span>Popped nodes show computed return value</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. GRAPH BUILDER & MATRIX LAB TAB
// ==========================================

function GraphMatrixTab() {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 'A', label: 'A' },
    { id: 'B', label: 'B' },
    { id: 'C', label: 'C' },
    { id: 'D', label: 'D' },
  ]);
  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'C', to: 'D' },
    { from: 'D', to: 'A' },
  ]);

  const [fromNode, setFromNode] = useState('A');
  const [toNode, setToNode] = useState('B');

  const addNode = () => {
    const nextChar = String.fromCharCode(65 + nodes.length);
    if (nodes.length >= 8) return;
    const newNode = { id: nextChar, label: nextChar };
    setNodes([...nodes, newNode]);
    if (nodes.length > 0) {
      setFromNode(nodes[0].id);
      setToNode(newNode.id);
    }
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
    setEdges(edges.filter(e => e.from !== id && e.to !== id));
  };

  const addEdge = () => {
    if (fromNode === toNode) return;
    const exists = edges.some(e => (e.from === fromNode && e.to === toNode) || (e.from === toNode && e.to === fromNode));
    if (exists) return;

    setEdges([...edges, { from: fromNode, to: toNode }]);
  };

  const removeEdge = (idx: number) => {
    setEdges(edges.filter((_, i) => i !== idx));
  };

  const loadPreset = (type: 'tree' | 'clique' | 'cycle' | 'star') => {
    if (type === 'tree') {
      setNodes([
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
        { id: 'D', label: 'D' },
        { id: 'E', label: 'E' },
      ]);
      setEdges([
        { from: 'A', to: 'B' },
        { from: 'A', to: 'C' },
        { from: 'B', to: 'D' },
        { from: 'B', to: 'E' },
      ]);
    } else if (type === 'clique') {
      setNodes([
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
        { id: 'D', label: 'D' },
      ]);
      setEdges([
        { from: 'A', to: 'B' },
        { from: 'A', to: 'C' },
        { from: 'A', to: 'D' },
        { from: 'B', to: 'C' },
        { from: 'B', to: 'D' },
        { from: 'C', to: 'D' },
      ]);
    } else if (type === 'cycle') {
      setNodes([
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
        { id: 'D', label: 'D' },
        { id: 'E', label: 'E' },
      ]);
      setEdges([
        { from: 'A', to: 'B' },
        { from: 'B', to: 'C' },
        { from: 'C', to: 'D' },
        { from: 'D', to: 'E' },
        { from: 'E', to: 'A' },
      ]);
    } else if (type === 'star') {
      setNodes([
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
        { id: 'D', label: 'D' },
        { id: 'E', label: 'E' },
      ]);
      setEdges([
        { from: 'A', to: 'B' },
        { from: 'A', to: 'C' },
        { from: 'A', to: 'D' },
        { from: 'A', to: 'E' },
      ]);
    }
  };

  const getAdjacencyList = () => {
    const list: Record<string, string[]> = {};
    nodes.forEach(n => {
      list[n.id] = [];
    });
    edges.forEach(e => {
      if (list[e.from]) list[e.from].push(e.to);
      if (list[e.to]) list[e.to].push(e.from);
    });
    return list;
  };

  const adjList = getAdjacencyList();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Sidebar Controls */}
      <div className="flex flex-col gap-6 lg:col-span-1">
        <div className="modern-card p-5 border border-border/80 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-foreground">Graph Presets</h3>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button onClick={() => loadPreset('cycle')} className="px-3 py-2 bg-surface hover:bg-surface-hover rounded-xl border border-border text-foreground cursor-pointer">
              5-Node Cycle
            </button>
            <button onClick={() => loadPreset('tree')} className="px-3 py-2 bg-surface hover:bg-surface-hover rounded-xl border border-border text-foreground cursor-pointer">
              Binary Tree
            </button>
            <button onClick={() => loadPreset('clique')} className="px-3 py-2 bg-surface hover:bg-surface-hover rounded-xl border border-border text-foreground cursor-pointer">
              K4 Clique
            </button>
            <button onClick={() => loadPreset('star')} className="px-3 py-2 bg-surface hover:bg-surface-hover rounded-xl border border-border text-foreground cursor-pointer">
              Star Graph
            </button>
          </div>
        </div>

        <div className="modern-card p-5 border border-border/80 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">Vertices</h3>
            <button
              onClick={addNode}
              disabled={nodes.length >= 8}
              className="text-[10px] font-bold bg-primary text-white hover:bg-primary/95 transition px-2 py-1 rounded flex items-center gap-1 disabled:opacity-50 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Add Vertex
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {nodes.map(n => (
              <div key={n.id} className="surface px-2.5 py-1 rounded-lg border border-border/80 flex items-center gap-2 text-xs font-semibold font-mono">
                <span>{n.label}</span>
                <button
                  onClick={() => removeNode(n.id)}
                  disabled={nodes.length <= 2}
                  className="text-muted-foreground hover:text-hard transition cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <hr className="border-border/60" />

          <h3 className="text-sm font-bold text-foreground">Add Edge (Undirected)</h3>
          <div className="flex gap-2 items-center">
            <select
              value={fromNode}
              onChange={(e) => setFromNode(e.target.value)}
              className="bg-surface border border-border text-xs rounded-lg p-2 font-semibold text-foreground focus:outline-none cursor-pointer flex-1"
            >
              {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
            </select>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={toNode}
              onChange={(e) => setToNode(e.target.value)}
              className="bg-surface border border-border text-xs rounded-lg p-2 font-semibold text-foreground focus:outline-none cursor-pointer flex-1"
            >
              {nodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
            </select>
            <button
              onClick={addEdge}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="modern-card p-6 border border-border/80 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-foreground">Adjacency Matrix Representation</h3>

          <div className="overflow-x-auto mt-2">
            <table className="border-collapse mx-auto font-mono text-sm">
              <thead>
                <tr>
                  <th className="p-2.5 text-muted-foreground w-10"></th>
                  {nodes.map(n => (
                    <th key={n.id} className="p-2.5 text-foreground font-bold w-10 text-center border-b border-border/80">
                      {n.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nodes.map(rowNode => (
                  <tr key={rowNode.id}>
                    <td className="p-2.5 text-foreground font-bold border-r border-border/80 text-right w-10 pr-4">
                      {rowNode.label}
                    </td>
                    {nodes.map(colNode => {
                      const isConnected = edges.some(e =>
                        (e.from === rowNode.id && e.to === colNode.id) ||
                        (e.from === colNode.id && e.to === rowNode.id)
                      );
                      return (
                        <td
                          key={colNode.id}
                          className={`p-2.5 text-center w-10 border border-border/40 font-bold transition-colors ${
                            isConnected ? 'bg-primary/10 text-primary border-primary/25' : 'text-muted-foreground/45'
                          }`}
                        >
                          {isConnected ? 1 : 0}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="modern-card p-6 border border-border/80 flex flex-col gap-4 flex-1">
          <h3 className="text-sm font-bold text-foreground">Adjacency List Representation</h3>

          <div className="flex flex-col gap-3 mt-2 font-mono text-xs max-h-[300px] overflow-y-auto">
            {nodes.map(n => {
              const neighbors = adjList[n.id] || [];
              return (
                <div key={n.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-surface/30 border border-border/50">
                  <span className="w-10 h-7 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-primary text-sm">
                    {n.label}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2 items-center flex-1">
                    {neighbors.length === 0 ? (
                      <span className="text-muted-foreground/50 italic text-[11px]">No connections</span>
                    ) : (
                      neighbors.map((neighbor, idx) => (
                        <React.Fragment key={neighbor}>
                          <span className="px-2.5 py-1 bg-surface border border-border/80 text-foreground font-semibold rounded-md">
                            {neighbor}
                          </span>
                          {idx < neighbors.length - 1 && <span className="text-muted-foreground/40">/</span>}
                        </React.Fragment>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. TREE TRAVERSALS LAB (BFS vs DFS)
// ==========================================

interface TraversalStep {
  visited: string;
  dataStructure: string[];
  queueStack: string[];
  output: string[];
}

function NodeItem({ value, id, activeVal, visitedVals }: { value: string; id: string; activeVal: string | null; visitedVals: Set<string> }) {
  const isVisited = visitedVals.has(id);
  const isActive = activeVal === id;

  return (
    <div
      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
        isActive
          ? 'bg-primary text-white border-primary shadow-glow scale-110 animate-pulse-slow'
          : isVisited
          ? 'bg-complete/15 border-complete text-complete'
          : 'bg-surface border-border text-muted-foreground'
      }`}
    >
      {value}
    </div>
  );
}

function TreeTraversalTab() {
  const [traversalType, setTraversalType] = useState<'pre' | 'in' | 'post' | 'bfs'>('bfs');
  const [step, setStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const getTraversalSteps = (): TraversalStep[] => {
    if (traversalType === 'bfs') {
      return [
        { visited: 'A', dataStructure: ['A'], queueStack: ['B', 'C'], output: ['A'] },
        { visited: 'B', dataStructure: ['B', 'C'], queueStack: ['C', 'D', 'E'], output: ['A', 'B'] },
        { visited: 'C', dataStructure: ['C', 'D', 'E'], queueStack: ['D', 'E', 'F', 'G'], output: ['A', 'B', 'C'] },
        { visited: 'D', dataStructure: ['D', 'E', 'F', 'G'], queueStack: ['E', 'F', 'G'], output: ['A', 'B', 'C', 'D'] },
        { visited: 'E', dataStructure: ['E', 'F', 'G'], queueStack: ['F', 'G'], output: ['A', 'B', 'C', 'D', 'E'] },
        { visited: 'F', dataStructure: ['F', 'G'], queueStack: ['G'], output: ['A', 'B', 'C', 'D', 'E', 'F'] },
        { visited: 'G', dataStructure: ['G'], queueStack: [], output: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
      ];
    } else if (traversalType === 'pre') {
      return [
        { visited: 'A', dataStructure: ['A'], queueStack: ['C', 'B'], output: ['A'] },
        { visited: 'B', dataStructure: ['B', 'C'], queueStack: ['C', 'E', 'D'], output: ['A', 'B'] },
        { visited: 'D', dataStructure: ['D', 'E', 'C'], queueStack: ['C', 'E'], output: ['A', 'B', 'D'] },
        { visited: 'E', dataStructure: ['E', 'C'], queueStack: ['C'], output: ['A', 'B', 'D', 'E'] },
        { visited: 'C', dataStructure: ['C'], queueStack: ['G', 'F'], output: ['A', 'B', 'D', 'E', 'C'] },
        { visited: 'F', dataStructure: ['F', 'G'], queueStack: ['G'], output: ['A', 'B', 'D', 'E', 'C', 'F'] },
        { visited: 'G', dataStructure: ['G'], queueStack: [], output: ['A', 'B', 'D', 'E', 'C', 'F', 'G'] },
      ];
    } else if (traversalType === 'in') {
      return [
        { visited: 'D', dataStructure: ['A', 'B', 'D'], queueStack: ['A', 'B'], output: ['D'] },
        { visited: 'B', dataStructure: ['A', 'B'], queueStack: ['A', 'E'], output: ['D', 'B'] },
        { visited: 'E', dataStructure: ['A', 'E'], queueStack: ['A'], output: ['D', 'B', 'E'] },
        { visited: 'A', dataStructure: ['A'], queueStack: ['C', 'F'], output: ['D', 'B', 'E', 'A'] },
        { visited: 'F', dataStructure: ['C', 'F'], queueStack: ['C'], output: ['D', 'B', 'E', 'A', 'F'] },
        { visited: 'C', dataStructure: ['C'], queueStack: ['G'], output: ['D', 'B', 'E', 'A', 'F', 'C'] },
        { visited: 'G', dataStructure: ['G'], queueStack: [], output: ['D', 'B', 'E', 'A', 'F', 'C', 'G'] },
      ];
    } else {
      return [
        { visited: 'D', dataStructure: ['A', 'B', 'D'], queueStack: ['A', 'B'], output: ['D'] },
        { visited: 'E', dataStructure: ['A', 'B', 'E'], queueStack: ['A', 'B'], output: ['D', 'E'] },
        { visited: 'B', dataStructure: ['A', 'B'], queueStack: ['A'], output: ['D', 'E', 'B'] },
        { visited: 'F', dataStructure: ['A', 'C', 'F'], queueStack: ['A', 'C'], output: ['D', 'E', 'B', 'F'] },
        { visited: 'G', dataStructure: ['A', 'C', 'G'], queueStack: ['A', 'C'], output: ['D', 'E', 'B', 'F', 'G'] },
        { visited: 'C', dataStructure: ['A', 'C'], queueStack: ['A'], output: ['D', 'E', 'B', 'F', 'G', 'C'] },
        { visited: 'A', dataStructure: ['A'], queueStack: [], output: ['D', 'E', 'B', 'F', 'G', 'C', 'A'] },
      ];
    }
  };

  const stepsList = getTraversalSteps();

  useEffect(() => {
    setStep(-1);
    setIsPlaying(false);
  }, [traversalType]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep(prev => {
          if (prev >= stepsList.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, stepsList]);

  const activeNode = step >= 0 ? stepsList[step].visited : null;
  const visitedNodes = new Set(step >= 0 ? stepsList[step].output : []);
  const activeDS = step >= 0 ? stepsList[step].dataStructure : [];
  const activeQueueStack = step >= 0 ? stepsList[step].queueStack : [];
  const currentOutput = step >= 0 ? stepsList[step].output : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Control panel */}
      <div className="flex flex-col gap-6 lg:col-span-1">
        <div className="modern-card p-5 border border-border/80 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-foreground">Select Traversal</h3>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => setTraversalType('bfs')}
              className={`px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
                traversalType === 'bfs' ? 'bg-primary/15 border-primary/30 text-primary' : 'border-border text-muted-foreground hover:bg-surface'
              }`}
            >
              BFS (Level-Order)
            </button>
            <button
              onClick={() => setTraversalType('pre')}
              className={`px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
                traversalType === 'pre' ? 'bg-primary/15 border-primary/30 text-primary' : 'border-border text-muted-foreground hover:bg-surface'
              }`}
            >
              DFS (Pre-Order)
            </button>
            <button
              onClick={() => setTraversalType('in')}
              className={`px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
                traversalType === 'in' ? 'bg-primary/15 border-primary/30 text-primary' : 'border-border text-muted-foreground hover:bg-surface'
              }`}
            >
              DFS (In-Order)
            </button>
            <button
              onClick={() => setTraversalType('post')}
              className={`px-3 py-2.5 rounded-lg border transition-all cursor-pointer ${
                traversalType === 'post' ? 'bg-primary/15 border-primary/30 text-primary' : 'border-border text-muted-foreground hover:bg-surface'
              }`}
            >
              DFS (Post-Order)
            </button>
          </div>

          <div className="flex items-center gap-2 border-t border-border pt-4 mt-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 px-3 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition cursor-pointer text-center"
            >
              {isPlaying ? 'Pause Auto' : 'Play Traversal'}
            </button>
            <button
              onClick={() => { setStep(-1); setIsPlaying(false); }}
              className="px-3 py-2 bg-surface text-foreground border border-border text-xs font-bold rounded-lg hover:bg-surface-hover transition cursor-pointer"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold mt-1">
            <button
              onClick={() => { setIsPlaying(false); setStep(prev => Math.max(-1, prev - 1)); }}
              disabled={step < 0}
              className="px-2 py-1 bg-surface border border-border rounded disabled:opacity-50 cursor-pointer"
            >
              Step Back
            </button>
            <span className="text-muted-foreground font-mono">Step {step + 1} of {stepsList.length}</span>
            <button
              onClick={() => { setIsPlaying(false); setStep(prev => Math.min(stepsList.length - 1, prev + 1)); }}
              disabled={step >= stepsList.length - 1}
              className="px-2 py-1 bg-surface border border-border rounded disabled:opacity-50 cursor-pointer"
            >
              Step Forward
            </button>
          </div>
        </div>

        {/* Data Structure debugger */}
        <div className="modern-card p-5 border border-border/80 flex flex-col gap-3 flex-1">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider text-muted-foreground">
            {traversalType === 'bfs' ? 'FIFO Queue Status' : 'LIFO Stack Status'}
          </h3>
          <div className="flex flex-col gap-1.5 font-mono text-xs mt-2 max-h-[200px] overflow-y-auto">
            {step < 0 ? (
              <span className="text-xs text-muted-foreground/60 italic text-center py-6 block">Traversing not started</span>
            ) : (
              <div className="flex flex-col gap-3">
                <div>
                  <span className="text-[10px] text-muted-foreground block mb-1">CURRENTLY PROCESSING:</span>
                  <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/25 text-primary font-bold">
                    Node {activeNode}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block mb-1">UPCOMING IN {traversalType === 'bfs' ? 'QUEUE' : 'STACK'}:</span>
                  <div className="flex gap-1.5">
                    {activeQueueStack.length === 0 ? (
                      <span className="text-muted-foreground/50 italic text-[11px]">Empty</span>
                    ) : (
                      activeQueueStack.map((name, idx) => (
                        <span key={idx} className="px-2 py-1 rounded bg-surface border border-border text-foreground font-bold">
                          {name}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="modern-card p-6 border border-border/80 lg:col-span-2 flex flex-col min-h-[450px]">
        <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-3 mb-4">Binary Tree Hierarchy</h3>

        <div className="flex-1 flex items-center justify-center p-6 bg-surface/10 rounded-2xl border border-border/40 relative overflow-hidden">
          <div className="relative w-80 h-48 mx-auto flex justify-center mt-2">
            {/* Root Node A */}
            <div className="absolute top-0 left-[140px]">
              <NodeItem value="A" id="A" activeVal={activeNode} visitedVals={visitedNodes} />
            </div>
            {/* Node B */}
            <div className="absolute top-16 left-[50px]">
              <NodeItem value="B" id="B" activeVal={activeNode} visitedVals={visitedNodes} />
            </div>
            {/* Node C */}
            <div className="absolute top-16 left-[230px]">
              <NodeItem value="C" id="C" activeVal={activeNode} visitedVals={visitedNodes} />
            </div>
            {/* Node D */}
            <div className="absolute top-32 left-[10px]">
              <NodeItem value="D" id="D" activeVal={activeNode} visitedVals={visitedNodes} />
            </div>
            {/* Node E */}
            <div className="absolute top-32 left-[90px]">
              <NodeItem value="E" id="E" activeVal={activeNode} visitedVals={visitedNodes} />
            </div>
            {/* Node F */}
            <div className="absolute top-32 left-[190px]">
              <NodeItem value="F" id="F" activeVal={activeNode} visitedVals={visitedNodes} />
            </div>
            {/* Node G */}
            <div className="absolute top-32 left-[270px]">
              <NodeItem value="G" id="G" activeVal={activeNode} visitedVals={visitedNodes} />
            </div>

            {/* SVG Connectors using absolute coordinates */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 text-border" stroke="currentColor" strokeWidth="2" fill="none">
              {/* A -> B */}
              <line x1="160" y1="20" x2="70" y2="80" />
              {/* A -> C */}
              <line x1="160" y1="20" x2="250" y2="80" />
              {/* B -> D */}
              <line x1="70" y1="80" x2="30" y2="140" />
              {/* B -> E */}
              <line x1="70" y1="80" x2="110" y2="140" />
              {/* C -> F */}
              <line x1="250" y1="80" x2="210" y2="140" />
              {/* C -> G */}
              <line x1="250" y1="80" x2="290" y2="140" />
            </svg>
          </div>
        </div>

        {/* Traversal Output log */}
        <div className="mt-4 border-t border-border/60 pt-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Visited Output Sequence:</span>
          <div className="flex gap-2 items-center flex-wrap min-h-[36px] bg-surface/30 border border-border/50 rounded-xl p-3 font-mono text-sm">
            {currentOutput.length === 0 ? (
              <span className="text-muted-foreground/45 italic text-xs">No nodes visited yet</span>
            ) : (
              currentOutput.map((val, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-2.5 py-1 bg-complete/10 border border-complete/30 text-complete font-bold rounded-lg animate-scale-in">
                    {val}
                  </span>
                  {idx < currentOutput.length - 1 && <span className="text-muted-foreground/30">→</span>}
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. BITWISE OPERATIONS SANDBOX TAB
// ==========================================

function BitwiseLabTab() {
  const [valA, setValA] = useState<number>(5);
  const [valB, setValB] = useState<number>(3);

  const getBits = (val: number): number[] => {
    const bits: number[] = [];
    for (let i = 7; i >= 0; i--) {
      bits.push((val >> i) & 1);
    }
    return bits;
  };

  const toggleBit = (num: 'A' | 'B', index: number) => {
    const currentVal = num === 'A' ? valA : valB;
    const bitPos = 7 - index;
    const newVal = currentVal ^ (1 << bitPos);
    if (num === 'A') {
      setValA(newVal);
    } else {
      setValB(newVal);
    }
  };

  const bitsA = getBits(valA);
  const bitsB = getBits(valB);

  // Bitwise outputs
  const andVal = valA & valB;
  const orVal = valA | valB;
  const xorVal = valA ^ valB;
  const notAVal = (~valA) & 255;
  const leftShiftVal = (valA << 1) & 255;
  const rightShiftVal = valA >> 1;

  const renderBitRow = (name: string, bits: number[], value: number, onToggle?: (idx: number) => void) => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-surface/30 border border-border/50 rounded-xl">
        <div className="w-20 shrink-0 font-bold text-xs text-foreground flex flex-col gap-0.5">
          <span>{name}</span>
          <span className="text-[10px] text-muted-foreground font-mono">Dec: {value}</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto py-1">
          {bits.map((bit, idx) => (
            <button
              key={idx}
              disabled={!onToggle}
              onClick={() => onToggle && onToggle(idx)}
              className={`w-9 h-9 rounded-lg border text-xs font-mono font-black flex flex-col items-center justify-center transition-all ${
                bit === 1
                  ? 'bg-primary/20 border-primary text-primary shadow-sm hover:bg-primary/35'
                  : 'bg-surface border-border text-muted-foreground/60 hover:bg-surface-hover'
              } ${onToggle ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'}`}
            >
              <span>{bit}</span>
              <span className="text-[7px] text-muted-foreground/60 opacity-60">2^{7 - idx}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Bit Toggles */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="modern-card p-6 border border-border/80 flex flex-col gap-4">
          <div className="flex justify-between items-center pb-2 border-b border-border/60">
            <h3 className="text-sm font-bold text-foreground">Interactive Bit Inputs</h3>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Click bits to toggle</span>
          </div>

          {renderBitRow('Input A', bitsA, valA, (idx) => toggleBit('A', idx))}
          {renderBitRow('Input B', bitsB, valB, (idx) => toggleBit('B', idx))}
        </div>

        {/* Operational outputs */}
        <div className="modern-card p-6 border border-border/80 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">Bitwise Logical Operations</h3>

          <div className="flex flex-col gap-3">
            {renderBitRow('A & B (AND)', getBits(andVal), andVal)}
            {renderBitRow('A | B (OR)', getBits(orVal), orVal)}
            {renderBitRow('A ^ B (XOR)', getBits(xorVal), xorVal)}
            {renderBitRow('~A (NOT)', getBits(notAVal), notAVal)}
          </div>
        </div>
      </div>

      {/* Bit shift & explanatory panel */}
      <div className="flex flex-col gap-6 lg:col-span-1">
        <div className="modern-card p-5 border border-border/80 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">Shift Operations</h3>

          <div className="flex flex-col gap-3">
            {renderBitRow('A << 1 (Left)', getBits(leftShiftVal), leftShiftVal)}
            {renderBitRow('A >> 1 (Right)', getBits(rightShiftVal), rightShiftVal)}
          </div>
        </div>

        <div className="modern-card p-5 border border-border/80 flex flex-col gap-3 bg-primary/5 border-primary/20">
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Bitwise Explanation</h3>
          <p className="text-[11.5px] text-muted-foreground leading-relaxed">
            Computers store numbers as binary digits (bits). Bitwise operations manipulate these bits directly, making them incredibly fast (often running in a single CPU clock cycle).
          </p>
          <ul className="text-[11px] text-muted-foreground space-y-1.5 list-disc pl-4 mt-1 leading-relaxed">
            <li><strong>AND (&):</strong> Yields 1 only if BOTH bits are 1.</li>
            <li><strong>OR (|):</strong> Yields 1 if EITHER bit is 1.</li>
            <li><strong>XOR (^):</strong> Yields 1 if the bits are DIFFERENT.</li>
            <li><strong>NOT (~):</strong> Flips all bits (0 → 1, 1 → 0).</li>
            <li><strong>Left Shift (&lt;&lt;):</strong> Shifts bits left, doubling the value (multiplying by 2).</li>
            <li><strong>Right Shift (&gt;&gt;):</strong> Shifts bits right, halving the value (dividing by 2).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
