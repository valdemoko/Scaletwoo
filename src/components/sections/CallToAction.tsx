"use client";

import React from "react";
import { motion } from "framer-motion";

export const CallToAction: React.FC = () => {
  return (
    <motion.section
      id="cta"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 relative"
    >
      <div className="glass-panel border border-white/10 rounded-[2rem] p-10 md:p-14 shadow-[0_30px_90px_-60px_rgba(0,0,0,0.9)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-semibold mb-4 block">
              Próximo lanzamiento
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-wide mb-6">
              Diseñando experiencias oscuras que se quedan contigo.
            </h2>
            <p className="text-brand-textMuted max-w-2xl text-base leading-relaxed font-light tracking-wide">
              Si buscas un proyecto con identidad fuerte, atmósfera inmersiva y calidad técnica, has llegado al lugar correcto. Explora el avance de Recovered Tape, descarga material de prensa y estate atento: próximamente estará en la lista de deseos de Steam.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="text-sm text-brand-textMuted max-w-sm text-center">
              Hemos eliminado los enlaces directos de esta sección. Consulta el proyecto desde el menú &quot;Proyectos&quot; o visita la página del proyecto desde la navegación principal.
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
