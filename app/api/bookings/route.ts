import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      vehicle_id,
      vehicle_name,
      rental_type,
      pickup_date,
      return_date,
      pickup_location,
      message,
    } = body;

    // Validate required fields
    if (!name || !phone || !email || !pickup_date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log the booking for now
    // In production, this would save to Supabase
    console.log("New booking received:", {
      name,
      phone,
      email,
      vehicle_id,
      vehicle_name,
      rental_type: rental_type || "daily",
      pickup_date,
      return_date,
      pickup_location,
      message,
      status: "new",
      created_at: new Date().toISOString(),
    });

    // TODO: Uncomment when Supabase `bookings` table is created
    /*
    const supabase = await createClient();
    const { data, error } = await supabase.from("bookings").insert([
      {
        name,
        phone,
        email,
        vehicle_id: vehicle_id || null,
        vehicle_name: vehicle_name || null,
        rental_type: rental_type || "daily",
        pickup_date,
        return_date: return_date || null,
        pickup_location: pickup_location || null,
        message: message || null,
        status: "new",
      },
    ]).select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    */

    return NextResponse.json({
      success: true,
      message: "Booking request received. Our team will contact you shortly.",
      id: `booking-${Date.now()}`,
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
  // Sample bookings for demo
  const sampleBookings = [
    {
      id: "1",
      name: "Ahmed Rahman",
      phone: "+880171234567",
      email: "ahmed@example.com",
      vehicle_name: "Toyota Corolla",
      rental_type: "daily",
      pickup_date: "2026-01-05",
      pickup_location: "Gulshan",
      status: "new",
      created_at: "2026-01-03T10:00:00Z",
    },
    {
      id: "2",
      name: "Sarah Khan",
      phone: "+880181234567",
      email: "sarah@example.com",
      vehicle_name: "Toyota Alphard",
      rental_type: "corporate",
      pickup_date: "2026-01-10",
      pickup_location: "Banani",
      status: "contacted",
      created_at: "2026-01-02T14:30:00Z",
    },
  ];

  return NextResponse.json({ bookings: sampleBookings });
}
