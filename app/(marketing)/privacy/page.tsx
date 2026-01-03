import type { Metadata } from "next";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { getContactContent, getPrivacyContent } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    const privacy = await getPrivacyContent();

    return buildMetadata({
        seo: privacy.seo,
        fallbackTitle: "Privacy Policy",
        fallbackDescription: privacy.header.description,
    });
}

export default async function PrivacyPage() {
    const privacy = await getPrivacyContent();
    const contact = await getContactContent();
    const email = contact.details.emailAddress;
    const phoneTel = contact.details.phoneTel;
    const phoneDisplay = contact.details.phoneDisplay;

    return (
        <main>
            <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="text-center">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            {privacy.header.badge}
                        </div>

                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            {privacy.header.heading}
                        </h1>

                        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
                            {privacy.header.description}
                        </p>

                        {privacy.header.lastUpdatedText?.trim() ? (
                            <p className="mt-3 text-sm text-muted-foreground">
                                {privacy.header.lastUpdatedLabel}: {privacy.header.lastUpdatedText}
                            </p>
                        ) : null}
                    </div>

                    <Card className="mt-10 rounded-4xl border-border shadow-none overflow-hidden">
                        <CardContent className="px-6 py-8 md:px-10 md:py-10">
                            <div className="space-y-8">
                                {privacy.sections.map((section) => {
                                    const isContactSection =
                                        section.title.trim().toLowerCase() === "contact us";

                                    return (
                                        <section key={section.title} className="space-y-3">
                                            <h2 className="text-xl font-semibold text-foreground">
                                                {section.title}
                                            </h2>

                                            {section.paragraphs.map((p, idx) => (
                                                <p
                                                    key={`${section.title}-p-${idx}`}
                                                    className="text-sm md:text-base leading-relaxed text-muted-foreground"
                                                >
                                                    {p}
                                                </p>
                                            ))}

                                            {section.bullets.length ? (
                                                <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-muted-foreground">
                                                    {section.bullets.map((b) => (
                                                        <li key={`${section.title}-${b}`}>{b}</li>
                                                    ))}
                                                </ul>
                                            ) : null}

                                            {isContactSection ? (
                                                <div className="text-sm md:text-base text-muted-foreground">
                                                    <div>
                                                        Email:{" "}
                                                        <Link
                                                            href={`mailto:${email}`}
                                                            className="text-foreground hover:underline underline-offset-4"
                                                        >
                                                            {email}
                                                        </Link>
                                                    </div>
                                                    <div className="mt-2">
                                                        Phone:{" "}
                                                        <Link
                                                            href={`tel:${phoneTel}`}
                                                            className="text-foreground hover:underline underline-offset-4"
                                                        >
                                                            {phoneDisplay}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </section>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    );
}

