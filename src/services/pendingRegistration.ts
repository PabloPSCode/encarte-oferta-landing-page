import type { BillingCycle } from "@/dtos/registration";
import { PENDING_BILLING_CYCLE_KEY, PENDING_COMPANY_KEY, PENDING_FREE_PLAN_KEY } from "@/services/registration";

/**
 * O cadastro em andamento neste navegador: a empresa já criada e o ciclo de
 * cobrança escolhido. Sobrevive à ida e volta do Stripe Checkout e permite
 * retomar o cadastro depois. localStorage pode não existir ou lançar (aba
 * anônima, cookies bloqueados): o cadastro segue sem ele.
 */
export interface PendingRegistration {
  companyId: string;
  billingCycle: BillingCycle;
  /** Empresa no plano gratuito: o cadastro retoma direto no passo do administrador. */
  freePlan: boolean;
}

export const pendingRegistration = {
  get(): PendingRegistration | null {
    try {
      const companyId = window.localStorage.getItem(PENDING_COMPANY_KEY);
      if (!companyId) return null;
      const cycle = window.localStorage.getItem(PENDING_BILLING_CYCLE_KEY);
      return {
        companyId,
        billingCycle: cycle === "yearly" ? "yearly" : "monthly",
        freePlan: window.localStorage.getItem(PENDING_FREE_PLAN_KEY) === "true",
      };
    } catch {
      return null;
    }
  },
  set(value: PendingRegistration) {
    try {
      window.localStorage.setItem(PENDING_COMPANY_KEY, value.companyId);
      window.localStorage.setItem(PENDING_BILLING_CYCLE_KEY, value.billingCycle);
      if (value.freePlan) window.localStorage.setItem(PENDING_FREE_PLAN_KEY, "true");
      else window.localStorage.removeItem(PENDING_FREE_PLAN_KEY);
    } catch {}
  },
  clear() {
    try {
      window.localStorage.removeItem(PENDING_COMPANY_KEY);
      window.localStorage.removeItem(PENDING_BILLING_CYCLE_KEY);
      window.localStorage.removeItem(PENDING_FREE_PLAN_KEY);
    } catch {}
  },
};