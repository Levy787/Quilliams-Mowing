"use client";

import * as React from "react";
import Image from "next/image";
import { ShieldCheck, Star, ThumbsUp } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

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
    imageSrc: string;
    imageAlt: string;
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
    imageSrc,
    imageAlt,
    features,
}: AboutUsProps) {
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = React.useRef<HTMLElement | null>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.35 });

    const EASE_OUT = [0.16, 1, 0.3, 1] as const;

    return (
        <section ref={sectionRef} className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Image */}
                    <motion.div
                        className="relative overflow-hidden rounded-4xl aspect-4/3 sm:aspect-5/4 lg:aspect-4/3"
                        {...(shouldReduceMotion
                            ? {}
                            : {
                                initial: { opacity: 0, scale: 0.98 },
                                animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 },
                                transition: { duration: 0.7, ease: EASE_OUT },
                            })}
                    >
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={false}
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="min-w-0">
                        <motion.div
                            className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground"
                            {...(shouldReduceMotion
                                ? {}
                                : {
                                    initial: { opacity: 0, y: 12 },
                                    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
                                    transition: { duration: 0.6, ease: EASE_OUT },
                                })}
                        >
                            {badge}
                        </motion.div>

                        <motion.h2
                            className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                            {...(shouldReduceMotion
                                ? {}
                                : {
                                    initial: { opacity: 0, y: 12 },
                                    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
                                    transition: { duration: 0.6, ease: EASE_OUT, delay: 0.05 },
                                })}
                        >
                            {renderHeadingLines(headingLines)}
                        </motion.h2>

                        <motion.p
                            className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-prose"
                            {...(shouldReduceMotion
                                ? {}
                                : {
                                    initial: { opacity: 0, y: 12 },
                                    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
                                    transition: { duration: 0.6, ease: EASE_OUT, delay: 0.1 },
                                })}
                        >
                            {renderBodyWithParagraphBreaks(body)}
                        </motion.p>

                        <motion.div
                            className="mt-8 border-t border-border"
                            {...(shouldReduceMotion
                                ? {}
                                : {
                                    initial: { opacity: 0 },
                                    animate: inView ? { opacity: 1 } : { opacity: 0 },
                                    transition: { duration: 0.6, ease: EASE_OUT, delay: 0.15 },
                                })}
                        />

                        <div className="mt-6">
                            {features.map((feature, idx) => {
                                const Icon = FEATURE_ICONS[feature.icon];
                                return (
                                    <motion.div
                                        key={feature.title}
                                        className={cn(
                                            "grid gap-x-5 gap-y-2 py-6",
                                            "grid-cols-[auto_1fr]",
                                            "md:grid-cols-[auto_12rem_1fr]",
                                            idx !== 0 && "border-t border-border"
                                        )}
                                        {...(shouldReduceMotion
                                            ? {}
                                            : {
                                                initial: { opacity: 0, y: 10 },
                                                animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
                                                transition: {
                                                    duration: 0.55,
                                                    ease: EASE_OUT,
                                                    delay: 0.18 + idx * 0.08,
                                                },
                                            })}
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
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

