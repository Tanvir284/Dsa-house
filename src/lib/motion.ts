'use client';

import { Transition, Variants } from 'framer-motion';

/* Shared motion presets for app-wide (non-visualizer) UI, so every page feels
 * consistent. Transform/opacity only — GPU-friendly, safe with reduced-motion. */

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
};

export const easeOut: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

// Fade + rise, for section/card entrances (pair with whileInView).
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: easeOut },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: easeOut },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: springSoft },
};

// Parent wrapper — staggers any fadeUp/scaleIn children automatically.
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.045 },
  },
};

// Common viewport config for whileInView entrances — animate once, a bit early.
export const inViewOnce = { once: true, margin: '-80px 0px -80px 0px' } as const;

export const navPillTransition: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 40,
};
