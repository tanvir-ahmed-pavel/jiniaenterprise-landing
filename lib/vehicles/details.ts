/** Plain helpers for vehicle facts. Safe to import from server and client code. */

/** The admin-filled facts a car page and its drawer show. */
export type VehicleFacts = {
  description: string;
  engine_cc: number | null;
  price_label: string;
  model_year: number | null;
  transmission: string | null;
  fuel_type: string | null;
  colour: string | null;
  luggage_bags: number | null;
  insurance: string | null;
};

/** The spec list: only the facts that are filled in. */
export function specRows(d: VehicleFacts): Array<[string, string]> {
  const rows: Array<[string, string | number | null]> = [
    ["Model year", d.model_year],
    ["Engine", d.engine_cc ? `${d.engine_cc.toLocaleString("en-US")} cc` : null],
    ["Transmission", d.transmission],
    ["Fuel", d.fuel_type],
    ["Colour", d.colour],
    ["Luggage", d.luggage_bags ? `${d.luggage_bags} ${d.luggage_bags === 1 ? "bag" : "bags"}` : null],
    ["Billed", d.price_label],
  ];
  return rows.filter((r): r is [string, string] => r[1] !== null && r[1] !== "");
}

/** Plain text from the admin description (it may hold a little HTML). */
export const plainText = (s: string) => s.replace(/<[^>]*>/g, "").trim();
