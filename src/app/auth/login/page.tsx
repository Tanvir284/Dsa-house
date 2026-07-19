'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/lib/store';
import { setAuthSessionCookie } from '@/lib/auth-session';
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles, User, ArrowRight, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const loginMockUser = useAppStore((s) => s.loginMockUser);
  const persistProfile = useAppStore((s) => s.persistProfile);

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative min-h-[85vh] w-full flex items-center justify-center px-4 py-12 overflow-hidden select-none">
      {/* Dynamic Glowing Ambient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/80 opacity-[0.05] blur-[100px] pointer-events-none animate-pulse-slow" />

      {/* Glassmorphic Container Card */}
      <div className="w-full max-w-md relative z-10 backdrop-blur-xl bg-card/45 border border-border/60 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-border/80">
        
        {/* Brand identity */}
        <div className="flex flex-col items-center gap-3 mb-6 text-center">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/10 to-accent/10 border border-primary/20 transition-all duration-300">
            <svg viewBox="0 0 32 32" className="w-7 h-7 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <linearGradient id="loginLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
              <path d="M16 8 L9 20 M16 8 L23 20" stroke="url(#loginLogoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 20 L23 20" stroke="url(#loginLogoGrad)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="16" cy="8" r="4.5" fill="var(--background)" stroke="url(#loginLogoGrad)" strokeWidth="3" />
              <circle cx="9" cy="20" r="3.5" fill="var(--background)" stroke="url(#loginLogoGrad)" strokeWidth="2.5" />
              <circle cx="23" cy="20" r="3.5" fill="var(--background)" stroke="url(#loginLogoGrad)" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center justify-center gap-1">
              <span>Welcome to</span>
              <span className="bg-gradient-to-r from-primary via-[#60a5fa] to-accent bg-clip-text text-transparent font-extrabold">DSA House</span>
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Sign in to track progress, save bookmarks, and run code
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Email / Username field */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-muted-foreground">Username or Email</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <input 
                type="text" 
                placeholder="Enter username or email" 
                value={usernameOrEmail} 
                onChange={(e) => setUsernameOrEmail(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 bg-[#0d0f14]/50 border border-border/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/45 transition-all text-foreground placeholder:text-muted-foreground/50 font-medium" 
                required 
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-muted-foreground">Password</label>
              <Link href="/auth/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full pl-10 pr-10 py-2.5 bg-[#0d0f14]/50 border border-border/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/45 transition-all text-foreground placeholder:text-muted-foreground/50 font-medium" 
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed text-left animate-slide-up">
              <ShieldAlert className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full mt-2 py-2.5 bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 shadow-md shadow-primary/10 hover:shadow-primary/20 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Separator / Footer Links */}
        <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-semibold">
          <span>New to DSA House?</span>
          <Link href="/auth/register" className="text-primary hover:underline flex items-center gap-0.5">
            Create an account <Sparkles className="h-3 w-3 text-accent" />
          </Link>
        </div>

      </div>
    </div>
  );
}
