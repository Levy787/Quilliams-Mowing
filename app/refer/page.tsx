import type { Metadata } from "next";

import ReferClient from "./refer-client";

import { getReferralContent } from "@/lib/keystatic-reader";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    const referral = await getReferralContent();

    return buildMetadata({
        seo: referral.seo,
        fallbackTitle: "Refer a Friend",
        fallbackDescription: referral.hero.subheading,
    });
}

export default async function ReferPage() {
    const content = await getReferralContent();

    return <ReferClient content={content} />;
}