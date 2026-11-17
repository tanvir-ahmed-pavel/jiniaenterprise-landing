import { getFleetRows } from "@/lib/vehicles/store";
import { PUBLIC_JSON_HEADERS, toPublicVehicle } from "@/lib/vehicles/public";

export const revalidate = 60;

/** GET /api/vehicles/{slug}: one car, or 404 with a pointer to the list. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rows = await getFleetRows();
  const row = rows.find((r) => r.slug === slug);
  if (!row) {
    return Response.json(
      { error: `No active car has the slug "${slug}". List the cars at /api/vehicles.` },
      { status: 404, headers: { "Access-Control-Allow-Origin": "*" } },
    );
  }
  return Response.json(toPublicVehicle(row), { headers: PUBLIC_JSON_HEADERS });
}
