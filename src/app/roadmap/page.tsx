'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen, Check, Lock, AlertCircle, ArrowRight, Sparkles, Compass, Flag, Trophy,
  Rocket, ChevronDown, Navigation,
  BarChart3, Link2, ArrowDownToLine, ArrowUpFromLine, Search, Pointer, Droplets, FolderTree,
  RotateCw, Shuffle, Zap, GalleryVertical, TreeDeciduous, TreePine, Mountain, Globe, Waypoints,
  Type, Target, Puzzle,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { categories, topics } from '@/data';

const MotionLink = motion(Link);


interface SkillNode {
  slug: string;
  label: string;
  icon: LucideIcon;
  chapter: number;
  prereqs: string[];
}

interface Chapter {
  id: number;
  title: string;
  tagline: string;
  accent: string;
  gradient: string;
}

/**
 * The journey is told in five "chapters" that flow top-down.
 * Nodes inside each chapter alternate sides of a central spine so the eye
 * naturally zigzags from the strategic top down to the advanced bottom.
 */
const CHAPTERS: Chapter[] = [
  { id: 0, title: 'The Foundations', tagline: 'Where every journey begins — the building blocks of data.', accent: '#22c55e', gradient: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)' },
  { id: 1, title: 'Order & Search',  tagline: 'Learn to arrange and find things with purpose.',            accent: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4 0%, #4f9dff 100%)' },
  { id: 2, title: 'Divide & Conquer', tagline: 'Break big problems into smaller, solvable ones.',          accent: '#4f9dff', gradient: 'linear-gradient(135deg, #4f9dff 0%, #8b5cf6 100%)' },
  { id: 3, title: 'Trees & Graphs',  tagline: 'Explore branching worlds and connected networks.',          accent: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' },
  { id: 4, title: 'The Advanced Arts', tagline: 'Master the techniques that crack the hardest problems.',  accent: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' },
];

/** Visual metadata only — prerequisites come from curriculum `topics`. */
const ROADMAP_META: Record<string, { label: string; icon: LucideIcon; chapter: number }> = {
  array:                   { label: 'Arrays',            icon: BarChart3,       chapter: 0 },
  'linked-list':           { label: 'Linked Lists',      icon: Link2,           chapter: 0 },
  stack:                   { label: 'Stacks',            icon: ArrowDownToLine, chapter: 0 },
  queue:                   { label: 'Queues',            icon: ArrowUpFromLine, chapter: 0 },

  'binary-search':         { label: 'Binary Search',     icon: Search,          chapter: 1 },
  'two-pointers':          { label: 'Two Pointers',      icon: Pointer,         chapter: 1 },
  'bubble-sort':           { label: 'Bubble Sort',       icon: Droplets,        chapter: 1 },
  'hash-table':            { label: 'Hash Table',        icon: FolderTree,      chapter: 1 },

  'recursion-backtracking': { label: 'Recursion',        icon: RotateCw,        chapter: 2 },
  'merge-sort':            { label: 'Merge Sort',        icon: Shuffle,         chapter: 2 },
  'quick-sort':            { label: 'Quick Sort',        icon: Zap,             chapter: 2 },
  'sliding-window':        { label: 'Sliding Window',    icon: GalleryVertical, chapter: 2 },

  'binary-tree':           { label: 'Binary Trees',      icon: TreeDeciduous,   chapter: 3 },
  'binary-search-tree':    { label: 'BST',               icon: TreePine,        chapter: 3 },
  'heap-priority-queue':   { label: 'Heap',              icon: Mountain,        chapter: 3 },
  bfs:                     { label: 'BFS',               icon: Globe,           chapter: 3 },
  dfs:                     { label: 'DFS',               icon: Waypoints,       chapter: 3 },

  'trie-prefix-tree':      { label: 'Trie',              icon: Type,            chapter: 4 },
  'greedy-algorithms':     { label: 'Greedy',            icon: Target,          chapter: 4 },
  'dynamic-programming':   { label: 'DP',                icon: Puzzle,          chapter: 4 },
};

const ROADMAP_SLUG_ORDER = Object.keys(ROADMAP_META);

function buildRoadmapGraph() {
  const skillNodes: SkillNode[] = ROADMAP_SLUG_ORDER.map((slug) => {
    const topic = topics.find((t) => t.slug === slug);
    const meta = ROADMAP_META[slug];
    return {
      slug,
      label: meta.label,
      icon: meta.icon,
      chapter: meta.chapter,
      prereqs: (topic?.prerequisites ?? []).filter((p) => ROADMAP_META[p] !== undefined),
    };
  });

  return { skillNodes };
}

const { skillNodes } = buildRoadmapGraph();

/** Journey order for the traveller (chapter, then original layout order). */
const journeyOrder = [...skillNodes].sort(
  (a, b) => a.chapter - b.chapter || ROADMAP_SLUG_ORDER.indexOf(a.slug) - ROADMAP_SLUG_ORDER.indexOf(b.slug)
);

export default function RoadmapPage() {
  const { completedLessons } = useAppStore();
  const [selectedSlug, setSelectedSlug] = useState<string>('array');
  const reduceMotion = useReducedMotion();

  // Track which nodes have JUST been unlocked to fire a one-shot unlock ring.
  const prevUnlockedRef = useRef<Set<string>>(new Set());
  const [justUnlocked, setJustUnlocked] = useState<Set<string>>(new Set());

  const isNodeLocked = (node: SkillNode) =>
    node.prereqs.filter((p) => !completedLessons.includes(p)).length > 0;

  useEffect(() => {
    const nowUnlocked = new Set(
      skillNodes.filter((n) => !isNodeLocked(n) && !completedLessons.includes(n.slug)).map((n) => n.slug)
    );
    const fresh = new Set<string>();
    nowUnlocked.forEach((slug) => {
      if (!prevUnlockedRef.current.has(slug)) fresh.add(slug);
    });
    prevUnlockedRef.current = nowUnlocked;
    if (fresh.size > 0) {
      setJustUnlocked(fresh);
      const t = setTimeout(() => setJustUnlocked(new Set()), 1200);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedLessons]);

  const selectedNode = useMemo(
    () => skillNodes.find((n) => n.slug === selectedSlug) ?? skillNodes[0],
    [selectedSlug]
  );
  const selectedTopic = topics.find((t) => t.slug === selectedNode.slug);
  const topicCategory = categories.find((c) => c.id === selectedTopic?.category_id);

  const unsatisfiedPrereqs = selectedNode.prereqs.filter((p) => !completedLessons.includes(p));
  const isSelectedLocked = unsatisfiedPrereqs.length > 0;

  const totalNodes = skillNodes.length;
  const completedNodes = skillNodes.filter((n) => completedLessons.includes(n.slug)).length;
  const progressPct = totalNodes ? Math.round((completedNodes / totalNodes) * 100) : 0;

  const travellerNode = useMemo(() => {
    const done = journeyOrder.filter((n) => completedLessons.includes(n.slug));
    return done.length > 0 ? done[done.length - 1] : journeyOrder[0];
  }, [completedLessons]);

  const nextMilestone = useMemo(
    () =>
      journeyOrder.find(
        (n) => !completedLessons.includes(n.slug) && !isNodeLocked(n)
      ) ?? null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [completedLessons]
  );

  // Scroll-linked animated spine progress
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 40%', 'end 60%'],
  });
  const spineProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 });

  // Group nodes by chapter for the vertical layout
  const chaptersWithNodes = useMemo(
    () =>
      CHAPTERS.map((chapter) => ({
        ...chapter,
        nodes: skillNodes.filter((n) => n.chapter === chapter.id),
      })),
    []
  );

  return (
    <div className="flex flex-col gap-10 py-4 w-full">

      {/* ================================================================
         HERO — strategic overview (top of the vertical hierarchy)
      ================================================================ */}
      <motion.section
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl glass-card blob-glow p-6 sm:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-glass-border px-3 py-1.5"
                 style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
              <Compass className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] gradient-text">Your DSA Expedition</span>
            </div>

            <h1 className="font-black leading-[1.05]" style={{ fontSize: 'clamp(2rem, 4vw + 1rem, 3.5rem)' }}>
              The <span className="gradient-text text-glow">Learning Journey</span>
            </h1>

            <p className="text-[15px] text-muted-foreground max-w-xl leading-relaxed">
              Scroll from the shores of the <span className="text-foreground font-semibold">Foundations</span> down through five chapters
              toward mastery of the <span className="text-foreground font-semibold">Advanced Arts</span>. Every milestone you conquer lights
              the trail below.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-2">
              {nextMilestone ? (
                <button
                  onClick={() => {
                    setSelectedSlug(nextMilestone.slug);
                    document.getElementById(`milestone-${nextMilestone.slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="btn-primary px-5 py-2.5 text-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <Rocket className="h-4 w-4" /> Continue with {nextMilestone.label}
                </button>
              ) : completedNodes === totalNodes ? (
                <span className="btn-primary px-5 py-2.5 text-sm inline-flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Journey Complete
                </span>
              ) : null}
              <a
                href="#timeline"
                className="btn-secondary px-5 py-2.5 text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                Explore the map <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Circular progress emblem + stats */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end gap-6">
            <div className="relative h-32 w-32 sm:h-36 sm:w-36">
              <svg viewBox="0 0 100 100" className="-rotate-90 h-full w-full">
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent-from)" />
                    <stop offset="100%" stopColor="var(--accent-to)" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border-strong, var(--border))" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none" stroke="url(#progressGradient)" strokeWidth="8" strokeLinecap="round"
                  pathLength={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: totalNodes ? completedNodes / totalNodes : 0 }}
                  transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                  style={{ filter: 'drop-shadow(0 0 8px color-mix(in srgb, var(--primary) 45%, transparent))' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-black gradient-text leading-none">{progressPct}%</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Conquered</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-complete" />
                <span><span className="text-foreground font-bold">{completedNodes}</span>/{totalNodes} milestones</span>
              </div>
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-primary" />
                <span>Chapter <span className="text-foreground font-bold">{travellerNode.chapter + 1}</span>/{CHAPTERS.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>{skillNodes.filter((n) => !isNodeLocked(n) && !completedLessons.includes(n.slug)).length} ready to explore</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================================================================
         LEGEND — sticky secondary nav
      ================================================================ */}
      <div className="sticky top-20 z-30 -mx-2 px-2">
        <div className="glass-panel rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-complete" /> Conquered</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" /> Ready</span>
            <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Locked</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
            <span>Scroll to descend</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </div>
        </div>
      </div>

      {/* ================================================================
         MAIN LAYOUT — vertical timeline (left) + sticky detail (right)
      ================================================================ */}
      <div id="timeline" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* ------- VERTICAL TIMELINE ------- */}
        <div ref={timelineRef} className="lg:col-span-2 relative">

          {/* Central spine — track + animated fill driven by scroll */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full pointer-events-none"
               style={{ background: 'color-mix(in srgb, var(--foreground) 8%, transparent)' }} aria-hidden />
          <motion.div
            className="absolute left-8 sm:left-1/2 top-0 w-1 -translate-x-1/2 rounded-full pointer-events-none origin-top"
            style={{
              background: 'linear-gradient(180deg, #22c55e 0%, #06b6d4 25%, #4f9dff 50%, #8b5cf6 75%, #ec4899 100%)',
              boxShadow: '0 0 16px color-mix(in srgb, var(--primary) 45%, transparent)',
              scaleY: reduceMotion ? 1 : spineProgress,
              height: '100%',
            }}
            aria-hidden
          />

          {chaptersWithNodes.map((chapter, chIdx) => (
            <div key={chapter.id} className="relative pb-16">
              {/* Chapter waypoint */}
              <ChapterWaypoint chapter={chapter} index={chIdx} reduceMotion={!!reduceMotion} />

              <ol className="flex flex-col gap-14 mt-10" role="list">
                {chapter.nodes.map((node, nodeIdx) => {
                  const isDone = completedLessons.includes(node.slug);
                  const isLocked = isNodeLocked(node);
                  const isSelected = selectedSlug === node.slug;
                  const isAvailable = !isDone && !isLocked;
                  const showUnlock = justUnlocked.has(node.slug) && !reduceMotion;
                  const side: 'left' | 'right' = nodeIdx % 2 === 0 ? 'left' : 'right';
                  const isTraveller = travellerNode.slug === node.slug;

                  return (
                    <MilestoneRow
                      key={node.slug}
                      id={`milestone-${node.slug}`}
                      node={node}
                      chapter={chapter}
                      side={side}
                      isDone={isDone}
                      isLocked={isLocked}
                      isSelected={isSelected}
                      isAvailable={isAvailable}
                      isTraveller={isTraveller}
                      showUnlock={showUnlock}
                      reduceMotion={!!reduceMotion}
                      onSelect={() => setSelectedSlug(node.slug)}
                    />
                  );
                })}
              </ol>
            </div>
          ))}

          {/* Journey's-end flag */}
          <div className="relative flex justify-center pb-6">
            <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 -top-4 w-8 h-8 rounded-full flex items-center justify-center"
                 style={{ background: 'var(--accent-gradient)', boxShadow: 'var(--shadow-glow)' }}>
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <div className="mt-6 ml-16 sm:ml-0 text-center">
              <p className="text-xs font-black uppercase tracking-widest gradient-text">Journey&apos;s End</p>
              <p className="text-xs text-muted-foreground mt-1">
                {completedNodes === totalNodes ? 'You have mastered the arts.' : `${totalNodes - completedNodes} milestones remain.`}
              </p>
            </div>
          </div>
        </div>

        {/* ------- STICKY DETAIL PANEL (desktop) / inline (mobile) ------- */}
        <div className="lg:sticky lg:top-40 self-start">
          <motion.div
            layout
            className="glass-card p-5 flex flex-col gap-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-glass-border">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Milestone Details</span>
            </div>

            <AnimatePresence mode="wait">
              {selectedTopic ? (
                <motion.div
                  key={selectedTopic.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: CHAPTERS[selectedNode.chapter]?.accent }}>
                      {`Chapter ${selectedNode.chapter + 1} · ${CHAPTERS[selectedNode.chapter]?.title}`}
                    </span>
                    <h2 className="text-xl font-black text-foreground mt-1 flex items-center gap-2">
                      <span
                        className="w-10 h-10 rounded-xl inline-flex items-center justify-center text-white"
                        style={{ background: CHAPTERS[selectedNode.chapter]?.gradient, boxShadow: '0 4px 14px rgba(0,0,0,0.25)' }}
                        aria-hidden="true"
                      >
                        <selectedNode.icon className="h-5 w-5" />
                      </span>
                      {selectedTopic.title}
                    </h2>
                    <p className="text-[11px] text-muted-foreground italic mt-1">{topicCategory?.title}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`badge ${
                        selectedTopic.difficulty === 'Beginner' ? 'badge-easy' :
                        selectedTopic.difficulty === 'Intermediate' ? 'badge-medium' : 'badge-hard'
                      }`}>
                        {selectedTopic.difficulty}
                      </span>
                      <span className={`badge ${
                        completedLessons.includes(selectedTopic.slug) ? 'badge-complete' :
                        isSelectedLocked ? 'bg-surface text-muted-foreground' : 'badge-primary'
                      }`}>
                        {completedLessons.includes(selectedTopic.slug) ? (
                          <><Check className="h-3 w-3" /> Conquered</>
                        ) : isSelectedLocked ? (
                          <><Lock className="h-3 w-3" /> Locked</>
                        ) : (
                          <><Sparkles className="h-3 w-3" /> Ready</>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-glass-border">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">About this milestone</span>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{selectedTopic.definition}</p>
                  </div>

                  <div className="pt-4 border-t border-glass-border">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Complexity</span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="surface p-2.5 rounded-lg">
                        <span className="text-[10px] text-muted-foreground">Time</span>
                        <p className="text-xs font-mono font-semibold text-foreground">{selectedTopic.time_complexity_average || 'O(N)'}</p>
                      </div>
                      <div className="surface p-2.5 rounded-lg">
                        <span className="text-[10px] text-muted-foreground">Space</span>
                        <p className="text-xs font-mono font-semibold text-foreground">{selectedTopic.space_complexity || 'O(1)'}</p>
                      </div>
                    </div>
                  </div>

                  {selectedNode.prereqs.length > 0 && (
                    <div className="pt-4 border-t border-glass-border">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Trail requires</span>
                      <div className="flex flex-col gap-2 mt-2">
                        {selectedNode.prereqs.map((p) => {
                          const done = completedLessons.includes(p);
                          const pTopic = topics.find((t) => t.slug === p);
                          return (
                            <div key={p} className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                              done ? 'bg-complete/5 text-complete' : 'bg-hard/5 text-hard'
                            }`}>
                              <span className="font-medium">{pTopic?.title || p}</span>
                              <span className="inline-flex items-center gap-1 text-[10px]">
                                {done ? <><Check className="h-3 w-3" /> Done</> : <><AlertCircle className="h-3 w-3" /> Required</>}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-glass-border">
                    {isSelectedLocked ? (
                      <div className="p-3 rounded-lg bg-hard/5 text-hard text-xs flex gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Conquer the milestones above to light the trail and unlock this stop.</span>
                      </div>
                    ) : (
                      <Link
                        href={`/topics/${selectedTopic.slug}`}
                        className="w-full py-3 rounded-lg btn-primary font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {completedLessons.includes(selectedTopic.slug) ? 'Revisit Milestone' : 'Begin This Milestone'} <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground p-4">
                  <p className="text-sm">Tap a milestone on the trail to see its story.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   ChapterWaypoint — full-width banner marking each chapter boundary
================================================================== */
function ChapterWaypoint({
  chapter,
  index,
  reduceMotion,
}: {
  chapter: Chapter & { nodes: SkillNode[] };
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-20 sm:pl-0 sm:text-center"
    >
      {/* Big chapter marker on the spine */}
      <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 top-1 z-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl border-2 border-white/20"
          style={{
            background: chapter.gradient,
            boxShadow: `0 8px 30px ${chapter.accent}55, 0 0 40px ${chapter.accent}33`,
          }}
        >
          {index + 1}
        </div>
      </div>

      {/* Chapter title band */}
      <div className="pt-2 sm:pt-20">
        <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: chapter.accent }}>
          Chapter {chapter.id + 1}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1"
            style={{ fontFamily: 'var(--font-heading)' }}>
          {chapter.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">{chapter.tagline}</p>
      </div>
    </motion.div>
  );
}

/* ==================================================================
   MilestoneRow — one row of the vertical timeline
================================================================== */
function MilestoneRow({
  id,
  node,
  chapter,
  side,
  isDone,
  isLocked,
  isSelected,
  isAvailable,
  isTraveller,
  showUnlock,
  reduceMotion,
  onSelect,
}: {
  id: string;
  node: SkillNode;
  chapter: Chapter;
  side: 'left' | 'right';
  isDone: boolean;
  isLocked: boolean;
  isSelected: boolean;
  isAvailable: boolean;
  isTraveller: boolean;
  showUnlock: boolean;
  reduceMotion: boolean;
  onSelect: () => void;
}) {
  const initialX = reduceMotion ? 0 : side === 'left' ? -40 : 40;
  const NodeIcon = node.icon;

  return (
    <li id={id} className="relative">
      <div className="grid grid-cols-[64px_1fr] sm:grid-cols-2 gap-4 sm:gap-8 items-center">

        {/* Card slot — left side */}
        <div className={`hidden sm:block ${side === 'left' ? 'sm:col-start-1 sm:pr-10 sm:text-right' : 'sm:col-start-2 sm:col-end-3 sm:invisible'}`}>
          {side === 'left' && (
            <MilestoneCard
              node={node}
              chapter={chapter}
              side="left"
              isDone={isDone}
              isLocked={isLocked}
              isSelected={isSelected}
              isAvailable={isAvailable}
              reduceMotion={reduceMotion}
              onSelect={onSelect}
              initialX={initialX}
            />
          )}
        </div>

        {/* Spine node */}
        <div className="col-start-1 sm:col-start-1 sm:col-end-3 flex justify-start sm:justify-center relative">
          <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 flex items-center justify-center">
            {/* Connector line to card (desktop) */}
            <div
              className="hidden sm:block absolute top-1/2 h-0.5"
              style={{
                width: '3rem',
                background: `linear-gradient(${side === 'left' ? '-90deg' : '90deg'}, ${chapter.accent}88, transparent)`,
                [side === 'left' ? 'right' : 'left']: '100%',
              }}
              aria-hidden
            />

            {/* Unlock burst */}
            {showUnlock && (
              <motion.span
                initial={{ scale: 0.4, opacity: 0.9 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border-2 pointer-events-none"
                style={{ borderColor: chapter.accent }}
              />
            )}

            <motion.button
              type="button"
              onClick={onSelect}
              whileHover={reduceMotion ? undefined : { scale: 1.1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              className="relative w-14 h-14 rounded-full flex items-center justify-center text-2xl cursor-pointer transition-shadow"
              style={{
                background: isDone
                  ? `linear-gradient(135deg, ${chapter.accent}, color-mix(in srgb, ${chapter.accent} 60%, #22c55e))`
                  : isAvailable
                  ? 'var(--card)'
                  : 'var(--muted)',
                border: `2px solid ${
                  isSelected ? 'var(--accent)' : isDone ? chapter.accent : isAvailable ? chapter.accent : 'var(--border)'
                }`,
                boxShadow: isDone
                  ? `0 0 24px ${chapter.accent}66`
                  : isAvailable
                  ? `0 0 20px ${chapter.accent}44`
                  : 'var(--shadow-sm)',
                opacity: isLocked ? 0.55 : 1,
              }}
              aria-label={`${node.label}${isDone ? ' (completed)' : isLocked ? ' (locked)' : ' (available)'}`}
              aria-pressed={isSelected}
            >
              <span className={`${isAvailable && !reduceMotion ? 'milestone-bob' : ''} ${isDone ? 'text-white' : 'text-foreground'}`} aria-hidden="true">
                {isLocked ? <Lock className="h-5 w-5 text-muted-foreground" /> : <NodeIcon className="h-6 w-6" />}
              </span>
              {isDone && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-complete text-white"
                  style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}
                  aria-hidden="true"
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
              {isTraveller && !isDone && (
                <motion.span
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary"
                  aria-hidden="true"
                >
                  <Navigation className="h-5 w-5" />
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Card slot — right side (desktop) */}
        <div className={`hidden sm:block ${side === 'right' ? 'sm:col-start-2 sm:pl-10' : 'sm:col-start-1 sm:invisible'}`}>
          {side === 'right' && (
            <MilestoneCard
              node={node}
              chapter={chapter}
              side="right"
              isDone={isDone}
              isLocked={isLocked}
              isSelected={isSelected}
              isAvailable={isAvailable}
              reduceMotion={reduceMotion}
              onSelect={onSelect}
              initialX={initialX}
            />
          )}
        </div>

        {/* Mobile: card always to the right of the spine */}
        <div className="sm:hidden col-start-2 pl-4">
          <MilestoneCard
            node={node}
            chapter={chapter}
            side="right"
            isDone={isDone}
            isLocked={isLocked}
            isSelected={isSelected}
            isAvailable={isAvailable}
            reduceMotion={reduceMotion}
            onSelect={onSelect}
            initialX={0}
          />
        </div>
      </div>
    </li>
  );
}

/* ==================================================================
   MilestoneCard — the glass card at each timeline node
================================================================== */
function MilestoneCard({
  node,
  chapter,
  side,
  isDone,
  isLocked,
  isSelected,
  isAvailable,
  reduceMotion,
  onSelect,
  initialX,
}: {
  node: SkillNode;
  chapter: Chapter;
  side: 'left' | 'right';
  isDone: boolean;
  isLocked: boolean;
  isSelected: boolean;
  isAvailable: boolean;
  reduceMotion: boolean;
  onSelect: () => void;
  initialX: number;
}) {
  const topic = topics.find((t) => t.slug === node.slug);
  const NodeIcon = node.icon;

  const Wrapper = isLocked ? motion.div : MotionLink;
  const wrapperProps = isLocked
    ? {}
    : { href: `/topics/${node.slug}` };

  return (
    <Wrapper
      {...(wrapperProps as any)}
      onClick={onSelect}
      initial={reduceMotion ? undefined : { opacity: 0, x: initialX, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={`glass-card group w-full p-5 text-${side === 'left' ? 'right' : 'left'} cursor-pointer transition-all block`}
      style={{
        borderColor: isSelected
          ? 'var(--accent)'
          : isDone
          ? `color-mix(in srgb, ${chapter.accent} 55%, var(--glass-border))`
          : 'var(--glass-border)',
        boxShadow: isSelected
          ? `var(--shadow-lg), 0 0 30px ${chapter.accent}55`
          : undefined,
        opacity: isLocked ? 0.65 : 1,
      }}
      aria-label={`${isLocked ? 'Locked:' : 'Go to'} ${node.label} milestone`}
    >
      <div className={`flex items-center gap-3 ${side === 'left' ? 'sm:flex-row-reverse' : ''}`}>
        <span
          className="w-11 h-11 rounded-xl inline-flex items-center justify-center text-xl shrink-0"
          style={{
            background: isLocked ? 'var(--muted)' : chapter.gradient,
            boxShadow: isLocked ? 'none' : `0 4px 14px ${chapter.accent}55`,
          }}
        >
          {isLocked ? <Lock className="h-5 w-5 text-muted-foreground" /> : <NodeIcon className="h-5 w-5 text-white" />}
        </span>
        <div className={`flex-1 ${side === 'left' ? 'sm:text-right' : 'text-left'}`}>
          <h3 className="text-base font-black text-foreground leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {node.label}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {topic?.difficulty ?? 'Foundational'}
          </p>
        </div>
        {!isLocked && (
          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
        )}
      </div>

      {topic?.definition && (
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2 text-left">
          {topic.definition}
        </p>
      )}

      <div className={`mt-4 flex items-center gap-2 flex-wrap ${side === 'left' ? 'sm:justify-end' : 'justify-start'}`}>
        {isDone && (
          <span className="badge badge-complete">
            <Check className="h-3 w-3" /> Conquered
          </span>
        )}
        {isAvailable && (
          <span className="badge badge-primary">
            <Sparkles className="h-3 w-3" /> Ready
          </span>
        )}
        {isLocked && (
          <span className="badge bg-surface text-muted-foreground">
            <Lock className="h-3 w-3" /> Locked
          </span>
        )}
        {topic?.time_complexity_average && (
          <span className="badge bg-surface text-muted-foreground font-mono">
            {topic.time_complexity_average}
          </span>
        )}
      </div>
    </Wrapper>
  );
}
