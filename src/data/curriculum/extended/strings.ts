import { CurriculumModule } from '@/types';
import { CATEGORY_IDS } from '../linear';

export const stringsModules: CurriculumModule[] = [
  // 1. KMP STRING MATCHING
  {
    topic: {
      id: 'ext-kmp-string-matching',
      slug: 'kmp-string-matching',
      category_id: CATEGORY_IDS.patterns,
      title: 'KMP String Matching',
      definition: 'The Knuth-Morris-Pratt (KMP) algorithm finds all occurrences of a pattern inside a text in linear time by precomputing a failure (longest proper prefix that is also a suffix) table that lets the search skip re-examining characters after a mismatch.',
      importance: 'KMP guarantees O(n + m) matching with no worst-case blowup, forming the basis for many text-processing tools, and its prefix-function is reused in periodicity, compression, and automaton constructions.',
      prerequisites: ['String', 'Array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(n + m)',
      time_complexity_average: 'O(n + m)',
      time_complexity_worst: 'O(n + m)',
      space_complexity: 'O(m)',
      display_order: 700,
    },
    sections: [
      {
        id: 'sec-kmp-string-matching-1',
        topic_id: 'ext-kmp-string-matching',
        title: 'Concept & Intuition',
        content: `The naive substring search restarts the pattern from scratch after every mismatch, throwing away everything it just learned about the text. KMP's insight is that a mismatch already tells us which characters matched, so we never need to re-read them.

Consider searching for the pattern \`ABABC\` in a text. If we matched \`ABAB\` and then mismatch, the naive method backs the text pointer up. KMP instead asks: **what is the longest prefix of the pattern that is also a suffix of what we just matched?** That prefix (\`AB\`) is already aligned, so we resume comparing from there.

> [!NOTE]
> The text pointer in KMP **never moves backward**. That single property is what turns an $O(nm)$ scan into an $O(n + m)$ one.`,
        display_order: 1,
      },
      {
        id: 'sec-kmp-string-matching-2',
        topic_id: 'ext-kmp-string-matching',
        title: 'How It Works',
        content: `KMP runs in two phases.

**1. Build the failure function** $\\pi$ for the pattern, where $\\pi[i]$ is the length of the longest proper prefix of \`pattern[0..i]\` that is also a suffix. This is computed in $O(m)$ using the pattern against itself.

**2. Scan the text** with two pointers. On a match, advance both. On a mismatch at pattern index $j > 0$, set $j = \\pi[j-1]$ instead of resetting to $0$; only when $j = 0$ do we advance the text pointer.

When $j$ reaches $m$, a full match ends at the current text position; we then continue by setting $j = \\pi[m-1]$ to find overlapping occurrences.`,
        display_order: 2,
      },
      {
        id: 'sec-kmp-string-matching-3',
        topic_id: 'ext-kmp-string-matching',
        title: 'Complexity Analysis',
        content: `**Preprocessing** the failure function is $O(m)$. Although it has an inner \`while\`, the value of $j$ increases at most once per iteration and never drops below zero, so the total decreases are bounded by the total increases — an amortized $O(m)$.

**Searching** is $O(n)$ by the same amortized argument: each text character is consumed once, and fallbacks are bounded by prior advances.

- Time: $O(n + m)$ in all cases.
- Space: $O(m)$ for the failure table.

This makes KMP strictly better than the naive $O(nm)$ worst case (e.g. text \`AAAA...AB\`, pattern \`AAAB\`).`,
        display_order: 3,
      },
      {
        id: 'sec-kmp-string-matching-4',
        topic_id: 'ext-kmp-string-matching',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The most common bug is confusing "longest prefix-suffix" with "any prefix-suffix." $\\pi[i]$ must be a **proper** prefix (shorter than the substring itself), otherwise the fallback never terminates.

Common mistakes:
- Off-by-one errors: $\\pi$ is indexed by the end position, and the fallback uses $\\pi[j-1]$, not $\\pi[j]$.
- Forgetting to reset $j$ via $\\pi$ after a full match, which misses overlapping occurrences.

Use cases: intrusion-detection signature matching, DNA sub-sequence search, plagiarism detection, and any streaming scenario where you cannot rewind the input.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-kmp-string-matching-py',
        topic_id: 'ext-kmp-string-matching',
        language: 'python',
        is_optimized: true,
        code: `def build_failure(pattern):
    pi = [0] * len(pattern)
    k = 0
    for i in range(1, len(pattern)):
        while k > 0 and pattern[i] != pattern[k]:
            k = pi[k - 1]
        if pattern[i] == pattern[k]:
            k += 1
        pi[i] = k
    return pi

def kmp_search(text, pattern):
    if not pattern:
        return []
    pi = build_failure(pattern)
    result, j = [], 0
    for i, ch in enumerate(text):
        while j > 0 and ch != pattern[j]:
            j = pi[j - 1]
        if ch == pattern[j]:
            j += 1
        if j == len(pattern):
            result.append(i - j + 1)
            j = pi[j - 1]
    return result`,
        explanation: 'Builds the failure function then scans once; returns all start indices of the pattern.',
      },
      {
        id: 'snip-kmp-string-matching-js',
        topic_id: 'ext-kmp-string-matching',
        language: 'javascript',
        is_optimized: true,
        code: `function buildFailure(pattern) {
  const pi = new Array(pattern.length).fill(0);
  let k = 0;
  for (let i = 1; i < pattern.length; i++) {
    while (k > 0 && pattern[i] !== pattern[k]) k = pi[k - 1];
    if (pattern[i] === pattern[k]) k++;
    pi[i] = k;
  }
  return pi;
}

function kmpSearch(text, pattern) {
  if (pattern.length === 0) return [];
  const pi = buildFailure(pattern);
  const result = [];
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text[i] !== pattern[j]) j = pi[j - 1];
    if (text[i] === pattern[j]) j++;
    if (j === pattern.length) {
      result.push(i - j + 1);
      j = pi[j - 1];
    }
  }
  return result;
}`,
        explanation: 'Two-pointer scan where the text index never retreats, giving linear time.',
      },
      {
        id: 'snip-kmp-string-matching-cpp',
        topic_id: 'ext-kmp-string-matching',
        language: 'cpp',
        is_optimized: true,
        code: `#include <string>
#include <vector>
using namespace std;

vector<int> buildFailure(const string& p) {
    vector<int> pi(p.size(), 0);
    int k = 0;
    for (size_t i = 1; i < p.size(); ++i) {
        while (k > 0 && p[i] != p[k]) k = pi[k - 1];
        if (p[i] == p[k]) ++k;
        pi[i] = k;
    }
    return pi;
}

vector<int> kmpSearch(const string& text, const string& pattern) {
    vector<int> result;
    if (pattern.empty()) return result;
    vector<int> pi = buildFailure(pattern);
    int j = 0;
    for (size_t i = 0; i < text.size(); ++i) {
        while (j > 0 && text[i] != pattern[j]) j = pi[j - 1];
        if (text[i] == pattern[j]) ++j;
        if (j == (int)pattern.size()) {
            result.push_back(i - j + 1);
            j = pi[j - 1];
        }
    }
    return result;
}`,
        explanation: 'Standard KMP with an amortized-linear prefix function and search loop.',
      },
      {
        id: 'snip-kmp-string-matching-java',
        topic_id: 'ext-kmp-string-matching',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class KMP {
    static int[] buildFailure(String p) {
        int[] pi = new int[p.length()];
        int k = 0;
        for (int i = 1; i < p.length(); i++) {
            while (k > 0 && p.charAt(i) != p.charAt(k)) k = pi[k - 1];
            if (p.charAt(i) == p.charAt(k)) k++;
            pi[i] = k;
        }
        return pi;
    }

    static List<Integer> search(String text, String pattern) {
        List<Integer> result = new ArrayList<>();
        if (pattern.isEmpty()) return result;
        int[] pi = buildFailure(pattern);
        int j = 0;
        for (int i = 0; i < text.length(); i++) {
            while (j > 0 && text.charAt(i) != pattern.charAt(j)) j = pi[j - 1];
            if (text.charAt(i) == pattern.charAt(j)) j++;
            if (j == pattern.length()) {
                result.add(i - j + 1);
                j = pi[j - 1];
            }
        }
        return result;
    }
}`,
        explanation: 'Java port returning a list of all match start indices in linear time.',
      },
    ],
    quizId: 'quiz-ext-kmp-string-matching',
    quizTitle: 'KMP String Matching Quiz',
    quizDescription: 'Test your understanding of the prefix function and linear-time matching.',
    questions: [
      {
        id: 'q-kmp-string-matching-1',
        quiz_id: 'quiz-ext-kmp-string-matching',
        question_text: 'What does the failure function value pi[i] represent?',
        question_type: 'MCQ',
        options: [
          'The number of times the pattern occurs in the text',
          'The length of the longest proper prefix of pattern[0..i] that is also a suffix',
          'The index where the first mismatch occurs',
          'The total length of the pattern',
        ],
        correct_option_index: 1,
        explanation: 'pi[i] is the length of the longest proper prefix ending at i that is also a suffix, enabling smart fallbacks.',
      },
      {
        id: 'q-kmp-string-matching-2',
        quiz_id: 'quiz-ext-kmp-string-matching',
        question_text: 'In KMP, the text pointer can move backward after a mismatch.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'The text pointer never retreats; only the pattern pointer falls back via the failure function, which is why the scan is linear.',
      },
      {
        id: 'q-kmp-string-matching-3',
        quiz_id: 'quiz-ext-kmp-string-matching',
        question_text: 'What is the overall time complexity of KMP for a text of length n and pattern of length m?',
        question_type: 'COMPLEXITY',
        options: ['O(n * m)', 'O(n log m)', 'O(n + m)', 'O(m^2)'],
        correct_option_index: 2,
        explanation: 'Preprocessing is O(m) and searching is O(n), both amortized, giving O(n + m) total.',
      },
    ],
  },
  // 2. RABIN-KARP STRING MATCHING
  {
    topic: {
      id: 'ext-rabin-karp-string-matching',
      slug: 'rabin-karp-string-matching',
      category_id: CATEGORY_IDS.patterns,
      title: 'Rabin-Karp String Matching',
      definition: 'Rabin-Karp searches for a pattern by comparing hash values of the pattern and each text window, using a rolling hash that updates in O(1) as the window slides, and confirming candidate matches with a direct character comparison.',
      importance: 'The rolling-hash idea generalizes far beyond single-pattern search: it powers multi-pattern detection, plagiarism and duplicate-block detection (e.g. rsync/Rabin fingerprinting), and 2D pattern matching.',
      prerequisites: ['String', 'Hashing', 'Modular Arithmetic'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(n + m)',
      time_complexity_average: 'O(n + m)',
      time_complexity_worst: 'O(n * m)',
      space_complexity: 'O(1)',
      display_order: 701,
    },
    sections: [
      {
        id: 'sec-rabin-karp-string-matching-1',
        topic_id: 'ext-rabin-karp-string-matching',
        title: 'Concept & Intuition',
        content: `Comparing a pattern against every text window character-by-character is wasteful. Rabin-Karp compresses each window into a single number — its **hash** — and compares numbers instead of strings. If two hashes differ, the windows cannot be equal, so we skip them instantly.

The trick is the **rolling hash**: when the window slides one character right, we do not recompute the hash from scratch. We subtract the contribution of the outgoing character and add the incoming one, treating the window as a base-$b$ number modulo a large prime.

> [!NOTE]
> Equal hashes do not guarantee equal strings (a "collision"), so every hash match must be verified by a real comparison.`,
        display_order: 1,
      },
      {
        id: 'sec-rabin-karp-string-matching-2',
        topic_id: 'ext-rabin-karp-string-matching',
        title: 'How It Works',
        content: `Treat a string as a number in base $b$ modulo a prime $q$. The hash of a window is:
$$h = (s_0 b^{m-1} + s_1 b^{m-2} + \\dots + s_{m-1}) \\bmod q$$

To roll from window starting at $i$ to $i+1$:
$$h' = \\big((h - s_i b^{m-1}) \\cdot b + s_{i+m}\\big) \\bmod q$$

Steps:
1. Precompute the pattern hash and the first window hash.
2. Slide across the text; whenever the window hash equals the pattern hash, verify the characters directly.
3. Report the index on a confirmed match.

Choosing a large prime $q$ and a base $b$ larger than the alphabet keeps collisions rare.`,
        display_order: 2,
      },
      {
        id: 'sec-rabin-karp-string-matching-3',
        topic_id: 'ext-rabin-karp-string-matching',
        title: 'Complexity Analysis',
        content: `**Average / expected** time is $O(n + m)$: computing the initial hashes is $O(m)$, and each of the $n - m + 1$ rolls is $O(1)$, with verifications being rare when the hash is good.

**Worst case** is $O(n \\cdot m)$ — for example, an adversarial input causing a hash collision at every window forces a full comparison each time. Using a large random prime makes this astronomically unlikely for non-adversarial data.

- Time: $O(n + m)$ expected, $O(n \\cdot m)$ worst.
- Space: $O(1)$ beyond the input (a few integer accumulators).`,
        display_order: 3,
      },
      {
        id: 'sec-rabin-karp-string-matching-4',
        topic_id: 'ext-rabin-karp-string-matching',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Never skip the direct verification after a hash match. Relying on the hash alone yields false positives on collisions.

Common mistakes:
- Integer overflow: always take the modulus during accumulation, not just at the end.
- A negative intermediate value after subtraction — add $q$ before taking the modulus in languages with sign-preserving \`%\`.
- Using a tiny prime or a base smaller than the alphabet, which inflates the collision rate.

Use cases: multi-pattern search (share one text hash across many pattern hashes), detecting duplicated file blocks, and 2D image/grid pattern matching.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-rabin-karp-string-matching-py',
        topic_id: 'ext-rabin-karp-string-matching',
        language: 'python',
        is_optimized: true,
        code: `def rabin_karp(text, pattern, base=256, prime=1_000_000_007):
    n, m = len(text), len(pattern)
    if m == 0 or m > n:
        return []
    high = pow(base, m - 1, prime)
    p_hash = t_hash = 0
    for i in range(m):
        p_hash = (p_hash * base + ord(pattern[i])) % prime
        t_hash = (t_hash * base + ord(text[i])) % prime
    result = []
    for i in range(n - m + 1):
        if p_hash == t_hash and text[i:i + m] == pattern:
            result.append(i)
        if i < n - m:
            t_hash = ((t_hash - ord(text[i]) * high) * base + ord(text[i + m])) % prime
    return result`,
        explanation: 'Rolling hash over the text; Python handles big ints so the modulus keeps values bounded and verification prevents false positives.',
      },
      {
        id: 'snip-rabin-karp-string-matching-js',
        topic_id: 'ext-rabin-karp-string-matching',
        language: 'javascript',
        is_optimized: true,
        code: `function rabinKarp(text, pattern, base = 256, prime = 1000000007) {
  const n = text.length, m = pattern.length;
  if (m === 0 || m > n) return [];
  let high = 1;
  for (let i = 0; i < m - 1; i++) high = (high * base) % prime;
  let pHash = 0, tHash = 0;
  for (let i = 0; i < m; i++) {
    pHash = (pHash * base + pattern.charCodeAt(i)) % prime;
    tHash = (tHash * base + text.charCodeAt(i)) % prime;
  }
  const result = [];
  for (let i = 0; i <= n - m; i++) {
    if (pHash === tHash && text.substr(i, m) === pattern) result.push(i);
    if (i < n - m) {
      tHash = ((tHash - text.charCodeAt(i) * high % prime + prime) * base + text.charCodeAt(i + m)) % prime;
    }
  }
  return result;
}`,
        explanation: 'Uses charCodeAt for numeric values; the (+ prime) guard avoids negative modulo results in JavaScript.',
      },
      {
        id: 'snip-rabin-karp-string-matching-cpp',
        topic_id: 'ext-rabin-karp-string-matching',
        language: 'cpp',
        is_optimized: true,
        code: `#include <string>
#include <vector>
using namespace std;

vector<int> rabinKarp(const string& text, const string& pattern) {
    const long long base = 256, prime = 1000000007LL;
    int n = text.size(), m = pattern.size();
    vector<int> result;
    if (m == 0 || m > n) return result;
    long long high = 1;
    for (int i = 0; i < m - 1; ++i) high = (high * base) % prime;
    long long pHash = 0, tHash = 0;
    for (int i = 0; i < m; ++i) {
        pHash = (pHash * base + pattern[i]) % prime;
        tHash = (tHash * base + text[i]) % prime;
    }
    for (int i = 0; i <= n - m; ++i) {
        if (pHash == tHash && text.compare(i, m, pattern) == 0)
            result.push_back(i);
        if (i < n - m) {
            tHash = ((tHash - text[i] * high % prime + prime) * base + text[i + m]) % prime;
        }
    }
    return result;
}`,
        explanation: 'long long arithmetic with a large prime; the +prime term keeps the rolling hash non-negative.',
      },
      {
        id: 'snip-rabin-karp-string-matching-java',
        topic_id: 'ext-rabin-karp-string-matching',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class RabinKarp {
    static List<Integer> search(String text, String pattern) {
        final long base = 256, prime = 1000000007L;
        int n = text.length(), m = pattern.length();
        List<Integer> result = new ArrayList<>();
        if (m == 0 || m > n) return result;
        long high = 1;
        for (int i = 0; i < m - 1; i++) high = (high * base) % prime;
        long pHash = 0, tHash = 0;
        for (int i = 0; i < m; i++) {
            pHash = (pHash * base + pattern.charAt(i)) % prime;
            tHash = (tHash * base + text.charAt(i)) % prime;
        }
        for (int i = 0; i <= n - m; i++) {
            if (pHash == tHash && text.regionMatches(i, pattern, 0, m))
                result.add(i);
            if (i < n - m) {
                tHash = ((tHash - text.charAt(i) * high % prime + prime) * base + text.charAt(i + m)) % prime;
            }
        }
        return result;
    }
}`,
        explanation: 'Uses long to avoid overflow and regionMatches for the confirming comparison.',
      },
    ],
    quizId: 'quiz-ext-rabin-karp-string-matching',
    quizTitle: 'Rabin-Karp String Matching Quiz',
    quizDescription: 'Check your grasp of rolling hashes, collisions, and complexity trade-offs.',
    questions: [
      {
        id: 'q-rabin-karp-string-matching-1',
        quiz_id: 'quiz-ext-rabin-karp-string-matching',
        question_text: 'Why must a hash match be verified with a direct character comparison?',
        question_type: 'MCQ',
        options: [
          'Because hashing is slower than comparison',
          'Because different strings can share the same hash (a collision)',
          'Because the pattern hash changes as the window slides',
          'Because the modulus makes hashes negative',
        ],
        correct_option_index: 1,
        explanation: 'Hash equality is necessary but not sufficient for string equality, so collisions must be filtered out by comparison.',
      },
      {
        id: 'q-rabin-karp-string-matching-2',
        quiz_id: 'quiz-ext-rabin-karp-string-matching',
        question_text: 'The rolling hash lets the algorithm update a window hash in constant time.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Subtracting the outgoing character and adding the incoming one is O(1), which is the core efficiency of Rabin-Karp.',
      },
      {
        id: 'q-rabin-karp-string-matching-3',
        quiz_id: 'quiz-ext-rabin-karp-string-matching',
        question_text: 'What is the worst-case time complexity of Rabin-Karp?',
        question_type: 'COMPLEXITY',
        options: ['O(n + m)', 'O(n log m)', 'O(n * m)', 'O(m^2)'],
        correct_option_index: 2,
        explanation: 'When every window collides with the pattern hash, each requires a full O(m) comparison, degrading to O(n * m).',
      },
    ],
  },
  // 3. Z-ALGORITHM
  {
    topic: {
      id: 'ext-z-algorithm',
      slug: 'z-algorithm',
      category_id: CATEGORY_IDS.patterns,
      title: 'Z-Algorithm',
      definition: 'The Z-algorithm computes, for every position i of a string, the length Z[i] of the longest substring starting at i that matches a prefix of the string, in linear time using a maintained [L, R] "Z-box" of the rightmost match.',
      importance: 'The Z-array is a compact, prefix-oriented alternative to the KMP failure function that solves pattern matching, string periodicity, and counting distinct substrings, all in linear time.',
      prerequisites: ['String', 'Array'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(n)',
      time_complexity_average: 'O(n)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(n)',
      display_order: 702,
    },
    sections: [
      {
        id: 'sec-z-algorithm-1',
        topic_id: 'ext-z-algorithm',
        title: 'Concept & Intuition',
        content: `The Z-array of a string $s$ stores, at each index $i$, how far the substring starting at $i$ agrees with the prefix of $s$. So $Z[i]$ is the length of the longest common prefix of $s$ and $s[i..]$.

The naive way — comparing the prefix against every suffix — is $O(n^2)$. The Z-algorithm avoids redundant comparisons by **reusing information from previous matches**: if we are inside a region that already matched the prefix, the Z-value there mirrors a Z-value we computed earlier.

> [!NOTE]
> To do pattern matching, build the Z-array of \`pattern + separator + text\`. Any position where $Z[i] = |pattern|$ marks an occurrence.`,
        display_order: 1,
      },
      {
        id: 'sec-z-algorithm-2',
        topic_id: 'ext-z-algorithm',
        title: 'How It Works',
        content: `We maintain a window $[L, R]$ — the **Z-box** — representing the rightmost segment that matches a prefix of $s$. For each $i$:

1. If $i > R$, there is no useful history; compare directly from $i$ against the prefix and set $[L, R]$.
2. If $i \\le R$, let $k = i - L$. The value $Z[k]$ is a mirror. If $Z[k] < R - i + 1$, then $Z[i] = Z[k]$ (fully inside the box). Otherwise, start comparing from $R + 1$ and extend the box.

Because $R$ only moves forward and each character comparison either fails once or extends $R$, the total work is linear.`,
        display_order: 2,
      },
      {
        id: 'sec-z-algorithm-3',
        topic_id: 'ext-z-algorithm',
        title: 'Complexity Analysis',
        content: `Every explicit character comparison either **extends** $R$ (which can happen at most $n$ times total, since $R$ never decreases) or is a single mismatch that stops the current step. Steps that fall entirely inside the Z-box do $O(1)$ work by copying the mirror value.

- Time: $O(n)$ in all cases.
- Space: $O(n)$ for the Z-array.

For pattern matching on \`pattern + '#' + text\`, this is $O(n + m)$ time and space — matching KMP's guarantee with arguably simpler bookkeeping.`,
        display_order: 3,
      },
      {
        id: 'sec-z-algorithm-4',
        topic_id: 'ext-z-algorithm',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The separator between pattern and text must be a character that appears in **neither** string, otherwise a match can spill across the boundary and produce false positives.

Common mistakes:
- Setting $Z[0]$ to something other than $0$ (by convention it is left as $0$ or the string length; keep it consistent and never use it as a match).
- Forgetting to update $[L, R]$ only when the new match extends beyond the current $R$.

Use cases: substring search, finding all border/period lengths, string compression, and counting distinct substrings when combined with suffix structures.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-z-algorithm-py',
        topic_id: 'ext-z-algorithm',
        language: 'python',
        is_optimized: true,
        code: `def z_function(s):
    n = len(s)
    z = [0] * n
    l = r = 0
    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > r:
            l, r = i, i + z[i]
    return z

def z_search(text, pattern, sep='\\x00'):
    combined = pattern + sep + text
    z = z_function(combined)
    m = len(pattern)
    return [i - m - 1 for i in range(m + 1, len(combined)) if z[i] == m]`,
        explanation: 'Standard Z-array using the [l, r] box; z_search maps Z-values equal to the pattern length back to text indices.',
      },
      {
        id: 'snip-z-algorithm-js',
        topic_id: 'ext-z-algorithm',
        language: 'javascript',
        is_optimized: true,
        code: `function zFunction(s) {
  const n = s.length;
  const z = new Array(n).fill(0);
  let l = 0, r = 0;
  for (let i = 1; i < n; i++) {
    if (i < r) z[i] = Math.min(r - i, z[i - l]);
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
    if (i + z[i] > r) { l = i; r = i + z[i]; }
  }
  return z;
}

function zSearch(text, pattern, sep = '\\u0000') {
  const combined = pattern + sep + text;
  const z = zFunction(combined);
  const m = pattern.length;
  const result = [];
  for (let i = m + 1; i < combined.length; i++) {
    if (z[i] === m) result.push(i - m - 1);
  }
  return result;
}`,
        explanation: 'JavaScript Z-function with an explicit Z-box; matches are positions where the Z-value equals the pattern length.',
      },
      {
        id: 'snip-z-algorithm-cpp',
        topic_id: 'ext-z-algorithm',
        language: 'cpp',
        is_optimized: true,
        code: `#include <string>
#include <vector>
using namespace std;

vector<int> zFunction(const string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    int l = 0, r = 0;
    for (int i = 1; i < n; ++i) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) ++z[i];
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}

vector<int> zSearch(const string& text, const string& pattern) {
    string combined = pattern + '\\x01' + text;
    vector<int> z = zFunction(combined);
    int m = pattern.size();
    vector<int> result;
    for (int i = m + 1; i < (int)combined.size(); ++i)
        if (z[i] == m) result.push_back(i - m - 1);
    return result;
}`,
        explanation: 'C++ Z-function; uses a control character separator unlikely to occur in normal text.',
      },
      {
        id: 'snip-z-algorithm-java',
        topic_id: 'ext-z-algorithm',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class ZAlgorithm {
    static int[] zFunction(String s) {
        int n = s.length();
        int[] z = new int[n];
        int l = 0, r = 0;
        for (int i = 1; i < n; i++) {
            if (i < r) z[i] = Math.min(r - i, z[i - l]);
            while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) z[i]++;
            if (i + z[i] > r) { l = i; r = i + z[i]; }
        }
        return z;
    }

    static List<Integer> search(String text, String pattern) {
        String combined = pattern + '\\u0001' + text;
        int[] z = zFunction(combined);
        int m = pattern.length();
        List<Integer> result = new ArrayList<>();
        for (int i = m + 1; i < combined.length(); i++)
            if (z[i] == m) result.add(i - m - 1);
        return result;
    }
}`,
        explanation: 'Java Z-function returning all match start indices in the original text.',
      },
    ],
    quizId: 'quiz-ext-z-algorithm',
    quizTitle: 'Z-Algorithm Quiz',
    quizDescription: 'Assess your understanding of the Z-array, the Z-box, and prefix matching.',
    questions: [
      {
        id: 'q-z-algorithm-1',
        quiz_id: 'quiz-ext-z-algorithm',
        question_text: 'What does Z[i] represent for a string s?',
        question_type: 'MCQ',
        options: [
          'The number of times s[i] appears in s',
          'The length of the longest substring starting at i that matches a prefix of s',
          'The index of the next occurrence of s[i]',
          'The hash of the substring starting at i',
        ],
        correct_option_index: 1,
        explanation: 'Z[i] is the length of the longest common prefix between s and the suffix starting at position i.',
      },
      {
        id: 'q-z-algorithm-2',
        quiz_id: 'quiz-ext-z-algorithm',
        question_text: 'The right boundary R of the Z-box never decreases as i advances.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'R only moves forward, which bounds the total number of character comparisons and gives linear time.',
      },
      {
        id: 'q-z-algorithm-3',
        quiz_id: 'quiz-ext-z-algorithm',
        question_text: 'What is the time complexity of computing the Z-array for a string of length n?',
        question_type: 'COMPLEXITY',
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(sqrt(n))'],
        correct_option_index: 2,
        explanation: 'Amortized analysis of the advancing Z-box makes the whole computation O(n).',
      },
    ],
  },
  // 4. AHO-CORASICK AUTOMATON
  {
    topic: {
      id: 'ext-aho-corasick-automaton',
      slug: 'aho-corasick-automaton',
      category_id: CATEGORY_IDS.patterns,
      title: 'Aho-Corasick Automaton',
      definition: 'Aho-Corasick builds a finite-state automaton from a set of patterns: a trie augmented with failure (suffix) links, so that a single pass over the text finds all occurrences of all patterns simultaneously.',
      importance: 'It is the standard algorithm for multi-pattern matching, underpinning virus scanners, network intrusion detection (Snort), and dictionary-based tokenizers where thousands of keywords must be matched in one scan.',
      prerequisites: ['String', 'Trie', 'KMP String Matching', 'Queue'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(n + m + z)',
      time_complexity_average: 'O(n + m + z)',
      time_complexity_worst: 'O(n + m + z)',
      space_complexity: 'O(m * σ)',
      display_order: 703,
    },
    sections: [
      {
        id: 'sec-aho-corasick-automaton-1',
        topic_id: 'ext-aho-corasick-automaton',
        title: 'Concept & Intuition',
        content: `Searching for many patterns by running KMP once per pattern costs $O(k \\cdot n)$ for $k$ patterns. Aho-Corasick collapses all patterns into one structure so the text is read **exactly once**.

Start with a **trie** of all patterns: shared prefixes share nodes. Then add **failure links**, the multi-pattern analogue of KMP's failure function: when a character mismatches, a failure link jumps to the longest proper suffix of the current match that is still a prefix of some pattern — no need to rewind the text.

> [!NOTE]
> Aho-Corasick generalizes KMP: with a single pattern, the automaton is just the pattern's trie plus its failure function.`,
        display_order: 1,
      },
      {
        id: 'sec-aho-corasick-automaton-2',
        topic_id: 'ext-aho-corasick-automaton',
        title: 'How It Works',
        content: `Construction has three stages:

1. **Build the trie** by inserting every pattern; mark terminal nodes with the pattern id(s) that end there.
2. **Compute failure links** with a BFS from the root. The root's children fail to the root. For a node $u$ reached by character $c$ from parent $p$, its failure link is the node reached by following $p$'s failure link on $c$.
3. **Compute output/dictionary links** so that reaching one node also reports any patterns that are suffixes of the current match.

**Searching**: walk the text one character at a time, following goto edges and falling back through failure links on a mismatch, collecting outputs at each visited state.`,
        display_order: 2,
      },
      {
        id: 'sec-aho-corasick-automaton-3',
        topic_id: 'ext-aho-corasick-automaton',
        title: 'Complexity Analysis',
        content: `Let $m$ be the total length of all patterns, $n$ the text length, $\\sigma$ the alphabet size, and $z$ the number of reported matches.

- **Construction**: $O(m \\cdot \\sigma)$ time with array-indexed children (or $O(m)$ with hash-map children), plus $O(m)$ for the BFS failure links.
- **Searching**: $O(n + z)$ — each character advances the automaton in amortized $O(1)$, and $z$ accounts for emitting every match.

Overall $O(n + m + z)$. Space is $O(m \\cdot \\sigma)$ for the transition table, or $O(m)$ with sparse child maps.`,
        display_order: 3,
      },
      {
        id: 'sec-aho-corasick-automaton-4',
        topic_id: 'ext-aho-corasick-automaton',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Forgetting the **output links** is the classic bug: a node may end one pattern while a shorter pattern ends at a state reachable via failure links. Without traversing output links you miss overlapping matches like \`he\` inside \`she\`.

Common mistakes:
- Not computing failure links in BFS (level) order, which breaks the recurrence that depends on parents already being processed.
- Using $O(m \\cdot \\sigma)$ dense tables for huge alphabets (e.g. Unicode) instead of sparse maps, exhausting memory.

Use cases: antivirus signature scanning, intrusion detection, spam keyword filtering, and bioinformatics multi-motif search.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-aho-corasick-automaton-py',
        topic_id: 'ext-aho-corasick-automaton',
        language: 'python',
        is_optimized: true,
        code: `from collections import deque

class AhoCorasick:
    def __init__(self, patterns):
        self.goto = [{}]
        self.fail = [0]
        self.out = [[]]
        for p in patterns:
            self._add(p)
        self._build()

    def _add(self, word):
        node = 0
        for ch in word:
            if ch not in self.goto[node]:
                self.goto[node][ch] = len(self.goto)
                self.goto.append({})
                self.fail.append(0)
                self.out.append([])
            node = self.goto[node][ch]
        self.out[node].append(word)

    def _build(self):
        q = deque()
        for ch, nxt in self.goto[0].items():
            self.fail[nxt] = 0
            q.append(nxt)
        while q:
            u = q.popleft()
            for ch, v in self.goto[u].items():
                q.append(v)
                f = self.fail[u]
                while f and ch not in self.goto[f]:
                    f = self.fail[f]
                self.fail[v] = self.goto[f].get(ch, 0) if f or ch in self.goto[0] else 0
                self.out[v] += self.out[self.fail[v]]

    def search(self, text):
        node, result = 0, []
        for i, ch in enumerate(text):
            while node and ch not in self.goto[node]:
                node = self.fail[node]
            node = self.goto[node].get(ch, 0)
            for word in self.out[node]:
                result.append((i - len(word) + 1, word))
        return result`,
        explanation: 'Trie with BFS-built failure links; out[] aggregates dictionary links so every match (including overlaps) is emitted.',
      },
      {
        id: 'snip-aho-corasick-automaton-js',
        topic_id: 'ext-aho-corasick-automaton',
        language: 'javascript',
        is_optimized: true,
        code: `class AhoCorasick {
  constructor(patterns) {
    this.goto = [new Map()];
    this.fail = [0];
    this.out = [[]];
    for (const p of patterns) this.add(p);
    this.build();
  }
  add(word) {
    let node = 0;
    for (const ch of word) {
      if (!this.goto[node].has(ch)) {
        this.goto[node].set(ch, this.goto.length);
        this.goto.push(new Map());
        this.fail.push(0);
        this.out.push([]);
      }
      node = this.goto[node].get(ch);
    }
    this.out[node].push(word);
  }
  build() {
    const q = [];
    for (const [ch, nxt] of this.goto[0]) { this.fail[nxt] = 0; q.push(nxt); }
    while (q.length) {
      const u = q.shift();
      for (const [ch, v] of this.goto[u]) {
        q.push(v);
        let f = this.fail[u];
        while (f && !this.goto[f].has(ch)) f = this.fail[f];
        this.fail[v] = this.goto[f].has(ch) ? this.goto[f].get(ch) : 0;
        this.out[v] = this.out[v].concat(this.out[this.fail[v]]);
      }
    }
  }
  search(text) {
    let node = 0;
    const result = [];
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      while (node && !this.goto[node].has(ch)) node = this.fail[node];
      node = this.goto[node].has(ch) ? this.goto[node].get(ch) : 0;
      for (const word of this.out[node]) result.push([i - word.length + 1, word]);
    }
    return result;
  }
}`,
        explanation: 'Map-based transitions keep memory sparse; BFS assigns failure links level by level and merges output lists.',
      },
      {
        id: 'snip-aho-corasick-automaton-cpp',
        topic_id: 'ext-aho-corasick-automaton',
        language: 'cpp',
        is_optimized: true,
        code: `#include <bits/stdc++.h>
using namespace std;

struct AhoCorasick {
    vector<array<int, 26>> go;
    vector<int> fail;
    vector<vector<int>> out;
    AhoCorasick() { newNode(); }
    int newNode() {
        go.push_back({}); go.back().fill(-1);
        fail.push_back(0); out.push_back({});
        return (int)go.size() - 1;
    }
    void add(const string& w, int id) {
        int node = 0;
        for (char c : w) {
            int x = c - 'a';
            if (go[node][x] == -1) go[node][x] = newNode();
            node = go[node][x];
        }
        out[node].push_back(id);
    }
    void build() {
        queue<int> q;
        for (int c = 0; c < 26; ++c) {
            if (go[0][c] == -1) go[0][c] = 0;
            else { fail[go[0][c]] = 0; q.push(go[0][c]); }
        }
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int c = 0; c < 26; ++c) {
                int v = go[u][c];
                if (v == -1) { go[u][c] = go[fail[u]][c]; continue; }
                fail[v] = go[fail[u]][c];
                out[v].insert(out[v].end(), out[fail[v]].begin(), out[fail[v]].end());
                q.push(v);
            }
        }
    }
    vector<pair<int,int>> search(const string& text) {
        vector<pair<int,int>> res;
        int node = 0;
        for (int i = 0; i < (int)text.size(); ++i) {
            node = go[node][text[i] - 'a'];
            for (int id : out[node]) res.push_back({i, id});
        }
        return res;
    }
};`,
        explanation: 'Uses the automaton (goto-completion) form: transitions are fully filled so search never follows fail links explicitly.',
      },
      {
        id: 'snip-aho-corasick-automaton-java',
        topic_id: 'ext-aho-corasick-automaton',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class AhoCorasick {
    List<Map<Character,Integer>> go = new ArrayList<>();
    List<Integer> fail = new ArrayList<>();
    List<List<String>> out = new ArrayList<>();

    public AhoCorasick(List<String> patterns) {
        newNode();
        for (String p : patterns) add(p);
        build();
    }
    int newNode() {
        go.add(new HashMap<>());
        fail.add(0);
        out.add(new ArrayList<>());
        return go.size() - 1;
    }
    void add(String w) {
        int node = 0;
        for (char c : w.toCharArray()) {
            go.get(node).putIfAbsent(c, go.size());
            if (go.get(node).get(c) == go.size()) newNode();
            node = go.get(node).get(c);
        }
        out.get(node).add(w);
    }
    void build() {
        Queue<Integer> q = new ArrayDeque<>();
        for (int nxt : go.get(0).values()) { fail.set(nxt, 0); q.add(nxt); }
        while (!q.isEmpty()) {
            int u = q.poll();
            for (Map.Entry<Character,Integer> e : go.get(u).entrySet()) {
                char c = e.getKey();
                int v = e.getValue();
                q.add(v);
                int f = fail.get(u);
                while (f != 0 && !go.get(f).containsKey(c)) f = fail.get(f);
                fail.set(v, go.get(f).getOrDefault(c, 0));
                out.get(v).addAll(out.get(fail.get(v)));
            }
        }
    }
    List<int[]> search(String text) {
        List<int[]> result = new ArrayList<>();
        int node = 0;
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            while (node != 0 && !go.get(node).containsKey(c)) node = fail.get(node);
            node = go.get(node).getOrDefault(c, 0);
            for (String w : out.get(node)) result.add(new int[]{i - w.length() + 1});
        }
        return result;
    }
}`,
        explanation: 'HashMap children for arbitrary alphabets; BFS builds failure links and output lists are merged along them.',
      },
    ],
    quizId: 'quiz-ext-aho-corasick-automaton',
    quizTitle: 'Aho-Corasick Automaton Quiz',
    quizDescription: 'Verify your understanding of the trie, failure links, and multi-pattern matching.',
    questions: [
      {
        id: 'q-aho-corasick-automaton-1',
        quiz_id: 'quiz-ext-aho-corasick-automaton',
        question_text: 'What role do failure links play in the Aho-Corasick automaton?',
        question_type: 'MCQ',
        options: [
          'They store the hash of each pattern',
          'They point to the node representing the longest proper suffix of the current match that is a prefix of some pattern',
          'They mark which nodes are terminal',
          'They connect the root to every leaf',
        ],
        correct_option_index: 1,
        explanation: 'Failure links generalize the KMP failure function, letting the search fall back without rescanning the text.',
      },
      {
        id: 'q-aho-corasick-automaton-2',
        quiz_id: 'quiz-ext-aho-corasick-automaton',
        question_text: 'Output (dictionary) links are needed to report patterns that are suffixes of the current matched string.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Without output links you would miss shorter patterns (like "he" in "she") that end at states reachable via failure links.',
      },
      {
        id: 'q-aho-corasick-automaton-3',
        quiz_id: 'quiz-ext-aho-corasick-automaton',
        question_text: 'For text length n, total pattern length m, and z matches, what is the overall time complexity?',
        question_type: 'COMPLEXITY',
        options: ['O(n * m)', 'O(n + m + z)', 'O(n log m)', 'O(m^2 + n)'],
        correct_option_index: 1,
        explanation: 'Construction is linear in the pattern sizes and searching is linear in the text plus the number of reported matches.',
      },
    ],
  },
  // 5. MANACHER'S ALGORITHM
  {
    topic: {
      id: 'ext-manachers-algorithm',
      slug: 'manachers-algorithm',
      category_id: CATEGORY_IDS.patterns,
      title: "Manacher's Algorithm",
      definition: "Manacher's algorithm finds the longest palindromic substring of a string in linear time by computing, for each center, the radius of the palindrome around it while reusing symmetry within the current rightmost palindrome.",
      importance: 'It turns the naive $O(n^2)$ (or $O(n^3)$) palindrome search into $O(n)$, and its radius array answers many palindrome queries — counting palindromic substrings, longest palindrome, and palindromic factorizations.',
      prerequisites: ['String', 'Array', 'Two Pointers'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(n)',
      time_complexity_average: 'O(n)',
      time_complexity_worst: 'O(n)',
      space_complexity: 'O(n)',
      display_order: 704,
    },
    sections: [
      {
        id: 'sec-manachers-algorithm-1',
        topic_id: 'ext-manachers-algorithm',
        title: 'Concept & Intuition',
        content: `A palindrome reads the same forwards and backwards. The brute-force approach expands around each of the $2n-1$ possible centers (each character and each gap), costing $O(n^2)$.

Manacher's insight is **mirror symmetry**: if we already know a large palindrome centered at some position $C$ spanning up to $R$, then for a position $i$ inside it, the palindrome radius at $i$ is at least the radius at its mirror $2C - i$ — until it would poke past $R$. That lets us skip re-expanding characters we have effectively already checked.

> [!NOTE]
> Insert separators (e.g. \`#\`) between every character to handle even- and odd-length palindromes uniformly, so every palindrome has an odd length in the transformed string.`,
        display_order: 1,
      },
      {
        id: 'sec-manachers-algorithm-2',
        topic_id: 'ext-manachers-algorithm',
        title: 'How It Works',
        content: `1. **Transform** \`s\` into \`t\` by inserting a sentinel between and around characters: \`abc\` becomes \`^#a#b#c#$\`. The unique boundary sentinels avoid bounds checks.
2. Maintain the current palindrome **center** $C$ and its **right edge** $R$, plus a radius array $P$.
3. For each $i$, initialize $P[i] = \\min(R - i, P[2C - i])$ if $i < R$, else $0$ — reusing the mirror.
4. **Expand** around $i$ while characters match.
5. If $i + P[i] > R$, update $C = i$, $R = i + P[i]$.

The maximum $P[i]$ gives the longest palindrome; map its center back to the original string.`,
        display_order: 2,
      },
      {
        id: 'sec-manachers-algorithm-3',
        topic_id: 'ext-manachers-algorithm',
        title: 'Complexity Analysis',
        content: `The key is that the right edge $R$ is **non-decreasing** across the whole run. Every character comparison that succeeds pushes $R$ forward, and $R$ can advance at most $O(n)$ times total. Comparisons that fail happen once per center.

- Time: $O(n)$ — the total expansion work is bounded by the growth of $R$.
- Space: $O(n)$ for the transformed string and the radius array $P$.

This is a strict improvement over expand-around-center ($O(n^2)$) and dynamic-programming ($O(n^2)$ time, $O(n^2)$ space) palindrome methods.`,
        display_order: 3,
      },
      {
        id: 'sec-manachers-algorithm-4',
        topic_id: 'ext-manachers-algorithm',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Choose sentinel characters that cannot appear in the input (or use distinct begin/end sentinels). If a separator collides with real data, palindrome radii become wrong.

Common mistakes:
- Mixing up transformed indices and original indices: the original length of a palindrome centered at $i$ in $t$ is exactly $P[i]$, and its start in $s$ is $(i - P[i]) / 2$.
- Forgetting to clamp $P[i]$ to $R - i$ before expanding, which breaks the linear-time guarantee.

Use cases: longest palindromic substring, counting all palindromic substrings, and preprocessing for palindromic-partition dynamic programming.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-manachers-algorithm-py',
        topic_id: 'ext-manachers-algorithm',
        language: 'python',
        is_optimized: true,
        code: `def longest_palindrome(s):
    if not s:
        return ""
    t = '^#' + '#'.join(s) + '#$'
    n = len(t)
    p = [0] * n
    c = r = 0
    for i in range(1, n - 1):
        if i < r:
            p[i] = min(r - i, p[2 * c - i])
        while t[i + p[i] + 1] == t[i - p[i] - 1]:
            p[i] += 1
        if i + p[i] > r:
            c, r = i, i + p[i]
    max_len, center = max((v, idx) for idx, v in enumerate(p))
    start = (center - max_len) // 2
    return s[start:start + max_len]`,
        explanation: 'Transforms with sentinels so bounds never overflow; p[i] equals the palindrome length in the original string.',
      },
      {
        id: 'snip-manachers-algorithm-js',
        topic_id: 'ext-manachers-algorithm',
        language: 'javascript',
        is_optimized: true,
        code: `function longestPalindrome(s) {
  if (s.length === 0) return "";
  const t = '^#' + s.split('').join('#') + '#$';
  const n = t.length;
  const p = new Array(n).fill(0);
  let c = 0, r = 0;
  for (let i = 1; i < n - 1; i++) {
    if (i < r) p[i] = Math.min(r - i, p[2 * c - i]);
    while (t[i + p[i] + 1] === t[i - p[i] - 1]) p[i]++;
    if (i + p[i] > r) { c = i; r = i + p[i]; }
  }
  let maxLen = 0, center = 0;
  for (let i = 1; i < n - 1; i++) {
    if (p[i] > maxLen) { maxLen = p[i]; center = i; }
  }
  const start = (center - maxLen) / 2;
  return s.substring(start, start + maxLen);
}`,
        explanation: 'Same sentinel transform; scans the radius array once to recover the longest palindrome substring.',
      },
      {
        id: 'snip-manachers-algorithm-cpp',
        topic_id: 'ext-manachers-algorithm',
        language: 'cpp',
        is_optimized: true,
        code: `#include <string>
#include <vector>
using namespace std;

string longestPalindrome(const string& s) {
    if (s.empty()) return "";
    string t = "^#";
    for (char ch : s) { t += ch; t += '#'; }
    t += '$';
    int n = t.size();
    vector<int> p(n, 0);
    int c = 0, r = 0;
    for (int i = 1; i < n - 1; ++i) {
        if (i < r) p[i] = min(r - i, p[2 * c - i]);
        while (t[i + p[i] + 1] == t[i - p[i] - 1]) ++p[i];
        if (i + p[i] > r) { c = i; r = i + p[i]; }
    }
    int maxLen = 0, center = 0;
    for (int i = 1; i < n - 1; ++i)
        if (p[i] > maxLen) { maxLen = p[i]; center = i; }
    int start = (center - maxLen) / 2;
    return s.substr(start, maxLen);
}`,
        explanation: 'C++ port using sentinels ^, #, and $ so the inner while loop needs no explicit bounds checks.',
      },
      {
        id: 'snip-manachers-algorithm-java',
        topic_id: 'ext-manachers-algorithm',
        language: 'java',
        is_optimized: true,
        code: `public class Manacher {
    public static String longestPalindrome(String s) {
        if (s.isEmpty()) return "";
        StringBuilder sb = new StringBuilder("^#");
        for (char ch : s.toCharArray()) { sb.append(ch).append('#'); }
        sb.append('$');
        String t = sb.toString();
        int n = t.length();
        int[] p = new int[n];
        int c = 0, r = 0;
        for (int i = 1; i < n - 1; i++) {
            if (i < r) p[i] = Math.min(r - i, p[2 * c - i]);
            while (t.charAt(i + p[i] + 1) == t.charAt(i - p[i] - 1)) p[i]++;
            if (i + p[i] > r) { c = i; r = i + p[i]; }
        }
        int maxLen = 0, center = 0;
        for (int i = 1; i < n - 1; i++)
            if (p[i] > maxLen) { maxLen = p[i]; center = i; }
        int start = (center - maxLen) / 2;
        return s.substring(start, start + maxLen);
    }
}`,
        explanation: 'Java implementation; the radius array value doubles as the original palindrome length.',
      },
    ],
    quizId: 'quiz-ext-manachers-algorithm',
    quizTitle: "Manacher's Algorithm Quiz",
    quizDescription: 'Test your understanding of palindrome radii, mirror symmetry, and linear-time expansion.',
    questions: [
      {
        id: 'q-manachers-algorithm-1',
        quiz_id: 'quiz-ext-manachers-algorithm',
        question_text: 'Why are separator characters inserted between every character of the input?',
        question_type: 'MCQ',
        options: [
          'To make the string longer for hashing',
          'To handle even- and odd-length palindromes uniformly',
          'To remove duplicate characters',
          'To sort the characters',
        ],
        correct_option_index: 1,
        explanation: 'With separators every palindrome in the transformed string has odd length, so a single center-based scan covers both cases.',
      },
      {
        id: 'q-manachers-algorithm-2',
        quiz_id: 'quiz-ext-manachers-algorithm',
        question_text: 'Manacher reuses the palindrome radius of the mirror position to avoid redundant expansion.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Inside the current rightmost palindrome, the radius at i is initialized from its mirror 2C - i, clamped by the right edge.',
      },
      {
        id: 'q-manachers-algorithm-3',
        quiz_id: 'quiz-ext-manachers-algorithm',
        question_text: "What is the time complexity of finding the longest palindromic substring with Manacher's algorithm?",
        question_type: 'COMPLEXITY',
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(n^3)'],
        correct_option_index: 2,
        explanation: 'Because the right edge R only moves forward, total expansion work is linear in the string length.',
      },
    ],
  },
  // 6. SWEEP LINE ALGORITHM
  {
    topic: {
      id: 'ext-sweep-line-algorithm',
      slug: 'sweep-line-algorithm',
      category_id: CATEGORY_IDS.patterns,
      title: 'Sweep Line Algorithm',
      definition: 'A sweep line algorithm solves geometric and interval problems by conceptually moving a line across the plane, processing events (endpoints, intersections) in sorted order and maintaining an active set of objects the line currently crosses.',
      importance: 'Sweeping reduces many quadratic geometric problems to $O(n \\log n)$ by only comparing objects that are near each other along the sweep, and it is the backbone of interval scheduling, segment-intersection, and area/union computations.',
      prerequisites: ['Sorting', 'Balanced BST / Ordered Set', 'Priority Queue'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(n log n)',
      time_complexity_average: 'O(n log n)',
      time_complexity_worst: 'O((n + k) log n)',
      space_complexity: 'O(n)',
      display_order: 705,
    },
    sections: [
      {
        id: 'sec-sweep-line-algorithm-1',
        topic_id: 'ext-sweep-line-algorithm',
        title: 'Concept & Intuition',
        content: `Imagine a vertical line sweeping from left to right across the plane. Instead of comparing every pair of objects (which is $O(n^2)$), we only ever reason about the objects the line is **currently touching** — the *active set*.

The plane is reduced to a sequence of **events** sorted by x-coordinate: a segment start, a segment end, an interval open/close. At each event we update the active set and check only local relationships (adjacent neighbors), because far-apart objects cannot interact at this instant.

> [!NOTE]
> The two ingredients are always: (1) a sorted **event queue** and (2) an ordered **active-set structure** that supports insert, delete, and neighbor queries in $O(\\log n)$.`,
        display_order: 1,
      },
      {
        id: 'sec-sweep-line-algorithm-2',
        topic_id: 'ext-sweep-line-algorithm',
        title: 'How It Works',
        content: `A canonical use is finding whether any two of $n$ segments intersect (Bentley-Ottmann style), but the simplest instance is interval overlap:

1. **Generate events**: for each interval create a "start" and an "end" event with its x-coordinate.
2. **Sort events** by coordinate; break ties so that starts and ends order correctly for the problem.
3. **Sweep**: process events in order. On a start, insert into the active set and check neighbors; on an end, remove it.
4. Maintain whatever aggregate the problem needs — a running count, current overlap, or covered length.

For segment intersection, the active set is ordered by y at the sweep line, and only adjacent segments can be the next to intersect.`,
        display_order: 2,
      },
      {
        id: 'sec-sweep-line-algorithm-3',
        topic_id: 'ext-sweep-line-algorithm',
        title: 'Complexity Analysis',
        content: `Sorting the $2n$ events costs $O(n \\log n)$. Each event triggers $O(\\log n)$ work on the active-set structure (an ordered set or balanced BST).

- Interval / counting sweeps: $O(n \\log n)$ time, $O(n)$ space.
- Bentley-Ottmann segment intersection: $O((n + k) \\log n)$, where $k$ is the number of intersection points, since each intersection is itself an event.

The win over the brute-force $O(n^2)$ pairwise check is dramatic whenever the number of active objects at any moment stays small relative to $n$.`,
        display_order: 3,
      },
      {
        id: 'sec-sweep-line-algorithm-4',
        topic_id: 'ext-sweep-line-algorithm',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Tie-breaking at equal coordinates is the number-one source of bugs. Decide deliberately whether a "start" event sorts before an "end" event at the same x — it changes whether touching intervals count as overlapping.

Common mistakes:
- Using floating-point coordinates without an epsilon, causing unstable ordering in the active set.
- Forgetting to remove ended objects, so the active set grows and neighbor checks become wrong.

Use cases: meeting-room scheduling, skyline problem, rectangle-union area, closest pair, and line-segment intersection in computational geometry and GIS.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-sweep-line-algorithm-py',
        topic_id: 'ext-sweep-line-algorithm',
        language: 'python',
        is_optimized: true,
        code: `def max_overlap(intervals):
    # Returns the maximum number of intervals overlapping at any point.
    events = []
    for start, end in intervals:
        events.append((start, 1))   # +1 when an interval opens
        events.append((end, -1))    # -1 when it closes
    # On ties, process closings (-1) before openings (+1) so touching
    # intervals [1,2] and [2,3] are not counted as overlapping.
    events.sort(key=lambda e: (e[0], e[1]))
    active = best = 0
    for _, delta in events:
        active += delta
        best = max(best, active)
    return best`,
        explanation: 'Classic 1D sweep: convert intervals to +/-1 events, sort, and track the running active count.',
      },
      {
        id: 'snip-sweep-line-algorithm-js',
        topic_id: 'ext-sweep-line-algorithm',
        language: 'javascript',
        is_optimized: true,
        code: `function maxOverlap(intervals) {
  const events = [];
  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }
  // Sort by coordinate; closings before openings on a tie.
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let active = 0, best = 0;
  for (const [, delta] of events) {
    active += delta;
    best = Math.max(best, active);
  }
  return best;
}`,
        explanation: 'Event-based sweep computing the peak number of simultaneously active intervals in O(n log n).',
      },
      {
        id: 'snip-sweep-line-algorithm-cpp',
        topic_id: 'ext-sweep-line-algorithm',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>
using namespace std;

int maxOverlap(vector<pair<int,int>>& intervals) {
    vector<pair<int,int>> events;
    for (auto& iv : intervals) {
        events.push_back({iv.first, 1});
        events.push_back({iv.second, -1});
    }
    // On equal coordinates, -1 (close) sorts before +1 (open).
    sort(events.begin(), events.end(), [](const pair<int,int>& a, const pair<int,int>& b){
        if (a.first != b.first) return a.first < b.first;
        return a.second < b.second;
    });
    int active = 0, best = 0;
    for (auto& e : events) {
        active += e.second;
        best = max(best, active);
    }
    return best;
}`,
        explanation: 'Sorts 2n events then sweeps once; the comparator encodes the tie-breaking policy for touching intervals.',
      },
      {
        id: 'snip-sweep-line-algorithm-java',
        topic_id: 'ext-sweep-line-algorithm',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class SweepLine {
    public static int maxOverlap(int[][] intervals) {
        int[][] events = new int[intervals.length * 2][2];
        int idx = 0;
        for (int[] iv : intervals) {
            events[idx++] = new int[]{iv[0], 1};
            events[idx++] = new int[]{iv[1], -1};
        }
        Arrays.sort(events, (a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
        int active = 0, best = 0;
        for (int[] e : events) {
            active += e[1];
            best = Math.max(best, active);
        }
        return best;
    }
}`,
        explanation: 'Java sweep over sorted events; closings sort before openings so adjacent intervals are handled correctly.',
      },
    ],
    quizId: 'quiz-ext-sweep-line-algorithm',
    quizTitle: 'Sweep Line Algorithm Quiz',
    quizDescription: 'Check your grasp of events, the active set, and sweep-based complexity.',
    questions: [
      {
        id: 'q-sweep-line-algorithm-1',
        quiz_id: 'quiz-ext-sweep-line-algorithm',
        question_text: 'What two data structures are central to a sweep line algorithm?',
        question_type: 'MCQ',
        options: [
          'A stack and a hash map',
          'A sorted event queue and an ordered active-set structure',
          'A trie and a disjoint-set union',
          'A heap and a bitset',
        ],
        correct_option_index: 1,
        explanation: 'Events are processed in sorted order while an ordered active set supports O(log n) inserts, deletes, and neighbor queries.',
      },
      {
        id: 'q-sweep-line-algorithm-2',
        quiz_id: 'quiz-ext-sweep-line-algorithm',
        question_text: 'Incorrect tie-breaking between start and end events at the same coordinate can change whether touching intervals count as overlapping.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Ordering a close before or after an open at the same x directly determines whether [1,2] and [2,3] are treated as overlapping.',
      },
      {
        id: 'q-sweep-line-algorithm-3',
        quiz_id: 'quiz-ext-sweep-line-algorithm',
        question_text: 'What is the time complexity of the Bentley-Ottmann segment-intersection sweep for n segments with k intersections?',
        question_type: 'COMPLEXITY',
        options: ['O(n^2)', 'O(n log n)', 'O((n + k) log n)', 'O(k^2)'],
        correct_option_index: 2,
        explanation: 'Each of the n endpoints and k intersection events costs O(log n) work on the active-set structure.',
      },
    ],
  },
  // 7. CONVEX HULL (GRAHAM SCAN)
  {
    topic: {
      id: 'ext-convex-hull-graham-scan',
      slug: 'convex-hull-graham-scan',
      category_id: CATEGORY_IDS.patterns,
      title: 'Convex Hull (Graham Scan)',
      definition: 'The convex hull of a set of points is the smallest convex polygon containing them all; Graham scan computes it by sorting points by polar angle around an anchor and scanning them while discarding any point that would create a non-left (clockwise) turn.',
      importance: 'Convex hulls are a foundational primitive in computational geometry, used for collision detection, shape analysis, path planning, and as a preprocessing step for diameter, width, and nearest-pair computations.',
      prerequisites: ['Sorting', 'Stack', 'Vectors / Cross Product'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(n log n)',
      time_complexity_average: 'O(n log n)',
      time_complexity_worst: 'O(n log n)',
      space_complexity: 'O(n)',
      display_order: 706,
    },
    sections: [
      {
        id: 'sec-convex-hull-graham-scan-1',
        topic_id: 'ext-convex-hull-graham-scan',
        title: 'Concept & Intuition',
        content: `Picture stretching a rubber band around a set of nails on a board and letting it snap tight. The shape it forms — touching only the outermost nails — is the **convex hull**.

Graham scan builds this boundary incrementally. Starting from the lowest point (guaranteed to be on the hull), it considers the remaining points in order of the angle they make with that anchor. Walking through them, it keeps only points that continue turning **left** (counter-clockwise). Any point that forces a right turn means the previous point was a "dent," so we pop it.

> [!NOTE]
> The **cross product** is the workhorse: for vectors $\\vec{OA}$ and $\\vec{OB}$, a positive cross product means a left turn, zero means collinear, and negative means a right turn.`,
        display_order: 1,
      },
      {
        id: 'sec-convex-hull-graham-scan-2',
        topic_id: 'ext-convex-hull-graham-scan',
        title: 'How It Works',
        content: `1. **Pick the anchor**: the point with the lowest y (lowest x to break ties). It is always a hull vertex.
2. **Sort** the other points by polar angle around the anchor; for ties, sort by distance.
3. **Scan** with a stack. For each candidate point, while the top two stack points and the candidate do not make a counter-clockwise turn (cross product $\\le 0$), pop the top.
4. Push the candidate. After processing all points, the stack holds the hull in counter-clockwise order.

The turn test uses the cross product of $(\\text{top} - \\text{second})$ and $(\\text{candidate} - \\text{second})$.`,
        display_order: 2,
      },
      {
        id: 'sec-convex-hull-graham-scan-3',
        topic_id: 'ext-convex-hull-graham-scan',
        title: 'Complexity Analysis',
        content: `The **sort** by polar angle dominates at $O(n \\log n)$. The **scan** itself is $O(n)$: although it has a nested \`while\` pop loop, each point is pushed once and popped at most once, so the total number of pops is bounded by $n$ — an amortized $O(n)$.

- Time: $O(n \\log n)$, dominated by sorting.
- Space: $O(n)$ for the sorted array and the hull stack.

Output-sensitive algorithms (e.g. Jarvis march at $O(nh)$ for $h$ hull points, or Chan's algorithm at $O(n \\log h)$) can beat this when the hull is small, but Graham scan's simplicity and worst-case bound make it a standard choice.`,
        display_order: 3,
      },
      {
        id: 'sec-convex-hull-graham-scan-4',
        topic_id: 'ext-convex-hull-graham-scan',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> **Collinear points** are the classic trap. Decide up front whether collinear points on a hull edge should be kept or discarded, and make the cross-product comparison ($< 0$ vs $\\le 0$) match that decision consistently.

Common mistakes:
- Floating-point error in the angle sort; prefer integer cross products over computing \`atan2\` when coordinates are integers.
- Mishandling duplicate points or fewer than three points, which can crash the scan.

Use cases: collision detection and physics engines, GIS boundary computation, pattern recognition, and computing the diameter/width of a point set.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-convex-hull-graham-scan-py',
        topic_id: 'ext-convex-hull-graham-scan',
        language: 'python',
        is_optimized: true,
        code: `def convex_hull(points):
    # Andrew's monotone chain: a robust Graham-scan variant.
    pts = sorted(set(points))
    if len(pts) <= 2:
        return pts

    def cross(o, a, b):
        return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0])

    lower = []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    upper = []
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]`,
        explanation: 'Monotone chain sorts by coordinate and builds lower and upper hulls; cross product filters non-left turns. Returns hull in CCW order.',
      },
      {
        id: 'snip-convex-hull-graham-scan-js',
        topic_id: 'ext-convex-hull-graham-scan',
        language: 'javascript',
        is_optimized: true,
        code: `function convexHull(points) {
  const pts = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (pts.length <= 2) return pts;
  const cross = (o, a, b) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 &&
           cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0)
      lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 &&
           cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0)
      upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}`,
        explanation: 'Monotone-chain hull in O(n log n); the cross product test discards clockwise or collinear turns.',
      },
      {
        id: 'snip-convex-hull-graham-scan-cpp',
        topic_id: 'ext-convex-hull-graham-scan',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>
using namespace std;

typedef pair<long long,long long> P;

long long cross(const P& o, const P& a, const P& b) {
    return (a.first-o.first)*(b.second-o.second)
         - (a.second-o.second)*(b.first-o.first);
}

vector<P> convexHull(vector<P> pts) {
    sort(pts.begin(), pts.end());
    pts.erase(unique(pts.begin(), pts.end()), pts.end());
    int n = pts.size();
    if (n <= 2) return pts;
    vector<P> h(2 * n);
    int k = 0;
    for (int i = 0; i < n; ++i) {
        while (k >= 2 && cross(h[k-2], h[k-1], pts[i]) <= 0) --k;
        h[k++] = pts[i];
    }
    int lower = k + 1;
    for (int i = n - 2; i >= 0; --i) {
        while (k >= lower && cross(h[k-2], h[k-1], pts[i]) <= 0) --k;
        h[k++] = pts[i];
    }
    h.resize(k - 1);
    return h;
}`,
        explanation: 'Integer cross products avoid floating error; builds lower then upper hull into one buffer.',
      },
      {
        id: 'snip-convex-hull-graham-scan-java',
        topic_id: 'ext-convex-hull-graham-scan',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class ConvexHull {
    static long cross(long[] o, long[] a, long[] b) {
        return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0]);
    }
    public static List<long[]> convexHull(long[][] points) {
        long[][] pts = points.clone();
        Arrays.sort(pts, (a, b) -> a[0] != b[0]
            ? Long.compare(a[0], b[0]) : Long.compare(a[1], b[1]));
        int n = pts.length;
        if (n <= 2) return new ArrayList<>(Arrays.asList(pts));
        long[][] h = new long[2 * n][];
        int k = 0;
        for (int i = 0; i < n; i++) {
            while (k >= 2 && cross(h[k-2], h[k-1], pts[i]) <= 0) k--;
            h[k++] = pts[i];
        }
        int lower = k + 1;
        for (int i = n - 2; i >= 0; i--) {
            while (k >= lower && cross(h[k-2], h[k-1], pts[i]) <= 0) k--;
            h[k++] = pts[i];
        }
        return new ArrayList<>(Arrays.asList(Arrays.copyOf(h, k - 1)));
    }
}`,
        explanation: 'Java monotone chain with long arithmetic; returns the hull vertices in counter-clockwise order.',
      },
    ],
    quizId: 'quiz-ext-convex-hull-graham-scan',
    quizTitle: 'Convex Hull (Graham Scan) Quiz',
    quizDescription: 'Test your understanding of orientation tests, sorting, and hull construction.',
    questions: [
      {
        id: 'q-convex-hull-graham-scan-1',
        quiz_id: 'quiz-ext-convex-hull-graham-scan',
        question_text: 'What geometric test decides whether a point is kept during the scan?',
        question_type: 'MCQ',
        options: [
          'The dot product of two vectors',
          'The cross product, which reveals left vs right turns',
          'The Euclidean distance to the anchor',
          'The slope of the previous edge',
        ],
        correct_option_index: 1,
        explanation: 'A positive cross product indicates a counter-clockwise (left) turn; non-positive turns cause a pop.',
      },
      {
        id: 'q-convex-hull-graham-scan-2',
        quiz_id: 'quiz-ext-convex-hull-graham-scan',
        question_text: 'The overall time complexity of Graham scan is dominated by the sorting step.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Sorting is O(n log n) while the scan is amortized O(n), so sorting dominates the total cost.',
      },
      {
        id: 'q-convex-hull-graham-scan-3',
        quiz_id: 'quiz-ext-convex-hull-graham-scan',
        question_text: 'What is the time complexity of Graham scan for n points?',
        question_type: 'COMPLEXITY',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(n log h)'],
        correct_option_index: 1,
        explanation: 'The polar-angle (or coordinate) sort costs O(n log n) and the linear scan does not change the asymptotic bound.',
      },
    ],
  },
];
