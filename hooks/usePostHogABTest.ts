"use client";

import { useFeatureFlag } from "./useFeatureFlag";

export function usePostHogABTest<T extends string = string>(
    experimentKey: string,
    defaultVariant: T = "control" as T,
): T {
    const flag = useFeatureFlag(experimentKey);
    return (typeof flag === "string" ? flag : defaultVariant) as T;
}
