'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen, Map, User, Code, ArrowRight, CheckCircle2, Flame, Sparkles, ChevronRight, Zap,
  Layers, Calendar, BarChart3, Search, Trophy, Database, Network, Share2, Cpu,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { categories, topics, problems } from '@/data';
import { VISUALIZER_COUNT } from '@/data/visualizers';

export default function Home() {
  const { profile, completedLessons, bookmarks, loginMockUser } = useAppStore();

  const totalLessons = topics.length;
  const completedCount = completedLessons.length;
  const completionPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Live sorting animation for hero
  const [bars, setBars] = useState([40, 15, 85, 30, 65, 50]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [swapIndices, setSwapIndices] = useState<number[]>([]);

  useEffect(() => {
    let arr = [40, 15, 85, 30, 65, 50];
    let i = 0, j = 0;

    const interval = setInterval(() => {
      if (j + 1 >= arr.length) {
        j = 0;
        i++;
        if (i >= arr.length - 1) {
          arr = [40, 15, 85, 30, 65, 50];
          i = 0;
        }
        return;
      }

      setActiveIndices([j, j + 1]);
      setSwapIndices([]);

      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        setSwapIndices([j, j + 1]);
      }

      setBars([...arr]);

      j++;
      if (j >= arr.length - i - 1) {
        j = 0;
        i++;
        if (i >= arr.length - 1) {
          arr = [40, 15, 85, 30, 65, 50];
          i = 0;
          j = 0;
        }
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: BookOpen, title: `${totalLessons} Deep Topics`, desc: 'Arrays to dynamic programming — theory, complexity, and interview patterns.', href: '/topics', span: 'col-span-12 md:col-span-6' },
    { icon: Sparkles, title: `${VISUALIZER_COUNT} Visualizers`, desc: 'Step-through sandboxes for sorts, graphs, trees, and more.', href: '/visualizer', span: 'col-span-12 md:col-span-6' },
    { icon: Trophy, title: `${problems.length} Coding Problems`, desc: 'Challenge yourself with LeetCode and Codeforces tasks inside the Coding Arena.', href: '/problems', span: 'col-span-12 md:col-span-6' },
    { icon: Calendar, title: 'Daily Challenge', desc: 'One curated problem per day with XP rewards.', href: '/daily', span: 'col-span-6 md:col-span-3' },
    { icon: Layers, title: 'Pattern Library', desc: 'Structured paths from foundations to advanced patterns.', href: '/patterns', span: 'col-span-6 md:col-span-3' },
    { icon: BarChart3, title: 'Complexity Lab', desc: 'Compare Big-O across algorithms with live estimators.', href: '/labs', span: 'col-span-6 md:col-span-3' },
    { icon: Search, title: '⌘K Command Palette', desc: 'Instant search across every topic, visualizer, and page.', href: '/topics', span: 'col-span-6 md:col-span-3' },
  ];

  return (
    <div className="flex flex-col gap-20 py-4 w-full animate-fade-in">

      {/* ─── HERO SECTION ─── */}
      <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 modern-card p-6 md:p-10 hero-card-bg">

        {/* Left: Copy */}
        <div className="flex-1 flex flex-col gap-6 items-start">
          <span className="badge badge-primary text-xs">
            <Zap className="h-3 w-3" /> Interactive Learning Platform
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-foreground">
            Learn DSA the{' '}
            <span className="gradient-text">right way</span>
          </h1>

          <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Stop watching passive tutorials. Visualize every step, trace every pointer, and build real understanding of data structures and algorithms.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              href="/roadmap"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg btn-primary cursor-pointer"
            >
              <Map className="h-4 w-4" /> Start Learning <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/problems"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg btn-secondary cursor-pointer"
            >
              <Trophy className="h-4 w-4" /> Coding Arena
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" />
              <strong className="text-foreground">{totalLessons}</strong> topics
            </span>
            <span className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-primary" />
              <strong className="text-foreground">{problems.length}</strong> problems
            </span>
            <span className="flex items-center gap-1.5">
              <Code className="h-4 w-4 text-primary" />
              <strong className="text-foreground">4</strong> languages
            </span>
          </div>
        </div>


        {/* Right: Live Sort Animation */}
        <div className="flex-1 w-full max-w-md">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted-foreground">Bubble Sort — Live</span>
              <span className="flex h-2 w-2 rounded-full bg-complete animate-pulse" />
            </div>

            {/* Bars */}
            <div className="flex items-end justify-center gap-2 h-36 mb-4">
              {bars.map((val, idx) => {
                const isActive = activeIndices.includes(idx);
                const isSwap = swapIndices.includes(idx);
                const heightPct = (val / 100) * 100;

                let barClass = 'bg-primary/20 border-primary/30';
                if (isSwap) barClass = 'bg-hard/30 border-hard/50';
                else if (isActive) barClass = 'bg-accent/30 border-accent/50';

                return (
                  <div key={idx} className="flex flex-col items-center flex-1 max-w-8 h-full justify-end">
                    <span className="text-[10px] font-mono font-semibold text-muted-foreground mb-1">{val}</span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-md border-t border-x transition-all duration-300 ${barClass}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Code snippet preview */}
            <div className="bg-muted rounded-lg p-3 font-mono text-[11px] text-muted-foreground leading-relaxed">
              <div><span className="text-accent">for</span> i <span className="text-accent">in</span> <span className="text-primary">range</span>(n):</div>
              <div className="pl-4"><span className="text-accent">for</span> j <span className="text-accent">in</span> <span className="text-primary">range</span>(n-i-1):</div>
              <div className="pl-8"><span className="text-accent">if</span> arr[j] {'>'} arr[j+1]:</div>
              <div className="pl-12"><span className="text-muted-foreground">swap(arr[j], arr[j+1])</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── USER PROGRESS ─── */}
      {profile ? (
        <section className="card p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src={profile.avatar_url}
                alt="Avatar"
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl border border-border"
                unoptimized
              />
              <div>
                <h2 className="text-lg font-bold text-foreground">{profile.username}</h2>
                <div className="flex gap-2 mt-1">
                  <span className="badge badge-primary">
                    <Flame className="h-3 w-3" /> {profile.streak_count} day streak
                  </span>
                  <span className="badge badge-complete">
                    <CheckCircle2 className="h-3 w-3" /> {completedCount}/{totalLessons} done
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-72">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Progress</span>
                <span className="font-semibold text-foreground">{completionPercent}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${completionPercent}%` }} />
              </div>
            </div>
          </div>

          <hr className="border-border my-5" />

          {/* Quick actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="surface p-4 rounded-xl flex flex-col gap-2">
              <span className="text-xs font-medium text-muted-foreground">Continue Learning</span>
              <p className="text-sm font-semibold text-foreground">
                {topics.find(t => !completedLessons.includes(t.slug))?.title || 'All done!'}
              </p>
              {topics.find(t => !completedLessons.includes(t.slug)) && (
                <Link
                  href={`/topics/${topics.find(t => !completedLessons.includes(t.slug))?.slug}`}
                  className="text-xs text-primary font-semibold hover:underline mt-auto flex items-center gap-1"
                >
                  Resume <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>

            <div className="surface p-4 rounded-xl flex flex-col gap-2">
              <span className="text-xs font-medium text-muted-foreground">Bookmarks</span>
              <p className="text-2xl font-bold text-foreground">{bookmarks.length}</p>
              <Link href="/bookmarks" className="text-xs text-primary font-semibold hover:underline mt-auto flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="surface p-4 rounded-xl flex flex-col gap-2">
              <span className="text-xs font-medium text-muted-foreground">Daily Goal</span>
              <p className="text-sm text-muted-foreground">Complete one topic per day to maintain your streak.</p>
              <Link href="/roadmap" className="text-xs text-primary font-semibold hover:underline mt-auto flex items-center gap-1">
                Roadmap <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Track Your Progress</h3>
              <p className="text-xs text-muted-foreground">Sign in to save bookmarks, track completed topics, and build streaks.</p>
            </div>
          </div>
          <button
            onClick={() => loginMockUser('AlgoMaster')}
            className="px-5 py-2.5 text-sm font-semibold rounded-lg btn-primary cursor-pointer shrink-0"
          >
            Sign In
          </button>
        </section>
      )}

      {/* ─── FEATURES BENTO ─── */}
      <section className="flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Everything you need to master DSA</h2>
          <p className="text-sm text-muted-foreground mt-2">Lessons, labs, daily challenges, patterns, and a full command palette.</p>
        </div>

        <div className="bento-grid">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.title}
                href={f.href}
                className={`modern-card hover-lift flex flex-col gap-3 p-5 group ${f.span}`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{f.desc}</p>
                <span className="text-[11px] font-semibold text-primary flex items-center gap-1">
                  Explore <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── TOPIC CATEGORIES ─── */}
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Explore Topics</h2>
            <p className="text-sm text-muted-foreground mt-1">Organized by category, from fundamentals to advanced.</p>
          </div>
          <Link href="/topics" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {categories.map((cat) => {
            const catTopics = topics.filter(t => t.category_id === cat.id);
            const catCompleted = catTopics.filter(t => completedLessons.includes(t.slug)).length;

            const categoryConfigs: Record<string, {
              colorClass: string;
              borderHover: string;
              bgTint: string;
              badgeStyle: string;
              icon: React.ComponentType<{ className?: string }>;
            }> = {
              linear: {
                colorClass: 'text-primary',
                borderHover: 'hover:border-primary/45 hover:shadow-primary/5',
                bgTint: 'bg-primary/10 border-primary/20 text-primary',
                badgeStyle: 'bg-primary/10 text-primary border border-primary/25',
                icon: Database,
              },
              trees: {
                colorClass: 'text-accent',
                borderHover: 'hover:border-accent/45 hover:shadow-accent/5',
                bgTint: 'bg-accent/10 border-accent/20 text-accent',
                badgeStyle: 'bg-accent/10 text-accent border border-accent/25',
                icon: Network,
              },
              graphs: {
                colorClass: 'text-emerald-400',
                borderHover: 'hover:border-emerald-500/45 hover:shadow-emerald-500/5',
                bgTint: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                badgeStyle: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25',
                icon: Share2,
              },
              algorithms: {
                colorClass: 'text-rose-400',
                borderHover: 'hover:border-rose-500/45 hover:shadow-rose-500/5',
                bgTint: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
                badgeStyle: 'bg-rose-500/10 text-rose-400 border border-rose-500/25',
                icon: Cpu,
              },
              patterns: {
                colorClass: 'text-amber-400',
                borderHover: 'hover:border-amber-500/45 hover:shadow-amber-500/5',
                bgTint: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
                badgeStyle: 'bg-amber-500/10 text-amber-400 border border-amber-500/25',
                icon: Sparkles,
              },
            };

            const config = categoryConfigs[cat.slug] || {
              colorClass: 'text-primary',
              borderHover: 'hover:border-primary/45 hover:shadow-primary/5',
              bgTint: 'bg-primary/10 border-primary/20 text-primary',
              badgeStyle: 'bg-primary/10 text-primary border border-primary/25',
              icon: BookOpen,
            };

            const CatIcon = config.icon;

            return (
              <div 
                key={cat.id} 
                className={`card p-5 flex flex-col gap-4 bg-[#161b26]/30 backdrop-blur-md border border-white/5 hover:shadow-lg transition-all duration-300 ${config.borderHover}`}
              >
                <div className="flex items-start gap-3.5 text-left">
                  <div className={`p-2.5 rounded-xl border shrink-0 ${config.bgTint}`}>
                    <CatIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-foreground truncate">{cat.title}</h3>
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full shrink-0 ${config.badgeStyle}`}>
                        {profile ? `${catCompleted}/${catTopics.length} done` : `${catTopics.length} topics`}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  {catTopics.map((top) => {
                    const done = completedLessons.includes(top.slug);
                    return (
                      <Link
                        key={top.id}
                        href={`/topics/${top.slug}`}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-all duration-200 ${
                          done
                            ? 'bg-complete/10 border-complete/20 text-complete hover:bg-complete/15'
                            : 'bg-surface/40 border-border/40 text-muted-foreground/90 hover:border-muted hover:text-foreground hover:bg-surface-hover/80'
                        }`}
                      >
                        {done ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {top.title}
                          </span>
                        ) : (
                          top.title
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="text-center py-12 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">Ready to start?</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Follow the structured roadmap, visualize every algorithm, and track your progress as you go.
        </p>
        <Link
          href="/roadmap"
          className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg btn-primary cursor-pointer mt-2"
        >
          Start the Roadmap <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

    </div>
  );
}
