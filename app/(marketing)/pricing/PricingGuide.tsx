import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const priceRows = [
    {
        service: "Small lawn mowing",
        range: "£20 to £30",
        notes: "Best for small front lawns or compact rear gardens with straightforward access.",
    },
    {
        service: "Average lawn mowing",
        range: "£30 to £50",
        notes: "Includes mowing, edging, strimming, and a clean blow-down for a typical family garden.",
    },
    {
        service: "Regular garden maintenance",
        range: "£60 to £120",
        notes: "Usually covers mowing, weeding, light pruning, edging, and a general tidy per visit.",
    },
    {
        service: "One-off garden tidy-up",
        range: "From £80",
        notes: "Useful when beds, paths, lawns, or hedges have got away and need a reset.",
    },
    {
        service: "Hedge trimming",
        range: "£5 to £15 per metre",
        notes: "The final price depends on hedge height, thickness, access, and green waste volume.",
    },
    {
        service: "Practical landscaping",
        range: "£500 to £2,500+",
        notes: "Gravel gardens, planting, edging, bed shaping, and lower-maintenance garden improvements.",
    },
] as const;

const quoteExamples = [
    {
        title: "Small Newquay lawn",
        body: "A small front lawn with simple access is usually around £20 to £30 per cut when the grass is under control. If the first visit needs extra strimming, edging, or waste removal, I quote that first reset separately and then give a regular maintenance price.",
    },
    {
        title: "Fortnightly family garden",
        body: "A typical family garden in Newquay, St Columb Major, Wadebridge, or Padstow often sits around £60 to £90 per maintenance visit. That normally includes mowing, edging, quick weeding, light pruning, and leaving paths and patios tidy before I go.",
    },
    {
        title: "Overgrown tidy-up",
        body: "A garden that has been left for a season usually starts from £80 and can run higher if there is bramble, heavy hedge growth, narrow access, or a lot of green waste. Photos make a big difference because they let me price the time and waste honestly.",
    },
] as const;

export function PricingGuide() {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                        2026 guide
                    </div>
                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Lawn mowing costs in Cornwall in 2026
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                        As of May 2026, lawn mowing in Cornwall usually costs £20 to £30 for a small front lawn and £30 to £50 for an average garden. Regular maintenance visits normally start from about £60 because they include more than cutting grass: edging, strimming, weeding, pruning, clearing paths, and leaving the garden tidy. One-off tidy-ups usually start from £80, while hedge trimming is commonly £5 to £15 per metre depending on height and access. These figures are useful for planning, but the exact quote depends on garden size, current condition, slope, gate access, parking, and how much green waste needs removing. I price most jobs after seeing a few photos, then confirm what is included before work starts. That keeps the quote clear and avoids the common problem where a cheap starting price grows once the job is underway.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button asChild size="lg">
                            <Link href="/quote">
                                Get an exact quote
                                <ArrowRight className="h-5 w-5" aria-hidden="true" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/services/lawn-care">View lawn mowing service</Link>
                        </Button>
                    </div>
                </div>

                <div className="mt-10 overflow-x-auto border-y border-border">
                    <table className="w-full min-w-[760px] border-collapse text-left">
                        <thead>
                            <tr className="border-b bg-muted/40">
                                <th className="p-4 text-sm font-semibold text-foreground">Service</th>
                                <th className="p-4 text-sm font-semibold text-foreground">Typical range</th>
                                <th className="p-4 text-sm font-semibold text-foreground">What affects the quote</th>
                            </tr>
                        </thead>
                        <tbody>
                            {priceRows.map((row) => (
                                <tr key={row.service} className="border-b last:border-b-0">
                                    <td className="p-4 font-medium text-foreground">{row.service}</td>
                                    <td className="p-4 text-foreground">{row.range}</td>
                                    <td className="p-4 leading-relaxed text-muted-foreground">{row.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.55fr)]">
                    <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                        <p>
                            Cornwall pricing is a little different from many inland areas because gardens grow for longer. The mild coastal climate means lawns can keep moving through winter, hedges push on after autumn rain, and weeds come back quickly once the soil warms. A garden that looks manageable in February can need proper attention by April. For that reason, regular customers usually get the best value from a fortnightly rhythm between March and October, with the option to drop back in winter.
                        </p>
                        <p>
                            Access is one of the biggest price differences. A flat lawn with parking outside the gate is quick to work through. A terraced garden in St Agnes, a long carry through a house, steep steps, or a narrow side path all add time. The same applies to waste. Grass clippings from a regular cut are simple, but wet hedge cuttings, bramble, pampas grass, and old shrub material take longer to bag, carry, and dispose of properly.
                        </p>
                        <p>
                            Condition matters too. If I am maintaining a garden every fortnight, the grass stays at a sensible height, edges are easier to keep crisp, and weeds never get a proper hold. If the garden has been left for months, the first visit may need heavier strimming, slower mowing, hand clearance, and extra waste handling. I normally separate that first reset from the ongoing maintenance price so the regular cost is fair.
                        </p>
                        <p>
                            For landscaping work, the range is wider because materials and layout choices change the job. Gravel gardens, edging, planting, turf repair, mulching, and bed reshaping can be simple improvements or multi-day projects. A small low-maintenance front garden may be a few hundred pounds, while a full gravel transformation with ground preparation, edging, membrane, aggregates, and planting can move into the £1,500 to £2,500 range.
                        </p>
                        <p>
                            The quickest way to get an accurate quote is to send photos from a few angles, your postcode, and a short note about access. Tell me whether you want green waste removed, whether the work is a one-off or regular, and whether there is a deadline such as guests arriving, a property viewing, or a holiday-let changeover. I will then confirm a clear scope, the likely date, and the price before you book.
                        </p>
                    </div>

                    <aside className="space-y-4">
                        <h3 className="text-xl font-semibold tracking-tight text-foreground">
                            Recent quote examples
                        </h3>
                        {quoteExamples.map((example) => (
                            <div key={example.title} className="border-t border-border pt-4">
                                <h4 className="font-semibold text-foreground">{example.title}</h4>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {example.body}
                                </p>
                            </div>
                        ))}
                    </aside>
                </div>
            </div>
        </section>
    );
}
