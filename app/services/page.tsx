import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services, groupTransportOptions } from "@/lib/config";
import {
  Car,
  Calendar,
  Briefcase,
  Bus,
  User,
  Plane,
  Clock,
  Phone,
  Shield,
  MapPin,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services | Jinia Enterprise",
  description:
    "Comprehensive car rental services in Dhaka including daily rental, monthly rental, corporate fleet, bus rental, chauffeur service, and airport transfers.",
};

const iconMap: { [key: string]: React.ElementType } = {
  car: Car,
  calendar: Calendar,
  briefcase: Briefcase,
  bus: Bus,
  user: User,
  plane: Plane,
  shield: Shield,
};

export default function ServicesPage() {
  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-heading font-bold text-green-700">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive mobility solutions tailored to your needs. From daily
            rentals to corporate fleet management, we have you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Car;
            return (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-shadow border-green-100 hover:border-green-300"
              >
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
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

        {/* Group & Corporate Transportation - Green */}
        <div className="bg-green-600 text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-bold">
                Group & Corporate Transportation
              </h2>
              <p className="opacity-90">
                Jinia Enterprise provides customized group transportation
                solutions, combining experienced drivers with a modern fleet of
                buses for safe and hassle-free trips.
              </p>
              <ul className="space-y-3">
                {groupTransportOptions.map((option, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="bg-white/10 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-semibold">Diversity</h3>
                <ul className="space-y-2 opacity-90">
                  <li>• Wide range of vehicles from economy to luxury</li>
                  <li>• Most competitive rates</li>
                  <li>• Suitable for business and family use</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-semibold">Solutions</h3>
                <ul className="space-y-2 opacity-90">
                  <li>• Daily, weekly, monthly rentals</li>
                  <li>• Long-term leasing</li>
                  <li>• Chauffeur services</li>
                  <li>• Pick-up and drop-off</li>
                  <li>• 24-hour emergency assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-green-50 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-heading font-bold mb-8 text-center text-green-700">
            Why Our Services Stand Out
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-800">
                  First-Hand Vehicles
                </h3>
                <p className="text-sm text-gray-600">
                  All vehicles are first-hand and maintained in excellent
                  condition.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-800">
                  Quick Response
                </h3>
                <p className="text-sm text-gray-600">
                  Ability to respond quickly to client needs.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-800">
                  All Bangladesh
                </h3>
                <p className="text-sm text-gray-600">
                  Explore Dhaka and the entire country with our fleet.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-800">
                  Experienced Staff
                </h3>
                <p className="text-sm text-gray-600">
                  Helpful and experienced staff at all times.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-heading font-bold text-green-700">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto italic">
            &ldquo;For your next car rental, try Jinia — you will come
            back.&rdquo;
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/vehicles">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                View Fleet
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
