export type TrustStripIcon = "shield" | "star" | "clock" | "sparkles";

export type OfferTemplate = "standard" | "funnel";

export type Offer = {
    slug: string;
    template: OfferTemplate;
    headline: string;
    subheadline: string;
    seo: {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
        ogImage?: string;
    };
    terms: string;
    serviceArea: string;
    phoneDisplay: string;
    phoneTel: string;
    email: string;
    heroImage: {
        src: string;
        alt: string;
    };
    highlights: readonly string[];
    trustStrip: readonly { label: string; icon: TrustStripIcon }[];
    included: readonly string[];
    idealFor: readonly string[];
    typicalTimeline: string;
    faq: readonly { q: string; a: string }[];
};
