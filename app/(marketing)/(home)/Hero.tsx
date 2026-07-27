import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
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
    secondaryCtaLabel,
    secondaryCtaHref,
    imagesLeft,
    imagesRight,
}: HeroProps) {
    return (
        <section
            className="bg-gray-900 pt-8 pb-4 md:pt-16 lg:py-0 mx-4 md:mx-8 lg:mx-16 rounded-4xl relative overflow-hidden"
            style={{
                backgroundImage: 'url(/patterns/pattern-1.png)',
                backgroundRepeat: 'repeat',
                backgroundBlendMode: 'overlay',
            }}
        >
            <div className="container mx-auto px-4 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-12 lg:gap-16 items-center">
                    {/* Content Area - Left Side */}
                    <div className="min-w-0 space-y-5 md:space-y-8">
                        {/* Heading */}
                        <h1
                            className="text-[2.125rem] text-white md:text-5xl lg:text-6xl font-bold leading-tight"
                            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                        >
                            {headlineParts.map((part, index) => (
                                <span
                                    key={index}
                                    className={part.tone === "primary" ? "text-primary" : undefined}
                                >
                                    {part.text}
                                </span>
                            ))}
                        </h1>

                        {/* Subheading */}
                        <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-2xl">
                            {subheading}
                        </p>

                        {/* Primary action stays visually dominant; pricing answers early cost questions. */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                            <Button size="lg" className="px-3" asChild>
                                <Link
                                    href={primaryCtaHref}
                                >
                                    {primaryCtaLabel}
                                </Link>
                            </Button>

                            <Link
                                href={secondaryCtaHref}
                                className="inline-flex min-h-12 items-center gap-1.5 px-1 text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white"
                            >
                                {secondaryCtaLabel}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>

                            <a
                                href="tel:+447593121621"
                                className="flex min-h-12 items-center gap-2 text-white/90 hover:text-white transition-colors group"
                            >
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <Phone className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <span className="text-lg font-medium">07593 121 621</span>
                            </a>
                        </div>
                    </div>

                    {/* Image Grid - Right Side */}
                    <div
                        className="rounded-xl grid grid-cols-2 gap-4 h-[400px] md:h-[500px] lg:h-[700px] w-full max-w-full overflow-hidden min-w-0"
                        style={{ contentVisibility: "auto", containIntrinsicSize: "0 400px" }}
                    >
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
                                <div key={`dup-${index}`} className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                    {resolveImageSrc(image) ? (
                                        <Image
                                            src={resolveImageSrc(image)}
                                            alt={image.alt ?? ""}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 45vw, 18vw"
                                            quality={60}
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
                                        />
                                    ) : null}
                                </div>
                            ))}
                            {imagesRight.map((image, index) => (
                                <div key={`dup-${index}`} className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                    {resolveImageSrc(image) ? (
                                        <Image
                                            src={resolveImageSrc(image)}
                                            alt={image.alt ?? ""}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 45vw, 18vw"
                                            quality={60}
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
