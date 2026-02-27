import { Metadata } from "next";
import {
  companyHistory,
  whyChooseUs,
  siteConfig,
  ourObjectives,
  teamMembers,
} from "@/lib/config";
import { CheckCircle, Target, Eye, Heart, Award, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us | Jinia Enterprise",
  description:
    "Learn about Jinia Enterprise - over 10 years of trusted car rental service in Dhaka. Our mission, vision, and commitment to customer satisfaction.",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-heading font-bold text-green-800">
            About Jinia Enterprise
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {siteConfig.experience}+ years of trusted car rental service in
            Dhaka and all over Bangladesh.
          </p>
        </div>

        {/* Philosophy Quote — Dark Glass */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center mb-16 relative overflow-hidden"
          style={{
            background: "rgba(10, 12, 15, 0.88)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(0,0,0,0.3)",
            borderRight: "1px solid rgba(0,0,0,0.3)",
            boxShadow:
              "0 16px 48px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px]" />
          </div>
          <blockquote className="text-xl md:text-2xl font-heading font-medium italic text-white/90 relative z-10">
            &ldquo;{siteConfig.philosophy}&rdquo;
          </blockquote>
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-green-800">
              Who We Are
            </h2>
            <div className="prose prose-muted max-w-none space-y-4">
              {companyHistory.story.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {/* Our Promise — Glass */}
            <div className="glass-glow rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl icon-glow flex items-center justify-center">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800">
                  Our Promise
                </h3>
              </div>
              <p className="text-gray-600">{companyHistory.promise}</p>
            </div>

            {/* Location — Glass */}
            <div className="glass rounded-xl p-6 space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Head Office
              </h3>
              <p className="text-gray-600">
                42 Sabera Tower, Room-04, Road-52
                <br />
                Gulshan North Commercial Area
                <br />
                Gulshan-2, Dhaka-1212
                <br />
                Bangladesh
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Approximately 20 minutes from Hazrat Shahjalal International
                Airport
              </p>
            </div>
          </div>
        </div>

        {/* Our Team — Glass Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center mb-4 text-green-800">
            Our Team
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Meet the dedicated professionals behind Jinia Enterprise who work
            tirelessly to ensure your complete satisfaction.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                {/* Team Member Photo */}
                <div className="h-48 bg-gradient-to-br from-green-100/50 to-green-200/50 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(74,222,128,0.2)]"
                    style={{
                      background: "rgba(22,163,74,0.9)",
                    }}
                  >
                    <User className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg text-green-800">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission, Vision, Values — Glass Panels */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: companyHistory.mission,
            },
            { icon: Eye, title: "Our Vision", text: companyHistory.vision },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass rounded-xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl icon-glow flex items-center justify-center">
                <Icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800">{title}</h3>
              <p className="text-gray-600 text-sm">{text}</p>
            </div>
          ))}
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl icon-glow flex items-center justify-center">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">Our Morals</h3>
            <ul className="space-y-2">
              {companyHistory.values.map((value) => (
                <li
                  key={value}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Our Objectives — Glass Items */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center mb-10 text-green-800">
            Our Objectives
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {ourObjectives.map((objective, idx) => (
              <div key={idx} className="flex gap-4 p-4 glass rounded-xl">
                <div className="w-6 h-6 rounded-lg icon-glow flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">{objective}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center mb-10 text-green-800">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg icon-glow flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats — Dark Glass */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden"
          style={{
            background: "rgba(10, 12, 15, 0.88)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(0,0,0,0.3)",
            borderRight: "1px solid rgba(0,0,0,0.3)",
            boxShadow:
              "0 16px 48px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500/8 rounded-full blur-[80px]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "15+", label: "Vehicle Types" },
              { value: "16+", label: "Corporate Clients" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Quote */}
        <div className="text-center">
          <p className="text-2xl font-heading font-medium text-green-800 italic">
            &ldquo;For your next car rental, try Jinia — you will come
            back.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
