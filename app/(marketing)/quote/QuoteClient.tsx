"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

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
import { Turnstile, type TurnstileHandle } from "@/components/TurnstileWidget";
import { capturePostHogEvent } from "@/lib/posthog-client";

type PreviewItem = {
    id: string;
    file: File;
    url: string;
};

function formatBytes(bytes: number) {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(mb >= 10 ? 0 : 1)}MB`;
}

function formatCurrency(amount: number) {
    return `£${amount.toLocaleString()}`;
}

function labelFromParam(value: string | null) {
    if (!value) return null;
    return value
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseBooleanParam(value: string | null) {
    return value === "1" || value === "true";
}

function parseNumberParam(value: string | null) {
    if (!value) return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

export type QuoteClientProps = {
    header: {
        badge: string;
        heading: string;
        description: string;
    };
    expect: {
        title: string;
        description: string;
        steps: readonly string[];
        responseTimeLabel: string;
        responseTimeValue: string;
    };
    calculatorSummary: {
        title: string;
        addonsLabel: string;
        note: string;
    };
    form: {
        title: string;
        description: string;
        fullNameLabel: string;
        emailLabel: string;
        phoneLabel: string;
        addressLabel: string;
        serviceTypeLabel: string;
        serviceTypePlaceholder: string;
        serviceOptions: readonly string[];
        timeframeLabel: string;
        timeframePlaceholder: string;
        timeframeOptions: readonly string[];
        budgetLabel: string;
        budgetPlaceholder: string;
        budgetOptions: readonly string[];
        photosLabel: string;
        photosHelp: string;
        maxPhotosError: string;
        onlyImagesError: string;
        largePhotosWarningPrefix: string;
        largePhotosWarningSuffix: string;
        removeImageAriaLabelPrefix: string;
        selectedPhotoAltPrefix: string;
        jobDetailsLabel: string;
        jobDetailsPlaceholder: string;
        requiredServiceError: string;
        submittedText: string;
        toastSuccess: string;
        submitIdleLabel: string;
        submitLoadingLabel: string;
    };
};

function CalculatorSummaryFields({
    calculatorSummary,
}: {
    calculatorSummary: QuoteClientProps["calculatorSummary"];
}) {
    const searchParams = useSearchParams();

    const summary = React.useMemo(() => {
        const estimateLow = parseNumberParam(searchParams.get("estimateLow"));
        const estimateHigh = parseNumberParam(searchParams.get("estimateHigh"));

        if (!estimateLow || !estimateHigh) return null;

        const jobType = labelFromParam(searchParams.get("jobType"));
        const yardSize = labelFromParam(searchParams.get("yardSize"));
        const condition = labelFromParam(searchParams.get("condition"));
        const access = labelFromParam(searchParams.get("access"));

        const addOns: string[] = [];
        if (parseBooleanParam(searchParams.get("greenWaste"))) addOns.push("Green waste");
        if (parseBooleanParam(searchParams.get("pruning"))) addOns.push("Pruning");
        if (parseBooleanParam(searchParams.get("hedgeTrim"))) addOns.push("Hedge trim");

        const frequency = labelFromParam(searchParams.get("frequency"));

        const detailsParts = [
            jobType ? `Job: ${jobType}` : null,
            yardSize ? `Size: ${yardSize}` : null,
            condition ? `Condition: ${condition}` : null,
            access ? `Access: ${access}` : null,
            frequency ? `Frequency: ${frequency}` : null,
        ].filter((p): p is string => Boolean(p));

        const addonsText = addOns.length > 0 ? addOns.join(", ") : "None";

        return {
            headline: `${formatCurrency(estimateLow)}–${formatCurrency(estimateHigh)}`,
            details: detailsParts.length > 0 ? detailsParts.join(" • ") : null,
            addons: addonsText,
            hiddenValue: `Pricing calculator (rough guide): ${formatCurrency(estimateLow)}–${formatCurrency(estimateHigh)}. ${detailsParts.join(" | ")}. Add-ons: ${addonsText}.`,
        };
    }, [searchParams]);

    if (!summary) return null;

    return (
        <div className="rounded-xl bg-primary/10 p-4">
            <p className="text-sm font-medium text-foreground">{calculatorSummary.title}</p>
            <p className="mt-1 text-2xl font-bold text-primary">{summary.headline}</p>
            {summary.details && (
                <p className="mt-1 text-xs text-muted-foreground">{summary.details}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
                {calculatorSummary.addonsLabel}: {summary.addons}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{calculatorSummary.note}</p>
            <input type="hidden" name="calculatorSummary" value={summary.hiddenValue} />
        </div>
    );
}

const MAX_FILES = 5;
const MAX_SINGLE_FILE_MB = 10;
const WARN_TOTAL_MB = 20;

export function QuoteClient({
    header,
    expect,
    calculatorSummary,
    form,
}: QuoteClientProps) {
    const turnstileSiteKey =
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_QUOTE?.trim() ||
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
        "";

    const isTurnstileEnabled = Boolean(turnstileSiteKey);

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const turnstileRef = React.useRef<TurnstileHandle>(null);

    const [turnstileToken, setTurnstileToken] = React.useState("");
    const [files, setFiles] = React.useState<File[]>([]);
    const [previews, setPreviews] = React.useState<PreviewItem[]>([]);
    const [fileError, setFileError] = React.useState("");
    const [fileWarning, setFileWarning] = React.useState("");

    const [service, setService] = React.useState("");
    const [timeframe, setTimeframe] = React.useState("");
    const [budget, setBudget] = React.useState("");
    const [selectResetNonce, setSelectResetNonce] = React.useState(0);

    const [formError, setFormError] = React.useState("");
    const [contactError, setContactError] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    const [showOptional, setShowOptional] = React.useState(false);

    function validateAndAddFiles(incoming: FileList | null) {
        if (!incoming) return;
        setFileError("");
        setFileWarning("");

        const allowed = [...incoming].filter((f) => {
            if (!f.type.startsWith("image/")) {
                setFileError(form.onlyImagesError);
                return false;
            }
            if (f.size > MAX_SINGLE_FILE_MB * 1024 * 1024) {
                setFileError(`File "${f.name}" exceeds ${MAX_SINGLE_FILE_MB}MB.`);
                return false;
            }
            return true;
        });

        if (files.length + allowed.length > MAX_FILES) {
            setFileError(form.maxPhotosError);
            return;
        }

        const next = [...files, ...allowed];
        const totalMB = next.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);
        if (totalMB > WARN_TOTAL_MB) {
            setFileWarning(
                `${form.largePhotosWarningPrefix} ${formatBytes(totalMB * 1024 * 1024)}${form.largePhotosWarningSuffix}`,
            );
        }

        setFiles(next);

        const newPreviews = allowed.map((file) => ({
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            file,
            url: URL.createObjectURL(file),
        }));
        setPreviews((prev) => [...prev, ...newPreviews]);
    }

    function removeFileById(id: string) {
        const removed = previews.find((p) => p.id === id);
        if (removed) URL.revokeObjectURL(removed.url);

        const nextPreviews = previews.filter((p) => p.id !== id);
        setPreviews(nextPreviews);
        setFiles(nextPreviews.map((p) => p.file));

        const totalMB = nextPreviews.reduce((sum, p) => sum + p.file.size, 0) / (1024 * 1024);
        setFileWarning(
            totalMB > WARN_TOTAL_MB
                ? `${form.largePhotosWarningPrefix} ${formatBytes(totalMB * 1024 * 1024)}${form.largePhotosWarningSuffix}`
                : "",
        );
        setFileError("");
    }

    function resetForm(formEl: HTMLFormElement) {
        formEl.reset();
        setService("");
        setTimeframe("");
        setBudget("");
        setSelectResetNonce((n) => n + 1);
        setFiles([]);
        for (const p of previews) URL.revokeObjectURL(p.url);
        setPreviews([]);
        setFileError("");
        setFileWarning("");
        setFormError("");
        setContactError("");
        setTurnstileToken("");
        turnstileRef.current?.reset();
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormError("");
        setContactError("");
        setIsSubmitting(true);

        const formEl = e.currentTarget;
        const fd = new FormData(formEl);

        const honeypot = String(fd.get("company") ?? "").trim();
        if (honeypot) {
            setIsSubmitting(false);
            setSubmitted(true);
            return;
        }

        const phone = String(fd.get("phone") ?? "").trim();
        const email = String(fd.get("email") ?? "").trim();

        if (!phone && !email) {
            setContactError("Please provide a phone number or email so we can get back to you.");
            setIsSubmitting(false);
            return;
        }

        try {
            let attachments: Array<{ filename: string; content: string }> = [];

            if (files.length > 0) {
                attachments = await Promise.all(
                    files.map(async (file) => {
                        const arrayBuffer = await file.arrayBuffer();
                        const base64 = btoa(
                            new Uint8Array(arrayBuffer).reduce(
                                (data, byte) => data + String.fromCharCode(byte),
                                "",
                            ),
                        );
                        return { filename: file.name, content: base64 };
                    }),
                );
            }

            const payload = {
                name: String(fd.get("name") ?? "").trim(),
                email: email || undefined,
                phone: phone || undefined,
                address: String(fd.get("address") ?? "").trim(),
                serviceType: service || "Not specified",
                timeframe: timeframe || undefined,
                budget: budget || undefined,
                jobDetails: String(fd.get("details") ?? "").trim(),
                calculatorSummary: String(fd.get("calculatorSummary") ?? "").trim() || undefined,
                attachments: attachments.length > 0 ? attachments : undefined,
                turnstileToken: turnstileToken || undefined,
            };

            const res = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = (await res.json().catch(() => null)) as
                | { ok: true }
                | { ok: false; error: string; turnstileErrorCodes?: string[] }
                | null;

            if (!res.ok || !json || ("ok" in json && json.ok === false)) {
                const message = json && "error" in json ? json.error : "Unable to submit. Please try again.";

                if (process.env.NODE_ENV !== "production") {
                    console.debug("[quote] /api/quote failed", {
                        status: res.status,
                        json,
                    });
                }

                toast.error(message);
                setIsSubmitting(false);
                setTurnstileToken("");
                turnstileRef.current?.reset();
                return;
            }

            setIsSubmitting(false);
            setSubmitted(true);
            toast.success(form.toastSuccess);

            void capturePostHogEvent("conversion_quote_submit", {
                source: "quote",
                serviceType: service,
                timeframe: timeframe || null,
                budget: budget || null,
                fileCount: files.length,
                hasCalculatorSummary: Boolean(
                    String(fd.get("calculatorSummary") ?? "").trim(),
                ),
                turnstileEnabled: isTurnstileEnabled,
            });

            resetForm(formEl);
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
                        {/* What to expect */}
                        <Card className="relative overflow-hidden rounded-4xl border-border bg-slate-900 text-background shadow-none dark:bg-background dark:text-foreground">
                            <div className="absolute inset-0 bg-[url('/patterns/pattern-1.png')] bg-repeat opacity-10 dark:opacity-5" />
                            <CardContent className="relative px-6">
                                <div className="text-xl font-semibold text-background dark:text-foreground">{expect.title}</div>
                                <p className="mt-2 text-sm md:text-base leading-relaxed text-background/80 dark:text-muted-foreground">
                                    {expect.description}
                                </p>

                                <ol className="mt-6 space-y-3 text-sm md:text-base text-background/80 dark:text-muted-foreground">
                                    {expect.steps.map((step, index) => (
                                        <li key={`${index + 1}-${step}`} className="flex gap-3">
                                            <span className="text-primary font-semibold">{index + 1}.</span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ol>

                                <div className="mt-6 text-sm text-background/80 dark:text-muted-foreground">
                                    {expect.responseTimeLabel}{" "}
                                    <span className="text-background dark:text-foreground">{expect.responseTimeValue}</span>.
                                </div>
                            </CardContent>
                        </Card>

                        {/* Form - SIMPLIFIED */}
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="text-xl font-semibold text-foreground">{form.title}</div>
                                <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                    Just the basics — we&apos;ll handle the rest.
                                </p>

                                <form className="mt-6 space-y-5" onSubmit={onSubmit}>
                                    {/* Honeypot field for basic spam protection */}
                                    <input
                                        type="text"
                                        name="company"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        className="hidden"
                                    />

                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Your Name *</Label>
                                        <Input id="name" name="name" autoComplete="name" required placeholder="John Smith" />
                                    </div>

                                    {/* Contact - at least one required */}
                                    <fieldset className="space-y-3">
                                        <legend className="text-sm font-medium text-foreground">
                                            How should we reach you? <span className="text-muted-foreground font-normal">(one or both)</span>
                                        </legend>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="07XXX XXXXXX" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
                                            </div>
                                        </div>
                                        {contactError && <p className="text-sm text-destructive">{contactError}</p>}
                                    </fieldset>

                                    {/* Job details */}
                                    <div className="space-y-2">
                                        <Label htmlFor="details">What do you need help with? *</Label>
                                        <Textarea
                                            id="details"
                                            name="details"
                                            required
                                            placeholder="e.g., 'Lawn needs mowing weekly' or 'Hedges are overgrown and need cutting back'"
                                            className="min-h-[100px]"
                                        />
                                    </div>

                                    {/* Response time indicator */}
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        We usually respond within 2-4 hours
                                    </p>

                                    {/* Optional fields toggle */}
                                    <button
                                        type="button"
                                        onClick={() => setShowOptional(!showOptional)}
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showOptional ? 'rotate-180' : ''}`} />
                                        {showOptional ? 'Hide' : 'Add'} optional details (address, photos, etc.)
                                    </button>

                                    {/* Optional fields - collapsed by default */}
                                    {showOptional && (
                                        <div className="space-y-5 pt-2 border-t">
                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="address">{form.addressLabel}</Label>
                                                    <Input id="address" name="address" autoComplete="street-address" placeholder="Your street address" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>{form.serviceTypeLabel}</Label>
                                                    <Select key={`service-${selectResetNonce}`} onValueChange={setService}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder={form.serviceTypePlaceholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {form.serviceOptions.map((option) => (
                                                                <SelectItem key={option} value={option}>
                                                                    {option}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <input type="hidden" name="service" value={service} />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label>{form.timeframeLabel}</Label>
                                                    <Select key={`timeframe-${selectResetNonce}`} onValueChange={setTimeframe}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder={form.timeframePlaceholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {form.timeframeOptions.map((option) => (
                                                                <SelectItem key={option} value={option}>
                                                                    {option}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <input type="hidden" name="timeframe" value={timeframe} />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>{form.budgetLabel}</Label>
                                                    <Select key={`budget-${selectResetNonce}`} onValueChange={setBudget}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder={form.budgetPlaceholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {form.budgetOptions.map((option) => (
                                                                <SelectItem key={option} value={option}>
                                                                    {option}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <input type="hidden" name="budget" value={budget} />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="photos">{form.photosLabel}</Label>
                                                <Input
                                                    ref={fileInputRef}
                                                    id="photos"
                                                    name="photos"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={(e) => validateAndAddFiles(e.currentTarget.files)}
                                                />
                                                <p className="text-xs text-muted-foreground">{form.photosHelp}</p>
                                            </div>

                                            {(fileError || fileWarning) && (
                                                <div className="text-sm">
                                                    {fileError && <p className="text-destructive">{fileError}</p>}
                                                    {!fileError && fileWarning && (
                                                        <p className="text-muted-foreground">{fileWarning}</p>
                                                    )}
                                                </div>
                                            )}

                                            {previews.length > 0 && (
                                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                                    {previews.map((item, index) => (
                                                        <div
                                                            key={item.id}
                                                            className="relative overflow-hidden rounded-xl border border-border bg-muted aspect-square"
                                                        >
                                                            <Image
                                                                src={item.url}
                                                                fill
                                                                unoptimized
                                                                alt={`${form.selectedPhotoAltPrefix} ${index + 1}`}
                                                                className="object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                aria-label={`${form.removeImageAriaLabelPrefix} ${index + 1}`}
                                                                onClick={() => removeFileById(item.id)}
                                                                className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/90 text-foreground shadow-xs hover:bg-accent"
                                                            >
                                                                <X className="h-4 w-4" aria-hidden />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <React.Suspense fallback={null}>
                                        <CalculatorSummaryFields calculatorSummary={calculatorSummary} />
                                    </React.Suspense>

                                    {formError && <p className="text-sm text-destructive">{formError}</p>}

                                    {submitted && (
                                        <p className="text-sm text-primary">{form.submittedText}</p>
                                    )}

                                    {isTurnstileEnabled ? (
                                        <Turnstile
                                            ref={turnstileRef}
                                            onToken={setTurnstileToken}
                                            siteKey={turnstileSiteKey}
                                        />
                                    ) : null}

                                    {!isTurnstileEnabled && process.env.NODE_ENV !== "production" ? (
                                        <p className="text-xs text-muted-foreground">
                                            Turnstile is not configured for the quote form. Set
                                            NEXT_PUBLIC_TURNSTILE_SITE_KEY_QUOTE and
                                            TURNSTILE_SECRET_KEY_QUOTE, then restart the dev server.
                                        </p>
                                    ) : null}

                                    <div className="pt-1">
                                        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                                            {isSubmitting
                                                ? form.submitLoadingLabel
                                                : "Get My Free Quote →"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
