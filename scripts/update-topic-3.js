const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/data/curriculum_expanded.json');
const data = JSON.parse(fs.readFileSync(file));

data[2].definition = `Time complexity expresses how the number of basic operations an algorithm performs scales with the size of its input.

### How to understand Time Complexity:

* **For a Class 1 student (Age 6-7):**
Imagine you have to eat 5 grapes. It takes a short time. If you have to eat 100 grapes, it takes a long time! Time complexity is just how computers ask: "How much longer will it take me to finish eating if you give me way more grapes?"

* **For a Class 5 student (Age 10-11):**
Think about chores. If it takes you 1 minute to clean 1 window, cleaning 10 windows will take 10 minutes. The time goes up exactly as the number of windows goes up! In computers, time complexity is how we figure out if a program will take 1 second or 100 years to finish when we give it a massive amount of homework.

* **For a University student:**
Time complexity refers to the computational complexity that describes the amount of computer time it takes to run an algorithm. It is typically expressed using Big-O notation, which excludes coefficients and lower-order terms to focus on the asymptotic behavior of the algorithm as the input size ($N$) approaches infinity. Analyzing time complexity is essential for identifying performance bottlenecks in software systems.`;

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully updated topic 3');
