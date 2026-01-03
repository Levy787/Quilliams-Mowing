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

export async function getPrivacyContent() {
    return reader.singletons.privacy.readOrThrow();
}

export type PrivacyContent = Awaited<ReturnType<typeof getPrivacyContent>>;

export async function getTermsContent() {
    return reader.singletons.terms.readOrThrow();
}

export type TermsContent = Awaited<ReturnType<typeof getTermsContent>>;

export async function getSiteContent() {
    return reader.singletons.site.readOrThrow();
}

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;

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

export async function getProjectsLandingContent() {
    const entry = await reader.singletons.projectsLanding.readOrThrow();

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

export type ProjectsLandingContent = Awaited<
    ReturnType<typeof getProjectsLandingContent>
>;

export async function listProjectSlugs() {
    return reader.collections.projects.list();
}

export type ProjectPattern = "pattern-1" | "pattern-2";

export type ProjectTemplate = "image" | "video";

export type ProjectDetail = {
    slug: string;
    order: number;
    template: ProjectTemplate;
    title: string;
    subtitle: string;
    locationLabel?: string;
    seo: {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
        ogImage?: string;
    };
    hero: {
        imageSrc: string;
        imageAlt: string;
        pattern: ProjectPattern;
    };
    heroVideo: {
        videoSrc: string;
        posterSrc: string;
        posterAlt: string;
    };
    chips: ReadonlyArray<string>;
    overview: {
        label: string;
        paragraphs: ReadonlyArray<string>;
    };
    whatWeDid: {
        label: string;
        bullets: ReadonlyArray<string>;
    };
    result: {
        label: string;
        bullets: ReadonlyArray<string>;
    };
    gallery: ReadonlyArray<{
        imageSrc: string;
        imageAlt: string;
        caption?: string;
    }>;
    faq: ReadonlyArray<{ id: string; question: string; answer: string }>;
    ctas: {
        primaryText: string;
        primaryHref: string;
        secondaryText: string;
        secondaryHref: string;
    };
};

function resolveKeystaticImageSrc({
    file,
    src,
    subdir,
}: {
    file?: string | null;
    src?: string | null;
    subdir?: string;
}): string {
    if (file?.trim()) {
        // If file is already absolute, use as-is
        if (file.startsWith("/")) return file;
        // If subdir provided, prepend it
        if (subdir) return `/images/uploads/${subdir}/${file}`;
        return `/images/uploads/${file}`;
    }
    return src ?? "";
}

export async function getProjectBySlug(
    slug: string,
): Promise<ProjectDetail | null> {
    const entry = await reader.collections.projects.read(slug);
    if (!entry) return null;

    const template =
        (entry as unknown as { template?: ProjectTemplate }).template ??
            "image";

    const hero = entry.hero as unknown as {
        imageFile?: string | null;
        imageSrc?: string | null;
        imageAlt?: string | null;
        pattern: ProjectPattern;
    };

    const gallery = entry.gallery as unknown as ReadonlyArray<{
        imageFile?: string | null;
        imageSrc?: string | null;
        imageAlt?: string | null;
        caption?: string | null;
    }>;

    const heroVideo = (entry as unknown as {
        heroVideo?: {
            videoSrc?: string | null;
            poster?: {
                posterFile?: string | null;
                posterSrc?: string | null;
                posterAlt?: string | null;
            };
        };
    }).heroVideo;

    return {
        slug,
        order: entry.order,
        template,
        title: entry.title,
        subtitle: entry.subtitle,
        locationLabel: entry.locationLabel?.trim().length
            ? entry.locationLabel
            : undefined,
        seo: {
            title: entry.seo.title,
            description: entry.seo.description,
            ogTitle: entry.seo.ogTitle,
            ogDescription: entry.seo.ogDescription,
            ogImage: entry.seo.ogImage || undefined,
        },
        hero: {
            imageSrc: resolveKeystaticImageSrc({
                file: hero.imageFile,
                src: hero.imageSrc,
                subdir: slug,
            }),
            imageAlt: hero.imageAlt ?? "",
            pattern: hero.pattern,
        },
        heroVideo: {
            videoSrc: heroVideo?.videoSrc ?? "",
            posterSrc: resolveKeystaticImageSrc({
                file: heroVideo?.poster?.posterFile,
                src: heroVideo?.poster?.posterSrc,
                subdir: slug,
            }),
            posterAlt: heroVideo?.poster?.posterAlt ?? "",
        },
        chips: entry.chips,
        overview: entry.overview,
        whatWeDid: entry.whatWeDid,
        result: entry.result,
        gallery: gallery.map((g) => ({
            imageSrc: resolveKeystaticImageSrc({
                file: g.imageFile,
                src: g.imageSrc,
                subdir: slug,
            }),
            imageAlt: g.imageAlt ?? "",
            caption: g.caption?.trim().length ? g.caption : undefined,
        })),
        faq: entry.faq,
        ctas: entry.ctas,
    };
}

export async function listProjects(): Promise<ProjectDetail[]> {
    const slugs = await listProjectSlugs();
    const projects = await Promise.all(
        slugs.map((slug) => getProjectBySlug(slug)),
    );

    return projects
        .filter((p): p is ProjectDetail => Boolean(p))
        .sort((a, b) => a.order - b.order);
}

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
