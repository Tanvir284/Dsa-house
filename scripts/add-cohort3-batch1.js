const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const BATCH = [
  {
    id: 'lc-203',
    slug: 'remove-linked-list-elements',
    title: 'Remove Linked List Elements',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a linked list and an integer `val`, remove all the nodes of the linked list that has `Node.val == val`, and return the new head.',
    constraints: ['The number of nodes in the list is in the range [0, 10^4].', '1 <= Node.val <= 50', '0 <= val <= 50'],
    solutions: {
      python: `class Solution:
    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        curr = dummy
        while curr.next:
            if curr.next.val == val:
                curr.next = curr.next.next
            else:
                curr = curr.next
        return dummy.next`,
      cpp: `class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* curr = dummy;
        while (curr->next) {
            if (curr->next->val == val) {
                ListNode* temp = curr->next;
                curr->next = curr->next->next;
                delete temp;
            } else {
                curr = curr->next;
            }
        }
        ListNode* res = dummy->next;
        delete dummy;
        return res;
    }
};`,
      java: `class Solution {
    public ListNode removeElements(ListNode head, int val) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode curr = dummy;
        while (curr.next != null) {
            if (curr.next.val == val) curr.next = curr.next.next;
            else curr = curr.next;
        }
        return dummy.next;
    }
}`,
      explanation: 'Use a dummy node pointing to the head of the list. Iterate through the list with a pointer, skipping any next node whose value matches val. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-205',
    slug: 'isomorphic-strings',
    title: 'Isomorphic Strings',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two strings `s` and `t`, determine if they are isomorphic. Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.',
    constraints: ['1 <= s.length <= 5 * 10^4', 't.length == s.length', 's and t consist of any valid ascii character.'],
    solutions: {
      python: `class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        mapST, mapTS = {}, {}
        for c1, c2 in zip(s, t):
            if ((c1 in mapST and mapST[c1] != c2) or
                (c2 in mapTS and mapTS[c2] != c1)):
                return False
            mapST[c1] = c2
            mapTS[c2] = c1
        return True`,
      cpp: `class Solution {
public:
    bool isIsomorphic(string s, string t) {
        int mapST[256] = {0}, mapTS[256] = {0};
        for (int i = 0; i < s.size(); ++i) {
            if (mapST[s[i]] != mapTS[t[i]]) return false;
            mapST[s[i]] = i + 1;
            mapTS[t[i]] = i + 1;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isIsomorphic(String s, String t) {
        int[] mapST = new int[256];
        int[] mapTS = new int[256];
        for (int i = 0; i < s.length(); i++) {
            if (mapST[s.charAt(i)] != mapTS[t.charAt(i)]) return false;
            mapST[s.charAt(i)] = i + 1;
            mapTS[t.charAt(i)] = i + 1;
        }
        return true;
    }
}`,
      explanation: 'Use two helper arrays/maps to track the character positions or mappings from s to t and t to s. If a mismatch in mapping occurs, return false. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-219',
    slug: 'contains-duplicate-ii',
    title: 'Contains Duplicate II',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Sliding Window',
    description: 'Given an integer array `nums` and an integer `k`, return `true` if there are two distinct indices `i` and `j` in the array such that `nums[i] == nums[j]` and `abs(i - j) <= k`.',
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9', '0 <= k <= 10^5'],
    solutions: {
      python: `class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        seen = set()
        for i, n in enumerate(nums):
            if i > k:
                seen.remove(nums[i - k - 1])
            if n in seen:
                return True
            seen.add(n)
        return False`,
      cpp: `class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_set<int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            if (i > k) seen.erase(nums[i - k - 1]);
            if (seen.count(nums[i])) return true;
            seen.insert(nums[i]);
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Set<Integer> seen = new HashSet<>();
        for (int i = 0; i < nums.length; i++) {
            if (i > k) seen.remove(nums[i - k - 1]);
            if (!seen.add(nums[i])) return true;
        }
        return false;
    }
}`,
      explanation: 'Use a sliding window of size k using a hash set. For each element at index i, if the window size exceeds k, remove the element at index i-k-1. If the current element is already in the set, a duplicate exists within distance k. Time complexity: O(n), Space complexity: O(min(n, k)).'
    }
  },
  {
    id: 'lc-228',
    slug: 'summary-ranges',
    title: 'Summary Ranges',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given a sorted unique integer array `nums`. Return the smallest sorted list of ranges that cover all the numbers in the array exactly.',
    constraints: ['0 <= nums.length <= 20', '-2^31 <= nums[i] <= 2^31 - 1', 'All the values of nums are unique.', 'nums is sorted in ascending order.'],
    solutions: {
      python: `class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        ranges = []
        i = 0
        while i < len(nums):
            start = nums[i]
            while i + 1 < len(nums) and nums[i + 1] == nums[i] + 1:
                i += 1
            if start == nums[i]:
                ranges.append(str(start))
            else:
                ranges.append(f"{start}->{nums[i]}")
            i += 1
        return ranges`,
      cpp: `class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> res;
        int i = 0, n = nums.size();
        while (i < n) {
            int start = nums[i];
            while (i + 1 < n && nums[i + 1] == nums[i] + 1) i++;
            if (start == nums[i]) res.push_back(to_string(start));
            else res.push_back(to_string(start) + "->" + to_string(nums[i]));
            i++;
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> res = new ArrayList<>();
        int i = 0, n = nums.length;
        while (i < n) {
            int start = nums[i];
            while (i + 1 < n && nums[i + 1] == nums[i] + 1) i++;
            if (start == nums[i]) res.add(String.valueOf(start));
            else res.add(start + "->" + nums[i]);
            i++;
        }
        return res;
    }
}`,
      explanation: 'Iterate through the array with a pointer. Find contiguous sequences where nums[i+1] == nums[i] + 1. Construct the range string accordingly. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-263',
    slug: 'ugly-number',
    title: 'Ugly Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'An **ugly number** is a positive integer whose prime factors are limited to `2`, `3`, and `5`. Given an integer `n`, return `true` if `n` is an ugly number.',
    constraints: ['-2^31 <= n <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def isUgly(self, n: int) -> bool:
        if n <= 0: return False
        for p in [2, 3, 5]:
            while n % p == 0:
                n //= p
        return n == 1`,
      cpp: `class Solution {
public:
    bool isUgly(int n) {
        if (n <= 0) return false;
        for (int p : {2, 3, 5}) {
            while (n % p == 0) n /= p;
        }
        return n == 1;
    }
};`,
      java: `class Solution {
    public boolean isUgly(int n) {
        if (n <= 0) return false;
        for (int p : new int[]{2, 3, 5}) {
            while (n % p == 0) n /= p;
        }
        return n == 1;
    }
}`,
      explanation: 'If n is positive, continuously divide n by 2, 3, and 5 as long as it is divisible. If the resulting number is 1, n is ugly. Time complexity: O(log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-290',
    slug: 'word-pattern',
    title: 'Word Pattern',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a `pattern` and a string `s`, find if `s` follows the same pattern. Follow means a full match, such that there is a bijection between a letter in `pattern` and a non-empty word in `s`.',
    constraints: ['1 <= pattern.length <= 300', 'pattern consists of lowercase English letters.', '1 <= s.length <= 3000', 's consists of lowercase English letters and spaces.', 's does not contain any leading or trailing spaces.', 'All the words in s are separated by a single space.'],
    solutions: {
      python: `class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split()
        if len(pattern) != len(words):
            return False
        char_to_word, word_to_char = {}, {}
        for c, w in zip(pattern, words):
            if c in char_to_word and char_to_word[c] != w:
                return False
            if w in word_to_char and word_to_char[w] != c:
                return False
            char_to_word[c] = w
            word_to_char[w] = c
        return True`,
      cpp: `class Solution {
public:
    bool wordPattern(string pattern, string s) {
        vector<string> words;
        stringstream ss(s);
        string word;
        while (ss >> word) words.push_back(word);
        if (pattern.size() != words.size()) return false;
        unordered_map<char, string> charToWord;
        unordered_map<string, char> wordToChar;
        for (int i = 0; i < pattern.size(); ++i) {
            char c = pattern[i];
            string w = words[i];
            if (charToWord.count(c) && charToWord[c] != w) return false;
            if (wordToChar.count(w) && wordToChar[w] != c) return false;
            charToWord[c] = w;
            wordToChar[w] = c;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] words = s.split(" ");
        if (pattern.length() != words.length) return false;
        Map<Character, String> charToWord = new HashMap<>();
        Map<String, Character> wordToChar = new HashMap<>();
        for (int i = 0; i < pattern.length(); i++) {
            char c = pattern.charAt(i);
            String w = words[i];
            if (charToWord.containsKey(c) && !charToWord.get(c).equals(w)) return false;
            if (wordToChar.containsKey(w) && !wordToChar.get(w).equals(c)) return false;
            charToWord.put(c, w);
            wordToChar.put(w, c);
        }
        return true;
    }
}`,
      explanation: 'Split string s into words. If the count of words doesn\'t match the pattern length, return false. Use two hash maps to establish a bidirectional mapping (bijection) between characters and words. Time complexity: O(n + m) where n is pattern length and m is s length, Space complexity: O(unique words + unique chars).'
    }
  },
  {
    id: 'lc-303',
    slug: 'range-sum-query-immutable',
    title: 'Range Sum Query - Immutable',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an integer array `nums`, handle multiple queries of the sum of the elements of `nums` between indices `left` and `right` inclusive.',
    constraints: ['1 <= nums.length <= 10^4', '-10^5 <= nums[i] <= 10^5', '0 <= left <= right < nums.length', 'At most 10^4 calls will be made to sumRange.'],
    solutions: {
      python: `class NumArray:
    def __init__(self, nums: List[int]):
        self.prefix = [0] * (len(nums) + 1)
        for i, n in enumerate(nums):
            self.prefix[i + 1] = self.prefix[i] + n
    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]`,
      cpp: `class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (int i = 0; i < nums.size(); ++i) prefix[i + 1] = prefix[i] + nums[i];
    }
    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};`,
      java: `class NumArray {
    int[] prefix;
    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];
    }
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}`,
      explanation: 'Precompute prefix sums. The sum of range [left, right] is calculated as prefix[right + 1] - prefix[left]. Time complexity: O(n) initialization, O(1) query. Space complexity: O(n).'
    }
  },
  {
    id: 'lc-345',
    slug: 'reverse-vowels-of-a-string',
    title: 'Reverse Vowels of a String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given a string `s`, reverse only all the vowels in the string and return it. The vowels are `a`, `e`, `i`, `o`, and `u`, and they can appear in both lower and upper cases.',
    constraints: ['1 <= s.length <= 3 * 10^5', 's consists of printable ASCII characters.'],
    solutions: {
      python: `class Solution:
    def reverseVowels(self, s: str) -> str:
        vowels = set("aeiouAEIOU")
        chars = list(s)
        l, r = 0, len(chars) - 1
        while l < r:
            while l < r and chars[l] not in vowels: l += 1
            while l < r and chars[r] not in vowels: r -= 1
            if l < r:
                chars[l], chars[r] = chars[r], chars[l]
                l += 1
                r -= 1
        return "".join(chars)`,
      cpp: `class Solution {
public:
    string reverseVowels(string s) {
        unordered_set<char> vowels = {'a','e','i','o','u','A','E','I','O','U'};
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !vowels.count(s[l])) l++;
            while (l < r && !vowels.count(s[r])) r--;
            if (l < r) swap(s[l++], s[r--]);
        }
        return s;
    }
};`,
      java: `class Solution {
    public String reverseVowels(String s) {
        Set<Character> vowels = new HashSet<>(Arrays.asList('a','e','i','o','u','A','E','I','O','U'));
        char[] chars = s.toCharArray();
        int l = 0, r = chars.length - 1;
        while (l < r) {
            while (l < r && !vowels.contains(chars[l])) l++;
            while (l < r && !vowels.contains(chars[r])) r--;
            if (l < r) {
                char temp = chars[l];
                chars[l] = chars[r];
                chars[r] = temp;
                l++; r--;
            }
        }
        return new String(chars);
    }
}`,
      explanation: 'Use two pointers starting at both ends of the string. Move them inward until both point to vowels, then swap them. Repeat until the pointers meet. Time complexity: O(n), Space complexity: O(n) to store characters.'
    }
  },
  {
    id: 'lc-349',
    slug: 'intersection-of-two-arrays',
    title: 'Intersection of Two Arrays',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be **unique** and you may return the result in **any order**.',
    constraints: ['1 <= nums1.length, nums2.length <= 1000', '0 <= nums1[i], nums2[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        set1 = set(nums1)
        res = []
        for n in nums2:
            if n in set1:
                res.append(n)
                set1.remove(n)
        return res`,
      cpp: `class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> set1(nums1.begin(), nums1.end());
        vector<int> res;
        for (int n : nums2) {
            if (set1.count(n)) {
                res.push_back(n);
                set1.erase(n);
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set1 = new HashSet<>();
        for (int n : nums1) set1.add(n);
        List<Integer> list = new ArrayList<>();
        for (int n : nums2) {
            if (set1.contains(n)) {
                list.add(n);
                set1.remove(n);
            }
        }
        int[] res = new int[list.size()];
        for (int i = 0; i < list.size(); i++) res[i] = list.get(i);
        return res;
    }
}`,
      explanation: 'Use a hash set to store unique elements of the first array. Iterate through the second array and append matches to the output, removing them from the set to avoid duplicates. Time complexity: O(n + m), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-367',
    slug: 'valid-perfect-square',
    title: 'Valid Perfect Square',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given a positive integer `num`, return `true` if `num` is a perfect square or `false` otherwise. Do not use any built-in library function such as `sqrt`.',
    constraints: ['1 <= num <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        low, high = 1, num
        while low <= high:
            mid = (low + high) // 2
            sq = mid * mid
            if sq == num:
                return True
            elif sq < num:
                low = mid + 1
            else:
                high = mid - 1
        return False`,
      cpp: `class Solution {
public:
    bool isPerfectSquare(int num) {
        long long low = 1, high = num;
        while (low <= high) {
            long long mid = low + (high - low) / 2;
            long long sq = mid * mid;
            if (sq == num) return true;
            if (sq < num) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }
};`,
      java: `class Solution {
    public boolean isPerfectSquare(int num) {
        long low = 1, high = num;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            long sq = mid * mid;
            if (sq == num) return true;
            if (sq < num) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }
}`,
      explanation: 'Use binary search to find an integer x in the range [1, num] such that x * x == num. Time complexity: O(log num), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-404',
    slug: 'sum-of-left-leaves',
    title: 'Sum of Left Leaves',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree, return the sum of all left leaves.',
    constraints: ['The number of nodes in the tree is in the range [1, 1000].', '-1000 <= Node.val <= 1000'],
    solutions: {
      python: `class Solution:
    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        ans = 0
        if root.left and not root.left.left and not root.left.right:
            ans += root.left.val
        return ans + self.sumOfLeftLeaves(root.left) + self.sumOfLeftLeaves(root.right)`,
      cpp: `class Solution {
public:
    int sumOfLeftLeaves(TreeNode* root) {
        if (!root) return 0;
        int ans = 0;
        if (root->left && !root->left->left && !root->left->right) ans += root->left->val;
        return ans + sumOfLeftLeaves(root->left) + sumOfLeftLeaves(root->right);
    }
};`,
      java: `class Solution {
    public int sumOfLeftLeaves(TreeNode root) {
        if (root == null) return 0;
        int ans = 0;
        if (root.left != null && root.left.left == null && root.left.right == null) ans += root.left.val;
        return ans + sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right);
    }
}`,
      explanation: 'Traverse the binary tree using DFS. At each node, check if its left child is a leaf node. If so, add its value to the sum. Recurse for both left and right subtrees. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-409',
    slug: 'longest-palindrome',
    title: 'Longest Palindrome',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given a string `s` which consists of lowercase or uppercase letters, return the length of the **longest palindrome** that can be built with those letters.',
    constraints: ['1 <= s.length <= 2000', 's consists of lowercase and/or uppercase English letters only.'],
    solutions: {
      python: `class Solution:
    def longestPalindrome(self, s: str) -> int:
        seen = set()
        ans = 0
        for c in s:
            if c in seen:
                ans += 2
                seen.remove(c)
            else:
                seen.add(c)
        return ans + 1 if seen else ans`,
      cpp: `class Solution {
public:
    int longestPalindrome(string s) {
        unordered_set<char> seen;
        int ans = 0;
        for (char c : s) {
            if (seen.count(c)) {
                ans += 2;
                seen.erase(c);
            } else {
                seen.insert(c);
            }
        }
        return seen.empty() ? ans : ans + 1;
    }
};`,
      java: `class Solution {
    public int longestPalindrome(String s) {
        Set<Character> seen = new HashSet<>();
        int ans = 0;
        for (char c : s.toCharArray()) {
            if (seen.contains(c)) {
                ans += 2;
                seen.remove(c);
            } else {
                seen.add(c);
            }
        }
        return seen.isEmpty() ? ans : ans + 1;
    }
}`,
      explanation: 'Use a hash set to find pairs of characters. For every pair, we can add 2 to the length of the palindrome. If any single character is left over at the end, we can place one of them in the center of the palindrome, adding 1 to the length. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-448',
    slug: 'find-all-numbers-disappeared-in-an-array',
    title: 'Find All Numbers Disappeared in an Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array `nums` of `n` integers where `nums[i]` is in the range `[1, n]`, return an array of all the integers in the range `[1, n]` that do not appear in `nums`.',
    constraints: ['n == nums.length', '1 <= n <= 10^5', '1 <= nums[i] <= n'],
    solutions: {
      python: `class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        for n in nums:
            idx = abs(n) - 1
            if nums[idx] > 0:
                nums[idx] = -nums[idx]
        return [i + 1 for i, n in enumerate(nums) if n > 0]`,
      cpp: `class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        for (int i = 0; i < nums.size(); ++i) {
            int idx = abs(nums[i]) - 1;
            if (nums[idx] > 0) nums[idx] = -nums[idx];
        }
        vector<int> res;
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] > 0) res.push_back(i + 1);
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            int idx = Math.abs(nums[i]) - 1;
            if (nums[idx] > 0) nums[idx] = -nums[idx];
        }
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) res.add(i + 1);
        }
        return res;
    }
}`,
      explanation: 'Use the array itself to mark visited numbers. Iterate through the array; for each number n, negate the element at index abs(n) - 1. In a second pass, indices with positive values represent missing numbers. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-496',
    slug: 'next-greater-element-i',
    title: 'Next Greater Element I',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'The **next greater element** of some element `x` in an array is the first greater element that is to the right of `x` in the same array.\n\nGiven two unique integer arrays `nums1` and `nums2` where `nums1` is a subset of `nums2`, return an array answer of length `nums1.length` such that `answer[i]` is the next greater element of `nums1[i]` in `nums2`. If it does not exist, return `-1`.',
    constraints: ['1 <= nums1.length <= nums2.length <= 1000', '0 <= nums1[i], nums2[i] <= 10^4', 'All integers in nums1 and nums2 are unique.', 'All the integers of nums1 also appear in nums2.'],
    solutions: {
      python: `class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        stack = []
        next_greater = {}
        for n in nums2:
            while stack and stack[-1] < n:
                next_greater[stack.pop()] = n
            stack.append(n)
        return [next_greater.get(n, -1) for n in nums1]`,
      cpp: `class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        stack<int> s;
        unordered_map<int, int> nextGreater;
        for (int n : nums2) {
            while (!s.empty() && s.top() < n) {
                nextGreater[s.top()] = n;
                s.pop();
            }
            s.push(n);
        }
        vector<int> res;
        for (int n : nums1) {
            res.push_back(nextGreater.count(n) ? nextGreater[n] : -1);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Stack<Integer> s = new Stack<>();
        Map<Integer, Integer> nextGreater = new HashMap<>();
        for (int n : nums2) {
            while (!s.isEmpty() && s.peek() < n) {
                nextGreater.put(s.pop(), n);
            }
            s.push(n);
        }
        int[] res = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            res[i] = nextGreater.getOrDefault(nums1[i], -1);
        }
        return res;
    }
}`,
      explanation: 'Use a monotonic decreasing stack to precompute the next greater element for all items in nums2, storing the mapping in a hash map. Then retrieve the precomputed values for nums1. Time complexity: O(n + m), Space complexity: O(m).'
    }
  },
  {
    id: 'lc-501',
    slug: 'find-mode-in-binary-search-tree',
    title: 'Find Mode in Binary Search Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given the `root` of a binary search tree (BST) with duplicates, return all the **mode(s)** (i.e., the most frequently occurred element(s)) in it. If the tree has more than one mode, return them in **any order**.',
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-10^5 <= Node.val <= 10^5'],
    solutions: {
      python: `class Solution:
    def findMode(self, root: Optional[TreeNode]) -> List[int]:
        self.prev = None
        self.count = 0
        self.max_count = 0
        self.modes = []
        def inorder(node):
            if not node: return
            inorder(node.left)
            
            if node.val == self.prev:
                self.count += 1
            else:
                self.count = 1
                self.prev = node.val
                
            if self.count > self.max_count:
                self.max_count = self.count
                self.modes = [node.val]
            elif self.count == self.max_count:
                self.modes.append(node.val)
                
            inorder(node.right)
        inorder(root)
        return self.modes`,
      cpp: `class Solution {
    int count = 0, maxCount = 0;
    TreeNode* prev = nullptr;
    vector<int> modes;
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        if (prev && root->val == prev->val) count++;
        else count = 1;
        prev = root;
        if (count > maxCount) {
            maxCount = count;
            modes = {root->val};
        } else if (count == maxCount) {
            modes.push_back(root->val);
        }
        inorder(root->right);
    }
