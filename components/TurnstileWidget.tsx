"use client";

import * as React from "react";
import Script from "next/script";

export type TurnstileHandle = {
    reset: () => void;
};

type TurnstileOptions = {
    sitekey: string;
    theme?: "auto" | "light" | "dark";
    callback?: (token: string) => void;
    "expired-callback"?: () => void;
    "error-callback"?: () => void;
};

declare global {
    interface Window {
        turnstile?: {
            render: (container: HTMLElement, options: TurnstileOptions) => string;
            reset: (widgetId?: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

export function TurnstileWidget(
    {
        onToken,
        className,
        siteKey: siteKeyProp,
        theme = "auto",
    }: {
        onToken: (token: string) => void;
        className?: string;
        siteKey?: string;
        theme?: "auto" | "light" | "dark";
    },
    ref: React.ForwardedRef<TurnstileHandle>,
) {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const widgetIdRef = React.useRef<string | null>(null);

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

        let cancelled = false;

        const render = () => {
            if (cancelled) return;
            if (!containerRef.current) return;
            if (!window.turnstile) {
                window.setTimeout(render, 50);
                return;
            }

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
                callback: (token) => onToken(token),
                "expired-callback": () => onToken(""),
                "error-callback": () => onToken(""),
            });
        };

        render();

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
    }, [onToken, siteKey, theme]);

    if (!siteKey?.trim()) return null;

    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                strategy="afterInteractive"
            />
            <div ref={containerRef} className={className} />
        </>
    );
}

export const Turnstile = React.forwardRef(TurnstileWidget);
