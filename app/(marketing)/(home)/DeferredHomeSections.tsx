"use client";

import dynamic from "next/dynamic";

import type { RecentWorksProps } from "./RecentWorks";
import type { ServiceAreaProps } from "./ServiceArea";
import type { TestimonialsProps } from "./Testimonials";

const sectionPlaceholder = (label: string, minHeight: string) => (
    <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16" aria-label={label}>
        <div className="container mx-auto px-4 lg:px-12">
            <div
                className="animate-pulse rounded-4xl border bg-muted/40"
                style={{ minHeight }}
            />
        </div>
    </section>
);

const DeferredServiceAreaComponent = dynamic(
    () => import("./ServiceArea").then((module) => module.ServiceArea),
    {
        ssr: false,
        loading: () => sectionPlaceholder("Loading service areas", "420px"),
    },
);

const DeferredRecentWorksComponent = dynamic(
    () => import("./RecentWorks").then((module) => module.RecentWorks),
    {
        ssr: false,
        loading: () => sectionPlaceholder("Loading recent projects", "640px"),
    },
);

const DeferredTestimonialsComponent = dynamic(
    () => import("./Testimonials").then((module) => module.Testimonials),
    {
        ssr: false,
        loading: () => sectionPlaceholder("Loading testimonials", "420px"),
    },
);

export function DeferredServiceArea(props: ServiceAreaProps) {
    return <DeferredServiceAreaComponent {...props} />;
}

export function DeferredRecentWorks(props: RecentWorksProps) {
    return <DeferredRecentWorksComponent {...props} />;
}

export function DeferredTestimonials(props: TestimonialsProps) {
    return <DeferredTestimonialsComponent {...props} />;
}
