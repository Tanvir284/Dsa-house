import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white text-[10px] font-bold">D</div>
          <span className="text-sm font-semibold text-foreground">DSA <span className="text-primary">House</span></span>
        </Link>

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for CS learners © {new Date().getFullYear()}
        </p>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link href="/topics" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Topics</Link>
          <Link href="/patterns" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Patterns</Link>
          <Link href="/daily" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Daily</Link>
          <Link href="/labs" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Labs</Link>
          <Link href="/interview-prep" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Interview</Link>
          <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <a href="https://github.com/Tanvir284/MD-Tanvir-Islam" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
