import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export type AboutFAQProps = {
    badge: string;
    title: string;
    description: string;
    items: ReadonlyArray<{ id: string; question: string; answer: string }>;
};

export function AboutFAQ(props: AboutFAQProps) {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none">
                    <CardContent className="px-6">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            {props.badge}
                        </div>
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            {props.title}
                        </h2>
                        <Accordion type="single" collapsible className="mt-6">
                            {props.items.map((item) => (
                                <AccordionItem key={item.id} value={item.id}>
                                    <AccordionTrigger>{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {item.answer}
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
