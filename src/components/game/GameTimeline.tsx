"use client";

import React from "react";
import { motion } from "framer-motion";

export const GameTimeline: React.FC = () => {
  const steps = [
    {
      phase: "Fase 01",
      title: "Diseño conceptual",
      date: "T3 2025",
      desc: "Definir activos visuales objetivo, parámetros de sombreado found-footage y mapeo acústico espacial HRTF. Completar investigación sobre estilos geométricos originales de los Backrooms.",
      status: "completed",
    },
    {
      phase: "Fase 02",
      title: "Prototipo técnico",
      date: "T4 2025",
      desc: "Implementar simulación física del cuerpo, pipeline de renderizado de overlay VHS y motor de ensamblaje procedural de segmentos de pasillo. Completar pruebas iniciales de física de movimiento.",
      status: "completed",
    },
    {
      phase: "Fase 03",
      title: "Vertical slice y avance",
      date: "T1 2026",
      desc: "Construir un módulo de juego de 10 minutos completamente detallado. Grabar el avance oficial de anuncio. Lanzar ficha de producto en Steam y devlogs del desarrollador.",
      status: "completed",
    },
    {
      phase: "Fase 04",
      title: "Ensamblaje del laberinto",
      date: "T2 - T3 2026",
      desc: "Ensamblar niveles completos, programar comportamientos de IA ambiental, diseñar cámaras de vídeo multiperspectiva y refinar matrices de iluminación espacial. (Fase actual)",
      status: "active",
    },
    {
      phase: "Fase 05",
      title: "Beta y lanzamiento",
      date: "T4 2026 / T1 2027",
      desc: "Distribuir acceso anticipado para reseñas, lanzar beta abierta, optimizar cargas de memoria de niveles y publicar el juego completo en Steam.",
      status: "upcoming",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-black/30 border-y border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
              Pipeline del proyecto
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-wider uppercase leading-none mb-6 whitespace-normal break-words max-w-full">
            Hoja de ruta de <span className="stencil-text-gold">desarrollo</span>
          </h2>
          <p className="text-brand-textMuted text-sm leading-relaxed font-light tracking-wide max-w-lg mx-auto">
            Nuestra línea temporal representa pasos comprometidos hacia el lanzamiento final. Priorizamos el pulido artístico y la optimización sobre lanzamientos apresurados.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-white/5 pl-8 md:pl-12 space-y-16">
          {steps.map((step, idx) => {
            const isCompleted = step.status === "completed";
            const isActive = step.status === "active";

            return (
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Connector Point */}
                <div
                  className={`absolute -left-5 sm:-left-[26px] md:-left-[41px] top-1.5 w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors duration-500 bg-brand-bg ${
                    isCompleted
                      ? "border-brand-gold bg-brand-gold text-black"
                      : isActive
                      ? "border-brand-goldLight shadow-[0_0_12px_rgba(255,190,0,0.4)]"
                      : "border-white/10"
                  }`}
                >
                  {isCompleted && (
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-goldLight animate-ping" />}
                </div>

                {/* Content Panel */}
                <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                  isActive 
                    ? "bg-brand-card/60 border-brand-gold/20" 
                    : "bg-brand-card/20 border-white/5"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">
                      {step.phase} — {step.date}
                    </span>
                    {isActive && (
                      <span className="self-start sm:self-auto text-[8px] uppercase font-bold tracking-widest bg-brand-goldLight/15 text-brand-goldLight border border-brand-goldLight/20 px-2 py-0.5 rounded">
                        EN CURSO
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-sm md:text-base font-bold tracking-widest text-white mb-3 uppercase">
                    {step.title}
                  </h3>
                  <p className="text-brand-textMuted text-xs md:text-sm leading-relaxed font-light tracking-wide">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
