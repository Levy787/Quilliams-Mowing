"use client";

import * as React from "react";

type RevealOptions = {
    rootMargin?: string;
    threshold?: number;
};

export function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

        handleChange();
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return prefersReducedMotion;
}

export function useRevealInView<T extends Element>({
    rootMargin = "0px 0px -12% 0px",
    threshold = 0.2,
}: RevealOptions = {}) {
    const ref = React.useRef<T | null>(null);
    const [inView, setInView] = React.useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    React.useEffect(() => {
        if (prefersReducedMotion) {
            setInView(true);
            return;
        }

        const node = ref.current;
        if (!node || typeof IntersectionObserver === "undefined") {
            setInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [prefersReducedMotion, rootMargin, threshold]);

    return { ref, inView, prefersReducedMotion };
}
