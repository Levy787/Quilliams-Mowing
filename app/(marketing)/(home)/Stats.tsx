import { Award, HardHat, TreePine, Trees } from "lucide-react";

const STAT_ICONS = {
    trees: Trees,
    hardHat: HardHat,
    award: Award,
    treePine: TreePine,
} as const;

type StatIconKey = keyof typeof STAT_ICONS;

export type StatsItem = {
    value: number;
    suffix?: string;
    label: string;
    icon: StatIconKey;
};

export type StatsProps = {
    items: readonly StatsItem[];
};

function StatCard({
    stat,
}: {
    stat: StatsItem;
}) {
    const Icon = STAT_ICONS[stat.icon];

    return (
        <div className="flex flex-col items-center gap-3 rounded-4xl bg-muted px-8 py-6 text-center">
            <Icon className="h-10 w-10 shrink-0 text-primary" aria-hidden="true" />
            <div className="min-w-0">
                <div className="text-4xl font-bold leading-none text-foreground">
                    {stat.value}
                    {stat.suffix ?? ""}
                </div>
                <div className="mt-1 text-base text-muted-foreground">{stat.label}</div>
            </div>
        </div>
    );
}

export function Stats({ items }: StatsProps) {
    return (
        <section className="mx-4 py-10 md:mx-8 md:py-12 lg:mx-16">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="flex flex-wrap justify-center gap-6">
                    {items.map((stat) => (
                        <StatCard key={stat.label} stat={stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
