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
  sampleVehicles,
  sampleBlogPosts,
} from "@/lib/config";
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

export default function Home() {
  const featuredVehicles = sampleVehicles.slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Premium Design with Background Image */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />

        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="opacity-0 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm font-medium text-white">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {siteConfig.experience}+ Years of Excellence
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight opacity-0 animate-fade-in-up animation-delay-100">
              <span className="bg-linear-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent">
                THE BEST
              </span>
              <br />
              <span className="text-white">Car Rental Service</span>
              <br />
              <span className="bg-linear-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                In Your City
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-200">
              {siteConfig.tagline}. Experience the difference with professional
              chauffeurs and a premium fleet of luxury vehicles.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up animation-delay-300">
              <Link href="/booking">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/30 transition-all hover:shadow-green-500/40 hover:scale-105"
                >
                  <Calendar className="h-5 w-5" /> Book Now
                </Button>
              </Link>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 shadow-lg transition-all hover:scale-105"
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
                  className="w-full sm:w-auto gap-2 bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-emerald-400/40 hover:scale-105"
                >
                  <MessageSquare className="h-5 w-5" /> WhatsApp
                </Button>
              </a>
            </div>

            {/* Quick Booking Widget */}
            <div className="opacity-0 animate-fade-in-up animation-delay-350 mt-8">
              <div className="glass-dark rounded-2xl p-6 max-w-3xl mx-auto">
                <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-xs text-white/70 font-medium">
                      Rental Type
                    </label>
                    <select className="w-full h-11 px-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
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
                    <label className="text-xs text-white/70 font-medium">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      className="w-full h-11 px-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/70 font-medium">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Pickup location"
                      className="w-full h-11 px-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <Link href="/booking" className="w-full">
                    <Button
                      type="button"
                      size="lg"
                      className="w-full h-11 bg-green-600 hover:bg-green-500 text-white font-semibold"
                    >
                      Get Quote
                    </Button>
                  </Link>
                </form>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 opacity-0 animate-fade-in-up animation-delay-400">
              <div className="glass-dark rounded-2xl px-8 py-6 inline-flex flex-wrap justify-center gap-8 md:gap-12">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {siteConfig.experience}+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    50+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Premium Vehicles
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    24/7
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Support Available
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    100%
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-500">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-green-700">
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
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition-shadow border-green-100 hover:border-green-300"
                >
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-3">
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
              <Button
                variant="outline"
                className="gap-2 border-green-600 text-green-600 hover:bg-green-50"
              >
                View All Services <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 bg-green-50">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-green-700">
              Featured Vehicles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our selection of well-maintained vehicles for every
              occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/vehicles">
              <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                View All Vehicles <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Corporate Clients */}
      <section className="py-20 bg-white">
        <div className="container text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-heading font-bold text-green-700">
              Trusted by Leading Organizations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are proud to serve embassies, international organizations, and
              major corporations.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {corporateClients.map((client) => (
              <div
                key={client.name}
                className="px-5 py-3 bg-green-50 border border-green-100 rounded-lg text-sm font-medium text-green-700 hover:bg-green-100 transition-colors"
              >
                {client.name}
              </div>
            ))}
          </div>
          <Link href="/clients">
            <Button variant="link" className="gap-2 text-green-600">
              View All Clients <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-green-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-green-700">
                Why Choose Jinia Enterprise?
              </h2>
              <div className="space-y-6">
                {whyChooseUs.slice(0, 4).map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
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
                <Button
                  variant="outline"
                  className="gap-2 border-green-600 text-green-600 hover:bg-white"
                >
                  Learn More About Us <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-heading font-bold text-green-800 italic">
                    &ldquo;{siteConfig.philosophy}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-green-700">
              Latest Articles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed with our latest tips, guides, and updates from the
              car rental industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleBlogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group border-green-100 hover:border-green-300">
                  <div className="aspect-video bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center">
                    <span className="text-4xl">📰</span>
                  </div>
                  <CardHeader>
                    <div className="text-xs text-gray-500 mb-2">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <CardTitle className="text-lg group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                    <div className="mt-4 text-green-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button
                variant="outline"
                className="gap-2 border-green-600 text-green-600 hover:bg-green-50"
              >
                View All Articles <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Green */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            &ldquo;For your next car rental, try Jinia — you will come
            back&rdquo;
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Experience the premium service standard that has made us the trusted
            choice for embassies and corporations in Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-white text-green-700 hover:bg-green-50 font-bold"
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
                variant="outline"
                className="w-full sm:w-auto gap-2 bg-transparent text-white border-white hover:bg-white hover:text-green-700"
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
