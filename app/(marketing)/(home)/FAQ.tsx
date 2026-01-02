"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { Plus } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

export type FAQProps = {
    badge: string;
    headingLines: readonly string[];
    description: string;
    ctaLabel: string;
    ctaHref: string;
    decorativeImageFile?: string | null;
    decorativeImageSrc?: string | null;
    decorativeImageAlt?: string | null;
    items: readonly FaqItem[];
};

function renderHeadingLines(lines: readonly string[]) {
    return lines.map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 ? (
                <>
                    <br />
                </>
            ) : null}
        </React.Fragment>
    ));
}

export function FAQ({
    badge,
    headingLines,
    description,
    ctaLabel,
    ctaHref,
    decorativeImageFile,
    decorativeImageSrc,
    decorativeImageAlt,
    items,
}: FAQProps) {
    const resolvedDecorativeSrc = decorativeImageFile?.trim()
        ? `/images/uploads/${decorativeImageFile}`
        : decorativeImageSrc ?? "";
    const hasDecorativeImage = Boolean(resolvedDecorativeSrc.trim());

    return (
        <section className="relative overflow-hidden mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div className="pointer-events-none absolute bottom-0 left-0 hidden md:block">
                <div className="relative h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56">
                    {hasDecorativeImage ? (
                        <Image
                            src={resolvedDecorativeSrc}
                            alt={decorativeImageAlt ?? ""}
                            aria-hidden="true"
                            fill
                            className="object-contain"
                            sizes="(min-width: 1024px) 224px, (min-width: 768px) 192px, 160px"
                        />
                    ) : null}
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Left */}
                    <div className="lg:pt-6">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            {badge}
                        </div>

                        <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            {renderHeadingLines(headingLines)}
                        </h2>

                        <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-md">
                            {description}
                        </p>

                        <div className="mt-7">
                            <Button asChild>
                                <Link href={ctaHref}>{ctaLabel}</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="min-w-0 pb-6 md:pb-8">
                        <Accordion type="single" collapsible className="space-y-4">
                            {items.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className={cn(
                                        "rounded-2xl border border-border bg-background px-6",
                                        "overflow-hidden",
                                        "data-[state=open]:bg-accent/40"
                                    )}
                                >
                                    <AccordionTrigger
                                        className={cn(
                                            "py-5 text-base font-medium no-underline hover:no-underline",
                                            "flex items-center justify-between",
                                            "hover:bg-accent/50",
                                            "-mx-6 px-6 rounded-2xl",
                                            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                                            "[&>svg]:hidden"
                                        )}
                                    >
                                        <span className="pr-6">{item.question}</span>
                                        <Plus
                                            className={cn(
                                                "h-5 w-5 shrink-0 text-muted-foreground",
                                                "transition-transform duration-200",
                                                "data-[state=open]:rotate-45"
                                            )}
                                            aria-hidden="true"
                                        />
                                    </AccordionTrigger>

                                    <AccordionContent className="pb-5 text-muted-foreground">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}

