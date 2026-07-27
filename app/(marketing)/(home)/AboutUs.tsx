"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, ThumbsUp } from "lucide-react";

type Feature = {
    title: string;
    description: string;
    icon: "star" | "thumbsUp" | "shieldCheck";
};

const FEATURE_ICONS = {
    star: Star,
    thumbsUp: ThumbsUp,
    shieldCheck: ShieldCheck,
} as const;

export type AboutUsProps = {
    badge: string;
    headingLines: readonly string[];
    body: string;
    imageFile?: string | null;
    imageSrc?: string | null;
    imageAlt?: string | null;
    features: readonly Feature[];
};

function renderHeadingLines(lines: readonly string[]) {
    return lines.map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
        </React.Fragment>
    ));
}

function renderBodyWithParagraphBreaks(text: string) {
    const paragraphs = text.split(/\n\n+/g);
    return paragraphs.map((p, index) => (
        <React.Fragment key={index}>
            {p}
            {index < paragraphs.length - 1 ? (
                <>
                    <br />
                    <br />
                </>
            ) : null}
        </React.Fragment>
    ));
}

export function AboutUs({
    badge,
    headingLines,
    body,
    imageFile,
    imageSrc,
    imageAlt,
    features,
}: AboutUsProps) {
    const resolvedImageSrc = imageFile?.trim()
        ? `/images/uploads/${imageFile}`
        : imageSrc ?? "";
    const hasImage = Boolean(resolvedImageSrc.trim());

    return (
        <section className="mx-4 py-8 md:mx-8 md:py-10 lg:mx-16">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Image */}
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <div className="relative aspect-4/3 overflow-hidden rounded-4xl sm:aspect-5/4 lg:aspect-4/5">
                            {hasImage ? (
                                <Image
                                    src={resolvedImageSrc}
                                    alt={imageAlt ?? ""}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority={false}
                                />
                            ) : null}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            {badge}
                        </div>

                        <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            {renderHeadingLines(headingLines)}
                        </h2>

                        <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-prose">
                            {renderBodyWithParagraphBreaks(body)}
                        </p>

                        <Link
                            href="/about"
                            className="mt-6 inline-flex min-h-12 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
                        >
                            Meet Levi Quilliam
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>

                        <div className="mt-6 border-t border-border" />

                        <div className="mt-2">
                            {features.map((feature, idx) => {
                                const Icon = FEATURE_ICONS[feature.icon];
                                return (
                                    <div
                                        key={feature.title}
                                        className={`grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 py-4 md:grid-cols-[auto_9rem_1fr] ${
                                            idx !== 0 ? "border-t border-border" : ""
                                        }`}
                                    >
                                        <div className="pt-0.5">
                                            <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                                        </div>

                                        <div className="text-lg font-semibold text-foreground">
                                            {feature.title}
                                        </div>

                                        <p className="text-sm md:text-base leading-relaxed text-muted-foreground md:col-start-3">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
