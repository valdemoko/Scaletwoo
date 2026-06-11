"use client";

import React from "react";
import { motion } from "framer-motion";

export const About: React.FC = () => {
  const pillars = [
    {
      num: "01",
      title: "Realismo sin concesiones",
      desc: "Aprovechamos tecnologías de renderizado de vanguardia y técnicas de fotogrametría para crear activos digitales que difuminan los límites entre juego y realidad.",
    },
    {
      num: "02",
      title: "Inmersión absoluta",
      desc: "Nuestros juegos abandonan los elementos tradicionales, los HUD intrusivos y las señales artificiales en favor de la simulación física y un diseño de sonido realista.",
    },
    {
      num: "03",
      title: "Enfoque atmosférico",
      desc: "Creemos que la tensión se construye con espacios silenciosos, un terror que se arrastra y señales ambientales, no con sustos baratos ni guiones lineales.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
      >
        
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
                Filosofía
              </span>
              <span className="w-8 h-[1px] bg-brand-gold/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-wider leading-tight mb-8">
              MÁS ALLÁ DE LA <br />
              <span className="stencil-text-gold">SUPERFICIE</span>
            </h2>
          </div>
          
          <div className="border-l border-brand-gold/20 pl-6 py-2 mt-8 lg:mt-0">
            <p className="text-brand-textMuted text-xs tracking-[0.2em] uppercase font-medium">
              Scaletwoo Studios
            </p>
            <p className="text-white/40 text-xs mt-1 font-light tracking-wider">
              FUND. 2024
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="text-white/80 text-base md:text-lg leading-relaxed font-light tracking-wide mb-12">
            Scaletwoo es un estudio de videojuegos independiente construido sobre una promesa simple: diseñar mundos profundos, crudos y atmosféricos. No solo hacemos juegos; orquestamos experiencias sensoriales. Nuestro trabajo se centra en texturas hiperrealistas, estética found-footage y paisajes sonoros espaciales que te hacen sentir verdaderamente solo.
          </p>

          <div className="space-y-10 border-t border-white/5 pt-10">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="flex gap-6 md:gap-10 items-start group"
              >
                <div className="font-display text-xs font-bold text-brand-gold/40 group-hover:text-brand-gold transition-colors duration-300 pt-1">
                  {pillar.num}
                </div>
                
                <div>
                  <h3 className="font-display text-sm font-bold tracking-widest text-white mb-2 uppercase group-hover:text-brand-gold transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-brand-textMuted text-sm leading-relaxed font-light tracking-wide">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};
