import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LargeCta() {
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
                        <Image
                            src="https://picsum.photos/id/1018/1200/900"
                            alt="Modern landscaped garden and outdoor living space"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            priority={false}
                        />
                    </div>

                    {/* Center Content */}
                    <div className="text-center space-y-6">
                        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                            Let’s create a
                            <br />
                            garden you’ll love
                        </h2>

                        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                            Let’s turn your outdoor space into something beautiful. Get in touch for a free consultation today.
                        </p>

                        <div className="pt-2">
                            <Button size="lg" asChild>
                                <Link href="/contact">
                                    Talk To The Team
                                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative w-full overflow-hidden rounded-4xl h-80 sm:h-90 lg:h-115 mt-12">
                        <Image
                            src="https://picsum.photos/id/1027/900/1400"
                            alt="Gardener trimming a hedge"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 25vw"
                            priority={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

