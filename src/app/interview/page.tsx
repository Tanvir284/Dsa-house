'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Timer, Play, CheckCircle2, SkipForward, Flag, RotateCcw, Trophy,
  Target, TrendingUp, Clock, ExternalLink, History, ChevronRight,
} from 'lucide-react';
import { useAppStore, PROBLEM_COMPLETION_XP } from '@/lib/store';
import { problems } from '@/data/problems';
import {
  SESSION_DURATIONS_MIN, DIFFICULTY_MIX_LABELS,
  buildSessionQueue, padUnattempted, scoreSession, summarizeSession, loadSessionHistory, saveSessionToHistory,
  type SessionDurationMin, type DifficultyMix, type SessionConfig,
  type SessionProblemResult, type CompletedSession, type ProblemOutcome,
} from '@/lib/interview-session';
import { fadeUp, staggerContainer, springSoft } from '@/lib/motion';

type Phase = 'setup' | 'active' | 'summary';

function formatClock(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatMinSec(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

const DIFFICULTY_BADGE: Record<string, string> = {
  Easy: 'badge-easy',
  Medium: 'badge-medium',
  Hard: 'badge-hard',
};

export default function InterviewPage() {
  const { profile, loginMockUser, addXp, recordActivity, toggleProblemCompletion, completedProblems } = useAppStore();

  const [phase, setPhase] = useState<Phase>('setup');
  const [durationMin, setDurationMin] = useState<SessionDurationMin>(30);
  const [mix, setMix] = useState<DifficultyMix>('balanced');
  const [problemCount, setProblemCount] = useState(5);

  const [queue, setQueue] = useState<typeof problems>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<SessionProblemResult[]>([]);
  const [remainingMs, setRemainingMs] = useState(0);
  const [lastSession, setLastSession] = useState<CompletedSession | null>(null);
  const [history, setHistory] = useState<CompletedSession[]>([]);

  const sessionStartRef = useRef<number>(0);
  const stepStartRef = useRef<number>(0);
  const configRef = useRef<SessionConfig | null>(null);
  const endedByTimeoutRef = useRef(false);
  // Guards every path that can end a session (advance() on the last problem,
  // the countdown reaching zero, endEarly()) against running twice. Without
  // it, a rapid double-click on "Mark Solved" for the last problem could
  // fire finishSession twice against the same stale `completedProblems`
  // closure — the second toggleProblemCompletion call would then see the
  // problem as already complete (from the first call's live store update)
  // and toggle it back off, un-completing what the summary still shows as
  // solved. A single guard at the one function every ending path funnels
  // through is the deep fix; per-button `disabled` state wouldn't have
  // covered the timeout-vs-manual-end race.
  const isFinishingRef = useRef(false);

  useEffect(() => {
    // Reading localStorage is the external-system case effects are for; it
    // isn't available during SSR, so this can't be computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(loadSessionHistory());
  }, []);

  const problemsById = useMemo(() => new Map(problems.map((p) => [p.id, p])), []);

  const finishSession = useCallback(
    (finalResults: SessionProblemResult[], byTimeout: boolean) => {
      if (isFinishingRef.current) return;
      isFinishingRef.current = true;

      const config = configRef.current;
      if (!config) return;

      // toggleProblemCompletion (src/lib/store.ts) already grants
      // PROBLEM_COMPLETION_XP, records activity, and updates the streak the
      // moment a problem transitions from incomplete to complete. Awarding
      // this session's own difficulty-weighted XP on top of that for the
      // same transition would double-count it — a solved-for-the-first-time
      // problem earned both rewards, while a problem that happened to
      // already be complete earned only one, so identical performance paid
      // out inconsistently. Newly-solved problems are credited via the
      // toggle's flat award; only *re-solving* a problem that was already
      // complete earns the session's own difficulty-weighted credit, since
      // toggling it would incorrectly mark it incomplete again.
      const newlySolved = finalResults.filter(
        (r) => r.outcome === 'solved' && !completedProblems.includes(r.problemId),
      );
      const reSolved = finalResults.filter(
        (r) => r.outcome === 'solved' && completedProblems.includes(r.problemId),
      );

      for (const r of newlySolved) {
        toggleProblemCompletion(r.problemId);
      }

      const reSolveXp = scoreSession(reSolved, problemsById);
      if (reSolveXp > 0) addXp(reSolveXp);
      if (reSolved.length > 0) recordActivity(reSolved.length);

      // Honest total of what the profile actually gained from this session,
      // combining both reward paths above — not a recomputed nominal score.
      const xpAwarded = newlySolved.length * PROBLEM_COMPLETION_XP + reSolveXp;

      const session: CompletedSession = {
        id: `session-${Date.now()}`,
        config,
        startedAt: new Date(sessionStartRef.current).toISOString(),
        endedAt: new Date().toISOString(),
        results: finalResults,
        xpAwarded,
        endedByTimeout: byTimeout,
      };

      setHistory(saveSessionToHistory(session));
      setLastSession(session);
      setPhase('summary');
    },
    [problemsById, addXp, recordActivity, toggleProblemCompletion, completedProblems],
  );

  // Countdown. Ticks once a second; when it reaches zero, closes out every
  // problem the user hadn't yet resolved as 'unattempted' rather than
  // dropping them, so the summary accounts for the whole queue.
  useEffect(() => {
    if (phase !== 'active') return;
    const interval = setInterval(() => {
      setRemainingMs((prev) => {
        const next = prev - 1000;
        if (next <= 0) {
          clearInterval(interval);
          endedByTimeoutRef.current = true;
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === 'active' && remainingMs <= 0 && endedByTimeoutRef.current) {
      const padded = padUnattempted(results, queue, currentIndex, stepStartRef.current, Date.now());
      finishSession(padded, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingMs, phase]);

  const startSession = () => {
    const config: SessionConfig = { durationMin, mix, problemCount, category: null };
    const builtQueue = buildSessionQueue(problems, config);
    if (builtQueue.length === 0) return;

    configRef.current = config;
    endedByTimeoutRef.current = false;
    isFinishingRef.current = false;
    sessionStartRef.current = Date.now();
    stepStartRef.current = Date.now();
    setQueue(builtQueue);
    setCurrentIndex(0);
    setResults([]);
    setRemainingMs(durationMin * 60 * 1000);
    setPhase('active');
  };

  const advance = (outcome: ProblemOutcome) => {
    const now = Date.now();
    const entry: SessionProblemResult = {
      problemId: queue[currentIndex].id,
      outcome,
      timeSpentMs: now - stepStartRef.current,
    };
    const nextResults = [...results, entry];
    setResults(nextResults);

    if (currentIndex + 1 >= queue.length) {
      finishSession(nextResults, false);
      return;
    }
    stepStartRef.current = now;
    setCurrentIndex((i) => i + 1);
  };

  const endEarly = () => {
    const padded = padUnattempted(results, queue, currentIndex, stepStartRef.current, Date.now());
    finishSession(padded, false);
  };

  const returnToSetup = () => {
    setPhase('setup');
    setLastSession(null);
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center gap-6 py-20 text-center max-w-md mx-auto">
        <Timer className="h-12 w-12 text-primary" aria-hidden="true" />
        <h1 className="text-2xl font-bold">Mock Interview</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to run a timed practice session and track your interview history.
        </p>
        <button
          onClick={() => loginMockUser('AlgoMaster')}
          className="btn-primary px-6 py-3 font-semibold rounded-lg cursor-pointer"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 py-4 w-full text-left max-w-4xl mx-auto"
    >
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
          <Timer className="h-3.5 w-3.5" aria-hidden="true" /> Mock Interview
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground">Timed Interview Session</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Pick a duration and difficulty mix, then work a queue of problems against the clock. Each
          problem is marked solved or skipped as you go — the report at the end is the same rubric
          shape an interview debrief uses.
        </p>
      </motion.div>

      {/*
        Deliberately not wrapped in AnimatePresence. Each panel below is a
        plain function component whose root is its own `motion.div` — that
        one extra layer of indirection means AnimatePresence cannot properly
        track its exit animation (it needs a direct motion-component child to
        hook into), and in testing it got stuck waiting for an exit signal
        that never arrived: `phase` state updated correctly on every click,
        confirmed via render logging, but the DOM never advanced past the
        setup panel. Each panel already animates its own mount via its own
        `initial`/`animate` props, which fires correctly on ordinary React
        mount regardless of AnimatePresence — so the only thing lost by
        removing the wrapper is the *exit* transition between panels, which
        is a minor visual trade against a session that was otherwise unable
        to progress at all.
      */}
      {phase === 'setup' && (
        <SetupPanel
          durationMin={durationMin}
          setDurationMin={setDurationMin}
          mix={mix}
          setMix={setMix}
          problemCount={problemCount}
          setProblemCount={setProblemCount}
          onStart={startSession}
          history={history}
        />
      )}

      {phase === 'active' && queue[currentIndex] && (
        <ActivePanel
          problem={queue[currentIndex]}
          index={currentIndex}
          total={queue.length}
          remainingMs={remainingMs}
          totalMs={durationMin * 60 * 1000}
          onSolved={() => advance('solved')}
          onSkipped={() => advance('skipped')}
          onEndEarly={endEarly}
        />
      )}

      {phase === 'summary' && lastSession && (
        <SummaryPanel session={lastSession} onRestart={returnToSetup} />
      )}
    </motion.div>
  );
}

function SetupPanel({
  durationMin, setDurationMin, mix, setMix, problemCount, setProblemCount, onStart, history,
}: {
  durationMin: SessionDurationMin;
  setDurationMin: (v: SessionDurationMin) => void;
  mix: DifficultyMix;
  setMix: (v: DifficultyMix) => void;
  problemCount: number;
  setProblemCount: (v: number) => void;
  onStart: () => void;
  history: CompletedSession[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={springSoft}
      className="flex flex-col gap-6"
    >
      <div className="ide-pane p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span id="duration-label" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Duration
          </span>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="duration-label">
            {SESSION_DURATIONS_MIN.map((d) => (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={durationMin === d}
                onClick={() => setDurationMin(d)}
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                  durationMin === d
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {d} min
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span id="mix-label" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Difficulty mix
          </span>
          <div className="flex flex-col gap-2" role="radiogroup" aria-labelledby="mix-label">
            {(Object.keys(DIFFICULTY_MIX_LABELS) as DifficultyMix[]).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mix === m}
                onClick={() => setMix(m)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold border text-left transition-all cursor-pointer ${
                  mix === m
                    ? 'bg-primary/10 border-primary text-foreground'
                    : 'border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {DIFFICULTY_MIX_LABELS[m]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="problem-count" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Problems in queue
          </label>
          <div className="flex items-center gap-4">
            <input
              id="problem-count"
              type="range"
              min={3}
              max={10}
              step={1}
              value={problemCount}
              onChange={(e) => setProblemCount(Number(e.target.value))}
              aria-valuetext={`${problemCount} problems`}
              className="flex-1 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-sm font-mono font-black text-foreground bg-surface px-3 py-1 rounded-lg border border-border w-12 text-center">
              {problemCount}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            You don&apos;t have to finish the whole queue — the clock is the real constraint.
          </p>
        </div>

        <button
          onClick={onStart}
          className="btn-primary px-6 py-3.5 font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2 mt-2"
        >
          <Play className="h-4 w-4" aria-hidden="true" /> Start Session
        </button>
      </div>

      {history.length > 0 && (
        <div className="ide-pane p-6 flex flex-col gap-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
            <History className="h-4 w-4 text-primary" aria-hidden="true" /> Recent Sessions
          </h2>
          <ul className="flex flex-col gap-2">
            {history.slice(0, 5).map((s) => {
              const summary = summarizeSession(s);
              return (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-surface border border-border text-sm"
                >
                  <span className="text-muted-foreground font-medium">
                    {new Date(s.startedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ·{' '}
                    {s.config.durationMin}min · {DIFFICULTY_MIX_LABELS[s.config.mix].split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-3 font-bold text-foreground">
                    <span className="text-easy">{summary.solved} solved</span>
                    <span className="text-primary">+{s.xpAwarded} XP</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

function ActivePanel({
  problem, index, total, remainingMs, totalMs, onSolved, onSkipped, onEndEarly,
}: {
  problem: (typeof problems)[number];
  index: number;
  total: number;
  remainingMs: number;
  totalMs: number;
  onSolved: () => void;
  onSkipped: () => void;
  onEndEarly: () => void;
}) {
  const percentRemaining = totalMs > 0 ? (remainingMs / totalMs) * 100 : 0;
  const isLowTime = remainingMs < 60_000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={springSoft}
      className="flex flex-col gap-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground">
          <span>Problem {index + 1} / {total}</span>
        </div>
        {/* The timer's live region is intentionally terse and throttled by the
            1s tick itself — announcing every second would be unusable with a
            screen reader, so only the final low-time state escalates. */}
        <div
          role="timer"
          aria-live={isLowTime ? 'assertive' : 'off'}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-black text-lg tabular-nums ${
            isLowTime
              ? 'bg-[color-mix(in_srgb,var(--hard)_12%,transparent)] border-hard text-hard'
              : 'bg-surface border-border text-foreground'
          }`}
        >
          <Clock className="h-4 w-4" aria-hidden="true" />
          {formatClock(remainingMs)}
        </div>
      </div>

      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isLowTime ? 'bg-hard' : 'bg-primary'}`}
          animate={{ width: `${percentRemaining}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="ide-pane p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-xl font-black text-foreground">{problem.title}</h2>
            <div className="flex items-center gap-2">
              <span className={`badge ${DIFFICULTY_BADGE[problem.difficulty]}`}>{problem.difficulty}</span>
              <span className="text-xs text-muted-foreground font-mono">{problem.source} · {problem.topic}</span>
            </div>
          </div>
          <Link
            href={`/problems/${problem.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium-secondary px-4 py-2 text-xs cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            Open Workspace <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {problem.description.replace(/[*`_#]/g, '')}
        </p>

        <div className="flex flex-wrap gap-3 mt-2">
          <button
            onClick={onSolved}
            className="flex-1 min-w-[160px] px-5 py-3 rounded-xl bg-complete text-complete-foreground font-bold flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Mark Solved
          </button>
          <button
            onClick={onSkipped}
            className="flex-1 min-w-[160px] px-5 py-3 rounded-xl border border-border text-foreground font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-muted transition-colors"
          >
            <SkipForward className="h-4 w-4" aria-hidden="true" /> Skip
          </button>
        </div>
      </div>

      <button
        onClick={onEndEarly}
        className="self-start text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <Flag className="h-3.5 w-3.5" aria-hidden="true" /> End session now
      </button>
    </motion.div>
  );
}

function SummaryPanel({ session, onRestart }: { session: CompletedSession; onRestart: () => void }) {
  const summary = summarizeSession(session);

  const stats = [
    { icon: CheckCircle2, label: 'Solved', value: summary.solved, color: 'text-easy' },
    { icon: SkipForward, label: 'Skipped', value: summary.skipped, color: 'text-medium' },
    { icon: Target, label: 'Accuracy', value: `${Math.round(summary.accuracy * 100)}%`, color: 'text-primary' },
    { icon: TrendingUp, label: 'Avg. time', value: formatMinSec(summary.avgTimePerAttemptedMs), color: 'text-foreground' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springSoft}
      className="flex flex-col gap-6"
    >
      <div className="ide-pane p-6 flex flex-col items-center gap-4 text-center">
        <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
          <Trophy className="h-8 w-8" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-black text-foreground">
            {session.endedByTimeout ? "Time's up" : 'Session complete'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {summary.solved} of {summary.totalProblems} problems solved in {session.config.durationMin} minutes.
          </p>
        </div>
        <div className="text-3xl font-black text-primary">+{session.xpAwarded} XP</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="ide-pane p-4 flex flex-col items-center gap-1.5 text-center">
            <s.icon className={`h-4 w-4 ${s.color}`} aria-hidden="true" />
            <span className={`text-lg font-black ${s.color}`}>{s.value}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="ide-pane p-5 flex flex-col gap-2">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Problem-by-problem</h3>
        <ul className="flex flex-col gap-1.5">
          {session.results.map((r) => (
            <li
              key={r.problemId}
              className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-surface text-sm"
            >
              <span className="text-foreground font-medium truncate">
                {problems.find((p) => p.id === r.problemId)?.title ?? r.problemId}
              </span>
              <span
                className={`text-xs font-bold uppercase tracking-wide shrink-0 ${
                  r.outcome === 'solved' ? 'text-easy' : r.outcome === 'skipped' ? 'text-medium' : 'text-muted-foreground'
                }`}
              >
                {r.outcome}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onRestart}
        className="btn-primary px-6 py-3 font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2 self-start"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" /> Run another session <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.div>
  );
}
