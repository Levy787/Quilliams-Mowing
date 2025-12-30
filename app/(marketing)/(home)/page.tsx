import { Hero } from "./Hero";
import { Stats } from "./Stats";
import { AboutUs } from "./AboutUs";
import { Services } from "./Services";
import { RecentWorks } from "./RecentWorks";
import { FAQ } from "./FAQ";
import { BoldHeadings } from "./BoldHeadings"
import { LargeCta } from "./LargeCta";
import { Testimonials } from "./Testimonials";

export default function Home() {
    return (
        <>
            <Hero />
            <Stats />
            <AboutUs />
            <Services />
            <RecentWorks />
            <BoldHeadings />
            <FAQ />
            <LargeCta />
            <Testimonials />
        </>
    )
}