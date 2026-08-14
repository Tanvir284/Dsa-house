# Architecture

This document explains the decisions behind DSA House's non-obvious parts —
the tracer engine, the data layer split, the testing and CI setup, and the
offline-first state model — and why each one is shaped the way it is. It
assumes you've read the [README](../README.md) for what the app does; this is
about how, and why that way.

## Contents

- [The tracer engine](#the-tracer-engine)
- [Data layer: catalog vs. content](#data-layer-catalog-vs-content)
- [State and persistence](#state-and-persistence)
- [Testing strategy](#testing-strategy)
- [Performance budget](#performance-budget)
- [Accessibility](#accessibility)
- [CI](#ci)

---

## The tracer engine

**Problem.** The original visualizers were driven by hand-written step
generators — one `generateBubbleSortSteps`-style function per algorithm, each
a parallel copy of the algorithm's logic that also pushed a
`{ elements, highlights, explanation, status }` object onto a steps array at
every point worth showing. The algorithm and its narration were two things a
person had to keep in agreement by hand. The test suite that existed for this
(`tests/dsa-logic.test.js`, since deleted) made the risk concrete: it asserted
against a *third* hand-ported copy of each algorithm, so it could pass while
the shipped visualizer disagreed with the shipped algorithm.

**Approach.** `src/lib/trace/` is a small instrumentation layer. An algorithm
author writes ordinary, readable code against a `Tracer` API
(`src/lib/trace/types.ts`) — a `TracedArray` for reads/writes/comparisons/
swaps, plus `mark`/`scope`/`enter`/`exit`/`note` for cursors, sub-ranges, call
stack, and narration. Every call through that API is recorded as a `TraceFrame`
as it happens:

```ts
// src/lib/trace/algorithms/sorting.ts — this is the whole algorithm.
// There is no second copy anywhere that describes what it does.
run(t, input) {
  const a = t.array(input);
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a.gt(j, j + 1)) a.swap(j, j + 1);
    }
    a.seal(a.length - i - 1);
  }
  return a.snapshot();
}
```

`a.gt(j, j+1)` both performs the comparison the algorithm needs *and* emits a
frame recording it, with narration generated from the operation itself
(`"Compare a[j] (12) with a[j+1] (7) — 12 > 7."`). The visualization is a
byproduct of actually running the algorithm — it cannot disagree with what the
algorithm did, because it's derived from doing it.

This bought three things beyond correctness:

- **Real complexity data.** `TraceMetrics` (comparisons, swaps, reads, writes)
  are incremented by the instrumentation, not asserted by the algorithm
  author. The "Work Done" panel on `/visualizer/[slug]` and the empirical
  complexity comparisons in the tests (e.g. "merge sort does fewer comparisons
  than bubble sort at n=40") are measured, not claimed.
- **A recursion call stack for free.** `enter`/`exit` around recursive calls
  (merge sort, quick sort) produce a real call-stack panel, which a
  step-array-of-objects design has no natural way to represent.
- **Ten visualizers from four.** Selection, insertion, heap, and shell sort,
  plus linear and jump search, were each ~30–80 lines once the tracer existed
  to write them against — versus ~115 lines average for each of the original
  four hand-written generators.

**Verification.** `tests/tracer.test.ts` asserts invariants that hold for
*every* algorithm in the registry, not per-algorithm: output is a permutation
of the input, every swap is a true transposition (not just "two cells
changed"), a cell once marked `sorted` never changes again, no frame invents a
value that wasn't in the input, metrics are monotonic, and adaptive sorts
provably do less work on already-sorted input than on reversed input.  Adding
an algorithm to `algorithms/sorting.ts` or `algorithms/searching.ts` and
registering it in `src/lib/trace/index.ts` subjects it to the whole battery
automatically — there is no per-algorithm test file to remember to write.

These invariants caught three real bugs during development (not
retrospectively — while writing the algorithms): heap sort briefly mislabelled
as adaptive, insertion and shell sort marking a prefix `sorted` when a later
key could still move it, and an early version of the frame-budget guard
(`DEFAULT_FRAME_BUDGET` in `tracer.ts`, protecting against a pathological
pasted input allocating unbounded frames) silently corrupting the computed
result instead of only truncating the recording.

**Where the seam is.** `toVisualizerSteps()` in `src/lib/trace/index.ts` adapts
a `Trace` to the legacy `VisualizerStep[]` shape the existing renderers
(`ArrayVisualizer`, `VisualizerWrapper`) consume. This is deliberate: it let
the tracer replace the generator layer without also requiring a rewrite of
every visualizer component in the same change. A new surface that wants the
richer data — call stack, metrics, named markers — should read `TraceFrame`
directly rather than going through the adapter, which drops that structure
down to `{ elements, highlights, markers, explanation, status }`.

---

## Data layer: catalog vs. content

`src/data/index.ts` is a barrel that builds the full curriculum content
maps — every lesson section, code snippet, and quiz question for all 150
topics — at module scope. That's necessary for the topic and quiz pages, which
render that content. It's a problem for every other page, because a static
import of `topics` from the barrel pulled the entire curriculum along with it:
the home page, which only needed `topics.length`, was shipping roughly 1.2 MB
of lesson prose to display the number 150.

The fix is a light module, `src/data/catalog.ts`, holding only what a listing
needs — topic and category metadata, no lesson content. `src/data/problems.ts`
does the same for the 1.3 MB problem set, and `src/data/counts.ts` holds
literal count constants for pages (the home page) that display a number and
never render the underlying rows.

The literal constants are the part that could silently drift, so
`tests/data-integrity.test.ts` loads the real data and fails the build if
`PROBLEM_COUNT`, `TOPIC_COUNT`, or `CATEGORY_COUNT` disagree with reality, and
separately checks referential integrity — every topic's `category_id` resolves
to a real category, no duplicate slugs or problem ids, every quiz has a
non-empty question list. That last check caught a real bug: `CATEGORY_IDS.
foundations` was referenced by 35 topics in the expanded curriculum but never
registered in the `categories` array, so those topics — Big-O notation,
recursion trees, logarithms, two's complement — were orphaned and rendered in
no category listing anywhere in the app.

**Rule of thumb for new code:** import from `@/data/catalog` for anything that
lists or links topics; import from `@/data` only where a lesson, snippet, or
quiz is actually rendered.

---

## State and persistence

`src/lib/store.ts` is a single Zustand store, persisted to `localStorage`
under namespaced keys (`dsa_profile`, `dsa_completed_lessons`, etc.) rather
than through Zustand's `persist` middleware, because different pieces of state
need different write timing — e.g. `completeLesson` needs to update streak and
run achievement evaluation in the same tick, which a generic persist
middleware doesn't know how to sequence.

The app is offline-first: `isOffline` is derived once at boot from whether
`NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` are set. Without
them, every store action that would otherwise call Supabase writes to
`localStorage` only. This isn't a fallback path bolted onto a
cloud-first design — the offline path is exercised by default in local
development, since most contributors won't have Supabase credentials
configured.

Feature-specific state that doesn't need to be global lives in its own small
module next to the store rather than being folded into it — see
`src/lib/daily-challenges.ts` and `src/lib/interview-session.ts`. Both read and
write their own `localStorage` keys and call back into the store only for the
side effects that are genuinely global (XP, streaks, problem completion).
`store.ts` is already large; this keeps it from becoming the junk drawer for
every feature that happens to award XP.

---

## Testing strategy

Three test files, one for each of the risk clusters that mattered enough to
gate a merge over:

| File | What it protects |
|---|---|
| `tests/tracer.test.ts` | The tracer engine's correctness invariants (55 cases) — see [above](#the-tracer-engine). |
| `tests/data-integrity.test.ts` | The catalog/content split staying in sync, and referential integrity of the curriculum data (12 cases). |
| `tests/interview-session.test.ts` | The mock-interview session engine — weighted problem selection, deterministic-under-seed, graceful degradation, scoring (15 cases). |

Vitest, not the project's original hand-rolled `node:test` runner
(`tests/dsa-logic.test.js`, deleted) — that file both tested a third copy of
the sorting algorithms rather than the shipped code, and had no coverage
reporting or CI integration. `npm test` now runs the suite;
`npm run test:coverage` adds v8 coverage with a 70% threshold gate on
`src/lib/**`, deliberately excluding the QuickJS worker and the Supabase
client (both are thin wrappers around external systems better verified by
integration/manual testing than unit coverage).

---

## Performance budget

Measured against a production build (`next build && next start`), summing JS
transferred up to `loadEventEnd` in a real browser — not just file sizes on
disk, which undercounts what actually loads a page.

| | Before | After |
|---|---|---|
| Home page JS | 3356 KB | 1211 KB |
| Total JS on disk | 6.35 MB | 4.67 MB |

The four contributors, largest first:

1. **The `@/data` barrel** (see [above](#data-layer-catalog-vs-content)) — the
   single largest cause, since it was pulled in by pages that never needed it.
2. **Decorative WebGL.** three.js + `@react-three/fiber` + `drei` cost 883 KB
   to draw an ambient backdrop rendered at 12% opacity. The components
   (`Scene3D`) already declined to render for `prefers-reduced-motion` and
   narrow viewports, but only *after* the bundle had downloaded and parsed —
   the users most in need of the saving paid the full cost. Replaced with
   blurred CSS radial gradients and an inline SVG motif: compositor-only, no
   render loop, renders during SSR, and honours `prefers-reduced-motion` in
   CSS before first paint rather than after the JS runs. Three dependencies
   removed.
3. **KaTeX**, ~260 KB, was a static import in `MarkdownRenderer` — every route
   rendering any markdown paid for the typesetter, including problem
   descriptions that contain no LaTeX. Now dynamically imported only when the
   content actually contains a `$`.
4. **Link prefetching.** Listing pages that render hundreds of topic links
   (the topics index, bookmarks) were triggering Next's default hover/viewport
   prefetch for every link, each pulling the shared curriculum chunk.
   `prefetch={false}` on those listing links.

`scripts/check-bundle-budget.mjs` sums every chunk under `.next/static/chunks`
and fails if the total or the largest single chunk exceeds a budget set just
above current size (`npm run budget`, wired into CI). A budget with generous
headroom permits exactly the drift it exists to prevent, so it's meant to be
raised deliberately, in a commit that explains what earned the increase — not
padded in advance.

---

## Accessibility

Baseline before this pass: ~29 `aria-*` attributes across the entire
codebase, no keyboard navigation in the one component that's keyboard-first by
design (⌘K command palette), no `aria-live` region on the visualizer's step
narration (the only accessible description of what the algorithm is doing —
the bars and highlighted cells it describes are unreadable to a screen
reader), and six form fields with visible `<label>` text that wasn't
programmatically associated with its input.

Notable pieces, not an exhaustive list:

- **`MotionConfig reducedMotion="user"`** in the root layout makes every
  `motion.*` component in the tree honour `prefers-reduced-motion`
  automatically, covering roughly 40 components that don't check
  `useReducedMotion()` individually.
- **Focus management on route change.** A client-routed `<Link>` navigation
  never reloads the document, so focus stays on the link just clicked — now
  pointing at a page the user has left. `PageTransition` moves focus to the
  new page's heading after each navigation. (Worth knowing if you touch this:
  the first implementation hooked Framer Motion's `onAnimationComplete` on the
  entering element; verified in-browser that it didn't fire reliably under
  `AnimatePresence mode="wait"` and was replaced with a plain `setTimeout`
  keyed on pathname, which tested reliably across repeated navigations.
  `AnimatePresence` has a second, sharper gotcha covered in the note below.)
- **The arena colour palette is Okabe–Ito**, chosen specifically because it
  stays distinguishable under protanopia, deuteranopia, and tritanopia — the
  palette it replaced used a red/green pairing for swap-vs-sorted state that
  is indistinguishable to roughly 1 in 12 men. Every accent/state colour pair
  in both themes was checked against WCAG AA contrast programmatically (in a
  live browser, computing relative luminance from the rendered CSS custom
  properties), not eyeballed.

**A pattern worth flagging for future work in this codebase:**
`AnimatePresence` requires a *direct* `motion.*` element as each child to
reliably track exit-animation completion — wrapping the actual `motion.div`
inside a plain function component (as the interview session's setup/active/
summary panels initially did) breaks that tracking. In testing, React's own
state updated correctly on every interaction (confirmed via render logging),
but `AnimatePresence` never received the exit signal it needed through that
extra layer of indirection, so the DOM stayed on the first panel indefinitely
regardless of what the state actually was. If a future multi-step flow needs
panel-to-panel transitions, either make the panel component's root the direct
`AnimatePresence` child (no wrapping function-component boundary) or skip
`AnimatePresence` and rely on each panel's own mount-time `initial`/`animate`
props, which fire correctly on ordinary React mount independent of it.

---

## CI

`.github/workflows/ci.yml` runs two jobs on every push and PR to `main`:

- **verify**: typecheck → lint → test, in that order specifically so a trivial
  break fails in seconds rather than after a full production build.
- **build**: production build, then `npm run budget` against the bundle
  budget script above.

Both run in parallel; a newer push to the same branch cancels the in-flight
run for it (`concurrency` with `cancel-in-progress`).
