/**
 * A campanha do anúncio que trouxe o visitante: o `utm_campaign` do link
 * ("acougue-nov26"). Vai no fim da mensagem dos links de venda do WhatsApp,
 * "(cód. acougue-nov26)", e o Agente Comercial cria o lead no CRM com ela.
 *
 * Fica 30 dias no localStorage, para valer também quando o visitante volta
 * depois; um novo anúncio troca a campanha. localStorage pode não existir ou
 * lançar (aba anônima, cookies bloqueados): o código vale só nesta visita.
 */

const CAMPAIGN_KEY = "encarte-oferta:campanha";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/** O mesmo formato que o CRM aceita: letras minúsculas, números, - e _, até 60. */
const CAMPAIGN_PATTERN = /^[a-z0-9][a-z0-9_-]{0,59}$/;

/** Uma mensagem que já traz o código não ganha outro. */
const CODE_SUFFIX_PATTERN = /\(c[óo]d\.?\s*[a-z0-9_-]+\)\s*$/i;

interface StoredCampaign {
  code: string;
  savedAt: number;
}

let inMemory: StoredCampaign | null = null;

const normalize = (value: string | null) => {
  const code = value?.trim().toLowerCase() ?? "";
  return CAMPAIGN_PATTERN.test(code) ? code : null;
};

export const campaign = {
  /** Guarda o utm_campaign da URL, quando há um válido. */
  capture(search: string) {
    const code = normalize(new URLSearchParams(search).get("utm_campaign"));
    if (!code) return;

    inMemory = { code, savedAt: Date.now() };
    try {
      window.localStorage.setItem(CAMPAIGN_KEY, JSON.stringify(inMemory));
    } catch {}
  },
  get(): string | null {
    let stored = inMemory;
    try {
      const value = window.localStorage.getItem(CAMPAIGN_KEY);
      if (value) stored = JSON.parse(value) as StoredCampaign;
    } catch {}

    if (!stored || Date.now() - stored.savedAt > MAX_AGE_MS) return null;
    return normalize(stored.code);
  },
};

/**
 * O link do WhatsApp com " (cód. <campanha>)" no fim do texto da mensagem.
 * Codificado como whatsappLink (encodeURIComponent, espaço como %20), não como
 * URLSearchParams, que troca o espaço por "+".
 */
export function withCampaignCode(href: string, code: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }

  const text = url.searchParams.get("text") ?? "";
  if (CODE_SUFFIX_PATTERN.test(text)) return href;

  return `${url.origin}${url.pathname}?text=${encodeURIComponent(`${text} (cód. ${code})`.trim())}`;
}
