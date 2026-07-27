"use client";

import * as React from "react";
import { createPortal } from "react-dom";

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

export function CookieBanner() {
    const [mounted, setMounted] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        const next = readConsent();

        // Always show the banner when there's no stored choice.
        setOpen(!next);
    }, []);

    React.useEffect(() => {
        const onOpen = () => setOpen(true);
        window.addEventListener(OPEN_EVENT, onOpen);
        return () => window.removeEventListener(OPEN_EVENT, onOpen);
    }, []);

    function applyConsent(value: ConsentValue) {
        setCookieValue(CONSENT_COOKIE, value, 60 * 60 * 24 * 365);
        setOpen(false);

        // Apply tracking mode change immediately.
        // (Cookieless tracking runs regardless; "Yes" only enables persistence.)
        if (typeof window !== "undefined") window.location.reload();
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
            <div className="container mx-auto flex flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between md:gap-4 md:py-4">
                <div className="text-[13px] leading-5 text-foreground sm:text-sm">
                    Allow analytics cookies? Choose “Yes” or continue with “Only necessary”.
                    Page visits are still measured without cookies.
                </div>

                <div className="grid shrink-0 grid-cols-2 gap-2 md:flex md:items-center">
                    <Button
                        type="button"
                        variant="secondary"
                        className="px-3"
                        onClick={() => applyConsent("rejected")}
                    >
                        Only necessary
                    </Button>
                    <Button
                        type="button"
                        className="px-3"
                        onClick={() => applyConsent("accepted")}
                    >
                        Yes
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
