"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  genre: string;
  status: string;
  image: string;
  href: string;
  isClassified?: boolean;
}

export const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: "recovered-tape",
      title: "Recovered Tape",
      subtitle: "Terror VHS hiperrealista de los Backrooms",
      desc: "Sumérgete en un juego de terror psicológico found-footage. Explora el laberinto infinito de paredes amarillas de los Backrooms, grabando cada detalle en una cinta VHS en bruto.",
      genre: "Terror psicológico / Found footage",
      status: "En desarrollo / Lista de deseos",
      image: "/WhatsApp Image 2026-05-21 at 16.19.36.jpeg",
      href: "/recovered-tape",
    },
  ];

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-[10px] uppercase font-semibold tracking-[0.45em] text-brand-gold">
              Portafolio
            </span>
            <span className="w-8 h-[1px] bg-brand-gold/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-wider uppercase leading-none">
            Proyectos <br />
            <span className="stencil-text-gold">destacados</span>
          </h2>
        </div>
        <p className="text-brand-textMuted text-sm max-w-md font-light leading-relaxed tracking-wide">
          Nuestro objetivo principal es crear experiencias singulares. Nos centramos en una gran producción a la vez, garantizando un pulido técnico excepcional y una integridad artística sólida.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {projects.map((project) => {
          const cardContent = (
            <motion.div
              className={`relative h-[480px] rounded-2xl overflow-hidden border border-white/5 bg-brand-card flex flex-col justify-end p-8 group transition-all duration-500 hover:border-brand-gold/20 ${project.isClassified ? "cursor-default opacity-85 hover:opacity-100" : "cursor-pointer"
                }`}
              whileHover={project.isClassified ? {} : { y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover transition-transform duration-700 ease-out ${project.isClassified ? "filter grayscale brightness-[0.25]" : "group-hover:scale-105 filter brightness-75"
                    }`}
                  unoptimized
                />
                {project.isClassified && (
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0.9))] z-0" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />
              </div>

              <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
                <span className="text-[9px] uppercase font-bold tracking-widest bg-black/60 backdrop-blur-sm px-3 py-1 rounded border border-white/10 text-brand-gold">
                  {project.status}
                </span>
                {!project.isClassified && (
                  <div className="w-8 h-8 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-brand-gold group-hover:text-black group-hover:border-brand-gold transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                )}
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold mb-2 block">
                  {project.genre}
                </span>
                <h3 className="text-2xl font-display font-bold tracking-wider text-white mb-3 uppercase">
                  {project.title}
                </h3>
                <p className="text-brand-textMuted text-xs font-light leading-relaxed tracking-wide mb-4">
                  {project.desc}
                </p>
                <div className="w-full h-[1px] bg-white/5 my-4" />
                <span className="text-[10px] text-white/50 font-medium tracking-widest uppercase">
                  {project.subtitle}
                </span>
              </div>
            </motion.div>
          );

          if (project.isClassified) {
            return <div key={project.id}>{cardContent}</div>;
          }

          return (
            <Link href={project.href} key={project.id} className="block">
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
