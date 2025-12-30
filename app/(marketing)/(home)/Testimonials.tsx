
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface CardData {
    name: string;
    location: string;
    date: string;
    quote: string;
}

const cardsData = [
    {
        name: 'Briar Martin',
        location: 'Newquay, Cornwall',
        date: '20 Feb 2025',
        quote: '“Quilliams made keeping our yard tidy effortless. The team is punctual, friendly, and the results look fantastic.”',
    },
    {
        name: 'Avery Johnson',
        location: 'Newquay, Cornwall',
        date: '03 Mar 2025',
        quote: '“Super easy to work with. They communicated clearly and left everything looking better than we expected.”',
    },
    {
        name: 'Jordan Lee',
        location: 'Newquay, Cornwall',
        date: '18 Apr 2025',
        quote: '“Reliable, professional, and detail-oriented. Our garden looks great week after week.”',
    },
    {
        name: 'Avery Johnson',
        location: 'Newquay, Cornwall',
        date: '07 May 2025',
        quote: '“Fast turnaround and great workmanship. I’d happily recommend them to anyone needing ongoing maintenance.”',
    },
];

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

export function Testimonials() {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-12 text-center">
                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                    Testimonials
                </div>

                <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    Don't just take our word for it
                </h2>

                <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
                    Hear what homeowners say about working with us.
                </p>

                <div className="mt-10 marquee-row w-full mx-auto max-w-7xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-background to-transparent" />
                    <div className="marquee-inner flex transform-gpu min-w-[200%] pb-6">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-background to-transparent" />
                </div>

                <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-background to-transparent" />
                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pb-6">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-background to-transparent" />
                </div>
            </div>
        </section>
    )
}




