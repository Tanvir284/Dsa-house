# Visual Revamp — Algorithm Visualizer & Learning Roadmap

## Summary
Comprehensively upgrade the visual appeal and interactivity of two modules for new DSA learners:
1. **Algorithm Visualization Module** — fluid motion, layered visual hierarchy, cognitive color-coding, hover tooltips, and richer playback controls (slow-motion / fast-forward / pause already partially exist; extend and polish).
2. **Learning Roadmap Module** — replace the flat SVG skill-tree with an **immersive adventure-map** experience: winding journey path, themed zones/chapters, glowing milestone nodes, progress marker, unlock animations, and narrative storytelling.

**Approved decisions:** Use **Framer Motion** for animations; **Immersive adventure map** roadmap style; revamp **both modules fully**.

## Current State Analysis
- **Styling system:** Tailwind CSS v4 with `@theme` tokens + custom utility classes in [globals.css](file:///c:/Users/MD%20Tanvir%20Islam/Documents/DSA%20House/src/app/globals.css). Existing keyframes: `fadeIn`, `slideUp`, `scaleIn`, `pulse-slow`, `shimmer`, `float`, `dash`. Roadmap CSS vars already defined (`--roadmap-node-*`, `.bezier-link*`). Color tokens: primary=orange `#f97316`, accent=blue `#3b82f6`, complete=green `#22c55e`, hard=red `#ef4444`. Dark + light themes.
- **Visualizer playback:** [VisualizerWrapper.tsx](file:///c:/Users/MD%20Tanvir%20Islam/Documents/DSA%20House/src/components/visualizers/VisualizerWrapper.tsx) owns play/pause, step fwd/back, reset, a **speed slider (0.1x–2.0x)**, and a **scrub bar**. Renders arena + controls + pseudocode trace + narrative card. Used by array-based algos (bubble/binary/merge/quick sort).
- **Array rendering:** [ArrayVisualizer.tsx](file:///c:/Users/MD%20Tanvir%20Islam/Documents/DSA%20House/src/components/visualizers/ArrayVisualizer.tsx) draws bar chart + index cards; state colors: `compare`→accent, `swap`→rose, `sorted`→complete. Uses CSS `transition-all duration-300` (no layout/spring animation).
- **Structural visualizers:** `LinkedListVisualizer`, `StackQueueVisualizer`, `TreeVisualizer`, `GraphVisualizer` self-manage state/animation.
- **Visualizer host page:** [visualizer/[slug]/page.tsx](file:///c:/Users/MD%20Tanvir%20Islam/Documents/DSA%20House/src/app/visualizer/[slug]/page.tsx) — IDE-style layout, register tracker, synced code panel.
- **Roadmap:** [roadmap/page.tsx](file:///c:/Users/MD%20Tanvir%20Islam/Documents/DSA%20House/src/app/roadmap/page.tsx) — static `ROADMAP_LAYOUT` (20 nodes with x/y/label/emoji), SVG bezier connections, click-to-select detail panel, `completedLessons` drives done/locked. Flat, static, functional but plain.
- **Dependencies:** No animation lib installed. React 19.2.4, Next 16.2.6. `canvas-confetti` IS available (used for celebrations).

## Assumptions & Decisions
- **A1.** Install `framer-motion` (latest, React 19 compatible). Wrap only client components; respect `prefers-reduced-motion` via Framer's `useReducedMotion`.
- **A2.** Keep all existing algorithm/logic (step generators, playback state) intact — this is a **visual/interaction** revamp only. No changes to `dsa-utils.ts` logic.
- **A3.** Cognitive color-coding standard (applied consistently across visualizers), documented via CSS vars:
  - Default/idle → muted; **Comparing** → accent blue; **Swapping/Moving** → rose/red; **Sorted/Done** → green; **Active pointer/pivot** → primary orange; **Range/window** → dashed accent zone.
- **A4.** Adventure map uses a single responsive SVG "journey path" with zones grouped by category (Foundations → Linear → Sorting/Searching → Trees → Graphs → Patterns). Node coordinates authored to follow a winding trail. Horizontal scroll on desktop, vertical stacked serpentine on small screens.
- **A5.** New speed presets add labeled Slow / Normal / Fast buttons alongside the existing continuous slider (explicitly satisfies "slow-motion, fast-forward").
- **A6.** Tooltips implemented as lightweight custom component (Framer Motion fade/scale) — no extra tooltip dependency.

## Proposed Changes

### 1. Dependency
- **`package.json`** — add `framer-motion` to dependencies (run `npm install framer-motion`).

### 2. globals.css — shared visual foundation
Add (WHAT/WHY):
- **Color-coding CSS vars** `--viz-compare`, `--viz-swap`, `--viz-sorted`, `--viz-active`, `--viz-range` (both themes) so all visualizers share one cognitive palette.
- **New keyframes/utilities:** `glowPulse` (active node glow), `unlockBurst` (scale+fade ring), `pathDraw` (stroke-dashoffset draw-in for journey path), `trail-flow` (animated dashed path flow), `.viz-bar`/`.viz-cell` base styles, `.tooltip-pop`.
- **Adventure map classes:** `.journey-path`, `.journey-path-completed`, `.zone-band`, `.milestone-node`, `.milestone-glow`, `.map-bg` (layered parallax mesh/grid).
- **Reduced-motion guard:** `@media (prefers-reduced-motion: reduce)` to disable non-essential animation.

### 3. Algorithm Visualization Module

#### 3a. `src/components/visualizers/VisualizerWrapper.tsx`
- Convert control panels & narrative card to Framer Motion (`motion.div` staggered entrance, `AnimatePresence` for the narrative text swap per step).
- **Add Slow / Normal / Fast preset buttons** wired to the existing `speed` state (e.g. 1600ms / 900ms / 300ms) next to the current slider; highlight the active preset.
- Animate the play/pause primary button (spring scale), add a live progress ring around it reflecting `currentStepIndex/steps.length`.
- Add **hover tooltips** on all control buttons (Reset/Prev/Play/Next + presets) using the new tooltip component.
- Animate the scrub bar fill and add a moving thumb glow.
- Keep all existing handlers/props/signature unchanged (backward compatible with structural visualizers that pass `renderVisuals`).

#### 3b. `src/components/visualizers/ArrayVisualizer.tsx`
- Use Framer Motion `layout` animations on bars & index cards so swaps **slide/reorder fluidly** instead of instant recolor.
- Apply the shared cognitive color vars; add layered depth (soft shadow + gradient) and a subtle floating value label.
- Add **hover tooltip** per bar/cell showing `value`, `index`, and current `state` (comparing/swapping/sorted).
- Animate range/window zone with a pulsing dashed band.

#### 3c. `src/components/visualizers/_shared/` (new small helpers)
- **`Tooltip.tsx`** — reusable hover tooltip (Framer Motion, positioned, reduced-motion aware).
- **`vizMotion.ts`** — shared motion variants/transition presets (spring configs) reused by wrapper + array + structural visualizers to keep motion consistent and performant.

#### 3d. Structural visualizers (LinkedList, StackQueue, Tree, Graph) — shared polish
- Import shared motion variants + tooltip; wrap node/element mount & exit in `AnimatePresence` for enter/leave animation (push/pop/enqueue/visit).
- Apply shared cognitive color vars (replace ad-hoc rose/accent literals where trivial).
- Scope: consistent entrance/exit + tooltips; **not** a full re-layout (keeps risk low, logic untouched).

### 4. Learning Roadmap Module — Immersive Adventure Map

#### 4a. `src/app/roadmap/page.tsx` (major redesign, keep data source)
- Keep `topics`/`completedLessons` data flow and the prerequisite/lock logic. Restructure `ROADMAP_LAYOUT` coordinates into a **winding serpentine trail** grouped into **themed zones/chapters** (Foundations, Linear Structures, Sort & Search, Trees, Graphs, Patterns) each with a title, emoji banner, and tint band behind its nodes.
- Render with a responsive SVG "journey path" connecting nodes in learning order; the path **draws in** on mount (`pathDraw`) and the **completed portion is highlighted** (green flowing dash). Locked portion dimmed.
- **Milestone nodes** = `motion` circles/cards: idle (locked, grey + lock icon), available (orange glow pulse), completed (green + check, subtle bob). Hover → scale + tooltip (title, difficulty, status). Click → selects node (existing detail panel, upgraded with motion entrance).
- **Progress marker**: an animated avatar/flag that sits on the furthest completed node; **unlock burst** animation plays when a node becomes available (ring expand + optional `canvas-confetti` on completion milestones per zone).
- **Narrative storytelling**: each zone has a short "chapter" intro line ("Chapter 1 — Foundations: master the bricks before the building"). A top progress banner shows `completedNodes/totalNodes` with an animated progress bar and current-chapter label.
- **Responsive**: horizontal scroll trail on `lg+`; on small screens switch to a vertical serpentine (CSS + adjusted viewBox / stacked zone sections). Ensure touch scroll works.

#### 4b. Detail panel
- Add Framer Motion entrance/`AnimatePresence` when switching selected node; animate the prerequisite list and "Start Topic" CTA.

## Performance & Accessibility Guardrails
- Use GPU-friendly transforms (`transform`, `opacity`) only; avoid animating layout-heavy props except via Framer `layout` (which uses transforms).
- `useReducedMotion()` disables non-essential motion; all content remains fully usable without animation.
- Lazy-run entrance animations once (viewport `whileInView` / `initial`+`animate`), avoid infinite heavy loops except small glows.
- No blocking of first paint; Framer Motion imported only in client components already marked `'use client'`.

## Verification Steps
1. `npm install framer-motion` succeeds; `npm run build` compiles with no TS errors.
2. `npm test` still passes (logic untouched → 4/4).
3. Manual UI test (dev server) — **novice-usability checklist**:
   - Visualizer: play/pause, step fwd/back, **Slow/Normal/Fast** presets and slider all work; bars **animate/slide** on swap; hover tooltips show value/index/state; color-coding legend is clear; narrative text transitions per step.
   - Roadmap: journey path draws in; zones/chapters visible with narrative intros; node states (locked/available/completed) correct vs `completedLessons`; hover tooltips + click detail panel work; progress banner + marker update; unlock/celebration animation fires; layout adapts on mobile width.
   - Toggle OS reduced-motion → animations gracefully reduce, UI still functional.
   - Verify both dark and light themes.
4. Confirm no console errors in browser preview; check interaction remains fluid (no jank) with 8–20 element inputs.

## Out of Scope
- Algorithm/step-generation logic changes.
- New topics/problems content.
- Backend/auth/store changes.
