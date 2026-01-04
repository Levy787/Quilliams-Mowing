"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import * as React from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchResult = {
    title: string;
    href: string;
    type: "page" | "service" | "project" | "offer";
    snippet?: string;
};

function useDebouncedValue<T>(value: T, delayMs: number) {
    const [debounced, setDebounced] = React.useState(value);

    React.useEffect(() => {
        const handle = window.setTimeout(() => setDebounced(value), delayMs);
        return () => window.clearTimeout(handle);
    }, [value, delayMs]);

    return debounced;
}

export function NavbarSearch({ className }: { className?: string }) {
    const router = useRouter();

    const [query, setQuery] = React.useState("");
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [activeIndex, setActiveIndex] = React.useState<number>(-1);
    const [loading, setLoading] = React.useState(false);

    const triggerButtonRef = React.useRef<HTMLButtonElement | null>(null);

    const debouncedQuery = useDebouncedValue(query, 200);

    const [results, setResults] = React.useState<ReadonlyArray<SearchResult>>(
        []
    );

    React.useEffect(() => {
        if (!dialogOpen) return;

        const trimmed = debouncedQuery.trim();
        if (!trimmed) {
            setResults([]);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);

        fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
            signal: controller.signal,
        })
            .then(async (res) => {
                if (!res.ok) throw new Error("Search request failed");
                return (await res.json()) as { results: SearchResult[] };
            })
            .then((data) => {
                setResults(Array.isArray(data.results) ? data.results : []);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setResults([]);
                setLoading(false);
            });

        return () => controller.abort();
    }, [debouncedQuery, dialogOpen]);

    React.useEffect(() => {
        if (!dialogOpen) return;

        // Show a lightweight loading state while debounce is pending.
        if (query.trim().length === 0) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const handle = window.setTimeout(() => setLoading(false), 200);
        return () => window.clearTimeout(handle);
    }, [dialogOpen, query]);

    React.useEffect(() => {
        // Reset active selection whenever results change.
        setActiveIndex(results.length ? 0 : -1);
    }, [results]);

    function collapseIfEmpty() {
        if (query.trim().length === 0) setDialogOpen(false);
    }

    function openFromIconClick() {
        setDialogOpen(true);
    }

    function closeDialog() {
        setDialogOpen(false);
        setQuery("");
        setActiveIndex(-1);
        setLoading(false);
        window.setTimeout(() => triggerButtonRef.current?.focus(), 0);
    }

    function onResultSelect(href: string) {
        setDialogOpen(false);
        setQuery("");
        setActiveIndex(-1);
        router.push(href);
    }

    function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Escape") {
            e.preventDefault();
            closeDialog();
            return;
        }

        if (e.key === "ArrowDown") {
            if (!results.length) return;
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, results.length - 1));
            return;
        }

        if (e.key === "ArrowUp") {
            if (!results.length) return;
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
            return;
        }

        if (e.key === "Enter") {
            if (!results.length) return;
            e.preventDefault();
            const index = activeIndex >= 0 ? activeIndex : 0;
            onResultSelect(results[index].href);
        }
    }

    return (
        <div className={cn("flex items-center", className)}>
            <button
                ref={triggerButtonRef}
                type="button"
                className={cn(
                    "h-10 w-10 inline-flex items-center justify-center rounded-md",
                    "text-muted-foreground hover:text-primary transition-colors motion-reduce:transition-none",
                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                )}
                aria-label="Search"
                onClick={openFromIconClick}
            >
                <Search className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Results modal */}
            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) {
                        setQuery("");
                        setActiveIndex(-1);
                        setLoading(false);
                        window.setTimeout(() => triggerButtonRef.current?.focus(), 0);
                    }
                }}
            >
                <DialogContent
                    showCloseButton={false}
                    className={cn(
                        "p-0 sm:max-w-lg",
                        "bg-transparent border-0 shadow-none",
                        "motion-reduce:transition-none motion-reduce:animate-none"
                    )}
                >
                    <DialogHeader className="sr-only">
                        <DialogTitle>Search</DialogTitle>
                        <DialogDescription>
                            Search the site and navigate to results.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="bg-popover text-popover-foreground border rounded-xl shadow">
                        <div className="flex items-center gap-3 border-b p-4">
                            <div className="relative flex-1">
                                <Search
                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                    aria-hidden="true"
                                />
                                <Input
                                    autoFocus
                                    value={query}
                                    onChange={(e) => {
                                        const next = e.target.value;
                                        setQuery(next);
                                    }}
                                    onKeyDown={onInputKeyDown}
                                    placeholder="Search..."
                                    aria-label="Search"
                                    aria-activedescendant={
                                        activeIndex >= 0 && results[activeIndex]
                                            ? `navbar-search-result-${activeIndex}`
                                            : undefined
                                    }
                                    className={cn(
                                        "h-10 pl-9",
                                        "bg-background border-border text-foreground placeholder:text-muted-foreground"
                                    )}
                                />
                            </div>

                            <button
                                type="button"
                                className={cn(
                                    "inline-flex h-9 w-9 items-center justify-center rounded-md",
                                    "text-muted-foreground hover:text-foreground transition-colors motion-reduce:transition-none",
                                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                                )}
                                aria-label="Close search"
                                onClick={closeDialog}
                            >
                                <X className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="px-4 pb-2 pt-3 text-sm text-muted-foreground">
                            {query.trim().length === 0
                                ? "Type to search pages."
                                : loading
                                    ? "Searching…"
                                    : `${results.length} result${results.length === 1 ? "" : "s"}`}
                        </div>

                        <div className="max-h-[50vh] overflow-auto p-2">
                            {query.trim().length > 0 && loading ? (
                                <div className="p-3 text-sm text-muted-foreground">Loading…</div>
                            ) : query.trim().length > 0 && results.length === 0 ? (
                                <div className="p-3 text-sm text-muted-foreground">No results found.</div>
                            ) : query.trim().length === 0 ? null : (
                                <ul
                                    className="flex flex-col"
                                    role="listbox"
                                    aria-label="Search results"
                                >
                                    {results.map((r, idx) => {
                                        const isActive = idx === activeIndex;
                                        return (
                                            <li key={r.href} role="option" aria-selected={isActive}>
                                                <Link
                                                    id={`navbar-search-result-${idx}`}
                                                    href={r.href}
                                                    className={cn(
                                                        "block rounded-lg px-3 py-2 text-sm",
                                                        "focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                                                        isActive
                                                            ? "bg-accent text-accent-foreground"
                                                            : "hover:bg-accent hover:text-accent-foreground"
                                                    )}
                                                    onMouseEnter={() => setActiveIndex(idx)}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        onResultSelect(r.href);
                                                    }}
                                                >
                                                    <div className="flex items-baseline justify-between gap-3">
                                                        <span className="font-medium">{r.title}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {r.type}
                                                        </span>
                                                    </div>
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        {r.snippet ? r.snippet : r.href}
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
