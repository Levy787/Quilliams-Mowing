import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    MapPin,
    ShieldCheck,
    Star,
    Trash2,
} from "lucide-react";

import post from "@/content/blog/best-gardeners-newquay.json";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

const SITE_URL = "https://quilliamsmowing.co.uk";
const canonicalPath = `/blog/${post.slug}`;

export const metadata: Metadata = buildMetadata({
    seo: {
        title: post.seo.title,
        description: post.seo.description,
        ogImage: post.heroImage.src,
    },
    fallbackTitle: post.title,
    fallbackDescription: post.subtitle,
    canonicalPath,
});

const trustItems = [
    { label: "Newquay-based", icon: MapPin },
    { label: "Public liability insured", icon: ShieldCheck },
    { label: "Waste-carrier registered", icon: Trash2 },
    { label: "5-star rated locally", icon: Star },
];

function BlogPostingSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seo.description,
        image: `${SITE_URL}${post.heroImage.src}`,
        datePublished: post.publishedDate,
        dateModified: post.updatedDate,
        author: {
            "@type": "Person",
            name: post.author,
        },
        publisher: {
            "@id": `${SITE_URL}/#business`,
        },
        mainEntityOfPage: `${SITE_URL}${canonicalPath}`,
        about: [
            "Gardeners in Newquay",
            "Garden maintenance in Newquay",
            "Lawn mowing in Newquay",
            "Hedge trimming in Newquay",
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default function BestGardenersNewquayPage() {
    return (
        <main className="min-h-screen bg-background">
            <BreadcrumbSchema
                items={[
                    { name: "Home", href: "/" },
                    { name: "Blog", href: "/blog" },
                    { name: "Best Gardeners in Newquay", href: canonicalPath },
                ]}
            />
            <BlogPostingSchema />
            <FAQSchema items={post.faqs} />

            <article>
                <section className="mx-4 overflow-hidden rounded-b-4xl bg-foreground text-background md:mx-8 lg:mx-16">
                    <div className="relative min-h-[520px]">
                        <Image
                            src={post.heroImage.src}
                            alt={post.heroImage.alt}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
                        <div className="relative z-10 flex min-h-[520px] items-end">
                            <div className="container mx-auto px-4 py-12 lg:px-12 lg:py-16">
                                <div className="max-w-3xl">
                                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                                        Gardeners Newquay Guide
                                    </p>
                                    <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                                        Best gardeners in Newquay
                                    </h1>
                                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/90">
                                        {post.subtitle}
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-3 text-sm text-background/80">
                                        <span>By {post.author}</span>
                                        <span aria-hidden="true">/</span>
                                        <span>Updated {post.updatedDate}</span>
                                        <span aria-hidden="true">/</span>
                                        <span>{post.readingTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto max-w-5xl px-4 py-12 lg:px-12">
                    <section className="grid gap-8 border-b pb-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{post.quickAnswer.title}</h2>
                            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                                {post.quickAnswer.body}
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <Button asChild size="lg">
                                    <Link href="/quote">
                                        Get a quote
                                        <ArrowRight className="size-4" aria-hidden="true" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link href="/areas/newquay">See Newquay services</Link>
                                </Button>
                            </div>
                        </div>

                        <aside className="border-l pl-6">
                            <h2 className="text-lg font-semibold">Why Quilliams is listed first</h2>
                            <ul className="mt-4 space-y-3">
                                {trustItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.label} className="flex items-center gap-3 text-sm">
                                            <Icon className="size-4 text-primary" aria-hidden="true" />
                                            <span>{item.label}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </aside>
                    </section>

                    <section className="mt-14">
                        <h2 className="text-3xl font-bold tracking-tight">10 best gardeners in Newquay: our shortlist</h2>
                        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                            We are putting Quilliams first because this is our guide, but the full list below is set out as one shortlist. Use it to compare fit, services, source pages, photos, insurance and availability before booking.
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground">
                            Operators checked from public web results on {post.operatorsCheckedDate}. External links open source or photo pages and are marked nofollow.
                        </p>

                        <div className="mt-8 divide-y">
                            <article className="pb-8">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight">{post.quilliams.title}</h3>
                                        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-primary">
                                            Our pick
                                        </p>
                                    </div>
                                    <Link
                                        href="/quote"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                                    >
                                        Get a quote
                                        <ArrowRight className="size-4" aria-hidden="true" />
                                    </Link>
                                </div>
                                <p className="mt-5 text-base leading-relaxed text-foreground/85">
                                    <span className="font-semibold">Best fit: </span>
                                    {post.quilliams.summary}
                                </p>
                                <ul className="mt-5 space-y-3">
                                    {post.quilliams.facts.map((fact) => (
                                        <li key={fact} className="flex gap-3">
                                            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                                            <span className="leading-relaxed text-foreground/85">{fact}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>

                            {post.operators.map((operator, index) => (
                                <article key={operator.name} className="py-8 last:pb-0">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight">
                                            {index + 2}. {operator.name}
                                        </h3>
                                    </div>
                                        <a
                                            href={operator.url}
                                            target="_blank"
                                            rel="nofollow noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                                        >
                                            {operator.linkLabel}
                                            <ArrowRight className="size-4" aria-hidden="true" />
                                        </a>
                                    </div>
                                    <p className="mt-5 text-base leading-relaxed text-foreground/85">
                                        <span className="font-semibold">Best fit: </span>
                                        {operator.bestFit}
                                    </p>
                                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                                        {operator.notes}
                                    </p>
                                </article>
                            ))}
                        </div>

                        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                            {post.operatorsIntro}
                        </p>
                    </section>

                    <section className="mt-14">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl font-bold tracking-tight">How to compare gardeners in Newquay</h2>
                            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                                The best gardener is the one that fits your garden, budget and expectations. Use these checks before booking anyone.
                            </p>
                        </div>
                        <dl className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
                            {post.criteria.map((criterion) => (
                                <div key={criterion.title} className="border-t pt-4">
                                    <dt className="text-xl font-semibold">{criterion.title}</dt>
                                    <dd className="mt-2 leading-relaxed text-muted-foreground">
                                        {criterion.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section className="mt-14">
                        <h2 className="text-3xl font-bold tracking-tight">Best fit by job type</h2>
                        <div className="mt-6 overflow-x-auto border-y">
                            <table className="w-full min-w-[720px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b bg-muted/40">
                                        <th className="p-4 text-sm font-semibold">What you need</th>
                                        <th className="p-4 text-sm font-semibold">Best fit</th>
                                        <th className="p-4 text-sm font-semibold">What to check</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {post.comparisonRows.map((row) => (
                                        <tr key={row.need}>
                                            <td className="p-4 font-medium">{row.need}</td>
                                            <td className="p-4 text-muted-foreground">{row.bestFit}</td>
                                            <td className="p-4 text-muted-foreground">{row.whatToCheck}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mt-14">
                        <h2 className="text-3xl font-bold tracking-tight">Where else to check before booking</h2>
                        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                            A shortlist is a starting point. Before choosing anyone, check live reviews, recent photos, current service areas and whether they are actually taking bookings.
                        </p>
                        <div className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-3">
                            {post.otherOptions.map((option) => (
                                <div key={option.title} className="border-t pt-4">
                                    <h3 className="text-lg font-semibold">{option.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {option.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-14">
                        <h2 className="text-3xl font-bold tracking-tight">Questions to ask before booking</h2>
                        <div className="mt-6 divide-y">
                            {post.faqs.map((item) => (
                                <div key={item.question} className="py-5 first:pt-0 last:pb-0">
                                    <h3 className="text-lg font-semibold">{item.question}</h3>
                                    <p className="mt-2 leading-relaxed text-muted-foreground">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-14 border-y py-8">
                        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">Need a gardener in Newquay?</h2>
                                <p className="mt-3 max-w-2xl text-muted-foreground">
                                    Send a few photos and a short description. We will come back with a clear quote for mowing, hedge trimming, maintenance, cleanup or landscaping work.
                                </p>
                            </div>
                            <Button asChild size="lg">
                                <Link href="/quote">
                                    Request a quote
                                    <ArrowRight className="size-4" aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </section>
                </div>
            </article>
        </main>
    );
}
