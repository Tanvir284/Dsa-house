'use client';

import { Canvas } from '@react-three/fiber';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  /** Camera field of view + distance, tuned per motif. */
  camera?: { position: [number, number, number]; fov?: number };
  /** Skip mounting below this viewport width (perf/battery on mobile). */
  minWidth?: number;
}

/**
 * Client-only, viewport-gated Canvas wrapper. Never renders WebGL during SSR,
 * pauses/unmounts when scrolled off-screen, and bails out entirely for
 * prefers-reduced-motion or small viewports — decorative 3D should never cost
 * a mobile user battery or a reduced-motion user comfort.
 */
export default function Scene3D({
  children,
  className = '',
  camera = { position: [0, 0, 8], fov: 40 },
  minWidth = 640,
}: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wideEnough = window.innerWidth >= minWidth;
    setAllowed(!reduceMotion && wideEnough);
  }, [minWidth]);

  useEffect(() => {
    if (!mounted || !allowed || !containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '150px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, allowed]);

  return (
    <div ref={containerRef} className={className} aria-hidden>
      {mounted && allowed && inView && (
        <Canvas
          camera={camera}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          style={{ width: '100%', height: '100%' }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
