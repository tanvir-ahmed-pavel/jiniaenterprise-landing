import { BookingForm } from "@/components/forms/BookingForm";
import { siteConfig } from "@/lib/config";
import { Phone, MessageSquare, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Vehicle | Car Rental Reservation",
  description:
    "Book your car rental with Jinia Enterprise. Choose from our premium fleet of vehicles for daily, weekly, or monthly rentals in Dhaka.",
};

import { createClient } from "@/lib/supabase/server";

export default async function BookingPage() {
  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .order("name");

  return (
    <div className="min-h-screen">
      {/* Hero Section — Glass */}
      <section className="py-16 md:py-20 section-glass">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-green-800">
              Book Your Ride
            </h1>
            <p className="text-lg text-gray-600">
              Reserve a vehicle from our premium fleet. Our team will contact
              you within 2 hours to confirm your booking.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <BookingForm vehicles={vehicles || []} />
            </div>

            {/* Sidebar — Glass Panels */}
            <div className="space-y-6">
              {/* Quick Contact — Glass */}
              <div className="glass-glow rounded-xl p-6">
                <h3 className="text-lg font-heading font-bold text-green-800 mb-4">
                  Need Immediate Help?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  For urgent bookings or special requirements, contact us
                  directly:
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(74,222,128,0.15)]"
                      style={{ background: "rgba(22,163,74,0.85)" }}
                    >
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Call Us
                      </div>
                      <div className="text-sm text-gray-600">
                        {siteConfig.phone}
                      </div>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      style={{ background: "rgba(16,185,129,0.85)" }}
                    >
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        WhatsApp
                      </div>
                      <div className="text-sm text-gray-600">Chat with us</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Office Info — Glass */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
                  Visit Our Office
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg icon-glow flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-gray-600">
                      {siteConfig.address.line1}
                      <br />
                      {siteConfig.address.line2}
                      <br />
                      {siteConfig.address.area}, {siteConfig.address.city}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg icon-glow flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-gray-600">
                      Sat - Thu: 9:00 AM - 8:00 PM
                      <br />
                      Friday: 10:00 AM - 6:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Book With Us — Glass */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
                  Why Book With Us?
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    "Premium, well-maintained vehicles",
                    "Professional, trained chauffeurs",
                    "Flexible rental options",
                    "24/7 customer support",
                    "Competitive, transparent pricing",
                    "10+ years of trusted service",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
