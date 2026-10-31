import Link from "next/link";
import { clientService } from "@/lib/supabase/admin-service";
import { Button } from "@/components/ui/button";
import { Building2, Globe, Landmark, ExternalLink, ArrowRight, MessageSquare } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/layout/PageHeader";
import { SilkRibbonBackdrop } from "@/components/ui/SilkRibbonBackdrop";
import { siteConfig } from "@/lib/config";

export const revalidate = 60; // Revalidate every minute

export const metadata = createMetadata({
  title: "Corporate & Embassy Clients in Dhaka",
  description:
    "Jinia Enterprise serves embassies, international organizations, and corporations with chauffeur-driven transport and executive fleet rental across Bangladesh.",
  path: "/clients",
});

export default async function ClientsPage() {
  const clients = await clientService.getActive();

  const embassies = clients.filter((c) => c.type === "Embassy");
  const organizations = clients.filter(
    (c) => c.type === "International Organization"
  );
  const corporates = clients.filter(
    (c) => c.type === "Corporate" || c.type === "Government"
  );

  const sections = [
    {
      title: "Embassies & Diplomatic Missions",
      subtitle: "High-security diplomatic transport with BRTA-verified protocol chauffeurs",
      icon: Globe,
      items: embassies,
      accent: "text-emerald-700",
      bgBadge: "bg-emerald-100 text-emerald-900 border-emerald-300",
    },
    {
      title: "International Organizations & NGOs",
      subtitle: "United Nations agencies, humanitarian missions & development councils",
      icon: Landmark,
      items: organizations,
      accent: "text-blue-700",
      bgBadge: "bg-blue-100 text-blue-900 border-blue-300",
    },
    {
      title: "Multinational & Corporate Enterprises",
      subtitle: "Executive staff commutes, factory EPZ visits, and long-term fleet retainers",
      icon: Building2,
      items: corporates,
      accent: "text-amber-700",
      bgBadge: "bg-amber-100 text-amber-900 border-amber-300",
    },
  ];

  return (
    <div className="pb-24">
      <PageHeader
        title="Distinguished Clients."
        subtitle="Trusted Partnerships"
        description="Serving embassies, international diplomatic missions, and leading multinational enterprises across Bangladesh for over a decade."
        breadcrumbs={[{ label: "Clients" }]}
      />

      <div className="container space-y-20">
        {/* Client Sections */}
        {sections.map((section) => {
          const SectionIcon = section.icon;
          if (section.items.length === 0) return null;

          return (
            <div key={section.title} className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-emerald-900/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                      <SectionIcon className="h-4 w-4" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-medium text-emerald-950">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    {section.subtitle}
                  </p>
                </div>
                <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
                  {section.items.length} Organizations
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {section.items.map((client) => (
                  <div
                    key={client.id || client.name}
                    className="p-5 rounded-2xl bg-white/80 border border-emerald-900/8 hover:border-emerald-300 shadow-xs hover:shadow-[0_6px_18px_-14px_rgba(6,52,38,.30)] transition-all duration-300 flex items-center gap-4 group"
                  >
                    {client.logo_url ? (
                      <div className="w-14 h-14 rounded-xl bg-white border border-emerald-100 p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
                        <img
                          src={client.logo_url}
                          alt={client.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 font-medium text-lg flex items-center justify-center shrink-0 group-hover:bg-emerald-900 group-hover:text-white transition-colors duration-300">
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-medium text-emerald-950 text-sm sm:text-base leading-tight group-hover:text-emerald-700 transition-colors">
                        {client.name}
                      </h3>
                      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block mt-0.5">
                        {client.type}
                      </span>
                      {client.website_url && (
                        <a
                          href={client.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-emerald-600 hover:text-emerald-900 font-medium mt-1.5"
                        >
                          <span>Official Website</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Corporate Retainer CTA */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-emerald-950 text-white border border-emerald-800 shadow-[0_24px_60px_-40px_rgba(6,52,38,.45)] overflow-hidden text-center space-y-6">
          <SilkRibbonBackdrop variant="dark" className="opacity-35" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-400 bg-emerald-900/60 px-4 py-1.5 rounded-full border border-emerald-700/50 inline-block">
              Corporate Transport Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-medium text-white leading-tight">
              Partner with Dhaka&apos;s Most Reliable Fleet
            </h2>
            <p className="text-sm text-emerald-100/80 font-medium leading-relaxed">
              Custom monthly lease retainers, executive chauffeur standby, and centralized VAT billing for corporations and diplomatic missions.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3.5 pt-2">
              <Link href="/contact">
                <Button className="h-12 px-6 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-medium text-xs uppercase tracking-wider gap-2">
                  <span>Corporate Inquiry</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  "Hello Jinia Enterprise, I would like to inquire about corporate / embassy vehicle services."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-12 px-6 rounded-xl border-white/20 text-white hover:bg-white/10 font-medium text-xs uppercase tracking-wider gap-2"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp Corporate Desk</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
