const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/data/curriculum_expanded.json');
const data = JSON.parse(fs.readFileSync(file));

for (let i = 0; i < 7; i++) {
  const fullText = data[i].definition;
  const parts = fullText.split('\n\n');
  if (parts.length > 1) {
    data[i].definition = parts[0];
    data[i].extended_overview = parts.slice(1).join('\n\n');
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully fixed topics 1-7');
