import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

/** Faixa amarela do topo das páginas do blog, no mesmo padrão das páginas legais. */
export default function BlogHero({
  crumbs,
  children,
  className,
}: {
  crumbs: Crumb[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-strong">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(#1A1400_1.2px,transparent_1.3px)] [background-size:18px_18px] [mask-image:linear-gradient(115deg,transparent_40%,black_90%)]"
      />
      <div className={clsx("relative mx-auto max-w-[1200px] px-4 pb-14 pt-10 sm:px-7 sm:pb-16", className)}>
        <nav aria-label="Você está em">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] font-bold text-on-brand-soft">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex min-w-0 items-center gap-1.5">
                {i > 0 && <CaretRightIcon size={12} weight="bold" aria-hidden className="shrink-0 opacity-60" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-on-brand hover:underline hover:underline-offset-2">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="max-w-[60vw] truncate text-on-brand sm:max-w-[420px]">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </div>
    </section>
  );
}
