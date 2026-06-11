"use client";

import React, { useEffect, useRef } from "react";

const layers = [
  { id: "far", speed: 0.12, bg: "radial-gradient(circle at 20% 10%, rgba(196,146,0,0.04), transparent 18%)" },
  { id: "mid", speed: 0.24, bg: "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.15))" },
  { id: "near", speed: 0.45, bg: "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.35))" },
];

export default function ParallaxLayers() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({ lastScroll: 0, mouseX: 0, mouseY: 0, raf: 0 });

  useEffect(() => {
    const onScroll = () => {
      stateRef.current.lastScroll = window.scrollY || window.pageYOffset;
    };

    const onPointer = (e: PointerEvent) => {
      stateRef.current.mouseX = e.clientX;
      stateRef.current.mouseY = e.clientY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer);

    const tick = () => {
      const c = containerRef.current;
      if (c) {
        const { lastScroll, mouseX, mouseY } = stateRef.current;
        const w = window.innerWidth;
        const h = window.innerHeight;

        layers.forEach((layer) => {
          const el = c.querySelector<HTMLDivElement>(`#parallax-${layer.id}`);
          if (!el) return;
          const depth = layer.speed;
          const y = -lastScroll * depth;
          const mx = (mouseX - w / 2) * (depth * 0.02);
          const my = (mouseY - h / 2) * (depth * 0.02);
          el.style.transform = `translate3d(${mx}px, ${y + my}px, 0)`;
        });
      }
      stateRef.current.raf = requestAnimationFrame(tick);
    };

    stateRef.current.raf = requestAnimationFrame(tick);
    const rafHandle = stateRef.current.raf;

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(rafHandle);
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden className="pointer-events-none absolute inset-0 -z-20">
      {layers.map((l) => (
        <div
          key={l.id}
          id={`parallax-${l.id}`}
          style={{ background: l.bg }}
          className={`absolute inset-0 transform will-change-transform parallax-layer parallax-${l.id}`}
        />
      ))}
    </div>
  );
}
