import type { Metadata } from "next";

import { AboutFAQ } from "./AboutFAQ";
import { AboutHero } from "./AboutHero";
import { AboutProcess } from "./AboutProcess";
import { AboutStory } from "./AboutStory";
import { AboutTimeline } from "./AboutTimeline";

import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    return buildMetadata({
        fallbackTitle: "About",
        fallbackDescription:
            "A hands-on gardener who cares about the finish. I keep things simple: show up on time, do the work properly, and leave your outdoor space looking sharper than when I arrived.",
    });
}

export default function AboutPage() {
    return (
        <main>
            <AboutHero />
            <AboutStory />
            <AboutTimeline />
            <AboutProcess />
            <AboutFAQ />
        </main>
    );
}

