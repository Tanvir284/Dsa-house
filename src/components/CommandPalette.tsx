'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, BookOpen, Sparkles, Layout, ArrowRight } from 'lucide-react';
import { buildSearchIndex, filterSearch, SearchItem } from '@/lib/search-index';

interface CommandPaletteProps {
  startOpen?: boolean;
  /** Called whenever the palette closes, for any reason — Escape, a
   * selection, or clicking the backdrop. Optional: the default (trigger
   * button) usage manages its own open state and doesn't need it, but the
   * `startOpen` mobile-overlay usage renders no trigger of its own, so
   * without this callback closing the palette left a bare "Search…" button
   * floating inside what was meant to be a fully-dismissed overlay. */
  onRequestClose?: () => void;
}

export default function CommandPalette({ startOpen = false, onRequestClose }: CommandPaletteProps) {
  const [open, setOpen] = useState(startOpen);
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const router = useRouter();
  const index = useMemo(() => buildSearchIndex(), []);
  const results = useMemo(() => filterSearch(query, index, 14), [query, index]);

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(open);

  const close = () => {
    setOpen(false);
    onRequestClose?.();
  };

  // Reset the highlight whenever the candidate list changes, so it can never
  // point past the end of a shorter result set from a previous query. Done
  // during render — the "adjusting state when a prop changes" pattern from
  // the React docs — rather than in an effect, which would cost an extra
  // render pass for what is otherwise a synchronous derivation. Must use
  // `useState` rather than a ref here: mutating a ref during render is
  // exactly the untracked side effect this pattern is meant to avoid.
  const [prevQuery, setPrevQuery] = useState(query);
  if (prevQuery !== query) {
    setPrevQuery(query);
    if (highlightedIndex !== 0) setHighlightedIndex(0);
  }

  // Return focus to whatever opened the palette once it closes — otherwise a
  // keyboard user's focus is simply dropped, since the dialog they were in
  // has just unmounted.
  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  // Keep the highlighted option scrolled into view. The list is
  // max-h-[360px] overflow-y-auto with up to 14 results, so arrow-key
  // navigation can otherwise move aria-activedescendant past the visible
  // viewport with no visual indication of where it went.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`#command-palette-option-${highlightedIndex}`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [open, highlightedIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Compare case-insensitively: with Shift held the browser reports 'K'.
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape' && open) close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSelect = (item: SearchItem) => {
    close();
    setQuery('');
    router.push(item.href);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[highlightedIndex];
      if (item) handleSelect(item);
    }
  };

  // Wraps Tab/Shift+Tab between the panel's first and last focusable
  // elements. `role="dialog" aria-modal="true"` on its own is a promise to
  // assistive tech that background content is unreachable while open — it
  // doesn't enforce that promise. Without this, Tab from the last result
  // (or Shift+Tab from the search input) lands on whatever's next in DOM
  // order outside the dialog (e.g. the navbar's theme toggle), which is only
  // visually covered by the backdrop, not actually removed from the tab
  // sequence.
  const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const iconFor = (type: SearchItem['type']) => {
    if (type === 'topic') return BookOpen;
    if (type === 'visualizer') return Sparkles;
    return Layout;
  };

  const activeOptionId =
    results.length > 0 ? `command-palette-option-${highlightedIndex}` : undefined;

  if (!open) {
    return (
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface/80 text-muted-foreground text-xs hover:text-foreground hover:border-primary/30 transition-all cursor-pointer min-w-[200px]"
      >
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={close}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="glass-panel w-full max-w-xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handlePanelKeyDown}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            autoFocus
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-listbox"
            aria-activedescendant={activeOptionId}
            aria-autocomplete="list"
            aria-label="Search topics, visualizers, pages"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search topics, visualizers, pages..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="text-[10px] font-mono text-muted-foreground">ESC</kbd>
        </div>
        <ul
          ref={listRef}
          id="command-palette-listbox"
          role="listbox"
          aria-label="Search results"
          className="max-h-[360px] overflow-y-auto py-2"
        >
          {results.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">No results found.</li>
          ) : (
            results.map((item, i) => {
              const Icon = iconFor(item.type);
              const isHighlighted = i === highlightedIndex;
              return (
                <li key={item.id} role="presentation">
                  <button
                    id={`command-palette-option-${i}`}
                    role="option"
                    aria-selected={isHighlighted}
                    type="button"
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer group ${
                      isHighlighted ? 'bg-muted/60' : 'hover:bg-muted/60'
                    }`}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    onClick={() => handleSelect(item)}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{item.subtitle}</p>
                    </div>
                    <ArrowRight
                      className={`h-3.5 w-3.5 text-muted-foreground transition-opacity ${
                        isHighlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })
          )}
        </ul>
        <div className="px-4 py-2 border-t border-border text-[10px] text-muted-foreground flex justify-between">
          <span>↑↓ to navigate · Enter to open</span>
          <Link href="/topics" onClick={close} className="text-primary font-semibold hover:underline">
            Browse all topics
          </Link>
        </div>
      </div>
    </div>
  );
}
