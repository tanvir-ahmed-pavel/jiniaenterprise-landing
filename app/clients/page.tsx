import { Metadata } from "next";
import { corporateClients } from "@/lib/config";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Clients | Jinia Enterprise",
  description:
    "Trusted by leading embassies, international organizations, and corporations in Bangladesh.",
};

export default function ClientsPage() {
  const embassies = corporateClients.filter((c) => c.type === "Embassy");
  const organizations = corporateClients.filter(
    (c) => c.type === "International Organization",
  );
  const corporates = corporateClients.filter((c) => c.type === "Corporate");

  const sections = [
    {
      title: "Embassies & Diplomatic Missions",
      icon: Globe,
      items: embassies,
      iconBg: "rgba(74, 222, 128, 0.12)",
      iconColor: "text-green-600",
      iconShadow: "0 0 15px rgba(74, 222, 128, 0.1)",
    },
    {
      title: "International Organizations",
      icon: Building2,
      items: organizations,
      iconBg: "rgba(59, 130, 246, 0.12)",
      iconColor: "text-blue-600",
      iconShadow: "0 0 15px rgba(59, 130, 246, 0.1)",
    },
    {
      title: "Corporate Clients",
      icon: Building2,
      items: corporates,
      iconBg: "rgba(245, 158, 11, 0.12)",
      iconColor: "text-amber-600",
      iconShadow: "0 0 15px rgba(245, 158, 11, 0.1)",
    },
  ];

  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-heading font-bold text-green-800">
            Our Valued Clients
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are proud to serve some of the most prestigious organizations in
            Bangladesh.
          </p>
        </div>

        {/* Client Sections */}
        {sections.map((section) => (
          <div key={section.title} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: section.iconBg,
                  boxShadow: section.iconShadow,
                }}
              >
                <section.icon className={`h-5 w-5 ${section.iconColor}`} />
              </div>
              <h2 className="text-2xl font-heading font-bold text-green-800">
                {section.title}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {section.items.map((client) => (
                <Card key={client.name}>
                  <CardContent className="p-5 flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: section.iconBg,
                        boxShadow: section.iconShadow,
                      }}
                    >
                      <section.icon
                        className={`h-5 w-5 ${section.iconColor}`}
                      />
                    </div>
                    <span className="font-medium text-sm text-gray-700">
                      {client.name}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* CTA — Glass Glow */}
        <div className="text-center glass-glow rounded-2xl p-8 md:p-12 space-y-4">
          <h2 className="text-2xl font-heading font-bold text-green-800">
            Join Our Growing List of Satisfied Clients
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Experience the same level of professional service that these
            organizations trust.
          </p>
        </div>
      </div>
    </div>
  );
}
