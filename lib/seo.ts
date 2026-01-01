import type { Metadata } from "next";

export type SeoFields = {
    title?: string | null;
    description?: string | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: string | null;
};

function clean(value: string | null | undefined): string | undefined {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}

export function buildMetadata({
    seo,
    fallbackTitle,
    fallbackDescription,
    fallbackOgImage,
}: {
    seo?: SeoFields | null;
    fallbackTitle: string;
    fallbackDescription?: string;
    fallbackOgImage?: string;
}): Metadata {
    const title = clean(seo?.title) ?? fallbackTitle;
    const description = clean(seo?.description) ?? clean(fallbackDescription);

    const ogTitle = clean(seo?.ogTitle) ?? title;
    const ogDescription = clean(seo?.ogDescription) ?? description;
    const ogImage = clean(seo?.ogImage) ?? clean(fallbackOgImage);

    return {
        title,
        description,
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            images: ogImage ? [{ url: ogImage }] : undefined,
        },
    };
}
