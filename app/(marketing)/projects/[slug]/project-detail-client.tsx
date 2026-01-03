"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProjectDetail, ProjectPattern } from "@/lib/keystatic-reader";

function patternUrl(pattern: ProjectPattern): string {
    return pattern === "pattern-1"
        ? "url('/patterns/pattern-1.png')"
        : "url('/patterns/pattern-2.svg')";
}

function parseYouTubeVideoId(url: string): string | null {
    try {
        const parsed = new URL(url);

        if (parsed.hostname === "youtu.be") {
            const id = parsed.pathname.replace("/", "").trim();
            return id || null;
        }

        if (
            parsed.hostname.endsWith("youtube.com") ||
            parsed.hostname.endsWith("youtube-nocookie.com")
        ) {
            const pathname = parsed.pathname;

            // https://www.youtube.com/watch?v=VIDEO_ID
            const v = parsed.searchParams.get("v");
            if (v?.trim()) return v;

            // https://youtube.com/shorts/VIDEO_ID
            const shortsMatch = pathname.match(/\/shorts\/([^/?#]+)/);
            if (shortsMatch?.[1]) return shortsMatch[1];

            // https://www.youtube.com/embed/VIDEO_ID
            const embedMatch = pathname.match(/\/embed\/([^/?#]+)/);
            if (embedMatch?.[1]) return embedMatch[1];
        }

        return null;
    } catch {
        return null;
    }
}

function buildYouTubeEmbedUrl(videoId: string): string {
    const base = `https://www.youtube-nocookie.com/embed/${videoId}`;
    const params = new URLSearchParams({
        autoplay: "1",
        mute: "1",
        loop: "1",
        playlist: videoId,
        controls: "0",
        playsinline: "1",
        modestbranding: "1",
        rel: "0",
    });
    return `${base}?${params.toString()}`;
}

export default function ProjectDetailClient({
    project,
}: {
    project: ProjectDetail;
}) {
    const shouldReduceMotion = !!useReducedMotion();
    const EASE_OUT = [0.16, 1, 0.3, 1] as const;

    const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
    const [activeGalleryIndex, setActiveGalleryIndex] = React.useState(0);
    const galleryCount = project.gallery.length;
    const activeGalleryItem = project.gallery[activeGalleryIndex];

    function openGalleryAt(index: number) {
        setActiveGalleryIndex(index);
        setIsGalleryOpen(true);
    }

    function goPrev() {
        setActiveGalleryIndex((i) => (i - 1 + galleryCount) % galleryCount);
    }

    function goNext() {
        setActiveGalleryIndex((i) => (i + 1) % galleryCount);
    }

    const fadeUp = shouldReduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 12 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.25 },
            transition: { duration: 0.6, ease: EASE_OUT },
        };

    const resolvedHeroMedia = (() => {
        const videoSrc = project.heroVideo.videoSrc;
        if (project.template === "video" && videoSrc?.trim()) {
            const youTubeId = parseYouTubeVideoId(videoSrc);
            if (youTubeId) {
                return (
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={buildYouTubeEmbedUrl(youTubeId)}
                        title={project.title}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                );
            }

            return (
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={videoSrc}
                    poster={project.heroVideo.posterSrc || undefined}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
            );
        }

        if (project.hero.imageSrc?.trim()) {
            return (
                <Image
                    src={project.hero.imageSrc}
                    alt={project.hero.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                />
            );
        }

        return null;
    })();

    return (
        <main>
            {/* Hero */}
            <section className="mx-4 md:mx-8 lg:mx-16 pt-12 md:pt-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl bg-foreground text-background">
                        <div
                            className="absolute inset-0 bg-repeat opacity-10"
                            style={{ backgroundImage: patternUrl(project.hero.pattern) }}
                        />
                        <div className="relative p-6 md:p-10">
                            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
                                <motion.div {...fadeUp} className="min-w-0">
                                    <div className="inline-flex items-center rounded-full bg-background/10 px-4 py-1.5 text-sm text-background">
                                        Project
                                    </div>

                                    <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
                                        {project.title}
                                    </h1>

                                    <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-background/75">
                                        {project.subtitle}
                                    </p>

                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <Button asChild size="lg">
                                            <Link href={project.ctas.primaryHref}>
                                                {project.ctas.primaryText}
                                            </Link>
                                        </Button>
                                        <Button asChild size="lg" variant="outline">
                                            <Link href={project.ctas.secondaryHref}>
                                                {project.ctas.secondaryText}
                                            </Link>
                                        </Button>
                                    </div>

                                    <div className="mt-7 flex flex-wrap gap-3 text-sm">
                                        {project.chips.map((chip) => (
                                            <div
                                                key={chip}
                                                className="inline-flex items-center rounded-full bg-background/10 px-3 py-1 text-background/80"
                                            >
                                                {chip}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div
                                    {...(shouldReduceMotion
                                        ? {}
                                        : {
                                            initial: { opacity: 0, y: 12 },
                                            whileInView: { opacity: 1, y: 0 },
                                            viewport: { once: true, amount: 0.25 },
                                            transition: {
                                                duration: 0.65,
                                                ease: EASE_OUT,
                                                delay: 0.05,
                                            },
                                        })}
                                >
                                    <Card className="rounded-4xl overflow-hidden border-border/20 bg-background/5 text-background shadow-none p-0 py-0 gap-0">
                                        <div className="relative aspect-16/11 w-full">
                                            <div className="absolute inset-0 bg-[url('/patterns/pattern-2.svg')] bg-repeat opacity-15" />
                                            {resolvedHeroMedia}
                                            <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
                                        </div>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <motion.div {...fadeUp} className="max-w-2xl">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            {project.overview.label}
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            The story, quickly
                        </h2>
                        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                            {project.overview.paragraphs.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What we did + Result */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl border border-border bg-background">
                        <div className="absolute inset-0 bg-[url('/patterns/pattern-2.svg')] bg-repeat opacity-10" />
                        <div className="relative p-6 md:p-10">
                            <motion.div {...fadeUp} className="max-w-2xl">
                                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                    Breakdown
                                </div>
                                <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                    What changed—and why it works
                                </h2>
                                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                    A clean plan, tidy execution, and a finish that holds up.
                                </p>
                            </motion.div>

                            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
                                <div>
                                    <div className="text-sm font-semibold text-foreground">
                                        {project.whatWeDid.label}
                                    </div>
                                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                        {project.whatWeDid.bullets.map((b) => (
                                            <li key={b} className="flex gap-2">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-foreground">
                                        {project.result.label}
                                    </div>
                                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                        {project.result.bullets.map((b) => (
                                            <li key={b} className="flex gap-2">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <motion.div {...fadeUp} className="max-w-2xl">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            Gallery
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            A few angles
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            A quick visual skim—clean lines, tidy structure, and a finished feel.
                        </p>
                    </motion.div>

                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {project.gallery.map((g, index) => (
                            <motion.div
                                key={`${g.imageSrc}-${index}`}
                                {...(shouldReduceMotion
                                    ? {}
                                    : {
                                        initial: { opacity: 0, y: 12 },
                                        whileInView: { opacity: 1, y: 0 },
                                        viewport: { once: true, amount: 0.2 },
                                        transition: {
                                            duration: 0.55,
                                            ease: EASE_OUT,
                                            delay: 0.04 * index,
                                        },
                                    })}
                            >
                                <button
                                    type="button"
                                    onClick={() => openGalleryAt(index)}
                                    className="block w-full text-left cursor-pointer"
                                    aria-label={`Open image ${index + 1} of ${galleryCount}`}
                                >
                                    <Card className="rounded-4xl border-border shadow-none overflow-hidden h-full p-0">
                                        <div className="relative aspect-16/10 w-full h-full">
                                            <Image
                                                src={g.imageSrc}
                                                alt={g.imageAlt}
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1024px) 33vw, 100vw"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-foreground/10 to-transparent" />
                                            {g.caption ? (
                                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                                    <div className="text-sm leading-relaxed text-background/80">
                                                        {g.caption}
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </Card>
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
                        <DialogContent className="sm:max-w-5xl p-0 overflow-hidden rounded-4xl">
                            <DialogTitle className="sr-only">
                                {project.title} gallery
                            </DialogTitle>
                            <div className="relative">
                                <div className="relative aspect-16/10 w-full bg-muted">
                                    {activeGalleryItem ? (
                                        <Image
                                            src={activeGalleryItem.imageSrc}
                                            alt={activeGalleryItem.imageAlt}
                                            fill
                                            className="object-contain"
                                            sizes="(min-width: 1024px) 80vw, 100vw"
                                            priority
                                        />
                                    ) : null}
                                </div>

                                {galleryCount > 1 ? (
                                    <>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/70"
                                            onClick={goPrev}
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/70"
                                            onClick={goNext}
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                                        </Button>
                                    </>
                                ) : null}
                            </div>

                            <div className="flex items-center justify-between gap-4 border-t border-border bg-background px-4 py-3">
                                <div className="min-w-0">
                                    <div className="text-sm font-medium text-foreground">
                                        {project.title}
                                    </div>
                                    {activeGalleryItem?.caption ? (
                                        <div className="text-sm text-muted-foreground">
                                            {activeGalleryItem.caption}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="shrink-0 text-sm text-muted-foreground">
                                    {activeGalleryIndex + 1} / {galleryCount}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </section>

            {/* Optional FAQ */}
            {project.faq?.length ? (
                <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                    <div className="container mx-auto px-4 lg:px-12">
                        <motion.div {...fadeUp} className="max-w-2xl">
                            <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                FAQs
                            </div>
                            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                Quick answers
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                If you have a similar space, we can recommend a practical approach.
                            </p>
                        </motion.div>

                        <Card className="mt-8 rounded-4xl border-border shadow-none">
                            <CardContent className="px-6 py-2">
                                <Accordion type="single" collapsible className="w-full">
                                    {project.faq.map((item) => (
                                        <AccordionItem key={item.id} value={item.id}>
                                            <AccordionTrigger>
                                                {item.question}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {item.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            ) : null}

            {/* Final CTA */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl bg-foreground text-background">
                        <div className="absolute inset-0 bg-[url('/patterns/pattern-1.png')] bg-repeat opacity-10" />
                        <div className="relative p-6 md:p-10">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div className="min-w-0">
                                    <div className="text-2xl md:text-3xl font-semibold">
                                        Want something similar for your garden?
                                    </div>
                                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-background/75">
                                        Tell us what you want improved and we’ll recommend a practical plan—then quote it clearly.
                                    </p>
                                    <div className="mt-4 text-sm text-background/75">
                                        <Link
                                            href="/projects"
                                            className="underline underline-offset-4"
                                        >
                                            Back to Projects
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button asChild size="lg">
                                        <Link href="/quote">Get a Quote</Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
