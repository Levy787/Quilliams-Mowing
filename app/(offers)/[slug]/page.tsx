import { notFound } from "next/navigation";

import { getOfferBySlug, listOfferSlugs } from "@/lib/keystatic-reader";
import OfferClient from "./offer-client";
import OfferFunnelClient from "./offer-funnel-client";

export async function generateStaticParams() {
    const slugs = await listOfferSlugs();
    return slugs.map((slug) => ({ slug }));
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

