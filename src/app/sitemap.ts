import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/termos-de-uso", "/politica-de-privacidade", "/exclusao-de-dados"].map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: path ? "yearly" : "monthly",
    priority: path ? 0.3 : 1,
  }));
}
