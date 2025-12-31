"use client";

import * as React from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Award, HardHat, TreePine, Trees } from "lucide-react";

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
    const shouldReduceMotion = useReducedMotion();
    const [displayValue, setDisplayValue] = React.useState(0);

    React.useEffect(() => {
        if (!inView) return;

        if (shouldReduceMotion) {
            setDisplayValue(stat.value);
            return;
        }

        const controls = animate(0, stat.value, {
            duration: COUNT_DURATION_S,
            ease: "easeOut",
            onUpdate: (v) => setDisplayValue(Math.round(v)),
        });

        return () => controls.stop();
    }, [inView, shouldReduceMotion, stat.value]);

    const Icon = STAT_ICONS[stat.icon];

    return (
        <motion.div
            className="bg-muted rounded-4xl px-8 py-6 flex items-center gap-5"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
        >
            <Icon className="h-10 w-10 shrink-0 text-primary" aria-hidden="true" />
            <div className="min-w-0">
                <div className="text-4xl font-bold leading-none text-foreground">
                    {displayValue}
                    {stat.suffix ?? ""}
                </div>
                <div className="mt-1 text-base text-muted-foreground">{stat.label}</div>
            </div>
        </motion.div>
    );
}

export function Stats({ items }: StatsProps) {
    const sectionRef = React.useRef<HTMLElement | null>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.35 });

    return (
        <section ref={sectionRef} className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}