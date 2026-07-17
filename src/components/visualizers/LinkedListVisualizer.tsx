'use client';

import React, { useState } from 'react';
import { PlusCircle, Zap } from 'lucide-react';

interface ListNode {
  id: string;
  val: number;
  memAddress: string;
}

const generateHexAddress = () => {
  return '0x' + Math.floor(Math.random() * 4095 + 4096).toString(16).toUpperCase();
};

export default function LinkedListVisualizer() {
  const [list, setList] = useState<ListNode[]>([
    { id: '1', val: 12, memAddress: '0x3F8E' },
    { id: '2', val: 99, memAddress: '0x7C04' },
    { id: '3', val: 37, memAddress: '0x1A9C' },
  ]);
  const [inputVal, setInputVal] = useState<string>('45');
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string>('Linked List initialized. Nodes show physical memory locations and next pointer offsets.');
  const [isTraversing, setIsTraversing] = useState<boolean>(false);

  const handleInsertHead = () => {
    const num = parseInt(inputVal);
    if (isNaN(num)) return;
    const newAddr = generateHexAddress();
    const newNode: ListNode = {
      id: Math.random().toString(),
      val: num,
      memAddress: newAddr,
    };
    setList([newNode, ...list]);
    setExplanation(`Created Node(${num}) at memory address ${newAddr}. Set Node.next pointing to current head address (${list[0]?.memAddress || 'NULL'}), then re-assigned Head pointer.`);
  };

  const handleAppendTail = () => {
    const num = parseInt(inputVal);
    if (isNaN(num)) return;
    const newAddr = generateHexAddress();
    const newNode: ListNode = {
      id: Math.random().toString(),
      val: num,
      memAddress: newAddr,
    };
    setList([...list, newNode]);
    const prevTail = list[list.length - 1];
    setExplanation(`Traversed to the Tail node at ${prevTail ? prevTail.memAddress : 'NULL'}. Allocated Node(${num}) at ${newAddr} and updated next pointer of previous tail.`);
  };

  const handleDelete = (val: number) => {
    const idx = list.findIndex(n => n.val === val);
    if (idx === -1) {
      setExplanation(`Value ${val} not found in the list.`);
      return;
    }
    const targetNode = list[idx];
    const newList = list.filter((_, i) => i !== idx);
    setList(newList);
    if (idx === 0) {
      setExplanation(`Deleted Head node ${targetNode.memAddress}. Head pointer updated to point to ${list[1]?.memAddress || 'NULL'}.`);
    } else {
      const prevNode = list[idx - 1];
      const nextNode = list[idx + 1];
      setExplanation(`Located Node(${val}) at ${targetNode.memAddress}. Linked Node(${prevNode.val}).next at ${prevNode.memAddress} directly to ${nextNode ? nextNode.memAddress : 'NULL'} bypassing deleted node.`);
    }
  };

  const runTraversal = async () => {
    if (list.length === 0 || isTraversing) return;
    setIsTraversing(true);
    setExplanation('Beginning traversal. Reference pointer initialized to Head node address.');
    
    for (let i = 0; i < list.length; i++) {
      setHighlightIdx(i);
      const nextAddr = i === list.length - 1 ? 'NULL' : list[i + 1].memAddress;
      setExplanation(`Dereferencing node pointer. Visiting Node at address ${list[i].memAddress} with value ${list[i].val}. Next pointer resolves to: ${nextAddr}`);
      await new Promise(resolve => setTimeout(resolve, 1400));
    }
    
    setHighlightIdx(null);
    setIsTraversing(false);
    setExplanation('Reached terminal pointer (visited address resolves to NULL). Traversal completed successfully.');
  };

  return (
    <div className="flex flex-col gap-6 w-full items-center p-2">
      
      {/* Visual Arena */}
      <div className="flex items-center justify-center p-8 min-h-[220px] rounded-2xl border border-border bg-card w-full overflow-x-auto visualizer-arena">
        <div className="flex items-center gap-2 py-4 min-w-max">
          {list.length === 0 ? (
            <div className="text-xs font-mono font-black text-muted-foreground bg-background/50 px-4 py-2.5 rounded-xl border border-border border-dashed shadow-sm">
              [EMPTY LIST] &rarr; NULL
            </div>
          ) : (
            <>
              {/* Head pointer annotation */}
              <div className="flex flex-col items-center mr-2 select-none">
                <span className="text-[9px] font-black text-accent uppercase tracking-widest mb-1.5 animate-pulse">Head</span>
                <div className="w-1.5 h-8 bg-gradient-to-b from-accent to-accent/10 rounded-full shadow-[0_0_10px_rgba(0,242,255,0.4)]" />
                <span className="text-[9px] font-mono text-muted-foreground mt-1">{list[0].memAddress}</span>
              </div>

              {list.map((node, idx) => {
                const isHighlighted = highlightIdx === idx;
                const nodeColor = isHighlighted
                  ? 'border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(0,242,255,0.15)] scale-[1.03] ring-1 ring-accent/30'
                  : 'border-border bg-card/45 text-foreground';

                const nextNode = list[idx + 1];
                const nextAddrText = nextNode ? nextNode.memAddress : 'NULL';

                return (
                  <React.Fragment key={node.id}>
                    {/* CS Textbook node block */}
                    <div className="flex flex-col items-center group transition-all duration-300">
                      {/* Memory Address Tag */}
                      <span className="memory-address mb-1 select-none font-semibold">
                        {node.memAddress}
                      </span>
                      
                      {/* Partitioned Node Cell */}
                      <div className={`relative flex flex-col rounded-xl border transition-all duration-300 w-24 overflow-hidden hover:border-primary/45 ${nodeColor}`}>
                        {/* Data cell */}
                        <div className="flex-1 flex flex-col items-center justify-center py-2 bg-background/30 font-bold border-b border-border/40">
                          <span className="text-[7.5px] font-black uppercase tracking-wider text-muted-foreground/60 leading-none mb-1 select-none">data</span>
                          <span className="font-mono text-xs leading-none font-black">{node.val}</span>
                        </div>
                        {/* Next Pointer Address cell */}
                        <div className="flex flex-col items-center justify-center py-1.5 bg-muted/20 font-mono text-[7px] text-muted-foreground/80 select-none">
                          <span className="text-[6.5px] text-muted-foreground/45 uppercase tracking-wide leading-none mb-0.5">next</span>
                          <span className={`font-extrabold mt-0.5 leading-none text-[8.5px] ${nextNode ? 'text-accent' : 'text-muted-foreground/50'}`}>
                            {nextAddrText}
                          </span>
                        </div>
                      </div>
                      <span className="text-[8px] font-mono font-black text-muted-foreground/45 mt-1.5">[{idx}]</span>
                    </div>

                    {/* Connecting Curved Bezier Pointer Arrow */}
                    {idx < list.length - 1 && (
                      <div className="flex items-center shrink-0 w-12 h-12">
                        <svg className="w-12 h-12 overflow-visible" viewBox="0 0 48 48">
                          <path
                            d="M 0,24 C 16,10 32,10 48,24"
                            fill="none"
                            stroke={isHighlighted ? 'var(--accent)' : 'var(--border)'}
                            strokeWidth={isHighlighted ? 3 : 2}
                            className={`bezier-link transition-all duration-300 ${isHighlighted ? 'bezier-link-active' : ''} ${
                              isTraversing && isHighlighted ? 'svg-connection' : ''
                            }`}
                          />
                          {/* Arrow Head */}
                          <path
                            d="M 41,20 L 48,24 L 41,28"
                            fill="none"
                            stroke={isHighlighted ? 'var(--accent)' : 'var(--border)'}
                            strokeWidth={isHighlighted ? 3 : 2}
                            className="transition-all duration-300"
                          />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Tail Arrow to NULL */}
              <div className="flex items-center shrink-0 w-12 h-12">
                <svg className="w-12 h-12 overflow-visible" viewBox="0 0 48 48">
                  <path
                    d="M 0,24 C 16,10 32,10 48,24"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth={1.5}
                    className="bezier-link opacity-60"
                  />
                  <path
                    d="M 41,20 L 48,24 L 41,28"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth={1.5}
                    className="opacity-60"
                  />
                </svg>
              </div>
              <div className="font-mono text-[10px] font-black text-muted-foreground/60 bg-muted/40 px-3 py-1.5 rounded-xl border border-border select-none shadow-sm">
                NULL
              </div>
            </>
          )}
        </div>
      </div>

      {/* Narrative block */}
      <div className="p-4 rounded-xl border border-border/60 bg-primary/5 backdrop-blur-sm w-full text-xs font-semibold leading-relaxed text-foreground shadow-sm">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-1">State Explanation</span>
        {explanation}
      </div>

      {/* Control panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full p-4 rounded-2xl border border-border bg-card shadow-sm">
        {/* Operations input */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Node Data Input</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-xl bg-background/50 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 w-20 font-mono font-bold"
              placeholder="Val"
              disabled={isTraversing}
            />
            <button
              onClick={handleInsertHead}
              disabled={isTraversing}
              className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-md"
            >
              <PlusCircle className="h-4 w-4" /> Insert Head
            </button>
            <button
              onClick={handleAppendTail}
              disabled={isTraversing}
              className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl border border-border hover:bg-muted disabled:opacity-50 text-foreground transition-all cursor-pointer shadow-sm"
            >
              <PlusCircle className="h-4 w-4" /> Append Tail
            </button>
          </div>
        </div>

        {/* Action triggers */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Traversal & Mutation</label>
          <div className="flex gap-2 flex-wrap items-center">
            <button
              onClick={runTraversal}
              disabled={isTraversing || list.length === 0}
              className="flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-xl bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-md"
            >
              <Zap className="h-4 w-4" /> Traverse Pointer Chain
            </button>

            {/* Quick delete values */}
            {list.length > 0 && (
              <div className="flex items-center gap-1 bg-muted/40 px-2.5 py-1 rounded-xl border border-border/80 shadow-inner">
                <span className="text-[8px] font-black text-muted-foreground uppercase mr-1.5 tracking-wider">Delete Node:</span>
                <div className="flex gap-1">
                  {Array.from(new Set(list.map(n => n.val))).slice(0, 3).map(val => (
                    <button
                      key={val}
                      onClick={() => handleDelete(val)}
                      disabled={isTraversing}
                      className="px-2 py-0.5 text-[8px] font-mono font-black bg-card border border-border hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg transition-all duration-200 cursor-pointer"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
