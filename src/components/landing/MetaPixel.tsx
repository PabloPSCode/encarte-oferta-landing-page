"use client";

import { metaPixel } from "@/services/metaPixel";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Envia um PageView por rota visitada e um Lead por clique nos links marcados com `data-meta-lead`. */
export default function MetaPixel() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    metaPixel.trackPageView();
  }, [pathname]);

  // Delegado no documento: os links de venda são, em sua maioria, Server Components.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-meta-lead]")) {
        metaPixel.track("Lead");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
