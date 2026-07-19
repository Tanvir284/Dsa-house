const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const BATCH = [
  {
    id: 'lc-6',
    slug: 'zigzag-conversion',
    title: 'Zigzag Conversion',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font)\n\nP   A   H   N\nA P L S I I G\nY   I   R\n\nAnd then read line by line: `"PAHNAPLSIIGYIR"`\n\nWrite the code that will take a string and make this conversion given a number of rows.',
    constraints: ['1 <= s.length <= 1000', 's consists of English letters (lower-case and upper-case), \',\', and \'.\'.', '1 <= numRows <= 1000'],
    solutions: {
      python: `class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1 or numRows >= len(s): return s
        rows = [""] * numRows
        idx, step = 0, 1
        for c in s:
            rows[idx] += c
            if idx == 0: step = 1
            elif idx == numRows - 1: step = -1
            idx += step
        return "".join(rows)`,
      cpp: `class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1 || numRows >= s.size()) return s;
        vector<string> rows(numRows);
        int idx = 0, step = 1;
        for (char c : s) {
            rows[idx] += c;
            if (idx == 0) step = 1;
            else if (idx == numRows - 1) step = -1;
            idx += step;
        }
        string res = "";
        for (const string& row : rows) res += row;
        return res;
    }
};`,
      java: `class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1 || numRows >= s.length()) return s;
        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();
        int idx = 0, step = 1;
        for (char c : s.toCharArray()) {
            rows[idx].append(c);
            if (idx == 0) step = 1;
            else if (idx == numRows - 1) step = -1;
            idx += step;
        }
        StringBuilder res = new StringBuilder();
        for (StringBuilder r : rows) res.append(r);
        return res.toString();
    }
}`,
      explanation: 'Simulate moving down and up the rows. Keep track of the current row index and change the direction (step = 1 or -1) whenever we hit the top or bottom row. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-7',
    slug: 'reverse-integer',
    title: 'Reverse Integer',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return `0`.',
    constraints: ['-2^31 <= x <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def reverse(self, x: int) -> int:
        sign = -1 if x < 0 else 1
        x = abs(x)
        res = 0
        while x > 0:
            res = res * 10 + x % 10
            x //= 10
        res *= sign
        if res < -2**31 or res > 2**31 - 1:
            return 0
        return res`,
      cpp: `class Solution {
public:
    int reverse(int x) {
        int res = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            if (res > INT_MAX/10 || (res == INT_MAX/10 && pop > 7)) return 0;
            if (res < INT_MIN/10 || (res == INT_MIN/10 && pop < -8)) return 0;
            res = res * 10 + pop;
        }
        return res;
    }
};`,
      java: `class Solution {
    public int reverse(int x) {
        int res = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            if (res > Integer.MAX_VALUE/10 || (res == Integer.MAX_VALUE/10 && pop > 7)) return 0;
            if (res < Integer.MIN_VALUE/10 || (res == Integer.MIN_VALUE/10 && pop < -8)) return 0;
            res = res * 10 + pop;
        }
        return res;
    }
}`,
      explanation: 'Reverse digits using modular arithmetic. Check for overflow before multiplying by 10 or adding the new digit. Time complexity: O(log x), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-8',
    slug: 'string-to-integer-atoi',
    title: 'String to Integer (atoi)',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.',
    constraints: ['0 <= s.length <= 200', 's consists of English letters, digits, spaces, and \'+\', \'-\', and \'.\'.'],
    solutions: {
      python: `class Solution:
    def myAtoi(self, s: str) -> int:
        s = s.lstrip()
        if not s: return 0
        sign = 1
        i = 0
        if s[0] == '-':
            sign = -1
            i += 1
        elif s[0] == '+':
            i += 1
        res = 0
        while i < len(s) and s[i].isdigit():
            res = res * 10 + int(s[i])
            i += 1
        res *= sign
        res = max(-2**31, min(2**31 - 1, res))
        return res`,
      cpp: `class Solution {
public:
    int myAtoi(string s) {
        int i = 0, n = s.size();
        while (i < n && s[i] == ' ') i++;
        int sign = 1;
        if (i < n && (s[i] == '+' || s[i] == '-')) {
            sign = (s[i] == '-') ? -1 : 1;
            i++;
        }
        long long res = 0;
        while (i < n && isdigit(s[i])) {
            res = res * 10 + (s[i] - '0');
            if (sign * res >= INT_MAX) return INT_MAX;
            if (sign * res <= INT_MIN) return INT_MIN;
            i++;
        }
        return sign * res;
    }
};`,
      java: `class Solution {
    public int myAtoi(String s) {
        int i = 0, n = s.length();
        while (i < n && s.charAt(i) == ' ') i++;
        int sign = 1;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            sign = (s.charAt(i) == '-') ? -1 : 1;
            i++;
        }
        long res = 0;
        while (i < n && Character.isDigit(s.charAt(i))) {
            res = res * 10 + (s.charAt(i) - '0');
            if (sign * res >= Integer.MAX_VALUE) return Integer.MAX_VALUE;
            if (sign * res <= Integer.MIN_VALUE) return Integer.MIN_VALUE;
            i++;
        }
        return (int) (sign * res);
    }
}`,
      explanation: 'First discard leading spaces, then determine the sign (+ or -). Read numeric digits and convert to value step by step, keeping track of 32-bit signed limits. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-16',
    slug: '3sum-closest',
    title: '3Sum Closest',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum of the three integers.',
    constraints: ['3 <= nums.length <= 500', '-1000 <= nums[i] <= 1000', '-10^4 <= target <= 10^4'],
    solutions: {
      python: `class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        closest = float('inf')
        for i in range(len(nums)):
            l, r = i + 1, len(nums) - 1
            while l < r:
                total = nums[i] + nums[l] + nums[r]
                if abs(target - total) < abs(target - closest):
                    closest = total
                if total < target: l += 1
                elif total > target: r -= 1
                else: return target
        return closest`,
      cpp: `class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int closest = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < nums.size(); ++i) {
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int total = nums[i] + nums[l] + nums[r];
                if (abs(target - total) < abs(target - closest)) closest = total;
                if (total < target) l++;
                else if (total > target) r--;
                else return target;
            }
        }
        return closest;
    }
};`,
      java: `class Solution {
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int closest = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < nums.length; i++) {
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int total = nums[i] + nums[l] + nums[r];
                if (Math.abs(target - total) < Math.abs(target - closest)) closest = total;
                if (total < target) l++;
                else if (total > target) r--;
                else return target;
            }
        }
        return closest;
    }
}`,
      explanation: 'Sort the array. Fix the first element at index i, and use a two-pointer approach for the remaining suffix to find a pair whose sum combined with nums[i] is closest to target. Time complexity: O(n^2), Space complexity: O(log n) for sorting.'
    }
  },
  {
    id: 'lc-28',
    slug: 'find-the-index-of-the-first-occurrence-in-a-string',
    title: 'Find the Index of the First Occurrence in a String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.',
    constraints: ['1 <= haystack.length, needle.length <= 10^4', 'haystack and needle consist of only lowercase English characters.'],
    solutions: {
      python: `class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        return haystack.find(needle)`,
      cpp: `class Solution {
public:
    int strStr(string haystack, string needle) {
        return haystack.find(needle);
    }
};`,
      java: `class Solution {
    public int strStr(String haystack, String needle) {
        return haystack.indexOf(needle);
    }
}`,
      explanation: 'Perform a substring search using string lookup operations. Time complexity: O(n * m) worst-case, Space complexity: O(1).'
    }
  },
  {
    id: 'lc-29',
    slug: 'divide-two-integers',
    title: 'Divide Two Integers',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given two integers `dividend` and `divisor`, divide two integers without using multiplication, division, and mod operator.',
    constraints: ['-2^31 <= dividend, divisor <= 2^31 - 1', 'divisor != 0'],
    solutions: {
      python: `class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        if dividend == -2**31 and divisor == -1: return 2**31 - 1
        sign = -1 if (dividend < 0) ^ (divisor < 0) else 1
        dvd, dvs = abs(dividend), abs(divisor)
        res = 0
        while dvd >= dvs:
            temp, mult = dvs, 1
            while dvd >= (temp << 1):
                temp <<= 1
                mult <<= 1
            dvd -= temp
            res += mult
        return sign * res`,
      cpp: `class Solution {
public:
    int divide(int dividend, int divisor) {
        if (dividend == INT_MIN && divisor == -1) return INT_MAX;
        int sign = ((dividend < 0) ^ (divisor < 0)) ? -1 : 1;
        long long dvd = abs((long long)dividend);
        long long dvs = abs((long long)divisor);
        long long res = 0;
        while (dvd >= dvs) {
            long long temp = dvs, mult = 1;
            while (dvd >= (temp << 1)) {
                temp <<= 1;
                mult <<= 1;
            }
            dvd -= temp;
            res += mult;
        }
        return sign * res;
    }
};`,
      java: `class Solution {
    public int divide(int dividend, int divisor) {
        if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;
        int sign = ((dividend < 0) ^ (divisor < 0)) ? -1 : 1;
        long dvd = Math.abs((long) dividend);
        long dvs = Math.abs((long) divisor);
        long res = 0;
        while (dvd >= dvs) {
            long temp = dvs, mult = 1;
            while (dvd >= (temp << 1)) {
                temp <<= 1;
                mult <<= 1;
            }
            dvd -= temp;
            res += mult;
        }
        return (int) (sign * res);
    }
}`,
      explanation: 'Use bit shifts. Repeatedly shift the divisor to the left until it is just smaller than the dividend, and add the shift multiplier (powers of 2) to the result. Subtract shifted divisor from dividend and repeat. Time complexity: O(log^2 n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-38',
    slug: 'count-and-say',
    title: 'Count and Say',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'The **count-and-say** sequence is a sequence of digit strings defined by the recursive formula: `countAndSay(1) = "1"`, `countAndSay(n)` is the run-length encoding of `countAndSay(n-1)`.',
    constraints: ['1 <= n <= 30'],
    solutions: {
      python: `class Solution:
    def countAndSay(self, n: int) -> str:
        s = "1"
        for _ in range(n - 1):
            next_s = []
            i = 0
            while i < len(s):
                count = 1
                while i + 1 < len(s) and s[i] == s[i + 1]:
                    i += 1
                    count += 1
                next_s.append(str(count) + s[i])
                i += 1
            s = "".join(next_s)
        return s`,
      cpp: `class Solution {
public:
    string countAndSay(int n) {
        string s = "1";
        for (int step = 1; step < n; ++step) {
            string nextS = "";
            int i = 0;
            while (i < s.size()) {
                int count = 1;
                while (i + 1 < s.size() && s[i] == s[i+1]) { i++; count++; }
                nextS += to_string(count) + s[i];
                i++;
            }
            s = nextS;
        }
        return s;
    }
};`,
      java: `class Solution {
    public String countAndSay(int n) {
        String s = "1";
        for (int step = 1; step < n; step++) {
            StringBuilder nextS = new StringBuilder();
            int i = 0;
            while (i < s.length()) {
                int count = 1;
                while (i + 1 < s.length() && s.charAt(i) == s.charAt(i + 1)) { i++; count++; }
                nextS.append(count).append(s.charAt(i));
                i++;
            }
            s = nextS.toString();
        }
        return s;
    }
}`,
      explanation: 'Generate the sequence step by step. For each step, perform run-length encoding: count consecutive matching characters, append the count followed by the character, and advance the index. Time complexity: O(2^n), Space complexity: O(2^n).'
    }
  },
  {
    id: 'lc-40',
    slug: 'combination-sum-ii',
    title: 'Combination Sum II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`. Each number in `candidates` may only be used **once** in the combination.',
    constraints: ['1 <= candidates.length <= 100', '1 <= candidates[i] <= 50', '1 <= target <= 30'],
    solutions: {
      python: `class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        res = []
        def backtrack(start, target, path):
            if target == 0:
                res.append(path[:])
                return
            for i in range(start, len(candidates)):
                if i > start and candidates[i] == candidates[i - 1]:
                    continue
                if candidates[i] > target:
                    break
                path.append(candidates[i])
                backtrack(i + 1, target - candidates[i], path)
                path.pop()
        backtrack(0, target, [])
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res;
        vector<int> path;
        function<void(int, int)> backtrack = [&](int start, int tar) {
            if (tar == 0) { res.push_back(path); return; }
            for (int i = start; i < candidates.size(); ++i) {
                if (i > start && candidates[i] == candidates[i - 1]) continue;
                if (candidates[i] > tar) break;
                path.push_back(candidates[i]);
                backtrack(i + 1, tar - candidates[i]);
                path.pop_back();
            }
        };
        backtrack(0, target);
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> res = new ArrayList<>();
        backtrack(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] candidates, int start, int target, List<Integer> path, List<List<Integer>> res) {
        if (target == 0) { res.add(new ArrayList<>(path)); return; }
        for (int i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] == candidates[i - 1]) continue;
            if (candidates[i] > target) break;
            path.add(candidates[i]);
            backtrack(candidates, i + 1, target - candidates[i], path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
      explanation: 'Sort candidate numbers. Use backtracking; skip duplicates at the same recursion level by checking if candidates[i] == candidates[i-1]. Prune search branches if candidates[i] exceeds the remaining target. Time complexity: O(2^n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-47',
    slug: 'permutations-ii',
    title: 'Permutations II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Given a collection of numbers, `nums`, that might contain duplicates, return all possible unique permutations **in any order**.',
    constraints: ['1 <= nums.length <= 8', '-10 <= nums[i] <= 10'],
    solutions: {
      python: `class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        used = [False] * len(nums)
        def backtrack(path):
            if len(path) == len(nums):
                res.append(path[:])
                return
            for i in range(len(nums)):
                if used[i]: continue
                # Skip duplicate elements if the previous identical element is not yet used
                if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                    continue
                used[i] = True
                path.append(nums[i])
                backtrack(path)
                path.pop()
                used[i] = False
        backtrack([])
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size(), false);
        function<void()> backtrack = [&]() {
            if (path.size() == nums.size()) { res.push_back(path); return; }
            for (int i = 0; i < nums.size(); ++i) {
                if (used[i]) continue;
                if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
                used[i] = true;
                path.push_back(nums[i]);
                backtrack();
                path.pop_back();
                used[i] = false;
            }
        };
        backtrack();
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, new boolean[nums.length], new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> res) {
        if (path.size() == nums.length) { res.add(new ArrayList<>(path)); return; }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
            used[i] = true;
            path.add(nums[i]);
            backtrack(nums, used, path, res);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}`,
      explanation: 'Sort the array. Use backtracking with a boolean array used to track selected numbers. To avoid duplicate permutations, do not start a new branch with nums[i] if it matches nums[i-1] and nums[i-1] has not yet been selected in the current path. Time complexity: O(n * n!), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-50',
    slug: 'powx-n',
    title: 'Pow(x, n)',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e., `x^n`).',
    constraints: ['-100.0 < x < 100.0', '-2^31 <= n <= 2^31 - 1', 'Either x is not zero or n > 0.', '-10^4 <= x^n <= 10^4'],
    solutions: {
      python: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        if n < 0:
            x = 1 / x
            n = -n
        res = 1
        curr = x
        while n > 0:
            if n % 2 == 1:
                res *= curr
            curr *= curr
            n //= 2
        return res`,
      cpp: `class Solution {
public:
    double myPow(double x, int n) {
        long long N = n;
        if (N < 0) { x = 1 / x; N = -N; }
        double res = 1, curr = x;
        while (N > 0) {
            if (N % 2 == 1) res *= curr;
            curr *= curr;
            N /= 2;
        }
        return res;
    }
};`,
      java: `class Solution {
    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) { x = 1 / x; N = -N; }
        double res = 1, curr = x;
        while (N > 0) {
            if (N % 2 == 1) res *= curr;
            curr *= curr;
            N /= 2;
        }
        return res;
    }
}`,
      explanation: 'Use Binary Exponentiation (Exponentiation by Squaring). Divide the power in half at each step while squaring the base. Handles negative exponents by inverting the base. Time complexity: O(log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-69',
    slug: 'sqrtx',
    title: 'Sqrt(x)',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer. The returned integer should be non-negative as well.',
    constraints: ['0 <= x <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def mySqrt(self, x: int) -> int:
        if x < 2: return x
        low, high = 1, x // 2
        ans = 1
        while low <= high:
            mid = (low + high) // 2
            sq = mid * mid
            if sq == x:
                return mid
            elif sq < x:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans`,
      cpp: `class Solution {
public:
    int mySqrt(int x) {
        if (x < 2) return x;
        long long low = 1, high = x / 2, ans = 1;
        while (low <= high) {
            long long mid = low + (high - low) / 2;
            long long sq = mid * mid;
            if (sq == x) return mid;
            if (sq < x) { ans = mid; low = mid + 1; }
            else high = mid - 1;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int mySqrt(int x) {
        if (x < 2) return x;
        long low = 1, high = x / 2, ans = 1;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            long sq = mid * mid;
            if (sq == x) return (int) mid;
            if (sq < x) { ans = mid; low = mid + 1; }
            else high = mid - 1;
        }
        return (int) ans;
    }
}`,
      explanation: 'Use binary search in range [1, x / 2]. Look for an integer mid such that mid * mid <= x, updating the best answer so far when mid * mid < x. Time complexity: O(log x), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-71',
    slug: 'simplify-path',
    title: 'Simplify Path',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'Given an absolute path for a Unix-style file system, simplify it to the canonical path.',
    constraints: ['1 <= path.length <= 3000', 'path consists of English letters, digits, period \'.\', slash \'/\', or \'_\'.'],
    solutions: {
      python: `class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        for part in path.split("/"):
            if part == "..":
                if stack: stack.pop()
            elif part and part != ".":
                stack.append(part)
        return "/" + "/".join(stack)`,
      cpp: `class Solution {
public:
    string simplifyPath(string path) {
        vector<string> stack;
        stringstream ss(path);
        string part;
        while (getline(ss, part, '/')) {
            if (part == "..") {
                if (!stack.empty()) stack.pop_back();
            } else if (!part.empty() && part != ".") {
                stack.push_back(part);
            }
        }
        string res = "";
        for (const string& s : stack) res += "/" + s;
        return res.empty() ? "/" : res;
    }
};`,
      java: `class Solution {
    public String simplifyPath(String path) {
        Stack<String> s = new Stack<>();
        for (String part : path.split("/")) {
            if (part.equals("..")) {
                if (!s.isEmpty()) s.pop();
            } else if (!part.isEmpty() && !part.equals(".")) {
                s.push(part);
            }
        }
        StringBuilder sb = new StringBuilder();
        for (String dir : s) sb.append("/").append(dir);
        return sb.length() == 0 ? "/" : sb.toString();
    }
}`,
      explanation: 'Split the path by "/". Use a stack to track directory names. If the folder name is "..", pop from stack. If it is a valid name and not ".", push to stack. Join elements with "/" at the end. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-80',
    slug: 'remove-duplicates-from-sorted-array-ii',
    title: 'Remove Duplicates from Sorted Array II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given an integer array `nums` sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears **at most twice**. The relative order of the elements should be kept the same.',
    constraints: ['1 <= nums.length <= 3 * 10^4', '-10^4 <= nums[i] <= 10^4', 'nums is sorted in non-decreasing order.'],
    solutions: {
      python: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if len(nums) <= 2: return len(nums)
        w = 2
        for r in range(2, len(nums)):
            if nums[r] != nums[w - 2]:
                nums[w] = nums[r]
                w += 1
        return w`,
      cpp: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.size() <= 2) return nums.size();
        int w = 2;
        for (int r = 2; r < nums.size(); ++r) {
            if (nums[r] != nums[w - 2]) nums[w++] = nums[r];
        }
        return w;
    }
};`,
      java: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length <= 2) return nums.length;
        int w = 2;
        for (int r = 2; r < nums.length; r++) {
            if (nums[r] != nums[w - 2]) nums[w++] = nums[r];
        }
        return w;
    }
}`,
      explanation: 'Use two pointers: a write pointer w and a read pointer r. Start both at index 2. Since each unique element can appear at most twice, copy nums[r] to nums[w] if nums[r] != nums[w - 2]. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-83',
    slug: 'remove-duplicates-from-sorted-list',
    title: 'Remove Duplicates from Sorted List',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list **sorted** as well.',
    constraints: ['The number of nodes in the list is in the range [0, 300].', '-100 <= Node.val <= 100', 'The list is guaranteed to be sorted in ascending order.'],
    solutions: {
      python: `class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        curr = head
        while curr and curr.next:
            if curr.val == curr.next.val:
                curr.next = curr.next.next
            else:
                curr = curr.next
        return head`,
      cpp: `class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* curr = head;
        while (curr && curr->next) {
            if (curr->val == curr->next->val) {
                ListNode* temp = curr->next;
                curr->next = curr->next->next;
                delete temp;
            } else {
                curr = curr->next;
            }
        }
        return head;
    }
};`,
      java: `class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode curr = head;
        while (curr != null && curr.next != null) {
            if (curr.val == curr.next.val) curr.next = curr.next.next;
            else curr = curr.next;
        }
        return head;
    }
}`,
      explanation: 'Iterate through the list. If the current node and the next node share the same value, set the next node pointer to skip the duplicate. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-95',
    slug: 'unique-binary-search-trees-ii',
    title: 'Unique Binary Search Trees II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given an integer `n`, return *all the structurally unique **BST\'s** (binary search trees), which has exactly `n` nodes of unique values from `1` to `n`*. You may return the answer in **any order**.',
    constraints: ['1 <= n <= 8'],
    solutions: {
      python: `class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        if n == 0: return []
        def generate(start, end):
            if start > end: return [None]
            res = []
            for i in range(start, end + 1):
                left_trees = generate(start, i - 1)
                right_trees = generate(i + 1, end)
                for l in left_trees:
                    for r in right_trees:
                        root = TreeNode(i, l, r)
                        res.append(root)
            return res
        return generate(1, n)`,
      cpp: `class Solution {
    vector<TreeNode*> generate(int start, int end) {
        if (start > end) return {nullptr};
        vector<TreeNode*> res;
        for (int i = start; i <= end; ++i) {
            auto left = generate(start, i - 1);
            auto right = generate(i + 1, end);
            for (auto l : left) {
                for (auto r : right) {
                    res.push_back(new TreeNode(i, l, r));
                }
            }
        }
        return res;
    }
public:
    vector<TreeNode*> generateTrees(int n) {
        if (n == 0) return {};
        return generate(1, n);
    }
};`,
      java: `class Solution {
    public List<TreeNode> generateTrees(int n) {
        if (n == 0) return new ArrayList<>();
        return generate(1, n);
    }
    private List<TreeNode> generate(int start, int end) {
        List<TreeNode> res = new ArrayList<>();
        if (start > end) { res.add(null); return res; }
        for (int i = start; i <= end; i++) {
            List<TreeNode> left = generate(start, i - 1);
            List<TreeNode> right = generate(i + 1, end);
            for (TreeNode l : left) {
                for (TreeNode r : right) {
                    res.add(new TreeNode(i, l, r));
                }
            }
        }
        return res;
    }
}`,
      explanation: 'Use recursion. To generate all unique BSTs in range [start, end], iterate over i treating it as the root node. Generate all left subtrees from [start, i - 1] and right subtrees from [i + 1, end], and link all combinations together. Time complexity: O(4^n / n^(3/2)) Catalan numbers, Space complexity: O(4^n / n^(3/2)).'
    }
  },
  {
    id: 'lc-96',
    slug: 'unique-binary-search-trees',
    title: 'Unique Binary Search Trees',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given an integer `n`, return the number of structurally unique **BST\'s** (binary search trees) which has exactly `n` nodes of unique values from `1` to `n`.',
    constraints: ['1 <= n <= 19'],
    solutions: {
      python: `class Solution:
    def numTrees(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[0] = dp[1] = 1
        for i in range(2, n + 1):
            for j in range(1, i + 1):
                dp[i] += dp[j - 1] * dp[i - j]
        return dp[n]`,
      cpp: `class Solution {
public:
    int numTrees(int n) {
        vector<int> dp(n + 1, 0);
        dp[0] = dp[1] = 1;
        for (int i = 2; i <= n; ++i) {
            for (int j = 1; j <= i; ++j) {
                dp[i] += dp[j - 1] * dp[i - j];
            }
        }
        return dp[n];
    }
};`,
      java: `class Solution {
    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1; dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                dp[i] += dp[j - 1] * dp[i - j];
            }
        }
        return dp[n];
    }
}`,
      explanation: 'Use DP to compute Catalan numbers. dp[i] represents the count of unique BSTs of size i. Transition: loop over root node j: dp[i] += dp[j-1] (left subtree size) * dp[i-j] (right subtree size). Time complexity: O(n^2), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-113',
    slug: 'path-sum-ii',
    title: 'Path Sum II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree and an integer `targetSum`, return all **root-to-leaf** paths where the sum of the node values in the path equals `targetSum`.',
    constraints: ['The number of nodes in the tree is in the range [0, 5000].', '-1000 <= Node.val <= 1000', '-1000 <= targetSum <= 1000'],
    solutions: {
      python: `class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        res = []
        def dfs(node, target, path):
            if not node: return
            path.append(node.val)
            if not node.left and not node.right and node.val == target:
                res.append(path[:])
            dfs(node.left, target - node.val, path)
            dfs(node.right, target - node.val, path)
            path.pop()
        dfs(root, targetSum, [])
        return res`,
      cpp: `class Solution {
    vector<vector<int>> res;
    vector<int> path;
    void dfs(TreeNode* node, int target) {
        if (!node) return;
        path.push_back(node->val);
        if (!node->left && !node->right && node->val == target) res.push_back(path);
        dfs(node->left, target - node->val);
        dfs(node->right, target - node->val);
        path.pop_back();
    }
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        dfs(root, targetSum);
        return res;
    }
};`,
      java: `class Solution {
    List<List<Integer>> res = new ArrayList<>();
    List<Integer> path = new ArrayList<>();
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        dfs(root, targetSum);
        return res;
    }
    private void dfs(TreeNode node, int target) {
        if (node == null) return;
        path.add(node.val);
        if (node.left == null && node.right == null && node.val == target) res.add(new ArrayList<>(path));
        dfs(node.left, target - node.val);
        dfs(node.right, target - node.val);
        path.remove(path.size() - 1);
    }
}`,
      explanation: 'Use backtracking. Traverse down the tree, maintaining a running list representing the path. At each node, subtract its value from targetSum. If we reach a leaf node with value equal to remaining targetSum, store the path. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-119',
    slug: 'pascals-triangle-ii',
    title: 'Pascal\'s Triangle II',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an integer `rowIndex`, return the `rowIndex`-th (0-indexed) row of the Pascal\'s triangle.',
    constraints: ['0 <= rowIndex <= 33'],
    solutions: {
      python: `class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        row = [1] * (rowIndex + 1)
        for i in range(1, rowIndex):
            for j in range(i, 0, -1):
                row[j] += row[j - 1]
        return row`,
      cpp: `class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> row(rowIndex + 1, 1);
        for (int i = 1; i < rowIndex; ++i) {
            for (int j = i; j > 0; --j) {
                row[j] += row[j - 1];
            }
        }
        return row;
    }
};`,
      java: `class Solution {
    public List<Integer> getRow(int rowIndex) {
        Integer[] row = new Integer[rowIndex + 1];
        Arrays.fill(row, 1);
        for (int i = 1; i < rowIndex; i++) {
            for (int j = i; j > 0; j--) {
                row[j] += row[j - 1];
            }
        }
        return Arrays.asList(row);
    }
}`,
      explanation: 'Use a single array representing the row, and update it in-place from right to left (to avoid overriding values needed in the next calculation). Time complexity: O(k^2) where k is rowIndex, Space complexity: O(k).'
    }
  },
  {
    id: 'lc-123',
    slug: 'best-time-to-buy-and-sell-stock-iii',
    title: 'Best Time to Buy and Sell Stock III',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Find the maximum profit you can achieve. You may complete at most **two transactions**.',
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^5'],
    solutions: {
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        b1, s1 = float('inf'), 0
        b2, s2 = float('inf'), 0
        for p in prices:
            b1 = min(b1, p)
            s1 = max(s1, p - b1)
            b2 = min(b2, p - s1)
            s2 = max(s2, p - b2)
        return s2`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int b1 = INT_MAX, s1 = 0;
        int b2 = INT_MAX, s2 = 0;
        for (int p : prices) {
            b1 = min(b1, p);
            s1 = max(s1, p - b1);
            b2 = min(b2, p - s1);
            s2 = max(s2, p - b2);
        }
        return s2;
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int b1 = Integer.MAX_VALUE, s1 = 0;
        int b2 = Integer.MAX_VALUE, s2 = 0;
        for (int p : prices) {
            b1 = Math.min(b1, p);
            s1 = Math.max(s1, p - b1);
            b2 = Math.min(b2, p - s1);
            s2 = Math.max(s2, p - b2);
        }
        return s2;
    }
}`,
      explanation: 'Track four states: cost of first buy (b1), profit of first sell (s1), cost of second buy after applying first profit (b2), and final profit (s2). Iterate once and update values. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-188',
    slug: 'best-time-to-buy-and-sell-stock-iv',
    title: 'Best Time to Buy and Sell Stock IV',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Find the maximum profit you can achieve. You may complete at most `k` transactions.',
    constraints: ['1 <= k <= 100', '1 <= prices.length <= 1000', '0 <= prices[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        if not prices: return 0
        if k >= len(prices) // 2:
            return sum(max(0, prices[i] - prices[i-1]) for i in range(1, len(prices)))
        buy = [float('inf')] * (k + 1)
        sell = [0] * (k + 1)
        for p in prices:
            for i in range(1, k + 1):
                buy[i] = min(buy[i], p - sell[i - 1])
                sell[i] = max(sell[i], p - buy[i])
        return sell[k]`,
      cpp: `class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        if (prices.empty()) return 0;
        if (k >= prices.size() / 2) {
            int profit = 0;
            for (int i = 1; i < prices.size(); ++i) {
                if (prices[i] > prices[i-1]) profit += prices[i] - prices[i-1];
            }
            return profit;
        }
        vector<int> buy(k + 1, INT_MAX);
        vector<int> sell(k + 1, 0);
        for (int p : prices) {
            for (int i = 1; i <= k; i++) {
                buy[i] = min(buy[i], p - sell[i - 1]);
                sell[i] = max(sell[i], p - buy[i]);
            }
        }
        return sell[k];
    }
};`,
      java: `class Solution {
    public int maxProfit(int k, int[] prices) {
        if (prices.length == 0) return 0;
        if (k >= prices.length / 2) {
            int profit = 0;
            for (int i = 1; i < prices.length; i++) {
                if (prices[i] > prices[i-1]) profit += prices[i] - prices[i-1];
            }
            return profit;
        }
        int[] buy = new int[k + 1];
        int[] sell = new int[k + 1];
        Arrays.fill(buy, Integer.MAX_VALUE);
        for (int p : prices) {
            for (int i = 1; i <= k; i++) {
                buy[i] = Math.min(buy[i], p - sell[i - 1]);
                sell[i] = Math.max(sell[i], p - buy[i]);
            }
        }
        return sell[k];
    }
}`,
      explanation: 'Generalization of Stock III. If k is larger than n/2, engage in unlimited transactions greedily. Otherwise, maintain arrays buy and sell of size k+1 and update states. Time complexity: O(n * k), Space complexity: O(k).'
    }
  },
  {
    id: 'lc-137',
    slug: 'single-number-ii',
    title: 'Single Number II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given an integer array `nums` where every element appears **three times** except for one, which appears **exactly once**. Find the single element and return it.',
    constraints: ['1 <= nums.length <= 3 * 10^4', '-2^31 <= nums[i] <= 2^31 - 1', 'Each element appears three times except for one.'],
    solutions: {
      python: `class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        ones = zeros = 0
        for n in nums:
            ones = (ones ^ n) & ~zeros
            zeros = (zeros ^ n) & ~ones
        return ones`,
      cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ones = 0, zeros = 0;
        for (int n : nums) {
            ones = (ones ^ n) & ~zeros;
            zeros = (zeros ^ n) & ~ones;
        }
        return ones;
    }
};`,
      java: `class Solution {
    public int singleNumber(int[] nums) {
        int ones = 0, zeros = 0;
        for (int n : nums) {
            ones = (ones ^ n) & ~zeros;
            zeros = (zeros ^ n) & ~ones;
        }
        return ones;
    }
}`,
      explanation: 'Track the bitwise transition states using two variables ones and zeros. Bit counts modulo 3 are handled via logical masks. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-260',
    slug: 'single-number-iii',
    title: 'Single Number III',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given an integer array `nums`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.',
    constraints: ['2 <= nums.length <= 3 * 10^4', '-2^31 <= nums[i] <= 2^31 - 1', 'Each element appears twice except for two elements.'],
    solutions: {
      python: `class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        xor = 0
        for n in nums: xor ^= n
        # Get the lowest set bit
        diff = xor & -xor
        n1 = n2 = 0
        for n in nums:
            if n & diff: n1 ^= n
            else: n2 ^= n
        return [n1, n2]`,
      cpp: `class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        long long xor_sum = 0;
        for (int n : nums) xor_sum ^= n;
        long long diff = xor_sum & -xor_sum;
        int n1 = 0, n2 = 0;
        for (int n : nums) {
            if (n & diff) n1 ^= n;
            else n2 ^= n;
        }
        return {n1, n2};
    }
};`,
      java: `class Solution {
    public int[] singleNumber(int[] nums) {
        int xor = 0;
        for (int n : nums) xor ^= n;
        int diff = xor & -xor;
        int n1 = 0, n2 = 0;
        for (int n : nums) {
            if ((n & diff) != 0) n1 ^= n;
            else n2 ^= n;
        }
        return new int[]{n1, n2};
    }
}`,
      explanation: 'XOR all elements. The result is xor_sum = a ^ b. Find the lowest set bit (diff = xor_sum & -xor_sum). Divide all numbers into two groups based on whether they have this bit set, and XOR each group to isolate a and b. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-165',
    slug: 'compare-version-numbers',
    title: 'Compare Version Numbers',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given two version strings, `version1` and `version2`, compare them. Return `-1` if version1 < version2, `1` if version1 > version2, and `0` otherwise.',
    constraints: ['1 <= version1.length, version2.length <= 500', 'version1 and version2 consist of digits and \'.\'.'],
    solutions: {
      python: `class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        v1 = version1.split(".")
        v2 = version2.split(".")
        for i in range(max(len(v1), len(v2))):
            num1 = int(v1[i]) if i < len(v1) else 0
            num2 = int(v2[i]) if i < len(v2) else 0
            if num1 < num2: return -1
            if num1 > num2: return 1
        return 0`,
      cpp: `class Solution {
public:
    int compareVersion(string version1, string version2) {
        int i = 0, j = 0, n1 = version1.size(), n2 = version2.size();
        while (i < n1 || j < n2) {
            int num1 = 0, num2 = 0;
            while (i < n1 && version1[i] != '.') num1 = num1 * 10 + (version1[i++] - '0');
            while (j < n2 && version2[j] != '.') num2 = num2 * 10 + (version2[j++] - '0');
            if (num1 < num2) return -1;
            if (num1 > num2) return 1;
            i++; j++; // skip dots
        }
        return 0;
    }
};`,
      java: `class Solution {
    public int compareVersion(String version1, String version2) {
        int i = 0, j = 0, n1 = version1.length(), n2 = version2.length();
        while (i < n1 || j < n2) {
            int num1 = 0, num2 = 0;
            while (i < n1 && version1.charAt(i) != '.') num1 = num1 * 10 + (version1.charAt(i++) - '0');
            while (j < n2 && version2.charAt(j) != '.') num2 = num2 * 10 + (version2.charAt(j++) - '0');
            if (num1 < num2) return -1;
            if (num1 > num2) return 1;
            i++; j++; // skip dots
        }
        return 0;
    }
}`,
      explanation: 'Use two pointers to parse version strings segment by segment between periods. Compare numeric segment values, treating missing segments as 0. Time complexity: O(n + m), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-166',
    slug: 'fraction-to-recurring-decimal',
    title: 'Fraction to Recurring Decimal',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two integers representing the `numerator` and `denominator` of a fraction, return the fraction in string format. If the fractional part is repeating, enclose the repeating part in parentheses.',
    constraints: ['-2^31 <= numerator, denominator <= 2^31 - 1', 'denominator != 0'],
    solutions: {
      python: `class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        if numerator == 0: return "0"
        res = []
        if (numerator < 0) ^ (denominator < 0): res.append("-")
        num, den = abs(numerator), abs(denominator)
        res.append(str(num // den))
        rem = num % den
        if rem == 0: return "".join(res)
        res.append(".")
        pos = {}
        while rem != 0:
            if rem in pos:
                res.insert(pos[rem], "(")
                res.append(")")
                break
            pos[rem] = len(res)
            rem *= 10
            res.append(str(rem // den))
            rem %= den
        return "".join(res)`,
      cpp: `class Solution {
public:
    string fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) return "0";
        string res = "";
        if ((numerator < 0) ^ (denominator < 0)) res += "-";
        long long num = abs((long long)numerator);
        long long den = abs((long long)denominator);
        res += to_string(num / den);
        long long rem = num % den;
        if (rem == 0) return res;
        res += ".";
        unordered_map<long long, int> pos;
        while (rem != 0) {
            if (pos.count(rem)) {
                res.insert(pos[rem], "(");
                res += ")";
                break;
            }
            pos[rem] = res.size();
            rem *= 10;
            res += to_string(rem / den);
            rem %= den;
        }
        return res;
    }
};`,
      java: `class Solution {
    public String fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) return "0";
        StringBuilder sb = new StringBuilder();
        if ((numerator < 0) ^ (denominator < 0)) sb.append("-");
        long num = Math.abs((long) numerator);
        long den = Math.abs((long) denominator);
        sb.append(num / den);
        long rem = num % den;
        if (rem == 0) return sb.toString();
        sb.append(".");
        Map<Long, Integer> pos = new HashMap<>();
        while (rem != 0) {
            if (pos.containsKey(rem)) {
                sb.insert(pos.get(rem), "(");
                sb.append(")");
                break;
            }
            pos.put(rem, sb.length());
            rem *= 10;
            sb.append(rem / den);
            rem %= den;
        }
        return sb.toString();
    }
}`,
      explanation: 'Perform long division. Record the index positions of remainders in a hash map. If a remainder repeats, insert parentheses to enclose the repeating digits. Time complexity: O(denominator) (length of recurrence), Space complexity: O(denominator).'
    }
  },
  {
    id: 'lc-168',
    slug: 'excel-sheet-column-title',
    title: 'Excel Sheet Column Title',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an integer `columnNumber`, return its corresponding column title as it appears in an Excel sheet.',
    constraints: ['1 <= columnNumber <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        res = []
        while columnNumber > 0:
            columnNumber -= 1
            res.append(chr(65 + columnNumber % 26))
            columnNumber //= 26
        return "".join(reversed(res))`,
      cpp: `class Solution {
public:
    string convertToTitle(int columnNumber) {
        string res = "";
        while (columnNumber > 0) {
            columnNumber--;
            res += (char)('A' + columnNumber % 26);
            columnNumber /= 26;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`,
      java: `class Solution {
    public String convertToTitle(int columnNumber) {
        StringBuilder sb = new StringBuilder();
        while (columnNumber > 0) {
            columnNumber--;
            sb.append((char)('A' + columnNumber % 26));
            columnNumber /= 26;
        }
        return sb.reverse().toString();
    }
}`,
      explanation: 'This is equivalent to converting a 1-based index to base 26. In each step, decrement the number by 1, append the character representing columnNumber % 26, and divide by 26. Reverse the result. Time complexity: O(log_26 columnNumber), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-171',
    slug: 'excel-sheet-column-number',
    title: 'Excel Sheet Column Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given a string `columnTitle` that represents the column title as appears in an Excel sheet, return its corresponding column number.',
    constraints: ['1 <= columnTitle.length <= 7', 'columnTitle consists of only uppercase English letters.'],
    solutions: {
      python: `class Solution:
    def titleToNumber(self, columnTitle: str) -> int:
        res = 0
        for c in columnTitle:
            res = res * 26 + (ord(c) - 64)
        return res`,
      cpp: `class Solution {
public:
    int titleToNumber(string columnTitle) {
        long long res = 0;
        for (char c : columnTitle) {
            res = res * 26 + (c - 'A' + 1);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int titleToNumber(String columnTitle) {
        int res = 0;
        for (int i = 0; i < columnTitle.length(); i++) {
            res = res * 26 + (columnTitle.charAt(i) - 'A' + 1);
        }
        return res;
    }
}`,
      explanation: 'Convert column title from base 26 to decimal. Iterate through the characters, multiplying the accumulator by 26 and adding (c - \'A\' + 1). Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-172',
    slug: 'factorial-trailing-zeroes',
    title: 'Factorial Trailing Zeroes',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an integer `n`, return the number of trailing zeroes in `n!`.',
    constraints: ['0 <= n <= 10^4'],
    solutions: {
      python: `class Solution:
    def trailingZeroes(self, n: int) -> int:
        count = 0
        while n > 0:
            n //= 5
            count += n
        return count`,
      cpp: `class Solution {
public:
    int trailingZeroes(int n) {
        int count = 0;
        while (n > 0) {
            count += n / 5;
            n /= 5;
        }
        return count;
    }
};`,
      java: `class Solution {
    public int trailingZeroes(int n) {
        int count = 0;
        while (n > 0) {
            count += n / 5;
            n /= 5;
        }
        return count;
    }
}`,
      explanation: 'Trailing zeroes are formed by products of 2 and 5. Since prime factors of 2 are always more frequent than 5, simply count the number of factors of 5 in n! using Legendre\'s formula: n/5 + n/25 + ... Time complexity: O(log_5 n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-179',
    slug: 'largest-number',
    title: 'Largest Number',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given a list of non-negative integers `nums`, arrange them such that they form the largest number and return it.',
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 10^9'],
    solutions: {
      python: `from functools import cmp_to_key
class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        strs = list(map(str, nums))
        def comp(a, b):
            if a + b > b + a: return -1
            if a + b < b + a: return 1
            return 0
        strs.sort(key=cmp_to_key(comp))
        res = "".join(strs)
        return "0" if res[0] == "0" else res`,
      cpp: `class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string> strs;
        for (int x : nums) strs.push_back(to_string(x));
        sort(strs.begin(), strs.end(), [](const string& a, const string& b) {
            return a + b > b + a;
        });
        string res = "";
        for (const string& s : strs) res += s;
        return res[0] == '0' ? "0" : res;
    }
};`,
      java: `class Solution {
    public String largestNumber(int[] nums) {
        String[] strs = new String[nums.length];
        for (int i = 0; i < nums.length; i++) strs[i] = String.valueOf(nums[i]);
        Arrays.sort(strs, (a, b) -> (b + a).compareTo(a + b));
        StringBuilder sb = new StringBuilder();
        for (String s : strs) sb.append(s);
        return sb.charAt(0) == '0' ? "0" : sb.toString();
    }
}`,
      explanation: 'Greedy sorting with custom comparator. Sort the numbers as strings based on the combination comparison (a + b vs b + a). If sorting makes the largest number starting with "0", return "0". Time complexity: O(n log n * L) where L is max string length, Space complexity: O(n).'
    }
  },
  {
    id: 'lc-187',
    slug: 'repeated-dna-sequences',
    title: 'Repeated DNA Sequences',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Sliding Window',
    description: 'Find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.',
    constraints: ['1 <= s.length <= 10^5', 's consists of only \'A\', \'C\', \'G\', and \'T\'.'],
    solutions: {
      python: `class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        seen = set()
        res = set()
        for i in range(len(s) - 9):
            sub = s[i : i + 10]
            if sub in seen:
                res.add(sub)
            else:
                seen.add(sub)
        return list(res)`,
      cpp: `class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        if (s.size() < 10) return {};
        unordered_set<string> seen, res;
        for (int i = 0; i <= (int)s.size() - 10; ++i) {
            string sub = s.substr(i, 10);
            if (seen.count(sub)) res.insert(sub);
            seen.insert(sub);
        }
        return vector<string>(res.begin(), res.end());
    }
};`,
      java: `class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        if (s.length() < 10) return new ArrayList<>();
        Set<String> seen = new HashSet<>();
        Set<String> res = new HashSet<>();
        for (int i = 0; i <= s.length() - 10; i++) {
            String sub = s.substring(i, i + 10);
            if (!seen.add(sub)) res.add(sub);
        }
        return new ArrayList<>(res);
    }
}`,
      explanation: 'Use a sliding window of size 10. Record each 10-character substring in a hash set. If a substring is already present, add it to the result set. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-201',
    slug: 'bitwise-and-of-numbers-range',
    title: 'Bitwise AND of Numbers Range',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given two integers `left` and `right` representing the range `[left, right]`, return the bitwise AND of all numbers in this range, inclusive.',
    constraints: ['0 <= left <= right <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        shift = 0
        while left < right:
            left >>= 1
            right >>= 1
            shift += 1
        return left << shift`,
      cpp: `class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int shift = 0;
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift++;
        }
        return left << shift;
    }
};`,
      java: `class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        int shift = 0;
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift++;
        }
        return left << shift;
    }
}`,
      explanation: 'The bitwise AND of a range of numbers is equal to the common prefix of the binary representations of the range boundaries left and right. Shift both numbers right until they are equal, and shift back. Time complexity: O(1) (at most 32 shifts), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-204',
    slug: 'count-primes',
    title: 'Count Primes',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an integer `n`, return the number of prime numbers that are strictly less than `n`.',
    constraints: ['0 <= n <= 5 * 10^6'],
    solutions: {
      python: `class Solution:
    def countPrimes(self, n: int) -> int:
        if n < 3: return 0
        prime = [True] * n
        prime[0] = prime[1] = False
        for p in range(2, int(n**0.5) + 1):
            if prime[p]:
                for i in range(p*p, n, p):
                    prime[i] = False
        return sum(prime)`,
      cpp: `class Solution {
public:
    int countPrimes(int n) {
        if (n < 3) return 0;
        vector<bool> prime(n, true);
        prime[0] = prime[1] = false;
        for (int p = 2; p * p < n; p++) {
            if (prime[p]) {
                for (int i = p * p; i < n; i += p) prime[i] = false;
            }
        }
        int count = 0;
        for (int i = 2; i < n; ++i) if (prime[i]) count++;
        return count;
    }
};`,
      java: `class Solution {
    public int countPrimes(int n) {
        if (n < 3) return 0;
        boolean[] prime = new boolean[n];
        Arrays.fill(prime, true);
        prime[0] = false; prime[1] = false;
        for (int p = 2; p * p < n; p++) {
            if (prime[p]) {
                for (int i = p * p; i < n; i += p) prime[i] = false;
            }
        }
        int count = 0;
        for (int i = 2; i < n; i++) if (prime[i]) count++;
        return count;
    }
}`,
      explanation: 'Use the Sieve of Eratosthenes. Maintain a boolean array to mark composite numbers. Start marking from p * p. Count the remaining primes less than n. Time complexity: O(n log log n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-223',
    slug: 'rectangle-area',
    title: 'Rectangle Area',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given the coordinates of two rectilinear rectangles in a 2D plane, return the total area covered by the two rectangles. The first rectangle is defined by its bottom-left corner `(ax1, ay1)` and top-right corner `(ax2, ay2)`. The second rectangle is defined by its bottom-left corner `(bx1, by1)` and top-right corner `(bx2, by2)`.',
    constraints: ['-10^4 <= ax1, ay1, ax2, ay2, bx1, by1, bx2, by2 <= 10^4'],
    solutions: {
      python: `class Solution:
    def computeArea(self, ax1: int, ay1: int, ax2: int, ay2: int, bx1: int, by1: int, bx2: int, by2: int) -> int:
        area1 = (ax2 - ax1) * (ay2 - ay1)
        area2 = (bx2 - bx1) * (by2 - by1)
        
        # Calculate overlap boundaries
        cx1 = max(ax1, bx1)
        cy1 = max(ay1, by1)
        cx2 = min(ax2, bx2)
        cy2 = min(ay2, by2)
        
        overlap = 0
        if cx1 < cx2 and cy1 < cy2:
            overlap = (cx2 - cx1) * (cy2 - cy1)
            
        return area1 + area2 - overlap`,
      cpp: `class Solution {
public:
    int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {
        int area1 = (ax2 - ax1) * (ay2 - ay1);
        int area2 = (bx2 - bx1) * (by2 - by1);
        int cx1 = max(ax1, bx1);
        int cy1 = max(ay1, by1);
        int cx2 = min(ax2, bx2);
        int cy2 = min(ay2, by2);
        int overlap = 0;
        if (cx1 < cx2 && cy1 < cy2) overlap = (cx2 - cx1) * (cy2 - cy1);
        return area1 + area2 - overlap;
    }
};`,
      java: `class Solution {
    public int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {
        int area1 = (ax2 - ax1) * (ay2 - ay1);
        int area2 = (bx2 - bx1) * (by2 - by1);
        int cx1 = Math.max(ax1, bx1);
        int cy1 = Math.max(ay1, by1);
        int cx2 = Math.min(ax2, bx2);
        int cy2 = Math.min(ay2, by2);
        int overlap = 0;
        if (cx1 < cx2 && cy1 < cy2) overlap = (cx2 - cx1) * (cy2 - cy1);
        return area1 + area2 - overlap;
    }
}`,
      explanation: 'Calculate the area of both rectangles individually. Then calculate the overlapping width and height by taking the max of bottom-left coordinates and min of top-right coordinates. Total area is area1 + area2 - overlap. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-227',
    slug: 'basic-calculator-ii',
    title: 'Basic Calculator II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'Given a string `s` which represents an expression, evaluate this expression.',
    constraints: ['1 <= s.length <= 3 * 10^5', 's consists of integers and operators (\'+\', \'-\', \'*\', \'/\') separated by spaces.'],
    solutions: {
      python: `class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        num = 0
        sign = "+"
        for i, c in enumerate(s):
            if c.isdigit():
                num = num * 10 + int(c)
            if (not c.isdigit() and c != " ") or i == len(s) - 1:
                if sign == "+":
                    stack.append(num)
                elif sign == "-":
                    stack.append(-num)
                elif sign == "*":
                    stack.append(stack.pop() * num)
                elif sign == "/":
                    stack.append(int(stack.pop() / num))
                sign = c
                num = 0
        return sum(stack)`,
      cpp: `class Solution {
public:
    int calculate(string s) {
        vector<int> stack;
        int num = 0;
        char sign = '+';
        for (int i = 0; i < s.size(); ++i) {
            char c = s[i];
            if (isdigit(c)) num = num * 10 + (c - '0');
            if ((!isdigit(c) && c != ' ') || i == s.size() - 1) {
                if (sign == '+') stack.push_back(num);
                else if (sign == '-') stack.push_back(-num);
                else if (sign == '*') { stack.back() *= num; }
                else if (sign == '/') { stack.back() /= num; }
                sign = c;
                num = 0;
            }
        }
        int sum = 0;
        for (int x : stack) sum += x;
        return sum;
    }
};`,
      java: `class Solution {
    public int calculate(String s) {
        Stack<Integer> stack = new Stack<>();
        int num = 0;
        char sign = '+';
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) num = num * 10 + (c - '0');
            if ((!Character.isDigit(c) && c != ' ') || i == s.length() - 1) {
                if (sign == '+') stack.push(s -> stack.push(num)); // wait, correct Java push:
                if (sign == '+') stack.push(num);
                else if (sign == '-') stack.push(-num);
                else if (sign == '*') stack.push(stack.pop() * num);
                else if (sign == '/') stack.push(stack.pop() / num);
                sign = c;
                num = 0;
            }
        }
        int sum = 0;
        while (!stack.isEmpty()) sum += stack.pop();
        return sum;
    }
}`,
      explanation: 'Use a stack to store values. Parse numbers and check operators. Multiplication and division have higher precedence, so perform them immediately by popping the top element, applying the operation, and pushing the result. Addition and subtraction values are pushed directly (subtraction as negative). Sum the stack at the end. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-229',
    slug: 'majority-element-ii',
    title: 'Majority Element II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an integer array of size `n`, find all elements that appear more than `⌊ n/3 ⌋` times.',
    constraints: ['1 <= nums.length <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
    solutions: {
      python: `class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        if not nums: return []
        c1, c2, count1, count2 = None, None, 0, 0
        for n in nums:
            if n == c1:
                count1 += 1
            elif n == c2:
                count2 += 1
            elif count1 == 0:
                c1, count1 = n, 1
            elif count2 == 0:
                c2, count2 = n, 1
            else:
                count1 -= 1
                count2 -= 1
        res = []
        for c in [c1, c2]:
            if nums.count(c) > len(nums) // 3:
                res.append(c)
        return list(set(res))`,
      cpp: `class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        int c1 = 0, c2 = 0, cnt1 = 0, cnt2 = 0;
        for (int n : nums) {
            if (n == c1) cnt1++;
            else if (n == c2) cnt2++;
            else if (cnt1 == 0) { c1 = n; cnt1 = 1; }
            else if (cnt2 == 0) { c2 = n; cnt2 = 1; }
            else { cnt1--; cnt2--; }
        }
        cnt1 = 0; cnt2 = 0;
        for (int n : nums) {
            if (n == c1) cnt1++;
            else if (n == c2) cnt2++;
        }
        vector<int> res;
        if (cnt1 > nums.size() / 3) res.push_back(c1);
        if (cnt2 > nums.size() / 3) res.push_back(c2);
        return res;
    }
};`,
      java: `class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int c1 = 0, c2 = 0, cnt1 = 0, cnt2 = 0;
        for (int n : nums) {
            if (n == c1) cnt1++;
            else if (n == c2) cnt2++;
            else if (cnt1 == 0) { c1 = n; cnt1 = 1; }
            else if (cnt2 == 0) { c2 = n; cnt2 = 1; }
            else { cnt1--; cnt2--; }
        }
        cnt1 = 0; cnt2 = 0;
        for (int n : nums) {
            if (n == c1) cnt1++;
            else if (n == c2) cnt2++;
        }
        List<Integer> res = new ArrayList<>();
        if (cnt1 > nums.length / 3) res.add(c1);
        if (cnt2 > nums.length / 3) res.add(c2);
        return res;
    }
}`,
      explanation: 'Use Boyer-Moore Majority Vote Algorithm modified for n/3 threshold. Since there can be at most 2 majority elements with frequency > n/3, maintain 2 candidates and 2 counters. In a second pass, verify the counts of the two candidates. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-237',
    slug: 'delete-node-in-a-linked-list',
    title: 'Delete Node in a Linked List',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'There is a singly-linked list head and we want to delete a node in it. You are given the node to be deleted. You will **not** be given access to the first node of head.',
    constraints: ['The number of the nodes in the given list is in the range [2, 1000].', '-1000 <= Node.val <= 1000', 'The value of each node in the list is unique.', 'The node to be deleted is in the list and is not a tail node.'],
    solutions: {
      python: `class Solution:
    def deleteNode(self, node):
        node.val = node.next.val
        node.next = node.next.next`,
      cpp: `class Solution {
public:
    void deleteNode(ListNode* node) {
        node->val = node->next->val;
        ListNode* temp = node->next;
        node->next = node->next->next;
        delete temp;
    }
};`,
      java: `class Solution {
    public void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}`,
      explanation: 'Since we don\'t have access to the previous node, we copy the value of the next node into the current node, and set the next node pointer to skip the next node. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-241',
    slug: 'different-ways-to-add-parentheses',
    title: 'Different Ways to Add Parentheses',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Given a string `expression` of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in **any order**.',
    constraints: ['1 <= expression.length <= 20', 'expression consists of digits and the operators \'+\', \'-\', and \'*\'.'],
    solutions: {
      python: `class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        if expression.isdigit(): return [int(expression)]
        res = []
        for i, c in enumerate(expression):
            if c in "+-*":
                left = self.diffWaysToCompute(expression[:i])
                right = self.diffWaysToCompute(expression[i+1:])
                for l in left:
                    for r in right:
                        if c == "+": res.append(l + r)
                        elif c == "-": res.append(l - r)
                        elif c == "*": res.append(l * r)
        return res`,
      cpp: `class Solution {
public:
    vector<int> diffWaysToCompute(string expression) {
        bool isDigit = true;
        for (char c : expression) if (!isdigit(c)) isDigit = false;
        if (isDigit) return {stoi(expression)};
        vector<int> res;
        for (int i = 0; i < expression.size(); ++i) {
            char c = expression[i];
            if (c == '+' || c == '-' || c == '*') {
                auto left = diffWaysToCompute(expression.substr(0, i));
                auto right = diffWaysToCompute(expression.substr(i + 1));
                for (int l : left) {
                    for (int r : right) {
                        if (c == '+') res.push_back(l + r);
                        else if (c == '-') res.push_back(l - r);
                        else if (c == '*') res.push_back(l * r);
                    }
                }
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<Integer> diffWaysToCompute(String expression) {
        List<Integer> res = new ArrayList<>();
        boolean isDigit = true;
        for (char c : expression.toCharArray()) if (!Character.isDigit(c)) isDigit = false;
        if (isDigit) { res.add(Integer.parseInt(expression)); return res; }
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c == '+' || c == '-' || c == '*') {
                List<Integer> left = diffWaysToCompute(expression.substring(0, i));
                List<Integer> right = diffWaysToCompute(expression.substring(i + 1));
                for (int l : left) {
                    for (int r : right) {
                        if (c == '+') res.add(l + r);
                        else if (c == '-') res.add(l - r);
                        else if (c == '*') res.add(l * r);
                    }
                }
            }
        }
        return res;
    }
}`,
      explanation: 'Use Divide and Conquer / Backtracking. Loop through the expression. When encountering an operator, split the expression into left and right sub-expressions, recursively compute their results, and combine all combinations using the operator. Time complexity: O(4^n / n^(3/2)) Catalan, Space complexity: O(n) recursion stack.'
    }
  },
  {
    id: 'lc-264',
    slug: 'ugly-number-ii',
    title: 'Ugly Number II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'An **ugly number** is a positive integer whose prime factors are limited to `2`, `3`, and `5`.\n\nGiven an integer `n`, return the `n`-th **ugly number**.',
    constraints: ['1 <= n <= 1690'],
    solutions: {
      python: `class Solution:
    def nthUglyNumber(self, n: int) -> int:
        dp = [0] * n
        dp[0] = 1
        i2 = i3 = i5 = 0
        for i in range(1, n):
            next2, next3, next5 = dp[i2]*2, dp[i3]*3, dp[i5]*5
            dp[i] = min(next2, next3, next5)
            if dp[i] == next2: i2 += 1
            if dp[i] == next3: i3 += 1
            if dp[i] == next5: i5 += 1
        return dp[-1]`,
      cpp: `class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> dp(n);
        dp[0] = 1;
        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; ++i) {
            int next2 = dp[i2] * 2;
            int next3 = dp[i3] * 3;
            int next5 = dp[i5] * 5;
            dp[i] = min({next2, next3, next5});
            if (dp[i] == next2) i2++;
            if (dp[i] == next3) i3++;
            if (dp[i] == next5) i5++;
        }
        return dp[n - 1];
    }
};`,
      java: `class Solution {
    public int nthUglyNumber(int n) {
        int[] dp = new int[n];
        dp[0] = 1;
        int i2 = 0, i3 = 0, i5 = 0;
        for (int i = 1; i < n; i++) {
            int next2 = dp[i2] * 2;
            int next3 = dp[i3] * 3;
            int next5 = dp[i5] * 5;
            dp[i] = Math.min(next2, Math.min(next3, next5));
            if (dp[i] == next2) i2++;
            if (dp[i] == next3) i3++;
            if (dp[i] == next5) i5++;
        }
        return dp[n - 1];
    }
}`,
      explanation: 'Use DP with three pointers. Maintain three pointers (i2, i3, i5) pointing to elements in the DP table. The next ugly number is min(dp[i2]*2, dp[i3]*3, dp[i5]*5). Increment pointers that match the selected value. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-274',
    slug: 'h-index',
    title: 'H-Index',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `i`-th paper, return the researcher\'s h-index.',
    constraints: ['n == citations.length', '1 <= n <= 5000', '0 <= citations[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        buckets = [0] * (n + 1)
        for c in citations:
            if c >= n: buckets[n] += 1
            else: buckets[c] += 1
        count = 0
        for i in range(n, -1, -1):
            count += buckets[i]
            if count >= i:
                return i
        return 0`,
      cpp: `class Solution {
public:
    int hIndex(vector<int>& citations) {
        int n = citations.size();
        vector<int> buckets(n + 1, 0);
        for (int c : citations) {
            if (c >= n) buckets[n]++;
            else buckets[c]++;
        }
        int count = 0;
        for (int i = n; i >= 0; --i) {
            count += buckets[i];
            if (count >= i) return i;
        }
        return 0;
    }
};`,
      java: `class Solution {
    public int hIndex(int[] citations) {
        int n = citations.length;
        int[] buckets = new int[n + 1];
        for (int c : citations) {
            if (c >= n) buckets[n]++;
            else buckets[c]++;
        }
        int count = 0;
        for (int i = n; i >= 0; i--) {
            count += buckets[i];
            if (count >= i) return i;
        }
        return 0;
    }
}`,
      explanation: 'Use bucket sort. Put papers in buckets based on citation counts (clamp values >= n to bucket n). Scan from bucket n down to 0, accumulating paper counts until the cumulative count exceeds or equals index i. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-275',
    slug: 'h-index-ii',
    title: 'H-Index II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given an array of integers `citations` sorted in **ascending order**, return the researcher\'s h-index.',
    constraints: ['n == citations.length', '1 <= n <= 10^5', '0 <= citations[i] <= 1000', 'citations is sorted in ascending order.'],
    solutions: {
      python: `class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        low, high = 0, n - 1
        while low <= high:
            mid = (low + high) // 2
            if citations[mid] >= n - mid:
                high = mid - 1
            else:
                low = mid + 1
        return n - low`,
      cpp: `class Solution {
public:
    int hIndex(vector<int>& citations) {
        int n = citations.size();
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (citations[mid] >= n - mid) high = mid - 1;
            else low = mid + 1;
        }
        return n - low;
    }
};`,
      java: `class Solution {
    public int hIndex(int[] citations) {
        int n = citations.length;
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (citations[mid] >= n - mid) high = mid - 1;
            else low = mid + 1;
        }
        return n - low;
    }
}`,
      explanation: 'Since the array is already sorted, perform binary search to locate the first index mid where citations[mid] >= n - mid. The result h-index is then n - mid. Time complexity: O(log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-278',
    slug: 'first-bad-version',
    title: 'First Bad Version',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.\n\nSuppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.',
    constraints: ['1 <= k <= n <= 2^31 - 1'],
    solutions: {
      python: `# The isBadVersion API is already defined for you.
class Solution:
    def firstBadVersion(self, n: int) -> int:
        low, high = 1, n
        ans = n
        while low <= high:
            mid = (low + high) // 2
            if isBadVersion(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans`,
      cpp: `// The isBadVersion API is defined for you.
// bool isBadVersion(int version);
class Solution {
public:
    int firstBadVersion(int n) {
        int low = 1, high = n, ans = n;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (isBadVersion(mid)) { ans = mid; high = mid - 1; }
            else low = mid + 1;
        }
        return ans;
    }
};`,
      java: `/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */
public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int low = 1, high = n, ans = n;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (isBadVersion(mid)) { ans = mid; high = mid - 1; }
            else low = mid + 1;
        }
        return ans;
    }
}`,
      explanation: 'Use binary search. If version mid is bad, then it could be the first bad version, so store it as candidate and search left (high = mid - 1). Otherwise, search right (low = mid + 1). Time complexity: O(log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-279',
    slug: 'perfect-squares',
    title: 'Perfect Squares',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given an integer `n`, return the least number of perfect square numbers that sum to `n`.',
    constraints: ['1 <= n <= 10^4'],
    solutions: {
      python: `class Solution:
    def numSquares(self, n: int) -> int:
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        for i in range(1, n + 1):
            j = 1
            while j * j <= i:
                dp[i] = min(dp[i], dp[i - j * j] + 1)
                j += 1
        return dp[n]`,
      cpp: `class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n + 1, INT_MAX);
        dp[0] = 0;
        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j * j <= i; ++j) {
                dp[i] = min(dp[i], dp[i - j * j] + 1);
            }
        }
        return dp[n];
    }
};`,
      java: `class Solution {
    public int numSquares(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j * j <= i; j++) {
                dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
            }
        }
        return dp[n];
    }
}`,
      explanation: 'Use 1D DP. dp[i] represents the minimum number of perfect squares to sum to i. Transition: dp[i] = min(dp[i], dp[i - j*j] + 1) for each j such that j*j <= i. Time complexity: O(n * sqrt(n)), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-284',
    slug: 'peeking-iterator',
    title: 'Peeking Iterator',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Design an iterator that supports the `peek` operation on an existing iterator in addition to the `next` and `hasNext` operations.',
    constraints: ['The number of elements in the iterator is in the range [1, 1000].', 'At most 1000 calls will be made to next, peek, and hasNext.'],
    solutions: {
      python: `# Helper class Iterator is pre-defined
class PeekingIterator:
    def __init__(self, iterator):
        self.iterator = iterator
        self.next_val = iterator.next() if iterator.hasNext() else None
    def peek(self):
        return self.next_val
    def next(self):
        ret = self.next_val
        self.next_val = self.iterator.next() if self.iterator.hasNext() else None
        return ret
    def hasNext(self):
        return self.next_val is not None`,
      cpp: `// Helper class Iterator is pre-defined
class PeekingIterator : public Iterator {
    int nextVal;
    bool hasNextVal;
public:
    PeekingIterator(const vector<int>& nums) : Iterator(nums) {
        hasNextVal = Iterator::hasNext();
        if (hasNextVal) nextVal = Iterator::next();
    }
    int peek() { return nextVal; }
    int next() {
        int ret = nextVal;
        hasNextVal = Iterator::hasNext();
        if (hasNextVal) nextVal = Iterator::next();
        return ret;
    }
    bool hasNext() const { return hasNextVal; }
};`,
      java: `// Helper class Iterator is pre-defined
class PeekingIterator implements Iterator<Integer> {
    private Iterator<Integer> iter;
    private Integer nextVal = null;
    public PeekingIterator(Iterator<Integer> iterator) {
        iter = iterator;
        if (iter.hasNext()) nextVal = iter.next();
    }
    public Integer peek() { return nextVal; }
    @Override
    public Integer next() {
        Integer ret = nextVal;
        nextVal = iter.hasNext() ? iter.next() : null;
        return ret;
    }
    @Override
    public boolean hasNext() { return nextVal != null; }
}`,
      explanation: 'Cache the next element of the iterator in a helper variable next_val. Return this cached value on peek() calls without moving the original iterator. Advance it on next() calls. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-289',
    slug: 'game-of-life',
    title: 'Game of Life',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'According to Wikipedia\'s article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."\n\nGiven a `board` of `m x n` cells, update the board in-place using the transition rules.',
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 25', 'board[i][j] is 0 or 1.'],
    solutions: {
      python: `class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        m, n = len(board), len(board[0])
        # Use state mapping to modify in-place:
        # 0 -> 0: 0
        # 1 -> 1: 1
        # 1 -> 0: 2 (was live, now dead)
        # 0 -> 1: 3 (was dead, now live)
        for r in range(m):
            for c in range(n):
                live_neighbors = 0
                for dr in [-1,0,1]:
                    for dc in [-1,0,1]:
                        if dr == 0 and dc == 0: continue
                        nr, nc = r+dr, c+dc
                        if 0 <= nr < m and 0 <= nc < n and board[nr][nc] in (1, 2):
                            live_neighbors += 1
                if board[r][c] == 1:
                    if live_neighbors < 2 or live_neighbors > 3:
                        board[r][c] = 2
                else:
                    if live_neighbors == 3:
                        board[r][c] = 3
        for r in range(m):
            for c in range(n):
                if board[r][c] == 2: board[r][c] = 0
                elif board[r][c] == 3: board[r][c] = 1`,
      cpp: `class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int m = board.size(), n = board[0].size();
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                int live = 0;
                for (int dr = -1; dr <= 1; ++dr) {
                    for (int dc = -1; dc <= 1; ++dc) {
                        if (dr == 0 && dc == 0) continue;
                        int nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nc >= 0 && nr < m && nc < n && (board[nr][nc] == 1 || board[nr][nc] == 2)) {
                            live++;
                        }
                    }
                }
                if (board[r][c] == 1) {
                    if (live < 2 || live > 3) board[r][c] = 2;
                } else {
                    if (live == 3) board[r][c] = 3;
                }
            }
        }
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (board[r][c] == 2) board[r][c] = 0;
                else if (board[r][c] == 3) board[r][c] = 1;
            }
        }
    }
};`,
      java: `class Solution {
    public void gameOfLife(int[][] board) {
        int m = board.length, n = board[0].length;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int live = 0;
                for (int dr = -1; dr <= 1; dr++) {
                    for (int dc = -1; dc <= 1; dc++) {
                        if (dr == 0 && dc == 0) continue;
                        int nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nc >= 0 && nr < m && nc < n && (board[nr][nc] == 1 || board[nr][nc] == 2)) {
                            live++;
                        }
                    }
                }
                if (board[r][c] == 1) {
                    if (live < 2 || live > 3) board[r][c] = 2;
                } else {
                    if (live == 3) board[r][c] = 3;
                }
            }
        }
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 2) board[r][c] = 0;
                else if (board[r][c] == 3) board[r][c] = 1;
            }
        }
    }
}`,
      explanation: 'Update in-place by mapping transitions using intermediate state codes (e.g. 2 for alive-to-dead, 3 for dead-to-alive). In a second pass, map codes back to 0 and 1. Time complexity: O(m * n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-304',
    slug: 'range-sum-query-2d-immutable',
    title: 'Range Sum Query 2D - Immutable',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given a 2D matrix `matrix`, handle multiple queries of the sum of the elements of `matrix` inside the rectangle defined by its upper left corner `(row1, col1)` and lower right corner `(row2, col2)`.',
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 200', '-10^4 <= matrix[i][j] <= 10^4', 'At most 10^4 calls will be made to sumRegion.'],
    solutions: {
      python: `class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        if not matrix: return
        m, n = len(matrix), len(matrix[0])
        self.prefix = [[0] * (n + 1) for _ in range(m + 1)]
        for r in range(m):
            for c in range(n):
                self.prefix[r+1][c+1] = matrix[r][c] + self.prefix[r][c+1] + self.prefix[r+1][c] - self.prefix[r][c]
    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return (self.prefix[row2 + 1][col2 + 1] - self.prefix[row1][col2 + 1] - 
                self.prefix[row2 + 1][col1] + self.prefix[row1][col1])`,
      cpp: `class NumMatrix {
    vector<vector<int>> prefix;
public:
    NumMatrix(vector<vector<int>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return;
        int m = matrix.size(), n = matrix[0].size();
        prefix.resize(m + 1, vector<int>(n + 1, 0));
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                prefix[r+1][c+1] = matrix[r][c] + prefix[r][c+1] + prefix[r+1][c] - prefix[r][c];
            }
        }
    }
    int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix[row2+1][col2+1] - prefix[row1][col2+1] - prefix[row2+1][col1] + prefix[row1][col1];
    }
};`,
      java: `class NumMatrix {
    int[][] prefix;
    public NumMatrix(int[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return;
        int m = matrix.length, n = matrix[0].length;
        prefix = new int[m + 1][n + 1];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                prefix[r+1][c+1] = matrix[r][c] + prefix[r][c+1] + prefix[r+1][c] - prefix[r][c];
            }
        }
    }
    public int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix[row2+1][col2+1] - prefix[row1][col2+1] - prefix[row2+1][col1] + prefix[row1][col1];
    }
}`,
      explanation: 'Precompute 2D prefix sums. The sum of region (row1, col1) to (row2, col2) is calculated as: prefix[row2+1][col2+1] - prefix[row1][col2+1] - prefix[row2+1][col1] + prefix[row1][col1]. Time complexity: O(m * n) initialization, O(1) query. Space complexity: O(m * n).'
    }
  },
  {
    id: 'lc-306',
    slug: 'additive-number',
    title: 'Additive Number',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'An additive number is a string whose digits can form an additive sequence. A valid additive sequence should contain at least three numbers.',
    constraints: ['1 <= num.length <= 35', 'num consists only of digits.'],
    solutions: {
      python: `class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        n = len(num)
        for i in range(1, n // 2 + 1):
            if num[0] == "0" and i > 1: break
            n1 = int(num[:i])
            for j in range(1, (n - i) // 2 + 1):
                if num[i] == "0" and j > 1: break
                n2 = int(num[i : i + j])
                
                # Check sequence from index i+j onwards
                k = i + j
                n1_t, n2_t = n1, n2
                while k < n:
                    total = n1_t + n2_t
                    sum_str = str(total)
                    if not num.startswith(sum_str, k):
                        break
                    k += len(sum_str)
                    n1_t, n2_t = n2_t, total
                else:
                    if k == n: return True
        return False`,
      cpp: `class Solution {
public:
    bool isAdditiveNumber(string num) {
        int n = num.size();
        for (int i = 1; i <= n / 2; ++i) {
            if (num[0] == '0' && i > 1) break;
            long double n1 = stold(num.substr(0, i));
            for (int j = 1; j <= (n - i) / 2; ++j) {
                if (num[i] == '0' && j > 1) break;
                long double n2 = stold(num.substr(i, j));
                int k = i + j;
                long double n1_t = n1, n2_t = n2;
                while (k < n) {
                    long double total = n1_t + n2_t;
                    string sum_str = to_string((long long)total);
                    // handle large numbers to_string fix
                    if (sum_str.find('.') != string::npos) {
                        sum_str = sum_str.substr(0, sum_str.find('.'));
                    }
                    if (num.substr(k).find(sum_str) != 0) break;
                    k += sum_str.size();
                    n1_t = n2_t;
                    n2_t = total;
                }
                if (k == n) return true;
            }
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean isAdditiveNumber(String num) {
        int n = num.length();
        for (int i = 1; i <= n / 2; i++) {
            if (num.charAt(0) == '0' && i > 1) break;
            java.math.BigInteger n1 = new java.math.BigInteger(num.substring(0, i));
            for (int j = 1; j <= (n - i) / 2; j++) {
                if (num.charAt(i) == '0' && j > 1) break;
                java.math.BigInteger n2 = new java.math.BigInteger(num.substring(i, i + j));
                int k = i + j;
                java.math.BigInteger n1_t = n1, n2_t = n2;
                while (k < n) {
                    java.math.BigInteger total = n1_t.add(n2_t);
                    String sumStr = total.toString();
                    if (!num.startsWith(sumStr, k)) break;
                    k += sumStr.length();
                    n1_t = n2_t;
                    n2_t = total;
                }
                if (k == n) return true;
            }
        }
        return false;
    }
}`,
      explanation: 'Use backtracking. Fix the first two numbers (lengths i and j). Check if the rest of the string matches the additive sequence. Ensure no numbers contain leading zeros except 0 itself. Time complexity: O(n^3), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-307',
    slug: 'range-sum-query-mutable',
    title: 'Range Sum Query - Mutable',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given an integer array `nums`, handle multiple queries of the sum of the elements of `nums` between indices `left` and `right` inclusive, while supporting updating the element at a specific index.',
    constraints: ['1 <= nums.length <= 3 * 10^4', '-100 <= nums[i] <= 100', '0 <= index < nums.length', '-100 <= val <= 100', '0 <= left <= right < nums.length', 'At most 3 * 10^4 calls will be made to update and sumRange.'],
    solutions: {
      python: `class NumArray:
    def __init__(self, nums: List[int]):
        self.n = len(nums)
        self.tree = [0] * (self.n + 1)
        self.nums = nums
        for i, val in enumerate(nums):
            self._add(i + 1, val)
    def _add(self, idx, val):
        while idx <= self.n:
            self.tree[idx] += val
            idx += idx & -idx
    def update(self, index: int, val: int) -> None:
        diff = val - self.nums[index]
        self.nums[index] = val
        self._add(index + 1, diff)
    def _query(self, idx):
        ans = 0
        while idx > 0:
            ans += self.tree[idx]
            idx -= idx & -idx
        return ans
    def sumRange(self, left: int, right: int) -> int:
        return self._query(right + 1) - self._query(left)`,
      cpp: `class NumArray {
    int n;
    vector<int> tree;
    vector<int> numbers;
    void add(int idx, int val) {
        while (idx <= n) { tree[idx] += val; idx += idx & -idx; }
    }
    int query(int idx) {
        int ans = 0;
        while (idx > 0) { ans += tree[idx]; idx -= idx & -idx; }
        return ans;
    }
public:
    NumArray(vector<int>& nums) {
        n = nums.size();
        tree.resize(n + 1, 0);
        numbers = nums;
        for (int i = 0; i < n; ++i) add(i + 1, nums[i]);
    }
    void update(int index, int val) {
        int diff = val - numbers[index];
        numbers[index] = val;
        add(index + 1, diff);
    }
    int sumRange(int left, int right) {
        return query(right + 1) - query(left);
    }
};`,
      java: `class NumArray {
    int n;
    int[] tree;
    int[] numbers;
    private void add(int idx, int val) {
        while (idx <= n) { tree[idx] += val; idx += idx & -idx; }
    }
    private int query(int idx) {
        int ans = 0;
        while (idx > 0) { ans += tree[idx]; idx -= idx & -idx; }
        return ans;
    }
    public NumArray(int[] nums) {
        n = nums.length;
        tree = new int[n + 1];
        numbers = nums;
        for (int i = 0; i < n; i++) add(i + 1, nums[i]);
    }
    public void update(int index, int val) {
        int diff = val - numbers[index];
        numbers[index] = val;
        add(index + 1, diff);
    }
    public int sumRange(int left, int right) {
        return query(right + 1) - query(left);
    }
}`,
      explanation: 'Use a Binary Indexed Tree (Fenwick Tree). It supports both range sum queries and point updates in logarithmic time. Time complexity: O(n log n) construction, O(log n) update/query. Space complexity: O(n).'
    }
  },
  {
    id: 'cf-996A',
    slug: 'cf-996a',
    title: 'Hit the Lottery',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Greedy',
    description: 'Allen has `n` dollars. The bank has bills of denominations 1, 5, 10, 20, and 100. Find the minimum number of bills Allen needs to represent `n` dollars.',
    constraints: ['1 <= n <= 10^9'],
    solutions: {
      python: `n = int(input())
bills = [100, 20, 10, 5, 1]
count = 0
for b in bills:
    count += n // b
    n %= b
print(count)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    int bills[] = {100, 20, 10, 5, 1};
    int count = 0;
    for (int b : bills) {
        count += n / b;
        n %= b;
    }
    cout << count;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        int[] bills = {100, 20, 10, 5, 1};
        int count = 0;
        for (int b : bills) {
            count += n / b;
            n %= b;
        }
        System.out.println(count);
    }
}`,
      explanation: 'Greedy approach: divide the remaining money by the largest bill denomination available. Add the count to the total and update the remaining money with the modulo. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-750A',
    slug: 'cf-750a',
    title: 'New Year and Hurry',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Binary Search',
    description: 'Limak wants to solve `n` problems in a contest of 4 hours (240 minutes). He needs `k` minutes to travel to the party. Problem `i` takes `5*i` minutes to solve. Find the maximum number of problems Limak can solve before traveling to the party.',
    constraints: ['1 <= n <= 10', '1 <= k <= 240'],
    solutions: {
      python: `n, k = map(int, input().split())
time_left = 240 - k
ans = 0
for i in range(1, n + 1):
    if time_left >= 5 * i:
        ans += 1
        time_left -= 5 * i
    else:
        break
print(ans)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    int timeLeft = 240 - k, ans = 0;
    for (int i = 1; i <= n; ++i) {
        if (timeLeft >= 5 * i) { ans++; timeLeft -= 5 * i; }
        else break;
    }
    cout << ans;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        int timeLeft = 240 - k, ans = 0;
        for (int i = 1; i <= n; i++) {
            if (timeLeft >= 5 * i) { ans++; timeLeft -= 5 * i; }
            else break;
        }
        System.out.println(ans);
    }
}`,
      explanation: 'Calculate the total time left for solving problems as 240 - k. Solve problems sequentially, subtracting 5 * i from the remaining time until time runs out or all n problems are solved. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1352A',
    slug: 'cf-1352a',
    title: 'Sum of Round Numbers',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'A positive integer is called round if it is of the form d00...0. Given an integer n, represent it as a sum of round numbers using the minimum number of terms.',
    constraints: ['1 <= t <= 10^4', '1 <= n <= 10^4'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    n = input()
    res = []
    for i, d in enumerate(reversed(n)):
        if d != "0":
            res.append(d + "0" * i)
    print(len(res))
    print(*res)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        string s; cin >> s;
        vector<string> res;
        int sz = s.size();
        for (int i = 0; i < sz; ++i) {
            if (s[i] != '0') {
                res.push_back(s[i] + string(sz - 1 - i, '0'));
            }
        }
        cout << res.size() << "\\n";
        for (int i = 0; i < res.size(); i++) cout << res[i] << (i == res.size() - 1 ? "" : " ");
        cout << "\\n";
    }
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            String s = sc.next();
            List<String> res = new ArrayList<>();
            int sz = s.length();
            for (int i = 0; i < sz; i++) {
                if (s.charAt(i) != '0') {
                    res.add(s.charAt(i) + "0".repeat(sz - 1 - i));
                }
            }
            System.out.println(res.size());
            for (int i = 0; i < res.size(); i++) System.out.print(res.get(i) + (i == res.size() - 1 ? "" : " "));
            System.out.println();
        }
    }
}`,
      explanation: 'Break the number down into its individual digit place values. For each non-zero digit at 10^i place value, output digit * 10^i. Time complexity: O(log n) digits, Space complexity: O(log n).'
    }
  },
  {
    id: 'cf-1367A',
    slug: 'cf-1367a',
    title: 'Short Substrings',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Alice came up with a string `a`. She wrote down all two-grams of this string from left to right, resulting in a string `b`. Given `b`, restore the original string `a`.',
    constraints: ['1 <= t <= 1000', '2 <= |b| <= 100', '|b| is even.'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    b = input()
    res = [b[0]]
    for i in range(1, len(b), 2):
        res.append(b[i])
    print("".join(res))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        string b; cin >> b;
        string a = "";
        a += b[0];
        for (int i = 1; i < b.size(); i += 2) {
            a += b[i];
        }
        cout << a << "\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            String b = sc.next();
            StringBuilder sb = new StringBuilder();
            sb.append(b.charAt(0));
            for (int i = 1; i < b.length(); i += 2) {
                sb.append(b.charAt(i));
            }
            System.out.println(sb);
        }
    }
}`,
      explanation: 'In the encoded string b, the first character is kept, and then every second character is appended (representing the end of each two-gram overlap). Loop with step of 2 to reconstruct the original string. Time complexity: O(|b|), Space complexity: O(|b|).'
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
