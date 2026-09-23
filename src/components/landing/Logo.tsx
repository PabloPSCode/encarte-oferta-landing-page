import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface LogoProps {
  className?: string;
  height?: number;
}

/** Wordmark oficial (encarte-oferta-web/src/assets/logo_text.svg). */
export default function Logo({ className, height = 30 }: LogoProps) {
  const width = Math.round((195 / 31) * height);
  return (
    <Link href="/" aria-label="Encarte Oferta — página inicial" className={clsx("inline-flex shrink-0", className)}>
      <Image src="/brand/logo-text.svg" alt="Encarte Oferta" width={width} height={height} priority />
    </Link>
  );
}
