const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

const BATCH = [
  {
    id: 'cf-189A',
    slug: 'cf-189a',
    title: 'Cut Ribbon',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Dynamic Programming',
    description: 'Polycarpus has a ribbon of length `n`. He wants to cut the ribbon in a way that fulfils the following two conditions:\n- After the cutting each ribbon piece must have length `a`, `b` or `c`.\n- The number of ribbon pieces after the cutting must be maximized.\n\nHelp Polycarpus find the maximum number of pieces.',
    constraints: ['1 <= n, a, b, c <= 4000'],
    solutions: {
      python: `n, a, b, c = map(int, input().split())
dp = [-1] * (n + 1)
dp[0] = 0
for i in range(1, n + 1):
    for x in [a, b, c]:
        if i >= x and dp[i - x] != -1:
            dp[i] = max(dp[i], dp[i - x] + 1)
print(dp[n])`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, a, b, c;
    if (cin >> n >> a >> b >> c) {
        vector<int> dp(n + 1, -1);
        dp[0] = 0;
        for (int i = 1; i <= n; ++i) {
            for (int x : {a, b, c}) {
                if (i >= x && dp[i - x] != -1) {
                    dp[i] = max(dp[i], dp[i - x] + 1);
                }
            }
        }
        cout << dp[n];
    }
}`,
      java: `import java.util.Scanner;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
        int[] dp = new int[n + 1];
        Arrays.fill(dp, -1);
        dp[0] = 0;
        for (int i = 1; i <= n; i++) {
            for (int x : new int[]{a, b, c}) {
                if (i >= x && dp[i - x] != -1) {
                    dp[i] = Math.max(dp[i], dp[i - x] + 1);
                }
            }
        }
        System.out.println(dp[n]);
    }
}`,
      explanation: 'Use 1D DP. Let dp[i] represent the maximum number of ribbon pieces of length i. Transition: dp[i] = max(dp[i], dp[i-x] + 1) for x in {a, b, c} if dp[i-x] is valid. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-271A',
    slug: 'cf-271a',
    title: 'Beautiful Year',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Find the minimum year number that is strictly larger than `y` and all its digits are distinct.',
    constraints: ['1000 <= y <= 9000'],
    solutions: {
      python: `y = int(input())
while True:
    y += 1
    if len(set(str(y))) == 4:
        print(y)
        break`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
bool distinct(int y) {
    string s = to_string(y);
    return set<char>(s.begin(), s.end()).size() == 4;
}
int main() {
    int y; cin >> y;
    while (true) {
        y++;
        if (distinct(y)) { cout << y; break; }
    }
}`,
      java: `import java.util.Scanner;
import java.util.HashSet;
public class Main {
    public static void main(String[] args) {
        int y = new Scanner(System.in).nextInt();
        while (true) {
            y++;
            if (distinct(y)) {
                System.out.println(y);
                break;
            }
        }
    }
    private static boolean distinct(int y) {
        HashSet<Character> set = new HashSet<>();
        for (char c : String.valueOf(y).toCharArray()) set.add(c);
        return set.size() == 4;
    }
}`,
      explanation: 'Increment year y continuously. Convert y to a string/set to check if it has 4 unique digits. Print the first such year encountered. Time complexity: O(1) average (usually within a few iterations), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-263B',
    slug: 'cf-263b',
    title: 'Squares',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Greedy',
    description: 'Vasya has `n` square rooms on a plane. The coordinates of the squares are given. Find a point (x, y) that lies in exactly `k` squares.',
    constraints: ['1 <= n, k <= 50', '1 <= a_i <= 10^9'],
    solutions: {
      python: `n, k = map(int, input().split())
a = sorted(map(int, input().split()), reverse=True)
if k > n:
    print(-1)
else:
    # A point (x, x) where x is the side length of the k-th largest square room
    print(f"{a[k-1]} 0")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k;
    if (cin >> n >> k) {
        vector<int> a(n);
        for (int i = 0; i < n; ++i) cin >> a[i];
        sort(a.rbegin(), a.rend());
        if (k > n) cout << -1;
        else cout << a[k-1] << " 0";
    }
}`,
      java: `import java.util.Scanner;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        Arrays.sort(a);
        if (k > n) System.out.println(-1);
        else System.out.println(a[n - k] + " 0");
    }
}`,
      explanation: 'Sort the side lengths of the square rooms. If we need a point in exactly k square rooms, sorting them descendingly means the point (a[k-1], 0) will fall inside the k largest squares and outside the rest. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-313A',
    slug: 'cf-313a',
    title: 'Ilya and Bank Account',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Ilya has a bank account. He can either keep the current balance, or delete the last digit, or delete the second to last digit. Find the maximum possible balance Ilya can achieve.',
    constraints: ['-10^9 <= n <= 10^9'],
    solutions: {
      python: `n = int(input())
if n >= 0:
    print(n)
else:
    s = str(n)
    cand1 = int(s[:-1])
    cand2 = int(s[:-2] + s[-1])
    print(max(cand1, cand2))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    if (n >= 0) cout << n;
    else {
        int cand1 = n / 10;
        int cand2 = (n / 100) * 10 + n % 10;
        cout << max(cand1, cand2);
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        if (n >= 0) System.out.println(n);
        else {
            int cand1 = n / 10;
            int cand2 = (n / 100) * 10 + n % 10;
            System.out.println(Math.max(cand1, cand2));
        }
    }
}`,
      explanation: 'If the balance is non-negative, do nothing. If it is negative, compare two candidates: deleting the last digit (n / 10) vs deleting the second-to-last digit ((n / 100) * 10 + n % 10). Return the maximum. Time complexity: O(1), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-144A',
    slug: 'cf-144a',
    title: 'Arrival of the General',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'A line of soldiers of varying heights stands. Find the minimum number of seconds to rearrange them so that the tallest soldier is at the first position and the shortest soldier is at the last position. In one second, you can swap any two adjacent soldiers.',
    constraints: ['2 <= n <= 100', '1 <= a_i <= 100'],
    solutions: {
      python: `n = int(input())
a = list(map(int, input().split()))
max_idx = a.index(max(a))
min_idx = len(a) - 1 - a[::-1].index(min(a))
moves = max_idx + (n - 1 - min_idx)
if max_idx > min_idx:
    moves -= 1
print(moves)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    int max_val = 0, min_val = 101, max_idx = 0, min_idx = 0;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        if (x > max_val) { max_val = x; max_idx = i; }
        if (x <= min_val) { min_val = x; min_idx = i; }
    }
    int moves = max_idx + (n - 1 - min_idx);
    if (max_idx > min_idx) moves--;
    cout << moves;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int maxVal = 0, minVal = 101, maxIdx = 0, minIdx = 0;
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            if (x > maxVal) { maxVal = x; maxIdx = i; }
            if (x <= minVal) { minVal = x; minIdx = i; }
        }
        int moves = maxIdx + (n - 1 - minIdx);
        if (maxIdx > minIdx) moves--;
        System.out.println(moves);
    }
}`,
      explanation: 'Find the index of the first occurrence of the maximum element (to minimize steps leftward) and the last occurrence of the minimum element (to minimize steps rightward). The sum of steps is max_idx + (n - 1 - min_idx). If they cross (max_idx > min_idx), subtract 1 because one swap performs both jobs simultaneously. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-677A',
    slug: 'cf-677a',
    title: 'Vanya and Fence',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Vanya and his friends are walking. The fence has height `h`. If a friend is taller than `h`, they must bend, requiring width 2 to walk. Otherwise, they require width 1. Find the minimum width of the road needed.',
    constraints: ['1 <= n <= 1000', '1 <= h <= 1000', '1 <= a_i <= 2 * h'],
    solutions: {
      python: `n, h = map(int, input().split())
a = list(map(int, input().split()))
print(sum(2 if x > h else 1 for x in a))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, h; cin >> n >> h;
    int ans = 0;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        ans += (x > h) ? 2 : 1;
    }
    cout << ans;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), h = sc.nextInt();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            ans += (sc.nextInt() > h) ? 2 : 1;
        }
        System.out.println(ans);
    }
}`,
      explanation: 'Iterate through all friends. Add 2 to the width if their height is strictly greater than h; otherwise, add 1. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-734A',
    slug: 'cf-734a',
    title: 'Anton and Danik',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Anton and Danik played `n` games. Decide who won more games, or if it is a draw.',
    constraints: ['1 <= n <= 10^5'],
    solutions: {
      python: `n = int(input())
s = input()
a = s.count("A")
d = n - a
if a > d: print("Anton")
elif d > a: print("Danik")
else: print("Friendship")`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; string s;
    if (cin >> n >> s) {
        int a = 0;
        for (char c : s) if (c == 'A') a++;
        int d = n - a;
        if (a > d) cout << "Anton";
        else if (d > a) cout << "Danik";
        else cout << "Friendship";
    }
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String s = sc.next();
        int a = 0;
        for (char c : s.toCharArray()) if (c == 'A') a++;
        int d = n - a;
        if (a > d) System.out.println("Anton");
        else if (d > a) System.out.println("Danik");
        else System.out.println("Friendship");
    }
}`,
      explanation: 'Count the occurrences of character A in string s. The occurrences of D is n - count(A). Compare the counts. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-791A',
    slug: 'cf-791a',
    title: 'Bear and Big Brother',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Modular Arithmetic',
    description: 'Limak wants to become larger than Bob. Limak\'s weight is `a` and Bob\'s is `b`. Limak\'s weight triples every year, while Bob\'s doubles. Find the number of years needed.',
    constraints: ['1 <= a <= b <= 10'],
    solutions: {
      python: `a, b = map(int, input().split())
years = 0
while a <= b:
    a *= 3
    b *= 2
    years += 1
print(years)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int a, b; cin >> a >> b;
    int years = 0;
    while (a <= b) {
        a *= 3;
        b *= 2;
        years++;
    }
    cout << years;
}`,
      java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt(), b = sc.nextInt();
        int years = 0;
        while (a <= b) {
            a *= 3;
            b *= 2;
            years++;
        }
        System.out.println(years);
    }
}`,
      explanation: 'Simulate the process year by year, tripling a and doubling b until a > b. Return the total years elapsed. Time complexity: O(log(b/a)), Space complexity: O(1).'
    }
  },
  {
    id: 'cf-977B',
    slug: 'cf-977b',
    title: 'Two-gram',
    difficulty: 'Easy',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Hash Table',
    description: 'Find the two-gram (substring of length 2) that occurs the maximum number of times in the given string `s`.',
    constraints: ['2 <= n <= 100', 's consists of uppercase English letters.'],
    solutions: {
      python: `n = int(input())
s = input()
counts = {}
for i in range(n - 1):
    gram = s[i:i+2]
    counts[gram] = counts.get(gram, 0) + 1
print(max(counts, key=counts.get))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; string s;
    if (cin >> n >> s) {
        unordered_map<string, int> counts;
        for (int i = 0; i < n - 1; ++i) counts[s.substr(i, 2)]++;
        string best = "";
        int max_val = 0;
        for (const auto& [gram, cnt] : counts) {
            if (cnt > max_val) { max_val = cnt; best = gram; }
        }
        cout << best;
    }
}`,
      java: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String s = sc.next();
        Map<String, Integer> counts = new HashMap<>();
        for (int i = 0; i < n - 1; i++) {
            String gram = s.substring(i, i + 2);
            counts.put(gram, counts.getOrDefault(gram, 0) + 1);
        }
        String best = "";
        int maxVal = 0;
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {
            if (entry.getValue() > maxVal) {
                maxVal = entry.getValue();
                best = entry.getKey();
            }
        }
        System.out.println(best);
    }
}`,
      explanation: 'Extract all substrings of length 2 from s. Store their occurrences in a hash map. Output the two-gram with the maximum count. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-977C',
    slug: 'cf-977c',
    title: 'Less or Equal',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'Given an array of `n` integers. Find any integer `x` (1 <= x <= 10^9) such that exactly `k` elements in the array are less than or equal to `x`. If no such integer exists, print -1.',
    constraints: ['1 <= n <= 2 * 10^5', '0 <= k <= n', '1 <= a_i <= 10^9'],
    solutions: {
      python: `n, k = map(int, input().split())
