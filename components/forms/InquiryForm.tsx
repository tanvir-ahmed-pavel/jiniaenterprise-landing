"use client";

import { useState } from "react";
import { DateField } from "@/components/forms/DateField";
import { PHONE_ERROR, PHONE_HINT, isValidPhone, normalizePhone } from "@/lib/forms/phone";
import { todayInDhaka } from "@/lib/forms/date";
import { buildWhatsAppRequestHref } from "@/lib/forms/whatsapp";
import { RESPONSE_PROMISE } from "@/lib/business/identity";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/ui/select";

const inquirySchema = z.object({
  name: z.string().min(2, "Please tell us your name."),
  phone: z.string().refine(isValidPhone, PHONE_ERROR),
  email: z.string().email("Please enter a valid email address."),
  rental_type: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  pickup_location: z.string().optional(),
  destination: z.string().optional(),
  message: z.string().min(10, "A sentence or two about the trip helps us quote it."),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface InquiryFormProps {
  vehicleName?: string;
  vehicleId?: string;
  source?: "contact_page" | "hero_widget" | "vehicle_page" | "booking_direct";
}

/** One field treatment, shared with the home booking rail: hairline border,
 *  normal weight, gold on focus, and no ring halo. */
const field =
  "h-12 w-full rounded-md border border-emerald-950/15 bg-white px-3 text-sm font-normal text-emerald-950 outline-none transition-colors placeholder:text-emerald-950/35 focus:border-amber-400";
const labelCls = "type-label mb-2 block text-emerald-950/70";
const errorCls = "mt-1.5 text-xs font-normal text-red-600";

export function InquiryForm({ vehicleName, vehicleId, source }: InquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [whatsAppHref, setWhatsAppHref] = useState(() => buildWhatsAppRequestHref({ vehicle: vehicleName }));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      message: vehicleName ? `I am interested in renting the ${vehicleName}.` : "",
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    const phone = normalizePhone(data.phone) ?? data.phone;
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          phone,
          vehicle_id: vehicleId || null,
          vehicle_name: vehicleName || null,
          source: source || (vehicleId ? "vehicle_page" : "contact_page"),
        }),
      });

      if (!response.ok) throw new Error(`Inquiry failed: ${response.status}`);
      setWhatsAppHref(
        buildWhatsAppRequestHref({
          name: data.name,
          phone,
          rentalType: data.rental_type,
          vehicle: vehicleName,
          date: data.start_date,
          endDate: data.end_date,
          pickup: data.pickup_location,
          destination: data.destination,
          message: data.message,
        }),
      );
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitError("That did not send. Please try again, or send the request on WhatsApp below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 py-8 text-center">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-950">
          <CheckCircle2 className="h-5 w-5 text-emerald-700" /> Request received.
        </p>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-emerald-950/60">
          {RESPONSE_PROMISE.sentence} Prefer WhatsApp? Send the same request there in one tap.
        </p>
        <div className="flex flex-col items-center gap-4 pt-2">
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="inquiry_whatsapp_handoff"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-950 px-7 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            <MessageSquare aria-hidden className="h-4 w-4" /> Send this request on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="inline-flex h-11 items-center justify-center rounded-full border border-emerald-950/15 px-6 text-sm font-medium text-emerald-950 transition-colors hover:border-amber-400"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {submitError && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-normal text-red-700">
          {submitError}{" "}
          <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Open WhatsApp</a>
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Name</span>
          <input placeholder="Your name" {...register("name")} className={cn(field, errors.name && "border-red-500")} />
          {errors.name && <p className={errorCls}>{errors.name.message}</p>}
        </label>
        <label className="block">
          <span className={labelCls}>Phone</span>
          <input type="tel" inputMode="tel" autoComplete="tel" placeholder={PHONE_HINT} aria-invalid={!!errors.phone} {...register("phone")} className={cn(field, errors.phone && "border-red-500")} />
          {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>Email</span>
        <input type="email" placeholder="you@email.com" {...register("email")} className={cn(field, errors.email && "border-red-500")} />
        {errors.email && <p className={errorCls}>{errors.email.message}</p>}
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className={labelCls}>Rental type</span>
          <Controller
            name="rental_type"
            control={control}
            render={({ field: rentalTypeField }) => (
              <Select
                options={[
                  { value: "", label: "Choose a type" },
                  { value: "Daily", label: "Daily" },
                  { value: "Monthly", label: "Monthly" },
                  { value: "Corporate", label: "Corporate" },
                ]}
                value={rentalTypeField.value || ""}
                onValueChange={rentalTypeField.onChange}
                aria-label="Rental type"
              />
            )}
          />
        </label>
        <label className="block">
          <span className={labelCls}>From</span>
          <DateField min={todayInDhaka()} {...register("start_date")} className={field} />
        </label>
        <label className="block">
          <span className={labelCls}>Until</span>
          <DateField min={todayInDhaka()} {...register("end_date")} className={field} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Pickup</span>
          <input placeholder="Gulshan, Airport..." {...register("pickup_location")} className={field} />
        </label>
        <label className="block">
          <span className={labelCls}>Destination</span>
          <input placeholder="Where are you heading?" {...register("destination")} className={field} />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>About the trip</span>
        <textarea
          rows={4}
          placeholder="Passengers, hours, anything the driver should know."
          {...register("message")}
          className={cn(field, "h-auto min-h-[120px] resize-y py-3 leading-relaxed", errors.message && "border-red-500")}
        />
        {errors.message && <p className={errorCls}>{errors.message.message}</p>}
      </label>

      <div className="flex flex-col gap-4 border-t border-emerald-950/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-label text-emerald-950/50">No deposit. {RESPONSE_PROMISE.sentence}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-950 px-7 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </>
          ) : (
            <>
              Send request <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
