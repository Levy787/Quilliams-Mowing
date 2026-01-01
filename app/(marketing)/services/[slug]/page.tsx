import { notFound } from "next/navigation";

import { getServiceBySlug, listServiceSlugs } from "@/lib/keystatic-reader";
import ServiceDetailClient from "./service-detail-client";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
    const slugs = await listServiceSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) notFound();

    return <ServiceDetailClient service={service} />;
}
