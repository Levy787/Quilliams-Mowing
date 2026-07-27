
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import {
    Facebook,
    Instagram,
    Mail,
    PhoneCall,
    X,
    Youtube,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { capturePostHogEvent } from "@/lib/posthog-client";
import { coreAreaLinks } from "@/lib/areas/data";
import { Turnstile, type TurnstileHandle } from "@/components/TurnstileWidget";
import { openCookieSettings } from "@/components/CookieBanner";

const DEFAULT_BUSINESS_HOURS = [
    { dayLabel: "Mon – Sun", hours: "09:00 am : 05:00 pm" },
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
    { label: "Sitemap", href: "/site-map" },
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
                "border-border/30 text-background",
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
    "Quilliams Gardening & Landscaping is a Newquay-based gardening and landscaping service run by Levi Quilliam. Public liability insured. Waste carrier licence CBDL582202. Companies House 16405915.",
    connectHeading = "Connect With Us",
    businessHoursHeading = "Business Hours",
    businessHours = DEFAULT_BUSINESS_HOURS,
    phoneLabel = "Phone",
    phoneNumber = "07593121621",
    phoneDisplay = "07593 121 621",
    emailLabel = "Email",
    emailAddress = "levi@quilliamsmowing.co.uk",
    subscribeHeading = "Subscribe Us",
    subscribeText = "Subscribe & Receive Our Offers and Updates to Your Inbox Directly.",
    socialLinks = DEFAULT_SOCIAL_LINKS,
    copyrightText =
    "Copyright © 2025 Quilliams Gardening & Landscaping, All Rights Reserved.",
    creditText = "Quilliam.ai",
    creditHref = "https://quilliam.ai/",
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
    emailLabel?: string;
    emailAddress?: string;
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
    const [hasSubscribed, setHasSubscribed] = React.useState(false);
    const [turnstileToken, setTurnstileToken] = React.useState("");
    const turnstileRef = React.useRef<TurnstileHandle>(null);

    const isTurnstileEnabled = Boolean(
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_SUBSCRIBE?.trim(),
    );

    async function onSubscribe(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = subscribeEmail.trim();

        const fd = new FormData(event.currentTarget);
        const company = String(fd.get("company") ?? "").trim();

        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        if (isTurnstileEnabled && !turnstileToken.trim()) {
            toast.error("Please complete the verification.");
            return;
        }

        setIsSubscribing(true);
        setHasSubscribed(false);

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    company,
                    turnstileToken: isTurnstileEnabled ? turnstileToken : "",
                    turnstileContext: "subscribe",
                }),
            });

            const json = (await res.json().catch(() => null)) as
                | { ok: true }
                | { ok: false; error: string }
                | null;

            if (!res.ok || !json || ("ok" in json && json.ok === false)) {
                const message = json && "error" in json ? json.error : "Unable to subscribe. Please try again.";
                toast.error(message);
                setIsSubscribing(false);
                setHasSubscribed(false);
                setTurnstileToken("");
                turnstileRef.current?.reset();
                return;
            }

            toast.success("Thanks, you are subscribed.");

            capturePostHogEvent("conversion_subscribe", {
                source: "footer",
                turnstileEnabled: isTurnstileEnabled,
            });

            setHasSubscribed(true);
            setSubscribeEmail("");
            setIsSubscribing(false);
            setTurnstileToken("");
            turnstileRef.current?.reset();
        } catch {
            setIsSubscribing(false);
            setHasSubscribed(false);
            setTurnstileToken("");
            turnstileRef.current?.reset();
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
                            <Link href="/" aria-label="Quilliams Gardening & Landscaping - Home">
                                <Image
                                    src={logoSrc}
                                    alt={logoAlt}
                                    width={256}
                                    height={43}
                                    className="h-auto w-[176px] object-contain"
                                />
                            </Link>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-background/90">
                                {aboutText}
                            </p>

                            <h3 className="mt-10 text-xl font-semibold">
                                {connectHeading}
                            </h3>
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
                                            <div className="mt-1 text-base text-background/90">{row.hours}</div>
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
                                    <div className="text-sm text-background/90">{phoneLabel || "Phone"}</div>
                                    <Link
                                        href={`tel:${phoneNumber || "07593121621"}`}
                                        className={"mt-1 text-xl font-semibold tracking-tight hover:underline"}
                                    >
                                        {phoneDisplay || phoneNumber || "07593 121 621"}
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <div className="shrink-0">
                                    <Mail className="h-10 w-10 text-primary" aria-hidden="true" />
                                </div>
                                <div>
                                    <div className="text-sm text-background/90">{emailLabel || "Email"}</div>
                                    <Link
                                        href={`mailto:${emailAddress}`}
                                        className={"mt-1 text-xl font-semibold tracking-tight hover:underline"}
                                    >
                                        {emailAddress}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Subscribe */}
                        <div className="min-w-0">
                            <h3 className="text-2xl font-semibold tracking-tight">
                                {subscribeHeading}
                            </h3>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-background/90">
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

                                <div className="flex gap-2">
                                    <Input
                                        id="footer-email"
                                        type="email"
                                        inputMode="email"
                                        autoComplete="email"
                                        placeholder="Email Address... *"
                                        value={subscribeEmail}
                                        onChange={(e) => {
                                            setSubscribeEmail(e.currentTarget.value);
                                            setHasSubscribed(false);
                                        }}
                                        disabled={isSubscribing || hasSubscribed}
                                        className="flex-1"
                                    />

                                    <Button
                                        type="submit"
                                        aria-label="Subscribe"
                                        disabled={isSubscribing || hasSubscribed}
                                        className="w-1/4"
                                    >
                                        {isSubscribing
                                            ? "Subscribing..."
                                            : hasSubscribed
                                                ? "Subscribed"
                                                : "Subscribe"}
                                    </Button>
                                </div>

                                <div aria-live="polite" className="mt-3 text-sm">
                                    {hasSubscribed ? (
                                        <p className="text-primary">You are subscribed, check your inbox.</p>
                                    ) : null}
                                </div>

                                {isTurnstileEnabled ? (
                                    <Turnstile
                                        ref={turnstileRef}
                                        onToken={setTurnstileToken}
                                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_SUBSCRIBE}
                                        className="mt-4"
                                    />
                                ) : null}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Site navigation links */}
                <nav aria-label="Site navigation" className="border-t border-border/30 px-6 py-8 md:px-10">
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                        <div>
                            <h4 className="text-sm font-semibold text-background">Services</h4>
                            <ul className="mt-3 space-y-2">
                                {[
                                    { label: "Lawn Mowing", href: "/services/lawn-care" },
                                    { label: "Hedge Trimming", href: "/services/hedge-trimming" },
                                    { label: "Landscaping", href: "/services/landscaping" },
                                    { label: "Garden Maintenance", href: "/services/garden-maintenance" },
                                    { label: "All Services", href: "/services" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-background/60 transition-colors hover:text-background">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-background">Areas</h4>
                            <ul className="mt-3 space-y-2">
                                {[
                                    ...coreAreaLinks,
                                    { label: "All Areas", href: "/areas" },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-background/60 transition-colors hover:text-background">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-background">Company</h4>
                            <ul className="mt-3 space-y-2">
                                {[
                                    { label: "About Us", href: "/about" },
                                    { label: "Our Projects", href: "/projects" },
                                    { label: "Blog", href: "/blog" },
                                    { label: "Pricing", href: "/pricing" },
                                    { label: "Refer a Friend", href: "/refer" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-background/60 transition-colors hover:text-background">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-background">Get in Touch</h4>
                            <ul className="mt-3 space-y-2">
                                {[
                                    { label: "Contact Us", href: "/contact" },
                                    { label: "Get a Quote", href: "/quote" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-background/60 transition-colors hover:text-background">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-5">
                                <h5 className="text-xs font-semibold uppercase tracking-wide text-background/60">Profiles</h5>
                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                                    {[
                                        { label: "Checkatrade", href: "https://www.checkatrade.com/trades/quilliamsmowingltd" },
                                        { label: "Yell", href: "https://www.yell.com/biz/quilliams-mowing-ltd-newquay-10969895/" },
                                        { label: "Bark", href: "https://www.bark.com/en/gb/b/quilliams-gardening-amp-landscaping/KNoMX4/" },
                                    ].map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-background/60 transition-colors hover:text-background"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Bottom bar */}
                <div className="bg-gray-800 border-t border-border/30 px-6 py-6 md:px-10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="text-sm text-background/90">
                            {copyrightText}
                        </div>
                        <div className="text-sm text-background/90">
                            Powered by{" "}
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
                                        "text-sm text-background/90 hover:text-background transition-colors motion-reduce:transition-none",
                                        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-sm"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <button
                                type="button"
                                onClick={openCookieSettings}
                                className={cn(
                                    "text-sm text-background/90 hover:text-background transition-colors motion-reduce:transition-none",
                                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-sm"
                                )}
                            >
                                Cookie settings
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

        </footer>
    );
}
