"use client";

// Ensure PostHog instrumentation runs in the client bundle.
import "@/app/instrumentation-client";

export function PostHogClientInit() {
    return null;
}
