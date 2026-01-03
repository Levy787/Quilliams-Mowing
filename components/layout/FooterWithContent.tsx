import { getSiteContent } from "@/lib/keystatic-reader";

import { FooterInner } from "./Footer";

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

export async function FooterWithContent() {
    const site = await getSiteContent();

    const footerLinks =
        site.navigation?.footerItems?.filter((item) =>
            Boolean(item?.label?.trim() && item?.href?.trim()),
        ) ?? [];

    const socialLinks =
        site.footer?.socialLinks?.filter((item) => Boolean(item?.href?.trim())) ?? [];

    const businessHours =
        site.footer?.businessHours?.filter((row) =>
            Boolean(row?.dayLabel?.trim() && row?.hours?.trim()),
        ) ?? [];

    return (
        <FooterInner
            logoSrc={resolveLogoSrc({
                logoFile: site.branding?.logoFile,
                logoSrc: site.branding?.logoSrc,
            })}
            logoAlt={
                site.branding?.logoAlt?.trim() ||
                site.siteName?.trim() ||
                "Website"
            }
            aboutText={site.footer?.aboutText?.trim() || undefined}
            connectHeading={site.footer?.connectHeading?.trim() || undefined}
            businessHoursHeading={site.footer?.businessHoursHeading?.trim() || undefined}
            businessHours={businessHours.length ? businessHours : undefined}
            phoneLabel={site.footer?.phoneLabel?.trim() || undefined}
            phoneNumber={site.footer?.phoneNumber?.trim() || undefined}
            phoneDisplay={site.footer?.phoneDisplay?.trim() || undefined}
            subscribeHeading={site.footer?.subscribeHeading?.trim() || undefined}
            subscribeText={site.footer?.subscribeText?.trim() || undefined}
            socialLinks={socialLinks.length ? socialLinks : undefined}
            copyrightText={site.footer?.copyrightText?.trim() || undefined}
            creditText={site.footer?.creditText?.trim() || undefined}
            creditHref={site.footer?.creditHref?.trim() || undefined}
            footerLinks={footerLinks.length ? footerLinks : undefined}
        />
    );
}
