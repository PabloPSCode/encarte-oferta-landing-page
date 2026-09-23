import Image from "next/image";
import CtaButton from "../CtaButton";
import { CTA_LINK } from "@/content/site";
import homeHero from "@/assets/flyers/home_hero.webp";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand to-brand-strong px-5 pb-10 pt-12 text-center shadow-[0_24px_60px_rgba(224,166,0,0.35)] sm:px-12 sm:pb-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(#1A1400_1.2px,transparent_1.3px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        />
        <div className="relative mx-auto max-w-[720px]">
          <h2 className="text-[32px] font-black leading-[1.08] tracking-[-0.035em] text-on-brand text-balance sm:text-[46px]">
            Publique sua próxima oferta hoje mesmo
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] font-medium leading-relaxed text-on-brand-soft text-pretty">
            Fale com a nossa equipe, escolha o plano, conecte suas redes e coloque o encarte no ar antes do próximo fim de
            semana.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-[980px]">
          <Image
            src={homeHero}
            alt="Encartes criados no Encarte Oferta para pneus, pet shop, suplementos, hortifrúti e supermercado"
            sizes="(min-width: 1024px) 980px, 92vw"
            className="h-auto w-full rounded-[20px] shadow-[0_24px_60px_rgba(26,20,0,0.35)] ring-4 ring-white/60"
          />
        </div>

        <CtaButton href={CTA_LINK} external arrow className="relative mt-10 px-9 py-5 text-[16px]">
          Quero criar meus encartes
        </CtaButton>
        <p className="relative mt-4 text-[12.5px] font-semibold text-on-brand-soft">
          Atendimento pelo WhatsApp, de segunda a sexta, das 9h às 18h.
        </p>
      </div>
    </section>
  );
}