a = sorted(map(int, input().split()))
if k == 0:
    print(1 if a[0] > 1 else -1)
elif k == n:
    print(a[-1])
else:
    print(a[k-1] if a[k-1] != a[k] else -1)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k;
    if (cin >> n >> k) {
        vector<int> a(n);
        for (int i = 0; i < n; ++i) cin >> a[i];
        sort(a.begin(), a.end());
        if (k == 0) {
            cout << (a[0] > 1 ? 1 : -1);
        } else if (k == n) {
            cout << a[n - 1];
        } else {
            cout << (a[k-1] != a[k] ? a[k-1] : -1);
        }
    }
}`,
      java: `import java.util.*;
import java.io.*;
public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        int[] a = new int[n];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(st.nextToken());
        Arrays.sort(a);
        if (k == 0) {
            System.out.println(a[0] > 1 ? 1 : -1);
        } else if (k == n) {
            System.out.println(a[n - 1]);
        } else {
            System.out.println(a[k-1] != a[k] ? a[k-1] : -1);
        }
    }
}`,
      explanation: 'Sort the array. If k == 0, we can output 1 if the smallest element is > 1 (since 1 <= x). If k == n, output the largest element. If 0 < k < n, check if the k-th smallest (index k-1) is different from the (k+1)-th smallest (index k). If yes, output the k-th smallest; otherwise, output -1. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-977D',
    slug: 'cf-977d',
    title: 'Divide by three, multiply by two',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Array',
    description: 'You are given an array of `n` integers. Rearrange the array elements into a sequence such that each next element is either the current element multiplied by two, or divided by three (if divisible). The input is guaranteed to have a valid permutation.',
    constraints: ['2 <= n <= 100', '1 <= a_i <= 3 * 10^18'],
    solutions: {
      python: `n = int(input())
a = list(map(int, input().split()))
# Sort based on custom key: more 3s in factorization comes first, else ascending
def get_key(x):
    threes = 0
    temp = x
    while temp % 3 == 0:
        threes += 1
        temp //= 3
    return (-threes, x)
a.sort(key=get_key)
print(*a)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<long long> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];
    auto getThrees = [](long long x) {
        int count = 0;
        while (x % 3 == 0) { count++; x /= 3; }
        return count;
    };
    sort(a.begin(), a.end(), [&](long long x, long long y) {
        int tx = getThrees(x), ty = getThrees(y);
        return tx == ty ? x < y : tx > ty;
    });
    for (int i = 0; i < n; i++) cout << a[i] << (i == n - 1 ? "" : " ");
}`,
      java: `import java.util.*;
