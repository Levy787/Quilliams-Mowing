import { NextResponse } from "next/server";

import {
    getAboutContent,
    getContactContent,
    getHomeContent,
    getOfferBySlug,
    getPricingContent,
    getPrivacyContent,
    getProjectBySlug,
    getProjectsLandingContent,
    getQuoteContent,
    getServiceBySlug,
    getServicesLandingContent,
    getTermsContent,
    listOfferSlugs,
    listProjectSlugs,
    listServiceSlugs,
} from "@/lib/keystatic-reader";

type SearchResult = {
    title: string;
    href: string;
    type: "page" | "service" | "project" | "offer";
    snippet?: string;
};

type CollectLimits = {
    maxDepth: number;
    maxStrings: number;
    maxTotalChars: number;
};

const DEFAULT_LIMITS: CollectLimits = {
    maxDepth: 6,
    maxStrings: 400,
    maxTotalChars: 20000,
};

function normalize(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFKD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, " ")
        .trim();
}

function makeDoc(result: SearchResult, haystack: ReadonlyArray<string>) {
    return {
        result,
        haystack: normalize(haystack.filter(Boolean).join(" | ")),
    };
}

function collectStrings(
    value: unknown,
    limits: CollectLimits = DEFAULT_LIMITS,
): string[] {
    const out: string[] = [];
    const seen = new Set<object>();
    let totalChars = 0;

    function pushString(text: string) {
        const trimmed = text.trim();
        if (!trimmed) return;
        if (out.length >= limits.maxStrings) return;
        if (totalChars >= limits.maxTotalChars) return;

        const next = totalChars + trimmed.length > limits.maxTotalChars
            ? trimmed.slice(0, Math.max(0, limits.maxTotalChars - totalChars))
            : trimmed;

        if (!next) return;
        out.push(next);
        totalChars += next.length;
    }

    function visit(node: unknown, depth: number) {
        if (node == null) return;
        if (out.length >= limits.maxStrings) return;
        if (totalChars >= limits.maxTotalChars) return;
        if (depth > limits.maxDepth) return;

        if (typeof node === "string") {
            pushString(node);
            return;
        }

        if (typeof node === "number" || typeof node === "boolean") {
            return;
        }

        if (Array.isArray(node)) {
            for (const item of node) visit(item, depth + 1);
            return;
        }

        if (typeof node === "object") {
            if (seen.has(node)) return;
            seen.add(node);

            for (
                const value of Object.values(node as Record<string, unknown>)
            ) {
                visit(value, depth + 1);
            }
        }
    }

    visit(value, 0);
    return out;
}

function guessSnippet(entry: unknown): string | undefined {
    const asObject = (value: unknown): Record<string, unknown> | null =>
        value && typeof value === "object"
            ? (value as Record<string, unknown>)
            : null;
    const asString = (value: unknown): string | undefined =>
        typeof value === "string" ? value : undefined;

    const root = asObject(entry);
    if (!root) return undefined;

    const seo = asObject(root.seo);
    const header = asObject(root.header);
    const hero = asObject(root.hero);

    return (
        asString(seo?.description) ||
        asString(header?.description) ||
        asString(hero?.description) ||
        asString(hero?.subheading) ||
        asString(hero?.subtitle) ||
        asString(hero?.heading) ||
        undefined
    );
}

