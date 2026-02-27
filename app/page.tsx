import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import {
  siteConfig,
  services,
  whyChooseUs,
  corporateClients,
} from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import {
  CheckCircle,
  Clock,
  Briefcase,
  Shield,
  Phone,
  Car,
  Bus,
  Calendar,
  User,
  Plane,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const iconMap: { [key: string]: React.ElementType } = {
  car: Car,
  calendar: Calendar,
  briefcase: Briefcase,
  bus: Bus,
  user: User,
  plane: Plane,
  shield: Shield,
};

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Luxury" | "Bus";
  seats: number;
  engine_cc?: number | null;
  features?: string[];
  rental_types?: string[];
  description?: string;
  images?: string[];
  image_url?: string | null;
  starting_price?: number | null;
  price_label?: string;
  is_active: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  is_published: boolean;
  created_at: string;
}

async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .limit(6);
  return (data as Vehicle[]) || [];
}

async function getLatestBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(3);
  return (data as BlogPost[]) || [];
}

export default async function Home() {
  const featuredVehicles = await getFeaturedVehicles();
  const latestBlogPosts = await getLatestBlogPosts();

  return (
    <div className="flex flex-col">
      {/* ════════ HERO SECTION — IMMERSIVE ════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-black/80" />

        {/* Content */}
        <div className="container relative z-10 py-16 md:py-20 lg:py-28">
          <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8">
            {/* Experience Badge */}
            <div className="opacity-0 animate-fade-in-up">
              <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium tracking-wide text-white/95 bg-white/10 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                {siteConfig.experience}+ Years of Excellence
              </span>
            </div>

            {/* Main Heading — Cinematic */}
            <h1 className="opacity-0 animate-fade-in-up animation-delay-100">
              <span className="block text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.9] bg-linear-to-r from-green-300 via-emerald-200 to-green-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(74,222,128,0.3)]">
                THE BEST
              </span>
              <span className="block text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.9] text-white mt-1 md:mt-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                Car Rental
              </span>
              <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight bg-linear-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent mt-1 md:mt-2">
                Service In Your City
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-white/75 max-w-2xl mx-auto font-light leading-relaxed opacity-0 animate-fade-in-up animation-delay-200">
              {siteConfig.tagline}. Premium fleet, professional chauffeurs, and
              an experience you won&apos;t forget.
            </p>

            {/* CTA Buttons — Liquid Glass */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center opacity-0 animate-fade-in-up animation-delay-300">
              <Link href="/vehicles">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2.5 px-8 py-6 text-base bg-green-500/85 hover:bg-green-400/95 text-white border border-green-400/30 shadow-[0_8px_40px_rgba(74,222,128,0.35)] hover:shadow-[0_12px_50px_rgba(74,222,128,0.5)] transition-all duration-500 hover:-translate-y-1"
                >
                  <Calendar className="h-5 w-5" /> Book Now
                </Button>
              </Link>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2.5 px-8 py-6 text-base text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                >
                  <Phone className="h-5 w-5" /> Call Now
                </Button>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2.5 px-8 py-6 text-base bg-emerald-500/75 hover:bg-emerald-400/90 text-white border border-emerald-400/25 shadow-[0_8px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_50px_rgba(16,185,129,0.45)] transition-all duration-500 hover:-translate-y-1"
                >
                  <MessageSquare className="h-5 w-5" /> WhatsApp
                </Button>
              </a>
            </div>

            {/* Quick Booking Widget — Floating Liquid Glass */}
            <div className="opacity-0 animate-fade-in-up animation-delay-400 mt-10 md:mt-12">
              <div className="rounded-3xl p-5 md:p-6 max-w-3xl mx-auto bg-white/8 border border-white/15 shadow-[0_16px_60px_rgba(0,0,0,0.25)]">
                <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-xs text-white/55 font-medium tracking-widest uppercase">
                      Rental Type
                    </label>
                    <select className="w-full h-12 px-4 rounded-2xl bg-white/6 border border-white/12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400/30 transition-all">
                      <option value="daily" className="text-gray-900">
                        Daily Rental
                      </option>
                      <option value="weekly" className="text-gray-900">
                        Weekly Rental
                      </option>
                      <option value="monthly" className="text-gray-900">
                        Monthly Rental
                      </option>
                      <option value="airport" className="text-gray-900">
                        Airport Transfer
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/55 font-medium tracking-widest uppercase">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      className="w-full h-12 px-4 rounded-2xl bg-white/6 border border-white/12 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400/30 transition-all"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/55 font-medium tracking-widest uppercase">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Pickup location"
                      className="w-full h-12 px-4 rounded-2xl bg-white/6 border border-white/12 text-white placeholder:text-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/30 transition-all"
                    />
                  </div>
                  <Link href="/vehicles" className="w-full">
                    <Button
                      type="button"
                      size="lg"
                      className="w-full h-12 bg-green-500/85 hover:bg-green-400 text-white font-semibold border border-green-400/25 shadow-[0_0_30px_rgba(74,222,128,0.25)] rounded-2xl"
                    >
                      Get Quote
                    </Button>
                  </Link>
                </form>
              </div>
            </div>

            {/* Trust Badges — Floating Glass */}
            <div className="pt-6 md:pt-10 opacity-0 animate-fade-in-up animation-delay-500 w-full max-w-4xl mx-auto">
              <div className="rounded-2xl p-5 md:px-8 w-full grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/6 border border-white/12 shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
                {[
                  {
                    value: `${siteConfig.experience}+`,
                    label: "Years Experience",
                  },
                  { value: "50+", label: "Premium Vehicles" },
                  { value: "24/7", label: "Support Available" },
                  { value: "100%", label: "Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(74,222,128,0.25)]">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-white/50 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-500">
          <div className="w-6 h-10 border-2 border-white/15 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ════════ SERVICES ════════ */}
      <section className="py-16 md:py-24 relative">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-green-800">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive mobility solutions adapted to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service) => {
              const IconComponent = iconMap[service.icon] || Car;
              return (
                <Card key={service.id}>
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-xl icon-glow flex items-center justify-center mb-3">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg text-green-800">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button variant="outline" className="gap-2">
                View All Services <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ FEATURED VEHICLES ════════ */}
      {featuredVehicles.length > 0 && (
        <section className="py-16 md:py-24 section-glass">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-green-800">
                Featured Vehicles
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our selection of well-maintained vehicles for every
                occasion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle as any} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/vehicles">
                <Button className="gap-2">
                  View All Vehicles <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ════════ CORPORATE CLIENTS — Marquee ════════ */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container text-center space-y-4 mb-10">
          <p className="text-green-600/80 text-sm font-medium tracking-widest uppercase">
            Trusted Partners
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-green-800">
            Serving Leading Organizations
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Embassies, global NGOs, and top corporations choose us for reliable,
            premium transportation.
          </p>
        </div>

        {/* Marquee Row 1 — scrolls left */}
        <div className="relative mb-4">
          <div className="flex animate-marquee gap-4 w-max">
            {[...corporateClients, ...corporateClients].map((client, i) => (
              <div
                key={`r1-${i}`}
                className="glass glass-hover rounded-xl px-6 py-3 text-sm font-medium text-green-800 whitespace-nowrap flex items-center gap-2 shrink-0"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    client.type === "Embassy"
                      ? "bg-green-500"
                      : client.type === "International Organization"
                        ? "bg-blue-500"
                        : "bg-amber-500"
                  }`}
                />
                {client.name}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 — scrolls right */}
        <div className="relative">
          <div className="flex animate-marquee-reverse gap-4 w-max">
            {[
              ...corporateClients.slice().reverse(),
              ...corporateClients.slice().reverse(),
            ].map((client, i) => (
              <div
                key={`r2-${i}`}
                className="glass glass-hover rounded-xl px-6 py-3 text-sm font-medium text-green-800 whitespace-nowrap flex items-center gap-2 shrink-0"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    client.type === "Embassy"
                      ? "bg-green-500"
                      : client.type === "International Organization"
                        ? "bg-blue-500"
                        : "bg-amber-500"
                  }`}
                />
                {client.name}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/clients">
            <Button
              variant="outline"
              className="gap-2 text-green-700 border-green-200 hover:bg-green-50"
            >
              View All Clients <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ════════ WHY CHOOSE US ════════ */}
      <section className="py-16 md:py-24 section-glass">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-green-800">
                Why Choose Jinia Enterprise?
              </h2>
              <div className="space-y-6">
                {whyChooseUs.slice(0, 4).map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg icon-glow flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-gray-800">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <Button variant="outline" className="gap-2">
                  Learn More About Us <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl flex items-center justify-center p-8 glass-glow">
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-heading font-bold text-green-800 italic leading-relaxed">
                    &ldquo;{siteConfig.philosophy}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ LATEST ARTICLES ════════ */}
      {latestBlogPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-green-800">
                Latest Articles
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay informed with our latest tips, guides, and updates from the
                car rental industry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestBlogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full group">
                    <div className="aspect-video bg-gradient-to-br from-green-50/50 to-green-100/50 flex items-center justify-center overflow-hidden">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <span className="text-4xl">📰</span>
                      )}
                    </div>
                    <CardHeader>
                      <div className="text-xs text-gray-500 mb-2">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <CardTitle className="text-lg group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                      <div className="mt-4 text-green-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Read More <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/blog">
                <Button variant="outline" className="gap-2">
                  View All Articles <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ════════ CTA SECTION ════════ */}
      <section className="py-16 md:py-24 section-glass-dark relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/8 rounded-full blur-[100px]" />
        </div>

        <div className="container text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            &ldquo;For your next car rental, try Jinia — you will come
            back&rdquo;
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Experience the premium service standard that has made us the trusted
            choice for embassies and corporations in Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-white/90 text-green-800 hover:bg-white border border-white/50 font-bold shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <Phone className="h-5 w-5" /> {siteConfig.phone}
              </Button>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                <MessageSquare className="h-5 w-5" /> WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
