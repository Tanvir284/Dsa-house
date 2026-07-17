export interface DailyChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string;
  description: string;
  example: string;
  hint: string;
  topicSlug: string;
  xpReward: number;
}

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc-1',
    title: 'Two Sum',
    difficulty: 'Easy',
    pattern: 'Hash Table',
    description: 'Given an array of integers and a target, return indices of two numbers that add up to target.',
    example: 'nums = [2,7,11,15], target = 9 → [0,1]',
    hint: 'Store each value and its index while scanning. Check if complement exists.',
    topicSlug: 'hash-table',
    xpReward: 75,
  },
  {
    id: 'dc-2',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    pattern: 'Two Pointers',
    description: 'Determine if a string reads the same forward and backward, ignoring non-alphanumeric case.',
    example: '"A man, a plan, a canal: Panama" → true',
    hint: 'Use left/right pointers, skip invalid chars, compare lowercase.',
    topicSlug: 'two-pointers',
    xpReward: 75,
  },
  {
    id: 'dc-3',
    title: 'Longest Substring Without Repeating',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    description: 'Find the length of the longest substring without repeating characters.',
    example: '"abcabcbb" → 3 ("abc")',
    hint: 'Expand right; shrink left while duplicate exists in window map.',
    topicSlug: 'sliding-window',
    xpReward: 100,
  },
  {
    id: 'dc-4',
    title: 'Kth Largest Element',
    difficulty: 'Medium',
    pattern: 'Heap',
    description: 'Find the k-th largest element in an unsorted array.',
    example: 'nums = [3,2,1,5,6,4], k = 2 → 5',
    hint: 'Maintain a min-heap of size k, or use quickselect.',
    topicSlug: 'heap',
    xpReward: 100,
  },
  {
    id: 'dc-5',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    pattern: 'Dynamic Programming',
    description: 'Count distinct ways to climb n stairs taking 1 or 2 steps at a time.',
    example: 'n = 3 → 3 ways',
    hint: 'dp[i] = dp[i-1] + dp[i-2], same as Fibonacci.',
    topicSlug: 'dynamic-programming',
    xpReward: 80,
  },
  {
    id: 'dc-6',
    title: 'Subsets',
    difficulty: 'Medium',
    pattern: 'Backtracking',
    description: 'Return all possible subsets of a distinct integer array.',
    example: '[1,2,3] → [], [1], [2], [1,2], ...',
    hint: 'For each index, choose to include or skip — classic backtracking.',
    topicSlug: 'recursion-backtracking',
    xpReward: 100,
  },
  {
    id: 'dc-7',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    pattern: 'Greedy',
    description: 'Merge all overlapping intervals in a collection.',
    example: '[[1,3],[2,6],[8,10]] → [[1,6],[8,10]]',
    hint: 'Sort by start; merge if current overlaps previous end.',
    topicSlug: 'greedy-algorithms',
    xpReward: 100,
  },
];

export function getTodaysChallenge(): DailyChallenge {
  // Use local calendar dates so the challenge shown matches the completion key
  // (which is derived from the local todayKey), avoiding timezone/DST drift.
  // Building both anchors from local Y/M/D components sidesteps DST offsets
  // that would otherwise skew the elapsed-ms division by ±1 hour and flip the
  // day around DST transitions.
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayIndex = Math.round(
    (startOfToday.getTime() - startOfYear.getTime()) / 86400000
  );
  return DAILY_CHALLENGES[dayIndex % DAILY_CHALLENGES.length];
}
