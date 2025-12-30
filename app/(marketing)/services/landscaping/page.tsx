"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    Brush,
    Flower2,
    Layers,
    Leaf,
    Ruler,
    Shovel,
    Sparkles,
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
        title: "Bed shaping & edging",
        description: "Clean lines that make the whole garden feel intentional.",
        Icon: Ruler,
    },
    {
        title: "Planting & replanting",
        description: "Practical plant choices to match your space and upkeep.",
        Icon: Flower2,
    },
    {
        title: "Mulching & soil improvement",
        description: "Better soil, better growth, and a more polished finish.",
        Icon: Layers,
    },
    {
        title: "Lawn prep & turfing",
        description: "Level, fresh, and ready for the season ahead.",
        Icon: Leaf,
    },
    {
        title: "Hedge shaping & structure tidy-up",
        description: "A crisp shape that keeps things looking neat.",
        Icon: Brush,
    },
    {
        title: "Seasonal refresh & waste removal",
        description: "Green waste cleared and the space reset properly.",
        Icon: Trash2,
    },
];

type ProjectPreview = {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
};

const PROJECTS: ProjectPreview[] = [
    {
        title: "Front garden refresh",
        description:
            "A clean reset with sharper edges, fresh mulch, and structure that stays tidy.",
        imageSrc: "/images/IMG_20250708_16272.webp",
        imageAlt: "Front garden with freshly trimmed hedges and neat lawn edges",
    },
    {
        title: "Low-maintenance planting upgrade",
        description:
            "Practical planting choices that look great and don’t demand constant upkeep.",
        imageSrc: "/images/IMG_20250704_93515.webp",
        imageAlt: "Garden lawn with fresh cut hedges and a tidy planted border",
    },
    {
        title: "Back garden tidy and reshape",
        description:
            "A more finished feel with clean lines, cleared areas, and a consistent look.",
        imageSrc: "/images/IMG_20240509_41792.webp",
        imageAlt: "Well-kept back garden with trimmed hedges and a neat lawn",
    },
];

export default function LandscapingServicePage() {
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
                                        Landscaping
                                    </div>

                                    <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
                                        Landscaping that makes your garden feel finished
                                    </h1>

                                    <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-background/75">
                                        Clean lines, practical planting, and tidy finishes—delivered with clear quotes and a straightforward process.
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
                                            "Clear quotes",
                                            "Tidy finish",
                                            "Practical advice",
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
                                                src="/images/IMG_20250708_34242.webp"
                                                alt="Freshly maintained garden with trimmed hedges and a neat lawn"
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1024px) 50vw, 100vw"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <div className="max-w-md text-sm leading-relaxed text-background/80">
                                                    A sharp, finished look—without the hassle.
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
                            The details that make it feel done properly
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            Landscaping doesn’t have to mean a massive project. We focus on improvements that are practical, tidy, and worth the spend.
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

            {/* Recent projects */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <motion.div {...fadeUp} className="max-w-2xl">
                            <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                Recent landscaping projects
                            </div>
                            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                A few results we’re proud of
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                Small changes add up—clean edges, better structure, and a finish that looks good from every angle.
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
                        {PROJECTS.map((project, index) => (
                            <motion.div
                                key={project.title}
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
                                            src={project.imageSrc}
                                            alt={project.imageAlt}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 1024px) 33vw, 100vw"
                                        />
                                    </div>
                                    <CardContent className="px-6 py-6">
                                        <div className="text-lg font-semibold text-foreground">
                                            {project.title}
                                        </div>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {project.description}
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

                    <div className="mt-6 text-sm text-muted-foreground">
                        Looking for more examples? Browse our recent work on the home page.
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
                                    Improvements that add real value
                                </div>
                                <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
                                    We focus on changes that feel worth it—visually, practically, and long-term.
                                </p>
                            </motion.div>

                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {[
                                    {
                                        title: "Looks finished",
                                        description: "Tidy lines and clean structure you notice immediately.",
                                        Icon: Sparkles,
                                    },
                                    {
                                        title: "Easier upkeep",
                                        description: "Smarter planting and layout so it stays manageable.",
                                        Icon: Leaf,
                                    },
                                    {
                                        title: "Done properly",
                                        description: "Clear plan, clear quote, and a clean finish.",
                                        Icon: Shovel,
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
                                    <Link href="/contact">Ask a Question</Link>
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
                                <AccordionItem value="ideas">
                                    <AccordionTrigger>
                                        Do you help with design ideas?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes. We can recommend simple layout and planting improvements that fit your space and the amount of upkeep you want.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="existing">
                                    <AccordionTrigger>
                                        Can you work with what I already have?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Absolutely. If something can be kept or improved, we’ll tell you—no unnecessary rip-out.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="duration">
                                    <AccordionTrigger>
                                        How long does a landscaping job take?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        It depends on the scope. Some refreshes take a day; bigger improvements can take longer. We’ll confirm timing with your quote.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="waste">
                                    <AccordionTrigger>
                                        Do you remove waste?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes—green waste removal can be included. Just let us know what you want cleared and we’ll include it in pricing.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="low-maintenance">
                                    <AccordionTrigger>
                                        Can you recommend low-maintenance plants?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes. We’ll suggest options that suit your garden and how much time you want to spend maintaining it.
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
                                        Ready to tidy up the layout and make it feel finished?
                                    </div>
                                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-background/75">
                                        Tell us what you’d like to improve and we’ll recommend a practical plan—then quote it clearly.
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

