"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { useRevealInView } from "@/hooks/use-reveal-in-view";

type Feature = {
    title: string;
    description: string;
    icon: "star" | "thumbsUp" | "shieldCheck";
};

const FEATURE_ICONS = {
    star: Star,
    thumbsUp: ThumbsUp,
    shieldCheck: ShieldCheck,
} as const;

export type AboutUsProps = {
    badge: string;
    headingLines: readonly string[];
    body: string;
    imageFile?: string | null;
    imageSrc?: string | null;
    imageAlt?: string | null;
    features: readonly Feature[];
};

function renderHeadingLines(lines: readonly string[]) {
    return lines.map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
        </React.Fragment>
    ));
}

function renderBodyWithParagraphBreaks(text: string) {
    const paragraphs = text.split(/\n\n+/g);
    return paragraphs.map((p, index) => (
        <React.Fragment key={index}>
            {p}
            {index < paragraphs.length - 1 ? (
                <>
                    <br />
                    <br />
                </>
            ) : null}
        </React.Fragment>
    ));
}

export function AboutUs({
    badge,
    headingLines,
    body,
    imageFile,
    imageSrc,
    imageAlt,
    features,
}: AboutUsProps) {
    const resolvedImageSrc = imageFile?.trim()
        ? `/images/uploads/${imageFile}`
        : imageSrc ?? "";
    const hasImage = Boolean(resolvedImageSrc.trim());

    const { ref: sectionRef, inView } = useRevealInView<HTMLElement>({ threshold: 0.35 });
    const revealClassName = "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none";
    const revealStyle = (delayMs: number) => ({ transitionDelay: inView ? `${delayMs}ms` : "0ms" });

    return (
        <section ref={sectionRef} className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Image */}
                    <div
                        className={cn(
                            "relative overflow-hidden rounded-4xl aspect-4/3 sm:aspect-5/4 lg:aspect-4/3",
                            revealClassName,
                            inView ? "scale-100 opacity-100" : "scale-[0.98] opacity-0",
                        )}
                        style={revealStyle(0)}
                    >
                        {hasImage ? (
                            <Image
                                src={resolvedImageSrc}
                                alt={imageAlt ?? ""}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={false}
                            />
                        ) : null}
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                        <div
                            className={cn(
                                "inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground",
                                revealClassName,
                                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                            )}
                            style={revealStyle(0)}
                        >
                            {badge}
                        </div>

                        <h2
                            className={cn(
                                "mt-5 text-4xl md:text-5xl font-bold tracking-tight text-foreground",
                                revealClassName,
                                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                            )}
                            style={revealStyle(50)}
                        >
                            {renderHeadingLines(headingLines)}
                        </h2>

                        <p
                            className={cn(
                                "mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-prose",
                                revealClassName,
                                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                            )}
                            style={revealStyle(100)}
                        >
                            {renderBodyWithParagraphBreaks(body)}
                        </p>

                        <Link
                            href="/about"
                            className={cn(
                                "mt-6 inline-flex min-h-12 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline",
                                revealClassName,
                                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                            )}
                            style={revealStyle(125)}
                        >
                            Meet Levi Quilliam
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>

                        <div
                            className={cn("mt-8 border-t border-border transition-opacity duration-700 motion-reduce:transition-none", inView ? "opacity-100" : "opacity-0")}
                            style={revealStyle(150)}
                        />

                        <div className="mt-6">
                            {features.map((feature, idx) => {
                                const Icon = FEATURE_ICONS[feature.icon];
                                return (
                                    <div
                                        key={feature.title}
                                        className={cn(
                                            "grid gap-x-5 gap-y-2 py-6",
                                            "grid-cols-[auto_1fr]",
                                            "md:grid-cols-[auto_12rem_1fr]",
                                            idx !== 0 && "border-t border-border",
                                            revealClassName,
                                            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                                        )}
                                        style={revealStyle(180 + idx * 80)}
                                    >
                                        <div className="pt-0.5">
                                            <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                                        </div>

                                        <div className="text-lg font-semibold text-foreground">
                                            {feature.title}
                                        </div>

                                        <p className="text-sm md:text-base leading-relaxed text-muted-foreground md:col-start-3">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
