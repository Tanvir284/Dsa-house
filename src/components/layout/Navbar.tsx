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
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">

          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="text-base font-bold text-foreground tracking-tight hidden sm:block">
              DSA <span className="text-primary">House</span>
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
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-semibold rounded-lg transition-colors ${
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-surface'
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
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-semibold rounded-lg transition-colors ${
                    active ? 'bg-accent/10 text-accent' : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex flex-1 justify-center max-w-md">
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
              className="lg:hidden p-2 rounded-lg btn-ghost cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg btn-ghost cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {profile ? (
              <div className="flex items-center gap-1.5">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surface-hover transition-colors"
                >
                  <Image src={profile.avatar_url} alt="" width={24} height={24} className="h-6 w-6 rounded-lg" unoptimized />
                  <span className="text-[12px] font-semibold text-foreground max-w-[80px] truncate hidden lg:block">
                    {profile.username}
                  </span>
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                    <Flame className="h-3 w-3" /> {profile.streak_count}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={logoutUser}
                  className="p-2 rounded-lg btn-ghost hover:text-hard cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-semibold rounded-lg btn-primary cursor-pointer">
                <User className="h-3.5 w-3.5" /> Sign In
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button type="button" onClick={toggleTheme} className="p-2 rounded-lg bg-surface cursor-pointer">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-surface cursor-pointer"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-border bg-card/95 backdrop-blur-lg px-4 py-3 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
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
                  <span className="ml-auto text-[11px] text-primary">🔥 {profile.streak_count}</span>
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
