
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { LeafletMap } from "@/components/reusable/leaflet-map";

export function ServiceArea() {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                            {/* Copy */}
                            <div className="p-6 md:p-10">
                                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                    Service area
                                </div>
                                <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                    Newquay, Truro, St Austell
                                </h2>
                                <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
                                    We cover Newquay, Truro, St Austell and nearby areas. If you’re close by,
                                    reach out — we’ll confirm availability quickly.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    <div className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
                                        Fast response times
                                    </div>
                                    <div className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
                                        Local, reliable service
                                    </div>
                                    <div className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
                                        Clear quotes upfront
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button asChild size="lg">
                                        <Link href="/quote">Get a Quote</Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                </div>

                                <p className="mt-5 text-sm text-muted-foreground">
                                    Not sure if you’re in range? Send your suburb in the quote form.
                                </p>
                            </div>

                            {/* Map */}
                            <div className="relative overflow-hidden border-t border-border lg:border-t-0 lg:border-l">
                                <div className="relative aspect-[16/11] w-full lg:aspect-[16/12] overflow-hidden rounded-3xl z-0">
                                    <LeafletMap
                                        center={[50.338, -4.973]}
                                        zoom={9.6}
                                        elements={[
                                            {
                                                type: "circle",
                                                center: [50.40, -4.93],
                                                radius: 20000,
                                                pathOptions: {
                                                    color: "#00a63e",
                                                    fillColor: "#00a63e",
                                                    fillOpacity: 0.2,
                                                },
                                            },
                                        ]}
                                    />

                                    {/* Soft overlay (does not block interaction) */}
                                    <div
                                        className="pointer-events-none absolute inset-0"
                                        aria-hidden="true"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-t from-background/70 via-background/15 to-transparent" />
                                        <div className="absolute inset-0 bg-background/5" />

                                        {/* Labels */}
                                        <div className="absolute left-[20%] top-[30%] rounded-full border border-border bg-background/85 px-3 py-1 text-xs font-medium text-foreground">
                                            Newquay
                                        </div>
                                        <div className="absolute left-[46%] top-[34%] rounded-full border border-border bg-background/85 px-3 py-1 text-xs font-medium text-foreground">
                                            Truro
                                        </div>
                                        <div className="absolute left-[56%] top-[49%] rounded-full border border-border bg-background/85 px-3 py-1 text-xs font-medium text-foreground">
                                            St Austell
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
