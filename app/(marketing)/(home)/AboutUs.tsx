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
            "We take pride in doing the job right, using professional equipment and proven techniques to deliver consistent, long-lasting results.",
        Icon: Star,
    },
    {
        title: "Satisfaction",
        description:
            "Your satisfaction matters. We listen to your needs, communicate clearly, and make sure every service meets your expectations.",
        Icon: ThumbsUp,
    },
    {
        title: "Sustainability",
        description:
            "We care for your landscape responsibly, focusing on healthy growth, smart maintenance, and practices that protect your yard for the long term.",
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
                            Reliable Landscaping Services<br /> You Can Count On
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
                            At Quilliams Gardening & Landscaping, we help homeowners enjoy clean, healthy, and beautiful outdoor spaces—without the physical work or time commitment. Whether you need regular mowing, garden maintenance, landscaping improvements, or a full yard clean-up, our team provides dependable, professional care tailored to your property and lifestyle.
                            <br /><br />We proudly serve homeowners who value their time, comfort, and peace of mind. From retirees who want to enjoy their yard without the strain, to busy families who simply don’t have the hours to maintain it, we take care of the details so you don’t have to.
                            <br /><br />Our approach is simple: show up when we say we will, do the job properly, and leave your yard looking better every time. We use proven best practices to keep landscapes healthy, attractive, and easy to maintain—season after season.
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

