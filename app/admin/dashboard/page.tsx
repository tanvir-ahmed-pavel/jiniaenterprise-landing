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
  Calendar,
  FileText,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { sampleVehicles, sampleBlogPosts } from "@/lib/config";
import { Badge } from "@/components/ui/badge";

type TabType = "vehicles" | "bookings" | "blog";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle_name: string | null;
  rental_type: string;
  pickup_date: string;
  pickup_location: string | null;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("vehicles");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Sample bookings for demo
  const sampleBookings: Booking[] = [
    {
      id: "1",
      name: "Ahmed Rahman",
      phone: "+880171234567",
      email: "ahmed@example.com",
      vehicle_name: "Toyota Corolla",
      rental_type: "daily",
      pickup_date: "2026-01-05",
      pickup_location: "Gulshan",
      status: "new",
      created_at: "2026-01-03T10:00:00Z",
    },
    {
      id: "2",
      name: "Sarah Khan",
      phone: "+880181234567",
      email: "sarah@example.com",
      vehicle_name: "Toyota Alphard",
      rental_type: "corporate",
      pickup_date: "2026-01-10",
      pickup_location: "Banani",
      status: "contacted",
      created_at: "2026-01-02T14:30:00Z",
    },
    {
      id: "3",
      name: "Embassy of Thailand",
      phone: "+880191234567",
      email: "transport@thai-embassy.bd",
      vehicle_name: null,
      rental_type: "monthly",
      pickup_date: "2026-01-15",
      pickup_location: "Baridhara",
      status: "confirmed",
      created_at: "2026-01-01T09:15:00Z",
    },
  ];

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

  const displayBookings = bookings.length > 0 ? bookings : sampleBookings;

  const getStatusColor = (
    status: string
  ): "default" | "secondary" | "success" | "outline" | "destructive" => {
    switch (status) {
      case "new":
        return "default";
      case "contacted":
        return "secondary";
      case "confirmed":
        return "success";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Admin Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-sm opacity-80">Jinia Enterprise Management</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank">
              <Button variant="secondary" size="sm">
                View Site
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                New Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {displayBookings.filter((b) => b.status === "new").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sampleBlogPosts.length}</div>
              <p className="text-xs text-muted-foreground">
                Published articles
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {displayBookings.filter((b) => b.status === "confirmed").length}
              </div>
              <p className="text-xs text-muted-foreground">Active rentals</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeTab === "vehicles" ? "default" : "outline"}
            onClick={() => setActiveTab("vehicles")}
            className="gap-2"
          >
            <Car className="h-4 w-4" /> Vehicles
          </Button>
          <Button
            variant={activeTab === "bookings" ? "default" : "outline"}
            onClick={() => setActiveTab("bookings")}
            className="gap-2"
          >
            <Calendar className="h-4 w-4" /> Bookings
            {displayBookings.filter((b) => b.status === "new").length > 0 && (
              <Badge variant="destructive" className="ml-1">
                {displayBookings.filter((b) => b.status === "new").length}
              </Badge>
            )}
          </Button>
          <Button
            variant={activeTab === "blog" ? "default" : "outline"}
            onClick={() => setActiveTab("blog")}
            className="gap-2"
          >
            <FileText className="h-4 w-4" /> Blog Posts
          </Button>
        </div>

        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Vehicle Fleet</CardTitle>
              <Link href="/admin/vehicles/new">
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> Add Vehicle
                </Button>
              </Link>
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

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <Card>
            <CardHeader>
              <CardTitle>Booking Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Customer</th>
                      <th className="text-left py-3 px-2">Contact</th>
                      <th className="text-left py-3 px-2">Vehicle</th>
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-left py-3 px-2">Pickup</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-right py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayBookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-3 px-2 font-medium">
                          {booking.name}
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-xs space-y-1">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {booking.phone}
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {booking.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          {booking.vehicle_name || "Any available"}
                        </td>
                        <td className="py-3 px-2 capitalize">
                          {booking.rental_type}
                        </td>
                        <td className="py-3 px-2">
                          <div className="text-xs space-y-1">
                            <div>{booking.pickup_date}</div>
                            {booking.pickup_location && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {booking.pickup_location}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              {booking.status === "new"
                                ? "Contact"
                                : booking.status === "contacted"
                                ? "Confirm"
                                : "View"}
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

        {/* Blog Tab */}
        {activeTab === "blog" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Blog Posts</CardTitle>
              <Link href="/admin/blog/new">
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> New Post
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Title</th>
                      <th className="text-left py-3 px-2">Author</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-right py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleBlogPosts.map((post) => (
                      <tr key={post.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <div className="font-medium line-clamp-1 max-w-xs">
                            {post.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            /{post.slug}
                          </div>
                        </td>
                        <td className="py-3 px-2">{post.author}</td>
                        <td className="py-3 px-2">
                          {new Date(post.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2">
                          <Badge
                            variant={
                              post.is_published ? "success" : "secondary"
                            }
                          >
                            {post.is_published ? "Published" : "Draft"}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
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

        {/* Note */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Admin Panel Ready!</strong> This panel now includes
            Vehicles, Bookings, and Blog management. Configure your Supabase
            credentials in{" "}
            <code className="bg-green-100 px-1 rounded">.env.local</code> to
            connect to your database.
          </p>
        </div>
      </div>
    </div>
  );
}
