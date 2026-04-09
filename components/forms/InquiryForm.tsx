"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { siteConfig } from "@/lib/config";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const inquirySchema = z.object({
  name: z.string().min(2, "Identity required."),
  phone: z.string().min(10, "Valid connection axis required."),
  email: z.string().email("Digital address required."),
  rental_type: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  pickup_location: z.string().optional(),
  destination: z.string().optional(),
  message: z.string().min(10, "Requirement details needed."),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface InquiryFormProps {
  vehicleName?: string;
  vehicleId?: string;
  source?: "contact_page" | "hero_widget" | "vehicle_page" | "booking_direct";
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
      message: vehicleName
        ? `I am interested in renting the ${vehicleName}.`
        : "",
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
      <div className="text-center py-12 space-y-6 animate-scale-in">
        <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/20">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-heading font-black text-green-950 italic">Transmission Success.</h3>
          <p className="text-gray-500 font-medium">
            Your inquiry has been logged. Our concierge will reach out shortly.
          </p>
        </div>
        <div className="pt-6 flex flex-col items-center gap-4">
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-black uppercase tracking-widest text-green-600 hover:text-green-800 transition-colors"
          >
            Instant WhatsApp Axis →
          </a>
          <Button 
            variant="outline" 
            onClick={() => setIsSubmitted(false)}
            className="rounded-2xl border-green-100 text-green-900 font-bold hover:bg-green-50"
          >
            New Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Full Identity</Label>
          <Input
            id="name"
            placeholder="Shahab Uddin"
            {...register("name")}
            className={cn("glass-input h-14 px-6", errors.name && "border-red-500 focus:ring-red-500/10")}
          />
          {errors.name && (
            <p className="text-[10px] font-bold text-red-500 ml-1">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Connection Axis</Label>
          <Input
            id="phone"
            placeholder="+880 1XXX-XXXXXX"
            {...register("phone")}
            className={cn("glass-input h-14 px-6", errors.phone && "border-red-500 focus:ring-red-500/10")}
          />
          {errors.phone && (
            <p className="text-[10px] font-bold text-red-500 ml-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Digital Hub</Label>
        <Input
          id="email"
          type="email"
          placeholder="jinia@example.com"
          {...register("email")}
          className={cn("glass-input h-14 px-6", errors.email && "border-red-500 focus:ring-red-500/10")}
        />
        {errors.email && (
          <p className="text-[10px] font-bold text-red-500 ml-1">{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="rental_type" className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Category</Label>
          <div className="relative">
            <select
              id="rental_type"
              {...register("rental_type")}
              className="w-full h-14 px-6 glass-input appearance-none cursor-pointer text-sm font-bold text-green-950"
            >
              <option value="">Select type</option>
              <option value="Daily">Daily Rental</option>
              <option value="Monthly">Monthly Rental</option>
              <option value="Corporate">Corporate Rental</option>
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="start_date" className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Genesis</Label>
          <Input id="start_date" type="date" {...register("start_date")} className="glass-input h-14 px-6 font-bold" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="end_date" className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Conclusion</Label>
          <Input id="end_date" type="date" {...register("end_date")} className="glass-input h-14 px-6 font-bold" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="pickup_location" className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Origin Point</Label>
          <Input id="pickup_location" placeholder="e.g. Airport, Gulshan..." {...register("pickup_location")} className="glass-input h-14 px-6" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="destination" className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Final Axis</Label>
          <Input id="destination" placeholder="Where are you heading?" {...register("destination")} className="glass-input h-14 px-6" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Requirement Narrative</Label>
        <Textarea
          id="message"
          placeholder="Detail your fleet requirements..."
          rows={4}
          {...register("message")}
          className={cn("glass-input p-6 min-h-[120px]", errors.message && "border-red-500 focus:ring-red-500/10")}
        />
        {errors.message && (
          <p className="text-[10px] font-bold text-red-500 ml-1">{errors.message.message}</p>
        )}
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full h-16 bg-green-950 hover:bg-green-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-2xl shadow-green-950/20 transition-all hover:-translate-y-1" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Send className="mr-3 h-4 w-4" /> Finalize Request
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
