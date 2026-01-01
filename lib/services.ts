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

export type Service = {
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
    trustChips: readonly string[];
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
        items: ReadonlyArray<{
            title: string;
            description: string;
            icon: IconName;
        }>;
    };
    plans?: {
        label: string;
        title: string;
        description: string;
        cards: ReadonlyArray<{
            title: string;
            description: string;
            bullets: readonly string[];
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
        cards: ReadonlyArray<{
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
        bullets: ReadonlyArray<{
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
        items: ReadonlyArray<{
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
