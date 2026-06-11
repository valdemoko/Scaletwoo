"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const DustParticles: React.FC = () => {
  // Increase count and variety for more realistic dust motes
  const count = 700;
  const meshRef = useRef<THREE.Points>(null);

  // Generate particle positions and velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread particles in a 3D box: X [-20,20], Y [-12,12], Z [-40,-2]
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = -2 - Math.random() * 38;

      // Velocities for gentle drifting with slight variance
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = Math.random() * 0.02 + 0.004; // upward drift
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;

      // Per-particle size variance placeholder for future tuning
      // and alpha variability is handled in the material.
    }

    return [pos, vel];
  }, []);

  // Create a soft circular texture for particles
  const dotTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const cx = 32;
      const cy = 32;
      const r = 30;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gradient.addColorStop(0, "rgba(255, 238, 200, 1)");
      gradient.addColorStop(0.35, "rgba(255, 220, 150, 0.6)");
      gradient.addColorStop(1, "rgba(255, 200, 100, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Animate the particles
  useFrame((state) => {
    if (!meshRef.current) return;

    const geo = meshRef.current.geometry as THREE.BufferGeometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Horizontal gentle oscillation and subtle forward/back motion for parallax
      posArr[idx] += velocities[idx] + Math.sin(time * 0.2 + i) * 0.002;
      // Upward drift with slight flicker
      posArr[idx + 1] += velocities[idx + 1] + Math.sin(time * 1.3 + i * 0.7) * 0.0005;
      // Z wobble to create depth variation
      posArr[idx + 2] += velocities[idx + 2] + Math.cos(time * 0.15 + i * 0.3) * 0.001;

      // Reset when out of bounds to keep continuous density
      if (posArr[idx + 1] > 14) {
        posArr[idx + 1] = -12;
        posArr[idx] = (Math.random() - 0.5) * 40;
        posArr[idx + 2] = -2 - Math.random() * 38;
      }
      if (posArr[idx] > 22 || posArr[idx] < -22) {
        velocities[idx] = -velocities[idx];
      }
      if (posArr[idx + 2] > -1 || posArr[idx + 2] < -45) {
        velocities[idx + 2] = -velocities[idx + 2];
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        map={dotTexture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};
