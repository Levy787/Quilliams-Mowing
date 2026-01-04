import { paragraph, wrapEmailHtml } from "./_shared";

export type SubscribeUserData = {
    email: string;
};

export function subscribeUserTemplate(data: SubscribeUserData) {
    const subject = "You’re subscribed";

    const html = wrapEmailHtml(
        "Welcome",
        [
            paragraph(`Thanks — ${data.email} has been subscribed.`),
            paragraph(
                "You’ll receive occasional updates and offers. If you didn’t mean to subscribe, you can ignore this email.",
            ),
        ].join(""),
        {
            preheaderText: "Subscription confirmed.",
        },
    );

    const text = [
        `Thanks — ${data.email} has been subscribed.`,
        "",
        "You’ll receive occasional updates and offers. If you didn’t mean to subscribe, you can ignore this email.",
    ].join("\n");

    return { subject, html, text };
}
