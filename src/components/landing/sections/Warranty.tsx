import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { REFUND_POLICY, formatBRL } from "@/content/site";
import { getPlans } from "@/services/plans";
import { videoRefundChargeOf } from "@/utils/plans";
import Eyebrow from "../Eyebrow";

export default async function Warranty() {
  const charge = videoRefundChargeOf(await getPlans());

  return (
    <section id="garantia" className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="flex flex-col items-center gap-8 rounded-[28px] border border-line bg-surface px-6 py-10 text-center sm:flex-row sm:items-center sm:gap-10 sm:px-12 sm:py-12 sm:text-left">
        <div className="relative grid size-32 shrink-0 place-items-center rounded-full bg-brand-tint sm:size-40">
          <div className="grid size-24 place-items-center rounded-full bg-brand text-on-brand sm:size-30">
            <ShieldCheck size={44} weight="fill" aria-hidden />
          </div>
          <span className="absolute -bottom-2 rounded-full bg-accent px-3 py-1 text-[12px] font-black uppercase tracking-wide text-white">
            {REFUND_POLICY.days} dias
          </span>
        </div>
        <div>
          <Eyebrow>Garantia</Eyebrow>
          <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
            Garantia de {REFUND_POLICY.days} dias
          </h2>
          <p className="mt-4 max-w-[720px] text-[16px] leading-relaxed text-ink-2 text-pretty">
            Tranquilidade para você decidir do lado de dentro, usando todos os recursos e toda a cota do plano. Se em até{" "}
            {REFUND_POLICY.days} dias você achar que não é para você, é só cancelar: o reembolso é processado
            automaticamente, e descontamos apenas os vídeos com IA gerados no período ({formatBRL(charge)} por vídeo).
          </p>
          <Link
            href={REFUND_POLICY.href}
            className="mt-4 inline-block text-[14px] font-extrabold text-accent hover:underline"
          >
            Ler a Política de Cancelamento →
          </Link>
        </div>
      </div>
    </section>
  );
}
