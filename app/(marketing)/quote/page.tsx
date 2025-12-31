import QuoteClient from "./QuoteClient";

import { getQuoteContent } from "@/lib/keystatic-reader";

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

