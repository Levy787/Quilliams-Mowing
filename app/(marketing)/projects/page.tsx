"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Project = {
    slug: string;
    title: string;
    locationLabel?: string;
    summary: string;
    tags: string[];
    imageSrc: string;
    imageAlt: string;
    bullets: string[];
    results: string[];
    ctaText: string;
    ctaHref: string;
};

const PROJECTS: Project[] = [
    {
        slug: "front-garden-refresh",
        title: "Front garden refresh",
        locationLabel: "Residential",
        summary:
            "A clean reset with sharper edges, tidier structure, and a finish that stays presentable.",
        tags: ["Edges", "Tidy up", "Structure"],
        imageSrc: "/images/IMG_20250708_16272.webp",
        imageAlt: "Front garden with neat lawn edges and trimmed hedges",
        bullets: [
            "Reset beds and borders for a cleaner outline",
            "Tidy structure and shape for a sharper look",
            "Clean edges to make the space feel finished",
            "Leave a tidy, presentable finish",
        ],
        results: [
            "Sharper lines that lift the whole frontage",
            "More ‘finished’ look from the street",
            "Easier ongoing upkeep",
        ],
        ctaText: "Get a Quote",
        ctaHref: "/quote",
    },
    {
        slug: "fresh-cut-clean-lines",
        title: "Fresh cut + clean lines",
        locationLabel: "Residential",
        summary:
            "A tidy finish with crisp edges that makes the whole garden feel cared for.",
        tags: ["Lawn care", "Edges", "Tidy finish"],
        imageSrc: "/images/IMG_20250708_11200.webp",
        imageAlt: "Garden with freshly cut hedges and a tidy lawn",
        bullets: [
            "Consistent cut for a neat overall look",
            "Clean edges and corners",
            "Light tidy to finish properly",
        ],
        results: [
            "Instantly neater feel",
            "Crisp edges that look intentional",
            "A lawn that feels easier to maintain",
        ],
        ctaText: "Get a Quote",
        ctaHref: "/quote",
    },
    {
        slug: "low-maintenance-upgrade",
        title: "Low-maintenance upgrade",
        locationLabel: "Residential",
        summary:
            "Small improvements designed to look great without demanding constant upkeep.",
        tags: ["Planting", "Beds", "Low maintenance"],
        imageSrc: "/images/IMG_20250704_93515.webp",
        imageAlt:
            "Garden lawn with tidy borders and freshly maintained planting areas",
        bullets: [
            "Tidy and refresh borders to clean up the overall look",
            "Make practical improvements for long-term manageability",
            "Leave a polished finish that holds up",
        ],
        results: [
            "A more intentional layout",
            "Cleaner beds and borders",
            "Simpler ongoing maintenance",
        ],
        ctaText: "Get a Quote",
        ctaHref: "/quote",
    },
    {
        slug: "consistent-tidy-look",
        title: "Consistent tidy look",
        locationLabel: "Residential",
        summary:
            "Regular care that keeps growth even and the garden looking sharp week after week.",
        tags: ["Maintenance", "Consistency", "Tidy"],
        imageSrc: "/images/IMG_20250715_29185.webp",
        imageAlt: "Well-kept garden lawn with trimmed hedges and clean edges",
        bullets: [
            "Maintain a steady rhythm of upkeep",
            "Keep edges crisp and borders tidy",
            "Communicate clearly around weather and timing",
        ],
        results: [
            "More consistent presentation",
            "Less catch-up work",
            "A garden that feels calmer",
        ],
        ctaText: "Get a Quote",
        ctaHref: "/quote",
    },
    {
        slug: "back-garden-tidy-reshape",
        title: "Back garden tidy and reshape",
        locationLabel: "Residential",
        summary:
            "A more finished feel with clean lines, cleared areas, and structure that’s easier to maintain.",
        tags: ["Tidy up", "Reshape", "Finish"],
        imageSrc: "/images/IMG_20240509_41792.webp",
        imageAlt: "Well-kept back garden with trimmed hedges and a neat lawn",
        bullets: [
            "Clear and tidy overgrown areas",
            "Reshape edges for a more deliberate look",
            "Reset structure so the space feels finished",
        ],
        results: [
            "A cleaner, more usable space",
            "Sharper structure and shape",
            "Easier maintenance going forward",
        ],
        ctaText: "Get a Quote",
        ctaHref: "/quote",
    },
    {
        slug: "finished-look-refresh",
        title: "Finished-look refresh",
        locationLabel: "Residential",
        summary:
            "A tidy refresh that makes the garden feel more intentional from every angle.",
        tags: ["Refresh", "Detail", "Tidy finish"],
        imageSrc: "/images/IMG_20250708_34242.webp",
        imageAlt: "Freshly maintained garden with trimmed hedges and neat lawn",
        bullets: [
            "Neaten structure and borders",
            "Clean up details to sharpen the look",
            "Finish with a tidy, presentable result",
        ],
        results: [
            "A more polished feel",
            "Cleaner lines and edges",
            "Better overall presentation",
        ],
        ctaText: "Get a Quote",
        ctaHref: "/quote",
    },
];

