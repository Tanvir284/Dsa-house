const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/data/curriculum_expanded.json');
const data = JSON.parse(fs.readFileSync(file));

data[4].definition = `The Master Theorem provides a formula to solve recurrence relations of the form T(n) = aT(n/b) + f(n) that arise from divide-and-conquer algorithms.

### How to understand the Master Theorem:

* **For a Class 1 student (Age 6-7):**
Imagine you have a giant pile of LEGOs to sort. You ask your friends to help, and they ask their friends! The Master Theorem is a magic rule that tells you exactly how fast all of you will finish sorting the LEGOs based on how many friends you called and how fast you split the piles.

* **For a Class 5 student (Age 10-11):**
When a computer solves a big problem by chopping it into smaller halves over and over, we need to know how long it will take. We could do lots of hard math to figure it out, but instead, we use a "cheat code" formula. The Master Theorem is that cheat code! You just plug in how many pieces you chopped the problem into, and it instantly tells you the speed of the program.

* **For a University student:**
The Master Theorem is a direct method for determining the asymptotic bound (Big-O, Big-Theta, Big-Omega) of recurrence relations that occur in divide-and-conquer algorithms. Given a recurrence of the form $T(N) = aT(N/b) + f(N)$, the theorem compares the work done splitting/combining the subproblems ($f(N)$) against the work done in the recursive leaves ($N^{\\log_b(a)}$) to deterministically output the overall time complexity without requiring a recursive tree proof.`;

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully updated topic 5');
