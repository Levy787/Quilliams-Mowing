
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import {
    ArrowRight,
    Facebook,
    Instagram,
    PhoneCall,
    X,
    Youtube,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const DEFAULT_BUSINESS_HOURS = [
    { dayLabel: "Mon – Fri", hours: "08:00 am : 05:00 pm" },
    { dayLabel: "Saturday", hours: "Closed" },
    { dayLabel: "Sunday", hours: "Closed" },
    { dayLabel: "Bank Holidays", hours: "Closed" },
] as const;

const DEFAULT_SOCIAL_LINKS = [
    {
        platform: "facebook" as const,
        href: "https://www.facebook.com/quilliamsmowing/",
    },
    {
        platform: "instagram" as const,
        href: "https://www.instagram.com/quilliamsmowing/",
    },
] as const;

const DEFAULT_FOOTER_LINKS = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Sitemap", href: "/sitemap" },
] as const;

function IconLink({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            aria-label={label}
            className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border",
                "border-border/30 text-background/80",
                "hover:bg-accent hover:text-accent-foreground transition-colors motion-reduce:transition-none",
                "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            )}
        >
            {children}
        </a>
    );
}

export function Footer() {
    return <FooterInner />;
}

type FooterLink = { label: string; href: string };
type SocialPlatform = "facebook" | "instagram" | "x" | "youtube";

