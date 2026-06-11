"use client";

import dynamic from "next/dynamic";

// Dynamically load the heavy R3F canvas with SSR disabled.
// Three.js and React Three Fiber require browser APIs (WebGL, canvas, window)
// that do not exist in Node.js, so we must skip server-side rendering entirely.
const BackgroundCanvasClient = dynamic(
  () =>
    import("@/components/canvas/BackgroundCanvas").then(
      (mod) => mod.BackgroundCanvas
    ),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 w-full h-full bg-brand-bg z-0" />
    ),
  }
);

export default BackgroundCanvasClient;
