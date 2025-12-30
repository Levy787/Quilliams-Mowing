export type IconName =
    | "Leaf"
    | "Ruler"
    | "Sprout"
    | "Trash2"
    | "CalendarDays"
    | "CloudRain"
    | "Brush"
    | "Flower2"
    | "Layers"
    | "Shovel"
    | "Sparkles";

export type PatternName = "pattern-1" | "pattern-2";

export type ServiceDefinition = {
    slug: string;
    label: string;
    title: string;
    description: string;
    hero: {
        imageSrc: string;
        imageAlt: string;
        caption?: string;
        pattern: PatternName;
    };
    trustChips: string[];
    ctas: {
        primaryText: string;
        primaryHref: string;
        secondaryText: string;
        secondaryHref: string;
    };
    included: {
        label: string;
        title: string;
        description: string;
        items: Array<{
            title: string;
            description: string;
            icon: IconName;
        }>;
    };
    plans?: {
        label: string;
        title: string;
        description: string;
        cards: Array<{
            title: string;
            description: string;
            bullets: string[];
            icon: IconName;
        }>;
        ctas: {
            primaryText: string;
            primaryHref: string;
            secondaryText: string;
            secondaryHref: string;
        };
    };
    results: {
        label: string;
        title: string;
        description: string;
        headerCtas: {
            primaryText: string;
            primaryHref: string;
            secondaryText: string;
            secondaryHref: string;
        };
        cards: Array<{
            title: string;
            description: string;
            imageSrc: string;
            imageAlt: string;
            ctaText: string;
            ctaHref: string;
        }>;
        footerNote?: string;
    };
    valueBand: {
        label: string;
        title: string;
        description: string;
        bullets: Array<{
            title: string;
            description: string;
            icon: IconName;
        }>;
        pattern: PatternName;
        ctas: {
            primaryText: string;
            primaryHref: string;
            secondaryText: string;
            secondaryHref: string;
        };
    };
    faq: {
        label: string;
        title: string;
        description: string;
        items: Array<{
            id: string;
            question: string;
            answer: string;
        }>;
    };
    finalCta: {
        title: string;
        description: string;
        primaryText: string;
        primaryHref: string;
        secondaryText: string;
        secondaryHref: string;
    };
};

// TODO(anchors): The template links to "/#recent-works". Ensure the home "RecentWorks" section
// has id="recent-works" so in-page navigation scrolls correctly.

