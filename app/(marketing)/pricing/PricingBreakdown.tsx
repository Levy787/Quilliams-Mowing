import { BadgeCheck, Footprints, Leaf, Recycle, Timer } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const DRIVER_ICONS = {
    leaf: Leaf,
    timer: Timer,
    footprints: Footprints,
    recycle: Recycle,
} as const;

type DriverIconKey = keyof typeof DRIVER_ICONS;

type DriverItem = {
    title: string;
    description: string;
    icon: DriverIconKey;
};

export type PricingBreakdownProps = {
    badge: string;
    heading: string;
    description: string;
    drivers: readonly DriverItem[];
    tipTitle: string;
    tipBody: string;
};

export function PricingBreakdown({ badge, heading, description, drivers, tipTitle, tipBody }: PricingBreakdownProps) {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none">
                    <CardContent className="px-6">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            {badge}
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            {heading}
                        </h2>
                        <p className="mt-3 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
                            {description}
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {drivers.map((item) => {
                                const Icon = DRIVER_ICONS[item.icon];
                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-4xl border border-border bg-muted/25 p-6"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background">
                                                <Icon className="h-5 w-5 text-primary" aria-hidden />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-lg font-semibold text-foreground">
                                                    {item.title}
                                                </div>
                                                <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 rounded-4xl border border-border bg-background p-6">
                            <div className="flex items-start gap-3">
                                <BadgeCheck className="mt-0.5 h-5 w-5 text-primary" aria-hidden />
                                <div>
                                    <div className="text-sm font-semibold text-foreground">
                                        {tipTitle}
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {tipBody}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
