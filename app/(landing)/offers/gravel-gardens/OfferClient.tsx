"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CalendarClock,
    CheckCircle2,
    ChevronDown,
    ClipboardCheck,
    Facebook,
    Phone,
    Ruler,
    ShieldCheck,
    Star,
    Truck,
} from "lucide-react";

import { Turnstile } from "@/components/TurnstileWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { capturePostHogEvent } from "@/lib/posthog-client";
import { cn } from "@/lib/utils";

const PHONE_DISPLAY = "07593 121 621";
const PHONE_TEL = "07593121621";
const GOOGLE_MAPS_URL = "https://g.page/r/Ca1e8ukWV-qsEBM/";
const FACEBOOK_URL = "https://www.facebook.com/quilliamsmowing/";
const OFFER_TIME_ZONE = "Europe/London";
const WEEKLY_OFFER_LABEL = "Current gravel garden offer: 10% off installs";
const WEEKLY_OFFER_DEADLINE = "Sunday 11:59pm UK time";

const HERO_AFTER = "/images/uploads/overgrown-mess-to-clean-gravel-garden/hero/imageFile.webp";

const OFFER_STATS = [
    ["10% off", "Installation labour discount"],
    ["Free visit", "Site visit and fixed quote"],
    ["1-3 days", "Typical small front gardens"],
] as const;

const PROCESS_STEPS = [
    {
        icon: Ruler,
        title: "Measure the space",
        text: "Levi checks access, levels, drainage, waste volume, edging, and the finish you want.",
    },
    {
        icon: Truck,
        title: "Clear and prepare",
        text: "Overgrowth is removed, the base is levelled, and green waste is handled properly.",
    },
    {
        icon: ShieldCheck,
        title: "Membrane and edges",
        text: "Heavy-duty membrane is pinned at joins and edges so the gravel has a clean foundation.",
    },
    {
        icon: ClipboardCheck,
        title: "Gravel and tidy",
        text: "Decorative gravel goes down, the edges are finished, and the site is left ready to use.",
    },
] as const;

const PROOF_CARDS = [
    {
        before: "/images/uploads/overgrown-mess-to-clean-gravel-garden/gallery/0/imageFile.webp",
        after: "/images/uploads/overgrown-mess-to-clean-gravel-garden/gallery/3/imageFile.jpg",
        title: "The front-garden reset",
    },
    {
        before: "/images/uploads/gravel-garden-with-patio/gallery/0/imageFile.webp",
        after: "/images/uploads/gravel-garden-with-patio/hero/imageFile.jpg",
        title: "The gravel-and-patio clean-up",
    },
];

const REVIEWS = [
    {
        name: "Kim Brocklehurst",
        location: "Newquay",
        quote: "Quick response to initial enquiry. Fast and thorough clearance of overgrown land. Will definitely use Levi again.",
    },
    {
        name: "Hannah B",
        location: "Cornwall",
        quote: "We are extremely pleased with the result. Levi did an amazing job and listened to what we wanted.",
    },
    {
        name: "Michael Meer",
        location: "Grampound",
        quote: "He works really hard, has really good ideas for making a garden both tidy and practical, and his prices are very competitive.",
    },
] as const;

const FAQS = [
    {
        q: "What does a gravel garden cost?",
        a: "Most small front garden gravel conversions around Newquay start from roughly £1,500. Size, waste, access, edging, gravel choice, and patio work can move that up or down.",
    },
    {
        q: "Will weeds come back?",
        a: "The aim is to stop growth from below. We clear, prepare, and install heavy-duty membrane before gravel. Surface weeds from wind-blown seeds can still appear, but they are much easier to pull.",
    },
    {
        q: "How quickly can it be done?",
        a: "Many front garden resets take 1-3 days once materials and access are confirmed. You get a clear timeline with your fixed quote.",
    },
];

