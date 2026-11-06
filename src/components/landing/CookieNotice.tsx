"use client";

import CookiesCard from "@/components/cards/CookiesCard";
import { cookieNotice } from "@/services/cookieNotice";
import { metaPixel } from "@/services/metaPixel";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Aviso fixo na base da tela até o visitante responder. */
export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  // Lido só no navegador: no servidor não dá para saber se o visitante já respondeu.
  useEffect(() => {
    setVisible(cookieNotice.get() === null);
  }, []);

  if (!visible) return null;

  return (
    <section aria-label="Aviso de cookies" className="fixed inset-x-0 bottom-0 z-50 font-sans">
      <CookiesCard
        description={
          <>
            Utilizamos Facebook Pixel para metrificar a ação de usuários em nosso site. Ao utilizar nosso site você concorda
            com nossa{" "}
            <Link href="/politica-de-privacidade#cookies" className="font-semibold underline">
              política de privacidade
            </Link>
            . Caso você não permita metrificar seus dados, clique no botão não permitir.
          </>
        }
        onConfirm={() => {
          cookieNotice.set("acknowledged");
          setVisible(false);
        }}
        declineButtonTitle="Não permitir"
        onDecline={() => {
          metaPixel.optOut();
          setVisible(false);
        }}
      />
    </section>
  );
}
