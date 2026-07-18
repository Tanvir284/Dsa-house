import { CurriculumModule } from '@/types';
import { CATEGORY_IDS } from '../linear';

export const graphsAModules: CurriculumModule[] = [
  // 1. ADJACENCY MATRIX
  {
    topic: {
      id: 'ext-adjacency-matrix',
      slug: 'adjacency-matrix',
      category_id: CATEGORY_IDS.graphs,
      title: 'Adjacency Matrix',
      definition: 'An adjacency matrix is a two-dimensional $V \\times V$ array where entry $(i, j)$ records whether an edge exists from vertex $i$ to vertex $j$, storing a weight or a boolean flag.',
      importance: 'It gives $O(1)$ edge lookups and a compact algebraic view of graphs, making it ideal for dense graphs and algorithms like Floyd-Warshall that operate on the matrix directly.',
      prerequisites: ['array'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1) edge lookup',
      time_complexity_average: 'O(1) edge lookup / O(V) neighbor scan',
      time_complexity_worst: 'O(V^2) full traversal',
      space_complexity: 'O(V^2)',
      display_order: 400,
    },
    sections: [
      {
        id: 'sec-adjacency-matrix-1',
        topic_id: 'ext-adjacency-matrix',
        title: 'Concept & Intuition',
        content: `Picture a grid the size of a chessboard, but with one row and one column per vertex. The cell at row $i$, column $j$ answers a single yes/no question: **is there an edge from vertex $i$ to vertex $j$?**

For an unweighted graph the cell holds $1$ (edge) or $0$ (no edge). For a weighted graph it holds the edge weight, using a sentinel such as $\\infty$ to mean "no connection."

> [!NOTE]
> For an **undirected** graph the matrix is symmetric: $M[i][j] = M[j][i]$. A **directed** graph may be asymmetric.`,
        display_order: 1,
      },
      {
        id: 'sec-adjacency-matrix-2',
        topic_id: 'ext-adjacency-matrix',
        title: 'How It Works',
        content: `Represent the graph as a $V \\times V$ array \`M\`. To add an edge $(u, v)$ you set \`M[u][v] = 1\` (and \`M[v][u] = 1\` if undirected). To check whether $u$ and $v$ are adjacent you simply read \`M[u][v]\` in $O(1)$ time.

Listing all neighbors of a vertex $u$ requires scanning its entire row, which is $O(V)$ regardless of how many neighbors actually exist. A full graph traversal touches every cell, costing $O(V^2)$.`,
        display_order: 2,
      },
      {
        id: 'sec-adjacency-matrix-3',
        topic_id: 'ext-adjacency-matrix',
        title: 'Complexity Analysis',
        content: `- **Space:** $O(V^2)$ — every possible pair of vertices reserves a cell, whether or not an edge exists.
- **Edge lookup / update:** $O(1)$.
- **Iterating neighbors of one vertex:** $O(V)$.
- **Iterating all edges:** $O(V^2)$.

This makes the matrix efficient for **dense** graphs where $E$ approaches $V^2$, since the memory would be used anyway and constant-time lookups shine.`,
        display_order: 3,
      },
      {
        id: 'sec-adjacency-matrix-4',
        topic_id: 'ext-adjacency-matrix',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> On a **sparse** graph the $O(V^2)$ memory is wasteful. A social network with millions of users but few connections each would exhaust memory as a matrix.

Common mistakes:
- Forgetting to set both \`M[u][v]\` and \`M[v][u]\` for undirected graphs.
- Using $0$ as "no edge" when $0$ is also a valid weight — use a distinct sentinel like $\\infty$.

Best used for dense graphs, algorithms needing fast edge queries, and matrix-based methods such as Floyd-Warshall or transitive closure.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-adjacency-matrix-py',
        topic_id: 'ext-adjacency-matrix',
        language: 'python',
        is_optimized: true,
        code: `class GraphMatrix:
    def __init__(self, n):
        self.n = n
        self.adj = [[0] * n for _ in range(n)]

    def add_edge(self, u, v, directed=False):
        self.adj[u][v] = 1
        if not directed:
            self.adj[v][u] = 1

    def has_edge(self, u, v):
        return self.adj[u][v] == 1  # O(1)

    def neighbors(self, u):
        return [v for v in range(self.n) if self.adj[u][v]]`,
        explanation: 'A dense representation giving O(1) edge checks; listing neighbors scans one row in O(V).',
      },
      {
        id: 'snip-adjacency-matrix-js',
        topic_id: 'ext-adjacency-matrix',
        language: 'javascript',
        is_optimized: true,
        code: `class GraphMatrix {
  constructor(n) {
    this.n = n;
    this.adj = Array.from({ length: n }, () => new Array(n).fill(0));
  }
  addEdge(u, v, directed = false) {
    this.adj[u][v] = 1;
    if (!directed) this.adj[v][u] = 1;
  }
  hasEdge(u, v) {
    return this.adj[u][v] === 1; // O(1)
  }
  neighbors(u) {
    const res = [];
    for (let v = 0; v < this.n; v++) if (this.adj[u][v]) res.push(v);
    return res;
  }
}`,
        explanation: 'Array.fill builds the V x V grid; edge queries are constant time.',
      },
      {
        id: 'snip-adjacency-matrix-cpp',
        topic_id: 'ext-adjacency-matrix',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

class GraphMatrix {
    int n;
    vector<vector<int>> adj;
public:
    GraphMatrix(int n) : n(n), adj(n, vector<int>(n, 0)) {}

    void addEdge(int u, int v, bool directed = false) {
        adj[u][v] = 1;
        if (!directed) adj[v][u] = 1;
    }
    bool hasEdge(int u, int v) const { return adj[u][v] == 1; } // O(1)

    vector<int> neighbors(int u) const {
        vector<int> res;
        for (int v = 0; v < n; ++v) if (adj[u][v]) res.push_back(v);
        return res;
    }
};`,
        explanation: 'A vector of vectors stores the matrix; adjacency checks run in constant time.',
      },
      {
        id: 'snip-adjacency-matrix-java',
        topic_id: 'ext-adjacency-matrix',
        language: 'java',
        is_optimized: true,
        code: `import java.util.ArrayList;
import java.util.List;

class GraphMatrix {
    private final int n;
    private final int[][] adj;

    GraphMatrix(int n) {
        this.n = n;
        this.adj = new int[n][n];
    }
    void addEdge(int u, int v, boolean directed) {
        adj[u][v] = 1;
        if (!directed) adj[v][u] = 1;
    }
    boolean hasEdge(int u, int v) { return adj[u][v] == 1; } // O(1)

    List<Integer> neighbors(int u) {
        List<Integer> res = new ArrayList<>();
        for (int v = 0; v < n; v++) if (adj[u][v] == 1) res.add(v);
        return res;
    }
}`,
        explanation: 'A primitive int[][] gives cache-friendly O(1) edge lookups.',
      },
    ],
    quizId: 'quiz-ext-adjacency-matrix',
    quizTitle: 'Adjacency Matrix Quiz',
    quizDescription: 'Check your grasp of matrix-based graph representation and its trade-offs.',
    questions: [
      {
        id: 'q-adjacency-matrix-1',
        quiz_id: 'quiz-ext-adjacency-matrix',
        question_text: 'What is the space complexity of an adjacency matrix for a graph with V vertices?',
        question_type: 'COMPLEXITY',
        options: ['O(V)', 'O(V + E)', 'O(V^2)', 'O(E)'],
        correct_option_index: 2,
        explanation: 'A V x V grid reserves a cell for every pair of vertices, giving O(V^2) regardless of edge count.',
      },
      {
        id: 'q-adjacency-matrix-2',
        quiz_id: 'quiz-ext-adjacency-matrix',
        question_text: 'For an undirected graph, the adjacency matrix is always symmetric across its main diagonal.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'An undirected edge (u, v) sets both M[u][v] and M[v][u], producing a symmetric matrix.',
      },
      {
        id: 'q-adjacency-matrix-3',
        quiz_id: 'quiz-ext-adjacency-matrix',
        question_text: 'Which scenario best suits an adjacency matrix over an adjacency list?',
        question_type: 'MCQ',
        options: ['A very sparse graph with millions of vertices', 'A dense graph needing frequent O(1) edge lookups', 'Storing a graph with minimal memory', 'A graph where you only ever iterate existing edges'],
        correct_option_index: 1,
        explanation: 'Dense graphs use the memory anyway and benefit most from constant-time edge queries.',
      },
    ],
  },
  // 2. ADJACENCY LIST
  {
    topic: {
      id: 'ext-adjacency-list',
      slug: 'adjacency-list',
      category_id: CATEGORY_IDS.graphs,
      title: 'Adjacency List',
      definition: 'An adjacency list represents a graph as an array (or map) of lists, where each vertex stores a list of the vertices it is directly connected to, optionally with edge weights.',
      importance: 'It uses only $O(V + E)$ memory and lets algorithms iterate a vertex\'s actual neighbors efficiently, making it the default representation for the sparse graphs common in practice.',
      prerequisites: ['array', 'linked-list'],
      difficulty: 'Beginner',
      time_complexity_best: 'O(1) add edge',
      time_complexity_average: 'O(degree) neighbor scan',
      time_complexity_worst: 'O(V + E) full traversal',
      space_complexity: 'O(V + E)',
      display_order: 401,
    },
    sections: [
      {
        id: 'sec-adjacency-list-1',
        topic_id: 'ext-adjacency-list',
        title: 'Concept & Intuition',
        content: `Instead of reserving a cell for every possible pair of vertices, an adjacency list keeps, for each vertex, a short list of only the neighbors it actually has.

Think of a contacts app: each person has a list of friends. You never store "not-a-friend" entries — you only record real connections. This is exactly why the representation is so memory-efficient for sparse graphs.

> [!NOTE]
> Total storage is $O(V + E)$: one slot per vertex plus one entry per edge (two entries per undirected edge).`,
        display_order: 1,
      },
      {
        id: 'sec-adjacency-list-2',
        topic_id: 'ext-adjacency-list',
        title: 'How It Works',
        content: `Maintain an array \`adj\` of size $V$ where \`adj[u]\` is a list of $u$'s neighbors. To add edge $(u, v)$ you append $v$ to \`adj[u]\` (and $u$ to \`adj[v]\` if undirected) in $O(1)$.

Iterating the neighbors of $u$ costs $O(\\deg(u))$ — proportional to the real number of edges, not $V$. A full traversal (BFS/DFS) therefore visits every vertex and edge exactly once for $O(V + E)$.`,
        display_order: 2,
      },
      {
        id: 'sec-adjacency-list-3',
        topic_id: 'ext-adjacency-list',
        title: 'Complexity Analysis',
        content: `- **Space:** $O(V + E)$ — proportional to the actual graph size.
- **Add edge:** $O(1)$ amortized (append to a list).
- **Check if edge $(u, v)$ exists:** $O(\\deg(u))$ — you must scan $u$'s list.
- **Iterate neighbors:** $O(\\deg(u))$.
- **Full traversal:** $O(V + E)$.

The one weakness compared to a matrix is edge existence queries, which are no longer $O(1)$ unless each list is backed by a hash set.`,
        display_order: 3,
      },
      {
        id: 'sec-adjacency-list-4',
        topic_id: 'ext-adjacency-list',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Checking whether a specific edge exists is $O(\\deg(u))$, which can be slow for high-degree vertices. If you need fast edge lookups, back each adjacency list with a hash set.

Common mistakes:
- Adding only one direction for an undirected edge.
- Assuming neighbor order is meaningful — it depends on insertion order.

This is the go-to representation for most graph algorithms (BFS, DFS, Dijkstra, topological sort) and for real-world sparse graphs like road networks and social graphs.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-adjacency-list-py',
        topic_id: 'ext-adjacency-list',
        language: 'python',
        is_optimized: true,
        code: `from collections import defaultdict

class GraphList:
    def __init__(self):
        self.adj = defaultdict(list)

    def add_edge(self, u, v, directed=False):
        self.adj[u].append(v)
        if not directed:
            self.adj[v].append(u)

    def neighbors(self, u):
        return self.adj[u]  # O(1) to fetch, O(deg) to iterate`,
        explanation: 'defaultdict(list) auto-creates empty lists; storage stays O(V + E).',
      },
      {
        id: 'snip-adjacency-list-js',
        topic_id: 'ext-adjacency-list',
        language: 'javascript',
        is_optimized: true,
        code: `class GraphList {
  constructor() {
    this.adj = new Map();
  }
  addEdge(u, v, directed = false) {
    if (!this.adj.has(u)) this.adj.set(u, []);
    this.adj.get(u).push(v);
    if (!directed) {
      if (!this.adj.has(v)) this.adj.set(v, []);
      this.adj.get(v).push(u);
    }
  }
  neighbors(u) {
    return this.adj.get(u) || [];
  }
}`,
        explanation: 'A Map of arrays scales with the number of real edges rather than V^2.',
      },
      {
        id: 'snip-adjacency-list-cpp',
        topic_id: 'ext-adjacency-list',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

class GraphList {
    vector<vector<int>> adj;
public:
    GraphList(int n) : adj(n) {}

    void addEdge(int u, int v, bool directed = false) {
        adj[u].push_back(v);
        if (!directed) adj[v].push_back(u);
    }
    const vector<int>& neighbors(int u) const { return adj[u]; }
};`,
        explanation: 'A vector of vectors; iterating adj[u] costs O(deg(u)).',
      },
      {
        id: 'snip-adjacency-list-java',
        topic_id: 'ext-adjacency-list',
        language: 'java',
        is_optimized: true,
        code: `import java.util.ArrayList;
import java.util.List;

class GraphList {
    private final List<List<Integer>> adj;

    GraphList(int n) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    }
    void addEdge(int u, int v, boolean directed) {
        adj.get(u).add(v);
        if (!directed) adj.get(v).add(u);
    }
    List<Integer> neighbors(int u) { return adj.get(u); }
}`,
        explanation: 'A list of lists keeps memory at O(V + E) and iteration proportional to degree.',
      },
    ],
    quizId: 'quiz-ext-adjacency-list',
    quizTitle: 'Adjacency List Quiz',
    quizDescription: 'Verify your understanding of list-based graph representation.',
    questions: [
      {
        id: 'q-adjacency-list-1',
        quiz_id: 'quiz-ext-adjacency-list',
        question_text: 'What is the space complexity of an adjacency list for a graph with V vertices and E edges?',
        question_type: 'COMPLEXITY',
        options: ['O(V^2)', 'O(V + E)', 'O(E^2)', 'O(V)'],
        correct_option_index: 1,
        explanation: 'One slot per vertex plus one entry per edge gives O(V + E).',
      },
      {
        id: 'q-adjacency-list-2',
        quiz_id: 'quiz-ext-adjacency-list',
        question_text: 'Checking whether a specific edge (u, v) exists in an adjacency list is O(1) in the worst case.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'It requires scanning the neighbor list of u, costing O(deg(u)) unless a hash set backs it.',
      },
      {
        id: 'q-adjacency-list-3',
        quiz_id: 'quiz-ext-adjacency-list',
        question_text: 'Why is an adjacency list preferred for sparse graphs?',
        question_type: 'MCQ',
        options: ['It guarantees O(1) edge existence checks', 'It uses only O(V + E) memory instead of O(V^2)', 'It keeps neighbors sorted automatically', 'It supports negative weights better'],
        correct_option_index: 1,
        explanation: 'Sparse graphs have few edges, so O(V + E) is far smaller than the matrix O(V^2).',
      },
    ],
  },
  // 3. DIJKSTRA'S ALGORITHM
  {
    topic: {
      id: 'ext-dijkstras-algorithm',
      slug: 'dijkstras-algorithm',
      category_id: CATEGORY_IDS.graphs,
      title: 'Dijkstra\'s Algorithm',
      definition: 'Dijkstra\'s algorithm computes the shortest path from a single source vertex to all other vertices in a graph with non-negative edge weights by greedily expanding the closest unfinalized vertex.',
      importance: 'It is the backbone of routing, network protocols, and navigation systems, delivering optimal shortest paths efficiently whenever edge weights are non-negative.',
      prerequisites: ['adjacency-list', 'heap'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(E + V log V) with a Fibonacci heap',
      time_complexity_average: 'O((V + E) log V) with a binary heap',
      time_complexity_worst: 'O((V + E) log V)',
      space_complexity: 'O(V + E)',
      display_order: 402,
    },
    sections: [
      {
        id: 'sec-dijkstras-algorithm-1',
        topic_id: 'ext-dijkstras-algorithm',
        title: 'Concept & Intuition',
        content: `Imagine ripples spreading from a source across a weighted map. Dijkstra always finalizes the **nearest** vertex not yet settled, confident that no cheaper route to it can appear later — because all edges are non-negative.

Each vertex holds a tentative distance, initially $\\infty$ except the source at $0$. We repeatedly pick the smallest tentative distance, lock it in, and relax its outgoing edges.

> [!NOTE]
> The greedy choice is only valid because negative edges are forbidden. A later, cheaper detour is impossible when every step adds non-negative cost.`,
        display_order: 1,
      },
      {
        id: 'sec-dijkstras-algorithm-2',
        topic_id: 'ext-dijkstras-algorithm',
        title: 'How It Works',
        content: `1. Set \`dist[source] = 0\` and all others to $\\infty$.
2. Push the source into a min-priority queue keyed by distance.
3. Pop the vertex $u$ with the smallest distance. If it is already settled, skip it.
4. **Relax** each edge $(u, v, w)$: if \`dist[u] + w < dist[v]\`, update \`dist[v]\` and push $v$.
5. Repeat until the queue empties.

The lazy-deletion trick — pushing duplicates and skipping stale pops — avoids the need for a decrease-key operation.`,
        display_order: 2,
      },
      {
        id: 'sec-dijkstras-algorithm-3',
        topic_id: 'ext-dijkstras-algorithm',
        title: 'Complexity Analysis',
        content: `With a **binary heap**, each of the $E$ relaxations may push to the queue ($O(\\log V)$ each) and each of the $V$ vertices is extracted once, giving $O((V + E) \\log V)$.

A **Fibonacci heap** lowers this to $O(E + V \\log V)$ in theory by making decrease-key $O(1)$ amortized, though binary heaps win in practice due to smaller constants.

Space is $O(V + E)$ for the adjacency list, distance array, and queue.`,
        display_order: 3,
      },
      {
        id: 'sec-dijkstras-algorithm-4',
        topic_id: 'ext-dijkstras-algorithm',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Dijkstra fails with **negative edge weights**. A negative edge can create a cheaper path to an already-settled vertex, violating the greedy invariant. Use Bellman-Ford instead.

Common mistakes:
- Forgetting to skip stale queue entries, causing wasted work.
- Assuming it detects negative cycles — it does not.

Used in GPS navigation, OSPF/IS-IS network routing, and as a subroutine in algorithms like A* (with a heuristic of zero).`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-dijkstras-algorithm-py',
        topic_id: 'ext-dijkstras-algorithm',
        language: 'python',
        is_optimized: true,
        code: `import heapq

def dijkstra(graph, source, n):
    # graph[u] = list of (v, weight); returns dist array
    dist = [float('inf')] * n
    dist[source] = 0
    pq = [(0, source)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue  # stale entry
        for v, w in graph[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
        explanation: 'Uses a min-heap with lazy deletion; stale pops are skipped when d > dist[u].',
      },
      {
        id: 'snip-dijkstras-algorithm-js',
        topic_id: 'ext-dijkstras-algorithm',
        language: 'javascript',
        is_optimized: true,
        code: `// Min-heap via a sorted structure is simplest with a binary heap class.
// Here we use a compact array-based priority queue.
function dijkstra(graph, source, n) {
  const dist = new Array(n).fill(Infinity);
  dist[source] = 0;
  const pq = [[0, source]]; // [distance, vertex]
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > dist[u]) continue;
    for (const [v, w] of graph[u]) {
      if (d + w < dist[v]) {
        dist[v] = d + w;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}`,
        explanation: 'Relaxes edges from the closest vertex; a real heap replaces the sort for O((V+E) log V).',
      },
      {
        id: 'snip-dijkstras-algorithm-cpp',
        topic_id: 'ext-dijkstras-algorithm',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <queue>
#include <climits>
using namespace std;

vector<long long> dijkstra(const vector<vector<pair<int,int>>>& graph, int source, int n) {
    vector<long long> dist(n, LLONG_MAX);
    dist[source] = 0;
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    pq.push({0, source});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
        explanation: 'A greater<> priority_queue acts as a min-heap; long long avoids overflow when summing weights.',
      },
      {
        id: 'snip-dijkstras-algorithm-java',
        topic_id: 'ext-dijkstras-algorithm',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class Dijkstra {
    // graph[u] = list of int[]{v, w}
    static long[] shortestPaths(List<int[]>[] graph, int source, int n) {
        long[] dist = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[source] = 0;
        PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        pq.add(new long[]{0, source});
        while (!pq.isEmpty()) {
            long[] top = pq.poll();
            long d = top[0];
            int u = (int) top[1];
            if (d > dist[u]) continue;
            for (int[] e : graph[u]) {
                int v = e[0], w = e[1];
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    pq.add(new long[]{dist[v], v});
                }
            }
        }
        return dist;
    }
}`,
        explanation: 'A PriorityQueue ordered by distance settles vertices in increasing order of shortest distance.',
      },
    ],
    quizId: 'quiz-ext-dijkstras-algorithm',
    quizTitle: 'Dijkstra\'s Algorithm Quiz',
    quizDescription: 'Test your understanding of single-source shortest paths with non-negative weights.',
    questions: [
      {
        id: 'q-dijkstras-algorithm-1',
        quiz_id: 'quiz-ext-dijkstras-algorithm',
        question_text: 'What is the time complexity of Dijkstra using a binary heap?',
        question_type: 'COMPLEXITY',
        options: ['O(V^2)', 'O((V + E) log V)', 'O(V * E)', 'O(E log E) only'],
        correct_option_index: 1,
        explanation: 'Each edge relaxation pushes to the heap in O(log V), giving O((V + E) log V) overall.',
      },
      {
        id: 'q-dijkstras-algorithm-2',
        quiz_id: 'quiz-ext-dijkstras-algorithm',
        question_text: 'Dijkstra\'s algorithm produces correct shortest paths even when some edges have negative weights.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'Negative edges break the greedy invariant; Bellman-Ford must be used instead.',
      },
      {
        id: 'q-dijkstras-algorithm-3',
        quiz_id: 'quiz-ext-dijkstras-algorithm',
        question_text: 'Why does Dijkstra finalize the closest unsettled vertex first?',
        question_type: 'MCQ',
        options: ['Because heaps require it', 'Because with non-negative edges no cheaper path to it can appear later', 'To detect negative cycles', 'To minimize memory usage'],
        correct_option_index: 1,
        explanation: 'With non-negative weights, any alternative path can only add cost, so the closest vertex is already optimal.',
      },
    ],
  },
  // 4. BELLMAN-FORD ALGORITHM
  {
    topic: {
      id: 'ext-bellman-ford-algorithm',
      slug: 'bellman-ford-algorithm',
      category_id: CATEGORY_IDS.graphs,
      title: 'Bellman-Ford Algorithm',
      definition: 'Bellman-Ford computes single-source shortest paths in a weighted graph that may contain negative edge weights, and detects negative-weight cycles reachable from the source.',
      importance: 'It handles negative weights that Dijkstra cannot, and its negative-cycle detection underpins applications like currency arbitrage detection and distance-vector routing.',
      prerequisites: ['adjacency-list', 'dijkstras-algorithm'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(E) with early termination',
      time_complexity_average: 'O(V * E)',
      time_complexity_worst: 'O(V * E)',
      space_complexity: 'O(V)',
      display_order: 403,
    },
    sections: [
      {
        id: 'sec-bellman-ford-algorithm-1',
        topic_id: 'ext-bellman-ford-algorithm',
        title: 'Concept & Intuition',
        content: `Where Dijkstra is greedy, Bellman-Ford is patient. It simply relaxes **every edge** repeatedly, trusting that after enough passes the distances settle to their true minimums.

The key insight: a shortest path in a graph with $V$ vertices uses at most $V - 1$ edges. So after $V - 1$ full rounds of relaxing all edges, every shortest path has been discovered.

> [!NOTE]
> Because it never commits early, Bellman-Ford tolerates negative edges — a later relaxation can always correct an overestimate.`,
        display_order: 1,
      },
      {
        id: 'sec-bellman-ford-algorithm-2',
        topic_id: 'ext-bellman-ford-algorithm',
        title: 'How It Works',
        content: `1. Initialize \`dist[source] = 0\`, all others $\\infty$.
2. Repeat $V - 1$ times: for every edge $(u, v, w)$, if \`dist[u] + w < dist[v]\`, set \`dist[v] = dist[u] + w\`.
3. **Negative-cycle check:** do one more pass. If any edge can still be relaxed, a negative-weight cycle exists.

Each round propagates correct distances one more edge deeper into the graph, which is why $V - 1$ rounds suffice.`,
        display_order: 2,
      },
      {
        id: 'sec-bellman-ford-algorithm-3',
        topic_id: 'ext-bellman-ford-algorithm',
        title: 'Complexity Analysis',
        content: `- **Time:** $O(V \\cdot E)$ — $V - 1$ rounds, each relaxing all $E$ edges.
- **Space:** $O(V)$ for the distance array (edges can be stored as a flat list).

An optimization stops early if a full round produces no update, giving $O(E)$ in the best case. It is asymptotically slower than Dijkstra's $O((V + E) \\log V)$, the price paid for handling negative weights.`,
        display_order: 3,
      },
      {
        id: 'sec-bellman-ford-algorithm-4',
        topic_id: 'ext-bellman-ford-algorithm',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> If a negative cycle is reachable from the source, shortest paths are undefined (they tend to $-\\infty$). Always run the extra detection pass when negative edges are possible.

Common mistakes:
- Running only $V - 1$ rounds and ignoring the detection pass.
- Overflow when adding $\\infty$ to a weight — guard with a check that \`dist[u]\` is finite.

Used in distance-vector routing (RIP), detecting arbitrage in currency exchange graphs, and as the first phase of Johnson's algorithm.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-bellman-ford-algorithm-py',
        topic_id: 'ext-bellman-ford-algorithm',
        language: 'python',
        is_optimized: true,
        code: `def bellman_ford(edges, n, source):
    # edges = list of (u, v, w); returns (dist, has_negative_cycle)
    INF = float('inf')
    dist = [INF] * n
    dist[source] = 0
    for _ in range(n - 1):
        updated = False
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True
        if not updated:
            break
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            return dist, True  # negative cycle
    return dist, False`,
        explanation: 'Relaxes all edges up to n-1 times with early exit, then one extra pass detects negative cycles.',
      },
      {
        id: 'snip-bellman-ford-algorithm-js',
        topic_id: 'ext-bellman-ford-algorithm',
        language: 'javascript',
        is_optimized: true,
        code: `function bellmanFord(edges, n, source) {
  const dist = new Array(n).fill(Infinity);
  dist[source] = 0;
  for (let i = 0; i < n - 1; i++) {
    let updated = false;
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        updated = true;
      }
    }
    if (!updated) break;
  }
  let hasNegativeCycle = false;
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      hasNegativeCycle = true;
      break;
    }
  }
  return { dist, hasNegativeCycle };
}`,
        explanation: 'The finite-distance guard prevents Infinity + w overflow artifacts during relaxation.',
      },
      {
        id: 'snip-bellman-ford-algorithm-cpp',
        topic_id: 'ext-bellman-ford-algorithm',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <climits>
#include <tuple>
using namespace std;

// edges = list of (u, v, w). Returns true if a negative cycle exists.
bool bellmanFord(const vector<tuple<int,int,int>>& edges, int n, int source, vector<long long>& dist) {
    dist.assign(n, LLONG_MAX);
    dist[source] = 0;
    for (int i = 0; i < n - 1; ++i) {
        bool updated = false;
        for (auto [u, v, w] : edges) {
            if (dist[u] != LLONG_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                updated = true;
            }
        }
        if (!updated) break;
    }
    for (auto [u, v, w] : edges)
        if (dist[u] != LLONG_MAX && dist[u] + w < dist[v])
            return true;
    return false;
}`,
        explanation: 'Passes dist by reference and returns a negative-cycle flag; guards against overflow.',
      },
      {
        id: 'snip-bellman-ford-algorithm-java',
        topic_id: 'ext-bellman-ford-algorithm',
        language: 'java',
        is_optimized: true,
        code: `import java.util.Arrays;

class BellmanFord {
    // edges[i] = {u, v, w}
    static boolean run(int[][] edges, int n, int source, long[] dist) {
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[source] = 0;
        for (int i = 0; i < n - 1; i++) {
            boolean updated = false;
            for (int[] e : edges) {
                int u = e[0], v = e[1], w = e[2];
                if (dist[u] != Long.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    updated = true;
                }
            }
            if (!updated) break;
        }
        for (int[] e : edges) {
            int u = e[0], v = e[1], w = e[2];
            if (dist[u] != Long.MAX_VALUE && dist[u] + w < dist[v]) return true;
        }
        return false;
    }
}`,
        explanation: 'Returns true when a negative cycle is detected in the final verification pass.',
      },
    ],
    quizId: 'quiz-ext-bellman-ford-algorithm',
    quizTitle: 'Bellman-Ford Algorithm Quiz',
    quizDescription: 'Test your understanding of shortest paths with negative weights and cycle detection.',
    questions: [
      {
        id: 'q-bellman-ford-algorithm-1',
        quiz_id: 'quiz-ext-bellman-ford-algorithm',
        question_text: 'What is the time complexity of the standard Bellman-Ford algorithm?',
        question_type: 'COMPLEXITY',
        options: ['O((V + E) log V)', 'O(V * E)', 'O(V^2)', 'O(E log V)'],
        correct_option_index: 1,
        explanation: 'It performs V - 1 rounds, each relaxing all E edges, giving O(V * E).',
      },
      {
        id: 'q-bellman-ford-algorithm-2',
        quiz_id: 'quiz-ext-bellman-ford-algorithm',
        question_text: 'Bellman-Ford can detect the presence of a negative-weight cycle reachable from the source.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'A relaxation succeeding on an extra Vth pass signals a negative cycle.',
      },
      {
        id: 'q-bellman-ford-algorithm-3',
        quiz_id: 'quiz-ext-bellman-ford-algorithm',
        question_text: 'Why are V - 1 relaxation rounds sufficient for a graph with V vertices?',
        question_type: 'MCQ',
        options: ['Because heaps guarantee it', 'Because a shortest simple path has at most V - 1 edges', 'Because edges are non-negative', 'Because the graph is always a tree'],
        correct_option_index: 1,
        explanation: 'A shortest path visits each vertex at most once, so it uses at most V - 1 edges; each round extends reach by one edge.',
      },
    ],
  },
  // 5. FLOYD-WARSHALL ALGORITHM
  {
    topic: {
      id: 'ext-floyd-warshall-algorithm',
      slug: 'floyd-warshall-algorithm',
      category_id: CATEGORY_IDS.graphs,
      title: 'Floyd-Warshall Algorithm',
      definition: 'Floyd-Warshall is a dynamic-programming algorithm that computes shortest paths between all pairs of vertices in a weighted graph, allowing negative edges but not negative cycles.',
      importance: 'It solves the all-pairs shortest path problem with strikingly simple triple-nested loops, making it ideal for dense graphs and transitive-closure computations.',
      prerequisites: ['adjacency-matrix', 'bellman-ford-algorithm'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(V^3)',
      time_complexity_average: 'O(V^3)',
      time_complexity_worst: 'O(V^3)',
      space_complexity: 'O(V^2)',
      display_order: 404,
    },
    sections: [
      {
        id: 'sec-floyd-warshall-algorithm-1',
        topic_id: 'ext-floyd-warshall-algorithm',
        title: 'Concept & Intuition',
        content: `Floyd-Warshall asks, for every pair $(i, j)$: **can we shorten the path by routing through some intermediate vertex $k$?**

It considers intermediate vertices one at a time. After processing vertex $k$, \`dist[i][j]\` holds the shortest path from $i$ to $j$ using only vertices $\\{0, 1, \\dots, k\\}$ as intermediates.

> [!NOTE]
> This is textbook dynamic programming: the answer for allowing intermediate $k$ is built directly from the answer that allowed only $k-1$.`,
        display_order: 1,
      },
      {
        id: 'sec-floyd-warshall-algorithm-2',
        topic_id: 'ext-floyd-warshall-algorithm',
        title: 'How It Works',
        content: `1. Initialize a $V \\times V$ matrix \`dist\` from the adjacency matrix: $0$ on the diagonal, edge weights where edges exist, $\\infty$ otherwise.
2. Triple loop with $k$ **outermost**:
$$dist[i][j] = \\min(dist[i][j],\\; dist[i][k] + dist[k][j])$$
3. After all $k$, \`dist[i][j]\` is the true shortest distance.

The ordering matters: $k$ must be the outer loop so each intermediate is fully incorporated before the next.`,
        display_order: 2,
      },
      {
        id: 'sec-floyd-warshall-algorithm-3',
        topic_id: 'ext-floyd-warshall-algorithm',
        title: 'Complexity Analysis',
        content: `- **Time:** $O(V^3)$ — three nested loops over all vertices.
- **Space:** $O(V^2)$ for the distance matrix (updated in place).

For a dense graph this beats running Dijkstra from every source ($O(V \\cdot (V+E)\\log V)$) in simplicity and often in practice. A negative cycle is present if any \`dist[i][i]\` becomes negative after the algorithm.`,
        display_order: 3,
      },
      {
        id: 'sec-floyd-warshall-algorithm-4',
        topic_id: 'ext-floyd-warshall-algorithm',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Putting the $k$ loop anywhere other than outermost produces wrong answers. The intermediate vertex must be the outer dimension of the DP.

Common mistakes:
- Adding to $\\infty$ and overflowing — guard the relaxation or use a large-but-safe sentinel.
- Forgetting the diagonal must start at $0$.

Best for dense all-pairs queries, computing transitive closure (with boolean OR/AND), and finding graph diameter on small-to-medium vertex counts.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-floyd-warshall-algorithm-py',
        topic_id: 'ext-floyd-warshall-algorithm',
        language: 'python',
        is_optimized: true,
        code: `def floyd_warshall(dist):
    # dist is a V x V matrix; 0 on diagonal, INF where no edge. Modified in place.
    n = len(dist)
    for k in range(n):
        for i in range(n):
            if dist[i][k] == float('inf'):
                continue
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`,
        explanation: 'The k-outermost triple loop with an early skip when dist[i][k] is unreachable.',
      },
      {
        id: 'snip-floyd-warshall-algorithm-js',
        topic_id: 'ext-floyd-warshall-algorithm',
        language: 'javascript',
        is_optimized: true,
        code: `function floydWarshall(dist) {
  const n = dist.length;
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      if (dist[i][k] === Infinity) continue;
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}`,
        explanation: 'Skipping rows where dist[i][k] is Infinity avoids needless work and overflow.',
      },
      {
        id: 'snip-floyd-warshall-algorithm-cpp',
        topic_id: 'ext-floyd-warshall-algorithm',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
using namespace std;

const long long INF = 1e18;

void floydWarshall(vector<vector<long long>>& dist) {
    int n = dist.size();
    for (int k = 0; k < n; ++k)
        for (int i = 0; i < n; ++i) {
            if (dist[i][k] == INF) continue;
            for (int j = 0; j < n; ++j)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
        }
}`,
        explanation: 'A large INF sentinel plus the unreachable skip prevents long long overflow.',
      },
      {
        id: 'snip-floyd-warshall-algorithm-java',
        topic_id: 'ext-floyd-warshall-algorithm',
        language: 'java',
        is_optimized: true,
        code: `class FloydWarshall {
    static final long INF = (long) 1e18;

    static void run(long[][] dist) {
        int n = dist.length;
        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++) {
                if (dist[i][k] == INF) continue;
                for (int j = 0; j < n; j++)
                    if (dist[i][k] + dist[k][j] < dist[i][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
            }
    }
}`,
        explanation: 'Updates the matrix in place; the finite-distance guard keeps sums within range.',
      },
    ],
    quizId: 'quiz-ext-floyd-warshall-algorithm',
    quizTitle: 'Floyd-Warshall Algorithm Quiz',
    quizDescription: 'Test your understanding of all-pairs shortest paths via dynamic programming.',
    questions: [
      {
        id: 'q-floyd-warshall-algorithm-1',
        quiz_id: 'quiz-ext-floyd-warshall-algorithm',
        question_text: 'What is the time complexity of Floyd-Warshall for V vertices?',
        question_type: 'COMPLEXITY',
        options: ['O(V^2)', 'O(V^3)', 'O(V * E)', 'O((V + E) log V)'],
        correct_option_index: 1,
        explanation: 'Three nested loops over all vertices give O(V^3).',
      },
      {
        id: 'q-floyd-warshall-algorithm-2',
        quiz_id: 'quiz-ext-floyd-warshall-algorithm',
        question_text: 'In Floyd-Warshall, the loop over the intermediate vertex k must be the outermost loop.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'The DP requires each intermediate vertex to be fully incorporated before the next, so k is outermost.',
      },
      {
        id: 'q-floyd-warshall-algorithm-3',
        quiz_id: 'quiz-ext-floyd-warshall-algorithm',
        question_text: 'How can Floyd-Warshall detect a negative cycle?',
        question_type: 'MCQ',
        options: ['If any dist[i][j] is Infinity', 'If any diagonal entry dist[i][i] becomes negative', 'If the matrix is not symmetric', 'It cannot detect negative cycles'],
        correct_option_index: 1,
        explanation: 'A negative value on the diagonal means a vertex can reach itself with negative total cost, i.e. a negative cycle.',
      },
    ],
  },
  // 6. PRIM'S MST
  {
    topic: {
      id: 'ext-prims-mst',
      slug: 'prims-mst',
      category_id: CATEGORY_IDS.graphs,
      title: 'Prim\'s Minimum Spanning Tree',
      definition: 'Prim\'s algorithm builds a minimum spanning tree of a connected, weighted, undirected graph by growing a single tree, repeatedly adding the cheapest edge that connects a new vertex to the tree.',
      importance: 'Minimum spanning trees minimize the total cost to connect all nodes, powering network design, clustering, and approximation algorithms; Prim excels on dense graphs.',
      prerequisites: ['adjacency-list', 'heap'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(E + V log V) with a Fibonacci heap',
      time_complexity_average: 'O(E log V) with a binary heap',
      time_complexity_worst: 'O(E log V)',
      space_complexity: 'O(V + E)',
      display_order: 405,
    },
    sections: [
      {
        id: 'sec-prims-mst-1',
        topic_id: 'ext-prims-mst',
        title: 'Concept & Intuition',
        content: `Prim grows a minimum spanning tree like a crystal: start from any vertex, then keep attaching the **cheapest edge** that reaches a vertex not yet in the tree.

At every step there is a frontier of edges crossing from the built tree to the outside. Prim always picks the lightest crossing edge, and the **cut property** guarantees that edge belongs to some MST.

> [!NOTE]
> Prim resembles Dijkstra, but the priority is the **edge weight to the tree**, not the accumulated path distance from a source.`,
        display_order: 1,
      },
      {
        id: 'sec-prims-mst-2',
        topic_id: 'ext-prims-mst',
        title: 'How It Works',
        content: `1. Pick any start vertex; set its key to $0$ and all others to $\\infty$.
2. Use a min-priority queue of (key, vertex).
3. Extract the vertex $u$ with the smallest key and mark it in the tree.
4. For each edge $(u, v, w)$ where $v$ is not yet in the tree and $w < key[v]$, update \`key[v] = w\` and push $v$.
5. Repeat until all vertices are included.

The sum of the chosen keys is the total MST weight.`,
        display_order: 2,
      },
      {
        id: 'sec-prims-mst-3',
        topic_id: 'ext-prims-mst',
        title: 'Complexity Analysis',
        content: `With a **binary heap** and adjacency list, each edge may trigger a push and each vertex is extracted once: $O(E \\log V)$.

A **Fibonacci heap** improves the theoretical bound to $O(E + V \\log V)$. For a **dense** graph, a simple $O(V^2)$ array-based version (no heap) can actually be faster because it avoids heap overhead.

Space is $O(V + E)$ for the graph, key array, and queue.`,
        display_order: 3,
      },
      {
        id: 'sec-prims-mst-4',
        topic_id: 'ext-prims-mst',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Prim assumes the graph is **connected**. On a disconnected graph it only finds the MST of the component containing the start vertex — you get a spanning tree, not a spanning forest.

Common mistakes:
- Re-adding vertices already finalized; always check the in-tree flag on extraction.
- Using it on directed graphs — MST is defined for undirected graphs.

Used in network cabling and circuit design, and as a building block in clustering and TSP approximations. Prim tends to beat Kruskal on dense graphs.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-prims-mst-py',
        topic_id: 'ext-prims-mst',
        language: 'python',
        is_optimized: true,
        code: `import heapq

def prim(graph, n, start=0):
    # graph[u] = list of (v, weight). Returns total MST weight.
    in_tree = [False] * n
    total = 0
    pq = [(0, start)]
    count = 0
    while pq and count < n:
        w, u = heapq.heappop(pq)
        if in_tree[u]:
            continue
        in_tree[u] = True
        total += w
        count += 1
        for v, wt in graph[u]:
            if not in_tree[v]:
                heapq.heappush(pq, (wt, v))
    return total`,
        explanation: 'Lazy Prim: pushes candidate edges and skips vertices already pulled into the tree.',
      },
      {
        id: 'snip-prims-mst-js',
        topic_id: 'ext-prims-mst',
        language: 'javascript',
        is_optimized: true,
        code: `function prim(graph, n, start = 0) {
  const inTree = new Array(n).fill(false);
  let total = 0, count = 0;
  const pq = [[0, start]]; // [weight, vertex]
  while (pq.length && count < n) {
    pq.sort((a, b) => a[0] - b[0]);
    const [w, u] = pq.shift();
    if (inTree[u]) continue;
    inTree[u] = true;
    total += w;
    count++;
    for (const [v, wt] of graph[u]) {
      if (!inTree[v]) pq.push([wt, v]);
    }
  }
  return total;
}`,
        explanation: 'Adds the lightest crossing edge each round; a real heap replaces the sort in production.',
      },
      {
        id: 'snip-prims-mst-cpp',
        topic_id: 'ext-prims-mst',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <queue>
using namespace std;

long long prim(const vector<vector<pair<int,int>>>& graph, int n, int start = 0) {
    vector<bool> inTree(n, false);
    long long total = 0;
    int count = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, start});
    while (!pq.empty() && count < n) {
        auto [w, u] = pq.top(); pq.pop();
        if (inTree[u]) continue;
        inTree[u] = true;
        total += w;
        ++count;
        for (auto [v, wt] : graph[u])
            if (!inTree[v]) pq.push({wt, v});
    }
    return total;
}`,
        explanation: 'A min-heap of (weight, vertex) grows the tree; finalized vertices are skipped.',
      },
      {
        id: 'snip-prims-mst-java',
        topic_id: 'ext-prims-mst',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class Prim {
    // graph[u] = list of int[]{v, w}
    static long mstWeight(List<int[]>[] graph, int n, int start) {
        boolean[] inTree = new boolean[n];
        long total = 0;
        int count = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        pq.add(new int[]{0, start});
        while (!pq.isEmpty() && count < n) {
            int[] top = pq.poll();
            int w = top[0], u = top[1];
            if (inTree[u]) continue;
            inTree[u] = true;
            total += w;
            count++;
            for (int[] e : graph[u])
                if (!inTree[e[0]]) pq.add(new int[]{e[1], e[0]});
        }
        return total;
    }
}`,
        explanation: 'A PriorityQueue keyed by edge weight repeatedly attaches the cheapest frontier edge.',
      },
    ],
    quizId: 'quiz-ext-prims-mst',
    quizTitle: 'Prim\'s MST Quiz',
    quizDescription: 'Test your understanding of building a minimum spanning tree by growing one tree.',
    questions: [
      {
        id: 'q-prims-mst-1',
        quiz_id: 'quiz-ext-prims-mst',
        question_text: 'What is the time complexity of Prim\'s algorithm using a binary heap and adjacency list?',
        question_type: 'COMPLEXITY',
        options: ['O(V^2)', 'O(E log V)', 'O(V * E)', 'O(V^3)'],
        correct_option_index: 1,
        explanation: 'Each edge may cause a heap push (O(log V)) and each vertex is extracted once, giving O(E log V).',
      },
      {
        id: 'q-prims-mst-2',
        quiz_id: 'quiz-ext-prims-mst',
        question_text: 'Prim\'s algorithm grows a single connected tree throughout its execution.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Unlike Kruskal, which merges a forest, Prim always maintains one growing tree.',
      },
      {
        id: 'q-prims-mst-3',
        quiz_id: 'quiz-ext-prims-mst',
        question_text: 'Which property guarantees that the lightest edge crossing the cut belongs to an MST?',
        question_type: 'MCQ',
        options: ['The cycle property', 'The cut property', 'The heap property', 'The triangle inequality'],
        correct_option_index: 1,
        explanation: 'The cut property states the minimum-weight edge crossing any cut is safe to add to an MST.',
      },
    ],
  },
  // 7. KRUSKAL'S MST
  {
    topic: {
      id: 'ext-kruskals-mst',
      slug: 'kruskals-mst',
      category_id: CATEGORY_IDS.graphs,
      title: 'Kruskal\'s Minimum Spanning Tree',
      definition: 'Kruskal\'s algorithm builds a minimum spanning tree by sorting all edges by weight and greedily adding each edge that does not form a cycle, using a disjoint-set structure to detect cycles.',
      importance: 'Its edge-centric greedy approach is simple and efficient on sparse graphs, and it naturally produces a minimum spanning forest for disconnected graphs.',
      prerequisites: ['disjoint-set-union-dsu', 'sorting'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(E log E)',
      time_complexity_average: 'O(E log E)',
      time_complexity_worst: 'O(E log E)',
      space_complexity: 'O(V + E)',
      display_order: 406,
    },
    sections: [
      {
        id: 'sec-kruskals-mst-1',
        topic_id: 'ext-kruskals-mst',
        title: 'Concept & Intuition',
        content: `Kruskal thinks in terms of **edges, not vertices**. Lay every edge on a table sorted from cheapest to most expensive, then walk the list adding an edge whenever it joins two currently separate groups.

If an edge would connect two vertices already in the same group, it would create a cycle, so we skip it. The forest of groups gradually merges into a single tree.

> [!NOTE]
> This is the greedy embodiment of the **cut property** applied globally: the cheapest edge that unites two components is always safe.`,
        display_order: 1,
      },
      {
        id: 'sec-kruskals-mst-2',
        topic_id: 'ext-kruskals-mst',
        title: 'How It Works',
        content: `1. Sort all edges by ascending weight.
2. Initialize a **disjoint-set union (DSU)** with each vertex in its own set.
3. For each edge $(u, v, w)$ in sorted order: if \`find(u) != find(v)\`, add the edge to the MST and \`union(u, v)\`.
4. Stop once $V - 1$ edges are chosen.

The DSU makes the cycle check nearly constant time with union by rank and path compression.`,
        display_order: 2,
      },
      {
        id: 'sec-kruskals-mst-3',
        topic_id: 'ext-kruskals-mst',
        title: 'Complexity Analysis',
        content: `- **Sorting the edges:** $O(E \\log E)$, which dominates.
- **DSU operations:** $O(E \\cdot \\alpha(V))$, where $\\alpha$ is the inverse Ackermann function — effectively constant.

So the total is $O(E \\log E) = O(E \\log V)$ (since $E \\le V^2$). Space is $O(V + E)$ for the edge list and DSU arrays. Kruskal tends to win over Prim on **sparse** graphs.`,
        display_order: 3,
      },
      {
        id: 'sec-kruskals-mst-4',
        topic_id: 'ext-kruskals-mst',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Without path compression and union by rank, the DSU degrades and the cycle checks become slow, undermining the whole algorithm.

Common mistakes:
- Forgetting to skip edges that connect already-united vertices.
- Assuming the graph is connected — on a disconnected graph Kruskal yields a minimum spanning **forest**, which is often exactly what you want.

Used in clustering (single-linkage), image segmentation, and network design where edges arrive pre-sortable.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-kruskals-mst-py',
        topic_id: 'ext-kruskals-mst',
        language: 'python',
        is_optimized: true,
        code: `def kruskal(edges, n):
    # edges = list of (w, u, v). Returns total MST weight.
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]  # path compression
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra == rb:
            return False
        if rank[ra] < rank[rb]:
            ra, rb = rb, ra
        parent[rb] = ra
        if rank[ra] == rank[rb]:
            rank[ra] += 1
        return True

    total = 0
    for w, u, v in sorted(edges):
        if union(u, v):
            total += w
    return total`,
        explanation: 'Sorts edges then unites components, skipping any edge that would close a cycle.',
      },
      {
        id: 'snip-kruskals-mst-js',
        topic_id: 'ext-kruskals-mst',
        language: 'javascript',
        is_optimized: true,
        code: `function kruskal(edges, n) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }
  function union(a, b) {
    let ra = find(a), rb = find(b);
    if (ra === rb) return false;
    if (rank[ra] < rank[rb]) [ra, rb] = [rb, ra];
    parent[rb] = ra;
    if (rank[ra] === rank[rb]) rank[ra]++;
    return true;
  }
  edges.sort((a, b) => a[0] - b[0]); // [w, u, v]
  let total = 0;
  for (const [w, u, v] of edges) {
    if (union(u, v)) total += w;
  }
  return total;
}`,
        explanation: 'A DSU with path compression and union by rank keeps cycle checks near O(1).',
      },
      {
        id: 'snip-kruskals-mst-cpp',
        topic_id: 'ext-kruskals-mst',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

struct DSU {
    vector<int> parent, rnk;
    DSU(int n) : parent(n), rnk(n, 0) { iota(parent.begin(), parent.end(), 0); }
    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (rnk[a] < rnk[b]) swap(a, b);
        parent[b] = a;
        if (rnk[a] == rnk[b]) ++rnk[a];
        return true;
    }
};

long long kruskal(vector<tuple<int,int,int>>& edges, int n) {
    sort(edges.begin(), edges.end()); // (w, u, v)
    DSU dsu(n);
    long long total = 0;
    for (auto [w, u, v] : edges)
        if (dsu.unite(u, v)) total += w;
    return total;
}`,
        explanation: 'Recursive find with path compression; sorting by the (w, u, v) tuple orders by weight.',
      },
      {
        id: 'snip-kruskals-mst-java',
        topic_id: 'ext-kruskals-mst',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class Kruskal {
    static int[] parent, rank_;
    static int find(int x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    }
    static boolean union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (rank_[ra] < rank_[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra;
        if (rank_[ra] == rank_[rb]) rank_[ra]++;
        return true;
    }
    // edges[i] = {w, u, v}
    static long mstWeight(int[][] edges, int n) {
        parent = new int[n];
        rank_ = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        Arrays.sort(edges, (x, y) -> Integer.compare(x[0], y[0]));
        long total = 0;
        for (int[] e : edges)
            if (union(e[1], e[2])) total += e[0];
        return total;
    }
}`,
        explanation: 'Sorts edges by weight and unites disjoint components, accumulating the MST cost.',
      },
    ],
    quizId: 'quiz-ext-kruskals-mst',
    quizTitle: 'Kruskal\'s MST Quiz',
    quizDescription: 'Test your understanding of the edge-sorting greedy MST approach.',
    questions: [
      {
        id: 'q-kruskals-mst-1',
        quiz_id: 'quiz-ext-kruskals-mst',
        question_text: 'What dominates the time complexity of Kruskal\'s algorithm?',
        question_type: 'COMPLEXITY',
        options: ['The DSU operations at O(V)', 'Sorting the edges at O(E log E)', 'A triple nested loop at O(V^3)', 'Heap extraction at O(V log V)'],
        correct_option_index: 1,
        explanation: 'Sorting all edges costs O(E log E); DSU operations are near-constant with path compression.',
      },
      {
        id: 'q-kruskals-mst-2',
        quiz_id: 'quiz-ext-kruskals-mst',
        question_text: 'Kruskal\'s algorithm uses a disjoint-set structure to detect whether adding an edge would form a cycle.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'If both endpoints share the same set root, the edge would create a cycle and is skipped.',
      },
      {
        id: 'q-kruskals-mst-3',
        quiz_id: 'quiz-ext-kruskals-mst',
        question_text: 'On a disconnected graph, what does Kruskal produce?',
        question_type: 'MCQ',
        options: ['An error', 'A minimum spanning forest', 'A single spanning tree by adding fake edges', 'The shortest paths'],
        correct_option_index: 1,
        explanation: 'With no edges connecting components, Kruskal yields a minimum spanning tree per component: a forest.',
      },
    ],
  },
  // 8. TOPOLOGICAL SORT (KAHN'S ALGORITHM)
  {
    topic: {
      id: 'ext-topological-sort-kahns',
      slug: 'topological-sort-kahns',
      category_id: CATEGORY_IDS.graphs,
      title: 'Topological Sort (Kahn\'s Algorithm)',
      definition: 'Kahn\'s algorithm produces a topological ordering of a directed acyclic graph by repeatedly removing vertices with no incoming edges, using indegree counts and a queue.',
      importance: 'Topological order is essential for scheduling tasks with dependencies, build systems, and course prerequisites; Kahn also detects cycles naturally.',
      prerequisites: ['adjacency-list', 'queue'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(V + E)',
      time_complexity_average: 'O(V + E)',
      time_complexity_worst: 'O(V + E)',
      space_complexity: 'O(V)',
      display_order: 407,
    },
    sections: [
      {
        id: 'sec-topological-sort-kahns-1',
        topic_id: 'ext-topological-sort-kahns',
        title: 'Concept & Intuition',
        content: `Think of tasks with prerequisites. A task can start only once everything it depends on is done. Kahn's algorithm formalizes this: a vertex with **zero incoming edges** has no unmet dependencies, so it can go next.

Once you place such a vertex, you remove its outgoing edges, which may free up new zero-indegree vertices. Repeat until all are placed.

> [!NOTE]
> The ordering is not unique — any vertex currently at indegree zero is a valid next choice.`,
        display_order: 1,
      },
      {
        id: 'sec-topological-sort-kahns-2',
        topic_id: 'ext-topological-sort-kahns',
        title: 'How It Works',
        content: `1. Compute the **indegree** of every vertex.
2. Enqueue all vertices with indegree $0$.
3. While the queue is non-empty: dequeue $u$, append it to the order, and for each edge $(u, v)$ decrement \`indegree[v]\`; if it hits $0$, enqueue $v$.
4. If the produced order contains fewer than $V$ vertices, the graph has a **cycle**.

Each vertex is enqueued once and each edge relaxed once, hence $O(V + E)$.`,
        display_order: 2,
      },
      {
        id: 'sec-topological-sort-kahns-3',
        topic_id: 'ext-topological-sort-kahns',
        title: 'Complexity Analysis',
        content: `- **Time:** $O(V + E)$ — computing indegrees scans all edges, and the main loop processes each vertex and edge once.
- **Space:** $O(V)$ for the indegree array and queue (plus the input adjacency list).

Using a min-heap instead of a plain queue yields the **lexicographically smallest** topological order at a cost of $O(V \\log V + E)$.`,
        display_order: 3,
      },
      {
        id: 'sec-topological-sort-kahns-4',
        topic_id: 'ext-topological-sort-kahns',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Topological sort is only defined for **directed acyclic graphs**. If a cycle exists, no valid ordering exists — Kahn signals this when the output is shorter than $V$.

Common mistakes:
- Forgetting to check the final count for cycle detection.
- Mutating the original indegree data when it must be preserved.

Used in build systems (Make, Bazel), task schedulers, spreadsheet recalculation, and resolving package dependencies.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-topological-sort-kahns-py',
        topic_id: 'ext-topological-sort-kahns',
        language: 'python',
        is_optimized: true,
        code: `from collections import deque

def topo_sort_kahn(graph, n):
    # graph[u] = list of v. Returns (order, is_dag).
    indeg = [0] * n
    for u in range(n):
        for v in graph[u]:
            indeg[v] += 1
    q = deque(u for u in range(n) if indeg[u] == 0)
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    return order, len(order) == n`,
        explanation: 'Enqueues zero-indegree vertices; a shorter output than n reveals a cycle.',
      },
      {
        id: 'snip-topological-sort-kahns-js',
        topic_id: 'ext-topological-sort-kahns',
        language: 'javascript',
        is_optimized: true,
        code: `function topoSortKahn(graph, n) {
  const indeg = new Array(n).fill(0);
  for (let u = 0; u < n; u++)
    for (const v of graph[u]) indeg[v]++;
  const queue = [];
  for (let u = 0; u < n; u++) if (indeg[u] === 0) queue.push(u);
  const order = [];
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of graph[u]) {
      if (--indeg[v] === 0) queue.push(v);
    }
  }
  return { order, isDag: order.length === n };
}`,
        explanation: 'Uses an index pointer as an efficient queue; isDag is false when a cycle blocks progress.',
      },
      {
        id: 'snip-topological-sort-kahns-cpp',
        topic_id: 'ext-topological-sort-kahns',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <queue>
using namespace std;

// Returns the topological order; empty if the graph has a cycle.
vector<int> topoSortKahn(const vector<vector<int>>& graph, int n) {
    vector<int> indeg(n, 0);
    for (int u = 0; u < n; ++u)
        for (int v : graph[u]) ++indeg[v];
    queue<int> q;
    for (int u = 0; u < n; ++u) if (indeg[u] == 0) q.push(u);
    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : graph[u])
            if (--indeg[v] == 0) q.push(v);
    }
    return (int)order.size() == n ? order : vector<int>{};
}`,
        explanation: 'Returns an empty vector when a cycle prevents a complete ordering.',
      },
      {
        id: 'snip-topological-sort-kahns-java',
        topic_id: 'ext-topological-sort-kahns',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class TopoKahn {
    // graph[u] = list of v
    static List<Integer> sort(List<Integer>[] graph, int n) {
        int[] indeg = new int[n];
        for (int u = 0; u < n; u++)
            for (int v : graph[u]) indeg[v]++;
        Queue<Integer> q = new ArrayDeque<>();
        for (int u = 0; u < n; u++) if (indeg[u] == 0) q.add(u);
        List<Integer> order = new ArrayList<>();
        while (!q.isEmpty()) {
            int u = q.poll();
            order.add(u);
            for (int v : graph[u])
                if (--indeg[v] == 0) q.add(v);
        }
        return order.size() == n ? order : new ArrayList<>();
    }
}`,
        explanation: 'An ArrayDeque queue drives the process; an incomplete order signals a cycle.',
      },
    ],
    quizId: 'quiz-ext-topological-sort-kahns',
    quizTitle: 'Topological Sort (Kahn) Quiz',
    quizDescription: 'Test your understanding of indegree-based topological ordering.',
    questions: [
      {
        id: 'q-topological-sort-kahns-1',
        quiz_id: 'quiz-ext-topological-sort-kahns',
        question_text: 'What is the time complexity of Kahn\'s algorithm?',
        question_type: 'COMPLEXITY',
        options: ['O(V^2)', 'O(V + E)', 'O(E log V)', 'O(V * E)'],
        correct_option_index: 1,
        explanation: 'Each vertex is enqueued once and each edge relaxed once, giving O(V + E).',
      },
      {
        id: 'q-topological-sort-kahns-2',
        quiz_id: 'quiz-ext-topological-sort-kahns',
        question_text: 'If Kahn\'s algorithm outputs fewer than V vertices, the graph contains a cycle.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'A cycle keeps some vertices at nonzero indegree forever, so they never get enqueued.',
      },
      {
        id: 'q-topological-sort-kahns-3',
        quiz_id: 'quiz-ext-topological-sort-kahns',
        question_text: 'Which vertex is eligible to be placed next in Kahn\'s algorithm?',
        question_type: 'MCQ',
        options: ['Any vertex with the highest outdegree', 'Any vertex whose current indegree is zero', 'The vertex with the smallest label always', 'Any leaf vertex'],
        correct_option_index: 1,
        explanation: 'A zero-indegree vertex has all dependencies satisfied and can be safely emitted next.',
      },
    ],
  },
  // 9. TOPOLOGICAL SORT (DFS-BASED)
  {
    topic: {
      id: 'ext-topological-sort-dfs-based',
      slug: 'topological-sort-dfs-based',
      category_id: CATEGORY_IDS.graphs,
      title: 'Topological Sort (DFS-Based)',
      definition: 'The DFS-based topological sort orders the vertices of a directed acyclic graph by running depth-first search and pushing each vertex onto a stack after all its descendants are fully explored, then reversing the stack.',
      importance: 'It gives a topological order with a single DFS pass and forms the conceptual basis for algorithms like Kosaraju and Tarjan that rely on finish times.',
      prerequisites: ['depth-first-search', 'topological-sort-kahns'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(V + E)',
      time_complexity_average: 'O(V + E)',
      time_complexity_worst: 'O(V + E)',
      space_complexity: 'O(V)',
      display_order: 408,
    },
    sections: [
      {
        id: 'sec-topological-sort-dfs-based-1',
        topic_id: 'ext-topological-sort-dfs-based',
        title: 'Concept & Intuition',
        content: `The key insight is about **finish times**. In a DAG, if there is an edge $u \\to v$, then $u$ finishes its DFS *after* $v$ does — because we fully explore $v$ before returning from $u$.

So if we record each vertex the moment DFS finishes it, vertices with edges pointing "forward" get recorded later. Reversing that finish order gives a valid topological order.

> [!NOTE]
> Emit a vertex only on the **way back up** (post-order), never when first visiting it.`,
        display_order: 1,
      },
      {
        id: 'sec-topological-sort-dfs-based-2',
        topic_id: 'ext-topological-sort-dfs-based',
        title: 'How It Works',
        content: `1. Mark all vertices unvisited.
2. For each unvisited vertex, run DFS.
3. Inside DFS, recurse into all unvisited neighbors first, then **push the current vertex onto a stack** (post-order).
4. After all DFS calls complete, pop the stack (equivalently, reverse the finish list) to get the topological order.

Every vertex and edge is touched once, so the traversal is $O(V + E)$.`,
        display_order: 2,
      },
      {
        id: 'sec-topological-sort-dfs-based-3',
        topic_id: 'ext-topological-sort-dfs-based',
        title: 'Complexity Analysis',
        content: `- **Time:** $O(V + E)$ — a standard DFS over the whole graph.
- **Space:** $O(V)$ for the visited array, the output stack, and the recursion call stack.

The recursion depth can reach $O(V)$ on a long chain, so for very deep graphs an explicit stack avoids stack-overflow. Detecting cycles requires tracking vertices currently on the recursion path (a "gray" state).`,
        display_order: 3,
      },
      {
        id: 'sec-topological-sort-dfs-based-4',
        topic_id: 'ext-topological-sort-dfs-based',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Plain DFS-based topological sort does **not** detect cycles unless you add a "currently in recursion stack" marker. A back edge to a gray vertex means a cycle and no valid order.

Common mistakes:
- Adding vertices in pre-order instead of post-order.
- Forgetting to reverse the finish order.

Preferred when you already need DFS finish times, and it is the foundation of Kosaraju's and Tarjan's SCC algorithms.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-topological-sort-dfs-based-py',
        topic_id: 'ext-topological-sort-dfs-based',
        language: 'python',
        is_optimized: true,
        code: `def topo_sort_dfs(graph, n):
    # graph[u] = list of v. Returns reversed post-order.
    visited = [False] * n
    stack = []

    def dfs(u):
        visited[u] = True
        for v in graph[u]:
            if not visited[v]:
                dfs(v)
        stack.append(u)  # post-order push

    for u in range(n):
        if not visited[u]:
            dfs(u)
    stack.reverse()
    return stack`,
        explanation: 'Pushes each vertex after its descendants; reversing the stack yields topological order.',
      },
      {
        id: 'snip-topological-sort-dfs-based-js',
        topic_id: 'ext-topological-sort-dfs-based',
        language: 'javascript',
        is_optimized: true,
        code: `function topoSortDfs(graph, n) {
  const visited = new Array(n).fill(false);
  const stack = [];
  function dfs(u) {
    visited[u] = true;
    for (const v of graph[u]) {
      if (!visited[v]) dfs(v);
    }
    stack.push(u); // post-order
  }
  for (let u = 0; u < n; u++) {
    if (!visited[u]) dfs(u);
  }
  return stack.reverse();
}`,
        explanation: 'Post-order pushes plus a final reverse produce a valid ordering for a DAG.',
      },
      {
        id: 'snip-topological-sort-dfs-based-cpp',
        topic_id: 'ext-topological-sort-dfs-based',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>
using namespace std;

void dfs(int u, const vector<vector<int>>& graph, vector<bool>& visited, vector<int>& order) {
    visited[u] = true;
    for (int v : graph[u])
        if (!visited[v]) dfs(v, graph, visited, order);
    order.push_back(u); // post-order
}

vector<int> topoSortDfs(const vector<vector<int>>& graph, int n) {
    vector<bool> visited(n, false);
    vector<int> order;
    for (int u = 0; u < n; ++u)
        if (!visited[u]) dfs(u, graph, visited, order);
    reverse(order.begin(), order.end());
    return order;
}`,
        explanation: 'Collects vertices in post-order, then reverses for the topological sequence.',
      },
      {
        id: 'snip-topological-sort-dfs-based-java',
        topic_id: 'ext-topological-sort-dfs-based',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class TopoDfs {
    static void dfs(int u, List<Integer>[] graph, boolean[] visited, Deque<Integer> stack) {
        visited[u] = true;
        for (int v : graph[u])
            if (!visited[v]) dfs(v, graph, visited, stack);
        stack.push(u); // post-order
    }
    static List<Integer> sort(List<Integer>[] graph, int n) {
        boolean[] visited = new boolean[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int u = 0; u < n; u++)
            if (!visited[u]) dfs(u, graph, visited, stack);
        return new ArrayList<>(stack);
    }
}`,
        explanation: 'An ArrayDeque used as a stack yields vertices in reverse finish order when iterated.',
      },
    ],
    quizId: 'quiz-ext-topological-sort-dfs-based',
    quizTitle: 'Topological Sort (DFS) Quiz',
    quizDescription: 'Test your understanding of finish-time-based topological ordering.',
    questions: [
      {
        id: 'q-topological-sort-dfs-based-1',
        quiz_id: 'quiz-ext-topological-sort-dfs-based',
        question_text: 'When is a vertex added to the output in DFS-based topological sort?',
        question_type: 'MCQ',
        options: ['When first visited (pre-order)', 'After all its descendants are explored (post-order)', 'When its indegree hits zero', 'In arbitrary order'],
        correct_option_index: 1,
        explanation: 'Vertices are pushed in post-order; reversing that order gives the topological sequence.',
      },
      {
        id: 'q-topological-sort-dfs-based-2',
        quiz_id: 'quiz-ext-topological-sort-dfs-based',
        question_text: 'Plain DFS-based topological sort automatically detects cycles without any extra bookkeeping.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'You must track vertices currently on the recursion stack (gray state) to detect back edges.',
      },
      {
        id: 'q-topological-sort-dfs-based-3',
        quiz_id: 'quiz-ext-topological-sort-dfs-based',
        question_text: 'What is the time complexity of DFS-based topological sort?',
        question_type: 'COMPLEXITY',
        options: ['O(V + E)', 'O(V^2)', 'O(E log V)', 'O(V * E)'],
        correct_option_index: 0,
        explanation: 'It is a single DFS traversal touching each vertex and edge once, so O(V + E).',
      },
    ],
  },
  // 10. DISJOINT SET UNION (DSU)
  {
    topic: {
      id: 'ext-disjoint-set-union-dsu',
      slug: 'disjoint-set-union-dsu',
      category_id: CATEGORY_IDS.graphs,
      title: 'Disjoint Set Union (DSU)',
      definition: 'A disjoint-set union (union-find) is a data structure that maintains a partition of elements into disjoint sets, supporting near-constant-time union of two sets and lookup of an element\'s representative.',
      importance: 'It powers Kruskal\'s MST, dynamic connectivity queries, and cycle detection in undirected graphs, delivering almost constant-time operations via two clever optimizations.',
      prerequisites: ['array', 'trees'],
      difficulty: 'Intermediate',
      time_complexity_best: 'O(alpha(N)) per operation',
      time_complexity_average: 'O(alpha(N)) per operation',
      time_complexity_worst: 'O(alpha(N)) amortized per operation',
      space_complexity: 'O(N)',
      display_order: 409,
    },
    sections: [
      {
        id: 'sec-disjoint-set-union-dsu-1',
        topic_id: 'ext-disjoint-set-union-dsu',
        title: 'Concept & Intuition',
        content: `Imagine tracking friendships that keep merging into ever-larger friend groups. DSU answers two questions fast: **"are these two in the same group?"** and **"merge these two groups."**

Each set is a tree; the root is the set's representative. To test membership you compare roots. To merge, you attach one root under the other.

> [!NOTE]
> The structure only supports **union**, never split. Once merged, sets stay merged.`,
        display_order: 1,
      },
      {
        id: 'sec-disjoint-set-union-dsu-2',
        topic_id: 'ext-disjoint-set-union-dsu',
        title: 'How It Works',
        content: `Two optimizations make DSU nearly $O(1)$:

- **Path compression:** during \`find\`, point every node visited directly at the root, flattening the tree for future queries.
- **Union by rank/size:** always attach the smaller (shallower) tree under the larger one to keep trees shallow.

\`find(x)\` walks parents to the root; \`union(a, b)\` links the roots of $a$ and $b$ if they differ.`,
        display_order: 2,
      },
      {
        id: 'sec-disjoint-set-union-dsu-3',
        topic_id: 'ext-disjoint-set-union-dsu',
        title: 'Complexity Analysis',
        content: `With **both** optimizations, a sequence of $m$ operations on $n$ elements runs in $O(m \\cdot \\alpha(n))$, where $\\alpha$ is the inverse Ackermann function. For any realistic $n$, $\\alpha(n) \\le 4$, so operations are effectively constant time.

- **Space:** $O(N)$ for the parent and rank arrays.
- Using only one optimization gives $O(\\log n)$ per operation.`,
        display_order: 3,
      },
      {
        id: 'sec-disjoint-set-union-dsu-4',
        topic_id: 'ext-disjoint-set-union-dsu',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Omitting union by rank/size and relying on path compression alone can still create tall trees in the worst insertion order. Use both for the guaranteed near-constant bound.

Common mistakes:
- Comparing elements directly instead of their roots.
- Forgetting to update rank only when two equal-rank trees merge.

Used in Kruskal's MST, connected-components labeling, dynamic connectivity, and detecting cycles in undirected graphs.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-disjoint-set-union-dsu-py',
        topic_id: 'ext-disjoint-set-union-dsu',
        language: 'python',
        is_optimized: true,
        code: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]  # path compression
            x = self.parent[x]
        return x

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        if self.rank[ra] < self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1
        return True`,
        explanation: 'Iterative find with path halving and union by rank keeps operations near O(1).',
      },
      {
        id: 'snip-disjoint-set-union-dsu-js',
        topic_id: 'ext-disjoint-set-union-dsu',
        language: 'javascript',
        is_optimized: true,
        code: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(x) {
    while (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]]; // path halving
      x = this.parent[x];
    }
    return x;
  }
  union(a, b) {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;
    if (this.rank[ra] < this.rank[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;
    if (this.rank[ra] === this.rank[rb]) this.rank[ra]++;
    return true;
  }
}`,
        explanation: 'Path halving during find plus union by rank guarantee the inverse-Ackermann bound.',
      },
      {
        id: 'snip-disjoint-set-union-dsu-cpp',
        topic_id: 'ext-disjoint-set-union-dsu',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <numeric>
using namespace std;

struct DSU {
    vector<int> parent, rnk;
    DSU(int n) : parent(n), rnk(n, 0) { iota(parent.begin(), parent.end(), 0); }

    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }

    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (rnk[a] < rnk[b]) swap(a, b);
        parent[b] = a;
        if (rnk[a] == rnk[b]) ++rnk[a];
        return true;
    }
};`,
        explanation: 'Recursive find with full path compression; unite links roots by rank.',
      },
      {
        id: 'snip-disjoint-set-union-dsu-java',
        topic_id: 'ext-disjoint-set-union-dsu',
        language: 'java',
        is_optimized: true,
        code: `class DSU {
    private final int[] parent, rank;
    DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    }
    boolean union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra;
        if (rank[ra] == rank[rb]) rank[ra]++;
        return true;
    }
}`,
        explanation: 'Iterative find with path halving plus union by rank; union returns false when already joined.',
      },
    ],
    quizId: 'quiz-ext-disjoint-set-union-dsu',
    quizTitle: 'Disjoint Set Union Quiz',
    quizDescription: 'Test your understanding of union-find and its near-constant-time operations.',
    questions: [
      {
        id: 'q-disjoint-set-union-dsu-1',
        quiz_id: 'quiz-ext-disjoint-set-union-dsu',
        question_text: 'What is the amortized time per operation for a DSU with path compression and union by rank?',
        question_type: 'COMPLEXITY',
        options: ['O(log N)', 'O(alpha(N)), effectively constant', 'O(N)', 'O(1) exactly with no caveats'],
        correct_option_index: 1,
        explanation: 'Both optimizations together give O(alpha(N)) amortized, where alpha is the inverse Ackermann function.',
      },
      {
        id: 'q-disjoint-set-union-dsu-2',
        quiz_id: 'quiz-ext-disjoint-set-union-dsu',
        question_text: 'A standard DSU supports efficiently splitting a set back into its original members.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 1,
        explanation: 'DSU supports union and find only; it cannot undo merges without extra structures.',
      },
      {
        id: 'q-disjoint-set-union-dsu-3',
        quiz_id: 'quiz-ext-disjoint-set-union-dsu',
        question_text: 'What does path compression do during a find operation?',
        question_type: 'MCQ',
        options: ['Deletes visited nodes', 'Points visited nodes directly at the root to flatten the tree', 'Sorts the elements', 'Splits the tree in half'],
        correct_option_index: 1,
        explanation: 'Path compression reattaches nodes on the find path closer to the root, speeding future queries.',
      },
    ],
  },
  // 11. KOSARAJU'S SCC
  {
    topic: {
      id: 'ext-kosarajus-scc',
      slug: 'kosarajus-scc',
      category_id: CATEGORY_IDS.graphs,
      title: 'Kosaraju\'s Strongly Connected Components',
      definition: 'Kosaraju\'s algorithm finds the strongly connected components of a directed graph using two depth-first search passes: one on the original graph to order vertices by finish time, and one on the transposed graph.',
      importance: 'Strongly connected components reveal cyclic structure and mutual reachability, underpinning 2-SAT solving, condensation graphs, and dependency analysis.',
      prerequisites: ['topological-sort-dfs-based', 'depth-first-search'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(V + E)',
      time_complexity_average: 'O(V + E)',
      time_complexity_worst: 'O(V + E)',
      space_complexity: 'O(V + E)',
      display_order: 410,
    },
    sections: [
      {
        id: 'sec-kosarajus-scc-1',
        topic_id: 'ext-kosarajus-scc',
        title: 'Concept & Intuition',
        content: `A **strongly connected component (SCC)** is a maximal set of vertices where every vertex can reach every other. Kosaraju exploits a beautiful symmetry: SCCs are identical in a graph and its **transpose** (all edges reversed).

