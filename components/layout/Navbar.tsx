"use client";

import Link from "next/link";
import Image from "next/image";
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
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 shadow-sm shadow-primary/5">
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
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
              className="hidden lg:flex gap-2 border-primary text-primary hover:bg-primary/5 hover:text-primary transition-all"
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
              className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex items-center space-x-2 md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-primary/10 p-4 bg-white">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-primary/10">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-primary text-primary hover:bg-primary/5"
                >
                  <Phone className="h-4 w-4" /> {siteConfig.phone}
                </Button>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-white shadow-md">
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
