export type CookieNoticeAnswer = "acknowledged" | "denied";

const COOKIE_NOTICE_KEY = "encarte-oferta:cookie-notice";

/** Vale até recarregar a página quando o localStorage não existe ou lança (aba anônima, cookies bloqueados). */
let inMemoryAnswer: CookieNoticeAnswer | null = null;

/**
 * A resposta do visitante ao aviso sobre cookies: "denied" desliga o Pixel neste
 * navegador. `null` significa que ele ainda não respondeu e o aviso deve aparecer.
 */
export const cookieNotice = {
  get(): CookieNoticeAnswer | null {
    try {
      const value = window.localStorage.getItem(COOKIE_NOTICE_KEY);
      if (value === "acknowledged" || value === "denied") return value;
    } catch {}
    return inMemoryAnswer;
  },
  set(answer: CookieNoticeAnswer) {
    inMemoryAnswer = answer;
    try {
      window.localStorage.setItem(COOKIE_NOTICE_KEY, answer);
    } catch {}
  },
};
