'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export default function StoreInitializer() {
  const initializeStore = useAppStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();
    
    // Register PWA service worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(
        (reg) => console.log('ServiceWorker registered with scope:', reg.scope),
        (err) => console.error('ServiceWorker registration failed:', err)
      );
    }
  }, [initializeStore]);

  return null;
}
