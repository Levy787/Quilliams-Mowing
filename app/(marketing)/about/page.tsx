

import { AboutFAQ } from "./AboutFAQ";
import { AboutHero } from "./AboutHero";
import { AboutProcess } from "./AboutProcess";
import { AboutStory } from "./AboutStory";
import { AboutTimeline } from "./AboutTimeline";

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

