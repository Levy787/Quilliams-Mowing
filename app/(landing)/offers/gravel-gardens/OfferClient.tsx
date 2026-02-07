"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
    Star,
    Phone,
    Clock,
    Shield,
    CheckCircle2,
    Sparkles,
    ChevronDown,
    Leaf,
    Droplets,
    Sun,
    TrendingUp,
    Calendar,
    ArrowRight,
    MapPin,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Turnstile } from "@/components/TurnstileWidget";
import { cn } from "@/lib/utils";

/* ─────────────────────────── helpers ─────────────────────────── */

function FadeIn({
    children,
    className,
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function StarRating({ count = 5 }: { count?: number }) {
    return (
        <span className="inline-flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                />
            ))}
        </span>
    );
}

function scrollToForm() {
    document
        .getElementById("lead-form")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ─────────────────────────── data ─────────────────────────────── */

const TESTIMONIALS = [
    {
        name: "Hannah B",
        location: "Summer Court, Cornwall",
        quote: "We are extremely pleased with the result — Levi did an amazing job! He was very professional and listened to what we wanted. We will definitely be regular customers and would highly recommend to anyone looking for garden services!",
    },
    {
        name: "Matthew Wellington",
        location: "Truro, Cornwall",
        quote: "Great service from start to finish. Quick, tidy, and very reasonably priced. Everything was left neat and exactly how we wanted it. Would definitely recommend and use again.",
    },
    {
        name: "Kim Brocklehurst",
        location: "Newquay, Cornwall",
        quote: "Quick response to initial enquiry. Fast and thorough clearance of overgrown land. Will definitely use Levi again.",
    },
    {
        name: "Michael Meer",
        location: "Grampound, Cornwall",
        quote: "He works really hard — non-stop, has really good ideas for making a garden both tidy and practical and his prices are very competitive. What\u2019s more, he\u2019s a really nice bloke.",
    },
];

const BENEFITS = [
    {
        icon: Leaf,
        title: "No More Mowing",
        desc: "Reclaim your weekends. A gravel garden stays neat year-round with zero cutting.",
    },
    {
        icon: Droplets,
        title: "No Weeding",
        desc: "Professional membrane underneath blocks weeds before they start.",
    },
    {
        icon: Sun,
        title: "Year-Round Looks",
        desc: "Gravel doesn\u2019t go brown in summer or muddy in winter. Always pristine.",
    },
    {
        icon: TrendingUp,
        title: "Adds Property Value",
        desc: "Clean, low-maintenance frontage is a top buyer attractor in Cornwall.",
    },
];

const FAQS = [
    {
        q: "How long does a gravel garden installation take?",
        a: "Most residential gravel gardens are completed in 2\u20133 days, depending on the size and existing ground conditions. We\u2019ll give you a clear timeline before any work begins.",
    },
    {
        q: "Will weeds still grow through the gravel?",
        a: "We install a heavy-duty weed membrane underneath all our gravel installations. This blocks 99% of weed growth. The occasional stray seed that lands on top is easily pulled out in seconds.",
    },
    {
        q: "What types of gravel do you use?",
        a: "We offer a range of gravels including golden flint, Cotswold stone, slate chippings, and local Cornish aggregates. We\u2019ll bring samples to your consultation so you can see and feel the options in your own garden.",
    },
    {
        q: "Can I still have plants in a gravel garden?",
        a: "Absolutely! We create planting pockets within the gravel for Mediterranean-style plants, ornamental grasses, and shrubs. It creates a stunning low-maintenance look with real character.",
    },
    {
        q: "How much does a gravel garden cost?",
        a: "Every garden is different, which is why we offer a free, no-obligation design consultation and fixed quote within 24 hours. No surprises, no hidden fees. The consultation alone is worth \u00a3150.",
    },
    {
        q: "Do you serve my area?",
        a: "We cover Newquay, Truro, St Austell, and surrounding areas across Cornwall. Enter your postcode in the form above and we\u2019ll confirm your coverage straight away.",
    },
];

const BEFORE_AFTER = [
    {
        before: "/images/uploads/overgrown-mess-to-clean-gravel-garden/gallery/0/imageFile.webp",
        after: "/images/uploads/overgrown-mess-to-clean-gravel-garden/hero/imageFile.webp",
        beforeAlt: "Overgrown front garden before gravel transformation",
        afterAlt: "Clean gravel garden after professional installation",
        label: "Front Garden Rescue",
    },
    {
        before: "/images/uploads/gravel-garden-with-patio/gallery/0/imageFile.webp",
        after: "/images/uploads/gravel-garden-with-patio/hero/imageFile.jpg",
        beforeAlt: "Overgrown side garden before landscaping",
        afterAlt: "Beautiful gravel garden with patio after transformation",
        label: "Gravel & Patio Combo",
    },
    {
        before: "/images/uploads/overgrown-mess-to-clean-gravel-garden/gallery/2/imageFile.webp",
        after: "/images/uploads/overgrown-mess-to-clean-gravel-garden/gallery/4/imageFile.webp",
        beforeAlt: "Messy garden with overgrown plants and weeds",
        afterAlt: "Immaculate gravel garden with neat borders",
        label: "Complete Transformation",
    },
];

/* ─────────────────────────── components ──────────────────────── */

function TopBar() {
    return (
        <div className="bg-[oklch(0.18_0.02_150)] text-white/90">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs sm:text-sm">
                <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    Serving Cornwall
                </span>
                <a
                    href="tel:07593121621"
                    className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-primary"
                >
                    <Phone className="size-3.5" />
                    07593 121 621
                </a>
            </div>
        </div>
    );
}

function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[oklch(0.14_0.01_150)]">
            {/* texture overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />

            {/* gradient accent */}
            <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />

            <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:pb-24 sm:pt-20">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* copy */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary sm:text-sm">
                                <Calendar className="size-3.5" />
                                February Special — Limited Spots
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
                        >
                            Tired of{" "}
                            <span className="text-primary">Endless&nbsp;Mowing?</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
                        >
                            Transform your garden into a stunning, low-maintenance gravel
                            space in as little as 3&nbsp;days. No more weekends wasted
                            mowing. No more weeds. Just a beautiful garden you can
                            actually enjoy.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                        >
                            <Button
                                size="lg"
                                onClick={scrollToForm}
                                className="h-12 cursor-pointer rounded-xl px-7 text-base font-bold shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
                            >
                                Claim Your Free Consultation
                                <ArrowRight className="ml-1 size-4" />
                            </Button>
                            <span className="flex items-center gap-1.5 text-sm text-white/50">
                                <Shield className="size-4" />
                                No obligation &middot; 100% free
                            </span>
                        </motion.div>

                        {/* trust strip */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6"
                        >
                            <div className="flex items-center gap-2">
                                <StarRating />
                                <span className="text-sm font-medium text-white/60">
                                    5.0 on Google
                                </span>
                            </div>
                            <span className="hidden h-4 w-px bg-white/20 sm:block" />
                            <span className="flex items-center gap-1.5 text-sm text-white/60">
                                <CheckCircle2 className="size-4 text-primary" />
                                120+ projects completed
                            </span>
                            <span className="hidden h-4 w-px bg-white/20 sm:block" />
                            <span className="flex items-center gap-1.5 text-sm text-white/60">
                                <Clock className="size-4 text-primary" />
                                Fixed quote in 24hrs
                            </span>
                        </motion.div>
                    </div>

                    {/* hero image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                            <Image
                                src="/images/uploads/gravel-garden-with-patio/hero/imageFile.jpg"
                                alt="Beautiful gravel garden installation by Quilliams in Cornwall"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <span className="rounded-lg bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                                    Recent project &middot; Cornwall
                                </span>
                                <span className="rounded-lg bg-primary/90 px-3 py-1.5 text-xs font-bold text-white">
                                    3-Day Install
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function BeforeAfterSection() {
    return (
        <section className="bg-[oklch(0.97_0.005_80)] py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4">
                <FadeIn className="text-center">
                    <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                        Real Results
                    </span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        See the Transformation
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                        These are real gardens in Cornwall we transformed. No stock
                        photos, no filters — just honest before &amp; after shots.
                    </p>
                </FadeIn>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {BEFORE_AFTER.map((item, i) => (
                        <FadeIn key={i} delay={i * 0.12}>
                            <div className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg">
                                {/* before */}
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={item.before}
                                        alt={item.beforeAlt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <span className="absolute left-3 top-3 rounded-md bg-red-600/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                                        Before
                                    </span>
                                </div>
                                {/* arrow divider */}
                                <div className="flex items-center justify-center -my-3 relative z-10">
                                    <span className="flex size-7 items-center justify-center rounded-full bg-primary text-white shadow-md">
                                        <ChevronDown className="size-4" />
                                    </span>
                                </div>
                                {/* after */}
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={item.after}
                                        alt={item.afterAlt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <span className="absolute left-3 top-3 rounded-md bg-primary/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                                        After
                                    </span>
                                </div>
                                {/* label */}
                                <div className="border-t border-border px-4 py-3">
                                    <p className="text-sm font-semibold text-foreground">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

function BenefitsSection() {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4">
                <FadeIn className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Why Homeowners Are Switching to{" "}
                        <span className="text-primary">Gravel Gardens</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                        Join dozens of Cornwall homeowners who swapped endless
                        maintenance for effortless curb appeal.
                    </p>
                </FadeIn>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {BENEFITS.map((b, i) => {
                        const Icon = b.icon;
                        return (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="group rounded-2xl border border-border bg-[oklch(0.985_0.003_150/0.5)] p-6 transition-all hover:border-primary/30 hover:shadow-md">
                                    <span className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                        <Icon className="size-5" />
                                    </span>
                                    <h3 className="text-lg font-bold text-foreground">
                                        {b.title}
                                    </h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                        {b.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function OfferSection() {
    return (
        <section className="relative overflow-hidden bg-[oklch(0.14_0.01_150)] py-16 sm:py-24">
            {/* decorative blobs */}
            <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary/15 blur-[100px]" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />

            <div className="relative mx-auto max-w-4xl px-4 text-center">
                <FadeIn>
                    <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm font-semibold text-amber-400">
                        <Sparkles className="size-4" />
                        February Exclusive Offer
                    </span>

                    <h2 className="mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                        Free Gravel Garden Design Consultation
                    </h2>
                    <p className="mt-2 text-lg font-medium text-primary">
                        Worth £150 — yours free, with zero obligation
                    </p>
                </FadeIn>

                <FadeIn delay={0.15}>
                    <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                        {[
                            {
                                icon: Calendar,
                                title: "Free Site Visit",
                                desc: "We come to your property, measure up, and discuss your vision — completely free.",
                            },
                            {
                                icon: Clock,
                                title: "Fixed Quote in 24hrs",
                                desc: "No vague estimates. You\u2019ll receive a detailed, fixed-price quote within 24 hours.",
                            },
                            {
                                icon: Sparkles,
                                title: "Free Membrane Upgrade",
                                desc: "Book in February and we\u2019ll upgrade to premium weed membrane at no extra cost.",
                            },
                        ].map((o, i) => {
                            const Icon = o.icon;
                            return (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm"
                                >
                                    <span className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                                        <Icon className="size-5" />
                                    </span>
                                    <h3 className="text-base font-bold text-white">
                                        {o.title}
                                    </h3>
                                    <p className="mt-1 text-sm leading-relaxed text-white/60">
                                        {o.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <Button
                        size="lg"
                        onClick={scrollToForm}
                        className="mt-10 h-13 cursor-pointer rounded-xl px-8 text-base font-bold shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
                    >
                        Claim Your Free Consultation
                        <ArrowRight className="ml-1 size-4" />
                    </Button>
                    <p className="mt-3 text-sm text-white/40">
                        Only a few February slots remaining
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}

function TestimonialsSection() {
    return (
        <section className="bg-[oklch(0.97_0.005_80)] py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4">
                <FadeIn className="text-center">
                    <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                        Testimonials
                    </span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Cornwall Homeowners Love Us
                    </h2>
                </FadeIn>

                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                    {TESTIMONIALS.map((t, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
                                <StarRating />
                                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>
                                <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                                    <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                        {t.name[0]}
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            {t.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {t.location}
                                        </p>
                                    </div>
                                </figcaption>
                            </figure>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

function LeadForm() {
    const [form, setForm] = React.useState({
        name: "",
        phone: "",
        postcode: "",
    });
    const [token, setToken] = React.useState("");
    const [status, setStatus] = React.useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [errorMsg, setErrorMsg] = React.useState("");
    const turnstileRef = React.useRef<{ reset: () => void }>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "submitting") return;

        if (!form.name.trim() || !form.phone.trim() || !form.postcode.trim()) {
            setErrorMsg("Please fill in all fields.");
            setStatus("error");
            return;
        }

        setStatus("submitting");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    phone: form.phone.trim(),
                    email: `${form.phone.trim().replace(/\s/g, "")}@offer-lead.local`,
                    message: `[Gravel Garden Offer Lead]\nPostcode: ${form.postcode.trim()}\nPhone: ${form.phone.trim()}\nSource: gravel-garden-offer\n\nThis lead came from the paid ads gravel garden landing page.`,
                    service: "Gravel Garden Installation",
                    source: "gravel-garden-offer",
                    turnstileToken: token,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setStatus("success");
        } catch (err) {
            setErrorMsg(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again.",
            );
            setStatus("error");
            turnstileRef.current?.reset();
        }
    };

    if (status === "success") {
        return (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
                <span className="mb-3 inline-flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="size-7" />
                </span>
                <h3 className="text-xl font-bold text-foreground">
                    You&apos;re Booked In!
                </h3>
                <p className="mt-2 text-muted-foreground">
                    We&apos;ll call you within a few hours to arrange your free site
                    visit. Keep an eye on your phone!
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                    Or call us now:{" "}
                    <a
                        href="tel:07593121621"
                        className="font-semibold text-primary hover:underline"
                    >
                        07593 121 621
                    </a>
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                </Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Sarah Jones"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-1.5 h-11"
                />
            </div>
            <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                </Label>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. 07700 900123"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="mt-1.5 h-11"
                />
            </div>
            <div>
                <Label htmlFor="postcode" className="text-sm font-medium">
                    Postcode
                </Label>
                <Input
                    id="postcode"
                    name="postcode"
                    placeholder="e.g. TR7 1AE"
                    value={form.postcode}
                    onChange={handleChange}
                    required
                    className="mt-1.5 h-11"
                />
            </div>

            <Turnstile
                ref={turnstileRef}
                onToken={setToken}
                siteKey={
                    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_CONTACT ??
                    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
                }
                size="flexible"
                className="mt-2"
            />

            {status === "error" && errorMsg && (
                <p className="text-sm font-medium text-red-600">{errorMsg}</p>
            )}

            {/* honeypot */}
            <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] opacity-0"
                aria-hidden
            />

            <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="h-12 w-full cursor-pointer rounded-xl text-base font-bold shadow-lg shadow-primary/25 transition-transform hover:scale-[1.01]"
            >
                {status === "submitting" ? (
                    "Sending..."
                ) : (
                    <>
                        Book My Free Consultation
                        <ArrowRight className="ml-1 size-4" />
                    </>
                )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
                <Shield className="mb-px mr-1 inline size-3" />
                Your details are safe. We&apos;ll only use them to arrange your
                consultation.
            </p>
        </form>
    );
}

function FormSection() {
    return (
        <section id="lead-form" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid items-start gap-12 lg:grid-cols-2">
                    {/* left — reassurance */}
                    <FadeIn>
                        <div>
                            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                                <Calendar className="size-3.5" />
                                Free &middot; No Obligation
                            </span>
                            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                                Book Your Free Design Consultation
                            </h2>
                            <p className="mt-3 text-muted-foreground">
                                Leave your details and we&apos;ll call you back within a
                                few hours to arrange a free visit to your property.
                            </p>

                            <ul className="mt-8 space-y-4">
                                {[
                                    "Free on-site design consultation (worth £150)",
                                    "Fixed, no-surprise quote within 24 hours",
                                    "February bonus: free premium membrane upgrade",
                                    "Most gardens completed in just 2–3 days",
                                ].map((text, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-sm text-foreground/80"
                                    >
                                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                                        {text}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 flex items-center gap-4 rounded-xl border border-border bg-secondary/50 p-4">
                                <Image
                                    src="/images/uploads/site/branding/logoFile.webp"
                                    alt="Quilliams Gardening & Landscaping logo"
                                    width={140}
                                    height={40}
                                    className="shrink-0"
                                />
                                <div className="text-sm">
                                    <p className="font-semibold text-foreground">
                                        Quilliams Gardening &amp; Landscaping
                                    </p>
                                    <p className="text-muted-foreground">
                                        5+ years &middot; 120+ projects &middot; Cornwall
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* right — form */}
                    <FadeIn delay={0.15}>
                        <div className="rounded-2xl border border-border bg-[oklch(0.985_0.003_150/0.3)] p-6 shadow-lg sm:p-8">
                            <div className="mb-6 text-center">
                                <h3 className="text-lg font-bold text-foreground">
                                    Get Your Free Consultation
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Takes 30 seconds — we&apos;ll handle the rest
                                </p>
                            </div>
                            <LeadForm />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}

function FAQSection() {
    const [openIdx, setOpenIdx] = React.useState<number | null>(null);

    return (
        <section className="bg-[oklch(0.97_0.005_80)] py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-4">
                <FadeIn className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Common Questions
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        Everything you need to know about gravel garden installations.
                    </p>
                </FadeIn>

                <div className="mt-10 space-y-3">
                    {FAQS.map((faq, i) => {
                        const isOpen = openIdx === i;
                        return (
                            <FadeIn key={i} delay={i * 0.06}>
                                <div className="overflow-hidden rounded-xl border border-border bg-white">
                                    <button
                                        onClick={() =>
                                            setOpenIdx(isOpen ? null : i)
                                        }
                                        className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-sm font-semibold text-foreground transition-colors hover:bg-secondary/40"
                                    >
                                        {faq.q}
                                        <ChevronDown
                                            className={cn(
                                                "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                                                isOpen && "rotate-180",
                                            )}
                                        />
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: isOpen ? "auto" : 0,
                                            opacity: isOpen ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function FinalCTA() {
    return (
        <section className="bg-primary py-12 sm:py-16">
            <div className="mx-auto max-w-3xl px-4 text-center">
                <FadeIn>
                    <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                        Ready to Ditch the Mower for Good?
                    </h2>
                    <p className="mt-2 text-white/80">
                        Your free design consultation is one click away.
                    </p>
                    <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Button
                            size="lg"
                            onClick={scrollToForm}
                            className="h-12 cursor-pointer rounded-xl bg-white px-7 text-base font-bold text-primary shadow-lg transition-transform hover:scale-[1.02] hover:bg-white/90"
                        >
                            Book Free Consultation
                            <ArrowRight className="ml-1 size-4" />
                        </Button>
                        <span className="text-sm text-white/60">or</span>
                        <a
                            href="tel:07593121621"
                            className="inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-white/80"
                        >
                            <Phone className="size-4" />
                            07593 121 621
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

function StickyMobileCTA() {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 600);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [dismissed, setDismissed] = React.useState(false);

    if (dismissed) return null;

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: visible ? 0 : 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
        >
            <div className="flex items-center gap-2">
                <Button
                    size="lg"
                    onClick={scrollToForm}
                    className="h-11 flex-1 cursor-pointer rounded-xl text-sm font-bold shadow-lg shadow-primary/20"
                >
                    Free Consultation
                    <ArrowRight className="ml-1 size-3.5" />
                </Button>
                <a
                    href="tel:07593121621"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary transition-colors hover:bg-secondary/80"
                >
                    <Phone className="size-4 text-foreground" />
                </a>
                <button
                    onClick={() => setDismissed(true)}
                    className="flex h-11 w-8 shrink-0 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground"
                    aria-label="Dismiss"
                >
                    <X className="size-4" />
                </button>
            </div>
        </motion.div>
    );
}

function FooterMinimal() {
    return (
        <footer className="border-t border-border bg-[oklch(0.14_0.01_150)] py-8">
            <div className="mx-auto max-w-6xl px-4 text-center text-sm text-white/40">
                <p>
                    &copy; {new Date().getFullYear()} Quilliams Gardening &amp;
                    Landscaping. All rights reserved.
                </p>
                <p className="mt-1">
                    Serving Newquay, Truro, St Austell &amp; surrounding areas in
                    Cornwall.
                </p>
            </div>
        </footer>
    );
}

/* ─────────────────────────── page ────────────────────────────── */

export default function OfferClient() {
    return (
        <div className="min-h-screen">
            <TopBar />
            <HeroSection />
            <BeforeAfterSection />
            <BenefitsSection />
            <OfferSection />
            <TestimonialsSection />
            <FormSection />
            <FAQSection />
            <FinalCTA />
            <FooterMinimal />
            <StickyMobileCTA />
        </div>
    );
}
