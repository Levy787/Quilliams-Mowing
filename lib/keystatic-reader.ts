import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "../keystatic.config";

import type { Offer } from "@/lib/offers";
import type { ReferralContent } from "@/lib/referral";
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

export async function getAboutContent() {
    const entry = await reader.singletons.about.readOrThrow();

    return {
        ...entry,
        seo: {
            title: entry.seo.title,
            description: entry.seo.description,
            ogTitle: entry.seo.ogTitle,
            ogDescription: entry.seo.ogDescription,
            ogImage: entry.seo.ogImage || undefined,
        },
    };
}

export type AboutContent = Awaited<ReturnType<typeof getAboutContent>>;

export async function getReferralContent(): Promise<ReferralContent> {
    const entry = await reader.singletons.referral.readOrThrow();

    return {
        seo: {
            title: entry.seo.title,
            description: entry.seo.description,
            ogTitle: entry.seo.ogTitle,
            ogDescription: entry.seo.ogDescription,
            ogImage: entry.seo.ogImage || undefined,
        },
        hero: entry.hero,
        offer: entry.offer,
        services: entry.services.map((s) => ({
            label: s.label,
            value: s.value,
        })),
        formCopy: entry.formCopy,
    };
}

export async function getServicesLandingContent() {
    return reader.singletons.servicesLanding.readOrThrow();
}

export type ServicesLandingContent = Awaited<
    ReturnType<typeof getServicesLandingContent>
>;

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
        seo: {
            title: entry.seo.title,
            description: entry.seo.description,
            ogTitle: entry.seo.ogTitle,
            ogDescription: entry.seo.ogDescription,
            ogImage: entry.seo.ogImage || undefined,
        },
        terms: entry.terms,
        serviceArea: entry.serviceArea,
        phoneDisplay: entry.phoneDisplay,
        phoneTel: entry.phoneTel,
        email: entry.email,
        heroImage: {
            src: entry.heroImage.src ?? "",
            alt: entry.heroImage.alt ?? "",
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

    const hero = entry.hero as unknown as {
        imageSrc?: string | null;
        imageAlt?: string | null;
        caption?: string | null;
        pattern: Service["hero"]["pattern"];
    };

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

    const results = entry.results as unknown as {
        label: string;
        title: string;
        description: string;
        headerCtas: Service["results"]["headerCtas"];
        cards: ReadonlyArray<{
            title: string;
            description: string;
            imageFile?: string | null;
            imageSrc?: string | null;
            imageAlt?: string | null;
            ctaText: string;
            ctaHref: string;
        }>;
        footerNote?: string | null;
    };

    return {
        slug,
        label: entry.label,
        title: entry.title,
        description: entry.description,
        cardTag: entry.cardTag?.trim().length ? entry.cardTag : undefined,
        cardIcon: entry.cardIcon,
        seo: entry.seo
            ? {
                title: entry.seo.title,
                description: entry.seo.description,
                ogTitle: entry.seo.ogTitle,
                ogDescription: entry.seo.ogDescription,
                ogImage: entry.seo.ogImage || undefined,
            }
            : undefined,
        hero: {
            imageSrc: hero.imageSrc ?? "",
            imageAlt: hero.imageAlt ?? "",
            caption: hero.caption || undefined,
            pattern: hero.pattern,
        },
        trustChips: entry.trustChips,
        ctas: entry.ctas,
        included: entry.included,
        plans,
        results: {
            label: results.label,
            title: results.title,
            description: results.description,
            headerCtas: results.headerCtas,
            cards: results.cards.map((card) => ({
                title: card.title,
                description: card.description,
                imageSrc: card.imageFile?.trim()
                    ? `/images/uploads/${card.imageFile}`
                    : (card.imageSrc ?? ""),
                imageAlt: card.imageAlt ?? "",
                ctaText: card.ctaText,
                ctaHref: card.ctaHref,
            })),
            footerNote: results.footerNote || undefined,
        },
        valueBand: entry.valueBand,
        faq: entry.faq,
        finalCta: entry.finalCta,
    };
}
