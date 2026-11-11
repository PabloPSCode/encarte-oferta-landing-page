import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { SEGMENT_PAGES } from "@/content/segments";
import { getBlogContentSafe } from "@/services/blog";
import { BLOG_PATH, blogPostHref } from "@/utils/blog";

/** Inclui posts novos do Blog Manager a cada hora. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const { posts } = await getBlogContentSafe();
  const blog: MetadataRoute.Sitemap = [
    { url: `${SITE.url}${BLOG_PATH}`, lastModified: posts[0]?.createdAt, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: `${SITE.url}${blogPostHref(post)}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...pages, ...segments, ...blog];
}
