import Link from "next/link";
import { FileText, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type QuoteActionStripProps = {
    heading?: string;
    body?: string;
    ctaLabel?: string;
    ctaHref?: string;
    phoneLabel?: string;
    showPhone?: boolean;
    contained?: boolean;
    className?: string;
};

const PHONE_TEL = "+447593121621";

export function QuoteActionStrip({
    heading = "Need a quote for your garden?",
    body = "Send a few details and photos if you have them. Levi will come back with a clear price.",
    ctaLabel = "Get a quote",
    ctaHref = "/quote",
    phoneLabel = "Call 07593 121 621",
    showPhone = true,
    contained = false,
    className,
}: QuoteActionStripProps) {
    const content = (
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5">
            <div className="absolute inset-0 bg-[url('/patterns/pattern-2.png')] bg-repeat opacity-25" />
            <div className="relative flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                <div className="min-w-0 max-w-2xl">
                    <h2 className="text-xl font-semibold text-foreground md:text-2xl">
                        {heading}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {body}
                    </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href={ctaHref}>
                            <FileText className="h-5 w-5" aria-hidden="true" />
                            {ctaLabel}
                        </Link>
                    </Button>
                    {showPhone ? (
                        <a
                            href={`tel:${PHONE_TEL}`}
                            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary sm:w-auto"
                        >
                            <Phone className="h-5 w-5" aria-hidden="true" />
                            {phoneLabel}
                        </a>
                    ) : null}
                </div>
            </div>
        </div>
    );

    if (contained) {
        return <section className={cn("mt-10", className)}>{content}</section>;
    }

    return (
        <section className={cn("mx-4 py-6 md:mx-8 md:py-8 lg:mx-16", className)}>
            <div className="container mx-auto px-4 lg:px-12">{content}</div>
        </section>
    );
}
