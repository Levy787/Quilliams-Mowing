"use client";

import type posthogType from "posthog-js";

export type PostHogEventProperties = Record<string, unknown>;

export async function capturePostHogEvent(
    eventName: string,
    properties?: PostHogEventProperties,
) {
    try {
        // Ensure PostHog has been initialized (module-level init).
        await import("@/app/instrumentation-client");

        const mod = (await import("posthog-js")) as unknown as {
            default: typeof posthogType;
        };

        mod.default.capture(eventName, properties);
    } catch {
        // Best-effort: analytics should never break UX.
    }
}
