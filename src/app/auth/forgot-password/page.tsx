'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

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
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
      <p className="text-sm text-muted-foreground mb-6">Enter your email and we&apos;ll send a password reset link.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-themed px-3 py-2 rounded" required />
        {error && <div className="text-rose-400 text-sm">{error}</div>}
        {message && <div className="text-complete text-sm">{message}</div>}
        <button type="submit" disabled={loading} className="btn-primary px-4 py-2 rounded">{loading ? 'Sending...' : 'Send reset link'}</button>
      </form>
      <div className="mt-4 text-sm text-muted-foreground">
        <Link href="/auth/login" className="hover:text-foreground">Back to Sign In</Link>
      </div>
    </div>
  );
}
