'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export default function StoreInitializer() {
  const initializeStore = useAppStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return null;
}
