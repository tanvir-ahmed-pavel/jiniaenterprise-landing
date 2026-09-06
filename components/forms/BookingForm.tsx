"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Vehicle } from "@/lib/supabase/admin-service";
import { ArrowDown, ArrowRight, CheckCircle2, ChevronUp, Check, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/ui/select";

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

/** Same field treatment as the home booking rail and the contact form. */
const field =
  "h-12 w-full rounded-md border border-emerald-950/15 bg-white px-3 text-sm font-normal text-emerald-950 outline-none transition-colors placeholder:text-emerald-950/35 focus:border-amber-400";
const labelCls = "type-label mb-2 block text-emerald-950/70";
const errorCls = "mt-1.5 text-xs font-normal text-red-600";

/** Numbered legend on a rule — the grouping device the booking rail uses,
 *  instead of an icon tile per section. */
function Legend({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="type-label mb-5 flex items-center gap-2 border-b border-emerald-950/10 pb-3 text-emerald-700">
      <span className="tabular-nums text-amber-600">{index}</span> {children}
    </p>
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

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-700/60" />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            onChange("");
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setIsOpen(true);
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
          className={cn(field, "pl-10 pr-10", hasError && "border-red-500")}
        />
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close vehicle suggestions" : "Open vehicle suggestions"}
          className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-emerald-900/60 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <div id={listboxId} role="listbox" className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-emerald-950/10 bg-white p-1.5 shadow-[0_18px_50px_-24px_rgba(6,52,38,.45)]">
          <button
            type="button"
            role="option"
            aria-selected={!value}
            onClick={() => selectVehicle()}
            className="flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-left text-sm text-emerald-950 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Any available vehicle
            {!value && <Check className="h-4 w-4 text-emerald-700" aria-hidden="true" />}
          </button>
          {filteredVehicles.map((vehicle, index) => (
            <button
              type="button"
              role="option"
              aria-selected={vehicle.id === value}
              key={vehicle.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectVehicle(vehicle)}
              className={cn(
                "flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                index === activeIndex ? "bg-emerald-50" : "hover:bg-emerald-50"
              )}
            >
              <span>
                <span className="block text-sm font-medium text-emerald-950">{vehicle.name}</span>
                <span className="block text-xs text-emerald-950/50">{vehicle.category} · {vehicle.seats} seats</span>
              </span>
              {vehicle.id === value && <Check className="h-4 w-4 text-emerald-700" aria-hidden="true" />}
            </button>
          ))}
          {filteredVehicles.length === 0 && <p className="px-3 py-4 text-sm text-emerald-950/55">No matching vehicles.</p>}
        </div>
      )}
    </div>
  );
}

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

  const rentalTypes = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "corporate", label: "Corporate or long-term" },
    { value: "airport", label: "Airport transfer" },
  ];

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
      <div className="space-y-6 py-10 text-center">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-950">
          <CheckCircle2 className="h-5 w-5 text-emerald-700" /> Request received.
        </p>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-emerald-950/60">
          The desk will contact you within two hours to confirm the vehicle, the driver, and the
          price for your dates.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="inline-flex h-12 items-center justify-center rounded-full border border-emerald-950/15 px-7 text-sm font-medium text-emerald-950 transition-colors hover:border-amber-400"
        >
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-normal text-red-700">
          {error}
        </p>
      )}

      <fieldset className="min-w-0">
        <Legend index="01">Your details</Legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className={labelCls}>Name</span>
            <input placeholder="Your name" className={cn(field, errors.name && "border-red-500")} {...register("name")} />
            {errors.name && <p className={errorCls}>{errors.name.message}</p>}
          </label>
          <label className="block">
            <span className={labelCls}>Phone</span>
            <input type="tel" placeholder="+880 1..." className={cn(field, errors.phone && "border-red-500")} {...register("phone")} />
            {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
          </label>
          <label className="block">
            <span className={labelCls}>Email</span>
            <input type="email" placeholder="you@email.com" className={cn(field, errors.email && "border-red-500")} {...register("email")} />
            {errors.email && <p className={errorCls}>{errors.email.message}</p>}
          </label>
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <Legend index="02">The trip</Legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Vehicle</span>
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
          </label>
          <label className="block">
            <span className={labelCls}>Rental type</span>
            <Controller
              name="rental_type"
              control={control}
              render={({ field: rentalTypeField }) => (
                <Select
                  options={rentalTypes}
                  value={rentalTypeField.value}
                  onValueChange={rentalTypeField.onChange}
                  aria-label="Rental type"
                />
              )}
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className={labelCls}>Pickup date</span>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className={cn(field, errors.pickup_date && "border-red-500")}
              {...register("pickup_date")}
            />
            {errors.pickup_date && <p className={errorCls}>{errors.pickup_date.message}</p>}
          </label>
          <label className="block">
            <span className={labelCls}>Return date</span>
            <input type="date" className={field} {...register("return_date")} />
          </label>
          <label className="block">
            <span className={labelCls}>Pickup</span>
            <input placeholder="Airport, Gulshan..." className={field} {...register("pickup_location")} />
          </label>
        </div>

        <label className="mt-4 block">
          <span className={labelCls}>Anything else</span>
          <textarea
            rows={4}
            placeholder="Passengers, hours, stops, anything the driver should know."
            className={cn(field, "h-auto min-h-[120px] resize-y py-3 leading-relaxed")}
            {...register("message")}
          />
        </label>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-emerald-950/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-label max-w-sm text-emerald-950/50">
          Sending this does not charge anything. It asks the desk for a quote.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-950 px-7 text-sm font-medium text-white transition-colors hover:bg-emerald-800 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </>
          ) : (
            <>
              Request reservation <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
