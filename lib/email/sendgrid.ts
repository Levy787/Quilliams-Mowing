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

    const port = Number(process.env.SMTP_PORT ?? "587");

    transporter = nodemailer.createTransport({
        host: requireEnv("SMTP_HOST"),
        port,
        secure: port === 465,
        auth: {
            user: requireEnv("SMTP_USER"),
            pass: requireEnv("SMTP_PASS"),
        },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
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
