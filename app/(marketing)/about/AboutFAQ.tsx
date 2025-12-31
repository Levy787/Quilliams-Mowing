import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = [
    {
        q: "Do you only do ongoing maintenance?",
        a: "No — I do both ongoing garden maintenance and one-off cleanups/refreshes. We’ll figure out what makes sense for your space.",
    },
    {
        q: "Can I get a quote without an inspection?",
        a: "Often, yes. A short description and a few photos is usually enough for an initial quote. If anything’s unclear, I’ll ask follow-up questions.",
    },
    {
        q: "What areas do you cover?",
        a: "I work locally and can confirm availability quickly once you send your suburb/address.",
    },
    {
        q: "Do you take away green waste?",
        a: "Green waste handling depends on the job and your preference. We can discuss options when confirming scope.",
    },
    {
        q: "How do I book?",
        a: "Use the quote form or contact page. I’ll confirm timing, scope, and next steps.",
    },
] as const;

export function AboutFAQ() {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none">
                    <CardContent className="px-6">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            FAQ
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Quick answers.
                        </h2>
                        <Accordion type="single" collapsible className="mt-6">
                            {FAQ.map((item, index) => (
                                <AccordionItem key={item.q} value={`q${index + 1}`}>
                                    <AccordionTrigger>{item.q}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