public class Main {
    private static int getThrees(long x) {
        int count = 0;
        while (x % 3 == 0) { count++; x /= 3; }
        return count;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Long[] a = new Long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        Arrays.sort(a, (x, y) -> {
            int tx = getThrees(x), ty = getThrees(y);
            if (tx == ty) return Long.compare(x, y);
            return Integer.compare(ty, tx); // descending by powers of 3
        });
        for (int i = 0; i < n; i++) System.out.print(a[i] + (i == n - 1 ? "" : " "));
    }
}`,
      explanation: 'Each step is either /3 or *2. This means that as we go from left to right, the power of 3 in prime factorization can only decrease, while the power of 2 can only increase. Sort elements descending by the power of 3 in their factorization, and ascending by value. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-61',
    slug: 'rotate-list',
    title: 'Rotate List',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a linked list, rotate the list to the right by `k` places.',
    constraints: ['The number of nodes in the list is in the range [0, 500].', '-100 <= Node.val <= 100', '0 <= k <= 2 * 10^9'],
    solutions: {
      python: `class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head or not head.next or k == 0: return head
        curr = head
        length = 1
        while curr.next:
            curr = curr.next
            length += 1
        curr.next = head
        k = k % length
        steps = length - k
        for _ in range(steps):
            curr = curr.next
        new_head = curr.next
        curr.next = None
        return new_head`,
      cpp: `class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        ListNode* curr = head;
        int length = 1;
        while (curr->next) { curr = curr->next; length++; }
        curr->next = head;
        k = k % length;
        int steps = length - k;
        for (int i = 0; i < steps; ++i) curr = curr->next;
        ListNode* newHead = curr->next;
        curr->next = nullptr;
        return newHead;
    }
};`,
      java: `class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        ListNode curr = head;
        int length = 1;
        while (curr.next != null) { curr = curr.next; length++; }
        curr.next = head;
        k = k % length;
        int steps = length - k;
        for (int i = 0; i < steps; i++) curr = curr.next;
        ListNode newHead = curr.next;
        curr.next = null;
        return newHead;
    }
}`,
      explanation: 'First, find the length of the list and connect the tail node to the head, making the list circular. Compute k % length. Move length - k steps from the tail to find the new break point, set the new head, and cut the circular connection. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-82',
    slug: 'remove-duplicates-from-sorted-list-ii',
    title: 'Remove Duplicates from Sorted List II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list **sorted** as well.',
    constraints: ['The number of nodes in the list is in the range [0, 300].', '-100 <= Node.val <= 100', 'The list is guaranteed to be sorted in ascending order.'],
    solutions: {
      python: `class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        prev = dummy
        while head:
            if head.next and head.val == head.next.val:
                while head.next and head.val == head.next.val:
                    head = head.next
                prev.next = head.next
            else:
                prev = prev.next
            head = head.next
        return dummy.next`,
      cpp: `class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* prev = dummy;
        while (head) {
            if (head->next && head->val == head->next->val) {
                while (head->next && head->val == head->next->val) head = head->next;
                prev->next = head->next;
            } else {
                prev = prev->next;
            }
            head = head->next;
        }
        ListNode* res = dummy->next;
        delete dummy;
        return res;
    }
};`,
      java: `class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        while (head != null) {
            if (head.next != null && head.val == head.next.val) {
                while (head.next != null && head.val == head.next.val) head = head.next;
                prev.next = head.next;
            } else {
                prev = prev.next;
            }
            head = head.next;
        }
        return dummy.next;
    }
}`,
      explanation: 'Use a dummy node pointing to head. Iterate through the list. If head and head.next share the same value, run a loop to skip all nodes with this duplicate value and update prev.next. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-86',
    slug: 'partition-list',
    title: 'Partition List',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'linear',
    topic: 'Linked List',
    description: 'Given the `head` of a linked list and a value `x`, partition it such that all nodes **less than** `x` come before nodes **greater than or equal to** `x`. You should preserve the original relative order of the nodes in each of the two partitions.',
    constraints: ['The number of nodes in the list is in the range [0, 200].', '-100 <= Node.val <= 100', '-200 <= x <= 200'],
    solutions: {
      python: `class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        before_head = ListNode(0)
        after_head = ListNode(0)
        before = before_head
        after = after_head
        curr = head
        while curr:
            if curr.val < x:
                before.next = curr
                before = before.next
            else:
                after.next = curr
                after = after.next
            curr = curr.next
        after.next = None
        before.next = after_head.next
        return before_head.next`,
      cpp: `class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        ListNode* beforeHead = new ListNode(0);
        ListNode* afterHead = new ListNode(0);
        ListNode* before = beforeHead;
        ListNode* after = afterHead;
        ListNode* curr = head;
        while (curr) {
            if (curr->val < x) { before->next = curr; before = before->next; }
            else { after->next = curr; after = after->next; }
            curr = curr->next;
        }
        after->next = nullptr;
        before->next = afterHead->next;
        ListNode* res = beforeHead->next;
        delete beforeHead; delete afterHead;
        return res;
    }
};`,
      java: `class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode beforeHead = new ListNode(0);
        ListNode afterHead = new ListNode(0);
        ListNode before = beforeHead;
        ListNode after = afterHead;
        ListNode curr = head;
        while (curr != null) {
            if (curr.val < x) { before.next = curr; before = before.next; }
            else { after.next = curr; after = after.next; }
            curr = curr.next;
        }
        after.next = null;
        before.next = afterHead.next;
        return beforeHead.next;
    }
}`,
      explanation: 'Maintain two separate lists: one for nodes with value less than x, and another for nodes with value greater than or equal to x. At the end, connect the tail of the first list to the head of the second list. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-450',
    slug: 'delete-node-in-a-bst',
    title: 'Delete Node in a BST',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.',
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-10^5 <= Node.val <= 10^5', 'Each node has a unique value.', 'root is a valid binary search tree.', '-10^5 <= key <= 10^5'],
    solutions: {
      python: `class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if not root: return None
        if key < root.val:
            root.left = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            if not root.left: return root.right
            if not root.right: return root.left
            # Swap with successor node
            curr = root.right
            while curr.left: curr = curr.left
            root.val = curr.val
            root.right = self.deleteNode(root.right, curr.val)
        return root`,
      cpp: `class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        if (key < root->val) root->left = deleteNode(root->left, key);
        else if (key > root->val) root->right = deleteNode(root->right, key);
        else {
            if (!root->left) return root->right;
            if (!root->right) return root->left;
            TreeNode* curr = root->right;
            while (curr->left) curr = curr->left;
            root->val = curr->val;
            root->right = deleteNode(root->right, curr->val);
        }
        return root;
    }
};`,
      java: `class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null;
        if (key < root.val) root.left = deleteNode(root.left, key);
        else if (key > root.val) root.right = deleteNode(root.right, key);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            TreeNode curr = root.right;
            while (curr.left != null) curr = curr.left;
            root.val = curr.val;
            root.right = deleteNode(root.right, curr.val);
        }
        return root;
    }
}`,
      explanation: 'BST deletion. Search for the key. If found, and the node has only one child, return that child. If it has two children, find its successor (minimum in right subtree), copy successor\'s value to the node, and recursively delete the successor. Time complexity: O(h), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-701',
    slug: 'insert-into-a-binary-search-tree',
    title: 'Insert into a Binary Search Tree',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'You are given the `root` of a binary search tree (BST) and a `val` to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.',
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-10^8 <= Node.val <= 10^8', 'Each node has a unique value.', '-10^8 <= val <= 10^8', 'It is guaranteed that val does not exist in the original BST.'],
    solutions: {
      python: `class Solution:
    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        if not root: return TreeNode(val)
        curr = root
        while True:
            if val < curr.val:
                if not curr.left:
                    curr.left = TreeNode(val)
                    break
                curr = curr.left
            else:
                if not curr.right:
                    curr.right = TreeNode(val)
                    break
                curr = curr.right
        return root`,
      cpp: `class Solution {
public:
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if (!root) return new TreeNode(val);
        TreeNode* curr = root;
        while (true) {
            if (val < curr->val) {
                if (!curr->left) { curr->left = new TreeNode(val); break; }
                curr = curr->left;
            } else {
                if (!curr->right) { curr->right = new TreeNode(val); break; }
                curr = curr->right;
            }
        }
        return root;
    }
};`,
      java: `class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        TreeNode curr = root;
        while (true) {
            if (val < curr.val) {
                if (curr.left == null) { curr.left = new TreeNode(val); break; }
                curr = curr.left;
            } else {
                if (curr.right == null) { curr.right = new TreeNode(val); break; }
                curr = curr.right;
            }
        }
        return root;
    }
}`,
      explanation: 'Traverse the BST down to a leaf node following BST property (left if val < current, right otherwise). Insert the new node as a child at the correct leaf position. Time complexity: O(h), Space complexity: O(1) iterative.'
    }
  },
  {
    id: 'lc-99',
    slug: 'recover-binary-search-tree',
    title: 'Recover Binary Search Tree',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'You are given the `root` of a binary search tree (BST), where the values of **exactly two** nodes were swapped by mistake. Recover the tree without changing its structure.',
    constraints: ['The number of nodes in the tree is in the range [2, 1000].', '-2^31 <= Node.val <= 2^31 - 1'],
    solutions: {
      python: `class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        self.first = self.second = self.prev = None
        def inorder(node):
            if not node: return
            inorder(node.left)
            if self.prev and node.val < self.prev.val:
                if not self.first:
                    self.first = self.prev
                self.second = node
            self.prev = node
            inorder(node.right)
        inorder(root)
        self.first.val, self.second.val = self.second.val, self.first.val`,
      cpp: `class Solution {
    TreeNode *first = nullptr, *second = nullptr, *prev = nullptr;
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        if (prev && root->val < prev->val) {
            if (!first) first = prev;
            second = root;
        }
        prev = root;
        inorder(root->right);
    }
