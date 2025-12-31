import { PricingBreakdown } from "./PricingBreakdown";
import { PricingCalculator } from "./PricingCalculator";
import { PricingFAQ } from "./PricingFAQ";
import { PricingHero } from "./PricingHero";

import { getPricingContent } from "@/lib/keystatic-reader";

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
