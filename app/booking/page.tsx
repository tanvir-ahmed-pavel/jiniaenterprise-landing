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

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-green-50 via-white to-green-50 py-16 md:py-20">
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
              <BookingForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
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
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
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
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
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

              {/* Office Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
                  Visit Our Office
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <div className="text-gray-600">
                      {siteConfig.address.line1}
                      <br />
                      {siteConfig.address.line2}
                      <br />
                      {siteConfig.address.area}, {siteConfig.address.city}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-green-600 shrink-0" />
                    <div className="text-gray-600">
                      Sat - Thu: 9:00 AM - 8:00 PM
                      <br />
                      Friday: 10:00 AM - 6:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Book With Us */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
                  Why Book With Us?
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Premium, well-maintained vehicles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Professional, trained chauffeurs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Flexible rental options
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    24/7 customer support
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Competitive, transparent pricing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    10+ years of trusted service
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
