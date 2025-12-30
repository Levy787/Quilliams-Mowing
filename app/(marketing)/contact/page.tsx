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

const SERVICES = [
    "Landscaping",
    "Lawn Care",
    "Garden Maintenance",
    "Hedge Trimming",
    "Seasonal Cleanup",
    "Other"
] as const;

export default function ContactPage() {
    const [service, setService] = React.useState<string | undefined>(undefined);
    const [submitted, setSubmitted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsSubmitting(true);
        setSubmitted(false);

        // MVP: no backend. Simulate a brief submit.
        window.setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            toast.success("Message sent! We'll get back to you soon.");
            event.currentTarget.reset();
            setService(undefined);
        }, 350);
    }

    return (
        <main>
            <section className="mx-4 md:mx-8 lg:mx-16 py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-12">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                            Contact
                        </div>

                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            Contact Us
                        </h1>

                        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
                            Have a question or want to book a free consultation? Send us a message and we’ll reply as soon as possible.
                        </p>
                    </div>

                    {/* Main grid */}
                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {/* Contact details */}
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-xl font-semibold text-foreground">Get in touch</div>
                                        <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                            Prefer to reach out directly? Call or email and we’ll help you plan the next steps.
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="flex items-start gap-3">
                                            <Phone className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-foreground">Phone</div>
                                                <Link
                                                    href="tel:+15551234567"
                                                    className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
                                                >
                                                    +1 (555) 123-4567
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Mail className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-foreground">Email</div>
                                                <Link
                                                    href="mailto:hello@quilliamsgardening.com"
                                                    className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
                                                >
                                                    hello@quilliamsgardening.com
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Clock className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-foreground">Hours</div>
                                                <div className="mt-1 text-sm text-muted-foreground">
                                                    Mon–Fri: 8am–6pm
                                                    <br />
                                                    Sat: 9am–2pm
                                                    <br />
                                                    Sun: Closed
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <MapPin className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-foreground">Service area</div>
                                                <div className="mt-1 text-sm text-muted-foreground">
                                                    Serving your local area and surrounding suburbs.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Form */}
                        <Card className="rounded-4xl border-border shadow-none">
                            <CardContent className="px-6">
                                <div>
                                    <div className="text-xl font-semibold text-foreground">Send a message</div>
                                    <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                                        Tell us a bit about what you need and we’ll get back to you.
                                    </p>
                                </div>

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
                                            <Label>Service interested in</Label>
                                            <Select value={service} onValueChange={setService}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a service" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {SERVICES.map((item) => (
                                                        <SelectItem key={item} value={item}>
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            required
                                            placeholder="Tell us about your property and what you’d like help with."
                                        />
                                    </div>

                                    {submitted && (
                                        <p className="text-sm text-primary">
                                            Thanks — your message has been sent.
                                        </p>
                                    )}

                                    <div className="pt-1">
                                        <Button type="submit" size="lg" disabled={isSubmitting}>
                                            {isSubmitting ? "Sending…" : "Send Message"}
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
                                    <iframe
                                        title="Map"
                                        className="absolute inset-0 h-full w-full"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src="https://www.openstreetmap.org/export/embed.html?bbox=-0.134%2C51.503%2C-0.114%2C51.513&layer=mapnik"
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

