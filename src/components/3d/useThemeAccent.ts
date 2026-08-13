'use client';

import { useEffect, useState } from 'react';

const DARK = { from: '#4f9dff', to: '#8b5cf6' };
const LIGHT = { from: '#2563eb', to: '#7c3aed' };

/** Mirrors the app's --accent-from/--accent-to tokens as hex, since three.js
 * materials can't read CSS custom properties. Tracks the `light` class
 * toggled on <html> by the zustand theme store (see src/lib/theme.ts). */
export function useThemeAccent() {
  const [accent, setAccent] = useState(DARK);

  useEffect(() => {
    const read = () =>
      setAccent(document.documentElement.classList.contains('light') ? LIGHT : DARK);
    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return accent;
}
