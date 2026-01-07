"use client";

import { makePage } from "@keystatic/next/ui/app";
import { keystaticConfig } from "@/keystatic.config";

// Only render Keystatic UI in development
const KeystaticPage =
  process.env.NODE_ENV === "development"
    ? makePage(keystaticConfig)
    : () => null;

export default KeystaticPage;
