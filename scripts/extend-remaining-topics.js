const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/data/curriculum_expanded.json');
const data = JSON.parse(fs.readFileSync(file));

function getTemplate(topic) {
  const t = topic.title;
  const def = topic.definition;
  const tc = topic.time_complexity_average || 'O(N)';
  const sc = topic.space_complexity || 'O(N)';
  const cat = topic.category_id; // we can use this to specialize

  // If it's already been updated (has extended_overview), skip it
  if (topic.extended_overview) return topic.extended_overview;

  let class1 = `Imagine you have a big box of toys and you want to organize them. ${t} is like a special magic trick that helps computers organize or find information incredibly fast! Instead of taking forever to sort through everything one by one, a computer uses this trick to finish the job before you can even blink.`;
  
  let class5 = `When a computer has to process millions of pieces of data—like all the players in a video game—it needs a smart plan. ${t} is exactly that: a smart, step-by-step strategy. It takes a big, messy problem and uses logic to solve it efficiently so the computer doesn't freeze or slow down.`;
  
  let uni = `${t} is a fundamental concept in computer science. ${def} Proper implementation and understanding of this topic are critical for writing optimal, scalable software that minimizes both time complexity (${tc}) and space complexity (${sc}) under heavy computational loads.`;

  // Make it slightly more specific based on title keywords
  const titleLower = t.toLowerCase();
  if (titleLower.includes('sort')) {
    class1 = `Imagine your teacher asks you to line up your entire class from shortest to tallest. ${t} is like a secret rulebook that tells computers exactly how to move everyone into the perfect order as quickly as possible!`;
    class5 = `Sorting things out, like putting a messy deck of cards back in order, can be slow. ${t} is a clever algorithm that computers use to automatically sort millions of numbers in a fraction of a second.`;
  } else if (titleLower.includes('search')) {
    class1 = `Imagine losing your favorite toy in a huge messy room. Instead of crying, you use a super-powered magnifying glass! ${t} is how computers quickly hunt down exactly what they are looking for in a giant pile of information.`;
    class5 = `If you have to find a specific word in a dictionary, you don't read every single page. You flip to the middle! ${t} gives computers similar smart strategies to quickly track down a specific piece of data among millions of records.`;
  } else if (titleLower.includes('tree') || titleLower.includes('graph')) {
    class1 = `Imagine drawing a family tree with you, your parents, and your grandparents. ${t} is how computers draw massive maps and connections between things, so they can figure out who is related to who!`;
    class5 = `Think of Google Maps figuring out the fastest way to get to the mall. It uses networks of roads. ${t} is the way computers map out complicated connections and paths to quickly navigate through huge webs of data.`;
  } else if (titleLower.includes('array') || titleLower.includes('list')) {
    class1 = `Imagine a long row of cubbies at school where everyone puts their backpack. ${t} is how computers organize their information in a neat row so they can always find exactly what they need!`;
    class5 = `When a computer needs to remember a sequence of things, like your high scores in a game, it uses a list. ${t} helps the computer easily add, remove, and read those items without getting confused.`;
  }

  return `### How to understand ${t}:\n\n* **For a Class 1 student (Age 6-7):**\n${class1}\n\n* **For a Class 5 student (Age 10-11):**\n${class5}\n\n* **For a University student:**\n${uni}`;
}

let updated = 0;
for (let i = 7; i < data.length; i++) {
  if (!data[i].extended_overview) {
    data[i].extended_overview = getTemplate(data[i]);
    updated++;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log(`Successfully extended ${updated} topics`);
