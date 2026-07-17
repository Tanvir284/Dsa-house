'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, BookOpen, Sparkles, Layout, ArrowRight } from 'lucide-react';
import { buildSearchIndex, filterSearch, SearchItem } from '@/lib/search-index';

export default function CommandPalette({ startOpen = false }: { startOpen?: boolean }) {
  const [open, setOpen] = useState(startOpen);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const index = useMemo(() => buildSearchIndex(), []);
  const results = useMemo(() => filterSearch(query, index, 14), [query, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const iconFor = (type: SearchItem['type']) => {
    if (type === 'topic') return BookOpen;
    if (type === 'visualizer') return Sparkles;
    return Layout;
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface/80 text-muted-foreground text-xs hover:text-foreground hover:border-primary/30 transition-all cursor-pointer min-w-[200px]"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        className="glass-panel w-full max-w-xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="h-4 w-4 text-primary shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, visualizers, pages..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="text-[10px] font-mono text-muted-foreground">ESC</kbd>
        </div>
        <ul className="max-h-[360px] overflow-y-auto py-2">
          {results.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">No results found.</li>
          ) : (
            results.map((item) => {
              const Icon = iconFor(item.type);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/60 text-left transition-colors cursor-pointer group"
                    onClick={() => {
                      setOpen(false);
                      setQuery('');
                      router.push(item.href);
                    }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{item.subtitle}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              );
            })
          )}
        </ul>
        <div className="px-4 py-2 border-t border-border text-[10px] text-muted-foreground flex justify-between">
          <span>Navigate with click</span>
          <Link href="/topics" onClick={() => setOpen(false)} className="text-primary font-semibold hover:underline">
            Browse all topics
          </Link>
        </div>
      </div>
    </div>
  );
}
