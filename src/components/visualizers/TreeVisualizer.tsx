'use client';

import React, { useState, useRef } from 'react';
import { PlusCircle, Search, RotateCcw } from 'lucide-react';

interface BSTNode {
  val: number;
  left?: BSTNode;
  right?: BSTNode;
}

interface RenderNode {
  val: number;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
  state: 'default' | 'traverse' | 'found';
  depth: number;
}

export default function TreeVisualizer() {
  const [tree, setTree] = useState<BSTNode | undefined>({
    val: 50,
    left: {
      val: 30,
      left: { val: 20 },
      right: { val: 40 }
    },
    right: {
      val: 70,
      left: { val: 60 },
      right: { val: 80 }
    }
  });

  const [inputVal, setInputVal] = useState<string>('25');
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [foundNode, setFoundNode] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string>('Binary Search Tree initialized. Insert nodes or search targets to visualize path traversals.');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const abortRef = useRef(false);

  // Tree coordinates layout configurations
  const depthHeight = 65;
  const initialWidth = 135;

  const insertBST = (root: BSTNode | undefined, val: number): BSTNode => {
    if (!root) return { val };
    if (val < root.val) {
      return { ...root, left: insertBST(root.left, val) };
    }
    if (val > root.val) {
      return { ...root, right: insertBST(root.right, val) };
    }
    return root;
  };

  const handleInsert = async () => {
    const num = parseInt(inputVal);
    if (isNaN(num)) return;
    if (isAnimating) return;
    setIsAnimating(true);
    abortRef.current = false;
    setFoundNode(null);

    const path: number[] = [];
    let curr = tree;
    setExplanation(`Inserting node ${num}. Initializing search path at Root Node (${tree?.val ?? num}).`);
    
    while (curr) {
      path.push(curr.val);
      setActiveNodes([...path]);
      
      if (num === curr.val) {
        setExplanation(`Insert aborted! Value ${num} already exists in the BST.`);
        setIsAnimating(false);
        setActiveNodes([]);
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      if (abortRef.current) {
        setIsAnimating(false);
        setActiveNodes([]);
        return;
      }
      
      if (num < curr.val) {
        if (!curr.left) {
          setExplanation(`Comparison: ${num} < ${curr.val}. Left branch is empty. Inserting Node(${num}) at this branch.`);
          break;
        }
        setExplanation(`Comparison: ${num} < ${curr.val}. Advancing down the Left branch to Node(${curr.left.val}).`);
        curr = curr.left;
      } else {
        if (!curr.right) {
          setExplanation(`Comparison: ${num} > ${curr.val}. Right branch is empty. Inserting Node(${num}) at this branch.`);
          break;
        }
        setExplanation(`Comparison: ${num} > ${curr.val}. Advancing down the Right branch to Node(${curr.right.val}).`);
        curr = curr.right;
      }
    }

    setTree((prev) => (prev ? insertBST(prev, num) : { val: num }));

    await new Promise(resolve => setTimeout(resolve, 600));
    setActiveNodes([]);
    setIsAnimating(false);
  };

  const handleSearch = async () => {
    const num = parseInt(inputVal);
    if (isNaN(num)) return;
    if (isAnimating) return;
    setIsAnimating(true);
    abortRef.current = false;
    setFoundNode(null);

    const path: number[] = [];
    let curr = tree;
    setExplanation(`Searching for target ${num}. Commencing lookup from Root Node.`);
    
    while (curr) {
      path.push(curr.val);
      setActiveNodes([...path]);
      
      if (curr.val === num) {
        setFoundNode(num);
        setExplanation(`SUCCESS! Target ${num} located.`);
        setIsAnimating(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 900));
      if (abortRef.current) {
        setActiveNodes([]);
        setIsAnimating(false);
        return;
      }

      if (num < curr.val) {
        setExplanation(`Comparison: ${num} < ${curr.val}. Searching the Left subtree.`);
        curr = curr.left;
      } else {
        setExplanation(`Comparison: ${num} > ${curr.val}. Searching the Right subtree.`);
        curr = curr.right;
      }
    }

    setExplanation(`Search completed: Target value ${num} was not found in the BST.`);
    setActiveNodes([]);
    setIsAnimating(false);
  };

  const handleClear = () => {
    abortRef.current = true;
    setIsAnimating(false);
    setTree(undefined);
    setActiveNodes([]);
    setFoundNode(null);
    setExplanation('BST cleared. The tree structure is now empty.');
  };

  const handleLoadDemo = () => {
    abortRef.current = true;
    setIsAnimating(false);
    setTree({
      val: 50,
      left: {
        val: 30,
        left: { val: 20 },
        right: { val: 40 }
      },
      right: {
        val: 70,
        left: { val: 60 },
        right: { val: 80 }
      }
    });
    setExplanation('Standard demonstration BST reloaded.');
    setActiveNodes([]);
    setFoundNode(null);
  };

  // Build nodes coordinate map for rendering
  const renderNodesList: RenderNode[] = [];
  const renderConnections: { x1: number; y1: number; x2: number; y2: number; active: boolean }[] = [];

  const computeCoordinates = (
    node: BSTNode | undefined,
    x: number,
    y: number,
    hOffset: number,
    depth: number,
    parentX?: number,
    parentY?: number
  ) => {
    if (!node) return;

    // Node state check
    let state: 'default' | 'traverse' | 'found' = 'default';
    if (foundNode === node.val) state = 'found';
    else if (activeNodes.includes(node.val)) state = 'traverse';

    renderNodesList.push({
      val: node.val,
      x,
      y,
      parentX,
      parentY,
      state,
      depth
    });

    if (parentX !== undefined && parentY !== undefined) {
      const activeConnection =
        activeNodes.includes(node.val) && activeNodes.includes(renderNodesList.find(n => n.x === parentX && n.y === parentY)?.val || 0);

      renderConnections.push({
        x1: parentX,
        y1: parentY + 16, // Offset past node circle border
        x2: x,
        y2: y - 16,
        active: activeConnection
      });
    }

    computeCoordinates(node.left, x - hOffset, y + depthHeight, hOffset * 0.48, depth + 1, x, y);
    computeCoordinates(node.right, x + hOffset, y + depthHeight, hOffset * 0.48, depth + 1, x, y);
  };

  // Compute positions
  computeCoordinates(tree, 250, 35, initialWidth, 0);

  return (
    <div className="flex flex-col gap-6 w-full items-center p-2">
      {/* SVG Canvas Tree Render Area */}
      <div className="relative border border-border rounded-2xl bg-card w-full overflow-x-auto min-h-[300px] flex items-center justify-center p-4 visualizer-arena shadow-lg">
        {tree ? (
          <svg className="w-[500px] h-[300px] shrink-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            
            {/* Draw connection lines as curved Bezier paths */}
            {renderConnections.map((conn, idx) => {
              // Cubic Bezier curve paths
              const midY = (conn.y1 + conn.y2) / 2;
              const pathD = `M ${conn.x1} ${conn.y1} C ${conn.x1} ${midY}, ${conn.x2} ${midY}, ${conn.x2} ${conn.y2}`;
              
              return (
                <path
                  key={idx}
                  d={pathD}
                  fill="none"
                  stroke={conn.active ? 'var(--accent)' : 'var(--border)'}
                  strokeWidth={conn.active ? 2.5 : 1.5}
                  className={`transition-all duration-300 ${
                    conn.active ? 'stroke-accent animate-pulse drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]' : ''
                  }`}
                />
              );
            })}

            {/* Draw node circles with outer depth rings */}
            {renderNodesList.map((node, idx) => {
              let circleColor = 'fill-card stroke-border/70';
              let textColor = 'fill-foreground';
              
              if (node.state === 'found') {
                circleColor = 'fill-complete/15 stroke-complete stroke-[2.5]';
                textColor = 'fill-complete font-black';
              } else if (node.state === 'traverse') {
                circleColor = 'fill-accent/15 stroke-accent stroke-[2.5]';
                textColor = 'fill-accent font-black';
              }

              return (
                <g key={idx} className="transition-all duration-300 origin-center">
                  
                  {/* Outer dotted depth ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    fill="none"
                    stroke={
                      node.state === 'found'
                        ? 'var(--complete)'
                        : node.state === 'traverse'
                        ? 'var(--accent)'
                        : 'var(--primary)'
                    }
                    strokeWidth={1}
                    strokeDasharray="2 3"
                    className={`opacity-35 ${node.state !== 'default' ? 'animate-spin' : ''}`}
                    style={{ animationDuration: '10s' }}
                  />

                  {/* Core Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={15}
                    className={`${circleColor} transition-all duration-300 cursor-pointer hover:stroke-primary`}
                  />
                  
                  {/* Value */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className={`font-mono text-[10px] font-bold ${textColor} select-none`}
                  >
                    {node.val}
                  </text>
                  
                  {/* Depth Badge tag */}
                  <text
                    x={node.x}
                    y={node.y - 20}
                    textAnchor="middle"
                    className="font-mono text-[7px] fill-muted-foreground/50 font-bold select-none uppercase"
                  >
                    d={node.depth}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="text-xs font-mono font-black text-muted-foreground select-none">
            [EMPTY TREE]
          </div>
        )}
      </div>

      {/* Explanation Banner */}
      <div className="p-4 rounded-xl border border-border/60 bg-primary/5 backdrop-blur-sm w-full text-xs font-semibold leading-relaxed text-foreground shadow-sm">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-1">State Explanation</span>
        {explanation}
      </div>

      {/* Controls */}
      <div className="flex gap-5 w-full p-4 rounded-2xl border border-border bg-card shadow-sm items-end justify-between flex-wrap">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">BST Operations</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-xl bg-background/50 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 w-20 font-mono font-bold"
              placeholder="Value"
              disabled={isAnimating}
            />
            <button
              onClick={handleInsert}
              disabled={isAnimating}
              className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-md"
            >
              <PlusCircle className="h-4 w-4" /> Insert
            </button>
            <button
              onClick={handleSearch}
              disabled={isAnimating || !tree}
              className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-md"
            >
              <Search className="h-4 w-4" /> Search
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleLoadDemo}
            disabled={isAnimating}
            className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl border border-border hover:bg-muted text-foreground transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="h-4 w-4" /> Demo Tree
          </button>
          <button
            onClick={handleClear}
            disabled={isAnimating}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-border hover:border-rose-500/50 hover:bg-rose-500/15 hover:text-rose-400 transition-all duration-200 cursor-pointer shadow-sm"
          >
            Clear Tree
          </button>
        </div>
      </div>
    </div>
  );
}
