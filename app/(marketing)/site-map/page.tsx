import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { listBlogPosts, listServiceSlugs, listProjectSlugs } from "@/lib/keystatic-reader";
import { areas } from "@/lib/areas/data";

export const metadata: Metadata = buildMetadata({
    seo: {
        title: "Sitemap",
        description: "Browse all pages on Quilliams Gardening & Landscaping website.",
    },
    fallbackTitle: "Sitemap",
    canonicalPath: "/site-map",
});

const mainPages = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/pricing", label: "Pricing" },
    { href: "/quote", label: "Get a Quote" },
    { href: "/contact", label: "Contact" },
    { href: "/areas", label: "Areas We Cover" },
    { href: "/blog", label: "Blog" },
];

const legalPages = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
];

export default async function SitemapPage() {
    const [serviceSlugs, projectSlugs, blogPosts] = await Promise.all([
        listServiceSlugs(),
        listProjectSlugs(),
        listBlogPosts(),
    ]);
    const areaSlugs = Object.keys(areas);

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Sitemap</h1>
                
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Main Pages</h2>
                    <ul className="space-y-2">
                        {mainPages.map((page) => (
                            <li key={page.href}>
                                <Link 
                                    href={page.href}
                                    className="text-primary hover:underline"
                                >
                                    {page.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Services</h2>
                    <ul className="space-y-2">
                        {serviceSlugs.map((slug) => (
                            <li key={slug}>
                                <Link 
                                    href={`/services/${slug}`}
                                    className="text-primary hover:underline capitalize"
                                >
                                    {slug.replace(/-/g, " ")}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Areas We Cover</h2>
                    <ul className="space-y-2">
                        {areaSlugs.map((slug) => (
                            <li key={slug}>
                                <Link 
                                    href={`/areas/${slug}`}
                                    className="text-primary hover:underline"
                                >
                                    {areas[slug].name}, Cornwall
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                    <ul className="space-y-2">
                        {projectSlugs.map((slug) => (
                            <li key={slug}>
                                <Link 
                                    href={`/projects/${slug}`}
                                    className="text-primary hover:underline capitalize"
                                >
                                    {slug.replace(/-/g, " ")}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Blog</h2>
                    <ul className="space-y-2">
                        {blogPosts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-primary hover:underline"
                                >
                                    {post.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Legal</h2>
                    <ul className="space-y-2">
                        {legalPages.map((page) => (
                            <li key={page.href}>
                                <Link 
                                    href={page.href}
                                    className="text-primary hover:underline"
                                >
                                    {page.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <p className="text-muted-foreground text-sm mt-12">
                    For search engines: <Link href="/sitemap.xml" className="text-primary hover:underline">sitemap.xml</Link>
                </p>
            </div>
        </main>
    );
}
