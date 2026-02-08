import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectBySlug, listProjectSlugs } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import ProjectDetailClient from "./project-detail-client";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const slugs = await listProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) notFound();

    return buildMetadata({
        seo: project.seo,
        fallbackTitle: project.title,
        fallbackDescription: project.subtitle,
        fallbackOgImage: project.hero.imageSrc,
        canonicalPath: `/projects/${slug}`,
    });
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) notFound();

    // Build related project links (excluding current)
    const allSlugs = await listProjectSlugs();
    const relatedProjects = await Promise.all(
        allSlugs
            .filter((s) => s !== slug)
            .slice(0, 3)
            .map(async (s) => {
                const proj = await getProjectBySlug(s);
                return proj ? { label: proj.title, href: `/projects/${s}` } : null;
            })
    );
    const relatedLinks = relatedProjects.filter(
        (p): p is { label: string; href: string } => p !== null
    );

    const breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
        { name: project.title, href: `/projects/${slug}` },
    ];

    return (
        <>
            <BreadcrumbSchema items={breadcrumbs} />
            <ProjectDetailClient project={project} />
            <RelatedLinks
                title="More of our projects"
                links={[
                    ...relatedLinks,
                    { label: "View All Projects", href: "/projects" },
                    { label: "Our Services", href: "/services" },
                    { label: "Get a Quote", href: "/quote" },
                ]}
            />
        </>
    );
}
