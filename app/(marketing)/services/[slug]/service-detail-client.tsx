"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    Brush,
    CalendarDays,
    CloudRain,
    Flower2,
    Layers,
    Leaf,
    Ruler,
    Shovel,
    Sparkles,
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
import type {
    IconName,
    PatternName,
    Service,
} from "@/lib/services";

const ICON_MAP: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    Leaf,
    Ruler,
    Sprout,
    Trash2,
    CalendarDays,
    CloudRain,
    Brush,
    Flower2,
    Layers,
    Shovel,
    Sparkles,
};

function patternUrl(pattern: PatternName): string {
    return pattern === "pattern-1"
        ? "url('/patterns/pattern-1.png')"
        : "url('/patterns/pattern-2.svg')";
}

export default function ServiceDetailClient({ service }: { service: Service }) {
    const shouldReduceMotion = !!useReducedMotion();
    const EASE_OUT = [0.16, 1, 0.3, 1] as const;

    const hasHeroImage = Boolean(service.hero.imageSrc?.trim());

    const fadeUp = shouldReduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 12 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.25 },
            transition: { duration: 0.6, ease: EASE_OUT },
        };

    const HeroPattern = patternUrl(service.hero.pattern);

    return (
        <main>
            {/* Hero */}
            <section className="mx-4 md:mx-8 lg:mx-16 pt-12 md:pt-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl bg-foreground text-background">
                        <div
                            className="absolute inset-0 bg-repeat opacity-10"
                            style={{ backgroundImage: HeroPattern }}
                        />
                        <div className="relative p-6 md:p-10">
                            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
                                <motion.div {...fadeUp} className="min-w-0">
                                    <div className="inline-flex items-center rounded-full bg-background/10 px-4 py-1.5 text-sm text-background">
                                        {service.label}
                                    </div>

                                    <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
                                        {service.title}
                                    </h1>

                                    <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-background/75">
                                        {service.description}
                                    </p>

                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <Button asChild size="lg">
                                            <Link href={service.ctas.primaryHref}>
                                                {service.ctas.primaryText}
                                            </Link>
                                        </Button>
                                        <Button asChild size="lg" variant="outline">
                                            <Link href={service.ctas.secondaryHref}>
                                                {service.ctas.secondaryText}
                                            </Link>
                                        </Button>
                                    </div>

                                    <div className="mt-7 flex flex-wrap gap-3 text-sm">
                                        {service.trustChips.map((chip) => (
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
                                            {hasHeroImage ? (
                                                <Image
                                                    src={service.hero.imageSrc}
                                                    alt={service.hero.imageAlt}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                                    priority
                                                />
                                            ) : null}
                                            <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
                                            {service.hero.caption ? (
                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <div className="max-w-md text-sm leading-relaxed text-background/80">
                                                        {service.hero.caption}
                                                    </div>
                                                </div>
                                            ) : null}
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
                            {service.included.label}
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            {service.included.title}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            {service.included.description}
                        </p>
                    </motion.div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {service.included.items.map((item) => {
                            const Icon = ICON_MAP[item.icon];
                            return (
                                <Card
                                    key={item.title}
                                    className="rounded-3xl border-border shadow-none"
                                >
                                    <CardContent className="px-6 py-6">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-0.5 rounded-xl bg-muted p-3">
                                                <Icon
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
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Plans (optional) */}
            {service.plans ? (
                <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                    <div className="container mx-auto px-4 lg:px-12">
                        <div className="relative overflow-hidden rounded-4xl border border-border bg-background">
                            <div className="absolute inset-0 bg-[url('/patterns/pattern-2.svg')] bg-repeat opacity-10" />
                            <div className="relative p-6 md:p-10">
                                <motion.div {...fadeUp} className="max-w-2xl">
                                    <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                        {service.plans.label}
                                    </div>
                                    <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                        {service.plans.title}
                                    </h2>
                                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                        {service.plans.description}
                                    </p>
                                </motion.div>

                                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {service.plans.cards.map((plan) => {
                                        const Icon = ICON_MAP[plan.icon];
                                        return (
                                            <Card
                                                key={plan.title}
                                                className="rounded-3xl border-border shadow-none"
                                            >
                                                <CardContent className="px-6 py-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="mt-0.5 rounded-xl bg-muted p-3">
                                                            <Icon
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
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button asChild size="lg">
                                        <Link href={service.plans.ctas.primaryHref}>
                                            {service.plans.ctas.primaryText}
                                        </Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <Link href={service.plans.ctas.secondaryHref}>
                                            {service.plans.ctas.secondaryText}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Recent results/projects */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <motion.div {...fadeUp} className="max-w-2xl">
                            <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                {service.results.label}
                            </div>
                            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                {service.results.title}
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                {service.results.description}
                            </p>
                        </motion.div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button asChild variant="outline">
                                <Link href={service.results.headerCtas.secondaryHref}>
                                    {service.results.headerCtas.secondaryText}
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={service.results.headerCtas.primaryHref}>
                                    {service.results.headerCtas.primaryText}
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {service.results.cards.map((result, index) => (
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
                                        {result.imageSrc?.trim() ? (
                                            <Image
                                                src={result.imageSrc}
                                                alt={result.imageAlt}
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1024px) 33vw, 100vw"
                                            />
                                        ) : null}
                                    </div>
                                    <CardContent className="px-6 py-6">
                                        <div className="text-lg font-semibold text-foreground">
                                            {result.title}
                                        </div>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                            {result.description}
                                        </p>
                                        <div className="mt-5">
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="w-full"
                                            >
                                                <Link href={result.ctaHref}>
                                                    {result.ctaText}
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {service.results.footerNote ? (
                        <div className="mt-6 text-sm text-muted-foreground">
                            {service.results.footerNote}
                        </div>
                    ) : null}
                </div>
            </section>

            {/* Primary value band */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl border border-border bg-primary text-primary-foreground">
                        <div
                            className="absolute inset-0 bg-repeat opacity-15"
                            style={{ backgroundImage: patternUrl(service.valueBand.pattern) }}
                        />
                        <div className="relative p-6 md:p-10">
                            <motion.div {...fadeUp} className="max-w-2xl">
                                <div className="inline-flex items-center rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground">
                                    {service.valueBand.label}
                                </div>
                                <div className="mt-5 text-3xl md:text-4xl font-bold tracking-tight">
                                    {service.valueBand.title}
                                </div>
                                <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
                                    {service.valueBand.description}
                                </p>
                            </motion.div>

                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {service.valueBand.bullets.map((b) => {
                                    const Icon = ICON_MAP[b.icon];
                                    return (
                                        <div
                                            key={b.title}
                                            className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-5"
                                        >
                                            <Icon
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
                                    );
                                })}
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button
                                    asChild
                                    size="lg"
                                    variant="secondary"
                                >
                                    <Link href={service.valueBand.ctas.primaryHref}>
                                        {service.valueBand.ctas.primaryText}
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href={service.valueBand.ctas.secondaryHref}>
                                        {service.valueBand.ctas.secondaryText}
                                    </Link>
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
                            {service.faq.label}
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            {service.faq.title}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            {service.faq.description}
                        </p>
                    </motion.div>

                    <Card className="mt-8 rounded-4xl border-border shadow-none">
                        <CardContent className="px-6 py-2">
                            <Accordion type="single" collapsible className="w-full">
                                {service.faq.items.map((item) => (
                                    <AccordionItem key={item.id} value={item.id}>
                                        <AccordionTrigger>
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
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
                                        {service.finalCta.title}
                                    </div>
                                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-background/75">
                                        {service.finalCta.description}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button asChild size="lg">
                                        <Link href={service.finalCta.primaryHref}>
                                            {service.finalCta.primaryText}
                                        </Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <Link href={service.finalCta.secondaryHref}>
                                            {service.finalCta.secondaryText}
                                        </Link>
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
