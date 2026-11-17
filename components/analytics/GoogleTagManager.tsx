"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { pushEvent } from "@/lib/analytics/datalayer";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/** Fires a virtual page view on client-side navigations (GTM sees the first load itself). */
function RouteViews() {
  const path = usePathname();
  const search = useSearchParams();
  useEffect(() => {
    pushEvent("page_view", { page_path: path + (search?.toString() ? `?${search}` : ""), page_title: document.title });
  }, [path, search]);
  return null;
}

/**
 * Site-wide click signals every tag in GTM can use without touching code:
 * WhatsApp and phone taps, wherever they are on the page.
 */
function ClickSignals() {
  useEffect(() => {
    const on = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const where = window.location.pathname;
      if (href.startsWith("https://wa.me")) pushEvent("whatsapp_click", { link_text: a.textContent?.trim().slice(0, 60), page_path: where, has_brief: href.includes("text=") });
      else if (href.startsWith("tel:")) pushEvent("call_click", { link_text: a.textContent?.trim().slice(0, 60), page_path: where });
    };
    document.addEventListener("click", on, { capture: true });
    return () => document.removeEventListener("click", on, { capture: true });
  }, []);
  return null;
}

export function GoogleTagManager() {
  if (!GTM_ID) return null;
  return (
    <>
      {/* lazyOnload: GTM loads after the page has rendered, so it does not compete with the first paint on phones. Events queued before that are kept (lib/analytics/datalayer.ts). */}
      <Script id="gtm" strategy="lazyOnload">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Suspense fallback={null}>
        <RouteViews />
      </Suspense>
      <ClickSignals />
    </>
  );
}

/** The no-JavaScript fallback GTM asks for right after <body> opens. */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
    </noscript>
  );
}
