import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

type PricingFaqItem = {
    q: string;
    a: string;
};

export type PricingFAQProps = {
    badge: string;
    heading: string;
    items: readonly PricingFaqItem[];
};

export function PricingFAQ({ badge, heading, items }: PricingFAQProps) {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none">
                    <CardContent className="px-6">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            {badge}
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            {heading}
                        </h2>
                        <Accordion type="single" collapsible className="mt-6">
                            {items.map((item, index) => (
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
