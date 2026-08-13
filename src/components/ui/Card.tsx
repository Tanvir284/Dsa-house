'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent, ReactNode, useRef } from 'react';
import { fadeUp, inViewOnce, springSoft } from '@/lib/motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Mouse-tracked 3D tilt on hover. Disable for dense grids/tables. */
  tilt?: boolean;
  /** whileInView fade-up entrance. Disable when a parent already staggers. */
  animate?: boolean;
  onClick?: () => void;
}

/** Shared glass card primitive: subtle mouse-tracked 3D tilt + a fade-up
 * entrance, built on the existing `.glass-card` design tokens. */
export default function Card({ children, className = '', tilt = true, animate = true, onClick }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), springSoft);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), springSoft);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      variants={animate ? fadeUp : undefined}
      initial={animate ? 'hidden' : undefined}
      whileInView={animate ? 'show' : undefined}
      viewport={animate ? inViewOnce : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -4 }}
      style={tilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
