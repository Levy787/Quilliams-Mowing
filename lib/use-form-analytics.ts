"use client";

import * as React from "react";

import { capturePostHogEvent } from "@/lib/posthog-client";

type TrackedFormName = "contact" | "quote";

function getValidationType(validity: ValidityState): string {
    if (validity.valueMissing) return "value_missing";
    if (validity.typeMismatch) return "type_mismatch";
    if (validity.patternMismatch) return "pattern_mismatch";
    if (validity.tooLong) return "too_long";
    if (validity.tooShort) return "too_short";
    if (validity.rangeUnderflow) return "range_underflow";
    if (validity.rangeOverflow) return "range_overflow";
    if (validity.stepMismatch) return "step_mismatch";
    if (validity.badInput) return "bad_input";
    if (validity.customError) return "custom_error";
    return "invalid";
}

export function useFormAnalytics(formName: TrackedFormName) {
    const startedRef = React.useRef(false);

    const trackFormStart = React.useCallback(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        void capturePostHogEvent("form_start", {
            form_name: formName,
            path:
                typeof window === "undefined"
                    ? undefined
                    : window.location.pathname,
        });
    }, [formName]);

    const trackValidationError = React.useCallback(
        (fieldName: string, validationType: string) => {
            trackFormStart();
            void capturePostHogEvent("form_validation_error", {
                form_name: formName,
                field_name: fieldName,
                validation_type: validationType,
            });
        },
        [formName, trackFormStart],
    );

    const trackInvalidField = React.useCallback(
        (event: React.InvalidEvent<HTMLFormElement>) => {
            const control = event.target;
            if (
                !(control instanceof HTMLInputElement)
                && !(control instanceof HTMLTextAreaElement)
                && !(control instanceof HTMLSelectElement)
            ) {
                return;
            }
            const fieldName = control.name || control.id || "unknown";
            trackValidationError(
                fieldName,
                getValidationType(control.validity),
            );
        },
        [trackValidationError],
    );

    const resetFormAnalytics = React.useCallback(() => {
        startedRef.current = false;
    }, []);

    return {
        resetFormAnalytics,
        trackFormStart,
        trackInvalidField,
        trackValidationError,
    };
}