public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        swap(first->val, second->val);
    }
};`,
      java: `class Solution {
    TreeNode first = null, second = null, prev = null;
    private void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.left);
        if (prev != null && root.val < prev.val) {
            if (first == null) first = prev;
            second = root;
        }
        prev = root;
        inorder(root.right);
    }
    public void recoverTree(TreeNode root) {
        inorder(root);
        int temp = first.val; first.val = second.val; second.val = temp;
    }
}`,
      explanation: 'Perform in-order traversal. Since the nodes are mostly sorted, find the two places where the current node value is less than the previous node value. Swap the values of the two identified nodes. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-538',
    slug: 'convert-bst-to-greater-tree',
    title: 'Convert BST to Greater Tree',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Search Tree',
    description: 'Given the `root` of a Binary Search Tree (BST), convert it to a Greater Tree such that every original key of the BST is changed to the original key plus the sum of all keys greater than the original key in BST.',
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-10^4 <= Node.val <= 10^4', 'All keys are unique.', 'root is a valid BST.'],
    solutions: {
      python: `class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        self.total = 0
        def inorder(node):
            if not node: return
            inorder(node.right)
            self.total += node.val
            node.val = self.total
            inorder(node.left)
        inorder(root)
        return root`,
      cpp: `class Solution {
    int total = 0;
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->right);
        total += root->val;
        root->val = total;
        inorder(root->left);
    }
public:
    TreeNode* convertBST(TreeNode* root) {
        inorder(root);
        return root;
    }
};`,
      java: `class Solution {
    int total = 0;
    private void inorder(TreeNode root) {
        if (root == null) return;
        inorder(root.right);
        total += root.val;
        root.val = total;
        inorder(root.left);
    }
    public TreeNode convertBST(TreeNode root) {
        inorder(root);
        return root;
    }
}`,
      explanation: 'Use reversed in-order traversal (Right-Root-Left) to visit nodes in descending order. Maintain a running sum total of visited node values, and update each node\'s value to this running sum. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-114',
    slug: 'flatten-binary-tree-to-linked-list',
    title: 'Flatten Binary Tree to Linked List',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree, flatten the tree into a "linked list" (using the right pointer as next and setting left to null) in-place.',
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-100 <= Node.val <= 100'],
    solutions: {
      python: `class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        curr = root
        while curr:
            if curr.left:
                prev = curr.left
                while prev.right: prev = prev.right
                prev.right = curr.right
                curr.right = curr.left
                curr.left = None
            curr = curr.right`,
      cpp: `class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* curr = root;
        while (curr) {
            if (curr->left) {
                TreeNode* prev = curr->left;
                while (prev->right) prev = prev->right;
                prev->right = curr->right;
                curr->right = curr->left;
                curr->left = nullptr;
            }
            curr = curr->right;
        }
    }
};`,
      java: `class Solution {
    public void flatten(TreeNode root) {
        TreeNode curr = root;
        while (curr != null) {
            if (curr.left != null) {
                TreeNode prev = curr.left;
                while (prev.right != null) prev = prev.right;
                prev.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            curr = curr.right;
        }
    }
}`,
      explanation: 'Iterative in-place solution (Morris traversal style). For each node with a left child, find the rightmost node of its left subtree, point its right to the current node\'s right, then move left child to the right side and set left child to null. Time complexity: O(n), Space complexity: O(1).'
    }
  },
  {
    id: 'lc-129',
    slug: 'sum-root-to-leaf-numbers',
    title: 'Sum Root to Leaf Numbers',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'You are given the `root` of a binary tree containing digits from `0` to `9` only. Return the total sum of all root-to-leaf numbers.',
    constraints: ['The number of nodes in the tree is in the range [1, 1000].', '0 <= Node.val <= 9', 'The depth of the tree will not exceed 10.'],
    solutions: {
      python: `class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        def dfs(node, val):
            if not node: return 0
            val = val * 10 + node.val
            if not node.left and not node.right:
                return val
            return dfs(node.left, val) + dfs(node.right, val)
        return dfs(root, 0)`,
      cpp: `class Solution {
    int dfs(TreeNode* node, int val) {
        if (!node) return 0;
        val = val * 10 + node->val;
        if (!node->left && !node->right) return val;
        return dfs(node->left, val) + dfs(node->right, val);
    }
public:
    int sumNumbers(TreeNode* root) { return dfs(root, 0); }
};`,
      java: `class Solution {
    public int sumNumbers(TreeNode root) { return dfs(root, 0); }
    private int dfs(TreeNode node, int val) {
        if (node == null) return 0;
        val = val * 10 + node.val;
        if (node.left == null && node.right == null) return val;
        return dfs(node.left, val) + dfs(node.right, val);
    }
}`,
      explanation: 'Use DFS. Carry down the current path value. At each node, compute path_value = path_value * 10 + node.val. When a leaf is reached, return the value. Otherwise, return the sum of left and right subtrees. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-222',
    slug: 'count-complete-tree-nodes',
    title: 'Count Complete Tree Nodes',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the `root` of a **complete** binary tree, return the number of nodes in the tree.',
    constraints: ['The number of nodes in the tree is in the range [0, 5 * 10^4].', '0 <= Node.val <= 5 * 10^4', 'The tree is guaranteed to be complete.'],
    solutions: {
      python: `class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        lh = rh = 0
        l, r = root, root
        while l: lh += 1; l = l.left
        while r: rh += 1; r = r.right
        if lh == rh:
            return (1 << lh) - 1
        return 1 + self.countNodes(root.left) + self.countNodes(root.right)`,
      cpp: `class Solution {
public:
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        int lh = 0, rh = 0;
        TreeNode *l = root, *r = root;
        while (l) { lh++; l = l->left; }
        while (r) { rh++; r = r->right; }
        if (lh == rh) return (1 << lh) - 1;
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};`,
      java: `class Solution {
    public int countNodes(TreeNode root) {
        if (root == null) return 0;
        int lh = 0, rh = 0;
        TreeNode l = root, r = root;
        while (l != null) { lh++; l = l.left; }
        while (r != null) { rh++; r = r.right; }
        if (lh == rh) return (1 << lh) - 1;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}`,
      explanation: 'Use complete binary tree properties. Check heights of left and right boundaries. If they are equal, the tree is a perfect binary tree, so nodes = 2^height - 1. Otherwise, recurse for left and right children. Time complexity: O(log^2 n), Space complexity: O(log n).'
    }
  },
  {
    id: 'lc-437',
    slug: 'path-sum-iii',
    title: 'Path Sum III',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given the `root` of a binary tree and an integer `targetSum`, return the number of paths where the sum of the values along the path equals `targetSum`. The path does not need to start or end at the root or a leaf, but it must go downwards.',
    constraints: ['The number of nodes in the tree is in the range [0, 1000].', '-10^9 <= Node.val <= 10^9', '-1000 <= targetSum <= 1000'],
    solutions: {
      python: `class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        prefix = {0: 1}
        def dfs(node, cur_sum):
            if not node: return 0
            cur_sum += node.val
            count = prefix.get(cur_sum - targetSum, 0)
            prefix[cur_sum] = prefix.get(cur_sum, 0) + 1
            count += dfs(node.left, cur_sum) + dfs(node.right, cur_sum)
            prefix[cur_sum] -= 1
            return count
        return dfs(root, 0)`,
      cpp: `class Solution {
    unordered_map<long long, int> prefix;
    int dfs(TreeNode* node, long long curSum, int target) {
        if (!node) return 0;
        curSum += node->val;
        int count = prefix.count(curSum - target) ? prefix[curSum - target] : 0;
        prefix[curSum]++;
        count += dfs(node->left, curSum, target) + dfs(node->right, curSum, target);
        prefix[curSum]--;
        return count;
    }
public:
    int pathSum(TreeNode* root, int targetSum) {
        prefix[0] = 1;
        return dfs(root, 0, targetSum);
    }
};`,
      java: `class Solution {
    Map<Long, Integer> prefix = new HashMap<>();
    public int pathSum(TreeNode root, int targetSum) {
        prefix.put(0L, 1);
        return dfs(root, 0L, targetSum);
    }
    private int dfs(TreeNode node, long curSum, int target) {
        if (node == null) return 0;
        curSum += node.val;
        int count = prefix.getOrDefault(curSum - target, 0);
        prefix.put(curSum, prefix.getOrDefault(curSum, 0) + 1);
        count += dfs(node.left, curSum, target) + dfs(node.right, curSum, target);
        prefix.put(curSum, prefix.get(curSum) - 1);
        return count;
    }
}`,
      explanation: 'Use prefix sum hashing during DFS. Maintain a hash map of prefix sums encountered along the path from root. The number of valid paths ending at the current node is the frequency of (current_sum - targetSum) in the map. Backtrack by decrementing counts. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-106',
    slug: 'construct-binary-tree-from-inorder-and-postorder-traversal',
    title: 'Construct Binary Tree from Inorder and Postorder',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return the binary tree.',
    constraints: ['1 <= inorder.length <= 3000', 'postorder.length == inorder.length', '-3000 <= inorder[i], postorder[i] <= 3000', 'inorder and postorder consist of unique values.', 'Each value of postorder also appears in inorder.'],
    solutions: {
      python: `class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        idx_map = {val: i for i, val in enumerate(inorder)}
        def helper(in_left, in_right):
            if in_left > in_right: return None
            val = postorder.pop()
            root = TreeNode(val)
            idx = idx_map[val]
            # Must build right subtree first due to postorder ordering (Left, Right, Root)
            root.right = helper(idx + 1, in_right)
            root.left = helper(in_left, idx - 1)
            return root
        return helper(0, len(inorder) - 1)`,
      cpp: `class Solution {
    unordered_map<int, int> idxMap;
    TreeNode* helper(vector<int>& postorder, int inLeft, int inRight) {
        if (inLeft > inRight) return nullptr;
        int val = postorder.back(); postorder.pop_back();
        TreeNode* root = new TreeNode(val);
        int idx = idxMap[val];
        root->right = helper(postorder, idx + 1, inRight);
        root->left = helper(postorder, inLeft, idx - 1);
        return root;
    }
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        for (int i = 0; i < inorder.size(); ++i) idxMap[inorder[i]] = i;
        return helper(postorder, 0, inorder.size() - 1);
    }
};`,
      java: `class Solution {
    Map<Integer, Integer> idxMap = new HashMap<>();
    int postIdx;
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        for (int i = 0; i < inorder.length; i++) idxMap.put(inorder[i], i);
        postIdx = postorder.length - 1;
        return helper(postorder, 0, inorder.length - 1);
    }
    private TreeNode helper(int[] postorder, int inLeft, int inRight) {
        if (inLeft > inRight) return null;
        int val = postorder[postIdx--];
        TreeNode root = new TreeNode(val);
        int idx = idxMap[val];
        root.right = helper(postorder, idx + 1, inRight);
        root.left = helper(postorder, inLeft, idx - 1);
        return root;
    }
}`,
      explanation: 'Use the last element in postorder to find the root. Locate this root in inorder using a hash map to determine left/right partition boundaries. Recursively build the right subtree first (since postorder reads root then right child), then the left subtree. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-107',
    slug: 'binary-tree-level-order-traversal-ii',
    title: 'Binary Tree Level Order Traversal II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'BFS',
    description: 'Given the `root` of a binary tree, return the bottom-up level order traversal of its nodes\' values. (i.e., from left to right, level by level from leaf to root).',
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
    solutions: {
      python: `from collections import deque
