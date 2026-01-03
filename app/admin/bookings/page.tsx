"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Car,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle_name: string | null;
  rental_type: string;
  pickup_date: string;
  return_date?: string;
  pickup_location: string | null;
  message?: string;
  status: string;
  created_at: string;
}

export default function BookingsManagementPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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
      return_date: "2026-01-07",
      pickup_location: "Gulshan-2",
      message: "Need an early morning pickup around 6 AM",
      status: "new",
      created_at: "2026-01-03T10:00:00Z",
    },
    {
      id: "2",
      name: "Sarah Khan",
      phone: "+880181234567",
      email: "sarah@corporate.com",
      vehicle_name: "Toyota Alphard",
      rental_type: "corporate",
      pickup_date: "2026-01-10",
      pickup_location: "Banani DOHS",
      message: "Monthly contract for executive transport",
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
      pickup_location: "Baridhara Diplomatic Zone",
      status: "confirmed",
      created_at: "2026-01-01T09:15:00Z",
    },
  ];

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/admin");
    }
    setBookings(sampleBookings);
  }, [router]);

  const updateStatus = (id: string, newStatus: string) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking?.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
    // TODO: Update in Supabase
    console.log(`Booking ${id} status updated to: ${newStatus}`);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "success" | "destructive"
    > = {
      new: "default",
      contacted: "secondary",
      confirmed: "success",
      completed: "success",
      cancelled: "destructive",
    };
    return (
      <Badge variant={variants[status] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container flex items-center gap-4">
          <Link href="/admin/dashboard">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Booking Management</h1>
            <p className="text-sm opacity-80">
              View and manage booking requests
            </p>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bookings List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">All Bookings</h2>
              <div className="flex gap-2">
                <Badge variant="default">
                  {bookings.filter((b) => b.status === "new").length} New
                </Badge>
                <Badge variant="success">
                  {bookings.filter((b) => b.status === "confirmed").length}{" "}
                  Confirmed
                </Badge>
              </div>
            </div>

            {bookings.map((booking) => (
              <Card
                key={booking.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedBooking?.id === booking.id
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                onClick={() => setSelectedBooking(booking)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{booking.name}</span>
                        {getStatusBadge(booking.status)}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {booking.pickup_date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Car className="h-3 w-3" />
                          {booking.vehicle_name || "Any vehicle"}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Booking Details */}
          <div className="lg:col-span-1">
            {selectedBooking ? (
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Booking Details
                    {getStatusBadge(selectedBooking.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">
                        {selectedBooking.name}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`tel:${selectedBooking.phone}`}
                          className="text-primary hover:underline"
                        >
                          {selectedBooking.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`mailto:${selectedBooking.email}`}
                          className="text-primary hover:underline"
                        >
                          {selectedBooking.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <h4 className="font-medium">Booking Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        {selectedBooking.vehicle_name ||
                          "Any available vehicle"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {selectedBooking.pickup_date}
                        {selectedBooking.return_date &&
                          ` → ${selectedBooking.return_date}`}
                      </div>
                      {selectedBooking.pickup_location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {selectedBooking.pickup_location}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {selectedBooking.rental_type.charAt(0).toUpperCase() +
                          selectedBooking.rental_type.slice(1)}{" "}
                        rental
                      </div>
                    </div>
                  </div>

                  {selectedBooking.message && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                        {selectedBooking.message}
                      </p>
                    </div>
                  )}

                  <div className="border-t pt-4 space-y-2">
                    <h4 className="font-medium">Update Status</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateStatus(selectedBooking.id, "contacted")
                        }
                        disabled={selectedBooking.status === "contacted"}
                      >
                        <Phone className="h-4 w-4 mr-1" /> Contacted
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          updateStatus(selectedBooking.id, "confirmed")
                        }
                        disabled={selectedBooking.status === "confirmed"}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" /> Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateStatus(selectedBooking.id, "completed")
                        }
                      >
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() =>
                          updateStatus(selectedBooking.id, "cancelled")
                        }
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Select a booking to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
