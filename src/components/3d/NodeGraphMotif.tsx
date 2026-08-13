'use client';

import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import Scene3D from './Scene3D';
import { useThemeAccent } from './useThemeAccent';

// A small abstract graph — nodes + edges, echoing the data-structures theme.
const NODES: [number, number, number][] = [
  [0, 1.2, 0],
  [-1.6, 0.2, 0.6],
  [1.7, 0.4, -0.4],
  [-1, -1.2, -0.6],
  [1.1, -1.1, 0.4],
  [0.1, -0.2, 1.2],
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 5],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [1, 5],
];

function RotatingGraph({ colorA, colorB }: { colorA: string; colorB: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group} position={[1.6, 0.2, -1.5]} scale={0.62}>
      {EDGES.map(([a, b], i) => (
        <Line
          key={i}
          points={[NODES[a], NODES[b]]}
          color={colorA}
          transparent
          opacity={0.22}
          lineWidth={1}
        />
      ))}
      {NODES.map((pos, i) => (
        <mesh key={i} position={pos} scale={i % 2 === 0 ? 0.14 : 0.1}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? colorA : colorB}
            emissive={i % 2 === 0 ? colorA : colorB}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

interface NodeGraphMotifProps {
  className?: string;
}

/** Abstract, slowly-rotating cluster of connected nodes — the app's signature
 * 3D motif, used on the homepage hero and auth pages. */
export default function NodeGraphMotif({ className = 'absolute inset-0 -z-10' }: NodeGraphMotifProps) {
  const accent = useThemeAccent();
  const colors = useMemo(() => accent, [accent]);

  return (
    <Scene3D className={className} camera={{ position: [0, 0, 7], fov: 38 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 3]} intensity={30} color={colors.from} />
      <pointLight position={[-3, -2, 2]} intensity={20} color={colors.to} />
      <RotatingGraph colorA={colors.from} colorB={colors.to} />
    </Scene3D>
  );
}
