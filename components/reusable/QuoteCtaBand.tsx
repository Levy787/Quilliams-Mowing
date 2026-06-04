import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

const PHONE_TEL = "+447593121621";
const PHONE_DISPLAY = "07593 121 621";

export type QuoteCtaBandProps = {
    heading?: string;
    body?: string;
    ctaLabel?: string;
    ctaHref?: string;
    /** Show the phone number as a secondary contact option. Defaults to true. */
    showPhone?: boolean;
};

/**
 * Reusable closing call-to-action band that funnels visitors to the quote form.
 * Matches the site's dark, rounded section aesthetic (see LargeCta) and works as a
 * server component so it can drop into any server-rendered page without extra cost.
 */
export function QuoteCtaBand({
    heading = "Ready for a tidy, well-kept garden?",
    body = "Tell me a little about your garden and I'll send a clear, fixed quote, usually within 24 hours. No obligation, no pushy sales.",
    ctaLabel = "Get my free quote",
    ctaHref = "/quote",
    showPhone = true,
}: QuoteCtaBandProps) {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 my-12 md:my-16">
            <div className="relative overflow-hidden rounded-4xl bg-gray-900 px-6 py-12 md:px-12 md:py-16 text-center">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[url('/patterns/pattern-2.png')] bg-repeat opacity-10"
                />
                <div className="relative z-10 mx-auto max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                        {heading}
                    </h2>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-white/80">
                        {body}
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="lg" asChild>
                            <Link href={ctaHref}>
                                {ctaLabel}
                                <ArrowRight className="h-5 w-5" aria-hidden="true" />
                            </Link>
                        </Button>
                        {showPhone ? (
                            <a
                                href={`tel:${PHONE_TEL}`}
                                className="inline-flex min-h-12 items-center gap-2 text-white/90 hover:text-white transition-colors"
                            >
                                <Phone className="h-5 w-5" aria-hidden="true" />
                                <span className="font-medium">{PHONE_DISPLAY}</span>
                            </a>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
