/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const curriculumDir = path.join(workspaceRoot, 'src', 'data', 'curriculum');
const expandedPath = path.join(workspaceRoot, 'src', 'data', 'curriculum_expanded.json');

function buildCanonicalSlugs() {
  const files = fs.readdirSync(curriculumDir).filter(f => f.endsWith('.ts'));
  const map = new Map();
  for (const file of files) {
    const content = fs.readFileSync(path.join(curriculumDir, file), 'utf8');
    const blockRegex = /export const\s+(\w+Topic)\s*:\s*Topic\s*=\s*\{([\s\S]*?)\n\};/g;
    let match;
    while ((match = blockRegex.exec(content)) !== null) {
      const block = match[2];
      const idMatch = /id:\s*'([^']+)'/.exec(block);
      const slugMatch = /slug:\s*'([^']+)'/.exec(block);
      if (idMatch && slugMatch) {
        const id = idMatch[1];
        const slug = slugMatch[1];
        map.set(slug, id);
      }
    }
  }
  return map;
}

function run() {
  const expanded = JSON.parse(fs.readFileSync(expandedPath, 'utf8'));
  const canonical = buildCanonicalSlugs();

  const results = expanded.map((t) => {
    const hasCanonical = canonical.has(t.slug);
    return { slug: t.slug, title: t.title, id: t.id, canonical: hasCanonical, canonicalId: canonical.get(t.slug) || null };
  });

  const total = results.length;
  const canonicalCount = results.filter(r => r.canonical).length;
  const placeholderCount = total - canonicalCount;

  console.log(`Topics total: ${total}`);
  console.log(`Canonical matches: ${canonicalCount}`);
  console.log(`Will use placeholders for: ${placeholderCount}`);
  console.log('\nSample list:');
  for (const r of results) {
    console.log(`- ${r.slug} : ${r.canonical ? 'canonical' : 'placeholder'}${r.canonical ? ` (canonical id ${r.canonicalId})` : ''}`);
  }
}

run();
