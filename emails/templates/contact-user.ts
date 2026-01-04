import { paragraph, wrapEmailHtml } from "./_shared";

export type ContactUserData = {
    name: string;
};

export function contactUserTemplate(data: ContactUserData) {
    const subject = "Thanks for getting in touch";

    const html = wrapEmailHtml(
        "We’ve received your message",
        [
            paragraph(`Hi ${data.name},`),
            paragraph(
                "Thanks for contacting us — we’ve received your message and will get back to you as soon as we can.",
            ),
            paragraph(
                "If you have any extra details (photos, measurements, access notes), you can simply reply to this email.",
            ),
        ].join(""),
        {
            preheaderText: "We’ve received your message and will be in touch.",
        },
    );

    const text = [
        `Hi ${data.name},`,
        "",
        "Thanks for contacting us — we’ve received your message and will get back to you as soon as we can.",
        "",
        "If you have any extra details (photos, measurements, access notes), you can simply reply to this email.",
    ].join("\n");

    return { subject, html, text };
}
