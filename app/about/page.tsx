import { Metadata } from "next";
import {
  companyHistory,
  whyChooseUs,
  siteConfig,
  ourObjectives,
  teamMembers,
} from "@/lib/config";
import { CheckCircle, Target, Eye, Heart, Award, User, Sparkles, Quote } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us | Jinia Enterprise",
  description:
    "Learn about Jinia Enterprise - over 10 years of trusted car rental service in Dhaka. Our mission, vision, and commitment to customer satisfaction.",
};

export default function AboutPage() {
  return (
    <div className="pb-24">
      <PageHeader 
        title="Our Narrative."
        subtitle="A Legacy of Trust"
        description="With over a decade of experience, we've built more than just a car rental service—we've built a reputation for uncompromising quality."
        breadcrumbs={[{ label: "Story" }]}
      />

      <div className="container">
        {/* Philosophy Quote — Artistic Overlay */}
        <div className="relative glass-card p-12 md:p-20 text-center mb-24 overflow-hidden bg-green-950">
          <Quote className="absolute top-10 left-10 h-20 w-20 text-white/5 -z-0" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-4xl font-heading font-black italic text-white leading-tight">
              &ldquo;{siteConfig.philosophy}&rdquo;
            </blockquote>
            <div className="mt-8 h-px w-24 bg-green-500 mx-auto" />
          </div>
        </div>

        {/* Narrative & Promise — Staggered Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em]">The Beginning</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-green-950 leading-none italic">
                Who We Are.
              </h2>
            </div>
            <div className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed">
              {companyHistory.story.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Our Promise — High Artistic Card */}
            <div className="glass-card p-10 bg-white/60 border-white/80 space-y-6 relative overflow-hidden group">
              <Sparkles className="absolute -top-4 -right-4 h-24 w-24 text-green-500/5 group-hover:scale-125 transition-transform duration-700" />
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100 shadow-sm">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-heading font-black text-green-950 italic">Our Promise.</h3>
              </div>
              <p className="text-gray-500 font-medium text-lg leading-relaxed italic border-l-4 border-green-500 pl-6">
                {companyHistory.promise}
              </p>
            </div>

            {/* Location Pattern — Minimalist */}
            <div className="glass-card p-10 bg-green-50/30 border-green-100 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-900/40">Headquarters Axis</h3>
              <p className="text-xl font-heading font-black text-green-950 leading-tight">
                42 Sabera Tower, Road-52 <br />
                Gulshan-2, Dhaka-1212.
              </p>
              <div className="pt-4 flex items-center gap-2 text-xs font-bold text-green-600">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Ready for Global Concierge
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission — Glass Bento Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: Target, title: "Mission.", text: companyHistory.mission, delay: "0s" },
            { icon: Eye, title: "Vision.", text: companyHistory.vision, delay: "0.1s" },
            { 
              icon: Heart, 
              title: "Morals.", 
              items: companyHistory.values,
              delay: "0.2s"
            },
          ].map((item, idx) => (
            <div 
              key={item.title} 
              className="glass-card p-10 bg-white/40 border-white/60 flex flex-col gap-6 group hover:-translate-y-2 transition-all duration-500"
              style={{ transitionDelay: item.delay }}
            >
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100 group-hover:bg-green-600 transition-colors duration-500">
                <item.icon className="h-7 w-7 text-green-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-3xl font-heading font-black text-green-950 italic">{item.title}</h3>
              {item.text && <p className="text-gray-500 font-medium leading-relaxed">{item.text}</p>}
              {item.items && (
                <ul className="space-y-3">
                  {item.items.map((val) => (
                    <li key={val} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" /> {val}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Team Section — Refined Cards */}
        <div className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em]">The Craftsmen</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-green-950 leading-none italic">
              Our Elite Team.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="glass-card group p-8 bg-white/40 border-white/60 text-center hover:bg-white/80 transition-all duration-500">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-green-100 rounded-2xl rotate-6 transition-transform group-hover:rotate-12 duration-500" />
                  <div className="absolute inset-0 bg-green-950 rounded-2xl flex items-center justify-center transition-transform group-hover:-rotate-3 duration-500">
                    <User className="h-12 w-12 text-white/30" />
                  </div>
                </div>
                <h3 className="text-xl font-heading font-black text-green-950 tracking-tight">{member.name}</h3>
                <p className="text-green-600 text-[10px] font-black uppercase tracking-widest mt-1 mb-4">{member.role}</p>
                <p className="text-gray-400 text-xs font-medium leading-relaxed italic">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choice — Dynamic Grid */}
        <div className="glass-card p-12 md:p-20 bg-green-50/50 border-green-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-black text-green-950 italic">The Jinia Advantage.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white border border-green-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-heading font-black text-green-950 text-lg">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Strip — Artistic Floating */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          {[
            { value: "10+", label: "Legacy Years" },
            { value: "50+", label: "Fleet Select" },
            { value: "100%", label: "Elite Safety" },
            { value: "24/7", label: "Concierge" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-8 bg-green-950 text-center">
              <div className="text-3xl md:text-5xl font-heading font-black text-white italic tracking-tighter mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-green-500/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
