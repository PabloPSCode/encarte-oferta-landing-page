import homeHero from "@/assets/flyers/home_hero.webp";
import BlogArticle from "@/components/blog/BlogArticle";
import JsonLd from "@/components/blog/JsonLd";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import { SITE } from "@/content/site";
import { getBlogContentSafe, getBlogPost } from "@/services/blog";
import { BLOG_PATH, blogPostHref, relatedPosts, truncate } from "@/utils/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/** Busca posts novos e editados no Blog Manager a cada 10 minutos (ISR). */
export const revalidate = 600;

interface BlogPostRouteProps {
  params: Promise<{ slug: string }>;
}

/** Gera no build os posts que já existem; os publicados depois são gerados no primeiro acesso. */
export async function generateStaticParams() {
  const { posts } = await getBlogContentSafe();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const post = await getBlogPost((await params).slug);
  if (!post) return { title: "Post não encontrado" };

  const description = truncate(post.plainText, 160);
  const path = blogPostHref(post);
  const image = post.coverUrl
    ? { url: post.coverUrl, alt: post.title }
    : { url: homeHero.src, width: homeHero.width, height: homeHero.height, alt: "Encartes criados no Encarte Oferta" };

  return {
    title: post.title,
    description,
    alternates: { canonical: path },
    authors: [{ name: post.author.name }],
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: SITE.name,
      url: path,
      title: post.title,
      description,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [image],
    },
    twitter: { card: "summary_large_image", title: post.title, description, images: [image.url] },
  };
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const { posts } = await getBlogContentSafe();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const siteUrl = SITE.url.replace(/\/$/, "");
  const url = `${siteUrl}${blogPostHref(post)}`;

  return (
    <div className="overflow-x-clip font-sans">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: truncate(post.plainText, 160),
            url,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            inLanguage: "pt-BR",
            datePublished: post.createdAt,
            dateModified: post.updatedAt,
            wordCount: post.wordCount,
            image: [post.coverUrl ?? `${siteUrl}${homeHero.src}`],
            author: { "@type": "Person", name: post.author.name, ...(post.author.avatarUrl && { image: post.author.avatarUrl }) },
            publisher: {
              "@type": "Organization",
              name: SITE.name,
              url: siteUrl,
              logo: { "@type": "ImageObject", url: `${siteUrl}/brand/logo-text.svg` },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}${BLOG_PATH}` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ]}
      />
      <Header />
      <main>
        <BlogArticle post={post} related={relatedPosts(posts, post.slug, 3)} />
      </main>
      <Footer />
    </div>
  );
}
