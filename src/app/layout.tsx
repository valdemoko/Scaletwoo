import type { Metadata, Viewport } from "next";
import { Outfit, Syncopate } from "next/font/google";
import "./globals.css";
// LenisProvider: client-side smooth scroll provider
import LenisProvider from "@/components/LenisProvider";
import ParallaxLayers from "@/components/ParallaxLayers";
import FogOverlay from "@/components/FogOverlay";
import CursorLight from "@/components/CursorLight";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-syncopate",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Scaletwoo Studios | Videojuegos atmosféricos inmersivos",
    template: "%s | Scaletwoo Studios",
  },
  description: "Sitio web oficial de Scaletwoo, un estudio de videojuegos independiente que crea experiencias de terror found-footage hiperrealistas, atmosféricas e inmersivas.",
  keywords: ["Scaletwoo", "Recovered Tape", "Juego Backrooms", "Juego de terror", "Estudio indie", "Terror found footage", "Terror hiperrealista", "Juego Steam"],
  authors: [{ name: "Scaletwoo Studios" }],
  creator: "Scaletwoo Studios",
  metadataBase: new URL("https://scaletwoo.com"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://scaletwoo.com",
    title: "Scaletwoo Studios | Videojuegos atmosféricos inmersivos",
    description: "Sitio web oficial de Scaletwoo, creadores del juego de terror hiperrealista de los Backrooms Recovered Tape.",
    siteName: "Scaletwoo Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scaletwoo Studios - Recovered Tape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scaletwoo Studios | Videojuegos atmosféricos inmersivos",
    description: "Creadores de Recovered Tape, un juego de terror hiperrealista de los Backrooms.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${syncopate.variable} font-sans bg-brand-bg text-white antialiased selection:bg-brand-gold selection:text-black`}
      >
        {/* VHS / Scanline Overlay system for Found-Footage Aesthetic */}
        <LenisProvider />
        {/* Background depth + effects */}
        <ParallaxLayers />
        <FogOverlay />
        <CursorLight />
        <div className="noise-overlay" />
        <div className="scanlines" />
        <div className="cinematic-vignette" />
        
        {/* Main site container */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
