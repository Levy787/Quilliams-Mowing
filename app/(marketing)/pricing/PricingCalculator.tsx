"use client";

import * as React from "react";
import Link from "next/link";
import { Calculator, CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type JobType = "cleanup" | "maintenance" | "lawn" | "landscaping";
type YardSize = "small" | "medium" | "large";
type Condition = "light" | "medium" | "heavy";
type Access = "easy" | "normal" | "difficult";
type Frequency = "one-off" | "fortnightly" | "monthly";

type CalcState = {
    jobType: JobType;
    yardSize: YardSize;
    condition: Condition;
    access: Access;
    greenWaste: boolean;
    pruning: boolean;
    hedgeTrim: boolean;
    frequency: Frequency;
};

type Estimate = {
    low: number;
    high: number;
    drivers: string[];
};

type CalculatorConfig = {
    base: Record<JobType, number>;
    sizeMultiplier: Record<YardSize, number>;
    conditionMultiplier: Record<Condition, number>;
    accessMultiplier: Record<Access, number>;
    addon: {
        greenWaste: number;
        pruning: number;
        hedgeTrim: number;
    };
    rangePct: number;
    roundTo: number;
};

function roundTo(value: number, multiple: number) {
    return Math.max(multiple, Math.round(value / multiple) * multiple);
}

function buildEstimate(state: CalcState, config: CalculatorConfig): Estimate {
    const base = config.base[state.jobType];
    const size = config.sizeMultiplier[state.yardSize];
    const condition = config.conditionMultiplier[state.condition];
    const access = config.accessMultiplier[state.access];

    let subtotal = base * size * condition * access;

    const drivers: string[] = [];
    drivers.push(`Job: ${state.jobType}`);
    drivers.push(`Size: ${state.yardSize}`);
    drivers.push(`Condition: ${state.condition}`);
    drivers.push(`Access: ${state.access}`);

    if (state.greenWaste) {
        subtotal += config.addon.greenWaste;
        drivers.push("Green waste");
    }
    if (state.pruning) {
        subtotal += config.addon.pruning;
        drivers.push("Pruning");
    }
    if (state.hedgeTrim) {
        subtotal += config.addon.hedgeTrim;
        drivers.push("Hedge trim");
    }

    if (state.jobType === "maintenance") {
        if (state.frequency === "fortnightly") {
            subtotal *= 0.9;
            drivers.push("Frequency: fortnightly");
        } else if (state.frequency === "monthly") {
            subtotal *= 0.95;
            drivers.push("Frequency: monthly");
        } else {
            drivers.push("Frequency: one-off");
        }
    }

    const lowRaw = subtotal * (1 - config.rangePct);
    const highRaw = subtotal * (1 + config.rangePct);

    return {
        low: roundTo(lowRaw, config.roundTo),
        high: roundTo(highRaw, config.roundTo),
        drivers,
    };
}

function formatCurrency(amount: number) {
    return `£${amount.toLocaleString()}`;
}

function buildQuoteQuery(state: CalcState, estimate: Estimate) {
    const params = new URLSearchParams();
    params.set("jobType", state.jobType);
    params.set("yardSize", state.yardSize);
    params.set("condition", state.condition);
    params.set("access", state.access);
    params.set("greenWaste", state.greenWaste ? "1" : "0");
    params.set("pruning", state.pruning ? "1" : "0");
    params.set("hedgeTrim", state.hedgeTrim ? "1" : "0");
    params.set("frequency", state.frequency);
    params.set("estimateLow", String(estimate.low));
    params.set("estimateHigh", String(estimate.high));
    return params.toString();
}

export type PricingCalculatorProps = {
    badge: string;
    heading: string;
    description: string;

    addonSectionTitle: string;
    greenWasteTitle: string;
    greenWasteDescription: string;
    pruningTitle: string;
    pruningDescription: string;
    hedgeTrimTitle: string;
    hedgeTrimDescription: string;

    estimatedRangeLabel: string;
    estimatedRangeNote: string;
    includesTitle: string;
    sendTitle: string;
    sendDescription: string;
    sendPrimaryCtaLabel: string;
    sendSecondaryCtaLabel: string;
    sendSecondaryCtaHref: string;
    disclaimer: string;

    defaults: {
        jobType: JobType;
        yardSize: YardSize;
        condition: Condition;
        access: Access;
        greenWaste: boolean;
        pruning: boolean;
        hedgeTrim: boolean;
        frequency: Frequency;
    };

    config: {
        baseCleanup: number;
        baseMaintenance: number;
        baseLawn: number;
        baseLandscaping: number;
        sizeSmall: number;
        sizeMedium: number;
        sizeLarge: number;
        conditionLight: number;
        conditionMedium: number;
        conditionHeavy: number;
        accessEasy: number;
        accessNormal: number;
        accessDifficult: number;
        addonGreenWaste: number;
        addonPruning: number;
        addonHedgeTrim: number;
        rangePct: number;
        roundTo: number;
    };
};

export function PricingCalculator(props: PricingCalculatorProps) {
    const { defaults } = props;

    const calculatorConfig: CalculatorConfig = React.useMemo(
        () => ({
            base: {
                cleanup: props.config.baseCleanup,
                maintenance: props.config.baseMaintenance,
                lawn: props.config.baseLawn,
                landscaping: props.config.baseLandscaping,
            },
            sizeMultiplier: {
                small: props.config.sizeSmall,
                medium: props.config.sizeMedium,
                large: props.config.sizeLarge,
            },
            conditionMultiplier: {
                light: props.config.conditionLight,
                medium: props.config.conditionMedium,
                heavy: props.config.conditionHeavy,
            },
            accessMultiplier: {
                easy: props.config.accessEasy,
                normal: props.config.accessNormal,
                difficult: props.config.accessDifficult,
            },
            addon: {
                greenWaste: props.config.addonGreenWaste,
                pruning: props.config.addonPruning,
                hedgeTrim: props.config.addonHedgeTrim,
            },
            rangePct: props.config.rangePct,
            roundTo: props.config.roundTo,
        }),
        [props.config],
    );

    const [state, setState] = React.useState<CalcState>(() => ({
        jobType: defaults.jobType,
        yardSize: defaults.yardSize,
        condition: defaults.condition,
        access: defaults.access,
        greenWaste: defaults.greenWaste,
        pruning: defaults.pruning,
        hedgeTrim: defaults.hedgeTrim,
        frequency: defaults.frequency,
    }));

    const estimate = React.useMemo(
        () => buildEstimate(state, calculatorConfig),
        [state, calculatorConfig]
    );
    const quoteQuery = React.useMemo(
        () => buildQuoteQuery(state, estimate),
        [state, estimate]
    );

    return (
        <section className="mx-4 md:mx-8 lg:mx-16 py-10 md:py-12">
            <div className="container mx-auto px-4 lg:px-12">
                <Card className="rounded-4xl border-border shadow-none overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                            {/* Controls */}
                            <div className="p-6 md:p-10">
                                <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                                    {props.badge}
                                </div>
                                <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                    {props.heading}
                                </h2>
                                <p className="mt-3 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                                    {props.description}
                                </p>

                                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Job type</Label>
                                        <Select
                                            value={state.jobType}
                                            onValueChange={(value) =>
                                                setState((prev) => ({
                                                    ...prev,
                                                    jobType: value as JobType,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Choose" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cleanup">Cleanup</SelectItem>
                                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                                <SelectItem value="lawn">Lawn care</SelectItem>
                                                <SelectItem value="landscaping">Landscaping</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Yard size</Label>
                                        <Select
                                            value={state.yardSize}
                                            onValueChange={(value) =>
                                                setState((prev) => ({
                                                    ...prev,
                                                    yardSize: value as YardSize,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Choose" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="small">Small</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="large">Large</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Current condition</Label>
                                        <Select
                                            value={state.condition}
                                            onValueChange={(value) =>
                                                setState((prev) => ({
                                                    ...prev,
                                                    condition: value as Condition,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Choose" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="heavy">Heavy</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Access difficulty</Label>
                                        <Select
                                            value={state.access}
                                            onValueChange={(value) =>
                                                setState((prev) => ({
                                                    ...prev,
                                                    access: value as Access,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Choose" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="easy">Easy</SelectItem>
                                                <SelectItem value="normal">Normal</SelectItem>
                                                <SelectItem value="difficult">Difficult</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-4xl border border-border bg-muted/25 p-5">
                                    <div className="text-sm font-semibold text-foreground">
                                        {props.addonSectionTitle}
                                    </div>
                                    <div className="mt-4 grid gap-3">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <div className="text-sm font-medium text-foreground">
                                                    {props.greenWasteTitle}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {props.greenWasteDescription}
                                                </div>
                                            </div>
                                            <Switch
                                                checked={state.greenWaste}
                                                onCheckedChange={(checked) =>
                                                    setState((prev) => ({
                                                        ...prev,
                                                        greenWaste: checked,
                                                    }))
                                                }
                                            />
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <div className="text-sm font-medium text-foreground">
                                                    {props.pruningTitle}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {props.pruningDescription}
                                                </div>
                                            </div>
                                            <Switch
                                                checked={state.pruning}
                                                onCheckedChange={(checked) =>
                                                    setState((prev) => ({
                                                        ...prev,
                                                        pruning: checked,
                                                    }))
                                                }
                                            />
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <div className="text-sm font-medium text-foreground">
                                                    {props.hedgeTrimTitle}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {props.hedgeTrimDescription}
                                                </div>
                                            </div>
                                            <Switch
                                                checked={state.hedgeTrim}
                                                onCheckedChange={(checked) =>
                                                    setState((prev) => ({
                                                        ...prev,
                                                        hedgeTrim: checked,
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {state.jobType === "maintenance" && (
                                    <div className="mt-6 space-y-2">
                                        <Label>Maintenance frequency</Label>
                                        <Select
                                            value={state.frequency}
                                            onValueChange={(value) =>
                                                setState((prev) => ({
                                                    ...prev,
                                                    frequency: value as Frequency,
                                                }))
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Choose" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="one-off">One-off</SelectItem>
                                                <SelectItem value="fortnightly">Fortnightly</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>

                            {/* Output */}
                            <div className="relative overflow-hidden border-t border-border lg:border-t-0 lg:border-l">
                                <div className="p-6 md:p-10">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calculator className="h-4 w-4 text-primary" aria-hidden />
                                        {props.estimatedRangeLabel}
                                    </div>

                                    <div className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                                        {formatCurrency(estimate.low)}–{formatCurrency(estimate.high)}
                                    </div>

                                    <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                                        {props.estimatedRangeNote}
                                    </p>

                                    <div className="mt-6">
                                        <div className="text-sm font-semibold text-foreground">
                                            {props.includesTitle}
                                        </div>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {estimate.drivers.slice(0, 7).map((driver) => (
                                                <span
                                                    key={driver}
                                                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                                                >
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden />
                                                    {driver}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8 rounded-4xl border border-border bg-muted/25 p-5">
                                        <div className="text-sm font-semibold text-foreground">
                                            {props.sendTitle}
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {props.sendDescription}
                                        </p>

                                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                                            <Button asChild size="lg">
                                                <Link href={`/quote?${quoteQuery}`}>
                                                    <Send className="h-5 w-5" aria-hidden />
                                                    {props.sendPrimaryCtaLabel}
                                                </Link>
                                            </Button>
                                            <Button asChild size="lg" variant="outline">
                                                <Link href={props.sendSecondaryCtaHref}>{props.sendSecondaryCtaLabel}</Link>
                                            </Button>
                                        </div>

                                        <p className="mt-4 text-xs text-muted-foreground">
                                            {props.disclaimer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
