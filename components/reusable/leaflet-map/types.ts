import type { PathOptions } from "leaflet";

export type CircleElement = {
    type: "circle";
    center: [number, number]; // [lat, lng]
    radius: number; // meters
    pathOptions?: PathOptions;
};

export type MapElement = CircleElement;
