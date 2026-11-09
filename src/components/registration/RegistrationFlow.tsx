"use client";

import { REFUND_POLICY, SITE, SUPPORT, formatBRL, whatsappLink } from "@/content/site";
import type { PlanResponseDTO } from "@/dtos/plans";
import type { BillingCycle } from "@/dtos/registration";
import { checkoutParams, metaPixel } from "@/services/metaPixel";
import { pendingRegistration } from "@/services/pendingRegistration";
import { RegistrationError, startRegistrationCheckout } from "@/services/registration";
import { chargeInCents, planTitle } from "@/utils/plans";
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
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import AdminForm, { type AdminCreatedResult, type AdminFailure } from "./AdminForm";
import CompanyForm from "./CompanyForm";

type Step = "loading" | "company" | "payment" | "admin" | "done";

const STEPS = [
  { id: "company", label: "Dados da empresa" },
  { id: "payment", label: "Pagamento" },
  { id: "admin", label: "Administrador" },
] as const;

/** O plano gratuito não tem cobrança: da empresa, o cadastro vai direto para o administrador. */
const FREE_PLAN_STEPS = STEPS.filter((s) => s.id !== "payment");

const SUPPORT_LINK = whatsappLink("Olá! Preciso de ajuda com o cadastro da minha empresa no Encarte Oferta.");

const CHECKOUT_ERROR = "Não foi possível abrir o pagamento agora. Tente novamente em instantes.";

interface RegistrationFlowProps {
  /**
   * O plano pago escolhido no card de preço da landing (?plano=). Sem ele, o
   * cadastro pago manda escolher o plano lá antes dos dados da empresa.
   */
  chosenPlan?: PlanResponseDTO;
  /** O ciclo escolhido no card de preço (?ciclo=). */
  chosenBillingCycle?: BillingCycle;
  /** Cadastro aberto com ?freePlan=true: a empresa entra neste plano, sem pagamento. */
  freePlanId?: string;
  /**
   * Empresa cujo pagamento acabou de ser confirmado em /pagamento-sucesso: o
   * cadastro começa direto no passo do administrador.
   */
  paidCompanyId?: string;
}

