'use client';

import React, { useState, use, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, ChevronLeft, Terminal, Copy, Check } from 'lucide-react';
import { generateBubbleSortSteps, generateBinarySearchSteps, generateMergeSortSteps, generateQuickSortSteps } from '@/lib/dsa-utils';
import { topics, codeSnippets } from '@/data';
import { isVisualizerSlug } from '@/data/visualizers';
import { VisualizerStep, CodeLanguage, VisualizerConfig } from '@/types';

// Import visualizers
import VisualizerWrapper from '@/components/visualizers/VisualizerWrapper';
import ArrayVisualizer from '@/components/visualizers/ArrayVisualizer';
import LinkedListVisualizer from '@/components/visualizers/LinkedListVisualizer';
import StackQueueVisualizer from '@/components/visualizers/StackQueueVisualizer';
import TreeVisualizer from '@/components/visualizers/TreeVisualizer';
import GraphVisualizer from '@/components/visualizers/GraphVisualizer';

const visualizerConfigs: Record<string, VisualizerConfig> = {
  'bubble-sort': {
    title: 'Bubble Sort Laboratory',
    pseudocode: [
      'bubbleSort(arr):',
      '  for i from 0 to n-1:',
      '    swapped = false',
      '    for j from 0 to n-i-2:',
      '      if arr[j] > arr[j+1]:',
      '        swap(arr[j], arr[j+1])',
      '        swapped = true',
      '    if not swapped: break',
    ],
    defaultInput: '45, 12, 89, 7, 23, 56, 33, 9',
    inputPlaceholder: 'e.g. 45, 12, 89, 7',
  },
  'binary-search': {
    title: 'Binary Search Laboratory',
    pseudocode: [
      'binarySearch(arr, target):',
      '  low = 0, high = n-1',
      '  while low <= high:',
      '    mid = low + (high - low) / 2',
      '    if arr[mid] == target: return mid',
      '    else if arr[mid] < target:',
      '      low = mid + 1',
      '    else:',
      '      high = mid - 1',
      '  return -1',
    ],
    defaultInput: '8, 15, 23, 38, 42, 57, 69, 88',
    inputPlaceholder: 'e.g. 8, 15, 23, 38 (must be sorted)',
  },
  'merge-sort': {
    title: 'Merge Sort Laboratory',
    pseudocode: [
      'mergeSort(arr, l, r):',
      '  if l >= r: return',
      '  m = l + (r - l) / 2',
      '  mergeSort(arr, l, m)',
      '  mergeSort(arr, m+1, r)',
      '  merge(arr, l, m, r)',
    ],
    defaultInput: '23, 77, 45, 12, 89, 5, 99, 10',
    inputPlaceholder: 'e.g. 23, 77, 45',
  },
  'quick-sort': {
    title: 'Quick Sort Laboratory',
    pseudocode: [
      'quickSort(arr, low, high):',
      '  if low < high:',
      '    p = partition(arr, low, high)',
      '    quickSort(arr, low, p - 1)',
      '    quickSort(arr, p + 1, high)',
    ],
    defaultInput: '42, 17, 89, 5, 23, 56, 77, 10',
    inputPlaceholder: 'e.g. 42, 17, 89',
  },
};

