import { CurriculumModule } from '@/types';
import { CATEGORY_IDS } from '../linear';

export const graphsBModules: CurriculumModule[] = [
  // 1. HAMILTONIAN PATH / CYCLE
  {
    topic: {
      id: 'ext-hamiltonian-pathcycle',
      slug: 'hamiltonian-pathcycle',
      category_id: CATEGORY_IDS.graphs,
      title: 'Hamiltonian Path & Cycle',
      definition: 'A Hamiltonian path is a path in a graph that visits every vertex exactly once; a Hamiltonian cycle is such a path that also returns to its starting vertex.',
      importance: 'Deciding whether a Hamiltonian path or cycle exists is a classic NP-complete problem underpinning the Travelling Salesman Problem, routing, and scheduling. Understanding it clarifies the boundary between tractable and intractable graph problems.',
      prerequisites: ['graph-representation', 'backtracking', 'depth-first-search'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(N^2 * 2^N) with bitmask DP',
      time_complexity_average: 'O(N!) naive backtracking',
      time_complexity_worst: 'O(N!) naive backtracking',
      space_complexity: 'O(N * 2^N) for DP table',
      display_order: 413,
    },
    sections: [
      {
        id: 'sec-hamiltonian-pathcycle-1',
        topic_id: 'ext-hamiltonian-pathcycle',
        title: 'Concept & Intuition',
        content: `Picture a travelling inspector who must visit **every city exactly once**. If a single tour exists that touches all cities without repeating any, that tour is a **Hamiltonian path**. If the inspector must also return home to close the loop, that is a **Hamiltonian cycle**.

The catch is that, unlike an Eulerian path (which visits every *edge* once and has an easy characterization), no simple local rule tells us whether a Hamiltonian path exists. We generally must **search** the space of orderings.

> [!NOTE]
> Do not confuse Hamiltonian (every **vertex** once) with Eulerian (every **edge** once). Eulerian existence is decided in $O(V + E)$; Hamiltonian existence is NP-complete.`,
        display_order: 1,
      },
      {
        id: 'sec-hamiltonian-pathcycle-2',
        topic_id: 'ext-hamiltonian-pathcycle',
        title: 'How It Works',
        content: `Two standard approaches:

**1. Backtracking.** Start at a vertex, extend the path to an unvisited neighbor, and recurse. If we get stuck before visiting all $N$ vertices, we backtrack and try another neighbor. For a cycle we additionally require an edge from the last vertex back to the start.

**2. Held–Karp bitmask DP.** Let $dp[mask][v]$ be true if there is a path covering exactly the set of vertices in $mask$ and ending at $v$. The transition is:
$$dp[mask][v] = \\bigvee_{u \\in mask,\\ (u,v) \\in E} dp[mask \\setminus \\{v\\}][u]$$
A Hamiltonian path exists if $dp[\\text{full}][v]$ is true for some $v$; a cycle additionally needs an edge $v \\to \\text{start}$.`,
        display_order: 2,
      },
      {
        id: 'sec-hamiltonian-pathcycle-3',
        topic_id: 'ext-hamiltonian-pathcycle',
        title: 'Complexity Analysis',
        content: `Naive backtracking explores up to $O(N!)$ orderings in the worst case, since any permutation of vertices could be a candidate path.

The **Held–Karp** dynamic program is dramatically better for moderate $N$: there are $2^N$ subsets and $N$ ending vertices, and each transition scans $N$ predecessors, giving:
$$O(N^2 \\cdot 2^N)\\ \\text{time},\\quad O(N \\cdot 2^N)\\ \\text{space}$$

This is exponential but practical up to roughly $N \\approx 20$. No polynomial algorithm is known, and finding one would resolve $P = NP$.`,
        display_order: 3,
      },
      {
        id: 'sec-hamiltonian-pathcycle-4',
        topic_id: 'ext-hamiltonian-pathcycle',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Bitmask DP memory grows as $N \\cdot 2^N$. At $N = 25$ that already exceeds most memory budgets, so know your input bounds before choosing it.

Common mistakes:
- Confusing "path" with "cycle" — remember the extra edge-back-to-start requirement for cycles.
- Forgetting that a *disconnected* graph can never contain a Hamiltonian path.
- Assuming heuristics guarantee correctness; greedy nearest-neighbor may miss a valid tour.

Use cases: DNA fragment assembly, PCB drilling order, the decision core of the Travelling Salesman Problem, and puzzle solving (e.g., knight's tour).`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-hamiltonian-pathcycle-py',
        topic_id: 'ext-hamiltonian-pathcycle',
        language: 'python',
        is_optimized: true,
        code: `def hamiltonian_path_exists(adj, n):
    # Held-Karp bitmask DP: dp[mask][v] = path covering 'mask' ending at v
    dp = [[False] * n for _ in range(1 << n)]
    for v in range(n):
        dp[1 << v][v] = True
    for mask in range(1 << n):
        for v in range(n):
            if not dp[mask][v]:
                continue
            for u in range(n):
                if adj[v][u] and not (mask & (1 << u)):
                    dp[mask | (1 << u)][u] = True
    full = (1 << n) - 1
    return any(dp[full][v] for v in range(n))`,
        explanation: 'Held-Karp dynamic programming decides Hamiltonian path existence in O(n^2 * 2^n) time.',
      },
      {
        id: 'snip-hamiltonian-pathcycle-js',
        topic_id: 'ext-hamiltonian-pathcycle',
        language: 'javascript',
        is_optimized: true,
        code: `function hamiltonianPathExists(adj, n) {
  // dp[mask][v]: reachable set 'mask' ending at vertex v
  const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(false));
  for (let v = 0; v < n; v++) dp[1 << v][v] = true;
  for (let mask = 0; mask < (1 << n); mask++) {
    for (let v = 0; v < n; v++) {
      if (!dp[mask][v]) continue;
      for (let u = 0; u < n; u++) {
        if (adj[v][u] && !(mask & (1 << u))) {
          dp[mask | (1 << u)][u] = true;
        }
      }
    }
  }
  const full = (1 << n) - 1;
  for (let v = 0; v < n; v++) if (dp[full][v]) return true;
  return false;
}`,
        explanation: 'JavaScript port of the Held-Karp bitmask DP for Hamiltonian path detection.',
      },
      {
        id: 'snip-hamiltonian-pathcycle-cpp',
        topic_id: 'ext-hamiltonian-pathcycle',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

bool hamiltonianPathExists(const vector<vector<bool>>& adj, int n) {
    vector<vector<bool>> dp(1 << n, vector<bool>(n, false));
    for (int v = 0; v < n; ++v) dp[1 << v][v] = true;
    for (int mask = 0; mask < (1 << n); ++mask) {
        for (int v = 0; v < n; ++v) {
            if (!dp[mask][v]) continue;
            for (int u = 0; u < n; ++u) {
                if (adj[v][u] && !(mask & (1 << u)))
                    dp[mask | (1 << u)][u] = true;
            }
        }
    }
    int full = (1 << n) - 1;
    for (int v = 0; v < n; ++v) if (dp[full][v]) return true;
    return false;
}`,
        explanation: 'C++ Held-Karp DP; the outer loop iterates over subsets ordered by inclusion.',
      },
      {
        id: 'snip-hamiltonian-pathcycle-java',
        topic_id: 'ext-hamiltonian-pathcycle',
        language: 'java',
        is_optimized: true,
        code: `public class Hamiltonian {
    public static boolean pathExists(boolean[][] adj, int n) {
        boolean[][] dp = new boolean[1 << n][n];
        for (int v = 0; v < n; v++) dp[1 << v][v] = true;
        for (int mask = 0; mask < (1 << n); mask++) {
            for (int v = 0; v < n; v++) {
                if (!dp[mask][v]) continue;
                for (int u = 0; u < n; u++) {
                    if (adj[v][u] && (mask & (1 << u)) == 0)
                        dp[mask | (1 << u)][u] = true;
                }
            }
        }
        int full = (1 << n) - 1;
        for (int v = 0; v < n; v++) if (dp[full][v]) return true;
        return false;
    }
}`,
        explanation: 'Java implementation of the bitmask DP deciding Hamiltonian path existence.',
      },
    ],
    quizId: 'quiz-ext-hamiltonian-pathcycle',
    quizTitle: 'Hamiltonian Path & Cycle Quiz',
    quizDescription: 'Test your understanding of Hamiltonian paths, cycles, and their complexity.',
    questions: [
      {
        id: 'q-hamiltonian-pathcycle-1',
        quiz_id: 'quiz-ext-hamiltonian-pathcycle',
        question_text: 'What distinguishes a Hamiltonian cycle from a Hamiltonian path?',
        question_type: 'MCQ',
        options: [
          'A cycle visits every edge once; a path visits every vertex once',
          'A cycle returns to the starting vertex, a path need not',
          'A path may repeat vertices; a cycle may not',
          'There is no difference',
        ],
        correct_option_index: 1,
        explanation: 'A Hamiltonian cycle is a Hamiltonian path that also has an edge closing back to the start.',
      },
      {
        id: 'q-hamiltonian-pathcycle-2',
        quiz_id: 'quiz-ext-hamiltonian-pathcycle',
        question_text: 'The Held-Karp bitmask DP for Hamiltonian path runs in polynomial time.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'It runs in O(N^2 * 2^N), which is exponential in N, not polynomial.',
      },
      {
        id: 'q-hamiltonian-pathcycle-3',
        quiz_id: 'quiz-ext-hamiltonian-pathcycle',
        question_text: 'What is the time complexity of the Held-Karp Hamiltonian-path DP?',
        question_type: 'COMPLEXITY',
        options: ['O(N!)', 'O(2^N)', 'O(N^2 * 2^N)', 'O(N^3)'],
        correct_option_index: 2,
        explanation: 'There are 2^N masks, N ending vertices, and an N-way transition, giving O(N^2 * 2^N).',
      },
    ],
  },
  // 2. FORD-FULKERSON MAX FLOW
  {
    topic: {
      id: 'ext-ford-fulkerson-max-flow',
      slug: 'ford-fulkerson-max-flow',
      category_id: CATEGORY_IDS.graphs,
      title: 'Ford–Fulkerson Max Flow',
      definition: 'Ford–Fulkerson is a method for computing the maximum flow in a flow network by repeatedly finding augmenting paths from source to sink in the residual graph and pushing flow along them.',
      importance: 'Maximum flow models a huge range of problems — bipartite matching, project selection, image segmentation, and network reliability. Ford–Fulkerson is the foundational method from which Edmonds–Karp and Dinic are derived.',
      prerequisites: ['graph-representation', 'depth-first-search'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(E * f) where f is max flow value',
      time_complexity_average: 'O(E * f)',
      time_complexity_worst: 'O(E * f) — may not terminate on irrational capacities',
      space_complexity: 'O(V + E)',
      display_order: 414,
    },
    sections: [
      {
        id: 'sec-ford-fulkerson-max-flow-1',
        topic_id: 'ext-ford-fulkerson-max-flow',
        title: 'Concept & Intuition',
        content: `Think of a network of water pipes. Each pipe (edge) has a **capacity** — the maximum litres per second it can carry. We want to push as much water as possible from a **source** $s$ to a **sink** $t$.

Ford–Fulkerson's insight: while there is still some path from $s$ to $t$ where every pipe has spare capacity (an **augmenting path**), send more water along it. Crucially, sending flow also creates a **residual reverse edge**, which lets later iterations "cancel" or reroute earlier decisions.

> [!NOTE]
> The residual graph is the heart of the method. A forward edge with capacity $c$ carrying flow $f$ leaves residual capacity $c - f$; the reverse residual edge gains capacity $f$.`,
        display_order: 1,
      },
      {
        id: 'sec-ford-fulkerson-max-flow-2',
        topic_id: 'ext-ford-fulkerson-max-flow',
        title: 'How It Works',
        content: `The method loops:
1. Build the **residual graph** with residual capacities.
2. Find any augmenting path $s \\to t$ (Ford–Fulkerson classically uses DFS).
3. Compute the **bottleneck** — the minimum residual capacity along that path.
4. Add the bottleneck to flow on forward edges and subtract it on reverse edges.
5. Repeat until no augmenting path exists.

When no augmenting path remains, the total flow equals the **minimum cut** capacity, by the Max-Flow Min-Cut theorem:
$$|f^*| = \\min_{(S,T)} \\; \\text{cap}(S, T)$$`,
        display_order: 2,
      },
      {
        id: 'sec-ford-fulkerson-max-flow-3',
        topic_id: 'ext-ford-fulkerson-max-flow',
        title: 'Complexity Analysis',
        content: `Each augmenting path increases the flow by at least $1$ when capacities are integers, so the number of iterations is at most $f$, the value of the max flow. Finding a path with DFS costs $O(E)$, giving:
$$O(E \\cdot f)\\ \\text{time}$$

This is **pseudo-polynomial** — it depends on the magnitude of the capacities, not just the graph size. With adversarial integer capacities the running time can blow up, and with **irrational** capacities the method may fail to terminate at all. Choosing shortest augmenting paths (Edmonds–Karp) removes this dependence on $f$.`,
        display_order: 3,
      },
      {
        id: 'sec-ford-fulkerson-max-flow-4',
        topic_id: 'ext-ford-fulkerson-max-flow',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Plain DFS-based Ford–Fulkerson can be pathologically slow (or non-terminating) on certain graphs. For guaranteed polynomial behavior, use Edmonds–Karp (BFS) or Dinic.

Common mistakes:
- Forgetting to add reverse residual edges — without them the method cannot correct suboptimal routing.
- Using floating-point capacities and expecting termination.
- Not resetting the visited markers between augmenting-path searches.

Use cases: bipartite matching, airline scheduling, network reliability, and any problem reducible to max-flow / min-cut.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-ford-fulkerson-max-flow-py',
        topic_id: 'ext-ford-fulkerson-max-flow',
        language: 'python',
        is_optimized: true,
        code: `def ford_fulkerson(capacity, source, sink, n):
    # capacity: n x n residual capacity matrix (mutated)
    def dfs(u, pushed, visited):
        if u == sink:
            return pushed
        visited[u] = True
        for v in range(n):
            if not visited[v] and capacity[u][v] > 0:
                d = dfs(v, min(pushed, capacity[u][v]), visited)
                if d > 0:
                    capacity[u][v] -= d
                    capacity[v][u] += d
                    return d
        return 0

    flow = 0
    while True:
        pushed = dfs(source, float('inf'), [False] * n)
        if pushed == 0:
            break
        flow += pushed
    return flow`,
        explanation: 'DFS-based augmenting path search; reverse edges accumulate cancellable flow.',
      },
      {
        id: 'snip-ford-fulkerson-max-flow-js',
        topic_id: 'ext-ford-fulkerson-max-flow',
        language: 'javascript',
        is_optimized: true,
        code: `function fordFulkerson(capacity, source, sink, n) {
  function dfs(u, pushed, visited) {
    if (u === sink) return pushed;
    visited[u] = true;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && capacity[u][v] > 0) {
        const d = dfs(v, Math.min(pushed, capacity[u][v]), visited);
        if (d > 0) {
          capacity[u][v] -= d;
          capacity[v][u] += d;
          return d;
        }
      }
    }
    return 0;
  }
  let flow = 0;
  while (true) {
    const pushed = dfs(source, Infinity, new Array(n).fill(false));
    if (pushed === 0) break;
    flow += pushed;
  }
  return flow;
}`,
        explanation: 'JavaScript Ford-Fulkerson over an adjacency-matrix residual network.',
      },
      {
        id: 'snip-ford-fulkerson-max-flow-cpp',
        topic_id: 'ext-ford-fulkerson-max-flow',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

int n;
int dfs(vector<vector<int>>& cap, int u, int sink, int pushed, vector<bool>& vis) {
    if (u == sink) return pushed;
    vis[u] = true;
    for (int v = 0; v < n; ++v) {
        if (!vis[v] && cap[u][v] > 0) {
            int d = dfs(cap, v, sink, min(pushed, cap[u][v]), vis);
            if (d > 0) { cap[u][v] -= d; cap[v][u] += d; return d; }
        }
    }
    return 0;
}

int fordFulkerson(vector<vector<int>>& cap, int source, int sink) {
    int flow = 0, pushed;
    do {
        vector<bool> vis(n, false);
        pushed = dfs(cap, source, sink, INT_MAX, vis);
        flow += pushed;
    } while (pushed > 0);
    return flow;
}`,
        explanation: 'C++ Ford-Fulkerson; the global n holds the vertex count for the matrix.',
      },
      {
        id: 'snip-ford-fulkerson-max-flow-java',
        topic_id: 'ext-ford-fulkerson-max-flow',
        language: 'java',
        is_optimized: true,
        code: `public class FordFulkerson {
    static int n;
    static int dfs(int[][] cap, int u, int sink, int pushed, boolean[] vis) {
        if (u == sink) return pushed;
        vis[u] = true;
        for (int v = 0; v < n; v++) {
            if (!vis[v] && cap[u][v] > 0) {
                int d = dfs(cap, v, sink, Math.min(pushed, cap[u][v]), vis);
                if (d > 0) { cap[u][v] -= d; cap[v][u] += d; return d; }
            }
        }
        return 0;
    }
    public static int maxFlow(int[][] cap, int source, int sink) {
        n = cap.length;
        int flow = 0, pushed;
        do {
            pushed = dfs(cap, source, sink, Integer.MAX_VALUE, new boolean[n]);
            flow += pushed;
        } while (pushed > 0);
        return flow;
    }
}`,
        explanation: 'Java Ford-Fulkerson using a residual capacity matrix and DFS augmentation.',
      },
    ],
    quizId: 'quiz-ext-ford-fulkerson-max-flow',
    quizTitle: 'Ford–Fulkerson Max Flow Quiz',
    quizDescription: 'Check your grasp of augmenting paths, residual graphs, and max-flow min-cut.',
    questions: [
      {
        id: 'q-ford-fulkerson-max-flow-1',
        quiz_id: 'quiz-ext-ford-fulkerson-max-flow',
        question_text: 'Why does Ford–Fulkerson add reverse (residual) edges?',
        question_type: 'MCQ',
        options: [
          'To make the graph undirected',
          'To allow later iterations to cancel or reroute previously pushed flow',
          'To double the total capacity',
          'They are only for visualization',
        ],
        correct_option_index: 1,
        explanation: 'Reverse residual edges let subsequent augmenting paths undo earlier, suboptimal routing decisions.',
      },
      {
        id: 'q-ford-fulkerson-max-flow-2',
        quiz_id: 'quiz-ext-ford-fulkerson-max-flow',
        question_text: 'The value of the maximum flow equals the capacity of the minimum cut.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'This is the Max-Flow Min-Cut theorem, central to flow theory.',
      },
      {
        id: 'q-ford-fulkerson-max-flow-3',
        quiz_id: 'quiz-ext-ford-fulkerson-max-flow',
        question_text: 'What is the worst-case time complexity of DFS-based Ford–Fulkerson with integer capacities?',
        question_type: 'COMPLEXITY',
        options: ['O(V + E)', 'O(E * f) where f is the max flow value', 'O(V^2 * E)', 'O(E * log V)'],
        correct_option_index: 1,
        explanation: 'Each augmentation adds at least 1 unit, and a path costs O(E), giving O(E * f) — pseudo-polynomial.',
      },
    ],
  },
  // 3. EDMONDS-KARP MAX FLOW
  {
    topic: {
      id: 'ext-edmonds-karp-max-flow',
      slug: 'edmonds-karp-max-flow',
      category_id: CATEGORY_IDS.graphs,
      title: 'Edmonds–Karp Max Flow',
      definition: 'Edmonds–Karp is a specific implementation of Ford–Fulkerson that always chooses the shortest augmenting path (by number of edges) using breadth-first search, guaranteeing a polynomial running time.',
      importance: 'By using BFS to find augmenting paths, Edmonds–Karp removes Ford–Fulkerson\'s dependence on the flow value, giving a strongly polynomial bound and making max-flow reliable regardless of capacity magnitudes.',
      prerequisites: ['ford-fulkerson-max-flow', 'breadth-first-search'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(V * E^2)',
      time_complexity_average: 'O(V * E^2)',
      time_complexity_worst: 'O(V * E^2)',
      space_complexity: 'O(V + E)',
      display_order: 415,
    },
    sections: [
      {
        id: 'sec-edmonds-karp-max-flow-1',
        topic_id: 'ext-edmonds-karp-max-flow',
        title: 'Concept & Intuition',
        content: `Edmonds–Karp is Ford–Fulkerson with one disciplined rule: **always augment along the shortest path** (fewest edges) from source to sink. We find that path with a breadth-first search over the residual graph.

Why does this help? Choosing the shortest path guarantees the BFS distance from the source to any vertex **never decreases** across iterations, and each edge can become "saturated and critical" only a bounded number of times. That structural guarantee is what turns the unpredictable Ford–Fulkerson into a predictable polynomial algorithm.

> [!NOTE]
> Same residual-graph mechanics as Ford–Fulkerson — the only change is BFS instead of arbitrary DFS for finding augmenting paths.`,
        display_order: 1,
      },
      {
        id: 'sec-edmonds-karp-max-flow-2',
        topic_id: 'ext-edmonds-karp-max-flow',
        title: 'How It Works',
        content: `Repeat until no augmenting path exists:
1. Run **BFS** from $s$ in the residual graph, recording a parent pointer for each reached vertex.
2. If $t$ is unreachable, stop — the current flow is maximum.
3. Otherwise trace parents from $t$ back to $s$ to recover the shortest augmenting path.
4. Find the **bottleneck** residual capacity along it.
5. Update forward and reverse residual capacities by the bottleneck.

Because BFS visits vertices in non-decreasing distance order, the recovered path is guaranteed to be a shortest one in terms of edge count.`,
        display_order: 2,
      },
      {
        id: 'sec-edmonds-karp-max-flow-3',
        topic_id: 'ext-edmonds-karp-max-flow',
        title: 'Complexity Analysis',
        content: `The key lemma: each of the $E$ edges can become the **critical (saturating) edge** of an augmenting path at most $O(V)$ times, because the source-distance of its endpoints strictly increases between two such events. There are therefore $O(V \\cdot E)$ augmentations total, and each BFS costs $O(E)$:
$$O(V \\cdot E^2)\\ \\text{time}$$

This bound is independent of the capacity values, unlike Ford–Fulkerson's $O(E \\cdot f)$. For denser graphs Dinic's algorithm improves this further to $O(V^2 E)$.`,
        display_order: 3,
      },
      {
        id: 'sec-edmonds-karp-max-flow-4',
        topic_id: 'ext-edmonds-karp-max-flow',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Edmonds–Karp is still slower than Dinic on large graphs. Use it when clarity matters or graphs are modest; reach for Dinic when performance is critical.

Common mistakes:
- Using DFS instead of BFS — that reverts you to plain Ford–Fulkerson and forfeits the polynomial guarantee.
- Reconstructing the path incorrectly when parent pointers are not reset each BFS.
- Overflowing integer flow accumulators on very large capacities.

Use cases: bipartite matching, min-cut computation, scheduling, and as a dependable default when capacity magnitudes are large.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-edmonds-karp-max-flow-py',
        topic_id: 'ext-edmonds-karp-max-flow',
        language: 'python',
        is_optimized: true,
        code: `from collections import deque

def edmonds_karp(capacity, source, sink, n):
    flow = 0
    while True:
        parent = [-1] * n
        parent[source] = source
        q = deque([source])
        while q:
            u = q.popleft()
            for v in range(n):
                if parent[v] == -1 and capacity[u][v] > 0:
                    parent[v] = u
                    q.append(v)
        if parent[sink] == -1:
            break
        # find bottleneck along the shortest path
        push = float('inf')
        v = sink
        while v != source:
            push = min(push, capacity[parent[v]][v])
            v = parent[v]
        v = sink
        while v != source:
            capacity[parent[v]][v] -= push
            capacity[v][parent[v]] += push
            v = parent[v]
        flow += push
    return flow`,
        explanation: 'BFS finds the shortest augmenting path, guaranteeing O(V * E^2) total time.',
      },
      {
        id: 'snip-edmonds-karp-max-flow-js',
        topic_id: 'ext-edmonds-karp-max-flow',
        language: 'javascript',
        is_optimized: true,
        code: `function edmondsKarp(capacity, source, sink, n) {
  let flow = 0;
  while (true) {
    const parent = new Array(n).fill(-1);
    parent[source] = source;
    const queue = [source];
    while (queue.length) {
      const u = queue.shift();
      for (let v = 0; v < n; v++) {
        if (parent[v] === -1 && capacity[u][v] > 0) {
          parent[v] = u;
          queue.push(v);
        }
      }
    }
    if (parent[sink] === -1) break;
    let push = Infinity;
    for (let v = sink; v !== source; v = parent[v]) {
      push = Math.min(push, capacity[parent[v]][v]);
    }
    for (let v = sink; v !== source; v = parent[v]) {
      capacity[parent[v]][v] -= push;
      capacity[v][parent[v]] += push;
    }
    flow += push;
  }
  return flow;
}`,
        explanation: 'JavaScript Edmonds-Karp using a BFS queue and parent backtracking.',
      },
      {
        id: 'snip-edmonds-karp-max-flow-cpp',
        topic_id: 'ext-edmonds-karp-max-flow',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <queue>
#include <climits>
#include <algorithm>
using namespace std;

int edmondsKarp(vector<vector<int>>& cap, int s, int t, int n) {
    int flow = 0;
    while (true) {
        vector<int> parent(n, -1);
        parent[s] = s;
        queue<int> q; q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v = 0; v < n; ++v)
                if (parent[v] == -1 && cap[u][v] > 0) {
                    parent[v] = u; q.push(v);
                }
        }
        if (parent[t] == -1) break;
        int push = INT_MAX;
        for (int v = t; v != s; v = parent[v])
            push = min(push, cap[parent[v]][v]);
        for (int v = t; v != s; v = parent[v]) {
            cap[parent[v]][v] -= push;
            cap[v][parent[v]] += push;
        }
        flow += push;
    }
    return flow;
}`,
        explanation: 'C++ Edmonds-Karp with an STL queue; strongly polynomial O(V * E^2).',
      },
      {
        id: 'snip-edmonds-karp-max-flow-java',
        topic_id: 'ext-edmonds-karp-max-flow',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class EdmondsKarp {
    public static int maxFlow(int[][] cap, int s, int t, int n) {
        int flow = 0;
        while (true) {
            int[] parent = new int[n];
            Arrays.fill(parent, -1);
            parent[s] = s;
            Queue<Integer> q = new ArrayDeque<>();
            q.add(s);
            while (!q.isEmpty()) {
                int u = q.poll();
                for (int v = 0; v < n; v++)
                    if (parent[v] == -1 && cap[u][v] > 0) {
                        parent[v] = u; q.add(v);
                    }
            }
            if (parent[t] == -1) break;
            int push = Integer.MAX_VALUE;
            for (int v = t; v != s; v = parent[v])
                push = Math.min(push, cap[parent[v]][v]);
            for (int v = t; v != s; v = parent[v]) {
                cap[parent[v]][v] -= push;
                cap[v][parent[v]] += push;
            }
            flow += push;
        }
        return flow;
    }
}`,
        explanation: 'Java Edmonds-Karp using ArrayDeque for BFS and parent tracing for augmentation.',
      },
    ],
    quizId: 'quiz-ext-edmonds-karp-max-flow',
    quizTitle: 'Edmonds–Karp Max Flow Quiz',
    quizDescription: 'Check your grasp of BFS-based augmenting paths and their polynomial guarantee.',
    questions: [
      {
        id: 'q-edmonds-karp-max-flow-1',
        quiz_id: 'quiz-ext-edmonds-karp-max-flow',
        question_text: 'What is the essential difference between Edmonds–Karp and generic Ford–Fulkerson?',
        question_type: 'MCQ',
        options: [
          'Edmonds–Karp uses BFS to always pick the shortest augmenting path',
          'Edmonds–Karp does not use residual edges',
          'Edmonds–Karp works only on undirected graphs',
          'Edmonds–Karp ignores edge capacities',
        ],
        correct_option_index: 0,
        explanation: 'Choosing the shortest augmenting path via BFS is what yields the polynomial bound.',
      },
      {
        id: 'q-edmonds-karp-max-flow-2',
        quiz_id: 'quiz-ext-edmonds-karp-max-flow',
        question_text: 'Edmonds–Karp\'s running time depends on the magnitude of the edge capacities.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Its O(V * E^2) bound is independent of capacity values, unlike Ford–Fulkerson.',
      },
      {
        id: 'q-edmonds-karp-max-flow-3',
        quiz_id: 'quiz-ext-edmonds-karp-max-flow',
        question_text: 'What is the time complexity of Edmonds–Karp?',
        question_type: 'COMPLEXITY',
        options: ['O(E * f)', 'O(V * E^2)', 'O(V^2 * E)', 'O(V + E)'],
        correct_option_index: 1,
        explanation: 'O(V * E) augmentations, each requiring an O(E) BFS, gives O(V * E^2).',
      },
    ],
  },
  // 4. DINIC'S ALGORITHM
  {
    topic: {
      id: 'ext-dinics-algorithm',
      slug: 'dinics-algorithm',
      category_id: CATEGORY_IDS.graphs,
      title: 'Dinic\'s Algorithm',
      definition: 'Dinic\'s algorithm computes maximum flow by repeatedly building a level graph with BFS and then sending blocking flow along shortest augmenting paths with DFS, reusing work across many paths in each phase.',
      importance: 'Dinic is the workhorse max-flow algorithm in competitive programming and practice: it runs in O(V^2 E) generally and O(E * sqrt(V)) on unit-capacity graphs, making bipartite matching and dense flow problems fast.',
      prerequisites: ['edmonds-karp-max-flow', 'breadth-first-search', 'depth-first-search'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(E * sqrt(V)) on unit-capacity networks',
      time_complexity_average: 'O(V^2 * E)',
      time_complexity_worst: 'O(V^2 * E)',
      space_complexity: 'O(V + E)',
      display_order: 416,
    },
    sections: [
      {
        id: 'sec-dinics-algorithm-1',
        topic_id: 'ext-dinics-algorithm',
        title: 'Concept & Intuition',
        content: `Edmonds–Karp finds shortest augmenting paths **one at a time**. Dinic's key idea is to find **many** shortest paths of the same length in a single sweep, batching the work into *phases*.

Each phase first computes a **level graph**: BFS labels every vertex with its distance from the source, and we keep only edges that go from level $L$ to level $L+1$. Within this layered DAG we push a **blocking flow** — flow such that every source-to-sink path has at least one saturated edge — using DFS.

> [!TIP]
> A "phase" corresponds to one shortest-path length. Since the shortest distance strictly grows between phases, there are at most $V$ phases.`,
        display_order: 1,
      },
      {
        id: 'sec-dinics-algorithm-2',
        topic_id: 'ext-dinics-algorithm',
        title: 'How It Works',
        content: `Repeat until $t$ is unreachable in the residual graph:
1. **BFS** from $s$ to assign levels; if $t$ has no level, stop.
2. **DFS** repeatedly from $s$ to push blocking flow, only moving from level $L$ to level $L+1$.
3. Maintain an **iterator/pointer** per vertex (\`current-edge\` optimization) so DFS never revisits a dead edge within the same phase.

The current-edge pointer is essential: it ensures each edge is examined a bounded number of times per phase, which is where the efficiency comes from. Each phase produces a blocking flow in $O(VE)$.`,
        display_order: 2,
      },
      {
        id: 'sec-dinics-algorithm-3',
        topic_id: 'ext-dinics-algorithm',
        title: 'Complexity Analysis',
        content: `There are at most $V$ phases because the shortest $s$–$t$ distance strictly increases after each blocking flow. Each phase computes a blocking flow in $O(VE)$ time using the current-edge optimization, giving:
$$O(V^2 \\cdot E)\\ \\text{time}$$

On **unit-capacity** networks (as in bipartite matching) the number of phases is only $O(\\sqrt{V})$ and each phase is $O(E)$, improving the bound to:
$$O(E \\sqrt{V})$$

This is why Hopcroft–Karp (a specialization of these ideas) matches bipartite graphs so efficiently.`,
        display_order: 3,
      },
      {
        id: 'sec-dinics-algorithm-4',
        topic_id: 'ext-dinics-algorithm',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Omitting the current-edge (iterator) optimization degrades a phase to $O(VE)$ **per path**, destroying the complexity guarantee. It is not optional.

Common mistakes:
- Rebuilding the level graph inside the DFS instead of once per phase.
- Forgetting to reset the per-vertex edge iterators at the start of each phase.
- Storing edges as a matrix on large sparse graphs — use an edge list with paired reverse edges.

Use cases: bipartite matching, project selection, image segmentation, and any large-scale min-cut / max-flow computation.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-dinics-algorithm-py',
        topic_id: 'ext-dinics-algorithm',
        language: 'python',
        is_optimized: true,
        code: `from collections import deque

class Dinic:
    def __init__(self, n):
        self.n = n
        self.graph = [[] for _ in range(n)]  # each edge: [to, cap, rev_index]

    def add_edge(self, u, v, cap):
        self.graph[u].append([v, cap, len(self.graph[v])])
        self.graph[v].append([u, 0, len(self.graph[u]) - 1])

    def bfs(self, s, t):
        self.level = [-1] * self.n
        self.level[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for v, cap, _ in self.graph[u]:
                if cap > 0 and self.level[v] < 0:
                    self.level[v] = self.level[u] + 1
                    q.append(v)
        return self.level[t] >= 0

    def dfs(self, u, t, pushed):
        if u == t:
            return pushed
        while self.it[u] < len(self.graph[u]):
            edge = self.graph[u][self.it[u]]
            v, cap, rev = edge
            if cap > 0 and self.level[v] == self.level[u] + 1:
                d = self.dfs(v, t, min(pushed, cap))
                if d > 0:
                    edge[1] -= d
                    self.graph[v][rev][1] += d
                    return d
            self.it[u] += 1
        return 0

    def max_flow(self, s, t):
        flow = 0
        while self.bfs(s, t):
            self.it = [0] * self.n
            while True:
                f = self.dfs(s, t, float('inf'))
                if f == 0:
                    break
                flow += f
        return flow`,
        explanation: 'Level-graph BFS plus blocking-flow DFS with the current-edge (self.it) optimization.',
      },
      {
        id: 'snip-dinics-algorithm-js',
        topic_id: 'ext-dinics-algorithm',
        language: 'javascript',
        is_optimized: true,
        code: `class Dinic {
  constructor(n) {
    this.n = n;
    this.graph = Array.from({ length: n }, () => []); // edge: {to, cap, rev}
  }
  addEdge(u, v, cap) {
    this.graph[u].push({ to: v, cap, rev: this.graph[v].length });
    this.graph[v].push({ to: u, cap: 0, rev: this.graph[u].length - 1 });
  }
  bfs(s, t) {
    this.level = new Array(this.n).fill(-1);
    this.level[s] = 0;
    const q = [s];
    while (q.length) {
      const u = q.shift();
      for (const e of this.graph[u]) {
        if (e.cap > 0 && this.level[e.to] < 0) {
          this.level[e.to] = this.level[u] + 1;
          q.push(e.to);
        }
      }
    }
    return this.level[t] >= 0;
  }
  dfs(u, t, pushed) {
    if (u === t) return pushed;
    for (; this.it[u] < this.graph[u].length; this.it[u]++) {
      const e = this.graph[u][this.it[u]];
      if (e.cap > 0 && this.level[e.to] === this.level[u] + 1) {
        const d = this.dfs(e.to, t, Math.min(pushed, e.cap));
        if (d > 0) {
          e.cap -= d;
          this.graph[e.to][e.rev].cap += d;
          return d;
        }
      }
    }
    return 0;
  }
  maxFlow(s, t) {
    let flow = 0;
    while (this.bfs(s, t)) {
      this.it = new Array(this.n).fill(0);
      let f;
      while ((f = this.dfs(s, t, Infinity)) > 0) flow += f;
    }
    return flow;
  }
}`,
        explanation: 'JavaScript Dinic using an edge list with paired reverse edges and per-phase iterators.',
      },
      {
        id: 'snip-dinics-algorithm-cpp',
        topic_id: 'ext-dinics-algorithm',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <queue>
#include <climits>
using namespace std;

struct Dinic {
    struct Edge { int to, cap, rev; };
    vector<vector<Edge>> g;
    vector<int> level, it;
    Dinic(int n) : g(n), level(n), it(n) {}

    void add_edge(int u, int v, int cap) {
        g[u].push_back({v, cap, (int)g[v].size()});
        g[v].push_back({u, 0, (int)g[u].size() - 1});
    }
    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        queue<int> q; level[s] = 0; q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& e : g[u])
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[u] + 1; q.push(e.to);
                }
        }
        return level[t] >= 0;
    }
    int dfs(int u, int t, int pushed) {
        if (u == t) return pushed;
        for (int& i = it[u]; i < (int)g[u].size(); ++i) {
            Edge& e = g[u][i];
            if (e.cap > 0 && level[e.to] == level[u] + 1) {
                int d = dfs(e.to, t, min(pushed, e.cap));
                if (d > 0) { e.cap -= d; g[e.to][e.rev].cap += d; return d; }
            }
        }
        return 0;
    }
    long long max_flow(int s, int t) {
        long long flow = 0;
        while (bfs(s, t)) {
            fill(it.begin(), it.end(), 0);
            int f;
            while ((f = dfs(s, t, INT_MAX)) > 0) flow += f;
        }
        return flow;
    }
};`,
        explanation: 'C++ Dinic with struct-based edges; reference iterator int& i implements the current-edge trick.',
      },
      {
        id: 'snip-dinics-algorithm-java',
        topic_id: 'ext-dinics-algorithm',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class Dinic {
    static class Edge { int to, cap, rev; Edge(int t, int c, int r){to=t;cap=c;rev=r;} }
    List<Edge>[] g; int[] level, it; int n;

    @SuppressWarnings("unchecked")
    Dinic(int n) {
        this.n = n; g = new List[n];
        for (int i = 0; i < n; i++) g[i] = new ArrayList<>();
        level = new int[n]; it = new int[n];
    }
    void addEdge(int u, int v, int cap) {
        g[u].add(new Edge(v, cap, g[v].size()));
        g[v].add(new Edge(u, 0, g[u].size() - 1));
    }
    boolean bfs(int s, int t) {
        Arrays.fill(level, -1);
        ArrayDeque<Integer> q = new ArrayDeque<>();
        level[s] = 0; q.add(s);
        while (!q.isEmpty()) {
            int u = q.poll();
            for (Edge e : g[u])
                if (e.cap > 0 && level[e.to] < 0) { level[e.to] = level[u] + 1; q.add(e.to); }
        }
        return level[t] >= 0;
    }
    int dfs(int u, int t, int pushed) {
        if (u == t) return pushed;
        for (; it[u] < g[u].size(); it[u]++) {
            Edge e = g[u].get(it[u]);
            if (e.cap > 0 && level[e.to] == level[u] + 1) {
                int d = dfs(e.to, t, Math.min(pushed, e.cap));
                if (d > 0) { e.cap -= d; g[e.to].get(e.rev).cap += d; return d; }
            }
        }
        return 0;
    }
    long maxFlow(int s, int t) {
        long flow = 0;
        while (bfs(s, t)) {
            Arrays.fill(it, 0);
            int f;
            while ((f = dfs(s, t, Integer.MAX_VALUE)) > 0) flow += f;
        }
        return flow;
    }
}`,
        explanation: 'Java Dinic with adjacency lists of Edge objects and per-phase iterator array it.',
      },
    ],
    quizId: 'quiz-ext-dinics-algorithm',
    quizTitle: 'Dinic\'s Algorithm Quiz',
    quizDescription: 'Assess your grasp of level graphs, blocking flows, and Dinic\'s complexity.',
    questions: [
      {
        id: 'q-dinics-algorithm-1',
        quiz_id: 'quiz-ext-dinics-algorithm',
        question_text: 'What does Dinic\'s algorithm build with BFS at the start of each phase?',
        question_type: 'MCQ',
        options: [
          'A minimum spanning tree',
          'A level graph assigning each vertex its distance from the source',
          'A random shuffle of edges',
          'A topological ordering of the whole graph',
        ],
        correct_option_index: 1,
        explanation: 'BFS assigns levels, and DFS then pushes blocking flow along level+1 edges only.',
      },
      {
        id: 'q-dinics-algorithm-2',
        quiz_id: 'quiz-ext-dinics-algorithm',
        question_text: 'The current-edge (iterator) optimization is optional and does not affect Dinic\'s complexity.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Without it, a phase is no longer O(VE) and the overall O(V^2 E) bound is lost.',
      },
      {
        id: 'q-dinics-algorithm-3',
        quiz_id: 'quiz-ext-dinics-algorithm',
        question_text: 'What is Dinic\'s time complexity on a general network?',
        question_type: 'COMPLEXITY',
        options: ['O(V * E^2)', 'O(V^2 * E)', 'O(E * f)', 'O(V + E)'],
        correct_option_index: 1,
        explanation: 'At most V phases, each computing a blocking flow in O(VE), gives O(V^2 * E).',
      },
    ],
  },
  // 5. HOPCROFT-KARP BIPARTITE MATCHING
  {
    topic: {
      id: 'ext-hopcroft-karp-bipartite-matching',
      slug: 'hopcroft-karp-bipartite-matching',
      category_id: CATEGORY_IDS.graphs,
      title: 'Hopcroft–Karp Bipartite Matching',
      definition: 'Hopcroft–Karp finds a maximum-cardinality matching in a bipartite graph by repeatedly using BFS to find all shortest augmenting paths at once, then augmenting along a maximal set of vertex-disjoint such paths with DFS.',
      importance: 'It is the fastest classical algorithm for maximum bipartite matching, running in O(E * sqrt(V)), and it powers assignment problems, scheduling, and many reductions in combinatorial optimization.',
      prerequisites: ['bipartite-graphs', 'breadth-first-search', 'depth-first-search'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(E * sqrt(V))',
      time_complexity_average: 'O(E * sqrt(V))',
      time_complexity_worst: 'O(E * sqrt(V))',
      space_complexity: 'O(V + E)',
      display_order: 417,
    },
    sections: [
      {
        id: 'sec-hopcroft-karp-bipartite-matching-1',
        topic_id: 'ext-hopcroft-karp-bipartite-matching',
        title: 'Concept & Intuition',
        content: `Imagine matching applicants to jobs: each applicant can take certain jobs, and we want to fill as many jobs as possible with at most one applicant each. That is a **maximum bipartite matching**.

The naive Hungarian-style augmenting approach finds one augmenting path at a time. Hopcroft–Karp's insight, borrowed from Dinic, is to find **all shortest augmenting paths simultaneously** in phases. Handling many disjoint paths per phase reduces the number of phases to $O(\\sqrt{V})$.

> [!NOTE]
> An **augmenting path** alternates between unmatched and matched edges, starting and ending at free (unmatched) vertices. Flipping the edges along it increases the matching size by one.`,
        display_order: 1,
      },
      {
        id: 'sec-hopcroft-karp-bipartite-matching-2',
        topic_id: 'ext-hopcroft-karp-bipartite-matching',
        title: 'How It Works',
        content: `Each phase:
1. **BFS** from all free vertices on the left, layering the graph by alternating-path distance, until free right vertices are reached. This computes the length of the shortest augmenting path.
2. **DFS** from each free left vertex to greedily find a **maximal set of vertex-disjoint** shortest augmenting paths, flipping each one found.
3. Repeat phases until BFS finds no more augmenting paths.

We track \`matchL[u]\` and \`matchR[v]\`, the partner of each left/right vertex (or a NIL sentinel). Each augmenting path found flips these pointers.`,
        display_order: 2,
      },
      {
        id: 'sec-hopcroft-karp-bipartite-matching-3',
        topic_id: 'ext-hopcroft-karp-bipartite-matching',
        title: 'Complexity Analysis',
        content: `Two facts combine. First, after each phase the shortest augmenting-path length strictly increases, and once it exceeds $\\sqrt{V}$ only $O(\\sqrt{V})$ augmentations remain — so there are $O(\\sqrt{V})$ phases in total. Second, each phase's BFS and DFS together cost $O(E)$.

$$O(E \\sqrt{V})\\ \\text{time}$$

This beats the $O(VE)$ of repeatedly running a single-path augmentation (Kuhn's algorithm), which is why Hopcroft–Karp is preferred for large bipartite graphs.`,
        display_order: 3,
      },
      {
        id: 'sec-hopcroft-karp-bipartite-matching-4',
        topic_id: 'ext-hopcroft-karp-bipartite-matching',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Hopcroft–Karp works only on **bipartite** graphs. General (non-bipartite) matching requires Edmonds' Blossom algorithm.

Common mistakes:
- Not distinguishing free vertices with a NIL sentinel, causing incorrect BFS layering.
- Failing to restrict DFS to the levels computed by BFS, which breaks the "shortest disjoint paths" invariant.
- Forgetting that the matching size equals $|V_{left}| - $ maximum independent set complement only via König's theorem, not directly.

Use cases: task assignment, timetabling, network switch scheduling, and as a subroutine for minimum vertex cover via König's theorem.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-hopcroft-karp-bipartite-matching-py',
        topic_id: 'ext-hopcroft-karp-bipartite-matching',
        language: 'python',
        is_optimized: true,
        code: `from collections import deque

def hopcroft_karp(adj, n_left, n_right):
    INF = float('inf')
    NIL = 0
    # 1-indexed; adj[u] lists right-side neighbors (1..n_right)
    matchL = [NIL] * (n_left + 1)
    matchR = [NIL] * (n_right + 1)
    dist = [0] * (n_left + 1)

    def bfs():
        q = deque()
        for u in range(1, n_left + 1):
            if matchL[u] == NIL:
                dist[u] = 0
                q.append(u)
            else:
                dist[u] = INF
        found = False
        while q:
            u = q.popleft()
            for v in adj[u]:
                w = matchR[v]
                if w == NIL:
                    found = True
                elif dist[w] == INF:
                    dist[w] = dist[u] + 1
                    q.append(w)
        return found

    def dfs(u):
        for v in adj[u]:
            w = matchR[v]
            if w == NIL or (dist[w] == dist[u] + 1 and dfs(w)):
                matchL[u] = v
                matchR[v] = u
                return True
        dist[u] = INF
        return False

    matching = 0
    while bfs():
        for u in range(1, n_left + 1):
            if matchL[u] == NIL and dfs(u):
                matching += 1
    return matching`,
        explanation: 'Phased BFS layering plus disjoint-path DFS yields O(E*sqrt(V)) maximum matching.',
      },
      {
        id: 'snip-hopcroft-karp-bipartite-matching-js',
        topic_id: 'ext-hopcroft-karp-bipartite-matching',
        language: 'javascript',
        is_optimized: true,
        code: `function hopcroftKarp(adj, nLeft, nRight) {
  const INF = Infinity, NIL = 0;
  const matchL = new Array(nLeft + 1).fill(NIL);
  const matchR = new Array(nRight + 1).fill(NIL);
  const dist = new Array(nLeft + 1).fill(0);

  function bfs() {
    const q = [];
    for (let u = 1; u <= nLeft; u++) {
      if (matchL[u] === NIL) { dist[u] = 0; q.push(u); }
      else dist[u] = INF;
    }
    let found = false;
    while (q.length) {
      const u = q.shift();
      for (const v of adj[u]) {
        const w = matchR[v];
        if (w === NIL) found = true;
        else if (dist[w] === INF) { dist[w] = dist[u] + 1; q.push(w); }
      }
    }
    return found;
  }

  function dfs(u) {
    for (const v of adj[u]) {
      const w = matchR[v];
      if (w === NIL || (dist[w] === dist[u] + 1 && dfs(w))) {
        matchL[u] = v;
        matchR[v] = u;
        return true;
      }
    }
    dist[u] = INF;
    return false;
  }

  let matching = 0;
  while (bfs()) {
    for (let u = 1; u <= nLeft; u++) {
      if (matchL[u] === NIL && dfs(u)) matching++;
    }
  }
  return matching;
}`,
        explanation: 'JavaScript Hopcroft-Karp using NIL sentinel and BFS-computed distance layers.',
      },
      {
        id: 'snip-hopcroft-karp-bipartite-matching-cpp',
        topic_id: 'ext-hopcroft-karp-bipartite-matching',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <queue>
#include <climits>
using namespace std;

struct HopcroftKarp {
    int nL, nR;
    vector<vector<int>> adj;
    vector<int> matchL, matchR, dist;
    HopcroftKarp(int nL, int nR) : nL(nL), nR(nR), adj(nL + 1),
        matchL(nL + 1, 0), matchR(nR + 1, 0), dist(nL + 1) {}

    void add_edge(int u, int v) { adj[u].push_back(v); }

    bool bfs() {
        queue<int> q;
        for (int u = 1; u <= nL; ++u) {
            if (!matchL[u]) { dist[u] = 0; q.push(u); }
            else dist[u] = INT_MAX;
        }
        bool found = false;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : adj[u]) {
                int w = matchR[v];
                if (!w) found = true;
                else if (dist[w] == INT_MAX) { dist[w] = dist[u] + 1; q.push(w); }
            }
        }
        return found;
    }
    bool dfs(int u) {
        for (int v : adj[u]) {
            int w = matchR[v];
            if (!w || (dist[w] == dist[u] + 1 && dfs(w))) {
                matchL[u] = v; matchR[v] = u; return true;
            }
        }
        dist[u] = INT_MAX;
        return false;
    }
    int max_matching() {
        int matching = 0;
        while (bfs())
            for (int u = 1; u <= nL; ++u)
                if (!matchL[u] && dfs(u)) ++matching;
        return matching;
    }
};`,
        explanation: 'C++ Hopcroft-Karp; 0 doubles as the NIL sentinel for unmatched vertices.',
      },
      {
        id: 'snip-hopcroft-karp-bipartite-matching-java',
        topic_id: 'ext-hopcroft-karp-bipartite-matching',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class HopcroftKarp {
    int nL, nR;
    List<Integer>[] adj;
    int[] matchL, matchR, dist;
    static final int INF = Integer.MAX_VALUE, NIL = 0;

    @SuppressWarnings("unchecked")
    HopcroftKarp(int nL, int nR) {
        this.nL = nL; this.nR = nR;
        adj = new List[nL + 1];
        for (int i = 0; i <= nL; i++) adj[i] = new ArrayList<>();
        matchL = new int[nL + 1];
        matchR = new int[nR + 1];
        dist = new int[nL + 1];
    }
    void addEdge(int u, int v) { adj[u].add(v); }

    boolean bfs() {
        ArrayDeque<Integer> q = new ArrayDeque<>();
        for (int u = 1; u <= nL; u++) {
            if (matchL[u] == NIL) { dist[u] = 0; q.add(u); }
            else dist[u] = INF;
        }
        boolean found = false;
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : adj[u]) {
                int w = matchR[v];
                if (w == NIL) found = true;
                else if (dist[w] == INF) { dist[w] = dist[u] + 1; q.add(w); }
            }
        }
        return found;
    }
    boolean dfs(int u) {
        for (int v : adj[u]) {
            int w = matchR[v];
            if (w == NIL || (dist[w] == dist[u] + 1 && dfs(w))) {
                matchL[u] = v; matchR[v] = u; return true;
            }
        }
        dist[u] = INF;
        return false;
    }
    int maxMatching() {
        int matching = 0;
        while (bfs())
            for (int u = 1; u <= nL; u++)
                if (matchL[u] == NIL && dfs(u)) matching++;
        return matching;
    }
}`,
        explanation: 'Java Hopcroft-Karp with adjacency lists and NIL=0 sentinel for free vertices.',
      },
    ],
    quizId: 'quiz-ext-hopcroft-karp-bipartite-matching',
    quizTitle: 'Hopcroft–Karp Bipartite Matching Quiz',
    quizDescription: 'Check your understanding of phased augmenting paths and matching complexity.',
    questions: [
      {
        id: 'q-hopcroft-karp-bipartite-matching-1',
        quiz_id: 'quiz-ext-hopcroft-karp-bipartite-matching',
        question_text: 'What does Hopcroft–Karp do differently from the single-path (Kuhn) augmenting approach?',
        question_type: 'MCQ',
        options: [
          'It finds all shortest augmenting paths per phase instead of one at a time',
          'It works on non-bipartite graphs directly',
          'It avoids augmenting paths entirely',
          'It requires edge weights',
        ],
        correct_option_index: 0,
        explanation: 'Batching disjoint shortest augmenting paths per phase reduces the phase count to O(sqrt(V)).',
      },
      {
        id: 'q-hopcroft-karp-bipartite-matching-2',
        quiz_id: 'quiz-ext-hopcroft-karp-bipartite-matching',
        question_text: 'Hopcroft–Karp can directly find maximum matching in a general (non-bipartite) graph.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'It requires a bipartite graph; general matching needs Edmonds\' Blossom algorithm.',
      },
      {
        id: 'q-hopcroft-karp-bipartite-matching-3',
        quiz_id: 'quiz-ext-hopcroft-karp-bipartite-matching',
        question_text: 'What is the time complexity of Hopcroft–Karp?',
        question_type: 'COMPLEXITY',
        options: ['O(V * E)', 'O(E * sqrt(V))', 'O(V^2 * E)', 'O(V^3)'],
        correct_option_index: 1,
        explanation: 'O(sqrt(V)) phases, each costing O(E), gives O(E * sqrt(V)).',
      },
    ],
  },
  // 6. JOHNSON'S ALGORITHM
  {
    topic: {
      id: 'ext-johnsons-algorithm',
      slug: 'johnsons-algorithm',
      category_id: CATEGORY_IDS.graphs,
      title: 'Johnson\'s Algorithm',
      definition: 'Johnson\'s algorithm computes all-pairs shortest paths on a sparse directed graph with possibly negative edge weights by reweighting edges to be non-negative (using Bellman–Ford potentials) and then running Dijkstra from every vertex.',
      importance: 'It is the fastest all-pairs shortest-path method for sparse graphs with negative edges, beating Floyd–Warshall\'s O(V^3) when E is much smaller than V^2, and it elegantly combines Bellman–Ford and Dijkstra.',
      prerequisites: ['bellman-ford-algorithm', 'dijkstras-algorithm'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(V * E + V^2 * log V)',
      time_complexity_average: 'O(V * E + V^2 * log V)',
      time_complexity_worst: 'O(V * E + V^2 * log V)',
      space_complexity: 'O(V^2)',
      display_order: 418,
    },
    sections: [
      {
        id: 'sec-johnsons-algorithm-1',
        topic_id: 'ext-johnsons-algorithm',
        title: 'Concept & Intuition',
        content: `Dijkstra is fast but cannot handle **negative edge weights**. Bellman–Ford handles negatives but is slow. Johnson's algorithm gets the best of both: it **reweights** every edge so all weights become non-negative *without changing which paths are shortest*, then runs the fast Dijkstra from each source.

The trick is a **potential** $h(v)$ assigned to each vertex. Define the new weight of edge $(u, v)$ as:
$$w'(u, v) = w(u, v) + h(u) - h(v)$$
Along any path the intermediate potentials telescope away, so shortest paths are preserved; only the total shifts by $h(\\text{start}) - h(\\text{end})$.

> [!NOTE]
> Choosing $h(v)$ as the shortest distance from a new dummy source guarantees $w'(u,v) \\ge 0$ for every edge.`,
        display_order: 1,
      },
      {
        id: 'sec-johnsons-algorithm-2',
        topic_id: 'ext-johnsons-algorithm',
        title: 'How It Works',
        content: `1. Add a **dummy vertex** $q$ with a zero-weight edge to every other vertex.
2. Run **Bellman–Ford** from $q$ to compute $h(v)$, the shortest distance from $q$ to $v$. If Bellman–Ford detects a negative cycle, report it — shortest paths are undefined.
3. **Reweight** every edge: $w'(u, v) = w(u, v) + h(u) - h(v) \\ge 0$.
4. Run **Dijkstra** from each vertex $u$ over the reweighted graph to get $d'(u, v)$.
5. **Recover** true distances: $d(u, v) = d'(u, v) - h(u) + h(v)$.`,
        display_order: 2,
      },
      {
        id: 'sec-johnsons-algorithm-3',
        topic_id: 'ext-johnsons-algorithm',
        title: 'Complexity Analysis',
        content: `The single Bellman–Ford run costs $O(VE)$. Then $V$ runs of Dijkstra with a binary heap cost $O(E \\log V)$ each, or $O(V (E + V \\log V))$ total with a Fibonacci heap. Overall:
$$O(V E + V^2 \\log V)$$

Compare to **Floyd–Warshall's** flat $O(V^3)$. When the graph is **sparse** ($E = O(V)$), Johnson's is roughly $O(V^2 \\log V)$ — substantially faster. On dense graphs ($E = O(V^2)$) the two are comparable, and Floyd–Warshall's simplicity often wins.`,
        display_order: 3,
      },
      {
        id: 'sec-johnsons-algorithm-4',
        topic_id: 'ext-johnsons-algorithm',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> If Bellman–Ford detects a negative cycle reachable from the dummy source, Johnson's cannot proceed — all-pairs shortest paths are undefined in the presence of a negative cycle.

Common mistakes:
- Forgetting to undo the reweighting when reporting final distances.
- Adding the dummy source with non-zero edges, which corrupts the potentials.
- Using Dijkstra before reweighting — negative edges would give wrong results.

Use cases: routing in sparse networks with rebates/penalties (negative weights), arbitrage-free currency graphs, and precomputing distance matrices for sparse road networks.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-johnsons-algorithm-py',
        topic_id: 'ext-johnsons-algorithm',
        language: 'python',
        is_optimized: true,
        code: `import heapq

def johnson(n, edges):
    # edges: list of (u, v, w); vertices 0..n-1
    INF = float('inf')
    # 1) Bellman-Ford from a virtual source connected to all vertices with weight 0
    h = [0] * n
    for _ in range(n):
        updated = False
        for u, v, w in edges:
            if h[u] + w < h[v]:
                h[v] = h[u] + w
                updated = True
        if not updated:
            break
    # negative cycle check
    for u, v, w in edges:
        if h[u] + w < h[v]:
            raise ValueError('negative cycle')
    # 2) reweight and build adjacency
    adj = [[] for _ in range(n)]
    for u, v, w in edges:
        adj[u].append((v, w + h[u] - h[v]))
    # 3) Dijkstra from each vertex
    dist = [[INF] * n for _ in range(n)]
    for s in range(n):
        d = dist[s]
        d[s] = 0
        pq = [(0, s)]
        while pq:
            du, u = heapq.heappop(pq)
            if du > d[u]:
                continue
            for v, w in adj[u]:
                if du + w < d[v]:
                    d[v] = du + w
                    heapq.heappush(pq, (d[v], v))
        # 4) undo reweighting
        for v in range(n):
            if d[v] < INF:
                d[v] += h[v] - h[s]
    return dist`,
        explanation: 'Bellman–Ford potentials make weights non-negative so Dijkstra can be run from every vertex.',
      },
      {
        id: 'snip-johnsons-algorithm-js',
        topic_id: 'ext-johnsons-algorithm',
        language: 'javascript',
        is_optimized: true,
        code: `function johnson(n, edges) {
  const INF = Infinity;
  const h = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let updated = false;
    for (const [u, v, w] of edges) {
      if (h[u] + w < h[v]) { h[v] = h[u] + w; updated = true; }
    }
    if (!updated) break;
  }
  for (const [u, v, w] of edges) {
    if (h[u] + w < h[v]) throw new Error('negative cycle');
  }
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) adj[u].push([v, w + h[u] - h[v]]);
  const dist = Array.from({ length: n }, () => new Array(n).fill(INF));
  for (let s = 0; s < n; s++) {
    const d = dist[s];
    d[s] = 0;
    // simple binary-heap via array of [dist, node]
    const pq = [[0, s]];
    while (pq.length) {
      pq.sort((a, b) => a[0] - b[0]);
      const [du, u] = pq.shift();
      if (du > d[u]) continue;
      for (const [v, w] of adj[u]) {
        if (du + w < d[v]) { d[v] = du + w; pq.push([d[v], v]); }
      }
    }
    for (let v = 0; v < n; v++) if (d[v] < INF) d[v] += h[v] - h[s];
  }
  return dist;
}`,
        explanation: 'JavaScript Johnson\'s algorithm; reweighting via Bellman–Ford potentials then per-source Dijkstra.',
      },
      {
        id: 'snip-johnsons-algorithm-cpp',
        topic_id: 'ext-johnsons-algorithm',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <queue>
#include <tuple>
#include <climits>
using namespace std;

const long long INF = LLONG_MAX / 4;

vector<vector<long long>> johnson(int n, vector<tuple<int,int,int>>& edges) {
    vector<long long> h(n, 0);
    for (int i = 0; i < n; ++i)
        for (auto& [u, v, w] : edges)
            if (h[u] + w < h[v]) h[v] = h[u] + w;
    for (auto& [u, v, w] : edges)
        if (h[u] + w < h[v]) throw runtime_error("negative cycle");

    vector<vector<pair<int,long long>>> adj(n);
    for (auto& [u, v, w] : edges)
        adj[u].push_back({v, w + h[u] - h[v]});

    vector<vector<long long>> dist(n, vector<long long>(n, INF));
    for (int s = 0; s < n; ++s) {
        auto& d = dist[s];
        d[s] = 0;
        priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
        pq.push({0, s});
        while (!pq.empty()) {
            auto [du, u] = pq.top(); pq.pop();
            if (du > d[u]) continue;
            for (auto& [v, w] : adj[u])
                if (du + w < d[v]) { d[v] = du + w; pq.push({d[v], v}); }
        }
        for (int v = 0; v < n; ++v)
            if (d[v] < INF) d[v] += h[v] - h[s];
    }
    return dist;
}`,
        explanation: 'C++ Johnson\'s with a min-heap Dijkstra; potentials computed by a relaxation-based Bellman–Ford.',
      },
      {
        id: 'snip-johnsons-algorithm-java',
        topic_id: 'ext-johnsons-algorithm',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class Johnson {
    static final long INF = Long.MAX_VALUE / 4;

    public static long[][] johnson(int n, int[][] edges) {
        long[] h = new long[n];
        for (int i = 0; i < n; i++)
            for (int[] e : edges)
                if (h[e[0]] + e[2] < h[e[1]]) h[e[1]] = h[e[0]] + e[2];
        for (int[] e : edges)
            if (h[e[0]] + e[2] < h[e[1]]) throw new RuntimeException("negative cycle");

        List<long[]>[] adj = new List[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges)
            adj[e[0]].add(new long[]{e[1], e[2] + h[e[0]] - h[e[1]]});

        long[][] dist = new long[n][n];
        for (long[] row : dist) Arrays.fill(row, INF);
        for (int s = 0; s < n; s++) {
            long[] d = dist[s];
            d[s] = 0;
            PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
            pq.add(new long[]{0, s});
            while (!pq.isEmpty()) {
                long[] top = pq.poll();
                long du = top[0]; int u = (int) top[1];
                if (du > d[u]) continue;
                for (long[] e : adj[u]) {
                    int v = (int) e[0]; long w = e[1];
                    if (du + w < d[v]) { d[v] = du + w; pq.add(new long[]{d[v], v}); }
                }
            }
            for (int v = 0; v < n; v++)
                if (d[v] < INF) d[v] += h[v] - h[s];
        }
        return dist;
    }
}`,
        explanation: 'Java Johnson\'s algorithm using a PriorityQueue-based Dijkstra after Bellman–Ford reweighting.',
      },
    ],
    quizId: 'quiz-ext-johnsons-algorithm',
    quizTitle: 'Johnson\'s Algorithm Quiz',
    quizDescription: 'Check your understanding of reweighting, potentials, and all-pairs shortest paths.',
    questions: [
      {
        id: 'q-johnsons-algorithm-1',
        quiz_id: 'quiz-ext-johnsons-algorithm',
        question_text: 'Why does Johnson\'s algorithm reweight edges with w\'(u,v) = w(u,v) + h(u) - h(v)?',
        question_type: 'MCQ',
        options: [
          'To make all edge weights non-negative so Dijkstra can be used, while preserving shortest paths',
          'To make the graph undirected',
          'To remove all edges of weight zero',
          'To convert the graph into a tree',
        ],
        correct_option_index: 0,
        explanation: 'The potential terms telescope along any path, preserving shortest paths while guaranteeing non-negative weights.',
      },
      {
        id: 'q-johnsons-algorithm-2',
        quiz_id: 'quiz-ext-johnsons-algorithm',
        question_text: 'Johnson\'s algorithm can still produce correct results if the graph contains a reachable negative cycle.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'A negative cycle makes shortest paths undefined; Bellman–Ford detects it and the algorithm must abort.',
      },
      {
        id: 'q-johnsons-algorithm-3',
        quiz_id: 'quiz-ext-johnsons-algorithm',
        question_text: 'What is the time complexity of Johnson\'s algorithm with a Fibonacci-heap Dijkstra?',
        question_type: 'COMPLEXITY',
        options: ['O(V^3)', 'O(V * E + V^2 * log V)', 'O(E * log V)', 'O(V * E)'],
        correct_option_index: 1,
        explanation: 'One Bellman–Ford (O(VE)) plus V Fibonacci-heap Dijkstra runs (O(E + V log V) each) gives O(VE + V^2 log V).',
      },
    ],
  },
  // 7. BRIDGES AND CUT VERTICES
  {
    topic: {
      id: 'ext-bridges-and-cut-vertices',
      slug: 'bridges-and-cut-vertices',
      category_id: CATEGORY_IDS.graphs,
      title: 'Bridges & Cut Vertices',
      definition: 'A bridge is an edge whose removal increases the number of connected components; a cut vertex (articulation point) is a vertex whose removal does the same. Both are found in linear time via a single DFS using discovery and low-link values.',
      importance: 'Bridges and articulation points reveal the weak points of a network — single failures that disconnect it. They underpin biconnectivity analysis, reliable network design, and 2-edge/2-vertex connectivity checks.',
      prerequisites: ['depth-first-search', 'graph-representation'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(V + E)',
      time_complexity_average: 'O(V + E)',
      time_complexity_worst: 'O(V + E)',
      space_complexity: 'O(V + E)',
      display_order: 419,
    },
    sections: [
      {
        id: 'sec-bridges-and-cut-vertices-1',
        topic_id: 'ext-bridges-and-cut-vertices',
        title: 'Concept & Intuition',
        content: `Imagine a road network. A **bridge** is a road that, if closed, splits the map into disconnected regions. A **cut vertex** is an intersection whose closure does the same. Finding these tells you exactly where a single failure breaks connectivity.

The key tool is Tarjan's DFS with two timestamps per vertex:
- $disc[u]$: the time $u$ was first discovered.
- $low[u]$: the earliest discovery time reachable from $u$'s DFS subtree using at most one back edge.

> [!TIP]
> Intuitively, $low[u]$ answers: "without going back through my parent edge, how far *up* the DFS tree can my subtree reach?" If it cannot reach above me, the connecting edge is a bridge.`,
        display_order: 1,
      },
      {
        id: 'sec-bridges-and-cut-vertices-2',
        topic_id: 'ext-bridges-and-cut-vertices',
        title: 'How It Works',
        content: `Run a DFS, assigning $disc[u]$ on entry and initializing $low[u] = disc[u]$. For each tree edge $(u, v)$, after recursing set $low[u] = \\min(low[u], low[v])$. For each back edge $(u, w)$ to an already-visited ancestor, set $low[u] = \\min(low[u], disc[w])$.

Then:
- **Bridge:** edge $(u, v)$ is a bridge if $low[v] > disc[u]$ — $v$'s subtree cannot reach $u$ or above except through this edge.
- **Cut vertex:** a non-root $u$ is an articulation point if some child $v$ has $low[v] \\ge disc[u]$. The **root** is a cut vertex iff it has **two or more** DFS children.`,
        display_order: 2,
      },
      {
        id: 'sec-bridges-and-cut-vertices-3',
        topic_id: 'ext-bridges-and-cut-vertices',
        title: 'Complexity Analysis',
        content: `Everything is computed in a **single depth-first traversal**. Each vertex is entered once and each edge is examined a constant number of times, giving:
$$O(V + E)\\ \\text{time},\\quad O(V + E)\\ \\text{space}$$

The space includes the adjacency list, the $disc$ and $low$ arrays, and the recursion stack (which can be $O(V)$ deep). This linear cost is what makes Tarjan's approach the standard over naively removing each edge/vertex and re-checking connectivity, which would be $O(V \\cdot (V+E))$.`,
        display_order: 3,
      },
      {
        id: 'sec-bridges-and-cut-vertices-4',
        topic_id: 'ext-bridges-and-cut-vertices',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The root of the DFS tree is a special case: it is a cut vertex **only if it has at least two children** in the DFS tree, not by the $low \\ge disc$ rule.

Common mistakes:
- Using the strict inequality for cut vertices ($>$) — it must be $\\ge$; for bridges it must be strictly $>$.
- Mishandling **parallel edges**: a back edge to the parent via a *different* edge means the connection is not a bridge. Track edge identity, not just the parent vertex.
- Deep recursion causing stack overflow on large graphs — consider an iterative DFS.

Use cases: network reliability, finding single points of failure, biconnected-component decomposition, and 2-SAT / SCC-adjacent connectivity analysis.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-bridges-and-cut-vertices-py',
        topic_id: 'ext-bridges-and-cut-vertices',
        language: 'python',
        is_optimized: true,
        code: `import sys

def find_bridges_and_aps(n, adj):
    sys.setrecursionlimit(10 ** 6)
    disc = [-1] * n
    low = [0] * n
    timer = [0]
    bridges = []
    articulation = set()

    def dfs(u, parent):
        disc[u] = low[u] = timer[0]
        timer[0] += 1
        children = 0
        for v in adj[u]:
            if v == parent:
                continue
            if disc[v] != -1:
                low[u] = min(low[u], disc[v])
            else:
                children += 1
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > disc[u]:
                    bridges.append((u, v))
                if parent != -1 and low[v] >= disc[u]:
                    articulation.add(u)
        if parent == -1 and children > 1:
            articulation.add(u)

    for s in range(n):
        if disc[s] == -1:
            dfs(s, -1)
    return bridges, articulation`,
        explanation: 'Single DFS computing disc/low; root handled by the two-children rule.',
      },
      {
        id: 'snip-bridges-and-cut-vertices-js',
        topic_id: 'ext-bridges-and-cut-vertices',
        language: 'javascript',
        is_optimized: true,
        code: `function findBridgesAndAPs(n, adj) {
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(0);
  let timer = 0;
  const bridges = [];
  const articulation = new Set();

  function dfs(u, parent) {
    disc[u] = low[u] = timer++;
    let children = 0;
    for (const v of adj[u]) {
      if (v === parent) continue;
      if (disc[v] !== -1) {
        low[u] = Math.min(low[u], disc[v]);
      } else {
        children++;
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) bridges.push([u, v]);
        if (parent !== -1 && low[v] >= disc[u]) articulation.add(u);
      }
    }
    if (parent === -1 && children > 1) articulation.add(u);
  }

  for (let s = 0; s < n; s++) if (disc[s] === -1) dfs(s, -1);
  return { bridges, articulation: [...articulation] };
}`,
        explanation: 'JavaScript Tarjan bridge/articulation finder using discovery and low-link values.',
      },
      {
        id: 'snip-bridges-and-cut-vertices-cpp',
        topic_id: 'ext-bridges-and-cut-vertices',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <set>
#include <algorithm>
using namespace std;

struct BridgeFinder {
    int n, timer = 0;
    vector<vector<int>> adj;
    vector<int> disc, low;
    vector<pair<int,int>> bridges;
    set<int> articulation;

    BridgeFinder(int n) : n(n), adj(n), disc(n, -1), low(n) {}

    void dfs(int u, int parent) {
        disc[u] = low[u] = timer++;
        int children = 0;
        for (int v : adj[u]) {
            if (v == parent) continue;
            if (disc[v] != -1) {
                low[u] = min(low[u], disc[v]);
            } else {
                ++children;
                dfs(v, u);
                low[u] = min(low[u], low[v]);
                if (low[v] > disc[u]) bridges.push_back({u, v});
                if (parent != -1 && low[v] >= disc[u]) articulation.insert(u);
            }
        }
        if (parent == -1 && children > 1) articulation.insert(u);
    }

    void run() {
        for (int s = 0; s < n; ++s)
            if (disc[s] == -1) dfs(s, -1);
    }
};`,
        explanation: 'C++ struct performing the DFS once; bridges use strict > and APs use >=.',
      },
      {
        id: 'snip-bridges-and-cut-vertices-java',
        topic_id: 'ext-bridges-and-cut-vertices',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class Bridges {
    int n, timer = 0;
    List<Integer>[] adj;
    int[] disc, low;
    List<int[]> bridges = new ArrayList<>();
    Set<Integer> articulation = new HashSet<>();

    @SuppressWarnings("unchecked")
    Bridges(int n) {
        this.n = n; adj = new List[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        disc = new int[n]; low = new int[n];
        Arrays.fill(disc, -1);
    }

    void dfs(int u, int parent) {
        disc[u] = low[u] = timer++;
        int children = 0;
        for (int v : adj[u]) {
            if (v == parent) continue;
            if (disc[v] != -1) {
                low[u] = Math.min(low[u], disc[v]);
            } else {
                children++;
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) bridges.add(new int[]{u, v});
                if (parent != -1 && low[v] >= disc[u]) articulation.add(u);
            }
        }
        if (parent == -1 && children > 1) articulation.add(u);
    }

    void run() {
        for (int s = 0; s < n; s++) if (disc[s] == -1) dfs(s, -1);
    }
}`,
        explanation: 'Java Tarjan implementation collecting bridges and articulation points in one pass.',
      },
    ],
    quizId: 'quiz-ext-bridges-and-cut-vertices',
    quizTitle: 'Bridges & Cut Vertices Quiz',
    quizDescription: 'Check your understanding of low-link values, bridges, and articulation points.',
    questions: [
      {
        id: 'q-bridges-and-cut-vertices-1',
        quiz_id: 'quiz-ext-bridges-and-cut-vertices',
        question_text: 'For a tree edge (u, v) in the DFS tree, which condition identifies it as a bridge?',
        question_type: 'MCQ',
        options: [
          'low[v] >= disc[u]',
          'low[v] > disc[u]',
          'disc[v] > low[u]',
          'low[v] == disc[u]',
        ],
        correct_option_index: 1,
        explanation: 'If low[v] > disc[u], v\'s subtree cannot reach u or above except through (u,v), so it is a bridge.',
      },
      {
        id: 'q-bridges-and-cut-vertices-2',
        quiz_id: 'quiz-ext-bridges-and-cut-vertices',
        question_text: 'The DFS root is an articulation point if and only if it has two or more children in the DFS tree.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'The root is special: the low/disc rule does not apply, only the two-children condition.',
      },
      {
        id: 'q-bridges-and-cut-vertices-3',
        quiz_id: 'quiz-ext-bridges-and-cut-vertices',
        question_text: 'What is the time complexity of finding all bridges and articulation points with Tarjan\'s DFS?',
        question_type: 'COMPLEXITY',
        options: ['O(V + E)', 'O(V * E)', 'O(V^2)', 'O(E * log V)'],
        correct_option_index: 0,
        explanation: 'A single DFS touches each vertex and edge a constant number of times, giving O(V + E).',
      },
    ],
  },
  // 8. 2-SAT PROBLEM
  {
    topic: {
      id: 'ext-2-sat-problem',
      slug: '2-sat-problem',
      category_id: CATEGORY_IDS.graphs,
      title: '2-SAT Problem',
      definition: '2-SAT is the problem of assigning truth values to boolean variables so that a conjunction of clauses, each an OR of exactly two literals, is satisfied. It is solvable in linear time by finding strongly connected components of an implication graph.',
      importance: 'Unlike general SAT (NP-complete), 2-SAT is polynomial and models many constraint problems — scheduling with pairwise conflicts, 2-coloring variants, and feasibility checks — solvable elegantly with Tarjan/Kosaraju SCCs.',
      prerequisites: ['strongly-connected-components', 'depth-first-search'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(V + E)',
      time_complexity_average: 'O(V + E)',
      time_complexity_worst: 'O(V + E)',
      space_complexity: 'O(V + E)',
      display_order: 420,
    },
    sections: [
      {
        id: 'sec-2-sat-problem-1',
        topic_id: 'ext-2-sat-problem',
        title: 'Concept & Intuition',
        content: `A 2-SAT formula is a set of clauses like $(x_1 \\lor \\lnot x_2) \\land (\\lnot x_1 \\lor x_3) \\land \\dots$, each with exactly two literals. We must decide if some truth assignment satisfies all clauses at once.

The core trick: a clause $(a \\lor b)$ is logically equivalent to two **implications**:
$$\\lnot a \\Rightarrow b \\quad \\text{and} \\quad \\lnot b \\Rightarrow a$$
Build a directed **implication graph** with two nodes per variable (the literal and its negation). The formula is satisfiable **iff no variable $x$ and its negation $\\lnot x$ lie in the same strongly connected component**.

> [!NOTE]
> If $x$ and $\\lnot x$ are mutually reachable (same SCC), then $x \\Rightarrow \\lnot x$ and $\\lnot x \\Rightarrow x$ — a contradiction, so the formula is unsatisfiable.`,
        display_order: 1,
      },
      {
        id: 'sec-2-sat-problem-2',
        topic_id: 'ext-2-sat-problem',
        title: 'How It Works',
        content: `Encode variable $i$ (0-indexed) as two nodes: $2i$ for the literal $x_i$ and $2i+1$ for $\\lnot x_i$.

1. For each clause $(a \\lor b)$, add edges $\\lnot a \\to b$ and $\\lnot b \\to a$.
2. Compute **strongly connected components** (Tarjan or Kosaraju) and their reverse topological order (Tarjan yields SCC ids in reverse topological order).
3. If $x_i$ and $\\lnot x_i$ share an SCC → **UNSAT**.
4. Otherwise assign $x_i = $ true iff $comp[2i] > comp[2i+1]$ (the literal whose SCC comes **later** in topological order is set true).`,
        display_order: 2,
      },
      {
        id: 'sec-2-sat-problem-3',
        topic_id: 'ext-2-sat-problem',
        title: 'Complexity Analysis',
        content: `The implication graph has $2N$ nodes and $2M$ edges for $N$ variables and $M$ clauses. Computing SCCs with Tarjan's algorithm is linear in the graph size, and the assignment step is a single pass:
$$O(V + E) = O(N + M)\\ \\text{time},\\quad O(N + M)\\ \\text{space}$$

This linear bound is what makes 2-SAT tractable — contrast with **3-SAT**, which is NP-complete. The jump from clause size 2 to 3 crosses the tractability boundary.`,
        display_order: 3,
      },
      {
        id: 'sec-2-sat-problem-4',
        topic_id: 'ext-2-sat-problem',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The literal encoding must be consistent. A common convention: node $2i$ is $x_i$, node $2i+1$ is $\\lnot x_i$, so the negation of node $v$ is $v \\oplus 1$ (XOR with 1).

Common mistakes:
- Adding only one of the two implications per clause — both are required.
- Reading the assignment rule backwards; the SCC appearing **later** in topological order should be true (with Tarjan's reverse-topological numbering, that means the smaller component id).
- Forgetting that a single literal clause $(a)$ is encoded as $(a \\lor a)$.

Use cases: scheduling with binary conflicts, boolean feasibility in EDA, puzzle solving (e.g., certain Nonogram constraints), and consistency checking.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-2-sat-problem-py',
        topic_id: 'ext-2-sat-problem',
        language: 'python',
        is_optimized: true,
        code: `import sys

class TwoSat:
    def __init__(self, n):
        self.n = n              # number of variables
        self.g = [[] for _ in range(2 * n)]

    def _node(self, var, val):
        # literal (var is true if val else false) -> node index
        return 2 * var + (0 if val else 1)

    def add_clause(self, x, xval, y, yval):
        # clause (x==xval) OR (y==yval)
        nx, ny = self._node(x, xval), self._node(y, yval)
        # ~x -> y and ~y -> x  (negation node is index ^ 1)
        self.g[nx ^ 1].append(ny)
        self.g[ny ^ 1].append(nx)

    def solve(self):
        sys.setrecursionlimit(10 ** 6)
        N = 2 * self.n
        index = [0]
        comp = [-1] * N
        order = []
        visited = [False] * N

        def dfs1(u):
            visited[u] = True
            for v in self.g[u]:
                if not visited[v]:
                    dfs1(v)
            order.append(u)

        rev = [[] for _ in range(N)]
        for u in range(N):
            for v in self.g[u]:
                rev[v].append(u)

        for u in range(N):
            if not visited[u]:
                dfs1(u)

        def dfs2(u, c):
            comp[u] = c
            for v in rev[u]:
                if comp[v] == -1:
                    dfs2(v, c)

        c = 0
        for u in reversed(order):
            if comp[u] == -1:
                dfs2(u, c)
                c += 1

        assignment = [False] * self.n
        for i in range(self.n):
            if comp[2 * i] == comp[2 * i + 1]:
                return None  # UNSAT
            assignment[i] = comp[2 * i] > comp[2 * i + 1]
        return assignment`,
        explanation: 'Kosaraju SCC on the implication graph; UNSAT iff x and ¬x share a component.',
      },
      {
        id: 'snip-2-sat-problem-js',
        topic_id: 'ext-2-sat-problem',
        language: 'javascript',
        is_optimized: true,
        code: `class TwoSat {
  constructor(n) {
    this.n = n;
    this.g = Array.from({ length: 2 * n }, () => []);
  }
  node(v, val) { return 2 * v + (val ? 0 : 1); }
  addClause(x, xval, y, yval) {
    const nx = this.node(x, xval), ny = this.node(y, yval);
    this.g[nx ^ 1].push(ny);
    this.g[ny ^ 1].push(nx);
  }
  solve() {
    const N = 2 * this.n;
    const visited = new Array(N).fill(false);
    const order = [];
    const rev = Array.from({ length: N }, () => []);
    for (let u = 0; u < N; u++) for (const v of this.g[u]) rev[v].push(u);
    const dfs1 = (u) => {
      visited[u] = true;
      for (const v of this.g[u]) if (!visited[v]) dfs1(v);
      order.push(u);
    };
    for (let u = 0; u < N; u++) if (!visited[u]) dfs1(u);
    const comp = new Array(N).fill(-1);
    const dfs2 = (u, c) => {
      comp[u] = c;
      for (const v of rev[u]) if (comp[v] === -1) dfs2(v, c);
    };
    let c = 0;
    for (let i = order.length - 1; i >= 0; i--) {
      if (comp[order[i]] === -1) dfs2(order[i], c++);
    }
    const assignment = new Array(this.n);
    for (let i = 0; i < this.n; i++) {
      if (comp[2 * i] === comp[2 * i + 1]) return null; // UNSAT
      assignment[i] = comp[2 * i] > comp[2 * i + 1];
    }
    return assignment;
  }
}`,
        explanation: 'JavaScript 2-SAT with Kosaraju SCC; negation of node v is v ^ 1.',
      },
      {
        id: 'snip-2-sat-problem-cpp',
        topic_id: 'ext-2-sat-problem',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

struct TwoSat {
    int n;
    vector<vector<int>> g, rg;
    TwoSat(int n) : n(n), g(2 * n), rg(2 * n) {}
    int node(int v, bool val) { return 2 * v + (val ? 0 : 1); }
    void addClause(int x, bool xv, int y, bool yv) {
        int nx = node(x, xv), ny = node(y, yv);
        g[nx ^ 1].push_back(ny); rg[ny].push_back(nx ^ 1);
        g[ny ^ 1].push_back(nx); rg[nx].push_back(ny ^ 1);
    }
    vector<int> order; vector<int> comp; vector<bool> vis;
    void dfs1(int u) {
        vis[u] = true;
        for (int v : g[u]) if (!vis[v]) dfs1(v);
        order.push_back(u);
    }
    void dfs2(int u, int c) {
        comp[u] = c;
        for (int v : rg[u]) if (comp[v] == -1) dfs2(v, c);
    }
    bool solve(vector<bool>& assign) {
        int N = 2 * n;
        vis.assign(N, false); comp.assign(N, -1); order.clear();
        for (int u = 0; u < N; ++u) if (!vis[u]) dfs1(u);
        int c = 0;
        for (int i = N - 1; i >= 0; --i)
            if (comp[order[i]] == -1) dfs2(order[i], c++);
        assign.assign(n, false);
        for (int i = 0; i < n; ++i) {
            if (comp[2 * i] == comp[2 * i + 1]) return false;
            assign[i] = comp[2 * i] > comp[2 * i + 1];
        }
        return true;
    }
};`,
        explanation: 'C++ 2-SAT maintaining both forward and reverse graphs for Kosaraju SCC.',
      },
      {
        id: 'snip-2-sat-problem-java',
        topic_id: 'ext-2-sat-problem',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class TwoSat {
    int n;
    List<Integer>[] g, rg;
    boolean[] vis;
    int[] comp;
    List<Integer> order = new ArrayList<>();

    @SuppressWarnings("unchecked")
    TwoSat(int n) {
        this.n = n; g = new List[2 * n]; rg = new List[2 * n];
        for (int i = 0; i < 2 * n; i++) { g[i] = new ArrayList<>(); rg[i] = new ArrayList<>(); }
    }
    int node(int v, boolean val) { return 2 * v + (val ? 0 : 1); }
    void addClause(int x, boolean xv, int y, boolean yv) {
        int nx = node(x, xv), ny = node(y, yv);
        g[nx ^ 1].add(ny); rg[ny].add(nx ^ 1);
        g[ny ^ 1].add(nx); rg[nx].add(ny ^ 1);
    }
    void dfs1(int u) {
        vis[u] = true;
        for (int v : g[u]) if (!vis[v]) dfs1(v);
        order.add(u);
    }
    void dfs2(int u, int c) {
        comp[u] = c;
        for (int v : rg[u]) if (comp[v] == -1) dfs2(v, c);
    }
    boolean[] solve() {
        int N = 2 * n;
        vis = new boolean[N]; comp = new int[N]; Arrays.fill(comp, -1);
        for (int u = 0; u < N; u++) if (!vis[u]) dfs1(u);
        int c = 0;
        for (int i = N - 1; i >= 0; i--)
            if (comp[order.get(i)] == -1) dfs2(order.get(i), c++);
        boolean[] assign = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (comp[2 * i] == comp[2 * i + 1]) return null; // UNSAT
            assign[i] = comp[2 * i] > comp[2 * i + 1];
        }
        return assign;
    }
}`,
        explanation: 'Java 2-SAT solver using Kosaraju SCC over forward and reverse adjacency lists.',
      },
    ],
    quizId: 'quiz-ext-2-sat-problem',
    quizTitle: '2-SAT Problem Quiz',
    quizDescription: 'Check your understanding of implication graphs and SCC-based 2-SAT solving.',
    questions: [
      {
        id: 'q-2-sat-problem-1',
        quiz_id: 'quiz-ext-2-sat-problem',
        question_text: 'A clause (a OR b) in 2-SAT is encoded as which implications?',
        question_type: 'MCQ',
        options: [
          '¬a ⇒ b and ¬b ⇒ a',
          'a ⇒ b and b ⇒ a',
          '¬a ⇒ ¬b only',
          'a ⇒ ¬b and b ⇒ ¬a',
        ],
        correct_option_index: 0,
        explanation: 'If a is false then b must be true, and vice versa, giving ¬a ⇒ b and ¬b ⇒ a.',
      },
      {
        id: 'q-2-sat-problem-2',
        quiz_id: 'quiz-ext-2-sat-problem',
        question_text: 'A 2-SAT formula is unsatisfiable if and only if some variable and its negation lie in the same strongly connected component.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Being in the same SCC forces x ⇒ ¬x and ¬x ⇒ x, a contradiction, so the formula is UNSAT.',
      },
      {
        id: 'q-2-sat-problem-3',
        quiz_id: 'quiz-ext-2-sat-problem',
        question_text: 'What is the time complexity of solving 2-SAT via the implication graph?',
        question_type: 'COMPLEXITY',
        options: ['O(2^N)', 'O(N + M)', 'O(N * M)', 'O(N^2)'],
        correct_option_index: 1,
        explanation: 'Building the graph and running linear-time SCC gives O(V + E) = O(N + M).',
      },
    ],
  },
  // 9. HEAVY-LIGHT DECOMPOSITION
  {
    topic: {
      id: 'ext-heavy-light-decomposition',
      slug: 'heavy-light-decomposition',
      category_id: CATEGORY_IDS.graphs,
      title: 'Heavy-Light Decomposition',
      definition: 'Heavy-light decomposition (HLD) partitions the edges of a rooted tree into disjoint chains so that any root-to-node path crosses only O(log N) chains, enabling path queries and updates to be answered with a segment tree in O(log^2 N).',
      importance: 'HLD turns hard tree-path queries (max, sum, update along a path between two nodes) into a handful of contiguous range queries on an array, a staple technique for competitive programming and tree-heavy systems.',
      prerequisites: ['tree-traversal', 'segment-tree', 'lowest-common-ancestor'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(N) preprocessing',
      time_complexity_average: 'O(log^2 N) per path query',
      time_complexity_worst: 'O(log^2 N) per path query',
      space_complexity: 'O(N)',
      display_order: 421,
    },
    sections: [
      {
        id: 'sec-heavy-light-decomposition-1',
        topic_id: 'ext-heavy-light-decomposition',
        title: 'Concept & Intuition',
        content: `Answering "what is the maximum weight on the path between nodes $u$ and $v$?" repeatedly is easy on an array (segment tree) but awkward on a tree. HLD bridges that gap by **flattening the tree into chains** that map onto contiguous array segments.

For each node we pick its **heavy child** — the child whose subtree is largest. The edge to that child is a **heavy edge**; all others are **light edges**. Following heavy edges links nodes into long **heavy chains**.

> [!TIP]
> The magic property: descending from the root, you cross a **light edge** at most $O(\\log N)$ times, because each light edge at least halves the remaining subtree size. So any path touches only $O(\\log N)$ chains.`,
        display_order: 1,
      },
      {
        id: 'sec-heavy-light-decomposition-2',
        topic_id: 'ext-heavy-light-decomposition',
        title: 'How It Works',
        content: `Two DFS passes set it up:
1. **Size DFS:** compute subtree sizes, parent, and depth; record each node's heavy child (largest subtree).
2. **Decompose DFS:** assign each node a position \`pos[u]\` in the flattened array and a chain \`head[u]\` (top of its chain). Traverse the heavy child first so each chain occupies a contiguous range.

Build a segment tree over the flattened positions. To query the path $u \\to v$: repeatedly move the node with the **deeper chain head** up to its head, querying that segment, until both are on the same chain, then query the final in-chain range.`,
        display_order: 2,
      },
      {
        id: 'sec-heavy-light-decomposition-3',
        topic_id: 'ext-heavy-light-decomposition',
        title: 'Complexity Analysis',
        content: `Preprocessing is two linear DFS passes plus an $O(N)$ segment-tree build:
$$O(N)\\ \\text{preprocessing}$$

A path query crosses $O(\\log N)$ chains, and each chain segment is answered by an $O(\\log N)$ segment-tree query, giving:
$$O(\\log^2 N)\\ \\text{per path query/update}$$

With a more advanced structure (e.g., a balanced BST per chain or a global segment tree with careful ordering) the same bound holds. The $\\log^2$ factor comes from "chains times segment-tree depth."`,
        display_order: 3,
      },
      {
        id: 'sec-heavy-light-decomposition-4',
        topic_id: 'ext-heavy-light-decomposition',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Be consistent about whether values live on **nodes** or **edges**. For edge weights, store each edge's value at its deeper endpoint and skip the LCA node in path queries to avoid double counting.

Common mistakes:
- Not visiting the heavy child first, breaking chain contiguity.
- Off-by-one when combining the two ascending halves at the LCA.
- Forgetting to move the node with the deeper \`head\`, not the deeper node, when climbing.

Use cases: path max/sum/update queries, subtree queries (contiguous ranges), and combining with lazy segment trees for range-update path problems.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-heavy-light-decomposition-py',
        topic_id: 'ext-heavy-light-decomposition',
        language: 'python',
        is_optimized: true,
        code: `import sys

class HLD:
    def __init__(self, n, adj, values, root=0):
        sys.setrecursionlimit(10 ** 6)
        self.n = n
        self.adj = adj
        self.parent = [-1] * n
        self.depth = [0] * n
        self.heavy = [-1] * n
        self.size = [1] * n
        self.head = [0] * n
        self.pos = [0] * n
        self.dfs_size(root)
        self.cur = 0
        self.decompose(root, root)
        self.tree = [0] * (2 * n)
        for u in range(n):
            self.tree[n + self.pos[u]] = values[u]
        for i in range(n - 1, 0, -1):
            self.tree[i] = max(self.tree[2 * i], self.tree[2 * i + 1])

    def dfs_size(self, u):
        max_c = 0
        for v in self.adj[u]:
            if v == self.parent[u]:
                continue
            self.parent[v] = u
            self.depth[v] = self.depth[u] + 1
            self.dfs_size(v)
            self.size[u] += self.size[v]
            if self.size[v] > max_c:
                max_c = self.size[v]
                self.heavy[u] = v

    def decompose(self, u, h):
        self.head[u] = h
        self.pos[u] = self.cur
        self.cur += 1
        if self.heavy[u] != -1:
            self.decompose(self.heavy[u], h)
        for v in self.adj[u]:
            if v != self.parent[u] and v != self.heavy[u]:
                self.decompose(v, v)

    def query_range(self, l, r):
        res = 0
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res = max(res, self.tree[l]); l += 1
            if r & 1:
                r -= 1; res = max(res, self.tree[r])
            l >>= 1; r >>= 1
        return res

    def path_max(self, u, v):
        res = 0
        while self.head[u] != self.head[v]:
            if self.depth[self.head[u]] < self.depth[self.head[v]]:
                u, v = v, u
            res = max(res, self.query_range(self.pos[self.head[u]], self.pos[u]))
            u = self.parent[self.head[u]]
        if self.depth[u] > self.depth[v]:
            u, v = v, u
        res = max(res, self.query_range(self.pos[u], self.pos[v]))
        return res`,
        explanation: 'Two DFS passes build chains; path_max climbs by chain heads querying a segment tree.',
      },
      {
        id: 'snip-heavy-light-decomposition-js',
        topic_id: 'ext-heavy-light-decomposition',
        language: 'javascript',
        is_optimized: true,
        code: `class HLD {
  constructor(n, adj, values, root = 0) {
    this.n = n; this.adj = adj;
    this.parent = new Array(n).fill(-1);
    this.depth = new Array(n).fill(0);
    this.heavy = new Array(n).fill(-1);
    this.size = new Array(n).fill(1);
    this.head = new Array(n).fill(0);
    this.pos = new Array(n).fill(0);
    this.dfsSize(root);
    this.cur = 0;
    this.decompose(root, root);
    this.tree = new Array(2 * n).fill(0);
    for (let u = 0; u < n; u++) this.tree[n + this.pos[u]] = values[u];
    for (let i = n - 1; i > 0; i--) this.tree[i] = Math.max(this.tree[2 * i], this.tree[2 * i + 1]);
  }
  dfsSize(u) {
    let maxC = 0;
    for (const v of this.adj[u]) {
      if (v === this.parent[u]) continue;
      this.parent[v] = u;
      this.depth[v] = this.depth[u] + 1;
      this.dfsSize(v);
      this.size[u] += this.size[v];
      if (this.size[v] > maxC) { maxC = this.size[v]; this.heavy[u] = v; }
    }
  }
  decompose(u, h) {
    this.head[u] = h;
    this.pos[u] = this.cur++;
    if (this.heavy[u] !== -1) this.decompose(this.heavy[u], h);
    for (const v of this.adj[u]) {
      if (v !== this.parent[u] && v !== this.heavy[u]) this.decompose(v, v);
    }
  }
  queryRange(l, r) {
    let res = 0;
    l += this.n; r += this.n + 1;
    while (l < r) {
      if (l & 1) res = Math.max(res, this.tree[l++]);
      if (r & 1) res = Math.max(res, this.tree[--r]);
      l >>= 1; r >>= 1;
    }
    return res;
  }
  pathMax(u, v) {
    let res = 0;
    while (this.head[u] !== this.head[v]) {
      if (this.depth[this.head[u]] < this.depth[this.head[v]]) { const t = u; u = v; v = t; }
      res = Math.max(res, this.queryRange(this.pos[this.head[u]], this.pos[u]));
      u = this.parent[this.head[u]];
    }
    if (this.depth[u] > this.depth[v]) { const t = u; u = v; v = t; }
    return Math.max(res, this.queryRange(this.pos[u], this.pos[v]));
  }
}`,
        explanation: 'JavaScript HLD with an iterative segment tree answering path-max queries.',
      },
      {
        id: 'snip-heavy-light-decomposition-cpp',
        topic_id: 'ext-heavy-light-decomposition',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>
using namespace std;

struct HLD {
    int n, cur = 0;
    vector<vector<int>> adj;
    vector<int> parent, depth, heavy, sz, head, pos, tree;
    HLD(int n, vector<vector<int>>& adj, vector<int>& val, int root = 0)
        : n(n), adj(adj), parent(n, -1), depth(n), heavy(n, -1),
          sz(n, 1), head(n), pos(n), tree(2 * n, 0) {
        dfsSize(root);
        decompose(root, root);
        for (int u = 0; u < n; ++u) tree[n + pos[u]] = val[u];
        for (int i = n - 1; i > 0; --i) tree[i] = max(tree[2 * i], tree[2 * i + 1]);
    }
    void dfsSize(int u) {
        int maxC = 0;
        for (int v : adj[u]) if (v != parent[u]) {
            parent[v] = u; depth[v] = depth[u] + 1;
            dfsSize(v); sz[u] += sz[v];
            if (sz[v] > maxC) { maxC = sz[v]; heavy[u] = v; }
        }
    }
    void decompose(int u, int h) {
        head[u] = h; pos[u] = cur++;
        if (heavy[u] != -1) decompose(heavy[u], h);
        for (int v : adj[u]) if (v != parent[u] && v != heavy[u]) decompose(v, v);
    }
    int queryRange(int l, int r) {
        int res = 0; l += n; r += n + 1;
        while (l < r) {
            if (l & 1) res = max(res, tree[l++]);
            if (r & 1) res = max(res, tree[--r]);
            l >>= 1; r >>= 1;
        }
        return res;
    }
    int pathMax(int u, int v) {
        int res = 0;
        while (head[u] != head[v]) {
            if (depth[head[u]] < depth[head[v]]) swap(u, v);
            res = max(res, queryRange(pos[head[u]], pos[u]));
            u = parent[head[u]];
        }
        if (depth[u] > depth[v]) swap(u, v);
        return max(res, queryRange(pos[u], pos[v]));
    }
};`,
        explanation: 'C++ HLD with an iterative max segment tree; swap keeps the deeper chain head moving up.',
      },
      {
        id: 'snip-heavy-light-decomposition-java',
        topic_id: 'ext-heavy-light-decomposition',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class HLD {
    int n, cur = 0;
    List<Integer>[] adj;
    int[] parent, depth, heavy, sz, head, pos, tree;

    HLD(int n, List<Integer>[] adj, int[] val, int root) {
        this.n = n; this.adj = adj;
        parent = new int[n]; Arrays.fill(parent, -1);
        depth = new int[n]; heavy = new int[n]; Arrays.fill(heavy, -1);
        sz = new int[n]; Arrays.fill(sz, 1);
        head = new int[n]; pos = new int[n]; tree = new int[2 * n];
        dfsSize(root);
        decompose(root, root);
        for (int u = 0; u < n; u++) tree[n + pos[u]] = val[u];
        for (int i = n - 1; i > 0; i--) tree[i] = Math.max(tree[2 * i], tree[2 * i + 1]);
    }
    void dfsSize(int u) {
        int maxC = 0;
        for (int v : adj[u]) if (v != parent[u]) {
            parent[v] = u; depth[v] = depth[u] + 1;
            dfsSize(v); sz[u] += sz[v];
            if (sz[v] > maxC) { maxC = sz[v]; heavy[u] = v; }
        }
    }
    void decompose(int u, int h) {
        head[u] = h; pos[u] = cur++;
        if (heavy[u] != -1) decompose(heavy[u], h);
        for (int v : adj[u]) if (v != parent[u] && v != heavy[u]) decompose(v, v);
    }
    int queryRange(int l, int r) {
        int res = 0; l += n; r += n + 1;
        while (l < r) {
            if ((l & 1) == 1) res = Math.max(res, tree[l++]);
            if ((r & 1) == 1) res = Math.max(res, tree[--r]);
            l >>= 1; r >>= 1;
        }
        return res;
    }
    int pathMax(int u, int v) {
        int res = 0;
        while (head[u] != head[v]) {
            if (depth[head[u]] < depth[head[v]]) { int t = u; u = v; v = t; }
            res = Math.max(res, queryRange(pos[head[u]], pos[u]));
            u = parent[head[u]];
        }
        if (depth[u] > depth[v]) { int t = u; u = v; v = t; }
        return Math.max(res, queryRange(pos[u], pos[v]));
    }
}`,
        explanation: 'Java HLD building chains via two DFS passes and answering path-max with a segment tree.',
      },
    ],
    quizId: 'quiz-ext-heavy-light-decomposition',
    quizTitle: 'Heavy-Light Decomposition Quiz',
    quizDescription: 'Test your grasp of chains, heavy children, and path-query complexity.',
    questions: [
      {
        id: 'q-heavy-light-decomposition-1',
        quiz_id: 'quiz-ext-heavy-light-decomposition',
        question_text: 'How is the heavy child of a node defined in HLD?',
        question_type: 'MCQ',
        options: [
          'The child with the smallest subtree',
          'The child with the largest subtree',
          'The child with the smallest index',
          'The most recently added child',
        ],
        correct_option_index: 1,
        explanation: 'The heavy child is the one whose subtree is largest; its edge forms the heavy chain.',
      },
      {
        id: 'q-heavy-light-decomposition-2',
        quiz_id: 'quiz-ext-heavy-light-decomposition',
        question_text: 'Any root-to-node path in HLD crosses at most O(log N) light edges.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Each light edge at least halves the remaining subtree size, bounding light edges by O(log N).',
      },
      {
        id: 'q-heavy-light-decomposition-3',
        quiz_id: 'quiz-ext-heavy-light-decomposition',
        question_text: 'What is the per-query time complexity of a path query in HLD backed by a segment tree?',
        question_type: 'COMPLEXITY',
        options: ['O(log N)', 'O(log^2 N)', 'O(N)', 'O(sqrt(N))'],
        correct_option_index: 1,
        explanation: 'O(log N) chains times an O(log N) segment-tree query per chain gives O(log^2 N).',
      },
    ],
  },
  // 10. CENTROID DECOMPOSITION
  {
    topic: {
      id: 'ext-centroid-decomposition',
      slug: 'centroid-decomposition',
      category_id: CATEGORY_IDS.graphs,
      title: 'Centroid Decomposition',
      definition: 'Centroid decomposition recursively splits a tree at its centroid — the vertex whose removal leaves all components of size at most N/2 — building a balanced auxiliary tree of depth O(log N) that accelerates path and distance queries.',
      importance: 'It provides an O(log N)-depth recursive structure over any tree, enabling divide-and-conquer on paths and efficient distance-based queries (e.g., counting paths of a given length) that would otherwise be quadratic.',
      prerequisites: ['tree-traversal', 'divide-and-conquer'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(N log N) to build',
      time_complexity_average: 'O(N log N) to build',
      time_complexity_worst: 'O(N log N) to build',
      space_complexity: 'O(N log N)',
      display_order: 422,
    },
    sections: [
      {
        id: 'sec-centroid-decomposition-1',
        topic_id: 'ext-centroid-decomposition',
        title: 'Concept & Intuition',
        content: `A **centroid** of a tree is a vertex whose removal breaks the tree into subtrees each of size at most $N/2$. Every tree has at least one (and at most two) centroids.

Centroid decomposition repeatedly finds the centroid, "removes" it, and recurses on each resulting piece. The centroids form a new **centroid tree** whose depth is $O(\\log N)$ because every level at least halves the component size. This balanced structure lets us reason about paths: **any path in the original tree passes through the centroid of the smallest decomposition level that contains both endpoints.**

> [!TIP]
> Think of it as a divide-and-conquer skeleton for trees, analogous to how a balanced BST tames an array.`,
        display_order: 1,
      },
      {
        id: 'sec-centroid-decomposition-2',
        topic_id: 'ext-centroid-decomposition',
        title: 'How It Works',
        content: `To decompose:
1. Compute subtree **sizes** with a DFS restricted to not-yet-removed vertices.
2. **Find the centroid** by walking toward the largest subtree until no subtree exceeds half the current component size.
3. **Mark** the centroid removed, record its parent in the centroid tree, and process any path/distance information rooted at it.
4. **Recurse** into each neighboring component.

The key property used in queries: every original path is uniquely "owned" by the highest centroid separating its endpoints. Distance queries typically precompute, for each vertex, its distance to each ancestor centroid.`,
        display_order: 2,
      },
      {
        id: 'sec-centroid-decomposition-3',
        topic_id: 'ext-centroid-decomposition',
        title: 'Complexity Analysis',
        content: `Because each vertex's component is at least halved every time it descends a level in the centroid tree, a vertex appears in $O(\\log N)$ levels. Each level does $O(\\text{component size})$ work summed to $O(N)$ per level:
$$O(N \\log N)\\ \\text{to build}$$

Storing each vertex's distance to its $O(\\log N)$ ancestor centroids also costs $O(N \\log N)$ space. Path-counting or distance queries then run in $O(\\log N)$ or $O(\\log^2 N)$ depending on the auxiliary structure per centroid.`,
        display_order: 3,
      },
      {
        id: 'sec-centroid-decomposition-4',
        topic_id: 'ext-centroid-decomposition',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> After marking a centroid removed you must **recompute subtree sizes** for each sub-component; reusing stale sizes from the whole tree gives wrong centroids and can destroy the $O(\\log N)$ depth guarantee.

Common mistakes:
- Recomputing sizes over the entire original tree instead of the current component.
- Double-counting paths that stay within a single child subtree of the centroid (subtract per-subtree contributions).
- Forgetting to track the "removed" flag, causing infinite recursion.

Use cases: counting paths of a given length or weight, nearest-marked-vertex queries, and offline distance queries on trees.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-centroid-decomposition-py',
        topic_id: 'ext-centroid-decomposition',
        language: 'python',
        is_optimized: true,
        code: `import sys

def centroid_decomposition(n, adj):
    sys.setrecursionlimit(10 ** 6)
    removed = [False] * n
    subtree = [0] * n
    cparent = [-1] * n  # parent in the centroid tree

    def calc_size(u, p):
        subtree[u] = 1
        for v in adj[u]:
            if v != p and not removed[v]:
                subtree[u] += calc_size(v, u)
        return subtree[u]

    def find_centroid(u, p, comp_size):
        for v in adj[u]:
            if v != p and not removed[v] and subtree[v] > comp_size // 2:
                return find_centroid(v, u, comp_size)
        return u

    def decompose(entry, cp):
        comp_size = calc_size(entry, -1)
        c = find_centroid(entry, -1, comp_size)
        cparent[c] = cp
        removed[c] = True
        for v in adj[c]:
            if not removed[v]:
                decompose(v, c)
        return c

    root = decompose(0, -1)
    return cparent, root`,
        explanation: 'Recomputes sizes per component, finds the centroid, marks it removed, and recurses.',
      },
      {
        id: 'snip-centroid-decomposition-js',
        topic_id: 'ext-centroid-decomposition',
        language: 'javascript',
        is_optimized: true,
        code: `function centroidDecomposition(n, adj) {
  const removed = new Array(n).fill(false);
  const subtree = new Array(n).fill(0);
  const cparent = new Array(n).fill(-1);

  function calcSize(u, p) {
    subtree[u] = 1;
    for (const v of adj[u]) {
      if (v !== p && !removed[v]) subtree[u] += calcSize(v, u);
    }
    return subtree[u];
  }
  function findCentroid(u, p, compSize) {
    for (const v of adj[u]) {
      if (v !== p && !removed[v] && subtree[v] > compSize >> 1) {
        return findCentroid(v, u, compSize);
      }
    }
    return u;
  }
  function decompose(entry, cp) {
    const compSize = calcSize(entry, -1);
    const c = findCentroid(entry, -1, compSize);
    cparent[c] = cp;
    removed[c] = true;
    for (const v of adj[c]) if (!removed[v]) decompose(v, c);
    return c;
  }
  const root = decompose(0, -1);
  return { cparent, root };
}`,
        explanation: 'JavaScript centroid decomposition returning the centroid-tree parent array and its root.',
      },
      {
        id: 'snip-centroid-decomposition-cpp',
        topic_id: 'ext-centroid-decomposition',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

struct CentroidDecomposition {
    int n;
    vector<vector<int>> adj;
    vector<bool> removed;
    vector<int> subtree, cparent;
    CentroidDecomposition(int n, vector<vector<int>>& adj)
        : n(n), adj(adj), removed(n, false), subtree(n, 0), cparent(n, -1) {
        decompose(0, -1);
    }
    int calcSize(int u, int p) {
        subtree[u] = 1;
        for (int v : adj[u])
            if (v != p && !removed[v]) subtree[u] += calcSize(v, u);
        return subtree[u];
    }
    int findCentroid(int u, int p, int compSize) {
        for (int v : adj[u])
            if (v != p && !removed[v] && subtree[v] > compSize / 2)
                return findCentroid(v, u, compSize);
        return u;
    }
    int decompose(int entry, int cp) {
        int compSize = calcSize(entry, -1);
        int c = findCentroid(entry, -1, compSize);
        cparent[c] = cp;
        removed[c] = true;
        for (int v : adj[c]) if (!removed[v]) decompose(v, c);
        return c;
    }
};`,
        explanation: 'C++ centroid decomposition; sizes are recomputed for each component before locating its centroid.',
      },
      {
        id: 'snip-centroid-decomposition-java',
        topic_id: 'ext-centroid-decomposition',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

public class CentroidDecomposition {
    int n;
    List<Integer>[] adj;
    boolean[] removed;
    int[] subtree, cparent;

    CentroidDecomposition(int n, List<Integer>[] adj) {
        this.n = n; this.adj = adj;
        removed = new boolean[n];
        subtree = new int[n];
        cparent = new int[n]; Arrays.fill(cparent, -1);
        decompose(0, -1);
    }
    int calcSize(int u, int p) {
        subtree[u] = 1;
        for (int v : adj[u])
            if (v != p && !removed[v]) subtree[u] += calcSize(v, u);
        return subtree[u];
    }
    int findCentroid(int u, int p, int compSize) {
        for (int v : adj[u])
            if (v != p && !removed[v] && subtree[v] > compSize / 2)
                return findCentroid(v, u, compSize);
        return u;
    }
    int decompose(int entry, int cp) {
        int compSize = calcSize(entry, -1);
        int c = findCentroid(entry, -1, compSize);
        cparent[c] = cp;
        removed[c] = true;
        for (int v : adj[c]) if (!removed[v]) decompose(v, c);
        return c;
    }
}`,
        explanation: 'Java centroid decomposition building the centroid tree via recursive halving.',
      },
    ],
    quizId: 'quiz-ext-centroid-decomposition',
    quizTitle: 'Centroid Decomposition Quiz',
    quizDescription: 'Assess your understanding of centroids, the centroid tree, and its complexity.',
    questions: [
      {
        id: 'q-centroid-decomposition-1',
        quiz_id: 'quiz-ext-centroid-decomposition',
        question_text: 'What defines the centroid of a tree?',
        question_type: 'MCQ',
        options: [
          'The vertex with the highest degree',
          'The vertex whose removal leaves all components of size at most N/2',
          'The deepest leaf',
          'The root of the tree',
        ],
        correct_option_index: 1,
        explanation: 'Removing the centroid guarantees every remaining component has size at most N/2.',
      },
      {
        id: 'q-centroid-decomposition-2',
        quiz_id: 'quiz-ext-centroid-decomposition',
        question_text: 'The centroid tree has depth O(log N) because each level at least halves the component size.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Since components halve at each level, a vertex descends at most O(log N) levels.',
      },
      {
        id: 'q-centroid-decomposition-3',
        quiz_id: 'quiz-ext-centroid-decomposition',
        question_text: 'What is the time complexity to build a centroid decomposition of a tree?',
        question_type: 'COMPLEXITY',
        options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(log N)'],
        correct_option_index: 1,
        explanation: 'O(log N) levels, each doing O(N) total size/centroid work, gives O(N log N).',
      },
    ],
  },
];
