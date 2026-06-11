"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "outline" | "filled" | "gold";
  className?: string;
  id?: string;
  type?: "button" | "submit";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  variant = "outline",
  className = "",
  id,
  type = "button",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "filled":
        return "bg-white text-black border border-white hover:bg-transparent hover:text-white";
      case "gold":
        return "bg-brand-gold text-black border border-brand-gold hover:bg-transparent hover:text-brand-goldLight hover:border-brand-goldLight";
      case "outline":
      default:
        return "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white hover:text-black";
    }
  };

  const baseClasses = `inline-flex items-center justify-center px-5 sm:px-8 py-3 rounded-full max-w-full text-xs tracking-[0.2em] font-semibold font-display uppercase transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-brand-gold/50 ${getVariantStyles()} ${className}`;

  // When used as a link — render motion.a inside Next Link
  if (href) {
    // External link (starts with http)
    if (href.startsWith("http")) {
      return (
        <motion.a
          id={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {children}
        </motion.a>
      );
    }

    // Internal link — use Next.js Link
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a
          id={id}
          onClick={onClick}
          className={baseClasses}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {children}
        </motion.a>
      </Link>
    );
  }

  // Standard button
  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      className={baseClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {children}
    </motion.button>
  );
};
