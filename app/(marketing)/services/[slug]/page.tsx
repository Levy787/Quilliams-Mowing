import { notFound } from "next/navigation";

import {
    getServiceBySlug,
    SERVICES,
    type ServiceSlug,
} from "@/app/(marketing)/services/_content/services";
import ServiceDetailClient from "./service-detail-client";

export function generateStaticParams(): Array<{ slug: ServiceSlug }> {
    return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) notFound();

    return <ServiceDetailClient service={service} />;
}
