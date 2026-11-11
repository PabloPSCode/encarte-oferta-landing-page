/** Registros da blog-manager-api (blog_manager/blog-manager-api/src/domain/dtos). */

export interface BlogManagerSiteRecord {
  id?: string;
  url: string;
  domain: string;
  clientWhatsapp: string;
  /** A API expõe a senha do site em GET /sites; ela só é usada no login, no servidor. */
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BlogManagerAuthor {
  id?: string;
  name: string;
  bio: string;
  siteId: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BlogManagerPost {
  id?: string;
  siteId: string;
  title: string;
  htmlContent: string;
  backgroundUrl: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

/** Post pronto para a landing: slug, resumo, tempo de leitura e autor resolvidos. */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  /** HTML já sanitizado. */
  htmlContent: string;
  /** Texto puro do post, para busca e meta description. */
  plainText: string;
  excerpt: string;
  /** Capa enviada no Blog Manager, ou null quando o post não tem capa. */
  coverUrl: string | null;
  readingMinutes: number;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatarUrl: string | null;
    bio: string;
  };
}

/** Dados do card na listagem: sem o HTML, para não pesar no payload do cliente. */
export type BlogPostSummary = Pick<
  BlogPost,
  "id" | "slug" | "title" | "excerpt" | "coverUrl" | "readingMinutes" | "createdAt"
> & {
  /** Data já formatada no servidor, para não haver diferença de fuso na hidratação. */
  publishedLabel: string;
  /** Título e texto normalizados (sem acentos, minúsculos) para a busca. */
  searchText: string;
};
