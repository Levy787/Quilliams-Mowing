import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getOfferBySlug, listOfferSlugs } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";
import OfferClient from "./offer-client";
import OfferFunnelClient from "./offer-funnel-client";

export async function generateStaticParams() {
    const slugs = await listOfferSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const offer = await getOfferBySlug(slug);
    if (!offer) notFound();

    return buildMetadata({
        seo: offer.seo,
        fallbackTitle: offer.headline,
        fallbackDescription: offer.subheadline,
        fallbackOgImage: offer.heroImage.src,
    });
}

export default async function OfferPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const offer = await getOfferBySlug(slug);

    if (!offer) notFound();

    if (offer.template === "funnel") {
        return <OfferFunnelClient offer={offer} />;
    }

    return <OfferClient offer={offer} />;
}

