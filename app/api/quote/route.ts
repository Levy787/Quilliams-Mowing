import { type NextRequest, NextResponse } from "next/server";

import { getEmailConfig, sendEmail } from "@/lib/email/sendgrid";
import { quoteAdminTemplate } from "@/emails/templates/quote-admin";
import { quoteUserTemplate } from "@/emails/templates/quote-user";
import {
    checkRateLimit,
    getClientIp,
    isLikelyBotByHoneypot,
} from "@/lib/api/abuse";
import { verifyTurnstileToken } from "@/lib/api/turnstile";
import { asTrimmedString, isProbablyEmail } from "@/lib/api/validate";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const ip = getClientIp(req);
        const rl = checkRateLimit({
            key: `quote:${ip}`,
            limit: 10,
            windowMs: 10 * 60 * 1000,
        });

        if (!rl.ok) {
            return NextResponse.json(
                {
                    ok: false,
                    error: "Too many requests. Please try again shortly.",
                },
                {
                    status: 429,
                    headers: { "Retry-After": String(rl.retryAfterSeconds) },
                },
            );
        }

        const body = (await req.json()) as Record<string, unknown>;

        if (isLikelyBotByHoneypot(body.company)) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        const turnstile = await verifyTurnstileToken(
            req,
            typeof body.turnstileToken === "string"
                ? body.turnstileToken
                : typeof body.token === "string"
                ? body.token
                : typeof body["cf-turnstile-response"] === "string"
                ? body["cf-turnstile-response"]
                : null,
            {
                secret: process.env.TURNSTILE_SECRET_KEY_QUOTE,
            },
        );

        if (!turnstile.ok) {
            if (process.env.NODE_ENV !== "production") {
                console.debug("/api/quote turnstile failed", {
                    error: turnstile.error,
                    errorCodes: turnstile.errorCodes,
                });
            }

            return NextResponse.json(
                {
                    ok: false,
                    error: turnstile.error,
                    ...(process.env.NODE_ENV !== "production" &&
                            turnstile.errorCodes
                        ? { turnstileErrorCodes: turnstile.errorCodes }
                        : {}),
                },
                {
                    status: turnstile.error ===
                            "Server is missing Turnstile configuration."
                        ? 500
                        : 400,
                },
            );
        }

        const name = asTrimmedString(body.name);
        const email = asTrimmedString(body.email);
        const phone = asTrimmedString(body.phone);
        const address = asTrimmedString(body.address);
        const serviceType = asTrimmedString(body.serviceType);
        const timeframe = asTrimmedString(body.timeframe);
        const budget = asTrimmedString(body.budget);
        const jobDetails = asTrimmedString(body.jobDetails);
        const calculatorSummary = asTrimmedString(body.calculatorSummary);

        if (!name || !email || !serviceType || !jobDetails) {
            return NextResponse.json(
                { ok: false, error: "Please complete all required fields." },
                { status: 400 },
            );
        }

        if (!isProbablyEmail(email)) {
            return NextResponse.json(
                { ok: false, error: "Please enter a valid email address." },
                { status: 400 },
            );
        }

        const config = getEmailConfig();

        const admin = quoteAdminTemplate({
            name,
            email,
            phone,
            address,
            serviceType,
            timeframe,
            budget,
            jobDetails,
            calculatorSummary,
        });

        await sendEmail({
            to: config.adminTo,
            from: config.from,
            subject: admin.subject,
            html: admin.html,
            text: admin.text,
            replyTo: email,
        });

        const user = quoteUserTemplate({ name });

        await sendEmail({
            to: email,
            from: config.from,
            subject: user.subject,
            html: user.html,
            text: user.text,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Unknown error";
        console.error("/api/quote failed", message);

        return NextResponse.json(
            { ok: false, error: "Something went wrong. Please try again." },
            { status: 500 },
        );
    }
}

export function GET() {
    return NextResponse.json({ ok: false, error: "Method Not Allowed" }, {
        status: 405,
    });
}
