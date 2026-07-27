import type { Metadata } from "next";

import { PricingBreakdown } from "./PricingBreakdown";
import { PricingCalculator } from "./PricingCalculator";
import { PricingFAQ } from "./PricingFAQ";
import { PricingGuide } from "./PricingGuide";
import { PricingHero } from "./PricingHero";

import { QuoteActionStrip } from "@/components/reusable/QuoteActionStrip";
import { QuoteCtaBand } from "@/components/reusable/QuoteCtaBand";
import { getPricingContent } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { OfferCatalogSchema } from "@/components/seo/OfferCatalogSchema";

const PRICING_OFFERS = [
    {
        serviceSlug: "lawn-care",
        name: "Lawn Mowing & Lawn Care",
        description: "Weekly or fortnightly lawn mowing with clean edges, strimming, and a tidy finish across Newquay, St Columb Major, Padstow and north Cornwall.",
        minPrice: 20,
        maxPrice: 50,
        priceDescription: "From £20 for a small lawn; £30 to £50 for an average-sized garden.",
    },
    {
        serviceSlug: "hedge-trimming",
        name: "Hedge Trimming",
        description: "Careful hedge trimming, reductions, and reshaping for hedges of all sizes across Cornwall.",
        minPrice: 80,
        maxPrice: 400,
        priceDescription: "Typically £80 to £400 depending on hedge length, height, and waste handling.",
    },
    {
        serviceSlug: "garden-maintenance",
        name: "Garden Maintenance",
        description: "Regular garden maintenance visits covering mowing, weeding, edges, and seasonal tidying.",
        minPrice: 50,
        maxPrice: 200,
        priceDescription: "Typically £50 to £200 per visit depending on garden size and scope.",
    },
    {
        serviceSlug: "landscaping",
        name: "Landscaping",
        description: "Practical landscaping including gravel gardens, planting, edging, and low-maintenance redesigns.",
        minPrice: 500,
        maxPrice: 5000,
        priceDescription: "Projects typically start from £500 for small areas and scale based on materials and scope.",
    },
    {
        serviceSlug: "mulching",
        name: "Mulching",
        description: "Bark, gravel, or compost mulching to suppress weeds and improve garden beds.",
        minPrice: 80,
        maxPrice: 400,
        priceDescription: "Typically £80 to £400 depending on area covered and material chosen.",
    },
    {
        serviceSlug: "seasonal-cleanup",
        name: "Seasonal Garden Cleanup",
        description: "One-off seasonal clearances for overgrown gardens, weeds, leaves, and tidy-ups before sale or rental.",
        minPrice: 100,
        maxPrice: 800,
        priceDescription: "Typically £100 to £800 depending on overgrowth, access, and green waste handling.",
    },
];

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
            <OfferCatalogSchema items={PRICING_OFFERS} />
            <PricingHero {...pricing.hero} />
            <QuoteActionStrip
                heading="Want the real price, not a guide?"
                body="Use the calculator for a rough range, or send the job details for a fixed quote."
            />
            <PricingGuide />
            <PricingCalculator {...pricing.calculator} />
            <PricingBreakdown {...pricing.breakdown} />
            <PricingFAQ {...pricing.faq} />
            <QuoteCtaBand
                heading="Want a price for your exact garden?"
                body="The prices above are guides. Send me a few details and I'll give you a clear, fixed quote, usually within 24 hours. No obligation."
            />
        </main>
    );
}
