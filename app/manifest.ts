import type { MetadataRoute } from "next";

import { getSiteContent } from "@/lib/keystatic-reader";

function clean(value: string | null | undefined): string | undefined {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}

function resolveSiteUpload(
    file: string | null | undefined,
): string | undefined {
    const trimmed = file?.trim();
    return trimmed ? `/images/uploads/site/${trimmed}` : undefined;
}

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const site = await getSiteContent();

    const name = clean(site.siteName) ?? "Website";

    const themeColor = clean(site.pwa?.themeColor);
    const backgroundColor = clean(site.pwa?.backgroundColor);

    const android192 = resolveSiteUpload(site.assets?.androidChrome192PngFile);
    const android512 = resolveSiteUpload(site.assets?.androidChrome512PngFile);

    const icons: NonNullable<MetadataRoute.Manifest["icons"]> = [
        android192
            ? {
                src: android192,
                sizes: "192x192",
                type: "image/png",
            }
            : null,
        android512
            ? {
                src: android512,
                sizes: "512x512",
                type: "image/png",
            }
            : null,
    ].filter((x): x is NonNullable<typeof x> => Boolean(x));

    return {
        name,
        short_name: name,
        start_url: "/",
        scope: "/",
        display: "standalone",
        ...(themeColor ? { theme_color: themeColor } : {}),
        ...(backgroundColor ? { background_color: backgroundColor } : {}),
        ...(icons.length ? { icons } : {}),
    };
}
