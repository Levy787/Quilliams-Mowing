"use client";

import * as React from "react";
import { X } from "lucide-react";
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
    return `$${amount.toLocaleString()}`;
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
        <div className="rounded-4xl border border-border bg-muted/25 p-5">
            <div className="text-sm font-semibold text-foreground">{calculatorSummary.title}</div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                {summary.headline}
            </div>
            {summary.details && (
                <p className="mt-2 text-sm text-muted-foreground">{summary.details}</p>
            )}
            <p className="mt-2 text-sm text-muted-foreground">
                {calculatorSummary.addonsLabel} {summary.addons}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">{calculatorSummary.note}</p>
            <input type="hidden" name="calculatorSummary" value={summary.hiddenValue} />
        </div>
    );
}

export default function QuoteClient({ header, expect, calculatorSummary, form }: QuoteClientProps) {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [service, setService] = React.useState<string | undefined>(undefined);
    const [timeframe, setTimeframe] = React.useState<string | undefined>(undefined);
    const [budget, setBudget] = React.useState<string | undefined>(undefined);

    const [files, setFiles] = React.useState<File[]>([]);
    const [previews, setPreviews] = React.useState<PreviewItem[]>([]);
    const [fileError, setFileError] = React.useState<string | null>(null);
    const [fileWarning, setFileWarning] = React.useState<string | null>(null);
    const [formError, setFormError] = React.useState<string | null>(null);
    const [submitted, setSubmitted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        const next = files.map((file) => {
            const url = URL.createObjectURL(file);
            return { id: `${file.name}-${file.size}-${file.lastModified}`, file, url };
        });

        setPreviews(next);

        return () => {
            for (const item of next) URL.revokeObjectURL(item.url);
        };
    }, [files]);

    function validateAndAddFiles(selected: FileList | null) {
        setFileError(null);
        setFileWarning(null);

        if (!selected || selected.length === 0) return;

        const incoming = Array.from(selected);
        const all = [...files, ...incoming];

        if (all.length > 6) {
            setFileError(form.maxPhotosError);
            return;
        }

        const nonImages = all.filter((f) => !f.type.startsWith("image/"));
        if (nonImages.length > 0) {
            setFileError(form.onlyImagesError);
            return;
        }

        const bigFiles = all.filter((f) => f.size > 8 * 1024 * 1024);
        if (bigFiles.length > 0) {
            setFileWarning(
                `${form.largePhotosWarningPrefix} (${bigFiles
                    .slice(0, 2)
                    .map((f) => formatBytes(f.size))
                    .join(", ")}). ${form.largePhotosWarningSuffix}`,
            );
        }

        setFiles(all);
    }

    function removeFileById(id: string) {
        setFiles((prev) =>
            prev.filter((file) => `${file.name}-${file.size}-${file.lastModified}` !== id),
        );
    }

    function resetForm(htmlForm: HTMLFormElement) {
        htmlForm.reset();
        setService(undefined);
        setTimeframe(undefined);
        setBudget(undefined);
        setFiles([]);
        setFileError(null);
        setFileWarning(null);
        setFormError(null);

        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(false);
        setFormError(null);

        if (!service) {
            setFormError(form.requiredServiceError);
            return;
        }

        if (files.length > 6) {
            setFileError(form.maxPhotosError);
            return;
        }

        if (files.some((f) => !f.type.startsWith("image/"))) {
            setFileError(form.onlyImagesError);
            return;
        }

        setIsSubmitting(true);

        window.setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            toast.success(form.toastSuccess);
            resetForm(event.currentTarget);
        }, 400);
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

                        {/* Form */}
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="text-xl font-semibold text-foreground">{form.title}</div>
                                <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                    {form.description}
                                </p>

                                <form className="mt-6 space-y-5" onSubmit={onSubmit}>
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
                                            <Label htmlFor="address">{form.addressLabel}</Label>
                                            <Input id="address" name="address" autoComplete="street-address" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>{form.serviceTypeLabel}</Label>
                                            <Select value={service} onValueChange={setService}>
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
                                            <input type="hidden" name="service" value={service ?? ""} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>{form.timeframeLabel}</Label>
                                            <Select value={timeframe} onValueChange={setTimeframe}>
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
                                            <input type="hidden" name="timeframe" value={timeframe ?? ""} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>{form.budgetLabel}</Label>
                                            <Select value={budget} onValueChange={setBudget}>
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
                                            <input type="hidden" name="budget" value={budget ?? ""} />
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
                                                    <img
                                                        src={item.url}
                                                        alt={`${form.selectedPhotoAltPrefix} ${index + 1}`}
                                                        className="h-full w-full object-cover"
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

                                    <React.Suspense fallback={null}>
                                        <CalculatorSummaryFields calculatorSummary={calculatorSummary} />
                                    </React.Suspense>

                                    <div className="space-y-2">
                                        <Label htmlFor="details">{form.jobDetailsLabel}</Label>
                                        <Textarea
                                            id="details"
                                            name="details"
                                            required
                                            placeholder={form.jobDetailsPlaceholder}
                                        />
                                    </div>

                                    {formError && <p className="text-sm text-destructive">{formError}</p>}

                                    {submitted && (
                                        <p className="text-sm text-primary">{form.submittedText}</p>
                                    )}

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
                </div>
            </section>
        </main>
    );
}
