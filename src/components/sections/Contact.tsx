"use client";

import React from "react";

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        <div className="lg:col-span-5">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
              Contacto
            </span>
            <span className="w-8 h-[1px] bg-brand-gold/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-wider leading-tight mb-8">
            CONECTA CON <br />
            <span className="stencil-text-gold">SCALETWOO</span>
          </h2>
          <p className="text-brand-textMuted text-sm font-light leading-relaxed tracking-wide mb-8 max-w-sm">
            Para consultas de prensa, colaboraciones o negocios, usa las direcciones de correo directo a continuación.
          </p>

          <div className="space-y-4 text-xs tracking-wider uppercase font-semibold">
            <div>
              <p className="text-brand-gold mb-1">Prensa y creadores</p>
              <a href="mailto:press@scaletwoo.com" className="text-white hover:text-brand-goldLight transition-colors">
                press@scaletwoo.com
              </a>
            </div>
            <div>
              <p className="text-brand-gold mb-1">Consultas comerciales</p>
              <a href="mailto:biz@scaletwoo.com" className="text-white hover:text-brand-goldLight transition-colors">
                biz@scaletwoo.com
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex items-center justify-center rounded-2xl glass-panel p-10">
          <div className="text-sm text-brand-textMuted leading-relaxed tracking-wide max-w-xl">
            <p className="mb-4">
              Hemos quitado el formulario de envío porque no está configurado para mandar correos reales.
            </p>
            <p>
              Si quieres escribirnos, utiliza directamente las direcciones de correo electrónico de prensa o negocios que están en esta sección.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
