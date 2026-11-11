import CtaButton from "@/components/landing/CtaButton";
import { CTA_LINK } from "@/content/site";
import clsx from "clsx";
import Link from "next/link";

/** Chamada para contratar, no fim da listagem e na lateral do artigo. */
export default function BlogCta({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[22px] bg-accent text-white",
        compact ? "p-6" : "px-6 py-10 sm:px-12 sm:py-12",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#FFFFFF_1.2px,transparent_1.3px)] [background-size:18px_18px] [mask-image:linear-gradient(115deg,transparent_35%,black_90%)]"
      />
      <div className={clsx("relative", !compact && "flex flex-col gap-8 md:flex-row md:items-center md:justify-between")}>
        <div className={clsx(!compact && "max-w-[620px]")}>
          <p className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-brand">Encarte Oferta</p>
          <h2
            className={clsx(
              "mt-2 font-black leading-[1.1] tracking-[-0.03em] text-balance",
              compact ? "text-[22px]" : "text-[28px] sm:text-[36px]"
            )}
          >
            Coloque estas dicas em prática na sua loja
          </h2>
          <p className={clsx("mt-3 leading-relaxed text-white/85 text-pretty", compact ? "text-[13.5px]" : "text-[15.5px]")}>
            Crie encartes de ofertas em minutos, gere vídeos narrados e agende a publicação no Instagram e no Facebook.
          </p>
        </div>
        <div className={clsx("flex flex-col gap-2.5", compact ? "mt-5" : "shrink-0 sm:flex-row md:flex-col")}>
          <CtaButton href={CTA_LINK} external arrow variant="brand" className={clsx(compact && "w-full px-5 py-3.5 text-[14px]")}>
            Quero meus encartes
          </CtaButton>
          <Link
            href="/#planos"
            className={clsx(
              "inline-flex items-center justify-center rounded-[13px] border-[1.5px] border-white/30 font-extrabold text-white transition-colors hover:border-white hover:bg-white/10",
              compact ? "px-5 py-3 text-[13.5px]" : "px-7 py-4 text-[15px]"
            )}
          >
            Ver os planos
          </Link>
        </div>
      </div>
    </div>
  );
}