export function FooterInner({
    logoSrc = "/logos/logo-icon-text.webp",
    logoAlt = "Quilliams Gardening & Landscaping",
    aboutText =
    "Quilliams Gardening & Landscaping hardworking team has been delivering outstanding, environmentally friendly landscapes for over 5 years.",
    connectHeading = "Connect With Us",
    businessHoursHeading = "Business Hours",
    businessHours = DEFAULT_BUSINESS_HOURS,
    phoneLabel = "Phone",
    phoneNumber = "07593121621",
    phoneDisplay = "07593 121 621",
    subscribeHeading = "Subscribe Us",
    subscribeText = "Subscribe & Receive Our Offers and Updates to Your Inbox Directly.",
    socialLinks = DEFAULT_SOCIAL_LINKS,
    copyrightText =
    "Copyright © 2025 Quilliams Gardening & Landscaping, All Rights Reserved.",
    creditText = "TradeSender",
    creditHref = "https://www.tradesender.co.uk/",
    footerLinks = DEFAULT_FOOTER_LINKS,
}: {
    logoSrc?: string;
    logoAlt?: string;
    aboutText?: string;
    connectHeading?: string;
    businessHoursHeading?: string;
    businessHours?: ReadonlyArray<{ dayLabel: string; hours: string }>;
    phoneLabel?: string;
    phoneNumber?: string;
    phoneDisplay?: string;
    subscribeHeading?: string;
    subscribeText?: string;
    socialLinks?: ReadonlyArray<{ platform: SocialPlatform; href: string }>;
    copyrightText?: string;
    creditText?: string;
    creditHref?: string;
    footerLinks?: ReadonlyArray<FooterLink>;
} = {}) {
    const [subscribeEmail, setSubscribeEmail] = React.useState("");
    const [isSubscribing, setIsSubscribing] = React.useState(false);

    async function onSubscribe(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = subscribeEmail.trim();

        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        setIsSubscribing(true);

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, company: "" }),
            });

            const json = (await res.json().catch(() => null)) as
                | { ok: true }
                | { ok: false; error: string }
                | null;

            if (!res.ok || !json || ("ok" in json && json.ok === false)) {
                const message = json && "error" in json ? json.error : "Unable to subscribe. Please try again.";
                toast.error(message);
                setIsSubscribing(false);
                return;
            }

            toast.success("Thanks — you’re subscribed.");
            setSubscribeEmail("");
            setIsSubscribing(false);
        } catch {
            setIsSubscribing(false);
            toast.error("Unable to subscribe. Please try again.");
        }
    }

    return (
        <footer className="container mx-auto">
            <div className="rounded-t-4xl bg-gray-900 text-background overflow-hidden">
                {/* Main panel */}
                <div className="px-6 py-12 md:px-10 md:py-14">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                        {/* About Company */}
                        <div className="min-w-0">
                            <Link href="/">
                                <Image
                                    src={logoSrc}
                                    alt={logoAlt}
                                    width={176}
                                    height={40}
                                />
                            </Link>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-background/75">
                                {aboutText}
                            </p>

                            <h4 className="mt-10 text-xl font-semibold">
                                {connectHeading}
                            </h4>
                            <div className="mt-5 flex flex-wrap gap-4">
                                {socialLinks.map((item) => {
                                    const label =
                                        item.platform === "facebook"
                                            ? "Facebook"
                                            : item.platform === "instagram"
                                                ? "Instagram"
                                                : item.platform === "x"
                                                    ? "X"
                                                    : "YouTube";

                                    const Icon =
                                        item.platform === "facebook"
                                            ? Facebook
                                            : item.platform === "instagram"
                                                ? Instagram
                                                : item.platform === "x"
                                                    ? X
                                                    : Youtube;

                                    return (
                                        <IconLink key={`${item.platform}-${item.href}`} href={item.href} label={label}>
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </IconLink>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="min-w-0">
                            <h3 className="text-2xl font-semibold tracking-tight">
                                {businessHoursHeading}
                            </h3>

                            <div className="mt-6 space-y-3">
                                <div>
                                    {businessHours.map((row) => (
                                        <div key={`${row.dayLabel}-${row.hours}`}>
                                            <div className="text-sm font-semibold text-primary">{row.dayLabel}</div>
                                            <div className="mt-1 text-base text-background/75">{row.hours}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 border-t border-border/30" />

                            <div className="mt-8 flex items-center gap-4">
                                <div className="shrink-0">
                                    <PhoneCall className="h-10 w-10 text-primary" aria-hidden="true" />
                                </div>
                                <div>
                                    <div className="text-sm text-background/75">{phoneLabel || "Phone"}</div>
                                    <Link
                                        href={`tel:${phoneNumber || "07593121621"}`}
                                        className={"mt-1 text-3xl font-semibold tracking-tight hover:underline"}
                                    >
                                        {phoneDisplay || phoneNumber || "07593 121 621"}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Subscribe */}
                        <div className="min-w-0">
                            <h3 className="text-2xl font-semibold tracking-tight">
                                {subscribeHeading}
                            </h3>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-background/75">
                                {subscribeText}
                            </p>

                            <form
                                className="mt-8"
                                onSubmit={onSubscribe}
                            >
                                {/* Honeypot field for basic spam protection */}
                                <input
                                    type="text"
                                    name="company"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    className="hidden"
                                />

                                <label className="sr-only" htmlFor="footer-email">
                                    Email address
                                </label>

                                <div className="relative">
                                    <Input
                                        id="footer-email"
                                        type="email"
                                        inputMode="email"
                                        autoComplete="email"
                                        placeholder="Email Address... *"
                                        value={subscribeEmail}
                                        onChange={(e) => setSubscribeEmail(e.currentTarget.value)}
                                        disabled={isSubscribing}
                                        className={cn(
                                            "h-12 w-full rounded-full border bg-background px-5 pr-14",
                                            "border-border text-foreground placeholder:text-muted-foreground",
                                            "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                                        )}
                                    />

                                    <button
                                        type="submit"
                                        aria-label="Subscribe"
                                        disabled={isSubscribing}
                                        className={cn(
                                            "absolute right-2 top-1/2 -translate-y-1/2",
                                            "inline-flex h-9 w-9 items-center justify-center rounded-full",
                                            "text-primary hover:bg-accent hover:text-accent-foreground transition-colors motion-reduce:transition-none",
                                            "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                                        )}
                                    >
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="bg-gray-800 border-t border-border/30 px-6 py-6 md:px-10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="text-sm text-background/75">
                            {copyrightText}
                        </div>
                        <div className="text-sm text-background/75">
                            Designed and Developed by{" "}
                            <Link
                                href={creditHref}
                                target="_blank"
                                rel="noopener"
                                className="hover:underline"
                            >
                                {creditText}
                            </Link>
                        </div>

                        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-8 gap-y-2">
                            {footerLinks.map((item) => (
                                <Link
                                    key={`${item.label}-${item.href}`}
                                    href={item.href}
                                    className={cn(
                                        "text-sm text-background/75 hover:text-background transition-colors motion-reduce:transition-none",
                                        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-sm"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

        </footer>
    );
}