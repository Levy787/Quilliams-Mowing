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
        <div className="flex items-center justify-center gap-4 px-6 py-5 text-left">
            <Icon className="h-9 w-9 shrink-0 text-primary" aria-hidden="true" />
            <div className="min-w-0">
                <div className="text-3xl font-bold leading-none text-foreground">
                    {stat.value}
                    {stat.suffix ?? ""}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
        </div>
    );
}

export function Stats({ items }: StatsProps) {
    return (
        <section className="mx-4 pb-4 pt-8 md:mx-8 md:pb-6 md:pt-10 lg:mx-16">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="mx-auto grid max-w-5xl divide-y divide-border overflow-hidden rounded-3xl border border-border bg-muted/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {items.map((stat) => (
                        <StatCard key={stat.label} stat={stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
