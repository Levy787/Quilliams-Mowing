import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    manifest: "/site.webmanifest",
    themeColor,
    icons: {
      icon: favicon ? [{ url: favicon, type: "image/png" }] : undefined,
      apple: appleTouch ? [{ url: appleTouch, type: "image/png" }] : undefined,
      other: safariPinnedTab
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
