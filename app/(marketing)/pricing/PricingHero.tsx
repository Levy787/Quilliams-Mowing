import Link from "next/link";
import { ArrowRight, BadgeDollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PricingHero() {
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
                                    Pricing
                                </div>
                                <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                                    A rough price guide — fast confirmation.
                                </h1>
                                <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
                                    Use the calculator to get a ballpark range. We’ll confirm scope and timing quickly once you send your details.
                                </p>
                                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button asChild size="lg">
                                        <Link href="/quote">
                                            Get a Quote
                                            <ArrowRight className="h-5 w-5" aria-hidden />
                                        </Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <Link href="/contact">Contact</Link>
                                    </Button>
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Estimates are a guide only — every yard is different.
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
                                                Best for planning
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Get a rough range, then send it with your quote request.
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
