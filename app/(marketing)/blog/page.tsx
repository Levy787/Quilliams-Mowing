import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ItemListSchema } from "@/components/seo/ItemListSchema";
import { buildMetadata } from "@/lib/seo";
import { listBlogPosts } from "@/lib/keystatic-reader";

export const metadata: Metadata = buildMetadata({
    seo: {
        title: "Gardening Blog | Quilliams Gardening & Landscaping",
        description: "Local gardening guides from Levi Quilliam covering lawn care, coastal planting, hedge trimming, garden costs and practical maintenance in Cornwall.",
    },
    fallbackTitle: "Gardening Blog",
    fallbackDescription: "Local gardening guides from Quilliams Gardening & Landscaping.",
    canonicalPath: "/blog",
});

export default async function BlogPage() {
    const posts = await listBlogPosts();

    return (
        <main className="min-h-screen bg-background">
            <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />
            <ItemListSchema
                id="https://quilliamsmowing.co.uk/blog#itemlist"
                name="Quilliams gardening guides"
                items={posts.map((post) => ({
                    name: post.title,
                    url: `https://quilliamsmowing.co.uk/blog/${post.slug}`,
                }))}
            />
            <section className="mx-4 md:mx-8 lg:mx-16 py-16 md:py-20">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Blog</p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                            Gardening guides for Newquay and Cornwall
                        </h1>
                        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                            Practical local advice on garden maintenance, lawn care, hedge trimming, coastal planting and choosing the right gardener.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group overflow-hidden rounded-lg border bg-background transition-colors hover:border-primary"
                            >
                                <div className="relative aspect-[16/9] bg-muted">
                                    <Image
                                        src={post.heroImage.src}
                                        alt={post.heroImage.alt}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="text-sm text-muted-foreground">
                                        Updated {post.updatedDate} · {post.readingTime}
                                    </div>
                                    <h2 className="mt-3 text-2xl font-semibold text-foreground">
                                        {post.title}
                                    </h2>
                                    <p className="mt-3 text-muted-foreground line-clamp-3">
                                        {post.subtitle}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                        Read the guide
                                        <ArrowRight className="size-4" aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
