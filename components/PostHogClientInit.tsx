"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { initializePostHog } from "@/app/instrumentation-client";
import { capturePostHogEvent } from "@/lib/posthog-client";

type IdleWindow = Window & {
    requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
};

export function PostHogClientInit() {
    const pathname = usePathname();

    React.useEffect(() => {
        function onDocumentClick(event: MouseEvent) {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const emailLink = target.closest<HTMLAnchorElement>(
                'a[href^="mailto:"]',
            );
            if (!emailLink) return;

            void capturePostHogEvent("click_email", {
                location: emailLink.closest("footer")
                    ? "footer"
                    : "page_content",
                path: window.location.pathname,
            });
        }

        document.addEventListener("click", onDocumentClick);
        return () => document.removeEventListener("click", onDocumentClick);
    }, []);

    React.useEffect(() => {
        let cancelled = false;
        const idleWindow = window as IdleWindow;

        async function initializeAndCapturePageView() {
            const posthog = await initializePostHog();
            if (cancelled || !posthog) return;

            posthog.capture("$pageview", {
                $current_url: window.location.href,
            });
        }

        const run = () => {
            void initializeAndCapturePageView();
        };

        const idleHandle = idleWindow.requestIdleCallback?.(run, {
            timeout: 2000,
        });
        const timeoutHandle =
            idleHandle === undefined ? window.setTimeout(run, 1500) : undefined;

        return () => {
            cancelled = true;
            if (idleHandle !== undefined) {
                idleWindow.cancelIdleCallback?.(idleHandle);
            }
            if (timeoutHandle !== undefined) {
                window.clearTimeout(timeoutHandle);
            }
        };
    }, [pathname]);

    return null;
}
