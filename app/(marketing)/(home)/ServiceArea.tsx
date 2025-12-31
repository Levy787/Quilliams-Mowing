
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { LeafletMap } from "@/components/reusable/leaflet-map";

type MapLabel = {
    text: string;
    leftPercent: number;
    topPercent: number;
};

export type ServiceAreaProps = {
    badge: string;
    heading: string;
    body: string;
    chips: readonly string[];
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    footnote: string;
    map: {
        centerLat: number;
        centerLng: number;
        zoom: number;
        circleLat: number;
        circleLng: number;
        circleRadiusMeters: number;
    };
    mapLabels: readonly MapLabel[];
};

export function ServiceArea({
    badge,
    heading,
    body,
    chips,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    footnote,
    map,
    mapLabels,
}: ServiceAreaProps) {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                            {/* Copy */}
                            <div className="p-6 md:p-10">
                                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                    {badge}
                                </div>
                                <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                    {heading}
                                </h2>
                                <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
                                    {body}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {chips.map((chip) => (
                                        <div
                                            key={chip}
                                            className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground"
                                        >
                                            {chip}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button asChild size="lg">
                                        <Link href={primaryCtaHref}>{primaryCtaLabel}</Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
                                    </Button>
                                </div>

                                <p className="mt-5 text-sm text-muted-foreground">
                                    {footnote}
                                </p>
                            </div>

                            {/* Map */}
                            <div className="relative overflow-hidden">
                                <div className="relative aspect-[16/11] w-full lg:aspect-[16/12] overflow-hidden rounded-3xl z-0">
                                    <LeafletMap
                                        center={[map.centerLat, map.centerLng]}
                                        zoom={map.zoom}
                                        elements={[
                                            {
                                                type: "circle",
                                                center: [map.circleLat, map.circleLng],
                                                radius: map.circleRadiusMeters,
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
                                        {mapLabels.map((label) => (
                                            <div
                                                key={label.text}
                                                className="absolute rounded-full border border-border bg-background/85 px-3 py-1 text-xs font-medium text-foreground"
                                                style={{
                                                    left: `${label.leftPercent}%`,
                                                    top: `${label.topPercent}%`,
                                                }}
                                            >
                                                {label.text}
                                            </div>
                                        ))}
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
