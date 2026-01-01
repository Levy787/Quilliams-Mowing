import type { Metadata } from "next";

import QuoteClient from "./QuoteClient";

import { getQuoteContent } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    const quote = await getQuoteContent();

    return buildMetadata({
        seo: quote.seo,
        fallbackTitle: "Get a Quote",
        fallbackDescription: quote.header.description,
    });
}

export default async function QuotePage() {
    const content = await getQuoteContent();

    return (
        <QuoteClient
            header={content.header}
            expect={content.expect}
            calculatorSummary={content.calculatorSummary}
            form={content.form}
        />
    );
}

