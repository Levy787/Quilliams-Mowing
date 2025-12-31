
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface CardData {
    name: string;
    location: string;
    date: string;
    quote: string;
}

export type TestimonialsProps = {
    badge: string;
    heading: string;
    description: string;
    items: readonly CardData[];
};

const CreateCard = ({ card }: { card: CardData }) => (
    <Card className="mx-4 w-72 shrink-0 rounded-2xl border border-border bg-background text-muted-foreground shadow-none transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                                key={index}
                                className="size-4 fill-chart-4 text-chart-4"
                                aria-hidden="true"
                            />
                        ))}
                    </div>

                    <p className="text-xs text-muted-foreground">{card.date}</p>
                </div>

                <p className="text-sm leading-relaxed text-foreground/80">{card.quote}</p>

                <div className="pt-1">
                    <p className="font-medium text-foreground">{card.name}</p>
                    <p className="text-sm font-medium">-{card.location}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);

export function Testimonials({ badge, heading, description, items }: TestimonialsProps) {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-12 text-center">
                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                    {badge}
                </div>

                <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    {heading}
                </h2>

                <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
                    {description}
                </p>

                <div className="mt-10 marquee-row w-full mx-auto max-w-7xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-background to-transparent" />
                    <div className="marquee-inner flex transform-gpu min-w-[200%] pb-6">
                        {[...items, ...items].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-background to-transparent" />
                </div>

                <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-background to-transparent" />
                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pb-6">
                        {[...items, ...items].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-background to-transparent" />
                </div>
            </div>
        </section>
    )
}




