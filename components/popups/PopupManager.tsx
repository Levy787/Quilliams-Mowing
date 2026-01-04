"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopupBase } from "@/components/popups/PopupBase";
import { Turnstile, type TurnstileHandle } from "@/components/TurnstileWidget";
import type { PopupEntry } from "@/lib/keystatic-reader";
import { capturePostHogEvent } from "@/lib/posthog-client";

function isExactMatch(pathname: string, pattern: string) {
    return pathname === pattern;
}

function isWildcardMatch(pathname: string, pattern: string) {
    if (!pattern.endsWith("/*")) return false;
    const prefix = pattern.slice(0, -2);
    return pathname.startsWith(`${prefix}/`);
}

function matchScore(pathname: string, pattern: string) {
    if (isExactMatch(pathname, pattern)) return 2;
    if (isWildcardMatch(pathname, pattern)) return 1;
    return 0;
}

function pickPopup(popups: ReadonlyArray<PopupEntry>, pathname: string): PopupEntry | null {
    const sorted = [...popups].sort((a, b) => a.slug.localeCompare(b.slug));

    let best: { popup: PopupEntry; score: number } | null = null;

    for (const popup of sorted) {
        const score = Math.max(...popup.targeting.paths.map((p) => matchScore(pathname, p)), 0);
        if (score <= 0) continue;

        if (!best || score > best.score) {
            best = { popup, score };
        }
    }

    return best?.popup ?? null;
}

function hasActiveDismissal(popup: PopupEntry) {
    const key = `popup:dismissed:${popup.slug}`;
    const raw = window.localStorage.getItem(key);
    if (!raw) return false;

    const ts = Date.parse(raw);
    if (!Number.isFinite(ts)) return false;

    const ms = popup.frequency.dismissForDays * 24 * 60 * 60 * 1000;
    return Date.now() - ts < ms;
}

function setDismissedNow(popup: PopupEntry) {
    const key = `popup:dismissed:${popup.slug}`;
    window.localStorage.setItem(key, new Date().toISOString());
}

function scrollPercent(): number {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const scrollHeight = doc.scrollHeight || 0;
    const clientHeight = window.innerHeight || doc.clientHeight || 0;

    const max = Math.max(1, scrollHeight - clientHeight);
    return (scrollTop / max) * 100;
}

