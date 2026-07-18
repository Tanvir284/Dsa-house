'use client';

import React, { useState } from 'react';
import { BarChart3, Info, Check, Minus } from 'lucide-react';

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

function ComplexityTable({ rows, title }: { rows: AlgoRow[]; title: string }) {
  return (
    <div className="modern-card overflow-hidden">
      <div className="px-5 py-3 border-b border-border bg-muted/30">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" /> {title}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="p-3 font-semibold">Algorithm</th>
              <th className="p-3 font-semibold">Best</th>
              <th className="p-3 font-semibold">Average</th>
              <th className="p-3 font-semibold">Worst</th>
              <th className="p-3 font-semibold">Space</th>
              <th className="p-3 font-semibold">Stable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((row) => (
              <tr key={row.name} className="hover:bg-muted/40 transition-colors">
                <td className="p-3">
                  <span className="font-bold text-foreground block">{row.name}</span>
                  <span className="text-[10px] text-muted-foreground">{row.notes}</span>
                </td>
                <td className="p-3 font-mono text-complete">{row.best}</td>
                <td className="p-3 font-mono text-primary">{row.avg}</td>
                <td className="p-3 font-mono text-hard">{row.worst}</td>
                <td className="p-3 font-mono">{row.space}</td>
                <td className="p-3">
                  {row.stable
                    ? <Check className="h-4 w-4 text-complete" aria-label="Stable" />
                    : <Minus className="h-4 w-4 text-muted-foreground" aria-label="Not stable" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ComplexityLabPage() {
  const [n, setN] = useState(1000);

  const est = (factor: number) => Math.round(n * factor * Math.log2(Math.max(n, 2)));

  return (
    <div className="flex flex-col gap-8 py-4 w-full animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-foreground">Complexity Lab</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
          Compare Big-O complexities side by side. Use the estimator to build intuition for how operations scale.
        </p>
      </div>

      <div className="modern-card p-5 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex-1">
          <label className="text-xs font-bold text-muted-foreground uppercase">Input size (n)</label>
          <input
            type="range"
            min={100}
            max={100000}
            step={100}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full mt-2 accent-primary"
          />
          <p className="text-2xl font-black text-foreground mt-2 font-mono">{n.toLocaleString()}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs font-mono w-full md:w-auto">
          <div className="surface p-3 rounded-xl">
            <span className="text-muted-foreground block text-[10px]">O(n)</span>
            <span className="text-lg font-bold text-foreground">{n.toLocaleString()}</span>
          </div>
          <div className="surface p-3 rounded-xl">
            <span className="text-muted-foreground block text-[10px]">O(n log n)</span>
            <span className="text-lg font-bold text-primary">{est(1).toLocaleString()}</span>
          </div>
          <div className="surface p-3 rounded-xl">
            <span className="text-muted-foreground block text-[10px]">O(n²)</span>
            <span className="text-lg font-bold text-hard">{(n * n).toLocaleString()}</span>
          </div>
          <div className="surface p-3 rounded-xl">
            <span className="text-muted-foreground block text-[10px]">O(log n)</span>
            <span className="text-lg font-bold text-complete">{Math.round(Math.log2(n)).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 flex gap-3 text-xs text-muted-foreground">
        <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
        <p>Big-O describes growth rate as n → ∞. Constants and hardware matter in practice — use visualizers to see algorithms in action.</p>
      </div>

      <ComplexityTable rows={SORTING_ALGOS} title="Sorting Algorithms" />
      <ComplexityTable rows={SEARCH_STRUCTURES} title="Search & Lookup" />
    </div>
  );
}
