export type Area = {
    name: string;
    county: string;
    description: string;
    services: string[];
    nearby: string[];
};

export const areas: Record<string, Area> = {};
