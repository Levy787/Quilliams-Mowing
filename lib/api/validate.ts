export function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.trim().length > 0;
}

export function asTrimmedString(value: unknown): string | null {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

export function isProbablyEmail(value: unknown): value is string {
    if (typeof value !== "string") return false;
    const trimmed = value.trim();
    if (!trimmed) return false;

    // MVP-level check; avoids pulling in extra dependencies.
    return trimmed.includes("@") && trimmed.includes(".");
}
