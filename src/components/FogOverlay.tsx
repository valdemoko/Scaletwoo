"use client";

import React from "react";

export default function FogOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="fog-layer absolute inset-0" />
      <div className="fog-movement absolute inset-0" />
    </div>
  );
}
