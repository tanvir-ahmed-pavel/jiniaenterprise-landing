"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Only go transparent on the homepage; every other page always uses the solid style
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out ${
        isTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white/90 border-b border-gray-200/70 shadow-sm"
      }`}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Jinia Enterprise"
            className={`h-12 w-auto transition-all duration-300 ${
              isTransparent ? "drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]" : ""
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                isTransparent
                  ? "text-white hover:bg-white/15 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                  : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`}
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
              className={`hidden lg:flex gap-2 transition-all duration-200 ${
                isTransparent
                  ? "border-white/30 text-white hover:bg-white/15 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
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
            <Button size="sm" className="gap-2 shadow-md">
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`flex items-center md:hidden w-11 h-11 rounded-xl border justify-center transition-all duration-200 ${
            isTransparent
              ? "bg-black/20 border-white/25 text-white hover:bg-black/30"
              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div
          className={`md:hidden p-4 ${
            isTransparent
              ? "bg-gray-900/92 border-t border-white/10"
              : "bg-white/97 border-t border-gray-100"
          }`}
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                  isTransparent
                    ? "text-white hover:bg-white/10 hover:text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div
              className={`flex flex-col gap-2 pt-4 mt-2 border-t ${
                isTransparent ? "border-white/15" : "border-gray-200"
              }`}
            >
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Button
                  variant="outline"
                  className={`w-full gap-2 ${
                    isTransparent
                      ? "border-white/25 text-white hover:bg-white/10"
                      : ""
                  }`}
                >
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
