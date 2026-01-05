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
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
    tag?: string;
    heroImage?: { src: string; alt: string };
    icon?:
    | "Trees"
    | "Sprout"
    | "Flower2"
    | "Scissors"
    | "Layers"
    | "Wind"
    | "Droplets";
};

export type ServicesLandingContentModel = {
    hero: {
        badge: string;
        title: string;
        description: string;
        primaryCta: { label: string; href: string };
        secondaryCta: { label: string; href: string };
        chips: readonly string[];
        image: { src: string; alt: string; caption: string };
    };
    process: {
        title: string;
        description: string;
        steps: ReadonlyArray<{
            title: string;
            description: string;
            icon:
            | "MessageCircle"
            | "Lightbulb"
            | "ClipboardCheck"
            | "CalendarDays";
        }>;
    };
    servicesGrid: {
        title: string;
        description: string;
    };
    highlights: {
        title: string;
        description: string;
        items: ReadonlyArray<{
            image: { src: string; alt: string };
            title: string;
            bullets: readonly string[];
            cta: {
                label: string;
                href: string;
                variant: "default" | "outline";
            };
        }>;
    };
    faq: {
        title: string;
        description: string;
        items: ReadonlyArray<{ id: string; question: string; answer: string }>;
    };
    finalCta: {
        title: string;
        description: string;
        primaryCta: { label: string; href: string };
        secondaryCta: { label: string; href: string };
    };
};

const SERVICE_CARD_ICONS: Record<
    NonNullable<ServiceCardModel["icon"]>,
    ComponentType<SVGProps<SVGSVGElement>>
> = {
    Trees,
    Sprout,
    Flower2,
    Scissors,
    Layers,
    Wind,
    Droplets,
};

const PROCESS_ICONS: Record<
    ServicesLandingContentModel["process"]["steps"][number]["icon"],
    ComponentType<SVGProps<SVGSVGElement>>
> = {
    MessageCircle,
    Lightbulb,
    ClipboardCheck,
    CalendarDays,
};

