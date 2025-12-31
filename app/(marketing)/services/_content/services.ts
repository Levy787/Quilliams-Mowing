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
    {
        slug: "garden-maintenance",
        label: "Garden Maintenance",
        title: "Garden maintenance that keeps everything looking cared for",
        description:
            "Regular, reliable visits to keep your garden tidy, healthy, and consistently presentable—without the stress of falling behind.",
        hero: {
            imageSrc: "/images/IMG_20250715_29185.webp",
            imageAlt:
                "Well-kept garden with trimmed hedges and neat borders after maintenance",
            caption: "A consistent tidy-up makes the whole space feel better.",
            pattern: "pattern-1",
        },
        trustChips: ["Reliable visits", "Tidy finish", "Clear communication"],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
        included: {
            label: "What’s included",
            title: "The routine jobs that keep a garden in shape",
            description:
                "We focus on the essentials: tidy beds, neat edges, sensible pruning, and a clean finish—plus practical advice when you want it.",
            items: [
                {
                    title: "General tidy & reset",
                    description:
                        "A quick refresh that makes everything feel looked after.",
                    icon: "Sparkles",
                },
                {
                    title: "Weeding & bed care",
                    description:
                        "Keep beds clean so plants have space to thrive.",
                    icon: "Sprout",
                },
                {
                    title: "Borders & edging",
                    description:
                        "Crisp edges that instantly lift the look of a garden.",
                    icon: "Ruler",
                },
                {
                    title: "Light pruning (as needed)",
                    description:
                        "Small trims to keep growth under control and tidy.",
                    icon: "Brush",
                },
                {
                    title: "Green waste removal (optional)",
                    description:
                        "Clippings and waste can be collected and taken away.",
                    icon: "Trash2",
                },
                {
                    title: "Season-aware advice",
                    description:
                        "Simple next-step guidance to keep things manageable.",
                    icon: "Leaf",
                },
            ],
        },
        plans: {
            label: "Regular care",
            title: "Choose a maintenance schedule that suits you",
            description:
                "Weekly, fortnightly, or seasonal visits—pick what keeps your garden looking the way you want, without overdoing it.",
            cards: [
                {
                    title: "Weekly visit",
                    description:
                        "For gardens that need a consistently tidy look all the time.",
                    bullets: [
                        "Quick tidy",
                        "Beds and edges",
                        "Keep growth under control",
                    ],
                    icon: "CalendarDays",
                },
                {
                    title: "Fortnightly visit",
                    description:
                        "A dependable rhythm that keeps things in good shape.",
                    bullets: [
                        "Weeding and bed care",
                        "Tidy borders",
                        "Light pruning as needed",
                    ],
                    icon: "CalendarDays",
                },
                {
                    title: "Monthly tidy",
                    description: "A bigger reset to stop things drifting.",
                    bullets: [
                        "General tidy",
                        "Beds refreshed",
                        "Practical next steps",
                    ],
                    icon: "Sparkles",
                },
                {
                    title: "Seasonal refresh",
                    description:
                        "A focused tidy to set the garden up for the season ahead.",
                    bullets: [
                        "Cut back and tidy",
                        "Waste cleared",
                        "Plan for the next few months",
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
            title: "A maintained garden feels calmer",
            description:
                "A consistent tidy-up makes everything look sharper—beds, borders, and structure all feel more intentional.",
            headerCtas: {
                primaryText: "Get a Quote",
                primaryHref: "/quote",
                secondaryText: "See more work",
                secondaryHref: "/",
            },
            cards: [
                {
                    title: "Clean borders + tidy beds",
                    description:
                        "A simple refresh that makes the garden feel looked after again.",
                    imageSrc: "/images/IMG_20250708_16272.webp",
                    imageAlt:
                        "Tidy garden with neat lawn edges and trimmed borders",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Consistent upkeep",
                    description:
                        "Regular visits keep everything presentable week after week.",
                    imageSrc: "/images/IMG_20250715_29185.webp",
                    imageAlt: "Well-kept garden after regular maintenance",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Reset after overgrowth",
                    description:
                        "A tidy reset that makes the space easier to maintain going forward.",
                    imageSrc: "/images/IMG_20240509_41792.webp",
                    imageAlt: "Garden looking neat after a maintenance reset",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
            ],
        },
        valueBand: {
            label: "Value",
            title: "A garden that stays tidy without the hassle",
            description:
                "The goal is consistency: a clear plan, reliable visits, and a finish that makes your whole property feel better kept.",
            bullets: [
                {
                    title: "Looks cared for",
                    description:
                        "Small details add up—beds, borders, and structure feel sharper.",
                    icon: "Sparkles",
                },
                {
                    title: "Easier upkeep",
                    description:
                        "Regular attention prevents big catch-up jobs.",
                    icon: "Leaf",
                },
                {
                    title: "Straightforward process",
                    description:
                        "Clear quote, clear schedule, and good communication.",
                    icon: "Shovel",
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
                    id: "what-included",
                    question: "What’s included in garden maintenance?",
                    answer:
                        "It depends on your garden, but typically bed care, weeding, light pruning, tidy edges, and a clean finish. We’ll confirm details in your quote.",
                },
                {
                    id: "schedule",
                    question: "Do you offer regular visits?",
                    answer:
                        "Yes—weekly, fortnightly, monthly, and seasonal options depending on the time of year and what you want maintained.",
                },
                {
                    id: "waste",
                    question: "Can you remove green waste?",
                    answer:
                        "Yes—waste removal can be included. Let us know what you’d like taken away when requesting a quote.",
                },
                {
                    id: "one-off",
                    question: "Can you do a one-off tidy?",
                    answer:
                        "Yes—one-off resets are available, especially as a starting point before regular maintenance.",
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
            title: "Want your garden to stay tidy all season?",
            description:
                "Tell us what you want maintained and how often—then we’ll recommend a schedule and quote it clearly.",
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
    },
    {
        slug: "hedge-trimming",
        label: "Hedge Trimming",
        title: "Hedge trimming for a crisp, tidy finish",
        description:
            "Neat shapes, clean lines, and a consistent look—whether it’s a quick trim or a proper reset after overgrowth.",
        hero: {
            imageSrc: "/images/IMG_20250708_11200.webp",
            imageAlt:
                "Freshly trimmed hedges with a tidy lawn in a private garden",
            caption: "A sharp trim makes the whole garden look more finished.",
            pattern: "pattern-1",
        },
        trustChips: ["Clean lines", "Tidy finish", "Practical advice"],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
        included: {
            label: "What’s included",
            title: "A clean shape that stays looking tidy",
            description:
                "We focus on a neat finish with sensible shaping—so hedges look sharp without looking overdone.",
            items: [
                {
                    title: "Shaping & trimming",
                    description:
                        "Clean lines that make hedges look intentional.",
                    icon: "Brush",
                },
                {
                    title: "Height & width control",
                    description: "Keep growth manageable and consistent.",
                    icon: "Ruler",
                },
                {
                    title: "Problem area tidy-up",
                    description: "Reset awkward corners and uneven spots.",
                    icon: "Sparkles",
                },
                {
                    title: "Season-aware approach",
                    description:
                        "Practical timing guidance to keep things healthy.",
                    icon: "Leaf",
                },
                {
                    title: "Green waste removal (optional)",
                    description: "Clippings can be collected and taken away.",
                    icon: "Trash2",
                },
                {
                    title: "Ongoing maintenance option",
                    description: "Keep it looking sharp with repeat visits.",
                    icon: "CalendarDays",
                },
            ],
        },
        plans: {
            label: "Options",
            title: "Choose a trim that matches your needs",
            description:
                "From a quick tidy to a more thorough reset—pick the level of work that suits the hedge and the result you want.",
            cards: [
                {
                    title: "Light tidy trim",
                    description:
                        "A quick refresh to keep the hedge looking neat.",
                    bullets: ["Tidy the outline", "Clean edges and corners"],
                    icon: "Brush",
                },
                {
                    title: "Shape and refine",
                    description: "A more deliberate trim for a sharper look.",
                    bullets: ["Even shape", "Consistent height", "Neat finish"],
                    icon: "Ruler",
                },
                {
                    title: "One-off reset",
                    description:
                        "When growth has gotten away and you want it back under control.",
                    bullets: [
                        "Bring it back to shape",
                        "Improve overall look",
                        "Advice for maintenance",
                    ],
                    icon: "Sparkles",
                },
                {
                    title: "Regular maintenance",
                    description: "Keep hedges crisp with repeat visits.",
                    bullets: ["Keep growth controlled", "Consistent tidy look"],
                    icon: "CalendarDays",
                },
            ],
            ctas: {
                primaryText: "Request a quote",
                primaryHref: "/quote",
                secondaryText: "Ask a question",
                secondaryHref: "/contact",
            },
        },
        results: {
            label: "Recent results",
            title: "Sharper lines, neater garden",
            description:
                "A well-shaped hedge improves the whole space—structure looks stronger and everything feels more cared for.",
            headerCtas: {
                primaryText: "Get a Quote",
                primaryHref: "/quote",
                secondaryText: "See more work",
                secondaryHref: "/",
            },
            cards: [
                {
                    title: "Crisp, clean outline",
                    description:
                        "A tidy trim that makes the hedge look sharp again.",
                    imageSrc: "/images/IMG_20250708_11200.webp",
                    imageAlt:
                        "Hedges trimmed into a neat shape with a tidy lawn",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Consistent structure",
                    description:
                        "Even shaping for a more finished look from every angle.",
                    imageSrc: "/images/IMG_20250715_29185.webp",
                    imageAlt:
                        "Garden with neatly trimmed hedges and clean borders",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Reset after overgrowth",
                    description:
                        "A more controlled shape that’s easier to maintain.",
                    imageSrc: "/images/IMG_20240509_41792.webp",
                    imageAlt: "Garden after a hedge tidy-up and reset",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
            ],
        },
        valueBand: {
            label: "Value",
            title: "A garden that looks more finished instantly",
            description:
                "Hedges are structure. When they’re tidy, everything else looks better—paths, lawns, and planting all feel more intentional.",
            bullets: [
                {
                    title: "Looks sharper",
                    description: "Clean lines improve the whole garden’s look.",
                    icon: "Sparkles",
                },
                {
                    title: "Easier upkeep",
                    description: "Regular trimming prevents big catch-up jobs.",
                    icon: "Leaf",
                },
                {
                    title: "Done properly",
                    description:
                        "A clean finish with practical advice for next steps.",
                    icon: "Shovel",
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
                    question: "How often should hedges be trimmed?",
                    answer:
                        "It depends on the hedge type and the look you want. We can recommend timing when we quote.",
                },
                {
                    id: "height",
                    question: "Can you reduce the height or width?",
                    answer:
                        "Often yes. Send a photo and we’ll advise what’s practical and include it in the quote.",
                },
                {
                    id: "waste",
                    question: "Do you remove hedge clippings?",
                    answer:
                        "Yes—waste removal can be included. Let us know what you want taken away.",
                },
                {
                    id: "one-off",
                    question: "Do you do one-off trims?",
                    answer: "Yes—one-off trims and reset jobs are available.",
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
            title: "Want your hedges looking sharp again?",
            description:
                "Send a quick description (and photos if you can) and we’ll quote the trim clearly.",
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
    },
    {
        slug: "mulching",
        label: "Mulching",
        title: "Mulching that makes beds look finished and easier to manage",
        description:
            "A clean layer of mulch improves the look of beds, helps keep things tidy, and supports healthier growth with less day-to-day hassle.",
        hero: {
            imageSrc: "/images/IMG_20250704_93515.webp",
            imageAlt: "Garden border and lawn looking tidy after a refresh",
            caption: "A simple upgrade that makes beds look intentional.",
            pattern: "pattern-1",
        },
        trustChips: ["Polished finish", "Cleaner beds", "Lower upkeep"],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
        included: {
            label: "What’s included",
            title: "A tidy bed refresh with a clean finish",
            description:
                "We prep beds properly, apply mulch neatly, and leave the space looking sharp—so it stays easier to manage going forward.",
            items: [
                {
                    title: "Bed prep & tidy",
                    description:
                        "Clear and tidy beds so the finish looks clean.",
                    icon: "Sparkles",
                },
                {
                    title: "Weeding before mulching",
                    description: "A better base helps the result last longer.",
                    icon: "Sprout",
                },
                {
                    title: "Neat edging for a crisp line",
                    description:
                        "A sharp border makes the mulch look intentional.",
                    icon: "Ruler",
                },
                {
                    title: "Mulch application",
                    description: "Even coverage for a consistent, tidy look.",
                    icon: "Layers",
                },
                {
                    title: "Season-aware advice",
                    description: "Practical guidance on timing and upkeep.",
                    icon: "Leaf",
                },
                {
                    title: "Waste removal (optional)",
                    description: "Green waste can be collected and taken away.",
                    icon: "Trash2",
                },
            ],
        },
        results: {
            label: "Recent results",
            title: "Beds that look sharper and stay cleaner",
            description:
                "Mulch can transform the look of a border—cleaner lines, a more finished feel, and less mess day-to-day.",
            headerCtas: {
                primaryText: "Get a Quote",
                primaryHref: "/quote",
                secondaryText: "See more work",
                secondaryHref: "/",
            },
            cards: [
                {
                    title: "Crisp borders",
                    description:
                        "Clean lines that make beds look deliberate and tidy.",
                    imageSrc: "/images/IMG_20250708_16272.webp",
                    imageAlt: "Tidy garden edges with a neat border finish",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "A more finished look",
                    description:
                        "A simple bed refresh that lifts the whole garden.",
                    imageSrc: "/images/IMG_20250715_29185.webp",
                    imageAlt: "Garden looking well cared for after a tidy-up",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Reset for the season",
                    description:
                        "A tidy base that’s easier to maintain going forward.",
                    imageSrc: "/images/IMG_20240509_41792.webp",
                    imageAlt: "Garden bed area looking neat after a refresh",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
            ],
        },
        valueBand: {
            label: "Value",
            title: "A smarter bed finish with less day-to-day hassle",
            description:
                "Mulch helps beds look tidy, protects soil, and keeps things more manageable—especially when paired with clean edging.",
            bullets: [
                {
                    title: "Looks cleaner",
                    description:
                        "A polished bed finish that lifts the whole space.",
                    icon: "Sparkles",
                },
                {
                    title: "Supports healthier growth",
                    description:
                        "Better moisture control and improved soil condition.",
                    icon: "Leaf",
                },
                {
                    title: "Practical improvement",
                    description:
                        "A straightforward job that feels worth it visually.",
                    icon: "Shovel",
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
                    id: "what",
                    question: "What does mulching include?",
                    answer:
                        "Usually bed tidy/prep, weeding where needed, neat edges, and an even mulch finish. We’ll confirm scope when we quote.",
                },
                {
                    id: "timing",
                    question: "When is the best time to mulch?",
                    answer:
                        "Often spring or autumn, but it depends on your garden and what you want to achieve. We can advise.",
                },
                {
                    id: "cleanup",
                    question: "Do you remove waste?",
                    answer:
                        "Yes—waste removal can be included. Tell us what you want taken away when requesting a quote.",
                },
                {
                    id: "materials",
                    question: "Do you supply the mulch?",
                    answer:
                        "We can. Tell us the look you want and we’ll recommend an option and include it in the quote.",
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
            title: "Want beds that look finished and stay tidy?",
            description:
                "Tell us which areas you want refreshed and we’ll quote the job clearly.",
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
    },
    {
        slug: "seasonal-cleanup",
        label: "Seasonal Cleanup",
        title: "Seasonal cleanups that reset your garden properly",
        description:
            "A focused tidy-up that clears the mess, brings things back under control, and sets your garden up for the season ahead.",
        hero: {
            imageSrc: "/images/IMG_20240509_41792.webp",
            imageAlt: "Garden looking tidy after a seasonal cleanup and reset",
            caption: "A proper reset makes everything feel easier to manage.",
            pattern: "pattern-1",
        },
        trustChips: ["One-off reset", "Tidy finish", "Waste removal optional"],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
        included: {
            label: "What’s included",
            title: "A clear, practical reset for the season",
            description:
                "We’ll focus on the work that makes the biggest difference: clearing, cutting back, tidying structure, and leaving a clean finish.",
            items: [
                {
                    title: "General clear-out",
                    description:
                        "Remove the built-up mess so the garden feels usable again.",
                    icon: "Trash2",
                },
                {
                    title: "Cut back & tidy",
                    description:
                        "A sensible prune and tidy for a cleaner shape.",
                    icon: "Brush",
                },
                {
                    title: "Bed cleanup",
                    description:
                        "Clear and tidy borders so everything looks sharper.",
                    icon: "Sprout",
                },
                {
                    title: "Edges and borders",
                    description:
                        "Crisp lines that make the garden feel more finished.",
                    icon: "Ruler",
                },
                {
                    title: "Season-aware plan",
                    description:
                        "Practical advice for what to do next and when.",
                    icon: "Leaf",
                },
                {
                    title: "Polished finish",
                    description: "A tidy, complete look—not half-done.",
                    icon: "Sparkles",
                },
            ],
        },
        results: {
            label: "Recent results",
            title: "From messy to manageable",
            description:
                "A seasonal reset makes ongoing upkeep easier and the whole space feel more presentable.",
            headerCtas: {
                primaryText: "Get a Quote",
                primaryHref: "/quote",
                secondaryText: "See more work",
                secondaryHref: "/",
            },
            cards: [
                {
                    title: "Clearer beds and borders",
                    description:
                        "A reset that makes the garden feel lighter and cleaner.",
                    imageSrc: "/images/IMG_20240509_41792.webp",
                    imageAlt: "Garden after a cleanup with tidy borders",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Sharper structure",
                    description:
                        "A tidy-up that makes hedges, edges, and shapes feel more intentional.",
                    imageSrc: "/images/IMG_20250708_11200.webp",
                    imageAlt: "Tidy garden structure with neat hedges and lawn",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Ready for the season",
                    description:
                        "A fresh start that’s easier to maintain going forward.",
                    imageSrc: "/images/IMG_20250708_16272.webp",
                    imageAlt:
                        "Garden looking neat and ready after seasonal work",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
            ],
        },
        valueBand: {
            label: "Value",
            title: "A reset that makes the whole garden feel better",
            description:
                "Seasonal cleanups are about momentum: once it’s tidy again, everything becomes simpler to maintain.",
            bullets: [
                {
                    title: "Immediate difference",
                    description:
                        "Clearer, cleaner, and more presentable straight away.",
                    icon: "Sparkles",
                },
                {
                    title: "Easier upkeep next",
                    description: "Less catch-up work week to week.",
                    icon: "Leaf",
                },
                {
                    title: "Straightforward quote",
                    description: "Clear scope and a tidy finish you can see.",
                    icon: "Shovel",
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
                    id: "when",
                    question: "When should I book a seasonal cleanup?",
                    answer:
                        "Spring and autumn are common, but it depends on your garden. Tell us what you want achieved and we’ll advise.",
                },
                {
                    id: "scope",
                    question: "What’s included in a cleanup?",
                    answer:
                        "Usually clearing, tidying beds, light pruning/cut back, edges, and a clean finish. We’ll confirm in your quote.",
                },
                {
                    id: "waste",
                    question: "Do you remove waste?",
                    answer:
                        "Yes—waste removal can be included. Let us know what you want taken away.",
                },
                {
                    id: "one-off",
                    question: "Can this be a one-off job?",
                    answer:
                        "Yes—seasonal cleanups are commonly one-off resets.",
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
            title: "Want a proper garden reset for the season?",
            description:
                "Tell us what needs clearing and we’ll recommend a practical plan—then quote it clearly.",
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
    },
    {
        slug: "irrigation-drainage",
        label: "Irrigation & Drainage",
        title:
            "Irrigation and drainage improvements that reduce garden headaches",
        description:
            "Practical fixes to help your garden cope better with wet weather and dry spells—so it stays healthier and easier to maintain.",
        hero: {
            imageSrc: "/images/IMG_20250708_34242.webp",
            imageAlt:
                "Garden looking healthy and tidy after practical improvements",
            caption: "Smarter water management makes upkeep easier.",
            pattern: "pattern-1",
        },
        trustChips: [
            "Practical approach",
            "Clear quote",
            "Better long-term upkeep",
        ],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
        included: {
            label: "What’s included",
            title: "Simple, practical improvements",
            description:
                "We focus on sensible upgrades that help manage water better and improve how your garden performs through the seasons.",
            items: [
                {
                    title: "Problem-area assessment",
                    description:
                        "Identify where water is pooling, running, or being wasted.",
                    icon: "CloudRain",
                },
                {
                    title: "Soil and bed improvement",
                    description:
                        "Targeted improvements to help water soak in and support growth.",
                    icon: "Layers",
                },
                {
                    title: "Mulch and moisture support",
                    description:
                        "A tidy finish that helps beds retain moisture more evenly.",
                    icon: "Leaf",
                },
                {
                    title: "Practical planting advice",
                    description:
                        "Plant choices that cope better with local conditions.",
                    icon: "Flower2",
                },
                {
                    title: "Tidy edges and finish",
                    description: "A neat, finished look once work is complete.",
                    icon: "Ruler",
                },
                {
                    title: "Waste removal (optional)",
                    description:
                        "Clear-up can include taking waste away if needed.",
                    icon: "Trash2",
                },
            ],
        },
        results: {
            label: "Recent results",
            title: "Healthier beds, easier upkeep",
            description:
                "Small improvements to water management can make a big difference to how your garden looks and how much effort it takes to maintain.",
            headerCtas: {
                primaryText: "Get a Quote",
                primaryHref: "/quote",
                secondaryText: "See more work",
                secondaryHref: "/",
            },
            cards: [
                {
                    title: "Better-performing beds",
                    description:
                        "Practical upgrades that help planting thrive more consistently.",
                    imageSrc: "/images/IMG_20250704_93515.webp",
                    imageAlt:
                        "Garden looking tidy with healthy beds and borders",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Cleaner, tidier finish",
                    description:
                        "A smarter layout and finish that feels more intentional.",
                    imageSrc: "/images/IMG_20250708_16272.webp",
                    imageAlt:
                        "Tidy garden edges and borders after improvements",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "More manageable upkeep",
                    description:
                        "A garden that’s easier to keep looking good through the season.",
                    imageSrc: "/images/IMG_20250715_29185.webp",
                    imageAlt: "Well-maintained garden after practical work",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
            ],
        },
        valueBand: {
            label: "Value",
            title: "A garden that handles weather better",
            description:
                "When water is managed better, beds perform better and the whole garden becomes easier to maintain.",
            bullets: [
                {
                    title: "More consistent growth",
                    description:
                        "Beds and planting cope better through wet and dry periods.",
                    icon: "Leaf",
                },
                {
                    title: "Practical improvements",
                    description:
                        "Focus on changes that make a noticeable difference.",
                    icon: "Shovel",
                },
                {
                    title: "Cleaner finish",
                    description: "A tidy end result that looks intentional.",
                    icon: "Sparkles",
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
                    id: "what",
                    question:
                        "What kind of irrigation or drainage work do you do?",
                    answer:
                        "We focus on practical garden improvements and clear recommendations. Tell us the issue (pooling water, dry beds, etc.) and we’ll advise what’s worth doing.",
                },
                {
                    id: "photos",
                    question: "Can I send photos?",
                    answer:
                        "Yes—photos help us understand the issue and quote accurately.",
                },
                {
                    id: "timing",
                    question: "When is the best time to address drainage?",
                    answer:
                        "Any time you’re seeing problems, but seasonal timing can help. We’ll advise when quoting.",
                },
                {
                    id: "disruption",
                    question: "Will it be disruptive?",
                    answer:
                        "It depends on the scope. We’ll outline what’s involved before starting.",
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
            title: "Got a wet patch or beds that struggle in dry spells?",
            description:
                "Tell us what’s happening (and send photos if you can) and we’ll recommend a practical fix—then quote it clearly.",
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
    },
    {
        slug: "planting",
        label: "Planting",
        title: "Planting that looks great and suits your level of upkeep",
        description:
            "Practical plant choices and tidy bed finishing—so your garden looks better now and stays manageable long-term.",
        hero: {
            imageSrc: "/images/IMG_20250708_16272.webp",
            imageAlt:
                "Tidy garden border and lawn with a clean, refreshed look",
            caption:
                "Better planting makes the whole space feel more intentional.",
            pattern: "pattern-1",
        },
        trustChips: ["Practical advice", "Tidy finish", "Lower upkeep options"],
        ctas: {
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
        included: {
            label: "What’s included",
            title: "A tidy planting upgrade that feels worth it",
            description:
                "We’ll help choose sensible plants, place them properly, and leave a neat finish—so it looks intentional and stays manageable.",
            items: [
                {
                    title: "Plant selection advice",
                    description:
                        "Options that match your space and how much upkeep you want.",
                    icon: "Flower2",
                },
                {
                    title: "Bed tidy and prep",
                    description: "A clean base so the planting looks sharp.",
                    icon: "Sprout",
                },
                {
                    title: "Spacing and layout",
                    description:
                        "A practical layout that grows in well over time.",
                    icon: "Ruler",
                },
                {
                    title: "Soil improvement (as needed)",
                    description:
                        "Better soil supports healthier, more reliable growth.",
                    icon: "Layers",
                },
                {
                    title: "Mulch/finish option",
                    description:
                        "A clean finish that makes beds look more complete.",
                    icon: "Leaf",
                },
                {
                    title: "Waste removal (optional)",
                    description:
                        "Clear-up can include taking waste away if needed.",
                    icon: "Trash2",
                },
            ],
        },
        results: {
            label: "Recent results",
            title: "A more finished look with sensible planting",
            description:
                "Good planting doesn’t have to be complicated. A tidy layout and practical choices can transform the feel of a garden.",
            headerCtas: {
                primaryText: "Get a Quote",
                primaryHref: "/quote",
                secondaryText: "See more work",
                secondaryHref: "/",
            },
            cards: [
                {
                    title: "Cleaner borders",
                    description:
                        "A tidy refresh that makes the garden feel more intentional.",
                    imageSrc: "/images/IMG_20250708_16272.webp",
                    imageAlt: "Garden with tidy borders and a clean finish",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "Practical upgrade",
                    description:
                        "A planting update designed to stay manageable.",
                    imageSrc: "/images/IMG_20250704_93515.webp",
                    imageAlt: "Garden looking neat after a refresh and tidy-up",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
                {
                    title: "More polished feel",
                    description:
                        "Small changes that improve the garden’s overall look.",
                    imageSrc: "/images/IMG_20250715_29185.webp",
                    imageAlt: "Well-kept garden after practical improvements",
                    ctaText: "View more details",
                    ctaHref: "/#recent-works",
                },
            ],
        },
        valueBand: {
            label: "Value",
            title: "Planting that looks good and stays manageable",
            description:
                "The best planting upgrades are the ones you can keep up with—practical choices, tidy finish, and a layout that grows in well.",
            bullets: [
                {
                    title: "Looks more intentional",
                    description:
                        "A tidy bed layout changes the feel of the whole space.",
                    icon: "Sparkles",
                },
                {
                    title: "Matches your upkeep level",
                    description:
                        "Choices that suit how much time you want to spend maintaining.",
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
                    id: "choices",
                    question: "Can you recommend plants for low maintenance?",
                    answer:
                        "Yes. Tell us what you like and how much upkeep you want, and we’ll recommend practical options.",
                },
                {
                    id: "supply",
                    question: "Do you supply the plants?",
                    answer:
                        "We can. We’ll discuss budget and the look you want, then include it in the quote.",
                },
                {
                    id: "timing",
                    question: "When is the best time to plant?",
                    answer:
                        "It depends on what you’re planting and the conditions. We’ll advise when quoting.",
                },
                {
                    id: "prep",
                    question: "Do you prepare the beds first?",
                    answer:
                        "Yes—bed prep and tidy is usually part of getting a clean, finished result.",
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
            title: "Want a planting upgrade that feels worth it?",
            description:
                "Tell us what you want improved and the look you’re after—then we’ll recommend a practical plan and quote it clearly.",
            primaryText: "Get a Quote",
            primaryHref: "/quote",
            secondaryText: "Contact Us",
            secondaryHref: "/contact",
        },
    },
] as const satisfies readonly ServiceDefinition[];

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
export type Service = ServiceDefinition;

export function getServiceBySlug(slug: string): ServiceDefinition | null {
    return (
        (SERVICES as readonly ServiceDefinition[]).find((s) => s.slug === slug) ??
        null
    );
}

/**
 * Adding a new service
 * - Copy one of the objects in `SERVICES` and change: `slug`, `label`, hero copy/images, and section content.
 * - Choose icons from `IconName` and keep links limited to existing routes (e.g. "/quote", "/contact", "/#recent-works").
 * - You should not need to create a new route file — the `[slug]` page renders everything from this data.
 */
