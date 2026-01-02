import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectBySlug, listProjectSlugs } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";
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

    return <ProjectDetailClient project={project} />;
}
