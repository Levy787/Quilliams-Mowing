import type { Metadata } from "next";

import { AboutFAQ } from "./AboutFAQ";
import { AboutHero } from "./AboutHero";
import { AboutProcess } from "./AboutProcess";
import { AboutStory } from "./AboutStory";
import { AboutTimeline } from "./AboutTimeline";

import { buildMetadata } from "@/lib/seo";
import { getAboutContent } from "@/lib/keystatic-reader";

export async function generateMetadata(): Promise<Metadata> {
    const about = await getAboutContent();

    return buildMetadata({
        seo: about.seo,
        fallbackTitle: "About",
        fallbackDescription: about.hero.subheading,
    });
}

export default async function AboutPage() {
    const about = await getAboutContent();

    return (
        <main>
            <AboutHero {...about.hero} />
            <AboutStory {...about.story} />
            <AboutTimeline {...about.timeline} />
            <AboutProcess {...about.process} />
            <AboutFAQ {...about.faq} />
        </main>
    );
}

