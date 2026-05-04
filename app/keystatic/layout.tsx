import type { Metadata } from "next";
import { notFound } from "next/navigation";

import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
    title: "Keystatic",
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
};

export default function Layout() {
    if (process.env.NODE_ENV !== "development") {
        notFound();
    }

    return <KeystaticApp />;
}
