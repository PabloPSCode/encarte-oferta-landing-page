/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
//@ts-ignore
import "../styles/globals.css";
import { SITE } from "@/content/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Encarte Oferta — Encartes de ofertas prontos em minutos",
    template: "%s | Encarte Oferta",
  },
  description:
    "Crie encartes de ofertas em minutos: escolha um tema, selecione os produtos do catálogo, gere vídeo narrado e agende a publicação no Instagram e no Facebook.",
  applicationName: "Encarte Oferta",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Encarte Oferta",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFC814",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
