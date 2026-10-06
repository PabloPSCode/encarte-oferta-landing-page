import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";

/** Moldura das páginas para onde o Stripe Checkout devolve o navegador. */
export default function PaymentResultShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-clip font-sans">
      <Header />
      <main className="bg-background pb-24">
        <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-strong">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(#1A1400_1.2px,transparent_1.3px)] [background-size:18px_18px] [mask-image:linear-gradient(115deg,transparent_40%,black_90%)]"
          />
          <div className="relative mx-auto max-w-[1200px] px-4 pb-14 pt-10 sm:px-7 sm:pb-16">
            <p className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-brand-ink">{eyebrow}</p>
            <h1 className="mt-2 max-w-[720px] text-[36px] font-black leading-[1.05] tracking-[-0.035em] text-on-brand text-balance sm:text-[52px]">
              {title}
            </h1>
          </div>
        </section>
        <div className="mx-auto max-w-[760px] px-4 pt-10 sm:px-7">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
