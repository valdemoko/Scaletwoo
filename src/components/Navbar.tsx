"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  locale?: "en" | "es";
}

export const Navbar: React.FC<NavbarProps> = ({ locale = "en" }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [activeKey, setActiveKey] = useState<string>("home");
  const [barStyle, setBarStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Nav links definition
  const navLinks =
    locale === "es"
      ? [
          { name: "Inicio", href: "/", id: "home" },
          { name: "Proyectos", href: "/#projects", id: "projects" },
          { name: "Nosotros", href: "/#about", id: "about" },
        ]
      : [
          { name: "Home", href: "/", id: "home" },
          { name: "Projects", href: "/#projects", id: "projects" },
          { name: "About", href: "/#about", id: "about" },
          { name: "Vision", href: "/#vision", id: "vision" },
        ];

  const navLinks =
    locale === "es"
      ? [
          { name: "Inicio", href: "/" },
          { name: "Proyectos", href: "/#projects" },
          { name: "Nosotros", href: "/#about" },
          // Visión link removed
        ]
      : [
          { name: "Home", href: "/" },
          { name: "Projects", href: "/#projects" },
          { name: "About", href: "/#about" },
          { name: "Vision", href: "/#vision" },
        ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Observe sections to update the active nav item while scrolling
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observed: Element[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry with largest intersectionRatio
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const id = visible[0].target.id;
          if (id) setActiveKey(id);
        } else {
          if (window.scrollY < 120) setActiveKey("home");
        }
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    });

    return () => {
      observed.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [navLinks]);

  // Update underline bar position when activeKey changes or on resize
  useEffect(() => {
    const updateBar = () => {
      if (!navRef.current) return;
      const anchor = document.getElementById(`nav-${activeKey}`) as HTMLElement | null;
      const container = navRef.current as HTMLElement;
      if (anchor && container) {
        const aRect = anchor.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        const left = Math.round(aRect.left - cRect.left);
        const width = Math.round(aRect.width);
        setBarStyle({ left, width, opacity: 1 });
      } else {
        setBarStyle((s) => ({ ...s, opacity: 0 }));
      }
    };

    // small delay to ensure layout settled
    const t = setTimeout(updateBar, 60);
    window.addEventListener("resize", updateBar);
    window.addEventListener("orientationchange", updateBar);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateBar);
      window.removeEventListener("orientationchange", updateBar);
    };
  }, [activeKey]);
  

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-brand-bg/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex flex-col group">
          <span className="font-display text-base md:text-lg font-bold tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-brand-gold">
            SCALETWOO
          </span>
          <span className="font-display text-[9px] tracking-[0.45em] text-brand-textMuted transition-colors duration-300 group-hover:text-white">
            STUDIOS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav ref={navRef} className="hidden md:flex items-center space-x-8 lg:space-x-12 relative">
          {navLinks.map((link) => {
            const isActive =
              (link.href === "/" && pathname === "/") ||
              (link.href.startsWith("/#") && pathname === "/");

            const keyName = link.href === "/" ? "home" : link.href.replace("/#", "");

            return (
              <Link
                key={link.name}
                href={link.href}
                id={`nav-${keyName}`}
                className={`relative text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Animated underline bar */}
            <motion.div
              ref={barRef}
              className="absolute bottom-0 h-0.5 bg-white rounded-full"
              initial={{ left: 0, width: 0, opacity: 0 }}
              animate={{ left: barStyle.left, width: barStyle.width, opacity: barStyle.opacity }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              style={{ willChange: "left, width, opacity" }}
            />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white hover:text-brand-gold transition-colors duration-300 focus:outline-none"
          aria-label={locale === "es" ? "Abrir menú móvil" : "Toggle Mobile Menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-brand-bg/95 backdrop-blur-lg border-b border-white/5 py-8 px-6 flex flex-col items-center space-y-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
};
