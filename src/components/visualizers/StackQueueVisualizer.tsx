'use client';

import React, { useState } from 'react';
import { ArrowDown, PlusCircle, Trash2, Zap, ArrowRight } from 'lucide-react';

interface StackQueueVisualizerProps {
  initialMode?: 'stack' | 'queue';
}

export default function StackQueueVisualizer({ initialMode = 'stack' }: StackQueueVisualizerProps) {
  const [mode, setMode] = useState<'stack' | 'queue'>(initialMode);
  const [stack, setStack] = useState<number[]>([42, 17, 89]);
  const [queue, setQueue] = useState<number[]>([12, 56, 34]);
  const [inputValue, setInputValue] = useState<string>('99');
  const [lastAction, setLastAction] = useState<string>('Workspace initialized. Push elements into stack or enqueue in queue.');
  const [peeked, setPeeked] = useState<boolean>(false);

  // Stack Actions
  const handlePush = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) return;
    if (stack.length >= 5) {
      setLastAction("Stack is full! (Overflow protection at size 5).");
      return;
    }
    setStack([...stack, num]);
    setPeeked(false);
    setLastAction(`PUSH operation: Added ${num} onto the Stack. Pushed element enters the TOP index.`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setLastAction("POP operation failed! The stack is empty (Underflow).");
      return;
    }
    const popped = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setPeeked(false);
    setLastAction(`POP operation: Removed TOP element ${popped} from the Stack.`);
  };

  const handlePeekStack = () => {
    if (stack.length === 0) {
      setLastAction("PEEK failed. Stack is empty.");
      return;
    }
    const val = stack[stack.length - 1];
    setPeeked(true);
    setLastAction(`PEEK operation: Inspected TOP element, which is ${val}. Stack remains unmodified.`);
  };

  // Queue Actions
  const handleEnqueue = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) return;
    if (queue.length >= 6) {
      setLastAction("Queue is full! (Overflow protection at size 6).");
      return;
    }
    setQueue([...queue, num]);
    setPeeked(false);
    setLastAction(`ENQUEUE operation: Appended ${num} into the Queue. Enters at the REAR pointer.`);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setLastAction("DEQUEUE operation failed! The queue is empty (Underflow).");
      return;
    }
    const dequeued = queue[0];
    setQueue(queue.slice(1));
    setPeeked(false);
    setLastAction(`DEQUEUE operation: Dispatched FRONT element ${dequeued} from the Queue. Shifts remaining elements left.`);
  };

  const handlePeekQueue = () => {
    if (queue.length === 0) {
      setLastAction("PEEK failed. Queue is empty.");
      return;
    }
    const val = queue[0];
    setPeeked(true);
    setLastAction(`PEEK operation: Inspected FRONT element, which is ${val}. Queue remains unmodified.`);
  };

  const handleClear = () => {
    if (mode === 'stack') {
      setStack([]);
      setLastAction("Stack cleared.");
    } else {
      setQueue([]);
      setLastAction("Queue cleared.");
    }
    setPeeked(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full items-center p-2">
      {/* Mode Selector Tab */}
      <div className="flex bg-muted/60 p-1 rounded-xl border border-border/80 shadow-inner select-none">
        <button
          onClick={() => { setMode('stack'); setPeeked(false); }}
          className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all duration-200 cursor-pointer ${
            mode === 'stack'
              ? 'bg-card text-foreground shadow border border-border/60'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Stack Mode (LIFO)
        </button>
        <button
          onClick={() => { setMode('queue'); setPeeked(false); }}
          className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all duration-200 cursor-pointer ${
            mode === 'queue'
              ? 'bg-card text-foreground shadow border border-border/60'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Queue Mode (FIFO)
        </button>
      </div>

      {/* Visual Arena */}
      <div className="flex items-center justify-center p-8 min-h-[340px] rounded-2xl border border-border bg-card w-full overflow-x-auto visualizer-arena">
        {mode === 'stack' ? (
          /* Stack Visualization: 3D Glass Cup */
          <div className="flex flex-col items-center justify-end h-72 w-72 relative pb-2 select-none">
            
            {/* Top open bracket labels */}
            <div className="absolute top-2 text-[8px] font-black tracking-widest text-muted-foreground/60 uppercase">
              Stack Entry (LIFO Open Top)
            </div>

            {/* 3D Glass Cup Vessel Container */}
            <div className="border-x-4 border-b-8 border-primary/25 rounded-b-3xl flex flex-col-reverse justify-start gap-3 p-4 w-44 h-[220px] bg-gradient-to-b from-card/80 to-muted/60 backdrop-blur-md shadow-md relative">
              
              {stack.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-black text-muted-foreground/45 pointer-events-none select-none">
                  [EMPTY STACK]
                </div>
              ) : (
                stack.map((val, idx) => {
                  const isTop = idx === stack.length - 1;
                  const isPeeked = peeked && isTop;
                  let borderStyle = 'border-border bg-card/40 text-foreground';
                  if (isPeeked) {
                    borderStyle = 'border-accent bg-accent/25 text-accent font-black ring-2 ring-accent/30 shadow-[0_0_15px_rgba(0,242,255,0.3)]';
                  } else if (isTop) {
                    borderStyle = 'border-primary bg-primary/20 text-primary font-extrabold shadow-[0_0_10px_rgba(99,102,241,0.2)]';
                  }

                  return (
                    <div
                      key={`stack-${idx}-${val}`}
                      className={`h-10 w-full border rounded-xl flex items-center justify-center font-mono text-xs shadow-sm transition-all duration-300 transform translate-y-0 scale-100 hover:scale-[1.03] relative ${borderStyle}`}
                    >
                      {val}
                      
                      {/* Top pointer arrow */}
                      {isTop && (
                        <span className="absolute -left-16 flex items-center gap-1 text-[8px] font-black text-primary tracking-widest uppercase">
                          TOP <ArrowDown className="h-3 w-3 animate-bounce text-primary" />
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          /* Queue Visualization: Conveyor Belt */
          <div className="flex flex-col items-center justify-center w-full min-w-[500px] relative select-none py-6">
            
            {/* Belt lines */}
            <div className="absolute left-6 right-6 h-5 border-y-2 border-dashed border-border/60 bg-muted/10 -z-10 top-1/2 -translate-y-4" />
            
            {/* Conveyor items grid */}
            <div className="flex items-center justify-between w-full px-8 relative">
              
              {/* Entry Gate (Rear) */}
              <div className="flex flex-col items-center gap-1.5 border border-dashed border-complete/35 bg-complete/5 p-2 rounded-xl">
                <span className="text-[7.5px] font-black text-complete tracking-wider uppercase leading-none">INLET GATE</span>
                <ArrowRight className="h-4 w-4 text-complete animate-pulse" />
              </div>

              {/* Elements Queue container */}
              <div className="flex items-center gap-4 flex-1 justify-center px-4">
                {queue.length === 0 ? (
                  <span className="text-xs font-mono font-black text-muted-foreground/50">[EMPTY QUEUE CONVEYOR]</span>
                ) : (
                  queue.map((val, idx) => {
                    const isFront = idx === 0;
                    const isRear = idx === queue.length - 1;
                    const isPeeked = peeked && isFront;

                    let borderStyle = 'border-border bg-card/45';
                    if (isPeeked) {
                      borderStyle = 'border-accent bg-accent/25 text-accent font-black ring-2 ring-accent/30 shadow-[0_0_15px_rgba(0,242,255,0.25)]';
                    } else if (isFront) {
                      borderStyle = 'border-primary bg-primary/20 text-primary font-extrabold shadow-[0_0_10px_rgba(99,102,241,0.2)]';
                    } else if (isRear) {
                      borderStyle = 'border-complete bg-complete/20 text-complete font-extrabold shadow-[0_0_10px_rgba(16,185,129,0.2)]';
                    }

                    return (
                      <div key={`queue-${idx}-${val}`} className="flex flex-col items-center w-14 group relative">
                        {/* Roller wheel spinner simulator below block */}
                        <div className="absolute -top-6 text-[8px] font-mono text-muted-foreground/35 select-none font-bold">
                          [{idx}]
                        </div>

                        {/* Node block */}
                        <div
                          className={`w-12 h-12 border rounded-xl flex items-center justify-center font-mono text-xs shadow-sm transition-all duration-300 hover:scale-105 ${borderStyle}`}
                        >
                          {val}
                        </div>

                        {/* Conveyor roller wheel beneath item */}
                        <div className="w-4 h-4 rounded-full border border-border/80 bg-background/50 flex items-center justify-center mt-2.5 animate-spin duration-1000">
                          <span className="w-1 h-2 bg-muted-foreground/30 rounded-full" />
                        </div>
                        
                        {/* Queue pointer labels underneath rollers */}
                        <div className="min-h-[30px] mt-2 flex flex-col gap-0.5 items-center w-full">
                          {isFront && (
                            <span className="text-[7px] font-black px-1.5 py-0.5 rounded border border-primary/20 bg-primary/10 text-primary uppercase tracking-widest">
                              Front
                            </span>
                          )}
                          {isRear && (
                            <span className="text-[7px] font-black px-1.5 py-0.5 rounded border border-complete/20 bg-complete/10 text-complete uppercase tracking-widest">
                              Rear
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Exit Gate (Front) */}
              <div className="flex flex-col items-center gap-1.5 border border-dashed border-primary/35 bg-primary/5 p-2 rounded-xl">
                <span className="text-[7.5px] font-black text-primary tracking-wider uppercase leading-none">OUTLET GATE</span>
                <ArrowRight className="h-4 w-4 text-primary animate-pulse" />
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Action History Banner */}
      <div className="p-4 rounded-xl border border-border/60 bg-primary/5 backdrop-blur-sm w-full text-xs font-semibold leading-relaxed text-foreground shadow-sm">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-1">State Log</span>
        {lastAction}
      </div>

      {/* Control panel */}
      <div className="flex gap-5 w-full p-4 rounded-2xl border border-border bg-card shadow-sm items-end justify-between flex-wrap">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Input Data Field</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="px-3 py-1.5 border border-border rounded-xl bg-background/50 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 w-20 font-mono font-bold"
              placeholder="Value"
            />
            {mode === 'stack' ? (
              <>
                <button
                  onClick={handlePush}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all cursor-pointer shadow-md"
                >
                  <PlusCircle className="h-4 w-4" /> Push (Top)
                </button>
                <button
                  onClick={handlePop}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl border border-border hover:bg-muted text-foreground transition-all cursor-pointer shadow-sm"
                >
                  <Trash2 className="h-4 w-4 text-rose-400" /> Pop (Top)
                </button>
                <button
                  onClick={handlePeekStack}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-all cursor-pointer shadow-md"
                >
                  <Zap className="h-4 w-4" /> Peek
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEnqueue}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all cursor-pointer shadow-md"
                >
                  <PlusCircle className="h-4 w-4" /> Enqueue (Rear)
                </button>
                <button
                  onClick={handleDequeue}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl border border-border hover:bg-muted text-foreground transition-all cursor-pointer shadow-sm"
                >
                  <Trash2 className="h-4 w-4 text-rose-400" /> Dequeue (Front)
                </button>
                <button
                  onClick={handlePeekQueue}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-all cursor-pointer shadow-md"
                >
                  <Zap className="h-4 w-4" /> Peek
                </button>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleClear}
          className="px-4 py-2 text-xs font-bold rounded-xl border border-border/80 hover:border-rose-500/50 hover:bg-rose-500/15 hover:text-rose-400 transition-all duration-200 cursor-pointer shadow-sm"
        >
          Clear Structure
        </button>
      </div>

    </div>
  );
}
