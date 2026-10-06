import type { BillingCycle } from "@/dtos/registration";
import { PENDING_BILLING_CYCLE_KEY, PENDING_COMPANY_KEY } from "@/services/registration";

/**
 * O cadastro em andamento neste navegador: a empresa já criada e o ciclo de
 * cobrança escolhido. Sobrevive à ida e volta do Stripe Checkout e permite
 * retomar o cadastro depois. localStorage pode não existir ou lançar (aba
 * anônima, cookies bloqueados): o cadastro segue sem ele.
 */
export interface PendingRegistration {
  companyId: string;
  billingCycle: BillingCycle;
}

export const pendingRegistration = {
  get(): PendingRegistration | null {
    try {
      const companyId = window.localStorage.getItem(PENDING_COMPANY_KEY);
      if (!companyId) return null;
      const cycle = window.localStorage.getItem(PENDING_BILLING_CYCLE_KEY);
      return { companyId, billingCycle: cycle === "yearly" ? "yearly" : "monthly" };
    } catch {
      return null;
    }
  },
  set(value: PendingRegistration) {
    try {
      window.localStorage.setItem(PENDING_COMPANY_KEY, value.companyId);
      window.localStorage.setItem(PENDING_BILLING_CYCLE_KEY, value.billingCycle);
    } catch {}
  },
  clear() {
    try {
      window.localStorage.removeItem(PENDING_COMPANY_KEY);
      window.localStorage.removeItem(PENDING_BILLING_CYCLE_KEY);
    } catch {}
  },
};