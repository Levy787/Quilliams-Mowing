import { BadgeCheck, Footprints, Leaf, Recycle, Timer } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const DRIVERS = [
    {
        title: "Yard size + layout",
        description:
            "More area, more edges, more time. Layout matters too (beds, paths, slopes, tight corners).",
        icon: Leaf,
    },
    {
        title: "Current condition",
        description:
            "Light tidy-ups are quicker. Heavy overgrowth, thick weeds, or neglected beds take longer and need more handling.",
        icon: Timer,
    },
    {
        title: "Access",
        description:
            "Easy access keeps things efficient. Stairs, narrow gates, long carries, or limited parking can increase time.",
        icon: Footprints,
    },
    {
        title: "Green waste handling",
        description:
            "Bagging, stacking, or removal changes the workload. We’ll confirm what you want done with clippings.",
        icon: Recycle,
    },
] as const;

export function PricingBreakdown() {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none">
                    <CardContent className="px-6">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            What affects price
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            A few real-world factors.
                        </h2>
                        <p className="mt-3 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
                            We keep pricing straightforward. The fastest way to confirm your range is a short description and a few photos.
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {DRIVERS.map((item) => {
                                const Icon = item.icon;
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
                                        Tip for accuracy
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Include photos from a few angles, plus any access notes (gates, stairs, parking).
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
