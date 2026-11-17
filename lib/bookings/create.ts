import { createClient } from "@/lib/supabase/server";
import { generateAdminEmailHtml, generateCustomerEmailHtml, EmailSourceType } from "@/lib/email-templates";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { posthogLogger } from "@/instrumentation";

/** One booking request, from the website form or from an agent over MCP. */
export type BookingRequest = {
  name: string;
  phone: string;
  email: string;
  pickup_date: string;
  return_date?: string | null;
  rental_type?: string | null;
  vehicle_id?: string | null;
  vehicle_name?: string | null;
  pickup_location?: string | null;
  destination?: string | null;
  message?: string | null;
  source?: string;
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Today's date in Dhaka, as YYYY-MM-DD. */
function todayInDhaka(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** The first problem with a request, or null when it can be stored. Shared by the form and MCP. */
export function bookingProblem(b: Partial<BookingRequest>): string | null {
  if (!b.name || !b.phone || !b.email || !b.pickup_date) return "Missing required fields";
  if (b.name.trim().length < 2 || b.name.length > 120) return "Name must be between 2 and 120 characters";
  if (!EMAIL.test(b.email) || b.email.length > 254) return "Enter a valid email address";
  if (!/^\+?\d{7,15}$/.test(b.phone.replace(/[\s\-()]/g, ""))) return "Enter a valid phone number";
  if (!DATE.test(b.pickup_date)) return "Pickup date must be in YYYY-MM-DD format";
  if (b.pickup_date < todayInDhaka()) return "Pickup date cannot be in the past";
  if (b.return_date && (!DATE.test(b.return_date) || b.return_date < b.pickup_date)) {
    return "Return date must be in YYYY-MM-DD format and on or after the pickup date";
  }
  return null;
}

/** Stores a booking request and sends the notification emails when Resend is configured. */
export async function createBookingRequest(input: BookingRequest): Promise<{ id: string }> {
  const source = input.source ?? "booking_direct";
  const supabase = await createClient();
  // Use 'as never' or explicit type if inference fails
  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        name: input.name,
        phone: input.phone,
        email: input.email,
        vehicle_id: input.vehicle_id || null,
        vehicle_name: input.vehicle_name || null,
        rental_type: input.rental_type || "daily",
        pickup_date: input.pickup_date,
        return_date: input.return_date || null,
        pickup_location: input.pickup_location || null,
        message: `${input.message || "Booking request"}${input.destination ? `\n(Dest: ${input.destination})` : ""}`,
        status: "new",
      },
    ] as never)
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  posthogLogger?.emit({
    body: "booking request persisted",
    severityNumber: SeverityNumber.INFO,
    attributes: { route: "/api/bookings" },
  });

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);
      const adminEmail = process.env.ADMIN_EMAIL || "admin@jiniaenterprise.com";
      const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@jiniaenterprise.com";

      const emailPayload = {
        source: source as EmailSourceType,
        name: input.name,
        phone: input.phone,
        email: input.email,
        rental_type: input.rental_type,
        start_date: input.pickup_date,
        end_date: input.return_date,
        pickup_location: input.pickup_location,
        destination: input.destination,
        vehicle_name: input.vehicle_name,
        message: input.message,
      };

      await resend.emails.send({
        from: fromEmail,
        to: [adminEmail],
        subject: `New Booking Request: ${input.name}`,
        html: generateAdminEmailHtml(emailPayload),
      });

      // Send confirmation email to the customer
      await resend.emails.send({
        from: fromEmail,
        to: [input.email],
        subject: `Booking Request Received - Jinia Enterprise`,
        html: generateCustomerEmailHtml(emailPayload),
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Don't fail the request if email fails
    }
  }

  return { id: (data as unknown as { id: string }).id };
}
