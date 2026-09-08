export const ANALYTICS_EVENTS = {
  booking_started: "booking_started",
  booking_completed: "booking_completed",
  quote_requested: "quote_requested",
  phone_clicked: "phone_clicked",
  whatsapp_clicked: "whatsapp_clicked",
  email_clicked: "email_clicked",
  map_clicked: "map_clicked",
  vehicle_viewed: "vehicle_viewed",
  location_viewed: "location_viewed",
  price_viewed: "price_viewed",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
