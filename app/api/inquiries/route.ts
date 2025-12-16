import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      rental_type,
      start_date,
      end_date,
      message,
      vehicle_id,
    } = body;

    // Validate required fields
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, this would save to Supabase
    // For now, we'll just log and return success
    console.log("New Inquiry Received:", {
      name,
      phone,
      email,
      rental_type,
      start_date,
      end_date,
      message,
      vehicle_id,
      created_at: new Date().toISOString(),
    });

    // TODO: Implement Supabase integration
    // const supabase = await createClient();
    // const { error } = await supabase.from('inquiries').insert({
    //   name,
    //   phone,
    //   email,
    //   rental_type,
    //   start_date,
    //   end_date,
    //   message,
    //   vehicle_id,
    // });

    // TODO: Send email notification
    // await sendEmailNotification({ name, phone, email, message });

    return NextResponse.json(
      { success: true, message: "Inquiry submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
