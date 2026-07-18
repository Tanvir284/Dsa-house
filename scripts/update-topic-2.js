const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/data/curriculum_expanded.json');
const data = JSON.parse(fs.readFileSync(file));

data[1].definition = `Space complexity measures the total amount of memory an algorithm needs relative to its input size, including auxiliary space and recursion stack.

### How to understand Space Complexity:

* **For a Class 1 student (Age 6-7):**
Imagine you are drawing a big picture. If you draw one tree, you only need a little piece of paper. If you want to draw a whole forest with 100 trees, you need a giant piece of paper! Space complexity is just how computers ask: "How much paper (memory) do I need to finish this drawing?"

* **For a Class 5 student (Age 10-11):**
Think of your backpack. If you only need to carry a pencil, a small pocket is enough. If you have to carry 10 heavy textbooks, you need a huge, strong backpack. In a computer, memory is the backpack. Space complexity is how we figure out exactly how big the backpack needs to be to hold all the data without ripping.

* **For a University student:**
Space complexity refers to the total peak amount of memory (RAM) an algorithm consumes during its execution as a function of the input size ($N$). It consists of both the space required to store the input data itself, and the auxiliary space (extra variables, temporary structures, and the call stack during recursion). Minimizing space complexity is crucial in resource-constrained environments or when scaling algorithms to process massive datasets.`;

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully updated topic 2');
