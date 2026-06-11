"use client";

import { useEffect, useRef } from "react";

export default function LenisProvider() {
  const cleanupRef = useRef<(() => void) | null>(null);

  type LenisConstructorType = new (options: {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    smoothTouch?: boolean;
    direction?: "vertical" | "horizontal";
    wheelMultiplier?: number;
  }) => {
    raf: (time: number) => void;
    scrollTo: (target: HTMLElement | string | number, options?: { offset?: number }) => void;
    destroy: () => void;
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      let LenisConstructor: LenisConstructorType | null = null;

      try {
        try {
          // prefer the new package name if available
          // use indirect import to avoid Next.js build-time resolution
          // which can fail if the package isn't installed locally
          // (new Function prevents static analysis of import()).
          // eslint-disable-next-line no-new-func
          LenisConstructor = (await (new Function('return import("lenis")')()))?.default ?? null;
        } catch {
          try {
            // try the older package name the same way
            // eslint-disable-next-line no-new-func
            LenisConstructor = (await (new Function('return import("@studio-freight/lenis")')()))?.default ?? null;
          } catch {
            // fallback to CDN ESM injection
            await new Promise<void>((resolve, reject) => {
              const win = window as unknown as { __Lenis?: LenisConstructorType };
              if (win.__Lenis) {
                resolve();
                return;
              }
              const script = document.createElement("script");
              script.type = "module";
              script.innerHTML = `import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis/+esm'; window.__Lenis = Lenis;`;
              script.onload = () => resolve();
              script.onerror = () => reject();
              document.head.appendChild(script);
            }).catch(() => {});

            const win = window as unknown as { __Lenis?: LenisConstructorType };
            LenisConstructor = win.__Lenis ?? null;
          }
        }

        if (!mounted || !LenisConstructor) {
          console.log("Lenis: constructor not found");
          return;
        }

        const lenis = new LenisConstructor({
          duration: 1.6,
          easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
          smooth: true,
          smoothTouch: true,
          direction: "vertical",
          wheelMultiplier: 1,
        });

        console.log("Lenis initialized:", { lenis });

        let rafId = 0;
        const onRaf = (time: number) => {
          lenis.raf(time);
          window.dispatchEvent(new Event("scroll"));
          rafId = requestAnimationFrame(onRaf);
        };
        rafId = requestAnimationFrame(onRaf);

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
            if (el && typeof lenis.scrollTo === "function") {
              e.preventDefault();
              lenis.scrollTo(el, { offset: 0 });
            }
          }
        };

        document.addEventListener("click", onClick);

        if (window.location.hash) {
          const id = window.location.hash.slice(1);
          const el = document.getElementById(id);
          if (el && typeof lenis.scrollTo === "function") {
            setTimeout(() => lenis.scrollTo(el, { offset: 0 }), 80);
          }
        }

        cleanupRef.current = () => {
          document.removeEventListener("click", onClick);
          cancelAnimationFrame(rafId);
          if (lenis && typeof lenis.destroy === "function") lenis.destroy();
        };
      } catch (err) {
        console.error("Lenis init error:", err);
      }
    })();

    return () => {
      mounted = false;
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return null;
}
