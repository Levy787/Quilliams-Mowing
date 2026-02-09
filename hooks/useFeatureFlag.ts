"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";

export function useFeatureFlag(flagKey: string): string | boolean | undefined {
    const [value, setValue] = useState<string | boolean | undefined>(undefined);

    useEffect(() => {
        void import("@/app/instrumentation-client").then(() => {
            const current = posthog.getFeatureFlag(flagKey);
            if (current !== undefined) {
                setValue(current);
            }
            posthog.onFeatureFlags(() => {
                setValue(posthog.getFeatureFlag(flagKey));
            });
        });
    }, [flagKey]);

    return value;
}
