import { notFound } from "next/navigation";

import {
    getOfferBySlug,
    OFFERS,
} from "../_content/offers";
import OfferClient from "./offer-client";
import OfferFunnelClient from "./offer-funnel-client";

export function generateStaticParams() {
    return OFFERS.map((offer) => ({ slug: offer.slug }));
}

export default async function OfferPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const offer = getOfferBySlug(slug);

    if (!offer) notFound();

    if (offer.template === "funnel") {
        return <OfferFunnelClient offer={offer} />;
    }

    return <OfferClient offer={offer} />;
}

