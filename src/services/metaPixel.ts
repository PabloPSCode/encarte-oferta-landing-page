import { SITE } from "@/content/site";
import { cookieNotice } from "@/services/cookieNotice";
import type { PendingCheckout } from "@/services/pendingRegistration";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  disablePushState?: boolean;
  allowDuplicatePageViews?: boolean;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export type ConversionEvent = "Lead" | "InitiateCheckout" | "Purchase" | "CompleteRegistration";

export type ConversionParams = Record<string, string | number>;

const PIXEL_SCRIPT_URL = "https://connect.facebook.net/en_US/fbevents.js";
const PIXEL_COOKIES = ["_fbp", "_fbc"];

/** O Stripe volta para cá com `?session_id=`, e o script do Pixel envia a URL inteira à Meta. */
const PAYMENT_RETURN_PATHS = ["/pagamento-sucesso", "/pagamento-falha"];

const isPaymentReturnPage = () => PAYMENT_RETURN_PATHS.includes(window.location.pathname);

/** Lido a cada envio: vale também para as outras abas abertas quando o visitante recusa em uma delas. */
const isOptedOut = () => cookieNotice.get() === "denied";

/**
 * Equivalente ao código-base do Meta Pixel. Fica aqui, e não no <head>, porque
 * nas páginas de retorno do pagamento o script não pode carregar.
 */
function load() {
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  // Sem isto, o script envia um PageView próprio a cada mudança de URL, inclusive ao
  // voltar pelo navegador para /pagamento-sucesso?session_id=. Só trackPageView os envia,
  // e sem o segundo ajuste o script descartaria todos depois do primeiro de cada carga.
  fbq.disablePushState = true;
  fbq.allowDuplicatePageViews = true;
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = PIXEL_SCRIPT_URL;
  document.head.appendChild(script);

  // Só os eventos enviados por este código: nada de leitura automática da página,
  // que alcançaria formulários como o de cadastro (CPF, e-mail, WhatsApp).
  fbq("set", "autoConfig", false, SITE.metaPixelId);
  fbq("init", SITE.metaPixelId);
}

const readCookie = (name: string) =>
  document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);

/**
 * Forma sem script do Pixel (requisição de imagem), usada na volta do Stripe:
 * aqui o endereço enviado é o informado abaixo, sem a query string.
 */
function sendWithoutQueryString(event: ConversionEvent, params: ConversionParams) {
  const query = new URLSearchParams({
    id: SITE.metaPixelId,
    ev: event,
    dl: `${window.location.origin}${window.location.pathname}`,
    noscript: "1",
  });
  for (const [key, value] of Object.entries(params)) query.set(`cd[${key}]`, String(value));
  for (const name of PIXEL_COOKIES) {
    const value = readCookie(name);
    if (value) query.set(name.slice(1), value);
  }

  new Image().src = `https://www.facebook.com/tr?${query}`;
}

/** O Pixel grava os cookies no domínio raiz, então tenta cada nível do hostname. */
function removeCookies() {
  const labels = window.location.hostname.split(".");
  const domains = labels.slice(0, -1).map((_, i) => `; domain=.${labels.slice(i).join(".")}`);
  for (const name of PIXEL_COOKIES) {
    for (const domain of ["", ...domains]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

/** Plano e valor de um evento de pagamento. A Meta exige `value` e `currency` na compra. */
export function checkoutParams({ planName, valueInCents }: PendingCheckout): ConversionParams {
  return { content_name: planName, value: valueInCents / 100, currency: "BRL" };
}

export const metaPixel = {
  /** Carrega o Pixel na primeira vez. */
  trackPageView() {
    if (isOptedOut() || isPaymentReturnPage()) return;
    if (!window.fbq) load();
    window.fbq?.("track", "PageView");
  },
  track(event: ConversionEvent, params: ConversionParams = {}) {
    if (isOptedOut()) return;
    if (isPaymentReturnPage()) sendWithoutQueryString(event, params);
    else window.fbq?.("track", event, params);
  },
  /** "Não permitir": para os envios neste navegador, nesta visita e nas próximas, e apaga os cookies do Pixel. */
  optOut() {
    cookieNotice.set("denied");
    window.fbq?.("consent", "revoke");
    removeCookies();
  },
};
