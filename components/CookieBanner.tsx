"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CONSENT_COOKIE = "cookie_consent_analytics";
const OPEN_EVENT = "cookie-settings-open";

type ConsentValue = "accepted" | "rejected";

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

function setCookieValue(name: string, value: string, maxAgeSeconds: number) {
    if (typeof document === "undefined") return;
    const isHttps = typeof location !== "undefined" && location.protocol === "https:";
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${isHttps ? "; Secure" : ""}`;
}

function readConsent(): ConsentValue | null {
    const v = getCookieValue(CONSENT_COOKIE);
    return v === "accepted" || v === "rejected" ? v : null;
}

function isGpcEnabled(): boolean {
    if (typeof navigator === "undefined") return false;
    return (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function CookieBanner() {
    const [mounted, setMounted] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [consent, setConsent] = React.useState<ConsentValue | null>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        const next = readConsent();
        setConsent(next);

        // Always show the banner when there's no stored choice.
        // (Even if Global Privacy Control is enabled, we still show it for transparency.)
        setOpen(!next);
    }, []);

    React.useEffect(() => {
        const onOpen = () => setOpen(true);
        window.addEventListener(OPEN_EVENT, onOpen);
        return () => window.removeEventListener(OPEN_EVENT, onOpen);
    }, []);

    function applyConsent(value: ConsentValue) {
        // Respect Global Privacy Control as a hard opt-out.
        if (isGpcEnabled()) {
            setCookieValue(CONSENT_COOKIE, "rejected", 60 * 60 * 24 * 365);
            setConsent("rejected");
            setOpen(false);
            posthog.opt_out_capturing();
            posthog.reset();
            return;
        }

        setCookieValue(CONSENT_COOKIE, value, 60 * 60 * 24 * 365);
        setConsent(value);
        setOpen(false);

        if (value === "accepted") {
            posthog.set_config({
                disable_persistence: false,
                persistence: "localStorage+cookie",
            });
            posthog.opt_in_capturing();
            posthog.capture("cookie_consent_accepted");
            posthog.capture("$pageview");
        } else {
            // Reject analytics cookies, but keep anonymous (cookieless) analytics.
            posthog.set_config({
                disable_persistence: true,
                persistence: "memory",
            });
            posthog.reset(true);
            posthog.opt_in_capturing();
            posthog.capture("cookie_consent_rejected");
            posthog.capture("$pageview");
        }
    }

    if (!mounted || !open) return null;

    return createPortal(
        <div
            className={cn(
                "fixed inset-x-0 bottom-0 z-[120]",
                "border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
            )}
            role="dialog"
            aria-label="Cookie preferences"
        >
            <div className="container mx-auto flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-foreground">
                    We use analytics to understand how the site is used and improve it. If you reject, we’ll still collect anonymous usage data without cookies.
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => applyConsent("rejected")}
                    >
                        Reject
                    </Button>
                    <Button
                        type="button"
                        onClick={() => applyConsent("accepted")}
                    >
                        Accept analytics cookies
                    </Button>
                </div>
            </div>
        </div>
        ,
        document.body,
    );
}

export function openCookieSettings() {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new Event(OPEN_EVENT));
}
