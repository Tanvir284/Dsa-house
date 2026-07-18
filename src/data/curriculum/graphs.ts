import { Topic, LessonSection, CodeSnippet, QuizQuestion } from '@/types';
import { CATEGORY_IDS } from './linear';

// 1. BFS (BREADTH-FIRST SEARCH)
export const bfsTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bbb',
  slug: 'bfs',
  category_id: CATEGORY_IDS.graphs,
  title: 'BFS',
  definition: 'An algorithm for traversing or searching graph data structures. It starts at a source node and explores all of its neighbor nodes at the present depth before moving to nodes at the next depth level.',
  importance: 'BFS is the standard method for finding the shortest path in unweighted graphs and for level-order tree traversals.',
  prerequisites: ['queue'],
  difficulty: 'Intermediate',
  time_complexity_best: 'O(V + E)',
  time_complexity_average: 'O(V + E)',
  time_complexity_worst: 'O(V + E) (Where V is vertices and E is edges)',
  space_complexity: 'O(V)',
  display_order: 11,
};

export const bfsSections: LessonSection[] = [
  {
    id: 'sec-bfs-1',
    topic_id: bfsTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Imagine dropping a stone in a calm pond: ripples expand outwards in concentric circles from the center.
In **BFS (Breadth-First Search)**, we start at a source vertex. We visit all direct neighbors (distance 1 ripples) first.
Then we visit neighbors-of-neighbors (distance 2 ripples) next.
We continue expanding outward level by level.
To coordinate this, BFS uses a **Queue** (FIFO) to track vertices to visit, and a **Visited Set** to prevent infinite loops on graph cycles.
    `,
    display_order: 1,
  },
  {
    id: 'sec-bfs-2',
    topic_id: bfsTopic.id,
    title: 'Shortest Path Property',
    content: `
Because BFS explores the graph layer by layer, the first time you reach a node $T$ from source $S$, you have guaranteed to find the shortest path (in terms of edge count) between $S$ and $T$.
    `,
    display_order: 2,
  },
  {
    id: 'sec-bfs-3',
    topic_id: bfsTopic.id,
    title: 'Real-World Analogy',
    content: `
Drop a small stone into a still pond. A ring of ripples spreads out first, then a second wider ring, then a third — each ring reaches every point at the same distance from where the stone landed before moving on.

**BFS** is that ripple. From the starting node, it visits every direct neighbor (distance 1) before touching any node at distance 2. Then it visits everyone at distance 2 before moving to distance 3, and so on.

A more concrete example: on a social network, "friends of friends of friends" is a BFS at depth 3. The queue guarantees you finish greeting every friend before you start on their friends, which is exactly why BFS naturally computes shortest paths in unweighted graphs.
    `,
    display_order: 3,
  },
  {
    id: 'sec-bfs-4',
    topic_id: bfsTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Consider this 6-node undirected graph, stored as an adjacency list:

\`\`\`
Adjacency list:
1 → [2, 3]
2 → [1, 4, 5]
3 → [1, 6]
4 → [2]
5 → [2, 6]
6 → [3, 5]

Picture:
        1
       / \\
      2   3
     /|   |
    4 5---6
\`\`\`

Run BFS starting from node **1**. We track two things: the **queue** (front on the left) and the **visited** set. When we pop a node, we push each unvisited neighbor (in list order) and mark it visited immediately.

| Step | Action                              | Queue (front → back) | Visited              | Output |
| ---- | ----------------------------------- | -------------------- | -------------------- | ------ |
| 0    | Enqueue source 1                    | [1]                  | {1}                  | —      |
| 1    | Pop 1; enqueue neighbors 2, 3       | [2, 3]               | {1, 2, 3}            | 1      |
| 2    | Pop 2; 1 already visited; enqueue 4, 5 | [3, 4, 5]         | {1, 2, 3, 4, 5}      | 1 2    |
| 3    | Pop 3; 1 visited; enqueue 6         | [4, 5, 6]            | {1, 2, 3, 4, 5, 6}   | 1 2 3  |
| 4    | Pop 4; 2 visited; nothing new       | [5, 6]               | {1, 2, 3, 4, 5, 6}   | 1 2 3 4|
| 5    | Pop 5; 2, 6 visited; nothing new    | [6]                  | {1, 2, 3, 4, 5, 6}   | 1 2 3 4 5 |
| 6    | Pop 6; 3, 5 visited; nothing new    | []                   | {1, 2, 3, 4, 5, 6}   | 1 2 3 4 5 6 |

**BFS order**: \`1, 2, 3, 4, 5, 6\`. Note how nodes at distance 1 from source (2, 3) came out before nodes at distance 2 (4, 5, 6). The shortest path from 1 to 6 is \`1 → 3 → 6\`, length 2 — exactly what BFS discovered.
    `,
    display_order: 4,
  },
  {
    id: 'sec-bfs-5',
    topic_id: bfsTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
1. **Forgetting the visited set.** On any graph with a cycle, an unmarked BFS re-enqueues nodes forever and hangs your program.
2. **Marking a node visited when you *pop* it, not when you *enqueue* it.** Doing it on pop lets the same node be enqueued many times through different neighbors, wasting memory and work.
3. **Using a plain array with \`.shift()\` as the queue** in JavaScript. \`shift\` is $O(N)$ — for large graphs, use a deque, a linked list, or index-based dequeue to keep BFS truly $O(V+E)$.
4. **Confusing BFS with DFS.** BFS uses a **queue** (FIFO) and explores level-by-level; DFS uses a **stack** (or recursion) and dives deep first.
5. **Trusting BFS for shortest path on *weighted* graphs.** BFS finds shortest paths only when every edge has weight 1. For weighted edges use Dijkstra's algorithm.
6. **Forgetting disconnected components.** A single BFS reaches only nodes in the source's component; iterate over unvisited nodes and restart BFS from each to cover the whole graph.
    `,
    display_order: 5,
  },
  {
    id: 'sec-bfs-6',
    topic_id: bfsTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **Shortest path in unweighted graphs** — mazes, grid puzzles, "how many moves for a knight to reach a square?" all reduce to BFS.
- **Social-network degrees of separation** — "how many friend hops from Alice to Bob?" is a BFS on the friendship graph.
- **Web crawlers** — starting from a seed URL, visit all pages one link away, then two links away, and so on; BFS naturally bounds crawl depth.
- **Broadcast and peer-to-peer network flooding** — deliver a packet to every reachable node in the fewest hops.
- **Level-order tree traversal** — printing a binary tree row by row, or building a heap layer by layer.
- **Bipartite-graph checking and 2-coloring** — a BFS colors alternating layers; if two adjacent nodes ever share a color, the graph isn't bipartite.
    `,
    display_order: 6,
  },
];

export const bfsSnippets: CodeSnippet[] = [
  {
    id: 'snip-bfs-py',
    topic_id: bfsTopic.id,
    language: 'python',
    is_optimized: false,
    code: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    order = []
    
    while queue:
        vertex = queue.popleft()
        order.append(vertex)
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                
    return order`,
    explanation: 'Python BFS implementation using deque and a visited set.',
  },
  {
    id: 'snip-bfs-js',
    topic_id: bfsTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `function bfs(graph, start) {
    let visited = new Set();
    let queue = [start];
    visited.add(start);
    let result = [];
    
    while (queue.length > 0) {
        let node = queue.shift();
        result.push(node);
        
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
}`,
    explanation: 'JavaScript BFS using queue array shifting and a Set for visited nodes.',
  },
  {
    id: 'snip-bfs-c',
    topic_id: bfsTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_VERTICES 100

void bfs(int adj[MAX_VERTICES][MAX_VERTICES], int V, int start) {
    bool visited[MAX_VERTICES] = {false};
    int queue[MAX_VERTICES];
    int front = 0, rear = 0;
    
    visited[start] = true;
    queue[rear++] = start;
    
    while (front < rear) {
        int curr = queue[front++];
        printf("%d ", curr);
        
        for (int i = 0; i < V; i++) {
            if (adj[curr][i] == 1 && !visited[i]) {
                visited[i] = true;
                queue[rear++] = i;
            }
        }
    }
}`,
    explanation: 'C implementation of BFS using adjacency matrix representation and manual queue indexing.',
  },
  {
    id: 'snip-bfs-cpp',
    topic_id: bfsTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>

void bfs(const std::vector<std::vector<int>>& adjList, int start) {
    std::unordered_set<int> visited;
    std::queue<int> q;
    
    visited.insert(start);
    q.push(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        std::cout << node << " ";
        
        for (int neighbor : adjList[node]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
}`,
    explanation: 'C++ BFS mapping vectors and unordered_set standard templates.',
  },
  {
    id: 'snip-bfs-java',
    topic_id: bfsTopic.id,
    language: 'java',
    is_optimized: false,
    code: `import java.util.*;

public class BFS {
    public static List<Integer> traverse(Map<Integer, List<Integer>> adjList, int start) {
        List<Integer> order = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        
        visited.add(start);
        queue.add(start);
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            order.add(node);
            
            for (int neighbor : adjList.getOrDefault(node, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
        return order;
    }
}`,
    explanation: 'Java BFS using map representations of graphs.',
  },
  {
    id: 'snip-bfs-cs',
    topic_id: bfsTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `using System;
using System.Collections.Generic;

public class GraphBFS {
    public static void Traverse(List<int>[] adj, int start) {
        bool[] visited = new bool[adj.Length];
        Queue<int> q = new Queue<int>();
        
        visited[start] = true;
        q.Enqueue(start);
        
        while (q.Count > 0) {
            int node = q.Dequeue();
            Console.Write(node + " ");
            
            foreach (int neighbor in adj[node]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.Enqueue(neighbor);
                }
            }
        }
    }
}`,
    explanation: 'C# implementation of BFS with generic arrays.',
  }
];

