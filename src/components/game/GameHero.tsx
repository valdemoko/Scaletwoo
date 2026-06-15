"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, X } from "lucide-react";
import { Button } from "../ui/button";

export const GameHero: React.FC = () => {
  const [showTeaser, setShowTeaser] = useState(false);

  return (
    <section className="relative min-h-[75vh] md:min-h-[90vh] flex flex-col justify-center items-center text-center pt-20 md:pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto z-10">
      
      {/* Intro tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-2.5 mb-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.45em] text-brand-gold uppercase">
          Próximamente en la lista de deseos de Steam
        </span>
      </motion.div>

      {/* Large Cinematic Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-wider leading-none mb-4"
      >
        RECOVERED
        <span className="block stencil-text-gold mt-2">TAPE</span>
      </motion.h1>

      {/* Short Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-brand-textMuted text-sm md:text-base lg:text-lg max-w-full sm:max-w-xl font-light leading-relaxed tracking-wide mb-12"
      >
        Un juego de terror found-footage hiperrealista. Vive los clásicos pasillos amarillos de los Backrooms a través de la lente de un camarógrafo perdido.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 items-center mb-16 w-full"
      >
        <Button
          href="#wishlist"
          variant="gold"
          className="w-full sm:w-auto flex items-center justify-center space-x-2 shadow-lg shadow-brand-gold/10"
        >
          <span>Lista de deseos próximamente</span>
          <Sparkles size={14} className="ml-1" />
        </Button>
        <Button
          onClick={() => setShowTeaser(true)}
          variant="outline"
          className="w-full sm:w-auto flex items-center justify-center space-x-2 hover:bg-white/5 border-white/10"
        >
          <span>Ver avance</span>
          <Play size={12} fill="currentColor" className="ml-1" />
        </Button>
      </motion.div>

      {/* VHS viewfinder procedural placeholder for trailer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full aspect-video rounded-2xl overflow-hidden border border-white/5 bg-brand-card/30 backdrop-blur-sm relative group cursor-pointer"
        onClick={() => setShowTeaser(true)}
      >
        {/* Procedural CRT scanline cover */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
        
        {/* Viewfinder brackets */}
        <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-white/20" />
        <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-white/20" />
        <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-white/20" />
        <div className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-white/20" />
        
        {/* Recording tag */}
        <div className="absolute top-6 left-10 flex items-center space-x-2 text-[10px] font-mono tracking-widest text-white/50 z-20">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>REC ⏺</span>
        </div>
        
        {/* Play control center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white bg-black/40 group-hover:scale-110 group-hover:border-brand-gold group-hover:text-brand-gold transition-all duration-300">
            <Play size={22} fill="currentColor" className="ml-1" />
          </div>
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-display font-semibold mt-4 group-hover:text-white transition-colors duration-300">
            Clic para reproducir el tráiler
          </span>
        </div>

        {/* Dynamic cam tag */}
        <div className="absolute bottom-6 left-10 text-[10px] font-mono text-white/30 z-20">
          CAM_01_INPUT.raw
        </div>
        <div className="absolute bottom-6 right-10 text-[10px] font-mono text-white/30 z-20">
          12:00:00 AM
        </div>
      </motion.div>

      {/* Teaser Modal */}
      <AnimatePresence>
        {showTeaser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTeaser(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-300 z-50 focus:outline-none"
              aria-label="Cerrar avance"
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-brand-card flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-[#070707] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-6 animate-pulse">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
                <h3 className="font-display text-base font-semibold tracking-widest text-white mb-2">
                  RECOVERED TAPE — AVANCE OFICIAL
                </h3>
                <p className="text-brand-textMuted text-xs max-w-sm leading-relaxed font-light">
                  Inserta aquí tu enlace de YouTube o Vimeo. Este diseño está preparado para integrar el vídeo personalizado.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
