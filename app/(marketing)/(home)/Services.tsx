"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Droplets, Leaf, Snowflake, Sprout } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ServiceItem = {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    tag: string;
    icon: "leaf" | "sprout" | "snowflake" | "droplets";
};

const SERVICE_ICONS = {
    leaf: Leaf,
    sprout: Sprout,
    snowflake: Snowflake,
    droplets: Droplets,
} as const;

export type ServicesProps = {
    badge: string;
    heading: string;
    ctaLabel: string;
    ctaHref: string;
    items: readonly ServiceItem[];
};

export function Services({ badge, heading, ctaLabel, ctaHref, items }: ServicesProps) {
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = React.useRef<HTMLElement | null>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.25 });
    const EASE_OUT = [0.16, 1, 0.3, 1] as const;

    return (
        <section ref={sectionRef} className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-12">
                {/* Header */}
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                        <motion.div
                            className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground"
                            {...(shouldReduceMotion
                                ? {}
                                : {
                                    initial: { opacity: 0, y: 10 },
                                    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
                                    transition: { duration: 0.6, ease: EASE_OUT },
                                })}
                        >
                            {badge}
                        </motion.div>

                        <motion.h2
                            className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                            {...(shouldReduceMotion
                                ? {}
                                : {
                                    initial: { opacity: 0, y: 12 },
                                    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
                                    transition: { duration: 0.7, ease: EASE_OUT, delay: 0.05 },
                                })}
                        >
                            {heading}
                        </motion.h2>
                    </div>

                    <motion.div
                        className="shrink-0"
                        {...(shouldReduceMotion
                            ? {}
                            : {
                                initial: { opacity: 0, y: 10 },
                                animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
                                transition: { duration: 0.6, ease: EASE_OUT, delay: 0.08 },
                            })}
                    >
                        <Button asChild>
                            <Link href={ctaHref}>
                                {ctaLabel}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Carousel */}
                <div className="mt-2 md:mt-10">
                    <Carousel
                        opts={{ align: "start", loop: false }}
                        className="relative pt-12 md:pt-0"
                    >
                        <CarouselContent>
                            {items.map((service, idx) => {
                                const Icon = SERVICE_ICONS[service.icon];
                                return (
                                    <CarouselItem
                                        key={service.title}
                                        className="basis-full sm:basis-1/2 lg:basis-1/4"
                                    >
                                        <motion.div
                                            {...(shouldReduceMotion
                                                ? {}
                                                : {
                                                    initial: { opacity: 0, y: 12 },
                                                    animate: inView
                                                        ? { opacity: 1, y: 0 }
                                                        : { opacity: 0, y: 12 },
                                                    transition: {
                                                        duration: 0.6,
                                                        ease: EASE_OUT,
                                                        delay: 0.12 + idx * 0.06,
                                                    },
                                                })}
                                        >
                                            <Card className="border-0 shadow-none bg-transparent py-0">
                                                <CardContent className="px-0">
                                                    <div className="relative overflow-hidden rounded-3xl border border-border bg-muted aspect-video">
                                                        <Image
                                                            src={service.imageSrc}
                                                            alt={service.imageAlt}
                                                            fill
                                                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                                            className="object-cover"
                                                            priority={idx < 2}
                                                        />
                                                        <div className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-sm text-foreground">
                                                            {service.tag}
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 flex items-center gap-3">
                                                        <Icon
                                                            className="h-8 w-8 text-primary"
                                                            aria-hidden="true"
                                                        />
                                                        <div className="text-xl font-semibold text-foreground">
                                                            {service.title}
                                                        </div>
                                                    </div>

                                                    <p className="mt-3 text-base leading-relaxed text-muted-foreground line-clamp-3">
                                                        {service.description}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>

                        {/* Controls (positioned to the right side, like the design) */}
                        <CarouselPrevious
                            variant="outline"
                            className={cn(
                                "top-0 md:-top-[3.75rem] right-14 left-auto translate-y-0 size-10 md:size-8",
                                "bg-background border-border"
                            )}
                        />
                        <CarouselNext
                            variant="outline"
                            className={cn(
                                "top-0 md:-top-[3.75rem] right-3 left-auto translate-y-0 size-10 md:size-8",
                                "bg-background border-border"
                            )}
                        />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

