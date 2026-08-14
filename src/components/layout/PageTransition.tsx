'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

/**
 * Moves focus to the new page's heading after a route change.
 *
 * A client-routed `<Link>` navigation never reloads the document, so the
 * browser never resets focus the way it does on a full navigation. Without
 * this, a keyboard or screen-reader user who navigates ends up with focus
 * still sitting on the link they just clicked — now pointing at a page
 * they've left — while the new page's content, including its `<h1>`, is
 * announced to no one.
 */
function focusPageHeading() {
  const container = document.getElementById('main-content');
  const target =
    container?.querySelector<HTMLElement>('h1, h2, [role="heading"]') ?? container;
  if (!target) return;
  // Headings aren't natively focusable; tabindex="-1" makes them a valid
  // programmatic focus target without adding them to Tab order.
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (reduceMotion) {
      // No exit/enter sequencing to wait out — the new content is already
      // the one in the DOM by the time this effect runs.
      focusPageHeading();
      return;
    }

    // `AnimatePresence mode="wait"` keeps the OUTGOING page's DOM node
    // mounted until its exit transition finishes, and only then mounts the
    // incoming one — so querying `#main-content` right when `pathname`
    // changes can still find the page being left, not the one being entered.
    // (`onAnimationComplete` on the entering element was tried as a more
    // "correct" signal for exactly this, but did not fire reliably here.)
    // Waiting past the exit duration is a deliberately simple, if
    // approximate, fix: the incoming element is in the DOM as soon as exit
    // completes, before its own fade-in has visually finished, and a screen
    // reader doesn't need to wait for that fade anyway.
    const timer = setTimeout(focusPageHeading, 300);
    return () => clearTimeout(timer);
  }, [pathname, reduceMotion]);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
