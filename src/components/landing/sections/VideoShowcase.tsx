"use client";

import { useRef, useState } from "react";
import { Play } from "@phosphor-icons/react/dist/ssr";
import Eyebrow from "../Eyebrow";

type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitRequestFullscreen?: () => Promise<void>;
};

/** Abre o vídeo em tela cheia, com fallback para Safari/iOS. */
function enterFullscreen(video: FullscreenVideo) {
  if (video.requestFullscreen) return video.requestFullscreen().catch(() => undefined);
  if (video.webkitRequestFullscreen) return video.webkitRequestFullscreen();
  video.webkitEnterFullscreen?.();
}

export default function VideoShowcase() {
  const videoRef = useRef<FullscreenVideo>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    enterFullscreen(video);
    video.play().catch(() => undefined);
  };

  return (
    <section id="video" className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="mx-auto max-w-[760px] text-center">
        <Eyebrow>Veja na prática</Eyebrow>
        <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
          Do zero ao encarte publicado em menos de 5 minutos
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-2 text-pretty">
          Assista ao fluxo completo: escolha o tema, adicione os produtos, personalize com a cara da sua loja e publique
          direto no Instagram e no Facebook.
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-[980px] overflow-hidden rounded-[24px] bg-black shadow-[0_24px_60px_rgba(26,20,0,0.25)] ring-1 ring-line">
        <video
          ref={videoRef}
          className="aspect-video h-auto w-full"
          poster="/media/encarte-oferta-flow-poster.webp"
          preload="none"
          playsInline
          controls={started}
        >
          <source src="/media/encarte-oferta-flow-edit-v11.mp4" type="video/mp4" />
        </video>

        {!started && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Assistir ao vídeo em tela cheia"
            className="group absolute inset-0 grid place-items-center bg-black/25 transition-colors hover:bg-black/15"
          >
            <span className="relative grid size-20 place-items-center rounded-full bg-accent text-white shadow-[0_8px_20px_rgba(210,27,27,0.45)] transition-transform duration-200 group-hover:scale-110 sm:size-24">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
              <Play size={36} weight="fill" className="relative translate-x-0.5" />
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
