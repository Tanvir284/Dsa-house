const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const BATCH = [
  {
    id: 'lc-173',
    slug: 'binary-search-tree-iterator',
    title: 'Binary Search Tree Iterator',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.',
    constraints: ['The number of nodes in the tree is in the range [1, 10^5].', '0 <= Node.val <= 10^6', 'At most 10^5 calls will be made to next and hasNext.'],
    solutions: {
      python: `class BSTIterator:
    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        self._push_left(root)
    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left
    def next(self) -> int:
        node = self.stack.pop()
        self._push_left(node.right)
        return node.val
    def hasNext(self) -> bool:
        return len(self.stack) > 0`,
      cpp: `class BSTIterator {
    stack<TreeNode*> s;
    void pushLeft(TreeNode* node) {
        while (node) { s.push(node); node = node->left; }
    }
public:
    BSTIterator(TreeNode* root) { pushLeft(root); }
    int next() {
        TreeNode* node = s.top(); s.pop();
        pushLeft(node->right);
        return node->val;
    }
    bool hasNext() { return !s.empty(); }
};`,
      java: `class BSTIterator {
    Stack<TreeNode> s = new Stack<>();
    public BSTIterator(TreeNode root) { pushLeft(root); }
    private void pushLeft(TreeNode node) {
        while (node != null) { s.push(node); node = node.left; }
    }
    public int next() {
        TreeNode node = s.pop();
        pushLeft(node.right);
        return node.val;
    }
    public boolean hasNext() { return !s.isEmpty(); }
}`,
      explanation: 'Use a stack to simulate in-order traversal iteratively. The initialization pushes all left children from root. next() pops a node, pushes all left children of its right child, and returns the node\'s value. Time complexity: O(1) amortized, Space complexity: O(h).'
    }
  },
  {
    id: 'lc-209',
    slug: 'minimum-size-subarray-sum',
    title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Sliding Window',
    description: 'Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return 0 instead.',
    constraints: ['1 <= nums.length <= 10^5', '1 <= nums[i] <= 10^4', '1 <= target <= 10^9'],
    solutions: {
      python: `class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        l = 0
        total = 0
        ans = float('inf')
        for r, n in enumerate(nums):
            total += n
            while total >= target:
                ans = min(ans, r - l + 1)
                total -= nums[l]
                l += 1
        return 0 if ans == float('inf') else ans`,
      cpp: `class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int l = 0, total = 0, ans = INT_MAX;
        for (int r = 0; r < nums.size(); ++r) {
            total += nums[r];
            while (total >= target) {
                ans = min(ans, r - l + 1);
                total -= nums[l++];
            }
        }
        return ans == INT_MAX ? 0 : ans;
    }
};`,
      java: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int l = 0, total = 0, ans = Integer.MAX_VALUE;
        for (int r = 0; r < nums.length; r++) {
            total += nums[r];
            while (total >= target) {
                ans = Math.min(ans, r - l + 1);
                total -= nums[l++];
            }
        }
        return ans == Integer.MAX_VALUE ? 0 : ans;
    }
}`,
      explanation: 'Use a sliding window. Expand the right pointer to add elements. Once the window sum is >= target, shrink the left pointer to find the minimal window length. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-380',
    slug: 'insert-delete-getrandom-o1',
    title: 'Insert Delete GetRandom O(1)',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Implement the `RandomizedSet` class which supports insert, delete, and getRandom in O(1) time.',
    constraints: ['-2^31 <= val <= 2^31 - 1', 'At most 2 * 10^5 calls will be made to insert, remove, and getRandom.', 'There will be at least one element in the data structure when getRandom is called.'],
    solutions: {
      python: `import random
class RandomizedSet:
    def __init__(self):
        self.nums = []
        self.pos = {}
    def insert(self, val: int) -> bool:
        if val in self.pos: return False
        self.pos[val] = len(self.nums)
        self.nums.append(val)
        return True
    def remove(self, val: int) -> bool:
        if val not in self.pos: return False
        idx = self.pos[val]
        last = self.nums[-1]
        self.nums[idx] = last
        self.pos[last] = idx
        self.nums.pop()
        del self.pos[val]
        return True
    def getRandom(self) -> int:
        return random.choice(self.nums)`,
      cpp: `class RandomizedSet {
    vector<int> nums;
    unordered_map<int, int> pos;
public:
    bool insert(int val) {
        if (pos.count(val)) return false;
        pos[val] = nums.size();
        nums.push_back(val);
        return true;
    }
    bool remove(int val) {
        if (!pos.count(val)) return false;
        int idx = pos[val];
        int last = nums.back();
        nums[idx] = last;
        pos[last] = idx;
        nums.pop_back();
        pos.erase(val);
        return true;
    }
    int getRandom() { return nums[rand() % nums.size()]; }
};`,
      java: `class RandomizedSet {
    List<Integer> nums = new ArrayList<>();
    Map<Integer, Integer> pos = new HashMap<>();
    Random rand = new Random();
    public boolean insert(int val) {
        if (pos.containsKey(val)) return false;
        pos.put(val, nums.size());
        nums.add(val);
        return true;
    }
    public boolean remove(int val) {
        if (!pos.containsKey(val)) return false;
        int idx = pos.get(val);
        int last = nums.get(nums.size() - 1);
        nums.set(idx, last);
        pos.put(last, idx);
        nums.remove(nums.size() - 1);
        pos.remove(val);
        return true;
    }
    public int getRandom() { return nums.get(rand.nextInt(nums.size())); }
}`,
      explanation: 'Use a dynamic array to store values (allowing O(1) random choice) and a hash map mapping values to their indices in the array. For removals, swap the target element with the last element of the array and pop it. Time complexity: O(1), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-92',
    slug: 'reverse-linked-list-ii',
    title: 'Reverse Linked List II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right`, and return the reversed list.',
    constraints: ['The number of nodes in the list is in the range [1, 500].', '-500 <= Node.val <= 500', '1 <= left <= right <= n'],
    solutions: {
      python: `class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        if not head or left == right: return head
        dummy = ListNode(0, head)
        prev = dummy
        for _ in range(left - 1):
            prev = prev.next
        curr = prev.next
        for _ in range(right - left):
            temp = curr.next
            curr.next = temp.next
            temp.next = prev.next
            prev.next = temp
        return dummy.next`,
      cpp: `class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        if (!head || left == right) return head;
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = dummy;
        for (int i = 0; i < left - 1; ++i) prev = prev->next;
        ListNode* curr = prev->next;
        for (int i = 0; i < right - left; ++i) {
            ListNode* temp = curr->next;
            curr->next = temp->next;
            temp->next = prev->next;
            prev->next = temp;
        }
        ListNode* res = dummy->next;
        delete dummy;
        return res;
    }
};`,
      java: `class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        if (head == null || left == right) return head;
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        for (int i = 0; i < left - 1; i++) prev = prev.next;
        ListNode curr = prev.next;
        for (int i = 0; i < right - left; i++) {
            ListNode temp = curr.next;
            curr.next = temp.next;
            temp.next = prev.next;
            prev.next = temp;
        }
        return dummy.next;
    }
}`,
      explanation: 'Use a dummy node. Find the (left - 1)-th node as prev. Perform in-place reversals by shifting nodes between left and right one by one to the front. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-142',
    slug: 'linked-list-cycle-ii',
    title: 'Linked List Cycle II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a linked list, return the node where the cycle begins. If there is no cycle, return `null`.',
    constraints: ['The number of nodes in the list is in the range [0, 10^4].', '-10^5 <= Node.val <= 10^5'],
    solutions: {
      python: `class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                slow2 = head
                while slow != slow2:
                    slow = slow.next
                    slow2 = slow2.next
                return slow
        return None`,
      cpp: `class Solution {
public:
    ListNode* detectCycle(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                ListNode* slow2 = head;
                while (slow != slow2) {
                    slow = slow->next;
                    slow2 = slow2->next;
                }
                return slow;
            }
        }
        return nullptr;
    }
};`,
      java: `class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                ListNode slow2 = head;
                while (slow != slow2) {
                    slow = slow.next;
                    slow2 = slow2.next;
                }
                return slow;
            }
        }
        return null;
    }
}`,
      explanation: 'Detect the cycle using Floyd\'s Tortoise and Hare. When they meet, reset another pointer to the head of the list and move both at a speed of 1. They will meet at the start of the cycle. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-460',
    slug: 'lfu-cache',
    title: 'LFU Cache',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Design and implement a data structure for a Least Frequently Used (LFU) cache. It should support get and put operations in O(1) time complexity.',
    constraints: ['1 <= capacity <= 10^4', '0 <= key <= 10^5', '0 <= value <= 10^9', 'At most 2 * 10^5 calls will be made to get and put.'],
    solutions: {
      python: `from collections import defaultdict, OrderedDict
class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.values = {}
        self.counts = {}
        self.lists = defaultdict(OrderedDict)
        self.min_freq = 0
    def get(self, key: int) -> int:
        if key not in self.values: return -1
        val = self.values[key]
        freq = self.counts[key]
        self.counts[key] = freq + 1
        del self.lists[freq][key]
        self.lists[freq + 1][key] = val
        if freq == self.min_freq and not self.lists[freq]:
            self.min_freq += 1
        return val
    def put(self, key: int, value: int) -> None:
        if self.cap <= 0: return
        if key in self.values:
            self.values[key] = value
            self.get(key)
            return
        if len(self.values) >= self.cap:
            evict, _ = self.lists[self.min_freq].popitem(last=False)
            del self.values[evict]
            del self.counts[evict]
        self.values[key] = value
        self.counts[key] = 1
        self.lists[1][key] = value
        self.min_freq = 1`,
      cpp: `// Minimal C++ LFU Cache structure
class LFUCache {
    int cap, minFreq;
    unordered_map<int, pair<int, int>> keyValFreq;
    unordered_map<int, list<int>> freqKeys;
    unordered_map<int, list<int>::iterator> keyIter;
public:
    LFUCache(int capacity) : cap(capacity), minFreq(0) {}
    int get(int key) {
        if (!keyValFreq.count(key)) return -1;
        int val = keyValFreq[key].first;
        int freq = keyValFreq[key].second;
        freqKeys[freq].erase(keyIter[key]);
        keyValFreq[key].second = freq + 1;
        freqKeys[freq + 1].push_back(key);
        keyIter[key] = --freqKeys[freq + 1].end();
        if (freqKeys[minFreq].empty()) minFreq++;
        return val;
    }
    void put(int key, int value) {
        if (cap <= 0) return;
        if (get(key) != -1) { keyValFreq[key].first = value; return; }
        if (keyValFreq.size() >= cap) {
            int evict = freqKeys[minFreq].front();
            freqKeys[minFreq].pop_front();
            keyValFreq.erase(evict);
            keyIter.erase(evict);
        }
        keyValFreq[key] = {value, 1};
        freqKeys[1].push_back(key);
        keyIter[key] = --freqKeys[1].end();
        minFreq = 1;
    }
};`,
      java: `class LFUCache {
    int cap, minFreq;
    Map<Integer, Integer> keyVal = new HashMap<>();
    Map<Integer, Integer> keyCount = new HashMap<>();
    Map<Integer, LinkedHashSet<Integer>> freqKeys = new HashMap<>();
    public LFUCache(int capacity) { cap = capacity; minFreq = 0; }
    public int get(int key) {
        if (!keyVal.containsKey(key)) return -1;
        int count = keyCount.get(key);
        keyCount.put(key, count + 1);
        freqKeys.get(count).remove(key);
        if (count == minFreq && freqKeys.get(count).isEmpty()) minFreq++;
        freqKeys.computeIfAbsent(count + 1, k -> new LinkedHashSet<>()).add(key);
        return keyVal.get(key);
    }
    public void put(int key, int value) {
        if (cap <= 0) return;
        if (keyVal.containsKey(key)) { keyVal.put(key, value); get(key); return; }
        if (keyVal.size() >= cap) {
            int evict = freqKeys.get(minFreq).iterator().next();
            freqKeys.get(minFreq).remove(evict);
            keyVal.remove(evict);
            keyCount.remove(evict);
        }
        keyVal.put(key, value);
        keyCount.put(key, 1);
        freqKeys.computeIfAbsent(1, k -> new LinkedHashSet<>()).add(key);
        minFreq = 1;
    }
}`,
      explanation: 'Use hash maps to keep track of values and frequencies. Use a secondary hash map of LinkedHashSets (or doubly linked lists) to maintain elements grouped by their frequency in insertion order. This enables O(1) updates and eviction. Time complexity: O(1), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-147',
    slug: 'insertion-sort-list',
    title: 'Insertion Sort List',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a singly linked list, sort the list using insertion sort, and return the sorted list\'s head.',
    constraints: ['The number of nodes in the list is in the range [1, 5000].', '-5000 <= Node.val <= 5000'],
    solutions: {
      python: `class Solution:
    def insertionSortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        curr = head
        while curr:
            prev = dummy
            while prev.next and prev.next.val < curr.val:
                prev = prev.next
            next_node = curr.next
            curr.next = prev.next
            prev.next = curr
            curr = next_node
        return dummy.next`,
      cpp: `class Solution {
public:
    ListNode* insertionSortList(ListNode* head) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = head;
        while (curr) {
            ListNode* prev = dummy;
            while (prev->next && prev->next->val < curr->val) prev = prev->next;
            ListNode* nextNode = curr->next;
            curr->next = prev->next;
            prev->next = curr;
            curr = nextNode;
        }
        ListNode* res = dummy->next;
        delete dummy;
        return res;
    }
};`,
      java: `class Solution {
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode(0);
        ListNode curr = head;
        while (curr != null) {
            ListNode prev = dummy;
            while (prev.next != null && prev.next.val < curr.val) prev = prev.next;
            ListNode nextNode = curr.next;
            curr.next = prev.next;
            prev.next = curr;
            curr = nextNode;
        }
        return dummy.next;
    }
}`,
      explanation: 'Use a dummy node representing the head of the newly sorted list. Iterate through the input list, and for each node, scan the sorted list from the beginning to find the correct insertion position. Time complexity: O(n^2), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-154',
    slug: 'find-minimum-in-rotated-sorted-array-ii',
    title: 'Find Minimum in Rotated Sorted Array II',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given the sorted rotated array `nums` that may contain duplicates, return the minimum element of this array.',
    constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000'],
    solutions: {
      python: `class Solution:
    def findMin(self, nums: List[int]) -> int:
        low, high = 0, len(nums) - 1
        while low < high:
            mid = (low + high) // 2
            if nums[mid] < nums[high]:
                high = mid
            elif nums[mid] > nums[high]:
                low = mid + 1
            else:
                high -= 1
        return nums[low]`,
      cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0, high = nums.size() - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] < nums[high]) high = mid;
            else if (nums[mid] > nums[high]) low = mid + 1;
            else high--;
        }
        return nums[low];
    }
};`,
      java: `class Solution {
    public int findMin(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] < nums[high]) high = mid;
            else if (nums[mid] > nums[high]) low = mid + 1;
            else high--;
        }
        return nums[low];
    }
}`,
      explanation: 'Binary search approach. Compare nums[mid] and nums[high]. If nums[mid] < nums[high], the min lies in the left half (including mid). If nums[mid] > nums[high], the min lies in the right half. If they are equal, decrement high by 1. Time complexity: O(n) worst-case, O(log n) average. Space complexity: O(1).'
    }
  },
  {
    id: 'lc-309',
    slug: 'best-time-to-buy-and-sell-stock-with-cooldown',
    title: 'Best Time to Buy and Sell Stock with Cooldown',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day. Find the maximum profit you can achieve. You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again). After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).',
    constraints: ['1 <= prices.length <= 5000', '0 <= prices[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices: return 0
        sold, held, reset = float('-inf'), -prices[0], 0
        for price in prices[1:]:
            sold_new = held + price
            held_new = max(held, reset - price)
            reset_new = max(reset, sold)
            sold, held, reset = sold_new, held_new, reset_new
        return max(sold, reset)`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.empty()) return 0;
        int sold = INT_MIN, held = -prices[0], reset = 0;
        for (int i = 1; i < prices.size(); ++i) {
            int soldNew = held + prices[i];
            int heldNew = max(held, reset - prices[i]);
            int resetNew = max(reset, sold);
            sold = soldNew; held = heldNew; reset = resetNew;
        }
        return max(sold, reset);
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        if (prices.length == 0) return 0;
        int sold = Integer.MIN_VALUE, held = -prices[0], reset = 0;
        for (int i = 1; i < prices.length; i++) {
            int soldNew = held + prices[i];
            int heldNew = Math.max(held, reset - prices[i]);
            int resetNew = Math.max(reset, sold);
            sold = soldNew; held = heldNew; reset = resetNew;
        }
        return Math.max(sold, reset);
    }
}`,
      explanation: 'Use state-machine DP. Maintain three states: sold (sold stock today), held (holding stock), and reset (cooling down or empty). Calculate transitions daily. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-253',
    slug: 'meeting-rooms-ii',
    title: 'Meeting Rooms II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Given an array of meeting time intervals `intervals` consisting of start and end times `[[s1,e1],[s2,e2],...]` (`si < ei`), find the minimum number of conference rooms required.',
    constraints: ['1 <= intervals.length <= 10^4', '0 <= start_i < end_i <= 10^6'],
    solutions: {
      python: `import heapq