class Solution:
    def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root: return []
        res = deque()
        q = deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.appendleft(level)
        return list(res)`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            vector<int> level;
            for (int sz = q.size(); sz > 0; sz--) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
        }
        reverse(res.begin(), res.end());
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        if (root == null) return new ArrayList<>();
        List<List<Integer>> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            for (int sz = q.size(); sz > 0; sz--) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            res.add(0, level);
        }
        return res;
    }
}`,
      explanation: 'Perform a standard BFS level order traversal, and prepend each level list to the output array (or reverse the final array) to achieve bottom-up order. Time complexity: O(n), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-111',
    slug: 'minimum-depth-of-binary-tree',
    title: 'Minimum Depth of Binary Tree',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'trees',
    topic: 'Binary Tree',
    description: 'Find the minimum depth of a binary tree. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.',
    constraints: ['The number of nodes in the tree is in the range [0, 10^5].', '-1000 <= Node.val <= 1000'],
    solutions: {
      python: `class Solution:
    def minDepth(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        if not root.left: return 1 + self.minDepth(root.right)
        if not root.right: return 1 + self.minDepth(root.left)
        return 1 + min(self.minDepth(root.left), self.minDepth(root.right))`,
      cpp: `class Solution {
public:
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        if (!root->left) return 1 + minDepth(root->right);
        if (!root->right) return 1 + minDepth(root->left);
        return 1 + min(minDepth(root->left), minDepth(root->right));
    }
};`,
      java: `class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;
        if (root.left == null) return 1 + minDepth(root.right);
        if (root.right == null) return 1 + minDepth(root.left);
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
    }
}`,
      explanation: 'Recursively calculate the minimum depth. If a node lacks one child, we must follow the other child path. Otherwise, take the minimum of left and right child depths. Time complexity: O(n), Space complexity: O(h).'
    }
  },
  {
    id: 'lc-513',
    slug: 'find-bottom-left-tree-value',
    title: 'Find Bottom Left Tree Value',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'BFS',
    description: 'Given the `root` of a binary tree, return the leftmost value in the last row of the tree.',
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
    solutions: {
      python: `from collections import deque
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        q = deque([root])
        curr = root
        while q:
            curr = q.popleft()
            # Push right child first, then left child
            if curr.right: q.append(curr.right)
            if curr.left: q.append(curr.left)
        return curr.val`,
      cpp: `class Solution {
public:
    int findBottomLeftValue(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        TreeNode* curr = root;
        while (!q.empty()) {
            curr = q.front(); q.pop();
            if (curr->right) q.push(curr->right);
            if (curr->left) q.push(curr->left);
        }
        return curr->val;
    }
};`,
      java: `class Solution {
    public int findBottomLeftValue(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        TreeNode curr = root;
        while (!q.isEmpty()) {
            curr = q.poll();
            if (curr.right != null) q.add(curr.right);
            if (curr.left != null) q.add(curr.left);
        }
        return curr.val;
    }
}`,
      explanation: 'Perform BFS from right to left (enqueue right child first, then left). The last node popped from the queue at the end will be the leftmost node in the bottom row. Time complexity: O(n), Space complexity: O(w) where w is tree width.'
    }
  },
  {
    id: 'lc-733',
    slug: 'flood-fill',
    title: 'Flood Fill',
    difficulty: 'Easy',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'An image is represented by an `m x n` integer grid `image`. Perform a flood fill starting from coordinate `(sr, sc)` with `color`.',
    constraints: ['m == image.length', 'n == image[i].length', '1 <= m, n <= 50', '0 <= image[i][j], color <= 2^16 - 1', '0 <= sr < m', '0 <= sc < n'],
    solutions: {
      python: `class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        old_color = image[sr][sc]
        if old_color == color: return image
        m, n = len(image), len(image[0])
        def dfs(r, c):
            if image[r][c] == old_color:
                image[r][c] = color
                for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                    nr, nc = r+dr, c+dc
                    if 0 <= nr < m and 0 <= nc < n:
                        dfs(nr, nc)
        dfs(sr, sc)
        return image`,
      cpp: `class Solution {
    int m, n, oldColor;
    void dfs(vector<vector<int>>& img, int r, int c, int color) {
        if (img[r][c] == oldColor) {
            img[r][c] = color;
            int dirs[] = {0,1,0,-1,0};
            for (int d = 0; d < 4; ++d) {
                int nr = r + dirs[d], nc = c + dirs[d+1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n) dfs(img, nr, nc, color);
            }
        }
    }
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        oldColor = image[sr][sc];
        if (oldColor == color) return image;
        m = image.size(); n = image[0].size();
        dfs(image, sr, sc, color);
        return image;
    }
};`,
      java: `class Solution {
    int m, n, oldColor;
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        oldColor = image[sr][sc];
        if (oldColor == color) return image;
        m = image.length; n = image[0].length;
        dfs(image, sr, sc, color);
        return image;
    }
    private void dfs(int[][] img, int r, int c, int color) {
        if (img[r][c] == oldColor) {
            img[r][c] = color;
            int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n) dfs(img, nr, nc, color);
            }
        }
    }
}`,
      explanation: 'Use DFS. Record the initial color of the starting cell. If the color differs from target color, recursively visit and paint all 4-directionally adjacent cells matching the initial color. Time complexity: O(m * n), Space complexity: O(m * n).'
    }
  },
  {
    id: 'lc-310',
    slug: 'minimum-height-trees',
    title: 'Minimum Height Trees',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'BFS',
    description: 'A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree. Find all labels of roots that yield minimum height trees.',
    constraints: ['1 <= n <= 2 * 10^4', 'edges.length == n - 1', '0 <= a_i, b_i < n', 'The input graph is guaranteed to be a tree.'],
    solutions: {
      python: `class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n <= 2: return list(range(n))
        adj = [set() for _ in range(n)]
        for u, v in edges:
            adj[u].add(v)
            adj[v].add(u)
        leaves = [i for i in range(n) if len(adj[i]) == 1]
        remaining = n
        while remaining > 2:
            remaining -= len(leaves)
            new_leaves = []
            for leaf in leaves:
                neighbor = adj[leaf].pop()
                adj[neighbor].remove(leaf)
                if len(adj[neighbor]) == 1:
                    new_leaves.append(neighbor)
            leaves = new_leaves
        return leaves`,
      cpp: `class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n <= 2) {
            vector<int> res;
            for (int i = 0; i < n; ++i) res.push_back(i);
            return res;
        }
        vector<unordered_set<int>> adj(n);
        for (const auto& e : edges) {
            adj[e[0]].insert(e[1]);
            adj[e[1]].insert(e[0]);
        }
        vector<int> leaves;
        for (int i = 0; i < n; ++i) {
            if (adj[i].size() == 1) leaves.push_back(i);
        }
        int remaining = n;
        while (remaining > 2) {
            remaining -= leaves.size();
            vector<int> newLeaves;
            for (int leaf : leaves) {
                int neighbor = *adj[leaf].begin();
                adj[neighbor].erase(leaf);
                if (adj[neighbor].size() == 1) newLeaves.push_back(neighbor);
            }
            leaves = newLeaves;
        }
        return leaves;
    }
};`,
      java: `class Solution {
    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        if (n <= 2) {
            List<Integer> res = new ArrayList<>();
            for (int i = 0; i < n; i++) res.add(i);
            return res;
        }
        List<Set<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new HashSet<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        List<Integer> leaves = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (adj.get(i).size() == 1) leaves.add(i);
        }
        int remaining = n;
        while (remaining > 2) {
            remaining -= leaves.size();
            List<Integer> newLeaves = new ArrayList<>();
            for (int leaf : leaves) {
                int neighbor = adj.get(leaf).iterator().next();
                adj.get(neighbor).remove(leaf);
                if (adj.get(neighbor).size() == 1) newLeaves.add(neighbor);
            }
            leaves = newLeaves;
        }
        return leaves;
    }
}`,
      explanation: 'Use topological sort style leaf elimination. Similar to finding the centroid of a tree. Continually remove leaf nodes (nodes with degree 1) until only 1 or 2 nodes remain. These centroids represent the roots of the minimum height trees. Time complexity: O(V), Space complexity: O(V).'
    }
  },
  {
    id: 'lc-444',
    slug: 'sequence-reconstruction',
    title: 'Sequence Reconstruction',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'Topological Sort (Kahn\'s)',
    description: 'Check if there is a unique sequence reconstructed from the given subsequences. The unique sequence must be a permutation of 1 to n.',
    constraints: ['1 <= n <= 10^4', '1 <= seqs.length <= 10^4'],
    solutions: {
      python: `from collections import deque
class Solution:
    def sequenceReconstruction(self, org: List[int], seqs: List[List[int]]) -> bool:
        # Build graph
        nodes = set()
        for seq in seqs:
            nodes.update(seq)
        n = len(org)
        if len(nodes) != n or any(x < 1 or x > n for x in nodes): return False
        
        adj = {i: set() for i in range(1, n + 1)}
        indegree = {i: 0 for i in range(1, n + 1)}
        
        for seq in seqs:
            for u, v in zip(seq, seq[1:]):
                if v not in adj[u]:
                    adj[u].add(v)
                    indegree[v] += 1
                    
        q = deque([i for i in range(1, n + 1) if indegree[i] == 0])
        order = []
        while q:
            if len(q) > 1: return False # More than one choice means non-unique
            node = q.popleft()
            order.append(node)
            for neighbor in adj[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    q.append(neighbor)
        return order == org`,
      cpp: `class Solution {
public:
    bool sequenceReconstruction(vector<int>& org, vector<vector<int>>& seqs) {
        int n = org.size();
        vector<unordered_set<int>> adj(n + 1);
        vector<int> indegree(n + 1, 0);
        bool hasElement = false;
        unordered_set<int> present;
        for (const auto& seq : seqs) {
            for (int x : seq) {
                if (x < 1 || x > n) return false;
                present.insert(x);
            }
            for (int i = 0; i < (int)seq.size() - 1; ++i) {
                int u = seq[i], v = seq[i+1];
                if (!adj[u].count(v)) {
                    adj[u].insert(v);
                    indegree[v]++;
                }
            }
        }
        if (present.size() != n) return false;
        queue<int> q;
        for (int i = 1; i <= n; ++i) if (indegree[i] == 0) q.push(i);
        vector<int> order;
        while (!q.empty()) {
            if (q.size() > 1) return false;
            int node = q.front(); q.pop();
            order.push_back(node);
            for (int neighbor : adj[node]) {
                if (--indegree[neighbor] == 0) q.push(neighbor);
            }
        }
        return order == org;
    }
};`,
      java: `class Solution {
    public boolean sequenceReconstruction(int[] org, List<List<Integer>> seqs) {
        int n = org.length;
        List<Set<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new HashSet<>());
        int[] indegree = new int[n + 1];
        Set<Integer> present = new HashSet<>();
        for (List<Integer> seq : seqs) {
            for (int x : seq) {
                if (x < 1 || x > n) return false;
                present.add(x);
            }
            for (int i = 0; i < seq.size() - 1; i++) {
                int u = seq.get(i), v = seq.get(i + 1);
                if (adj.get(u).add(v)) indegree[v]++;
            }
        }
        if (present.size() != n) return false;
        Queue<Integer> q = new LinkedList<>();
        for (int i = 1; i <= n; i++) if (indegree[i] == 0) q.add(i);
        int idx = 0;
        while (!q.isEmpty()) {
            if (q.size() > 1) return false;
            int node = q.poll();
            if (idx >= n || org[idx++] != node) return false;
            for (int neighbor : adj.get(node)) {
                if (--indegree[neighbor] == 0) q.add(neighbor);
            }
        }
        return idx == n;
    }
}`,
      explanation: 'Build a directed graph from the subsequences. Perform Kahn\'s topological sort. At any step in the topological sort, if the queue has more than 1 element, there is more than 1 choice, which means the reconstructed sequence is not unique. Check if the final sorted sequence matches org. Time complexity: O(V + E), Space complexity: O(V + E).'
    }
  },
  {
    id: 'lc-547',
    slug: 'number-of-provinces',
    title: 'Number of Provinces',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'There are `n` cities. Some of them are connected, while some are not. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`. Return the total number of provinces (connected components).',
    constraints: ['1 <= n <= 200', 'isConnected[i][j] is 0 or 1.', 'isConnected[i][i] == 1'],
    solutions: {
      python: `class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        visited = [False] * n
        provinces = 0
        def dfs(node):
            for neighbor in range(n):
                if isConnected[node][neighbor] == 1 and not visited[neighbor]:
                    visited[neighbor] = True
                    dfs(neighbor)
        for i in range(n):
            if not visited[i]:
                visited[i] = True
                dfs(i)
                provinces += 1
        return provinces`,
      cpp: `class Solution {
    void dfs(const vector<vector<int>>& adj, vector<bool>& visited, int node) {
        for (int neighbor = 0; neighbor < adj.size(); ++neighbor) {
            if (adj[node][neighbor] == 1 && !visited[neighbor]) {
                visited[neighbor] = true;
                dfs(adj, visited, neighbor);
            }
        }
    }
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size(), provinces = 0;
        vector<bool> visited(n, false);
        for (int i = 0; i < n; ++i) {
            if (!visited[i]) {
                visited[i] = true;
                dfs(isConnected, visited, i);
                provinces++;
            }
        }
        return provinces;
    }
};`,
      java: `class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length, provinces = 0;
        boolean[] visited = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                visited[i] = true;
                dfs(isConnected, visited, i);
                provinces++;
            }
        }
        return provinces;
    }
    private void dfs(int[][] adj, boolean[] visited, int node) {
        for (int neighbor = 0; neighbor < adj.length; neighbor++) {
            if (adj[node][neighbor] == 1 && !visited[neighbor]) {
                visited[neighbor] = true;
                dfs(adj, visited, neighbor);
            }
        }
    }
}`,
      explanation: 'This is equivalent to finding the number of connected components in an undirected graph represented by an adjacency matrix. Traverse the nodes using DFS and increment the count for each component found. Time complexity: O(n^2), Space complexity: O(n).'
    }
  },
  {
    id: 'lc-886',
    slug: 'possible-bipartition',
    title: 'Possible Bipartition',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'DFS',
    description: 'We want to split a group of `n` people into two groups of any size. Each person may dislike some other people, and they should not go into the same group. Given the integer `n` and the array `dislikes`, return `true` if it is possible to split them.',
    constraints: ['1 <= n <= 2000', '0 <= dislikes.length <= 10^4', 'dislikes[i].length == 2'],
    solutions: {
      python: `class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        adj = [[] for _ in range(n + 1)]
        for u, v in dislikes:
            adj[u].append(v)
            adj[v].append(u)
        color = {}
        for node in range(1, n + 1):
            if node not in color:
                stack = [node]
                color[node] = 0
                while stack:
                    curr = stack.pop()
                    for neighbor in adj[curr]:
                        if neighbor not in color:
                            color[neighbor] = 1 - color[curr]
                            stack.append(neighbor)
                        elif color[neighbor] == color[curr]:
                            return False
        return True`,
      cpp: `class Solution {
public:
    bool possibleBipartition(int n, vector<vector<int>>& dislikes) {
        vector<vector<int>> adj(n + 1);
        for (const auto& d : dislikes) {
            adj[d[0]].push_back(d[1]);
            adj[d[1]].push_back(d[0]);
        }
        vector<int> color(n + 1, -1);
        for (int i = 1; i <= n; ++i) {
            if (color[i] == -1) {
                queue<int> q;
                q.push(i);
                color[i] = 0;
                while (!q.empty()) {
                    int curr = q.front(); q.pop();
                    for (int neighbor : adj[curr]) {
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
    public boolean possibleBipartition(int n, int[][] dislikes) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] d : dislikes) {
            adj.get(d[0]).add(d[1]);
            adj.get(d[1]).add(d[0]);
        }
        int[] color = new int[n + 1];
        Arrays.fill(color, -1);
        for (int i = 1; i <= n; i++) {
            if (color[i] == -1) {
                Queue<Integer> q = new LinkedList<>();
                q.add(i);
                color[i] = 0;
                while (!q.isEmpty()) {
                    int curr = q.poll();
                    for (int neighbor : adj.get(curr)) {
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
      explanation: 'Convert the dislikes relationships into a directed graph. The problem is equivalent to determining if the graph is bipartite. Use BFS/DFS to color the graph. If an adjacent vertex has the same color, bipartition is impossible. Time complexity: O(V + E), Space complexity: O(V + E).'
    }
  },
  {
    id: 'lc-286',
    slug: 'walls-and-gates',
    title: 'Walls and Gates',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'graphs',
    topic: 'BFS',
    description: 'You are given a `m x n` 2D grid initialized with these three possible values:\n- `-1` representing a wall or an obstacle.\n- `0` representing a gate.\n- `INF` representing an empty room.\n\nFill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with `INF`.',
    constraints: ['m == rooms.length', 'n == rooms[i].length', '1 <= m, n <= 250', 'rooms[i][j] is -1, 0, or INF.'],
    solutions: {
      python: `from collections import deque
class Solution:
    def wallsAndGates(self, rooms: List[List[int]]) -> None:
        if not rooms: return
        m, n = len(rooms), len(rooms[0])
        q = deque()
        for r in range(m):
            for c in range(n):
                if rooms[r][c] == 0:
                    q.append((r, c))
        while q:
            r, c = q.popleft()
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r+dr, c+dc
                if 0 <= nr < m and 0 <= nc < n and rooms[nr][nc] == 2147483647:
                    rooms[nr][nc] = rooms[r][c] + 1
                    q.append((nr, nc))`,
      cpp: `class Solution {
public:
    void wallsAndGates(vector<vector<int>>& rooms) {
        if (rooms.empty()) return;
        int m = rooms.size(), n = rooms[0].size();
        queue<pair<int, int>> q;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (rooms[r][c] == 0) q.push({r, c});
            }
        }
        int dirs[] = {0,1,0,-1,0};
        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for (int d = 0; d < 4; ++d) {
                int nr = r + dirs[d], nc = c + dirs[d+1];
                if (nr >= 0 && nc >= 0 && nr < m && nc < n && rooms[nr][nc] == 2147483647) {
                    rooms[nr][nc] = rooms[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
    }
};`,
      java: `class Solution {
        public void wallsAndGates(int[][] rooms) {
            if (rooms.length == 0) return;
            int m = rooms.length, n = rooms[0].length;
            Queue<int[]> q = new LinkedList<>();
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    if (rooms[r][c] == 0) q.add(new int[]{r, c});
                }
            }
            int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
            while (!q.isEmpty()) {
                int[] cell = q.poll();
                int r = cell[0], c = cell[1];
                for (int[] d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nc >= 0 && nr < m && nc < n && rooms[nr][nc] == 2147483647) {
                        rooms[nr][nc] = rooms[r][c] + 1;
                        q.add(new int[]{nr, nc});
                    }
                }
            }
        }
    }`,
      explanation: 'Multi-source BFS. Enqueue all gate locations (0). Perform level-by-level BFS from all gates simultaneously. When visiting an empty room (INF), update its distance value to current_distance + 1 and enqueue it. Time complexity: O(m * n), Space complexity: O(m * n).'
    }
  },
  {
    id: 'cf-977F',
    slug: 'cf-977f',
    title: 'Consecutive Subsequence',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Dynamic Programming',
    description: 'Given an array of `n` integers. Find the longest consecutive subsequence of elements (not necessarily contiguous in the original array) such that each next element is exactly 1 larger than the previous.',
    constraints: ['1 <= n <= 2 * 10^5', '1 <= a_i <= 10^9'],
    solutions: {
      python: `n = int(input())
