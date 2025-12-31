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

export default async function Home() {
    const home = await getHomeContent();

    return (
        <>
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
        </>
    )
}