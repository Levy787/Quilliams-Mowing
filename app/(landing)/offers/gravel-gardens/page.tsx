import type { Metadata } from "next";
import OfferClient from "./OfferClient";

export const metadata: Metadata = {
    title: {
        absolute: "Gravel Garden Installers in Newquay | Quilliams",
    },
    description:
        "Turn an overgrown Newquay front garden or tired lawn into a clean, low-maintenance gravel garden. Book a free site visit and fixed quote.",
    openGraph: {
        title: "Gravel Garden Installers in Newquay | Quilliams",
        description:
            "Clear the mess, prepare the base, fit membrane, edging and gravel, then take the waste away. Book a free site visit and fixed quote.",
        type: "website",
        images: [
            {
                url: "/images/uploads/overgrown-mess-to-clean-gravel-garden/hero/imageFile.webp",
                width: 1280,
                height: 960,
                alt: "Finished gravel garden in Newquay",
            },
        ],
    },
};

export default function GravelGardenOfferPage() {
    return <OfferClient />;
}
