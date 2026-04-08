import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    // Save to Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase.from('inquiries').insert([{
      name,
      phone,
      email,
      rental_type: rental_type || null,
      start_date: start_date || null,
      end_date: end_date || null,
      message,
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

        // Notify Admin
        await resend.emails.send({
          from: "noreply@jiniaenterprise.com",
          to: [adminEmail],
          subject: `New Quotation/Inquiry Request: ${name}`,
          html: `
            <h1>New Inquiry Request</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Rental Type:</strong> ${rental_type || "N/A"}</p>
            ${start_date ? `<p><strong>Start Date:</strong> ${start_date}</p>` : ''}
            ${end_date ? `<p><strong>End Date:</strong> ${end_date}</p>` : ''}
            <p><strong>Message:</strong></p>
            <blockquote style="border-left: 4px solid #ccc; padding-left: 8px;">${message}</blockquote>
          `,
        });

        // Notify Customer
        await resend.emails.send({
          from: "noreply@jiniaenterprise.com",
          to: [email],
          subject: `Quotation Request Received - Jinia Enterprise`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h2 style="color: #166534;">Thank you for your inquiry, ${name}!</h2>
              <p>We have successfully received your quotation request.</p>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p style="margin-top: 0;"><strong>Your Message:</strong></p>
                <p style="font-style: italic; margin-bottom: 0;">"${message}"</p>
              </div>
              <p>Our team will review your requirements and get back to you with a detailed quote as soon as possible.</p>
              <br />
              <p>Best Regards,</p>
              <p><strong>Jinia Enterprise Team</strong><br/>
              Premium Car Rental Services</p>
            </div>
          `,
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
