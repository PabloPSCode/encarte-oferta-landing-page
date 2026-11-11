import type { BlogPostSummary } from "@/dtos/blog";
import { blogPostHref } from "@/utils/blog";
import { ArrowRight, CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import BlogCover from "./BlogCover";

/** Card da listagem: capa com o título por cima, como no blog da PLS Sistemas. */
export default function BlogPostCard({ post, priority }: { post: BlogPostSummary; priority?: boolean }) {
  return (
    <Link
      href={blogPostHref(post)}
      className="group relative isolate flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[22px] bg-on-brand p-5 shadow-[0_10px_30px_rgba(26,20,0,0.12)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(26,20,0,0.22)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand sm:aspect-[16/11] sm:p-6"
    >
      <BlogCover
        src={post.coverUrl}
        alt=""
        sizes="(min-width: 1200px) 570px, (min-width: 768px) 50vw, 100vw"
        priority={priority}
        className="-z-10 transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

      <div className="flex flex-wrap gap-2 text-[11.5px] font-bold text-white">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 backdrop-blur-sm">
          <CalendarBlank size={14} weight="bold" aria-hidden />
          <time dateTime={post.createdAt}>{post.publishedLabel}</time>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 backdrop-blur-sm">
          <Clock size={14} weight="bold" aria-hidden />
          {post.readingMinutes} min de leitura
        </span>
      </div>

      <div>
        <h3 className="text-[20px] font-black leading-[1.15] tracking-[-0.02em] text-white text-balance drop-shadow-sm sm:text-[24px]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-white/80 max-sm:hidden">{post.excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-extrabold text-brand">
          Ler artigo
          <ArrowRight size={14} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
