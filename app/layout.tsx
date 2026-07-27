import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getSiteContent } from "@/lib/keystatic-reader";
import { PostHogClientInit } from "@/components/PostHogClientInit";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
      icon: favicon
        ? [{ url: favicon, type: "image/x-icon" }]
        : undefined,
      shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
      apple: appleTouch
        ? [{ url: appleTouch, type: "image/png", sizes: "180x180" }]
        : undefined,
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
  return (
    <html lang="en-GB">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <PostHogClientInit />
        {children}
      </body>
    </html>
  );
}
