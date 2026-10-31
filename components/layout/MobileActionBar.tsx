"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Phone, FileText } from "lucide-react";
import { businessIdentity, getTelHref, getWhatsAppHref } from "@/lib/business/identity";
import { getLocaleForPath } from "@/lib/i18n/alternates";

const COPY = {
  en: { whatsapp: "WhatsApp", call: "Call", quote: "Get quote", message: "Hello Jinia, I'd like a quote for a car with driver." },
  bn: { whatsapp: "হোয়াটসঅ্যাপ", call: "কল করুন", quote: "দাম জানুন", message: "আসসালামু আলাইকুম, ড্রাইভারসহ গাড়ি ভাড়ার দাম জানতে চাই।" },
} as const;

/**
 * Phone-width action bar, fixed to the bottom of every public page. The three
 * ways people actually book in Bangladesh, each a 56px target, clear of the
 * home indicator via the safe-area inset. Hidden from md up, where the header
 * already carries Call and WhatsApp.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const copy = COPY[getLocaleForPath(pathname)];

  return (
    <nav
      aria-label={copy.quote}
      className="jinia-mobile-bar fixed inset-x-0 bottom-0 z-40 border-t border-emerald-950/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-3">
        <li>
          <a
            href={getWhatsAppHref(copy.message)}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="mobile_bar_whatsapp"
            className="flex h-14 flex-col items-center justify-center gap-0.5 bg-emerald-950 text-[12px] font-medium text-white"
          >
            <MessageSquare aria-hidden className="h-[18px] w-[18px]" />
            {copy.whatsapp}
          </a>
        </li>
        <li>
          <a
            href={getTelHref()}
            data-umami-event="mobile_bar_call"
            aria-label={`${copy.call} ${businessIdentity.phone}`}
            className="flex h-14 flex-col items-center justify-center gap-0.5 text-[12px] font-medium text-emerald-950"
          >
            <Phone aria-hidden className="h-[18px] w-[18px]" />
            {copy.call}
          </a>
        </li>
        <li>
          <Link
            href="/booking"
            data-umami-event="mobile_bar_quote"
            className="flex h-14 flex-col items-center justify-center gap-0.5 border-l border-emerald-950/10 text-[12px] font-medium text-emerald-950"
          >
            <FileText aria-hidden className="h-[18px] w-[18px]" />
            {copy.quote}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
