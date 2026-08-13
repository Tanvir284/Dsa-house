'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: Variant;
}

const variantClass: Record<Variant, string> = {
  primary: 'btn-premium-primary',
  secondary: 'btn-premium-secondary',
  ghost: 'btn-ghost',
};

/** Motion-wrapped button built on the existing `.btn-premium-*` classes —
 * adds a consistent lift-on-hover / press-down-on-tap feel app-wide. */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', className = '', children, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      className={`${variantClass[variant]} px-4 py-2.5 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
});

export default Button;
