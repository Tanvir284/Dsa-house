'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Calendar, Flame, Lightbulb, CheckCircle2, ArrowRight, Zap, User } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getTodaysChallenge } from '@/lib/daily-challenges';
import { todayKey } from '@/lib/profile-utils';

export default function DailyChallengePage() {
  const { profile, loginMockUser, completeDailyChallenge } = useAppStore();

  // Compute the daily challenge and formatted date on the client only to avoid
  // SSR/CSR hydration mismatches when the server and client are in different
  // timezones or cross the midnight boundary at different times.
  const [mounted, setMounted] = useState(false);
  
  // Use useMemo to compute challenge once during initial render
  const challenge = useMemo(() => getTodaysChallenge(), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const todayLabel = mounted ? new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : '';
  const today = mounted ? todayKey() : '';

  const completedToday = useMemo(() => {
    if (!profile || !challenge || !today) return false;
    return profile.daily_challenge_key === `${today}:${challenge.id}`;
  }, [profile, challenge, today]);

  if (!profile) {
    return (
      <div className="flex flex-col items-center gap-6 py-20 text-center max-w-md mx-auto">
        <Calendar className="h-12 w-12 text-primary" />
        <h1 className="text-2xl font-bold">Daily Challenge</h1>
        <p className="text-sm text-muted-foreground">Sign in to attempt today&apos;s problem and earn bonus XP.</p>
        <button onClick={() => loginMockUser('AlgoMaster')} className="btn-primary px-6 py-3 font-semibold rounded-lg cursor-pointer">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-4 max-w-3xl mx-auto w-full animate-fade-in">
      <div className="flex flex-col gap-2">
        <span className="badge badge-primary w-fit">
          <Calendar className="h-3 w-3" /> {todayLabel || '\u00A0'}
        </span>
        <h1 className="text-3xl font-black text-foreground">Daily Challenge</h1>
        <p className="text-sm text-muted-foreground">One curated problem per day. Mark complete after you solve it on paper or in your editor.</p>
      </div>

      {challenge && (
      <article className="modern-card p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="flex flex-wrap gap-2 relative">
          <span className={`badge ${challenge.difficulty === 'Easy' ? 'badge-easy' : challenge.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>
            {challenge.difficulty}
          </span>
          <span className="badge bg-accent/10 text-accent">{challenge.pattern}</span>
          <span className="badge badge-primary flex items-center gap-1">
            <Zap className="h-3 w-3" /> +{challenge.xpReward} XP
          </span>
        </div>

        <h2 className="text-2xl font-bold text-foreground relative">{challenge.title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed relative">{challenge.description}</p>

        <div className="p-4 rounded-xl bg-muted/50 border border-border font-mono text-xs text-foreground relative">
          <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-2">Example</span>
          {challenge.example}
        </div>

        <details className="group relative">
          <summary className="flex items-center gap-2 text-sm font-semibold text-primary cursor-pointer list-none">
            <Lightbulb className="h-4 w-4" /> Show hint
          </summary>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed pl-6">{challenge.hint}</p>
        </details>

        <div className="flex flex-wrap gap-3 pt-2 relative">
          {completedToday ? (
            <div className="flex items-center gap-2 text-complete font-semibold text-sm">
              <CheckCircle2 className="h-5 w-5" /> Completed today — XP awarded!
            </div>
          ) : (
            <button
              type="button"
              onClick={() => completeDailyChallenge(challenge.id, challenge.xpReward)}
              className="btn-primary px-5 py-2.5 text-sm font-bold rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Flame className="h-4 w-4" /> Mark as solved
            </button>
          )}
          <Link
            href={`/topics/${challenge.topicSlug}`}
            className="btn-secondary px-5 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-2"
          >
            Study pattern <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
      )}

      <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
        <User className="h-3 w-3" /> Streak and XP sync to your <Link href="/dashboard" className="text-primary font-semibold hover:underline">dashboard</Link>
      </p>
    </div>
  );
}
