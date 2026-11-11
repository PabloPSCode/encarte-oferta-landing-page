import homeHero from "@/assets/flyers/home_hero.webp";
import BlogCta from "@/components/blog/BlogCta";
import BlogListing from "@/components/blog/BlogListing";
import JsonLd from "@/components/blog/JsonLd";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import { SITE } from "@/content/site";
import { getBlogContentSafe } from "@/services/blog";
import { BLOG_PATH, blogPostHref, toPostSummary } from "@/utils/blog";
import type { Metadata } from "next";

/** Busca posts novos no Blog Manager a cada 10 minutos (ISR). */
export const revalidate = 600;

const title = "Blog";
const description =
  "Dicas práticas sobre encartes de ofertas, promoções e redes sociais para supermercados, açougues, pet shops e outros comércios venderem mais.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: BLOG_PATH },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    url: BLOG_PATH,
    title: `${title} | ${SITE.name}`,
    description,
    images: [{ url: homeHero.src, width: homeHero.width, height: homeHero.height, alt: "Encartes criados no Encarte Oferta" }],
  },
};

export default async function BlogPage() {
  const { posts } = await getBlogContentSafe();
  const siteUrl = SITE.url.replace(/\/$/, "");

  return (
    <div className="overflow-x-clip font-sans">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${title} | ${SITE.name}`,
            description,
            url: `${siteUrl}${BLOG_PATH}`,
            inLanguage: "pt-BR",
            publisher: { "@type": "Organization", name: SITE.name, url: siteUrl },
            blogPost: posts.slice(0, 20).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: `${siteUrl}${blogPostHref(post)}`,
              datePublished: post.createdAt,
              dateModified: post.updatedAt,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}${BLOG_PATH}` },
            ],
          },
        ]}
      />
      <Header />
      <main>
        <BlogListing posts={posts.map(toPostSummary)} />
        <section className="mx-auto max-w-[1200px] px-4 pt-20 sm:px-7">
          <BlogCta />
        </section>
      </main>
      <Footer />
    </div>
  );
}
