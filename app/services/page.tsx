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
          <h1 className="text-4xl font-heading font-bold text-green-800">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive mobility solutions tailored to your needs. From daily
            rentals to corporate fleet management, we have you covered.
          </p>
        </div>

        {/* Services Grid — Glass Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Car;
            return (
              <Card key={service.id}>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl icon-glow flex items-center justify-center mb-4">
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

        {/* Group & Corporate — Dark Glass */}
        <div
          className="rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden"
          style={{
            background: "rgba(10, 25, 18, 0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(74, 222, 128, 0.12)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.2), 0 0 30px rgba(74,222,128,0.05)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-green-500/8 rounded-full blur-[100px]" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                Group & Corporate Transportation
              </h2>
              <p className="text-white/70">
                Jinia Enterprise provides customized group transportation
                solutions, combining experienced drivers with a modern fleet of
                buses for safe and hassle-free trips.
              </p>
              <ul className="space-y-3">
                {groupTransportOptions.map((option, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(74,222,128,0.2)]">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                    </div>
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              {["Diversity", "Solutions"].map((title) => (
                <div
                  key={title}
                  className="rounded-xl p-6 space-y-4"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <ul className="space-y-2 text-white/70">
                    {title === "Diversity" ? (
                      <>
                        <li>• Wide range of vehicles from economy to luxury</li>
                        <li>• Most competitive rates</li>
                        <li>• Suitable for business and family use</li>
                      </>
                    ) : (
                      <>
                        <li>• Daily, weekly, monthly rentals</li>
                        <li>• Long-term leasing</li>
                        <li>• Chauffeur services</li>
                        <li>• Pick-up and drop-off</li>
                        <li>• 24-hour emergency assistance</li>
                      </>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Features — Glass Section */}
        <div className="section-glass rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-heading font-bold mb-8 text-center text-green-800">
            Why Our Services Stand Out
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "First-Hand Vehicles",
                text: "All vehicles are first-hand and maintained in excellent condition.",
              },
              {
                icon: Clock,
                title: "Quick Response",
                text: "Ability to respond quickly to client needs.",
              },
              {
                icon: MapPin,
                title: "All Bangladesh",
                text: "Explore Dhaka and the entire country with our fleet.",
              },
              {
                icon: Phone,
                title: "Experienced Staff",
                text: "Helpful and experienced staff at all times.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl icon-glow shrink-0">
                  <Icon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-800">{title}</h3>
                  <p className="text-sm text-gray-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-heading font-bold text-green-800">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto italic">
            &ldquo;For your next car rental, try Jinia — you will come
            back.&rdquo;
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg">Contact Us</Button>
            </Link>
            <Link href="/vehicles">
              <Button size="lg" variant="outline">
                View Fleet
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
