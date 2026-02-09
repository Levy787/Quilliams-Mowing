"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { capturePostHogEvent } from "@/lib/posthog-client";

const WHATSAPP_NUMBER = "447593121621"; // UK format without +
const DEFAULT_MESSAGE = "Hi! I found you on your website and I'm interested in getting a quote for garden services.";

export function WhatsAppButton() {
    const [visible, setVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show after a short delay
        const timer = setTimeout(() => {
            setVisible(true);
        }, 2000);

        // Show tooltip after 5 seconds if not interacted
        const tooltipTimer = setTimeout(() => {
            setShowTooltip(true);
        }, 5000);

        // Hide tooltip after 10 seconds
        const hideTooltipTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 15000);

        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
            clearTimeout(hideTooltipTimer);
        };
    }, []);

    if (!visible) return null;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    return (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex items-end gap-3">
            {/* Tooltip */}
            {showTooltip && (
                <div className="bg-background border shadow-lg rounded-lg p-3 max-w-[200px] animate-in slide-in-from-right-5 duration-300">
                    <button 
                        onClick={() => setShowTooltip(false)}
                        className="absolute -top-2 -right-2 bg-background border rounded-full p-1 shadow-sm"
                        aria-label="Close"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    <p className="text-sm">
                        👋 Questions? Message us on WhatsApp!
                    </p>
                </div>
            )}

            {/* WhatsApp Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5C] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                aria-label="Chat on WhatsApp"
                onClick={() => {
                    void capturePostHogEvent("click_whatsapp", { tooltip_was_visible: showTooltip });
                    setShowTooltip(false);
                }}
            >
                <MessageCircle className="w-7 h-7" fill="currentColor" />
            </a>
        </div>
    );
}
