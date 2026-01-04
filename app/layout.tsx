import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "leaflet/dist/leaflet.css";

import { getSiteContent } from "@/lib/keystatic-reader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function resolveSiteUpload(file: string | null | undefined): string | undefined {
  const trimmed = file?.trim();
  return trimmed ? `/images/uploads/site/${trimmed}` : undefined;
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();

  const siteName = site.siteName?.trim() || "Website";
  const favicon = resolveSiteUpload(site.assets?.faviconPngFile);
  const appleTouch = resolveSiteUpload(site.assets?.appleTouchIconPngFile);
  const safariPinnedTab = resolveSiteUpload(site.assets?.safariPinnedTabSvgFile);
  const themeColor = site.pwa?.themeColor?.trim() || undefined;

  let metadataBase: URL | undefined;
  try {
    if (site.siteUrl?.trim()) metadataBase = new URL(site.siteUrl);
  } catch {
    metadataBase = undefined;
  }

  return {
    metadataBase,
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: favicon ? [{ url: favicon, type: "image/png" }] : undefined,
      apple: appleTouch ? [{ url: appleTouch, type: "image/png" }] : undefined,
      other:
        safariPinnedTab && themeColor
          ? [
            {
              rel: "mask-icon",
              url: safariPinnedTab,
              color: themeColor,
            },
          ]
          : undefined,
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const site = await getSiteContent();

  const themeColor = site.pwa?.themeColor?.trim() || undefined;

  return themeColor ? { themeColor } : {};
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasTurnstileConfigured = Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_SUBSCRIBE?.trim() ||
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_CONTACT?.trim() ||
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_QUOTE?.trim() ||
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY_POPUP?.trim() ||
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim(),
  );

  return (
    <html lang="en">
      <head>
        {hasTurnstileConfigured ? (
          <link rel="preconnect" href="https://challenges.cloudflare.com" />
        ) : null}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {hasTurnstileConfigured ? (
          <Script
            id="cf-turnstile"
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="beforeInteractive"
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
