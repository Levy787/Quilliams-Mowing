import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "../keystatic.config";

import type { Offer } from "@/lib/offers";
import type { Service } from "@/lib/services";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getHomeContent() {
    return reader.singletons.home.readOrThrow();
}

export type HomeContent = Awaited<ReturnType<typeof getHomeContent>>;

export async function getPricingContent() {
    return reader.singletons.pricing.readOrThrow();
}

export type PricingContent = Awaited<ReturnType<typeof getPricingContent>>;

export async function getContactContent() {
    return reader.singletons.contact.readOrThrow();
}

export type ContactContent = Awaited<ReturnType<typeof getContactContent>>;

export async function getQuoteContent() {
    return reader.singletons.quote.readOrThrow();
}

export type QuoteContent = Awaited<ReturnType<typeof getQuoteContent>>;

export async function listOfferSlugs() {
    return reader.collections.offers.list();
}

export async function listServiceSlugs() {
    return reader.collections.services.list();
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

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    const entry = await reader.collections.services.read(slug);
    if (!entry) return null;

    const hasPlans = entry.plans.title.trim().length > 0 ||
        entry.plans.cards.length > 0;

    const plans = hasPlans
        ? {
            label: entry.plans.label,
            title: entry.plans.title,
            description: entry.plans.description,
            cards: entry.plans.cards,
            ctas: entry.plans.ctas,
        }
        : undefined;

    return {
        slug,
        label: entry.label,
        title: entry.title,
        description: entry.description,
        hero: {
            imageSrc: entry.hero.imageSrc,
            imageAlt: entry.hero.imageAlt,
            caption: entry.hero.caption || undefined,
            pattern: entry.hero.pattern,
        },
        trustChips: entry.trustChips,
        ctas: entry.ctas,
        included: entry.included,
        plans,
        results: {
            ...entry.results,
            footerNote: entry.results.footerNote || undefined,
        },
        valueBand: entry.valueBand,
        faq: entry.faq,
        finalCta: entry.finalCta,
    };
}
