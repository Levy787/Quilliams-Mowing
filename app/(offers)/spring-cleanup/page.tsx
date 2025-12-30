"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    BadgeCheck,
    Clock,
    Phone,
    ShieldCheck,
    Sparkles,
    Star,
    X,
} from "lucide-react";
import { toast } from "sonner";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const OFFER = {
    headline: "Spring Cleanup Special",
    subheadline:
        "Clear the mess, refresh your garden beds, and get your yard back under control — fast, tidy, and stress-free.",
    terms: "Limited spots available. New customers only.",
    serviceArea: "Serving Wollongong & nearby suburbs",
    phoneDisplay: "+1 (555) 123-4567",
    phoneTel: "+15551234567",
    email: "hello@quilliamsgardening.com",
} as const;

type PreviewItem = {
    id: string;
    file: File;
    url: string;
};

function fileId(file: File) {
    return `${file.name}-${file.size}-${file.lastModified}`;
}

function formatBytes(bytes: number) {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(mb >= 10 ? 0 : 1)}MB`;
}

export default function SpringCleanupOfferPage() {
    const formRef = React.useRef<HTMLDivElement | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const [files, setFiles] = React.useState<File[]>([]);
    const [previews, setPreviews] = React.useState<PreviewItem[]>([]);
    const [fileError, setFileError] = React.useState<string | null>(null);
    const [fileWarning, setFileWarning] = React.useState<string | null>(null);
    const [submitted, setSubmitted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        const next = files.map((file) => {
            const url = URL.createObjectURL(file);
            return { id: fileId(file), file, url };
        });

        setPreviews(next);

        return () => {
            for (const item of next) URL.revokeObjectURL(item.url);
        };
    }, [files]);

    function scrollToForm() {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

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
        setFiles((prev) => prev.filter((file) => fileId(file) !== id));
    }

    function resetForm(form: HTMLFormElement) {
        form.reset();
        setFiles([]);
        setFileError(null);
        setFileWarning(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(false);

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
            toast.success("Offer claimed! We'll get back to you soon.");
            resetForm(event.currentTarget);
        }, 400);
    }

    return (
        <main>
            {/* HERO */}
            <section id="offer-hero" className="mx-4 md:mx-8 lg:mx-16 pt-10 md:pt-12">
                <div
                    className="bg-gray-900 rounded-4xl relative overflow-hidden"
                    style={{
                        backgroundImage: "url(/patterns/pattern-1.png)",
                        backgroundRepeat: "repeat",
                        backgroundBlendMode: "overlay",
                    }}
                >
                    <div className="container mx-auto px-4 lg:px-12 relative z-10 py-12 md:py-16">
                        <div className="grid gap-10 items-center lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                            <div className="min-w-0">
                                <div className="inline-flex items-center rounded-full bg-background/10 px-4 py-1.5 text-sm text-white/80">
                                    Limited Offer
                                </div>

                                <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                                    {OFFER.headline}
                                </h1>

                                <p className="mt-4 text-base md:text-lg leading-relaxed text-white/80 max-w-2xl">
                                    {OFFER.subheadline}
                                </p>

                                <ul className="mt-6 space-y-2 text-white/80">
                                    <li className="flex items-center gap-2">
                                        <BadgeCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                                        Fast response
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                                        Transparent pricing
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                                        Friendly, reliable crew
                                    </li>
                                </ul>

                                <div id="offer-cta" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <Button size="lg" onClick={scrollToForm}>
                                        Claim Offer
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href={`tel:${OFFER.phoneTel}`}>
                                            <Phone className="h-5 w-5" aria-hidden="true" />
                                            Call {OFFER.phoneDisplay}
                                        </Link>
                                    </Button>
                                </div>

                                <p className="mt-4 text-sm text-white/60">
                                    {OFFER.terms} · {OFFER.serviceArea}
                                </p>
                            </div>

                            <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 aspect-4/3 lg:aspect-3/4">
                                <Image
                                    src="https://picsum.photos/id/292/1200/1400"
                                    alt="Freshly cleaned garden beds and tidy yard"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                    priority={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST STRIP */}
            <section className="mx-4 md:mx-8 lg:mx-16 py-10">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="rounded-3xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                                    <div className="text-sm font-medium text-foreground">Licensed & insured</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-3xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="flex items-center gap-3">
                                    <Star className="h-5 w-5 text-primary" aria-hidden="true" />
                                    <div className="text-sm font-medium text-foreground">5-star service mindset</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-3xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                                    <div className="text-sm font-medium text-foreground">On-time scheduling</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-3xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                                    <div className="text-sm font-medium text-foreground">Clean finish</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* DETAILS + PROCESS + FORM */}
            <section className="mx-4 md:mx-8 lg:mx-16 pb-12 md:pb-16">
                <div className="container mx-auto px-4 lg:px-12">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {/* Offer details */}
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="text-xl font-semibold text-foreground">What’s included</div>
                                <ul className="mt-4 space-y-2 text-sm md:text-base text-muted-foreground">
                                    <li>Leaf and debris removal (beds + pathways)</li>
                                    <li>Weeding and garden bed tidy-up</li>
                                    <li>Light pruning (as needed)</li>
                                    <li>Green waste bagging/stacking</li>
                                    <li>Final blow-down for a clean finish</li>
                                </ul>

                                <div className="mt-8 text-xl font-semibold text-foreground">Ideal for</div>
                                <ul className="mt-4 space-y-2 text-sm md:text-base text-muted-foreground">
                                    <li>Overgrown gardens that need a reset</li>
                                    <li>Season changeovers and property refresh</li>
                                    <li>Homeowners short on time</li>
                                </ul>

                                <div className="mt-8 text-xl font-semibold text-foreground">Typical timeline</div>
                                <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                                    Most cleanups take 2–4 hours depending on yard size and access.
                                </p>

                                <p className="mt-6 text-sm text-muted-foreground">
                                    {OFFER.terms}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Process + form */}
                        <div className="space-y-6">
                            <Card className="rounded-4xl border-border shadow-none">
                                <CardContent className="px-6">
                                    <div className="text-xl font-semibold text-foreground">What happens next</div>
                                    <ol className="mt-4 space-y-3 text-sm md:text-base text-muted-foreground">
                                        <li className="flex gap-3">
                                            <span className="text-primary font-semibold">1.</span>
                                            <span>Submit the form</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-primary font-semibold">2.</span>
                                            <span>We review your details/photos</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-primary font-semibold">3.</span>
                                            <span>We confirm scope and timing</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-primary font-semibold">4.</span>
                                            <span>You get a quote and book</span>
                                        </li>
                                    </ol>
                                </CardContent>
                            </Card>

                            <div ref={formRef} id="offer-form">
                                <Card className="rounded-4xl border-border shadow-none">
                                    <CardContent className="px-6">
                                        <div className="text-xl font-semibold text-foreground">Claim the offer</div>
                                        <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                            Share a few details and we’ll respond as soon as possible.
                                        </p>

                                        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Full name</Label>
                                                    <Input id="name" name="name" autoComplete="name" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" name="email" type="email" autoComplete="email" required />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone (optional)</Label>
                                                    <Input id="phone" name="phone" type="tel" autoComplete="tel" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="suburb">Suburb / address (optional)</Label>
                                                    <Input id="suburb" name="suburb" autoComplete="street-address" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="message">Short message</Label>
                                                <Textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    placeholder="Tell us what needs cleaning up and any access notes."
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="photos">Photos (optional, up to 6)</Label>
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

                                            {submitted && (
                                                <p className="text-sm text-primary">
                                                    Thanks — we received your request.
                                                </p>
                                            )}

                                            <div className="pt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
                                                <Button type="submit" size="lg" disabled={isSubmitting}>
                                                    {isSubmitting ? "Submitting…" : "Claim Offer"}
                                                </Button>
                                                <Button type="button" size="lg" variant="outline" asChild>
                                                    <Link href={`tel:${OFFER.phoneTel}`}>Call {OFFER.phoneDisplay}</Link>
                                                </Button>
                                            </div>

                                            <p className="text-xs text-muted-foreground">
                                                Or email: {OFFER.email}
                                            </p>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-10">
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="text-xl font-semibold text-foreground">FAQ</div>
                                <Accordion type="single" collapsible className="mt-4">
                                    <AccordionItem value="q1">
                                        <AccordionTrigger>How soon can you come out?</AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            We’ll confirm availability after you submit. Same-week spots may be available depending on demand.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q2">
                                        <AccordionTrigger>Do you take away green waste?</AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            We can bag/stack green waste and discuss removal options when we confirm your scope.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q3">
                                        <AccordionTrigger>Is the offer available for large properties?</AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            Yes — we’ll tailor the quote based on property size, access, and workload.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="q4">
                                        <AccordionTrigger>What do you need from me to quote?</AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            A short description and a few photos are usually enough. We’ll ask follow-up questions if needed.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Footer note */}
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        {OFFER.serviceArea}
                    </p>
                </div>
            </section>
        </main>
    );
}

