import { createClient } from "@/lib/supabase/server";
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
};

export async function getFleetRows(): Promise<FleetRow[]> {
  const supabase = await createClient();
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
    };
  });
}
