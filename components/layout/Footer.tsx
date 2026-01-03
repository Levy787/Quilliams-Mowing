
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
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
    return (
        <footer className="container mx-auto">
            <div className="rounded-t-4xl bg-gray-900 text-background overflow-hidden">
                {/* Main panel */}
                <div className="px-6 py-12 md:px-10 md:py-14">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                        {/* About Company */}
                        <div className="min-w-0">
                            <Link href="/">
                                <Image src="/logos/logo-icon-text.webp" alt="Quilliams Gardening & Landscaping" width={176} height={40} />
                            </Link>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-background/75">
                                Quilliams Gardening & Landscaping hardworking team has been delivering outstanding,
                                environmentally friendly landscapes for over 5 years.
                            </p>

                            <h4 className="mt-10 text-xl font-semibold">Connect With Us</h4>
                            <div className="mt-5 flex flex-wrap gap-4">
                                <IconLink href="https://www.facebook.com/quilliamsmowing/" label="Facebook">
                                    <Facebook className="h-5 w-5" aria-hidden="true" />
                                </IconLink>
                                <IconLink href="https://www.instagram.com/quilliamsmowing/" label="Instagram">
                                    <Instagram className="h-5 w-5" aria-hidden="true" />
                                </IconLink>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="min-w-0">
                            <h3 className="text-2xl font-semibold tracking-tight">Business Hours</h3>

                            <div className="mt-6 space-y-3">
                                <div>
                                    <div className="text-sm font-semibold text-primary">Mon – Fri</div>
                                    <div className="mt-1 text-base text-background/75">
                                        08:00 am : 05:00 pm
                                    </div>
                                    <div className="text-sm font-semibold text-primary">Saturday</div>
                                    <div className="mt-1 text-base text-background/75">
                                        Closed
                                    </div>
                                    <div className="text-sm font-semibold text-primary">Sunday</div>
                                    <div className="mt-1 text-base text-background/75">
                                        Closed
                                    </div>
                                    <div className="text-sm font-semibold text-primary">Bank Holidays</div>
                                    <div className="mt-1 text-base text-background/75">
                                        Closed
                                    </div>

                                </div>
                            </div>

                            <div className="mt-8 border-t border-border/30" />

                            <div className="mt-8 flex items-center gap-4">
                                <div className="shrink-0">
                                    <PhoneCall className="h-10 w-10 text-primary" aria-hidden="true" />
                                </div>
                                <div>
                                    <div className="text-sm text-background/75">Phone</div>
                                    <Link href="tel:07593121621" className={"mt-1 text-3xl font-semibold tracking-tight hover:underline"}>
                                        07593 121 621
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Subscribe */}
                        <div className="min-w-0">
                            <h3 className="text-2xl font-semibold tracking-tight">Subscribe Us</h3>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-background/75">
                                Subscribe &amp; Receive Our Offers and Updates to Your Inbox Directly.
                            </p>

                            <form
                                className="mt-8"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                }}
                            >
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
                                        className={cn(
                                            "h-12 w-full rounded-full border bg-background px-5 pr-14",
                                            "border-border text-foreground placeholder:text-muted-foreground",
                                            "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                                        )}
                                    />

                                    <button
                                        type="submit"
                                        aria-label="Subscribe"
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
                            Copyright © 2025 Quilliams Gardening & Landscaping, All Rights Reserved.
                        </div>
                        <div className="text-sm text-background/75">
                            Designed and Developed by{" "}
                            <Link
                                href="https://www.tradesender.co.uk/"
                                target="_blank"
                                rel="noopener"
                                className="hover:underline"
                            >
                                TradeSender
                            </Link>
                        </div>

                        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-8 gap-y-2">
                            <Link
                                href="/terms"
                                className={cn(
                                    "text-sm text-background/75 hover:text-background transition-colors motion-reduce:transition-none",
                                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-sm"
                                )}
                            >
                                Terms &amp; Conditions
                            </Link>
                            <Link
                                href="/privacy"
                                className={cn(
                                    "text-sm text-background/75 hover:text-background transition-colors motion-reduce:transition-none",
                                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-sm"
                                )}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/sitemap"
                                className={cn(
                                    "text-sm text-background/75 hover:text-background transition-colors motion-reduce:transition-none",
                                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-sm"
                                )}
                            >
                                Sitemap
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

        </footer>
    );
}