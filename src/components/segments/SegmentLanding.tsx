import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import CtaButton from "@/components/landing/CtaButton";
import Eyebrow from "@/components/landing/Eyebrow";
import Plans from "@/components/landing/sections/Plans";
import Ticker from "@/components/landing/sections/Ticker";
import Warranty from "@/components/landing/sections/Warranty";
import { REFUND_POLICY, SUPPORT, whatsappLink } from "@/content/site";
import { FLYER_SIZE, SEGMENT_PAGES, type SegmentPage } from "@/content/segments";
import { ArrowRight, Check, Warning, X } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

/** Selo de oferta em estrela, como os de encarte impresso. */
const STARBURST = (() => {
  const tips = 14;
  const points = Array.from({ length: tips * 2 }, (_, i) => {
    const r = i % 2 === 0 ? 50 : 41;
    const a = (Math.PI * i) / tips - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`;
  });
  return `polygon(${points.join(",")})`;
})();

const HALFTONE =
  "pointer-events-none absolute inset-0 [background-image:radial-gradient(#1A1400_1.2px,transparent_1.3px)] [background-size:18px_18px]";

export default function SegmentLanding({ segment }: { segment: SegmentPage }) {
  const cta = whatsappLink(segment.whatsappMessage);

  return (
    <div className="overflow-x-clip font-sans">
      <Header />
      <main>
        <SegmentHero segment={segment} cta={cta} />
        <Ticker />
        <Pains segment={segment} />
        {segment.how && <HowItWorks how={segment.how} cta={cta} />}
        <Benefits segment={segment} />
        <Shift segment={segment} />
        <Plans />
        <Warranty />
        <Closing segment={segment} cta={cta} />
        <OtherSegments current={segment.slug} />
      </main>
      <Footer />
    </div>
  );
}

function SegmentHero({ segment, cta }: { segment: SegmentPage; cta: string }) {
  const [before, highlight, after] = segment.headline;
  const trust = ["Sem depender de designer", "Sem instalar nada", `Garantia de ${REFUND_POLICY.days} dias`];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-strong">
      <div aria-hidden className={`${HALFTONE} opacity-[0.16] [mask-image:linear-gradient(115deg,transparent_35%,black_85%)]`} />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-white/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-4 pb-20 pt-8 sm:px-7 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-12">
        <div className="min-w-0">
          <nav aria-label="Trilha de navegação">
            <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-bold text-on-brand-soft">
              <li>
                <Link href="/" className="hover:text-on-brand hover:underline">
                  Início
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/#segmentos" className="hover:text-on-brand hover:underline">
                  Segmentos
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-on-brand">
                {segment.label}
              </li>
            </ol>
          </nav>

          <p className="mt-8 inline-flex rounded-full bg-white/70 px-3.5 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-on-brand">
            {segment.eyebrow}
          </p>
          <h1 className="mt-5 text-[36px] font-black leading-[1.08] tracking-[-0.035em] text-on-brand text-balance sm:text-[50px] lg:text-[54px]">
            {before}{" "}
            <span className="relative inline-block -rotate-2 rounded-[10px] bg-accent px-3 pb-1 text-white shadow-[0_8px_0_#9A1414]">
              {highlight}
            </span>
            {/^[.,!?]/.test(after) ? after : ` ${after}`}
          </h1>
          <p className="mt-6 max-w-[580px] text-[16.5px] font-medium leading-relaxed text-on-brand-soft text-pretty">
            {segment.lead}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton href={cta} external arrow>
              Quero meus encartes
            </CtaButton>
            {segment.how ? (
              <CtaButton href="#como-funciona" variant="ghost">
                Ver como funciona
              </CtaButton>
            ) : (
              <CtaButton href="#planos" variant="ghost">
                Ver os planos
              </CtaButton>
            )}
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-2 text-[13px] font-bold text-on-brand-soft">
                <span className="grid size-5 place-items-center rounded-full bg-accent text-white">
                  <Check size={12} weight="bold" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <FlyerShowcase segment={segment} />
      </div>
    </section>
  );
}

function FlyerShowcase({ segment }: { segment: SegmentPage }) {
  return (
    <figure
      className="relative mx-auto w-[80%] max-w-[400px] lg:w-full"
      style={{ "--segment": segment.glow } as CSSProperties}
    >
      <div aria-hidden className="absolute inset-[6%] rounded-full bg-[var(--segment)] opacity-50 blur-[70px]" />
      {/* folha de trás, na cor do encarte, como um maço de panfletos */}
      <div aria-hidden className="absolute inset-0 rotate-[5deg] rounded-[14px] bg-[var(--segment)] shadow-float" />
      <Image
        src={segment.flyer.src}
        alt={segment.flyer.alt}
        width={FLYER_SIZE.width}
        height={FLYER_SIZE.height}
        priority
        sizes="(min-width: 1024px) 400px, 80vw"
        className="relative h-auto w-full animate-float-a rounded-[14px] shadow-float ring-4 ring-white motion-reduce:-rotate-2 motion-reduce:animate-none"
      />
      {/* no canto do rodapé, para não cobrir o título do encarte */}
      <div aria-hidden className="absolute -bottom-10 -left-6 -rotate-12 drop-shadow-[0_6px_0_#9A1414] sm:-left-10">
        <div
          className="grid size-[108px] place-items-center bg-accent text-center text-white"
          style={{ clipPath: STARBURST }}
        >
          <span className="text-[12.5px] font-black uppercase leading-[1.05] tracking-wide">
            Pronto
            <br />
            em
            <br />
            minutos
          </span>
        </div>
      </div>
      <figcaption className="absolute -bottom-5 right-0 rotate-2 rounded-full bg-white px-4 py-2 text-[11.5px] font-extrabold text-on-brand shadow-[0_10px_24px_rgba(26,20,0,0.22)] sm:right-4">
        Exemplo criado no Encarte Oferta
      </figcaption>
    </figure>
  );
}

function Pains({ segment }: { segment: SegmentPage }) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-7">
      <div className="max-w-[680px]">
        <Eyebrow>O desafio</Eyebrow>
        <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
          Você conhece essa cena?
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {segment.pains.map((p) => (
          <article key={p.title} className="relative overflow-hidden rounded-[20px] border border-line bg-surface p-7">
            <span aria-hidden className="absolute -right-1 -top-9 text-[140px] font-black leading-none text-accent-tint">
              ”
            </span>
            <span className="relative grid size-11 place-items-center rounded-[13px] bg-accent-tint text-accent">
              <Warning size={22} weight="bold" />
            </span>
            <h3 className="relative mt-5 text-[17.5px] font-extrabold tracking-[-0.01em] text-ink text-balance">{p.title}</h3>
            <p className="relative mt-2 text-[14px] leading-relaxed text-ink-2 text-pretty">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks({ how, cta }: { how: NonNullable<SegmentPage["how"]>; cta: string }) {
  return (
    <section id="como-funciona" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pt-28 sm:px-7">
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.2fr]">
        <div className="min-w-0">
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
            {how.title}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-2 text-pretty">
            Um sistema simples de usar, no computador, no tablet ou no celular. A prévia do encarte acompanha cada
            alteração em tempo real.
          </p>

          <ol className="relative mt-8 space-y-6 before:absolute before:bottom-4 before:left-[17px] before:top-4 before:w-0.5 before:bg-[repeating-linear-gradient(to_bottom,#FFC814_0_6px,transparent_6px_12px)]">
            {how.steps.map((s, i) => (
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

          <CtaButton href={cta} external arrow variant="brand" className="mt-9">
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

function Benefits({ segment }: { segment: SegmentPage }) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="max-w-[680px]">
        <Eyebrow>Por que funciona</Eyebrow>
        <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
          {segment.benefitsTitle}
        </h2>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {segment.benefits.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className="group rounded-[20px] border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_18px_40px_rgba(224,166,0,0.18)]"
          >
            <span className="grid size-12 place-items-center rounded-[14px] bg-brand-tint text-brand-ink transition-colors group-hover:bg-brand group-hover:text-on-brand">
              <Icon size={24} weight="bold" />
            </span>
            <h3 className="mt-5 text-[17px] font-extrabold tracking-[-0.01em] text-ink text-balance">{title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2 text-pretty">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Shift({ segment }: { segment: SegmentPage }) {
  return (
    <section className="relative mt-28 overflow-hidden bg-accent">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#FFC814_1.2px,transparent_1.3px)] [background-size:20px_20px]"
      />
      <div className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-7">
        <h2 className="mx-auto max-w-[720px] text-center text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-white text-balance sm:text-[40px]">
          Antes e depois do <span className="text-brand">Encarte Oferta</span>
        </h2>
        <div className="mx-auto mt-12 grid max-w-[980px] items-center gap-6 md:grid-cols-2">
          <div className="rounded-[22px] border border-white/10 bg-black/15 p-7 sm:p-8">
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-white/60">Hoje, sem o Encarte Oferta</h3>
            <ul className="mt-5 space-y-4">
              {segment.shift.before.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug text-white/75">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-white/70">
                    <X size={13} weight="bold" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[22px] bg-brand p-7 shadow-[0_22px_50px_rgba(0,0,0,0.3)] sm:p-8 md:-rotate-1">
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand-ink">Com o Encarte Oferta</h3>
            <ul className="mt-5 space-y-4">
              {segment.shift.after.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] font-bold leading-snug text-on-brand">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <Check size={13} weight="bold" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Closing({ segment, cta }: { segment: SegmentPage; cta: string }) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand to-brand-strong px-6 py-12 sm:px-12 sm:py-14">
        <div aria-hidden className={`${HALFTONE} opacity-[0.14] [mask-image:linear-gradient(115deg,transparent_30%,black_90%)]`} />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <h2 className="text-[30px] font-black leading-[1.08] tracking-[-0.035em] text-on-brand text-balance sm:text-[42px]">
              {segment.closing.title}
            </h2>
            <p className="mt-4 max-w-[560px] text-[16px] font-medium leading-relaxed text-on-brand-soft text-pretty">
              {segment.closing.body}
            </p>
            <CtaButton href={cta} external arrow className="mt-8 px-9 py-5 text-[16px]">
              Quero meus encartes
            </CtaButton>
            <p className="mt-4 text-[12.5px] font-semibold text-on-brand-soft">
              Atendimento pelo WhatsApp: {SUPPORT.whatsappHours.toLowerCase()}.
            </p>
          </div>
          <div className="relative mx-auto hidden w-full max-w-[250px] lg:block">
            <Image
              src={segment.flyer.src}
              alt=""
              width={FLYER_SIZE.width}
              height={FLYER_SIZE.height}
              sizes="250px"
              className="h-auto w-full rotate-3 rounded-[12px] shadow-float ring-4 ring-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function OtherSegments({ current }: { current: string }) {
  return (
    <section aria-labelledby="outros-segmentos" className="mx-auto max-w-[1200px] px-4 pt-20 sm:px-7">
      <h2 id="outros-segmentos" className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-ink-soft">
        O Encarte Oferta também atende
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2.5">
        {SEGMENT_PAGES.filter((s) => s.slug !== current).map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${s.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-[13.5px] font-bold text-ink-2 transition-colors hover:border-accent hover:bg-accent-tint hover:text-accent"
            >
              {s.label}
              <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
