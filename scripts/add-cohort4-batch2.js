const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const BATCH = [
  {
    id: 'lc-231',
    slug: 'power-of-two',
    title: 'Power of Two',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`. An integer `n` is a power of two if there exists an integer `x` such that `n == 2^x`.',
    constraints: ['-2^31 <= n <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0`,
      cpp: `class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && (n & ((long long)n - 1)) == 0;
    }
};`,
      java: `class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & ((long)n - 1)) == 0;
    }
}`,
      explanation: 'A power of two in binary representation has exactly one set bit. The bitwise operation n & (n - 1) clears the lowest set bit. If the result is 0 and n > 0, n is a power of two. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-326',
    slug: 'power-of-three',
    title: 'Power of Three',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an integer `n`, return `true` if it is a power of three. Otherwise, return `false`.',
    constraints: ['-2^31 <= n <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        # 1162261467 is 3^19, the largest power of 3 that fits in a 32-bit signed integer
        return n > 0 and 1162261467 % n == 0`,
      cpp: `class Solution {
public:
    bool isPowerOfThree(int n) {
        return n > 0 && 1162261467 % n == 0;
    }
};`,
      java: `class Solution {
    public boolean isPowerOfThree(int n) {
        return n > 0 && 1162261467 % n == 0;
    }
}`,
      explanation: 'Since 3 is a prime number, the only divisors of 3^19 are lower powers of 3. If n > 0 and divides 3^19 without remainder, it must be a power of 3. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-342',
    slug: 'power-of-four',
    title: 'Power of Four',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given an integer `n`, return `true` if it is a power of four. Otherwise, return `false`.',
    constraints: ['-2^31 <= n <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        # A power of 4 must be a power of 2, and its single set bit must be at an odd position.
        # Hex mask 0x55555555 has bits set at all odd positions (1, 3, 5, etc.)
        return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0`,
      cpp: `class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && (n & ((long long)n - 1)) == 0 && (n & 0x55555555) != 0;
    }
};`,
      java: `class Solution {
    public boolean isPowerOfFour(int n) {
        return n > 0 && (n & ((long)n - 1)) == 0 && (n & 0x55555555) != 0;
    }
}`,
      explanation: 'A power of four is a power of two where the single set bit is at an odd bit position (1st, 3rd, 5th, etc.). The hex mask 0x55555555 validates odd positions. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-258',
    slug: 'add-digits',
    title: 'Add Digits',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an integer `n`, repeatedly add all its digits until the result has only one digit, and return it.',
    constraints: ['0 <= n <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def addDigits(self, num: int) -> int:
        if num == 0: return 0
        return 1 + (num - 1) % 9`,
      cpp: `class Solution {
public:
    int addDigits(int num) {
        if (num == 0) return 0;
        return 1 + (num - 1) % 9;
    }
};`,
      java: `class Solution {
    public int addDigits(int num) {
        if (num == 0) return 0;
        return 1 + (num - 1) % 9;
    }
}`,
      explanation: 'This problem can be solved in constant time using the Digital Root formula. The digital root of a number in base 10 is its remainder when divided by 9 (returning 9 instead of 0 for non-zero multiples of 9). Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-292',
    slug: 'nim-game',
    title: 'Nim Game',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are playing Nim Game. There is a heap of stones. You and your friend take turns to remove 1 to 3 stones. The one who removes the last stone wins. Decide if you can win given `n` stones.',
    constraints: ['1 <= n <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def canWinNim(self, n: int) -> bool:
        return n % 4 != 0`,
      cpp: `class Solution {
public:
    bool canWinNim(int n) {
        return n % 4 != 0;
    }
};`,
      java: `class Solution {
    public boolean canWinNim(int n) {
        return n % 4 != 0;
    }
}`,
      explanation: 'If the number of stones is a multiple of 4, the second player can always mirror your moves to make the remainder a multiple of 4, ensuring they win. If not, you can win by making the remaining stones a multiple of 4. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-389',
    slug: 'find-the-difference',
    title: 'Find the Difference',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'You are given two strings `s` and `t`. String `t` is generated by random shuffling string `s` and then adding one more letter at a random position. Return the letter that was added.',
    constraints: ['0 <= s.length <= 1000', 't.length == s.length + 1', 's and t consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        xor = 0
        for c in s: xor ^= ord(c)
        for c in t: xor ^= ord(c)
        return chr(xor)`,
      cpp: `class Solution {
public:
    char findTheDifference(string s, string t) {
        char xor_sum = 0;
        for (char c : s) xor_sum ^= c;
        for (char c : t) xor_sum ^= c;
        return xor_sum;
    }
};`,
      java: `class Solution {
    public char findTheDifference(String s, String t) {
        char xor = 0;
        for (char c : s.toCharArray()) xor ^= c;
        for (char c : t.toCharArray()) xor ^= c;
        return xor;
    }
}`,
      explanation: 'XOR all character values of both strings s and t. Duplicate characters cancel out, leaving the single added character. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-401',
    slug: 'binary-watch',
    title: 'Binary Watch',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Given an integer `turnedOn` which represents the number of LEDs that are currently on, return all possible times the watch could represent. You may return the answer in **any order**.',
    constraints: ['0 <= turnedOn <= 10'],
    solutions: {
      python: `class Solution:
    def readBinaryWatch(self, turnedOn: int) -> List[str]:
        res = []
        for h in range(12):
            for m in range(60):
                if (bin(h).count('1') + bin(m).count('1')) == turnedOn:
                    res.append(f"{h}:{m:02d}")
        return res`,
      cpp: `class Solution {
public:
    vector<string> readBinaryWatch(int turnedOn) {
        vector<string> res;
        for (int h = 0; h < 12; ++h) {
            for (int m = 0; m < 60; ++m) {
                if (__builtin_popcount(h) + __builtin_popcount(m) == turnedOn) {
                    res.push_back(to_string(h) + (m < 10 ? ":0" : ":") + to_string(m));
                }
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<String> readBinaryWatch(int turnedOn) {
        List<String> res = new ArrayList<>();
        for (int h = 0; h < 12; h++) {
            for (int m = 0; m < 60; m++) {
                if (Integer.bitCount(h) + Integer.bitCount(m) == turnedOn) {
                    res.add(h + (m < 10 ? ":0" : ":") + m);
                }
            }
        }
        return res;
    }
}`,
      explanation: 'Loop through all possible hour (0-11) and minute (0-59) configurations. Count the set bits in both values. If their sum equals turnedOn, add to the results. Time complexity: O(1) (fixed loop size of 12 * 60 = 720 iterations), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-405',
    slug: 'convert-a-number-to-hexadecimal',
    title: 'Convert a Number to Hexadecimal',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given an integer `num`, return a string representing its hexadecimal representation. For negative integers, two’s complement method is used.',
    constraints: ['-2^31 <= num <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def toHex(self, num: int) -> str:
        if num == 0: return "0"
        hex_map = "0123456789abcdef"
        if num < 0: num += 2**32
        res = []
        while num > 0:
            res.append(hex_map[num & 15])
            num >>= 4
        return "".join(reversed(res))`,
      cpp: `class Solution {
public:
    string toHex(int num) {
        if (num == 0) return "0";
        string hexMap = "0123456789abcdef";
        unsigned int n = num;
        string res = "";
        while (n > 0) {
            res += hexMap[n & 15];
            n >>= 4;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`,
      java: `class Solution {
    public String toHex(int num) {
        if (num == 0) return "0";
        char[] hexMap = "0123456789abcdef".toCharArray();
        long n = num;
        if (n < 0) n += 4294967296L; // 2^32
        StringBuilder sb = new StringBuilder();
        while (n > 0) {
            sb.append(hexMap[(int)(n & 15)]);
            n >>= 4;
        }
        return sb.reverse().toString();
    }
}`,
      explanation: 'Convert to hexadecimal by examining groups of 4 bits from right to left using the mask n & 15. Shift n right by 4 bits in each step. Handle negative numbers by converting to unsigned 32-bit values. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-415',
    slug: 'add-strings',
    title: 'Add Strings',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two non-negative integers, `num1` and `num2` represented as string, return the sum of `num1` and `num2` as a string.',
    constraints: ['1 <= num1.length, num2.length <= 10^4', 'num1 and num2 consist of only digits.', 'num1 and num2 don\'t contain any leading zero except 0 itself.'],
    solutions: {
      python: `class Solution:
    def addStrings(self, num1: str, num2: str) -> str:
        i, j = len(num1) - 1, len(num2) - 1
        carry = 0
        res = []
        while i >= 0 or j >= 0 or carry:
            d1 = int(num1[i]) if i >= 0 else 0
            d2 = int(num2[j]) if j >= 0 else 0
            val = d1 + d2 + carry
            carry = val // 10
            res.append(str(val % 10))
            i -= 1
            j -= 1
        return "".join(reversed(res))`,
      cpp: `class Solution {
public:
    string addStrings(string num1, string num2) {
        int i = num1.size() - 1, j = num2.size() - 1, carry = 0;
        string res = "";
        while (i >= 0 || j >= 0 || carry) {
            int d1 = (i >= 0) ? (num1[i--] - '0') : 0;
            int d2 = (j >= 0) ? (num2[j--] - '0') : 0;
            int val = d1 + d2 + carry;
            carry = val / 10;
            res += to_string(val % 10);
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`,
      java: `class Solution {
    public String addStrings(String num1, String num2) {
        int i = num1.length() - 1, j = num2.length() - 1, carry = 0;
        StringBuilder sb = new StringBuilder();
        while (i >= 0 || j >= 0 || carry > 0) {
            int d1 = (i >= 0) ? (num1.charAt(i--) - '0') : 0;
            int d2 = (j >= 0) ? (num2.charAt(j--) - '0') : 0;
            int val = d1 + d2 + carry;
            carry = val / 10;
            sb.append(val % 10);
        }
        return sb.reverse().toString();
    }
}`,
      explanation: 'Simulate digit addition from right to left, carrying forward values. Loop until both pointers are exhausted and there is no carry left. Time complexity: O(max(n, m)), Space complexity: O(max(n, m)).'
    }
  },
  {
    id: 'lc-441',
    slug: 'arranging-coins',
    title: 'Arranging Coins',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'You have `n` coins and you want to build a staircase where the `i`-th row has exactly `i` coins. Return the number of complete rows of the staircase you can build.',
    constraints: ['1 <= n <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def arrangeCoins(self, n: int) -> int:
        # Using quadratic formula: k * (k + 1) / 2 <= n => k^2 + k - 2n <= 0
        return int((2 * n + 0.25)**0.5 - 0.5)`,
      cpp: `class Solution {
public:
    int arrangeCoins(int n) {
        return (int)(sqrt(2.0 * n + 0.25) - 0.5);
    }
};`,
      java: `class Solution {
    public int arrangeCoins(int n) {
        return (int) (Math.sqrt(2.0 * n + 0.25) - 0.5);
    }
}`,
      explanation: 'Solve the quadratic inequality k * (k + 1) / 2 <= n for k. Rearranging terms yields k <= sqrt(2n + 1/4) - 1/2. Round down the result. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-455',
    slug: 'assign-cookies',
    title: 'Assign Cookies',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie. Find the maximum number of children you can satisfy.',
    constraints: ['1 <= g.length, s.length <= 3 * 10^4', '1 <= g[i], s[j] <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        g.sort()
        s.sort()
        i = j = 0
        while i < len(g) and j < len(s):
            if s[j] >= g[i]:
                i += 1
            j += 1
        return i`,
      cpp: `class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());
        int i = 0, j = 0;
        while (i < g.size() && j < s.size()) {
            if (s[j] >= g[i]) i++;
            j++;
        }
        return i;
    }
};`,
      java: `class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);
        int i = 0, j = 0;
        while (i < g.length && j < s.length) {
            if (s[j] >= g[i]) i++;
            j++;
        }
        return i;
    }
}`,
      explanation: 'Greedy approach: sort both children greed factor array g and cookie size array s. Attempt to satisfy the child with the smallest greed factor using the smallest available cookie that is large enough. Time complexity: O(n log n + m log m), Space complexity: O(log n + log m) for sorting.'
    }
  },
  {
    id: 'lc-461',
    slug: 'hamming-distance',
    title: 'Hamming Distance',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given two integers `x` and `y`, return the Hamming distance.',
    constraints: ['0 <= x, y <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def hammingDistance(self, x: int, y: int) -> int:
        xor = x ^ y
        count = 0
        while xor:
            xor &= (xor - 1)
            count += 1
        return count`,
      cpp: `class Solution {
public:
    int hammingDistance(int x, int y) {
        return __builtin_popcount(x ^ y);
    }
};`,
      java: `class Solution {
    public int hammingDistance(int x, int y) {
        return Integer.bitCount(x ^ y);
    }
}`,
      explanation: 'XOR the two numbers x and y to produce a number whose set bits represent positions where x and y differ. Count the set bits (using bitCount or popcount). Time complexity: O(1) (at most 32 bits), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-463',
    slug: 'island-perimeter',
    title: 'Island Perimeter',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'You are given `row x col` `grid` representing a map where `1` represents land and `0` represents water. Find the perimeter of the island.',
    constraints: ['row == grid.length', 'col == grid[i].length', '1 <= row, col <= 100', 'grid[i][j] is 0 or 1.', 'There is exactly one island.'],
    solutions: {
      python: `class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        perimeter = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    perimeter += 4
                    if r > 0 and grid[r - 1][c] == 1: perimeter -= 2
                    if c > 0 and grid[r][c - 1] == 1: perimeter -= 2
        return perimeter`,
      cpp: `class Solution {
public:
    int islandPerimeter(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), perimeter = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 1) {
                    perimeter += 4;
                    if (r > 0 && grid[r - 1][c] == 1) perimeter -= 2;
                    if (c > 0 && grid[r][c - 1] == 1) perimeter -= 2;
                }
            }
        }
        return perimeter;
    }
};`,
      java: `class Solution {
    public int islandPerimeter(int[][] grid) {
        int m = grid.length, n = grid[0].length, perimeter = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    perimeter += 4;
                    if (r > 0 && grid[r - 1][c] == 1) perimeter -= 2;
                    if (c > 0 && grid[r][c - 1] == 1) perimeter -= 2;
                }
            }
        }
        return perimeter;
    }
}`,
      explanation: 'Iterate through all grid cells. When finding a land cell (1), add 4 to the perimeter. If it shares a boundary with a neighbor to its top or left, subtract 2 (since each shared edge reduces perimeter by 2). Time complexity: O(m * n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-476',
    slug: 'number-complement',
    title: 'Number Complement',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'The complement of an integer is the integer you get when you flip all the `0`\'s to `1`\'s and all the `1`\'s to `0`\'s in its binary representation. Return the complement.',
    constraints: ['1 <= num < 2^31'],
    solutions: {
      python: `class Solution:
    def findComplement(self, num: int) -> int:
        # Create a bitmask of 1s matching the length of num
        mask = (1 << num.bit_length()) - 1
        return num ^ mask`,
      cpp: `class Solution {
public:
    int findComplement(int num) {
        unsigned int mask = 1;
        while (mask < num) {
            mask = (mask << 1) | 1;
        }
        return num ^ mask;
    }
};`,
      java: `class Solution {
    public int findComplement(int num) {
        int mask = (Integer.highestOneBit(num) << 1) - 1;
        if (mask < 0) mask = Integer.MAX_VALUE; // handle overflow
        return num ^ mask;
    }
}`,
      explanation: 'Generate a bitmask of all 1s of the same bit length as num. XOR the number with this mask to flip all bits. Time complexity: O(1) (at most 32 cycles), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-482',
    slug: 'license-key-formatting',
    title: 'License Key Formatting',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a license key string `s` and an integer `k`, format the license key into groups of `k` uppercase alphanumeric characters separated by dashes.',
    constraints: ['1 <= s.length <= 10^5', 's consists of English letters, digits, and dashes.', '1 <= k <= 10^4'],
    solutions: {
      python: `class Solution:
    def licenseKeyFormatting(self, s: str, k: int) -> str:
        s = s.replace("-", "").upper()
        res = []
        n = len(s)
        first_group = n % k
        if first_group > 0:
            res.append(s[:first_group])
        for i in range(first_group, n, k):
            res.append(s[i : i + k])
        return "-".join(res)`,
      cpp: `class Solution {
public:
    string licenseKeyFormatting(string s, int k) {
        string clean = "";
        for (char c : s) if (c != '-') clean += toupper(c);
        int n = clean.size();
        string res = "";
        int firstGroup = n % k;
        if (firstGroup > 0) res += clean.substr(0, firstGroup);
        for (int i = firstGroup; i < n; i += k) {
            if (!res.empty()) res += "-";
            res += clean.substr(i, k);
        }
        return res;
    }
};`,
      java: `class Solution {
    public String licenseKeyFormatting(String s, int k) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c != '-') sb.append(Character.toUpperCase(c));
        }
        int n = sb.length();
        StringBuilder res = new StringBuilder();
        int firstGroup = n % k;
        if (firstGroup > 0) res.append(sb.substring(0, firstGroup));
        for (int i = firstGroup; i < n; i += k) {
            if (res.length() > 0) res.append("-");
            res.append(sb.substring(i, i + k));
        }
        return res.toString();
    }
}`,
      explanation: 'Remove all dashes and convert letters to uppercase. Group the characters from right to left: the first group can be shorter (length equals total_chars % k), while all subsequent groups have length k. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-485',
    slug: 'max-consecutive-ones',
    title: 'Max Consecutive Ones',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a binary array `nums`, return the maximum number of consecutive `1`s in the array.',
    constraints: ['1 <= nums.length <= 10^5', 'nums[i] is 0 or 1.'],
    solutions: {
      python: `class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        best = cur = 0
        for n in nums:
            if n == 1:
                cur += 1
                best = max(best, cur)
            else:
                cur = 0
        return best`,
      cpp: `class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int best = 0, cur = 0;
        for (int n : nums) {
            if (n == 1) { cur++; best = max(best, cur); }
            else cur = 0;
        }
        return best;
    }
};`,
      java: `class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int best = 0, cur = 0;
        for (int n : nums) {
            if (n == 1) { cur++; best = Math.max(best, cur); }
            else cur = 0;
        }
        return best;
    }
}`,
      explanation: 'Iterate through the array. Increment a running count whenever a 1 is seen. Reset the count to 0 when encountering a 0. Track the maximum count. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-492',
    slug: 'construct-the-rectangle',
    title: 'Construct the Rectangle',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Find a length `L` and width `W` such that `L * W == area`, `L >= W`, and their difference `L - W` is minimized.',
    constraints: ['1 <= area <= 10^7'],
    solutions: {
      python: `class Solution:
    def constructRectangle(self, area: int) -> List[int]:
        w = int(area**0.5)
        while area % w != 0:
            w -= 1
        return [area // w, w]`,
      cpp: `class Solution {
public:
    vector<int> constructRectangle(int area) {
        int w = sqrt(area);
        while (area % w != 0) w--;
        return {area / w, w};
    }
};`,
      java: `class Solution {
    public int[] constructRectangle(int area) {
        int w = (int) Math.sqrt(area);
        while (area % w != 0) w--;
        return new int[]{area / w, w};
    }
}`,
      explanation: 'Start search from W = floor(sqrt(area)) and decrement W. The first divisor W found will yield the minimum difference L - W. Time complexity: O(sqrt(area)), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-500',
    slug: 'keyboard-row',
    title: 'Keyboard Row',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of strings `words`, return the words that can be typed using letters of only one row on a QWERTY keyboard.',
    constraints: ['1 <= words.length <= 20', '1 <= words[i].length <= 100', 'words[i] consists of English letters.'],
    solutions: {
      python: `class Solution:
    def findWords(self, words: List[str]) -> List[str]:
        r1, r2, r3 = set("qwertyuiop"), set("asdfghjkl"), set("zxcvbnm")
        res = []
        for w in words:
            w_set = set(w.lower())
            if w_set.issubset(r1) or w_set.issubset(r2) or w_set.issubset(r3):
                res.append(w)
        return res`,
      cpp: `class Solution {
public:
    vector<string> findWords(vector<string>& words) {
        int rowMap[26];
        string r1 = "qwertyuiop", r2 = "asdfghjkl", r3 = "zxcvbnm";
        for (char c : r1) rowMap[c - 'a'] = 1;
        for (char c : r2) rowMap[c - 'a'] = 2;
        for (char c : r3) rowMap[c - 'a'] = 3;
        vector<string> res;
        for (const auto& w : words) {
            int row = rowMap[tolower(w[0]) - 'a'];
            bool ok = true;
            for (char c : w) {
                if (rowMap[tolower(c) - 'a'] != row) { ok = false; break; }
            }
            if (ok) res.push_back(w);
        }
        return res;
    }
};`,
      java: `class Solution {
    public String[] findWords(String[] words) {
        int[] rowMap = new int[26];
        String r1 = "qwertyuiop", r2 = "asdfghjkl", r3 = "zxcvbnm";
        for (char c : r1.toCharArray()) rowMap[c - 'a'] = 1;
        for (char c : r2.toCharArray()) rowMap[c - 'a'] = 2;
        for (char c : r3.toCharArray()) rowMap[c - 'a'] = 3;
        List<String> res = new ArrayList<>();
        for (String w : words) {
            int row = rowMap[Character.toLowerCase(w.charAt(0)) - 'a'];
            boolean ok = true;
            for (char c : w.toCharArray()) {
                if (rowMap[Character.toLowerCase(c) - 'a'] != row) { ok = false; break; }
            }
            if (ok) res.add(w);
        }
        return res.toArray(new String[0]);
    }
}`,
      explanation: 'Map each character of the alphabet to its row number on the keyboard. For each word, check if all its characters map to the same row number as the first character. Time complexity: O(n * L) where L is max word length, Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-504',
    slug: 'base-7',
    title: 'Base 7',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an integer `num`, return a string of its **base 7** representation.',
    constraints: ['-10^7 <= num <= 10^7'],
    solutions: {
      python: `class Solution:
    def convertToBase7(self, num: int) -> str:
        if num == 0: return "0"
        sign = "-" if num < 0 else ""
        num = abs(num)
        res = []
        while num > 0:
            res.append(str(num % 7))
            num //= 7
        return sign + "".join(reversed(res))`,
      cpp: `class Solution {
public:
    string convertToBase7(int num) {
        if (num == 0) return "0";
        string sign = (num < 0) ? "-" : "";
        num = abs(num);
        string res = "";
        while (num > 0) {
            res += to_string(num % 7);
            num /= 7;
        }
        reverse(res.begin(), res.end());
        return sign + res;
    }
};`,
      java: `class Solution {
    public String convertToBase7(int num) {
        if (num == 0) return "0";
        StringBuilder sb = new StringBuilder();
        boolean neg = num < 0;
        num = Math.abs(num);
        while (num > 0) {
            sb.append(num % 7);
            num /= 7;
        }
        if (neg) sb.append("-");
        return sb.reverse().toString();
    }
}`,
      explanation: 'Convert to base 7 using division and remainder operations. Keep dividing the absolute value of num by 7 and collect remainders. Add the negative sign prefix if needed and reverse. Time complexity: O(log_7 num), Space complexity: O(log_7 num).'
    }
  },
  {
    id: 'lc-506',
    slug: 'relative-ranks',
    title: 'Relative Ranks',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Heap (Priority Queue)',
    description: 'You are given an integer array `score` of size `n`, where `score[i]` is the score of the `i`-th athlete in a competition. All the scores are guaranteed to be unique. Return their relative ranks.',
    constraints: ['n == score.length', '1 <= n <= 10^4', '0 <= score[i] <= 10^6', 'All the values in score are unique.'],
    solutions: {
      python: `class Solution:
    def findRelativeRanks(self, score: List[int]) -> List[str]:
        # Pair scores with their original indices and sort descendingly
        sorted_score = sorted(enumerate(score), key=lambda x: x[1], reverse=True)
        res = [""] * len(score)
        for rank, (idx, val) in enumerate(sorted_score):
            if rank == 0: res[idx] = "Gold Medal"
            elif rank == 1: res[idx] = "Silver Medal"
            elif rank == 2: res[idx] = "Bronze Medal"
            else: res[idx] = str(rank + 1)
        return res`,
      cpp: `class Solution {
public:
    vector<string> findRelativeRanks(vector<int>& score) {
        int n = score.size();
        vector<pair<int, int>> sortedScore;
        for (int i = 0; i < n; ++i) sortedScore.push_back({score[i], i});
        sort(sortedScore.rbegin(), sortedScore.rend());
        vector<string> res(n);
        for (int rank = 0; rank < n; ++rank) {
            int idx = sortedScore[rank].second;
            if (rank == 0) res[idx] = "Gold Medal";
            else if (rank == 1) res[idx] = "Silver Medal";
            else if (rank == 2) res[idx] = "Bronze Medal";
            else res[idx] = to_string(rank + 1);
        }
        return res;
    }
};`,
      java: `class Solution {
    public String[] findRelativeRanks(int[] score) {
        int n = score.length;
        int[][] sorted = new int[n][2];
        for (int i = 0; i < n; i++) { sorted[i][0] = score[i]; sorted[i][1] = i; }
        Arrays.sort(sorted, (a, b) -> Integer.compare(b[0], a[0]));
        String[] res = new String[n];
        for (int rank = 0; rank < n; rank++) {
            int idx = sorted[rank][1];
            if (rank == 0) res[idx] = "Gold Medal";
            else if (rank == 1) res[idx] = "Silver Medal";
            else if (rank == 2) res[idx] = "Bronze Medal";
            else res[idx] = String.valueOf(rank + 1);
        }
        return res;
    }
}`,
      explanation: 'Sort the scores in descending order while preserving their original indices. Assign ranks ("Gold Medal", "Silver Medal", "Bronze Medal", or numerical rank strings) based on the sorted order. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-507',
    slug: 'perfect-number',
    title: 'Perfect Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'A **perfect number** is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. Given an integer `n`, return `true` if `n` is a perfect number.',
    constraints: ['1 <= num <= 10^8'],
    solutions: {
      python: `class Solution:
    def checkPerfectNumber(self, num: int) -> bool:
        if num <= 1: return False
        div_sum = 1
        for i in range(2, int(num**0.5) + 1):
            if num % i == 0:
                div_sum += i
                if i * i != num:
                    div_sum += num // i
        return div_sum == num`,
      cpp: `class Solution {
public:
    bool checkPerfectNumber(int num) {
        if (num <= 1) return false;
        int sum = 1;
        for (int i = 2; i * i <= num; ++i) {
            if (num % i == 0) {
                sum += i;
                if (i * i != num) sum += num / i;
            }
        }
        return sum == num;
    }
};`,
      java: `class Solution {
    public boolean checkPerfectNumber(int num) {
        if (num <= 1) return false;
        int sum = 1;
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                sum += i;
                if (i * i != num) sum += num / i;
            }
        }
        return sum == num;
    }
}`,
      explanation: 'Find all divisors of num up to sqrt(num). Accumulate the sum of these divisors, adding both i and num/i when divisor is found. Compare sum with num. Time complexity: O(sqrt(num)), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-520',
    slug: 'detect-capital',
    title: 'Detect Capital',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'We define the usage of capitals in a word to be right when: all letters are capitals, or all letters are not capitals, or only the first letter is capital.',
    constraints: ['1 <= word.length <= 100', 'word consists of lowercase and uppercase English letters.'],
    solutions: {
      python: `class Solution:
    def detectCapitalUse(self, word: str) -> bool:
        return word.isupper() or word.islower() or (word[0].isupper() and word[1:].islower())`,
      cpp: `class Solution {
public:
    bool detectCapitalUse(string word) {
        int capitals = 0;
        for (char c : word) if (isupper(c)) capitals++;
        return capitals == word.size() || capitals == 0 || (capitals == 1 && isupper(word[0]));
    }
};`,
      java: `class Solution {
    public boolean detectCapitalUse(String word) {
        int capitals = 0;
        for (char c : word.toCharArray()) if (Character.isUpperCase(c)) capitals++;
        return capitals == word.length() || capitals == 0 || (capitals == 1 && Character.isUpperCase(word.charAt(0)));
    }
}`,
      explanation: 'Count the number of capital letters in the word. Valid states: all characters are capital, zero characters are capital, or exactly 1 character is capital and it is at index 0. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-521',
    slug: 'longest-uncommon-subsequence-i',
    title: 'Longest Uncommon Subsequence I',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two strings `a` and `b`, return the length of the longest uncommon subsequence between `a` and `b`. If no such uncommon subsequence exists, return `-1`.',
    constraints: ['1 <= a.length, b.length <= 100', 'a and b consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def findLUSlength(self, a: str, b: str) -> int:
        if a == b: return -1
        return max(len(a), len(b))`,
      cpp: `class Solution {
public:
    int findLUSlength(string a, string b) {
        if (a == b) return -1;
        return max(a.size(), b.size());
    }
};`,
      java: `class Solution {
    public int findLUSlength(String a, String b) {
        if (a.equals(b)) return -1;
        return Math.max(a.length(), b.length());
    }
}`,
      explanation: 'If both strings are identical, there cannot be any uncommon subsequence, so return -1. If they differ, the longer string itself is a subsequence of itself and cannot be a subsequence of the shorter string, so return max(length_a, length_b). Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-551',
    slug: 'student-attendance-record-i',
    title: 'Student Attendance Record I',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a string `s` representing an attendance record for a student. The student is eligible for an attendance award if they meet both of the following criteria:\n- The student was absent (\'A\') for **strictly fewer** than 2 days total.\n- The student was late (\'L\') for **strictly fewer** than 3 consecutive days.',
    constraints: ['1 <= s.length <= 1000', 's consists of \'A\', \'L\', and \'P\'.'],
    solutions: {
      python: `class Solution:
    def checkRecord(self, s: str) -> bool:
        return s.count('A') < 2 and "LLL" not in s`,
      cpp: `class Solution {
public:
    bool checkRecord(string s) {
        int a = 0;
        for (char c : s) if (c == 'A') a++;
        return a < 2 && s.find("LLL") == string::npos;
    }
};`,
      java: `class Solution {
    public boolean checkRecord(String s) {
        int a = 0;
        for (char c : s.toCharArray()) if (c == 'A') a++;
        return a < 2 && !s.contains("LLL");
    }
}`,
      explanation: 'Count the total number of \'A\' occurrences (must be < 2) and verify that the substring "LLL" is not present in the record. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-557',
    slug: 'reverse-words-in-a-string-iii',
    title: 'Reverse Words in a String III',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given a string `s`, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.',
    constraints: ['1 <= s.length <= 5 * 10^4', 's contains printable ASCII characters.', 's does not contain any leading or trailing spaces.', 'There is at least one word in s.', 'All the words in s are separated by a single space.'],
    solutions: {
      python: `class Solution:
    def reverseWords(self, s: str) -> str:
        return " ".join(w[::-1] for w in s.split(" "))`,
      cpp: `class Solution {
public:
    string reverseWords(string s) {
        int l = 0;
        for (int r = 0; r <= s.size(); ++r) {
            if (r == s.size() || s[r] == ' ') {
                reverse(s.begin() + l, s.begin() + r);
                l = r + 1;
            }
        }
        return s;
    }
};`,
      java: `class Solution {
    public String reverseWords(String s) {
        char[] chars = s.toCharArray();
        int l = 0;
        for (int r = 0; r <= chars.length; r++) {
            if (r == chars.length || chars[r] == ' ') {
                // reverse sub-array l to r-1
                int i = l, j = r - 1;
                while (i < j) {
                    char t = chars[i]; chars[i] = chars[j]; chars[j] = t;
                    i++; j--;
                }
                l = r + 1;
            }
        }
        return new String(chars);
    }
}`,
      explanation: 'Use two pointers to locate the start and end of each word. Swap characters within word boundaries in-place. Time complexity: O(n), Space complexity: O(n) (or O(1) auxiliary if in-place modification is supported).'
    }
  },
  {
    id: 'lc-561',
    slug: 'array-partition',
    title: 'Array Partition',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given an integer array `nums` of `2n` integers, group these integers into `n` pairs `(a1, b1), (a2, b2), ..., (an, bn)` such that the sum of `min(ai, bi)` for all `i` is **maximized**. Return the maximized sum.',
    constraints: ['1 <= n <= 10^4', 'nums.length == 2 * n', '-10^4 <= nums[i] <= 10^4'],
    solutions: {
      python: `class Solution:
    def arrayPairSum(self, nums: List[int]) -> int:
        nums.sort()
        return sum(nums[::2])`,
      cpp: `class Solution {
public:
    int arrayPairSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int sum = 0;
        for (int i = 0; i < nums.size(); i += 2) sum += nums[i];
        return sum;
    }
};`,
      java: `class Solution {
    public int arrayPairSum(int[] nums) {
        Arrays.sort(nums);
        int sum = 0;
        for (int i = 0; i < nums.length; i += 2) sum += nums[i];
        return sum;
    }
}`,
      explanation: 'To maximize the sum of minimums, pair adjacent numbers after sorting the array. This minimizes the loss in value when selecting the smaller element in each pair. Sum every second element starting at index 0. Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-563',
    slug: 'binary-tree-tilt',
    title: 'Binary Tree Tilt',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree, return the sum of every tree node\'s tilt. The tilt of a tree node is the absolute difference between the sum of all left subtree node values and all right subtree node values.',
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-1000 <= Node.val <= 1000'],
    solutions: {
      python: `class Solution:
    def findTilt(self, root: Optional[TreeNode]) -> int:
        self.tilt_sum = 0
        def sum_subtree(node):
            if not node: return 0
            left = sum_subtree(node.left)
            right = sum_subtree(node.right)
            self.tilt_sum += abs(left - right)
            return node.val + left + right
        sum_subtree(root)
        return self.tilt_sum`,
      cpp: `class Solution {
    int tiltSum = 0;
    int sumSubtree(TreeNode* node) {
        if (!node) return 0;
        int left = sumSubtree(node->left);
        int right = sumSubtree(node->right);
        tiltSum += abs(left - right);
        return node->val + left + right;
    }
public:
    int findTilt(TreeNode* root) {
        sumSubtree(root);
        return tiltSum;
    }
};`,
      java: `class Solution {
    int tiltSum = 0;
    private int sumSubtree(TreeNode node) {
        if (node == null) return 0;
        int left = sumSubtree(node.left);
        int right = sumSubtree(node.right);
        tiltSum += Math.abs(left - right);
        return node.val + left + right;
    }
    public int findTilt(TreeNode root) {
        sumSubtree(root);
        return tiltSum;
    }
}`,
      explanation: 'Use post-order traversal DFS. At each node, calculate the sum of left and right subtrees. Accumulate the absolute difference (tilt) to the global sum, and return node.val + left + right. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-566',
    slug: 'reshape-the-matrix',
    title: 'Reshape the Matrix',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'In MATLAB, there is a handy function called `reshape` which can reshape an `m x n` matrix into a new one with a different size `r x c` keeping its original data.',
    constraints: ['m == mat.length', 'n == mat[i].length', '1 <= m, n <= 100', '-1000 <= mat[i][j] <= 1000', '1 <= r, c <= 300'],
    solutions: {
      python: `class Solution:
    def matrixReshape(self, mat: List[List[int]], r: int, c: int) -> List[List[int]]:
        m, n = len(mat), len(mat[0])
        if m * n != r * c: return mat
        res = [[0] * c for _ in range(r)]
        for i in range(m * n):
            res[i // c][i % c] = mat[i // n][i % n]
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> matrixReshape(vector<vector<int>>& mat, int r, int c) {
        int m = mat.size(), n = mat[0].size();
        if (m * n != r * c) return mat;
        vector<vector<int>> res(r, vector<int>(c));
        for (int i = 0; i < m * n; ++i) {
            res[i / c][i % c] = mat[i / n][i % n];
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[][] matrixReshape(int[][] mat, int r, int c) {
        int m = mat.length, n = mat[0].length;
        if (m * n != r * c) return mat;
        int[][] res = new int[r][c];
        for (int i = 0; i < m * n; i++) {
            res[i / c][i % c] = mat[i / n][i % n];
        }
        return res;
    }
}`,
      explanation: 'Map 1D flattened coordinates of matrix cells: cell index i corresponds to row i / n and col i % n in the original, and row i / c and col i % c in the reshaped matrix. Verify total cell counts match first. Time complexity: O(m * n), Space complexity: O(r * c).'
    }
  },
  {
    id: 'lc-575',
    slug: 'distribute-candies',
    title: 'Distribute Candies',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Alice has `n` candies, where the `i`-th candy is of type `candyType[i]`. Alice noticed that she started to gain weight, so she visited a doctor. The doctor advised Alice to only eat `n / 2` of these candies. Return the maximum number of different types of candies she can eat.',
    constraints: ['n == candyType.length', '2 <= n <= 10^4', 'n is even.', '-10^5 <= candyType[i] <= 10^5'],
    solutions: {
      python: `class Solution:
    def distributeCandies(self, candyType: List[int]) -> int:
        return min(len(set(candyType)), len(candyType) // 2)`,
      cpp: `class Solution {
public:
    int distributeCandies(vector<int>& candyType) {
        unordered_set<int> uniqueTypes(candyType.begin(), candyType.end());
        return min(uniqueTypes.size(), candyType.size() / 2);
    }
};`,
      java: `class Solution {
    public int distributeCandies(int[] candyType) {
        Set<Integer> uniqueTypes = new HashSet<>();
        for (int t : candyType) uniqueTypes.add(t);
        return Math.min(uniqueTypes.size(), candyType.length / 2);
    }
}`,
      explanation: 'The maximum different types Alice can eat is limited by either the total number of unique candy types (if she eats one of each) or the maximum candy allowance n / 2. Return the minimum of the two. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-594',
    slug: 'longest-harmonious-subsequence',
    title: 'Longest Harmonious Subsequence',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Sliding Window',
    description: 'We define a harmonious array as an array where the difference between its maximum value and its minimum value is **exactly** 1. Given an integer array `nums`, return the length of its longest harmonious subsequence.',
    constraints: ['1 <= nums.length <= 2 * 10^4', '-10^9 <= nums[i] <= 10^9'],
    solutions: {
      python: `class Solution:
    def findLHS(self, nums: List[int]) -> int:
        counts = {}
        for n in nums: counts[n] = counts.get(n, 0) + 1
        ans = 0
        for x in counts:
            if x + 1 in counts:
                ans = max(ans, counts[x] + counts[x + 1])
        return ans`,
      cpp: `class Solution {
public:
    int findLHS(vector<int>& nums) {
        unordered_map<int, int> counts;
        for (int n : nums) counts[n]++;
        int ans = 0;
        for (const auto& [x, cnt] : counts) {
            if (counts.count(x + 1)) {
                ans = max(ans, cnt + counts[x + 1]);
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int findLHS(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int n : nums) counts.put(n, counts.getOrDefault(n, 0) + 1);
        int ans = 0;
        for (int x : counts.keySet()) {
            if (counts.containsKey(x + 1)) {
                ans = Math.max(ans, counts.get(x) + counts.get(x + 1));
            }
        }
        return ans;
    }
}`,
      explanation: 'Use a hash map to store counts of all numbers. For each unique number x, if x + 1 exists in the map, check the combined counts of x and x+1 and track the maximum. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-598',
    slug: 'range-addition-ii',
    title: 'Range Addition II',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are given an `m x n` matrix `M` initialized with all `0`\'s and an array of operations `ops`. Return the number of maximum integers in the matrix after performing all operations.',
    constraints: ['1 <= m, n <= 4 * 10^4', '0 <= ops.length <= 10^4', 'ops[i].length == 2', '1 <= a_i <= m', '1 <= b_i <= n'],
    solutions: {
      python: `class Solution:
    def maxCount(self, m: int, n: int, ops: List[List[int]]) -> int:
        if not ops: return m * n
        min_r = min(op[0] for op in ops)
        min_c = min(op[1] for op in ops)
        return min_r * min_c`,
      cpp: `class Solution {
public:
    int maxCount(int m, int n, vector<vector<int>>& ops) {
        int minR = m, minC = n;
        for (const auto& op : ops) {
            minR = min(minR, op[0]);
            minC = min(minC, op[1]);
        }
        return minR * minC;
    }
};`,
      java: `class Solution {
    public int maxCount(int m, int n, int[][] ops) {
        int minR = m, minC = n;
        for (int[] op : ops) {
            minR = Math.min(minR, op[0]);
            minC = Math.min(minC, op[1]);
        }
        return minR * minC;
    }
}`,
      explanation: 'Since all operations increment values starting from M[0][0] to M[a-1][b-1], the cells that get incremented the most are in the intersection of all operations. Thus, find the minimum row and column dimensions across all operations. Time complexity: O(len(ops)), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-599',
    slug: 'minimum-index-sum-of-two-lists',
    title: 'Minimum Index Sum of Two Lists',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two arrays of strings `list1` and `list2`, find the common strings with the **least index sum**. If there is a choice tie, return all common strings in **any order**.',
    constraints: ['1 <= list1.length, list2.length <= 1000', '1 <= list1[i].length, list2[i].length <= 30', 'list1 and list2 consist of spaces and English letters.', 'All the strings of list1, list2 are unique.'],
    solutions: {
      python: `class Solution:
    def findRestaurant(self, list1: List[str], list2: List[str]) -> List[str]:
        pos = {w: i for i, w in enumerate(list1)}
        min_sum = float('inf')
        res = []
        for j, w in enumerate(list2):
            if w in pos:
                idx_sum = j + pos[w]
                if idx_sum < min_sum:
                    min_sum = idx_sum
                    res = [w]
                elif idx_sum == min_sum:
                    res.append(w)
        return res`,
      cpp: `class Solution {
public:
    vector<string> findRestaurant(vector<string>& list1, vector<string>& list2) {
        unordered_map<string, int> pos;
        for (int i = 0; i < list1.size(); ++i) pos[list1[i]] = i;
        int minSum = INT_MAX;
        vector<string> res;
        for (int j = 0; j < list2.size(); ++j) {
            string w = list2[j];
            if (pos.count(w)) {
                int sum = j + pos[w];
                if (sum < minSum) { minSum = sum; res = {w}; }
                else if (sum == minSum) { res.push_back(w); }
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public String[] findRestaurant(String[] list1, String[] list2) {
        Map<String, Integer> pos = new HashMap<>();
        for (int i = 0; i < list1.length; i++) pos.put(list1[i], i);
        int minSum = Integer.MAX_VALUE;
        List<String> res = new ArrayList<>();
        for (int j = 0; j < list2.length; j++) {
            String w = list2[j];
            if (pos.containsKey(w)) {
                int sum = j + pos.get(w);
                if (sum < minSum) { minSum = sum; res.clear(); res.add(w); }
                else if (sum == minSum) { res.add(w); }
            }
        }
        return res.toArray(new String[0]);
    }
}`,
      explanation: 'Store elements of the first list in a hash map with their indices. Iterate through the second list; if a match is found, compute the index sum. Track the minimum sum and collect matched strings. Time complexity: O(n + m), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-606',
    slug: 'construct-string-from-binary-tree',
    title: 'Construct String from Binary Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree, construct a string consisting of parenthesis and integers from a binary tree with the preorder traversal relation, and return it. Omit empty parenthesis.',
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-1000 <= Node.val <= 1000'],
    solutions: {
      python: `class Solution:
    def tree2str(self, root: Optional[TreeNode]) -> str:
        if not root: return ""
        res = str(root.val)
        if root.left or root.right:
            res += f"({self.tree2str(root.left)})"
        if root.right:
            res += f"({self.tree2str(root.right)})"
        return res`,
      cpp: `class Solution {
public:
    string tree2str(TreeNode* root) {
        if (!root) return "";
        string res = to_string(root->val);
        if (root->left || root->right) {
            res += "(" + tree2str(root->left) + ")";
        }
        if (root->right) {
            res += "(" + tree2str(root->right) + ")";
        }
        return res;
    }
};`,
      java: `class Solution {
    public String tree2str(TreeNode root) {
        if (root == null) return "";
        StringBuilder sb = new StringBuilder();
        sb.append(root.val);
        if (root.left != null || root.right != null) {
            sb.append("(").append(tree2str(root.left)).append(")");
        }
        if (root.right != null) {
            sb.append("(").append(tree2str(root.right)).append(")");
        }
        return sb.toString();
    }
}`,
      explanation: 'Use preorder DFS. If a node has children, parenthesize its left child (even if null, when the right child exists, to preserve tree structure). Only parenthesize the right child if it is non-null. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-617',
    slug: 'merge-two-binary-trees',
    title: 'Merge Two Binary Trees',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'You are given two binary trees `root1` and `root2`. Merge them. If two nodes overlap, sum their values. Otherwise, use the non-null node.',
    constraints: ['The number of nodes in both trees is in the range [0, 2000].', '-10^4 <= Node.val <= 10^4'],
    solutions: {
      python: `class Solution:
    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root1: return root2
        if not root2: return root1
        root = TreeNode(root1.val + root2.val)
        root.left = self.mergeTrees(root1.left, root2.left)
        root.right = self.mergeTrees(root1.right, root2.right)
        return root`,
      cpp: `class Solution {
public:
    TreeNode* mergeTrees(TreeNode* root1, TreeNode* root2) {
        if (!root1) return root2;
        if (!root2) return root1;
        TreeNode* root = new TreeNode(root1->val + root2->val);
        root->left = mergeTrees(root1->left, root2->left);
        root->right = mergeTrees(root1->right, root2->right);
        return root;
    }
};`,
      java: `class Solution {
    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        if (root1 == null) return root2;
        if (root2 == null) return root1;
        TreeNode root = new TreeNode(root1.val + root2.val);
        root.left = mergeTrees(root1.left, root2.left);
        root.right = mergeTrees(root1.right, root2.right);
        return root;
    }
}`,
      explanation: 'Recursively traverse both trees simultaneously. If either node is null, return the other. If both are present, sum their values, construct a new node, and recurse for left and right children. Time complexity: O(min(n, m)), Space complexity: O(min(h1, h2)).'
    }
  },
  {
    id: 'lc-628',
    slug: 'maximum-product-of-three-numbers',
    title: 'Maximum Product of Three Numbers',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given an integer array `nums`, find three numbers whose product is maximum and return the maximum product.',
    constraints: ['3 <= nums.length <= 10^4', '-1000 <= nums[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def maximumProduct(self, nums: List[int]) -> int:
        nums.sort()
        return max(nums[-1] * nums[-2] * nums[-3], nums[0] * nums[1] * nums[-1])`,
      cpp: `class Solution {
public:
    int maximumProduct(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        return max(nums[n-1] * nums[n-2] * nums[n-3], nums[0] * nums[1] * nums[n-1]);
    }
};`,
      java: `class Solution {
    public int maximumProduct(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        return Math.max(nums[n - 1] * nums[n - 2] * nums[n - 3], nums[0] * nums[1] * nums[n - 1]);
    }
}`,
      explanation: 'Sort the array. The maximum product of three numbers can either be the product of the three largest positive numbers (nums[n-1]*nums[n-2]*nums[n-3]) or the product of the two smallest negative numbers and the largest positive number (nums[0]*nums[1]*nums[n-1]). Time complexity: O(n log n), Space complexity: O(log n) for sorting.'
    }
  },
  {
    id: 'lc-637',
    slug: 'average-of-levels-in-binary-tree',
    title: 'Average of Levels in Binary Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'BFS',
    description: 'Given the `root` of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within `10^-5` of the actual answer will be accepted.',
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
    solutions: {
      python: `from collections import deque
class Solution:
    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
        res = []
        q = deque([root])
        while q:
            sz = len(q)
            level_sum = 0
            for _ in range(sz):
                node = q.popleft()
                level_sum += node.val
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(level_sum / sz)
        return res`,
      cpp: `class Solution {
public:
    vector<double> averageOfLevels(TreeNode* root) {
        vector<double> res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            double levelSum = 0;
            for (int i = 0; i < sz; ++i) {
                TreeNode* node = q.front(); q.pop();
                levelSum += node->val;
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(levelSum / sz);
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<Double> averageOfLevels(TreeNode root) {
        List<Double> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            double levelSum = 0;
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                levelSum += node.val;
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            res.add(levelSum / sz);
        }
        return res;
    }
}`,
      explanation: 'Use BFS level order traversal. For each level, calculate the sum of node values and divide by the queue size. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-643',
    slug: 'maximum-average-subarray-i',
    title: 'Maximum Average Subarray I',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Sliding Window',
    description: 'Find a contiguous subarray whose length is equal to `k` that has the maximum average value and return this value.',
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    solutions: {
      python: `class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        total = sum(nums[:k])
        max_total = total
        for i in range(k, len(nums)):
            total += nums[i] - nums[i - k]
            max_total = max(max_total, total)
        return max_total / k`,
      cpp: `class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        double sum = 0;
        for (int i = 0; i < k; ++i) sum += nums[i];
        double maxSum = sum;
        for (int i = k; i < nums.size(); ++i) {
            sum += nums[i] - nums[i - k];
            maxSum = max(maxSum, sum);
        }
        return maxSum / k;
    }
};`,
      java: `class Solution {
    public double findMaxAverage(int[] nums, int k) {
        double sum = 0;
        for (int i = 0; i < k; i++) sum += nums[i];
        double maxSum = sum;
        for (int i = k; i < nums.length; i++) {
            sum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, sum);
        }
        return maxSum / k;
    }
}`,
      explanation: 'Use a sliding window of size k. Maintain the running sum of elements in the window. On each step, add the next element and subtract the first element of the previous window. Track the maximum sum. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-645',
    slug: 'set-mismatch',
    title: 'Set Mismatch',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You have a set of integers `1` to `n`. Unfortunately, due to some error, one of the numbers in the set got duplicated to another number in the set, which results in repetition of one number and loss of another number. Find the duplicate and missing numbers.',
    constraints: ['2 <= nums.length <= 10^4', '1 <= nums[i] <= 10^4'],
    solutions: {
      python: `class Solution:
    def findErrorNums(self, nums: List[int]) -> List[int]:
        n = len(nums)
        counts = [0] * (n + 1)
        for x in nums: counts[x] += 1
        duplicate = missing = 0
        for i in range(1, n + 1):
            if counts[i] == 2: duplicate = i
            elif counts[i] == 0: missing = i
        return [duplicate, missing]`,
      cpp: `class Solution {
public:
    vector<int> findErrorNums(vector<int>& nums) {
        int n = nums.size();
        vector<int> counts(n + 1, 0);
        for (int x : nums) counts[x]++;
        int duplicate = 0, missing = 0;
        for (int i = 1; i <= n; ++i) {
            if (counts[i] == 2) duplicate = i;
            else if (counts[i] == 0) missing = i;
        }
        return {duplicate, missing};
    }
};`,
      java: `class Solution {
    public int[] findErrorNums(int[] nums) {
        int n = nums.length;
        int[] counts = new int[n + 1];
        for (int x : nums) counts[x]++;
        int duplicate = 0, missing = 0;
        for (int i = 1; i <= n; i++) {
            if (counts[i] == 2) duplicate = i;
            else if (counts[i] == 0) missing = i;
        }
        return new int[]{duplicate, missing};
    }
}`,
      explanation: 'Count the frequency of each number from 1 to n using a frequency array of size n+1. The number with frequency 2 is the duplicate, and the number with frequency 0 is the missing number. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-653',
    slug: 'two-sum-iv-input-is-a-bst',
    title: 'Two Sum IV - Input is a BST',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given the `root` of a binary search tree and a target number `k`, return `true` if there exist two elements in the BST such that their sum is equal to the given target.',
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-10^4 <= Node.val <= 10^4', 'root is a valid BST.', '-10^5 <= k <= 10^5'],
    solutions: {
      python: `class Solution:
    def findTarget(self, root: Optional[TreeNode], k: int) -> bool:
        seen = set()
        def dfs(node):
            if not node: return False
            if k - node.val in seen: return True
            seen.add(node.val)
            return dfs(node.left) or dfs(node.right)
        return dfs(root)`,
      cpp: `class Solution {
    unordered_set<int> seen;
    bool dfs(TreeNode* node, int k) {
        if (!node) return false;
        if (seen.count(k - node->val)) return true;
        seen.insert(node->val);
        return dfs(node->left, k) || dfs(node->right, k);
    }
public:
    bool findTarget(TreeNode* root, int k) {
        return dfs(root, k);
    }
};`,
      java: `class Solution {
        Set<Integer> seen = new HashSet<>();
        public boolean findTarget(TreeNode root, int k) {
            return dfs(root, k);
        }
        private boolean dfs(TreeNode node, int k) {
            if (node == null) return false;
            if (seen.contains(k - node.val)) return true;
            seen.add(node.val);
            return dfs(node.left, k) || dfs(node.right, k);
        }
    }`,
      explanation: 'Traverse the tree using DFS. Maintain a hash set of visited values. At each node, check if (k - node.val) is in the set. If yes, return true; otherwise, add the current node value and continue. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-657',
    slug: 'robot-return-to-origin',
    title: 'Robot Return to Origin',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'There is a robot starting at position `(0, 0)`, the origin, on a 2D plane. Given a sequence of its moves, judge if this robot ends up at `(0, 0)` after it completes its moves.',
    constraints: ['1 <= moves.length <= 2 * 10^4', 'moves consists of \'U\', \'D\', \'L\', and \'R\'.'],
    solutions: {
      python: `class Solution:
    def judgeCircle(self, moves: str) -> bool:
        return moves.count('U') == moves.count('D') and moves.count('L') == moves.count('R')`,
      cpp: `class Solution {
public:
    bool judgeCircle(string moves) {
        int x = 0, y = 0;
        for (char c : moves) {
            if (c == 'U') y++;
            else if (c == 'D') y--;
            else if (c == 'R') x++;
            else if (c == 'L') x--;
        }
        return x == 0 && y == 0;
    }
};`,
      java: `class Solution {
    public boolean judgeCircle(String moves) {
        int x = 0, y = 0;
        for (char c : moves.toCharArray()) {
            if (c == 'U') y++;
            else if (c == 'D') y--;
            else if (c == 'R') x++;
            else if (c == 'L') x--;
        }
        return x == 0 && y == 0;
    }
}`,
      explanation: 'The robot returns to the origin if and only if the number of Up moves equals Down moves, and Left moves equals Right moves. Track coordinates or counts. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-661',
    slug: 'image-smoother',
    title: 'Image Smoother',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'An image smoother is a filter of size `3 x 3` that can be applied to each cell of an image by rounding down the average of the cell and its 8 surrounding cells.',
    constraints: ['m == img.length', 'n == img[i].length', '1 <= m, n <= 200', '0 <= img[i][j] <= 255'],
    solutions: {
      python: `class Solution:
    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:
        m, n = len(img), len(img[0])
        res = [[0] * n for _ in range(m)]
        for r in range(m):
            for c in range(n):
                total = count = 0
                for dr in [-1, 0, 1]:
                    for dc in [-1, 0, 1]:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < m and 0 <= nc < n:
                            total += img[nr][nc]
                            count += 1
                res[r][c] = total // count
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {
        int m = img.size(), n = img[0].size();
        vector<vector<int>> res(m, vector<int>(n, 0));
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                int total = 0, count = 0;
                for (int dr = -1; dr <= 1; ++dr) {
                    for (int dc = -1; dc <= 1; ++dc) {
                        int nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nc >= 0 && nr < m && nc < n) {
                            total += img[nr][nc];
                            count++;
                        }
                    }
                }
                res[r][c] = total / count;
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[][] imageSmoother(int[][] img) {
        int m = img.length, n = img[0].length;
        int[][] res = new int[m][n];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int total = 0, count = 0;
                for (int dr = -1; dr <= 1; dr++) {
                    for (int dc = -1; dc <= 1; dc++) {
                        int nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nc >= 0 && nr < m && nc < n) {
                            total += img[nr][nc];
                            count++;
                        }
                    }
                }
                res[r][c] = total / count;
            }
        }
        return res;
    }
}`,
      explanation: 'For each cell (r, c), iterate over its 3x3 neighborhood. If neighbor coordinates are within matrix boundaries, accumulate their values and count them. Divide sum by count. Time complexity: O(m * n), Space complexity: O(m * n).'
    }
  },
  {
    id: 'lc-671',
    slug: 'second-minimum-node-in-a-binary-tree',
    title: 'Second Minimum Node In a Binary Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given a non-empty special binary tree consisting of nodes with the non-negative value, where each node in this tree has exactly two or zero sub-nodes. If the node has two sub-nodes, then this node\'s value is the minimum value among its two sub-nodes. Find the second minimum value.',
    constraints: ['The number of nodes in the tree is in the range [1, 25].', '1 <= Node.val <= 2^31 - 1', 'root.val is equal to the minimum value of its children.'],
    solutions: {
      python: `class Solution:
    def findSecondMinimumValue(self, root: Optional[TreeNode]) -> int:
        if not root: return -1
        self.ans = float('inf')
        min_val = root.val
        def dfs(node):
            if not node: return
            if min_val < node.val < self.ans:
                self.ans = node.val
            elif node.val == min_val:
                dfs(node.left)
                dfs(node.right)
        dfs(root)
        return self.ans if self.ans != float('inf') else -1`,
      cpp: `class Solution {
    long long ans = -1;
    void dfs(TreeNode* node, int minVal) {
        if (!node) return;
        if (node->val > minVal) {
            if (ans == -1 || node->val < ans) ans = node->val;
        } else if (node->val == minVal) {
            dfs(node->left, minVal);
            dfs(node->right, minVal);
        }
    }
public:
    int findSecondMinimumValue(TreeNode* root) {
        if (!root) return -1;
        dfs(root, root->val);
        return ans;
    }
};`,
      java: `class Solution {
    long ans = -1;
    private void dfs(TreeNode node, int minVal) {
        if (node == null) return;
        if (node.val > minVal) {
            if (ans == -1 || node.val < ans) ans = node.val;
        } else if (node.val == minVal) {
            dfs(node.left, minVal);
            dfs(node.right, minVal);
        }
    }
    public int findSecondMinimumValue(TreeNode root) {
        if (root == null) return -1;
        dfs(root, root.val);
        return (int) ans;
    }
}`,
      explanation: 'Since the root always has the minimum value in the tree, we only need to recurse down subtrees when a node\'s value equals root.val. If a node value is strictly greater than root.val, it is a candidate for the second minimum, so update the answer and stop recursing that branch. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-674',
    slug: 'longest-continuous-increasing-subsequence',
    title: 'Longest Continuous Increasing Subsequence',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an unsorted array of integers `nums`, return the length of the longest **continuous increasing subsequence** (i.e. subarray).',
    constraints: ['1 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    solutions: {
      python: `class Solution:
    def findLengthOfLCIS(self, nums: List[int]) -> int:
        if not nums: return 0
        best = cur = 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                cur += 1
                best = max(best, cur)
            else:
                cur = 1
        return best`,
      cpp: `class Solution {
public:
    int findLengthOfLCIS(vector<int>& nums) {
        if (nums.empty()) return 0;
        int best = 1, cur = 1;
        for (int i = 1; i < nums.size(); ++i) {
            if (nums[i] > nums[i - 1]) { cur++; best = max(best, cur); }
            else cur = 1;
        }
        return best;
    }
};`,
      java: `class Solution {
    public int findLengthOfLCIS(int[] nums) {
        if (nums.length == 0) return 0;
        int best = 1, cur = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) { cur++; best = Math.max(best, cur); }
            else cur = 1;
        }
        return best;
    }
}`,
      explanation: 'Iterate through the array. Maintain a running count of the increasing contiguous sequence. Reset the count to 1 whenever an element is not strictly greater than the previous. Track the global maximum length. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-680',
    slug: 'valid-palindrome-ii',
    title: 'Valid Palindrome II',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given a string `s`, return `true` if the `s` can be palindrome after deleting **at most one** character from it.',
    constraints: ['1 <= s.length <= 10^5', 's consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def validPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1
        while l < r:
            if s[l] != s[r]:
                # Try skipping left character or right character
                sub1 = s[l + 1 : r + 1]
                sub2 = s[l : r]
                return sub1 == sub1[::-1] or sub2 == sub2[::-1]
            l += 1
            r -= 1
        return True`,
      cpp: `class Solution {
    bool isPalindrome(const string& s, int l, int r) {
        while (l < r) if (s[l++] != s[r--]) return false;
        return true;
    }
public:
    bool validPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            if (s[l] != s[r]) {
                return isPalindrome(s, l + 1, r) || isPalindrome(s, l, r - 1);
            }
            l++; r--;
        }
        return true;
    }
};`,
      java: `class Solution {
    private boolean isPalindrome(String s, int l, int r) {
        while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;
        return true;
    }
    public boolean validPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return isPalindrome(s, l + 1, r) || isPalindrome(s, l, r - 1);
            }
            l++; r--;
        }
        return true;
    }
}`,
      explanation: 'Use two pointers from outer ends. When a mismatch is found at indexes l and r, test if the remaining substring behaves as a valid palindrome by either skipping character l (check sub-array [l+1, r]) or skipping character r (check sub-array [l, r-1]). Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-682',
    slug: 'baseball-game',
    title: 'Baseball Game',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'You are keeping the scores for a baseball game with strange rules. Return the sum of all the scores on the record.',
    constraints: ['1 <= operations.length <= 1000', 'operations[i] is "C", "D", "+", or an integer string.', 'All operations are valid.'],
    solutions: {
      python: `class Solution:
    def calPoints(self, operations: List[str]) -> int:
        stack = []
        for op in operations:
            if op == "+":
                stack.append(stack[-1] + stack[-2])
            elif op == "D":
                stack.append(stack[-1] * 2)
            elif op == "C":
                stack.pop()
            else:
                stack.append(int(op))
        return sum(stack)`,
      cpp: `class Solution {
public:
    int calPoints(vector<string>& operations) {
        vector<int> stack;
        for (const auto& op : operations) {
            if (op == "+") stack.push_back(stack[stack.size() - 1] + stack[stack.size() - 2]);
            else if (op == "D") stack.push_back(stack.back() * 2);
            else if (op == "C") stack.pop_back();
            else stack.push_back(stoi(op));
        }
        int sum = 0;
        for (int x : stack) sum += x;
        return sum;
    }
};`,
      java: `class Solution {
    public int calPoints(String[] operations) {
        Stack<Integer> stack = new Stack<>();
        for (String op : operations) {
            if (op.equals("+")) stack.push(stack.peek() + stack.get(stack.size() - 2));
            else if (op.equals("D")) stack.push(stack.peek() * 2);
            else if (op.equals("C")) stack.pop();
            else stack.push(Integer.parseInt(op));
        }
        int sum = 0;
        for (int x : stack) sum += x;
        return sum;
    }
}`,
      explanation: 'Use a stack. Maintain record points: integers are pushed, "C" pops, "D" duplicates top element, and "+" adds top two elements and pushes. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-785A',
    slug: 'cf-785a',
    title: 'Anton and Polyhedrons',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Hash Table',
    description: 'Anton has `n` polyhedrons. He wants to count the total number of faces. The polyhedrons are: Tetrahedron (4 faces), Cube (6 faces), Octahedron (8 faces), Dodecahedron (12 faces), Icosahedron (20 faces).',
    constraints: ['1 <= n <= 2 * 10^5'],
    solutions: {
      python: `n = int(input())
faces = {"Tetrahedron": 4, "Cube": 6, "Octahedron": 8, "Dodecahedron": 12, "Icosahedron": 20}
total = 0
for _ in range(n):
    total += faces[input()]
print(total)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    int total = 0;
    while (n--) {
        string s; cin >> s;
        if (s == "Tetrahedron") total += 4;
        else if (s == "Cube") total += 6;
        else if (s == "Octahedron") total += 8;
        else if (s == "Dodecahedron") total += 12;
        else if (s == "Icosahedron") total += 20;
    }
    cout << total;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int total = 0;
        for (int i = 0; i < n; i++) {
            String s = sc.next();
            if (s.equals("Tetrahedron")) total += 4;
            else if (s.equals("Cube")) total += 6;
            else if (s.equals("Octahedron")) total += 8;
            else if (s.equals("Dodecahedron")) total += 12;
            else if (s.equals("Icosahedron")) total += 20;
        }
        System.out.println(total);
    }
}`,
      explanation: 'Use a simple key-value mapping (or conditional statements) to translate each polyhedron name to its face count, and accumulate the sum. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-427A',
    slug: 'cf-427a',
    title: 'Police Recruits',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Police recruits are hired. Crimes occur. In one step, if we hire recruit(s) we get +k officers. If crime occurs (-1), one officer handles it. If no officers are available, the crime goes untreated. Count untreated crimes.',
    constraints: ['1 <= n <= 10^5'],
    solutions: {
      python: `n = int(input())
events = list(map(int, input().split()))
officers = 0
untreated = 0
for x in events:
    if x == -1:
        if officers > 0:
            officers -= 1
        else:
            untreated += 1
    else:
        officers += x
print(untreated)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    int officers = 0, untreated = 0;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        if (x == -1) {
            if (officers > 0) officers--;
            else untreated++;
        } else {
            officers += x;
        }
    }
    cout << untreated;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int officers = 0, untreated = 0;
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            if (x == -1) {
                if (officers > 0) officers--;
                else untreated++;
            } else {
                officers += x;
            }
        }
        System.out.println(untreated);
    }
}`,
      explanation: 'Maintain a running count of available officers. When a crime occurs (-1), decrement officer count if > 0; otherwise, increment the untreated crime count. Recruit events (+k) add to officer count. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1154A',
    slug: 'cf-1154a',
    title: 'Restoring Three Numbers',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given four integers x1, x2, x3, x4 representing pairwise sums of three positive integers a, b, c, and their total sum (a+b+c), restore the original values of a, b, and c.',
    constraints: ['2 <= x_i <= 10^9'],
    solutions: {
      python: `x = sorted(map(int, input().split()))
abc = x[3]
print(abc - x[0], abc - x[1], abc - x[2])`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> x(4);
    for (int i = 0; i < 4; ++i) cin >> x[i];
    sort(x.begin(), x.end());
    int abc = x[3];
    cout << abc - x[0] << " " << abc - x[1] << " " << abc - x[2];
}`,
      java: `import java.util.Scanner;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] x = new int[4];
        for (int i = 0; i < 4; i++) x[i] = sc.nextInt();
        Arrays.sort(x);
        int abc = x[3];
        System.out.println((abc - x[0]) + " " + (abc - x[1]) + " " + (abc - x[2]));
    }
}`,
      explanation: 'Sort the four input integers. The largest value will be the total sum (a + b + c). The other three values are (a + b), (a + c), and (b + c). Subtract each pairwise sum from the total sum to find the individual values of a, b, and c. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1367B',
    slug: 'cf-1367b',
    title: 'Even Array',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'An array is called good if all elements at even indices are even, and all elements at odd indices are odd. Find the minimum number of swaps to make the array good, or print -1.',
    constraints: ['1 <= t <= 100', '1 <= n <= 40', '0 <= a_i <= 1000'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    n = int(input())
    a = list(map(int, input().split()))
    wrong_evens = wrong_odds = 0
    for i, x in enumerate(a):
        if i % 2 != x % 2:
            if i % 2 == 0: wrong_evens += 1
            else: wrong_odds += 1
    if wrong_evens != wrong_odds:
        print(-1)
    else:
        print(wrong_evens)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        int wrongEvens = 0, wrongOdds = 0;
        for (int i = 0; i < n; ++i) {
            int x; cin >> x;
            if (i % 2 != x % 2) {
                if (i % 2 == 0) wrongEvens++;
                else wrongOdds++;
            }
        }
        if (wrongEvens != wrongOdds) cout << "-1\\n";
        else cout << wrongEvens << "\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int wrongEvens = 0, wrongOdds = 0;
            for (int i = 0; i < n; i++) {
                int x = sc.nextInt();
                if (i % 2 != x % 2) {
                    if (i % 2 == 0) wrongEvens++;
                    else wrongOdds++;
                }
            }
            if (wrongEvens != wrongOdds) System.out.println(-1);
            else System.out.println(wrongEvens);
        }
    }
}`,
      explanation: 'Count the count of misplaced odd values at even indices, and misplaced even values at odd indices. Since we can swap any misplaced pair, the answer is only valid if wrong_evens == wrong_odds, and the number of swaps is equal to wrong_evens. Time complexity: O(n) per testcase, Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1399A',
    slug: 'cf-1399a',
    title: 'Remove Smallest',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Greedy',
    description: 'You are given an array of `n` positive integers. In one move, you can choose two indices `i` and `j` such that `abs(a[i] - a[j]) <= 1` and remove the smaller element. Can you reduce the array to a single element?',
    constraints: ['1 <= t <= 1000', '1 <= n <= 50', '1 <= a_i <= 100'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    n = int(input())
    a = sorted(map(int, input().split()))
    possible = True
    for i in range(n - 1):
        if a[i + 1] - a[i] > 1:
            possible = False
            break
    print("YES" if possible else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        vector<int> a(n);
        for (int i = 0; i < n; ++i) cin >> a[i];
        sort(a.begin(), a.end());
        bool possible = true;
        for (int i = 0; i < n - 1; ++i) {
            if (a[i+1] - a[i] > 1) { possible = false; break; }
        }
        cout << (possible ? "YES\\n" : "NO\\n");
    }
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int[] a = new int[n];
            for (int i = 0; i < n; i++) a[i] = sc.nextInt();
            Arrays.sort(a);
            boolean possible = true;
            for (int i = 0; i < n - 1; i++) {
                if (a[i + 1] - a[i] > 1) { possible = false; break; }
            }
            System.out.println(possible ? "YES" : "NO");
        }
    }
}`,
      explanation: 'Sort the array. Since we can always merge adjacent values with difference at most 1, it is possible to reduce the array to a single element if and only if the difference between any adjacent elements in the sorted array is at most 1. Time complexity: O(n log n) per testcase, Space complexity: O(n).'
    }
  }
];

function main() {
  const arena = JSON.parse(fs.readFileSync(ARENA_PATH, 'utf-8'));
  const existingIds = new Set(arena.map((p) => p.id));

  let added = 0;
  let skipped = 0;

  for (const problem of BATCH) {
    if (existingIds.has(problem.id)) {
      console.log(`Skipped ${problem.id}`);
      skipped++;
      continue;
    }
    arena.push(problem);
    added++;
  }

  fs.writeFileSync(ARENA_PATH, JSON.stringify(arena, null, 2) + '\n', 'utf-8');
  console.log(`Done! Added: ${added}, Skipped: ${skipped}, Total: ${arena.length}`);
}

main();
