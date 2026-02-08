import type { Metadata } from "next";
import OfferClient from "./OfferClient";

export const metadata: Metadata = {
    title: "Free Gravel Garden Design Consultation | Quilliams Gardening & Landscaping",
    description:
        "Tired of mowing or got an overgrown mess? Transform your garden into a stunning, low-maintenance gravel garden in as little as 3 days. Free design consultation worth £150. Serving Cornwall.",
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
