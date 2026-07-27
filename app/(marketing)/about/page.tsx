import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AboutFAQ } from "./AboutFAQ";
import { AboutHero } from "./AboutHero";
import { AboutProcess } from "./AboutProcess";
import { AboutStory } from "./AboutStory";
import { AboutTimeline } from "./AboutTimeline";

import { buildMetadata } from "@/lib/seo";
import { getAboutContent } from "@/lib/keystatic-reader";
import {
    GOOGLE_REVIEW_COUNT,
    GOOGLE_REVIEW_RATING,
} from "@/lib/google-reviews";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export async function generateMetadata(): Promise<Metadata> {
    const about = await getAboutContent();

    return buildMetadata({
        seo: about.seo,
        fallbackTitle: "About",
        fallbackDescription: about.hero.subheading,
        canonicalPath: "/about",
    });
}

export default async function AboutPage() {
    const about = await getAboutContent();

    return (
        <main>
            <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
            <AboutHero {...about.hero} />
            <AboutStory {...about.story} />
            <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-muted">
                            <Image
                                src="/images/uploads/faq/levi-headshot-v2.jpg"
                                alt="Levi Quilliam, founder and lead gardener at Quilliams Gardening and Landscaping"
                                fill
                                sizes="(min-width: 1024px) 36vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                                Credentials
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                Properly set up, insured, and easy to check
                            </h2>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                                I keep the practical details visible because they matter when you are inviting someone to work at your home, holiday let, or business. Quilliams Mowing Ltd is registered, public liability insured, and backed by visible local review profiles.
                            </p>
                            <ul className="mt-6 grid gap-3 text-sm text-foreground sm:grid-cols-2">
                                <li className="rounded-lg border p-4">Public liability insured</li>
                                <li className="rounded-lg border p-4">Environment Agency registered waste carrier (lower tier), CBDL582202</li>
                                <li className="rounded-lg border p-4">Companies House company number 16405915</li>
                                <li className="rounded-lg border p-4">
                                    {GOOGLE_REVIEW_RATING.toFixed(1)} rating from{" "}
                                    {GOOGLE_REVIEW_COUNT} Google reviews
                                </li>
                            </ul>
                            <div className="mt-6 flex flex-wrap gap-3 text-sm">
                                <a href="https://g.page/r/Ca1e8ukWV-qsEBM/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                                    Google reviews
                                </a>
                                <a href="https://www.checkatrade.com/trades/quilliamsmowingltd" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                                    Checkatrade
                                </a>
                                <a href="https://www.yell.com/biz/quilliams-mowing-ltd-newquay-10969895/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                                    Yell
                                </a>
                                <a href="https://www.bark.com/en/gb/b/quilliams-gardening-amp-landscaping/KNoMX4/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                                    Bark
                                </a>
                                <Link href="/contact" className="text-primary underline underline-offset-4">
                                    Contact Levi
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <AboutTimeline {...about.timeline} />
            <AboutProcess {...about.process} />
            <AboutFAQ {...about.faq} />
        </main>
    );
}
