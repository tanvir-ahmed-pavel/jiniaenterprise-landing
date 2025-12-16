import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-green-100 bg-green-50/50">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <div className="font-heading text-lg font-bold">
                <span className="text-green-600">JINIA</span>
                <span className="text-gray-700 ml-1">ENTERPRISE</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {siteConfig.tagline}. Over {siteConfig.experience} years serving
              corporate clients, embassies, and individuals with a focus on
              customer satisfaction.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition-colors"
                aria-label="Call"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-green-700">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/about"
                  className="hover:text-green-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-green-600 transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles"
                  className="hover:text-green-600 transition-colors"
                >
                  Vehicle Fleet
                </Link>
              </li>
              <li>
                <Link
                  href="/clients"
                  className="hover:text-green-600 transition-colors"
                >
                  Our Clients
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-600 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-green-700">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Daily & Weekly Rental</li>
              <li>Monthly & Long-term Leasing</li>
              <li>Corporate Transport</li>
              <li>Airport Pick & Drop</li>
              <li>Group Transportation</li>
              <li>Chauffeur Service</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-green-700">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-green-600" />
                <span>
                  42 Sabera Tower, Room-04, Road-52
                  <br />
                  Gulshan North Commercial Area
                  <br />
                  Gulshan-2, Dhaka-1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-green-600" />
                <div className="flex flex-col">
                  <a
                    href="tel:+8801716633445"
                    className="hover:text-green-600 transition-colors"
                  >
                    +88 01716 633445
                  </a>
                  <a
                    href="tel:+8801976633445"
                    className="hover:text-green-600 transition-colors"
                  >
                    +88 01976 633445
                  </a>
                  <a
                    href="tel:+88029899500"
                    className="hover:text-green-600 transition-colors"
                  >
                    +88 02 989 9500
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-green-600" />
                <a
                  href="mailto:jiniaenterprise.com@gmail.com"
                  className="hover:text-green-600 transition-colors"
                >
                  jiniaenterprise.com@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-green-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Jinia Enterprise. All rights
            reserved.
          </p>
          <p className="italic text-green-700">
            &ldquo;{siteConfig.philosophy}&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
