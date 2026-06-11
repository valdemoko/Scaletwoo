"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DustParticles } from "./DustParticles";

interface SceneProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export const Scene: React.FC<SceneProps> = ({ mouse }) => {
  const { viewport } = useThree();
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const backWallRef = useRef<THREE.Mesh>(null);
  const leftWallRef = useRef<THREE.Mesh>(null);
  const rightWallRef = useRef<THREE.Mesh>(null);

  // Generate procedural Backrooms wallpaper texture as a fallback/default
  const wallTexture = useMemo(() => {
    // Check if we are running in browser context
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Classic dirty yellow backrooms wallpaper background
      ctx.fillStyle = "#8c7943"; // Amber-brown
      ctx.fillRect(0, 0, 512, 512);

      // Add vertical stripes pattern
      ctx.strokeStyle = "#716132";
      ctx.lineWidth = 2;
      for (let i = 0; i < 512; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
      }

      // Add subtle cross-hatching/grunge noise
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      for (let i = 0; i < 10000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 1.5 + 0.5;
        ctx.fillRect(x, y, size, size);
      }

      // Add horizontal dirt streaks
      ctx.strokeStyle = "rgba(45, 39, 20, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * 512);
        ctx.lineTo(512, Math.random() * 512);
        ctx.stroke();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
  }, []);

  // Frame animations: sweep spotlight target toward mouse position
  useFrame((state) => {
    // Spotlight smooth damping
    if (spotlightRef.current) {
      // Calculate target point in 3D based on normalized mouse coords
      const targetX = mouse.current.x * (viewport.width / 2);
      const targetY = mouse.current.y * (viewport.height / 2);

      // Damp the target position
      spotlightRef.current.target.position.x = THREE.MathUtils.lerp(
        spotlightRef.current.target.position.x,
        targetX,
        0.08
      );
      spotlightRef.current.target.position.y = THREE.MathUtils.lerp(
        spotlightRef.current.target.position.y,
        targetY,
        0.08
      );
      spotlightRef.current.target.position.z = -8; // Fixed distance depth

      // Gentle camera panning parallax
      state.camera.position.x = THREE.MathUtils.lerp(
        state.camera.position.x,
        mouse.current.x * 0.4,
        0.03
      );
      state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y,
        mouse.current.y * 0.3,
        0.03
      );
      
      // Look slightly toward the spotlight target
      state.camera.lookAt(0, 0, -10);
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.03} color="#ffe090" />
      
      {/* Flashlight spotlight representing player inspection */}
      <spotLight
        ref={spotlightRef}
        position={[0, 0.5, 4]} // Slightly elevated to simulate eye-level flashlight
        angle={Math.PI / 6.5} // Narrow cinematic cone
        penumbra={0.9} // Soft edges
        intensity={3.2}
        color="#ffcc66"
        distance={22}
        castShadow
      />
      
      {/* Add spotlight target to scene */}
      {spotlightRef.current && (
        <primitive object={spotlightRef.current.target} />
      )}

      {/* Corridor Geometry with Procedural Wall Texture */}
      <group>
        {/* Back Wall */}
        <mesh ref={backWallRef} position={[0, 0, -12]} receiveShadow>
          <planeGeometry args={[35, 20]} />
          <meshStandardMaterial
            map={wallTexture}
            roughness={0.95}
            metalness={0.05}
            color="#5e512d"
          />
        </mesh>

        {/* Left Wall */}
        <mesh ref={leftWallRef} position={[-8, 0, -5]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[25, 20]} />
          <meshStandardMaterial
            map={wallTexture}
            roughness={0.95}
            metalness={0.05}
            color="#4f4426"
          />
        </mesh>

        {/* Right Wall */}
        <mesh ref={rightWallRef} position={[8, 0, -5]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[25, 20]} />
          <meshStandardMaterial
            map={wallTexture}
            roughness={0.95}
            metalness={0.05}
            color="#4f4426"
          />
        </mesh>

        {/* Floor */}
        <mesh position={[0, -4.5, -5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 25]} />
          <meshStandardMaterial
            color="#12110e" // Dark dirty floor/carpet
            roughness={0.9}
          />
        </mesh>

        {/* Ceiling */}
        <mesh position={[0, 4.5, -5]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 25]} />
          <meshStandardMaterial
            color="#171511"
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* Floating Dust Particles */}
      <DustParticles />
    </>
  );
};
