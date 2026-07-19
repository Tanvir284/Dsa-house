const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const NEW_61_PROBLEMS = [
  // --- LeetCode Easy ---
  {
    id: 'lc-112',
    slug: 'path-sum',
    title: 'Path Sum',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals `targetSum`.',
    constraints: ['The number of nodes in the tree is in the range [0, 5000].', '-1000 <= Node.val <= 1000', '-1000 <= targetSum <= 1000'],
    solutions: {
      python: `class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root:
            return False
        if not root.left and not root.right:
            return root.val == targetSum
        return self.hasPathSum(root.left, targetSum - root.val) or self.hasPathSum(root.right, targetSum - root.val)`,
      cpp: `class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        if (!root->left && !root->right) return root->val == targetSum;
        return hasPathSum(root->left, targetSum - root->val) || hasPathSum(root->right, targetSum - root->val);
    }
};`,
      java: `class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return root.val == targetSum;
        return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
    }
}`,
      explanation: 'Use DFS to traverse the tree. At each node, subtract its value from targetSum and recursively check left and right subtrees. Return true if a leaf is reached with value equal to remaining targetSum. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-225',
    slug: 'implement-stack-using-queues',
    title: 'Implement Stack using Queues',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all normal stack functions (`push`, `top`, `pop`, and `empty`).',
    constraints: ['1 <= x <= 9', 'At most 100 calls will be made to push, pop, top, and empty.', 'All the calls to pop and top are valid.'],
    solutions: {
      python: `from collections import deque
class MyStack:
    def __init__(self):
        self.q = deque()
    def push(self, x: int) -> None:
        self.q.append(x)
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())
    def pop(self) -> int:
        return self.q.popleft()
    def top(self) -> int:
        return self.q[0]
    def empty(self) -> bool:
        return not self.q`,
      cpp: `class MyStack {
    queue<int> q;
public:
    void push(int x) {
        q.push(x);
        for (int i = 0; i < q.size() - 1; ++i) {
            q.push(q.front());
            q.pop();
        }
    }
    int pop() {
        int val = q.front(); q.pop();
        return val;
    }
    int top() { return q.front(); }
    bool empty() { return q.empty(); }
};`,
      java: `class MyStack {
    Queue<Integer> q = new LinkedList<>();
    public void push(int x) {
        q.add(x);
        for (int i = 0; i < q.size() - 1; i++) {
            q.add(q.poll());
        }
    }
    public int pop() { return q.poll(); }
    public int top() { return q.peek(); }
    public boolean empty() { return q.isEmpty(); }
}`,
      explanation: 'Use a single queue to implement the LIFO behavior. On each push, add the new element to the queue and rotate all previous elements around it. Time complexity: push O(n), others O(1). Space complexity: O(n).'
    }
  },
  {
    id: 'lc-232',
    slug: 'implement-queue-using-stacks',
    title: 'Implement Queue using Stacks',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Queue',
    description: 'Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all normal queue functions (`push`, `peek`, `pop`, and `empty`).',
    constraints: ['1 <= x <= 9', 'At most 100 calls will be made to push, pop, peek, and empty.', 'All the calls to pop and peek are valid.'],
    solutions: {
      python: `class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []
    def push(self, x: int) -> None:
        self.s1.append(x)
    def pop(self) -> int:
        self.peek()
        return self.s2.pop()
    def peek(self) -> int:
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]
    def empty(self) -> bool:
        return not self.s1 and not self.s2`,
      cpp: `class MyQueue {
    stack<int> s1, s2;
public:
    void push(int x) { s1.push(x); }
    int pop() {
        peek();
        int val = s2.top(); s2.pop();
        return val;
    }
    int peek() {
        if (s2.empty()) {
            while (!s1.empty()) { s2.push(s1.top()); s1.pop(); }
        }
        return s2.top();
    }
    bool empty() { return s1.empty() && s2.empty(); }
};`,
      java: `class MyQueue {
    Stack<Integer> s1 = new Stack<>();
    Stack<Integer> s2 = new Stack<>();
    public void push(int x) { s1.push(x); }
    public int pop() {
        peek();
        return s2.pop();
    }
    public int peek() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) s2.push(s1.pop());
        }
        return s2.peek();
    }
    public boolean empty() { return s1.isEmpty() && s2.isEmpty(); }
}`,
      explanation: 'Use two stacks (s1 for incoming, s2 for outgoing). On pop/peek, if s2 is empty, transfer all elements from s1 to s2, reversing their order to achieve FIFO. Amortized time complexity: O(1) per operation. Space complexity: O(n).'
    }
  },
  {
    id: 'lc-350',
    slug: 'intersection-of-two-arrays-ii',
    title: 'Intersection of Two Arrays II',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in **any order**.',
    constraints: ['1 <= nums1.length, nums2.length <= 1000', '0 <= nums1[i], nums2[i] <= 1000'],
    solutions: {
      python: `from collections import Counter
class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        c1 = Counter(nums1)
        res = []
        for n in nums2:
            if c1[n] > 0:
                res.append(n)
                c1[n] -= 1
        return res`,
      cpp: `class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> counts;
        for (int n : nums1) counts[n]++;
        vector<int> res;
        for (int n : nums2) {
            if (counts[n] > 0) {
                res.push_back(n);
                counts[n]--;
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int n : nums1) map.put(n, map.getOrDefault(n, 0) + 1);
        List<Integer> list = new ArrayList<>();
        for (int n : nums2) {
            if (map.containsKey(n) && map.get(n) > 0) {
                list.add(n);
                map.put(n, map.get(n) - 1);
            }
        }
        int[] res = new int[list.size()];
        for (int i = 0; i < list.size(); i++) res[i] = list.get(i);
        return res;
    }
}`,
      explanation: 'Use a hash map to count occurrences of each element in the first array. Then iterate through the second array and match/decrement counts. Time complexity: O(n + m), Space complexity: O(min(n, m)).'
    }
  },
  {
    id: 'lc-387',
    slug: 'first-unique-character-in-a-string',
    title: 'First Unique Character in a String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.',
    constraints: ['1 <= s.length <= 10^5', 's consists of only lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def firstUniqChar(self, s: str) -> int:
        counts = {}
        for c in s:
            counts[c] = counts.get(c, 0) + 1
        for i, c in enumerate(s):
            if counts[c] == 1:
                return i
        return -1`,
      cpp: `class Solution {
public:
    int firstUniqChar(string s) {
        int counts[26] = {0};
        for (char c : s) counts[c - 'a']++;
        for (int i = 0; i < s.size(); ++i) {
            if (counts[s[i] - 'a'] == 1) return i;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int firstUniqChar(String s) {
        int[] counts = new int[26];
        for (char c : s.toCharArray()) counts[c - 'a']++;
        for (int i = 0; i < s.length(); i++) {
            if (counts[s.charAt(i) - 'a'] == 1) return i;
        }
        return -1;
    }
}`,
      explanation: 'Store character counts in a hash map or frequency array of size 26. Then perform a second pass to find the first character with a count of 1. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-509',
    slug: 'fibonacci-number',
    title: 'Fibonacci Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'The **Fibonacci numbers**, commonly denoted `F(n)` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from 0 and 1.',
    constraints: ['0 <= n <= 30'],
    solutions: {
      python: `class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b`,
      cpp: `class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int t = a + b;
            a = b;
            b = t;
        }
        return b;
    }
};`,
      java: `class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int t = a + b;
            a = b;
            b = t;
        }
        return b;
    }
}`,
      explanation: 'Use dynamic programming with space optimization. Loop from 2 to n, maintaining the last two Fibonacci values in variables a and b. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-605',
    slug: 'can-place-flowers',
    title: 'Can Place Flowers',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.\n\nGiven an integer array `flowerbed` containing `0`s and `1`s, where `0` means empty and `1` means not empty, and an integer `n`, return `true` if `n` new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and `false` otherwise.',
    constraints: ['1 <= flowerbed.length <= 2 * 10^4', 'flowerbed[i] is 0 or 1.', 'There are no two adjacent flowers in flowerbed.', '0 <= n <= flowerbed.length'],
    solutions: {
      python: `class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        count = 0
        for i in range(len(flowerbed)):
            if flowerbed[i] == 0:
                left_empty = (i == 0) or (flowerbed[i - 1] == 0)
                right_empty = (i == len(flowerbed) - 1) or (flowerbed[i + 1] == 0)
                if left_empty and right_empty:
                    flowerbed[i] = 1
                    count += 1
                    if count >= n:
                        return True
        return count >= n`,
      cpp: `class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        int count = 0;
        for (int i = 0; i < flowerbed.size(); ++i) {
            if (flowerbed[i] == 0) {
                bool left = (i == 0 || flowerbed[i - 1] == 0);
                bool right = (i == flowerbed.size() - 1 || flowerbed[i + 1] == 0);
                if (left && right) {
                    flowerbed[i] = 1;
                    count++;
                    if (count >= n) return true;
                }
            }
        }
        return count >= n;
    }
};`,
      java: `class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int count = 0;
        for (int i = 0; i < flowerbed.length; i++) {
            if (flowerbed[i] == 0) {
                boolean left = (i == 0 || flowerbed[i - 1] == 0);
                boolean right = (i == flowerbed.length - 1 || flowerbed[i + 1] == 0);
                if (left && right) {
                    flowerbed[i] = 1;
                    count++;
                    if (count >= n) return true;
                }
            }
        }
        return count >= n;
    }
}`,
      explanation: 'Greedy approach: iterate through the flowerbed and plant a flower at plot i if it and both its adjacent plots are empty. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-700',
    slug: 'search-in-a-binary-search-tree',
    title: 'Search in a Binary Search Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'You are given the `root` of a binary search tree (BST) and an integer `val`.\n\nFind the node in the BST that the node\'s value equals `val` and return the subtree rooted with that node. If such a node does not exist, return `null`.',
    constraints: ['The number of nodes in the tree is in the range [1, 5000].', '1 <= Node.val <= 10^7', 'root is a binary search tree.', '1 <= val <= 10^7'],
    solutions: {
      python: `class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        curr = root
        while curr:
            if curr.val == val:
                return curr
            elif curr.val < val:
                curr = curr.right
            else:
                curr = curr.left
        return None`,
      cpp: `class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        TreeNode* curr = root;
        while (curr) {
            if (curr->val == val) return curr;
            curr = (curr->val < val) ? curr->right : curr->left;
        }
        return nullptr;
    }
};`,
      java: `class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        TreeNode curr = root;
        while (curr != null) {
            if (curr.val == val) return curr;
            curr = (curr.val < val) ? curr.right : curr.left;
        }
        return null;
    }
}`,
      explanation: 'Use the properties of BST: if the current node value is smaller than val, search the right subtree; if larger, search the left subtree. Time complexity: O(h) where h is tree height, Space complexity: O(1) iterative.'
    }
  },
  {
    id: 'lc-724',
    slug: 'find-pivot-index',
    title: 'Find Pivot Index',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of integers `nums`, calculate the **pivot index** of this array.\n\nThe **pivot index** is the index where the sum of all the numbers **strictly to the left** of the index is equal to the sum of all the numbers **strictly to the right** of the index.',
    constraints: ['1 <= nums.length <= 10^4', '-1000 <= nums[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        total = sum(nums)
        left_sum = 0
        for i, n in enumerate(nums):
            if left_sum == total - left_sum - n:
                return i
            left_sum += n
        return -1`,
      cpp: `class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int total = 0, left_sum = 0;
        for (int n : nums) total += n;
        for (int i = 0; i < nums.size(); ++i) {
            if (left_sum == total - left_sum - nums[i]) return i;
            left_sum += nums[i];
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0, left_sum = 0;
        for (int n : nums) total += n;
        for (int i = 0; i < nums.length; i++) {
            if (left_sum == total - left_sum - nums[i]) return i;
            left_sum += nums[i];
        }
        return -1;
    }
}`,
      explanation: 'Calculate the total sum of the array first. Iterate through the array, maintaining a running prefix sum left_sum. At each index, check if left_sum equals (total_sum - left_sum - nums[i]). Time complexity: O(n), Space complexity: O(1).'
    }
  },

  // --- LeetCode Medium ---
  {
    id: 'lc-692',
    slug: 'top-k-frequent-words',
    title: 'Top K Frequent Words',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Heap (Priority Queue)',
    description: 'Given an array of strings `words` and an integer `k`, return the `k` most frequent strings.\n\nReturn the answer **sorted** by the frequency from highest to lowest. Sort the words with the same frequency by their **lexicographical order**.',
    constraints: ['1 <= words.length <= 500', '1 <= words[i].length <= 10', 'words[i] consists of lowercase English letters.', 'k is in the range [1, number of unique words]'],
    solutions: {
      python: `import heapq
from collections import Counter
class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        counts = Counter(words)
        # Custom comparator via class or negative freq + lexicographical string
        heap = [(-freq, word) for word, freq in counts.items()]
        heapq.heapify(heap)
        return [heapq.heappop(heap)[1] for _ in range(k)]`,
      cpp: `class Solution {
public:
    vector<string> topKFrequent(vector<string>& words, int k) {
        unordered_map<string, int> counts;
        for (const auto& w : words) counts[w]++;
        auto comp = [](const pair<string, int>& a, const pair<string, int>& b) {
            return a.second == b.second ? a.first > b.first : a.second < b.second;
        };
        priority_queue<pair<string, int>, vector<pair<string, int>>, decltype(comp)> pq(comp);
        for (const auto& p : counts) pq.push(p);
        vector<string> res;
        for (int i = 0; i < k; ++i) { res.push_back(pq.top().first); pq.pop(); }
        return res;
    }
};`,
      java: `class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> counts = new HashMap<>();
        for (String w : words) counts.put(w, counts.getOrDefault(w, 0) + 1);
        PriorityQueue<String> pq = new PriorityQueue<>(
            (a, b) -> counts.get(a).equals(counts.get(b)) ? b.compareTo(a) : counts.get(a) - counts.get(b)
        );
        for (String w : counts.keySet()) {
            pq.add(w);
            if (pq.size() > k) pq.poll();
        }
        List<String> res = new ArrayList<>();
        while (!pq.isEmpty()) res.add(0, pq.poll());
        return res;
    }
}`,
      explanation: 'Use a hash map to count the frequencies of all words. Maintain a priority queue (min-heap) of size k with custom sorting: lower frequency at the top, lexicographically larger word at the top for equal frequencies. Time complexity: O(n log k), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-162',
    slug: 'find-peak-element',
    title: 'Find Peak Element',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'A peak element is an element that is strictly greater than its neighbors.\n\nGiven a **0-indexed** integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.\n\nYou must write an algorithm that runs in `O(log n)` time.',
    constraints: ['1 <= nums.length <= 1000', '-2^31 <= nums[i] <= 2^31 - 1', 'nums[i] != nums[i + 1] for all valid i.'],
    solutions: {
      python: `class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        low, high = 0, len(nums) - 1
        while low < high:
            mid = (low + high) // 2
            if nums[mid] < nums[mid + 1]:
                low = mid + 1
            else:
                high = mid
        return low`,
      cpp: `class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int low = 0, high = nums.size() - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] < nums[mid + 1]) low = mid + 1;
            else high = mid;
        }
        return low;
    }
};`,
      java: `class Solution {
    public int findPeakElement(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] < nums[mid + 1]) low = mid + 1;
            else high = mid;
        }
        return low;
    }
}`,
      explanation: 'Use binary search. Compare nums[mid] and nums[mid + 1]. If nums[mid] < nums[mid+1], a peak must lie on the right side of mid; otherwise, a peak lies on the left side (including mid). Time complexity: O(log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-875',
    slug: 'koko-eating-bananas',
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Koko loves to eat bananas. There are `n` piles of bananas, the `i`-th pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.\n\nKoko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from it. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.\n\nReturn the minimum integer `k` such that she can eat all the bananas within `h` hours.',
    constraints: ['1 <= piles.length <= 10^4', 'piles.length <= h <= 10^9', '1 <= piles[i] <= 10^9'],
    solutions: {
      python: `import math
class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        low, high = 1, max(piles)
        res = high
        while low <= high:
            k = (low + high) // 2
            hours = sum(math.ceil(p / k) for p in piles)
            if hours <= h:
                res = k
                high = k - 1
            else:
                low = k + 1
        return res`,
      cpp: `class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int low = 1, high = 0;
        for (int p : piles) high = max(high, p);
        int res = high;
        while (low <= high) {
            int k = low + (high - low) / 2;
            long long hours = 0;
            for (int p : piles) hours += (p + k - 1) / k;
            if (hours <= h) {
                res = k;
                high = k - 1;
            } else {
                low = k + 1;
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int low = 1, high = 0;
        for (int p : piles) high = Math.max(high, p);
        int res = high;
        while (low <= high) {
            int k = low + (high - low) / 2;
            long hours = 0;
            for (int p : piles) hours += (p + k - 1) / k;
            if (hours <= h) {
                res = k;
                high = k - 1;
            } else {
                low = k + 1;
            }
        }
        return res;
    }
}`,
      explanation: 'Binary search on the speed value k in the range [1, max(piles)]. For each speed k, check if the total hours needed to finish all piles is <= h. Adjust search range accordingly. Time complexity: O(n log(max_pile)), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-240',
    slug: 'search-a-2d-matrix-ii',
    title: 'Search a 2D Matrix II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:\n- Integers in each row are sorted in ascending from left to right.\n- Integers in each column are sorted in ascending from top to bottom.',
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 300', '-10^9 <= matrix[i][j], target <= 10^9'],
    solutions: {
      python: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix: return False
        r, c = 0, len(matrix[0]) - 1
        while r < len(matrix) and c >= 0:
            if matrix[r][c] == target:
                return True
            elif matrix[r][c] < target:
                r += 1
            else:
                c -= 1
        return False`,
      cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty()) return false;
        int r = 0, c = matrix[0].size() - 1;
        while (r < matrix.size() && c >= 0) {
            if (matrix[r][c] == target) return true;
            if (matrix[r][c] < target) r++;
            else c--;
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0) return false;
        int r = 0, c = matrix[0].length - 1;
        while (r < matrix.length && c >= 0) {
            if (matrix[r][c] == target) return true;
            if (matrix[r][c] < target) r++;
            else c--;
        }
        return false;
    }
}`,
      explanation: 'Search from the top-right corner. If target is larger, increment the row pointer. If target is smaller, decrement the column pointer. This prunes one entire row or column at each step. Time complexity: O(m + n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-81',
    slug: 'search-in-rotated-sorted-array-ii',
    title: 'Search in Rotated Sorted Array II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'There is an integer array `nums` sorted in non-decreasing order (not necessarily with distinct values).\n\nBefore being passed to your function, `nums` is rotated at an unknown pivot index. Given the array `nums` **after** rotation and an integer `target`, return `true` if `target` is in `nums`, or `false` if it is not in `nums`.\n\nYou must decrease the overall execution steps as much as possible.',
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'nums is guaranteed to be rotated.', '-10^4 <= target <= 10^4'],
    solutions: {
      python: `class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return True
            if nums[low] == nums[mid] == nums[high]:
                low += 1
                high -= 1
            elif nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1
        return False`,
      cpp: `class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return true;
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++; high--;
            } else if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return true;
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++; high--;
            } else if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return false;
    }
}`,
      explanation: 'Similar to search in rotated sorted array, but since duplicate elements can exist, if nums[low] == nums[mid] == nums[high], we cannot determine which half is sorted, so we increment low and decrement high. Time complexity: O(n) worst-case, O(log n) average. Space complexity: O(1).'
    }
  },
  {
    id: 'lc-90',
    slug: 'subsets-ii',
    title: 'Subsets II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Given an integer array `nums` that may contain duplicates, return all possible **subsets** (the power set).\n\nThe solution set **must not** contain duplicate subsets. Return the solution in **any order**.',
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10'],
    solutions: {
      python: `class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        def backtrack(start, path):
            res.append(path[:])
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i - 1]:
                    continue
                path.append(nums[i])
                backtrack(i + 1, path)
                path.pop()
        backtrack(0, [])
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> path;
        function<void(int)> backtrack = [&](int start) {
            res.push_back(path);
            for (int i = start; i < nums.size(); ++i) {
                if (i > start && nums[i] == nums[i - 1]) continue;
                path.push_back(nums[i]);
                backtrack(i + 1);
                path.pop_back();
            }
        };
        backtrack(0);
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            path.add(nums[i]);
            backtrack(nums, i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
      explanation: 'Sort the array first to group duplicates. Use backtracking; at each step, skip duplicate elements at the same recursion level to avoid duplicate subsets. Time complexity: O(n * 2^n), Space complexity: O(n) recursion stack.'
    }
  },
  {
    id: 'lc-77',
    slug: 'combinations',
    title: 'Combinations',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `[1, n]`. You may return the answer in **any order**.',
    constraints: ['1 <= n <= 20', '1 <= k <= n'],
    solutions: {
      python: `class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []
        def backtrack(start, path):
            if len(path) == k:
                res.append(path[:])
                return
            for i in range(start, n + 1):
                path.append(i)
                backtrack(i + 1, path)
                path.pop()
        backtrack(1, [])
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res;
        vector<int> path;
        function<void(int)> backtrack = [&](int start) {
            if (path.size() == k) {
                res.push_back(path);
                return;
            }
            for (int i = start; i <= n; ++i) {
                path.push_back(i);
                backtrack(i + 1);
                path.pop_back();
            }
        };
        backtrack(1);
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(n, k, 1, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int n, int k, int start, List<Integer> path, List<List<Integer>> res) {
        if (path.size() == k) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i <= n; i++) {
            path.add(i);
            backtrack(n, k, i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
      explanation: 'Use backtracking. Recursively select numbers starting from 1 to n. When the combination size reaches k, store the result. Time complexity: O(k * C(n, k)), Space complexity: O(k) recursion stack.'
    }
  },
  {
    id: 'lc-216',
    slug: 'combination-sum-iii',
    title: 'Combination Sum III',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Find all possible combinations of `k` numbers that add up to a number `n`, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.',
    constraints: ['2 <= k <= 9', '1 <= n <= 60'],
    solutions: {
      python: `class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        res = []
        def backtrack(start, target, path):
            if len(path) == k:
                if target == 0:
                    res.append(path[:])
                return
            for i in range(start, 10):
                if i > target:
                    break
                path.append(i)
                backtrack(i + 1, target - i, path)
                path.pop()
        backtrack(1, n, [])
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> res;
        vector<int> path;
        function<void(int, int)> backtrack = [&](int start, int target) {
            if (path.size() == k) {
                if (target == 0) res.push_back(path);
                return;
            }
            for (int i = start; i <= 9; ++i) {
                if (i > target) break;
                path.push_back(i);
                backtrack(i + 1, target - i);
                path.pop_back();
            }
        };
        backtrack(1, n);
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(k, n, 1, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int k, int target, int start, List<Integer> path, List<List<Integer>> res) {
        if (path.size() == k) {
            if (target == 0) res.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i <= 9; i++) {
            if (i > target) break;
            path.add(i);
            backtrack(k, target - i, i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}`,
      explanation: 'Use backtracking. Select k distinct numbers from 1 to 9. Prune search when the selected number is larger than the remaining target sum. Time complexity: O(9! * k / (9-k)!), Space complexity: O(k).'
    }
  },
  {
    id: 'lc-103',
    slug: 'binary-tree-zigzag-level-order-traversal',
    title: 'Binary Tree Zigzag Level Order Traversal',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'BFS',
    description: 'Given the `root` of a binary tree, return the **zigzag level order traversal** of its nodes\' values. (i.e., from left to right, then right to left for the next level and alternate between).',
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-100 <= Node.val <= 100'],
    solutions: {
      python: `from collections import deque
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root: return []
        res = []
        q = deque([root])
        left_to_right = True
        while q:
            level = deque()
            for _ in range(len(q)):
                node = q.popleft()
                if left_to_right:
                    level.append(node.val)
                else:
                    level.appendleft(node.val)
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(list(level))
            left_to_right = not left_to_right
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level(sz);
            for (int i = 0; i < sz; ++i) {
                TreeNode* node = q.front(); q.pop();
                int idx = leftToRight ? i : (sz - 1 - i);
                level[idx] = node->val;
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
            leftToRight = !leftToRight;
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        if (root == null) return new ArrayList<>();
        List<List<Integer>> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        boolean leftToRight = true;
        while (!q.isEmpty()) {
            int sz = q.size();
            LinkedList<Integer> level = new LinkedList<>();
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                if (leftToRight) level.add(node.val);
                else level.addFirst(node.val);
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            res.add(level);
            leftToRight = !leftToRight;
        }
        return res;
    }
}`,
      explanation: 'Use BFS queue. In each level, append node values into a double-ended queue. Alternate the insertion order (from front or back) at each level using a boolean flag. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-116',
    slug: 'populating-next-right-pointers-in-each-node',
    title: 'Populating Next Right Pointers in Each Node',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'You are given a **perfect binary tree** where all leaves are on the same level, and every parent has two children. Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.',
    constraints: ['The number of nodes in the tree is in the range [0, 2^12 - 1].', '-1000 <= Node.val <= 1000'],
    solutions: {
      python: `class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        if not root: return None
        curr = root
        while curr.left:
            temp = curr
            while temp:
                temp.left.next = temp.right
                if temp.next:
                    temp.right.next = temp.next.left
                temp = temp.next
            curr = curr.left
        return root`,
      cpp: `class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        Node* curr = root;
        while (curr->left) {
            Node* temp = curr;
            while (temp) {
                temp->left->next = temp->right;
                if (temp->next) temp->right->next = temp->next->left;
                temp = temp->next;
            }
            curr = curr->left;
        }
        return root;
    }
};`,
      java: `class Node { public int val; public Node left; public Node right; public Node next; }
class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        Node curr = root;
        while (curr.left != null) {
            Node temp = curr;
            while (temp != null) {
                temp.left.next = temp.right;
                if (temp.next != null) temp.right.next = temp.next.left;
                temp = temp.next;
            }
            curr = curr.left;
        }
        return root;
    }
}`,
      explanation: 'Since the tree is perfect, connect child nodes level-by-level using the next pointers already established in the level above. This allows an iterative solution with constant extra space. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-863',
    slug: 'all-nodes-distance-k-in-binary-tree',
    title: 'All Nodes Distance K in Binary Tree',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'BFS',
    description: 'Given the `root` of a binary tree, the value of a target node `target`, and an integer `k`, return an array of the values of all nodes that have a distance `k` from the target node. You can return the answer in **any order**.',
    constraints: ['The number of nodes in the tree is in the range [1, 500].', '0 <= Node.val <= 500', 'All the values Node.val are unique.', 'target is the value of one of the nodes in the tree.', '0 <= k <= 1000'],
    solutions: {
      python: `from collections import deque
class Solution:
    def distanceK(self, root: TreeNode, target: TreeNode, k: int) -> List[int]:
        parent = {}
        def dfs(node, par = None):
            if node:
                parent[node] = par
                dfs(node.left, node)
                dfs(node.right, node)
        dfs(root)
        
        q = deque([(target, 0)])
        visited = {target}
        while q:
            if q[0][1] == k:
                return [node.val for node, dist in q]
            node, dist = q.popleft()
            for neighbor in (node.left, node.right, parent[node]):
                if neighbor and neighbor not in visited:
                    visited.add(neighbor)
                    q.append((neighbor, dist + 1))
        return []`,
      cpp: `class Solution {
    unordered_map<TreeNode*, TreeNode*> parent;
    void dfs(TreeNode* node, TreeNode* par) {
        if (!node) return;
        parent[node] = par;
        dfs(node->left, node);
        dfs(node->right, node);
    }
public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        dfs(root, nullptr);
        queue<pair<TreeNode*, int>> q;
        unordered_set<TreeNode*> visited;
        q.push({target, 0});
        visited.insert(target);
        while (!q.empty()) {
            if (q.front().second == k) {
                vector<int> res;
                while (!q.empty()) { res.push_back(q.front().first->val); q.pop(); }
                return res;
            }
            auto [node, dist] = q.front(); q.pop();
            for (auto neighbor : {node->left, node->right, parent[node]}) {
                if (neighbor && !visited.count(neighbor)) {
                    visited.insert(neighbor);
                    q.push({neighbor, dist + 1});
                }
            }
        }
        return {};
    }
};`,
      java: `class Solution {
    Map<TreeNode, TreeNode> parent = new HashMap<>();
    private void dfs(TreeNode node, TreeNode par) {
        if (node == null) return;
        parent.put(node, par);
        dfs(node.left, node);
        dfs(node.right, node);
    }
    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
        dfs(root, null);
        Queue<TreeNode> q = new LinkedList<>();
        Queue<Integer> distQ = new LinkedList<>();
        Set<TreeNode> visited = new HashSet<>();
        q.add(target); distQ.add(0); visited.add(target);
        while (!q.isEmpty()) {
            if (distQ.peek() == k) {
                List<Integer> res = new ArrayList<>();
                for (TreeNode node : q) res.add(node.val);
                return res;
            }
            TreeNode node = q.poll(); int d = distQ.poll();
            TreeNode[] neighbors = {node.left, node.right, parent.get(node)};
            for (TreeNode nei : neighbors) {
                if (nei != null && !visited.contains(nei)) {
                    visited.add(nei);
                    q.add(nei); distQ.add(d + 1);
                }
            }
        }
        return new ArrayList<>();
    }
}`,
      explanation: 'First perform DFS to record parent pointers for all nodes, turning the binary tree into an undirected graph. Then perform BFS starting from the target node up to depth k. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-210',
    slug: 'course-schedule-ii',
    title: 'Course Schedule II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'Topological Sort (Kahn\'s)',
    description: 'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you **must** take course `b_i` first if you want to take course `a_i`.\n\nReturn the ordering of courses you should take to finish all courses. If there are many valid answers, return **any of them**. If it is impossible to finish all courses, return **an empty array**.',
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= numCourses * (numCourses - 1)', 'prerequisites[i].length == 2', '0 <= a_i, b_i < numCourses', 'a_i != b_i', 'All pairs are distinct.'],
    solutions: {
      python: `from collections import deque
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for dest, src in prerequisites:
            adj[src].append(dest)
            indegree[dest] += 1
        q = deque([i for i in range(numCourses) if indegree[i] == 0])
        order = []
        while q:
            node = q.popleft()
            order.append(node)
            for neighbor in adj[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    q.append(neighbor)
        return order if len(order) == numCourses else []`,
      cpp: `class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);
        for (const auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.push(i);
        }
        vector<int> order;
        while (!q.empty()) {
            int node = q.front(); q.pop();
            order.push_back(node);
            for (int neighbor : adj[node]) {
                if (--indegree[neighbor] == 0) q.push(neighbor);
            }
        }
        return order.size() == numCourses ? order : vector<int>();
    }
};`,
      java: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[numCourses];
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            indegree[p[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.add(i);
        }
        int[] order = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            order[idx++] = node;
            for (int neighbor : adj.get(node)) {
                if (--indegree[neighbor] == 0) q.add(neighbor);
            }
        }
        return idx == numCourses ? order : new int[0];
    }
}`,
      explanation: 'Use Kahn\'s algorithm for topological sorting. Calculate the indegrees of all course nodes. Place nodes with 0 indegree in a queue. Pop nodes, append to ordering, decrement neighbor indegrees, and enqueue neighbors whose indegree becomes 0. If order size matches numCourses, return it; otherwise a cycle exists. Time complexity: O(V + E), Space complexity: O(V + E).'
    }
  },
  {
    id: 'lc-329',
    slug: 'longest-increasing-path-in-a-matrix',
    title: 'Longest Increasing Path in a Matrix',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'Given an `m x n` integers matrix, return the length of the longest increasing path in `matrix`.\n\nFrom each cell, you can either move in four directions: left, right, up, or down. You may **not** move diagonally or outside of the boundary.',
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 200', '0 <= matrix[i][j] <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        if not matrix: return 0
        m, n = len(matrix), len(matrix[0])
        memo = [[0]*n for _ in range(m)]
        def dfs(r, c):
            if memo[r][c] != 0:
                return memo[r][c]
            best = 1
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r+dr, c+dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                    best = max(best, 1 + dfs(nr, nc))
            memo[r][c] = best
            return best
        return max(dfs(r, c) for r in range(m) for c in range(n))`,
      cpp: `class Solution {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size(), ans = 0;
        vector<vector<int>> memo(m, vector<int>(n, 0));
        int dirs[] = {0,1,0,-1,0};
        function<int(int,int)> dfs = [&](int r, int c) -> int {
            if (memo[r][c]) return memo[r][c];
            int best = 1;
            for (int d = 0; d < 4; d++) {
                int nr = r + dirs[d], nc = c + dirs[d+1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && matrix[nr][nc] > matrix[r][c])
                    best = max(best, 1 + dfs(nr, nc));
            }
            return memo[r][c] = best;
        };
        for (int r = 0; r < m; ++r)
            for (int c = 0; c < n; ++c)
                ans = max(ans, dfs(r, c));
        return ans;
    }
};`,
      java: `class Solution {
    int[][] memo;
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    public int longestIncreasingPath(int[][] matrix) {
        if (matrix.length == 0) return 0;
        int m = matrix.length, n = matrix[0].length, ans = 0;
        memo = new int[m][n];
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                ans = Math.max(ans, dfs(matrix, r, c));
        return ans;
    }
    private int dfs(int[][] mat, int r, int c) {
        if (memo[r][c] != 0) return memo[r][c];
        int best = 1;
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < mat.length && nc < mat[0].length && mat[nr][nc] > mat[r][c])
                best = Math.max(best, 1 + dfs(mat, nr, nc));
        }
        return memo[r][c] = best;
    }
}`,
      explanation: 'DFS with memoization. From each cell, explore all 4 directions where the neighbor is strictly greater. Cache results to avoid recomputation. Time complexity: O(m*n), Space complexity: O(m*n).'
    }
  },
  {
    id: 'lc-785',
    slug: 'is-graph-bipartite',
    title: 'Is Graph Bipartite?',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'There is an **undirected graph** with `n` nodes, where each node is numbered between `0` and `n - 1`. You are given a 2D array `graph`, where `graph[u]` is an array of nodes that node `u` is adjacent to.\n\nReturn `true` if the graph is **bipartite**, or `false` otherwise.',
    constraints: ['graph.length == n', '1 <= n <= 100', '0 <= graph[u].length < n', 'There are no self-loops or parallel edges.'],
    solutions: {
      python: `class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        color = {}
        for node in range(len(graph)):
            if node not in color:
                stack = [node]
                color[node] = 0
                while stack:
                    curr = stack.pop()
                    for neighbor in graph[curr]:
                        if neighbor not in color:
                            color[neighbor] = 1 - color[curr]
                            stack.append(neighbor)
                        elif color[neighbor] == color[curr]:
                            return False
        return True`,
      cpp: `class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, -1);
        for (int i = 0; i < n; ++i) {
            if (color[i] == -1) {
                queue<int> q;
                q.push(i);
                color[i] = 0;
                while (!q.empty()) {
                    int curr = q.front(); q.pop();
                    for (int neighbor : graph[curr]) {
                        if (color[neighbor] == -1) {
                            color[neighbor] = 1 - color[curr];
                            q.push(neighbor);
                        } else if (color[neighbor] == color[curr]) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        Arrays.fill(color, -1);
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                Queue<Integer> q = new LinkedList<>();
                q.add(i);
                color[i] = 0;
                while (!q.isEmpty()) {
                    int curr = q.poll();
                    for (int neighbor : graph[curr]) {
                        if (color[neighbor] == -1) {
                            color[neighbor] = 1 - color[curr];
                            q.add(neighbor);
                        } else if (color[neighbor] == color[curr]) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
}`,
      explanation: 'A graph is bipartite if its vertices can be partitioned into two sets such that no two adjacent vertices are in the same set. Use BFS/DFS to color the graph with two colors (0 and 1). If we find an adjacent node with the same color, the graph is not bipartite. Time complexity: O(V + E), Space complexity: O(V).'
    }
  },
  {
    id: 'lc-994',
    slug: 'rotting-oranges',
    title: 'Rotting Oranges',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'BFS',
    description: 'You are given an `m x n` grid where each cell can have one of three values:\n- `0` representing an empty cell,\n- `1` representing a fresh orange, or\n- `2` representing a rotten orange.\n\nEvery minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.\n\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return `-1`.',
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1, or 2.'],
    solutions: {
      python: `from collections import deque
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        queue = deque()
        fresh = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 2:
                    queue.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1
        minutes = 0
        while queue and fresh > 0:
            minutes += 1
            for _ in range(len(queue)):
                r, c = queue.popleft()
                for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                    nr, nc = r+dr, c+dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        queue.append((nr, nc))
        return minutes if fresh == 0 else -1`,
      cpp: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), fresh = 0;
        queue<pair<int,int>> q;
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) q.push({r,c});
                else if (grid[r][c] == 1) fresh++;
            }
        int mins = 0, dirs[] = {0,1,0,-1,0};
        while (!q.empty() && fresh) {
            mins++;
            for (int sz = q.size(); sz > 0; sz--) {
                auto [r,c] = q.front(); q.pop();
                for (int d = 0; d < 4; d++) {
                    int nr = r+dirs[d], nc = c+dirs[d+1];
                    if (nr>=0 && nc>=0 && nr<m && nc<n && grid[nr][nc]==1) {
                        grid[nr][nc] = 2; fresh--; q.push({nr,nc});
                    }
                }
            }
        }
        return fresh == 0 ? mins : -1;
    }
};`,
      java: `class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length, fresh = 0;
        Queue<int[]> q = new LinkedList<>();
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) q.offer(new int[]{r,c});
                else if (grid[r][c] == 1) fresh++;
            }
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        int mins = 0;
        while (!q.isEmpty() && fresh > 0) {
            mins++;
            for (int sz = q.size(); sz > 0; sz--) {
                int[] cell = q.poll();
                for (int[] d : dirs) {
                    int nr = cell[0]+d[0], nc = cell[1]+d[1];
                    if (nr>=0 && nc>=0 && nr<m && nc<n && grid[nr][nc]==1) {
                        grid[nr][nc] = 2; fresh--; q.offer(new int[]{nr,nc});
                    }
                }
            }
        }
        return fresh == 0 ? mins : -1;
    }
}`,
      explanation: 'Multi-source BFS. Enqueue all rotten oranges (2) and count fresh ones. Run level-by-level BFS representing minutes. If fresh oranges remain at the end, return -1. Time complexity: O(m*n), Space complexity: O(m*n).'
    }
  },
  {
    id: 'lc-1143',
    slug: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given two strings `text1` and `text2`, return the length of their **longest common subsequence**. If there is no common subsequence, return `0`.',
    constraints: ['1 <= text1.length, text2.length <= 1000', 'text1 and text2 consist of only lowercase English characters.'],
    solutions: {
      python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0]*(n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i-1] == text2[j-1]:
                    dp[i][j] = 1 + dp[i-1][j-1]
                else:
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
        return dp[m][n]`,
      cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i-1] == text2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
        return dp[m][n];
    }
};`,
      java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i-1) == text2.charAt(j-1)) dp[i][j] = 1 + dp[i-1][j-1];
                else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
        return dp[m][n];
    }
}`,
      explanation: 'Use 2D DP. Let dp[i][j] represent the LCS of text1[0..i-1] and text2[0..j-1]. Transition: if characters match, dp[i][j] = 1 + dp[i-1][j-1]; otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Time complexity: O(m * n), Space complexity: O(m * n).'
    }
  },
  {
    id: 'lc-673',
    slug: 'number-of-longest-increasing-subsequence',
    title: 'Number of Longest Increasing Subsequence',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given an integer array `nums`, return the number of longest increasing subsequences.',
    constraints: ['1 <= nums.length <= 2000', '-10^6 <= nums[i] <= 10^6'],
    solutions: {
      python: `class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        if not nums: return 0
        n = len(nums)
        lengths = [1]*n
        counts = [1]*n
        for i in range(n):
            for j in range(i):
                if nums[j] < nums[i]:
                    if lengths[j] + 1 > lengths[i]:
                        lengths[i] = lengths[j] + 1
                        counts[i] = counts[j]
                    elif lengths[j] + 1 == lengths[i]:
                        counts[i] += counts[j]
        max_len = max(lengths)
        return sum(c for l, c in zip(lengths, counts) if l == max_len)`,
      cpp: `class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        vector<int> lengths(n, 1), counts(n, 1);
        int max_len = 1;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < i; ++j) {
                if (nums[j] < nums[i]) {
                    if (lengths[j] + 1 > lengths[i]) {
                        lengths[i] = lengths[j] + 1;
                        counts[i] = counts[j];
                    } else if (lengths[j] + 1 == lengths[i]) {
                        counts[i] += counts[j];
                    }
                }
            }
            max_len = max(max_len, lengths[i]);
        }
        int ans = 0;
        for (int i = 0; i < n; ++i) {
            if (lengths[i] == max_len) ans += counts[i];
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int findNumberOfLIS(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        int[] lengths = new int[n];
        int[] counts = new int[n];
        Arrays.fill(lengths, 1);
        Arrays.fill(counts, 1);
        int max_len = 1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (lengths[j] + 1 > lengths[i]) {
                        lengths[i] = lengths[j] + 1;
                        counts[i] = counts[j];
                    } else if (lengths[j] + 1 == lengths[i]) {
                        counts[i] += counts[j];
                    }
                }
            }
            max_len = Math.max(max_len, lengths[i]);
        }
        int ans = 0;
        for (int i = 0; i < n; i++) {
            if (lengths[i] == max_len) ans += counts[i];
        }
        return ans;
    }
}`,
      explanation: 'Maintain two DP arrays: lengths[i] representing the LIS ending at index i, and counts[i] representing the number of such LIS. Accumulate counts of equal lengths. Time complexity: O(n^2), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-494',
    slug: 'target-sum',
    title: 'Target Sum',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'You are given an integer array `nums` and an integer `target`.\n\nYou want to build an expression out of nums by adding one of the symbols `+` and `-` before each integer in nums and then concatenate all the integers.\n\nReturn the number of different expressions that you can build, which evaluates to `target`.',
    constraints: ['1 <= nums.length <= 20', '0 <= nums[i] <= 1000', '0 <= sum(nums) <= 1000', '-1000 <= target <= 1000'],
    solutions: {
      python: `class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        total = sum(nums)
        if (total - target) % 2 != 0 or total < target:
            return 0
        subset_sum = (total - target) // 2
        dp = [0]*(subset_sum + 1)
        dp[0] = 1
        for n in nums:
            for i in range(subset_sum, n - 1, -1):
                dp[i] += dp[i - n]
        return dp[subset_sum]`,
      cpp: `class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int total = 0;
        for (int n : nums) total += n;
        if ((total - target) % 2 != 0 || total < abs(target)) return 0;
        int subset_sum = (total - target) / 2;
        vector<int> dp(subset_sum + 1, 0);
        dp[0] = 1;
        for (int n : nums) {
            for (int i = subset_sum; i >= n; i--) {
                dp[i] += dp[i - n];
            }
        }
        return dp[subset_sum];
    }
};`,
      java: `class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int n : nums) total += n;
        if ((total - target) % 2 != 0 || total < Math.abs(target)) return 0;
        int subset_sum = (total - target) / 2;
        int[] dp = new int[subset_sum + 1];
        dp[0] = 1;
        for (int n : nums) {
            for (int i = subset_sum; i >= n; i--) {
                dp[i] += dp[i - n];
            }
        }
        return dp[subset_sum];
    }
}`,
      explanation: 'Reduce the target sum problem to a subset sum problem: find the number of subsets with sum = (total_sum - target) / 2. Use 1D DP to count ways. Time complexity: O(n * subset_sum), Space complexity: O(subset_sum).'
    }
  },
  {
    id: 'lc-518',
    slug: 'coin-change-ii',
    title: 'Coin Change II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return `0`.\n\nYou may assume that you have an infinite number of each kind of coin.',
    constraints: ['1 <= coins.length <= 300', '1 <= coins[i] <= 5000', 'All the values of coins are unique.', '0 <= amount <= 5000'],
    solutions: {
      python: `class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0]*(amount + 1)
        dp[0] = 1
        for coin in coins:
            for i in range(coin, amount + 1):
                dp[i] += dp[i - coin]
        return dp[amount]`,
      cpp: `class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        for (int coin : coins) {
            for (int i = coin; i <= amount; ++i) {
                dp[i] += dp[i - coin];
            }
        }
        return dp[amount];
    }
};`,
      java: `class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        return dp[amount];
    }
}`,
      explanation: 'Use 1D DP. dp[i] represents the number of ways to form amount i. For each coin, update the table from index coin up to amount. Time complexity: O(n * amount), Space complexity: O(amount).'
    }
  },
  {
    id: 'lc-140',
    slug: 'word-break-ii',
    title: 'Word Break II',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Backtracking',
    description: 'Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in **any order**.\n\n**Note** that the same word in the dictionary may be reused multiple times in the segmentation.',
    constraints: ['1 <= s.length <= 20', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 10', 's and wordDict[i] consist of only lowercase English letters.', 'All the strings of wordDict are unique.'],
    solutions: {
      python: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        words = set(wordDict)
        memo = {}
        def dfs(i):
            if i in memo: return memo[i]
            if i == len(s): return [""]
            res = []
            for j in range(i + 1, len(s) + 1):
                w = s[i:j]
                if w in words:
                    sub_sentences = dfs(j)
                    for sub in sub_sentences:
                        res.append(w + ("" if not sub else " " + sub))
            memo[i] = res
            return res
        return dfs(0)`,
      cpp: `class Solution {
    unordered_set<string> dict;
    unordered_map<int, vector<string>> memo;
    vector<string> dfs(string& s, int i) {
        if (memo.count(i)) return memo[i];
        if (i == s.size()) return {""};
        vector<string> res;
        for (int j = i + 1; j <= s.size(); ++j) {
            string w = s.substr(i, j - i);
            if (dict.count(w)) {
                vector<string> subs = dfs(s, j);
                for (const auto& sub : subs) {
                    res.push_back(w + (sub.empty() ? "" : " " + sub));
                }
            }
        }
        return memo[i] = res;
    }
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        dict = {wordDict.begin(), wordDict.end()};
        return dfs(s, 0);
    }
};`,
      java: `class Solution {
    Set<String> dict;
    Map<Integer, List<String>> memo = new HashMap<>();
    public List<String> wordBreak(String s, List<String> wordDict) {
        dict = new HashSet<>(wordDict);
        return dfs(s, 0);
    }
    private List<String> dfs(String s, int i) {
        if (memo.containsKey(i)) return memo.get(i);
        List<String> res = new ArrayList<>();
        if (i == s.length()) { res.add(""); return res; }
        for (int j = i + 1; j <= s.length(); j++) {
            String w = s.substring(i, j);
            if (dict.contains(w)) {
                List<String> subs = dfs(s, j);
                for (String sub : subs) {
                    res.add(w + (sub.isEmpty() ? "" : " " + sub));
                }
            }
        }
        memo.put(i, res);
        return res;
    }
}`,
      explanation: 'Use backtracking with memoization. From index i, check all possible suffixes. If a suffix is a valid word, recursively solve for the rest of the string and construct sentences. Time complexity: O(2^n) worst-case, Space complexity: O(2^n).'
    }
  },
  {
    id: 'lc-63',
    slug: 'unique-paths-ii',
    title: 'Unique Paths II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'You are given an `m x n` integer grid `obstacleGrid`. A robot is initially located at the **top-left corner** (i.e., `obstacleGrid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `obstacleGrid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.\n\nAn obstacle and space are marked as `1` or `0` respectively in `obstacleGrid`. A path that the robot takes cannot include **any** square that is an obstacle.',
    constraints: ['m == obstacleGrid.length', 'n == obstacleGrid[i].length', '1 <= m, n <= 100', 'obstacleGrid[i][j] is 0 or 1.'],
    solutions: {
      python: `class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        if obstacleGrid[0][0] == 1: return 0
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        dp = [0]*n
        dp[0] = 1
        for r in range(m):
            for c in range(n):
                if obstacleGrid[r][c] == 1:
                    dp[c] = 0
                elif c > 0:
                    dp[c] += dp[c-1]
        return dp[-1]`,
      cpp: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        if (obstacleGrid[0][0] == 1) return 0;
        int m = obstacleGrid.size(), n = obstacleGrid[0].size();
        vector<int> dp(n, 0);
        dp[0] = 1;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (obstacleGrid[r][c] == 1) dp[c] = 0;
                else if (c > 0) dp[c] += dp[c - 1];
            }
        }
        return dp[n - 1];
    }
};`,
      java: `class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        if (obstacleGrid[0][0] == 1) return 0;
        int m = obstacleGrid.length, n = obstacleGrid[0].length;
        int[] dp = new int[n];
        dp[0] = 1;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (obstacleGrid[r][c] == 1) dp[c] = 0;
                else if (c > 0) dp[c] += dp[c - 1];
            }
        }
        return dp[n - 1];
    }
}`,
      explanation: 'Use 1D DP. Maintain a rolling array dp representing paths to each cell in the current row. If a cell contains an obstacle (1), set dp[c] = 0; otherwise, add paths from the left (dp[c-1]). Time complexity: O(m * n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-64',
    slug: 'minimum-path-sum',
    title: 'Minimum Path Sum',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given a `m x n` grid filled with non-negative numbers, find a path from top-left to bottom-right, which minimizes the sum of all numbers along its path.\n\n**Note:** You can only move either down or right at any point in time.',
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 200', '0 <= grid[i][j] <= 200'],
    solutions: {
      python: `class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dp = [float('inf')]*n
        dp[0] = 0
        for r in range(m):
            for c in range(n):
                if c == 0:
                    dp[c] += grid[r][c]
                else:
                    dp[c] = grid[r][c] + min(dp[c], dp[c-1])
        return dp[-1]`,
      cpp: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> dp(n, INT_MAX);
        dp[0] = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (c == 0) dp[c] += grid[r][c];
                else dp[c] = grid[r][c] + min(dp[c], dp[c-1]);
            }
        }
        return dp[n - 1];
    }
};`,
      java: `class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[] dp = new int[n];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (c == 0) dp[c] += grid[r][c];
                else dp[c] = grid[r][c] + Math.min(dp[c], dp[c - 1]);
            }
        }
        return dp[n - 1];
    }
}`,
      explanation: 'Use 1D DP. Maintain a rolling array dp representing the minimum path sum to each column. Update each cell as the grid value plus the minimum of path sum from above (dp[c]) or left (dp[c-1]). Time complexity: O(m * n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-120',
    slug: 'triangle',
    title: 'Triangle',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given a `triangle`, return the minimum path sum from top to bottom.\n\nFor each step, you may move to an adjacent number of the row below. More formally, if you are on index `i` on the current row, you may move to either index `i` or index `i + 1` on the next row.',
    constraints: ['1 <= triangle.length <= 200', 'triangle[0].length == 1', 'triangle[i].length == triangle[i - 1].length + 1', '-10^4 <= triangle[i][j] <= 10^4'],
    solutions: {
      python: `class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        dp = list(triangle[-1])
        for r in range(len(triangle) - 2, -1, -1):
            for c in range(r + 1):
                dp[c] = triangle[r][c] + min(dp[c], dp[c+1])
        return dp[0]`,
      cpp: `class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        vector<int> dp = triangle.back();
        for (int r = triangle.size() - 2; r >= 0; --r) {
            for (int c = 0; c <= r; ++c) {
                dp[c] = triangle[r][c] + min(dp[c], dp[c+1]);
            }
        }
        return dp[0];
    }
};`,
      java: `class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) dp[i] = triangle.get(n - 1).get(i);
        for (int r = n - 2; r >= 0; r--) {
            for (int c = 0; c <= r; c++) {
                dp[c] = triangle.get(r).get(c) + Math.min(dp[c], dp[c + 1]);
            }
        }
        return dp[0];
    }
}`,
      explanation: 'Bottom-up DP. Start from the second-to-last row of the triangle and move upwards, updating each cell value to be the cell value plus the minimum of its two adjacent children in the row below. Time complexity: O(n^2), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-639',
    slug: 'decode-ways-ii',
    title: 'Decode Ways II',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'A message containing letters from A-Z can be encoded into numbers using the mapping A->1, B->2, ... Z->26.\n\nTo decode an encoded message, all the digits must be grouped then mapped back into letters.\n\nIn addition to the digits, an encoded message can contain the `*` character, which can represent any digit from 1 to 9.\n\nGiven a string `s` containing digits and characters `*`, return the number of ways to decode it. Since the answer may be very large, return it **modulo** `10^9 + 7`.',
    constraints: ['1 <= s.length <= 10^5', 's consists of digits and \'*\' characters.'],
    solutions: {
      python: `class Solution:
    def numDecodings(self, s: str) -> int:
        MOD = 10**9 + 7
        dp0, dp1, dp2 = 1, 0, 0
        for c in s:
            dp0_new = 0
            if c == '*':
                dp0_new = 9 * dp0 + dp1 + 9 * dp2
            else:
                dp0_new = (dp0 if c != '0' else 0) + dp1 + (dp2 if c <= '6' else 0)
            
            if c == '*':
                dp1_new = dp0
                dp2_new = dp0
            elif c == '1':
                dp1_new = dp0
                dp2_new = 0
            elif c == '2':
                dp1_new = 0
                dp2_new = dp0
            else:
                dp1_new = 0
                dp2_new = 0
                
            dp0, dp1, dp2 = dp0_new % MOD, dp1_new, dp2_new
        return dp0`,
      cpp: `class Solution {
public:
    int numDecodings(string s) {
        long long MOD = 1e9 + 7;
        long long dp0 = 1, dp1 = 0, dp2 = 0;
        for (char c : s) {
            long long dp0_new = 0;
            if (c == '*') {
                dp0_new = 9 * dp0 + dp1 + 9 * dp2;
            } else {
                dp0_new = (c != '0' ? dp0 : 0) + dp1 + (c <= '6' ? dp2 : 0);
            }
            long long dp1_new = 0, dp2_new = 0;
            if (c == '*') {
                dp1_new = dp0;
                dp2_new = dp0;
            } else if (c == '1') {
                dp1_new = dp0;
            } else if (c == '2') {
                dp2_new = dp0;
            }
            dp0 = dp0_new % MOD;
            dp1 = dp1_new;
            dp2 = dp2_new;
        }
        return dp0;
    }
};`,
      java: `class Solution {
    public int numDecodings(String s) {
        long MOD = 1000000007;
        long dp0 = 1, dp1 = 0, dp2 = 0;
        for (char c : s.toCharArray()) {
            long dp0_new = 0;
            if (c == '*') {
                dp0_new = 9 * dp0 + dp1 + 9 * dp2;
            } else {
                dp0_new = (c != '0' ? dp0 : 0) + dp1 + (c <= '6' ? dp2 : 0);
            }
            long dp1_new = 0, dp2_new = 0;
            if (c == '*') {
                dp1_new = dp0;
                dp2_new = dp0;
            } else if (c == '1') {
                dp1_new = dp0;
            } else if (c == '2') {
                dp2_new = dp0;
            }
            dp0 = dp0_new % MOD;
            dp1 = dp1_new;
            dp2 = dp2_new;
        }
        return (int) dp0;
    }
}`,
      explanation: 'Use DP with optimized space. Let dp0, dp1, dp2 represent the number of ways to end at the current character (single-digit transition), ending with a trailing 1, and ending with a trailing 2 respectively. Apply modular arithmetic at each step. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-221',
    slug: 'maximal-square',
    title: 'Maximal Square',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given an `m x n` binary `matrix` filled with `0`\'s and `1`\'s, find the largest square containing only `1`\'s and return its area.',
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 300', "matrix[i][j] is '0' or '1'."],
    solutions: {
      python: `class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        if not matrix: return 0
        m, n = len(matrix), len(matrix[0])
        dp = [0]*(n + 1)
        max_side = 0
        prev = 0
        for r in range(1, m + 1):
            for c in range(1, n + 1):
                temp = dp[c]
                if matrix[r-1][c-1] == '1':
                    dp[c] = 1 + min(dp[c], dp[c-1], prev)
                    max_side = max(max_side, dp[c])
                else:
                    dp[c] = 0
                prev = temp
        return max_side * max_side`,
      cpp: `class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<int> dp(n + 1, 0);
        int maxSide = 0, prev = 0;
        for (int r = 1; r <= m; ++r) {
            for (int c = 1; c <= n; ++c) {
                int temp = dp[c];
                if (matrix[r-1][c-1] == '1') {
                    dp[c] = 1 + min({dp[c], dp[c-1], prev});
                    maxSide = max(maxSide, dp[c]);
                } else {
                    dp[c] = 0;
                }
                prev = temp;
            }
        }
        return maxSide * maxSide;
    }
};`,
      java: `class Solution {
    public int maximalSquare(char[][] matrix) {
        if (matrix.length == 0) return 0;
        int m = matrix.length, n = matrix[0].length;
        int[] dp = new int[n + 1];
        int maxSide = 0, prev = 0;
        for (int r = 1; r <= m; r++) {
            for (int c = 1; c <= n; c++) {
                int temp = dp[c];
                if (matrix[r-1][c-1] == '1') {
                    dp[c] = 1 + Math.min(dp[c], Math.min(dp[c-1], prev));
                    maxSide = Math.max(maxSide, dp[c]);
                } else {
                    dp[c] = 0;
                }
                prev = temp;
            }
        }
        return maxSide * maxSide;
    }
}`,
      explanation: 'Use 2D DP optimized to 1D. dp[c] represents the side length of the maximal square ending at column c. Transition: if matrix[r-1][c-1] == \'1\', dp[c] = 1 + min(dp[c], dp[c-1], prev) where prev is the top-left neighbor. Time complexity: O(m * n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-213',
    slug: 'house-robber-ii',
    title: 'House Robber II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police** (no two adjacent houses).',
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1: return nums[0]
        def rob_linear(arr):
            a, b = 0, 0
            for n in arr:
                a, b = b, max(b, a + n)
            return b
        return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))`,
      cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        if (nums.size() == 1) return nums[0];
        auto robLinear = [](const vector<int>& arr, int lo, int hi) {
            int a = 0, b = 0;
            for (int i = lo; i <= hi; ++i) {
                int t = max(b, a + arr[i]);
                a = b;
                b = t;
            }
            return b;
        };
        return max(robLinear(nums, 0, nums.size() - 2), robLinear(nums, 1, nums.size() - 1));
    }
};`,
      java: `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(robLinear(nums, 0, nums.length - 2), robLinear(nums, 1, nums.length - 1));
    }
    private int robLinear(int[] nums, int lo, int hi) {
        int a = 0, b = 0;
        for (int i = lo; i <= hi; i++) {
            int t = Math.max(b, a + nums[i]);
            a = b;
            b = t;
        }
        return b;
    }
}`,
      explanation: 'Circular constraint means we cannot rob both the first and the last houses. Run the linear House Robber algorithm twice: once for houses 0 to n-2, and once for houses 1 to n-1. Take the maximum. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-337',
    slug: 'house-robber-iii',
    title: 'House Robber III',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'The thief has found himself a new place for his thievery. There is only one entrance to this area, called `root`. Besides the `root`, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if **two directly-linked houses were broken into on the same night**.\n\nGiven the `root` of the binary tree, return the maximum amount of money the thief can rob without alerting the police.',
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '0 <= Node.val <= 10^4'],
    solutions: {
      python: `class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        def dfs(node):
            if not node:
                return (0, 0) # (rob_this, skip_this)
            left = dfs(node.left)
            right = dfs(node.right)
            # If we rob this node, we must skip its children
            rob_this = node.val + left[1] + right[1]
            # If we skip this node, we can choose to rob or skip children
            skip_this = max(left) + max(right)
            return (rob_this, skip_this)
        return max(dfs(root))`,
      cpp: `class Solution {
    pair<int, int> dfs(TreeNode* node) {
        if (!node) return {0, 0};
        auto left = dfs(node->left);
        auto right = dfs(node->right);
        int robThis = node->val + left.second + right.second;
        int skipThis = max(left.first, left.second) + max(right.first, right.second);
        return {robThis, skipThis};
    }
public:
    int rob(TreeNode* root) {
        auto res = dfs(root);
        return max(res.first, res.second);
    }
};`,
      java: `class Solution {
    public int rob(TreeNode root) {
        int[] res = dfs(root);
        return Math.max(res[0], res[1]);
    }
    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        int[] left = dfs(node.left);
        int[] right = dfs(node.right);
        int robThis = node.val + left[1] + right[1];
        int skipThis = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        return new int[]{robThis, skipThis};
    }
}`,
      explanation: 'Use tree DP / post-order traversal. For each node, return a pair (rob_this_node, skip_this_node). If robbing, sum node value and children\'s skipped sums. If skipping, take max of robbing/skipping each child. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-406',
    slug: 'queue-reconstruction-by-height',
    title: 'Queue Reconstruction by Height',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'You are given an array of people, `people`, which are the attributes of some people in a queue (not necessarily in order). Each `people[i] = [h_i, k_i]` represents the `i`-th person of height `h_i` who has exactly `k_i` people in front of them who have a height greater than or equal to `h_i`.\n\nReconstruct and return the queue that is represented by the input array.',
    constraints: ['1 <= people.length <= 2000', '0 <= h_i <= 10^6', '0 <= k_i < people.length'],
    solutions: {
      python: `class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        people.sort(key=lambda x: (-x[0], x[1]))
        queue = []
        for p in people:
            queue.insert(p[1], p)
        return queue`,
      cpp: `class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        sort(people.begin(), people.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] == b[0] ? a[1] < b[1] : a[0] > b[0];
        });
        vector<vector<int>> queue;
        for (const auto& p : people) {
            queue.insert(queue.begin() + p[1], p);
        }
        return queue;
    }
};`,
      java: `class Solution {
    public int[][] reconstructQueue(int[][] people) {
        Arrays.sort(people, (a, b) -> a[0] == b[0] ? a[1] - b[1] : b[0] - a[0]);
        List<int[]> queue = new ArrayList<>();
        for (int[] p : people) {
            queue.add(p[1], p);
        }
        return queue.toArray(new int[people.length][]);
    }
}`,
      explanation: 'Greedy approach: sort people descending by height, and ascending by k values. Insert each person into the result queue at index k. Shorter people inserted later will not affect the k count of taller people already in the queue. Time complexity: O(n^2), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-435',
    slug: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
    constraints: ['1 <= intervals.length <= 10^5', 'intervals[i].length == 2', '-5 * 10^4 <= start_i < end_i <= 5 * 10^4'],
    solutions: {
      python: `class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        count = 0
        prev_end = float('-inf')
        for start, end in intervals:
            if start >= prev_end:
                prev_end = end
            else:
                count += 1
        return count`,
      cpp: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        int count = 0, prevEnd = INT_MIN;
        for (const auto& i : intervals) {
            if (i[0] >= prevEnd) prevEnd = i[1];
            else count++;
        }
        return count;
    }
};`,
      java: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
        int count = 0, prevEnd = Integer.MIN_VALUE;
        for (int[] i : intervals) {
            if (i[0] >= prevEnd) prevEnd = i[1];
            else count++;
        }
        return count;
    }
}`,
      explanation: 'Greedy interval scheduling: sort intervals by end time. Always keep the interval that ends earliest to leave maximum room for future intervals. If an interval overlaps with the previous selected, remove it. Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-452',
    slug: 'minimum-number-of-arrows-to-burst-balloons',
    title: 'Minimum Number of Arrows to Burst Balloons',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array `points` where `points[i] = [x_start, x_end]` denotes a balloon whose horizontal diameter stretches between `x_start` and `x_end`.\n\nArrows can be shot up vertically from different points along the X-axis. A balloon with `x_start` and `x_end` is burst by an arrow shot at `x` if `x_start <= x <= x_end`. There is no limit to the number of arrows that can be shot. An arrow once shot keeps traveling up infinitely, bursting any balloons in its path.\n\nGiven the array `points`, return the minimum number of arrows that must be shot to burst all balloons.',
    constraints: ['1 <= points.length <= 10^5', 'points[i].length == 2', '-2^31 <= x_start < x_end <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        points.sort(key=lambda x: x[1])
        arrows = 1
        end = points[0][1]
        for s, e in points[1:]:
            if s > end:
                arrows += 1
                end = e
        return arrows`,
      cpp: `class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        int arrows = 1, end = points[0][1];
        for (int i = 1; i < points.size(); ++i) {
            if (points[i][0] > end) {
                arrows++;
                end = points[i][1];
            }
        }
        return arrows;
    }
};`,
      java: `class Solution {
    public int findMinArrowShots(int[][] points) {
        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
        int arrows = 1, end = points[0][1];
        for (int i = 1; i < points.length; i++) {
            if (points[i][0] > end) {
                arrows++;
                end = points[i][1];
            }
        }
        return arrows;
    }
}`,
      explanation: 'Sort balloons by end coordinate. Shoot an arrow at the end coordinate of the first balloon. Skip all balloons that overlap with this coordinate. If a balloon starts after the current arrow coordinate, shoot a new arrow. Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-135',
    slug: 'candy',
    title: 'Candy',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`.\n\nYou are giving candies to these children subjected to the following requirements:\n- Each child must have at least one candy.\n- Children with a higher rating get more candies than their neighbors.\n\nReturn the minimum number of candies you must give.',
    constraints: ['n == ratings.length', '1 <= n <= 2 * 10^4', '0 <= ratings[i] <= 2 * 10^4'],
    solutions: {
      python: `class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        candies = [1]*n
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                candies[i] = candies[i - 1] + 1
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                candies[i] = max(candies[i], candies[i + 1] + 1)
        return sum(candies)`,
      cpp: `class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> candies(n, 1);
        for (int i = 1; i < n; ++i) {
            if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
        }
        for (int i = n - 2; i >= 0; --i) {
            if (ratings[i] > ratings[i + 1]) candies[i] = max(candies[i], candies[i + 1] + 1);
        }
        int total = 0;
        for (int c : candies) total += c;
        return total;
    }
};`,
      java: `class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] candies = new int[n];
        Arrays.fill(candies, 1);
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
        }
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
        int total = 0;
        for (int c : candies) total += c;
        return total;
    }
}`,
      explanation: 'Two-pass greedy approach: first pass from left to right satisfies left-neighbor constraints (increase candy if rating is higher). Second pass from right to left satisfies right-neighbor constraints by updating to max(current, right_neighbor + 1). Time complexity: O(n), Space complexity: O(n).'
    }
  },

  // --- Codeforces Problems ---
  {
    id: 'cf-617A',
    slug: 'cf-617a',
    title: 'Elephant',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'An elephant wants to visit his friend. The elephant is currently at coordinate 0, and his friend is at coordinate `x`. The elephant can move 1, 2, 3, 4, or 5 steps forward in one move.\n\nCalculate the minimum number of moves needed to reach coordinate `x`.\n\n**Input:** An integer `x` (1 ≤ x ≤ 10^6).\n\n**Output:** Print the minimum number of moves.',
    constraints: ['1 ≤ x ≤ 10^6'],
    solutions: {
      python: `x = int(input())
