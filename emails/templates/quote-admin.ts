import { keyValueTable, paragraph, textBox, wrapEmailHtml } from "./_shared";

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

    const phone = data.phone?.trim() ? data.phone.trim() : "(not provided)";
    const address = data.address?.trim()
        ? data.address.trim()
        : "(not provided)";
    const timeframe = data.timeframe?.trim()
        ? data.timeframe.trim()
        : "(not selected)";
    const budget = data.budget?.trim() ? data.budget.trim() : "(not selected)";
    const calculatorSummary = data.calculatorSummary?.trim()
        ? data.calculatorSummary.trim()
        : "";
    const jobDetails = data.jobDetails?.trim() ? data.jobDetails.trim() : "";

    const html = wrapEmailHtml(
        "New quote request",
        [
            paragraph("A new quote request was received."),
            keyValueTable([
                { label: "Name", value: data.name },
                { label: "Email", value: data.email },
                { label: "Phone", value: phone },
                { label: "Address", value: address },
                { label: "Service type", value: data.serviceType },
                { label: "Timeframe", value: timeframe },
                { label: "Budget", value: budget },
            ]),

            calculatorSummary ? paragraph("Calculator summary") : "",
            calculatorSummary ? textBox(calculatorSummary) : "",

            paragraph("Job details"),
            textBox(jobDetails || "(not provided)"),
            paragraph(
                "Note: photos are not attached via the website at the moment. Reply to the customer to request them if needed.",
            ),
        ].join(""),
        {
            preheaderText: `New quote request from ${data.name}`,
        },
    );

    const text = [
        "New quote request",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${phone}`,
        `Address: ${address}`,
        `Service type: ${data.serviceType}`,
        `Timeframe: ${timeframe}`,
        `Budget: ${budget}`,
        "",
        calculatorSummary
            ? [
                "Calculator summary",
                "------------------",
                calculatorSummary,
                "",
            ].join("\n")
            : "",
        "Job details",
        "----------",
        jobDetails || "(not provided)",
        "",
        "Note: photos are not attached via the website at the moment. Reply to the customer to request them if needed.",
    ].filter(Boolean).join("\n");

    return { subject, html, text };
}
