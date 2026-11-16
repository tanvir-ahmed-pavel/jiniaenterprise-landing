import Image from "next/image";
import Link from "next/link";
import { OpenWizardButton } from "@/components/wizard/OpenWizardButton";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";
import { siteConfig } from "@/lib/config";

const columns = [
  {
    title: "Ride",
    links: [
      { href: "/booking", label: "Booking form" },
      { href: "/vehicles", label: "The fleet" },
      { href: "/airport-car-rental", label: "Airport transfers" },
      { href: "/corporate-car-rental", label: "Corporate & embassy" },
      { href: "/monthly-car-rental", label: "Monthly with driver" },
      { href: "/car-rental-with-driver", label: "Car rental with driver" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/routes", label: "Outstation routes" },
      { href: "/locations", label: "Areas we cover" },
      { href: "/pricing", label: "Pricing" },
      { href: "/compare", label: "Compare" },
      { href: "/reviews", label: "Reviews" },
      { href: "/blog", label: "Journal" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Jinia" },
      { href: "/faq", label: "FAQ" },
      { href: "/policies", label: "Policies" },
      { href: "/glossary", label: "Glossary" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const tel = siteConfig.phone.replace(/\s/g, "");

  return (
    <footer className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-forest-deep text-paper">
      <div className="container pt-14 sm:pt-16">
        {/* Brand + actions */}
        <div className="flex flex-col gap-8 border-b border-paper/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Jinia Enterprise, home">
            <span className="flex h-14 items-center justify-center rounded-2xl bg-paper px-2.5">
              <Image src="/images/logo.png" alt="" width={300} height={242} className="h-10 w-auto" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-2xl font-semibold tracking-[-0.03em]">Jinia Enterprise</span>
              <span className="mt-1.5 text-sm text-paper/55">Chauffeur-driven cars across Dhaka and Bangladesh, since 2014.</span>
            </span>
          </Link>
          <div className="flex flex-wrap gap-2">
            <OpenWizardButton className="group inline-flex h-12 items-center gap-2 rounded-full bg-gold pl-5 pr-1.5 text-sm font-semibold text-ink transition-colors hover:bg-paper">
              Request a car <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper transition-transform group-hover:translate-x-0.5"><ArrowRight className="h-3.5 w-3.5" /></span>
            </OpenWizardButton>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`} className="group inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-paper/20 transition-colors hover:bg-paper hover:text-ink">
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> <span className="tabular-nums">{whatsappDisplay}</span> <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
            </a>
            <a href={`tel:${tel}`} className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-paper/20 transition-colors hover:bg-paper hover:text-ink">
              <Phone className="h-4 w-4" /> Call
            </a>
          </div>
        </div>

        {/* Links + office */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/40">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group inline-flex items-center gap-1 py-3 -my-3 text-sm text-paper/75 transition-colors hover:text-paper">
                      {l.label}
                      <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="space-y-4 text-sm sm:col-span-2 lg:col-span-4 lg:col-start-9">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/40">Office</p>
            <a href="https://maps.google.com/?q=Unicorn+Plaza+Gulshan+Dhaka" target="_blank" rel="noopener noreferrer" className="flex gap-3 py-2.5 -my-2.5 text-paper/75 transition-colors hover:text-paper">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{siteConfig.address.line1}, {siteConfig.address.line2}<br />{siteConfig.address.city}, {siteConfig.address.country}</span>
            </a>
            <a href={`tel:${siteConfig.phone2.replace(/\s/g, "")}`} className="flex gap-3 py-2.5 -my-2.5 text-paper/75 transition-colors hover:text-paper">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{siteConfig.phone} · {siteConfig.phone2}<br />{siteConfig.phone3}</span>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex gap-3 break-all py-3 -my-3 text-paper/75 transition-colors hover:text-paper">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{siteConfig.email}</span>
            </a>
            <p className="pl-7 text-paper/50">Sat–Thu 9am–8pm · Fri 10am–6pm</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/10 py-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Jinia Enterprise. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/policies" className="inline-flex items-center py-3.5 -my-3.5 hover:text-paper">Policies</Link>
            <Link href="/contact" className="inline-flex items-center py-3.5 -my-3.5 hover:text-paper">Contact</Link>
            <a href="#top" className="inline-flex items-center py-3.5 -my-3.5 hover:text-paper">Back to top ↑</a>
          </div>
        </div>
      </div>

      {/* Wordmark: the brand set once, large and quiet. */}
      <p aria-hidden className="pointer-events-none -mb-[3vw] select-none whitespace-nowrap text-center leading-[0.8]">
        <span className="font-heading text-[19vw] font-semibold tracking-[-0.06em] text-paper/[0.07]">Jinia</span>
        <span className="type-accent text-[19vw] text-gold/[0.18]"> Ent.</span>
      </p>
    </footer>
  );
}
