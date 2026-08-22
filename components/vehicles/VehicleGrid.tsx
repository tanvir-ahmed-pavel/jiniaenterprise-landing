"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { VehicleCard } from "./VehicleCard";
import {
  Sparkles,
  Car,
  Search,
  SlidersHorizontal,
  X,
  Users,
  Grid3X3,
  LayoutList,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ChevronRight,
  Snowflake,
  Fuel,
  Calendar,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { VehicleDetailsModal } from "./VehicleDetailsModal";

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

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "seats-desc">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [inspectVehicle, setInspectVehicle] = useState<Vehicle | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_DISPLAY_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Close inspect modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInspectVehicle(null);
    };
    if (inspectVehicle) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inspectVehicle]);

  // Reset pagination when filter parameters change
  useEffect(() => {
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  }, [selectedCategory, searchQuery, selectedCapacity, sortBy]);

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

  // ── Automatic Infinite Scroll Loader ──
  useEffect(() => {
    if (!hasMore) return;
    const currentTarget = observerTarget.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + LOAD_MORE_STEP);
            setIsLoadingMore(false);
          }, 350);
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(currentTarget);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore]);

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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Prado, Alphard, Premio, seats..."
              className="w-full h-11 pl-10 pr-9 rounded-2xl bg-emerald-50/50 border border-emerald-900/10 text-xs font-semibold text-emerald-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Secondary Controls: Capacity, Sort & View */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Seat Capacity Selector */}
            <div className="flex items-center gap-1.5 bg-emerald-50/60 p-1 rounded-xl border border-emerald-900/10 text-xs font-semibold text-emerald-950">
              <Users className="h-3.5 w-3.5 ml-2 text-emerald-700" />
              <select
                value={selectedCapacity}
                onChange={(e) => setSelectedCapacity(e.target.value)}
                className="bg-transparent text-xs font-bold text-emerald-950 py-1 pr-2 pl-1 focus:outline-none cursor-pointer"
              >
                <option value="All">All Seats</option>
                <option value="4-5">4–5 Seats (Sedans)</option>
                <option value="7-8">7–8 Seats (SUVs/Vans)</option>
                <option value="10-14">10–14 Seats (Microbus)</option>
                <option value="20+">28+ Seats (Coach)</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-emerald-50/60 p-1 rounded-xl border border-emerald-900/10 text-xs font-semibold text-emerald-950">
              <SlidersHorizontal className="h-3.5 w-3.5 ml-2 text-emerald-700" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-emerald-950 py-1 pr-2 pl-1 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="seats-desc">Capacity: High to Low</option>
              </select>
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
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 border",
                  isSelected
                    ? "bg-emerald-900 text-white border-emerald-900 shadow-sm"
                    : "bg-white/80 hover:bg-emerald-50 text-emerald-950/80 border-emerald-950/10 hover:border-emerald-300"
                )}
              >
                <span>{category}</span>
                {count > 0 && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-black",
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
          Showing <span className="font-bold text-emerald-950">{displayedVehicles.length}</span> of{" "}
          <span className="font-bold text-emerald-950">{filteredVehicles.length}</span> vehicle{filteredVehicles.length !== 1 ? "s" : ""}
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
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
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
                  isWide={false}
                  onQuickInspect={() => setInspectVehicle(vehicle)}
                />
              </div>
            ))}
          </div>

          {/* ── Automatic Infinite Scroll Observer Target ── */}
          {hasMore && (
            <div
              ref={observerTarget}
              className="flex flex-col items-center justify-center py-6 space-y-2"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 border border-emerald-900/15 text-xs font-bold text-emerald-900 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                <span>Loading more vehicles...</span>
              </div>
              <p className="text-[11px] text-gray-500 font-semibold">
                Showing {displayedVehicles.length} of {filteredVehicles.length} vehicles
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 glass-card max-w-xl mx-auto rounded-3xl p-8 border border-white/80">
          <Car className="h-12 w-12 text-emerald-700/30 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-black text-emerald-950 mb-2">
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
      <VehicleDetailsModal
        vehicle={inspectVehicle}
        onClose={() => setInspectVehicle(null)}
      />
    </div>
  );
}
