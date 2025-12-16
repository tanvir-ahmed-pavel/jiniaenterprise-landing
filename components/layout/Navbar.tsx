"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/vehicles", label: "Vehicles" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/clients", label: "Clients" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo - Green themed */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
            <span className="text-white font-bold text-lg">J</span>
          </div>
          <div className="font-heading text-xl font-bold">
            <span className="text-green-600">JINIA</span>
            <span className="text-gray-700 ml-1">ENTERPRISE</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex gap-2 border-green-600 text-green-600 hover:bg-green-50"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">{siteConfig.phone}</span>
              <span className="xl:hidden">Call</span>
            </Button>
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex items-center space-x-2 md:hidden text-green-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-green-100 p-4 bg-white">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600 py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-green-100">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-green-600 text-green-600"
                >
                  <Phone className="h-4 w-4" /> {siteConfig.phone}
                </Button>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <MessageSquare className="h-4 w-4" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
