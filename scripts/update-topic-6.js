const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/data/curriculum_expanded.json');
const data = JSON.parse(fs.readFileSync(file));

data[5].definition = `Bit manipulation uses bitwise operators to read, set, and toggle individual bits of integers for compact, fast computation.

### How to understand Bit Manipulation:

* **For a Class 1 student (Age 6-7):**
Imagine a row of tiny light switches. Each switch can only be ON (1) or OFF (0). Computers don't use words or numbers like we do; they only see these tiny light switches! Bit manipulation is like learning a secret code to quickly flip these switches on and off to solve puzzles incredibly fast.

* **For a Class 5 student (Age 10-11):**
At the very deepest level of a computer, everything is just 1s and 0s (called bits). Instead of doing normal math like 5 + 3, bit manipulation lets you talk directly to the computer in its own language. You can shift the 1s and 0s around to do things like multiplication, division, and checking rules much faster than normal math!

* **For a University student:**
Bit manipulation is the algorithmic act of operating on data at the level of individual bits using bitwise operators (AND, OR, XOR, NOT, shifts). Because these operations are directly mapped to CPU instructions, they execute in single clock cycles. This makes bit manipulation a powerful tool for optimizing critical code paths, compressing data representations into bitmasks, and performing high-speed cryptographic or systems-level calculations.`;

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully updated topic 6');
