import type { MetadataRoute } from "next";
import { businessIdentity } from "@/lib/business/identity";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: businessIdentity.brandName,
    short_name: "Jinia",
    description: businessIdentity.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a1912",
    theme_color: "#0a1912",
    lang: "en-BD",
    icons: [
      {
        src: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
