type ContactLead = {
    type: "contact";
    name: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
};

type QuoteRequestLead = {
    type: "quote_request";
    name: string;
    email: string;
    phone?: string;
    message?: string;
    service?: string;
    timeframe?: string;
    budgetRange?: string;
    address?: { line1: string };
};

type LeadMagnetLead = {
    type: "lead_magnet";
    name: string;
    email: string;
    source?: string;
};

type Lead = ContactLead | QuoteRequestLead | LeadMagnetLead;

function stripNullish(obj: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value != null) {
            if (typeof value === "object" && !Array.isArray(value)) {
                const nested = stripNullish(value as Record<string, unknown>);
                if (Object.keys(nested).length > 0) {
                    result[key] = nested;
                }
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

export async function sendLeadToTradeSender(lead: Lead): Promise<void> {
    const apiKey = process.env.TRADESENDER_API_KEY?.trim();
    if (!apiKey) return;

    const payload = stripNullish(lead as unknown as Record<string, unknown>);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    try {
        const res = await fetch("https://app.tradesender.co.uk/api/v1/leads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });

        if (process.env.NODE_ENV !== "production") {
            console.debug(
                `[TradeSender] ${lead.type} -> ${res.status}`,
            );
        }
    } catch (err) {
        if (process.env.NODE_ENV !== "production") {
            console.debug(
                "[TradeSender] failed",
                err instanceof Error ? err.message : err,
            );
        }
    } finally {
        clearTimeout(timeout);
    }
}