export const bfsQuestions: QuizQuestion[] = [
  {
    id: 'q-bfs-1',
    quiz_id: 'quiz-bfs',
    question_text: 'What underlying data structure is typically used to coordinate Breadth-First Search (BFS)?',
    question_type: 'MCQ',
    options: ['Stack', 'Queue', 'Hash Map', 'Priority Queue'],
    correct_option_index: 1,
    explanation: 'BFS explores graph levels sequentially. A FIFO Queue ensures nodes from outer layers are queued up and processed in order.',
  },
];


// 2. DFS (DEPTH-FIRST SEARCH)
export const dfsTopic: Topic = {
  id: 'a0e69888-294b-4b20-9159-4d6cbcd34bbc',
  slug: 'dfs',
  category_id: CATEGORY_IDS.graphs,
  title: 'DFS',
  definition: 'An algorithm for traversing or searching graph data structures. It starts at a source node and explores as far as possible along each branch before backtracking.',
  importance: 'DFS is crucial for topological sorting, cycle detection, finding connected components, and resolving maze pathways.',
  prerequisites: ['stack'],
  difficulty: 'Intermediate',
  time_complexity_best: 'O(V + E)',
  time_complexity_average: 'O(V + E)',
  time_complexity_worst: 'O(V + E) (Where V is vertices and E is edges)',
  space_complexity: 'O(V) (Recursion stack depth)',
  display_order: 12,
};

