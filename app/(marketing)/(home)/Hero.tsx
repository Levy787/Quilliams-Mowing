'use client'

import Link from "next/link";
import Image from "next/image";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const COVER_IMAGES_LEFT = [
    {
        src: "/images/IMG_20240509_41792.webp",
        alt: "Garden with freshly cut hedges and a neat lawn"
    },
    {
        src: "/images/IMG_20250704_93515.webp",
        alt: "Freshly mown lawn with trimmed hedges in a private garden"
    },
    {
        src: "/images/IMG_20250708_11200.webp",
        alt: "Tidy garden lawn with freshly cut hedges and clean edges"
    },
]

const COVER_IMAGES_RIGHT = [
    {
        src: "/images/IMG_20250708_16272.webp",
        alt: "Well-kept garden with freshly trimmed hedges and a neat lawn"
    },
    {
        src: "/images/IMG_20250708_34242.webp",
        alt: "Garden after hedge trimming with a fresh cut lawn"
    },
    {
        src: "/images/IMG_20250715_29185.webp",
        alt: "Freshly maintained garden with trimmed hedges and clean lawn lines"
    },
]

export function Hero() {
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
                            Professional{" "}
                            <span className="text-green-400">Landscaping</span>
                            ,{" "}
                            <span className="text-green-400">Gardening</span>
                            , and{" "}
                            <span className="text-green-400">Lawn Care</span>
                            {" "}You Can Rely On
                        </h1>

                        {/* Subheading */}
                        <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-2xl">
                            From weekly mowing and garden maintenance to full yard clean-ups and landscape improvements, we deliver stress-free, dependable care that keeps your outdoor spaces beautiful, functional, and something you can truly be proud of.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" asChild>
                                <Link href="/quote">
                                    <FileText className="w-5 h-5" aria-hidden="true" />
                                    Get Your Quote
                                </Link>
                            </Button>

                            <Button variant="outline" size="lg" asChild>
                                <Link href="/contact">
                                    Contact Us
                                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Image Grid - Right Side */}
                    <div className="rounded-xl grid grid-cols-2 gap-4 h-[700px] w-full max-w-full overflow-hidden min-w-0">
                        {/* Column 1 - Scrolling Down */}
                        <div className="flex flex-col gap-2 animate-scroll-down">
                            {COVER_IMAGES_LEFT.map((image, index) => (
                                <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                    />
                                </div>
                            ))}
                            {COVER_IMAGES_LEFT.map((image, index) => (
                                <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                    />
                                </div>
                            ))}

                        </div>

                        {/* Column 2 - Scrolling Up */}
                        <div className="flex flex-col gap-2 animate-scroll-up">
                            {COVER_IMAGES_RIGHT.map((image, index) => (
                                <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                    />
                                </div>
                            ))}
                            {COVER_IMAGES_RIGHT.map((image, index) => (
                                <div key={index} className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 20vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
