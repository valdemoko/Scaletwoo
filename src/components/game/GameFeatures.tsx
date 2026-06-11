"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Volume2, Compass, Film, Skull, Zap } from "lucide-react";

export const GameFeatures: React.FC = () => {
  const features = [
    {
      title: "Gráficos hiperrealistas",
      desc: "Texturas fotogramétricas, sombras dinámicas y shaders de alta fidelidad replican texturas reales de hormigón, yeso y papel pintado.",
      icon: <Eye className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "Atmósfera inmersiva",
      desc: "Un paisaje sonoro espacial ambiental centrado en el zumbido de luces fluorescentes, pasos que resuenan y el propio ritmo cardíaco y respiración del jugador.",
      icon: <Volume2 className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "Exploración no lineal",
      desc: "Recorre configuraciones de pasillos que cambian. Sin mapa, sin guía. Memoriza puntos de referencia o piérdete en patrones de cuadrícula repetitivos.",
      icon: <Compass className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "Narrativa ambiental",
      desc: "Reconstruye las historias de exploradores anteriores a través de objetos abandonados, grabaciones y marcas en las paredes.",
      icon: <Film className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "Terror psicológico",
      desc: "La tensión surge del silencio. El miedo a lo que puede haber tras la próxima esquina, combinado con alucinaciones que distorsionan tus sentidos.",
      icon: <Skull className="w-5 h-5 text-brand-gold" />,
    },
    {
      title: "Lore amarillo auténtico",
      desc: "Modelado fielmente según la descripción original del creepypasta de los Backrooms: paredes amarillas húmedas, esquema monocromo amarillo y paneles de techo.",
      icon: <Zap className="w-5 h-5 text-brand-gold" />,
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
            Especificaciones y detalles
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-wider uppercase leading-none mb-6 whitespace-normal break-words max-w-full">
          Características <span className="stencil-text-gold">principales</span>
        </h2>
        <p className="text-brand-textMuted text-sm leading-relaxed font-light tracking-wide">
          Diseñado desde cero para fans del terror atmosférico de combustión lenta. Explora los pilares técnicos de Recovered Tape.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h3 className="font-display text-xs font-bold tracking-widest text-white mb-3 uppercase">
                {feat.title}
              </h3>
              <p className="text-brand-textMuted text-xs leading-relaxed font-light tracking-wide">
                {feat.desc}
              </p>
            </div>
            
            {/* Fine border accents */}
            <div className="w-8 h-[1px] bg-brand-gold/20 mt-8 group-hover:w-full transition-all duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
