"use client";

import React from "react";
import { motion } from "framer-motion";

export const Vision: React.FC = () => {
  const values = [
    {
      title: "Paisajes sonoros atmosféricos",
      desc: "El sonido es el 70% del terror. Usamos mapeo de audio binaural HRTF avanzado y acústica física real para ofrecer un diseño de sonido espacial altamente realista.",
    },
    {
      title: "Texturas fotorrealistas",
      desc: "Mediante escaneos fotogramétricos estrictos y shaders personalizados, recreamos los clásicos papeles pintados amarillos y paneles de techo de los Backrooms hasta el grano del polvo.",
    },
    {
      title: "Simulación corporal en primera persona",
      desc: "Simulando el balanceo auténtico de la cámara, la distorsión de lente y el peso del cuerpo, nos aseguramos de que no seas solo una cámara flotante, sino un observador activo que respira.",
    },
  ];

  return (
    <section id="vision" className="py-24 md:py-32 px-6 md:px-12 bg-black/40 border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
        >
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
                Tecnología
              </span>
              <span className="w-8 h-[1px] bg-brand-gold/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-wider leading-tight mb-8">
              FORJANDO <br />
              <span className="stencil-text-gold">EL VACÍO</span>
            </h2>
            <p className="text-brand-textMuted text-sm leading-relaxed tracking-wide font-light max-w-md">
              Aprovechamos herramientas modernas para ofrecer un renderizado estable y de alto rendimiento. Cada baldosa de techo, zumbido de halógeno y segmento de pasillo oscuro está diseñado para desafiar el sentido de la realidad del observador.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-12">
            {values.map((val) => (
              <div key={val.title} className="relative border-l border-white/10 pl-8 group">
                <div className="absolute top-1 -left-[4px] w-2 h-2 rounded-full bg-white/20 group-hover:bg-brand-gold transition-colors duration-300" />
                
                <h3 className="font-display text-sm font-bold tracking-widest text-white mb-2 uppercase group-hover:text-brand-gold transition-colors duration-300">
                  {val.title}
                </h3>
                <p className="text-brand-textMuted text-sm font-light leading-relaxed tracking-wide">
                  {val.desc}
                </p>
              </div>
            ))}

            {/* TikTok link moved to Footer for consistent placement */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
