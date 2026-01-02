import { CalendarDays } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export type AboutTimelineProps = {
    badge: string;
    title: string;
    description: string;
    pillText: string;
    items: ReadonlyArray<{ tag: string; title: string; description: string }>;
};

export function AboutTimeline(props: AboutTimelineProps) {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none">
                    <CardContent className="px-6">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                    {props.badge}
                                </div>
                                <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                    {props.title}
                                </h2>
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
                                    {props.description}
                                </p>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
                                <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
                                {props.pillText}
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="relative">
                                <div
                                    className="absolute left-4 top-0 bottom-0 w-px bg-border"
                                    aria-hidden="true"
                                />

                                <div className="space-y-4">
                                    {props.items.map((item, index) => (
                                        <div
                                            key={item.title}
                                            className="relative pl-12"
                                        >
                                            <div
                                                className="absolute left-2.25 top-6 h-3 w-3 rounded-full bg-primary"
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
                                                    Milestone {index + 1} of {props.items.length}
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
