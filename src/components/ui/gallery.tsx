"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  src: string; // can be local file, remote URL, or a procedural SVG/base64
  alt: string;
  caption: string;
}

interface GalleryProps {
  images: GalleryImage[];
  className?: string;
  locale?: "en" | "es";
}

// Procedural SVG generator for beautiful Backrooms / VHS themed placeholders
export const getPlaceholderSvg = (index: number) => {
  const tones = ["#2b2716", "#1e1b10", "#3a341e", "#15130b"];
  const tone = tones[index % tones.length];
  
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
    <rect width="100%" height="100%" fill="${tone}"/>
    <!-- Perspectives of corridors -->
    <path d="M 0 0 L 300 150 L 300 300 L 0 450 Z" fill="rgba(196, 146, 0, 0.05)" stroke="rgba(196, 146, 0, 0.15)" stroke-width="1"/>
    <path d="M 800 0 L 500 150 L 500 300 L 800 450 Z" fill="rgba(196, 146, 0, 0.05)" stroke="rgba(196, 146, 0, 0.15)" stroke-width="1"/>
    <path d="M 300 150 L 500 150 L 500 300 L 300 300 Z" fill="none" stroke="rgba(196, 146, 0, 0.2)" stroke-width="2"/>
    
    <!-- Corridor depths -->
    <line x1="380" y1="180" x2="420" y2="180" stroke="rgba(196, 146, 0, 0.2)" stroke-width="1"/>
    <line x1="380" y1="270" x2="420" y2="270" stroke="rgba(196, 146, 0, 0.2)" stroke-width="1"/>
    <line x1="380" y1="180" x2="380" y2="270" stroke="rgba(196, 146, 0, 0.2)" stroke-width="1"/>
    <line x1="420" y1="180" x2="420" y2="270" stroke="rgba(196, 146, 0, 0.2)" stroke-width="1"/>
    
    <!-- Halogen ceiling lights -->
    <rect x="340" y="10" width="120" height="15" fill="rgba(255, 230, 150, 0.1)" rx="2"/>
    <rect x="340" y="10" width="120" height="15" fill="none" stroke="rgba(255, 230, 150, 0.3)" stroke-width="1" rx="2"/>
    
    <!-- Found footage overlay text -->
    <text x="30" y="40" fill="%23ffffff" font-family="Courier New, monospace" font-size="14" opacity="0.6">REC ⏺</text>
    <text x="30" y="70" fill="%23ffffff" font-family="Courier New, monospace" font-size="14" opacity="0.6">PLAY ⏯</text>
    <text x="700" y="40" fill="%23ffffff" font-family="Courier New, monospace" font-size="14" opacity="0.6">CH 0${index + 1}</text>
    <text x="30" y="420" fill="%23ffbe00" font-family="Courier New, monospace" font-size="16" font-weight="bold" opacity="0.8">RECOVERED_TAPE_CAM_${index + 1}.raw</text>
    <text x="630" y="420" fill="%23ffffff" font-family="Courier New, monospace" font-size="14" opacity="0.6">JUN 06, 2026</text>
    
    <!-- Battery indicator -->
    <rect x="740" y="55" width="30" height="15" fill="none" stroke="%23ffffff" stroke-width="1" opacity="0.6"/>
    <rect x="742" y="57" width="20" height="11" fill="%2300ff00" opacity="0.7"/>
    
    <!-- Scanlines -->
    <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.03)" stroke-width="2"/>
    <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.03)" stroke-width="2"/>
    <line x1="0" y1="300" x2="800" y2="300" stroke="rgba(255,255,255,0.03)" stroke-width="2"/>
  </svg>`;
};

export const Gallery: React.FC<GalleryProps> = ({ images, className = "", locale = "en" }) => {
  const labels =
    locale === "es"
      ? {
          close: "Cerrar galería",
          prev: "Imagen anterior",
          next: "Imagen siguiente",
        }
      : {
          close: "Close Lightbox",
          prev: "Previous Image",
          next: "Next Image",
        };
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  return (
    <div className={`${className}`}>
      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => {
          const displaySrc = img.src || getPlaceholderSvg(idx);
          return (
            <motion.div
              key={img.id}
              onClick={() => openImage(idx)}
              className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer border border-white/5 bg-brand-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={displaySrc}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                unoptimized={displaySrc.startsWith("data:")}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="self-end text-brand-gold">
                  <Maximize2 size={20} className="transform scale-90 group-hover:scale-100 transition-transform duration-300" />
                </div>
                <div>
                  <p className="font-display text-xs text-brand-gold uppercase tracking-widest mb-1">
                    {img.caption}
                  </p>
                  <p className="text-white text-xs font-light tracking-wide">
                    {img.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10"
          >
            <button
              onClick={closeImage}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-300 p-2 z-50 focus:outline-none"
              aria-label={labels.close}
            >
              <X size={28} />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 text-white/40 hover:text-white transition-colors duration-300 p-3 z-50 focus:outline-none bg-black/20 hover:bg-black/50 rounded-full"
              aria-label={labels.prev}
            >
              <ChevronLeft size={32} />
            </button>

            {/* Main image container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-brand-card"
            >
              <Image
                src={images[selectedIndex].src || getPlaceholderSvg(selectedIndex)}
                alt={images[selectedIndex].alt}
                fill
                className="object-cover"
                unoptimized={(images[selectedIndex].src || "").startsWith("data:")}
              />
              
              {/* Bottom Caption bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                <p className="font-display text-sm text-brand-gold uppercase tracking-widest mb-1">
                  {images[selectedIndex].caption}
                </p>
                <p className="text-white/80 text-sm font-light">
                  {images[selectedIndex].alt}
                </p>
              </div>
            </motion.div>

            {/* Right navigation arrow */}
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 text-white/40 hover:text-white transition-colors duration-300 p-3 z-50 focus:outline-none bg-black/20 hover:bg-black/50 rounded-full"
              aria-label={labels.next}
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
