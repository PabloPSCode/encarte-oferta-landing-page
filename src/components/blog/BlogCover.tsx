import clsx from "clsx";
import Image from "next/image";

interface BlogCoverProps {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Capa do post, preenchendo o contêiner (que precisa ser `relative`). Sem capa no
 * Blog Manager, mostra um fundo amarelo da marca com o ícone do Encarte Oferta.
 */
export default function BlogCover({ src, alt, sizes, priority, className }: BlogCoverProps) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={clsx("object-cover", className)} />;
  }

  return (
    <div aria-hidden className={clsx("absolute inset-0 bg-gradient-to-br from-brand to-brand-strong", className)}>
      <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#1A1400_1.2px,transparent_1.3px)] [background-size:18px_18px]" />
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG decorativo e estático */}
      <img
        src="/brand/logo-icon.svg"
        alt=""
        className="absolute right-[8%] top-1/2 h-[58%] w-auto -translate-y-1/2 rotate-[-8deg] opacity-90 drop-shadow-[0_18px_30px_rgba(26,20,0,0.25)]"
      />
    </div>
  );
}
