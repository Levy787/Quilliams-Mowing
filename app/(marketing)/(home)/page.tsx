import type { Metadata } from "next";

import { Hero } from "./Hero";
import { Stats } from "./Stats";
import { AboutUs } from "./AboutUs";
import { Services } from "./Services";
import { ServiceArea } from "./ServiceArea";
import { RecentWorks } from "./RecentWorks";
import { FAQ } from "./FAQ";
import { BoldHeadings } from "./BoldHeadings"
import { LargeCta } from "./LargeCta";
import { Testimonials } from "./Testimonials";

import { getHomeContent } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    const home = await getHomeContent();

    return buildMetadata({
        seo: home.seo,
        fallbackTitle: "Home",
        fallbackDescription: home.hero.subheading,
    });
}

export default async function Home() {
    const home = await getHomeContent();

    return (
        <main>
            <Hero {...home.hero} />
            <Stats items={home.stats} />
            <AboutUs {...home.about} />
            <Services {...home.services} />
            <ServiceArea {...home.serviceArea} />
            <RecentWorks {...home.recentWorks} />
            <BoldHeadings categories={home.marquee.categories} />
            <FAQ {...home.faq} />
            <LargeCta {...home.largeCta} />
            <Testimonials {...home.testimonials} />
        </main>
    )
}