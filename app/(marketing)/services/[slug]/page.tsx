import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function toTitle(slug: string) {
    return slug
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const title = toTitle(slug);

    return (
        <main>
            <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            Service
                        </div>

                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            {title}
                        </h1>

                        <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                            This is a placeholder page for {title}. Add service details, inclusions, and example work here.
                        </p>

                        <div className="mt-8">
                            <Button asChild variant="outline">
                                <Link href="/services">Back to Services</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="text-lg font-semibold text-foreground">What’s included</div>
                                <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                    Replace this with a short list of what customers can expect, typical timelines, and how pricing is estimated.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
