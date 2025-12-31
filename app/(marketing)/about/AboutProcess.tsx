import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
    {
        title: "Quick scope",
        description:
            "A short chat and (if needed) a couple of photos so we understand the job and your priorities.",
        icon: BadgeCheck,
    },
    {
        title: "Clear plan",
        description:
            "We agree on what’s included, what matters most, and how we’ll leave the space at the end.",
        icon: Wand2,
    },
    {
        title: "Quality work",
        description:
            "Careful, consistent work — with an eye for the details that make it look sharp.",
        icon: Sparkles,
    },
    {
        title: "Clean finish",
        description:
            "Paths cleared, beds tidied, and the final blow-down so it looks properly finished.",
        icon: BadgeCheck,
    },
] as const;

export function AboutProcess() {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
                    <Card className="rounded-4xl border-border shadow-none">
                        <CardContent className="px-6">
                            <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                How we work
                            </div>
                            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                A simple process that keeps standards high.
                            </h2>
                            <p className="mt-3 text-base md:text-lg leading-relaxed text-muted-foreground">
                                No overcomplication. Just clear expectations, reliable delivery, and a finish you’ll notice.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button asChild size="lg">
                                    <Link href="/quote">
                                        Get a Quote
                                        <ArrowRight className="h-5 w-5" aria-hidden />
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/services">See Services</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 gap-4">
                        {STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <Card
                                    key={step.title}
                                    className="rounded-4xl border-border shadow-none"
                                >
                                    <CardContent className="px-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted/40">
                                                <Icon className="h-5 w-5 text-primary" aria-hidden />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <div className="text-lg font-semibold text-foreground">
                                                        {step.title}
                                                    </div>
                                                    <div className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                                                        Step {index + 1}
                                                    </div>
                                                </div>
                                                <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
