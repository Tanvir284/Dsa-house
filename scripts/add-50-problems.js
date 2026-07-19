/**
 * Add 50 more problems to problems_arena.json
 * These are carefully curated popular LeetCode + Codeforces problems
 * with real descriptions, correct constraints, and working solutions.
 *
 * Usage: node scripts/add-50-problems.js
 */

const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const NEW_PROBLEMS = [
  // ─── EASY ────────────────────────────────────────────────────────
  {
    id: 'lc-9',
    slug: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an integer `x`, return `true` if `x` is a **palindrome**, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.\n\nFor example, `121` is a palindrome while `123` is not.\n\n**Follow up:** Could you solve it without converting the integer to a string?',
    constraints: ['-2^31 <= x <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        rev, original = 0, x
        while x > 0:
            rev = rev * 10 + x % 10
            x //= 10
        return rev == original`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0) return false;
        long rev = 0, original = x;
        while (x > 0) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }
        return rev == original;
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) return false;
        long rev = 0, original = x;
        while (x > 0) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }
        return rev == original;
    }
}`,
      explanation: 'Reverse the number mathematically by repeatedly extracting the last digit and building a reversed number. Compare with the original. O(log n) time, O(1) space.'
    }
  },
  {
    id: 'lc-13',
    slug: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Array',
    description: 'Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.\n\nGiven a roman numeral, convert it to an integer.\n\nIf a smaller value appears before a larger value, it is subtracted. For example, `IV` = 4, `IX` = 9.',
    constraints: ['1 <= s.length <= 15', "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').", 'It is guaranteed that s is a valid roman numeral in the range [1, 3999].'],
    solutions: {
      python: `class Solution:
    def romanToInt(self, s: str) -> int:
        vals = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
        result = 0
        for i in range(len(s)):
            if i + 1 < len(s) and vals[s[i]] < vals[s[i+1]]:
                result -= vals[s[i]]
            else:
                result += vals[s[i]]
        return result`,
      cpp: `class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char,int> m = {{'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}};
        int result = 0;
        for (int i = 0; i < s.size(); i++) {
            if (i + 1 < s.size() && m[s[i]] < m[s[i+1]])
                result -= m[s[i]];
            else
                result += m[s[i]];
        }
        return result;
    }
};`,
      java: `class Solution {
    public int romanToInt(String s) {
        Map<Character,Integer> m = Map.of('I',1,'V',5,'X',10,'L',50,'C',100,'D',500,'M',1000);
        int result = 0;
        for (int i = 0; i < s.length(); i++) {
            if (i + 1 < s.length() && m.get(s.charAt(i)) < m.get(s.charAt(i+1)))
                result -= m.get(s.charAt(i));
            else
                result += m.get(s.charAt(i));
        }
        return result;
    }
}`,
      explanation: 'Iterate through the roman numeral string. If the current value is less than the next value, subtract it; otherwise add it. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-14',
    slug: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Write a function to find the **longest common prefix** string amongst an array of strings.\n\nIf there is no common prefix, return an empty string `""`.',
    constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] consists of only lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if not strs:
            return ""
        prefix = strs[0]
        for s in strs[1:]:
            while not s.startswith(prefix):
                prefix = prefix[:-1]
                if not prefix:
                    return ""
        return prefix`,
      cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        string prefix = strs[0];
        for (int i = 1; i < strs.size(); i++) {
            while (strs[i].find(prefix) != 0) {
                prefix = prefix.substr(0, prefix.size() - 1);
                if (prefix.empty()) return "";
            }
        }
        return prefix;
    }
};`,
      java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`,
      explanation: 'Start with the first string as prefix. Shrink the prefix character by character until it matches the start of every other string. O(S) where S is sum of all characters.'
    }
  },
  {
    id: 'lc-26',
    slug: 'remove-duplicates-from-sorted-array',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Two Pointers',
    description: 'Given an integer array `nums` sorted in **non-decreasing order**, remove the duplicates **in-place** such that each unique element appears only **once**. The **relative order** of the elements should be kept the same. Then return the number of unique elements in `nums`.',
    constraints: ['1 <= nums.length <= 3 * 10^4', '-100 <= nums[i] <= 100', 'nums is sorted in non-decreasing order.'],
    solutions: {
      python: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums:
            return 0
        k = 1
        for i in range(1, len(nums)):
            if nums[i] != nums[i - 1]:
                nums[k] = nums[i]
                k += 1
        return k`,
      cpp: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int k = 1;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] != nums[i-1])
                nums[k++] = nums[i];
        }
        return k;
    }
};`,
      java: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int k = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1])
                nums[k++] = nums[i];
        }
        return k;
    }
}`,
      explanation: 'Use a slow pointer k to track the position for the next unique element. Fast pointer scans through the array. When a new unique element is found, copy it to position k. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-27',
    slug: 'remove-element',
    title: 'Remove Element',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Two Pointers',
    description: 'Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` **in-place**. The order of the elements may be changed. Then return the number of elements in `nums` which are not equal to `val`.',
    constraints: ['0 <= nums.length <= 100', '0 <= nums[i] <= 50', '0 <= val <= 100'],
    solutions: {
      python: `class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        k = 0
        for num in nums:
            if num != val:
                nums[k] = num
                k += 1
        return k`,
      cpp: `class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int k = 0;
        for (int num : nums) {
            if (num != val) nums[k++] = num;
        }
        return k;
    }
};`,
      java: `class Solution {
    public int removeElement(int[] nums, int val) {
        int k = 0;
        for (int num : nums) {
            if (num != val) nums[k++] = num;
        }
        return k;
    }
}`,
      explanation: 'Use a write pointer k. Scan through the array; whenever an element is not equal to val, write it to position k and increment k. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-35',
    slug: 'search-insert-position',
    title: 'Search Insert Position',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with `O(log n)` runtime complexity.',
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums contains distinct values sorted in ascending order.', '-10^4 <= target <= 10^4'],
    solutions: {
      python: `class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid
        return lo`,
      cpp: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int lo = 0, hi = nums.size();
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
};`,
      java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int lo = 0, hi = nums.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`,
      explanation: 'Standard binary search for the leftmost position where target can be inserted. O(log n) time, O(1) space.'
    }
  },
  {
    id: 'lc-53',
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given an integer array `nums`, find the **subarray** with the largest sum, and return its sum.\n\nA **subarray** is a contiguous non-empty sequence of elements within an array.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    solutions: {
      python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = cur_sum = nums[0]
        for num in nums[1:]:
            cur_sum = max(num, cur_sum + num)
            max_sum = max(max_sum, cur_sum)
        return max_sum`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0], curSum = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            curSum = max(nums[i], curSum + nums[i]);
            maxSum = max(maxSum, curSum);
        }
        return maxSum;
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0], curSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curSum = Math.max(nums[i], curSum + nums[i]);
            maxSum = Math.max(maxSum, curSum);
        }
        return maxSum;
    }
}`,
      explanation: "Kadane's Algorithm: Maintain current subarray sum. At each element, either extend the current subarray or start a new one. Track the global maximum. O(n) time, O(1) space."
    }
  },
  {
    id: 'lc-55',
    slug: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'You are given an integer array `nums`. You are initially positioned at the array\'s **first index**, and each element in the array represents your maximum jump length at that position.\n\nReturn `true` if you can reach the **last index**, or `false` otherwise.',
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
    solutions: {
      python: `class Solution:
    def canJump(self, nums: List[int]) -> bool:
        reach = 0
        for i, num in enumerate(nums):
            if i > reach:
                return False
            reach = max(reach, i + num)
        return True`,
      cpp: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        int reach = 0;
        for (int i = 0; i < nums.size(); i++) {
            if (i > reach) return false;
            reach = max(reach, i + nums[i]);
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean canJump(int[] nums) {
        int reach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > reach) return false;
            reach = Math.max(reach, i + nums[i]);
        }
        return true;
    }
}`,
      explanation: 'Greedy approach: maintain the farthest index reachable. If the current index exceeds farthest reach, return false. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-70',
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
    constraints: ['1 <= n <= 45'],
    solutions: {
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,
      explanation: 'This is the Fibonacci sequence in disguise. ways(n) = ways(n-1) + ways(n-2). Use two variables to compute iteratively. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-121',
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.',
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    solutions: {
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, maxProfit = 0;
        for (int price : prices) {
            minPrice = min(minPrice, price);
            maxProfit = max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
}`,
      explanation: 'Track the minimum price seen so far. At each day, calculate the potential profit (current price - min price) and update the maximum profit. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-125',
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Two Pointers',
    description: 'A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    solutions: {
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1
        while l < r:
            while l < r and not s[l].isalnum():
                l += 1
            while l < r and not s[r].isalnum():
                r -= 1
            if s[l].lower() != s[r].lower():
                return False
            l += 1
            r -= 1
        return True`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r)))
                return false;
            l++; r--;
        }
        return true;
    }
}`,
      explanation: 'Two pointers from both ends. Skip non-alphanumeric characters and compare lowercase versions. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-136',
    slug: 'single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bitwise Operations (AND, OR, XOR)',
    description: 'Given a **non-empty** array of integers `nums`, every element appears **twice** except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only **constant extra space**.',
    constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Each element in the array appears twice except for one element which appears only once.'],
    solutions: {
      python: `class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        result = 0
        for num in nums:
            result ^= num
        return result`,
      cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int result = 0;
        for (int num : nums) result ^= num;
        return result;
    }
};`,
      java: `class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int num : nums) result ^= num;
        return result;
    }
}`,
      explanation: 'XOR all numbers together. Since a ^ a = 0 and a ^ 0 = a, all pairs cancel out, leaving only the single number. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-169',
    slug: 'majority-element',
    title: 'Majority Element',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array `nums` of size `n`, return the **majority element**.\n\nThe majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.',
    constraints: ['n == nums.length', '1 <= n <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
    solutions: {
      python: `class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        count, candidate = 0, None
        for num in nums:
            if count == 0:
                candidate = num
            count += 1 if num == candidate else -1
        return candidate`,
      cpp: `class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int count = 0, candidate = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
};`,
      java: `class Solution {
    public int majorityElement(int[] nums) {
        int count = 0, candidate = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}`,
      explanation: "Boyer-Moore Voting Algorithm: maintain a candidate and count. When count drops to 0, pick a new candidate. The majority element always survives. O(n) time, O(1) space."
    }
  },
  {
    id: 'lc-217',
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.',
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    solutions: {
      python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(nums) != len(set(nums))`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) return true;
            seen.insert(num);
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) return true;
        }
        return false;
    }
}`,
      explanation: 'Use a HashSet to track seen elements. If an element is already in the set, we found a duplicate. O(n) time, O(n) space.'
    }
  },
  {
    id: 'lc-242',
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Counting Sort',
    description: 'Given two strings `s` and `t`, return `true` if `t` is an **anagram** of `s`, and `false` otherwise.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        count = [0] * 26
        for a, b in zip(s, t):
            count[ord(a) - ord('a')] += 1
            count[ord(b) - ord('a')] -= 1
        return all(c == 0 for c in count)`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        int count[26] = {};
        for (int i = 0; i < s.size(); i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }
};`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }
}`,
      explanation: 'Count character frequencies using a fixed-size array. Increment for s, decrement for t. If all counts are zero, they are anagrams. O(n) time, O(1) space.'
    }
  },
  // ─── MEDIUM ──────────────────────────────────────────────────────
  {
    id: 'lc-2',
    slug: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.',
    constraints: ['The number of nodes in each linked list is in the range [1, 100].', '0 <= Node.val <= 9', 'It is guaranteed that the list represents a number that does not have leading zeros.'],
    solutions: {
      python: `class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        curr, carry = dummy, 0
        while l1 or l2 or carry:
            val = carry
            if l1:
                val += l1.val
                l1 = l1.next
            if l2:
                val += l2.val
                l2 = l2.next
            carry, val = divmod(val, 10)
            curr.next = ListNode(val)
            curr = curr.next
        return dummy.next`,
      cpp: `class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* curr = &dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int val = carry;
            if (l1) { val += l1->val; l1 = l1->next; }
            if (l2) { val += l2->val; l2 = l2->next; }
            carry = val / 10;
            curr->next = new ListNode(val % 10);
            curr = curr->next;
        }
        return dummy.next;
    }
};`,
      java: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int val = carry;
            if (l1 != null) { val += l1.val; l1 = l1.next; }
            if (l2 != null) { val += l2.val; l2 = l2.next; }
            carry = val / 10;
            curr.next = new ListNode(val % 10);
            curr = curr.next;
        }
        return dummy.next;
    }
}`,
      explanation: 'Simulate digit-by-digit addition with carry. Use a dummy head node. Continue until both lists are exhausted and carry is 0. O(max(m,n)) time, O(max(m,n)) space.'
    }
  },
  {
    id: 'lc-5',
    slug: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given a string `s`, return the **longest palindromic substring** in `s`.',
    constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters.'],
    solutions: {
      python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        res = ""
        for i in range(len(s)):
            for l, r in [(i, i), (i, i + 1)]:
                while l >= 0 and r < len(s) and s[l] == s[r]:
                    if r - l + 1 > len(res):
                        res = s[l:r+1]
                    l -= 1
                    r += 1
        return res`,
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        int start = 0, maxLen = 1;
        auto expand = [&](int l, int r) {
            while (l >= 0 && r < s.size() && s[l] == s[r]) { l--; r++; }
            if (r - l - 1 > maxLen) { start = l + 1; maxLen = r - l - 1; }
        };
        for (int i = 0; i < s.size(); i++) { expand(i, i); expand(i, i + 1); }
        return s.substr(start, maxLen);
    }
};`,
      java: `class Solution {
    private int start = 0, maxLen = 1;
    public String longestPalindrome(String s) {
        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i);
            expand(s, i, i + 1);
        }
        return s.substring(start, start + maxLen);
    }
    private void expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        if (r - l - 1 > maxLen) { start = l + 1; maxLen = r - l - 1; }
    }
}`,
      explanation: 'Expand around each center (both odd and even length palindromes). Track the longest found. O(n^2) time, O(1) space.'
    }
  },
  {
    id: 'lc-17',
    slug: 'letter-combinations-of-a-phone-number',
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Given a string containing digits from `2-9` inclusive, return all possible **letter combinations** that the number could represent. Return the answer in **any order**.\n\nA mapping of digits to letters (just like on the telephone buttons) is given. Note that 1 does not map to any letters.',
    constraints: ['0 <= digits.length <= 4', 'digits[i] is a digit in the range [2, 9].'],
    solutions: {
      python: `class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
        phone = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
        result = []
        def backtrack(i, path):
            if i == len(digits):
                result.append(''.join(path))
                return
            for ch in phone[digits[i]]:
                path.append(ch)
                backtrack(i + 1, path)
                path.pop()
        backtrack(0, [])
        return result`,
      cpp: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        vector<string> phone = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
        vector<string> result;
        string path;
        function<void(int)> bt = [&](int i) {
            if (i == digits.size()) { result.push_back(path); return; }
            for (char c : phone[digits[i] - '0']) {
                path.push_back(c);
                bt(i + 1);
                path.pop_back();
            }
        };
        bt(0);
        return result;
    }
};`,
      java: `class Solution {
    private final String[] phone = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    public List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits.isEmpty()) return result;
        backtrack(digits, 0, new StringBuilder(), result);
        return result;
    }
    private void backtrack(String digits, int i, StringBuilder sb, List<String> result) {
        if (i == digits.length()) { result.add(sb.toString()); return; }
        for (char c : phone[digits.charAt(i) - '0'].toCharArray()) {
            sb.append(c);
            backtrack(digits, i + 1, sb, result);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}`,
      explanation: 'Backtracking: for each digit, try all its mapped letters and recurse to the next digit. O(4^n) time where n is number of digits.'
    }
  },
  {
    id: 'lc-19',
    slug: 'remove-nth-node-from-end-of-list',
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a linked list, remove the `n`th node from the **end** of the list and return its head.',
    constraints: ['The number of nodes in the list is sz.', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
    solutions: {
      python: `class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n + 1):
            fast = fast.next
        while fast:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next`,
      cpp: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head);
        ListNode *fast = &dummy, *slow = &dummy;
        for (int i = 0; i <= n; i++) fast = fast->next;
        while (fast) { fast = fast->next; slow = slow->next; }
        ListNode* del = slow->next;
        slow->next = slow->next->next;
        delete del;
        return dummy.next;
    }
};`,
      java: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy, slow = dummy;
        for (int i = 0; i <= n; i++) fast = fast.next;
        while (fast != null) { fast = fast.next; slow = slow.next; }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
      explanation: 'Two-pointer technique with a gap of n+1. When fast reaches the end, slow is right before the node to delete. O(L) time, O(1) space.'
    }
  },
  {
    id: 'lc-24',
    slug: 'swap-nodes-in-pairs',
    title: 'Swap Nodes in Pairs',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list\'s nodes (i.e., only nodes themselves may be changed).',
    constraints: ['The number of nodes in the list is in the range [0, 100].', '0 <= Node.val <= 100'],
    solutions: {
      python: `class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        prev = dummy
        while prev.next and prev.next.next:
            a, b = prev.next, prev.next.next
            prev.next, a.next, b.next = b, b.next, a
            prev = a
        return dummy.next`,
      cpp: `class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode dummy(0, head);
        ListNode* prev = &dummy;
        while (prev->next && prev->next->next) {
            ListNode *a = prev->next, *b = a->next;
            prev->next = b;
            a->next = b->next;
            b->next = a;
            prev = a;
        }
        return dummy.next;
    }
};`,
      java: `class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        while (prev.next != null && prev.next.next != null) {
            ListNode a = prev.next, b = a.next;
            prev.next = b;
            a.next = b.next;
            b.next = a;
            prev = a;
        }
        return dummy.next;
    }
}`,
      explanation: 'Use a dummy node. For each pair (a, b), rewire: prev->b->a->rest. Advance prev to a. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-34',
    slug: 'find-first-and-last-position-of-element-in-sorted-array',
    title: 'Find First and Last Position',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.\n\nIf `target` is not found in the array, return `[-1, -1]`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.',
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9', 'nums is a non-decreasing array.', '-10^9 <= target <= 10^9'],
    solutions: {
      python: `class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def bisect(find_left):
            lo, hi, idx = 0, len(nums) - 1, -1
            while lo <= hi:
                mid = (lo + hi) // 2
                if nums[mid] == target:
                    idx = mid
                    if find_left: hi = mid - 1
                    else: lo = mid + 1
                elif nums[mid] < target: lo = mid + 1
                else: hi = mid - 1
            return idx
        return [bisect(True), bisect(False)]`,
      cpp: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        return {bisect(nums, target, true), bisect(nums, target, false)};
    }
    int bisect(vector<int>& nums, int target, bool left) {
        int lo = 0, hi = nums.size() - 1, idx = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                idx = mid;
                if (left) hi = mid - 1; else lo = mid + 1;
            } else if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return idx;
    }
};`,
      java: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        return new int[]{bisect(nums, target, true), bisect(nums, target, false)};
    }
    private int bisect(int[] nums, int target, boolean left) {
        int lo = 0, hi = nums.length - 1, idx = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                idx = mid;
                if (left) hi = mid - 1; else lo = mid + 1;
            } else if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return idx;
    }
}`,
      explanation: 'Two binary searches: one finds the leftmost occurrence, the other finds the rightmost. O(log n) time, O(1) space.'
    }
  },
  {
    id: 'lc-39',
    slug: 'combination-sum',
    title: 'Combination Sum',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Given an array of **distinct** integers `candidates` and a target integer `target`, return a list of all **unique combinations** of `candidates` where the chosen numbers sum to `target`. You may return the combinations in **any order**.\n\nThe **same** number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.',
    constraints: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', 'All elements of candidates are distinct.', '1 <= target <= 40'],
    solutions: {
      python: `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        result = []
        def backtrack(start, path, remain):
            if remain == 0:
                result.append(path[:])
                return
            for i in range(start, len(candidates)):
                if candidates[i] > remain:
                    continue
                path.append(candidates[i])
                backtrack(i, path, remain - candidates[i])
                path.pop()
        backtrack(0, [], target)
        return result`,
      cpp: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> path;
        function<void(int, int)> bt = [&](int start, int remain) {
            if (remain == 0) { result.push_back(path); return; }
            for (int i = start; i < candidates.size(); i++) {
                if (candidates[i] > remain) continue;
                path.push_back(candidates[i]);
                bt(i, remain - candidates[i]);
                path.pop_back();
            }
        };
        bt(0, target);
        return result;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(candidates, 0, target, new ArrayList<>(), result);
        return result;
    }
    private void backtrack(int[] c, int start, int remain, List<Integer> path, List<List<Integer>> result) {
        if (remain == 0) { result.add(new ArrayList<>(path)); return; }
        for (int i = start; i < c.length; i++) {
            if (c[i] > remain) continue;
            path.add(c[i]);
            backtrack(c, i, remain - c[i], path, result);
            path.remove(path.size() - 1);
        }
    }
}`,
      explanation: 'Backtracking with pruning. Allow reusing the same element (start from i, not i+1). Skip candidates larger than remaining target.'
    }
  },
  {
    id: 'lc-48',
    slug: 'rotate-image',
    title: 'Rotate Image',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given an `n x n` 2D `matrix` representing an image, rotate the image by **90 degrees** (clockwise).\n\nYou have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **Do not** allocate another 2D matrix and do the rotation.',
    constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000'],
    solutions: {
      python: `class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)
        # Transpose
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        # Reverse each row
        for row in matrix:
            row.reverse()`,
      cpp: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                swap(matrix[i][j], matrix[j][i]);
        for (auto& row : matrix)
            reverse(row.begin(), row.end());
    }
};`,
      java: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = tmp;
            }
        for (int[] row : matrix) {
            int l = 0, r = n - 1;
            while (l < r) { int t = row[l]; row[l++] = row[r]; row[r--] = t; }
        }
    }
}`,
      explanation: 'Rotate 90° clockwise = Transpose + Reverse each row. Both operations are in-place. O(n^2) time, O(1) space.'
    }
  },
  {
    id: 'lc-54',
    slug: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an `m x n` `matrix`, return all elements of the `matrix` in **spiral order**.',
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10', '-100 <= matrix[i][j] <= 100'],
    solutions: {
      python: `class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        result = []
        top, bottom, left, right = 0, len(matrix) - 1, 0, len(matrix[0]) - 1
        while top <= bottom and left <= right:
            for c in range(left, right + 1): result.append(matrix[top][c])
            top += 1
            for r in range(top, bottom + 1): result.append(matrix[r][right])
            right -= 1
            if top <= bottom:
                for c in range(right, left - 1, -1): result.append(matrix[bottom][c])
                bottom -= 1
            if left <= right:
                for r in range(bottom, top - 1, -1): result.append(matrix[r][left])
                left += 1
        return result`,
      cpp: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        int top = 0, bot = matrix.size() - 1, left = 0, right = matrix[0].size() - 1;
        while (top <= bot && left <= right) {
            for (int c = left; c <= right; c++) res.push_back(matrix[top][c]); top++;
            for (int r = top; r <= bot; r++) res.push_back(matrix[r][right]); right--;
            if (top <= bot) { for (int c = right; c >= left; c--) res.push_back(matrix[bot][c]); bot--; }
            if (left <= right) { for (int r = bot; r >= top; r--) res.push_back(matrix[r][left]); left++; }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        int top = 0, bot = matrix.length - 1, left = 0, right = matrix[0].length - 1;
        while (top <= bot && left <= right) {
            for (int c = left; c <= right; c++) res.add(matrix[top][c]); top++;
            for (int r = top; r <= bot; r++) res.add(matrix[r][right]); right--;
            if (top <= bot) { for (int c = right; c >= left; c--) res.add(matrix[bot][c]); bot--; }
            if (left <= right) { for (int r = bot; r >= top; r--) res.add(matrix[r][left]); left++; }
        }
        return res;
    }
}`,
      explanation: 'Simulate the spiral using four boundaries: top, bottom, left, right. Traverse right, down, left, up and shrink boundaries after each pass. O(m*n) time.'
    }
  },
  {
    id: 'lc-62',
    slug: 'unique-paths',
    title: 'Unique Paths',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'There is a robot on an `m x n` grid. The robot is initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.\n\nGiven the two integers `m` and `n`, return the number of possible **unique paths** that the robot can take to reach the bottom-right corner.',
    constraints: ['1 <= m, n <= 100'],
    solutions: {
      python: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for _ in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j - 1]
        return dp[-1]`,
      cpp: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[j] += dp[j-1];
        return dp[n-1];
    }
};`,
      java: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[j] += dp[j - 1];
        return dp[n - 1];
    }
}`,
      explanation: 'DP with space optimization: dp[j] = paths from above + paths from left. O(m*n) time, O(n) space.'
    }
  },
  {
    id: 'lc-73',
    slug: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`s.\n\nYou must do it **in place**.',
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 <= m, n <= 200', '-2^31 <= matrix[i][j] <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        first_row = any(matrix[0][j] == 0 for j in range(n))
        first_col = any(matrix[i][0] == 0 for i in range(m))
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = matrix[0][j] = 0
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0
        if first_row:
            for j in range(n): matrix[0][j] = 0
        if first_col:
            for i in range(m): matrix[i][0] = 0`,
      cpp: `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool fr = false, fc = false;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) fr = true;
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) fc = true;
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (matrix[i][j] == 0) matrix[i][0] = matrix[0][j] = 0;
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
        if (fr) for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (fc) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
};`,
      java: `class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean fr = false, fc = false;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) fr = true;
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) fc = true;
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
        if (fr) for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (fc) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
}`,
      explanation: 'Use the first row and column as markers. Record which rows/cols need zeroing, then apply. O(m*n) time, O(1) space.'
    }
  },
  {
    id: 'lc-75',
    slug: 'sort-colors',
    title: 'Sort Colors',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Two Pointers',
    description: 'Given an array `nums` with `n` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library\'s sort function.',
    constraints: ['n == nums.length', '1 <= n <= 300', 'nums[i] is either 0, 1, or 2.'],
    solutions: {
      python: `class Solution:
    def sortColors(self, nums: List[int]) -> None:
        lo, mid, hi = 0, 0, len(nums) - 1
        while mid <= hi:
            if nums[mid] == 0:
                nums[lo], nums[mid] = nums[mid], nums[lo]
                lo += 1; mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[hi] = nums[hi], nums[mid]
                hi -= 1`,
      cpp: `class Solution {
public:
    void sortColors(vector<int>& nums) {
        int lo = 0, mid = 0, hi = nums.size() - 1;
        while (mid <= hi) {
            if (nums[mid] == 0) swap(nums[lo++], nums[mid++]);
            else if (nums[mid] == 1) mid++;
            else swap(nums[mid], nums[hi--]);
        }
    }
};`,
      java: `class Solution {
    public void sortColors(int[] nums) {
        int lo = 0, mid = 0, hi = nums.length - 1;
        while (mid <= hi) {
            if (nums[mid] == 0) { int t = nums[lo]; nums[lo++] = nums[mid]; nums[mid++] = t; }
            else if (nums[mid] == 1) mid++;
            else { int t = nums[mid]; nums[mid] = nums[hi]; nums[hi--] = t; }
        }
    }
}`,
      explanation: "Dutch National Flag algorithm: three pointers partition the array into <0, 0s, 1s, 2s>. Single pass, O(n) time, O(1) space."
    }
  },
  {
    id: 'lc-98',
    slug: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given the `root` of a binary tree, determine if it is a **valid binary search tree** (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys **less than** the node\'s key.\n- The right subtree of a node contains only nodes with keys **greater than** the node\'s key.\n- Both the left and right subtrees must also be binary search trees.',
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node, lo, hi):
            if not node:
                return True
            if node.val <= lo or node.val >= hi:
                return False
            return validate(node.left, lo, node.val) and validate(node.right, node.val, hi)
        return validate(root, float('-inf'), float('inf'))`,
      cpp: `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
    bool validate(TreeNode* node, long lo, long hi) {
        if (!node) return true;
        if (node->val <= lo || node->val >= hi) return false;
        return validate(node->left, lo, node->val) && validate(node->right, node->val, hi);
    }
};`,
      java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    private boolean validate(TreeNode node, long lo, long hi) {
        if (node == null) return true;
        if (node.val <= lo || node.val >= hi) return false;
        return validate(node.left, lo, node.val) && validate(node.right, node.val, hi);
    }
}`,
      explanation: 'Pass valid range (lo, hi) down during recursion. Each node must be within its valid range. O(n) time, O(h) space.'
    }
  },
  {
    id: 'lc-105',
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    title: 'Construct Binary Tree from Preorder and Inorder',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.',
    constraints: ['1 <= preorder.length <= 3000', 'inorder.length == preorder.length', '-3000 <= preorder[i], inorder[i] <= 3000', 'preorder and inorder consist of unique values.', 'Each value of inorder also appears in preorder.', 'preorder is guaranteed to be the preorder traversal of the tree.', 'inorder is guaranteed to be the inorder traversal of the tree.'],
    solutions: {
      python: `class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        inorder_map = {v: i for i, v in enumerate(inorder)}
        self.pre_idx = 0
        def build(lo, hi):
            if lo > hi:
                return None
            root_val = preorder[self.pre_idx]
            self.pre_idx += 1
            root = TreeNode(root_val)
            mid = inorder_map[root_val]
            root.left = build(lo, mid - 1)
            root.right = build(mid + 1, hi)
            return root
        return build(0, len(inorder) - 1)`,
      cpp: `class Solution {
public:
    int preIdx = 0;
    unordered_map<int,int> inMap;
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < inorder.size(); i++) inMap[inorder[i]] = i;
        return build(preorder, 0, inorder.size() - 1);
    }
    TreeNode* build(vector<int>& pre, int lo, int hi) {
        if (lo > hi) return nullptr;
        TreeNode* root = new TreeNode(pre[preIdx++]);
        int mid = inMap[root->val];
        root->left = build(pre, lo, mid - 1);
        root->right = build(pre, mid + 1, hi);
        return root;
    }
};`,
      java: `class Solution {
    private int preIdx = 0;
    private Map<Integer, Integer> inMap = new HashMap<>();
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) inMap.put(inorder[i], i);
        return build(preorder, 0, inorder.length - 1);
    }
    private TreeNode build(int[] pre, int lo, int hi) {
        if (lo > hi) return null;
        TreeNode root = new TreeNode(pre[preIdx++]);
        int mid = inMap.get(root.val);
        root.left = build(pre, lo, mid - 1);
        root.right = build(pre, mid + 1, hi);
        return root;
    }
}`,
      explanation: 'First element of preorder is the root. Find it in inorder to split left/right subtrees. Use a hashmap for O(1) lookup. O(n) time, O(n) space.'
    }
  },
  {
    id: 'lc-128',
    slug: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an unsorted array of integers `nums`, return the length of the **longest consecutive elements sequence**.\n\nYou must write an algorithm that runs in `O(n)` time.',
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    solutions: {
      python: `class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        longest = 0
        for n in num_set:
            if n - 1 not in num_set:
                length = 1
                while n + length in num_set:
                    length += 1
                longest = max(longest, length)
        return longest`,
      cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> s(nums.begin(), nums.end());
        int longest = 0;
        for (int n : s) {
            if (s.find(n - 1) == s.end()) {
                int len = 1;
                while (s.find(n + len) != s.end()) len++;
                longest = max(longest, len);
            }
        }
        return longest;
    }
};`,
      java: `class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);
        int longest = 0;
        for (int n : set) {
            if (!set.contains(n - 1)) {
                int len = 1;
                while (set.contains(n + len)) len++;
                longest = Math.max(longest, len);
            }
        }
        return longest;
    }
}`,
      explanation: 'Put all numbers in a HashSet. For each number that is the start of a sequence (n-1 not in set), count consecutive numbers. O(n) time, O(n) space.'
    }
  },
  {
    id: 'lc-131',
    slug: 'palindrome-partitioning',
    title: 'Palindrome Partitioning',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Given a string `s`, partition `s` such that every substring of the partition is a **palindrome**. Return all possible palindrome partitioning of `s`.',
    constraints: ['1 <= s.length <= 16', 's contains only lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def partition(self, s: str) -> List[List[str]]:
        result = []
        def backtrack(start, path):
            if start == len(s):
                result.append(path[:])
                return
            for end in range(start + 1, len(s) + 1):
                sub = s[start:end]
                if sub == sub[::-1]:
                    path.append(sub)
                    backtrack(end, path)
                    path.pop()
        backtrack(0, [])
        return result`,
      cpp: `class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> result;
        vector<string> path;
        function<void(int)> bt = [&](int start) {
            if (start == s.size()) { result.push_back(path); return; }
            for (int end = start + 1; end <= s.size(); end++) {
                string sub = s.substr(start, end - start);
                string rev(sub.rbegin(), sub.rend());
                if (sub == rev) { path.push_back(sub); bt(end); path.pop_back(); }
            }
        };
        bt(0);
        return result;
    }
};`,
      java: `class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), result);
        return result;
    }
    private void backtrack(String s, int start, List<String> path, List<List<String>> result) {
        if (start == s.length()) { result.add(new ArrayList<>(path)); return; }
        for (int end = start + 1; end <= s.length(); end++) {
            String sub = s.substring(start, end);
            if (isPalin(sub)) { path.add(sub); backtrack(s, end, path, result); path.remove(path.size() - 1); }
        }
    }
    private boolean isPalin(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;
        return true;
    }
}`,
      explanation: 'Backtracking: at each position, try all substrings starting from that position. If the substring is a palindrome, recurse on the rest.'
    }
  },
  {
    id: 'lc-138',
    slug: 'copy-list-with-random-pointer',
    title: 'Copy List with Random Pointer',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.\n\nConstruct a **deep copy** of the list. The deep copy should consist of exactly `n` **brand new** nodes, where each new node has its value set to the value of its corresponding original node.',
    constraints: ['0 <= n <= 1000', '-10^4 <= Node.val <= 10^4', 'Node.random is null or is pointing to some node in the linked list.'],
    solutions: {
      python: `class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head:
            return None
        old_to_new = {}
        curr = head
        while curr:
            old_to_new[curr] = Node(curr.val)
            curr = curr.next
        curr = head
        while curr:
            old_to_new[curr].next = old_to_new.get(curr.next)
            old_to_new[curr].random = old_to_new.get(curr.random)
            curr = curr.next
        return old_to_new[head]`,
      cpp: `class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;
        unordered_map<Node*, Node*> m;
        Node* curr = head;
        while (curr) { m[curr] = new Node(curr->val); curr = curr->next; }
        curr = head;
        while (curr) {
            m[curr]->next = m[curr->next];
            m[curr]->random = m[curr->random];
            curr = curr->next;
        }
        return m[head];
    }
};`,
      java: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        Map<Node, Node> map = new HashMap<>();
        Node curr = head;
        while (curr != null) { map.put(curr, new Node(curr.val)); curr = curr.next; }
        curr = head;
        while (curr != null) {
            map.get(curr).next = map.get(curr.next);
            map.get(curr).random = map.get(curr.random);
            curr = curr.next;
        }
        return map.get(head);
    }
}`,
      explanation: 'Two-pass approach: First pass creates all new nodes and maps old->new. Second pass wires next and random pointers. O(n) time, O(n) space.'
    }
  },
  {
    id: 'lc-139',
    slug: 'word-break',
    title: 'Word Break',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.\n\n**Note** that the same word in the dictionary may be reused multiple times in the segmentation.',
    constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20', 's and wordDict[i] consist of only lowercase English letters.', 'All the strings of wordDict are unique.'],
    solutions: {
      python: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        words = set(wordDict)
        dp = [False] * (len(s) + 1)
        dp[0] = True
        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in words:
                    dp[i] = True
                    break
        return dp[-1]`,
      cpp: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> words(wordDict.begin(), wordDict.end());
        vector<bool> dp(s.size() + 1, false);
        dp[0] = true;
        for (int i = 1; i <= s.size(); i++)
            for (int j = 0; j < i; j++)
                if (dp[j] && words.count(s.substr(j, i - j))) { dp[i] = true; break; }
        return dp[s.size()];
    }
};`,
      java: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++)
            for (int j = 0; j < i; j++)
                if (dp[j] && words.contains(s.substring(j, i))) { dp[i] = true; break; }
        return dp[s.length()];
    }
}`,
      explanation: 'DP: dp[i] = true if s[0..i] can be segmented. For each i, check all j < i: if dp[j] is true and s[j..i] is in dict, then dp[i] = true. O(n^2 * k) time.'
    }
  },
  {
    id: 'lc-143',
    slug: 'reorder-list',
    title: 'Reorder List',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'You are given the head of a singly linked-list. The list can be represented as:\n\n`L0 → L1 → … → Ln - 1 → Ln`\n\nReorder the list to be on the following form:\n\n`L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …`\n\nYou may not modify the values in the list\'s nodes. Only nodes themselves may be changed.',
    constraints: ['The number of nodes in the list is in the range [1, 5 * 10^4].', '1 <= Node.val <= 1000'],
    solutions: {
      python: `class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        # Find middle
        slow, fast = head, head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
        # Reverse second half
        prev, curr = None, slow.next
        slow.next = None
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        # Merge two halves
        first, second = head, prev
        while second:
            t1, t2 = first.next, second.next
            first.next = second
            second.next = t1
            first, second = t1, t2`,
      cpp: `class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        ListNode *slow = head, *fast = head;
        while (fast->next && fast->next->next) { slow = slow->next; fast = fast->next->next; }
        ListNode *prev = nullptr, *curr = slow->next;
        slow->next = nullptr;
        while (curr) { ListNode* nxt = curr->next; curr->next = prev; prev = curr; curr = nxt; }
        ListNode *f = head, *s = prev;
        while (s) { ListNode *t1 = f->next, *t2 = s->next; f->next = s; s->next = t1; f = t1; s = t2; }
    }
};`,
      java: `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) { slow = slow.next; fast = fast.next.next; }
        ListNode prev = null, curr = slow.next;
        slow.next = null;
        while (curr != null) { ListNode nxt = curr.next; curr.next = prev; prev = curr; curr = nxt; }
        ListNode f = head, s = prev;
        while (s != null) { ListNode t1 = f.next, t2 = s.next; f.next = s; s.next = t1; f = t1; s = t2; }
    }
}`,
      explanation: 'Three steps: (1) Find middle with slow/fast pointers. (2) Reverse the second half. (3) Merge the two halves by alternating. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-152',
    slug: 'maximum-product-subarray',
    title: 'Maximum Product Subarray',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given an integer array `nums`, find a subarray that has the **largest product**, and return the product.\n\nThe test cases are generated so that the answer will fit in a **32-bit** integer.',
    constraints: ['1 <= nums.length <= 2 * 10^4', '-10 <= nums[i] <= 10', 'The product of any subarray of nums is guaranteed to fit in a 32-bit integer.'],
    solutions: {
      python: `class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        result = max(nums)
        cur_min = cur_max = 1
        for n in nums:
            vals = (n, n * cur_max, n * cur_min)
            cur_max, cur_min = max(vals), min(vals)
            result = max(result, cur_max)
        return result`,
      cpp: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int result = *max_element(nums.begin(), nums.end());
        int curMin = 1, curMax = 1;
        for (int n : nums) {
            int a = n * curMax, b = n * curMin;
            curMax = max({n, a, b});
            curMin = min({n, a, b});
            result = max(result, curMax);
        }
        return result;
    }
};`,
      java: `class Solution {
    public int maxProduct(int[] nums) {
        int result = nums[0], curMin = 1, curMax = 1;
        for (int n : nums) {
            int a = n * curMax, b = n * curMin;
            curMax = Math.max(n, Math.max(a, b));
            curMin = Math.min(n, Math.min(a, b));
            result = Math.max(result, curMax);
        }
        return result;
    }
}`,
      explanation: 'Track both current max and current min product (a negative min can become max when multiplied by negative). O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-199',
    slug: 'binary-tree-right-side-view',
    title: 'Binary Tree Right Side View',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'BFS',
    description: 'Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.',
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    solutions: {
      python: `class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        result = []
        queue = [root]
        while queue:
            result.append(queue[-1].val)
            next_level = []
            for node in queue:
                if node.left: next_level.append(node.left)
                if node.right: next_level.append(node.right)
            queue = next_level
        return result`,
      cpp: `class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        if (!root) return {};
        vector<int> result;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                auto node = q.front(); q.pop();
                if (i == sz - 1) result.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return result;
    }
};`,
      java: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (i == size - 1) result.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }
        return result;
    }
}`,
      explanation: 'BFS level order traversal. The last node of each level is visible from the right side. O(n) time, O(n) space.'
    }
  },
  {
    id: 'lc-230',
    slug: 'kth-smallest-element-in-a-bst',
    title: 'Kth Smallest Element in a BST',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given the `root` of a binary search tree, and an integer `k`, return the `k`th **smallest** value (1-indexed) of all the values of the nodes in the tree.',
    constraints: ['The number of nodes in the tree is n.', '1 <= k <= n <= 10^4', '0 <= Node.val <= 10^4'],
    solutions: {
      python: `class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        curr = root
        while stack or curr:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            k -= 1
            if k == 0:
                return curr.val
            curr = curr.right`,
      cpp: `class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        TreeNode* curr = root;
        while (!st.empty() || curr) {
            while (curr) { st.push(curr); curr = curr->left; }
            curr = st.top(); st.pop();
            if (--k == 0) return curr->val;
            curr = curr->right;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;
        while (!stack.isEmpty() || curr != null) {
            while (curr != null) { stack.push(curr); curr = curr.left; }
            curr = stack.pop();
            if (--k == 0) return curr.val;
            curr = curr.right;
        }
        return -1;
    }
}`,
      explanation: 'Iterative inorder traversal using a stack. BST inorder gives sorted order, so stop at the kth element. O(H + k) time, O(H) space.'
    }
  },
  {
    id: 'lc-236',
    slug: 'lowest-common-ancestor-of-a-binary-tree',
    title: 'Lowest Common Ancestor of a Binary Tree',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given a binary tree, find the **lowest common ancestor** (LCA) of two given nodes in the tree.\n\nAccording to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow **a node to be a descendant of itself**)."',
    constraints: ['The number of nodes in the tree is in the range [2, 10^5].', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique.', 'p != q', 'p and q will exist in the tree.'],
    solutions: {
      python: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root or root == p or root == q:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right:
            return root
        return left if left else right`,
      cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        auto left = lowestCommonAncestor(root->left, p, q);
        auto right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};`,
      java: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
      explanation: 'Recursive DFS: if both left and right subtrees return non-null, current node is LCA. Otherwise, return whichever side found a target. O(n) time, O(h) space.'
    }
  },
  // ─── MORE CODEFORCES ────────────────────────────────────────────
  {
    id: 'cf-96A',
    slug: 'cf-96a',
    title: 'Football',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Pointers & References',
    description: 'Petya loves football very much. But he is not only a fan — he also plays on the school team.\n\nPetya\'s team has a tradition: each time Petya scores a goal, he dances a victory dance. If the team scores at least **7 consecutive goals** of the same type (either all 0s or all 1s in a binary string representing the match), the fans go crazy.\n\nGiven a string of 0s and 1s, determine if the fans went crazy during the game.\n\n**Input:** A non-empty string of 0s and 1s (length ≤ 100).\n\n**Output:** Print "YES" if there are 7 or more consecutive identical characters, "NO" otherwise.',
    constraints: ['1 ≤ |s| ≤ 100', 's consists of characters 0 and 1.'],
    solutions: {
      python: `s = input()
print("YES" if "0000000" in s or "1111111" in s else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; cin >> s;
    cout << ((s.find("0000000") != string::npos || s.find("1111111") != string::npos) ? "YES" : "NO");
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        System.out.println(s.contains("0000000") || s.contains("1111111") ? "YES" : "NO");
    }
}`,
      explanation: 'Simply check if the string contains 7 consecutive 0s or 7 consecutive 1s using substring search. O(n) time.'
    }
  },
  {
    id: 'cf-231A',
    slug: 'cf-231a',
    title: 'Team',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'One day three best friends Petya, Vasya and Tonya decided to form a team and participate in programming contests.\n\nThey will implement a problem only if at least **two** of the three friends are sure about the solution. Given `n` problems and the confidence of each friend (1 = sure, 0 = not sure), count how many problems they will implement.\n\n**Input:** The first line contains `n`. Each of the next `n` lines contains three integers (0 or 1).\n\n**Output:** Print the number of problems the team will implement.',
    constraints: ['1 ≤ n ≤ 1000'],
    solutions: {
      python: `n = int(input())
count = 0
for _ in range(n):
    a, b, c = map(int, input().split())
    if a + b + c >= 2:
        count += 1
print(count)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, count = 0;
    cin >> n;
    while (n--) {
        int a, b, c;
        cin >> a >> b >> c;
        if (a + b + c >= 2) count++;
    }
    cout << count;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), count = 0;
        for (int i = 0; i < n; i++) {
            int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
            if (a + b + c >= 2) count++;
        }
        System.out.println(count);
    }
}`,
      explanation: 'For each problem, sum the three confidence values. If the sum is >= 2, at least two friends are sure. O(n) time.'
    }
  },
  {
    id: 'cf-282A',
    slug: 'cf-282a',
    title: 'Bit++',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'The programming language Bit++ has a variable `x` initialized to 0. There are two operations:\n- `++X` or `X++` increases `x` by 1.\n- `--X` or `X--` decreases `x` by 1.\n\nGiven `n` statements, calculate the final value of `x`.\n\n**Input:** The first line contains `n`. Each of the next `n` lines contains a statement.\n\n**Output:** Print the final value of `x`.',
    constraints: ['1 ≤ n ≤ 150'],
    solutions: {
      python: `n = int(input())
x = 0
for _ in range(n):
    s = input()
    if '+' in s:
        x += 1
    else:
        x -= 1
print(x)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, x = 0;
    cin >> n;
    while (n--) {
        string s; cin >> s;
        if (s[1] == '+') x++; else x--;
    }
    cout << x;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), x = 0;
        for (int i = 0; i < n; i++) {
            String s = sc.next();
            if (s.contains("+")) x++; else x--;
        }
        System.out.println(x);
    }
}`,
      explanation: 'Check if each statement contains a + (increment) or - (decrement). The position of the operator does not matter. O(n) time.'
    }
  },
  {
    id: 'cf-50A',
    slug: 'cf-50a',
    title: 'Domino Piling',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are given a rectangular board of `M × N` squares. Also you are given an unlimited number of standard domino pieces of 2 × 1 squares. You are asked to place as many dominoes as possible on the board so that each domino covers exactly two squares.\n\n**Input:** Two integers `M` and `N` — board dimensions (1 ≤ M ≤ 100, 1 ≤ N ≤ 100).\n\n**Output:** Output one number — the maximum number of dominoes that can be placed.',
    constraints: ['1 ≤ M, N ≤ 100'],
    solutions: {
      python: `m, n = map(int, input().split())
print((m * n) // 2)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int m, n; cin >> m >> n;
    cout << m * n / 2;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt(), n = sc.nextInt();
        System.out.println(m * n / 2);
    }
}`,
      explanation: 'Each domino covers exactly 2 squares. The maximum number of dominoes is simply floor(M * N / 2), regardless of board dimensions. O(1) time.'
    }
  },
  {
    id: 'cf-69A',
    slug: 'cf-69a',
    title: 'Young Physicist',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'A young physicist has `n` force vectors. He needs to determine if the object they are applied to is in equilibrium (i.e., the sum of all force vectors is zero).\n\nEach force vector has three components `x`, `y`, `z`.\n\n**Input:** First line contains `n`. Each of the next `n` lines contains three integers `x_i`, `y_i`, `z_i`.\n\n**Output:** Print "YES" if the sum of all vectors is the zero vector, "NO" otherwise.',
    constraints: ['1 ≤ n ≤ 100', '-100 ≤ x_i, y_i, z_i ≤ 100'],
    solutions: {
      python: `n = int(input())
sx = sy = sz = 0
for _ in range(n):
    x, y, z = map(int, input().split())
    sx += x; sy += y; sz += z
print("YES" if sx == 0 and sy == 0 and sz == 0 else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, sx = 0, sy = 0, sz = 0;
    cin >> n;
    while (n--) { int x,y,z; cin >> x >> y >> z; sx += x; sy += y; sz += z; }
    cout << (sx == 0 && sy == 0 && sz == 0 ? "YES" : "NO");
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), sx = 0, sy = 0, sz = 0;
        for (int i = 0; i < n; i++) { sx += sc.nextInt(); sy += sc.nextInt(); sz += sc.nextInt(); }
        System.out.println(sx == 0 && sy == 0 && sz == 0 ? "YES" : "NO");
    }
}`,
      explanation: 'Sum all x, y, z components separately. If all three sums are zero, the forces are in equilibrium. O(n) time.'
    }
  },
  // ─── HARD ────────────────────────────────────────────────────────
  {
    id: 'lc-76',
    slug: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Sliding Window',
    description: 'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.\n\nThe testcases will be generated such that the answer is **unique**.',
    constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        from collections import Counter
        need = Counter(t)
        missing = len(t)
        best = (0, float('inf'))
        j = 0
        for i, c in enumerate(s):
            if need[c] > 0:
                missing -= 1
            need[c] -= 1
            while missing == 0:
                if i - j < best[1] - best[0]:
                    best = (j, i)
                need[s[j]] += 1
                if need[s[j]] > 0:
                    missing += 1
                j += 1
        return "" if best[1] == float('inf') else s[best[0]:best[1]+1]`,
      cpp: `class Solution {
public:
    string minWindow(string s, string t) {
        int need[128] = {};
        for (char c : t) need[c]++;
        int missing = t.size(), j = 0, start = 0, minLen = INT_MAX;
        for (int i = 0; i < s.size(); i++) {
            if (need[s[i]]-- > 0) missing--;
            while (missing == 0) {
                if (i - j + 1 < minLen) { minLen = i - j + 1; start = j; }
                if (++need[s[j++]] > 0) missing++;
            }
        }
        return minLen == INT_MAX ? "" : s.substr(start, minLen);
    }
};`,
      java: `class Solution {
    public String minWindow(String s, String t) {
        int[] need = new int[128];
        for (char c : t.toCharArray()) need[c]++;
        int missing = t.length(), j = 0, start = 0, minLen = Integer.MAX_VALUE;
        for (int i = 0; i < s.length(); i++) {
            if (need[s.charAt(i)]-- > 0) missing--;
            while (missing == 0) {
                if (i - j + 1 < minLen) { minLen = i - j + 1; start = j; }
                if (++need[s.charAt(j++)] > 0) missing++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
    }
}`,
      explanation: 'Sliding window with character frequency counts. Expand right to include all needed characters, then shrink from left to find minimum window. O(m + n) time.'
    }
  },
  {
    id: 'lc-84',
    slug: 'largest-rectangle-in-histogram',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Monotonic Stack',
    description: 'Given an array of integers `heights` representing the histogram\'s bar height where the width of each bar is `1`, return the area of the **largest rectangle** in the histogram.',
    constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
    solutions: {
      python: `class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack = []
        max_area = 0
        heights.append(0)
        for i, h in enumerate(heights):
            while stack and heights[stack[-1]] > h:
                height = heights[stack.pop()]
                width = i if not stack else i - stack[-1] - 1
                max_area = max(max_area, height * width)
            stack.append(i)
        return max_area`,
      cpp: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        heights.push_back(0);
        int maxArea = 0;
        for (int i = 0; i < heights.size(); i++) {
            while (!st.empty() && heights[st.top()] > heights[i]) {
                int h = heights[st.top()]; st.pop();
                int w = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, h * w);
            }
            st.push(i);
        }
        return maxArea;
    }
};`,
      java: `class Solution {
    public int largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0, n = heights.length;
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && heights[stack.peek()] > h) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}`,
      explanation: 'Use a monotonic stack to find the largest rectangle. When a bar is shorter than the stack top, pop and calculate area using the popped height and current width. O(n) time.'
    }
  },
  {
    id: 'lc-124',
    slug: 'binary-tree-maximum-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.\n\nThe **path sum** of a path is the sum of the node\'s values in the path.\n\nGiven the `root` of a binary tree, return the **maximum path sum** of any **non-empty** path.',
    constraints: ['The number of nodes in the tree is in the range [1, 3 * 10^4].', '-1000 <= Node.val <= 1000'],
    solutions: {
      python: `class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.ans = float('-inf')
        def dfs(node):
            if not node:
                return 0
            left = max(dfs(node.left), 0)
            right = max(dfs(node.right), 0)
            self.ans = max(self.ans, left + right + node.val)
            return max(left, right) + node.val
        dfs(root)
        return self.ans`,
      cpp: `class Solution {
public:
    int ans = INT_MIN;
    int maxPathSum(TreeNode* root) { dfs(root); return ans; }
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int l = max(dfs(node->left), 0);
        int r = max(dfs(node->right), 0);
        ans = max(ans, l + r + node->val);
        return max(l, r) + node->val;
    }
};`,
      java: `class Solution {
    private int ans = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) { dfs(root); return ans; }
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int l = Math.max(dfs(node.left), 0);
        int r = Math.max(dfs(node.right), 0);
        ans = Math.max(ans, l + r + node.val);
        return Math.max(l, r) + node.val;
    }
}`,
      explanation: 'DFS returns the max gain from each subtree (clamped to 0). At each node, check if left + right + node.val is a new global max path sum. O(n) time, O(h) space.'
    }
  },
  {
    id: 'lc-295',
    slug: 'find-median-from-data-stream',
    title: 'Find Median from Data Stream',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Heap (Priority Queue)',
    description: 'The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement the MedianFinder class:\n- `MedianFinder()` initializes the MedianFinder object.\n- `void addNum(int num)` adds the integer `num` from the data stream to the data structure.\n- `double findMedian()` returns the median of all elements so far.',
    constraints: ['-10^5 <= num <= 10^5', 'There will be at least one element in the data structure before calling findMedian.', 'At most 5 * 10^4 calls will be made to addNum and findMedian.'],
    solutions: {
      python: `import heapq
class MedianFinder:
    def __init__(self):
        self.small = []  # max heap (negated)
        self.large = []  # min heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2.0`,
      cpp: `class MedianFinder {
    priority_queue<int> small; // max heap
    priority_queue<int, vector<int>, greater<int>> large; // min heap
public:
    void addNum(int num) {
        small.push(num);
        large.push(small.top()); small.pop();
        if (large.size() > small.size()) { small.push(large.top()); large.pop(); }
    }
    double findMedian() {
        if (small.size() > large.size()) return small.top();
        return (small.top() + large.top()) / 2.0;
    }
};`,
      java: `class MedianFinder {
    PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());
    PriorityQueue<Integer> large = new PriorityQueue<>();
    public void addNum(int num) {
        small.offer(num);
        large.offer(small.poll());
        if (large.size() > small.size()) small.offer(large.poll());
    }
    public double findMedian() {
        if (small.size() > large.size()) return small.peek();
        return (small.peek() + large.peek()) / 2.0;
    }
}`,
      explanation: 'Two heaps: a max-heap for the smaller half and a min-heap for the larger half. Balance their sizes after each insertion. O(log n) addNum, O(1) findMedian.'
    }
  },
  {
    id: 'lc-297',
    slug: 'serialize-and-deserialize-binary-tree',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.',
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-1000 <= Node.val <= 1000'],
    solutions: {
      python: `class Codec:
    def serialize(self, root):
        vals = []
        def dfs(node):
            if not node:
                vals.append("N")
                return
            vals.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(vals)

    def deserialize(self, data):
        vals = iter(data.split(","))
        def dfs():
            val = next(vals)
            if val == "N":
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()`,
      cpp: `class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "N";
        return to_string(root->val) + "," + serialize(root->left) + "," + serialize(root->right);
    }
    TreeNode* deserialize(string data) {
        queue<string> q;
        string token;
        istringstream ss(data);
        while (getline(ss, token, ',')) q.push(token);
        return dfs(q);
    }
    TreeNode* dfs(queue<string>& q) {
        string val = q.front(); q.pop();
        if (val == "N") return nullptr;
        TreeNode* node = new TreeNode(stoi(val));
        node->left = dfs(q);
        node->right = dfs(q);
        return node;
    }
};`,
      java: `public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "N";
        return root.val + "," + serialize(root.left) + "," + serialize(root.right);
    }
    public TreeNode deserialize(String data) {
        Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(",")));
        return dfs(queue);
    }
    private TreeNode dfs(Queue<String> q) {
        String val = q.poll();
        if (val.equals("N")) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = dfs(q);
        node.right = dfs(q);
        return node;
    }
}`,
      explanation: 'Preorder DFS serialization with "N" for null nodes. Deserialization reads tokens in the same preorder sequence and recursively builds the tree. O(n) time and space.'
    }
  },
];

// ---------------------------------------------------------------------------
// Main: append new problems to the existing arena
// ---------------------------------------------------------------------------
function main() {
  const arena = JSON.parse(fs.readFileSync(ARENA_PATH, 'utf-8'));
  const existingIds = new Set(arena.map((p) => p.id));

  let added = 0;
  let skipped = 0;

  for (const problem of NEW_PROBLEMS) {
    if (existingIds.has(problem.id)) {
      console.log(`⏭ ${problem.id} — ${problem.title} (already exists, skipped)`);
      skipped++;
      continue;
    }
    arena.push(problem);
    added++;
    console.log(`✓ ${problem.id} — ${problem.title} (${problem.difficulty})`);
  }

  fs.writeFileSync(ARENA_PATH, JSON.stringify(arena, null, 2) + '\n', 'utf-8');
  console.log(`\nDone! Added: ${added}, Skipped: ${skipped}, Total problems: ${arena.length}`);
}

main();
