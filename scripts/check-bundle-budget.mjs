#!/usr/bin/env node
/**
 * Bundle-size budget check.
 *
 * Run after `next build`. Fails with a non-zero exit code when the shipped
 * JavaScript grows past the agreed ceiling, so a regression is caught in CI
 * rather than discovered by a user on a slow connection.
 *
 * The budgets below are deliberately close to current reality — a budget with
 * generous headroom silently permits exactly the drift it exists to prevent.
 * Raise them consciously, in a commit that explains what earned the increase.
 */
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const CHUNKS_DIR = join(process.cwd(), '.next', 'static', 'chunks');

const BUDGETS = {
  /** Every JS chunk the client could download, summed. */
  totalKB: 4800,
  /** No single chunk should dominate the graph. */
  largestChunkKB: 1300,
};

async function collectJsFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collectJsFiles(path)));
    } else if (entry.name.endsWith('.js')) {
      found.push({ path, size: (await stat(path)).size });
    }
  }
  return found;
}

function kb(bytes) {
  return Math.round(bytes / 1024);
}

if (!existsSync(CHUNKS_DIR)) {
  console.error(`No build output at ${CHUNKS_DIR}. Run \`npm run build\` first.`);
  process.exit(1);
}

const files = await collectJsFiles(CHUNKS_DIR);
files.sort((a, b) => b.size - a.size);

const totalKB = kb(files.reduce((sum, f) => sum + f.size, 0));
const largestKB = kb(files[0]?.size ?? 0);

console.log(`\nBundle report — ${files.length} chunks, ${totalKB} KB total\n`);
console.log('  Largest chunks:');
for (const file of files.slice(0, 8)) {
  console.log(`    ${String(kb(file.size)).padStart(6)} KB  ${file.path.split(/[\\/]/).pop()}`);
}

const failures = [];
if (totalKB > BUDGETS.totalKB) {
  failures.push(`total JS ${totalKB} KB exceeds budget of ${BUDGETS.totalKB} KB`);
}
if (largestKB > BUDGETS.largestChunkKB) {
  failures.push(`largest chunk ${largestKB} KB exceeds budget of ${BUDGETS.largestChunkKB} KB`);
}

console.log(
  `\n  total   ${totalKB} / ${BUDGETS.totalKB} KB` +
    `\n  largest ${largestKB} / ${BUDGETS.largestChunkKB} KB\n`,
);

if (failures.length > 0) {
  console.error('Bundle budget exceeded:');
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error('\nEither reduce the payload or raise the budget deliberately.\n');
  process.exit(1);
}

console.log('Bundle budget OK.\n');
