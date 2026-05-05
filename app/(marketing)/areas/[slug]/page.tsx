import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/seo";
import { areas } from "@/lib/areas/data";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export async function generateStaticParams() {
    return Object.keys(areas).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const area = areas[slug];
    
    if (!area) return {};
    
    return buildMetadata({
        seo: {
            title: `Gardener in ${area.name}, ${area.county} | Quilliams`,
            description: `Lawn mowing, hedge trimming and garden maintenance in ${area.name}, ${area.county}. Reliable, insured local gardener based near Newquay. Free quotes.`,
        },
        fallbackTitle: `Gardener in ${area.name}`,
        canonicalPath: `/areas/${slug}`,
    });
}

const serviceLabels: Record<string, string> = {
    "lawn-care": "Lawn Care",
    "hedge-trimming": "Hedge Trimming", 
    "garden-maintenance": "Garden Maintenance",
    "landscaping": "Landscaping",
    "seasonal-cleanup": "Seasonal Cleanup",
    "mulching": "Mulching",
};

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const area = areas[slug];
    
    if (!area) {
        notFound();
    }
    
    return (
        <main className="min-h-screen bg-background">
            <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Areas", href: "/areas" }, { name: area.name, href: `/areas/${slug}` }]} />
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <nav className="text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/areas" className="hover:text-primary">Areas</Link>
                    <span className="mx-2">/</span>
                    <span>{area.name}</span>
                </nav>
                
                <h1 className="text-4xl font-bold mb-4">
                    Gardener in {area.name}, {area.county}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                    Professional gardening and landscaping services
                </p>
                
                <div className="prose prose-lg max-w-none mb-12">
                    {area.paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Garden Challenges in {area.name}</h2>
                    <div className="prose prose-lg max-w-none">
                        <p>{area.gardenChallenges}</p>
                    </div>
                </section>

                {area.testimonial && (
                    <section className="mb-12 bg-muted/50 rounded-lg p-8">
                        <h2 className="text-2xl font-semibold mb-4">What Customers in {area.name} Say</h2>
                        <blockquote className="text-lg italic text-muted-foreground">
                            &ldquo;{area.testimonial.quote}&rdquo;
                        </blockquote>
                        <p className="mt-3 font-medium">{area.testimonial.name}, {area.testimonial.location}</p>
                    </section>
                )}

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Services Available in {area.name}</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {area.services.map((service) => (
                            <Link
                                key={service}
                                href={`/services/${service}`}
                                className="p-4 border rounded-lg hover:border-primary transition-colors"
                            >
                                <span className="font-medium">{serviceLabels[service] || service}</span>
                                <span className="text-muted-foreground text-sm block">
                                    in {area.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Why Choose Me in {area.name}?</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-bold">✓</span>
                            <span>{area.travelTime} from my base in Trevarrian</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-bold">✓</span>
                            <span>Public liability insured, waste-carrier licensed</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-bold">✓</span>
                            <span>Clear, fixed quotes within 24 hours</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary font-bold">✓</span>
                            <span>5-star rated with 120+ projects completed across Cornwall</span>
                        </li>
                    </ul>
                    {area.neighborhoods.length > 0 && (
                        <p className="mt-4 text-muted-foreground text-sm">
                            Covering {area.neighborhoods.join(", ")} and surrounding {area.name} areas.
                        </p>
                    )}
                </section>

                {slug === "newquay" && (
                    <section className="mb-12 rounded-lg border bg-muted/30 p-6">
                        <h2 className="text-2xl font-semibold mb-3">Comparing gardeners in Newquay?</h2>
                        <p className="text-muted-foreground">
                            I have written a practical guide to choosing a local gardener, including what to check before booking and where Quilliams fits best.
                        </p>
                        <Link
                            href="/blog/best-gardeners-newquay"
                            className="mt-4 inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Read the Newquay gardener guide
                        </Link>
                    </section>
                )}
                
                {area.nearby.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">We Also Serve Nearby Areas</h2>
                        <div className="flex flex-wrap gap-3">
                            {area.nearby
                                .filter((slug) => areas[slug])
                                .map((nearbySlug) => (
                                    <Link
                                        key={nearbySlug}
                                        href={`/areas/${nearbySlug}`}
                                        className="rounded-lg border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                                    >
                                        Gardening in {areas[nearbySlug].name}
                                    </Link>
                                ))}
                        </div>
                    </section>
                )}

                <section className="bg-muted/50 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Get a Free Quote</h2>
                    <p className="text-muted-foreground mb-6">
                        Need a gardener in {area.name}? Get in touch for a free, no-obligation quote.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/quote"
                            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            Request a Quote
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-3 border rounded-lg font-medium hover:bg-muted transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
