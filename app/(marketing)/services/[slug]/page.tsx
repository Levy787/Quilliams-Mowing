import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServiceBySlug, listServiceSlugs } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import ServiceDetailClient from "./service-detail-client";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const slugs = await listServiceSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);
    if (!service) notFound();

    return buildMetadata({
        seo: service.seo,
        fallbackTitle: service.title,
        fallbackDescription: service.description,
        fallbackOgImage: service.hero.imageSrc,
        canonicalPath: `/services/${slug}`,
    });
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) notFound();

    const breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: service.title, href: `/services/${slug}` },
    ];

    return (
        <>
            <ServiceSchema
                name={service.title}
                description={service.description}
                url={`https://quilliamsmowing.co.uk/services/${slug}`}
                image={service.hero.imageSrc}
            />
            <BreadcrumbSchema items={breadcrumbs} />
            <ServiceDetailClient service={service} />
        </>
    );
}