const getHighlightClass = (lineContent: string, status: string) => {
  const lower = lineContent.toLowerCase();
  if (lineContent.trim() === '}' || lineContent.trim() === '{' || lineContent.trim() === '') return '';
  
  if (status === 'compare') {
    if (lower.includes('<') || lower.includes('>') || lower.includes('==') || lower.includes('compare') || lower.includes('===') || lower.includes('!=') || lower.includes('arr[mid]')) {
      return 'code-glow-compare';
    }
  }
  if (status === 'swap') {
    if (lower.includes('temp') || lower.includes('swap') || (lower.includes('arr[') && lower.includes('='))) {
      return 'code-glow-swap';
    }
  }
  if (status === 'found') {
    if (lower.includes('return') || lower.includes('found')) {
      return 'code-glow-active';
    }
  }
  return '';
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function StandaloneVisualizerPage({ params }: PageProps) {
  const { slug } = use(params);
  return <StandaloneVisualizerContent key={slug} slug={slug} />;
}

function StandaloneVisualizerContent({ slug }: { slug: string }) {
  // Playback state configurations
  const [customInput, setCustomInput] = useState<string | null>(null);
  const [visualizerIndex, setVisualizerIndex] = useState<number>(0);
  const [bsTarget, setBsTarget] = useState<number>(57);
  const [activeLang, setActiveLang] = useState<CodeLanguage>('python');
  const [copied, setCopied] = useState(false);

  // Find curriculum topic corresponding to sandbox slug
  const topic = useMemo(() => {
    return topics.find((t) => t.slug === slug);
  }, [slug]);

  // Retrieve code snippets
  const snippets = useMemo(() => {
    return topic ? codeSnippets[topic.id] || [] : [];
  }, [topic]);

  const activeSnippet = useMemo(() => {
    return snippets.find((snip) => snip.language === activeLang);
  }, [snippets, activeLang]);

  // Derive visualizer steps during render
  const visualizerSteps: VisualizerStep[] = useMemo(() => {
    let numbers: number[] = [];
    const config = visualizerConfigs[slug];
    const rawInput = customInput || config?.defaultInput;

    if (rawInput) {
      numbers = rawInput
        .split(',')
        .map((num) => parseInt(num.trim()))
        .filter((num) => !isNaN(num));
    }

    if (slug === 'bubble-sort') {
      const arr = numbers.length > 0 ? numbers : [45, 12, 89, 7, 23, 56, 33, 9];
      return generateBubbleSortSteps(arr);
    } else if (slug === 'binary-search') {
      const arr = (numbers.length > 0 ? numbers : [8, 15, 23, 38, 42, 57, 69, 88]).sort((a, b) => a - b);
      return generateBinarySearchSteps(arr, bsTarget);
    } else if (slug === 'merge-sort') {
      const arr = numbers.length > 0 ? numbers : [23, 77, 45, 12, 89, 5, 99, 10];
      return generateMergeSortSteps(arr);
    } else if (slug === 'quick-sort') {
      const arr = numbers.length > 0 ? numbers : [42, 17, 89, 5, 23, 56, 77, 10];
      return generateQuickSortSteps(arr);
    }
    return [];
  }, [slug, customInput, bsTarget]);

  const handleGenerateInput = useCallback((customInputVal?: string) => {
    setCustomInput(customInputVal || null);
    setVisualizerIndex(0);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isVisualizerSlug(slug)) {
    notFound();
  }

  // Human friendly labels mapping
  const titleLabels: Record<string, string> = {
    'bubble-sort': 'Bubble Sort Laboratory',
    'binary-search': 'Binary Search Laboratory',
    'merge-sort': 'Merge Sort Laboratory',
    'quick-sort': 'Quick Sort Laboratory',
    'linked-list': 'Linked List Laboratory',
    'stack': 'Stack Buffer Laboratory',
    'queue': 'Queue Buffer Laboratory',
    'binary-search-tree': 'BST SVG Laboratory',
    'bfs': 'Graph BFS Traversal Laboratory',
    'dfs': 'Graph DFS Traversal Laboratory',
  };

  return (
    <div className="flex flex-col gap-6 py-4 w-full text-left">
      {/* Return Navigation */}
      <Link href="/visualizer" className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground w-fit font-mono">
        <ChevronLeft className="h-4 w-4" /> CD_LABORATORY_DIR
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-border/60 pb-5">
        <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 text-foreground">
          <Sparkles className="h-6 w-6 text-accent animate-pulse" /> {titleLabels[slug]}
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
          Interactive standalone sandbox environment. Inspect variable registers, customize data inputs, and review core implementations.
        </p>
      </div>

      {/* Renders main visualizer layout */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-start w-full">
        {/* LEFT COLUMN: Sandbox laboratory arena (span 7 or 7 depending on stack) */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          
          {/* Top Panel: Visualizer Laboratory Arena */}
          <div className="ide-pane flex flex-col min-h-[380px] shadow-lg relative">
            <div className="px-5 py-3 border-b border-border/60 bg-muted/20 flex justify-between items-center">
              <span className="text-xs font-bold text-foreground uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-accent animate-pulse" /> SANDBOX_ARENA
              </span>
              
              {/* Registers Tracker */}
              {['bubble-sort', 'binary-search', 'merge-sort', 'quick-sort'].includes(slug) && (
                <div className="flex gap-2 text-[9px] font-mono font-bold text-muted-foreground select-none">
                  <span className="uppercase text-muted-foreground/60 mr-1.5">Register Stack:</span>
                  {(() => {
                    const step = visualizerSteps[visualizerIndex];
                    if (!step || Object.keys(step.markers).length === 0) return <span className="opacity-65">[Idle]</span>;
                    return Object.entries(step.markers).map(([key, val]) => (
                      <span key={key} className="bg-background/80 border border-border px-1.5 py-0.5 rounded text-foreground font-black">
                        {key}={val}
                      </span>
                    ));
                  })()}
                </div>
              )}
            </div>

            {/* Sandbox Workspace Selection */}
            <div className="flex-1 w-full arena-tint p-4">
              {['bubble-sort', 'binary-search', 'merge-sort', 'quick-sort'].includes(slug) ? (
                visualizerSteps.length > 0 && (
                  <VisualizerWrapper
                    config={visualizerConfigs[slug]}
                    steps={visualizerSteps}
                    currentStepIndex={visualizerIndex}
                    setCurrentStepIndex={setVisualizerIndex}
                    onGenerateInput={handleGenerateInput}
                    renderVisuals={(step) => <ArrayVisualizer step={step} />}
                    additionalControls={
                      slug === 'binary-search' ? (
                        <div className="flex flex-col gap-1 text-left">
                          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono leading-none">Target Value</label>
                          <input
                            type="number"
                            value={bsTarget}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              setBsTarget(isNaN(val) ? 0 : val);
                              setVisualizerIndex(0);
                            }}
                            className="px-2 py-1.5 border border-border rounded-lg bg-background text-xs font-mono font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-20"
                          />
                        </div>
                      ) : undefined
                    }
                  />
                )
              ) : slug === 'linked-list' ? (
                <LinkedListVisualizer />
              ) : ['stack', 'queue'].includes(slug) ? (
                <StackQueueVisualizer key={slug} initialMode={slug === 'queue' ? 'queue' : 'stack'} />
              ) : slug === 'binary-search-tree' ? (
                <TreeVisualizer />
              ) : ['bfs', 'dfs'].includes(slug) ? (
                <GraphVisualizer key={slug} initialMode={slug === 'dfs' ? 'dfs' : 'bfs'} />
              ) : (
                <div className="text-center py-20 text-muted-foreground">Sandbox configuration not supported.</div>
              )}
            </div>
          </div>

          {/* Bottom Panel: Code workspace window */}
          {snippets.length > 0 && (
            <div className="ide-pane flex flex-col min-h-[300px] max-h-[360px] shadow-lg">
              <div className="px-5 py-2.5 border-b border-border/60 bg-muted/20 flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs font-bold text-foreground uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <Terminal className="h-4 w-4 text-primary" /> Reference Implementation
                </span>

                <div className="flex bg-background/80 p-0.5 rounded-lg border border-border">
                  {snippets.map((snip) => (
                    <button
                      key={snip.language}
                      onClick={() => setActiveLang(snip.language)}
                      className={`px-2.5 py-1 text-[9px] font-extrabold rounded uppercase transition-all cursor-pointer ${
                        activeLang === snip.language
                          ? 'bg-card text-foreground border border-border/40 shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {snip.language === 'cpp' ? 'C++' : snip.language === 'csharp' ? 'C#' : snip.language}
                    </button>
                  ))}
                </div>
              </div>

              {activeSnippet && (
                <div className="flex-1 overflow-hidden flex flex-col relative code-editor-bg">
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <button
                      onClick={() => handleCopyCode(activeSnippet.code)}
                      className="p-1.5 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                      title="Copy implementation code"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-complete" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  {/* Sync Code viewer area */}
                  <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed select-text text-foreground/90">
                    <pre className="m-0">
                      <code>
                        {activeSnippet.code.split('\n').map((line, lIdx) => {
                          const step = ['bubble-sort', 'binary-search', 'merge-sort', 'quick-sort'].includes(slug)
                            ? visualizerSteps[visualizerIndex]
                            : null;
                          const highlightClass = step ? getHighlightClass(line, step.status) : '';
                          return (
                            <div key={lIdx} className={`code-highlight-line flex ${highlightClass}`}>
                              <span className="text-muted-foreground/35 w-7 select-none text-right pr-2 border-r border-border/20 mr-2.5 font-sans text-[9px]">{lIdx + 1}</span>
                              <span className="whitespace-pre">{line}</span>
                            </div>
                          );
                        })}
                      </code>
                    </pre>
                  </div>

                  {activeSnippet.explanation && (
                    <div className="px-4 py-2 border-t border-border bg-muted/15 text-[10px] text-muted-foreground font-semibold">
                      <span className="font-black text-foreground uppercase tracking-widest text-[8px] mr-2">Core Note:</span>
                      {activeSnippet.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
