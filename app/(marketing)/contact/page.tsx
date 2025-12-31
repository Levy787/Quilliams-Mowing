import ContactClient from "./ContactClient";
import { getContactContent } from "@/lib/keystatic-reader";

export default async function ContactPage() {
    const contact = await getContactContent();
    return <ContactClient {...contact} />;
}

