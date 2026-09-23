"use client";

import { CTA_LINK, SITE } from "@/content/site";
import { List, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = [
  { href: "/#recursos", label: "Recursos" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#segmentos", label: "Segmentos" },
  { href: "/#planos", label: "Planos" },
  { href: "/#duvidas", label: "Dúvidas" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-brand transition-shadow duration-300",
        scrolled ? "shadow-[0_8px_24px_rgba(26,20,0,0.18)]" : "border-b border-black/10"
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-4 py-3.5 sm:px-7">
        <Logo />
        <nav aria-label="Principal" className="hidden flex-1 items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] font-bold text-on-brand-soft transition-colors hover:text-accent">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2.5 sm:flex lg:ml-0">
          <a
            href={SITE.appUrl}
            className="rounded-[11px] border-[1.5px] border-black/20 px-4 py-2.5 text-[13px] font-extrabold text-on-brand-soft transition-colors hover:border-black/40 hover:bg-white/30"
          >
            Entrar
          </a>
          <a
            href={CTA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[11px] bg-accent px-5 py-2.5 text-[13px] font-extrabold text-white transition-colors hover:bg-black"
          >
            Quero meus encartes
          </a>
        </div>
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid size-10 place-items-center rounded-[11px] text-on-brand hover:bg-black/10 sm:ml-0 lg:hidden"
        >
          {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/10 bg-brand lg:hidden">
          <nav aria-label="Menu móvel" className="mx-auto flex max-w-[1200px] flex-col px-4 py-3 sm:px-7">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-black/10 py-3.5 text-[15px] font-bold text-on-brand"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-2.5 pb-2 sm:hidden">
              <a href={SITE.appUrl} className="rounded-[11px] border-[1.5px] border-black/20 py-3 text-center text-[13px] font-extrabold text-on-brand">
                Entrar
              </a>
              <a
                href={CTA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[11px] bg-accent py-3 text-center text-[13px] font-extrabold text-white"
              >
                Quero meus encartes
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
