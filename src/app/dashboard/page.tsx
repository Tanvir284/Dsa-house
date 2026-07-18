'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  CheckCircle2,
  Bookmark,
  Trophy,
  ArrowRight,
  Flame,
  Sparkles,
  Star,
  Target,
  Award,
  BarChart3,
  Settings,
  Download,
  RotateCcw,
  RefreshCw,
  Calendar,
  Zap,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useAppStore, UserProfile, ProfileUpdate } from '@/lib/store';
import { topics, categories } from '@/data';
import {
  ACHIEVEMENTS,
  getCategoryProgress,
  getHeatmapWeeks,
  getLevelProgress,
  getQuizStatsByTopic,
  getRankTitle,
  getWeakTopics,
  LEARNING_GOAL_LABELS,
  LANGUAGE_OPTIONS,
} from '@/lib/profile-stats';
import { getWeeklyActiveDays } from '@/lib/profile-utils';
import type { LearningGoal } from '@/lib/profile-stats';

type TabId = 'overview' | 'achievements' | 'analytics' | 'settings';

export default function DashboardPage() {
  const {
    profile,
    completedLessons,
    bookmarks,
    quizAttempts,
    loginMockUser,
    updateProfile,
    refreshAvatar,
    exportUserData,
    resetProgress,
    spacedRepetition,
    recordReview,
  } = useAppStore();

  const [tab, setTab] = useState<TabId>('overview');
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState<string | null>(null);

  const last7DaysData = useMemo(() => {
    if (!profile) return [];
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString(undefined, { weekday: 'short' });
      const val = profile.activity_days[key] ?? 0;
      arr.push({ label, val });
    }
    return arr;
  }, [profile]);

  const maxVal = useMemo(() => {
    const vals = last7DaysData.map(d => d.val);
    return Math.max(...vals, 5);
  }, [last7DaysData]);

  const categoryQuizAverages = useMemo(() => {
    const sums: Record<string, { totalScore: number; totalQuestions: number }> = {};
    for (const attempt of quizAttempts) {
      const topic = topics.find(t => t.slug === attempt.topic_slug);
      const catId = topic?.category_id ?? 'general';
      if (!sums[catId]) {
        sums[catId] = { totalScore: 0, totalQuestions: 0 };
      }
      sums[catId].totalScore += attempt.score;
      sums[catId].totalQuestions += attempt.total_questions;
    }
    
    return categories.map(cat => {
      const stat = sums[cat.id];
      const avg = stat && stat.totalQuestions > 0 
        ? Math.round((stat.totalScore / stat.totalQuestions) * 100)
        : 0;
      return {
        title: cat.title,
        avg,
      };
    });
  }, [quizAttempts]);

  const dueReviewsList = useMemo(() => {
    if (!spacedRepetition) return [];
    const now = new Date();
    return Object.values(spacedRepetition).filter((item) => {
      const reviewDate = new Date(item.nextReviewDate);
      return reviewDate <= now;
    }).map((item) => {
      if (item.type === 'topic') {
        const topic = topics.find((t) => t.slug === item.id);
        return {
          ...item,
          title: topic?.title ?? item.id,
          link: `/topics/${item.id}`,
        };
      } else {
        return {
          ...item,
          title: `Problem: ${item.id.toUpperCase()}`,
          link: `/practice`,
        };
      }
    });
  }, [spacedRepetition]);

  const completedTopicsList = useMemo(
    () => topics.filter((t) => completedLessons.includes(t.slug)),
    [completedLessons]
  );
  const bookmarkedTopicsList = useMemo(
    () => topics.filter((t) => bookmarks.includes(t.slug)),
    [bookmarks]
  );

  const totalLessons = topics.length;
  const completedPercent =
    totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
  const nextLesson = useMemo(
    () => topics.find((t) => !completedLessons.includes(t.slug)),
    [completedLessons]
  );

  const levelInfo = useMemo(
    () => (profile ? getLevelProgress(profile.total_xp) : null),
    [profile]
  );
  const categoryProgress = useMemo(() => getCategoryProgress(completedLessons), [completedLessons]);
  const quizStats = useMemo(() => getQuizStatsByTopic(quizAttempts), [quizAttempts]);
  const weakTopics = useMemo(() => getWeakTopics(quizAttempts), [quizAttempts]);
  const heatmap = useMemo(
    () => (profile ? getHeatmapWeeks(profile.activity_days) : []),
    [profile]
  );
  const weeklyActiveDays = useMemo(
    () => (profile ? getWeeklyActiveDays(profile.activity_days) : 0),
    [profile]
  );

  const avgQuizPercent = useMemo(() => {
    if (quizAttempts.length === 0) return 0;
    const sum = quizAttempts.reduce(
      (acc, a) => acc + (a.score / a.total_questions) * 100,
      0
    );
    return Math.round(sum / quizAttempts.length);
  }, [quizAttempts]);

  const perfectQuizzes = useMemo(
    () => quizAttempts.filter((a) => a.score === a.total_questions).length,
    [quizAttempts]
  );

  const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];


  if (!profile) {
    return (
      <div className="flex flex-col items-center gap-6 py-20 text-center max-w-md mx-auto animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Your Learning Profile</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to unlock XP, levels, achievements, activity heatmaps, and progress analytics.
          </p>
        </div>
        <button
          onClick={() => loginMockUser('AlgoMaster')}
          className="px-6 py-3 font-semibold rounded-lg btn-primary cursor-pointer"
        >
          Sign In
        </button>
      </div>
    );
  }

  const rankTitle = getRankTitle(levelInfo?.level ?? 1);
  const weeklyGoal = profile.weekly_goal_lessons;
  const weeklyPercent = weeklyGoal > 0 ? Math.min(100, Math.round((weeklyActiveDays / weeklyGoal) * 100)) : 0;

  return (
    <div className="flex flex-col gap-6 py-4 w-full animate-fade-in">
      {/* Profile hero */}
      <section className="card p-6 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <Image
                src={profile.avatar_url}
                alt=""
                width={80}
                height={80}
                className="h-20 w-20 rounded-2xl border-2 border-border bg-muted object-cover"
                unoptimized
              />
              <span className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-card">
                Lv {levelInfo?.level ?? 1}
              </span>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <h1 className="text-2xl font-bold text-foreground truncate">{profile.username}</h1>
              <p className="text-sm text-primary font-semibold">{rankTitle}</p>
              {profile.bio ? (
                <p className="text-sm text-muted-foreground mt-1 max-w-md leading-relaxed">{profile.bio}</p>
              ) : (
                <p className="text-xs text-muted-foreground italic mt-1">No bio yet — add one in Settings</p>
              )}
              <div className="flex flex-wrap gap-2 mt-2 text-[10px] font-semibold text-muted-foreground">
                <span className="badge badge-primary">
                  {LEARNING_GOAL_LABELS[profile.learning_goal]}
                </span>
                <span className="badge bg-surface text-muted-foreground">
                  Member since {new Date(profile.member_since).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
            <StatPill icon={Flame} label="Streak" value={`${profile.streak_count}d`} accent="text-primary" />
            <StatPill icon={TrendingUp} label="Best streak" value={`${profile.longest_streak}d`} accent="text-amber-500" />
            <StatPill icon={Zap} label="Total XP" value={profile.total_xp.toLocaleString()} accent="text-accent" />
            <StatPill icon={CheckCircle2} label="Progress" value={`${completedPercent}%`} accent="text-complete" />
          </div>
        </div>

        {/* Level bar */}
        {levelInfo && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">
                Level {levelInfo.level} — {profile.total_xp.toLocaleString()} XP
              </span>
              <span className="text-muted-foreground">
                {levelInfo.percent}% to Level {levelInfo.level + 1}
              </span>
            </div>
            <div className="progress-bar h-2.5">
              <div className="progress-bar-fill" style={{ width: `${levelInfo.percent}%` }} />
            </div>
          </div>
        )}

        {/* Weekly goal */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center gap-3 flex-1">
            <Target className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-xs font-bold text-foreground">Weekly learning goal</p>
              <p className="text-[11px] text-muted-foreground">
                {weeklyActiveDays} of {weeklyGoal} active days this week
              </p>
            </div>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="progress-bar h-2">
              <div
                className="h-full bg-complete rounded-full transition-all"
                style={{ width: `${weeklyPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/60 border border-border overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              tab === id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="flex flex-col gap-6">
          {nextLesson && (
            <section className="card p-5 border-primary/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Continue learning</span>
                  <p className="text-sm font-semibold text-foreground">{nextLesson.title}</p>
                </div>
              </div>
              <Link
                href={`/topics/${nextLesson.slug}`}
                className="px-4 py-2 text-xs font-semibold rounded-lg btn-primary flex items-center gap-1 cursor-pointer shrink-0"
              >
                Resume <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>
          )}

          {/* Spaced Repetition Scheduler Panel */}
          <section className="card p-5 border-accent/25 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground">SM-2 Spaced Repetition Reviews</h3>
                  <p className="text-[10px] text-muted-foreground">Keep your mental algorithms sharp using interval recall scheduling</p>
                </div>
              </div>
              <span className="text-[10px] font-bold font-mono bg-accent/15 text-accent border border-accent/25 px-2.5 py-0.5 rounded-full">
                {dueReviewsList.length} Due
              </span>
            </div>

            {reviewSuccessMsg && (
              <div className="mb-4 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg animate-fade-in flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {reviewSuccessMsg}
              </div>
            )}

            {dueReviewsList.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-border rounded-xl bg-muted/20">
                <p className="text-xs font-bold text-foreground">🧠 All caught up for today!</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Your memory schedule is clean. Come back tomorrow or select a completed lesson to study ahead.</p>
                
                {completedLessons.length > 0 && (
                  <div className="mt-4 max-w-xs mx-auto flex flex-col gap-1.5">
                    <label className="text-[9px] font-bold text-muted-foreground uppercase">Proactive Recall study</label>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setActiveReviewId(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="w-full bg-black/40 border border-border px-2.5 py-1.5 rounded-lg text-xs text-foreground focus:outline-none"
                    >
                      <option value="">-- Choose a topic to review --</option>
                      {completedLessons.map((slug) => {
                        const topic = topics.find((t) => t.slug === slug);
                        return (
                          <option key={slug} value={slug}>
                            {topic?.title ?? slug}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dueReviewsList.map((item) => (
                  <div key={item.id} className="p-3.5 rounded-xl border border-border bg-black/20 flex flex-col justify-between gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-1.5 py-0.5 rounded">
                          {item.type}
                        </span>
                        <h4 className="text-xs font-bold text-foreground mt-1.5">{item.title}</h4>
                      </div>
                      <Link href={item.link} className="text-[10px] text-muted-foreground hover:text-foreground font-semibold flex items-center gap-0.5">
                        Open <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {activeReviewId === item.id ? (
                      <div className="flex flex-col gap-2 pt-2 border-t border-border/40 animate-slide-up">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase">Rate your memory recall:</p>
                        <div className="grid grid-cols-5 gap-1 text-[10px] font-bold">
                          {[
                            { rating: 1, label: 'Forgot 🔴' },
                            { rating: 2, label: 'Vague 🟡' },
                            { rating: 3, label: 'Hard 🔵' },
                            { rating: 4, label: 'Good 🟢' },
                            { rating: 5, label: 'Perfect 🌟' },
                          ].map((btn) => (
                            <button
                              key={btn.rating}
                              onClick={() => {
                                recordReview(item.id, item.type, btn.rating);
                                setActiveReviewId(null);
                                setReviewSuccessMsg(`Review recorded! Calculated interval: ${item.repetitions === 0 ? 1 : item.repetitions === 1 ? 6 : Math.round(item.interval * item.ease)} days. +${15 * btn.rating} XP!`);
                                setTimeout(() => setReviewSuccessMsg(null), 4000);
                              }}
                              className="px-1 py-2 bg-black/40 hover:bg-accent hover:text-black border border-white/10 rounded text-center transition cursor-pointer text-[8px]"
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveReviewId(item.id)}
                        className="w-full py-1.5 text-[10px] font-bold rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition cursor-pointer"
                      >
                        Verify Recall
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Custom Review Modal for Study Ahead */}
            {activeReviewId && !dueReviewsList.some(x => x.id === activeReviewId) && (
              <div className="mt-4 p-3.5 rounded-xl border border-accent/20 bg-accent/5 animate-slide-up text-left">
                <div className="flex justify-between items-center gap-2">
                  <h4 className="text-xs font-bold text-foreground">
                    Study Ahead: {topics.find(t => t.slug === activeReviewId)?.title ?? activeReviewId}
                  </h4>
                  <button onClick={() => setActiveReviewId(null)} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">Cancel</button>
                </div>
                <div className="flex flex-col gap-2 pt-3 border-t border-border/40 mt-2">
                  <p className="text-[9px] font-bold text-muted-foreground uppercase">Rate your memory recall:</p>
                  <div className="grid grid-cols-5 gap-1 text-[10px] font-bold">
                    {[
                      { rating: 1, label: 'Forgot 🔴' },
                      { rating: 2, label: 'Vague 🟡' },
                      { rating: 3, label: 'Hard 🔵' },
                      { rating: 4, label: 'Good 🟢' },
                      { rating: 5, label: 'Perfect 🌟' },
                    ].map((btn) => (
                      <button
                        key={btn.rating}
                        onClick={() => {
                          recordReview(activeReviewId, 'topic', btn.rating);
                          setActiveReviewId(null);
                          setReviewSuccessMsg(`Review recorded for ${activeReviewId}! +${15 * btn.rating} XP!`);
                          setTimeout(() => setReviewSuccessMsg(null), 4000);
                        }}
                        className="px-1 py-2 bg-black/40 hover:bg-accent hover:text-black border border-white/10 rounded text-center transition cursor-pointer text-[8px]"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MiniStat label="Lessons done" value={completedLessons.length} sub={`of ${totalLessons}`} />
            <MiniStat label="Quizzes taken" value={quizAttempts.length} sub={`${avgQuizPercent}% avg`} />
            <MiniStat label="Perfect scores" value={perfectQuizzes} sub="100% quizzes" />
            <MiniStat label="Bookmarks" value={bookmarks.length} sub="saved topics" />
          </div>

          {/* Activity heatmap */}
          <section className="card p-5">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-primary" /> Activity (12 weeks)
            </h2>
            <div className="flex gap-1 overflow-x-auto pb-2">
              {heatmap.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.date}: ${day.count} actions`}
                      className={`w-3 h-3 rounded-sm border border-border/40 ${
                        day.count === 0
                          ? 'bg-muted'
                          : day.count === 1
                            ? 'bg-primary/35'
                            : day.count === 2
                              ? 'bg-primary/55'
                              : 'bg-primary'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-3">Darker orange = more learning activity that day</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopicList
              title="Completed lessons"
              icon={CheckCircle2}
              iconClass="text-complete"
              items={completedTopicsList}
              empty="No lessons completed yet."
            />
            <TopicList
              title="Bookmarked"
              icon={Bookmark}
              iconClass="text-primary"
              items={bookmarkedTopicsList}
              empty="No bookmarks yet."
              showDifficulty
            />
          </div>

          {weakTopics.length > 0 && (
            <section className="card p-5 border-amber-500/20">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
                <AlertCircle className="h-4 w-4 text-amber-500" /> Topics to review
              </h2>
              <div className="flex flex-col gap-2">
                {weakTopics.map((t) => (
                  <Link
                    key={t.topicSlug}
                    href={`/practice/quiz/${t.topicSlug}`}
                    className="flex justify-between items-center p-3 rounded-lg border border-border hover:border-primary/40 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">{t.title}</span>
                    <span className="text-xs font-mono text-amber-500">
                      {t.avgPercent}% avg · {t.attempts} tries
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {tab === 'achievements' && (
        <section className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              Achievements ({profile.achievements.length}/{ACHIEVEMENTS.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ACHIEVEMENTS.map((ach) => {
              const unlocked = profile.achievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-xl border flex gap-3 transition-all ${
                    unlocked
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-border bg-muted/30 opacity-60 grayscale'
                  }`}
                >
                  <span
                    className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl ${
                      unlocked ? 'bg-primary/10 text-primary' : 'bg-surface text-muted-foreground'
                    }`}
                    aria-hidden="true"
                  >
                    <ach.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{ach.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{ach.description}</p>
                    {ach.xpBonus > 0 && (
                      <p className="text-[10px] font-bold text-primary mt-1">+{ach.xpBonus} XP</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {tab === 'analytics' && (
        <div className="flex flex-col gap-6">
          {/* XP & Activity Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="card p-5">
              <div className="flex flex-col gap-1 mb-4 text-left">
                <span className="text-[10px] font-bold text-primary uppercase">7-Day Trend</span>
                <h3 className="text-sm font-bold text-foreground">Learning Activity Trend</h3>
              </div>
              
              <div className="w-full h-48 bg-black/25 rounded-xl border border-white/5 p-2 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                    const y = 20 + ratio * 140;
                    return (
                      <line
                        key={idx}
                        x1="40"
                        y1={y}
                        x2="480"
                        y2={y}
                        stroke="rgba(255,255,255,0.05)"
                        strokeDasharray="4 4"
                      />
                    );
                  })}

                  {/* Draw Paths */}
                  {(() => {
                    const points = last7DaysData.map((d, i) => {
                      const x = 40 + (i * 440) / 6;
                      const y = 160 - (d.val * 130) / maxVal;
                      return { x, y, ...d };
                    });

                    const lineD = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;
                    const areaD = `${lineD} L ${points[points.length-1].x} 160 L ${points[0].x} 160 Z`;

                    return (
                      <>
                        <path d={areaD} fill="url(#areaGrad)" />
                        <path d={lineD} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
                        
                        {/* Data points */}
                        {points.map((p, idx) => (
                          <g key={idx} className="group/dot cursor-pointer">
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="5"
                              fill="#6366f1"
                              stroke="#030712"
                              strokeWidth="2"
                            />
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r="10"
                              fill="#6366f1"
                              fillOpacity="0.2"
                              className="opacity-0 hover:opacity-100 transition-opacity"
                            />
                            {/* Hover Value Tooltip */}
                            <text
                              x={p.x}
                              y={p.y - 12}
                              textAnchor="middle"
                              className="text-[9px] font-mono fill-white bg-black font-bold"
                            >
                              {p.val}
                            </text>
                          </g>
                        ))}

                        {/* X Axis Labels */}
                        {points.map((p, idx) => (
                          <text
                            key={idx}
                            x={p.x}
                            y="180"
                            textAnchor="middle"
                            className="text-[9px] fill-white/40 font-semibold"
                          >
                            {p.label}
                          </text>
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>
            </section>

            <section className="card p-5">
              <div className="flex flex-col gap-1 mb-4 text-left">
                <span className="text-[10px] font-bold text-accent uppercase">Category Accuracy</span>
                <h3 className="text-sm font-bold text-foreground">Quiz Accuracy By Domain</h3>
              </div>
              
              <div className="w-full h-48 bg-black/25 rounded-xl border border-white/5 p-2 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 25, 50, 75, 100].map((val, idx) => {
                    const x = 50 + (val / 100) * 320;
                    return (
                      <g key={idx}>
                        <line
                          x1={x}
                          y1="10"
                          x2={x}
                          y2="150"
                          stroke="rgba(255,255,255,0.05)"
                        />
                        <text
                          x={x}
                          y="165"
                          textAnchor="middle"
                          className="text-[8px] fill-white/30 font-mono"
                        >
                          {val}%
                        </text>
                      </g>
                    );
                  })}

                  {/* Render horizontal bars */}
                  {categoryQuizAverages.map((cat, idx) => {
                    const y = 20 + idx * 32;
                    const barWidth = (cat.avg / 100) * 320;
                    return (
                      <g key={idx}>
                        {/* Label */}
                        <text
                          x="10"
                          y={y + 12}
                          className="text-[9px] fill-white/70 font-semibold"
                          alignmentBaseline="middle"
                        >
                          {cat.title.substring(0, 8)}..
                        </text>
                        {/* Bar background */}
                        <rect
                          x="50"
                          y={y}
                          width="320"
                          height="16"
                          fill="rgba(255,255,255,0.03)"
                          rx="4"
                        />
                        {/* Active Bar */}
                        <rect
                          x="50"
                          y={y}
                          width={barWidth}
                          height="16"
                          fill="url(#barGrad)"
                          rx="4"
                        />
                        {/* Percent value */}
                        <text
                          x={Math.max(60, 50 + barWidth - 25)}
                          y={y + 10}
                          className="text-[8px] fill-black font-black font-mono"
                          alignmentBaseline="middle"
                        >
                          {cat.avg}%
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </section>
          </div>

          <section className="card p-5">
            <h2 className="text-sm font-bold text-foreground mb-4 text-left">Progress by category</h2>
            <div className="flex flex-col gap-4 text-left">
              {categoryProgress.map((cat) => (
                <div key={cat.categoryId}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold text-foreground">{cat.title}</span>
                    <span className="text-muted-foreground font-mono">
                      {cat.completed}/{cat.total} ({cat.percent}%)
                    </span>
                  </div>
                  <div className="progress-bar h-2">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-5">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
              <Trophy className="h-4 w-4 text-amber-500" /> Quiz performance
            </h2>
            {quizStats.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No quiz data yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border">
                      <th className="pb-2 font-semibold">Topic</th>
                      <th className="pb-2 font-semibold">Attempts</th>
                      <th className="pb-2 font-semibold">Best</th>
                      <th className="pb-2 font-semibold">Average</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {quizStats.map((row) => (
                      <tr key={row.topicSlug} className="text-foreground">
                        <td className="py-2.5 font-medium">{row.title}</td>
                        <td className="py-2.5 font-mono text-muted-foreground">{row.attempts}</td>
                        <td className="py-2.5 font-mono text-complete">{row.bestPercent}%</td>
                        <td className="py-2.5 font-mono">{row.avgPercent}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="card overflow-hidden">
            <h2 className="text-sm font-bold text-foreground p-5 pb-0 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" /> Recent attempts
            </h2>
            {quizAttempts.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">No quizzes attempted.</p>
            ) : (
              <div className="divide-y divide-border">
                {quizAttempts.slice(0, 12).map((att, idx) => {
                  const t = topics.find((x) => x.slug === att.topic_slug);
                  const pct = Math.round((att.score / att.total_questions) * 100);
                  const perfect = att.score === att.total_questions;
                  return (
                    <div key={idx} className="p-4 flex flex-col gap-1">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">
                          {t?.title || att.topic_slug}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            perfect ? 'bg-complete/10 text-complete' : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {att.score}/{att.total_questions}
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>{pct}%</span>
                        <span>{new Date(att.attempted_at).toLocaleString()}</span>
                      </div>
                      <div className="progress-bar h-1 mt-1">
                        <div
                          className={`h-full rounded-full ${perfect ? 'bg-complete' : 'bg-primary'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {tab === 'settings' && (
        <SettingsSection
          key={profile.id + '-' + profile.username + '-' + profile.bio}
          profile={profile}
          updateProfile={updateProfile}
          refreshAvatar={refreshAvatar}
          exportUserData={exportUserData}
          resetProgress={resetProgress}
        />
      )}
    </div>
  );
}

function StatPill({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="surface px-3 py-2.5 rounded-xl text-center min-w-[88px]">
      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide">{label}</span>
      <p className={`text-base font-bold flex items-center justify-center gap-1 mt-0.5 ${accent}`}>
        <Icon className="h-3.5 w-3.5" />
        {value}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: number;
  sub: string;
}) {
  return (
    <div className="card p-4 flex flex-col gap-0.5">
      <span className="text-[10px] font-bold text-muted-foreground uppercase">{label}</span>
      <span className="text-2xl font-black text-foreground">{value}</span>
      <span className="text-[10px] text-muted-foreground">{sub}</span>
    </div>
  );
}

function TopicList({
  title,
  icon: Icon,
  iconClass,
  items,
  empty,
  showDifficulty,
}: {
  title: string;
  icon: React.ElementType;
  iconClass: string;
  items: typeof topics;
  empty: string;
  showDifficulty?: boolean;
}) {
  return (
    <div>
      <h2 className={`text-sm font-bold text-foreground flex items-center gap-2 mb-3`}>
        <Icon className={`h-4 w-4 ${iconClass}`} /> {title} ({items.length})
      </h2>
      {items.length === 0 ? (
        <div className="surface p-6 text-center text-sm text-muted-foreground rounded-xl">{empty}</div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {items.map((t) => (
            <Link
              key={t.id}
              href={`/topics/${t.slug}`}
              className="card p-3 flex justify-between items-center group"
            >
              <div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {t.title}
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  {showDifficulty
                    ? t.difficulty
                    : categories.find((c) => c.id === t.category_id)?.title}
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

interface SettingsSectionProps {
  profile: UserProfile;
  updateProfile: (patch: ProfileUpdate) => void;
  refreshAvatar: () => void;
  exportUserData: () => void;
  resetProgress: () => void;
}

function SettingsSection({
  profile,
  updateProfile,
  refreshAvatar,
  exportUserData,
  resetProgress,
}: SettingsSectionProps) {
  const [usernameDraft, setUsernameDraft] = useState(profile.username);
  const [bioDraft, setBioDraft] = useState(profile.bio);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSaveSettings = () => {
    updateProfile({
      username: usernameDraft.trim() || profile.username,
      bio: bioDraft,
    });
    setSavedMsg('Profile saved!');
    setTimeout(() => setSavedMsg(''), 2500);
  };

  return (
    <section className="card p-6 flex flex-col gap-6 max-w-xl animate-fade-in">
      <h2 className="text-base font-bold text-foreground flex items-center gap-2">
        <Settings className="h-4 w-4 text-primary" /> Profile settings
      </h2>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground">Display name</label>
        <input
          type="text"
          value={usernameDraft}
          onChange={(e) => setUsernameDraft(e.target.value)}
          className="input-themed px-3 py-2 border rounded-lg text-sm"
          maxLength={32}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground">Bio</label>
        <textarea
          value={bioDraft}
          onChange={(e) => setBioDraft(e.target.value)}
          rows={3}
          maxLength={200}
          placeholder="What are you learning DSA for?"
          className="input-themed px-3 py-2 border rounded-lg text-sm resize-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground">Learning goal</label>
        <select
          value={profile.learning_goal}
          onChange={(e) => updateProfile({ learning_goal: e.target.value as LearningGoal })}
          className="input-themed px-3 py-2 border rounded-lg text-sm"
        >
          {(Object.entries(LEARNING_GOAL_LABELS) as [LearningGoal, string][]).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground">Preferred code language</label>
        <select
          value={profile.preferred_language}
          onChange={(e) =>
            updateProfile({
              preferred_language: e.target.value as typeof profile.preferred_language,
            })
          }
          className="input-themed px-3 py-2 border rounded-lg text-sm"
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted-foreground">
          Weekly active-day goal: {profile.weekly_goal_lessons} days
        </label>
        <input
          type="range"
          min={1}
          max={7}
          value={profile.weekly_goal_lessons}
          onChange={(e) =>
            updateProfile({ weekly_goal_lessons: Number(e.target.value) })
          }
          className="w-full accent-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <button
          type="button"
          onClick={handleSaveSettings}
          className="px-4 py-2 text-sm font-semibold rounded-lg btn-primary cursor-pointer"
        >
          Save profile
        </button>
        <button
          type="button"
          onClick={refreshAvatar}
          className="px-4 py-2 text-sm font-semibold rounded-lg btn-secondary flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" /> New avatar
        </button>
      </div>
      {savedMsg && <p className="text-xs font-semibold text-complete">{savedMsg}</p>}

      <hr className="border-border" />

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-muted-foreground uppercase">Data</p>
        <button
          type="button"
          onClick={exportUserData}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-border hover:bg-muted cursor-pointer w-fit"
        >
          <Download className="h-4 w-4" /> Export backup (JSON)
        </button>
        <button
          type="button"
          onClick={resetProgress}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 cursor-pointer w-fit"
        >
          <RotateCcw className="h-4 w-4" /> Reset lesson & quiz progress
        </button>
      </div>
    </section>
  );
}
