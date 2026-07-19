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
      <div className="sticky top-0 z-50 w-full flex justify-center py-3.5 px-4 pointer-events-none select-none">
        <header className="pointer-events-auto w-full max-w-7xl rounded-2xl border border-white/10 bg-[#090c14]/75 backdrop-blur-xl shadow-xl shadow-black/30 transition-all duration-300 hover:border-white/15">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="h-14 flex items-center justify-between gap-4">

              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                  <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-primary/10 to-accent/10 border border-primary/20 group-hover:scale-105 group-hover:border-primary/40 transition-all duration-300">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary to-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-sm" />
                    <svg viewBox="0 0 32 32" className="w-5.5 h-5.5 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <span className="text-base font-bold tracking-tight text-foreground flex items-center gap-0.5 hidden sm:block">
                    <span>DSA</span>
                    <span className="bg-gradient-to-r from-primary via-[#60a5fa] to-accent bg-clip-text text-transparent font-extrabold font-heading">House</span>
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
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
                          active
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{link.name}</span>
                        {active && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)] animate-pulse" />
                        )}
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
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
                          active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{link.name}</span>
                        {active && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] animate-pulse" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden lg:flex flex-1 justify-center max-w-xs xl:max-w-md">
                  <CommandPalette />
                </div>

                <div className="hidden md:flex items-center gap-2 shrink-0">
                  {isOffline && (
                    <span className="text-[10px] font-bold text-muted-foreground bg-[#1e2130] border border-border/85 px-2 py-0.5 rounded-full hidden lg:inline">
                      Offline
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setMobileSearch(true)}
                    className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-[#161b26]/50 cursor-pointer transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-[#161b26]/50 transition-colors cursor-pointer"
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500 animate-pulse-slow" /> : <Moon className="h-4 w-4 text-indigo-400" />}
                  </button>

                  {profile ? (
                    <div className="flex items-center gap-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1e2130]/50 border border-border/80 hover:bg-[#1e2130]/90 transition-all duration-200 shadow-sm"
                      >
                        <Image src={profile.avatar_url} alt="" width={22} height={22} className="h-5.5 w-5.5 rounded-lg object-cover ring-1 ring-border" unoptimized />
                        <span className="text-[12px] font-bold text-foreground max-w-[80px] truncate hidden lg:block">
                          {profile.username}
                        </span>
                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          <Flame className="h-3.5 w-3.5 text-primary fill-primary/25" /> {profile.streak_count}
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={logoutUser}
                        className="p-2 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-[#161b26]/50 transition-colors cursor-pointer"
                        title="Sign out"
                      >
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="btn-premium-primary px-4 py-2"
                    >
                      <User className="h-3.5 w-3.5 mr-1.5" />
                      <span>Sign In</span>
                    </Link>
                  )}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 rounded-xl bg-[#161b26]/50 border border-border/60 cursor-pointer"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-indigo-400" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-xl bg-[#161b26]/50 border border-border/60 cursor-pointer"
                    aria-expanded={mobileMenuOpen}
                  >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="xl:hidden border-t border-white/5 bg-[#090c14]/95 px-4 py-3 flex flex-col gap-1 max-h-[70vh] overflow-y-auto rounded-b-2xl">
              <button
                type="button"
                onClick={() => { setMobileSearch(true); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-border mb-2 text-muted-foreground"
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
                    className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg ${
                      active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-[#1e2130]/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              <hr className="border-white/5 my-2" />
              {profile ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1e2130]/50">
                    <Image src={profile.avatar_url} alt="" width={24} height={24} className="h-6 w-6 rounded-lg" unoptimized />
                    <span className="font-bold">{profile.username}</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-primary">
                      <Flame className="h-3.5 w-3.5" aria-hidden="true" /> {profile.streak_count}
                    </span>
                  </Link>
                  <button type="button" onClick={() => { logoutUser(); setMobileMenuOpen(false); }} className="text-left px-3 py-2 text-sm text-red-400 font-bold mt-1">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="btn-premium-primary py-2 rounded-lg text-sm text-center">
                  Sign In
                </Link>
              )}
            </div>
          )}
        </header>
      </div>

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
