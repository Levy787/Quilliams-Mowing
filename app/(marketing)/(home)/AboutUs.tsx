"use client";

import * as React from "react";
import Image from "next/image";
import { ShieldCheck, Star, ThumbsUp } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type Feature = {
    title: string;
    description: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const FEATURES: Feature[] = [
    {
        title: "Quality",
        description:
            "We embrace innovation and creativity in our designs, ensuring each project is unique and inspiring.",
        Icon: Star,
    },
    {
        title: "Satisfaction",
        description:
            "We are dedicated to delivering exceptional craftsmanship and using the highest quality materials to create enduring landscapes.",
        Icon: ThumbsUp,
    },
    {
        title: "Sustainability",
        description:
            "Our focus is on exceeding client expectations, providing attentive service and personalized solutions tailored to their needs.",
        Icon: ShieldCheck,
    },
];

export function AboutUs() {
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
                            src="https://picsum.photos/id/1062/1400/1050"
                            alt="Gardener caring for plants in a lush garden"
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
                            About Us
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
                            The Best Landscaping Services
                            <br />
                            in your Area
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
                            At Lawnella, we are passionate about creating exceptional outdoor spaces that
                            inspire, refresh, and delight. Combining creativity with a commitment to
                            quality, we bring your vision to life—transforming landscapes into thriving
                            environments that exceed expectations every time.
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
                            {FEATURES.map((feature, idx) => {
                                const Icon = feature.Icon;
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

