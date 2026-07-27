"use client";

import * as React from "react";

const TURNSTILE_SCRIPT_ID = "cf-turnstile";
const TURNSTILE_SCRIPT_SRC =
    "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let turnstileScriptPromise: Promise<void> | null = null;

export type TurnstileHandle = {
    reset: () => void;
};

type TurnstileOptions = {
    sitekey: string;
    theme?: "auto" | "light" | "dark";
    size?: "normal" | "compact" | "flexible";
    appearance?: "always" | "execute" | "interaction-only";
    execution?: "render" | "execute";
    callback?: (token: string) => void;
    "expired-callback"?: () => void;
    "error-callback"?: () => void;
};

declare global {
    interface Window {
        turnstile?: {
            render: (container: HTMLElement | string, options: TurnstileOptions) => string;
            reset: (widgetId?: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

function loadTurnstileScript(): Promise<void> {
    if (typeof window === "undefined") return Promise.resolve();
    if (window.turnstile) return Promise.resolve();
    if (turnstileScriptPromise) return turnstileScriptPromise;

    turnstileScriptPromise = new Promise<void>((resolve, reject) => {
        const existingScript =
            document.getElementById(TURNSTILE_SCRIPT_ID) ??
            document.querySelector(`script[src^="${TURNSTILE_SCRIPT_SRC}"]`);

        const onLoad = () => resolve();
        const onError = () => {
            turnstileScriptPromise = null;
            reject(new Error("Unable to load Cloudflare Turnstile."));
        };

        if (existingScript instanceof HTMLScriptElement) {
            existingScript.addEventListener("load", onLoad, { once: true });
            existingScript.addEventListener("error", onError, { once: true });
            return;
        }

        const script = document.createElement("script");
        script.id = TURNSTILE_SCRIPT_ID;
        script.src = TURNSTILE_SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", onLoad, { once: true });
        script.addEventListener("error", onError, { once: true });
        document.head.appendChild(script);
    });

    return turnstileScriptPromise;
}

export function TurnstileWidget(
    {
        onToken,
        className,
        siteKey: siteKeyProp,
        theme = "auto",
        size = "normal",
        appearance,
        execution,
    }: {
        onToken: (token: string) => void;
        className?: string;
        siteKey?: string;
        theme?: "auto" | "light" | "dark";
        size?: "normal" | "compact" | "flexible";
        appearance?: "always" | "execute" | "interaction-only";
        execution?: "render" | "execute";
    },
    ref: React.ForwardedRef<TurnstileHandle>,
) {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const widgetIdRef = React.useRef<string | null>(null);
    const [shouldLoad, setShouldLoad] = React.useState(false);

    const siteKey = siteKeyProp ?? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    React.useImperativeHandle(
        ref,
        () => ({
            reset: () => {
                if (!widgetIdRef.current) return;
                window.turnstile?.reset(widgetIdRef.current);
            },
        }),
        [],
    );

    React.useEffect(() => {
        if (!siteKey?.trim()) return;
        if (!containerRef.current) return;

        if (!("IntersectionObserver" in window)) {
            setShouldLoad(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                setShouldLoad(true);
                observer.disconnect();
            },
            {
                // Begin verification shortly before the protected form scrolls
                // into view, without putting Turnstile on the homepage path.
                rootMargin: "200px 0px",
                threshold: 0.01,
            },
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [siteKey]);

    React.useEffect(() => {
        if (!siteKey?.trim() || !shouldLoad) return;
        if (!containerRef.current) return;

        let cancelled = false;

        const render = () => {
            if (cancelled) return;
            if (!containerRef.current) return;
            if (!window.turnstile) return;

            // Ensure we don't double-render into the same container.
            if (widgetIdRef.current) {
                try {
                    window.turnstile.remove(widgetIdRef.current);
                } catch {
                    // ignore
                }
                widgetIdRef.current = null;
            }

            widgetIdRef.current = window.turnstile.render(containerRef.current, {
                sitekey: siteKey,
                theme,
                size,
                ...(appearance ? { appearance } : {}),
                ...(execution ? { execution } : {}),
                callback: (token) => onToken(token),
                "expired-callback": () => onToken(""),
                "error-callback": () => onToken(""),
            });
        };

        void loadTurnstileScript()
            .then(render)
            .catch(() => onToken(""));

        return () => {
            cancelled = true;
            if (!widgetIdRef.current) return;
            try {
                window.turnstile?.remove(widgetIdRef.current);
            } catch {
                // ignore
            }
            widgetIdRef.current = null;
        };
    }, [
        appearance,
        execution,
        onToken,
        shouldLoad,
        siteKey,
        size,
        theme,
    ]);

    if (!siteKey?.trim()) return null;

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ minHeight: size === "compact" ? 50 : 65 }}
        />
    );
}

export const Turnstile = React.forwardRef(TurnstileWidget);
