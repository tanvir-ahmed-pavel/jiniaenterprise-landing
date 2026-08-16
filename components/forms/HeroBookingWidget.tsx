"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, X, MapPin, Calendar as CalendarIcon, Car, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroBookingWidget() {
  const [rentalType, setRentalType] = useState("daily");
  const [pickupDate, setPickupDate] = useState("");
  const [location, setLocation] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "hero_widget",
          name,
          phone,
          email,
          rental_type: rentalType,
          start_date: pickupDate,
          pickup_location: location,
          vehicle_name: vehicleName || undefined,
          message: "Customer requested a quick quote directly from the homepage Hero Widget.",
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setName("");
    setPhone("");
    setEmail("");
    setLocation("");
    setPickupDate("");
    setVehicleName("");
  };

  if (isSuccess) {
    return (
      <div className="p-10 max-w-2xl mx-auto rounded-3xl bg-linear-to-b from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] text-center animate-scale-in">
        <div className="w-16 h-16 bg-emerald-500/90 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30 border border-emerald-300/40">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-heading font-black text-white mb-2 tracking-tight">Quote Request Sent!</h3>
        <p className="text-emerald-100/80 text-sm mb-8 max-w-sm mx-auto">Our concierge will contact you at <span className="text-white font-bold">{phone}</span> within minutes.</p>
        <Button onClick={resetForm} variant="outline" className="px-8 py-6 rounded-2xl text-white bg-white/10 hover:bg-white/20 border-white/25 backdrop-blur-md transition-all font-bold">
          Request Another Quote
        </Button>
      </div>
    );
  }

  const rentalTabs = [
    { id: "daily", label: "Daily Rental", icon: Zap },
    { id: "monthly", label: "Monthly Lease", icon: CalendarIcon },
    { id: "airport", label: "Airport VIP Transfer", icon: Car },
    { id: "corporate", label: "Corporate Fleet", icon: MapPin },
  ];

  return (
    <>
      {/* ── Ultra-Transparent Crystal Glass Card ── */}
      <div className="relative p-5 sm:p-7 max-w-5xl mx-auto rounded-3xl bg-linear-to-b from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-[2px] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.2)_inset]">
        {/* Crisp Refractive Top Highlight */}
        <div className="absolute top-0 left-12 right-12 h-px bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Rental Type Glass Tabs */}
        <div className="flex flex-wrap gap-2 mb-5 pb-4 border-b border-white/10">
          {rentalTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = rentalType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRentalType(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border",
                  isSelected
                    ? "bg-white/95 text-emerald-950 border-white shadow-md font-extrabold scale-102"
                    : "bg-white/[0.05] hover:bg-white/[0.12] text-white/90 border-white/15 hover:border-white/30"
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isSelected ? "text-emerald-700" : "text-amber-300")} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Transparent Glass Form Inputs */}
        <form onSubmit={handleInitialSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 items-end">
          {/* Pickup Date */}
          <div className="space-y-2 text-left">
            <label className="flex items-center gap-1.5 text-[11px] text-emerald-100 font-extrabold uppercase tracking-wider">
              <CalendarIcon className="h-3.5 w-3.5 text-amber-300" /> Start Date
            </label>
            <input
              type="date"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] text-white placeholder:text-white/50 text-sm font-semibold border border-white/20 focus:border-amber-300/80 focus:ring-2 focus:ring-amber-300/20 shadow-inner shadow-black/10 transition-all cursor-pointer [color-scheme:dark]"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Location */}
          <div className="space-y-2 text-left">
            <label className="flex items-center gap-1.5 text-[11px] text-emerald-100 font-extrabold uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5 text-amber-300" /> Pickup Area
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Gulshan / Airport"
              className="w-full h-12 px-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] text-white placeholder:text-white/50 text-sm font-semibold border border-white/20 focus:border-amber-300/80 focus:ring-2 focus:ring-amber-300/20 shadow-inner shadow-black/10 transition-all"
            />
          </div>

          {/* Vehicle Model / Preference */}
          <div className="space-y-2 text-left">
            <label className="flex items-center gap-1.5 text-[11px] text-emerald-100 font-extrabold uppercase tracking-wider">
              <Car className="h-3.5 w-3.5 text-amber-300" /> Vehicle Model
            </label>
            <input
              type="text"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              placeholder="e.g. Prado / Noah / Sedan"
              className="w-full h-12 px-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] focus:bg-white/[0.14] text-white placeholder:text-white/50 text-sm font-semibold border border-white/20 focus:border-amber-300/80 focus:ring-2 focus:ring-amber-300/20 shadow-inner shadow-black/10 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full h-12 bg-linear-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-xs tracking-widest uppercase rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-amber-200/50"
            >
              <span>Check Rates & Book</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>
        </form>

        {/* Micro-Trust Note */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/70 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-amber-300" /> Instant confirmation via WhatsApp & Phone
          </span>
          <span className="hidden sm:inline-block text-white/30">•</span>
          <span>Verified Professional Chauffeurs</span>
          <span className="hidden sm:inline-block text-white/30">•</span>
          <span>Transparent Corporate Invoicing</span>
        </div>
      </div>

      {/* ── Modal Step 2 with Glassmorphism ── */}
      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs animate-fade-in" 
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-emerald-950/90 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.7)] text-left text-white animate-scale-in z-10 overflow-hidden">
            {/* Top Light Accent */}
            <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute right-5 top-5 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full border border-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/15 px-3 py-1 rounded-full border border-amber-300/30 inline-block">
                Step 2 of 2: Dispatch Concierge
              </span>
              <h2 className="text-2xl font-heading font-black text-white tracking-tight mt-3">
                Personalized Quotation
              </h2>
              <p className="text-xs text-white/70 font-medium mt-1">
                Where should our concierge send your confirmed vehicle rates?
              </p>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90">Full Name / Organization</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] border border-white/20 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/25 text-white placeholder:text-white/40 transition-all font-semibold text-sm"
                  placeholder="e.g. Tanvir Ahmed / Embassy of..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] border border-white/20 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/25 text-white placeholder:text-white/40 transition-all font-semibold text-sm"
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.16] border border-white/20 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/25 text-white placeholder:text-white/40 transition-all font-semibold text-sm"
                  placeholder="client@organization.com"
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-xs font-black tracking-widest uppercase bg-linear-to-r from-amber-400 via-amber-300 to-yellow-400 text-emerald-950 hover:brightness-105 rounded-xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer border border-amber-200/50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin"/>
                  ) : "Submit & Receive Instant Quote"}
                </Button>
                <p className="text-[10px] text-center text-white/60 mt-3 font-medium">
                  🔒 Confidential • Response guaranteed within 15 minutes
                </p>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

