import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { SEGMENT_PAGES } from "@/content/segments";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ["", "/cadastro", "/termos-de-uso", "/politica-de-privacidade", "/politica-de-cancelamento", "/meus-dados"].map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: path ? "yearly" : "monthly",
    priority: path ? 0.3 : 1,
  }));

  const segments: MetadataRoute.Sitemap = SEGMENT_PAGES.map((s) => ({
    url: `${SITE.url}/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...segments];
}
