import { getFleetRows } from "@/lib/vehicles/store";
import { PUBLIC_JSON_HEADERS, toPublicVehicle } from "@/lib/vehicles/public";

// Public, read-only fleet data. Refreshed every minute.
export const revalidate = 60;

const RENTAL = ["daily", "weekly", "monthly", "corporate"];

/** GET /api/vehicles?min_seats=&rental_type=&max_day_rate_bdt= */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const minSeats = Number(q.get("min_seats") ?? 0) || 0;
  const rental = (q.get("rental_type") ?? "").toLowerCase();
  const maxRate = Number(q.get("max_day_rate_bdt") ?? 0) || 0;

  if (rental && !RENTAL.includes(rental)) {
    return Response.json(
      { error: `rental_type must be one of: ${RENTAL.join(", ")}` },
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } },
    );
  }

  const rows = await getFleetRows();
  const vehicles = rows
    .filter((r) => r.seats >= minSeats)
    .filter((r) => !rental || (r.rental_types ?? []).some((t) => t.toLowerCase() === rental))
    .filter((r) => !maxRate || (r.starting_price != null && r.starting_price <= maxRate))
    .map(toPublicVehicle);

  return Response.json({ count: vehicles.length, vehicles }, { headers: PUBLIC_JSON_HEADERS });
}