function StarRating() {
    return (
        <span className="inline-flex gap-0.5" aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-4 fill-[#ffd34d] text-[#ffd34d]" />
            ))}
        </span>
    );
}

function getZonedDate(date: Date) {
    return new Date(date.toLocaleString("en-US", { timeZone: OFFER_TIME_ZONE }));
}

function getWeeklyOfferDeadline(now = new Date()) {
    const ukNow = getZonedDate(now);
    const deadline = new Date(ukNow);
    const daysUntilSunday = (7 - ukNow.getDay()) % 7;

    deadline.setDate(ukNow.getDate() + daysUntilSunday);
    deadline.setHours(23, 59, 59, 999);

    if (deadline.getTime() <= ukNow.getTime()) {
        deadline.setDate(deadline.getDate() + 7);
    }

    return deadline;
}

function formatWeeklyOfferDeadline(deadline: Date) {
    return deadline.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        weekday: "long",
    });
}

function getWeeklyOfferTimeLeft(now = new Date()) {
    const ukNow = getZonedDate(now);
    const deadline = getWeeklyOfferDeadline(now);
    const totalMs = Math.max(0, deadline.getTime() - ukNow.getTime());
    const days = Math.floor(totalMs / 86_400_000);
    const hours = Math.floor((totalMs % 86_400_000) / 3_600_000);
    const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
    const seconds = Math.floor((totalMs % 60_000) / 1_000);

    return {
        days,
        hours,
        minutes,
        seconds,
        deadlineLabel: formatWeeklyOfferDeadline(deadline),
    };
}

function useWeeklyOfferCountdown() {
    const [timeLeft, setTimeLeft] = React.useState<ReturnType<typeof getWeeklyOfferTimeLeft> | null>(null);

    React.useEffect(() => {
        function tick() {
            setTimeLeft(getWeeklyOfferTimeLeft());
        }

        tick();
        const intervalId = window.setInterval(tick, 1_000);

        return () => window.clearInterval(intervalId);
    }, []);

    return timeLeft;
}

function WeeklyOfferCountdown() {
    const timeLeft = useWeeklyOfferCountdown();

    if (!timeLeft) {
        return <span>Ends {WEEKLY_OFFER_DEADLINE}</span>;
    }

    const parts = [
        timeLeft.days > 0 ? `${timeLeft.days}d` : null,
        `${timeLeft.hours}h`,
        `${timeLeft.minutes}m`,
        timeLeft.days === 0 ? `${timeLeft.seconds}s` : null,
    ].filter(Boolean);

    return <span>Ends {timeLeft.deadlineLabel}: {parts.join(" ")}</span>;
}

function WeeklyOfferCallout() {
    return (
        <div className="mx-auto mt-5 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-lg border border-[#ffd34d]/45 bg-[#ffd34d]/14 px-4 py-3 text-sm font-black text-[#fff2b8] shadow-[0_18px_60px_-42px_rgba(0,0,0,0.9)] sm:text-base">
            <span>{WEEKLY_OFFER_LABEL}</span>
            <span className="inline-flex items-center gap-2 text-white">
                <CalendarClock className="size-4 text-[#ffd34d]" />
                <WeeklyOfferCountdown />
            </span>
        </div>
    );
}