export const dfsSections: LessonSection[] = [
  {
    id: 'sec-dfs-1',
    topic_id: dfsTopic.id,
    title: 'Visual & Intuitive Explanation',
    content: `
Imagine exploring a maze. You do not check all forks simultaneously.
Instead, you pick a path and walk as deep as you can.
When you hit a dead end, you back up to the last fork and try the alternative path.
This is **DFS (Depth-First Search)**!
DFS uses a **Stack** (either the system recursion call stack or an explicit stack object) and a **Visited Set** to prevent looping on graph cycles.
    `,
    display_order: 1,
  },
  {
    id: 'sec-dfs-2',
    topic_id: dfsTopic.id,
    title: 'Recursive vs Iterative DFS',
    content: `
- **Recursive DFS**: Highly intuitive. The system uses the CPU call stack to store vertex execution frames.
- **Iterative DFS**: Replaces recursion with an explicit \`Stack\` object, avoiding stack-overflow bugs on extremely deep graphs.
    `,
    display_order: 2,
  },
  {
    id: 'sec-dfs-3',
    topic_id: dfsTopic.id,
    title: 'Real-World Analogy',
    content: `
Picture yourself lost inside a hedge maze. A classic trick is the **right-hand rule**: keep your right hand touching the wall and just keep walking. You follow a corridor as far as it goes, and only when you hit a dead end do you back up to the last junction and try a different corridor.

That is **DFS** in one sentence: pick a path, go as deep as possible, and only backtrack when you must. The role of your right hand is played by the **stack** — either the CPU's call stack when you use recursion, or an explicit stack when you write it iteratively.

The visited set is your breadcrumbs: without it, you'd walk in circles forever the first time the maze had a loop.
    `,
    display_order: 3,
  },
  {
    id: 'sec-dfs-4',
    topic_id: dfsTopic.id,
    title: 'Step-by-Step Walkthrough',
    content: `
Use the same 6-node undirected graph as the BFS lesson:

\`\`\`
Adjacency list:
1 → [2, 3]
2 → [1, 4, 5]
3 → [1, 6]
4 → [2]
5 → [2, 6]
6 → [3, 5]

Picture:
        1
       / \\
      2   3
     /|   |
    4 5---6
\`\`\`

Run **iterative DFS** from node **1** using an explicit stack. Push the source, then repeatedly pop the top; when a node is popped for the first time, mark it visited, output it, and push its unvisited neighbors **in reverse list order** so the leftmost neighbor is explored first.

| Step | Action                                       | Stack (top → right) | Visited              | Output |
| ---- | -------------------------------------------- | ------------------- | -------------------- | ------ |
| 0    | Push source 1                                | [1]                 | {}                   | —      |
| 1    | Pop 1; visit; push neighbors reversed → 3, 2 | [3, 2]              | {1}                  | 1      |
| 2    | Pop 2; visit; push reversed(1,4,5) → 5, 4, 1 | [3, 5, 4, 1]        | {1, 2}               | 1 2    |
| 3    | Pop 1; already visited; skip                 | [3, 5, 4]           | {1, 2}               | 1 2    |
| 4    | Pop 4; visit; push reversed(2) → 2           | [3, 5, 2]           | {1, 2, 4}            | 1 2 4  |
| 5    | Pop 2; already visited; skip                 | [3, 5]              | {1, 2, 4}            | 1 2 4  |
| 6    | Pop 5; visit; push reversed(2,6) → 6, 2      | [3, 6, 2]           | {1, 2, 4, 5}         | 1 2 4 5 |
| 7    | Pop 2; already visited; skip                 | [3, 6]              | {1, 2, 4, 5}         | 1 2 4 5 |
| 8    | Pop 6; visit; push reversed(3,5) → 5, 3      | [3, 5, 3]           | {1, 2, 4, 5, 6}      | 1 2 4 5 6 |
| 9    | Pop 3; visit; push reversed(1,6) → 6, 1      | [3, 5, 6, 1]        | {1, 2, 3, 4, 5, 6}   | 1 2 4 5 6 3 |
| 10   | Pop 1, 6, 5, 3 — all already visited; skip   | []                  | {1, 2, 3, 4, 5, 6}   | 1 2 4 5 6 3 |

**DFS order**: \`1, 2, 4, 5, 6, 3\`. Compare with BFS on the same graph (\`1, 2, 3, 4, 5, 6\`) — DFS dove deep down the branch through 2 before ever touching 3.
    `,
    display_order: 4,
  },
  {
    id: 'sec-dfs-5',
    topic_id: dfsTopic.id,
    title: 'Common Pitfalls for Beginners',
    content: `
1. **Forgetting the visited set.** DFS on a cyclic graph without one recurses forever and blows the stack — or in iterative form, endlessly re-pushes the same nodes.
2. **Confusing DFS output with BFS output.** DFS explores one branch deeply first; the order is *not* level-by-level.
3. **Stack overflow on deep graphs** with recursive DFS. If your graph can have chains of tens of thousands of nodes, switch to an iterative stack-based version.
4. **Pushing neighbors in the "natural" order** in iterative DFS. Because a stack is LIFO, the *last* neighbor pushed is explored *first*. Push in reverse if you need left-to-right traversal.
5. **Mixing up "visited" and "on the current path"** for cycle detection in *directed* graphs. You need three states — unvisited, in-progress, done — not just a boolean.
6. **Assuming DFS finds shortest paths.** It does not. Use BFS (unweighted) or Dijkstra (weighted) for shortest paths.
    `,
    display_order: 5,
  },
  {
    id: 'sec-dfs-6',
    topic_id: dfsTopic.id,
    title: 'When to Use It (Practical Cases)',
    content: `
- **Topological sort** of a DAG (build systems, task scheduling, course prerequisites) — DFS post-order gives a valid order in $O(V+E)$.
- **Finding connected components** in an undirected graph — one DFS per unvisited node labels each component.
- **Cycle detection** — DFS with a recursion-stack marker catches back-edges in both directed and undirected graphs.
- **Maze and puzzle solving with backtracking** — Sudoku, N-Queens, word-search, Hamiltonian paths.
- **Strongly Connected Components** via Kosaraju's or Tarjan's algorithm — both are DFS at their core.
- **Bridge- and articulation-point discovery** in network reliability analysis, using DFS discovery/low-link times.
    `,
    display_order: 6,
  },
];

