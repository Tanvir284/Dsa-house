import React from 'react';
import { Sparkles, Code, Trophy, ExternalLink, BookOpen } from 'lucide-react';

export default function AboutPage() {
  const principles = [
    {
      title: 'Visual Learning',
      description: 'Step-by-step interactive visualizations make abstract concepts like pointer manipulation, tree traversals, and sorting operations tangible and easy to understand.',
      icon: Sparkles,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Real Implementations',
      description: 'Production-quality code samples in Python, C++, Java, and JavaScript — not pseudocode. Compare implementations side by side to understand language-specific patterns.',
      icon: Code,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Active Practice',
      description: 'Interactive quizzes test edge cases, trace execution steps, and evaluate complexity understanding to ensure real knowledge retention.',
      icon: Trophy,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <div className="flex flex-col gap-12 py-8 w-full animate-fade-in">
      {/* Hero */}
      <section className="text-center flex flex-col items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          About <span className="gradient-text">DSA House</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
          An open-source interactive platform for learning data structures and algorithms in depth — with visualizers, multi-language code, and hands-on practice.
        </p>
      </section>

      {/* Principles */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-center">How We Teach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="card p-5 flex flex-col gap-3 hover-lift">
                <div className={`w-10 h-10 rounded-xl ${p.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${p.color}`} />
                </div>
                <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="max-w-lg">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Built With
          </h3>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Next.js 16 · TypeScript · Tailwind CSS v4 · Zustand for state management · Supabase for optional cloud sync. Fully open source.
          </p>
        </div>
        <a
          href="https://github.com/Tanvir284/MD-Tanvir-Islam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg btn-secondary cursor-pointer shrink-0"
        >
          <ExternalLink className="h-4 w-4" /> GitHub
        </a>
      </section>
    </div>
  );
}