print((x + 4) // 5)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int x; cin >> x;
    cout << (x + 4) / 5;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int x = new Scanner(System.in).nextInt();
        System.out.println((x + 4) / 5);
    }
}`,
      explanation: 'The elephant should take the maximum possible step (5) as many times as possible. The minimum steps to cover x distance is ceil(x / 5), which can be written as (x + 4) // 5. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-59A',
    slug: 'cf-59a',
    title: 'Word',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Pointers & References',
    description: 'Vasya loves programming. He wants to format words. If a word has strictly more uppercase letters than lowercase, convert all letters to uppercase. Otherwise, convert all letters to lowercase.\n\n**Input:** A non-empty string consisting of uppercase and lowercase letters (length ≤ 100).\n\n**Output:** The formatted string.',
    constraints: ['1 ≤ |s| ≤ 100', 's consists of English letters.'],
    solutions: {
      python: `s = input()
upper = sum(1 for c in s if c.isupper())
lower = len(s) - upper
print(s.upper() if upper > lower else s.lower())`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; cin >> s;
    int upper = 0;
    for (char c : s) if (isupper(c)) upper++;
    int lower = s.size() - upper;
    if (upper > lower) {
        for (char &c : s) c = toupper(c);
    } else {
        for (char &c : s) c = tolower(c);
    }
    cout << s;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        int upper = 0;
        for (char c : s.toCharArray()) if (Character.isUpperCase(c)) upper++;
        int lower = s.length() - upper;
        System.out.println(upper > lower ? s.toUpperCase() : s.toLowerCase());
    }
}`,
      explanation: 'Count the number of uppercase and lowercase letters. Compare the counts and transform the string to uppercase or lowercase based on the condition. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-977A',
    slug: 'cf-977a',
    title: 'Wrong Subtraction',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Tanya subtracts 1 from a number `n` if its last digit is non-zero. If the last digit is zero, she divides the number by 10 (removes the last digit). Given `n` and `k`, calculate the result after subtracting `k` times.\n\n**Input:** Two integers `n` (2 ≤ n ≤ 10^9) and `k` (1 ≤ k ≤ 50).\n\n**Output:** The final number.',
    constraints: ['2 ≤ n ≤ 10^9', '1 ≤ k ≤ 50'],
    solutions: {
      python: `n, k = map(int, input().split())
for _ in range(k):
    if n % 10 == 0:
        n //= 10
    else:
        n -= 1
print(n)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    for (int i = 0; i < k; ++i) {
        if (n % 10 == 0) n /= 10;
        else n--;
    }
    cout << n;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        for (int i = 0; i < k; i++) {
            if (n % 10 == 0) n /= 10;
            else n--;
        }
        System.out.println(n);
    }
}`,
      explanation: 'Simulate the subtraction process k times. In each step, if n is divisible by 10, divide it by 10; otherwise, decrement it by 1. Time complexity: O(k), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-705A',
    slug: 'cf-705a',
    title: 'Hulk',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Pointers & References',
    description: 'Dr. Bruce Banner hates his enemies. When he expresses his feelings, he says: "I hate that I love that I hate that..." up to `n` clauses.\n\nGenerate the complete sentence ending with "it".\n\n**Input:** An integer `n` (1 ≤ n ≤ 100).\n\n**Output:** The complete sentence.',
    constraints: ['1 ≤ n ≤ 100'],
    solutions: {
      python: `n = int(input())
clauses = []
for i in range(n):
    clauses.append("I hate" if i % 2 == 0 else "I love")
print(" that ".join(clauses) + " it")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    string s = "";
    for (int i = 1; i <= n; ++i) {
        if (i > 1) s += " that ";
        s += (i % 2 == 1) ? "I hate" : "I love";
    }
    s += " it";
    cout << s;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= n; i++) {
            if (i > 1) sb.append(" that ");
            sb.append(i % 2 == 1 ? "I hate" : "I love");
        }
        sb.append(" it");
        System.out.println(sb);
    }
}`,
      explanation: 'Generate alternating "I hate" and "I love" clauses linked by "that" and ending with "it". Time complexity: O(n), Space complexity: O(n) for string storage.'
    }
  },
  {
    id: 'cf-1328A',
    slug: 'cf-1328a',
    title: 'Divisibility Problem',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are given two positive integers `a` and `b`. In one move, you can increase `a` by 1. Find the minimum number of moves to make `a` divisible by `b`.\n\n**Input:** First line: `t` (test cases). Each of the next `t` lines contains `a` and `b`.\n\n**Output:** For each test case, print the minimum moves.',
    constraints: ['1 ≤ t ≤ 10^4', '1 ≤ a, b ≤ 10^9'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    a, b = map(int, input().split())
    rem = a % b
    print(0 if rem == 0 else b - rem)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int a, b; cin >> a >> b;
        int rem = a % b;
        cout << (rem == 0 ? 0 : b - rem) << "\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int t = sc.nextInt();
            while (t-- > 0) {
                int a = sc.nextInt(), b = sc.nextInt();
                int rem = a % b;
                System.out.println(rem == 0 ? 0 : b - rem);
            }
        }
    }
}`,
      explanation: 'Calculate the remainder of a divided by b. If the remainder is 0, the moves needed are 0. Otherwise, the number of moves to reach the next multiple of b is b - (a % b). Time complexity: O(1) per test case, Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1335A',
    slug: 'cf-1335a',
    title: 'Candies and Two Sisters',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'There are `n` candies. Two sisters, Alice and Betty, want to divide the candies such that Alice gets `a` candies, Betty gets `b` candies, `a > b`, `a + b = n`, and both `a` and `b` are positive integers.\n\nCalculate the number of ways to distribute the candies.\n\n**Input:** First line: `t` (test cases). Next `t` lines contain `n`.\n\n**Output:** The number of valid distributions.',
    constraints: ['1 ≤ t ≤ 10^4', '1 ≤ n ≤ 2 * 10^9'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    n = int(input())
    print((n - 1) // 2)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        cout << (n - 1) / 2 << "\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            System.out.println((n - 1) / 2);
        }
    }
}`,
      explanation: 'For any n candies, Alice must get at least ceil(n/2) + 1 (if n is even) or (n+1)/2 (if n is odd). The total number of valid ways is simply floor((n-1)/2), which can be written as (n-1)//2. Time complexity: O(1) per test case, Space complexity: O(1).'
    }
  },
  {
    id: 'cf-200B',
    slug: 'cf-200b',
    title: 'Drinks',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Vasya has `n` orange drinks. The `i`-th drink contains `p_i` percent of orange juice. Vasya prepares a cocktail of equal volumes of all `n` drinks. Find the overall volume fraction of orange juice in the cocktail.\n\n**Input:** First line: `n`. Second line: `n` integers `p_i`.\n\n**Output:** The orange juice percentage in the cocktail.',
    constraints: ['1 ≤ n ≤ 100', '0 ≤ p_i ≤ 100'],
    solutions: {
      python: `n = int(input())
p = list(map(int, input().split()))
print(sum(p) / n)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    double sum = 0;
    for (int i = 0; i < n; ++i) { int x; cin >> x; sum += x; }
    cout << fixed << setprecision(12) << sum / n;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        double sum = 0;
        for (int i = 0; i < n; i++) sum += sc.nextInt();
        System.out.println(sum / n);
    }
}`,
      explanation: 'The cocktail contains equal volumes of all drinks, so the overall percentage is the average of all percentages (sum(p_i) / n). Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-318A',
    slug: 'cf-318a',
    title: 'Even Odds',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Being a smart boy, Vasya loves numbers. He writes all odd numbers from 1 to `n` in ascending order, then all even numbers in ascending order. Find the number at index `k`.\n\n**Input:** Two integers `n` and `k` (1 ≤ k ≤ n ≤ 10^12).\n\n**Output:** The number at index `k`.',
    constraints: ['1 ≤ k ≤ n ≤ 10^12'],
    solutions: {
      python: `n, k = map(int, input().split())
odds = (n + 1) // 2
if k <= odds:
    print(2 * k - 1)
else:
    print(2 * (k - odds))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n, k; cin >> n >> k;
    long long odds = (n + 1) / 2;
    if (k <= odds) cout << 2 * k - 1;
    else cout << 2 * (k - odds);
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong(), k = sc.nextLong();
        long odds = (n + 1) / 2;
        if (k <= odds) System.out.println(2 * k - 1);
        else System.out.println(2 * (k - odds));
    }
}`,
      explanation: 'Calculate the total count of odd numbers in [1, n], which is odds = (n + 1) / 2. If k <= odds, the kth number is odd and equal to 2 * k - 1. Otherwise, it is even and equal to 2 * (k - odds). Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-467A',
    slug: 'cf-467a',
    title: 'George and Accommodation',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'George and Alex want to move in together. They have `n` rooms. For each room, you know the number of people already living in it `p_i` and the room capacity `q_i`. A room is suitable if it can accommodate at least two more people.\n\n**Input:** First line: `n`. Each of the next `n` lines contains `p_i` and `q_i`.\n\n**Output:** Print the number of suitable rooms.',
    constraints: ['1 ≤ n ≤ 100', '0 ≤ p_i ≤ q_i ≤ 100'],
    solutions: {
      python: `n = int(input())
count = 0
for _ in range(n):
    p, q = map(int, input().split())
    if q - p >= 2:
        count += 1
print(count)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, count = 0;
    cin >> n;
    while (n--) {
        int p, q; cin >> p >> q;
        if (q - p >= 2) count++;
    }
    cout << count;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), count = 0;
        for (int i = 0; i < n; i++) {
            int p = sc.nextInt(), q = sc.nextInt();
            if (q - p >= 2) count++;
        }
        System.out.println(count);
    }
}`,
      explanation: 'Iterate through all rooms and check if the capacity (q_i) minus the current occupants (p_i) is at least 2. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-136A',
    slug: 'cf-136a',
    title: 'Presents',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Little Petya has `n` friends numbered 1 through `n`. Friend `i` gave a present to friend `p_i`. Petya wants to know, for each person `j`, who gave them the present.\n\n**Input:** First line: `n`. Second line: `n` integers `p_i`.\n\n**Output:** Print `n` integers: for each person `j`, print the person who gave them the present.',
    constraints: ['1 ≤ n ≤ 100', 'p is a permutation of 1 to n.'],
    solutions: {
      python: `n = int(input())
p = list(map(int, input().split()))
res = [0] * n
for giver, receiver in enumerate(p, 1):
    res[receiver - 1] = giver
print(*res)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> res(n + 1);
    for (int giver = 1; giver <= n; ++giver) {
        int receiver; cin >> receiver;
        res[receiver] = giver;
    }
    for (int i = 1; i <= n; i++) cout << res[i] << (i == n ? "" : " ");
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] res = new int[n + 1];
        for (int giver = 1; giver <= n; giver++) {
            int receiver = sc.nextInt();
            res[receiver] = giver;
        }
        for (int i = 1; i <= n; i++) System.out.print(res[i] + (i == n ? "" : " "));
    }
}`,
      explanation: 'Use the inverse permutation mapping. If person i gave a present to p_i, then p_i received a present from i. Store the givers in an array indexed by receivers. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-580A',
    slug: 'cf-580a',
    title: 'Kefa and First Steps',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Kefa decided to make some money. He records cryptocurrency daily prices for `n` days. Find the length of the **longest non-decreasing contiguous subarray**.\n\n**Input:** First line: `n`. Second line: `n` integers — the prices.\n\n**Output:** Print the maximum length.',
    constraints: ['1 ≤ n ≤ 10^5', '1 ≤ a_i ≤ 10^9'],
    solutions: {
      python: `n = int(input())
a = list(map(int, input().split()))
best = cur = 1
for i in range(1, n):
    if a[i] >= a[i - 1]:
        cur += 1
        best = max(best, cur)
    else:
        cur = 1
print(best)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int best = 1, cur = 1;
    for (int i = 1; i < n; i++) {
        if (a[i] >= a[i - 1]) {
            cur++;
            best = max(best, cur);
        } else {
            cur = 1;
        }
    }
    cout << best;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int best = 1, cur = 1;
        for (int i = 1; i < n; i++) {
            if (a[i] >= a[i - 1]) {
                cur++;
                best = Math.max(best, cur);
            } else {
                cur = 1;
            }
        }
        System.out.println(best);
    }
}`,
      explanation: 'Single-pass greedy: iterate through the prices. Maintain a count of the current non-decreasing contiguous sequence. Reset to 1 whenever a price drops. Track the global maximum length. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'cf-546A',
    slug: 'cf-546a',
    title: 'Soldier and Bananas',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'A soldier wants to buy `w` bananas. The first banana costs `k` dollars, the second is `2*k`, and so on. He has `n` dollars. Calculate the minimum amount of money he needs to borrow.\n\n**Input:** Three integers `k`, `n`, `w` (1 ≤ k, w ≤ 1000, 0 ≤ n ≤ 10^9).\n\n**Output:** Print the borrowed amount.',
    constraints: ['1 ≤ k, w ≤ 1000', '0 ≤ n ≤ 10^9'],
    solutions: {
      python: `k, n, w = map(int, input().split())
total = k * w * (w + 1) // 2
print(max(0, total - n))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    long long k, n, w; cin >> k >> n >> w;
    long long total = k * w * (w + 1) / 2;
    cout << max(0LL, total - n);
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long k = sc.nextLong(), n = sc.nextLong(), w = sc.nextLong();
        long total = k * w * (w + 1) / 2;
        System.out.println(Math.max(0, total - n));
    }
}`,
      explanation: 'The total cost of w bananas is k * (1 + 2 + ... + w) = k * w * (w + 1) / 2. Subtract the soldier\'s money n, and output the result clamped to a minimum of 0. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-158B',
    slug: 'cf-158b',
    title: 'Taxi',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Counting Sort',
    description: 'There are `n` groups of schoolchildren. Group `i` has `s_i` children (1 ≤ s_i ≤ 4). Each taxi can carry at most 4 passengers. Groups cannot be split. Find the minimum number of taxis needed.\n\n**Input:** First line: `n`. Second line: `n` integers `s_i`.\n\n**Output:** The minimum taxis.',
    constraints: ['1 ≤ n ≤ 10^5', '1 ≤ s_i ≤ 4'],
    solutions: {
      python: `n = int(input())
s = list(map(int, input().split()))
counts = [0]*5
for x in s:
    counts[x] += 1
taxis = counts[4] + counts[3] + counts[2] // 2
counts[1] = max(0, counts[1] - counts[3])
if counts[2] % 2 != 0:
    taxis += 1
    counts[1] = max(0, counts[1] - 2)
taxis += (counts[1] + 3) // 4
print(taxis)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> counts(5, 0);
    for (int i = 0; i < n; ++i) { int x; cin >> x; counts[x]++; }
    int taxis = counts[4] + counts[3] + counts[2] / 2;
    counts[1] = max(0, counts[1] - counts[3]);
    if (counts[2] % 2 != 0) {
        taxis++;
        counts[1] = max(0, counts[1] - 2);
    }
    taxis += (counts[1] + 3) / 4;
    cout << taxis;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] counts = new int[5];
        for (int i = 0; i < n; i++) counts[sc.nextInt()]++;
        int taxis = counts[4] + counts[3] + counts[2] / 2;
        counts[1] = Math.max(0, counts[1] - counts[3]);
        if (counts[2] % 2 != 0) {
            taxis++;
            counts[1] = Math.max(0, counts[1] - 2);
        }
        taxis += (counts[1] + 3) / 4;
        System.out.println(taxis);
    }
}`,
      explanation: 'Greedy match: count occurrences of groups of sizes 1, 2, 3, and 4. All size 4 groups need their own taxi. Size 3 groups pair with size 1. Size 2 groups pair with each other. Fill remaining seats with remaining size 1 groups. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-41A',
    slug: 'cf-41a',
    title: 'Translation',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Pointers & References',
    description: 'Determine if the second word `t` is the reverse of the first word `s`.\n\n**Input:** First line: `s`, second line: `t` (lowercase English letters, length ≤ 100).\n\n**Output:** Print "YES" if t is the reverse of s, "NO" otherwise.',
    constraints: ['1 ≤ |s|, |t| ≤ 100', 'Words consist of lowercase English letters.'],
    solutions: {
      python: `s = input()
t = input()
print("YES" if s[::-1] == t else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s, t; cin >> s >> t;
    reverse(s.begin(), s.end());
    cout << (s == t ? "YES" : "NO");
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next(), t = sc.next();
        String rev = new StringBuilder(s).reverse().toString();
        System.out.println(rev.equals(t) ? "YES" : "NO");
    }
}`,
      explanation: 'Reverse the first string and check if it equals the second string. Time complexity: O(n), Space complexity: O(n) for reversed storage.'
    }
  },
  {
    id: 'cf-160A',
    slug: 'cf-160a',
    title: 'Twins',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Counting Sort',
    description: 'You have `n` coins. Find the minimum number of coins you must take so that their sum is strictly greater than the sum of the remaining coins.\n\n**Input:** First line: `n`. Second line: `n` integers — the coin values.\n\n**Output:** The minimum number of coins.',
    constraints: ['1 ≤ n ≤ 100', '1 ≤ a_i ≤ 100'],
    solutions: {
      python: `n = int(input())
a = sorted(map(int, input().split()), reverse=True)
total = sum(a)
taken = 0
for i, x in enumerate(a):
    taken += x
    if taken > total - taken:
        print(i + 1)
        break`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n);
    int total = 0;
    for (int i = 0; i < n; ++i) { cin >> a[i]; total += a[i]; }
    sort(a.rbegin(), a.rend());
    int taken = 0;
    for (int i = 0; i < n; ++i) {
        taken += a[i];
        if (taken > total - taken) {
            cout << i + 1;
            return 0;
        }
    }
}`,
      java: `import java.util.Scanner;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        int total = 0;
        for (int i = 0; i < n; i++) { a[i] = sc.nextInt(); total += a[i]; }
        Arrays.sort(a);
        int taken = 0;
        for (int i = n - 1; i >= 0; i--) {
            taken += a[i];
            if (taken > total - taken) {
                System.out.println(n - i);
                return;
            }
        }
    }
}`,
      explanation: 'Greedy approach: sort the coins in descending order and greedily pick the largest coins until their sum exceeds half of the total sum of all coins. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-486A',
    slug: 'cf-486a',
    title: 'Calculating Function',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'For a positive integer `n`, let `f(n) = -1 + 2 - 3 + 4 - 5 + ... + (-1)^n * n`.\n\nCalculate `f(n)`.\n\n**Input:** An integer `n` (1 ≤ n ≤ 10^15).\n\n**Output:** Print f(n).',
    constraints: ['1 ≤ n ≤ 10^15'],
    solutions: {
      python: `n = int(input())
print(n // 2 if n % 2 == 0 else -(n + 1) // 2)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n; cin >> n;
    if (n % 2 == 0) cout << n / 2;
    else cout << -(n + 1) / 2;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        long n = new Scanner(System.in).nextLong();
        System.out.println(n % 2 == 0 ? n / 2 : -(n + 1) / 2);
    }
}`,
      explanation: 'Pair up adjacent numbers: (-1 + 2) = 1, (-3 + 4) = 1. If n is even, there are n/2 pairs of sum 1, so the result is n/2. If n is odd, the result is the sum of the first n-1 even numbers minus n, which equals -(n + 1)/2. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-344A',
    slug: 'cf-344a',
    title: 'Magnets',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Mike has `n` magnets. Each magnet is represented by either `10` or `02`. Two magnets attract if they are placed like `01` and `10`, and repel if like `10` and `10`. Count the number of groups formed.\n\n**Input:** First line: `n`. Next `n` lines contain either "10" or "01".\n\n**Output:** The number of magnet groups.',
    constraints: ['1 ≤ n ≤ 10^5'],
    solutions: {
      python: `n = int(input())
groups = 1
prev = input()
for _ in range(n - 1):
    curr = input()
    if curr != prev:
        groups += 1
        prev = curr
print(groups)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    string prev; cin >> prev;
    int groups = 1;
    for (int i = 1; i < n; ++i) {
        string curr; cin >> curr;
        if (curr != prev) {
            groups++;
            prev = curr;
        }
    }
    cout << groups;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String prev = sc.next();
        int groups = 1;
        for (int i = 1; i < n; i++) {
            String curr = sc.next();
            if (!curr.equals(prev)) {
                groups++;
                prev = curr;
            }
        }
        System.out.println(groups);
    }
}`,
      explanation: 'Iterate through all magnets and compare each magnet with the previous one. A new group starts whenever two adjacent magnets have different orientations. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-492B',
    slug: 'cf-492b',
    title: 'Vanya and Lanterns',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Pointers & References',
    description: 'Vanya walks along a street of length `l`. There are `n` lanterns at positions `a_i`. Find the minimum light radius `d` needed to light the entire street.\n\n**Input:** First line: `n` and `l`. Second line: `n` integers `a_i`.\n\n**Output:** Print the minimum radius `d` with high precision.',
    constraints: ['1 ≤ n ≤ 1000', '0 ≤ l ≤ 10^9', '0 ≤ a_i ≤ l'],
    solutions: {
      python: `n, l = map(int, input().split())
a = sorted(map(int, input().split()))
max_gap = max(a[i] - a[i - 1] for i in range(1, n)) if n > 1 else 0
ans = max(max_gap / 2, a[0], l - a[-1])
print(f"{ans:.10f}")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, l; cin >> n >> l;
    vector<int> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];
    sort(a.begin(), a.end());
    double max_gap = 0;
    for (int i = 1; i < n; ++i) max_gap = max(max_gap, (double)(a[i] - a[i - 1]));
    double ans = max({max_gap / 2.0, (double)a[0], (double)(l - a[n - 1])});
    cout << fixed << setprecision(10) << ans;
}`,
      java: `import java.util.Scanner;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), l = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        Arrays.sort(a);
        double max_gap = 0;
        for (int i = 1; i < n; i++) max_gap = Math.max(max_gap, a[i] - a[i - 1]);
        double ans = Math.max(max_gap / 2.0, Math.max(a[0], l - a[n - 1]));
        System.out.printf("%.10f\\n", ans);
    }
}`,
      explanation: 'Sort the lantern positions. The minimum radius d must cover the boundaries (a[0] at the start, l - a[n-1] at the end) and half of the maximum gap between any two adjacent lanterns (since they light towards each other). Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-230B',
    slug: 'cf-230b',
    title: 'T-primes',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'We know that prime numbers are positive integers that have exactly two distinct positive divisors. A T-prime number is a positive integer that has **exactly three** distinct positive divisors. Given `n` numbers, determine if each is a T-prime.\n\n**Input:** First line: `n`. Second line: `n` integers `x_i`.\n\n**Output:** Print "YES" if T-prime, "NO" otherwise.',
    constraints: ['1 ≤ n ≤ 10^5', '1 ≤ x_i ≤ 10^12'],
    solutions: {
      python: `import math
