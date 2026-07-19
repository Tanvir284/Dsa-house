/**
 * Fetch real problem descriptions from LeetCode (GraphQL) and Codeforces (API)
 * and update problems_arena.json with accurate data.
 *
 * Usage: node scripts/fetch-descriptions.js
 */

const fs = require('fs');
const path = require('path');

const ARENA_PATH = path.join(__dirname, '..', 'src', 'data', 'problems_arena.json');

// ---------------------------------------------------------------------------
// LeetCode GraphQL helpers
// ---------------------------------------------------------------------------

async function fetchLeetCode(titleSlug) {
  const query = `query questionContent($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      content
      difficulty
      topicTags { name }
    }
  }`;

  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; DSA-House/1.0)',
    },
    body: JSON.stringify({ query, variables: { titleSlug } }),
  });

  if (!res.ok) throw new Error(`LeetCode HTTP ${res.status}`);
  const json = await res.json();
  if (!json.data?.question?.content) throw new Error('No content returned');
  return json.data.question;
}

/** Strip HTML tags → plain text, then tidy whitespace. */
function htmlToMarkdown(html) {
  let md = html;
  // Convert <strong>/<b> → **...**
  md = md.replace(/<(strong|b)>(.*?)<\/\1>/gi, '**$2**');
  // Convert <em>/<i> → *...*
  md = md.replace(/<(em|i)>(.*?)<\/\1>/gi, '*$2*');
  // Convert <code> → `...`
  md = md.replace(/<code>(.*?)<\/code>/gi, '`$1`');
  // <sup> → ^ for exponents
  md = md.replace(/<sup>(.*?)<\/sup>/gi, '^$1');
  // <sub> → _ for subscripts
  md = md.replace(/<sub>(.*?)<\/sub>/gi, '_$1');
  // <li> → "- "
  md = md.replace(/<li[^>]*>/gi, '- ');
  md = md.replace(/<\/li>/gi, '\n');
  // <p>, <br>, <div> → newlines
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<\/p>/gi, '\n\n');
  md = md.replace(/<p[^>]*>/gi, '');
  md = md.replace(/<\/div>/gi, '\n');
  md = md.replace(/<div[^>]*>/gi, '');
  // <pre> blocks → code blocks
  md = md.replace(/<pre>(.*?)<\/pre>/gis, '\n```\n$1\n```\n');
  // <ul>/<ol> tags
  md = md.replace(/<\/?[uo]l[^>]*>/gi, '\n');
  // strip remaining tags
  md = md.replace(/<[^>]*>/g, '');
  // decode HTML entities
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.replace(/&apos;/g, "'");
  // collapse excessive whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  return md.trim();
}

