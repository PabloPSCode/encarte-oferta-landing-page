/** Espelha PlanResponseDTO / PlanPresenter de encarte-oferta-api. */
export type PlanName = "free" | "start" | "avançado" | "profissional";

export interface PlanResponseDTO {
  id: string;
  name: PlanName;
  monthValueInCents: number;
  yearValueInCents: number;
  maxFlyerGenerations: number;
  maxAiThemeGenerations: number;
  maxAiVideoGenerations: number;
  maxConnections: number;
  /** Cota vitalícia (não mensal). Null ou ausente quando a API ainda não tem a coluna. */
  maxCustomProducts?: number | null;
  productBgRemotionInclude: boolean;
  instagramIntegration: boolean;
  facebookIntegration: boolean;
  whatsappIntegration: boolean;
  tiktokIntegration: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Resposta de GET /plans. */
export interface ListPlansResponse {
  data: PlanResponseDTO[];
}
