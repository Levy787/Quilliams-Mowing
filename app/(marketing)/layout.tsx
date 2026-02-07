import { Banner } from "@/components/layout/Banner";
import { NavbarWithContent } from "@/components/layout/NavbarWithContent";
import { FooterWithContent } from "@/components/layout/FooterWithContent";
import { CookieBanner } from "@/components/CookieBanner";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LocalBusinessSchema />
            <Banner />
            <NavbarWithContent />
            {children}
            <FooterWithContent />
            <CookieBanner />
            <StickyMobileCTA />
        </>
    );
}
