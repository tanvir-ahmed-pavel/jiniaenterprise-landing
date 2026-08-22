import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiReferralCapture } from "@/components/analytics/TrackEvents";
import { getSiteMetadata } from "@/lib/seo/metadata";
import {
  getLocalBusinessSchema,
  getWebSiteSchema,
} from "@/lib/seo/schema";
import { businessIdentity } from "@/lib/business/identity";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
    <html lang="en-BD" suppressHydrationWarning>
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
          inter.variable,
          outfit.variable,
        )}
        suppressHydrationWarning
      >
        <AiReferralCapture />
        <SiteShell
          navbar={<Navbar />}
          footer={<Footer />}
          background={
            <div
              className="fixed inset-0 pointer-events-none -z-10"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(167,243,208,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(153,246,228,0.2) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 50% 80%, rgba(167,243,208,0.15) 0%, transparent 50%), hsl(145, 20%, 96%)",
              }}
            />
          }
        >
          {children}
        </SiteShell>

        <Script
          id="nodi-chat-script"
          src="https://cdn.chat-widget-source.usenodi.com/staging/index.js"
          data-widget-id="wc_b9a30cb72b357f06dbd346314dcfb404"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
