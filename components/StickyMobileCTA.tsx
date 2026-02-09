"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, FileText } from "lucide-react";
import { capturePostHogEvent } from "@/lib/posthog-client";

export function StickyMobileCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 400px
            setVisible(window.scrollY > 400);
        };
        
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Spacer so page content isn't hidden behind the fixed bar */}
            <div className="h-[60px] md:hidden" aria-hidden="true" />

            {visible && (
                <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t shadow-lg safe-area-inset-bottom">
                    <div className="flex">
                        <a
                            href="tel:07593121621"
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-muted hover:bg-muted/80 transition-colors"
                            onClick={() => {
                                void capturePostHogEvent("click_phone", { location: "sticky_cta" });
                                void capturePostHogEvent("click_sticky_cta", { action: "call" });
                            }}
                        >
                            <Phone className="w-5 h-5" />
                            <span className="font-medium">Call Now</span>
                        </a>
                        <Link
                            href="/quote"
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            onClick={() => void capturePostHogEvent("click_sticky_cta", { action: "quote" })}
                        >
                            <FileText className="w-5 h-5" />
                            <span className="font-medium">Free Quote</span>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
