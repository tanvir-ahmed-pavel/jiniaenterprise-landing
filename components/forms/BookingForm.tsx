"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  Car,
  MessageSquare,
  MapPin,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  Check,
  ExternalLink,
  ChevronDown,
  Info,
  Eye,
  Snowflake,
  Fuel,
  Users,
  Luggage,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { VehicleDetailsModal } from "@/components/vehicles/VehicleDetailsModal";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category?: string;
  seats?: number;
  engine_cc?: number | null;
  features?: string[];
  rental_types?: string[];
  description?: string;
  images?: string[];
  image_url?: string | null;
  starting_price?: number | null;
  price_label?: string;
  is_active?: boolean;
}

const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name (at least 2 characters)"),
  phone: z.string().min(10, "Please enter a valid mobile / WhatsApp number"),
  email: z.string().email("Please enter a valid email address").or(z.literal("")),
  vehicle_id: z.string().optional(),
  rental_type: z.string().min(1, "Please select a rental type"),
  pickup_date: z.string().min(1, "Please select a pickup date"),
  return_date: z.string().optional(),
  pickup_location: z.string().optional(),
  destination: z.string().optional(),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  preselectedVehicleId?: string;
  initialRentalType?: string;
  initialPickupLocation?: string;
  initialPickupDate?: string;
  vehicles?: Vehicle[];
}

const POPULAR_LOCATIONS = [
  "Hazrat Shahjalal Airport (DAC)",
  "Gulshan-1 / Gulshan-2",
  "Banani / Baridhara",
  "Dhanmondi / Lalmatia",
  "Uttara (Sectors 1–18)",
  "Bashundhara R/A",
  "Motijheel / Dilkusha",
  "Mirpur / DOHS",
];

const RENTAL_TYPES = [
  { value: "daily", label: "Daily Rental", desc: "10–12 hours with chauffeur" },
  { value: "airport", label: "Airport Transfer", desc: "VIP meet & greet at DAC" },
  { value: "monthly", label: "Monthly Retainer", desc: "Dedicated car & driver" },
  { value: "outstation", label: "Outstation / Inter-City", desc: "Cox's Bazar, Sylhet, etc." },
  { value: "corporate", label: "Corporate / Event", desc: "Custom fleet contract" },
];

