// src/components/ParticleNetwork.tsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const mesh = useRef<THREE.Points>(null);
  const linesMesh = useRef<THREE.LineSegments>(null);

  const particleCount = 80;
  const connectionDistance = 2.8;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }

    return [pos, vel];
  }, []);

  const linePositions = useMemo(() => {
    return new Float32Array(particleCount * particleCount * 6);
  }, []);

  const lineColors = useMemo(() => {
    return new Float32Array(particleCount * particleCount * 6);
  }, []);

  useFrame(() => {
    if (!mesh.current || !linesMesh.current) return;

    const positions = mesh.current.geometry.attributes.position
      .array as Float32Array;
    const linePos = linesMesh.current.geometry.attributes.position
      .array as Float32Array;
    const lineCol = linesMesh.current.geometry.attributes.color
      .array as Float32Array;

    let lineIndex = 0;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(positions[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;

      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.6;

          linePos[lineIndex * 6] = positions[i * 3];
          linePos[lineIndex * 6 + 1] = positions[i * 3 + 1];
          linePos[lineIndex * 6 + 2] = positions[i * 3 + 2];
          linePos[lineIndex * 6 + 3] = positions[j * 3];
          linePos[lineIndex * 6 + 4] = positions[j * 3 + 1];
          linePos[lineIndex * 6 + 5] = positions[j * 3 + 2];

          // Indigo-to-cyan gradient matching the new brand colors
          lineCol[lineIndex * 6] = 0.31 * alpha;     // R (indigo 6366f1)
          lineCol[lineIndex * 6 + 1] = 0.25 * alpha; // G
          lineCol[lineIndex * 6 + 2] = 0.95 * alpha;  // B
          lineCol[lineIndex * 6 + 3] = 0.13 * alpha;  // R (cyan 22d3ee)
          lineCol[lineIndex * 6 + 4] = 0.83 * alpha; // G
          lineCol[lineIndex * 6 + 5] = 0.93 * alpha;  // B

          lineIndex++;
        }
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    linesMesh.current.geometry.attributes.position.needsUpdate = true;
    linesMesh.current.geometry.attributes.color.needsUpdate = true;
    linesMesh.current.geometry.setDrawRange(0, lineIndex * 2);
  });

  return (
    <>
      <points ref={mesh}>
        <bufferGeometry>
          {/* @ts-expect-error - React Three Fiber type issues with bufferAttribute args */}
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#818cf8"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesMesh}>
        <bufferGeometry>
          {/* @ts-expect-error - React Three Fiber type issues with bufferAttribute args */}
          <bufferAttribute
            attach="attributes-position"
            count={particleCount * particleCount * 2}
            array={linePositions}
            itemSize={3}
          />
          {/* @ts-expect-error - React Three Fiber type issues with bufferAttribute args */}
          <bufferAttribute
            attach="attributes-color"
            count={particleCount * particleCount * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

export default function ParticleNetwork() {
  return (
    <div className="absolute inset-0 bg-dark-950">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <Particles />
      </Canvas>
    </div>
  );
}