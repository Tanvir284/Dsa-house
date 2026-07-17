'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/lib/store';
import { setAuthSessionCookie } from '@/lib/auth-session';

export default function RegisterPage() {
  const router = useRouter();
  const loginMockUser = useAppStore((s) => s.loginMockUser);
  const persistProfile = useAppStore((s) => s.persistProfile);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!supabase) {
        const uname = username || email.split('@')[0] || 'Guest';
        await loginMockUser(uname);
        router.push('/');
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      const user = data.user;
      if (!user) {
        setError('No user created');
        setLoading(false);
        return;
      }

      const uname = username || email.split('@')[0];
      // Insert a profile row
      await supabase.from('profiles').upsert({ id: user.id, username: uname });

      const profile: UserProfile = {
        id: user.id,
        username: uname,
        avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(uname)}`,
        streak_count: 1,
        longest_streak: 1,
        last_activity: new Date().toISOString(),
        member_since: new Date().toISOString(),
        bio: '',
        learning_goal: 'exploration',
        preferred_language: 'python',
        weekly_goal_lessons: 3,
        total_xp: 0,
        achievements: [],
        activity_days: {},
        daily_challenge_key: null,
      };

      persistProfile(profile);
      await setAuthSessionCookie(profile.id || uname);
      router.push('/');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="input-themed px-3 py-2 rounded" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-themed px-3 py-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-themed px-3 py-2 rounded" required />
        {error && <div className="text-rose-400 text-sm">{error}</div>}
        <div className="flex items-center justify-between gap-2">
          <button type="submit" disabled={loading} className="btn-primary px-4 py-2 rounded">{loading ? 'Creating...' : 'Create account'}</button>
          <Link href="/auth/login" className="text-sm text-muted-foreground">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
