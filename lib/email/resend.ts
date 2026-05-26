type SendEmailParams = {
    to: string;
    from: string;
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
};

type ResendErrorResponse = {
    message?: string;
    name?: string;
};

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value || !value.trim()) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value.trim();
}

async function parseResendError(res: Response): Promise<string> {
    try {
        const body = await res.json() as ResendErrorResponse;
        return body.message || body.name || res.statusText;
    } catch {
        return res.statusText;
    }
}

export function getEmailConfig() {
    return {
        from: requireEnv("EMAIL_FROM"),
        adminTo: requireEnv("EMAIL_ADMIN_TO"),
    };
}

export async function sendEmail(params: SendEmailParams) {
    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${requireEnv("RESEND_API_KEY")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            to: params.to,
            from: params.from,
            subject: params.subject,
            html: params.html,
            text: params.text,
            ...(params.replyTo ? { reply_to: params.replyTo } : {}),
        }),
    });

    if (!res.ok) {
        const message = await parseResendError(res);
        throw new Error(`Resend email failed (${res.status}): ${message}`);
    }
}
