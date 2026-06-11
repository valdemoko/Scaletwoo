"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Play, Eye, X } from "lucide-react";
import { Button } from "../ui/button";

export const Hero: React.FC = () => {
  const [showTrailer, setShowTrailer] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const stats = [
    {
      title: "Hiperrealista",
      desc: "Construido con realismo y atmósfera como prioridad.",
      icon: (
        <svg
          className="w-6 h-6 text-brand-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
          />
        </svg>
      ),
    },
    {
      title: "Experiencia inmersiva",
      desc: "Diseñado para hacerte sentir perdido, aislado y observado.",
      icon: (
        <svg
          className="w-6 h-6 text-brand-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11a13.917 13.917 0 00-3.44-8.441l-.053-.09m.06 18.522L6.69 14.077m10.814.12l-2.247-4.494M15 11c0-3.517 1.009-6.799 2.753-9.571m-3.44 2.04l-.054.09A13.916 13.916 0 0015 11c0 3.07 1.009 5.865 2.724 8.441l.053.09m-.06-18.522L17.31 9.923"
          />
        </svg>
      ),
    },
    {
      title: "Found footage",
      desc: "Descubre la verdad a través de grabaciones recuperadas.",
      icon: (
        <svg
          className="w-6 h-6 text-brand-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Próximamente",
      desc: "Añádelo ya a tu lista de deseos en Steam y mantente al día.",
      icon: (
        <svg
          className="w-6 h-6 text-brand-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8v4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      
      <div />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10">
        
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-6">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.45em] text-brand-gold uppercase">
              Nuestro primer proyecto
            </span>
            <span className="w-12 h-[1px] bg-brand-gold/40" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-wider leading-none mb-8"
          >
            RECOVERED
            <span className="block text-brand-gold">TAPE</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-brand-textMuted text-sm md:text-base max-w-md md:max-w-lg leading-relaxed tracking-wide font-light mb-10"
          >
            Un juego de terror de los Backrooms hiperrealista centrado en la inmersión, la exploración y la narrativa ambiental. Vive el horror desde una perspectiva VHS en primera persona.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full"
          >
            <Button href="/recovered-tape" variant="outline" className="w-full sm:w-auto flex items-center justify-center space-x-2">
              <span>Ver proyecto</span>
              <Eye size={14} className="ml-1" />
            </Button>
            <Button
              onClick={() => setShowTrailer(true)}
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 border-white/10 hover:border-brand-gold hover:bg-brand-gold/5"
            >
              <span>Ver tráiler</span>
              <Play size={14} fill="currentColor" className="ml-1" />
            </Button>
          </motion.div>
        </motion.div>

        <div className="hidden lg:block lg:col-span-5 h-[300px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        className="w-full glass-panel rounded-2xl p-6 md:p-8 mt-16 md:mt-24 z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 lg:divide-x divide-white/5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 ${
                index > 0 ? "pt-6 md:pt-0 lg:pl-6" : ""
              }`}
            >
              <div className="mt-1 flex-shrink-0">{stat.icon}</div>
              <div>
                <h3 className="font-display text-xs font-bold tracking-widest text-white mb-2 uppercase">
                  {stat.title}
                </h3>
                <p className="text-brand-textMuted text-xs leading-relaxed font-light tracking-wide">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTrailer(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-300"
              aria-label="Cerrar tráiler"
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
                  TRÁILER OFICIAL
                </h3>
                <p className="text-brand-textMuted text-xs max-w-sm leading-relaxed font-light">
                  Configuración de avance provisional. Inserta aquí tu enlace de YouTube, Vimeo o mp4 para cargar el tráiler automáticamente.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