export function BookingForm({
  preselectedVehicleId,
  initialRentalType = "daily",
  initialPickupLocation = "",
  initialPickupDate = "",
  vehicles = [],
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);
  const [error, setError] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(preselectedVehicleId || "");
  const [modalVehicle, setModalVehicle] = useState<Vehicle | null>(null);

  // Today's date string YYYY-MM-DD for min date
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      vehicle_id: preselectedVehicleId || "",
      rental_type: initialRentalType || "daily",
      pickup_location: initialPickupLocation || "",
      pickup_date: initialPickupDate || todayStr,
      return_date: "",
      name: "",
      phone: "",
      email: "",
      destination: "",
      message: "",
    },
  });

  const currentVehicleId = watch("vehicle_id") || selectedVehicleId;
  const currentRentalType = watch("rental_type");
  const currentPickupDate = watch("pickup_date");
  const currentPickupLocation = watch("pickup_location");
  const currentName = watch("name");
  const currentPhone = watch("phone");

  // Keep state synced if watch changes
  useEffect(() => {
    if (currentVehicleId !== selectedVehicleId) {
      setSelectedVehicleId(currentVehicleId);
    }
  }, [currentVehicleId, selectedVehicleId]);

  // Selected vehicle object
  const activeVehicle = useMemo(() => {
    return vehicles.find((v) => v.id === selectedVehicleId || v.slug === selectedVehicleId);
  }, [vehicles, selectedVehicleId]);

  const handleVehicleSelect = (vId: string) => {
    setSelectedVehicleId(vId);
    setValue("vehicle_id", vId, { shouldValidate: true });
  };

  const handleLocationChipClick = (loc: string) => {
    setValue("pickup_location", loc, { shouldValidate: true });
  };

  const handleRentalTypeClick = (typeVal: string) => {
    setValue("rental_type", typeVal, { shouldValidate: true });
  };

  // Generate dynamic WhatsApp URL
  const whatsappUrl = useMemo(() => {
    const carName = activeVehicle?.name || "a vehicle";
    const loc = currentPickupLocation || "Dhaka";
    const date = currentPickupDate || "Upcoming date";
    const typeLabel = RENTAL_TYPES.find((t) => t.value === currentRentalType)?.label || currentRentalType;
    const nameText = currentName ? ` by ${currentName}` : "";

    const msg = `Hi Jinia Enterprise! I would like to book ${carName} (${typeLabel})${nameText}.\n` +
      `📅 Pickup Date: ${date}\n` +
      `📍 Pickup Location: ${loc}\n` +
      (currentPhone ? `📞 Phone: ${currentPhone}\n` : "") +
      `Please let me know the availability and confirmation.`;

    return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [activeVehicle, currentRentalType, currentPickupDate, currentPickupLocation, currentName, currentPhone]);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      const vehicle = data.vehicle_id
        ? vehicles.find((v) => v.id === data.vehicle_id || v.slug === data.vehicle_id)
        : null;

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          vehicle_id: vehicle?.id || null,
          vehicle_name: vehicle?.name || "General Fleet Request",
        }),
      });

      if (!response.ok) {
        const resJson = await response.json().catch(() => ({}));
        throw new Error(resJson.error || "Failed to submit booking");
      }

      setSubmittedData(data);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Failed to submit booking. Please try again or WhatsApp our desk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10 px-4 sm:px-8 space-y-8 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl flex items-center justify-center mx-auto text-emerald-600 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-pulse" />
        </div>

        <div className="space-y-3 max-w-lg mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700 bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Request Confirmed
          </span>
          <h3 className="text-3xl sm:text-4xl font-heading font-black text-emerald-950">
            Booking Received!
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Thank you, <strong className="text-emerald-950">{submittedData?.name}</strong>. Our priority booking desk is reviewing your schedule and will reach out to <strong className="text-emerald-950">{submittedData?.phone}</strong> within <span className="text-emerald-700 font-bold">15–30 minutes</span>.
          </p>
        </div>

        {/* Quick Summary Card */}
        <div className="max-w-md mx-auto p-5 rounded-2xl bg-white border border-emerald-100 shadow-md text-left space-y-3 text-xs">
          <div className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Trip Summary</span>
            <span className="text-emerald-600 font-bold">Status: Pending Verification</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Vehicle</span>
              <span className="font-bold text-gray-900">{activeVehicle?.name || "Flexible Fleet"}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Service Type</span>
              <span className="font-bold text-gray-900 capitalize">{submittedData?.rental_type}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Pickup Date</span>
              <span className="font-bold text-gray-900">{submittedData?.pickup_date}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Pickup Location</span>
              <span className="font-bold text-gray-900">{submittedData?.pickup_location || "Dhaka City"}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider gap-2 shadow-lg shadow-emerald-600/20">
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp Now
            </Button>
          </a>

          <Button
            variant="outline"
            onClick={() => {
              setIsSuccess(false);
              reset();
            }}
            className="h-12 px-6 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs uppercase tracking-wider"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="p-4 text-sm font-bold text-red-700 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
          <Info className="h-5 w-5 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ── STEP 1: VEHICLE PREVIEW & SELECTION ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-black flex items-center justify-center">
              1
            </span>
            <h3 className="text-base sm:text-lg font-heading font-black text-emerald-950">
              Choose Vehicle & Service
            </h3>
          </div>
          <Link
            href="/vehicles"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
          >
            Browse Fleet <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        {/* Selected Vehicle Highlight Card */}
        {activeVehicle ? (
          <div className="rounded-2xl bg-linear-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white border border-emerald-500/30 shadow-xl relative overflow-hidden p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 relative z-10">
                {activeVehicle.image_url || (activeVehicle.images && activeVehicle.images[0]) ? (
                  <div 
                    onClick={() => setModalVehicle(activeVehicle)}
                    className="w-24 h-16 rounded-xl bg-emerald-900/80 overflow-hidden shrink-0 border border-emerald-400/30 cursor-pointer group relative"
                  >
                    <img
                      src={activeVehicle.image_url || activeVehicle.images![0]}
                      alt={activeVehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Eye className="h-4 w-4 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-emerald-800/60 flex items-center justify-center shrink-0">
                    <Car className="h-7 w-7 text-emerald-400" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-400/30">
                      {activeVehicle.category || "Selected Fleet"}
                    </span>
                    {activeVehicle.seats && (
                      <span className="text-xs text-emerald-200/80 font-medium">
                        {activeVehicle.seats} Passengers
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-heading font-black text-white mt-0.5">
                    {activeVehicle.name}
                  </h4>
                  {activeVehicle.starting_price && (
                    <p className="text-xs font-bold text-amber-300">
                      ৳{activeVehicle.starting_price.toLocaleString("en-BD")}{" "}
                      <span className="text-emerald-200/70 font-normal">
                        {activeVehicle.price_label || "/day (Chauffeur included)"}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons: View Full Details & Switch Vehicle */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto self-end sm:self-center relative z-10">
                <button
                  type="button"
                  onClick={() => setModalVehicle(activeVehicle)}
                  className="h-9 px-3 text-xs font-bold bg-white/10 hover:bg-white/20 text-emerald-300 rounded-xl border border-emerald-400/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View Details</span>
                </button>

                <select
                  aria-label="Change vehicle"
                  value={selectedVehicleId}
                  onChange={(e) => handleVehicleSelect(e.target.value)}
                  className="h-9 px-3 text-xs font-bold bg-white/15 hover:bg-white/25 text-white rounded-xl border border-white/25 focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
                >
                  <option value="" className="text-gray-900">Change Car...</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id} className="text-gray-900">
                      {v.name} ({v.seats} Seats)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4 Mini Specification Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="p-2 rounded-xl bg-white/5 border border-white/8 text-center">
                <span className="text-[8px] uppercase tracking-wider text-emerald-300/80 font-bold block">Capacity</span>
                <span className="font-bold text-white text-xs">{activeVehicle.seats} Seats</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/8 text-center">
                <span className="text-[8px] uppercase tracking-wider text-emerald-300/80 font-bold block">Climate</span>
                <span className="font-bold text-white text-xs">Pre-Cooled AC</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/8 text-center">
                <span className="text-[8px] uppercase tracking-wider text-emerald-300/80 font-bold block">Chauffeur</span>
                <span className="font-bold text-white text-xs">BRTA Licensed</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/8 text-center">
                <span className="text-[8px] uppercase tracking-wider text-emerald-300/80 font-bold block">Engine / Fuel</span>
                <span className="font-bold text-white text-xs">
                  {activeVehicle.engine_cc ? `${activeVehicle.engine_cc}cc` : "Octane / Hybrid"}
                </span>
              </div>
            </div>

            {/* Features Tags (if present) */}
            {activeVehicle.features && activeVehicle.features.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[9px] uppercase tracking-wider font-bold text-emerald-300/70 mr-1">
                  Features:
                </span>
                {activeVehicle.features.slice(0, 4).map((f, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-400/20 text-emerald-200"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="vehicle_id" className="text-xs font-bold text-gray-700">
              Select Preferred Car / Microbus (Optional)
            </Label>
            <div className="relative">
              <select
                id="vehicle_id"
                value={selectedVehicleId}
                onChange={(e) => handleVehicleSelect(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer appearance-none"
              >
                <option value="">Any Available Vehicle (Concierge will recommend)</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} — {vehicle.seats} Seats ({vehicle.category || "Vehicle"})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Rental Service Type Pills */}
        <div className="space-y-2 pt-2">
          <Label className="text-xs font-bold text-gray-700">
            Select Rental Package
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {RENTAL_TYPES.map((type) => {
              const isSelected = currentRentalType === type.value;
              return (
                <button
                  type="button"
                  key={type.value}
                  onClick={() => handleRentalTypeClick(type.value)}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between",
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 text-emerald-950 shadow-xs"
                      : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50 text-gray-700"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs text-gray-900">{type.label}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 font-medium leading-tight">
                    {type.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── STEP 2: DATES & LOCATION ── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
          <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-black flex items-center justify-center">
            2
          </span>
          <h3 className="text-base sm:text-lg font-heading font-black text-emerald-950">
            Schedule & Pickup Location
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickup_date" className="text-xs font-bold text-gray-700 flex items-center justify-between">
              <span>Pickup Date <span className="text-red-500">*</span></span>
              <span className="text-[10px] text-gray-400 font-normal">Start of journey</span>
            </Label>
            <div className="relative">
              <Input
                id="pickup_date"
                type="date"
                min={todayStr}
                className="h-12 rounded-xl border-gray-200 bg-white text-sm font-semibold text-gray-800 focus:border-emerald-500"
                {...register("pickup_date")}
              />
            </div>
            {errors.pickup_date && (
              <p className="text-xs font-bold text-red-500">{errors.pickup_date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="return_date" className="text-xs font-bold text-gray-700 flex items-center justify-between">
              <span>Return / End Date (Optional)</span>
              <span className="text-[10px] text-gray-400 font-normal">For multi-day/monthly</span>
            </Label>
            <Input
              id="return_date"
              type="date"
              min={currentPickupDate || todayStr}
              className="h-12 rounded-xl border-gray-200 bg-white text-sm font-semibold text-gray-800 focus:border-emerald-500"
              {...register("return_date")}
            />
          </div>
        </div>

        {/* Pickup Location & One-Tap Chips */}
        <div className="space-y-2">
          <Label htmlFor="pickup_location" className="text-xs font-bold text-gray-700 flex items-center justify-between">
            <span>Pickup Address / Landmark</span>
            <span className="text-[10px] text-gray-400 font-normal">Airport, hotel, office, or residence</span>
          </Label>
          <div className="relative">
            <Input
              id="pickup_location"
              placeholder="e.g. Hazrat Shahjalal Airport Terminal 2, or House 12, Road 4, Gulshan-2"
              className="h-12 rounded-xl border-gray-200 bg-white text-sm font-medium text-gray-800 focus:border-emerald-500 pl-10"
              {...register("pickup_location")}
            />
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
          </div>

          {/* Quick-Pick Popular Locations */}
          <div className="pt-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Quick Select Popular Spots:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_LOCATIONS.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => handleLocationChipClick(loc)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-emerald-100 hover:text-emerald-900 text-gray-600 border border-gray-200/80 transition-colors cursor-pointer"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STEP 3: CONTACT & SUBMIT ── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
          <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-black flex items-center justify-center">
            3
          </span>
          <h3 className="text-base sm:text-lg font-heading font-black text-emerald-950">
            Passenger / Contact Details
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold text-gray-700">
              Your Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="e.g. Tanvir Ahmed"
                className="h-12 rounded-xl border-gray-200 bg-white text-sm font-medium text-gray-800 focus:border-emerald-500 pl-10"
                {...register("name")}
              />
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.name && (
              <p className="text-xs font-bold text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-bold text-gray-700 flex items-center justify-between">
              <span>Mobile / WhatsApp Number <span className="text-red-500">*</span></span>
              <span className="text-[10px] text-emerald-700 font-bold">For booking dispatch</span>
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                placeholder="017XX XXXXXX or +880 1XXX XXXXXX"
                className="h-12 rounded-xl border-gray-200 bg-white text-sm font-medium text-gray-800 focus:border-emerald-500 pl-10"
                {...register("phone")}
              />
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
            </div>
            {errors.phone && (
              <p className="text-xs font-bold text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold text-gray-700 flex items-center justify-between">
              <span>Email Address (Optional)</span>
              <span className="text-[10px] text-gray-400 font-normal">For invoice / receipt</span>
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                className="h-12 rounded-xl border-gray-200 bg-white text-sm font-medium text-gray-800 focus:border-emerald-500 pl-10"
                {...register("email")}
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.email && (
              <p className="text-xs font-bold text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination" className="text-xs font-bold text-gray-700">
              Destination / Travel Area (Optional)
            </Label>
            <Input
              id="destination"
              placeholder="e.g. Dhaka City, Gazipur EPZ, Chittagong"
              className="h-12 rounded-xl border-gray-200 bg-white text-sm font-medium text-gray-800 focus:border-emerald-500"
              {...register("destination")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-xs font-bold text-gray-700">
            Special Notes / Flight Number / Requirements (Optional)
          </Label>
          <textarea
            id="message"
            rows={2}
            placeholder="e.g. Inbound flight BG 085 arriving 3:30 PM, need English-speaking driver, child seat, etc."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
            {...register("message")}
          />
        </div>
      </div>

      {/* ── SUBMISSION BUTTONS & FAST-TRACK ── */}
      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-wider text-xs shadow-xl shadow-emerald-600/25 cursor-pointer transition-all duration-300"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Request...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Confirm Reservation Request
            </>
          )}
        </Button>

        {/* Alternative Fast-Track: Instant WhatsApp */}
        <div className="text-center pt-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
            — Or Reserve Faster via Direct Chat —
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/50 hover:bg-emerald-100/70 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <MessageSquare className="h-4 w-4 text-emerald-600" />
            <span>Send Details to WhatsApp Desk (Instant Quote)</span>
          </a>
        </div>

        {/* Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-500 pt-3">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            No advance payment needed for initial quote
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-emerald-600" />
            15–30 min response time
          </span>
        </div>
      </div>

      {/* Interactive Details Modal */}
      <VehicleDetailsModal
        vehicle={modalVehicle}
        onClose={() => setModalVehicle(null)}
      />
    </form>
  );
}
