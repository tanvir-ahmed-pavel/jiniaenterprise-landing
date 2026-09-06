"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, MapPin, CarFront, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Select } from "@/components/ui/select";

export function BookingRail() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "home_booking_rail",
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          rental_type: form.get("rentalType"),
          start_date: form.get("date"),
          pickup_location: form.get("pickup"),
          vehicle_name: form.get("vehicle") || undefined,
          message: "Customer requested a quote from the homepage booking rail.",
        }),
      });

      if (response.ok) setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border-y border-emerald-950/15 bg-white py-7 text-center">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-950"><CheckCircle2 className="h-5 w-5 text-emerald-700" /> Request received. Our desk will contact you shortly.</p>
      </div>
    );
  }

  return (
    <section id="booking" className="border-y border-emerald-950/10 bg-[#f6faf7]">
      <div className="container py-10 sm:py-12">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-950/10 bg-white p-5 sm:p-9 lg:p-10">
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-400 to-transparent" />
          <div className="grid gap-4 border-b border-emerald-950/12 pb-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="flex items-center gap-3 type-label text-emerald-700">
                <span aria-hidden className="h-px w-6 shrink-0 bg-amber-400" />
                Book a car
              </p>
              <h2 className="type-display mt-4 font-heading text-[2rem] text-emerald-950 sm:text-[2.5rem]">Request your ride.</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-emerald-950/65 lg:justify-self-end lg:text-right">Share the essentials below. Our booking desk will return a clear, tailored quote.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <fieldset className="min-w-0">
                <legend className="type-label mb-4 flex w-full items-center gap-2 border-b border-emerald-950/10 pb-3 text-emerald-700"><span className="tabular-nums text-amber-600">01</span> Your details</legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="block">
                    <span className="type-label mb-2 block text-emerald-950/70">Name</span>
                    <input name="name" required placeholder="Your name" className="h-12 w-full rounded-md border border-emerald-950/15 bg-white px-3 text-sm font-normal text-emerald-950 outline-none transition-colors placeholder:text-emerald-950/35 focus:border-amber-400" />
                  </label>
                  <label className="block">
                    <span className="type-label mb-2 block text-emerald-950/70">Phone</span>
                    <input name="phone" type="tel" required placeholder="+880 1..." className="h-12 w-full rounded-md border border-emerald-950/15 bg-white px-3 text-sm font-normal text-emerald-950 outline-none transition-colors placeholder:text-emerald-950/35 focus:border-amber-400" />
                  </label>
                  <label className="block">
                    <span className="type-label mb-2 block text-emerald-950/70">Email</span>
                    <input name="email" type="email" required placeholder="you@email.com" className="h-12 w-full rounded-md border border-emerald-950/15 bg-white px-3 text-sm font-normal text-emerald-950 outline-none transition-colors placeholder:text-emerald-950/35 focus:border-amber-400" />
                  </label>
                </div>
              </fieldset>

              <fieldset className="min-w-0">
                <legend className="type-label mb-4 flex w-full items-center gap-2 border-b border-emerald-950/10 pb-3 text-emerald-700"><span className="tabular-nums text-amber-600">02</span> Trip details</legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="block">
                    <span className="type-label mb-2 flex items-center gap-1.5 text-emerald-950/70"><CalendarDays className="h-3.5 w-3.5 text-emerald-700" /> Date</span>
                    <input name="date" type="date" required min={new Date().toISOString().split("T")[0]} className="h-12 w-full rounded-md border border-emerald-950/15 bg-white px-3 text-sm font-normal text-emerald-950 outline-none transition-colors focus:border-amber-400" />
                  </label>
                  <label className="block">
                    <span className="type-label mb-2 flex items-center gap-1.5 text-emerald-950/70"><MapPin className="h-3.5 w-3.5 text-emerald-700" /> Pickup</span>
                    <input name="pickup" required placeholder="Gulshan, Airport..." className="h-12 w-full rounded-md border border-emerald-950/15 bg-white px-3 text-sm font-normal text-emerald-950 outline-none transition-colors placeholder:text-emerald-950/35 focus:border-amber-400" />
                  </label>
                  <label className="block">
                    <span className="type-label mb-2 flex items-center gap-1.5 text-emerald-950/70"><CarFront className="h-3.5 w-3.5 text-emerald-700" /> Vehicle</span>
                    <Select
                      name="vehicle"
                      defaultValue=""
                      placeholder="Choose a vehicle"
                      aria-label="Vehicle"
                      options={[
                        { value: "Toyota Premio", label: "Toyota Premio" },
                        { value: "Toyota Harrier", label: "Toyota Harrier" },
                        { value: "Toyota Alphard", label: "Toyota Alphard" },
                        { value: "Land Cruiser Prado", label: "Land Cruiser Prado" },
                        { value: "BMW or Mercedes sedan", label: "BMW or Mercedes sedan" },
                        { value: "Nissan Civilian bus", label: "Nissan Civilian bus" },
                        { value: "Nissan X-Trail", label: "Nissan X-Trail" },
                      ]}
                    />
                  </label>
                </div>
              </fieldset>
            </div>

            <input type="hidden" name="rentalType" value="daily" />
            <div className="flex flex-col gap-4 border-t border-emerald-950/12 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <ul className="type-label flex flex-wrap items-center gap-x-5 gap-y-2 text-emerald-950/55">
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-amber-400" /> No deposit
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-amber-400" /> Reply inside the hour
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-amber-400" /> A real person, not a bot
                </li>
              </ul>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-emerald-950/15 px-6 text-sm font-medium text-emerald-950 transition-colors hover:border-amber-400"
                >
                  <Phone className="h-4 w-4 text-emerald-700" /> Call the desk
                </a>
                <button type="submit" disabled={isSubmitting} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-950 px-7 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:opacity-60">
                  {isSubmitting ? "Sending" : "Request quote"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