public:
    vector<int> findMode(TreeNode* root) {
        inorder(root);
        return modes;
    }
};`,
      java: `class Solution {
    int count = 0, maxCount = 0;
    TreeNode prev = null;
    List<Integer> modes = new ArrayList<>();
    private void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.left);
        if (prev != null && root.val == prev.val) count++;
        else count = 1;
        prev = root;
        if (count > maxCount) {
            maxCount = count;
            modes.clear();
            modes.add(root.val);
        } else if (count == maxCount) {
            modes.add(root.val);
        }
        inorder(root.right);
    }
    public int[] findMode(TreeNode root) {
        inorder(root);
        int[] res = new int[modes.size()];
        for (int i = 0; i < modes.size(); i++) res[i] = modes.get(i);
        return res;
    }
}`,
      explanation: 'Since the tree is a BST, performing an in-order traversal yields values in sorted order. We can traverse in-order and track the current sequence length in O(1) extra space, collecting values that achieve the maximum count. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-530',
    slug: 'minimum-absolute-difference-in-bst',
    title: 'Minimum Absolute Difference in BST',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given the `root` of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.',
    constraints: ['The number of nodes in the tree is in the range [2, 10^4].', '0 <= Node.val <= 10^5'],
    solutions: {
      python: `class Solution:
    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:
        self.prev = None
        self.min_diff = float('inf')
        def inorder(node):
            if not node: return
            inorder(node.left)
            if self.prev is not None:
                self.min_diff = min(self.min_diff, node.val - self.prev)
            self.prev = node.val
            inorder(node.right)
        inorder(root)
        return self.min_diff`,
      cpp: `class Solution {
    int minDiff = INT_MAX;
    TreeNode* prev = nullptr;
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        if (prev) minDiff = min(minDiff, root->val - prev->val);
        prev = root;
        inorder(root->right);
    }
