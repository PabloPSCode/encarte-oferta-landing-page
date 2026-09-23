"use client";

import type { PlanResponseDTO } from "@/dtos/plans";
import { formatBRL, whatsappLink } from "@/content/site";
import {
  annualDiscountPercentage,
  monthlyEquivalentInCents,
  planAllowances,
  planInclusions,
  planTitle,
} from "@/utils/plans";
import { Check, Minus } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";

type Cycle = "month" | "year";

export default function PlansGrid({ plans }: { plans: PlanResponseDTO[] }) {
  const [cycle, setCycle] = useState<Cycle>("month");
  const bestDiscount = Math.max(
    0,
    ...plans.map((p) => annualDiscountPercentage(p) ?? 0),
  );
  const maxFlyers = Math.max(...plans.map((p) => p.maxFlyerGenerations));
  const hasAnnualOffer = bestDiscount > 0;

  return (
    <>
      {hasAnnualOffer && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <div
            role="radiogroup"
            aria-label="Ciclo de cobrança"
            className="inline-flex rounded-full border border-line bg-surface p-1"
          >
            {(
              [
                ["month", "Mensal"],
                ["year", "Anual"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={cycle === value}
                onClick={() => setCycle(value)}
                className={clsx(
                  "items-center gap-2 rounded-full px-5 py-2 text-[13.5px] font-extrabold transition-colors",
                  cycle === value
                    ? "bg-on-brand text-brand"
                    : "text-ink-2 hover:text-ink",
                )}
              >
                {label}
                {value === "year" && bestDiscount > 0 && (
                  <span
                    className={clsx(
                      "rounded-full px-2 py-0.5 text-[10.5px] font-extrabold",
                      cycle === "year"
                        ? "bg-brand text-on-brand"
                        : "bg-accent-tint text-accent",
                    )}
                  >
                    -{bestDiscount}%
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="text-[12.5px] font-semibold text-ink-soft">
            Pague uma vez por ano e economize até {bestDiscount}%.
          </p>
        </div>
      )}

      <div className="mt-10 grid items-start gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const title = planTitle(plan);
          const isTop = plan.maxFlyerGenerations === maxFlyers;
          const discount = annualDiscountPercentage(plan);
          const isYear = hasAnnualOffer && cycle === "year";

          return (
            <article
              key={plan.id}
              className={clsx(
                "relative flex flex-col rounded-[22px] bg-surface p-7",
                isTop
                  ? "border-2 border-brand shadow-[0_18px_44px_rgba(224,166,0,0.22)] lg:-mt-4 lg:pb-10"
                  : "border border-line",
              )}
            >
              {isTop && (
                <span className="absolute -top-3.5 left-[50%] -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-white">
                  Mais completo
                </span>
              )}
              <h3 className="text-[22px] font-black tracking-[-0.02em] text-ink">
                {title}
              </h3>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-[34px] font-black tracking-[-0.03em] text-ink">
                  {formatBRL(
                    isYear ? plan.yearValueInCents : plan.monthValueInCents,
                  )}
                </span>
                <span className="text-[13px] font-bold text-ink-soft">
                  {isYear ? "/ano" : "/mês"}
                </span>
              </div>
              <p className="mt-1 min-h-[20px] text-[12.5px] text-ink-soft">
                {isYear ? (
                  <>
                    equivale a {formatBRL(monthlyEquivalentInCents(plan))}/mês
                    {discount && (
                      <strong className="ml-1.5 font-extrabold text-accent">
                        -{discount}%
                      </strong>
                    )}
                  </>
                ) : discount ? (
                  <>
                    ou {formatBRL(plan.yearValueInCents)}/ano,{" "}
                    <strong className="font-extrabold text-accent">
                      economize {discount}%
                    </strong>
                  </>
                ) : (
                  <>Cobrança mensal</>
                )}
              </p>

              <div className="my-6 h-px bg-line" />

              <dl className="grid grid-cols-2 gap-3">
                {planAllowances(plan).map((a) => (
                  <div
                    key={a.label}
                    className="flex flex-col-reverse justify-end rounded-[14px] bg-surface-2 px-3.5 py-3"
                  >
                    <dt className="mt-1.5 text-[11.5px] font-semibold leading-snug text-ink-2">
                      {a.label}
                    </dt>
                    <dd className="text-[22px] font-black leading-none tracking-[-0.02em] text-ink">
                      {a.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-6 space-y-2.5">
                {planInclusions(plan).map((inc) => (
                  <li
                    key={inc.label}
                    className={clsx(
                      "flex items-center gap-2.5 text-[13.5px]",
                      inc.included
                        ? "text-ink-2"
                        : "text-ink-soft line-through",
                    )}
                  >
                    <span
                      className={clsx(
                        "grid size-5 shrink-0 place-items-center rounded-full",
                        inc.included
                          ? "bg-brand-tint text-brand-ink"
                          : "bg-surface-2 text-ink-soft",
                      )}
                    >
                      {inc.included ? (
                        <Check size={12} weight="bold" />
                      ) : (
                        <Minus size={12} weight="bold" />
                      )}
                    </span>
                    {inc.label}
                  </li>
                ))}
              </ul>

              <a
                href={whatsappLink(
                  `Olá! Quero assinar o plano ${title} do Encarte Oferta${hasAnnualOffer ? ` (${isYear ? "pagamento anual" : "pagamento mensal"})` : ""}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  "mt-7 rounded-[12px] px-5 py-3.5 text-center text-[14px] font-extrabold transition-all",
                  isTop
                    ? "bg-gradient-to-br from-brand to-brand-strong text-on-brand shadow-brand hover:brightness-105"
                    : "bg-accent text-white hover:bg-black",
                )}
              >
                Assinar {title}
              </a>
            </article>
          );
        })}
      </div>

      <article className="mt-5 flex flex-col gap-6 rounded-[22px] border border-dashed border-brand-strong bg-brand-tint/60 p-7 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[640px]">
          <h3 className="text-[22px] font-black tracking-[-0.02em] text-ink">
            Personalizado
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-2 text-pretty">
            Precisa de mais encartes, vídeos, temas com IA ou contas conectadas?
            Montamos um plano sob medida para redes de lojas e operações com
            alto volume de ofertas. Cotas e valor{" "}
            <strong className="text-ink">à combinar</strong>.
          </p>
        </div>
        <a
          href={whatsappLink(
            "Olá! Quero um plano personalizado do Encarte Oferta.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-[12px] bg-on-brand px-6 py-3.5 text-center text-[14px] font-extrabold text-brand transition-colors hover:bg-black"
        >
          Falar com a equipe
        </a>
      </article>
    </>
  );
}
