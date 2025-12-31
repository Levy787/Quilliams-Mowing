import { notFound } from "next/navigation";

import {
    getProjectBySlug,
    PROJECTS,
    type ProjectSlug,
} from "@/app/(marketing)/projects/_content/projects";
import ProjectDetailClient from "./project-detail-client";

export function generateStaticParams(): Array<{ slug: ProjectSlug }> {
    return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) notFound();

    return <ProjectDetailClient project={project} />;
}
