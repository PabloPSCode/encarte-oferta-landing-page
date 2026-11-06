import type { BillingCycle } from "@/dtos/registration";
import {
  PENDING_BILLING_CYCLE_KEY,
  PENDING_CHECKOUT_KEY,
  PENDING_COMPANY_KEY,
  PENDING_FREE_PLAN_KEY,
} from "@/services/registration";

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

/** O que será cobrado no Stripe Checkout: a API não informa o valor na confirmação do pagamento. */
export interface PendingCheckout {
  planName: string;
  valueInCents: number;
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
      window.localStorage.removeItem(PENDING_CHECKOUT_KEY);
    } catch {}
  },
  getCheckout(): PendingCheckout | null {
    try {
      const value = window.localStorage.getItem(PENDING_CHECKOUT_KEY);
      return value ? (JSON.parse(value) as PendingCheckout) : null;
    } catch {
      return null;
    }
  },
  setCheckout(value: PendingCheckout | null) {
    try {
      if (value) window.localStorage.setItem(PENDING_CHECKOUT_KEY, JSON.stringify(value));
      else window.localStorage.removeItem(PENDING_CHECKOUT_KEY);
    } catch {}
  },
};