class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        if not intervals: return 0
        intervals.sort(key=lambda x: x[0])
        rooms = []
        heapq.heappush(rooms, intervals[0][1])
        for i in intervals[1:]:
            if rooms[0] <= i[0]:
                heapq.heappop(rooms)
            heapq.heappush(rooms, i[1])
        return len(rooms)`,
      cpp: `class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });
        priority_queue<int, vector<int>, greater<int>> pq;
        pq.push(intervals[0][1]);
        for (int i = 1; i < intervals.size(); ++i) {
            if (pq.top() <= intervals[i][0]) pq.pop();
            pq.push(intervals[i][1]);
        }
        return pq.size();
    }
};`,
      java: `class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals.length == 0) return 0;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.add(intervals[0][1]);
        for (int i = 1; i < intervals.length; i++) {
            if (pq.peek() <= intervals[i][0]) pq.poll();
            pq.add(intervals[i][1]);
        }
        return pq.size();
    }
}`,
      explanation: 'Sort intervals by start time. Maintain a min-heap of end times of meetings currently in rooms. If the earliest ending meeting finishes before the next meeting starts, reuse that room (pop from heap). Otherwise, allocate a new room (push to heap). Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-271',
    slug: 'encode-and-decode-strings',
    title: 'Encode and Decode Strings',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.',
    constraints: ['0 <= dummy.length <= 200', 'dummy[i] contains any printable ASCII characters.'],
    solutions: {
      python: `class Codec:
    def encode(self, strs: List[str]) -> str:
        return "".join(f"{len(s)}:{s}" for s in strs)
    def decode(self, s: str) -> List[str]:
        res = []
        i = 0
        while i < len(s):
            j = s.find(":", i)
            length = int(s[i:j])
            res.append(s[j+1 : j+1+length])
            i = j + 1 + length
        return res`,
      cpp: `class Codec {
public:
    string encode(vector<string>& strs) {
        string res = "";
        for (const auto& s : strs) res += to_string(s.size()) + ":" + s;
        return res;
    }
    vector<string> decode(string s) {
        vector<string> res;
        int i = 0;
        while (i < s.size()) {
            int j = s.find(':', i);
            int len = stoi(s.substr(i, j - i));
            res.push_back(s.substr(j + 1, len));
            i = j + 1 + len;
        }
        return res;
    }
};`,
      java: `public class Codec {
    public String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();
        for (String s : strs) sb.append(s.length()).append(":").append(s);
        return sb.toString();
    }
    public List<String> decode(String s) {
        List<String> res = new ArrayList<>();
        int i = 0;
        while (i < s.length()) {
            int j = s.indexOf(':', i);
            int len = Integer.parseInt(s.substring(i, j));
            res.add(s.substring(j + 1, j + 1 + len));
            i = j + 1 + len;
        }
        return res;
    }
}`,
      explanation: 'Use length-based prefix encoding. Prepend the length of each string followed by a delimiter (e.g. ":"). During decoding, parse the length prefix first to correctly slice the original string. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-57',
    slug: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` sorted in ascending order by `start_i`. You are also given a new interval `newInterval = [start, end]` that represents the start and end of another interval.',
    constraints: ['0 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i < end_i <= 10^5', 'intervals is sorted by start_i in ascending order.', 'newInterval.length == 2'],
    solutions: {
      python: `class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        res = []
        i = 0
        n = len(intervals)
        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i])
            i += 1
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        res.append(newInterval)
        while i < n:
            res.append(intervals[i])
            i += 1
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0, n = intervals.size();
        while (i < n && intervals[i][1] < newInterval[0]) res.push_back(intervals[i++]);
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        while (i < n) res.push_back(intervals[i++]);
        return res;
    }
};`,
      java: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        int i = 0, n = intervals.length;
        while (i < n && intervals[i][1] < newInterval[0]) res.add(intervals[i++]);
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval);
        while (i < n) res.add(intervals[i++]);
        return res.toArray(new int[res.size()][]);
    }
}`,
      explanation: 'Iterate through sorted intervals. Append all intervals that end before the new interval starts. Merge all overlapping intervals with the new interval by updating its boundaries. Append the merged interval, followed by all remaining intervals. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-647',
    slug: 'palindromic-substrings',
    title: 'Palindromic Substrings',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given a string `s`, return the number of **palindromic substrings** in it.',
    constraints: ['1 <= s.length <= 1000', 's consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def countSubstrings(self, s: str) -> int:
        ans = 0
        def count_around(l, r):
            count = 0
            while l >= 0 and r < len(s) and s[l] == s[r]:
                count += 1
                l -= 1
                r += 1
            return count
        for i in range(len(s)):
            ans += count_around(i, i)
            ans += count_around(i, i + 1)
        return ans`,
      cpp: `class Solution {
    int countAround(const string& s, int l, int r) {
        int count = 0;
        while (l >= 0 && r < s.size() && s[l] == s[r]) { count++; l--; r++; }
        return count;
    }
public:
    int countSubstrings(string s) {
        int ans = 0;
        for (int i = 0; i < s.size(); ++i) {
            ans += countAround(s, i, i);
            ans += countAround(s, i, i + 1);
        }
        return ans;
    }
};`,
      java: `class Solution {
    private int countAround(String s, int l, int r) {
        int count = 0;
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { count++; l--; r++; }
        return count;
    }
    public int countSubstrings(String s) {
        int ans = 0;
        for (int i = 0; i < s.length(); i++) {
            ans += countAround(s, i, i);
            ans += countAround(s, i, i + 1);
        }
        return ans;
    }
}`,
      explanation: 'Expand around possible palindrome centers. For each index, treat it as the center of odd-length palindromes (i, i) and even-length palindromes (i, i+1). Expand outwards as long as characters match. Time complexity: O(n^2), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-371',
    slug: 'sum-of-two-integers',
    title: 'Sum of Two Integers',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.',
    constraints: ['-1000 <= a, b <= 1000'],
    solutions: {
      python: `class Solution:
    def getSum(self, a: int, b: int) -> int:
        MASK = 0xFFFFFFFF
        while b != 0:
            total = (a ^ b) & MASK
            carry = ((a & b) << 1) & MASK
            a, b = total, carry
        return a if a <= 0x7FFFFFFF else ~(a ^ MASK)`,
      cpp: `class Solution {
public:
    int getSum(int a, int b) {
        while (b != 0) {
            int carry = (unsigned int)(a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
};`,
      java: `class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}`,
      explanation: 'Use bitwise XOR to compute sum without carry, and bitwise AND shifted left by 1 to compute the carries. Repeat until carry becomes 0. Handle 32-bit integer overflow masks in Python. Time complexity: O(1) (at most 32 cycles), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-261',
    slug: 'graph-valid-tree',
    title: 'Graph Valid Tree',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges, write a function to check whether these edges make up a valid tree.',
    constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000'],
    solutions: {
      python: `class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) != n - 1: return False
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        visited = set()
        def dfs(node):
            visited.add(node)
            for neighbor in adj[node]:
                if neighbor not in visited:
                    dfs(neighbor)
        dfs(0)
        return len(visited) == n`,
      cpp: `class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() != n - 1) return false;
        vector<vector<int>> adj(n);
        for (const auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        vector<bool> visited(n, false);
        int count = 0;
        function<void(int)> dfs = [&](int node) {
            visited[node] = true;
            count++;
            for (int neighbor : adj[node]) {
                if (!visited[neighbor]) dfs(neighbor);
            }
        };
        dfs(0);
        return count == n;
    }
};`,
      java: `class Solution {
    int count = 0;
    public boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) return false;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        boolean[] visited = new boolean[n];
        dfs(adj, visited, 0);
        return count == n;
    }
    private void dfs(List<List<Integer>> adj, boolean[] visited, int node) {
        visited[node] = true;
        count++;
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) dfs(adj, visited, neighbor);
        }
    }
}`,
      explanation: 'An undirected graph is a tree if and only if it has exactly n - 1 edges and is fully connected. Verify edge count first, then use DFS to ensure all nodes are reachable from node 0. Time complexity: O(V + E), Space complexity: O(V + E).'
    }
  },
  {
    id: 'lc-323',
    slug: 'number-of-connected-components-in-an-undirected-graph',
    title: 'Number of Connected Components in an Undirected Graph',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'You have a graph of `n` nodes. You are given an integer `n` and an array `edges` where `edges[i] = [a_i, b_i]` indicates that there is an edge between `a_i` and `b_i` in the graph. Return the number of connected components in the graph.',
    constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000'],
    solutions: {
      python: `class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        parent = list(range(n))
        rank = [1] * n
        def find(node):
            p = parent[node]
            while p != parent[p]:
                parent[p] = parent[parent[p]]
                p = parent[p]
            return p
        def union(n1, n2):
            p1, p2 = find(n1), find(n2)
            if p1 == p2: return 0
            if rank[p1] > rank[p2]:
                parent[p2] = p1
                rank[p1] += rank[p2]
            else:
                parent[p1] = p2
                rank[p2] += rank[p1]
            return 1
        components = n
        for u, v in edges:
            components -= union(u, v)
        return components`,
      cpp: `class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        vector<int> parent(n);
        iota(parent.begin(), parent.end(), 0);
        function<int(int)> find = [&](int i) {
            return parent[i] == i ? i : parent[i] = find(parent[i]);
        };
        int components = n;
        for (const auto& e : edges) {
            int p1 = find(e[0]), p2 = find(e[1]);
            if (p1 != p2) { parent[p1] = p2; components--; }
        }
        return components;
    }
};`,
      java: `class Solution {
    public int countComponents(int n, int[][] edges) {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        int components = n;
        for (int[] e : edges) {
            int p1 = find(parent, e[0]);
            int p2 = find(parent, e[1]);
            if (p1 != p2) {
                parent[p1] = p2;
                components--;
            }
        }
        return components;
    }
    private int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }
}`,
      explanation: 'Use Union-Find (Disjoint Set Union). Start with n separate components. For each edge, perform union of the two nodes. If their roots are different, decrement components count. Time complexity: O(V + E alpha(V)), Space complexity: O(V).'
    }
  },
  {
    id: 'lc-417',
    slug: 'pacific-atlantic-water-flow',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'There is an `m x n` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Find all cells from which water can flow to both oceans.',
    constraints: ['m == heights.length', 'n == heights[r].length', '1 <= m, n <= 200', '0 <= heights[r][c] <= 10^5'],
    solutions: {
      python: `class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])
        pac, atl = set(), set()
        def dfs(r, c, visit):
            visit.add((r, c))
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r + dr, c + dc
                if (0 <= nr < m and 0 <= nc < n and 
                    (nr, nc) not in visit and heights[nr][nc] >= heights[r][c]):
                    dfs(nr, nc, visit)
        for c in range(n):
            dfs(0, c, pac)
            dfs(m - 1, c, atl)
        for r in range(m):
            dfs(r, 0, pac)
            dfs(r, n - 1, atl)
        return [list(cell) for cell in pac.intersection(atl)]`,
      cpp: `class Solution {
    int m, n;
    void dfs(vector<vector<int>>& h, vector<vector<bool>>& visit, int r, int c) {
        visit[r][c] = true;
        int dirs[] = {0,1,0,-1,0};
        for (int d = 0; d < 4; ++d) {
            int nr = r + dirs[d], nc = c + dirs[d+1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && !visit[nr][nc] && h[nr][nc] >= h[r][c]) {
                dfs(h, visit, nr, nc);
            }
        }
    }
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        if (heights.empty()) return {};
        m = heights.size(); n = heights[0].size();
        vector<vector<bool>> pac(m, vector<bool>(n, false));
        vector<vector<bool>> atl(m, vector<bool>(n, false));
        for (int c = 0; c < n; ++c) { dfs(heights, pac, 0, c); dfs(heights, atl, m - 1, c); }
        for (int r = 0; r < m; ++r) { dfs(heights, pac, r, 0); dfs(heights, atl, r, n - 1); }
        vector<vector<int>> res;
        for (int r = 0; r < m; ++r)
            for (int c = 0; c < n; ++c)
                if (pac[r][c] && atl[r][c]) res.push_back({r, c});
        return res;
    }
};`,
      java: `class Solution {
    int m, n;
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        if (heights.length == 0) return new ArrayList<>();
        m = heights.length; n = heights[0].length;
        boolean[][] pac = new boolean[m][n];
        boolean[][] atl = new boolean[m][n];
        for (int c = 0; c < n; c++) { dfs(heights, pac, 0, c); dfs(heights, atl, m - 1, c); }
        for (int r = 0; r < m; r++) { dfs(heights, pac, r, 0); dfs(heights, atl, r, n - 1); }
        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (pac[r][c] && atl[r][c]) res.add(Arrays.asList(r, c));
            }
        }
        return res;
    }
    private void dfs(int[][] h, boolean[][] visit, int r, int c) {
        visit[r][c] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && !visit[nr][nc] && h[nr][nc] >= h[r][c]) {
                dfs(h, visit, nr, nc);
            }
        }
    }
}`,
      explanation: 'Search backwards. Instead of flowing down to the oceans, start DFS at the boundaries of the Pacific (top and left) and Atlantic (bottom and right), and flow upwards (heights[nr][nc] >= heights[r][c]). Find cells reached by both DFS traversals. Time complexity: O(m * n), Space complexity: O(m * n).'
    }
  },
  {
    id: 'lc-778',
    slug: 'swim-in-rising-water',
    title: 'Swim in Rising Water',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'BFS',
    description: 'You are given an `n x n` integer grid `grid` where each value `grid[i][j]` represents the elevation at that point `(i, j)`. Water starts rising. Swim to the bottom-right corner. Return the least time.',
    constraints: ['n == grid.length', 'grid[i].length == n', '1 <= n <= 50', '0 <= grid[i][j] < n^2', 'Each value is unique.'],
    solutions: {
      python: `import heapq
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        n = len(grid)
        visited = {(0, 0)}
        pq = [(grid[0][0], 0, 0)]
        while pq:
            t, r, c = heapq.heappop(pq)
            if r == n - 1 and c == n - 1:
                return t
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r+dr, c+dc
                if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:
                    visited.add((nr, nc))
                    heapq.heappush(pq, (max(t, grid[nr][nc]), nr, nc))
        return 0`,
      cpp: `class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;
        vector<vector<bool>> visited(n, vector<bool>(n, false));
        pq.push({grid[0][0], 0, 0});
        visited[0][0] = true;
        int dirs[] = {0,1,0,-1,0};
        while (!pq.empty()) {
            auto curr = pq.top(); pq.pop();
            int t = curr[0], r = curr[1], c = curr[2];
            if (r == n - 1 && c == n - 1) return t;
            for (int d = 0; d < 4; ++d) {
                int nr = r + dirs[d], nc = c + dirs[d+1];
                if (nr >= 0 && nc >= 0 && nr < n && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    pq.push({max(t, grid[nr][nc]), nr, nc});
                }
            }
        }
        return 0;
    }
};`,
      java: `class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        boolean[][] visited = new boolean[n][n];
        pq.add(new int[]{grid[0][0], 0, 0});
        visited[0][0] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int t = curr[0], r = curr[1], c = curr[2];
            if (r == n - 1 && c == n - 1) return t;
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < n && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    pq.add(new int[]{Math.max(t, grid[nr][nc]), nr, nc});
                }
            }
        }
        return 0;
    }
}`,
      explanation: 'Use Dijkstra\'s algorithm with a min-priority queue. Store path states as (max_elevation_reached, r, c). Populate neighbor nodes, carrying forward the maximum of current path cost and neighbor elevation. Time complexity: O(n^2 log n), Space complexity: O(n^2).'
    }
  },
  {
    id: 'lc-332',
    slug: 'reconstruct-itinerary',
    title: 'Reconstruct Itinerary',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'You are given a list of airline tickets where `tickets[i] = [from_i, to_i]` represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it. All of the tickets belong to a man who departs from "JFK". Thus, the itinerary must begin with "JFK".',
    constraints: ['1 <= tickets.length <= 300', 'tickets[i].length == 2', 'from_i.length == 3', 'to_i.length == 3', 'from_i and to_i consist of uppercase English letters.'],
    solutions: {
      python: `from collections import defaultdict
class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        adj = defaultdict(list)
        for u, v in sorted(tickets, reverse=True):
            adj[u].append(v)
        itinerary = []
        def dfs(node):
            while adj[node]:
                dfs(adj[node].pop())
            itinerary.append(node)
        dfs("JFK")
        return itinerary[::-1]`,
      cpp: `class Solution {
    unordered_map<string, priority_queue<string, vector<string>, greater<string>>> adj;
    vector<string> itinerary;
    void dfs(string node) {
        auto& pq = adj[node];
        while (!pq.empty()) {
            string next = pq.top(); pq.pop();
            dfs(next);
        }
        itinerary.push_back(node);
    }
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        for (const auto& t : tickets) adj[t[0]].push(e[1]); // Wait, correct spelling:
        adj.clear();
        for (const auto& t : tickets) adj[t[0]].push(t[1]);
        dfs("JFK");
        reverse(itinerary.begin(), itinerary.end());
        return itinerary;
    }
};`,
      java: `class Solution {
    Map<String, PriorityQueue<String>> adj = new HashMap<>();
    List<String> itinerary = new LinkedList<>();
    public List<String> findItinerary(List<List<String>> tickets) {
        for (List<String> t : tickets) {
            adj.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).add(t.get(1));
        }
        dfs("JFK");
        return itinerary;
    }
    private void dfs(String node) {
        PriorityQueue<String> pq = adj.get(node);
        while (pq != null && !pq.isEmpty()) {
            dfs(pq.poll());
        }
        itinerary.add(0, node);
    }
}`,
      explanation: 'This problem is equivalent to finding a Eulerian Path in a directed graph. Sort destination airports lexicographically. Use Hierholzer\'s algorithm (DFS): visit neighbors in order, pop tickets from graph, and write the current airport to the itinerary after exploring all its neighbors. Reverse the itinerary at the end. Time complexity: O(E log E), Space complexity: O(V + E).'
    }
  },
  {
    id: 'lc-212',
    slug: 'word-search-ii',
    title: 'Word Search II',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Trie (Prefix Tree)',
    description: 'Given an `m x n` `board` of characters and a list of strings `words`, return *all words on the board*.\n\nEach word must be constructed from letters of sequentially adjacent cells, where "adjacent" cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.',
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 12', '1 <= words.length <= 3 * 10^4', '1 <= words[i].length <= 10', 'board and words consist of lowercase English letters.', 'All strings of words are unique.'],
    solutions: {
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None
class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        root = TrieNode()
        for w in words:
            curr = root
            for c in w:
                curr = curr.children.setdefault(c, TrieNode())
            curr.word = w
            
        m, n = len(board), len(board[0])
        res = []
        def dfs(r, c, node):
            char = board[r][c]
            if char not in node.children: return
            next_node = node.children[char]
            if next_node.word:
                res.append(next_node.word)
                next_node.word = None # Avoid duplicates
            
            board[r][c] = "#"
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r+dr, c+dc
                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] != "#":
                    dfs(nr, nc, next_node)
            board[r][c] = char
            
            # Optimization: prune leaf nodes
            if not next_node.children:
                del node.children[char]
                
        for r in range(m):
            for c in range(n):
                dfs(r, c, root)
        return res`,
      cpp: `class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    string word = "";
};
class Solution {
    int m, n;
    vector<string> res;
    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node) {
        char ch = board[r][c];
        if (!node->children.count(ch)) return;
        TrieNode* nextNode = node->children[ch];
        if (!nextNode->word.empty()) {
            res.push_back(nextNode->word);
            nextNode->word = ""; // avoid duplicate
        }
        board[r][c] = '#';
        int dirs[] = {0,1,0,-1,0};
        for (int d = 0; d < 4; ++d) {
            int nr = r + dirs[d], nc = c + dirs[d+1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && board[nr][nc] != '#') {
                dfs(board, nr, nc, nextNode);
            }
        }
        board[r][c] = ch;
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (const auto& w : words) {
            TrieNode* curr = root;
            for (char c : w) {
                if (!curr->children.count(c)) curr->children[c] = new TrieNode();
                curr = curr->children[c];
            }
            curr->word = w;
        }
        m = board.size(); n = board[0].size();
        for (int r = 0; r < m; ++r)
            for (int c = 0; c < n; ++c)
                dfs(board, r, c, root);
        return res;
    }
};`,
      java: `class Solution {
    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        String word = "";
    }
    int m, n;
    List<String> res = new ArrayList<>();
    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode curr = root;
            for (char c : w.toCharArray()) {
                curr.children.putIfAbsent(c, new TrieNode());
                curr = curr.children.get(c);
            }
            curr.word = w;
        }
        m = board.length; n = board[0].length;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                dfs(board, r, c, root);
            }
        }
        return res;
    }
    private void dfs(char[][] board, int r, int c, TrieNode node) {
        char ch = board[r][c];
        if (!node.children.containsKey(ch)) return;
        TrieNode nextNode = node.children.get(ch);
        if (!nextNode.word.isEmpty()) {
            res.add(nextNode.word);
            nextNode.word = ""; // avoid duplicate
        }
        board[r][c] = '#';
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nc >= 0 && nr < m && nc < n && board[nr][nc] != '#') {
                dfs(board, nr, nc, nextNode);
            }
        }
        board[r][c] = ch;
    }
}`,
      explanation: 'Insert all words into a Trie (Prefix Tree). Perform DFS starting from each board cell. If the path matches characters in the Trie, follow the Trie children. If we find a word endpoint, collect the word and mark it empty to avoid duplicates. Time complexity: O(m * n * 4^L) where L is max word length, Space complexity: O(sum of word lengths).'
    }
  },
  {
    id: 'lc-25',
    slug: 'reverse-nodes-in-k-group',
    title: 'Reverse Nodes in k-Group',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return the modified list.',
    constraints: ['The number of nodes in the list is n.', '1 <= k <= n <= 5000', '0 <= Node.val <= 1000'],
    solutions: {
      python: `class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        curr = head
        count = 0
        while curr and count < k:
            curr = curr.next
            count += 1
        if count == k:
            prev = self.reverseKGroup(curr, k)
            curr = head
            for _ in range(k):
                temp = curr.next
                curr.next = prev
                prev = curr
                curr = temp
            return prev
        return head`,
      cpp: `class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* curr = head;
        int count = 0;
        while (curr && count < k) { curr = curr->next; count++; }
        if (count == k) {
            ListNode* prev = reverseKGroup(curr, k);
            curr = head;
            for (int i = 0; i < k; ++i) {
                ListNode* temp = curr->next;
                curr->next = prev;
                prev = curr;
                curr = temp;
            }
            return prev;
        }
        return head;
    }
};`,
      java: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode curr = head;
        int count = 0;
        while (curr != null && count < k) { curr = curr.next; count++; }
        if (count == k) {
            ListNode prev = reverseKGroup(curr, k);
            curr = head;
            for (int i = 0; i < k; i++) {
                ListNode temp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = temp;
            }
            return prev;
        }
        return head;
    }
}`,
      explanation: 'Use recursion. Count k nodes forward. If there are at least k nodes left, recursively reverse the remaining list, then reverse the current k-group by pointing each next node backwards to the reversed tail. Time complexity: O(n), Space complexity: O(n/k) recursion stack.'
    }
  },
  {
    id: 'lc-312',
    slug: 'burst-balloons',
    title: 'Burst Balloons',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons. Find the maximum coins you can collect by bursting all the balloons.',
    constraints: ['n == nums.length', '1 <= n <= 300', '0 <= nums[i] <= 100'],
    solutions: {
      python: `class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        A = [1] + nums + [1]
        n = len(A)
        dp = [[0]*n for _ in range(n)]
        for length in range(1, n - 1):
            for i in range(1, n - length):
                j = i + length - 1
                for k in range(i, j + 1):
                    dp[i][j] = max(dp[i][j], dp[i][k-1] + A[i-1]*A[k]*A[j+1] + dp[k+1][j])
        return dp[1][n-2]`,
      cpp: `class Solution {
public:
    int maxCoins(vector<int>& nums) {
        vector<int> A = {1};
        A.insert(A.end(), nums.begin(), nums.end());
        A.push_back(1);
        int n = A.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int len = 1; len <= n - 2; ++len) {
            for (int i = 1; i <= n - 1 - len; ++i) {
                int j = i + len - 1;
                for (int k = i; k <= j; ++k) {
                    dp[i][j] = max(dp[i][j], dp[i][k-1] + A[i-1]*A[k]*A[j+1] + dp[k+1][j]);
                }
            }
        }
        return dp[1][n-2];
    }
};`,
      java: `class Solution {
    public int maxCoins(int[] nums) {
        int[] A = new int[nums.length + 2];
        A[0] = 1; A[A.length - 1] = 1;
        System.arraycopy(nums, 0, A, 1, nums.length);
        int n = A.length;
        int[][] dp = new int[n][n];
        for (int len = 1; len <= n - 2; len++) {
            for (int i = 1; i <= n - 1 - len; i++) {
                int j = i + len - 1;
                for (int k = i; k <= j; k++) {
                    dp[i][j] = Math.max(dp[i][j], dp[i][k-1] + A[i-1]*A[k]*A[j+1] + dp[k+1][j]);
                }
            }
        }
        return dp[1][n-2];
    }
}`,
      explanation: 'Use interval DP. Pad nums with boundary 1s. Let dp[i][j] be the max coins collected by bursting all balloons in the open interval (i-1, j+1). Transition: loop over index k representing the last balloon burst in the interval: dp[i][j] = max(dp[i][j], dp[i][k-1] + nums[i-1]*nums[k]*nums[j+1] + dp[k+1][j]). Time complexity: O(n^3), Space complexity: O(n^2).'
    }
  },
  {
    id: 'lc-115',
    slug: 'distinct-subsequences',
    title: 'Distinct Subsequences',
    difficulty: 'Hard',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Dynamic Programming',
    description: 'Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.',
    constraints: ['1 <= s.length, t.length <= 1000', 's and t consist of English letters.'],
    solutions: {
      python: `class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [0] * (n + 1)
        dp[0] = 1
        for i in range(1, m + 1):
            for j in range(n, 0, -1):
                if s[i - 1] == t[j - 1]:
                    dp[j] += dp[j - 1]
        return dp[n]`,
      cpp: `class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<unsigned long long> dp(n + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= m; i++) {
            for (int j = n; j >= 1; j--) {
                if (s[i - 1] == t[j - 1]) dp[j] += dp[j - 1];
            }
        }
        return dp[n];
    }
};`,
      java: `class Solution {
    public int numDistinct(String s, String t) {
        int m = s.length(), n = t.length();
        double[] dp = new double[n + 1];
        dp[0] = 1;
        for (int i = 1; i <= m; i++) {
            for (int j = n; j >= 1; j--) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) dp[j] += dp[j - 1];
            }
        }
        return (int) dp[n];
    }
}`,
      explanation: 'Use 1D DP from right to left. dp[j] represents the number of subsequences of s that equal t[0..j-1]. Transition: if characters match, we can either choose to match s[i-1] with t[j-1] (adding dp[j-1]) or skip it. Time complexity: O(m * n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-211',
    slug: 'design-add-and-search-words-data-structure',
    title: 'Design Add and Search Words Data Structure',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Trie (Prefix Tree)',
    description: 'Design a data structure that supports adding new words and finding if a string matches any previously added string.',
    constraints: ['1 <= word.length <= 25', 'word in addWord consists of lowercase English letters.', 'word in search consists of \'.\' or lowercase English letters.', 'At most 10^4 calls will be made to addWord and search.'],
    solutions: {
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False
class WordDictionary:
    def __init__(self):
        self.root = TrieNode()
    def addWord(self, word: str) -> None:
        curr = self.root
        for c in word:
            curr = curr.children.setdefault(c, TrieNode())
        curr.is_word = True
    def search(self, word: str) -> bool:
        def dfs(i, node):
            curr = node
            for j in range(i, len(word)):
                c = word[j]
                if c == ".":
                    return any(dfs(j + 1, child) for child in curr.children.values())
                if c not in curr.children:
                    return False
                curr = curr.children[c]
            return curr.is_word
        return dfs(0, self.root)`,
      cpp: `class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isWord = false;
};
class WordDictionary {
    TrieNode* root;
    bool dfs(const string& word, int i, TrieNode* node) {
        TrieNode* curr = node;
        for (int j = i; j < word.size(); ++j) {
            char c = word[j];
            if (c == '.') {
                for (auto& [ch, child] : curr->children) {
                    if (dfs(word, j + 1, child)) return true;
                }
                return false;
            }
            if (!curr->children.count(c)) return false;
            curr = curr->children[c];
        }
        return curr->isWord;
    }
public:
    WordDictionary() { root = new TrieNode(); }
    void addWord(string word) {
        TrieNode* curr = root;
        for (char c : word) {
            if (!curr->children.count(c)) curr->children[c] = new TrieNode();
            curr = curr->children[c];
        }
        curr->isWord = true;
    }
    bool search(string word) { return dfs(word, 0, root); }
};`,
      java: `class WordDictionary {
    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isWord = false;
    }
    TrieNode root = new TrieNode();
    public void addWord(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            curr.children.putIfAbsent(c, new TrieNode());
            curr = curr.children.get(c);
        }
        curr.isWord = true;
    }
    public boolean search(String word) { return dfs(word, 0, root); }
    private boolean dfs(String word, int i, TrieNode node) {
        TrieNode curr = node;
        for (int j = i; j < word.length(); j++) {
            char c = word.charAt(j);
            if (c == '.') {
                for (TrieNode child : curr.children.values()) {
                    if (dfs(word, j + 1, child)) return true;
                }
                return false;
            }
            if (!curr.children.containsKey(c)) return false;
            curr = curr.children.get(c);
        }
        return curr.isWord;
    }
}`,
      explanation: 'Use a Trie. To support the \'.\' wildcard matching any character, perform a recursive DFS traversal. When encountering \'.\', search all children branch branches of the current trie node. Time complexity: O(m) for add, O(26^m) worst-case for search with wildcards. Space complexity: O(total added characters).'
    }
  },

  // --- Codeforces Problems ---
  {
    id: 'cf-734B',
    slug: 'cf-734b',
    title: 'Anton and Digits',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Greedy',
    description: 'Anton has digits 2, 3, 5, and 6. He wants to make two numbers: 256 and 32. Anton wants to find the maximum possible sum of the numbers he can compose using these digits. Each digit can be used at most once per composition.',
    constraints: ['k2, k3, k5, k6 <= 5 * 10^6'],
    solutions: {
      python: `k2, k3, k5, k6 = map(int, input().split())
