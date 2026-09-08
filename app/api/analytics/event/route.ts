import { NextRequest, NextResponse } from "next/server";

type AnalyticsEventBody = {
  name?: unknown;
  properties?: unknown;
};

/**
 * Lightweight analytics intake — logs server-side only.
 * Never echoes secrets or env values.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyticsEventBody;
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!name || name.length > 120) {
      return NextResponse.json({ error: "Invalid event name" }, { status: 400 });
    }

    const properties =
      body.properties &&
      typeof body.properties === "object" &&
      !Array.isArray(body.properties)
        ? (body.properties as Record<string, unknown>)
        : {};

    // Strip anything that looks like a secret before logging
    const safeProperties = Object.fromEntries(
      Object.entries(properties).filter(
        ([key]) => !/(secret|password|token|key|authorization)/i.test(key),
      ),
    );

    console.info("[analytics]", {
      name,
      properties: safeProperties,
      at: new Date().toISOString(),
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
