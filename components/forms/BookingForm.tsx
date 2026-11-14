"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Vehicle } from "@/lib/supabase/admin-service";
import { ArrowRight, Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { orderVehicleImages } from "@/lib/vehicles/images";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  vehicle_id: z.string().optional(),
  rental_type: z.string().min(1, "Please select a rental type"),
  pickup_date: z.string().min(1, "Please select a pickup date"),
  return_date: z.string().optional(),
  pickup_location: z.string().optional(),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  preselectedVehicle?: string;
  vehicles?: Vehicle[];
}

/** Muted red, used only for validation and send errors. */
const errorText = "text-[oklch(0.5_0.15_30)]";
/** `wz-input` is unlayered CSS, so the error ring needs `!` to win. */
const invalidRing = "aria-[invalid=true]:shadow-[inset_0_0_0_1.5px_oklch(0.5_0.15_30)]!";

/** Label above, control, quiet error line below: the wizard's Field. */
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

/** A short titled group: numbered dot, heading, a line of context. */
function Group({
  index,
  title,
  note,
  children,
}: {
  index: number;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="min-w-0 border-t border-ink/10 pt-8 first-of-type:border-t-0 first-of-type:pt-0">
      <legend className="float-left mb-6 flex w-full items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper-deep text-xs font-semibold tabular-nums text-ink">
          {index}
        </span>
        <span className="min-w-0">
          <span className="type-heading block font-heading text-xl text-ink">{title}</span>
          {note && <span className="mt-1 block text-sm text-ink/55">{note}</span>}
        </span>
      </legend>
      <div className="clear-both grid gap-4">{children}</div>
    </fieldset>
  );
}

