import { Banner } from "@/components/layout/Banner";
import { NavbarWithContent } from "@/components/layout/NavbarWithContent";
import { FooterWithContent } from "@/components/layout/FooterWithContent";
import { PopupWithContent } from "@/components/popups/PopupWithContent";
import { CookieBanner } from "@/components/CookieBanner";



export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Banner />
            <NavbarWithContent />
            <PopupWithContent />
            {children}
            <FooterWithContent />
            <CookieBanner />
        </>
    );
}