n = int(input())
x = list(map(int, input().split()))
LIMIT = 1000000
prime = [True] * (LIMIT + 1)
prime[0] = prime[1] = False
for p in range(2, int(math.isqrt(LIMIT)) + 1):
    if prime[p]:
        for i in range(p * p, LIMIT + 1, p):
            prime[i] = False
primes_set = {p * p for p in range(LIMIT + 1) if prime[p]}
for val in x:
    print("YES" if val in primes_set else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
const int LIMIT = 1000000;
bool is_prime[LIMIT + 1];
int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    fill(is_prime, is_prime + LIMIT + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p <= LIMIT; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i <= LIMIT; i += p) is_prime[i] = false;
        }
    }
    int n; if (cin >> n) {
        while (n--) {
            long long x; cin >> x;
            long long root = round(sqrt(x));
            if (root * root == x && is_prime[root]) cout << "YES\\n";
            else cout << "NO\\n";
        }
    }
}`,
      java: `import java.io.*;
import java.util.*;
public class Main {
    static final int LIMIT = 1000000;
    static boolean[] isPrime = new boolean[LIMIT + 1];
    public static void main(String[] args) throws IOException {
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        for (int p = 2; p * p <= LIMIT; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i <= LIMIT; i += p) isPrime[i] = false;
            }
        }
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        st = new StringTokenizer(br.readLine());
        StringBuilder sb = new StringBuilder();
        while (n-- > 0) {
            long x = Long.parseLong(st.nextToken());
            long root = (long) Math.round(Math.sqrt(x));
            if (root * root == x && isPrime[(int)root]) sb.append("YES\\n");
            else sb.append("NO\\n");
        }
        System.out.print(sb);
    }
}`,
      explanation: 'A number has exactly three divisors if and only if it is the square of a prime number. Precompute prime numbers up to 10^6 using Sieve of Eratosthenes, then check if each query x is a perfect square of a prime. Time complexity: O(LIMIT log log LIMIT + n), Space complexity: O(LIMIT).'
    }
  },
  {
    id: 'cf-451B',
    slug: 'cf-451b',
    title: 'Sort the Array',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'You are given an array of `n` distinct integers. Can you sort the array by reversing **exactly one** contiguous subarray? If yes, print the 1-based start and end indices of the subarray.\n\n**Input:** First line: `n`. Second line: `n` integers.\n\n**Output:** Print "yes" and indices, or "no" if impossible.',
    constraints: ['1 ≤ n ≤ 10^5', '1 ≤ a_i ≤ 10^9'],
    solutions: {
      python: `n = int(input())
