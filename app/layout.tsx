import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1912",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jiniaenterprise.com"),
  title: {
    default: "Jinia Enterprise | Premier Car & Bus Rental Service in Dhaka",
    template: "%s | Jinia Enterprise",
  },
  description:
    "Reliable car rental service in Dhaka. 10+ years of trusted corporate & luxury transport. Daily, monthly, and long-term rentals for embassies, corporations, and individuals.",
  keywords: [
    "car rental Dhaka",
    "corporate car rental Bangladesh",
    "bus rental Dhaka",
    "luxury car hire Dhaka",
    "airport transfer Dhaka",
    "chauffeur service Bangladesh",
    "embassy car rental",
    "monthly car rental Dhaka",
    "Jinia Enterprise",
  ],
  authors: [{ name: "Jinia Enterprise" }],
  creator: "Jinia Enterprise",
  publisher: "Jinia Enterprise",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://jiniaenterprise.com",
    siteName: "Jinia Enterprise",
    title: "Jinia Enterprise | Premier Car & Bus Rental Service in Dhaka",
    description:
      "Reliable car rental service in Dhaka. 10+ years of trusted corporate & luxury transport.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jinia Enterprise - Car Rental Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jinia Enterprise | Car Rental Dhaka",
    description:
      "Reliable car rental service in Dhaka. 10+ years of trusted corporate & luxury transport.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://jiniaenterprise.com",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
  },
};

// JSON-LD Schema
function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://jiniaenterprise.com",
    name: siteConfig.name,
    description: siteConfig.description,
    url: "https://jiniaenterprise.com",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.7937",
      longitude: "90.4049",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    image: "https://jiniaenterprise.com/og-image.jpg",
    sameAs: [siteConfig.socialLinks.facebook, siteConfig.socialLinks.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Car Rental Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Daily Car Rental",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Monthly Car Rental",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Car Rental",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bus Rental",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <LocalBusinessSchema />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col relative",
          inter.variable,
          outfit.variable,
        )}
        suppressHydrationWarning
      >
        {/* Animated Liquid Glass Background Mesh */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[hsl(var(--background))]">
          {/* Primary green blob */}
          <div className="absolute top-[-10%] -left-[5%] w-[500px] h-[500px] bg-green-400/50 rounded-full filter blur-[100px] animate-blob"></div>
          {/* Emerald accent blob */}
          <div className="absolute top-[10%] -right-[5%] w-[450px] h-[450px] bg-emerald-400/40 rounded-full filter blur-[100px] animate-blob-reverse animation-delay-2000"></div>
          {/* Teal bottom blob */}
          <div className="absolute -bottom-[10%] left-[15%] w-[500px] h-[500px] bg-teal-400/40 rounded-full filter blur-[100px] animate-blob animation-delay-4000"></div>
          {/* Cyan center blob */}
          <div className="absolute top-[40%] left-[40%] w-[350px] h-[350px] bg-cyan-300/40 rounded-full filter blur-[120px] animate-blob-reverse animation-delay-3000"></div>
          {/* Lime accent blob */}
          <div className="absolute top-[60%] right-[20%] w-[350px] h-[350px] bg-lime-300/40 rounded-full filter blur-[100px] animate-blob animation-delay-5000"></div>
        </div>

        <Navbar />
        <main className="flex-1 relative z-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
