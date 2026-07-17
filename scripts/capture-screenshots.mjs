/**
 * DSA House — Automated Screenshot Capture
 *
 * Walks every user-facing route of the running dev server and stores
 * high-resolution PNGs in `assets/screenshots/<module>/`.
 *
 * Usage:
 *   npm run dev               # in a separate shell
 *   node scripts/capture-screenshots.mjs
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'assets', 'screenshots');
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

const VIEWPORT = { width: 1440, height: 900 };

/**
 * Route table: [module, file, path, waitAfterMs?]
 * `module` becomes the sub-folder inside assets/screenshots.
 */
const ROUTES = [
  // Core marketing / dashboard surface
  ['home',        'landing',             '/',                 1200],
  ['home',        'dashboard',           '/dashboard',        800],
  ['about',       'about',               '/about',            600],

  // Learning content
  ['topics',      'topics-index',        '/topics',           800],
  ['topics',      'topic-big-o',         '/topics/big-o-notation', 800],
  ['topics',      'topic-array',         '/topics/array',     800],
  ['topics',      'topic-linked-list',   '/topics/linked-list', 800],
  ['topics',      'topic-stack',         '/topics/stack',     800],
  ['topics',      'topic-bst',           '/topics/binary-search-tree', 800],
  ['patterns',    'patterns-index',      '/patterns',         600],
  ['roadmap',     'roadmap',             '/roadmap',          1000],

  // Interactive visualizer lab
  ['visualizer',  'visualizer-index',    '/visualizer',       800],
  ['visualizer',  'bubble-sort',         '/visualizer/bubble-sort', 1200],
  ['visualizer',  'binary-search',       '/visualizer/binary-search', 1200],
  ['visualizer',  'merge-sort',          '/visualizer/merge-sort', 1200],
  ['visualizer',  'quick-sort',          '/visualizer/quick-sort', 1200],
  ['visualizer',  'linked-list',         '/visualizer/linked-list', 1200],
  ['visualizer',  'stack',               '/visualizer/stack', 1200],
  ['visualizer',  'queue',               '/visualizer/queue', 1200],
  ['visualizer',  'binary-search-tree',  '/visualizer/binary-search-tree', 1200],
  ['visualizer',  'bfs',                 '/visualizer/bfs',   1200],
  ['visualizer',  'dfs',                 '/visualizer/dfs',   1200],

  // Practice + problems
  ['practice',    'practice-index',      '/practice',         800],
  ['practice',    'quiz-array',          '/practice/quiz/array', 1000],
  ['problems',    'problems-arena',      '/problems',         800],
  ['problems',    'problem-two-sum',     '/problems/lc-1',    800],

  // Engagement
  ['daily',       'daily-challenge',     '/daily',            800],
  ['labs',        'labs',                '/labs',             600],
  ['interview',   'interview-prep',      '/interview-prep',   600],
  ['bookmarks',   'bookmarks',           '/bookmarks',        600],

  // Auth flows
  ['auth',        'login',               '/auth/login',       600],
  ['auth',        'register',            '/auth/register',    600],
  ['auth',        'forgot-password',     '/auth/forgot-password', 600],

  // Admin
  ['admin',       'admin',               '/admin',            600],
];

/** Sleep helper. */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function capture(page, mod, file, path, waitMs = 600) {
  const url = `${BASE_URL}${path}`;
  const outDir = join(OUT_DIR, mod);
  await ensureDir(outDir);
  const outFile = join(outDir, `${file}.png`);

  process.stdout.write(`  -> ${path} ... `);
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    if (!resp || !resp.ok()) {
      console.log(`skipped (status ${resp ? resp.status() : 'no-response'})`);
      return false;
    }
    // Give the page time to hydrate, animate, and load data
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await sleep(waitMs);
    await page.screenshot({ path: outFile, fullPage: true });
    console.log(`ok`);
    return true;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return false;
  }
}

async function run() {
  await ensureDir(OUT_DIR);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: 'dark',
  });
  const page = await context.newPage();

  // Silence noisy client errors so the log stays readable
  page.on('pageerror', () => {});
  page.on('console', () => {});

  console.log(`Capturing ${ROUTES.length} routes from ${BASE_URL}`);
  let ok = 0;
  for (const [mod, file, path, wait] of ROUTES) {
    const success = await capture(page, mod, file, path, wait);
    if (success) ok += 1;
  }
  console.log(`\nCaptured ${ok}/${ROUTES.length} routes to ${OUT_DIR}`);

  await context.close();
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
