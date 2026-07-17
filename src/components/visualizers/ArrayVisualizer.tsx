'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VisualizerStep } from '@/types';
import Tooltip from './_shared/Tooltip';
import { springSnappy } from './_shared/vizMotion';

interface ArrayVisualizerProps {
  step: VisualizerStep;
}

// Human-readable label for the current element state (used in tooltips).
const STATE_LABEL: Record<string, string> = {
  compare: 'Comparing',
  swap: 'Swapping',
  sorted: 'Sorted',
  active: 'Active',
  idle: 'Idle',
};

// Maps an element state to the bar fill / border / glow using cognitive color vars.
function barStyle(state?: string): React.CSSProperties {
  switch (state) {
    case 'compare':
      return {
        background: 'linear-gradient(to top, color-mix(in srgb, var(--viz-compare) 70%, transparent), color-mix(in srgb, var(--viz-compare) 35%, transparent))',
        borderColor: 'var(--viz-compare)',
        boxShadow: '0 0 18px color-mix(in srgb, var(--viz-compare) 45%, transparent)',
      };
    case 'swap':
      return {
        background: 'linear-gradient(to top, color-mix(in srgb, var(--viz-swap) 70%, transparent), color-mix(in srgb, var(--viz-swap) 35%, transparent))',
        borderColor: 'var(--viz-swap)',
        boxShadow: '0 0 18px color-mix(in srgb, var(--viz-swap) 50%, transparent)',
      };
    case 'sorted':
      return {
        background: 'linear-gradient(to top, color-mix(in srgb, var(--viz-sorted) 45%, transparent), color-mix(in srgb, var(--viz-sorted) 12%, transparent))',
        borderColor: 'color-mix(in srgb, var(--viz-sorted) 40%, transparent)',
      };
    case 'active':
      return {
        background: 'linear-gradient(to top, color-mix(in srgb, var(--viz-active) 60%, transparent), color-mix(in srgb, var(--viz-active) 25%, transparent))',
        borderColor: 'var(--viz-active)',
        boxShadow: '0 0 16px color-mix(in srgb, var(--viz-active) 40%, transparent)',
      };
    default:
      return {
        background: 'linear-gradient(to top, color-mix(in srgb, var(--primary) 22%, transparent), color-mix(in srgb, var(--primary) 6%, transparent))',
        borderColor: 'color-mix(in srgb, var(--primary) 22%, transparent)',
      };
  }
}

// Card (grid view) style using the same cognitive palette.
function cardStyle(state?: string): React.CSSProperties {
  switch (state) {
    case 'compare':
      return { borderColor: 'var(--viz-compare)', background: 'color-mix(in srgb, var(--viz-compare) 15%, transparent)', color: 'var(--viz-compare)' };
    case 'swap':
      return { borderColor: 'var(--viz-swap)', background: 'color-mix(in srgb, var(--viz-swap) 15%, transparent)', color: 'var(--viz-swap)' };
    case 'sorted':
      return { borderColor: 'color-mix(in srgb, var(--viz-sorted) 30%, transparent)', background: 'color-mix(in srgb, var(--viz-sorted) 6%, transparent)', color: 'var(--muted-foreground)', opacity: 0.6 };
    case 'active':
      return { borderColor: 'var(--viz-active)', background: 'color-mix(in srgb, var(--viz-active) 15%, transparent)', color: 'var(--viz-active)' };
    default:
      return {};
  }
}

