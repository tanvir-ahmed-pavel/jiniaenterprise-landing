"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { siteConfig } from "@/lib/config";
import { ArrowRight, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";

const inquirySchema = z.object({
  name: z.string().min(2, "Please tell us your name."),
  phone: z.string().min(10, "Please enter a phone number we can reach."),
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

/** Muted red, used only for validation errors. */
const errorText = "text-[oklch(0.5_0.15_30)]";
/** `wz-input` is unlayered CSS, so the error ring needs `!` to win. */
const invalidRing = "aria-[invalid=true]:shadow-[inset_0_0_0_1.5px_oklch(0.5_0.15_30)]!";

function Field({
  label,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("grid min-w-0 gap-1.5", className)}>
      <span className="text-xs font-semibold text-ink/60">
        {label}
        {hint && <span className="font-normal text-ink/40"> · {hint}</span>}
      </span>
      {children}
      {error && <span className={cn("text-xs", errorText)}>{error}</span>}
    </label>
  );
}

export function InquiryForm({ vehicleName, vehicleId, source }: InquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
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
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          vehicle_id: vehicleId || null,
          vehicle_name: vehicleName || null,
          source: source || (vehicleId ? "vehicle_page" : "contact_page"),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div role="status" className="rounded-[1.4rem] bg-tile-sage p-6 sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="type-heading mt-5 font-heading text-2xl">
          Request <span className="type-accent text-gold-deep">received.</span>
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/65">
          The desk will come back to you shortly with a quote for the trip you described.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`}
            className="group inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-ink/15 transition-colors hover:bg-white"
          >
            <WhatsAppIcon className="h-[1.05rem] w-[1.05rem] text-[#128C4B]" />
            Or WhatsApp the desk
            <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            {...register("name")}
            className={cn("wz-input", invalidRing)}
          />
        </Field>
        <Field label="Phone or WhatsApp" error={errors.phone?.message}>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+880 1…"
            aria-invalid={errors.phone ? true : undefined}
            {...register("phone")}
            className={cn("wz-input", invalidRing)}
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          aria-invalid={errors.email ? true : undefined}
          {...register("email")}
          className={cn("wz-input", invalidRing)}
        />
      </Field>

      <Field label="Kind of hire" hint="optional">
        <select {...register("rental_type")} className="wz-input">
          <option value="">Choose a type</option>
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
          <option value="Corporate">Corporate</option>
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="From" hint="optional">
          <input type="date" {...register("start_date")} className="wz-input" />
        </Field>
        <Field label="Until" hint="optional">
          <input type="date" {...register("end_date")} className="wz-input" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Pickup" hint="optional">
          <input placeholder="Gulshan, Airport…" {...register("pickup_location")} className="wz-input" />
        </Field>
        <Field label="Destination" hint="optional">
          <input placeholder="Where are you heading?" {...register("destination")} className="wz-input" />
        </Field>
      </div>

      <Field label="About the trip" error={errors.message?.message}>
        <textarea
          rows={4}
          placeholder="Passengers, hours, anything the driver should know."
          aria-invalid={errors.message ? true : undefined}
          {...register("message")}
          className={cn("wz-input min-h-32! resize-y py-3! leading-relaxed", invalidRing)}
        />
      </Field>

      <div className="flex flex-col-reverse gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink/55">No deposit. A reply inside the hour.</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-14 w-full shrink-0 items-center justify-between gap-3 rounded-full bg-ink pl-6 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Sending" : "Send request"}
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          </span>
        </button>
      </div>
    </form>
  );
}
