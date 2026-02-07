"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, FileText } from "lucide-react";

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

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t shadow-lg safe-area-inset-bottom">
            <div className="flex">
                <a
                    href="tel:07593121621"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-muted hover:bg-muted/80 transition-colors"
                >
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">Call Now</span>
                </a>
                <Link
                    href="/quote"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">Free Quote</span>
                </Link>
            </div>
        </div>
    );
}
