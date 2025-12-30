"use client";

import Link from "next/link";
import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type WorkItem = {
    title: string;
    description: string;
    perfectFor: string;
    budget: string;
    duration: string;
};

const WORKS: WorkItem[] = [
    {
        title: "Elegant Garden Makeover",
        description:
            "Transforming a dull backyard into a vibrant green retreat with fresh turf, seasonal flowers, and decorative pathways.",
        perfectFor:
            "Installed automatic irrigation, added eco-friendly lighting, and designed a low-maintenance plant layout.",
        budget: "$800 - $2,500",
        duration: "2-3 days",
    },
    {
        title: "Elegant Garden Makeover",
        description:
            "Transforming a dull backyard into a vibrant green retreat with fresh turf, seasonal flowers, and decorative pathways.",
        perfectFor:
            "Installed automatic irrigation, added eco-friendly lighting, and designed a low-maintenance plant layout.",
        budget: "$800 - $2,500",
        duration: "2-3 days",
    },
    {
        title: "Elegant Garden Makeover",
        description:
            "Transforming a dull backyard into a vibrant green retreat with fresh turf, seasonal flowers, and decorative pathways.",
        perfectFor:
            "Installed automatic irrigation, added eco-friendly lighting, and designed a low-maintenance plant layout.",
        budget: "$800 - $2,500",
        duration: "2-3 days",
    },
] as const;

function InfoBlock({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="text-sm font-semibold text-background">{label}</div>
            <div className="mt-1 text-xs text-background/70">{value}</div>
        </div>
    );
}

function MediaPlaceholder({ variant }: { variant: 1 | 2 | 3 }) {
    const main = (
        <div className="aspect-square w-full rounded-2xl bg-background/10" aria-hidden="true" />
    );

    const strip = (
        <div
            className={cn(
                "hidden sm:block w-20 rounded-2xl bg-background/10 aspect-1/3"
            )}
            aria-hidden="true"
        />
    );

    if (variant === 2) {
        return (
            <div className="flex gap-4">
                {strip}
                {main}
            </div>
        );
    }

    return (
        <div className="flex gap-4">
            {main}
            {strip}
        </div>
    );
}

function WorkRow({
    item,
    index,
    inView,
    shouldReduceMotion,
}: {
    item: WorkItem;
    index: number;
    inView: boolean;
    shouldReduceMotion: boolean;
}) {
    const EASE_OUT = [0.16, 1, 0.3, 1] as const;
    const variant = (index + 1) as 1 | 2 | 3;

    const motionProps = shouldReduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 12 },
            animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
            transition: { duration: 0.65, ease: EASE_OUT, delay: 0.12 + index * 0.08 },
        };

    const contentBlock = (
        <div className="min-w-0">
            <div className="text-xl font-semibold text-background">{item.title}</div>
            <p className="mt-3 text-sm leading-relaxed text-background/70">{item.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <InfoBlock label="Ideal Budget Range" value={item.budget} />
                <InfoBlock label="Estimated Duration" value={item.duration} />
            </div>
        </div>
    );

    const perfectForBlock = (
        <div className="min-w-0">
            <div className="text-sm font-semibold text-background">Perfect for</div>
            <p className="mt-2 text-sm leading-relaxed text-background/70">{item.perfectFor}</p>
        </div>
    );

    const ctaBlock = (
        <div className="flex items-center lg:justify-end">
            <Button asChild>
                <Link href="#">
                    View More Details
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            </Button>
        </div>
    );

    // Desktop variations are handled by changing column placement.
    // Mobile always stacks: media -> content -> perfect for -> button.
    const media = (
        <div className="min-w-0">
            <MediaPlaceholder variant={variant} />
        </div>
    );

    return (
        <motion.div {...motionProps}>
            <Card
                className={cn(
                    "rounded-4xl border border-border/20 bg-background/5 text-background",
                    "shadow-none py-0"
                )}
            >
                <CardContent className="px-6 py-8 md:px-8">
                    {/* Mobile: stack. Desktop: varied 3-column layouts. */}
                    <div className="space-y-8 lg:hidden">
                        {media}
                        {contentBlock}
                        {perfectForBlock}
                        {ctaBlock}
                    </div>

                    <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
                        {variant === 1 && (
                            <>
                                <div className="col-span-4">{media}</div>
                                <div className="col-span-4">{contentBlock}</div>
                                <div className="col-span-4 space-y-6">
                                    {perfectForBlock}
                                    {ctaBlock}
                                </div>
                            </>
                        )}

                        {variant === 2 && (
                            <>
                                <div className="col-span-4">{contentBlock}</div>
                                <div className="col-span-4">{media}</div>
                                <div className="col-span-4 space-y-6">
                                    {perfectForBlock}
                                    {ctaBlock}
                                </div>
                            </>
                        )}

                        {variant === 3 && (
                            <>
                                <div className="col-span-4">{contentBlock}</div>
                                <div className="col-span-4 space-y-6">
                                    {perfectForBlock}
                                    {ctaBlock}
                                </div>
                                <div className="col-span-4">{media}</div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export function RecentWorks() {
    const shouldReduceMotion = !!useReducedMotion();
    const sectionRef = React.useRef<HTMLElement | null>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.3 });
    const EASE_OUT = [0.16, 1, 0.3, 1] as const;

    return (
        <section ref={sectionRef} className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div
                className="bg-foreground text-background rounded-4xl overflow-hidden"
            >
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="px-2 py-12 md:py-14">
                        {/* Header */}
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0">
                                <motion.div
                                    className="inline-flex items-center rounded-full bg-background/10 px-4 py-1.5 text-sm text-background"
                                    {...(shouldReduceMotion
                                        ? {}
                                        : {
                                            initial: { opacity: 0, y: 10 },
                                            animate: inView
                                                ? { opacity: 1, y: 0 }
                                                : { opacity: 0, y: 10 },
                                            transition: { duration: 0.6, ease: EASE_OUT },
                                        })}
                                >
                                    Our Recent Works
                                </motion.div>

                                <motion.h2
                                    className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                                    {...(shouldReduceMotion
                                        ? {}
                                        : {
                                            initial: { opacity: 0, y: 12 },
                                            animate: inView
                                                ? { opacity: 1, y: 0 }
                                                : { opacity: 0, y: 12 },
                                            transition: {
                                                duration: 0.7,
                                                ease: EASE_OUT,
                                                delay: 0.05,
                                            },
                                        })}
                                >
                                    Beautiful Gardens &amp;
                                    <br />
                                    Landscapes We Created
                                </motion.h2>
                            </div>

                            <motion.p
                                className="max-w-md text-sm md:text-base text-background/70 lg:text-right"
                                {...(shouldReduceMotion
                                    ? {}
                                    : {
                                        initial: { opacity: 0, y: 12 },
                                        animate: inView
                                            ? { opacity: 1, y: 0 }
                                            : { opacity: 0, y: 12 },
                                        transition: { duration: 0.7, ease: EASE_OUT, delay: 0.1 },
                                    })}
                            >
                                See how we’ve transformed spaces with our expert craftsmanship and attention
                                to detail.
                            </motion.p>
                        </div>

                        {/* Rows */}
                        <div className="mt-10 space-y-6">
                            {WORKS.map((item, idx) => (
                                <WorkRow
                                    key={idx}
                                    item={item}
                                    index={idx}
                                    inView={inView}
                                    shouldReduceMotion={shouldReduceMotion}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