function scrollToForm() {
    document
        .getElementById("hero-lead-form")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function trackPhone(location: string) {
    void capturePostHogEvent("click_phone", { location });
}

function LeadForm({ compact = false }: { compact?: boolean }) {
    const fieldId = React.useId();
    const [form, setForm] = React.useState({
        email: "",
        company: "",
    });
    const [token, setToken] = React.useState("");
    const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = React.useState("");
    const turnstileRef = React.useRef<{ reset: () => void }>(null);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (status === "submitting") return;

        const email = form.email.trim();

        if (!email) {
            setErrorMsg("Add your email first.");
            setStatus("error");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMsg("Enter a valid email address.");
            setStatus("error");
            return;
        }

        setStatus("submitting");
        setErrorMsg("");

        try {
            const jobDetails = [
                "[Meta Ads Gravel Garden Lead]",
                `Email: ${email}`,
                `Offer: ${WEEKLY_OFFER_LABEL}`,
                `Offer deadline: ${WEEKLY_OFFER_DEADLINE}`,
                "",
                "Lead requested a free site visit and fixed gravel garden quote from the Newquay landing page.",
            ].join("\n");

            const res = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "Gravel garden lead",
                    email,
                    serviceType: "Gravel Garden Installation",
                    timeframe: `Free site visit requested before ${WEEKLY_OFFER_DEADLINE}`,
                    budget: "10% off weekly offer claimed",
                    jobDetails,
                    company: form.company,
                    turnstileToken: token,
                }),
            });

            const data = (await res.json()) as { ok?: boolean; error?: string };

            if (!res.ok || !data.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setStatus("success");
            void capturePostHogEvent("conversion_gravel_offer_submit", {
                source: "meta-gravel-garden-landing-page",
            });
        } catch (error) {
            setErrorMsg(error instanceof Error ? error.message : "Something went wrong. Please try again.");
            setStatus("error");
            turnstileRef.current?.reset();
        }
    }

    if (status === "success") {
        return (
            <div className="rounded-lg bg-white px-5 py-4 text-center text-[#10140e] shadow-[0_24px_80px_-48px_rgba(0,0,0,0.75)] sm:px-8">
                <p className="text-lg font-black">Request sent. Levi will email you.</p>
                <a
                    href={`tel:${PHONE_TEL}`}
                    onClick={() => trackPhone("gravel_offer_success")}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#238845]"
                >
                    <Phone className="size-4" />
                    Call now instead
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={cn(compact ? "space-y-3" : "space-y-4")}>
            <div
                className={cn(
                    "grid gap-2 rounded-lg bg-white/95 p-2 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]",
                    compact
                        ? "grid-cols-1"
                        : "grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto]",
                )}
            >
                <div className="flex min-h-14 items-center rounded-md bg-[#f1f2ee] px-4">
                    <Input
                        id={`${fieldId}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        aria-label="Email address"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        required
                        className="h-10 border-0 bg-transparent px-0 text-base font-semibold text-[#10140e] shadow-none placeholder:text-[#6f746a] focus-visible:ring-0"
                    />
                </div>
                <Button
                    type="submit"
                    size="lg"
                    disabled={status === "submitting"}
                    className="min-h-14 cursor-pointer rounded-md bg-[#55c768] px-7 text-base font-black text-[#10140e] transition hover:scale-[1.02] hover:bg-[#72d580] active:scale-[0.99] disabled:opacity-70 sm:text-lg md:min-w-[220px]"
                >
                    {status === "submitting" ? "Claiming" : "Claim 10% off"}
                    {status !== "submitting" && <ArrowRight className="size-7 stroke-[3]" />}
                </Button>
            </div>

            <p className="text-center text-xs font-black uppercase tracking-wide text-[#fff2b8]">
                Claim before the timer ends to keep the 10% discount.
            </p>

            <Turnstile
                ref={turnstileRef}
                onToken={setToken}
                siteKey={
                    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_QUOTE ??
                    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
                }
                size="flexible"
            />

            {status === "error" && errorMsg && (
                <p className="text-center text-sm font-bold text-[#ffd34d]">{errorMsg}</p>
            )}

            <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] opacity-0"
                aria-hidden="true"
            />
        </form>
    );
}

function HeroSection() {
    return (
        <section className="relative isolate min-h-[88svh] overflow-hidden bg-[#132017] text-white">
            <Image
                src={HERO_AFTER}
                alt="Finished gravel garden in Newquay"
                fill
                priority
                className="scale-[1.02] object-cover opacity-[0.58]"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,32,23,0.18),rgba(19,32,23,0.72)_72%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />

            <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5">
                <Link
                    href="/"
                    className="inline-flex items-center"
                    aria-label="Quilliams Gardening and Landscaping home"
                >
                    <Image
                        src="/images/uploads/site/branding/logoFile.webp"
                        alt="Quilliams Gardening and Landscaping"
                        width={214}
                        height={56}
                        className="h-8 w-auto drop-shadow-[0_3px_12px_rgba(0,0,0,0.5)] sm:h-10 lg:h-12"
                        priority
                    />
                </Link>

                <a
                    href={`tel:${PHONE_TEL}`}
                    onClick={() => trackPhone("gravel_offer_nav")}
                    className="inline-flex shrink-0 items-center gap-2 text-base font-black text-white transition hover:text-[#7ee18d] sm:text-xl"
                    aria-label={`Call ${PHONE_DISPLAY}`}
                >
                    <Phone className="size-5 fill-[#55c768] text-[#55c768] sm:size-6" />
                    <span>{PHONE_DISPLAY}</span>
                </a>
            </header>

            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pb-20 pt-8 text-center sm:pt-16">
                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 }}
                    className="max-w-[13ch] text-[3.15rem] font-black leading-[0.92] text-white text-balance sm:text-[5.4rem] lg:text-[6.8rem]"
                >
                    A cleaner gravel garden in days
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="mt-5 max-w-[58ch] text-lg leading-7 text-white/82 sm:mt-6 sm:text-2xl sm:leading-9"
                >
                    Quilliams clears the mess, prepares the base, fits membrane, edging and
                    gravel, then takes the waste away. You get the price first, then most
                    small front gardens are installed in 1-3 days once booked.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.14 }}
                >
                    <WeeklyOfferCallout />
                </motion.div>

                <motion.div
                    id="hero-lead-form"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.18 }}
                    className="mt-6 w-full max-w-5xl sm:mt-8"
                >
                    <LeadForm />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.24 }}
                    className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/65"
                >
                    <span>Free site visit + fixed quote</span>
                    <span className="inline-flex items-center gap-2">
                        <StarRating />
                        Google and Facebook proof
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="size-4 text-[#55c768]" />
                        Insured and waste licensed
                    </span>
                </motion.div>
            </div>

            <div className="absolute bottom-[-1px] left-0 right-0 z-10 h-14 bg-[#eef4eb] [clip-path:polygon(0_72%,100%_18%,100%_100%,0_100%)]" />
        </section>
    );
}

function ProofSection() {
    return (
        <section className="bg-[#eef4eb] py-10 text-[#10140e] sm:py-14">
            <div className="mx-auto grid max-w-7xl gap-4 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                    <p className="text-sm font-black uppercase text-[#238845]">The offer</p>
                    <h2 className="mt-2 max-w-[12ch] text-4xl font-black leading-[0.94] sm:text-6xl">
                        10% off gravel installs.
                    </h2>
                    <p className="mt-4 max-w-[42ch] text-base font-semibold leading-7 text-[#3f4b3d]">
                        Claim a free site visit before the offer window closes. Discount applies to installation labour on confirmed gravel garden projects, with a fixed quote before work starts.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#10140e] px-3 py-2 text-sm font-black text-[#fff2b8]">
                        <CalendarClock className="size-4 text-[#ffd34d]" />
                        <WeeklyOfferCountdown />
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    {OFFER_STATS.map(([value, label]) => (
                        <div
                            key={value}
                            className="rounded-lg bg-white p-5 shadow-[0_20px_60px_-46px_rgba(16,20,14,0.72)]"
                        >
                            <p className="text-3xl font-black text-[#238845]">{value}</p>
                            <p className="mt-1 text-sm font-semibold text-[#4b5748]">{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProcessSection() {
    return (
        <section className="bg-[#fffaf1] py-12 text-[#10140e] sm:py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div>
                        <p className="text-sm font-black uppercase text-[#a75d31]">What is included</p>
                        <h2 className="mt-2 max-w-[11ch] text-4xl font-black leading-[0.94] sm:text-6xl">
                            The messy work handled.
                        </h2>
                        <p className="mt-4 max-w-[44ch] text-base leading-7 text-[#4b463d]">
                            The quote covers the work needed to turn an overgrown or tired front garden into a clean gravel finish.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {PROCESS_STEPS.map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="rounded-lg border border-[#eadfc9] bg-white p-5 shadow-[0_18px_60px_-48px_rgba(99,72,36,0.7)]"
                            >
                                <Icon className="size-6 text-[#238845]" />
                                <h3 className="mt-4 text-2xl font-black leading-tight">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-[#5b574e]">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function BeforeAfterSection() {
    return (
        <section className="bg-[#f8f7f1] py-12 text-[#10140e] sm:py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-black uppercase text-[#238845]">
                            Proof, not poetry
                        </p>
                        <h2 className="mt-2 max-w-[12ch] text-4xl font-black leading-[0.94] sm:text-6xl">
                            See the garden change.
                        </h2>
                    </div>
                    <Button
                        size="lg"
                        onClick={scrollToForm}
                        className="h-14 w-fit cursor-pointer rounded-md bg-[#55c768] px-7 text-lg font-black text-[#10140e] transition hover:scale-[1.02] hover:bg-[#72d580]"
                    >
                        Claim 10% off
                        <ArrowRight className="size-7 stroke-[3]" />
                    </Button>
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                    {PROOF_CARDS.map((item) => (
                        <article
                            key={item.title}
                            className="overflow-hidden rounded-lg bg-white shadow-[0_24px_70px_-52px_rgba(16,20,14,0.82)]"
                        >
                            <div className="grid grid-cols-2 gap-px bg-[#e4e7df]">
                                <div className="bg-white p-2">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                                        <Image
                                            src={item.before}
                                            alt={`${item.title} before`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 50vw, 390px"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs font-black uppercase text-[#a75d31]">
                                        Before
                                    </p>
                                </div>
                                <div className="bg-white p-2">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                                        <Image
                                            src={item.after}
                                            alt={`${item.title} after`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 50vw, 390px"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs font-black uppercase text-[#238845]">
                                        After
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-4 p-5">
                                <h3 className="text-2xl font-black">{item.title}</h3>
                                <CheckCircle2 className="size-6 shrink-0 text-[#238845]" />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ReviewSection() {
    return (
        <section className="bg-[#132017] py-12 text-white sm:py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-black uppercase text-[#7ee18d]">Local proof</p>
                        <h2 className="mt-2 max-w-[12ch] text-4xl font-black leading-[0.94] sm:text-6xl">
                            People call Levi back.
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-white/72">
                        <StarRating />
                        Google and Facebook reviews
                    </div>
                </div>

                <div className="mt-8 grid gap-3 lg:grid-cols-3">
                    {REVIEWS.map((review) => (
                        <figure
                            key={review.name}
                            className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_24px_80px_-56px_rgba(0,0,0,0.95)]"
                        >
                            <StarRating />
                            <blockquote className="mt-4 text-base leading-7 text-white/86">
                                &ldquo;{review.quote}&rdquo;
                            </blockquote>
                            <figcaption className="mt-5 text-sm font-black text-white">
                                {review.name}
                                <span className="font-semibold text-white/48">, {review.location}</span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQSection() {
    const [openIndex, setOpenIndex] = React.useState(0);

    return (
        <section className="bg-[#f3f3ee] py-12 text-[#10140e] sm:py-16">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div>
                    <p className="text-sm font-black uppercase text-[#238845]">
                        The boring-but-important bits
                    </p>
                    <h2 className="mt-2 max-w-[10ch] text-4xl font-black leading-[0.94] sm:text-6xl">
                        Quick answers.
                    </h2>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <Link
                            href={GOOGLE_MAPS_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-black"
                        >
                            <Star className="size-4 fill-[#d7a32a] text-[#d7a32a]" />
                            Google reviews
                        </Link>
                        <Link
                            href={FACEBOOK_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-black"
                        >
                            <Facebook className="size-4 text-[#238845]" />
                            Facebook
                        </Link>
                    </div>
                </div>

                <div className="space-y-3">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={faq.q}
                                className="rounded-lg bg-white shadow-[0_18px_60px_-42px_rgba(16,20,14,0.7)]"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-xl font-black"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown
                                        className={cn(
                                            "size-6 shrink-0 text-[#238845] transition-transform",
                                            isOpen && "rotate-180",
                                        )}
                                    />
                                </button>
                                {isOpen && (
                                    <div className="border-t border-[#e4e4dc] px-5 pb-5 pt-4">
                                        <p className="max-w-[70ch] text-base leading-7 text-[#41463d]">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function FinalCTA() {
    return (
        <section className="bg-[#132017] py-10 text-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-black uppercase text-[#7ee18d]">
                        Current offer
                    </p>
                    <h2 className="mt-1 text-4xl font-black leading-[0.94] sm:text-5xl">
                        Claim 10% off while the offer is live.
                    </h2>
                    <p className="mt-2 max-w-[44ch] text-sm font-semibold text-white/68">
                        Free site visit, fixed quote, then 10% off installation labour if the project is confirmed from this weekly offer.
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                        size="lg"
                        onClick={scrollToForm}
                        className="h-14 cursor-pointer rounded-md bg-[#55c768] px-8 text-lg font-black text-[#10140e] transition hover:scale-[1.02] hover:bg-[#72d580]"
                    >
                        Claim 10% off
                        <ArrowRight className="size-7 stroke-[3]" />
                    </Button>
                    <a
                        href={`tel:${PHONE_TEL}`}
                        onClick={() => trackPhone("gravel_offer_final")}
                        className="inline-flex h-14 items-center justify-center gap-2 rounded-md border border-white/20 px-6 text-base font-black text-white transition hover:bg-white/10"
                    >
                        <Phone className="size-5" />
                        {PHONE_DISPLAY}
                    </a>
                </div>
            </div>
        </section>
    );
}

function FooterMinimal() {
    return (
        <footer className="bg-[#132017] py-6 text-white/55">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} Quilliams Gardening and Landscaping.</p>
                <p>Newquay and nearby Cornwall areas.</p>
            </div>
        </footer>
    );
}

function StickyMobileCTA() {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        function handleScroll() {
            setVisible(window.scrollY > 760);
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            aria-hidden={!visible}
            className={cn(
                "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#132017]/96 p-3 text-white shadow-[0_-20px_60px_-36px_rgba(0,0,0,0.95)] backdrop-blur transition-transform lg:hidden",
                visible ? "translate-y-0" : "translate-y-full",
            )}
        >
            <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] gap-2">
                <Button
                    size="lg"
                    onClick={scrollToForm}
                    className="h-12 cursor-pointer rounded-md bg-[#55c768] text-base font-black text-[#10140e] hover:bg-[#72d580]"
                >
                    Claim 10% off
                    <ArrowRight className="size-5 stroke-[3]" />
                </Button>
                <a
                    href={`tel:${PHONE_TEL}`}
                    onClick={() => trackPhone("gravel_offer_sticky")}
                    className="inline-flex size-12 items-center justify-center rounded-md border border-white/18 bg-white/8 text-white"
                    aria-label={`Call ${PHONE_DISPLAY}`}
                >
                    <Phone className="size-5" />
                </a>
            </div>
        </div>
    );
}

export default function OfferClient() {
    return (
        <main className="min-h-screen bg-[#132017] pb-18 lg:pb-0">
            <HeroSection />
            <ProofSection />
            <ProcessSection />
            <BeforeAfterSection />
            <ReviewSection />
            <FAQSection />
            <FinalCTA />
            <FooterMinimal />
            <StickyMobileCTA />
        </main>
    );
}
