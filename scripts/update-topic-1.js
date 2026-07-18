const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/data/curriculum_expanded.json');
const data = JSON.parse(fs.readFileSync(file));

data[0].definition = `Big-O notation describes the upper bound on how an algorithm's running time or space grows as the input size increases, ignoring constants and lower-order terms.

### How to understand Big-O Notation:

* **For a Class 1 student (Age 6-7):**
Imagine you want to count your toys. If you have 5 toys, it takes a little time. If you have 100 toys, it takes a lot of time! Big-O is just a special word computers use to guess: "How much longer will my job take if you give me WAY more toys to count?"

* **For a Class 5 student (Age 10-11):**
Think of reading a book. If reading 1 page takes 1 minute, reading a 100-page book takes 100 minutes. The time grows exactly with the number of pages. We call this $O(N)$. Big-O is a mathematical label we stick on computer programs to show exactly how quickly they slow down when given a huge amount of data.

* **For a University student:**
Big-O notation ($O$) is an asymptotic mathematical notation used to classify algorithms according to how their execution time or space requirements grow as the input size ($N$) approaches infinity. It specifically describes the worst-case scenario (the upper bound) while abstracting away hardware-specific constants and non-dominant terms to focus strictly on the growth rate.`;

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully updated topic 1');
