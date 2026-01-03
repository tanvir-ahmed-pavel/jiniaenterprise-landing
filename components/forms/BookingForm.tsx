"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { sampleVehicles } from "@/lib/config";
import {
  Loader2,
  CheckCircle,
  Calendar,
  User,
  Phone,
  Mail,
  Car,
  MessageSquare,
  MapPin,
} from "lucide-react";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  vehicle_id: z.string().optional(),
  rental_type: z.string().min(1, "Please select a rental type"),
  pickup_date: z.string().min(1, "Please select a pickup date"),
  return_date: z.string().optional(),
  pickup_location: z.string().optional(),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  preselectedVehicle?: string;
}

export function BookingForm({ preselectedVehicle }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      vehicle_id: preselectedVehicle || "",
      rental_type: "daily",
    },
  });

  const rentalTypes = [
    { value: "daily", label: "Daily Rental" },
    { value: "weekly", label: "Weekly Rental" },
    { value: "monthly", label: "Monthly Rental" },
    { value: "corporate", label: "Corporate/Long-term" },
    { value: "airport", label: "Airport Transfer" },
  ];

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      // Get vehicle name if selected
      const vehicle = data.vehicle_id
        ? sampleVehicles.find((v) => v.id === data.vehicle_id)
        : null;

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          vehicle_name: vehicle?.name || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }

      setIsSuccess(true);
      reset();
    } catch {
      setError(
        "Failed to submit booking. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-green-800 mb-2">
            Booking Request Received!
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Thank you for your interest. Our team will contact you shortly to
            confirm your booking details.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Make Another Booking
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-100 shadow-lg">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Calendar className="h-5 w-5" />
          Book a Vehicle
        </CardTitle>
        <CardDescription>
          Fill out the form below and our team will get back to you within 2
          hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <User className="h-4 w-4 text-green-600" />
              Your Information
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="Your full name"
                    className="pl-10"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+880 1XXX XXXXXX"
                    className="pl-10"
                    {...register("phone")}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Car className="h-4 w-4 text-green-600" />
              Booking Details
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_id">Vehicle (Optional)</Label>
                <select
                  id="vehicle_id"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  {...register("vehicle_id")}
                >
                  <option value="">Any available vehicle</option>
                  {sampleVehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} ({vehicle.seats} seats)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rental_type">
                  Rental Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="rental_type"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  {...register("rental_type")}
                >
                  {rentalTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.rental_type && (
                  <p className="text-sm text-red-500">
                    {errors.rental_type.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup_date">
                  Pickup Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="pickup_date"
                    type="date"
                    className="pl-10"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("pickup_date")}
                  />
                </div>
                {errors.pickup_date && (
                  <p className="text-sm text-red-500">
                    {errors.pickup_date.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="return_date">Return Date (Optional)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="return_date"
                    type="date"
                    className="pl-10"
                    {...register("return_date")}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickup_location">
                Pickup Location (Optional)
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="pickup_location"
                  placeholder="e.g., Hazrat Shahjalal Airport, Gulshan"
                  className="pl-10"
                  {...register("pickup_location")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                Additional Requirements (Optional)
              </Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Any special requirements or notes..."
                  className="w-full pl-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                  {...register("message")}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Request Booking
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            By submitting, you agree to be contacted regarding your booking
            request.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
