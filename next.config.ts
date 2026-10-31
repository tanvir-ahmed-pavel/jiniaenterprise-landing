import type { NextConfig } from "next";
import { LEGACY_VEHICLE_SLUGS } from "./lib/vehicles/slugs";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts (English and /bn) need one shared 404 document.
    globalNotFound: true,
  },
  images: {
    // AVIF first, WebP fallback: the studio PNGs are the heaviest bytes on the page.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Legacy vehicle rows still point at third-party image hosts, so the
      // https wildcard stays until those assets are replaced with owned
      // photography. Plain http is dropped — no reason to optimise an
      // unencrypted remote image.
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "isqxwmpengxhrtwlmbil.supabase.co",
      },
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.picknbuy24.com",
      },
      {
        protocol: "https",
        hostname: "cache1.obozrevatel.com",
      },
      {
        protocol: "https",
        hostname: "static.automarket.ro",
      },
      {
        protocol: "https",
        hostname: "www.sellanycar.com",
      },
      {
        protocol: "https",
        hostname: "www.dubicars.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Backstop for the Vercel domain setting: if the bare domain ever reaches
      // the app instead of being redirected at the edge, send it to www with a
      // permanent (308) redirect so canonicals never point at a redirecting URL.
      {
        source: "/:path*",
        has: [{ type: "host", value: "jiniaenterprise.com" }],
        destination: "https://www.jiniaenterprise.com/:path*",
        permanent: true,
      },
      ...Object.entries(LEGACY_VEHICLE_SLUGS).map(([legacy, clean]) => ({
        source: `/vehicles/${legacy}`,
        destination: `/vehicles/${clean}`,
        permanent: true,
      })),
      {
        source: "/fleet",
        destination: "/vehicles",
        permanent: true,
      },
      {
        source: "/cars",
        destination: "/vehicles",
        permanent: true,
      },
      {
        source: "/journal",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/policies/privacy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/policies/rental-terms",
        permanent: true,
      },
      {
        source: "/cancellation-policy",
        destination: "/policies/cancellation-policy",
        permanent: true,
      },
      {
        source: "/definitions",
        destination: "/glossary",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
