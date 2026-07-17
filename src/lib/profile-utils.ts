import { UserProfile } from '@/lib/store';
import { LearningGoal } from '@/lib/profile-stats';
import { CodeLanguage } from '@/types';

export function createDefaultProfile(username: string, existing?: Partial<UserProfile> | null): UserProfile {
  const now = new Date().toISOString();
  const name = username.trim() || 'AlgorithmLearner';

  return {
    id: existing?.id,
    username: name,
    avatar_url:
      existing?.avatar_url ??
      `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    streak_count: existing?.streak_count ?? 1,
    longest_streak: existing?.longest_streak ?? existing?.streak_count ?? 1,
    last_activity: existing?.last_activity ?? now,
    member_since: existing?.member_since ?? now,
    bio: existing?.bio ?? '',
    learning_goal: (existing?.learning_goal as LearningGoal) ?? 'interview',
    preferred_language: (existing?.preferred_language as CodeLanguage) ?? 'python',
    weekly_goal_lessons: existing?.weekly_goal_lessons ?? 3,
    total_xp: existing?.total_xp ?? 0,
    achievements: existing?.achievements ?? [],
    activity_days: existing?.activity_days ?? {},
    daily_challenge_key: existing?.daily_challenge_key ?? null,
  };
}

export function normalizeProfile(raw: unknown): UserProfile | null {
  if (!raw || typeof raw !== 'object') return null;
  const p = raw as Partial<UserProfile>;
  if (!p.username) return null;
  return createDefaultProfile(p.username, p);
}

// Format a date as a local (not UTC) YYYY-MM-DD key so activity days, streaks,
// and the heatmap all agree regardless of the user's timezone.
export function dateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayKey(): string {
  return dateKey(new Date());
}

export function getWeeklyActiveDays(activityDays: Record<string, number>): number {
  let count = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dateKey(d);
    if ((activityDays[key] ?? 0) > 0) count++;
  }
  return count;
}
