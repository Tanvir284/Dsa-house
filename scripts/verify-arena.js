const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

function main() {
  const arena = JSON.parse(fs.readFileSync(ARENA_PATH, 'utf-8'));
  console.log(`Total problems: ${arena.length}`);

  const ids = new Set();
  const duplicateIds = [];
  const withDiagram = [];
  const missingFields = [];

  for (let i = 0; i < arena.length; i++) {
    const p = arena[i];
    if (!p.id) {
      missingFields.push(`Index ${i} lacks id`);
    } else {
      if (ids.has(p.id)) {
        duplicateIds.push(p.id);
      }
      ids.add(p.id);
    }

    if (p.diagram !== undefined) {
      withDiagram.push(p.id || `Index ${i}`);
    }

    // Check basic fields
    const required = ['id', 'slug', 'title', 'difficulty', 'source', 'category', 'topic', 'description', 'constraints', 'solutions'];
    for (const f of required) {
      if (p[f] === undefined) {
        missingFields.push(`${p.id || `Index ${i}`} lacks field ${f}`);
      }
    }

    if (p.solutions) {
      const solRequired = ['python', 'cpp', 'java', 'explanation'];
      for (const sf of solRequired) {
        if (p.solutions[sf] === undefined) {
          missingFields.push(`${p.id || `Index ${i}`} solutions lacks field ${sf}`);
        }
      }
    }
  }

  if (duplicateIds.length > 0) {
    console.error('Duplicate IDs found:', duplicateIds);
  } else {
    console.log('No duplicate IDs found.');
  }

  if (withDiagram.length > 0) {
    console.error('Problems with diagram field found:', withDiagram);
  } else {
    console.log('No diagram fields found.');
  }

  if (missingFields.length > 0) {
    console.error('Missing fields found:', missingFields);
  } else {
    console.log('All fields checked successfully.');
  }
}

main();
