import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "../keystatic.config";

import type { Offer } from "@/lib/offers";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getHomeContent() {
    return reader.singletons.home.readOrThrow();
}

export type HomeContent = Awaited<ReturnType<typeof getHomeContent>>;

export async function getPricingContent() {
    return reader.singletons.pricing.readOrThrow();
}

export type PricingContent = Awaited<ReturnType<typeof getPricingContent>>;

export async function listOfferSlugs() {
    return reader.collections.offers.list();
}

export async function getOfferBySlug(slug: string): Promise<Offer | null> {
    const entry = await reader.collections.offers.read(slug);
    if (!entry) return null;

    return {
        slug,
        template: entry.template,
        headline: entry.headline,
        subheadline: entry.subheadline,
        terms: entry.terms,
        serviceArea: entry.serviceArea,
        phoneDisplay: entry.phoneDisplay,
        phoneTel: entry.phoneTel,
        email: entry.email,
        heroImage: {
            src: entry.heroImage.src,
            alt: entry.heroImage.alt,
        },
        highlights: entry.highlights,
        trustStrip: entry.trustStrip,
        included: entry.included,
        idealFor: entry.idealFor,
        typicalTimeline: entry.typicalTimeline,
        faq: entry.faq,
    };
}
