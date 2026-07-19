const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const BATCH = [
  {
    id: 'lc-1281',
    slug: 'subtract-the-product-and-sum-of-digits-of-an-integer',
    title: 'Subtract the Product and Sum of Digits of an Integer',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an integer number `n`, return the difference between the product of its digits and the sum of its digits.',
    constraints: ['1 <= n <= 10^5'],
    solutions: {
      python: `class Solution:
    def subtractProductAndSum(self, n: int) -> int:
        digits = [int(d) for d in str(n)]
        prod_val = 1
        sum_val = 0
        for d in digits:
            prod_val *= d
            sum_val += d
        return prod_val - sum_val`,
      cpp: `class Solution {
public:
    int subtractProductAndSum(int n) {
        int prod = 1, sum = 0;
        while (n > 0) {
            int d = n % 10;
            prod *= d;
            sum += d;
            n /= 10;
        }
        return prod - sum;
    }
};`,
      java: `class Solution {
    public int subtractProductAndSum(int n) {
        int prod = 1, sum = 0;
        while (n > 0) {
            int d = n % 10;
            prod *= d;
            sum += d;
            n /= 10;
        }
        return prod - sum;
    }
}`,
      explanation: 'Extract digits of n using modulo 10 division. Maintain a running sum and product, and return product - sum. Time complexity: O(log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1287',
    slug: 'element-appearing-more-than-25-in-sorted-array',
    title: 'Element Appearing More Than 25% In Sorted Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given an integer array `arr` sorted in non-decreasing order, there is exactly one integer that occurs more than 25% of the time, return it.',
    constraints: ['1 <= arr.length <= 10^4', '0 <= arr[i] <= 10^5'],
    solutions: {
      python: `class Solution:
    def findSpecialInteger(self, arr: List[int]) -> int:
        n = len(arr)
        target = n // 4
        # Since it is sorted, check index gaps of size target
        for i in range(n - target):
            if arr[i] == arr[i + target]:
                return arr[i]
        return -1`,
      cpp: `class Solution {
public:
    int findSpecialInteger(vector<int>& arr) {
        int n = arr.size();
        int gap = n / 4;
        for (int i = 0; i < n - gap; ++i) {
            if (arr[i] == arr[i + gap]) return arr[i];
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int findSpecialInteger(int[] arr) {
        int n = arr.length;
        int gap = n / 4;
        for (int i = 0; i < n - gap; i++) {
            if (arr[i] == arr[i + gap]) return arr[i];
        }
        return -1;
    }
}`,
      explanation: 'Since the array is sorted, an element appearing > 25% of the time must span across at least n / 4 indices. Check if arr[i] == arr[i + n/4] for any index i. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1290',
    slug: 'convert-binary-number-in-a-linked-list-to-integer',
    title: 'Convert Binary Number in a Linked List to Integer',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given `head` which is a reference node to a singly-linked list. The value of each node in the linked list is either `0` or `1`. Return the decimal value of the number in the linked list.',
    constraints: ['The Linked List is not empty.', 'Number of nodes will not exceed 30.', 'Each node\'s value is either 0 or 1.'],
    solutions: {
      python: `class Solution:
    def getDecimalValue(self, head: ListNode) -> int:
        ans = 0
        while head:
            ans = (ans << 1) | head.val
            head = head.next
        return ans`,
      cpp: `class Solution {
public:
    int getDecimalValue(ListNode* head) {
        int ans = 0;
        while (head) {
            ans = (ans << 1) | head->val;
            head = head->next;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int getDecimalValue(ListNode head) {
        int ans = 0;
        while (head != null) {
            ans = (ans << 1) | head.val;
            head = head.next;
        }
        return ans;
    }
}`,
      explanation: 'Traverse the linked list from head to tail. For each node, shift the accumulated value left by 1 and OR with the node value (ans = (ans << 1) | node.val). Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1295',
    slug: 'find-numbers-with-even-number-of-digits',
    title: 'Find Numbers with Even Number of Digits',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of integers `nums`, return how many of them contain an even number of digits.',
    constraints: ['1 <= nums.length <= 500', '1 <= nums[i] <= 10^5'],
    solutions: {
      python: `class Solution:
    def findNumbers(self, nums: List[int]) -> int:
        return sum(len(str(x)) % 2 == 0 for x in nums)`,
      cpp: `class Solution {
public:
    int findNumbers(vector<int>& nums) {
        int ans = 0;
        for (int x : nums) {
            if (to_string(x).size() % 2 == 0) ans++;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int findNumbers(int[] nums) {
        int ans = 0;
        for (int x : nums) {
            if (String.valueOf(x).length() % 2 == 0) ans++;
        }
        return ans;
    }
}`,
      explanation: 'Convert each number to a string and check if its length is even. Alternatively, divide by 10 to count digits. Time complexity: O(n * log_10 v) where v is max value, Space complexity: O(log_10 v) for string conversion.'
    }
  },
  {
    id: 'lc-1299',
    slug: 'replace-elements-with-greatest-element-on-right-side',
    title: 'Replace Elements with Greatest Element on Right Side',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array `arr`, replace every element in that array with the greatest element among the elements to its right, and replace the last element with `-1`.',
    constraints: ['1 <= arr.length <= 10^4', '1 <= arr[i] <= 10^5'],
    solutions: {
      python: `class Solution:
    def replaceElements(self, arr: List[int]) -> List[int]:
        max_seen = -1
        for i in range(len(arr) - 1, -1, -1):
            arr[i], max_seen = max_seen, max(max_seen, arr[i])
        return arr`,
      cpp: `class Solution {
public:
    vector<int>& replaceElements(vector<int>& arr) {
        int maxSeen = -1;
        for (int i = arr.size() - 1; i >= 0; --i) {
            int temp = arr[i];
            arr[i] = maxSeen;
            maxSeen = max(maxSeen, temp);
        }
        return arr;
    }
};`,
      java: `class Solution {
    public int[] replaceElements(int[] arr) {
        int maxSeen = -1;
        for (int i = arr.length - 1; i >= 0; i--) {
            int temp = arr[i];
            arr[i] = maxSeen;
            maxSeen = Math.max(maxSeen, temp);
        }
        return arr;
    }
}`,
      explanation: 'Iterate backwards through the array. Keep track of the maximum value seen so far (maxSeen, initialized to -1). For each element, copy its value to a temp variable, set the array cell to maxSeen, and update maxSeen with the max of maxSeen and the temp variable. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1304',
    slug: 'find-n-unique-integers-sum-up-to-zero',
    title: 'Find N Unique Integers Sum up to Zero',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an integer `n`, return **any** array containing `n` unique integers such that they add up to `0`.',
    constraints: ['1 <= n <= 1000'],
    solutions: {
      python: `class Solution:
    def sumZero(self, n: int) -> List[int]:
        res = []
        if n % 2 == 1: res.append(0)
        for i in range(1, n // 2 + 1):
            res.extend([i, -i])
        return res`,
      cpp: `class Solution {
public:
    vector<int> sumZero(int n) {
        vector<int> res;
        if (n % 2 == 1) res.push_back(0);
        for (int i = 1; i <= n / 2; ++i) {
            res.push_back(i);
            res.push_back(-i);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] sumZero(int n) {
        int[] res = new int[n];
        int idx = 0;
        if (n % 2 == 1) res[idx++] = 0;
        for (int i = 1; i <= n / 2; i++) {
            res[idx++] = i;
            res[idx++] = -i;
        }
        return res;
    }
}`,
      explanation: 'Construct the array symmetrically: for each positive integer i, append both i and -i. If n is odd, also append 0. The sum is guaranteed to be 0. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1309',
    slug: 'decrypt-string-from-alphabet-to-integer-mapping',
    title: 'Decrypt String from Alphabet to Integer Mapping',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Decrypt the string to characters: characters (\'a\' to \'i\') are represented by (\'1\' to \'9\') respectively. Characters (\'j\' to \'z\') are represented by (\'10#\' to \'26#\') respectively.',
    constraints: ['1 <= s.length <= 1000', 's consists of digits (\'0\' - \'9\') and \'#\'.', 's will be a valid string.'],
    solutions: {
      python: `class Solution:
    def freqAlphabets(self, s: str) -> str:
        res = []
        i, n = 0, len(s)
        while i < n:
            if i + 2 < n and s[i + 2] == '#':
                val = int(s[i : i + 2])
                res.append(chr(96 + val))
                i += 3
            else:
                val = int(s[i])
                res.append(chr(96 + val))
                i += 1
        return "".join(res)`,
      cpp: `class Solution {
public:
    string freqAlphabets(string s) {
        string res = "";
        int i = 0, n = s.size();
        while (i < n) {
            if (i + 2 < n && s[i + 2] == '#') {
                int val = stoi(s.substr(i, 2));
                res += (char)('a' + val - 1);
                i += 3;
            } else {
                int val = s[i] - '0';
                res += (char)('a' + val - 1);
                i++;
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public String freqAlphabets(String s) {
        StringBuilder sb = new StringBuilder();
        int i = 0, n = s.length();
        while (i < n) {
            if (i + 2 < n && s.charAt(i + 2) == '#') {
                int val = Integer.parseInt(s.substring(i, i + 2));
                sb.append((char)('a' + val - 1));
                i += 3;
            } else {
                int val = s.charAt(i) - '0';
                sb.append((char)('a' + val - 1));
                i++;
            }
        }
        return sb.toString();
    }
}`,
      explanation: 'Parse s from left to right. At index i, check if there is a \'#\' two positions ahead (s[i+2] == \'#\'). If so, parse a 2-digit number s[i...i+1] and advance i by 3. Otherwise, parse a single digit s[i] and advance i by 1. Map values 1-26 to \'a\'-\'z\'. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1313',
    slug: 'decompress-run-length-encoded-list',
    title: 'Decompress Run-Length Encoded List',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'We are given a list `nums` of integers representing a list compressed with run-length encoding. Decompress it.',
    constraints: ['2 <= nums.length <= 100', 'nums.length is even.', '1 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def decompressRLElist(self, nums: List[int]) -> List[int]:
        res = []
        for i in range(0, len(nums), 2):
            freq, val = nums[i], nums[i + 1]
            res.extend([val] * freq)
        return res`,
      cpp: `class Solution {
public:
    vector<int> decompressRLElist(vector<int>& nums) {
        vector<int> res;
        for (int i = 0; i < nums.size(); i += 2) {
            int freq = nums[i], val = nums[i+1];
            for (int k = 0; k < freq; ++k) res.push_back(val);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] decompressRLElist(int[] nums) {
        int len = 0;
        for (int i = 0; i < nums.length; i += 2) len += nums[i];
        int[] res = new int[len];
        int idx = 0;
        for (int i = 0; i < nums.length; i += 2) {
            int freq = nums[i], val = nums[i+1];
            for (int k = 0; k < freq; k++) res[idx++] = val;
        }
        return res;
    }
}`,
      explanation: 'Iterate with a step of 2. In each iteration, retrieve freq = nums[i] and val = nums[i+1], and append val exactly freq times to the results. Time complexity: O(decompressed_length), Space complexity: O(decompressed_length).'
    }
  },
  {
    id: 'lc-1317',
    slug: 'convert-integer-to-the-sum-of-two-no-zero-integers',
    title: 'Convert Integer to the Sum of Two No-Zero Integers',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an integer `n`, return a list of two integers `[A, B]` where: `A` and `B` are No-Zero integers, and `A + B = n`.',
    constraints: ['2 <= n <= 10^4'],
    solutions: {
      python: `class Solution:
    def getNoZeroIntegers(self, n: int) -> List[int]:
        def has_zero(x):
            return "0" in str(x)
        for a in range(1, n):
            b = n - a
            if not has_zero(a) and not has_zero(b):
                return [a, b]
        return []`,
      cpp: `class Solution {
    bool hasZero(int x) {
        while (x > 0) {
            if (x % 10 == 0) return true;
            x /= 10;
        }
        return false;
    }
public:
    vector<int> getNoZeroIntegers(int n) {
        for (int a = 1; a < n; ++a) {
            int b = n - a;
            if (!hasZero(a) && !hasZero(b)) return {a, b};
        }
        return {};
    }
};`,
      java: `class Solution {
    private boolean hasZero(int x) {
        while (x > 0) {
            if (x % 10 == 0) return true;
            x /= 10;
        }
        return false;
    }
    public int[] getNoZeroIntegers(int n) {
        for (int a = 1; a < n; a++) {
            int b = n - a;
            if (!hasZero(a) && !hasZero(b)) return new int[]{a, b};
        }
        return new int[0];
    }
}`,
      explanation: 'Search values a from 1 to n - 1. Calculate b = n - a. Check if either number contains a zero digit (checked by checking modulo 10). Return the first pair found. Time complexity: O(n log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1323',
    slug: 'maximum-69-number',
    title: 'Maximum 69 Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are given a positive integer `num` consisting only of digits `6` and `9`. Return the maximum number you can get by changing at most one digit.',
    constraints: ['1 <= num <= 10^4', 'num consists of digits 6 and 9 only.'],
    solutions: {
      python: `class Solution:
    def maximum69Number(self, num: int) -> int:
        return int(str(num).replace('6', '9', 1))`,
      cpp: `class Solution {
public:
    int maximum69Number(int num) {
        string s = to_string(num);
        for (char& c : s) {
            if (c == '6') { c = '9'; break; }
        }
        return stoi(s);
    }
};`,
      java: `class Solution {
    public int maximum69Number(int num) {
        return Integer.parseInt(String.valueOf(num).replaceFirst("6", "9"));
    }
}`,
      explanation: 'To maximize the number, locate the most significant digit that is currently a 6 (the leftmost 6) and replace it with a 9. Time complexity: O(log_10 num) digits count, Space complexity: O(log_10 num).'
    }
  },
  {
    id: 'lc-1331',
    slug: 'rank-transform-of-an-array',
    title: 'Rank Transform of an Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of integers `arr`, replace each element with its rank.',
    constraints: ['0 <= arr.length <= 10^5', '-10^9 <= arr[i] <= 10^9'],
    solutions: {
      python: `class Solution:
    def arrayRankTransform(self, arr: List[int]) -> List[int]:
        ranks = {x: idx + 1 for idx, x in enumerate(sorted(set(arr)))}
        return [ranks[x] for x in arr]`,
      cpp: `class Solution {
public:
    vector<int> arrayRankTransform(vector<int>& arr) {
        vector<int> sortedArr = arr;
        sort(sortedArr.begin(), sortedArr.end());
        unordered_map<int, int> ranks;
        int rank = 1;
        for (int x : sortedArr) {
            if (!ranks.count(x)) ranks[x] = rank++;
        }
        vector<int> res(arr.size());
        for (int i = 0; i < arr.size(); ++i) {
            res[i] = ranks[arr[i]];
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] arrayRankTransform(int[] arr) {
        int[] sortedArr = arr.clone();
        Arrays.sort(sortedArr);
        Map<Integer, Integer> ranks = new HashMap<>();
        int rank = 1;
        for (int x : sortedArr) {
            if (!ranks.containsKey(x)) ranks.put(x, rank++);
        }
        int[] res = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            res[i] = ranks.get(arr[i]);
        }
        return res;
    }
}`,
      explanation: 'Sort a copy of the array and remove duplicate values. Assign 1-based ranks sequentially to the sorted distinct elements and store them in a hash map. Build the result by replacing each element in the original array with its rank. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1332',
    slug: 'remove-palindromic-subsequences',
    title: 'Remove Palindromic Subsequences',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given a string `s` consisting only of letters `\'a\'` and `\'b\'`. In a single step you can remove one palindromic subsequence from `s`. Return the minimum number of steps to make s empty.',
    constraints: ['1 <= s.length <= 1000', 's consists of only \'a\' and \'b\' characters.'],
    solutions: {
      python: `class Solution:
    def removePalindromeSub(self, s: str) -> int:
        if s == s[::-1]: return 1
        return 2`,
      cpp: `class Solution {
public:
    int removePalindromeSub(string s) {
        string rev = s;
        reverse(rev.begin(), rev.end());
        if (s == rev) return 1;
        return 2;
    }
};`,
      java: `class Solution {
    public int removePalindromeSub(String s) {
        String rev = new StringBuilder(s).reverse().toString();
        if (s.equals(rev)) return 1;
        return 2;
    }
}`,
      explanation: 'Since the string only contains \'a\' and \'b\', and a subsequence does not need to be contiguous: if the string is already a palindrome, we can clear it in 1 step. Otherwise, we can clear all \'a\'s (which form a palindromic subsequence) in step 1, and all \'b\'s in step 2. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1337',
    slug: 'the-k-weakest-rows-in-a-matrix',
    title: 'The K Weakest Rows in a Matrix',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'You are given an `m x n` binary matrix `mat` of `1`\'s (soldiers) and `0`\'s (civilians). Soldiers are always positioned in front of civilians. Return the indices of the `k` weakest rows.',
    constraints: ['m == mat.length', 'n == mat[i].length', '2 <= n, m <= 100', '1 <= k <= m', 'mat[i][j] is 0 or 1.'],
    solutions: {
      python: `class Solution:
    def kWeakestRows(self, mat: List[List[int]], k: int) -> List[int]:
        # Count soldiers per row using binary search
        def count_soldiers(row):
            low, high = 0, len(row) - 1
            while low <= high:
                mid = (low + high) // 2
                if row[mid] == 1:
                    low = mid + 1
                else:
                    high = mid - 1
            return low
            
        rows_strength = [(count_soldiers(row), idx) for idx, row in enumerate(mat)]
        rows_strength.sort()
        return [idx for val, idx in rows_strength[:k]]`,
      cpp: `class Solution {
    int countSoldiers(const vector<int>& row) {
        int low = 0, high = row.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (row[mid] == 1) low = mid + 1;
            else high = mid - 1;
        }
        return low;
    }
public:
    vector<int> kWeakestRows(vector<vector<int>>& mat, int k) {
        vector<pair<int, int>> strengths;
        for (int i = 0; i < mat.size(); ++i) {
            strengths.push_back({countSoldiers(mat[i]), i});
        }
        sort(strengths.begin(), strengths.end());
        vector<int> res;
        for (int i = 0; i < k; ++i) res.push_back(strengths[i].second);
        return res;
    }
};`,
      java: `class Solution {
    private int countSoldiers(int[] row) {
        int low = 0, high = row.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (row[mid] == 1) low = mid + 1;
            else high = mid - 1;
        }
        return low;
    }
    public int[] kWeakestRows(int[][] mat, int k) {
        int[][] strengths = new int[mat.length][2];
        for (int i = 0; i < mat.length; i++) {
            strengths[i][0] = countSoldiers(mat[i]);
            strengths[i][1] = i;
        }
        Arrays.sort(strengths, (a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            return Integer.compare(a[1], b[1]);
        });
        int[] res = new int[k];
        for (int i = 0; i < k; i++) res[i] = strengths[i][1];
        return res;
    }
}`,
      explanation: 'Use binary search to count the number of soldiers (1s) in each row, since all 1s precede 0s. Pair each soldier count with its row index, sort by strength (with index as tie-breaker), and return the first k indices. Time complexity: O(m log n + m log m), Space complexity: O(m).'
    }
  },
  {
    id: 'lc-1342',
    slug: 'number-of-steps-to-reduce-a-number-to-zero',
    title: 'Number of Steps to Reduce a Number to Zero',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given an integer `num`, return the number of steps to reduce it to zero. If the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.',
    constraints: ['0 <= num <= 10^6'],
    solutions: {
      python: `class Solution:
    def numberOfSteps(self, num: int) -> int:
        if num == 0: return 0
        steps = 0
        while num > 0:
            if num & 1:
                steps += 1
            num >>= 1
            steps += 1
        return steps - 1`,
      cpp: `class Solution {
public:
    int numberOfSteps(int num) {
        if (num == 0) return 0;
        int steps = 0;
        while (num > 0) {
            if (num & 1) steps++;
            num >>= 1;
            steps++;
        }
        return steps - 1;
    }
};`,
      java: `class Solution {
    public int numberOfSteps(int num) {
        if (num == 0) return 0;
        int steps = 0;
        while (num > 0) {
            if ((num & 1) == 1) steps++;
            num >>= 1;
            steps++;
        }
        return steps - 1;
    }
}`,
      explanation: 'This matches the number of bit divisions. Every 1 bit requires 2 steps (subtract 1 then divide by 2), and every 0 bit requires 1 step (divide by 2). The final 1 bit at the top only needs subtraction (no division), so return total_steps - 1. Time complexity: O(log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1346',
    slug: 'check-if-n-and-its-double-exist',
    title: 'Check If N and Its Double Exist',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array `arr` of integers, check if there exist two indices `i` and `j` such that `i != j`, `arr[i] == 2 * arr[j]`.',
    constraints: ['2 <= arr.length <= 500', '-1000 <= arr[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def checkIfExist(self, arr: List[int]) -> bool:
        seen = set()
        for x in arr:
            if 2 * x in seen or (x % 2 == 0 and x // 2 in seen):
                return True
            seen.add(x)
        return False`,
      cpp: `class Solution {
public:
    bool checkIfExist(vector<int>& arr) {
        unordered_set<int> seen;
        for (int x : arr) {
            if (seen.count(2 * x) || (x % 2 == 0 && seen.count(x / 2))) return true;
            seen.insert(x);
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean checkIfExist(int[] arr) {
        Set<Integer> seen = new HashSet<>();
        for (int x : arr) {
            if (seen.contains(2 * x) || (x % 2 == 0 && seen.contains(x / 2))) return true;
            seen.add(x);
        }
        return false;
    }
}`,
      explanation: 'Use a hash set to store visited elements. For each element x, check if 2 * x or x / 2 (only if x is even) is present in the set. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1351',
    slug: 'count-negative-numbers-in-a-sorted-matrix',
    title: 'Count Negative Numbers in a Sorted Matrix',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given a `m x n` matrix `grid` which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in `grid`.',
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 100', '-100 <= grid[i][j] <= 100'],
    solutions: {
      python: `class Solution:
    def countNegatives(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        r, c = m - 1, 0
        ans = 0
        while r >= 0 and c < n:
            if grid[r][c] < 0:
                ans += n - c
                r -= 1
            else:
                c += 1
        return ans`,
      cpp: `class Solution {
public:
    int countNegatives(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int r = m - 1, c = 0, ans = 0;
        while (r >= 0 && c < n) {
            if (grid[r][c] < 0) {
                ans += n - c;
                r--;
            } else {
                c++;
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int countNegatives(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int r = m - 1, c = 0, ans = 0;
        while (r >= 0 && c < n) {
            if (grid[r][c] < 0) {
                ans += n - c;
                r--;
            } else {
                c++;
            }
        }
        return ans;
    }
}`,
      explanation: 'Use the staircase traversal method. Start at the bottom-left corner (r = m-1, c = 0). If grid[r][c] is negative, since rows are sorted in non-increasing order, all elements to its right in row r must also be negative, so add n - c to count and step up (r--). Otherwise, step right (c++). Time complexity: O(m + n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1356',
    slug: 'sort-integers-by-the-number-of-1-bits',
    title: 'Sort Integers by The Number of 1 Bits',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Sort the integers in the array in ascending order by the number of `1`\'s in their binary representation and in case of two or more integers have the same number of `1`\'s you have to sort them in ascending value.',
    constraints: ['1 <= arr.length <= 500', '0 <= arr[i] <= 10^4'],
    solutions: {
      python: `class Solution:
    def sortByBits(self, arr: List[int]) -> List[int]:
        return sorted(arr, key=lambda x: (bin(x).count('1'), x))`,
      cpp: `class Solution {
public:
    vector<int> sortByBits(vector<int>& arr) {
        sort(arr.begin(), arr.end(), [](int a, int b) {
            int c1 = __builtin_popcount(a);
            int c2 = __builtin_popcount(b);
            if (c1 != c2) return c1 < c2;
            return a < b;
        });
        return arr;
    }
};`,
      java: `class Solution {
    public int[] sortByBits(int[] arr) {
        Integer[] temp = new Integer[arr.length];
        for (int i = 0; i < arr.length; i++) temp[i] = arr[i];
        Arrays.sort(temp, (a, b) -> {
            int c1 = Integer.bitCount(a);
            int c2 = Integer.bitCount(b);
            if (c1 != c2) return Integer.compare(c1, c2);
            return Integer.compare(a, b);
        });
        for (int i = 0; i < arr.length; i++) arr[i] = temp[i];
        return arr;
    }
}`,
      explanation: 'Sort the array using a custom comparator. The primary sort key is the count of set bits (using bitCount or popcount), and the secondary sort key is the numeric value. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1365',
    slug: 'how-many-numbers-are-smaller-than-the-current-number',
    title: 'How Many Numbers Are Smaller Than the Current Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given the array `nums`, for each `nums[i]` find out how many numbers in the array are smaller than it.',
    constraints: ['2 <= nums.length <= 500', '0 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def smallerNumbersThanCurrent(self, nums: List[int]) -> List[int]:
        counts = [0] * 102
        for x in nums: counts[x] += 1
        # Prefix sum
        for i in range(1, 102):
            counts[i] += counts[i - 1]
        return [counts[x - 1] if x > 0 else 0 for x in nums]`,
      cpp: `class Solution {
public:
    vector<int> smallerNumbersThanCurrent(vector<int>& nums) {
        vector<int> counts(102, 0);
        for (int x : nums) counts[x]++;
        for (int i = 1; i <= 101; ++i) counts[i] += counts[i - 1];
        vector<int> res(nums.size());
        for (int i = 0; i < nums.size(); ++i) {
            res[i] = (nums[i] > 0) ? counts[nums[i] - 1] : 0;
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] smallerNumbersThanCurrent(int[] nums) {
        int[] counts = new int[102];
        for (int x : nums) counts[x]++;
        for (int i = 1; i <= 101; i++) counts[i] += counts[i - 1];
        int[] res = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            res[i] = (nums[i] > 0) ? counts[nums[i] - 1] : 0;
        }
        return res;
    }
}`,
      explanation: 'Since numbers are small (<= 100), count their frequencies in a bucket array. Compute prefix sums: counts[i] will store total numbers <= i. For any number x, the count of strictly smaller numbers is counts[x - 1]. Time complexity: O(n + K) where K = 100, Space complexity: O(K).'
    }
  },
  {
    id: 'lc-1374',
    slug: 'generate-a-string-with-characters-that-have-odd-counts',
    title: 'Generate a String With Characters That Have Odd Counts',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an integer `n`, return a string with `n` characters such that each character in such string occurs an odd number of times.',
    constraints: ['1 <= n <= 500'],
    solutions: {
      python: `class Solution:
    def generateTheString(self, n: int) -> str:
        if n % 2 == 1:
            return "a" * n
        return "a" * (n - 1) + "b"`,
      cpp: `class Solution {
public:
    string generateTheString(int n) {
        if (n % 2 == 1) return string(n, 'a');
        return string(n - 1, 'a') + "b";
    }
};`,
      java: `class Solution {
    public String generateTheString(int n) {
        if (n % 2 == 1) return "a".repeat(n);
        return "a".repeat(n - 1) + "b";
    }
}`,
      explanation: 'If n is odd, return n copies of "a" (since n is odd). If n is even, return n - 1 copies of "a" (which is odd) and 1 copy of "b" (which is odd). Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1380',
    slug: 'lucky-numbers-in-a-matrix',
    title: 'Lucky Numbers in a Matrix',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an `m x n` matrix of distinct numbers, return all lucky numbers in the matrix in any order. A lucky number is an element of the matrix such that it is the minimum element in its row and maximum in its column.',
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= n, m <= 50', 'All elements in the matrix are distinct.'],
    solutions: {
      python: `class Solution:
    def luckyNumbers(self, matrix: List[List[int]]) -> List[int]:
        min_rows = {min(row) for row in matrix}
        max_cols = {max(col) for col in zip(*matrix)}
        return list(min_rows.intersection(max_cols))`,
      cpp: `class Solution {
public:
    vector<int> luckyNumbers (vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<int> minRow(m, INT_MAX), maxCol(n, INT_MIN);
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                minRow[r] = min(minRow[r], matrix[r][c]);
                maxCol[c] = max(maxCol[c], matrix[r][c]);
            }
        }
        vector<int> res;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (matrix[r][c] == minRow[r] && matrix[r][c] == maxCol[c]) {
                    res.push_back(matrix[r][c]);
                }
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<Integer> luckyNumbers (int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[] minRow = new int[m];
        int[] maxCol = new int[n];
        Arrays.fill(minRow, Integer.MAX_VALUE);
        Arrays.fill(maxCol, Integer.MIN_VALUE);
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                minRow[r] = Math.min(minRow[r], matrix[r][c]);
                maxCol[c] = Math.max(maxCol[c], matrix[r][c]);
            }
        }
        List<Integer> res = new ArrayList<>();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == minRow[r] && matrix[r][c] == maxCol[c]) {
                    res.add(matrix[r][c]);
                }
            }
        }
        return res;
    }
}`,
      explanation: 'Identify the minimum element of each row and the maximum element of each column. A cell is a lucky number if its value matches both minimum in row r and maximum in column c. Time complexity: O(m * n), Space complexity: O(m + n).'
    }
  },
  {
    id: 'lc-1385',
    slug: 'find-the-distance-value-between-two-arrays',
    title: 'Find the Distance Value Between Two Arrays',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given two integer arrays `arr1` and `arr2`, and the integer `d`, return the distance value between the two arrays.',
    constraints: ['1 <= arr1.length, arr2.length <= 500', '-1000 <= arr1[i], arr2[j] <= 1000', '0 <= d <= 100'],
    solutions: {
      python: `class Solution:
    def findTheDistanceValue(self, arr1: List[int], arr2: List[int], d: int) -> int:
        arr2.sort()
        ans = 0
        for x in arr1:
            # Use binary search to find any element in range [x - d, x + d]
            low, high = 0, len(arr2) - 1
            valid = True
            while low <= high:
                mid = (low + high) // 2
                if abs(arr2[mid] - x) <= d:
                    valid = False
                    break
                elif arr2[mid] < x:
                    low = mid + 1
                else:
                    high = mid - 1
            if valid: ans += 1
        return ans`,
      cpp: `class Solution {
public:
    int findTheDistanceValue(vector<int>& arr1, vector<int>& arr2, int d) {
        sort(arr2.begin(), arr2.end());
        int ans = 0;
        for (int x : arr1) {
            int low = 0, high = arr2.size() - 1;
            bool valid = true;
            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (abs(arr2[mid] - x) <= d) { valid = false; break; }
                else if (arr2[mid] < x) low = mid + 1;
                else high = mid - 1;
            }
            if (valid) ans++;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int findTheDistanceValue(int[] arr1, int[] arr2, int d) {
        Arrays.sort(arr2);
        int ans = 0;
        for (int x : arr1) {
            int low = 0, high = arr2.length - 1;
            boolean valid = true;
            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (Math.abs(arr2[mid] - x) <= d) { valid = false; break; }
                else if (arr2[mid] < x) low = mid + 1;
                else high = mid - 1;
            }
            if (valid) ans++;
        }
        return ans;
    }
}`,
      explanation: 'Sort arr2. For each element x in arr1, perform binary search in sorted arr2. If we find any element in the range [x - d, x + d], the condition is violated. If no such element exists, increment the answer. Time complexity: O((n + m) log m) where n = len(arr1), m = len(arr2), Space complexity: O(log m).'
    }
  },
  {
    id: 'lc-1389',
    slug: 'create-target-array-in-the-given-order',
    title: 'Create Target Array in the Given Order',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two arrays of integers `nums` and `index`. Your task is to create target array under the given rules.',
    constraints: ['1 <= nums.length, index.length <= 100', 'nums.length == index.length', '0 <= index[i] <= i'],
    solutions: {
      python: `class Solution:
    def createTargetArray(self, nums: List[int], index: List[int]) -> List[int]:
        target = []
        for x, idx in zip(nums, index):
            target.insert(idx, x)
        return target`,
      cpp: `class Solution {
public:
    vector<int> createTargetArray(vector<int>& nums, vector<int>& index) {
        vector<int> target;
        for (int i = 0; i < nums.size(); ++i) {
            target.insert(target.begin() + index[i], nums[i]);
        }
        return target;
    }
};`,
      java: `class Solution {
    public int[] createTargetArray(int[] nums, int[] index) {
        List<Integer> target = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            target.add(index[i], nums[i]);
        }
        int[] res = new int[nums.length];
        for (int i = 0; i < nums.length; i++) res[i] = target.get(i);
        return res;
    }
}`,
      explanation: 'Insert elements sequentially into a dynamic list at the index specified by index[i]. Copy values to a standard array at the end. Time complexity: O(n^2), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1394',
    slug: 'find-lucky-integer-in-an-array',
    title: 'Find Lucky Integer in an Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of integers `arr`, a lucky integer is an integer which has a frequency in the array equal to its value. Return the largest lucky integer in the array, or `-1`.',
    constraints: ['1 <= arr.length <= 500', '1 <= arr[i] <= 500'],
    solutions: {
      python: `class Solution:
    def findLucky(self, arr: List[int]) -> int:
        counts = {}
        for x in arr: counts[x] = counts.get(x, 0) + 1
        ans = -1
        for val in counts:
            if val == counts[val]:
                ans = max(ans, val)
        return ans`,
      cpp: `class Solution {
public:
    int findLucky(vector<int>& arr) {
        unordered_map<int, int> counts;
        for (int x : arr) counts[x]++;
        int ans = -1;
        for (const auto& [val, cnt] : counts) {
            if (val == cnt) ans = max(ans, val);
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int findLucky(int[] arr) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : arr) counts.put(x, counts.getOrDefault(x, 0) + 1);
        int ans = -1;
        for (int val : counts.keySet()) {
            if (val == counts.get(val)) ans = Math.max(ans, val);
        }
        return ans;
    }
}`,
      explanation: 'Count the frequency of each element in the array using a hash map. Iterate through the map and identify elements whose key equals their frequency value. Return the maximum. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1403',
    slug: 'minimum-subsequence-in-non-increasing-order',
    title: 'Minimum Subsequence in Non-Increasing Order',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given the array `nums`, obtain a subsequence of the array whose sum of elements is strictly greater than the sum of the non-included elements.',
    constraints: ['1 <= nums.length <= 500', '1 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def minSubsequence(self, nums: List[int]) -> List[int]:
        nums.sort(reverse=True)
        total = sum(nums)
        curr = 0
        res = []
        for x in nums:
            curr += x
            res.append(x)
            if curr > total - curr:
                break
        return res`,
      cpp: `class Solution {
public:
    vector<int> minSubsequence(vector<int>& nums) {
        sort(nums.rbegin(), nums.rend());
        int total = 0;
        for (int x : nums) total += x;
        int curr = 0;
        vector<int> res;
        for (int x : nums) {
            curr += x;
            res.push_back(x);
            if (curr > total - curr) break;
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<Integer> minSubsequence(int[] nums) {
        Arrays.sort(nums);
        int total = 0;
        for (int x : nums) total += x;
        int curr = 0;
        List<Integer> res = new ArrayList<>();
        for (int i = nums.length - 1; i >= 0; i--) {
            curr += nums[i];
            res.add(nums[i]);
            if (curr > total - curr) break;
        }
        return res;
    }
}`,
      explanation: 'Greedy approach: sort the array in descending order. Pick elements one by one starting from the largest, adding to the subsequence until the sum of selected elements strictly exceeds the sum of remaining elements. Time complexity: O(n log n), Space complexity: O(n) for output.'
    }
  },
  {
    id: 'lc-1408',
    slug: 'string-matching-in-an-array',
    title: 'String Matching in an Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of strings `words`, return all strings in `words` that is a substring of another word in **any order**.',
    constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 30', 'words[i] contains only lowercase English letters.', 'All strings in words are unique.'],
    solutions: {
      python: `class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        res = []
        for i, w1 in enumerate(words):
            for j, w2 in enumerate(words):
                if i != j and w1 in w2:
                    res.append(w1)
                    break
        return res`,
      cpp: `class Solution {
public:
    vector<string> stringMatching(vector<string>& words) {
        vector<string> res;
        for (int i = 0; i < words.size(); ++i) {
            for (int j = 0; j < words.size(); ++j) {
                if (i != j && words[j].find(words[i]) != string::npos) {
                    res.push_back(words[i]);
                    break;
                }
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<String> stringMatching(String[] words) {
        List<String> res = new ArrayList<>();
        for (int i = 0; i < words.length; i++) {
            for (int j = 0; j < words.length; j++) {
                if (i != j && words[j].contains(words[i])) {
                    res.add(words[i]);
                    break;
                }
            }
        }
        return res;
    }
}`,
      explanation: 'Use a nested loop. For each word words[i], check if it is contained as a substring in any other word words[j] (where i != j). Time complexity: O(n^2 * L^2) where L is max word length, Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1413',
    slug: 'minimum-value-to-get-positive-step-by-step-sum',
    title: 'Minimum Value to Get Positive Step by Step Sum',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of integers `nums`, you start with an initial positive value *startValue*. Find the minimum *startValue* such that the step-by-step sum is never less than 1.',
    constraints: ['1 <= nums.length <= 100', '-100 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def minStartValue(self, nums: List[int]) -> int:
        curr = 0
        min_prefix = 0
        for x in nums:
            curr += x
            min_prefix = min(min_prefix, curr)
        return 1 - min_prefix`,
      cpp: `class Solution {
public:
    int minStartValue(vector<int>& nums) {
        int curr = 0, minPrefix = 0;
        for (int x : nums) {
            curr += x;
            minPrefix = min(minPrefix, curr);
        }
        return 1 - minPrefix;
    }
};`,
      java: `class Solution {
    public int minStartValue(int[] nums) {
        int curr = 0, minPrefix = 0;
        for (int x : nums) {
            curr += x;
            minPrefix = Math.min(minPrefix, curr);
        }
        return 1 - minPrefix;
    }
}`,
      explanation: 'Compute the minimum prefix sum value reached during sequential addition. The minimum starting value required to keep the prefix sums >= 1 is 1 - minPrefix. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1417',
    slug: 'reformat-the-string',
    title: 'Reformat The String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given alphanumeric string `s`, reformat it so that no two adjacent characters have the same type.',
    constraints: ['1 <= s.length <= 500', 's consists of lowercase English letters and digits.'],
    solutions: {
      python: `class Solution:
    def reformat(self, s: str) -> str:
        letters = [c for c in s if c.isalpha()]
        digits = [c for c in s if c.isdigit()]
        if abs(len(letters) - len(digits)) > 1:
            return ""
        
        # Merge arrays alternately
        res = []
        if len(letters) < len(digits):
            letters, digits = digits, letters
            
        for i in range(len(digits)):
            res.append(letters[i])
            res.append(digits[i])
        if len(letters) > len(digits):
            res.append(letters[-1])
        return "".join(res)`,
      cpp: `class Solution {
public:
    string reformat(string s) {
        string letters = "", digits = "";
        for (char c : s) {
            if (isdigit(c)) digits += c;
            else letters += c;
        }
        if (abs((int)letters.size() - (int)digits.size()) > 1) return "";
        string res = "";
        bool letterTurn = letters.size() >= digits.size();
        int l = 0, d = 0;
        for (int i = 0; i < s.size(); ++i) {
            if (letterTurn) res += letters[l++];
            else res += digits[d++];
            letterTurn = !letterTurn;
        }
        return res;
    }
};`,
      java: `class Solution {
    public String reformat(String s) {
        StringBuilder letters = new StringBuilder();
        StringBuilder digits = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) digits.append(c);
            else letters.append(c);
        }
        int lSz = letters.length(), dSz = digits.length();
        if (Math.abs(lSz - dSz) > 1) return "";
        StringBuilder res = new StringBuilder();
        boolean letterTurn = lSz >= dSz;
        int l = 0, d = 0;
        for (int i = 0; i < s.length(); i++) {
            if (letterTurn) res.append(letters.charAt(l++));
            else res.append(digits.charAt(d++));
            letterTurn = !letterTurn;
        }
        return res.toString();
    }
}`,
      explanation: 'Separate characters into letter and digit pools. Reformatting is possible if and only if their size difference is at most 1. Interleave them starting with the larger pool. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1422',
    slug: 'maximum-score-after-splitting-a-string',
    title: 'Maximum Score After Splitting a String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a string `s` of zeros and ones, return the maximum score after splitting the string into two non-empty substrings.',
    constraints: ['2 <= s.length <= 500', 's consists of only \'0\' and \'1\'.'],
    solutions: {
      python: `class Solution:
    def maxScore(self, s: str) -> int:
        zeros = 0
        ones = s.count('1')
        ans = 0
        # Iterate up to n - 1 (since parts must be non-empty)
        for i in range(len(s) - 1):
            if s[i] == '0': zeros += 1
            else: ones -= 1
            ans = max(ans, zeros + ones)
        return ans`,
      cpp: `class Solution {
public:
    int maxScore(string s) {
        int zeros = 0, ones = 0;
        for (char c : s) if (c == '1') ones++;
        int ans = 0;
        for (int i = 0; i < s.size() - 1; ++i) {
            if (s[i] == '0') zeros++;
            else ones--;
            ans = max(ans, zeros + ones);
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int maxScore(String s) {
        int zeros = 0, ones = 0;
        for (char c : s.toCharArray()) if (c == '1') ones++;
        int ans = 0;
        for (int i = 0; i < s.length() - 1; i++) {
            if (s.charAt(i) == '0') zeros++;
            else ones--;
            ans = Math.max(ans, zeros + ones);
        }
        return ans;
    }
}`,
      explanation: 'Count total ones first. Iterate through the string up to index n - 2, maintaining a running count of zeros on the left and subtracting ones that cross to the left. The score is zeros_left + ones_right. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1431',
    slug: 'kids-with-the-greatest-number-of-candies',
    title: 'Kids With the Greatest Number of Candies',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given the array `candies` and the integer `extraCandies`, return a boolean array `result` where `result[i]` is `true` if, after giving the `i`-th kid all the `extraCandies`, they will have the greatest number of candies among all the kids.',
    constraints: ['n == candies.length', '2 <= n <= 100', '1 <= candies[i] <= 100', '1 <= extraCandies <= 50'],
    solutions: {
      python: `class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        limit = max(candies)
        return [x + extraCandies >= limit for x in candies]`,
      cpp: `class Solution {
public:
    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {
        int maxVal = *max_element(candies.begin(), candies.end());
        vector<bool> res;
        for (int x : candies) res.push_back(x + extraCandies >= maxVal);
        return res;
    }
};`,
      java: `class Solution {
    public List<Boolean> kidsWithCandies(int[] candies, int extraCandies) {
        int maxVal = 0;
        for (int x : candies) maxVal = Math.max(maxVal, x);
        List<Boolean> res = new ArrayList<>();
        for (int x : candies) res.add(x + extraCandies >= maxVal);
        return res;
    }
}`,
      explanation: 'Identify the maximum value in the candies array. For each kid, check if their candy count plus extraCandies is greater than or equal to this maximum value. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1436',
    slug: 'destination-city',
    title: 'Destination City',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'You are given the array `paths`, where `paths[i] = [cityA_i, cityB_i]` means there exists a direct path going from `cityA_i` to `cityB_i`. Return the destination city, that is, the city without any path outgoing to another city.',
    constraints: ['1 <= paths.length <= 100', 'paths[i].length == 2', 'All city names are distinct within a path.'],
    solutions: {
      python: `class Solution:
    def destCity(self, paths: List[List[str]]) -> str:
        starts = {p[0] for p in paths}
        for u, v in paths:
            if v not in starts:
                return v
        return ""`,
      cpp: `class Solution {
public:
    string destCity(vector<vector<string>>& paths) {
        unordered_set<string> starts;
        for (const auto& p : paths) starts.insert(p[0]);
        for (const auto& p : paths) {
            if (!starts.count(p[1])) return p[1];
        }
        return "";
    }
};`,
      java: `class Solution {
    public String destCity(List<List<String>> paths) {
        Set<String> starts = new HashSet<>();
        for (List<String> p : paths) starts.add(p.get(0));
        for (List<String> p : paths) {
            if (!starts.contains(p.get(1))) return p.get(1);
        }
        return "";
    }
}`,
      explanation: 'Insert all starting/outgoing cities (cityA) into a hash set. Iterate through the paths again and verify which destination city (cityB) does not exist in the start cities set. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1446',
    slug: 'consecutive-characters',
    title: 'Consecutive Characters',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'The **power** of the string is the maximum length of a non-empty substring that contains only one unique character. Return the power of the string `s`.',
    constraints: ['1 <= s.length <= 500', 's consists of only lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def maxPower(self, s: str) -> int:
        best = cur = 1
        for i in range(1, len(s)):
            if s[i] == s[i - 1]:
                cur += 1
                best = max(best, cur)
            else:
                cur = 1
        return best`,
      cpp: `class Solution {
public:
    int maxPower(string s) {
        int best = 1, cur = 1;
        for (int i = 1; i < s.size(); ++i) {
            if (s[i] == s[i-1]) { cur++; best = max(best, cur); }
            else cur = 1;
        }
        return best;
    }
};`,
      java: `class Solution {
    public int maxPower(String s) {
        int best = 1, cur = 1;
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) == s.charAt(i - 1)) { cur++; best = Math.max(best, cur); }
            else cur = 1;
        }
        return best;
    }
}`,
      explanation: 'Iterate through the string. If the current character matches the previous, increment the current group count. Otherwise, reset the count to 1. Track the maximum count. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1450',
    slug: 'number-of-students-doing-homework-at-a-given-time',
    title: 'Number of Students Doing Homework at a Given Time',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two integer arrays `startTime` and `endTime` and an integer `queryTime`. Return the number of students who are doing their homework at `queryTime`.',
    constraints: ['startTime.length == endTime.length', '1 <= startTime.length <= 100', '1 <= startTime[i] <= endTime[i] <= 1000', '1 <= queryTime <= 1000'],
    solutions: {
      python: `class Solution:
    def busyStudent(self, startTime: List[int], endTime: List[int], queryTime: int) -> int:
        return sum(s <= queryTime <= e for s, e in zip(startTime, endTime))`,
      cpp: `class Solution {
public:
    int busyStudent(vector<int>& startTime, vector<int>& endTime, int queryTime) {
        int count = 0;
        for (int i = 0; i < startTime.size(); ++i) {
            if (startTime[i] <= queryTime && queryTime <= endTime[i]) count++;
        }
        return count;
    }
};`,
      java: `class Solution {
    public int busyStudent(int[] startTime, int[] endTime, int queryTime) {
        int count = 0;
        for (int i = 0; i < startTime.length; i++) {
            if (startTime[i] <= queryTime && queryTime <= endTime[i]) count++;
        }
        return count;
    }
}`,
      explanation: 'Iterate through students. A student is active at queryTime if queryTime falls within the inclusive interval [startTime[i], endTime[i]]. Count these occurrences. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1455',
    slug: 'check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence',
    title: 'Check If a Word Occurs As a Prefix of Any Word in a Sentence',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a `sentence` and a `searchWord`, return the 1-based index of the first word in `sentence` that has `searchWord` as prefix. If no such word exists, return `-1`.',
    constraints: ['1 <= sentence.length <= 100', '1 <= searchWord.length <= 10', 'sentence consists of lowercase English letters and spaces.', 'searchWord consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def isPrefixOfWord(self, sentence: str, searchWord: str) -> int:
        for idx, w in enumerate(sentence.split(" ")):
            if w.startswith(searchWord):
                return idx + 1
        return -1`,
      cpp: `class Solution {
public:
    int isPrefixOfWord(string sentence, string searchWord) {
        stringstream ss(sentence);
        string word;
        int idx = 1;
        while (ss >> word) {
            if (word.find(searchWord) == 0) return idx;
            idx++;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int isPrefixOfWord(String sentence, String searchWord) {
        String[] words = sentence.split(" ");
        for (int i = 0; i < words.length; i++) {
            if (words[i].startsWith(searchWord)) return i + 1;
        }
        return -1;
    }
}`,
      explanation: 'Split the sentence into individual words. Check if searchWord is a prefix of words[i] using startswith (or find(searchWord) == 0). Return the 1-based index of the first match. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1460',
    slug: 'make-two-arrays-equal-by-reversing-subarrays',
    title: 'Make Two Arrays Equal by Reversing Subarrays',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given two integer arrays of equal length `target` and `arr`. In one step, you can select any non-empty subarray of `arr` and reverse it. Return `true` if you can make `arr` equal to `target` after any number of steps.',
    constraints: ['target.length == arr.length', '1 <= target.length <= 1000', '1 <= target[i], arr[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def canBeEqual(self, target: List[int], arr: List[int]) -> bool:
        return sorted(target) == sorted(arr)`,
      cpp: `class Solution {
public:
    bool canBeEqual(vector<int>& target, vector<int>& arr) {
        sort(target.begin(), target.end());
        sort(arr.begin(), arr.end());
        return target == arr;
    }
};`,
      java: `class Solution {
    public boolean canBeEqual(int[] target, int[] arr) {
        Arrays.sort(target);
        Arrays.sort(arr);
        return Arrays.equals(target, arr);
    }
}`,
      explanation: 'Since we can reverse any subarray, we can perform bubble sort operations (swapping adjacent items by reversing size-2 subarrays). Thus, arr can be transformed to target if and only if they are anagrams/permutations of each other. Verify this by sorting. Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-1464',
    slug: 'maximum-product-of-two-elements-in-an-array',
    title: 'Maximum Product of Two Elements in an Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given the array of integers `nums`, choose two different indices `i` and `j` of that array. Return the maximum value of `(nums[i]-1)*(nums[j]-1)`.',
    constraints: ['2 <= nums.length <= 500', '1 <= nums[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # Find the two largest numbers
        m1 = m2 = 0
        for x in nums:
            if x > m1:
                m2, m1 = m1, x
            elif x > m2:
                m2 = x
        return (m1 - 1) * (m2 - 1)`,
      cpp: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int m1 = 0, m2 = 0;
        for (int x : nums) {
            if (x > m1) { m2 = m1; m1 = x; }
            else if (x > m2) { m2 = x; }
        }
        return (m1 - 1) * (m2 - 1);
    }
};`,
      java: `class Solution {
    public int maxProduct(int[] nums) {
        int m1 = 0, m2 = 0;
        for (int x : nums) {
            if (x > m1) { m2 = m1; m1 = x; }
            else if (x > m2) { m2 = x; }
        }
        return (m1 - 1) * (m2 - 1);
    }
}`,
      explanation: 'To maximize (nums[i]-1)*(nums[j]-1), select the two largest elements in the array. Traverse once to track the largest (m1) and second largest (m2) numbers. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1470',
    slug: 'shuffle-the-array',
    title: 'Shuffle the Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given the array `nums` consisting of `2n` elements in the form `[x1, x2, ..., xn, y1, y2, ..., yn]`. Return the array in the form `[x1, y1, x2, y2, ..., xn, yn]`.',
    constraints: ['1 <= n <= 500', 'nums.length == 2 * n', '1 <= nums[i] <= 10^3'],
    solutions: {
      python: `class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        res = []
        for i in range(n):
            res.append(nums[i])
            res.append(nums[i + n])
        return res`,
      cpp: `class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        vector<int> res;
        for (int i = 0; i < n; ++i) {
            res.push_back(nums[i]);
            res.push_back(nums[i + n]);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] shuffle(int[] nums, int n) {
        int[] res = new int[2 * n];
        int idx = 0;
        for (int i = 0; i < n; i++) {
            res[idx++] = nums[i];
            res[idx++] = nums[i + n];
        }
        return res;
    }
}`,
      explanation: 'Use a simple loop of size n. In each step, append elements at index i (x_i) and index i + n (y_i) to the result array. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1475',
    slug: 'final-prices-with-a-special-discount-in-a-shop',
    title: 'Final Prices With a Special Discount in a Shop',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'Given the array `prices` where `prices[i]` is the price of the `i`-th item in a shop. You will receive a discount equivalent to `prices[j]` where `j` is the minimum index such that `j > i` and `prices[j] <= prices[i]`. Return the final prices.',
    constraints: ['1 <= prices.length <= 500', '1 <= prices[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def finalPrices(self, prices: List[int]) -> List[int]:
        stack = []
        res = list(prices)
        for i, p in enumerate(prices):
            while stack and prices[stack[-1]] >= p:
                idx = stack.pop()
                res[idx] -= p
            stack.append(i)
        return res`,
      cpp: `class Solution {
public:
    vector<int> finalPrices(vector<vector<int>>& prices) { // wait, type fix: vector<int>&
        // let's write below
        return {};
    }
    vector<int> finalPrices(vector<int>& prices) {
        vector<int> res = prices;
        vector<int> stack;
        for (int i = 0; i < prices.size(); ++i) {
            while (!stack.empty() && prices[stack.back()] >= prices[i]) {
                res[stack.back()] -= prices[i];
                stack.pop_back();
            }
            stack.push_back(i);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] finalPrices(int[] prices) {
        int[] res = prices.clone();
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < prices.length; i++) {
            while (!stack.isEmpty() && prices[stack.peek()] >= prices[i]) {
                res[stack.pop()] -= prices[i];
            }
            stack.push(i);
        }
        return res;
    }
}`,
      explanation: 'Use a Monotonic Stack. Maintain indices of prices in ascending order. When encountering a price smaller than or equal to the price at index stack.top(), pop it and apply the discount (subtract current price). Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1480',
    slug: 'running-sum-of-1d-array',
    title: 'Running Sum of 1d Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array `nums`. We define a running sum of an array as `runningSum[i] = sum(nums[0]…nums[i])`. Return the running sum of `nums`.',
    constraints: ['1 <= nums.length <= 1000', '-10^6 <= nums[i] <= 10^6'],
    solutions: {
      python: `class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
        for i in range(1, len(nums)):
            nums[i] += nums[i - 1]
        return nums`,
      cpp: `class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        for (int i = 1; i < nums.size(); ++i) nums[i] += nums[i - 1];
        return nums;
    }
};`,
      java: `class Solution {
    public int[] runningSum(int[] nums) {
        for (int i = 1; i < nums.length; i++) nums[i] += nums[i - 1];
        return nums;
    }
}`,
      explanation: 'Compute prefix sums in-place. Iterate starting from index 1 and add the value of the previous element to the current. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-1486',
    slug: 'xor-operation-in-an-array',
    title: 'XOR Operation in an Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'You are given an integer `n` and an integer `start`. Define an array `nums` where `nums[i] = start + 2 * i` (0-indexed) and `nums.length == n`. Return the bitwise XOR of all elements of `nums`.',
    constraints: ['1 <= n <= 1000', '0 <= start <= 1000', 'nums[i] is represented by the formula.'],
    solutions: {
      python: `class Solution:
    def xorOperation(self, n: int, start: int) -> int:
        xor = 0
        for i in range(n):
            xor ^= (start + 2 * i)
        return xor`,
      cpp: `class Solution {
public:
    int xorOperation(int n, int start) {
        int ans = 0;
        for (int i = 0; i < n; ++i) {
            ans ^= (start + 2 * i);
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int xorOperation(int n, int start) {
        int ans = 0;
        for (int i = 0; i < n; i++) {
            ans ^= (start + 2 * i);
        }
        return ans;
    }
}`,
      explanation: 'Loop through indices i from 0 to n - 1, calculate values start + 2 * i, and accumulate their bitwise XOR. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1491',
    slug: 'average-salary-excluding-the-minimum-and-maximum-salary',
    title: 'Average Salary Excluding the Minimum and Maximum Salary',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of unique integers `salary` where `salary[i]` is the salary of the `i`-th employee. Return the average salary of employees excluding the minimum and maximum salary.',
    constraints: ['3 <= salary.length <= 100', '1000 <= salary[i] <= 10^6', 'All integers in salary are unique.'],
    solutions: {
      python: `class Solution:
    def average(self, salary: List[int]) -> float:
        return (sum(salary) - min(salary) - max(salary)) / (len(salary) - 2)`,
      cpp: `class Solution {
public:
    double average(vector<int>& salary) {
        int mn = salary[0], mx = salary[0];
        double total = 0;
        for (int x : salary) {
            mn = min(mn, x);
            mx = max(mx, x);
            total += x;
        }
        return (total - mn - mx) / (salary.size() - 2);
    }
};`,
      java: `class Solution {
    public double average(int[] salary) {
        int mn = salary[0], mx = salary[0];
        double total = 0;
        for (int x : salary) {
            mn = Math.min(mn, x);
            mx = Math.max(mx, x);
            total += x;
        }
        return (total - mn - mx) / (salary.length - 2);
    }
}`,
      explanation: 'Identify the minimum and maximum salaries while accumulating the total sum of all salaries. Subtract min and max from the total, and divide by length - 2. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1496',
    slug: 'path-crossing',
    title: 'Path Crossing',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'Given a string `path`, where `path[i]` is \'N\', \'S\', \'E\' or \'W\', each representing moving one unit north, south, east, or west, respectively. You start at the origin `(0, 0)`. Return `true` if the path crosses itself.',
    constraints: ['1 <= path.length <= 10^4', 'path[i] is either \'N\', \'S\', \'E\' or \'W\'.'],
    solutions: {
      python: `class Solution:
    def isPathCrossing(self, path: str) -> bool:
        x, y = 0, 0
        seen = {(0, 0)}
        for c in path:
            if c == 'N': y += 1
            elif c == 'S': y -= 1
            elif c == 'E': x += 1
            elif c == 'W': x -= 1
            pos = (x, y)
            if pos in seen:
                return True
            seen.add(pos)
        return False`,
      cpp: `class Solution {
public:
    bool isPathCrossing(string path) {
        int x = 0, y = 0;
        set<pair<int, int>> seen;
        seen.insert({0, 0});
        for (char c : path) {
            if (c == 'N') y++;
            else if (c == 'S') y--;
            else if (c == 'E') x++;
            else if (c == 'W') x--;
            if (seen.count({x, y})) return true;
            seen.insert({x, y});
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean isPathCrossing(String path) {
        int x = 0, y = 0;
        Set<String> seen = new HashSet<>();
        seen.add("0,0");
        for (char c : path.toCharArray()) {
            if (c == 'N') y++;
            else if (c == 'S') y--;
            else if (c == 'E') x++;
            else if (c == 'W') x--;
            String key = x + "," + y;
            if (seen.contains(key)) return true;
            seen.add(key);
        }
        return false;
    }
}`,
      explanation: 'Trace coordinates on a 2D plane starting from (0, 0). Record visited points in a hash set (using coordinate pairs or string keys). If the current coordinate is already present in the set, the path crosses itself. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1502',
    slug: 'can-make-arithmetic-progression-from-sequence',
    title: 'Can Make Arithmetic Progression From Sequence',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'A sequence of numbers is called an arithmetic progression if the difference between any two consecutive elements is the same. Return `true` if the array can be rearranged to form an arithmetic progression.',
    constraints: ['2 <= arr.length <= 1000', '-10^6 <= arr[i] <= 10^6'],
    solutions: {
      python: `class Solution:
    def canMakeArithmeticProgression(self, arr: List[int]) -> bool:
        arr.sort()
        diff = arr[1] - arr[0]
        for i in range(2, len(arr)):
            if arr[i] - arr[i - 1] != diff:
                return False
        return True`,
      cpp: `class Solution {
public:
    bool canMakeArithmeticProgression(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int diff = arr[1] - arr[0];
        for (int i = 2; i < arr.size(); ++i) {
            if (arr[i] - arr[i - 1] != diff) return false;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean canMakeArithmeticProgression(int[] arr) {
        Arrays.sort(arr);
        int diff = arr[1] - arr[0];
        for (int i = 2; i < arr.length; i++) {
            if (arr[i] - arr[i - 1] != diff) return false;
        }
        return true;
    }
}`,
      explanation: 'Sort the array. An arithmetic progression requires the difference between adjacent sorted elements to be identical. Compute the initial difference and verify for all elements. Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-1507',
    slug: 'reformat-date',
    title: 'Reformat Date',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a `date` string in the format `"Day Month Year"`, convert it to `"YYYY-MM-DD"`.',
    constraints: ['The given date is guaranteed to be valid.'],
    solutions: {
      python: `class Solution:
    def reformatDate(self, date: str) -> str:
        months = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"}
        parts = date.split(" ")
        day_str = parts[0]
        # Remove suffix
        day = "".join(c for c in day_str if c.isdigit())
        if len(day) == 1: day = "0" + day
        return f"{parts[2]}-{months[parts[1]]}-{day}"`,
      cpp: `class Solution {
public:
    string reformatDate(string date) {
        unordered_map<string, string> months = {{"Jan","01"},{"Feb","02"},{"Mar","03"},{"Apr","04"},{"May","05"},{"Jun","06"},{"Jul","07"},{"Aug","08"},{"Sep","09"},{"Oct","10"},{"Nov","11"},{"Dec","12"}};
        stringstream ss(date);
        string dayStr, monthStr, yearStr;
        ss >> dayStr >> monthStr >> yearStr;
        string day = "";
        for (char c : dayStr) if (isdigit(c)) day += c;
        if (day.size() == 1) day = "0" + day;
        return yearStr + "-" + months[monthStr] + "-" + day;
    }
};`,
      java: `class Solution {
    public String reformatDate(String date) {
        Map<String, String> months = new HashMap<>();
        String[] mList = {"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"};
        for (int i = 0; i < 12; i++) {
            months.put(mList[i], String.format("%02d", i + 1));
        }
        String[] parts = date.split(" ");
        String dayStr = parts[0];
        StringBuilder day = new StringBuilder();
        for (char c : dayStr.toCharArray()) {
            if (Character.isDigit(c)) day.append(c);
        }
        if (day.length() == 1) day.insert(0, "0");
        return parts[2] + "-" + months.get(parts[1]) + "-" + day.toString();
    }
}`,
      explanation: 'Parse date parts by splitting on space. Extract the day numeric digits, padding with a leading "0" if single-digit. Map month abbreviations to their 2-digit representation. Return the concatenated YYYY-MM-DD string. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1512',
    slug: 'number-of-good-pairs',
    title: 'Number of Good Pairs',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of integers `nums`, return the number of good pairs. A pair `(i, j)` is called good if `nums[i] == nums[j]` and `i < j`.',
    constraints: ['1 <= nums.length <= 100', '1 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        counts = {}
        ans = 0
        for x in nums:
            ans += counts.get(x, 0)
            counts[x] = counts.get(x, 0) + 1
        return ans`,
      cpp: `class Solution {
public:
    int numIdenticalPairs(vector<int>& nums) {
        unordered_map<int, int> counts;
        int ans = 0;
        for (int x : nums) {
            ans += counts[x];
            counts[x]++;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int numIdenticalPairs(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        int ans = 0;
        for (int x : nums) {
            ans += counts.getOrDefault(x, 0);
            counts.put(x, counts.getOrDefault(x, 0) + 1);
        }
        return ans;
    }
}`,
      explanation: 'Maintain a hash map of frequencies for each element. As you iterate through the array, add the current frequency count of the element to the answer, and increment its frequency count. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1518',
    slug: 'water-bottles',
    title: 'Water Bottles',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given `numBottles` full water bottles and `numExchange` representing how many empty bottles you can exchange for one full bottle. Return the maximum number of water bottles you can drink.',
    constraints: ['1 <= numBottles <= 100', '2 <= numExchange <= 100'],
    solutions: {
      python: `class Solution:
    def numWaterBottles(self, numBottles: int, numExchange: int) -> int:
        ans = numBottles
        while numBottles >= numExchange:
            new_bottles = numBottles // numExchange
            ans += new_bottles
            numBottles = new_bottles + (numBottles % numExchange)
        return ans`,
      cpp: `class Solution {
public:
    int numWaterBottles(int numBottles, int numExchange) {
        int ans = numBottles;
        while (numBottles >= numExchange) {
            int newBottles = numBottles / numExchange;
            ans += newBottles;
            numBottles = newBottles + (numBottles % numExchange);
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int numWaterBottles(int numBottles, int numExchange) {
        int ans = numBottles;
        while (numBottles >= numExchange) {
            int newBottles = numBottles / numExchange;
            ans += newBottles;
            numBottles = newBottles + (numBottles % numExchange);
        }
        return ans;
    }
}`,
      explanation: 'Drink all full bottles first (accumulate to ans). Exchange empty bottles: new full bottles = empty / exchange, remainder empty = empty % exchange. Repeat until total empty bottles is less than numExchange. Time complexity: O(log_exchange numBottles), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1850A',
    slug: 'cf-1850a',
    title: 'To My Critics',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Conditional',
    description: 'Given three digits `a`, `b`, `c`. Check if there exists a pair of digits whose sum is greater than or equal to 10.',
    constraints: ['1 <= t <= 1000', '0 <= a, b, c <= 9'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    a, b, c = map(int, input().split())
    if a + b >= 10 or a + c >= 10 or b + c >= 10:
        print("YES")
    else:
        print("NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int a, b, c; cin >> a >> b >> c;
        if (a + b >= 10 || a + c >= 10 || b + c >= 10) cout << "YES\\n";
        else cout << "NO\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
            if (a + b >= 10 || a + c >= 10 || b + c >= 10) System.out.println("YES");
            else System.out.println("NO");
        }
    }
}`,
      explanation: 'Check if any pair among the three inputs sums to >= 10. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1873A',
    slug: 'cf-1873a',
    title: 'Short Sort',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'String',
    description: 'You are given a string `s` of length 3 containing \'a\', \'b\', \'c\'. You can perform at most one swap of two characters. Can you make the string equal to "abc"?',
    constraints: ['1 <= t <= 6', 's is a permutation of "abc".'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    s = input()
    # At most one swap means at least one character must already be in its correct position
    if s[0] == "a" or s[1] == "b" or s[2] == "c":
        print("YES")
    else:
        print("NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        string s; cin >> s;
        if (s[0] == 'a' || s[1] == 'b' || s[2] == 'c') cout << "YES\\n";
        else cout << "NO\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            String s = sc.next();
            if (s.charAt(0) == 'a' || s.charAt(1) == 'b' || s.charAt(2) == 'c') System.out.println("YES");
            else System.out.println("NO");
        }
    }
}`,
      explanation: 'Since the string length is 3, making it "abc" in at most one swap requires at least one character to be at its correct target index (the other two are either correct or can be swapped). Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1915A',
    slug: 'cf-1915a',
    title: 'Odd One Out',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'You are given three digits `a`, `b`, `c`. Two of them are equal. Find the outlier value.',
    constraints: ['1 <= t <= 270', '0 <= a, b, c <= 9'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    a, b, c = map(int, input().split())
    print(a ^ b ^ c)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int a, b, c; cin >> a >> b >> c;
        cout << (a ^ b ^ c) << "\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
            System.out.println(a ^ b ^ c);
        }
    }
}`,
      explanation: 'Use XOR operation. Since x ^ x = 0, the two matching numbers will cancel each other out, leaving only the odd one out. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1929A',
    slug: 'cf-1929a',
    title: 'Sasha and the Beautiful Array',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Greedy',
    description: 'Sasha wants to rearrange the array `a` to maximize the sum of adjacent differences `a[i] - a[i-1]` for sorted elements. Return the maximum possible sum.',
    constraints: ['1 <= t <= 500', '2 <= n <= 100', '1 <= a_i <= 10^9'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    n = int(input())
    a = list(map(int, input().split()))
    print(max(a) - min(a))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        vector<int> a(n);
        for (int i = 0; i < n; ++i) cin >> a[i];
        int mn = *min_element(a.begin(), a.end());
        int mx = *max_element(a.begin(), a.end());
        cout << mx - mn << "\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int mn = Integer.MAX_VALUE, mx = Integer.MIN_VALUE;
            for (int i = 0; i < n; i++) {
                int x = sc.nextInt();
                mn = Math.min(mn, x);
                mx = Math.max(mx, x);
            }
            System.out.println(mx - mn);
        }
    }
}`,
      explanation: 'If the array is sorted, the sum of differences (a[1] - a[0]) + (a[2] - a[1]) + ... simplifies telescopically to a[n-1] - a[0], which is max(a) - min(a). Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'cf-1985A',
    slug: 'cf-1985a',
    title: 'Creating Words',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'String',
    description: 'You are given two strings `a` and `b` of length 3. Swap their first characters and print them.',
    constraints: ['1 <= t <= 100', '|a| = |b| = 3'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    a, b = input().split()
    print(b[0] + a[1:], a[0] + b[1:])`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        string a, b; cin >> a >> b;
        swap(a[0], b[0]);
        cout << a << " " << b << "\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            String a = sc.next(), b = sc.next();
            System.out.println(b.charAt(0) + a.substring(1) + " " + a.charAt(0) + b.substring(1));
        }
    }
}`,
      explanation: 'Swap the characters at index 0 of both strings, and output the updated strings. Time complexity: O(1), Space complexity: O(1).'
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
