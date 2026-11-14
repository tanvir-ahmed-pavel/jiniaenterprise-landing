import { createMetadata } from "@/lib/seo/metadata";
import { ContentPageShell } from "@/components/seo/ContentPageShell";
import { businessIdentity, getWhatsAppHref } from "@/lib/business/identity";
import { ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/WhatsApp";

export const metadata = createMetadata({
  title: "Reviews & Feedback — Jinia Enterprise",
  description:
    "How Jinia Enterprise collects genuine customer feedback after chauffeur bookings. No fabricated star ratings—share your trip experience with the desk.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <ContentPageShell
      title="Reviews, done honestly."
      subtitle="Real feedback only"
      description="We do not publish fake testimonials or invented star counts for search engines."
      path="/reviews"
      breadcrumbLabel="Reviews"
      answer="After a completed booking, we welcome honest feedback—what went well and what we should fix. Prefer public platforms you already trust, or message the desk directly. We will never ask you to post a review that isn’t true."
      sections={[
        {
          heading: "How feedback usually works",
          body: "1. Trip completes\n2. Desk may follow up by phone or WhatsApp\n3. You choose whether to leave a public review or private note\n4. Operational issues are escalated to improve the next booking",
        },
        {
          heading: "What we won’t do",
          body: "• Invent five-star quotes for the website\n• Stuff keyword reviews\n• Display aggregate ratings we cannot verify from a live profile",
        },
        {
          heading: "Share feedback with us",
          body: `Call or WhatsApp ${businessIdentity.phone}, or email ${businessIdentity.email}. Mention your travel date and vehicle so we can find the booking.`,
        },
      ]}
      related={[
        { href: "/clients", label: "Organizations we serve" },
        { href: "/about", label: "About Jinia" },
        { href: "/contact", label: "Contact desk" },
        { href: "/booking", label: "Book a trip" },
      ]}
      updatedAt="2026-08-21"
    >
      <section className="rounded-[1.6rem] bg-tile-sage p-6 sm:p-8">
        <h2 className="type-heading font-heading text-2xl text-ink">
          Leave a note after <span className="type-accent text-gold-deep">your ride.</span>
        </h2>
        <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-ink/65">
          Prefer WhatsApp? Open a chat with the booking reference and a short note—praise or complaint both help.
        </p>
        <a
          href={getWhatsAppHref(
            "Hi Jinia — I want to share feedback about my recent booking.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-paper"
        >
          <WhatsAppIcon className="h-[1.1rem] w-[1.1rem] text-[#128C4B]" />
          WhatsApp feedback
          <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </section>
    </ContentPageShell>
  );
}
