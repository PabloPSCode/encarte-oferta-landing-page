import SegmentLanding from "@/components/segments/SegmentLanding";
import { FLYER_SIZE, SEGMENT_PAGES, getSegmentPage } from "@/content/segments";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface SegmentRouteProps {
  params: Promise<{ segmento: string }>;
}

/** Só os segmentos de SEGMENT_PAGES existem; qualquer outro caminho vira 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SEGMENT_PAGES.map((s) => ({ segmento: s.slug }));
}

export async function generateMetadata({ params }: SegmentRouteProps): Promise<Metadata> {
  const segment = getSegmentPage((await params).segmento);
  if (!segment) return {};

  const { meta, flyer, slug } = segment;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "Encarte Oferta",
      url: `/${slug}`,
      title: meta.title,
      description: meta.description,
      images: [{ url: flyer.src, ...FLYER_SIZE, alt: flyer.alt }],
    },
  };
}

export default async function SegmentRoute({ params }: SegmentRouteProps) {
  const segment = getSegmentPage((await params).segmento);
  if (!segment) notFound();

  return <SegmentLanding segment={segment} />;
}
