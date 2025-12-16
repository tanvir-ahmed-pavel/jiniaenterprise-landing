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
  // Group clients by type
  const embassies = corporateClients.filter((c) => c.type === "Embassy");
  const organizations = corporateClients.filter(
    (c) => c.type === "International Organization"
  );
  const corporates = corporateClients.filter((c) => c.type === "Corporate");

  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-heading font-bold text-green-700">
            Our Valued Clients
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are proud to serve some of the most prestigious organizations in
            Bangladesh.
          </p>
        </div>

        {/* Embassies */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-heading font-bold text-green-700">
              Embassies & Diplomatic Missions
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {embassies.map((client) => (
              <Card
                key={client.name}
                className="hover:shadow-md transition-shadow border-green-100 hover:border-green-300"
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Globe className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="font-medium text-sm text-gray-700">
                    {client.name}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* International Organizations */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-heading font-bold text-green-700">
              International Organizations
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {organizations.map((client) => (
              <Card
                key={client.name}
                className="hover:shadow-md transition-shadow border-green-100 hover:border-green-300"
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="font-medium text-sm text-gray-700">
                    {client.name}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Corporates */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-heading font-bold text-green-700">
              Corporate Clients
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {corporates.map((client) => (
              <Card
                key={client.name}
                className="hover:shadow-md transition-shadow border-green-100 hover:border-green-300"
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6 text-amber-600" />
                  </div>
                  <span className="font-medium text-sm text-gray-700">
                    {client.name}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-green-50 rounded-2xl p-8 md:p-12 space-y-4 border border-green-100">
          <h2 className="text-2xl font-heading font-bold text-green-700">
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
