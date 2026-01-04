import type { NextRequest } from "next/server";

export type TurnstileVerificationOutcome =
    | { ok: true }
    | { ok: false; error: string; errorCodes?: ReadonlyArray<string> };

function normalizeSecret(secret: string | null | undefined): string | null {
    return secret?.trim() ? secret.trim() : null;
}

function getClientIpBestEffort(req: NextRequest): string | null {
    const cf = req.headers.get("CF-Connecting-IP");
    if (cf?.trim()) return cf;

    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded?.trim()) return forwarded.split(",")[0]?.trim() || null;

    return null;
}

export async function verifyTurnstileToken(
    req: NextRequest,
    token: string | null | undefined,
    options?: {
        secret?: string | null;
    },
): Promise<TurnstileVerificationOutcome> {
    const trimmed = token?.trim() ?? "";
    if (!trimmed) {
        return { ok: false, error: "Please complete the verification." };
    }

    const secret = normalizeSecret(options?.secret) ??
        normalizeSecret(process.env.TURNSTILE_SECRET_KEY);
    if (!secret) {
        if (process.env.NODE_ENV !== "production") {
            // Allow local development without keys.
            return { ok: true };
        }

        return {
            ok: false,
            error: "Server is missing Turnstile configuration.",
        };
    }

    const ip = getClientIpBestEffort(req);

    const body = new URLSearchParams({
        secret,
        response: trimmed,
        ...(ip ? { remoteip: ip } : {}),
    });

    const res = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
        },
    );

    const json = (await res.json().catch(() => null)) as
        | { success: boolean; "error-codes"?: string[] }
        | null;

    if (!res.ok || !json) {
        return {
            ok: false,
            error: "Unable to verify. Please try again.",
        };
    }

    if (!json.success) {
        return {
            ok: false,
            error: "Verification failed. Please try again.",
            errorCodes: json["error-codes"],
        };
    }

    return { ok: true };
}
