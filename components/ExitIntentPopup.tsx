"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { capturePostHogEvent } from "@/lib/posthog-client";

const STORAGE_KEY = "exit_intent_dismissed";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function ExitIntentPopup() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if already dismissed recently
        const dismissed = localStorage.getItem(STORAGE_KEY);
        if (dismissed) {
            const dismissedAt = parseInt(dismissed, 10);
            if (Date.now() - dismissedAt < DISMISS_DURATION_MS) {
                return; // Still within dismiss period
            }
        }

        // Track if mouse has entered the page (to avoid triggering on page load)
        let hasEntered = false;

        const handleMouseEnter = () => {
            hasEntered = true;
        };

        const handleMouseLeave = (e: MouseEvent) => {
            // Only trigger if mouse leaves from top of viewport (exit intent)
            if (hasEntered && e.clientY <= 0) {
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

    const handleDismiss = (action: "cta" | "dismissed" | "close") => {
        setShow(false);
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
        if (action === "cta") {
            void capturePostHogEvent("click_exit_intent_cta");
        } else {
            void capturePostHogEvent("ui_exit_intent_dismissed");
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
            <div className="bg-background rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={() => handleDismiss("close")}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center">
                    <span className="text-4xl">🌿</span>
                    <h3 className="mt-4 text-2xl font-bold">Before you go...</h3>
                    <p className="mt-3 text-muted-foreground">
                        Get a free, no-obligation quote in under 2 minutes. 
                        Just tell us what you need — no spam, no pressure.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Button asChild className="flex-1" size="lg">
                            <Link href="/quote" onClick={() => handleDismiss("cta")}>
                                Get My Free Quote
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleDismiss("dismissed")}
                            className="flex-1"
                            size="lg"
                        >
                            Maybe Later
                        </Button>
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                        ⭐ 5.0 on Google • Local to Newquay • Same-week availability
                    </p>
                </div>
            </div>
        </div>
    );
}
