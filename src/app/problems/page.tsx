'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, CheckCircle2, Circle, Trophy, Award, Flame, ExternalLink, RefreshCw } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { problems, categories } from '@/data';

const problemCategoryOptions = Array.from(new Set(problems.map((problem) => problem.category)))
  .sort((left, right) => {
    const leftTitle = categories.find((category) => category.slug === left)?.title ?? left;
    const rightTitle = categories.find((category) => category.slug === right)?.title ?? right;
    return leftTitle.localeCompare(rightTitle);
  })
  .map((categorySlug) => ({
    value: categorySlug,
    label: categories.find((category) => category.slug === categorySlug)?.title ?? categorySlug,
  }));

export default function ProblemsArenaPage() {
  const { completedProblems, toggleProblemCompletion } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Filter logic
  const filteredProblems = useMemo(() => {
    // Reset page to 1 when filters change
    return problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
      const matchesSource = selectedSource === 'All' || problem.source === selectedSource;
      const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;

      return matchesSearch && matchesDifficulty && matchesSource && matchesCategory;
    });
  }, [searchQuery, selectedDifficulty, selectedSource, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage) || 1;
  const paginatedProblems = useMemo(() => {
    // Ensure currentPage is within bounds
    const page = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (page - 1) * itemsPerPage;
    return filteredProblems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProblems, currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (type: string, value: string) => {
    if (type === 'search') setSearchQuery(value);
    if (type === 'difficulty') setSelectedDifficulty(value);
    if (type === 'source') setSelectedSource(value);
    if (type === 'category') setSelectedCategory(value);
    setCurrentPage(1);
  };

  const completionRate = Math.round((completedProblems.length / problems.length) * 100);

  return (
    <div className="flex flex-col gap-8 py-4 w-full animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">Coding Arena</h1>
        <p className="text-sm text-muted-foreground">
          Master data structures and algorithms by solving {problems.length} problems curated from LeetCode and Codeforces.
        </p>
      </div>

      {/* Stats Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {/* Progress Card */}
        <div className="card p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Trophy className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1 w-full text-left">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Overall Progress</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold text-foreground">{completedProblems.length}</span>
              <span className="text-xs text-muted-foreground">/ {problems.length} solved</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-border/40 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-500" 
                style={{ width: `${completionRate}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Completion rate Card */}
        <div className="card p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-complete/10 border border-complete/20 text-complete">
            <Award className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Completion Rate</span>
            <span className="text-xl font-black text-foreground mt-0.5">{completionRate}%</span>
            <span className="text-xs text-muted-foreground">Level up your problem solving</span>
          </div>
        </div>

        {/* XP Reward Card */}
        <div className="card p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
            <Flame className="h-6 w-6 animate-pulse" />
          </div>
          <div className="flex flex-col gap-1 text-left">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">XP Earned</span>
            <span className="text-xl font-black text-accent mt-0.5">+{completedProblems.length * 50} XP</span>
            <span className="text-xs text-muted-foreground">50 XP per problem solved</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col xl:flex-row gap-3 xl:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search problems by name, topic or ID..."
            className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all font-medium"
          />
        </div>

        {/* Filters Wrapper */}
        <div className="flex flex-wrap gap-2.5">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer font-medium"
          >
            <option value="All">All Categories</option>
            {problemCategoryOptions.map((category) => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer font-medium"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Source Filter */}
          <select
            value={selectedSource}
            onChange={(e) => handleFilterChange('source', e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer font-medium"
          >
            <option value="All">All Platforms</option>
            <option value="LeetCode">LeetCode</option>
            <option value="Codeforces">Codeforces</option>
          </select>

          {/* Reset Filters */}
          {(searchQuery || selectedDifficulty !== 'All' || selectedSource !== 'All' || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
                setSelectedSource('All');
                setSelectedCategory('All');
                setCurrentPage(1);
              }}
              className="flex items-center gap-1 px-3 py-2 bg-surface border border-border hover:bg-muted text-xs text-muted-foreground hover:text-foreground rounded-lg transition-all cursor-pointer font-medium"
            >
              <RefreshCw className="h-3 w-3" /> Reset
            </button>
          )}
        </div>

        {/* Total found */}
        <span className="text-xs text-muted-foreground xl:ml-auto select-none font-medium">
          Found {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Problems Table/List */}
      <div className="card w-full overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 font-mono text-[10px] text-muted-foreground uppercase select-none">
                <th className="py-3 px-4 font-bold text-center w-12">Status</th>
                <th className="py-3 px-4 font-bold w-20">ID</th>
                <th className="py-3 px-4 font-bold">Title</th>
                <th className="py-3 px-4 font-bold w-32">Topic</th>
                <th className="py-3 px-4 font-bold w-24">Platform</th>
                <th className="py-3 px-4 font-bold w-24">Difficulty</th>
                <th className="py-3 px-4 font-bold w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {paginatedProblems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-muted-foreground">
                    No coding problems match your search filters.
                  </td>
                </tr>
              ) : (
                paginatedProblems.map((problem) => {
                  const isCompleted = completedProblems.includes(problem.id);

                  // Colors
                  const diffColor =
                    problem.difficulty === 'Easy' ? 'text-complete border-complete/35 bg-complete/5' :
                    problem.difficulty === 'Medium' ? 'text-primary border-primary/35 bg-primary/5' :
                    'text-rose-500 border-rose-500/35 bg-rose-500/5';

                  const sourceColor =
                    problem.source === 'LeetCode' ? 'text-amber-500 border-amber-500/25 bg-amber-500/5' :
                    'text-sky-500 border-sky-500/25 bg-sky-500/5';

                  return (
                    <tr 
                      key={problem.id} 
                      className={`hover:bg-muted/20 transition-all group ${
                        isCompleted ? 'bg-complete/[0.01]' : ''
                      }`}
                    >
                      {/* Completion checkmark */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => toggleProblemCompletion(problem.id)}
                          className="text-muted-foreground hover:text-complete transition-colors cursor-pointer"
                          title={isCompleted ? "Mark unsolved" : "Mark solved"}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-complete fill-complete/10" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground/30 hover:text-complete/50" />
                          )}
                        </button>
                      </td>

                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono text-xs font-semibold text-muted-foreground">
                        {problem.id.toUpperCase()}
                      </td>

                      {/* Title */}
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/problems/${problem.id}`}
                          className="text-sm font-semibold text-foreground hover:text-primary transition-colors group-hover:underline"
                        >
                          {problem.title}
                        </Link>
                      </td>

                      {/* Topic */}
                      <td className="py-3.5 px-4">
                        <span className="text-xs font-medium text-muted-foreground bg-muted/65 px-2 py-0.5 rounded-md">
                          {problem.topic}
                        </span>
                      </td>

                      {/* Platform */}
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold border px-1.5 py-0.5 rounded-md ${sourceColor}`}>
                          {problem.source}
                        </span>
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold border px-1.5 py-0.5 rounded-md ${diffColor}`}>
                          {problem.difficulty}
                        </span>
                      </td>

                      {/* Link action button */}
                      <td className="py-3.5 px-4 text-center">
                        <Link
                          href={`/problems/${problem.id}`}
                          className="inline-flex p-1.5 rounded-lg bg-surface border border-border group-hover:bg-primary/10 group-hover:text-primary transition-all hover:scale-105"
                          title="Open problem workspace"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-2 select-none">
          <span className="text-xs text-muted-foreground">
            Page <strong className="text-foreground">{currentPage}</strong> of <strong className="text-foreground">{totalPages}</strong>
          </span>

          <div className="flex gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-semibold hover:bg-muted text-foreground transition-all disabled:opacity-40 disabled:hover:bg-surface disabled:cursor-not-allowed cursor-pointer"
            >
              Prev
            </button>

            {/* Render a limited set of page numbers */}
            {(() => {
              const pages = [];
              const maxVisible = 5;
              let start = Math.max(1, currentPage - 2);
              const end = Math.min(totalPages, start + maxVisible - 1);
              
              if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
              }

              for (let p = start; p <= end; p++) {
                pages.push(p);
              }

              return pages.map(p => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === p
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface border border-border hover:bg-muted text-foreground'
                  }`}
                >
                  {p}
                </button>
              ));
            })()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-semibold hover:bg-muted text-foreground transition-all disabled:opacity-40 disabled:hover:bg-surface disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
