import { InquiryForm } from "@/components/forms/InquiryForm";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Globe,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getLocalBusinessSchema } from "@/lib/seo/schema";
import {
  businessIdentity,
  getFormattedAddress,
  getTelHref,
  getWhatsAppHref,
} from "@/lib/business/identity";

export const metadata = createMetadata({
  title: "Contact Jinia Enterprise — Dhaka Car Rental Desk",
  description:
    "Call, WhatsApp, or visit Jinia Enterprise in Gulshan, Dhaka. Request car rental quotes, airport transfers, and corporate fleet support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pb-24">
      <JsonLd
        data={[
          getLocalBusinessSchema(),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageHeader
        title="Connect."
        subtitle="Dhaka concierge desk"
        description="Call, WhatsApp, email, or visit our Gulshan office for car rental quotes and bookings."
        breadcrumbs={[{ label: "Connect" }]}
      />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="space-y-12 animate-fade-in-up">
            <div className="space-y-4">
              <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em]">
                Direct Channels
              </span>
              <h2 className="text-4xl font-heading font-black text-green-950 leading-none italic">
                Get in Touch.
              </h2>
              <p className="text-sm text-gray-600 font-medium">
                {businessIdentity.brandName} · {getFormattedAddress()}
              </p>
            </div>

            <div className="grid gap-8">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: (
                    <div className="flex flex-col gap-1 font-bold text-gray-600">
                      <a
                        href={getTelHref()}
                        className="hover:text-green-600 transition-colors"
                      >
                        {businessIdentity.phone}
                      </a>
                      {businessIdentity.phoneSecondary && (
                        <a
                          href={getTelHref(businessIdentity.phoneSecondary)}
                          className="hover:text-green-600 transition-colors"
                        >
                          {businessIdentity.phoneSecondary}
                        </a>
                      )}
                    </div>
                  ),
                },
                {
                  icon: MessageSquare,
                  title: "WhatsApp",
                  content: (
                    <a
                      href={getWhatsAppHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {businessIdentity.phone}
                    </a>
                  ),
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: (
                    <a
                      href={`mailto:${businessIdentity.email}`}
                      className="font-bold text-gray-600 hover:text-green-600 transition-colors break-all"
                    >
                      {businessIdentity.email}
                    </a>
                  ),
                },
                {
                  icon: MapPin,
                  title: "Office",
                  content: (
                    <address className="not-italic font-medium text-gray-600 leading-relaxed">
                      {getFormattedAddress()}
                    </address>
                  ),
                },
                {
                  icon: Clock,
                  title: "Hours",
                  content: (
                    <div className="font-bold text-gray-600 space-y-1">
                      <p>Sat–Thu: 9:00 AM – 8:00 PM</p>
                      <p>Friday: 10:00 AM – 6:00 PM</p>
                    </div>
                  ),
                },
                {
                  icon: Globe,
                  title: "Service areas",
                  content: (
                    <p className="font-medium text-gray-600 leading-relaxed">
                      Dhaka (Gulshan, Banani, Uttara, Dhanmondi, and more), DAC
                      airport, and outstation Bangladesh routes.
                    </p>
                  ),
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black uppercase tracking-wider text-emerald-950">
                      {item.title}
                    </h3>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative glass-card p-2 bg-white/40 border-white/60 overflow-hidden group">
              <div className="aspect-video rounded-2xl overflow-hidden grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0164267879956!2d90.41455431498149!3d23.793769084567995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70dab33%3A0x4b606d63ecb0c1a5!2sGulshan%202%20Circle!5e0!3m2!1sen!2sbd!4v1702700000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Jinia Enterprise Location — Gulshan, Dhaka"
                />
              </div>
            </div>
          </div>

          <div className="relative lg:sticky lg:top-32 animate-fade-in-up animation-delay-100">
            <div className="glass-card p-8 md:p-12 bg-white/70 border-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
              <div className="mb-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-[10px] font-black uppercase tracking-widest text-green-600">
                  <Sparkles className="h-3 w-3" /> Secure Submission
                </div>
                <h2 className="text-3xl font-heading font-black text-green-950 italic">
                  Send a Message.
                </h2>
                <p className="text-gray-400 font-medium text-sm">
                  Share pickup, dates, and vehicle preference for a faster quote.
                </p>
              </div>
              <InquiryForm source="contact_page" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
