import { labelValue, paragraph, wrapEmailHtml } from "./_shared";

export type QuoteAdminData = {
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    serviceType: string;
    timeframe?: string | null;
    budget?: string | null;
    jobDetails?: string | null;
    calculatorSummary?: string | null;
};

export function quoteAdminTemplate(data: QuoteAdminData) {
    const subject = `New quote request from ${data.name}`;

    const html = wrapEmailHtml(
        "New quote request",
        [
            paragraph("You have received a new quote request."),
            labelValue("Name", data.name),
            labelValue("Email", data.email),
            labelValue(
                "Phone",
                data.phone?.trim() ? data.phone : "(not provided)",
            ),
            labelValue(
                "Address",
                data.address?.trim() ? data.address : "(not provided)",
            ),
            labelValue("Service type", data.serviceType),
            labelValue(
                "Timeframe",
                data.timeframe?.trim() ? data.timeframe : "(not selected)",
            ),
            labelValue(
                "Budget",
                data.budget?.trim() ? data.budget : "(not selected)",
            ),
            labelValue(
                "Calculator summary",
                data.calculatorSummary?.trim()
                    ? data.calculatorSummary
                    : "(not provided)",
            ),
            labelValue(
                "Job details",
                data.jobDetails?.trim() ? data.jobDetails : "(not provided)",
            ),
            paragraph(
                "Note: photos are not attached via the website at the moment. Reply to the customer to request them if needed.",
            ),
        ].join(""),
    );

    const text = [
        "New quote request",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone?.trim() ? data.phone : "(not provided)"}`,
        `Address: ${data.address?.trim() ? data.address : "(not provided)"}`,
        `Service type: ${data.serviceType}`,
        `Timeframe: ${
            data.timeframe?.trim() ? data.timeframe : "(not selected)"
        }`,
        `Budget: ${data.budget?.trim() ? data.budget : "(not selected)"}`,
        `Calculator summary: ${
            data.calculatorSummary?.trim()
                ? data.calculatorSummary
                : "(not provided)"
        }`,
        "",
        "Job details:",
        data.jobDetails?.trim() ? data.jobDetails : "(not provided)",
        "",
        "Note: photos are not attached via the website at the moment. Reply to the customer to request them if needed.",
    ].join("\n");

    return { subject, html, text };
}
