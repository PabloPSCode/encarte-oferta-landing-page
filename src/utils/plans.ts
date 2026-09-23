import type { PlanResponseDTO } from "@/dtos/plans";

/**
 * Regras de exibição dos planos, as mesmas da tela de planos do app
 * (encarte-oferta-web/src/screens/app/Settings/Plans/planFeatures.ts).
 */

/** "avançado" → "Avançado". A API guarda o nome em minúsculas. */
export function planTitle(plan: PlanResponseDTO) {
  return plan.name.charAt(0).toUpperCase() + plan.name.slice(1);
}

/** Desconto do pagamento anual frente a 12 mensalidades, em % inteiro, ou null se não houver. */
export function annualDiscountPercentage(plan: PlanResponseDTO): number | null {
  const twelveMonths = plan.monthValueInCents * 12;
  if (twelveMonths <= 0) return null;
  const saved = twelveMonths - plan.yearValueInCents;
  if (saved <= 0) return null;
  return Math.round((saved / twelveMonths) * 100);
}

/** Valor anual dividido em 12 meses, em centavos. */
export function monthlyEquivalentInCents(plan: PlanResponseDTO) {
  return Math.round(plan.yearValueInCents / 12);
}

export function planAllowances(plan: PlanResponseDTO) {
  return [
    { label: "Encartes por mês", value: plan.maxFlyerGenerations },
    { label: "Temas com IA por mês", value: plan.maxAiThemeGenerations },
    { label: "Vídeos com IA por mês", value: plan.maxAiVideoGenerations },
    { label: "Contas conectadas", value: plan.maxConnections },
  ];
}

/**
 * Itens incluídos ou não. WhatsApp é envio por link (não há integração de
 * publicação) e o TikTok ainda não pode ser conectado, por isso os rótulos
 * diferem dos do app.
 */
export function planInclusions(plan: PlanResponseDTO) {
  return [
    { label: "Remoção de fundo dos produtos", included: plan.productBgRemotionInclude },
    { label: "Publicação no Instagram", included: plan.instagramIntegration },
    { label: "Publicação no Facebook", included: plan.facebookIntegration },
    { label: "Envio pelo WhatsApp", included: plan.whatsappIntegration },
    { label: "Publicação no TikTok (em breve)", included: plan.tiktokIntegration },
  ];
}
