import posthog from "posthog-js";

const CONSENT_COOKIE = "cookie_consent_analytics";
const DEBUG = process.env.NODE_ENV !== "production";
const API_HOST = "/ph";

function getCookieValue(name: string): string | null {
    if (typeof document === "undefined") return null;
    const prefix = `${name}=`;
    const parts = document.cookie.split(";");
    for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.startsWith(prefix)) {
            return decodeURIComponent(trimmed.slice(prefix.length));
        }
    }
    return null;
}

function isGpcEnabled(): boolean {
    if (typeof navigator === "undefined") return false;
    return (navigator as unknown as { globalPrivacyControl?: boolean })
        .globalPrivacyControl === true;
}

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
if (key?.trim()) {
    if (DEBUG && typeof window !== "undefined") {
         
        console.info("[posthog] instrumentation-client loaded", {
            api_host: API_HOST,
            ui_host: process.env.NEXT_PUBLIC_UI_HOST,
            hasKey: Boolean(key?.trim()),
        });
    }

    posthog.init(key, {
        // Per PostHog Next.js reverse-proxy docs: use a relative path.
        api_host: API_HOST,
        ui_host: process.env.NEXT_PUBLIC_UI_HOST,
        defaults: "2025-11-30",

        // We handle consent + pageview manually.
        capture_pageview: false,

        on_request_error: (err) => {
            if (!DEBUG) return;
             
            console.warn("[posthog] request error", {
                statusCode: err.statusCode,
                text: err.text,
            });
        },

        loaded: (ph) => {
            if (DEBUG) {
                 
                console.info("[posthog] loaded", {
                    api_host: ph.config.api_host,
                    ui_host: ph.config.ui_host,
                });
            }

            if (isGpcEnabled()) {
                if (DEBUG) {
                     
                    console.info("[posthog] GPC enabled -> opt_out");
                }
                ph.opt_out_capturing();
                return;
            }

            const consent = getCookieValue(CONSENT_COOKIE);

            if (DEBUG) {
                 
                console.info("[posthog] consent", { consent });
            }

            // No choice yet: do not track.
            if (consent !== "accepted" && consent !== "rejected") {
                if (DEBUG) {
                     
                    console.info("[posthog] no consent yet -> opt_out");
                }
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

            if (DEBUG) {
                 
                console.info("[posthog] capture enabled", {
                    mode: consent === "accepted" ? "persistent" : "cookieless",
                });
            }
        },
    });
} else {
    if (DEBUG && typeof window !== "undefined") {
         
        console.info("[posthog] disabled (missing NEXT_PUBLIC_POSTHOG_KEY)");
    }
}
