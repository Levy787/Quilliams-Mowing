"use client";

import { initializePostHog } from "@/app/instrumentation-client";

export type PostHogEventProperties = Record<string, unknown>;

const GA_EVENT_MAP: Record<string, { name: string; method?: string }> = {
    conversion_contact_submit: { name: "generate_lead", method: "contact_form" },
    conversion_quote_submit: { name: "generate_lead", method: "quote_form" },
    conversion_gravel_offer_submit: { name: "generate_lead", method: "gravel_offer_form" },
    conversion_exit_intent_lead: { name: "generate_lead", method: "exit_intent_form" },
    click_phone: { name: "click_phone" },
    click_whatsapp: { name: "click_whatsapp" },
};

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

function toGoogleAnalyticsParams(
    properties: PostHogEventProperties | undefined,
): Record<string, string | number | boolean> {
    const params: Record<string, string | number | boolean> = {};

    for (const [key, value] of Object.entries(properties ?? {})) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            params[key] = value;
        }
    }

    return params;
}

function captureGoogleAnalyticsEvent(
    eventName: string,
    properties?: PostHogEventProperties,
) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    const mapped = GA_EVENT_MAP[eventName] ?? { name: eventName };
    window.gtag("event", mapped.name, {
        ...toGoogleAnalyticsParams(properties),
        ...(mapped.method ? { method: mapped.method } : {}),
        site_event: eventName,
    });
}

export async function capturePostHogEvent(
    eventName: string,
    properties?: PostHogEventProperties,
) {
    captureGoogleAnalyticsEvent(eventName, properties);

    try {
        const posthog = await initializePostHog();
        posthog?.capture(eventName, properties);
    } catch {
        // Best-effort: analytics should never break UX.
    }
}
