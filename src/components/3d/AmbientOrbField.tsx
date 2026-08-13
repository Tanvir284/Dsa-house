'use client';

import { Float, MeshDistortMaterial } from '@react-three/drei';
import Scene3D from './Scene3D';
import { useThemeAccent } from './useThemeAccent';

interface AmbientOrbFieldProps {
  className?: string;
  /** Fewer/simpler orbs for tighter spaces (auth cards, page headers). */
  compact?: boolean;
}

/** Soft, slowly-drifting distorted spheres — an ambient WebGL backdrop that
 * echoes the existing CSS mesh-bg blobs, for hero sections and page headers. */
export default function AmbientOrbField({ className = 'absolute inset-0 -z-10', compact = false }: AmbientOrbFieldProps) {
  const accent = useThemeAccent();
  const orbs = compact
    ? [{ pos: [2.6, 1.2, -4.5] as const, scale: 1, color: accent.from, speed: 1.1 }]
    : [
        { pos: [-2.4, 0.8, -1] as const, scale: 1.9, color: accent.from, speed: 0.9 },
        { pos: [2.2, -0.6, -2.5] as const, scale: 1.4, color: accent.to, speed: 1.3 },
        { pos: [0.4, 1.6, -3.5] as const, scale: 1.1, color: accent.from, speed: 1.6 },
      ];

  return (
    <Scene3D className={className} camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={40} color={accent.from} />
      <pointLight position={[-4, -2, 2]} intensity={30} color={accent.to} />
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.4} floatIntensity={1.1}>
          <mesh position={orb.pos} scale={orb.scale}>
            <icosahedronGeometry args={[1, 4]} />
            <MeshDistortMaterial
              color={orb.color}
              distort={0.35}
              speed={1.4}
              roughness={0.15}
              metalness={0.1}
              transparent
              opacity={0.32}
            />
          </mesh>
        </Float>
      ))}
    </Scene3D>
  );
}
