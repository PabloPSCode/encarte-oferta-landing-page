"use client";

import RegistrationFlow from "@/components/registration/RegistrationFlow";
import { SITE, SUPPORT, whatsappLink } from "@/content/site";
import type { PlanResponseDTO } from "@/dtos/plans";
import type { CheckoutConfirmationDTO } from "@/dtos/registration";
import { pendingRegistration } from "@/services/pendingRegistration";
import { RegistrationError, confirmCheckoutSession } from "@/services/registration";
import { CheckCircle, CircleNotch, HourglassMedium, WarningCircle, WhatsappLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

/** Tentativas automáticas enquanto o Stripe ainda processa a primeira cobrança. */
const AUTO_RETRIES = 5;
const RETRY_DELAY_IN_MS = 3000;

const SUPPORT_LINK = whatsappLink("Olá! Fiz o pagamento do Encarte Oferta e preciso de ajuda para concluir o cadastro.");

type State =
  | { status: "confirming" }
  | { status: "registration"; companyId: string }
  | { status: "subscribed" }
  | { status: "pending" }
  | { status: "error"; message: string };

/**
 * Volta do Stripe Checkout com o pagamento aprovado. O pagamento é conferido
 * pela API (nunca só pela URL) e, se a empresa ainda não tem administrador, o
 * cadastro segue aqui mesmo para o passo do administrador.
 */
export default function PaymentSuccess({
  sessionId,
  plans,
}: {
  sessionId: string | null;
  plans: PlanResponseDTO[];
}) {
  const [state, setState] = useState<State>(
    sessionId ? { status: "confirming" } : { status: "error", message: "Este link de pagamento não é válido." },
  );

  const apply = useCallback((confirmation: CheckoutConfirmationDTO) => {
    if (!confirmation.isPaid) return false;

    if (confirmation.hasAdmin) {
      pendingRegistration.clear();
      setState({ status: "subscribed" });
    } else {
      setState({ status: "registration", companyId: confirmation.companyId });
    }

    return true;
  }, []);

  const confirm = useCallback(
    async (retries: number) => {
      if (!sessionId) return;
      setState({ status: "confirming" });

      for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
          if (apply(await confirmCheckoutSession(sessionId))) return;
        } catch (error) {
          return setState({
            status: "error",
            message:
              error instanceof RegistrationError
                ? error.message
                : "Não conseguimos confirmar o pagamento agora. Tente novamente em instantes.",
          });
        }

        if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_IN_MS));
      }

      setState({ status: "pending" });
    },
    [apply, sessionId],
  );

  useEffect(() => {
    void confirm(AUTO_RETRIES);
  }, [confirm]);

  if (state.status === "registration") {
    return <RegistrationFlow plans={plans} paidCompanyId={state.companyId} />;
  }

  return (
    <div className="flex flex-col items-center rounded-[24px] border border-line bg-surface px-6 py-10 text-center shadow-[0_18px_50px_rgba(24,27,38,0.06)]">
      {state.status === "confirming" && (
        <>
          <CircleNotch size={36} weight="bold" className="animate-spin text-ink-soft" />
          <h2 className="mt-5 text-[24px] font-black tracking-[-0.02em] text-ink">Confirmando o seu pagamento…</h2>
          <p className="mt-2 max-w-[440px] text-[15px] leading-relaxed text-ink-2">Isso leva só alguns segundos.</p>
        </>
      )}

      {state.status === "subscribed" && (
        <>
          <span className="grid size-16 place-items-center rounded-full bg-brand text-on-brand shadow-brand">
            <CheckCircle size={36} weight="fill" />
          </span>
          <h2 className="mt-5 text-[26px] font-black tracking-[-0.02em] text-ink">Assinatura confirmada!</h2>
          <p className="mt-2 max-w-[460px] text-[15px] leading-relaxed text-ink-2">
            O pagamento foi aprovado e o novo plano já está ativo na sua conta.
          </p>
          <a
            href={SITE.appUrl}
            className="mt-7 inline-flex items-center justify-center rounded-[13px] bg-accent px-7 py-4 text-[15px] font-extrabold text-white transition-colors hover:bg-black"
          >
            Voltar para o Encarte Oferta
          </a>
        </>
      )}

      {state.status === "pending" && (
        <>
          <HourglassMedium size={40} weight="fill" className="text-brand-ink" />
          <h2 className="mt-5 text-[24px] font-black tracking-[-0.02em] text-ink">O pagamento ainda está em análise</h2>
          <p className="mt-2 max-w-[460px] text-[15px] leading-relaxed text-ink-2">
            O cartão ainda não foi aprovado pela operadora. Aguarde alguns instantes e confira de novo.
          </p>
          <button
            type="button"
            onClick={() => void confirm(AUTO_RETRIES)}
            className="mt-7 inline-flex items-center justify-center rounded-[13px] bg-accent px-7 py-4 text-[15px] font-extrabold text-white transition-colors hover:bg-black"
          >
            Conferir de novo
          </button>
        </>
      )}

      {state.status === "error" && (
        <>
          <WarningCircle size={40} weight="fill" className="text-accent" />
          <h2 className="mt-5 text-[24px] font-black tracking-[-0.02em] text-ink">Não conseguimos confirmar o pagamento</h2>
          <p className="mt-2 max-w-[460px] text-[15px] leading-relaxed text-ink-2">{state.message}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {sessionId && (
              <button
                type="button"
                onClick={() => void confirm(0)}
                className="inline-flex items-center justify-center rounded-[13px] bg-accent px-6 py-3.5 text-[14px] font-extrabold text-white transition-colors hover:bg-black"
              >
                Tentar de novo
              </button>
            )}
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center rounded-[13px] border border-line px-6 py-3.5 text-[14px] font-extrabold text-ink transition-colors hover:bg-surface-2"
            >
              Voltar ao cadastro
            </Link>
          </div>
        </>
      )}

      <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-ink-2">
        Precisa de ajuda?
        <a
          href={SUPPORT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-extrabold text-accent hover:underline"
        >
          <WhatsappLogo size={16} weight="fill" /> Fale com o suporte ({SUPPORT.whatsappLabel})
        </a>
      </p>
    </div>
  );
}
