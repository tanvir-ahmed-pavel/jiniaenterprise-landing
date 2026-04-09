import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { services, groupTransportOptions, siteConfig } from "@/lib/config";
import {
  Car,
  Calendar,
  Briefcase,
  Bus,
  User,
  Plane,
  Clock,
  Phone,
  Shield,
  MapPin,
  CheckCircle,
  Sparkles,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bespoke Services | Jinia Enterprise",
  description:
    "Comprehensive car rental services in Dhaka including daily rental, monthly rental, corporate fleet, bus rental, chauffeur service, and airport transfers.",
};

const iconMap: { [key: string]: React.ElementType } = {
  car: Car,
  calendar: Calendar,
  briefcase: Briefcase,
  bus: Bus,
  user: User,
  plane: Plane,
  shield: Shield,
};

export default function ServicesPage() {
  return (
    <div className="pb-24">
      <PageHeader 
        title="Bespoke Services."
        subtitle="Unparalleled Mobility"
        description="Comprehensive mobility solutions tailored to your refined needs. From elite daily rentals to sophisticated corporate fleet management."
        breadcrumbs={[{ label: "Services" }]}
      />

      <div className="container">
        {/* Services Grid — Artistic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Car;
            // Modern staggered layout logic from homepage
            const isLarge = idx === 0 || idx === 7 || idx === 8;
            
            return (
              <div 
                key={service.id} 
                className={cn(
                  "glass-card p-10 group flex flex-col justify-between min-h-[320px] transition-all duration-500 hover:-translate-y-2",
                  isLarge ? "lg:col-span-2 lg:bg-white/80" : "bg-white/40"
                )}
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-2xl shadow-green-900/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-black/[0.03]">
                    <IconComponent className="h-8 w-8 text-green-700" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-heading font-black text-green-950 tracking-tight italic">
                      {service.title}.
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <Link 
                    href="/booking"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-green-700 hover:text-green-500 transition-all group/link"
                  >
                    Reserve This Space <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Group & Corporate — Cinematic Dark Section */}
        <div className="relative glass-card p-12 md:p-24 mb-32 overflow-hidden bg-green-950">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[20rem] font-heading font-black italic whitespace-nowrap">CORPORATE</span>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.3em]">Institutional Care</span>
                <h2 className="text-4xl md:text-6xl font-heading font-black text-white italic leading-tight">
                  Group & <br /> <span className="text-green-400">Corporate.</span>
                </h2>
              </div>
              <p className="text-white/60 font-medium text-lg leading-relaxed">
                Jinia Enterprise provides customized group transportation solutions, combining experienced drivers with a modern fleet for safe and hassle-free institutional journeys.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {groupTransportOptions.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-white/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span className="text-sm font-bold tracking-tight">{option}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <Link href="/contact">
                  <Button className="h-16 px-10 rounded-2xl bg-white text-green-950 hover:bg-green-50 font-black uppercase tracking-[0.2em] text-[10px]">
                    Inquire Concierge
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-6">
              {[
                {
                  title: "Elite Fleet Diversity",
                  items: ["Wide range of luxury vehicles", "Competitive institutional rates", "Business and executive grade"]
                },
                {
                  title: "Agile Mobility Solutions",
                  items: ["Long-term strategic leasing", "Dedicated chauffeur services", "24/7 Priority assistance"]
                }
              ].map((box) => (
                <div 
                  key={box.title}
                  className="glass-card p-10 bg-white/5 border-white/10 space-y-4"
                >
                  <h3 className="text-xl font-heading font-black text-white italic">{box.title}.</h3>
                  <ul className="space-y-3">
                    {box.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-medium text-white/50">
                        <CheckCircle className="h-4 w-4 text-green-500/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choice — Dynamic Grid */}
        <div className="glass-card p-12 md:p-20 bg-green-50/50 border-green-100 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-black text-green-950 italic">The Jinia Advantage.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: Shield,
                title: "Elite Fleet",
                text: "All vehicles are first-hand and maintained to peerless standards.",
              },
              {
                icon: Clock,
                title: "Rapid Pulse",
                text: "Instant responses to your most demanding scheduling needs.",
              },
              {
                icon: MapPin,
                title: "Global Reach",
                text: "Unrestricted access across Dhaka and the entire nation.",
              },
              {
                icon: Phone,
                title: "Concierge Staff",
                text: "Elite, experienced professionals available at all moments.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-green-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-heading font-black text-green-950 text-xl italic">{title}.</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium CTA — Artistic Centered */}
        <div className="relative glass-card p-12 md:p-20 text-center overflow-hidden bg-green-950">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[20rem] font-heading font-black italic whitespace-nowrap">RESERVE</span>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white italic leading-tight">
              Ready for Your <br /> <span className="text-green-400">Next Destination?</span>
            </h2>
            <p className="text-white/60 font-medium text-lg leading-relaxed italic">
              &ldquo;For your next car rental, try Jinia — you will come back.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <Link href="/booking">
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-green-950 hover:bg-green-50 font-black uppercase tracking-[0.2em] text-[10px]">
                  <Calendar className="mr-3 h-4 w-4" /> Book Reservation
                </Button>
              </Link>
              <a href="https://wa.me/8801716633445" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-[0.2em] text-[10px]">
                  <MessageSquare className="mr-3 h-4 w-4" /> WhatsApp Connect
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
