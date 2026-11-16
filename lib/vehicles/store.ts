import { createPublicReadClient } from "@/lib/supabase/static";
import { vehiclePhotos } from "@/lib/vehicles/photos";
import type { StoreVehicle } from "@/components/trip/FleetStore";

/** The vehicle columns the public fleet views read. */
export type FleetRow = {
  id: string;
  name: string;
  slug: string;
  seats: number;
  starting_price: number | null;
  features: string[] | null;
  rental_types: string[] | null;
  images: string[] | null;
  image_url: string | null;
  is_featured: boolean;
  sort_order: number;
  description: string | null;
  engine_cc: number | null;
  price_label: string | null;
  model_year: number | null;
  transmission: string | null;
  fuel_type: string | null;
  colour: string | null;
  luggage_bags: number | null;
  insurance: string | null;
};

export async function getFleetRows(): Promise<FleetRow[]> {
  const supabase = createPublicReadClient();
  const { data, error } = await supabase.from("vehicles").select("*").eq("is_active", true).order("sort_order", { ascending: true });
  if (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
  return (data as FleetRow[]) || [];
}

/** Database rows → the white-tile cards FleetStore renders, admin photos first. */
export function toStoreVehicles(rows: FleetRow[]): StoreVehicle[] {
  return rows.map((r) => {
    const { photos, fallback } = vehiclePhotos(r.images, r.image_url, r.name);
    return {
      id: r.id,
      name: r.name,
      slug: r.slug,
      seats: r.seats,
      starting_price: r.starting_price,
      features: r.features ?? [],
      rental_types: r.rental_types ?? [],
      cutout: photos,
      fallback,
      featured: !!r.is_featured,
      details: {
        description: r.description?.trim() || "",
        engine_cc: r.engine_cc ?? null,
        price_label: r.price_label || "per day",
        model_year: r.model_year ?? null,
        transmission: r.transmission || null,
        fuel_type: r.fuel_type || null,
        colour: r.colour || null,
        luggage_bags: r.luggage_bags ?? null,
        insurance: r.insurance?.trim() || null,
      },
    };
  });
}
