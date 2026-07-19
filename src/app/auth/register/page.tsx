'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/lib/store';
import { setAuthSessionCookie } from '@/lib/auth-session';
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles, User, ArrowRight, ShieldAlert, Award } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const loginMockUser = useAppStore((s) => s.loginMockUser);
  const persistProfile = useAppStore((s) => s.persistProfile);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      const { error: profileError } = await supabase.from('profiles').upsert({ id: user.id, username: uname, email });
      if (profileError) {
        console.warn('⚠️ Profiles upsert error during registration:', profileError.message);
      }

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
              <linearGradient id="registerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
              <path d="M16 8 L9 20 M16 8 L23 20" stroke="url(#registerLogoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 20 L23 20" stroke="url(#registerLogoGrad)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="16" cy="8" r="4.5" fill="var(--background)" stroke="url(#registerLogoGrad)" strokeWidth="3" />
              <circle cx="9" cy="20" r="3.5" fill="var(--background)" stroke="url(#registerLogoGrad)" strokeWidth="2.5" />
              <circle cx="23" cy="20" r="3.5" fill="var(--background)" stroke="url(#registerLogoGrad)" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center justify-center gap-1">
              <span>Create Account</span>
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Start your computer science and algorithm journey today
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Username field */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-muted-foreground">Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <input 
                type="text" 
                placeholder="Choose a username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 bg-[#0d0f14]/50 border border-border/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/45 transition-all text-foreground placeholder:text-muted-foreground/50 font-medium" 
                required
              />
            </div>
          </div>

          {/* Email field */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 bg-[#0d0f14]/50 border border-border/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/45 transition-all text-foreground placeholder:text-muted-foreground/50 font-medium" 
                required 
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Create a strong password" 
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Separator / Footer Links */}
        <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-semibold">
          <span>Already have an account?</span>
          <Link href="/auth/login" className="text-primary hover:underline flex items-center gap-0.5">
            Sign In <Award className="h-3.5 w-3.5 text-accent" />
          </Link>
        </div>

      </div>
    </div>
  );
}
