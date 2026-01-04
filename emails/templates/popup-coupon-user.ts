import { codeBox, paragraph, wrapEmailHtml } from "./_shared";

export type PopupCouponUserData = {
    email: string;
    offerCode: string;
    offerHeadline?: string | null;
};

export function popupCouponUserTemplate(data: PopupCouponUserData) {
    const code = data.offerCode.trim();
    const subject = `Your offer code: ${code}`;

    const title = data.offerHeadline?.trim() || "Your offer code";

    const html = wrapEmailHtml(
        title,
        [
            paragraph("Thanks — here’s your offer code:"),
            codeBox(code),
            paragraph("Use this code when booking."),
            paragraph("If you didn’t request this, you can ignore this email."),
        ].join(""),
        {
            preheaderText: `Your offer code: ${code}`,
        },
    );

    const text = [
        "Your offer code",
        "",
        code,
        "",
        "Use this code when booking.",
        "",
        "If you didn’t request this, you can ignore this email.",
    ].join("\n");

    return { subject, html, text };
}