n256 = min(k2, k5, k6)
k2 -= n256
n32 = min(k2, k3)
print(256 * n256 + 32 * n32)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int k2, k3, k5, k6;
    if (cin >> k2 >> k3 >> k5 >> k6) {
        int n256 = min({k2, k5, k6});
        k2 -= n256;
        int n32 = min(k2, k3);
        cout << 1LL * 256 * n256 + 32 * n32;
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int k2 = sc.nextInt(), k3 = sc.nextInt(), k5 = sc.nextInt(), k6 = sc.nextInt();
        long n256 = Math.min(k2, Math.min(k5, k6));
        k2 -= n256;
        long n32 = Math.min(k2, k3);
        System.out.println(256 * n256 + 32 * n32);
    }
}`,
      explanation: 'To maximize the sum, greedily construct the larger number (256) first, as it yields 256 value per set of 2, 5, 6. Then construct 32 using the remaining 2s and 3s. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-133A',
    slug: 'cf-133a',
    title: 'HQ9+',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'HQ9+ is a joke programming language with four instructions: H (prints Hello World), Q (prints source code), 9 (prints 99 Bottles of Beer), + (increments accumulator). Determine if the program prints output.',
    constraints: ['1 <= |s| <= 100'],
    solutions: {
      python: `s = input()