a = list(map(int, input().split()))
sorted_a = sorted(a)
if a == sorted_a:
    print("yes")
    print("1 1")
    exit()
l = 0
while l < n and a[l] == sorted_a[l]: l += 1
r = n - 1
while r >= 0 and a[r] == sorted_a[r]: r -= 1
sub = a[l:r+1]
if sub[::-1] == sorted_a[l:r+1]:
    print("yes")
    print(f"{l+1} {r+1}")
else:
    print("no")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    vector<int> sorted_a = a;
    sort(sorted_a.begin(), sorted_a.end());
    if (a == sorted_a) { cout << "yes\\n1 1"; return 0; }
    int l = 0;
    while (l < n && a[l] == sorted_a[l]) l++;
    int r = n - 1;
    while (r >= 0 && a[r] == sorted_a[r]) r--;
    reverse(a.begin() + l, a.begin() + r + 1);
    if (a == sorted_a) cout << "yes\\n" << l + 1 << " " << r + 1;
    else cout << "no";
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        int[] sorted_a = new int[n];
        for (int i = 0; i < n; i++) { a[i] = sc.nextInt(); sorted_a[i] = a[i]; }
        Arrays.sort(sorted_a);
        if (Arrays.equals(a, sorted_a)) { System.out.println("yes\\n1 1"); return; }
        int l = 0;
        while (l < n && a[l] == sorted_a[l]) l++;
        int r = n - 1;
        while (r >= 0 && a[r] == sorted_a[r]) r--;
        // reverse subarray l to r
        for (int i = 0; i <= (r - l) / 2; i++) {
            int t = a[l + i];
            a[l + i] = a[r - i];
            a[r - i] = t;
        }
        if (Arrays.equals(a, sorted_a)) System.out.println("yes\\n" + (l + 1) + " " + (r + 1));
        else System.out.println("no");
    }
}`,
      explanation: 'Find the first index l and last index r where the array elements differ from the sorted version. Reverse the subarray [l, r] and check if the entire array becomes sorted. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-4C',
    slug: 'cf-4c',
    title: 'Registration System',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Hash Table',
    description: 'Implement a registration system. For each username requested, if it does not exist, register it and print "OK". If it already exists, append the smallest integer `i` starting from 1 to make it unique, register the new name, and print the new name.\n\n**Input:** First line: `n`. Next `n` lines contain the requested usernames.\n\n**Output:** Print the response for each requested username.',
    constraints: ['1 ≤ n ≤ 10^5', 'Requested usernames consist of lowercase English letters (length ≤ 32).'],
    solutions: {
      python: `n = int(input())
