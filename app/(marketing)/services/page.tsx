import { listServiceSlugs, getServiceBySlug } from "@/lib/keystatic-reader";
import ServicesLandingClient, {
    type ServiceCardModel,
} from "./ServicesLandingClient";

export default async function ServicesPage() {
    const slugs = await listServiceSlugs();
    const services = (await Promise.all(slugs.map((s) => getServiceBySlug(s))))
        .filter((s): s is NonNullable<typeof s> => !!s)
        .map(
            (service): ServiceCardModel => ({
                slug: service.slug,
                title: service.title,
                description: service.description,
            }),
        )
        .sort((a, b) =>
            a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug),
        );

    return <ServicesLandingClient services={services} />;
}

