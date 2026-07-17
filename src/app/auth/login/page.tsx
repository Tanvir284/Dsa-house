'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/lib/store';
import { setAuthSessionCookie } from '@/lib/auth-session';

export default function LoginPage() {
  const router = useRouter();
  const loginMockUser = useAppStore((s) => s.loginMockUser);
  const persistProfile = useAppStore((s) => s.persistProfile);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!supabase) {
        // Offline: use mock login with email prefix
        const username = email.split('@')[0] || 'Guest';
        await loginMockUser(username);
        router.push('/');
        return;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }
      const user = data.user;
      if (!user) {
        setError('No user returned');
        setLoading(false);
        return;
      }

      // Fetch profile from public 'profiles' table if available
      const { data: profileData, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (profileError) {
        // ignore
      }

      const username = profileData?.username || email.split('@')[0];
      const profile: UserProfile = {
        id: user.id,
        username,
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
        streak_count: profileData?.streak_count ?? 1,
        longest_streak: profileData?.longest_streak ?? 1,
        last_activity: profileData?.last_activity ?? new Date().toISOString(),
        member_since: profileData?.member_since ?? new Date().toISOString(),
        bio: profileData?.bio ?? '',
        learning_goal: profileData?.learning_goal ?? 'exploration',
        preferred_language: profileData?.preferred_language ?? 'python',
        weekly_goal_lessons: profileData?.weekly_goal_lessons ?? 3,
        total_xp: profileData?.total_xp ?? 0,
        achievements: profileData?.achievements ?? [],
        activity_days: profileData?.activity_days ?? {},
        daily_challenge_key: profileData?.daily_challenge_key ?? null,
      };

      persistProfile(profile);
      await setAuthSessionCookie(profile.id || username);
      const redirectTo = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('from') || '/' : '/';
      router.push(redirectTo);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-themed px-3 py-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-themed px-3 py-2 rounded" required />
        {error && <div className="text-rose-400 text-sm">{error}</div>}
        <div className="flex items-center justify-between gap-2">
          <button type="submit" disabled={loading} className="btn-primary px-4 py-2 rounded">{loading ? 'Signing in...' : 'Sign in'}</button>
          <div className="flex flex-col items-end gap-1 text-sm">
            <Link href="/auth/forgot-password" className="text-muted-foreground hover:text-foreground">Forgot password?</Link>
            <Link href="/auth/register" className="text-muted-foreground hover:text-foreground">Create account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
