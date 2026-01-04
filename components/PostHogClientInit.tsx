"use client";

import * as React from "react";

export function PostHogClientInit() {
    React.useEffect(() => {
        // Defer analytics initialization until after hydration.
        // This avoids DOM mutations (e.g. injected <script> tags) during hydration.
        void import("@/app/instrumentation-client");
    }, []);

    return null;
}
