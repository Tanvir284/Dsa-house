import { chromium } from 'playwright';
import path from 'node:path';

process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(
  process.cwd(),
  '.playwright-browsers',
);

/**
 * Smoke test: open the Two Sum problem, run the default Python solution
 * against the built-in test cases, and assert every case passes.
 * Also runs the JS solution to confirm both backends are wired.
 */
const BASE = process.env.RUNNER_URL ?? 'http://localhost:3000';

async function runOne(page, langLabel) {
  await page.getByRole('button', { name: 'Run Code' }).click();
  await page.getByRole('button', { name: langLabel, exact: true }).click();
  await page.getByRole('button', { name: /Run tests/ }).click();

  // Wait for status to leave "Preparing" and settle on a terminal state.
  await page.waitForFunction(
    () => {
      const el = document.querySelector('.ml-auto.text-xs.text-white\\/60');
      return el && /passed|failed|error/i.test(el.textContent ?? '');
    },
    { timeout: 60_000 },
  );

  const statusText = await page
    .locator('.ml-auto.text-xs.text-white\\/60')
    .first()
    .innerText();
  const passedBadge = await page
    .locator('span.rounded-full.bg-white\\/10')
    .first()
    .innerText()
    .catch(() => '');
  return { statusText, passedBadge };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  page.on('pageerror', (err) => console.error('[pageerror]', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('[console.error]', msg.text());
  });

  await page.goto(`${BASE}/problems/lc-1`, { waitUntil: 'networkidle' });

  const py = await runOne(page, 'Python');
  console.log(`Python  -> status="${py.statusText}" badge="${py.passedBadge}"`);

  const js = await runOne(page, 'JavaScript');
  console.log(`JavaScr -> status="${js.statusText}" badge="${js.passedBadge}"`);

  const okPy = /passed|4\/4/i.test(py.passedBadge) || /passed/i.test(py.statusText);
  const okJs = /passed|4\/4/i.test(js.passedBadge) || /passed/i.test(js.statusText);

  await browser.close();

  if (!okPy || !okJs) {
    console.error('Runner smoke test FAILED');
    process.exit(1);
  }
  console.log('Runner smoke test OK');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
