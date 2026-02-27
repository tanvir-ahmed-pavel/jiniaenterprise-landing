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
    { href: "/booking", label: "Book Now" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(24px) saturate(1.8)",
        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow:
          "0 4px 30px rgba(0, 0, 0, 0.05), inset 0 -1px 0 rgba(74, 222, 128, 0.1)",
      }}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Jinia Enterprise"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/50 hover:text-green-700 hover:shadow-[0_2px_12px_rgba(74,222,128,0.1)]"
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
              className="hidden lg:flex gap-2"
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
            <Button size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex items-center space-x-2 md:hidden w-10 h-10 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 justify-center text-green-700 transition-all duration-300 hover:bg-white/60"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div
          className="md:hidden p-4"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-700 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/60 hover:text-green-700"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-white/30">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="h-4 w-4" /> {siteConfig.phone}
                </Button>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full gap-2">
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
