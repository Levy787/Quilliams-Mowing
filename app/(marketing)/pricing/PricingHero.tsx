import Link from "next/link";
import { ArrowRight, BadgeDollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type PricingHeroProps = {
    badge: string;
    heading: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    footnote: string;
    sideCardTitle: string;
    sideCardBody: string;
};

export function PricingHero({
    badge,
    heading,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    footnote,
    sideCardTitle,
    sideCardBody,
}: PricingHeroProps) {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 pt-10 md:pt-12">
            <div className="container mx-auto px-4 lg:px-12">
                <Card
                    className="rounded-4xl border-border shadow-none overflow-hidden"
                    style={{
                        backgroundImage: "url(/patterns/pattern-1.png)",
                        backgroundRepeat: "repeat",
                        backgroundBlendMode: "overlay",
                    }}
                >
                    <CardContent className="px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 py-6 md:py-10">
                            <div className="min-w-0">
                                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                    {badge}
                                </div>
                                <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                                    {heading}
                                </h1>
                                <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
                                    {description}
                                </p>
                                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button asChild size="lg">
                                        <Link href={primaryCtaHref}>
                                            {primaryCtaLabel}
                                            <ArrowRight className="h-5 w-5" aria-hidden />
                                        </Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
                                    </Button>
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    {footnote}
                                </p>
                            </div>

                            <div className="w-full sm:w-auto">
                                <div className="rounded-4xl border border-border bg-background/70 p-6">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-muted/40">
                                            <BadgeDollarSign className="h-6 w-6 text-primary" aria-hidden />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-foreground">
                                                {sideCardTitle}
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {sideCardBody}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
