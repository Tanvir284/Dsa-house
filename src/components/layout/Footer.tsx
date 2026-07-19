import React from 'react';
import Link from 'next/link';
import { Heart, Globe, MessageSquare, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#161b26]/10 backdrop-blur-sm w-full mt-auto py-12 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto max-w-7xl">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col gap-4 md:col-span-1 text-left">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary/10 to-accent/10 border border-primary/20 group-hover:scale-105 transition-all duration-300">
                <svg viewBox="0 0 32 32" className="w-5 h-5 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                  </defs>
                  <path d="M16 8 L9 20 M16 8 L23 20" stroke="url(#footerLogoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 20 L23 20" stroke="url(#footerLogoGrad)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.6" />
                  <circle cx="16" cy="8" r="4.5" fill="var(--background)" stroke="url(#footerLogoGrad)" strokeWidth="3" />
                  <circle cx="9" cy="20" r="3.5" fill="var(--background)" stroke="url(#footerLogoGrad)" strokeWidth="2.5" />
                  <circle cx="23" cy="20" r="3.5" fill="var(--background)" stroke="url(#footerLogoGrad)" strokeWidth="2.5" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-foreground flex items-center gap-1 font-heading">
                <span>DSA</span>
                <span className="bg-gradient-to-r from-primary via-[#60a5fa] to-accent bg-clip-text text-transparent font-extrabold">House</span>
              </span>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-[260px] font-medium">
              Master data structures and algorithms with interactive visualizers, structured roadmaps, and hands-on coding challenges.
            </p>

            {/* Social Badges */}
            <div className="flex gap-2 mt-2">
              <a
                href="https://github.com/Tanvir284/Dsa-house"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#1e2130]/30 hover:bg-primary/10 border border-border/80 hover:border-primary/30 text-muted-foreground hover:text-primary rounded-xl transition-all duration-300"
                title="GitHub Repository"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 bg-[#1e2130]/30 hover:bg-accent/10 border border-border/80 hover:border-accent/30 text-muted-foreground hover:text-accent rounded-xl transition-all duration-300"
                title="Discord Community"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-[#1e2130]/30 hover:bg-emerald-500/10 border border-border/80 hover:border-emerald-500/30 text-muted-foreground hover:text-emerald-400 rounded-xl transition-all duration-300"
                title="SaaS Status"
              >
                <Terminal className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Curriculum Links */}
          <div className="flex flex-col gap-3 text-left">
            <h4 className="text-[10px] font-extrabold text-foreground uppercase tracking-widest font-mono">Curriculum</h4>
            <div className="flex flex-col gap-2.5 text-xs text-muted-foreground font-semibold">
              <Link href="/roadmap" className="hover:text-foreground transition-colors duration-200">Interactive Roadmap</Link>
              <Link href="/topics" className="hover:text-foreground transition-colors duration-200">Topics Catalogue</Link>
              <Link href="/problems" className="hover:text-foreground transition-colors duration-200">Coding Arena</Link>
              <Link href="/patterns" className="hover:text-foreground transition-colors duration-200">Algorithm Patterns</Link>
            </div>
          </div>

          {/* Column 3: Labs & Extras */}
          <div className="flex flex-col gap-3 text-left">
            <h4 className="text-[10px] font-extrabold text-foreground uppercase tracking-widest font-mono">Labs & Extras</h4>
            <div className="flex flex-col gap-2.5 text-xs text-muted-foreground font-semibold">
              <Link href="/labs" className="hover:text-foreground transition-colors duration-200">Labs Sandbox</Link>
              <Link href="/daily" className="hover:text-foreground transition-colors duration-200">Daily Challenge</Link>
              <Link href="/interview-prep" className="hover:text-foreground transition-colors duration-200">Interview Prep</Link>
              <Link href="/bookmarks" className="hover:text-foreground transition-colors duration-200">Bookmarks</Link>
            </div>
          </div>

          {/* Column 4: System Status & Portal */}
          <div className="flex flex-col gap-3 text-left">
            <h4 className="text-[10px] font-extrabold text-foreground uppercase tracking-widest font-mono">Platform</h4>
            <div className="flex flex-col gap-2.5 text-xs text-muted-foreground font-semibold">
              <Link href="/about" className="hover:text-foreground transition-colors duration-200">About Us</Link>
              <Link href="/auth/register" className="hover:text-foreground transition-colors duration-200">Join Community</Link>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground font-semibold">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} DSA House. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground/80">
            <span>Helping you optimize your mental algorithms and accelerate your career. ⚡</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
