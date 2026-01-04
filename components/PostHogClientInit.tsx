"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

export function PostHogClientInit() {
    const pathname = usePathname();

    React.useEffect(() => {
        // Defer analytics initialization until after hydration.
        // This avoids DOM mutations (e.g. injected <script> tags) during hydration.
        void import("@/app/instrumentation-client");
    }, []);

    React.useEffect(() => {
        let cancelled = false;

        async function capturePageView() {
            await import("@/app/instrumentation-client");
            if (cancelled) return;

            posthog.capture("$pageview", {
                $current_url:
                    typeof window !== "undefined" ? window.location.href : undefined,
            });
        }

        void capturePageView();
        return () => {
            cancelled = true;
        };
    }, [pathname]);

    return null;
}
