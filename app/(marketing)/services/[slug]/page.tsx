import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServiceBySlug, listServiceSlugs } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
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

    // Get all service slugs and create related links (excluding current)
    const allSlugs = await listServiceSlugs();
    const relatedServices = await Promise.all(
        allSlugs
            .filter((s) => s !== slug)
            .slice(0, 4) // Limit to 4 related services
            .map(async (s) => {
                const svc = await getServiceBySlug(s);
                return svc ? { label: svc.title, href: `/services/${s}` } : null;
            })
    );
    const relatedLinks = relatedServices.filter((s): s is { label: string; href: string } => s !== null);

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
            <RelatedLinks
                title="Explore our other services"
                links={[
                    ...relatedLinks,
                    { label: "View All Services", href: "/services" },
                    { label: "Get a Quote", href: "/quote" },
                ]}
            />
        </>
    );
}
