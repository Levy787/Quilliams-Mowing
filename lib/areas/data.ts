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
};
