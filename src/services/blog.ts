import { cache } from "react";
import sanitizeHtml from "sanitize-html";
import type { BlogManagerAuthor, BlogManagerPost, BlogManagerSiteRecord, BlogPost } from "@/dtos/blog";
import { countWords, decodeEntities, formatSlug, readingMinutes, stripHtml, truncate } from "@/utils/blog";

/**
 * Cliente da blog-manager-api (blog_manager/blog-manager-api), no mesmo fluxo da
 * pls-sistemas-landing-page (src/api/blog-manager.ts):
 *
 * 1. GET /sites (público) e escolhe o site do Encarte Oferta;
 * 2. POST /auth/login com o domínio e a senha do site, que devolve um JWT;
 * 3. GET /authors e GET /posts com o JWT, que já filtram pelo site.
 *
 * Roda só no servidor (páginas e sitemap). As páginas do blog usam ISR, então a
 * API é consultada no build e, depois, no máximo uma vez a cada `revalidate`.
 */

const API_URL = (process.env.BLOG_MANAGER_API_BASE_URL?.trim() || "https://blog-manager-api.plssistemas.com.br").replace(
  /\/+$/,
  ""
);
const SITE_ID = process.env.BLOG_MANAGER_SITE_ID?.trim();
const SITE_DOMAIN = normalizeDomain(process.env.BLOG_MANAGER_SITE_DOMAIN?.trim() || "encarteoferta.com.br");

const REQUEST_TIMEOUT_MS = 10_000;
const DEFAULT_AUTHOR_NAME = "Equipe Encarte Oferta";
const EXCERPT_LENGTH = 180;

export interface BlogContent {
  posts: BlogPost[];
}

const loadBlogContent = cache(async (): Promise<BlogContent> => {
  const site = resolveSite(await fetchJson<BlogManagerSiteRecord[]>("/sites"));
  const { jwt } = await fetchJson<{ jwt: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ domain: site.domain, password: site.password }),
  });
  const auth = { headers: { Authorization: `Bearer ${jwt}` } };
  const [authors, posts] = await Promise.all([
    fetchJson<BlogManagerAuthor[]>("/authors", auth),
    fetchJson<BlogManagerPost[]>("/posts", auth),
  ]);

  return { posts: mapPosts(posts, authors) };
});

/**
 * Posts publicados do Encarte Oferta, do mais recente ao mais antigo. Se a API
 * falhar, devolve uma lista vazia: o blog nunca derruba a página.
 */
export async function getBlogContentSafe(): Promise<BlogContent> {
  try {
    return await loadBlogContent();
  } catch (error) {
    console.error("[blog] falha ao carregar os posts:", error instanceof Error ? error.message : error);
    return { posts: [] };
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const { posts } = await getBlogContentSafe();
  return posts.find((post) => post.slug === slug);
}

function resolveSite(sites: BlogManagerSiteRecord[]): BlogManagerSiteRecord {
  const active = sites.filter((site) => site.deletedAt === null);

  const site =
    (SITE_ID && active.find((s) => s.id === SITE_ID)) ||
    active.find((s) => normalizeDomain(s.domain) === SITE_DOMAIN || normalizeDomain(s.url) === SITE_DOMAIN);

  if (!site) {
    throw new Error(
      SITE_ID
        ? `site ${SITE_ID} não encontrado no Blog Manager. Confira BLOG_MANAGER_SITE_ID.`
        : `nenhum site com o domínio ${SITE_DOMAIN} no Blog Manager. Defina BLOG_MANAGER_SITE_ID.`
    );
  }

  return site;
}

async function fetchJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body) headers.set("Content-Type", "application/json");

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  const text = await res.text();
  const data = text ? safeJsonParse(text) : null;

  if (!res.ok) {
    const message = data && typeof data === "object" && "message" in data ? String(data.message) : res.statusText;
    throw new Error(`${init.method ?? "GET"} ${path} respondeu ${res.status}: ${message}`);
  }

  return data as T;
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function mapPosts(posts: BlogManagerPost[], authors: BlogManagerAuthor[]): BlogPost[] {
  const authorsById = new Map(
    authors.filter((author) => author.deletedAt === null && author.id).map((author) => [author.id as string, author])
  );
  const slugUsage = new Map<string, number>();

  return posts
    .filter((post) => post.deletedAt === null && post.title?.trim())
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((post) => {
      const author = authorsById.get(post.authorId);
      const htmlContent = sanitizePostHtml(post.htmlContent ?? "");
      const plainText = stripHtml(htmlContent);
      const wordCount = countWords(plainText);
      const slug = uniqueSlug(post, slugUsage);

      return {
        id: post.id ?? slug,
        slug,
        title: post.title.trim(),
        htmlContent,
        plainText,
        excerpt: truncate(plainText, EXCERPT_LENGTH),
        coverUrl: post.backgroundUrl?.trim() || null,
        readingMinutes: readingMinutes(wordCount),
        wordCount,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt || post.createdAt,
        author: {
          name: author?.name?.trim() || DEFAULT_AUTHOR_NAME,
          avatarUrl: author?.avatarUrl?.trim() || null,
          bio: author?.bio?.trim() || "",
        },
      };
    });
}

/**
 * Slug a partir do título, como na pls-sistemas-landing-page. Títulos repetidos
 * ganham o id do post no fim. Os posts vêm do mais recente ao mais antigo, então o
 * slug de um post antigo muda se um novo for publicado com o mesmo título.
 */
function uniqueSlug(post: BlogManagerPost, usage: Map<string, number>): string {
  const base = formatSlug(post.title || post.id || "post") || "post";
  const count = usage.get(base) ?? 0;
  usage.set(base, count + 1);

  if (count === 0) return base;
  return `${base}-${post.id ? formatSlug(post.id) : count + 1}`;
}

/**
 * O HTML vem do Blog Manager e é inserido na página. GET /sites expõe a senha de
 * cada site, então qualquer pessoa pode publicar um post: só passam tags de texto,
 * links e imagens, sem scripts, estilos ou eventos.
 */
function sanitizePostHtml(html: string): string {
  return sanitizeHtml(unwrapEscapedHtml(html), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      // O título do post já é o <h1> da página.
      h1: "h2",
      a: (tagName, attribs) => {
        const external = /^https?:\/\//i.test(attribs.href ?? "") && normalizeDomain(attribs.href) !== SITE_DOMAIN;
        return {
          tagName,
          attribs: external ? { ...attribs, target: "_blank", rel: "noopener noreferrer" } : attribs,
        };
      },
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: "lazy" } }),
    },
  });
}

/**
 * Conserta posts em que o HTML foi colado como texto no editor do Blog Manager: o
 * corpo inteiro vira um único bloco `<p><code>&lt;h2&gt;…</code></p>`. Nesse caso,
 * devolve o HTML decodificado, que passa pela sanitização como qualquer outro post.
 */
function unwrapEscapedHtml(html: string): string {
  const match = html.trim().match(/^<(p|pre)>\s*<code>([\s\S]*)<\/code>\s*<\/\1>$/i);
  if (!match || /<[a-z]/i.test(match[2])) return html;

  const decoded = decodeEntities(match[2]).trim();
  return /^<[a-z]/i.test(decoded) && /<\/(p|h[1-6]|ul|ol|li|blockquote)>/i.test(decoded) ? decoded : html;
}

function normalizeDomain(value?: string): string | null {
  if (!value) return null;

  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return url.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return value
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .toLowerCase();
  }
}
