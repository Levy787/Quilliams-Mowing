import { keyValueTable, paragraph, textBox, wrapEmailHtml } from "./_shared";

export type ContactAdminData = {
    name: string;
    email: string;
    phone?: string | null;
    service?: string | null;
    message: string;
};

export function contactAdminTemplate(data: ContactAdminData) {
    const subject = `New contact form submission from ${data.name}`;

    const phone = data.phone?.trim() ? data.phone.trim() : "(not provided)";
    const service = data.service?.trim()
        ? data.service.trim()
        : "(not selected)";

    const html = wrapEmailHtml(
        "New contact enquiry",
        [
            paragraph("A new contact form submission was received."),
            keyValueTable([
                { label: "Name", value: data.name },
                { label: "Email", value: data.email },
                { label: "Phone", value: phone },
                { label: "Service", value: service },
            ]),
            paragraph("Message"),
            textBox(data.message),
        ].join(""),
        {
            preheaderText: `New contact enquiry from ${data.name}`,
        },
    );

    const text = [
        "New contact enquiry",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        "",
        "Message",
        "----------------",
        data.message,
    ].join("\n");

    return { subject, html, text };
}
