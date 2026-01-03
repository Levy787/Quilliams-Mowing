import { getSiteContent } from "@/lib/keystatic-reader";

import { Navbar } from "./Navbar";

function resolveSiteUpload(file: string | null | undefined): string | undefined {
    const trimmed = file?.trim();
    return trimmed ? `/images/uploads/site/${trimmed}` : undefined;
}

function resolveLogoSrc({
    logoFile,
    logoSrc,
}: {
    logoFile?: string | null;
    logoSrc?: string | null;
}): string {
    return (
        resolveSiteUpload(logoFile) ||
        logoSrc?.trim() ||
        "/logos/logo-icon-text.webp"
    );
}

export async function NavbarWithContent() {
    const site = await getSiteContent();

    const navItems =
        site.navigation?.headerItems?.filter((item) =>
            Boolean(item?.label?.trim() && item?.href?.trim()),
        ) ?? [];

    const primaryCtaLabel = site.navigation?.primaryCta?.label?.trim() || undefined;
    const primaryCtaHref = site.navigation?.primaryCta?.href?.trim() || undefined;

    return (
        <Navbar
            logoSrc={resolveLogoSrc({
                logoFile: site.branding?.logoFile,
                logoSrc: site.branding?.logoSrc,
            })}
            logoAlt={
                site.branding?.logoAlt?.trim() ||
                site.siteName?.trim() ||
                "Website"
            }
            navItems={navItems.length ? navItems : undefined}
            primaryCtaLabel={primaryCtaLabel}
            primaryCtaHref={primaryCtaHref}
        />
    );
}
