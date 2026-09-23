import type { ListPlansResponse, PlanResponseDTO } from "@/dtos/plans";
import { plansMock } from "@/mocks/plans";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Mesma ordem da tela de planos do app: valor mensal e, no empate, cota de encartes. */
function sortPlans(plans: PlanResponseDTO[]) {
  return [...plans].sort(
    (a, b) => a.monthValueInCents - b.monthValueInCents || a.maxFlyerGenerations - b.maxFlyerGenerations
  );
}

/**
 * Lê os planos de GET /plans. Sem NEXT_PUBLIC_API_URL, ou se a API falhar,
 * usa o mock com os registros atuais da tabela `plans`.
 */
export async function getPlans(): Promise<PlanResponseDTO[]> {
  if (!API_URL) return sortPlans(plansMock.data);

  try {
    const res = await fetch(`${API_URL.replace(/\/$/, "")}/plans`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`GET /plans respondeu ${res.status}`);
    const body = (await res.json()) as ListPlansResponse;
    return body.data.length ? sortPlans(body.data) : sortPlans(plansMock.data);
  } catch (error) {
    console.warn("[plans] usando mock:", error instanceof Error ? error.message : error);
    return sortPlans(plansMock.data);
  }
}
