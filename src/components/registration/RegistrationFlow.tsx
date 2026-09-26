"use client";

import { SITE, SUPPORT, whatsappLink } from "@/content/site";
import type { PlanResponseDTO } from "@/dtos/plans";
import { PENDING_COMPANY_KEY } from "@/services/registration";
import { Check, CheckCircle, CircleNotch, EnvelopeSimple, Info, WhatsappLogo } from "@phosphor-icons/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import AdminForm, { type AdminCreatedResult, type AdminFailure } from "./AdminForm";
import CompanyForm from "./CompanyForm";

type Step = "loading" | "company" | "admin" | "done";

/** localStorage pode não existir ou lançar (aba anônima, cookies bloqueados): o cadastro segue sem ele. */
const storage = {
  get: () => {
    try {
      return window.localStorage.getItem(PENDING_COMPANY_KEY);
    } catch {
      return null;
    }
  },
  set: (companyId: string) => {
    try {
      window.localStorage.setItem(PENDING_COMPANY_KEY, companyId);
    } catch {}
  },
  clear: () => {
    try {
      window.localStorage.removeItem(PENDING_COMPANY_KEY);
    } catch {}
  },
};

const STEPS = [
  { id: "company", label: "Dados da empresa" },
  { id: "admin", label: "Administrador" },
] as const;

const SUPPORT_LINK = whatsappLink("Olá! Preciso de ajuda com o cadastro da minha empresa no Encarte Oferta.");

interface RegistrationFlowProps {
  plans: PlanResponseDTO[];
  defaultPlanId?: string;
}

export default function RegistrationFlow({ plans, defaultPlanId }: RegistrationFlowProps) {
  const [step, setStep] = useState<Step>("loading");
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [resumed, setResumed] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [result, setResult] = useState<AdminCreatedResult | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Lido só no navegador: quem fechou a página depois de cadastrar a empresa volta direto ao passo 2.
  useEffect(() => {
    const saved = storage.get();
    if (saved) {
      setCompanyId(saved);
      setResumed(true);
      setStep("admin");
    } else {
      setStep("company");
    }
  }, []);

  const goTo = (next: Step) => {
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCompanyCreated = (id: string) => {
    storage.set(id);
    setCompanyId(id);
    setResumed(false);
    setNotice(null);
    goTo("admin");
  };

  const handleAdminCreated = (created: AdminCreatedResult) => {
    storage.clear();
    setCompanyId(null);
    setResult(created);
    goTo("done");
  };

  const handleCompanyUnavailable = (reason: AdminFailure, message: string) => {
    storage.clear();
    setCompanyId(null);
    setResumed(false);
    setNotice(message);
    goTo(reason === "company-has-admin" ? "done" : "company");
  };

  const restart = () => {
    storage.clear();
    setCompanyId(null);
    setResumed(false);
    setNotice(null);
    goTo("company");
  };

  const currentIndex = step === "admin" ? 1 : step === "done" ? 2 : 0;

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
                    Passo {i + 1} de 2
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
            <CompanyForm plans={plans} defaultPlanId={defaultPlanId} onCreated={handleCompanyCreated} />
          </>
        )}

        {step === "admin" && companyId && (
          <>
            <StepHeader
              title="Agora, crie o seu acesso"
              description="Falta pouco! Cadastre quem vai administrar a conta da empresa no Encarte Oferta."
            />
            {resumed ? (
              <Notice tone="info">
                Encontramos um cadastro em andamento neste navegador: os dados da empresa já foram salvos, então você
                continua de onde parou.{" "}
                <button type="button" onClick={restart} className="font-extrabold underline underline-offset-2 hover:text-ink">
                  Quer cadastrar outra empresa?
                </button>
              </Notice>
            ) : (
              <Notice tone="success">Empresa cadastrada com sucesso! Os dados já estão salvos.</Notice>
            )}
            <AdminForm
              companyId={companyId}
              onCreated={handleAdminCreated}
              onCompanyUnavailable={handleCompanyUnavailable}
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
