import type { BlogPost, BlogPostSummary } from "@/dtos/blog";

export const BLOG_PATH = "/blog";

const WORDS_PER_MINUTE = 200;

/** Remove acentos e caixa, para comparar textos na busca. */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Mesmo algoritmo da pls-sistemas-landing-page (src/utils/slug.ts). */
export function formatSlug(value: string): string {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

/** Troca entidades HTML (`&lt;`, `&amp;`, `&#233;`…) pelos caracteres. */
export function decodeEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, code: string) => {
    if (code[0] === "#") {
      const value = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(value) && value <= 0x10ffff ? String.fromCodePoint(value) : entity;
    }
    return ENTITIES[code.toLowerCase()] ?? entity;
  });
}

export function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/** Corta o texto no limite de caracteres, sem partir palavras. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:!?-]+$/, "")}…`;
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function blogPostHref(post: Pick<BlogPost, "slug">): string {
  return `${BLOG_PATH}/${post.slug}`;
}

/** "10 de novembro de 2026", no fuso de Brasília. */
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

export function toPostSummary(post: BlogPost): BlogPostSummary {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverUrl: post.coverUrl,
    readingMinutes: post.readingMinutes,
    createdAt: post.createdAt,
    publishedLabel: formatPostDate(post.createdAt),
    searchText: normalizeText(`${post.title} ${post.plainText}`),
  };
}

/** Os posts mais recentes, sem o atual. Os posts ainda não têm categorias nem tags no Blog Manager. */
export function relatedPosts(posts: BlogPost[], slug: string, limit = 3): BlogPost[] {
  return posts.filter((post) => post.slug !== slug).slice(0, limit);
}