export default function ServicesLandingClient({
    services,
    content,
}: {
    services: ServiceCardModel[];
    content: ServicesLandingContentModel;
}) {
    const fadeUp = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <main>
            <div className="mx-4 md:mx-8 lg:mx-16 pt-6 md:pt-8">
                <div className="container mx-auto px-4 lg:px-12">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Services</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <section className="mx-4 md:mx-8 lg:mx-16 pt-6 md:pt-8 pb-12 md:pb-16">
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
                                {content.hero.badge}
                            </div>

                            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                                {content.hero.title}
                            </h1>

                            <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
                                {content.hero.description}
                            </p>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button asChild size="lg">
                                    <Link href={content.hero.primaryCta.href}>
                                        {content.hero.primaryCta.label}
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href={content.hero.secondaryCta.href}>
                                        {content.hero.secondaryCta.label}
                                    </Link>
                                </Button>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
                                {content.hero.chips.map((chip) => (
                                    <div
                                        key={chip}
                                        className="inline-flex items-center rounded-full bg-muted px-3 py-1"
                                    >
                                        {chip}
                                    </div>
                                ))}
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
                                    {content.hero.image?.src?.trim() ? (
                                        <Image
                                            src={content.hero.image.src}
                                            alt={content.hero.image.alt}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 1024px) 50vw, 100vw"
                                            priority
                                        />
                                    ) : null}
                                    <div className="absolute inset-0 bg-linear-to-t from-gray-800/60 via-gray-800/10 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="max-w-md text-sm leading-relaxed text-background">
                                            {content.hero.image.caption}
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
                                        {content.process.title}
                                    </div>
                                    <p className="mt-2 text-sm md:text-base leading-relaxed text-background/80 dark:text-muted-foreground">
                                        {content.process.description}
                                    </p>
                                </motion.div>

                                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {content.process.steps.map((step, index) => {
                                        const StepIcon = PROCESS_ICONS[step.icon];

                                        return (
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
                                                                <StepIcon
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
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Services grid */}
                    <div className="mt-14">
                        <div className="max-w-2xl">
                            <div className="text-2xl font-semibold text-foreground">
                                {content.servicesGrid.title}
                            </div>
                            <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                {content.servicesGrid.description}
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => {
                                const Icon =
                                    service.icon && SERVICE_CARD_ICONS[service.icon]
                                        ? SERVICE_CARD_ICONS[service.icon]
                                        : Sprout;

                                const heroSrc = service.heroImage?.src?.trim() ?? "";
                                const hasHero = Boolean(heroSrc);

                                return (
                                    <Link
                                        key={service.slug}
                                        href={`/services/${service.slug}`}
                                        className="group block focus-visible:outline-none"
                                    >
                                        <Card className="p-0 h-full overflow-hidden rounded-3xl border-border shadow-none transition-transform group-hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-ring/50">
                                            {hasHero ? (
                                                <div className="relative aspect-video w-full bg-muted">
                                                    <Image
                                                        src={heroSrc}
                                                        alt={service.heroImage?.alt ?? ""}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(min-width: 1024px) 33vw, 100vw"
                                                    />
                                                    <div className="absolute inset-0 bg-linear-to-t from-gray-800/70 via-gray-800/10 to-transparent" />
                                                </div>
                                            ) : null}
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
                                                            {service.tag ? (
                                                                <div className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                                                    {service.tag}
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
                    {/* <div className="mt-14">
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
                                        {content.highlights.title}
                                    </div>
                                    <p className="mt-2 text-sm md:text-base leading-relaxed text-primary-foreground/80">
                                        {content.highlights.description}
                                    </p>
                                </motion.div>

                                <div className="mt-6 space-y-6">
                                    {content.highlights.items.map(
                                        (highlight, index) => (
                                            <Card
                                                key={`${highlight.title}-${index}`}
                                                className="rounded-4xl border-border shadow-none overflow-hidden"
                                            >
                                                <CardContent className="px-6 py-6">
                                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
                                                        <div
                                                            className={`relative aspect-16/10 w-full overflow-hidden rounded-3xl border border-border ${index % 2 === 1
                                                                ? "md:order-2"
                                                                : ""
                                                                }`}
                                                        >
                                                            <Image
                                                                src={
                                                                    highlight
                                                                        .image
                                                                        .src
                                                                }
                                                                alt={
                                                                    highlight
                                                                        .image
                                                                        .alt
                                                                }
                                                                fill
                                                                className="object-cover"
                                                                sizes="(min-width: 768px) 50vw, 100vw"
                                                            />
                                                        </div>

                                                        <div
                                                            className={`min-w-0 ${index % 2 === 1
                                                                ? "md:order-1"
                                                                : ""
                                                                }`}
                                                        >
                                                            <div className="text-xl md:text-2xl font-semibold text-foreground">
                                                                {
                                                                    highlight.title
                                                                }
                                                            </div>
                                                            <ul className="mt-4 space-y-2 text-sm md:text-base text-muted-foreground">
                                                                {highlight.bullets.map(
                                                                    (
                                                                        bullet,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                bullet
                                                                            }
                                                                            className="flex gap-2"
                                                                        >
                                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                                            {
                                                                                bullet
                                                                            }
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>

                                                            <div className="mt-6">
                                                                <Button
                                                                    asChild
                                                                    variant={
                                                                        highlight
                                                                            .cta
                                                                            .variant
                                                                    }
                                                                >
                                                                    <Link
                                                                        href={
                                                                            highlight
                                                                                .cta
                                                                                .href
                                                                        }
                                                                    >
                                                                        {
                                                                            highlight
                                                                                .cta
                                                                                .label
                                                                        }
                                                                    </Link>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* FAQ */}
                    <div className="mt-14">
                        <div className="max-w-2xl">
                            <div className="text-2xl font-semibold text-foreground">
                                {content.faq.title}
                            </div>
                            <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                {content.faq.description}
                            </p>
                        </div>

                        <Card className="mt-6 rounded-4xl border-border shadow-none">
                            <CardContent className="px-6 py-2">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                >
                                    {content.faq.items.map((item) => (
                                        <AccordionItem
                                            key={item.id}
                                            value={item.id}
                                        >
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

                    {/* CTA */}
                    <div className="mt-14">
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6 py-6">
                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                    <div className="min-w-0">
                                        <div className="text-2xl font-semibold text-foreground">
                                            {content.finalCta.title}
                                        </div>
                                        <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl">
                                            {content.finalCta.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <Button asChild size="lg">
                                            <Link
                                                href={
                                                    content.finalCta
                                                        .primaryCta
                                                        .href
                                                }
                                            >
                                                {
                                                    content.finalCta
                                                        .primaryCta
                                                        .label
                                                }
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            size="lg"
                                            variant="outline"
                                        >
                                            <Link
                                                href={
                                                    content.finalCta
                                                        .secondaryCta
                                                        .href
                                                }
                                            >
                                                {
                                                    content.finalCta
                                                        .secondaryCta
                                                        .label
                                                }
                                            </Link>
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
