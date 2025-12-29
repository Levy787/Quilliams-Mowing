import { Banner } from "@/components/layout/Banner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";



export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
