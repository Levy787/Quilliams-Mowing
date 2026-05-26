import type { Metadata } from "next";

import { PricingBreakdown } from "./PricingBreakdown";
import { PricingCalculator } from "./PricingCalculator";
import { PricingFAQ } from "./PricingFAQ";
import { PricingGuide } from "./PricingGuide";
import { PricingHero } from "./PricingHero";

import { getPricingContent } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export async function generateMetadata(): Promise<Metadata> {
    const pricing = await getPricingContent();

    return buildMetadata({
        seo: pricing.seo,
        fallbackTitle: "Pricing",
        fallbackDescription: pricing.hero.description,
        canonicalPath: "/pricing",
    });
}

export default async function PricingPage() {
    const pricing = await getPricingContent();

    // Transform FAQ items for schema
    const faqItems = pricing.faq.items.map((item) => ({
        question: item.q,
        answer: item.a,
    }));

    return (
        <main>
            <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Pricing", href: "/pricing" }]} />
            <FAQSchema items={faqItems} />
            <PricingHero {...pricing.hero} />
            <PricingGuide />
            <PricingCalculator {...pricing.calculator} />
            <PricingBreakdown {...pricing.breakdown} />
            <PricingFAQ {...pricing.faq} />
        </main>
    );
}
