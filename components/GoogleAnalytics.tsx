"use client";

import * as React from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const CONSENT_COOKIE = "cookie_consent_analytics";

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

function getMeasurementId(): string | undefined {
    const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
    return value && /^G-[A-Z0-9]+$/.test(value) ? value : undefined;
}

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

function getAnalyticsStorageConsent(): "granted" | "denied" {
    return getCookieValue(CONSENT_COOKIE) === "accepted" ? "granted" : "denied";
}

export function GoogleAnalytics() {
    const pathname = usePathname();
    const [ready, setReady] = React.useState(false);
    const measurementId = getMeasurementId();

    React.useEffect(() => {
        if (!measurementId || ready) return;

        const interval = window.setInterval(() => {
            if (typeof window.gtag === "function") {
                setReady(true);
                window.clearInterval(interval);
            }
        }, 50);

        return () => window.clearInterval(interval);
    }, [measurementId, ready]);

    React.useEffect(() => {
        if (!measurementId || !ready || typeof window.gtag !== "function") return;

        window.gtag("consent", "update", {
            analytics_storage: getAnalyticsStorageConsent(),
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
        });

        window.gtag("event", "page_view", {
            page_path: `${window.location.pathname}${window.location.search}`,
            page_location: window.location.href,
            page_title: document.title,
        });
    }, [measurementId, pathname, ready]);

    if (!measurementId) return null;

    return (
        <>
            <Script
                id="google-analytics-init"
                strategy="afterInteractive"
                onReady={() => setReady(true)}
                dangerouslySetInnerHTML={{
                    __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());
gtag('config', '${measurementId}', { send_page_view: false });
`,
                }}
            />
            <Script
                id="google-analytics-tag"
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
        </>
    );
}
