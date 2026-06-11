import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recovered Tape",
  description:
    "Recovered Tape es un juego de terror found-footage hiperrealista. Explora los clásicos pasillos amarillos de los Backrooms a través de la lente de un camarógrafo perdido.",
  openGraph: {
    title: "Recovered Tape | Scaletwoo Studios",
    description:
      "Un juego de terror found-footage hiperrealista ambientado en los Backrooms.",
  },
};

export default function RecoveredTapeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="es">{children}</div>;
}
