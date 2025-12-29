'use client'

import Link from "next/link";
import Image from "next/image";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="text-green-400">Designing landscapes</span>{" "}
                            <span className="text-white">
                                that grow with beauty, and last for generations.
                            </span>
                        </h1>
                        b

                        {/* Subheading */}
                        <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-2xl">
                            Transforming lawns, gardens, and landscapes into vibrant,
                            sustainable spaces that enhance beauty and bring nature closer to
                            you.
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
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/237/400/600"
                                    alt="Wooden pergola with landscaped garden area"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/300/400/600"
                                    alt="Close-up of hands trimming a hedge with garden shears"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/180/400/600"
                                    alt="Beautiful green lawn with landscaping"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/292/400/600"
                                    alt="Garden maintenance tools and equipment"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            {/* Duplicate for seamless loop */}
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/237/400/600"
                                    alt="Wooden pergola with landscaped garden area"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/300/400/600"
                                    alt="Close-up of hands trimming a hedge with garden shears"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/180/400/600"
                                    alt="Beautiful green lawn with landscaping"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/292/400/600"
                                    alt="Garden maintenance tools and equipment"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                        </div>

                        {/* Column 2 - Scrolling Up */}
                        <div className="flex flex-col gap-2 animate-scroll-up">
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/200/400/600"
                                    alt="Professional gardener holding gardening equipment"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/20/400/600"
                                    alt="Person using a hedge trimmer on bushes"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/152/400/600"
                                    alt="Flowering plants in landscaped garden bed"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/225/400/600"
                                    alt="Lush garden with stone pathway"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            {/* Duplicate for seamless loop */}
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/200/400/600"
                                    alt="Professional gardener holding gardening equipment"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/20/400/600"
                                    alt="Person using a hedge trimmer on bushes"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/152/400/600"
                                    alt="Flowering plants in landscaped garden bed"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://picsum.photos/id/225/400/600"
                                    alt="Lush garden with stone pathway"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
