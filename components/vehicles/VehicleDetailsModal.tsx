import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Users,
  Snowflake,
  ShieldCheck,
  Fuel,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Luggage,
  Compass,
  FileCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { ImageCarousel } from "./ImageCarousel";

export interface ModalVehicle {
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
  is_featured?: boolean;
}

interface VehicleDetailsModalProps {
  vehicle: ModalVehicle | null;
  onClose: () => void;
}

export function VehicleDetailsModal({ vehicle, onClose }: VehicleDetailsModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (vehicle) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [vehicle, onClose]);

  if (!mounted || !vehicle) return null;

  const displayImages =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images
      : vehicle.image_url
      ? [vehicle.image_url]
      : ["/images/hero-car.jpg"];

  const seatsCount = vehicle.seats || 4;

  const luggageEstimate =
    seatsCount >= 10
      ? "8–12 Large Bags"
      : seatsCount >= 7
      ? "4–6 Suitcases"
      : "2–3 Medium Suitcases";

  const engineText = vehicle.engine_cc
    ? `${vehicle.engine_cc}cc Octane / Hybrid`
    : "Octane / Hybrid";

  const rentalTypes =
    vehicle.rental_types && vehicle.rental_types.length > 0
      ? vehicle.rental_types
      : ["Daily Rental", "Airport Transfer", "Monthly Retainer", "Corporate Fleet"];

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-emerald-950/85 backdrop-blur-md z-[9999]"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-emerald-900/20 shadow-2xl z-[10000] scrollbar-none my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer shadow-lg"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Vehicle Media Header */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-emerald-950">
            <ImageCarousel
              images={displayImages}
              vehicleName={vehicle.name}
              priority={true}
            />
            <div className="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-950/30 to-transparent pointer-events-none z-10" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/40 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                {vehicle.category || "Vehicle"}
              </span>
              {vehicle.is_featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                  <Star className="h-3 w-3 fill-amber-950" />
                  Featured
                </span>
              )}
            </div>

            {/* Bottom Title & Price */}
            <div className="absolute bottom-4 left-5 right-5 z-20 flex items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/80 block">
                  Fleet Specification
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight">
                  {vehicle.name}
                </h3>
              </div>
              {vehicle.starting_price && (
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase text-emerald-300/80 font-bold block leading-none">
                    {vehicle.price_label || "Starting From"}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-amber-300 leading-none mt-0.5 block">
                    ৳{vehicle.starting_price.toLocaleString("en-BD")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 space-y-6">
            
            {/* 6 Essential Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                <Users className="h-4 w-4 text-emerald-700 mx-auto mb-1" />
                <span className="text-[9px] uppercase text-gray-500 font-bold block tracking-wider">Capacity</span>
                <span className="text-xs font-black text-emerald-950">{seatsCount} Passengers</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                <Luggage className="h-4 w-4 text-emerald-700 mx-auto mb-1" />
                <span className="text-[9px] uppercase text-gray-500 font-bold block tracking-wider">Luggage</span>
                <span className="text-xs font-black text-emerald-950">{luggageEstimate}</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                <Snowflake className="h-4 w-4 text-emerald-700 mx-auto mb-1" />
                <span className="text-[9px] uppercase text-gray-500 font-bold block tracking-wider">Climate Control</span>
                <span className="text-xs font-black text-emerald-950">Pre-Cooled Dual AC</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                <Fuel className="h-4 w-4 text-emerald-700 mx-auto mb-1" />
                <span className="text-[9px] uppercase text-gray-500 font-bold block tracking-wider">Engine / Fuel</span>
                <span className="text-xs font-black text-emerald-950 truncate block">{engineText}</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                <ShieldCheck className="h-4 w-4 text-emerald-700 mx-auto mb-1" />
                <span className="text-[9px] uppercase text-gray-500 font-bold block tracking-wider">Chauffeur</span>
                <span className="text-xs font-black text-emerald-950">BRTA & Vetted</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                <Compass className="h-4 w-4 text-emerald-700 mx-auto mb-1" />
                <span className="text-[9px] uppercase text-gray-500 font-bold block tracking-wider">Coverage</span>
                <span className="text-xs font-black text-emerald-950">Dhaka & Nationwide</span>
              </div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="space-y-1.5 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 block">
                  About this vehicle
                </span>
                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                  {vehicle.description}
                </p>
              </div>
            )}

            {/* Key Features & Amenities */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 block">
                  Key Features & Amenities
                </span>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-100/90 text-emerald-950 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                    >
                      <Sparkles className="h-3 w-3 text-emerald-600" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Rental Packages */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 block">
                Available Hire Packages
              </span>
              <div className="flex flex-wrap gap-2">
                {rentalTypes.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-800 text-xs font-semibold flex items-center gap-1.5 border border-gray-200/80"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Standard Jinia Inclusions Notice */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/5 border border-emerald-950/10 text-xs text-gray-600 space-y-1.5 font-medium">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-[11px] uppercase tracking-wider">
                <FileCheck className="h-4 w-4 text-emerald-700" />
                <span>All Rentals Include:</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Dedicated licensed chauffeur · Pre-cooled interior · 24/7 Helpline assistance · Transparent fuel policy · Backup replacement car SLA.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href={`/booking?vehicle=${vehicle.slug || vehicle.id}`}
                onClick={onClose}
                className="w-full sm:flex-1"
              >
                <Button className="w-full h-12 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-black uppercase tracking-wider text-xs shadow-md cursor-pointer flex items-center justify-center gap-1">
                  <span>Reserve {vehicle.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  `Hi Jinia Enterprise — I would like a quote and availability for the ${vehicle.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-5 rounded-xl border-emerald-300 text-emerald-950 hover:bg-emerald-50 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-600" />
                  <span>WhatsApp Quote</span>
                </Button>
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
