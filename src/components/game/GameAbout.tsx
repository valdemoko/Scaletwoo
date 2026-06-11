"use client";

import React from "react";
import { motion } from "framer-motion";

export const GameAbout: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-black/30 border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
        >
          {/* Left Column */}
          <div className="lg:col-span-6">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
                Perfil de inmersión
              </span>
              <span className="w-8 h-[1px] bg-brand-gold/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-wider leading-tight mb-8">
              EL ARTE DE LA <br />
              <span className="stencil-text-gold">VIGILANCIA</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-light tracking-wide mb-8">
              En Recovered Tape no hay árboles de habilidades, indicadores en pantalla ni miras. Solo llevas una cámara de vídeo digital, recorriendo un laberinto aparentemente infinito de pasillos amarillos monocromos, zumbidos fluorescentes y moqueta húmeda.
            </p>
            <p className="text-brand-textMuted text-sm leading-relaxed font-light tracking-wide">
              Cada paso está simulado. Cada respiración, capturada. La lente de la cámara acumula polvo, sufre artefactos analógicos y se distorsiona bajo estrés electromagnético. El realismo no es solo un detalle estético — es el motor principal del terror.
            </p>
          </div>

          {/* Right Column: Visual Callouts */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Box 1 */}
            <div className="glass-panel p-6 rounded-xl">
              <span className="text-brand-gold font-mono text-xs block mb-3">01 / SIMULACIÓN VHS</span>
              <h3 className="font-display text-xs font-bold tracking-widest text-white mb-2 uppercase">
                Estética found footage
              </h3>
              <p className="text-brand-textMuted text-xs font-light leading-relaxed">
                Líneas de entrelazado, distorsiones de lente, sangrado de color y fallos de cinta reproducen una captura de cámara cruda auténtica de los años 90.
              </p>
            </div>

            {/* Box 2 */}
            <div className="glass-panel p-6 rounded-xl">
              <span className="text-brand-gold font-mono text-xs block mb-3">02 / DISEÑO ESPACIAL</span>
              <h3 className="font-display text-xs font-bold tracking-widest text-white mb-2 uppercase">
                Zumbidos fluorescentes
              </h3>
              <p className="text-brand-textMuted text-xs font-light leading-relaxed">
                El mapeo de sonido binaural te aísla en habitaciones silenciosas donde el zumbido de las bombillas es el único indicador de seguridad.
              </p>
            </div>

            {/* Box 3 */}
            <div className="glass-panel p-6 rounded-xl">
              <span className="text-brand-gold font-mono text-xs block mb-3">03 / PESO REALISTA</span>
              <h3 className="font-display text-xs font-bold tracking-widest text-white mb-2 uppercase">
                Observador físico
              </h3>
              <p className="text-brand-textMuted text-xs font-light leading-relaxed">
                Tropezones, deslizamientos y movimientos de mano respetan propiedades físicas, dando una sensación tangible al horror.
              </p>
            </div>

            {/* Box 4 */}
            <div className="glass-panel p-6 rounded-xl">
              <span className="text-brand-gold font-mono text-xs block mb-3">04 / LO INVISIBLE</span>
              <h3 className="font-display text-xs font-bold tracking-widest text-white mb-2 uppercase">
                Efecto observador
              </h3>
              <p className="text-brand-textMuted text-xs font-light leading-relaxed">
                Las entidades siguen leyes físicas, moviéndose en silencio detrás de ti y reaccionando al barrido de luz de tu cámara.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
