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
    isHomepage = false,
}: {
    seo?: SeoFields | null;
    fallbackTitle: string;
    fallbackDescription?: string;
    fallbackOgImage?: string;
    isHomepage?: boolean;
}): Metadata {
    const titleText = clean(seo?.title) ?? fallbackTitle;
    const description = clean(seo?.description) ?? clean(fallbackDescription);

    const ogTitle = clean(seo?.ogTitle) ?? titleText;
    const ogDescription = clean(seo?.ogDescription) ?? description;
    const ogImage = clean(seo?.ogImage) ?? clean(fallbackOgImage);

    // For homepage, use absolute title to avoid "Site Name | Site Name"
    const title = isHomepage ? { absolute: titleText } : titleText;

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
