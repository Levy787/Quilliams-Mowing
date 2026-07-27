import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import ReferClient from "./refer-client";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { WebPageSchema } from "@/components/seo/WebPageSchema";
import { Card, CardContent } from "@/components/ui/card";
import { getReferralContent } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";

const PAGE_URL = "https://quilliamsmowing.co.uk/refer";

export async function generateMetadata(): Promise<Metadata> {
    const referral = await getReferralContent();

    return buildMetadata({
        seo: referral.seo,
        fallbackTitle: "Refer a Friend",
        fallbackDescription: referral.hero.subheading,
        canonicalPath: "/refer",
    });
}

export default async function ReferPage() {
    const content = await getReferralContent();
    const pageDescription =
        content.seo.description?.trim() || content.hero.subheading;

    return (
        <main>
            <BreadcrumbSchema
                items={[
                    { name: "Home", href: "/" },
                    { name: content.hero.heading, href: "/refer" },
                ]}
            />
            <WebPageSchema
                name={content.seo.title?.trim() || content.hero.heading}
                description={pageDescription}
                url={PAGE_URL}
            />

            <section className="py-16 md:py-20">
                <div className="mx-auto w-full max-w-6xl px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="text-sm font-semibold text-primary">
                            {content.hero.eyebrow}
                        </div>
                        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            {content.hero.heading}
                        </h1>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                            {content.hero.subheading}
                        </p>
                    </div>

                    <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-5">
                        <Card className="rounded-4xl border-border shadow-none lg:col-span-2">
                            <CardContent className="px-6 py-6">
                                <div className="text-sm font-semibold text-foreground">
                                    Offer
                                </div>
                                <h2 className="mt-2 text-xl font-semibold text-foreground">
                                    {content.offer.headline}
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {content.offer.description}
                                </p>

                                {content.offer.terms.trim().length > 0 ? (
                                    <div className="mt-4 rounded-3xl border border-border bg-muted/25 p-4">
                                        <h3 className="text-xs font-semibold text-foreground">
                                            Eligibility and terms
                                        </h3>
                                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                            {content.offer.terms}
                                        </p>
                                    </div>
                                ) : null}
                            </CardContent>
                        </Card>

                        <Card className="rounded-4xl border-border shadow-none lg:col-span-3">
                            <CardContent className="px-6 py-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground">
                                        Create a voucher
                                    </h2>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        Fill in the details below. This form confirms the
                                        referral; it does not automatically email your
                                        friend yet.
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <Suspense
                                        fallback={
                                            <p className="text-sm text-muted-foreground">
                                                Loading the referral form…
                                            </p>
                                        }
                                    >
                                        <ReferClient
                                            services={content.services}
                                            discountPercent={content.offer.discountPercent}
                                            formCopy={content.formCopy}
                                        />
                                    </Suspense>
                                </div>

                                {content.formCopy.privacyNote.trim().length > 0 ? (
                                    <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                                        {content.formCopy.privacyNote} Read our{" "}
                                        <Link
                                            href="/privacy"
                                            className="font-medium text-foreground underline underline-offset-4"
                                        >
                                            privacy policy
                                        </Link>
                                        .
                                    </p>
                                ) : null}
                            </CardContent>
                        </Card>
                    </div>

                    <nav
                        aria-label="Referral supporting links"
                        className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm"
                    >
                        <Link
                            href="/services"
                            className="font-medium text-foreground underline underline-offset-4"
                        >
                            View services
                        </Link>
                        <Link
                            href="/pricing"
                            className="font-medium text-foreground underline underline-offset-4"
                        >
                            See typical prices
                        </Link>
                        <Link
                            href="/terms"
                            className="font-medium text-foreground underline underline-offset-4"
                        >
                            Terms and conditions
                        </Link>
                    </nav>
                </div>
            </section>
        </main>
    );
}
