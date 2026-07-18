'use client';

import React, { useState, use, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ChevronLeft, CheckCircle2, Circle, Copy, Check, FileText, 
  Sparkles, AlertCircle, Code, Terminal 
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { problems } from '@/data';
import { getProblemTestSpec } from '@/data/problem-tests';
import { CodeRunner } from '@/components/runner/CodeRunner';

interface PageProps {
  params: Promise<{ id: string }>;
}

type CodeLanguage = 'python' | 'cpp' | 'java';

export default function ProblemWorkspacePage({ params }: PageProps) {
  const { id } = use(params);

  const { completedProblems, toggleProblemCompletion } = useAppStore();

  const [activeTab, setActiveTab] = useState<'diagram' | 'code' | 'runner'>('diagram');
  const [activeLang, setActiveLang] = useState<CodeLanguage>('python');
  const [copied, setCopied] = useState(false);

  // Find problem
  const problem = useMemo(() => {
    return problems.find((p) => p.id.toLowerCase() === id.toLowerCase());
  }, [id]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!problem) {
    notFound();
  }

  const isCompleted = completedProblems.includes(problem.id);

  // Difficulty Badges
  const diffClass = 
    problem.difficulty === 'Easy' ? 'badge-easy' :
    problem.difficulty === 'Medium' ? 'badge-medium' :
    'badge-hard';

  // Platform Badges
  const sourceClass =
    problem.source === 'LeetCode' ? 'text-amber-500 border-amber-500/25 bg-amber-500/5' :
    'text-sky-500 border-sky-500/25 bg-sky-500/5';

  const codeValue = problem.solutions[activeLang] ?? '';
  const availableLangs = (['python', 'cpp', 'java'] as CodeLanguage[]).filter(
    (lang) => typeof problem.solutions[lang] === 'string' && problem.solutions[lang]!.length > 0
  );
  const runnerSpec = useMemo(() => {
    const spec = getProblemTestSpec(problem.id);
    if (spec) return spec;

    // Generate fallback spec for in-browser playground
    const defaultFuncName = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const defaultMethodName = id.replace(/-/g, '_');
    
    return {
      problemId: problem.id,
      entry: {
        python: { methodName: defaultMethodName },
        javascript: { fnName: defaultFuncName },
      },
      cases: [],
      starter: {
        python: `# Write your code here\ndef ${defaultMethodName}(*args):\n    print("Hello from Sandbox!")\n    return args\n`,
        javascript: `// Write your code here\nfunction ${defaultFuncName}(...args) {\n  console.log("Hello from Sandbox!");\n  return args;\n}\n`,
      },
      isCustomInputOnly: true,
    };
  }, [id, problem.id]);

  return (
    <div className="flex flex-col gap-6 py-4 w-full text-left animate-fade-in">
      
      {/* Back button and title bar */}
      <div className="flex flex-col gap-3 border-b border-border pb-5">
        <Link 
          href="/problems" 
          className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground w-fit transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Arena
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
          {/* Metadata info */}
          <div className="flex flex-col gap-1 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-bold border px-1.5 py-0.5 rounded-md ${sourceClass}`}>
                {problem.source}
              </span>
              <span className={`badge ${diffClass}`}>
                {problem.difficulty}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {problem.id.toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-1.5">
              {problem.title}
            </h1>
          </div>

          {/* Mark solved action */}
          <button
            onClick={() => toggleProblemCompletion(problem.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              isCompleted
                ? 'bg-complete/10 border-complete/30 text-complete hover:bg-complete/15'
                : 'border-border bg-surface text-muted-foreground hover:text-foreground hover:border-border-hover'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Solved (+50 XP)
              </>
            ) : (
              <>
                <Circle className="h-4 w-4" /> Mark Solved
              </>
            )}
          </button>
        </div>
      </div>

      {/* Workspace Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-start w-full">
        
        {/* LEFT COLUMN: Problem Specs Card (span 3) */}
        <div className="lg:col-span-3 card flex flex-col h-[650px]">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2 select-none">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Problem Description</span>
          </div>

          <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-6 text-sm">
            {/* Description details */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">Statement</h3>
              <p className="text-foreground leading-relaxed font-medium">
                {problem.description}
              </p>
            </div>

            {/* Constraints */}
            <div className="flex flex-col gap-2.5 border-t border-border pt-4">
              <h3 className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">Constraints</h3>
              <ul className="list-disc list-inside flex flex-col gap-1.5 text-muted-foreground font-mono text-xs pl-1">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Topic mapping metadata */}
            <div className="flex flex-col gap-2.5 border-t border-border pt-4">
              <h3 className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">Topic Classification</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground bg-muted border border-border/80 px-2.5 py-1 rounded-lg">
                  {problem.topic}
                </span>
                <span className="text-xs capitalize text-muted-foreground font-mono">
                  {problem.category}
                </span>
              </div>
            </div>

            {/* Platform Reference */}
            <div className="flex flex-col gap-2.5 border-t border-border pt-4 mt-auto">
              <div className="p-3 bg-muted/40 border border-border/60 rounded-xl text-xs text-muted-foreground leading-relaxed flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <p className="font-semibold">
                  Study the monospaced visual diagram on the right to understand the algorithm&apos;s runtime state execution, then copy the solution boilerplate for your platform submissions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive diagram & Code Solution (span 4) */}
        <div className="lg:col-span-4 flex flex-col card h-[650px]">
          
          {/* Tab switches */}
          <div className="px-3 border-b border-border flex justify-between items-center bg-card select-none">
            <div className="flex gap-1 pt-2">
              <button
                onClick={() => setActiveTab('diagram')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl border-t border-x transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'diagram'
                    ? 'border-border bg-card text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" /> Visualization Diagram
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl border-t border-x transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'code'
                    ? 'border-border bg-card text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Code className="h-3.5 w-3.5" /> Code Solution
              </button>

              <button
                onClick={() => setActiveTab('runner')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl border-t border-x transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'runner'
                    ? 'border-border bg-card text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                title={runnerSpec.isCustomInputOnly ? 'Custom sandbox compiler playground' : 'Execute code against test cases'}
              >
                <Terminal className="h-3.5 w-3.5" /> Run Code
                {runnerSpec.isCustomInputOnly && (
                  <span className="ml-1 rounded-full bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 text-[9px] font-bold uppercase">
                    Sandbox
                  </span>
                )}
              </button>
            </div>

            {/* Language switcher for Code Tab */}
            {activeTab === 'code' && availableLangs.length > 0 && (
              <div className="flex bg-surface p-0.5 rounded-lg border border-border">
                {availableLangs.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md capitalize transition-all cursor-pointer ${
                      activeLang === lang
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {lang === 'cpp' ? 'C++' : lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Workspace Contents */}
          <div className="flex-1 overflow-hidden flex flex-col relative code-editor-bg">
            {/* Copy button — hidden on the runner tab */}
            {activeTab !== 'runner' && (
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={() => handleCopyCode(activeTab === 'diagram' ? problem.diagram : codeValue)}
                  className="p-2 rounded-lg border border-border bg-card hover:bg-surface-hover text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                  title={`Copy ${activeTab}`}
                >
                  {copied ? <Check className="h-4 w-4 text-complete" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            )}

            {/* Diagram Pane */}
            {activeTab === 'diagram' && (
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                <div className="flex-1 flex items-center justify-center p-4 bg-background/55 border border-border/60 rounded-xl font-mono text-xs leading-relaxed text-foreground select-all min-h-[300px] overflow-x-auto whitespace-pre">
                  {problem.diagram}
                </div>
                
                {/* Text Explanation block */}
                <div className="p-4 border border-border bg-muted/20 rounded-xl text-xs text-muted-foreground leading-relaxed text-left">
                  <span className="font-bold text-foreground block mb-1">Algorithmic Explanation</span>
                  {problem.solutions.explanation}
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              /* Multilingual solution block */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed text-foreground/95 select-text text-left">
                  {codeValue ? (
                    <pre className="m-0">
                      <code>
                        {codeValue.split('\n').map((line, idx) => (
                          <div key={idx} className="flex hover:bg-muted/10 px-1 py-0.5 rounded">
                            <span className="text-muted-foreground/30 w-7 select-none text-right pr-2 mr-2.5 font-sans text-[9px] border-r border-border/25">
                              {idx + 1}
                            </span>
                            <span className="whitespace-pre">{line}</span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-2 text-muted-foreground py-12">
                      <AlertCircle className="h-6 w-6" />
                      <span className="text-xs font-semibold">
                        No {activeLang === 'cpp' ? 'C++' : activeLang} solution available for this problem yet.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'runner' && (
              <div className="flex-1 overflow-y-auto p-4">
                <CodeRunner spec={runnerSpec} />
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