export const SERVICES = [
    {
        slug: "landscaping",
        label: "Landscaping",
        title: "Landscaping that makes your garden feel finished",
        description:
            "Clean lines, practical planting, and tidy finishes—delivered with clear quotes and a straightforward process.",
        hero: {
            imageSrc: "/images/IMG_20250708_34242.webp",
            imageAlt:
                "Freshly maintained garden with trimmed hedges and a neat lawn",
            caption: "A sharp, finished look—without the hassle.",
            pattern: "pattern-1",
        },
        trustChips: ["Clear quotes", "Tidy finish", "Practical advice"],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
        included: {
            label: "What’s included",
            title: "The details that make it feel done properly",
            description:
                "Landscaping doesn’t have to mean a massive project. We focus on improvements that are practical, tidy, and worth the spend.",
            items: [
                {
                    title: "Bed shaping & edging",
                    description:
                        "Clean lines that make the whole garden feel intentional.",
                    icon: "Ruler",
                },
                {
                    title: "Planting & replanting",
                    description:
                        "Practical plant choices to match your space and upkeep.",
                    icon: "Flower2",
                },
                {
                    title: "Mulching & soil improvement",
                    description:
                        "Better soil, better growth, and a more polished finish.",
                    icon: "Layers",
                },
                {
                    title: "Lawn prep & turfing",
                    description:
                        "Level, fresh, and ready for the season ahead.",
                    icon: "Leaf",
                },
                {
                    title: "Hedge shaping & structure tidy-up",
                    description:
                        "A crisp shape that keeps things looking neat.",
                    icon: "Brush",
                },
                {
                    title: "Seasonal refresh & waste removal",
                    description:
                        "Green waste cleared and the space reset properly.",
                    icon: "Trash2",
                },
            ],
        },
        results: {
            label: "Recent landscaping projects",
            title: "A few results we’re proud of",
            description:
                "Small changes add up—clean edges, better structure, and a finish that looks good from every angle.",
            headerCtas: {
                primaryText: "Get a Quote",
                primaryHref: "/quote",
                secondaryText: "See more work",
                secondaryHref: "/",
            },
            cards: [
                {
                    title: "Front garden refresh",
                    description:
                        "A clean reset with sharper edges, fresh mulch, and structure that stays tidy.",
                    imageSrc: "/images/IMG_20250708_16272.webp",
                    imageAlt:
                        "Front garden with freshly trimmed hedges and neat lawn edges",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Low-maintenance planting upgrade",
                    description:
                        "Practical planting choices that look great and don’t demand constant upkeep.",
                    imageSrc: "/images/IMG_20250704_93515.webp",
                    imageAlt:
                        "Garden lawn with fresh cut hedges and a tidy planted border",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Back garden tidy and reshape",
                    description:
                        "A more finished feel with clean lines, cleared areas, and a consistent look.",
                    imageSrc: "/images/IMG_20240509_41792.webp",
                    imageAlt:
                        "Well-kept back garden with trimmed hedges and a neat lawn",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
            ],
            footerNote:
                "Looking for more examples? Browse our recent work on the home page.",
        },
        valueBand: {
            label: "Value",
            title: "Improvements that add real value",
            description:
                "We focus on changes that feel worth it—visually, practically, and long-term.",
            bullets: [
                {
                    title: "Looks finished",
                    description:
                        "Tidy lines and clean structure you notice immediately.",
                    icon: "Sparkles",
                },
                {
                    title: "Easier upkeep",
                    description:
                        "Smarter planting and layout so it stays manageable.",
                    icon: "Leaf",
                },
                {
                    title: "Done properly",
                    description: "Clear plan, clear quote, and a clean finish.",
                    icon: "Shovel",
                },
            ],
            pattern: "pattern-2",
            ctas: {
                primaryText: "Request a Quote",
                primaryHref: "/quote",
                secondaryText: "Ask a Question",
                secondaryHref: "/contact",
            },
        },
        faq: {
            label: "FAQs",
            title: "Quick answers",
            description:
                "If you don’t see your question here, just get in touch.",
            items: [
                {
                    id: "ideas",
                    question: "Do you help with design ideas?",
                    answer:
                        "Yes. We can recommend simple layout and planting improvements that fit your space and the amount of upkeep you want.",
                },
                {
                    id: "existing",
                    question: "Can you work with what I already have?",
                    answer:
                        "Absolutely. If something can be kept or improved, we’ll tell you—no unnecessary rip-out.",
                },
                {
                    id: "duration",
                    question: "How long does a landscaping job take?",
                    answer:
                        "It depends on the scope. Some refreshes take a day; bigger improvements can take longer. We’ll confirm timing with your quote.",
                },
                {
                    id: "waste",
                    question: "Do you remove waste?",
                    answer:
                        "Yes—green waste removal can be included. Just let us know what you want cleared and we’ll include it in pricing.",
                },
                {
                    id: "low-maintenance",
                    question: "Can you recommend low-maintenance plants?",
                    answer:
                        "Yes. We’ll suggest options that suit your garden and how much time you want to spend maintaining it.",
                },
            ],
        },
        finalCta: {
            title: "Ready to tidy up the layout and make it feel finished?",
            description:
                "Tell us what you’d like to improve and we’ll recommend a practical plan—then quote it clearly.",
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
    },
    {
        slug: "lawn-care",
        label: "Lawn Care",
        title: "Lawn care that stays consistently tidy",
        description:
            "Reliable visits, clean edges, and a tidy finish—so your lawn looks good week after week.",
        hero: {
            imageSrc: "/images/IMG_20250704_93515.webp",
            imageAlt:
                "Freshly mown lawn with trimmed hedges in a private garden",
            caption: "Clean lines, consistent care, and a tidy finish.",
            pattern: "pattern-1",
        },
        trustChips: ["Reliable schedule", "Clean edges", "Tidy finish"],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
        included: {
            label: "What’s included",
            title: "The basics, done properly",
            description:
                "We keep it simple: consistent cutting, tidy edges, and a clean finish—plus practical advice when you need it.",
            items: [
                {
                    title: "Regular mowing",
                    description:
                        "A consistent cut that keeps things looking sharp.",
                    icon: "Leaf",
                },
                {
                    title: "Edging & strimming",
                    description:
                        "Clean borders and corners for a finished look.",
                    icon: "Ruler",
                },
                {
                    title: "Light tidy as needed",
                    description:
                        "Quick touch-ups that keep the area presentable.",
                    icon: "Sprout",
                },
                {
                    title: "Seasonal lawn feed (optional)",
                    description:
                        "Simple recommendations to support healthy growth.",
                    icon: "Sprout",
                },
                {
                    title: "Moss / thatch advice",
                    description:
                        "Practical guidance for problem areas and patchy spots.",
                    icon: "Leaf",
                },
                {
                    title: "Green waste removal (optional)",
                    description:
                        "Clippings can be collected and taken away if needed.",
                    icon: "Trash2",
                },
            ],
        },
        plans: {
            label: "Your lawn, your schedule",
            title: "Choose a rhythm that suits your garden",
            description:
                "Weekly, fortnightly, or a one-off reset—whatever keeps your lawn looking the way you want.",
            cards: [
                {
                    title: "Weekly maintenance",
                    description:
                        "For lawns that need consistent care and a tidy look all the time.",
                    bullets: ["Mowing", "Edges and quick tidy"],
                    icon: "CalendarDays",
                },
                {
                    title: "Fortnightly maintenance",
                    description:
                        "A reliable schedule that keeps things under control without overdoing it.",
                    bullets: ["Mowing", "Edges and strimming"],
                    icon: "CalendarDays",
                },
                {
                    title: "One-off tidy & reset",
                    description:
                        "Perfect before guests, photos, or when the lawn has gotten away from you.",
                    bullets: ["Cut back to neat", "Clean lines and finish"],
                    icon: "Ruler",
                },
                {
                    title: "Seasonal refresh",
                    description:
                        "A tidy-up to set the lawn up for the season ahead.",
                    bullets: [
                        "General tidy",
                        "Practical advice for next steps",
                    ],
                    icon: "Leaf",
                },
            ],
            ctas: {
                primaryText: "Request a schedule",
                primaryHref: "/quote",
                secondaryText: "Ask a question",
                secondaryHref: "/contact",
            },
        },
        results: {
            label: "Recent results",
            title: "A tidy lawn makes the whole garden feel better",
            description:
                "A clean cut and crisp edges can completely change how a space feels—especially when it stays consistent.",
            headerCtas: {
                primaryText: "Get a Quote",
                primaryHref: "/quote",
                secondaryText: "See more work",
                secondaryHref: "/",
            },
            cards: [
                {
                    title: "Fresh cut + clean lines",
                    description:
                        "A neat finish with crisp edges that makes the lawn feel cared for.",
                    imageSrc: "/images/IMG_20250708_11200.webp",
                    imageAlt:
                        "Garden with freshly cut hedges and a tidy, freshly mown lawn",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Consistent tidy look",
                    description:
                        "Regular care that keeps growth even and the garden looking sharp.",
                    imageSrc: "/images/IMG_20250715_29185.webp",
                    imageAlt:
                        "Well-kept garden lawn with trimmed hedges and clean edges",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Tidy up before the season",
                    description:
                        "A reset that makes the whole space easier to maintain.",
                    imageSrc: "/images/IMG_20250708_16272.webp",
                    imageAlt:
                        "Neat lawn with freshly trimmed hedges after garden maintenance",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
            ],
        },
        valueBand: {
            label: "Value",
            title: "A lawn that looks good week after week",
            description:
                "Consistency is what makes it feel effortless—regular visits, tidy edges, and clear communication.",
            bullets: [
                {
                    title: "Consistent visits",
                    description:
                        "A reliable schedule that keeps growth under control.",
                    icon: "CalendarDays",
                },
                {
                    title: "Clean edges",
                    description:
                        "Crisp borders that make the lawn look finished.",
                    icon: "Ruler",
                },
                {
                    title: "Weather-aware",
                    description:
                        "If rain shifts timing, we’ll communicate clearly.",
                    icon: "CloudRain",
                },
            ],
            pattern: "pattern-2",
            ctas: {
                primaryText: "Request a Quote",
                primaryHref: "/quote",
                secondaryText: "Contact Us",
                secondaryHref: "/contact",
            },
        },
        faq: {
            label: "FAQs",
            title: "Quick answers",
            description:
                "If you don’t see your question here, just get in touch.",
            items: [
                {
                    id: "frequency",
                    question: "Do you offer weekly or fortnightly visits?",
                    answer:
                        "Yes—weekly and fortnightly are both available depending on your lawn and the time of year.",
                },
                {
                    id: "edges",
                    question: "Do you edge and strim?",
                    answer:
                        "Yes. Keeping edges tidy is part of what makes the lawn look properly finished.",
                },
                {
                    id: "clippings",
                    question: "Can you take away grass clippings?",
                    answer:
                        "Yes—clippings can be collected and removed. Let us know your preference when requesting a quote.",
                },
                {
                    id: "rain",
                    question: "What happens if it rains?",
                    answer:
                        "If weather affects the cut, we’ll communicate and reschedule to the next suitable time.",
                },
                {
                    id: "one-off",
                    question: "Can you do a one-off tidy?",
                    answer:
                        "Yes—one-off cuts and tidy-ups are available, especially for a reset before regular maintenance.",
                },
                {
                    id: "area",
                    question: "Do you cover my area?",
                    answer:
                        "Send your postcode and we’ll confirm availability.",
                },
            ],
        },
        finalCta: {
            title: "Want a lawn that stays tidy without the hassle?",
            description:
                "Tell us what you need and we’ll recommend a schedule—then quote it clearly.",
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
    },
] as const satisfies readonly ServiceDefinition[];

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
export type Service = (typeof SERVICES)[number];

export function getServiceBySlug(slug: string): Service | null {
    return (SERVICES as readonly ServiceDefinition[]).find((s) =>
        s.slug === slug
    ) ?? null;
}

/**
 * Adding a new service
 * - Copy one of the objects in `SERVICES` and change: `slug`, `label`, hero copy/images, and section content.
 * - Choose icons from `IconName` and keep links limited to existing routes (e.g. "/quote", "/contact", "/#recent-works").
 * - You should not need to create a new route file — the `[slug]` page renders everything from this data.
 */
