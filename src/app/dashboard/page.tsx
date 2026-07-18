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
  } = useAppStore();

  const [tab, setTab] = useState<TabId>('overview');

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
          <section className="card p-5">
            <h2 className="text-sm font-bold text-foreground mb-4">Progress by category</h2>
            <div className="flex flex-col gap-4">
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
