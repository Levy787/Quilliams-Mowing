import type { NextConfig } from "next";

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
      // Renamed page: /sitemap → /site-map (avoid conflict with sitemap.xml)
      {
        source: "/sitemap",
        destination: "/site-map",
        permanent: true,
      },
      // Old URL that Google still has indexed
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
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://eu.i.posthog.com https://eu-assets.i.posthog.com https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "img-src 'self' data: blob: https://picsum.photos https://images.unsplash.com https://*.posthog.com https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org",
              "connect-src 'self' https://eu.i.posthog.com https://eu-assets.i.posthog.com https://*.basemaps.cartocdn.com",
              "worker-src 'self' blob:",
              "frame-src 'self' https://challenges.cloudflare.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; ") + ";",
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
