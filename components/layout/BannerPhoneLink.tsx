"use client";

import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { capturePostHogEvent } from "@/lib/posthog-client";

export function BannerPhoneLink() {
    return (
        <Button asChild className="flex items-center gap-2" variant="link">
            <a
                href="tel:07593121621"
                onClick={() => void capturePostHogEvent("click_phone", { location: "banner" })}
            >
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span>Call: 07593 121 621</span>
            </a>
        </Button>
    );
}
