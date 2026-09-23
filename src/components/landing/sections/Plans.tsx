import clsx from "clsx";
import { ArrowsClockwise, CalendarCheck, Coins, Plus } from "@phosphor-icons/react/dist/ssr";
import Eyebrow from "../Eyebrow";
import { PLANS, PLANS_LINK, PLAN_QUOTAS, formatBRL, whatsappLink } from "@/content/site";

/** Regras de créditos (encarte-oferta-api: generationQuota.ts, CreditRefillScheduler.ts, faqs.ts). */
const CREDIT_RULES = [
  { icon: Coins, title: "1 crédito por geração", body: "Cada encarte, tema com IA (feed e stories juntos) ou vídeo consome 1 crédito da cota do mês." },
  { icon: ArrowsClockwise, title: "Falhou? O crédito volta", body: "Se uma geração falhar, o crédito é devolvido automaticamente ao seu saldo." },
  { icon: CalendarCheck, title: "Renovação todo dia 1º", body: "À 00h (horário de Brasília) a cota é renovada. O saldo não usado não acumula." },
  { icon: Plus, title: "Trocou de plano? Soma", body: "A cota do novo plano é somada ao saldo atual, sem esperar o próximo mês." },
];

export default function Plans() {
  return (
    <section id="planos" className="mx-auto max-w-[1200px] px-4 pt-28 sm:px-7">
      <div className="mx-auto max-w-[660px] text-center">
        <Eyebrow>Planos</Eyebrow>
        <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[40px]">
          Escolha o plano no ritmo das suas ofertas
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-2 text-pretty">
          Três planos com cobrança mensal ou anual. O que muda entre eles é o tamanho da cota mensal de créditos e o
          número de contas conectadas.
        </p>
      </div>

      <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
        {PLANS.map((p) => (
          <article
            key={p.name}
            className={clsx(
              "relative flex flex-col rounded-[22px] bg-surface p-7",
              p.highlight
                ? "border-2 border-brand shadow-[0_18px_44px_rgba(224,166,0,0.22)] lg:-mt-4 lg:pb-10"
                : "border border-line"
            )}
          >
            {p.highlight && (
              <span className="absolute -top-3.5 left-7 rounded-full bg-accent px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-white">
                Recomendado
              </span>
            )}
            <h3 className="text-[22px] font-black tracking-[-0.02em] text-ink">{p.name}</h3>
            <p className="mt-2 min-h-[44px] text-[13.5px] leading-relaxed text-ink-2">{p.tagline}</p>

            <div className="mt-5 flex items-baseline gap-1.5">
              {p.monthValueInCents ? (
                <>
                  <span className="text-[32px] font-black tracking-[-0.03em] text-ink">{formatBRL(p.monthValueInCents)}</span>
                  <span className="text-[13px] font-bold text-ink-soft">/mês</span>
                </>
              ) : (
                <span className="text-[26px] font-black tracking-[-0.02em] text-ink">Sob consulta</span>
              )}
            </div>
            <p className="mt-1 text-[12.5px] text-ink-soft">
              {p.yearValueInCents ? `ou ${formatBRL(p.yearValueInCents)}/ano` : "Cobrança mensal ou anual"}
            </p>

            <div className="my-6 h-px bg-line" />
            <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink-soft">Cotas definidas pelo plano</p>
            <ul className="mt-3.5 space-y-2.5">
              {PLAN_QUOTAS.map((q) => (
                <li key={q} className="flex items-start gap-2.5 text-[13.5px] text-ink-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-strong" />
                  {q}
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink(`Olá! Tenho interesse no plano ${p.name} do Encarte Oferta.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "mt-7 rounded-[12px] px-5 py-3.5 text-center text-[14px] font-extrabold transition-all",
                p.highlight
                  ? "bg-gradient-to-br from-brand to-brand-strong text-on-brand shadow-brand hover:brightness-105"
                  : "bg-on-brand text-brand hover:bg-black"
              )}
            >
              Quero o plano {p.name}
            </a>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-[24px] border border-line bg-surface-2 p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="text-[20px] font-black tracking-[-0.02em] text-ink">Como funcionam os créditos</h3>
          <a href={PLANS_LINK} target="_blank" rel="noopener noreferrer" className="text-[13.5px] font-extrabold text-accent hover:underline">
            Consultar valores pelo WhatsApp →
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
