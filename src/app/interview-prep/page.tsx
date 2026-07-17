'use client';

import React, { useState } from 'react';
import { Trophy, Flame, BookOpen, AlertCircle } from 'lucide-react';

interface FlashCard {
  pattern: string;
  useCase: string;
  mechanics: string;
  sampleProblems: string[];
}

export default function InterviewPrepPage() {
  const [activeCardIdx, setActiveCardIdx] = useState<number | null>(null);

  const patterns: FlashCard[] = [
    {
      pattern: 'Sliding Window',
      useCase: 'Subarrays, substrings, or contiguous sequences where we need to track a sub-range satisfying a condition.',
      mechanics: 'Maintain left and right boundary indices. Expand the window by incrementing the right pointer. Shrink the window from the left when the condition is violated.',
      sampleProblems: ['Maximum Sum Subarray of Size K', 'Longest Substring Without Repeating Characters', 'Minimum Size Subarray Sum'],
    },
    {
      pattern: 'Two Pointers',
      useCase: 'Sorted arrays or linked lists where we search for pairs or compare values from opposite ends.',
      mechanics: 'Initialize one pointer at the start (left) and one at the end (right). Move them towards each other depending on the sum or target comparison.',
      sampleProblems: ['Two Sum II (Sorted Array)', 'Container With Most Water', 'Valid Palindrome'],
    },
    {
      pattern: 'Fast & Slow Pointers (Tortoise & Hare)',
      useCase: 'Linked lists or arrays to detect cycles, midpoints, or loop start positions.',
      mechanics: 'Initialize slow moving 1 node per step, and fast moving 2 nodes per step. If a cycle exists, they will eventually meet at some node.',
      sampleProblems: ['Linked List Cycle Detection', 'Find Middle of Linked List', 'Happy Number'],
    },
    {
      pattern: 'Monotonic Stack',
      useCase: 'Find the next greater or next smaller element in linear sequences.',
      mechanics: 'Maintain a stack whose elements are sorted (ascending or descending). Pop elements when the current item breaks the ordering property.',
      sampleProblems: ['Next Greater Element', 'Daily Temperatures', 'Largest Rectangle in Histogram'],
    },
  ];

  const complexityTable = [
    { structure: 'Array / Vector', access: 'O(1)', search: 'O(N)', insert: 'O(N)', delete: 'O(N)', space: 'O(N)' },
    { structure: 'Singly Linked List', access: 'O(N)', search: 'O(N)', insert: 'O(1)', delete: 'O(1)', space: 'O(N)' },
    { structure: 'Stack (LIFO)', access: 'O(N) (Index)', search: 'O(N)', insert: 'O(1) (Push)', delete: 'O(1) (Pop)', space: 'O(N)' },
    { structure: 'Queue (FIFO)', access: 'O(N) (Index)', search: 'O(N)', insert: 'O(1) (Enqueue)', delete: 'O(1) (Dequeue)', space: 'O(N)' },
    { structure: 'BST (Balanced)', access: 'O(log N)', search: 'O(log N)', insert: 'O(log N)', delete: 'O(log N)', space: 'O(N)' },
    { structure: 'BST (Skewed/Worst)', access: 'O(N)', search: 'O(N)', insert: 'O(N)', delete: 'O(N)', space: 'O(N)' },
  ];

  return (
    <div className="flex flex-col gap-10 py-6 w-full text-left animate-slide-up">
      {/* Page Header */}
      <div className="flex flex-col gap-2 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit animate-pulse-slow">
          <Trophy className="h-3.5 w-3.5" /> Prep Arena
        </div>
        <h1 className="text-3xl font-black text-foreground">Interview Preparation Center</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Master common coding patterns, review time and space complexities, and avoid trap questions frequently asked by tech recruiters.
        </p>
      </div>

      {/* 1. Interactive Patterns Cards */}
      <section className="flex flex-col gap-5 w-full">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Flame className="h-5 w-5 text-rose-500 animate-pulse" /> Common Interview Patterns
        </h2>
        <p className="text-xs text-muted-foreground">Click any card below to review its algorithmic mechanics and sample questions.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {patterns.map((card, idx) => {
            const isActive = activeCardIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveCardIdx(isActive ? null : idx)}
                className={`p-5 rounded-xl border transition-all text-left flex flex-col justify-between gap-4 cursor-pointer hover:border-primary/50 ${
                  isActive ? 'border-primary bg-primary/5 ring-1 ring-primary/25' : 'border-border bg-card'
                }`}
              >
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-black text-foreground leading-none">{card.pattern}</h3>
                  <span className="text-[10px] font-bold uppercase text-primary">Use Case</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.useCase}</p>
                </div>

                {isActive && (
                  <div className="flex flex-col gap-3 pt-3 border-t border-border/60 animate-fade-in text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-foreground">Algorithm Mechanics:</span>
                      <p className="text-muted-foreground leading-relaxed">{card.mechanics}</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="font-bold text-foreground">Sample LeetCode Problems:</span>
                      <div className="flex flex-col gap-1 pl-2.5 border-l border-border/80 font-mono text-[10px]">
                        {card.sampleProblems.map((prob, pIdx) => (
                          <span key={pIdx} className="text-muted-foreground">{pIdx+1}. {prob}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-primary font-bold">
                  {isActive ? 'Click to hide details' : 'Click to reveal details'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Big O Cheat Sheet Table */}
      <section className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" /> Complexity Cheat Sheet
        </h2>
        
        <div className="border border-border rounded-xl bg-card overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-3.5">Data Structure</th>
                <th className="p-3.5">Access</th>
                <th className="p-3.5">Search</th>
                <th className="p-3.5">Insertion</th>
                <th className="p-3.5">Deletion</th>
                <th className="p-3.5">Space</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              {complexityTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/50 transition-colors">
                  <td className="p-3.5 font-sans font-bold text-foreground">{row.structure}</td>
                  <td className="p-3.5">{row.access}</td>
                  <td className="p-3.5">{row.search}</td>
                  <td className="p-3.5 font-semibold text-primary">{row.insert}</td>
                  <td className="p-3.5 font-semibold text-rose-500">{row.delete}</td>
                  <td className="p-3.5">{row.space}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Common Pitfalls & Traps */}
      <section className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-rose-500" /> Common Mistakes & Interview Traps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-xs">
          <div className="p-4 rounded-xl border border-border bg-card flex gap-3 text-left">
            <div className="p-2 rounded bg-rose-500/10 text-rose-500 shrink-0 h-fit mt-0.5">
              <AlertCircle className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="font-bold text-foreground">Assuming Arrays are Always Best for Access</h4>
              <p className="text-muted-foreground leading-relaxed">
                While index lookup is $O(1)$, searching is $O(N)$ unless sorted. Insertion/Deletion at the start requires shifting all subsequent elements ($O(N)$), making Lists/Queues better for head insertion.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex gap-3 text-left">
            <div className="p-2 rounded bg-rose-500/10 text-rose-500 shrink-0 h-fit mt-0.5">
              <AlertCircle className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="font-bold text-foreground">BST Worst Case Skewed Degradation</h4>
              <p className="text-muted-foreground leading-relaxed">
                Many candidates assume BST search is always $O(\\log N)$. If elements are inserted in sorted order, the BST degrades into a linear chain, forcing $O(N)$ search. Self-balancing (AVL/Red-Black) trees are required to guarantee logarithm.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
