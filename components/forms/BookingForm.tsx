"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Vehicle } from "@/lib/supabase/admin-service";
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
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  vehicles?: Vehicle[];
}

export function BookingForm({
  preselectedVehicle,
  vehicles = [],
}: BookingFormProps) {
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
      const vehicle = data.vehicle_id
        ? vehicles.find((v) => v.id === data.vehicle_id)
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
      <div className="text-center py-12 px-6">
        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-4xl font-heading font-black text-green-950 italic mb-4">
          Request Received.
        </h3>
        <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">
          Your journey orchestration has begun. Our concierge will reach out within two hours to finalize the details.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="h-16 px-10 rounded-2xl bg-green-950 text-white hover:bg-green-900 font-black uppercase tracking-[0.2em] text-[10px]"
        >
          Initiate Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      {error && (
        <div className="p-6 text-sm font-bold text-red-600 bg-red-50/50 border border-red-100 rounded-2xl animate-fade-in">
          {error}
        </div>
      )}

      {/* Section: Identity */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
            <User className="h-4 w-4 text-green-600" />
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-900/40">
            The Client Identity
          </h4>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-green-950 ml-1">
              Legal Full Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Tanvir Ahmed"
              className="h-14 rounded-2xl border-white/60 bg-white/40 focus:bg-white transition-all duration-300"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-[10px] font-black uppercase tracking-widest text-red-500 ml-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-green-950 ml-1">
              Active Phone Axis
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+880 1XXX XXXXXX"
              className="h-14 rounded-2xl border-white/60 bg-white/40 focus:bg-white transition-all duration-300"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-[10px] font-black uppercase tracking-widest text-red-500 ml-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-green-950 ml-1">
            Digital Correspondence
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="h-14 rounded-2xl border-white/60 bg-white/40 focus:bg-white transition-all duration-300"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[10px] font-black uppercase tracking-widest text-red-500 ml-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Section: Logistics */}
      <div className="space-y-8 pt-6 border-t border-black/[0.03]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
            <Car className="h-4 w-4 text-green-600" />
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-900/40">
            The Logistics Core
          </h4>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="vehicle_id" className="text-[10px] font-black uppercase tracking-widest text-green-950 ml-1">
              Fleet Selection
            </Label>
            <select
              id="vehicle_id"
              className="w-full h-14 px-6 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all duration-300 appearance-none font-bold text-gray-700"
              {...register("vehicle_id")}
            >
              <option value="">Any Selective Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} ({vehicle.seats} Positions)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="rental_type" className="text-[10px] font-black uppercase tracking-widest text-green-950 ml-1">
              Tenure Model
            </Label>
            <select
              id="rental_type"
              className="w-full h-14 px-6 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all duration-300 appearance-none font-bold text-gray-700"
              {...register("rental_type")}
            >
              {rentalTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="pickup_date" className="text-[10px] font-black uppercase tracking-widest text-green-950 ml-1">
              Commencement Date
            </Label>
            <Input
              id="pickup_date"
              type="date"
              className="h-14 rounded-2xl border-white/60 bg-white/40 focus:bg-white transition-all duration-300"
              min={new Date().toISOString().split("T")[0]}
              {...register("pickup_date")}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="return_date" className="text-[10px] font-black uppercase tracking-widest text-green-950 ml-1">
              Conclusion Date
            </Label>
            <Input
              id="return_date"
              type="date"
              className="h-14 rounded-2xl border-white/60 bg-white/40 focus:bg-white transition-all duration-300"
              {...register("return_date")}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="pickup_location" className="text-[10px] font-black uppercase tracking-widest text-green-950 ml-1">
            Pickup Origin
          </Label>
          <Input
            id="pickup_location"
            placeholder="e.g. Hazrat Shahjalal Airport"
            className="h-14 rounded-2xl border-white/60 bg-white/40 focus:bg-white transition-all duration-300"
            {...register("pickup_location")}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-green-950 ml-1">
            Bespoke Requirements
          </Label>
          <textarea
            id="message"
            rows={4}
            placeholder="Specify any customized needs or orchestration notes..."
            className="w-full h-32 px-6 py-4 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all duration-300 resize-none font-medium text-gray-700"
            {...register("message")}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-16 rounded-2xl bg-green-600 text-white hover:bg-green-700 font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-green-200/50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            Orchestrating...
          </>
        ) : (
          <>
            <Sparkles className="mr-3 h-4 w-4" />
            Request Reservation
          </>
        )}
      </Button>

      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center text-green-900/30">
        By initiating, you authorize Jinia Concierge to contact you.
      </p>
    </form>
  );
}
