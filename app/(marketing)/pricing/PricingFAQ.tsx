import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = [
    {
        q: "Is the calculator a fixed quote?",
        a: "No — it’s a rough guide. We confirm scope based on photos, access, and what’s included, then provide a more accurate range.",
    },
    {
        q: "What’s the fastest way to get an accurate estimate?",
        a: "Send a short description and a few photos from different angles. Include access notes (stairs, narrow gate, parking).",
    },
    {
        q: "Do you charge differently for one-off vs ongoing maintenance?",
        a: "Ongoing maintenance is usually more efficient because we keep the garden under control. One-offs can take longer depending on condition.",
    },
    {
        q: "What about green waste removal?",
        a: "Green waste handling varies by job and preference. We can bag/stack on-site or discuss removal options when quoting.",
    },
    {
        q: "Can you work within a budget range?",
        a: "Often, yes. If you share a rough budget, we can prioritise the highest-impact work first.",
    },
] as const;

export function PricingFAQ() {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none">
                    <CardContent className="px-6">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            FAQ
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Pricing questions.
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
