"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
// Vision and CallToAction removed per update
import { Footer } from "@/components/Footer";
import BackgroundCanvasClient from "@/components/canvas/BackgroundCanvasClient";

export default function Home() {
  return (
    <>
      {/* 3D Animated Background Canvas */}
      <BackgroundCanvasClient />

      {/* Global Navbar */}
      <Navbar locale="es" />

      {/* Main Sections */}
      <main className="relative flex-grow">
        {/* Cinematic Hero block */}
        <Hero />

        {/* Studio Philosophy section */}
        <About />

        {/* Featured Projects portfolio */}
        <Projects />

        {/* Vision and CallToAction sections removed */}
      </main>

      {/* Global Footer */}
      <Footer locale="es" />
    </>
  );
}
