import type { Metadata } from 'next';
import { MotionConfig } from 'framer-motion';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoreInitializer from '@/components/layout/StoreInitializer';
import ThemeScript from '@/components/layout/ThemeScript';
import PageTransition from '@/components/layout/PageTransition';

export const metadata: Metadata = {
  title: 'DSA House — Learn Data Structures & Algorithms',
  description: 'Master data structures and algorithms with interactive visualizers, multi-language code, structured curriculum, and hands-on practice.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <ThemeScript />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground font-sans relative overflow-x-hidden transition-colors duration-300"
      >
        <div className="mesh-bg" aria-hidden />
        <div className="grid-overlay" aria-hidden />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground focus:font-bold focus:rounded-lg focus:m-2">
          Skip to content
        </a>
        {/*
          `reducedMotion="user"` makes every `motion.*` component in the tree
          automatically honour prefers-reduced-motion by disabling
          transform/layout animation (opacity still transitions, so content
          doesn't hard-cut). ~40 components use Framer Motion directly without
          checking `useReducedMotion()` themselves — this is a single switch
          covering all of them, rather than auditing each one by hand. The
          three call sites that already gate manually (roadmap, PageTransition,
          the shared Tooltip) are unaffected; they simply become redundant,
          not wrong.
        */}
        <MotionConfig reducedMotion="user">
          <StoreInitializer />
          <Navbar />
          <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col relative z-10">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
