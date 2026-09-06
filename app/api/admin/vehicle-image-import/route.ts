import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { uploadToStorage } from "@/lib/storage/minio";
import { readFile } from "node:fs/promises";
import path from "node:path";

type ImportItem = { vehicleId: string; files: string[] };
type CreateItem = { name: string; slug: string; files: string[]; description: string; seats: number; engine_cc: number; category: "Premium" | "Standard" };

function assertVehicleAssetPath(relative: string) {
  const normalized = path.posix.normalize(relative.replaceAll("\\", "/"));
  if (!normalized.startsWith("images/vehicles/variants/") || normalized.includes("..")) {
    throw new Error("Invalid asset path");
  }
  return normalized;
}

/** Authenticated bulk importer used by the admin workspace for locally generated variants. */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as { updates?: ImportItem[]; creates?: CreateItem[] };
  const updates = body.updates || [];
  const creates = body.creates || [];
  if (!Array.isArray(updates) || updates.length > 15 || creates.length > 2) {
    return NextResponse.json({ error: "Provide up to 15 updates and 2 new vehicles" }, { status: 400 });
  }

  const results: Array<{ vehicleId: string; urls: string[] }> = [];
  for (const item of updates) {
    if (!item?.vehicleId || !Array.isArray(item.files) || item.files.length !== 3) {
      return NextResponse.json({ error: "Each vehicle requires exactly three files" }, { status: 400 });
    }
    const urls = await Promise.all(item.files.map(async (relative) => {
      const normalized = assertVehicleAssetPath(relative);
      const absolute = path.join(process.cwd(), "public", normalized);
      const buffer = await readFile(absolute);
      const uploaded = await uploadToStorage({
        buffer,
        fileName: path.basename(normalized),
        contentType: normalized.endsWith(".webp") ? "image/webp" : "image/png",
        folder: "vehicles",
      });
      return uploaded.url;
    }));
    const { error } = await supabase.from("vehicles").update({ image_url: urls[0], images: urls } as never).eq("id", item.vehicleId);
    if (error) throw error;
    results.push({ vehicleId: item.vehicleId, urls });
  }
  const created: unknown[] = [];
  for (const item of creates) {
    if (!item.name || !item.slug || !Array.isArray(item.files) || item.files.length !== 3) return NextResponse.json({ error: "Each new vehicle requires three files" }, { status: 400 });
    const urls = item.files.map((relative) => `/${assertVehicleAssetPath(relative)}`);
    const { data, error } = await supabase.from("vehicles").insert({ name: item.name, slug: item.slug, category: item.category, seats: item.seats, engine_cc: item.engine_cc, description: item.description, features: ["Air Conditioning", "Professional Chauffeur", "Executive Interior"], rental_types: ["Daily", "Corporate", "On demand"], starting_price: null, price_label: "On demand", image_url: urls[0], images: urls, is_active: true, is_featured: false, sort_order: 9999 } as never).select().single();
    if (error) throw error;
    created.push(data);
  }
  return NextResponse.json({ success: true, updated: results.length, created: created.length, results });
}
