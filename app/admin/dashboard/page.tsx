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

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    const ok = await vehicleService.delete(id);
    if (ok) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } else {
      alert("Failed to delete vehicle");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const ok = await blogService.delete(id);
    if (ok) {
      setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete blog post");
    }
  };

  const handleUpdateBookingStatus = async (id: string, newStatus: Booking["status"]) => {
    const ok = await bookingService.updateStatus(id, newStatus);
    if (ok) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } else {
      alert("Failed to update booking status");
    }
  };

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
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Vehicle</th>
                      <th className="text-left py-3 px-2 font-semibold">Category</th>
                      <th className="text-left py-3 px-2 font-semibold">Seats</th>
                      <th className="text-left py-3 px-2 font-semibold">Status</th>
                      <th className="text-right py-3 px-2 font-semibold">Actions</th>
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
                              <Button variant="ghost" size="sm" title="View on site">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/vehicles/${vehicle.id}/edit`}>
                              <Button variant="ghost" size="sm" title="Edit vehicle">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteVehicle(vehicle.id)}
                              title="Delete vehicle"
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Booking Requests</CardTitle>
            <Link href="/admin/bookings">
              <Button size="sm" variant="outline">
                Open Full Bookings Page
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No bookings yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[800px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Customer</th>
                      <th className="text-left py-3 px-2 font-semibold">Contact</th>
                      <th className="text-left py-3 px-2 font-semibold">Vehicle</th>
                      <th className="text-left py-3 px-2 font-semibold">Type</th>
                      <th className="text-left py-3 px-2 font-semibold">Pickup</th>
                      <th className="text-left py-3 px-2 font-semibold">Status</th>
                      <th className="text-right py-3 px-2 font-semibold">Actions</th>
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
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <a href={`tel:${booking.phone}`} className="hover:underline text-emerald-700 font-semibold">{booking.phone}</a>
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
                          <div className="flex justify-end gap-1.5">
                            {booking.status === "new" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateBookingStatus(booking.id, "contacted")}
                              >
                                Mark Contacted
                              </Button>
                            )}
                            {booking.status === "contacted" && (
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => handleUpdateBookingStatus(booking.id, "confirmed")}
                              >
                                Confirm
                              </Button>
                            )}
                            <Link href="/admin/bookings">
                              <Button variant="ghost" size="sm" title="View in bookings">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
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
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-semibold">Title</th>
                      <th className="text-left py-3 px-2 font-semibold">Author</th>
                      <th className="text-left py-3 px-2 font-semibold">Date</th>
                      <th className="text-left py-3 px-2 font-semibold">Status</th>
                      <th className="text-right py-3 px-2 font-semibold">Actions</th>
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
                              <Button variant="ghost" size="sm" title="View post">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/blog/${post.id}/edit`}>
                              <Button variant="ghost" size="sm" title="Edit post">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteBlog(post.id)}
                              title="Delete post"
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
