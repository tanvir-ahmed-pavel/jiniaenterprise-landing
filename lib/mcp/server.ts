import { businessIdentity as b } from "@/lib/business/identity";
import { SITE_URL } from "@/lib/seo/canonical";
import { bookingProblem, createBookingRequest } from "@/lib/bookings/create";
import { getFleetRows, type FleetRow } from "@/lib/vehicles/store";

/**
 * Model Context Protocol server for Jinia Enterprise. Agents use it to find a
 * car, read its details and send a booking request. It serves the same fleet
 * data and runs the same booking checks and storage as the website form.
 */

const PROTOCOL_VERSION = "2025-06-18";
const SUPPORTED_VERSIONS = ["2025-06-18", "2025-03-26"];
const SERVER_VERSION = "1.0.0";

const RENTAL_TYPES = ["daily", "weekly", "monthly", "corporate"] as const;

/** Description text from the admin, with any HTML removed. */
const plain = (s: string | null | undefined) => (s ?? "").replace(/<[^>]*>/g, "").trim();
const vehicleUrl = (slug: string) => `${SITE_URL}/vehicles/${slug}`;
const contactLine = `Call ${b.phone} or WhatsApp ${b.whatsapp}.`;

function summary(r: FleetRow) {
  return {
    name: r.name,
    slug: r.slug,
    url: vehicleUrl(r.slug),
    seats: r.seats,
    day_rate_bdt: r.starting_price ?? null,
    rate_status: r.starting_price ? "published" : "quote_required",
    features: r.features ?? [],
    rental_types: r.rental_types ?? [],
  };
}

async function findVehicle(slug: string): Promise<FleetRow | undefined> {
  const rows = await getFleetRows();
  return rows.find((r) => r.slug === slug);
}

type ToolResult = {
  content: Array<{ type: "text"; text: string }>;
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
};

const ok = (data: Record<string, unknown>): ToolResult => ({
  content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
  structuredContent: data,
});

const fail = (message: string): ToolResult => ({
  content: [{ type: "text", text: message }],
  isError: true,
});

type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: Record<string, unknown>;
  run: (args: Record<string, unknown>) => Promise<ToolResult>;
};

const TOOLS: Tool[] = [
  {
    name: "search_vehicles",
    description:
      "List the active chauffeur-driven cars for hire in Dhaka. Filter by seats, rental type or a maximum day rate. Each car has its own page at the url field.",
    inputSchema: {
      type: "object",
      properties: {
        min_seats: { type: "integer", minimum: 1, description: "Only cars with at least this many seats." },
        rental_type: { type: "string", enum: [...RENTAL_TYPES], description: "Only cars offered for this hire type." },
        max_day_rate_bdt: { type: "number", minimum: 0, description: "Only cars with a published day rate at or below this (BDT)." },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    run: async (args) => {
      const minSeats = typeof args.min_seats === "number" ? args.min_seats : 0;
      const rental = typeof args.rental_type === "string" ? args.rental_type.toLowerCase() : "";
      const maxRate = typeof args.max_day_rate_bdt === "number" ? args.max_day_rate_bdt : 0;
      const rows = await getFleetRows();
      const list = rows
        .filter((r) => r.seats >= minSeats)
        .filter((r) => !rental || (r.rental_types ?? []).some((t) => t.toLowerCase() === rental))
        .filter((r) => !maxRate || (r.starting_price != null && r.starting_price <= maxRate))
        .map(summary);
      return ok({ count: list.length, vehicles: list });
    },
  },
  {
    name: "get_vehicle",
    description:
      "Get one car's full details by its slug: seats, features, day rate (or that a quote is required), model year, engine, transmission, fuel, colour, luggage, insurance and its page url.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", minLength: 1, description: "The car's slug, for example toyota-axio." },
      },
      required: ["slug"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    run: async (args) => {
      const slug = String(args.slug ?? "").trim();
      const r = await findVehicle(slug);
      if (!r) return fail(`No active car has the slug "${slug}". Use search_vehicles to list the slugs.`);
      return ok({
        ...summary(r),
        description: plain(r.description),
        specs: {
          model_year: r.model_year ?? null,
          engine_cc: r.engine_cc ?? null,
          transmission: r.transmission ?? null,
          fuel_type: r.fuel_type ?? null,
          colour: r.colour ?? null,
          luggage_bags: r.luggage_bags ?? null,
          insurance: r.insurance?.trim() || null,
          billed: r.price_label || "per day",
        },
      });
    },
  },
  {
    name: "create_booking_request",
    description:
      "Send a booking request to the Jinia Enterprise desk on behalf of a customer. The desk confirms the price and the car by phone or email. Only call this after the customer has given their name, phone, email and pickup date.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", minLength: 2, maxLength: 120, description: "Customer's full name." },
        phone: { type: "string", description: "Customer's phone number, for example +8801712345678." },
        email: { type: "string", format: "email", description: "Customer's email address." },
        pickup_date: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$", description: "Pickup date, YYYY-MM-DD (Dhaka time)." },
        return_date: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$", description: "Return date, YYYY-MM-DD. Leave out for a single day." },
        rental_type: { type: "string", enum: [...RENTAL_TYPES], description: "Hire type. Defaults to daily." },
        vehicle_slug: { type: "string", description: "Slug of the car wanted, from search_vehicles. Optional." },
        pickup_location: { type: "string", maxLength: 300, description: "Where the car should collect the customer." },
        destination: { type: "string", maxLength: 300, description: "Where the customer is going, for trips out of town." },
        message: { type: "string", maxLength: 2000, description: "Any other details for the desk." },
      },
      required: ["name", "phone", "email", "pickup_date"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    run: async (args) => {
      const str = (k: string) => (typeof args[k] === "string" ? (args[k] as string).trim() : undefined);
      const rentalType = str("rental_type") || "daily";
      if (!(RENTAL_TYPES as readonly string[]).includes(rentalType)) {
        return fail(`rental_type must be one of: ${RENTAL_TYPES.join(", ")}.`);
      }

      let vehicle: FleetRow | undefined;
      const slug = str("vehicle_slug");
      if (slug) {
        vehicle = await findVehicle(slug);
        if (!vehicle) return fail(`No active car has the slug "${slug}". Use search_vehicles to find a valid slug.`);
      }

      const input = {
        name: str("name") ?? "",
        phone: str("phone") ?? "",
        email: str("email") ?? "",
        pickup_date: str("pickup_date") ?? "",
        return_date: str("return_date") || null,
        rental_type: rentalType,
        vehicle_id: vehicle?.id ?? null,
        vehicle_name: vehicle?.name ?? null,
        pickup_location: str("pickup_location") || null,
        destination: str("destination") || null,
        message: [str("message"), "Sent by an AI agent through the website's MCP endpoint."].filter(Boolean).join("\n"),
        source: "mcp_agent",
      };

      const problem = bookingProblem(input);
      if (problem) return fail(problem);

      try {
        const { id } = await createBookingRequest(input);
        return ok({
          status: "received",
          reference: id,
          message: `Booking request received. The desk will confirm the car and price. ${contactLine}`,
          car: vehicle ? summary(vehicle) : null,
        });
      } catch {
        return fail(`The booking request could not be saved. Please try again later. ${contactLine}`);
      }
    },
  },
];

