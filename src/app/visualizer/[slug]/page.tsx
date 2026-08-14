'use client';

import React, { useState, use, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, Terminal, Copy, Check, Layers, Activity } from 'lucide-react';
import { getAlgorithm, isTraceableSlug, parseInput, runAlgorithm, toVisualizerSteps } from '@/lib/trace';
import { topics } from '@/data/catalog';
import { isVisualizerSlug, visualizerCatalog } from '@/data/visualizers';
import { CodeLanguage, CodeSnippet, VisualizerConfig } from '@/types';

import VisualizerWrapper from '@/components/visualizers/VisualizerWrapper';
import ArrayVisualizer from '@/components/visualizers/ArrayVisualizer';
import LinkedListVisualizer from '@/components/visualizers/LinkedListVisualizer';
import StackQueueVisualizer from '@/components/visualizers/StackQueueVisualizer';
import TreeVisualizer from '@/components/visualizers/TreeVisualizer';
import GraphVisualizer from '@/components/visualizers/GraphVisualizer';

/**
 * Fetch one topic's reference snippets without pulling the whole curriculum.
 *
 * `@/data` builds its content maps at module scope, so a static import costs
 * ~1.2 MB — the entire authored curriculum — to read a single topic's entry.
 * Deferring it keeps that weight off the lab's initial load; the snippet panel
 * simply renders once the data arrives.
 */
