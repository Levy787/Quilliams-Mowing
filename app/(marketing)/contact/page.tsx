import type { Metadata } from "next";

import ContactClient from "./ContactClient";
import { getContactContent } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    const contact = await getContactContent();

    return buildMetadata({
        seo: contact.seo,
        fallbackTitle: "Contact",
        fallbackDescription: contact.header.description,
    });
}

export default async function ContactPage() {
    const contact = await getContactContent();
    return <ContactClient {...contact} />;
}

