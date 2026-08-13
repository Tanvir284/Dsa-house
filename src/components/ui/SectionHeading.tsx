'use client';

import { motion } from 'framer-motion';
import { fadeUp, inViewOnce } from '@/lib/motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Shared section header: eyebrow + gradient title + description, revealed
 * with a fade-up as it scrolls into view. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      className={`${align === 'center' ? 'text-center mx-auto' : ''} ${className}`}
    >
      {eyebrow && (
        <p className="text-xs font-semibold tracking-wide uppercase text-primary mb-2">{eyebrow}</p>
      )}
      <h2 className="gradient-text">{title}</h2>
      {description && (
        <p className={`mt-2 text-muted-foreground ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
