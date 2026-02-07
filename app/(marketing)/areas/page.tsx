import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { areas } from "@/lib/areas/data";

export const metadata: Metadata = buildMetadata({
    seo: {
        title: "Areas We Cover | Gardening Services Across Cornwall",
        description: "Quilliams Gardening covers Newquay, Truro, St Austell, Bodmin, Padstow, Perranporth, St Ives and surrounding Cornwall areas. Local, reliable garden services.",
    },
    fallbackTitle: "Areas We Cover",
    canonicalPath: "/areas",
});

export default function AreasPage() {
    const areaList = Object.entries(areas).map(([slug, area]) => ({
        slug,
        name: area.name,
        description: area.description.substring(0, 100) + "...",
    }));

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold mb-4">Areas We Cover</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Professional gardening services across Cornwall
                </p>
                
                <p className="mb-8">
                    Based in Newquay, we provide gardening and landscaping services throughout Cornwall. 
                    Whether you need regular maintenance or a one-off project, we cover these areas and more.
                </p>
                
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                    {areaList.map((area) => (
                        <Link
                            key={area.slug}
                            href={`/areas/${area.slug}`}
                            className="p-6 border rounded-lg hover:border-primary transition-colors"
                        >
                            <h2 className="text-xl font-semibold mb-1">{area.name}</h2>
                            <p className="text-muted-foreground text-sm">{area.description}</p>
                        </Link>
                    ))}
                </div>
                
                <div className="bg-muted/50 rounded-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4">Don&apos;t see your area?</h2>
                    <p className="text-muted-foreground mb-4">
                        We may still be able to help. Get in touch and let us know where you&apos;re based.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </main>
    );
}
