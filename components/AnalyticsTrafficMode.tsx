import {
    INTERNAL_TRAFFIC_COOKIE,
    INTERNAL_TRAFFIC_DISABLE_VALUE,
    INTERNAL_TRAFFIC_ENABLE_VALUE,
    INTERNAL_TRAFFIC_QUERY_PARAM,
} from "@/lib/analytics-traffic";

const INTERNAL_TRAFFIC_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function AnalyticsTrafficMode() {
    return (
        <script
            id="analytics-traffic-mode"
            dangerouslySetInnerHTML={{
                __html: `
(function () {
  try {
    var queryParam = ${JSON.stringify(INTERNAL_TRAFFIC_QUERY_PARAM)};
    var cookieName = ${JSON.stringify(INTERNAL_TRAFFIC_COOKIE)};
    var params = new URLSearchParams(window.location.search);
    var requestedMode = params.get(queryParam);
    var secure = window.location.protocol === 'https:' ? '; Secure' : '';

    if (requestedMode === ${JSON.stringify(INTERNAL_TRAFFIC_ENABLE_VALUE)}) {
      document.cookie = cookieName + '=1; Path=/; Max-Age=${INTERNAL_TRAFFIC_MAX_AGE_SECONDS}; SameSite=Lax' + secure;
    } else if (requestedMode === ${JSON.stringify(INTERNAL_TRAFFIC_DISABLE_VALUE)}) {
      document.cookie = cookieName + '=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax' + secure;
    }

    window.__QM_INTERNAL_TRAFFIC__ = document.cookie.split(';').some(function (cookie) {
      return cookie.trim() === cookieName + '=1';
    });

    if (requestedMode === ${JSON.stringify(INTERNAL_TRAFFIC_ENABLE_VALUE)} || requestedMode === ${JSON.stringify(INTERNAL_TRAFFIC_DISABLE_VALUE)}) {
      params.delete(queryParam);
      var query = params.toString();
      window.history.replaceState(
        window.history.state,
        '',
        window.location.pathname + (query ? '?' + query : '') + window.location.hash
      );
    }
  } catch (_) {
    window.__QM_INTERNAL_TRAFFIC__ = false;
  }
})();
`,
            }}
        />
    );
}
