import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { bookingProblem, createBookingRequest } from "@/lib/bookings/create";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Same rules for the website form and the MCP tool.
    const problem = bookingProblem(body);
    if (problem) {
      return NextResponse.json({ error: problem }, { status: 400 });
    }

    const { id } = await createBookingRequest({
      ...body,
      source: body.source ?? "booking_direct",
    });

    return NextResponse.json({
      success: true,
      message: "Booking request received. Our team will contact you shortly.",
      id,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return empty or fetch from Supabase if needed (though admin page uses direct fetch)
  // Maintaining this endpoint for compatibility or simpler testing
  const supabase = await createClient();
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ bookings: [] });
  }

  return NextResponse.json({ bookings });
}
