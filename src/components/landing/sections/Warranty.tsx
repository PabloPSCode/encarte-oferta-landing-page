import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Eyebrow from "../Eyebrow";

export default function Warranty() {
  return (
    <section id="garantia" className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="flex flex-col items-center gap-8 rounded-[28px] border border-line bg-surface px-6 py-10 text-center sm:flex-row sm:items-center sm:gap-10 sm:px-12 sm:py-12 sm:text-left">
        <div className="relative grid size-32 shrink-0 place-items-center rounded-full bg-brand-tint sm:size-40">
          <div className="grid size-24 place-items-center rounded-full bg-brand text-on-brand sm:size-30">
            <ShieldCheck size={44} weight="fill" aria-hidden />
          </div>
          <span className="absolute -bottom-2 rounded-full bg-accent px-3 py-1 text-[12px] font-black uppercase tracking-wide text-white">
            7 dias
          </span>
        </div>
        <div>
          <Eyebrow>Garantia</Eyebrow>
          <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
            Garantia incondicional de 7 dias
          </h2>
          <p className="mt-4 max-w-[720px] text-[16px] leading-relaxed text-ink-2 text-pretty">
            Tranquilidade para que você possa tomar sua decisão do lado de dentro. Você pode acessar todos os recursos do
            sistema com até 50% de uso da sua cota nesse período. E se por algum motivo você acreditar que não é para você,
            basta enviar um único e-mail para a nossa equipe de suporte e nós devolvemos 100% do valor da sua compra.
            Simples assim.
          </p>
        </div>
      </div>
    </section>
  );
}
