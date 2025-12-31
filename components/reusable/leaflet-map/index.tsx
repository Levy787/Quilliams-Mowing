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
});

export function LeafletMap(props: Props) {
    return <LeafletaMapClient {...props} />;
}

// Backwards-compatible aliases
export const ServiceAreaMap = LeafletMap;
export const LeafletaMap = LeafletMap;
