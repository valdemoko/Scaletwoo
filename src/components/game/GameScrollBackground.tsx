"use client";

import React, { useEffect, useState } from "react";

export const GameScrollBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const offsetY = scrollY * 0.35;
  const offsetX = scrollY * 0.08;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: "url('/background.webp')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: `${offsetX}px ${offsetY}px`,
        }}
      />
      <div className="absolute inset-0 bg-brand-bg/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/40 via-transparent to-brand-bg/90" />
    </div>
  );
};
