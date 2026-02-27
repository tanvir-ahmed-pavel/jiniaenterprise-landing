import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer
      className="relative z-10 mt-20"
      style={{
        background: "rgba(10, 25, 18, 0.95)",
        borderTop: "1px solid rgba(74, 222, 128, 0.15)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        color: "white",
      }}
    >
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="Jinia Enterprise"
                className="h-12 w-auto brightness-150"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {siteConfig.tagline}. Over {siteConfig.experience} years serving
              corporate clients, embassies, and individuals with a focus on
              customer satisfaction.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(74, 222, 128, 0.2)",
                  border: "1px solid rgba(74, 222, 128, 0.2)",
                  boxShadow: "0 0 15px rgba(74, 222, 128, 0.1)",
                }}
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(74, 222, 128, 0.2)",
                  border: "1px solid rgba(74, 222, 128, 0.2)",
                  boxShadow: "0 0 15px rgba(74, 222, 128, 0.1)",
                }}
                aria-label="Call"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-green-400/80">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-green-400 transition-colors duration-300 inline-flex items-center gap-1 hover:gap-2"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  Vehicle Fleet
                </Link>
              </li>
              <li>
                <Link
                  href="/clients"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  Our Clients
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-green-400/80">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
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
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-green-400/80">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-400/80" />
                <span>
                  40/2 Unicorn Plaza, Level #2, Office #9&10
                  <br />
                  Gulshan-2, Dhaka-1212
                  <br />
                  Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-amber-400/80" />
                <div className="flex flex-col">
                  <a
                    href="tel:+8801716633445"
                    className="hover:text-green-400 transition-colors duration-300 font-medium"
                  >
                    +88 01716 633445
                  </a>
                  <a
                    href="tel:+8801976633445"
                    className="hover:text-green-400 transition-colors duration-300"
                  >
                    +88 01976 633445
                  </a>
                  <a
                    href="tel:+88029899500"
                    className="hover:text-green-400 transition-colors duration-300"
                  >
                    +88 02 989 9500
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-amber-400/80" />
                <a
                  href="mailto:jiniaenterprise.com@gmail.com"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  jiniaenterprise.com@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500"
          style={{ borderTop: "1px solid rgba(74, 222, 128, 0.1)" }}
        >
          <p>
            &copy; {new Date().getFullYear()} Jinia Enterprise. All rights
            reserved.
          </p>
          <p className="italic text-green-400/60 font-medium">
            &ldquo;{siteConfig.philosophy}&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
