
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
        name: "Matthew Wellington",
        location: "Truro, Cornwall",
        date: "20 Oct 2025",
        quote: "“Great service from start to finish. He cut down a few hedges for us and did a brilliant job – quick, tidy, and very reasonably priced. Everything was left neat and exactly how we wanted it. Would definitely recommend and use again.”",
    },
    {
        name: "Hannah B",
        location: "Summer Court, Cornwall",
        date: "03 Jul 2025",
        quote: "“We recently contacted Qwilliams mowing as we are selling our house so desperately needed the garden tidied up. I have been putting this off for months as I had no idea where to start. We are extremely pleased with the result - Levi did an amazing job! He was very professional and listened to what we wanted. We will definitely be regular customers of Qwilliams mowing and would highly recommend to anyone looking for garden services!”",
    },
    {
        name: "Elizabeth Cawley",
        location: "St Austell, Cornwall",
        date: "18 Aug 2025",
        quote: "“Levi has done an excellent job on my gardens meadow reset. Prompt and friendly. The job completed was exactly as I asked. And he left the area very tidy. I would recommend him to anyone.”",
    },
    {
        name: "Michael Meer",
        location: "Grampound, Cornwall",
        date: "07 Aug 2025",
        quote: "“Levi came for the first time yesterday. I don't know anything about gardening - but Levi does! What to cut, what not to cut, when to cut it and how it should be cut. He works really hard - non-stop, has really good ideas for making a garden both tidy and practical and his prices a very competitive. What's more, he's a really nice bloke. I've already booked him for a second visit.”",
    },
    {
        name: 'Robert Jakes',
        location: 'Newquay, Cornwall',
        date: '12 Sep 2025',
        quote: '”Amazing transformation of a massive hedge that had got too big for me to cope with, would highly recommend Levi Quilliams Mowing😊”',
    },
    {
        name: 'James Watson',
        location: 'Newquay, Cornwall',
        date: '1 Jun 2025',
        quote: '”Highly recommended! Levi helped us out with our hedge cutting and lawn mowing. Extremely reliable and did exceptional job. We will certainly be getting him back!”',
    },
    {
        name: 'James Perrin',
        location: 'Newquay, Cornwall',
        date: '21 Sep 2025',
        quote: '”We recently instructed Levi to look after some sizeable gardens in Porth. Really impressed with him - hardworking, polite and professional. He did a great job on his first visit and is now going to be taking care of regular garden maintenance for us. Would highly recommend him.”',
    },
    {
        name: 'Chris Hall',
        location: 'Newquay, Cornwall',
        date: '20 Jul 2025',
        quote: '”Came and gave me a reasonable quote to cut Hedges. Turned up next day to do the work on time. Pleased with the work done and cleared all the cuttings up. Would use again fully recommend..”',
    },
    {
        name: 'Maya J',
        location: 'Newquay, Cornwall',
        date: '18 Nov 2025',
        quote: '”Levi did an amazing job in my garden! Everything was done to a high standard, making sure to leave it clean and tidy at the end. He is super friendly and reliable — highly recommend!”',
    },
    {
        name: 'Jamie Q',
        location: 'Newquay, Cornwall',
        date: '18 Jun 2025',
        quote: '”Booked a one-off clean and was so impressed I signed up for regular mowing. Super reliable and the lawn always looks great. Highly recommend!”',
    },
    {
        name: 'Kim Brocklehurst',
        location: 'Newquay, Cornwall',
        date: '10 Oct 2025',
        quote: '”Quick response to initial enquiry. Fast and thorough clearance of overgrown land. Will definitely use Levi again.”',
    },
    {
        name: 'Marie Preston',
        location: 'St Austell, Cornwall',
        date: '10 Nov 2025',
        quote: '”Levi is always professional in manner and services required. I highly recommend him!”',
    },
    {
        name: 'Pat Batey',
        location: 'Newquay, Cornwall',
        date: '1 Nov 2025',
        quote: '”A great job carried out at a sensible price.”',
    },
    {
        name: 'David willers',
        location: 'Truro, Cornwall',
        date: '12 Dec 2025',
        quote: '”Did an a amazing job on my garden”',
    },
    {
        name: 'Luis McLaren',
        location: 'Truro, Cornwall',
        date: '2 Dec 2025',
        quote: '”Highly recommend!',
    },
    {
        name: 'John Kendall',
        location: 'Newquay, Cornwall',
        date: '2 Jun 2025',
        quote: '”Really tidied up my bushes',
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




