import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/seo";
import { areas } from "@/lib/areas/data";

export async function generateStaticParams() {
    return Object.keys(areas).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const area = areas[slug];
    
    if (!area) return {};
    
    return buildMetadata({
        seo: {
            title: `Gardener in ${area.name}, ${area.county} | Local Garden Services`,
            description: `Professional gardening services in ${area.name}. Lawn care, hedge trimming, landscaping & garden maintenance. Reliable local gardener covering ${area.name} and surrounding ${area.county} areas.`,
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
                    <p>{area.description}</p>
                </div>
                
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
                    <h2 className="text-2xl font-semibold mb-4">Why Choose Us in {area.name}?</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-primary">✓</span>
                            <span>Local to {area.county} — quick response times</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary">✓</span>
                            <span>Reliable, scheduled visits</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary">✓</span>
                            <span>Fully equipped for all garden sizes</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-primary">✓</span>
                            <span>Fair, transparent pricing</span>
                        </li>
                    </ul>
                </section>
                
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
