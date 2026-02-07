'use client'

import Link from "next/link";
import Image from "next/image";
import { FileText, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type HeroHeadlineTone = "normal" | "primary" | "muted";

type HeroHeadlinePart = {
    text: string;
    tone: HeroHeadlineTone;
};

type HeroImage = {
    file?: string | null;
    src?: string | null;
    alt?: string | null;
} & Record<string, string | null | undefined>;

export type HeroProps = {
    headlineParts: readonly HeroHeadlinePart[];
    subheading: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    imagesLeft: ReadonlyArray<HeroImage>;
    imagesRight: ReadonlyArray<HeroImage>;
};

function resolveImageSrc(image: HeroImage): string {
    const file = image.file?.trim();
    if (file) return `/images/uploads/${file}`;

    return image.src?.trim() ? image.src : "";
}

export function Hero({
    headlineParts,
    subheading,
    primaryCtaLabel,
    primaryCtaHref,
    imagesLeft,
    imagesRight,
}: HeroProps) {
    return (
        <section
            className="bg-gray-900 pt-16 pb-4 lg:py-0 mx-4 md:mx-8 lg:mx-16 rounded-4xl relative overflow-hidden"
            style={{
                backgroundImage: 'url(/patterns/pattern-1.png)',
                backgroundRepeat: 'repeat',
                backgroundBlendMode: 'overlay',
            }}
        >
            <div className="container mx-auto px-4 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-12 lg:gap-16 items-center">
                    {/* Content Area - Left Side */}
                    <div className="space-y-8 min-w-0">
                        {/* Heading */}
                        <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-bold leading-tight">
                            {headlineParts.map((part, index) => (
                                <span
                                    key={index}
                                    className={part.tone === "primary" ? "text-green-600" : undefined}
                                >
                                    {part.text}
                                </span>
                            ))}
                        </h1>

                        {/* Subheading */}
                        <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-2xl">
                            {subheading}
                        </p>

                        {/* CTA Buttons - Updated with phone number */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
                                <Link href={primaryCtaHref}>
                                    <FileText className="w-5 h-5" aria-hidden="true" />
                                    {primaryCtaLabel}
                                </Link>
                            </Button>

                            {/* Phone number instead of secondary CTA */}
                            <a 
                                href="tel:07593121621" 
                                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
                            >
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <Phone className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <span className="text-lg font-medium">07593 121 621</span>
                            </a>
                        </div>
                    </div>

                    {/* Image Grid - Right Side */}
                    <div className="rounded-xl grid grid-cols-2 gap-4 h-[700px] w-full max-w-full overflow-hidden min-w-0">
                        {/* Column 1 - Scrolling Down */}
                        <div className="flex flex-col gap-2 animate-scroll-down">
                            {imagesLeft.map((image, index) => (
                                <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                    {resolveImageSrc(image) ? (
                                        <Image
                                            src={resolveImageSrc(image)}
                                            alt={image.alt ?? ""}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 45vw, 18vw"
                                            quality={60}
                                            priority={index === 0}
                                            fetchPriority={index === 0 ? "high" : "auto"}
                                        />
                                    ) : null}
                                </div>
                            ))}
                            {imagesLeft.map((image, index) => (
                                <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                    {resolveImageSrc(image) ? (
                                        <Image
                                            src={resolveImageSrc(image)}
                                            alt={image.alt ?? ""}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 45vw, 18vw"
                                            quality={60}
                                            priority={index === 0}
                                            fetchPriority={index === 0 ? "high" : "auto"}
                                        />
                                    ) : null}
                                </div>
                            ))}

                        </div>

                        {/* Column 2 - Scrolling Up */}
                        <div className="flex flex-col gap-2 animate-scroll-up">
                            {imagesRight.map((image, index) => (
                                <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                    {resolveImageSrc(image) ? (
                                        <Image
                                            src={resolveImageSrc(image)}
                                            alt={image.alt ?? ""}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 45vw, 18vw"
                                            quality={60}
                                            priority={index === 0}
                                            fetchPriority={index === 0 ? "high" : "auto"}
                                        />
                                    ) : null}
                                </div>
                            ))}
                            {imagesRight.map((image, index) => (
                                <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                    {resolveImageSrc(image) ? (
                                        <Image
                                            src={resolveImageSrc(image)}
                                            alt={image.alt ?? ""}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 45vw, 18vw"
                                            quality={60}
                                            priority={index === 0}
                                            fetchPriority={index === 0 ? "high" : "auto"}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
