import { keyValueTable, paragraph, wrapEmailHtml } from "./_shared";

export type SubscribeAdminData = {
    email?: string | null;
    phone?: string | null;
    source?: string | null;
};

export function subscribeAdminTemplate(data: SubscribeAdminData) {
    const contact = data.email || data.phone || "unknown";
    const subject = `New lead: ${contact}`;

    const sourceLabel = data.source === "exit-intent"
        ? "Exit intent popup"
        : data.source || "Subscribe form";

    const rows: Array<{ label: string; value: string }> = [];
    if (data.email) rows.push({ label: "Email", value: data.email });
    if (data.phone) rows.push({ label: "Phone", value: data.phone });
    rows.push({ label: "Source", value: sourceLabel });

    const html = wrapEmailHtml(
        "New lead",
        [
            paragraph(
                "A new contact was captured via the website.",
            ),
            keyValueTable(rows),
        ].join(""),
        {
            preheaderText: `New lead: ${contact}`,
        },
    );

    const text = [
        "New lead",
        "",
        ...(data.email ? [`Email: ${data.email}`] : []),
        ...(data.phone ? [`Phone: ${data.phone}`] : []),
        `Source: ${sourceLabel}`,
    ].join("\n");

    return { subject, html, text };
}
