"use client";

import Eyebrow from "@/components/landing/Eyebrow";
import type { BlogPostSummary } from "@/dtos/blog";
import { normalizeText } from "@/utils/blog";
import { MagnifyingGlass, Newspaper, X } from "@phosphor-icons/react/dist/ssr";
import { type FormEvent, useId, useState } from "react";
import BlogHero from "./BlogHero";
import BlogPostCard from "./BlogPostCard";

export default function BlogListing({ posts }: { posts: BlogPostSummary[] }) {
  const [search, setSearch] = useState("");
  const inputId = useId();

  const query = normalizeText(search);
  const results = query ? posts.filter((post) => post.searchText.includes(query)) : posts;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById("publicacoes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <BlogHero crumbs={[{ label: "Início", href: "/" }, { label: "Blog" }]}>
        <div className="mt-8 max-w-[760px]">
          <Eyebrow>Blog do Encarte Oferta</Eyebrow>
          <h1 className="mt-3 text-[36px] font-black leading-[1.05] tracking-[-0.035em] text-on-brand text-balance sm:text-[54px]">
            Dicas para vender mais com as suas ofertas
          </h1>
          <p className="mt-4 max-w-[620px] text-[16px] font-medium leading-relaxed text-on-brand-soft text-pretty sm:text-[17px]">
            Conteúdos práticos sobre encartes, promoções e redes sociais para supermercados, açougues, pet shops e outros
            comércios que querem atrair mais clientes.
          </p>

          {posts.length > 0 && (
            <form
              role="search"
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-2 rounded-[18px] bg-white p-2 shadow-[0_18px_40px_rgba(26,20,0,0.18)] sm:flex-row sm:items-center"
            >
              <label htmlFor={inputId} className="sr-only">
                Pesquisar no blog
              </label>
              <div className="relative flex-1">
                <MagnifyingGlass
                  size={20}
                  weight="bold"
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
                />
                <input
                  id={inputId}
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Pesquise por encartes, promoções, Instagram…"
                  className="h-12 w-full rounded-[12px] bg-surface-2 pl-11 pr-10 text-[15px] font-medium text-ink outline-none placeholder:text-ink-soft focus:ring-2 focus:ring-brand [&::-webkit-search-cancel-button]:hidden"
                />
                {search && (
                  <button
                    type="button"
                    aria-label="Limpar busca"
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-ink-soft hover:bg-line hover:text-ink"
                  >
                    <X size={16} weight="bold" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="h-12 items-center justify-center rounded-[12px] bg-accent px-7 text-[14px] font-extrabold text-white transition-colors hover:bg-black"
              >
                Buscar
              </button>
            </form>
          )}
        </div>
      </BlogHero>

      <section id="publicacoes" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pt-14 sm:px-7">
        <div className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[28px] font-black tracking-[-0.03em] text-ink sm:text-[34px]">Nossas publicações</h2>
            <p aria-live="polite" className="mt-1.5 text-[14px] font-medium text-ink-2">
              {query
                ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"} para “${search.trim()}”`
                : `${posts.length} ${posts.length === 1 ? "publicação" : "publicações"}`}
            </p>
          </div>
          {query && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="w-fit text-[13.5px] font-extrabold text-accent hover:text-ink"
            >
              Limpar busca
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {results.map((post, i) => (
              <li key={post.id}>
                <BlogPostCard post={post} priority={i < 2} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-[22px] border-2 border-dashed border-line bg-surface px-6 py-14 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-[14px] bg-brand-tint text-brand-ink">
              <Newspaper size={26} weight="bold" aria-hidden />
            </span>
            <h3 className="mt-4 text-[22px] font-black tracking-[-0.02em] text-ink">
              {posts.length ? "Nenhum conteúdo encontrado" : "Novos conteúdos em breve"}
            </h3>
            <p className="mx-auto mt-2 max-w-[460px] text-[14.5px] leading-relaxed text-ink-2">
              {posts.length
                ? "Tente uma busca mais ampla ou limpe o filtro para ver todas as publicações."
                : "Estamos preparando dicas sobre encartes, promoções e redes sociais. Volte em alguns dias."}
            </p>
            {posts.length > 0 && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mx-auto mt-6 rounded-[12px] bg-accent px-6 py-3 text-[14px] font-extrabold text-white hover:bg-black"
              >
                Ver todas as publicações
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
}
