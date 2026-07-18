import { create } from 'zustand';
import { QuizAttempt } from '@/types';
import { supabase } from './supabase';
import { applyTheme, getStoredTheme, type ThemeMode } from './theme';
import { clearAuthSessionCookie, setAuthSessionCookie } from './auth-session';
import {
  evaluateAchievements,
  getNewAchievements,
  xpForQuiz,
  ACHIEVEMENTS,
} from './profile-stats';
import { createDefaultProfile, normalizeProfile, todayKey } from './profile-utils';
import type { LearningGoal } from './profile-stats';
import type { CodeLanguage } from '@/types';

export interface UserProfile {
  id?: string;
  username: string;
  avatar_url: string;
  streak_count: number;
  longest_streak: number;
  last_activity: string;
  member_since: string;
  bio: string;
  learning_goal: LearningGoal;
  preferred_language: CodeLanguage;
  weekly_goal_lessons: number;
  total_xp: number;
  achievements: string[];
  activity_days: Record<string, number>;
  daily_challenge_key: string | null;
}

export interface ProfileUpdate {
  username?: string;
  bio?: string;
  learning_goal?: LearningGoal;
  preferred_language?: CodeLanguage;
  weekly_goal_lessons?: number;
}

export interface SpacedRepetitionItem {
  id: string;
  type: 'topic' | 'problem';
  interval: number;
  ease: number;
  repetitions: number;
  nextReviewDate: string;
}

interface AppState {
  isOffline: boolean;
  theme: 'light' | 'dark';
  profile: UserProfile | null;
  completedLessons: string[]; // List of topic slugs completed
  completedProblems: string[]; // List of problem IDs completed
  bookmarks: string[];        // List of topic slugs bookmarked
  quizAttempts: QuizAttempt[];
  topicNotes: Record<string, string>;
  spacedRepetition: Record<string, SpacedRepetitionItem>;
  
  // Actions
  initializeStore: () => void;
  toggleTheme: () => void;
  loginMockUser: (username: string) => void;
  logoutUser: () => void;
  toggleBookmark: (topicSlug: string) => void;
  completeLesson: (topicSlug: string) => void;
  toggleProblemCompletion: (problemId: string) => void;
  submitQuizAttempt: (quizId: string, topicSlug: string, score: number, totalQuestions: number) => void;
  updateStreak: () => void;
  updateProfile: (patch: ProfileUpdate) => void;
  refreshAvatar: () => void;
  exportUserData: () => void;
  resetProgress: () => void;
  setTopicNote: (topicSlug: string, note: string) => void;
  completeDailyChallenge: (challengeId: string, xpReward: number) => void;
  syncAchievements: () => void;
  recordActivity: (points?: number) => void;
  addXp: (amount: number) => void;
  persistProfile: (profile: UserProfile) => void;
  recordReview: (id: string, type: 'topic' | 'problem', rating: number) => void;
}


function safeParseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  isOffline: true, // Defaults to offline mode since we fall back initially
  theme: 'dark',   // Premium dark mode by default
  profile: null,
  completedLessons: [],
  completedProblems: [],
  bookmarks: [],
  quizAttempts: [],
  topicNotes: {},
  spacedRepetition: {},

  initializeStore: () => {
    // Client-side initialization
    if (typeof window === 'undefined') return;

    const initialTheme: ThemeMode = getStoredTheme();
    applyTheme(initialTheme);

    const rawProfile = safeParseJson<unknown>(localStorage.getItem('dsa_profile'), null);
    const profile = normalizeProfile(rawProfile);
    const completedLessons = safeParseJson<string[]>(localStorage.getItem('dsa_completed_lessons'), []);
    const completedProblems = safeParseJson<string[]>(localStorage.getItem('dsa_completed_problems'), []);
    const bookmarks = safeParseJson<string[]>(localStorage.getItem('dsa_bookmarks'), []);
    const quizAttempts = safeParseJson<QuizAttempt[]>(localStorage.getItem('dsa_quiz_attempts'), []);
    const topicNotes = safeParseJson<Record<string, string>>(localStorage.getItem('dsa_topic_notes'), {});
    const spacedRepetition = safeParseJson<Record<string, SpacedRepetitionItem>>(localStorage.getItem('dsa_spaced_repetition'), {});

    // Detect if Supabase endpoint variables are available (for UI indicator)
    const hasSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    set({
      isOffline: !hasSupabase,
      theme: initialTheme,
      profile,
      completedLessons,
      completedProblems,
      bookmarks,
      quizAttempts,
      topicNotes,
      spacedRepetition,
    });

    // Proactively verify and update user streak on startup
    if (profile) {
      get().updateStreak();
      get().syncAchievements();
    }
  },

  toggleTheme: () => {
    const nextTheme: ThemeMode = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('dsa_theme', nextTheme);
    applyTheme(nextTheme);
    set({ theme: nextTheme });
  },

  loginMockUser: async (username: string) => {
    let userId: string | undefined;
    const displayName = username || 'AlgorithmLearner';
    const existingProfile = normalizeProfile(
      safeParseJson<unknown>(localStorage.getItem('dsa_profile'), null)
    );

    if (!get().isOffline) {
      try {
        const { data } = await supabase!.auth.signInAnonymously();
        if (data?.user) {
          userId = data.user.id;
          await supabase!.from('profiles').upsert({
            id: userId,
            username: displayName,
            streak_count: existingProfile?.streak_count ?? 1,
          });
        }
      } catch (e) {
        console.error("Auth failed", e);
      }
    }

    const newProfile = createDefaultProfile(displayName, {
      ...existingProfile,
      id: userId ?? existingProfile?.id,
    });
    localStorage.setItem('dsa_profile', JSON.stringify(newProfile));
    await setAuthSessionCookie(newProfile.id || displayName);
    set({ profile: newProfile });
    get().syncAchievements();
  },

  syncAchievements: () => {
    const profile = get().profile;
    if (!profile) return;

    const nextIds = evaluateAchievements(
      profile,
      get().completedLessons,
      get().bookmarks,
      get().quizAttempts
    );
    const newlyUnlocked = getNewAchievements(profile.achievements, nextIds);
    let bonusXp = 0;
    for (const id of newlyUnlocked) {
      const def = ACHIEVEMENTS.find((a) => a.id === id);
      if (def) bonusXp += def.xpBonus;
    }

    if (newlyUnlocked.length === 0 && bonusXp === 0) {
      const prev = new Set(profile.achievements);
      const unchanged = nextIds.length === prev.size && nextIds.every((id) => prev.has(id));
      if (unchanged) return;
    }

    const updated: UserProfile = {
      ...profile,
      achievements: nextIds,
      total_xp: profile.total_xp + bonusXp,
    };
    localStorage.setItem('dsa_profile', JSON.stringify(updated));
    set({ profile: updated });
  },

  recordActivity: (points = 1) => {
    const profile = get().profile;
    if (!profile) return;
    const key = todayKey();
    const activity_days = {
      ...profile.activity_days,
      [key]: (profile.activity_days[key] ?? 0) + points,
    };
    const updated = { ...profile, activity_days };
    localStorage.setItem('dsa_profile', JSON.stringify(updated));
    set({ profile: updated });
  },

  addXp: (amount: number) => {
    const profile = get().profile;
    if (!profile || amount <= 0) return;
    const updated = { ...profile, total_xp: profile.total_xp + amount };
    localStorage.setItem('dsa_profile', JSON.stringify(updated));
    set({ profile: updated });
    get().syncAchievements();
  },

  persistProfile: (profile: UserProfile) => {
    localStorage.setItem('dsa_profile', JSON.stringify(profile));
    set({ profile });
  },

  logoutUser: async () => {
    if (!get().isOffline) {
      await supabase!.auth.signOut();
    }
    localStorage.removeItem('dsa_profile');
    localStorage.removeItem('dsa_completed_lessons');
    localStorage.removeItem('dsa_completed_problems');
    localStorage.removeItem('dsa_bookmarks');
    localStorage.removeItem('dsa_quiz_attempts');
    localStorage.removeItem('dsa_topic_notes');
    localStorage.removeItem('dsa_spaced_repetition');
    await clearAuthSessionCookie();
    set({
      profile: null,
      completedLessons: [],
      completedProblems: [],
      bookmarks: [],
      quizAttempts: [],
      topicNotes: {},
      spacedRepetition: {},
    });
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  },

  toggleBookmark: async (topicSlug: string) => {
    const currentBookmarks = get().bookmarks;
    const exists = currentBookmarks.includes(topicSlug);
    let nextBookmarks: string[];

    if (exists) {
      nextBookmarks = currentBookmarks.filter((slug) => slug !== topicSlug);
    } else {
      nextBookmarks = [...currentBookmarks, topicSlug];
    }

    localStorage.setItem('dsa_bookmarks', JSON.stringify(nextBookmarks));
    set({ bookmarks: nextBookmarks });
    
    // Sync to Supabase
    const { isOffline, profile } = get();
    if (!isOffline && profile?.id) {
      try {
        const { data: topic } = await supabase!.from('topics').select('id').eq('slug', topicSlug).single();
        if (topic) {
          if (exists) {
            await supabase!.from('bookmarks').delete().eq('user_id', profile.id).eq('topic_id', topic.id);
          } else {
            await supabase!.from('bookmarks').upsert({ user_id: profile.id, topic_id: topic.id });
          }
        }
      } catch (e) {
        console.error("Sync error", e);
      }
    }

    if (profile) {
      get().updateStreak();
      get().recordActivity(1);
    }
  },

  completeLesson: async (topicSlug: string) => {
    const currentCompletions = get().completedLessons;
    if (currentCompletions.includes(topicSlug)) return; 

    const nextCompletions = [...currentCompletions, topicSlug];
    localStorage.setItem('dsa_completed_lessons', JSON.stringify(nextCompletions));
    set({ completedLessons: nextCompletions });
    
    const { isOffline, profile } = get();
    if (!isOffline && profile?.id) {
      try {
        const { data: topic } = await supabase!.from('topics').select('id').eq('slug', topicSlug).single();
        if (topic) {
          await supabase!.from('lesson_progress').upsert({ 
            user_id: profile.id, 
            topic_id: topic.id, 
            is_completed: true,
            completed_at: new Date().toISOString()
          });
        }
      } catch (e) {
        console.error("Sync error", e);
      }
    }

    if (profile) {
      get().addXp(100);
      get().updateStreak();
      get().recordActivity(2);
      // addXp already calls syncAchievements after crediting XP; no need to
      // re-run it here (avoids double-crediting achievement bonus XP on the
      // same transition).
    }
  },

  toggleProblemCompletion: (problemId: string) => {
    const current = get().completedProblems;
    const exists = current.includes(problemId);
    let next: string[];

    if (exists) {
      next = current.filter(id => id !== problemId);
    } else {
      next = [...current, problemId];
      // Reward user with XP
      get().addXp(50);
      get().recordActivity(1);
    }

    localStorage.setItem('dsa_completed_problems', JSON.stringify(next));
    set({ completedProblems: next });
  },

  submitQuizAttempt: async (quizId: string, topicSlug: string, score: number, totalQuestions: number) => {
    const newAttempt: QuizAttempt = {
      quiz_id: quizId,
      topic_slug: topicSlug,
      score,
      total_questions: totalQuestions,
      attempted_at: new Date().toISOString(),
    };

    const nextAttempts = [newAttempt, ...get().quizAttempts];
    localStorage.setItem('dsa_quiz_attempts', JSON.stringify(nextAttempts));
    set({ quizAttempts: nextAttempts });

    const { isOffline, profile } = get();
    if (!isOffline && profile?.id) {
      try {
        await supabase!.from('quiz_attempts').insert({
          user_id: profile.id,
          quiz_id: quizId,
          score,
          total_questions: totalQuestions
        });
      } catch (e) {
        console.error("Sync error", e);
      }
    }

    if (profile) {
      get().addXp(xpForQuiz(score, totalQuestions));
      get().updateStreak();
      get().recordActivity(2);
      // addXp already syncs achievements; skip the redundant second pass.
    }
  },

  updateProfile: (patch: ProfileUpdate) => {
    const profile = get().profile;
    if (!profile) return;

    const username = patch.username?.trim() || profile.username;
    const updated: UserProfile = {
      ...profile,
      ...patch,
      username,
      avatar_url:
        patch.username && patch.username !== profile.username
          ? `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`
          : profile.avatar_url,
    };
    get().persistProfile(updated);
  },

  refreshAvatar: () => {
    const profile = get().profile;
    if (!profile) return;
    const seed = `${profile.username}-${Date.now()}`;
    get().persistProfile({
      ...profile,
      avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}`,
    });
  },

  exportUserData: () => {
    const { profile, completedLessons, bookmarks, quizAttempts, theme } = get();
    const payload = {
      exported_at: new Date().toISOString(),
      profile,
      completedLessons,
      bookmarks,
      quizAttempts,
      theme,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dsa-house-backup-${todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  resetProgress: () => {
    const profile = get().profile;
    if (!profile) return;
    if (!window.confirm('Reset all lesson progress, quizzes, and bookmarks? Your profile and XP will be kept.')) {
      return;
    }
    localStorage.setItem('dsa_completed_lessons', JSON.stringify([]));
    localStorage.setItem('dsa_completed_problems', JSON.stringify([]));
    localStorage.setItem('dsa_bookmarks', JSON.stringify([]));
    localStorage.setItem('dsa_quiz_attempts', JSON.stringify([]));
    localStorage.removeItem('dsa_topic_notes');
    localStorage.removeItem('dsa_spaced_repetition');
    set({
      completedLessons: [],
      completedProblems: [],
      bookmarks: [],
      quizAttempts: [],
      topicNotes: {},
      spacedRepetition: {},
    });
    const clearedProfile: UserProfile = {
      ...profile,
      achievements: [],
      activity_days: {},
      daily_challenge_key: null,
    };
    get().persistProfile(clearedProfile);
    get().syncAchievements();
  },

  setTopicNote: (topicSlug: string, note: string) => {
    const next = { ...get().topicNotes, [topicSlug]: note };
    localStorage.setItem('dsa_topic_notes', JSON.stringify(next));
    set({ topicNotes: next });
    if (get().profile) get().recordActivity(1);
  },

  completeDailyChallenge: (challengeId: string, xpReward: number) => {
    const profile = get().profile;
    if (!profile) return;
    const key = `${todayKey()}:${challengeId}`;
    if (profile.daily_challenge_key === key) return;

    const updated = { ...profile, daily_challenge_key: key };
    get().persistProfile(updated);
    get().addXp(xpReward);
    get().recordActivity(3);
    get().updateStreak();
  },

  updateStreak: () => {
    const profile = get().profile;
    if (!profile) return;

    const today = new Date().toDateString();
    const lastActive = new Date(profile.last_activity).toDateString();

    if (today === lastActive) {
      const updatedProfile = {
        ...profile,
        last_activity: new Date().toISOString(),
      };
      get().persistProfile(updatedProfile);
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    let nextStreak = profile.streak_count;
    if (lastActive === yesterdayStr) {
      nextStreak += 1;
    } else {
      nextStreak = 1;
    }

    const longest_streak = Math.max(profile.longest_streak, nextStreak);
    const updatedProfile = {
      ...profile,
      streak_count: nextStreak,
      longest_streak,
      last_activity: new Date().toISOString(),
    };

    get().persistProfile(updatedProfile);
    get().recordActivity(1);
    get().syncAchievements();

    if (!get().isOffline && profile.id) {
      supabase!.from('profiles').update({
        streak_count: nextStreak,
        last_activity: updatedProfile.last_activity
      }).eq('id', profile.id).then();
    }
  },

  recordReview: (id: string, type: 'topic' | 'problem', rating: number) => {
    const current = get().spacedRepetition;
    const item = current[id] || {
      id,
      type,
      interval: 0,
      ease: 2.5,
      repetitions: 0,
      nextReviewDate: new Date().toISOString(),
    };

    let { interval, ease, repetitions } = item;

    if (rating < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * ease);
      }
      repetitions += 1;
    }

    // SM-2 Ease factor adjustments
    ease = ease + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    ease = Math.max(1.3, ease);

    // Calculate next review date
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + interval);

    const updatedItem: SpacedRepetitionItem = {
      id,
      type,
      interval,
      ease,
      repetitions,
      nextReviewDate: nextDate.toISOString(),
    };

    const nextRepetition = {
      ...current,
      [id]: updatedItem,
    };

    localStorage.setItem('dsa_spaced_repetition', JSON.stringify(nextRepetition));
    set({ spacedRepetition: nextRepetition });

    if (get().profile) {
      get().addXp(15 * rating); // Reward users for doing reviews!
      get().recordActivity(1);
    }
  },
}));
