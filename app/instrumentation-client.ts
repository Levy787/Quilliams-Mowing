import type posthogType from "posthog-js/dist/module.slim";

const CONSENT_COOKIE = "cookie_consent_analytics";
const DEBUG = process.env.NODE_ENV !== "production";
const API_HOST = "/ph";
type PostHogClient = typeof posthogType;

let initializationPromise: Promise<PostHogClient | null> | null = null;

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

export function initializePostHog(): Promise<PostHogClient | null> {
    if (initializationPromise) return initializationPromise;

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
    if (!key) {
        if (DEBUG && typeof window !== "undefined") {
            console.info("[posthog] disabled (missing NEXT_PUBLIC_POSTHOG_KEY)");
        }
        initializationPromise = Promise.resolve(null);
        return initializationPromise;
    }

    initializationPromise = import("posthog-js/dist/module.slim")
        .then(({ default: posthog }) => {
            if (DEBUG) {
                console.info("[posthog] initializing after idle/interaction", {
                    api_host: API_HOST,
                    ui_host: process.env.NEXT_PUBLIC_UI_HOST,
                });
            }

            // Next canonicalises trailing-slash paths before applying rewrites.
            // Match that canonical route so each event reaches ingestion directly.
            posthog.analyticsDefaultEndpoint = "/e";

            posthog.init(key, {
                // Per PostHog Next.js reverse-proxy docs: use a relative path.
                api_host: API_HOST,
                ui_host: process.env.NEXT_PUBLIC_UI_HOST,
                defaults: "2026-01-30",

                // Pageviews are captured manually for App Router navigation.
                capture_pageview: false,
                capture_pageleave: true,

                // This site uses explicit events only. The slim entry point plus
                // these settings prevent optional recorders and remote modules
                // from entering the critical path.
                autocapture: false,
                capture_dead_clicks: false,
                capture_exceptions: false,
                capture_heatmaps: false,
                capture_performance: false,
                disable_session_recording: true,
                disable_surveys: true,
                disable_surveys_automatic_display: true,
                enable_recording_console_log: false,
                disable_external_dependency_loading: true,
                advanced_disable_flags: true,

                on_request_error: (error) => {
                    if (!DEBUG) return;

                    console.warn("[posthog] request error", {
                        statusCode: error.statusCode,
                        text: error.text,
                    });
                },

                loaded: (client) => {
                    const consent = getCookieValue(CONSENT_COOKIE);

                    // Always capture explicit visits/events without cookies.
                    // Acceptance enables durable browser persistence.
                    const persistenceEnabled = consent === "accepted";

                    client.set_config({
                        disable_persistence: !persistenceEnabled,
                        persistence: persistenceEnabled
                            ? "localStorage+cookie"
                            : "memory",
                    });
                    client.opt_in_capturing();

                    if (DEBUG) {
                        console.info("[posthog] capture enabled", {
                            mode: persistenceEnabled
                                ? "persistent"
                                : "cookieless",
                        });
                    }
                },
            });

            return posthog;
        })
        .catch((error: unknown) => {
            initializationPromise = null;
            if (DEBUG) {
                console.warn("[posthog] initialization failed", error);
            }
            return null;
        });

    return initializationPromise;
}
