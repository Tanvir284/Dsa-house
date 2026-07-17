import { CodeLanguage } from '@/types';
import { categories, topics } from '@/data';
import { UserProfile } from '@/lib/store';
import { QuizAttempt } from '@/types';
import { dateKey } from '@/lib/profile-utils';

export type LearningGoal = 'interview' | 'university' | 'competitive' | 'exploration';

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpBonus: number;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'first_step', title: 'First Step', description: 'Complete your first lesson', icon: '🎯', xpBonus: 50 },
  { id: 'streak_3', title: 'On Fire', description: 'Reach a 3-day streak', icon: '🔥', xpBonus: 75 },
  { id: 'streak_7', title: 'Week Warrior', description: 'Reach a 7-day streak', icon: '⚡', xpBonus: 150 },
  { id: 'streak_30', title: 'Unstoppable', description: 'Reach a 30-day streak', icon: '👑', xpBonus: 500 },
  { id: 'quiz_rookie', title: 'Quiz Rookie', description: 'Complete your first quiz', icon: '📝', xpBonus: 40 },
  { id: 'perfect_score', title: 'Perfect Score', description: 'Score 100% on any quiz', icon: '💯', xpBonus: 100 },
  { id: 'quiz_veteran', title: 'Quiz Veteran', description: 'Complete 5 quizzes', icon: '🏆', xpBonus: 200 },
  { id: 'halfway', title: 'Halfway There', description: 'Complete 50% of all topics', icon: '📈', xpBonus: 150 },
  { id: 'master', title: 'DSA Master', description: 'Complete every topic', icon: '🎓', xpBonus: 1000 },
  { id: 'collector', title: 'Collector', description: 'Bookmark 5 topics', icon: '🔖', xpBonus: 60 },
  { id: 'xp_1000', title: 'Rising Star', description: 'Earn 1,000 total XP', icon: '⭐', xpBonus: 0 },
  { id: 'xp_5000', title: 'Algorithm Elite', description: 'Earn 5,000 total XP', icon: '🌟', xpBonus: 0 },
];

export const LEVEL_THRESHOLDS = [0, 300, 800, 1500, 2500, 4000, 6000, 9000, 13000, 18000];

export function getLevelFromXp(xp: number): number {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return level;
}

export function getLevelProgress(xp: number): { level: number; current: number; next: number; percent: number } {
  const level = getLevelFromXp(xp);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 5000;
  const current = xp - currentThreshold;
  const span = nextThreshold - currentThreshold;
  return {
    level,
    current,
    next: nextThreshold,
    percent: span > 0 ? Math.min(100, Math.round((current / span) * 100)) : 100,
  };
}

export function getRankTitle(level: number): string {
  const titles = [
    'Novice Coder',
    'Syntax Scout',
    'Pointer Pilot',
    'Tree Climber',
    'Graph Explorer',
    'Sort Specialist',
    'Search Strategist',
    'Complexity Analyst',
    'Interview Ready',
    'DSA Architect',
  ];
  return titles[Math.min(level - 1, titles.length - 1)] ?? 'DSA Legend';
}

export interface CategoryProgress {
  categoryId: string;
  title: string;
  completed: number;
  total: number;
  percent: number;
}

export function getCategoryProgress(completedSlugs: string[]): CategoryProgress[] {
  return categories.map((cat) => {
    const catTopics = topics.filter((t) => t.category_id === cat.id);
    const completed = catTopics.filter((t) => completedSlugs.includes(t.slug)).length;
    const total = catTopics.length;
    return {
      categoryId: cat.id,
      title: cat.title,
      completed,
      total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });
}

export interface QuizTopicStats {
  topicSlug: string;
  title: string;
  attempts: number;
  bestPercent: number;
  avgPercent: number;
  lastAttempt?: string;
}

export function getQuizStatsByTopic(attempts: QuizAttempt[]): QuizTopicStats[] {
  const bySlug = new Map<string, QuizAttempt[]>();
  for (const att of attempts) {
    const list = bySlug.get(att.topic_slug) ?? [];
    list.push(att);
    bySlug.set(att.topic_slug, list);
  }

  return Array.from(bySlug.entries())
    .map(([slug, list]) => {
      const percents = list.map((a) => (a.score / a.total_questions) * 100);
      const topic = topics.find((t) => t.slug === slug);
      return {
        topicSlug: slug,
        title: topic?.title ?? slug,
        attempts: list.length,
        bestPercent: Math.round(Math.max(...percents)),
        avgPercent: Math.round(percents.reduce((a, b) => a + b, 0) / percents.length),
        lastAttempt: list[0]?.attempted_at,
      };
    })
    .sort((a, b) => b.attempts - a.attempts);
}

export function getWeakTopics(attempts: QuizAttempt[], limit = 3): QuizTopicStats[] {
  return getQuizStatsByTopic(attempts)
    .filter((s) => s.avgPercent < 80 && s.attempts > 0)
    .sort((a, b) => a.avgPercent - b.avgPercent)
    .slice(0, limit);
}

export function getHeatmapWeeks(activityDays: Record<string, number>, weeks = 12): { date: string; count: number }[][] {
  const result: { date: string; count: number }[][] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - weeks * 7 + 1);
  // Align to Sunday
  start.setDate(start.getDate() - start.getDay());

  const cursor = new Date(start);
  let week: { date: string; count: number }[] = [];

  while (cursor <= today) {
    const key = dateKey(cursor);
    week.push({ date: key, count: activityDays[key] ?? 0 });
    if (week.length === 7) {
      result.push(week);
      week = [];
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  if (week.length > 0) result.push(week);

  return result.slice(-weeks);
}

export function evaluateAchievements(
  profile: UserProfile,
  completedLessons: string[],
  bookmarks: string[],
  quizAttempts: QuizAttempt[]
): string[] {
  // Start from an empty set so achievements are a pure derivation of current
  // state; users who no longer meet the criteria (e.g. after resetProgress)
  // should not keep the badge.
  const unlocked = new Set<string>();
  const totalTopics = topics.length;
  const perfectQuiz = quizAttempts.some((a) => a.score === a.total_questions);

  const checks: [string, boolean][] = [
    ['first_step', completedLessons.length >= 1],
    ['streak_3', profile.streak_count >= 3],
    ['streak_7', profile.streak_count >= 7],
    ['streak_30', profile.streak_count >= 30],
    ['quiz_rookie', quizAttempts.length >= 1],
    ['perfect_score', perfectQuiz],
    ['quiz_veteran', quizAttempts.length >= 5],
    ['halfway', completedLessons.length >= Math.ceil(totalTopics / 2)],
    ['master', completedLessons.length >= totalTopics],
    ['collector', bookmarks.length >= 5],
    ['xp_1000', profile.total_xp >= 1000],
    ['xp_5000', profile.total_xp >= 5000],
  ];

  for (const [id, ok] of checks) {
    if (ok) unlocked.add(id);
  }

  return Array.from(unlocked);
}

export function getNewAchievements(previous: string[], next: string[]): string[] {
  return next.filter((id) => !previous.includes(id));
}

export function xpForQuiz(score: number, total: number): number {
  const base = 40;
  const perCorrect = 15;
  const perfectBonus = score === total ? 60 : 0;
  return base + score * perCorrect + perfectBonus;
}

export const LEARNING_GOAL_LABELS: Record<LearningGoal, string> = {
  interview: 'Interview prep',
  university: 'University / coursework',
  competitive: 'Competitive programming',
  exploration: 'Casual exploration',
};

export const LANGUAGE_OPTIONS: { value: CodeLanguage; label: string }[] = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
];
