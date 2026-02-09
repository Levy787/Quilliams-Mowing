import nodemailer from "nodemailer";

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

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
    if (transporter) return transporter;

    transporter = nodemailer.createTransport({
        host: requireEnv("SMTP_HOST"),
        port: Number(process.env.SMTP_PORT ?? "465"),
        secure: true,
        auth: {
            user: requireEnv("SMTP_USER"),
            pass: requireEnv("SMTP_PASS"),
        },
    });

    return transporter;
}

export function getEmailConfig() {
    return {
        from: requireEnv("EMAIL_FROM"),
        adminTo: requireEnv("EMAIL_ADMIN_TO"),
    };
}

export async function sendEmail(params: SendEmailParams) {
    const transport = getTransporter();

    await transport.sendMail({
        to: params.to,
        from: params.from,
        subject: params.subject,
        html: params.html,
        text: params.text,
        replyTo: params.replyTo,
    });
}
