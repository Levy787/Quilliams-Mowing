import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type AboutHeroProps = {
    badge: string;
    headline: string;
    subheading: string;
    features: ReadonlyArray<{ strong: string; text: string }>;
    ctas: {
        primary: { label: string; href: string };
        secondary: { label: string; href: string };
        phone: { label: string; href: string };
    };
    footnote: string;
    image: {
        imageFile?: string | null;
        imageSrc?: string | null;
        imageAlt?: string | null;
    };
};

export function AboutHero(props: AboutHeroProps) {
    const resolvedImageSrc = (props.image?.imageFile?.trim()
        ? `/images/uploads/${props.image.imageFile}`
        : props.image?.imageSrc) ?? "";
    const hasImage = Boolean(resolvedImageSrc.trim());

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
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                            {/* Copy */}
                            <div className="p-6 md:p-10">
                                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                    {props.badge}
                                </div>

                                <h1 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                                    {props.headline}
                                </h1>

                                <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                                    {props.subheading}
                                </p>

                                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                    {props.features.map((feature) => (
                                        <div
                                            key={feature.strong}
                                            className="rounded-3xl border border-border bg-background/70 px-5 py-4"
                                        >
                                            <div className="flex items-start gap-2">
                                                <BadgeCheck
                                                    className="mt-0.5 h-5 w-5 text-primary"
                                                    aria-hidden
                                                />
                                                <div className="text-sm text-muted-foreground">
                                                    <span className="font-semibold text-foreground">{feature.strong}</span>{" "}
                                                    {feature.text}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button size="lg" asChild>
                                        <Link href={props.ctas.primary.href}>
                                            {props.ctas.primary.label}
                                            <ArrowRight className="h-5 w-5" aria-hidden />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href={props.ctas.secondary.href}>{props.ctas.secondary.label}</Link>
                                    </Button>
                                    <Button size="lg" variant="ghost" asChild>
                                        <Link href={props.ctas.phone.href}>
                                            <Phone className="h-5 w-5" aria-hidden />
                                            {props.ctas.phone.label}
                                        </Link>
                                    </Button>
                                </div>

                                <p className="mt-5 text-sm text-muted-foreground">
                                    {props.footnote}
                                </p>
                            </div>

                            {/* Headshot */}
                            <div className="relative m-6 bg-muted/30 rounded-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-t from-background/50 via-transparent to-transparent" aria-hidden="true" />
                                <div className="relative  h-full min-h-80 lg:min-h-140">
                                    {hasImage ? (
                                        <Image
                                            src={resolvedImageSrc}
                                            alt={props.image?.imageAlt || ""}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                            priority={false}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