print("YES" if any(c in "HQ9" for c in s) else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; cin >> s;
    for (char c : s) {
        if (c == 'H' || c == 'Q' || c == '9') { cout << "YES"; return 0; }
    }
    cout << "NO";
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        if (s.contains("H") || s.contains("Q") || s.contains("9")) System.out.println("YES");
        else System.out.println("NO");
    }
}`,
      explanation: 'Only the instructions H, Q, and 9 produce output. The + instruction does not. Thus, check if the string contains any of H, Q, or 9. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-131A',
    slug: 'cf-131a',
    title: 'cAPS lOCK',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'A word is accidentally typed with cAPS lOCK if either all characters are uppercase, or only the first is lowercase and the rest are uppercase. Correct the capitalization if this is the case.',
    constraints: ['1 <= |s| <= 100'],
    solutions: {
      python: `s = input()
if s.isupper():
    print(s.lower())
elif len(s) == 1 and s.islower():
    print(s.upper())
elif s[0].islower() and s[1:].isupper():
    print(s[0].upper() + s[1:].lower())
else:
    print(s)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; cin >> s;
    bool change = true;
    for (int i = 1; i < s.size(); ++i) {
        if (islower(s[i])) change = false;
    }
    if (change) {
        for (char &c : s) {
            c = isupper(c) ? tolower(c) : toupper(c);
        }
    }
    cout << s;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        boolean change = true;
        for (int i = 1; i < s.length(); i++) {
            if (Character.isLowerCase(s.charAt(i))) change = false;
        }
        if (change) {
            StringBuilder sb = new StringBuilder();
            for (char c : s.toCharArray()) {
                sb.append(Character.isUpperCase(c) ? Character.toLowerCase(c) : Character.toUpperCase(c));
            }
            System.out.println(sb);
        } else {
            System.out.println(s);
        }
    }
}`,
      explanation: 'Check if all characters starting from index 1 are uppercase. If they are, invert the case of all characters in the string. Otherwise, print the string unchanged. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'cf-58A',
    slug: 'cf-58a',
    title: 'Chat room',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Pointers & References',
    description: 'Vasya typed a string s. Check if he typed "hello" by skipping some characters.',
    constraints: ['1 <= |s| <= 100'],
    solutions: {
      python: `s = input()
