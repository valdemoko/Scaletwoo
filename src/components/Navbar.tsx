"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  locale?: "en" | "es";
}

export const Navbar: React.FC<NavbarProps> = ({ locale = "en" }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks =
    locale === "es"
      ? [
          { name: "Inicio", href: "/" },
          { name: "Proyectos", href: "/#projects" },
          { name: "Nosotros", href: "/#about" },
        ]
      : [
          { name: "Home", href: "/" },
          { name: "Projects", href: "/#projects" },
          { name: "About", href: "/#about" },
        ];

  const contactLabel = locale === "es" ? "Contacto" : "Contact";

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
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navLinks.map((link) => {
            const isActive =
              (link.href === "/" && pathname === "/") ||
              (link.href.startsWith("/#") && pathname === "/");

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {link.name}
                {/* Active indicator dot, matching mockup image */}
                {isActive && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          
          <Button href="/#contact" variant="outline" className="!px-6 !py-2">
            {contactLabel}
          </Button>
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
          <Button
            href="/#contact"
            variant="outline"
            className="!w-full !px-6 !py-2.5"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {contactLabel}
          </Button>
        </motion.div>
      )}
    </header>
  );
};
