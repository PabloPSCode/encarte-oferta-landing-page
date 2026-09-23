import CtaButton from "../CtaButton";
import Eyebrow from "../Eyebrow";
import { CTA_LINK } from "@/content/site";

/** Etapas do editor (encarte-oferta-web/src/data/flyer-editor.ts). */
const STEPS = [
  { title: "Temas", body: "Escolha um tema do para seu encarte." },
  { title: "Produtos", body: "Busque no catálogo ou nos seus produtos e defina os preços ofertados." },
  { title: "Personalização", body: "Ajuste cores, formato do preço, logo, rodapé e as informações de contato da loja." },
  { title: "Publicar", body: "Baixe em PNG, envie pelo WhatsApp, gere o vídeo ou agende no Instagram e no Facebook." },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.2fr]">
        <div className="min-w-0">
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
            Apenas quatro etapas do tema à publicação
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

        <figure className="min-w-0 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_rgba(20,24,40,0.16)]">
          <div aria-hidden className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-accent" />
            <span className="size-2.5 rounded-full bg-brand" />
            <span className="size-2.5 rounded-full bg-[#22C55E]" />
          </div>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/editor-demo-poster.webp"
            width={1100}
            height={602}
            aria-label="Demonstração do editor: escolha do tema, seleção de produtos, personalização e publicação do encarte"
            className="block h-auto w-full"
          >
            <source src="/media/editor-demo.webm" type="video/webm" />
            <source src="/media/editor-demo.mp4" type="video/mp4" />
          </video>
          <figcaption className="sr-only">Editor de encartes do Encarte Oferta em funcionamento</figcaption>
        </figure>
      </div>
    </section>
  );
}
