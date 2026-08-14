/**
 * One-off: capture visualizer pages mid-algorithm (not idle at frame 0) so
 * the tracer's colour-coded cell states are actually visible in the shot.
 * Not part of the regular capture-screenshots.mjs route table because it
 * needs interaction (clicking "Next step" N times) that the generic
 * goto-and-screenshot flow doesn't do.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'assets', 'screenshots', 'visualizer');
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

const TARGETS = [
  { slug: 'binary-search', clicks: 3 },
  { slug: 'quick-sort', clicks: 6 },
  { slug: 'merge-sort', clicks: 10 },
  { slug: 'bfs', clicks: 5 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'dark',
  });
  const page = await context.newPage();
  page.on('pageerror', () => {});
  page.on('console', () => {});

  for (const { slug, clicks } of TARGETS) {
    const url = `${BASE_URL}/visualizer/${slug}`;
    process.stdout.write(`-> ${url} (${clicks} steps) ... `);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await sleep(800);

    const next = page.getByLabel('Next step');
    for (let i = 0; i < clicks; i++) {
      if (await next.isDisabled().catch(() => true)) break;
      await next.click();
      await sleep(250);
    }
    await sleep(400);

    // Full page this time — figure out exactly where the arena lands, then
    // crop precisely once we can see it.
    await page.screenshot({ path: join(OUT_DIR, `${slug}.png`), fullPage: true });
    console.log('ok');
  }

  await context.close();
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
