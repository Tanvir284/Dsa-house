'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sun, Moon, BookOpen, Map, Sparkles, Trophy, Bookmark, Menu, X, User, LogOut, Flame,
  Briefcase, Layers, Calendar, BarChart3, Search, Code,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import CommandPalette from '@/components/CommandPalette';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, profile, logoutUser, isOffline } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const navLinks = [
    { name: 'Roadmap', href: '/roadmap', icon: Map },
    { name: 'Topics', href: '/topics', icon: BookOpen },
    { name: 'Arena', href: '/problems', icon: Code },
    { name: 'Patterns', href: '/patterns', icon: Layers },
    { name: 'Visualizer', href: '/visualizer', icon: Sparkles },
    { name: 'Practice', href: '/practice', icon: Trophy },
  ];

  const extraLinks = [
    { name: 'Daily', href: '/daily', icon: Calendar },
    { name: 'Labs', href: '/labs', icon: BarChart3 },
    { name: 'Interview', href: '/interview-prep', icon: Briefcase },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/55 backdrop-blur-md transition-all duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="h-16 flex items-center justify-between gap-4">

          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/10 to-accent/10 border border-primary/20 group-hover:scale-105 group-hover:border-primary/40 transition-all duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary to-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-sm" />
                <svg viewBox="0 0 32 32" className="w-6 h-6 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <path d="M16 8 L9 20 M16 8 L23 20" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 20 L23 20" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.6" />
                  <circle cx="16" cy="8" r="4.5" fill="var(--background)" stroke="url(#logoGrad)" strokeWidth="3" filter="url(#glow)" />
                  <circle cx="9" cy="20" r="3.5" fill="var(--background)" stroke="url(#logoGrad)" strokeWidth="2.5" />
                  <circle cx="23" cy="20" r="3.5" fill="var(--background)" stroke="url(#logoGrad)" strokeWidth="2.5" />
                </svg>
              </div>
              <span className="text-[17px] font-bold tracking-tight text-foreground flex items-center gap-1 hidden sm:block">
                <span>DSA</span>
                <span className="bg-gradient-to-r from-primary via-[#60a5fa] to-accent bg-clip-text text-transparent font-extrabold">House</span>
              </span>
            </Link>

            <nav className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    data-active={active}
                    className={`nav-pill flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-semibold rounded-xl transition-colors ${
                      active
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {link.name}
                  </Link>
                );
              })}
              {extraLinks.slice(0, 2).map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    data-active={active}
                    className={`nav-pill flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-semibold rounded-xl transition-colors ${
                      active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden lg:flex flex-1 justify-center max-w-xs xl:max-w-md">
              <CommandPalette />
            </div>

            <div className="hidden md:flex items-center gap-2 shrink-0">
              {isOffline && (
                <span className="text-[10px] font-semibold text-muted-foreground bg-surface px-2 py-1 rounded-full hidden lg:inline">
                  Offline
                </span>
              )}

              <button
                type="button"
                onClick={() => setMobileSearch(true)}
                className="lg:hidden p-2 rounded-xl btn-ghost cursor-pointer border border-transparent hover:border-border/60 hover:bg-surface/50"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-xl btn-ghost cursor-pointer border border-transparent hover:border-border/60 hover:bg-surface/50 transition-colors"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500 animate-pulse-slow" /> : <Moon className="h-4 w-4 text-indigo-400" />}
              </button>

              {profile ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border/80 hover:bg-surface-hover hover:border-border transition-all duration-200 shadow-sm"
                  >
                    <Image src={profile.avatar_url} alt="" width={24} height={24} className="h-6 w-6 rounded-lg object-cover ring-1 ring-border" unoptimized />
                    <span className="text-[12.5px] font-semibold text-foreground max-w-[80px] truncate hidden lg:block">
                      {profile.username}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                      <Flame className="h-3.5 w-3.5 text-primary fill-primary/25" /> {profile.streak_count}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={logoutUser}
                    className="p-2 rounded-xl btn-ghost hover:text-hard hover:bg-surface/50 border border-transparent hover:border-border/60 transition-colors cursor-pointer"
                    title="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="relative group overflow-hidden flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'var(--accent-gradient)',
                    boxShadow: '0 4px 12px rgba(79,157,255,0.25)'
                  }}
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-20deg] group-hover:left-[120%] transition-all duration-1000 -left-[30%]" />
                  <User className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-surface border border-border/60 cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-indigo-400" />}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-surface border border-border/60 cursor-pointer"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden mt-2 mx-4 sm:mx-6 lg:mx-8 rounded-2xl glass-navbar px-4 py-3 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => { setMobileSearch(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg border border-border mb-2 text-muted-foreground"
            >
              <Search className="h-4 w-4" /> Search (⌘K)
            </button>
            {[...navLinks, ...extraLinks].map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg ${
                    active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-surface'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
            <hr className="border-border my-2" />
            {profile ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-surface">
                  <Image src={profile.avatar_url} alt="" width={24} height={24} className="h-6 w-6 rounded-lg" unoptimized />
                  {profile.username}
                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-primary">
                    <Flame className="h-3.5 w-3.5" aria-hidden="true" /> {profile.streak_count}
                    <span className="sr-only">day streak</span>
                  </span>
                </Link>
                <button type="button" onClick={() => { logoutUser(); setMobileMenuOpen(false); }} className="text-left px-3 py-2 text-sm text-hard">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="btn-primary py-2.5 rounded-lg text-sm font-semibold text-center">
                Sign In
              </Link>
            )}
          </div>
        )}
      </header>

      {mobileSearch && <MobileSearchOverlay onClose={() => setMobileSearch(false)} />}
    </>
  );
}

function MobileSearchOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] lg:hidden bg-black/60 backdrop-blur-sm p-4 pt-20" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <CommandPalette startOpen />
      </div>
    </div>
  );
}
