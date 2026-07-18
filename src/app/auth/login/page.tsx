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

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const input = usernameOrEmail.trim();
      let resolvedEmail = input;

      if (!supabase) {
        // Offline: use mock login with username or email prefix
        const username = input.includes('@') ? input.split('@')[0] : input;
        await loginMockUser(username || 'Guest');
        router.push('/');
        return;
      }

      // If input is a username (doesn't contain '@'), look up their email in Supabase profiles
      if (!input.includes('@')) {
        const { data: profileRow, error: lookupError } = await supabase
          .from('profiles')
          .select('email')
          .eq('username', input)
          .maybeSingle();

        if (lookupError || !profileRow?.email) {
          setError('Username not found. Try signing in with your email.');
          setLoading(false);
          return;
        }
        resolvedEmail = profileRow.email;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({ email: resolvedEmail, password });
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
      let { data: profileData, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      
      // Self-healing: if the user authenticated successfully but has no profile row, create it
      if (!profileData && !profileError) {
        const uname = input.includes('@') ? input.split('@')[0] : input;
        const { error: insertError } = await supabase.from('profiles').upsert({ id: user.id, username: uname, email: resolvedEmail });
        if (!insertError) {
          const { data: reFetched } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
          if (reFetched) {
            profileData = reFetched;
          }
        }
      }

      const username = profileData?.username || resolvedEmail.split('@')[0];
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
        <input 
          type="text" 
          placeholder="Username or Email" 
          value={usernameOrEmail} 
          onChange={(e) => setUsernameOrEmail(e.target.value)} 
          className="input-themed px-3 py-2 rounded" 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="input-themed px-3 py-2 rounded" 
          required 
        />
        {error && <div className="text-rose-400 text-sm">{error}</div>}
        <div className="flex items-center justify-between gap-2">
          <button type="submit" disabled={loading} className="btn-primary px-4 py-2 rounded">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <div className="flex flex-col items-end gap-1 text-sm">
            <Link href="/auth/forgot-password" className="text-muted-foreground hover:text-foreground">Forgot password?</Link>
            <Link href="/auth/register" className="text-muted-foreground hover:text-foreground">Create account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
