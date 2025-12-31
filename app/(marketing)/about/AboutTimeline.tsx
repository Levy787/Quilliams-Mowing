import { CalendarDays } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type TimelineItem = {
    title: string;
    description: string;
    tag: string;
};

const TIMELINE: TimelineItem[] = [
    {
        tag: "Step 1",
        title: "Started with the basics",
        description:
            "Simple maintenance jobs, cleanups, and learning what makes a garden actually stay tidy week to week.",
    },
    {
        tag: "Step 2",
        title: "Dialled in a ‘clean finish’ standard",
        description:
            "Edges, blow-down, and leaving things neat became non-negotiable — the final 10% that people notice.",
    },
    {
        tag: "Step 3",
        title: "Bigger yards + better systems",
        description:
            "Built repeatable routines for lawns, pruning, and weeding so the quality stays consistent.",
    },
    {
        tag: "Step 4",
        title: "More landscaping-style work",
        description:
            "Refreshes, reshapes, and smarter layouts — practical upgrades that make the space feel new.",
    },
    {
        tag: "Step 5",
        title: "Today",
        description:
            "Reliable maintenance, one-off transformations, and honest advice — with a focus on calm, clean outdoor spaces.",
    },
];

export function AboutTimeline() {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none">
                    <CardContent className="px-6">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                    Timeline
                                </div>
                                <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                    Built step-by-step — quality first.
                                </h2>
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
                                    A quick snapshot of how the work evolved: from basic maintenance to a clean, consistent standard across every job.
                                </p>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
                                <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
                                Always improving
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="relative">
                                <div
                                    className="absolute left-4 top-0 bottom-0 w-px bg-border"
                                    aria-hidden="true"
                                />

                                <div className="space-y-4">
                                    {TIMELINE.map((item, index) => (
                                        <div
                                            key={item.title}
                                            className="relative pl-12"
                                        >
                                            <div
                                                className="absolute left-[9px] top-6 h-3 w-3 rounded-full bg-primary"
                                                aria-hidden="true"
                                            />

                                            <div className="rounded-4xl border border-border bg-muted/25 p-6">
                                                <div className="flex flex-wrap items-center justify-between gap-3">
                                                    <div className="text-lg font-semibold text-foreground">
                                                        {item.title}
                                                    </div>
                                                    <div className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
                                                        {item.tag}
                                                    </div>
                                                </div>
                                                <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                                                    {item.description}
                                                </p>
                                                <div className="mt-4 text-xs text-muted-foreground">
                                                    Milestone {index + 1} of {TIMELINE.length}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