function useTopicSnippets(topicId: string | undefined): CodeSnippet[] {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);

  useEffect(() => {
    if (!topicId) {
      setSnippets([]);
      return;
    }
    let cancelled = false;
    import('@/data').then(({ codeSnippets }) => {
      if (!cancelled) setSnippets(codeSnippets[topicId] ?? []);
    });
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  return snippets;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function StandaloneVisualizerPage({ params }: PageProps) {
  const { slug } = use(params);
  return <StandaloneVisualizerContent key={slug} slug={slug} />;
}

function StandaloneVisualizerContent({ slug }: { slug: string }) {
  const [customInput, setCustomInput] = useState<string | null>(null);
  const [visualizerIndex, setVisualizerIndex] = useState<number>(0);
  const [activeLang, setActiveLang] = useState<CodeLanguage>('python');
  const [copied, setCopied] = useState(false);

  const algorithm = getAlgorithm(slug);
  const [target, setTarget] = useState<number>(algorithm?.defaultTarget ?? 0);

  const catalogEntry = useMemo(() => visualizerCatalog.find((e) => e.slug === slug), [slug]);
  const topic = useMemo(() => topics.find((t) => t.slug === slug), [slug]);
  const snippets = useTopicSnippets(topic?.id);
  const activeSnippet = useMemo(
    () => snippets.find((snip) => snip.language === activeLang),
    [snippets, activeLang],
  );

  /**
   * Run the algorithm for real and keep the recording. Everything the panels
   * below display — narration, metrics, call stack — is read out of this one
   * trace, so none of it can disagree with what the algorithm actually did.
   */
  const trace = useMemo(() => {
    if (!algorithm) return null;
    const parsed = customInput ? parseInput(customInput) : null;
    return runAlgorithm(algorithm, parsed ?? algorithm.defaultInput, { target });
  }, [algorithm, customInput, target]);

  const steps = useMemo(() => (trace ? toVisualizerSteps(trace) : []), [trace]);

  const config: VisualizerConfig | null = useMemo(() => {
    if (!algorithm) return null;
    return {
      title: `${algorithm.title} Laboratory`,
      pseudocode: algorithm.pseudocode,
      defaultInput: algorithm.defaultInput.join(', '),
      inputPlaceholder: `e.g. ${algorithm.defaultInput.slice(0, 4).join(', ')}`,
    };
  }, [algorithm]);

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

  const currentFrame = trace?.frames[Math.min(visualizerIndex, trace.frames.length - 1)] ?? null;
  const title = catalogEntry ? `${catalogEntry.title} Laboratory` : 'Laboratory';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 py-4 w-full text-left"
    >
      <Link
        href="/visualizer"
        className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground w-fit font-mono"
      >
        <ChevronLeft className="h-4 w-4" /> CD_LABORATORY_DIR
      </Link>

      <div className="flex flex-col gap-1 border-b border-border/60 pb-5">
        <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 text-foreground">
          <Sparkles className="h-6 w-6 text-accent" aria-hidden="true" /> {title}
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
          {catalogEntry?.description ??
            'Interactive standalone sandbox. Inspect registers, customize inputs, and review implementations.'}
        </p>

        {algorithm && (
          <dl className="flex flex-wrap gap-2 mt-3 text-[10px] font-mono">
            {[
              ['best', algorithm.complexity.best],
              ['avg', algorithm.complexity.average],
              ['worst', algorithm.complexity.worst],
              ['space', algorithm.complexity.space],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center gap-1.5 bg-surface border border-border rounded-lg px-2 py-1"
              >
                <dt className="uppercase tracking-wider text-muted-foreground">{label}</dt>
                <dd className="font-black text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-start w-full">
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          <div className="ide-pane flex flex-col min-h-[380px] shadow-lg relative">
            <div className="px-5 py-3 border-b border-border/60 bg-muted/20 flex justify-between items-center gap-3 flex-wrap">
              <span className="text-xs font-bold text-foreground uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-accent" aria-hidden="true" /> SANDBOX_ARENA
              </span>

              {currentFrame && (
                <div className="flex gap-2 text-[9px] font-mono font-bold text-muted-foreground select-none">
                  <span className="uppercase text-muted-foreground/60 mr-1.5">Registers:</span>
                  {Object.keys(currentFrame.markers).length === 0 ? (
                    <span className="opacity-65">[idle]</span>
                  ) : (
                    Object.entries(currentFrame.markers).map(([key, val]) => (
                      <span
                        key={key}
                        className="bg-background/80 border border-border px-1.5 py-0.5 rounded text-foreground font-black"
                      >
                        {key}={val}
                      </span>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="flex-1 w-full arena-tint p-4">
              {isTraceableSlug(slug) && config && steps.length > 0 ? (
                <VisualizerWrapper
                  config={config}
                  steps={steps}
                  currentStepIndex={visualizerIndex}
                  setCurrentStepIndex={setVisualizerIndex}
                  onGenerateInput={handleGenerateInput}
                  renderVisuals={(step) => <ArrayVisualizer step={step} />}
                  additionalControls={
                    algorithm?.usesTarget ? (
                      <div className="flex flex-col gap-1 text-left">
                        <label
                          htmlFor="viz-target"
                          className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider font-mono leading-none"
                        >
                          Target Value
                        </label>
                        <input
                          id="viz-target"
                          type="number"
                          value={target}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setTarget(Number.isNaN(val) ? 0 : val);
                            setVisualizerIndex(0);
                          }}
                          className="px-2 py-1.5 border border-border rounded-lg bg-background text-xs font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary w-20"
                        />
                      </div>
                    ) : undefined
                  }
                />
              ) : slug === 'linked-list' ? (
                <LinkedListVisualizer />
              ) : ['stack', 'queue'].includes(slug) ? (
                <StackQueueVisualizer key={slug} initialMode={slug === 'queue' ? 'queue' : 'stack'} />
              ) : slug === 'binary-search-tree' ? (
                <TreeVisualizer />
              ) : ['bfs', 'dfs'].includes(slug) ? (
                <GraphVisualizer key={slug} initialMode={slug === 'dfs' ? 'dfs' : 'bfs'} />
              ) : (
                <div className="text-center py-20 text-muted-foreground">
                  Sandbox configuration not supported.
                </div>
              )}
            </div>
          </div>

          {currentFrame && trace && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OperationCounters frame={currentFrame} total={trace.metrics} />
              <CallStack frame={currentFrame} />
            </div>
          )}

          {snippets.length > 0 && (
            <div className="ide-pane flex flex-col min-h-[300px] max-h-[360px] shadow-lg">
              <div className="px-5 py-2.5 border-b border-border/60 bg-muted/20 flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs font-bold text-foreground uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <Terminal className="h-4 w-4 text-primary" aria-hidden="true" /> Reference Implementation
                </span>

                <div className="flex bg-background/80 p-0.5 rounded-lg border border-border" role="tablist">
                  {snippets.map((snip) => (
                    <button
                      key={snip.language}
                      role="tab"
                      aria-selected={activeLang === snip.language}
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
                      aria-label="Copy implementation code"
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-complete" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed select-text text-foreground/90">
                    <pre className="m-0">
                      <code>
                        {activeSnippet.code.split('\n').map((line, lIdx) => (
                          <div key={lIdx} className="code-highlight-line flex">
                            <span className="text-muted-foreground/35 w-7 select-none text-right pr-2 border-r border-border/20 mr-2.5 font-sans text-[9px]">
                              {lIdx + 1}
                            </span>
                            <span className="whitespace-pre">{line}</span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>

                  {activeSnippet.explanation && (
                    <div className="px-4 py-2 border-t border-border bg-muted/15 text-[10px] text-muted-foreground font-semibold">
                      <span className="font-black text-foreground uppercase tracking-widest text-[8px] mr-2">
                        Core Note:
                      </span>
                      {activeSnippet.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Live operation counters.
 *
 * These are not estimates — the tracer increments them from inside the
 * instrumented array, so they are exactly the work the algorithm performed up
 * to the current step.
 */
function OperationCounters({
  frame,
  total,
}: {
  frame: { metrics: { comparisons: number; swaps: number; reads: number; writes: number } };
  total: { comparisons: number; swaps: number; reads: number; writes: number };
}) {
  const rows = [
    ['Comparisons', frame.metrics.comparisons, total.comparisons],
    ['Swaps', frame.metrics.swaps, total.swaps],
    ['Reads', frame.metrics.reads, total.reads],
    ['Writes', frame.metrics.writes, total.writes],
  ] as const;

  return (
    <section className="ide-pane p-4" aria-label="Operation counters">
      <h2 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono flex items-center gap-1.5 mb-3">
        <Activity className="h-4 w-4 text-primary" aria-hidden="true" /> Work Done
      </h2>
      <dl className="grid grid-cols-2 gap-3">
        {rows.map(([label, current, max]) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
              {label}
            </dt>
            <dd className="text-lg font-black text-foreground tabular-nums">
              {current}
              <span className="text-[10px] font-bold text-muted-foreground ml-1">/ {max}</span>
            </dd>
            <div className="h-1 rounded-full bg-surface overflow-hidden">
              <div
                className="h-full bg-primary transition-[width] duration-200"
                style={{ width: max > 0 ? `${(current / max) * 100}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Logical call stack, for the recursive algorithms that push one. */
function CallStack({ frame }: { frame: { stack: { label: string }[] } }) {
  return (
    <section className="ide-pane p-4" aria-label="Call stack">
      <h2 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono flex items-center gap-1.5 mb-3">
        <Layers className="h-4 w-4 text-accent" aria-hidden="true" /> Call Stack
        <span className="text-[10px] text-muted-foreground font-normal normal-case tracking-normal">
          depth {frame.stack.length}
        </span>
      </h2>

      {frame.stack.length === 0 ? (
        <p className="text-xs text-muted-foreground font-mono">
          Iterative at this step — nothing on the stack.
        </p>
      ) : (
        <ol className="flex flex-col-reverse gap-1">
          {frame.stack.map((call, i) => (
            <li
              key={`${call.label}-${i}`}
              className="font-mono text-[11px] font-bold text-foreground bg-surface border border-border rounded px-2 py-1 flex items-center gap-2"
              style={{ marginLeft: `${i * 10}px` }}
            >
              <span className="text-muted-foreground text-[9px] tabular-nums">{i}</span>
              {call.label}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
