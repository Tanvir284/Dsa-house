'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, Home, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-6 max-w-md mx-auto animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-hard/10 flex items-center justify-center">
        <AlertCircle className="h-8 w-8 text-hard" />
      </div>

      <div>
        <span className="text-xs font-semibold text-hard">404</span>
        <h1 className="text-2xl font-bold text-foreground mt-1">Page Not Found</h1>
        <p className="text-sm text-muted-foreground mt-2">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
      </div>

      <div className="flex gap-3">
        <Link href="/" className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-lg btn-secondary cursor-pointer">
          <Home className="h-4 w-4" /> Home
        </Link>
        <Link href="/topics" className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-lg btn-primary cursor-pointer">
          <BookOpen className="h-4 w-4" /> Browse Topics
        </Link>
      </div>
    </div>
  );
}