database = {}
for _ in range(n):
    name = input()
    if name not in database:
        database[name] = 0
        print("OK")
    else:
        database[name] += 1
        new_name = f"{name}{database[name]}"
        database[new_name] = 0
        print(new_name)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    unordered_map<string, int> database;
    while (n--) {
        string name; cin >> name;
        if (database.count(name) == 0) {
            database[name] = 0;
            cout << "OK\\n";
        } else {
            database[name]++;
            string new_name = name + to_string(database[name]);
            database[new_name] = 0;
            cout << new_name << "\\n";
        }
    }
}`,
      java: `import java.util.*;
import java.io.*;
public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        Map<String, Integer> database = new HashMap<>();
        StringBuilder sb = new StringBuilder();
        while (n-- > 0) {
            String name = br.readLine();
            if (!database.containsKey(name)) {
                database.put(name, 0);
                sb.append("OK\\n");
            } else {
                int count = database.get(name) + 1;
                database.put(name, count);
                String newName = name + count;
                database.put(newName, 0);
                sb.append(newName).append("\\n");
            }
        }
        System.out.print(sb);
    }
}`,
      explanation: 'Use a hash map to keep track of the count of each registered username. If the key exists, increment its count, generate the new username with the count suffix, and register it. Time complexity: O(n * L) where L is the maximum username length, Space complexity: O(n * L).'
    }
  }
];

function main() {
  const arena = JSON.parse(fs.readFileSync(ARENA_PATH, 'utf-8'));
  const existingIds = new Set(arena.map((p) => p.id));

  let added = 0;
  let skipped = 0;

  for (const problem of NEW_61_PROBLEMS) {
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
