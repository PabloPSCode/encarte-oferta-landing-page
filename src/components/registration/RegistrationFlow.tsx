"use client";

import { REFUND_POLICY, SITE, SUPPORT, whatsappLink } from "@/content/site";
import type { PlanResponseDTO } from "@/dtos/plans";
import type { BillingCycle } from "@/dtos/registration";
import { pendingRegistration } from "@/services/pendingRegistration";
import { RegistrationError, startRegistrationCheckout } from "@/services/registration";
import {
  Check,
  CheckCircle,
  CircleNotch,
  CreditCard,
  EnvelopeSimple,
  Info,
  LockSimple,
  WhatsappLogo,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import AdminForm, { type AdminCreatedResult, type AdminFailure } from "./AdminForm";
import CompanyForm from "./CompanyForm";

type Step = "loading" | "company" | "payment" | "admin" | "done";

const STEPS = [
  { id: "company", label: "Dados da empresa" },
  { id: "payment", label: "Pagamento" },
  { id: "admin", label: "Administrador" },
] as const;

const STEP_INDEX: Record<Step, number> = { loading: 0, company: 0, payment: 1, admin: 2, done: 3 };

const SUPPORT_LINK = whatsappLink("Olá! Preciso de ajuda com o cadastro da minha empresa no Encarte Oferta.");

const CHECKOUT_ERROR = "Não foi possível abrir o pagamento agora. Tente novamente em instantes.";

interface RegistrationFlowProps {
  plans: PlanResponseDTO[];
  defaultPlanId?: string;
  defaultBillingCycle?: BillingCycle;
  /**
   * Empresa cujo pagamento acabou de ser confirmado em /pagamento-sucesso: o
   * cadastro começa direto no passo do administrador.
   */
  paidCompanyId?: string;
}

export default function RegistrationFlow({
  plans,
  defaultPlanId,
  defaultBillingCycle,
  paidCompanyId,
}: RegistrationFlowProps) {
  const [step, setStep] = useState<Step>("loading");
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(defaultBillingCycle ?? "monthly");
  const [resumed, setResumed] = useState(false);
  const [paid, setPaid] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<{ status: "idle" | "redirecting" | "error"; message?: string }>({
    status: "idle",
  });
  const [result, setResult] = useState<AdminCreatedResult | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const goTo = (next: Step) => {
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCompanyUnavailable = useCallback((reason: AdminFailure, message: string) => {
    pendingRegistration.clear();
    setCompanyId(null);
    setResumed(false);
    setNotice(message);
    setStep(reason === "company-has-admin" ? "done" : "company");
  }, []);

  /**
   * Abre o Stripe Checkout do plano escolhido. O navegador sai da página e o
   * Stripe o devolve para /pagamento-sucesso ou /pagamento-falha.
   */
  const goToCheckout = useCallback(
    async (id: string, cycle: BillingCycle) => {
      setCheckout({ status: "redirecting" });
      try {
        const { checkoutUrl } = await startRegistrationCheckout(id, cycle);
        window.location.assign(checkoutUrl);
      } catch (error) {
        const err = error instanceof RegistrationError ? error : null;

        if (err?.apiMessage === "This company already has a subscription") {
          setPaid(true);
          setCheckout({ status: "idle" });
          return setStep("admin");
        }
        if (err?.apiMessage === "This company already has an admin") {
          return handleCompanyUnavailable("company-has-admin", err.message);
        }
        if (err?.apiMessage === "Company not found") {
          return handleCompanyUnavailable("company-not-found", err.message);
        }
        setCheckout({ status: "error", message: err?.message ?? CHECKOUT_ERROR });
      }
    },
    [handleCompanyUnavailable],
  );

  // Lido só no navegador: quem fechou a página no meio do cadastro continua de onde parou.
  useEffect(() => {
    if (paidCompanyId) {
      const saved = pendingRegistration.get();
      pendingRegistration.set({
        companyId: paidCompanyId,
        billingCycle: saved?.billingCycle ?? "monthly",
      });
      setCompanyId(paidCompanyId);
      setPaid(true);
      setStep("admin");
      return;
    }

    const saved = pendingRegistration.get();
    if (saved) {
      setCompanyId(saved.companyId);
      setBillingCycle(saved.billingCycle);
      setResumed(true);
      setStep("payment");
    } else {
      setStep("company");
    }
  }, [paidCompanyId]);

  const handleCompanyCreated = (id: string, cycle: BillingCycle) => {
    pendingRegistration.set({ companyId: id, billingCycle: cycle });
    setCompanyId(id);
    setBillingCycle(cycle);
    setResumed(false);
    setNotice(null);
    goTo("payment");
    void goToCheckout(id, cycle);
  };

  const handleAdminCreated = (created: AdminCreatedResult) => {
    pendingRegistration.clear();
    setCompanyId(null);
    setResult(created);
    goTo("done");
  };

  const handlePaymentRequired = (message: string) => {
    setPaid(false);
    setNotice(message);
    setCheckout({ status: "idle" });
    goTo("payment");
  };

  const restart = () => {
    pendingRegistration.clear();
    setCompanyId(null);
    setResumed(false);
    setPaid(false);
    setNotice(null);
    setCheckout({ status: "idle" });
    goTo("company");
  };

  const currentIndex = STEP_INDEX[step];

  return (
    <div ref={topRef} className="scroll-mt-24">
      {step !== "done" && (
        <ol className="mb-6 flex items-center gap-3" aria-label="Etapas do cadastro">
          {STEPS.map((s, i) => {
            const completed = i < currentIndex;
            const current = i === currentIndex;
            return (
              <li key={s.id} className="flex flex-1 items-center gap-3" aria-current={current ? "step" : undefined}>
                <span
                  className={clsx(
                    "grid size-9 shrink-0 place-items-center rounded-full text-[14px] font-black transition-colors",
                    completed && "bg-brand text-on-brand",
                    current && "bg-accent text-white",
                    !completed && !current && "border-[1.5px] border-line bg-surface text-ink-soft"
                  )}
                >
                  {completed ? <Check size={16} weight="bold" /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink-soft">
                    Passo {i + 1} de {STEPS.length}
                  </span>
                  <span className={clsx("block truncate text-[14px] font-extrabold", current ? "text-ink" : "text-ink-2")}>
                    {s.label}
                  </span>
                </span>
                {i < STEPS.length - 1 && <span aria-hidden className="hidden h-[2px] flex-1 rounded-full bg-line sm:block" />}
              </li>
            );
          })}
        </ol>
      )}

      <div className="rounded-[24px] border border-line bg-surface p-5 shadow-[0_18px_50px_rgba(24,27,38,0.06)] sm:p-8">
        {step === "loading" && (
          <div className="grid place-items-center py-20 text-ink-soft" aria-live="polite">
            <CircleNotch size={28} weight="bold" className="animate-spin" />
            <span className="sr-only">Carregando o cadastro…</span>
          </div>
        )}

        {step === "company" && (
          <>
            <StepHeader
              title="Conte sobre a sua empresa"
              description="Leva uns 3 minutos. Tenha em mãos o cartão CNPJ: os dados precisam ser os mesmos da Receita Federal."
            />
            {notice && <Notice tone="warning">{notice}</Notice>}
            <CompanyForm
              plans={plans}
              defaultPlanId={defaultPlanId}
              defaultBillingCycle={defaultBillingCycle}
              onCreated={handleCompanyCreated}
            />
          </>
        )}

        {step === "payment" && companyId && (
          <>
            <StepHeader
              title="Pagamento do plano"
              description="O pagamento é feito com cartão de crédito no ambiente seguro do Stripe. Assim que ele for aprovado, você volta para cá e cria o seu acesso."
            />
            {notice && <Notice tone="warning">{notice}</Notice>}
            {resumed && (
              <Notice tone="info">
                Encontramos um cadastro em andamento neste navegador: os dados da empresa já foram salvos, falta
                o pagamento.{" "}
                <button type="button" onClick={restart} className="font-extrabold underline underline-offset-2 hover:text-ink">
                  Quer cadastrar outra empresa?
                </button>
              </Notice>
            )}
            {checkout.status === "error" && <Notice tone="warning">{checkout.message}</Notice>}

            <div className="flex flex-col items-center gap-4 rounded-[18px] border border-line bg-surface-2 px-5 py-8 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-brand text-on-brand">
                <CreditCard size={28} weight="fill" />
              </span>
              <p className="max-w-[420px] text-[14.5px] leading-relaxed text-ink-2">
                Cobrança <strong className="text-ink">{billingCycle === "yearly" ? "anual, à vista" : "mensal"}</strong>{" "}
                no cartão de crédito. Você tem garantia de {REFUND_POLICY.days} dias: se cancelar nesse prazo, devolvemos o
                valor pago, descontando apenas os vídeos com IA gerados.
              </p>
              <button
                type="button"
                onClick={() => void goToCheckout(companyId, billingCycle)}
                disabled={checkout.status === "redirecting"}
                className="inline-flex items-center justify-center gap-2 rounded-[13px] bg-accent px-7 py-4 text-[15px] font-extrabold text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-70"
              >
                {checkout.status === "redirecting" ? (
                  <>
                    <CircleNotch size={18} weight="bold" className="animate-spin" /> Abrindo o pagamento…
                  </>
                ) : (
                  <>
                    <LockSimple size={18} weight="bold" /> Ir para o pagamento
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {step === "admin" && companyId && (
          <>
            <StepHeader
              title="Agora, crie o seu acesso"
              description="Falta pouco! Cadastre quem vai administrar a conta da empresa no Encarte Oferta."
            />
            {paid && <Notice tone="success">Pagamento confirmado! Agora é só criar o seu acesso.</Notice>}
            <AdminForm
              companyId={companyId}
              onCreated={handleAdminCreated}
              onCompanyUnavailable={handleCompanyUnavailable}
              onPaymentRequired={handlePaymentRequired}
            />
          </>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-brand text-on-brand shadow-brand">
              <CheckCircle size={36} weight="fill" />
            </span>
            {notice ? (
              <>
                <h2 className="mt-5 text-[26px] font-black tracking-[-0.02em] text-ink">Esta empresa já está pronta</h2>
                <p className="mt-2 max-w-[460px] text-[15px] leading-relaxed text-ink-2">{notice}</p>
              </>
            ) : (
              <>
                <h2 className="mt-5 text-[26px] font-black tracking-[-0.02em] text-ink">Cadastro concluído!</h2>
                <p className="mt-2 max-w-[460px] text-[15px] leading-relaxed text-ink-2">
                  Sua empresa e o seu acesso de administrador foram criados. Entre no app com o e-mail e a senha que você
                  acabou de cadastrar para configurar o seu primeiro encarte.
                </p>
                {result && (
                  <div className="mt-5 flex max-w-[460px] gap-3 rounded-[14px] border border-line bg-surface-2 p-4 text-left text-[13.5px] leading-relaxed text-ink-2">
                    <EnvelopeSimple size={20} weight="fill" className="mt-0.5 shrink-0 text-brand-ink" />
                    {result.emailSent ? (
                      <p>
                        Enviamos um e-mail para <strong className="text-ink">{result.email}</strong> com os dados da
                        empresa e do seu acesso. Não achou? Confira a caixa de spam.
                      </p>
                    ) : (
                      <p>
                        Não conseguimos enviar o e-mail de boas-vindas agora, mas fique tranquilo: o cadastro está
                        concluído e você já pode entrar com <strong className="text-ink">{result.email}</strong>.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
            <a
              href={SITE.appUrl}
              className="mt-7 inline-flex items-center justify-center rounded-[13px] bg-accent px-7 py-4 text-[15px] font-extrabold text-white transition-colors hover:bg-black"
            >
              Entrar no Encarte Oferta
            </a>
          </div>
        )}
      </div>

      <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[13px] text-ink-2">
        Ficou com alguma dúvida?
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

function StepHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-[24px] font-black tracking-[-0.02em] text-ink sm:text-[28px]">{title}</h2>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-2">{description}</p>
    </div>
  );
}

const NOTICE_TONES = {
  info: "border-brand/40 bg-brand-tint text-on-brand-soft",
  success: "border-emerald-600/20 bg-emerald-50 text-emerald-900",
  warning: "border-accent/25 bg-accent-tint text-accent-strong",
};

function Notice({ tone, children }: { tone: keyof typeof NOTICE_TONES; children: React.ReactNode }) {
  const NoticeIcon = tone === "success" ? CheckCircle : Info;
  return (
    <div role="status" className={clsx("mb-7 flex gap-3 rounded-[14px] border p-4 text-[14px] font-semibold leading-relaxed", NOTICE_TONES[tone])}>
      <NoticeIcon size={20} weight="fill" className="mt-0.5 shrink-0" />
      <p>{children}</p>
    </div>
  );
}
