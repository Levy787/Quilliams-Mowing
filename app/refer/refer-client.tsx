"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type { ReferralContent } from "@/lib/referral";
import { capturePostHogEvent } from "@/lib/posthog-client";

function isValidEmail(email: string): boolean {
    const trimmed = email.trim();
    if (!trimmed) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function generateVoucherCode(discountPercent: number): string {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    const bytes = new Uint8Array(8);

    try {
        crypto.getRandomValues(bytes);
    } catch {
        for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    }

    let body = "";
    for (let i = 0; i < bytes.length; i++) {
        body += chars[bytes[i] % chars.length];
    }

    return `REF-${discountPercent}-${body}`;
}

type ReferClientProps = {
    services: ReferralContent["services"];
    discountPercent: number;
    formCopy: ReferralContent["formCopy"];
};

export default function ReferClient({
    services,
    discountPercent,
    formCopy,
}: ReferClientProps) {
    const searchParams = useSearchParams();

    const initialFromSearch = React.useMemo(() => {
        return {
            referrerEmail: searchParams.get("referrerEmail") ?? "",
            friendName: searchParams.get("friendName") ?? "",
            friendEmail: searchParams.get("friendEmail") ?? "",
            service: searchParams.get("service") ?? "",
        };
    }, [searchParams]);

    const [step, setStep] = React.useState<1 | 2>(() =>
        isValidEmail(initialFromSearch.referrerEmail) ? 2 : 1,
    );

    const [referrerEmail, setReferrerEmail] = React.useState(initialFromSearch.referrerEmail);
    const [friendName, setFriendName] = React.useState(initialFromSearch.friendName);
    const [friendEmail, setFriendEmail] = React.useState(initialFromSearch.friendEmail);
    const [service, setService] = React.useState<string>(initialFromSearch.service);

    const [touched, setTouched] = React.useState({
        referrerEmail: false,
        friendName: false,
        friendEmail: false,
        service: false,
    });

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [voucherCode, setVoucherCode] = React.useState<string | null>(null);
    const [copied, setCopied] = React.useState(false);

    const serviceOptions = services;

    // If a link includes a service that doesn't exist anymore, don't keep it selected.
    React.useEffect(() => {
        if (!service) return;
        const exists = serviceOptions.some((s) => s.value === service);
        if (!exists) setService("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceOptions]);

    const errors = React.useMemo(() => {
        const referrerEmailOk = isValidEmail(referrerEmail);
        const friendEmailOk = isValidEmail(friendEmail);
        const friendNameOk = friendName.trim().length > 0;
        const serviceOk = service.trim().length > 0;

        return {
            referrerEmail: referrerEmailOk ? null : "Please enter a valid email.",
            friendName: friendNameOk ? null : "Please enter your friend’s name.",
            friendEmail: friendEmailOk ? null : "Please enter a valid email.",
            service: serviceOk ? null : "Please select a service.",
            step1Ok: referrerEmailOk,
            step2Ok: friendNameOk && friendEmailOk && serviceOk,
        };
    }, [friendEmail, friendName, referrerEmail, service]);

    function markAllTouched() {
        setTouched({ referrerEmail: true, friendName: true, friendEmail: true, service: true });
    }

    async function onCopyCode() {
        if (!voucherCode) return;
        setCopied(false);

        try {
            await navigator.clipboard.writeText(voucherCode);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch {
            // Clipboard can be blocked in some contexts; silently ignore.
        }
    }

    function onContinue() {
        setTouched((t) => ({ ...t, referrerEmail: true }));
        if (!errors.step1Ok) return;
        setStep(2);
    }

    function onEditDetails() {
        setVoucherCode(null);
        setCopied(false);
        setIsSubmitting(false);
        setStep(2);
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        markAllTouched();
        if (!errors.step1Ok) {
            setStep(1);
            return;
        }
        if (!errors.step2Ok) {
            setStep(2);
            return;
        }

        setIsSubmitting(true);
        const code = generateVoucherCode(discountPercent);

        window.setTimeout(() => {
            setVoucherCode(code);
            setIsSubmitting(false);
            void capturePostHogEvent("conversion_referral_submit", {
                service,
                voucher_code: code,
            });
        }, 650);
    }

    const selectedServiceLabel =
        serviceOptions.find((s) => s.value === service)?.label ?? null;

    return !voucherCode ? (
        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="rounded-3xl border border-border p-4">
                <div className="text-sm font-semibold text-foreground">Step 1</div>
                <div className="mt-3 space-y-2">
                    <Label htmlFor="referrerEmail">Your email</Label>
                    <Input
                        id="referrerEmail"
                        name="referrerEmail"
                        type="email"
                        autoComplete="email"
                        value={referrerEmail}
                        onChange={(e) => setReferrerEmail(e.target.value)}
                        onBlur={() =>
                            setTouched((current) => ({
                                ...current,
                                referrerEmail: true,
                            }))
                        }
                        required
                    />
                    {touched.referrerEmail && errors.referrerEmail ? (
                        <p className="text-sm text-destructive">
                            {errors.referrerEmail}
                        </p>
                    ) : null}
                </div>

                <div className="mt-4">
                    <Button
                        type="button"
                        onClick={onContinue}
                        disabled={!errors.step1Ok}
                    >
                        Continue
                    </Button>
                </div>
            </div>

            <div className="rounded-3xl border border-border p-4">
                <div className="text-sm font-semibold text-foreground">Step 2</div>
                {step !== 2 ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your email above to continue.
                    </p>
                ) : (
                    <div className="mt-3 space-y-5">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="friendName">Friend’s name</Label>
                                <Input
                                    id="friendName"
                                    name="friendName"
                                    value={friendName}
                                    onChange={(e) => setFriendName(e.target.value)}
                                    onBlur={() =>
                                        setTouched((current) => ({
                                            ...current,
                                            friendName: true,
                                        }))
                                    }
                                    required
                                />
                                {touched.friendName && errors.friendName ? (
                                    <p className="text-sm text-destructive">
                                        {errors.friendName}
                                    </p>
                                ) : null}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="friendEmail">Friend’s email</Label>
                                <Input
                                    id="friendEmail"
                                    name="friendEmail"
                                    type="email"
                                    autoComplete="email"
                                    value={friendEmail}
                                    onChange={(e) => setFriendEmail(e.target.value)}
                                    onBlur={() =>
                                        setTouched((current) => ({
                                            ...current,
                                            friendEmail: true,
                                        }))
                                    }
                                    required
                                />
                                {touched.friendEmail && errors.friendEmail ? (
                                    <p className="text-sm text-destructive">
                                        {errors.friendEmail}
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Service needed</Label>
                            <Select
                                value={service || undefined}
                                onValueChange={(value) => {
                                    setService(value);
                                    setTouched((current) => ({
                                        ...current,
                                        service: true,
                                    }));
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose a service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {serviceOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {touched.service && errors.service ? (
                                <p className="text-sm text-destructive">
                                    {errors.service}
                                </p>
                            ) : null}
                        </div>

                        <div className="pt-1">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting || !errors.step2Ok}
                            >
                                {isSubmitting
                                    ? formCopy.submitLoadingLabel
                                    : formCopy.submitIdleLabel}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </form>
    ) : (
        <div className="space-y-5">
            <div>
                <div className="text-xl font-semibold text-foreground">
                    {formCopy.successTitle}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {formCopy.successMessage}
                </p>
            </div>

            <div className="rounded-3xl border border-border bg-muted/25 p-4">
                <div className="text-xs font-semibold text-foreground">
                    {formCopy.voucherCodeLabel}
                </div>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="font-mono text-lg font-semibold text-foreground">
                        {voucherCode}
                    </div>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCopyCode}
                    >
                        {copied
                            ? formCopy.copiedCodeLabel
                            : formCopy.copyCodeLabel}
                    </Button>
                </div>
                {selectedServiceLabel ? (
                    <p className="mt-3 text-xs text-muted-foreground">
                        Service selected: {selectedServiceLabel}
                    </p>
                ) : null}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onEditDetails}
                >
                    Edit details
                </Button>
            </div>
        </div>
    );
}
