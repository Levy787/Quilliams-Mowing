import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found | Quilliams Gardening & Landscaping",
    robots: { index: false },
};

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                404
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Page not found
            </h1>
            <p className="mt-3 max-w-md text-muted-foreground">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
                have been moved or removed.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                    href="/"
                    className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                    Go home
                </Link>
                <Link
                    href="/services"
                    className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                    View services
                </Link>
                <Link
                    href="/contact"
                    className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                    Contact us
                </Link>
            </div>
        </main>
    );
}
