import type { Metadata } from "next";

import { PricingBreakdown } from "./PricingBreakdown";
import { PricingCalculator } from "./PricingCalculator";
import { PricingFAQ } from "./PricingFAQ";
import { PricingHero } from "./PricingHero";

import { getPricingContent } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    const pricing = await getPricingContent();

    return buildMetadata({
        seo: pricing.seo,
        fallbackTitle: "Pricing",
        fallbackDescription: pricing.hero.description,
    });
}

export default async function PricingPage() {
    const pricing = await getPricingContent();

    return (
        <main>
            <PricingHero {...pricing.hero} />
            <PricingCalculator {...pricing.calculator} />
            <PricingBreakdown {...pricing.breakdown} />
            <PricingFAQ {...pricing.faq} />
        </main>
    );
}
