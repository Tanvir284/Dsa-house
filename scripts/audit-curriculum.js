const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../src/data/curriculum_expanded.json');
const data = require(curriculumPath);

let issuesFound = 0;

console.log('--- STARTING FACTUAL AUDIT ---');
console.log(`Auditing ${data.length} topics...\n`);

data.forEach((topic) => {
  const issues = [];

  // Check definition length
  if (topic.definition.length < 30) {
    issues.push(`Definition is suspiciously short (${topic.definition.length} chars).`);
  }

  // Check Big-O notation validity
  const complexities = {
    'Best Time': topic.time_complexity_best,
    'Average Time': topic.time_complexity_average,
    'Worst Time': topic.time_complexity_worst,
    'Space': topic.space_complexity,
  };

  for (const [key, val] of Object.entries(complexities)) {
    if (!val.includes('O(')) {
      issues.push(`${key} missing 'O(' notation: "${val}"`);
    } else {
        const oMatch = val.match(/O\([^)]+\)/);
        if (!oMatch) {
            issues.push(`${key} has malformed Big-O syntax: "${val}"`);
        }
    }
  }

  // Sample factual sanity checks for well-known algorithms
  if (topic.title === 'Bubble Sort' && !topic.time_complexity_worst.includes('N^2')) {
      issues.push(`Bubble Sort worst time should be O(N^2), found: ${topic.time_complexity_worst}`);
  }
  if (topic.title === 'Merge Sort' && !topic.time_complexity_worst.includes('N log N')) {
      issues.push(`Merge Sort worst time should be O(N log N), found: ${topic.time_complexity_worst}`);
  }
  if (topic.title === 'Binary Search' && !topic.time_complexity_worst.includes('log N')) {
      issues.push(`Binary Search worst time should be O(log N), found: ${topic.time_complexity_worst}`);
  }

  if (issues.length > 0) {
    issuesFound++;
    console.log(`[!] Topic: ${topic.title} (${topic.slug})`);
    issues.forEach(i => console.log(`    - ${i}`));
  }
});

console.log('\n--- AUDIT COMPLETE ---');
if (issuesFound === 0) {
  console.log('✅ All topics passed factual sanity checks! Big-O notations are properly formatted and descriptions look complete.');
} else {
  console.log(`❌ Found potential issues in ${issuesFound} topics.`);
}
