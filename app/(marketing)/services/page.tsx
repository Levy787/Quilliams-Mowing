import type { Metadata } from "next";

import {
    getServicesLandingContent,
    getServiceBySlug,
    listServiceSlugs,
} from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";
import ServicesLandingClient, {
    type ServiceCardModel,
    type ServicesLandingContentModel,
} from "./ServicesLandingClient";

export async function generateMetadata(): Promise<Metadata> {
    const content = await getServicesLandingContent();

    return buildMetadata({
        seo: content.seo,
        fallbackTitle: content.hero.title,
        fallbackDescription: content.hero.description,
        fallbackOgImage: content.hero.image.src || undefined,
    });
}

export default async function ServicesPage() {
    const content =
        (await getServicesLandingContent()) as unknown as ServicesLandingContentModel;

    const slugs = await listServiceSlugs();
    const services = (await Promise.all(slugs.map((s) => getServiceBySlug(s))))
        .filter((s): s is NonNullable<typeof s> => !!s)
        .map(
            (service): ServiceCardModel => ({
                slug: service.slug,
                title: service.title,
                description: service.description,
                tag: service.cardTag,
                icon: service.cardIcon,
            }),
        )
        .sort((a, b) =>
            a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug),
        );

    return <ServicesLandingClient services={services} content={content} />;
}

