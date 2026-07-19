const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const BATCH = [
  {
    id: 'lc-693',
    slug: 'binary-number-with-alternating-bits',
    title: 'Binary Number with Alternating Bits',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given a positive integer `n`, check whether it has alternating bits: namely, if two adjacent bits will always have different values.',
    constraints: ['1 <= n <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def hasAlternatingBits(self, n: int) -> bool:
        temp = n ^ (n >> 1)
        return (temp & (temp + 1)) == 0`,
      cpp: `class Solution {
public:
    bool hasAlternatingBits(int n) {
        long long temp = n ^ (n >> 1);
        return (temp & (temp + 1)) == 0;
    }
};`,
      java: `class Solution {
    public boolean hasAlternatingBits(int n) {
        long temp = n ^ (n >> 1);
        return (temp & (temp + 1)) == 0;
    }
}`,
      explanation: 'Shift n right by 1 and XOR with n. If n has alternating bits, the XOR result will be of the form 111...11. Adding 1 to this value and performing bitwise AND should yield 0. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-697',
    slug: 'degree-of-an-array',
    title: 'Degree of an Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a non-empty array of non-negative integers `nums`, the **degree** of this array is defined as the maximum frequency of any one of its elements. Find the minimum length of a contiguous subarray of `nums`, that has the same degree as `nums`.',
    constraints: ['nums.length will be between 1 and 50,000.', 'nums[i] will be an integer between 0 and 49,999.'],
    solutions: {
      python: `class Solution:
    def findShortestSubArray(self, nums: List[int]) -> int:
        first, last, count = {}, {}, {}
        for i, x in enumerate(nums):
            if x not in first: first[x] = i
            last[x] = i
            count[x] = count.get(x, 0) + 1
        degree = max(count.values())
        ans = len(nums)
        for x in count:
            if count[x] == degree:
                ans = min(ans, last[x] - first[x] + 1)
        return ans`,
      cpp: `class Solution {
public:
    int findShortestSubArray(vector<int>& nums) {
        unordered_map<int, int> first, last, count;
        int degree = 0;
        for (int i = 0; i < nums.size(); ++i) {
            int x = nums[i];
            if (!first.count(x)) first[x] = i;
            last[x] = i;
            count[x]++;
            degree = max(degree, count[x]);
        }
        int ans = nums.size();
        for (const auto& [x, cnt] : count) {
            if (cnt == degree) {
                ans = min(ans, last[x] - first[x] + 1);
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int findShortestSubArray(int[] nums) {
        Map<Integer, Integer> first = new HashMap<>(), last = new HashMap<>(), count = new HashMap<>();
        int degree = 0;
        for (int i = 0; i < nums.length; i++) {
            int x = nums[i];
            if (!first.containsKey(x)) first.put(x, i);
            last.put(x, i);
            count.put(x, count.getOrDefault(x, 0) + 1);
            degree = Math.max(degree, count.get(x));
        }
        int ans = nums.length;
        for (int x : count.keySet()) {
            if (count.get(x) == degree) {
                ans = Math.min(ans, last.get(x) - first.get(x) + 1);
            }
        }
        return ans;
    }
}`,
      explanation: 'Find the maximum frequency (degree) of the array. Track the first and last occurrences of each element. The minimum subarray length containing the degree elements is last[x] - first[x] + 1 for any x whose frequency equals the degree. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-703',
    slug: 'kth-largest-element-in-a-stream',
    title: 'Kth Largest Element in a Stream',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Heap (Priority Queue)',
    description: 'Design a class to find the `k`-th largest element in a stream. Note that it is the `k`-th largest element in the sorted order, not the `k`-th distinct element.',
    constraints: ['1 <= k <= 10^4', '0 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', '-10^4 <= val <= 10^4', 'At most 10^4 calls will be made to add.'],
    solutions: {
      python: `import heapq
class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)
            
    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
      cpp: `class KthLargest {
    int k;
    priority_queue<int, vector<int>, greater<int>> pq;
public:
    KthLargest(int k, vector<int>& nums) {
        this->k = k;
        for (int x : nums) {
            pq.push(x);
            if (pq.size() > k) pq.pop();
        }
    }
    int add(int val) {
        pq.push(val);
        if (pq.size() > k) pq.pop();
        return pq.top();
    }
};`,
      java: `class KthLargest {
    private int k;
    private PriorityQueue<Integer> pq;
    public KthLargest(int k, int[] nums) {
        this.k = k;
        this.pq = new PriorityQueue<>(k);
        for (int x : nums) {
            pq.add(x);
            if (pq.size() > k) pq.poll();
        }
    }
    public int add(int val) {
        pq.add(val);
        if (pq.size() > k) pq.poll();
        return pq.peek();
    }
}`,
      explanation: 'Use a min-heap of size k. The top of the min-heap represents the kth largest element. When adding new values, push into the heap and pop if size exceeds k. Time complexity: O(n log k) setup, O(log k) add. Space complexity: O(k).'
    }
  },
  {
    id: 'lc-705',
    slug: 'design-hashset',
    title: 'Design HashSet',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Design a HashSet without using any built-in hash table libraries.',
    constraints: ['0 <= key <= 10^6', 'At most 10^4 calls will be made to add, remove, and contains.'],
    solutions: {
      python: `class MyHashSet:
    def __init__(self):
        self.buckets = 1000
        self.table = [[] for _ in range(self.buckets)]
        
    def _hash(self, key):
        return key % self.buckets
        
    def add(self, key: int) -> None:
        idx = self._hash(key)
        if key not in self.table[idx]:
            self.table[idx].append(key)
            
    def remove(self, key: int) -> None:
        idx = self._hash(key)
        if key in self.table[idx]:
            self.table[idx].remove(key)
            
    def contains(self, key: int) -> bool:
        idx = self._hash(key)
        return key in self.table[idx]`,
      cpp: `class MyHashSet {
    int buckets = 1000;
    vector<list<int>> table;
    int hash(int key) { return key % buckets; }
public:
    MyHashSet() { table.resize(buckets); }
    void add(int key) {
        int idx = hash(key);
        for (int x : table[idx]) if (x == key) return;
        table[idx].push_back(key);
    }
    void remove(int key) {
        int idx = hash(key);
        table[idx].remove(key);
    }
    bool contains(int key) {
        int idx = hash(key);
        for (int x : table[idx]) if (x == key) return true;
        return false;
    }
};`,
      java: `class MyHashSet {
    private int buckets = 1000;
    private List<Integer>[] table;
    private int hash(int key) { return key % buckets; }
    public MyHashSet() {
        table = new LinkedList[buckets];
        for (int i = 0; i < buckets; i++) table[i] = new LinkedList<>();
    }
    public void add(int key) {
        int idx = hash(key);
        if (!table[idx].contains(key)) table[idx].add(key);
    }
    public void remove(int key) {
        int idx = hash(key);
        table[idx].remove((Integer) key);
    }
    public boolean contains(int key) {
        int idx = hash(key);
        return table[idx].contains(key);
    }
}`,
      explanation: 'Use bucket hashing with separate chaining. Initialize an array of lists of size B. Place keys in bucket index key % B, handling collisions by traversing the corresponding list. Time complexity: O(1) average, Space complexity: O(k) unique keys.'
    }
  },
  {
    id: 'lc-706',
    slug: 'design-hashmap',
    title: 'Design HashMap',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Design a HashMap without using any built-in hash table libraries.',
    constraints: ['0 <= key, value <= 10^6', 'At most 10^4 calls will be made to put, get, and remove.'],
    solutions: {
      python: `class MyHashMap:
    def __init__(self):
        self.buckets = 1000
        self.table = [[] for _ in range(self.buckets)]
        
    def _hash(self, key):
        return key % self.buckets
        
    def put(self, key: int, value: int) -> None:
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.table[idx]):
            if k == key:
                self.table[idx][i] = (key, value)
                return
        self.table[idx].append((key, value))
        
    def get(self, key: int) -> int:
        idx = self._hash(key)
        for k, v in self.table[idx]:
            if k == key: return v
        return -1
        
    def remove(self, key: int) -> None:
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.table[idx]):
            if k == key:
                self.table[idx].pop(i)
                return`,
      cpp: `class MyHashMap {
    struct Node { int key, val; };
    int buckets = 1000;
    vector<list<Node>> table;
    int hash(int key) { return key % buckets; }
public:
    MyHashMap() { table.resize(buckets); }
    void put(int key, int value) {
        int idx = hash(key);
        for (auto& node : table[idx]) {
            if (node.key == key) { node.val = value; return; }
        }
        table[idx].push_back({key, value});
    }
    int get(int key) {
        int idx = hash(key);
        for (const auto& node : table[idx]) {
            if (node.key == key) return node.val;
        }
        return -1;
    }
    void remove(int key) {
        int idx = hash(key);
        for (auto it = table[idx].begin(); it != table[idx].end(); ++it) {
            if (it->key == key) { table[idx].erase(it); return; }
        }
    }
};`,
      java: `class MyHashMap {
    private static class Node {
        int key, val;
        Node(int k, int v) { key = k; val = v; }
    }
    private int buckets = 1000;
    private List<Node>[] table;
    private int hash(int key) { return key % buckets; }
    public MyHashMap() {
        table = new LinkedList[buckets];
        for (int i = 0; i < buckets; i++) table[i] = new LinkedList<>();
    }
    public void put(int key, int value) {
        int idx = hash(key);
        for (Node node : table[idx]) {
            if (node.key == key) { node.val = value; return; }
        }
        table[idx].add(new Node(key, value));
    }
    public int get(int key) {
        int idx = hash(key);
        for (Node node : table[idx]) {
            if (node.key == key) return node.val;
        }
        return -1;
    }
    public void remove(int key) {
        int idx = hash(key);
        table[idx].removeIf(node -> node.key == key);
    }
}`,
      explanation: 'Use bucket hashing with separate chaining of key-value pairs (using a custom node type). Insert or update values on put(), search values on get(), and filter nodes on remove(). Time complexity: O(1) average, Space complexity: O(k) unique entries.'
    }
  },
  {
    id: 'lc-709',
    slug: 'to-lower-case',
    title: 'To Lower Case',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a string `s`, return the string after replacing every uppercase letter with the same lowercase letter.',
    constraints: ['1 <= s.length <= 100', 's consists of printable ASCII characters.'],
    solutions: {
      python: `class Solution:
    def toLowerCase(self, s: str) -> str:
        return s.lower()`,
      cpp: `class Solution {
public:
    string toLowerCase(string s) {
        for (char& c : s) c = tolower(c);
        return s;
    }
};`,
      java: `class Solution {
    public String toLowerCase(String s) {
        return s.toLowerCase();
    }
}`,
      explanation: 'Iterate through characters of string and convert uppercase English letters (\'A\' - \'Z\') to lowercase by shifting their ASCII values by 32. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-717',
    slug: '1-bit-and-2-bit-characters',
    title: '1-Bit and 2-Bit Characters',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'We have two special characters:\n- The first character can be represented by one bit `0`.\n- The second character can be represented by two bits (`10` or `11`).\n\nGiven a binary array `bits` ending with `0`, return `true` if the last character must be a one-bit character.',
    constraints: ['1 <= bits.length <= 1000', 'bits[i] is 0 or 1.'],
    solutions: {
      python: `class Solution:
    def isOneBitCharacter(self, bits: List[int]) -> bool:
        i, n = 0, len(bits)
        while i < n - 1:
            i += 2 if bits[i] == 1 else 1
        return i == n - 1`,
      cpp: `class Solution {
public:
    bool isOneBitCharacter(vector<int>& bits) {
        int i = 0, n = bits.size();
        while (i < n - 1) {
            i += (bits[i] == 1) ? 2 : 1;
        }
        return i == n - 1;
    }
};`,
      java: `class Solution {
    public boolean isOneBitCharacter(int[] bits) {
        int i = 0, n = bits.length;
        while (i < n - 1) {
            i += (bits[i] == 1) ? 2 : 1;
        }
        return i == n - 1;
    }
}`,
      explanation: 'Use a greedy pointer i to parse the bits. If bits[i] is 1, it must be the start of a 2-bit character, so increment i by 2. If bits[i] is 0, it must be a 1-bit character, so increment i by 1. Check if the pointer lands exactly on index n - 1. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-728',
    slug: 'self-dividing-numbers',
    title: 'Self Dividing Numbers',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'A self-dividing number is a number that is divisible by every digit it contains. Given bounds `left` and `right`, return a list of all self-dividing numbers in the range `[left, right]`.',
    constraints: ['1 <= left <= right <= 10^4'],
    solutions: {
      python: `class Solution:
    def selfDividingNumbers(self, left: int, right: int) -> List[int]:
        res = []
        for val in range(left, right + 1):
            temp = val
            ok = True
            while temp > 0:
                d = temp % 10
                if d == 0 or val % d != 0:
                    ok = False
                    break
                temp //= 10
            if ok: res.append(val)
        return res`,
      cpp: `class Solution {
public:
    vector<int> selfDividingNumbers(int left, int right) {
        vector<int> res;
        for (int val = left; val <= right; ++val) {
            int temp = val;
            bool ok = true;
            while (temp > 0) {
                int d = temp % 10;
                if (d == 0 || val % d != 0) { ok = false; break; }
                temp /= 10;
            }
            if (ok) res.push_back(val);
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<Integer> selfDividingNumbers(int left, int right) {
        List<Integer> res = new ArrayList<>();
        for (int val = left; val <= right; val++) {
            int temp = val;
            boolean ok = true;
            while (temp > 0) {
                int d = temp % 10;
                if (d == 0 || val % d != 0) { ok = false; break; }
                temp /= 10;
            }
            if (ok) res.add(val);
        }
        return res;
    }
}`,
      explanation: 'Iterate through all numbers in the range. For each number, extract digits one by one using modulo division. If a digit is 0 or does not divide the original number, skip it. Time complexity: O(N * log_10 R) where N is range size, Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'lc-744',
    slug: 'find-smallest-letter-greater-than-target',
    title: 'Find Smallest Letter Greater Than Target',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'algorithms',
    topic: 'Binary Search',
    description: 'Given a character array `letters` sorted in non-decreasing order, and a character `target`, return the smallest character in `letters` that is lexicographically greater than `target`. If no such character exists, return the first character in `letters`.',
    constraints: ['2 <= letters.length <= 10^4', 'letters[i] is a lowercase English letter.', 'letters is sorted in non-decreasing order.', 'target is a lowercase English letter.'],
    solutions: {
      python: `class Solution:
    def nextGreatestLetter(self, letters: List[str], target: str) -> str:
        low, high = 0, len(letters) - 1
        ans = letters[0]
        while low <= high:
            mid = (low + high) // 2
            if letters[mid] > target:
                ans = letters[mid]
                high = mid - 1
            else:
                low = mid + 1
        return ans`,
      cpp: `class Solution {
public:
    char nextGreatestLetter(vector<char>& letters, char target) {
        int low = 0, high = letters.size() - 1;
        char ans = letters[0];
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (letters[mid] > target) { ans = letters[mid]; high = mid - 1; }
            else low = mid + 1;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public char nextGreatestLetter(char[] letters, char target) {
        int low = 0, high = letters.length - 1;
        char ans = letters[0];
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (letters[mid] > target) { ans = letters[mid]; high = mid - 1; }
            else low = mid + 1;
        }
        return ans;
    }
}`,
      explanation: 'Use binary search. If letters[mid] > target, record letters[mid] as candidate answer and search left (high = mid - 1). Otherwise, search right (low = mid + 1). Time complexity: O(log n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-747',
    slug: 'largest-number-at-least-twice-of-others',
    title: 'Largest Number At Least Twice of Others',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Find whether the largest element in the array is at least twice as much as every other number in the array. If it is, return the index of the largest element, otherwise return `-1`.',
    constraints: ['2 <= nums.length <= 50', '0 <= nums[i] <= 100', 'The largest element in nums is unique.'],
    solutions: {
      python: `class Solution:
    def dominantIndex(self, nums: List[int]) -> int:
        max_idx = nums.index(max(nums))
        for i, x in enumerate(nums):
            if i != max_idx and nums[max_idx] < 2 * x:
                return -1
        return max_idx`,
      cpp: `class Solution {
public:
    int dominantIndex(vector<int>& nums) {
        int maxIdx = 0;
        for (int i = 1; i < nums.size(); ++i) {
            if (nums[i] > nums[maxIdx]) maxIdx = i;
        }
        for (int i = 0; i < nums.size(); ++i) {
            if (i != maxIdx && nums[maxIdx] < 2 * nums[i]) return -1;
        }
        return maxIdx;
    }
};`,
      java: `class Solution {
    public int dominantIndex(int[] nums) {
        int maxIdx = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[maxIdx]) maxIdx = i;
        }
        for (int i = 0; i < nums.length; i++) {
            if (i != maxIdx && nums[maxIdx] < 2 * nums[i]) return -1;
        }
        return maxIdx;
    }
}`,
      explanation: 'Find the index of the largest element first. In a second pass, check if this maximum value is at least twice of any other element at a different index. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-748',
    slug: 'shortest-completing-word',
    title: 'Shortest Completing Word',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a string `licensePlate` and an array of strings `words`, find the shortest completing word in `words`.',
    constraints: ['1 <= licensePlate.length <= 7', 'licensePlate consists of digits, spaces, or letters.', '1 <= words.length <= 1000', '1 <= words[i].length <= 15', 'words[i] consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def shortestCompletingWord(self, licensePlate: str, words: List[str]) -> str:
        # Extract letters and lowercase them
        target = {}
        for c in licensePlate.lower():
            if c.isalpha():
                target[c] = target.get(c, 0) + 1
        ans = None
        for w in words:
            w_counts = {}
            for c in w: w_counts[c] = w_counts.get(c, 0) + 1
            ok = True
            for c in target:
                if w_counts.get(c, 0) < target[c]:
                    ok = False
                    break
            if ok:
                if ans is None or len(w) < len(ans):
                    ans = w
        return ans`,
      cpp: `class Solution {
public:
    string shortestCompletingWord(string licensePlate, vector<string>& words) {
        vector<int> target(26, 0);
        for (char c : licensePlate) {
            if (isalpha(c)) target[tolower(c) - 'a']++;
        }
        string ans = "";
        for (const string& w : words) {
            vector<int> counts(26, 0);
            for (char c : w) counts[c - 'a']++;
            bool ok = true;
            for (int i = 0; i < 26; ++i) {
                if (counts[i] < target[i]) { ok = false; break; }
            }
            if (ok) {
                if (ans.empty() || w.size() < ans.size()) ans = w;
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public String shortestCompletingWord(String licensePlate, String[] words) {
        int[] target = new int[26];
        for (char c : licensePlate.toCharArray()) {
            if (Character.isLetter(c)) target[Character.toLowerCase(c) - 'a']++;
        }
        String ans = "";
        for (String w : words) {
            int[] counts = new int[26];
            for (char c : w.toCharArray()) counts[c - 'a']++;
            boolean ok = true;
            for (int i = 0; i < 26; i++) {
                if (counts[i] < target[i]) { ok = false; break; }
            }
            if (ok) {
                if (ans.equals("") || w.length() < ans.length()) ans = w;
            }
        }
        return ans;
    }
}`,
      explanation: 'Count the frequency of letters in licensePlate (ignoring numbers and spaces). For each word, check if it contains all target letters in at least the required frequency. Return the shortest matching word (if there are ties, the earliest in the list). Time complexity: O(N * L) where N is words count and L is average length, Space complexity: O(1).'
    }
  },
  {
    id: 'lc-762',
    slug: 'prime-number-of-set-bits-in-binary-representation',
    title: 'Prime Number of Set Bits in Binary Representation',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given two integers `left` and `right`, return the count of numbers in the inclusive range `[left, right]` having a prime number of set bits in their binary representation.',
    constraints: ['1 <= left <= right <= 10^6', '0 <= right - left <= 10^4'],
    solutions: {
      python: `class Solution:
    def countPrimeSetBits(self, left: int, right: int) -> int:
        primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31}
        return sum(bin(x).count('1') in primes for x in range(left, right + 1))`,
      cpp: `class Solution {
public:
    int countPrimeSetBits(int left, int right) {
        unordered_set<int> primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31};
        int ans = 0;
        for (int i = left; i <= right; ++i) {
            if (primes.count(__builtin_popcount(i))) ans++;
        }
        return ans;
    }
};`,
      java: `class Solution {
    public int countPrimeSetBits(int left, int right) {
        Set<Integer> primes = new HashSet<>(Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31));
        int ans = 0;
        for (int i = left; i <= right; i++) {
            if (primes.contains(Integer.bitCount(i))) ans++;
        }
        return ans;
    }
}`,
      explanation: 'Since the range bounds are <= 10^6, the maximum number of set bits is less than 32. Primes under 32 are {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31}. Count set bits for each number and check membership in this set. Time complexity: O(R - L), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-766',
    slug: 'toeplitz-matrix',
    title: 'Toeplitz Matrix',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an `m x n` matrix, return `true` if the matrix is Toeplitz. A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.',
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 20', '-99 <= matrix[i][j] <= 99'],
    solutions: {
      python: `class Solution:
    def isToeplitzMatrix(self, matrix: List[List[int]]) -> bool:
        for r in range(1, len(matrix)):
            for c in range(1, len(matrix[0])):
                if matrix[r][c] != matrix[r - 1][c - 1]:
                    return False
        return True`,
      cpp: `class Solution {
public:
    bool isToeplitzMatrix(vector<vector<int>>& matrix) {
        for (int r = 1; r < matrix.size(); ++r) {
            for (int c = 1; c < matrix[0].size(); ++c) {
                if (matrix[r][c] != matrix[r-1][c-1]) return false;
            }
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isToeplitzMatrix(int[][] matrix) {
        for (int r = 1; r < matrix.length; r++) {
            for (int c = 1; c < matrix[0].length; c++) {
                if (matrix[r][c] != matrix[r - 1][c - 1]) return false;
            }
        }
        return true;
    }
}`,
      explanation: 'Every cell matrix[r][c] not in the first row or first column must equal its diagonal predecessor matrix[r-1][c-1]. Loop through cells starting at row 1 and column 1. Time complexity: O(m * n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-771',
    slug: 'jewels-and-stones',
    title: 'Jewels and Stones',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You\'re given strings `jewels` representing the types of stones that are jewels, and `stones` representing the stones you have. Each character in `stones` is a type of stone you have. Return the number of the stones you have that are also jewels.',
    constraints: ['1 <= jewels.length, stones.length <= 50', 'jewels and stones consist of English letters.', 'All characters of jewels are unique.'],
    solutions: {
      python: `class Solution:
    def numJewelsInStones(self, jewels: str, stones: str) -> int:
        j_set = set(jewels)
        return sum(s in j_set for s in stones)`,
      cpp: `class Solution {
public:
    int numJewelsInStones(string jewels, string stones) {
        unordered_set<char> jSet(jewels.begin(), jewels.end());
        int ans = 0;
        for (char s : stones) if (jSet.count(s)) ans++;
        return ans;
    }
};`,
      java: `class Solution {
    public int numJewelsInStones(String jewels, String stones) {
        Set<Character> jSet = new HashSet<>();
        for (char c : jewels.toCharArray()) jSet.add(c);
        int ans = 0;
        for (char s : stones.toCharArray()) if (jSet.contains(s)) ans++;
        return ans;
    }
}`,
      explanation: 'Store jewels in a hash set for O(1) lookups. Iterate through stones and count how many are present in the set. Time complexity: O(n + m), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-796',
    slug: 'rotate-string',
    title: 'Rotate String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two strings `s` and `goal`, return `true` if and only if `s` can become `goal` after some number of shifts on `s`.',
    constraints: ['1 <= s.length, goal.length <= 100', 's and goal consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def rotateString(self, s: str, goal: str) -> bool:
        return len(s) == len(goal) and goal in (s + s)`,
      cpp: `class Solution {
public:
    bool rotateString(string s, string goal) {
        return s.size() == goal.size() && (s + s).find(goal) != string::npos;
    }
};`,
      java: `class Solution {
    public boolean rotateString(String s, String goal) {
        return s.length() == goal.length() && (s + s).contains(goal);
    }
}`,
      explanation: 'All rotations of string s are contiguous substrings of the concatenated string s + s. Check if goal is a substring of s + s and that they have equal lengths. Time complexity: O(n) (using KMP or optimized search), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-804',
    slug: 'unique-morse-code-words',
    title: 'Unique Morse Code Words',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given an array of strings `words` where each word can be written as a concatenation of the Morse code of each letter, return the number of different transformations among all words we have.',
    constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 12', 'words[i] consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def uniqueMorseRepresentations(self, words: List[str]) -> int:
        morse = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
        seen = set()
        for w in words:
            seen.add("".join(morse[ord(c) - 97] for c in w))
        return len(seen)`,
      cpp: `class Solution {
public:
    int uniqueMorseRepresentations(vector<string>& words) {
        vector<string> morse = {".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."};
        unordered_set<string> seen;
        for (const string& w : words) {
            string code = "";
            for (char c : w) code += morse[c - 'a'];
            seen.insert(code);
        }
        return seen.size();
    }
};`,
      java: `class Solution {
    public int uniqueMorseRepresentations(String[] words) {
        String[] morse = {".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."};
        Set<String> seen = new HashSet<>();
        for (String w : words) {
            StringBuilder sb = new StringBuilder();
            for (char c : w.toCharArray()) sb.append(morse[c - 'a']);
            seen.add(sb.toString());
        }
        return seen.size();
    }
}`,
      explanation: 'Convert each word into its Morse code representation by mapping characters to Morse strings. Insert the resulting strings into a hash set to collect unique transformations. Time complexity: O(N * L) where L is max word length, Space complexity: O(N * L).'
    }
  },
  {
    id: 'lc-806',
    slug: 'number-of-lines-to-write-string',
    title: 'Number of Lines To Write String',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'We are writing the string `s` across multiple lines. Each line has maximum width 100 pixels. Given widths of characters, find the number of lines and the width of the last line.',
    constraints: ['widths.length == 26', '1 <= s.length <= 1000', 's consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def numberOfLines(self, widths: List[int], s: str) -> List[int]:
        lines, curr_w = 1, 0
        for c in s:
            w = widths[ord(c) - 97]
            if curr_w + w > 100:
                lines += 1
                curr_w = w
            else:
                curr_w += w
        return [lines, curr_w]`,
      cpp: `class Solution {
public:
    vector<int> numberOfLines(vector<int>& widths, string s) {
        int lines = 1, currW = 0;
        for (char c : s) {
            int w = widths[c - 'a'];
            if (currW + w > 100) { lines++; currW = w; }
            else currW += w;
        }
        return {lines, currW};
    }
};`,
      java: `class Solution {
    public int[] numberOfLines(int[] widths, String s) {
        int lines = 1, currW = 0;
        for (char c : s.toCharArray()) {
            int w = widths[c - 'a'];
            if (currW + w > 100) { lines++; currW = w; }
            else currW += w;
        }
        return new int[]{lines, currW};
    }
}`,
      explanation: 'Simulate writing characters sequentially on lines. If adding the next character width exceeds 100 pixels, start a new line (increment lines and set current width to this character width). Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-812',
    slug: 'largest-triangle-area',
    title: 'Largest Triangle Area',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Given an array of points on the **X-Y** plane `points`, return the area of the largest triangle that can be formed by any three points.',
    constraints: ['3 <= points.length <= 50', '-50 <= points[i][j] <= 50', 'All points are unique.'],
    solutions: {
      python: `class Solution:
    def largestTriangleArea(self, points: List[List[int]]) -> float:
        # Area = 0.5 * abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))
        ans = 0
        n = len(points)
        for i in range(n):
            for j in range(i + 1, n):
                for k in range(j + 1, n):
                    x1, y1 = points[i]
                    x2, y2 = points[j]
                    x3, y3 = points[k]
                    area = 0.5 * abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2))
                    ans = max(ans, area)
        return ans`,
      cpp: `class Solution {
public:
    double largestTriangleArea(vector<vector<int>>& points) {
        double ans = 0;
        int n = points.size();
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                for (int k = j + 1; k < n; ++k) {
                    double area = 0.5 * abs(points[i][0] * (points[j][1] - points[k][1]) +
                                            points[j][0] * (points[k][1] - points[i][1]) +
                                            points[k][0] * (points[i][1] - points[j][1]));
                    ans = max(ans, area);
                }
            }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public double largestTriangleArea(int[][] points) {
        double ans = 0;
        int n = points.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                for (int k = j + 1; k < n; k++) {
                    double area = 0.5 * Math.abs(points[i][0] * (points[j][1] - points[k][1]) +
                                                points[j][0] * (points[k][1] - points[i][1]) +
                                                points[k][0] * (points[i][1] - points[j][1]));
                    ans = Math.max(ans, area);
                }
            }
        }
        return ans;
    }
}`,
      explanation: 'Iterate over all triplets of points. Calculate the triangle area using the shoelace formula: Area = 0.5 * |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|. Track the maximum area found. Time complexity: O(n^3), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-819',
    slug: 'most-common-word',
    title: 'Most Common Word',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a string `paragraph` and a string array of banned words `banned`, return the most frequent word that is not banned.',
    constraints: ['1 <= paragraph.length <= 1000', 'paragraph consists of English letters, space, or one of the symbols: "!?\',;.".', '0 <= banned.length <= 100', '1 <= banned[i].length <= 10', 'banned[i] consists of lowercase English letters.'],
    solutions: {
      python: `import re
class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
        banned_set = set(banned)
        # Replace punctuation with spaces, lowercase all, and split
        words = re.findall(r'\\w+', paragraph.lower())
        counts = {}
        for w in words:
            if w not in banned_set:
                counts[w] = counts.get(w, 0) + 1
        return max(counts, key=counts.get)`,
      cpp: `class Solution {
public:
    string mostCommonWord(string paragraph, vector<string>& banned) {
        unordered_set<string> bannedSet(banned.begin(), banned.end());
        for (char& c : paragraph) {
            if (ispunct(c)) c = ' ';
            else c = tolower(c);
        }
        stringstream ss(paragraph);
        string word;
        unordered_map<string, int> counts;
        while (ss >> word) {
            if (!bannedSet.count(word)) counts[word]++;
        }
        string ans = "";
        int maxCount = 0;
        for (const auto& [w, cnt] : counts) {
            if (cnt > maxCount) { maxCount = cnt; ans = w; }
        }
        return ans;
    }
};`,
      java: `class Solution {
    public String mostCommonWord(String paragraph, String[] banned) {
        Set<String> bannedSet = new HashSet<>(Arrays.asList(banned));
        String normalized = paragraph.replaceAll("[!?',;.]", " ").toLowerCase();
        String[] words = normalized.split("\\\\s+");
        Map<String, Integer> counts = new HashMap<>();
        for (String w : words) {
            if (!w.isEmpty() && !bannedSet.contains(w)) {
                counts.put(w, counts.getOrDefault(w, 0) + 1);
            }
        }
        String ans = "";
        int maxCount = 0;
        for (String w : counts.keySet()) {
            if (counts.get(w) > maxCount) { maxCount = counts.get(w); ans = w; }
        }
        return ans;
    }
}`,
      explanation: 'Normalize the paragraph: replace punctuation symbols with spaces, convert all letters to lowercase, and split into words. Build a hash map of counts for non-banned words and return the key with the maximum value. Time complexity: O(N + M) where N is paragraph length and M is total length of banned words, Space complexity: O(N + M).'
    }
  },
  {
    id: 'lc-821',
    slug: 'shortest-distance-to-a-character',
    title: 'Shortest Distance to a Character',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given a string `s` and a character `c` that occurs in `s`, return an array of integers representing the shortest distance from each character to `c` in `s`.',
    constraints: ['1 <= s.length <= 10^4', 's consists of lowercase English letters.', 'c is a lowercase English letter.', 'c is guaranteed to occur at least once in s.'],
    solutions: {
      python: `class Solution:
    def shortestToChar(self, s: str, c: str) -> List[int]:
        n = len(s)
        res = [n] * n
        # Left-to-right pass
        pos = -n
        for i in range(n):
            if s[i] == c: pos = i
            res[i] = i - pos
        # Right-to-left pass
        pos = 2 * n
        for i in range(n - 1, -1, -1):
            if s[i] == c: pos = i
            res[i] = min(res[i], pos - i)
        return res`,
      cpp: `class Solution {
public:
    vector<int> shortestToChar(string s, char c) {
        int n = s.size();
        vector<int> res(n, n);
        int pos = -n;
        for (int i = 0; i < n; ++i) {
            if (s[i] == c) pos = i;
            res[i] = i - pos;
        }
        pos = 2 * n;
        for (int i = n - 1; i >= 0; --i) {
            if (s[i] == c) pos = i;
            res[i] = min(res[i], pos - i);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] shortestToChar(String s, char c) {
        int n = s.length();
        int[] res = new int[n];
        int pos = -n;
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == c) pos = i;
            res[i] = i - pos;
        }
        pos = 2 * n;
        for (int i = n - 1; i >= 0; i--) {
            if (s.charAt(i) == c) pos = i;
            res[i] = Math.min(res[i], pos - i);
        }
        return res;
    }
}`,
      explanation: 'Perform two passes. First, scan left-to-right keeping track of the last seen position of c and calculate distances. Second, scan right-to-left keeping track of the last seen position of c and updating distances with the minimum. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-824',
    slug: 'goat-latin',
    title: 'Goat Latin',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'You are given a string `sentence` that consists of words separated by spaces. Each word contains only uppercase and lowercase alphanumeric characters. Convert it to Goat Latin.',
    constraints: ['1 <= sentence.length <= 150', 'sentence consists of English letters and spaces.', 'sentence has no leading or trailing spaces.'],
    solutions: {
      python: `class Solution:
    def toGoatLatin(self, sentence: str) -> str:
        vowels = set("aeiouAEIOU")
        res = []
        for idx, w in enumerate(sentence.split(" ")):
            if w[0] in vowels:
                new_w = w + "ma"
            else:
                new_w = w[1:] + w[0] + "ma"
            new_w += "a" * (idx + 1)
            res.append(new_w)
        return " ".join(res)`,
      cpp: `class Solution {
public:
    string toGoatLatin(string sentence) {
        unordered_set<char> vowels = {'a','e','i','o','u','A','E','I','O','U'};
        stringstream ss(sentence);
        string w;
        string res = "";
        int idx = 1;
        while (ss >> w) {
            if (!res.empty()) res += " ";
            if (vowels.count(w[0])) {
                res += w + "ma";
            } else {
                res += w.substr(1) + w[0] + "ma";
            }
            res += string(idx++, 'a');
        }
        return res;
    }
};`,
      java: `class Solution {
    public String toGoatLatin(String sentence) {
        Set<Character> vowels = new HashSet<>(Arrays.asList('a','e','i','o','u','A','E','I','O','U'));
        String[] words = sentence.split(" ");
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            if (i > 0) res.append(" ");
            String w = words[i];
            if (vowels.contains(w.charAt(0))) {
                res.append(w).append("ma");
            } else {
                res.append(w.substring(1)).append(w.charAt(0)).append("ma");
            }
            res.append("a".repeat(i + 1));
        }
        return res.toString();
    }
}`,
      explanation: 'Process each word based on its first character. If it is a vowel, append "ma". If it is a consonant, move the first letter to the end and append "ma". Finally, append index+1 occurrences of "a" to each word. Time complexity: O(n^2) due to repeating characters addition, Space complexity: O(n^2).'
    }
  },
  {
    id: 'lc-830',
    slug: 'positions-of-large-groups',
    title: 'Positions of Large Groups',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'In a string `s` of lowercase letters, these consecutive groups of identical characters are called groups. Return the intervals of every **large group** (a group with 3 or more characters).',
    constraints: ['1 <= s.length <= 1000', 's consists of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def largeGroupPositions(self, s: str) -> List[List[int]]:
        res = []
        n = len(s)
        i = 0
        for j in range(n):
            if j == n - 1 or s[j] != s[j + 1]:
                if j - i + 1 >= 3:
                    res.append([i, j])
                i = j + 1
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> largeGroupPositions(string s) {
        vector<vector<int>> res;
        int n = s.size(), i = 0;
        for (int j = 0; j < n; ++j) {
            if (j == n - 1 || s[j] != s[j + 1]) {
                if (j - i + 1 >= 3) res.push_back({i, j});
                i = j + 1;
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> largeGroupPositions(String s) {
        List<List<Integer>> res = new ArrayList<>();
        int n = s.length(), i = 0;
        for (int j = 0; j < n; j++) {
            if (j == n - 1 || s.charAt(j) != s.charAt(j + 1)) {
                if (j - i + 1 >= 3) {
                    res.add(Arrays.asList(i, j));
                }
                i = j + 1;
            }
        }
        return res;
    }
}`,
      explanation: 'Use two pointers. Pointer i tracks the start of a group. Loop pointer j through the string. When a transition occurs (s[j] != s[j+1] or end of string), check if the length j - i + 1 is >= 3. If so, record the range, and update i = j + 1. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-832',
    slug: 'flipping-an-image',
    title: 'Flipping an Image',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given an `n x n` binary matrix `image`, flip the image horizontally, then invert it, and return the resulting image.',
    constraints: ['n == image.length', 'n == image[i].length', '1 <= n <= 20', 'image[i][j] is 0 or 1.'],
    solutions: {
      python: `class Solution:
    def flipAndInvertImage(self, image: List[List[int]]) -> List[List[int]]:
        n = len(image)
        for r in range(n):
            left, right = 0, n - 1
            while left <= right:
                if left == right:
                    image[r][left] ^= 1
                else:
                    if image[r][left] == image[r][right]:
                        image[r][left] ^= 1
                        image[r][right] ^= 1
                left += 1
                right -= 1
        return image`,
      cpp: `class Solution {
public:
    vector<vector<int>> flipAndInvertImage(vector<vector<int>>& image) {
        int n = image.size();
        for (int r = 0; r < n; ++r) {
            int left = 0, right = n - 1;
            while (left <= right) {
                if (left == right) {
                    image[r][left] ^= 1;
                } else if (image[r][left] == image[r][right]) {
                    image[r][left] ^= 1;
                    image[r][right] ^= 1;
                }
                left++; right--;
            }
        }
        return image;
    }
};`,
      java: `class Solution {
    public int[][] flipAndInvertImage(int[][] image) {
        int n = image.length;
        for (int r = 0; r < n; r++) {
            int left = 0, right = n - 1;
            while (left <= right) {
                if (left == right) {
                    image[r][left] ^= 1;
                } else if (image[r][left] == image[r][right]) {
                    image[r][left] ^= 1;
                    image[r][right] ^= 1;
                }
                left++; right--;
            }
        }
        return image;
    }
}`,
      explanation: 'Use a two-pointer approach for each row. Swap elements at left and right pointers. Since we also need to invert, swap and invert can be combined: if image[row][left] == image[row][right], invert both. If they differ, they remain unchanged after swap and invert. Time complexity: O(n^2), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-836',
    slug: 'rectangle-overlap',
    title: 'Rectangle Overlap',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'An axis-aligned rectangle is represented as a list `[x1, y1, x2, y2]`. Given two rectangles `rec1` and `rec2`, return `true` if they overlap.',
    constraints: ['rec1.length == 4', 'rec2.length == 4', '-10^9 <= rec1[i], rec2[i] <= 10^9'],
    solutions: {
      python: `class Solution:
    def isRectangleOverlap(self, rec1: List[int], rec2: List[int]) -> bool:
        # Overlap occurs if the max of the start coordinates is strictly less than the min of the end coordinates
        return (max(rec1[0], rec2[0]) < min(rec1[2], rec2[2]) and
                max(rec1[1], rec2[1]) < min(rec1[3], rec2[3]))`,
      cpp: `class Solution {
public:
    bool isRectangleOverlap(vector<int>& rec1, vector<int>& rec2) {
        return max(rec1[0], rec2[0]) < min(rec1[2], rec2[2]) &&
               max(rec1[1], rec2[1]) < min(rec1[3], rec2[3]);
    }
};`,
      java: `class Solution {
    public boolean isRectangleOverlap(int[] rec1, int[] rec2) {
        return Math.max(rec1[0], rec2[0]) < Math.min(rec1[2], rec2[2]) &&
               Math.max(rec1[1], rec2[1]) < Math.min(rec1[3], rec2[3]);
    }
}`,
      explanation: 'Two rectangles overlap if their projection overlaps on both the x-axis and y-axis. The intersection is non-empty if max(x1_1, x1_2) < min(x2_1, x2_2) and similarly for y. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-844',
    slug: 'backspace-string-compare',
    title: 'Backspace String Compare',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Stack',
    description: 'Given two strings `s` and `t`, return `true` if they are equal when both are typed into empty text editors. `#` means a backspace character.',
    constraints: ['1 <= s.length, t.length <= 200', 's and t consist of lowercase letters and \'#\' characters.'],
    solutions: {
      python: `class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        def build(string):
            stack = []
            for c in string:
                if c != "#": stack.append(c)
                elif stack: stack.pop()
            return "".join(stack)
        return build(s) == build(t)`,
      cpp: `class Solution {
    string build(const string& str) {
        string res = "";
        for (char c : str) {
            if (c != '#') res.push_back(c);
            else if (!res.empty()) res.pop_back();
        }
        return res;
    }
public:
    bool backspaceCompare(string s, string t) {
        return build(s) == build(t);
    }
};`,
      java: `class Solution {
    private String build(String str) {
        StringBuilder sb = new StringBuilder();
        for (char c : str.toCharArray()) {
            if (c != '#') sb.append(c);
            else if (sb.length() > 0) sb.deleteCharAt(sb.length() - 1);
        }
        return sb.toString();
    }
    public boolean backspaceCompare(String s, String t) {
        return build(s).equals(build(t));
    }
}`,
      explanation: 'Use a stack (or string builder acting as stack) to process the string. Push characters onto the stack, and pop them whenever a backspace character \'#\' is encountered. Compare the final strings. Time complexity: O(n + m), Space complexity: O(n + m).'
    }
  },
  {
    id: 'lc-859',
    slug: 'buddy-strings',
    title: 'Buddy Strings',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given two strings `s` and `goal`, return `true` if you can swap two letters in `s` so the result is equal to `goal`.',
    constraints: ['1 <= s.length, goal.length <= 2 * 10^4', 's and goal consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def buddyStrings(self, s: str, goal: str) -> bool:
        if len(s) != len(goal): return False
        if s == goal:
            return len(set(s)) < len(s)
        diff = []
        for i in range(len(s)):
            if s[i] != goal[i]:
                diff.append((s[i], goal[i]))
        return len(diff) == 2 and diff[0] == diff[1][::-1]`,
      cpp: `class Solution {
public:
    bool buddyStrings(string s, string goal) {
        if (s.size() != goal.size()) return false;
        if (s == goal) {
            unordered_set<char> uniq(s.begin(), s.end());
            return uniq.size() < s.size();
        }
        vector<int> diff;
        for (int i = 0; i < s.size(); ++i) {
            if (s[i] != goal[i]) diff.push_back(i);
        }
        return diff.size() == 2 && s[diff[0]] == goal[diff[1]] && s[diff[1]] == goal[diff[0]];
    }
};`,
      java: `class Solution {
    public boolean buddyStrings(String s, String goal) {
        if (s.length() != goal.length()) return false;
        if (s.equals(goal)) {
            Set<Character> uniq = new HashSet<>();
            for (char c : s.toCharArray()) uniq.add(c);
            return uniq.size() < s.length();
        }
        List<Integer> diff = new ArrayList<>();
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) != goal.charAt(i)) diff.add(i);
        }
        return diff.size() == 2 && 
               s.charAt(diff.get(0)) == goal.charAt(diff.get(1)) && 
               s.charAt(diff.get(1)) == goal.charAt(diff.get(0));
    }
}`,
      explanation: 'If strings are identical, swapping two characters keeps them identical only if there is a duplicate character (length of unique set < length of string). If they differ, they must differ in exactly 2 positions, and swapping these elements must yield the goal. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-860',
    slug: 'lemonade-change',
    title: 'Lemonade Change',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'Each lemonade costs \$5. Customers buy one at a time and pay with a \$5, \$10, or \$20 bill. You must provide the correct change. Return `true` if you can provide change for every customer.',
    constraints: ['1 <= bills.length <= 10^5', 'bills[i] is either 5, 10, or 20.'],
    solutions: {
      python: `class Solution:
    def lemonadeChange(self, bills: List[int]) -> bool:
        five = ten = 0
        for b in bills:
            if b == 5:
                five += 1
            elif b == 10:
                if not five: return False
                five -= 1
                ten += 1
            else:
                if ten and five:
                    ten -= 1
                    five -= 1
                elif five >= 3:
                    five -= 3
                else:
                    return False
        return True`,
      cpp: `class Solution {
public:
    bool lemonadeChange(vector<int>& bills) {
        int five = 0, ten = 0;
        for (int b : bills) {
            if (b == 5) five++;
            else if (b == 10) {
                if (five == 0) return false;
                five--; ten++;
            } else {
                if (ten > 0 && five > 0) { ten--; five--; }
                else if (five >= 3) { five -= 3; }
                else return false;
            }
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0, ten = 0;
        for (int b : bills) {
            if (b == 5) five++;
            else if (b == 10) {
                if (five == 0) return false;
                five--; ten++;
            } else {
                if (ten > 0 && five > 0) { ten--; five--; }
                else if (five >= 3) { five -= 3; }
                else return false;
            }
        }
        return true;
    }
}`,
      explanation: 'Use greedy tracking of \$5 and \$10 bills. When giving change for a \$20 bill, prefer giving one \$10 and one \$5 bill first (to preserve \$5 bills, which are more versatile), and fallback to three \$5 bills. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-867',
    slug: 'transpose-matrix',
    title: 'Transpose Matrix',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Given a 2D integer array `matrix`, return the **transpose** of `matrix`. The transpose of a matrix is the matrix flipped over its main diagonal.',
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 1000', '1 <= m * n <= 10^5', '-10^9 <= matrix[i][j] <= 10^9'],
    solutions: {
      python: `class Solution:
    def transpose(self, matrix: List[List[int]]) -> List[List[int]]:
        return [list(row) for row in zip(*matrix)]`,
      cpp: `class Solution {
public:
    vector<vector<int>> transpose(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> res(n, vector<int>(m));
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                res[c][r] = matrix[r][c];
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[][] transpose(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[][] res = new int[n][m];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                res[c][r] = matrix[r][c];
            }
        }
        return res;
    }
}`,
      explanation: 'The transpose operation swaps cell values from row r and column c to row c and column r. Create a new matrix of dimensions n x m and fill it. Time complexity: O(m * n), Space complexity: O(m * n).'
    }
  },
  {
    id: 'lc-868',
    slug: 'binary-gap',
    title: 'Binary Gap',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Bit Manipulation',
    description: 'Given a positive integer `n`, find and return the **longest distance** between any two adjacent `1`\'s in its binary representation. If there are no two adjacent `1`\'s, return `0`.',
    constraints: ['1 <= n <= 10^9'],
    solutions: {
      python: `class Solution:
    def binaryGap(self, n: int) -> int:
        best = 0
        last = -1
        idx = 0
        while n > 0:
            if n & 1:
                if last != -1:
                    best = max(best, idx - last)
                last = idx
            n >>= 1
            idx += 1
        return best`,
      cpp: `class Solution {
public:
    int binaryGap(int n) {
        int best = 0, last = -1, idx = 0;
        while (n > 0) {
            if (n & 1) {
                if (last != -1) best = max(best, idx - last);
                last = idx;
            }
            n >>= 1;
            idx++;
        }
        return best;
    }
};`,
      java: `class Solution {
    public int binaryGap(int n) {
        int best = 0, last = -1, idx = 0;
        while (n > 0) {
            if ((n & 1) == 1) {
                if (last != -1) best = Math.max(best, idx - last);
                last = idx;
            }
            n >>= 1;
            idx++;
        }
        return best;
    }
}`,
      explanation: 'Iterate through the binary representation of n bit by bit. Track the index of the last seen 1. When finding a set bit, calculate the distance from the last 1 and update the maximum distance. Time complexity: O(log n) (at most 30 steps), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-872',
    slug: 'leaf-similar-trees',
    title: 'Leaf-Similar Trees',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a **leaf value sequence**. Two binary trees are considered leaf-similar if their leaf value sequences are the same. Return `true` if they are leaf-similar.',
    constraints: ['The number of nodes in each tree will be in the range [1, 200].', 'Both of the given trees will have values between 0 and 200.'],
    solutions: {
      python: `class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def get_leaves(node, leaves):
            if not node: return
            if not node.left and not node.right:
                leaves.append(node.val)
            get_leaves(node.left, leaves)
            get_leaves(node.right, leaves)
        l1, l2 = [], []
        get_leaves(root1, l1)
        get_leaves(root2, l2)
        return l1 == l2`,
      cpp: `class Solution {
    void getLeaves(TreeNode* node, vector<int>& leaves) {
        if (!node) return;
        if (!node->left && !node->right) leaves.push_back(node->val);
        getLeaves(node->left, leaves);
        getLeaves(node->right, leaves);
    }
public:
    bool leafSimilar(TreeNode* root1, TreeNode* root2) {
        vector<int> l1, l2;
        getLeaves(root1, l1);
        getLeaves(root2, l2);
        return l1 == l2;
    }
};`,
      java: `class Solution {
    private void getLeaves(TreeNode node, List<Integer> leaves) {
        if (node == null) return;
        if (node.left == null && node.right == null) leaves.add(node.val);
        getLeaves(node.left, leaves);
        getLeaves(node.right, leaves);
    }
    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        List<Integer> l1 = new ArrayList<>(), l2 = new ArrayList<>();
        getLeaves(root1, l1);
        getLeaves(root2, l2);
        return l1.equals(l2);
    }
}`,
      explanation: 'Traverse both trees using DFS. Collect values of leaf nodes (nodes with left and right children as null) into arrays, then compare the arrays. Time complexity: O(n1 + n2), Space complexity: O(h1 + h2).'
    }
  },
  {
    id: 'lc-884',
    slug: 'uncommon-words-from-two-sentences',
    title: 'Uncommon Words from Two Sentences',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence. Given two sentences `s1` and `s2`, return a list of all uncommon words.',
    constraints: ['1 <= s1.length, s2.length <= 200', 's1 and s2 consist of lowercase English letters and spaces.', 's1 and s2 do not have leading or trailing spaces.', 'All the words in s1 and s2 are separated by a single space.'],
    solutions: {
      python: `class Solution:
    def uncommonFromSentences(self, s1: str, s2: str) -> List[str]:
        words = s1.split(" ") + s2.split(" ")
        counts = {}
        for w in words: counts[w] = counts.get(w, 0) + 1
        return [w for w in counts if counts[w] == 1]`,
      cpp: `class Solution {
public:
    vector<string> uncommonFromSentences(string s1, string s2) {
        stringstream ss(s1 + " " + s2);
        string word;
        unordered_map<string, int> counts;
        while (ss >> word) counts[word]++;
        vector<string> res;
        for (const auto& [w, cnt] : counts) {
            if (cnt == 1) res.push_back(w);
        }
        return res;
    }
};`,
      java: `class Solution {
    public String[] uncommonFromSentences(String s1, String s2) {
        Map<String, Integer> counts = new HashMap<>();
        for (String w : s1.split(" ")) counts.put(w, counts.getOrDefault(w, 0) + 1);
        for (String w : s2.split(" ")) counts.put(w, counts.getOrDefault(w, 0) + 1);
        List<String> res = new ArrayList<>();
        for (String w : counts.keySet()) {
            if (counts.get(w) == 1) res.add(w);
        }
        return res.toArray(new String[0]);
    }
}`,
      explanation: 'Concatenate the two sentences and count the frequencies of all words in the combined string. An uncommon word is one that has a frequency of exactly 1 in this map. Time complexity: O(n1 + n2), Space complexity: O(n1 + n2).'
    }
  },
  {
    id: 'lc-888',
    slug: 'fair-candy-swap',
    title: 'Fair Candy Swap',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Alice and Bob have candy bars of different sizes. They want to swap one candy bar each so that they both have the same total amount of candy.',
    constraints: ['1 <= aliceSizes.length, bobSizes.length <= 10^4', '1 <= aliceSizes[i], bobSizes[j] <= 10^5', 'Alice and Bob have different total amounts of candy.', 'There will be at least one valid answer.'],
    solutions: {
      python: `class Solution:
    def fairCandySwap(self, aliceSizes: List[int], bobSizes: List[int]) -> List[int]:
        sumA, sumB = sum(aliceSizes), sum(bobSizes)
        diff = (sumA - sumB) // 2
        setA = set(aliceSizes)
        for y in bobSizes:
            if y + diff in setA:
                return [y + diff, y]`,
      cpp: `class Solution {
public:
    vector<int> fairCandySwap(vector<int>& aliceSizes, vector<int>& bobSizes) {
        long long sumA = 0, sumB = 0;
        for (int x : aliceSizes) sumA += x;
        for (int y : bobSizes) sumB += y;
        long long diff = (sumA - sumB) / 2;
        unordered_set<int> setA(aliceSizes.begin(), aliceSizes.end());
        for (int y : bobSizes) {
            if (setA.count(y + diff)) return {(int)(y + diff), y};
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] fairCandySwap(int[] aliceSizes, int[] bobSizes) {
        int sumA = 0, sumB = 0;
        for (int x : aliceSizes) sumA += x;
        for (int y : bobSizes) sumB += y;
        int diff = (sumA - sumB) / 2;
        Set<Integer> setA = new HashSet<>();
        for (int x : aliceSizes) setA.add(x);
        for (int y : bobSizes) {
            if (setA.contains(y + diff)) return new int[]{y + diff, y};
        }
        return new int[0];
    }
}`,
      explanation: 'Let Sum(A) - x + y = Sum(B) - y + x. Solving for x yields x = y + (Sum(A) - Sum(B)) / 2. Put elements of Alice\'s sizes in a set, iterate Bob\'s sizes, and check if y + diff exists in the set. Time complexity: O(n + m), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-892',
    slug: 'surface-area-of-3d-shapes',
    title: 'Surface Area of 3D Shapes',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are given an `n x n` `grid` where you have placed some `v = grid[i][j]` 3D cubes on each cell. Return the total surface area of the resulting 3D shape.',
    constraints: ['n == grid.length', 'n == grid[i].length', '1 <= n <= 50', '0 <= grid[i][j] <= 50'],
    solutions: {
      python: `class Solution:
    def surfaceArea(self, grid: List[List[int]]) -> int:
        n = len(grid)
        area = 0
        for r in range(n):
            for c in range(n):
                v = grid[r][c]
                if v > 0:
                    area += 2 + 4 * v
                    if r > 0: area -= 2 * min(v, grid[r - 1][c])
                    if c > 0: area -= 2 * min(v, grid[r][c - 1])
        return area`,
      cpp: `class Solution {
public:
    int surfaceArea(vector<vector<int>>& grid) {
        int n = grid.size(), area = 0;
        for (int r = 0; r < n; ++r) {
            for (int c = 0; c < n; ++c) {
                int v = grid[r][c];
                if (v > 0) {
                    area += 2 + 4 * v;
                    if (r > 0) area -= 2 * min(v, grid[r - 1][c]);
                    if (c > 0) area -= 2 * min(v, grid[r][c - 1]);
                }
            }
        }
        return area;
    }
};`,
      java: `class Solution {
    public int surfaceArea(int[][] grid) {
        int n = grid.length, area = 0;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                int v = grid[r][c];
                if (v > 0) {
                    area += 2 + 4 * v;
                    if (r > 0) area -= 2 * Math.min(v, grid[r - 1][c]);
                    if (c > 0) area -= 2 * Math.min(v, grid[r][c - 1]);
                }
            }
        }
        return area;
    }
}`,
      explanation: 'A stack of v cubes has a surface area of 2 + 4 * v (2 for top and bottom, and 4 * v for sides). Subtract overlaps: for each adjacent cell (top or left), the overlap area is 2 * min(v1, v2). Time complexity: O(n^2), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-896',
    slug: 'monotonic-array',
    title: 'Monotonic Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'An array is monotonic if it is either entirely non-increasing or entirely non-decreasing. Given an integer array `nums`, return `true` if the given array is monotonic.',
    constraints: ['1 <= nums.length <= 10^5', '-10^5 <= nums[i] <= 10^5'],
    solutions: {
      python: `class Solution:
    def isMonotonic(self, nums: List[int]) -> bool:
        inc = dec = True
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]: dec = False
            if nums[i] < nums[i - 1]: inc = False
        return inc or dec`,
      cpp: `class Solution {
public:
    bool isMonotonic(vector<int>& nums) {
        bool inc = true, dec = true;
        for (int i = 1; i < nums.size(); ++i) {
            if (nums[i] > nums[i - 1]) dec = false;
            if (nums[i] < nums[i - 1]) inc = false;
        }
        return inc || dec;
    }
};`,
      java: `class Solution {
    public boolean isMonotonic(int[] nums) {
        boolean inc = true, dec = true;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) dec = false;
            if (nums[i] < nums[i - 1]) inc = false;
        }
        return inc || dec;
    }
}`,
      explanation: 'Iterate through the array once. Maintain two boolean flags: inc (non-decreasing) and dec (non-increasing). If you find nums[i] > nums[i-1], clear the dec flag. If nums[i] < nums[i-1], clear the inc flag. Return true if either flag is still true. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-897',
    slug: 'increasing-order-search-tree',
    title: 'Increasing Order Search Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given the `root` of a binary search tree, rearrange the tree in **in-order** so that the leftmost node in the tree is now the root of the tree, and every node has no left child and only one right child.',
    constraints: ['The number of nodes in the given tree will be in the range [1, 100].', '0 <= Node.val <= 1000'],
    solutions: {
      python: `class Solution:
    def increasingBST(self, root: TreeNode) -> TreeNode:
        dummy = curr = TreeNode(0)
        def inorder(node):
            nonlocal curr
            if not node: return
            inorder(node.left)
            node.left = None
            curr.right = node
            curr = node
            inorder(node.right)
        inorder(root)
        return dummy.right`,
      cpp: `class Solution {
    TreeNode* curr;
    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        node->left = nullptr;
        curr->right = node;
        curr = node;
        inorder(node->right);
    }
public:
    TreeNode* increasingBST(TreeNode* root) {
        TreeNode* dummy = new TreeNode(0);
        curr = dummy;
        inorder(root);
        return dummy->right;
    }
};`,
      java: `class Solution {
    private TreeNode curr;
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        node.left = null;
        curr.right = node;
        curr = node;
        inorder(node.right);
    }
    public TreeNode increasingBST(TreeNode root) {
        TreeNode dummy = new TreeNode(0);
        curr = dummy;
        inorder(root);
        return dummy.right;
    }
}`,
      explanation: 'Use an in-order DFS traversal. Link nodes together sequentially as they are visited. Keep track of the current node tail pointer (curr) and clear left child pointers. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-905',
    slug: 'sort-array-by-parity',
    title: 'Sort Array By Parity',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given an integer array `nums`, move all the even integers to the beginning of the array followed by all the odd integers. Return **any array** that satisfies this condition.',
    constraints: ['1 <= nums.length <= 5000', '0 <= nums[i] <= 5000'],
    solutions: {
      python: `class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        l, r = 0, len(nums) - 1
        while l < r:
            if nums[l] % 2 > nums[r] % 2:
                nums[l], nums[r] = nums[r], nums[l]
            if nums[l] % 2 == 0: l += 1
            if nums[r] % 2 == 1: r -= 1
        return nums`,
      cpp: `class Solution {
public:
    vector<int>& sortArrayByParity(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            if (nums[l] % 2 > nums[r] % 2) {
                swap(nums[l], nums[r]);
            }
            if (nums[l] % 2 == 0) l++;
            if (nums[r] % 2 == 1) r--;
        }
        return nums;
    }
};`,
      java: `class Solution {
    public int[] sortArrayByParity(int[] nums) {
        int l = 0, r = nums.length - 1;
        while (l < r) {
            if (nums[l] % 2 > nums[r] % 2) {
                int t = nums[l]; nums[l] = nums[r]; nums[r] = t;
            }
            if (nums[l] % 2 == 0) l++;
            if (nums[r] % 2 == 1) r--;
        }
        return nums;
    }
}`,
      explanation: 'Use two pointers l and r. Move even numbers to left and odd numbers to right. Swap elements when finding an odd number on the left and an even number on the right. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-908',
    slug: 'smallest-range-i',
    title: 'Smallest Range I',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'You are given an integer array `nums` and an integer `k`. For each index `i` we can choose an integer `x_i` with `-k <= x_i <= k` and add `x_i` to `nums[i]`. Return the minimum possible difference between the maximum and minimum elements.',
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^4', '0 <= k <= 10^4'],
    solutions: {
      python: `class Solution:
    def smallestRangeI(self, nums: List[int], k: int) -> int:
        return max(0, max(nums) - min(nums) - 2 * k)`,
      cpp: `class Solution {
public:
    int smallestRangeI(vector<int>& nums, int k) {
        int mx = nums[0], mn = nums[0];
        for (int x : nums) {
            mx = max(mx, x);
            mn = min(mn, x);
        }
        return max(0, mx - mn - 2 * k);
    }
};`,
      java: `class Solution {
    public int smallestRangeI(int[] nums, int k) {
        int mx = nums[0], mn = nums[0];
        for (int x : nums) {
            mx = Math.max(mx, x);
            mn = Math.min(mn, x);
        }
        return Math.max(0, mx - mn - 2 * k);
    }
}`,
      explanation: 'The difference between max and min elements is minimized by subtracting k from the max element and adding k to the min element. The smallest difference is max(0, max_val - min_val - 2 * k). Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-914',
    slug: 'x-of-a-kind-in-a-deck-of-cards',
    title: 'X of a Kind in a Deck of Cards',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Determine if you can partition the deck into 1 or more groups of cards such that each group has exactly `X` cards, and all cards in each group have the same integer value, where `X >= 2`.',
    constraints: ['1 <= deck.length <= 10^4', '0 <= deck[i] < 10^4'],
    solutions: {
      python: `from math import gcd
from functools import reduce
class Solution:
    def hasGroupsSizeX(self, deck: List[int]) -> bool:
        counts = {}
        for val in deck: counts[val] = counts.get(val, 0) + 1
        return reduce(gcd, counts.values()) >= 2`,
      cpp: `class Solution {
    int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
public:
    bool hasGroupsSizeX(vector<int>& deck) {
        unordered_map<int, int> counts;
        for (int x : deck) counts[x]++;
        int g = 0;
        for (const auto& [val, cnt] : counts) {
            g = gcd(g, cnt);
        }
        return g >= 2;
    }
};`,
      java: `class Solution {
    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
    public boolean hasGroupsSizeX(int[] deck) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : deck) counts.put(x, counts.getOrDefault(x, 0) + 1);
        int g = 0;
        for (int cnt : counts.values()) {
            g = gcd(g, cnt);
        }
        return g >= 2;
    }
}`,
      explanation: 'Count the frequency of each card value. Grouping size X is possible if and only if the greatest common divisor (GCD) of all frequencies is greater than or equal to 2. Time complexity: O(n log^2 v) where v is max frequency, Space complexity: O(n).'
    }
  },
  {
    id: 'lc-917',
    slug: 'reverse-only-letters',
    title: 'Reverse Only Letters',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given a string `s`, reverse the string according to the following rules:\n- All the characters that are not English letters remain in the same position.\n- All the English letters should be reversed.',
    constraints: ['1 <= s.length <= 100', 's consists of characters with ASCII values in the range [33, 122].'],
    solutions: {
      python: `class Solution:
    def reverseOnlyLetters(self, s: str) -> str:
        chars = list(s)
        l, r = 0, len(s) - 1
        while l < r:
            if not chars[l].isalpha():
                l += 1
            elif not chars[r].isalpha():
                r -= 1
            else:
                chars[l], chars[r] = chars[r], chars[l]
                l += 1
                r -= 1
        return "".join(chars)`,
      cpp: `class Solution {
public:
    string reverseOnlyLetters(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            if (!isalpha(s[l])) l++;
            else if (!isalpha(s[r])) r--;
            else { swap(s[l++], s[r--]); }
        }
        return s;
    }
};`,
      java: `class Solution {
    public String reverseOnlyLetters(String s) {
        char[] chars = s.toCharArray();
        int l = 0, r = chars.length - 1;
        while (l < r) {
            if (!Character.isLetter(chars[l])) l++;
            else if (!Character.isLetter(chars[r])) r--;
            else {
                char t = chars[l]; chars[l] = chars[r]; chars[r] = t;
                l++; r--;
            }
        }
        return new String(chars);
    }
}`,
      explanation: 'Use two pointers l and r. Increment l if s[l] is not a letter. Decrement r if s[r] is not a letter. Swap characters only if both pointers point to letters. Time complexity: O(n), Space complexity: O(n) (or O(1) auxiliary).'
    }
  },
  {
    id: 'lc-922',
    slug: 'sort-array-by-parity-ii',
    title: 'Sort Array By Parity II',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given an array of integers `nums`, half of the integers in `nums` are **odd**, and half are **even**.\n\nSort the array so that whenever `nums[i]` is odd, `i` is odd, and whenever `nums[i]` is even, `i` is even.',
    constraints: ['2 <= nums.length <= 2 * 10^4', 'nums.length is even.', 'Half of the integers in nums are even.', '0 <= nums[i] <= 1000'],
    solutions: {
      python: `class Solution:
    def sortArrayByParityII(self, nums: List[int]) -> List[int]:
        even, odd = 0, 1
        n = len(nums)
        while even < n and odd < n:
            if nums[even] % 2 == 1:
                # Find the next misplaced odd number index to swap
                while nums[odd] % 2 == 1:
                    odd += 2
                nums[even], nums[odd] = nums[odd], nums[even]
            even += 2
        return nums`,
      cpp: `class Solution {
public:
    vector<int>& sortArrayByParityII(vector<int>& nums) {
        int even = 0, odd = 1, n = nums.size();
        while (even < n && odd < n) {
            if (nums[even] % 2 == 1) {
                while (nums[odd] % 2 == 1) odd += 2;
                swap(nums[even], nums[odd]);
            }
            even += 2;
        }
        return nums;
    }
};`,
      java: `class Solution {
    public int[] sortArrayByParityII(int[] nums) {
        int even = 0, odd = 1, n = nums.length;
        while (even < n && odd < n) {
            if (nums[even] % 2 == 1) {
                while (nums[odd] % 2 == 1) odd += 2;
                int t = nums[even]; nums[even] = nums[odd]; nums[odd] = t;
            }
            even += 2;
        }
        return nums;
    }
}`,
      explanation: 'Use two pointers: even pointing to even indices (starting at 0) and odd pointing to odd indices (starting at 1). If nums[even] is odd, search for a misplaced even number at an odd index, and swap. Increment indices by 2. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-925',
    slug: 'longest-pressed-name',
    title: 'Longest Pressed Name',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Your friend is typing his `name` into a keyboard. Sometimes, when typing a character, the key might get long pressed. Return `true` if it is possible that typed was your friend\'s name.',
    constraints: ['1 <= name.length, typed.length <= 1000', 'name and typed consist of lowercase English letters.'],
    solutions: {
      python: `class Solution:
    def isLongPressedName(self, name: str, typed: str) -> bool:
        i = j = 0
        while j < len(typed):
            if i < len(name) and name[i] == typed[j]:
                i += 1
                j += 1
            elif j > 0 and typed[j] == typed[j - 1]:
                j += 1
            else:
                return False
        return i == len(name)`,
      cpp: `class Solution {
public:
    bool isLongPressedName(string name, string typed) {
        int i = 0, j = 0;
        while (j < typed.size()) {
            if (i < name.size() && name[i] == typed[j]) { i++; j++; }
            else if (j > 0 && typed[j] == typed[j-1]) { j++; }
            else return false;
        }
        return i == name.size();
    }
};`,
      java: `class Solution {
    public boolean isLongPressedName(String name, String typed) {
        int i = 0, j = 0;
        while (j < typed.length()) {
            if (i < name.length() && name.charAt(i) == typed.charAt(j)) { i++; j++; }
            else if (j > 0 && typed.charAt(j) == typed.charAt(j - 1)) { j++; }
            else return false;
        }
        return i == name.length();
    }
}`,
      explanation: 'Use two pointers i and j. If characters match, increment both. If there is a mismatch but typed[j] matches the previous character typed[j-1], it is a long press, so increment j. Otherwise, return false. Verify that the entire name is matched. Time complexity: O(len(typed)), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-929',
    slug: 'unique-email-addresses',
    title: 'Unique Email Addresses',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Array',
    description: 'Every valid email consists of a local name and a domain name, separated by the \'@\' sign. Return the number of different addresses that actually receive mails.',
    constraints: ['1 <= emails.length <= 100', '1 <= emails[i].length <= 100', 'emails[i] consist of lowercase English letters, \'+\', \'.\' and \'@\'.', 'There is exactly one \'@\' in each email.'],
    solutions: {
      python: `class Solution:
    def numUniqueEmails(self, emails: List[str]) -> int:
        seen = set()
        for e in emails:
            local, domain = e.split("@")
            # Remove dots and split by plus sign
            local = local.replace(".", "").split("+")[0]
            seen.add(local + "@" + domain)
        return len(seen)`,
      cpp: `class Solution {
public:
    int numUniqueEmails(vector<string>& emails) {
        unordered_set<string> seen;
        for (const string& e : emails) {
            int at = e.find('@');
            string local = e.substr(0, at);
            string domain = e.substr(at);
            string cleanLocal = "";
            for (char c : local) {
                if (c == '.') continue;
                if (c == '+') break;
                cleanLocal += c;
            }
            seen.insert(cleanLocal + domain);
        }
        return seen.size();
    }
};`,
      java: `class Solution {
    public int numUniqueEmails(String[] emails) {
        Set<String> seen = new HashSet<>();
        for (String e : emails) {
            int at = e.indexOf('@');
            String local = e.substring(0, at);
            String domain = e.substring(at);
            StringBuilder cleanLocal = new StringBuilder();
            for (char c : local.toCharArray()) {
                if (c == '.') continue;
                if (c == '+') break;
                cleanLocal.append(c);
            }
            seen.add(cleanLocal.toString() + domain);
        }
        return seen.size();
    }
}`,
      explanation: 'For each email, split into local and domain parts. Normalize the local part by removing all periods "." and ignoring all characters after the first "+". Concatenate back and add to a hash set. Time complexity: O(n * L) where L is max email length, Space complexity: O(n * L).'
    }
  },
  {
    id: 'lc-933',
    slug: 'number-of-recent-calls',
    title: 'Number of Recent Calls',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Queue',
    description: 'You have a `RecentCounter` class which counts the number of recent requests within a certain time frame. Implement it.',
    constraints: ['1 <= t <= 10^9', 'Each test case will call ping with strictly increasing values of t.', 'At most 10^4 calls will be made to ping.'],
    solutions: {
      python: `from collections import deque
class RecentCounter:
    def __init__(self):
        self.q = deque()
    def ping(self, t: int) -> int:
        self.q.append(t)
        while self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)`,
      cpp: `class RecentCounter {
    queue<int> q;
public:
    RecentCounter() {}
    int ping(int t) {
        q.push(t);
        while (q.front() < t - 3000) q.pop();
        return q.size();
    }
};`,
      java: `class RecentCounter {
    private Queue<Integer> q;
    public RecentCounter() {
        q = new LinkedList<>();
    }
    public int ping(int t) {
        q.add(t);
        while (q.peek() < t - 3000) q.poll();
        return q.size();
    }
}`,
      explanation: 'Use a Queue. When ping(t) is called, push t into the queue. Then, repeatedly pop elements from the front of the queue that are strictly smaller than t - 3000. Return queue size. Time complexity: O(1) amortized, Space complexity: O(w) where w is max concurrent requests within 3000ms.'
    }
  },
  {
    id: 'lc-938',
    slug: 'range-sum-of-bst',
    title: 'Range Sum of BST',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given the `root` of a binary search tree and two integers `low` and `high`, return the sum of values of all nodes with a value in the inclusive range `[low, high]`.',
    constraints: ['The number of nodes in the tree is in the range [1, 2 * 10^4].', '1 <= Node.val <= 10^5', '1 <= low <= high <= 10^5', 'All Node.val are unique.'],
    solutions: {
      python: `class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        if not root: return 0
        if root.val < low:
            return self.rangeSumBST(root.right, low, high)
        if root.val > high:
            return self.rangeSumBST(root.left, low, high)
        return root.val + self.rangeSumBST(root.left, low, high) + self.rangeSumBST(root.right, low, high)`,
      cpp: `class Solution {
public:
    int rangeSumBST(TreeNode* root, int low, int high) {
        if (!root) return 0;
        if (root->val < low) return rangeSumBST(root->right, low, high);
        if (root->val > high) return rangeSumBST(root->left, low, high);
        return root->val + rangeSumBST(root->left, low, high) + rangeSumBST(root->right, low, high);
    }
};`,
      java: `class Solution {
    public int rangeSumBST(TreeNode root, int low, int high) {
        if (root == null) return 0;
        if (root.val < low) return rangeSumBST(root.right, low, high);
        if (root.val > high) return rangeSumBST(root.left, low, high);
        return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
    }
}`,
      explanation: 'Use BST properties. If root.val < low, prune the left subtree and search only the right. If root.val > high, prune the right subtree and search only the left. Otherwise, sum the current node value and recursively search both subtrees. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-941',
    slug: 'valid-mountain-array',
    title: 'Valid Mountain Array',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Two Pointers',
    description: 'Given an array of integers `arr`, return `true` if and only if it is a valid mountain array.',
    constraints: ['1 <= arr.length <= 10^4', '0 <= arr[i] <= 10^4'],
    solutions: {
      python: `class Solution:
    def validMountainArray(self, arr: List[int]) -> bool:
        n = len(arr)
        i = 0
        # Walk up
        while i + 1 < n and arr[i] < arr[i + 1]:
            i += 1
        # Peak cannot be the first or last element
        if i == 0 or i == n - 1:
            return False
        # Walk down
        while i + 1 < n and arr[i] > arr[i + 1]:
            i += 1
        return i == n - 1`,
      cpp: `class Solution {
public:
    bool validMountainArray(vector<int>& arr) {
        int n = arr.size(), i = 0;
        while (i + 1 < n && arr[i] < arr[i+1]) i++;
        if (i == 0 || i == n - 1) return false;
        while (i + 1 < n && arr[i] > arr[i+1]) i++;
        return i == n - 1;
    }
};`,
      java: `class Solution {
    public boolean validMountainArray(int[] arr) {
        int n = arr.length, i = 0;
        while (i + 1 < n && arr[i] < arr[i+1]) i++;
        if (i == 0 || i == n - 1) return false;
        while (i + 1 < n && arr[i] > arr[i+1]) i++;
        return i == n - 1;
    }
}`,
      explanation: 'Use a single pointer to climb the mountain. Walk up until elements stop strictly increasing. Ensure the peak is not at the start or end index. Then walk down until elements stop strictly decreasing. Return true if we reached the final index. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1409A',
    slug: 'cf-1409a',
    title: 'Yet Another Two Integers Problem',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Greedy',
    description: 'You are given two integers `a` and `b`. In one move, you can add or subtract any value from 1 to 10. Find the minimum number of moves to make `a` equal to `b`.',
    constraints: ['1 <= t <= 2 * 10^4', '1 <= a, b <= 10^9'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    a, b = map(int, input().split())
    diff = abs(a - b)
    print((diff + 9) // 10)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int a, b; cin >> a >> b;
        int diff = abs(a - b);
        cout << (diff + 9) / 10 << "\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int a = sc.nextInt(), b = sc.nextInt();
            int diff = Math.abs(a - b);
            System.out.println((diff + 9) / 10);
        }
    }
}`,
      explanation: 'Calculate the absolute difference between a and b. Since the maximum step size is 10, the minimum number of moves is ceil(diff / 10) which can be computed as (diff + 9) / 10. Time complexity: O(1) per testcase, Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1512A',
    slug: 'cf-1512a',
    title: 'Spy Detected!',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'You are given an array of `n` integers where all numbers except one are equal. Find the 1-based index of this outlier ("spy").',
    constraints: ['1 <= t <= 100', '4 <= n <= 100', '1 <= a_i <= 100'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    n = int(input())
    a = list(map(int, input().split()))
    # Determine the common element by looking at first 3 elements
    temp = sorted(a[:3])
    common = temp[1]
    for i, x in enumerate(a):
        if x != common:
            print(i + 1)
            break`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int n; cin >> n;
        vector<int> a(n);
        for (int i = 0; i < n; ++i) cin >> a[i];
        int common = a[0];
        if (a[0] != a[1] && a[1] == a[2]) common = a[1];
        else if (a[0] != a[1] && a[0] == a[2]) common = a[0];
        for (int i = 0; i < n; ++i) {
            if (a[i] != common) { cout << i + 1 << "\\n"; break; }
        }
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int[] a = new int[n];
            for (int i = 0; i < n; i++) a[i] = sc.nextInt();
            int common = a[0];
            if (a[0] != a[1] && a[1] == a[2]) common = a[1];
            else if (a[0] != a[1] && a[0] == a[2]) common = a[0];
            for (int i = 0; i < n; i++) {
                if (a[i] != common) { System.out.println(i + 1); break; }
            }
        }
    }
}`,
      explanation: 'Identify the common element by checking the first three elements. Once determined, iterate through the array to find the single element that is different from it. Time complexity: O(n), Space complexity: O(1) auxiliary.'
    }
  },
  {
    id: 'cf-1560A',
    slug: 'cf-1560a',
    title: 'Dislike of Threes',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Polycarp dislikes numbers that are divisible by 3 or end with the digit 3. Find the `k`-th elements of this sequence (1-indexed).',
    constraints: ['1 <= t <= 100', '1 <= k <= 1000'],
    solutions: {
      python: `seq = []
val = 1
while len(seq) < 1000:
    if val % 3 != 0 and val % 10 != 3:
        seq.append(val)
    val += 1
t = int(input())
for _ in range(t):
    print(seq[int(input()) - 1])`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> seq;
    int val = 1;
    while (seq.size() < 1000) {
        if (val % 3 != 0 && val % 10 != 3) seq.push_back(val);
        val++;
    }
    int t; cin >> t;
    while (t--) {
        int k; cin >> k;
        cout << seq[k - 1] << "\\n";
    }
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        List<Integer> seq = new ArrayList<>();
        int val = 1;
        while (seq.size() < 1000) {
            if (val % 3 != 0 && val % 10 != 3) seq.add(val);
            val++;
        }
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int k = sc.nextInt();
            System.out.println(seq.get(k - 1));
        }
    }
}`,
      explanation: 'Precompute the sequence of liked numbers up to index 1000. Skip integers divisible by 3 (n % 3 == 0) or ending in 3 (n % 10 == 3). Answer queries in O(1). Time complexity: O(K_max + T) where K_max = 1000, Space complexity: O(K_max).'
    }
  },
  {
    id: 'cf-1669A',
    slug: 'cf-1669a',
    title: 'Division?',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Conditional',
    description: 'Given a rating `r`, classify it into one of the four divisions:\n- Division 1: r >= 1900\n- Division 2: 1600 <= r <= 1899\n- Division 3: 1400 <= r <= 1599\n- Division 4: r <= 1399',
    constraints: ['1 <= t <= 10^4', '-5000 <= rating <= 5000'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    r = int(input())
    if r >= 1900: print("Division 1")
    elif r >= 1600: print("Division 2")
    elif r >= 1400: print("Division 3")
    else: print("Division 4")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        int r; cin >> r;
        if (r >= 1900) cout << "Division 1\\n";
        else if (r >= 1600) cout << "Division 2\\n";
        else if (r >= 1400) cout << "Division 3\\n";
        else cout << "Division 4\\n";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            int r = sc.nextInt();
            if (r >= 1900) System.out.println("Division 1");
            else if (r >= 1600) System.out.println("Division 2");
            else if (r >= 1400) System.out.println("Division 3");
            else System.out.println("Division 4");
        }
    }
}`,
      explanation: 'Use basic if-else conditional branches to evaluate which rating range the input matches. Time complexity: O(1) per query, Space complexity: O(1).'
    }
  },
  {
    id: 'cf-1676A',
    slug: 'cf-1676a',
    title: 'Lucky?',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'A ticket is ticket number with 6 digits. It is lucky if the sum of the first three digits is equal to the sum of the last three digits. Determine if ticket is lucky.',
    constraints: ['1 <= t <= 10^4', 'Ticket numbers contain exactly 6 digits.'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    s = input()
    sum1 = int(s[0]) + int(s[1]) + int(s[2])
    sum2 = int(s[3]) + int(s[4]) + int(s[5])
    print("YES" if sum1 == sum2 else "NO")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t; cin >> t;
    while (t--) {
        string s; cin >> s;
        int sum1 = (s[0] - '0') + (s[1] - '0') + (s[2] - '0');
        int sum2 = (s[3] - '0') + (s[4] - '0') + (s[5] - '0');
        cout << (sum1 == sum2 ? "YES\\n" : "NO\\n");
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();
        while (t-- > 0) {
            String s = sc.next();
            int sum1 = (s.charAt(0) - '0') + (s.charAt(1) - '0') + (s.charAt(2) - '0');
            int sum2 = (s.charAt(3) - '0') + (s.charAt(4) - '0') + (s.charAt(5) - '0');
            System.out.println(sum1 == sum2 ? "YES" : "NO");
        }
    }
}`,
      explanation: 'Parse the 6-digit ticket number as a string. Extract digit values at indices 0-2 and indices 3-5, sum them, and compare. Time complexity: O(1), Space complexity: O(1).'
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
