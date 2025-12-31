import { Leaf, ShieldCheck, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function AboutStory() {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8">
                    <Card className="rounded-4xl border-border shadow-none">
                        <CardContent className="px-6">
                            <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                The approach
                            </div>
                            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                Clean, calm, and maintained — not just “done”.
                            </h2>
                            <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                                Good gardening is the small stuff done consistently: edges that stay sharp, beds that don’t creep, lawns cut the right way, and clean-ups that actually feel like a reset.
                            </p>
                            <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                                Whether it’s ongoing maintenance or a one-off transformation, the goal is the same — leave you with an outdoor space you’re proud of.
                            </p>

                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="rounded-3xl border border-border bg-muted/30 p-5">
                                    <Leaf className="h-5 w-5 text-primary" aria-hidden />
                                    <div className="mt-3 text-sm font-semibold text-foreground">
                                        Practical choices
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Designs and maintenance plans that suit your time, budget, and yard.
                                    </p>
                                </div>
                                <div className="rounded-3xl border border-border bg-muted/30 p-5">
                                    <Sparkles className="h-5 w-5 text-primary" aria-hidden />
                                    <div className="mt-3 text-sm font-semibold text-foreground">
                                        Strong finish
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Tidy-up isn’t optional — it’s the last 10% that makes it look 100%.
                                    </p>
                                </div>
                                <div className="rounded-3xl border border-border bg-muted/30 p-5">
                                    <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
                                    <div className="mt-3 text-sm font-semibold text-foreground">
                                        Reliable routine
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Clear comms, consistent quality, and no surprises.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-4xl border-border shadow-none overflow-hidden">
                        <CardContent className="px-6">
                            <div className="text-xl font-semibold text-foreground">
                                What you can expect
                            </div>
                            <ul className="mt-4 space-y-3 text-sm md:text-base text-muted-foreground">
                                <li>
                                    <span className="font-semibold text-foreground">A quick plan</span> — what we’re doing, what we’re not, and what matters most.
                                </li>
                                <li>
                                    <span className="font-semibold text-foreground">A tidy site</span> — paths cleared, clippings handled, and a clean finish.
                                </li>
                                <li>
                                    <span className="font-semibold text-foreground">Work that lasts</span> — maintained edges, controlled growth, and less mess over time.
                                </li>
                                <li>
                                    <span className="font-semibold text-foreground">Respect for your space</span> — gates, access, pets, and neighbours considered.
                                </li>
                            </ul>

                            <div className="mt-8 rounded-3xl border border-border bg-muted/30 p-5">
                                <div className="text-sm font-semibold text-foreground">
                                    The goal
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Leave you with a garden that looks better now — and is easier to keep looking good.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