function VehicleTypeahead({
  vehicles,
  value,
  onChange,
  hasError,
}: {
  vehicles: Vehicle[];
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
}) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedVehicle = vehicles.find((vehicle) => vehicle.id === value);

  useEffect(() => {
    if (!isOpen) {
      // Keep the combobox label synchronized with react-hook-form resets.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(selectedVehicle?.name || "");
    }
  }, [isOpen, selectedVehicle?.name]);

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const search = query.trim().toLowerCase();
    return !search || `${vehicle.name} ${vehicle.category}`.toLowerCase().includes(search);
  });

  const selectVehicle = (vehicle?: Vehicle) => {
    onChange(vehicle?.id || "");
    setQuery(vehicle?.name || "");
    setIsOpen(false);
  };

  const openVehiclePicker = () => {
    // The selected label is a display value, not a filter. Clear it when the
    // picker is reopened so the next search can see the complete fleet.
    if (selectedVehicle && query === selectedVehicle.name) setQuery("");
    setActiveIndex(0);
    setIsOpen(true);
  };

  const selectedImage = selectedVehicle
    ? orderVehicleImages(selectedVehicle.images, selectedVehicle.image_url)[0]
    : undefined;

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            onChange("");
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onFocus={openVehiclePicker}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              openVehiclePicker();
              setActiveIndex((index) => Math.min(index + 1, filteredVehicles.length - 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((index) => Math.max(index - 1, 0));
            } else if (event.key === "Enter" && isOpen) {
              event.preventDefault();
              selectVehicle(filteredVehicles[activeIndex]);
            } else if (event.key === "Escape") {
              setIsOpen(false);
            }
          }}
          placeholder="Any available vehicle"
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-label="Choose a vehicle"
          aria-invalid={hasError || undefined}
          className={cn("wz-input pl-11! pr-12!", invalidRing)}
        />
        <button
          type="button"
          onClick={() => (isOpen ? setIsOpen(false) : openVehiclePicker())}
          aria-label={isOpen ? "Close vehicle suggestions" : "Open vehicle suggestions"}
          className="absolute right-0.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ink/50 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-gold"
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
      </div>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl bg-white p-1.5 shadow-[0_18px_40px_-24px_oklch(0.21_0.035_162/0.45)] ring-1 ring-ink/10"
        >
          <button
            type="button"
            role="option"
            aria-selected={!value}
            onClick={() => selectVehicle()}
            className="flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-semibold text-ink transition-colors hover:bg-paper-deep"
          >
            Any available vehicle
            {!value && <Check className="h-4 w-4 text-gold-deep" aria-hidden="true" />}
          </button>
          {filteredVehicles.map((vehicle, index) => {
            const image = orderVehicleImages(vehicle.images, vehicle.image_url)[0];
            return (
              <button
                type="button"
                role="option"
                aria-selected={vehicle.id === value}
                key={vehicle.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectVehicle(vehicle)}
                className={cn(
                  "flex min-h-14 w-full items-center justify-between gap-3 rounded-xl px-3 py-1.5 text-left transition-colors",
                  index === activeIndex ? "bg-paper-deep" : "hover:bg-paper-deep",
                )}
              >
                <span className="flex min-w-0 items-center gap-3">
                  {image && <Image src={image} alt="" width={64} height={46} className="h-11 w-16 shrink-0 object-contain" />}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">{vehicle.name}</span>
                    <span className="block text-xs text-ink/50">{vehicle.category} · {vehicle.seats} seats</span>
                  </span>
                </span>
                {vehicle.id === value && <Check className="h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />}
              </button>
            );
          })}
          {filteredVehicles.length === 0 && <p className="px-3 py-4 text-sm text-ink/55">No matching vehicles.</p>}
        </div>
      )}

      {selectedVehicle && (
        <div className="mt-3 flex items-center gap-4 rounded-2xl bg-tile-sand p-3 pr-2">
          {selectedImage && (
            <Image src={selectedImage} alt={selectedVehicle.name} width={112} height={76} className="h-16 w-24 shrink-0 object-contain sm:h-[4.75rem] sm:w-28" />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">Your car</p>
            <p className="mt-0.5 truncate text-sm font-semibold text-ink">{selectedVehicle.name}</p>
            <p className="mt-0.5 text-xs text-ink/55">
              {selectedVehicle.category} · {selectedVehicle.seats} seats
              {selectedVehicle.engine_cc ? ` · ${selectedVehicle.engine_cc.toLocaleString()} cc` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => selectVehicle()}
            aria-label="Clear the chosen car"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-white hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

const rentalTypes = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "corporate", label: "Corporate or long-term" },
  { value: "airport", label: "Airport transfer" },
];

export function BookingForm({ preselectedVehicle, vehicles = [] }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      vehicle_id: preselectedVehicle || "",
      rental_type: "daily",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      const vehicle = data.vehicle_id ? vehicles.find((v) => v.id === data.vehicle_id) : null;

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, vehicle_name: vehicle?.name || null }),
      });

      if (!response.ok) throw new Error("Failed to submit booking");

      setIsSuccess(true);
      reset();
    } catch {
      setError("We could not send that. Please try again, or call the desk directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div role="status" className="rounded-[1.6rem] bg-tile-sage p-7 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink">
          <Check className="h-5 w-5" />
        </span>
        <h2 className="type-display mt-6 font-heading text-[clamp(2rem,6vw,3rem)]">
          Request <span className="type-accent text-gold-deep">received.</span>
        </h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-ink/65">
          The desk will contact you within two hours to confirm the vehicle, the driver, and the
          price for your dates.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-white hover:ring-ink/30"
        >
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {error && (
        <p role="alert" className={cn("rounded-2xl bg-paper-deep px-5 py-4 text-sm", errorText)}>
          {error}
        </p>
      )}

      <Group index={1} title="Your details" note="So the desk knows who to send the quote to.">
        <Field label="Name" error={errors.name?.message}>
          <input
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            className={cn("wz-input", invalidRing)}
            {...register("name")}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone or WhatsApp" error={errors.phone?.message}>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+880 1…"
              aria-invalid={errors.phone ? true : undefined}
              className={cn("wz-input", invalidRing)}
              {...register("phone")}
            />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              aria-invalid={errors.email ? true : undefined}
              className={cn("wz-input", invalidRing)}
              {...register("email")}
            />
          </Field>
        </div>
      </Group>

      <Group index={2} title="The trip" note="Rough is fine. The desk confirms every detail with you.">
        <div className="grid min-w-0 gap-1.5">
          <span id="rental-type-label" className="text-xs font-semibold text-ink/60">Kind of hire</span>
          <div role="radiogroup" aria-labelledby="rental-type-label" className="flex flex-wrap gap-2">
            {rentalTypes.map((type) => (
              <label
                key={type.value}
                className="inline-flex h-11 cursor-pointer items-center rounded-full bg-paper-deep px-4 text-sm font-semibold text-ink/70 transition-colors hover:text-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold"
              >
                <input type="radio" value={type.value} className="sr-only" {...register("rental_type")} />
                {type.label}
              </label>
            ))}
          </div>
          {errors.rental_type && <span className={cn("text-xs", errorText)}>{errors.rental_type.message}</span>}
        </div>

        <div className="grid min-w-0 gap-1.5">
          <span className="text-xs font-semibold text-ink/60">
            Car <span className="font-normal text-ink/40">· optional</span>
          </span>
          <Controller
            name="vehicle_id"
            control={control}
            render={({ field: vehicleField }) => (
              <VehicleTypeahead
                vehicles={vehicles}
                value={vehicleField.value || ""}
                onChange={vehicleField.onChange}
                hasError={Boolean(errors.vehicle_id)}
              />
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Pickup date" error={errors.pickup_date?.message}>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              aria-invalid={errors.pickup_date ? true : undefined}
              className={cn("wz-input", invalidRing)}
              {...register("pickup_date")}
            />
          </Field>
          <Field label="Return date" hint="optional">
            <input type="date" className="wz-input" {...register("return_date")} />
          </Field>
        </div>

        <Field label="Pickup from" hint="optional">
          <input placeholder="Airport, Gulshan, hotel name…" className="wz-input" {...register("pickup_location")} />
        </Field>
      </Group>

      <Group index={3} title="Anything else" note="Passengers, hours, stops, flight number, child seat.">
        <Field label="Notes for the desk" hint="optional">
          <textarea
            rows={4}
            placeholder="Anything the driver should know."
            className="wz-input min-h-32! resize-y py-3! leading-relaxed"
            {...register("message")}
          />
        </Field>
      </Group>

      <div className="flex flex-col-reverse gap-5 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-sm text-ink/55">
          Sending this charges nothing. It asks the desk for one fixed quote.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-14 w-full shrink-0 items-center justify-between gap-3 rounded-full bg-ink pl-6 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Sending" : "Request reservation"}
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          </span>
        </button>
      </div>
    </form>
  );
}
