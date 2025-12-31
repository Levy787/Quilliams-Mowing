import { notFound } from "next/navigation";

import {
    getOfferBySlug,
    OFFERS,
} from "../_content/offers";
import OfferClient from "./offer-client";

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

    return <OfferClient offer={offer} />;
}