public:
    int getMinimumDifference(TreeNode* root) {
        inorder(root);
        return minDiff;
    }
};`,
      java: `class Solution {
    int minDiff = Integer.MAX_VALUE;
    TreeNode prev = null;
    private void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.left);
        if (prev != null) minDiff = Math.min(minDiff, root.val - prev.val);
        prev = root;
        inorder(root.right);
    }
    public int getMinimumDifference(TreeNode root) {
        inorder(root);
        return minDiff;
    }
}`,
      explanation: 'An in-order traversal of a BST visits nodes in sorted order. Maintain a pointer to the previously visited node to compute the difference between adjacent values. Track the minimum difference encountered. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-543',
    slug: 'diameter-of-binary-tree',
    title: 'Diameter of Binary Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree, return the length of the **diameter** of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.',
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-100 <= Node.val <= 100'],
    solutions: {
      python: `class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.diameter = 0
        def max_depth(node):
            if not node: return 0
            left = max_depth(node.left)
            right = max_depth(node.right)
            self.diameter = max(self.diameter, left + right)
            return 1 + max(left, right)
        max_depth(root)
        return self.diameter`,
      cpp: `class Solution {
    int diameter = 0;
    int maxDepth(TreeNode* node) {
        if (!node) return 0;
        int left = maxDepth(node->left);
        int right = maxDepth(node->right);
        diameter = max(diameter, left + right);
        return 1 + max(left, right);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        maxDepth(root);
        return diameter;
    }
};`,
      java: `class Solution {
    int diameter = 0;
    private int maxDepth(TreeNode node) {
        if (node == null) return 0;
        int left = maxDepth(node.left);
        int right = maxDepth(node.right);
        diameter = Math.max(diameter, left + right);
        return 1 + Math.max(left, right);
    }
    public int diameterOfBinaryTree(TreeNode root) {
        maxDepth(root);
        return diameter;
    }
}`,
      explanation: 'For any node, the longest path passing through it is the sum of the maximum depths of its left and right subtrees. Compute depth recursively and update the global diameter at each node. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-572',
    slug: 'subtree-of-another-tree',
    title: 'Subtree of Another Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.',
    constraints: ['The number of nodes in the root tree is in the range [1, 2000].', 'The number of nodes in the subRoot tree is in the range [1, 1000].', '-10^4 <= root.val, subRoot.val <= 10^4'],
    solutions: {
      python: `class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if not root: return False
        if self.isSameTree(root, subRoot): return True
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)
        
    def isSameTree(self, p, q):
        if not p or not q: return p == q
        return p.val == q.val and self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`,
      cpp: `class Solution {
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p || !q) return p == q;
        return p->val == q->val && isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!root) return false;
        if (isSameTree(root, subRoot)) return true;
        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
    }
};`,
      java: `class Solution {
    private boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null || q == null) return p == q;
        return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false;
        if (isSameTree(root, subRoot)) return true;
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }
}`,
      explanation: 'Recursively search the main tree. For each node, check if the subtree rooted there is identical to subRoot using a helper sameTree function. Time complexity: O(n * m), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-268',
    slug: 'missing-number',
    title: 'Missing Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.',
    constraints: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n', 'All the numbers of nums are unique.'],
    solutions: {
      python: `class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        return n * (n + 1) // 2 - sum(nums)`,
      cpp: `class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int x : nums) actual += x;
        return expected - actual;
    }
};`,
      java: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int x : nums) actual += x;
        return expected - actual;
    }
}`,
      explanation: 'Use the arithmetic series sum formula (n * (n + 1) / 2) to compute the expected sum of numbers from 0 to n. Subtract the actual sum of elements in the array to find the missing number. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-190',
    slug: 'reverse-bits',
    title: 'Reverse Bits',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Reverse bits of a given 32-bit unsigned integer.',
    constraints: ['The input must be a 32-bit unsigned integer.'],
    solutions: {
      python: `class Solution:
    def reverseBits(self, n: int) -> int:
        res = 0
        for _ in range(32):
            res = (res << 1) | (n & 1)
            n >>= 1
        return res`,
      cpp: `class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;
        for (int i = 0; i < 32; ++i) {
            res = (res << 1) | (n & 1);
            n >>= 1;
        }
        return res;
    }
};`,
      java: `public class Solution {
    public int reverseBits(int n) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            res = (res << 1) | (n & 1);
            n >>>= 1; // logical right shift
        }
        return res;
    }
}`,
      explanation: 'Loop 32 times. Shift the result to the left by 1 bit and add the least significant bit of n to the result. Then shift n to the right by 1 bit (use logical shift for Java). Time complexity: O(1) (exactly 32 iterations), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-191',
    slug: 'number-of-1-bits',
    title: 'Number of 1 Bits',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Write a function that takes the binary representation of a positive integer and returns the number of set bits (also known as the Hamming weight).',
    constraints: ['The input must be a valid binary representation of an integer.'],
    solutions: {
      python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n:
            n &= (n - 1)
            count += 1
        return count`,
      cpp: `class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        while (n) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
};`,
      java: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1);
            count++;
        }
        return count;
    }
}`,
      explanation: 'Use Brian Kernighan\'s algorithm: the bitwise operation n & (n - 1) clears the lowest set bit of n. Increment the count until n becomes 0. Time complexity: O(k) where k is the number of set bits, Space complexity: O(1).'
    }
  },
  {
    id: 'lc-338',
    slug: 'counting-bits',
    title: 'Counting Bits',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the **number of 1\'s** in the binary representation of `i`.',
    constraints: ['0 <= n <= 10^5'],
    solutions: {
      python: `class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp`,
      cpp: `class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; ++i) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
};`,
      java: `class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}`,
      explanation: 'Use DP. The number of set bits in i is equal to the number of set bits in i/2 (i >> 1) plus the last bit of i (i & 1). Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-746',
    slug: 'min-cost-climbing-stairs',
    title: 'Min Cost Climbing Stairs',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'You are given an integer array `cost` where `cost[i]` is the cost of `i`-th step on a staircase. Once you pay the cost, you can either climb one or two steps.\n\nYou can either start from the step with index `0`, or the step with index `1`.\n\nReturn the minimum cost to reach the top of the floor.',
    constraints: ['2 <= cost.length <= 1000', '0 <= cost[i] <= 999'],
    solutions: {
      python: `class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        a, b = 0, 0
        for x in cost:
            a, b = b, x + min(a, b)
        return min(a, b)`,
      cpp: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int a = 0, b = 0;
        for (int x : cost) {
            int t = x + min(a, b);
            a = b;
            b = t;
        }
        return min(a, b);
    }
};`,
      java: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int a = 0, b = 0;
        for (int x : cost) {
            int t = x + Math.min(a, b);
            a = b;
            b = t;
        }
        return Math.min(a, b);
    }
}`,
      explanation: 'Use dynamic programming with optimized space. Let a and b represent the min cost to stand on the previous two steps. For the current step, the cost is the step cost plus the minimum cost to reach it. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-202',
    slug: 'happy-number',
    title: 'Happy Number',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Write an algorithm to determine if a number `n` is happy.\n\nA happy number is a number defined by the following process:\n- Starting with any positive integer, replace the number by the sum of the squares of its digits.\n- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.\n- Those numbers for which this process ends in 1 are happy.\n\nReturn `true` if `n` is a happy number, and `false` if not.',
    constraints: ['1 <= n <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def isHappy(self, n: int) -> bool:
        def get_next(num):
            total = 0
            while num > 0:
                num, digit = divmod(num, 10)
                total += digit * digit
            return total
        slow = n
        fast = get_next(n)
        while fast != 1 and slow != fast:
            slow = get_next(slow)
            fast = get_next(get_next(fast))
        return fast == 1`,
      cpp: `class Solution {
    int getNext(int num) {
        int total = 0;
        while (num > 0) {
            int digit = num % 10;
            total += digit * digit;
            num /= 10;
        }
        return total;
    }
public:
    bool isHappy(int n) {
        int slow = n;
        int fast = getNext(n);
        while (fast != 1 && slow != fast) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        return fast == 1;
    }
};`,
      java: `class Solution {
    private int getNext(int num) {
        int total = 0;
        while (num > 0) {
            int digit = num % 10;
            total += digit * digit;
            num /= 10;
        }
        return total;
    }
    public boolean isHappy(int n) {
        int slow = n;
        int fast = getNext(n);
        while (fast != 1 && slow != fast) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        return fast == 1;
    }
}`,
      explanation: 'Use Floyd\'s Cycle Detection (Tortoise and Hare). Maintain two pointers moving at different speeds along the digit square sum sequence. If a cycle exists, they will meet. If it reaches 1, the number is happy. Time complexity: O(log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-876',
    slug: 'middle-of-the-linked-list',
    title: 'Middle of the Linked List',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.',
    constraints: ['The number of nodes in the list is in the range [1, 100].', '1 <= Node.val <= 100'],
    solutions: {
      python: `class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow`,
      cpp: `class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }
};`,
      java: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`,
      explanation: 'Use two pointers. The slow pointer moves one step at a time, while the fast pointer moves two steps. When fast reaches the end of the list, slow will be at the middle. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-252',
    slug: 'meeting-rooms',
    title: 'Meeting Rooms',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given an array of meeting time intervals consisting of start and end times `[[s1,e1],[s2,e2],...]` (`si < ei`), determine if a person could attend all meetings.',
    constraints: ['0 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i < end_i <= 10^6'],
    solutions: {
      python: `class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        intervals.sort(key=lambda x: x[0])
        for i in range(len(intervals) - 1):
            if intervals[i][1] > intervals[i + 1][0]:
                return False
        return True`,
      cpp: `class Solution {
public:
    bool canAttendMeetings(vector<vector<int>>& intervals) {
        if (intervals.empty()) return true;
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });
        for (int i = 0; i < intervals.size() - 1; ++i) {
            if (intervals[i][1] > intervals[i+1][0]) return false;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        if (intervals.length == 0) return true;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        for (int i = 0; i < intervals.length - 1; i++) {
            if (intervals[i][1] > intervals[i + 1][0]) return false;
        }
        return true;
    }
}`,
      explanation: 'Sort the intervals by their start times. Iterate through the sorted intervals and check if any interval overlaps with the next one (if current end time is greater than next start time). Time complexity: O(n log n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-12',
    slug: 'integer-to-roman',
    title: 'Integer to Roman',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Seven different symbols represent Roman numerals: `I`, `V`, `X`, `L`, `C`, `D` and `M`.\n\nGiven an integer `num`, convert it to a roman numeral.',
    constraints: ['1 <= num <= 3999'],
    solutions: {
      python: `class Solution:
    def intToRoman(self, num: int) -> str:
        values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
        symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
        res = []
        for v, s in zip(values, symbols):
            if num == 0: break
            count = num // v
            res.append(s * count)
            num -= v * count
        return "".join(res)`,
      cpp: `class Solution {
public:
    string intToRoman(int num) {
        int values[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        string symbols[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        string res = "";
        for (int i = 0; i < 13; ++i) {
            while (num >= values[i]) {
                res += symbols[i];
                num -= values[i];
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public String intToRoman(int num) {
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                sb.append(symbols[i]);
                num -= values[i];
            }
        }
        return sb.toString();
    }
}`,
      explanation: 'Greedy approach: iterate through the mapping of values to Roman numeral symbols from largest to smallest. Subtract the largest possible value and append its symbol until num becomes 0. Time complexity: O(1) (fixed number of transitions), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-18',
    slug: '4sum',
    title: '4Sum',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given an array `nums` of `n` integers, return an array of all the **unique** quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that:\n- `0 <= a, b, c, d < n`\n- `a`, `b`, `c`, and `d` are **distinct**.\n- `nums[a] + nums[b] + nums[c] + nums[d] == target`',
    constraints: ['1 <= nums.length <= 200', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    solutions: {
      python: `class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        res = []
        n = len(nums)
        for i in range(n):
            if i > 0 and nums[i] == nums[i - 1]: continue
            for j in range(i + 1, n):
                if j > i + 1 and nums[j] == nums[j - 1]: continue
                l, r = j + 1, n - 1
                while l < r:
                    total = nums[i] + nums[j] + nums[l] + nums[r]
                    if total == target:
                        res.append([nums[i], nums[j], nums[l], nums[r]])
                        l += 1
                        r -= 1
                        while l < r and nums[l] == nums[l - 1]: l += 1
                        while l < r and nums[r] == nums[r + 1]: r -= 1
                    elif total < target:
                        l += 1
                    else:
                        r -= 1
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n; ++j) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int l = j + 1, r = n - 1;
                while (l < r) {
                    long long total = (long long)nums[i] + nums[j] + nums[l] + nums[r];
                    if (total == target) {
                        res.push_back({nums[i], nums[j], nums[l], nums[r]});
                        l++; r--;
                        while (l < r && nums[l] == nums[l - 1]) l++;
                        while (l < r && nums[r] == nums[r + 1]) r--;
                    } else if (total < target) {
                        l++;
                    } else {
                        r--;
                    }
                }
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int l = j + 1, r = n - 1;
                while (l < r) {
                    long total = (long) nums[i] + nums[j] + nums[l] + nums[r];
                    if (total == target) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[l], nums[r]));
                        l++; r--;
                        while (l < r && nums[l] == nums[l - 1]) l++;
                        while (l < r && nums[r] == nums[r + 1]) r--;
                    } else if (total < target) {
                        l++;
                    } else {
                        r--;
                    }
                }
            }
        }
        return res;
    }
}`,
      explanation: 'Sort the array first. Loop using two nested pointers i and j. Use a two-pointer approach for the remaining subarray to find pairs that complete the target. Skip duplicates at all levels. Time complexity: O(n^3), Space complexity: O(log n) for sorting.'
    }
  },
  {
    id: 'lc-31',
    slug: 'next-permutation',
    title: 'Next Permutation',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'A **permutation** of an array of integers is an arrangement of its members into a sequence or linear order. The **next permutation** of an array of integers is the next lexicographically greater permutation of its integer.',
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        n = len(nums)
        i = n - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = n - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[i + 1:] = reversed(nums[i + 1:])`,
      cpp: `class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size(), i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) j--;
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
};`,
      java: `class Solution {
    public void nextPermutation(int[] nums) {
        int n = nums.length, i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) j--;
            int temp = nums[i]; nums[i] = nums[j]; nums[j] = temp;
        }
        int l = i + 1, r = n - 1;
        while (l < r) {
            int temp = nums[l]; nums[l] = nums[r]; nums[r] = temp;
            l++; r--;
        }
    }
}`,
      explanation: 'Find the first pair of adjacent elements nums[i] < nums[i+1] from right to left. Find the smallest element nums[j] to the right of index i that is strictly greater than nums[i]. Swap them, and reverse the subarray to the right of index i. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-43',
    slug: 'multiply-strings',
    title: 'Multiply Strings',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string. Do not use any built-in BigInteger library.',
    constraints: ['1 <= num1.length, num2.length <= 200', 'num1 and num2 consist of digits only.', 'Both num1 and num2 do not contain any leading zero, except the number 0 itself.'],
    solutions: {
      python: `class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0": return "0"
        m, n = len(num1), len(num2)
        pos = [0] * (m + n)
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                mul = int(num1[i]) * int(num2[j])
                p1, p2 = i + j, i + j + 1
                total = mul + pos[p2]
                pos[p1] += total // 10
                pos[p2] = total % 10
        res = []
        for x in pos:
            if not (len(res) == 0 and x == 0):
                res.append(str(x))
        return "".join(res)`,
      cpp: `class Solution {
public:
    string multiply(string num1, string num2) {
        if (num1 == "0" || num2 == "0") return "0";
        int m = num1.size(), n = num2.size();
        vector<int> pos(m + n, 0);
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int p1 = i + j, p2 = i + j + 1;
                int total = mul + pos[p2];
                pos[p1] += total / 10;
                pos[p2] = total % 10;
            }
        }
        string res = "";
        for (int x : pos) {
            if (!(res.empty() && x == 0)) res += to_string(x);
        }
        return res;
    }
};`,
      java: `class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0";
        int m = num1.length(), n = num2.length();
        int[] pos = new int[m + n];
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
                int p1 = i + j, p2 = i + j + 1;
                int total = mul + pos[p2];
                pos[p1] += total / 10;
                pos[p2] = total % 10;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int x : pos) {
            if (!(sb.length() == 0 && x == 0)) sb.append(x);
        }
        return sb.toString();
    }
}`,
      explanation: 'Simulate elementary school multiplication column by column. The product of digits at index i and j will contribute to positions i+j and i+j+1. Accumulate products and handle carries. Time complexity: O(m * n), Space complexity: O(m + n).'
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
