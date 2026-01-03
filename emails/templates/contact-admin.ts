import { labelValue, paragraph, wrapEmailHtml } from "./_shared";

export type ContactAdminData = {
    name: string;
    email: string;
    phone?: string | null;
    service?: string | null;
    message: string;
};

export function contactAdminTemplate(data: ContactAdminData) {
    const subject = `New contact form submission from ${data.name}`;

    const html = wrapEmailHtml(
        "New contact enquiry",
        [
            paragraph("You have received a new contact form submission."),
            labelValue("Name", data.name),
            labelValue("Email", data.email),
            labelValue(
                "Phone",
                data.phone?.trim() ? data.phone : "(not provided)",
            ),
            labelValue(
                "Service",
                data.service?.trim() ? data.service : "(not selected)",
            ),
            labelValue("Message", data.message),
        ].join(""),
    );

    const text = [
        "New contact enquiry",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone?.trim() ? data.phone : "(not provided)"}`,
        `Service: ${data.service?.trim() ? data.service : "(not selected)"}`,
        "",
        "Message:",
        data.message,
    ].join("\n");

    return { subject, html, text };
}
