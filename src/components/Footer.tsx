"use client";

import React from "react";
import Link from "next/link";

// Custom Twitter/X SVG icon
const TwitterIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom Youtube SVG icon
const YoutubeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.522 3.5 12 3.5 12 3.5s-7.522 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.03 0 12 0 12s0 3.97-.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.478 20.5 12 20.5 12 20.5s7.522 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Custom Discord SVG icon since Lucide doesn't have it natively
const DiscordIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 127.14 96.36"
    fill="currentColor"
    className={className}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.4-5c.88-.65,1.72-1.33,2.53-2a75.7,75.7,0,0,0,72.59,0c.81.71,1.65,1.39,2.53,2a68.86,68.86,0,0,1-10.4,5,78.84,78.84,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,49.62,123.75,26.83,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
  </svg>
);

interface FooterProps {
  locale?: "en" | "es";
}

export const Footer: React.FC<FooterProps> = ({ locale = "en" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-brand-bg py-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Copyright */}
        <div className="text-brand-textMuted text-xs tracking-wider font-light order-3 md:order-1 text-center md:text-left">
          © {currentYear} Scaletwoo Studios. {locale === "es" ? "Todos los derechos reservados." : "All rights reserved."}
        </div>

        {/* Middle: Links */}
        <div className="flex space-x-8 text-brand-textMuted text-xs tracking-widest font-medium uppercase order-2">
          <Link href="/privacy" className="hover:text-brand-gold transition-colors duration-300">
            {locale === "es" ? "Política de privacidad" : "Privacy Policy"}
          </Link>
          <Link href="/terms" className="hover:text-brand-gold transition-colors duration-300">
            {locale === "es" ? "Términos de uso" : "Terms of Use"}
          </Link>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="flex space-x-6 text-brand-textMuted order-1 md:order-3">
          <a
            href="https://twitter.com/scaletwoo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="Scaletwoo on Twitter / X"
          >
            <TwitterIcon size={18} />
          </a>
          <a
            href="https://youtube.com/scaletwoo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="Scaletwoo on YouTube"
          >
            <YoutubeIcon size={20} />
          </a>
          <a
            href="https://discord.gg/scaletwoo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="Scaletwoo Discord"
          >
            <DiscordIcon size={18} />
          </a>
        </div>

      </div>
    </footer>
  );
};
