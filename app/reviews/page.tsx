import { createMetadata } from "@/lib/seo/metadata";
import { ContentPageShell } from "@/components/seo/ContentPageShell";
import { businessIdentity, getWhatsAppHref } from "@/lib/business/identity";

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
      <section className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 space-y-3">
        <h2 className="text-lg font-heading font-black text-emerald-950">
          Leave a note after your ride
        </h2>
        <p className="text-sm text-gray-600">
          Prefer WhatsApp? Open a chat with the booking reference and a short note—praise or complaint both help.
        </p>
        <a
          href={getWhatsAppHref(
            "Hi Jinia — I want to share feedback about my recent booking.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm font-bold text-emerald-800 hover:text-emerald-600"
        >
          WhatsApp feedback →
        </a>
      </section>
    </ContentPageShell>
  );
}
