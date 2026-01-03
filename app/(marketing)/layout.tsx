import { Banner } from "@/components/layout/Banner";
import { NavbarWithContent } from "@/components/layout/NavbarWithContent";
import { FooterWithContent } from "@/components/layout/FooterWithContent";



export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Banner />
            <NavbarWithContent />
            {children}
            <FooterWithContent />
        </>
    );
}
