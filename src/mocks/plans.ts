import type { ListPlansResponse } from "@/dtos/plans";

/**
 * Registros da tabela `plans` (encarte_oferta_db), no formato devolvido por
 * GET /plans. Usado enquanto NEXT_PUBLIC_API_URL não estiver configurada ou
 * se a API não responder.
 */
export const plansMock: ListPlansResponse = {
  data: [
    {
      id: "21d7da52-691a-46ec-bab9-93fde8f1412f",
      name: "start",
      monthValueInCents: 19900,
      yearValueInCents: 199000,
      maxFlyerGenerations: 100,
      maxAiThemeGenerations: 10,
      maxAiVideoGenerations: 10,
      maxConnections: 4,
      productBgRemotionInclude: true,
      instagramIntegration: true,
      facebookIntegration: true,
      whatsappIntegration: true,
      tiktokIntegration: true,
      createdAt: "2026-08-30T14:25:57.632Z",
      updatedAt: "2026-08-30T14:25:57.632Z",
    },
    {
      id: "8a37abd3-2969-4213-9888-29710bfcaee9",
      name: "avançado",
      monthValueInCents: 26900,
      yearValueInCents: 269000,
      maxFlyerGenerations: 200,
      maxAiThemeGenerations: 20,
      maxAiVideoGenerations: 20,
      maxConnections: 10,
      productBgRemotionInclude: true,
      instagramIntegration: true,
      facebookIntegration: true,
      whatsappIntegration: true,
      tiktokIntegration: true,
      createdAt: "2026-08-30T14:27:22.833Z",
      updatedAt: "2026-08-30T14:27:22.833Z",
    },
    {
      id: "76d26f29-e18f-40bb-b1ae-01363b567026",
      name: "profissional",
      monthValueInCents: 26900,
      yearValueInCents: 269000,
      maxFlyerGenerations: 400,
      maxAiThemeGenerations: 40,
      maxAiVideoGenerations: 40,
      maxConnections: 20,
      productBgRemotionInclude: true,
      instagramIntegration: true,
      facebookIntegration: true,
      whatsappIntegration: true,
      tiktokIntegration: true,
      createdAt: "2026-08-30T14:28:44.972Z",
      updatedAt: "2026-08-30T14:28:44.972Z",
    },
  ],
};
