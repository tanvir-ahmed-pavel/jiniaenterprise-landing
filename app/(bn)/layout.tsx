import type { Metadata, Viewport } from "next";
import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { businessIdentity, SITE_URL } from "@/lib/business/identity";
import { banglaFont } from "@/lib/fonts-bangla";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1912",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ঢাকায় ড্রাইভারসহ গাড়ি ভাড়া | Jinia Enterprise",
    template: "%s | Jinia Enterprise",
  },
  authors: [{ name: businessIdentity.brandName }],
  creator: businessIdentity.brandName,
  publisher: businessIdentity.brandName,
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function BanglaRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootDocument lang="bn-BD" fontClassName={banglaFont.variable}>
      {children}
    </RootDocument>
  );
}
