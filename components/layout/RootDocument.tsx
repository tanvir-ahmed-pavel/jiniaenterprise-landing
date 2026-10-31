import Script from "next/script";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteShell } from "@/components/layout/SiteShell";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { AiReferralCapture } from "@/components/analytics/TrackEvents";
import { getLocalBusinessSchema, getWebSiteSchema } from "@/lib/seo/schema";
import { boardFont } from "@/lib/fonts";

/**
 * The <html> document shared by the English and Bangla root layouts. Two
 * root layouts exist only so each language can set its own <html lang>.
 */
export function RootDocument({
  lang,
  fontClassName,
  children,
}: {
  lang: "en-BD" | "bn-BD";
  fontClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={cn(boardFont.variable, fontClassName)} suppressHydrationWarning>
      <head>
        <JsonLd data={[getLocalBusinessSchema(), getWebSiteSchema()]} />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="489134d9-4050-4fe6-a9ef-1dd6cc0c320f"
        />
      </head>
      <body
        className="min-h-screen bg-background font-sans antialiased flex flex-col relative"
        suppressHydrationWarning
      >
        <AiReferralCapture />
        <SiteShell
          navbar={<Navbar />}
          footer={<Footer />}
          mobileBar={<MobileActionBar />}
          background={
            <div
              className="fixed inset-0 pointer-events-none -z-10"
              style={{ background: "#ffffff" }}
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