export default function ArrayVisualizer({ step }: ArrayVisualizerProps) {
  const elements = step.elements || [];
  const markers = step.markers || {};

  // Find max value in array to scale heights proportionally
  const maxVal = Math.max(...elements.map(el => Number(el.val || 0)), 1);

  // Check if range indicators (low/high) exist to draw zone markers
  const lowIndex = markers.low !== undefined ? Number(markers.low) : null;
  const highIndex = markers.high !== undefined ? Number(markers.high) : null;
  const hasRange = lowIndex !== null && highIndex !== null;

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-2xl px-2 py-6">

      {/* 1. Bar Chart Visuals (Heights representation) */}
      <div className="flex items-end justify-center gap-2 md:gap-3 w-full h-48 border-b border-border/60 pb-1 px-4 relative select-none">

        {/* Background Range Zone Highlight for low/high bounds */}
        {hasRange && (
          <div className="absolute bottom-0 h-full flex justify-center gap-2 md:gap-3 w-full px-4 pointer-events-none">
            {elements.map((_, idx) => {
              const inRange = idx >= (lowIndex ?? 0) && idx <= (highIndex ?? 0);
              return (
                <motion.div
                  key={idx}
                  animate={inRange ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.15 }}
                  transition={inRange ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                  className={`flex-1 max-w-[48px] h-full rounded-t-lg ${
                    inRange
                      ? 'bg-accent/[0.04] border-x border-t border-dashed border-accent/30'
                      : ''
                  }`}
                />
              );
            })}
          </div>
        )}

        {elements.map((el, idx) => {
          const heightPercent = Math.max(12, (Number(el.val) / maxVal) * 100);
          const isActive = el.state === 'compare' || el.state === 'swap' || el.state === 'active';
          const label = STATE_LABEL[el.state || 'idle'] || 'Idle';

          return (
            <div key={idx} className="flex flex-col items-center flex-1 max-w-[48px] h-full justify-end group z-10">
              {/* Value label above bar */}
              <span className="text-[10px] font-mono font-black text-muted-foreground group-hover:text-foreground mb-2 transition-colors">{el.val}</span>
              {/* Bar element */}
              <Tooltip content={`${label} · value ${el.val}`}>
                <motion.div
                  layout
                  animate={{ height: `${heightPercent}%`, scale: isActive ? 1.03 : 1 }}
                  transition={springSnappy}
                  style={barStyle(el.state)}
                  className="w-full rounded-t-lg border-t border-x cursor-help"
                />
              </Tooltip>
            </div>
          );
        })}
      </div>

      {/* 2. Grid Cards View with Markers below */}
      <div className="flex flex-col gap-4 w-full justify-center">
        <motion.div layout className="flex justify-center gap-2.5 md:gap-3.5 flex-wrap">
          {elements.map((el, idx) => {
            const label = STATE_LABEL[el.state || 'idle'] || 'Idle';

            // Find matching markers for this index
            const indexMarkers = Object.entries(markers)
              .filter((entry) => entry[1] === idx)
              .map((entry) => entry[0]);

            return (
              <motion.div layout key={idx} transition={springSnappy} className="flex flex-col items-center w-14">
                {/* Node Box */}
                <Tooltip content={`Index ${idx} · ${label}`}>
                  <motion.div
                    animate={{ scale: el.state === 'compare' || el.state === 'swap' ? 1.08 : 1 }}
                    transition={springSnappy}
                    style={cardStyle(el.state)}
                    className="w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-sm font-bold shadow-sm text-foreground bg-card/35 cursor-help"
                  >
                    {el.val}
                  </motion.div>
                </Tooltip>

                {/* Floating pill index label */}
                <span className="text-[8px] font-mono font-black text-muted-foreground bg-muted/60 border border-border/60 px-1.5 py-0.5 rounded-full mt-2.5 select-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]">
                  {idx}
                </span>

                {/* Floating pointer markers underneath */}
                <div className="min-h-[48px] flex flex-col gap-1 items-center mt-2.5 w-full select-none">
                  {indexMarkers.map((marker, mIdx) => {
                    let markerBg = 'bg-primary/10 border-primary/20 text-primary';
                    if (marker === 'mid') markerBg = 'bg-accent/10 border-accent/20 text-accent';
                    if (marker === 'low') markerBg = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
                    if (marker === 'high') markerBg = 'bg-rose-500/10 border-rose-500/20 text-rose-400';

                    return (
                      <motion.span
                        key={mIdx}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={springSnappy}
                        className={`text-[7.5px] font-black px-1.5 py-0.5 rounded border shadow-sm uppercase tracking-widest leading-none ${markerBg}`}
                      >
                        {marker}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
