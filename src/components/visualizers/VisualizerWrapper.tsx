'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Sliders, List, HelpCircle, Code, Rabbit, Turtle, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import { VisualizerStep, VisualizerConfig } from '@/types';
import Tooltip from './_shared/Tooltip';
import { staggerContainer, riseItem, springSnappy } from './_shared/vizMotion';
import AmbientOrbField from '@/components/3d/AmbientOrbField';

const SPEED_PRESETS = [
  { label: 'Slow', icon: Turtle, ms: 1600 },
  { label: 'Normal', icon: Gauge, ms: 900 },
  { label: 'Fast', icon: Rabbit, ms: 300 },
];

interface VisualizerWrapperProps {
  config: VisualizerConfig;
  steps: VisualizerStep[];
  currentStepIndex: number;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
  onGenerateInput: (customInput?: string) => void;
  renderVisuals: (step: VisualizerStep) => React.ReactNode;
  additionalControls?: React.ReactNode;
}

export default function VisualizerWrapper({
  config,
  steps,
  currentStepIndex,
  setCurrentStepIndex,
  onGenerateInput,
  renderVisuals,
  additionalControls,
}: VisualizerWrapperProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  // Defaults to the "Normal" preset so one of the preset chips reads as active
  // on first paint (previously 1000ms matched no preset).
  const [speed, setSpeed] = useState(900); // ms delay per step
  const [inputVal, setInputVal] = useState(config.defaultInput);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, []);

  // Keep the index inside bounds when a new input produces a shorter step list.
  useEffect(() => {
    setCurrentStepIndex((prev) => {
      const maxIndex = Math.max(0, steps.length - 1);
      return prev > maxIndex ? maxIndex : prev;
    });
  }, [steps.length, setCurrentStepIndex]);

  // Mirror the current index so the playback timer can read it without the
  // interval effect having to re-subscribe on every step.
  const stepIndexRef = useRef(currentStepIndex);
  useEffect(() => {
    stepIndexRef.current = currentStepIndex;
  }, [currentStepIndex]);

  // Playback Loop
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        // Stopping is decided here (a timer callback), not inside the state
        // updater — updaters must stay pure because React may re-invoke them.
        if (stepIndexRef.current >= steps.length - 1) {
          setIsPlaying(false);
          return;
        }
        setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, speed);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, steps.length, speed, setCurrentStepIndex]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  
  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlaying(false);
    
    const parsed = inputVal.split(',').map(s => s.trim()).filter(s => s !== '');
    if (parsed.length > 20) {
      alert("Please enter a maximum of 20 elements to prevent visualizer lag.");
      return;
    }
    if (parsed.some(s => isNaN(Number(s)))) {
      alert("Please enter only valid numbers separated by commas.");
      return;
    }
    if (parsed.length === 0) {
      alert("Please enter at least one number.");
      return;
    }

    onGenerateInput(inputVal);
  };

  const handleGenerateRandom = () => {
    setIsPlaying(false);
    // Simple random array generator
    const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 80) + 10);
    const generatedStr = arr.join(', ');
    setInputVal(generatedStr);
    onGenerateInput(generatedStr);
  };

  const currentStep = steps[currentStepIndex] || {
    elements: [],
    highlights: [],
    markers: {},
    explanation: 'No state loaded.',
    status: 'idle',
    codeLine: -1,
  };

  const progress = steps.length > 1 ? currentStepIndex / (steps.length - 1) : 0;

  return (
    <motion.div
      className="flex flex-col gap-6 w-full"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* 1. Interactive Visualizer Sandbox Panel */}
      <motion.div variants={riseItem} className="relative flex flex-col items-center justify-center p-8 min-h-[340px] rounded-2xl border border-border bg-card shadow-lg overflow-hidden visualizer-arena">
        {/* Decorative only — behind renderVisuals, never intercepts pointer events */}
        <AmbientOrbField compact className="absolute inset-0 -z-10 opacity-[0.15] pointer-events-none" />
        <div className="absolute top-4 left-4 flex items-center gap-2 select-none">
          <span className="flex h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)] animate-pulse" aria-hidden="true" />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visualization Arena</span>
        </div>

        {/* Cognitive color legend */}
        <div className="absolute top-4 right-4 hidden sm:flex items-center gap-3 select-none">
          {[
            { label: 'Compare', v: 'var(--viz-compare)' },
            { label: 'Swap', v: 'var(--viz-swap)' },
            { label: 'Active', v: 'var(--viz-active)' },
            { label: 'Sorted', v: 'var(--viz-sorted)' },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              <span className="viz-legend-dot" style={{ background: l.v }} />
              {l.label}
            </span>
          ))}
        </div>

        {/* Render actual data structure representation */}
        <div className="w-full flex justify-center items-center py-6 overflow-x-auto">
          {renderVisuals(currentStep)}
        </div>

        {/* Step count indicator */}
        <div className="absolute bottom-4 right-4 text-[10px] font-mono font-extrabold text-muted-foreground bg-background/70 px-3 py-1.5 rounded-xl border border-border/60 shadow-sm select-none">
          Step: {currentStepIndex + 1} / {steps.length}
        </div>
      </motion.div>

      {/* Timeline Scrub Bar */}
      <motion.div variants={riseItem} className="w-full p-4 rounded-2xl border border-border bg-card flex items-center gap-4 hover:border-primary/25 transition-all select-none">
        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground font-mono">Scrub Frame</span>
        <div className="relative flex-1 flex items-center">
          <div className="absolute left-0 right-0 h-1.5 rounded-lg bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-lg bg-gradient-to-r from-primary to-[var(--accent-to)]"
              animate={{ width: `${progress * 100}%` }}
              transition={springSnappy}
            />
          </div>
          <input
            type="range"
            min="0"
            max={Math.max(0, steps.length - 1)}
            value={currentStepIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentStepIndex(Number(e.target.value));
            }}
            aria-label="Scrub to step"
            aria-valuetext={`Step ${currentStepIndex + 1} of ${steps.length}`}
            className="relative flex-1 h-1.5 bg-transparent rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
          />
        </div>
        <div className="text-[10px] font-mono font-black text-foreground bg-background px-2.5 py-1 rounded-md border border-border">
          {currentStepIndex + 1} / {steps.length}
        </div>
      </motion.div>

      {/* 2. Playback & Controller Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Playback Controls Card */}
        <motion.div variants={riseItem} className="flex flex-col justify-between p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/25 transition-all">
          <h3 className="text-xs font-black flex items-center gap-2 text-muted-foreground uppercase tracking-widest mb-4">
            <Sliders className="h-4 w-4 text-primary" aria-hidden="true" /> Playback Controls
          </h3>
          <div className="flex flex-col gap-4">
            {/* Control buttons */}
            <div className="flex justify-center items-center gap-3">
              <Tooltip content="Reset to start">
                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl border border-border hover:bg-muted text-foreground transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Reset"
                >
                  <RotateCcw className="h-4.5 w-4.5" />
                </button>
              </Tooltip>
              <Tooltip content="Previous step">
                <button
                  onClick={handleStepBackward}
                  disabled={currentStepIndex === 0}
                  className="p-2.5 rounded-xl border border-border hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent text-foreground transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Previous step"
                >
                  <SkipBack className="h-4.5 w-4.5" />
                </button>
              </Tooltip>
              <Tooltip content={isPlaying ? 'Pause' : 'Play'}>
                <span className="relative inline-flex">
                  {/* Progress ring */}
                  <svg className="absolute inset-0 -rotate-90 pointer-events-none" viewBox="0 0 56 56" width="56" height="56">
                    <circle cx="28" cy="28" r="25" fill="none" stroke="var(--border)" strokeWidth="3" />
                    <motion.circle
                      cx="28" cy="28" r="25" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round"
                      pathLength={1}
                      animate={{ pathLength: progress }}
                      transition={springSnappy}
                    />
                  </svg>
                  <motion.button
                    onClick={handlePlayPause}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.06 }}
                    className="relative m-1 p-3.5 rounded-full bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground shadow-[0_4px_15px_color-mix(in_srgb,var(--primary)_35%,transparent)] cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="h-5 w-5 fill-primary-foreground" /> : <Play className="h-5 w-5 fill-primary-foreground" />}
                  </motion.button>
                </span>
              </Tooltip>
              <Tooltip content="Next step">
                <button
                  onClick={handleStepForward}
                  disabled={currentStepIndex === steps.length - 1}
                  className="p-2.5 rounded-xl border border-border hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent text-foreground transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Next step"
                >
                  <SkipForward className="h-4.5 w-4.5" />
                </button>
              </Tooltip>
            </div>

            {/* Speed presets */}
            <div className="flex items-center justify-center gap-2 mt-1">
              {SPEED_PRESETS.map((preset) => {
                const Icon = preset.icon;
                const active = speed === preset.ms;
                return (
                  <Tooltip key={preset.label} content={`${preset.label} playback`}>
                    <button
                      onClick={() => setSpeed(preset.ms)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                        active
                          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                          : 'border-border text-muted-foreground hover:bg-muted'
                      }`}
                      aria-pressed={active}
                    >
                      <Icon className="h-3.5 w-3.5" /> {preset.label}
                    </button>
                  </Tooltip>
                );
              })}
            </div>

            {/* Speed slider (fine control) */}
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground w-12 select-none">Fine</span>
              <input
                type="range"
                min="200"
                max="2000"
                step="100"
                value={2200 - speed} // Reverse value so larger values are faster
                onChange={(e) => setSpeed(2200 - Number(e.target.value))}
                aria-label="Playback speed"
                aria-valuetext={`${((2200 - speed) / 1000).toFixed(1)} times speed`}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-[10px] font-mono font-extrabold text-muted-foreground w-16 text-right select-none">
                {((2200 - speed) / 1000).toFixed(1)}x
              </span>
            </div>
          </div>
        </motion.div>

        {/* Input Configuration Card */}
        <motion.div variants={riseItem} className="flex flex-col justify-between p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/25 transition-all">
          <h3 className="text-xs font-black flex items-center gap-2 text-muted-foreground uppercase tracking-widest mb-4">
            <List className="h-4 w-4 text-primary" aria-hidden="true" /> Input Configuration
          </h3>
          <form onSubmit={handleCustomInputSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Custom Array values</label>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={config.inputPlaceholder}
                className="input-themed px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 w-full font-semibold"
              />
            </div>
            {additionalControls}
            <div className="grid grid-cols-2 gap-2.5 mt-1.5">
              <button
                type="button"
                onClick={handleGenerateRandom}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-border hover:bg-muted text-foreground transition-all cursor-pointer shadow-sm"
              >
                Randomize
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 shadow-sm transition-all cursor-pointer"
              >
                Apply Custom
              </button>
            </div>
          </form>
        </motion.div>

        {/* Pseudocode/Step Tracker Card */}
        <motion.div variants={riseItem} className="flex flex-col justify-between p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/25 transition-all">
          <h3 className="text-xs font-black flex items-center gap-2 text-muted-foreground uppercase tracking-widest mb-4">
            <Code className="h-4 w-4 text-primary" aria-hidden="true" /> Algorithm Trace
          </h3>
          <div className="code-panel p-3.5 font-mono text-[11px] overflow-y-auto max-h-[140px] flex flex-col gap-0.5 shadow-inner">
            {config.pseudocode.map((line, idx) => (
              <span
                key={idx}
                className={`code-highlight-line rounded-lg ${
                  currentStep.codeLine === idx ? 'code-highlight-line-active' : ''
                }`}
              >
                <span className="text-muted-foreground/60 mr-3 inline-block w-4 text-right select-none">{idx + 1}</span>
                <span className="text-foreground/90 whitespace-pre">{line}</span>
              </span>
            ))}
          </div>
        </motion.div>

      </div>

      {/* 3. Verbal Step Narrative Card */}
      <motion.div variants={riseItem} className="p-5 rounded-2xl border border-border/60 bg-primary/5 backdrop-blur-sm shadow-md flex items-start gap-4 hover:border-primary/25 transition-all">
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/15 text-primary mt-0.5">
          <HelpCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0" role="status" aria-live="polite">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Operation Progress</span>
          {/*
            This narration is the only accessible description of what the
            visualizer is doing — the bars and highlighted cells it describes
            are unreadable to a screen reader. `role="status"` + `aria-live`
            on the persisting wrapper means every step change is announced,
            whether the user steps manually or lets it play.

            Deliberately not wrapped in AnimatePresence: with `mode="wait"`
            here, stepping through a visualizer got stuck showing the first
            frame's narration forever — the "Step: N / M" counter and the
            rendered bars (both driven by the same `currentStep`) updated
            correctly on every click, confirming the underlying data was
            right, but the exit transition this wrapper waits on apparently
            never resolved, so it never advanced to the entering child. This
            is the same failure mode already documented for PageTransition
            (see docs/ARCHITECTURE.md's accessibility section) — an
            AnimatePresence exit-completion signal that doesn't fire
            reliably — hitting a *direct* motion child this time, not one
            behind a wrapping component boundary. A plain keyed `motion.p`
            still remounts and replays its own enter animation on every step
            via ordinary React reconciliation; the only thing given up is the
            outgoing text's exit animation, which is a small price for
            narration that actually updates.
          */}
          <motion.p
            key={currentStepIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-semibold leading-relaxed text-foreground/95"
          >
            {currentStep.explanation}
          </motion.p>
        </div>
      </motion.div>

    </motion.div>
  );
}
