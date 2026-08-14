'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Sun, Moon, BookOpen, Map, Sparkles, Trophy, Bookmark, Menu, X, User, LogOut, Flame,
  Briefcase, Layers, Calendar, BarChart3, Search, Code, Timer,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import CommandPalette from '@/components/CommandPalette';
import { navPillTransition } from '@/lib/motion';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, profile, logoutUser, isOffline } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    // Split in two: 'Prep' is the static pattern cheat-sheet, 'Mock Interview'
    // is the timed practice session. Same top-level slot both used to share
    // under one ambiguous "Interview" label.
    { name: 'Prep', href: '/interview-prep', icon: Briefcase },
    { name: 'Mock Interview', href: '/interview', icon: Timer },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const NavPill = () => (
    <motion.span
      layoutId="nav-active-pill"
      transition={navPillTransition}
      className="absolute inset-0 -z-10 rounded-xl"
      style={{
        background: 'color-mix(in srgb, var(--primary) 16%, transparent)',
        border: '1px solid color-mix(in srgb, var(--primary) 30%, transparent)',
        boxShadow: '0 0 20px color-mix(in srgb, var(--primary) 28%, transparent)',
      }}
    />
  );

  return (
    <>
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 w-full flex justify-center py-3.5 px-4 pointer-events-none select-none"
      >
        <header
          className={`pointer-events-auto w-full max-w-7xl rounded-2xl glass-navbar transition-shadow duration-300 ${
            scrolled ? 'shadow-xl shadow-black/20' : ''
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="h-14 flex items-center justify-between gap-4">

              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-primary/10 to-accent/10 border border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                  >
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
                  </motion.div>
                  <span className="text-base font-bold tracking-tight text-foreground flex items-center gap-0.5 hidden sm:block">
                    <span>DSA</span>
                    <span className="gradient-text font-extrabold font-heading">House</span>
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
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors duration-200 ${
                          active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {active && <NavPill />}
                        <Icon className="h-3.5 w-3.5" />
                        <span>{link.name}</span>
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
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors duration-200 ${
                          active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {active && <NavPill />}
                        <Icon className="h-3.5 w-3.5" />
                        <span>{link.name}</span>
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
                    <span className="text-[10px] font-bold text-muted-foreground bg-secondary border border-border px-2 py-0.5 rounded-full hidden lg:inline">
                      Offline
                    </span>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setMobileSearch(true)}
                    className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 cursor-pointer transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.85, rotate: -20 }}
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {theme === 'dark' ? (
                        <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }} className="block">
                          <Sun className="h-4 w-4 text-amber-500" />
                        </motion.span>
                      ) : (
                        <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }} className="block">
                          <Moon className="h-4 w-4 text-indigo-400" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {profile ? (
                    <div className="flex items-center gap-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/70 border border-border hover:bg-secondary transition-colors duration-200 shadow-sm"
                      >
                        <Image src={profile.avatar_url} alt="" width={22} height={22} className="h-5.5 w-5.5 rounded-lg object-cover ring-1 ring-border" unoptimized />
                        <span className="text-[12px] font-bold text-foreground max-w-[80px] truncate hidden lg:block">
                          {profile.username}
                        </span>
                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          <Flame className="h-3.5 w-3.5 text-primary fill-primary/25" /> {profile.streak_count}
                        </span>
                      </Link>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={logoutUser}
                        className="p-2 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-foreground/5 transition-colors cursor-pointer"
                        title="Sign out"
                      >
                        <LogOut className="h-4 w-4" />
                      </motion.button>
                    </div>
                  ) : (
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
                      <Link href="/auth/login" className="btn-premium-primary px-4 py-2">
                        <User className="h-3.5 w-3.5 mr-1.5" />
                        <span>Sign In</span>
                      </Link>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 rounded-xl bg-secondary/70 border border-border cursor-pointer"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-indigo-400" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-xl bg-secondary/70 border border-border cursor-pointer"
                    aria-expanded={mobileMenuOpen}
                  >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="xl:hidden border-t border-border bg-background/95 px-4 py-3 flex flex-col gap-1 max-h-[70vh] overflow-y-auto rounded-b-2xl"
              >
                <button
                  type="button"
                  onClick={() => { setMobileSearch(true); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-border mb-2 text-muted-foreground"
                >
                  <Search className="h-4 w-4" /> Search (⌘K)
                </button>
                {[...navLinks, ...extraLinks].map((link, i) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg ${
                          active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/60'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{link.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                <hr className="border-border my-2" />
                {profile ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/60">
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
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </motion.div>

      {mobileSearch && <MobileSearchOverlay onClose={() => setMobileSearch(false)} />}
    </>
  );
}

function MobileSearchOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] lg:hidden bg-black/60 backdrop-blur-sm p-4 pt-20" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {/* Without onRequestClose, dismissing the palette itself (Escape, a
            result, the backdrop click it renders internally) left its own
            "open" state false while this outer overlay stayed mounted — a
            bare, unstyled "Search…" trigger button would flash inside what
            was meant to be a fully-dismissed overlay. */}
        <CommandPalette startOpen onRequestClose={onClose} />
      </div>
    </div>
  );
}
