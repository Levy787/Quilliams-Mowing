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
};
