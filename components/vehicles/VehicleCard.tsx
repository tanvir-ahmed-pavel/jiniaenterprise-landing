"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Eye, Fuel, ShieldCheck, Users } from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";
import { orderVehicleImages } from "@/lib/vehicles/images";

const formatPrice = (price: number) => "৳" + price.toLocaleString("en-BD");

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
  seats: number;
  engine_cc?: number | null;
  features?: string[];
  rental_types?: string[];
  description?: string;
  images?: string[];
  image_url?: string | null;
  starting_price?: number | null;
  price_label?: string;
  is_active: boolean;
  sort_order: number;
  is_featured?: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
  onQuickInspect?: () => void;
}

export const VehicleCard = memo(function VehicleCard({
  vehicle,
  priority = false,
  onQuickInspect,
}: VehicleCardProps) {
  const images = useMemo(
    () => orderVehicleImages(vehicle.images, vehicle.image_url),
    [vehicle.images, vehicle.image_url],
  );

  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-lg border border-emerald-950/12 bg-white transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-emerald-950/30 hover:shadow-[0_14px_30px_-24px_rgba(6,52,38,.35)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-emerald-950/10">
        <ImageCarousel images={images} vehicleName={vehicle.name} priority={priority} />
        <span className="type-label absolute left-4 top-4 border-l-2 border-amber-400 bg-white/90 py-1 pl-2.5 pr-3 text-emerald-950">
          {vehicle.category}
        </span>
        {vehicle.is_featured && (
          <span className="type-label absolute right-4 top-4 text-emerald-700">Selected</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="type-heading font-heading text-lg text-emerald-950">{vehicle.name}</h3>
            {/* Clamped so a long description cannot push one card's rhythm out
                of step with its row. */}
            <p className="mt-2 line-clamp-3 min-h-15 text-sm leading-relaxed text-emerald-950/60">
              {vehicle.description || "Chauffeur-driven comfort, maintained and ready on schedule."}
            </p>
          </div>
          {vehicle.starting_price && (
            <p className="shrink-0 text-right text-sm font-medium text-emerald-950">
              {formatPrice(vehicle.starting_price)}
              <span className="type-label mt-1 block text-emerald-950/45">{vehicle.price_label || "from / day"}</span>
            </p>
          )}
        </div>

        {/* Pushed to the bottom so specs and actions line up across a row no
            matter how long each description runs. */}
        <div className="mt-auto pt-6">
          <dl className="grid grid-cols-3 border-y border-emerald-950/10 py-4 text-center">
            <div>
              <Users className="mx-auto h-4 w-4 text-emerald-700" aria-hidden />
              <dt className="type-label mt-2 text-emerald-950/45">Seats</dt>
              <dd className="mt-1 text-sm font-medium text-emerald-950">{vehicle.seats}</dd>
            </div>
            <div className="border-x border-emerald-950/10">
              <Fuel className="mx-auto h-4 w-4 text-emerald-700" aria-hidden />
              <dt className="type-label mt-2 text-emerald-950/45">Engine</dt>
              <dd className="mt-1 text-sm font-medium text-emerald-950">{vehicle.engine_cc ? `${vehicle.engine_cc}cc` : "AC"}</dd>
            </div>
            <div>
              <ShieldCheck className="mx-auto h-4 w-4 text-emerald-700" aria-hidden />
              <dt className="type-label mt-2 text-emerald-950/45">Service</dt>
              <dd className="mt-1 text-sm font-medium text-emerald-950">Driver</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center justify-between gap-3">
            <Link href={`/vehicles/${vehicle.slug || vehicle.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-emerald-950 transition-colors hover:text-emerald-600">
              View vehicle <ArrowRight className="h-4 w-4 transition-transform group-hover/card:translate-x-1" />
            </Link>
            {onQuickInspect ? (
              <button type="button" onClick={onQuickInspect} className="inline-flex h-9 w-9 items-center justify-center border border-emerald-950/15 text-emerald-950 transition-colors hover:bg-emerald-950 hover:text-white" aria-label={`Quick specs for ${vehicle.name}`}>
                <Eye className="h-4 w-4" />
              </button>
            ) : (
              <Link href={`/booking?vehicle=${vehicle.slug || vehicle.id}`} className="inline-flex h-9 items-center rounded-full bg-emerald-950 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-800">
                Reserve
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});
