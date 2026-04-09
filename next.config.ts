import type { NextConfig } from "next";

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
};

export default nextConfig;
