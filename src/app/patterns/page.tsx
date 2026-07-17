'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { topics, categories } from '@/data';

const PATTERN_GROUPS = [
  {
    title: 'Foundational Structures',
    slugs: ['array', 'linked-list', 'stack', 'queue', 'recursion-backtracking'],
    color: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    title: 'Trees & Graphs',
    slugs: ['binary-tree', 'binary-search-tree', 'heap', 'trie', 'bfs', 'dfs'],
    color: 'from-emerald-500/20 to-green-500/10',
  },
  {
    title: 'Algorithms & Sorting',
    slugs: ['binary-search', 'bubble-sort', 'merge-sort', 'quick-sort'],
    color: 'from-amber-500/20 to-orange-500/10',
  },
  {
    title: 'Interview Patterns',
    slugs: ['hash-table', 'two-pointers', 'sliding-window', 'greedy-algorithms', 'dynamic-programming'],
    color: 'from-violet-500/20 to-purple-500/10',
  },
];

export default function PatternsPage() {
  return (
    <div className="flex flex-col gap-10 py-4 w-full animate-fade-in">
      <div className="flex flex-col gap-2">
        <span className="badge badge-primary w-fit">
          <Layers className="h-3 w-3" /> Pattern Library
        </span>
        <h1 className="text-3xl font-black text-foreground">Master DSA by Pattern</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          {topics.length} in-depth topics organized by learning path — from arrays to dynamic programming.
          Each includes theory, code, quizzes, and visualizers where available.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/roadmap" className="btn-primary px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2">
          <BookOpen className="h-4 w-4" /> Skill roadmap
        </Link>
        <Link href="/interview-prep" className="btn-secondary px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2">
          Interview cheat sheets <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        {PATTERN_GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="text-lg font-bold text-foreground mb-4">{group.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.slugs.map((slug) => {
                const topic = topics.find((t) => t.slug === slug);
                if (!topic) return null;
                const cat = categories.find((c) => c.id === topic.category_id);
                const hasViz = ['bubble-sort', 'binary-search', 'merge-sort', 'quick-sort', 'linked-list', 'stack', 'queue', 'binary-search-tree', 'bfs', 'dfs'].includes(slug);
                return (
                  <div
                    key={slug}
                    className={`modern-card p-5 flex flex-col gap-3 bg-gradient-to-br ${group.color} hover-lift group`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      <span className={`badge shrink-0 ${topic.difficulty === 'Beginner' ? 'badge-easy' : topic.difficulty === 'Intermediate' ? 'badge-medium' : 'badge-hard'}`}>
                        {topic.difficulty}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{topic.definition}</p>
                    <span className="text-[10px] text-muted-foreground font-semibold">{cat?.title}</span>
                    <div className="flex gap-2 mt-auto pt-2">
                      <Link href={`/topics/${slug}`} className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                        Lesson <ArrowRight className="h-3 w-3" />
                      </Link>
                      {hasViz && (
                        <Link href={`/visualizer/${slug === 'stack' || slug === 'queue' ? slug : slug}`} className="text-xs font-bold text-accent flex items-center gap-1 hover:underline">
                          <Sparkles className="h-3 w-3" /> Lab
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
