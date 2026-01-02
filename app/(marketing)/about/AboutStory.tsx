import { Leaf, ShieldCheck, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export type AboutStoryProps = {
    badge: string;
    title: string;
    paragraphs: ReadonlyArray<string>;
    highlights: ReadonlyArray<{
        title: string;
        description: string;
        icon: "Leaf" | "Sparkles" | "ShieldCheck";
    }>;
    expect: {
        title: string;
        items: ReadonlyArray<{ strong: string; text: string }>;
    };
    goal: {
        title: string;
        description: string;
    };
    image?: {
        imageFile?: string | null;
        imageSrc?: string | null;
        imageAlt?: string | null;
    };
};

const highlightIconMap = {
    Leaf,
    Sparkles,
    ShieldCheck,
} as const;

export function AboutStory(props: AboutStoryProps) {
    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8">
                    <Card className="rounded-4xl border-border shadow-none">
                        <CardContent className="px-6">
                            <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                {props.badge}
                            </div>
                            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                {props.title}
                            </h2>
                            {props.paragraphs.map((paragraph) => (
                                <p
                                    key={paragraph}
                                    className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground"
                                >
                                    {paragraph}
                                </p>
                            ))}

                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {props.highlights.map((highlight) => {
                                    const Icon = highlightIconMap[highlight.icon];
                                    return (
                                        <div
                                            key={highlight.title}
                                            className="rounded-3xl border border-border bg-muted/30 p-5"
                                        >
                                            <Icon className="h-5 w-5 text-primary" aria-hidden />
                                            <div className="mt-3 text-sm font-semibold text-foreground">
                                                {highlight.title}
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {highlight.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-4xl border-border shadow-none overflow-hidden">
                        <CardContent className="px-6">
                            <div className="text-xl font-semibold text-foreground">
                                {props.expect.title}
                            </div>
                            <ul className="mt-4 space-y-3 text-sm md:text-base text-muted-foreground">
                                {props.expect.items.map((item) => (
                                    <li key={item.strong}>
                                        <span className="font-semibold text-foreground">{item.strong}</span>{" "}
                                        {item.text}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 rounded-3xl border border-border bg-muted/30 p-5">
                                <div className="text-sm font-semibold text-foreground">
                                    {props.goal.title}
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {props.goal.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