function makeSnippet(text?: string, query?: string) {
    const t = text?.trim();
    const q = query?.trim();
    if (!t || !q) return undefined;

    const idx = normalize(t).indexOf(normalize(q));
    if (idx < 0) return t.length > 140 ? `${t.slice(0, 137)}…` : t;

    const start = Math.max(0, idx - 40);
    const end = Math.min(t.length, idx + q.length + 60);
    const slice = t.slice(start, end).trim();
    return (start > 0 ? `…${slice}` : slice) + (end < t.length ? "…" : "");
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    const query = normalize(q);

    if (query.length < 2) {
        return NextResponse.json({ results: [] satisfies SearchResult[] });
    }

    // Core pages + landing pages
    const [
        home,
        about,
        pricing,
        servicesLanding,
        projectsLanding,
        contact,
        quote,
        privacy,
        terms,
    ] = await Promise.all([
        getHomeContent(),
        getAboutContent(),
        getPricingContent(),
        getServicesLandingContent(),
        getProjectsLandingContent(),
        getContactContent(),
        getQuoteContent(),
        getPrivacyContent(),
        getTermsContent(),
    ]);

    const docs: Array<{ result: SearchResult; haystack: string }> = [
        makeDoc(
            {
                type: "page",
                title: "Home",
                href: "/",
                snippet: guessSnippet(home),
            },
            [
                "home",
                ...(collectStrings(home) ?? []),
            ],
        ),
        makeDoc(
            {
                type: "page",
                title: "About",
                href: "/about",
                snippet: guessSnippet(about),
            },
            ["about", ...(collectStrings(about) ?? [])],
        ),
        makeDoc(
            {
                type: "page",
                title: "Pricing",
                href: "/pricing",
                snippet: guessSnippet(pricing),
            },
            [
                "pricing",
                ...(collectStrings(pricing) ?? []),
            ],
        ),
        makeDoc(
            {
                type: "page",
                title: "Services",
                href: "/services",
                snippet: guessSnippet(servicesLanding),
            },
            [
                "services",
                ...(collectStrings(servicesLanding) ?? []),
            ],
        ),
        makeDoc(
            {
                type: "page",
                title: "Projects",
                href: "/projects",
                snippet: guessSnippet(projectsLanding),
            },
            [
                "projects",
                ...(collectStrings(projectsLanding) ?? []),
            ],
        ),
        makeDoc(
            {
                type: "page",
                title: "Contact",
                href: "/contact",
                snippet: guessSnippet(contact),
            },
            [
                "contact",
                ...(collectStrings(contact) ?? []),
            ],
        ),
        makeDoc(
            {
                type: "page",
                title: "Get a Quote",
                href: "/quote",
                snippet: guessSnippet(quote),
            },
            [
                "quote",
                "get a quote",
                ...(collectStrings(quote) ?? []),
            ],
        ),
        makeDoc(
            {
                type: "page",
                title: "Privacy Policy",
                href: "/privacy",
            },
            ["privacy", "privacy policy", ...(collectStrings(privacy) ?? [])],
        ),
        makeDoc(
            {
                type: "page",
                title: "Terms & Conditions",
                href: "/terms",
            },
            ["terms", "terms and conditions", ...(collectStrings(terms) ?? [])],
        ),
    ];

    // Services
    const serviceSlugs = await listServiceSlugs();
    const services = await Promise.all(
        serviceSlugs.map((slug) => getServiceBySlug(slug)),
    );
    for (const service of services) {
        if (!service) continue;

        docs.push(
            makeDoc(
                {
                    type: "service",
                    title: service.title || service.label,
                    href: `/services/${service.slug}`,
                    snippet: service.description,
                },
                collectStrings(service),
            ),
        );
    }

    // Projects
    const projectSlugs = await listProjectSlugs();
    const projects = await Promise.all(
        projectSlugs.map((slug) => getProjectBySlug(slug)),
    );
    for (const project of projects) {
        if (!project) continue;

        docs.push(
            makeDoc(
                {
                    type: "project",
                    title: project.title,
                    href: `/projects/${project.slug}`,
                    snippet: project.subtitle || project.locationLabel,
                },
                collectStrings(project),
            ),
        );
    }

    // Offers (dynamic at /[slug])
    const offerSlugs = await listOfferSlugs();
    const offers = await Promise.all(
        offerSlugs.map((slug) => getOfferBySlug(slug)),
    );
    for (const offer of offers) {
        if (!offer) continue;

        docs.push(
            makeDoc(
                {
                    type: "offer",
                    title: offer.headline,
                    href: `/${offer.slug}`,
                    snippet: offer.subheadline,
                },
                collectStrings(offer),
            ),
        );
    }

    const results = docs
        .filter((d) => d.haystack.includes(query))
        .map((d) => ({
            ...d.result,
            snippet: d.result.snippet || makeSnippet(d.haystack, query),
        }))
        .slice(0, 20);

    return NextResponse.json({ results });
}