export default function ProjectsPage() {
    const shouldReduceMotion = !!useReducedMotion();
    const EASE_OUT = [0.16, 1, 0.3, 1] as const;

    const fadeUp = shouldReduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 12 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.25 },
            transition: { duration: 0.6, ease: EASE_OUT },
        };

    const featured = PROJECTS.slice(0, 3);

    return (
        <main>
            {/* Hero */}
            <section className="mx-4 md:mx-8 lg:mx-16 pt-12 md:pt-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl bg-foreground text-background">
                        <div className="absolute inset-0 bg-[url('/patterns/pattern-1.png')] bg-repeat opacity-10" />
                        <div className="relative p-6 md:p-10">
                            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
                                <motion.div {...fadeUp} className="min-w-0">
                                    <div className="inline-flex items-center rounded-full bg-background/10 px-4 py-1.5 text-sm text-background">
                                        Projects
                                    </div>

                                    <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
                                        A mini showcase of recent work
                                    </h1>

                                    <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-background/75">
                                        Real gardens, real results—tidier structure, cleaner lines, and a finish that feels properly looked after.
                                    </p>

                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <Button asChild size="lg">
                                            <Link href="/quote">Get a Quote</Link>
                                        </Button>
                                        <Button asChild size="lg" variant="outline">
                                            <Link href="/contact">Contact Us</Link>
                                        </Button>
                                    </div>

                                    <div className="mt-7 flex flex-wrap gap-3 text-sm">
                                        {["Clean lines", "Tidy finish", "Practical work", "Clear communication"].map(
                                            (chip) => (
                                                <div
                                                    key={chip}
                                                    className="inline-flex items-center rounded-full bg-background/10 px-3 py-1 text-background/80"
                                                >
                                                    {chip}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </motion.div>

                                <motion.div
                                    {...(shouldReduceMotion
                                        ? {}
                                        : {
                                            initial: { opacity: 0, y: 12 },
                                            whileInView: { opacity: 1, y: 0 },
                                            viewport: { once: true, amount: 0.25 },
                                            transition: {
                                                duration: 0.65,
                                                ease: EASE_OUT,
                                                delay: 0.05,
                                            },
                                        })}
                                >
                                    <Card className="rounded-4xl overflow-hidden border-border/20 bg-background/5 text-background shadow-none p-0 py-0 gap-0">
                                        <div className="relative aspect-16/11 w-full">
                                            <div className="absolute inset-0 bg-[url('/patterns/pattern-2.svg')] bg-repeat opacity-15" />
                                            <Image
                                                src="/images/IMG_20250708_11200.webp"
                                                alt="Freshly maintained garden with tidy hedges and a neat lawn"
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1024px) 50vw, 100vw"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <div className="max-w-md text-sm leading-relaxed text-background/80">
                                                    Browse featured projects, then jump into the details.
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured showcase */}
            <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <motion.div {...fadeUp} className="max-w-2xl">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            Featured
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Click a project to jump straight in
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            A quick visual skim—then tap through to see what was done and the result.
                        </p>
                    </motion.div>

                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* Big tile */}
                        <Link
                            href={`#${featured[0].slug}`}
                            className="lg:col-span-7"
                        >
                            <Card className="group relative overflow-hidden rounded-4xl border-border shadow-none">
                                <div className="relative aspect-16/10 w-full">
                                    <Image
                                        src={featured[0].imageSrc}
                                        alt={featured[0].imageAlt}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 58vw, 100vw"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="text-xl md:text-2xl font-semibold text-background">
                                            {featured[0].title}
                                        </div>
                                        <div className="mt-2 max-w-xl text-sm leading-relaxed text-background/80">
                                            {featured[0].summary}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>

                        {/* Two smaller tiles */}
                        <div className="grid grid-cols-1 gap-6 lg:col-span-5">
                            {featured.slice(1, 3).map((p) => (
                                <Link key={p.slug} href={`#${p.slug}`}>
                                    <Card className="group relative overflow-hidden rounded-4xl border-border shadow-none">
                                        <div className="relative aspect-16/11 w-full">
                                            <Image
                                                src={p.imageSrc}
                                                alt={p.imageAlt}
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1024px) 42vw, 100vw"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <div className="text-lg font-semibold text-background">
                                                    {p.title}
                                                </div>
                                                <div className="mt-2 text-sm leading-relaxed text-background/80">
                                                    {p.summary}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects index */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <motion.div {...fadeUp} className="max-w-2xl">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            All projects
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Browse and jump to details
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            Pick a project, then scroll straight to the full breakdown.
                        </p>
                    </motion.div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {PROJECTS.map((p, index) => (
                            <motion.div
                                key={p.slug}
                                {...(shouldReduceMotion
                                    ? {}
                                    : {
                                        initial: { opacity: 0, y: 12 },
                                        whileInView: { opacity: 1, y: 0 },
                                        viewport: { once: true, amount: 0.2 },
                                        transition: {
                                            duration: 0.55,
                                            ease: EASE_OUT,
                                            delay: 0.03 * index,
                                        },
                                    })}
                            >
                                <Card className="rounded-4xl border-border shadow-none overflow-hidden h-full">
                                    <div className="relative aspect-16/10 w-full">
                                        <Image
                                            src={p.imageSrc}
                                            alt={p.imageAlt}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 1024px) 33vw, 100vw"
                                        />
                                    </div>
                                    <CardContent className="px-6 py-6">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="text-lg font-semibold text-foreground">
                                                    {p.title}
                                                </div>
                                                {p.locationLabel ? (
                                                    <div className="mt-1 text-sm text-muted-foreground">
                                                        {p.locationLabel}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                            {p.summary}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {p.tags.map((t) => (
                                                <div
                                                    key={t}
                                                    className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                                                >
                                                    {t}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-5">
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="w-full"
                                            >
                                                <Link href={`#${p.slug}`}>View project</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project detail sections */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <motion.div {...fadeUp} className="max-w-2xl">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            Details
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            The breakdown
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            What we did, what changed, and why it works.
                        </p>
                    </motion.div>

                    <div className="mt-10 space-y-10">
                        {PROJECTS.map((p, index) => {
                            const isReversed = index % 2 === 1;
                            return (
                                <div
                                    key={p.slug}
                                    id={p.slug}
                                    className="scroll-mt-24"
                                >
                                    <Card className="rounded-4xl border-border shadow-none overflow-hidden">
                                        <div
                                            className={`grid grid-cols-1 gap-0 lg:grid-cols-2 ${isReversed ? "lg:[&>div:first-child]:order-2" : ""
                                                }`}
                                        >
                                            <div className="relative aspect-16/11 w-full">
                                                <Image
                                                    src={p.imageSrc}
                                                    alt={p.imageAlt}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-foreground/50 via-transparent to-transparent" />
                                            </div>
                                            <CardContent className="px-6 py-8 md:px-8 md:py-10">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                                                        Project
                                                    </div>
                                                    {p.locationLabel ? (
                                                        <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                                                            {p.locationLabel}
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                                                    {p.title}
                                                </div>
                                                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                                                    {p.summary}
                                                </p>

                                                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <div>
                                                        <div className="text-sm font-semibold text-foreground">
                                                            What we did
                                                        </div>
                                                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                                            {p.bullets.map((b) => (
                                                                <li
                                                                    key={b}
                                                                    className="flex gap-2"
                                                                >
                                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                                    {b}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-foreground">
                                                            Result
                                                        </div>
                                                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                                            {p.results.map((r) => (
                                                                <li
                                                                    key={r}
                                                                    className="flex gap-2"
                                                                >
                                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                                    {r}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                                    <Button asChild size="lg">
                                                        <Link href={p.ctaHref}>
                                                            {p.ctaText}
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        asChild
                                                        size="lg"
                                                        variant="outline"
                                                    >
                                                        <Link href="/contact">
                                                            Contact Us
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl bg-foreground text-background">
                        <div className="absolute inset-0 bg-[url('/patterns/pattern-1.png')] bg-repeat opacity-10" />
                        <div className="relative p-6 md:p-10">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div className="min-w-0">
                                    <div className="text-2xl md:text-3xl font-semibold">
                                        Have a garden that needs a refresh?
                                    </div>
                                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-background/75">
                                        Tell us what you want improved and we’ll recommend a practical plan—then quote it clearly.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button asChild size="lg">
                                        <Link href="/quote">Get a Quote</Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
