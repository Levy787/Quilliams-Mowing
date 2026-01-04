import posthog from "posthog-js";

const CONSENT_COOKIE = "cookie_consent_analytics";

function getCookieValue(name: string): string | null {
    if (typeof document === "undefined") return null;
    const prefix = `${name}=`;
    const parts = document.cookie.split(";");
    for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.startsWith(prefix)) return decodeURIComponent(trimmed.slice(prefix.length));
    }
    return null;
}

function isGpcEnabled(): boolean {
    if (typeof navigator === "undefined") return false;
    return (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
if (key?.trim()) {
    posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        ui_host: process.env.NEXT_PUBLIC_UI_HOST,
        defaults: "2025-11-30",

        // We handle consent + pageview manually.
        capture_pageview: false,

        loaded: (ph) => {
            if (isGpcEnabled()) {
                ph.opt_out_capturing();
                return;
            }

            const consent = getCookieValue(CONSENT_COOKIE);

            // No choice yet: do not track.
            if (consent !== "accepted" && consent !== "rejected") {
                ph.opt_out_capturing();
                return;
            }

            if (consent === "accepted") {
                ph.set_config({
                    disable_persistence: false,
                    persistence: "localStorage+cookie",
                });
            } else {
                // User rejected analytics cookies: continue capturing, but without any persistence.
                ph.set_config({
                    disable_persistence: true,
                    persistence: "memory",
                });
            }

            ph.opt_in_capturing();
            ph.capture("$pageview");
        },
    });
}
