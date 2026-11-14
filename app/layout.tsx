import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiReferralCapture } from "@/components/analytics/TrackEvents";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";
import { getSiteMetadata } from "@/lib/seo/metadata";
import {
  getLocalBusinessSchema,
  getWebSiteSchema,
} from "@/lib/seo/schema";
import { businessIdentity } from "@/lib/business/identity";
import { Familjen_Grotesk, Hanken_Grotesk, Instrument_Serif } from "next/font/google";

/** Storefront pairing: a tight, characterful grotesk for display, a serif
 *  italic for the one or two words per headline that carry the voice, and a
 *  quiet grotesk for reading. Exposed as CSS variables; globals.css owns use. */
const display = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] });
const accent = Instrument_Serif({ subsets: ["latin"], variable: "--font-accent", display: "swap", weight: "400", style: ["normal", "italic"] });
const text = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-text", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // When the on-screen keyboard opens, resize the page (and dvh units) instead
  // of overlaying it, so bottom sheets sit above the keyboard.
  interactiveWidget: "resizes-content",
  themeColor: "#0a1912",
};

export const metadata: Metadata = {
  ...getSiteMetadata(),
  metadataBase: new URL(businessIdentity.url),
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
  return (
    <html lang="en-BD" className={cn(display.variable, accent.variable, text.variable)} suppressHydrationWarning>
      <head>
        <JsonLd data={[getLocalBusinessSchema(), getWebSiteSchema()]} />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="489134d9-4050-4fe6-a9ef-1dd6cc0c320f"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col relative",
        )}
        suppressHydrationWarning
      >
        <GoogleTagManagerNoScript />
        <GoogleTagManager />
        <AiReferralCapture />
        <SiteShell
          navbar={<Navbar />}
          footer={<Footer />}
          background={
            <div
              className="fixed inset-0 pointer-events-none -z-10"
              style={{
                background: "#ffffff",
              }}
            />
          }
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
