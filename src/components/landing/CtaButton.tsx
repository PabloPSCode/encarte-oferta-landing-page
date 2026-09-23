import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";

type Variant = "ink" | "brand" | "ghost" | "accent";

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
}

const styles: Record<Variant, string> = {
  ink: "bg-on-brand text-brand hover:bg-black",
  brand: "bg-gradient-to-br from-brand to-brand-strong text-on-brand shadow-brand hover:brightness-105",
  ghost: "bg-white/75 text-on-brand hover:bg-white",
  accent: "bg-gradient-to-br from-accent to-accent-strong text-white shadow-[0_8px_20px_rgba(210,27,27,0.35)] hover:brightness-110",
};

export default function CtaButton({
  href,
  children,
  variant = "ink",
  arrow = false,
  external = false,
  className,
}: CtaButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={clsx(
        "group inline-flex items-center justify-center gap-2.5 rounded-[13px] px-7 py-4 text-[15px] font-extrabold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 active:scale-[0.98]",
        styles[variant],
        className
      )}
    >
      {children}
      {arrow && <ArrowRight weight="bold" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />}
    </a>
  );
}
