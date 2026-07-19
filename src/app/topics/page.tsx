'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { categories, topics } from '@/data';

export default function TopicsPage() {
  const { completedLessons, bookmarks } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            topic.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'All' ||
                              categories.find(c => c.slug === selectedCategory)?.id === topic.category_id;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, selectedDifficulty, selectedCategory]);

  return (
    <div className="flex flex-col gap-8 py-4 w-full animate-fade-in">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">All Topics</h1>
        <p className="text-sm text-muted-foreground">
          Browse all data structures and algorithms. Each topic includes theory, visualizers, code, and practice problems.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics..."
            className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
          />
        </div>

        {/* Category filter */}
        <select
          aria-label="Filter by category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
        >
          <option value="All">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.slug}>{c.title}</option>
          ))}
        </select>

        {/* Difficulty filter */}
        <select
          aria-label="Filter by difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Results count */}
        <span className="text-xs text-muted-foreground ml-auto">
          {filteredTopics.length} topic{filteredTopics.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {filteredTopics.length === 0 ? (
          <div className="col-span-full py-16 text-center surface rounded-xl flex flex-col items-center gap-3">
            <Search className="h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No topics match your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedDifficulty('All'); setSelectedCategory('All'); }}
              className="text-sm text-primary font-semibold hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isCompleted = completedLessons.includes(topic.slug);
            const isSaved = bookmarks.includes(topic.slug);
            const cat = categories.find(c => c.id === topic.category_id);

            const diffBadge =
              topic.difficulty === 'Beginner' ? 'badge-easy' :
              topic.difficulty === 'Intermediate' ? 'badge-medium' :
              'badge-hard';

            return (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="topic-card group min-h-[14rem] h-full"
              >
                <div className="flex flex-col gap-3">
                  {/* Top row: category + badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {cat?.title || 'General'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 text-complete" />}
                      {isSaved && <Bookmark className="h-3.5 w-3.5 text-primary fill-primary/20" />}
                      <span className={`badge ${diffBadge}`}>{topic.difficulty}</span>
                    </div>
                  </div>

                  {/* Title + description */}
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {topic.definition}
                  </p>
                </div>

                {/* Bottom: complexity + arrow */}
                <div className="flex items-end justify-between pt-3 border-t border-border mt-auto">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                    <span>Time: <strong className="text-foreground">{topic.time_complexity_average || 'O(N)'}</strong></span>
                    <span>Space: <strong className="text-foreground">{topic.space_complexity || 'O(1)'}</strong></span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-surface group-hover:bg-primary/10 transition-colors">
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