export function PopupManager({ popups }: { popups: ReadonlyArray<PopupEntry> }) {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const [activeSlug, setActiveSlug] = React.useState<string | null>(null);
    const [email, setEmail] = React.useState("");
    const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">(
        "idle",
    );
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = React.useState("");
    const turnstileRef = React.useRef<TurnstileHandle>(null);

    const isTurnstileEnabled = Boolean(
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_POPUP?.trim(),
    );

    const popup = React.useMemo(() => {
        if (!pathname) return null;
        return pickPopup(popups, pathname);
    }, [popups, pathname]);

    React.useEffect(() => {
        setOpen(false);
        setActiveSlug(popup?.slug ?? null);
        setEmail("");
        setStatus("idle");
        setErrorMessage(null);
        setTurnstileToken("");
        turnstileRef.current?.reset();
    }, [popup?.slug]);

    React.useEffect(() => {
        if (!popup) return;
        if (!popup.targeting.paths.length) return;

        // Don’t show if dismissed
        if (hasActiveDismissal(popup)) return;

        let cleanup: (() => void) | undefined;
        let fired = false;

        const openOnce = () => {
            if (fired) return;
            fired = true;
            setOpen(true);
        };

        if (popup.trigger.type === "delay") {
            const id = window.setTimeout(openOnce, Math.max(0, popup.trigger.value));
            cleanup = () => window.clearTimeout(id);
        }

        if (popup.trigger.type === "scroll") {
            const threshold = Math.max(0, Math.min(100, popup.trigger.value));

            const onScroll = () => {
                if (scrollPercent() >= threshold) {
                    openOnce();
                    window.removeEventListener("scroll", onScroll);
                }
            };

            window.addEventListener("scroll", onScroll, { passive: true });
            // Run once in case user is already scrolled
            onScroll();

            cleanup = () => window.removeEventListener("scroll", onScroll);
        }

        if (popup.trigger.type === "exitIntent") {
            const onMouseOut = (e: MouseEvent) => {
                // Desktop only
                if (window.innerWidth < 768) return;

                const related = (e as unknown as { relatedTarget?: EventTarget | null }).relatedTarget;
                if (related) return;

                if (e.clientY <= 0) {
                    openOnce();
                    document.removeEventListener("mouseout", onMouseOut);
                }
            };

            document.addEventListener("mouseout", onMouseOut);
            cleanup = () => document.removeEventListener("mouseout", onMouseOut);
        }

        return () => cleanup?.();
    }, [popup]);

    function onOpenChange(nextOpen: boolean) {
        if (!popup) return;

        // If closing, set dismissal
        if (open && !nextOpen) {
            setDismissedNow(popup);
        }

        setOpen(nextOpen);
    }

    if (!popup) return null;

    // If route changed while open, ignore
    if (activeSlug && popup.slug !== activeSlug) return null;

    async function onSubmitEmailCapture(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!popup) return;

        const trimmed = email.trim();
        if (!trimmed) {
            setErrorMessage("Please enter your email address.");
            setStatus("error");
            return;
        }

        if (isTurnstileEnabled && !turnstileToken.trim()) {
            setErrorMessage("Please complete the verification.");
            setStatus("error");
            return;
        }

        setStatus("submitting");
        setErrorMessage(null);

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: trimmed,
                    company: "",
                    offerCode: popup.emailCapture?.offerCode ?? null,
                    offerHeadline: popup.headline ?? null,
                    turnstileToken: isTurnstileEnabled ? turnstileToken : "",
                    turnstileContext: "popup",
                }),
            });

            const json = (await res.json().catch(() => null)) as
                | { ok: true }
                | { ok: false; error: string }
                | null;

            if (!res.ok || !json || ("ok" in json && json.ok === false)) {
                const message = json && "error" in json
                    ? json.error
                    : "Unable to claim this offer. Please try again.";
                setErrorMessage(message);
                setStatus("error");
                setTurnstileToken("");
                turnstileRef.current?.reset();
                return;
            }

            setDismissedNow(popup);
            setStatus("success");

            void capturePostHogEvent("conversion_popup_email_capture", {
                source: "popup",
                popupSlug: popup.slug,
                popupTitle: popup.title ?? null,
                offerCode: popup.emailCapture?.offerCode?.trim() || null,
                turnstileEnabled: isTurnstileEnabled,
            });

            setTurnstileToken("");
            turnstileRef.current?.reset();
        } catch {
            setErrorMessage("Unable to claim this offer. Please try again.");
            setStatus("error");
            setTurnstileToken("");
            turnstileRef.current?.reset();
        }
    }

    return (
        <PopupBase open={open} onOpenChange={onOpenChange} title={popup.headline || "Popup"}>
            <div className="grid gap-4 p-6">
                {popup.image?.src ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-3xl z-0">
                        <Image
                            src={popup.image.src}
                            alt={popup.image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 90vw, 560px"
                        />
                    </div>
                ) : null}

                <div className="text-xl font-semibold tracking-tight text-foreground">
                    {popup.headline}
                </div>

                {popup.body?.trim() ? (
                    <div className="space-y-3 text-base leading-relaxed text-foreground/80">
                        {popup.body
                            .split(/\n\n+/)
                            .map((p) => p.trim())
                            .filter(Boolean)
                            .map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                    </div>
                ) : null}

                {popup.popupType === "emailCapture" ? (
                    status === "success" ? (
                        <div className="grid gap-3 rounded-3xl border border-border bg-muted p-4">
                            <div className="text-base font-semibold text-foreground">
                                {popup.emailCapture?.successTitle ?? "Offer claimed"}
                            </div>
                            <div className="text-base text-foreground/80">
                                {popup.emailCapture?.successBody ??
                                    "Thanks — please check your inbox."}
                            </div>

                            {popup.emailCapture?.offerCode?.trim() ? (
                                <div className="rounded-2xl border border-border bg-background px-4 py-3">
                                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Offer code
                                    </div>
                                    <div className="mt-1 font-semibold tracking-tight text-foreground">
                                        {popup.emailCapture.offerCode}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <form onSubmit={onSubmitEmailCapture} className="grid gap-3 pt-1">
                            <div className="grid gap-2">
                                <Input
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={
                                        popup.emailCapture?.emailPlaceholder ??
                                        "Enter your email"
                                    }
                                />
                                {status === "error" && errorMessage ? (
                                    <div className="text-sm text-destructive">{errorMessage}</div>
                                ) : null}
                            </div>

                            {isTurnstileEnabled ? (
                                <Turnstile
                                    ref={turnstileRef}
                                    onToken={setTurnstileToken}
                                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_POPUP}
                                    className="pt-2"
                                />
                            ) : null}

                            <Button type="submit" size="lg" disabled={status === "submitting"}>
                                {status === "submitting"
                                    ? "Submitting…"
                                    : popup.emailCapture?.submitLabel ?? "Claim offer"}
                            </Button>
                        </form>
                    )
                ) : popup.cta ? (
                    <div className="pt-1">
                        <Button asChild size="lg">
                            <Link
                                href={popup.cta.href}
                                onClick={() => {
                                    setDismissedNow(popup);
                                    setOpen(false);
                                }}
                            >
                                {popup.cta.label}
                            </Link>
                        </Button>
                    </div>
                ) : null}
            </div>
        </PopupBase>
    );
}
