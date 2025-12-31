import { notFound } from "next/navigation";

import {
    getSpringCleanupOfferBySlug,
    SPRING_CLEANUP_OFFERS,
} from "../_content/offers";
import SpringCleanupOfferClient from "./spring-cleanup-offer-client";

export function generateStaticParams() {
    return SPRING_CLEANUP_OFFERS.map((offer) => ({ slug: offer.slug }));
}

export default async function SpringCleanupOfferPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const offer = getSpringCleanupOfferBySlug(slug);

    if (!offer) notFound();

    return <SpringCleanupOfferClient offer={offer} />;
}

