import { Metadata } from "next";
import {
  companyHistory,
  whyChooseUs,
  siteConfig,
  ourObjectives,
  teamMembers,
} from "@/lib/config";
import { CheckCircle, Target, Eye, Heart, Award, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us | Jinia Enterprise",
  description:
    "Learn about Jinia Enterprise - over 10 years of trusted car rental service in Dhaka. Our mission, vision, and commitment to customer satisfaction.",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-heading font-bold text-green-700">
            About Jinia Enterprise
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {siteConfig.experience}+ years of trusted car rental service in
            Dhaka and all over Bangladesh.
          </p>
        </div>

        {/* Philosophy Quote - Green */}
        <div className="bg-green-600 text-white rounded-2xl p-8 md:p-12 text-center mb-16">
          <blockquote className="text-xl md:text-2xl font-heading font-medium italic">
            &ldquo;{siteConfig.philosophy}&rdquo;
          </blockquote>
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-green-700">
              Who We Are
            </h2>
            <div className="prose prose-muted max-w-none space-y-4">
              {companyHistory.story.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {/* Our Promise */}
            <div className="bg-green-100 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-green-800">
                  Our Promise
                </h3>
              </div>
              <p className="text-gray-600">{companyHistory.promise}</p>
            </div>

            {/* Location */}
            <div className="bg-green-50 rounded-xl p-6 space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Head Office
              </h3>
              <p className="text-gray-600">
                42 Sabera Tower, Room-04, Road-52
                <br />
                Gulshan North Commercial Area
                <br />
                Gulshan-2, Dhaka-1212
                <br />
                Bangladesh
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Approximately 20 minutes from Hazrat Shahjalal International
                Airport
              </p>
            </div>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center mb-4 text-green-700">
            Our Team
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Meet the dedicated professionals behind Jinia Enterprise who work
            tirelessly to ensure your complete satisfaction.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="border-green-100 hover:border-green-300 hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Team Member Photo */}
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg text-green-800">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-green-50 rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm">{companyHistory.mission}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">Our Vision</h3>
            <p className="text-gray-600 text-sm">{companyHistory.vision}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">Our Morals</h3>
            <ul className="space-y-2">
              {companyHistory.values.map((value) => (
                <li
                  key={value}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Our Objectives */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center mb-10 text-green-700">
            Our Objectives
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {ourObjectives.map((objective, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">{objective}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center mb-10 text-green-700">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1 text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats - Green */}
        <div className="bg-green-600 text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold">10+</div>
              <div className="text-sm opacity-80 mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold">15+</div>
              <div className="text-sm opacity-80 mt-1">Vehicle Types</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold">16+</div>
              <div className="text-sm opacity-80 mt-1">Corporate Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold">24/7</div>
              <div className="text-sm opacity-80 mt-1">Support</div>
            </div>
          </div>
        </div>

        {/* Closing Quote */}
        <div className="text-center">
          <p className="text-2xl font-heading font-medium text-green-700 italic">
            &ldquo;For your next car rental, try Jinia — you will come
            back.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
