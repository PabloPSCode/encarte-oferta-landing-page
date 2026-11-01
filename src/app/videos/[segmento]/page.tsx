import SegmentVideo from "@/components/segments/SegmentVideo";
import { FLYER_SIZE, SEGMENT_PAGES, getSegmentPage } from "@/content/segments";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface SegmentVideoRouteProps {
  params: Promise<{ segmento: string }>;
}

/** Só os segmentos de SEGMENT_PAGES existem; qualquer outro caminho vira 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SEGMENT_PAGES.map((s) => ({ segmento: s.slug }));
}

/** Página de anúncio: fica fora do Google e do sitemap para não competir com /[segmento]. */
export async function generateMetadata({ params }: SegmentVideoRouteProps): Promise<Metadata> {
  const segment = getSegmentPage((await params).segmento);
  if (!segment) return {};

  const { meta, flyer, slug } = segment;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/videos/${slug}` },
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "Encarte Oferta",
      url: `/videos/${slug}`,
      title: meta.title,
      description: meta.description,
      images: [{ url: flyer.src, ...FLYER_SIZE, alt: flyer.alt }],
    },
  };
}

export default async function SegmentVideoRoute({ params }: SegmentVideoRouteProps) {
  const segment = getSegmentPage((await params).segmento);
  if (!segment) notFound();

  return <SegmentVideo segment={segment} />;
}
