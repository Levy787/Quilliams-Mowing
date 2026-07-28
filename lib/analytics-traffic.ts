export const INTERNAL_TRAFFIC_COOKIE = "qm_internal_traffic";
export const INTERNAL_TRAFFIC_QUERY_PARAM = "analytics_traffic";
export const INTERNAL_TRAFFIC_ENABLE_VALUE = "internal";
export const INTERNAL_TRAFFIC_DISABLE_VALUE = "external";

declare global {
    interface Window {
        __QM_INTERNAL_TRAFFIC__?: boolean;
    }
}

function hasInternalTrafficCookie(): boolean {
    if (typeof document === "undefined") return false;

    return document.cookie.split(";").some((cookie) => {
        const [name, value] = cookie.trim().split("=", 2);
        return name === INTERNAL_TRAFFIC_COOKIE && value === "1";
    });
}

export function isInternalAnalyticsTraffic(): boolean {
    if (typeof window === "undefined") return false;

    return (
        window.__QM_INTERNAL_TRAFFIC__ === true ||
        hasInternalTrafficCookie()
    );
}
