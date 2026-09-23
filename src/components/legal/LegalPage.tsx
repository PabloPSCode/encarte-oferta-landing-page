import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import { LEGAL_UPDATED_AT } from "@/content/site";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  sections: LegalSection[];
  related: { href: string; label: string };
}

export default function LegalPage({ eyebrow, title, intro, sections, related }: LegalPageProps) {
  return (
    <div className="overflow-x-clip font-sans">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-strong">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(#1A1400_1.2px,transparent_1.3px)] [background-size:18px_18px] [mask-image:linear-gradient(115deg,transparent_40%,black_90%)]"
          />
          <div className="relative mx-auto max-w-[1200px] px-4 pb-14 pt-10 sm:px-7 sm:pb-16">
            <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-bold text-on-brand-soft hover:text-on-brand">
              <ArrowLeft size={16} weight="bold" /> Voltar para a página inicial
            </Link>
            <p className="mt-8 text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-brand-ink">{eyebrow}</p>
            <h1 className="mt-2 text-[36px] font-black leading-[1.05] tracking-[-0.035em] text-on-brand sm:text-[52px]">{title}</h1>
            <p className="mt-4 inline-flex rounded-full bg-white/75 px-3.5 py-1.5 text-[12.5px] font-bold text-on-brand-soft">
              Última atualização: {LEGAL_UPDATED_AT}
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 pt-12 sm:px-7 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Nesta página" className="rounded-[18px] border border-line bg-surface p-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-soft">Nesta página</p>
              <ol className="mt-3 space-y-1.5 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-2 rounded-lg px-2 py-1 text-[13px] font-semibold leading-snug text-ink-2 hover:bg-brand-tint hover:text-on-brand">
                      <span className="w-5 shrink-0 font-extrabold text-brand-ink">{i + 1}.</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <Link
              href={related.href}
              className="mt-4 block rounded-[14px] bg-accent px-5 py-4 text-[13px] font-extrabold text-white hover:bg-black"
            >
              Leia também: {related.label} →
            </Link>
          </aside>

          <article className="legal-prose min-w-0 max-w-[780px]">
            <div className="text-[16px] leading-relaxed text-ink-2">{intro}</div>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-line pt-8 mt-10 first-of-type:mt-10">
                <h2 className="text-[22px] font-black tracking-[-0.02em] text-ink">
                  <span className="mr-2 text-accent">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-4">{s.content}</div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
