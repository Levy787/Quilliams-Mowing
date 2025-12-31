import { PricingBreakdown } from "./PricingBreakdown";
import { PricingCalculator } from "./PricingCalculator";
import { PricingFAQ } from "./PricingFAQ";
import { PricingHero } from "./PricingHero";

export default function PricingPage() {
    return (
        <main>
            <PricingHero />
            <PricingCalculator />
            <PricingBreakdown />
            <PricingFAQ />
        </main>
    );
}
