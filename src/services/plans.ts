import type { ListPlansResponse, PlanName, PlanResponseDTO } from "@/dtos/plans";
import { plansMock } from "@/mocks/plans";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** O plano gratuito não é oferecido na landing: só no cadastro aberto com ?freePlan=true (ver getFreePlan). */
const HIDDEN_PLANS: PlanName[] = ["free"];

/**
 * Remove os planos ocultos e mantém a ordem da tela de planos do app: valor
 * mensal e, no empate, cota de encartes.
 */
function sortPlans(plans: PlanResponseDTO[]) {
  return plans
    .filter((plan) => !HIDDEN_PLANS.includes(plan.name))
    .sort((a, b) => a.monthValueInCents - b.monthValueInCents || a.maxFlyerGenerations - b.maxFlyerGenerations);
}

/**
 * Lê os planos de GET /plans, sem filtro. Sem NEXT_PUBLIC_API_URL, ou se a API
 * falhar, usa o mock com os registros atuais da tabela `plans`.
 */
async function fetchPlans(): Promise<PlanResponseDTO[]> {
  if (!API_URL) return plansMock.data;

  try {
    const res = await fetch(`${API_URL.replace(/\/$/, "")}/plans`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`GET /plans respondeu ${res.status}`);
    const body = (await res.json()) as ListPlansResponse;
    return body.data;
  } catch (error) {
    console.warn("[plans] usando mock:", error instanceof Error ? error.message : error);
    return plansMock.data;
  }
}

/** Os planos oferecidos na landing e no cadastro. */
export async function getPlans(): Promise<PlanResponseDTO[]> {
  const plans = sortPlans(await fetchPlans());
  return plans.length ? plans : sortPlans(plansMock.data);
}

/** O plano gratuito, para o cadastro aberto com ?freePlan=true. Null se a API não o tiver. */
export async function getFreePlan(): Promise<PlanResponseDTO | null> {
  return (await fetchPlans()).find((plan) => plan.name === "free") ?? null;
}
