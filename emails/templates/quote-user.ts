import { paragraph, wrapEmailHtml } from "./_shared";

export type QuoteUserData = {
    name: string;
};

export function quoteUserTemplate(data: QuoteUserData) {
    const subject = "Thanks — we’ve received your quote request";

    const html = wrapEmailHtml(
        "Quote request received",
        [
            paragraph(`Hi ${data.name},`),
            paragraph(
                "Thanks for requesting a quote — we’ve received your details and will be in touch shortly.",
            ),
            paragraph(
                "If you have photos you’d like to share, just reply to this email and attach them.",
            ),
        ].join(""),
    );

    const text = [
        `Hi ${data.name},`,
        "",
        "Thanks for requesting a quote — we’ve received your details and will be in touch shortly.",
        "",
        "If you have photos you’d like to share, just reply to this email and attach them.",
    ].join("\n");

    return { subject, html, text };
}
