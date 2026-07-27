"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
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
import { useRevealInView } from "@/hooks/use-reveal-in-view";

type ServiceItem = {
    title: string;
    href: string;
    description: string;
    imageFile?: string | null;
    imageSrc?: string | null;
    imageAlt?: string | null;
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
    const { ref: sectionRef, inView } = useRevealInView<HTMLElement>({ threshold: 0.25 });

    const revealClassName = "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none";
    const revealStyle = (delayMs: number) => ({ transitionDelay: inView ? `${delayMs}ms` : "0ms" });

    return (
        <section ref={sectionRef} className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-12">
                {/* Header */}
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                        <div
                            className={cn(
                                "inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground",
                                revealClassName,
                                inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                            )}
                            style={revealStyle(0)}
                        >
                            {badge}
                        </div>

                        <h2
                            className={cn(
                                "mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground",
                                revealClassName,
                                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                            )}
                            style={revealStyle(50)}
                        >
                            {heading}
                        </h2>
                    </div>

                    <div
                        className={cn(
                            "shrink-0",
                            revealClassName,
                            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                        )}
                        style={revealStyle(80)}
                    >
                        <Button asChild>
                            <Link href={ctaHref}>
                                {ctaLabel}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>
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
                                const resolvedImageSrc = (service.imageFile?.trim()
                                    ? `/images/uploads/${service.imageFile}`
                                    : service.imageSrc) ?? "";
                                const hasImage = Boolean(resolvedImageSrc.trim());
                                const href = service.href?.trim();
                                const isClickable = Boolean(href);

                                return (
                                    <CarouselItem
                                        key={service.title}
                                        className="basis-full sm:basis-1/2 lg:basis-1/4"
                                    >
                                        <div
                                            className={cn(
                                                revealClassName,
                                                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                                            )}
                                            style={revealStyle(120 + idx * 60)}
                                        >
                                            <Card className="border-0 shadow-none bg-transparent py-0">
                                                <CardContent className="px-0">
                                                    {isClickable ? (
                                                        <Link
                                                            href={href!}
                                                            aria-label={`View ${service.title} service`}
                                                            className={cn(
                                                                "block",
                                                                "rounded-3xl",
                                                                "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                                                            )}
                                                        >
                                                            <div className="relative overflow-hidden rounded-3xl border border-border bg-muted aspect-video">
                                                                {hasImage && (
                                                                    <Image
                                                                        src={resolvedImageSrc}
                                                                        alt={service.imageAlt ?? ""}
                                                                        fill
                                                                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                                                        className="object-cover"
                                                                    />
                                                                )}
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
                                                        </Link>
                                                    ) : (
                                                        <>
                                                            <div className="relative overflow-hidden rounded-3xl border border-border bg-muted aspect-video">
                                                                {hasImage && (
                                                                    <Image
                                                                        src={resolvedImageSrc}
                                                                        alt={service.imageAlt ?? ""}
                                                                        fill
                                                                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                                                        className="object-cover"
                                                                    />
                                                                )}
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
                                                        </>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>

                        {/* Controls (positioned to the right side, like the design) */}
                        <CarouselPrevious
                            variant="outline"
                            className={cn(
                                "top-0 md:-top-15 right-16 left-auto translate-y-0 size-12",
                                "bg-background border-border"
                            )}
                        />
                        <CarouselNext
                            variant="outline"
                            className={cn(
                                "top-0 md:-top-15 right-2 left-auto translate-y-0 size-12",
                                "bg-background border-border"
                            )}
                        />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
