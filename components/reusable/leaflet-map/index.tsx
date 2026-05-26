"use client";

import dynamic from "next/dynamic";

import type { MapElement } from "./types";

type Props = {
    center: [number, number]; // [lat, lng]
    zoom: number;
    elements?: MapElement[];
};

const LeafletaMapClient = dynamic(() => import("./LeafletMapClient"), {
    ssr: false,
    loading: () => (
        <div className="flex min-h-[360px] w-full items-center justify-center rounded-lg border bg-muted/40 text-sm text-muted-foreground">
            Loading service area map...
        </div>
    ),
});

export function LeafletMap(props: Props) {
    return <LeafletaMapClient {...props} />;
}

// Backwards-compatible aliases
export const ServiceAreaMap = LeafletMap;
export const LeafletaMap = LeafletMap;
