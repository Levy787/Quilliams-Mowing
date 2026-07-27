"use client";

import Script from "next/script";

const CONSENT_COOKIE = "cookie_consent_analytics";

function getMeasurementId(): string | undefined {
    const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
    return value && /^G-[A-Z0-9]+$/.test(value) ? value : undefined;
}

export function GoogleAnalytics() {
    const measurementId = getMeasurementId();

    if (!measurementId) return null;

    return (
        <>
            <Script
                id="google-analytics-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
var analyticsConsent = document.cookie.split(';').some(function(cookie) {
  return cookie.trim() === '${CONSENT_COOKIE}=accepted';
}) ? 'granted' : 'denied';
gtag('consent', 'default', {
  analytics_storage: analyticsConsent,
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());
gtag('config', '${measurementId}');
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
