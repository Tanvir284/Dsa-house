<div align="center">

# DSA House

### The interactive way to master Data Structures & Algorithms

**Step-by-step visualizers · curated problem arena · quizzes · daily challenges · XP-driven progress tracking**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-433E38?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Animation-Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![Status](https://img.shields.io/badge/status-production_ready-22c55e?style=for-the-badge)](#)

<a href="https://github.com/Tanvir284/Dsa-house">Repository</a> ·
<a href="#-getting-started">Quick Start</a> ·
<a href="#-feature-gallery">Screenshots</a> ·
<a href="#-roadmap--future-work">Roadmap</a>

</div>

---

## Overview

**DSA House** is a full-stack, production-quality learning platform that turns Data Structures & Algorithms from a dry textbook exercise into a hands-on, gamified experience. It ships with a curated curriculum of 100+ topics, ten fully interactive canvas visualizers, a LeetCode/Codeforces-style problem arena, MCQ quizzes with real-time scoring, and a daily-challenge streak system — all wired up with an offline-first Zustand cache and an optional Supabase backend for cloud sync.

The application is built on **Next.js 16 (App Router) + React 19 + Tailwind v4** and follows a strict *works-out-of-the-box* philosophy: if no Supabase credentials are supplied, the entire app degrades gracefully to a LocalStorage-backed offline mode without losing a single feature.

## Why DSA House

- **Concept-first pedagogy.** Every topic ships with intuition, complexity matrices, edge cases, and multi-language reference implementations (Python, C, C++, Java, C#, JavaScript).
- **True interactive learning.** 10 hand-built visualizers with play / pause / step / reset / speed controls — no embedded YouTube clips.
- **Progress you can feel.** XP, streaks, badges, bookmark folders, quiz history, and a personal dashboard.
- **Offline-first architecture.** Zero-config guest experience. Bring your own Supabase project when you're ready to sync.
- **Recruiter-ready code.** Strict TypeScript, typed data layer, RLS-secured Postgres schema, and unit-tested visualizer step functions.

---

## Core Features

| Category | What's inside |
| --- | --- |
| **Curriculum** | 100+ topics across Linear, Trees, Graphs, Algorithms and Advanced Patterns. Big-O tables, prerequisites graph, and rich lesson sections. |
| **Interactive Visualizer Lab** | Bubble / Merge / Quick Sort, Binary Search, Linked List, Stack, Queue, BST, BFS, DFS — each with animated step playback. |
| **Problem Arena** | LeetCode + Codeforces style problems with typed input/output, constraint hints, canonical multi-language solutions and structure diagrams. |
| **Quizzes** | MCQ / True-False / Complexity questions with per-topic quizzes, real-time feedback, confetti finishes and attempt history. |
| **Daily Challenge** | Rotating daily problem + streak system that persists offline. |
| **Roadmap** | Visual progression graph so learners always know the next step. |
| **Patterns Playbook** | Two-pointer, sliding window, greedy, DP, backtracking, hashing and more — with worked examples. |
| **Interview Prep Hub** | Curated question packs, complexity cheatsheets, and technique summaries. |
| **Labs** | Experimental / advanced sandboxes gated behind their own section. |
| **Auth & Profiles** | Email login / register / forgot-password flows, guest mode, streak counter, avatars, XP. |
| **Bookmarks** | Save any topic, problem or visualizer for later. |
| **Admin CMS** | Simulated administration panel for publishing / modifying lessons and code. |
| **Global Command Palette** | ⌘K / Ctrl+K search across every topic, problem and visualizer. |
| **Dark / Light Themes** | System-aware theme toggle with no flash-of-unstyled-content. |

---

## Tech Stack

**Frontend & Framework**
- Next.js 16 (App Router, Turbopack, Server Components)
- React 19 with Suspense / `use()` hook
- TypeScript 5 (strict mode)

**Styling & UX**
- Tailwind CSS v4 (`@theme` tokens in `globals.css`)
- Framer Motion for visualizer animations
- Lucide React icons
- KaTeX for complexity math typesetting
- Canvas Confetti for reward moments

**State & Data**
- Zustand store with LocalStorage persistence (offline mode)
- Supabase (Postgres + Auth + RLS) for optional cloud sync
- Typed data-access layer under `src/data/`

**Tooling & Quality**
- ESLint 9 + `eslint-config-next`
- Node.js native test runner for algorithmic verification
- Playwright for automated screenshot capture (`scripts/capture-screenshots.mjs`)

---

## Project Structure

```
DSA House/
├── assets/
│   └── screenshots/          # High-res module screenshots (this README)
├── public/                   # Static assets & icons
├── scripts/                  # Curriculum authoring + screenshot pipeline
├── src/
│   ├── app/                  # Next.js App Router routes
│   │   ├── page.tsx          # Landing + hero visualizer
│   │   ├── dashboard/        # Personal progress hub
│   │   ├── roadmap/          # Visual learning roadmap
│   │   ├── topics/           # Curriculum catalog + dynamic lessons
│   │   ├── visualizer/       # Interactive sandbox index + slugs
│   │   ├── practice/         # Quiz catalog + active MCQ player
│   │   ├── problems/         # Coding problem arena + workspace
│   │   ├── patterns/         # Algorithmic pattern playbook
│   │   ├── daily/            # Daily challenge & streak system
│   │   ├── labs/             # Experimental sandboxes
│   │   ├── interview-prep/   # Interview prep hub
│   │   ├── bookmarks/        # Saved bookmarks page
│   │   ├── auth/             # Login, register, forgot-password
│   │   ├── admin/            # CMS simulation
│   │   ├── about/            # Mission page
│   │   └── api/auth/session  # Session route handler
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, Theme + Store bootstrappers
│   │   ├── visualizers/      # Array, LinkedList, Stack/Queue, Tree, Graph
│   │   ├── CommandPalette.tsx
│   │   └── MarkdownRenderer.tsx
│   ├── data/                 # Curriculum, problems, visualizer catalog
│   ├── lib/                  # Store, auth, Supabase client, algorithms
│   └── types/                # Shared TypeScript typings
├── supabase/
│   └── schema.sql            # Tables, indexes & RLS policies
├── tests/
│   └── dsa-logic.test.js     # Visualizer step-function unit tests
├── middleware.ts
├── next.config.ts
├── tailwind.config / postcss.config
└── package.json
```

---

## Getting Started

### 1. Prerequisites

- **Node.js** 18.17+ (tested on Node 20 & 24)
- **npm** 9+

### 2. Clone & install

```bash
git clone https://github.com/Tanvir284/Dsa-house.git
cd Dsa-house
npm install
```

### 3. Configure environment (optional)

DSA House runs in **Offline Mode** with zero configuration. To enable cloud sync, provide Supabase credentials:

```bash
cp .env.example .env.local
```

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Optional — provision Supabase

1. Create a project on [supabase.com](https://supabase.com/).
2. Open the SQL Editor and run `supabase/schema.sql` (creates tables + RLS policies).
3. In **Authentication → Providers**, enable **Anonymous Sign-ins** to power the Guest Login flow.

### 5. Run the dev server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### 6. Available scripts

```bash
npm run dev     # Start Next.js in dev mode (Turbopack)
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # Run ESLint 9
npm run test    # Node.js native test runner for algorithmic logic
```

---

## Feature Gallery

All screenshots are captured in dark mode at 2× device pixel ratio and live under [`assets/screenshots/`](./assets/screenshots).

### Landing & Dashboard

| Landing hero | Personal dashboard |
| --- | --- |
| ![Landing](./assets/screenshots/home/landing.png) | ![Dashboard](./assets/screenshots/home/dashboard.png) |

### Curriculum & Roadmap

| Topics catalog | Learning roadmap |
| --- | --- |
| ![Topics](./assets/screenshots/topics/topics-index.png) | ![Roadmap](./assets/screenshots/roadmap/roadmap.png) |

| Big-O lesson | Array lesson |
| --- | --- |
| ![Big-O](./assets/screenshots/topics/topic-big-o.png) | ![Array](./assets/screenshots/topics/topic-array.png) |

| Linked List lesson | Stack lesson | BST lesson |
| --- | --- | --- |
| ![Linked List](./assets/screenshots/topics/topic-linked-list.png) | ![Stack](./assets/screenshots/topics/topic-stack.png) | ![BST](./assets/screenshots/topics/topic-bst.png) |

### Interactive Visualizer Lab

<div align="center">

![Visualizer catalog](./assets/screenshots/visualizer/visualizer-index.png)

</div>

| Bubble Sort | Merge Sort | Quick Sort |
| --- | --- | --- |
| ![Bubble Sort](./assets/screenshots/visualizer/bubble-sort.png) | ![Merge Sort](./assets/screenshots/visualizer/merge-sort.png) | ![Quick Sort](./assets/screenshots/visualizer/quick-sort.png) |

| Binary Search | Linked List | Stack |
| --- | --- | --- |
| ![Binary Search](./assets/screenshots/visualizer/binary-search.png) | ![Linked List Viz](./assets/screenshots/visualizer/linked-list.png) | ![Stack Viz](./assets/screenshots/visualizer/stack.png) |

| Queue | Binary Search Tree | BFS |
| --- | --- | --- |
| ![Queue Viz](./assets/screenshots/visualizer/queue.png) | ![BST Viz](./assets/screenshots/visualizer/binary-search-tree.png) | ![BFS](./assets/screenshots/visualizer/bfs.png) |

<div align="center">

![DFS](./assets/screenshots/visualizer/dfs.png)

</div>

### Problem Arena & Practice

| Problems arena | Problem workspace |
| --- | --- |
| ![Arena](./assets/screenshots/problems/problems-arena.png) | ![Problem workspace](./assets/screenshots/problems/problem-two-sum.png) |

| Practice catalog | Active MCQ quiz |
| --- | --- |
| ![Practice](./assets/screenshots/practice/practice-index.png) | ![Quiz](./assets/screenshots/practice/quiz-array.png) |

### Patterns, Daily & Labs

| Patterns playbook | Daily challenge | Labs |
| --- | --- | --- |
| ![Patterns](./assets/screenshots/patterns/patterns-index.png) | ![Daily](./assets/screenshots/daily/daily-challenge.png) | ![Labs](./assets/screenshots/labs/labs.png) |

### Interview Prep, Bookmarks & About

| Interview prep | Bookmarks | About |
| --- | --- | --- |
| ![Interview](./assets/screenshots/interview/interview-prep.png) | ![Bookmarks](./assets/screenshots/bookmarks/bookmarks.png) | ![About](./assets/screenshots/about/about.png) |

### Authentication & Admin

| Sign in | Register | Forgot password |
| --- | --- | --- |
| ![Login](./assets/screenshots/auth/login.png) | ![Register](./assets/screenshots/auth/register.png) | ![Forgot](./assets/screenshots/auth/forgot-password.png) |

<div align="center">

![Admin CMS](./assets/screenshots/admin/admin.png)

</div>

---

## Testing

DSA House uses Node.js's native test runner to verify the deterministic step functions that drive every visualizer.

```bash
npm run test
```

Add new visualizer specs to `tests/dsa-logic.test.js`.

---

## Regenerating Screenshots

The gallery above is produced by a Playwright script that walks every route of the running dev server:

```bash
# Terminal 1
npm run dev

# Terminal 2
node scripts/capture-screenshots.mjs
```

Outputs are written to `assets/screenshots/<module>/*.png` in 1440×900 @ 2× resolution.

---

## Roadmap & Future Work

- [ ] **In-browser code runner** for the Problem Arena using WebAssembly (Pyodide / QuickJS).
- [ ] **Spaced-repetition mode** — surface weak topics based on quiz history.
- [ ] **Multiplayer duels** — real-time head-to-head problem racing via Supabase Realtime.
- [ ] **AI tutor assistant** — Socratic-style hints powered by an LLM edge function.
- [ ] **Mobile-first PWA** — installable, offline-capable app shell.
- [ ] **Contest mode** — timed problem sets with scoreboard.
- [ ] **Public profiles & leaderboards** — share XP and badges with peers.
- [ ] **Video walkthroughs** attached to each visualizer.
- [ ] **i18n** — Bengali & Hindi translations first, then broader coverage.
- [ ] **CI/CD** — GitHub Actions running lint, tests and Playwright smoke on every PR.

---

## Contributing

Contributions are welcome. Please:

1. Fork the repository and create a feature branch.
2. Follow the existing TypeScript + Tailwind conventions.
3. Run `npm run lint && npm run test` before opening a PR.
4. Include a concise description of the change and, when relevant, an updated screenshot.

---

## License

Released under the [MIT License](./LICENSE).

---

## Author

**Md Tanvir Islam**

- GitHub: [@Tanvir284](https://github.com/Tanvir284)
- Repository: [Tanvir284/Dsa-house](https://github.com/Tanvir284/Dsa-house)

If DSA House helps you land the offer or crush the interview, a ⭐ on the repository goes a long way.