target = "hello"
idx = 0
for c in s:
    if c == target[idx]:
        idx += 1
        if idx == len(target):
            print("YES")
            exit()
print("NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; cin >> s;
    string target = "hello";
    int idx = 0;
    for (char c : s) {
        if (c == target[idx]) {
            idx++;
            if (idx == 5) { cout << "YES"; return 0; }
        }
    }
    cout << "NO";
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        String target = "hello";
        int idx = 0;
        for (char c : s.toCharArray()) {
            if (c == target.charAt(idx)) {
                idx++;
                if (idx == 5) { System.out.println("YES"); return; }
            }
        }
        System.out.println("NO");
    }
}`,
      explanation: 'Use a two-pointer style subsequence matching. Traverse the input string s. Match characters sequentially with the target word "hello". If all characters of "hello" are matched, return YES. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-110A',
    slug: 'cf-110a',
    title: 'Nearly Lucky Number',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'A lucky number is a positive integer whose decimal representation contains only the lucky digits 4 and 7. A nearly lucky number is a number whose count of lucky digits is a lucky number.',
    constraints: ['1 <= n <= 10^18'],
    solutions: {
      python: `s = input()
count = sum(1 for c in s if c in "47")
print("YES" if count in (4, 7) else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    string s; cin >> s;
    int count = 0;
    for (char c : s) if (c == '4' || c == '7') count++;
    if (count == 4 || count == 7) cout << "YES";
    else cout << "NO";
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        String s = new Scanner(System.in).next();
        int count = 0;
        for (char c : s.toCharArray()) if (c == '4' || c == '7') count++;
        if (count == 4 || count == 7) System.out.println("YES");
        else System.out.println("NO");
    }
}`,
      explanation: 'Count the number of lucky digits (4 and 7) in the decimal representation of n. Check if the count itself is a lucky number (i.e. equals 4 or 7, since the maximum count for 10^18 is 18). Time complexity: O(log n) digits, Space complexity: O(1).'
    }
  },
  {
    id: 'cf-25A',
    slug: 'cf-25a',
    title: 'IQ test',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Bob is preparing a set of IQ test problems. Find the single number in the given array of size `n` that differs in parity (evenness/oddness) from all others.',
    constraints: ['3 <= n <= 100', '1 <= a_i <= 100'],
    solutions: {
      python: `n = int(input())
