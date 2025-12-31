import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getHomeContent() {
    return reader.singletons.home.readOrThrow();
}

export type HomeContent = Awaited<ReturnType<typeof getHomeContent>>;

export async function getPricingContent() {
    return reader.singletons.pricing.readOrThrow();
}

export type PricingContent = Awaited<ReturnType<typeof getPricingContent>>;
