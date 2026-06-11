"use client";

import React from "react";
import { Download, Image as ImageIcon, FileText, Video } from "lucide-react";

export const GameMediaKit: React.FC = () => {
  const kits = [
    {
      title: "Arte clave y pósters",
      size: "42.8 MB",
      icon: <ImageIcon className="w-5 h-5 text-brand-gold" />,
      desc: "Fondos de escritorio en alta resolución, pósters verticales promocionales y gráficos oficiales para web.",
      href: "#",
    },
    {
      title: "Logos e identidad",
      size: "8.4 MB",
      icon: <FileText className="w-5 h-5 text-brand-gold" />,
      desc: "Archivos vectoriales SVG/EPS de los logos de Scaletwoo y Recovered Tape en versiones para fondos oscuros y claros.",
      href: "#",
    },
    {
      title: "Pack de avance (4K)",
      size: "245.0 MB",
      icon: <Video className="w-5 h-5 text-brand-gold" />,
      desc: "Activos de vídeo en bruto, clips cinemáticos en bucle para fondos y cortos verticales promocionales preeditados.",
      href: "#",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-black/40 border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left info column */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
                Recursos
              </span>
              <span className="w-8 h-[1px] bg-brand-gold/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-wider leading-tight mb-8">
              MEDIA KIT Y <br />
              <span className="stencil-text-gold">ACTIVOS</span>
            </h2>
            <p className="text-brand-textMuted text-sm leading-relaxed font-light tracking-wide mb-8">
              ¿Eres creador de contenido, periodista o representante de prensa? Hemos preparado un archivo zip completo con logos, artes clave y capturas de alta fidelidad para tus artículos y directos.
            </p>
            <div className="border-l border-white/10 pl-6 py-2">
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/50 mb-1">
                Guía de uso
              </p>
              <p className="text-brand-textMuted text-xs font-light leading-relaxed">
                Los activos son de uso libre para reseñas, directos y cobertura informativa de los proyectos de Scaletwoo.
              </p>
            </div>
          </div>

          {/* Right downloads cards column */}
          <div className="lg:col-span-7 space-y-6">
            {kits.map((kit, idx) => (
              <a
                key={idx}
                href={kit.href}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-white/5 bg-brand-card/25 hover:bg-brand-card/60 hover:border-brand-gold/20 transition-all duration-300 gap-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mt-1 flex-shrink-0">
                    {kit.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xs font-bold tracking-widest text-white mb-2 uppercase group-hover:text-brand-gold transition-colors duration-300">
                      {kit.title}
                    </h3>
                    <p className="text-brand-textMuted text-xs font-light leading-relaxed tracking-wide max-w-md">
                      {kit.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <span className="text-[10px] font-mono tracking-widest text-white/40">
                    {kit.size}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 group-hover:text-black group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
                    <Download size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
