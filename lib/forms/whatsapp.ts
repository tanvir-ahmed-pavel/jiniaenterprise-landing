import { getWhatsAppHref } from "@/lib/business/identity";
import { formatDisplayDate } from "@/lib/forms/date";

type RequestDetails = {
  name?: string | null;
  phone?: string | null;
  rentalType?: string | null;
  vehicle?: string | null;
  date?: string | null;
  endDate?: string | null;
  pickup?: string | null;
  destination?: string | null;
  flight?: string | null;
  message?: string | null;
};

/** The submitted form as a WhatsApp message, so the customer can also send it there. */
export function buildWhatsAppRequestHref(details: RequestDetails): string {
  const lines = [
    "Hello Jinia, I just sent this request on your website:",
    details.name && `Name: ${details.name}`,
    details.phone && `Phone: ${details.phone}`,
    details.rentalType && `Trip: ${details.rentalType}`,
    details.vehicle && `Vehicle: ${details.vehicle}`,
    details.date && `Date: ${formatDisplayDate(details.date)}${details.endDate ? ` to ${formatDisplayDate(details.endDate)}` : ""}`,
    details.pickup && `Pickup: ${details.pickup}`,
    details.destination && `Destination: ${details.destination}`,
    details.flight && `Flight: ${details.flight}`,
    details.message && `Note: ${details.message}`,
  ].filter(Boolean);
  return getWhatsAppHref(lines.join("\n"));
}