/** Extract constraints list from the Markdown-ified content. */
function extractConstraints(md) {
  const constraintsMatch = md.match(/Constraints:\s*\n([\s\S]*?)(?:\n\n|$)/i);
  if (!constraintsMatch) return null;
  const lines = constraintsMatch[1]
    .split('\n')
    .map((l) => l.replace(/^-\s*/, '').trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : null;
}

/** Extract clean description (before Examples). */
function extractDescription(md) {
  // Cut at "Example 1" or "Examples:" boundary
  const idx = md.search(/\n\s*\*?\*?Example\s*\d?\*?\*?:?\s*\n/i);
  if (idx > 0) return md.substring(0, idx).trim();
  return md.trim();
}

// ---------------------------------------------------------------------------
// Codeforces API helpers
// ---------------------------------------------------------------------------

async function fetchCodeforces(contestId, index) {
  const url = `https://codeforces.com/problemset/problem/${contestId}/${index}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DSA-House/1.0)' },
  });
  if (!res.ok) throw new Error(`Codeforces HTTP ${res.status}`);
  const html = await res.text();

  // Extract problem-statement div
  const stmtMatch = html.match(/<div class="problem-statement">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
  if (!stmtMatch) throw new Error('No problem-statement found');

  const stmt = stmtMatch[1];

  // Extract time/memory limits
  const timeMatch = stmt.match(/time limit per test<\/div>\s*<div[^>]*>(.*?)<\/div>/);
  const memMatch = stmt.match(/memory limit per test<\/div>\s*<div[^>]*>(.*?)<\/div>/);

  // Extract description paragraphs (between header and input-specification)
  const descMatch = stmt.match(/<\/div>\s*<\/div>([\s\S]*?)<div class="input-specification"/);
  let description = '';
  if (descMatch) {
    description = descMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Extract input specification
  const inputMatch = stmt.match(/<div class="input-specification">([\s\S]*?)<\/div>/);
  let inputSpec = '';
  if (inputMatch) {
    inputSpec = inputMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    inputSpec = inputSpec.replace(/^\s*Input\s*/, '');
  }

  // Extract output specification
  const outputMatch = stmt.match(/<div class="output-specification">([\s\S]*?)<\/div>/);
  let outputSpec = '';
  if (outputMatch) {
    outputSpec = outputMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    outputSpec = outputSpec.replace(/^\s*Output\s*/, '');
  }

  // Build constraints from limits
  const constraints = [];
  if (timeMatch) constraints.push(`Time limit: ${timeMatch[1].trim()}`);
  if (memMatch) constraints.push(`Memory limit: ${memMatch[1].trim()}`);

  return { description, inputSpec, outputSpec, constraints };
}

// ---------------------------------------------------------------------------
// Title → slug mapping for LeetCode problems
// ---------------------------------------------------------------------------

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ---------------------------------------------------------------------------
// Well-known descriptions (fallback for when APIs fail)
// ---------------------------------------------------------------------------

const KNOWN_DESCRIPTIONS = {
  'lc-1': {
    description: 'Given an array of integers `nums` and an integer `target`, return **indices of the two numbers** such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
  },
  'lc-20': {
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is **valid**.\n\nAn input string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.\n- Every close bracket has a corresponding open bracket of the same type.',
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only: `()[]{}`.'],
  },
  'lc-21': {
    description: 'You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.',
    constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100', 'Both list1 and list2 are sorted in non-decreasing order.'],
  },
  'lc-141': {
    description: 'Given `head`, the head of a linked list, determine if the linked list has a **cycle** in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail\'s `next` pointer is connected to. **Note that `pos` is not passed as a parameter.**\n\nReturn `true` if there is a cycle in the linked list. Otherwise, return `false`.',
    constraints: ['The number of the nodes in the list is in the range [0, 10^4].', '-10^5 <= Node.val <= 10^5', 'pos is -1 or a valid index in the linked-list.'],
  },
  'lc-206': {
    description: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.',
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
  },
  'lc-704': {
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.',
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.', 'nums is sorted in ascending order.'],
  },
  'lc-226': {
    description: 'Given the `root` of a binary tree, invert the tree, and return its root.\n\nInverting a binary tree means swapping every left child with its right child recursively.',
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
  },
  'lc-235': {
    description: 'Given a binary search tree (BST), find the **lowest common ancestor** (LCA) node of two given nodes in the BST.\n\nAccording to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself)."',
    constraints: ['The number of nodes in the tree is in the range [2, 10^5].', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique.', 'p != q', 'p and q will exist in the BST.'],
  },
  'lc-104': {
    description: 'Given the `root` of a binary tree, return its **maximum depth**.\n\nA binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
  },
  'lc-11': {
    description: 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the **most water**.\n\nReturn the maximum amount of water a container can store.\n\n**Notice** that you may not slant the container.',
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
  },
  'lc-15': {
    description: 'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.',
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
  },
  'lc-3': {
    description: 'Given a string `s`, find the length of the **longest substring** without repeating characters.',
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
  },
  'lc-36': {
    description: 'Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated **according to the following rules**:\n\n- Each row must contain the digits `1-9` without repetition.\n- Each column must contain the digits `1-9` without repetition.\n- Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.\n\n**Note:** A Sudoku board (partially filled) could be valid but is not necessarily solvable. Only the filled cells need to be validated according to the mentioned rules.',
    constraints: ['board.length == 9', 'board[i].length == 9', "board[i][j] is a digit 1-9 or '.'."],
  },
  'lc-22': {
    description: 'Given `n` pairs of parentheses, write a function to generate all combinations of **well-formed parentheses**.',
    constraints: ['1 <= n <= 8'],
  },
  'lc-33': {
    description: 'There is an integer array `nums` sorted in ascending order (with **distinct** values).\n\nPrior to being passed to your function, `nums` is **possibly rotated** at an unknown pivot index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed).\n\nGiven the array `nums` **after** the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.',
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique.', 'nums is an ascending array that is possibly rotated.', '-10^4 <= target <= 10^4'],
  },
  'lc-46': {
    description: 'Given an array `nums` of distinct integers, return all the possible **permutations**. You can return the answer in **any order**.',
    constraints: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All the integers of nums are unique.'],
  },
  'lc-56': {
    description: 'Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the **non-overlapping intervals** that cover all the intervals in the input.',
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i <= end_i <= 10^4'],
  },
  'lc-49': {
    description: 'Given an array of strings `strs`, group **the anagrams** together. You can return the answer in **any order**.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters.'],
  },
  'lc-102': {
    description: 'Given the `root` of a binary tree, return the **level order traversal** of its nodes\' values. (i.e., from left to right, level by level).',
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
  },
  'lc-215': {
    description: 'Given an integer array `nums` and an integer `k`, return the `k`th **largest** element in the array.\n\nNote that it is the `k`th largest element in the sorted order, not the `k`th distinct element.\n\nCan you solve it without sorting?',
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
  },
  'lc-207': {
    description: 'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you **must** take course `b_i` first if you want to take course `a_i`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.',
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2', '0 <= a_i, b_i < numCourses', 'All the pairs prerequisites[i] are unique.'],
  },
  'lc-200': {
    description: 'Given an `m x n` 2D binary grid `grid` which represents a map of `1`s (land) and `0`s (water), return **the number of islands**.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', "grid[i][j] is '0' or '1'."],
  },
  'lc-322': {
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the **fewest number of coins** that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.',
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
  },
  'lc-198': {
    description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\n\nGiven an integer array `nums` representing the amount of money of each house, return the **maximum amount of money** you can rob tonight **without alerting the police**.',
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
  },
  'lc-79': {
    description: 'Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.',
    constraints: ['m == board.length', 'n = board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15', 'board and word consists of only lowercase and uppercase English letters.'],
  },
  'lc-78': {
    description: 'Given an integer array `nums` of **unique** elements, return all possible **subsets** (the power set).\n\nThe solution set **must not** contain duplicate subsets. Return the solution in **any order**.',
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All the numbers of nums are unique.'],
  },
  'lc-739': {
    description: 'Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the **number of days** you have to wait after the `i`th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.',
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
  },
  'lc-208': {
    description: 'A **trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.\n\nImplement the Trie class:\n- `Trie()` Initializes the trie object.\n- `void insert(String word)` Inserts the string `word` into the trie.\n- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.\n- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.',
    constraints: ['1 <= word.length, prefix.length <= 2000', 'word and prefix consist only of lowercase English letters.', 'At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.'],
  },
  'lc-155': {
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class:\n- `MinStack()` initializes the stack object.\n- `void push(int val)` pushes the element `val` onto the stack.\n- `void pop()` removes the element on the top of the stack.\n- `int top()` gets the top element of the stack.\n- `int getMin()` retrieves the minimum element in the stack.\n\nYou must implement a solution with `O(1)` time complexity for each function.',
    constraints: ['-2^31 <= val <= 2^31 - 1', 'Methods pop, top and getMin operations will always be called on non-empty stacks.', 'At most 3 * 10^4 calls will be made to push, pop, top, and getMin.'],
  },
  'lc-4': {
    description: 'Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return **the median** of the two sorted arrays.\n\nThe overall run time complexity should be `O(log (m+n))`.',
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000', '1 <= m + n <= 2000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
  },
  'lc-23': {
    description: 'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.',
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4', 'lists[i] is sorted in ascending order.', 'The sum of lists[i].length will not exceed 10^4.'],
  },
  'lc-32': {
    description: 'Given a string containing just the characters `(` and `)`, return the length of the **longest valid (well-formed) parentheses** substring.',
    constraints: ['0 <= s.length <= 3 * 10^4', "s[i] is '(' or ')'."],
  },
  'lc-239': {
    description: 'You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the **max sliding window**.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
  },
  'lc-72': {
    description: 'Given two strings `word1` and `word2`, return the **minimum number of operations** required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character',
    constraints: ['0 <= word1.length, word2.length <= 500', 'word1 and word2 consist of lowercase English letters.'],
  },
  'lc-127': {
    description: 'A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:\n- Every adjacent pair of words differs by a single letter.\n- Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.\n- `sk == endWord`\n\nGiven two words, `beginWord` and `endWord`, and a dictionary `wordList`, return **the number of words** in the **shortest transformation sequence** from `beginWord` to `endWord`, or `0` if no such sequence exists.',
    constraints: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000', 'wordList[i].length == beginWord.length', 'beginWord, endWord, and wordList[i] consist of lowercase English letters.', 'beginWord != endWord', 'All the words in wordList are unique.'],
  },
  'lc-42': {
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.',
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
  },
  'lc-51': {
    description: 'The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return **all distinct solutions** to the n-queens puzzle. You may return the answer in **any order**.\n\nEach solution contains a distinct board configuration of the n-queens\' placement, where `Q` and `.` both indicate a queen and an empty space, respectively.',
    constraints: ['1 <= n <= 9'],
  },
  'lc-10': {
    description: 'Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*` where:\n- `.` Matches any single character.\n- `*` Matches zero or more of the preceding element.\n\nThe matching should cover the **entire** input string (not partial).',
    constraints: ['1 <= s.length <= 20', '1 <= p.length <= 20', 's contains only lowercase English letters.', "p contains only lowercase English letters, '.', and '*'.", "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match."],
  },
  'lc-269': {
    description: 'There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.\n\nYou are given a list of strings `words` from the alien language\'s dictionary. The strings in `words` are **sorted lexicographically** by the rules of this new language.\n\nReturn a string of the unique letters in the new alien language sorted in **lexicographically increasing order** by the new language\'s rules. If there is no solution, return `""`. If there are multiple solutions, return **any of them**.',
    constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 100', 'words[i] consists of only lowercase English letters.'],
  },
  // Codeforces problems
  'cf-4A': {
    description: 'Pete and Billy have a watermelon. They want to divide it into two parts, each part weighing an **even** number of kilos.\n\nIt is not obligatory that the parts are equal. The boys are very young and have no idea how to divide the watermelon. Can you help them?\n\nThe first (and the only) input line contains a single integer `w` — the weight of the watermelon.\n\n**Input:** The first line contains a number `w` (1 ≤ w ≤ 100) — weight of the watermelon.\n\n**Output:** Print "YES" if the boys can divide the watermelon into two parts, each of them weighing even number of kilos; and "NO" in the opposite case.',
    constraints: ['1 ≤ w ≤ 100'],
  },
  'cf-71A': {
    description: 'Sometimes some words like "localization" or "internationalization" are so long that writing them many times in one text is quite tiresome. Let\'s consider a word too long, if its length is **strictly more than 10 characters**. All too long words should be replaced with an abbreviation.\n\nThe abbreviation of a word consists of its first letter, then the number of characters between the first and last letters, then the last letter.\n\n**Input:** The first line contains an integer `n` (1 ≤ n ≤ 100). Each of the following `n` lines contains one word.\n\n**Output:** For each word, output its abbreviation if the word is too long, or the original word otherwise.',
    constraints: ['1 ≤ n ≤ 100', '1 ≤ |word| ≤ 100', 'Words consist of lowercase English letters.'],
  },
  'cf-158A': {
    description: '"Contestant who earns a score equal to or greater than the `k`-th place finisher advances to the next round, as long as the score is positive."\n\nGiven the scores of all `n` participants sorted in non-increasing order and the value of `k`, determine how many participants will advance to the next round.\n\n**Input:** The first line contains two integers `n` and `k`. The second line contains `n` integers — the scores.\n\n**Output:** Output the number of participants who advance to the next round.',
    constraints: ['1 ≤ k ≤ n ≤ 50', '0 ≤ score_i ≤ 100'],
  },
  'cf-263A': {
    description: 'You\'ve got a 5 × 5 matrix, consisting of 24 zeroes and a single 1. Let\'s index the matrix rows and columns from 1 to 5. In one move you can perform one of the following 4 operations: move the 1 one cell to the left, one cell to the right, one cell up, or one cell down.\n\nCalculate the minimum number of moves needed to move the 1 to the center of the matrix (position (3, 3)).\n\n**Input:** The input consists of five lines, each containing five integers — the matrix.\n\n**Output:** Print a single integer — the minimum number of moves.',
    constraints: ['The matrix is 5 × 5.', 'Contains exactly 24 zeros and one 1.'],
  },
  'cf-1A': {
    description: 'Theatre Square in the capital city of Berland has a rectangular shape with the size `n × m` meters. On the occasion of the city\'s anniversary, a decision was made to pave the Square with square granite flagstones. Each flagstone has size `a × a`.\n\nWhat is the least number of flagstones needed to pave the Square? It\'s allowed to cover the surface larger than the Theatre Square, but the Square has to be covered. It\'s not allowed to break the flagstones. The sides of flagstones should be parallel to the sides of the Square.\n\n**Input:** The input contains three positive integers `n`, `m` and `a`.\n\n**Output:** Write the needed number of flagstones.',
    constraints: ['1 ≤ n, m, a ≤ 10^9'],
  },
  'cf-112A': {
    description: 'Petya and Vasya are playing a game. Petya\'s got a string `s` and Vasya\'s got a string `t`. Both strings have the same length.\n\nThe players compare strings lexicographically — **case-insensitive**. If Petya\'s string is less, print "-1". If they are equal, print "0". If Petya\'s string is greater, print "1".\n\n**Input:** The first line contains string `s` and the second line contains string `t`. Both strings have length from 1 to 100 and consist of uppercase and lowercase English letters.\n\n**Output:** Print the result of comparison.',
    constraints: ['1 ≤ |s| = |t| ≤ 100', 'Strings consist of uppercase and lowercase English letters.'],
  },
  'cf-339A': {
    description: 'Xenia the beginner mathematician is a third year student at elementary school. She is now learning the addition operation.\n\nThe teacher has written the expression `s1 + s2 + ... + sn`, where each `si` is either 1, 2, or 3. The expression needs to be rearranged such that the terms go in non-decreasing order.\n\n**Input:** The first line contains a non-empty string `s` — the expression. The string contains digits 1, 2, 3 separated by plus signs.\n\n**Output:** Print the expression with numbers in non-decreasing order.',
    constraints: ['Expression length is at most 109 characters.', 'si is 1, 2, or 3.'],
  },
  'cf-281A': {
    description: 'Capitalization is the writing of a word with its first letter as a capital letter. Your task is to capitalize the given word.\n\nNote, that during capitalization all the letters except the first one remain the same.\n\n**Input:** A single line contains a non-empty word consisting of lowercase and uppercase English letters (length ≤ 10^3).\n\n**Output:** Output the given word after capitalization.',
    constraints: ['1 ≤ |word| ≤ 10^3', 'Word consists of English letters.'],
  },
  'cf-266A': {
    description: 'There are `n` stones on the table in a row, each of them can be colored in red, green, or blue color.\n\nCount the minimum number of stones to remove from the table so that no two consecutive stones have the same color.\n\n**Input:** The first line contains integer `n`. The second line contains a string of length `n` consisting of characters "R", "G", and "B" — the colors of the stones.\n\n**Output:** Output the minimum number of stones to be removed.',
    constraints: ['1 ≤ n ≤ 50'],
  },
  'cf-236A': {
    description: 'Those days, many boys use beautiful girls\' photos as avatars in forums. So it is pretty hard to tell the gender of a user at the first strance. Last year, our instructor asked every student to pick a username. Here comes the task.\n\nGiven the username, determine if it\'s a male or female name based on the number of **distinct characters** used. If the number of distinct characters is odd, the owner is a \"CHAT WITH HER!\" (female). Otherwise, it is \"IGNORE HIM!\" (male).\n\n**Input:** The first line contains a non-empty string (lowercase English letters, length ≤ 100).\n\n**Output:** If the number of distinct characters is odd, print "CHAT WITH HER!", otherwise "IGNORE HIM!".',
    constraints: ['1 ≤ |username| ≤ 100', 'Username consists of lowercase English letters.'],
  },
  'cf-266B': {
    description: 'During the break the schoolchildren, bored, parsing a queue of `n` people, stood in a line one by one. There are boys (denoted by `B`) and girls (denoted by `G`) in the queue.\n\nEvery second, a boy standing immediately before a girl swaps positions with her. After `t` seconds, print the resulting queue.\n\n**Input:** The first line contains `n` and `t`. The second line contains the initial arrangement as a string of characters B and G.\n\n**Output:** Output the arrangement after `t` seconds.',
    constraints: ['1 ≤ n, t ≤ 50'],
  },
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const arena = JSON.parse(fs.readFileSync(ARENA_PATH, 'utf-8'));
  let updated = 0;
  let failed = 0;

  for (const problem of arena) {
    // Remove diagram field
    delete problem.diagram;

    const known = KNOWN_DESCRIPTIONS[problem.id];
    if (known) {
      problem.description = known.description;
      problem.constraints = known.constraints;
      updated++;
      console.log(`✓ ${problem.id} — ${problem.title} (from known data)`);
      continue;
    }

    // Fallback: try LeetCode API for unknown LeetCode problems
    if (problem.source === 'LeetCode') {
      const slug = titleToSlug(problem.title);
      try {
        const data = await fetchLeetCode(slug);
        const md = htmlToMarkdown(data.content);
        problem.description = extractDescription(md);
        const cons = extractConstraints(md);
        if (cons) problem.constraints = cons;
        updated++;
        console.log(`✓ ${problem.id} — ${problem.title} (from LeetCode API)`);
        // Rate limit
        await new Promise((r) => setTimeout(r, 500));
      } catch (err) {
        console.error(`✗ ${problem.id} — ${problem.title}: ${err.message}`);
        failed++;
      }
      continue;
    }

    // Fallback: try Codeforces for unknown CF problems
    if (problem.source === 'Codeforces') {
      const match = problem.id.match(/^cf-(\d+)([A-Z]\d?)$/i);
      if (match) {
        try {
          const data = await fetchCodeforces(match[1], match[2]);
          if (data.description) {
            let desc = data.description;
            if (data.inputSpec) desc += `\n\n**Input:** ${data.inputSpec}`;
            if (data.outputSpec) desc += `\n\n**Output:** ${data.outputSpec}`;
            problem.description = desc;
          }
          if (data.constraints.length > 0) problem.constraints = data.constraints;
          updated++;
          console.log(`✓ ${problem.id} — ${problem.title} (from Codeforces)`);
          await new Promise((r) => setTimeout(r, 500));
        } catch (err) {
          console.error(`✗ ${problem.id} — ${problem.title}: ${err.message}`);
          failed++;
        }
      }
      continue;
    }

    console.log(`- ${problem.id} — ${problem.title}: skipped (unknown source)`);
  }

  // Write updated JSON
  fs.writeFileSync(ARENA_PATH, JSON.stringify(arena, null, 2) + '\n', 'utf-8');

  console.log(`\nDone! Updated: ${updated}, Failed: ${failed}, Total: ${arena.length}`);
}

main().catch(console.error);
