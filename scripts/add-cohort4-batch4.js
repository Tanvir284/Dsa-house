const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const BATCH = [
  {
    id: 'lc-942',
    slug: 'di-string-match',
    title: 'DI String Match',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'A permutation `perm` of n + 1 integers of `[0, 1, ..., n]` can be represented by a string `s` of length `n` where:\n- `s[i] == \'I\'` if `perm[i] < perm[i + 1]`\n- `s[i] == \'D\'` if `perm[i] > perm[i + 1]`\n\nGiven `s`, reconstruct `perm`.',
    constraints: ['1 <= s.length <= 10^5', 's consists of only characters \'I\' and \'D\'.'],
    solutions: {
      python: `class Solution:
    def diStringMatch(self, s: str) -> List[int]:
        low, high = 0, len(s)
        res = []
        for c in s:
            if c == 'I':
                res.append(low)
                low += 1
            else:
                res.append(high)
                high -= 1
        res.append(low)
        return res`,
      cpp: `class Solution {
public:
    vector<int> diStringMatch(string s) {
        int low = 0, high = s.size();
        vector<int> res;
        for (char c : s) {
            if (c == 'I') res.push_back(low++);
            else res.push_back(high--);
        }
        res.push_back(low);
        return res;
    }
};`,
      java: `class Solution {
    public int[] diStringMatch(String s) {
        int low = 0, high = s.length();
        int[] res = new int[s.length() + 1];
        int idx = 0;
        for (char c : s.toCharArray()) {
            if (c == 'I') res[idx++] = low++;
            else res[idx++] = high--;
        }
        res[idx] = low;
        return res;
    }
}`,
      explanation: 'Use two pointers low = 0 and high = n. If s[i] is "I", assign the smallest available number low (since the next number must be larger). If s[i] is "D", assign the largest available number high. Assign the last remaining number at the end. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-944',
    slug: 'delete-columns-to-make-sorted',
    title: 'Delete Columns to Make Sorted',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given an array of `n` strings `strs`, all of the same length. Return the number of columns that are not sorted lexicographically.',
    constraints: ['n == strs.length', '1 <= n <= 100', '1 <= strs[i].length <= 1000', 'strs[i] consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        cols = len(strs[0])
        rows = len(strs)
        ans = 0
        for c in range(cols):
            for r in range(1, rows):
                if strs[r][c] < strs[r - 1][c]:
                    ans += 1
                    break
        return ans`,
      cpp: `class Solution {
public:
    int minDeletionSize(vector<string>& strs) {
        int cols = strs[0].size(), rows = strs.size(), ans = 0;
        for (int c = 0; c < cols; ++c) {
            for (int r = 1; r < rows; ++r) {
                if (strs[r][c] < strs[r - 1][c]) { ans++; break; }
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int minDeletionSize(String[] strs) {
        int cols = strs[0].length(), rows = strs.length, ans = 0;
        for (int c = 0; c < cols; c++) {
            for (int r = 1; r < rows; r++) {
                if (strs[r].charAt(c) < strs[r - 1].charAt(c)) { ans++; break; }
            }
        }
        return ans;
    }
}`,
      explanation: 'Iterate column by column. For each column, check if characters at row r are strictly sorted (i.e. strs[r][c] >= strs[r-1][c] for all r >= 1). Increment count if a column violates this. Time complexity: O(rows * cols), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-953',
    slug: 'verifying-an-alien-dictionary',
    title: 'Verifying an Alien Dictionary',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'In an alien language, surprisingly, they also use English lowercase letters, but possibly in a different order. Given a sequence of words written in the alien language, and the order of the alphabet, return `true` if and only if the given words are sorted lexicographically in this alien dictionary.',
    constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 20', 'order.length == 26', 'All characters in words[i] and order are English lowercase letters.'],
    solutions: {
      python: `class Solution:
    def isAlienSorted(self, words: List[str], order: str) -> bool:
        pos = {c: i for i, c in enumerate(order)}
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            # Compare character by character
            for j in range(min(len(w1), len(w2))):
                if w1[j] != w2[j]:
                    if pos[w1[j]] > pos[w2[j]]:
                        return False
                    break
            else:
                if len(w1) > len(w2):
                    return False
        return True`,
      cpp: `class Solution {
public:
    bool isAlienSorted(vector<string>& words, string order) {
        int pos[26];
        for (int i = 0; i < 26; ++i) pos[order[i] - 'a'] = i;
        for (int i = 0; i < words.size() - 1; ++i) {
            string w1 = words[i], w2 = words[i + 1];
            bool compared = false;
            for (int j = 0; j < min(w1.size(), w2.size()); ++j) {
                if (w1[j] != w2[j]) {
                    if (pos[w1[j] - 'a'] > pos[w2[j] - 'a']) return false;
                    compared = true;
                    break;
                }
            }
            if (!compared && w1.size() > w2.size()) return false;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isAlienSorted(String[] words, String order) {
        int[] pos = new int[26];
        for (int i = 0; i < 26; i++) pos[order.charAt(i) - 'a'] = i;
        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            boolean compared = false;
            for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {
                if (w1.charAt(j) != w2.charAt(j)) {
                    if (pos[w1.charAt(j) - 'a'] > pos[w2.charAt(j) - 'a']) return false;
                    compared = true;
                    break;
                }
            }
            if (!compared && w1.length() > w2.length()) return false;
        }
        return true;
    }
}`,
      explanation: 'Store character rankings in an index map for O(1) order checks. Compare adjacent words: verify if their first mismatched characters respect the alien dictionary order. If one word is a prefix of the other, the shorter word must come first. Time complexity: O(N * L) where L is max word length, Space complexity: O(1).'
    }
  },
  {
    id: 'lc-961',
    slug: 'n-repeated-element-in-size-2n-array',
    title: 'N-Repeated Element in Size 2N Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given an integer array `nums` of size `2N` containing `N + 1` unique elements. Exactly one element in `nums` is repeated `N` times. Find this element.',
    constraints: ['4 <= nums.length <= 10000', 'nums.length is even.', '0 <= nums[i] <= 10^4', 'Exactly one element in nums is repeated N times.'],
    solutions: {
      python: `class Solution:
    def repeatedNTimes(self, nums: List[int]) -> int:
        # The N-repeated element must appear within distance 3 of itself
        for i in range(len(nums) - 2):
            if nums[i] == nums[i + 1] or nums[i] == nums[i + 2]:
                return nums[i]
        return nums[-1]`,
      cpp: `class Solution {
public:
    int repeatedNTimes(vector<int>& nums) {
        for (int i = 0; i < nums.size() - 2; ++i) {
            if (nums[i] == nums[i + 1] || nums[i] == nums[i + 2]) return nums[i];
        }
        return nums.back();
    }
};`,
      java: `class Solution {
    public int repeatedNTimes(int[] nums) {
        for (int i = 0; i < nums.length - 2; i++) {
            if (nums[i] == nums[i + 1] || nums[i] == nums[i + 2]) return nums[i];
        }
        return nums[nums.length - 1];
    }
}`,
      explanation: 'Since one element represents exactly half of the array size (N out of 2N), it must either be adjacent or separated by at most two elements. Traverse and check gaps up to 2. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-965',
    slug: 'univalued-binary-tree',
    title: 'Univalued Binary Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'A binary tree is univalued if every node in the tree has the same value. Return `true` if the given tree is univalued.',
    constraints: ['The number of nodes in the tree is in the range [1, 100].', '0 <= Node.val <= 99'],
    solutions: {
      python: `class Solution:
    def isUnivalTree(self, root: Optional[TreeNode]) -> bool:
        val = root.val
        def dfs(node):
            if not node: return True
            if node.val != val: return False
            return dfs(node.left) and dfs(node.right)
        return dfs(root)`,
      cpp: `class Solution {
    bool dfs(TreeNode* node, int val) {
        if (!node) return true;
        if (node->val != val) return false;
        return dfs(node->left, val) && dfs(node->right, val);
    }
public:
    bool isUnivalTree(TreeNode* root) {
        if (!root) return true;
        return dfs(root, root->val);
    }
};`,
      java: `class Solution {
    private boolean dfs(TreeNode node, int val) {
        if (node == null) return true;
        if (node.val != val) return false;
        return dfs(node.left, val) && dfs(node.right, val);
    }
    public boolean isUnivalTree(TreeNode root) {
        if (root == null) return true;
        return dfs(root, root.val);
    }
}`,
      explanation: 'Run a simple DFS traversal from the root. Verify that every node encountered shares the same value as the root node. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-976',
    slug: 'largest-perimeter-triangle',
    title: 'Largest Perimeter Triangle',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given an integer array `nums`, return the largest perimeter of a triangle with a non-zero area, formed from three of these lengths. If it is impossible to form any triangle of a non-zero area, return `0`.',
    constraints: ['3 <= nums.length <= 10^4', '1 <= nums[i] <= 10^6'],
    solutions: {
      python: `class Solution:
    def largestPerimeter(self, nums: List[int]) -> int:
        nums.sort(reverse=True)
        for i in range(len(nums) - 2):
            if nums[i] < nums[i + 1] + nums[i + 2]:
                return nums[i] + nums[i + 1] + nums[i + 2]
        return 0`,
      cpp: `class Solution {
public:
    int largestPerimeter(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        for (int i = nums.size() - 3; i >= 0; --i) {
            if (nums[i] + nums[i + 1] > nums[i + 2]) {
                return nums[i] + nums[i + 1] + nums[i + 2];
            }
        }
        return 0;
    }
};`,
      java: `class Solution {
    public int largestPerimeter(int[] nums) {
        Arrays.sort(nums);
        for (int i = nums.length - 3; i >= 0; i--) {
            if (nums[i] + nums[i + 1] > nums[i + 2]) {
                return nums[i] + nums[i + 1] + nums[i + 2];
            }
        }
        return 0;
    }
}`,
      explanation: 'Sort the array. To maximize the perimeter, evaluate triplets from largest to smallest. A valid triangle requires the sum of two smaller sides to be strictly greater than the third side: a + b > c. The first triplet satisfying this condition is the greedy optimal solution. Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-989',
    slug: 'add-to-array-form-of-integer',
    title: 'Add to Array-Form of Integer',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given `num`, the array-form of an integer, and an integer `k`, return the array-form of the integer `num + k`.',
    constraints: ['1 <= num.length <= 10^4', '0 <= num[i] <= 9', 'num does not contain any leading zeros except 0 itself.', '1 <= k <= 10^4'],
    solutions: {
      python: `class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        res = []
        i = len(num) - 1
        while i >= 0 or k > 0:
            if i >= 0:
                k += num[i]
                i -= 1
            res.append(k % 10)
            k //= 10
        return list(reversed(res))`,
      cpp: `class Solution {
public:
    vector<int> addToArrayForm(vector<int>& num, int k) {
        vector<int> res;
        int i = num.size() - 1;
        while (i >= 0 || k > 0) {
            if (i >= 0) { k += num[i--]; }
            res.push_back(k % 10);
            k /= 10;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`,
      java: `class Solution {
    public List<Integer> addToArrayForm(int[] num, int k) {
        List<Integer> res = new ArrayList<>();
        int i = num.length - 1;
        while (i >= 0 || k > 0) {
            if (i >= 0) { k += num[i--]; }
            res.add(k % 10);
            k /= 10;
        }
        Collections.reverse(res);
        return res;
    }
}`,
      explanation: 'Iterate through the array from right to left, adding digit values to k. Push k % 10 to results and carry over k = k / 10. Repeat until both array digits are exhausted and k becomes 0. Reverse the result. Time complexity: O(max(n, log k)), Space complexity: O(max(n, log k)).'
    }
  },
  {
    id: 'lc-993',
    slug: 'cousins-in-binary-tree',
    title: 'Cousins in Binary Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree with unique values, and two values `x` and `y`, return `true` if and only if the nodes corresponding to values `x` and `y` are cousins.',
    constraints: ['The number of nodes in the tree is in the range [2, 100].', '1 <= Node.val <= 100', 'Each node has a unique value.', 'x != y', 'x and y exist in the tree.'],
    solutions: {
      python: `class Solution:
    def isCousins(self, root: Optional[TreeNode], x: int, y: int) -> bool:
        # Keep track of depth and parent of x and y
        info = {}
        def dfs(node, parent, d):
            if not node: return
            if node.val == x or node.val == y:
                info[node.val] = (parent, d)
            dfs(node.left, node, d + 1)
            dfs(node.right, node, d + 1)
        dfs(root, None, 0)
        p_x, d_x = info[x]
        p_y, d_y = info[y]
        return d_x == d_y and p_x != p_y`,
      cpp: `class Solution {
    int dx = -1, dy = -1;
    TreeNode *px = nullptr, *py = nullptr;
    void dfs(TreeNode* node, TreeNode* parent, int depth, int x, int y) {
        if (!node) return;
        if (node->val == x) { px = parent; dx = depth; }
        if (node->val == y) { py = parent; dy = depth; }
        dfs(node->left, node, depth + 1, x, y);
        dfs(node->right, node, depth + 1, x, y);
    }
public:
    bool isCousins(TreeNode* root, int x, int y) {
        dfs(root, nullptr, 0, x, y);
        return dx == dy && px != py;
    }
};`,
      java: `class Solution {
    int dx = -1, dy = -1;
    TreeNode px = null, py = null;
    private void dfs(TreeNode node, TreeNode parent, int depth, int x, int y) {
        if (node == null) return;
        if (node.val == x) { px = parent; dx = depth; }
        if (node.val == y) { py = parent; dy = depth; }
        dfs(node.left, node, depth + 1, x, y);
        dfs(node.right, node, depth + 1, x, y);
    }
    public boolean isCousins(TreeNode root, int x, int y) {
        dfs(root, null, 0, x, y);
        return dx == dy && px != py;
    }
}`,
      explanation: 'Use DFS to locate both nodes x and y. Record their depths and parent pointers. Nodes are cousins if they exist at the same depth but have different parents. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-997',
    slug: 'find-the-town-judge',
    title: 'Find the Town Judge',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'In a town, there are `n` people labeled from `1` to `n`. There is a rumor that one of these people is secretly the town judge. Find the town judge, or return `-1`.',
    constraints: ['1 <= n <= 1000', '0 <= trust.length <= 10^4', 'trust[i].length == 2', 'All trust relationships are unique.', 'a_i != b_i'],
    solutions: {
      python: `class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        indegree = [0] * (n + 1)
        outdegree = [0] * (n + 1)
        for a, b in trust:
            outdegree[a] += 1
            indegree[b] += 1
        for i in range(1, n + 1):
            if indegree[i] == n - 1 and outdegree[i] == 0:
                return i
        return -1`,
      cpp: `class Solution {
public:
    int findJudge(int n, vector<vector<int>>& trust) {
        vector<int> indegree(n + 1, 0), outdegree(n + 1, 0);
        for (const auto& t : trust) {
            outdegree[t[0]]++;
            indegree[t[1]]++;
        }
        for (int i = 1; i <= n; ++i) {
            if (indegree[i] == n - 1 && outdegree[i] == 0) return i;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int findJudge(int n, int[][] trust) {
        int[] indegree = new int[n + 1];
        int[] outdegree = new int[n + 1];
        for (int[] t : trust) {
            outdegree[t[0]]++;
            indegree[t[1]]++;
        }
        for (int i = 1; i <= n; i++) {
            if (indegree[i] == n - 1 && outdegree[i] == 0) return i;
        }
        return -1;
    }
}`,
      explanation: 'Model relationships as a directed graph. The town judge has an indegree of n - 1 (everyone trusts them) and an outdegree of 0 (they trust no one). Track degree counts for each person. Time complexity: O(n + T) where T is trust count, Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1002',
    slug: 'find-common-characters',
    title: 'Find Common Characters',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a string array `words`, return an array of all characters that show up in all words within the `words` (including duplicates).',
    constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 100', 'words[i] consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def commonChars(self, words: List[str]) -> List[str]:
        # Track minimum frequency of each character across all words
        min_freq = [float('inf')] * 26
        for w in words:
            curr = [0] * 26
            for c in w: curr[ord(c) - 97] += 1
            for i in range(26):
                min_freq[i] = min(min_freq[i], curr[i])
        res = []
        for i in range(26):
            res.extend([chr(97 + i)] * min_freq[i])
        return res`,
      cpp: `class Solution {
public:
    vector<string> commonChars(vector<string>& words) {
        vector<int> minFreq(26, INT_MAX);
        for (const string& w : words) {
            vector<int> curr(26, 0);
            for (char c : w) curr[c - 'a']++;
            for (int i = 0; i < 26; ++i) minFreq[i] = min(minFreq[i], curr[i]);
        }
        vector<string> res;
        for (int i = 0; i < 26; ++i) {
            for (int k = 0; k < minFreq[i]; ++k) {
                res.push_back(string(1, 'a' + i));
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<String> commonChars(String[] words) {
        int[] minFreq = new int[26];
        Arrays.fill(minFreq, Integer.MAX_VALUE);
        for (String w : words) {
            int[] curr = new int[26];
            for (char c : w.toCharArray()) curr[c - 'a']++;
            for (int i = 0; i < 26; i++) minFreq[i] = Math.min(minFreq[i], curr[i]);
        }
        List<String> res = new ArrayList<>();
        for (int i = 0; i < 26; i++) {
            for (int k = 0; k < minFreq[i]; k++) {
                res.add(String.valueOf((char)('a' + i)));
            }
        }
        return res;
    }
}`,
      explanation: 'Use frequency counters of size 26. Track the minimum frequency of each character across all words. Finally, build the output list repeating each character by its minimum frequency. Time complexity: O(N * L) where L is max word length, Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-1005',
    slug: 'maximize-sum-of-array-after-k-negations',
    title: 'Maximize Sum Of Array After K Negations',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given an integer array `nums` and an integer `k`, modify the array by negating elements at most `k` times to maximize its sum.',
    constraints: ['1 <= nums.length <= 10000', '-100 <= nums[i] <= 100', '1 <= k <= 10000'],
    solutions: {
      python: `class Solution:
    def largestSumAfterKNegations(self, nums: List[int], k: int) -> int:
        nums.sort()
        for i in range(len(nums)):
            if nums[i] < 0 and k > 0:
                nums[i] = -nums[i]
                k -= 1
        if k % 2 == 1:
            nums.sort()
            nums[0] = -nums[0]
        return sum(nums)`,
      cpp: `class Solution {
public:
    int largestSumAfterKNegations(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] < 0 && k > 0) { nums[i] = -nums[i]; k--; }
        }
        if (k % 2 == 1) {
            sort(nums.begin(), nums.end());
            nums[0] = -nums[0];
        }
        int sum = 0;
        for (int x : nums) sum += x;
        return sum;
    }
};`,
      java: `class Solution {
    public int largestSumAfterKNegations(int[] nums, int k) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] < 0 && k > 0) { nums[i] = -nums[i]; k--; }
        }
        if (k % 2 == 1) {
            Arrays.sort(nums);
            nums[0] = -nums[0];
        }
        int sum = 0;
        for (int x : nums) sum += x;
        return sum;
    }
}`,
      explanation: 'Greedy approach: sort the array. First negate negative numbers starting with the smallest (most negative) as long as k > 0. If k is still positive and odd, sort again and negate the smallest positive number to minimize the sum deduction. Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-1009',
    slug: 'complement-of-base-10-integer',
    title: 'Complement of Base 10 Integer',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'The complement of an integer is the integer you get when you flip all the `0`\'s to `1`\'s and all the `1`\'s to `0`\'s in its binary representation. Given a base-10 integer `n`, return its complement.',
    constraints: ['0 <= n < 2^30'],
    solutions: {
      python: `class Solution:
    def bitwiseComplement(self, n: int) -> int:
        if n == 0: return 1
        mask = (1 << n.bit_length()) - 1
        return n ^ mask`,
      cpp: `class Solution {
public:
    int bitwiseComplement(int n) {
        if (n == 0) return 1;
        unsigned int mask = 1;
        while (mask < n) {
            mask = (mask << 1) | 1;
        }
        return n ^ mask;
    }
};`,
      java: `class Solution {
    public int bitwiseComplement(int n) {
        if (n == 0) return 1;
        int mask = (Integer.highestOneBit(n) << 1) - 1;
        if (mask < 0) mask = Integer.MAX_VALUE;
        return n ^ mask;
    }
}`,
      explanation: 'This is identical to finding number complement. Construct a bitmask of all 1s matching the bit length of n, and XOR n with the mask. Handled n = 0 edge case (returns 1). Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1013',
    slug: 'partition-array-into-three-parts-with-equal-sum',
    title: 'Partition Array Into Three Parts With Equal Sum',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given an array of integers `arr`, return `true` if we can partition the array into three non-empty parts with equal sums.',
    constraints: ['3 <= arr.length <= 5 * 10^4', '-10^4 <= arr[i] <= 10^4'],
    solutions: {
      python: `class Solution:
    def canThreePartsEqualSum(self, arr: List[int]) -> bool:
        total = sum(arr)
        if total % 3 != 0: return False
        target = total // 3
        count, curr = 0, 0
        for x in arr:
            curr += x
            if curr == target:
                count += 1
                curr = 0
        # If count >= 3, it is possible (since total sum matches, remaining part will also sum to target)
        return count >= 3`,
      cpp: `class Solution {
public:
    bool canThreePartsEqualSum(vector<int>& arr) {
        int total = 0;
        for (int x : arr) total += x;
        if (total % 3 != 0) return false;
        int target = total / 3, count = 0, curr = 0;
        for (int x : arr) {
            curr += x;
            if (curr == target) { count++; curr = 0; }
        }
        return count >= 3;
    }
};`,
      java: `class Solution {
    public boolean canThreePartsEqualSum(int[] arr) {
        int total = 0;
        for (int x : arr) total += x;
        if (total % 3 != 0) return false;
        int target = total / 3, count = 0, curr = 0;
        for (int x : arr) {
            curr += x;
            if (curr == target) { count++; curr = 0; }
        }
        return count >= 3;
    }
}`,
      explanation: 'Calculate the total sum. If not divisible by 3, return false. Otherwise, iterate through the array, maintaining a running sum. Every time the running sum reaches target = total / 3, increment the part counter and reset running sum. We need at least 3 parts. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1018',
    slug: 'binary-prefix-divisible-by-5',
    title: 'Binary Prefix Divisible By 5',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are given a binary array `nums`. We define `x_i` as the number represented by the binary prefix `nums[0...i]`. Return a list of booleans `answer` where `answer[i]` is `true` if `x_i` is divisible by 5.',
    constraints: ['1 <= nums.length <= 10^5', 'nums[i] is 0 or 1.'],
    solutions: {
      python: `class Solution:
    def prefixesDivBy5(self, nums: List[int]) -> List[bool]:
        res = []
        curr = 0
        for bit in nums:
            curr = (curr * 2 + bit) % 5
            res.append(curr == 0)
        return res`,
      cpp: `class Solution {
public:
    vector<bool> prefixesDivBy5(vector<int>& nums) {
        vector<bool> res;
        int curr = 0;
        for (int bit : nums) {
            curr = (curr * 2 + bit) % 5;
            res.push_back(curr == 0);
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<Boolean> prefixesDivBy5(int[] nums) {
        List<Boolean> res = new ArrayList<>();
        int curr = 0;
        for (int bit : nums) {
            curr = (curr * 2 + bit) % 5;
            res.add(curr == 0);
        }
        return res;
    }
}`,
      explanation: 'Compute the running decimal representation of the binary prefix. Since we only care about divisibility by 5, keep the value modulo 5 at each step (curr = (curr * 2 + bit) % 5) to prevent integer overflow. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1021',
    slug: 'remove-outermost-parentheses',
    title: 'Remove Outermost Parentheses',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'A valid parentheses string is either empty `""`, `"(" + A + ")"` or `A + B`, where `A` and `B` are valid parentheses strings. Remove the outermost parentheses of every primitive decomposition.',
    constraints: ['1 <= s.length <= 10^5', 's[i] is \'(\' or \')\'.', 's is a valid parentheses string.'],
    solutions: {
      python: `class Solution:
    def removeOuterParentheses(self, s: str) -> str:
        res = []
        opened = 0
        for c in s:
            if c == '(':
                if opened > 0: res.append(c)
                opened += 1
            else:
                opened -= 1
                if opened > 0: res.append(c)
        return "".join(res)`,
      cpp: `class Solution {
public:
    string removeOuterParentheses(string s) {
        string res = "";
        int opened = 0;
        for (char c : s) {
            if (c == '(') {
                if (opened > 0) res += c;
                opened++;
            } else {
                opened--;
                if (opened > 0) res += c;
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public String removeOuterParentheses(String s) {
        StringBuilder sb = new StringBuilder();
        int opened = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') {
                if (opened > 0) sb.append(c);
                opened++;
            } else {
                opened--;
                if (opened > 0) sb.append(c);
            }
        }
        return sb.toString();
    }
}`,
      explanation: 'Track the nesting level using a counter opened. Append \'(\' to results if opened > 0, and append \')\' if opened > 1 before decrementing. Outermost brackets occur when opened goes from 0 to 1 or 1 to 0, which are skipped. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1022',
    slug: 'sum-of-root-to-leaf-binary-numbers',
    title: 'Sum of Root To Leaf Binary Numbers',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'You are given the `root` of a binary tree where each node has a value `0` or `1`. Each root-to-leaf path represents a binary number starting with the most significant bit. Return the sum of these numbers.',
    constraints: ['The number of nodes in the tree is in the range [1, 1000].', 'Node.val is 0 or 1.'],
    solutions: {
      python: `class Solution:
    def sumRootToLeaf(self, root: Optional[TreeNode]) -> int:
        def dfs(node, val):
            if not node: return 0
            val = (val << 1) | node.val
            if not node.left and not node.right:
                return val
            return dfs(node.left, val) + dfs(node.right, val)
        return dfs(root, 0)`,
      cpp: `class Solution {
    int dfs(TreeNode* node, int val) {
        if (!node) return 0;
        val = (val << 1) | node->val;
        if (!node->left && !node->right) return val;
        return dfs(node->left, val) + dfs(node->right, val);
    }
public:
    int sumRootToLeaf(TreeNode* root) {
        return dfs(root, 0);
    }
};`,
      java: `class Solution {
    private int dfs(TreeNode node, int val) {
        if (node == null) return 0;
        val = (val << 1) | node.val;
        if (node.left == null && node.right == null) return val;
        return dfs(node.left, val) + dfs(node.right, val);
    }
    public int sumRootToLeaf(TreeNode root) {
        return dfs(root, 0);
    }
}`,
      explanation: 'Use DFS. Maintain a running path value. Shift the running value left by 1 and OR with the current node value (val = (val << 1) | node.val). At leaf nodes, return this value. Sum values returned from subtrees. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-1025',
    slug: 'divisor-game',
    title: 'Divisor Game',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Alice and Bob take turns playing a game, with Alice starting first. On each player\'s turn, that player makes a move consisting of choosing any `x` with `0 < x < n` and `n % x == 0` and replacing `n` with `n - x`. Return `true` if Alice wins the game, assuming both players play optimally.',
    constraints: ['1 <= n <= 1000'],
    solutions: {
      python: `class Solution:
    def divisorGame(self, n: int) -> bool:
        return n % 2 == 0`,
      cpp: `class Solution {
public:
    bool divisorGame(int n) {
        return n % 2 == 0;
    }
};`,
      java: `class Solution {
    public boolean divisorGame(int n) {
        return n % 2 == 0;
    }
}`,
      explanation: 'If n is even, Alice can choose x = 1 to hand Bob an odd number (n - 1). Since odd numbers only have odd divisors, Bob must subtract an odd number, yielding an even number back to Alice. Alice can maintain this state until reaching n = 2, where she subtracts 1 to win (leaving Bob with 1, who has no moves). Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1030',
    slug: 'matrix-cells-in-distance-order',
    title: 'Matrix Cells in Distance Order',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'BFS',
    description: 'You are given four integers `rows`, `cols`, `rCenter`, and `cCenter`. Return the coordinates of all cells in the matrix, sorted by their Manhattan distance from `(rCenter, cCenter)`.',
    constraints: ['1 <= rows, cols <= 100', '0 <= rCenter < rows', '0 <= cCenter < cols'],
    solutions: {
      python: `class Solution:
    def allCellsDistOrder(self, rows: int, cols: int, rCenter: int, cCenter: int) -> List[List[int]]:
        cells = []
        for r in range(rows):
            for c in range(cols):
                cells.append([r, c])
        return sorted(cells, key=lambda cell: abs(cell[0] - rCenter) + abs(cell[1] - cCenter))`,
      cpp: `class Solution {
public:
    vector<vector<int>> allCellsDistOrder(int rows, int cols, int rCenter, int cCenter) {
        vector<vector<int>> cells;
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                cells.push_back({r, c});
            }
        }
        sort(cells.begin(), cells.end(), [rCenter, cCenter](const vector<int>& a, const vector<int>& b) {
            return abs(a[0] - rCenter) + abs(a[1] - cCenter) < abs(b[0] - rCenter) + abs(b[1] - cCenter);
        });
        return cells;
    }
};`,
      java: `class Solution {
    public int[][] allCellsDistOrder(int rows, int cols, int rCenter, int cCenter) {
        int[][] cells = new int[rows * cols][2];
        int idx = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                cells[idx++] = new int[]{r, c};
            }
        }
        Arrays.sort(cells, (a, b) -> {
            int d1 = Math.abs(a[0] - rCenter) + Math.abs(a[1] - cCenter);
            int d2 = Math.abs(b[0] - rCenter) + Math.abs(b[1] - cCenter);
            return Integer.compare(d1, d2);
        });
        return cells;
    }
}`,
      explanation: 'Collect the coordinates of all cells in the grid. Sort the cells using a custom comparator based on their Manhattan distance to the center cell (rCenter, cCenter). Time complexity: O(R * C log (R * C)), Space complexity: O(R * C).'
    }
  },
  {
    id: 'lc-1037',
    slug: 'valid-boomerang',
    title: 'Valid Boomerang',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an array `points` where `points[i] = [x_i, y_i]` represents a point on the X-Y plane, return `true` if these points form a boomerang. A boomerang is a set of three points that are all distinct and not in a straight line.',
    constraints: ['points.length == 3', 'points[i].length == 2', '0 <= x_i, y_i <= 100'],
    solutions: {
      python: `class Solution:
    def isBoomerang(self, points: List[List[int]]) -> bool:
        # Cross product (x1 - x2)*(y2 - y3) - (y1 - y2)*(x2 - x3) != 0
        (x1, y1), (x2, y2), (x3, y3) = points
        return (x1 - x2) * (y2 - y3) != (y1 - y2) * (x2 - x3)`,
      cpp: `class Solution {
public:
    bool isBoomerang(vector<vector<int>>& points) {
        return (points[0][0] - points[1][0]) * (points[1][1] - points[2][1]) !=
               (points[0][1] - points[1][1]) * (points[1][0] - points[2][0]);
    }
};`,
      java: `class Solution {
    public boolean isBoomerang(int[][] points) {
        return (points[0][0] - points[1][0]) * (points[1][1] - points[2][1]) !=
               (points[0][1] - points[1][1]) * (points[1][0] - points[2][0]);
    }
}`,
      explanation: 'Three points are collinear (lie on a straight line) if the slope of points 1 and 2 equals the slope of points 2 and 3. Avoid division by zero issues by comparing using multiplication: (x1 - x2) * (y2 - y3) != (y1 - y2) * (x2 - x3). Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1046',
    slug: 'last-stone-weight',
    title: 'Last Stone Weight',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Heap (Priority Queue)',
    description: 'You are given an array of integers `stones` where `stones[i]` is the weight of the `i`-th stone. We play a game smashing stones. Return the weight of the last remaining stone. If no stones are left, return `0`.',
    constraints: ['1 <= stones.length <= 1000', '1 <= stones[i] <= 1000'],
    solutions: {
      python: `import heapq
class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        # Max-heap using negative values
        heap = [-x for x in stones]
        heapq.heapify(heap)
        while len(heap) > 1:
            s1 = -heapq.heappop(heap)
            s2 = -heapq.heappop(heap)
            if s1 != s2:
                heapq.heappush(heap, -(s1 - s2))
        return -heap[0] if heap else 0`,
      cpp: `class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> pq(stones.begin(), stones.end());
        while (pq.size() > 1) {
            int s1 = pq.top(); pq.pop();
            int s2 = pq.top(); pq.pop();
            if (s1 != s2) pq.push(s1 - s2);
        }
        return pq.empty() ? 0 : pq.top();
    }
};`,
      java: `class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int x : stones) pq.add(x);
        while (pq.size() > 1) {
            int s1 = pq.poll();
            int s2 = pq.poll();
            if (s1 != s2) pq.add(s1 - s2);
        }
        return pq.isEmpty() ? 0 : pq.peek();
    }
}`,
      explanation: 'Use a max-heap. Pop the two heaviest stones s1 and s2 (where s1 >= s2). If s1 != s2, push s1 - s2 back into the heap. Repeat until at most 1 stone remains. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1047',
    slug: 'remove-all-adjacent-duplicates-in-string',
    title: 'Remove All Adjacent Duplicates In String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'You are given a string `s` consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them. Return the final string after all such duplicate removals have been made.',
    constraints: ['1 <= s.length <= 10^5', 's consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def removeDuplicates(self, s: str) -> str:
        stack = []
        for c in s:
            if stack and stack[-1] == c:
                stack.pop()
            else:
                stack.append(c)
        return "".join(stack)`,
      cpp: `class Solution {
public:
    string removeDuplicates(string s) {
        string res = "";
        for (char c : s) {
            if (!res.empty() && res.back() == c) res.pop_back();
            else res.push_back(c);
        }
        return res;
    }
};`,
      java: `class Solution {
    public String removeDuplicates(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            int len = sb.length();
            if (len > 0 && sb.charAt(len - 1) == c) sb.deleteCharAt(len - 1);
            else sb.append(c);
        }
        return sb.toString();
    }
}`,
      explanation: 'Use a stack (or string builder acting as stack). Iterate through characters. If the top of the stack matches the current character, pop it (removing the adjacent pair). Otherwise, push the character. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1051',
    slug: 'height-checker',
    title: 'Height Checker',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'A school is trying to take an annual photo of all the students. Return the number of indices where `heights[i] != expected[i]` where `expected` is the sorted version of `heights`.',
    constraints: ['1 <= heights.length <= 100', '1 <= heights[i] <= 100'],
    solutions: {
      python: `class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        expected = sorted(heights)
        return sum(x != y for x, y in zip(heights, expected))`,
      cpp: `class Solution {
public:
    int heightChecker(vector<int>& heights) {
        vector<int> expected = heights;
        sort(expected.begin(), expected.end());
        int ans = 0;
        for (int i = 0; i < heights.size(); ++i) {
            if (heights[i] != expected[i]) ans++;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int heightChecker(int[] heights) {
        int[] expected = heights.clone();
        Arrays.sort(expected);
        int ans = 0;
        for (int i = 0; i < heights.length; i++) {
            if (heights[i] != expected[i]) ans++;
        }
        return ans;
    }
}`,
      explanation: 'Sort a copy of the heights array to obtain the expected order. Compare the original and sorted arrays index by index, counting elements that differ. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1071',
    slug: 'greatest-common-divisor-of-strings',
    title: 'Greatest Common Divisor of Strings',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given two strings `str1` and `str2`, return the largest string `x` such that `x` divides both `str1` and `str2`.',
    constraints: ['1 <= str1.length, str2.length <= 1000', 'str1 and str2 consist of English uppercase letters.'],
    solutions: {
      python: `from math import gcd
class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        if str1 + str2 != str2 + str1:
            return ""
        return str1[:gcd(len(str1), len(str2))]`,
      cpp: `class Solution {
    int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
public:
    string gcdOfStrings(string str1, string str2) {
        if (str1 + str2 != str2 + str1) return "";
        return str1.substr(0, gcd(str1.size(), str2.size()));
    }
};`,
      java: `class Solution {
    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
    public String gcdOfStrings(String str1, String str2) {
        if (!(str1 + str2).equals(str2 + str1)) return "";
        return str1.substring(0, gcd(str1.length(), str2.length()));
    }
}`,
      explanation: 'A common dividing string exists if and only if str1 + str2 == str2 + str1. If true, the length of the GCD string is the GCD of their lengths. Extract the prefix of that length. Time complexity: O(n + m), Space complexity: O(n + m).'
    }
  },
  {
    id: 'lc-1078',
    slug: 'occurrences-after-bigram',
    title: 'Occurrences After Bigram',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given words `first` and `second`, consider occurrences in some text of the form `"first second third"`, where `second` comes immediately after `first`, and `third` comes immediately after `second`. Return an array of all the words `third`.',
    constraints: ['1 <= text.length <= 1000', 'text consists of English lowercase letters and spaces.', '1 <= first.length, second.length <= 10', 'first and second consist of English lowercase letters.'],
    solutions: {
      python: `class Solution:
    def findOcurrences(self, text: str, first: str, second: str) -> List[str]:
        words = text.split(" ")
        res = []
        for i in range(len(words) - 2):
            if words[i] == first and words[i + 1] == second:
                res.append(words[i + 2])
        return res`,
      cpp: `class Solution {
public:
    vector<string> findOcurrences(string text, string first, string second) {
        stringstream ss(text);
        string word;
        vector<string> words;
        while (ss >> word) words.push_back(word);
        vector<string> res;
        if (words.size() < 3) return {};
        for (int i = 0; i < (int)words.size() - 2; ++i) {
            if (words[i] == first && words[i + 1] == second) {
                res.push_back(words[i + 2]);
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public String[] findOcurrences(String text, String first, String second) {
        String[] words = text.split(" ");
        List<String> res = new ArrayList<>();
        for (int i = 0; i < words.length - 2; i++) {
            if (words[i].equals(first) && words[i + 1].equals(second)) {
                res.add(words[i + 2]);
            }
        }
        return res.toArray(new String[0]);
    }
}`,
      explanation: 'Split the text into individual words. Loop through the words up to index n - 3, and check if words[i] matches first and words[i+1] matches second. If so, add words[i+2] to the result list. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1089',
    slug: 'duplicate-zeros',
    title: 'Duplicate Zeros',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given a fixed-length integer array `arr`, duplicate each occurrence of zero, shifting the remaining elements to the right. Do not write beyond the original length. Modify in-place.',
    constraints: ['1 <= arr.length <= 10^4', '0 <= arr[i] <= 9'],
    solutions: {
      python: `class Solution:
    def duplicateZeros(self, arr: List[int]) -> None:
        zeros = arr.count(0)
        n = len(arr)
        # Iterate backwards to shift in-place
        for i in range(n - 1, -1, -1):
            if i + zeros < n:
                arr[i + zeros] = arr[i]
            if arr[i] == 0:
                zeros -= 1
                if i + zeros < n:
                    arr[i + zeros] = 0`,
      cpp: `class Solution {
public:
    void duplicateZeros(vector<int>& arr) {
        int zeros = 0, n = arr.size();
        for (int x : arr) if (x == 0) zeros++;
        for (int i = n - 1; i >= 0; --i) {
            if (i + zeros < n) arr[i + zeros] = arr[i];
            if (arr[i] == 0) {
                zeros--;
                if (i + zeros < n) arr[i + zeros] = 0;
            }
        }
    }
};`,
      java: `class Solution {
    public void duplicateZeros(int[] arr) {
        int zeros = 0, n = arr.length;
        for (int x : arr) if (x == 0) zeros++;
        for (int i = n - 1; i >= 0; i--) {
            if (i + zeros < n) arr[i + zeros] = arr[i];
            if (arr[i] == 0) {
                zeros--;
                if (i + zeros < n) arr[i + zeros] = 0;
            }
        }
    }
}`,
      explanation: 'First count the total number of zeros. Loop backwards through the array; shift each element to its correct shifted position i + zeros if it falls within bounds. If the element is 0, decrement zeros and write another 0 at i + zeros. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1103',
    slug: 'distribute-candies-to-people',
    title: 'Distribute Candies to People',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'We distribute some number of candies, to a row of `n = num_people` people in the following way: we give 1 candy to the first, 2 to the second, etc., until we run out of candies. Return an array representing the candies received by each person.',
    constraints: ['1 <= candies <= 10^9', '1 <= num_people <= 1000'],
    solutions: {
      python: `class Solution:
    def distributeCandies(self, candies: int, num_people: int) -> List[int]:
        res = [0] * num_people
        idx = 0
        give = 1
        while candies > 0:
            actual = min(candies, give)
            res[idx] += actual
            candies -= actual
            give += 1
            idx = (idx + 1) % num_people
        return res`,
      cpp: `class Solution {
public:
    vector<int> distributeCandies(int candies, int num_people) {
        vector<int> res(num_people, 0);
        int idx = 0, give = 1;
        while (candies > 0) {
            int actual = min(candies, give);
            res[idx] += actual;
            candies -= actual;
            give++;
            idx = (idx + 1) % num_people;
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] distributeCandies(int candies, int num_people) {
        int[] res = new int[num_people];
        int idx = 0, give = 1;
        while (candies > 0) {
            int actual = Math.min(candies, give);
            res[idx] += actual;
            candies -= actual;
            give++;
            idx = (idx + 1) % num_people;
        }
        return res;
    }
}`,
      explanation: 'Simulate the distribution process. Maintain the current index in the row (using idx = (idx + 1) % num_people) and the number of candies to give (incremented by 1 each turn). Stop when candies become 0. Time complexity: O(sqrt(candies)), Space complexity: O(num_people).'
    }
  },
  {
    id: 'lc-1108',
    slug: 'defanging-an-ip-address',
    title: 'Defanging an IP Address',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a valid (IPv4) IP `address`, return a defanged version of that IP address. A defanged IP address replaces every period `.` with `"[.]"`.',
    constraints: ['The given address is a valid IPv4 address.'],
    solutions: {
      python: `class Solution:
    def defangIPaddr(self, address: str) -> str:
        return address.replace(".", "[.]")`,
      cpp: `class Solution {
public:
    string defangIPaddr(string address) {
        string res = "";
        for (char c : address) {
            if (c == '.') res += "[.]";
            else res += c;
        }
        return res;
    }
};`,
      java: `class Solution {
    public String defangIPaddr(String address) {
        return address.replace(".", "[.]");
    }
}`,
      explanation: 'Replace every occurrence of period character \'.\' with substring "[.]". Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1122',
    slug: 'relative-sort-array',
    title: 'Relative Sort Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two arrays `arr1` and `arr2`, the elements of `arr2` are distinct, and all elements in `arr2` are also in `arr1`. Sort the elements of `arr1` such that the relative ordering of items in `arr1` are the same as in `arr2`. Elements that do not appear in `arr2` should be placed at the end of `arr1` in ascending order.',
    constraints: ['1 <= arr1.length, arr2.length <= 1000', '0 <= arr1[i], arr2[i] <= 1000', 'All the elements of arr2 are distinct.', 'Each arr2[i] is in arr1.'],
    solutions: {
      python: `class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        counts = [0] * 1001
        for x in arr1: counts[x] += 1
        res = []
        # First place elements of arr2
        for x in arr2:
            res.extend([x] * counts[x])
            counts[x] = 0
        # Then place remaining elements in ascending order
        for x in range(1001):
            if counts[x] > 0:
                res.extend([x] * counts[x])
        return res`,
      cpp: `class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        vector<int> counts(1001, 0);
        for (int x : arr1) counts[x]++;
        vector<int> res;
        for (int x : arr2) {
            while (counts[x]--) res.push_back(x);
        }
        for (int x = 0; x <= 1000; ++x) {
            while (counts[x]-- > 0) res.push_back(x);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        int[] counts = new int[1001];
        for (int x : arr1) counts[x]++;
        int[] res = new int[arr1.length];
        int idx = 0;
        for (int x : arr2) {
            while (counts[x]-- > 0) res[idx++] = x;
        }
        for (int x = 0; x <= 1000; x++) {
            while (counts[x]-- > 0) res[idx++] = x;
        }
        return res;
    }
}`,
      explanation: 'Use counting sort. Count the frequency of all elements in arr1 using an array of size 1001. Write elements in the order of arr2, clearing counts. Then write remaining elements from 0 to 1000. Time complexity: O(n + m + K) where K = 1000, Space complexity: O(K).'
    }
  },
  {
    id: 'lc-1128',
    slug: 'number-of-equivalent-domino-pairs',
    title: 'Number of Equivalent Domino Pairs',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a list of `dominoes`, `dominoes[i] = [a, b]` is equivalent to `dominoes[j] = [c, d]` if and only if (`a == c` and `b == d`) or (`a == d` and `b == c`). Return the number of equivalent domino pairs.',
    constraints: ['1 <= dominoes.length <= 4 * 10^4', 'dominoes[i].length == 2', '1 <= dominoes[i][j] <= 9'],
    solutions: {
      python: `class Solution:
    def numEquivDominoPairs(self, dominoes: List[List[int]]) -> int:
        counts = {}
        ans = 0
        for val in dominoes:
            # Canonical key representing the domino
            key = tuple(sorted(val))
            ans += counts.get(key, 0)
            counts[key] = counts.get(key, 0) + 1
        return ans`,
      cpp: `class Solution {
public:
    int numEquivDominoPairs(vector<vector<int>>& dominoes) {
        map<pair<int, int>, int> counts;
        int ans = 0;
        for (const auto& d : dominoes) {
            pair<int, int> key = {min(d[0], d[1]), max(d[0], d[1])};
            ans += counts[key];
            counts[key]++;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int numEquivDominoPairs(int[][] dominoes) {
        Map<Integer, Integer> counts = new HashMap<>();
        int ans = 0;
        for (int[] d : dominoes) {
            int key = Math.min(d[0], d[1]) * 10 + Math.max(d[0], d[1]);
            ans += counts.getOrDefault(key, 0);
            counts.put(key, counts.getOrDefault(key, 0) + 1);
        }
        return ans;
    }
}`,
      explanation: 'Normalize each domino by representing it in a canonical form (e.g. min * 10 + max). Store frequencies in a hash map. For each domino, add the count of equivalent dominoes seen so far to the total answer. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1137',
    slug: 'n-th-tribonacci-number',
    title: 'N-th Tribonacci Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'The Tribonacci sequence T_n is defined as follows:\n`T_0 = 0, T_1 = 1, T_2 = 1`, and `T_{n+3} = T_n + T_{n+1} + T_{n+2}` for `n >= 0`. Given `n`, return the value of `T_n`.',
    constraints: ['0 <= n <= 37', 'The answer is guaranteed to fit within a 32-bit integer.'],
    solutions: {
      python: `class Solution:
    def tribonacci(self, n: int) -> int:
        if n == 0: return 0
        if n <= 2: return 1
        t0, t1, t2 = 0, 1, 1
        for _ in range(3, n + 1):
            t0, t1, t2 = t1, t2, t0 + t1 + t2
        return t2`,
      cpp: `class Solution {
public:
    int tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        int t0 = 0, t1 = 1, t2 = 1;
        for (int i = 3; i <= n; ++i) {
            int temp = t0 + t1 + t2;
            t0 = t1;
            t1 = t2;
            t2 = temp;
        }
        return t2;
    }
};`,
      java: `class Solution {
    public int tribonacci(int n) {
        if (n == 0) return 0;
        if (n <= 2) return 1;
        int t0 = 0, t1 = 1, t2 = 1;
        for (int i = 3; i <= n; i++) {
            int temp = t0 + t1 + t2;
            t0 = t1;
            t1 = t2;
            t2 = temp;
        }
        return t2;
    }
}`,
      explanation: 'Use dynamic programming with constant space. Keep three variables representing T_{i-3}, T_{i-2}, and T_{i-1}, and update them iteratively. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1154',
    slug: 'day-of-the-year',
    title: 'Day of the Year',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given a string `date` representing a Gregorian calendar date formatted as `YYYY-MM-DD`, return the day number of the year.',
    constraints: ['date.length == 10', 'date is a valid date between 1900-01-01 and 2019-12-31.'],
    solutions: {
      python: `class Solution:
    def dayOfYear(self, date: str) -> int:
        y, m, d = map(int, date.split("-"))
        days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        # Leap year check
        if (y % 4 == 0 and y % 100 != 0) or (y % 400 == 0):
            days[1] = 29
        return sum(days[:m - 1]) + d`,
      cpp: `class Solution {
public:
    int dayOfYear(string date) {
        int y = stoi(date.substr(0, 4));
        int m = stoi(date.substr(5, 2));
        int d = stoi(date.substr(8, 2));
        vector<int> days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) days[1] = 29;
        int ans = d;
        for (int i = 0; i < m - 1; ++i) ans += days[i];
        return ans;
    }
};`,
      java: `class Solution {
    public int dayOfYear(String date) {
        int y = Integer.parseInt(date.substring(0, 4));
        int m = Integer.parseInt(date.substring(5, 7));
        int d = Integer.parseInt(date.substring(8, 10));
        int[] days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) days[1] = 29;
        int ans = d;
        for (int i = 0; i < m - 1; i++) ans += days[i];
        return ans;
    }
}`,
      explanation: 'Parse the date into year, month, and day integers. Calculate the sum of days in all months prior to the current month. Check if the year is a leap year (y % 4 == 0 and not divisible by 100, or divisible by 400) to adjust February to 29 days. Add the current day. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1160',
    slug: 'find-words-that-can-be-formed-by-characters',
    title: 'Find Words That Can Be Formed by Characters',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given an array of strings `words` and a string `chars`. Return the sum of lengths of all good words in words (words that can be formed by characters in chars).',
    constraints: ['1 <= words.length <= 1000', '1 <= words[i].length, chars.length <= 100', 'words[i] and chars consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def countCharacters(self, words: List[str], chars: str) -> int:
        target = [0] * 26
        for c in chars: target[ord(c) - 97] += 1
        ans = 0
        for w in words:
            curr = [0] * 26
            for c in w: curr[ord(c) - 97] += 1
            if all(curr[i] <= target[i] for i in range(26)):
                ans += len(w)
        return ans`,
      cpp: `class Solution {
public:
    int countCharacters(vector<string>& words, string chars) {
        vector<int> target(26, 0);
        for (char c : chars) target[c - 'a']++;
        int ans = 0;
        for (const string& w : words) {
            vector<int> curr(26, 0);
            for (char c : w) curr[c - 'a']++;
            bool ok = true;
            for (int i = 0; i < 26; ++i) {
                if (curr[i] > target[i]) { ok = false; break; }
            }
            if (ok) ans += w.size();
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int countCharacters(String[] words, String chars) {
        int[] target = new int[26];
        for (char c : chars.toCharArray()) target[c - 'a']++;
        int ans = 0;
        for (String w : words) {
            int[] curr = new int[26];
            for (char c : w.toCharArray()) curr[c - 'a']++;
            boolean ok = true;
            for (int i = 0; i < 26; i++) {
                if (curr[i] > target[i]) { ok = false; break; }
            }
            if (ok) ans += w.length();
        }
        return ans;
    }
}`,
      explanation: 'Count the frequency of each character in chars. For each word, count its character frequencies. If every character frequency in the word is less than or equal to the character frequency in chars, add the word length to the sum. Time complexity: O(N * L) where N is words count and L is average length, Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-1175',
    slug: 'prime-arrangements',
    title: 'Prime Arrangements',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Return the number of permutations of 1 to `n` so that prime numbers are at prime indices (1-indexed). Return answer modulo `10^9 + 7`.',
    constraints: ['1 <= n <= 100'],
    solutions: {
      python: `class Solution:
    def numPrimeArrangements(self, n: int) -> int:
        # Count primes <= n
        def count_primes(num):
            if num < 2: return 0
            is_prime = [True] * (num + 1)
            is_prime[0] = is_prime[1] = False
            for p in range(2, int(num**0.5) + 1):
                if is_prime[p]:
                    for i in range(p*p, num + 1, p):
                        is_prime[i] = False
            return sum(is_prime)
        
        num_primes = count_primes(n)
        num_non_primes = n - num_primes
        
        # Calculate (num_primes)! * (num_non_primes)! % (10^9 + 7)
        MOD = 10**9 + 7
        ans = 1
        for i in range(1, num_primes + 1):
            ans = (ans * i) % MOD
        for i in range(1, num_non_primes + 1):
            ans = (ans * i) % MOD
        return ans`,
      cpp: `class Solution {
    int countPrimes(int num) {
        if (num < 2) return 0;
        vector<bool> isPrime(num + 1, true);
        isPrime[0] = isPrime[1] = false;
        for (int p = 2; p * p <= num; ++p) {
            if (isPrime[p]) {
                for (int i = p * p; i <= num; i += p) isPrime[i] = false;
            }
        }
        int count = 0;
        for (int i = 2; i <= num; i++) if (isPrime[i]) count++;
        return count;
    }
public:
    int numPrimeArrangements(int n) {
        int primes = countPrimes(n);
        int nonPrimes = n - primes;
        long long MOD = 1e9 + 7;
        long long ans = 1;
        for (int i = 1; i <= primes; ++i) ans = (ans * i) % MOD;
        for (int i = 1; i <= nonPrimes; ++i) ans = (ans * i) % MOD;
        return ans;
    }
};`,
      java: `class Solution {
    private int countPrimes(int num) {
        if (num < 2) return 0;
        boolean[] isPrime = new boolean[num + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = false; isPrime[1] = false;
        for (int p = 2; p * p <= num; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i <= num; i += p) isPrime[i] = false;
            }
        }
        int count = 0;
        for (int i = 2; i <= num; i++) if (isPrime[i]) count++;
        return count;
    }
    public int numPrimeArrangements(int n) {
        int primes = countPrimes(n);
        int nonPrimes = n - primes;
        long MOD = 1000000007;
        long ans = 1;
        for (int i = 1; i <= primes; i++) ans = (ans * i) % MOD;
        for (int i = 1; i <= nonPrimes; i++) ans = (ans * i) % MOD;
        return (int) ans;
    }
}`,
      explanation: 'Count the number of prime indices (P) and composite/non-prime indices (C) from 1 to n. The number of valid permutations is P! * C!, since we can permute primes on prime indices and non-primes on non-prime indices. Apply modulo 10^9 + 7. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1184',
    slug: 'distance-between-bus-stops',
    title: 'Distance Between Bus Stops',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'A bus has `n` stops numbered from `0` to `n - 1`. You are given `distance` array and bounds `start` and `destination`. Return the shortest distance between them.',
    constraints: ['1 <= n <= 10^4', 'distance.length == n', '0 <= distance[i] <= 100', '0 <= start, destination < n'],
    solutions: {
      python: `class Solution:
    def distanceBetweenBusStops(self, distance: List[int], start: int, destination: int) -> int:
        if start > destination:
            start, destination = destination, start
        # Clockwise distance
        d1 = sum(distance[start:destination])
        # Counter-clockwise distance
        d2 = sum(distance) - d1
        return min(d1, d2)`,
      cpp: `class Solution {
public:
    int distanceBetweenBusStops(vector<int>& distance, int start, int destination) {
        if (start > destination) swap(start, destination);
        int d1 = 0, total = 0;
        for (int i = 0; i < distance.size(); ++i) {
            if (i >= start && i < destination) d1 += distance[i];
            total += distance[i];
        }
        return min(d1, total - d1);
    }
};`,
      java: `class Solution {
    public int distanceBetweenBusStops(int[] distance, int start, int destination) {
        if (start > destination) {
            int t = start; start = destination; destination = t;
        }
        int d1 = 0, total = 0;
        for (int i = 0; i < distance.length; i++) {
            if (i >= start && i < destination) d1 += distance[i];
            total += distance[i];
        }
        return Math.min(d1, total - d1);
    }
}`,
      explanation: 'In a circular layout, the distance between two stops can be traversed in either clockwise or counter-clockwise directions. Find the clockwise distance (sum from start to destination), and the counter-clockwise distance (total sum minus clockwise distance). Return the minimum. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1185',
    slug: 'day-of-the-week',
    title: 'Day of the Week',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given a date, return the corresponding day of the week for that date.',
    constraints: ['The given date is valid and is between the years 1971 and 2100.'],
    solutions: {
      python: `class Solution:
    def dayOfTheWeek(self, day: int, month: int, year: int) -> str:
        # Zeller's congruence or counting days since 1971-01-01 (Friday)
        days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
        months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        
        total_days = 0
        # Add days for years
        for y in range(1971, year):
            total_days += 366 if (y % 4 == 0 and y % 100 != 0) or (y % 400 == 0) else 365
            
        # Add days for months in current year
        for m in range(month - 1):
            if m == 1 and ((year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)):
                total_days += 29
            else:
                total_days += months[m]
                
        total_days += day - 1
        return days[total_days % 7]`,
      cpp: `class Solution {
public:
    string dayOfTheWeek(int day, int month, int year) {
        vector<string> days = {"Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"};
        vector<int> months = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        int totalDays = 0;
        for (int y = 1971; y < year; ++y) {
            totalDays += ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) ? 366 : 365;
        }
        for (int m = 0; m < month - 1; ++m) {
            if (m == 1 && ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))) {
                totalDays += 29;
            } else {
                totalDays += months[m];
            }
        }
        totalDays += day - 1;
        return days[totalDays % 7];
    }
};`,
      java: `class Solution {
    public String dayOfTheWeek(int day, int month, int year) {
        String[] days = {"Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"};
        int[] months = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        int totalDays = 0;
        for (int y = 1971; y < year; y++) {
            totalDays += ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) ? 366 : 365;
        }
        for (int m = 0; m < month - 1; m++) {
            if (m == 1 && ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))) {
                totalDays += 29;
            } else {
                totalDays += months[m];
            }
        }
        totalDays += day - 1;
        return days[totalDays % 7];
    }
}`,
      explanation: 'Calculate the total number of days elapsed since a known anchor date (1971-01-01, which was a Friday). Account for leap years. Modulo by 7 yields the day of the week index. Time complexity: O(Y - 1971), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1189',
    slug: 'maximum-number-of-balloons',
    title: 'Maximum Number of Balloons',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a string `text`, you want to use the characters of `text` to form as many instances of the word `"balloon"` as possible.',
    constraints: ['1 <= text.length <= 10^4', 'text consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def maxNumberOfBalloons(self, text: str) -> int:
        counts = {}
        for c in text: counts[c] = counts.get(c, 0) + 1
        return min(
            counts.get('b', 0),
            counts.get('a', 0),
            counts.get('l', 0) // 2,
            counts.get('o', 0) // 2,
            counts.get('n', 0)
        )`,
      cpp: `class Solution {
public:
    int maxNumberOfBalloons(string text) {
        vector<int> counts(26, 0);
        for (char c : text) counts[c - 'a']++;
        return min({
            counts['b' - 'a'],
            counts['a' - 'a'],
            counts['l' - 'a'] / 2,
            counts['o' - 'a'] / 2,
            counts['n' - 'a']
        });
    }
};`,
      java: `class Solution {
    public int maxNumberOfBalloons(String text) {
        int[] counts = new int[26];
        for (char c : text.toCharArray()) counts[c - 'a']++;
        return Math.min(
            Math.min(counts['b' - 'a'], counts['a' - 'a']),
            Math.min(
                Math.min(counts['l' - 'a'] / 2, counts['o' - 'a'] / 2),
                counts['n' - 'a']
            )
        );
    }
}`,
      explanation: 'The word "balloon" requires: 1 \'b\', 1 \'a\', 2 \'l\'s, 2 \'o\'s, and 1 \'n\'. Calculate letter frequencies in text. The maximum number of complete words formed is the minimum of count(b), count(a), count(l)/2, count(o)/2, and count(n). Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1200',
    slug: 'minimum-absolute-difference',
    title: 'Minimum Absolute Difference',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of distinct integers `arr`, find all pairs of elements with the minimum absolute difference in ascending order.',
    constraints: ['2 <= arr.length <= 10^5', '-10^6 <= arr[i] <= 10^6'],
    solutions: {
      python: `class Solution:
    def minimumAbsDifference(self, arr: List[int]) -> List[List[int]]:
        arr.sort()
        min_diff = float('inf')
        for i in range(len(arr) - 1):
            min_diff = min(min_diff, arr[i + 1] - arr[i])
        res = []
        for i in range(len(arr) - 1):
            if arr[i + 1] - arr[i] == min_diff:
                res.append([arr[i], arr[i + 1]])
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> minimumAbsDifference(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int minDiff = INT_MAX;
        for (int i = 0; i < arr.size() - 1; ++i) {
            minDiff = min(minDiff, arr[i+1] - arr[i]);
        }
        vector<vector<int>> res;
        for (int i = 0; i < arr.size() - 1; ++i) {
            if (arr[i+1] - arr[i] == minDiff) {
                res.push_back({arr[i], arr[i+1]});
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> minimumAbsDifference(int[] arr) {
        Arrays.sort(arr);
        int minDiff = Integer.MAX_VALUE;
        for (int i = 0; i < arr.length - 1; i++) {
            minDiff = Math.min(minDiff, arr[i + 1] - arr[i]);
        }
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < arr.length - 1; i++) {
            if (arr[i + 1] - arr[i] == minDiff) {
                res.add(Arrays.asList(arr[i], arr[i + 1]));
            }
        }
        return res;
    }
}`,
      explanation: 'Sort the array. The minimum absolute difference must occur between adjacent elements in the sorted array. Find this minimum difference first, then collect all adjacent pairs that match it. Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-1207',
    slug: 'unique-number-of-occurrences',
    title: 'Unique Number of Occurrences',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of integers `arr`, return `true` if the number of occurrences of each value in the array is unique, or `false` otherwise.',
    constraints: ['1 <= arr.length <= 1000', '-1000 <= arr[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        counts = {}
        for x in arr: counts[x] = counts.get(x, 0) + 1
        freqs = list(counts.values())
        return len(freqs) == len(set(freqs))`,
      cpp: `class Solution {
public:
    bool uniqueOccurrences(vector<int>& arr) {
        unordered_map<int, int> counts;
        for (int x : arr) counts[x]++;
        unordered_set<int> freqs;
        for (const auto& [val, cnt] : counts) {
            if (freqs.count(cnt)) return false;
            freqs.insert(cnt);
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean uniqueOccurrences(int[] arr) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : arr) counts.put(x, counts.getOrDefault(x, 0) + 1);
        Set<Integer> freqs = new HashSet<>();
        for (int cnt : counts.values()) {
            if (!freqs.add(cnt)) return false;
        }
        return true;
    }
}`,
      explanation: 'Count occurrences of each unique element using a hash map. Insert these frequencies into a hash set. If any frequency insertion fails (or length of set differs from map size), frequencies are not unique. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-1217',
    slug: 'minimum-cost-to-move-chips-to-the-same-position',
    title: 'Minimum Cost to Move Chips to The Same Position',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'We have `n` chips. Return the minimum cost needed to move all the chips to the same position.',
    constraints: ['1 <= position.length <= 100', '1 <= position[i] <= 10^9'],
    solutions: {
      python: `class Solution:
    def minCostToMoveChips(self, position: List[int]) -> int:
        # Cost to move even to even is 0, odd to odd is 0. Cost to cross parity is 1.
        even = sum(1 for p in position if p % 2 == 0)
        odd = len(position) - even
        return min(even, odd)`,
      cpp: `class Solution {
public:
    int minCostToMoveChips(vector<int>& position) {
        int even = 0, odd = 0;
        for (int p : position) {
            if (p % 2 == 0) even++;
            else odd++;
        }
        return min(even, odd);
    }
};`,
      java: `class Solution {
    public int minCostToMoveChips(int[] position) {
        int even = 0, odd = 0;
        for (int p : position) {
            if (p % 2 == 0) even++;
            else odd++;
        }
        return Math.min(even, odd);
    }
}`,
      explanation: 'Moving a chip by 2 units costs 0. This means all chips at even positions can be gathered at 0 for free, and all chips at odd positions can be gathered at 1 for free. Moving all odd-positioned chips to 0 (or vice versa) costs 1 per chip. Thus, the answer is the minimum of even and odd counts. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1221',
    slug: 'split-a-string-in-balanced-strings',
    title: 'Split a String in Balanced Strings',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Balanced strings are those that have an equal quantity of \'L\' and \'R\' characters. Return the maximum number of balanced strings you can split s into.',
    constraints: ['2 <= s.length <= 1000', 's[i] is either \'L\' or \'R\'.', 's is a balanced string.'],
    solutions: {
      python: `class Solution:
    def balancedStringSplit(self, s: str) -> int:
        ans = count = 0
        for c in s:
            count += 1 if c == 'L' else -1
            if count == 0:
                ans += 1
        return ans`,
      cpp: `class Solution {
public:
    int balancedStringSplit(string s) {
        int ans = 0, count = 0;
        for (char c : s) {
            count += (c == 'L') ? 1 : -1;
            if (count == 0) ans++;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int balancedStringSplit(String s) {
        int ans = 0, count = 0;
        for (char c : s.toCharArray()) {
            count += (c == 'L') ? 1 : -1;
            if (count == 0) ans++;
        }
        return ans;
    }
}`,
      explanation: 'Use a greedy traversal. Track the balance using a counter (+1 for \'L\', -1 for \'R\'). Every time the counter returns to 0, it indicates we have found a balanced partition. Increment the answer. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1232',
    slug: 'check-if-it-is-a-straight-line',
    title: 'Check If It Is a Straight Line',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are given an array `coordinates`, where `coordinates[i] = [x, y]` represents the coordinate of a point. Check if these points make a straight line in the 2D plane.',
    constraints: ['2 <= coordinates.length <= 1000', 'coordinates[i].length == 2', '-10^4 <= coordinates[i][j] <= 10^4', 'coordinates contains no duplicate points.'],
    solutions: {
      python: `class Solution:
    def checkStraightLine(self, coordinates: List[List[int]]) -> bool:
        # Check slopes: (y1 - y0)/(x1 - x0) == (yi - y0)/(xi - x0)
        # Avoid division: (y1 - y0)*(xi - x0) == (yi - y0)*(x1 - x0)
        x0, y0 = coordinates[0]
        x1, y1 = coordinates[1]
        dx, dy = x1 - x0, y1 - y0
        for i in range(2, len(coordinates)):
            xi, yi = coordinates[i]
            if dx * (yi - y0) != dy * (xi - x0):
                return False
        return True`,
      cpp: `class Solution {
public:
    bool checkStraightLine(vector<vector<int>>& coordinates) {
        int x0 = coordinates[0][0], y0 = coordinates[0][1];
        int x1 = coordinates[1][0], y1 = coordinates[1][1];
        int dx = x1 - x0, dy = y1 - y0;
        for (int i = 2; i < coordinates.size(); ++i) {
            int xi = coordinates[i][0], yi = coordinates[i][1];
            if (dx * (yi - y0) != dy * (xi - x0)) return false;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean checkStraightLine(int[][] coordinates) {
        int x0 = coordinates[0][0], y0 = coordinates[0][1];
        int x1 = coordinates[1][0], y1 = coordinates[1][1];
        int dx = x1 - x0, dy = y1 - y0;
        for (int i = 2; i < coordinates.length; i++) {
            int xi = coordinates[i][0], yi = coordinates[i][1];
            if (dx * (yi - y0) != dy * (xi - x0)) return false;
        }
        return true;
    }
}`,
      explanation: 'The slope between the first two points must equal the slope between the first point and any other point i. Check this using multiplication to avoid division by zero: dx * (yi - y0) == dy * (xi - x0). Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1252',
    slug: 'cells-with-odd-values-in-a-matrix',
    title: 'Cells with Odd Values in a Matrix',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'There is an `m x n` matrix initialized to all `0`\'s. There is also a 2D array `indices` where each `indices[i] = [r_i, c_i]` represents a 0-indexed location to perform operations. Return the number of odd-valued cells.',
    constraints: ['1 <= m, n <= 50', '1 <= indices.length <= 100', '0 <= r_i < m', '0 <= c_i < n'],
    solutions: {
      python: `class Solution:
    def oddCells(self, m: int, n: int, indices: List[List[int]]) -> int:
        rows = [0] * m
        cols = [0] * n
        for r, c in indices:
            rows[r] ^= 1
            cols[c] ^= 1
        # Count odd cells: row ^ col is odd (1)
        odd_r = sum(rows)
        odd_c = sum(cols)
        return odd_r * (n - odd_c) + (m - odd_r) * odd_c`,
      cpp: `class Solution {
public:
    int oddCells(int m, int n, vector<vector<int>>& indices) {
        vector<int> rows(m, 0), cols(n, 0);
        for (const auto& ind : indices) {
            rows[ind[0]] ^= 1;
            cols[ind[1]] ^= 1;
        }
        int oddR = 0, oddC = 0;
        for (int x : rows) if (x) oddR++;
        for (int x : cols) if (x) oddC++;
        return oddR * (n - oddC) + (m - oddR) * oddC;
    }
};`,
      java: `class Solution {
    public int oddCells(int m, int n, int[][] indices) {
        int[] rows = new int[m];
        int[] cols = new int[n];
        for (int[] ind : indices) {
            rows[ind[0]] ^= 1;
            cols[ind[1]] ^= 1;
        }
        int oddR = 0, oddC = 0;
        for (int x : rows) if (x == 1) oddR++;
        for (int x : cols) if (x == 1) oddC++;
        return oddR * (n - oddC) + (m - oddR) * oddC;
    }
}`,
      explanation: 'Instead of incrementing the full matrix, track the parities of row and column increments using boolean/bit arrays. A cell (r, c) ends up odd if and only if row parity differs from col parity. Calculate count as: odd_rows * (n - odd_cols) + (m - odd_rows) * odd_cols. Time complexity: O(L + m + n) where L is indices count, Space complexity: O(m + n).'
    }
  },
  {
    id: 'lc-1260',
    slug: 'shift-2d-grid',
    title: 'Shift 2D Grid',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a 2D `grid` of size `m x n` and an integer `k`, shift the grid `k` times.',
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 50', '-1000 <= grid[i][j] <= 1000', '0 <= k <= 100'],
    solutions: {
      python: `class Solution:
    def shiftGrid(self, grid: List[List[int]], k: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])
        total = m * n
        k = k % total
        res = [[0] * n for _ in range(m)]
        for i in range(total):
            new_idx = (i + k) % total
            res[new_idx // n][new_idx % n] = grid[i // n][i % n]
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> shiftGrid(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();
        int total = m * n;
        k = k % total;
        vector<vector<int>> res(m, vector<int>(n, 0));
        for (int i = 0; i < total; ++i) {
            int newIdx = (i + k) % total;
            res[newIdx / n][newIdx % n] = grid[i / n][i % n];
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> shiftGrid(int[][] grid, int k) {
        int m = grid.length, n = grid[0].length;
        int total = m * n;
        k = k % total;
        int[][] temp = new int[m][n];
        for (int i = 0; i < total; i++) {
            int newIdx = (i + k) % total;
            temp[newIdx / n][newIdx % n] = grid[i / n][i % n];
        }
        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < m; r++) {
            List<Integer> row = new ArrayList<>();
            for (int c = 0; c < n; c++) row.add(temp[r][c]);
            res.add(row);
        }
        return res;
    }
}`,
      explanation: 'Flatten the 2D grid conceptually into a 1D array of size m * n. Shift all elements by k places modulo (m * n). Convert new indices back to 2D coordinates (new_idx / n, new_idx % n) and place them. Time complexity: O(m * n), Space complexity: O(m * n).'
    }
  },
  {
    id: 'lc-1266',
    slug: 'minimum-time-visiting-all-points',
    title: 'Minimum Time Visiting All Points',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an array `points` where `points[i] = [x_i, y_i]` represents a point on the X-Y plane, return the minimum time in seconds to visit all points in the order they appear.',
    constraints: ['points.length == n', '1 <= n <= 100', 'points[i].length == 2', '-1000 <= x_i, y_i <= 1000'],
    solutions: {
      python: `class Solution:
    def minTimeToVisitAllPoints(self, points: List[List[int]]) -> int:
        ans = 0
        for i in range(len(points) - 1):
            x1, y1 = points[i]
            x2, y2 = points[i + 1]
            # Chebyshev distance
            ans += max(abs(x2 - x1), abs(y2 - y1))
        return ans`,
      cpp: `class Solution {
public:
    int minTimeToVisitAllPoints(vector<vector<int>>& points) {
        int ans = 0;
        for (int i = 0; i < points.size() - 1; ++i) {
            ans += max(abs(points[i+1][0] - points[i][0]), abs(points[i+1][1] - points[i][1]));
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int minTimeToVisitAllPoints(int[][] points) {
        int ans = 0;
        for (int i = 0; i < points.length - 1; i++) {
            ans += Math.max(Math.abs(points[i+1][0] - points[i][0]), Math.abs(points[i+1][1] - points[i][1]));
        }
        return ans;
    }
}`,
      explanation: 'Since moving diagonally (dx = 1, dy = 1) takes 1 second, the distance between any two points is the Chebyshev distance: max(abs(dx), abs(dy)). Accumulate distances between successive points. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-1275',
    slug: 'find-winner-on-a-tic-tac-toe-game',
    title: 'Find Winner on a Tic Tac Toe Game',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Find the winner of Tic-Tac-Toe given the sequence of moves.',
    constraints: ['1 <= moves.length <= 9', 'moves[i].length == 2', '0 <= r_i, c_i <= 2', 'All moves are valid.'],
    solutions: {
      python: `class Solution:
    def tictactoe(self, moves: List[List[int]]) -> str:
        # Track score grid for players:
        # A (+1), B (-1)
        rows, cols = [0] * 3, [0] * 3
        diag = anti_diag = 0
        for i, (r, c) in enumerate(moves):
            val = 1 if i % 2 == 0 else -1
            rows[r] += val
            cols[c] += val
            if r == c: diag += val
            if r + c == 2: anti_diag += val
            if abs(rows[r]) == 3 or abs(cols[c]) == 3 or abs(diag) == 3 or abs(anti_diag) == 3:
                return "A" if val == 1 else "B"
        return "Draw" if len(moves) == 9 else "Pending"`,
      cpp: `class Solution {
public:
    string tictactoe(vector<vector<int>>& moves) {
        vector<int> rows(3, 0), cols(3, 0);
        int diag = 0, antiDiag = 0;
        for (int i = 0; i < moves.size(); ++i) {
            int r = moves[i][0], c = moves[i][1];
            int val = (i % 2 == 0) ? 1 : -1;
            rows[r] += val;
            cols[c] += val;
            if (r == c) diag += val;
            if (r + c == 2) antiDiag += val;
            if (abs(rows[r]) == 3 || abs(cols[c]) == 3 || abs(diag) == 3 || abs(antiDiag) == 3) {
                return (val == 1) ? "A" : "B";
            }
        }
        return (moves.size() == 9) ? "Draw" : "Pending";
    }
};`,
      java: `class Solution {
    public String tictactoe(int[][] moves) {
        int[] rows = new int[3];
        int[] cols = new int[3];
        int diag = 0, antiDiag = 0;
        for (int i = 0; i < moves.length; i++) {
            int r = moves[i][0], c = moves[i][1];
            int val = (i % 2 == 0) ? 1 : -1;
            rows[r] += val;
            cols[c] += val;
            if (r == c) diag += val;
            if (r + c == 2) antiDiag += val;
            if (Math.abs(rows[r]) == 3 || Math.abs(cols[c]) == 3 || Math.abs(diag) == 3 || Math.abs(antiDiag) == 3) {
                return (val == 1) ? "A" : "B";
            }
        }
        return (moves.length == 9) ? "Draw" : "Pending";
    }
}`,
      explanation: 'Use counter arrays rows and cols, and variables diag and antiDiag. Player A increments values (+1) and Player B decrements (-1). Check if any count absolute value hits 3 to declare a winner. Time complexity: O(len(moves)), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1703A',
    slug: 'cf-1703a',
    title: 'YES or YES?',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'String',
    description: 'You are given a string `s` of length 3. Determine if it is equal to "YES" in any case.',
    constraints: ['1 <= t <= 1000', '|s| == 3'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    s = input().upper()
    print("YES" if s == "YES" else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        string s; cin >> s;
        for (char& c : s) c = toupper(c);
        cout << (s == "YES" ? "YES\\n" : "NO\\n");
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            String s = sc.next().toUpperCase();
            System.out.println(s.equals("YES") ? "YES" : "NO");
        }
    }
}`,
      explanation: 'Convert the input string to uppercase, and check if it is equal to "YES". Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1722A',
    slug: 'cf-1722a',
    title: 'Spell Check',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'String',
    description: 'Timur loves his name. He has a string of length `n`. Check if the string is a permutation of "Timur".',
    constraints: ['1 <= t <= 1000', '1 <= n <= 100'],
    solutions: {
      python: `t = int(input())
target = sorted("Timur")
for _ in range(t):
    n = int(input())
    s = input()
    print("YES" if sorted(s) == target else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    string target = "Timur";
    sort(target.begin(), target.end());
    while (t--) {
        int n; cin >> n;
        string s; cin >> s;
        sort(s.begin(), s.end());
        cout << (s == target ? "YES\\n" : "NO\\n");
    }
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        char[] targetChars = "Timur".toCharArray();
        Arrays.sort(targetChars);
        String target = new String(targetChars);
        while (t-- > 0) {
            int n = sc.nextInt();
            String s = sc.next();
            char[] sChars = s.toCharArray();
            Arrays.sort(sChars);
            String sortedS = new String(sChars);
            System.out.println(sortedS.equals(target) ? "YES" : "NO");
        }
    }
}`,
      explanation: 'A string is a permutation of "Timur" if and only if it has a length of 5 and sorting its characters yields the sorted string "Timur" ("Timru"). Time complexity: O(n log n) per testcase, Space complexity: O(n).'
    }
  },
  {
    id: 'cf-1742A',
    slug: 'cf-1742a',
    title: 'Sum',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Conditional',
    description: 'Given three integers `a`, `b`, `c`. Determine if one of them is the sum of the other two.',
    constraints: ['1 <= t <= 9261', '0 <= a, b, c <= 20'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    a, b, c = map(int, input().split())
    if a + b == c or a + c == b or b + c == a:
        print("YES")
    else:
        print("NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int a, b, c; cin >> a >> b >> c;
        if (a + b == c || a + c == b || b + c == a) cout << "YES\\n";
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
            if (a + b == c || a + c == b || b + c == a) System.out.println("YES");
            else System.out.println("NO");
        }
    }
}`,
      explanation: 'Check all three possible sum conditions: a + b == c, a + c == b, and b + c == a. Print YES if any condition is met, otherwise NO. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1791A',
    slug: 'cf-1791a',
    title: 'Codeforces Characters',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'String',
    description: 'Given a character `c`, check if it appears in the word `"codeforces"`.',
    constraints: ['1 <= t <= 26', 'c is a lowercase English letter.'],
    solutions: {
      python: `t = int(input())
target = set("codeforces")
for _ in range(t):
    c = input()
    print("YES" if c in target else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    string target = "codeforces";
    while (t--) {
        char c; cin >> c;
        if (target.find(c) != string::npos) cout << "YES\\n";
        else cout << "NO\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        String target = "codeforces";
        while (t-- > 0) {
            String s = sc.next();
            if (target.contains(s)) System.out.println("YES");
            else System.out.println("NO");
        }
    }
}`,
      explanation: 'Create a set containing the characters of "codeforces", and check if the queried character exists in the set. Time complexity: O(1) per query, Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1807A',
    slug: 'cf-1807a',
    title: 'Plus or Minus',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Conditional',
    description: 'Given three integers `a`, `b`, `c`. Determine if `a + b = c` (print `+`) or `a - b = c` (print `-`).',
    constraints: ['1 <= t <= 162', '1 <= a, b <= 9', '-8 <= c <= 18'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    a, b, c = map(int, input().split())
    print("+" if a + b == c else "-")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int a, b, c; cin >> a >> b >> c;
        if (a + b == c) cout << "+\\n";
        else cout << "-\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
            if (a + b == c) System.out.println("+");
            else System.out.println("-");
        }
    }
}`,
      explanation: 'Evaluate a + b == c. If true, print "+", otherwise print "-". Time complexity: O(1), Space complexity: O(1).'
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
