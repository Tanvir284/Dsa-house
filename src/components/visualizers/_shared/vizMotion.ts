'use client';

import { Transition, Variants } from 'framer-motion';

/* Shared motion presets so every visualizer feels consistent and stays performant.
 * All transitions use transform/opacity only (GPU-friendly). */

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 26,
  mass: 0.7,
};

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 30,
};

// Staggered container for control panels / legends.
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export const riseItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: springSoft },
};

// Enter/leave for structural elements (nodes, cells, list items).
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: springSnappy },
  exit: { opacity: 0, scale: 0.6, transition: { duration: 0.18 } },
};

// Narrative text swap.
export const textSwap: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

// Maps a visualizer element state to a cognitive color CSS var.
export type VizState =
  | 'idle'
  | 'compare'
  | 'swap'
  | 'sorted'
  | 'active'
  | 'range';

export function vizColor(state: VizState): string {
  switch (state) {
    case 'compare':
      return 'var(--viz-compare)';
    case 'swap':
      return 'var(--viz-swap)';
    case 'sorted':
      return 'var(--viz-sorted)';
    case 'active':
      return 'var(--viz-active)';
    case 'range':
      return 'var(--viz-range)';
    default:
      return 'var(--viz-idle)';
  }
}

export const VIZ_LEGEND: { label: string; state: VizState }[] = [
  { label: 'Idle', state: 'idle' },
  { label: 'Comparing', state: 'compare' },
  { label: 'Swapping', state: 'swap' },
  { label: 'Active / Pivot', state: 'active' },
  { label: 'Sorted / Done', state: 'sorted' },
];
