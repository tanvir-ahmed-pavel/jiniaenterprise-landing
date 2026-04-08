"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, X } from "lucide-react";

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
    if (!name || !phone || !email) return alert("Please fill in all contact details.");
    
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
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Failed to submit request.");
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
      <div className="rounded-[2.2rem] p-6 md:p-8 max-w-2xl mx-auto bg-green-500/10 backdrop-blur-2xl border border-green-500/30 text-center animate-in fade-in duration-700">
        <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Quote Request Sent!</h3>
        <p className="text-white/80 text-sm mb-6">Our team will call you at {phone} shortly with your custom rate.</p>
        <Button onClick={resetForm} variant="outline" className="text-white border-white/40 hover:bg-white/20">
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[2.2rem] p-5 md:p-6 lg:p-8 max-w-6xl mx-auto bg-linear-to-br from-white/30 via-white/10 to-transparent backdrop-blur-2xl border-t border-l border-white/50 border-r border-b shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.8)]">
        <form onSubmit={handleInitialSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 items-end text-left">
          <div className="space-y-1.5 lg:space-y-2.5 w-full">
            <label className="text-[10px] sm:text-xs text-white/90 font-bold tracking-widest uppercase ml-1 drop-shadow-sm">
              Rental Type
            </label>
            <select 
              value={rentalType}
              onChange={(e) => setRentalType(e.target.value)}
              className="w-full h-12 lg:h-14 px-4 rounded-xl bg-white border border-white/40 text-gray-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors shadow-sm appearance-none"
            >
              <option value="daily" className="text-gray-900">Daily Rental</option>
              <option value="weekly" className="text-gray-900">Weekly Rental</option>
              <option value="monthly" className="text-gray-900">Monthly Rental</option>
              <option value="airport" className="text-gray-900">Airport Transfer</option>
            </select>
          </div>
          <div className="space-y-1.5 lg:space-y-2.5 w-full">
            <label className="text-[10px] sm:text-xs text-white/90 font-bold tracking-widest uppercase ml-1 drop-shadow-sm">
              Pickup Date
            </label>
            <input
              type="date"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full h-12 lg:h-14 px-4 rounded-xl bg-white border border-white/40 text-gray-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors shadow-sm cursor-pointer"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="space-y-1.5 lg:space-y-2.5 w-full">
            <label className="text-[10px] sm:text-xs text-white/90 font-bold tracking-widest uppercase ml-1 drop-shadow-sm">
              Location
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Airport, Gulshan"
              className="w-full h-12 lg:h-14 px-4 rounded-xl bg-white border border-white/40 text-gray-900 placeholder:text-gray-400 text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors shadow-sm"
            />
          </div>
          <div className="space-y-1.5 lg:space-y-2.5 w-full">
            <label className="text-[10px] sm:text-xs text-white/90 font-bold tracking-widest uppercase ml-1 drop-shadow-sm">
              Vehicle (Optional)
            </label>
            <input
              type="text"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              placeholder="e.g. Prado, SUV"
              className="w-full h-12 lg:h-14 px-4 rounded-xl bg-white border border-white/40 text-gray-900 placeholder:text-gray-400 text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors shadow-sm"
            />
          </div>
          <div className="w-full mt-2 sm:mt-0 pt-1 md:pt-0 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 lg:h-14 bg-linear-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-white font-black tracking-wide border border-green-400/50 shadow-[0_10px_30px_rgba(74,222,128,0.4),inset_0_1px_2px_rgba(255,255,255,0.6)] hover:shadow-[0_15px_40px_rgba(74,222,128,0.6),inset_0_1px_2px_rgba(255,255,255,0.7)] rounded-xl uppercase hover:-translate-y-1 transition-all duration-300"
            >
              Get Quote
            </Button>
          </div>
        </form>
      </div>

      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-0" style={{ zIndex: 9999 }}>
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          />
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-[0_0_100px_rgba(0,0,0,0.5)] relative animate-in fade-in zoom-in-95 duration-300 z-10 border border-gray-100">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-2"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Where should we send your quote?</h2>
              <p className="text-sm text-gray-500">Provide your contact info and our team will get right back to you.</p>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="+880 1234-567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-bold bg-green-600 hover:bg-green-700 rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Processing...</>
                  ) : "Send Request"}
                </Button>
                <p className="text-xs text-center text-gray-400 mt-4">By continuing, you agree to Jinia Enterprise&apos;s privacy policy.</p>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
