import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    // React/Next development tooling needs eval for enhanced debugging.
    // Production bundles do not.
    isDevelopment ? "'unsafe-eval'" : "",
    "https://challenges.cloudflare.com",
    "https://www.googletagmanager.com",
  ]
    .filter(Boolean)
    .join(" "),
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://picsum.photos https://images.unsplash.com https://*.posthog.com https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org https://www.googletagmanager.com",
  "connect-src 'self' https://eu.i.posthog.com https://eu-assets.i.posthog.com https://*.basemaps.cartocdn.com https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  "worker-src 'self' blob:",
  "frame-src 'self' https://challenges.cloudflare.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  isDevelopment ? "" : "upgrade-insecure-requests",
]
  .filter(Boolean)
  .join("; ") + ";";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Use modern formats for better performance
    formats: ["image/avif", "image/webp"],
    // Reduce image sizes for faster loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Lower quality for smaller file sizes (default is 75)
    qualities: [60, 75],
  },
  
  // Performance optimizations
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-navigation-menu",
    ],
  },
  
  // Include Keystatic content files in Vercel serverless bundles
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },

  // Compression
  compress: true,
  
  // Generate ETags for caching
  generateEtags: true,
  
  // Power header (optional, can disable)
  poweredByHeader: false,
  
  async redirects() {
    return [
      // Keep the apex domain canonical while both hostnames serve production.
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.quilliamsmowing.co.uk",
          },
        ],
        destination: "https://quilliamsmowing.co.uk/:path*",
        permanent: true,
      },
      // Renamed page: /sitemap → /site-map (avoid conflict with sitemap.xml)
      {
        source: "/sitemap",
        destination: "/site-map",
        permanent: true,
      },
      // Old URL that Google still has indexed
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      // Removed feature
      {
        source: "/scheduler",
        destination: "/",
        permanent: true,
      },
      // Old articles section no longer exists
      {
        source: "/articles/:path*",
        destination: "/",
        permanent: true,
      },
      // Old lawn mowing URL still in Google's index
      {
        source: "/services/lawn-mowing-newquay",
        destination: "/services/lawn-care",
        permanent: true,
      },
      // 404s found in Google Search Console
      {
        source: "/quote-success",
        destination: "/quote",
        permanent: true,
      },
      {
        source: "/gardening-services",
        destination: "/services",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/ph/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ph/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: "/keystatic/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
      {
        // Cache static assets
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache pattern assets
        source: "/patterns/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  
  skipTrailingSlashRedirect: false,
};

export default nextConfig;
