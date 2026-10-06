"use client";

import { SITE, SUPPORT, whatsappLink } from "@/content/site";
import { type PendingRegistration, pendingRegistration } from "@/services/pendingRegistration";
import { RegistrationError, startRegistrationCheckout } from "@/services/registration";
import { CircleNotch, LockSimple, WarningCircle, WhatsappLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SUPPORT_LINK = whatsappLink("Olá! Tive um problema no pagamento do Encarte Oferta.");

/**
 * Volta do Stripe Checkout sem pagamento: o cliente desistiu ou o cartão foi
 * recusado. Um cadastro em andamento neste navegador pode tentar de novo na
 * hora; uma empresa que assinava pelo app volta para lá.
 */
export default function PaymentFailure() {
  // undefined enquanto o navegador não foi lido; null quando não há cadastro em andamento.
  const [pending, setPending] = useState<PendingRegistration | null | undefined>(undefined);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setPending(pendingRegistration.get()), []);

  const retry = async () => {
    if (!pending) return;
    setRetrying(true);
    setError(null);

    try {
      const { checkoutUrl } = await startRegistrationCheckout(pending.companyId, pending.billingCycle);
      window.location.assign(checkoutUrl);
    } catch (failure) {
      setRetrying(false);
      // Já pago ou já com administrador: o cadastro decide o próximo passo.
      if (
        failure instanceof RegistrationError &&
        (failure.apiMessage === "This company already has a subscription" ||
          failure.apiMessage === "This company already has an admin")
      ) {
        return window.location.assign("/cadastro");
      }
      setError(
        failure instanceof RegistrationError
          ? failure.message
          : "Não foi possível abrir o pagamento agora. Tente novamente em instantes.",
      );
    }
  };

  return (
    <div className="flex flex-col items-center rounded-[24px] border border-line bg-surface px-6 py-10 text-center shadow-[0_18px_50px_rgba(24,27,38,0.06)]">
      <WarningCircle size={44} weight="fill" className="text-accent" />
      <h2 className="mt-5 text-[26px] font-black tracking-[-0.02em] text-ink">O pagamento não foi concluído</h2>
      <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-ink-2">
        Nenhuma cobrança foi feita. Isso acontece quando o pagamento é cancelado ou o cartão é recusado pela
        operadora. Confira os dados do cartão e tente de novo.
      </p>

      {error && (
        <p role="alert" className="mt-4 max-w-[480px] text-[14px] font-semibold text-accent">
          {error}
        </p>
      )}

      {pending === undefined ? (
        <CircleNotch size={24} weight="bold" className="mt-7 animate-spin text-ink-soft" />
      ) : pending ? (
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => void retry()}
            disabled={retrying}
            className="inline-flex items-center justify-center gap-2 rounded-[13px] bg-accent px-7 py-4 text-[15px] font-extrabold text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-70"
          >
            {retrying ? (
              <>
                <CircleNotch size={18} weight="bold" className="animate-spin" /> Abrindo o pagamento…
              </>
            ) : (
              <>
                <LockSimple size={18} weight="bold" /> Tentar pagar de novo
              </>
            )}
          </button>
          <Link
            href="/cadastro"
            className="inline-flex items-center justify-center rounded-[13px] border border-line px-6 py-4 text-[15px] font-extrabold text-ink transition-colors hover:bg-surface-2"
          >
            Voltar ao cadastro
          </Link>
        </div>
      ) : (
        <a
          href={SITE.appUrl}
          className="mt-7 inline-flex items-center justify-center rounded-[13px] bg-accent px-7 py-4 text-[15px] font-extrabold text-white transition-colors hover:bg-black"
        >
          Voltar para o Encarte Oferta
        </a>
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
