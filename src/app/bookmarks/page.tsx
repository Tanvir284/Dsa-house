'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Bookmark, Trash2, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { topics, categories } from '@/data';

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useAppStore();

  const bookmarkedTopics = useMemo(() => {
    return topics.filter((t) => bookmarks.includes(t.slug));
  }, [bookmarks]);

  return (
    <div className="flex flex-col gap-8 py-4 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bookmarks</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Topics you&apos;ve saved for later review.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {bookmarkedTopics.length === 0 ? (
          <div className="col-span-full py-16 text-center surface rounded-xl flex flex-col items-center gap-4">
            <Bookmark className="h-10 w-10 text-muted-foreground/30" />
            <div>
              <p className="text-sm text-muted-foreground font-medium">No bookmarks yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Save topics from their lesson pages.</p>
            </div>
            <Link href="/topics" className="px-4 py-2 text-sm font-semibold rounded-lg btn-primary cursor-pointer">
              Browse Topics
            </Link>
          </div>
        ) : (
          bookmarkedTopics.map((topic) => {
            const cat = categories.find(c => c.id === topic.category_id);
            const diffBadge =
              topic.difficulty === 'Beginner' ? 'badge-easy' :
              topic.difficulty === 'Intermediate' ? 'badge-medium' : 'badge-hard';

            return (
              <div key={topic.id} className="card p-5 flex flex-col gap-4 group">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] text-muted-foreground">{cat?.title}</span>
                    <span className={`badge ${diffBadge}`}>{topic.difficulty}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{topic.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{topic.definition}</p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-border mt-auto">
                  <button
                    onClick={() => toggleBookmark(topic.slug)}
                    className="p-2 rounded-lg btn-ghost hover:text-hard cursor-pointer"
                    title="Remove bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/topics/${topic.slug}`}
                    className="px-4 py-2 text-xs font-semibold rounded-lg btn-primary flex items-center gap-1 cursor-pointer"
                  >
                    Study <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
