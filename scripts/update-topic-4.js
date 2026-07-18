const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/data/curriculum_expanded.json');
const data = JSON.parse(fs.readFileSync(file));

data[3].definition = `Recursion solves a problem by having a function call itself on smaller inputs; backtracking extends this by undoing choices that fail to reach a valid solution.

### How to understand Recursion & Backtracking:

* **For a Class 1 student (Age 6-7):**
Imagine you are lost in a maze. You try walking down one path. Oops, a dead end! You walk backward to where you started and try a different path. You keep doing this over and over until you find the exit! Recursion is doing the same thing over and over. Backtracking is saying "Oops, wrong way, let's step backward and try again!"

* **For a Class 5 student (Age 10-11):**
Recursion is like looking in a mirror that is facing another mirror—you see smaller and smaller reflections going on forever. In computers, it's a program that asks *itself* for help, but with a slightly smaller problem each time. Backtracking is like solving a hard puzzle: if you put a piece in the wrong spot, you don't throw the puzzle away; you take that piece out (backtrack) and try another one until it fits.

* **For a University student:**
Recursion is a programming paradigm where a function calls itself iteratively, progressively breaking a complex problem down into atomic base cases. The call stack maintains the state of each recursive invocation. Backtracking is an algorithmic-technique for solving constraint satisfaction problems incrementally; it dynamically explores a state-space tree and immediately abandons (prunes) paths when it determines they cannot possibly yield a valid solution, retreating to the previous state to explore alternate branches.`;

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully updated topic 4');
