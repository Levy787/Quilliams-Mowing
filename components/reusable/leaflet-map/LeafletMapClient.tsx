"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { Circle, MapContainer, TileLayer, useMap } from "react-leaflet";

import type { MapElement } from "./types";

/** Forces Leaflet to recalculate tile grid after the container is sized. */
function InvalidateSize() {
    const map = useMap();
    useEffect(() => {
        const id = setTimeout(() => map.invalidateSize(), 0);
        return () => clearTimeout(id);
    }, [map]);
    return null;
}

type Props = {
    center: [number, number]; // [lat, lng]
    zoom: number;
    elements?: MapElement[];
};

export default function LeafletMapClient({ center, zoom, elements }: Props) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            zoomControl={false}
            scrollWheelZoom={false}
            className="absolute inset-0"
            style={{ height: "100%", width: "100%" }}
        >
            <InvalidateSize />
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            {elements?.map((element, index) => {
                if (element.type === "circle") {
                    return (
                        <Circle
                             
                            key={`circle-${index}`}
                            center={element.center}
                            radius={element.radius}
                            pathOptions={element.pathOptions}
                        />
                    );
                }

                return null;
            })}
        </MapContainer>
    );
}
