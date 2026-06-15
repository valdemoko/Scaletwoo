"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export const GameSteam: React.FC = () => {
  return (
    <section id="wishlist" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel border-brand-gold/15 rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(196,146,0,0.08)_0%,transparent_70%)]"
      >
        {/* Background vignette blur */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
              Canal de distribución
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-wider uppercase leading-none mb-6 whitespace-normal break-words max-w-full">
            PRÓXIMAMENTE <br />
            <span className="stencil-text-gold">EN STEAM</span>
          </h2>
          
          <p className="text-brand-textMuted text-sm md:text-base leading-relaxed font-light tracking-wide max-w-xl mx-auto mb-10">
            Recovered Tape estará disponible próximamente en Steam. Cuando publiquemos la ficha del juego, podrás añadirlo a tu lista de deseos para recibir avisos del lanzamiento y las pruebas cerradas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Wishlist Button */}
            <Button
              variant="gold"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 shadow-lg shadow-brand-gold/20 !px-10 !py-4 opacity-80 cursor-default"
              id="steam-wishlist-btn"
            >
              <span>Lista de deseos próximamente</span>
              <Sparkles size={14} fill="currentColor" />
            </Button>
            
            {/* Community Hub Button */}
            <Button
              href="https://steamcommunity.com"
              variant="outline"
              className="w-full sm:w-auto border-white/10 hover:bg-white/5 !px-10 !py-4"
            >
              <span>Hub comunitario</span>
            </Button>
          </div>

          {/* Procedural vintage grid layout overlay representing retro TV frames */}
          <div className="flex items-center justify-center space-x-12 mt-16 opacity-30 text-white/50 text-[10px] font-mono tracking-widest">
            <div>APPID: 994200</div>
            <div>ESTADO: PRUEBAS_CERRADAS</div>
            <div>BUILD: V0.8.2-RAW</div>
          </div>
        </div>

      </motion.div>
    </section>
  );
};
