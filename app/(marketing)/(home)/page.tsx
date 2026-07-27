import type { Metadata } from "next";

import { Hero } from "./Hero";
import { Stats } from "./Stats";
import { AboutUs } from "./AboutUs";
import { Services } from "./Services";
import { FAQ } from "./FAQ";
import { BoldHeadings } from "./BoldHeadings"
import { LargeCta } from "./LargeCta";
import {
    DeferredRecentWorks,
    DeferredServiceArea,
    DeferredTestimonials,
} from "./DeferredHomeSections";
import { TrustBar } from "@/components/TrustBar";
import { QuoteActionStrip } from "@/components/reusable/QuoteActionStrip";

import { getHomeContent } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";
import { ReviewSchema } from "@/components/seo/ReviewSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { WebPageSchema } from "@/components/seo/WebPageSchema";
import { PrimarySitelinks } from "@/components/seo/PrimarySitelinks";

export async function generateMetadata(): Promise<Metadata> {
    const home = await getHomeContent();

    return buildMetadata({
        seo: home.seo,
        fallbackTitle: "Home",
        fallbackDescription: home.hero.subheading,
        isHomepage: true,
        canonicalPath: "/",
    });
}

export default async function Home() {
    const home = await getHomeContent();

    // Transform testimonials to review format
    const reviews = home.testimonials.items.map((item) => ({
        author: item.name,
        reviewBody: item.quote,
        datePublished: item.date,
        ratingValue: 5,
    }));

    // Transform FAQ items for schema
    const faqItems = home.faq.items.map((item) => ({
        question: item.question,
        answer: item.answer,
    }));

    return (
        <main>
            <WebPageSchema
                name={home.seo.title}
                description={home.seo.description}
            />
            <ReviewSchema reviews={reviews} />
            <FAQSchema items={faqItems} />
            <Hero {...home.hero} />
            <TrustBar />
            <QuoteActionStrip
                heading="Need a garden quote this week?"
                body="Send a few details or call Levi. Photos are helpful, but a short note is enough to start."
            />
            <PrimarySitelinks />
            <Stats items={home.stats} />
            <AboutUs {...home.about} />
            <Services {...home.services} />
            <DeferredServiceArea {...home.serviceArea} />
            <DeferredRecentWorks {...home.recentWorks} />
            <BoldHeadings categories={home.marquee.categories} />
            <FAQ {...home.faq} />
            <LargeCta {...home.largeCta} />
            <DeferredTestimonials {...home.testimonials} />
        </main>
    )
}
