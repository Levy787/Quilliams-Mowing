"use client";

import Link from "next/link";
import * as React from "react";
import { Plus } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FaqItem = {
    id: string;
    question: string;
    answer: string;
};

const FAQS: FaqItem[] = [
    {
        id: "cost",
        question: "How much does a garden makeover cost?",
        answer:
            "Costs vary based on the size of the space and the scope of work. We’ll recommend options that fit your goals after a quick chat and site visit.",
    },
    {
        id: "permission",
        question: "Will I need planning permission for my project?",
        answer:
            "It depends on the type of work and local requirements. We can help you understand what may be needed before you commit to the project.",
    },
    {
        id: "duration",
        question: "How long will the work take?",
        answer:
            "Timelines depend on the complexity of the design and site conditions. We’ll share a clear schedule once we confirm the plan and materials.",
    },
    {
        id: "existing",
        question: "Can you work with my existing garden features?",
        answer:
            "Yes—where possible, we can incorporate existing features into the new design. We’ll advise what can be kept, improved, or repositioned.",
    },
    {
        id: "maintenance",
        question: "Do you offer maintenance after the project is finished?",
        answer:
            "We can discuss ongoing upkeep options to help your garden stay in great shape. The right plan depends on the planting and your preferences.",
    },
    {
        id: "areas",
        question: "What areas do you cover?",
        answer:
            "Coverage depends on your location and the type of job. Send us your postcode and we’ll confirm availability and next steps.",
    },
];

export function FAQ() {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Left */}
                    <div className="lg:pt-6">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            FAQs
                        </div>

                        <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            Answering your
                            <br />
                            questions
                        </h2>

                        <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-md">
                            Got more questions? Reach out to us using the button below
                        </p>

                        <div className="mt-7">
                            <Button asChild>
                                <Link href="/contact">Get In Touch</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="min-w-0">
                        <Accordion type="single" collapsible className="space-y-4">
                            {FAQS.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className={cn(
                                        "rounded-2xl border border-border bg-background px-6",
                                        "overflow-hidden",
                                        "data-[state=open]:bg-accent/40"
                                    )}
                                >
                                    <AccordionTrigger
                                        className={cn(
                                            "py-5 text-base font-medium no-underline hover:no-underline",
                                            "flex items-center justify-between",
                                            "hover:bg-accent/50",
                                            "-mx-6 px-6 rounded-2xl",
                                            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                                            "[&>svg]:hidden"
                                        )}
                                    >
                                        <span className="pr-6">{item.question}</span>
                                        <Plus
                                            className={cn(
                                                "h-5 w-5 shrink-0 text-muted-foreground",
                                                "transition-transform duration-200",
                                                "data-[state=open]:rotate-45"
                                            )}
                                            aria-hidden="true"
                                        />
                                    </AccordionTrigger>

                                    <AccordionContent className="pb-5 text-muted-foreground">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}

