export type TrustStripIcon = "shield" | "star" | "clock" | "sparkles";

export type Offer = {
    slug: string;
    headline: string;
    subheadline: string;
    terms: string;
    serviceArea: string;
    phoneDisplay: string;
    phoneTel: string;
    email: string;
    heroImage: {
        src: string;
        alt: string;
    };
    highlights: string[];
    trustStrip: Array<{ label: string; icon: TrustStripIcon }>;
    included: string[];
    idealFor: string[];
    typicalTimeline: string;
    faq: Array<{ q: string; a: string }>;
};

export const OFFERS = [
    {
        slug: "spring-cleanup-special",
        headline: "Spring Cleanup Special",
        subheadline:
            "Clear the mess, refresh your garden beds, and get your yard back under control — fast, tidy, and stress-free.",
        terms: "Limited spots available. New customers only.",
        serviceArea: "Serving Wollongong & nearby suburbs",
        phoneDisplay: "+1 (555) 123-4567",
        phoneTel: "+15551234567",
        email: "hello@quilliamsgardening.com",
        heroImage: {
            src: "https://picsum.photos/id/292/1200/1400",
            alt: "Freshly cleaned garden beds and tidy yard",
        },
        highlights: [
            "Fast response",
            "Transparent pricing",
            "Friendly, reliable crew",
        ],
        trustStrip: [
            { icon: "shield", label: "Licensed & insured" },
            { icon: "star", label: "5-star service mindset" },
            { icon: "clock", label: "On-time scheduling" },
            { icon: "sparkles", label: "Clean finish" },
        ],
        included: [
            "Leaf and debris removal (beds + pathways)",
            "Weeding and garden bed tidy-up",
            "Light pruning (as needed)",
            "Green waste bagging/stacking",
            "Final blow-down for a clean finish",
        ],
        idealFor: [
            "Overgrown gardens that need a reset",
            "Season changeovers and property refresh",
            "Homeowners short on time",
        ],
        typicalTimeline:
            "Most cleanups take 2–4 hours depending on yard size and access.",
        faq: [
            {
                q: "How soon can you come out?",
                a: "We’ll confirm availability after you submit. Same-week spots may be available depending on demand.",
            },
            {
                q: "Do you take away green waste?",
                a: "We can bag/stack green waste and discuss removal options when we confirm your scope.",
            },
            {
                q: "Is the offer available for large properties?",
                a: "Yes — we’ll tailor the quote based on property size, access, and workload.",
            },
            {
                q: "What do you need from me to quote?",
                a: "A short description and a few photos are usually enough. We’ll ask follow-up questions if needed.",
            },
        ],
    },
] as const satisfies readonly Offer[];

export type OfferSlug = (typeof OFFERS)[number]["slug"];

export function getOfferBySlug(slug: string) {
    return (
        OFFERS.find((offer) => offer.slug === slug) ?? null
    );
}
