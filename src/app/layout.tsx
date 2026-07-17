import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoreInitializer from '@/components/layout/StoreInitializer';
import ThemeScript from '@/components/layout/ThemeScript';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DSA House — Learn Data Structures & Algorithms',
  description: 'Master data structures and algorithms with interactive visualizers, multi-language code, structured curriculum, and hands-on practice.',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground font-sans relative overflow-x-hidden transition-colors duration-300"
      >
        <div className="mesh-bg" aria-hidden />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground focus:font-bold focus:rounded-lg focus:m-2">
          Skip to content
        </a>
        <StoreInitializer />
        <Navbar />
        <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
