"use client";

import * as React from "react";
import { X } from "lucide-react";
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

const SERVICE_OPTIONS = [
    "Landscaping",
    "Lawn Care",
    "Garden Maintenance",
    "Hedge Trimming",
    "Mulching",
    "Seasonal Cleanup",
] as const;

const TIMEFRAME_OPTIONS = ["ASAP", "1–2 weeks", "This month", "Flexible"] as const;

const BUDGET_OPTIONS = [
    "Under $500",
    "$500–$1,500",
    "$1,500–$3,000",
    "$3,000+",
] as const;

type PreviewItem = {
    id: string;
    file: File;
    url: string;
};

function formatBytes(bytes: number) {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(mb >= 10 ? 0 : 1)}MB`;
}

export default function QuotePage() {
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
            setFileError("You can upload up to 6 photos.");
            return;
        }

        const nonImages = all.filter((f) => !f.type.startsWith("image/"));
        if (nonImages.length > 0) {
            setFileError("Only image files are allowed.");
            return;
        }

        const bigFiles = all.filter((f) => f.size > 8 * 1024 * 1024);
        if (bigFiles.length > 0) {
            setFileWarning(
                `Some photos are large (${bigFiles
                    .slice(0, 2)
                    .map((f) => formatBytes(f.size))
                    .join(", ")}). Upload may take longer.`
            );
        }

        setFiles(all);
    }

    function removeFileById(id: string) {
        setFiles((prev) =>
            prev.filter((file) => `${file.name}-${file.size}-${file.lastModified}` !== id)
        );
    }

    function resetForm(form: HTMLFormElement) {
        form.reset();
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
            setFormError("Please select a service type.");
            return;
        }

        if (files.length > 6) {
            setFileError("You can upload up to 6 photos.");
            return;
        }

        if (files.some((f) => !f.type.startsWith("image/"))) {
            setFileError("Only image files are allowed.");
            return;
        }

        setIsSubmitting(true);

        window.setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            toast.success("Quote request received! We'll be in touch soon.");
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
                            Quote
                        </div>

                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            Get Your Quote
                        </h1>

                        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
                            Share a few details and upload photos of the area — we’ll review everything and get back to you with next steps.
                        </p>
                    </div>

                    {/* Main grid */}
                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {/* What to expect */}
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="text-xl font-semibold text-foreground">
                                    What to expect
                                </div>
                                <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                    Here’s what typically happens after you submit your request.
                                </p>

                                <ol className="mt-6 space-y-3 text-sm md:text-base text-muted-foreground">
                                    <li className="flex gap-3">
                                        <span className="text-primary font-semibold">1.</span>
                                        <span>We review your details and photos.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary font-semibold">2.</span>
                                        <span>We may contact you with a couple of quick questions.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary font-semibold">3.</span>
                                        <span>We send an estimated range and a suggested timeline.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary font-semibold">4.</span>
                                        <span>If needed, we schedule a short site visit.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary font-semibold">5.</span>
                                        <span>You approve the quote and we book the job.</span>
                                    </li>
                                </ol>

                                <div className="mt-6 text-sm text-muted-foreground">
                                    Typical response time: <span className="text-foreground">within 1 business day</span>.
                                </div>
                            </CardContent>
                        </Card>

                        {/* Form */}
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="text-xl font-semibold text-foreground">
                                    Quote request
                                </div>
                                <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                    The more detail you provide, the more accurate your estimate will be.
                                </p>

                                <form className="mt-6 space-y-5" onSubmit={onSubmit}>
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full name</Label>
                                            <Input id="name" name="name" autoComplete="name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
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
                                            <Label htmlFor="phone">Phone (optional)</Label>
                                            <Input id="phone" name="phone" type="tel" autoComplete="tel" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address / Suburb (optional)</Label>
                                            <Input id="address" name="address" autoComplete="street-address" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Service type</Label>
                                            <Select value={service} onValueChange={setService}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a service" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {SERVICE_OPTIONS.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <input type="hidden" name="service" value={service ?? ""} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Preferred start timeframe (optional)</Label>
                                            <Select value={timeframe} onValueChange={setTimeframe}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choose a timeframe" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {TIMEFRAME_OPTIONS.map((option) => (
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
                                            <Label>Budget range (optional)</Label>
                                            <Select value={budget} onValueChange={setBudget}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a range" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {BUDGET_OPTIONS.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <input type="hidden" name="budget" value={budget ?? ""} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="photos">Photos (up to 6)</Label>
                                            <Input
                                                ref={fileInputRef}
                                                id="photos"
                                                name="photos"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => validateAndAddFiles(e.currentTarget.files)}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Add clear photos of the area from a few angles.
                                            </p>
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
                                                        alt={`Selected photo ${index + 1}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        aria-label={`Remove image ${index + 1}`}
                                                        onClick={() => removeFileById(item.id)}
                                                        className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/90 text-foreground shadow-xs hover:bg-accent"
                                                    >
                                                        <X className="h-4 w-4" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="details">Job details</Label>
                                        <Textarea
                                            id="details"
                                            name="details"
                                            required
                                            placeholder="What would you like done? Include approximate sizes, access notes, and anything else that helps us quote accurately."
                                        />
                                    </div>

                                    {formError && <p className="text-sm text-destructive">{formError}</p>}

                                    {submitted && (
                                        <p className="text-sm text-primary">
                                            Thanks — we received your request.
                                        </p>
                                    )}

                                    <div className="pt-1">
                                        <Button type="submit" size="lg" disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting…" : "Request Quote"}
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

