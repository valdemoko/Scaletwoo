"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Button } from "../ui/button";

export const Hero: React.FC = () => {
  const [showTrailer, setShowTrailer] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-gold-soft blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10">
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-6">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.45em] text-brand-gold uppercase">
              Estudio independiente
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
            Un juego de terror de los Backrooms hiperrealista centrado en inmersión, exploración y narrativa ambiental. Vive el horror desde una perspectiva VHS en primera persona.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full"
          >
            <Button href="/recovered-tape" variant="gold" className="w-full sm:w-auto">
              Ver proyecto
            </Button>
            <Button
              onClick={() => setShowTrailer(true)}
              variant="outline"
              className="w-full sm:w-auto border-white/10 hover:border-brand-gold hover:bg-brand-gold-soft"
            >
              Ver tráiler
            </Button>
          </motion.div>
        </motion.div>

        {/* Right-side Vision panel removed per request */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.8 }}
        className="w-full glass-panel rounded-2xl p-6 md:p-8 mt-16 md:mt-24 z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 lg:divide-x divide-white/5">
          {[
            {
              title: "Hiperrealista",
              desc: "Construido con atmósferas intensas y detalles que simulan grabaciones reales.",
            },
            {
              title: "Inmersivo",
              desc: "Sin HUD intrusivo, sin respiración forzada: solo un mundo que responde a tus acciones.",
            },
            {
              title: "Found footage",
              desc: "Una narrativa que emerge de las cintas grabadas y los objetos recuperados.",
            },
            {
              title: "Pendiente",
              desc: "Próximamente en la lista de deseos de Steam para quienes buscan novedades exclusivas.",
            },
          ].map((stat, index) => (
            <div key={index} className={`${index > 0 ? "pt-6 md:pt-0 lg:pl-6" : ""}`}>
              <h3 className="font-display text-xs font-bold tracking-[0.2em] text-brand-gold uppercase mb-2">
                {stat.title}
              </h3>
              <p className="text-brand-textMuted text-xs leading-relaxed font-light tracking-wide">
                {stat.desc}
              </p>
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
              className="max-w-4xl w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#070707] flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-[#070707] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-6 animate-pulse">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
                <h3 className="font-display text-base font-semibold tracking-widest text-white mb-2">
                  Tráiler provisional
                </h3>
                <p className="text-brand-textMuted text-sm max-w-sm leading-relaxed font-light">
                  Inserta aquí tu enlace de YouTube, Vimeo o mp4 para que el tráiler se muestre directamente en esta ventana.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
