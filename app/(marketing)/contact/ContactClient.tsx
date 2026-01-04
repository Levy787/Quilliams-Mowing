"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LeafletMap } from "@/components/reusable/leaflet-map";
import { Turnstile, type TurnstileHandle } from "@/components/TurnstileWidget";

export type ContactClientProps = {
    header: {
        badge: string;
        heading: string;
        description: string;
    };
    details: {
        title: string;
        description: string;
        phoneLabel: string;
        phoneDisplay: string;
        phoneTel: string;
        emailLabel: string;
        emailAddress: string;
        hoursLabel: string;
        hoursText: string;
        serviceAreaLabel: string;
        serviceAreaText: string;
        googleMapsProfileLabel: string;
        googleMapsProfileUrl: string | null;
    };
    form: {
        title: string;
        description: string;
        fullNameLabel: string;
        emailLabel: string;
        phoneLabel: string;
        serviceLabel: string;
        servicePlaceholder: string;
        services: readonly string[];
        messageLabel: string;
        messagePlaceholder: string;
        submittedText: string;
        toastSuccess: string;
        submitIdleLabel: string;
        submitLoadingLabel: string;
    };
    map: {
        centerLat: number;
        centerLng: number;
        zoom: number;
        circleLat: number;
        circleLng: number;
        circleRadiusMeters: number;
    };
};

