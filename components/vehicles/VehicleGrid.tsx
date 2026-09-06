"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { VehicleCard } from "./VehicleCard";
import {
  Search,
  SlidersHorizontal,
  X,
  Users,
  Grid3X3,
  LayoutList,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  ChevronRight,
  Snowflake,
  Fuel,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { orderVehicleImages } from "@/lib/vehicles/images";
import { Select } from "@/components/ui/select";

export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
  seats: number;
  engine_cc?: number | null;
  features?: string[];
  rental_types: string[];
  description?: string;
  images?: string[];
  image_url?: string | null;
  starting_price?: number | null;
  price_label?: string;
  is_active: boolean;
  sort_order: number;
  is_featured: boolean;
}

interface VehicleGridProps {
  vehicles: Vehicle[];
}

const CATEGORIES = ["All", "Economy", "Standard", "Premium", "SUV", "Microbus", "Bus"] as const;
const INITIAL_DISPLAY_COUNT = 6;
const LOAD_MORE_STEP = 6;

type SortOption = "featured" | "price-asc" | "price-desc" | "seats-desc";

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [inspectVehicle, setInspectVehicle] = useState<Vehicle | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_DISPLAY_COUNT);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const resetPagination = () => {
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    resetPagination();
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    resetPagination();
  };

  const handleCapacityChange = (cap: string) => {
    setSelectedCapacity(cap);
    resetPagination();
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    resetPagination();
  };

  // Close inspect modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setInspectVehicle(null);
        return;
      }

      if (e.key === "Tab") {
        const dialog = document.getElementById("vehicle-quick-inspect");
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (inspectVehicle) {
      window.addEventListener("keydown", handleKeyDown);
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = previousOverflow;
      };
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inspectVehicle]);

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Category filter
        if (selectedCategory !== "All" && v.category !== selectedCategory) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = v.name.toLowerCase().includes(q);
          const matchCategory = v.category.toLowerCase().includes(q);
          const matchDesc = v.description?.toLowerCase().includes(q);
          const matchFeatures = v.features?.some((f) => f.toLowerCase().includes(q));
          if (!matchName && !matchCategory && !matchDesc && !matchFeatures) return false;
        }

        // Capacity filter
        if (selectedCapacity === "4-5" && (v.seats < 4 || v.seats > 5)) return false;
        if (selectedCapacity === "7-8" && (v.seats < 7 || v.seats > 8)) return false;
        if (selectedCapacity === "10-14" && (v.seats < 9 || v.seats > 15)) return false;
        if (selectedCapacity === "20+" && v.seats < 20) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return (a.starting_price || 0) - (b.starting_price || 0);
        }
        if (sortBy === "price-desc") {
          return (b.starting_price || 0) - (a.starting_price || 0);
        }
        if (sortBy === "seats-desc") {
          return b.seats - a.seats;
        }
        // Default: featured first, then sort_order
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return a.sort_order - b.sort_order;
      });
  }, [vehicles, selectedCategory, searchQuery, selectedCapacity, sortBy]);

  // Displayed slice
  const displayedVehicles = useMemo(() => {
    return filteredVehicles.slice(0, visibleCount);
  }, [filteredVehicles, visibleCount]);

  const hasMore = visibleCount < filteredVehicles.length;

  // Dynamic category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: vehicles.length };
    vehicles.forEach((v) => {
      counts[v.category] = (counts[v.category] || 0) + 1;
    });
    return counts;
  }, [vehicles]);

  return (
    <div className="space-y-8 mb-24 w-full">
      {/* ── Dynamic Controls Bar (Spanning Full Wide Width) ── */}
      <div className="w-full p-4 sm:p-6 rounded-3xl bg-white/90 border border-emerald-900/10 shadow-sm backdrop-blur-md space-y-4">
        
        {/* Top Row: Search & Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-900/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search Prado, Alphard, Premio, seats..."
              className="w-full h-11 pl-10 pr-9 rounded-2xl bg-emerald-50/50 border border-emerald-900/10 text-xs font-normal text-emerald-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Secondary Controls: Capacity, Sort & View */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Seat Capacity Selector */}
            <div className="flex items-center gap-1.5 bg-emerald-50/60 p-1 rounded-xl border border-emerald-900/10 text-xs font-normal text-emerald-950">
              <Users className="h-3.5 w-3.5 ml-2 text-emerald-700" />
              <Select
                value={selectedCapacity}
                onValueChange={handleCapacityChange}
                aria-label="Seat capacity"
                triggerClassName="h-8 min-w-[11rem] border-0 bg-transparent py-1 text-xs font-medium hover:border-0 focus-visible:ring-amber-400/30"
                options={[
                  { value: "All", label: "All Seats" },
                  { value: "4-5", label: "4–5 Seats (Sedans)" },
                  { value: "7-8", label: "7–8 Seats (SUVs/Vans)" },
                  { value: "10-14", label: "10–14 Seats (Microbus)" },
                  { value: "20+", label: "28+ Seats (Coach)" },
                ]}
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-emerald-50/60 p-1 rounded-xl border border-emerald-900/10 text-xs font-normal text-emerald-950">
              <SlidersHorizontal className="h-3.5 w-3.5 ml-2 text-emerald-700" />
              <Select
                value={sortBy}
                onValueChange={(value) => handleSortChange(value as SortOption)}
                aria-label="Sort vehicles"
                triggerClassName="h-8 min-w-[10rem] border-0 bg-transparent py-1 text-xs font-medium hover:border-0 focus-visible:ring-amber-400/30"
                options={[
                  { value: "featured", label: "Featured First" },
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                  { value: "seats-desc", label: "Capacity: High to Low" },
                ]}
              />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-emerald-50/60 p-1 rounded-xl border border-emerald-900/10">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                className={cn(
                  "p-1.5 rounded-lg transition-all cursor-pointer",
                  viewMode === "grid" ? "bg-emerald-900 text-white shadow-xs" : "text-emerald-950/60 hover:text-emerald-950"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List View"
                className={cn(
                  "p-1.5 rounded-lg transition-all cursor-pointer",
                  viewMode === "list" ? "bg-emerald-900 text-white shadow-xs" : "text-emerald-950/60 hover:text-emerald-950"
                )}
              >
                <LayoutList className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Category Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-900/10">
          {CATEGORIES.map((category) => {
            const count = categoryCounts[category] || 0;
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 border",
                  isSelected
                    ? "bg-emerald-900 text-white border-emerald-900 shadow-sm"
                    : "bg-white/80 hover:bg-emerald-50 text-emerald-950/80 border-emerald-950/10 hover:border-emerald-300"
                )}
              >
                <span>{category}</span>
                {count > 0 && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-medium",
                      isSelected ? "bg-emerald-800 text-emerald-100" : "bg-emerald-100 text-emerald-800"
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Active Filters Feedback ── */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-2">
        <p>
          Showing <span className="font-medium text-emerald-950">{displayedVehicles.length}</span> of{" "}
          <span className="font-medium text-emerald-950">{filteredVehicles.length}</span> vehicle{filteredVehicles.length !== 1 ? "s" : ""}
          {selectedCategory !== "All" && <span> in <strong className="text-emerald-900">{selectedCategory}</strong></span>}
          {searchQuery && <span> matching &ldquo;<strong className="text-emerald-900">{searchQuery}</strong>&rdquo;</span>}
        </p>

        {(selectedCategory !== "All" || searchQuery || selectedCapacity !== "All") && (
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setSelectedCapacity("All");
            }}
            className="text-xs font-medium text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* ── Clean, Uniform & Responsive Grid of Vehicles ── */}
      {displayedVehicles.length > 0 ? (
        <div className="space-y-12">
          <div
            className={cn(
              "gap-6 lg:gap-8 w-full",
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid grid-cols-1 md:grid-cols-2"
            )}
          >
            {displayedVehicles.map((vehicle, index) => (
              <div key={vehicle.id} className="w-full">
                <VehicleCard
                  vehicle={vehicle}
                  priority={index < 3}
                  onQuickInspect={() => setInspectVehicle(vehicle)}
                />
              </div>
            ))}
          </div>

          {/* ── Progressive pagination ── */}
          {hasMore && (
            <div className="flex flex-col items-center justify-center py-6 space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                className="rounded-full border-emerald-900/20 px-5 text-xs font-medium text-emerald-900 hover:bg-emerald-50"
              >
                Load more vehicles
              </Button>
              <p className="text-[11px] text-gray-500 font-normal">
                Showing {displayedVehicles.length} of {filteredVehicles.length} vehicles
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 glass-card max-w-xl mx-auto rounded-3xl p-8 border border-white/80">
          <Car className="h-12 w-12 text-emerald-700/30 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-medium text-emerald-950 mb-2">
            No Matching Vehicles Found
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            We couldn&apos;t find any vehicles matching your filter criteria. Try resetting your search filters.
          </p>
          <Button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setSelectedCapacity("All");
            }}
            className="rounded-xl bg-emerald-900 text-white hover:bg-emerald-800"
          >
            Reset All Filters
          </Button>
        </div>
      )}

      {/* ── Interactive Quick Specs Modal ── */}
      <AnimatePresence>
        {inspectVehicle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" aria-label="Vehicle quick inspect">
            <button
              type="button"
              aria-label="Close vehicle details"
              onClick={() => setInspectVehicle(null)}
              className="absolute inset-0 cursor-default bg-emerald-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="vehicle-quick-inspect-title"
              id="vehicle-quick-inspect"
              className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-emerald-900/20 bg-white shadow-[0_24px_60px_-40px_rgba(6,52,38,.45)] scrollbar-none"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setInspectVehicle(null)}
                aria-label="Close vehicle details"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-[16/9] overflow-hidden bg-emerald-950">
                <img
                  src={orderVehicleImages(inspectVehicle.images, inspectVehicle.image_url)[0] || "/images/hero-car.jpg"}
                  alt={inspectVehicle.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-950/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                      {inspectVehicle.category}
                    </span>
                    <h3 id="vehicle-quick-inspect-title" className="text-2xl sm:text-3xl font-heading font-medium text-white mt-1">
                      {inspectVehicle.name}
                    </h3>
                  </div>
                  {inspectVehicle.starting_price && (
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-emerald-300/80 font-medium block">Starting From</span>
                      <span className="text-xl sm:text-2xl font-medium text-amber-300">
                        ৳{inspectVehicle.starting_price.toLocaleString("en-BD")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                    <Users className="h-4 w-4 text-emerald-700 mx-auto mb-1" />
                    <span className="text-[10px] uppercase text-gray-500 font-medium block">Capacity</span>
                    <span className="text-xs font-medium text-emerald-950">{inspectVehicle.seats} Passengers</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                    <Snowflake className="h-4 w-4 text-emerald-700 mx-auto mb-1" />
                    <span className="text-[10px] uppercase text-gray-500 font-medium block">Climate</span>
                    <span className="text-xs font-medium text-emerald-950">Pre-Cooled AC</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                    <ShieldCheck className="h-4 w-4 text-emerald-700 mx-auto mb-1" />
                    <span className="text-[10px] uppercase text-gray-500 font-medium block">Chauffeur</span>
                    <span className="text-xs font-medium text-emerald-950">BRTA Licensed</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                    <Fuel className="h-4 w-4 text-emerald-700 mx-auto mb-1" />
                    <span className="text-[10px] uppercase text-gray-500 font-medium block">Engine / Fuel</span>
                    <span className="text-xs font-medium text-emerald-950">
                      {inspectVehicle.engine_cc ? `${inspectVehicle.engine_cc}cc` : "Octane / Hybrid"}
                    </span>
                  </div>
                </div>

                {inspectVehicle.description && (
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    {inspectVehicle.description}
                  </p>
                )}

                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-800 block">
                    Available Rental Types
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(inspectVehicle.rental_types || []).map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 rounded-xl bg-gray-100 text-gray-800 text-xs font-normal flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Link href={`/booking?vehicle=${inspectVehicle.slug || inspectVehicle.id}`} className="w-full sm:flex-1">
                    <Button className="w-full h-12 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-medium uppercase tracking-wider text-xs shadow-[0_6px_18px_-14px_rgba(6,52,38,.30)] cursor-pointer">
                      <span>Reserve {inspectVehicle.name}</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                      `Hi Jinia Enterprise — I would like a quote and availability for the ${inspectVehicle.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="outline" className="w-full sm:w-auto h-12 px-6 rounded-xl border-emerald-300 text-emerald-950 hover:bg-emerald-50 text-xs font-medium flex items-center gap-2 cursor-pointer">
                      <MessageSquare className="h-4 w-4 text-emerald-600" />
                      <span>WhatsApp Quote</span>
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
