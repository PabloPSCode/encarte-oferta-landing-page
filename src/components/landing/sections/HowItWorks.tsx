import Image from "next/image";
import CtaButton from "../CtaButton";
import Eyebrow from "../Eyebrow";
import { CTA_LINK } from "@/content/site";
import hortifruti from "@/assets/flyers/encarte_hortifruit.webp";
import suplementos from "@/assets/flyers/encarte_loja_suplementos.webp";
import pneus from "@/assets/flyers/encarte_loja_pneus.webp";
import petshop from "@/assets/flyers/encarte_petshop.webp";

/** Etapas do editor (encarte-oferta-web/src/data/flyer-editor.ts). */
const STEPS = [
  { title: "Temas", body: "Escolha um tema do seu ramo ou gere um novo com IA, no formato feed ou stories." },
  { title: "Produtos", body: "Busque no catálogo ou nos seus produtos, defina preço, preço promocional e parcelamento." },
  { title: "Personalização", body: "Ajuste cores, formato do preço, logo, rodapé e as informações de contato da loja." },
  { title: "Publicar", body: "Baixe em PNG, envie pelo WhatsApp, gere o vídeo ou agende no Instagram e no Facebook." },
];

const SHOWCASE = [
  { src: hortifruti, alt: "Encarte de hortifrúti Colheita de Ofertas", className: "" },
  { src: suplementos, alt: "Encarte de loja de suplementos Semana da Creatina", className: "sm:translate-y-10" },
  { src: pneus, alt: "Encarte de loja de pneus Rodando com Economia", className: "" },
  { src: petshop, alt: "Encarte de pet shop Latidos de Ofertas", className: "sm:translate-y-10" },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="min-w-0">
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
            Quatro etapas do tema à publicação
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-2 text-pretty">
            O editor guia você por um fluxo curto e previsível. A prévia acompanha cada alteração em tempo real.
          </p>

          <ol className="relative mt-8 space-y-6 before:absolute before:bottom-4 before:left-[17px] before:top-4 before:w-0.5 before:bg-[repeating-linear-gradient(to_bottom,#FFC814_0_6px,transparent_6px_12px)]">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-4">
                <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-brand text-[14px] font-black text-on-brand ring-4 ring-background">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-[15.5px] font-extrabold text-ink">{s.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-2 text-pretty">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <CtaButton href={CTA_LINK} external arrow variant="brand" className="mt-9">
            Montar meu primeiro encarte
          </CtaButton>
        </div>

        <div className="grid grid-cols-2 gap-4 pb-10 sm:gap-5">
          {SHOWCASE.map((f) => (
            <div
              key={f.alt}
              className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_14px_34px_rgba(20,24,40,0.10)] transition-transform duration-300 hover:-translate-y-1.5 ${f.className}`}
            >
              <Image src={f.src} alt={f.alt} sizes="(min-width: 1024px) 300px, 45vw" className="block h-auto w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
