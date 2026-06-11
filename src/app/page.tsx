"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Vision } from "@/components/sections/Vision";
import { Contact } from "@/components/sections/Contact";
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

        {/* Core Values & Tech vision */}
        <Vision />

        {/* Contact form */}
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer locale="es" />
    </>
  );
}
