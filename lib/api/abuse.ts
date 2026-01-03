import type { NextRequest } from "next/server";

type Bucket = {
    count: number;
    resetAt: number;
};

const GLOBAL_KEY = "__quilliams_rate_limit_buckets__";

function getBuckets(): Map<string, Bucket> {
    const globalAny = globalThis as unknown as { [key: string]: unknown };
    const existing = globalAny[GLOBAL_KEY];
    if (existing instanceof Map) return existing as Map<string, Bucket>;

    const next = new Map<string, Bucket>();
    globalAny[GLOBAL_KEY] = next;
    return next;
}

export function getClientIp(req: NextRequest): string {
    const forwardedFor = req.headers.get("x-forwarded-for");
    if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

    const realIp = req.headers.get("x-real-ip");
    if (realIp) return realIp.trim();

    return "unknown";
}

export function isLikelyBotByHoneypot(value: unknown): boolean {
    if (typeof value !== "string") return false;
    return value.trim().length > 0;
}

export function checkRateLimit(params: {
    key: string;
    limit: number;
    windowMs: number;
}): { ok: true } | { ok: false; retryAfterSeconds: number } {
    const now = Date.now();
    const buckets = getBuckets();

    const bucket = buckets.get(params.key);

    if (!bucket || bucket.resetAt <= now) {
        buckets.set(params.key, { count: 1, resetAt: now + params.windowMs });
        return { ok: true };
    }

    if (bucket.count >= params.limit) {
        const retryAfterSeconds = Math.max(
            1,
            Math.ceil((bucket.resetAt - now) / 1000),
        );
        return { ok: false, retryAfterSeconds };
    }

    bucket.count += 1;
    buckets.set(params.key, bucket);
    return { ok: true };
}
