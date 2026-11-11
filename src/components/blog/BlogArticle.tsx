import type { BlogPost } from "@/dtos/blog";
import { SITE } from "@/content/site";
import { BLOG_PATH, blogPostHref, formatPostDate } from "@/utils/blog";
import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  ClockIcon,
  FacebookLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import BlogCover from "./BlogCover";
import BlogCta from "./BlogCta";
import BlogHero from "./BlogHero";

export default function BlogArticle({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  const url = `${SITE.url.replace(/\/$/, "")}${blogPostHref(post)}`;

  return (
    <>
      <BlogHero
        crumbs={[{ label: "Início", href: "/" }, { label: "Blog", href: BLOG_PATH }, { label: post.title }]}
        className="pb-12 sm:pb-14"
      >
        <h1 className="mt-8 max-w-[920px] text-[34px] font-black leading-[1.06] tracking-[-0.035em] text-on-brand text-balance sm:text-[50px]">
          {post.title}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-2.5 text-[12.5px] font-bold text-on-brand-soft">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/75 py-1 pl-1 pr-3.5">
            <AuthorAvatar post={post} size={26} />
            {post.author.name}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-3.5 py-1.5">
            <CalendarBlankIcon size={15} weight="bold" aria-hidden />
            <time dateTime={post.createdAt}>{formatPostDate(post.createdAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-3.5 py-1.5">
            <ClockIcon size={15} weight="bold" aria-hidden />
            {post.readingMinutes} min de leitura
          </span>
        </div>
      </BlogHero>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 pt-10 sm:px-7 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          {post.coverUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-surface shadow-[0_24px_60px_rgba(26,20,0,0.16)] ring-1 ring-black/5">
              <BlogCover src={post.coverUrl} alt={post.title} priority sizes="(min-width: 1200px) 780px, (min-width: 1024px) 65vw, 100vw" />
            </div>
          )}

          <article
            className="blog-prose mt-10 max-w-[760px]"
            // HTML sanitizado em src/services/blog.ts (sanitizePostHtml).
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />

          <div className="mt-12 flex max-w-[760px] items-start gap-4 rounded-[20px] border border-line bg-surface p-5 sm:p-6">
            <AuthorAvatar post={post} size={52} />
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-soft">Escrito por</p>
              <p className="mt-0.5 text-[16px] font-black text-ink">{post.author.name}</p>
              {post.author.bio && <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{post.author.bio}</p>}
            </div>
          </div>

          <Link
            href={BLOG_PATH}
            className="mt-8 inline-flex items-center gap-2 text-[14px] font-extrabold text-accent hover:text-ink"
          >
            <ArrowLeftIcon size={16} weight="bold" aria-hidden /> Ver todas as publicações
          </Link>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ShareLinks title={post.title} url={url} />
          <BlogCta compact />
          {related.length > 0 && <RelatedPosts posts={related} />}
        </aside>
      </div>
    </>
  );
}

function AuthorAvatar({ post, size }: { post: BlogPost; size: number }) {
  if (post.author.avatarUrl) {
    return (
      <Image
        src={post.author.avatarUrl}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full object-cover ring-2 ring-white"
      />
    );
  }

  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-full bg-accent ring-2 ring-white"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático */}
      <img src="/brand/logo-icon.svg" alt="" className="h-[60%] w-auto" />
    </span>
  );
}

function ShareLinks({ title, url }: { title: string; url: string }) {
  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);
  const items = [
    { label: "WhatsApp", href: `https://wa.me/?text=${text}%20${link}`, Icon: WhatsappLogoIcon },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${link}`, Icon: FacebookLogoIcon },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`, Icon: LinkedinLogoIcon },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${text}&url=${link}`, Icon: XLogoIcon },
  ];

  return (
    <div className="rounded-[20px] border border-line bg-surface p-5">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-soft">Compartilhe este conteúdo</p>
      <ul className="mt-3 flex gap-2">
        {items.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Compartilhar no ${label}`}
              className="grid size-11 place-items-center rounded-[12px] border border-line text-ink-2 transition-colors hover:border-accent hover:bg-accent-tint hover:text-accent"
            >
              <Icon size={20} weight="bold" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="rounded-[20px] border border-line bg-surface p-5">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-soft">Leia também</p>
      <ul className="mt-3 divide-y divide-line">
        {posts.map((post) => (
          <li key={post.id} className="py-3 first:pt-1 last:pb-0">
            <Link href={blogPostHref(post)} className="group flex items-center gap-3">
              <span className="relative size-16 shrink-0 overflow-hidden rounded-[12px] bg-surface-2">
                <BlogCover src={post.coverUrl} alt="" sizes="64px" className="transition-transform duration-300 group-hover:scale-105" />
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 text-[14px] font-extrabold leading-snug text-ink group-hover:text-accent">
                  {post.title}
                </span>
                <span className="mt-1 block text-[12px] font-semibold text-ink-soft">
                  {formatPostDate(post.createdAt)} · {post.readingMinutes} min
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
