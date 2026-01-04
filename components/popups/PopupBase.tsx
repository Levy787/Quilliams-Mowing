"use client";

import * as React from "react";

import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog";

export function PopupBase({
    open,
    onOpenChange,
    title,
    children,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
            <DialogPortal>
                <DialogContent
                    showCloseButton={false}
                    className={cn(
                        "z-101 gap-0 p-0",
                        "rounded-4xl border border-border bg-background shadow-lg outline-none",
                    )}
                >
                    <DialogTitle className="sr-only">{title}</DialogTitle>

                    <DialogClose
                        aria-label="Close"
                        className={cn(
                            "absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full",
                            "z-10",
                            "bg-background/90 text-foreground",
                            "border border-border shadow-xs",
                            "hover:bg-accent hover:text-accent-foreground transition-colors motion-reduce:transition-none",
                            "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                        )}
                    >
                        <XIcon className="h-4 w-4" aria-hidden="true" />
                    </DialogClose>
                    {children}
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
