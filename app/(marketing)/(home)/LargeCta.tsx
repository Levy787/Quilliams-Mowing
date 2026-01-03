import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export type LargeCtaProps = {
    leftImageFile?: string | null;
    leftImageUrl?: string | null;
    leftImageAlt?: string | null;
    rightImageFile?: string | null;
    rightImageUrl?: string | null;
    rightImageAlt?: string | null;
    headingLines: readonly string[];
    body: string;
    ctaLabel: string;
    ctaHref: string;
};

function resolveKeystaticUploadUrl({
    file,
    url,
}: {
    file?: string | null;
    url?: string | null;
}): string {
    if (file?.trim()) return `/images/uploads/${file}`;
    return url?.trim() ?? "";
}

function renderHeadingLines(lines: readonly string[]) {
    return lines.map((line, index) => (
        <span key={index}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
        </span>
    ));
}

export function LargeCta({
    leftImageFile,
    leftImageUrl,
    leftImageAlt,
    rightImageFile,
    rightImageUrl,
    rightImageAlt,
    headingLines,
    body,
    ctaLabel,
    ctaHref,
}: LargeCtaProps) {
    const resolvedLeftImageUrl = resolveKeystaticUploadUrl({
        file: leftImageFile,
        url: leftImageUrl,
    });
    const resolvedRightImageUrl = resolveKeystaticUploadUrl({
        file: rightImageFile,
        url: rightImageUrl,
    });
    const hasLeftImage = Boolean(resolvedLeftImageUrl);
    const hasRightImage = Boolean(resolvedRightImageUrl);

    return (
        <section
            className="bg-gray-900 mx-4 md:mx-8 lg:mx-16 rounded-4xl relative overflow-hidden py-16 lg:py-20"
            style={{
                backgroundImage: "url(/patterns/pattern-2.svg)",
                backgroundRepeat: "repeat",
                backgroundBlendMode: "screen",
                opacity: 1,
            }}
        >
            <div className="container mx-auto px-4 lg:px-12 relative z-10">
                <div className="grid gap-10 items-center lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)_minmax(0,1fr)]">
                    {/* Left Image */}
                    <div className="relative overflow-hidden rounded-4xl h-80 sm:h-95 lg:h-115 mb-12">
                        {hasLeftImage ? (
                            <Image
                                src={resolvedLeftImageUrl}
                                alt={leftImageAlt ?? ""}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                priority={false}
                            />
                        ) : null}
                    </div>

                    {/* Center Content */}
                    <div className="text-center space-y-6">
                        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                            {renderHeadingLines(headingLines)}
                        </h2>

                        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                            {body}
                        </p>

                        <div className="pt-2">
                            <Button size="lg" asChild>
                                <Link href={ctaHref}>
                                    {ctaLabel}
                                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative w-full overflow-hidden rounded-4xl h-80 sm:h-90 lg:h-115 mt-12">
                        {hasRightImage ? (
                            <Image
                                src={resolvedRightImageUrl}
                                alt={rightImageAlt ?? ""}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 25vw"
                                priority={false}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}

