import { labelValue, paragraph, wrapEmailHtml } from "./_shared";

export type SubscribeAdminData = {
    email: string;
};

export function subscribeAdminTemplate(data: SubscribeAdminData) {
    const subject = `New subscriber: ${data.email}`;

    const html = wrapEmailHtml(
        "New subscriber",
        [
            paragraph(
                "A new email address was submitted via the website subscribe form.",
            ),
            labelValue("Email", data.email),
        ].join(""),
    );

    const text = [
        "New subscriber",
        "",
        `Email: ${data.email}`,
    ].join("\n");

    return { subject, html, text };
}
