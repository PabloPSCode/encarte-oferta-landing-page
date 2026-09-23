import hortifruti from "@/assets/flyers/encarte_hortifruit.webp";
import mercearia from "@/assets/flyers/encarte_mercearia.webp";
import lojaPneus from '@/assets/flyers/encarte_loja_pneus.webp';
import { CTA_LINK } from "@/content/site";
import Image from "next/image";
import CtaButton from "../CtaButton";

const STATS = [
  { value: "4 etapas", label: "do tema à publicação" },
  { value: "+40 mil", label: "produtos no catálogo" },
  { value: "10 ramos", label: "com temas próprios" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-strong">
      {/* retícula de impressão, lembrando o encarte de papel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#1A1400_1.2px,transparent_1.3px)] [background-size:18px_18px] [mask-image:linear-gradient(115deg,transparent_35%,black_85%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-white/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 pb-20 pt-14 sm:px-7 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
        <div className="min-w-0">
          <h1 className="mt-5 text-[40px] font-black leading-[1.04] tracking-[-0.035em] text-on-brand text-balance sm:text-[54px] lg:text-[60px]">
            Seu encarte de ofertas pronto em{" "}
            <span className="whitespace-nowrap">
              <span className="relative inline-block -rotate-2 rounded-[10px] bg-accent px-3 pb-1 text-white shadow-[0_8px_0_#9A1414]">
                minutos
              </span>
              ,
            </span>{" "}
            não em dias.
          </h1>
          <p className="mt-6 max-w-[540px] text-[16.5px] font-medium leading-relaxed text-on-brand-soft text-pretty">
            Escolha um tema, selecione os produtos do catálogo, defina os preços
            e publique no Instagram e no Facebook, com vídeo narrado para Reels
            e Stories. Sem designer e sem editor complicado.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton href={CTA_LINK} external arrow>
              Quero meus encartes
            </CtaButton>
            <CtaButton href="#como-funciona" variant="ghost">
              Ver como funciona
            </CtaButton>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-9 gap-y-5">
            {STATS.map((s) => (
              <div key={s.value}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[27px] font-black tracking-[-0.03em] text-on-brand">
                  {s.value}
                </dd>
                <dd className="mt-0.5 text-[12.5px] font-semibold text-on-brand-soft">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto flex min-h-[420px] w-full max-w-[520px] items-center justify-center sm:min-h-[500px]">
          <Image
            src={hortifruti}
            alt="Encarte de hortifrúti com frutas e verduras"
            sizes="200px"
            className="absolute bottom-[4%] left-0 z-10 w-[40%] max-w-[200px] animate-float-b rounded-md shadow-float"
          />
          <Image
            src={lojaPneus}
            alt="Encarte de loja de pneus"
            sizes="190px"
            className="absolute right-0 top-[2%] z-10 w-[37%] max-w-[190px] animate-float-b rounded-md shadow-float [animation-delay:-3s] [animation-direction:reverse]"
          />
          <Image
            src={mercearia}
            alt="Encarte de supermercado Preço Baixo Todo Dia"
            priority
            sizes="(min-width: 640px) 290px, 58vw"
            className="relative z-20 w-[58%] max-w-[290px] animate-float-a rounded-md shadow-float"
          />
  
        </div>
      </div>
    </section>
  );
}
