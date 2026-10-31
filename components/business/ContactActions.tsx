import Link from "next/link";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import { businessIdentity, getTelHref, getWhatsAppHref } from "@/lib/business/identity";
import { cn } from "@/lib/utils";

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * Call / WhatsApp / booking as plain links (no <button> nested in <a>), each
 * a 48px target. WhatsApp leads, because that is how most customers book.
 */
export function ContactActions({
  whatsappMessage,
  bookingHref = "/booking",
  bookingLabel = "Booking form",
  className,
}: {
  whatsappMessage: string;
  bookingHref?: string;
  bookingLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <a
        href={getWhatsAppHref(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event="page_whatsapp"
        className={cn(base, "bg-emerald-950 text-white hover:bg-emerald-800")}
      >
        <MessageSquare aria-hidden className="h-4 w-4" /> WhatsApp
      </a>
      <a href={getTelHref()} data-umami-event="page_call" className={cn(base, "border border-emerald-950/20 text-emerald-950 hover:border-amber-400")}>
        <Phone aria-hidden className="h-4 w-4" /> Call {businessIdentity.phone}
      </a>
      <Link href={bookingHref} className={cn(base, "px-4 text-emerald-950 underline-offset-4 hover:underline")}>
        {bookingLabel} <ArrowRight aria-hidden className="h-4 w-4" />
      </Link>
    </div>
  );
}
