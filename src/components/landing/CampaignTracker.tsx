"use client";

import { campaign, withCampaignCode } from "@/services/campaign";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const WHATSAPP_URL = "https://wa.me/";

/**
 * Guarda a campanha do anúncio (utm_campaign) ao chegar ao site e a acrescenta
 * à mensagem dos links de venda do WhatsApp (`data-meta-lead`) no clique, para
 * o CRM saber qual campanha trouxe o lead. Os links de suporte não a recebem.
 */
export default function CampaignTracker() {
  const pathname = usePathname();

  useEffect(() => {
    campaign.capture(window.location.search);
  }, [pathname]);

  // Delegado no documento, como o MetaPixel: os links são Server Components. A
  // troca do href antes da navegação vale para o clique, o toque, o Enter e o
  // botão do meio.
  useEffect(() => {
    const addCampaignCode = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-meta-lead]");
      if (!link?.href.startsWith(WHATSAPP_URL)) return;

      const code = campaign.get();
      if (code) link.href = withCampaignCode(link.href, code);
    };

    document.addEventListener("click", addCampaignCode, true);
    document.addEventListener("auxclick", addCampaignCode, true);
    return () => {
      document.removeEventListener("click", addCampaignCode, true);
      document.removeEventListener("auxclick", addCampaignCode, true);
    };
  }, []);

  return null;
}
