import { PLANS_LINK } from "@/content/site";
import { getPlans } from "@/services/plans";
import { ArrowsClockwise, CalendarCheck, Coins, Plus } from "@phosphor-icons/react/dist/ssr";
import Eyebrow from "../Eyebrow";
import PlansGrid from "./PlansGrid";

/** Regras de créditos (encarte-oferta-api: generationQuota.ts, CreditRefillScheduler.ts, faqs.ts). */
const CREDIT_RULES = [
  { icon: Coins, title: "1 crédito por geração", body: "Cada encarte, tema com IA (feed e stories juntos) ou vídeo consome 1 crédito da cota do mês." },
  { icon: ArrowsClockwise, title: "Falhou? O crédito volta", body: "Se uma geração falhar, o crédito é devolvido automaticamente ao seu saldo." },
  { icon: CalendarCheck, title: "Renovação todo dia 1º", body: "À 00h (horário de Brasília) a cota é renovada. O saldo não usado não acumula." },
  { icon: Plus, title: "Trocou de plano? Soma", body: "A cota do novo plano é somada ao saldo atual, sem esperar o próximo mês." },
];

export default async function Plans() {
  const plans = await getPlans();

  return (
    <section id="planos" className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="mx-auto max-w-[660px] text-center">
        <Eyebrow>Planos</Eyebrow>
        <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
          Escolha o plano no ritmo das suas ofertas
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-2 text-pretty">
          O que muda entre os planos é a cota mensal de encartes, temas e vídeos com IA e o número de contas conectadas.
          Precisa de mais? Monte um plano personalizado.
        </p>
      </div>

      <PlansGrid plans={plans} />

      <div className="mt-14 rounded-[24px] border border-line bg-surface-2 p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="text-[20px] font-black tracking-[-0.02em] text-ink">Como funcionam os créditos</h3>
          <a href={PLANS_LINK} target="_blank" rel="noopener noreferrer" className="text-[13.5px] font-extrabold text-accent hover:underline">
            Tirar dúvidas sobre os planos pelo WhatsApp →
          </a>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CREDIT_RULES.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <span className="grid size-10 place-items-center rounded-[12px] bg-brand text-on-brand">
                <Icon size={20} weight="bold" />
              </span>
              <h4 className="mt-3 text-[14.5px] font-extrabold text-ink">{title}</h4>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
