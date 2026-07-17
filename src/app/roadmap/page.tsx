'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Map, BookOpen, Check, Lock, AlertCircle, ArrowRight, Sparkles, Compass, Flag, Trophy } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { categories, topics } from '@/data';

interface SkillNode {
  slug: string;
  x: number;
  y: number;
  label: string;
  emoji: string;
  chapter: number;
  prereqs: string[];
}

interface Chapter {
  id: number;
  title: string;
  tagline: string;
  accent: string;
}

/**
 * The journey is told in five "chapters". Nodes are laid out along a single
 * winding path (left → right, gently rising and falling) so learners read it
 * as one continuous adventure rather than a flat grid.
 */
const CHAPTERS: Chapter[] = [
  { id: 0, title: 'The Foundations', tagline: 'Where every journey begins — the building blocks of data.', accent: '#22c55e' },
  { id: 1, title: 'Order & Search', tagline: 'Learn to arrange and find things with purpose.', accent: '#00f2ff' },
  { id: 2, title: 'Divide & Conquer', tagline: 'Break big problems into smaller, solvable ones.', accent: '#f97316' },
  { id: 3, title: 'Trees & Graphs', tagline: 'Explore branching worlds and connected networks.', accent: '#a855f7' },
  { id: 4, title: 'The Advanced Arts', tagline: 'Master the techniques that crack the hardest problems.', accent: '#f43f5e' },
];

/** Visual layout only — prerequisites come from curriculum `topics`. */
const ROADMAP_LAYOUT: Record<string, { x: number; y: number; label: string; emoji: string; chapter: number }> = {
  array: { x: 140, y: 260, label: 'Arrays', emoji: '📊', chapter: 0 },
  'linked-list': { x: 300, y: 140, label: 'Linked Lists', emoji: '🔗', chapter: 0 },
  stack: { x: 300, y: 380, label: 'Stacks', emoji: '📥', chapter: 0 },
  queue: { x: 460, y: 260, label: 'Queues', emoji: '📤', chapter: 0 },

  'binary-search': { x: 640, y: 150, label: 'Binary Search', emoji: '🔍', chapter: 1 },
  'two-pointers': { x: 640, y: 380, label: 'Two Pointers', emoji: '👆', chapter: 1 },
  'bubble-sort': { x: 800, y: 260, label: 'Bubble Sort', emoji: '🫧', chapter: 1 },
  'hash-table': { x: 800, y: 420, label: 'Hash Table', emoji: '🗂️', chapter: 1 },

  'recursion-backtracking': { x: 980, y: 150, label: 'Recursion', emoji: '🔄', chapter: 2 },
  'merge-sort': { x: 1140, y: 260, label: 'Merge Sort', emoji: '🔀', chapter: 2 },
  'quick-sort': { x: 1140, y: 420, label: 'Quick Sort', emoji: '⚡', chapter: 2 },
  'sliding-window': { x: 980, y: 400, label: 'Sliding Window', emoji: '🪟', chapter: 2 },

  'binary-tree': { x: 1320, y: 150, label: 'Binary Trees', emoji: '🌳', chapter: 3 },
  'binary-search-tree': { x: 1480, y: 260, label: 'BST', emoji: '🌲', chapter: 3 },
  'heap-priority-queue': { x: 1320, y: 400, label: 'Heap', emoji: '⛰️', chapter: 3 },
  bfs: { x: 1640, y: 150, label: 'BFS', emoji: '🌐', chapter: 3 },
  dfs: { x: 1640, y: 380, label: 'DFS', emoji: '🕸️', chapter: 3 },

  'trie-prefix-tree': { x: 1820, y: 150, label: 'Trie', emoji: '🔤', chapter: 4 },
  'greedy-algorithms': { x: 1820, y: 380, label: 'Greedy', emoji: '🎯', chapter: 4 },
  'dynamic-programming': { x: 1980, y: 260, label: 'DP', emoji: '🧩', chapter: 4 },
};

const ROADMAP_SLUG_ORDER = Object.keys(ROADMAP_LAYOUT);