a = list(map(int, input().split()))
dp = {}
max_len = 0
last_val = 0
for x in a:
    dp[x] = dp.get(x - 1, 0) + 1
    if dp[x] > max_len:
        max_len = dp[x]
        last_val = x
res = []
curr = last_val - max_len + 1
for i in range(n):
    if a[i] == curr:
        res.append(i + 1)
        curr += 1
print(max_len)
print(*res)`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int n;
    if (cin >> n) {
        vector<int> a(n);
        for (int i = 0; i < n; ++i) cin >> a[i];
        map<int, int> dp;
        int max_len = 0, last_val = 0;
        for (int x : a) {
            dp[x] = dp[x - 1] + 1;
            if (dp[x] > max_len) { max_len = dp[x]; last_val = x; }
        }
        cout << max_len << "\\n";
        vector<int> res;
        int curr = last_val - max_len + 1;
        for (int i = 0; i < n; ++i) {
            if (a[i] == curr) { res.push_back(i + 1); curr++; }
        }
        for (int i = 0; i < res.size(); i++) cout << res[i] << (i == res.size() - 1 ? "" : " ");
    }
}`,
      java: `import java.util.*;
import java.io.*;
public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        int[] a = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(st.nextToken());
        Map<Integer, Integer> dp = new HashMap<>();
        int maxLen = 0, lastVal = 0;
        for (int x : a) {
            int len = dp.getOrDefault(x - 1, 0) + 1;
            dp.put(x, len);
            if (len > maxLen) {
                maxLen = len;
                lastVal = x;
            }
        }
        System.out.println(maxLen);
        int curr = lastVal - maxLen + 1;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (a[i] == curr) {
                sb.append(i + 1).append(" ");
                curr++;
            }
        }
        System.out.println(sb.toString().trim());
    }
}`,
      explanation: 'Use dynamic programming with a map. dp[x] represents the length of the longest consecutive subsequence ending with value x. Transition: dp[x] = dp[x-1] + 1. Keep track of the maximum length and the ending value, then reconstruct indices. Time complexity: O(n log n), Space complexity: O(n).'
    }
  },
  {
    id: 'cf-1328D',
    slug: 'cf-1328d',
    title: 'Carousel Coloring',
    difficulty: 'Medium',
    source: 'Codeforces',
    category: 'foundations',
    topic: 'Dynamic Programming',
    description: 'There are `n` figures on a carousel. Figure `i` has type `t_i`. You want to color the figures such that adjacent figures with different types have different colors. Minimize the number of colors used.',
    constraints: ['3 <= n <= 2 * 10^5', '1 <= t_i <= 2 * 10^5'],
    solutions: {
      python: `t = int(input())
for _ in range(t):
    n = int(input())
    a = list(map(int, input().split()))
    if len(set(a)) == 1:
        print(1)
        print(*( [1]*n ))
    elif n % 2 == 0:
        print(2)
        print(*( [1, 2]*(n // 2) ))
    else:
        # Check if there is an adjacent pair of identical elements
        same_pair = -1
        for i in range(n):
            if a[i] == a[(i + 1) % n]:
                same_pair = i
                break
        if same_pair != -1:
            print(2)
            c = []
            curr = 1
            for i in range(n):
                c.append(curr)
                if i != same_pair:
                    curr = 3 - curr
            print(*c)
        else:
            print(3)
            print(*( [1, 2]*(n // 2) + [3] ))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int q; if (cin >> q) {
        while (q--) {
            int n; cin >> n;
            vector<int> a(n);
            bool all_same = true;
            for (int i = 0; i < n; ++i) {
                cin >> a[i];
                if (i > 0 && a[i] != a[0]) all_same = false;
            }
            if (all_same) {
                cout << "1\\n";
                for (int i = 0; i < n; i++) cout << "1" << (i == n - 1 ? "" : " ");
                cout << "\\n";
                continue;
            }
            if (n % 2 == 0) {
                cout << "2\\n";
                for (int i = 0; i < n; i++) cout << (i % 2 == 0 ? "1" : "2") << (i == n - 1 ? "" : " ");
                cout << "\\n";
                continue;
            }
            int same_pair = -1;
            for (int i = 0; i < n; i++) {
                if (a[i] == a[(i + 1) % n]) { same_pair = i; break; }
            }
            if (same_pair != -1) {
                cout << "2\\n";
                int curr = 1;
                for (int i = 0; i < n; i++) {
                    cout << curr << (i == n - 1 ? "" : " ");
                    if (i != same_pair) curr = 3 - curr;
                }
                cout << "\\n";
            } else {
                cout << "3\\n";
                for (int i = 0; i < n - 1; i++) cout << (i % 2 == 0 ? "1" : "2") << " ";
                cout << "3\\n";
            }
        }
    }
}`,
      java: `import java.util.*;
import java.io.*;
public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int q = Integer.parseInt(br.readLine());
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            int n = Integer.parseInt(br.readLine());
            int[] a = new int[n];
            StringTokenizer st = new StringTokenizer(br.readLine());
            boolean allSame = true;
            for (int i = 0; i < n; i++) {
                a[i] = Integer.parseInt(st.nextToken());
                if (i > 0 && a[i] != a[0]) allSame = false;
            }
            if (allSame) {
                sb.append("1\\n");
                for (int i = 0; i < n; i++) sb.append("1").append(i == n - 1 ? "" : " ");
                sb.append("\\n");
                continue;
            }
            if (n % 2 == 0) {
                sb.append("2\\n");
                for (int i = 0; i < n; i++) sb.append(i % 2 == 0 ? "1" : "2").append(i == n - 1 ? "" : " ");
                sb.append("\\n");
                continue;
            }
            int samePair = -1;
            for (int i = 0; i < n; i++) {
                if (a[i] == a[(i + 1) % n]) { samePair = i; break; }
            }
            if (samePair != -1) {
                sb.append("2\\n");
                int curr = 1;
                for (int i = 0; i < n; i++) {
                    sb.append(curr).append(i == n - 1 ? "" : " ");
                    if (i != samePair) curr = 3 - curr;
                }
                sb.append("\\n");
            } else {
                sb.append("3\\n");
                for (int i = 0; i < n - 1; i++) sb.append(i % 2 == 0 ? "1" : "2").append(" ");
                sb.append("3\\n");
            }
        }
        System.out.print(sb);
    }
}`,
      explanation: 'Analyze three cases. Case 1: all types are identical -> 1 color. Case 2: carousel size n is even -> 2 colors (alternating 1 and 2). Case 3: size n is odd. If there is any adjacent pair with identical type, we can break the alternation cycle there and use 2 colors. Otherwise, we must use 3 colors (color the last figure with 3). Time complexity: O(n) per test case, Space complexity: O(n).'
    }
  },
  {
    id: 'lc-122',
    slug: 'best-time-to-buy-and-sell-stock-ii',
    title: 'Best Time to Buy and Sell Stock II',
    difficulty: 'Medium',
    source: 'LeetCode',
    category: 'patterns',
    topic: 'Greedy',
    description: 'You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nOn each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.\n\nFind and return the maximum profit you can achieve.',
    constraints: ['1 <= prices.length <= 3 * 10^4', '0 <= prices[i] <= 10^4'],
    solutions: {
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        profit = 0
        for i in range(1, len(prices)):
            if prices[i] > prices[i - 1]:
                profit += prices[i] - prices[i - 1]
        return profit`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        for (int i = 1; i < prices.size(); ++i) {
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        }
        return profit;
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        }
        return profit;
    }
}`,
      explanation: 'Greedy approach: accumulate all positive daily price differences. If today\'s price is higher than yesterday\'s, we simulate buying yesterday and selling today. Time complexity: O(n), Space complexity: O(1).'
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
