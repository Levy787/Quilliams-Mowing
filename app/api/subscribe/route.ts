import { type NextRequest, NextResponse } from "next/server";

import { getEmailConfig, sendEmail } from "@/lib/email/sendgrid";
import { subscribeAdminTemplate } from "@/emails/templates/subscribe-admin";
import { subscribeUserTemplate } from "@/emails/templates/subscribe-user";
import {
    checkRateLimit,
    getClientIp,
    isLikelyBotByHoneypot,
} from "@/lib/api/abuse";
import { asTrimmedString, isProbablyEmail } from "@/lib/api/validate";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const ip = getClientIp(req);
        const rl = checkRateLimit({
            key: `subscribe:${ip}`,
            limit: 15,
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

        const email = asTrimmedString(body.email);

        if (!email) {
            return NextResponse.json(
                { ok: false, error: "Please enter your email address." },
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

        const admin = subscribeAdminTemplate({ email });
        await sendEmail({
            to: config.adminTo,
            from: config.from,
            subject: admin.subject,
            html: admin.html,
            text: admin.text,
            replyTo: email,
        });

        const user = subscribeUserTemplate({ email });
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
        console.error("/api/subscribe failed", message);

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
