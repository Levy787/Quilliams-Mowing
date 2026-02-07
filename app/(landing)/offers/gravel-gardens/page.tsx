import type { Metadata } from "next";
import OfferClient from "./OfferClient";

export const metadata: Metadata = {
    title: "Free Gravel Garden Design Consultation | Quilliams Gardening & Landscaping",
    description:
        "Tired of endless mowing? Transform your garden with a beautiful, low-maintenance gravel garden. Book your free design consultation worth £150. Serving Cornwall.",
    openGraph: {
        title: "Free Gravel Garden Design Consultation | Quilliams",
        description:
            "Transform your garden in as little as 3 days. No more mowing, no more weeding. Book your free site visit today.",
        type: "website",
    },
};

export default function GravelGardenOfferPage() {
    return <OfferClient />;
}
