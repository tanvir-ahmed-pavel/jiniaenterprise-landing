"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  MessageSquare,
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
} from "lucide-react";
import { sampleVehicles } from "@/lib/config";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"vehicles" | "inquiries">(
    "vehicles"
  );
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Sample inquiries for demo
  const sampleInquiries = [
    {
      id: "1",
      name: "John Doe",
      phone: "+880171234567",
      email: "john@example.com",
      vehicle: "Toyota Corolla",
      date: "2024-12-15",
      status: "new",
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "+880181234567",
      email: "jane@example.com",
      vehicle: "Hyundai H-1",
      date: "2024-12-14",
      status: "contacted",
    },
    {
      id: "3",
      name: "Corporate Client",
      phone: "+880191234567",
      email: "corp@company.com",
      vehicle: null,
      date: "2024-12-13",
      status: "new",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Admin Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-sm opacity-80">Jinia Enterprise Management</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Vehicles
              </CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sampleVehicles.length}</div>
              <p className="text-xs text-muted-foreground">Active in fleet</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                New Inquiries
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Clients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "vehicles" ? "default" : "outline"}
            onClick={() => setActiveTab("vehicles")}
            className="gap-2"
          >
            <Car className="h-4 w-4" /> Vehicles
          </Button>
          <Button
            variant={activeTab === "inquiries" ? "default" : "outline"}
            onClick={() => setActiveTab("inquiries")}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" /> Inquiries
          </Button>
        </div>

        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Vehicle Fleet</CardTitle>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Add Vehicle
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Vehicle</th>
                      <th className="text-left py-3 px-2">Category</th>
                      <th className="text-left py-3 px-2">Seats</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-right py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleVehicles.map((vehicle) => (
                      <tr
                        key={vehicle.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-3 px-2 font-medium">
                          {vehicle.name}
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="outline">{vehicle.category}</Badge>
                        </td>
                        <td className="py-3 px-2">{vehicle.seats}</td>
                        <td className="py-3 px-2">
                          <Badge
                            variant={
                              vehicle.is_active ? "success" : "secondary"
                            }
                          >
                            {vehicle.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Inquiries Tab */}
        {activeTab === "inquiries" && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Name</th>
                      <th className="text-left py-3 px-2">Contact</th>
                      <th className="text-left py-3 px-2">Vehicle</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-right py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleInquiries.map((inquiry) => (
                      <tr
                        key={inquiry.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-3 px-2 font-medium">
                          {inquiry.name}
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-xs">
                            <div>{inquiry.phone}</div>
                            <div className="text-muted-foreground">
                              {inquiry.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          {inquiry.vehicle || "General Inquiry"}
                        </td>
                        <td className="py-3 px-2">{inquiry.date}</td>
                        <td className="py-3 px-2">
                          <Badge
                            variant={
                              inquiry.status === "new" ? "default" : "secondary"
                            }
                          >
                            {inquiry.status === "new" ? "New" : "Contacted"}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Button variant="outline" size="sm">
                            {inquiry.status === "new"
                              ? "Mark Contacted"
                              : "View"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Note */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> This is a demo admin panel. In production,
            vehicle and inquiry data will be managed through Supabase. Configure
            your Supabase credentials in{" "}
            <code className="bg-amber-100 px-1 rounded">.env.local</code> to
            enable full functionality.
          </p>
        </div>
      </div>
    </div>
  );
}
