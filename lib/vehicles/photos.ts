import { orderVehicleImages } from "@/lib/vehicles/images";
import { cutoutFor, type Cutout } from "@/lib/vehicles/cutouts";

/**
 * Which photos a vehicle card shows. The admin panel is the source of truth:
 * whatever images a vehicle has there are used, the one named "side" as the
 * main shot and the one named "front" on hover (else the first two in admin
 * order).
 *
 * The only exception is the original studio batch uploaded before the
 * redesign (white backgrounds, no shadow). Until a vehicle's images are
 * replaced in admin, those are swapped for the matching cut-out photos in
 * /public/images/vehicles/photos so the cards stay clean. Upload anything new
 * in admin and it takes over immediately.
 */
const LEGACY_HOST = "storage.rentabd.com";
const LEGACY_BEFORE = 1_788_800_000_000; // upload timestamp in the file name

function isLegacy(url: string): boolean {
  if (!url.includes(LEGACY_HOST)) return false;
  const stamp = /-(\d{13})-[a-z0-9]{5}\.(?:png|jpe?g|webp)$/i.exec(url.split("?")[0]);
  return !!stamp && Number(stamp[1]) < LEGACY_BEFORE;
}

const angle = (url: string, word: RegExp) => word.test(url.split("/").pop()?.toLowerCase() ?? "");
const SIDE = /(^|[-_.])(side|profile)([-_.]|$)/;
const FRONT = /(^|[-_.])front([-_.]|$)/;

export type VehiclePhotos = { photos: Cutout | null; fallback: string | null };

export function vehiclePhotos(images: string[] | null | undefined, imageUrl: string | null | undefined, name?: string): VehiclePhotos {
  const all = orderVehicleImages(images, imageUrl);
  const fresh = all.filter((u) => !isLegacy(u));
  if (fresh.length) {
    const side = fresh.find((u) => angle(u, SIDE)) ?? fresh[0];
    const front = fresh.find((u) => u !== side && angle(u, FRONT)) ?? fresh.find((u) => u !== side) ?? side;
    return { photos: { side, front }, fallback: side };
  }
  return { photos: cutoutFor(all, name), fallback: all[0] ?? null };
}