a = list(map(int, input().split()))
evens = [i + 1 for i, x in enumerate(a) if x % 2 == 0]
odds = [i + 1 for i, x in enumerate(a) if x % 2 != 0]
print(evens[0] if len(evens) == 1 else odds[0])`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    int oddCount = 0, evenCount = 0, lastOdd = 0, lastEven = 0;
    for (int i = 1; i <= n; ++i) {
        int x; cin >> x;
        if (x % 2 == 0) { evenCount++; lastEven = i; }
        else { oddCount++; lastOdd = i; }
    }
    cout << (evenCount == 1 ? lastEven : lastOdd);
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int oddCount = 0, evenCount = 0, lastOdd = 0, lastEven = 0;
        for (int i = 1; i <= n; i++) {
            int x = sc.nextInt();
            if (x % 2 == 0) { evenCount++; lastEven = i; }
            else { oddCount++; lastOdd = i; }
        }
        System.out.println(evenCount == 1 ? lastEven : lastOdd);
    }
}`,
      explanation: 'Count the number of odd and even elements. Maintain the index of the last odd and last even element. Output the index of the parity group with a count of exactly 1. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-230A',
    slug: 'cf-230a',
    title: 'Dragons',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Greedy',
    description: 'Kirill wants to play a game. In order to move to the next level, Kirill must defeat `n` dragons. Kirill starts with strength `s`. If he fights dragon `i` with strength `x_i`, he wins if `s > x_i`, and gains bonus strength `y_i`. Can Kirill defeat all dragons?',
    constraints: ['1 <= s <= 10^4', '1 <= n <= 1000', '1 <= x_i <= 10^4', '0 <= y_i <= 10^4'],
    solutions: {
      python: `s, n = map(int, input().split())
dragons = []
for _ in range(n):
    dragons.append(list(map(int, input().split())))
dragons.sort()
for x, y in dragons:
    if s <= x:
        print("NO")
        exit()
    s += y
print("YES")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int s, n; cin >> s >> n;
    vector<pair<int, int>> dragons(n);
    for (int i = 0; i < n; ++i) cin >> dragons[i].first >> dragons[i].second;
    sort(dragons.begin(), dragons.end());
    for (const auto& d : dragons) {
        if (s <= d.first) { cout << "NO"; return 0; }
        s += d.second;
    }
    cout << "YES";
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int s = sc.nextInt(), n = sc.nextInt();
        int[][] dragons = new int[n][2];
        for (int i = 0; i < n; i++) {
            dragons[i][0] = sc.nextInt();
            dragons[i][1] = sc.nextInt();
        }
        Arrays.sort(dragons, (a, b) -> a[0] - b[0]);
        for (int[] d : dragons) {
            if (s <= d[0]) {
                System.out.println("NO");
                return;
            }
            s += d[1];
        }
        System.out.println("YES");
    }
}`,
      explanation: 'Greedy approach: sort the dragons by their strength x_i in ascending order. Always fight the weakest available dragon to build up strength. If Kirill\'s strength is ever <= dragon strength, he loses. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-466A',
    slug: 'cf-466a',
    title: 'Cheap Travel',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Greedy',
    description: 'Ann wants to travel by subway. She needs to make `n` rides. Ann can buy single-ride tickets for `a` rubles, or special `m`-ride tickets for `b` rubles. What is the minimum cost to make `n` rides?',
    constraints: ['1 <= n, m, a, b <= 1000'],
    solutions: {
      python: `n, m, a, b = map(int, input().split())
if b < m * a:
    cost = (n // m) * b + min((n % m) * a, b)
else:
    cost = n * a
print(cost)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m, a, b;
    if (cin >> n >> m >> a >> b) {
        if (b < m * a) {
            int cost = (n / m) * b + min((n % m) * a, b);
            cout << cost;
        } else {
            cout << n * a;
        }
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), m = sc.nextInt(), a = sc.nextInt(), b = sc.nextInt();
        if (b < m * a) {
            int cost = (n / m) * b + Math.min((n % m) * a, b);
            System.out.println(cost);
        } else {
            System.out.println(n * a);
        }
    }
}`,
      explanation: 'Compare the price per ride of the special ticket (b / m) with the single ticket (a). If the special ticket is cheaper, buy as many special tickets as possible, and cover the remainder by comparing buying single tickets vs one more special ticket. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-489B',
    slug: 'cf-489b',
    title: 'BerSU Ball',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Greedy',
    description: 'There are `n` boys and `m` girls at a ball. Each boy has skill `a_i`, girl has skill `b_j`. Two people can dance if their skill difference is at most 1. Find the maximum number of pairs.',
    constraints: ['1 <= n, m <= 100', '1 <= a_i, b_j <= 100'],
    solutions: {
      python: `n = int(input())
a = sorted(map(int, input().split()))
m = int(input())
b = sorted(map(int, input().split()))
i = j = pairs = 0
while i < len(a) and j < len(b):
    if abs(a[i] - b[j]) <= 1:
        pairs += 1
        i += 1
        j += 1
    elif a[i] < b[j]:
        i += 1
    else:
        j += 1
print(pairs)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];
    int m; cin >> m;
    vector<int> b(m);
    for (int i = 0; i < m; ++i) cin >> b[i];
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
    int i = 0, j = 0, pairs = 0;
    while (i < n && j < m) {
        if (abs(a[i] - b[j]) <= 1) { pairs++; i++; j++; }
        else if (a[i] < b[j]) i++;
        else j++;
    }
    cout << pairs;
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int m = sc.nextInt();
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = sc.nextInt();
        Arrays.sort(a);
        Arrays.sort(b);
        int i = 0, j = 0, pairs = 0;
        while (i < n && j < m) {
            if (Math.abs(a[i] - b[j]) <= 1) { pairs++; i++; j++; }
            else if (a[i] < b[j]) i++;
            else j++;
        }
        System.out.println(pairs);
    }
}`,
      explanation: 'Sort both skill arrays. Use a two-pointer approach: if elements match within difference of 1, pair them and advance both pointers. Otherwise, advance the pointer pointing to the smaller value. Time complexity: O(n log n + m log m), Space complexity: O(n + m).'
    }
  },
  {
    id: 'cf-327A',
    slug: 'cf-327a',
    title: 'Flipping Game',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Iahub has `n` cards with numbers 0 or 1. Iahub must flip (change 0 to 1 and 1 to 0) exactly one contiguous subarray. Find the maximum number of 1s in the array after the flip.',
    constraints: ['1 <= n <= 100'],
    solutions: {
      python: `n = int(input())
a = list(map(int, input().split()))
ones = sum(a)
# Let 0 be +1 value, and 1 be -1 value
max_gain = cur_gain = -1
for x in a:
    val = 1 if x == 0 else -1
    cur_gain = max(val, cur_gain + val)
    max_gain = max(max_gain, cur_gain)
print(ones + max_gain)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    int ones = 0, maxGain = -1, curGain = -1;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        if (x == 1) ones++;
        int val = (x == 0) ? 1 : -1;
        curGain = max(val, curGain + val);
        maxGain = max(maxGain, curGain);
    }
    cout << ones + maxGain;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int ones = 0, maxGain = -1, curGain = -1;
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            if (x == 1) ones++;
            int val = (x == 0) ? 1 : -1;
            curGain = Math.max(val, curGain + val);
            maxGain = Math.max(maxGain, curGain);
        }
        System.out.println(ones + maxGain);
    }
}`,
      explanation: 'Use Kadane\'s algorithm. Flipping a 0 gives a gain of +1; flipping a 1 gives a loss of -1. Find the maximum subarray sum using these values to determine the maximum gain. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-489C',
    slug: 'cf-489c',
    title: 'Given Length and Sum of Digits...',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Greedy',
    description: 'Find the minimum and maximum non-negative integers of length `m` whose sum of digits is equal to `s`. No leading zeros.',
    constraints: ['1 <= m <= 100', '0 <= s <= 900'],
    solutions: {
      python: `m, s = map(int, input().split())
if s == 0:
    if m == 1: print("0 0")
    else: print("-1 -1")
    exit()
if s > 9 * m:
    print("-1 -1")
    exit()
    
# Max number: greedy fill 9s from left
max_digits = []
temp = s
for _ in range(m):
    take = min(9, temp)
    max_digits.append(str(take))
    temp -= take
max_num = "".join(max_digits)

# Min number: greedy fill 9s from right, with first digit at least 1
min_digits = [0] * m
temp = s - 1
for i in range(m - 1, 0, -1):
    take = min(9, temp)
    min_digits[i] = take
    temp -= take
min_digits[0] = temp + 1
min_num = "".join(map(str, min_digits))

print(f"{min_num} {max_num}")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int m, s;
    if (cin >> m >> s) {
        if (s == 0) {
            if (m == 1) cout << "0 0";
            else cout << "-1 -1";
            return 0;
        }
        if (s > 9 * m) { cout << "-1 -1"; return 0; }
        
        string max_val = "";
        int temp = s;
        for (int i = 0; i < m; ++i) {
            int take = min(9, temp);
            max_val += to_string(take);
            temp -= take;
        }
        
        string min_val = "";
        temp = s - 1;
        for (int i = 0; i < m; ++i) min_val += "0";
        for (int i = m - 1; i > 0; --i) {
            int take = min(9, temp);
            min_val[i] = '0' + take;
            temp -= take;
        }
        min_val[0] = '1' + temp;
        cout << min_val << " " << max_val;
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt(), s = sc.nextInt();
        if (s == 0) {
            if (m == 1) System.out.println("0 0");
            else System.out.println("-1 -1");
            return;
        }
        if (s > 9 * m) {
            System.out.println("-1 -1");
            return;
        }
        char[] maxVal = new char[m];
        int temp = s;
        for (int i = 0; i < m; i++) {
            int take = Math.min(9, temp);
            maxVal[i] = (char) ('0' + take);
            temp -= take;
        }
        char[] minVal = new char[m];
        Arrays.fill(minVal, '0');
        temp = s - 1;
        for (int i = m - 1; i > 0; i--) {
            int take = Math.min(9, temp);
            minVal[i] = (char) ('0' + take);
            temp -= take;
        }
        minVal[0] = (char) ('1' + temp);
        System.out.println(new String(minVal) + " " + new String(maxVal));
    }
}`,
      explanation: 'To construct the maximum number, greedily place the largest possible digit (9) as far left as possible. To construct the minimum number, reserve 1 for the first digit (no leading zero) and greedily place 9s as far right as possible. Time complexity: O(m), Space complexity: O(m).'
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
