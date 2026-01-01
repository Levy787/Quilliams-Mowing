import type { SeoFields } from "@/lib/seo";

export type ReferralServiceOption = {
    label: string;
    value: string;
};

export type ReferralContent = {
    seo: SeoFields;
    hero: {
        eyebrow: string;
        heading: string;
        subheading: string;
    };
    offer: {
        headline: string;
        description: string;
        discountPercent: number;
        voucherLabel: string;
        terms: string;
    };
    services: ReferralServiceOption[];
    formCopy: {
        submitIdleLabel: string;
        submitLoadingLabel: string;
        privacyNote: string;
        successTitle: string;
        successMessage: string;
        voucherCodeLabel: string;
        copyCodeLabel: string;
        copiedCodeLabel: string;
    };
};
