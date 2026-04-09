import { BookingForm } from "@/components/forms/BookingForm";
import { siteConfig } from "@/lib/config";
import { Phone, MessageSquare, MapPin, Clock, Sparkles, Shield, BookmarkCheck } from "lucide-react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Reserve Your Journey | Jinia Enterprise",
  description:
    "Book your car rental with Jinia Enterprise. Choose from our premium fleet of vehicles for daily, weekly, or monthly rentals in Dhaka.",
};

export default async function BookingPage() {
  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .order("name");

  return (
    <div className="pb-24">
      <PageHeader 
        title="Reserve Now."
        subtitle="The First Step"
        description="Secure your preferred vehicle from our selective fleet. Our concierge team will orchestrate every detail of your upcoming journey."
        breadcrumbs={[{ label: "Reserve" }]}
      />

      <div className="container">
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-24 mb-32">
          {/* Booking Form — Premium Container */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em]">The Specification</span>
              <h2 className="text-4xl font-heading font-black text-green-950 italic leading-none">
                Booking Request.
              </h2>
              <p className="text-gray-500 font-medium">
                Our concierge will contact you within two hours to finalize your arrangements.
              </p>
            </div>
            
            <div className="glass-card p-1 md:p-10 bg-white/40 border-white/60">
              <BookingForm vehicles={vehicles || []} />
            </div>
          </div>

          {/* Sidebar — Artistic Widgets */}
          <div className="space-y-12">
            {/* Quick Contact — Premium Glass */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em]">Direct Line</span>
                <h3 className="text-2xl font-heading font-black text-green-950 italic">Immediate Concierge.</h3>
              </div>
              
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="glass-card flex items-center gap-6 p-6 bg-white/60 border-white/80 hover:bg-green-600 group transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100 group-hover:bg-white transition-colors duration-500">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-green-900/40 group-hover:text-white/60 transition-colors">Personal Call</div>
                    <div className="text-lg font-heading font-black text-green-950 group-hover:text-white transition-colors">
                      {siteConfig.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card flex items-center gap-6 p-6 bg-green-50/30 border-green-100 hover:bg-emerald-600 group transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-green-50 group-hover:bg-white transition-colors duration-500">
                    <MessageSquare className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-900/40 group-hover:text-white/60 transition-colors">Instant WhatsApp</div>
                    <div className="text-lg font-heading font-black text-green-950 group-hover:text-white transition-colors">Live Chat</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Office Info — Minimalist */}
            <div className="glass-card p-10 bg-green-950 text-white space-y-6 relative overflow-hidden">
              <MapPin className="absolute -top-4 -right-4 h-24 w-24 text-white/5" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">Headquarters</h3>
              <div className="space-y-4">
                <p className="text-xl font-heading font-black italic">
                  {siteConfig.address.line1} <br />
                  {siteConfig.address.line2} <br />
                  {siteConfig.address.area}, {siteConfig.address.city}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <Clock className="h-4 w-4 text-green-400" />
                  <div className="text-xs font-bold text-white/60">
                    Sat - Thu: 9:00 AM - 8:00 PM <br />
                    Fri: 10:00 AM - 6:00 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Why Book — Pattern */}
            <div className="glass-card p-10 bg-white/40 border-white/60 space-y-8">
              <h3 className="text-xl font-heading font-black text-green-950 italic">The Jinia Promise.</h3>
              <ul className="space-y-4">
                {[
                  "Premium Fleet Selection",
                  "Elite Chauffeur Corps",
                  "Flexible Strategic Leasing",
                  "24/7 Priority Concierge",
                  "Transparent Elite Pricing",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 group">
                    <div className="h-2 w-2 rounded-full bg-green-500 group-hover:scale-150 transition-transform duration-300" />
                    <span className="text-sm font-bold text-gray-600 tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Badge — Floating */}
        <div className="flex justify-center mb-16">
          <div className="glass-card px-8 py-4 bg-green-50/50 border-green-100 flex items-center gap-4 animate-float">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-950">Zero-Compromise Safety Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
}
