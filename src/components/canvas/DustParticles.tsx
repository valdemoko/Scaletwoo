"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const DustParticles: React.FC = () => {
  const count = 250;
  const meshRef = useRef<THREE.Points>(null);

  // Generate particle positions and velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread particles in a 3D box: X [-15, 15], Y [-10, 10], Z [-15, 5]
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = Math.random() * -20; // in front of the camera

      // Tiny velocities for drifting
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = Math.random() * 0.006 + 0.002; // drift upward
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [pos, vel];
  }, []);

  // Programmatically create a glowing soft dot texture (no external file needed!)
  const dotTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 220, 150, 1)");
      gradient.addColorStop(0.2, "rgba(255, 200, 100, 0.5)");
      gradient.addColorStop(1, "rgba(255, 200, 100, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Animate the particles
  useFrame((state) => {
    if (!meshRef.current) return;

    const geo = meshRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Add gentle horizontal sinus wave motion
      posArr[idx] += velocities[idx] + Math.sin(time + i) * 0.001;
      // Drift upwards
      posArr[idx + 1] += velocities[idx + 1];
      posArr[idx + 2] += velocities[idx + 2];

      // Wrap-around bounds checks
      if (posArr[idx + 1] > 10) {
        posArr[idx + 1] = -10; // Reset to bottom
        posArr[idx] = (Math.random() - 0.5) * 30; // Randomize X
      }
      if (posArr[idx] > 15 || posArr[idx] < -15) {
        velocities[idx] = -velocities[idx]; // bounce X
      }
      if (posArr[idx + 2] > 0 || posArr[idx + 2] < -25) {
        velocities[idx + 2] = -velocities[idx + 2]; // bounce Z
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        map={dotTexture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.35}
      />
    </points>
  );
};
