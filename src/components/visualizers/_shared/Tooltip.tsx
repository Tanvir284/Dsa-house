'use client';

import { useState, useId, ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  /** Placement relative to the trigger. Defaults to top. */
  side?: 'top' | 'bottom';
  className?: string;
}

/** Lightweight hover/focus tooltip built on framer-motion.
 *  Reduced-motion aware; no extra dependency. */
export default function Tooltip({
  content,
  children,
  side = 'top',
  className = '',
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();

  const posClasses =
    side === 'top'
      ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
      : 'top-full left-1/2 -translate-x-1/2 mt-2';

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={open ? id : undefined}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            id={id}
            role="tooltip"
            className={`viz-tooltip absolute z-50 ${posClasses}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.96 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.14 }}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
