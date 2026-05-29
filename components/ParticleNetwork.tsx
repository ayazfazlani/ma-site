// components/ParticleNetwork.tsx
"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

function Particles({ isDark, count }: { isDark: boolean; count: number }) {
  const mesh = useRef<THREE.Points>(null);
  const linesMesh = useRef<THREE.LineSegments>(null);

  const connectionDistance = count > 50 ? 2.8 : 3.2;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Slower velocity on mobile to save CPU
      const speed = count > 50 ? 0.008 : 0.005;
      vel[i * 3] = (Math.random() - 0.5) * speed;
      vel[i * 3 + 1] = (Math.random() - 0.5) * speed;
      vel[i * 3 + 2] = (Math.random() - 0.5) * (speed / 2);
    }

    return [pos, vel];
  }, [count]);

  const linePositions = useMemo(() => new Float32Array(count * count * 6), [count]);
  const lineColors = useMemo(() => new Float32Array(count * count * 6), [count]);

  // Frame throttle for mobile: run every other frame
  const frameCount = useRef(0);

  useFrame(() => {
    if (!mesh.current || !linesMesh.current) return;

    frameCount.current++;
    // Skip every other frame on low particle-count (mobile) to save GPU
    if (count <= 40 && frameCount.current % 2 !== 0) return;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const linePos = linesMesh.current.geometry.attributes.position.array as Float32Array;
    const lineCol = linesMesh.current.geometry.attributes.color.array as Float32Array;

    let lineIndex = 0;

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(positions[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;

      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * (isDark ? 0.6 : 0.4);

          linePos[lineIndex * 6] = positions[i * 3];
          linePos[lineIndex * 6 + 1] = positions[i * 3 + 1];
          linePos[lineIndex * 6 + 2] = positions[i * 3 + 2];
          linePos[lineIndex * 6 + 3] = positions[j * 3];
          linePos[lineIndex * 6 + 4] = positions[j * 3 + 1];
          linePos[lineIndex * 6 + 5] = positions[j * 3 + 2];

          if (isDark) {
            lineCol[lineIndex * 6] = 0.31 * alpha;
            lineCol[lineIndex * 6 + 1] = 0.25 * alpha;
            lineCol[lineIndex * 6 + 2] = 0.95 * alpha;
            lineCol[lineIndex * 6 + 3] = 0.13 * alpha;
            lineCol[lineIndex * 6 + 4] = 0.83 * alpha;
            lineCol[lineIndex * 6 + 5] = 0.93 * alpha;
          } else {
            lineCol[lineIndex * 6] = 0.3 * alpha;
            lineCol[lineIndex * 6 + 1] = 0.3 * alpha;
            lineCol[lineIndex * 6 + 2] = 0.8 * alpha;
            lineCol[lineIndex * 6 + 3] = 0.1 * alpha;
            lineCol[lineIndex * 6 + 4] = 0.6 * alpha;
            lineCol[lineIndex * 6 + 5] = 0.7 * alpha;
          }

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
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={isDark ? "#818cf8" : "#4f46e5"}
          transparent
          opacity={isDark ? 0.6 : 0.4}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesMesh}>
        <bufferGeometry>
          {/* @ts-expect-error - React Three Fiber type issues with bufferAttribute args */}
          <bufferAttribute
            attach="attributes-position"
            count={count * count * 2}
            array={linePositions}
            itemSize={3}
          />
          {/* @ts-expect-error - React Three Fiber type issues with bufferAttribute args */}
          <bufferAttribute
            attach="attributes-color"
            count={count * count * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={isDark ? 0.25 : 0.4}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </lineSegments>
    </>
  );
}

export default function ParticleNetwork() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Detect screen size to tune performance
  const [particleCount, setParticleCount] = useState(80);
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);

  useEffect(() => {
    const updateForScreen = () => {
      const w = window.innerWidth;
      const isMobile = w < 768;
      const isTablet = w < 1024;

      if (isMobile) {
        setParticleCount(30);
        setDpr([1, 1]);       // Cap at 1x DPR on mobile
      } else if (isTablet) {
        setParticleCount(50);
        setDpr([1, 1.5]);
      } else {
        setParticleCount(80);
        setDpr([1, 2]);
      }
    };

    updateForScreen();
    window.addEventListener("resize", updateForScreen);
    return () => window.removeEventListener("resize", updateForScreen);
  }, []);

  return (
    <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? "bg-dark-950" : "bg-white"}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={dpr}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        frameloop="always"
      >
        <ambientLight intensity={isDark ? 0.3 : 1} />
        <Particles isDark={isDark} count={particleCount} />
      </Canvas>
    </div>
  );
}
