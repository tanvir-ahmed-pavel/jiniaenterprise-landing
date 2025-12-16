import { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Phone, Mail, MapPin, Clock, MessageSquare, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Jinia Enterprise",
  description:
    "Get in touch with Jinia Enterprise for car rental inquiries. Call us, WhatsApp, or send a message. Located in Gulshan-2, Dhaka.",
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-heading font-bold text-green-700">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or ready to book? Reach out to us through any
            channel below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-green-700">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {/* Phone Numbers */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <div className="space-y-1">
                      <a
                        href="tel:+8801716633445"
                        className="text-gray-600 hover:text-green-600 block"
                      >
                        +88 01716 633445
                      </a>
                      <a
                        href="tel:+8801976633445"
                        className="text-gray-600 hover:text-green-600 block"
                      >
                        +88 01976 633445
                      </a>
                      <a
                        href="tel:+88029899500"
                        className="text-gray-600 hover:text-green-600 block"
                      >
                        +88 02 989 9500
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                    <a
                      href="https://wa.me/8801716633445"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600"
                    >
                      +88 01716 633445
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a
                      href="mailto:jiniaenterprise.com@gmail.com"
                      className="text-gray-600 hover:text-green-600"
                    >
                      jiniaenterprise.com@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Website</h3>
                    <span className="text-gray-600">
                      www.jiniaenterprise.com
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Office Address
                    </h3>
                    <address className="not-italic text-gray-600">
                      42 Sabera Tower, Room-04, Road-52
                      <br />
                      Gulshan North Commercial Area
                      <br />
                      Gulshan-2, Dhaka-1212
                      <br />
                      Bangladesh
                    </address>
                    <p className="text-sm text-gray-500 mt-2">
                      ~20 minutes from Hazrat Shahjalal International Airport
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Saturday - Thursday: 9:00 AM - 8:00 PM
                      <br />
                      Friday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4">
              <a href="tel:+8801716633445" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full gap-2 border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </a>
              <a
                href="https://wa.me/8801716633445"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>

            {/* Map - Gulshan-2 area */}
            <div className="rounded-xl overflow-hidden h-64 bg-green-50 border border-green-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0164267879956!2d90.41455431498149!3d23.793769084567995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70dab33%3A0x4b606d63ecb0c1a5!2sGulshan%202%20Circle!5e0!3m2!1sen!2sbd!4v1702700000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jinia Enterprise Location - Gulshan-2"
              />
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-700">
                Send Us a Message
              </CardTitle>
              <p className="text-sm text-gray-600">
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </p>
            </CardHeader>
            <CardContent>
              <InquiryForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
