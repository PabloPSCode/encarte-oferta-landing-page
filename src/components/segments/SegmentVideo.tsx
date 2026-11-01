import CtaButton from "@/components/landing/CtaButton";
import Logo from "@/components/landing/Logo";
import VideoPlayer from "@/components/landing/VideoPlayer";
import { whatsappLink } from "@/content/site";
import { DEFAULT_SEGMENT_VIDEO, type SegmentPage } from "@/content/segments";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { HALFTONE, SegmentHeadline } from "./SegmentLanding";

/**
 * Destino dos anúncios em vídeo de cada segmento (rotas /videos/[segmento]).
 * Sem o menu do site: depois do vídeo, só há dois caminhos, a página do
 * segmento ou a conversa no WhatsApp.
 */
export default function SegmentVideo({ segment }: { segment: SegmentPage }) {
  const video = segment.video ?? DEFAULT_SEGMENT_VIDEO;
  const whatsapp = whatsappLink(
    `Olá, gostaria de saber como funciona o Encarte Oferta para ${segment.myStore}.`
  );

  return (
    <main className="relative min-h-svh overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-strong font-sans">
      <div aria-hidden className={`${HALFTONE} opacity-[0.16] [mask-image:linear-gradient(115deg,transparent_35%,black_85%)]`} />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-white/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-[1000px] flex-col items-center px-4 pb-10 pt-6 text-center sm:px-7 sm:pt-8">
        <Logo />

        <p className="mt-8 inline-flex rounded-full bg-white/70 px-3.5 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-on-brand">
          {segment.eyebrow}
        </p>
        <SegmentHeadline
          headline={segment.headline}
          className="mt-4 max-w-[760px] text-[28px] leading-[1.12] sm:text-[40px]"
        />

        <VideoPlayer videoUrl={video.url} poster={video.poster} title={segment.meta.title} className="mt-9" />

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <CtaButton href={`/${segment.slug}`} arrow className="flex-1 sm:flex-initial">
            Saiba mais
          </CtaButton>
          <CtaButton href={whatsapp} external variant="ghost">
            <WhatsappLogo size={20} weight="fill" />
            Falar no WhatsApp
          </CtaButton>
        </div>

        <nav aria-label="Legal" className="mt-14 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[12px] font-bold text-on-brand-soft">
          <Link href="/termos-de-uso" className="hover:text-on-brand hover:underline">
            Termos de Uso
          </Link>
          <Link href="/politica-de-privacidade" className="hover:text-on-brand hover:underline">
            Política de Privacidade
          </Link>
        </nav>
      </div>
    </main>
  );
}
