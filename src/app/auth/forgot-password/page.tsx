'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Mail, Loader2, ShieldAlert, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import AmbientOrbField from '@/components/3d/AmbientOrbField';
import { fadeUp, staggerContainer } from '@/lib/motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!supabase) {
      setMessage('Password reset is unavailable in offline mode. Please use Sign In with a mock account.');
      setLoading(false);
      return;
    }

    try {
      const redirectTo = `${window.location.origin}/auth/login`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (resetError) {
        setError(resetError.message);
      } else {
        setMessage('If an account exists for that email, a reset link has been sent.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center px-4 py-12 overflow-hidden select-none">
      {/* Dynamic Glowing Ambient Blobs + WebGL depth */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/80 opacity-[0.05] blur-[100px] pointer-events-none animate-pulse-slow" />
      <AmbientOrbField compact className="absolute inset-0 -z-10 opacity-[0.12]" />

      {/* Glassmorphic Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10 backdrop-blur-xl bg-card/45 border border-border/60 rounded-2xl p-6 sm:p-8 shadow-xl transition-colors duration-300 hover:border-border/80"
      >

        {/* Brand identity */}
        <div className="flex flex-col items-center gap-3 mb-6 text-center">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/10 to-accent/10 border border-primary/20 transition-all duration-300">
            <svg viewBox="0 0 32 32" className="w-7 h-7 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <linearGradient id="resetLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
              <path d="M16 8 L9 20 M16 8 L23 20" stroke="url(#resetLogoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 20 L23 20" stroke="url(#resetLogoGrad)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="16" cy="8" r="4.5" fill="var(--background)" stroke="url(#resetLogoGrad)" strokeWidth="3" />
              <circle cx="9" cy="20" r="3.5" fill="var(--background)" stroke="url(#resetLogoGrad)" strokeWidth="2.5" />
              <circle cx="23" cy="20" r="3.5" fill="var(--background)" stroke="url(#resetLogoGrad)" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center justify-center gap-1">
              <span>Reset Password</span>
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Enter your email below and we will send you a reset link
            </p>
          </div>
        </div>

        {/* Form Container */}
        <motion.form
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          {/* Email field */}
          <motion.div variants={fadeUp} className="flex flex-col gap-1.5 text-left">
            <label htmlFor="forgot-email" className="text-xs font-semibold text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
              <input
                id="forgot-email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 input-themed border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/45 transition-all text-foreground placeholder:text-muted-foreground/50 font-medium"
                required
              />
            </div>
          </motion.div>

          {/* Success / Info Message Box */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed text-left overflow-hidden"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                <span className="font-semibold">{message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message Box */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed text-left overflow-hidden"
              >
                <ShieldAlert className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span className="font-semibold">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            variants={fadeUp}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-50 shadow-md shadow-primary/10 hover:shadow-primary/20 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending link...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Separator / Footer Links */}
        <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-center text-xs text-muted-foreground font-semibold">
          <Link href="/auth/login" className="hover:text-foreground flex items-center gap-1.5 group transition-colors">
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to Sign In
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
