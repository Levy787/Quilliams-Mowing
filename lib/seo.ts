import type { Metadata } from "next";

const DEFAULT_OG_IMAGE = "https://quilliamsmowing.co.uk/images/uploads/site/og-image.png";
const SITE_NAME = "Quilliams Gardening & Landscaping";
const SITE_URL = "https://quilliamsmowing.co.uk";

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

function resolveImageUrl(image: string | undefined): string {
    if (!image) return DEFAULT_OG_IMAGE;
    if (image.startsWith("http")) return image;
    return `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

export function buildMetadata({
    seo,
    fallbackTitle,
    fallbackDescription,
    fallbackOgImage,
    isHomepage = false,
    canonicalPath,
}: {
    seo?: SeoFields | null;
    fallbackTitle: string;
    fallbackDescription?: string;
    fallbackOgImage?: string;
    isHomepage?: boolean;
    canonicalPath?: string;
}): Metadata {
    const titleText = clean(seo?.title) ?? fallbackTitle;
    const description = clean(seo?.description) ?? clean(fallbackDescription);

    const ogTitle = clean(seo?.ogTitle) ?? titleText;
    const ogDescription = clean(seo?.ogDescription) ?? description;
    const ogImageUrl = resolveImageUrl(clean(seo?.ogImage) ?? clean(fallbackOgImage));

    // For homepage, use absolute title to avoid "Site Name | Site Name"
    const title = isHomepage ? { absolute: titleText } : titleText;

    // Build canonical URL
    const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;

    return {
        title,
        description,
        alternates: canonical ? { canonical } : undefined,
        openGraph: {
            type: isHomepage ? "website" : "article",
            siteName: SITE_NAME,
            locale: "en_GB",
            title: ogTitle,
            description: ogDescription,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: ogTitle,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: ogTitle,
            description: ogDescription,
            images: [ogImageUrl],
        },
    };
}
