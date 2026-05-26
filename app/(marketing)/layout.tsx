import { Banner } from "@/components/layout/Banner";
import { NavbarWithContent } from "@/components/layout/NavbarWithContent";
import { FooterWithContent } from "@/components/layout/FooterWithContent";
import { CookieBanner } from "@/components/CookieBanner";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { PersonSchema } from "@/components/seo/PersonSchema";
import { WebSiteSchema } from "@/components/seo/WebSiteSchema";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <LocalBusinessSchema />
            <PersonSchema />
            <WebSiteSchema />
            <Banner />
            <NavbarWithContent />
            {children}
            <FooterWithContent />
            <CookieBanner />
            <StickyMobileCTA />
            <ExitIntentPopup />
            <WhatsAppButton />
        </>
    );
}
