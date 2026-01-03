"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Car,
  CheckCircle,
  XCircle,
  MessageSquare,
  Loader2,
  Trash2,
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle_id?: string | null;
  vehicle_name?: string | null;
  rental_type: string;
  pickup_date: string;
  return_date?: string | null;
  pickup_location?: string | null;
  message?: string | null;
  status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
  created_at: string;
}

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      setBookings((data as Booking[]) || []);
    }
    setIsLoading(false);
  };

  const updateStatus = async (id: string, newStatus: Booking["status"]) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus } as never)
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } else {
      setBookings(
        bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status: newStatus });
      }
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking");
    } else {
      setBookings(bookings.filter((b) => b.id !== id));
      if (selectedBooking?.id === id) {
        setSelectedBooking(null);
      }
    }
  };

  const getStatusColor = (
    status: string
  ): "default" | "secondary" | "success" | "destructive" => {
    switch (status) {
      case "new":
        return "default";
      case "contacted":
        return "secondary";
      case "confirmed":
        return "success";
      case "completed":
        return "success";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const filteredBookings =
    statusFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <p className="text-muted-foreground">
          View and manage customer booking requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {["all", "new", "contacted", "confirmed", "completed", "cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`p-4 rounded-lg border text-left transition-colors ${
                statusFilter === status
                  ? "bg-green-50 border-green-500"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <p className="text-2xl font-bold">
                {status === "all"
                  ? bookings.length
                  : bookings.filter((b) => b.status === status).length}
              </p>
              <p className="text-sm text-muted-foreground capitalize">
                {status === "all" ? "All Bookings" : status}
              </p>
            </button>
          )
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bookings List */}
        <div className="lg:col-span-2">
          {filteredBookings.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedBooking?.id === booking.id ? "bg-green-50" : ""
                      }`}
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{booking.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.vehicle_name || "No vehicle specified"}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {new Date(booking.pickup_date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(booking.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Bookings Found</h3>
              <p className="text-muted-foreground">
                {statusFilter === "all"
                  ? "No booking requests yet"
                  : `No ${statusFilter} bookings`}
              </p>
            </Card>
          )}
        </div>

        {/* Booking Details */}
        <div>
          {selectedBooking ? (
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {selectedBooking.name}
                  </h3>
                  <Badge
                    variant={getStatusColor(selectedBooking.status)}
                    className="mt-1"
                  >
                    {selectedBooking.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${selectedBooking.phone}`}
                      className="text-green-600 hover:underline"
                    >
                      {selectedBooking.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${selectedBooking.email}`}
                      className="text-green-600 hover:underline"
                    >
                      {selectedBooking.email}
                    </a>
                  </div>
                  {selectedBooking.vehicle_name && (
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedBooking.vehicle_name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(
                        selectedBooking.pickup_date
                      ).toLocaleDateString()}
                      {selectedBooking.return_date &&
                        ` - ${new Date(
                          selectedBooking.return_date
                        ).toLocaleDateString()}`}
                    </span>
                  </div>
                  {selectedBooking.pickup_location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedBooking.pickup_location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">
                      {selectedBooking.rental_type} rental
                    </span>
                  </div>
                </div>

                {selectedBooking.message && (
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-sm font-medium mb-1">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </div>
                    <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                      {selectedBooking.message}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateStatus(selectedBooking.id, "contacted")
                      }
                      disabled={selectedBooking.status === "contacted"}
                    >
                      Mark Contacted
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        updateStatus(selectedBooking.id, "confirmed")
                      }
                      disabled={selectedBooking.status === "confirmed"}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirm
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateStatus(selectedBooking.id, "completed")
                      }
                      disabled={selectedBooking.status === "completed"}
                    >
                      Complete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() =>
                        updateStatus(selectedBooking.id, "cancelled")
                      }
                      disabled={selectedBooking.status === "cancelled"}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 hover:bg-red-50"
                    onClick={() => deleteBooking(selectedBooking.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Select a booking to view details
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
