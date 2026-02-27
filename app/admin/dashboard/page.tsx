"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  MessageSquare,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  FileText,
  Phone,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  vehicleService,
  blogService,
  bookingService,
  type Vehicle,
  type BlogPost,
  type Booking,
} from "@/lib/supabase/admin-service";

type TabType = "vehicles" | "bookings" | "blog";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("vehicles");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [vehicleData, blogData, bookingData] = await Promise.all([
          vehicleService.getAll(),
          blogService.getAll(),
          bookingService.getAll(),
        ]);
        setVehicles(vehicleData);
        setBlogPosts(blogData);
        setBookings(bookingData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getStatusColor = (
    status: string,
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Jinia Enterprise Management
        </p>
      </div>

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
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <p className="text-xs text-muted-foreground">Active in fleet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter((b) => b.status === "new").length}
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
            <div className="text-2xl font-bold">{blogPosts.length}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter((b) => b.status === "confirmed").length}
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
          {bookings.filter((b) => b.status === "new").length > 0 && (
            <Badge variant="destructive" className="ml-1">
              {bookings.filter((b) => b.status === "new").length}
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
            {vehicles.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No vehicles found. Add your first vehicle to get started.
              </p>
            ) : (
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
                    {vehicles.map((vehicle) => (
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
                            <Link
                              href={`/vehicles/${vehicle.slug}`}
                              target="_blank"
                            >
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
            )}
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
            {bookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No bookings yet.
              </p>
            ) : (
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
                    {bookings.map((booking) => (
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
            )}
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
            {blogPosts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No blog posts found. Create your first post.
              </p>
            ) : (
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
                    {blogPosts.map((post) => (
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
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
