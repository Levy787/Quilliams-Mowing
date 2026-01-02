"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
    ProjectDetail,
    ProjectsLandingContent,
} from "@/lib/keystatic-reader";

function resolveImageSrc({
    file,
    src,
}: {
    file?: string | null;
    src?: string | null;
}): string {
    if (file?.trim()) return `/images/uploads/${file}`;
    return src ?? "";
}

export default function ProjectsClient({
    content,
    projects,
}: {
    content: ProjectsLandingContent;
    projects: ReadonlyArray<ProjectDetail>;
}) {
    const shouldReduceMotion = !!useReducedMotion();
    const EASE_OUT = [0.16, 1, 0.3, 1] as const;

    const fadeUp = shouldReduceMotion
        ? {}
        : {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.25 },
              transition: { duration: 0.6, ease: EASE_OUT },
          };

    const featuredSlugs = new Set(content.featured.featuredSlugs);
    const featured = projects.filter((p) => featuredSlugs.has(p.slug)).slice(0, 3);

    const heroImageSrc = resolveImageSrc({
        file: content.hero.image.file,
        src: content.hero.image.src,
    });

    return (
        <main>
            {/* Hero */}
            <section className="mx-4 md:mx-8 lg:mx-16 pt-12 md:pt-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl bg-foreground text-background">
                        <div className="absolute inset-0 bg-[url('/patterns/pattern-1.png')] bg-repeat opacity-10" />
                        <div className="relative p-6 md:p-10">
                            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
                                <motion.div {...fadeUp} className="min-w-0">
                                    <div className="inline-flex items-center rounded-full bg-background/10 px-4 py-1.5 text-sm text-background">
                                        {content.hero.badge}
                                    </div>

                                    <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
                                        {content.hero.title}
                                    </h1>

                                    <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-background/75">
                                        {content.hero.description}
                                    </p>

                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <Button asChild size="lg">
                                            <Link href={content.hero.primaryCta.href}>
                                                {content.hero.primaryCta.label}
                                            </Link>
                                        </Button>
                                        <Button asChild size="lg" variant="outline">
                                            <Link href={content.hero.secondaryCta.href}>
                                                {content.hero.secondaryCta.label}
                                            </Link>
                                        </Button>
                                    </div>

                                    <div className="mt-7 flex flex-wrap gap-3 text-sm">
                                        {content.hero.chips.map((chip) => (
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
                                            {heroImageSrc ? (
                                                <Image
                                                    src={heroImageSrc}
                                                    alt={content.hero.image.alt ?? ""}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                                    priority
                                                />
                                            ) : null}
                                            <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
                                            {content.hero.image.caption?.trim() ? (
                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <div className="max-w-md text-sm leading-relaxed text-background/80">
                                                        {content.hero.image.caption}
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured showcase */}
            {featured.length ? (
                <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
                    <div className="container mx-auto px-4 lg:px-12">
                        <motion.div {...fadeUp} className="max-w-2xl">
                            <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                {content.featured.badge}
                            </div>
                            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                {content.featured.title}
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                {content.featured.description}
                            </p>
                        </motion.div>

                        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
                            {/* Big tile */}
                            <Link
                                href={`/projects/${featured[0].slug}`}
                                className="lg:col-span-7"
                            >
                                <Card className="group relative overflow-hidden rounded-4xl border-border shadow-none">
                                    <div className="relative aspect-16/10 w-full">
                                        {featured[0].hero.imageSrc ? (
                                            <Image
                                                src={featured[0].hero.imageSrc}
                                                alt={featured[0].hero.imageAlt}
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1024px) 58vw, 100vw"
                                                priority
                                            />
                                        ) : null}
                                        <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="text-xl md:text-2xl font-semibold text-background">
                                                {featured[0].title}
                                            </div>
                                            <div className="mt-2 max-w-xl text-sm leading-relaxed text-background/80">
                                                {featured[0].subtitle}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>

                            {/* Two smaller tiles */}
                            <div className="grid grid-cols-1 gap-6 lg:col-span-5">
                                {featured.slice(1, 3).map((p) => (
                                    <Link key={p.slug} href={`/projects/${p.slug}`}>
                                        <Card className="group relative overflow-hidden rounded-4xl border-border shadow-none">
                                            <div className="relative aspect-16/11 w-full">
                                                {p.hero.imageSrc ? (
                                                    <Image
                                                        src={p.hero.imageSrc}
                                                        alt={p.hero.imageAlt}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(min-width: 1024px) 42vw, 100vw"
                                                    />
                                                ) : null}
                                                <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/10 to-transparent" />
                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <div className="text-lg font-semibold text-background">
                                                        {p.title}
                                                    </div>
                                                    <div className="mt-2 text-sm leading-relaxed text-background/80">
                                                        {p.subtitle}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Projects index */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <motion.div {...fadeUp} className="max-w-2xl">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            {content.allProjects.badge}
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            {content.allProjects.title}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                            {content.allProjects.description}
                        </p>
                    </motion.div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((p, index) => (
                            <motion.div
                                key={p.slug}
                                {...(shouldReduceMotion
                                    ? {}
                                    : {
                                          initial: { opacity: 0, y: 12 },
                                          whileInView: { opacity: 1, y: 0 },
                                          viewport: { once: true, amount: 0.2 },
                                          transition: {
                                              duration: 0.55,
                                              ease: EASE_OUT,
                                              delay: 0.03 * index,
                                          },
                                      })}
                            >
                                <Card className="rounded-4xl border-border shadow-none overflow-hidden h-full">
                                    <div className="relative aspect-16/10 w-full">
                                        {p.hero.imageSrc ? (
                                            <Image
                                                src={p.hero.imageSrc}
                                                alt={p.hero.imageAlt}
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1024px) 33vw, 100vw"
                                            />
                                        ) : null}
                                    </div>
                                    <CardContent className="px-6 py-6">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="text-lg font-semibold text-foreground">
                                                    {p.title}
                                                </div>
                                                {p.locationLabel ? (
                                                    <div className="mt-1 text-sm text-muted-foreground">
                                                        {p.locationLabel}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                            {p.subtitle}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {p.chips.map((t) => (
                                                <div
                                                    key={t}
                                                    className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                                                >
                                                    {t}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-5">
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="w-full"
                                            >
                                                <Link href={`/projects/${p.slug}`}>
                                                    View project
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="relative overflow-hidden rounded-4xl bg-foreground text-background">
                        <div className="absolute inset-0 bg-[url('/patterns/pattern-1.png')] bg-repeat opacity-10" />
                        <div className="relative p-6 md:p-10">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div className="min-w-0">
                                    <div className="text-2xl md:text-3xl font-semibold">
                                        {content.finalCta.title}
                                    </div>
                                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-background/75">
                                        {content.finalCta.description}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button asChild size="lg">
                                        <Link href={content.finalCta.primaryCta.href}>
                                            {content.finalCta.primaryCta.label}
                                        </Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline">
                                        <Link href={content.finalCta.secondaryCta.href}>
                                            {content.finalCta.secondaryCta.label}
                                        </Link>
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
