import React, { type ElementType } from "react";
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
import { HeroBookingWidget } from "@/components/forms/HeroBookingWidget";
import {
  siteConfig,
  services,
  whyChooseUs,
  corporateClients,
} from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import {
  CheckCircle,
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
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: { [key: string]: ElementType } = {
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
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
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
  sort_order: number;
  is_featured: boolean;
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
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(6);

  if (error) {
    // Fallback: is_featured/sort_order columns may not exist yet.
    // Run: ALTER TABLE vehicles ADD COLUMN sort_order INTEGER DEFAULT 0;
    //      ALTER TABLE vehicles ADD COLUMN is_featured BOOLEAN DEFAULT false;
    const { data: fallbackData } = await supabase
      .from("vehicles")
      .select("*")
      .eq("is_active", true)
      .limit(6);
    return (fallbackData as Vehicle[]) || [];
  }

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
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden -mt-16">
        {/* Background Image with Parallax-like feel */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />

        {/* Cinematic Gradient Overlay — More Nuanced */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-[hsl(var(--background))]" />

        {/* Content */}
        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-6xl mx-auto text-center">
            {/* Experience Badge — More Minimalist */}
            <div className="opacity-0 animate-fade-in-up mb-8">
              <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/90 bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-glow-pulse" />
                {siteConfig.experience}+ Years of Premium Service
              </span>
            </div>

            {/* Main Heading — Artistic & Bold */}
            <div className="opacity-0 animate-fade-in-up animation-delay-100 mb-8 space-y-2">
              <h1 className="font-heading font-black tracking-tighter leading-none italic">
                <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] bg-linear-to-r from-emerald-300 via-white to-green-300 bg-clip-text text-transparent">
                  JINIA
                </span>
                <span className="block text-4xl sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] text-white -mt-2 sm:-mt-6 drop-shadow-2xl">
                  ENTERPRISE
                </span>
              </h1>
              <p className="text-amber-400 text-lg sm:text-2xl md:text-3xl font-heading font-light tracking-[0.15em] uppercase px-4 max-w-4xl mx-auto">
                {siteConfig.subtitle}
              </p>
            </div>

            {/* Subtitle — Clean Minimalist */}
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto font-medium leading-relaxed opacity-0 animate-fade-in-up animation-delay-200 mb-10 px-6">
              {siteConfig.tagline}. Professional chauffeurs, premium fleet, and 
              bespoke mobility solutions tailored for excellence.
            </p>

            {/* CTA Buttons — High Contrast */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up animation-delay-300 mb-16">
              <Link href="/vehicles" className="group/cta w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-3 px-10 py-7 text-base bg-white text-green-950 hover:bg-green-50 rounded-2xl shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] transition-all duration-500 hover:-translate-y-1 font-bold"
                >
                  <Calendar className="h-5 w-5" /> Book Your Ride
                </Button>
              </Link>
              
              <div className="flex gap-4 w-full sm:w-auto">
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex-1 sm:flex-none">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-8 py-7 text-white border-white/20 bg-white/5 hover:bg-white/10 rounded-2xl backdrop-blur-md transition-all duration-500"
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-3 px-8 py-7 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-lg transition-all duration-500"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="hidden sm:inline font-bold">WhatsApp</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Quick Booking Widget — More Integrated */}
            <div className="opacity-0 animate-fade-in-up animation-delay-400 mt-12 px-2 relative z-20">
              <HeroBookingWidget />
            </div>
          </div>
        </div>

        {/* Decorative Scroll Line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-500 flex flex-col items-center gap-4">
          <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
          <div className="w-px h-16 bg-linear-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ════════ SERVICES — ARTISTIC BENTO GRID ════════ */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-white/40">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full blur-[120px] -z-10 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[100px] -z-10 opacity-60" />

        <div className="container space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-green-600 text-xs font-black uppercase tracking-[0.2em]">What we offer</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-green-950 leading-[0.9]">
              Premium Mobility <br />
              <span className="text-green-500/50">Solutions.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl font-medium leading-relaxed">
              Adaptable transportation services designed for the highest standards of reliability and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Car;
              // Modern staggered layout logic
              const isLarge = idx === 0 || idx === 7;
              
              return (
                <div 
                  key={service.id} 
                  className={cn(
                    "glass-card p-8 group flex flex-col justify-between min-h-[280px]",
                    isLarge ? "lg:col-span-2 lg:bg-white/80" : "bg-white/40"
                  )}
                >
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-green-900/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-black/[0.03]">
                      <IconComponent className="h-7 w-7 text-green-700" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-heading font-black text-green-950 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <Link 
                      href={`/services#${service.id}`}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-700 hover:text-green-500 transition-colors"
                    >
                      Learn More <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-8">
            <Link href="/services">
              <Button variant="outline" className="px-10 py-6 rounded-2xl border-green-200 text-green-800 hover:bg-green-50 gap-3 font-bold group">
                Explore All Services 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ FEATURED VEHICLES ════════ */}
      {featuredVehicles.length > 0 && (
        <section className="py-24 sm:py-32">
          <div className="container space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="max-w-xl space-y-4">
                <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em] italic">The Collection</span>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-green-950 leading-none italic">
                  Premier <br /> <span className="text-green-500/50">Selections.</span>
                </h2>
              </div>
              <Link href="/vehicles">
                <Button variant="outline" className="px-10 py-6 rounded-2xl border-green-200 text-green-800 hover:bg-green-50 gap-3 font-bold group">
                  View All Fleet <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ CORPORATE CLIENTS — ARTISTIC MARQUEE ════════ */}
      <section className="py-24 sm:py-32 overflow-hidden bg-green-50/30">
        <div className="container mb-16 text-center">
            <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em] italic">Global Network</span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-green-950 mt-4 italic">
              Serving the <span className="text-green-500/40">Excellence.</span>
            </h2>
        </div>

        {/* Marquee Row 1 */}
        <div className="relative mb-6 pause-on-hover">
          <div className="flex animate-marquee gap-6 w-max">
            {[...corporateClients, ...corporateClients].map((client, i) => (
              <div
                key={`r1-${i}`}
                className="glass-card px-10 py-5 bg-white/60 border-white/80 text-[10px] font-black uppercase tracking-[0.2em] text-green-900/60 whitespace-nowrap flex items-center gap-4 group hover:bg-green-950 hover:text-white transition-all duration-500"
              >
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  client.type === "Embassy" ? "bg-green-500" : client.type === "International Organization" ? "bg-blue-500" : "bg-amber-500"
                )} />
                {client.name}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 */}
        <div className="relative pause-on-hover">
          <div className="flex animate-marquee-reverse gap-6 w-max">
            {[...corporateClients.slice().reverse(), ...corporateClients.slice().reverse()].map((client, i) => (
              <div
                key={`r2-${i}`}
                className="glass-card px-10 py-5 bg-white/60 border-white/80 text-[10px] font-black uppercase tracking-[0.2em] text-green-900/60 whitespace-nowrap flex items-center gap-4 group hover:bg-green-950 hover:text-white transition-all duration-500"
              >
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  client.type === "Embassy" ? "bg-green-500" : client.type === "International Organization" ? "bg-blue-500" : "bg-amber-500"
                )} />
                {client.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ WHY CHOOSE US — ARTISTIC LAYOUT ════════ */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em] italic">The Difference</span>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-green-950 leading-none italic">
                  Why Choice <br /> <span className="text-green-500/50">Matters.</span>
                </h2>
              </div>
              
              <div className="space-y-10">
                {whyChooseUs.slice(0, 4).map((item) => (
                  <div key={item.title} className="flex gap-8 group">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-green-100 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-green-950 group-hover:text-white transition-all duration-500">
                      <CheckCircle className="h-6 w-6 text-green-600 group-hover:text-white" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-heading font-black text-green-950 text-xl italic">{item.title}</h4>
                      <p className="text-gray-500 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-auto md:aspect-square glass-card rounded-[3rem] p-10 sm:p-12 md:p-20 flex flex-col items-start md:items-center justify-center bg-green-950 text-left md:text-center overflow-hidden">
                <Quote className="absolute top-10 left-10 h-32 w-32 text-white/5 -z-0" />
                <div className="relative z-10 space-y-8">
                  <p className="text-2xl md:text-4xl font-heading font-black text-white italic leading-tight">
                    &ldquo;{siteConfig.philosophy}&rdquo;
                  </p>
                  <Link href="/about">
                    <Button variant="outline" className="h-14 px-10 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-[0.2em] text-[10px]">
                      Discover Our Story
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ARTICLES — CLEAN MINIMAL ════════ */}
      {latestBlogPosts.length > 0 && (
        <section className="py-24 sm:py-32 bg-white/40">
          <div className="container space-y-16">
            <div className="text-center space-y-4">
              <span className="text-green-600 text-[10px] font-black uppercase tracking-[0.3em] italic">The Journal</span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-green-950 italic">Travel <span className="text-green-500/40">Narratives.</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestBlogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <div className="glass-card overflow-hidden h-full flex flex-col bg-white border-white/60">
                    <div className="aspect-[16/10] overflow-hidden bg-green-50">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl grayscale opacity-20">📰</div>
                      )}
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-600">
                          {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <h3 className="text-xl font-heading font-black text-green-950 group-hover:text-green-600 transition-colors line-clamp-2 italic">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="pt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-950 group-hover:gap-4 transition-all duration-500">
                        Read Story <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ FINAL CTA — ARTISTIC GLASS DARK ════════ */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-x-8 bottom-8 top-0 glass-dark rounded-[3rem] sm:rounded-[4rem] -z-10" />
        
        <div className="container relative z-10 text-center space-y-12">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-white italic leading-tight">
              &ldquo;Try Jinia — <br /> <span className="text-green-400">You Will Come Back.</span>&rdquo;
            </h2>
            <p className="text-lg md:text-xl text-white/50 font-medium max-w-2xl mx-auto">
              Luxury is in the details. Experience the gold standard of concierge mobility in Bangladesh.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-green-950 hover:bg-green-50 font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl">
                <Phone className="mr-3 h-4 w-4" /> Personal Call
              </Button>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="h-16 px-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl">
                <MessageSquare className="mr-3 h-4 w-4" /> WhatsApp Axis
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
