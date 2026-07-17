/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const curriculumDir = path.join(workspaceRoot, 'src', 'data', 'curriculum');
const expandedPath = path.join(workspaceRoot, 'src', 'data', 'curriculum_expanded.json');

function buildMap() {
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
  if (!fs.existsSync(expandedPath)) {
    console.error('Expanded JSON not found at', expandedPath);
    process.exit(2);
  }

  const map = buildMap();
  const raw = fs.readFileSync(expandedPath, 'utf8');
  const data = JSON.parse(raw);

  const updated = data.map(entry => {
    if (!entry || !entry.slug) return entry;
    const canonical = map.get(entry.slug);
    if (canonical && canonical !== entry.id) {
      return { ...entry, id: canonical };
    }
    return entry;
  });

  // Write backup
  const bakPath = expandedPath + '.bak';
  fs.writeFileSync(bakPath, raw, 'utf8');
  fs.writeFileSync(expandedPath, JSON.stringify(updated, null, 2) + '\n', 'utf8');

  console.log('Re-key complete. Backup written to', bakPath);
  // list changed slugs
  const changed = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] && data[i].slug && data[i].id !== updated[i].id) changed.push({ slug: data[i].slug, from: data[i].id, to: updated[i].id });
  }
  if (changed.length === 0) console.log('No ids changed.');
  else {
    console.log('Changed entries:');
    for (const c of changed) console.log('-', c.slug, c.from, '=>', c.to);
  }
}

run();
