import { Hero } from "./Hero";
import { Stats } from "./Stats";
import { AboutUs } from "./AboutUs";
import { Services } from "./Services";

export default function Home() {
    return (
        <>
            <Hero />
            <Stats />
            <AboutUs />
            <Services />
        </>
    )
}