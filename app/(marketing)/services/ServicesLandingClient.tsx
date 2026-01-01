"use client";

import Link from "next/link";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CalendarDays,
    ClipboardCheck,
    Droplets,
    Flower2,
    Layers,
    Lightbulb,
    MessageCircle,
    Scissors,
    Sprout,
    Trees,
    Wind,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export type ServiceCardModel = {
    slug: string;
    title: string;
    description: string;
};

type ServiceCardMeta = {
    tag?: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const DEFAULT_META: ServiceCardMeta = {
    Icon: Sprout,
};

const SERVICE_META_BY_SLUG: Record<string, ServiceCardMeta> = {
    landscaping: { tag: "Most requested", Icon: Trees },
    "lawn-care": { Icon: Sprout },
    "garden-maintenance": { tag: "Popular", Icon: Flower2 },
    "hedge-trimming": { Icon: Scissors },
    mulching: { Icon: Layers },
    "seasonal-cleanup": { tag: "Popular", Icon: Wind },
    "irrigation-drainage": { Icon: Droplets },
    planting: { Icon: Sprout },
};

export default function ServicesLandingClient({
    services,
}: {
    services: ServiceCardModel[];
}) {
    const fadeUp = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <main>
            <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-12">
                    {/* Hero */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                Services
                            </div>

                            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                                Our Services
                            </h1>

                            <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
                                From regular maintenance to full landscape improvements, we offer dependable services tailored to your property.
                            </p>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button asChild size="lg">
                                    <Link href="/quote">Get a Quote</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/contact">Ask a Question</Link>
                                </Button>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
                                <div className="inline-flex items-center rounded-full bg-muted px-3 py-1">
                                    Friendly, practical advice
                                </div>
                                <div className="inline-flex items-center rounded-full bg-muted px-3 py-1">
                                    Clear quotes
                                </div>
                                <div className="inline-flex items-center rounded-full bg-muted px-3 py-1">
                                    Clean finish
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: 0.05,
                            }}
                        >
                            <Card className="rounded-4xl border-border shadow-none overflow-hidden p-0 py-0 gap-0">
                                <div className="relative aspect-16/11 w-full">
                                    <div className="absolute inset-0 bg-[url('/patterns/pattern-2.svg')] bg-repeat opacity-20" />
                                    <Image
                                        src="https://picsum.photos/seed/quilliams-services/1600/1100"
                                        alt="A well-kept garden and outdoor space"
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-background/60 via-background/10 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="max-w-md text-sm leading-relaxed text-foreground">
                                            Practical, tidy, and reliable—work that makes your property easier to enjoy and easier to maintain.
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Process */}
                    <div className="mt-14">
                        <div className="relative overflow-hidden rounded-4xl border border-border bg-foreground text-background dark:bg-background dark:text-foreground">
                            <div className="absolute inset-0 bg-[url('/patterns/pattern-1.png')] bg-repeat opacity-5" />
                            <div className="relative p-6 md:p-10">
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="max-w-2xl"
                                >
                                    <div className="text-2xl font-semibold">
                                        How we work
                                    </div>
                                    <p className="mt-2 text-sm md:text-base leading-relaxed text-background/80 dark:text-muted-foreground">
                                        A straightforward process—clear recommendations, clear pricing, and clean results.
                                    </p>
                                </motion.div>

                                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {[
                                        {
                                            title: "Tell us what you need",
                                            description:
                                                "Share a few details (and photos if you have them) so we can understand the job.",
                                            Icon: MessageCircle,
                                        },
                                        {
                                            title: "We assess and recommend",
                                            description:
                                                "We’ll suggest the best approach for your yard, budget, and maintenance level.",
                                            Icon: Lightbulb,
                                        },
                                        {
                                            title: "We quote clearly",
                                            description:
                                                "You’ll get a clear quote so you know exactly what’s included.",
                                            Icon: ClipboardCheck,
                                        },
                                        {
                                            title: "We schedule and deliver",
                                            description:
                                                "We book a time that works and show up ready to get it done.",
                                            Icon: CalendarDays,
                                        },
                                    ].map((step, index) => (
                                        <motion.div
                                            key={step.title}
                                            variants={fadeUp}
                                            initial="hidden"
                                            whileInView="show"
                                            viewport={{ once: true, amount: 0.2 }}
                                            transition={{
                                                duration: 0.45,
                                                ease: "easeOut",
                                                delay: 0.06 * index,
                                            }}
                                        >
                                            <Card className="rounded-3xl h-full border-background/15 bg-background/5 text-background shadow-none dark:border-border dark:bg-muted dark:text-foreground">
                                                <CardContent className="px-6 py-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="mt-0.5 rounded-xl bg-background/10 p-3 dark:bg-muted">
                                                            <step.Icon
                                                                className="h-6 w-6 text-primary"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-sm font-semibold">
                                                                {step.title}
                                                            </div>
                                                            <p className="mt-2 text-sm leading-relaxed text-background/80 dark:text-muted-foreground">
                                                                {step.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Services grid */}
                    <div className="mt-14">
                        <div className="max-w-2xl">
                            <div className="text-2xl font-semibold text-foreground">
                                What we can help with
                            </div>
                            <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                Pick a service to learn more. If you’re not sure, request a quote and we’ll recommend the best next step.
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => {
                                const meta =
                                    SERVICE_META_BY_SLUG[service.slug] ??
                                    DEFAULT_META;
                                const Icon = meta.Icon;

                                return (
                                    <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        className="group focus-visible:outline-none"
                                    >
                                        <Card className="h-full rounded-3xl border-border shadow-none transition-transform group-hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-ring/50">
                                            <CardContent className="px-6 py-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-0.5 rounded-xl bg-muted p-3">
                                                        <Icon
                                                            className="h-6 w-6 text-primary"
                                                            aria-hidden="true"
                                                        />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <div className="text-lg font-semibold text-foreground">
                                                                {service.title}
                                                            </div>
                                                            {meta.tag ? (
                                                                <div className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                                                    {meta.tag}
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                            {service.description}
                                                        </p>

                                                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                                                            Learn more
                                                            <ArrowRight
                                                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="mt-14">
                        <div className="relative overflow-hidden rounded-4xl border border-border bg-primary text-primary-foreground">
                            <div className="absolute inset-0 bg-[url('/patterns/pattern-2.svg')] bg-repeat opacity-100" />
                            <div className="relative p-6 md:p-10">
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="max-w-2xl"
                                >
                                    <div className="text-2xl font-semibold">
                                        Service highlights
                                    </div>
                                    <p className="mt-2 text-sm md:text-base leading-relaxed text-primary-foreground/80">
                                        Two common goals we hear: keep things consistently tidy, and make improvements that feel worth it.
                                    </p>
                                </motion.div>

                                <div className="mt-6 space-y-6">
                                    {/* Highlight 1 */}
                                    <Card className="rounded-4xl border-border shadow-none overflow-hidden">
                                        <CardContent className="px-6 py-6">
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
                                                <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl border border-border">
                                                    <Image
                                                        src="https://picsum.photos/seed/quilliams-maintenance/1400/900"
                                                        alt="A tidy garden after maintenance"
                                                        fill
                                                        className="object-cover"
                                                        sizes="(min-width: 768px) 50vw, 100vw"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="text-xl md:text-2xl font-semibold text-foreground">
                                                        Maintenance that stays consistent
                                                    </div>
                                                    <ul className="mt-4 space-y-2 text-sm md:text-base text-muted-foreground">
                                                        <li className="flex gap-2">
                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                            Reliable regular visits so your yard doesn’t get away from you.
                                                        </li>
                                                        <li className="flex gap-2">
                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                            Clean edges, tidy beds, and seasonal refreshes when needed.
                                                        </li>
                                                        <li className="flex gap-2">
                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                            Clear communication on what we’ll do each visit.
                                                        </li>
                                                    </ul>

                                                    <div className="mt-6">
                                                        <Button asChild>
                                                            <Link href="/quote">Get a Quote</Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Highlight 2 */}
                                    <Card className="rounded-4xl border-border shadow-none overflow-hidden">
                                        <CardContent className="px-6 py-6">
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
                                                <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl border border-border md:order-2">
                                                    <Image
                                                        src="https://picsum.photos/seed/quilliams-improvements/1400/900"
                                                        alt="A landscaped outdoor space"
                                                        fill
                                                        className="object-cover"
                                                        sizes="(min-width: 768px) 50vw, 100vw"
                                                    />
                                                </div>

                                                <div className="min-w-0 md:order-1">
                                                    <div className="text-xl md:text-2xl font-semibold text-foreground">
                                                        Improvements that add real value
                                                    </div>
                                                    <ul className="mt-4 space-y-2 text-sm md:text-base text-muted-foreground">
                                                        <li className="flex gap-2">
                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                            Smarter planting and layout for easier long-term upkeep.
                                                        </li>
                                                        <li className="flex gap-2">
                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                            Mulch, edging, and tidy finishes that make a big difference.
                                                        </li>
                                                        <li className="flex gap-2">
                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                            Practical recommendations that fit your budget and timeline.
                                                        </li>
                                                    </ul>

                                                    <div className="mt-6">
                                                        <Button asChild variant="outline">
                                                            <Link href="/quote">Get a Quote</Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-14">
                        <div className="max-w-2xl">
                            <div className="text-2xl font-semibold text-foreground">
                                FAQs
                            </div>
                            <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                Quick answers to the most common questions we hear.
                            </p>
                        </div>

                        <Card className="mt-6 rounded-4xl border-border shadow-none">
                            <CardContent className="px-6 py-2">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    <AccordionItem value="maintenance">
                                        <AccordionTrigger>
                                            Do you offer ongoing maintenance?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            Yes. We can schedule regular visits (weekly, fortnightly, or as needed) to keep your yard consistently tidy.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="photos">
                                        <AccordionTrigger>
                                            Can I get a quote from photos?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            Often, yes. If the job is straightforward, photos and a quick description can be enough to provide a quote or a good estimate.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="waste">
                                        <AccordionTrigger>
                                            Do you remove green waste?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            Yes—green waste removal can be included. Let us know what you’d like cleared and we’ll include it in the quote.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="timing">
                                        <AccordionTrigger>
                                            How soon can you start?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            It depends on the season and the scope of work. Once we know what you need, we’ll confirm the next available times.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="pricing">
                                        <AccordionTrigger>
                                            Do you provide fixed quotes?
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            Yes. For most jobs we provide a clear quote outlining what’s included. If anything changes, we’ll discuss it before proceeding.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="mt-14">
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6 py-6">
                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                    <div className="min-w-0">
                                        <div className="text-2xl font-semibold text-foreground">
                                            Not sure what you need?
                                        </div>
                                        <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl">
                                            Tell us a bit about your yard and we’ll recommend the best next step.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <Button asChild size="lg">
                                            <Link href="/quote">Get a Quote</Link>
                                        </Button>
                                        <Button
                                            asChild
                                            size="lg"
                                            variant="outline"
                                        >
                                            <Link href="/contact">Contact Us</Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