export default function ContactClient({ header, details, form, map }: ContactClientProps) {
    const [service, setService] = React.useState<string | undefined>(undefined);
    const [submitted, setSubmitted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [turnstileToken, setTurnstileToken] = React.useState("");
    const turnstileRef = React.useRef<TurnstileHandle>(null);

    const isTurnstileEnabled = Boolean(
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_CONTACT?.trim(),
    );

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isTurnstileEnabled && !turnstileToken.trim()) {
            toast.error("Please complete the verification.");
            return;
        }

        setIsSubmitting(true);
        setSubmitted(false);

        try {
            const formEl = event.currentTarget;
            const fd = new FormData(formEl);

            const payload = {
                name: String(fd.get("name") ?? "").trim(),
                email: String(fd.get("email") ?? "").trim(),
                phone: String(fd.get("phone") ?? "").trim() || null,
                service: service ?? null,
                message: String(fd.get("message") ?? "").trim(),
                company: String(fd.get("company") ?? "").trim(),
                turnstileToken: isTurnstileEnabled ? turnstileToken : "",
            };

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = (await res.json().catch(() => null)) as
                | { ok: true }
                | { ok: false; error: string }
                | null;

            if (!res.ok || !json || ("ok" in json && json.ok === false)) {
                const message = json && "error" in json ? json.error : "Unable to submit. Please try again.";
                toast.error(message);
                setIsSubmitting(false);
                setTurnstileToken("");
                turnstileRef.current?.reset();
                return;
            }

            setIsSubmitting(false);
            setSubmitted(true);
            toast.success(form.toastSuccess);
            formEl.reset();
            setService(undefined);
            setTurnstileToken("");
            turnstileRef.current?.reset();
        } catch {
            setIsSubmitting(false);
            setTurnstileToken("");
            turnstileRef.current?.reset();
            toast.error("Unable to submit. Please try again.");
        }
    }

    return (
        <main>
            <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-12">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            {header.badge}
                        </div>

                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            {header.heading}
                        </h1>

                        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
                            {header.description}
                        </p>
                    </div>

                    {/* Main grid */}
                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {/* Contact details */}
                        <Card className="relative overflow-hidden rounded-4xl border-border bg-foreground text-background shadow-none dark:bg-background dark:text-foreground">
                            <div className="absolute inset-0 bg-[url('/patterns/pattern-1.png')] bg-repeat opacity-10 dark:opacity-5" />
                            <CardContent className="relative px-6">
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-xl font-semibold text-background dark:text-foreground">
                                            {details.title}
                                        </div>
                                        <p className="mt-2 text-sm md:text-base leading-relaxed text-background/80 dark:text-muted-foreground">
                                            {details.description}
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="flex items-start gap-3">
                                            <Phone className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-background dark:text-foreground">
                                                    {details.phoneLabel}
                                                </div>
                                                <Link
                                                    href={`tel:${details.phoneTel}`}
                                                    className="mt-1 block text-sm text-background/80 hover:text-background dark:text-muted-foreground dark:hover:text-foreground"
                                                >
                                                    {details.phoneDisplay}
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Mail className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-background dark:text-foreground">
                                                    {details.emailLabel}
                                                </div>
                                                <Link
                                                    href={`mailto:${details.emailAddress}`}
                                                    className="mt-1 block text-sm text-background/80 hover:text-background dark:text-muted-foreground dark:hover:text-foreground"
                                                >
                                                    {details.emailAddress}
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Clock className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-background dark:text-foreground">
                                                    {details.hoursLabel}
                                                </div>
                                                <div className="mt-1 text-sm text-background/80 whitespace-pre-line dark:text-muted-foreground">
                                                    {details.hoursText}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <MapPin className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-background dark:text-foreground">
                                                    {details.serviceAreaLabel}
                                                </div>
                                                <div className="mt-1 text-sm text-background/80 dark:text-muted-foreground">
                                                    {details.serviceAreaText}
                                                </div>
                                            </div>
                                        </div>

                                        {details.googleMapsProfileUrl?.trim() ? (
                                            <div className="flex items-start gap-3">
                                                <MapPin className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                                <div className="min-w-0">
                                                    <div className="text-sm font-medium text-background dark:text-foreground">
                                                        {details.googleMapsProfileLabel}
                                                    </div>
                                                    <Link
                                                        href={details.googleMapsProfileUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="mt-1 block text-sm text-primary hover:underline dark:hover:text-foreground"
                                                    >
                                                        View on Google Maps
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Form */}
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div>
                                    <div className="text-xl font-semibold text-foreground">
                                        {form.title}
                                    </div>
                                    <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                        {form.description}
                                    </p>
                                </div>

                                <form className="mt-6 space-y-5" onSubmit={onSubmit}>
                                    {/* Honeypot field for basic spam protection */}
                                    <input
                                        type="text"
                                        name="company"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        className="hidden"
                                    />

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">{form.fullNameLabel}</Label>
                                            <Input id="name" name="name" autoComplete="name" required />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">{form.emailLabel}</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">{form.phoneLabel}</Label>
                                            <Input id="phone" name="phone" type="tel" autoComplete="tel" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>{form.serviceLabel}</Label>
                                            <Select value={service} onValueChange={setService}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={form.servicePlaceholder} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {form.services.map((item) => (
                                                        <SelectItem key={item} value={item}>
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">{form.messageLabel}</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            required
                                            placeholder={form.messagePlaceholder}
                                        />
                                    </div>

                                    {submitted && (
                                        <p className="text-sm text-primary">{form.submittedText}</p>
                                    )}

                                    {isTurnstileEnabled ? (
                                        <Turnstile
                                            ref={turnstileRef}
                                            onToken={setTurnstileToken}
                                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_CONTACT}
                                        />
                                    ) : null}

                                    <div className="pt-1">
                                        <Button type="submit" size="lg" disabled={isSubmitting}>
                                            {isSubmitting
                                                ? form.submitLoadingLabel
                                                : form.submitIdleLabel}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Map */}
                    <div className="mt-10">
                        <Card className="rounded-4xl border-border shadow-none overflow-hidden">
                            <CardContent className="px-0">
                                <div className="relative aspect-video">
                                    <LeafletMap
                                        center={[map.centerLat, map.centerLng]}
                                        zoom={map.zoom}
                                        elements={[
                                            {
                                                type: "circle",
                                                center: [map.circleLat, map.circleLng],
                                                radius: map.circleRadiusMeters,
                                                pathOptions: {
                                                    color: "#00a63e",
                                                    fillColor: "#00a63e",
                                                    fillOpacity: 0.2,
                                                },
                                            },
                                        ]}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
