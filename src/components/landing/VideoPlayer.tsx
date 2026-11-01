"use client";

import { Play } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useRef, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  poster?: string;
  /** Nome acessível do vídeo, lido pelos leitores de tela. */
  title: string;
  className?: string;
}

/**
 * Player nativo que segue o formato do vídeo: o horizontal ocupa a largura
 * disponível e o vertical (reels, stories) fica limitado à altura da tela.
 * Até o primeiro play, um botão grande cobre o vídeo; depois, ficam os controles nativos.
 */
export default function VideoPlayer({ videoUrl, poster, title, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => undefined);
  };

  return (
    <div className={clsx("relative max-w-full overflow-hidden rounded-[20px] bg-black shadow-float ring-4 ring-white", className)}>
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        aria-label={title}
        controls={started}
        playsInline
        preload="metadata"
        className="block h-auto max-h-[65svh] w-auto max-w-full"
      />

      {!started && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={`Assistir ao vídeo: ${title}`}
          className="group absolute inset-0 grid place-items-center bg-black/30 transition-colors hover:bg-black/20 focus-visible:outline-none"
        >
          <span className="relative grid size-24 place-items-center sm:size-32">
            <span
              aria-hidden
              className="absolute -inset-4 animate-pulse rounded-full bg-white/45 motion-reduce:animate-none sm:-inset-6"
            />
            <span className="relative grid size-full place-items-center rounded-full bg-accent text-white shadow-[0_10px_30px_rgba(210,27,27,0.55)] ring-4 ring-white transition-transform duration-200 group-hover:scale-110 group-focus-visible:ring-brand">
              <Play weight="fill" className="size-11 translate-x-1 sm:size-14" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
