'use client';

import React, { useState, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

interface Edge {
  u: number;
  v: number;
}

interface GraphVisualizerProps {
  initialMode?: 'bfs' | 'dfs';
}

export default function GraphVisualizer({ initialMode = 'bfs' }: GraphVisualizerProps) {
  const [traversalMode, setTraversalMode] = useState<'bfs' | 'dfs'>(initialMode);
  const abortRef = useRef(false);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [bufferState, setBufferState] = useState<number[]>([]); // Current queue (BFS) or stack (DFS)
  // Edges that belong to the traversal tree (parent -> child at discovery time),
  // stored as "min-max" keys so the SVG can highlight the exact traversal path.
  const [treeEdges, setTreeEdges] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>('Graph loaded. Choose traversal mode and click "Start Traversal".');

  // Static graph layout nodes coordinates
  const nodes: GraphNode[] = [
    { id: 0, label: '0', x: 250, y: 40 },
    { id: 1, label: '1', x: 130, y: 120 },
    { id: 2, label: '2', x: 370, y: 120 },
    { id: 3, label: '3', x: 130, y: 240 },
    { id: 4, label: '4', x: 370, y: 240 },
    { id: 5, label: '5', x: 250, y: 310 },
  ];

  const edges: Edge[] = [
    { u: 0, v: 1 },
    { u: 0, v: 2 },
    { u: 1, v: 3 },
    { u: 1, v: 4 },
    { u: 2, v: 4 },
    { u: 3, v: 5 },
    { u: 4, v: 5 },
  ];

  // Adjacency List representing connections
  const adjacencyList: Record<number, number[]> = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 4],
    3: [1, 5],
    4: [1, 2, 5],
    5: [3, 4],
  };

  const delay = (ms: number) =>
    new Promise<void>((resolve) => {
      setTimeout(() => resolve(), ms);
    });

  const edgeKey = (a: number, b: number) => `${Math.min(a, b)}-${Math.max(a, b)}`;

  const runBFS = async () => {
    setIsAnimating(true);
    abortRef.current = false;
    const visited: number[] = [];
    const queue: number[] = [0];
    const visitedSet = new Set<number>([0]);

    setVisitedNodes([]);
    setBufferState([0]);
    setTreeEdges(new Set());
    const tree = new Set<string>();
    setExplanation("Enqueued starting Root Node 0. Marked as visited.");
    await delay(1200);
    if (abortRef.current) return;

    while (queue.length > 0) {
      const curr = queue.shift()!;
      setBufferState([...queue]);
      setActiveNode(curr);
      visited.push(curr);
      setVisitedNodes([...visited]);

      setExplanation(`Dequeued Node ${curr} from Front of Queue. Inspecting unvisited adjacent neighbors...`);
      await delay(1400);
      if (abortRef.current) return;

      const neighbors = adjacencyList[curr] || [];
      for (const neighbor of neighbors) {
        if (!visitedSet.has(neighbor)) {
          visitedSet.add(neighbor);
          queue.push(neighbor);
          tree.add(edgeKey(curr, neighbor));
          setTreeEdges(new Set(tree));
          setBufferState([...queue]);
          setExplanation(`Neighbor Node ${neighbor} is unvisited. Registering and enqueuing at Rear of Queue.`);
          await delay(1000);
          if (abortRef.current) return;
        }
      }
    }

    setActiveNode(null);
    setIsAnimating(false);
    setExplanation("BFS Traversal completed. Visited sequence: " + visited.join(" → "));
  };

  const runDFS = async () => {
    setIsAnimating(true);
    abortRef.current = false;
    const visited: number[] = [];
    const stack: number[] = [0];
    const visitedSet = new Set<number>();
    const parent: Record<number, number> = {};

    setVisitedNodes([]);
    setBufferState([0]);
    setTreeEdges(new Set());
    const tree = new Set<string>();
    setExplanation("Pushed initial Root Node 0 onto Stack.");
    await delay(1200);
    if (abortRef.current) return;

    while (stack.length > 0) {
      const curr = stack.pop()!;
      setBufferState([...stack]);

      if (!visitedSet.has(curr)) {
        visitedSet.add(curr);
        setActiveNode(curr);
        visited.push(curr);
        setVisitedNodes([...visited]);
        if (parent[curr] !== undefined) {
          tree.add(edgeKey(parent[curr], curr));
          setTreeEdges(new Set(tree));
        }

        setExplanation(`Popped Node ${curr} from Top of Stack and visited it.`);
        await delay(1400);
        if (abortRef.current) return;

        const neighbors = adjacencyList[curr] || [];
        for (let i = neighbors.length - 1; i >= 0; i--) {
          const neighbor = neighbors[i];
          if (!visitedSet.has(neighbor)) {
            if (parent[neighbor] === undefined) parent[neighbor] = curr;
            stack.push(neighbor);
            setBufferState([...stack]);
            setExplanation(`Neighbor Node ${neighbor} is unvisited. Pushing onto Stack.`);
            await delay(1000);
            if (abortRef.current) return;
          }
        }
      } else {
        setExplanation(`Popped Node ${curr} but it was already visited. Skipping duplicate.`);
        await delay(800);
        if (abortRef.current) return;
      }
    }

    setActiveNode(null);
    setIsAnimating(false);
    setExplanation("DFS Traversal completed. Visited sequence: " + visited.join(" → "));
  };

  const handleStart = () => {
    if (isAnimating) return;
    if (traversalMode === 'bfs') runBFS();
    else runDFS();
  };

  const handleReset = () => {
    abortRef.current = true;
    setIsAnimating(false);
    setVisitedNodes([]);
    setActiveNode(null);
    setBufferState([]);
    setTreeEdges(new Set());
    setExplanation('Visualizer reset. Ready to run new traversal.');
  };

  return (
    <div className="flex flex-col gap-6 w-full items-center p-2">
      {/* Visual Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full animate-fade-in">
        {/* Left Side: Graph SVG */}
        <div className="lg:col-span-3 border border-border rounded-2xl bg-card overflow-x-auto min-h-[340px] flex items-center justify-center p-4 visualizer-arena shadow-lg">
          <svg className="w-[500px] h-[340px] shrink-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            
            {/* Draw edge lines */}
            {edges.map((edge, idx) => {
              const uNode = nodes[edge.u];
              const vNode = nodes[edge.v];
              
              // Edge is highlighted only if it is part of the actual traversal
              // tree, plus the edge from the currently active node to its parent.
              const isEdgeActive =
                treeEdges.has(edgeKey(edge.u, edge.v)) &&
                visitedNodes.includes(edge.u) &&
                visitedNodes.includes(edge.v);

              return (
                <g key={idx}>
                  {/* Base passive line */}
                  <line
                    x1={uNode.x}
                    y1={uNode.y}
                    x2={vNode.x}
                    y2={vNode.y}
                    stroke="var(--border)"
                    strokeWidth={1.5}
                    className="opacity-70"
                  />
                  {/* Glowing active flow line on top */}
                  {isEdgeActive && (
                    <line
                      x1={uNode.x}
                      y1={uNode.y}
                      x2={vNode.x}
                      y2={vNode.y}
                      stroke="var(--accent)"
                      strokeWidth={3}
                      strokeDasharray="4 4"
                      className="svg-connection drop-shadow-[0_0_8px_rgba(0,242,255,0.65)]"
                    />
                  )}
                </g>
              );
            })}

            {/* Draw node circles */}
            {nodes.map((node) => {
              let circleColor = 'fill-card stroke-border/70';
              let textColor = 'fill-foreground';
              
              const isActive = activeNode === node.id;
              const isVisited = visitedNodes.includes(node.id);
              const isBuffered = bufferState.includes(node.id);

              if (isActive) {
                circleColor = 'fill-rose-500/15 stroke-rose-500 stroke-[3]';
                textColor = 'fill-rose-500 font-black';
              } else if (isVisited) {
                circleColor = 'fill-complete/15 stroke-complete stroke-[2.5]';
                textColor = 'fill-complete font-black';
              } else if (isBuffered) {
                circleColor = 'fill-accent/15 stroke-accent stroke-[2]';
                textColor = 'fill-accent font-extrabold';
              }

              return (
                <g key={node.id} className="transition-all duration-300 origin-center">
                  
                  {/* Outer spinning ring for visited/active/buffered nodes */}
                  {(isActive || isVisited || isBuffered) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={25}
                      fill="none"
                      stroke={isActive ? 'var(--rose-500)' : isVisited ? 'var(--complete)' : 'var(--accent)'}
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      className="animate-spin opacity-45"
                      style={{ animationDuration: isActive ? '5s' : '10s' }}
                    />
                  )}

                  {/* Core Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={18}
                    className={`${circleColor} transition-all duration-300 cursor-pointer hover:stroke-primary`}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className={`font-mono text-xs font-bold ${textColor} select-none`}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Side: Buffer State Panel */}
        <div className="flex flex-col gap-4 border border-border rounded-2xl bg-card p-4 shadow-sm justify-between select-none">
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2">
              {traversalMode === 'bfs' ? 'Queue Registry (FIFO)' : 'Stack Registry (LIFO)'}
            </h4>
            
            <div className="flex flex-col justify-center items-center bg-background/50 rounded-xl border border-border p-4 min-h-[140px] shadow-inner">
              {bufferState.length === 0 ? (
                <span className="text-[9px] font-mono font-black text-muted-foreground/45">[EMPTY REGISTER]</span>
              ) : (
                <div className={`flex gap-2.5 ${traversalMode === 'bfs' ? 'flex-row' : 'flex-col-reverse'}`}>
                  {bufferState.map((nodeId, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 border border-accent/40 bg-accent/10 rounded-xl flex items-center justify-center font-mono text-xs font-black text-accent shadow-sm animate-scale-in"
                    >
                      {nodeId}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Traversal Trail</span>
            <div className="flex gap-1.5 flex-wrap bg-background/40 p-2 rounded-xl border border-border/85 min-h-[48px] items-center shadow-inner">
              {visitedNodes.length === 0 ? (
                <span className="text-[9px] font-mono font-black text-muted-foreground/45">No elements visited</span>
              ) : (
                visitedNodes.map((nodeId, idx) => (
                  <span
                    key={idx}
                    className="text-[9.5px] font-mono font-black bg-complete/10 border border-complete/25 text-complete px-2.5 py-0.5 rounded-lg shadow-sm animate-scale-in"
                  >
                    {nodeId}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="p-4 rounded-xl border border-border/60 bg-primary/5 backdrop-blur-sm w-full text-xs font-semibold leading-relaxed text-foreground shadow-sm">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-1">State Log</span>
        <div>{explanation}</div>
      </div>

      {/* Controls */}
      <div className="flex gap-5 w-full p-4 rounded-2xl border border-border bg-card shadow-sm items-end justify-between flex-wrap">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Traversal Configuration</label>
          <div className="flex bg-muted/60 p-1 rounded-xl border border-border/80 w-52 shrink-0 shadow-inner">
            <button
              onClick={() => { setTraversalMode('bfs'); handleReset(); }}
              disabled={isAnimating}
              className={`flex-1 py-1.5 text-[9px] font-black rounded-lg transition-all duration-200 cursor-pointer ${traversalMode === 'bfs' ? 'bg-card text-foreground shadow-sm border border-border/40' : 'text-muted-foreground hover:text-foreground'}`}
            >
              BFS (Queue)
            </button>
            <button
              onClick={() => { setTraversalMode('dfs'); handleReset(); }}
              disabled={isAnimating}
              className={`flex-1 py-1.5 text-[9px] font-black rounded-lg transition-all duration-200 cursor-pointer ${traversalMode === 'dfs' ? 'bg-card text-foreground shadow-sm border border-border/40' : 'text-muted-foreground hover:text-foreground'}`}
            >
              DFS (Stack)
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleStart}
            disabled={isAnimating}
            className="flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-md"
          >
            <Play className="h-4 w-4" /> Start Traversal
          </button>
          <button
            onClick={handleReset}
            disabled={isAnimating}
            className="flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-xl border border-border hover:bg-muted text-foreground transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="h-4 w-4" /> Reset Graph
          </button>
        </div>
      </div>
    </div>
  );
}
