/**
 * Add 50 MORE problems to problems_arena.json (batch 3)
 * Usage: node scripts/add-50-problems-batch3.js
 */
const fs = require('fs');
const path = require('path');
const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const NEW_PROBLEMS = [
  // ─── EASY (15) ───────────────────────────────────────────────────
  {
    id: 'lc-88', slug: 'merge-sorted-array', title: 'Merge Sorted Array', difficulty: 'Easy', source: 'LeetCode', category: 'linear', topic: 'Two Pointers',
    description: 'You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\n\nMerge `nums1` and `nums2` into a single array sorted in **non-decreasing order**.\n\nThe final sorted array should be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`.',
    constraints: ['nums1.length == m + n', 'nums2.length == n', '0 <= m, n <= 200', '1 <= m + n <= 200', '-10^9 <= nums1[i], nums2[j] <= 10^9'],
    solutions: {
      python: `class Solution:\n    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:\n        i, j, k = m - 1, n - 1, m + n - 1\n        while j >= 0:\n            if i >= 0 and nums1[i] > nums2[j]:\n                nums1[k] = nums1[i]; i -= 1\n            else:\n                nums1[k] = nums2[j]; j -= 1\n            k -= 1`,
      cpp: `class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        int i = m-1, j = n-1, k = m+n-1;\n        while (j >= 0) {\n            if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];\n            else nums1[k--] = nums2[j--];\n        }\n    }\n};`,
      java: `class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        int i = m-1, j = n-1, k = m+n-1;\n        while (j >= 0) {\n            if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];\n            else nums1[k--] = nums2[j--];\n        }\n    }\n}`,
      explanation: 'Merge from the back to avoid overwriting. Three pointers: i at end of nums1 elements, j at end of nums2, k at end of combined. O(m+n) time, O(1) space.'
    }
  },
  {
    id: 'lc-66', slug: 'plus-one', title: 'Plus One', difficulty: 'Easy', source: 'LeetCode', category: 'linear', topic: 'Array',
    description: 'You are given a **large integer** represented as an integer array `digits`, where each `digits[i]` is the `i`th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order.\n\nIncrement the large integer by one and return the resulting array of digits.',
    constraints: ['1 <= digits.length <= 100', '0 <= digits[i] <= 9', 'digits does not contain any leading 0s.'],
    solutions: {
      python: `class Solution:\n    def plusOne(self, digits: List[int]) -> List[int]:\n        for i in range(len(digits) - 1, -1, -1):\n            if digits[i] < 9:\n                digits[i] += 1\n                return digits\n            digits[i] = 0\n        return [1] + digits`,
      cpp: `class Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        for (int i = digits.size()-1; i >= 0; i--) {\n            if (digits[i] < 9) { digits[i]++; return digits; }\n            digits[i] = 0;\n        }\n        digits.insert(digits.begin(), 1);\n        return digits;\n    }\n};`,
      java: `class Solution {\n    public int[] plusOne(int[] digits) {\n        for (int i = digits.length - 1; i >= 0; i--) {\n            if (digits[i] < 9) { digits[i]++; return digits; }\n            digits[i] = 0;\n        }\n        int[] res = new int[digits.length + 1];\n        res[0] = 1;\n        return res;\n    }\n}`,
      explanation: 'Traverse from the last digit. If it is less than 9, increment and return. Otherwise set to 0 and carry. If all digits are 9, prepend 1. O(n) time.'
    }
  },
  {
    id: 'lc-58', slug: 'length-of-last-word', title: 'Length of Last Word', difficulty: 'Easy', source: 'LeetCode', category: 'linear', topic: 'Array',
    description: 'Given a string `s` consisting of words and spaces, return the **length of the last word** in the string.\n\nA **word** is a maximal substring consisting of non-space characters only.',
    constraints: ['1 <= s.length <= 10^4', 's consists of only English letters and spaces.', 'There is at least one word in s.'],
    solutions: {
      python: `class Solution:\n    def lengthOfLastWord(self, s: str) -> int:\n        return len(s.strip().split()[-1])`,
      cpp: `class Solution {\npublic:\n    int lengthOfLastWord(string s) {\n        int len = 0, i = s.size() - 1;\n        while (i >= 0 && s[i] == ' ') i--;\n        while (i >= 0 && s[i] != ' ') { len++; i--; }\n        return len;\n    }\n};`,
      java: `class Solution {\n    public int lengthOfLastWord(String s) {\n        s = s.trim();\n        return s.length() - s.lastIndexOf(' ') - 1;\n    }\n}`,
      explanation: 'Trim trailing spaces, then count characters from the end until a space is found. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-94', slug: 'binary-tree-inorder-traversal', title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', source: 'LeetCode', category: 'trees', topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree, return the **inorder traversal** of its nodes\' values.',
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    solutions: {
      python: `class Solution:\n    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:\n        result, stack = [], []\n        curr = root\n        while curr or stack:\n            while curr:\n                stack.append(curr)\n                curr = curr.left\n            curr = stack.pop()\n            result.append(curr.val)\n            curr = curr.right\n        return result`,
      cpp: `class Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        vector<int> res;\n        stack<TreeNode*> st;\n        TreeNode* curr = root;\n        while (curr || !st.empty()) {\n            while (curr) { st.push(curr); curr = curr->left; }\n            curr = st.top(); st.pop();\n            res.push_back(curr->val);\n            curr = curr->right;\n        }\n        return res;\n    }\n};`,
      java: `class Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        List<Integer> res = new ArrayList<>();\n        Deque<TreeNode> stack = new ArrayDeque<>();\n        TreeNode curr = root;\n        while (curr != null || !stack.isEmpty()) {\n            while (curr != null) { stack.push(curr); curr = curr.left; }\n            curr = stack.pop();\n            res.add(curr.val);\n            curr = curr.right;\n        }\n        return res;\n    }\n}`,
      explanation: 'Iterative inorder using a stack: go left as far as possible, visit node, then go right. O(n) time, O(h) space.'
    }
  },
  {
    id: 'lc-100', slug: 'same-tree', title: 'Same Tree', difficulty: 'Easy', source: 'LeetCode', category: 'trees', topic: 'Binary Tree',
    description: 'Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.',
    constraints: ['The number of nodes in both trees is in the range [0, 100].', '-10^4 <= Node.val <= 10^4'],
    solutions: {
      python: `class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        if not p and not q: return True\n        if not p or not q: return False\n        return p.val == q.val and self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`,
      cpp: `class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        if (!p && !q) return true;\n        if (!p || !q) return false;\n        return p->val == q->val && isSameTree(p->left, q->left) && isSameTree(p->right, q->right);\n    }\n};`,
      java: `class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        if (p == null && q == null) return true;\n        if (p == null || q == null) return false;\n        return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n    }\n}`,
      explanation: 'Recursive comparison: both null → same. One null → different. Values differ → different. Otherwise recurse on children. O(n) time, O(h) space.'
    }
  },
  {
    id: 'lc-101', slug: 'symmetric-tree', title: 'Symmetric Tree', difficulty: 'Easy', source: 'LeetCode', category: 'trees', topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree, check whether it is a **mirror of itself** (i.e., symmetric around its center).',
    constraints: ['The number of nodes in the tree is in the range [1, 1000].', '-100 <= Node.val <= 100'],
    solutions: {
      python: `class Solution:\n    def isSymmetric(self, root: Optional[TreeNode]) -> bool:\n        def mirror(a, b):\n            if not a and not b: return True\n            if not a or not b: return False\n            return a.val == b.val and mirror(a.left, b.right) and mirror(a.right, b.left)\n        return mirror(root.left, root.right)`,
      cpp: `class Solution {\npublic:\n    bool isSymmetric(TreeNode* root) {\n        return mirror(root->left, root->right);\n    }\n    bool mirror(TreeNode* a, TreeNode* b) {\n        if (!a && !b) return true;\n        if (!a || !b) return false;\n        return a->val == b->val && mirror(a->left, b->right) && mirror(a->right, b->left);\n    }\n};`,
      java: `class Solution {\n    public boolean isSymmetric(TreeNode root) {\n        return mirror(root.left, root.right);\n    }\n    private boolean mirror(TreeNode a, TreeNode b) {\n        if (a == null && b == null) return true;\n        if (a == null || b == null) return false;\n        return a.val == b.val && mirror(a.left, b.right) && mirror(a.right, b.left);\n    }\n}`,
      explanation: 'Check if left subtree mirrors right subtree: compare a.left with b.right and a.right with b.left recursively. O(n) time, O(h) space.'
    }
  },
  {
    id: 'lc-108', slug: 'convert-sorted-array-to-binary-search-tree', title: 'Convert Sorted Array to BST', difficulty: 'Easy', source: 'LeetCode', category: 'trees', topic: 'Binary Search Tree',
    description: 'Given an integer array `nums` where the elements are sorted in **ascending order**, convert it to a **height-balanced** binary search tree.',
    constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums is sorted in a strictly increasing order.'],
    solutions: {
      python: `class Solution:\n    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:\n        def build(lo, hi):\n            if lo > hi: return None\n            mid = (lo + hi) // 2\n            node = TreeNode(nums[mid])\n            node.left = build(lo, mid - 1)\n            node.right = build(mid + 1, hi)\n            return node\n        return build(0, len(nums) - 1)`,
      cpp: `class Solution {\npublic:\n    TreeNode* sortedArrayToBST(vector<int>& nums) {\n        return build(nums, 0, nums.size() - 1);\n    }\n    TreeNode* build(vector<int>& nums, int lo, int hi) {\n        if (lo > hi) return nullptr;\n        int mid = lo + (hi - lo) / 2;\n        auto* node = new TreeNode(nums[mid]);\n        node->left = build(nums, lo, mid - 1);\n        node->right = build(nums, mid + 1, hi);\n        return node;\n    }\n};`,
      java: `class Solution {\n    public TreeNode sortedArrayToBST(int[] nums) {\n        return build(nums, 0, nums.length - 1);\n    }\n    private TreeNode build(int[] nums, int lo, int hi) {\n        if (lo > hi) return null;\n        int mid = lo + (hi - lo) / 2;\n        TreeNode node = new TreeNode(nums[mid]);\n        node.left = build(nums, lo, mid - 1);\n        node.right = build(nums, mid + 1, hi);\n        return node;\n    }\n}`,
      explanation: 'Pick the middle element as root (ensures balance). Recursively build left subtree from left half and right subtree from right half. O(n) time, O(log n) space.'
    }
  },
  {
    id: 'lc-110', slug: 'balanced-binary-tree', title: 'Balanced Binary Tree', difficulty: 'Easy', source: 'LeetCode', category: 'trees', topic: 'Binary Tree',
    description: 'Given a binary tree, determine if it is **height-balanced**.\n\nA height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.',
    constraints: ['The number of nodes in the tree is in the range [0, 5000].', '-10^4 <= Node.val <= 10^4'],
    solutions: {
      python: `class Solution:\n    def isBalanced(self, root: Optional[TreeNode]) -> bool:\n        def height(node):\n            if not node: return 0\n            l, r = height(node.left), height(node.right)\n            if l == -1 or r == -1 or abs(l - r) > 1: return -1\n            return max(l, r) + 1\n        return height(root) != -1`,
      cpp: `class Solution {\npublic:\n    bool isBalanced(TreeNode* root) { return height(root) != -1; }\n    int height(TreeNode* node) {\n        if (!node) return 0;\n        int l = height(node->left), r = height(node->right);\n        if (l == -1 || r == -1 || abs(l-r) > 1) return -1;\n        return max(l, r) + 1;\n    }\n};`,
      java: `class Solution {\n    public boolean isBalanced(TreeNode root) { return height(root) != -1; }\n    private int height(TreeNode node) {\n        if (node == null) return 0;\n        int l = height(node.left), r = height(node.right);\n        if (l == -1 || r == -1 || Math.abs(l-r) > 1) return -1;\n        return Math.max(l, r) + 1;\n    }\n}`,
      explanation: 'Bottom-up approach: return -1 if unbalanced (early termination), otherwise return height. O(n) time, O(h) space.'
    }
  },
  {
    id: 'lc-118', slug: 'pascals-triangle', title: "Pascal's Triangle", difficulty: 'Easy', source: 'LeetCode', category: 'linear', topic: 'Array',
    description: "Given an integer `numRows`, return the first `numRows` of **Pascal's triangle**.\n\nIn Pascal's triangle, each number is the sum of the two numbers directly above it.",
    constraints: ['1 <= numRows <= 30'],
    solutions: {
      python: `class Solution:\n    def generate(self, numRows: int) -> List[List[int]]:\n        tri = [[1]]\n        for i in range(1, numRows):\n            row = [1]\n            for j in range(1, i):\n                row.append(tri[i-1][j-1] + tri[i-1][j])\n            row.append(1)\n            tri.append(row)\n        return tri`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> generate(int numRows) {\n        vector<vector<int>> tri = {{1}};\n        for (int i = 1; i < numRows; i++) {\n            vector<int> row = {1};\n            for (int j = 1; j < i; j++) row.push_back(tri[i-1][j-1] + tri[i-1][j]);\n            row.push_back(1);\n            tri.push_back(row);\n        }\n        return tri;\n    }\n};`,
      java: `class Solution {\n    public List<List<Integer>> generate(int numRows) {\n        List<List<Integer>> tri = new ArrayList<>();\n        tri.add(List.of(1));\n        for (int i = 1; i < numRows; i++) {\n            List<Integer> row = new ArrayList<>();\n            row.add(1);\n            for (int j = 1; j < i; j++) row.add(tri.get(i-1).get(j-1) + tri.get(i-1).get(j));\n            row.add(1);\n            tri.add(row);\n        }\n        return tri;\n    }\n}`,
      explanation: "Build row by row. Each element is the sum of two elements from the previous row. First and last elements are always 1. O(n^2) time."
    }
  },
  {
    id: 'lc-160', slug: 'intersection-of-two-linked-lists', title: 'Intersection of Two Linked Lists', difficulty: 'Easy', source: 'LeetCode', category: 'linear', topic: 'Linked List',
    description: 'Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists **intersect**. If the two linked lists have no intersection at all, return `null`.',
    constraints: ['The number of nodes of listA is m.', 'The number of nodes of listB is n.', '1 <= m, n <= 3 * 10^4', '1 <= Node.val <= 10^5'],
    solutions: {
      python: `class Solution:\n    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:\n        a, b = headA, headB\n        while a != b:\n            a = a.next if a else headB\n            b = b.next if b else headA\n        return a`,
      cpp: `class Solution {\npublic:\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\n        ListNode *a = headA, *b = headB;\n        while (a != b) {\n            a = a ? a->next : headB;\n            b = b ? b->next : headA;\n        }\n        return a;\n    }\n};`,
      java: `public class Solution {\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        ListNode a = headA, b = headB;\n        while (a != b) {\n            a = (a != null) ? a.next : headB;\n            b = (b != null) ? b.next : headA;\n        }\n        return a;\n    }\n}`,
      explanation: 'Two pointers traverse both lists. When one reaches the end, redirect to the other list head. They meet at the intersection (or both reach null). O(m+n) time, O(1) space.'
    }
  },
  {
    id: 'lc-234', slug: 'palindrome-linked-list', title: 'Palindrome Linked List', difficulty: 'Easy', source: 'LeetCode', category: 'linear', topic: 'Fast and Slow Pointers',
    description: 'Given the `head` of a singly linked list, return `true` if it is a **palindrome** or `false` otherwise.',
    constraints: ['The number of nodes in the list is in the range [1, 10^5].', '0 <= Node.val <= 9'],
    solutions: {
      python: `class Solution:\n    def isPalindrome(self, head: Optional[ListNode]) -> bool:\n        slow = fast = head\n        while fast and fast.next:\n            slow, fast = slow.next, fast.next.next\n        prev = None\n        while slow:\n            slow.next, prev, slow = prev, slow, slow.next\n        while prev:\n            if head.val != prev.val: return False\n            head, prev = head.next, prev.next\n        return True`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }\n        ListNode *prev = nullptr;\n        while (slow) { auto nxt = slow->next; slow->next = prev; prev = slow; slow = nxt; }\n        while (prev) {\n            if (head->val != prev->val) return false;\n            head = head->next; prev = prev->next;\n        }\n        return true;\n    }\n};`,
      java: `class Solution {\n    public boolean isPalindrome(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }\n        ListNode prev = null;\n        while (slow != null) { ListNode nxt = slow.next; slow.next = prev; prev = slow; slow = nxt; }\n        while (prev != null) {\n            if (head.val != prev.val) return false;\n            head = head.next; prev = prev.next;\n        }\n        return true;\n    }\n}`,
      explanation: 'Find middle with slow/fast pointers, reverse second half, compare both halves. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-283', slug: 'move-zeroes', title: 'Move Zeroes', difficulty: 'Easy', source: 'LeetCode', category: 'linear', topic: 'Two Pointers',
    description: 'Given an integer array `nums`, move all `0`s to the **end** of it while maintaining the relative order of the non-zero elements.\n\n**Note** that you must do this in-place without making a copy of the array.',
    constraints: ['1 <= nums.length <= 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
    solutions: {
      python: `class Solution:\n    def moveZeroes(self, nums: List[int]) -> None:\n        k = 0\n        for i in range(len(nums)):\n            if nums[i] != 0:\n                nums[k], nums[i] = nums[i], nums[k]\n                k += 1`,
      cpp: `class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        int k = 0;\n        for (int i = 0; i < nums.size(); i++)\n            if (nums[i] != 0) swap(nums[k++], nums[i]);\n    }\n};`,
      java: `class Solution {\n    public void moveZeroes(int[] nums) {\n        int k = 0;\n        for (int i = 0; i < nums.length; i++)\n            if (nums[i] != 0) { int t = nums[k]; nums[k++] = nums[i]; nums[i] = t; }\n    }\n}`,
      explanation: 'Swap non-zero elements to the front using a write pointer k. All remaining positions become 0. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-344', slug: 'reverse-string', title: 'Reverse String', difficulty: 'Easy', source: 'LeetCode', category: 'linear', topic: 'Two Pointers',
    description: 'Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array **in-place** with `O(1)` extra memory.',
    constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ascii character.'],
    solutions: {
      python: `class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        l, r = 0, len(s) - 1\n        while l < r:\n            s[l], s[r] = s[r], s[l]\n            l += 1; r -= 1`,
      cpp: `class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        int l = 0, r = s.size() - 1;\n        while (l < r) swap(s[l++], s[r--]);\n    }\n};`,
      java: `class Solution {\n    public void reverseString(char[] s) {\n        int l = 0, r = s.length - 1;\n        while (l < r) { char t = s[l]; s[l++] = s[r]; s[r--] = t; }\n    }\n}`,
      explanation: 'Two pointers from both ends swapping towards the center. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-383', slug: 'ransom-note', title: 'Ransom Note', difficulty: 'Easy', source: 'LeetCode', category: 'foundations', topic: 'Counting Sort',
    description: 'Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine` and `false` otherwise.\n\nEach letter in `magazine` can only be used once in `ransomNote`.',
    constraints: ['1 <= ransomNote.length, magazine.length <= 10^5', 'ransomNote and magazine consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:\n    def canConstruct(self, ransomNote: str, magazine: str) -> bool:\n        from collections import Counter\n        return not (Counter(ransomNote) - Counter(magazine))`,
      cpp: `class Solution {\npublic:\n    bool canConstruct(string ransomNote, string magazine) {\n        int cnt[26] = {};\n        for (char c : magazine) cnt[c-'a']++;\n        for (char c : ransomNote) if (--cnt[c-'a'] < 0) return false;\n        return true;\n    }\n};`,
      java: `class Solution {\n    public boolean canConstruct(String ransomNote, String magazine) {\n        int[] cnt = new int[26];\n        for (char c : magazine.toCharArray()) cnt[c-'a']++;\n        for (char c : ransomNote.toCharArray()) if (--cnt[c-'a'] < 0) return false;\n        return true;\n    }\n}`,
      explanation: 'Count character frequencies in magazine. For each character in ransomNote, decrement. If any goes negative, return false. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-392', slug: 'is-subsequence', title: 'Is Subsequence', difficulty: 'Easy', source: 'LeetCode', category: 'linear', topic: 'Two Pointers',
    description: 'Given two strings `s` and `t`, return `true` if `s` is a **subsequence** of `t`, or `false` otherwise.\n\nA subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.',
    constraints: ['0 <= s.length <= 100', '0 <= t.length <= 10^4', 's and t consist only of lowercase English letters.'],
    solutions: {
      python: `class Solution:\n    def isSubsequence(self, s: str, t: str) -> bool:\n        i = 0\n        for c in t:\n            if i < len(s) and s[i] == c:\n                i += 1\n        return i == len(s)`,
      cpp: `class Solution {\npublic:\n    bool isSubsequence(string s, string t) {\n        int i = 0;\n        for (char c : t) if (i < s.size() && s[i] == c) i++;\n        return i == s.size();\n    }\n};`,
      java: `class Solution {\n    public boolean isSubsequence(String s, String t) {\n        int i = 0;\n        for (char c : t.toCharArray()) if (i < s.length() && s.charAt(i) == c) i++;\n        return i == s.length();\n    }\n}`,
      explanation: 'Use a pointer on s. Scan through t; whenever a character matches s[i], advance i. If i reaches end of s, it is a subsequence. O(n) time, O(1) space.'
    }
  },
  // ─── MEDIUM (25) ─────────────────────────────────────────────────
  {
    id: 'lc-45', slug: 'jump-game-ii', title: 'Jump Game II', difficulty: 'Medium', source: 'LeetCode', category: 'patterns', topic: 'Dynamic Programming',
    description: 'You are given a **0-indexed** array of integers `nums` of length `n`. You are initially positioned at `nums[0]`.\n\nEach element `nums[i]` represents the maximum length of a forward jump from index `i`.\n\nReturn the **minimum number of jumps** to reach `nums[n - 1]`.',
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 1000', "It's guaranteed that you can reach nums[n - 1]."],
    solutions: {
      python: `class Solution:\n    def jump(self, nums: List[int]) -> int:\n        jumps = cur_end = farthest = 0\n        for i in range(len(nums) - 1):\n            farthest = max(farthest, i + nums[i])\n            if i == cur_end:\n                jumps += 1\n                cur_end = farthest\n        return jumps`,
      cpp: `class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        int jumps = 0, curEnd = 0, farthest = 0;\n        for (int i = 0; i < nums.size() - 1; i++) {\n            farthest = max(farthest, i + nums[i]);\n            if (i == curEnd) { jumps++; curEnd = farthest; }\n        }\n        return jumps;\n    }\n};`,
      java: `class Solution {\n    public int jump(int[] nums) {\n        int jumps = 0, curEnd = 0, farthest = 0;\n        for (int i = 0; i < nums.length - 1; i++) {\n            farthest = Math.max(farthest, i + nums[i]);\n            if (i == curEnd) { jumps++; curEnd = farthest; }\n        }\n        return jumps;\n    }\n}`,
      explanation: 'Greedy BFS-like approach. Track the farthest reachable index. When we reach the end of the current jump range, take a new jump. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-74', slug: 'search-a-2d-matrix', title: 'Search a 2D Matrix', difficulty: 'Medium', source: 'LeetCode', category: 'algorithms', topic: 'Binary Search',
    description: 'You are given an `m x n` integer matrix `matrix` with the following two properties:\n- Each row is sorted in non-decreasing order.\n- The first integer of each row is greater than the last integer of the previous row.\n\nGiven an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise. You must write a solution in `O(log(m * n))` time complexity.',
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 100', '-10^4 <= matrix[i][j], target <= 10^4'],
    solutions: {
      python: `class Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        m, n = len(matrix), len(matrix[0])\n        lo, hi = 0, m * n - 1\n        while lo <= hi:\n            mid = (lo + hi) // 2\n            val = matrix[mid // n][mid % n]\n            if val == target: return True\n            elif val < target: lo = mid + 1\n            else: hi = mid - 1\n        return False`,
      cpp: `class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        int m = matrix.size(), n = matrix[0].size();\n        int lo = 0, hi = m * n - 1;\n        while (lo <= hi) {\n            int mid = lo + (hi - lo) / 2;\n            int val = matrix[mid / n][mid % n];\n            if (val == target) return true;\n            else if (val < target) lo = mid + 1;\n            else hi = mid - 1;\n        }\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        int m = matrix.length, n = matrix[0].length;\n        int lo = 0, hi = m * n - 1;\n        while (lo <= hi) {\n            int mid = lo + (hi - lo) / 2;\n            int val = matrix[mid / n][mid % n];\n            if (val == target) return true;\n            else if (val < target) lo = mid + 1;\n            else hi = mid - 1;\n        }\n        return false;\n    }\n}`,
      explanation: 'Treat the 2D matrix as a flat sorted array. Binary search on virtual index [0, m*n-1], converting to row/col with divmod. O(log(m*n)) time.'
    }
  },
  {
    id: 'lc-91', slug: 'decode-ways', title: 'Decode Ways', difficulty: 'Medium', source: 'LeetCode', category: 'patterns', topic: 'Dynamic Programming',
    description: 'A message containing letters from `A-Z` can be **encoded** into numbers using the mapping: `A -> 1, B -> 2, ..., Z -> 26`.\n\nGiven a string `s` containing only digits, return the **number of ways** to decode it.',
    constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zeros.'],
    solutions: {
      python: `class Solution:\n    def numDecodings(self, s: str) -> int:\n        if not s or s[0] == '0': return 0\n        n = len(s)\n        dp = [0] * (n + 1)\n        dp[0] = dp[1] = 1\n        for i in range(2, n + 1):\n            if s[i-1] != '0': dp[i] += dp[i-1]\n            two = int(s[i-2:i])\n            if 10 <= two <= 26: dp[i] += dp[i-2]\n        return dp[n]`,
      cpp: `class Solution {\npublic:\n    int numDecodings(string s) {\n        if (s[0] == '0') return 0;\n        int n = s.size();\n        vector<int> dp(n+1, 0);\n        dp[0] = dp[1] = 1;\n        for (int i = 2; i <= n; i++) {\n            if (s[i-1] != '0') dp[i] += dp[i-1];\n            int two = stoi(s.substr(i-2, 2));\n            if (two >= 10 && two <= 26) dp[i] += dp[i-2];\n        }\n        return dp[n];\n    }\n};`,
      java: `class Solution {\n    public int numDecodings(String s) {\n        if (s.charAt(0) == '0') return 0;\n        int n = s.length();\n        int[] dp = new int[n + 1];\n        dp[0] = dp[1] = 1;\n        for (int i = 2; i <= n; i++) {\n            if (s.charAt(i-1) != '0') dp[i] += dp[i-1];\n            int two = Integer.parseInt(s.substring(i-2, i));\n            if (two >= 10 && two <= 26) dp[i] += dp[i-2];\n        }\n        return dp[n];\n    }\n}`,
      explanation: 'DP: dp[i] = ways to decode s[0..i-1]. A single digit (1-9) adds dp[i-1]. A two-digit number (10-26) adds dp[i-2]. O(n) time, O(n) space.'
    }
  },
  {
    id: 'lc-130', slug: 'surrounded-regions', title: 'Surrounded Regions', difficulty: 'Medium', source: 'LeetCode', category: 'graphs', topic: 'DFS',
    description: 'Given an `m x n` matrix `board` containing `X` and `O`, capture all regions that are **4-directionally surrounded** by `X`.\n\nA region is captured by flipping all `O`s into `X`s in that surrounded region.',
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 200', "board[i][j] is 'X' or 'O'."],
    solutions: {
      python: `class Solution:\n    def solve(self, board: List[List[str]]) -> None:\n        m, n = len(board), len(board[0])\n        def dfs(r, c):\n            if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != 'O': return\n            board[r][c] = 'S'\n            dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)\n        for r in range(m):\n            for c in range(n):\n                if (r in (0, m-1) or c in (0, n-1)) and board[r][c] == 'O':\n                    dfs(r, c)\n        for r in range(m):\n            for c in range(n):\n                if board[r][c] == 'O': board[r][c] = 'X'\n                elif board[r][c] == 'S': board[r][c] = 'O'`,
      cpp: `class Solution {\npublic:\n    void solve(vector<vector<char>>& board) {\n        int m = board.size(), n = board[0].size();\n        function<void(int,int)> dfs = [&](int r, int c) {\n            if (r<0||r>=m||c<0||c>=n||board[r][c]!='O') return;\n            board[r][c] = 'S';\n            dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);\n        };\n        for (int r=0;r<m;r++) for (int c=0;c<n;c++)\n            if ((r==0||r==m-1||c==0||c==n-1)&&board[r][c]=='O') dfs(r,c);\n        for (auto& row:board) for (auto& c:row) { if (c=='O') c='X'; else if (c=='S') c='O'; }\n    }\n};`,
      java: `class Solution {\n    public void solve(char[][] board) {\n        int m = board.length, n = board[0].length;\n        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++)\n            if ((r==0||r==m-1||c==0||c==n-1)&&board[r][c]=='O') dfs(board,r,c,m,n);\n        for (int r=0;r<m;r++) for (int c=0;c<n;c++) {\n            if (board[r][c]=='O') board[r][c]='X';\n            else if (board[r][c]=='S') board[r][c]='O';\n        }\n    }\n    void dfs(char[][] b, int r, int c, int m, int n) {\n        if (r<0||r>=m||c<0||c>=n||b[r][c]!='O') return;\n        b[r][c]='S'; dfs(b,r+1,c,m,n); dfs(b,r-1,c,m,n); dfs(b,r,c+1,m,n); dfs(b,r,c-1,m,n);\n    }\n}`,
      explanation: 'DFS from border Os, marking them safe. Then flip remaining Os to X (captured) and restore safe cells. O(m*n) time.'
    }
  },
  {
    id: 'lc-133', slug: 'clone-graph', title: 'Clone Graph', difficulty: 'Medium', source: 'LeetCode', category: 'graphs', topic: 'DFS',
    description: 'Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph.\n\nEach node in the graph contains a value (`int`) and a list of its neighbors.',
    constraints: ['The number of nodes in the graph is in the range [0, 100].', '1 <= Node.val <= 100', 'Node.val is unique for each node.', 'There are no repeated edges and no self-loops.', 'The Graph is connected.'],
    solutions: {
      python: `class Solution:\n    def cloneGraph(self, node: 'Node') -> 'Node':\n        if not node: return None\n        clones = {}\n        def dfs(n):\n            if n in clones: return clones[n]\n            copy = Node(n.val)\n            clones[n] = copy\n            for nb in n.neighbors:\n                copy.neighbors.append(dfs(nb))\n            return copy\n        return dfs(node)`,
      cpp: `class Solution {\npublic:\n    unordered_map<Node*, Node*> clones;\n    Node* cloneGraph(Node* node) {\n        if (!node) return nullptr;\n        if (clones.count(node)) return clones[node];\n        auto* copy = new Node(node->val);\n        clones[node] = copy;\n        for (auto* nb : node->neighbors)\n            copy->neighbors.push_back(cloneGraph(nb));\n        return copy;\n    }\n};`,
      java: `class Solution {\n    Map<Node, Node> clones = new HashMap<>();\n    public Node cloneGraph(Node node) {\n        if (node == null) return null;\n        if (clones.containsKey(node)) return clones.get(node);\n        Node copy = new Node(node.val);\n        clones.put(node, copy);\n        for (Node nb : node.neighbors) copy.neighbors.add(cloneGraph(nb));\n        return copy;\n    }\n}`,
      explanation: 'DFS with a hashmap mapping original → clone. If already cloned, return existing clone. Otherwise create new node and recurse on neighbors. O(V+E) time.'
    }
  },
  {
    id: 'lc-134', slug: 'gas-station', title: 'Gas Station', difficulty: 'Medium', source: 'LeetCode', category: 'patterns', topic: 'Array',
    description: 'There are `n` gas stations along a circular route, where the amount of gas at the `i`th station is `gas[i]`.\n\nYou have a car with an unlimited size gas tank and it costs `cost[i]` of gas to travel from the `i`th station to its next `(i + 1)`th station.\n\nReturn the starting gas station\'s index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`. If there exists a solution, it is **guaranteed** to be **unique**.',
    constraints: ['n == gas.length == cost.length', '1 <= n <= 10^5', '0 <= gas[i], cost[i] <= 10^4'],
    solutions: {
      python: `class Solution:\n    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:\n        if sum(gas) < sum(cost): return -1\n        tank = start = 0\n        for i in range(len(gas)):\n            tank += gas[i] - cost[i]\n            if tank < 0:\n                tank = 0\n                start = i + 1\n        return start`,
      cpp: `class Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        int total = 0, tank = 0, start = 0;\n        for (int i = 0; i < gas.size(); i++) {\n            total += gas[i] - cost[i];\n            tank += gas[i] - cost[i];\n            if (tank < 0) { tank = 0; start = i + 1; }\n        }\n        return total >= 0 ? start : -1;\n    }\n};`,
      java: `class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        int total = 0, tank = 0, start = 0;\n        for (int i = 0; i < gas.length; i++) {\n            total += gas[i] - cost[i];\n            tank += gas[i] - cost[i];\n            if (tank < 0) { tank = 0; start = i + 1; }\n        }\n        return total >= 0 ? start : -1;\n    }\n}`,
      explanation: 'Greedy: if total gas >= total cost, solution exists. Track current tank; when it goes negative, reset start to next station. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-146', slug: 'lru-cache', title: 'LRU Cache', difficulty: 'Medium', source: 'LeetCode', category: 'algorithms', topic: 'Linked List',
    description: 'Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)` Initialize the LRU cache with **positive** size `capacity`.\n- `int get(int key)` Return the value of the `key` if it exists, otherwise return `-1`.\n- `void put(int key, int value)` Update the value of the `key` if it exists. Otherwise, add the key-value pair. If the number of keys exceeds the `capacity`, **evict** the least recently used key.',
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls will be made to get and put.'],
    solutions: {
      python: `class LRUCache:\n    def __init__(self, capacity: int):\n        from collections import OrderedDict\n        self.cache = OrderedDict()\n        self.cap = capacity\n\n    def get(self, key: int) -> int:\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)`,
      cpp: `class LRUCache {\n    int cap;\n    list<pair<int,int>> dll;\n    unordered_map<int, list<pair<int,int>>::iterator> map;\npublic:\n    LRUCache(int capacity) : cap(capacity) {}\n    int get(int key) {\n        if (!map.count(key)) return -1;\n        dll.splice(dll.end(), dll, map[key]);\n        return map[key]->second;\n    }\n    void put(int key, int value) {\n        if (map.count(key)) { dll.erase(map[key]); }\n        dll.push_back({key, value});\n        map[key] = prev(dll.end());\n        if (dll.size() > cap) { map.erase(dll.front().first); dll.pop_front(); }\n    }\n};`,
      java: `class LRUCache extends LinkedHashMap<Integer, Integer> {\n    private int cap;\n    public LRUCache(int capacity) {\n        super(capacity, 0.75f, true);\n        this.cap = capacity;\n    }\n    public int get(int key) { return super.getOrDefault(key, -1); }\n    public void put(int key, int value) { super.put(key, value); }\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {\n        return size() > cap;\n    }\n}`,
      explanation: 'Doubly linked list + hashmap. DLL maintains order (most recent at tail). HashMap provides O(1) key lookup. Get moves node to tail. Put evicts head if over capacity. O(1) for both operations.'
    }
  },
  {
    id: 'lc-148', slug: 'sort-list', title: 'Sort List', difficulty: 'Medium', source: 'LeetCode', category: 'algorithms', topic: 'Merge Sort',
    description: 'Given the `head` of a linked list, return the list after sorting it in **ascending order**.',
    constraints: ['The number of nodes in the list is in the range [0, 5 * 10^4].', '-10^5 <= Node.val <= 10^5'],
    solutions: {
      python: `class Solution:\n    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        if not head or not head.next: return head\n        slow, fast = head, head.next\n        while fast and fast.next: slow, fast = slow.next, fast.next.next\n        mid = slow.next; slow.next = None\n        l, r = self.sortList(head), self.sortList(mid)\n        dummy = curr = ListNode(0)\n        while l and r:\n            if l.val <= r.val: curr.next = l; l = l.next\n            else: curr.next = r; r = r.next\n            curr = curr.next\n        curr.next = l or r\n        return dummy.next`,
      cpp: `class Solution {\npublic:\n    ListNode* sortList(ListNode* head) {\n        if (!head || !head->next) return head;\n        ListNode *slow = head, *fast = head->next;\n        while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }\n        ListNode* mid = slow->next; slow->next = nullptr;\n        return merge(sortList(head), sortList(mid));\n    }\n    ListNode* merge(ListNode* l, ListNode* r) {\n        ListNode dummy(0), *curr = &dummy;\n        while (l && r) {\n            if (l->val <= r->val) { curr->next = l; l = l->next; }\n            else { curr->next = r; r = r->next; }\n            curr = curr->next;\n        }\n        curr->next = l ? l : r;\n        return dummy.next;\n    }\n};`,
      java: `class Solution {\n    public ListNode sortList(ListNode head) {\n        if (head == null || head.next == null) return head;\n        ListNode slow = head, fast = head.next;\n        while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }\n        ListNode mid = slow.next; slow.next = null;\n        ListNode l = sortList(head), r = sortList(mid);\n        ListNode dummy = new ListNode(0), curr = dummy;\n        while (l != null && r != null) {\n            if (l.val <= r.val) { curr.next = l; l = l.next; }\n            else { curr.next = r; r = r.next; }\n            curr = curr.next;\n        }\n        curr.next = (l != null) ? l : r;\n        return dummy.next;\n    }\n}`,
      explanation: 'Merge sort on linked list: find middle with slow/fast, split, sort both halves recursively, merge. O(n log n) time, O(log n) space.'
    }
  },
  {
    id: 'lc-150', slug: 'evaluate-reverse-polish-notation', title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', source: 'LeetCode', category: 'linear', topic: 'Stack',
    description: 'You are given an array of strings `tokens` that represents an arithmetic expression in **Reverse Polish Notation**.\n\nEvaluate the expression. Return an integer that represents the value of the expression.',
    constraints: ['1 <= tokens.length <= 10^4', 'tokens[i] is either an operator (+, -, *, /) or an integer in the range [-200, 200].'],
    solutions: {
      python: `class Solution:\n    def evalRPN(self, tokens: List[str]) -> int:\n        stack = []\n        for t in tokens:\n            if t in '+-*/':\n                b, a = stack.pop(), stack.pop()\n                if t == '+': stack.append(a + b)\n                elif t == '-': stack.append(a - b)\n                elif t == '*': stack.append(a * b)\n                else: stack.append(int(a / b))\n            else:\n                stack.append(int(t))\n        return stack[0]`,
      cpp: `class Solution {\npublic:\n    int evalRPN(vector<string>& tokens) {\n        stack<int> st;\n        for (auto& t : tokens) {\n            if (t == "+" || t == "-" || t == "*" || t == "/") {\n                int b = st.top(); st.pop(); int a = st.top(); st.pop();\n                if (t == "+") st.push(a+b); else if (t == "-") st.push(a-b);\n                else if (t == "*") st.push(a*b); else st.push(a/b);\n            } else st.push(stoi(t));\n        }\n        return st.top();\n    }\n};`,
      java: `class Solution {\n    public int evalRPN(String[] tokens) {\n        Deque<Integer> stack = new ArrayDeque<>();\n        for (String t : tokens) {\n            if ("+-*/".contains(t)) {\n                int b = stack.pop(), a = stack.pop();\n                switch (t) { case "+": stack.push(a+b); break; case "-": stack.push(a-b); break;\n                    case "*": stack.push(a*b); break; case "/": stack.push(a/b); break; }\n            } else stack.push(Integer.parseInt(t));\n        }\n        return stack.peek();\n    }\n}`,
      explanation: 'Use a stack. Push numbers. On operator, pop two operands, compute, push result. Final stack top is the answer. O(n) time, O(n) space.'
    }
  },
  {
    id: 'lc-153', slug: 'find-minimum-in-rotated-sorted-array', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', source: 'LeetCode', category: 'algorithms', topic: 'Binary Search',
    description: 'Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. Given the sorted rotated array `nums` of **unique** elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in `O(log n)` time.',
    constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All the integers of nums are unique.', 'nums is sorted and rotated between 1 and n times.'],
    solutions: {
      python: `class Solution:\n    def findMin(self, nums: List[int]) -> int:\n        lo, hi = 0, len(nums) - 1\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if nums[mid] > nums[hi]: lo = mid + 1\n            else: hi = mid\n        return nums[lo]`,
      cpp: `class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        int lo = 0, hi = nums.size() - 1;\n        while (lo < hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (nums[mid] > nums[hi]) lo = mid + 1;\n            else hi = mid;\n        }\n        return nums[lo];\n    }\n};`,
      java: `class Solution {\n    public int findMin(int[] nums) {\n        int lo = 0, hi = nums.length - 1;\n        while (lo < hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (nums[mid] > nums[hi]) lo = mid + 1;\n            else hi = mid;\n        }\n        return nums[lo];\n    }\n}`,
      explanation: 'Binary search: if mid > hi, minimum is in right half. Otherwise minimum is in left half (including mid). O(log n) time.'
    }
  },
  {
    id: 'lc-167', slug: 'two-sum-ii-input-array-is-sorted', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', source: 'LeetCode', category: 'linear', topic: 'Two Pointers',
    description: 'Given a **1-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific `target` number.\n\nReturn the indices of the two numbers, `index1` and `index2`, **added by one** as an integer array `[index1, index2]` of length 2.',
    constraints: ['2 <= numbers.length <= 3 * 10^4', '-1000 <= numbers[i] <= 1000', 'numbers is sorted in non-decreasing order.', '-1000 <= target <= 1000', 'The tests are generated such that there is exactly one solution.'],
    solutions: {
      python: `class Solution:\n    def twoSum(self, numbers: List[int], target: int) -> List[int]:\n        l, r = 0, len(numbers) - 1\n        while l < r:\n            s = numbers[l] + numbers[r]\n            if s == target: return [l + 1, r + 1]\n            elif s < target: l += 1\n            else: r -= 1`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        int l = 0, r = numbers.size() - 1;\n        while (l < r) {\n            int s = numbers[l] + numbers[r];\n            if (s == target) return {l+1, r+1};\n            else if (s < target) l++;\n            else r--;\n        }\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        int l = 0, r = numbers.length - 1;\n        while (l < r) {\n            int s = numbers[l] + numbers[r];\n            if (s == target) return new int[]{l+1, r+1};\n            else if (s < target) l++;\n            else r--;\n        }\n        return new int[]{};\n    }\n}`,
      explanation: 'Two pointers from both ends. If sum is too small, move left pointer right. If too large, move right pointer left. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-189', slug: 'rotate-array', title: 'Rotate Array', difficulty: 'Medium', source: 'LeetCode', category: 'linear', topic: 'Array',
    description: 'Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.',
    constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1', '0 <= k <= 10^5'],
    solutions: {
      python: `class Solution:\n    def rotate(self, nums: List[int], k: int) -> None:\n        k %= len(nums)\n        nums.reverse()\n        nums[:k] = nums[:k][::-1]\n        nums[k:] = nums[k:][::-1]`,
      cpp: `class Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        k %= nums.size();\n        reverse(nums.begin(), nums.end());\n        reverse(nums.begin(), nums.begin() + k);\n        reverse(nums.begin() + k, nums.end());\n    }\n};`,
      java: `class Solution {\n    public void rotate(int[] nums, int k) {\n        k %= nums.length;\n        reverse(nums, 0, nums.length - 1);\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, nums.length - 1);\n    }\n    private void reverse(int[] nums, int l, int r) {\n        while (l < r) { int t = nums[l]; nums[l++] = nums[r]; nums[r--] = t; }\n    }\n}`,
      explanation: 'Three reverses: reverse entire array, then reverse first k elements, then reverse remaining. O(n) time, O(1) space.'
    }
  },
  {
    id: 'lc-238', slug: 'product-of-array-except-self', title: 'Product of Array Except Self', difficulty: 'Medium', source: 'LeetCode', category: 'linear', topic: 'Array',
    description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.',
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.'],
    solutions: {
      python: `class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        n = len(nums)\n        ans = [1] * n\n        prefix = 1\n        for i in range(n):\n            ans[i] = prefix\n            prefix *= nums[i]\n        suffix = 1\n        for i in range(n - 1, -1, -1):\n            ans[i] *= suffix\n            suffix *= nums[i]\n        return ans`,
      cpp: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> ans(n, 1);\n        int prefix = 1;\n        for (int i = 0; i < n; i++) { ans[i] = prefix; prefix *= nums[i]; }\n        int suffix = 1;\n        for (int i = n-1; i >= 0; i--) { ans[i] *= suffix; suffix *= nums[i]; }\n        return ans;\n    }\n};`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] ans = new int[n];\n        int prefix = 1;\n        for (int i = 0; i < n; i++) { ans[i] = prefix; prefix *= nums[i]; }\n        int suffix = 1;\n        for (int i = n-1; i >= 0; i--) { ans[i] *= suffix; suffix *= nums[i]; }\n        return ans;\n    }\n}`,
      explanation: 'Two passes: first pass fills ans[i] with product of all elements to the left. Second pass multiplies by product of all elements to the right. O(n) time, O(1) extra space.'
    }
  },
  {
    id: 'lc-287', slug: 'find-the-duplicate-number', title: 'Find the Duplicate Number', difficulty: 'Medium', source: 'LeetCode', category: 'algorithms', topic: 'Fast and Slow Pointers',
    description: 'Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.\n\nThere is only **one repeated number** in `nums`, return this repeated number.\n\nYou must solve the problem **without** modifying the array `nums` and using only constant extra space.',
    constraints: ['1 <= n <= 10^5', 'nums.length == n + 1', '1 <= nums[i] <= n', 'All the integers in nums appear only once except for precisely one integer which appears two or more times.'],
    solutions: {
      python: `class Solution:\n    def findDuplicate(self, nums: List[int]) -> int:\n        slow = fast = nums[0]\n        while True:\n            slow = nums[slow]\n            fast = nums[nums[fast]]\n            if slow == fast: break\n        slow = nums[0]\n        while slow != fast:\n            slow = nums[slow]\n            fast = nums[fast]\n        return slow`,
      cpp: `class Solution {\npublic:\n    int findDuplicate(vector<int>& nums) {\n        int slow = nums[0], fast = nums[0];\n        do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow != fast);\n        slow = nums[0];\n        while (slow != fast) { slow = nums[slow]; fast = nums[fast]; }\n        return slow;\n    }\n};`,
      java: `class Solution {\n    public int findDuplicate(int[] nums) {\n        int slow = nums[0], fast = nums[0];\n        do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow != fast);\n        slow = nums[0];\n        while (slow != fast) { slow = nums[slow]; fast = nums[fast]; }\n        return slow;\n    }\n}`,
      explanation: "Floyd's cycle detection (tortoise and hare). Treat array as a linked list where nums[i] points to index nums[i]. The duplicate creates a cycle. O(n) time, O(1) space."
    }
  },
  {
    id: 'lc-300', slug: 'longest-increasing-subsequence', title: 'Longest Increasing Subsequence', difficulty: 'Medium', source: 'LeetCode', category: 'patterns', topic: 'Dynamic Programming',
    description: 'Given an integer array `nums`, return the **length of the longest strictly increasing subsequence**.',
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    solutions: {
      python: `class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        from bisect import bisect_left\n        tails = []\n        for num in nums:\n            pos = bisect_left(tails, num)\n            if pos == len(tails): tails.append(num)\n            else: tails[pos] = num\n        return len(tails)`,
      cpp: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        vector<int> tails;\n        for (int num : nums) {\n            auto it = lower_bound(tails.begin(), tails.end(), num);\n            if (it == tails.end()) tails.push_back(num);\n            else *it = num;\n        }\n        return tails.size();\n    }\n};`,
      java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        List<Integer> tails = new ArrayList<>();\n        for (int num : nums) {\n            int pos = Collections.binarySearch(tails, num);\n            if (pos < 0) pos = -(pos + 1);\n            if (pos == tails.size()) tails.add(num);\n            else tails.set(pos, num);\n        }\n        return tails.size();\n    }\n}`,
      explanation: 'Patience sorting: maintain a tails array. For each number, binary search for its position. O(n log n) time, O(n) space.'
    }
  },
  {
    id: 'lc-347', slug: 'top-k-frequent-elements', title: 'Top K Frequent Elements', difficulty: 'Medium', source: 'LeetCode', category: 'algorithms', topic: 'Heap (Priority Queue)',
    description: 'Given an integer array `nums` and an integer `k`, return the `k` **most frequent** elements. You may return the answer in **any order**.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in the range [1, the number of unique elements in the array].', 'It is guaranteed that the answer is unique.'],
    solutions: {
      python: `class Solution:\n    def topKFrequent(self, nums: List[int], k: int) -> List[int]:\n        from collections import Counter\n        count = Counter(nums)\n        buckets = [[] for _ in range(len(nums) + 1)]\n        for num, freq in count.items():\n            buckets[freq].append(num)\n        result = []\n        for i in range(len(buckets) - 1, -1, -1):\n            for num in buckets[i]:\n                result.append(num)\n                if len(result) == k: return result\n        return result`,
      cpp: `class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        unordered_map<int,int> cnt;\n        for (int n : nums) cnt[n]++;\n        vector<vector<int>> buckets(nums.size() + 1);\n        for (auto& [num, freq] : cnt) buckets[freq].push_back(num);\n        vector<int> res;\n        for (int i = buckets.size()-1; i >= 0 && res.size() < k; i--)\n            for (int n : buckets[i]) { res.push_back(n); if (res.size() == k) return res; }\n        return res;\n    }\n};`,
      java: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        Map<Integer,Integer> cnt = new HashMap<>();\n        for (int n : nums) cnt.merge(n, 1, Integer::sum);\n        List<Integer>[] buckets = new List[nums.length + 1];\n        for (int i = 0; i < buckets.length; i++) buckets[i] = new ArrayList<>();\n        for (var e : cnt.entrySet()) buckets[e.getValue()].add(e.getKey());\n        int[] res = new int[k]; int idx = 0;\n        for (int i = buckets.length - 1; i >= 0 && idx < k; i--)\n            for (int n : buckets[i]) { res[idx++] = n; if (idx == k) return res; }\n        return res;\n    }\n}`,
      explanation: 'Bucket sort: count frequencies, place numbers in frequency-indexed buckets, iterate from highest frequency. O(n) time, O(n) space.'
    }
  },
  {
    id: 'lc-394', slug: 'decode-string', title: 'Decode String', difficulty: 'Medium', source: 'LeetCode', category: 'linear', topic: 'Stack',
    description: 'Given an encoded string, return its decoded string.\n\nThe encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times.',
    constraints: ['1 <= s.length <= 30', 's consists of lowercase English letters, digits, and square brackets.', 's is guaranteed to be a valid input.', 'All the integers in s are in the range [1, 300].'],
    solutions: {
      python: `class Solution:\n    def decodeString(self, s: str) -> str:\n        stack = []\n        cur_str = ''\n        cur_num = 0\n        for c in s:\n            if c == '[':\n                stack.append((cur_str, cur_num))\n                cur_str, cur_num = '', 0\n            elif c == ']':\n                prev_str, num = stack.pop()\n                cur_str = prev_str + cur_str * num\n            elif c.isdigit():\n                cur_num = cur_num * 10 + int(c)\n            else:\n                cur_str += c\n        return cur_str`,
      cpp: `class Solution {\npublic:\n    string decodeString(string s) {\n        stack<pair<string,int>> st;\n        string cur; int num = 0;\n        for (char c : s) {\n            if (c == '[') { st.push({cur, num}); cur = ""; num = 0; }\n            else if (c == ']') { auto [prev, k] = st.top(); st.pop(); string tmp; for (int i=0;i<k;i++) tmp += cur; cur = prev + tmp; }\n            else if (isdigit(c)) num = num * 10 + (c - '0');\n            else cur += c;\n        }\n        return cur;\n    }\n};`,
      java: `class Solution {\n    public String decodeString(String s) {\n        Deque<String> strStack = new ArrayDeque<>();\n        Deque<Integer> numStack = new ArrayDeque<>();\n        StringBuilder cur = new StringBuilder(); int num = 0;\n        for (char c : s.toCharArray()) {\n            if (c == '[') { strStack.push(cur.toString()); numStack.push(num); cur = new StringBuilder(); num = 0; }\n            else if (c == ']') { String prev = strStack.pop(); int k = numStack.pop(); StringBuilder tmp = new StringBuilder(prev); for (int i=0;i<k;i++) tmp.append(cur); cur = tmp; }\n            else if (Character.isDigit(c)) num = num * 10 + (c - '0');\n            else cur.append(c);\n        }\n        return cur.toString();\n    }\n}`,
      explanation: 'Stack-based: on [, push current string and number. On ], pop and repeat current string. O(n * max_k) time.'
    }
  },
  {
    id: 'lc-416', slug: 'partition-equal-subset-sum', title: 'Partition Equal Subset Sum', difficulty: 'Medium', source: 'LeetCode', category: 'patterns', topic: 'Dynamic Programming',
    description: 'Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or `false` otherwise.',
    constraints: ['1 <= nums.length <= 200', '1 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:\n    def canPartition(self, nums: List[int]) -> bool:\n        total = sum(nums)\n        if total % 2: return False\n        target = total // 2\n        dp = {0}\n        for num in nums:\n            dp = dp | {s + num for s in dp}\n            if target in dp: return True\n        return target in dp`,
      cpp: `class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        int total = accumulate(nums.begin(), nums.end(), 0);\n        if (total % 2) return false;\n        int target = total / 2;\n        vector<bool> dp(target + 1, false);\n        dp[0] = true;\n        for (int num : nums)\n            for (int j = target; j >= num; j--)\n                dp[j] = dp[j] || dp[j - num];\n        return dp[target];\n    }\n};`,
      java: `class Solution {\n    public boolean canPartition(int[] nums) {\n        int total = 0; for (int n : nums) total += n;\n        if (total % 2 != 0) return false;\n        int target = total / 2;\n        boolean[] dp = new boolean[target + 1];\n        dp[0] = true;\n        for (int num : nums)\n            for (int j = target; j >= num; j--)\n                dp[j] = dp[j] || dp[j - num];\n        return dp[target];\n    }\n}`,
      explanation: '0/1 knapsack variant. Check if any subset sums to total/2. Use boolean DP array iterated backwards. O(n * target) time, O(target) space.'
    }
  },
  {
    id: 'lc-424', slug: 'longest-repeating-character-replacement', title: 'Longest Repeating Character Replacement', difficulty: 'Medium', source: 'LeetCode', category: 'patterns', topic: 'Sliding Window',
    description: 'You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.\n\nReturn the length of the **longest substring** containing the same letter you can get after performing the above operations.',
    constraints: ['1 <= s.length <= 10^5', 's consists of only uppercase English letters.', '0 <= k <= s.length'],
    solutions: {
      python: `class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        count = {}\n        max_freq = result = l = 0\n        for r in range(len(s)):\n            count[s[r]] = count.get(s[r], 0) + 1\n            max_freq = max(max_freq, count[s[r]])\n            while (r - l + 1) - max_freq > k:\n                count[s[l]] -= 1\n                l += 1\n            result = max(result, r - l + 1)\n        return result`,
      cpp: `class Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        int count[26] = {}, maxFreq = 0, res = 0, l = 0;\n        for (int r = 0; r < s.size(); r++) {\n            maxFreq = max(maxFreq, ++count[s[r]-'A']);\n            while (r - l + 1 - maxFreq > k) count[s[l++]-'A']--;\n            res = max(res, r - l + 1);\n        }\n        return res;\n    }\n};`,
      java: `class Solution {\n    public int characterReplacement(String s, int k) {\n        int[] count = new int[26];\n        int maxFreq = 0, res = 0, l = 0;\n        for (int r = 0; r < s.length(); r++) {\n            maxFreq = Math.max(maxFreq, ++count[s.charAt(r) - 'A']);\n            while (r - l + 1 - maxFreq > k) count[s.charAt(l++) - 'A']--;\n            res = Math.max(res, r - l + 1);\n        }\n        return res;\n    }\n}`,
      explanation: 'Sliding window tracking the max frequency character in the window. If window size minus max frequency > k, shrink from left. O(n) time, O(1) space.'
    }
  },
  // ─── MORE CODEFORCES (5) ─────────────────────────────────────────
  {
    id: 'cf-118A', slug: 'cf-118a', title: 'String Task', difficulty: 'Easy', source: 'Codeforces', category: 'foundations', topic: 'Array',
    description: 'Petya started to attend programming lessons. On the first lesson his task was to write a simple program. The program was supposed to do the following: given a string, delete all vowels from it, insert a dot before each consonant, and convert all consonants to lowercase.\n\nVowels are: A, O, Y, E, U, I (both uppercase and lowercase).\n\n**Input:** A non-empty string of length ≤ 100.\n\n**Output:** The modified string.',
    constraints: ['1 ≤ |s| ≤ 100', 'String consists of English letters.'],
    solutions: {
      python: `s = input().lower()\nvowels = 'aeiouy'\nresult = ''\nfor c in s:\n    if c not in vowels:\n        result += '.' + c\nprint(result)`,
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    string vowels = "aeiouyAEIOUY";\n    for (char c : s)\n        if (vowels.find(c) == string::npos)\n            cout << '.' << (char)tolower(c);\n}`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        String s = new Scanner(System.in).next().toLowerCase();\n        StringBuilder sb = new StringBuilder();\n        for (char c : s.toCharArray())\n            if ("aeiouy".indexOf(c) == -1) sb.append('.').append(c);\n        System.out.println(sb);\n    }\n}`,
      explanation: 'Convert to lowercase, skip vowels, prepend dot before each consonant. O(n) time.'
    }
  },
  {
    id: 'cf-122A', slug: 'cf-122a', title: 'Lucky Division', difficulty: 'Easy', source: 'Codeforces', category: 'foundations', topic: 'Modular Arithmetic',
    description: 'Petya loves **lucky numbers**. We all know that lucky numbers are the positive integers whose decimal representation contains only the lucky digits **4** and **7**.\n\nPetya calls a number **almost lucky** if it is divisible by some lucky number.\n\nGiven a number `n`, determine whether it is almost lucky.\n\n**Input:** A single integer `n` (1 ≤ n ≤ 1000).\n\n**Output:** Print "YES" if n is almost lucky, "NO" otherwise.',
    constraints: ['1 ≤ n ≤ 1000'],
    solutions: {
      python: `n = int(input())\nlucky = [4, 7, 44, 47, 74, 77, 444, 447, 474, 477, 744, 747, 774, 777]\nprint("YES" if any(n % l == 0 for l in lucky) else "NO")`,
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    int lucky[] = {4,7,44,47,74,77,444,447,474,477,744,747,774,777};\n    for (int l : lucky) if (n % l == 0) { cout << "YES"; return 0; }\n    cout << "NO";\n}`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        int n = new Scanner(System.in).nextInt();\n        int[] lucky = {4,7,44,47,74,77,444,447,474,477,744,747,774,777};\n        for (int l : lucky) if (n % l == 0) { System.out.println("YES"); return; }\n        System.out.println("NO");\n    }\n}`,
      explanation: 'Check if n is divisible by any lucky number (numbers containing only 4s and 7s up to 1000). O(1) time.'
    }
  },
  {
    id: 'cf-228A', slug: 'cf-228a', title: 'Is your horseshoe on the other hoof?', difficulty: 'Easy', source: 'Codeforces', category: 'foundations', topic: 'Array',
    description: 'Valera the Horse is going to a race. He has 4 horseshoes, each of some color. However, to enter the race, all 4 horseshoes must be of **different** colors.\n\nWhat is the **minimum number** of horseshoes Valera needs to change to have 4 horseshoes of different colors?\n\n**Input:** Four space-separated integers — the colors of the horseshoes (1 ≤ color ≤ 10^9).\n\n**Output:** The minimum number of horseshoes to replace.',
    constraints: ['1 ≤ s_i ≤ 10^9'],
    solutions: {
      python: `s = list(map(int, input().split()))\nprint(4 - len(set(s)))`,
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    set<int> s;\n    for (int i = 0; i < 4; i++) { int x; cin >> x; s.insert(x); }\n    cout << 4 - s.size();\n}`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Set<Integer> s = new HashSet<>();\n        for (int i = 0; i < 4; i++) s.add(sc.nextInt());\n        System.out.println(4 - s.size());\n    }\n}`,
      explanation: 'Count distinct colors using a set. The answer is 4 minus the number of distinct colors. O(1) time.'
    }
  },
  {
    id: 'cf-479A', slug: 'cf-479a', title: 'Expression', difficulty: 'Easy', source: 'Codeforces', category: 'foundations', topic: 'Modular Arithmetic',
    description: 'Petya studies at school. Recently he received a task: given three digits `a`, `b`, and `c`, place `+` and `*` signs between them to maximize the resulting expression value.\n\nPetya must place exactly one `+` and one `*` sign. No operator precedence — evaluate left to right, OR use parentheses to maximize.\n\n**Input:** Three integers `a`, `b`, `c` (each from 1 to 10).\n\n**Output:** The maximum value achievable.',
    constraints: ['1 ≤ a, b, c ≤ 10'],
    solutions: {
      python: `a, b, c = int(input()), int(input()), int(input())\nprint(max(\n    a * b + c, a + b * c,\n    (a + b) * c, a * (b + c),\n    (a * b) * c, a + b + c\n))`,
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int a, b, c; cin >> a >> b >> c;\n    cout << max({a*b+c, a+b*c, (a+b)*c, a*(b+c), a*b*c, a+b+c});\n}`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();\n        System.out.println(Collections.max(Arrays.asList(a*b+c, a+b*c, (a+b)*c, a*(b+c), a*b*c, a+b+c)));\n    }\n}`,
      explanation: 'Try all possible combinations of + and * with parentheses and return the maximum. Only 6 cases to check. O(1) time.'
    }
  },
  {
    id: 'cf-337A', slug: 'cf-337a', title: 'Puzzles', difficulty: 'Easy', source: 'Codeforces', category: 'foundations', topic: 'Counting Sort',
    description: 'The teacher has `n` students and `m` puzzles (m ≥ n). Each puzzle has a certain number of pieces `f_i`. She wants to give each student exactly one puzzle so that the difference between the **most pieces** and the **fewest pieces** among the chosen puzzles is **minimized**.\n\n**Input:** First line: `n` and `m`. Second line: `m` integers — the number of pieces in each puzzle.\n\n**Output:** The minimum possible difference.',
    constraints: ['1 ≤ n ≤ m ≤ 50', '1 ≤ f_i ≤ 1000'],
    solutions: {
      python: `n, m = map(int, input().split())\nf = sorted(map(int, input().split()))\nprint(min(f[i+n-1] - f[i] for i in range(m - n + 1)))`,
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    int n, m; cin >> n >> m;\n    vector<int> f(m);\n    for (int& x : f) cin >> x;\n    sort(f.begin(), f.end());\n    int ans = INT_MAX;\n    for (int i = 0; i + n - 1 < m; i++) ans = min(ans, f[i+n-1] - f[i]);\n    cout << ans;\n}`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), m = sc.nextInt();\n        int[] f = new int[m];\n        for (int i = 0; i < m; i++) f[i] = sc.nextInt();\n        Arrays.sort(f);\n        int ans = Integer.MAX_VALUE;\n        for (int i = 0; i + n - 1 < m; i++) ans = Math.min(ans, f[i+n-1] - f[i]);\n        System.out.println(ans);\n    }\n}`,
      explanation: 'Sort puzzles. Slide a window of size n across the sorted array; minimum difference is the answer. O(m log m) time.'
    }
  },
];

function main() {
  const arena = JSON.parse(fs.readFileSync(ARENA_PATH, 'utf-8'));
  const existingIds = new Set(arena.map(p => p.id));
  let added = 0, skipped = 0;
  for (const p of NEW_PROBLEMS) {
    if (existingIds.has(p.id)) { console.log(`⏭ ${p.id} — ${p.title} (exists)`); skipped++; continue; }
    arena.push(p);
    added++;
    console.log(`✓ ${p.id} — ${p.title} (${p.difficulty})`);
  }
  fs.writeFileSync(ARENA_PATH, JSON.stringify(arena, null, 2) + '\n', 'utf-8');
  console.log(`\nDone! Added: ${added}, Skipped: ${skipped}, Total: ${arena.length}`);
}
main();
