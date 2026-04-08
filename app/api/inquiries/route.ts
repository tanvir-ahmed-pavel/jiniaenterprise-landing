import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateAdminEmailHtml, generateCustomerEmailHtml, EmailSourceType } from "@/lib/email-templates";

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
      vehicle_name,
      pickup_location,
      destination,
      source = "contact_page",
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

    // Save to Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase.from('inquiries').insert([{
      name,
      phone,
      email,
      rental_type: rental_type || null,
      start_date: start_date || null,
      message: `${message}${end_date ? `\n(End Date: ${end_date})` : ""}${pickup_location ? `\n(Pickup: ${pickup_location})` : ""}${destination ? `\n(Dest: ${destination})` : ""}`,
      vehicle_id: vehicle_id || null,
    }] as never);

    if (dbError) {
      console.error("Supabase inquiries insert error:", dbError);
    }

    // Send email notifications
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);
        const adminEmail = process.env.ADMIN_EMAIL || "admin@jiniaenterprise.com";
        const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@jiniaenterprise.com";

        const emailPayload = {
          source: source as EmailSourceType,
          name,
          phone,
          email,
          rental_type,
          start_date,
          end_date,
          pickup_location,
          destination,
          vehicle_name,
          message,
        };

        // Notify Admin
        await resend.emails.send({
          from: fromEmail,
          to: [adminEmail],
          subject: `New ${source === 'hero_widget' ? 'Quick Quote' : 'Inquiry'} Request: ${name}`,
          html: generateAdminEmailHtml(emailPayload),
        });

        // Notify Customer
        await resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: `Quotation Request Received - Jinia Enterprise`,
          html: generateCustomerEmailHtml(emailPayload),
        });
      } catch (emailError) {
        console.error("Failed to send inquiry email:", emailError);
      }
    }

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
