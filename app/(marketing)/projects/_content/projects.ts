export type PatternName = "pattern-1" | "pattern-2";

export type ProjectDefinition = {
    slug: string;
    title: string;
    subtitle: string;
    hero: {
        imageSrc: string;
        imageAlt: string;
        pattern: PatternName;
    };
    chips: string[];
    overview: {
        label: string;
        paragraphs: string[];
    };
    whatWeDid: {
        label: string;
        bullets: string[];
    };
    result: {
        label: string;
        bullets: string[];
    };
    gallery: Array<{
        imageSrc: string;
        imageAlt: string;
        caption?: string;
    }>;
    faq?: Array<{
        id: string;
        question: string;
        answer: string;
    }>;
    ctas: {
        primaryText: string;
        primaryHref: string;
        secondaryText: string;
        secondaryHref: string;
    };
};

export const PROJECTS = [
    {
        slug: "front-garden-refresh",
        title: "Front garden refresh",
        subtitle:
            "Sharper edges, tidier structure, and a cleaner finish that stays presentable.",
        hero: {
            imageSrc: "/images/IMG_20250708_16272.webp",
            imageAlt: "Front garden with neat lawn edges and trimmed hedges",
            pattern: "pattern-1",
        },
        chips: ["Edges", "Tidy finish", "Structure", "Clear plan"],
        overview: {
            label: "Overview",
            paragraphs: [
                "This project was all about making the front of the property feel cared for again—clean lines, a tidier outline, and a finish that looks intentional from the street.",
                "We focused on high-impact changes that improve the look immediately and make ongoing upkeep simpler.",
            ],
        },
        whatWeDid: {
            label: "What we did",
            bullets: [
                "Reset beds and borders for a cleaner outline",
                "Tidy structure and shape for a sharper look",
                "Clean edges to make the space feel finished",
                "Leave a tidy, presentable finish",
            ],
        },
        result: {
            label: "Result",
            bullets: [
                "Sharper lines that lift the whole frontage",
                "More finished look from the street",
                "Easier ongoing upkeep",
            ],
        },
        gallery: [
            {
                imageSrc: "/images/IMG_20250708_16272.webp",
                imageAlt:
                    "Front garden with neat lawn edges and trimmed hedges",
                caption: "Crisp edges and tidy structure.",
            },
            {
                imageSrc: "/images/IMG_20250715_29185.webp",
                imageAlt:
                    "Well-kept garden with trimmed hedges and clean borders",
                caption: "A tidy look that holds up.",
            },
            {
                imageSrc: "/images/IMG_20250708_11200.webp",
                imageAlt: "Garden with freshly trimmed hedges and a tidy lawn",
                caption: "Clean lines make a big difference.",
            },
        ],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
    },
    {
        slug: "fresh-cut-clean-lines",
        title: "Fresh cut + clean lines",
        subtitle:
            "A tidy finish with crisp edges that makes the whole garden feel looked after.",
        hero: {
            imageSrc: "/images/IMG_20250708_11200.webp",
            imageAlt: "Garden with freshly cut hedges and a tidy lawn",
            pattern: "pattern-1",
        },
        chips: ["Lawn", "Edges", "Consistency", "Tidy finish"],
        overview: {
            label: "Overview",
            paragraphs: [
                "The goal here was simple: clean lines, a neat cut, and a finish that looks intentional rather than rushed.",
                "When edges are crisp and the cut is consistent, the whole garden feels calmer and more presentable.",
            ],
        },
        whatWeDid: {
            label: "What we did",
            bullets: [
                "Consistent cut for a neat overall look",
                "Clean edges and corners",
                "Light tidy to finish properly",
            ],
        },
        result: {
            label: "Result",
            bullets: [
                "Instantly neater feel",
                "Crisp edges that look intentional",
                "A lawn that feels easier to maintain",
            ],
        },
        gallery: [
            {
                imageSrc: "/images/IMG_20250708_11200.webp",
                imageAlt: "Garden with freshly cut hedges and a tidy lawn",
                caption: "Fresh cut, clean outline.",
            },
            {
                imageSrc: "/images/IMG_20250704_93515.webp",
                imageAlt:
                    "Freshly mown lawn with trimmed hedges in a private garden",
                caption: "A tidy finish that makes everything look sharper.",
            },
            {
                imageSrc: "/images/IMG_20250708_16272.webp",
                imageAlt: "Neat lawn with clean edges in a private garden",
                caption: "Edges that hold the look together.",
            },
        ],
        faq: [
            {
                id: "timing",
                question: "How often do you recommend maintenance cuts?",
                answer:
                    "It depends on the time of year and how tidy you want it to stay. We can recommend a schedule when we quote.",
            },
            {
                id: "weather",
                question: "What happens if weather affects timing?",
                answer:
                    "If conditions aren’t suitable, we’ll communicate clearly and reschedule to the next good window.",
            },
        ],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
    },
    {
        slug: "back-garden-tidy-reshape",
        title: "Back garden tidy and reshape",
        subtitle:
            "A more finished feel with clean lines, cleared areas, and structure that’s easier to maintain.",
        hero: {
            imageSrc: "/images/IMG_20240509_41792.webp",
            imageAlt:
                "Well-kept back garden with trimmed hedges and a neat lawn",
            pattern: "pattern-1",
        },
        chips: ["Reset", "Reshape", "Tidy up", "Polished"],
        overview: {
            label: "Overview",
            paragraphs: [
                "This project focused on getting the space back under control and making it feel deliberate again—clear areas, cleaner lines, and a finish that looks properly cared for.",
                "The result is a garden that looks better immediately and is easier to keep tidy going forward.",
            ],
        },
        whatWeDid: {
            label: "What we did",
            bullets: [
                "Clear and tidy overgrown areas",
                "Reshape edges for a more deliberate look",
                "Reset structure so the space feels finished",
            ],
        },
        result: {
            label: "Result",
            bullets: [
                "A cleaner, more usable space",
                "Sharper structure and shape",
                "Easier maintenance going forward",
            ],
        },
        gallery: [
            {
                imageSrc: "/images/IMG_20240509_41792.webp",
                imageAlt:
                    "Well-kept back garden with trimmed hedges and a neat lawn",
                caption: "Reset and reshape for a cleaner outline.",
            },
            {
                imageSrc: "/images/IMG_20250708_34242.webp",
                imageAlt:
                    "Freshly maintained garden with trimmed hedges and neat lawn",
                caption: "A more finished look from every angle.",
            },
            {
                imageSrc: "/images/IMG_20250715_29185.webp",
                imageAlt: "Garden looking tidy and well kept",
                caption: "A tidy look that’s easier to maintain.",
            },
        ],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Back to Projects",
            secondaryHref: "/projects",
        },
    },
] as const satisfies readonly ProjectDefinition[];

export type ProjectSlug = (typeof PROJECTS)[number]["slug"];
export type Project = (typeof PROJECTS)[number];

export function getProjectBySlug(slug: string): Project | null {
    return (PROJECTS as readonly ProjectDefinition[]).find((p) =>
        p.slug === slug
    ) ?? null;
}

/**
 * Adding a new project
 * - Copy an existing object in `PROJECTS` and change `slug`, copy, and images.
 * - Keep links limited to existing routes (e.g. "/quote", "/contact", "/projects").
 */
