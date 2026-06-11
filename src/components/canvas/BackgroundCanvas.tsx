"use client";

import React, { useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";

export const BackgroundCanvas: React.FC = () => {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-brand-bg">
      <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          className="w-full h-full opacity-60"
        >
          <Scene mouse={mouse} />
        </Canvas>
      </Suspense>
    </div>
  );
};
