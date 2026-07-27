"use client";

import * as React from "react";
import { Award, HardHat, TreePine, Trees } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion, useRevealInView } from "@/hooks/use-reveal-in-view";

const STAT_ICONS = {
    trees: Trees,
    hardHat: HardHat,
    award: Award,
    treePine: TreePine,
} as const;

type StatIconKey = keyof typeof STAT_ICONS;

export type StatsItem = {
    value: number;
    suffix?: string;
    label: string;
    icon: StatIconKey;
};

export type StatsProps = {
    items: readonly StatsItem[];
};

const COUNT_DURATION_S = 1.5;

function StatCard({
    stat,
    index,
    inView,
}: {
    stat: StatsItem;
    index: number;
    inView: boolean;
}) {
    const shouldReduceMotion = usePrefersReducedMotion();
    // Keep the truthful value in server HTML. The count-up is presentation only.
    const [displayValue, setDisplayValue] = React.useState(stat.value);

    React.useEffect(() => {
        if (!inView) return;

        if (shouldReduceMotion) {
            setDisplayValue(stat.value);
            return;
        }

        let frameId = 0;
        const startedAt = performance.now();
        const durationMs = COUNT_DURATION_S * 1000;
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const tick = (now: number) => {
            const progress = Math.min((now - startedAt) / durationMs, 1);
            setDisplayValue(Math.round(easeOutCubic(progress) * stat.value));

            if (progress < 1) {
                frameId = window.requestAnimationFrame(tick);
            }
        };

        frameId = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(frameId);
    }, [inView, shouldReduceMotion, stat.value]);

    const Icon = STAT_ICONS[stat.icon];

    return (
        <div
            className={cn(
                "bg-muted rounded-4xl px-8 py-6 flex flex-col items-center text-center gap-3 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
                inView || shouldReduceMotion ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
            style={{ transitionDelay: inView ? `${index * 100}ms` : "0ms" }}
        >
            <Icon className="h-10 w-10 shrink-0 text-primary" aria-hidden="true" />
            <div className="min-w-0">
                <div className="text-4xl font-bold leading-none text-foreground">
                    {displayValue}
                    {stat.suffix ?? ""}
                </div>
                <div className="mt-1 text-base text-muted-foreground">{stat.label}</div>
            </div>
        </div>
    );
}

export function Stats({ items }: StatsProps) {
    const { ref: sectionRef, inView } = useRevealInView<HTMLElement>({ threshold: 0.35 });

    return (
        <section ref={sectionRef} className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="flex flex-wrap justify-center gap-6">
                    {items.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
