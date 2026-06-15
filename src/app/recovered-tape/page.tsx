"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { GameHero } from "@/components/game/GameHero";
import { GameAbout } from "@/components/game/GameAbout";
import { GameFeatures } from "@/components/game/GameFeatures";
import { Gallery } from "@/components/ui/gallery";
import { GameTimeline } from "@/components/game/GameTimeline";
import { GameSteam } from "@/components/game/GameSteam";
import { Accordion } from "@/components/ui/accordion";
import { GameMediaKit } from "@/components/game/GameMediaKit";
import { Footer } from "@/components/Footer";
import { GameScrollBackground } from "@/components/game/GameScrollBackground";

const GALLERY_PHOTOS = [
  {
    file: "WhatsApp Image 2026-05-21 at 23.58.34.jpeg",
    alt: "Pasillo de hotel iluminado por lámparas cálidas que se pierde en la oscuridad.",
    caption: "Corredor del hotel",
  },
  {
    file: "WhatsApp Image 2026-05-22 at 00.01.13.jpeg",
    alt: "Sala amarilla con mesa de té, sillas de cuero y estética found footage.",
    caption: "Salón de té",
  },
  {
    file: "WhatsApp Image 2026-05-22 at 00.01.51.jpeg",
    alt: "Gran sala vacía con pilares, papel pintado amarillo y luz fluorescente tenue.",
    caption: "Sala de pilares",
  },
  {
    file: "WhatsApp Image 2026-05-26 at 00.11.28.jpeg",
    alt: "Escalera con barandilla de madera y sombras profundas en un interior liminal.",
    caption: "Zona de escaleras",
  },
  {
    file: "WhatsApp Image 2026-05-26 at 00.16.07.jpeg",
    alt: "Sala de espera iluminada por la linterna del jugador, con pilares y asientos metálicos.",
    caption: "Sala de espera — Linterna",
  },
  {
    file: "WhatsApp Image 2026-05-26 at 00.17.08.jpeg",
    alt: "Interior amplio con luces circulares en el techo, asientos y puerta al fondo.",
    caption: "Sala de espera — Luces",
  },
] as const;

export default function RecoveredTapePage() {
  const galleryImages = GALLERY_PHOTOS.map((photo, index) => ({
    id: `sc-${index + 1}`,
    src: `/FotosRecoveredTape/${encodeURIComponent(photo.file)}`,
    alt: photo.alt,
    caption: photo.caption,
  }));

  const faqItems = [
    {
      id: "faq-1",
      title: "¿Cuál es la fecha de lanzamiento de Recovered Tape?",
      content: "Recovered Tape está actualmente en desarrollo activo. Nuestro objetivo es una fase de pruebas cerradas en el cuarto trimestre de 2026, seguida de un lanzamiento público en Steam a principios de 2027. La ficha de Steam y la lista de deseos estarán disponibles próximamente.",
    },
    {
      id: "faq-2",
      title: "¿El juego será compatible con realidad virtual (VR)?",
      content: "Sí. Dada la perspectiva de cámara found-footage y nuestro énfasis en escalas físicas hiperrealistas, la realidad virtual encaja perfectamente. Actualmente estamos prototipando soporte completo para cascos VR y mandos de movimiento para implementación tras el lanzamiento.",
    },
    {
      id: "faq-3",
      title: "¿El juego depende de sustos repentinos?",
      content: "No. Recovered Tape se centra en el terror psicológico de combustión lenta, la claustrofobia y las señales de audio ambientales. Aunque hay encuentros tensos, evitamos estrictamente picos de volumen artificiales o gráficos de susto emergentes.",
    },
    {
      id: "faq-4",
      title: "¿Cuáles son los requisitos de hardware?",
      content: "Debido a nuestro énfasis en activos fotogramétricos y cálculos de luz volumétrica, recomendamos un procesador quad-core moderno y al menos una tarjeta gráfica NVIDIA RTX 2060 o AMD RX 5700 XT para 1080p a 60 FPS en ajustes altos. Las guías completas de optimización se publicarán durante la fase beta.",
    },
    {
      id: "faq-5",
      title: "¿Cuánto dura la partida?",
      content: "La campaña narrativa principal dura aproximadamente de 3 a 4 horas. Sin embargo, debido al diseño no lineal de los niveles y los módulos de pasillos cambiantes, las partidas exploratorias pueden extenderse considerablemente.",
    },
  ];

  return (
    <>
      <GameScrollBackground />

      <Navbar locale="es" />

      <main className="relative flex-grow">
        <GameHero />
        <GameAbout />
        <GameFeatures />

        <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
                Capturas del motor
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-wider uppercase leading-none mb-6">
              Galería de <span className="stencil-text-gold">capturas</span>
            </h2>
            <p className="text-brand-textMuted text-sm leading-relaxed font-light tracking-wide">
              Todo el material mostrado a continuación proviene directamente de builds en tiempo real del motor. Demuestra las distorsiones de resolución de cámara VHS y los diseños espaciales físicos.
            </p>
          </div>

          <Gallery images={galleryImages} locale="es" />
        </section>

        <GameTimeline />
        <GameSteam />

        <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto z-10 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
                Soporte e información
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-wider uppercase leading-none mb-6">
              Preguntas <span className="stencil-text-gold">frecuentes</span>
            </h2>
          </div>

          <Accordion items={faqItems} />
        </section>

        <GameMediaKit />

        <section className="py-24 md:py-32 px-6 md:px-12 max-w-3xl mx-auto text-center z-10 relative">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
              Consultas
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-wider uppercase leading-tight mb-6">
            PRENSA Y <br />
            <span className="stencil-text-gold">CREADORES</span>
          </h2>
          <p className="text-brand-textMuted text-sm leading-relaxed font-light tracking-wide mb-8">
            ¿Eres streamer, YouTuber o reseñador y quieres cubrir el juego? Apúntate a nuestra lista de distribución de prensa. Los creadores cualificados reciben claves de prueba y devlogs exclusivos.
          </p>
          <a
            href="mailto:press@scaletwoo.com"
            className="text-white hover:text-brand-gold font-display text-sm tracking-widest font-semibold transition-colors duration-300 border-b border-white/20 pb-1"
          >
            PRESS@SCALETWOO.COM
          </a>
        </section>

      </main>

      <Footer locale="es" />
    </>
  );
}
