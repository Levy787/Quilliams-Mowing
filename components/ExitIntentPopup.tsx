"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Phone, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Turnstile } from "@/components/TurnstileWidget";
import { capturePostHogEvent } from "@/lib/posthog-client";

const STORAGE_KEY = "exit_intent_dismissed";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const OFFER_CODE = "WELCOME20";
const OFFER_HEADLINE = "£20 off your first booking";

type ContactMethod = "phone" | "email";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_POPUP?.trim();
const IS_TURNSTILE_CONFIGURED = Boolean(TURNSTILE_SITE_KEY);

export function ExitIntentPopup() {
    const [show, setShow] = useState(false);
    const [method, setMethod] = useState<ContactMethod>("phone");
    const [value, setValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState(IS_TURNSTILE_CONFIGURED ? "" : "dev");
    const inputRef = useRef<HTMLInputElement>(null);
    const turnstileRef = useRef<{ reset: () => void }>(null);

    const resetTurnstile = useCallback(() => {
        if (IS_TURNSTILE_CONFIGURED) {
            setTurnstileToken("");
            turnstileRef.current?.reset();
        }
    }, []);

    useEffect(() => {
        const dismissed = localStorage.getItem(STORAGE_KEY);
        if (dismissed) {
            const dismissedAt = parseInt(dismissed, 10);
            if (Date.now() - dismissedAt < DISMISS_DURATION_MS) {
                return;
            }
        }

        let hasEntered = false;
        let hasShown = false;

        const handleMouseEnter = () => {
            hasEntered = true;
        };

        const handleMouseLeave = (e: MouseEvent) => {
            if (hasEntered && !hasShown && e.clientY <= 0) {
                hasShown = true;
                setShow(true);
                void capturePostHogEvent("ui_exit_intent_shown");
            }
        };

        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Focus input when popup opens or method changes
    useEffect(() => {
        if (show && !submitted) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [show, method, submitted]);

    function dismiss(reason: "close" | "later") {
        setShow(false);
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
        void capturePostHogEvent("ui_exit_intent_dismissed", { reason });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const trimmed = value.trim();
        if (!trimmed) {
            setError(method === "phone" ? "Please enter your phone number." : "Please enter your email.");
            return;
        }

        if (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setError("That doesn't look like a valid email.");
            return;
        }

        if (IS_TURNSTILE_CONFIGURED && !turnstileToken) {
            setError("Please complete the verification.");
            return;
        }

        setIsSubmitting(true);

        try {
            const payload: Record<string, unknown> = {
                turnstileContext: "exit-intent",
                offerCode: OFFER_CODE,
                offerHeadline: OFFER_HEADLINE,
                source: "exit-intent",
            };

            // Only send token if Turnstile is configured
            if (IS_TURNSTILE_CONFIGURED && turnstileToken) {
                payload.turnstileToken = turnstileToken;
            }

            if (method === "email") {
                payload.email = trimmed;
            } else {
                payload.phone = trimmed;
            }

            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = (await res.json().catch(() => null)) as
                | { ok: true }
                | { ok: false; error: string }
                | null;

            if (!res.ok || !json || ("ok" in json && json.ok === false)) {
                const message = json && "error" in json ? json.error : "Something went wrong. Please try again.";
                setError(message);
                setIsSubmitting(false);
                resetTurnstile();
                return;
            }

            setIsSubmitting(false);
            setSubmitted(true);
            localStorage.setItem(STORAGE_KEY, Date.now().toString());

            void capturePostHogEvent("conversion_exit_intent_lead", {
                contactMethod: method,
                offerCode: OFFER_CODE,
            });
        } catch {
            setIsSubmitting(false);
            setError("Something went wrong. Please try again.");
            resetTurnstile();
        }
    }

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
            <div className="bg-background rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={() => dismiss("close")}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {submitted ? (
                    <div className="text-center py-4">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="mt-4 text-xl font-bold">You&apos;re all set!</h3>
                        {method === "email" ? (
                            <p className="mt-2 text-muted-foreground">
                                We&apos;ve sent your discount code to your inbox. Use code{" "}
                                <span className="font-semibold text-foreground">{OFFER_CODE}</span>{" "}
                                when you book.
                            </p>
                        ) : (
                            <div className="mt-3">
                                <p className="text-muted-foreground">
                                    Here&apos;s your discount code:
                                </p>
                                <div className="mt-2 inline-block rounded-lg bg-primary/10 px-4 py-2">
                                    <span className="text-lg font-bold tracking-wider text-primary">{OFFER_CODE}</span>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Mention this when we get in touch. We&apos;ll reach out shortly.
                                </p>
                            </div>
                        )}
                        <Button
                            className="mt-5"
                            variant="outline"
                            onClick={() => setShow(false)}
                        >
                            Continue browsing
                        </Button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wide">
                            Limited offer
                        </div>
                        <h3 className="mt-3 text-2xl font-bold">
                            Get £20 off your first booking
                        </h3>
                        <p className="mt-2 text-muted-foreground text-sm">
                            Drop your number or email, we&apos;ll send your code.
                            No spam, just savings.
                        </p>

                        {/* Method toggle */}
                        <div className="mt-5 inline-flex rounded-lg bg-muted p-1 gap-1">
                            <button
                                type="button"
                                onClick={() => { setMethod("phone"); setValue(""); setError(""); resetTurnstile(); }}
                                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                    method === "phone"
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                <Phone className="w-3.5 h-3.5" />
                                Phone
                            </button>
                            <button
                                type="button"
                                onClick={() => { setMethod("email"); setValue(""); setError(""); resetTurnstile(); }}
                                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                    method === "email"
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                <Mail className="w-3.5 h-3.5" />
                                Email
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="flex gap-2">
                                <Input
                                    ref={inputRef}
                                    type={method === "email" ? "email" : "tel"}
                                    autoComplete={method === "email" ? "email" : "tel"}
                                    placeholder={method === "phone" ? "07XXX XXXXXX" : "you@example.com"}
                                    value={value}
                                    onChange={(e) => { setValue(e.target.value); setError(""); }}
                                    className="flex-1"
                                />
                                <Button type="submit" disabled={isSubmitting || (IS_TURNSTILE_CONFIGURED && !turnstileToken)}>
                                    {isSubmitting ? "..." : "Claim"}
                                </Button>
                            </div>
                            {error && (
                                <p className="mt-2 text-sm text-destructive">{error}</p>
                            )}
                            {IS_TURNSTILE_CONFIGURED && (
                                <div className="mt-3 flex justify-center">
                                    <Turnstile
                                        ref={turnstileRef}
                                        siteKey={TURNSTILE_SITE_KEY}
                                        onToken={setTurnstileToken}
                                        size="compact"
                                        appearance="interaction-only"
                                    />
                                </div>
                            )}
                        </form>

                        <button
                            onClick={() => dismiss("later")}
                            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            No thanks, I&apos;ll pay full price
                        </button>

                        <p className="mt-3 text-xs text-muted-foreground">
                            5.0 on Google · Local to Newquay · Same-week availability
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