function buildRoadmapGraph() {
  const skillNodes: SkillNode[] = ROADMAP_SLUG_ORDER.map((slug) => {
    const topic = topics.find((t) => t.slug === slug);
    const layout = ROADMAP_LAYOUT[slug];
    return {
      slug,
      x: layout.x,
      y: layout.y,
      label: layout.label,
      emoji: layout.emoji,
      chapter: layout.chapter,
      prereqs: (topic?.prerequisites ?? []).filter((p) => ROADMAP_LAYOUT[p] !== undefined),
    };
  });

  const skillConnections = skillNodes.flatMap((node) =>
    node.prereqs.map((prereq) => ({ from: prereq, to: node.slug }))
  );

  return { skillNodes, skillConnections };
}

const { skillNodes, skillConnections } = buildRoadmapGraph();

const getBezierPath = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = Math.abs(x2 - x1);
  const cx1 = x1 + dx * 0.4;
  const cx2 = x2 - dx * 0.4;
  return `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;
};

/** The main winding "trail" that threads through every milestone in order. */
const journeyOrder = [...skillNodes].sort((a, b) => a.chapter - b.chapter || a.x - b.x);
const buildTrail = () => {
  if (journeyOrder.length === 0) return '';
  let d = `M ${journeyOrder[0].x} ${journeyOrder[0].y}`;
  for (let i = 1; i < journeyOrder.length; i++) {
    const prev = journeyOrder[i - 1];
    const cur = journeyOrder[i];
    const midX = (prev.x + cur.x) / 2;
    d += ` C ${midX} ${prev.y}, ${midX} ${cur.y}, ${cur.x} ${cur.y}`;
  }
  return d;
};
const TRAIL_PATH = buildTrail();

const MAP_W = 2120;
const MAP_H = 520;

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

  // Where is the traveller? The last completed node in journey order (or the start).
  const travellerNode = useMemo(() => {
    const done = journeyOrder.filter((n) => completedLessons.includes(n.slug));
    return done.length > 0 ? done[done.length - 1] : journeyOrder[0];
  }, [completedLessons]);

  return (
    <div className="flex flex-col gap-8 py-4 w-full animate-fade-in">

      {/* Hero header with narrative + progress */}
      <div className="relative overflow-hidden rounded-2xl border border-border chapter-band bg-card/60 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary">
              <Compass className="h-5 w-5" />
              <span className="text-xs font-black uppercase tracking-widest">Your DSA Expedition</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground mt-2">The Learning Journey</h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Set out from the shores of the <span className="text-foreground font-semibold">Foundations</span> and journey across
              five chapters toward mastery of the <span className="text-foreground font-semibold">Advanced Arts</span>.
              Complete a milestone to light the trail and unlock what lies ahead.
            </p>
          </div>

          {/* Circular progress emblem */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative h-20 w-20">
              <svg viewBox="0 0 80 80" className="-rotate-90 h-20 w-20">
                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border)" strokeWidth="7" />
                <motion.circle
                  cx="40" cy="40" r="34" fill="none" stroke="var(--primary)" strokeWidth="7" strokeLinecap="round"
                  pathLength={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: totalNodes ? completedNodes / totalNodes : 0 }}
                  transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-black text-foreground leading-none">{progressPct}%</span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase">Done</span>
              </div>
            </div>
            <div className="text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 text-complete" /> {completedNodes}/{totalNodes} milestones</div>
              <div className="flex items-center gap-1.5 mt-1.5"><Flag className="h-3.5 w-3.5 text-primary" /> Chapter {travellerNode.chapter + 1} of {CHAPTERS.length}</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground mt-6 pt-5 border-t border-border/60">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-complete" /> Conquered</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" /> Ready to explore</span>
          <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> Locked</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

        {/* Adventure Map (3 cols) */}
        <div className="lg:col-span-3 card overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2">
            <Map className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-muted-foreground">Adventure Map — scroll to explore the trail</span>
          </div>

          <div className="w-full overflow-x-auto map-bg">
            <svg
              width={MAP_W}
              height={MAP_H}
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="mx-auto select-none block"
            >
              <defs>
                <linearGradient id="journeyGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="45%" stopColor="#00f2ff" />
                  <stop offset="75%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>

              {/* Chapter zone bands + titles */}
              {CHAPTERS.map((ch) => {
                const chNodes = skillNodes.filter((n) => n.chapter === ch.id);
                if (chNodes.length === 0) return null;
                const minX = Math.min(...chNodes.map((n) => n.x)) - 70;
                const maxX = Math.max(...chNodes.map((n) => n.x)) + 70;
                return (
                  <g key={ch.id}>
                    <rect
                      x={minX} y={20} width={maxX - minX} height={MAP_H - 40} rx={22}
                      fill={`color-mix(in srgb, ${ch.accent} 6%, transparent)`}
                      stroke={`color-mix(in srgb, ${ch.accent} 22%, transparent)`}
                      strokeWidth={1} strokeDasharray="6 8"
                    />
                    <text x={(minX + maxX) / 2} y={46} textAnchor="middle" fontSize="13" fontWeight="800" fill={ch.accent}>
                      {`Ch. ${ch.id + 1} · ${ch.title}`}
                    </text>
                  </g>
                );
              })}

              {/* The winding journey trail (base + dashed + completed overlay + flow) */}
              <path d={TRAIL_PATH} className="journey-path" />
              <path d={TRAIL_PATH} className="journey-path-inner" />
              {(() => {
                // Draw the completed portion up to the traveller node.
                const idx = journeyOrder.findIndex((n) => n.slug === travellerNode.slug);
                const doneSlice = journeyOrder.slice(0, Math.max(1, idx + 1));
                if (doneSlice.length < 2) return null;
                let d = `M ${doneSlice[0].x} ${doneSlice[0].y}`;
                for (let i = 1; i < doneSlice.length; i++) {
                  const prev = doneSlice[i - 1];
                  const cur = doneSlice[i];
                  const midX = (prev.x + cur.x) / 2;
                  d += ` C ${midX} ${prev.y}, ${midX} ${cur.y}, ${cur.x} ${cur.y}`;
                }
                return (
                  <>
                    <path d={d} className="journey-path-completed" />
                    {!reduceMotion && <path d={d} className="journey-path-flow" />}
                  </>
                );
              })()}

              {/* Prerequisite connectors (subtle) */}
              {skillConnections.map((conn) => {
                const fromNode = skillNodes.find((n) => n.slug === conn.from)!;
                const toNode = skillNodes.find((n) => n.slug === conn.to)!;
                const fromDone = completedLessons.includes(conn.from);
                let cls = 'bezier-link';
                if (fromDone && completedLessons.includes(conn.to)) cls = 'bezier-link bezier-link-completed';
                else if (fromDone) cls = 'bezier-link bezier-link-active';
                return (
                  <path
                    key={`${conn.from}-${conn.to}`}
                    d={getBezierPath(fromNode.x, fromNode.y, toNode.x, toNode.y)}
                    className={cls}
                    opacity={0.55}
                  />
                );
              })}

              {/* Milestone nodes */}
              {skillNodes.map((node) => {
                const isDone = completedLessons.includes(node.slug);
                const isLocked = isNodeLocked(node);
                const isSelected = selectedSlug === node.slug;
                const isAvailable = !isDone && !isLocked;
                const showUnlock = justUnlocked.has(node.slug) && !reduceMotion;

                let fill = 'var(--roadmap-node-fill)';
                let stroke = 'var(--roadmap-node-stroke)';
                let sw = 2;
                if (isDone) { fill = 'var(--roadmap-node-done-fill)'; stroke = 'var(--complete)'; sw = 2.5; }
                else if (isAvailable) { fill = 'var(--roadmap-node-active-fill)'; stroke = 'var(--primary)'; sw = 2.5; }
                if (isSelected) { stroke = 'var(--accent)'; sw = 3.5; }

                return (
                  <g
                    key={node.slug}
                    onClick={() => setSelectedSlug(node.slug)}
                    className={`cursor-pointer ${isAvailable && !reduceMotion ? 'milestone-bob' : ''}`}
                    role="button"
                    aria-label={`${node.label}${isDone ? ' (completed)' : isLocked ? ' (locked)' : ' (available)'}`}
                  >
                    {/* One-shot unlock burst */}
                    {showUnlock && (
                      <circle cx={node.x} cy={node.y} r="30" fill="none" stroke="var(--primary)" strokeWidth="3" className="unlock-ring" />
                    )}
                    {/* Selection halo */}
                    {isSelected && (
                      <circle cx={node.x} cy={node.y} r="38" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" className={reduceMotion ? '' : 'animate-ping'} />
                    )}
                    {/* Ambient glow for available milestones */}
                    <circle cx={node.x} cy={node.y} r="30" fill={fill} stroke={stroke} strokeWidth={sw} className={isAvailable && !reduceMotion ? 'milestone-glow' : ''} />
                    <text x={node.x} y={node.y + 7} textAnchor="middle" fontSize="20" opacity={isLocked ? 0.4 : 1}>
                      {isLocked ? '🔒' : node.emoji}
                    </text>
                    {/* Completed check badge */}
                    {isDone && (
                      <g>
                        <circle cx={node.x + 20} cy={node.y - 20} r="9" fill="var(--complete)" />
                        <text x={node.x + 20} y={node.y - 16} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="900">✓</text>
                      </g>
                    )}
                    <text
                      x={node.x}
                      y={node.y + 52}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill={isSelected ? 'var(--accent)' : isDone ? 'var(--complete)' : isLocked ? 'var(--roadmap-label)' : 'var(--foreground)'}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}

              {/* Traveller marker riding the trail */}
              <g>
                <circle cx={travellerNode.x} cy={travellerNode.y - 44} r="13" fill="var(--primary)" opacity="0.95" />
                <text x={travellerNode.x} y={travellerNode.y - 39} textAnchor="middle" fontSize="14">🧭</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Detail Panel (1 col) */}
        <div className="card flex flex-col">
          <div className="px-5 py-3 border-b border-border flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-muted-foreground">Milestone Details</span>
          </div>

          <div className="p-5 flex flex-col gap-5 flex-1 text-sm">
            <AnimatePresence mode="wait">
              {selectedTopic ? (
                <motion.div
                  key={selectedTopic.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col gap-5 flex-1"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: CHAPTERS[selectedNode.chapter]?.accent }}>
                      {`Chapter ${selectedNode.chapter + 1} · ${CHAPTERS[selectedNode.chapter]?.title}`}
                    </span>
                    <h2 className="text-lg font-black text-foreground mt-1 flex items-center gap-2">
                      <span className="text-2xl">{selectedNode.emoji}</span> {selectedTopic.title}
                    </h2>
                    <p className="text-[11px] text-muted-foreground italic mt-1">{topicCategory?.title}</p>
                    <div className="flex items-center gap-2 mt-2.5">
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

                  <div className="pt-4 border-t border-border">
                    <span className="text-xs font-medium text-muted-foreground">About this milestone</span>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{selectedTopic.definition}</p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <span className="text-xs font-medium text-muted-foreground">Complexity</span>
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
                    <div className="pt-4 border-t border-border">
                      <span className="text-xs font-medium text-muted-foreground">Trail requires</span>
                      <div className="flex flex-col gap-2 mt-2">
                        {selectedNode.prereqs.map((p) => {
                          const done = completedLessons.includes(p);
                          const pTopic = topics.find((t) => t.slug === p);
                          return (
                            <div key={p} className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                              done ? 'bg-complete/5 text-complete' : 'bg-hard/5 text-hard'
                            }`}>
                              <span className="font-medium">{pTopic?.title || p}</span>
                              <span className="text-[10px]">{done ? '✓ Done' : '✗ Required'}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border mt-auto">
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
                  <p className="text-sm">Tap a milestone on the map to see its story.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
