import type { Metadata, Viewport } from "next";
import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { getSiteMetadata } from "@/lib/seo/metadata";
import { businessIdentity, SITE_URL } from "@/lib/business/identity";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1912",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  ...getSiteMetadata(),
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Car Rental in Dhaka with Driver | Jinia Enterprise",
    template: "%s | Jinia Enterprise",
  },
  authors: [{ name: businessIdentity.brandName }],
  creator: businessIdentity.brandName,
  publisher: businessIdentity.brandName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootDocument lang="en-BD">{children}</RootDocument>;
}
