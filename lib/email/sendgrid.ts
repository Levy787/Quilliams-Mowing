import sgMail from "@sendgrid/mail";

type SendEmailParams = {
    to: string;
    from: string;
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
};

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value || !value.trim()) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value.trim();
}

let configured = false;

function ensureConfigured() {
    if (configured) return;
    const apiKey = requireEnv("SENDGRID_API_KEY");
    sgMail.setApiKey(apiKey);
    configured = true;
}

export function getEmailConfig() {
    return {
        from: requireEnv("EMAIL_FROM"),
        adminTo: requireEnv("EMAIL_ADMIN_TO"),
    };
}

export async function sendEmail(params: SendEmailParams) {
    ensureConfigured();

    await sgMail.send({
        to: params.to,
        from: params.from,
        subject: params.subject,
        html: params.html,
        text: params.text,
        replyTo: params.replyTo,
    });
}
