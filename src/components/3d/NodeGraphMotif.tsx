/**
 * The app's signature motif: an abstract cluster of connected nodes.
 *
 * Replaces the former WebGL version for the reasons given in
 * `AmbientOrbField`. Inline SVG suits this better than a 3D canvas did — a
 * graph is a 2D object, it renders during SSR, it scales without aliasing, and
 * it inherits theme colours directly from CSS custom properties instead of
 * needing a hook to read them back out of the DOM.
 */

/** Node positions in a 0–100 viewBox, arranged as a small connected graph. */
const NODES: Array<{ x: number; y: number; r: number }> = [
  { x: 50, y: 18, r: 3.4 },
  { x: 22, y: 38, r: 2.6 },
  { x: 78, y: 34, r: 2.9 },
  { x: 30, y: 72, r: 2.4 },
  { x: 70, y: 76, r: 3.1 },
  { x: 52, y: 52, r: 2.2 },
];

const EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [1, 5],
  [2, 5],
  [3, 4],
  [5, 4],
];

interface NodeGraphMotifProps {
  className?: string;
}

export default function NodeGraphMotif({
  className = 'absolute inset-0 -z-10',
}: NodeGraphMotifProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        className="node-motif h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="node-motif-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-from)" />
            <stop offset="100%" stopColor="var(--accent-to)" />
          </linearGradient>
          <radialGradient id="node-motif-fill">
            <stop offset="0%" stopColor="var(--accent-from)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent-to)" stopOpacity="0.35" />
          </radialGradient>
        </defs>

        <g className="node-motif-rotor">
          {EDGES.map(([from, to]) => (
            <line
              key={`${from}-${to}`}
              x1={NODES[from].x}
              y1={NODES[from].y}
              x2={NODES[to].x}
              y2={NODES[to].y}
              stroke="url(#node-motif-stroke)"
              strokeWidth="0.5"
              strokeOpacity="0.55"
            />
          ))}

          {NODES.map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="url(#node-motif-fill)"
              className="node-motif-node"
              // Staggered so the cluster pulses organically rather than in unison.
              style={{ animationDelay: `${i * 0.45}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
