
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
    GOOGLE_BUSINESS_PROFILE_URL,
    GOOGLE_REVIEW_COUNT,
} from "@/lib/google-reviews";

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
    <Card className="mx-4 w-72 shrink-0 snap-start rounded-2xl border border-border bg-background text-muted-foreground shadow-none transition-transform duration-300 hover:-translate-y-1 will-change-transform">
        <CardContent className="p-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span role="img" aria-label="5 out of 5 stars" className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                                key={index}
                                className="size-4 fill-chart-4 text-chart-4"
                                aria-hidden="true"
                            />
                        ))}
                    </span>

                    <p className="text-xs text-muted-foreground">{card.date}</p>
                </div>

                <p className="text-sm leading-relaxed text-foreground/80">{card.quote}</p>

                <div className="pt-1">
                    <p className="font-medium text-foreground">{card.name}</p>
                    <p className="text-sm font-medium">{card.location}</p>
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

                <a
                    href={GOOGLE_BUSINESS_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                    Read all {GOOGLE_REVIEW_COUNT} reviews on Google
                </a>

                <div className="testimonial-scroll marquee-row relative mx-auto mt-10 w-full max-w-7xl snap-x snap-mandatory overflow-x-auto md:snap-none md:overflow-hidden">
                    <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-20 bg-linear-to-r from-background to-transparent md:block" />
                    <div className="marquee-inner flex min-w-max items-start transform-gpu pb-6 will-change-transform md:min-w-[200%]">
                        {items.map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                        <div className="hidden md:contents" aria-hidden="true">
                            {items.map((card, index) => (
                                <CreateCard key={`duplicate-${index}`} card={card} />
                            ))}
                        </div>
                    </div>
                    <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-40 bg-linear-to-l from-background to-transparent md:block" />
                </div>

                <div className="marquee-row relative mx-auto hidden w-full max-w-5xl overflow-hidden md:block">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-background to-transparent" />
                    <div className="marquee-inner marquee-reverse flex min-w-[200%] items-start transform-gpu pb-6">
                        {items.map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                        <div className="contents" aria-hidden="true">
                            {items.map((card, index) => (
                                <CreateCard key={`duplicate-${index}`} card={card} />
                            ))}
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-background to-transparent" />
                </div>
            </div>
        </section>
    )
}


