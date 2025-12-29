"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import * as React from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PAGES = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
    { title: "Quote", href: "/quote" },
    { title: "Appointment", href: "/appointment" },
] as const;

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

    const [expanded, setExpanded] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [activeIndex, setActiveIndex] = React.useState<number>(-1);
    const [loading, setLoading] = React.useState(false);

    const navbarInputRef = React.useRef<HTMLInputElement | null>(null);
    const dialogInputRef = React.useRef<HTMLInputElement | null>(null);

    const debouncedQuery = useDebouncedValue(query, 200);

    const results = React.useMemo(() => {
        const trimmed = debouncedQuery.trim();
        if (!trimmed) return [];

        const q = trimmed.toLowerCase();
        return PAGES.filter((p) => p.title.toLowerCase().includes(q));
    }, [debouncedQuery]);

    React.useEffect(() => {
        if (!expanded) {
            setDialogOpen(false);
            setQuery("");
            setActiveIndex(-1);
            setLoading(false);
        }
    }, [expanded]);

    React.useEffect(() => {
        if (!expanded) return;

        // Show a lightweight loading state while debounce is pending.
        if (query.trim().length === 0) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const handle = window.setTimeout(() => setLoading(false), 200);
        return () => window.clearTimeout(handle);
    }, [expanded, query]);

    React.useEffect(() => {
        // Reset active selection whenever results change.
        setActiveIndex(results.length ? 0 : -1);
    }, [results]);

    function collapseIfEmpty() {
        if (query.trim().length === 0) {
            setExpanded(false);
            setDialogOpen(false);
        }
    }

    function openFromIconClick() {
        setExpanded(true);
        setDialogOpen(true);
        // Focus happens in the dialog input via autoFocus.
    }

    function closeDialog() {
        setDialogOpen(false);
        collapseIfEmpty();
        // If we still have text, return focus to the navbar input.
        if (query.trim().length > 0) {
            window.setTimeout(() => navbarInputRef.current?.focus(), 0);
        }
    }

    function onResultSelect(href: string) {
        setDialogOpen(false);
        setExpanded(false);
        setQuery("");
        setActiveIndex(-1);
        router.push(href);
    }

    function onInputKeyDown(
        e: React.KeyboardEvent<HTMLInputElement>,
        opts: { inDialog: boolean }
    ) {
        if (e.key === "Escape") {
            e.preventDefault();
            if (dialogOpen) {
                setDialogOpen(false);
                if (query.trim().length === 0) {
                    setExpanded(false);
                } else {
                    if (opts.inDialog) {
                        window.setTimeout(() => navbarInputRef.current?.focus(), 0);
                    }
                }
            } else {
                collapseIfEmpty();
            }
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

    const controlWidthClass = expanded
        ? "w-56 sm:w-64"
        : "w-10";

    const controlBaseClass = cn(
        "relative overflow-hidden",
        "transition-[width] duration-200 ease-out motion-reduce:transition-none",
        controlWidthClass
    );

    return (
        <div className={cn("flex items-center", className)}>
            {/* Navbar control (icon or inline input when dialog is closed) */}
            <div className={controlBaseClass}>
                {!expanded ? (
                    <button
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
                ) : (
                    <div
                        className={cn(
                            "h-10 w-full",
                            // When dialog is open we keep space to prevent layout jump,
                            // but the real, focus-trapped input is rendered inside the dialog.
                            dialogOpen && "pointer-events-none opacity-0"
                        )}
                    >
                        <Input
                            ref={navbarInputRef}
                            value={query}
                            onChange={(e) => {
                                const next = e.target.value;
                                setQuery(next);
                                if (next.trim().length > 0) setDialogOpen(true);
                            }}
                            onFocus={() => setDialogOpen(true)}
                            onBlur={() => {
                                if (!dialogOpen) collapseIfEmpty();
                            }}
                            onKeyDown={(e) => onInputKeyDown(e, { inDialog: false })}
                            placeholder="Search..."
                            aria-label="Search"
                            className={cn(
                                "h-10",
                                "bg-background border-border text-foreground placeholder:text-muted-foreground"
                            )}
                        />
                    </div>
                )}
            </div>

            {/* Results modal */}
            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) {
                        // If we closed via overlay / close button and there is text, keep the inline input open.
                        // If empty, collapse back to the icon.
                        if (query.trim().length === 0) setExpanded(false);
                        window.setTimeout(() => navbarInputRef.current?.focus(), 0);
                    }
                }}
            >
                <DialogContent
                    showCloseButton={false}
                    className={cn(
                        // Full-screen focus trap container + overlay is handled by the Dialog component.
                        "left-0 top-0 translate-x-0 translate-y-0",
                        "h-dvh w-dvw max-w-none",
                        "p-0",
                        "pointer-events-none",
                        "bg-transparent border-0 shadow-none",
                        "motion-reduce:transition-none motion-reduce:animate-none"
                    )}
                >
                    {/* Overlay top bar (keeps search input in the navbar area) */}
                    <div className="pointer-events-auto fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
                        <div className="container mx-auto px-4 lg:px-12">
                            <div className="flex h-20 lg:h-24 items-center justify-end">
                                <div className={controlBaseClass}>
                                    <Input
                                        ref={dialogInputRef}
                                        autoFocus
                                        value={query}
                                        onChange={(e) => {
                                            const next = e.target.value;
                                            setQuery(next);
                                        }}
                                        onKeyDown={(e) => onInputKeyDown(e, { inDialog: true })}
                                        placeholder="Search..."
                                        aria-label="Search"
                                        aria-activedescendant={
                                            activeIndex >= 0 && results[activeIndex]
                                                ? `navbar-search-result-${activeIndex}`
                                                : undefined
                                        }
                                        className={cn(
                                            "h-10",
                                            "bg-background border-border text-foreground placeholder:text-muted-foreground"
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Centered results panel */}
                    <div className="pointer-events-auto h-dvh w-dvw">
                        <div className="mx-auto flex h-full w-full max-w-lg flex-col justify-center px-4">
                            <div className="bg-popover text-popover-foreground border rounded-xl shadow">
                                <div className="flex items-start justify-between gap-4 border-b p-4">
                                    <DialogHeader className="gap-1">
                                        <DialogTitle className="text-base">
                                            Results for: <span className="font-semibold">{query || "…"}</span>
                                        </DialogTitle>
                                        <p className="text-sm text-muted-foreground">
                                            {query.trim().length === 0
                                                ? ""
                                                : loading
                                                    ? "Searching…"
                                                    : `${results.length} result${results.length === 1 ? "" : "s"}`}
                                        </p>
                                    </DialogHeader>

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

                                <div className="max-h-[50vh] overflow-auto p-2">
                                    {query.trim().length > 0 && loading ? (
                                        <div className="p-3 text-sm text-muted-foreground">Loading…</div>
                                    ) : query.trim().length > 0 && results.length === 0 ? (
                                        <div className="p-3 text-sm text-muted-foreground">No results found.</div>
                                    ) : (
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
                                                            {r.title}
                                                            <span className="ml-2 text-xs text-muted-foreground">
                                                                {r.href}
                                                            </span>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
