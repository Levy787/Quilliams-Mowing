import type { Metadata } from "next";

import { getProjectsLandingContent, listProjects } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import ProjectsClient from "./ProjectsClient";

function resolveImageSrc({
    file,
    src,
}: {
    file?: string | null;
    src?: string | null;
}): string {
    if (file?.trim()) return `/images/uploads/${file}`;
    return src ?? "";
}

export async function generateMetadata(): Promise<Metadata> {
    const content = await getProjectsLandingContent();
    const heroImageSrc = resolveImageSrc({
        file: content.hero.image.file,
        src: content.hero.image.src,
    });

    return buildMetadata({
        seo: content.seo,
        fallbackTitle: content.hero.title || "Projects",
        fallbackDescription: content.hero.description,
        fallbackOgImage: heroImageSrc,
        canonicalPath: "/projects",
    });
}

export default async function ProjectsPage() {
    const [content, projects] = await Promise.all([
        getProjectsLandingContent(),
        listProjects(),
    ]);

    return (
        <>
            <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Projects", href: "/projects" }]} />
            <ProjectsClient content={content} projects={projects} />
        </>
    );
}