export default function RegistrationFlow({
  chosenPlan,
  chosenBillingCycle = "monthly",
  freePlanId,
  paidCompanyId,
}: RegistrationFlowProps) {
  const [step, setStep] = useState<Step>("loading");
  const [companyId, setCompanyId] = useState<string | null>(null);
  /** O ciclo da empresa já criada, que vai para o pagamento. Um cadastro retomado traz o seu. */
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(chosenBillingCycle);
  const [resumed, setResumed] = useState(false);
  const [paid, setPaid] = useState(false);
  const [free, setFree] = useState(!!freePlanId);
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
    setFree(!!freePlanId);
    setNotice(message);
    setStep(reason === "company-has-admin" ? "done" : "company");
  }, [freePlanId]);

  /**
   * Abre o Stripe Checkout do plano escolhido. O navegador sai da página e o
   * Stripe o devolve para /pagamento-sucesso ou /pagamento-falha.
   */
  const goToCheckout = useCallback(
    async (id: string, cycle: BillingCycle) => {
      setCheckout({ status: "redirecting" });
      // Antes da chamada à API: o redirecionamento para o Stripe poderia cancelar o envio.
      const pendingCheckout = pendingRegistration.getCheckout();
      metaPixel.track("InitiateCheckout", pendingCheckout ? checkoutParams(pendingCheckout) : undefined);
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
        freePlan: false,
      });
      setCompanyId(paidCompanyId);
      setPaid(true);
      setStep("admin");
      return;
    }

    const saved = pendingRegistration.get();
    if (saved?.freePlan) {
      // A empresa já está no plano gratuito: só falta o administrador, com ou sem ?freePlan=true.
      setCompanyId(saved.companyId);
      setFree(true);
      setResumed(true);
      setStep("admin");
    } else if (saved && !freePlanId) {
      setCompanyId(saved.companyId);
      setBillingCycle(saved.billingCycle);
      setResumed(true);
      setStep("payment");
    } else {
      // No cadastro gratuito, um cadastro pago em andamento não é retomado: ele levaria ao pagamento.
      setStep("company");
    }
  }, [paidCompanyId, freePlanId]);

  // O plano em que a empresa é criada. Sem ele, o passo da empresa manda escolher o plano na landing.
  const companyPlan = free ? undefined : chosenPlan;
  const companyPlanId = free ? freePlanId : chosenPlan?.id;

  const handleCompanyCreated = (id: string) => {
    const cycle = chosenBillingCycle;
    pendingRegistration.set({ companyId: id, billingCycle: cycle, freePlan: free });
    pendingRegistration.setCheckout(
      companyPlan ? { planName: companyPlan.name, valueInCents: chargeInCents(companyPlan, cycle) } : null,
    );
    setCompanyId(id);
    setBillingCycle(cycle);
    setResumed(false);
    setNotice(null);
    if (free) return goTo("admin");
    goTo("payment");
    void goToCheckout(id, cycle);
  };

  const handleAdminCreated = (created: AdminCreatedResult) => {
    metaPixel.track("CompleteRegistration", { content_name: free ? "gratuito" : "pago" });
    pendingRegistration.clear();
    setCompanyId(null);
    setResult(created);
    goTo("done");
  };

  const handlePaymentRequired = (message: string) => {
    setPaid(false);
    setFree(false);
    setNotice(message);
    setCheckout({ status: "idle" });
    goTo("payment");
  };

  const restart = () => {
    pendingRegistration.clear();
    setCompanyId(null);
    setResumed(false);
    setPaid(false);
    setFree(!!freePlanId);
    setNotice(null);
    setCheckout({ status: "idle" });
    goTo("company");
  };

  const steps = free ? FREE_PLAN_STEPS : STEPS;
  const currentIndex = step === "done" ? steps.length : Math.max(0, steps.findIndex((s) => s.id === step));

  return (
    <div ref={topRef} className="scroll-mt-24">
      {step !== "done" && (
        <ol className="mb-6 flex items-center gap-3" aria-label="Etapas do cadastro">
          {steps.map((s, i) => {
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
                    Passo {i + 1} de {steps.length}
                  </span>
                  <span className={clsx("block truncate text-[14px] font-extrabold", current ? "text-ink" : "text-ink-2")}>
                    {s.label}
                  </span>
                </span>
                {i < steps.length - 1 && <span aria-hidden className="hidden h-[2px] flex-1 rounded-full bg-line sm:block" />}
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

        {step === "company" &&
          (companyPlanId ? (
            <>
              <StepHeader
                title="Conte sobre a sua empresa"
                description="Leva uns 3 minutos. Tenha em mãos o cartão CNPJ: os dados precisam ser os mesmos da Receita Federal."
              />
              {notice && <Notice tone="warning">{notice}</Notice>}
              <PlanSummary plan={companyPlan} billingCycle={chosenBillingCycle} />
              <CompanyForm planId={companyPlanId} onCreated={handleCompanyCreated} />
            </>
          ) : (
            <>
              <StepHeader
                title="Escolha o seu plano"
                description="O cadastro começa pelo plano: veja os planos e clique em Assinar no que for melhor para a sua loja."
              />
              {notice && <Notice tone="warning">{notice}</Notice>}
              <Link
                href="/#planos"
                className="inline-flex items-center justify-center rounded-[13px] bg-accent px-7 py-4 text-[15px] font-extrabold text-white transition-colors hover:bg-black"
              >
                Ver os planos
              </Link>
            </>
          ))}

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
            {free &&
              (resumed ? (
                <Notice tone="info">
                  Encontramos um cadastro em andamento neste navegador: os dados da empresa já foram salvos, falta
                  criar o seu acesso.{" "}
                  <button type="button" onClick={restart} className="font-extrabold underline underline-offset-2 hover:text-ink">
                    Quer cadastrar outra empresa?
                  </button>
                </Notice>
              ) : (
                <Notice tone="success">Empresa cadastrada no plano gratuito! Agora é só criar o seu acesso.</Notice>
              ))}
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

/** O plano do cadastro, já escolhido no card de preço. Sem `plan`, é o gratuito. */
function PlanSummary({ plan, billingCycle }: { plan?: PlanResponseDTO; billingCycle: BillingCycle }) {
  return (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-[14px] bg-surface-2 px-4 py-3 text-[14px] text-ink-2">
      {plan ? (
        <>
          <p>
            Plano <strong className="text-ink">{planTitle(plan)}</strong>:{" "}
            <strong className="text-ink">{formatBRL(chargeInCents(plan, billingCycle))}</strong>
            {billingCycle === "yearly" ? " por ano, à vista" : " por mês"}
          </p>
          <Link href="/#planos" className="font-extrabold text-accent hover:underline">
            Trocar plano
          </Link>
        </>
      ) : (
        <p>
          Plano <strong className="text-ink">gratuito</strong>: sem cobrança e sem cartão de crédito.
        </p>
      )}
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
