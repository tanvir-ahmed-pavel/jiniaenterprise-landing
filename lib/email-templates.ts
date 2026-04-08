export type EmailSourceType = 
  | "contact_page" 
  | "hero_widget" 
  | "vehicle_page" 
  | "booking_direct";

export interface EmailPayload {
  source: EmailSourceType;
  name: string;
  phone: string;
  email: string;
  rental_type?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  pickup_location?: string | null;
  destination?: string | null;
  vehicle_name?: string | null;
  message?: string | null;
}

// Custom text logo for emails
const EmailLogo = () => `
  <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #22c55e; padding-bottom: 20px;">
    <h1 style="margin: 0; font-family: 'Arial Black', Impact, sans-serif; font-size: 32px; letter-spacing: -1px; text-transform: uppercase;">
      <span style="color: #4ade80;">JINIA</span>
      <span style="color: #333333;">ENTERPRISE</span>
    </h1>
    <p style="margin: 5px 0 0 0; color: #166534; font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">
      Premium Car Rental
    </p>
  </div>
`;

// Footer signature
const EmailSignature = () => `
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-family: Arial, sans-serif;">
    <p style="margin: 0; color: #4b5563; font-size: 14px;">Looking forward to serving you,</p>
    <p style="margin: 8px 0 2px 0; color: #166534; font-size: 16px; font-weight: bold;">Jinia Enterprise Team</p>
    <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.6;">
      42 Sabera Tower, Room-04, Road-52<br/>
      Gulshan North Commercial Area<br/>
      Gulshan-2, Dhaka-1212, Bangladesh<br/>
      <a href="https://jiniaenterprise.com" style="color: #22c55e; text-decoration: none;">www.jiniaenterprise.com</a>
    </p>
  </div>
`;

function getSourceTitle(source: EmailSourceType) {
  switch (source) {
    case "hero_widget": return "Quick Form Inquiry";
    case "contact_page": return "Direct Contact Message";
    case "vehicle_page": return "Vehicle-Specific Quote";
    case "booking_direct": return "Formal Booking Request";
    default: return "New Inquiry";
  }
}

export function generateAdminEmailHtml(payload: EmailPayload): string {
  const sourceTitle = getSourceTitle(payload.source);
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #1f2937; background-color: #f9fafb; padding: 20px; border-radius: 8px;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; border-top: 5px solid #22c55e; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #111827; margin-top: 0;">${sourceTitle}</h2>
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 25px;">Origin: <strong>${payload.source}</strong></p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; width: 140px; color: #6b7280; font-weight: bold;">Name:</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${payload.name}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: bold;">Phone:</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${payload.phone}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: bold;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${payload.email}</td></tr>
          ${payload.vehicle_name ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: bold;">Target Vehicle:</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #166534;">${payload.vehicle_name}</td></tr>` : ''}
          ${payload.rental_type ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: bold;">Rental Class:</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${payload.rental_type}</td></tr>` : ''}
          ${payload.start_date ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: bold;">Start Date:</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${payload.start_date}</td></tr>` : ''}
          ${payload.end_date ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: bold;">End Date:</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${payload.end_date}</td></tr>` : ''}
          ${payload.pickup_location ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: bold;">Pickup Location:</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${payload.pickup_location}</td></tr>` : ''}
          ${payload.destination ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-weight: bold;">Destination:</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${payload.destination}</td></tr>` : ''}
        </table>

        ${payload.message ? `
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #9ca3af;">
          <p style="margin-top: 0; color: #4b5563; font-weight: bold; font-size: 14px;">Customer Message:</p>
          <p style="margin-bottom: 0; white-space: pre-wrap;">${payload.message}</p>
        </div>` : ''}
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/bookings" style="background-color: #166534; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Open Admin Dashboard</a>
        </div>
      </div>
    </div>
  `;
}

export function generateCustomerEmailHtml(payload: EmailPayload): string {
  let innerContent = "";

  if (payload.source === "contact_page") {
    innerContent = `
      <h2 style="color: #111827; text-align: center;">We've received your message!</h2>
      <p>Hi ${payload.name},</p>
      <p>Thank you for reaching out to Jinia Enterprise. A member of our support team will review your message immediately and get back to you at <strong>${payload.phone}</strong>.</p>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; margin: 20px 0; font-style: italic; color: #475569;">
        "${payload.message}"
      </div>
    `;
  } else if (payload.source === "vehicle_page" || payload.source === "booking_direct") {
    innerContent = `
      <h2 style="color: #111827; text-align: center;">Your Quotation Request is Processing</h2>
      <p>Hi ${payload.name},</p>
      <p>Excellent choice! We have received your booking request for the <strong>${payload.vehicle_name || "Premium Vehicle"}</strong>.</p>
      <p>Our dedicated logistics coordinator will review the availability for <strong>${payload.start_date || "your dates"}</strong> and call you at <strong>${payload.phone}</strong> shortly to confirm and finalize your itinerary.</p>
      
      <table style="width: 100%; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin: 25px 0;">
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0; background-color: #f1f5f9; width: 40%; font-weight: bold; color: #64748b;">Pickup Point</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 500;">${payload.pickup_location || "TBD"}</td>
        </tr>
        <tr>
          <td style="padding: 12px 15px; background-color: #f1f5f9; font-weight: bold; color: #64748b;">Drop-off / Dest.</td>
          <td style="padding: 12px 15px; color: #1e293b; font-weight: 500;">${payload.destination || "TBD"}</td>
        </tr>
      </table>
    `;
  } else {
    // hero_widget generic quick quote
    innerContent = `
      <h2 style="color: #111827; text-align: center;">Quote Request Received!</h2>
      <p>Hi ${payload.name},</p>
      <p>Thank you for submitting a quick quote request. We are reviewing your travel parameters for <strong>${payload.pickup_location || "Dhaka"}</strong> ${payload.start_date ? `on <strong>${payload.start_date}</strong>` : ''}.</p>
      <p>One of our agents will be calling you at <strong>${payload.phone}</strong> in a few minutes to walk through options and provide our absolute best rate.</p>
    `;
  }

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #374151; background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
      ${EmailLogo()}
      
      <div style="font-size: 16px; line-height: 1.6;">
        ${innerContent}
      </div>

      ${EmailSignature()}
    </div>
  `;
}
