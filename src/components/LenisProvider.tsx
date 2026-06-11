"use client";

import { useEffect } from "react";

export default function LenisProvider() {
  useEffect(() => {
    let rafId: number | null = null;
    let lenis: any = null;

    let mounted = true;

    const setup = async () => {
      // helper to init lenis instance from Lenis constructor
      const initLenis = (LenisConstructor: any) => {
        if (!mounted) return null;
        try {
          const instance = new LenisConstructor({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: true,
            direction: "vertical",
          });

          const onRaf = (time: number) => {
            if (!instance) return;
            instance.raf(time);
            window.dispatchEvent(new Event("scroll"));
            rafId = requestAnimationFrame(onRaf);
          };

          rafId = requestAnimationFrame(onRaf);

          return instance;
        } catch (e) {
          return null;
        }
      };

      // Load Lenis from CDN via ESM module injection to avoid bundler resolving package at build.
      await new Promise<void>((resolve, reject) => {
        const existing = (window as any).__Lenis;
        if (existing) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.type = "module";
        // use jsDelivr ESM build; attach constructor to window.__Lenis
        script.innerHTML = `import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis/+esm'; window.__Lenis = Lenis;`;
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
      }).catch(() => {
        return;
      });

      const LenisFromWindow = (window as any).__Lenis;
      if (LenisFromWindow) {
        lenis = initLenis(LenisFromWindow);
      }

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
