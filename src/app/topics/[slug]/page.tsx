'use client';

import React, { useState, use, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookMarked, CheckCircle2, Copy, Check, ChevronLeft, ChevronRight, Sparkles, Terminal, BookOpen, Trophy, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { topics, categories, lessonSections, codeSnippets, quizzes, quizQuestions } from '@/data';
import { generateBubbleSortSteps, generateBinarySearchSteps, generateMergeSortSteps, generateQuickSortSteps } from '@/lib/dsa-utils';
import confetti from 'canvas-confetti';

// Import visualizers
import VisualizerWrapper from '@/components/visualizers/VisualizerWrapper';
import ArrayVisualizer from '@/components/visualizers/ArrayVisualizer';
import LinkedListVisualizer from '@/components/visualizers/LinkedListVisualizer';
import StackQueueVisualizer from '@/components/visualizers/StackQueueVisualizer';
import TreeVisualizer from '@/components/visualizers/TreeVisualizer';
import GraphVisualizer from '@/components/visualizers/GraphVisualizer';
import { VisualizerStep, CodeLanguage, VisualizerConfig, QuizQuestion } from '@/types';
import { visualizerCatalog } from '@/data/visualizers';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Visualizer Config mappings
const visualizerConfigs: Record<string, VisualizerConfig> = {
  'bubble-sort': {
    title: 'Bubble Sort Visualizer',
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
    defaultInput: '52, 23, 89, 4, 12, 33, 77, 10',
    inputPlaceholder: 'e.g. 52, 23, 89, 4, 12',
  },
  'binary-search': {
    title: 'Binary Search Visualizer',
    pseudocode: [
      'binarySearch(arr, target):',
      '  low = 0, high = arr.length - 1',
      '  while low <= high:',
      '    mid = floor(low + (high - low) / 2)',
      '    if arr[mid] == target: return mid',
      '    else if arr[mid] < target: low = mid + 1',
      '    else: high = mid - 1',
      '  return -1',
    ],
    defaultInput: '10, 20, 30, 40, 50, 60, 70, 80',
    inputPlaceholder: 'e.g. 10, 20, 30, 40',
  },
  'merge-sort': {
    title: 'Merge Sort Visualizer',
    pseudocode: [
      'mergeSort(arr, l, r):',
      '  if l >= r: return',
      '  m = l + (r - l) / 2',
      '  mergeSort(arr, l, m)',
      '  mergeSort(arr, m + 1, r)',
      '  merge(arr, l, m, r)',
    ],
    defaultInput: '34, 12, 89, 5, 23, 77, 45, 10',
    inputPlaceholder: 'e.g. 34, 12, 89, 5',
  },
  'quick-sort': {
    title: 'Quick Sort Visualizer',
    pseudocode: [
      'quickSort(arr, low, high):',
      '  if low < high:',
      '    p = partition(arr, low, high)',
      '    quickSort(arr, low, p - 1)',
      '    quickSort(arr, p + 1, high)',
    ],
    defaultInput: '50, 23, 89, 4, 12, 33, 77, 10',
    inputPlaceholder: 'e.g. 50, 23, 89, 4',
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

export default function TopicPage({ params }: PageProps) {
  const { slug } = use(params);
  return <TopicPageContent key={slug} slug={slug} />;
}

function TopicPageContent({ slug }: { slug: string }) {
  // Load state stores
  const { completedLessons, bookmarks, toggleBookmark, completeLesson, submitQuizAttempt, topicNotes, setTopicNote } = useAppStore();

  // Find current topic
  const topic = topics.find((t) => t.slug === slug);

  // Active states
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz'>('lesson');
  const [activeLang, setActiveLang] = useState<CodeLanguage>('python');
  const [copied, setCopied] = useState(false);

  // Visualizer step-player configurations
  const [customInput, setCustomInput] = useState<string | null>(null);
  const [visualizerIndex, setVisualizerIndex] = useState<number>(0);
  const [bsTarget, setBsTarget] = useState<number>(60); // Binary search specific target

  // Quiz progression states
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Derive visualizer steps during render
  const visualizerSteps: VisualizerStep[] = useMemo(() => {
    if (!topic) return [];
    let numbers: number[] = [];
    const config = visualizerConfigs[topic.slug];
    const rawInput = customInput || config?.defaultInput;

    if (rawInput) {
      numbers = rawInput
        .split(',')
        .map((num) => parseInt(num.trim()))
        .filter((num) => !isNaN(num));
    }

    if (topic.slug === 'bubble-sort') {
      const arr = numbers.length > 0 ? numbers : [52, 23, 89, 4, 12, 33, 77, 10];
      return generateBubbleSortSteps(arr);
    } else if (topic.slug === 'binary-search') {
      const arr = (numbers.length > 0 ? numbers : [10, 20, 30, 40, 50, 60, 70, 80]).sort((a, b) => a - b);
      return generateBinarySearchSteps(arr, bsTarget);
    } else if (topic.slug === 'merge-sort') {
      const arr = numbers.length > 0 ? numbers : [34, 12, 89, 5, 23, 77, 45, 10];
      return generateMergeSortSteps(arr);
    } else if (topic.slug === 'quick-sort') {
      const arr = numbers.length > 0 ? numbers : [50, 23, 89, 4, 12, 33, 77, 10];
      return generateQuickSortSteps(arr);
    }
    return [];
  }, [topic, customInput, bsTarget]);

  const handleGenerateVisualizerInput = useCallback((customInputVal?: string) => {
    setCustomInput(customInputVal || null);
    setVisualizerIndex(0);
  }, []);

  // If topic is not found, handle gracefully
  if (!topic) {
    notFound();
  }

  const cat = categories.find((c) => c.id === topic.category_id);
  const sections = lessonSections[topic.id] || [];
  const snippets = codeSnippets[topic.id] || [];
  const quiz = quizzes[topic.id];
  const questionsList: QuizQuestion[] = quiz ? quizQuestions[quiz.id] || [] : [];

  // Bookmark and complete state indicators
  const isBookmarked = bookmarks.includes(topic.slug);
  const isCompleted = completedLessons.includes(topic.slug);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeSnippet = snippets.find((snip) => snip.language === activeLang);

  // Prev / Next Topic Roadmap navigation
  const currentIdx = topics.findIndex((t) => t.slug === slug);
  const prevTopic = currentIdx > 0 ? topics[currentIdx - 1] : null;
  const nextTopic = currentIdx < topics.length - 1 ? topics[currentIdx + 1] : null;

  // Quiz Interaction Handlers
  const handleVerifyAnswer = () => {
    if (selectedOpt === null || showExplanation) return;
    const currentQ = questionsList[currentQuizIdx];
    if (selectedOpt === currentQ.correct_option_index) {
      setCorrectCount(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setShowExplanation(false);
    if (currentQuizIdx < questionsList.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      if (quiz) {
        submitQuizAttempt(quiz.id, topic.slug, correctCount, questionsList.length);
      }
      if (correctCount === questionsList.length) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOpt(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setQuizFinished(false);
  };

  return (
    <div className="flex flex-col gap-6 py-4 w-full text-left">
      
      {/* 1. Header Board */}
      <div className="flex flex-col gap-3 border-b border-border pb-5">
        <Link href="/topics" className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground w-fit">
          <ChevronLeft className="h-4 w-4" /> Back to Topics
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[11px] font-medium text-primary">
              {cat?.title || 'Data Structures'}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-1">{topic.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(topic.slug)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-primary/10 border-primary/30 text-primary'
                  : 'border-border bg-surface text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookMarked className="h-4 w-4" /> {isBookmarked ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={() => completeLesson(topic.slug)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-complete/10 border-complete/30 text-complete'
                  : 'border-border bg-surface text-muted-foreground hover:text-foreground'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" /> {isCompleted ? 'Completed' : 'Mark Done'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Side-By-Side IDE Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-start w-full">
        
        {/* LEFT COLUMN: Lesson Specs & Confetti Quiz tabs (span 3) */}
        <div className="lg:col-span-3 card flex flex-col h-[700px]">
          {/* Tab selector bar */}
          <div className="px-3 border-b border-border flex gap-1 pt-2">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`px-4 py-2.5 text-xs font-medium rounded-t-lg border-t border-x transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'lesson'
                  ? 'border-border bg-card text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" /> Lesson
            </button>
            {quiz && (
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-2.5 text-xs font-medium rounded-t-lg border-t border-x transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'border-border bg-card text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Trophy className="h-3.5 w-3.5" /> Quiz
              </button>
            )}
          </div>

          <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-6 text-sm">
            {activeTab === 'lesson' ? (
              <>
                {/* Definition callout */}
                <p className="text-muted-foreground font-medium leading-relaxed border-l-2 border-primary/45 pl-3">
                  {topic.definition}
                </p>

                {/* Complexity summary board */}
                <div className="surface p-4 rounded-xl flex flex-col gap-3 font-mono text-xs">
                  <span className="text-[11px] font-semibold text-muted-foreground">Complexity</span>
                  <div className="grid grid-cols-2 gap-3 text-muted-foreground">
                    <div className="flex flex-col gap-0.5 border-b border-border pb-2">
                      <span className="text-[10px] text-muted-foreground">Time (avg)</span>
                      <span className="text-primary font-bold text-sm">{topic.time_complexity_average || 'O(N)'}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-b border-border pb-2">
                      <span className="text-[10px] text-muted-foreground">Space</span>
                      <span className="text-accent font-bold text-sm">{topic.space_complexity || 'O(1)'}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground">Best</span>
                      <span className="text-foreground font-semibold">{topic.time_complexity_best || 'O(1)'}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground">Worst</span>
                      <span className="text-foreground font-semibold">{topic.time_complexity_worst || 'O(N)'}</span>
                    </div>
                  </div>
                </div>

                {/* Lesson Sections markdown */}
                {sections.map((section) => (
                  <div key={section.id} className="flex flex-col gap-2.5 border-t border-border pt-4">
                    <h3 className="text-base font-bold text-foreground">{section.title}</h3>
                    <MarkdownRenderer content={section.content} />
                  </div>
                ))}

                <div className="flex flex-col gap-2 border-t border-border pt-4">
                  <h3 className="text-sm font-bold text-foreground">My notes</h3>
                  <p className="text-[11px] text-muted-foreground">Private notes saved to your profile on this device.</p>
                  <textarea
                    value={topicNotes[topic.slug] ?? ''}
                    onChange={(e) => setTopicNote(topic.slug, e.target.value)}
                    placeholder="Key insights, tricks, things to review..."
                    rows={4}
                    className="input-themed w-full px-3 py-2 border rounded-xl text-sm resize-y min-h-[100px]"
                  />
                </div>
              </>
            ) : (
              /* Quiz interface inside the IDE pane */
              <div className="flex flex-col gap-5 h-full">
                {quizFinished ? (
                  <div className="flex flex-col items-center justify-center text-center gap-4 py-16 flex-1">
                    <div className="p-4 rounded-full bg-complete/10 text-complete border border-complete/25 shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-bounce">
                      <Trophy className="h-10 w-12" />
                    </div>
                    <div className="flex flex-col gap-1.5 mt-2">
                      <h3 className="text-lg font-bold text-foreground">Quiz Complete!</h3>
                      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                        You scored <span className="text-complete font-black">{correctCount} / {questionsList.length}</span>.
                      </p>
                    </div>
                    <div className="flex gap-2 w-full mt-4 justify-center">
                      <button
                        onClick={handleResetQuiz}
                        className="px-4 py-2 text-xs font-bold rounded-lg border border-border bg-card/60 hover:bg-muted text-foreground transition-all cursor-pointer"
                      >
                        Re-attempt
                      </button>
                      {correctCount === questionsList.length && !isCompleted && (
                        <button
                          onClick={() => completeLesson(topic.slug)}
                          className="px-4 py-2 text-xs font-bold rounded-lg bg-primary text-primary-foreground hover:opacity-95 shadow-sm transition-all cursor-pointer"
                        >
                          Lock-in Complete
                        </button>
                      )}
                    </div>
                  </div>
                ) : questionsList.length > 0 ? (
                  (() => {
                    const currentQ = questionsList[currentQuizIdx];
                    return (
                      <div className="flex flex-col gap-5 text-left h-full">
                        <div className="flex justify-between items-center text-[11px] text-muted-foreground border-b border-border pb-2.5">
                          <span>Quiz</span>
                          <span>Question {currentQuizIdx + 1} of {questionsList.length}</span>
                        </div>

                        <h4 className="text-sm font-semibold text-foreground leading-normal mt-1">{currentQ.question_text}</h4>

                        <div className="flex flex-col gap-3 mt-2">
                          {currentQ.options.map((opt, oIdx) => {
                            let optionStyle = 'border-border bg-card/45 hover:border-primary/50 text-foreground';
                            if (selectedOpt === oIdx) optionStyle = 'border-primary bg-primary/5 text-primary ring-1 ring-primary/25';
                            if (showExplanation) {
                              if (oIdx === currentQ.correct_option_index) {
                                optionStyle = 'border-complete bg-complete/10 text-complete font-black';
                              } else if (selectedOpt === oIdx) {
                                optionStyle = 'border-rose-500 bg-rose-500/10 text-rose-400 font-black';
                              } else {
                                optionStyle = 'border-border/40 opacity-40 text-muted-foreground';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={showExplanation}
                                onClick={() => setSelectedOpt(oIdx)}
                                className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                              >
                                <span>{opt}</span>
                                {showExplanation && oIdx === currentQ.correct_option_index && (
                                  <span className="text-[9px] font-black uppercase text-complete">Correct</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {showExplanation && currentQ.explanation && (
                          <div className="surface p-4 rounded-lg text-xs text-muted-foreground mt-3 animate-fade-in">
                            <span className="font-semibold text-foreground text-[10px] block mb-1">Explanation</span>
                            {currentQ.explanation}
                          </div>
                        )}

                        <div className="mt-auto pt-6 border-t border-border/40 flex justify-end gap-2.5">
                          {!showExplanation ? (
                            <button
                              disabled={selectedOpt === null}
                              onClick={handleVerifyAnswer}
                              className="px-5 py-2.5 text-xs font-semibold rounded-lg btn-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                              Check Answer
                            </button>
                          ) : (
                            <button
                              onClick={handleNextQuestion}
                              className="px-5 py-2.5 text-xs font-semibold rounded-lg btn-primary cursor-pointer flex items-center gap-1"
                            >
                              Next <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center py-16 text-muted-foreground">No verification quiz modules loaded for this topic.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Visualizer Sandbox & Code Matrix (span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          
          {/* Top Panel: Visualizer Laboratory Arena */}
          <div className="card flex flex-col min-h-[380px] relative">
            <div className="px-5 py-3 border-b border-border flex justify-between items-center">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" /> Visualizer
              </span>
              
              {/* Registers Tracker */}
              {['bubble-sort', 'binary-search', 'merge-sort', 'quick-sort'].includes(topic.slug) && (
                <div className="flex gap-2 text-[10px] font-mono font-medium text-muted-foreground select-none">
                  <span className="text-muted-foreground/60 mr-1">Markers:</span>
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
            <div className="flex-1 w-full bg-muted/30 p-4">
              {['bubble-sort', 'binary-search', 'merge-sort', 'quick-sort'].includes(topic.slug) ? (
                visualizerSteps.length > 0 && (
                  <VisualizerWrapper
                    config={visualizerConfigs[topic.slug]}
                    steps={visualizerSteps}
                    currentStepIndex={visualizerIndex}
                    setCurrentStepIndex={setVisualizerIndex}
                    onGenerateInput={handleGenerateVisualizerInput}
                    renderVisuals={(step) => <ArrayVisualizer step={step} />}
                    additionalControls={
                      topic.slug === 'binary-search' ? (
                        <div className="flex flex-col gap-1 text-left">
                          <label className="text-[10px] font-medium text-muted-foreground">Target</label>
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
              ) : topic.slug === 'linked-list' ? (
                <LinkedListVisualizer />
              ) : ['stack', 'queue'].includes(topic.slug) ? (
                <StackQueueVisualizer key={topic.slug} initialMode={topic.slug === 'queue' ? 'queue' : 'stack'} />
              ) : ['binary-tree', 'binary-search-tree', 'avl-tree'].includes(topic.slug) ? (
                <TreeVisualizer />
              ) : ['bfs', 'dfs'].includes(topic.slug) ? (
                <GraphVisualizer key={topic.slug} initialMode={topic.slug === 'dfs' ? 'dfs' : 'bfs'} />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground">
                  <p className="font-semibold">No interactive sandbox configured for this topic.</p>
                  <p className="text-sm">Try one of the available visualizers:</p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center">
                    {visualizerCatalog.slice(0, 6).map((v) => (
                      <Link key={v.slug} href={`/visualizer/${v.slug}`} className="px-3 py-1 rounded-lg border border-border bg-surface text-xs font-semibold hover:bg-card">
                        {v.title}
                      </Link>
                    ))}
                    <Link href="/visualizer" className="px-3 py-1 rounded-lg border border-border bg-surface text-xs font-semibold hover:bg-card">All Visualizers</Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Panel: Sync Highlight Code editor */}
          {snippets.length > 0 && (
            <div className="card flex flex-col min-h-[300px] max-h-[360px]">
              <div className="px-5 py-2.5 border-b border-border flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Terminal className="h-4 w-4 text-primary" /> Code
                </span>

                <div className="flex bg-surface p-0.5 rounded-lg">
                  {snippets.map((snip) => (
                    <button
                      key={snip.language}
                      onClick={() => setActiveLang(snip.language)}
                      className={`px-2.5 py-1 text-[10px] font-semibold rounded capitalize transition-all cursor-pointer ${
                        activeLang === snip.language
                          ? 'bg-card text-foreground shadow-sm'
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
                      className="p-1.5 rounded-lg border border-border bg-card hover:bg-surface-hover text-muted-foreground hover:text-foreground transition-all cursor-pointer"
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
                          const step = visualizerSteps[visualizerIndex];
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
                    <div className="px-4 py-2 border-t border-border text-[11px] text-muted-foreground">
                      <span className="font-semibold text-foreground text-[10px] mr-1.5">Note:</span>
                      {activeSnippet.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* 3. Prev / Next Lesson Navigation links */}
      <div className="flex justify-between items-center border-t border-border pt-5 mt-4 gap-4 flex-wrap w-full">
        {prevTopic ? (
          <Link
            href={`/topics/${prevTopic.slug}`}
            className="flex items-center gap-3 p-3 rounded-lg card text-left w-full sm:w-auto hover:-translate-x-0.5 transition-transform"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">Previous</span>
              <span className="text-xs font-semibold text-foreground">{prevTopic.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <Link
            href={`/topics/${nextTopic.slug}`}
            className="flex items-center gap-3 p-3 rounded-lg card text-right w-full sm:w-auto ml-auto hover:translate-x-0.5 transition-transform"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">Next</span>
              <span className="text-xs font-semibold text-foreground">{nextTopic.title}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ) : (
          <div />
        )}
      </div>

    </div>
  );
}