export const dfsSnippets: CodeSnippet[] = [
  {
    id: 'snip-dfs-py',
    topic_id: dfsTopic.id,
    language: 'python',
    is_optimized: false,
    code: `# Recursive Implementation
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    order = [node]
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            order.extend(dfs_recursive(graph, neighbor, visited))
    return order

# Iterative Implementation
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    order = []
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            order.append(node)
            # Reverse neighbors to explore left-to-right
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)
    return order`,
    explanation: 'Python recursive and iterative stack implementations of DFS.',
  },
  {
    id: 'snip-dfs-js',
    topic_id: dfsTopic.id,
    language: 'javascript',
    is_optimized: false,
    code: `function dfs(graph, node, visited = new Set(), order = []) {
    visited.add(node);
    order.push(node);
    
    for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited, order);
        }
    }
    return order;
}`,
    explanation: 'Standard recursive DFS in JavaScript passing visited Sets.',
  },
  {
    id: 'snip-dfs-c',
    topic_id: dfsTopic.id,
    language: 'c',
    is_optimized: false,
    code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_V 100

void dfs_helper(int adj[MAX_V][MAX_V], int V, int u, bool visited[]) {
    visited[u] = true;
    printf("%d ", u);
    
    for (int v = 0; v < V; v++) {
        if (adj[u][v] == 1 && !visited[v]) {
            dfs_helper(adj, V, v, visited);
        }
    }
}

void dfs(int adj[MAX_V][MAX_V], int V, int start) {
    bool visited[MAX_V] = {false};
    dfs_helper(adj, V, start, visited);
}`,
    explanation: 'C recursive DFS utilizing a helper function to pass visited array state.',
  },
  {
    id: 'snip-dfs-cpp',
    topic_id: dfsTopic.id,
    language: 'cpp',
    is_optimized: false,
    code: `#include <iostream>
#include <vector>
#include <unordered_set>

void dfsHelper(const std::vector<std::vector<int>>& adj, int u, std::unordered_set<int>& visited) {
    visited.insert(u);
    std::cout << u << " ";
    
    for (int v : adj[u]) {
        if (visited.find(v) == visited.end()) {
            dfsHelper(adj, v, visited);
        }
    }
}

void dfs(const std::vector<std::vector<int>>& adj, int start) {
    std::unordered_set<int> visited;
    dfsHelper(adj, start, visited);
}`,
    explanation: 'C++ standard recursive graph traversal.',
  },
  {
    id: 'snip-dfs-java',
    topic_id: dfsTopic.id,
    language: 'java',
    is_optimized: false,
    code: `import java.util.*;

public class DFS {
    public void traverse(Map<Integer, List<Integer>> adjList, int node, Set<Integer> visited) {
        visited.add(node);
        System.out.print(node + " ");
        
        for (int neighbor : adjList.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                traverse(adjList, neighbor, visited);
            }
        }
    }
}`,
    explanation: 'Java recursive DFS utility method implementation.',
  },
  {
    id: 'snip-dfs-cs',
    topic_id: dfsTopic.id,
    language: 'csharp',
    is_optimized: false,
    code: `using System;
using System.Collections.Generic;

public class GraphDFS {
    public static void Traverse(List<int>[] adj, int u, bool[] visited) {
        visited[u] = true;
        Console.Write(u + " ");
        
        foreach (int v in adj[u]) {
            if (!visited[v]) {
                Traverse(adj, v, visited);
            }
        }
    }
}`,
    explanation: 'C# recursive DFS implementation.',
  }
];

export const dfsQuestions: QuizQuestion[] = [
  {
    id: 'q-dfs-1',
    quiz_id: 'quiz-dfs',
    question_text: 'What is the time complexity of Depth-First Search (DFS) on a graph with V vertices and E edges represented as an adjacency list?',
    question_type: 'MCQ',
    options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
    correct_option_index: 2,
    explanation: 'DFS visits each vertex once and scans all adjacent edges, yielding a time complexity of O(V + E).',
  },
];
