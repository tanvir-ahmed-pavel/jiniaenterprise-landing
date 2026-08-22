import type { NextConfig } from "next";

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
  images: {
    remotePatterns: [
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
