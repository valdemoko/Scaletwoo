"use client";

import { useEffect } from "react";

export default function LenisProvider() {
  useEffect(() => {
    let rafId: number | null = null;
    let lenis: any = null;

    let mounted = true;

    const setup = async () => {
      try {
        const mod = await import("@studio-freight/lenis");
        const Lenis = (mod && (mod as any).default) || (mod && (mod as any).Lenis) || (mod as any);

        if (!mounted) return;

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          smoothTouch: true,
          direction: "vertical",
        });

        const onRaf = (time: number) => {
          if (!lenis) return;
          lenis.raf(time);
          // keep native scroll listeners in sync
          // (some libraries listen to 'scroll' events)
          // dispatch a passive scroll event for compatibility
          window.dispatchEvent(new Event("scroll"));
          rafId = requestAnimationFrame(onRaf);
        };

        rafId = requestAnimationFrame(onRaf);

        // Anchor handling: intercept same-page hash links and use lenis.scrollTo
        const onClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement | null;
          if (!target) return;
          const anchor = target.closest("a") as HTMLAnchorElement | null;
          if (!anchor) return;
          const href = anchor.getAttribute("href");
          if (!href) return;
          if (href.startsWith("#")) {
            const id = href.slice(1);
            const el = document.getElementById(id);
            if (el && lenis && typeof lenis.scrollTo === "function") {
              e.preventDefault();
              lenis.scrollTo(el, { offset: 0 });
            }
          }
        };

        document.addEventListener("click", onClick);

        // If page loaded with a hash, scroll to it after init
        if (window.location.hash) {
          const id = window.location.hash.slice(1);
          const el = document.getElementById(id);
          if (el && lenis && typeof lenis.scrollTo === "function") {
            // small delay to ensure layout
            setTimeout(() => lenis.scrollTo(el, { offset: 0 }), 80);
          }
        }

        // clean up
        return () => {
          document.removeEventListener("click", onClick);
          if (rafId) cancelAnimationFrame(rafId);
          if (lenis && typeof lenis.destroy === "function") lenis.destroy();
          lenis = null;
        };
      } catch (err) {
        // If import failed, silently ignore (user must install the package)
        // console.warn("Lenis not available:", err);
      }
    };

    const clean = setup();

    return () => {
      mounted = false;
      // ensure any cleanup from setup runs
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
