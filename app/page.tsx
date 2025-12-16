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
      {/* Hero Section - Green Theme */}
      <section className="relative py-20 px-6 md:py-28 lg:py-36 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {siteConfig.experience}+ Years of Excellence
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight">
              <span className="text-green-600">THE BEST</span>
              <br />
              <span className="text-gray-800">Car Rental Service</span>
              <br />
              <span className="text-green-600">In Your City</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {siteConfig.tagline}. Experience the difference with professional
              chauffeurs and a premium fleet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-green-600 hover:bg-green-700 text-white"
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
                  className="w-full sm:w-auto gap-2 bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageSquare className="h-5 w-5" /> WhatsApp
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 border-green-600 text-green-600 hover:bg-green-50"
                >
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-green-200 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-green-200 to-transparent rounded-full blur-3xl" />
        </div>
      </section>

      {/* Trust Indicators - Green */}
      <section className="py-12 border-y border-green-100 bg-green-600 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-white/20">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {siteConfig.experience}+ Years
                </h3>
                <p className="text-sm opacity-80">Experience</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-white/20">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Corporate Focus</h3>
                <p className="text-sm opacity-80">Embassy & Business</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-white/20">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Professional</h3>
                <p className="text-sm opacity-80">Trained Chauffeurs</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-white/20">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">24/7 Support</h3>
                <p className="text-sm opacity-80">Always Available</p>
              </div>
            </div>
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
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-8">
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
