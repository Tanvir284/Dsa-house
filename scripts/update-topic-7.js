const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/data/curriculum_expanded.json');
const data = JSON.parse(fs.readFileSync(file));

data[6].definition = `Bit masking represents a subset of items as the bits of an integer, allowing subsets to be enumerated and combined with bitwise operations.

### How to understand Bit Masking:

* **For a Class 1 student (Age 6-7):**
Imagine you have a treasure box with 4 different toys. If you want to remember exactly which toys you played with today, you could write a long list. But with Bit Masking, you just use 4 tiny light switches! If you played with toy #1, you turn on switch #1. It's a secret, fast way for computers to remember exactly what things you picked out of a group.

* **For a Class 5 student (Age 10-11):**
Think of a pizza menu where you can choose any toppings: Pepperoni, Mushrooms, Onions, and Sausage. Instead of writing "I want Pepperoni and Onions," a computer just uses a number like \`1010\` (which means Yes, No, Yes, No). Bit masking is using a single binary number as a checklist. It compresses a big list of "Yes/No" answers into just one tiny number!

* **For a University student:**
Bit masking is a technique used to compactly represent subsets of a finite set (usually of size $N \le 32$ or $64$) as the individual bits of a single integer. Each $i$-th bit indicates the presence (1) or absence (0) of the $i$-th element. This state compression is the foundation of Bitmask Dynamic Programming, allowing algorithmic state-spaces (like the Traveling Salesperson Problem) to be indexed directly in arrays and transitions to be computed using $O(1)$ bitwise operations.`;

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully updated topic 7');
