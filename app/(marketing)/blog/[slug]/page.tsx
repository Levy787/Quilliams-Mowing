import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, UserRound } from "lucide-react";

import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ItemListSchema } from "@/components/seo/ItemListSchema";
import { Button } from "@/components/ui/button";
import { QuoteCtaBand } from "@/components/reusable/QuoteCtaBand";
import { getBlogPostBySlug, listBlogSlugs } from "@/lib/keystatic-reader";
import type { BlogBlock } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

const SITE_URL = "https://quilliamsmowing.co.uk";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const slugs = await listBlogSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) notFound();

    return buildMetadata({
        seo: post.seo,
        fallbackTitle: post.title,
        fallbackDescription: post.subtitle,
        fallbackOgImage: post.heroImage.src,
        canonicalPath: `/blog/${slug}`,
    });
}

function wordCount(text: string): number {
    return text.match(/\b[\w']+\b/g)?.length ?? 0;
}

function blockWordParts(block: BlogBlock): string[] {
    if (block.kind === "callout") {
        return [block.title, block.body, ...(block.bullets ?? [])];
    }

    if (block.kind === "table") {
        return [
            block.title,
            block.description ?? "",
            ...block.columns,
            ...block.rows.flatMap((row) => row.cells),
        ];
    }

    return [
        block.title,
        block.description ?? "",
        ...block.images.flatMap((image) => [image.alt, image.caption ?? ""]),
    ];
}

function postWordCount(post: NonNullable<Awaited<ReturnType<typeof getBlogPostBySlug>>>): number {
    return wordCount([
        post.title,
        post.subtitle,
        post.quickAnswer.body,
        ...post.sections.flatMap((section) => [
            section.title,
            section.body,
            ...(section.bullets ?? []),
            ...(section.blocks ?? []).flatMap(blockWordParts),
        ]),
        ...post.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ].join(" "));
}

function paragraphs(text: string) {
    return text.split(/\n\n+/g).filter(Boolean);
}

function BlogRichBlock({ block }: { block: BlogBlock }) {
    if (block.kind === "callout") {
        return (
            <aside className="mt-6 rounded-3xl border border-primary/20 bg-primary/5 p-5 md:p-6">
                <h3 className="text-lg font-semibold tracking-tight">{block.title}</h3>
                {block.body ? (
                    <p className="mt-2 leading-relaxed text-muted-foreground">{block.body}</p>
                ) : null}
                {block.bullets?.length ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                        {block.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                        ))}
                    </ul>
                ) : null}
            </aside>
        );
    }

    if (block.kind === "table") {
        return (
            <div className="mt-6">
                <div className="mb-3">
                    <h3 className="text-lg font-semibold tracking-tight">{block.title}</h3>
                    {block.description ? (
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {block.description}
                        </p>
                    ) : null}
                </div>
                <div className="overflow-x-auto rounded-2xl border">
                    <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                        <thead className="bg-muted/60 text-foreground">
                            <tr>
                                {block.columns.map((column) => (
                                    <th key={column} className="border-b px-4 py-3 font-semibold">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, rowIndex) => (
                                <tr key={`${block.title}-${rowIndex}`} className="border-b last:border-b-0">
                                    {block.columns.map((column, cellIndex) => (
                                        <td
                                            key={`${column}-${cellIndex}`}
                                            className="align-top px-4 py-3 text-muted-foreground"
                                        >
                                            {row.cells[cellIndex] ?? ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <figure className="mt-6">
            <div className="mb-3">
                <h3 className="text-lg font-semibold tracking-tight">{block.title}</h3>
                {block.description ? (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {block.description}
                    </p>
                ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                {block.images.map((image) => (
                    <div key={image.src} className="overflow-hidden rounded-3xl border bg-muted/20">
                        <div className="relative aspect-[4/3]">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 420px, 100vw"
                            />
                        </div>
                        {image.caption ? (
                            <figcaption className="px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                                {image.caption}
                            </figcaption>
                        ) : null}
                    </div>
                ))}
            </div>
        </figure>
    );
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) notFound();

    const canonicalPath = `/blog/${slug}`;
    const pageUrl = `${SITE_URL}${canonicalPath}`;
    const faqItems = post.faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
    }));
    const primaryHeroCta =
        slug === "best-gardeners-newquay"
            ? "Get a Newquay gardener quote"
            : "Get a quote";

    return (
        <main className="min-h-screen bg-background">
            <BreadcrumbSchema
                items={[
                    { name: "Home", href: "/" },
                    { name: "Blog", href: "/blog" },
                    { name: post.title, href: canonicalPath },
                ]}
            />
            <ArticleSchema
                id={`${pageUrl}#article`}
                headline={post.title}
                description={post.seo.description}
                images={[post.heroImage.src]}
                datePublished={post.publishedDate}
                dateModified={post.updatedDate}
                pageUrl={pageUrl}
                articleSection="Gardening Guides"
                wordCount={postWordCount(post)}
                about={[post.title, "Gardening in Cornwall", "Garden maintenance"]}
                isBlogPost
            />
            {post.itemList ? (
                <ItemListSchema
                    id={`${pageUrl}#itemlist`}
                    name={post.itemList.name}
                    items={post.itemList.items.map((item) => ({
                        name: item.label,
                        url: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
                    }))}
                />
            ) : null}
            {faqItems.length ? <FAQSchema items={faqItems} /> : null}

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
                                        Cornwall Gardening Guide
                                    </p>
                                    <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                                        {post.title}
                                    </h1>
                                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/90">
                                        {post.subtitle}
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-4 text-sm text-background/80">
                                        <span className="inline-flex items-center gap-2">
                                            <UserRound className="size-4" aria-hidden="true" />
                                            {post.author}
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            <CalendarDays className="size-4" aria-hidden="true" />
                                            Updated {post.updatedDate}
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            <Clock className="size-4" aria-hidden="true" />
                                            {post.readingTime}
                                        </span>
                                    </div>
                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                        <Button asChild size="lg">
                                            <Link href="/quote">
                                                {primaryHeroCta}
                                                <ArrowRight className="size-4" aria-hidden="true" />
                                            </Link>
                                        </Button>
                                        <Button asChild variant="secondary" size="lg">
                                            <Link href="/pricing">View prices</Link>
                                        </Button>
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
                                    <Link href="/services">View services</Link>
                                </Button>
                            </div>
                        </div>

                        <aside className="border-l pl-6">
                            <h2 className="text-lg font-semibold">Useful links</h2>
                            <ul className="mt-4 space-y-3">
                                {post.relatedLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                                        >
                                            {link.label}
                                            <ArrowRight className="size-4" aria-hidden="true" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </section>

                    <div className="mt-12 space-y-12">
                        {post.sections.map((section) => (
                            <section key={section.id}>
                                <h2 className="text-3xl font-bold tracking-tight">{section.title}</h2>
                                <div className="mt-4 space-y-4">
                                    {paragraphs(section.body).map((paragraph) => (
                                        <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                                {section.bullets?.length ? (
                                    <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
                                        {section.bullets.map((bullet) => (
                                            <li key={bullet}>{bullet}</li>
                                        ))}
                                    </ul>
                                ) : null}
                                {section.blocks?.length ? (
                                    <div>
                                        {section.blocks.map((block, index) => (
                                            <BlogRichBlock
                                                key={`${section.id}-${block.kind}-${index}`}
                                                block={block}
                                            />
                                        ))}
                                    </div>
                                ) : null}
                            </section>
                        ))}
                    </div>

                    {post.faqs.length ? (
                        <section className="mt-14 border-t pt-10">
                            <h2 className="text-3xl font-bold tracking-tight">Quick questions</h2>
                            <div className="mt-6 divide-y">
                                {post.faqs.map((faq) => (
                                    <div key={faq.question} className="py-5">
                                        <h3 className="text-lg font-semibold">{faq.question}</h3>
                                        <p className="mt-2 leading-relaxed text-muted-foreground">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    <section
                        aria-labelledby="author-bio-heading"
                        className="mt-14 rounded-3xl border bg-muted/40 p-6 md:p-8"
                    >
                        <h2 id="author-bio-heading" className="sr-only">
                            About the author
                        </h2>
                        <div className="flex flex-col gap-6 md:flex-row md:items-center">
                            <Image
                                src="/images/uploads/faq/levi-headshot-v2.jpg"
                                alt="Levi Quilliam, founder of Quilliams Gardening & Landscaping"
                                width={96}
                                height={96}
                                className="size-24 shrink-0 rounded-full object-cover"
                            />
                            <div className="min-w-0">
                                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                                    Written by
                                </p>
                                <p className="mt-1 text-xl font-bold tracking-tight">Levi Quilliam</p>
                                <p className="text-sm text-muted-foreground">
                                    Founder & Lead Gardener, Quilliams Gardening &amp; Landscaping
                                </p>
                                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                                    I&apos;m a Cornwall-based gardener and landscaper working across Newquay and the surrounding villages of north Cornwall. Public liability insured, Environment Agency waste carrier (CBDL582202), and a registered limited company (Companies House 16405915). I write these guides from real jobs on Cornish gardens.
                                </p>
                                <Link
                                    href="/about"
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                                >
                                    More about Levi
                                    <ArrowRight className="size-4" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>

                <QuoteCtaBand
                    heading="Need a hand with your own garden?"
                    body="I cover Newquay, St Columb Major, Padstow, Wadebridge and the surrounding north Cornwall villages. Send a few details and I'll come back with a clear, fixed quote, usually within 24 hours."
                />
            </article>
        </main>
    );
}
