"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    CalendarDays,
    CloudRain,
    Leaf,
    Ruler,
    Sprout,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type IncludedItem = {
    title: string;
    description: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const INCLUDED: IncludedItem[] = [
    {
        title: "Regular mowing",
        description: "A consistent cut that keeps things looking sharp.",
        Icon: Leaf,
    },
    {
        title: "Edging & strimming",
        description: "Clean borders and corners for a finished look.",
        Icon: Ruler,
    },
    {
        title: "Light tidy as needed",
        description: "Quick touch-ups that keep the area presentable.",
        Icon: Sprout,
    },
    {
        title: "Seasonal lawn feed (optional)",
        description: "Simple recommendations to support healthy growth.",
        Icon: Sprout,
    },
    {
        title: "Moss / thatch advice",
        description: "Practical guidance for problem areas and patchy spots.",
        Icon: Leaf,
    },
    {
        title: "Green waste removal (optional)",
        description: "Clippings can be collected and taken away if needed.",
        Icon: Trash2,
    },
];

type PlanCard = {
    title: string;
    description: string;
    bullets: string[];
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const PLANS: PlanCard[] = [
    {
        title: "Weekly maintenance",
        description: "For lawns that need consistent care and a tidy look all the time.",
        bullets: ["Mowing", "Edges and quick tidy"],
        Icon: CalendarDays,
    },
    {
        title: "Fortnightly maintenance",
        description: "A reliable schedule that keeps things under control without overdoing it.",
        bullets: ["Mowing", "Edges and strimming"],
        Icon: CalendarDays,
    },
    {
        title: "One-off tidy & reset",
        description: "Perfect before guests, photos, or when the lawn has gotten away from you.",
        bullets: ["Cut back to neat", "Clean lines and finish"],
        Icon: Ruler,
    },
    {
        title: "Seasonal refresh",
        description: "A tidy-up to set the lawn up for the season ahead.",
        bullets: ["General tidy", "Practical advice for next steps"],
        Icon: Leaf,
    },
];

type ResultPreview = {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
};

const RESULTS: ResultPreview[] = [
    {
        title: "Fresh cut + clean lines",
        description: "A neat finish with crisp edges that makes the lawn feel cared for.",
        imageSrc: "/images/IMG_20250708_11200.webp",
        imageAlt: "Garden with freshly cut hedges and a tidy, freshly mown lawn",
    },
    {
        title: "Consistent tidy look",
        description: "Regular care that keeps growth even and the garden looking sharp.",
        imageSrc: "/images/IMG_20250715_29185.webp",
        imageAlt: "Well-kept garden lawn with trimmed hedges and clean edges",
    },
    {
        title: "Tidy up before the season",
        description: "A reset that makes the whole space easier to maintain.",
        imageSrc: "/images/IMG_20250708_16272.webp",
        imageAlt: "Neat lawn with freshly trimmed hedges after garden maintenance",
    },
];

export default function LawnCareServicePage() {
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
                                        Lawn Care
                                    </div>

                                    <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
                                        Lawn care that stays consistently tidy
                                    </h1>

                                    <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-background/75">
                                        Reliable visits, clean edges, and a tidy finish—so your lawn looks good week after week.
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
                                        {[
                                            "Reliable schedule",
                                            "Clean edges",
                                            "Tidy finish",
                                        ].map((chip) => (
                                            <div
                                                key={chip}
                                                className="inline-flex items-center rounded-full bg-background/10 px-3 py-1 text-background/80"
                                            >
                                                {chip}
                                            </div>
                                        ))}
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
                                                src="/images/IMG_20250704_93515.webp"
                                                alt="Freshly mown lawn with trimmed hedges in a private garden"
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1024px) 50vw, 100vw"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <div className="max-w-md text-sm leading-relaxed text-background/80">
                                                    Clean lines, consistent care, and a tidy finish.
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

            {/* What's included */}
            <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <motion.div {...fadeUp} className="max-w-2xl">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            What’s included
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            The basics, done properly
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            We keep it simple: consistent cutting, tidy edges, and a clean finish—plus practical advice when you need it.
                        </p>
                    </motion.div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {INCLUDED.map((item) => (
                            <Card
                                key={item.title}
                                className="rounded-3xl border-border shadow-none"
                            >
                                <CardContent className="px-6 py-6">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-0.5 rounded-xl bg-muted p-3">
                                            <item.Icon
                                                className="h-6 w-6 text-primary"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-base font-semibold text-foreground">
                                                {item.title}
                                            </div>
                                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Schedule / plans */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl border border-border bg-background">
                        <div className="absolute inset-0 bg-[url('/patterns/pattern-2.svg')] bg-repeat opacity-10" />
                        <div className="relative p-6 md:p-10">
                            <motion.div {...fadeUp} className="max-w-2xl">
                                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                    Your lawn, your schedule
                                </div>
                                <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                    Choose a rhythm that suits your garden
                                </h2>
                                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                    Weekly, fortnightly, or a one-off reset—whatever keeps your lawn looking the way you want.
                                </p>
                            </motion.div>

                            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {PLANS.map((plan) => (
                                    <Card
                                        key={plan.title}
                                        className="rounded-3xl border-border shadow-none"
                                    >
                                        <CardContent className="px-6 py-6">
                                            <div className="flex items-start gap-4">
                                                <div className="mt-0.5 rounded-xl bg-muted p-3">
                                                    <plan.Icon
                                                        className="h-6 w-6 text-primary"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-base font-semibold text-foreground">
                                                        {plan.title}
                                                    </div>
                                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                        {plan.description}
                                                    </p>
                                                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                                        {plan.bullets.map((b) => (
                                                            <li key={b} className="flex gap-2">
                                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                                {b}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button asChild size="lg">
                                    <Link href="/quote">Request a schedule</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/contact">Ask a question</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent results */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <motion.div {...fadeUp} className="max-w-2xl">
                            <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                Recent results
                            </div>
                            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                A tidy lawn makes the whole garden feel better
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                A clean cut and crisp edges can completely change how a space feels—especially when it stays consistent.
                            </p>
                        </motion.div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button asChild variant="outline">
                                <Link href="/">See more work</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/quote">
                                    Get a Quote
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {RESULTS.map((result, index) => (
                            <motion.div
                                key={result.title}
                                {...(shouldReduceMotion
                                    ? {}
                                    : {
                                        initial: { opacity: 0, y: 12 },
                                        whileInView: { opacity: 1, y: 0 },
                                        viewport: { once: true, amount: 0.2 },
                                        transition: {
                                            duration: 0.55,
                                            ease: EASE_OUT,
                                            delay: 0.05 * index,
                                        },
                                    })}
                            >
                                <Card className="rounded-4xl border-border shadow-none overflow-hidden h-full">
                                    <div className="relative aspect-16/10 w-full">
                                        <Image
                                            src={result.imageSrc}
                                            alt={result.imageAlt}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 1024px) 33vw, 100vw"
                                        />
                                    </div>
                                    <CardContent className="px-6 py-6">
                                        <div className="text-lg font-semibold text-foreground">
                                            {result.title}
                                        </div>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {result.description}
                                        </p>
                                        <div className="mt-5">
                                            <Button asChild variant="outline" className="w-full">
                                                <Link href="/#recent-works">View more details</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Primary value band */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl border border-border bg-primary text-primary-foreground">
                        <div className="absolute inset-0 bg-[url('/patterns/pattern-2.svg')] bg-repeat opacity-15" />
                        <div className="relative p-6 md:p-10">
                            <motion.div {...fadeUp} className="max-w-2xl">
                                <div className="inline-flex items-center rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground">
                                    Value
                                </div>
                                <div className="mt-5 text-3xl md:text-4xl font-bold tracking-tight">
                                    A lawn that looks good week after week
                                </div>
                                <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
                                    Consistency is what makes it feel effortless—regular visits, tidy edges, and clear communication.
                                </p>
                            </motion.div>

                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {[
                                    {
                                        title: "Consistent visits",
                                        description: "A reliable schedule that keeps growth under control.",
                                        Icon: CalendarDays,
                                    },
                                    {
                                        title: "Clean edges",
                                        description: "Crisp borders that make the lawn look finished.",
                                        Icon: Ruler,
                                    },
                                    {
                                        title: "Weather-aware",
                                        description: "If rain shifts timing, we’ll communicate clearly.",
                                        Icon: CloudRain,
                                    },
                                ].map((b) => (
                                    <div
                                        key={b.title}
                                        className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-5"
                                    >
                                        <b.Icon
                                            className="h-6 w-6 text-primary-foreground"
                                            aria-hidden="true"
                                        />
                                        <div className="mt-3 font-semibold">
                                            {b.title}
                                        </div>
                                        <div className="mt-1 text-sm text-primary-foreground/80">
                                            {b.description}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button asChild size="lg" variant="secondary">
                                    <Link href="/quote">Request a Quote</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mini FAQ */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <motion.div {...fadeUp} className="max-w-2xl">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            FAQs
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Quick answers
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            If you don’t see your question here, just get in touch.
                        </p>
                    </motion.div>

                    <Card className="mt-8 rounded-4xl border-border shadow-none">
                        <CardContent className="px-6 py-2">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="frequency">
                                    <AccordionTrigger>
                                        Do you offer weekly or fortnightly visits?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes—weekly and fortnightly are both available depending on your lawn and the time of year.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="edges">
                                    <AccordionTrigger>
                                        Do you edge and strim?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes. Keeping edges tidy is part of what makes the lawn look properly finished.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="clippings">
                                    <AccordionTrigger>
                                        Can you take away grass clippings?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes—clippings can be collected and removed. Let us know your preference when requesting a quote.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="rain">
                                    <AccordionTrigger>
                                        What happens if it rains?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        If weather affects the cut, we’ll communicate and reschedule to the next suitable time.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="one-off">
                                    <AccordionTrigger>
                                        Can you do a one-off tidy?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes—one-off cuts and tidy-ups are available, especially for a reset before regular maintenance.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="area">
                                    <AccordionTrigger>
                                        Do you cover my area?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Send your postcode and we’ll confirm availability.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
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
                                        Want a lawn that stays tidy without the hassle?
                                    </div>
                                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-background/75">
                                        Tell us what you need and we’ll recommend a schedule—then quote it clearly.
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