const INSTRUCTIONS =
  "Jinia Enterprise rents chauffeur-driven cars in Dhaka and across Bangladesh. Use search_vehicles to find a car, get_vehicle for its details and page url, and create_booking_request to send a booking request. Rates are per day with a driver, in BDT. A car without a published rate needs a quote from the desk. Payment: Visa, Mastercard, American Express, bKash or cash.";

type RpcRequest = {
  jsonrpc?: unknown;
  id?: string | number | null;
  method?: unknown;
  params?: Record<string, unknown>;
};

type RpcResponse = { jsonrpc: "2.0"; id: string | number | null; result?: unknown; error?: { code: number; message: string } };

const rpcError = (id: RpcRequest["id"], code: number, message: string): RpcResponse => ({
  jsonrpc: "2.0",
  id: id ?? null,
  error: { code, message },
});

/** Handles one JSON-RPC message. Returns null for notifications, which get no reply. */
export async function handleMcpMessage(message: unknown): Promise<RpcResponse | null> {
  const msg = (message ?? {}) as RpcRequest;
  if (typeof message !== "object" || message === null || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    return rpcError(null, -32600, "Invalid Request");
  }

  const isNotification = !("id" in msg) || msg.id === undefined;
  const id = msg.id ?? null;
  const params = msg.params ?? {};

  if (isNotification) return null;

  switch (msg.method) {
    case "initialize": {
      const requested = typeof params.protocolVersion === "string" ? params.protocolVersion : "";
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: SUPPORTED_VERSIONS.includes(requested) ? requested : PROTOCOL_VERSION,
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: "Jinia Enterprise", version: SERVER_VERSION, websiteUrl: SITE_URL },
          instructions: INSTRUCTIONS,
        },
      };
    }
    case "ping":
      return { jsonrpc: "2.0", id, result: {} };
    case "tools/list":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          tools: TOOLS.map(({ name, description, inputSchema, annotations }) => ({ name, description, inputSchema, annotations })),
        },
      };
    case "tools/call": {
      const name = typeof params.name === "string" ? params.name : "";
      const tool = TOOLS.find((t) => t.name === name);
      if (!tool) return rpcError(id, -32602, `Unknown tool: ${name}`);
      const args = (params.arguments ?? {}) as Record<string, unknown>;
      try {
        return { jsonrpc: "2.0", id, result: await tool.run(args) };
      } catch (error) {
        console.error(`MCP tool ${name} failed:`, error);
        return { jsonrpc: "2.0", id, result: fail("The tool hit an error. Please try again later.") };
      }
    }
    default:
      return rpcError(id, -32601, `Method not found: ${msg.method}`);
  }
}
