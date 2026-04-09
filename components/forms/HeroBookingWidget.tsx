"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, X, MapPin, Calendar as CalendarIcon, Car, Zap } from "lucide-react";
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
      <div className="glass-card p-10 max-w-2xl mx-auto bg-white/20 text-center animate-scale-in">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-heading font-black text-white mb-2 tracking-tight">Quote Request Sent!</h3>
        <p className="text-white/70 text-sm mb-8 max-w-sm mx-auto">Our specialized team will contact you at <span className="text-white font-bold">{phone}</span> within minutes.</p>
        <Button onClick={resetForm} variant="outline" className="px-8 py-6 rounded-2xl text-white border-white/20 hover:bg-white/10 transition-all font-bold">
          Request Another Quote
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="glass-card p-1 md:p-3 lg:p-4 max-w-6xl mx-auto bg-white/10 backdrop-blur-3xl border-white/20 shadow-2xl">
        <form onSubmit={handleInitialSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-2 items-end">
          {/* Rental Type */}
          <div className="space-y-1.5 p-3">
            <label className="flex items-center gap-2 text-[10px] text-white/50 font-black uppercase tracking-[0.2em] ml-1">
              <Zap className="h-3 w-3" /> Type
            </label>
            <div className="relative">
              <select 
                value={rentalType}
                onChange={(e) => setRentalType(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl bg-white/95 border-none text-green-950 text-sm font-bold focus:ring-4 focus:ring-green-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="daily">Daily Rental</option>
                <option value="weekly">Weekly Rental</option>
                <option value="monthly">Monthly Rental</option>
                <option value="airport">Airport Transfer</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-green-900/40">
                <X className="h-4 w-4 rotate-45" />
              </div>
            </div>
          </div>

          {/* Pickup Date */}
          <div className="space-y-1.5 p-3">
            <label className="flex items-center gap-2 text-[10px] text-white/50 font-black uppercase tracking-[0.2em] ml-1">
              <CalendarIcon className="h-3 w-3" /> Date
            </label>
            <input
              type="date"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full h-14 px-5 rounded-2xl bg-white/95 border-none text-green-950 text-sm font-bold focus:ring-4 focus:ring-green-500/20 transition-all cursor-pointer"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5 p-3">
            <label className="flex items-center gap-2 text-[10px] text-white/50 font-black uppercase tracking-[0.2em] ml-1">
              <MapPin className="h-3 w-3" /> Location
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Gulshan, Dhaka"
              className="w-full h-14 px-5 rounded-2xl bg-white/95 border-none text-green-950 placeholder:text-gray-400 text-sm font-bold focus:ring-4 focus:ring-green-500/20 transition-all"
            />
          </div>

          {/* Vehicle */}
          <div className="space-y-1.5 p-3">
            <label className="flex items-center gap-2 text-[10px] text-white/50 font-black uppercase tracking-[0.2em] ml-1">
              <Car className="h-3 w-3" /> Vehicle
            </label>
            <input
              type="text"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              placeholder="e.g. Prado, Noah"
              className="w-full h-14 px-5 rounded-2xl bg-white/95 border-none text-green-950 placeholder:text-gray-400 text-sm font-bold focus:ring-4 focus:ring-green-500/20 transition-all"
            />
          </div>

          {/* Submit */}
          <div className="p-3 pt-4 sm:pt-3">
            <Button
              type="submit"
              className="w-full h-14 bg-green-500 hover:bg-green-400 text-white font-black text-sm tracking-widest uppercase rounded-2xl shadow-xl shadow-green-950/20 hover:-translate-y-1 transition-all duration-300"
            >
              Get Rates
            </Button>
          </div>
        </form>
      </div>

      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-fade-in" 
            onClick={() => setIsModalOpen(false)}
          />
          <div className="glass-card bg-white p-8 sm:p-10 w-full max-w-lg shadow-[0_0_100px_rgba(0,0,0,0.3)] relative animate-scale-in z-10 border-none overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 -z-10" />
            
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute right-6 top-6 text-gray-400 hover:text-green-950 transition-colors p-2 hover:bg-gray-50 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-black text-green-950 tracking-tight mb-3 italic">Almost There.</h2>
              <p className="text-sm text-gray-500 font-medium">We just need a few details to send your personalized quote.</p>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Full Identity</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold text-green-950"
                  placeholder="Shahab Uddin"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Phone Axis</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold text-green-950"
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-green-900/40 ml-1 italic">Digital Mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold text-green-950"
                  placeholder="jinia@example.com"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-16 text-sm font-black tracking-[0.2em] uppercase bg-green-950 hover:bg-green-900 text-white rounded-2xl shadow-2xl shadow-green-950/20 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-6 w-6 animate-spin"/>
                  ) : "Complete Request"}
                </Button>
                <p className="text-[10px] text-center text-gray-400 mt-6 font-bold uppercase tracking-wider">Secure Transmission • Privacy Guaranteed</p>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
