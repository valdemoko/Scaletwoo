"use client";

import React, { useEffect } from "react";

export default function CursorLight() {
  useEffect(() => {
    const root = document.documentElement;

    const onMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      root.style.setProperty("--cursor-x", `${x}px`);
      root.style.setProperty("--cursor-y", `${y}px`);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div aria-hidden className="cursor-light fixed inset-0 pointer-events-none" style={{ zIndex: 60, opacity: 0.9 }} />;
}
