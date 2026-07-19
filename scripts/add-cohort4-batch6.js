const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const BATCH = [
  {
    id: 'lc-1528',
    slug: 'shuffle-string',
    title: 'Shuffle String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given a string `s` and an integer array `indices` of the same length. The string `s` will be shuffled such that the character at the `i`-th position moves to `indices[i]` in the shuffled string. Return the shuffled string.',
    constraints: ['s.length == indices.length == n', '1 <= n <= 100', 's consists of lowercase English letters.', '0 <= indices[i] < n', 'All values of indices are unique.'],
    solutions: {
      python: `class Solution:
    def restoreString(self, s: str, indices: List[int]) -> str:
        res = [""] * len(s)
        for i, idx in enumerate(indices):
            res[idx] = s[i]
        return "".join(res)`,
      cpp: `class Solution {
public:
    string restoreString(string s, vector<int>& indices) {
        string res = s;
        for (int i = 0; i < s.size(); ++i) {
            res[indices[i]] = s[i];
        }
        return res;
    }
};`,
      java: `class Solution {
    public String restoreString(String s, int[] indices) {
        char[] res = new char[s.length()];
        for (int i = 0; i < s.length(); i++) {
            res[indices[i]] = s.charAt(i);
        }
        return new String(res);
    }
}`,
      explanation: 'Place each character s[i] at its target index indices[i] in the output character array. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1534',
    slug: 'count-good-triplets',
    title: 'Count Good Triplets',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of integers `arr`, and three integers `a`, `b` and `c`. You need to find the number of good triplets. A triplet `(arr[i], arr[j], arr[k])` is good if the following conditions are true:\n- `0 <= i < j < k < arr.length`\n- `abs(arr[i] - arr[j]) <= a`\n- `abs(arr[j] - arr[k]) <= b`\n- `abs(arr[i] - arr[k]) <= c`',
    constraints: ['3 <= arr.length <= 100', '0 <= arr[i] <= 1000', '0 <= a, b, c <= 1000'],
    solutions: {
      python: `class Solution:
    def countGoodTriplets(self, arr: List[int], a: int, b: int, c: int) -> int:
        ans = 0
        n = len(arr)
        for i in range(n):
            for j in range(i + 1, n):
                if abs(arr[i] - arr[j]) <= a:
                    for k in range(j + 1, n):
                        if abs(arr[j] - arr[k]) <= b and abs(arr[i] - arr[k]) <= c:
                            ans += 1
        return ans`,
      cpp: `class Solution {
public:
    int countGoodTriplets(vector<int>& arr, int a, int b, int c) {
        int ans = 0, n = arr.size();
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (abs(arr[i] - arr[j]) <= a) {
                    for (int k = j + 1; k < n; ++k) {
                        if (abs(arr[j] - arr[k]) <= b && abs(arr[i] - arr[k]) <= c) {
                            ans++;
                        }
                    }
                }
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int countGoodTriplets(int[] arr, int a, int b, int c) {
        int ans = 0, n = arr.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (Math.abs(arr[i] - arr[j]) <= a) {
                    for (int k = j + 1; k < n; k++) {
                        if (Math.abs(arr[j] - arr[k]) <= b && Math.abs(arr[i] - arr[k]) <= c) {
                            ans++;
                        }
                    }
                }
            }
        }
        return ans;
    }
}`,
      explanation: 'Use a nested 3-loop structure. Optimize the search by evaluating the condition abs(arr[i] - arr[j]) <= a in the middle loop, pruning the third loop completely if it is violated. Time complexity: O(n^3), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1539',
    slug: 'kth-missing-positive-number',
    title: 'Kth Missing Positive Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given an array `arr` of positive integers sorted in a strictly increasing order, and an integer `k`. Return the `k`-th positive integer that is missing from this array.',
    constraints: ['1 <= arr.length <= 1000', '1 <= arr[i] <= 1000', '1 <= k <= 1000', 'arr is sorted in strictly increasing order.'],
    solutions: {
      python: `class Solution:
    def findKthPositive(self, arr: List[int], k: int) -> int:
        low, high = 0, len(arr) - 1
        while low <= high:
            mid = (low + high) // 2
            # Missing numbers up to mid is arr[mid] - (mid + 1)
            missing = arr[mid] - (mid + 1)
            if missing < k:
                low = mid + 1
            else:
                high = mid - 1
        # Kth missing number is low + k
        return low + k`,
      cpp: `class Solution {
public:
    int findKthPositive(vector<int>& arr, int k) {
        int low = 0, high = arr.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int missing = arr[mid] - (mid + 1);
            if (missing < k) low = mid + 1;
            else high = mid - 1;
        }
        return low + k;
    }
};`,
      java: `class Solution {
    public int findKthPositive(int[] arr, int k) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int missing = arr[mid] - (mid + 1);
            if (missing < k) low = mid + 1;
            else high = mid - 1;
        }
        return low + k;
    }
}`,
      explanation: 'Use binary search. The count of missing numbers up to index mid is arr[mid] - (mid + 1). If missing < k, we need to search to the right (low = mid + 1); otherwise, search left. The kth missing number is low + k. Time complexity: O(log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1544',
    slug: 'make-the-string-great',
    title: 'Make The String Great',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'Given a string `s` of lower and upper case English letters. A good string is a string which doesn\'t have two adjacent characters `s[i]` and `s[i + 1]` where: `s[i]` and `s[i + 1]` are the same letter but in different cases. Return the final string.',
    constraints: ['1 <= s.length <= 100', 's consists of lower and upper case English letters.'],
    solutions: {
      python: `class Solution:
    def makeGood(self, s: str) -> str:
        stack = []
        for c in s:
            if stack and abs(ord(stack[-1]) - ord(c)) == 32:
                stack.pop()
            else:
                stack.append(c)
        return "".join(stack)`,
      cpp: `class Solution {
public:
    string makeGood(string s) {
        string res = "";
        for (char c : s) {
            if (!res.empty() && abs(res.back() - c) == 32) res.pop_back();
            else res.push_back(c);
        }
        return res;
    }
};`,
      java: `class Solution {
    public String makeGood(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            int len = sb.length();
            if (len > 0 && Math.abs(sb.charAt(len - 1) - c) == 32) {
                sb.deleteCharAt(len - 1);
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}`,
      explanation: 'Use a stack. Push characters onto the stack. If the stack is not empty and the current character c forms a bad pair with the top of the stack (i.e. same letter but different case: abs(ord(c1) - ord(c2)) == 32), pop the top element. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1550',
    slug: 'three-consecutive-odds',
    title: 'Three Consecutive Odds',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an integer array `arr`, return `true` if there are three consecutive odd numbers in the array. Otherwise, return `false`.',
    constraints: ['1 <= arr.length <= 1000', '1 <= arr[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def threeConsecutiveOdds(self, arr: List[int]) -> bool:
        count = 0
        for x in arr:
            if x % 2 == 1:
                count += 1
                if count == 3: return True
            else:
                count = 0
        return False`,
      cpp: `class Solution {
public:
    bool threeConsecutiveOdds(vector<int>& arr) {
        int count = 0;
        for (int x : arr) {
            if (x % 2 == 1) {
                count++;
                if (count == 3) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean threeConsecutiveOdds(int[] arr) {
        int count = 0;
        for (int x : arr) {
            if (x % 2 == 1) {
                count++;
                if (count == 3) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }
}`,
      explanation: 'Traverse the array. Keep a running count of consecutive odd numbers. Reset count to 0 when encountering an even number. Return true if count hits 3. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1556',
    slug: 'thousand-separator',
    title: 'Thousand Separator',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an integer `n`, add a dot (`"."`) as the thousands separator and return it in string format.',
    constraints: ['0 <= n <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def thousandSeparator(self, n: int) -> str:
        s = str(n)
        res = []
        count = 0
        for c in reversed(s):
            if count > 0 and count % 3 == 0:
                res.append(".")
            res.append(c)
            count += 1
        return "".join(reversed(res))`,
      cpp: `class Solution {
public:
    string thousandSeparator(int n) {
        string s = to_string(n);
        string res = "";
        int count = 0;
        for (int i = s.size() - 1; i >= 0; --i) {
            if (count > 0 && count % 3 == 0) res += ".";
            res += s[i];
            count++;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`,
      java: `class Solution {
    public String thousandSeparator(int n) {
        String s = String.valueOf(n);
        StringBuilder sb = new StringBuilder();
        int count = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            if (count > 0 && count % 3 == 0) sb.append(".");
            sb.append(s.charAt(i));
            count++;
        }
        return sb.reverse().toString();
    }
}`,
      explanation: 'Convert n to a string. Traverse the digits backwards. Insert a dot separator "." every 3 digits (except before the first digit of the output). Reverse the result. Time complexity: O(log_10 n) digits, Space complexity: O(log_10 n).'
    }
  },
  {
    id: 'lc-1560',
    slug: 'most-visited-sector-in-a-circular-track',
    title: 'Most Visited Sector in a Circular Track',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an integer `n` and an integer array `rounds`. We have a circular track which consists of `n` sectors labeled from `1` to `n`. Return an array of the most visited sectors sorted in ascending order.',
    constraints: ['2 <= n <= 100', '1 <= rounds.length <= 100', '1 <= rounds[i] <= n', 'rounds[i] != rounds[i+1] for 0 <= i < rounds.length - 1'],
    solutions: {
      python: `class Solution:
    def mostVisited(self, n: int, rounds: List[int]) -> List[int]:
        start = rounds[0]
        end = rounds[-1]
        if start <= end:
            return list(range(start, end + 1))
        else:
            return list(range(1, end + 1)) + list(range(start, n + 1))`,
      cpp: `class Solution {
public:
    vector<int> mostVisited(int n, vector<int>& rounds) {
        int start = rounds[0], end = rounds.back();
        vector<int> res;
        if (start <= end) {
            for (int i = start; i <= end; ++i) res.push_back(i);
        } else {
            for (int i = 1; i <= end; ++i) res.push_back(i);
            for (int i = start; i <= n; ++i) res.push_back(i);
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<Integer> mostVisited(int n, int[] rounds) {
        int start = rounds[0], end = rounds[rounds.length - 1];
        List<Integer> res = new ArrayList<>();
        if (start <= end) {
            for (int i = start; i <= end; i++) res.add(i);
        } else {
            for (int i = 1; i <= end; i++) res.add(i);
            for (int i = start; i <= n; i++) res.add(i);
        }
        return res;
    }
}`,
      explanation: 'Since the path is circular, intermediate full rounds visit all sectors equally. The sectors visited the most are simply the ones in the final incomplete round, starting from rounds[0] and ending at rounds[last]. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1566',
    slug: 'detect-pattern-of-length-m-repeated-k-or-more-times',
    title: 'Detect Pattern of Length M Repeated K or More Times',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given an array of positive integers `arr`, find if there exists a pattern of length `m` that is repeated `k` or more times.',
    constraints: ['2 <= arr.length <= 100', '1 <= arr[i] <= 100', '1 <= m <= 100', '2 <= k <= 100'],
    solutions: {
      python: `class Solution:
    def containsPattern(self, arr: List[int], m: int, k: int) -> bool:
        count = 0
        for i in range(len(arr) - m):
            if arr[i] == arr[i + m]:
                count += 1
            else:
                count = 0
            if count == (k - 1) * m:
                return True
        return False`,
      cpp: `class Solution {
public:
    bool containsPattern(vector<int>& arr, int m, int k) {
        int count = 0;
        for (int i = 0; i + m < arr.size(); ++i) {
            if (arr[i] == arr[i + m]) {
                count++;
                if (count == (k - 1) * m) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean containsPattern(int[] arr, int m, int k) {
        int count = 0;
        for (int i = 0; i + m < arr.length; i++) {
            if (arr[i] == arr[i + m]) {
                count++;
                if (count == (k - 1) * m) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }
}`,
      explanation: 'Check if there is a block of elements of size (k - 1) * m where arr[i] == arr[i + m] holds true for all indices in the block. Maintain a running counter of consecutive matches. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1572',
    slug: 'matrix-diagonal-sum',
    title: 'Matrix Diagonal Sum',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a square matrix `mat`, return the sum of the matrix diagonals. Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.',
    constraints: ['n == mat.length == mat[i].length', '1 <= n <= 100', '1 <= mat[i][j] <= 100'],
    solutions: {
      python: `class Solution:
    def diagonalSum(self, mat: List[List[int]]) -> int:
        n = len(mat)
        ans = 0
        for i in range(n):
            ans += mat[i][i] + mat[i][n - 1 - i]
        if n % 2 == 1:
            ans -= mat[n // 2][n // 2]
        return ans`,
      cpp: `class Solution {
public:
    int diagonalSum(vector<vector<int>>& mat) {
        int n = mat.size(), ans = 0;
        for (int i = 0; i < n; ++i) {
            ans += mat[i][i] + mat[i][n - 1 - i];
        }
        if (n % 2 == 1) ans -= mat[n / 2][n / 2];
        return ans;
    }
};`,
      java: `class Solution {
    public int diagonalSum(int[][] mat) {
        int n = mat.length, ans = 0;
        for (int i = 0; i < n; i++) {
            ans += mat[i][i] + mat[i][n - 1 - i];
        }
        if (n % 2 == 1) ans -= mat[n / 2][n / 2];
        return ans;
    }
}`,
      explanation: 'Sum elements along the primary diagonal (mat[i][i]) and secondary diagonal (mat[i][n - 1 - i]). If n is odd, the middle element is shared by both diagonals, so subtract it once from the total. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1576',
    slug: 'replace-all-s-to-avoid-consecutive-repeating-characters',
    title: 'Replace All ?\'s to Avoid Consecutive Repeating Characters',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given a string `s` containing only lowercase English letters and the `\'?\'` character, convert **all** the `\'?\'` characters into lowercase letters such that no two **adjacent** characters are equal.',
    constraints: ['1 <= s.length <= 100', 's contains only lowercase English letters and \'?\'.'],
    solutions: {
      python: `class Solution:
    def modifyString(self, s: str) -> str:
        chars = list(s)
        for i, c in enumerate(chars):
            if c == '?':
                for letter in 'abc':
                    # Check if letter conflicts with left or right neighbors
                    left = chars[i - 1] if i > 0 else ""
                    right = chars[i + 1] if i + 1 < len(chars) else ""
                    if letter != left and letter != right:
                        chars[i] = letter
                        break
        return "".join(chars)`,
      cpp: `class Solution {
public:
    string modifyString(string s) {
        for (int i = 0; i < s.size(); ++i) {
            if (s[i] == '?') {
                for (char letter : {'a', 'b', 'c'}) {
                    char left = (i > 0) ? s[i - 1] : ' ';
                    char right = (i + 1 < s.size()) ? s[i + 1] : ' ';
                    if (letter != left && letter != right) {
                        s[i] = letter;
                        break;
                    }
                }
            }
        }
        return s;
    }
};`,
      java: `class Solution {
    public String modifyString(String s) {
        char[] chars = s.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            if (chars[i] == '?') {
                for (char letter = 'a'; letter <= 'c'; letter++) {
                    char left = (i > 0) ? chars[i - 1] : ' ';
                    char right = (i + 1 < chars.length) ? chars[i + 1] : ' ';
                    if (letter != left && letter != right) {
                        chars[i] = letter;
                        break;
                    }
                }
            }
        }
        return new String(chars);
    }
}`,
      explanation: 'For each \'?\' character, test replacements from a small set of characters (\'a\', \'b\', \'c\'). A set of size 3 is sufficient to avoid conflicts with left and right neighbors. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1582',
    slug: 'special-positions-in-a-binary-matrix',
    title: 'Special Positions in a Binary Matrix',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an `m x n` binary matrix `mat`, return the number of special positions in `mat`. A position `(r, c)` is special if `mat[r][c] == 1` and all other elements in row `r` and column `c` are `0`.',
    constraints: ['m == mat.length', 'n == mat[i].length', '1 <= m, n <= 100', 'mat[i][j] is 0 or 1.'],
    solutions: {
      python: `class Solution:
    def numSpecial(self, mat: List[List[int]]) -> int:
        m, n = len(mat), len(mat[0])
        rows = [sum(row) for row in mat]
        cols = [sum(col) for col in zip(*mat)]
        ans = 0
        for r in range(m):
            for c in range(n):
                if mat[r][c] == 1 and rows[r] == 1 and cols[c] == 1:
                    ans += 1
        return ans`,
      cpp: `class Solution {
public:
    int numSpecial(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        vector<int> rows(m, 0), cols(n, 0);
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (mat[r][c] == 1) { rows[r]++; cols[c]++; }
            }
        }
        int ans = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (mat[r][c] == 1 && rows[r] == 1 && cols[c] == 1) ans++;
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int numSpecial(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        int[] rows = new int[m];
        int[] cols = new int[n];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (mat[r][c] == 1) { rows[r]++; cols[c]++; }
            }
        }
        int ans = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (mat[r][c] == 1 && rows[r] == 1 && cols[c] == 1) ans++;
            }
        }
        return ans;
    }
}`,
      explanation: 'Precompute the count of 1s in each row and column. A cell (r, c) is special if mat[r][c] == 1 and row_counts[r] == 1 and col_counts[c] == 1. Time complexity: O(m * n), Space complexity: O(m + n).'
    }
  },
  {
    id: 'lc-1588',
    slug: 'sum-of-all-odd-length-subarrays',
    title: 'Sum of All Odd Length Subarrays',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of positive integers `arr`, return the sum of all possible **odd-length subarrays**.',
    constraints: ['1 <= arr.length <= 100', '1 <= arr[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def sumOddLengthSubarrays(self, arr: List[int]) -> int:
        # Calculate contribution of each element arr[i]
        ans = 0
        n = len(arr)
        for i, x in enumerate(arr):
            # Number of subarrays starting before or at i: (i + 1)
            # Number of subarrays ending at or after i: (n - i)
            total = (i + 1) * (n - i)
            odd = (total + 1) // 2
            ans += odd * x
        return ans`,
      cpp: `class Solution {
public:
    int sumOddLengthSubarrays(vector<int>& arr) {
        int ans = 0, n = arr.size();
        for (int i = 0; i < n; ++i) {
            int total = (i + 1) * (n - i);
            int odd = (total + 1) / 2;
            ans += odd * arr[i];
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int sumOddLengthSubarrays(int[] arr) {
        int ans = 0, n = arr.length;
        for (int i = 0; i < n; i++) {
            int total = (i + 1) * (n - i);
            int odd = (total + 1) / 2;
            ans += odd * arr[i];
        }
        return ans;
    }
}`,
      explanation: 'Calculate the contribution of each element arr[i] to the total sum. The total number of subarrays containing index i is (i + 1) * (n - i). Half of these (rounded up) have odd length. Accumulate odd_subarrays_count * arr[i]. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1592',
    slug: 'rearrange-spaces-between-words',
    title: 'Rearrange Spaces Between Words',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given a string `text` of words and spaces. Rearrange the spaces so that there is an equal number of spaces between every pair of adjacent words and the extra spaces are placed at the end.',
    constraints: ['1 <= text.length <= 100', 'text consists of lowercase English letters and spaces.', 'text contains at least one word.'],
    solutions: {
      python: `class Solution:
    def reorderSpaces(self, text: str) -> str:
        spaces = text.count(" ")
        words = text.split()
        num_gaps = len(words) - 1
        if num_gaps == 0:
            return words[0] + " " * spaces
        gap = spaces // num_gaps
        rem = spaces % num_gaps
        return (" " * gap).join(words) + " " * rem`,
      cpp: `class Solution {
public:
    string reorderSpaces(string text) {
        int spaces = 0;
        for (char c : text) if (c == ' ') spaces++;
        stringstream ss(text);
        string word;
        vector<string> words;
        while (ss >> word) words.push_back(word);
        int numGaps = words.size() - 1;
        if (numGaps == 0) return words[0] + string(spaces, ' ');
        int gap = spaces / numGaps;
        int rem = spaces % numGaps;
        string res = "";
        for (int i = 0; i < words.size(); ++i) {
            res += words[i];
            if (i < numGaps) res += string(gap, ' ');
        }
        res += string(rem, ' ');
        return res;
    }
};`,
      java: `class Solution {
    public String reorderSpaces(String text) {
        int spaces = 0;
        for (char c : text.toCharArray()) if (c == ' ') spaces++;
        String[] words = text.trim().split("\\\\s+");
        int numGaps = words.length - 1;
        if (words.length == 1 && words[0].isEmpty()) return " ".repeat(spaces);
        if (numGaps == 0) return words[0] + " ".repeat(spaces);
        int gap = spaces / numGaps;
        int rem = spaces % numGaps;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            sb.append(words[i]);
            if (i < numGaps) sb.append(" ".repeat(gap));
        }
        sb.append(" ".repeat(rem));
        return sb.toString();
    }
}`,
      explanation: 'Count the total number of space characters. Split the text into words. If there is only 1 word, append all spaces to the end. Otherwise, distribute spaces evenly between words (size of gap = total_spaces / (words_count - 1)) and append the remainder space (total_spaces % (words_count - 1)) to the end. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1598',
    slug: 'crawler-log-folder',
    title: 'Crawler Log Folder',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'The file system keeps a log of users actions. Return the minimum number of operations needed to go back to the main folder after the change folder operations.',
    constraints: ['1 <= logs.length <= 1000', 'logs[i] consists of English letters, digits, \'.\', and \'/\'.', 'logs[i] is formatted as directory_name/, ../, or ./.'],
    solutions: {
      python: `class Solution:
    def minOperations(self, logs: List[str]) -> int:
        depth = 0
        for op in logs:
            if op == "../":
                depth = max(0, depth - 1)
            elif op != "./":
                depth += 1
        return depth`,
      cpp: `class Solution {
public:
    int minOperations(vector<string>& logs) {
        int depth = 0;
        for (const string& op : logs) {
            if (op == "../") depth = max(0, depth - 1);
            else if (op != "./") depth++;
        }
        return depth;
    }
};`,
      java: `class Solution {
    public int minOperations(String[] logs) {
        int depth = 0;
        for (String op : logs) {
            if (op.equals("../")) depth = Math.max(0, depth - 1);
            else if (!op.equals("./")) depth++;
        }
        return depth;
    }
}`,
      explanation: 'Maintain a depth counter. Walk through operations: "../" decrements depth (bounded by 0), "./" is a no-op, and any folder name "dir/" increments depth. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1603',
    slug: 'design-parking-system',
    title: 'Design Parking System',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.',
    constraints: ['0 <= big, medium, small <= 1000', 'carType is 1, 2, or 3.', 'At most 1000 calls will be made to addCar.'],
    solutions: {
      python: `class ParkingSystem:
    def __init__(self, big: int, medium: int, small: int):
        self.slots = {1: big, 2: medium, 3: small}
        
    def addCar(self, carType: int) -> bool:
        if self.slots[carType] > 0:
            self.slots[carType] -= 1
            return True
        return False`,
      cpp: `class ParkingSystem {
    int slots[4];
public:
    ParkingSystem(int big, int medium, int small) {
        slots[1] = big;
        slots[2] = medium;
        slots[3] = small;
    }
    bool addCar(int carType) {
        if (slots[carType] > 0) { slots[carType]--; return true; }
        return false;
    }
};`,
      java: `class ParkingSystem {
    private int[] slots = new int[4];
    public ParkingSystem(int big, int medium, int small) {
        slots[1] = big;
        slots[2] = medium;
        slots[3] = small;
    }
    public boolean addCar(int carType) {
        if (slots[carType] > 0) { slots[carType]--; return true; }
        return false;
    }
}`,
      explanation: 'Store space limits in a 1-based index array. On addCar(carType), check if slots[carType] > 0; if so, decrement count and return true; else return false. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1608',
    slug: 'special-array-with-x-elements-greater-than-or-equal-x',
    title: 'Special Array With X Elements Greater Than or Equal X',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given an array of non-negative integers `nums`. Consider a number `x` special if there are exactly `x` numbers in `nums` that are greater than or equal to `x`. Return `x` if it exists, otherwise `-1`.',
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def specialArray(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)
        # Search for x in range [1, n]
        for x in range(1, n + 1):
            # Binary search first element >= x
            low, high = 0, n - 1
            idx = n
            while low <= high:
                mid = (low + high) // 2
                if nums[mid] >= x:
                    idx = mid
                    high = mid - 1
                else:
                    low = mid + 1
            if n - idx == x:
                return x
        return -1`,
      cpp: `class Solution {
public:
    int specialArray(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        for (int x = 1; x <= n; ++x) {
            int low = 0, high = n - 1, idx = n;
            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (nums[mid] >= x) { idx = mid; high = mid - 1; }
                else low = mid + 1;
            }
            if (n - idx == x) return x;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int specialArray(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        for (int x = 1; x <= n; x++) {
            int low = 0, high = n - 1, idx = n;
            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (nums[mid] >= x) { idx = mid; high = mid - 1; }
                else low = mid + 1;
            }
            if (n - idx == x) return x;
        }
        return -1;
    }
}`,
      explanation: 'Sort the array. For each candidate x in range [1, n], locate the first element >= x using binary search. If the count of elements >= x (calculated as n - idx) equals x, return x. Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-1614',
    slug: 'maximum-nesting-depth-of-the-parentheses',
    title: 'Maximum Nesting Depth of the Parentheses',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'Given a VPS representation string `s`, return the nesting depth of `s`.',
    constraints: ['1 <= s.length <= 100', 's consists of digits, \'+/-\', and \'()\'.', 'It is guaranteed that s is a VPS.'],
    solutions: {
      python: `class Solution:
    def maxDepth(self, s: str) -> int:
        ans = cur = 0
        for c in s:
            if c == '(':
                cur += 1
                ans = max(ans, cur)
            elif c == ')':
                cur -= 1
        return ans`,
      cpp: `class Solution {
public:
    int maxDepth(string s) {
        int ans = 0, cur = 0;
        for (char c : s) {
            if (c == '(') { cur++; ans = max(ans, cur); }
            else if (c == ')') cur--;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int maxDepth(String s) {
        int ans = 0, cur = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') { cur++; ans = Math.max(ans, cur); }
            else if (c == ')') cur--;
        }
        return ans;
    }
}`,
      explanation: 'Nesting depth corresponds to the maximum open parentheses level reached. Increment a counter on \'(\' and decrement on \')\'. Track the maximum count. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1619',
    slug: 'mean-of-array-after-removing-some-elements',
    title: 'Mean of Array After Removing Some Elements',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an integer array `arr`, return the mean of the remaining integers after removing the smallest 5% and the largest 5% of the elements.',
    constraints: ['arr.length is a multiple of 20.', '20 <= arr.length <= 1000', '0 <= arr[i] <= 10^5'],
    solutions: {
      python: `class Solution:
    def trimMean(self, arr: List[int]) -> float:
        arr.sort()
        n = len(arr)
        trim = n // 20
        remaining = arr[trim : n - trim]
        return sum(remaining) / len(remaining)`,
      cpp: `class Solution {
public:
    double trimMean(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int n = arr.size();
        int trim = n / 20;
        double sum = 0;
        for (int i = trim; i < n - trim; ++i) sum += arr[i];
        return sum / (n - 2 * trim);
    }
};`,
      java: `class Solution {
    public double trimMean(int[] arr) {
        Arrays.sort(arr);
        int n = arr.length;
        int trim = n / 20;
        double sum = 0;
        for (int i = trim; i < n - trim; i++) sum += arr[i];
        return sum / (n - 2 * trim);
    }
}`,
      explanation: 'Sort the array. Calculate the trim size (5% is n / 20). Sum elements in the range [trim, n - trim - 1] and divide by the count (n - 2 * trim). Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-1624',
    slug: 'largest-substring-between-two-equal-characters',
    title: 'Largest Substring Between Two Equal Characters',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a string `s`, return the length of the longest substring between two equal characters, excluding the two characters. If there is no such substring, return `-1`.',
    constraints: ['1 <= s.length <= 300', 's contains only lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        first = {}
        ans = -1
        for i, c in enumerate(s):
            if c in first:
                ans = max(ans, i - first[c] - 1)
            else:
                first[c] = i
        return ans`,
      cpp: `class Solution {
public:
    int maxLengthBetweenEqualCharacters(string s) {
        vector<int> first(26, -1);
        int ans = -1;
        for (int i = 0; i < s.size(); ++i) {
            int idx = s[i] - 'a';
            if (first[idx] != -1) {
                ans = max(ans, i - first[idx] - 1);
            } else {
                first[idx] = i;
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int maxLengthBetweenEqualCharacters(String s) {
        int[] first = new int[26];
        Arrays.fill(first, -1);
        int ans = -1;
        for (int i = 0; i < s.length(); i++) {
            int idx = s.charAt(i) - 'a';
            if (first[idx] != -1) {
                ans = Math.max(ans, i - first[idx] - 1);
            } else {
                first[idx] = i;
            }
        }
        return ans;
    }
}`,
      explanation: 'Use a hash map or array of size 26 to store the first occurrence index of each character. When a character is seen again, calculate the distance as current_index - first_index - 1, and track the maximum. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1629',
    slug: 'slowest-key',
    title: 'Slowest Key',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'A newly designed keypad was tested. Given releaseTimes and keysPressed, find the key of the keypress that had the longest duration.',
    constraints: ['releaseTimes.length == keysPressed.length == n', '2 <= n <= 1000', '1 <= releaseTimes[i] <= 10^9', 'releaseTimes is sorted in strictly increasing order.', 'keysPressed consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def slowestKey(self, releaseTimes: List[int], keysPressed: str) -> str:
        ans_key = keysPressed[0]
        max_duration = releaseTimes[0]
        for i in range(1, len(releaseTimes)):
            duration = releaseTimes[i] - releaseTimes[i - 1]
            key = keysPressed[i]
            if duration > max_duration or (duration == max_duration and key > ans_key):
                max_duration = duration
                ans_key = key
        return ans_key`,
      cpp: `class Solution {
public:
    char slowestKey(vector<int>& releaseTimes, string keysPressed) {
        char ansKey = keysPressed[0];
        int maxDuration = releaseTimes[0];
        for (int i = 1; i < releaseTimes.size(); ++i) {
            int duration = releaseTimes[i] - releaseTimes[i - 1];
            char key = keysPressed[i];
            if (duration > maxDuration || (duration == maxDuration && key > ansKey)) {
                maxDuration = duration;
                ansKey = key;
            }
        }
        return ansKey;
    }
};`,
      java: `class Solution {
    public char slowestKey(int[] releaseTimes, String keysPressed) {
        char ansKey = keysPressed.charAt(0);
        int maxDuration = releaseTimes[0];
        for (int i = 1; i < releaseTimes.length; i++) {
            int duration = releaseTimes[i] - releaseTimes[i - 1];
            char key = keysPressed.charAt(i);
            if (duration > maxDuration || (duration == maxDuration && key > ansKey)) {
                maxDuration = duration;
                ansKey = key;
            }
        }
        return ansKey;
    }
}`,
      explanation: 'Calculate the duration of each keypress as releaseTimes[i] - releaseTimes[i-1] (with index 0 duration as releaseTimes[0]). Track the maximum duration. In case of ties, select the lexicographically larger character. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1636',
    slug: 'sort-array-by-increasing-frequency',
    title: 'Sort Array by Increasing Frequency',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of integers `nums`, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.',
    constraints: ['1 <= nums.length <= 100', '-100 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def frequencySort(self, nums: List[int]) -> List[int]:
        counts = {}
        for x in nums: counts[x] = counts.get(x, 0) + 1
        return sorted(nums, key=lambda x: (counts[x], -x))`,
      cpp: `class Solution {
public:
    vector<int> frequencySort(vector<int>& nums) {
        unordered_map<int, int> counts;
        for (int x : nums) counts[x]++;
        sort(nums.begin(), nums.end(), [&](int a, int b) {
            if (counts[a] != counts[b]) return counts[a] < counts[b];
            return a > b;
        });
        return nums;
    }
};`,
      java: `class Solution {
    public int[] frequencySort(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums) counts.put(x, counts.getOrDefault(x, 0) + 1);
        Integer[] temp = new Integer[nums.length];
        for (int i = 0; i < nums.length; i++) temp[i] = nums[i];
        Arrays.sort(temp, (a, b) -> {
            int f1 = counts.get(a), f2 = counts.get(b);
            if (f1 != f2) return Integer.compare(f1, f2);
            return Integer.compare(b, a);
        });
        for (int i = 0; i < nums.length; i++) nums[i] = temp[i];
        return nums;
    }
}`,
      explanation: 'Build frequency count mapping. Sort elements using a custom comparator where the primary key is frequency (ascending) and the secondary key is the numeric value (descending). Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1640',
    slug: 'check-array-formation-through-concatenation',
    title: 'Check Array Formation Through Concatenation',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of distinct integers `arr` and a 2D integer array `pieces`, return `true` if it is possible to form `arr` by concatenating the arrays in `pieces` in any order.',
    constraints: ['1 <= pieces.length <= arr.length <= 100', 'sum(pieces[i].length) == arr.length', '1 <= pieces[i].length <= 100', '1 <= arr[i], pieces[i][j] <= 100', 'All integers in arr and pieces are distinct.'],
    solutions: {
      python: `class Solution:
    def canFormArray(self, arr: List[int], pieces: List[List[int]]) -> bool:
        # Map pieces by their first element
        mapping = {p[0]: p for p in pieces}
        i, n = 0, len(arr)
        while i < n:
            val = arr[i]
            if val not in mapping:
                return False
            piece = mapping[val]
            for x in piece:
                if arr[i] != x:
                    return False
                i += 1
        return True`,
      cpp: `class Solution {
public:
    bool canFormArray(vector<int>& arr, vector<vector<int>>& pieces) {
        unordered_map<int, vector<int>> mapping;
        for (const auto& p : pieces) mapping[p[0]] = p;
        int i = 0, n = arr.size();
        while (i < n) {
            int val = arr[i];
            if (!mapping.count(val)) return false;
            const auto& piece = mapping[val];
            for (int x : piece) {
                if (arr[i] != x) return false;
                i++;
            }
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean canFormArray(int[] arr, int[][] pieces) {
        Map<Integer, int[]> mapping = new HashMap<>();
        for (int[] p : pieces) mapping.put(p[0], p);
        int i = 0, n = arr.length;
        while (i < n) {
            int val = arr[i];
            if (!mapping.containsKey(val)) return false;
            int[] piece = mapping.get(val);
            for (int x : piece) {
                if (arr[i] != x) return false;
                i++;
            }
        }
        return true;
    }
}`,
      explanation: 'Since all elements are distinct, index pieces by their starting elements in a hash map. Parse arr from left to right; lookup the piece corresponding to arr[i], verify all elements in that piece match arr sequentially, and increment i. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1646',
    slug: 'get-maximum-in-generated-array',
    title: 'Get Maximum in Generated Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'You are given an integer `n`. An array `nums` of size `n + 1` is generated under rules. Return the maximum integer in the array `nums`.',
    constraints: ['0 <= n <= 100'],
    solutions: {
      python: `class Solution:
    def getMaximumGenerated(self, n: int) -> int:
        if n == 0: return 0
        nums = [0] * (n + 1)
        nums[1] = 1
        for i in range(1, (n // 2) + 1):
            if 2 * i <= n:
                nums[2 * i] = nums[i]
            if 2 * i + 1 <= n:
                nums[2 * i + 1] = nums[i] + nums[i + 1]
        return max(nums)`,
      cpp: `class Solution {
public:
    int getMaximumGenerated(int n) {
        if (n == 0) return 0;
        vector<int> nums(n + 1, 0);
        nums[1] = 1;
        int ans = 1;
        for (int i = 1; 2 * i <= n; ++i) {
            nums[2 * i] = nums[i];
            if (2 * i + 1 <= n) {
                nums[2 * i + 1] = nums[i] + nums[i + 1];
                ans = max(ans, nums[2 * i + 1]);
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int getMaximumGenerated(int n) {
        if (n == 0) return 0;
        int[] nums = new int[n + 1];
        nums[1] = 1;
        int ans = 1;
        for (int i = 1; 2 * i <= n; i++) {
            nums[2 * i] = nums[i];
            if (2 * i + 1 <= n) {
                nums[2 * i + 1] = nums[i] + nums[i + 1];
                ans = Math.max(ans, nums[2 * i + 1]);
            }
        }
        return ans;
    }
}`,
      explanation: 'Simulate the array generation rules: nums[2*i] = nums[i] and nums[2*i + 1] = nums[i] + nums[i + 1]. Maintain a running maximum. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1652',
    slug: 'defuse-the-bomb',
    title: 'Defuse the Bomb',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Sliding Window',
    description: 'You have a bomb to defuse. The code is a circular array `code` of length `n` and a key `k`. Return the decrypted code.',
    constraints: ['n == code.length', '1 <= n <= 100', '1 <= code[i] <= 100', '-n < k < n'],
    solutions: {
      python: `class Solution:
    def decrypt(self, code: List[int], k: int) -> List[int]:
        n = len(code)
        if k == 0: return [0] * n
        res = [0] * n
        
        # Adjust sliding window boundaries based on key sign
        start, end = (1, k) if k > 0 else (n + k, n - 1)
        
        # Calculate initial sum of the window
        curr = 0
        for i in range(start, end + 1):
            curr += code[i % n]
            
        for i in range(n):
            res[i] = curr
            curr -= code[start % n]
            start += 1
            end += 1
            curr += code[end % n]
            
        return res`,
      cpp: `class Solution {
public:
    vector<int> decrypt(vector<int>& code, int k) {
        int n = code.size();
        if (k == 0) return vector<int>(n, 0);
        vector<int> res(n, 0);
        int start = (k > 0) ? 1 : n + k;
        int end = (k > 0) ? k : n - 1;
        int curr = 0;
        for (int i = start; i <= end; ++i) curr += code[i % n];
        for (int i = 0; i < n; ++i) {
            res[i] = curr;
            curr -= code[start % n];
            start++; end++;
            curr += code[end % n];
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] decrypt(int[] code, int k) {
        int n = code.length;
        if (k == 0) return new int[n];
        int[] res = new int[n];
        int start = (k > 0) ? 1 : n + k;
        int end = (k > 0) ? k : n - 1;
        int curr = 0;
        for (int i = start; i <= end; i++) curr += code[i % n];
        for (int i = 0; i < n; i++) {
            res[i] = curr;
            curr -= code[start % n];
            start++; end++;
            curr += code[end % n];
        }
        return res;
    }
}`,
      explanation: 'Use a sliding window of size abs(k). Set the initial boundaries: [1, k] if k > 0, and [n + k, n - 1] if k < 0. Slide the window in a circular manner by updating boundaries modulo n. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1656',
    slug: 'design-an-ordered-stream',
    title: 'Design an Ordered Stream',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Implement the `OrderedStream` class that returns a stream of values in increasing order of their IDs.',
    constraints: ['1 <= n <= 1000', '1 <= idKey <= n', 'At most 1000 calls will be made to insert.'],
    solutions: {
      python: `class OrderedStream:
    def __init__(self, n: int):
        self.stream = [None] * (n + 1)
        self.ptr = 1
        
    def insert(self, idKey: int, value: str) -> List[str]:
        self.stream[idKey] = value
        res = []
        while self.ptr < len(self.stream) and self.stream[self.ptr] is not None:
            res.append(self.stream[self.ptr])
            self.ptr += 1
        return res`,
      cpp: `class OrderedStream {
    vector<string> stream;
    int ptr = 1;
public:
    OrderedStream(int n) { stream.resize(n + 2, ""); }
    vector<string> insert(int idKey, string value) {
        stream[idKey] = value;
        vector<string> res;
        while (!stream[ptr].empty()) {
            res.push_back(stream[ptr++]);
        }
        return res;
    }
};`,
      java: `class OrderedStream {
    private String[] stream;
    private int ptr = 1;
    public OrderedStream(int n) { stream = new String[n + 2]; }
    public List<String> insert(int idKey, String value) {
        stream[idKey] = value;
        List<String> res = new ArrayList<>();
        while (stream[ptr] != null) {
            res.add(stream[ptr++]);
        }
        return res;
    }
}`,
      explanation: 'Store values in a 1-based index array. Maintain a pointer ptr (initially 1). On insert(), write the value to stream[idKey] and advance ptr while stream[ptr] is non-empty, collecting values to return. Time complexity: O(1) amortized, Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1662',
    slug: 'check-if-two-string-arrays-are-equivalent',
    title: 'Check If Two String Arrays are Equivalent',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two string arrays `word1` and `word2`, return `true` if the two arrays represent the same string, and `false` otherwise.',
    constraints: ['1 <= word1.length, word2.length <= 1000', '1 <= word1[i].length, word2[i].length <= 1000', '1 <= sum(word1[i].length), sum(word2[i].length) <= 10^6', 'word1[i] and word2[i] consist of lowercase letters.'],
    solutions: {
      python: `class Solution:
    def arrayStringsAreEqual(self, word1: List[str], word2: List[str]) -> bool:
        return "".join(word1) == "".join(word2)`,
      cpp: `class Solution {
public:
    bool arrayStringsAreEqual(vector<string>& word1, vector<string>& word2) {
        string s1 = "", s2 = "";
        for (const string& w : word1) s1 += w;
        for (const string& w : word2) s2 += w;
        return s1 == s2;
    }
};`,
      java: `class Solution {
    public boolean arrayStringsAreEqual(String[] word1, String[] word2) {
        StringBuilder s1 = new StringBuilder();
        StringBuilder s2 = new StringBuilder();
        for (String w : word1) s1.append(w);
        for (String w : word2) s2.append(w);
        return s1.toString().equals(s2.toString());
    }
}`,
      explanation: 'Concatenate all string fragments of word1 and word2, and check if the resulting merged strings are equal. Time complexity: O(N) where N is sum of character lengths, Space complexity: O(N).'
    }
  },
  {
    id: 'lc-1668',
    slug: 'maximum-repeating-substring',
    title: 'Maximum Repeating Substring',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two strings `sequence` and `word`, return the maximum repeating value `k` of `word` in `sequence`. The maximum repeating value is the maximum integer `k` such that `word` repeated `k` times is a substring of `sequence`.',
    constraints: ['1 <= sequence.length <= 100', '1 <= word.length <= 100', 'sequence and word consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def maxRepeating(self, sequence: str, word: str) -> int:
        k = 0
        while word * (k + 1) in sequence:
            k += 1
        return k`,
      cpp: `class Solution {
public:
    int maxRepeating(string sequence, string word) {
        int k = 0;
        string temp = word;
        while (sequence.find(temp) != string::npos) {
            k++;
            temp += word;
        }
        return k;
    }
};`,
      java: `class Solution {
    public int maxRepeating(String sequence, String word) {
        int k = 0;
        String temp = word;
        while (sequence.contains(temp)) {
            k++;
            temp += word;
        }
        return k;
    }
}`,
      explanation: 'Start with k = 0. In each step, check if the string word repeated k + 1 times exists as a substring in sequence. If so, increment k. Time complexity: O(n^2), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1672',
    slug: 'richest-customer-wealth',
    title: 'Richest Customer Wealth',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given an `m x n` integer grid `accounts` where `accounts[i][j]` is the amount of money the `i`-th customer has in the `j`-th bank. Return the wealth that the richest customer has.',
    constraints: ['m == accounts.length', 'n == accounts[i].length', '1 <= m, n <= 50', '1 <= accounts[i][j] <= 100'],
    solutions: {
      python: `class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        return max(sum(row) for row in accounts)`,
      cpp: `class Solution {
public:
    int maximumWealth(vector<vector<int>>& accounts) {
        int ans = 0;
        for (const auto& row : accounts) {
            int sum = 0;
            for (int x : row) sum += x;
            ans = max(ans, sum);
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int maximumWealth(int[][] accounts) {
        int ans = 0;
        for (int[] row : accounts) {
            int sum = 0;
            for (int x : row) sum += x;
            ans = Math.max(ans, sum);
        }
        return ans;
    }
}`,
      explanation: 'Sum elements of each row to calculate individual wealth values, and return the maximum wealth. Time complexity: O(m * n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1678',
    slug: 'goal-parser-interpretation',
    title: 'Goal Parser Interpretation',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a string `command`, return the Goal Parser\'s interpretation of `command`. The Goal Parser interprets `"G"` as `"G"`, `"()"` as `"o"`, and `"(al)"` as `"al"`.',
    constraints: ['1 <= command.length <= 100', 'command consists of "G", "()", and/or "(al)" in some order.'],
    solutions: {
      python: `class Solution:
    def interpret(self, command: str) -> str:
        return command.replace("()", "o").replace("(al)", "al")`,
      cpp: `class Solution {
public:
    string interpret(string command) {
        string res = "";
        int i = 0, n = command.size();
        while (i < n) {
            if (command[i] == 'G') { res += "G"; i++; }
            else if (command[i] == '(' && command[i+1] == ')') { res += "o"; i += 2; }
            else { res += "al"; i += 4; }
        }
        return res;
    }
};`,
      java: `class Solution {
    public String interpret(String command) {
        return command.replace("()", "o").replace("(al)", "al");
    }
}`,
      explanation: 'Parse s from left to right. Match patterns: "G" maps to "G", "()" maps to "o", and "(al)" maps to "al". Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1684',
    slug: 'count-the-number-of-consistent-strings',
    title: 'Count the Number of Consistent Strings',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given a string `allowed` consisting of distinct characters and an array of strings `words`. A string is consistent if all characters in the string appear in the string `allowed`. Return the number of consistent strings.',
    constraints: ['1 <= words.length <= 10^4', '1 <= allowed.length <= 26', '1 <= words[i].length <= 10', 'The characters in allowed are distinct.', 'words[i] and allowed contain only lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        a_set = set(allowed)
        return sum(all(c in a_set for c in w) for w in words)`,
      cpp: `class Solution {
public:
    int countConsistentStrings(string allowed, vector<string>& words) {
        vector<bool> aSet(26, false);
        for (char c : allowed) aSet[c - 'a'] = true;
        int ans = 0;
        for (const string& w : words) {
            bool ok = true;
            for (char c : w) {
                if (!aSet[c - 'a']) { ok = false; break; }
            }
            if (ok) ans++;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int countConsistentStrings(String allowed, String[] words) {
        boolean[] aSet = new boolean[26];
        for (char c : allowed.toCharArray()) aSet[c - 'a'] = true;
        int ans = 0;
        for (String w : words) {
            boolean ok = true;
            for (char c : w.toCharArray()) {
                if (!aSet[c - 'a']) { ok = false; break; }
            }
            if (ok) ans++;
        }
        return ans;
    }
}`,
      explanation: 'Use a boolean lookup array of size 26 forallowed characters. For each word, verify if all its characters exist in the allowed set. Time complexity: O(N * L) where N is words count and L is average length, Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-1688',
    slug: 'count-of-matches-in-tournament',
    title: 'Count of Matches in Tournament',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are given an integer `n`, the number of teams in a tournament that has strange rules. Return the number of matches played in the tournament until a unique winner is decided.',
    constraints: ['1 <= n <= 200'],
    solutions: {
      python: `class Solution:
    def numberOfMatches(self, n: int) -> int:
        # Each match eliminates exactly one team. To decide 1 winner, n - 1 teams must be eliminated.
        return n - 1`,
      cpp: `class Solution {
public:
    int numberOfMatches(int n) {
        return n - 1;
    }
};`,
      java: `class Solution {
    public int numberOfMatches(int n) {
        return n - 1;
    }
}`,
      explanation: 'In a single-elimination tournament, every match played eliminates exactly one team. To find 1 winner out of n teams, n - 1 teams must be eliminated. Hence, exactly n - 1 matches must be played. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1694',
    slug: 'reformat-phone-number',
    title: 'Reformat Phone Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given a phone number as a string `number`. Return the phone number formatted under special rules.',
    constraints: ['number consists of digits, spaces, and/or dashes.', '2 <= number.length <= 100'],
    solutions: {
      python: `class Solution:
    def reformatNumber(self, number: str) -> str:
        clean = number.replace(" ", "").replace("-", "")
        res = []
        i, n = 0, len(clean)
        while n - i > 4:
            res.append(clean[i : i + 3])
            i += 3
        if n - i == 4:
            res.append(clean[i : i + 2])
            res.append(clean[i + 2 : i + 4])
        else:
            res.append(clean[i:])
        return "-".join(res)`,
      cpp: `class Solution {
public:
    string reformatNumber(string number) {
        string clean = "";
        for (char c : number) if (isdigit(c)) clean += c;
        string res = "";
        int i = 0, n = clean.size();
        while (n - i > 4) {
            if (!res.empty()) res += "-";
            res += clean.substr(i, 3);
            i += 3;
        }
        if (n - i == 4) {
            if (!res.empty()) res += "-";
            res += clean.substr(i, 2) + "-" + clean.substr(i + 2, 2);
        } else {
            if (!res.empty()) res += "-";
            res += clean.substr(i);
        }
        return res;
    }
};`,
      java: `class Solution {
    public String reformatNumber(String number) {
        StringBuilder clean = new StringBuilder();
        for (char c : number.toCharArray()) {
            if (Character.isDigit(c)) clean.append(c);
        }
        StringBuilder res = new StringBuilder();
        int i = 0, n = clean.length();
        while (n - i > 4) {
            if (res.length() > 0) res.append("-");
            res.append(clean.substring(i, i + 3));
            i += 3;
        }
        if (n - i == 4) {
            if (res.length() > 0) res.append("-");
            res.append(clean.substring(i, i + 2)).append("-").append(clean.substring(i + 2, i + 4));
        } else {
            if (res.length() > 0) res.append("-");
            res.append(clean.substring(i));
        }
        return res.toString();
    }
}`,
      explanation: 'Remove all spaces and dashes first. Group characters in blocks of 3 from left to right. If 4 characters remain, divide them into two blocks of 2. If 3 or 2 characters remain, write them as a single block. Join blocks with dashes. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1700',
    slug: 'number-of-students-unable-to-eat-lunch',
    title: 'Number of Students Unable to Eat Lunch',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Queue',
    description: 'The school cafeteria offers circular and square sandwiches. Return the number of students that are unable to eat.',
    constraints: ['1 <= students.length, sandwiches.length <= 100', 'students.length == sandwiches.length', 'students[i], sandwiches[i] is 0 or 1.'],
    solutions: {
      python: `class Solution:
    def countStudents(self, students: List[int], sandwiches: List[int]) -> int:
        counts = [students.count(0), students.count(1)]
        for s in sandwiches:
            if counts[s] > 0:
                counts[s] -= 1
            else:
                break
        return sum(counts)`,
      cpp: `class Solution {
public:
    int countStudents(vector<int>& students, vector<int>& sandwiches) {
        int counts[2] = {0, 0};
        for (int x : students) counts[x]++;
        for (int s : sandwiches) {
            if (counts[s] > 0) counts[s]--;
            else break;
        }
        return counts[0] + counts[1];
    }
};`,
      java: `class Solution {
    public int countStudents(int[] students, int[] sandwiches) {
        int[] counts = new int[2];
        for (int x : students) counts[x]++;
        for (int s : sandwiches) {
            if (counts[s] > 0) counts[s]--;
            else break;
        }
        return counts[0] + counts[1];
    }
}`,
      explanation: 'The order of students in queue doesn\'t block any student since they can cycle to the back. A bottleneck occurs only when the sandwich at the top of the stack does not match the preference of any remaining student. Count students preferring circular (0) and square (1) sandwiches, and match them with the sandwich stack. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-1704',
    slug: 'determine-if-string-halves-are-alike',
    title: 'Determine if String Halves Are Alike',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given a string `s` of even length. Split this string into two halves. Return `true` if they are alike (both have same number of vowels).',
    constraints: ['2 <= s.length <= 1000', 's.length is even.', 's consists of uppercase and lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def halvesAreAlike(self, s: str) -> bool:
        vowels = set("aeiouAEIOU")
        n = len(s)
        h1 = sum(c in vowels for c in s[:n // 2])
        h2 = sum(c in vowels for c in s[n // 2:])
        return h1 == h2`,
      cpp: `class Solution {
public:
    bool halvesAreAlike(string s) {
        unordered_set<char> vowels = {'a','e','i','o','u','A','E','I','O','U'};
        int n = s.size(), h1 = 0, h2 = 0;
        for (int i = 0; i < n / 2; ++i) if (vowels.count(s[i])) h1++;
        for (int i = n / 2; i < n; ++i) if (vowels.count(s[i])) h2++;
        return h1 == h2;
    }
};`,
      java: `class Solution {
    public boolean halvesAreAlike(String s) {
        Set<Character> vowels = new HashSet<>(Arrays.asList('a','e','i','o','u','A','E','I','O','U'));
        int n = s.length(), h1 = 0, h2 = 0;
        for (int i = 0; i < n / 2; i++) if (vowels.contains(s.charAt(i))) h1++;
        for (int i = n / 2; i < n; i++) if (vowels.contains(s.charAt(i))) h2++;
        return h1 == h2;
    }
}`,
      explanation: 'Divide the string into two halves. Count the number of vowel characters (\'a\', \'e\', \'i\', \'o\', \'u\', case-insensitive) in both halves and check if the counts are equal. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1710',
    slug: 'maximum-units-on-a-truck',
    title: 'Maximum Units on a Truck',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'You are assigned to put some amount of boxes onto one truck. Find the maximum total number of units that can be put on the truck.',
    constraints: ['1 <= boxTypes.length <= 1000', '1 <= numberOfBoxes_i, numberOfUnitsPerBox_i <= 1000', '1 <= truckSize <= 10^6'],
    solutions: {
      python: `class Solution:
    def maximumUnits(self, boxTypes: List[List[int]], truckSize: int) -> int:
        boxTypes.sort(key=lambda x: x[1], reverse=True)
        ans = 0
        for boxes, units in boxTypes:
            take = min(boxes, truckSize)
            ans += take * units
            truckSize -= take
            if truckSize == 0: break
        return ans`,
      cpp: `class Solution {
public:
    int maximumUnits(vector<vector<int>>& boxTypes, int truckSize) {
        sort(boxTypes.begin(), boxTypes.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] > b[1];
        });
        int ans = 0;
        for (const auto& box : boxTypes) {
            int take = min(box[0], truckSize);
            ans += take * box[1];
            truckSize -= take;
            if (truckSize == 0) break;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int maximumUnits(int[][] boxTypes, int truckSize) {
        Arrays.sort(boxTypes, (a, b) -> Integer.compare(b[1], a[1]));
        int ans = 0;
        for (int[] box : boxTypes) {
            int take = Math.min(box[0], truckSize);
            ans += take * box[1];
            truckSize -= take;
            if (truckSize == 0) break;
        }
        return ans;
    }
}`,
      explanation: 'Greedy approach: sort the boxes in descending order of their units per box. Fill the truck starting with the boxes containing the most units, taking either the whole stack or the remaining capacity. Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-1716',
    slug: 'calculate-money-in-leetcode-bank',
    title: 'Calculate Money in Leetcode Bank',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Hercy wants to save money. He puts money in the bank every day. Return the total amount of money Hercy has in the Leetcode bank at the end of the `n`-th day.',
    constraints: ['1 <= n <= 1000'],
    solutions: {
      python: `class Solution:
    def totalMoney(self, n: int) -> int:
        weeks = n // 7
        rem = n % 7
        # Sum of complete weeks:
        # Week i sum is 28 + 7*(i-1)
        ans = weeks * 28 + 7 * weeks * (weeks - 1) // 2
        # Sum of remaining days
        for i in range(rem):
            ans += weeks + i + 1
        return ans`,
      cpp: `class Solution {
public:
    int totalMoney(int n) {
        int weeks = n / 7;
        int rem = n % 7;
        int ans = weeks * 28 + 7 * weeks * (weeks - 1) / 2;
        for (int i = 0; i < rem; ++i) {
            ans += weeks + i + 1;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int totalMoney(int n) {
        int weeks = n / 7;
        int rem = n % 7;
        int ans = weeks * 28 + 7 * (weeks - 1) * weeks / 2;
        for (int i = 0; i < rem; i++) {
            ans += weeks + i + 1;
        }
        return ans;
    }
}`,
      explanation: 'Use math formulas. Each week has 7 days. The first week sums to 28. Each subsequent week adds 7 to the total. Calculate the sum of complete weeks using arithmetic progression, and add the remaining days. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1720',
    slug: 'decode-xored-array',
    title: 'Decode XORed Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'There is a hidden integer array `arr` of size `n` and an encoded array `encoded` of size `n - 1`. Given `encoded` and `first` = arr[0], decode it.',
    constraints: ['2 <= n <= 10^4', 'encoded.length == n - 1', '0 <= encoded[i] <= 10^5', '0 <= first <= 10^5'],
    solutions: {
      python: `class Solution:
    def decode(self, encoded: List[int], first: int) -> List[int]:
        res = [first]
        for x in encoded:
            res.append(res[-1] ^ x)
        return res`,
      cpp: `class Solution {
public:
    vector<int> decode(vector<int>& encoded, int first) {
        vector<int> res = {first};
        for (int x : encoded) {
            res.push_back(res.back() ^ x);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] decode(int[] encoded, int first) {
        int[] res = new int[encoded.length + 1];
        res[0] = first;
        for (int i = 0; i < encoded.length; i++) {
            res[i + 1] = res[i] ^ encoded[i];
        }
        return res;
    }
}`,
      explanation: 'Since encoded[i] = arr[i] ^ arr[i+1], we can solve for arr[i+1] as arr[i] ^ encoded[i]. Decode sequentially starting from arr[0]. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1725',
    slug: 'of-rectangles-that-can-form-the-largest-square',
    title: 'Of Rectangles That Can Form The Largest Square',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given an array `rectangles` where `rectangles[i] = [l_i, w_i]`. Find the number of rectangles that can form a square with side length maxLen.',
    constraints: ['1 <= rectangles.length <= 1000', 'rectangles[i].length == 2', '1 <= l_i, w_i <= 10^9'],
    solutions: {
      python: `class Solution:
    def countGoodRectangles(self, rectangles: List[List[int]]) -> int:
        sides = [min(l, w) for l, w in rectangles]
        max_len = max(sides)
        return sides.count(max_len)`,
      cpp: `class Solution {
public:
    int countGoodRectangles(vector<vector<int>>& rectangles) {
        int maxLen = 0, count = 0;
        for (const auto& rect : rectangles) {
            int side = min(rect[0], rect[1]);
            if (side > maxLen) {
                maxLen = side;
                count = 1;
            } else if (side == maxLen) {
                count++;
            }
        }
        return count;
    }
};`,
      java: `class Solution {
    public int countGoodRectangles(int[][] rectangles) {
        int maxLen = 0, count = 0;
        for (int[] rect : rectangles) {
            int side = Math.min(rect[0], rect[1]);
            if (side > maxLen) {
                maxLen = side;
                count = 1;
            } else if (side == maxLen) {
                count++;
            }
        }
        return count;
    }
}`,
      explanation: 'For each rectangle, the largest square that can be formed has side length equal to min(length, width). Find the maximum side length across all rectangles, and count how many rectangles can achieve this maximum size. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-1732',
    slug: 'find-the-highest-altitude',
    title: 'Find the Highest Altitude',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'There is a biker going on a road trip. Return the highest altitude of a point.',
    constraints: ['1 <= gain.length <= 100', '-100 <= gain[i] <= 100'],
    solutions: {
      python: `class Solution:
    def largestAltitude(self, gain: List[int]) -> int:
        curr = best = 0
        for x in gain:
            curr += x
            best = max(best, curr)
        return best`,
      cpp: `class Solution {
public:
    int largestAltitude(vector<int>& gain) {
        int curr = 0, best = 0;
        for (int x : gain) {
            curr += x;
            best = max(best, curr);
        }
        return best;
    }
};`,
      java: `class Solution {
    public int largestAltitude(int[] gain) {
        int curr = 0, best = 0;
        for (int x : gain) {
            curr += x;
            best = Math.max(best, curr);
        }
        return best;
    }
}`,
      explanation: 'Calculate prefix sums in a running variable representing the altitude. Start at 0, update altitude on each step, and track the maximum altitude reached. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1736',
    slug: 'latest-time-by-replacing-hidden-digits',
    title: 'Latest Time by Replacing Hidden Digits',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given a string `time` in the form of `hh:mm`, where some of the digits are hidden (represented by `\'?\'`). Return the latest valid time.',
    constraints: ['time is in the format hh:mm.', 'The hidden digits are represented by \'?\'.', 'All input times are valid.'],
    solutions: {
      python: `class Solution:
    def maximumTime(self, time: str) -> str:
        t = list(time)
        if t[0] == '?':
            t[0] = '2' if t[1] in ('?', '0', '1', '2', '3') else '1'
        if t[1] == '?':
            t[1] = '3' if t[0] == '2' else '9'
        if t[3] == '?':
            t[3] = '5'
        if t[4] == '?':
            t[4] = '9'
        return "".join(t)`,
      cpp: `class Solution {
public:
    string maximumTime(string time) {
        if (time[0] == '?') {
            time[0] = (time[1] == '?' || time[1] <= '3') ? '2' : '1';
        }
        if (time[1] == '?') {
            time[1] = (time[0] == '2') ? '3' : '9';
        }
        if (time[3] == '?') time[3] = '5';
        if (time[4] == '?') time[4] = '9';
        return time;
    }
};`,
      java: `class Solution {
    public String maximumTime(String time) {
        char[] t = time.toCharArray();
        if (t[0] == '?') {
            t[0] = (t[1] == '?' || t[1] <= '3') ? '2' : '1';
        }
        if (t[1] == '?') {
            t[1] = (t[0] == '2') ? '3' : '9';
        }
        if (t[3] == '?') t[3] = '5';
        if (t[4] == '?') t[4] = '9';
        return new String(t);
    }
}`,
      explanation: 'Evaluate hour and minute limits step-by-step. For the tens digit of hours (t[0]), set to 2 if the ones digit t[1] is <= 3 or "?", else set to 1. Set t[1] to 3 if t[0] is 2, else 9. Set the tens digit of minutes to 5 and the ones digit to 9. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1742',
    slug: 'maximum-number-of-balls-in-a-box',
    title: 'Maximum Number of Balls in a Box',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are working in a ball factory where you have `n` balls numbered from `lowLimit` to `highLimit` inclusive. Each ball is placed in a box numbered equal to the sum of its digits. Return the number of balls in the box with the most balls.',
    constraints: ['1 <= lowLimit <= highLimit <= 10^5'],
    solutions: {
      python: `class Solution:
    def countBalls(self, lowLimit: int, highLimit: int) -> int:
        boxes = {}
        for num in range(lowLimit, highLimit + 1):
            s = 0
            while num > 0:
                s += num % 10
                num //= 10
            boxes[s] = boxes.get(s, 0) + 1
        return max(boxes.values())`,
      cpp: `class Solution {
public:
    int countBalls(int lowLimit, int highLimit) {
        unordered_map<int, int> boxes;
        int ans = 0;
        for (int i = lowLimit; i <= highLimit; ++i) {
            int num = i, s = 0;
            while (num > 0) { s += num % 10; num /= 10; }
            boxes[s]++;
            ans = max(ans, boxes[s]);
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int countBalls(int lowLimit, int highLimit) {
        Map<Integer, Integer> boxes = new HashMap<>();
        int ans = 0;
        for (int i = lowLimit; i <= highLimit; i++) {
            int num = i, s = 0;
            while (num > 0) { s += num % 10; num /= 10; }
            boxes.put(s, boxes.getOrDefault(s, 0) + 1);
            ans = Math.max(ans, boxes.get(s));
        }
        return ans;
    }
}`,
      explanation: 'For each number in the range, calculate the sum of its digits using modular division. Increment the count of balls in the box corresponding to this sum. Track the maximum count. Time complexity: O(N log_10 R) where N is range size, Space complexity: O(log_10 R).'
    }
  },
  {
    id: 'lc-1748',
    slug: 'sum-of-unique-elements',
    title: 'Sum of Unique Elements',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given an integer array `nums`. The unique elements of an array are the elements that appear **exactly once** in the array. Return the sum of all the unique elements of `nums`.',
    constraints: ['1 <= nums.length <= 100', '1 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def sumOfUnique(self, nums: List[int]) -> int:
        counts = {}
        for x in nums: counts[x] = counts.get(x, 0) + 1
        return sum(x for x in counts if counts[x] == 1)`,
      cpp: `class Solution {
public:
    int sumOfUnique(vector<int>& nums) {
        unordered_map<int, int> counts;
        for (int x : nums) counts[x]++;
        int sum = 0;
        for (const auto& [x, cnt] : counts) {
            if (cnt == 1) sum += x;
        }
        return sum;
    }
};`,
      java: `class Solution {
    public int sumOfUnique(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums) counts.put(x, counts.getOrDefault(x, 0) + 1);
        int sum = 0;
        for (int x : counts.keySet()) {
            if (counts.get(x) == 1) sum += x;
        }
        return sum;
    }
}`,
      explanation: 'Build a frequency table for the elements in the array. Iterate through the table keys, and sum the elements that have a frequency count of exactly 1. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1752',
    slug: 'check-if-array-is-sorted-and-rotated',
    title: 'Check if Array Is Sorted and Rotated',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array `nums`, return `true` if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero). Otherwise, return `false`.',
    constraints: ['1 <= nums.length <= 100', '1 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def check(self, nums: List[int]) -> bool:
        # A sorted and rotated array can have at most one index where nums[i] > nums[i+1] (wrapping around)
        count = 0
        n = len(nums)
        for i in range(n):
            if nums[i] > nums[(i + 1) % n]:
                count += 1
        return count <= 1`,
      cpp: `class Solution {
public:
    bool check(vector<int>& nums) {
        int count = 0, n = nums.size();
        for (int i = 0; i < n; ++i) {
            if (nums[i] > nums[(i + 1) % n]) count++;
        }
        return count <= 1;
    }
};`,
      java: `class Solution {
    public boolean check(int[] nums) {
        int count = 0, n = nums.length;
        for (int i = 0; i < n; i++) {
            if (nums[i] > nums[(i + 1) % n]) count++;
        }
        return count <= 1;
    }
}`,
      explanation: 'A sorted array rotated any number of times will have at most one drop in values, including wrapping around from the last element to the first element. Count how many times nums[i] > nums[i+1]. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1758',
    slug: 'minimum-changes-to-make-alternating-binary-string',
    title: 'Minimum Changes To Make Alternating Binary String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'You are given a string `s` consisting only of the characters `\'0\'` and `\'1\'`. In one operation, you can change any `\'0\'` to `\'1\'` or vice versa. Return the minimum number of operations.',
    constraints: ['1 <= s.length <= 10^4', 's[i] is either \'0\' or \'1\'.'],
    solutions: {
      python: `class Solution:
    def minOperations(self, s: str) -> int:
        # Check operations to match pattern "010101..."
        op0 = 0
        for i, c in enumerate(s):
            if i % 2 == 0:
                if c != '0': op0 += 1
            else:
                if c != '1': op0 += 1
        # The other pattern is "101010..." which will require n - op0 operations
        return min(op0, len(s) - op0)`,
      cpp: `class Solution {
public:
    int minOperations(string s) {
        int op0 = 0, n = s.size();
        for (int i = 0; i < n; ++i) {
            if (i % 2 == 0) {
                if (s[i] != '0') op0++;
            } else {
                if (s[i] != '1') op0++;
            }
        }
        return min(op0, n - op0);
    }
};`,
      java: `class Solution {
    public int minOperations(String s) {
        int op0 = 0, n = s.length();
        for (int i = 0; i < n; i++) {
            if (i % 2 == 0) {
                if (s.charAt(i) != '0') op0++;
            } else {
                if (s.charAt(i) != '1') op0++;
            }
        }
        return Math.min(op0, n - op0);
    }
}`,
      explanation: 'Compare s with the target pattern starting with \'0\' (i.e. "010101..."). The operations required to match this pattern is op0. The operations required to match the inverse pattern ("101010...") is simply length - op0. Return the minimum. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1763',
    slug: 'longest-nice-substring',
    title: 'Longest Nice Substring',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'A string `s` is nice if, for every letter of the alphabet that `s` contains, it appears in both uppercase and lowercase. Return the longest nice substring of `s`.',
    constraints: ['1 <= s.length <= 100', 's consists of uppercase and lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def longestNiceSubstring(self, s: str) -> str:
        if len(s) < 2: return ""
        chars = set(s)
        for i, c in enumerate(s):
            if c.swapcase() not in chars:
                # Split at index i and recursively solve
                sub1 = self.longestNiceSubstring(s[:i])
                sub2 = self.longestNiceSubstring(s[i + 1:])
                return sub2 if len(sub2) > len(sub1) else sub1
        return s`,
      cpp: `class Solution {
public:
    string longestNiceSubstring(string s) {
        if (s.size() < 2) return "";
        unordered_set<char> chars(s.begin(), s.end());
        for (int i = 0; i < s.size(); ++i) {
            char c = s[i];
            char target = islower(c) ? toupper(c) : tolower(c);
            if (!chars.count(target)) {
                string sub1 = longestNiceSubstring(s.substr(0, i));
                string sub2 = longestNiceSubstring(s.substr(i + 1));
                return sub2.size() > sub1.size() ? sub2 : sub1;
            }
        }
        return s;
    }
};`,
      java: `class Solution {
    public String longestNiceSubstring(String s) {
        if (s.length() < 2) return "";
        Set<Character> chars = new HashSet<>();
        for (char c : s.toCharArray()) chars.add(c);
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            char target = Character.isLowerCase(c) ? Character.toUpperCase(c) : Character.toLowerCase(c);
            if (!chars.contains(target)) {
                String sub1 = longestNiceSubstring(s.substring(0, i));
                String sub2 = longestNiceSubstring(s.substring(i + 1));
                return sub2.length() > sub1.length() ? sub2 : sub1;
            }
        }
        return s;
    }
}`,
      explanation: 'Use Divide and Conquer. Find the first character in s whose counterpart (uppercase or lowercase) is not present in s. If none, the string itself is nice. If found, split the string at this character index and recursively search both halves, returning the longer result. Time complexity: O(n^2), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1768',
    slug: 'merge-strings-alternately',
    title: 'Merge Strings Alternately',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'You are given two strings `word1` and `word2`. Merge the strings by adding letters in alternating order, starting with `word1`. If a string is longer, append the additional letters onto the end of the merged string.',
    constraints: ['1 <= word1.length, word2.length <= 100', 'word1 and word2 consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        res = []
        i, n1 = 0, len(word1)
        j, n2 = 0, len(word2)
        while i < n1 or j < n2:
            if i < n1:
                res.append(word1[i])
                i += 1
            if j < n2:
                res.append(word2[j])
                j += 1
        return "".join(res)`,
      cpp: `class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        string res = "";
        int i = 0, j = 0, n1 = word1.size(), n2 = word2.size();
        while (i < n1 || j < n2) {
            if (i < n1) res += word1[i++];
            if (j < n2) res += word2[j++];
        }
        return res;
    }
};`,
      java: `class Solution {
    public String mergeAlternately(String word1, String word2) {
        StringBuilder sb = new StringBuilder();
        int i = 0, j = 0, n1 = word1.length(), n2 = word2.length();
        while (i < n1 || j < n2) {
            if (i < n1) sb.append(word1.charAt(i++));
            if (j < n2) sb.append(word2.charAt(j++));
        }
        return sb.toString();
    }
}`,
      explanation: 'Use two pointers. Loop until both pointers reach the end of their respective strings. Alternately append characters from word1 and word2. Time complexity: O(n1 + n2), Space complexity: O(n1 + n2).'
    }
  },
  {
    id: 'lc-1773',
    slug: 'count-items-matching-a-rule',
    title: 'Count Items Matching a Rule',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given an array `items`, where each `items[i] = [type_i, color_i, name_i]` describes an item. Return the number of items matching the rule key and rule value.',
    constraints: ['1 <= items.length <= 10^4', 'items[i].length == 3', '1 <= type_i.length, color_i.length, name_i.length, ruleValue.length <= 20', 'ruleKey is equal to "type", "color", or "name".'],
    solutions: {
      python: `class Solution:
    def countMatches(self, items: List[List[str]], ruleKey: str, ruleValue: str) -> int:
        idx = {"type": 0, "color": 1, "name": 2}[ruleKey]
        return sum(item[idx] == ruleValue for item in items)`,
      cpp: `class Solution {
public:
    int countMatches(vector<vector<string>>& items, string ruleKey, string ruleValue) {
        int idx = (ruleKey == "type") ? 0 : (ruleKey == "color") ? 1 : 2;
        int ans = 0;
        for (const auto& item : items) {
            if (item[idx] == ruleValue) ans++;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int countMatches(List<List<String>> items, String ruleKey, String ruleValue) {
        int idx = ruleKey.equals("type") ? 0 : ruleKey.equals("color") ? 1 : 2;
        int ans = 0;
        for (List<String> item : items) {
            if (item.get(idx).equals(ruleValue)) ans++;
        }
        return ans;
    }
}`,
      explanation: 'Map ruleKey ("type", "color", or "name") to its corresponding index (0, 1, or 2). Traverse the items array and increment the count if the element at that index matches ruleValue. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1779',
    slug: 'find-nearest-point-that-has-the-same-x-or-y-coordinate',
    title: 'Find Nearest Point That Has the Same X or Y Coordinate',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are given two integers, `x` and `y`, which represent your current location on a 2D grid. Return the index of the valid point with the smallest Manhattan distance from your current location.',
    constraints: ['1 <= points.length <= 10^4', 'points[i].length == 2', '1 <= x, y, x_i, y_i <= 10^4'],
    solutions: {
      python: `class Solution:
    def findNearestPoint(self, x: int, y: int, points: List[List[int]]) -> int:
        ans = -1
        min_dist = float('inf')
        for i, (px, py) in enumerate(points):
            if px == x or py == y:
                dist = abs(px - x) + abs(py - y)
                if dist < min_dist:
                    min_dist = dist
                    ans = i
        return ans`,
      cpp: `class Solution {
public:
    int findNearestPoint(int x, int y, vector<vector<int>>& points) {
        int ans = -1, minDist = INT_MAX;
        for (int i = 0; i < points.size(); ++i) {
            int px = points[i][0], py = points[i][1];
            if (px == x || py == y) {
                int dist = abs(px - x) + abs(py - y);
                if (dist < minDist) { minDist = dist; ans = i; }
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int findNearestPoint(int x, int y, int[][] points) {
        int ans = -1, minDist = Integer.MAX_VALUE;
        for (int i = 0; i < points.length; i++) {
            int px = points[i][0], py = points[i][1];
            if (px == x || py == y) {
                int dist = Math.abs(px - x) + Math.abs(py - y);
                if (dist < minDist) { minDist = dist; ans = i; }
            }
        }
        return ans;
    }
}`,
      explanation: 'Iterate through the points. A point is valid if it shares the same x or y coordinate. For valid points, calculate the Manhattan distance. Track the index of the point with the minimum distance (and smallest index on ties). Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1784',
    slug: 'check-if-binary-string-has-at-most-one-segment-of-ones',
    title: 'Check if Binary String Has at Most One Segment of Ones',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a binary string `s` **without leading zeros**, return `true` if `s` contains at most one contiguous segment of ones.',
    constraints: ['1 <= s.length <= 100', 's[i] is either \'0\' or \'1\'.', 's[0] is \'1\'.'],
    solutions: {
      python: `class Solution:
    def checkOnesSegment(self, s: str) -> bool:
        # If there is at most one segment of 1s, "01" cannot be present in the string
        return "01" not in s`,
      cpp: `class Solution {
public:
    bool checkOnesSegment(string s) {
        return s.find("01") == string::npos;
    }
};`,
      java: `class Solution {
    public boolean checkOnesSegment(String s) {
        return !s.contains("01");
    }
}`,
      explanation: 'Since the string starts with \'1\' and has no leading zeros, if there is a second segment of \'1\'s, there must be at least one \'0\' separating them. This means the substring "01" must appear. Checking for its absence validates the condition. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1790',
    slug: 'check-if-one-string-swap-can-make-strings-equal',
    title: 'Check if One String Swap Can Make Strings Equal',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two strings `s1` and `s2` of equal length. Return `true` if it is possible to make both strings equal by performing at most one string swap on **one** of the strings.',
    constraints: ['1 <= s1.length, s2.length <= 100', 's1.length == s2.length', 's1 and s2 consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def areAlmostEqual(self, s1: str, s2: str) -> bool:
        diff = []
        for i in range(len(s1)):
            if s1[i] != s2[i]:
                diff.append((s1[i], s2[i]))
        if not diff: return True
        return len(diff) == 2 and diff[0] == diff[1][::-1]`,
      cpp: `class Solution {
public:
    bool areAlmostEqual(string s1, string s2) {
        vector<int> diff;
        for (int i = 0; i < s1.size(); ++i) {
            if (s1[i] != s2[i]) diff.push_back(i);
        }
        if (diff.empty()) return true;
        return diff.size() == 2 && s1[diff[0]] == s2[diff[1]] && s1[diff[1]] == s2[diff[0]];
    }
};`,
      java: `class Solution {
    public boolean areAlmostEqual(String s1, String s2) {
        List<Integer> diff = new ArrayList<>();
        for (int i = 0; i < s1.length(); i++) {
            if (s1.charAt(i) != s2.charAt(i)) diff.add(i);
        }
        if (diff.isEmpty()) return true;
        return diff.size() == 2 &&
               s1.charAt(diff.get(0)) == s2.charAt(diff.get(1)) &&
               s1.charAt(diff.get(1)) == s2.charAt(diff.get(0));
    }
}`,
      explanation: 'Compare s1 and s2 character by character. Store indices where they differ. For at most one swap to make them equal: they must either have 0 differences, or exactly 2 differences where swapping them resolves the conflict (s1[i] == s2[j] and s1[j] == s2[i]). Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1796',
    slug: 'second-largest-digit-in-a-string',
    title: 'Second Largest Digit in a String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an alphanumeric string `s`, return the **second largest** numerical digit that appears in `s`, or `-1` if it does not exist.',
    constraints: ['1 <= s.length <= 500', 's consists of lowercase English letters and/or digits.'],
    solutions: {
      python: `class Solution:
    def secondHighest(self, s: str) -> int:
        digits = {int(c) for c in s if c.isdigit()}
        if len(digits) < 2: return -1
        return sorted(list(digits))[-2]`,
      cpp: `class Solution {
public:
    int secondHighest(string s) {
        int m1 = -1, m2 = -1;
        for (char c : s) {
            if (isdigit(c)) {
                int val = c - '0';
                if (val > m1) { m2 = m1; m1 = val; }
                else if (val < m1 && val > m2) { m2 = val; }
            }
        }
        return m2;
    }
};`,
      java: `class Solution {
    public int secondHighest(String s) {
        int m1 = -1, m2 = -1;
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                int val = c - '0';
                if (val > m1) { m2 = m1; m1 = val; }
                else if (val < m1 && val > m2) { m2 = val; }
            }
        }
        return m2;
    }
}`,
      explanation: 'Scan characters in string. Extract numeric values. Maintain two variables tracking the largest (m1) and second largest (m2) distinct digit values. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1800',
    slug: 'maximum-ascending-subarray-sum',
    title: 'Maximum Ascending Subarray Sum',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of positive integers `nums`, return the maximum possible sum of an ascending subarray in `nums`.',
    constraints: ['1 <= nums.length <= 100', '1 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def maxAscendingSum(self, nums: List[int]) -> int:
        best = cur = nums[0]
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                cur += nums[i]
            else:
                cur = nums[i]
            best = max(best, cur)
        return best`,
      cpp: `class Solution {
public:
    int maxAscendingSum(vector<int>& nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.size(); ++i) {
            if (nums[i] > nums[i-1]) cur += nums[i];
            else cur = nums[i];
            best = max(best, cur);
        }
        return best;
    }
};`,
      java: `class Solution {
    public int maxAscendingSum(int[] nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i-1]) cur += nums[i];
            else cur = nums[i];
            best = Math.max(best, cur);
        }
        return best;
    }
}`,
      explanation: 'Iterate through the array. Keep a running sum of ascending elements. Reset the running sum to the current element when a drop or equal value is encountered. Track the maximum sum. Time complexity: O(n), Space complexity: O(1).'
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
