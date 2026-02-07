export type Area = {
    name: string;
    county: string;
    description: string;
    services: string[];
    nearby: string[];
};

export const areas: Record<string, Area> = {
    "truro": {
        name: "Truro",
        county: "Cornwall",
        description: "Professional gardening and landscaping services in Truro. As Cornwall's capital city, Truro has many beautiful gardens that deserve expert care. We provide regular maintenance, hedge trimming, lawn care, and landscaping throughout Truro and surrounding areas.",
        services: ["lawn-care", "hedge-trimming", "garden-maintenance", "landscaping"],
        nearby: ["newquay", "st-austell", "perranporth"],
    },
    "st-austell": {
        name: "St Austell",
        county: "Cornwall",
        description: "Reliable gardening services in St Austell and the surrounding areas. From regular lawn mowing to complete garden transformations, we help St Austell residents keep their outdoor spaces looking their best all year round.",
        services: ["lawn-care", "hedge-trimming", "garden-maintenance", "landscaping", "seasonal-cleanup"],
        nearby: ["truro", "bodmin", "newquay"],
    },
    "bodmin": {
        name: "Bodmin",
        county: "Cornwall",
        description: "Expert garden care in Bodmin, Cornwall. Whether you need regular maintenance or a one-off garden clearance, we provide professional, reliable service to Bodmin residents. Fully equipped for all garden sizes.",
        services: ["lawn-care", "hedge-trimming", "garden-maintenance", "seasonal-cleanup"],
        nearby: ["newquay", "truro", "padstow"],
    },
    "padstow": {
        name: "Padstow",
        county: "Cornwall",
        description: "Garden services in Padstow and the North Cornwall coast. We help holiday home owners and residents alike maintain beautiful gardens. Regular visits or seasonal maintenance available.",
        services: ["lawn-care", "hedge-trimming", "garden-maintenance", "landscaping"],
        nearby: ["newquay", "bodmin", "wadebridge"],
    },
    "perranporth": {
        name: "Perranporth",
        county: "Cornwall",
        description: "Local gardening services in Perranporth. Just a short drive from our Newquay base, we provide regular garden maintenance, lawn care, and landscaping to Perranporth properties.",
        services: ["lawn-care", "hedge-trimming", "garden-maintenance"],
        nearby: ["newquay", "truro", "st-agnes"],
    },
    "st-ives": {
        name: "St Ives",
        county: "Cornwall",
        description: "Professional gardening in St Ives, Cornwall. From compact town gardens to larger coastal properties, we offer tailored garden care. Lawn mowing, hedge cutting, planting, and full maintenance packages.",
        services: ["lawn-care", "hedge-trimming", "garden-maintenance", "landscaping"],
        nearby: ["penzance", "hayle", "newquay"],
    },
};