By finishing DFS on the original graph and then exploring the transpose in **reverse finish order**, each DFS tree in the second pass captures exactly one SCC.

> [!NOTE]
> The reverse-finish order ensures we start the second pass from a "sink" SCC in the condensation, so a DFS cannot leak into another component.`,
        display_order: 1,
      },
      {
        id: 'sec-kosarajus-scc-2',
        topic_id: 'ext-kosarajus-scc',
        title: 'How It Works',
        content: `1. **First pass:** run DFS on the original graph, pushing each vertex onto a stack when it finishes.
2. **Transpose:** reverse every edge to build $G^T$.
3. **Second pass:** pop vertices off the stack; for each unvisited vertex, run DFS on $G^T$. Every vertex reached forms one SCC.

Two linear DFS traversals plus building the transpose give the total cost.`,
        display_order: 2,
      },
      {
        id: 'sec-kosarajus-scc-3',
        topic_id: 'ext-kosarajus-scc',
        title: 'Complexity Analysis',
        content: `- **Time:** $O(V + E)$ — two DFS passes and one transpose construction, each linear.
- **Space:** $O(V + E)$ for the transpose adjacency list, the finish stack, and visited markers.

It matches Tarjan's asymptotic bound but uses two passes and needs the explicit transpose, so it typically has a larger constant factor.`,
        display_order: 3,
      },
      {
        id: 'sec-kosarajus-scc-4',
        topic_id: 'ext-kosarajus-scc',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The second pass **must** process vertices in decreasing finish time. Using the wrong order merges distinct SCCs into one.

Common mistakes:
- Forgetting to build the transpose correctly (reverse every edge).
- Deep recursion causing stack overflow on large graphs; use an explicit stack.

Used to build condensation graphs, solve 2-SAT, and analyze cyclic dependencies in module and package graphs.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-kosarajus-scc-py',
        topic_id: 'ext-kosarajus-scc',
        language: 'python',
        is_optimized: true,
        code: `def kosaraju(graph, n):
    # graph[u] = list of v. Returns list of SCCs (each a list of vertices).
    visited = [False] * n
    order = []

    def dfs1(u):
        visited[u] = True
        for v in graph[u]:
            if not visited[v]:
                dfs1(v)
        order.append(u)

    for u in range(n):
        if not visited[u]:
            dfs1(u)

    transpose = [[] for _ in range(n)]
    for u in range(n):
        for v in graph[u]:
            transpose[v].append(u)

    visited = [False] * n
    sccs = []

    def dfs2(u, comp):
        visited[u] = True
        comp.append(u)
        for v in transpose[u]:
            if not visited[v]:
                dfs2(v, comp)

    for u in reversed(order):
        if not visited[u]:
            comp = []
            dfs2(u, comp)
            sccs.append(comp)
    return sccs`,
        explanation: 'First DFS records finish order; a second DFS on the transpose in reverse order carves out each SCC.',
      },
      {
        id: 'snip-kosarajus-scc-js',
        topic_id: 'ext-kosarajus-scc',
        language: 'javascript',
        is_optimized: true,
        code: `function kosaraju(graph, n) {
  const visited = new Array(n).fill(false);
  const order = [];
  function dfs1(u) {
    visited[u] = true;
    for (const v of graph[u]) if (!visited[v]) dfs1(v);
    order.push(u);
  }
  for (let u = 0; u < n; u++) if (!visited[u]) dfs1(u);

  const transpose = Array.from({ length: n }, () => []);
  for (let u = 0; u < n; u++)
    for (const v of graph[u]) transpose[v].push(u);

  visited.fill(false);
  const sccs = [];
  function dfs2(u, comp) {
    visited[u] = true;
    comp.push(u);
    for (const v of transpose[u]) if (!visited[v]) dfs2(v, comp);
  }
  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    if (!visited[u]) {
      const comp = [];
      dfs2(u, comp);
      sccs.push(comp);
    }
  }
  return sccs;
}`,
        explanation: 'Builds the transpose, then explores vertices in reverse finish order to isolate SCCs.',
      },
      {
        id: 'snip-kosarajus-scc-cpp',
        topic_id: 'ext-kosarajus-scc',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>
using namespace std;

void dfs1(int u, const vector<vector<int>>& g, vector<bool>& vis, vector<int>& order) {
    vis[u] = true;
    for (int v : g[u]) if (!vis[v]) dfs1(v, g, vis, order);
    order.push_back(u);
}
void dfs2(int u, const vector<vector<int>>& gt, vector<bool>& vis, vector<int>& comp) {
    vis[u] = true;
    comp.push_back(u);
    for (int v : gt[u]) if (!vis[v]) dfs2(v, gt, vis, comp);
}
vector<vector<int>> kosaraju(const vector<vector<int>>& g, int n) {
    vector<bool> vis(n, false);
    vector<int> order;
    for (int u = 0; u < n; ++u) if (!vis[u]) dfs1(u, g, vis, order);
    vector<vector<int>> gt(n);
    for (int u = 0; u < n; ++u) for (int v : g[u]) gt[v].push_back(u);
    fill(vis.begin(), vis.end(), false);
    vector<vector<int>> sccs;
    for (int i = n - 1; i >= 0; --i) {
        int u = order[i];
        if (!vis[u]) { vector<int> comp; dfs2(u, gt, vis, comp); sccs.push_back(comp); }
    }
    return sccs;
}`,
        explanation: 'Two DFS helpers plus an explicit transpose collect each strongly connected component.',
      },
      {
        id: 'snip-kosarajus-scc-java',
        topic_id: 'ext-kosarajus-scc',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class Kosaraju {
    static void dfs1(int u, List<Integer>[] g, boolean[] vis, Deque<Integer> order) {
        vis[u] = true;
        for (int v : g[u]) if (!vis[v]) dfs1(v, g, vis, order);
        order.push(u);
    }
    static void dfs2(int u, List<Integer>[] gt, boolean[] vis, List<Integer> comp) {
        vis[u] = true;
        comp.add(u);
        for (int v : gt[u]) if (!vis[v]) dfs2(v, gt, vis, comp);
    }
    static List<List<Integer>> run(List<Integer>[] g, int n) {
        boolean[] vis = new boolean[n];
        Deque<Integer> order = new ArrayDeque<>();
        for (int u = 0; u < n; u++) if (!vis[u]) dfs1(u, g, vis, order);
        List<Integer>[] gt = new List[n];
        for (int i = 0; i < n; i++) gt[i] = new ArrayList<>();
        for (int u = 0; u < n; u++) for (int v : g[u]) gt[v].add(u);
        Arrays.fill(vis, false);
        List<List<Integer>> sccs = new ArrayList<>();
        while (!order.isEmpty()) {
            int u = order.pop();
            if (!vis[u]) { List<Integer> comp = new ArrayList<>(); dfs2(u, gt, vis, comp); sccs.add(comp); }
        }
        return sccs;
    }
}`,
        explanation: 'An ArrayDeque holds the finish order; popping it drives the transpose DFS that yields SCCs.',
      },
    ],
    quizId: 'quiz-ext-kosarajus-scc',
    quizTitle: 'Kosaraju\'s SCC Quiz',
    quizDescription: 'Test your understanding of the two-pass strongly connected components algorithm.',
    questions: [
      {
        id: 'q-kosarajus-scc-1',
        quiz_id: 'quiz-ext-kosarajus-scc',
        question_text: 'How many depth-first search passes does Kosaraju\'s algorithm require?',
        question_type: 'MCQ',
        options: ['One', 'Two', 'Three', 'V passes'],
        correct_option_index: 1,
        explanation: 'One pass records finish order on G; the second runs on the transpose in reverse finish order.',
      },
      {
        id: 'q-kosarajus-scc-2',
        quiz_id: 'quiz-ext-kosarajus-scc',
        question_text: 'A graph and its transpose have exactly the same strongly connected components.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Reversing all edges preserves mutual reachability, so the SCC partition is unchanged.',
      },
      {
        id: 'q-kosarajus-scc-3',
        quiz_id: 'quiz-ext-kosarajus-scc',
        question_text: 'What is the time complexity of Kosaraju\'s algorithm?',
        question_type: 'COMPLEXITY',
        options: ['O(V + E)', 'O(V^2)', 'O(E log V)', 'O(V * E)'],
        correct_option_index: 0,
        explanation: 'Two linear DFS passes and one transpose build are each O(V + E).',
      },
    ],
  },
  // 12. TARJAN'S SCC
  {
    topic: {
      id: 'ext-tarjans-scc',
      slug: 'tarjans-scc',
      category_id: CATEGORY_IDS.graphs,
      title: 'Tarjan\'s Strongly Connected Components',
      definition: 'Tarjan\'s algorithm identifies all strongly connected components of a directed graph in a single depth-first search using discovery indices and low-link values maintained on an explicit stack.',
      importance: 'It computes SCCs in one pass without building a transpose, making it faster in practice than Kosaraju and a cornerstone of 2-SAT and bridge/articulation-point analysis.',
      prerequisites: ['depth-first-search', 'kosarajus-scc'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(V + E)',
      time_complexity_average: 'O(V + E)',
      time_complexity_worst: 'O(V + E)',
      space_complexity: 'O(V)',
      display_order: 411,
    },
    sections: [
      {
        id: 'sec-tarjans-scc-1',
        topic_id: 'ext-tarjans-scc',
        title: 'Concept & Intuition',
        content: `Tarjan assigns each vertex a **discovery index** (the DFS visit order) and a **low-link**: the smallest index reachable from that vertex, including via back edges, while staying on the current DFS stack.

When a vertex's low-link equals its own index, it is the **root** of an SCC. Everything above it on a special stack, down to and including itself, forms one component.

> [!NOTE]
> The low-link captures whether a vertex can "escape upward" to an earlier vertex. If it cannot, it seals off an SCC.`,
        display_order: 1,
      },
      {
        id: 'sec-tarjans-scc-2',
        topic_id: 'ext-tarjans-scc',
        title: 'How It Works',
        content: `1. DFS each unvisited vertex, assigning \`index\` and \`low\` equal to a global counter, and push it onto a stack marking it "on stack."
2. For each neighbor $v$: if unvisited, recurse then \`low[u] = min(low[u], low[v])\`; else if $v$ is on the stack, \`low[u] = min(low[u], index[v])\`.
3. If \`low[u] == index[u]\`, pop the stack down to $u$; those vertices are one SCC.

Only back edges to on-stack vertices update the low-link, which is why cross edges are ignored.`,
        display_order: 2,
      },
      {
        id: 'sec-tarjans-scc-3',
        topic_id: 'ext-tarjans-scc',
        title: 'Complexity Analysis',
        content: `- **Time:** $O(V + E)$ — a single DFS where each vertex and edge is processed once.
- **Space:** $O(V)$ for the index, low-link, on-stack arrays, the component stack, and recursion.

Because it avoids a second pass and the transpose, Tarjan usually has a smaller constant factor than Kosaraju, though both are asymptotically identical.`,
        display_order: 3,
      },
      {
        id: 'sec-tarjans-scc-4',
        topic_id: 'ext-tarjans-scc',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> The low-link update differs by edge type: use \`low[v]\` for tree edges (after recursion) but \`index[v]\` for back edges to on-stack vertices. Mixing these produces wrong components.

Common mistakes:
- Updating the low-link using vertices no longer on the stack (cross edges).
- Deep recursion overflowing the call stack; convert to an iterative DFS for huge graphs.

Used in 2-SAT, condensation graphs, and (in variant form) finding bridges and articulation points.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-tarjans-scc-py',
        topic_id: 'ext-tarjans-scc',
        language: 'python',
        is_optimized: true,
        code: `import sys

def tarjan(graph, n):
    sys.setrecursionlimit(1 << 20)
    index = [-1] * n
    low = [0] * n
    on_stack = [False] * n
    stack = []
    sccs = []
    counter = [0]

    def dfs(u):
        index[u] = low[u] = counter[0]
        counter[0] += 1
        stack.append(u)
        on_stack[u] = True
        for v in graph[u]:
            if index[v] == -1:
                dfs(v)
                low[u] = min(low[u], low[v])
            elif on_stack[v]:
                low[u] = min(low[u], index[v])
        if low[u] == index[u]:
            comp = []
            while True:
                w = stack.pop()
                on_stack[w] = False
                comp.append(w)
                if w == u:
                    break
            sccs.append(comp)

    for u in range(n):
        if index[u] == -1:
            dfs(u)
    return sccs`,
        explanation: 'A single DFS tracks index and low-link; a root (low == index) pops one SCC off the stack.',
      },
      {
        id: 'snip-tarjans-scc-js',
        topic_id: 'ext-tarjans-scc',
        language: 'javascript',
        is_optimized: true,
        code: `function tarjan(graph, n) {
  const index = new Array(n).fill(-1);
  const low = new Array(n).fill(0);
  const onStack = new Array(n).fill(false);
  const stack = [];
  const sccs = [];
  let counter = 0;
  function dfs(u) {
    index[u] = low[u] = counter++;
    stack.push(u);
    onStack[u] = true;
    for (const v of graph[u]) {
      if (index[v] === -1) {
        dfs(v);
        low[u] = Math.min(low[u], low[v]);
      } else if (onStack[v]) {
        low[u] = Math.min(low[u], index[v]);
      }
    }
    if (low[u] === index[u]) {
      const comp = [];
      let w;
      do {
        w = stack.pop();
        onStack[w] = false;
        comp.push(w);
      } while (w !== u);
      sccs.push(comp);
    }
  }
  for (let u = 0; u < n; u++) if (index[u] === -1) dfs(u);
  return sccs;
}`,
        explanation: 'Maintains low-link via tree and back edges; emits an SCC whenever a root vertex is closed.',
      },
      {
        id: 'snip-tarjans-scc-cpp',
        topic_id: 'ext-tarjans-scc',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>
using namespace std;

struct Tarjan {
    const vector<vector<int>>& g;
    vector<int> idx, low; vector<bool> onStk; vector<int> stk;
    vector<vector<int>> sccs; int counter = 0;
    Tarjan(const vector<vector<int>>& g, int n) : g(g), idx(n, -1), low(n, 0), onStk(n, false) {}

    void dfs(int u) {
        idx[u] = low[u] = counter++;
        stk.push_back(u); onStk[u] = true;
        for (int v : g[u]) {
            if (idx[v] == -1) { dfs(v); low[u] = min(low[u], low[v]); }
            else if (onStk[v]) low[u] = min(low[u], idx[v]);
        }
        if (low[u] == idx[u]) {
            vector<int> comp;
            while (true) {
                int w = stk.back(); stk.pop_back(); onStk[w] = false;
                comp.push_back(w);
                if (w == u) break;
            }
            sccs.push_back(comp);
        }
    }
};`,
        explanation: 'A struct bundles the DFS state; each root vertex pops its component off the stack.',
      },
      {
        id: 'snip-tarjans-scc-java',
        topic_id: 'ext-tarjans-scc',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class Tarjan {
    List<Integer>[] g; int[] idx, low; boolean[] onStk; Deque<Integer> stk;
    List<List<Integer>> sccs = new ArrayList<>(); int counter = 0;

    Tarjan(List<Integer>[] g, int n) {
        this.g = g; idx = new int[n]; low = new int[n]; onStk = new boolean[n];
        Arrays.fill(idx, -1); stk = new ArrayDeque<>();
    }
    void dfs(int u) {
        idx[u] = low[u] = counter++;
        stk.push(u); onStk[u] = true;
        for (int v : g[u]) {
            if (idx[v] == -1) { dfs(v); low[u] = Math.min(low[u], low[v]); }
            else if (onStk[v]) low[u] = Math.min(low[u], idx[v]);
        }
        if (low[u] == idx[u]) {
            List<Integer> comp = new ArrayList<>();
            int w;
            do { w = stk.pop(); onStk[w] = false; comp.add(w); } while (w != u);
            sccs.add(comp);
        }
    }
}`,
        explanation: 'Uses an ArrayDeque as the component stack; low == idx marks the root of an SCC.',
      },
    ],
    quizId: 'quiz-ext-tarjans-scc',
    quizTitle: 'Tarjan\'s SCC Quiz',
    quizDescription: 'Test your understanding of single-pass SCC detection with low-link values.',
    questions: [
      {
        id: 'q-tarjans-scc-1',
        quiz_id: 'quiz-ext-tarjans-scc',
        question_text: 'A vertex u is the root of an SCC in Tarjan\'s algorithm exactly when which condition holds?',
        question_type: 'MCQ',
        options: ['low[u] > index[u]', 'low[u] == index[u]', 'index[u] == 0', 'u has no neighbors'],
        correct_option_index: 1,
        explanation: 'When low[u] equals index[u], u cannot reach any earlier on-stack vertex, so it roots an SCC.',
      },
      {
        id: 'q-tarjans-scc-2',
        quiz_id: 'quiz-ext-tarjans-scc',
        question_text: 'Tarjan\'s algorithm finds all strongly connected components in a single DFS pass.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'Unlike Kosaraju, Tarjan needs only one DFS and no transpose of the graph.',
      },
      {
        id: 'q-tarjans-scc-3',
        quiz_id: 'quiz-ext-tarjans-scc',
        question_text: 'What is the time complexity of Tarjan\'s SCC algorithm?',
        question_type: 'COMPLEXITY',
        options: ['O(V + E)', 'O(V^2)', 'O(E log V)', 'O(V * E)'],
        correct_option_index: 0,
        explanation: 'It is a single DFS visiting every vertex and edge once, giving O(V + E).',
      },
    ],
  },
  // 13. EULERIAN PATH / CIRCUIT
  {
    topic: {
      id: 'ext-eulerian-pathcircuit',
      slug: 'eulerian-pathcircuit',
      category_id: CATEGORY_IDS.graphs,
      title: 'Eulerian Path and Circuit',
      definition: 'An Eulerian path traverses every edge of a graph exactly once; an Eulerian circuit is such a path that starts and ends at the same vertex. Hierholzer\'s algorithm constructs one in linear time when it exists.',
      importance: 'Eulerian trails model route problems where every connection must be used once, such as mail delivery, DNA fragment assembly, and drawing figures without lifting the pen.',
      prerequisites: ['adjacency-list', 'depth-first-search'],
      difficulty: 'Advanced',
      time_complexity_best: 'O(V + E)',
      time_complexity_average: 'O(V + E)',
      time_complexity_worst: 'O(V + E)',
      space_complexity: 'O(V + E)',
      display_order: 412,
    },
    sections: [
      {
        id: 'sec-eulerian-pathcircuit-1',
        topic_id: 'ext-eulerian-pathcircuit',
        title: 'Concept & Intuition',
        content: `The classic **Seven Bridges of Königsberg** puzzle asks whether you can cross every bridge exactly once. Euler proved it depends solely on vertex **degrees**, not on cleverness of routing.

An Eulerian circuit uses every edge once and returns home. An Eulerian path does the same but may end elsewhere. The whole existence question reduces to counting odd-degree vertices.

> [!NOTE]
> The graph must also be **connected** when restricted to vertices that have at least one edge.`,
        display_order: 1,
      },
      {
        id: 'sec-eulerian-pathcircuit-2',
        topic_id: 'ext-eulerian-pathcircuit',
        title: 'Existence Conditions',
        content: `For an **undirected** connected graph:
- **Eulerian circuit** exists iff every vertex has **even** degree.
- **Eulerian path** exists iff exactly **zero or two** vertices have odd degree (start and end at the two odd ones).

For a **directed** connected graph:
- **Circuit:** every vertex has $indegree = outdegree$.
- **Path:** at most one vertex with $outdegree - indegree = 1$ (start) and one with $indegree - outdegree = 1$ (end).`,
        display_order: 2,
      },
      {
        id: 'sec-eulerian-pathcircuit-3',
        topic_id: 'ext-eulerian-pathcircuit',
        title: 'Hierholzer & Complexity',
        content: `**Hierholzer's algorithm** builds the trail in $O(V + E)$:
1. Start at a valid vertex and follow unused edges, deleting each as you go, until you return to a stuck vertex.
2. Whenever the current vertex has no unused edges, pop it onto the output.
3. The reversed output is the Eulerian trail.

- **Time:** $O(V + E)$ since each edge is used exactly once.
- **Space:** $O(V + E)$ for the adjacency structure and the explicit stack.`,
        display_order: 3,
      },
      {
        id: 'sec-eulerian-pathcircuit-4',
        topic_id: 'ext-eulerian-pathcircuit',
        title: 'Pitfalls & Use Cases',
        content: `> [!WARNING]
> Always verify **connectivity** of the edge-bearing vertices first. Degree conditions alone are not enough — two disconnected even-degree cycles have no single Eulerian circuit.

Common mistakes:
- Confusing Eulerian (every edge once) with Hamiltonian (every vertex once); the latter is NP-hard.
- Using an $O(E^2)$ naive edge-removal instead of Hierholzer's linear method.

Used in DNA fragment assembly (de Bruijn graphs), route inspection, and circuit-drawing puzzles.`,
        display_order: 4,
      },
    ],
    snippets: [
      {
        id: 'snip-eulerian-pathcircuit-py',
        topic_id: 'ext-eulerian-pathcircuit',
        language: 'python',
        is_optimized: true,
        code: `def hierholzer(adj, start, edge_count):
    # adj[u] = list of v (directed). Returns Eulerian trail or None.
    from collections import defaultdict
    ptr = defaultdict(int)
    stack = [start]
    trail = []
    used = 0
    while stack:
        u = stack[-1]
        if ptr[u] < len(adj[u]):
            v = adj[u][ptr[u]]
            ptr[u] += 1
            stack.append(v)
            used += 1
        else:
            trail.append(stack.pop())
    trail.reverse()
    return trail if used == edge_count else None`,
        explanation: 'Advances an edge pointer per vertex; a vertex is emitted once its edges are exhausted.',
      },
      {
        id: 'snip-eulerian-pathcircuit-js',
        topic_id: 'ext-eulerian-pathcircuit',
        language: 'javascript',
        is_optimized: true,
        code: `function hierholzer(adj, start, edgeCount) {
  // adj[u] = array of v (directed). Returns trail array or null.
  const ptr = new Array(adj.length).fill(0);
  const stack = [start];
  const trail = [];
  let used = 0;
  while (stack.length) {
    const u = stack[stack.length - 1];
    if (ptr[u] < adj[u].length) {
      const v = adj[u][ptr[u]++];
      stack.push(v);
      used++;
    } else {
      trail.push(stack.pop());
    }
  }
  trail.reverse();
  return used === edgeCount ? trail : null;
}`,
        explanation: 'An iterative stack-based Hierholzer that returns null when not all edges are consumed.',
      },
      {
        id: 'snip-eulerian-pathcircuit-cpp',
        topic_id: 'ext-eulerian-pathcircuit',
        language: 'cpp',
        is_optimized: true,
        code: `#include <vector>
#include <algorithm>
using namespace std;

// adj[u] = list of v (directed). Returns trail; empty if not all edges used.
vector<int> hierholzer(vector<vector<int>> adj, int start, int edgeCount) {
    int n = adj.size();
    vector<int> ptr(n, 0), stack{start}, trail;
    int used = 0;
    while (!stack.empty()) {
        int u = stack.back();
        if (ptr[u] < (int)adj[u].size()) {
            int v = adj[u][ptr[u]++];
            stack.push_back(v);
            ++used;
        } else {
            trail.push_back(stack.back());
            stack.pop_back();
        }
    }
    reverse(trail.begin(), trail.end());
    return used == edgeCount ? trail : vector<int>{};
}`,
        explanation: 'Per-vertex pointers avoid rescanning consumed edges, keeping it linear.',
      },
      {
        id: 'snip-eulerian-pathcircuit-java',
        topic_id: 'ext-eulerian-pathcircuit',
        language: 'java',
        is_optimized: true,
        code: `import java.util.*;

class Hierholzer {
    // adj[u] = list of v (directed). Returns trail; empty if not all edges used.
    static List<Integer> trail(List<Integer>[] adj, int start, int edgeCount) {
        int n = adj.length;
        int[] ptr = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(start);
        List<Integer> trail = new ArrayList<>();
        int used = 0;
        while (!stack.isEmpty()) {
            int u = stack.peek();
            if (ptr[u] < adj[u].size()) {
                int v = adj[u].get(ptr[u]++);
                stack.push(v);
                used++;
            } else {
                trail.add(stack.pop());
            }
        }
        Collections.reverse(trail);
        return used == edgeCount ? trail : new ArrayList<>();
    }
}`,
        explanation: 'A stack-driven Hierholzer; an incomplete edge count yields an empty result.',
      },
    ],
    quizId: 'quiz-ext-eulerian-pathcircuit',
    quizTitle: 'Eulerian Path and Circuit Quiz',
    quizDescription: 'Test your understanding of Eulerian trail existence and construction.',
    questions: [
      {
        id: 'q-eulerian-pathcircuit-1',
        quiz_id: 'quiz-ext-eulerian-pathcircuit',
        question_text: 'An undirected connected graph has an Eulerian circuit if and only if which condition holds?',
        question_type: 'MCQ',
        options: ['Exactly two vertices have odd degree', 'Every vertex has even degree', 'It has no cycles', 'Every vertex has degree one'],
        correct_option_index: 1,
        explanation: 'An Eulerian circuit requires all vertices to have even degree in a connected graph.',
      },
      {
        id: 'q-eulerian-pathcircuit-2',
        quiz_id: 'quiz-ext-eulerian-pathcircuit',
        question_text: 'An undirected connected graph with exactly two odd-degree vertices has an Eulerian path but not an Eulerian circuit.',
        question_type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correct_option_index: 0,
        explanation: 'The two odd-degree vertices must serve as the start and end of the path; a circuit needs all even degrees.',
      },
      {
        id: 'q-eulerian-pathcircuit-3',
        quiz_id: 'quiz-ext-eulerian-pathcircuit',
        question_text: 'What is the time complexity of Hierholzer\'s algorithm for finding an Eulerian trail?',
        question_type: 'COMPLEXITY',
        options: ['O(V + E)', 'O(E^2)', 'O(V^3)', 'O(2^V)'],
        correct_option_index: 0,
        explanation: 'Each edge is traversed exactly once, so Hierholzer runs in O(V + E).',
      },
    ],
  },
];
