import { Metadata } from "next";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Phone, Mail, MapPin, Clock, MessageSquare, Globe, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Contact Us | Jinia Enterprise",
  description:
    "Get in touch with Jinia Enterprise for car rental inquiries. Call us, WhatsApp, or send a message. Located in Gulshan-2, Dhaka.",
};

export default function ContactPage() {
  return (
    <div className="pb-24">
      <PageHeader 
        title="Connect."
        subtitle="Global Concierge Axis"
        description="Whether you're planning a diplomatic mission or a personal journey, our team is ready to facilitate your mobility in Dhaka."
        breadcrumbs={[{ label: "Connect" }]}
      />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Contact Information Axis */}
          <div className="space-y-12 animate-fade-in-up">
            <div className="space-y-4">
              <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em]">Direct Channels</span>
              <h2 className="text-4xl font-heading font-black text-green-950 leading-none italic">
                Get in Touch.
              </h2>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {[
                {
                  icon: Phone,
                  title: "Phone Axis",
                  content: (
                    <div className="flex flex-col gap-1 font-bold text-gray-600">
                      <a href="tel:+8801716633445" className="hover:text-green-600 transition-colors">+88 01716 633445</a>
                      <a href="tel:+8801976633445" className="hover:text-green-600 transition-colors">+88 01976 633445</a>
                    </div>
                  ),
                },
                {
                  icon: MessageSquare,
                  title: "WhatsApp",
                  content: (
                    <a
                      href="https://wa.me/8801716633445"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-gray-600 hover:text-green-600 transition-colors"
                    >
                      +88 01716 633445 (Online)
                    </a>
                  ),
                },
                {
                  icon: Mail,
                  title: "Digital Mail",
                  content: (
                    <a
                      href="mailto:jiniaenterprise.com@gmail.com"
                      className="font-bold text-gray-600 hover:text-green-600 transition-colors"
                    >
                      jiniaenterprise.com@gmail.com
                    </a>
                  ),
                },
                {
                  icon: MapPin,
                  title: "Headquarters",
                  content: (
                    <address className="not-italic text-gray-500 font-medium leading-relaxed">
                      42 Sabera Tower, Road-52, <br />
                      Gulshan North Commercial Area, <br />
                      Gulshan-2, Dhaka-1212.
                    </address>
                  ),
                },
              ].map(({ icon: Icon, title, content }) => (
                <div key={title} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl icon-glow flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                    <Icon className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-900/40">{title}</h3>
                    <div className="text-base">{content}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Map Frame */}
            <div className="relative glass-card p-2 bg-white/40 border-white/60 overflow-hidden group">
              <div className="aspect-video rounded-2xl overflow-hidden grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0164267879956!2d90.41455431498149!3d23.793769084567995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70dab33%3A0x4b606d63ecb0c1a5!2sGulshan%202%20Circle!5e0!3m2!1sen!2sbd!4v1702700000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Jinia Enterprise Location"
                />
              </div>
            </div>
          </div>

          {/* Artistic Form Container */}
          <div className="relative lg:sticky lg:top-32">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl -z-10" />
            <div className="glass-card p-8 md:p-12 bg-white/70 border-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
              <div className="mb-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-[10px] font-black uppercase tracking-widest text-green-600">
                  <Sparkles className="h-3 w-3" /> Secure Submission
                </div>
                <h2 className="text-3xl font-heading font-black text-green-950 italic">Send a Message.</h2>
                <p className="text-gray-400 font-medium text-sm">Our team typically responds within 30 minutes during business hours.</p>
              </div>
              <InquiryForm source="contact_page" />
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="glass-card p-6 bg-green-50/50 text-center">
                <div className="text-2xl font-heading font-black text-green-950 italic">98%</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-green-900/40">Response Rate</div>
              </div>
              <div className="glass-card p-6 bg-green-50/50 text-center">
                <div className="text-2xl font-heading font-black text-green-950 italic">10+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-green-900/40">Support Agents</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
