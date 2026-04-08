import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    const bookingData = {
      name,
      phone,
      email,
      vehicle_id: vehicle_id || null, // Ensure ID is valid UUID if provided, handled by client
      vehicle_name: vehicle_name || null,
      rental_type: rental_type || "daily",
      pickup_date,
      return_date: return_date || null,
      pickup_location: pickup_location || null,
      message: message || null,
      status: "new",
    };

    const supabase = await createClient();
    // Use 'as never' or explicit type if inference fails
    const { data, error } = await supabase
      .from("bookings")
      .insert([bookingData] as never)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    // Send Email Notification (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);
        const adminEmail = process.env.ADMIN_EMAIL || "admin@jiniaenterprise.com";

        await resend.emails.send({
          from: "noreply@jiniaenterprise.com",
          to: [adminEmail],
          subject: `New Booking Request: ${name}`,
          html: `
            <h1>New Booking Request</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Vehicle:</strong> ${vehicle_name || "Not selected"}</p>
            <p><strong>Date:</strong> ${pickup_date}</p>
            <p><strong>Type:</strong> ${rental_type}</p>
            <br />
            <a href="${
              process.env.NEXT_PUBLIC_SITE_URL
            }/admin/bookings">View in Dashboard</a>
          `,
        });

        // Send confirmation email to the customer
        await resend.emails.send({
          from: "noreply@jiniaenterprise.com",
          to: [email],
          subject: `Booking Request Received - Jinia Enterprise`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h2 style="color: #166534;">Thank you for your booking request, ${name}!</h2>
              <p>We have successfully received your request for a <strong>${rental_type}</strong> rental${vehicle_name ? ` of <strong>${vehicle_name}</strong>` : ""}.</p>
              <p>Our team will review your request for the pickup date on <strong>${pickup_date}</strong> and contact you shortly at ${phone} to confirm the details and final quote.</p>
              <br />
              <p>Best Regards,</p>
              <p><strong>Jinia Enterprise Team</strong><br/>
              Premium Car Rental Services</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Booking request received. Our team will contact you shortly.",
      id: (data as unknown as { id: string }).id,
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
